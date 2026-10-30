package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;

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
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = {
		Constants.SERVICE_DESCRIPTION + "=Request For Excess Units - Graduate and UnderGraduate DB Save",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=RequestForExcessUnitsDB" })
public class RequestForExcessUnitsDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(RequestForExcessUnitsDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "";
		String formName = "";

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);

		String workflowTitle = workItem.getWorkflow().getWorkflowModel().getTitle();
		if (workflowTitle.equals("Request for Excess Units - Graduate")) {
			tableName = "AEM_EXCESS_UNITS_GRADUATE";
			formName = "Request For Excess Units - Graduate Student";
		} else if (workflowTitle.equals("Request for Excess Units - UnderGraduate")) {
			tableName = "AEM_EXCESS_UNITS_UNDERGRADUATE";
			formName = "Request For Excess Units - Undergraduate Student";
		}

		try {
			InputStream is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, workItem.getContentPath(), "Data.xml");
			if (null != is) {
				Document doc = XMLUtils.getDomDocument(is);

				DatabaseUtils dbUtil = new DatabaseUtils();

				/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
				conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

				/*if (conn != null) {*/

					String workflowInstanceID = workItem.getWorkflow().getId();
					Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");

					if (workflowTitle.equals("Request for Excess Units - Graduate")) {
						saveGradExcessUnitsFormData(afBoundDataElement, conn, formName, tableName, workflowInstanceID,
								dbUtil);
					} else if (workflowTitle.equals("Request for Excess Units - UnderGraduate")) {
						saveUnderGradExcessUnitsFormData(afBoundDataElement, conn, formName, tableName,
								workflowInstanceID, dbUtil);
					}

				/*}*/
			}
		} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			log.error(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
		} finally {
			/*if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error("SQLException in SPE2579DB Finally Block=" + Arrays.toString(e.getStackTrace()));
				}
			}*/
		}
	}

	public void saveGradExcessUnitsFormData(Element afBoundDataElement, Connection conn, String formName,
			String tableName, String workflowInstanceID, DatabaseUtils dbUtil) {

		LinkedHashMap<String, Object> dataMapEmpInfo1 = null;

		if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
			String caseID = XMLUtils.getChildNodeContent(afBoundDataElement, "caseId");
			String studentName = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_name");
			String cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_CWID");
			String phoneNumber = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_phone");
			String address = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_address");
			String email = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_email");
			String classLevel = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_classLevel");
			String degree = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_degreeProgram");
			String units = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_studentUnits");
			String semesterVal = XMLUtils.getChildNodeContent(afBoundDataElement, "spring_semester");
			String semester = "";
			if (semesterVal.equals("1")) {
				semester = "Spring";
			}
			String yearVal = XMLUtils.getChildNodeContent(afBoundDataElement, "semesterYear");
			String year = "20".concat(yearVal);
			String reason = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_reason");

			String studentSignature = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_studentSignature");
			String studentSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_studentDate");
			String studentSignComment = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_student_comments");

			String advisorSign = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_advisorSignature");
			String advisorSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_advisorDate");
			String advisorDecisionVal = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_advisorDecision");
			String advisorDecision = "";
			if (advisorDecisionVal.equals("1")) {
				advisorDecision = "Approved";
			} else if (advisorDecisionVal.equals("0")) {
				advisorDecision = "Denied";
			}
			String advisorComment = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_advisor_comment");

			String arscSign = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_arscSignature");
			String arscSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_arscDate");
			String arscDecisionVal = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_arscDecision");
			String arscDecision = "";
			if (arscDecisionVal.equals("1")) {
				arscDecision = "Approved";
			} else if (arscDecisionVal.equals("0")) {
				arscDecision = "Denied";
			}
			String arscComment = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_arscComment");

			String chairSign = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_ChairSignature");
			String chairSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_chairDate");
			String chairDecisionVal = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_ChairDecision");
			String chairDecision = "";
			if (chairDecisionVal.equals("1")) {
				chairDecision = "Approved";
			} else if (chairDecisionVal.equals("0")) {
				chairDecision = "Denied";
			}
			String chairComment = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_chair_comment");
			String chairName = XMLUtils.getChildNodeContent(afBoundDataElement, "hidden_chair_name");
			String chairEmail = XMLUtils.getChildNodeContent(afBoundDataElement, "hidden_chair_email");
			String chairUserId = XMLUtils.getChildNodeContent(afBoundDataElement, "hidden_chair_userID");

			dataMapEmpInfo1 = new LinkedHashMap<String, Object>();
			dataMapEmpInfo1.put("CASE_ID", caseID);
			dataMapEmpInfo1.put("CWID", cwid);
			dataMapEmpInfo1.put("NAME", studentName);
			dataMapEmpInfo1.put("PHONE", phoneNumber);
			dataMapEmpInfo1.put("ADDRESS", address);
			dataMapEmpInfo1.put("EMAIL", email);
			dataMapEmpInfo1.put("CLASS_LEVEL", classLevel);
			dataMapEmpInfo1.put("DEGREE_PROGRAM", degree);
			dataMapEmpInfo1.put("UNITS", units);
			dataMapEmpInfo1.put("SEMESTER", semester);
			dataMapEmpInfo1.put("YEAR", year);
			dataMapEmpInfo1.put("REASON_FOR_REQ", reason);
			dataMapEmpInfo1.put("STUDENT_SIGN", studentSignature);

			Object studentSignDateObj = null;
			if (studentSignDate != null && studentSignDate != "") {
				Date studentSignDateNew = Date.valueOf(studentSignDate);
				studentSignDateObj = studentSignDateNew;
			}
			dataMapEmpInfo1.put("STUDENT_SIGN_DATE", studentSignDateObj);
			dataMapEmpInfo1.put("COMMENTS", studentSignComment);

			dataMapEmpInfo1.put("ADVISOR_SIGN", advisorSign);
			Object advisorSignDateObj = null;
			if (advisorSignDate != null && advisorSignDate != "") {
				Date advisorSignDateNew = Date.valueOf(advisorSignDate);
				advisorSignDateObj = advisorSignDateNew;
			}
			dataMapEmpInfo1.put("ADVISOR_SIGN_DATE", advisorSignDateObj);
			dataMapEmpInfo1.put("ADVISOR_DECISION", advisorDecision);
			dataMapEmpInfo1.put("ADVISOR_COMMENTS", advisorComment);

			dataMapEmpInfo1.put("ARSC_SIGN", arscSign);

			Object arscSignDateObj = null;
			if (arscSignDate != null && arscSignDate != "") {
				Date arscSignDateNew = Date.valueOf(arscSignDate);
				arscSignDateObj = arscSignDateNew;
			}
			dataMapEmpInfo1.put("ARSC_SIGN_DATE", arscSignDateObj);
			dataMapEmpInfo1.put("ARSC_DECISION", arscDecision);
			dataMapEmpInfo1.put("ARSC_COMMENTS", arscComment);

			dataMapEmpInfo1.put("CHAIR_SIGN", chairSign);

			Object chairSignDateObj = null;
			if (chairSignDate != null && chairSignDate != "") {
				Date chairSignDateNew = Date.valueOf(chairSignDate);
				chairSignDateObj = chairSignDateNew;
			}
			dataMapEmpInfo1.put("CHAIR_SIGN_DATE", chairSignDateObj);
			dataMapEmpInfo1.put("CHAIR_DECISION", chairDecision);
			dataMapEmpInfo1.put("CHAIR_COMMENTS", chairComment);
			dataMapEmpInfo1.put("CHAIR_NAME", chairName);
			dataMapEmpInfo1.put("CHAIR_EMAIL", chairEmail);
			dataMapEmpInfo1.put("CHAIR_USERID", chairUserId);
			dataMapEmpInfo1.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

			/*dbUtil.insertFormData(conn, dataMapEmpInfo1, tableName, formName);*/
			try {
				CloudDbSaveUtil.saveFormData(tableName, formName, caseID, "CASE_ID", workflowInstanceID, dataMapEmpInfo1,
						"STUDENT_SIGN_DATE,ADVISOR_SIGN_DATE,ARSC_SIGN_DATE,CHAIR_SIGN_DATE");
			} catch (IOException ioException) {
				ioException.printStackTrace();
			}
		}
	}

	public void saveUnderGradExcessUnitsFormData(Element afBoundDataElement, Connection conn, String formName,
			String tableName, String workflowInstanceID, DatabaseUtils dbUtil) {

		LinkedHashMap<String, Object> dataMapEmpInfo1 = null;

		if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
			String caseID = XMLUtils.getChildNodeContent(afBoundDataElement, "caseId1");
			String studentName = XMLUtils.getChildNodeContent(afBoundDataElement, "studentName");
			String cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "CWID");
			String phoneNumber = XMLUtils.getChildNodeContent(afBoundDataElement, "telephone");
			String street = XMLUtils.getChildNodeContent(afBoundDataElement, "street");
			String remainingAddress = XMLUtils.getChildNodeContent(afBoundDataElement, "street");
			String address = street.concat(", ").concat(remainingAddress);
			String classLevel = XMLUtils.getChildNodeContent(afBoundDataElement, "class_level");
			String major = XMLUtils.getChildNodeContent(afBoundDataElement, "major");
			String units = XMLUtils.getChildNodeContent(afBoundDataElement, "underGradUnits");
			String semester = XMLUtils.getChildNodeContent(afBoundDataElement, "underGradTerm");
			String yearVal = XMLUtils.getChildNodeContent(afBoundDataElement, "underGradYear");
			String year = "20".concat(yearVal);
			String cumulativeGPA = XMLUtils.getChildNodeContent(afBoundDataElement, "underGradCumulative_GPA");
			String reason = XMLUtils.getChildNodeContent(afBoundDataElement, "underGradReason");

			String studentSignature = XMLUtils.getChildNodeContent(afBoundDataElement, "student_signature");
			String studentSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "student_date");
			String studentSignComment = XMLUtils.getChildNodeContent(afBoundDataElement, "student_comments");

			String advisorSign = XMLUtils.getChildNodeContent(afBoundDataElement, "advisor_signature");
			String advisorSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "advisor_date");
			String advisorDecisionVal = XMLUtils.getChildNodeContent(afBoundDataElement, "advisor_decision");
			String advisorDecision = "";
			if (advisorDecisionVal.equals("1")) {
				advisorDecision = "Approved";
			} else if (advisorDecisionVal.equals("0")) {
				advisorDecision = "Denied";
			}
			String advisorComment = XMLUtils.getChildNodeContent(afBoundDataElement, "advisor_comment");

			String chairSign = XMLUtils.getChildNodeContent(afBoundDataElement, "chair_signature");
			String chairSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "chair_date");
			String chairDecisionVal = XMLUtils.getChildNodeContent(afBoundDataElement, "chair_decision");
			String chairDecision = "";
			if (chairDecisionVal.equals("1")) {
				chairDecision = "Approved";
			} else if (chairDecisionVal.equals("0")) {
				chairDecision = "Denied";
			}
			String chairComment = XMLUtils.getChildNodeContent(afBoundDataElement, "chair_comment");

			String arscSign = XMLUtils.getChildNodeContent(afBoundDataElement, "arscSignature");
			String arscSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "arscDate");
			String arscDecisionVal = XMLUtils.getChildNodeContent(afBoundDataElement, "arscDecision");
			String arscDecision = "";
			if (arscDecisionVal.equals("1")) {
				arscDecision = "Approved";
			} else if (arscDecisionVal.equals("0")) {
				arscDecision = "Denied";
			}
			String arscComment = XMLUtils.getChildNodeContent(afBoundDataElement, "arscComment");

			dataMapEmpInfo1 = new LinkedHashMap<String, Object>();
			dataMapEmpInfo1.put("CASE_ID", caseID);
			dataMapEmpInfo1.put("CWID", cwid);
			dataMapEmpInfo1.put("NAME", studentName);
			dataMapEmpInfo1.put("PHONE", phoneNumber);
			dataMapEmpInfo1.put("ADDRESS", address);
			dataMapEmpInfo1.put("CLASS_LEVEL", classLevel);
			dataMapEmpInfo1.put("MAJOR", major);
			dataMapEmpInfo1.put("UNITS", units);
			dataMapEmpInfo1.put("SEMESTER", semester);
			dataMapEmpInfo1.put("YEAR", year);
			dataMapEmpInfo1.put("CUMMULATIVE_GPA", cumulativeGPA);
			dataMapEmpInfo1.put("REASON_FOR_REQ", reason);
			dataMapEmpInfo1.put("STUDENT_SIGN", studentSignature);

			Object studentSignDateObj = null;
			if (studentSignDate != null && studentSignDate != "") {
				Date studentSignDateNew = Date.valueOf(studentSignDate);
				studentSignDateObj = studentSignDateNew;
			}
			dataMapEmpInfo1.put("STUDENT_SIGN_DATE", studentSignDateObj);
			dataMapEmpInfo1.put("COMMENTS", studentSignComment);

			dataMapEmpInfo1.put("AVISOR_SIGN", advisorSign);
			Object advisorSignDateObj = null;
			if (advisorSignDate != null && advisorSignDate != "") {
				Date advisorSignDateNew = Date.valueOf(advisorSignDate);
				advisorSignDateObj = advisorSignDateNew;
			}
			dataMapEmpInfo1.put("AVISOR_SIGN_DATE", advisorSignDateObj);
			dataMapEmpInfo1.put("AVISOR_DECISION", advisorDecision);
			dataMapEmpInfo1.put("AVISOR_COMMENTS", advisorComment);

			dataMapEmpInfo1.put("CHAIR_SIGN", chairSign);
			Object chairSignDateObj = null;
			if (chairSignDate != null && chairSignDate != "") {
				Date chairSignDateNew = Date.valueOf(chairSignDate);
				chairSignDateObj = chairSignDateNew;
			}
			dataMapEmpInfo1.put("CHAIR_SIGN_DATE", chairSignDateObj);
			dataMapEmpInfo1.put("CHAIR_DECISION", chairDecision);
			dataMapEmpInfo1.put("CHAIR_COMMENTS", chairComment);

			dataMapEmpInfo1.put("ARSC_SIGN", arscSign);

			Object arscSignDateObj = null;
			if (arscSignDate != null && arscSignDate != "") {
				Date arscSignDateNew = Date.valueOf(arscSignDate);
				arscSignDateObj = arscSignDateNew;
			}
			dataMapEmpInfo1.put("ARSC_SIGN_DATE", arscSignDateObj);
			dataMapEmpInfo1.put("ARSC_DECISION", arscDecision);
			dataMapEmpInfo1.put("ARSC_COMMENTS", arscComment);
			dataMapEmpInfo1.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

			/*dbUtil.insertFormData(conn, dataMapEmpInfo1, tableName, formName);*/
			try {
				CloudDbSaveUtil.saveFormData(tableName, formName, caseID, "CASE_ID", workflowInstanceID, dataMapEmpInfo1,
						"STUDENT_SIGN_DATE,AVISOR_SIGN_DATE,CHAIR_SIGN_DATE,ARSC_SIGN_DATE");
			} catch (IOException ioException) {
				ioException.printStackTrace();
			}
		}
	}
}
