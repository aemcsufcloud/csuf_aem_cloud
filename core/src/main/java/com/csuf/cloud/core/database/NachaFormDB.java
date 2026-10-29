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

@Component(property = { "service.description=Nacha Form DB Save", "service.vendor=ThoughtFocus",
		"process.label=Nacha Form DB" })
public class NachaFormDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(NachaFormDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_NACHA_FORM";
		String formName = "Nacha Form";
		String assignee = "";
		String caseId = "";
		String timePart = " 00:00:00.0";
		LinkedHashMap<String, Object> dataMap = null;
		MetaDataMap metaDataMapVal = workItem.getWorkflow().getWorkflowData().getMetaDataMap();

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
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
								dataMap.put("DATA_XML", dataXML);
								caseId = eElement.getElementsByTagName("caseId").item(0).getTextContent();
								dataMap.put("CASEID", caseId);
								dataMap.put("TOTAL_AMOUNT",
										eElement.getElementsByTagName("TotalAmount").item(0).getTextContent());
								dataMap.put("REVIEWER_ID",
										eElement.getElementsByTagName("ReviewerID").item(0).getTextContent());
								dataMap.put("REVIEWED_TIME",
										eElement.getElementsByTagName("ReviewedTime").item(0).getTextContent());
								dataMap.put("REVIEWER_COMMENTS",
										eElement.getElementsByTagName("ReviewerComments").item(0).getTextContent());
								dataMap.put("APPROVER_ID",
										eElement.getElementsByTagName("ApproverID").item(0).getTextContent());
								dataMap.put("APPROVER_TIME",
										eElement.getElementsByTagName("ApprovedTime").item(0).getTextContent());
								dataMap.put("APPROVER_COMMENTS",
										eElement.getElementsByTagName("ApproverComments").item(0).getTextContent());
								dataMap.put("SFTP_LOG",
										eElement.getElementsByTagName("SFTPActivityLog").item(0).getTextContent());
								dataMap.put("NACHA_FILE_TITLE",
										eElement.getElementsByTagName("Title").item(0).getTextContent());
								dataMap.put("RUN_ID", eElement.getElementsByTagName("RunId").item(0).getTextContent());
								String reportDate = eElement.getElementsByTagName("ReportDate").item(0)
										.getTextContent();
								if (reportDate.contains(timePart)) {
									reportDate = reportDate.replace(timePart, "");
								}
								Object reportDateObj = "";
								if (reportDate != null && reportDate != "") {
									Date reportDateNew = Date.valueOf(reportDate);
									reportDateObj = reportDateNew;
								}
								dataMap.put("REPORT_DATE", reportDateObj);
								dataMap.put("TOTAL_COUNT",
										eElement.getElementsByTagName("TotalCount").item(0).getTextContent());
								dataMap.put("REPORT_NAME",
										eElement.getElementsByTagName("ReportName").item(0).getTextContent());
								String estimatedSettlementDate = eElement
										.getElementsByTagName("EstimatedSettlementDate").item(0).getTextContent();
								if (estimatedSettlementDate.contains(timePart)) {
									estimatedSettlementDate = estimatedSettlementDate.replace(timePart, "");
								}
								Object estimatedSettlementDateObj = "";
								if (estimatedSettlementDate != null && estimatedSettlementDate != "") {
									Date estimatedSettlementDateNew = Date.valueOf(estimatedSettlementDate);
									estimatedSettlementDateObj = estimatedSettlementDateNew;
								}
								
								dataMap.put("ESTIMATED_SETLLEMENT_DATE", estimatedSettlementDateObj);
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
								if (dataMap.get("LAST_STEP").equals("Reviewer Step - Final")) {
									if (metaDataMapVal.containsKey("actionTakenByFinalReviewers")) {
										if (metaDataMapVal.get("actionTakenByFinalReviewers").toString()
												.equalsIgnoreCase("Approve")) {
											dataMap.put("WORKFLOW_STATUS", "COMPLETED");
										} else {
											dataMap.put("WORKFLOW_STATUS", "RUNNING");
										}
									} else {
										dataMap.put("WORKFLOW_STATUS", "RUNNING");
									}
								} else if (dataMap.get("LAST_STEP").equals("Approver Step")) {
									if (metaDataMapVal.containsKey("actionTakenByApprover")) {
										if (metaDataMapVal.get("actionTakenByApprover").toString()
												.equalsIgnoreCase("Terminate")) {
											dataMap.put("WORKFLOW_STATUS", "TERMINATED");
										} else {
											dataMap.put("WORKFLOW_STATUS", "RUNNING");
										}
									} else {
										dataMap.put("WORKFLOW_STATUS", "RUNNING");
									}
								} else if (dataMap.get("LAST_STEP").equals("Reviewer Step")) {
									if (metaDataMapVal.containsKey("actionTakenByReviewer")) {
										if (metaDataMapVal.get("actionTakenByReviewer").toString()
												.equalsIgnoreCase("Terminate")) {
											dataMap.put("WORKFLOW_STATUS", "TERMINATED");
										} else {
											dataMap.put("WORKFLOW_STATUS", "RUNNING");
										}
									} else {
										dataMap.put("WORKFLOW_STATUS", "RUNNING");
									}
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
					String resultData = dbUtil.getSPEEvalData(conn, caseId, "CASEID", workflowInstanceID, tableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, caseId, "CASEID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, caseId, "CASEID", workflowInstanceID, dataMap,
							"REPORT_DATE,ESTIMATED_SETLLEMENT_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} catch (Exception e1) {
				e1.printStackTrace();
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in DQAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				/*if (conn != null) { try { conn.close(); } catch (SQLException e) { } }*/
			}
		}
	}
}
