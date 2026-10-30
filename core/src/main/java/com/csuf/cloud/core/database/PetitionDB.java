package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.util.Arrays;
import java.util.LinkedHashMap;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang3.StringUtils;
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
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Petition A, B & C DB Save",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=PetitionDB" })
public class PetitionDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(PetitionDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String petitionParentTable = "AEM_PETITION_FORM_INFO";
		String formName = "Petition";
		String petitionTypeValue = "";

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		try {
			InputStream is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, workItem.getContentPath(), "Data.xml");
			if (null != is) {
				Document doc = XMLUtils.getDomDocument(is);

				DatabaseUtils dbUtil = new DatabaseUtils();

				LinkedHashMap<String, Object> dataMapEmpInfo1 = null;

				String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
				conn = jdbcConnectionService.getDBConn(dataSourceVal);

				if (conn != null) {

					String workflowInstanceID = workItem.getWorkflow().getId();
					Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");
					String petitionType = XMLUtils.getChildNodeContent(afBoundDataElement, "PetitionType");
					if (petitionType.equals("1")) {
						petitionTypeValue = "Petition A";
					} else if (petitionType.equals("2")) {
						petitionTypeValue = "Petition B";
					} else if (petitionType.equals("3")) {
						petitionTypeValue = "Petition C";
					}

					if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
						String caseID = XMLUtils.getChildNodeContent(afBoundDataElement, "CaseId");
						String fName = XMLUtils.getChildNodeContent(afBoundDataElement, "FName");
						String lName = XMLUtils.getChildNodeContent(afBoundDataElement, "LastName");
						String cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "CWID");
						String date = XMLUtils.getChildNodeContent(afBoundDataElement, "Date_1");
						String phoneNumber = XMLUtils.getChildNodeContent(afBoundDataElement, "PhoneNumber");
						String address = XMLUtils.getChildNodeContent(afBoundDataElement, "Address");
						String city = XMLUtils.getChildNodeContent(afBoundDataElement, "City");
						String state = XMLUtils.getChildNodeContent(afBoundDataElement, "State");
						String zip = XMLUtils.getChildNodeContent(afBoundDataElement, "Zipcode");
						String email = XMLUtils.getChildNodeContent(afBoundDataElement, "EmailAddress");

						String studentSignature = XMLUtils.getChildNodeContent(afBoundDataElement, "student_signature");
						String studentSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "student_signDate");
						String studentSignComment = XMLUtils.getChildNodeContent(afBoundDataElement, "student_comment");
						String expectedTerm = XMLUtils.getChildNodeContent(afBoundDataElement, "expected_term");

						String instructorSign = XMLUtils.getChildNodeContent(afBoundDataElement,
								"instructor_signature");
						String instructorSignDate = XMLUtils.getChildNodeContent(afBoundDataElement,
								"instructor_signDate");
						String instructorDecision = XMLUtils.getChildNodeContent(afBoundDataElement,
								"instructor_recommend");
						String instructorComment = XMLUtils.getChildNodeContent(afBoundDataElement,
								"instructor_comment");

						String gradOfficeSign = XMLUtils.getChildNodeContent(afBoundDataElement,
								"grad_office_signature");
						String gradOfficeSignDate = XMLUtils.getChildNodeContent(afBoundDataElement,
								"grad_office_signDate");
						String gradOfficeDecision = XMLUtils.getChildNodeContent(afBoundDataElement,
								"grad_office_recommend");
						String gradOfficeComment = XMLUtils.getChildNodeContent(afBoundDataElement,
								"grad_office_comment");

						String evaluatorSign = XMLUtils.getChildNodeContent(afBoundDataElement, "evaluator_signature");
						String evaluatorSignDate = XMLUtils.getChildNodeContent(afBoundDataElement,
								"evaluator_signDate");
						String evaluatorDecision = XMLUtils.getChildNodeContent(afBoundDataElement,
								"evaluator_recommend");
						String evaluatorComment = XMLUtils.getChildNodeContent(afBoundDataElement, "evaluator_comment");

						String eipSign = XMLUtils.getChildNodeContent(afBoundDataElement, "eip_signature");
						String eipSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "eip_signDate");
						String eipDecision = XMLUtils.getChildNodeContent(afBoundDataElement, "eip_recommend");
						String eipComment = XMLUtils.getChildNodeContent(afBoundDataElement, "eip_comment");

						String petitionSign = XMLUtils.getChildNodeContent(afBoundDataElement,
								"petition_coord_signature");
						String petitionSignDate = XMLUtils.getChildNodeContent(afBoundDataElement,
								"petition_coord_signDate");
						String petitionDecision = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionDecision");
						String petitionComment = XMLUtils.getChildNodeContent(afBoundDataElement,
								"petition_coord_comment");

						String recordsSign = XMLUtils.getChildNodeContent(afBoundDataElement, "records_signature");
						String recordsSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "records_signDate");
						String recordsDecision = XMLUtils.getChildNodeContent(afBoundDataElement, "recordsDecision");
						String recordsComment = XMLUtils.getChildNodeContent(afBoundDataElement, "records_comment");

						dataMapEmpInfo1 = new LinkedHashMap<String, Object>();
						dataMapEmpInfo1.put("CASE_ID", caseID);
						dataMapEmpInfo1.put("PETITION_TYPE", petitionTypeValue);
						dataMapEmpInfo1.put("CWID", cwid);
						dataMapEmpInfo1.put("FNAME", fName);
						dataMapEmpInfo1.put("LNAME", lName);
						Object dateObj = null;
						if (date != null && date != "") {
							Date dateNew = Date.valueOf(date);
							dateObj = dateNew;
						}
						dataMapEmpInfo1.put("STUDENT_DATE", dateObj);
						dataMapEmpInfo1.put("PHONE_NUMBER", phoneNumber);
						dataMapEmpInfo1.put("ADDRESS", address);
						dataMapEmpInfo1.put("CITY", city);
						dataMapEmpInfo1.put("STATE", state);
						dataMapEmpInfo1.put("ZIP_CODE", zip);
						dataMapEmpInfo1.put("EMAIL", email);
						dataMapEmpInfo1.put("STUDENT_SIGN", studentSignature);

						Object studentSignDateObj = null;
						if (studentSignDate != null && studentSignDate != "") {
							Date studentSignDateNew = Date.valueOf(studentSignDate);
							studentSignDateObj = studentSignDateNew;
						}
						dataMapEmpInfo1.put("STUDENT_SIGN_DATE", studentSignDateObj);

						dataMapEmpInfo1.put("EXPECTED_TERM", expectedTerm);
						dataMapEmpInfo1.put("COMMENTS", studentSignComment);
						dataMapEmpInfo1.put("INST_SIGN", instructorSign);
						Object instructorSignDateObj = null;
						if (instructorSignDate != null && instructorSignDate != "") {
							Date instructorSignDateNew = Date.valueOf(instructorSignDate);
							instructorSignDateObj = instructorSignDateNew;
						}
						dataMapEmpInfo1.put("INST_SIGN_DATE", instructorSignDateObj);
						dataMapEmpInfo1.put("INST_DECISION", instructorDecision);
						dataMapEmpInfo1.put("INST_COMMENTS", instructorComment);
						dataMapEmpInfo1.put("GRADUATE_STUDIES_SIGN", gradOfficeSign);

						Object gradOfficeSignDateObj = null;
						if (gradOfficeSignDate != null && gradOfficeSignDate != "") {
							Date gradOfficeSignDateNew = Date.valueOf(gradOfficeSignDate);
							gradOfficeSignDateObj = gradOfficeSignDateNew;
						}
						dataMapEmpInfo1.put("GRADUATE_STUDIES_SIGN_DATE", gradOfficeSignDateObj);
						dataMapEmpInfo1.put("GRADUATE_STUDIES_DECISION", gradOfficeDecision);
						dataMapEmpInfo1.put("GRADUATE_STUDIES_COMMENTS", gradOfficeComment);

						dataMapEmpInfo1.put("EVALUATOR_SIGN", evaluatorSign);
						Object evaluatorSignDateObj = null;
						if (evaluatorSignDate != null && evaluatorSignDate != "") {
							Date evaluatorSignDateNew = Date.valueOf(evaluatorSignDate);
							evaluatorSignDateObj = evaluatorSignDateNew;
						}
						dataMapEmpInfo1.put("EVALUATOR_SIGN_DATE", evaluatorSignDateObj);
						dataMapEmpInfo1.put("EVALUATOR_DECISION", evaluatorDecision);
						dataMapEmpInfo1.put("EVALUATOR_COMMENTS", evaluatorComment);

						dataMapEmpInfo1.put("EIP_SIGN", eipSign);
						Object eipSignDateObj = null;
						if (eipSignDate != null && eipSignDate != "") {
							Date eipSignDateNew = Date.valueOf(eipSignDate);
							eipSignDateObj = eipSignDateNew;
						}
						dataMapEmpInfo1.put("EIP_SIGN_DATE", eipSignDateObj);
						dataMapEmpInfo1.put("EIP_DECISION", eipDecision);
						dataMapEmpInfo1.put("EIP_COMMENTS", eipComment);
						dataMapEmpInfo1.put("PETITION_COORDINATOR_SIGN", petitionSign);
						Object petitionSignDateObj = null;
						if (petitionSignDate != null && petitionSignDate != "") {
							Date petitionSignDateNew = Date.valueOf(petitionSignDate);
							petitionSignDateObj = petitionSignDateNew;
						}
						dataMapEmpInfo1.put("PETITION_COORDINATOR_SIGN_DATE", petitionSignDateObj);
						dataMapEmpInfo1.put("PETITION_COORDINATOR_DECISION", petitionDecision);
						dataMapEmpInfo1.put("PETITION_COORDINATOR_COMMENTS", petitionComment);
						dataMapEmpInfo1.put("RECORDS_SIGN", recordsSign);
						Object recordsSignDateObj = null;
						if (recordsSignDate != null && recordsSignDate != "") {
							Date recordsSignDateNew = Date.valueOf(recordsSignDate);
							recordsSignDateObj = recordsSignDateNew;
						}
						dataMapEmpInfo1.put("RECORDS_SIGN_DATE", recordsSignDateObj);
						dataMapEmpInfo1.put("RECORDS_DECISION", recordsDecision);
						dataMapEmpInfo1.put("RECORDS_COMMENTS", recordsComment);
						dataMapEmpInfo1.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

						long id = System.currentTimeMillis();
						dataMapEmpInfo1.put("TABLE_DATA_ID", String.valueOf(id));

						savePetitionFormData(afBoundDataElement, petitionType, conn, formName, caseID,
								workflowInstanceID, dbUtil);
						dbUtil.insertFormData(conn, dataMapEmpInfo1, petitionParentTable, formName);
					}
				}
			}
		} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			log.error(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
		}
	}

	public void savePetitionFormData(Element afBoundDataElement, String petitionType, Connection conn, String formName,
			String caseID, String workflowInstanceID, DatabaseUtils dbUtil) {

		String petitionATable = "AEM_PETITION_A_INFO";
		String petitionBTable = "AEM_PETITION_B_INFO";
		String petitionCTable = "AEM_PETITION_C_INFO";

		String attemptToRegister = "";

		Element petitionARow = XMLUtils.getChildNode(afBoundDataElement, "petitionA_Row1");
		Element petitionCRow = XMLUtils.getChildNode(afBoundDataElement, "petitionC_Row1");
		String cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "CWID");

		LinkedHashMap<String, Object> dataMapEmpInfo2 = null;

		if (petitionType.equals("1")) {
			String termTaken = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionA_term");
			String scheduleNumber = XMLUtils.getChildNodeContent(petitionARow, "petitionA_scheduleNumber");
			String deptCourse = XMLUtils.getChildNodeContent(petitionARow, "petitionA_deptCourse");
			String pettionAGrade = XMLUtils.getChildNodeContent(petitionARow, "petitionA_Grade");
			String pettionAUnit = XMLUtils.getChildNodeContent(petitionARow, "petitionA_Unit");
			String instructorName = XMLUtils.getChildNodeContent(petitionARow, "petitionA_instructorName");
			String instructorCWID = XMLUtils.getChildNodeContent(petitionARow, "petitionA_instructorCWID");
			String instructorUserID = XMLUtils.getChildNodeContent(petitionARow, "petitionA_instructorUserID");
			String instructorEmail = XMLUtils.getChildNodeContent(petitionARow, "petitionA_instructorEmail");
			String petitionAYes = XMLUtils.getChildNodeContent(afBoundDataElement, "peitionA_yes_chk");
			if (petitionAYes.equals("1")) {
				attemptToRegister = "Yes";
			} else {
				attemptToRegister = "No";
			}

			String question1Comment = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionA_question1_comment");
			String question2Comment = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionA_question2_comment");
			String secontion2Comment = XMLUtils.getChildNodeContent(afBoundDataElement, "PetitionASection2Comment");

			dataMapEmpInfo2 = new LinkedHashMap<String, Object>();

			dataMapEmpInfo2.put("CASE_ID", caseID);
			dataMapEmpInfo2.put("CWID", cwid);
			dataMapEmpInfo2.put("TERM_TAKEN", termTaken);
			dataMapEmpInfo2.put("SCHEDULE_NUMBER", scheduleNumber);
			dataMapEmpInfo2.put("GRADE", pettionAGrade);
			dataMapEmpInfo2.put("UNIT", pettionAUnit);
			dataMapEmpInfo2.put("COURSE_NUMBER", deptCourse);
			dataMapEmpInfo2.put("INST_NAME", instructorName);
			dataMapEmpInfo2.put("INST_CWID", instructorCWID);
			dataMapEmpInfo2.put("INST_USERID", instructorUserID);
			dataMapEmpInfo2.put("INST_EMAIL", instructorEmail);
			dataMapEmpInfo2.put("ATTEMPT_TO_REGISTER", attemptToRegister);
			dataMapEmpInfo2.put("SEC1_QUESTION1_COMMENT", question1Comment);
			dataMapEmpInfo2.put("SEC1_QUESTION2_COMMENT", question2Comment);
			dataMapEmpInfo2.put("SEC_QUESTION1_COMMENT", secontion2Comment);
			dataMapEmpInfo2.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

			dbUtil.insertFormData(conn, dataMapEmpInfo2, petitionATable, formName);
		} else if (petitionType.equals("2")) {

			String underGradTermTaken = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionB_underGrad_term");
			String underGradGEChk = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionB_undergrad_GE_chk");
			String underGradTDA = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionB_undergrad_TDA");
			String underGradMajorChk = XMLUtils.getChildNodeContent(afBoundDataElement,
					"petitionB_undergrad_major_chk");
			String underGradMajor = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionB_undergrad_major");
			String underGradMinorChk = XMLUtils.getChildNodeContent(afBoundDataElement,
					"petitionB_undergrad_minor_chk");
			String underGradMinor = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionB_undergrad_minor");
			String underGradComment = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionB_undergrad_comment");

			String gradeTermTaken = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionB_grad_term");
			String gradeComment = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionB_grad_comment");

			if (StringUtils.isNotBlank(underGradTermTaken)) {
				for (int i = 0; i < XMLUtils.getElementLength(afBoundDataElement, "petitionB_undergrad_Row1"); i++) {
					String underGradDeptCourse = XMLUtils.getChildNodeContentOfElement(afBoundDataElement,
							"petitionB_undergrad_deptCourse", i);
					String underGradInstructor = XMLUtils.getChildNodeContentOfElement(afBoundDataElement,
							"petitionB_undergrad_instructorName", i);
					String underGradCurrentGrade = XMLUtils.getChildNodeContentOfElement(afBoundDataElement,
							"petitionB_undergrad_currentGrade", i);
					String underGradGradeOfficial = XMLUtils.getChildNodeContentOfElement(afBoundDataElement,
							"petitionB_undergrad_currentGradeOfficial", i);

					dataMapEmpInfo2 = new LinkedHashMap<String, Object>();

					dataMapEmpInfo2.put("CASE_ID", caseID);
					dataMapEmpInfo2.put("CWID", cwid);
					dataMapEmpInfo2.put("UNDERGRAD_TERM_TAKEN", underGradTermTaken);
					dataMapEmpInfo2.put("UNDERGRAD_DEPT_COURSE", underGradDeptCourse);
					dataMapEmpInfo2.put("UNDERGRAD_INST_NAME", underGradInstructor);
					dataMapEmpInfo2.put("UNDERGRAD_GRADE_INPUT", underGradCurrentGrade);
					dataMapEmpInfo2.put("UNDERGRAD_GRADE_OFFICIAL", underGradGradeOfficial);
					dataMapEmpInfo2.put("UNDERGRAD_GE_CHK", underGradGEChk);
					dataMapEmpInfo2.put("UNDERGRAD_TDA", underGradTDA);
					dataMapEmpInfo2.put("UNDERGRAD_MAJOR_CHK", underGradMajorChk);
					dataMapEmpInfo2.put("UNDERGRAD_MAJOR", underGradMajor);
					dataMapEmpInfo2.put("UNDERGRAD_MINOR_CHK", underGradMinorChk);
					dataMapEmpInfo2.put("UNDERGRAD_MINOR", underGradMinor);
					dataMapEmpInfo2.put("UNDERGRAD_COMMENT", underGradComment);
					dataMapEmpInfo2.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

					dbUtil.insertFormData(conn, dataMapEmpInfo2, petitionBTable, formName);
				}

			} else if (StringUtils.isNotBlank(gradeTermTaken)) {
				for (int i = 0; i < XMLUtils.getElementLength(afBoundDataElement, "petitionB_undergrad_Row1"); i++) {
					String gradDeptCourse = XMLUtils.getChildNodeContentOfElement(afBoundDataElement,
							"petitionB_grad_deptCourse", i);
					String gradInstructor = XMLUtils.getChildNodeContentOfElement(afBoundDataElement,
							"petitionB_grad_instructorName", i);
					String gradCurrentGrade = XMLUtils.getChildNodeContentOfElement(afBoundDataElement,
							"petitionB_grad_currentGrade", i);
					String gradGradeOfficial = XMLUtils.getChildNodeContentOfElement(afBoundDataElement,
							"petitionB_grad_currentGradeOfficial", i);

					dataMapEmpInfo2 = new LinkedHashMap<String, Object>();

					dataMapEmpInfo2.put("CASE_ID", caseID);
					dataMapEmpInfo2.put("CWID", cwid);
					dataMapEmpInfo2.put("GRAD_TERM_TAKEN", gradeTermTaken);
					dataMapEmpInfo2.put("GRAD_DEPT_COURSE", gradDeptCourse);
					dataMapEmpInfo2.put("GRAD_NST_NAME", gradInstructor);
					dataMapEmpInfo2.put("GRAD_GRADE_INPUT", gradCurrentGrade);
					dataMapEmpInfo2.put("GRAD_GRADE_OFFICIAL", gradGradeOfficial);
					dataMapEmpInfo2.put("GRAD_COMMENT", gradeComment);
					dataMapEmpInfo2.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

					dbUtil.insertFormData(conn, dataMapEmpInfo2, petitionBTable, formName);
				}
			}
		} else if (petitionType.equals("3")) {
			String petitionCTermTaken = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionC_term_taken");
			String petitionCDeptCourse = XMLUtils.getChildNodeContent(petitionCRow, "petitionC_deptCourse");
			String petitionCInstructorName = XMLUtils.getChildNodeContent(petitionCRow, "petitionC_instructorName");
			String petitionCInstructorCWID = XMLUtils.getChildNodeContent(petitionCRow, "petitionC_instructorCWID");
			String petitionCInstructorUserID = XMLUtils.getChildNodeContent(petitionCRow, "petitionC_instructorUserID");
			String petitionCInstructorEmail = XMLUtils.getChildNodeContent(petitionCRow, "petitionC_instructorEmail");
			String petitionCScheduleNumber = XMLUtils.getChildNodeContent(petitionCRow, "petitionC_scheduleNumber");
			String unitValueFrom = XMLUtils.getChildNodeContent(petitionCRow, "petitionC_unit_value_From");
			String unitValueTo = XMLUtils.getChildNodeContent(petitionCRow, "petitionC_unit_value_To");
			String petitionCReason = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionC_reason");

			dataMapEmpInfo2 = new LinkedHashMap<String, Object>();
			dataMapEmpInfo2.put("CASE_ID", caseID);
			dataMapEmpInfo2.put("CWID", cwid);
			dataMapEmpInfo2.put("TERM_TAKEN", petitionCTermTaken);
			dataMapEmpInfo2.put("DEPT_COURSE", petitionCDeptCourse);
			dataMapEmpInfo2.put("INST_NAME", petitionCInstructorName);
			dataMapEmpInfo2.put("INST_CWID", petitionCInstructorCWID);
			dataMapEmpInfo2.put("INST_USERID", petitionCInstructorUserID);
			dataMapEmpInfo2.put("INST_EMAIL", petitionCInstructorEmail);
			dataMapEmpInfo2.put("SCHEDULE_NUMBER", petitionCScheduleNumber);
			dataMapEmpInfo2.put("UNIT_VALUE_CHANGE_FROM", unitValueFrom);
			dataMapEmpInfo2.put("UNIT_VALUE_CHANGE_TO", unitValueTo);
			dataMapEmpInfo2.put("PETITION_C_REASON", petitionCReason);
			dataMapEmpInfo2.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

			dbUtil.insertFormData(conn, dataMapEmpInfo2, petitionCTable, formName);
		}
	}
}
