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

@Component(property = { "service.description=Substitute Faculty Time Sheet DB", "service.vendor=ThoughtFocus",
		"process.label=Substitute Faculty Time Sheet DB" })

public class SubstituteFacultyTimeSheetDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;
	
	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(SubstituteFacultyTimeSheetDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_SUBSTITUTE_FACULTY_TS";
		String formName = "Substitute Faculty Time Sheet";			
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
							log.debug("index="+temp);
							dataMap.put("CHRSID", eElement.getElementsByTagName("CHRSID").item(0).getTextContent());
							dataMap.put("MONTH_YEAR", eElement.getElementsByTagName("MonthYear").item(0).getTextContent());
							dataMap.put("LAST_NAME", eElement.getElementsByTagName("LastName").item(0).getTextContent());
							dataMap.put("FIRST_NAME", eElement.getElementsByTagName("FirstName").item(0).getTextContent());
							dataMap.put("MIDDLE_INITIAL", eElement.getElementsByTagName("MiddleInitial").item(0).getTextContent());
							dataMap.put("POS_NO_SUB_ASSIGNMENT", eElement.getElementsByTagName("PosNoSubAssignment").item(0).getTextContent());
						    dataMap.put("CMS_POS_NO", eElement.getElementsByTagName("CMSPosNo").item(0).getTextContent());
                            dataMap.put("LECTURE_HOURS_TOTAL", eElement.getElementsByTagName("LectureHoursTotal").item(0).getTextContent());
							dataMap.put("LAB_HOURS_TOTAL", eElement.getElementsByTagName("LabHoursTotal").item(0).getTextContent());
							dataMap.put("RANGE_CODE", eElement.getElementsByTagName("RangeCode").item(0).getTextContent());
							dataMap.put("NUMBER_OF_LECTURE_HOURS", eElement.getElementsByTagName("NumberofLectureHours").item(0).getTextContent());
							dataMap.put("NUMBER_OF_LAB_PREP_HOURS", eElement.getElementsByTagName("NumberofLabPrepHours").item(0).getTextContent());
							dataMap.put("HOURLY_RATE_OF_PAY_LECTURE", eElement.getElementsByTagName("HourlyRateOfPayLecture").item(0).getTextContent());
							dataMap.put("HOURLY_RATE_OF_PAY_LAB", eElement.getElementsByTagName("HourlyRateOfPayLab").item(0).getTextContent());
							dataMap.put("LECTURE_PAYMENT", eElement.getElementsByTagName("LecturePayment").item(0).getTextContent());
							dataMap.put("LAB_PAYMENT", eElement.getElementsByTagName("LabPayment").item(0).getTextContent());
							dataMap.put("COMBINED_TOTAL_PAYMENT_DUE", eElement.getElementsByTagName("CombinedTotalPaymentDue").item(0).getTextContent());
							dataMap.put("EMP_UNION_CD", eElement.getElementsByTagName("EmpUnionCD").item(0).getTextContent());

							dataMap.put("EMPLOYEE_SIGNATURE", eElement.getElementsByTagName("EmployeeSignature").item(0).getTextContent());
							String employeedate = eElement.getElementsByTagName("EmployeeDate").item(0).getTextContent();
							Object employeedateObj = "";
							if (employeedate != null && employeedate != "") {
								Date employeedateNew = Date.valueOf(employeedate);
								employeedateObj = employeedateNew;
							}
							dataMap.put("EMPLOYEE_DATE", employeedateObj);
							
							dataMap.put("DEPT_CHAIR_SIGN", eElement.getElementsByTagName("DeptChairSign").item(0).getTextContent());
							String chairdate = eElement.getElementsByTagName("ChairDate").item(0).getTextContent();
							Object chairdateObj = "";
							if (chairdate != null && chairdate != "") {
								Date chairdateNew = Date.valueOf(chairdate);
								chairdateObj = chairdateNew;
							}
							dataMap.put("CHAIR_DATE", chairdateObj);
							

							dataMap.put("DEPT_COO_SIGNATURE", eElement.getElementsByTagName("DeptCooSignature").item(0).getTextContent());
							String deptcoodate = eElement.getElementsByTagName("DeptCooDate").item(0).getTextContent();
							Object deptcoodateObj = "";
							if (deptcoodate != null && deptcoodate != "") {
								Date deptcoodateNew = Date.valueOf(deptcoodate);
								deptcoodateObj = deptcoodateNew;
							}
							dataMap.put("DEPT_COO_DATE", deptcoodateObj);
							
							dataMap.put("PAYROLL_SIGNATURE", eElement.getElementsByTagName("PayrollSignature").item(0).getTextContent());
							String payrolldate = eElement.getElementsByTagName("PayrollDate").item(0).getTextContent();
							Object payrolldateObj = "";
							if (payrolldate != null && payrolldate != "") {
								Date payrolldateNew = Date.valueOf(payrolldate);
								payrolldateObj = payrolldateNew;
							}
							dataMap.put("PAYROLL_DATE", payrolldateObj);
															
							dataMap.put("STAGE_INDICATOR", eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
							dataMap.put("REPORTING_UNIT", eElement.getElementsByTagName("ReportingUnit").item(0).getTextContent());

							dataMap.put("EMPL_ID", eElement.getElementsByTagName("EmplId").item(0).getTextContent());
							dataMap.put("DEPT_ID", eElement.getElementsByTagName("DeptId").item(0).getTextContent());
							cwid = eElement.getElementsByTagName("EmplId").item(0).getTextContent();
							
							dataMap.put("FACULTY_USER_ID", eElement.getElementsByTagName("FacultyUserId").item(0).getTextContent());
							dataMap.put("FACULTY_EMAIL", eElement.getElementsByTagName("FacultyEmail").item(0).getTextContent());
							dataMap.put("FACULTY_NAME", eElement.getElementsByTagName("FacultyName").item(0).getTextContent());
							
							dataMap.put("DEPT_COO_USER_ID", eElement.getElementsByTagName("DeptCooUserId").item(0).getTextContent());
							dataMap.put("DEPT_COO_USER_EMAIL", eElement.getElementsByTagName("DeptCooEmail").item(0).getTextContent());
							dataMap.put("DEPT_COO_USER_NAME", eElement.getElementsByTagName("DeptCooName").item(0).getTextContent());							
		
				            dataMap.put("CHAIR_USER_ID", eElement.getElementsByTagName("ChairUserId").item(0).getTextContent());
							dataMap.put("CHAIR_EMAIL", eElement.getElementsByTagName("ChairEmail").item(0).getTextContent());
							dataMap.put("CHAIR_NAME", eElement.getElementsByTagName("ChairName").item(0).getTextContent());							
		
	                        dataMap.put("EMPLOYEE_COMMENTS", eElement.getElementsByTagName("EmployeeComments").item(0).getTextContent());
							dataMap.put("CHAIR_COMMENTS", eElement.getElementsByTagName("ChairComments").item(0).getTextContent());
							dataMap.put("DEPT_COO_COMMENTS", eElement.getElementsByTagName("DeptCooComments").item(0).getTextContent());
							dataMap.put("PAYROLL_COMMENTS", eElement.getElementsByTagName("PayrollComments").item(0).getTextContent());
							
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
                            dataMap.put("OPTIONAL_REVIEWER_SIGNATURE", eElement.getElementsByTagName("OptionalReviewerSignature").item(0).getTextContent());

							for (int i = 0; i < XMLUtils.getElementLength(eElement, "EstimatedHoursWS"); i++) {
								dataMap.put("LECTURE1_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture1", i));
								dataMap.put("LAB1_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab1", i));
								dataMap.put("LAB2_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab2", i));
								dataMap.put("LECTURE2_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture2", i));
								dataMap.put("LAB3_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab3", i));
                                dataMap.put("LECTURE3_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture3", i));
								dataMap.put("LECTURE4_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture4", i));
								dataMap.put("LAB4_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab4", i));
								dataMap.put("LAB5_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab5", i));
								dataMap.put("LECTURE5_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture5", i));
								dataMap.put("LAB6_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab6", i));
                                dataMap.put("LECTURE6_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture6", i));
								dataMap.put("LAB7_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab7", i));
								dataMap.put("LECTURE7_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture7", i));
								dataMap.put("LAB8_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab8", i));
							    dataMap.put("LECTURE8_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture8", i));
								dataMap.put("LAB9_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab9", i));
								dataMap.put("LECTURE9_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture9", i));
								dataMap.put("LAB10_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab10", i));
								dataMap.put("LECTURE10_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture10", i));
								dataMap.put("LAB11_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab11", i));
								dataMap.put("LECTURE11_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture11", i));
								dataMap.put("LAB12_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab12", i));
								dataMap.put("LECTURE12_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture12", i));
								dataMap.put("LAB13_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab13", i));
                                dataMap.put("LECTURE13_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture13", i));
                                dataMap.put("LAB14_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab14", i));
                                dataMap.put("LECTURE14_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture14", i));
                                dataMap.put("LAB15_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab15", i));
                                dataMap.put("LECTURE15_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture15", i));
                                dataMap.put("LAB16_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab16", i));
                                dataMap.put("LECTURE16_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture16", i));
								dataMap.put("LECTURE17_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture17", i));
								dataMap.put("LAB17_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab17", i));
								dataMap.put("LAB18_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab18", i));
								dataMap.put("LECTURE18_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture18", i));
								dataMap.put("LAB19_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab19", i));
								dataMap.put("LECTURE19_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture19", i));
								dataMap.put("LECTURE20_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture20", i));
								dataMap.put("LAB20_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab20", i));
								dataMap.put("LAB21_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab21", i));
								dataMap.put("LECTURE21_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture21", i));
								dataMap.put("LAB22_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab22", i));
								dataMap.put("LECTURE22_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture22", i));
								dataMap.put("LAB23_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab23", i));
								dataMap.put("LECTURE23_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture23", i));
								dataMap.put("LAB24_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab24", i));
								dataMap.put("LECTURE24_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture24", i));
								dataMap.put("LAB25_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab25", i));
								dataMap.put("LECTURE25_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture25", i));
								dataMap.put("LAB26_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab26", i));
                                dataMap.put("LECTURE26_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture26", i));
								dataMap.put("LAB27_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab27", i));
                                dataMap.put("LECTURE27_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture27", i));
								dataMap.put("LAB28_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab28", i));
                                dataMap.put("LECTURE28_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture28", i));
								dataMap.put("LAB29_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab29", i));
                                dataMap.put("LECTURE29_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture29", i));
								dataMap.put("LAB30_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab30", i));
                                dataMap.put("LECTURE30_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture30", i));
								dataMap.put("LAB31_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lab31", i));
                                dataMap.put("LECTURE31_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "Lecture31", i));
                                dataMap.put("LABN1_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "LabN_1", i));
                                dataMap.put("LECTUREN31_HRS", XMLUtils.getChildNodeContentOfElement(eElement, "LectureN_1", i));
								
												break;
								}
							
							
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
								String workItemId = workflowInstanceID.concat(firstStr).concat("_").concat(secString);
								assignee = taskService.getTaskAssignee(workItemId);
							}
							dataMap.put("LAST_STEP", saveHistoryBackRoute);
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
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "EMPL_ID", workflowInstanceID, tableName);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "EMPL_ID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {						
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "EMPL_ID", workflowInstanceID, dataMap,
							"EMPLOYEE_DATE,CHAIR_DATE,DEPT_COO_DATE,PAYROLL_DATE,OPTIONAL_REVIEW_DATE");
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
						log.debug("IOException in SubstituteFacultyTimeSheetDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
/*				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in SubstituteFacultyTimeSheetDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}*/
			}
			

		}

	}

}
