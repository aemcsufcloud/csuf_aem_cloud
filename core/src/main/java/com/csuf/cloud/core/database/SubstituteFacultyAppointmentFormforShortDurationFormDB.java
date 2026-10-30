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

@Component(property = { "service.description=Substitute Faculty Short Duration DB", "service.vendor=ThoughtFocus",
		"process.label=Substitute Faculty Short Duration DB" })

public class SubstituteFacultyAppointmentFormforShortDurationFormDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory
			.getLogger(SubstituteFacultyAppointmentFormforShortDurationFormDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_SFSD_FORM";
		String formName = "Substitute Faculty Short Duration";
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
								log.debug("index=" + temp);
								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("EMP_NAME",
										eElement.getElementsByTagName("EmpName").item(0).getTextContent());
								dataMap.put("POS_NO_SUB_ASSIGNMENT",
										eElement.getElementsByTagName("PosNoSubAssignment").item(0).getTextContent());
								dataMap.put("CMS_POS_NO",
										eElement.getElementsByTagName("CMSPosNo").item(0).getTextContent());
								dataMap.put("SSN", eElement.getElementsByTagName("ssn").item(0).getTextContent());
								dataMap.put("RANGE_1",
										eElement.getElementsByTagName("Range1").item(0).getTextContent());
								dataMap.put("RANGE_2",
										eElement.getElementsByTagName("Range2").item(0).getTextContent());
								dataMap.put("RANGE_3",
										eElement.getElementsByTagName("Range3").item(0).getTextContent());
								dataMap.put("WORK_LOCATION",
										eElement.getElementsByTagName("WorkLocation").item(0).getTextContent());
								dataMap.put("CSUF_EMP_YES",
										eElement.getElementsByTagName("CSUFEmpYes").item(0).getTextContent());
								dataMap.put("CSUF_EMP_NO",
										eElement.getElementsByTagName("CSUFEmpNo").item(0).getTextContent());
								dataMap.put("CURR_CSUF_EMP",
										eElement.getElementsByTagName("CurrCSUFEmp").item(0).getTextContent());
								dataMap.put("SUB_ASS_COURSE_NUM",
										eElement.getElementsByTagName("SubAssCourseNum").item(0).getTextContent());
								dataMap.put("TOT_EST_COMP",
										eElement.getElementsByTagName("TotEstComp").item(0).getTextContent());
								dataMap.put("HOURLY_RATE_LECTURE",
										eElement.getElementsByTagName("HourlyRateLecture").item(0).getTextContent());
								dataMap.put("COMP_HR_LECTURE",
										eElement.getElementsByTagName("CompHRLecture").item(0).getTextContent());
								dataMap.put("COMP_HR_LAB",
										eElement.getElementsByTagName("CompHRLab").item(0).getTextContent());
								dataMap.put("TOT_NO_HR_LAB",
										eElement.getElementsByTagName("TotNoHrLab").item(0).getTextContent());
								dataMap.put("HOURLY_RATE_LAB",
										eElement.getElementsByTagName("HourlyRateLab").item(0).getTextContent());
								dataMap.put("FACULTY_REQUIRING_SUB",
										eElement.getElementsByTagName("FacultyRequiringSub").item(0).getTextContent());
								dataMap.put("REASON", eElement.getElementsByTagName("Reason").item(0).getTextContent());

								String effdate = eElement.getElementsByTagName("EffDate").item(0).getTextContent();
								Object effdateObj = "";
								if (effdate != null && effdate != "") {
									Date effdateNew = Date.valueOf(effdate);
									effdateObj = effdateNew;
								}
								dataMap.put("EFF_DATE", effdateObj);

								String projenddate = eElement.getElementsByTagName("ProjEndDate").item(0)
										.getTextContent();
								Object projenddateObj = "";
								if (projenddate != null && projenddate != "") {
									Date projenddateNew = Date.valueOf(projenddate);
									projenddateObj = projenddateNew;
								}
								dataMap.put("PROJ_END_DATE", projenddateObj);

								dataMap.put("FORM_INITIATOR_NAME",
										eElement.getElementsByTagName("form_initiator_name").item(0).getTextContent());
								String forminitiatordate = eElement.getElementsByTagName("form_initiator_date").item(0)
										.getTextContent();
								Object forminitiatordateObj = "";
								if (forminitiatordate != null && forminitiatordate != "") {
									Date forminitiatordateNew = Date.valueOf(forminitiatordate);
									forminitiatordateObj = forminitiatordateNew;
								}
								dataMap.put("FORM_INITIATOR_DATE", forminitiatordateObj);

								dataMap.put("DEPT_CHAIR_SIGN",
										eElement.getElementsByTagName("dept_chair_signature").item(0).getTextContent());
								String deptchairdate = eElement.getElementsByTagName("dept_chair_date").item(0)
										.getTextContent();
								Object deptchairdateObj = "";
								if (deptchairdate != null && deptchairdate != "") {
									Date deptchairdateNew = Date.valueOf(deptchairdate);
									deptchairdateObj = deptchairdateNew;
								}
								dataMap.put("DEPT_CHAIR_DATE", deptchairdateObj);

								dataMap.put("DEAN_SIGNATURE",
										eElement.getElementsByTagName("dean_signature").item(0).getTextContent());
								String deandate = eElement.getElementsByTagName("dean_date").item(0).getTextContent();
								Object deandateObj = "";
								if (deandate != null && deandate != "") {
									Date deandateNew = Date.valueOf(deandate);
									deandateObj = deandateNew;
								}
								dataMap.put("DEAN_DATE", deandateObj);

								dataMap.put("HR_SIGNATURE",
										eElement.getElementsByTagName("hr_signature").item(0).getTextContent());
								String hrdate = eElement.getElementsByTagName("hr_date").item(0).getTextContent();
								Object hrdateObj = "";
								if (hrdate != null && hrdate != "") {
									Date hrdateNew = Date.valueOf(hrdate);
									hrdateObj = hrdateNew;
								}
								dataMap.put("HR_DATE", hrdateObj);

								dataMap.put("DEPT_COO_SIGNATURE", eElement
										.getElementsByTagName("dept_coordinator_signature").item(0).getTextContent());
								String deptcoodate = eElement.getElementsByTagName("dept_coordinator_date").item(0)
										.getTextContent();
								Object deptcoodateObj = "";
								if (deptcoodate != null && deptcoodate != "") {
									Date deptcoodateNew = Date.valueOf(deptcoodate);
									deptcoodateObj = deptcoodateNew;
								}
								dataMap.put("DEPT_COO_DATE", deptcoodateObj);

								dataMap.put("SUB_FACULTY_SIGNATURE", eElement
										.getElementsByTagName("substitude_faculty_signature").item(0).getTextContent());
								String subfacultydate = eElement.getElementsByTagName("substitude_faculty_date").item(0)
										.getTextContent();
								Object subfacultydateObj = "";
								if (subfacultydate != null && subfacultydate != "") {
									Date subfacultydateNew = Date.valueOf(subfacultydate);
									subfacultydateObj = subfacultydateNew;
								}
								dataMap.put("SUB_FACULTY_DATE", subfacultydateObj);
								
								dataMap.put("OPTIONAL_REVIEWER_SIGNATURE", eElement
										.getElementsByTagName("OptionalReviewerSignature").item(0).getTextContent());
								String optionaldate = eElement.getElementsByTagName("OptionalReviewerSignatureDate").item(0)
										.getTextContent();
								Object optionaldateObj = "";
								if (optionaldate != null && optionaldate != "") {
									Date optionaldateNew = Date.valueOf(optionaldate);
									optionaldateObj = optionaldateNew;
								}
								dataMap.put("OPTIONAL_REVIEWER_SIGN_DATE", optionaldateObj);

								dataMap.put("ADDITIONAL_COMMENTS",
										eElement.getElementsByTagName("AdditionalComments").item(0).getTextContent());
								dataMap.put("CHAIR_COMMENTS",
										eElement.getElementsByTagName("chair_comments").item(0).getTextContent());
								dataMap.put("DEPT_COO_COMMENTS", eElement
										.getElementsByTagName("dept_coordinator_comments").item(0).getTextContent());
								dataMap.put("DEAN_COMMENTS",
										eElement.getElementsByTagName("dean_comments").item(0).getTextContent());
								dataMap.put("HR_COMMENTS",
										eElement.getElementsByTagName("hr_comments").item(0).getTextContent());
								dataMap.put("SUB_FACULTY_COMMENTS", eElement
										.getElementsByTagName("substitude_faculty_comments").item(0).getTextContent());
								dataMap.put("OPTIONAL_REVIEWER_COMMENTS", eElement
										.getElementsByTagName("OptionalReviewerComments").item(0).getTextContent());
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

								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());

								dataMap.put("USER_ID",
										eElement.getElementsByTagName("hidden_dean_userID").item(0).getTextContent());
								dataMap.put("DEAN_EMAIL",
										eElement.getElementsByTagName("hidden_dean_email").item(0).getTextContent());
								dataMap.put("DEAN_NAME",
										eElement.getElementsByTagName("hidden_dean_name").item(0).getTextContent());
								dataMap.put("FACULTY_USER_ID", eElement.getElementsByTagName("hidden_faculty_userID")
										.item(0).getTextContent());
								dataMap.put("FACULTY_EMAIL",
										eElement.getElementsByTagName("hidden_faculty_email").item(0).getTextContent());
								dataMap.put("INITIATOR_FIRSTNAME", eElement
										.getElementsByTagName("hidden_initiator_firstName").item(0).getTextContent());
								dataMap.put("INITIATOR_LASTNAME", eElement
										.getElementsByTagName("hidden_initiator_lastName").item(0).getTextContent());
								dataMap.put("INITIATOR_USER_ID", eElement
										.getElementsByTagName("hidden_initiator_userID").item(0).getTextContent());
								dataMap.put("INITIATOR_EMAIL", eElement.getElementsByTagName("hidden_initiator_email")
										.item(0).getTextContent());
								dataMap.put("CHAIR_USER_ID",
										eElement.getElementsByTagName("hidden_chair_userID").item(0).getTextContent());
								dataMap.put("CHAIR_EMAIL",
										eElement.getElementsByTagName("hidden_chair_email").item(0).getTextContent());
								dataMap.put("CHAIR_NAME",
										eElement.getElementsByTagName("hidden_chair_name").item(0).getTextContent());
								dataMap.put("OPTIONAL_REVIEWER_USER_ID",
										eElement.getElementsByTagName("OptionalReviewerUserId").item(0).getTextContent());
								dataMap.put("OPTIONAL_REVIEWER_EMAIL_ID",
										eElement.getElementsByTagName("OptionalReviewerEmailId").item(0).getTextContent());
								dataMap.put("OPTIONAL_REVIEWER_NAME",
										eElement.getElementsByTagName("OptionalReviewerName").item(0).getTextContent());

								dataMap.put("LECTURE1_HRS",
										eElement.getElementsByTagName("Lecture1").item(0).getTextContent());
								dataMap.put("LECTURE2_HRS",
										eElement.getElementsByTagName("Lecture2").item(0).getTextContent());
								dataMap.put("LECTURE3_HRS",
										eElement.getElementsByTagName("Lecture3").item(0).getTextContent());
								dataMap.put("LECTURE4_HRS",
										eElement.getElementsByTagName("Lecture4").item(0).getTextContent());
								dataMap.put("LECTURE5_HRS",
										eElement.getElementsByTagName("Lecture5").item(0).getTextContent());
								dataMap.put("LECTURE6_HRS",
										eElement.getElementsByTagName("Lecture6").item(0).getTextContent());
								dataMap.put("LECTURE7_HRS",
										eElement.getElementsByTagName("Lecture7").item(0).getTextContent());
								dataMap.put("LECTURE8_HRS",
										eElement.getElementsByTagName("Lecture8").item(0).getTextContent());
								dataMap.put("LECTURE9_HRS",
										eElement.getElementsByTagName("Lecture9").item(0).getTextContent());
								dataMap.put("LECTURE10_HRS",
										eElement.getElementsByTagName("Lecture10").item(0).getTextContent());
								dataMap.put("LECTURE11_HRS",
										eElement.getElementsByTagName("Lecture11").item(0).getTextContent());
								dataMap.put("LECTURE12_HRS",
										eElement.getElementsByTagName("Lecture12").item(0).getTextContent());
								dataMap.put("LECTURE13_HRS",
										eElement.getElementsByTagName("Lecture13").item(0).getTextContent());
								dataMap.put("LECTURE14_HRS",
										eElement.getElementsByTagName("Lecture14").item(0).getTextContent());
								dataMap.put("LECTURE15_HRS",
										eElement.getElementsByTagName("Lecture15").item(0).getTextContent());
								dataMap.put("LECTURE16_HRS",
										eElement.getElementsByTagName("Lecture16").item(0).getTextContent());
								dataMap.put("LECTURE17_HRS",
										eElement.getElementsByTagName("Lecture17").item(0).getTextContent());
								dataMap.put("LECTURE18_HRS",
										eElement.getElementsByTagName("Lecture18").item(0).getTextContent());
								dataMap.put("LECTURE19_HRS",
										eElement.getElementsByTagName("Lecture19").item(0).getTextContent());
								dataMap.put("LECTURE20_HRS",
										eElement.getElementsByTagName("Lecture20").item(0).getTextContent());
								dataMap.put("LECTURE21_HRS",
										eElement.getElementsByTagName("Lecture21").item(0).getTextContent());
								dataMap.put("LECTURE22_HRS",
										eElement.getElementsByTagName("Lecture22").item(0).getTextContent());
								dataMap.put("LECTURE23_HRS",
										eElement.getElementsByTagName("Lecture23").item(0).getTextContent());
								dataMap.put("LECTURE24_HRS",
										eElement.getElementsByTagName("Lecture24").item(0).getTextContent());
								dataMap.put("LECTURE25_HRS",
										eElement.getElementsByTagName("Lecture25").item(0).getTextContent());
								dataMap.put("LECTURE26_HRS",
										eElement.getElementsByTagName("Lecture26").item(0).getTextContent());
								dataMap.put("LECTURE27_HRS",
										eElement.getElementsByTagName("Lecture27").item(0).getTextContent());
								dataMap.put("LECTURE28_HRS",
										eElement.getElementsByTagName("Lecture28").item(0).getTextContent());
								dataMap.put("LECTURE29_HRS",
										eElement.getElementsByTagName("Lecture29").item(0).getTextContent());
								dataMap.put("LECTURE30_HRS",
										eElement.getElementsByTagName("Lecture30").item(0).getTextContent());
								dataMap.put("LECTURE31_HRS",
										eElement.getElementsByTagName("Lecture31").item(0).getTextContent());
								dataMap.put("LECTURE32_HRS",
										eElement.getElementsByTagName("Lecture32").item(0).getTextContent());


								dataMap.put("LAB1_HRS", eElement.getElementsByTagName("Lab1").item(0).getTextContent());
								dataMap.put("LAB2_HRS", eElement.getElementsByTagName("Lab2").item(0).getTextContent());
								dataMap.put("LAB3_HRS", eElement.getElementsByTagName("Lab3").item(0).getTextContent());
								dataMap.put("LAB4_HRS", eElement.getElementsByTagName("Lab4").item(0).getTextContent());
								dataMap.put("LAB5_HRS", eElement.getElementsByTagName("Lab5").item(0).getTextContent());
								dataMap.put("LAB6_HRS", eElement.getElementsByTagName("Lab6").item(0).getTextContent());
								dataMap.put("LAB7_HRS", eElement.getElementsByTagName("Lab7").item(0).getTextContent());
								dataMap.put("LAB8_HRS", eElement.getElementsByTagName("Lab8").item(0).getTextContent());
								dataMap.put("LAB9_HRS", eElement.getElementsByTagName("Lab9").item(0).getTextContent());
								dataMap.put("LAB10_HRS",
										eElement.getElementsByTagName("Lab10").item(0).getTextContent());
								dataMap.put("LAB11_HRS",
										eElement.getElementsByTagName("Lab11").item(0).getTextContent());
								dataMap.put("LAB12_HRS",
										eElement.getElementsByTagName("Lab12").item(0).getTextContent());
								dataMap.put("LAB13_HRS",
										eElement.getElementsByTagName("Lab13").item(0).getTextContent());
								dataMap.put("LAB14_HRS",
										eElement.getElementsByTagName("Lab14").item(0).getTextContent());
								dataMap.put("LAB15_HRS",
										eElement.getElementsByTagName("Lab15").item(0).getTextContent());
								dataMap.put("LAB16_HRS",
										eElement.getElementsByTagName("Lab16").item(0).getTextContent());
								dataMap.put("LAB17_HRS",
										eElement.getElementsByTagName("Lab17").item(0).getTextContent());
								dataMap.put("LAB18_HRS",
										eElement.getElementsByTagName("Lab18").item(0).getTextContent());
								dataMap.put("LAB19_HRS",
										eElement.getElementsByTagName("Lab19").item(0).getTextContent());
								dataMap.put("LAB20_HRS",
										eElement.getElementsByTagName("Lab20").item(0).getTextContent());
								dataMap.put("LAB21_HRS",
										eElement.getElementsByTagName("Lab21").item(0).getTextContent());
								dataMap.put("LAB22_HRS",
										eElement.getElementsByTagName("Lab22").item(0).getTextContent());
								dataMap.put("LAB23_HRS",
										eElement.getElementsByTagName("Lab23").item(0).getTextContent());
								dataMap.put("LAB24_HRS",
										eElement.getElementsByTagName("Lab24").item(0).getTextContent());
								dataMap.put("LAB25_HRS",
										eElement.getElementsByTagName("Lab25").item(0).getTextContent());
								dataMap.put("LAB26_HRS",
										eElement.getElementsByTagName("Lab26").item(0).getTextContent());
								dataMap.put("LAB27_HRS",
										eElement.getElementsByTagName("Lab27").item(0).getTextContent());
								dataMap.put("LAB28_HRS",
										eElement.getElementsByTagName("Lab28").item(0).getTextContent());
								dataMap.put("LAB29_HRS",
										eElement.getElementsByTagName("Lab29").item(0).getTextContent());
								dataMap.put("LAB30_HRS",
										eElement.getElementsByTagName("Lab30").item(0).getTextContent());
								dataMap.put("LAB31_HRS",
										eElement.getElementsByTagName("Lab31").item(0).getTextContent());
								dataMap.put("LAB32_HRS",
										eElement.getElementsByTagName("Lab32").item(0).getTextContent());

								dataMap.put("TABLE2_LECTURE1_HRS",
										eElement.getElementsByTagName("Table2Lecture1").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE2_HRS",
										eElement.getElementsByTagName("Table2Lecture2").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE3_HRS",
										eElement.getElementsByTagName("Table2Lecture3").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE4_HRS",
										eElement.getElementsByTagName("Table2Lecture4").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE5_HRS",
										eElement.getElementsByTagName("Table2Lecture5").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE6_HRS",
										eElement.getElementsByTagName("Table2Lecture6").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE7_HRS",
										eElement.getElementsByTagName("Table2Lecture7").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE8_HRS",
										eElement.getElementsByTagName("Table2Lecture8").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE9_HRS",
										eElement.getElementsByTagName("Table2Lecture9").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE10_HRS",
										eElement.getElementsByTagName("Table2Lecture10").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE11_HRS",
										eElement.getElementsByTagName("Table2Lecture11").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE12_HRS",
										eElement.getElementsByTagName("Table2Lecture12").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE13_HRS",
										eElement.getElementsByTagName("Table2Lecture13").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE14_HRS",
										eElement.getElementsByTagName("Table2Lecture14").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE15_HRS",
										eElement.getElementsByTagName("Table2Lecture15").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE16_HRS",
										eElement.getElementsByTagName("Table2Lecture16").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE17_HRS",
										eElement.getElementsByTagName("Table2Lecture17").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE18_HRS",
										eElement.getElementsByTagName("Table2Lecture18").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE19_HRS",
										eElement.getElementsByTagName("Table2Lecture19").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE20_HRS",
										eElement.getElementsByTagName("Table2Lecture20").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE21_HRS",
										eElement.getElementsByTagName("Table2Lecture21").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE22_HRS",
										eElement.getElementsByTagName("Table2Lecture22").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE23_HRS",
										eElement.getElementsByTagName("Table2Lecture23").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE24_HRS",
										eElement.getElementsByTagName("Table2Lecture24").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE25_HRS",
										eElement.getElementsByTagName("Table2Lecture25").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE26_HRS",
										eElement.getElementsByTagName("Table2Lecture26").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE27_HRS",
										eElement.getElementsByTagName("Table2Lecture27").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE28_HRS",
										eElement.getElementsByTagName("Table2Lecture28").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE29_HRS",
										eElement.getElementsByTagName("Table2Lecture29").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE30_HRS",
										eElement.getElementsByTagName("Table2Lecture30").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE31_HRS",
										eElement.getElementsByTagName("Table2Lecture31").item(0).getTextContent());
								dataMap.put("TABLE2_LECTURE32_HRS",
										eElement.getElementsByTagName("Table2Lecture32").item(0).getTextContent());

								dataMap.put("TABLE2_LAB1_HRS",
										eElement.getElementsByTagName("Table2Lab1").item(0).getTextContent());
								dataMap.put("TABLE2_LAB2_HRS",
										eElement.getElementsByTagName("Table2Lab2").item(0).getTextContent());
								dataMap.put("TABLE2_LAB3_HRS",
										eElement.getElementsByTagName("Table2Lab3").item(0).getTextContent());
								dataMap.put("TABLE2_LAB4_HRS",
										eElement.getElementsByTagName("Table2Lab4").item(0).getTextContent());
								dataMap.put("TABLE2_LAB5_HRS",
										eElement.getElementsByTagName("Table2Lab5").item(0).getTextContent());
								dataMap.put("TABLE2_LAB6_HRS",
										eElement.getElementsByTagName("Table2Lab6").item(0).getTextContent());
								dataMap.put("TABLE2_LAB7_HRS",
										eElement.getElementsByTagName("Table2Lab7").item(0).getTextContent());
								dataMap.put("TABLE2_LAB8_HRS",
										eElement.getElementsByTagName("Table2Lab8").item(0).getTextContent());
								dataMap.put("TABLE2_LAB9_HRS",
										eElement.getElementsByTagName("Table2Lab9").item(0).getTextContent());
								dataMap.put("TABLE2_LAB10_HRS",
										eElement.getElementsByTagName("Table2Lab10").item(0).getTextContent());
								dataMap.put("TABLE2_LAB11_HRS",
										eElement.getElementsByTagName("Table2Lab11").item(0).getTextContent());
								dataMap.put("TABLE2_LAB12_HRS",
										eElement.getElementsByTagName("Table2Lab12").item(0).getTextContent());
								dataMap.put("TABLE2_LAB13_HRS",
										eElement.getElementsByTagName("Table2Lab13").item(0).getTextContent());
								dataMap.put("TABLE2_LAB14_HRS",
										eElement.getElementsByTagName("Table2Lab14").item(0).getTextContent());
								dataMap.put("TABLE2_LAB15_HRS",
										eElement.getElementsByTagName("Table2Lab15").item(0).getTextContent());
								dataMap.put("TABLE2_LAB16_HRS",
										eElement.getElementsByTagName("Table2Lab16").item(0).getTextContent());
								dataMap.put("TABLE2_LAB17_HRS",
										eElement.getElementsByTagName("Table2Lab17").item(0).getTextContent());
								dataMap.put("TABLE2_LAB18_HRS",
										eElement.getElementsByTagName("Table2Lab18").item(0).getTextContent());
								dataMap.put("TABLE2_LAB19_HRS",
										eElement.getElementsByTagName("Table2Lab19").item(0).getTextContent());
								dataMap.put("TABLE2_LAB20_HRS",
										eElement.getElementsByTagName("Table2Lab20").item(0).getTextContent());
								dataMap.put("TABLE2_LAB21_HRS",
										eElement.getElementsByTagName("Table2Lab21").item(0).getTextContent());
								dataMap.put("TABLE2_LAB22_HRS",
										eElement.getElementsByTagName("Table2Lab22").item(0).getTextContent());
								dataMap.put("TABLE2_LAB23_HRS",
										eElement.getElementsByTagName("Table2Lab23").item(0).getTextContent());
								dataMap.put("TABLE2_LAB24_HRS",
										eElement.getElementsByTagName("Table2Lab24").item(0).getTextContent());
								dataMap.put("TABLE2_LAB25_HRS",
										eElement.getElementsByTagName("Table2Lab25").item(0).getTextContent());
								dataMap.put("TABLE2_LAB26_HRS",
										eElement.getElementsByTagName("Table2Lab26").item(0).getTextContent());
								dataMap.put("TABLE2_LAB27_HRS",
										eElement.getElementsByTagName("Table2Lab27").item(0).getTextContent());
								dataMap.put("TABLE2_LAB28_HRS",
										eElement.getElementsByTagName("Table2Lab28").item(0).getTextContent());
								dataMap.put("TABLE2_LAB29_HRS",
										eElement.getElementsByTagName("Table2Lab29").item(0).getTextContent());
								dataMap.put("TABLE2_LAB30_HRS",
										eElement.getElementsByTagName("Table2Lab30").item(0).getTextContent());
								dataMap.put("TABLE2_LAB31_HRS",
										eElement.getElementsByTagName("Table2Lab31").item(0).getTextContent());
								dataMap.put("TABLE2_LAB32_HRS",
										eElement.getElementsByTagName("Table2Lab32").item(0).getTextContent());

								dataMap.put("TABLE3_LECTURE1_HRS",
										eElement.getElementsByTagName("Table3Lecture1").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE2_HRS",
										eElement.getElementsByTagName("Table3Lecture2").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE3_HRS",
										eElement.getElementsByTagName("Table3Lecture3").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE4_HRS",
										eElement.getElementsByTagName("Table3Lecture4").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE5_HRS",
										eElement.getElementsByTagName("Table3Lecture5").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE6_HRS",
										eElement.getElementsByTagName("Table3Lecture6").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE7_HRS",
										eElement.getElementsByTagName("Table3Lecture7").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE8_HRS",
										eElement.getElementsByTagName("Table3Lecture8").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE9_HRS",
										eElement.getElementsByTagName("Table3Lecture9").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE10_HRS",
										eElement.getElementsByTagName("Table3Lecture10").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE11_HRS",
										eElement.getElementsByTagName("Table3Lecture11").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE12_HRS",
										eElement.getElementsByTagName("Table3Lecture12").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE13_HRS",
										eElement.getElementsByTagName("Table3Lecture13").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE14_HRS",
										eElement.getElementsByTagName("Table3Lecture14").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE15_HRS",
										eElement.getElementsByTagName("Table3Lecture15").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE16_HRS",
										eElement.getElementsByTagName("Table3Lecture16").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE17_HRS",
										eElement.getElementsByTagName("Table3Lecture17").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE18_HRS",
										eElement.getElementsByTagName("Table3Lecture18").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE19_HRS",
										eElement.getElementsByTagName("Table3Lecture19").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE20_HRS",
										eElement.getElementsByTagName("Table3Lecture20").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE21_HRS",
										eElement.getElementsByTagName("Table3Lecture21").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE22_HRS",
										eElement.getElementsByTagName("Table3Lecture22").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE23_HRS",
										eElement.getElementsByTagName("Table3Lecture23").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE24_HRS",
										eElement.getElementsByTagName("Table3Lecture24").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE25_HRS",
										eElement.getElementsByTagName("Table3Lecture25").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE26_HRS",
										eElement.getElementsByTagName("Table3Lecture26").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE27_HRS",
										eElement.getElementsByTagName("Table3Lecture27").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE28_HRS",
										eElement.getElementsByTagName("Table3Lecture28").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE29_HRS",
										eElement.getElementsByTagName("Table3Lecture29").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE30_HRS",
										eElement.getElementsByTagName("Table3Lecture30").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE31_HRS",
										eElement.getElementsByTagName("Table3Lecture31").item(0).getTextContent());
								dataMap.put("TABLE3_LECTURE32_HRS",
										eElement.getElementsByTagName("Table3Lecture32").item(0).getTextContent());

								dataMap.put("TABLE3_LAB1_HRS",
										eElement.getElementsByTagName("Table3Lab1").item(0).getTextContent());
								dataMap.put("TABLE3_LAB2_HRS",
										eElement.getElementsByTagName("Table3Lab2").item(0).getTextContent());
								dataMap.put("TABLE3_LAB3_HRS",
										eElement.getElementsByTagName("Table3Lab3").item(0).getTextContent());
								dataMap.put("TABLE3_LAB4_HRS",
										eElement.getElementsByTagName("Table3Lab4").item(0).getTextContent());
								dataMap.put("TABLE3_LAB5_HRS",
										eElement.getElementsByTagName("Table3Lab5").item(0).getTextContent());
								dataMap.put("TABLE3_LAB6_HRS",
										eElement.getElementsByTagName("Table3Lab6").item(0).getTextContent());
								dataMap.put("TABLE3_LAB7_HRS",
										eElement.getElementsByTagName("Table3Lab7").item(0).getTextContent());
								dataMap.put("TABLE3_LAB8_HRS",
										eElement.getElementsByTagName("Table3Lab8").item(0).getTextContent());
								dataMap.put("TABLE3_LAB9_HRS",
										eElement.getElementsByTagName("Table3Lab9").item(0).getTextContent());
								dataMap.put("TABLE3_LAB10_HRS",
										eElement.getElementsByTagName("Table3Lab10").item(0).getTextContent());
								dataMap.put("TABLE3_LAB11_HRS",
										eElement.getElementsByTagName("Table3Lab11").item(0).getTextContent());
								dataMap.put("TABLE3_LAB12_HRS",
										eElement.getElementsByTagName("Table3Lab12").item(0).getTextContent());
								dataMap.put("TABLE3_LAB13_HRS",
										eElement.getElementsByTagName("Table3Lab13").item(0).getTextContent());
								dataMap.put("TABLE3_LAB14_HRS",
										eElement.getElementsByTagName("Table3Lab14").item(0).getTextContent());
								dataMap.put("TABLE3_LAB15_HRS",
										eElement.getElementsByTagName("Table3Lab15").item(0).getTextContent());
								dataMap.put("TABLE3_LAB16_HRS",
										eElement.getElementsByTagName("Table3Lab16").item(0).getTextContent());
								dataMap.put("TABLE3_LAB17_HRS",
										eElement.getElementsByTagName("Table3Lab17").item(0).getTextContent());
								dataMap.put("TABLE3_LAB18_HRS",
										eElement.getElementsByTagName("Table3Lab18").item(0).getTextContent());
								dataMap.put("TABLE3_LAB19_HRS",
										eElement.getElementsByTagName("Table3Lab19").item(0).getTextContent());
								dataMap.put("TABLE3_LAB20_HRS",
										eElement.getElementsByTagName("Table3Lab20").item(0).getTextContent());
								dataMap.put("TABLE3_LAB21_HRS",
										eElement.getElementsByTagName("Table3Lab21").item(0).getTextContent());
								dataMap.put("TABLE3_LAB22_HRS",
										eElement.getElementsByTagName("Table3Lab22").item(0).getTextContent());
								dataMap.put("TABLE3_LAB23_HRS",
										eElement.getElementsByTagName("Table3Lab23").item(0).getTextContent());
								dataMap.put("TABLE3_LAB24_HRS",
										eElement.getElementsByTagName("Table3Lab24").item(0).getTextContent());
								dataMap.put("TABLE3_LAB25_HRS",
										eElement.getElementsByTagName("Table3Lab25").item(0).getTextContent());
								dataMap.put("TABLE3_LAB26_HRS",
										eElement.getElementsByTagName("Table3Lab26").item(0).getTextContent());
								dataMap.put("TABLE3_LAB27_HRS",
										eElement.getElementsByTagName("Table3Lab27").item(0).getTextContent());
								dataMap.put("TABLE3_LAB28_HRS",
										eElement.getElementsByTagName("Table3Lab28").item(0).getTextContent());
								dataMap.put("TABLE3_LAB29_HRS",
										eElement.getElementsByTagName("Table3Lab29").item(0).getTextContent());
								dataMap.put("TABLE3_LAB30_HRS",
										eElement.getElementsByTagName("Table3Lab30").item(0).getTextContent());
								dataMap.put("TABLE3_LAB31_HRS",
										eElement.getElementsByTagName("Table3Lab31").item(0).getTextContent());
								dataMap.put("TABLE3_LAB32_HRS",
										eElement.getElementsByTagName("Table3Lab32").item(0).getTextContent());

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
							"EFF_DATE,PROJ_END_DATE,FORM_INITIATOR_DATE,DEPT_CHAIR_DATE,DEAN_DATE,HR_DATE,DEPT_COO_DATE,SUB_FACULTY_DATE,OPTIONAL_REVIEWER_SIGN_DATE,PAYROLL_DATE");
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
						log.debug("IOException in SubstituteFacultyShortDurationFormDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
/*				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in SubstituteFacultyShortDurationFormDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}*/
			}

		}

	}
}
