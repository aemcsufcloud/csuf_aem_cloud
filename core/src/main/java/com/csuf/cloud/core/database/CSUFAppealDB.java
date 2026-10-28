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
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=CSUF Sample DB", "service.vendor=ThoughtFocus",
		"process.label=CSUFAppealDB" })

public class CSUFAppealDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	private static final Logger log = LoggerFactory.getLogger(CSUFAppealDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_APPEAL_FORM";
		String formName = "Appeal Form";
		String caseId = "";
		String transferFlag = "";
		String freshmenFlag = "";
		String term = "";
		String applicantName = "";
		String CWID = "";
		String csuEmail = "";
		String personalEmail = "";
		String telNo = "";
		String applicantSign = "";
		String applicantSignDate = "";
		String applicantComments = "";
		String certifyCB = "";
		String appealReason1 = "";
		String appealReason2 = "";
		String appealReason3 = "";
		String appealReason4 = "";
		String appealReason5 = "";
		String appealReason6 = "";
		String appealReason7 = "";
		String appealReason8 = "";
		String otherReason = "";
		String depositByDate = "";
		String studentGPA = "";
		String defAGCource = "";
		String unitsCompleted = "";
		String totalGPA = "";
		String studentGPA1 = "";
		String lowGPAADTCB = "";
		String localAdmGPA = "";
		String outLocalAdmGPA = "";
		String goldenDefIn = "";
		String appealsCB = "";
		String appealsSign = "";
		String appealsSignDate = "";
		String appealComments = "";
		String appealsRecommend = "";
		String approveAction = "";
		String denyAction = "";
		String studentUserId = "";
		String approvalCondition = "";
		String returningFlag = "";
		String workflowInstanceID = "";
		String reconsiderationReqCB = "";
		String otherAdmissionReason = "";
		String otherAdmissionReasonCB = "";
		String studentMajor = "";
		String incompleteAppealReason = "";
		String extenuatingFlag = "";
		String appealStatement = "";
		String housingYesNo = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		workflowInstanceID = workItem.getWorkflow().getId();
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
							org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
							caseId = eElement.getElementsByTagName("CaseId").item(0).getTextContent();
							transferFlag = eElement.getElementsByTagName("AppealCB3").item(0).getTextContent();
							freshmenFlag = eElement.getElementsByTagName("AppealCB1").item(0).getTextContent();
							returningFlag = eElement.getElementsByTagName("AppealCB2").item(0).getTextContent();
							term = eElement.getElementsByTagName("Term").item(0).getTextContent();
							applicantName = eElement.getElementsByTagName("ApplicantName").item(0).getTextContent();
							CWID = eElement.getElementsByTagName("CWID").item(0).getTextContent();
							csuEmail = eElement.getElementsByTagName("CSUStudentEmail").item(0).getTextContent();
							personalEmail = eElement.getElementsByTagName("PersonalStudentEmail").item(0)
									.getTextContent();
							telNo = eElement.getElementsByTagName("TelNumber").item(0).getTextContent();
							applicantSign = eElement.getElementsByTagName("ApplicantSignature").item(0)
									.getTextContent();
							applicantSignDate = eElement.getElementsByTagName("ApplicantSignDate").item(0)
									.getTextContent();
							applicantComments = eElement.getElementsByTagName("ApplicantComments").item(0)
									.getTextContent();
							certifyCB = eElement.getElementsByTagName("CertifyCB").item(0).getTextContent();

							appealReason1 = eElement.getElementsByTagName("AppealReason1").item(0).getTextContent();
							appealReason2 = eElement.getElementsByTagName("AppealReason2").item(0).getTextContent();
							appealReason3 = eElement.getElementsByTagName("AppealReason3").item(0).getTextContent();
							appealReason4 = eElement.getElementsByTagName("AppealReason4").item(0).getTextContent();
							appealReason5 = eElement.getElementsByTagName("AppealReason5").item(0).getTextContent();
							appealReason6 = eElement.getElementsByTagName("AppealReason6").item(0).getTextContent();
							appealReason7 = eElement.getElementsByTagName("AppealReason7").item(0).getTextContent();
							appealReason8 = eElement.getElementsByTagName("AppealReason8").item(0).getTextContent();
							otherReason = eElement.getElementsByTagName("OtherReason").item(0).getTextContent();
							depositByDate = eElement.getElementsByTagName("DepositByDate").item(0).getTextContent();
							studentGPA = eElement.getElementsByTagName("StudentGPA").item(0).getTextContent();
							defAGCource = eElement.getElementsByTagName("DeficientAGCourseList").item(0)
									.getTextContent();
							unitsCompleted = eElement.getElementsByTagName("Units").item(0).getTextContent();
							totalGPA = eElement.getElementsByTagName("TotalGPA").item(0).getTextContent();
							studentGPA1 = eElement.getElementsByTagName("StudentGPA_1").item(0).getTextContent();
							lowGPAADTCB = eElement.getElementsByTagName("LowGPAWithADTCB").item(0).getTextContent();
							localAdmGPA = eElement.getElementsByTagName("LocalAdmissionGPA").item(0).getTextContent();
							outLocalAdmGPA = eElement.getElementsByTagName("OutLocaladmissionGPA").item(0)
									.getTextContent();
							goldenDefIn = eElement.getElementsByTagName("GoldenDeficientIn").item(0).getTextContent();
							appealsCB = eElement.getElementsByTagName("AppealsCB").item(0).getTextContent();
							appealsSign = eElement.getElementsByTagName("AppealsSign").item(0).getTextContent();
							appealsSignDate = eElement.getElementsByTagName("AppealsSignDate").item(0).getTextContent();
							appealComments = eElement.getElementsByTagName("AppealComments").item(0).getTextContent();
							appealStatement = eElement.getElementsByTagName("AppealStatement").item(0).getTextContent();
							appealsRecommend = eElement.getElementsByTagName("AppealsRecommend").item(0)
									.getTextContent();
							approveAction = eElement.getElementsByTagName("ApproveAction").item(0).getTextContent();
							denyAction = eElement.getElementsByTagName("DenyAction").item(0).getTextContent();
							studentUserId = eElement.getElementsByTagName("StudentUserId").item(0).getTextContent();
							approvalCondition = eElement.getElementsByTagName("ApproveConditions").item(0)
									.getTextContent();
							reconsiderationReqCB = eElement.getElementsByTagName("ReconsiderationReqCB").item(0)
									.getTextContent();
							otherAdmissionReasonCB = eElement.getElementsByTagName("OtherAdmissionReasonCB").item(0)
									.getTextContent();
							otherAdmissionReason = eElement.getElementsByTagName("OtherAdmissionReason").item(0)
									.getTextContent();
							studentMajor = eElement.getElementsByTagName("StudentMajor").item(0).getTextContent();
							incompleteAppealReason = eElement.getElementsByTagName("IncompleteAppealReasonCB").item(0)
									.getTextContent();
							extenuatingFlag = eElement.getElementsByTagName("ExtenuationCircumstanceCB").item(0)
									.getTextContent();
							housingYesNo = eElement.getElementsByTagName("HousingYesNo").item(0)
									.getTextContent();
						}
					}

					dataMap = new LinkedHashMap<String, Object>();
					dataMap.put("CASEID", caseId);
					dataMap.put("TRANSFER_FLAG", transferFlag);
					dataMap.put("FRESHMEN_FLAG", freshmenFlag);
					dataMap.put("RETURNING_FLAG", returningFlag);
					dataMap.put("TERM", term);
					dataMap.put("APPLICANTNAME", applicantName);
					dataMap.put("CWID", CWID);
					dataMap.put("CSUSTUDENT_EMAIL", csuEmail);
					dataMap.put("PERSONALSTUDENT_EMAIL", personalEmail);
					dataMap.put("TEL_NUMBER", telNo);
					dataMap.put("APPLICANT_SIGNATURE", applicantSign);
					Object applicantSignDateObj = null;
					if (applicantSignDate != null && applicantSignDate != "") {
						Date applicantSignDateNew = Date.valueOf(applicantSignDate);
						applicantSignDateObj = applicantSignDateNew;
					}
					dataMap.put("APPLICANT_SIGN_DATE", applicantSignDateObj);
					dataMap.put("APPLICANT_COMMENTS", applicantComments);
					dataMap.put("CERTIFY_CB", certifyCB);
					dataMap.put("APPEAL_REASON1", appealReason1);
					dataMap.put("APPEAL_REASON2", appealReason2);
					dataMap.put("APPEAL_REASON3", appealReason3);
					dataMap.put("APPEAL_REASON4", appealReason4);
					dataMap.put("APPEAL_REASON5", appealReason5);
					dataMap.put("APPEAL_REASON6", appealReason6);
					dataMap.put("APPEAL_REASON7", appealReason7);
					dataMap.put("APPEAL_REASON8", appealReason8);
					dataMap.put("OTHER_REASON", otherReason);
					dataMap.put("DEPOSIT_BY_DATE", depositByDate);
					dataMap.put("STUDENT_GPA", studentGPA);
					dataMap.put("DEFICIENT_AG_COURSE", defAGCource);
					dataMap.put("UNITS_COMPLETED", unitsCompleted);
					dataMap.put("TOTAL_GPA", totalGPA);
					dataMap.put("STUDENT_GPA1", studentGPA1);
					dataMap.put("LOW_GPA_WITH_ADT_CB", lowGPAADTCB);
					dataMap.put("LOCAL_ADMISSION_GPA", localAdmGPA);
					dataMap.put("OUT_LOCAL_ADMISSION_GPA", outLocalAdmGPA);
					dataMap.put("GOLDEN_DEFICIENT_IN", goldenDefIn);
					dataMap.put("APPEALS_CB", appealsCB);
					dataMap.put("APPEALS_SIGN", appealsSign);
					Object appealsSignDateObj = null;
					if (appealsSignDate != null && appealsSignDate != "") {
						Date appealsSignDateNew = Date.valueOf(appealsSignDate);
						appealsSignDateObj = appealsSignDateNew;
					}
					dataMap.put("APPEALS_SIGN_DATE", appealsSignDateObj);
					dataMap.put("APPEAL_COMMENTS", appealComments);
					dataMap.put("APPEALS_RECOMMEND", appealsRecommend);
					dataMap.put("APPROVE_ACTION", approveAction);
					dataMap.put("DENY_ACTION", denyAction);
					dataMap.put("STUDENT_USERID", studentUserId);
					dataMap.put("APPROVE_CONDITION", approvalCondition);
					dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
					dataMap.put("RECONSIDER_ADMISSION", reconsiderationReqCB);
					dataMap.put("OTHER_ADMISSION_CB", otherAdmissionReasonCB);
					dataMap.put("OTHER_ADMISSION_REASON", otherAdmissionReason);
					dataMap.put("STUDENT_MAJOR", studentMajor);
					dataMap.put("INCOMPLETE_APPEAL", incompleteAppealReason);
					dataMap.put("EXTENUATING_CIRCUM_FLAG", extenuatingFlag);
					dataMap.put("APPEAL_STATEMENT", appealStatement);
					dataMap.put("HOUSING_CSUF", housingYesNo);
				}
				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, CWID, "CWID", workflowInstanceID, tableName);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, CWID, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}

			} catch (Exception e) {
				log.error("Exception in CSUFAppealDB=" + Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.error("IOException in CSUFAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in CSUFAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}
			

		}

	}

}
