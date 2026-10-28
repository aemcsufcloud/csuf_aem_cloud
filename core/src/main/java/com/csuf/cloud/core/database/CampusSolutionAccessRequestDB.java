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

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONObject;
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

@Component(property = { "service.description=CSUF Campus Sol ARF DB", "service.vendor=ThoughtFocus",
		"process.label=CampusSolARFDB" })

public class CampusSolutionAccessRequestDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(CampusSolutionAccessRequestDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_CAMPUS_SOLUTION_ARF";
		String formName = "Campus Solution Access Request Form";
		String assignee = "";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;
		String url = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";


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
								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("FIRST_NAME",
										eElement.getElementsByTagName("FirstName").item(0).getTextContent());
								dataMap.put("LAST_NAME",
										eElement.getElementsByTagName("LastName").item(0).getTextContent());
								dataMap.put("DEPTID", eElement.getElementsByTagName("DeptID").item(0).getTextContent());
								dataMap.put("DEPT_NAME",
										eElement.getElementsByTagName("DeptName").item(0).getTextContent());
								dataMap.put("DIVISION",
										eElement.getElementsByTagName("Divison").item(0).getTextContent());
								dataMap.put("ADMINISTRATOR",
										eElement.getElementsByTagName("ApprAdmin").item(0).getTextContent());
								dataMap.put("DATA", data);
								dataMap.put("EMP_SIGN",
										eElement.getElementsByTagName("EmployeeName").item(0).getTextContent());
								String empdate = eElement.getElementsByTagName("EmployeeDate").item(0).getTextContent();
								Object empdateObj = "";
								if (empdate != null && empdate != "") {
									Date empdateNew = Date.valueOf(empdate);
									empdateObj = empdateNew;
								}
								dataMap.put("EMP_SIGN_DATE", empdateObj);
								dataMap.put("EMP_COMMENTS",
										eElement.getElementsByTagName("EmployeeComments").item(0).getTextContent());
								dataMap.put("TRAINER_SIGN",
										eElement.getElementsByTagName("TrainerName").item(0).getTextContent());
								String trainerdate = eElement.getElementsByTagName("TrainerDate").item(0)
										.getTextContent();
								Object trainerdateObj = "";
								if (trainerdate != null && trainerdate != "") {
									Date trainerdateNew = Date.valueOf(trainerdate);
									trainerdateObj = trainerdateNew;
								}
								
								dataMap.put("TRAINER_SIGN_DATE", trainerdateObj);
								dataMap.put("TRAINER_COMMENTS",
										eElement.getElementsByTagName("TrainerComments").item(0).getTextContent());

								dataMap.put("ADMIN_SIGN",
										eElement.getElementsByTagName("AdminName").item(0).getTextContent());
								String admindate = eElement.getElementsByTagName("AdminDate").item(0).getTextContent();
								Object admindateObj = "";
								if (admindate != null && admindate != "") {
									Date admindateNew = Date.valueOf(admindate);
									admindateObj = admindateNew;
								}
								dataMap.put("ADMIN_SIGN_DATE", admindateObj);
								dataMap.put("ADMIN_COMMENTS",
										eElement.getElementsByTagName("AdminComments").item(0).getTextContent());
								dataMap.put("INITIATOR_SIGN",
										eElement.getElementsByTagName("InitiatorName").item(0).getTextContent());
								String inidate = eElement.getElementsByTagName("InitiatorDate").item(0)
										.getTextContent();
								Object inidateObj = "";
								if (inidate != null && inidate != "") {
									Date inidateNew = Date.valueOf(inidate);
									inidateObj = inidateNew;
								}
								dataMap.put("INITIATOR_SIGN_DATE", inidateObj);
								dataMap.put("INITIATOR_COMMENTS",
										eElement.getElementsByTagName("InitiatorComments").item(0).getTextContent());
								dataMap.put("BA_SIGN",
										eElement.getElementsByTagName("BAName").item(0).getTextContent());
								String badate = eElement.getElementsByTagName("BADate").item(0).getTextContent();
								Object badateObj = "";
								if (badate != null && badate != "") {
									Date badateNew = Date.valueOf(badate);
									badateObj = badateNew;
								}
								dataMap.put("BA_SIGN_DATE", badateObj);
								dataMap.put("BUSINESS_ANALYST_COMMENTS",
										eElement.getElementsByTagName("BAComments").item(0).getTextContent());

								dataMap.put("ISO_SIGN",
										eElement.getElementsByTagName("ISOAdminName").item(0).getTextContent());
								dataMap.put("ISO_COMMENTS",
										eElement.getElementsByTagName("ISOAdminComments").item(0).getTextContent());
								String isodate = eElement.getElementsByTagName("ISOAdminDate").item(0).getTextContent();
								Object isodateObj = "";
								if (isodate != null && isodate != "") {
									Date isodateNew = Date.valueOf(isodate);
									isodateObj = isodateNew;
								}

								dataMap.put("ISO_SIGN_DATE", isodateObj);
								dataMap.put("SEC_ADMIN_SIGN",
										eElement.getElementsByTagName("SecurityAdminName").item(0).getTextContent());
								String secadmindate = eElement.getElementsByTagName("SecurityAdminDate").item(0)
										.getTextContent();
								Object secadminObj = "";
								if (secadmindate != null && secadmindate != "") {
									Date secadminNew = Date.valueOf(secadmindate);
									secadminObj = secadminNew;
								}
								dataMap.put("SEC_ADMIN_SIGN_DATE", secadminObj);
								dataMap.put("SEC_ADMIN_COMMENTS", eElement.getElementsByTagName("SecurityAdminComments")
										.item(0).getTextContent());
								dataMap.put("CISO_SIGN",
										eElement.getElementsByTagName("CISOName").item(0).getTextContent());
								String cisodate = eElement.getElementsByTagName("CISODate").item(0).getTextContent();
								Object cisodateObj = "";
								if (cisodate != null && cisodate != "") {
									Date cisodateNew = Date.valueOf(cisodate);
									cisodateObj = cisodateNew;
								}
								dataMap.put("CISO_SIGN_DATE", cisodateObj);
								dataMap.put("CISO_COMMENTS",
										eElement.getElementsByTagName("CISOAdminComments").item(0).getTextContent());
								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								dataMap.put("SPECIAL_REVIEW",
										eElement.getElementsByTagName("SpecialReview").item(0).getTextContent());
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
				
				JSONObject json = new JSONObject();
		        json.put("DB_CONNECTION", "AEMDBDEV");
		        json.put("TABLE_NAME", tableName);
		        json.put("FORM_NAME", formName);
		        json.put("UNIQUE_FIELD", cwid);
		        json.put("UNIQUE_FIELD_COLUMN", "CWID");
		        json.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
		        json.put("DATA_MAP", dataMap);
		        json.put("DATE_FIELDS", "EMP_SIGN_DATE,TRAINER_SIGN_DATE,ADMIN_SIGN_DATE,INITIATOR_SIGN_DATE,BA_SIGN_DATE,ISO_SIGN_DATE,SEC_ADMIN_SIGN_DATE,CISO_SIGN_DATE");

		        log.error("Testing: =" + json.toString());

		        String dbServiceUrl = url;

		        CloseableHttpClient client = HttpClients.createDefault();
		        HttpPost post = new HttpPost(dbServiceUrl);
		        post.addHeader("Content-Type", "application/json");
		        post.setEntity(new StringEntity(json.toString()));

		        CloseableHttpResponse response = client.execute(post);
		        log.info("DB Service Response: =" + response.getStatusLine());
		        client.close();

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in CampusSolutionAccessRequestDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in CampusSolutionAccessRequestDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}

}
