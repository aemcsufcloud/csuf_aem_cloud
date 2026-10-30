package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.lang.String;
import org.w3c.dom.Element;
import java.lang.String;
import java.sql.Connection;
import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;

import com.adobe.granite.workflow.WorkflowException;
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
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=University Withdrawal DB", "service.vendor=ThoughtFocus",
		"process.label=UniversityWithdrawalDB" })
public class UniversityWithdrawalDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(UniversityWithdrawalDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_UNIVERSITY_WITHDRAWAL_FORM";
		String formName = "University Withdrawal Form";
		String assignee = "";
		String cwid = "";
		String caseid = "";
		LinkedHashMap<String, Object> dataMap = null;
		MetaDataMap metaDataMapVal = workItem.getWorkflow().getWorkflowData().getMetaDataMap();

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		log.debug("Workflowinstanceid:" + workflowInstanceID);
		if (StringUtils.isNotBlank(payloadPath)) {
			InputStream is = null;
			try {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");

				if (null != is) {
					Document doc = XMLUtils.getDomDocument(is);
					String dataXML = XMLUtils.prettyPrintAsString(doc);

					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							try {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								log.debug("index=" + temp);

								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								caseid = eElement.getElementsByTagName("CaseId").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", caseid);
								dataMap.put("STUDENT_USERID",
										eElement.getElementsByTagName("StudentUserId").item(0).getTextContent());
								dataMap.put("STUDENT_FIRSTNAME",
										eElement.getElementsByTagName("StudentFirstName").item(0).getTextContent());
								dataMap.put("STUDENT_LASTNAME",
										eElement.getElementsByTagName("StudentLastName").item(0).getTextContent());
								dataMap.put("PHONE",
										eElement.getElementsByTagName("StudentPhone").item(0).getTextContent());
								dataMap.put("ADMITTED_TERM",
										eElement.getElementsByTagName("AdmittedTerm").item(0).getTextContent());
								dataMap.put("STUDENT_EMAIL",
										eElement.getElementsByTagName("StudentEmail").item(0).getTextContent());
								dataMap.put("MAJOR",
										eElement.getElementsByTagName("StudentMajor").item(0).getTextContent());
								dataMap.put("STUDENT_SIGN",
										eElement.getElementsByTagName("StudentSignature").item(0).getTextContent());

								dataMap.put("STUDENT_COMMENTS",
										eElement.getElementsByTagName("StudentComment").item(0).getTextContent());
								dataMap.put("REGISTRATIONUNIT_SIGN", eElement
										.getElementsByTagName("RegistrationUnitSignature").item(0).getTextContent());

								dataMap.put("REGISTRATIONUNIT_COMMENTS", eElement
										.getElementsByTagName("RegistrationUnitComments").item(0).getTextContent());

								String registrationUnitdecision = eElement
										.getElementsByTagName("RegistrationUnitRecommend").item(0).getTextContent();

								String registrationUnitDec = "";
								if (registrationUnitdecision.equals("1")) {
									registrationUnitDec = "Approved";
								} else {
									registrationUnitDec = "Denied";
								}
								dataMap.put("REGISTRATIONUNIT_DECISION", registrationUnitDec);

								String withdrawalReasonFinal = "";
								String withdrawalReason = eElement.getElementsByTagName("WithdrawReason").item(0)
										.getTextContent();
								if (withdrawalReason.equals("1")) {
									withdrawalReasonFinal = "Attending another institution";
								}
								if (withdrawalReason.equals("2")) {
									withdrawalReasonFinal = "Moving out of state";
								}
								if (withdrawalReason.equals("3")) {
									withdrawalReasonFinal = "CSUF is not the right fit";
								}
								if (withdrawalReason.equals("4")) {
									String reason = eElement.getElementsByTagName("OtherWithdrawReason").item(0)
											.getTextContent();
									withdrawalReasonFinal = reason;
								}
								dataMap.put("WITHDRAWAL_REASON", withdrawalReasonFinal);

								String studentSignDate = eElement.getElementsByTagName("StudentSignDate").item(0)
										.getTextContent();
								Object studentSignDateObj = "";
								if (studentSignDate != null && studentSignDate != "") {
									Date studentSignDateNew = Date.valueOf(studentSignDate);
									studentSignDateObj = studentSignDateNew;
								}
								dataMap.put("STUDENT_SIGNDATE", studentSignDateObj);

								String registrationUnitSignDate = eElement
										.getElementsByTagName("RegistrationUnitSignDate").item(0).getTextContent();
								Object registrationUnitSignDateObj = "";
								if (registrationUnitSignDate != null && registrationUnitSignDate != "") {
									Date registrationUnitSignDateNew = Date.valueOf(registrationUnitSignDate);
									registrationUnitSignDateObj = registrationUnitSignDateNew;
								}
								dataMap.put("REGISTRATIONUNIT_SIGNDATE", registrationUnitSignDateObj);

								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								log.debug("DataMap values :{}", dataMap);
								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

								List<Route> backRoutesList = workflowSession.getBackRoutes(workItem, false);
								JsonArray backRoutesJson = new JsonArray();
								for (Route backRoute : backRoutesList) {
									backRoutesJson.add(backRoute.getName());
								}
								String saveHistoryBackRoute = "";
								if (backRoutesJson.size() == 1) {
									saveHistoryBackRoute = backRoutesList.get(0).getName();
									log.debug("Executing if block ");
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
									log.debug("Executing else block assignee : {}", assignee);
								}
								dataMap.put("LAST_STEP", saveHistoryBackRoute);
								if (dataMap.get("LAST_STEP").equals("Registration Unit Review")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNING");
								}
								dataMap.put("LAST_STEP_ASSIGNEE", assignee);

							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, caseid, "CaseId", workflowInstanceID, tableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, caseid, "CaseId", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, caseid, "CaseId", workflowInstanceID, dataMap,
							"STUDENT_SIGNDATE,REGISTRATIONUNIT_SIGNDATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}


			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} catch (Exception e1) {
				log.debug(Arrays.toString(e1.getStackTrace()) + "Message-----" + e1.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in UniversityWithdrawalDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
/*				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in UniversityWithdrawalDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}*/
			}

		}

	}

}
