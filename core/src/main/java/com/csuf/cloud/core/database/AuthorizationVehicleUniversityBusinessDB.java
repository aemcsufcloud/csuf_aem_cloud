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
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.services.TaskService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.XMLUtils;
import com.google.gson.JsonArray;

@Component(property = { "service.description=Authorization Vehicle University Business DB",
		"service.vendor=ThoughtFocus", "process.label=AuthorizationVehicleUniversityBusinessDB" })
public class AuthorizationVehicleUniversityBusinessDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(AuthorizationVehicleUniversityBusinessDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_AUTH_VEH_UNI_BUS_FORM";
		String formName = "Authorization to Drive a Vehicle on University Business";
		String url = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";
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
								dataMap.put("EMPLID", eElement.getElementsByTagName("EmplId").item(0).getTextContent());
								dataMap.put("DIVISION",
										eElement.getElementsByTagName("Division").item(0).getTextContent());
								dataMap.put("DEPTID", eElement.getElementsByTagName("DeptId").item(0).getTextContent());
								dataMap.put("DRIVER_USERID",
										eElement.getElementsByTagName("DriverUserId").item(0).getTextContent());
								dataMap.put("DRIVER_FIRSTNAME",
										eElement.getElementsByTagName("DriverFirstName").item(0).getTextContent());
								dataMap.put("DRIVER_LASTNAME",
										eElement.getElementsByTagName("DriverLastName").item(0).getTextContent());
								dataMap.put("DRIVER_MIDDLENAME",
										eElement.getElementsByTagName("DriverMiddleName").item(0).getTextContent());
								dataMap.put("LICENSE_NUMBER",
										eElement.getElementsByTagName("CalLicenseNo").item(0).getTextContent());
								dataMap.put("DRIVER_PHONE_NUMBER",
										eElement.getElementsByTagName("PhoneNo").item(0).getTextContent());
								dataMap.put("DRIVER_EMAIL",
										eElement.getElementsByTagName("Email").item(0).getTextContent());
								dataMap.put("DEPARTMENT_NAME",
										eElement.getElementsByTagName("DeptName").item(0).getTextContent());
								dataMap.put("SUPERVISOR_EMAIL",
										eElement.getElementsByTagName("SupervisorEmail").item(0).getTextContent());
								dataMap.put("SUPERVISOR_NAME",
										eElement.getElementsByTagName("SupervisorFullName").item(0).getTextContent());
								dataMap.put("DRIVER_NAME",
										eElement.getElementsByTagName("DriverName").item(0).getTextContent());
								dataMap.put("DRIVER_SIGN",
										eElement.getElementsByTagName("DriverSignature").item(0).getTextContent());
								dataMap.put("DRIVER_COMMENTS",
										eElement.getElementsByTagName("DriverComment").item(0).getTextContent());
								dataMap.put("SUPERVISOR_SIGN",
										eElement.getElementsByTagName("SupervisorSignature").item(0).getTextContent());
								dataMap.put("SUPERVISOR_COMMENTS",
										eElement.getElementsByTagName("SupervisorComment").item(0).getTextContent());
								dataMap.put("RISKMANAGEMENT_NAME",
										eElement.getElementsByTagName("RiskName").item(0).getTextContent());
								dataMap.put("APPOINTING_AUTHORITY",
										eElement.getElementsByTagName("AppointingAuthority").item(0).getTextContent());
								dataMap.put("RISKMANAGEMENT_JOB_TITLE",
										eElement.getElementsByTagName("RiskJobTitle").item(0).getTextContent());
								dataMap.put("RISKMANAGEMENT_COMMENTS",
										eElement.getElementsByTagName("riskComment").item(0).getTextContent());
								dataMap.put("TRAINING_REASON",
										eElement.getElementsByTagName("TrainingDecisionCB").item(0).getTextContent());

								String expirationDate = eElement.getElementsByTagName("LicenseExpirationDate").item(0)
										.getTextContent();
								Object expirationDateObj = "";
								if (expirationDate != null && expirationDate != "") {
									Date expirationDateNew = Date.valueOf(expirationDate);
									expirationDateObj = expirationDateNew;
								}
								dataMap.put("EXPIRATION_DATE", expirationDateObj);

								String driverBirthDate = eElement.getElementsByTagName("DateOfBirth").item(0)
										.getTextContent();
								Object driverBirthDateObj = "";
								if (driverBirthDate != null && driverBirthDate != "") {
									Date driverBirthDateNew = Date.valueOf(driverBirthDate);
									driverBirthDateObj = driverBirthDateNew;
								}
								dataMap.put("DRIVER_DOB", driverBirthDateObj);

								String riskDecision = eElement.getElementsByTagName("RiskDecision").item(0)
										.getTextContent();

								String riskDec = "";
								if (riskDecision.equals("1")) {
									riskDec = "Approved";
								}
								if (riskDecision.equals("2")) {
									riskDec = "Denied";
								}
								dataMap.put("RISKMANAGEMENT_DECISION", riskDec);

								/*
								 * String traingReason = ""; String traingReason1 =
								 * XMLUtils.getChildNodeContent(eElement, "AerialCB"); if
								 * (traingReason1.equals("1")) { traingReason = "Aerial Lifts"; } String
								 * traingReason2 = XMLUtils.getChildNodeContent(eElement, "BucketCB"); if
								 * (traingReason2.equals("1")) { traingReason = "Bucket Truck(Utility)"; }
								 * String traingReason3 = XMLUtils.getChildNodeContent(eElement, "CartCB"); if
								 * (traingReason3.equals("1")) { traingReason = "Cart Safety"; } String
								 * traingReason4 = XMLUtils.getChildNodeContent(eElement, "ForkCB"); if
								 * (traingReason4.equals("1")) { traingReason = "Forklifts"; } String
								 * traingReason5 = XMLUtils.getChildNodeContent(eElement, "ScissorCB"); if
								 * (traingReason5.equals("1")) { traingReason = "Scissor Lifts"; } String
								 * traingReason6 = XMLUtils.getChildNodeContent(eElement, "VanCB"); if
								 * (traingReason6.equals("1")) { traingReason = "Van Safety"; } String
								 * traingReason7 = XMLUtils.getChildNodeContent(eElement, "NoneCB"); if
								 * (traingReason7.equals("1")) { traingReason = "None"; }
								 * 
								 * dataMap.put("TRAINING_REASON", traingReason);
								 */

								String riskManagementSignDate = eElement.getElementsByTagName("RiskSignDate").item(0)
										.getTextContent();
								Object riskManagementSignDateObj = "";
								if (riskManagementSignDate != null && riskManagementSignDate != "") {
									Date riskManagementSignDateNew = Date.valueOf(riskManagementSignDate);
									riskManagementSignDateObj = riskManagementSignDateNew;
								}
								dataMap.put("RISKMANAGEMENT_SIGNDATE", riskManagementSignDateObj);

								String driverSignDate = eElement.getElementsByTagName("DriverSignDate").item(0)
										.getTextContent();
								Object driverSignDateObj = "";
								if (driverSignDate != null && driverSignDate != "") {
									Date driverSignDateNew = Date.valueOf(driverSignDate);
									driverSignDateObj = driverSignDateNew;
								}
								dataMap.put("DRIVER_SIGNDATE", driverSignDateObj);

								String supervisorSignDate = eElement.getElementsByTagName("SupervisorSignDate").item(0)
										.getTextContent();
								Object supervisorSignDateObj = "";
								if (supervisorSignDate != null && supervisorSignDate != "") {
									Date supervisorSignDateNew = Date.valueOf(driverSignDate);
									supervisorSignDateObj = supervisorSignDateNew;
								}
								dataMap.put("SUPERVISOR_SIGNDATE", supervisorSignDateObj);

								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());

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
								if (dataMap.get("LAST_STEP").equals("Risk Management Review")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
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
					String resultData = dbUtil.getSPEEvalData(conn, caseid, "CaseId", workflowInstanceID, tableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, caseid, "CaseId", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/

				JSONObject json = new JSONObject();
				json.put("DB_CONNECTION", "AEMDBDEV");
				json.put("TABLE_NAME", tableName);
				json.put("FORM_NAME", formName);
				json.put("UNIQUE_FIELD", caseid);
				json.put("UNIQUE_FIELD_COLUMN", "CaseId");
				json.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
				json.put("DATA_MAP", dataMap);
				json.put("DATE_FIELDS",
						"EXPIRATION_DATE,DRIVER_DOB,RISKMANAGEMENT_SIGNDATE,DRIVER_SIGNDATE,SUPERVISOR_SIGNDATE");

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
						log.debug("IOException in AuthorizationVehicleUniversityBusinessDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in AuthorizationVehicleUniversityBusinessDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}

}
