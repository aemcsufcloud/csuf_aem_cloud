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
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.services.TaskService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.XMLUtils;
import com.google.gson.JsonArray;

@Component(property = { "service.description=Unit Cap Appeal DB Save", "service.vendor=ThoughtFocus",
		"process.label=UnitCapAppealDB" })
public class UnitCapAppealDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(UnitCapAppealDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_UNIT_CAP_APPEAL";
		String formName = "Unit Cap Appeal";
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
								dataMap.put("AID_YEAR",
										eElement.getElementsByTagName("AidYear").item(0).getTextContent());
								dataMap.put("FINANCIAL_AID_YEAR",
										eElement.getElementsByTagName("financialAidYear").item(0).getTextContent());
								String initiatedDate = eElement.getElementsByTagName("Date_1").item(0).getTextContent();
								Object initiatedDateObj = "";
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatedDate);
									initiatedDateObj = initiatedDateNew;
								}
								dataMap.put("INITIATED_DATE", initiatedDateObj);
								dataMap.put("FORM_CODE",
										eElement.getElementsByTagName("formCode").item(0).getTextContent());
								dataMap.put("STUDENT_NAME",
										eElement.getElementsByTagName("Name").item(0).getTextContent());
								dataMap.put("STUDENT_FIRST_NAME",
										eElement.getElementsByTagName("firstName").item(0).getTextContent());
								dataMap.put("STUDENT_LAST_NAME",
										eElement.getElementsByTagName("lastName").item(0).getTextContent());
								dataMap.put("STUDENT_PHONE_NUMBER",
										eElement.getElementsByTagName("Phone").item(0).getTextContent());
								dataMap.put("STUDENT_ADDRESS",
										eElement.getElementsByTagName("Address").item(0).getTextContent());
								dataMap.put("STUDENT_MESSAGE",
										eElement.getElementsByTagName("Message").item(0).getTextContent());
								dataMap.put("SECTION1_DEGREE_TYPE",
										eElement.getElementsByTagName("DegreeTypeSection1").item(0).getTextContent());
								dataMap.put("SECTION1_DEGREE_TYPE_OTHER",
										eElement.getElementsByTagName("DegreeOtherSection1").item(0).getTextContent());
								dataMap.put("SECTION1_EXP_GRAD_MONTH",
										eElement.getElementsByTagName("GraduationMonth").item(0).getTextContent());
								dataMap.put("SECTION1_EXP_GRAD_YEAR",
										eElement.getElementsByTagName("GraduationYear").item(0).getTextContent());
								dataMap.put("SECTION1_TARGET_UNITS",
										eElement.getElementsByTagName("TargetUnits").item(0).getTextContent());
								dataMap.put("SECTION2_DEGREE_NAME",
										eElement.getElementsByTagName("NameofDegree").item(0).getTextContent());
								dataMap.put("SECTION2_DEGREE_TYPE",
										eElement.getElementsByTagName("DegreeTypeSection2").item(0).getTextContent());
								dataMap.put("SECTION2_DEGREE_TYPE_OTHER",
										eElement.getElementsByTagName("DegreeOtherSection2").item(0).getTextContent());
								dataMap.put("SECTION2_TARGET_UNITS", eElement
										.getElementsByTagName("RemainingUnitsSection2").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE1",
										eElement.getElementsByTagName("Course1").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE1_UNITS",
										eElement.getElementsByTagName("Course1Units").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE2",
										eElement.getElementsByTagName("Course2").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE2_UNITS",
										eElement.getElementsByTagName("Course2Units").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE3",
										eElement.getElementsByTagName("Course3").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE3_UNITS",
										eElement.getElementsByTagName("Course3Units").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE4",
										eElement.getElementsByTagName("Course4").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE4_UNITS",
										eElement.getElementsByTagName("Course4Units").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE5",
										eElement.getElementsByTagName("Course5").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE5_UNITS",
										eElement.getElementsByTagName("Course5Units").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE6",
										eElement.getElementsByTagName("Course6").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE6_UNITS",
										eElement.getElementsByTagName("Course6Units").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE7",
										eElement.getElementsByTagName("Course7").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE7_UNITS",
										eElement.getElementsByTagName("Course7Units").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE8",
										eElement.getElementsByTagName("Course8").item(0).getTextContent());
								dataMap.put("SECTION2_COURSE8_UNITS",
										eElement.getElementsByTagName("Course8Units").item(0).getTextContent());
								dataMap.put("SECTION3_TARGET_UNITS", eElement
										.getElementsByTagName("RemainingUnitsSection3").item(0).getTextContent());
								dataMap.put("SECTION3_GE_CATEGORY1",
										eElement.getElementsByTagName("GECategory1").item(0).getTextContent());
								dataMap.put("SECTION3_GE_CATEGORY1_UNITS",
										eElement.getElementsByTagName("GECategory1Units").item(0).getTextContent());
								dataMap.put("SECTION3_GE_CATEGORY2",
										eElement.getElementsByTagName("GECategory2").item(0).getTextContent());
								dataMap.put("SECTION3_GE_CATEGORY2_UNITS",
										eElement.getElementsByTagName("GECategory2Units").item(0).getTextContent());
								dataMap.put("SECTION3_GE_CATEGORY3",
										eElement.getElementsByTagName("GECategory3").item(0).getTextContent());
								dataMap.put("SECTION3_GE_CATEGORY3_UNITS",
										eElement.getElementsByTagName("GECategory3Units").item(0).getTextContent());
								dataMap.put("SECTION3_GE_CATEGORY4",
										eElement.getElementsByTagName("GECategory4").item(0).getTextContent());
								dataMap.put("SECTION3_GE_CATEGORY4_UNITS",
										eElement.getElementsByTagName("GECategory4Units").item(0).getTextContent());
								dataMap.put("STUDENT_SIGNATURE",
										eElement.getElementsByTagName("StudentSignature").item(0).getTextContent());
								String studentSignDate = eElement.getElementsByTagName("StudentSignatureDate").item(0)
										.getTextContent();
								Object studentSignDateObj = "";
								if (studentSignDate != null && studentSignDate != "") {
									Date studentSignDateNew = Date.valueOf(studentSignDate);
									studentSignDateObj = studentSignDateNew;
								}
								dataMap.put("STUDENT_SIGN_DATE", studentSignDateObj);
								dataMap.put("STUDENT_COMMENTS",
										eElement.getElementsByTagName("StudentComments").item(0).getTextContent());
								dataMap.put("ACADEMIC_DEPARTMENT_SIGNATURE", eElement
										.getElementsByTagName("AcademicDepartmentSignature").item(0).getTextContent());
								String approverSignDate = eElement.getElementsByTagName("AcademicDepartmentSignDate")
										.item(0).getTextContent();
								Object approverSignDateObj = "";
								if (approverSignDate != null && approverSignDate != "") {
									Date approverSignDateNew = Date.valueOf(approverSignDate);
									approverSignDateObj = approverSignDateNew;
								}
								dataMap.put("ACADEMIC_DEPARTMENT_SIGN_DATE", approverSignDateObj);
								dataMap.put("ACADEMIC_DEPARTMENT_COMMENTS", eElement
										.getElementsByTagName("AcademicDepartmentComments").item(0).getTextContent());
								dataMap.put("ACADEMIC_ADVISING_NAME", eElement
										.getElementsByTagName("AcademicAdvisingOfficerName").item(0).getTextContent());
								dataMap.put("ACADEMIC_ADVISING_SIGNATURE",
										eElement.getElementsByTagName("AcademicAdvisingOfficerSignature").item(0)
												.getTextContent());
								String academicAdvisingSignDate = eElement
										.getElementsByTagName("AcademicAdvisingOfficerSignDate").item(0)
										.getTextContent();
								Object academicAdvisingSignDateObj = "";
								if (academicAdvisingSignDate != null && academicAdvisingSignDate != "") {
									Date academicAdvisingSignDateNew = Date.valueOf(academicAdvisingSignDate);
									academicAdvisingSignDateObj = academicAdvisingSignDateNew;
								}
								dataMap.put("ACADEMIC_ADVISING_SIGN_DATE", academicAdvisingSignDateObj);
								dataMap.put("ACADEMIC_ADVISING_COMMENTS",
										eElement.getElementsByTagName("AcademicAdvisingOfficerComments").item(0)
												.getTextContent());
								dataMap.put("FINANCIAL_AID_SIGNATURE", eElement
										.getElementsByTagName("FinancialAidSignature").item(0).getTextContent());
								String financialAidSignDate = eElement.getElementsByTagName("FinancialAidSignatureDate")
										.item(0).getTextContent();
								Object financialAidSignDateObj = "";
								if (financialAidSignDate != null && financialAidSignDate != "") {
									Date financialAidSignDateNew = Date.valueOf(financialAidSignDate);
									financialAidSignDateObj = financialAidSignDateNew;
								}
								dataMap.put("FINANCIAL_AID_SIGN_DATE", financialAidSignDateObj);
								dataMap.put("FINANCIAL_AID_COMMENTS",
										eElement.getElementsByTagName("staffComment").item(0).getTextContent());
								dataMap.put("FINANCIAL_AID_DECISION",
										eElement.getElementsByTagName("staffDecision").item(0).getTextContent());
								dataMap.put("ACADEMIC_DEPT_STAFF_NAME",
										eElement.getElementsByTagName("AcademicDepartmentReviewerName").item(0)
												.getTextContent());
								dataMap.put("ACADEMIC_DEPT_STAFF_USER_ID",
										eElement.getElementsByTagName("AcademicDepartmentReviewerUserId").item(0)
												.getTextContent());
								dataMap.put("ACADEMIC_DEPT_STAFF_EMAIL_ID",
										eElement.getElementsByTagName("AcademicDepartmentReviewerEmailId").item(0)
												.getTextContent());
								dataMap.put("ACADEMIC_ADVISING_OFF_NAME",
										eElement.getElementsByTagName("AcademicAdvisingOfficeReviewerName").item(0)
												.getTextContent());
								dataMap.put("ACADEMIC_ADVISING_OFF_USER_ID",
										eElement.getElementsByTagName("AcademicAdvisingOfficeReviewerUserId").item(0)
												.getTextContent());
								dataMap.put("ACADEMIC_ADVISING_OFF_EMAIL_ID",
										eElement.getElementsByTagName("AcademicAdvisingOfficeReviewerEmailId").item(0)
												.getTextContent());
								dataMap.put("STUDENT_USERID",
										eElement.getElementsByTagName("StudentUserId").item(0).getTextContent());
								dataMap.put("STUDENT_EMAILID",
										eElement.getElementsByTagName("StudentEmailId").item(0).getTextContent());
								dataMap.put("IP_ADDRESS",
										eElement.getElementsByTagName("IPAddress").item(0).getTextContent());
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
								if (dataMap.get("LAST_STEP").equals("Financial Aid Review")) {
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
						log.debug("IOException in UnitCapAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error(
								"SQLException in UnitCapAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}

}
