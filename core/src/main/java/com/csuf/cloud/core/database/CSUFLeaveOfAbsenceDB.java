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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Leave Of Absence DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=CSUFLeaveOfAbsenceDB" })
public class CSUFLeaveOfAbsenceDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFLeaveOfAbsenceDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_LEAVE_OF_ABSENCE";
		String formName = "Leave Of Absence";
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;
		String workflowInstanceID = "";
		String caseId = "";
		String studentCWID = "";
		String studentFirstName = "";
		String studentLastName = "";
		String studentStreet = "";
		String studentCity = "";
		String zipCode = "";
		String studentState = "";
		String studentEmail = "";
		String studentCellPhone = "";
		String initiatedDate = "";
		String degreeObjective = "";
		String graduateReasonForLOA = "";
		String graduateOneSemesterCHK = "";
		String graduateOneSemester = "";
		String graduateOneSemesterValue = "";
		String graduateTwoSemesterCHK = "";
		String graduateTwoSemester1 = "";
		String graduateTwoSemester1Value = "";
		String graduateTwoSemester2 = "";
		String graduateTwoSemester2Value = "";
		String previousLeaveRB = "";
		String semesterFall = "";
		String semesterFallValue = "";
		String semeterSpring = "";
		String semeterSpringValue = "";
		String oneSemesterCHK = "";
		String oneSemesterTerm = "";
		String oneSemesterTermValue = "";
		String twoSemesterCHK = "";
		String twoSemesterTerm1 = "";
		String twoSemesterTerm1Value = "";
		String twoSemesterTerm2 = "";
		String twoSemesterTerm2Value = "";
		String undergraduateReasonForLOA = "";
		String studentSignature = "";
		String studentSignatureDate = "";
		String studentSignatureComment = "";
		String ascAction = "";
		String ascActionValue = "";
		String ascSignature = "";
		String ascDate = "";
		String ascComment = "";
		String internationalOfficeAction = "";
		String internationalOfficeActionValue = "";
		String internationalOfficeSignature = "";
		String internationalOfficeDate = "";
		String internationalOfficeComment = "";
		String graduateStudiesDeptAction = "";
		String graduateStudiesDeptActionValue = "";
		String graduateStudiesDeptSignature = "";
		String graduateStudiesDeptDate = "";
		String graduateStudiesDeptComment = "";
		String recordsAction = "";
		String recordsActionValue = "";
		String recordsSignature = "";
		String recordsDate = "";
		String recordsComment = "";
		String acadCareer = "";
		String typeOfForm = "";
		String typeOfRequest = "";

		LinkedHashMap<String, Object> dataMapFormInfo = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

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
						log.error("ValueFormatException from CSUFLeaveOfAbsenceDB="
								+ Arrays.toString(e2.getStackTrace()));

					} catch (PathNotFoundException e2) {
						log.error("PathNotFoundException from CSUFLeaveOfAbsenceDB="
								+ Arrays.toString(e2.getStackTrace()));

					} catch (RepositoryException e2) {
						log.error(
								"RepositoryException from CSUFLeaveOfAbsenceDB=" + Arrays.toString(e2.getStackTrace()));

					}
					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.error("ParserConfigurationException from CSUFLeaveOfAbsenceDB="
									+ Arrays.toString(e1.getStackTrace()));
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.error("IOException from CSUFLeaveOfAbsenceDB=" + Arrays.toString(e1.getStackTrace()));
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;

								caseId = eElement.getElementsByTagName("caseId").item(0).getTextContent();

								typeOfForm = eElement.getElementsByTagName("typeOfForm").item(0).getTextContent();

								if (typeOfForm.equals("1")) {
									typeOfRequest = "Non Medical Request";
								} else if (typeOfForm.equals("2")) {
									typeOfRequest = "Medical Request";
								}

								studentCWID = eElement.getElementsByTagName("StudentCWID").item(0).getTextContent();

								studentFirstName = eElement.getElementsByTagName("StudentFirstName").item(0)
										.getTextContent();

								studentLastName = eElement.getElementsByTagName("StudentLastName").item(0)
										.getTextContent();

								studentStreet = eElement.getElementsByTagName("StudentStreet").item(0).getTextContent();

								studentCity = eElement.getElementsByTagName("StudentCity").item(0).getTextContent();

								zipCode = eElement.getElementsByTagName("ZipCode").item(0).getTextContent();

								studentState = eElement.getElementsByTagName("StudentState").item(0).getTextContent();

								studentEmail = eElement.getElementsByTagName("StudentEmail").item(0).getTextContent();

								studentCellPhone = eElement.getElementsByTagName("StudentCellPhone").item(0)
										.getTextContent();

								initiatedDate = eElement.getElementsByTagName("InitiatedDate").item(0).getTextContent();

								degreeObjective = eElement.getElementsByTagName("DegreeObjective").item(0)
										.getTextContent();

								graduateReasonForLOA = eElement.getElementsByTagName("GraduateReasonForLOA").item(0)
										.getTextContent();

								graduateOneSemesterCHK = eElement.getElementsByTagName("GraduateOneSemesterCHK").item(0)
										.getTextContent();

								graduateOneSemester = eElement.getElementsByTagName("GraduateOneSemesterTerm").item(0)
										.getTextContent();
								if (graduateOneSemester == "Select Term") {
									graduateOneSemesterValue = "";
								} else {
									graduateOneSemesterValue = graduateOneSemester;
								}

								graduateTwoSemesterCHK = eElement.getElementsByTagName("GraduateTwoSemesterCHK").item(0)
										.getTextContent();

								graduateTwoSemester1 = eElement.getElementsByTagName("GraduateTwoSemesterTerm1").item(0)
										.getTextContent();
								if (graduateTwoSemester1 == "Select Term") {
									graduateTwoSemester1Value = "";
								} else {
									graduateTwoSemester1Value = graduateTwoSemester1;
								}

								graduateTwoSemester2 = eElement.getElementsByTagName("GraduateTwoSemesterTerm2").item(0)
										.getTextContent();
								if (graduateTwoSemester2 == "Select Term") {
									graduateTwoSemester2Value = "";
								} else {
									graduateTwoSemester2Value = graduateTwoSemester2;
								}

								previousLeaveRB = eElement.getElementsByTagName("PreviousLeaveRB").item(0)
										.getTextContent();

								semesterFall = eElement.getElementsByTagName("SemesterFall").item(0).getTextContent();
								if (semesterFall == "Select an Option") {
									semesterFallValue = "";
								} else {
									semesterFallValue = semesterFall;
								}

								semeterSpring = eElement.getElementsByTagName("SemesterSpring").item(0)
										.getTextContent();
								if (semeterSpring == "Select an Option") {
									semeterSpringValue = "";
								} else {
									semeterSpringValue = semeterSpring;
								}

								oneSemesterCHK = eElement.getElementsByTagName("OnesemesterCHK").item(0)
										.getTextContent();

								oneSemesterTerm = eElement.getElementsByTagName("OneSemesterTerm").item(0)
										.getTextContent();
								if (oneSemesterTerm == "Select Term") {
									oneSemesterTermValue = "";
								} else {
									oneSemesterTermValue = oneSemesterTerm;
								}

								twoSemesterCHK = eElement.getElementsByTagName("TwosemesterCHK").item(0)
										.getTextContent();

								twoSemesterTerm1 = eElement.getElementsByTagName("TwoSemesterTerm1").item(0)
										.getTextContent();
								if (twoSemesterTerm1 == "Select Term") {
									twoSemesterTerm1Value = "";
								} else {
									twoSemesterTerm1Value = twoSemesterTerm1;
								}

								twoSemesterTerm2 = eElement.getElementsByTagName("TwoSemesterTerm2").item(0)
										.getTextContent();

								if (twoSemesterTerm2 == "Select Term") {
									twoSemesterTerm2Value = "";
								} else {
									twoSemesterTerm2Value = twoSemesterTerm2;
								}

								undergraduateReasonForLOA = eElement.getElementsByTagName("UndergraduateReasonForLOA")
										.item(0).getTextContent();

								studentSignature = eElement.getElementsByTagName("StudentSignature").item(0)
										.getTextContent();

								studentSignatureDate = eElement.getElementsByTagName("StudentSignatureDate").item(0)
										.getTextContent();

								studentSignatureComment = eElement.getElementsByTagName("StudentSignatureComment")
										.item(0).getTextContent();

								ascAction = eElement.getElementsByTagName("ASCOfficeAction").item(0).getTextContent();

								ascSignature = eElement.getElementsByTagName("ASCOfficeSignature").item(0)
										.getTextContent();

								ascDate = eElement.getElementsByTagName("ASCOfficeDate").item(0).getTextContent();

								ascComment = eElement.getElementsByTagName("ASCOfficeComment").item(0).getTextContent();

								internationalOfficeAction = eElement.getElementsByTagName("InternationalOfficeAction")
										.item(0).getTextContent();

								internationalOfficeSignature = eElement
										.getElementsByTagName("InternationalOfficeSignature").item(0).getTextContent();

								internationalOfficeDate = eElement.getElementsByTagName("InternationalOfficeDate")
										.item(0).getTextContent();

								internationalOfficeComment = eElement.getElementsByTagName("InternationalOfficeComment")
										.item(0).getTextContent();

								graduateStudiesDeptAction = eElement.getElementsByTagName("GraduateStudiesDeptAction")
										.item(0).getTextContent();

								graduateStudiesDeptSignature = eElement
										.getElementsByTagName("GraduateStudiesDeptSignature").item(0).getTextContent();

								graduateStudiesDeptDate = eElement.getElementsByTagName("GraduateStudiesDeptDate")
										.item(0).getTextContent();

								graduateStudiesDeptComment = eElement.getElementsByTagName("GraduateStudiesDeptComment")
										.item(0).getTextContent();

								recordsAction = eElement.getElementsByTagName("RecordsAction").item(0).getTextContent();

								recordsSignature = eElement.getElementsByTagName("RecordsSignature").item(0)
										.getTextContent();

								recordsDate = eElement.getElementsByTagName("RecordsDate").item(0).getTextContent();

								recordsComment = eElement.getElementsByTagName("RecordsComment").item(0)
										.getTextContent();

								acadCareer = eElement.getElementsByTagName("AcadCareer").item(0).getTextContent();

								dataMapFormInfo = new LinkedHashMap<String, Object>();
								dataMapFormInfo.put("CASE_ID", caseId);
								dataMapFormInfo.put("STUDENT_CWID", studentCWID);
								dataMapFormInfo.put("STUDENT_FIRSTNAME", studentFirstName);
								dataMapFormInfo.put("STUDENT_LASTNAME", studentLastName);
								dataMapFormInfo.put("STUDENT_STREET", studentStreet);
								dataMapFormInfo.put("STUDENT_CITY", studentCity);
								dataMapFormInfo.put("ZIP_CODE", zipCode);
								dataMapFormInfo.put("STUDENT_STATE", studentState);
								dataMapFormInfo.put("STUDENT_EMAIL", studentEmail);
								dataMapFormInfo.put("STUDENT_CELLPHONE", studentCellPhone);

								Object initiatedDateObj = null;
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatedDate);
									initiatedDateObj = initiatedDateNew;
								}
								dataMapFormInfo.put("INITIATED_DATE", initiatedDateObj);
								dataMapFormInfo.put("DEGREE_OBJECTIVE", degreeObjective);
								dataMapFormInfo.put("GRAD_REASON_FOR_LOA", graduateReasonForLOA);
								dataMapFormInfo.put("GRAD_ONE_SEMESTERCHK", graduateOneSemesterCHK);
								dataMapFormInfo.put("GRAD_ONE_SEM_TERM", graduateOneSemesterValue);
								dataMapFormInfo.put("GRAD_TWO_SEMESTERCHK", graduateTwoSemesterCHK);
								dataMapFormInfo.put("GRAD_TWO_SEM_TERM1", graduateTwoSemester1Value);
								dataMapFormInfo.put("GRAD_TWO_SEM_TERM2", graduateTwoSemester2Value);
								dataMapFormInfo.put("PREVIOUS_LEAVERB", previousLeaveRB);
								dataMapFormInfo.put("SEMESTER_FALL", semesterFallValue);
								dataMapFormInfo.put("SEMESTER_SPRING", semeterSpringValue);
								dataMapFormInfo.put("ONE_SEMESTERCHK", oneSemesterCHK);
								dataMapFormInfo.put("ONE_SEMESTER_TERM", oneSemesterTermValue);
								dataMapFormInfo.put("TWO_SEMESTERCHK", twoSemesterCHK);
								dataMapFormInfo.put("TWO_SEMESTER_TERM1", twoSemesterTerm1Value);
								dataMapFormInfo.put("TWO_SEMESTER_TERM2", twoSemesterTerm2Value);
								dataMapFormInfo.put("UNDERGD_REASON_FOR_LOA", undergraduateReasonForLOA);
								dataMapFormInfo.put("STUDENT_SIGN", studentSignature);

								Object studentSignatureDateObj = null;
								if (studentSignatureDate != null && studentSignatureDate != "") {
									Date studentSignatureDateNew = Date.valueOf(studentSignatureDate);
									studentSignatureDateObj = studentSignatureDateNew;
								}
								dataMapFormInfo.put("STUDENT_SIGN_DATE", studentSignatureDateObj);
								dataMapFormInfo.put("STUDENT_SIGN_COMMENT", studentSignatureComment);
								dataMapFormInfo.put("ASC_ACTION", ascAction);
								dataMapFormInfo.put("ASC_SIGNATURE", ascSignature);

								Object ascDateObj = null;
								if (ascDate != null && ascDate != "") {
									Date ascDateNew = Date.valueOf(ascDate);
									ascDateObj = ascDateNew;
								}
								dataMapFormInfo.put("ASC_DATE", ascDateObj);
								dataMapFormInfo.put("ASC_COMMENT", ascComment);
								dataMapFormInfo.put("INTERNATIONAL_ACTION", internationalOfficeAction);
								dataMapFormInfo.put("INTERNATIONAL_ACTION_SIGNATURE", internationalOfficeSignature);

								Object internationalOfficeDateObj = null;
								if (internationalOfficeDate != null && internationalOfficeDate != "") {
									Date internationalOfficeDateNew = Date.valueOf(internationalOfficeDate);
									internationalOfficeDateObj = internationalOfficeDateNew;
								}
								dataMapFormInfo.put("INTERNATIONAL_ACTION_DATE", internationalOfficeDateObj);
								dataMapFormInfo.put("INTERNATIONAL_ACTION_COMMENT", internationalOfficeComment);
								dataMapFormInfo.put("GRAD_STUDIES_DEPT_ACTION", graduateStudiesDeptAction);
								dataMapFormInfo.put("GRAD_STUDIES_DEPT_SIGN", graduateStudiesDeptSignature);

								Object graduateStudiesDeptDateObj = null;
								if (graduateStudiesDeptDate != null && graduateStudiesDeptDate != "") {
									Date graduateStudiesDeptDateNew = Date.valueOf(graduateStudiesDeptDate);
									graduateStudiesDeptDateObj = graduateStudiesDeptDateNew;
								}
								dataMapFormInfo.put("GRAD_STUDIES_DEPT_DATE", graduateStudiesDeptDateObj);
								dataMapFormInfo.put("GRAD_STUDIES_DEPT_COMMENT", graduateStudiesDeptComment);

								dataMapFormInfo.put("RECORDS_ACTION", recordsAction);
								dataMapFormInfo.put("RECORDS_SIGN", recordsSignature);

								Object recordsDateObj = null;
								if (recordsDate != null && recordsDate != "") {
									Date recordsDateNew = Date.valueOf(recordsDate);
									recordsDateObj = recordsDateNew;
								}
								dataMapFormInfo.put("RECORDS_DATE", recordsDateObj);
								dataMapFormInfo.put("RECORDS_COMMENT", recordsComment);
								dataMapFormInfo.put("ACAD_CAREER", acadCareer);
								dataMapFormInfo.put("TYPE_OF_REQUEST", typeOfRequest);
								dataMapFormInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

								try {
									CloudDbSaveUtil.saveFormData(tableName, formName, caseId, "CASE_ID",
											workflowInstanceID, dataMapFormInfo,
											"INITIATED_DATE,STUDENT_SIGN_DATE,ASC_DATE,INTERNATIONAL_ACTION_DATE,GRAD_STUDIES_DEPT_DATE,RECORDS_DATE");
								} catch (IOException ioException) {
									ioException.printStackTrace();
								}

							}
						}

					} catch (SAXException e) {
						log.error("SAXException=" + Arrays.toString(e.getStackTrace()));

					} catch (Exception e) {
						log.error("Exception From CSUFLeaveOfAbsenceDB=" + Arrays.toString(e.getStackTrace()));
					}

					finally {
						if (is != null) {
							try {
								is.close();
							} catch (Exception e) {
								log.error("Exception from Finally Block from CSUFLeaveOfAbsenceDB="
										+ Arrays.toString(e.getStackTrace()));
							}
						}
						if (conn != null) {
							try {
								conn.close();
							} catch (SQLException e) {
								log.error("SQLException from Finally Block from CSUFLeaveOfAbsenceDB="
										+ Arrays.toString(e.getStackTrace()));
							}

						}
					}

				}
			}
	}
}
