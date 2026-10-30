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
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
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

@Component(property = { "service.description=Petition GE Variation DB Save", "service.vendor=ThoughtFocus",
		"process.label=PetitionGEVariationDB" })
public class PetitionGEVariationDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(PetitionGEVariationDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_PETITION_GE_VARIATION";
		String formName = "Petition for General Education Variation";
		String assignee = "";
		String cwid = "";
		String caseid = "";
		LinkedHashMap<String, Object> dataMap = null;

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

					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							try {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								log.debug("index=" + temp);
								cwid = eElement.getElementsByTagName("cwid").item(0).getTextContent();
								caseid = eElement.getElementsByTagName("caseId").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", caseid);

								dataMap.put("STUDENT_FIRST_NAME",
										eElement.getElementsByTagName("firstName").item(0).getTextContent());
								dataMap.put("STUDENT_LAST_NAME",
										eElement.getElementsByTagName("lastName").item(0).getTextContent());
								dataMap.put("STUDENT_NAME",
										eElement.getElementsByTagName("Name").item(0).getTextContent());
								dataMap.put("ADDRESS",
										eElement.getElementsByTagName("Address").item(0).getTextContent());
								dataMap.put("CITY", eElement.getElementsByTagName("City").item(0).getTextContent());
								dataMap.put("STATE", eElement.getElementsByTagName("State").item(0).getTextContent());
								dataMap.put("ZIP_CODE",
										eElement.getElementsByTagName("ZipCode").item(0).getTextContent());
								dataMap.put("MAJOR", eElement.getElementsByTagName("Major").item(0).getTextContent());
								dataMap.put("STUDENT_EMAIL",
										eElement.getElementsByTagName("Email").item(0).getTextContent());
								dataMap.put("STUDENT_PHONE_NUMBER",
										eElement.getElementsByTagName("Phone").item(0).getTextContent());
								dataMap.put("GRADUATION_DATE",
										eElement.getElementsByTagName("GraduationDate").item(0).getTextContent());

								String initiatedDate = eElement.getElementsByTagName("Date_1").item(0).getTextContent();
								Object initiatedDateObj = "";
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatedDate);
									initiatedDateObj = initiatedDateNew;
								}
								dataMap.put("INITIATED_DATE", initiatedDateObj);

								dataMap.put("NOT_KNOWN_YET_CB",
										eElement.getElementsByTagName("NotKnownCB").item(0).getTextContent());

								dataMap.put("STATEMENT_1",
										eElement.getElementsByTagName("Item1").item(0).getTextContent());
								dataMap.put("DEPT_COURSE_NO",
										eElement.getElementsByTagName("DeptCourseNo").item(0).getTextContent());
								dataMap.put("SEMESTER_TAKEN",
										eElement.getElementsByTagName("SemesterTaken").item(0).getTextContent());
								dataMap.put("STATEMENT_2",
										eElement.getElementsByTagName("Item2").item(0).getTextContent());
								dataMap.put("STATEMENT_3A",
										eElement.getElementsByTagName("Item3_a").item(0).getTextContent());
								dataMap.put("STATEMENT_3B",
										eElement.getElementsByTagName("Item3_b").item(0).getTextContent());
								dataMap.put("STATEMENT_3C",
										eElement.getElementsByTagName("Item3_c").item(0).getTextContent());
								dataMap.put("STATEMENT_3D",
										eElement.getElementsByTagName("Explanation").item(0).getTextContent());
								
								dataMap.put("STUDENT_USERID",
										eElement.getElementsByTagName("StudentUserID").item(0).getTextContent());
								dataMap.put("ACAD_CAREER",
										eElement.getElementsByTagName("AcadCareer").item(0).getTextContent());
								dataMap.put("ACAD_PLAN_TYPE",
										eElement.getElementsByTagName("AcadPlanType").item(0).getTextContent());

								dataMap.put("STUDENT_SIGNATURE",
										eElement.getElementsByTagName("StudentSign").item(0).getTextContent());
								String studentSignDate = eElement.getElementsByTagName("StudentSignDate").item(0)
										.getTextContent();
								Object studentSignDateObj = "";
								if (studentSignDate != null && studentSignDate != "") {
									Date studentSignDateNew = Date.valueOf(studentSignDate);
									studentSignDateObj = studentSignDateNew;
								}
								dataMap.put("STUDENT_SIGN_DATE", studentSignDateObj);

								dataMap.put("GRAD_UNIT_EVALUATOR_SIGN",
										eElement.getElementsByTagName("GradUnitSupervisor").item(0).getTextContent());
								String gradSignDate = eElement.getElementsByTagName("GradUnitSupervisorSignDate")
										.item(0).getTextContent();
								Object gradSignDateObj = "";
								if (gradSignDate != null && gradSignDate != "") {
									Date gradSignDateNew = Date.valueOf(gradSignDate);
									gradSignDateObj = gradSignDateNew;
								}
								dataMap.put("GRAD_UNIT_EVALUATOR_SIGN_DATE", gradSignDateObj);
								dataMap.put("GRAD_UNIT_EVALUATOR_DECISION", eElement
										.getElementsByTagName("GradUnitSupervisorDecision").item(0).getTextContent());
								dataMap.put("GRAD_UNIT_EVALUATOR_COMMENTS", eElement
										.getElementsByTagName("GradUnitSupervisorComments").item(0).getTextContent());
								
								dataMap.put("ACADEMIC_ADVISOR_NAME",
										eElement.getElementsByTagName("AcademicAdvisorName").item(0).getTextContent());
								dataMap.put("ACADEMIC_ADVISOR_USERID",
										eElement.getElementsByTagName("AcademicAdvisorUserId").item(0).getTextContent());
								dataMap.put("ACADEMIC_ADVISOR_EMAIL",
										eElement.getElementsByTagName("AcademicAdvisorEmailId").item(0).getTextContent());
								
								dataMap.put("ACADEMIC_ADVISOR_SIGN",
										eElement.getElementsByTagName("AcademicAdvisorSign").item(0).getTextContent());
								String advisorSignDate = eElement.getElementsByTagName("AcademicAdvisorSignDate")
										.item(0).getTextContent();
								Object advisorSignDateObj = "";
								if (advisorSignDate != null && advisorSignDate != "") {
									Date advisorSignDateNew = Date.valueOf(advisorSignDate);
									advisorSignDateObj = advisorSignDateNew;
								}
								dataMap.put("ACADEMIC_ADVISOR_SIGN_DATE", advisorSignDateObj);
								dataMap.put("ACADEMIC_ADVISOR_DECISION", eElement
										.getElementsByTagName("AcademicAdvisorDecision").item(0).getTextContent());
								dataMap.put("ACADEMIC_ADVISOR_COMMENTS", eElement
										.getElementsByTagName("AcademicAdvisorComments").item(0).getTextContent());
								
								dataMap.put("ASSOCIATE_DEAN_NAME",
										eElement.getElementsByTagName("DeanName").item(0).getTextContent());
								dataMap.put("ASSOCIATE_DEAN_USERID",
										eElement.getElementsByTagName("DeanUserID").item(0).getTextContent());
								dataMap.put("ASSOCIATE_DEAN_EMAIL",
										eElement.getElementsByTagName("DeanEmail").item(0).getTextContent());
								dataMap.put("ASSOCIATE_DEAN_EMPLID",
										eElement.getElementsByTagName("DeanEmplID").item(0).getTextContent());
								
								dataMap.put("ASSOCIATE_DEAN_SIGN",
										eElement.getElementsByTagName("DeanSign").item(0).getTextContent());
								String deanSignDate = eElement.getElementsByTagName("DeanSignDate")
										.item(0).getTextContent();
								Object deanSignDateObj = "";
								if (deanSignDate != null && deanSignDate != "") {
									Date deanSignDateNew = Date.valueOf(deanSignDate);
									deanSignDateObj = deanSignDateNew;
								}
								dataMap.put("ASSOCIATE_DEAN_SIGN_DATE", deanSignDateObj);
								dataMap.put("ASSOCIATE_DEAN_DECISION", eElement
										.getElementsByTagName("DeanDecision").item(0).getTextContent());
								dataMap.put("ASSOCIATE_DEAN_COMMENTS", eElement
										.getElementsByTagName("DeanComments").item(0).getTextContent());

								dataMap.put("PETITION_COORDINATOR_SIGN", eElement
										.getElementsByTagName("PetitionCoordinatorSign").item(0).getTextContent());
								String petitionSignDate = eElement.getElementsByTagName("PetitionCoordinatorDate")
										.item(0).getTextContent();
								Object petitionSignDateObj = "";
								if (petitionSignDate != null && petitionSignDate != "") {
									Date petitionSignDateNew = Date.valueOf(petitionSignDate);
									petitionSignDateObj = petitionSignDateNew;
								}
								dataMap.put("PETITION_COORDINATOR_SIGN_DATE", petitionSignDateObj);																				
								dataMap.put("PETITION_COORDINATOR_DECISION", eElement
										.getElementsByTagName("PetitionCoordinatorDecision").item(0).getTextContent());												
								dataMap.put("PETITION_NO_ACTION_DECISION", eElement
										.getElementsByTagName("PetitionNoActionDecision").item(0).getTextContent());								
								dataMap.put("PETITION_NO_ACTION_COMMENTS", eElement
										.getElementsByTagName("Other_2").item(0).getTextContent());												
								dataMap.put("PETITION_DENY_DECISION", eElement
										.getElementsByTagName("PetitionDenyDecision").item(0).getTextContent());									
								dataMap.put("PETITION_DENY_COMMENTS", eElement
										.getElementsByTagName("Other_3").item(0).getTextContent());								
								dataMap.put("PETITION_COORDINATOR_COMMENTS", eElement
										.getElementsByTagName("PetitionCoordinatorComments").item(0).getTextContent());

								dataMap.put("TDA_SIGN",
										eElement.getElementsByTagName("TDASign").item(0).getTextContent());
								String tdaSignDate = eElement.getElementsByTagName("TDASignDate").item(0)
										.getTextContent();
								Object tdaSignDateObj = "";
								if (tdaSignDate != null && tdaSignDate != "") {
									Date tdaSignDateNew = Date.valueOf(tdaSignDate);
									tdaSignDateObj = tdaSignDateNew;
								}
								dataMap.put("TDA_SIGN_DATE", tdaSignDateObj);
								dataMap.put("TDA_DECISION", eElement
										.getElementsByTagName("TDADecision").item(0).getTextContent());
								dataMap.put("TDA_COMMENTS",
										eElement.getElementsByTagName("TDAComments").item(0).getTextContent());
								
								dataMap.put("RECORDS_SIGN",
										eElement.getElementsByTagName("RecordsSign").item(0).getTextContent());
								String recordSignDate = eElement.getElementsByTagName("RecordsSignDate").item(0)
										.getTextContent();
								Object recordSignDateObj = "";
								if (recordSignDate != null && recordSignDate != "") {
									Date recordSignDateNew = Date.valueOf(recordSignDate);
									recordSignDateObj = recordSignDateNew;
								}
								dataMap.put("RECORDS_SIGN_DATE", recordSignDateObj);
								dataMap.put("RECORDS_DECISION", eElement
										.getElementsByTagName("RecordsDecision").item(0).getTextContent());
								dataMap.put("RECORDS_COMMENTS",
										eElement.getElementsByTagName("RecordsComments").item(0).getTextContent());

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
								if (dataMap.get("LAST_STEP").equals("Records-Review")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNNING");
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
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
					log.debug("ResultData : {}", resultData);
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
						log.debug("IOException in PetitionGEVariationDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in PetitionGEVariationDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}
			

		}
	}
}
