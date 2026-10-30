package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Student Timeheet Manual Entry DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=StudentTimeheetManualEntryDB" })
public class StudentTimesheetManualEntryDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(StudentTimesheetManualEntryDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		DatabaseUtils dbUtil = new DatabaseUtils();
		Document doc = null;
		InputStream is = null;
		String workflowInstanceID = "";
		String employeeId = "";
		String chrsId = "";
		String employeeRec = "";
		String month = "";
		String year = "";
		String firstName = "";
		String lastName = "";
		String classTaken = "";
		String unit = "";
		String cmsDept = "";
		String taskProfile = "";
		String rateOfPay = "";
		String totalHours = "";
		String grossPay = "";
		String studentSignature = "";
		String studentSignDate = "";
		String supervisorSignature = "";
		String supSignDate = "";
		String timekeeperSignature = "";
		String timekeeperDate = "";
		String authFWSAmount = "";
		String lessFWSEarned = "";
		String fwsBalToBeEarned = "";
		String division = "";
		String unionCD = "";
		String supEmail = "";
		String middleInitial = "";
		String sunHours = "";
		String monHours = "";
		String tuesHours = "";
		String wedHours = "";
		String thurHours = "";
		String friHours = "";
		String satHours = "";
		String sunWeekDay = "";
		String monWeekDay = "";
		String tuesWeekDay= "";
		String wedWeekDay = "";
		String thurWeekDay= "";
		String friWeekDay = "";
		String satWeekDay = "";
		String payrollSignature = "";
		String payrollDate = "";

		LinkedHashMap<String, Object> dataMapEmpInfo = null;
		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);
		workflowInstanceID = workItem.getWorkflow().getId();

		if (conn != null) {
			if (StringUtils.isNotBlank(payloadPath)) {
				try {
					is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");

					if (null != is) {
						doc = XMLUtils.getDomDocument(is);

						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {

							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								employeeId = eElement.getElementsByTagName("EmployeeId").item(0).getTextContent();
								chrsId = eElement.getElementsByTagName("CHRSID").item(0).getTextContent();
								employeeRec = eElement.getElementsByTagName("EmployeeRec").item(0).getTextContent();
								month = eElement.getElementsByTagName("Month").item(0).getTextContent();
								year = eElement.getElementsByTagName("Year").item(0).getTextContent();
								firstName = eElement.getElementsByTagName("FirstName").item(0).getTextContent();
								lastName = eElement.getElementsByTagName("LastName").item(0).getTextContent();
								middleInitial = eElement.getElementsByTagName("MiddleInitial").item(0).getTextContent();
								unit = eElement.getElementsByTagName("Unit").item(0).getTextContent();
								classTaken = eElement.getElementsByTagName("ClassTaken").item(0).getTextContent();
								cmsDept = eElement.getElementsByTagName("CmsDept").item(0).getTextContent();
								taskProfile = eElement.getElementsByTagName("TaskProfile").item(0).getTextContent();
								rateOfPay = eElement.getElementsByTagName("RateOfPay").item(0).getTextContent();
								totalHours = eElement.getElementsByTagName("TotalHours").item(0).getTextContent();
								grossPay = eElement.getElementsByTagName("GrossPay").item(0).getTextContent();
								studentSignature = eElement.getElementsByTagName("StudentSignature").item(0)
										.getTextContent();
								studentSignDate = eElement.getElementsByTagName("StudentSignDate").item(0)
										.getTextContent();
								supervisorSignature = eElement.getElementsByTagName("SupervisorSignature").item(0)
										.getTextContent();
								supSignDate = eElement.getElementsByTagName("SupSignDate").item(0).getTextContent();
								timekeeperSignature = eElement.getElementsByTagName("TimekeeperSignature").item(0)
										.getTextContent();
								timekeeperDate = eElement.getElementsByTagName("TimekeeperDate").item(0)
										.getTextContent();
								authFWSAmount = eElement.getElementsByTagName("AuthFWSAmount").item(0).getTextContent();
								lessFWSEarned = eElement.getElementsByTagName("LessFWSEarned").item(0).getTextContent();
								fwsBalToBeEarned = eElement.getElementsByTagName("FWSBalToBeEarned").item(0)
										.getTextContent();
								division = eElement.getElementsByTagName("Division").item(0).getTextContent();
								unionCD = eElement.getElementsByTagName("Union_CD").item(0).getTextContent();
								supEmail = eElement.getElementsByTagName("SupEmail").item(0).getTextContent();
								payrollSignature = eElement.getElementsByTagName("PayrollSignature").item(0)
										.getTextContent();
								payrollDate = eElement.getElementsByTagName("PayrollSignDate").item(0).getTextContent();

								dataMapEmpInfo = new LinkedHashMap<String, Object>();
								dataMapEmpInfo.put("EMP_ID", employeeId);
								dataMapEmpInfo.put("CHRS_ID", chrsId);
								dataMapEmpInfo.put("EMP_REC", employeeRec);
								dataMapEmpInfo.put("MONTH", month);
								dataMapEmpInfo.put("YEAR", year);
								dataMapEmpInfo.put("FIRST_NAME", firstName);
								dataMapEmpInfo.put("LAST_NAME", lastName);
								dataMapEmpInfo.put("MIDDLE_INITIAL", middleInitial);
								dataMapEmpInfo.put("UNIT", unit);
								dataMapEmpInfo.put("CLASS", classTaken);
								dataMapEmpInfo.put("DEPTID", cmsDept);
								dataMapEmpInfo.put("TASK_PROFILE_VALUE", taskProfile);
								dataMapEmpInfo.put("RATE_OF_PAY", rateOfPay);
								dataMapEmpInfo.put("TOTAL_DECIMAL_HOURS", totalHours);
								dataMapEmpInfo.put("GROSS_PAY", grossPay);
								dataMapEmpInfo.put("STUDENT_SIGNATURE", studentSignature);
								Object stuDateObj = null;
								if (studentSignDate != null && studentSignDate != "") {
									Date stuDateNew = Date.valueOf(studentSignDate);
									stuDateObj = stuDateNew;
								}
								dataMapEmpInfo.put("STUDENT_DATE", stuDateObj);
								dataMapEmpInfo.put("SUPERVISOR_SIGN", supervisorSignature);
								Object supDateObj = null;
								if (supSignDate != null && supSignDate != "") {
									Date supDateNew = Date.valueOf(supSignDate);
									supDateObj = supDateNew;
								}
								dataMapEmpInfo.put("SUPERVISOR_DATE", supDateObj);

								dataMapEmpInfo.put("TIMEKEEPER_SIGN", timekeeperSignature);
								Object timekeeperDateObj = null;
								if (timekeeperDate != null && timekeeperDate != "") {
									Date timekeeperDateNew = Date.valueOf(timekeeperDate);
									timekeeperDateObj = timekeeperDateNew;
								}
								dataMapEmpInfo.put("TIMEKEEPER_DATE", timekeeperDateObj);
								
								dataMapEmpInfo.put("PAYROLL_SIGN", payrollSignature);
								Object payrollDateObj = null;
								if (payrollDate != null && payrollDate != "") {
									Date payrollDateNew = Date.valueOf(payrollDate);
									payrollDateObj = payrollDateNew;
								}
								dataMapEmpInfo.put("PAYROLL_DATE", payrollDateObj);
								
								dataMapEmpInfo.put("AUTH_FWS_AMOUNT", authFWSAmount);
								dataMapEmpInfo.put("LESS_FWS_EARNED", lessFWSEarned);
								dataMapEmpInfo.put("FWS_BAL_TO_EARNED", fwsBalToBeEarned);
								dataMapEmpInfo.put("DIVISION", division);
								dataMapEmpInfo.put("UNION_CD", unionCD);
								dataMapEmpInfo.put("SUPERVISOR_EMAIL", supEmail);
								dataMapEmpInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

								for (int k = 1; k <= 6; k++) {
									String indexVal = String.valueOf(k);
									sunWeekDay = eElement.getElementsByTagName("SunDate".concat(indexVal)).item(0)
											.getTextContent();
									monWeekDay = eElement.getElementsByTagName("MonDate".concat(indexVal)).item(0)
											.getTextContent();
									tuesWeekDay = eElement.getElementsByTagName("TuesDate".concat(indexVal)).item(0)
											.getTextContent();
									wedWeekDay = eElement.getElementsByTagName("WedDate".concat(indexVal)).item(0)
											.getTextContent();
									thurWeekDay = eElement.getElementsByTagName("ThurDate".concat(indexVal)).item(0)
											.getTextContent();
									friWeekDay = eElement.getElementsByTagName("FridayDate".concat(indexVal)).item(0)
											.getTextContent();
									satWeekDay = eElement.getElementsByTagName("SatDate".concat(indexVal)).item(0)
											.getTextContent();
									
									sunHours = eElement.getElementsByTagName("SunHrsMins".concat(indexVal)).item(0)
											.getTextContent();
									monHours = eElement.getElementsByTagName("MonHrsMins".concat(indexVal)).item(0)
											.getTextContent();
									tuesHours = eElement.getElementsByTagName("TueHrsMins".concat(indexVal)).item(0)
											.getTextContent();
									wedHours = eElement.getElementsByTagName("WedHrsMins".concat(indexVal)).item(0)
											.getTextContent();
									thurHours = eElement.getElementsByTagName("ThuHrsMins".concat(indexVal)).item(0)
											.getTextContent();
									friHours = eElement.getElementsByTagName("FriHrsMins".concat(indexVal)).item(0)
											.getTextContent();
									satHours = eElement.getElementsByTagName("SatHrsMins".concat(indexVal)).item(0)
											.getTextContent();
									
									dataMapEmpInfo.put("SUN_HOURS".concat(indexVal),sunHours);
									dataMapEmpInfo.put("MON_HOURS".concat(indexVal), monHours);
									dataMapEmpInfo.put("TUES_HOURS".concat(indexVal), tuesHours);
									dataMapEmpInfo.put("WED_HOURS".concat(indexVal), wedHours);
									dataMapEmpInfo.put("THUR_HOURS".concat(indexVal), thurHours);
									dataMapEmpInfo.put("FRI_HOURS".concat(indexVal), friHours);
									dataMapEmpInfo.put("SAT_HOURS".concat(indexVal), satHours);
									
									dataMapEmpInfo.put("SUN_WEEK_DAY".concat(indexVal),sunWeekDay);
									dataMapEmpInfo.put("MON_WEEK_DAY".concat(indexVal), monWeekDay);
									dataMapEmpInfo.put("TUES_WEEK_DAY".concat(indexVal), tuesWeekDay);
									dataMapEmpInfo.put("WED_WEEK_DAY".concat(indexVal), wedWeekDay);
									dataMapEmpInfo.put("THUR_WEEK_DAY".concat(indexVal), thurWeekDay);
									dataMapEmpInfo.put("FRI_WEEK_DAY".concat(indexVal), friWeekDay);
									dataMapEmpInfo.put("SAT_WEEK_DAY".concat(indexVal), satWeekDay);
									
								}
								dbUtil.insertFormData(conn, dataMapEmpInfo, "AEM_STUDENT_TIMESHEET_MANUAL", "Student Timesheet Manual Entry");
							}

						}
					}

				} catch (Exception e) {
					log.error("Exception From StudentTimesheetManualEntryDB Class" + Arrays.toString(e.getStackTrace())
							+ "Error Message" + e.getMessage());
				} finally {
					if (null != is)
						try {
							is.close();
						} catch (IOException e) {
							log.error("IOException From StudentTimesheetManualEntryDB Class"
									+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
						}
					if (conn != null) {
						try {
							conn.close();
						} catch (SQLException e) {
							log.error("SQLException From StudentTimesheetManualEntryDB Class"
									+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
						}
					}
				}

			}
		}
	}

}
