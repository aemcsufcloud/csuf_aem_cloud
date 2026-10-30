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

@Component(property = { "service.description=Request for Time Conflict Approval DB Save", "service.vendor=ThoughtFocus",
"process.label=RequestForTimeConflictApprovalDB" })
public class RequestForTimeConflictApprovalDB implements WorkflowProcess{
	
	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(RequestForTimeConflictApprovalDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) 
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_REQUEST_FOR_TIME_CONFLICT";
		String formName = "Request for Time Conflict Approval";		
		String assignee = "";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		log.debug("Workflowinstanceid:"+workflowInstanceID);
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
							log.debug("index="+temp);
							cwid = eElement.getElementsByTagName("Cwid").item(0).getTextContent();
							dataMap.put("CWID", cwid);
							dataMap.put("CASE_ID",eElement.getElementsByTagName("CaseId").item(0).getTextContent());
							String initiatedDate = eElement.getElementsByTagName("InitiatedDate").item(0).getTextContent();
							Object initiatedDateObj = "";
							if (initiatedDate != null && initiatedDate != "") {
								Date initiatedDateNew = Date.valueOf(initiatedDate);
								initiatedDateObj = initiatedDateNew;
							}
							dataMap.put("INITIATED_DATE", initiatedDateObj);
							dataMap.put("TERM",eElement.getElementsByTagName("TermName").item(0).getTextContent());
							dataMap.put("STUDENT_LAST_NAME",eElement.getElementsByTagName("StudentLastName").item(0).getTextContent());
							dataMap.put("STUDENT_FIRST_NAME",eElement.getElementsByTagName("StudentFirstName").item(0).getTextContent());
							dataMap.put("STUDENT_MIDDLE_NAME",eElement.getElementsByTagName("StudentMiddleName").item(0).getTextContent());
							dataMap.put("STUDENT_PHONE_NUMBER", eElement.getElementsByTagName("StudentPhoneNumber").item(0).getTextContent());
							dataMap.put("STUDENT_EMAIL_ADDRESS", eElement.getElementsByTagName("StudentEmailAddress").item(0).getTextContent());
							dataMap.put("STUDENT_SIGNATURE", eElement.getElementsByTagName("StudentSignature").item(0).getTextContent());
							String studentSignDate = eElement.getElementsByTagName("StudentSignatureDate").item(0).getTextContent();
							Object studentSignDateObj = "";
							if (studentSignDate != null && studentSignDate != "") {
								Date studentSignDateNew = Date.valueOf(studentSignDate);
								studentSignDateObj = studentSignDateNew;
							}
							dataMap.put("STUDENT_SIGNATURE_DATE", studentSignDateObj);
							dataMap.put("STUDENT_COMMENTS", eElement.getElementsByTagName("StudentComments").item(0).getTextContent());
							dataMap.put("RC_NAME", eElement.getElementsByTagName("RequestedDeptCourse").item(0).getTextContent());
							dataMap.put("RC_SCHEDULE_NUMBER", eElement.getElementsByTagName("RequestedCourseScheduleNumber").item(0).getTextContent());
							dataMap.put("RC_UNITS", eElement.getElementsByTagName("RequestedNumberofUnits").item(0).getTextContent());
							dataMap.put("RC_DAYS_TIMES", eElement.getElementsByTagName("RequestedCourseDaysAndTimes").item(0).getTextContent());
							dataMap.put("RC_INSTRUCTOR_NAME", eElement.getElementsByTagName("RequestedCourseInstructorName").item(0).getTextContent());
							dataMap.put("RC_INSTRUCTOR_EMAILID", eElement.getElementsByTagName("RequestedCourseInstructorEmailId").item(0).getTextContent());
							dataMap.put("RC_INSTRUCTOR_USERID", eElement.getElementsByTagName("RequestedCourseInstructorUserId").item(0).getTextContent());
							dataMap.put("RC_INSTRUCTOR_DECISION", eElement.getElementsByTagName("RequestedCourseApprovalCB").item(0).getTextContent());
							dataMap.put("RC_INSTRUCTOR_SIGNATURE", eElement.getElementsByTagName("RequestedCourseInstructorSignature").item(0).getTextContent());
							String rcSignDate = eElement.getElementsByTagName("RequestedCourseInstructorSignDate").item(0).getTextContent();
							Object rcSignDateObj = "";
							if (rcSignDate != null && rcSignDate != "") {
								Date rcSignDateNew = Date.valueOf(rcSignDate);
								rcSignDateObj = rcSignDateNew;
							}
							dataMap.put("RC_INSTRUCTOR_SIGN_DATE", rcSignDateObj );
							dataMap.put("RC_INSTRUCTOR_COMMENTS", eElement.getElementsByTagName("RequestedCourseInstructorComments").item(0).getTextContent());
							
