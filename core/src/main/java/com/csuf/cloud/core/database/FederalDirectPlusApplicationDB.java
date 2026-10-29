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

@Component(property = { "service.description=Federal Direct Plus Application DB Save", "service.vendor=ThoughtFocus",
		"process.label=FederalDirectPlusApplicationDB" })
public class FederalDirectPlusApplicationDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(FederalDirectPlusApplicationDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_FED_DIRECT_PLUS_APPL";
		String formName = "Federal Direct Plus Application";
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
								dataMap.put("AID_YEAR", eElement.getElementsByTagName("AidYear").item(0).getTextContent());
								dataMap.put("FINANCIAL_AID_YEAR", eElement.getElementsByTagName("financialAidYear").item(0).getTextContent());
								String initiatedDate = eElement.getElementsByTagName("Date_1").item(0).getTextContent();
								Object initiatedDateObj = "";
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatedDate);
									initiatedDateObj = initiatedDateNew;
								}
								dataMap.put("INITIATED_DATE", initiatedDateObj);
								dataMap.put("FORM_CODE", eElement.getElementsByTagName("formCode").item(0).getTextContent());
								dataMap.put("STUDENT_NAME", eElement.getElementsByTagName("StudentName").item(0).getTextContent());
								dataMap.put("STUDENT_FIRST_NAME", eElement.getElementsByTagName("firstName").item(0).getTextContent());
								dataMap.put("STUDENT_LAST_NAME", eElement.getElementsByTagName("lastName").item(0).getTextContent());
								dataMap.put("STUDENT_MIDDLE_NAME", eElement.getElementsByTagName("StudentMiddleName").item(0).getTextContent());
								dataMap.put("FIRST_LOAN_APPLICATION", eElement.getElementsByTagName("FirstLoanApplicationRB").item(0).getTextContent());
								dataMap.put("LOAN_FOR_FALL_SPRING_TERM", eElement.getElementsByTagName("FallAndSpringTermCB").item(0).getTextContent());
								dataMap.put("LOAN_FOR_FALL_TERM", eElement.getElementsByTagName("FallTermCB").item(0).getTextContent());
								dataMap.put("LOAN_FOR_SPRING_TERM", eElement.getElementsByTagName("SpringTermCB").item(0).getTextContent());
								dataMap.put("LOAN_FOR_SUMMER_TERM", eElement.getElementsByTagName("SummerTermCB").item(0).getTextContent());
								dataMap.put("HOU_STATUS_PARENTS", eElement.getElementsByTagName("HSWithParentsCB").item(0).getTextContent());
								dataMap.put("HOU_STATUS_ON_CAMPUS", eElement.getElementsByTagName("HSOnCampusCB").item(0).getTextContent());
								dataMap.put("HOU_STATUS_OFF_CAMPUS", eElement.getElementsByTagName("HSOffCampusCB").item(0).getTextContent());
								dataMap.put("PARENT_FIRST_NAME", eElement.getElementsByTagName("ParentFirstName").item(0).getTextContent());
								dataMap.put("PARENT_LAST_NAME", eElement.getElementsByTagName("ParentLastName").item(0).getTextContent());
								dataMap.put("PARENT_MIDDLE_NAME", eElement.getElementsByTagName("ParentMiddleName").item(0).getTextContent());
								dataMap.put("RELATIONSHIP_STATUS", eElement.getElementsByTagName("RelationshipRB").item(0).getTextContent());
								dataMap.put("RELATIONSHIP_STATUS_OTHER", eElement.getElementsByTagName("RelationshipOthers").item(0).getTextContent());
								dataMap.put("SOCIAL_SECURITY_NUMBER", eElement.getElementsByTagName("SocialSecurityNumber").item(0).getTextContent());
								String parentDate = eElement.getElementsByTagName("DateofBirth").item(0).getTextContent();
								Object parentDateObj = "";
								if (parentDate != null && parentDate != "") {
									Date parentDateNew = Date.valueOf(parentDate);
									parentDateObj = parentDateNew;
								}
								dataMap.put("PARENT_DOB", parentDateObj); 
								dataMap.put("PARENT_STREET_ADDRESS", eElement.getElementsByTagName("PermanentStreetAddress").item(0).getTextContent());
								dataMap.put("PARENT_CITY_STATE_ZIP", eElement.getElementsByTagName("CityStateZipCode").item(0).getTextContent());
								dataMap.put("PARENT_DAY_TIME_PHONE", eElement.getElementsByTagName("DaytimePhoneNumber").item(0).getTextContent());
								dataMap.put("PARENT_EMAIL_ID", eElement.getElementsByTagName("ParentEmailAddress").item(0).getTextContent());
								dataMap.put("PARENT_US_CITIZEN_STATUS", eElement.getElementsByTagName("USCitizenshipStatusRB").item(0).getTextContent());
								dataMap.put("REQUESTED_LOAN_AMOUNT", eElement.getElementsByTagName("RequestedLoanAmount").item(0).getTextContent());
								dataMap.put("MAXIMUM_LOAN_AMOUNT", eElement.getElementsByTagName("MaximumAmountCB").item(0).getTextContent());
								dataMap.put("PARENT_ATTENDED_CSUF", eElement.getElementsByTagName("ParentAttendedCSURB").item(0).getTextContent());
								dataMap.put("PARENT_NAME_IN_RECORDS", eElement.getElementsByTagName("ParentNameSchoolRecord").item(0).getTextContent());
								dataMap.put("UNSUBSIDIZED_LOAN_CB", eElement.getElementsByTagName("CheckBox1_Deny").item(0).getTextContent());
								dataMap.put("COMPLETED_PLUS_CB", eElement.getElementsByTagName("CheckBox2_Deny").item(0).getTextContent());
								dataMap.put("APPEAL_CREDIT_DENIAL_CB", eElement.getElementsByTagName("CheckBox3_Deny").item(0).getTextContent());
								dataMap.put("STUDENT_SIGNATURE", eElement.getElementsByTagName("StudentSignature").item(0).getTextContent());
								String studentSignDate = eElement.getElementsByTagName("StudentSignatureDate").item(0).getTextContent();
								Object studentSignDateObj = "";
								if (studentSignDate != null && studentSignDate != "") {
									Date studentSignDateNew = Date.valueOf(studentSignDate);
									studentSignDateObj = studentSignDateNew;
								}
								dataMap.put("STUDENT_SIGN_DATE", studentSignDateObj); 
								dataMap.put("STUDENT_COMMENTS", eElement.getElementsByTagName("StudentComments").item(0).getTextContent());
								dataMap.put("FINANCIAL_AID_SIGNATURE", eElement.getElementsByTagName("FinancialAidSignature").item(0).getTextContent());
								String approverSignDate = eElement.getElementsByTagName("FinancialAidSignatureDate").item(0).getTextContent();
								Object approverSignDateObj = "";
								if (approverSignDate != null && approverSignDate != "") {
									Date approverSignDateNew = Date.valueOf(approverSignDate);
									approverSignDateObj = approverSignDateNew;
								}
								dataMap.put("FINANCIAL_AID_SIGN_DATE", approverSignDateObj ); 
								dataMap.put("FINANCIAL_AID_COMMENTS", eElement.getElementsByTagName("staffComment").item(0).getTextContent());
								dataMap.put("FINANCIAL_AID_DECISION", eElement.getElementsByTagName("staffDecision").item(0).getTextContent());
								dataMap.put("STUDENT_USERID", eElement.getElementsByTagName("StudentUserId").item(0).getTextContent());
								dataMap.put("STUDENT_EMAILID", eElement.getElementsByTagName("StudentEmailId").item(0).getTextContent());
								dataMap.put("IP_ADDRESS", eElement.getElementsByTagName("IPAddress").item(0).getTextContent());
								dataMap.put("STAGE_INDICATOR", eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
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
						log.debug("IOException in FederalDirectPlusApplicationDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in FederalDirectPlusApplicationDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}
		}
	}
}
