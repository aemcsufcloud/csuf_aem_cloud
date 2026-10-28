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

@Component(property = { "service.description=Dotted Line DB", "service.vendor=ThoughtFocus",
		"process.label=Challenge By Examination DB" })

public class ChallengeByExaminationDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(ChallengeByExaminationDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_CHALLENGE_BY_EXAMINATION";
		String formName = "Challenge by Examination";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;
		String assignee = "";
		MetaDataMap metaDataMapVal = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		String url = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";

		/*String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		
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
								log.debug("eElement : " + eElement);
								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", eElement.getElementsByTagName("CaseID").item(0).getTextContent());
								dataMap.put("STUDENT_NAME", eElement.getElementsByTagName("StudentFullName").item(0).getTextContent());
								dataMap.put("EMAIL", eElement.getElementsByTagName("Email").item(0).getTextContent());
								dataMap.put("MAJOR", eElement.getElementsByTagName("Major").item(0).getTextContent());
								dataMap.put("STUDENT_SIGN", eElement.getElementsByTagName("StuSign").item(0).getTextContent());
								
								String stuSignDate = eElement.getElementsByTagName("StuSignDate").item(0)
										.getTextContent();
								Object stuSignDateObj = null;
								if (stuSignDate != null && stuSignDate != "") {
									Date reqDateNew = Date.valueOf(stuSignDate);
									stuSignDateObj = reqDateNew;
								}
								dataMap.put("STUDENT_SIGN_DATE", stuSignDateObj);
								
								dataMap.put("STUDENT_SIGN_COMMENTS", eElement.getElementsByTagName("StuSignComments").item(0).getTextContent());
								dataMap.put("DEPT_CHAIR_USER_ID", eElement.getElementsByTagName("DeptChairUserId").item(0).getTextContent());
								dataMap.put("DEPT_CHAIR_SIGN", eElement.getElementsByTagName("DeptChairSign").item(0).getTextContent());
								
								String deptChairSignDate = eElement.getElementsByTagName("DeptChairSignDate").item(0)
										.getTextContent();
								Object deptChairSignDateObj = null;
								if (deptChairSignDate != null && deptChairSignDate != "") {
									Date reqDateNew = Date.valueOf(deptChairSignDate);
									deptChairSignDateObj = reqDateNew;
								}
								dataMap.put("DEPT_CHAIR_SIGN_DATE", deptChairSignDateObj);
								
								String deptChairDecision = eElement.getElementsByTagName("DeptChairRecommend").item(0).getTextContent();
								String deptChairRecommend = null;
								if( null != deptChairDecision && deptChairDecision.equals("0") ) {
									deptChairRecommend = "Approve"; 
								}
								if( null != deptChairDecision && deptChairDecision.equals("1") ) {
									deptChairRecommend = "Deny";
								}
								dataMap.put("DEPT_CHAIR_RECOMMEND", deptChairRecommend);
								dataMap.put("DEPT_CHAIR_COMMENTS", eElement.getElementsByTagName("DeptChairComments").item(0).getTextContent());
								dataMap.put("INSTRUCTOR_USER_ID", eElement.getElementsByTagName("InstructorUserId").item(0).getTextContent());
								dataMap.put("INSTRUCTOR_SIGN", eElement.getElementsByTagName("InstructorSign").item(0).getTextContent());
								
								String instructorSignDate = eElement.getElementsByTagName("InstructorSignDate").item(0)
										.getTextContent();
								Object instructorSignDateObj = null;
								if (instructorSignDate != null && instructorSignDate != "") {
									Date reqDateNew = Date.valueOf(instructorSignDate);
									instructorSignDateObj = reqDateNew;
								}
								dataMap.put("INSTRUCTOR_SIGN_DATE", instructorSignDateObj);
								
								String instructorDecision = eElement.getElementsByTagName("InstructorRecommend").item(0).getTextContent();
								String instructorRecommend = null;
								if( null != instructorDecision && instructorDecision.equals("0") ) {
									instructorRecommend = "Approve"; 
								}
								if( null != instructorDecision && instructorDecision.equals("1") ) {
									instructorRecommend = "Deny";
								}
								
								dataMap.put("INSTRUCTOR_RECOMMEND", instructorRecommend);
								dataMap.put("INSTRUCTOR_COMMENTS", eElement.getElementsByTagName("InstructorComments").item(0).getTextContent());
								
								String examAdministeredDate = eElement.getElementsByTagName("ExamAdministeredDate").item(0)
										.getTextContent();
								Object examAdministeredDateObj = null;
								if (examAdministeredDate != null && examAdministeredDate != "") {
									Date reqDateNew = Date.valueOf(examAdministeredDate);
									examAdministeredDateObj = reqDateNew;
								}
								dataMap.put("EXAM_ADMINISTERED_DATE", examAdministeredDateObj);
																
								String passNotPass = eElement.getElementsByTagName("PassedNotPassed").item(0).getTextContent();
								
								if( null != passNotPass && passNotPass.equals("0") ) {
									dataMap.put("PASSED_OR_NOT_PASSED", "Passed"); 
								}
								if( null != passNotPass && passNotPass.equals("1") ) {
									dataMap.put("PASSED_OR_NOT_PASSED", "Not Passed");
								}
								
								dataMap.put("GRADE", eElement.getElementsByTagName("Grade").item(0).getTextContent());
								dataMap.put("RECORDS_SIGN", eElement.getElementsByTagName("RecordsSign").item(0).getTextContent());
								
								String recordsSignDate = eElement.getElementsByTagName("RecordsSignDate").item(0)
										.getTextContent();
								Object recordsSignDateObj = null;
								if (recordsSignDate != null && recordsSignDate != "") {
									Date reqDateNew = Date.valueOf(recordsSignDate);
									recordsSignDateObj = reqDateNew;
								}
								dataMap.put("RECORDS_SIGN_DATE", recordsSignDateObj);
								
								
								String recordsDecision = eElement.getElementsByTagName("RecordsRecommend").item(0).getTextContent();
								String recordsRecommend = null;
								if( null != recordsDecision && recordsDecision.equals("0") ) {
									recordsRecommend = "Approve"; 
								}
								if( null != recordsDecision && recordsDecision.equals("1") ) {
									recordsRecommend = "Deny";
								}
								dataMap.put("RECORDS_RECOMMEND", recordsRecommend);
								dataMap.put("IS_STU_RECORD_UPDATED", eElement.getElementsByTagName("UpdatedStudentRecord").item(0).getTextContent());
								dataMap.put("RECORDS_COMMENTS", eElement.getElementsByTagName("RecordsComments").item(0).getTextContent());
								
								dataMap.put("COURSE_NO", eElement.getElementsByTagName("CourseNo").item(0).getTextContent());
								dataMap.put("SCHEDULE_NO", eElement.getElementsByTagName("ScheduleNo").item(0).getTextContent());
								dataMap.put("NUMBER_OF_UNITS", eElement.getElementsByTagName("NumberOfUnits").item(0).getTextContent());
								
								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
								
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
								
								if (dataMap.get("LAST_STEP").equals("Records Review")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else if (dataMap.get("LAST_STEP").equals("Department Chair Review")) {
									//if (metaDataMapVal.get("DeptChairRecommend") == null) {
									if(null != deptChairRecommend && !deptChairRecommend.equals("")) {
										if (deptChairRecommend.equalsIgnoreCase("Deny")) {
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
								
								
								
							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.debug("Connection Successfull");
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
				json.put("DATE_FIELDS", "STUDENT_SIGN_DATE,DEPT_CHAIR_SIGN_DATE,INSTRUCTOR_SIGN_DATE,EXAM_ADMINISTERED_DATE,RECORDS_SIGN_DATE");

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
						log.debug("IOException in ChallengeByExaminationDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in ChallengeByExaminationDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}

}
