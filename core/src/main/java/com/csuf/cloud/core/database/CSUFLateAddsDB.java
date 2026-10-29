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
import org.xml.sax.SAXException;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.DatabaseUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Late Adds DB", Constants.SERVICE_VENDOR + "=Adobe Systems",
		"process.label" + "=CSUFLateAddsDB" })
public class CSUFLateAddsDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFLateAddsDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_LATE_ADDS";
		String formName = "Late Adds";
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		DatabaseUtils dbUtil = new DatabaseUtils();
		Document doc = null;
		InputStream is = null;
		String workflowInstanceID = "";

		String caseId = null;
		String studentCWID = null;
		String studentFirstName = null;
		String studentLastName = null;
		String studentAddress = null;
		String studentCity = null;
		String studentHomePhone = null;
		String zipCode = null;
		String studentState = null;
		String studentEmail = null;
		String studentCellPhone = null;
		String expectedDateOfGraduation = null;
		String initiatedDate = null;
		String degreeObjective = null;
		String major = null;
		String classNumber = null;
		String semesterTaken = null;
		String departmentCourse = null;
		String scheduleNumber = null;
		String numberOfUnits = null;
		String reasonForFailure = null;
		String reasonOfAddCourse = null;
		String attendedCourseContinuously = null;
		String miniOrShortCourseDate = null;
		String miniOrShortCourse = null;
		String courseStartDate = null;
		String eipStudentFirstName = null;
		String eipStudentLastName = null;
		String eipStudentMiddleName = null;
		String eipStudentID = null;
		String reEntryToCSUFCHK = null;
		String dQFromCSUFCHK = null;
		String prerequisiteForGradProgramCHK = null;
		String graduateLevelCourseCHK = null;
		String undergradTransferCHK = null;
		String undergradTransferCollege = null;
		String guestOtherCollege = null;
		String guestOtherCollegeCHK = null;
		String orerequisiteForCredentialCHK = null;
		String credentialCourseCHK = null;
		String othersCHK = null;
		String authorizationForEnrollmentRB = null;
		String highSchoolOrCollegeInEnglishRB = null;
		String toeflScoreRB = null;
		String livedInUSThreeYearsRB = null;
		String tuberculosisTestVerificationRB = null;
		String bornAfterRB = null;
		String immunizedStatusRB = null;
		String usCitizenCHK = null;
		String nonUSCitizenCHK = null;
		String immigrantStatus = null;
		String refugeeAsylumApplicantStatus = null;
		String otherNonImmigrantStatus = null;
		String admissionNumber = null;
		String passportNumber = null;
		String statudentStatus = null;
		String j1Visa = null;
		String passportNumber2 = null;
		String universityOrCollegeEnrollment = null;
		String numberOfUnits2 = null;
		String eipStudentCHK = null;
		String eipStudentSignature = null;
		String eipStudentDate = null;
		String eipStudentComment = null;
		String studentSignatureCHK = null;
		String studentSignature = null;
		String studentSignatureDate = null;
		String studentSignatureComment = null;
		String instructorAction = null;
		String instructorSignature = null;
		String instructorSignatureDate = null;
		String instructorSignatureComment = null;
		String deptChairAction = null;
		String deptChairSignature = null;
		String deptChairDate = null;
		String deptChairComment = null;
		String associateDeanAction = null;
		String associateDeanSignature = null;
		String associateDeanSignatureDate = null;
		String associateDeanComment = null;
		String dSOAuthorizationAction = null;
		String term = null;
		String eipGroupSignature = null;
		String eipGroupSignatureDate = null;
		String eipGroupComment = null;
		String recordsSignature = null;
		String recordsSignatureDate = null;
		String recordsComments = null;
		String termDescription = null;
		String lateAddsDecision = null;
		String eipFlag = null;

		LinkedHashMap<String, Object> dataMapFormInfo = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		if (conn != null) {
			while (xmlFiles.hasNext()) {
				workflowInstanceID = workItem.getWorkflow().getId();
				Resource attachmentXml = xmlFiles.next();
				String filePath = attachmentXml.getPath();

				log.info("filePath= " + filePath);
				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					log.info("xmlFiles=" + filePath);
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
					} catch (ValueFormatException e2) {
						log.error("Exception1 from CSUFLateAddsDB=" + Arrays.toString(e2.getStackTrace()));
						
					} catch (PathNotFoundException e2) {
						log.error("Exception2 from CSUFLateAddsDB=" + Arrays.toString(e2.getStackTrace()));
						e2.printStackTrace();
					} catch (RepositoryException e2) {
						log.error("Exception3 from CSUFLateAddsDB=" + Arrays.toString(e2.getStackTrace()));
						e2.printStackTrace();
					}
					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.info("ParserConfigurationException from CSUFLateAddsDB=" + Arrays.toString(e1.getStackTrace()));
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.info("IOException from CSUFLateAddsDB=" + Arrays.toString(e1.getStackTrace()));
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;

								caseId = eElement.getElementsByTagName("caseId").item(0).getTextContent();

								studentCWID = eElement.getElementsByTagName("StudentCWID").item(0).getTextContent();
								studentFirstName = eElement.getElementsByTagName("StudentFirstName").item(0)
										.getTextContent();
								studentLastName = eElement.getElementsByTagName("StudentLastName").item(0)
										.getTextContent();
								studentAddress = eElement.getElementsByTagName("StudentAddress").item(0)
										.getTextContent();
								studentCity = eElement.getElementsByTagName("StudentCity").item(0).getTextContent();
								studentHomePhone = eElement.getElementsByTagName("StudentHomePhone").item(0)
										.getTextContent();
								zipCode = eElement.getElementsByTagName("ZipCode").item(0).getTextContent();
								studentState = eElement.getElementsByTagName("StudentState").item(0).getTextContent();
								studentEmail = eElement.getElementsByTagName("StudentEmail").item(0).getTextContent();
								studentCellPhone = eElement.getElementsByTagName("StudentCellPhone").item(0)
										.getTextContent();

								expectedDateOfGraduation = eElement.getElementsByTagName("ExpectedDateOfGraduation")
										.item(0).getTextContent();

								initiatedDate = eElement.getElementsByTagName("InitiatedDate").item(0).getTextContent();

								degreeObjective = eElement.getElementsByTagName("DegreeObjective").item(0)
										.getTextContent();

								major = eElement.getElementsByTagName("Major").item(0).getTextContent();

								classNumber = eElement.getElementsByTagName("ClassNumber").item(0).getTextContent();

								semesterTaken = eElement.getElementsByTagName("SemesterTaken").item(0).getTextContent();

								departmentCourse = eElement.getElementsByTagName("DepartmentCourse").item(0)
										.getTextContent();

								scheduleNumber = eElement.getElementsByTagName("ScheduleNumber").item(0)
										.getTextContent();

								numberOfUnits = eElement.getElementsByTagName("NumberOfUnits").item(0).getTextContent();

								reasonForFailure = eElement.getElementsByTagName("ReasonForFailure").item(0)
										.getTextContent();

								reasonOfAddCourse = eElement.getElementsByTagName("ReasonOfAddCourse").item(0)
										.getTextContent();

								attendedCourseContinuously = eElement.getElementsByTagName("AttendedCourseContinuously")
										.item(0).getTextContent();

								miniOrShortCourseDate = eElement.getElementsByTagName("MiniOrShortCourseDate").item(0)
										.getTextContent();

								miniOrShortCourse = eElement.getElementsByTagName("MiniOrShortCourse").item(0)
										.getTextContent();

								courseStartDate = eElement.getElementsByTagName("CourseStartDate").item(0)
										.getTextContent();

								eipStudentFirstName = eElement.getElementsByTagName("EIPStudentFirstName").item(0)
										.getTextContent();

								eipStudentLastName = eElement.getElementsByTagName("EIPStudentLastName").item(0)
										.getTextContent();

								eipStudentMiddleName = eElement.getElementsByTagName("EIPStudentMiddleName").item(0)
										.getTextContent();

								eipStudentID = eElement.getElementsByTagName("EIPStudentID").item(0).getTextContent();

								reEntryToCSUFCHK = eElement.getElementsByTagName("ReEntryToCSUFCHK").item(0)
										.getTextContent();

								dQFromCSUFCHK = eElement.getElementsByTagName("DQFromCSUFCHK").item(0).getTextContent();

								prerequisiteForGradProgramCHK = eElement
										.getElementsByTagName("PrerequisiteForGradProgramCHK").item(0).getTextContent();

								graduateLevelCourseCHK = eElement.getElementsByTagName("GraduateLevelCourseCHK").item(0)
										.getTextContent();

								undergradTransferCHK = eElement.getElementsByTagName("UndergradTransferCHK").item(0)
										.getTextContent();

								undergradTransferCollege = eElement.getElementsByTagName("UndergradTransferCollege")
										.item(0).getTextContent();

								guestOtherCollege = eElement.getElementsByTagName("GuestOtherCollege").item(0)
										.getTextContent();

								guestOtherCollegeCHK = eElement.getElementsByTagName("GuestOtherCollegeCHK").item(0)
										.getTextContent();

								orerequisiteForCredentialCHK = eElement
										.getElementsByTagName("PrerequisiteForCredentialCHK").item(0).getTextContent();

								credentialCourseCHK = eElement.getElementsByTagName("CredentialCourseCHK").item(0)
										.getTextContent();

								othersCHK = eElement.getElementsByTagName("OthersCHK").item(0).getTextContent();

								authorizationForEnrollmentRB = eElement
										.getElementsByTagName("AuthorizationForEnrollmentRB").item(0).getTextContent();

								highSchoolOrCollegeInEnglishRB = eElement
										.getElementsByTagName("HighSchoolOrCollegeInEnglishRB").item(0)
										.getTextContent();

								toeflScoreRB = eElement.getElementsByTagName("ToeflScoreRB").item(0).getTextContent();

								livedInUSThreeYearsRB = eElement.getElementsByTagName("LivedInUSThreeYearsRB").item(0)
										.getTextContent();

								tuberculosisTestVerificationRB = eElement
										.getElementsByTagName("TuberculosisTestVerificationRB").item(0)
										.getTextContent();

								bornAfterRB = eElement.getElementsByTagName("BornAfterRB").item(0).getTextContent();

								immunizedStatusRB = eElement.getElementsByTagName("ImmunizedStatusRB").item(0)
										.getTextContent();

								usCitizenCHK = eElement.getElementsByTagName("USCitizenCHK").item(0).getTextContent();

								nonUSCitizenCHK = eElement.getElementsByTagName("NonUSCitizenCHK").item(0)
										.getTextContent();

								immigrantStatus = eElement.getElementsByTagName("ImmigrantStatus").item(0)
										.getTextContent();

								refugeeAsylumApplicantStatus = eElement
										.getElementsByTagName("RefugeeAsylumApplicantStatus").item(0).getTextContent();

								otherNonImmigrantStatus = eElement.getElementsByTagName("OtherNonImmigrantStatus")
										.item(0).getTextContent();

								admissionNumber = eElement.getElementsByTagName("AdmissionNumber").item(0)
										.getTextContent();

								passportNumber = eElement.getElementsByTagName("PassportNumber").item(0)
										.getTextContent();

								statudentStatus = eElement.getElementsByTagName("StatudentStatus").item(0)
										.getTextContent();

								j1Visa = eElement.getElementsByTagName("J1Visa").item(0).getTextContent();

								passportNumber2 = eElement.getElementsByTagName("PassportNumber2").item(0)
										.getTextContent();

								universityOrCollegeEnrollment = eElement
										.getElementsByTagName("UniversityOrCollegeEnrollment").item(0).getTextContent();

								numberOfUnits2 = eElement.getElementsByTagName("NumberOfUnits").item(0)
										.getTextContent();

								eipStudentCHK = eElement.getElementsByTagName("EIPStudentCHK").item(0).getTextContent();

								eipStudentSignature = eElement.getElementsByTagName("EIPStudentSignature").item(0)
										.getTextContent();

								eipStudentDate = eElement.getElementsByTagName("EIPStudentDate").item(0)
										.getTextContent();

								eipStudentComment = eElement.getElementsByTagName("EIPStudentComment").item(0)
										.getTextContent();

								studentSignatureCHK = eElement.getElementsByTagName("StudentSignatureCHK").item(0)
										.getTextContent();

								studentSignature = eElement.getElementsByTagName("StudentSignature").item(0)
										.getTextContent();

								studentSignatureDate = eElement.getElementsByTagName("StudentSignatureDate").item(0)
										.getTextContent();

								studentSignatureComment = eElement.getElementsByTagName("StudentSignatureComment")
										.item(0).getTextContent();

								instructorAction = eElement.getElementsByTagName("InstructorAction").item(0)
										.getTextContent();

								instructorSignature = eElement.getElementsByTagName("InstructorSignature").item(0)
										.getTextContent();

								instructorSignatureDate = eElement.getElementsByTagName("InstructorSignatureDate")
										.item(0).getTextContent();

								instructorSignatureComment = eElement.getElementsByTagName("InstructorSignatureComment")
										.item(0).getTextContent();

								deptChairAction = eElement.getElementsByTagName("DeptChairAction").item(0)
										.getTextContent();

								deptChairSignature = eElement.getElementsByTagName("DeptChairSignature").item(0)
										.getTextContent();

								deptChairDate = eElement.getElementsByTagName("DeptChairDate").item(0).getTextContent();

								deptChairComment = eElement.getElementsByTagName("DeptChairComment").item(0)
										.getTextContent();

								associateDeanAction = eElement.getElementsByTagName("AssociateDeanAction").item(0)
										.getTextContent();

								associateDeanSignature = eElement.getElementsByTagName("AssociateDeanSignature").item(0)
										.getTextContent();

								associateDeanSignatureDate = eElement.getElementsByTagName("AssociateDeanSignatureDate")
										.item(0).getTextContent();

								associateDeanComment = eElement.getElementsByTagName("AssociateDeanComment").item(0)
										.getTextContent();

								term = eElement.getElementsByTagName("Term").item(0).getTextContent();

								eipGroupSignature = eElement.getElementsByTagName("EIPGroupSignature").item(0)
										.getTextContent();

								eipGroupSignatureDate = eElement.getElementsByTagName("EIPGroupSignatureDate").item(0)
										.getTextContent();

								eipGroupComment = eElement.getElementsByTagName("EIPGroupComment").item(0)
										.getTextContent();

								recordsSignature = eElement.getElementsByTagName("RecordsSignature").item(0)
										.getTextContent();

								recordsSignatureDate = eElement.getElementsByTagName("RecordsSignatureDate").item(0)
										.getTextContent();

								recordsComments = eElement.getElementsByTagName("RecordsComments").item(0)
										.getTextContent();

								termDescription = eElement.getElementsByTagName("TermDescription").item(0)
										.getTextContent();

								lateAddsDecision = eElement.getElementsByTagName("LateAddsDecision").item(0)
										.getTextContent();

								eipFlag = eElement.getElementsByTagName("EIPFlag").item(0).getTextContent();

								dataMapFormInfo = new LinkedHashMap<String, Object>();
								dataMapFormInfo.put("CASE_ID", caseId);
								dataMapFormInfo.put("STUDENT_CWID", studentCWID);
								dataMapFormInfo.put("STUDENT_FIRSTNAME", studentFirstName);
								dataMapFormInfo.put("STUDENT_LASTNAME", studentLastName);
								dataMapFormInfo.put("STUDENT_ADDRESS", studentAddress);
								dataMapFormInfo.put("STUDENT_CITY", studentCity);
								dataMapFormInfo.put("STUDENT_HOMEPHONE", studentHomePhone);
								dataMapFormInfo.put("ZIP_CODE", zipCode);
								dataMapFormInfo.put("STUDENT_STATE", studentState);
								dataMapFormInfo.put("STUDENT_EMAIL", studentEmail);
								dataMapFormInfo.put("STUDENT_CELLPHONE", studentCellPhone);

								Object expectedDateOfGraduationObj = null;
								if (expectedDateOfGraduation != null && expectedDateOfGraduation != "") {
									Date expectedDateOfGraduationNew = Date.valueOf(expectedDateOfGraduation);
									expectedDateOfGraduationObj = expectedDateOfGraduationNew;
								}
								dataMapFormInfo.put("EXPECTED_DATE_OF_GRADUATION", expectedDateOfGraduationObj);

								Object initiatedDateObj = null;
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatedDate);
									initiatedDateObj = initiatedDateNew;
								}
								dataMapFormInfo.put("INITIATED_DATE", initiatedDateObj);
								dataMapFormInfo.put("DEGREE_OBJECTIVE", degreeObjective);
								dataMapFormInfo.put("MAJOR", major);
								dataMapFormInfo.put("CLASS_NUMBER", classNumber);
								dataMapFormInfo.put("SEMESTER_TAKEN", semesterTaken);
								dataMapFormInfo.put("DEPARTMENT_COURSE", departmentCourse);
								dataMapFormInfo.put("SCHEDULE_NUMBER", scheduleNumber);
								dataMapFormInfo.put("NUMBER_OF_UNITS", numberOfUnits);
								dataMapFormInfo.put("REASON_FOR_FAILURE", reasonForFailure);
								dataMapFormInfo.put("REASON_OF_ADDCOURSE", reasonOfAddCourse);
								dataMapFormInfo.put("ATT_COURSE_CONT", attendedCourseContinuously);

								Object miniOrShortCourseDateObj = null;
								if (miniOrShortCourseDate != null && miniOrShortCourseDate != "") {
									Date miniOrShortCourseDateNew = Date.valueOf(miniOrShortCourseDate);
									miniOrShortCourseDateObj = miniOrShortCourseDateNew;
								}
								dataMapFormInfo.put("MINIORSHORT_COURSE_DATE", miniOrShortCourseDateObj);
								dataMapFormInfo.put("MINIORSHORT_COURSE", miniOrShortCourse);

								Object courseStartDateObj = null;
								if (courseStartDate != null && courseStartDate != "") {
									Date courseStartDateNew = Date.valueOf(courseStartDate);
									courseStartDateObj = courseStartDateNew;
								}
								dataMapFormInfo.put("COURSE_START_DATE", courseStartDateObj);
								dataMapFormInfo.put("EIP_STUDENT_FNAME", eipStudentFirstName);
								dataMapFormInfo.put("EIP_STUDENT_LNAME", eipStudentLastName);
								dataMapFormInfo.put("EIP_STUDENT_MNAME", eipStudentMiddleName);
								dataMapFormInfo.put("EIP_STUDENTID", eipStudentID);
								dataMapFormInfo.put("RE_ENTRY_TO_CSUFCHK", reEntryToCSUFCHK);
								dataMapFormInfo.put("DQ_FROM_CSUFCHK", dQFromCSUFCHK);
								dataMapFormInfo.put("PRER_FOR_GRAD_PROGRAMCHK", prerequisiteForGradProgramCHK);
								dataMapFormInfo.put("GRAD_LEVEL_COURSECHK", graduateLevelCourseCHK);
								dataMapFormInfo.put("UNDERGRAD_TRANSFERCHK", undergradTransferCHK);
								dataMapFormInfo.put("UNDERGRAD_TRANSFER_COLLEGE", undergradTransferCollege);
								dataMapFormInfo.put("GUEST_OTHER_COLLEGE", guestOtherCollege);
								dataMapFormInfo.put("GUEST_OTHER_COLLEGECHK", guestOtherCollegeCHK);
								dataMapFormInfo.put("PRER_FOR_CREDENTIALCHK", orerequisiteForCredentialCHK);
								dataMapFormInfo.put("CREDENTIAL_COURSECHK", credentialCourseCHK);
								dataMapFormInfo.put("OTHERS_CHK", othersCHK);
								dataMapFormInfo.put("AUTH_FOR_ENROLLMENTRB", authorizationForEnrollmentRB);
								dataMapFormInfo.put("HIGHCOLLEGE_IN_ENGLISHRB", highSchoolOrCollegeInEnglishRB);
								dataMapFormInfo.put("TOEFL_SCORERB", toeflScoreRB);
								dataMapFormInfo.put("LIVED_INUSTHREE_YEARSRB", livedInUSThreeYearsRB);
								dataMapFormInfo.put("TB_TEST_VERIFICATIONRB", tuberculosisTestVerificationRB);
								dataMapFormInfo.put("BORN_AFTERRB", bornAfterRB);
								dataMapFormInfo.put("IMMUNIZED_STATUSRB", immunizedStatusRB);
								dataMapFormInfo.put("US_CITIZENCHK", usCitizenCHK);
								dataMapFormInfo.put("NON_USCITIZENCHK", nonUSCitizenCHK);
								dataMapFormInfo.put("IMMIGRANT_STATUS", immigrantStatus);
								dataMapFormInfo.put("REFUGE_EASYLUM_APPL_STATUS", refugeeAsylumApplicantStatus);
								dataMapFormInfo.put("OTHER_NON_IMMIGRANT_STATUS", otherNonImmigrantStatus);
								dataMapFormInfo.put("ADMISSION_NUMBER", admissionNumber);
								dataMapFormInfo.put("PASSPORT_NUMBER", passportNumber);
								dataMapFormInfo.put("STATUDENT_STATUS", statudentStatus);
								dataMapFormInfo.put("J1_VISA", j1Visa);
								dataMapFormInfo.put("PASSPORT_NUMBER2", passportNumber2);
								dataMapFormInfo.put("UNI_OR_COLLEGE_ENROLL", universityOrCollegeEnrollment);
								dataMapFormInfo.put("NUMBER_OF_UNITS2", numberOfUnits2);
								dataMapFormInfo.put("EIP_STUDENTCHK", eipStudentCHK);
								dataMapFormInfo.put("EIP_STUDENT_SIGNATURE", eipStudentSignature);

								Object eipStudentDateObj = null;
								if (eipStudentDate != null && eipStudentDate != "") {
									Date eipStudentDateNew = Date.valueOf(eipStudentDate);
									eipStudentDateObj = eipStudentDateNew;
								}
								dataMapFormInfo.put("EIP_STUDENT_DATE", eipStudentDateObj);
								dataMapFormInfo.put("EIP_STUDENT_COMMENT", eipStudentComment);
								dataMapFormInfo.put("STUDENT_SIGNATURECHK", studentSignatureCHK);
								dataMapFormInfo.put("STUDENT_SIGNATURE", studentSignature);

								Object studentSignatureDateObj = null;
								if (studentSignatureDate != null && studentSignatureDate != "") {
									Date studentSignatureDateNew = Date.valueOf(studentSignatureDate);
									studentSignatureDateObj = studentSignatureDateNew;
								}
								dataMapFormInfo.put("STUDENT_SIGNATURE_DATE", studentSignatureDateObj);
								dataMapFormInfo.put("STUDENT_SIGNATURE_COMMENT", studentSignatureComment);
								dataMapFormInfo.put("INST_ACTION", instructorAction);
								dataMapFormInfo.put("INST_SIGNATURE", instructorSignature);

								Object instructorSignatureDateObj = null;
								if (instructorSignatureDate != null && instructorSignatureDate != "") {
									Date instructorSignatureDateNew = Date.valueOf(instructorSignatureDate);
									instructorSignatureDateObj = instructorSignatureDateNew;
								}
								dataMapFormInfo.put("INST_SIGNATURE_DATE", instructorSignatureDateObj);
								dataMapFormInfo.put("INST_SIGNATURE_COMMENT", instructorSignatureComment);
								dataMapFormInfo.put("DEPT_CHAIR_ACTION", deptChairAction);
								dataMapFormInfo.put("DEPT_CHAIR_SIGNATURE", deptChairSignature);

								Object deptChairDateObj = null;
								if (deptChairDate != null && deptChairDate != "") {
									Date deptChairDateNew = Date.valueOf(deptChairDate);
									deptChairDateObj = deptChairDateNew;
								}
								dataMapFormInfo.put("DEPT_CHAIR_DATE", deptChairDateObj);
								dataMapFormInfo.put("DEPT_CHAIR_COMMENT", deptChairComment);
								dataMapFormInfo.put("ASSOCIATE_DEAN_ACTION", associateDeanAction);
								dataMapFormInfo.put("ASSOC_DEAN_SIGNATURE", associateDeanSignature);

								Object associateDeanSignatureDateObj = null;
								if (associateDeanSignatureDate != null && associateDeanSignatureDate != "") {
									Date associateDeanSignatureDateNew = Date.valueOf(associateDeanSignatureDate);
									associateDeanSignatureDateObj = associateDeanSignatureDateNew;
								}
								dataMapFormInfo.put("ASSOC_DEAN_SIGNATURE_DATE", associateDeanSignatureDateObj);
								dataMapFormInfo.put("ASSOC_DEAN_COMMENT", associateDeanComment);
								dataMapFormInfo.put("TERM", term);
								dataMapFormInfo.put("EIP_GROUP_SIGNATURE", eipGroupSignature);

								Object eipGroupSignatureDateDateObj = null;
								if (eipGroupSignatureDate != null && eipGroupSignatureDate != "") {
									Date dSOAuthorizationDateNew = Date.valueOf(eipGroupSignatureDate);
									eipGroupSignatureDateDateObj = dSOAuthorizationDateNew;
								}
								dataMapFormInfo.put("EIP_GROUP_SIGNATURE_DATE", eipGroupSignatureDateDateObj);
								dataMapFormInfo.put("EIP_GROUP_COMMENT", eipGroupComment);
								dataMapFormInfo.put("RECORDS_SIGNATURE", recordsSignature);

								Object recordsSignatureDateObj = null;
								if (recordsSignatureDate != null && recordsSignatureDate != "") {
									Date dSOAuthorizationDateNew = Date.valueOf(recordsSignatureDate);
									recordsSignatureDateObj = dSOAuthorizationDateNew;
								}
								dataMapFormInfo.put("RECORDS_SIGNATURE_DATE", recordsSignatureDateObj);
								dataMapFormInfo.put("RECORDS_COMMENTS", recordsComments);
								dataMapFormInfo.put("RECORDS_COMMENTS", recordsComments);
								dataMapFormInfo.put("LATE_ADDS_DECISION", lateAddsDecision);
								dataMapFormInfo.put("EIP_FLAG", eipFlag);

								dbUtil.insertFormData(conn, dataMapFormInfo, tableName, formName);

							}
						}

					} catch (SAXException e) {
						log.error("SAXException from CSUFLateAddsDB="
								+ Arrays.toString(e.getStackTrace()));
					} catch (Exception e) {
						log.error("Exception from CSUFLateAddsDB="
								+ Arrays.toString(e.getStackTrace()));
					}

					finally {
						if (is != null) {
							try {
								is.close();
							} catch (Exception e) {
								log.error("Exception from Finally Block from CSUFLateAddsDB="
										+ Arrays.toString(e.getStackTrace()));
							}
						}
						if (conn != null) {
							try {
								conn.close();
							} catch (SQLException e) {
								log.error("SQLException from Finally Block from CSUFLateAddsDB="
										+ Arrays.toString(e.getStackTrace()));
							}

						}
					}

				}
			}
		}
	}
}
