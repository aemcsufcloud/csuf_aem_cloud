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
import com.adobe.granite.workflow.exec.Route;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.google.gson.JsonArray;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Citizenship Verification DB Save",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=ImmigrationCitizenshipVerificationDB" })
public class ImmigrationCitizenshipVerificationDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(ImmigrationCitizenshipVerificationDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_IMMIGRATION_VERIFICATION";
		String formName = "Immigration/Citizenship Verification";
		String usCitizenOption = "";
		String usParmanentResidentOption = "";
		String otherEligibleNonCitizenOption = "";
		String nonEligibleNonCitizenOption = "";
		String otherUSPermFiles = "";
		String otherNonCitizenFiles = "";
		String otherNonEligibleNonCitizienFiles = "";
		String cwid = "";
		String assignee = "";
		LinkedHashMap<String, Object> dataMapInfo = null;
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		InputStream is = null;
		try {
			is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, workItem.getContentPath(), "Data.xml");
			String workflowInstanceID = workItem.getWorkflow().getId();
			if (null != is) {
				Document doc = XMLUtils.getDomDocument(is);
				/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();				conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
				Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");

				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					String caseId = XMLUtils.getChildNodeContent(afBoundDataElement, "caseId");
					cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "cwid");
					String fName = XMLUtils.getChildNodeContent(afBoundDataElement, "firstName");
					String lName = XMLUtils.getChildNodeContent(afBoundDataElement, "lastName");
					String financialAidYear = XMLUtils.getChildNodeContent(afBoundDataElement, "financialAidYear");
					String formCode = XMLUtils.getChildNodeContent(afBoundDataElement, "formCode");

					String birthCertificate = XMLUtils.getChildNodeContent(afBoundDataElement, "BirthCertificate");
					String usPassport = XMLUtils.getChildNodeContent(afBoundDataElement, "USPassport");
					String naturalizationCertification = XMLUtils.getChildNodeContent(afBoundDataElement,
							"NaturalizationCertification");
					String certificationOfCitizenship = XMLUtils.getChildNodeContent(afBoundDataElement,
							"certificationOfCitizenship");
					if (birthCertificate.equals("1")) {
						usCitizenOption = "Birth Certificate";
					} else if (usPassport.equals("1")) {
						usCitizenOption = "US Passport";
					} else if (naturalizationCertification.equals("1")) {
						usCitizenOption = "Naturalization Certification";
					} else if (certificationOfCitizenship.equals("1")) {
						usCitizenOption = "certificationOfCitizenship";
					}

					String alienRegistrationCard = XMLUtils.getChildNodeContent(afBoundDataElement,
							"AlienRegistrationCard");
					String passportstamped = XMLUtils.getChildNodeContent(afBoundDataElement, "Passportstamped");
					String departureRecord = XMLUtils.getChildNodeContent(afBoundDataElement, "DepartureRecord");
					String otherUSPerm = XMLUtils.getChildNodeContent(afBoundDataElement, "OtherUSPerm");
					if (alienRegistrationCard.equals("1")) {
						usParmanentResidentOption = "Alien Registration Card I-55I";
						otherUSPermFiles = "N/A";
					} else if (passportstamped.equals("1")) {
						usParmanentResidentOption = "Passport stamped Processed for I-55I";
						otherUSPermFiles = "N/A";
					} else if (departureRecord.equals("1")) {
						usParmanentResidentOption = "Departure Record (Form I-94) stamped Processed for I-55I or Temporary Form I-55I";
						otherUSPermFiles = "N/A";
					} else if (otherUSPerm.equals("1")) {
						usParmanentResidentOption = "Others";
						otherUSPermFiles = XMLUtils.getChildNodeContent(afBoundDataElement, "USPermTextBox");
					}

					String refugee = XMLUtils.getChildNodeContent(afBoundDataElement, "Refugee");
					String asylumGranted = XMLUtils.getChildNodeContent(afBoundDataElement, "AsylumGranted");
					String indefiniteParole = XMLUtils.getChildNodeContent(afBoundDataElement, "IndefiniteParole");
					String cubanHaitianEntrant = XMLUtils.getChildNodeContent(afBoundDataElement,
							"CubanHaitianEntrant");
					String currentFormI688 = XMLUtils.getChildNodeContent(afBoundDataElement, "CurrentFormI688");
					String otherNonCitizen = XMLUtils.getChildNodeContent(afBoundDataElement, "OtherNonCitizen");
					if (refugee.equals("1")) {
						otherEligibleNonCitizenOption = "Refugee";
						otherNonCitizenFiles = "N/A";
					} else if (asylumGranted.equals("1")) {
						otherEligibleNonCitizenOption = "Asylum Granted";
						otherNonCitizenFiles = "N/A";
					} else if (indefiniteParole.equals("1")) {
						otherEligibleNonCitizenOption = "Indefinite Parole and/or Humanitarian Parole";
						otherNonCitizenFiles = "N/A";
					} else if (cubanHaitianEntrant.equals("1")) {
						otherEligibleNonCitizenOption = "Cuban-Haitian Entrant, Status Pending";
						otherNonCitizenFiles = "N/A";
					} else if (currentFormI688.equals("1")) {
						otherEligibleNonCitizenOption = "Current Form I-688 Temporary Resident Card";
						otherNonCitizenFiles = "N/A";
					} else if (otherNonCitizen.equals("1")) {
						otherEligibleNonCitizenOption = "Others";
						otherNonCitizenFiles = XMLUtils.getChildNodeContent(afBoundDataElement,
								"EligibleNonCitizenTextBox");
					}

					String employmentAuth = XMLUtils.getChildNodeContent(afBoundDataElement, "EmploymentAuth");
					String applSubmitted = XMLUtils.getChildNodeContent(afBoundDataElement, "ApplSubmitted");
					String f1F2SeriesVisa = XMLUtils.getChildNodeContent(afBoundDataElement, "F1F2SeriesVisa");
					String otherNonEligibleNonCitizien = XMLUtils.getChildNodeContent(afBoundDataElement,
							"OtherNonEligibleNonCitizien");
					if (employmentAuth.equals("1")) {
						nonEligibleNonCitizenOption = "I-688A, I-688B, or 766 Employment Authorization card";
						otherNonEligibleNonCitizienFiles = "N/A";
					} else if (applSubmitted.equals("1")) {
						nonEligibleNonCitizenOption = "Application submitted for permanent resident status and not in category listed above";
						otherNonEligibleNonCitizienFiles = "N/A";
					} else if (f1F2SeriesVisa.equals("1")) {
						nonEligibleNonCitizenOption = "F1, F2, J1, J2 or G series visa";
						otherNonEligibleNonCitizienFiles = "N/A";
					} else if (otherNonEligibleNonCitizien.equals("1")) {
						nonEligibleNonCitizenOption = "Others";
						otherNonEligibleNonCitizienFiles = XMLUtils.getChildNodeContent(afBoundDataElement,
								"NonEligibleNonCitizenTextBox");
					}

					String studentSign = XMLUtils.getChildNodeContent(afBoundDataElement, "studentSignature");
					String studentSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "studentSignDate");
					String studentComment = XMLUtils.getChildNodeContent(afBoundDataElement, "studentComment");
					String ipAddress = XMLUtils.getChildNodeContent(afBoundDataElement, "ipAddress");

					String finanicialAidChoice = XMLUtils.getChildNodeContent(afBoundDataElement, "staffDecision");
					String finanicialAidDecision = "";
					if (finanicialAidChoice.equals("1")) {
						finanicialAidDecision = "Approved";
					} else if (finanicialAidChoice.equals("2")) {
						finanicialAidDecision = "Denied";
					}
					String finanicialAidSign = XMLUtils.getChildNodeContent(afBoundDataElement, "staffSignature");
					String finanicialAidSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "staffSignDate");
					String finanicialAidComment = XMLUtils.getChildNodeContent(afBoundDataElement,
							"staffComment");

					dataMapInfo = new LinkedHashMap<String, Object>();
					dataMapInfo.put("CASEID", caseId);
					dataMapInfo.put("CWID", cwid);
					dataMapInfo.put("FNAME", fName);
					dataMapInfo.put("LNAME", lName);
					dataMapInfo.put("FINANCIAL_AID_YEAR", financialAidYear);
					dataMapInfo.put("FORM_CODE", formCode);
					dataMapInfo.put("US_CITIZEN", usCitizenOption);
					dataMapInfo.put("US_PERM_RESIDENT", usParmanentResidentOption);
					dataMapInfo.put("US_PERM_RESIDENT_FILES", otherUSPermFiles);
					dataMapInfo.put("ELIGIBLE_NON_CTZN", otherEligibleNonCitizenOption);
					dataMapInfo.put("ELIGIBLE_NON_CTZN_FILES", otherNonCitizenFiles);
					dataMapInfo.put("NON_ELIGIBLE_NON_CTZN", nonEligibleNonCitizenOption);
					dataMapInfo.put("NON_ELIGIBLE_NON_CTZN_FILES", otherNonEligibleNonCitizienFiles);

					dataMapInfo.put("STUDENT_SIGN", studentSign);
					Object studentSignDateObj = null;
					if (studentSignDate != null && studentSignDate != "") {
						Date studentSignDateNew = Date.valueOf(studentSignDate);
						studentSignDateObj = studentSignDateNew;
					}
					dataMapInfo.put("STUDENT_SIGN_DATE", studentSignDateObj);
					dataMapInfo.put("STUDENT_COMMENT", studentComment);
					dataMapInfo.put("IP_ADDRESS", ipAddress);

					dataMapInfo.put("FIN_AID_SIGN", finanicialAidSign);

					Object finanicialAidSignDateObj = null;
					if (finanicialAidSignDate != null && finanicialAidSignDate != "") {
						Date finanicialAidSignDateNew = Date.valueOf(finanicialAidSignDate);
						finanicialAidSignDateObj = finanicialAidSignDateNew;
					}
					dataMapInfo.put("FIN_AID_SIGN_DATE", finanicialAidSignDateObj);
					dataMapInfo.put("FIN_AID_DECISION", finanicialAidDecision);
					dataMapInfo.put("FIN_AID_COMMENT", finanicialAidComment);

					dataMapInfo.put("STAGE_INDICATOR",
							XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator"));
					dataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
					log.info("dataMapInfo= {}", dataMapInfo);
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
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "CWID",
							workflowInstanceID, dataMapInfo,
							"STUDENT_SIGN_DATE,FIN_AID_SIGN_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}

		} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			log.error(Arrays.toString(e.getStackTrace()));
		} finally {

			if (null != is) {
				try {
					is.close();
				} catch (IOException e) {
					log.error("IO Exception in ImmigrationCitizenshipVerificationDB " + Arrays.toString(e.getStackTrace()));
				}
			}
			/*if (conn != null) { try { conn.close(); } catch (SQLException e) { } }*/
		}
	}
}
