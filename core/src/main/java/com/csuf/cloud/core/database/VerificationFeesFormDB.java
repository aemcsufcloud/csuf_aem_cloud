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
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.adobe.granite.workflow.WorkflowException;
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
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Verification Request Fees Form DB Save", "service.vendor=ThoughtFocus",
		"process.label=VerificationFeesFormDB" })
public class VerificationFeesFormDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(VerificationFeesFormDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_VERIFICATION_REQ_FEES";
		String formName = "Verification Request Fees";
		String assignee = "";
		String cwid = "";
		MetaDataMap metaDataMapVal = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		LinkedHashMap<String, Object> dataMapInfo = null;
		String workflowInstanceID = workItem.getWorkflow().getId();

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		InputStream is = null;
		try {
			is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, workItem.getContentPath(), "Data.xml");
			if (null != is) {
				Document doc = XMLUtils.getDomDocument(is);

				DatabaseUtils dbUtil = new DatabaseUtils();

				String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
				conn = jdbcConnectionService.getDBConn(dataSourceVal);

				if (conn != null) {

					Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");

					if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
						String caseId = XMLUtils.getChildNodeContent(afBoundDataElement, "caseId");
						cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "CWID_SSN");
						String email = XMLUtils.getChildNodeContent(afBoundDataElement, "Email");
						String fName = XMLUtils.getChildNodeContent(afBoundDataElement, "FirstName");
						String lName = XMLUtils.getChildNodeContent(afBoundDataElement, "LastName");
						String mName = XMLUtils.getChildNodeContent(afBoundDataElement, "MiddleName");
						String streetAddress = XMLUtils.getChildNodeContent(afBoundDataElement, "StreetAddress");
						String aptUnit = XMLUtils.getChildNodeContent(afBoundDataElement, "AptUnit");
						String city = XMLUtils.getChildNodeContent(afBoundDataElement, "City");
						String state = XMLUtils.getChildNodeContent(afBoundDataElement, "State");
						String zipCode = XMLUtils.getChildNodeContent(afBoundDataElement, "ZipCode");
						String mailtoRB = XMLUtils.getChildNodeContent(afBoundDataElement, "MailtoRB");
						String mailto = "";
						if (mailtoRB.equals("1")) {
							mailto = "Mail to Address Listed Below";
						} else if (mailtoRB.equals("2")) {
							mailto = "Pick Up";
						} else if (mailtoRB.equals("3")) {
							mailto = "Email";
						}
						String regRB = XMLUtils.getChildNodeContent(afBoundDataElement, "RegRB");
						// String recRB = XMLUtils.getChildNodeContent(afBoundDataElement, "RecRB");
						String dob = XMLUtils.getChildNodeContent(afBoundDataElement, "DOB");

						String emailTF = XMLUtils.getChildNodeContent(afBoundDataElement, "EmailTF");
						String companyName = XMLUtils.getChildNodeContent(afBoundDataElement, "CompanyName");
						String streetAddressT = XMLUtils.getChildNodeContent(afBoundDataElement, "StreetAddressT");
						String apt = XMLUtils.getChildNodeContent(afBoundDataElement, "Apt");
						String cityT = XMLUtils.getChildNodeContent(afBoundDataElement, "CityT");
						String stateT = XMLUtils.getChildNodeContent(afBoundDataElement, "StateT");
						String zipCodeT = XMLUtils.getChildNodeContent(afBoundDataElement, "ZipCodeT");
						String s2506CB1 = XMLUtils.getChildNodeContent(afBoundDataElement, "S2506CB1");
						String preRegTFO = XMLUtils.getChildNodeContent(afBoundDataElement, "PreRegTFO");

						String preRegTFT = XMLUtils.getChildNodeContent(afBoundDataElement, "PreRegTFT");
						String s2506CB2 = XMLUtils.getChildNodeContent(afBoundDataElement, "S2506CB2");
						String enrollmemtTFO = XMLUtils.getChildNodeContent(afBoundDataElement, "EnrollmemtTFO");
						String enrollmentTFT = XMLUtils.getChildNodeContent(afBoundDataElement, "EnrollmentTFT");
						String s2504CB1 = XMLUtils.getChildNodeContent(afBoundDataElement, "S2504CB1");
						String degreeVerTFO = XMLUtils.getChildNodeContent(afBoundDataElement, "DegreeVerTFO");
						String degreeVerTFT = XMLUtils.getChildNodeContent(afBoundDataElement, "DegreeVerTFT");
						String s2506CB3 = XMLUtils.getChildNodeContent(afBoundDataElement, "S2506CB3");
						String goodStudentTFO = XMLUtils.getChildNodeContent(afBoundDataElement, "GoodStudentTFO");

						String goodStudentTFT = XMLUtils.getChildNodeContent(afBoundDataElement, "GoodStudentTFT");
						String designatedCB = XMLUtils.getChildNodeContent(afBoundDataElement, "DesignatedCB");
						String specifyTerm = XMLUtils.getChildNodeContent(afBoundDataElement, "SpecifyTerm");
						String designatedTFO = XMLUtils.getChildNodeContent(afBoundDataElement, "DesignatedTFO");
						String designatedTFT = XMLUtils.getChildNodeContent(afBoundDataElement, "DesignatedTFT");
						String totalHistoryCB = XMLUtils.getChildNodeContent(afBoundDataElement, "TotalHistoryCB");
						String totalHisTFO = XMLUtils.getChildNodeContent(afBoundDataElement, "TotalHisTFO");
						String totalHisTFT = XMLUtils.getChildNodeContent(afBoundDataElement, "TotalHisTFT");

						String vOECB = XMLUtils.getChildNodeContent(afBoundDataElement, "VOECB");
						String vOETFO = XMLUtils.getChildNodeContent(afBoundDataElement, "VOETFO");
						String vOETFT = XMLUtils.getChildNodeContent(afBoundDataElement, "VOETFT");
						String militoryIDCB = XMLUtils.getChildNodeContent(afBoundDataElement, "MilitoryIDCB");
						String militoryIDTFO = XMLUtils.getChildNodeContent(afBoundDataElement, "MilitoryIDTFO");
						String militoryIDTFT = XMLUtils.getChildNodeContent(afBoundDataElement, "MilitoryIDTFT");

						String militoryID = XMLUtils.getChildNodeContent(afBoundDataElement, "MilitoryID");
						String neverCB = XMLUtils.getChildNodeContent(afBoundDataElement, "NeverCB");
						String neverTFO = XMLUtils.getChildNodeContent(afBoundDataElement, "NeverTFO");
						String neverTFT = XMLUtils.getChildNodeContent(afBoundDataElement, "NeverTFT");
						String otherCB = XMLUtils.getChildNodeContent(afBoundDataElement, "OtherCB");
						String otherTF = XMLUtils.getChildNodeContent(afBoundDataElement, "OtherTF");
						String otherTFT = XMLUtils.getChildNodeContent(afBoundDataElement, "OtherTFT");
						String totalAmount = XMLUtils.getChildNodeContent(afBoundDataElement, "TotalAmount");

						String vNTCB = XMLUtils.getChildNodeContent(afBoundDataElement, "VNTCB");
						String vNTTFO = XMLUtils.getChildNodeContent(afBoundDataElement, "VNTTFO");
						String vNTTFT = XMLUtils.getChildNodeContent(afBoundDataElement, "VNTTFT");
						String earlyDegCB = XMLUtils.getChildNodeContent(afBoundDataElement, "EarlyDegCB");
						String earlyDegTFO = XMLUtils.getChildNodeContent(afBoundDataElement, "EarlyDegTFO");
						String earlyDegTFT = XMLUtils.getChildNodeContent(afBoundDataElement, "EarlyDegTFT");
						String scheduleCB = XMLUtils.getChildNodeContent(afBoundDataElement, "ScheduleCB");
						String scheduleTFO = XMLUtils.getChildNodeContent(afBoundDataElement, "ScheduleTFO");
						String scheduleTFT = XMLUtils.getChildNodeContent(afBoundDataElement, "ScheduleTFT");
						String loanCB = XMLUtils.getChildNodeContent(afBoundDataElement, "LoanCB");
						String loanTFO = XMLUtils.getChildNodeContent(afBoundDataElement, "LoanTFO");

						String initiatorComments = XMLUtils.getChildNodeContent(afBoundDataElement, "StudentComments");
						String initiatorName = XMLUtils.getChildNodeContent(afBoundDataElement, "StudentFullName");
						String initiatorSign = XMLUtils.getChildNodeContent(afBoundDataElement, "StudentSignX");
						String initiatorUserID = XMLUtils.getChildNodeContent(afBoundDataElement, "StudentUserId");
						// String initiatorEmail = XMLUtils.getChildNodeContent(afBoundDataElement,
						// "StudentEmailId");
						String initiatorDate = XMLUtils.getChildNodeContent(afBoundDataElement, "StudentSignatureDate");

						String verificationComments = XMLUtils.getChildNodeContent(afBoundDataElement,
								"VerificationComments");
						String verficationName = XMLUtils.getChildNodeContent(afBoundDataElement, "VerficationName");

						String verificationSignatureDate = XMLUtils.getChildNodeContent(afBoundDataElement,
								"VerificationSignatureDate");
						String verficationDecision = XMLUtils.getChildNodeContent(afBoundDataElement,
								"VerficationDecision");
						String verifiDecision = "";
						if (verficationDecision.equals("1")) {
							verifiDecision = "Approved";
						} else if (verficationDecision.equals("2")) {
							verifiDecision = "Denied";
						}
						String deliveredRB = XMLUtils.getChildNodeContent(afBoundDataElement, "DeliveredRB");
						String deliverRB = "";
						if (deliveredRB.equals("1")) {
							deliverRB = "Mail";
						} else if (deliveredRB.equals("2")) {
							deliverRB = "Email";
						} else if (deliveredRB.equals("3")) {
							deliverRB = "In-Person";
						}
						String attachmentYesNo = XMLUtils.getChildNodeContent(afBoundDataElement, "AttachmentYesNo");
						String attachmentYN = "";
						if (attachmentYesNo.equals("1")) {
							attachmentYN = "YES";
						} else if (attachmentYesNo.equals("2")) {
							attachmentYN = "NO";
						}

						dataMapInfo = new LinkedHashMap<String, Object>();
						dataMapInfo.put("CASEID", caseId);
						dataMapInfo.put("CWID", cwid);
						dataMapInfo.put("FNAME", fName);
						dataMapInfo.put("LNAME", lName);
						dataMapInfo.put("MNAME", mName);
						dataMapInfo.put("EMAIL", email);

						dataMapInfo.put("STREET_ADDRESS", streetAddress);
						dataMapInfo.put("APT_UNIT", aptUnit);
						dataMapInfo.put("CITY", city);
						dataMapInfo.put("STATE", state);
						dataMapInfo.put("ZIP_CODE", zipCode);
						dataMapInfo.put("MAIL_TO_RB", mailto);
						dataMapInfo.put("REGISTRATION_RB", regRB);
						dataMapInfo.put("ATTACHMENT_YN", attachmentYN);
						dataMapInfo.put("EMAIL_TF", emailTF);
						dataMapInfo.put("COMPANY_NAME", companyName);
						dataMapInfo.put("STREET_ADDRESS_T", streetAddressT);
						dataMapInfo.put("APT", apt);
						dataMapInfo.put("CITY_T", cityT);
						dataMapInfo.put("STATE_T", stateT);
						dataMapInfo.put("ZIP_CODE_T", zipCodeT);
						dataMapInfo.put("S2506_CB1", s2506CB1);
						dataMapInfo.put("PRE_REG_TFO", preRegTFO);
						dataMapInfo.put("PRE_REG_TFT", preRegTFT);
						dataMapInfo.put("S2506_CB2", s2506CB2);
						dataMapInfo.put("ENROLLMENT_TFO", enrollmemtTFO);
						dataMapInfo.put("ENROLLMENT_TFT", enrollmentTFT);
						dataMapInfo.put("S2504_CB1", s2504CB1);
						dataMapInfo.put("DEGREE_VER_TFO", degreeVerTFO);
						dataMapInfo.put("DEGREE_VER_TFT", degreeVerTFT);
						dataMapInfo.put("S2506_CB3", s2506CB3);

						dataMapInfo.put("GOOD_STUDENT_TFO", goodStudentTFO);
						dataMapInfo.put("GOOD_STUDENT_TFT", goodStudentTFT);
						// dataMapInfo.put("S2506_CB4", s2506CB4);
						dataMapInfo.put("DESIGNATED_CB", designatedCB);
						dataMapInfo.put("SPECIFY_TERM", specifyTerm);
						dataMapInfo.put("DESIGNATED_TFO", designatedTFO);
						dataMapInfo.put("DESIGNATED_TFT", designatedTFT);
						dataMapInfo.put("TOTAL_HISTORY_CB", totalHistoryCB);
						dataMapInfo.put("TOTAL_HIS_TFO", totalHisTFO);
						dataMapInfo.put("TOTAL_HIS_TFT", totalHisTFT);
						dataMapInfo.put("VOE_CB", vOECB);
						dataMapInfo.put("VOE_TFO", vOETFO);
						dataMapInfo.put("VOE_TFT", vOETFT);
						dataMapInfo.put("MILITORY_ID_CB", militoryIDCB);
						dataMapInfo.put("MILITORY_ID_TFO", militoryIDTFO);
						dataMapInfo.put("MILITORY_ID_TFT", militoryIDTFT);
						dataMapInfo.put("MILITORY_ID", militoryID);
						dataMapInfo.put("NEVER_CB", neverCB);
						dataMapInfo.put("NEVER_TFO", neverTFO);
						dataMapInfo.put("NEVER_TFT", neverTFT);
						dataMapInfo.put("OTHER_CB", otherCB);

						dataMapInfo.put("OTHER_TFO", otherTF);
						dataMapInfo.put("OTHER_TFT", otherTFT);
						dataMapInfo.put("TOTAL_AMOUNT", totalAmount);

						dataMapInfo.put("VNT_CB", vNTCB);
						dataMapInfo.put("VNT_TFO", vNTTFO);
						dataMapInfo.put("VNT_TFT", vNTTFT);
						dataMapInfo.put("EARLY_DEG_CB", earlyDegCB);
						dataMapInfo.put("EARLY_DEG_TFO", earlyDegTFO);
						dataMapInfo.put("EARLY_DEG_TFT", earlyDegTFT);
						dataMapInfo.put("SCHEDULE_CB", scheduleCB);
						dataMapInfo.put("SCHEDULE_TFO", scheduleTFO);
						dataMapInfo.put("SCHEDULE_TFT", scheduleTFT);
						dataMapInfo.put("LOAN_CB", loanCB);
						dataMapInfo.put("LOAN_TFO", loanTFO);

						Object dobDateObj = null;
						if (dob != null && dob != "") {
							Date todaysDateNew = Date.valueOf(dob);
							dobDateObj = todaysDateNew;
						}
						dataMapInfo.put("DOB", dobDateObj);

						dataMapInfo.put("INTIATOR_COMMENTS", initiatorComments);
						dataMapInfo.put("INITIATOR_NAME", initiatorName);
						dataMapInfo.put("INITIATOR_SIGN", initiatorSign);
						dataMapInfo.put("INTIATOR_USERID", initiatorUserID);
						dataMapInfo.put("DELIVERED_RB", deliverRB);
						Object initaitedDateObj = null;
						if (initiatorDate != null && initiatorDate != "") {
							Date initiatedDateNew = Date.valueOf(initiatorDate);
							initaitedDateObj = initiatedDateNew;
						}
						dataMapInfo.put("INTIATOR_SIGN_DATE", initaitedDateObj);

						dataMapInfo.put("VERIFICATION_R_NAME", verficationName);
						dataMapInfo.put("VERIFICATION_DECISION", verifiDecision);
						dataMapInfo.put("VERIFICATION_COMMENTS", verificationComments);
						Object verificationDateObj = null;
						if (verificationSignatureDate != null && verificationSignatureDate != "") {
							Date verificationDateNew = Date.valueOf(verificationSignatureDate);
							verificationDateObj = verificationDateNew;
						}
						dataMapInfo.put("VERIFICATION_SIGN_DATE", verificationDateObj);

						dataMapInfo.put("STAGE_INDICATOR",
								XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator"));

						List<Route> backRoutesList = workflowSession.getBackRoutes(workItem, false);
						JsonArray backRoutesJson = new JsonArray();
						for (Route backRoute : backRoutesList) {
							backRoutesJson.add(backRoute.getName());
						}
						String saveHistoryBackRoute = "";
						if (backRoutesJson.size() == 1) {
							saveHistoryBackRoute = backRoutesList.get(0).getName();
							log.debug("Executing if block ");
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
							log.debug("Executing else block assignee : {}", assignee);
						}
						dataMapInfo.put("LAST_STEP", saveHistoryBackRoute);
						if (dataMapInfo.get("LAST_STEP").equals("Verification Review")) {
							dataMapInfo.put("WORKFLOW_STATUS", "COMPLETED");
						} else {
							dataMapInfo.put("WORKFLOW_STATUS", "RUNNING");
						}
						dataMapInfo.put("LAST_STEP_ASSIGNEE", assignee);

						dataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
						log.info("dataMapInfo= {}", dataMapInfo);
					}
				}
			}
			/*if (conn != null) {
				DatabaseUtils dbUtil = new DatabaseUtils();
				log.error("Connection Successfull");
				String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
				if (resultData != null && !resultData.equals("")) {
					dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
					dbUtil.insertFormData(conn, dataMapInfo, tableName, formName);
				} else {
					dbUtil.insertFormData(conn, dataMapInfo, tableName, formName);
				}
			}*/
		} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			log.error(Arrays.toString(e.getStackTrace()));
		} finally {
			if (null != is) {
				try {
					is.close();
				} catch (IOException e) {
					log.error("IO Exception in VehicleReleaseFormDB " + Arrays.toString(e.getStackTrace()));
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error("SQL Exception in VehicleReleaseFormDB " + Arrays.toString(e.getStackTrace()));
				}

			}
		}
	}

}