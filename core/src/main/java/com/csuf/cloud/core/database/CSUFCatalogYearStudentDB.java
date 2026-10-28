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
import com.csuf.cloud.core.utils.DatabaseUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Catalog Year Student Save in DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=CSUFCatalogYearStudentDB" })
public class CSUFCatalogYearStudentDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFCatalogYearStudentDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		DatabaseUtils dbUtil = new DatabaseUtils();
		String tableName = "AEM_CATALOG_YEAR_STUDENT";
		String formName = "Change of catalog year student";

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;
		String name = "";
		String cwid = "";
		String todayDate = "";
		String phoneNumber = "";
		String major = "";
		String emailAddress = "";
		String secondMajor = "";
		String continuousCSU = "";
		String firstSemTerm = "";
		String schoolAttended = "";
		String transferredCSU = "";
		String transferAdmissionTerm = "";
		String anticipatedGradTerm = "";
		String graduateCSU = "";
		String fromVal = "";
		String toVal = "";
		String readmitted1 = "";
		String readmitted2 = "";
		String readmitted3 = "";
		String readmittedComments = "";
		String explainComments1 = "";
		String explainComments2 = "";
		String applicantNamePrinted = "";
		String applicantSignatureDate = "";
		String applicantSignature = "";
		String applicantComments = "";
		String StudentUserID = ""; 
		String gradEvalSign = "";
		String gradEvalName = "";
		String gradEvalDate = "";
		String gradEvalDecison = "";
		String gradEvalComments = "";
		String recordsSign = "";
		String recordsName = "";
		String recordsDate = "";
		String recordsDecison = "";
		String recordsComments = "";
		String caseId = "";

		String workflowInstance = "";
		LinkedHashMap<String, Object> dataMap = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();

		String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);
		if (conn != null) {
			while (xmlFiles.hasNext()) {
				Resource attachmentXml = xmlFiles.next();
				workflowInstance = workItem.getWorkflow().getId();
				String filePath = attachmentXml.getPath();

				log.info("filePath= " + filePath);
				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					log.info("xmlFiles=" + filePath);
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
					} catch (ValueFormatException e) {
						log.error("ValueFormatException in finally block CSUFCatalogYearStudentDB="
								+ Arrays.toString(e.getStackTrace()));
					} catch (PathNotFoundException e) {
						log.error("PathNotFoundException in finally block CSUFCatalogYearStudentDB="
								+ Arrays.toString(e.getStackTrace()));
					} catch (RepositoryException e) {
						log.error("RepositoryException in finally block CSUFCatalogYearStudentDB="
								+ Arrays.toString(e.getStackTrace()));
					}

					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e) {
							log.error("ParserConfigurationException in finally block CSUFCatalogYearStudentDB="
									+ Arrays.toString(e.getStackTrace()));
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e) {
							log.error("IOException in finally block CSUFCatalogYearStudentDB="
									+ Arrays.toString(e.getStackTrace()));
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {

								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								name = eElement.getElementsByTagName("Name").item(0).getTextContent();
								todayDate = eElement.getElementsByTagName("TodayDate").item(0).getTextContent();
								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								phoneNumber = eElement.getElementsByTagName("PhoneNumber").item(0).getTextContent();
								major = eElement.getElementsByTagName("Major").item(0).getTextContent();
								emailAddress = eElement.getElementsByTagName("EmailAddress").item(0).getTextContent();
								secondMajor = eElement.getElementsByTagName("SecondMajor").item(0).getTextContent();
								continuousCSU = eElement.getElementsByTagName("ContinuousCSU").item(0).getTextContent();
								firstSemTerm = eElement.getElementsByTagName("FirstSemTerm").item(0).getTextContent();
								schoolAttended = eElement.getElementsByTagName("SchoolAttended").item(0)
										.getTextContent();
								transferredCSU = eElement.getElementsByTagName("TransferredCSU").item(0)
										.getTextContent();
								transferAdmissionTerm = eElement.getElementsByTagName("TransferAdmissionTerm").item(0)
										.getTextContent();
								anticipatedGradTerm = eElement.getElementsByTagName("AnticipatedGradTerm").item(0)
										.getTextContent();
								graduateCSU = eElement.getElementsByTagName("GraduateCSU").item(0).getTextContent();
								fromVal = eElement.getElementsByTagName("from").item(0).getTextContent();
								toVal = eElement.getElementsByTagName("to").item(0).getTextContent();
								readmitted1 = eElement.getElementsByTagName("Readmitted1").item(0).getTextContent();
								readmitted2 = eElement.getElementsByTagName("Readmitted2").item(0).getTextContent();
								readmitted3 = eElement.getElementsByTagName("Readmitted3").item(0).getTextContent();
								readmittedComments = eElement.getElementsByTagName("ReadmittedComments").item(0)
										.getTextContent();
								explainComments1 = eElement.getElementsByTagName("Explain1").item(0).getTextContent();
								explainComments2 = eElement.getElementsByTagName("Explain2").item(0).getTextContent();

								applicantNamePrinted = eElement.getElementsByTagName("ApplicantNamePrinted").item(0)
										.getTextContent();
								applicantSignatureDate = eElement.getElementsByTagName("ApplicantSignatureDate").item(0)
										.getTextContent();
								applicantSignature = eElement.getElementsByTagName("ApplicantSignature").item(0)
										.getTextContent();
								StudentUserID = eElement.getElementsByTagName("StudentUserID").item(0)
										.getTextContent();
								applicantComments = eElement.getElementsByTagName("ApplicantComments").item(0)
										.getTextContent();

								gradEvalSign = eElement.getElementsByTagName("GradEvalSign").item(0).getTextContent();
								gradEvalName = eElement.getElementsByTagName("GradEvalName").item(0).getTextContent();
								gradEvalDate = eElement.getElementsByTagName("GradEvalDate").item(0).getTextContent();
								gradEvalDecison = eElement.getElementsByTagName("GradEvalDecison").item(0)
										.getTextContent();
								gradEvalComments = eElement.getElementsByTagName("GradEvalComments").item(0)
										.getTextContent();

								recordsSign = eElement.getElementsByTagName("RecordsSign").item(0).getTextContent();
								recordsName = eElement.getElementsByTagName("RecordsName").item(0).getTextContent();
								recordsDate = eElement.getElementsByTagName("RecordsDate").item(0).getTextContent();
								recordsDecison = eElement.getElementsByTagName("RecordsDecison").item(0)
										.getTextContent();
								recordsComments = eElement.getElementsByTagName("RecordsComments").item(0)
										.getTextContent();
								caseId = eElement.getElementsByTagName("CaseId").item(0)
										.getTextContent();

							}
						}

						dataMap = new LinkedHashMap<String, Object>();

						dataMap.put("CWID", cwid);
						dataMap.put("NAME", name);
						Object todayDateObj = null;
						if (todayDate != null && todayDate != "") {
							Date dateNew = Date.valueOf(todayDate);
							todayDateObj = dateNew;
						}
						dataMap.put("TODAY_DATE", todayDateObj);
						dataMap.put("PHONE_NUMBER", phoneNumber);
						dataMap.put("MAJOR", major);
						dataMap.put("EMAIL_ADDRESS", emailAddress);
						dataMap.put("SECOND_MAJOR", secondMajor);
						dataMap.put("CONTINUOUS_CSU", continuousCSU);
						dataMap.put("SCHOOL_ATTENDED", schoolAttended);
						dataMap.put("FIRST_SEM_TERM", firstSemTerm);
						dataMap.put("TRANSFERRED_CSU", transferredCSU);
						dataMap.put("TRANSFERADMISSION_TERM", transferAdmissionTerm);
						dataMap.put("ANTICIPATED_GRAD_TERM", anticipatedGradTerm);
						dataMap.put("GRADUATE_CSU", graduateCSU);
						dataMap.put("CURRENT_CATALOG_YEAR", fromVal);
						dataMap.put("REQUESTED_CATALOG_YEAR", toVal);
						dataMap.put("READMITTED1", readmitted1);
						dataMap.put("READMITTED2", readmitted2);
						dataMap.put("READMITTED3", readmitted3);
						dataMap.put("READMITTED_COMMENTS", readmittedComments);
						dataMap.put("EXPLAIN1", explainComments1);
						dataMap.put("EXPLAIN2", explainComments2);
						dataMap.put("APPLICANT_NAME_PRINTED", applicantNamePrinted);
						Object appSignDateObj = null;
						if (applicantSignatureDate != null && applicantSignatureDate != "") {
							Date applicantSignatureDateNew = Date.valueOf(applicantSignatureDate);
							appSignDateObj = applicantSignatureDateNew;
						}
						dataMap.put("APPLICANT_SIGNATURE_DATE", appSignDateObj);
						dataMap.put("APPLICANT_SIGNATURE", applicantSignature);
						dataMap.put("APPLICANT_COMMENTS", applicantComments);
						
						dataMap.put("GRAD_EVAL_SIGN", gradEvalSign);
						Object gradEvalDateObj = null;
						if (gradEvalDate != null && gradEvalDate != "") {
							Date gradEvalDateNew = Date.valueOf(gradEvalDate);
							gradEvalDateObj = gradEvalDateNew;
						}
						dataMap.put("GRAD_EVAL_DATE", gradEvalDateObj);
						dataMap.put("GRAD_EVAL_NAME", gradEvalName);
						dataMap.put("GRAD_EVAL_DECISON", gradEvalDecison);
						dataMap.put("GRAD_EVAL_COMMENTS", gradEvalComments);
						
						dataMap.put("RECORDS_SIGN", recordsSign);
						Object recDateObj = null;
						if (recordsDate != null && recordsDate != "") {
							Date recordsDateNew = Date.valueOf(recordsDate);
							recDateObj = recordsDateNew;
						}
						dataMap.put("RECORDS_DATE", recDateObj);
						dataMap.put("RECORDS_NAME", recordsName);
						dataMap.put("RECORDS_DECISON", recordsDecison);
						dataMap.put("RECORDS_COMMENTS", recordsComments);
						dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstance);
						dataMap.put("CASE_ID", caseId);
						dataMap.put("STUDENT_USERID", StudentUserID);
						
						dbUtil.insertFormData(conn, dataMap, tableName, formName);

					} catch (SAXException e) {
						log.error("SAXException in finally block CSUFCatalogYearStudentDB="
								+ Arrays.toString(e.getStackTrace()));
					} finally {
						try {
							is.close();
						} catch (IOException e) {
							log.error("IOException in finally block CSUFCatalogYearStudentDB="
									+ Arrays.toString(e.getStackTrace()));
						}
						try {
							if (conn != null) {
								conn.close();
							}
						} catch (SQLException e) {
							log.error("SQLException from Finally Block from CSUFCatalogYearStudentDB="
									+ Arrays.toString(e.getStackTrace()));
						}

					}

				}
			}
		}
	}

}