							dataMap.put("TCC_NAME", eElement.getElementsByTagName("TimeConflictDeptCourse").item(0).getTextContent());
							dataMap.put("TCC_SCHEDULE_NUMBER", eElement.getElementsByTagName("TimeConflictScheduleNumber").item(0).getTextContent());
							dataMap.put("TCC_UNITS", eElement.getElementsByTagName("TimeConflictNumberofUnits").item(0).getTextContent());
							dataMap.put("TCC_DAYS_TIMES", eElement.getElementsByTagName("TimeConflictDaysandTimes").item(0).getTextContent());
							dataMap.put("TCC_INSTRUCTOR_NAME", eElement.getElementsByTagName("TimeConflictInstructorName").item(0).getTextContent());
							dataMap.put("TCC_INSTRUCTOR_EMAILID", eElement.getElementsByTagName("TimeConflictCourseInstructorEmailId").item(0).getTextContent());
							dataMap.put("TCC_INSTRUCTOR_USERID", eElement.getElementsByTagName("TimeConflictCourseInstructorUserId").item(0).getTextContent());
							dataMap.put("TCC_INSTRUCTOR_DECISION", eElement.getElementsByTagName("TimeConflictApprovalCB").item(0).getTextContent());
							dataMap.put("TCC_INSTRUCTOR_SIGNATURE", eElement.getElementsByTagName("TimeConflictInstructorSignature").item(0).getTextContent());
							String tccSignDate = eElement.getElementsByTagName("TimeConflictInstructorSignDate").item(0).getTextContent();
							Object tccSignDateObj = "";
							if (tccSignDate != null && tccSignDate != "") {
								Date tccSignDateNew = Date.valueOf(tccSignDate);
								tccSignDateObj = tccSignDateNew;
							}
							dataMap.put("TCC_INSTRUCTOR_SIGN_DATE", tccSignDateObj );
							dataMap.put("TCC_INSTRUCTOR_COMMENTS", eElement.getElementsByTagName("TimeConflictInstructorComments").item(0).getTextContent());
							dataMap.put("ARSC_SIGNATURE", eElement.getElementsByTagName("ARSCSignature").item(0).getTextContent());
							String arscSignDate = eElement.getElementsByTagName("ARSCSignatureDate").item(0).getTextContent();
							Object arscSignDateObj = "";
							if (arscSignDate != null && arscSignDate != "") {
								Date arscSignDateNew = Date.valueOf(arscSignDate);
								arscSignDateObj = arscSignDateNew;
							}
							dataMap.put("ARSC_SIGN_DATE", arscSignDateObj );
							dataMap.put("ARSC_COMMENTS", eElement.getElementsByTagName("ARSCComments").item(0).getTextContent());
							dataMap.put("ARSC_DECISION", eElement.getElementsByTagName("ARSCDecision").item(0).getTextContent());
							dataMap.put("ENROLLMENT_NUMBER", eElement.getElementsByTagName("RegistrationEnrollment").item(0).getTextContent());
							String enrollmentDate = eElement.getElementsByTagName("RegistrationEnrollmentDate").item(0).getTextContent();
							Object enrollmentDateObj = "";
							if (enrollmentDate != null && enrollmentDate != "") {
								Date enrollmentDateNew = Date.valueOf(enrollmentDate);
								enrollmentDateObj = enrollmentDateNew;
							}
							dataMap.put("ENROLLMENT_DATE", enrollmentDateObj );
							dataMap.put("STUDENT_NAME", eElement.getElementsByTagName("StudentName").item(0).getTextContent());
							dataMap.put("STUDENT_USERID", eElement.getElementsByTagName("StudentUserId").item(0).getTextContent());
							dataMap.put("AMOUNT_OF_TIME_OVERLAP", eElement.getElementsByTagName("AmountofTimeOverlap").item(0).getTextContent());
							dataMap.put("STAGE_INDICATOR", eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
							log.debug("DataMap values :{}",dataMap);
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
								String workItemId = workflowInstanceID.concat(firstStr).concat("_").concat(secString);
								assignee = taskService.getTaskAssignee(workItemId);
								log.debug("Executing else block assignee : {}",assignee);
							}
							dataMap.put("LAST_STEP", saveHistoryBackRoute);
							if (dataMap.get("LAST_STEP").equals("Set Variable for ARSC Review Decision")) {
								dataMap.put("WORKFLOW_STATUS", "COMPLETED");
							} else {
								dataMap.put("WORKFLOW_STATUS", "RUNNNING");
							}
							dataMap.put("LAST_STEP_ASSIGNEE", assignee);
							dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
							
							}  catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}				

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
					log.debug("ResultData : {}",resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {						
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/

				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "CWID", workflowInstanceID, dataMap,
							"INITIATED_DATE,STUDENT_SIGNATURE_DATE,RC_INSTRUCTOR_SIGN_DATE,TCC_INSTRUCTOR_SIGN_DATE,ARSC_SIGN_DATE,ENROLLMENT_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}

			}  catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			}finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in RequestForTimeConflictApprovalDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				/*if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in RequestForTimeConflictApprovalDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}*/
			}

		}
		
		
	}


}
