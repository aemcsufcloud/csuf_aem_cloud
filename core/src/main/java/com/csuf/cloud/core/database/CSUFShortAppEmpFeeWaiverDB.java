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
import com.csuf.cloud.core.utils.CloudDbSaveUtil;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Short Emp Fee Waiver DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=CSUFShortAppEmpFeeWaiverDB" })
public class CSUFShortAppEmpFeeWaiverDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFShortAppEmpFeeWaiverDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_SHORT_EMP_FEE_WAIVER_FORM";
		String formName = "Short Application Employee Fee Waiver";

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;

		String firstName = "";
		String lastName = "";
		String semester = "";
		String year = "";
		String program = "";
		String attendedCSUFBefore = "";
		String csufStatus = "";
		String emplID = "";
		String chrsID = "";
		String middleName = "";
		String birthDate = "";
		String gender = "";
		String ssnNo = "";
		String stNumber = "";
		String apt = "";
		String state = "";
		String city = "";
		String zipPostalCode = "";
		String phone = "";
		String email = "";
		String countryPR = "";
		String degreeReceived = "";
		String signature = "";
		String classLevel = "";
		String signedDate = "";
		String facultyStaffVerify = "";
		String userId = "";
		String empComments = "";
		String empCB = "";
		String admissionCB = "";
		String admissionName = "";
		String admissionSign = "";
		String admissionSignDate = "";
		String admissionRecommend = "";
		String admissionComment = "";		
		String hrCB = "";
		String hrSign = "";
		String hrSignDate = "";
		String hrRecommend = "";
		String hrComment = "";
		LinkedHashMap<String, Object> dataMap = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		/*String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		String wfInstanceID = workItem.getWorkflow().getId();
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
						log.error("ValueFormatException from CSUFShortAppEmpFeeWaiverDB="
								+ Arrays.toString(e2.getStackTrace()));
					} catch (PathNotFoundException e2) {
						log.error("PathNotFoundException from CSUFShortAppEmpFeeWaiverDB="
								+ Arrays.toString(e2.getStackTrace()));
					} catch (RepositoryException e2) {
						log.error("RepositoryException from CSUFShortAppEmpFeeWaiverDB="
								+ Arrays.toString(e2.getStackTrace()));
					}

					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.error("ParserConfigurationException from CSUFShortAppEmpFeeWaiverDB="
									+ Arrays.toString(e1.getStackTrace()));
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.error("IOException from CSUFShortAppEmpFeeWaiverDB="
									+ Arrays.toString(e1.getStackTrace()));
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								semester = eElement.getElementsByTagName("Semester").item(0).getTextContent();
								year = eElement.getElementsByTagName("Year").item(0).getTextContent();
								program = eElement.getElementsByTagName("Program").item(0).getTextContent();
								attendedCSUFBefore = eElement.getElementsByTagName("AttendedCSUFBefore").item(0)
										.getTextContent();
								csufStatus = eElement.getElementsByTagName("CSUFStatus").item(0).getTextContent();
								emplID = eElement.getElementsByTagName("EmplID").item(0).getTextContent();
								chrsID = eElement.getElementsByTagName("ChrsID").item(0).getTextContent();
								firstName = eElement.getElementsByTagName("FirstName").item(0).getTextContent();
								middleName = eElement.getElementsByTagName("MiddleName").item(0).getTextContent();
								lastName = eElement.getElementsByTagName("LastName").item(0).getTextContent();
								birthDate = eElement.getElementsByTagName("BirthDate").item(0).getTextContent();
								gender = eElement.getElementsByTagName("Gender").item(0).getTextContent();
								ssnNo = eElement.getElementsByTagName("SSN").item(0).getTextContent();
								stNumber = eElement.getElementsByTagName("StreetNumber").item(0).getTextContent();
								apt = eElement.getElementsByTagName("Apt").item(0).getTextContent();
								state = eElement.getElementsByTagName("State").item(0).getTextContent();
								city = eElement.getElementsByTagName("City").item(0).getTextContent();
								zipPostalCode = eElement.getElementsByTagName("ZipPostalCode").item(0).getTextContent();
								phone = eElement.getElementsByTagName("Phone").item(0).getTextContent();
								email = eElement.getElementsByTagName("Email").item(0).getTextContent();
								countryPR = eElement.getElementsByTagName("CountryPR").item(0).getTextContent();
								degreeReceived = eElement.getElementsByTagName("DegreeReceived").item(0)
										.getTextContent();
								signature = eElement.getElementsByTagName("Signature").item(0).getTextContent();
								classLevel = eElement.getElementsByTagName("ClassLevel").item(0).getTextContent();
								signedDate = eElement.getElementsByTagName("SignedDate").item(0).getTextContent();
								facultyStaffVerify = eElement.getElementsByTagName("FacultyStaffVerify").item(0)
										.getTextContent();
								userId = eElement.getElementsByTagName("userID").item(0).getTextContent();

								empComments = eElement.getElementsByTagName("EmpComments").item(0).getTextContent();
								empCB = eElement.getElementsByTagName("CheckSign").item(0).getTextContent();
								admissionCB = eElement.getElementsByTagName("AdmissionOfficeCB").item(0).getTextContent();
								admissionName = eElement.getElementsByTagName("AdmissionOfficePrintName").item(0)
										.getTextContent();
								admissionSign = eElement.getElementsByTagName("AdmissionOfficeSign").item(0).getTextContent();
								admissionSignDate = eElement.getElementsByTagName("AdmissionOfficeSignedDate").item(0)
										.getTextContent();
								admissionRecommend = eElement.getElementsByTagName("AdmissionOfficeApprovalRB").item(0)
										.getTextContent();
								admissionComment = eElement.getElementsByTagName("AdminOfficeComments").item(0).getTextContent();
								
								hrSign = eElement.getElementsByTagName("hrSign").item(0).getTextContent();
								hrCB = eElement.getElementsByTagName("hrCB").item(0).getTextContent();
								hrSignDate = eElement.getElementsByTagName("hrSigneddate").item(0).getTextContent();
								hrRecommend = eElement.getElementsByTagName("hrApprovalRB").item(0).getTextContent();
								hrComment = eElement.getElementsByTagName("hrComments").item(0).getTextContent();

							}
						}

						dataMap = new LinkedHashMap<String, Object>();

						dataMap = new LinkedHashMap<String, Object>();
						dataMap.put("EMPL_ID", emplID);
						dataMap.put("CHRS_ID", chrsID);
						dataMap.put("SEMESTER", semester);
						dataMap.put("YEAR", year);
						dataMap.put("PROGRAM", program);
						dataMap.put("ATTENDED_CSUF_BEFORE", attendedCSUFBefore);
						dataMap.put("CSUF_STATUS", csufStatus);
						dataMap.put("FIRST_NAME", firstName);
						dataMap.put("MIDDLE_NAME", middleName);
						dataMap.put("LAST_NAME", lastName);
						Object birthDateObj = null;
						if (birthDate != null && birthDate != "") {
							Date birthDateNew = Date.valueOf(birthDate);
							birthDateObj = birthDateNew;
						}
						dataMap.put("BIRTH_DATE", birthDateObj);
						dataMap.put("GENDER", gender);
						dataMap.put("SSN", ssnNo);
						dataMap.put("USER_ID", userId);
						dataMap.put("STREET_NUMBER", stNumber);
						dataMap.put("APT", apt);
						dataMap.put("STATE", state);
						dataMap.put("CITY", city);
						dataMap.put("ZIP_POSTAL_CODE", zipPostalCode);
						dataMap.put("PHONE_NO", phone);
						dataMap.put("EMAIL_ADDRESS", email);
						dataMap.put("COUNTRY_PERMANENT_RESIDENCE", countryPR);
						dataMap.put("INSTITUTION_DEGREE_RECEIVED", degreeReceived);
						dataMap.put("CLASS_LEVEL", classLevel);
						dataMap.put("SIGNATURE", signature);

						Object signedDateObj = null;
						if (signedDate != null && signedDate != "") {
							Date signedDateNew = Date.valueOf(signedDate);
							signedDateObj = signedDateNew;
						}
						dataMap.put("SIGNED_DATE", signedDateObj);
						dataMap.put("FACULTY_STAFF_VERIFY", facultyStaffVerify);
						dataMap.put("EMP_COMMENTS", empComments);
						dataMap.put("EMP_CB", empCB);												
						dataMap.put("HR_CB", hrCB);
						dataMap.put("HR_SIGN", hrSign);
						Object hrSignDateObj = null;
						if (hrSignDate != null && hrSignDate != "") {
							Date hrDateNew = Date.valueOf(hrSignDate);
							hrSignDateObj = hrDateNew;
						}
						dataMap.put("HR_SIGN_DATE", hrSignDateObj);
						dataMap.put("HR_RECOMMEND", hrRecommend);
						dataMap.put("HR_COMMENT", hrComment);
						dataMap.put("ADMISSION_OFFICE_CB", admissionCB);
						dataMap.put("ADMISSION_OFFICER_NAME", admissionName);
						dataMap.put("ADMISSION_OFFICE_SIGNATURE", admissionSign);
						Object admissionDateObj = null;
						if (admissionSignDate != null && admissionSignDate != "") {
							Date admissionDateNew = Date.valueOf(admissionSignDate);
							admissionDateObj = admissionDateNew;
						}
						dataMap.put("ADMISSION_OFFICE_SIGN_DATE", admissionDateObj);
						dataMap.put("ADMISSION_OFFICE_RECOMMEND", admissionRecommend);
						dataMap.put("ADMISSION_OFFICE_COMMENT", admissionComment);
						dataMap.put("WORKFLOW_INSTANCE_ID", wfInstanceID);
						try {
							CloudDbSaveUtil.saveFormData(tableName, formName, wfInstanceID, "WORKFLOW_INSTANCE_ID",
									wfInstanceID, dataMap, "HR_DATE,EMPLOYEE_DATE,END_DATE");
						} catch (IOException ioException) {
							ioException.printStackTrace();
						}

					} catch (SAXException e) {
						log.error("SAXException from CSUFShortAppEmpFeeWaiverDB=" + Arrays.toString(e.getStackTrace()));
					} catch (Exception e) {
						log.error("Exception from CSUFShortAppEmpFeeWaiverDB=" + Arrays.toString(e.getStackTrace()));
					} finally {
						try {
							is.close();
						} catch (IOException e) {
							log.error("IOException from Finally Block from CSUFShortAppEmpFeeWaiverDB="
									+ Arrays.toString(e.getStackTrace()));
						}

						try {
							if (conn != null) {
								conn.close();
							}
						} catch (SQLException e) {
							log.error("SQLException from Finally Block from CSUFShortAppEmpFeeWaiverDB="
									+ Arrays.toString(e.getStackTrace()));
						}

					}

				}
			}

	}

}
