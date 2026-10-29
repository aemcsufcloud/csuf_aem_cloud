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
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=DQ Appeal Form DB Save", "service.vendor=ThoughtFocus",
		"process.label=DQ Appeal Form DB" })
public class DQAppealDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(DQAppealDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_DQ_APPEAL";
		String formName = "DQ Appeal Form";
		String assignee = "";
		String cwid = "";
		String petitionAnalystDecision = "";
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
								dataMap.put("DATA_XML", dataXML);
								cwid = eElement.getElementsByTagName("cwid").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", eElement.getElementsByTagName("caseId").item(0).getTextContent());
								dataMap.put("FIRST_NAME",
										eElement.getElementsByTagName("firstName").item(0).getTextContent());
								dataMap.put("LAST_NAME",
										eElement.getElementsByTagName("lastName").item(0).getTextContent());
								dataMap.put("MAJOR", eElement.getElementsByTagName("major").item(0).getTextContent());
								dataMap.put("CURRENT_CSUF_GPA",
										eElement.getElementsByTagName("GPA").item(0).getTextContent());
								dataMap.put("UNITS_EARNED_AT_CSUF",
										eElement.getElementsByTagName("Units").item(0).getTextContent());
								dataMap.put("ADVISOR_NAME_MET",
										eElement.getElementsByTagName("AdvisorName").item(0).getTextContent());
								dataMap.put("PART_A_EXPLANATION",
										eElement.getElementsByTagName("partA").item(0).getTextContent());
								dataMap.put("PART_B_EXPLANATION",
										eElement.getElementsByTagName("partB").item(0).getTextContent());
								dataMap.put("PART_C_EXPLANATION",
										eElement.getElementsByTagName("partC").item(0).getTextContent());
								dataMap.put("STUDENT_SIGNATURE",
										eElement.getElementsByTagName("StudentSign").item(0).getTextContent());
								String initiatorSignDate = eElement.getElementsByTagName("StudentSignDate").item(0)
										.getTextContent();
								Object initiatorSignDateObj = "";
								if (initiatorSignDate != null && initiatorSignDate != "") {
									Date initiatorSignDateNew = Date.valueOf(initiatorSignDate);
									initiatorSignDateObj = initiatorSignDateNew;
								}
								dataMap.put("STUDENT_SIGN_DATE", initiatorSignDateObj);
								dataMap.put("PETITION_ANALYST_SIGNATURE",
										eElement.getElementsByTagName("petitionAnalystSignature").item(0)
												.getTextContent());
								String petitionSignDate = eElement.getElementsByTagName("petitionAnalystSignDate")
										.item(0).getTextContent();
								Object petitionSignDateObj = "";
								if (petitionSignDate != null && petitionSignDate != "") {
									Date petitionSignDateNew = Date.valueOf(petitionSignDate);
									petitionSignDateObj = petitionSignDateNew;
								}
								dataMap.put("PETITION_ANALYST_SIGN_DATE", petitionSignDateObj);
								petitionAnalystDecision = eElement.getElementsByTagName("petitionDecision")
										.item(0).getTextContent();
								dataMap.put("PETITION_ANALYST_DECISION", petitionAnalystDecision);
								dataMap.put("PETITION_ANALYST_COMMENTS",
										eElement.getElementsByTagName("petitionAnalystComment").item(0)
												.getTextContent());
								dataMap.put("ACADEMIC_ADVISOR_SIGNATURE",
										eElement.getElementsByTagName("AcademicAdvisorSignature").item(0).getTextContent());
								String academicAdvisorSignDate = eElement.getElementsByTagName("AcademicAdvisorDate").item(0)
										.getTextContent();
								Object academicAdvisorSignDateObj = "";
								if (academicAdvisorSignDate != null && academicAdvisorSignDate != "") {
									Date academicAdvisorSignDateNew = Date.valueOf(academicAdvisorSignDate);
									academicAdvisorSignDateObj = academicAdvisorSignDateNew;
								}
								dataMap.put("ACADEMIC_ADVISOR_SIGN_DATE", academicAdvisorSignDateObj);
								dataMap.put("ACADEMIC_ADVISOR_DECISION",
										eElement.getElementsByTagName("academicAdvisorDecision").item(0).getTextContent());
								dataMap.put("ACADEMIC_ADVISOR_COMMENTS",
										eElement.getElementsByTagName("AcademicAdvisorComment").item(0).getTextContent());
								dataMap.put("ASSOCIATE_DEAN_SIGNATURE",
										eElement.getElementsByTagName("DeanSignature").item(0).getTextContent());
								String deanSignDate = eElement.getElementsByTagName("DeanSignDate").item(0)
										.getTextContent();
								Object deanSignDateObj = "";
								if (deanSignDate != null && deanSignDate != "") {
									Date deanSignDateNew = Date.valueOf(deanSignDate);
									deanSignDateObj = deanSignDateNew;
								}
								dataMap.put("ASSOCIATE_DEAN_SIGN_DATE", deanSignDateObj);
								dataMap.put("ASSOCIATE_DEAN_DECISION",
										eElement.getElementsByTagName("deanDecision").item(0).getTextContent());
								dataMap.put("ASSOCIATE_DEAN_COMMENTS",
										eElement.getElementsByTagName("DeanComment").item(0).getTextContent());
								dataMap.put("RECORDS_SIGNATURE",
										eElement.getElementsByTagName("RecordsSignature").item(0).getTextContent());
								String recordSignDate = eElement.getElementsByTagName("RecordsSignDate").item(0)
										.getTextContent();
								Object recordSignDateObj = "";
								if (recordSignDate != null && recordSignDate != "") {
									Date recordSignDateNew = Date.valueOf(recordSignDate);
									recordSignDateObj = recordSignDateNew;
								}
								dataMap.put("RECORDS_SIGN_DATE", recordSignDateObj);
								dataMap.put("RECORDS_DECISION",
										eElement.getElementsByTagName("recordDecision").item(0).getTextContent());
								dataMap.put("RECORDS_COMMENTS",
										eElement.getElementsByTagName("RecordsComment").item(0).getTextContent());
								dataMap.put("STUDENT_FULL_NAME",
										eElement.getElementsByTagName("StudentName").item(0).getTextContent());
								dataMap.put("ASSOCIATE_DEAN_NAME",
										eElement.getElementsByTagName("DeanName").item(0).getTextContent());
								dataMap.put("ASSOCIATE_DEAN_USER_ID",
										eElement.getElementsByTagName("DeanUserID").item(0).getTextContent());
								dataMap.put("ASSOCIATE_DEAN_EMAIL_ID",
										eElement.getElementsByTagName("DeanEmailID").item(0).getTextContent());
								dataMap.put("STUDENT_EMAIL",
										eElement.getElementsByTagName("email").item(0).getTextContent());
								dataMap.put("DEPARTMENT_ID",
										eElement.getElementsByTagName("deptId").item(0).getTextContent());
								dataMap.put("COLLEGE_ID",
										eElement.getElementsByTagName("college").item(0).getTextContent());
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
								if (dataMap.get("LAST_STEP").equals("Records Review")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else if (dataMap.get("LAST_STEP").equals("Petition Analyst Review")) {
									if (metaDataMapVal.get("actionTakenByFinalPetitionAnalyst") == null) {
										if (petitionAnalystDecision.equalsIgnoreCase("2")) {
											dataMap.put("WORKFLOW_STATUS", "COMPLETED");
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
				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
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
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in DQAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}
		}
	}
}
