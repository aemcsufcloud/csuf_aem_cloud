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
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Family Size Certificate DB Save",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=ParentAndStudentFamilySizeCertificateDB" })
public class FamilySizeCertificateDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(FamilySizeCertificateDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String parentTableName = "AEM_FAMILY_SIZE_STUDENT";
		String childTableName = "AEM_FAMILY_SIZE_MEMBERS";
		String formName = "";
		String cwid = "";
		
		InputStream is = null;

		LinkedHashMap<String, Object> dataMapInfo = null;
		String workflowInstanceID = workItem.getWorkflow().getId();

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
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
						cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "cwid");
						String fName = XMLUtils.getChildNodeContent(afBoundDataElement, "firstName");
						String lName = XMLUtils.getChildNodeContent(afBoundDataElement, "lastName");
						String financialAidYear = XMLUtils.getChildNodeContent(afBoundDataElement, "financialAidYear");
						String parentEmail = XMLUtils.getChildNodeContent(afBoundDataElement, "parentEmail");
						String requestType = XMLUtils.getChildNodeContent(afBoundDataElement, "formType");
						String formCode = XMLUtils.getChildNodeContent(afBoundDataElement, "formCode");
						String emailSubject = XMLUtils.getChildNodeContent(afBoundDataElement, "EmailSubject");
						if (emailSubject.contains("Parent Family Size Certificate")) {
							formName = "Parent Family Size Certificate";
						} else if (emailSubject.contains("Student Family Size Certificate")) {
							formName = "Student Family Size Certificate";
						}

						String studentSign = XMLUtils.getChildNodeContent(afBoundDataElement, "studentSignature");
						String studentSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "studentSignDate");
						String ipAddress = XMLUtils.getChildNodeContent(afBoundDataElement, "ipAddress");

						String finanicialAidChoice = XMLUtils.getChildNodeContent(afBoundDataElement, "staffDecision");
						String finanicialAidDecision = "";
						if (finanicialAidChoice.equals("1")) {
							finanicialAidDecision = "Approved";
						} else if (finanicialAidChoice.equals("2")) {
							finanicialAidDecision = "Denied";
						}
						String finanicialAidSign = XMLUtils.getChildNodeContent(afBoundDataElement, "staffSignature");
						String finanicialAidSignDate = XMLUtils.getChildNodeContent(afBoundDataElement,
								"staffSignDate");
						String finanicialAidComment = XMLUtils.getChildNodeContent(afBoundDataElement, "staffComment");

						dataMapInfo = new LinkedHashMap<String, Object>();
						dataMapInfo.put("CASEID", caseId);
						dataMapInfo.put("CWID", cwid);
						dataMapInfo.put("FNAME", fName);
						dataMapInfo.put("LNAME", lName);
						dataMapInfo.put("PARENT_EMAIL", parentEmail);
						dataMapInfo.put("FINANCIAL_AID_YEAR", financialAidYear);
						dataMapInfo.put("REQUEST_TYPE", requestType);
						dataMapInfo.put("FORM_NAME", formName);
						dataMapInfo.put("FORM_CODE", formCode);

						dataMapInfo.put("STUDENT_SIGN", studentSign);
						Object studentSignDateObj = null;
						if (studentSignDate != null && studentSignDate != "") {
							Date studentSignDateNew = Date.valueOf(studentSignDate);
							studentSignDateObj = studentSignDateNew;
						}
						dataMapInfo.put("STUDENT_SIGN_DATE", studentSignDateObj);
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

						familyMembersDetails(formName, requestType, afBoundDataElement, childTableName, caseId,
								workflowInstanceID, cwid, conn); // Method to insert the data from the Grid

						dbUtil.insertFormData(conn, dataMapInfo, parentTableName, formName);
					}
				}
			}
			/*if (conn != null) {
				DatabaseUtils dbUtil = new DatabaseUtils();
				log.error("Connection Successfull");
				String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, parentTableName);
				if (resultData != null && !resultData.equals("")) {
					dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, parentTableName);
					dbUtil.insertFormData(conn, dataMapInfo, parentTableName, formName);
				} else {
					dbUtil.insertFormData(conn, dataMapInfo, parentTableName, formName);
				}
			}*/
		} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		finally {
			if (null != is) {
				try {
					is.close();
				} catch (IOException e) {
					log.error(
							"IO Exception in FamilySizeCertificateDB " + Arrays.toString(e.getStackTrace()));
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error(
							"SQL Exception in FamilySizeCertificateDB " + Arrays.toString(e.getStackTrace()));
				}

			}
		}
	}

	public void familyMembersDetails(String formName, String requestType, Element afBoundDataElement,
			String childTableName, String caseId, String workflowInstanceID, String cwid, Connection conn) {
		log.info("Inside child member table");
		DatabaseUtils dbUtil = new DatabaseUtils();
		LinkedHashMap<String, Object> memberDataMapInfo = null;
		int cdaRowCount;
		int fafsaRowCount;

		String studentName = "";
		String studentDob = "";
		String studentRelationship = "";
		String studentCollege = "";
		String studentMoreThanSixUnitsYes = "";
		String studentMoreThanSixUnitsNo = "";
		String studentEnrolledInMoreThanSizUnits = "";

		String memberFullName = "";
		String memberDOB = "";
		String memberRelationship = "";
		String memberCollege = "";
		String memberMoreThanSixUnitsYes = "";
		String memberMoreThanSixUnitsNo = "";
		String memberEnrolledInMoreThanSizUnits = "";

		if (requestType.equals("CDA")) {
			// memberDataMapInfo = new LinkedHashMap<String, Object>();

			cdaRowCount = afBoundDataElement.getElementsByTagName("cdaRow3").getLength();

			for (int i = 0; i < cdaRowCount; i++) {
				for (int j = 0; j < afBoundDataElement.getElementsByTagName("cdaRow3").item(i).getChildNodes()
						.getLength(); j++) {
					memberDataMapInfo = new LinkedHashMap<String, Object>();

					studentName = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaStudentName");
					studentDob = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaStudentDob");
					studentRelationship = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaStudentRelationship");
					studentCollege = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaStudentCollege");
					studentMoreThanSixUnitsYes = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaStudentUnitsYes");
					studentMoreThanSixUnitsNo = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaStudentUnitsNo");

					if (studentMoreThanSixUnitsYes.equals("1")) {
						studentEnrolledInMoreThanSizUnits = "Yes";
					} else if (studentMoreThanSixUnitsNo.equals("1")) {
						studentEnrolledInMoreThanSizUnits = "No";
					}

					memberFullName = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaFullName");
					memberDOB = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaDob");
					memberRelationship = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaRelationship");
					memberCollege = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaCollege");
					memberMoreThanSixUnitsYes = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaUnitsYes");
					memberMoreThanSixUnitsNo = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaUnitsNo");

					if (memberMoreThanSixUnitsYes.equals("1")) {
						memberEnrolledInMoreThanSizUnits = "Yes";
					} else if (memberMoreThanSixUnitsNo.equals("1")) {
						memberEnrolledInMoreThanSizUnits = "No";
					}

					memberDataMapInfo.put("CASEID", caseId);
					memberDataMapInfo.put("FORM_NAME", formName);
					memberDataMapInfo.put("STUDENT_FULL_NAME", studentName);
					memberDataMapInfo.put("STUDENT_DOB", studentDob);
					memberDataMapInfo.put("STUDENT_RELATION", studentRelationship);
					memberDataMapInfo.put("STUDENT_COLLEGE", studentCollege);
					memberDataMapInfo.put("STUDENT_ENROLLED_UNITS", studentEnrolledInMoreThanSizUnits);
					memberDataMapInfo.put("MEMBER_FULL_NAME", memberFullName);
					memberDataMapInfo.put("MEMBER_DOB", memberDOB);
					memberDataMapInfo.put("MEMBER_RELATION", memberRelationship);
					memberDataMapInfo.put("MEMBER_COLLEGE", memberCollege);
					memberDataMapInfo.put("MEMBER_ENROLLED_UNITS", memberEnrolledInMoreThanSizUnits);
					memberDataMapInfo.put("STAGE_INDICATOR",
							XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator"));
					memberDataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

					log.info("memberDataMapInfo= {}", memberDataMapInfo);
				}

				dbUtil.insertFormData(conn, memberDataMapInfo, childTableName, formName);
			}

		} else if (requestType.equals("FAFSA")) {
			// memberDataMapInfo = new LinkedHashMap<String, Object>();

			fafsaRowCount = afBoundDataElement.getElementsByTagName("fafsaRow3").getLength();

			for (int i = 0; i < fafsaRowCount; i++) {
				for (int j = 0; j < afBoundDataElement.getElementsByTagName("fafsaRow3").item(i).getChildNodes()
						.getLength(); j++) {
					memberDataMapInfo = new LinkedHashMap<String, Object>();

					studentName = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaStudentName");
					studentDob = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaStudentDob");
					studentRelationship = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaStudentRelationship");
					studentCollege = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaStudentCollege");
					studentMoreThanSixUnitsYes = XMLUtils.getChildNodeContent(afBoundDataElement,
							"fafsaStudentUnitsYes");
					studentMoreThanSixUnitsNo = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaStudentUnitsNo");

					if (studentMoreThanSixUnitsYes.equals("1")) {
						studentEnrolledInMoreThanSizUnits = "Yes";
					} else if (studentMoreThanSixUnitsNo.equals("1")) {
						studentEnrolledInMoreThanSizUnits = "No";
					}

					memberFullName = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaFullName");
					memberDOB = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaDob");
					memberRelationship = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaRelationship");
					memberCollege = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaCollege");
					memberMoreThanSixUnitsYes = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaUnitsYes");
					memberMoreThanSixUnitsNo = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaUnitsNo");

					if (memberMoreThanSixUnitsYes.equals("1")) {
						memberEnrolledInMoreThanSizUnits = "Yes";
					} else if (memberMoreThanSixUnitsNo.equals("1")) {
						memberEnrolledInMoreThanSizUnits = "No";
					}

					memberDataMapInfo.put("CASEID", caseId);
					memberDataMapInfo.put("FORM_NAME", formName);
					memberDataMapInfo.put("STUDENT_FULL_NAME", studentName);
					memberDataMapInfo.put("STUDENT_DOB", studentDob);
					memberDataMapInfo.put("STUDENT_RELATION", studentRelationship);
					memberDataMapInfo.put("STUDENT_COLLEGE", studentCollege);
					memberDataMapInfo.put("STUDENT_ENROLLED_UNITS", studentEnrolledInMoreThanSizUnits);
					memberDataMapInfo.put("MEMBER_FULL_NAME", memberFullName);
					memberDataMapInfo.put("MEMBER_DOB", memberDOB);
					memberDataMapInfo.put("MEMBER_RELATION", memberRelationship);
					memberDataMapInfo.put("MEMBER_COLLEGE", memberCollege);
					memberDataMapInfo.put("MEMBER_ENROLLED_UNITS", memberEnrolledInMoreThanSizUnits);
					memberDataMapInfo.put("STAGE_INDICATOR",
							XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator"));
					memberDataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

					log.info("memberDataMapInfo= {}", memberDataMapInfo);
				}

				dbUtil.insertFormData(conn, memberDataMapInfo, childTableName, formName);
			}
		}
		/*if (conn != null) {
			DatabaseUtils dbUtil2 = new DatabaseUtils();
			log.error("Connection Successfull");
			String resultData = dbUtil2.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, childTableName);
			if (resultData != null && !resultData.equals("")) {
				dbUtil2.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, childTableName);
				dbUtil2.insertFormData(conn, memberDataMapInfo, childTableName, formName);
			} else {
				dbUtil2.insertFormData(conn, memberDataMapInfo, childTableName, formName);
			}
		}*/
	}
}
