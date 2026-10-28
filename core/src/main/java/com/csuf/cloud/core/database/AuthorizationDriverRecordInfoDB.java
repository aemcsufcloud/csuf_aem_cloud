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
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Authorization Driver Record Info DB", "service.vendor=ThoughtFocus",
		"process.label=AuthorizationDriverRecordInfoDB" })
public class AuthorizationDriverRecordInfoDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(AuthorizationDriverRecordInfoDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_AUTH_DRIVER_RECORD_FORM";
		String formName = "Authorization For Release of Driver Record Information";
		String assignee = "";
		String cwid = "";
		String caseid = "";
		LinkedHashMap<String, Object> dataMap = null;
		MetaDataMap metaDataMapVal = workItem.getWorkflow().getWorkflowData().getMetaDataMap();

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

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
								dataMap.put("EMPLID", eElement.getElementsByTagName("chrsID").item(0).getTextContent());
								dataMap.put("DIVISION",
										eElement.getElementsByTagName("Division").item(0).getTextContent());
								dataMap.put("DEPTID", eElement.getElementsByTagName("DeptID").item(0).getTextContent());
								dataMap.put("DRIVER_USERID",
										eElement.getElementsByTagName("InitiatorUserID").item(0).getTextContent());
								dataMap.put("DRIVER_FIRSTNAME",
										eElement.getElementsByTagName("InitiatorFirstName").item(0).getTextContent());
								dataMap.put("DRIVER_LASTNAME",
										eElement.getElementsByTagName("InitiatorLastName").item(0).getTextContent());
								dataMap.put("DRIVER_EMAIL",
										eElement.getElementsByTagName("InitiatorEmail").item(0).getTextContent());
								dataMap.put("LICENSE_NUMBER",
										eElement.getElementsByTagName("DriverNumber").item(0).getTextContent());
								dataMap.put("STATE",
										eElement.getElementsByTagName("DriverState").item(0).getTextContent());
								dataMap.put("DRIVER_COUNTY",
										eElement.getElementsByTagName("County").item(0).getTextContent());
								dataMap.put("DRIVER_CITY",
										eElement.getElementsByTagName("City").item(0).getTextContent());
								dataMap.put("DRIVER_NAME",
										eElement.getElementsByTagName("EmployeeName").item(0).getTextContent());
								dataMap.put("DRIVER_SIGN",
										eElement.getElementsByTagName("EmployeeSIgnature").item(0).getTextContent());
								dataMap.put("DRIVER_COMMENTS",
										eElement.getElementsByTagName("EmployeeComment").item(0).getTextContent());
								dataMap.put("UPD_ONE_STATE",
										eElement.getElementsByTagName("ApproverState").item(0).getTextContent());
								dataMap.put("UPD_ONE_COUNTY",
										eElement.getElementsByTagName("ApproverCounty").item(0).getTextContent());
								dataMap.put("UPD_ONE_CITY",
										eElement.getElementsByTagName("ApproverCity").item(0).getTextContent());
								dataMap.put("UPD_ONE_NAME",
										eElement.getElementsByTagName("UPDNameOne").item(0).getTextContent());
								dataMap.put("UPD_ONE_SIGN",
										eElement.getElementsByTagName("UPDSignatureOne").item(0).getTextContent());
								dataMap.put("UPD_ONE_COMMENTS",
										eElement.getElementsByTagName("UPDCommentOne").item(0).getTextContent());
								dataMap.put("UPD_TWO_NAME",
										eElement.getElementsByTagName("UPDNameTwo").item(0).getTextContent());
								dataMap.put("UPD_TWO_SIGN",
										eElement.getElementsByTagName("UPDSignatureTwo").item(0).getTextContent());
								dataMap.put("UPD_TWO_COMMENTS",
										eElement.getElementsByTagName("UPDCommentTwo").item(0).getTextContent());
								dataMap.put("RISKMANAGEMENT_NAME",
										eElement.getElementsByTagName("RiskName").item(0).getTextContent());
								dataMap.put("RISKMANAGEMENT_SIGN",
										eElement.getElementsByTagName("RiskSignature").item(0).getTextContent());
								dataMap.put("RISKMANAGEMENT_COMMENTS",
										eElement.getElementsByTagName("RiskComment").item(0).getTextContent());

								String riskDecision = eElement.getElementsByTagName("RiskDecision").item(0)
										.getTextContent();

								String updTwoDecision = eElement.getElementsByTagName("ApprovalDecision").item(0)
										.getTextContent();

								String riskManagementSignDate = eElement.getElementsByTagName("RiskDate").item(0)
										.getTextContent();
								Object riskManagementSignDateObj = "";
								if (riskManagementSignDate != null && riskManagementSignDate != "") {
									Date riskManagementSignDateNew = Date.valueOf(riskManagementSignDate);
									riskManagementSignDateObj = riskManagementSignDateNew;
								}
								dataMap.put("RISKMANAGEMENT_SIGNDATE", riskManagementSignDateObj);

								String driverSignDate = eElement.getElementsByTagName("EmployeeSignDate").item(0)
										.getTextContent();
								Object driverSignDateObj = "";
								if (driverSignDate != null && driverSignDate != "") {
									Date driverSignDateNew = Date.valueOf(driverSignDate);
									driverSignDateObj = driverSignDateNew;
								}
								dataMap.put("DRIVER_SIGNDATE", driverSignDateObj);

								String updoneSignDate = eElement.getElementsByTagName("UPDSignatureDateOne").item(0)
										.getTextContent();
								Object updoneSignDateObj = "";
								if (updoneSignDate != null && updoneSignDate != "") {
									Date updoneSignDateNew = Date.valueOf(updoneSignDate);
									updoneSignDateObj = updoneSignDateNew;
								}
								dataMap.put("UPD_ONE_SIGNDATE", updoneSignDateObj);

								String updtwoSignDate = eElement.getElementsByTagName("UPDSignatureDateTwo").item(0)
										.getTextContent();
								Object updtwoSignDateObj = "";
								if (updtwoSignDate != null && updtwoSignDate != "") {
									Date updtwoSignDateObjNew = Date.valueOf(updtwoSignDate);
									updtwoSignDateObj = updtwoSignDateObjNew;
								}
								dataMap.put("UPD_TWO_SIGNDATE", updtwoSignDateObj);

								String riskDec = "";
								if (riskDecision.equals("1")) {
									riskDec = "Approved";
								}
								if (riskDecision.equals("2")) {
									riskDec = "Denied";
								}
								dataMap.put("RISKMANAGEMENT_DECISION", riskDec);

								String updTwoDec = "";
								if (updTwoDecision.equals("1")) {
									updTwoDec = "Acceptable";
								}
								if (updTwoDecision.equals("2")) {
									updTwoDec = "Conditional";
								}
								if (updTwoDecision.equals("3")) {
									updTwoDec = "Unacceptable";
								}
								dataMap.put("UPD_TWO_DECISION", updTwoDec);

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
				if (conn != null) {
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
						log.debug("IOException in AuthorizationDriverRecordDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in AuthorizationDriverRecordDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}

}
