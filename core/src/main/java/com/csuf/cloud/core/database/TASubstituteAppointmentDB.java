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

@Component(property = { "service.description=TA Subsitute Appointement DB", "service.vendor=ThoughtFocus",
		"process.label=TA Subsitute Appointement DB" })

public class TASubstituteAppointmentDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(TASubstituteAppointmentDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_TA_SUBSTITUTE_APPOINTMENT";
		String formName = "TA Substitute Appointment";
		String assignee = "";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
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
								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("EMP_NAME",
										eElement.getElementsByTagName("EmpName").item(0).getTextContent());
								dataMap.put("POS_NUM_ASSIGNMENT",
										eElement.getElementsByTagName("PosNoSubAssignment").item(0).getTextContent());
								dataMap.put("CMS_POS_NO",
										eElement.getElementsByTagName("CMSPosNo").item(0).getTextContent());
								dataMap.put("DEPT_NAME",
										eElement.getElementsByTagName("DeptName").item(0).getTextContent());
								dataMap.put("DEPTID", eElement.getElementsByTagName("DeptID").item(0).getTextContent());
								dataMap.put("DEPT_UNIT_NO",
										eElement.getElementsByTagName("DeptUnitNum").item(0).getTextContent());
								String termEffdate = eElement.getElementsByTagName("TermEffDate").item(0)
										.getTextContent();
								Object termEffdateObj = "";
								if (termEffdate != null && termEffdate != "") {
									Date termEffdateNew = Date.valueOf(termEffdate);
									termEffdateObj = termEffdateNew;
								}
								dataMap.put("TERM_EFF_DATE", termEffdateObj);
								String termEndDate = eElement.getElementsByTagName("TermEndDate").item(0)
										.getTextContent();
								Object termEndDateObj = "";
								if (termEndDate != null && termEndDate != "") {
									Date termEndDateNew = Date.valueOf(termEndDate);
									termEndDateObj = termEndDateNew;
								}
								dataMap.put("TERM_END_DATE", termEndDateObj);
								dataMap.put("CURR_NO_HOURS",
										eElement.getElementsByTagName("CurrNoHrs").item(0).getTextContent());
								dataMap.put("SUB_ASSIGN_COURSE_NO",
										eElement.getElementsByTagName("SubAssignCourseNo").item(0).getTextContent());
								dataMap.put("BASE_PAY",
										eElement.getElementsByTagName("BasePay").item(0).getTextContent());
								dataMap.put("HOURLY_RATE",
										eElement.getElementsByTagName("HourlyRate").item(0).getTextContent());
								dataMap.put("TOTAL_HOURS",
										eElement.getElementsByTagName("TotNoHours").item(0).getTextContent());
								dataMap.put("TOTAL_COMP",
										eElement.getElementsByTagName("TotComp").item(0).getTextContent());
								dataMap.put("SUB_FACULTY",
										eElement.getElementsByTagName("FacultyRequiringSub").item(0).getTextContent());
								dataMap.put("REASON", eElement.getElementsByTagName("Reason").item(0).getTextContent());
								dataMap.put("INITIATOR_EXT",
										eElement.getElementsByTagName("Extension").item(0).getTextContent());
								dataMap.put("ADDITIONAL_COMMENTS",
										eElement.getElementsByTagName("AdditionalComments").item(0).getTextContent());
								dataMap.put("SUB_FACULTY_SIGN",
										eElement.getElementsByTagName("SubFacultySign").item(0).getTextContent());
								String subFacultyDate = eElement.getElementsByTagName("SubFacultyDate").item(0)
										.getTextContent();
								Object subFacultyDateObj = "";
								if (subFacultyDate != null && subFacultyDate != "") {
									Date subFacultyDateNew = Date.valueOf(subFacultyDate);
									subFacultyDateObj = subFacultyDateNew;
								}
								dataMap.put("SUB_FACULTY_DATE", subFacultyDateObj);
								dataMap.put("SUB_FACULTY_COMMENTS",
										eElement.getElementsByTagName("SubFacultyComments").item(0).getTextContent());
								dataMap.put("DEAN_SIGN",
										eElement.getElementsByTagName("DeanSign").item(0).getTextContent());
								String deanDate = eElement.getElementsByTagName("DeanDate").item(0).getTextContent();
								Object deanDateObj = "";
								if (deanDate != null && deanDate != "") {
									Date deanDateNew = Date.valueOf(deanDate);
									deanDateObj = deanDateNew;
								}
								dataMap.put("DEAN_DATE", deanDateObj);
								dataMap.put("DEAN_COMMENTS",
										eElement.getElementsByTagName("DeanComments").item(0).getTextContent());
								dataMap.put("CHAIR_SIGN",
										eElement.getElementsByTagName("ChairSign").item(0).getTextContent());
								String chairDate = eElement.getElementsByTagName("ChairDate").item(0).getTextContent();
								Object chairDateObj = "";
								if (chairDate != null && chairDate != "") {
									Date chairDateNew = Date.valueOf(chairDate);
									chairDateObj = chairDateNew;
								}
								dataMap.put("CHAIR_DATE", chairDateObj);
								dataMap.put("CHAIR_COMMENTS",
										eElement.getElementsByTagName("ChairComments").item(0).getTextContent());
								dataMap.put("REVIEWER_SIGN",
										eElement.getElementsByTagName("ReviewedBySign").item(0).getTextContent());
								String reviewedByDate = eElement.getElementsByTagName("ReviewedByDate").item(0)
										.getTextContent();
								Object reviewedByDateObj = "";
								if (reviewedByDate != null && reviewedByDate != "") {
									Date reviewedByDateNew = Date.valueOf(reviewedByDate);
									reviewedByDateObj = reviewedByDateNew;
								}
								dataMap.put("REVIEWER_DATE", reviewedByDateObj);
								dataMap.put("REVIEWER_COMMENTS",
										eElement.getElementsByTagName("ReviewedByComments").item(0).getTextContent());
								dataMap.put("REQUESTOR_NAME",
										eElement.getElementsByTagName("ReqName").item(0).getTextContent());
								String reqdate = eElement.getElementsByTagName("ReqDate").item(0).getTextContent();
								Object reqdateObj = "";
								if (reqdate != null && reqdate != "") {
									Date reqdateNew = Date.valueOf(reqdate);
									reqdateObj = reqdateNew;
								}
								dataMap.put("REQ_DATE", reqdateObj);
								dataMap.put("REQ_COMMENTS",
										eElement.getElementsByTagName("ReqComments").item(0).getTextContent());
								dataMap.put("PAYROLL_SIGNATURE", eElement.getElementsByTagName("PayrollSignature").item(0).getTextContent());
								String payrolldate = eElement.getElementsByTagName("PayrollDate").item(0).getTextContent();
								Object payrolldateObj = "";
								if (payrolldate != null && payrolldate != "") {
									Date payrolldateNew = Date.valueOf(payrolldate);
									payrolldateObj = payrolldateNew;
								}
								dataMap.put("PAYROLL_DATE", payrolldateObj);
	                            dataMap.put("PAYROLL_COMMENTS", 
	                            		eElement.getElementsByTagName("PayrollComments").item(0).getTextContent());
								dataMap.put("CHAIR_EMAIL",
										eElement.getElementsByTagName("ChairEmail").item(0).getTextContent());
								dataMap.put("CHAIR_UID",
										eElement.getElementsByTagName("ChairUserID").item(0).getTextContent());
								dataMap.put("CHAIR_NAME",
										eElement.getElementsByTagName("ChairName").item(0).getTextContent());
								dataMap.put("DEAN_UID",
										eElement.getElementsByTagName("DeanUserID").item(0).getTextContent());
								dataMap.put("DEAN_EMAIL",
										eElement.getElementsByTagName("DeanEmail").item(0).getTextContent());
								dataMap.put("DEAN_NAME",
										eElement.getElementsByTagName("DeanName").item(0).getTextContent());
								dataMap.put("SUB_FACULTY_UID", eElement.getElementsByTagName("SubstituteFacultyUserID")
										.item(0).getTextContent());
								dataMap.put("SUB_FACULTY_NAME", eElement.getElementsByTagName("SubstituteFacultyName")
										.item(0).getTextContent());
								dataMap.put("SUB_FACULTY_EMAIL", eElement.getElementsByTagName("SubstituteFacultyEmail")
										.item(0).getTextContent());
								dataMap.put("PREPARED_BY",
										eElement.getElementsByTagName("PreparedBy").item(0).getTextContent());
								dataMap.put("PREPARER_UID",
										eElement.getElementsByTagName("PreparerUserID").item(0).getTextContent());
								dataMap.put("PREPARER_EMAIL",
										eElement.getElementsByTagName("PreparerEmail").item(0).getTextContent());
								
								dataMap.put("OPTIONAL_REVIEWER_SIGNATURE", eElement.getElementsByTagName("OptionalReviewerSignature").item(0).getTextContent());
                                dataMap.put("OPTIONAL_REVIEWER_NAME", eElement.getElementsByTagName("OptionalReviewerName").item(0).getTextContent());
                                dataMap.put("OPTIONAL_REVIEWER_USERID", eElement.getElementsByTagName("OptionalReviewerUserId").item(0).getTextContent());
                                dataMap.put("OPTIONAL_REVIEWER_EMAILID", eElement.getElementsByTagName("OptionalReviewerEmailId").item(0).getTextContent());
                                dataMap.put("OPTIONAL_REVIEWER_COMMENTS", eElement.getElementsByTagName("OptionalReviewerComments").item(0).getTextContent());
                                String optrevdate = eElement.getElementsByTagName("OptionalReviewerSignatureDate").item(0).getTextContent();
                                Object optrevdateObj = "";
                                if (optrevdate != null && optrevdate != "") {
                                    Date optrevdateObjNew = Date.valueOf(optrevdate);
                                    optrevdateObj = optrevdateObjNew;
                                }
                                dataMap.put("OPTIONAL_REVIEW_DATE", optrevdateObj);

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
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "CWID", workflowInstanceID, dataMap,
							"TERM_EFF_DATE,TERM_END_DATE,SUB_FACULTY_DATE,DEAN_DATE,CHAIR_DATE,REVIEWER_DATE,REQ_DATE,PAYROLL_DATE,OPTIONAL_REVIEW_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}


			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in TASubstituteTimesheetDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
/*				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in TASubstituteTimesheetDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}*/
			}

		}

	}

}
