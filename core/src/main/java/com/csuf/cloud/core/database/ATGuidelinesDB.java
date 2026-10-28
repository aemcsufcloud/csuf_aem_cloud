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
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
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
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=AT Guidelines DB Save", "service.vendor=ThoughtFocus",
		"process.label=ATGuidelinesDB" })
public class ATGuidelinesDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(ATGuidelinesDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String detailsTableName = "AEM_AT_GUIDE_LAUNCH_DETAILS";
		String dataTableName = "AEM_AT_GUIDELINES_LAUNCH_DATA";
		String formName = "Faculty Assigned Time Agreement [AT Guidelines]";
		String url = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";
		String assignee = "";
		String uid = "";
		LinkedHashMap<String, Object> dataMap = null;

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
								uid = eElement.getElementsByTagName("UniqueId").item(0).getTextContent();
								dataMap.put("UNIQUE_ID", uid);
								dataMap.put("INITIATOR_FIRST_NAME",
										eElement.getElementsByTagName("InitiatorFirstName").item(0).getTextContent());
								dataMap.put("INITIATOR_LAST_NAME",
										eElement.getElementsByTagName("InitiatorLastName").item(0).getTextContent());
								dataMap.put("COLLEGE",
										eElement.getElementsByTagName("College").item(0).getTextContent());
								dataMap.put("COLLEGE_ID",
										eElement.getElementsByTagName("FullCollege").item(0).getTextContent());
								dataMap.put("DEPARTMENT",
										eElement.getElementsByTagName("Department").item(0).getTextContent());
								dataMap.put("DEPARTMENT_ID",
										eElement.getElementsByTagName("DeptId").item(0).getTextContent());
								dataMap.put("TERM", eElement.getElementsByTagName("Term").item(0).getTextContent());
								String atData = eElement.getElementsByTagName("ATData").item(0).getTextContent();
								dataMap.put("AT_DATA", atData);
								dataMap.put("INITIATOR_EMAIL",
										eElement.getElementsByTagName("InitiatorEmailId").item(0).getTextContent());
								dataMap.put("INITIATOR_USER_ID",
										eElement.getElementsByTagName("InitiatorUserId").item(0).getTextContent());
								dataMap.put("CHAIR_NAME",
										eElement.getElementsByTagName("ChairName").item(0).getTextContent());
								dataMap.put("CHAIR_EMAIL",
										eElement.getElementsByTagName("ChairEmailId").item(0).getTextContent());
								dataMap.put("CHAIR_USER_ID",
										eElement.getElementsByTagName("ChairUserId").item(0).getTextContent());
								dataMap.put("DEAN_NAME",
										eElement.getElementsByTagName("DeanName").item(0).getTextContent());
								dataMap.put("DEAN_EMAIL",
										eElement.getElementsByTagName("DeanEmailId").item(0).getTextContent());
								dataMap.put("DEAN_USER_ID",
										eElement.getElementsByTagName("DeanUserId").item(0).getTextContent());
								dataMap.put("INITIATOR_SIGNATURE",
										eElement.getElementsByTagName("InitiatorSignature").item(0).getTextContent());
								String initiatorSignDate = eElement.getElementsByTagName("InitiatorSignDate").item(0)
										.getTextContent();
								Object initiatorSignDateObj = "";
								if (initiatorSignDate != null && initiatorSignDate != "") {
									Date initiatorSignDateNew = Date.valueOf(initiatorSignDate);
									initiatorSignDateObj = initiatorSignDateNew;
								}
								dataMap.put("INITIATOR_SIGN_DATE", initiatorSignDateObj);
								dataMap.put("INITIATOR_COMMENTS",
										eElement.getElementsByTagName("InitiatorComments").item(0).getTextContent());
								dataMap.put("CHAIR_SIGNATURE",
										eElement.getElementsByTagName("ChairSignature").item(0).getTextContent());
								String chairSignDate = eElement.getElementsByTagName("ChairSignDate").item(0)
										.getTextContent();
								Object chairSignDateObj = "";
								if (chairSignDate != null && chairSignDate != "") {
									Date chairSignDateNew = Date.valueOf(chairSignDate);
									chairSignDateObj = chairSignDateNew;
								}
								dataMap.put("CHAIR_SIGN_DATE", chairSignDateObj);
								dataMap.put("CHAIR_COMMENTS",
										eElement.getElementsByTagName("ChairComments").item(0).getTextContent());
								dataMap.put("DEAN_SIGNATURE",
										eElement.getElementsByTagName("DeanSignature").item(0).getTextContent());
								String deanSignDate = eElement.getElementsByTagName("DeanSignDate").item(0)
										.getTextContent();
								Object deanSignDateObj = "";
								if (deanSignDate != null && deanSignDate != "") {
									Date deanSignDateNew = Date.valueOf(deanSignDate);
									deanSignDateObj = deanSignDateNew;
								}
								dataMap.put("DEAN_SIGN_DATE", deanSignDateObj);
								String deanDecision = eElement.getElementsByTagName("DeanDecision").item(0)
										.getTextContent();
								dataMap.put("DEAN_DECISION", deanDecision);
								dataMap.put("DEAN_COMMENT",
										eElement.getElementsByTagName("DeanComments").item(0).getTextContent());
								dataMap.put("DATA", dataXML);
								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								log.debug("DataMap values :{}", dataMap);
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
								if (dataMap.get("LAST_STEP").equals("Dean Review")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
									saveATInitialData(workflowInstanceID, atData, uid, dataTableName, formName);
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNING");
								}
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
					String resultData = dbUtil.getSPEEvalData(conn, uid, "UNIQUE_ID", workflowInstanceID,
							detailsTableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, uid, "UNIQUE_ID", workflowInstanceID, detailsTableName);
						dbUtil.insertFormData(conn, dataMap, detailsTableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, detailsTableName, formName);
					}
				}*/

				JSONObject json = new JSONObject();
				json.put("DB_CONNECTION", "AEMDBDEV");
				json.put("TABLE_NAME", detailsTableName);
				json.put("FORM_NAME", formName);
				json.put("UNIQUE_FIELD", uid);
				json.put("UNIQUE_FIELD_COLUMN", "UNIQUE_ID");
				json.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
				json.put("DATA_MAP", dataMap);
				json.put("DATE_FIELDS", "INITIATOR_SIGN_DATE,CHAIR_SIGN_DATE,DEAN_SIGN_DATE");

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
			} catch (Exception e1) {
				e1.printStackTrace();
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in ATGuidelinesDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in ATGuidelinesDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}

	public void saveATInitialData(String workflowInstanceID, String atData, String uid, String tableName,
			String formName) {
		String dbServiceUrl = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";
		try {
			LinkedHashMap<String, Object> dataMapInfo = null;
			JSONArray jsonArray = new JSONArray(atData);
			JSONObject objects = null;
			for (int i = 0; i < jsonArray.length(); i++) {
				objects = jsonArray.getJSONObject(i);
				dataMapInfo = new LinkedHashMap<String, Object>();

				dataMapInfo.put("COLLEGE", objects.get("COLLEGE").toString());
				dataMapInfo.put("DEPT_ID", objects.get("DEPT_ID").toString());
				dataMapInfo.put("FULL_NAME", objects.get("FULL_NAME").toString());
				dataMapInfo.put("CWID", objects.get("CWID").toString());
				dataMapInfo.put("EMAIL", objects.get("EMAIL").toString());
				dataMapInfo.put("TERM", objects.get("START_TERM").toString());
				dataMapInfo.put("WTU", objects.get("WTU").toString());
				dataMapInfo.put("TIME_REASON", objects.get("TIME_REASON").toString());
				dataMapInfo.put("BRIEF_ASSIGNMENT", objects.get("BRIEF_ASSIGNMENT").toString());
				dataMapInfo.put("DEPT_CHAIR_NAME", objects.get("DEPT_CHAIR_NAME").toString());
				dataMapInfo.put("DEPT_CHAIR_EMAIL", objects.get("DEPT_CHAIR_EMAIL").toString());
				dataMapInfo.put("UNIQUE_ID", uid);

				JSONObject json = new JSONObject();
				json.put("DB_CONNECTION", "AEMDBDEV");
				json.put("TABLE_NAME", tableName);
				json.put("FORM_NAME", formName);
				json.put("UNIQUE_FIELD", "");
				json.put("UNIQUE_FIELD_COLUMN", "");
				json.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
				json.put("DATA_MAP", dataMapInfo);
				json.put("DATE_FIELDS", "");

				CloseableHttpClient client = HttpClients.createDefault();
				HttpPost post = new HttpPost(dbServiceUrl);
				post.addHeader("Content-Type", "application/json");
				post.setEntity(new StringEntity(json.toString()));

				CloseableHttpResponse response = client.execute(post);
				log.info("DB Service Response: =" + response.getStatusLine());
				client.close();
			}
		} catch (JSONException | IOException e) {
			e.printStackTrace();
		}
	}

}
