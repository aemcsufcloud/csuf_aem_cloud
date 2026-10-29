package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedHashMap;
import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.DatabaseUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Employee Fee Waiver Save in DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=EmployeeFeeWaiverDB" })
public class CSUFEmployeeFeeWaiverDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFEmployeeFeeWaiverDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		DatabaseUtils dbUtil = new DatabaseUtils();
		String tableName = "AEM_EMPLOYEE_FEE_WAIVER";
		String formName = "Employee Fee Waiver";

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;
		String wfInstanceID = workItem.getWorkflow().getId();
		String firstName = "";
		String lastName = "";
		String empId = "";
		String chrsId="";
		String departmentName = "";
		String extension = "";
		String bargainingUnit = "";
		String jobCode = "";
		String jobType = "";
		String probationStatus = "";
		String temporary = "";
		String enddate = "";
		String onLeaveCheck = "";
		String semester = "";
		String year = "";
		String classStanding = "";
		String studentType = "";
		String campus_Attending = "";
		String studentId = "";
		String approvedPlan = "";
		String major = "";
		String courseInfoComment = "";
		String courseTitle1 = "";
		String wr_Cd1 = "";
		String onlineCourse1 = "";
		String unit1 = "";
		String day1 = "";
		String hours1 = "";
		String releaseTime1 = "";
		String courseTitle2 = "";
		String wr_Cd2 = "";
		String onlineCourse2 = "";
		String unit2 = "";
		String day2 = "";
		String hours2 = "";
		String releaseTime2 = "";
		String comment1 = "";
		String gradProfBusStatement = "";
		String authorizationInitials = "";
		String empSign = "";
		String dateInitiated = "";
		String SemesterCode1 = "";
		String ClassStandingCode1 = "";
		String deptChairPrintName = "";
		String deptChairSign = "";
		String deptchairSignedDate = "";
		String collegeDeanPrintName = "";
		String collegeDeanSign = "";
		String collegeDeanSignedDate = "";
		String provostPrintName = "";
		String provostSign = "";
		String provostDate = "";
		String releaseTimeCheck = "";
		String WorkScheduleChangeCheck = "";
		String daysAndTimes = "";
		String supervisorPrintname = "";
		String supervisorSign = "";
		String supervisorSignedDate = "";
		String administratorPrintName = "";
		String administratorSign = "";
		String administratorSignedDate = "";
		String hrComments = "";
		String feeWaiverGranted = "";
		String feeWaiverDenied = "";
		String term = "";
		String EDDE = "";
		String hrSign = "";
		String hrSigneddate = "";
		String comment2 = "";
		String reimb = "";
		String timeTB1 = "";
		String timeTB2 = "";
		String empEmail = "";
		LinkedHashMap<String, Object> dataMap = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);
		if (conn != null) {
			while (xmlFiles.hasNext()) {
				Resource attachmentXml = xmlFiles.next();
				// log.info("xmlFiles inside ");
				String filePath = attachmentXml.getPath();

				log.info("filePath= " + filePath);
				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					log.info("xmlFiles=" + filePath);
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
					} catch (ValueFormatException e2) {

					} catch (PathNotFoundException e2) {
						log.error("Exception2=" + e2.getMessage());
						e2.printStackTrace();
					} catch (RepositoryException e2) {
						log.error("Exception3=" + e2.getMessage());
						e2.printStackTrace();
					}

					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.info("ParserConfigurationException=" + e1);
							e1.printStackTrace();
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.error("IOException in CSUFEmployeeFeeWaiverDB=" + Arrays.toString(e1.getStackTrace()));
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {

								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								firstName = eElement.getElementsByTagName("firstName").item(0).getTextContent();
								lastName = eElement.getElementsByTagName("lastName").item(0).getTextContent();
								empId = eElement.getElementsByTagName("empId").item(0).getTextContent();
								chrsId = eElement.getElementsByTagName("chrsId").item(0).getTextContent();
								departmentName = eElement.getElementsByTagName("departmentName").item(0)
										.getTextContent();
								extension = eElement.getElementsByTagName("extension").item(0).getTextContent();
								bargainingUnit = eElement.getElementsByTagName("bargainingUnit").item(0)
										.getTextContent();
								jobCode = eElement.getElementsByTagName("jobCode").item(0).getTextContent();
								jobType = eElement.getElementsByTagName("jobType").item(0).getTextContent();
								probationStatus = eElement.getElementsByTagName("probationStatus").item(0)
										.getTextContent();
								temporary = eElement.getElementsByTagName("temporary").item(0).getTextContent();
								enddate = eElement.getElementsByTagName("enddate").item(0).getTextContent();
								onLeaveCheck = eElement.getElementsByTagName("onLeaveCheck").item(0).getTextContent();
								semester = eElement.getElementsByTagName("semester").item(0).getTextContent();
								year = eElement.getElementsByTagName("year").item(0).getTextContent();
								classStanding = eElement.getElementsByTagName("classStanding").item(0).getTextContent();
								studentType = eElement.getElementsByTagName("studentType").item(0).getTextContent();
								campus_Attending = eElement.getElementsByTagName("campus_Attending").item(0)
										.getTextContent();
								studentId = eElement.getElementsByTagName("studentId").item(0).getTextContent();
								approvedPlan = eElement.getElementsByTagName("approvedPlan").item(0).getTextContent();
								major = eElement.getElementsByTagName("major").item(0).getTextContent();
								courseInfoComment = eElement.getElementsByTagName("courseInfoComment").item(0)
										.getTextContent();
								courseTitle1 = eElement.getElementsByTagName("courseTitle1").item(0).getTextContent();
								wr_Cd1 = eElement.getElementsByTagName("wr_Cd1").item(0).getTextContent();
								onlineCourse1 = eElement.getElementsByTagName("onlineCourse1").item(0).getTextContent();
								unit1 = eElement.getElementsByTagName("unit1").item(0).getTextContent();
								day1 = eElement.getElementsByTagName("day1").item(0).getTextContent();
								hours1 = eElement.getElementsByTagName("hours1").item(0).getTextContent();
								releaseTime1 = eElement.getElementsByTagName("releaseTime1").item(0).getTextContent();
								courseTitle2 = eElement.getElementsByTagName("courseTitle2").item(0).getTextContent();
								wr_Cd2 = eElement.getElementsByTagName("wr_Cd2").item(0).getTextContent();
								onlineCourse2 = eElement.getElementsByTagName("onlineCourse2").item(0).getTextContent();
								unit2 = eElement.getElementsByTagName("unit2").item(0).getTextContent();
								day2 = eElement.getElementsByTagName("day2").item(0).getTextContent();
								hours2 = eElement.getElementsByTagName("hours2").item(0).getTextContent();
								releaseTime2 = eElement.getElementsByTagName("releaseTime2").item(0).getTextContent();
								comment1 = eElement.getElementsByTagName("comment1").item(0).getTextContent();
								gradProfBusStatement = eElement.getElementsByTagName("gradProfBusStatement").item(0)
										.getTextContent();
								authorizationInitials = eElement.getElementsByTagName("authorizationInitials").item(0)
										.getTextContent();
								empSign = eElement.getElementsByTagName("empSign").item(0).getTextContent();
								dateInitiated = eElement.getElementsByTagName("dateInitiated").item(0).getTextContent();
								deptChairPrintName = eElement.getElementsByTagName("deptChairPrintName").item(0)
										.getTextContent();
								deptChairSign = eElement.getElementsByTagName("deptChairSign").item(0).getTextContent();
								deptchairSignedDate = eElement.getElementsByTagName("deptchairSignedDate").item(0)
										.getTextContent();
								collegeDeanPrintName = eElement.getElementsByTagName("collegeDeanPrintName").item(0)
										.getTextContent();
								collegeDeanSign = eElement.getElementsByTagName("collegeDeanSign").item(0)
										.getTextContent();
								collegeDeanSignedDate = eElement.getElementsByTagName("collegeDeanSignedDate").item(0)
										.getTextContent();
								provostPrintName = eElement.getElementsByTagName("provostPrintName").item(0)
										.getTextContent();
								provostSign = eElement.getElementsByTagName("provostSign").item(0).getTextContent();
								provostDate = eElement.getElementsByTagName("provostDate").item(0).getTextContent();
								releaseTimeCheck = eElement.getElementsByTagName("releaseTimeCheck").item(0)
										.getTextContent();
								WorkScheduleChangeCheck = eElement.getElementsByTagName("WorkScheduleChangeCheck")
										.item(0).getTextContent();
								daysAndTimes = eElement.getElementsByTagName("daysAndTimes").item(0).getTextContent();
								supervisorPrintname = eElement.getElementsByTagName("supervisorPrintname").item(0)
										.getTextContent();
								supervisorSign = eElement.getElementsByTagName("supervisorSign").item(0)
										.getTextContent();
								supervisorSignedDate = eElement.getElementsByTagName("supervisorSignedDate").item(0)
										.getTextContent();
								administratorPrintName = eElement.getElementsByTagName("administratorPrintName").item(0)
										.getTextContent();
								administratorSign = eElement.getElementsByTagName("administratorSign").item(0)
										.getTextContent();
								administratorSignedDate = eElement.getElementsByTagName("administratorSignedDate")
										.item(0).getTextContent();
								hrComments = eElement.getElementsByTagName("hrComments").item(0).getTextContent();
								feeWaiverGranted = eElement.getElementsByTagName("feeWaiverGranted").item(0)
										.getTextContent();
								feeWaiverDenied = eElement.getElementsByTagName("feeWaiverDenied").item(0)
										.getTextContent();
								term = eElement.getElementsByTagName("term").item(0).getTextContent();
								EDDE = eElement.getElementsByTagName("EDDE").item(0).getTextContent();
								hrSign = eElement.getElementsByTagName("hrSign").item(0).getTextContent();
								hrSigneddate = eElement.getElementsByTagName("hrSigneddate").item(0).getTextContent();
								comment2 = eElement.getElementsByTagName("comment2").item(0).getTextContent();
								reimb = eElement.getElementsByTagName("reqReimbursement").item(0).getTextContent();
								timeTB1 = eElement.getElementsByTagName("timeTB1").item(0).getTextContent();
								timeTB2 = eElement.getElementsByTagName("timeTB2").item(0).getTextContent();
								empEmail = eElement.getElementsByTagName("EmpEmailID").item(0).getTextContent();
							}
						}

						dataMap = new LinkedHashMap<String, Object>();

						dataMap.put("EMPL_ID", empId);
						dataMap.put("CHRS_ID", chrsId);
						dataMap.put("FIRST_NAME", firstName);
						dataMap.put("LAST_NAME", lastName);
						dataMap.put("DEPARTMENT_NAME", departmentName);

						dataMap.put("BARGAINING_UNIT", bargainingUnit);
						dataMap.put("JOB_CODE", jobCode);
						dataMap.put("JOB_TYPE", jobType);
						dataMap.put("PROBATION_STATUS", probationStatus);
						dataMap.put("TEMPORARY", temporary);

						Object enddateObj = null;
						if (enddate != null && enddate != "") {
							Date enddateNew = Date.valueOf(enddate);
							enddateObj = enddateNew;
						}
						dataMap.put("END_DATE", enddateObj);

						dataMap.put("ON_LEAVE_CHECK", onLeaveCheck);
						dataMap.put("SEMESTER", semester);
						dataMap.put("YEAR", year);
						dataMap.put("CLASS_STANDING", classStanding);
						dataMap.put("STUDENT_TYPE", studentType);
						dataMap.put("CAMPUS_ATTENDING", campus_Attending);
						dataMap.put("STUDENT_ID", studentId);
						dataMap.put("APPROVED_PLAN", approvedPlan);
						dataMap.put("MAJOR", major);
						dataMap.put("COURSE_INFO_COMMENT", courseInfoComment);
						dataMap.put("COURSE_TITLE1", courseTitle1);
						dataMap.put("WR_CD1", wr_Cd1);
						dataMap.put("ONLINE_COURSE1", onlineCourse1);
						dataMap.put("UNIT1", unit1);
						dataMap.put("DAY1", day1);
						dataMap.put("HOURS1", hours1);
						dataMap.put("RELEASE_TIME1", releaseTime1);
						dataMap.put("COURSE_TITLE2", courseTitle2);
						dataMap.put("WR_CD2", wr_Cd2);
						dataMap.put("ONLINE_COURSE2", onlineCourse2);
						dataMap.put("UNIT2", unit2);
						dataMap.put("DAY2", day2);
						dataMap.put("HOURS2", hours2);
						dataMap.put("RELEASE_TIME2", releaseTime2);
						dataMap.put("COMMENT1", comment1);
						dataMap.put("COMMENT2", comment2);
						dataMap.put("GRADPROFBUS_STATEMENT", gradProfBusStatement);
						dataMap.put("AUTHORIZATION_INITIALS", authorizationInitials);
						dataMap.put("EMP_SIGN", empSign);

						Object dateInitiatedObj = null;
						if (dateInitiated != null && dateInitiated != "") {
							Date dateInitiatedNew = Date.valueOf(dateInitiated);
							dateInitiatedObj = dateInitiatedNew;
						}
						dataMap.put("DATE_NITIATED", dateInitiatedObj);
						dataMap.put("DEPT_CHAIR_PRINT_NAME", deptChairPrintName);
						dataMap.put("DEPT_CHAIR_SIGN", deptChairSign);

						Object deptchairSignedDateObj = null;
						if (deptchairSignedDate != null && deptchairSignedDate != "") {
							Date deptchairSignedDateNew = Date.valueOf(deptchairSignedDate);
							deptchairSignedDateObj = deptchairSignedDateNew;
						}
						dataMap.put("DEPT_CHAIR_SIGNED_DATE", deptchairSignedDateObj);

						dataMap.put("COLLEGE_DEAN_PRINT_NAME", collegeDeanPrintName);
						dataMap.put("COLLEGE_DEAN_SIGN", collegeDeanSign);

						Object collegeDeanSignedDateObj = null;
						if (collegeDeanSignedDate != null && collegeDeanSignedDate != "") {
							Date collegeDeanSignedDateNew = Date.valueOf(collegeDeanSignedDate);
							collegeDeanSignedDateObj = collegeDeanSignedDateNew;
						}
						dataMap.put("COLLEGE_DEAN_SIGNE_DATE", collegeDeanSignedDateObj);
						dataMap.put("PROVOST_PRINT_NAME", provostPrintName);
						dataMap.put("PROVOST_SIGN", provostSign);

						Object provostDateObj = null;
						if (provostDate != null && provostDate != "") {
							Date provostDateNew = Date.valueOf(provostDate);
							provostDateObj = provostDateNew;
						}
						dataMap.put("PROVOST_DATE", provostDateObj);
						dataMap.put("RELEASE_TIME_CHECK", releaseTimeCheck);
						dataMap.put("WORK_SCHEDULE_CHANGE_CHECK", WorkScheduleChangeCheck);
						dataMap.put("DAYS_AND_TIMES", daysAndTimes);
						dataMap.put("SUPERVISOR_PRINT_NAME", supervisorPrintname);
						dataMap.put("SUPERVISOR_SIGN", supervisorSign);

						Object supervisorSignedDateObj = null;
						if (supervisorSignedDate != null && supervisorSignedDate != "") {
							Date supervisorSignedDateNew = Date.valueOf(supervisorSignedDate);
							supervisorSignedDateObj = supervisorSignedDateNew;
						}
						dataMap.put("SUPERVISOR_SIGNED_DATE", supervisorSignedDateObj);
						dataMap.put("ADMINISTRATOR_PRINT_NAME", administratorPrintName);
						dataMap.put("ADMINISTRATOR_SIGN", administratorSign);

						Object administratorSignedDateObj = null;
						if (administratorSignedDate != null && administratorSignedDate != "") {
							Date administratorSignedDateNew = Date.valueOf(administratorSignedDate);
							administratorSignedDateObj = administratorSignedDateNew;
						}
						dataMap.put("ADMINISTRATOR_SIGNED_DATE", administratorSignedDateObj);

						dataMap.put("HR_COMMENTS", hrComments);
						dataMap.put("FEE_WAIVER_GRANTED", feeWaiverGranted);
						dataMap.put("FEE_WAIVER_DENIED", feeWaiverDenied);
						dataMap.put("TERM", term);
						dataMap.put("EDDE", EDDE);
						dataMap.put("HR_SIGN", hrSign);

						Object hrSigneddateObj = null;
						if (hrSigneddate != null && hrSigneddate != "") {
							Date hrSigneddateNew = Date.valueOf(hrSigneddate);
							hrSigneddateObj = hrSigneddateNew;
						}
						dataMap.put("HR_SIGNED_DATE", hrSigneddateObj);
						dataMap.put("REQUEST_REIMB", reimb);
						dataMap.put("HOUR_PERIOD1", timeTB1);
						dataMap.put("HOUR_PERIOD2", timeTB2);
						dataMap.put("EMP_EMAIL", empEmail);
						dataMap.put("WORKFLOW_INSTANCE_ID", wfInstanceID);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);

					} catch (SAXException e) {
						log.error("SAXException in CSUFEmployeeFeeWaiverDB=" + Arrays.toString(e.getStackTrace()));
					} catch (Exception e) {
						log.error("SQLException in CSUFEmployeeFeeWaiverDB=" + Arrays.toString(e.getStackTrace()));
					} finally {
						try {
							is.close();
						} catch (IOException e) {
							log.error("IOException in finally block CSUFInitialCobraDB="
									+ Arrays.toString(e.getStackTrace()));
						}
						try {
							if (conn != null) {
								conn.close();
							}
						} catch (SQLException e) {
							log.error("SQLException from Finally Block from CSUFDependentFeeWaiverDB="
									+ Arrays.toString(e.getStackTrace()));
						}
					}
				}
			}
		}
	}

}
