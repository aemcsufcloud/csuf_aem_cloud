package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.Route;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.google.gson.JsonArray;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.services.TaskService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=CSUF HRARF DB", "service.vendor=ThoughtFocus", "process.label=HRARFDB" })

public class HRFinanceAccessRequestDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(HRFinanceAccessRequestDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_HR_ACCESS_REQUEST";
		String formName = "HR Access Request Form";
		String assignee = "";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		if (StringUtils.isNotBlank(payloadPath)) {
			InputStream is = null;
			try {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");

				if (null != is) {
					Document doc = XMLUtils.getDomDocument(is);
					String data = "";
					try {
						data = XMLUtils.prettyPrintAsString(doc);
					} catch (Exception e1) {
						e1.printStackTrace();
					}
					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							try {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								cwid = eElement.getElementsByTagName("EmployeeID").item(0).getTextContent();
								dataMap.put("CSU_CHRS_ID",
										eElement.getElementsByTagName("chrsId").item(0).getTextContent());
								dataMap.put("CWID", cwid);
								dataMap.put("FIRST_NAME",
										eElement.getElementsByTagName("FirstName").item(0).getTextContent());
								dataMap.put("LAST_NAME",
										eElement.getElementsByTagName("LastName").item(0).getTextContent());
								dataMap.put("PREF_FIRST_NAME",
										eElement.getElementsByTagName("FirstNamePref").item(0).getTextContent());
								dataMap.put("PREF_LAST_NAME",
										eElement.getElementsByTagName("LastNamePref").item(0).getTextContent());
								dataMap.put("DEPT_NAME",
										eElement.getElementsByTagName("DepartmentName").item(0).getTextContent());
								dataMap.put("DEPTID",
										eElement.getElementsByTagName("DepartmentID").item(0).getTextContent());
								dataMap.put("DIVISION",
										eElement.getElementsByTagName("Division").item(0).getTextContent());
								dataMap.put("ADMINISTRATOR_NAME", eElement
										.getElementsByTagName("AppropriateAdministrator").item(0).getTextContent());
								dataMap.put("DATA", data);
								dataMap.put("EMP_SIGN",
										eElement.getElementsByTagName("EmployeeName").item(0).getTextContent());
								String empdate = eElement.getElementsByTagName("EmployeeSignatureDate").item(0)
										.getTextContent();
								Object empdateObj = "";
								if (empdate != null && empdate != "") {
									Date empdateNew = Date.valueOf(empdate);
									empdateObj = empdateNew;
								}
								dataMap.put("EMP_SIGN_DATE", empdateObj);
								dataMap.put("EMP_COMMENTS",
										eElement.getElementsByTagName("EmployeeComments").item(0).getTextContent());
								dataMap.put("ADMIN_SIGN", eElement.getElementsByTagName("AdministratorSignature")
										.item(0).getTextContent());
								String admindate = eElement.getElementsByTagName("AdministratorSignatureDate").item(0)
										.getTextContent();
								Object admindateObj = "";
								if (admindate != null && admindate != "") {
									Date admindateNew = Date.valueOf(admindate);
									admindateObj = admindateNew;
								}
								dataMap.put("ADMIN_SIGN_DATE", admindateObj);
								dataMap.put("ADMIN_COMMENTS", eElement.getElementsByTagName("AdministratorComments")
										.item(0).getTextContent());
								dataMap.put("INITIATOR_SIGN",
										eElement.getElementsByTagName("InitiatorSignature").item(0).getTextContent());
								String inidate = eElement.getElementsByTagName("InitiatorSignatureDate").item(0)
										.getTextContent();
								Object inidateObj = "";
								if (inidate != null && inidate != "") {
									Date inidateNew = Date.valueOf(inidate);
									inidateObj = inidateNew;
								}
								dataMap.put("INITIATOR_SIGN_DATE", inidateObj);
								dataMap.put("INITIATOR_COMMENTS",
										eElement.getElementsByTagName("InitiatorComments").item(0).getTextContent());
								dataMap.put("BA_SIGN", eElement.getElementsByTagName("BusinessAnalystSignature").item(0)
										.getTextContent());
								String badate = eElement.getElementsByTagName("BusinessAnalystSignatureDate").item(0)
										.getTextContent();
								Object badateObj = "";
								if (badate != null && badate != "") {
									Date badateNew = Date.valueOf(badate);
									badateObj = badateNew;
								}
								dataMap.put("BA_SIGN_DATE", badateObj);
								dataMap.put("BUSINESS_ANALYST_COMMENTS", eElement
										.getElementsByTagName("BusinessAnalystComments").item(0).getTextContent());

								dataMap.put("ISO_SIGN", eElement.getElementsByTagName("ISOAdminAnalystSignature")
										.item(0).getTextContent());
								dataMap.put("ISO_COMMENTS", eElement.getElementsByTagName("ISOAdminAnalystComments")
										.item(0).getTextContent());
								String isodate = eElement.getElementsByTagName("ISOAdminAnalystSignatureDate").item(0)
										.getTextContent();
								Object isodateObj = "";
								if (isodate != null && isodate != "") {
									Date isodateNew = Date.valueOf(isodate);
									isodateObj = isodateNew;
								}
								dataMap.put("ISO_SIGN_DATE", isodateObj);
								dataMap.put("SEC_ADMIN_SIGN", eElement.getElementsByTagName("SecurityAdminSignature")
										.item(0).getTextContent());
								String secadmindate = eElement.getElementsByTagName("SecurityAdminSignatureDate")
										.item(0).getTextContent();
								Object secadminObj = "";
								if (secadmindate != null && secadmindate != "") {
									Date secadminNew = Date.valueOf(secadmindate);
									secadminObj = secadminNew;
								}
								dataMap.put("SEC_ADMIN_SIGN_DATE", secadminObj);
								dataMap.put("SEC_ADMIN_COMMENTS", eElement.getElementsByTagName("SecurityAdminComments")
										.item(0).getTextContent());
								dataMap.put("CISO_SIGN",
										eElement.getElementsByTagName("CISOSignature").item(0).getTextContent());
								String cisodate = eElement.getElementsByTagName("CISOSignatureDate").item(0)
										.getTextContent();
								Object cisodateObj = "";
								if (cisodate != null && cisodate != "") {
									Date cisodateNew = Date.valueOf(cisodate);
									cisodateObj = cisodateNew;
								}
								dataMap.put("CISO_SIGN_DATE", cisodateObj);
								dataMap.put("CISO_COMMENTS",
										eElement.getElementsByTagName("CISOAdminComments").item(0).getTextContent());

								dataMap.put("FAR_SIGN",
										eElement.getElementsByTagName("FARSignature").item(0).getTextContent());
								String fardate = eElement.getElementsByTagName("FARSignatureDate").item(0)
										.getTextContent();
								Object fardateObj = "";
								if (fardate != null && fardate != "") {
									Date fardateNew = Date.valueOf(fardate);
									fardateObj = fardateNew;
								}
								dataMap.put("FAR_SIGN_DATE", fardateObj);
								dataMap.put("FAR_COMMENTS",
										eElement.getElementsByTagName("FARComments").item(0).getTextContent());

								dataMap.put("FILENET_SIGN",
										eElement.getElementsByTagName("FilenetSignature").item(0).getTextContent());
								String filenetdate = eElement.getElementsByTagName("FilenetSignatureDate").item(0)
										.getTextContent();
								Object filenetdateObj = "";
								if (filenetdate != null && filenetdate != "") {
									Date filenetdateNew = Date.valueOf(filenetdate);
									filenetdateObj = filenetdateNew;
								}
								dataMap.put("FILENET_SIGN_DATE", filenetdateObj);
								dataMap.put("FILENET_COMMENTS",
										eElement.getElementsByTagName("FilenetComments").item(0).getTextContent());

								dataMap.put("TRAINER_NAME",
										eElement.getElementsByTagName("TrainerSignature").item(0).getTextContent());
								String trainerdate = eElement.getElementsByTagName("TrainerSignatureDate").item(0)
										.getTextContent();
								Object trainerdateObj = "";
								if (trainerdate != null && trainerdate != "") {
									Date trainerdateNew = Date.valueOf(trainerdate);
									trainerdateObj = trainerdateNew;
								}
								dataMap.put("TRAINER_SIGN_DATE", trainerdateObj);
								dataMap.put("TRAINER_COMMENTS",
										eElement.getElementsByTagName("TrainerComments").item(0).getTextContent());
								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								dataMap.put("SPECIAL_REVIEW",
										eElement.getElementsByTagName("SpecialReview").item(0).getTextContent());

								List<Route> backRoutesList = workflowSession.getBackRoutes(workItem, false);
								JsonArray backRoutesJson = new JsonArray();
								for (Route backRoute : backRoutesList) {
									backRoutesJson.add(backRoute.getName());
								}
								String saveHistoryBackRoute = "";
								if (backRoutesJson.size() == 1) {
									saveHistoryBackRoute = backRoutesList.get(0).getName();
								} else {
									saveHistoryBackRoute = backRoutesList.get(1).getName();
									String wId = workItem.getId().replace("VolatileWorkItem_", "/workItems/");
									String firstStr = wId.substring(0, wId.indexOf('_'));
									String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
									String t1 = firstStr.replaceAll("[^0-9]+", "");
									int a1 = Integer.parseInt(t1);
									a1 = a1 - 2;
									firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
									String workItemId = workflowInstanceID.concat(firstStr).concat("_")
											.concat(secString);
									assignee = taskService.getTaskAssignee(workItemId);
								}
								dataMap.put("LAST_STEP", saveHistoryBackRoute);
								dataMap.put("LAST_STEP_ASSIGNEE", assignee);
								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in HRFinanceAccessRequestDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error("SQLException in HRFinanceAccessRequestDB Finally Block="
							+ Arrays.toString(e.getStackTrace()));
				}
			}

		}

	}

}
