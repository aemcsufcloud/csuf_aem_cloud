package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
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
import org.w3c.dom.Element;
import org.xml.sax.SAXException;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Dependent Fee Waiver Save in DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=DependentFeeWaiverDB" })
public class CSUFDependentFeeWaiverDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFDependentFeeWaiverDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		DatabaseUtils dbUtil = new DatabaseUtils();
		String tableName = "AEM_DEPENDENT_FEE_WAIVER";
		String formName = "Dependent Fee Waiver";

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;
		String wfInstanceID = workItem.getWorkflow().getId();
		String firstName = "";
		String lastName = "";
		String empID = "";
		String chrsID = "";
		String departmentID = "";
		String extension = "";
		String bargainingUnit = "";
		String jobCode = "";
		String fullTime = "";
		String partTime = "";
		String tenure = "";
		String perm = "";
		String probationary = "";
		String others = "";
		String termStatus = "";
		String leaveStatus = "";
		String leavesNo = "";
		String applicantFirstName = "";
		String applicantLastName = "";
		String applicantStudentID = "";
		String applicantAddress = "";
		String applicantCity = "";
		String applicantState = "";
		String applicantDateOfBirth = "";
		String applicantEmailAddress = "";
		String applicantPhone = "";
		String alternatePhone = "";
		String relationToEmployee = "";
		String studentType = "";
		String classStanding = "";
		String semster = "";
		String campusOfEnrollment = "";
		String degreeProgram = "";
		String yearSemester = "";
		String courseTitle1 = "";
		String courseTitle2 = "";
		String onlineCourse1Yes = "";
		String onlineCourse2Yes = "";
		String onlineCourse1No = "";
		String onlineCourse2No = "";
		String employeeComments = "";
		String initials = "";
		String employeeSignature = "";
		String employeeDate = "";
		String hrComments = "";
		String feeWaiverGranted = "";
		String feeWaiverDenied = "";
		String term = "";
		String edde = "";
		String hrSignature = "";
		String hrDate = "";
		String reimb = "";
		String endDate = "";
		String relToEmp = "";
		String comments = "";
		String taxCB = "";
		String empCB = "";
		String hrCB = "";
		String empEmail = "";
		LinkedHashMap<String, Object> dataMap = null;

		Resource xmlNode = resolver.getResource(payloadPath);
		String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		if (conn != null) {
			while (xmlFiles.hasNext()) {
				Resource attachmentXml = xmlFiles.next();
				String filePath = attachmentXml.getPath();

				log.info("filePath= " + filePath);
				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
					} catch (ValueFormatException e2) {
						log.error("ValueFormatException from CSUFDependentFeeWaiverDB="
								+ Arrays.toString(e2.getStackTrace()));
					} catch (PathNotFoundException e2) {
						log.error("PathNotFoundException from CSUFDependentFeeWaiverDB="
								+ Arrays.toString(e2.getStackTrace()));
					} catch (RepositoryException e2) {
						log.error("RepositoryException from CSUFDependentFeeWaiverDB="
								+ Arrays.toString(e2.getStackTrace()));
					}

					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.error("ParserConfigurationException from CSUFDependentFeeWaiverDB="
									+ Arrays.toString(e1.getStackTrace()));
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.error(
									"IOException from CSUFDependentFeeWaiverDB=" + Arrays.toString(e1.getStackTrace()));
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								lastName = eElement.getElementsByTagName("lastName").item(0).getTextContent();
								firstName = eElement.getElementsByTagName("firstName").item(0).getTextContent();
								empID = eElement.getElementsByTagName("empID").item(0).getTextContent();
								chrsID = eElement.getElementsByTagName("chrsID").item(0).getTextContent();
								departmentID = eElement.getElementsByTagName("departmentID").item(0).getTextContent();
								extension = eElement.getElementsByTagName("extension").item(0).getTextContent();
								bargainingUnit = eElement.getElementsByTagName("bargainingUnit").item(0)
										.getTextContent();
								jobCode = eElement.getElementsByTagName("jobCode").item(0).getTextContent();
								leaveStatus = eElement.getElementsByTagName("AreYouOnLeave").item(0).getTextContent();
								partTime = eElement.getElementsByTagName("FullTimePartTime").item(0).getTextContent();
								tenure = eElement.getElementsByTagName("ProbationStatus").item(0).getTextContent();
								termStatus = eElement.getElementsByTagName("temStatus").item(0).getTextContent();
								leaveStatus = eElement.getElementsByTagName("AreYouOnLeave").item(0).getTextContent();
								applicantFirstName = eElement.getElementsByTagName("applicantFirstName").item(0)
										.getTextContent();
								applicantLastName = eElement.getElementsByTagName("applicantLastName").item(0)
										.getTextContent();
								applicantStudentID = eElement.getElementsByTagName("applicantStudentID").item(0)
										.getTextContent();
								applicantAddress = eElement.getElementsByTagName("applicantAddress").item(0)
										.getTextContent();
								applicantCity = eElement.getElementsByTagName("applicantCity").item(0).getTextContent();
								applicantState = eElement.getElementsByTagName("applicantState").item(0)
										.getTextContent();
								applicantDateOfBirth = eElement.getElementsByTagName("applicantDateOfBirth").item(0)
										.getTextContent();
								applicantEmailAddress = eElement.getElementsByTagName("applicantEmailAddress").item(0)
										.getTextContent();
								applicantPhone = eElement.getElementsByTagName("applicantPhone").item(0)
										.getTextContent();
								alternatePhone = eElement.getElementsByTagName("alternatePhone").item(0)
										.getTextContent();
								relationToEmployee = eElement.getElementsByTagName("RelToEmp").item(0).getTextContent();
								studentType = eElement.getElementsByTagName("studentType").item(0).getTextContent();
								classStanding = eElement.getElementsByTagName("classStanding").item(0).getTextContent();
								semster = eElement.getElementsByTagName("semster").item(0).getTextContent();
								campusOfEnrollment = eElement.getElementsByTagName("campusOfEnrollment").item(0)
										.getTextContent();
								degreeProgram = eElement.getElementsByTagName("degreeProgram").item(0).getTextContent();
								yearSemester = eElement.getElementsByTagName("yearSemester").item(0).getTextContent();
								courseTitle1 = eElement.getElementsByTagName("courseTitle1").item(0).getTextContent();
								onlineCourse1Yes = eElement.getElementsByTagName("onlineCourse1Yes").item(0)
										.getTextContent();
								courseTitle2 = eElement.getElementsByTagName("courseTitle2").item(0).getTextContent();
								onlineCourse2Yes = eElement.getElementsByTagName("onlineCourse2Yes").item(0)
										.getTextContent();
								feeWaiverGranted = eElement.getElementsByTagName("feeWaiverGranted").item(0)
										.getTextContent();
								term = eElement.getElementsByTagName("term").item(0).getTextContent();
								edde = eElement.getElementsByTagName("edde").item(0).getTextContent();
								feeWaiverDenied = eElement.getElementsByTagName("feeWaiverDenied").item(0)
										.getTextContent();
								hrComments = eElement.getElementsByTagName("hrComments").item(0).getTextContent();
								hrSignature = eElement.getElementsByTagName("hrSignature").item(0).getTextContent();
								hrDate = eElement.getElementsByTagName("hrDate").item(0).getTextContent();
								employeeComments = eElement.getElementsByTagName("employeeComments").item(0)
										.getTextContent();
								initials = eElement.getElementsByTagName("initials").item(0).getTextContent();
								employeeSignature = eElement.getElementsByTagName("EmployeeSignature").item(0)
										.getTextContent();
								employeeDate = eElement.getElementsByTagName("employeeDate").item(0).getTextContent();
								reimb = eElement.getElementsByTagName("reqReimbursement").item(0).getTextContent();
								endDate = eElement.getElementsByTagName("endDate").item(0).getTextContent();
								relToEmp = eElement.getElementsByTagName("RelToEmp").item(0).getTextContent();
								comments = eElement.getElementsByTagName("empComments").item(0).getTextContent();
								empEmail = eElement.getElementsByTagName("EmpEmailId").item(0).getTextContent();
							}
						}
						Element afBoundUnBoundDataElement = XMLUtils.getParentNode(doc, "afUnboundData");
						if (null != afBoundUnBoundDataElement && afBoundUnBoundDataElement.hasChildNodes()) {
							taxCB = XMLUtils.getChildNodeContent(afBoundUnBoundDataElement, "ClassStCB");
							empCB = XMLUtils.getChildNodeContent(afBoundUnBoundDataElement, "empCB");
							hrCB = XMLUtils.getChildNodeContent(afBoundUnBoundDataElement, "hrCB");
						}
						dataMap = new LinkedHashMap<String, Object>();

						dataMap.put("FIRST_NAME", firstName);
						dataMap.put("LAST_NAME", lastName);
						dataMap.put("EMP_ID", empID);
						dataMap.put("CHRS_ID", chrsID);
						dataMap.put("DEPARTMENT_NAME", departmentID);
						dataMap.put("BARGAINING_UNIT", bargainingUnit);
						dataMap.put("JOB_CODE", jobCode);
						dataMap.put("TIME_STATUS", partTime);
						dataMap.put("TENURE", tenure);
						dataMap.put("TERM_STATUS", termStatus);
						dataMap.put("LEAVES_STATUS", leaveStatus);
						dataMap.put("APPLICANT_FIRST_NAME", applicantFirstName);
						dataMap.put("APPLICANT_LAST_NAME", applicantLastName);
						dataMap.put("APPLICANT_STUDENT_ID", applicantStudentID);
						dataMap.put("APPLICANT_ADDRESS", applicantAddress);
						dataMap.put("APPLICANT_CITY", applicantCity);
						dataMap.put("APPLICANT_STATE", applicantState);
						Object applicantDateOfBirthObj = null;
						if (applicantDateOfBirth != null && applicantDateOfBirth != "") {
							Date applicantDateOfBirthNew = Date.valueOf(applicantDateOfBirth);
							applicantDateOfBirthObj = applicantDateOfBirthNew;
						}
						dataMap.put("APPLICANT_DATE_OF_BIRTH", applicantDateOfBirthObj);
						dataMap.put("APPLICANT_EMAIL_ADDRESS", applicantEmailAddress);
						dataMap.put("APPLICANT_HOME_PHONE", applicantPhone);
						dataMap.put("APPLICANT_ALTERNATE_PHONE", alternatePhone);
						dataMap.put("STUDENT_TYPE", studentType);
						dataMap.put("CLASS_STANDING", classStanding);
						dataMap.put("SEMESTER", semster);
						dataMap.put("CAMPUS_OF_ENROLLMENT", campusOfEnrollment);
						dataMap.put("DEGREE_PROGRAM", degreeProgram);
						dataMap.put("YEAR_SEMESTER", yearSemester);

						dataMap.put("COURSE_TITLE1", courseTitle1);
						dataMap.put("ONLINE_COURSE1_YES", onlineCourse1Yes);
						// dataMap.put("ONLINE_COURSE1_NO", onlineCourse2No);
						dataMap.put("COURSE_TITLE2", courseTitle2);
						dataMap.put("ONLINE_COURSE2_YES", onlineCourse2Yes);
						// dataMap.put("ONLINE_COURSE2_NO", onlineCourse2No);
						dataMap.put("FEE_WAIVER_GRANTED", feeWaiverGranted);
						dataMap.put("FEE_WAIVER_DENIED", feeWaiverDenied);
						dataMap.put("TERM", term);
						dataMap.put("EDDE", edde);
						dataMap.put("HR_COMMENT", hrComments);
						dataMap.put("HR_SIGNATURE", hrSignature);

						Object hrDateObj = null;
						if (hrDate != null && hrDate != "") {
							Date hrDateNew = Date.valueOf(hrDate);
							hrDateObj = hrDateNew;
						}
						dataMap.put("HR_DATE", hrDateObj);
						dataMap.put("EMPLOYEE_COMMENT", employeeComments);
						dataMap.put("INITIALS", initials);
						dataMap.put("EMPLOYEE_SIGNATURE", employeeSignature);

						Object employeeDateObj = null;
						if (employeeDate != null && employeeDate != "") {
							Date employeeDateNew = Date.valueOf(employeeDate);
							employeeDateObj = employeeDateNew;
						}
						dataMap.put("EMPLOYEE_DATE", employeeDateObj);
						dataMap.put("REQUEST_REIMB", reimb);

						dataMap.put("EMP_EMAIL", empEmail);
						dataMap.put("REL_TO_EMP", relationToEmployee);
						dataMap.put("COMMENTS", comments);
						Object endDateObj = null;
						if (endDate != null && endDate != "") {
							Date endDateNew = Date.valueOf(endDate);
							endDateObj = endDateNew;
						}
						dataMap.put("END_DATE", endDateObj);
						dataMap.put("TAX_CB", taxCB);
						dataMap.put("EMP_CB", empCB);
						dataMap.put("HR_CB", hrCB);
						dataMap.put("WORKFLOW_INSTANCE_ID", wfInstanceID);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);

					} catch (SAXException e) {
						log.error("SAXException from CSUFDependentFeeWaiverDB=" + Arrays.toString(e.getStackTrace()));
					} catch (Exception e) {
						log.error("Exception from CSUFDependentFeeWaiverDB=" + Arrays.toString(e.getStackTrace()));
					} finally {
						try {
							is.close();
						} catch (IOException e) {
							log.error("IOException from Finally Block from CSUFDependentFeeWaiverDB="
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
