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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Parent Family Certificate DB Save",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=ParentFamilySizeCertificateDB" })
public class ParentFamilySizeCertificateDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(ParentFamilySizeCertificateDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;
	
	String name="";
	String dob="";
	String relationship="";
	String college="";
	String unitsYes="";
	String unitsNo="";
	String units="";

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String parentTableName = "AEM_FAMILY_SIZE_PARENT";
		String childTableName = "AEM_PARENT_FAMILY_MEMBERS";
		String formName = "";
		String cwid = "";

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

						familyMembersDetails(formName, requestType, finanicialAidSign, afBoundDataElement, childTableName, caseId,
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
							"IO Exception in ParentFamilySizeCertificateDB " + Arrays.toString(e.getStackTrace()));
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error(
							"SQL Exception in ParentFamilySizeCertificateDB " + Arrays.toString(e.getStackTrace()));
				}

			}
		}
	}

	public void familyMembersDetails(String formName, String requestType, String financialAidSign, Element afBoundDataElement,
			String childTableName, String caseId, String workflowInstanceID, String cwid, Connection conn) {
		log.info("Inside child member table");
		DatabaseUtils dbUtil = new DatabaseUtils();
		LinkedHashMap<String, Object> memberDataMapInfo = null;
		LinkedHashMap<String, Object> studentDataMapInfo = null;

		String studentName = "";
		String studentDob = "";
		String studentRelationship = "";
		String studentCollege = "";
		String studentMoreThanSixUnitsYes = "";
		String studentMoreThanSixUnitsNo = "";
		String studentEnrolledInMoreThanSizUnits = "";

		if ((requestType.equals("CDA")) && (financialAidSign.isEmpty())) {
			// memberDataMapInfo = new LinkedHashMap<String, Object>();
			log.info("Inside Child Table Logic");
			
			
			for (int j = 0; j < afBoundDataElement.getElementsByTagName("cdaRow3").getLength(); j++) {

				for (int k = 0; k < afBoundDataElement.getElementsByTagName("cdaRow3").item(j).getChildNodes()
						.getLength(); k++) {
					String nodeName = afBoundDataElement.getElementsByTagName("cdaRow3").item(j).getChildNodes()
							.item(k).getNodeName();

					String nodeValue = afBoundDataElement.getElementsByTagName("cdaRow3").item(j).getChildNodes()
							.item(k).getTextContent();

					if (nodeName.contains("cdaFullName")) {
						name = nodeValue;
					}
					if (nodeName.contains("cdaDob")) {
						dob = nodeValue;
					}
					if (nodeName.contains("cdaRelationship")) {
						relationship = nodeValue;
					}
					if (nodeName.contains("cdaCollege")) {
						college = nodeValue;
					}
					if (nodeName.contains("cdaUnitsYes")) {
						unitsYes = nodeValue;
					}
					if (nodeName.contains("cdaUnitsNo")) {
						unitsNo = nodeValue;
					}
				}
				memberDataMapInfo = new LinkedHashMap<String, Object>();

				memberDataMapInfo.put("CASEID", caseId);
				memberDataMapInfo.put("CWID", cwid);
				memberDataMapInfo.put("FORM_NAME", formName);
				memberDataMapInfo.put("FULL_NAME", name);
				memberDataMapInfo.put("DOB", dob);
				memberDataMapInfo.put("RELATION", relationship);
				memberDataMapInfo.put("COLLEGE", college);
				if (unitsYes.equals("1")) {
					units = "Yes";
				} else if (unitsNo.equals("1")) {
					units = "No";
				}
				memberDataMapInfo.put("ENROLLED_UNITS", units);
				memberDataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
				
				dbUtil.insertFormData(conn, memberDataMapInfo, childTableName, formName);

			}
			
			studentName = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaStudentName");
			studentDob = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaStudentDob");
			studentRelationship = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaStudentRelationship");
			studentCollege = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaStudentCollege");
			studentMoreThanSixUnitsYes = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaStudentUnitsYes");
			log.info("CDA STUDENT UNITS YES - "+studentMoreThanSixUnitsYes);
			studentMoreThanSixUnitsNo = XMLUtils.getChildNodeContent(afBoundDataElement, "cdaStudentUnitsNo");
			log.info("CDA STUDENT UNITS NO - "+studentMoreThanSixUnitsNo);
			if (studentMoreThanSixUnitsYes.equals("1")) {
				studentEnrolledInMoreThanSizUnits = "Yes";
			} else if (studentMoreThanSixUnitsNo.equals("1")) {
				studentEnrolledInMoreThanSizUnits = "No";
			}
			
			log.info("CDA UNITS STATUS - "+studentEnrolledInMoreThanSizUnits);
			
			studentDataMapInfo = new LinkedHashMap<String, Object>();
			
			studentDataMapInfo.put("CASEID", caseId);
			studentDataMapInfo.put("CWID", cwid);
			studentDataMapInfo.put("FORM_NAME", formName);
			studentDataMapInfo.put("FULL_NAME", studentName);
			studentDataMapInfo.put("DOB", studentDob);
			studentDataMapInfo.put("RELATION", studentRelationship);
			studentDataMapInfo.put("COLLEGE", studentCollege);
			studentDataMapInfo.put("ENROLLED_UNITS", studentEnrolledInMoreThanSizUnits);
			studentDataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
			
			dbUtil.insertFormData(conn, studentDataMapInfo, childTableName, formName);	

		} else if ((requestType.equals("FAFSA")) && (financialAidSign.isEmpty())) {
			// memberDataMapInfo = new LinkedHashMap<String, Object>();
			log.info("Inside Child Table Logic");
			
			for (int j = 0; j < afBoundDataElement.getElementsByTagName("fafsaRow3").getLength(); j++) {

				for (int k = 0; k < afBoundDataElement.getElementsByTagName("fafsaRow3").item(j).getChildNodes()
						.getLength(); k++) {
					String nodeName = afBoundDataElement.getElementsByTagName("fafsaRow3").item(j).getChildNodes()
							.item(k).getNodeName();

					String nodeValue = afBoundDataElement.getElementsByTagName("fafsaRow3").item(j).getChildNodes()
							.item(k).getTextContent();

					if (nodeName.contains("fafsaFullName")) {
						name = nodeValue;
					}
					if (nodeName.contains("fafsaDob")) {
						dob = nodeValue;
					}
					if (nodeName.contains("fafsaRelationship")) {
						relationship = nodeValue;
					}
					if (nodeName.contains("fafsaCollege")) {
						college = nodeValue;
					}
					if (nodeName.contains("fafsaUnitsYes")) {
						unitsYes = nodeValue;
					}
					if (nodeName.contains("fafsaUnitsNo")) {
						unitsNo = nodeValue;
					}
				}
				memberDataMapInfo = new LinkedHashMap<String, Object>();

				memberDataMapInfo.put("CASEID", caseId);
				memberDataMapInfo.put("CWID", cwid);
				memberDataMapInfo.put("FORM_NAME", formName);
				memberDataMapInfo.put("FULL_NAME", name);
				memberDataMapInfo.put("DOB", dob);
				memberDataMapInfo.put("RELATION", relationship);
				memberDataMapInfo.put("COLLEGE", college);
				if (unitsYes.equals("1")) {
					units = "Yes";
				} else if (unitsNo.equals("1")) {
					units = "No";
				}
				memberDataMapInfo.put("ENROLLED_UNITS", units);
				memberDataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
				
				dbUtil.insertFormData(conn, memberDataMapInfo, childTableName, formName);

			}
			
			studentName = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaStudentName");
			studentDob = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaStudentDob");
			studentRelationship = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaStudentRelationship");
			studentCollege = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaStudentCollege");
			studentMoreThanSixUnitsYes = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaStudentUnitsYes");
			log.info("FAFSA STUDENT UNITS YES - "+studentMoreThanSixUnitsYes);
			studentMoreThanSixUnitsNo = XMLUtils.getChildNodeContent(afBoundDataElement, "fafsaStudentUnitsNo");
			log.info("FAFSA STUDENT UNITS NO - "+studentMoreThanSixUnitsNo);
			if (studentMoreThanSixUnitsYes.equals("1")) {
				studentEnrolledInMoreThanSizUnits = "Yes";
			} else if (studentMoreThanSixUnitsNo.equals("1")) {
				studentEnrolledInMoreThanSizUnits = "No";
			}
			log.info("FAFSA STUDENT UNITS - "+studentEnrolledInMoreThanSizUnits);
			
			
			studentDataMapInfo = new LinkedHashMap<String, Object>();
		    studentDataMapInfo.put("CASEID", caseId);
			studentDataMapInfo.put("CWID", cwid);
			studentDataMapInfo.put("FORM_NAME", formName);
			studentDataMapInfo.put("FULL_NAME", studentName);
			studentDataMapInfo.put("DOB", studentDob);
			studentDataMapInfo.put("RELATION", studentRelationship);
			studentDataMapInfo.put("COLLEGE", studentCollege);
			studentDataMapInfo.put("ENROLLED_UNITS", studentEnrolledInMoreThanSizUnits);
			studentDataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
			
			dbUtil.insertFormData(conn, studentDataMapInfo, childTableName, formName);		

		}
	}
}
