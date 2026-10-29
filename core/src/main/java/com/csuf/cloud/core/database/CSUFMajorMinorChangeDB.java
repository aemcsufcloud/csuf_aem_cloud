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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=CSUF Major/Minor Change DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=CSUFMajorMinorChangeDB" })
public class CSUFMajorMinorChangeDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFMajorMinorChangeDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_MAJOR_MINOR_CHANGE";
		String formName = "Major_Minor Change";
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;
		String workflowInstanceID = "";
		String caseId = "";
		String studentLastName = "";
		String studentFirstName = "";
		String studentMiddleName = "";
		String studentCWID = "";
		String studentPhone = "";
		String studentDate = "";
		String studentSignature = "";
		String studentEmail = "";
		String currentMajorToNewMajorCHK = "";
		String currentMajor = "";
		String newMajor = "";
		String currentMajorAcadPlanCode = "";
		String newMajorAcadPlanCode = "";
		String addSecondMajorCHK = "";
		String addSecondMajor = "";
		String addSecondMajorAcadCode = "";
		String changeAdditionalMajorCHK = "";
		String changeAdditionalCurrentMajor = "";
		String changeAdditionalCurrentMajorAcadCode = "";
		String changeAdditionalNewMajor = "";
		String changeAdditionalNewMajorAcadCode = "";
		String dropSecondMajorCHK = "";
		String majorToDropAcadPlanCode = "";
		String majorToDrop = "";
		String departmentSignatureNewMajorCHK = "";
		String departmentSignatureNewMajorAction = "";
		String departmentSignNewMajor = "";
		String departmentNewMajorDate = "";
		String departmentNameNewMajor = "";
		String departmentNewMajorComment = "";
		String dropMajorRecordsAction = "";
		String dropMajorRecordsSignature = "";
		String dropMajorRecordsDate = "";
		String dropMajorRecordsBy = "";
		String dropMajorRecordsComment = "";
		String dropMajorRecordsSignatureCHK = "";
		String majorRecordsAction = "";
		String majorRecordsSignature = "";
		String majorRecordsDate = "";
		String majorCode = "";
		String secondaMajorCode = "";
		String majorBy = "";
		String majorRecordComment = "";
		String addMajorRecordsAction = "";
		String addMajorRecordsSignature = "";
		String addMajorRecordsDate = "";
		String addMajorBy = "";
		String addMajorRecordsComment = "";
		String departmentSignatureAddSecondMajorCHK = "";
		String departmentSignatureAddSecondMajorAction = "";
		String departmentSignatureAddSecondMajor = "";
		String departmentAddSecondMajorDate = "";
		String departmentNameAddSecondMajor = "";
		String departmentAddSecondMajorComment = "";
		String declareMinorCHK = "";
		String declareMinor = "";
		String declareMinorAcadPlan = "";
		String addSecondOrThirdMinorCHK = "";
		String addSecondOrThirdMinor = "";
		String addSecondOrThirdMinorAcadPlan = "";
		String dropMinorCHK = "";
		String dropMinor = "";
		String dropMinorAcadPlan = "";
		String changeMinorCHK = "";
		String changeCurrentMinor = "";
		String changeCurrentMinorAcadPlan = "";
		String changeNewMinor = "";
		String changeNewMinorAcadPlan = "";
		String firstMinorSignature = "";
		String departmentNameFirstMinor = "";
		String approvedByFirstMinor = "";
		String firstMinorDate = "";
		String approvedByFirstMinorComment = "";
		String secondMinorSignature = "";
		String departmentNameSecondtMinor = "";
		String approvedBySecondMinor = "";
		String secondMinorDate = "";
		String approvedBySecondMinorComment = "";
		String firstMinorSignatureCHK = "";
		String secondMinorSignatureCHK = "";
		String firstMinorAction = "";
		String secondMinorAction = "";
		String minorRecordsCHK = "";
		String minorRecordsSignature = "";
		String minorRecordsDate = "";
		String firstCode = "";
		String secondCode = "";
		String minorBy = "";
		String minorRecordsComments = "";
		String dropMinorRecordsSignatureCHK = "";
		String dropMinorRecordsAction = "";
		String dropMinorRecordsSignature = "";
		String dropMinorRecordsDate = "";
		String dropMinorRecordsBy = "";
		String dropMinorRecordsComment = "";
		String declareCertificateCHK = "";
		String declareCertificate = "";
		String declareCertificateAcadPlan = "";
		String dropCertificateCHK = "";
		String dropCertificate = "";
		String dropCertificateAcadPlan = "";
		String certificateRecordsCHK = "";
		String certificateRecordsSignature = "";
		String certificateRecordsDate = "";
		String certificateCode = "";
		String certificateBy = "";
		String certificateRecordsComments = "";
		String certificateSignatureCHK = "";
		String certificateAction = "";
		String certificateSignature = "";
		String departmentNameFirstCertificate = "";
		String approvedByFirstCertificate = "";
		String certificateDate = "";
		String approvedByFirstCertificateComment = "";
		String dropCertificateRecordsSignatureCHK = "";
		String dropCertificateRecordsAction = "";
		String dropCertificateRecordsSignature = "";
		String dropCertificateRecordsDate = "";
		String dropCertificateRecordsBy = "";
		String dropCertificateRecordsComment = "";

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
						log.error("Exception1=" + e2.getMessage());
						e2.printStackTrace();
					} catch (PathNotFoundException e2) {
						log.error("Exception2=" + e2.getMessage());
						e2.printStackTrace();
					} catch (RepositoryException e2) {
						log.error("Exception3=" + e2.getMessage());
						e2.printStackTrace();
					}
					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.info("ParserConfigurationException=" + e1);
							e1.printStackTrace();
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.info("IOException=" + e1);
							e1.printStackTrace();
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;

								caseId = eElement.getElementsByTagName("caseId").item(0).getTextContent();
								log.info("caseId = " + caseId);

								studentLastName = eElement.getElementsByTagName("StudentLastName").item(0)
										.getTextContent();

								studentFirstName = eElement.getElementsByTagName("StudentFirstName").item(0)
										.getTextContent();

								studentMiddleName = eElement.getElementsByTagName("StudentMiddleName").item(0)
										.getTextContent();

								studentCWID = eElement.getElementsByTagName("StudentCWID").item(0).getTextContent();

								studentPhone = eElement.getElementsByTagName("StudentPhone").item(0).getTextContent();

								studentDate = eElement.getElementsByTagName("StudentDate").item(0).getTextContent();

								studentSignature = eElement.getElementsByTagName("StudentSignature").item(0)
										.getTextContent();

								studentEmail = eElement.getElementsByTagName("StudentEmail").item(0).getTextContent();

								currentMajorToNewMajorCHK = eElement.getElementsByTagName("CurrentMajorToNewMajorCHK")
										.item(0).getTextContent();

								currentMajor = eElement.getElementsByTagName("CurrentMajor").item(0).getTextContent();

								currentMajorAcadPlanCode = eElement.getElementsByTagName("CurrentMajorAcadPlanCode")
										.item(0).getTextContent();

								newMajor = eElement.getElementsByTagName("NewMajor").item(0).getTextContent();

								newMajorAcadPlanCode = eElement.getElementsByTagName("NewMajorAcadPlanCode").item(0)
										.getTextContent();

								addSecondMajorCHK = eElement.getElementsByTagName("AddSecondMajorCHK").item(0)
										.getTextContent();

								addSecondMajor = eElement.getElementsByTagName("AddSecondMajor").item(0)
										.getTextContent();

								addSecondMajorAcadCode = eElement.getElementsByTagName("AddSecondMajorAcadCode").item(0)
										.getTextContent();

								changeAdditionalMajorCHK = eElement.getElementsByTagName("ChangeAdditionalMajorCHK")
										.item(0).getTextContent();

								changeAdditionalCurrentMajor = eElement
										.getElementsByTagName("ChangeAdditionalCurrentMajor").item(0).getTextContent();

								changeAdditionalCurrentMajorAcadCode = eElement
										.getElementsByTagName("ChangeAdditionalCurrentMajorAcadCode").item(0)
										.getTextContent();
								

								changeAdditionalNewMajor = eElement.getElementsByTagName("ChangeAdditionalNewMajor")
										.item(0).getTextContent();

								changeAdditionalNewMajorAcadCode = eElement
										.getElementsByTagName("ChangeAdditionalNewMajorAcadCode").item(0)
										.getTextContent();

								dropSecondMajorCHK = eElement.getElementsByTagName("DropSecondMajorCHK").item(0)
										.getTextContent();

								majorToDrop = eElement.getElementsByTagName("MajorToDrop").item(0).getTextContent();

								majorToDropAcadPlanCode = eElement.getElementsByTagName("MajorToDropAcadPlanCode")
										.item(0).getTextContent();

								departmentSignatureNewMajorCHK = eElement
										.getElementsByTagName("DepartmentSignatureNewMajorCHK").item(0)
										.getTextContent();

								departmentSignatureNewMajorAction = eElement
										.getElementsByTagName("DepartmentSignatureNewMajorAction").item(0)
										.getTextContent();

								departmentSignNewMajor = eElement.getElementsByTagName("DepartmentSignNewMajor").item(0)
										.getTextContent();

								departmentNewMajorDate = eElement.getElementsByTagName("DepartmentNewMajorDate").item(0)
										.getTextContent();

								departmentNameNewMajor = eElement.getElementsByTagName("DepartmentNameNewMajor").item(0)
										.getTextContent();

								departmentNewMajorComment = eElement.getElementsByTagName("DepartmentNewMajorComment")
										.item(0).getTextContent();

								departmentSignatureAddSecondMajorCHK = eElement
										.getElementsByTagName("DepartmentSignatureAddSecondMajorCHK").item(0)
										.getTextContent();

								departmentSignatureAddSecondMajorAction = eElement
										.getElementsByTagName("DepartmentSignatureAddSecondMajorAction").item(0)
										.getTextContent();

								departmentSignatureAddSecondMajor = eElement
										.getElementsByTagName("DepartmentSignatureAddSecondMajor").item(0)
										.getTextContent();

								departmentAddSecondMajorDate = eElement
										.getElementsByTagName("DepartmentAddSecondMajorDate").item(0).getTextContent();

								departmentNameAddSecondMajor = eElement
										.getElementsByTagName("DepartmentNameAddSecondMajor").item(0).getTextContent();

								departmentAddSecondMajorComment = eElement
										.getElementsByTagName("DepartmentAddSecondMajorComment").item(0)
										.getTextContent();

								majorRecordsAction = eElement.getElementsByTagName("MajorRecordsAction").item(0)
										.getTextContent();

								majorRecordsSignature = eElement.getElementsByTagName("MajorRecordsSignature").item(0)
										.getTextContent();

								majorRecordsDate = eElement.getElementsByTagName("MajorRecordsDate").item(0)
										.getTextContent();

								majorCode = eElement.getElementsByTagName("MajorCode").item(0).getTextContent();

								secondaMajorCode = eElement.getElementsByTagName("SecondaMajorCode").item(0)
										.getTextContent();

								majorBy = eElement.getElementsByTagName("MajorBy").item(0).getTextContent();

								majorRecordComment = eElement.getElementsByTagName("MajorRecordComment").item(0)
										.getTextContent();

								addMajorRecordsAction = eElement.getElementsByTagName("AdditionalMajorRecordsAction")
										.item(0).getTextContent();

								addMajorRecordsSignature = eElement
										.getElementsByTagName("AdditionalMajorRecordsSignature").item(0)
										.getTextContent();

								addMajorRecordsDate = eElement.getElementsByTagName("AdditionalMajorRecordsDate")
										.item(0).getTextContent();

								addMajorBy = eElement.getElementsByTagName("AdditionalMajorRecordsBy").item(0)
										.getTextContent();

								addMajorRecordsComment = eElement.getElementsByTagName("AdditionalMajorRecordsComment")
										.item(0).getTextContent();

								dropMajorRecordsSignatureCHK = eElement
										.getElementsByTagName("DropMajorRecordsSignatureCHK").item(0).getTextContent();

								dropMajorRecordsAction = eElement.getElementsByTagName("DropMajorRecordsAction").item(0)
										.getTextContent();

								dropMajorRecordsSignature = eElement.getElementsByTagName("DropMajorRecordsSignature")
										.item(0).getTextContent();

								dropMajorRecordsDate = eElement.getElementsByTagName("DropMajorRecordsDate").item(0)
										.getTextContent();

								dropMajorRecordsBy = eElement.getElementsByTagName("DropMajorRecordsBy").item(0)
										.getTextContent();

								dropMajorRecordsComment = eElement.getElementsByTagName("DropMajorRecordsComment")
										.item(0).getTextContent();

								declareMinorCHK = eElement.getElementsByTagName("DeclareMinorCHK").item(0)
										.getTextContent();

								declareMinor = eElement.getElementsByTagName("DeclareMinor").item(0).getTextContent();

								declareMinorAcadPlan = eElement.getElementsByTagName("DeclareMinorAcadPlan").item(0)
										.getTextContent();

								addSecondOrThirdMinorCHK = eElement.getElementsByTagName("AddSecondOrThirdMinorCHK")
										.item(0).getTextContent();

								addSecondOrThirdMinor = eElement.getElementsByTagName("AddSecondOrThirdMinor").item(0)
										.getTextContent();

								addSecondOrThirdMinorAcadPlan = eElement
										.getElementsByTagName("AddSecondOrThirdMinorAcadPlan").item(0).getTextContent();

								dropMinorCHK = eElement.getElementsByTagName("DropMinorCHK").item(0).getTextContent();

								dropMinor = eElement.getElementsByTagName("DropMinor").item(0).getTextContent();

								dropMinorAcadPlan = eElement.getElementsByTagName("DropMinorAcadPlan").item(0)
										.getTextContent();

								changeMinorCHK = eElement.getElementsByTagName("ChangeMinorCHK").item(0)
										.getTextContent();

								changeCurrentMinor = eElement.getElementsByTagName("ChangeCurrentMinor").item(0)
										.getTextContent();

								changeCurrentMinorAcadPlan = eElement.getElementsByTagName("ChangeCurrentMinorAcadPlan")
										.item(0).getTextContent();

								changeNewMinor = eElement.getElementsByTagName("ChangeNewMinor").item(0)
										.getTextContent();

								changeNewMinorAcadPlan = eElement.getElementsByTagName("ChangeNewMinorAcadPlan").item(0)
										.getTextContent();

								firstMinorSignatureCHK = eElement.getElementsByTagName("FirstMinorSignatureCHK").item(0)
										.getTextContent();

								firstMinorAction = eElement.getElementsByTagName("FirstMinorAction").item(0)
										.getTextContent();

								firstMinorSignature = eElement.getElementsByTagName("FirstMinorSignature").item(0)
										.getTextContent();

								firstMinorDate = eElement.getElementsByTagName("FirstMinorDate").item(0)
										.getTextContent();

								departmentNameFirstMinor = eElement.getElementsByTagName("DepartmentNameFirstMinor")
										.item(0).getTextContent();

								approvedByFirstMinor = eElement.getElementsByTagName("ApprovedByFirstMinor").item(0)
										.getTextContent();

								approvedByFirstMinorComment = eElement
										.getElementsByTagName("ApprovedByFirstMinorComment").item(0).getTextContent();

								secondMinorSignatureCHK = eElement.getElementsByTagName("SecondMinorSignatureCHK")
										.item(0).getTextContent();

								secondMinorAction = eElement.getElementsByTagName("SecondMinorAction").item(0)
										.getTextContent();

								secondMinorSignature = eElement.getElementsByTagName("SecondMinorSignature").item(0)
										.getTextContent();

								secondMinorDate = eElement.getElementsByTagName("SecondMinorDate").item(0)
										.getTextContent();

								approvedBySecondMinor = eElement.getElementsByTagName("ApprovedBySecondMinor").item(0)
										.getTextContent();

								departmentNameSecondtMinor = eElement.getElementsByTagName("DepartmentNameSecondtMinor")
										.item(0).getTextContent();

								approvedBySecondMinorComment = eElement
										.getElementsByTagName("ApprovedBySecondMinorComment").item(0).getTextContent();

								minorRecordsCHK = eElement.getElementsByTagName("MinorRecordsCHK").item(0)
										.getTextContent();

								minorRecordsSignature = eElement.getElementsByTagName("MinorRecordsSignature").item(0)
										.getTextContent();

								minorRecordsDate = eElement.getElementsByTagName("MinorRecordsDate").item(0)
										.getTextContent();

								firstCode = eElement.getElementsByTagName("FirstCode").item(0).getTextContent();

								secondCode = eElement.getElementsByTagName("SecondCode").item(0).getTextContent();

								minorBy = eElement.getElementsByTagName("MinorBy").item(0).getTextContent();

								minorRecordsComments = eElement.getElementsByTagName("MinorRecordsComments").item(0)
										.getTextContent();

								dropMinorRecordsSignatureCHK = eElement
										.getElementsByTagName("DropMinorRecordsSignatureCHK").item(0).getTextContent();

								dropMinorRecordsAction = eElement.getElementsByTagName("DropMinorRecordsAction").item(0)
										.getTextContent();

								dropMinorRecordsSignature = eElement.getElementsByTagName("DropMinorRecordsSignature")
										.item(0).getTextContent();

								dropMinorRecordsDate = eElement.getElementsByTagName("DropMinorRecordsDate").item(0)
										.getTextContent();

								dropMinorRecordsBy = eElement.getElementsByTagName("DropMinorRecordsBy").item(0)
										.getTextContent();

								dropMinorRecordsComment = eElement.getElementsByTagName("DropMinorRecordsComment")
										.item(0).getTextContent();

								declareCertificateCHK = eElement.getElementsByTagName("DeclareCertificateCHK").item(0)
										.getTextContent();

								declareCertificate = eElement.getElementsByTagName("DeclareCertificate").item(0)
										.getTextContent();

								declareCertificateAcadPlan = eElement.getElementsByTagName("DeclareCertificateAcadPlan")
										.item(0).getTextContent();

								dropCertificateCHK = eElement.getElementsByTagName("DropCertificateCHK").item(0)
										.getTextContent();

								dropCertificate = eElement.getElementsByTagName("DropCertificate").item(0)
										.getTextContent();

								dropCertificateAcadPlan = eElement.getElementsByTagName("DropCertificateAcadPlan")
										.item(0).getTextContent();

								certificateSignatureCHK = eElement.getElementsByTagName("CertificateSignatureCHK")
										.item(0).getTextContent();

								certificateAction = eElement.getElementsByTagName("CertificateAction").item(0)
										.getTextContent();

								certificateSignature = eElement.getElementsByTagName("CertificateSignature").item(0)
										.getTextContent();

								departmentNameFirstCertificate = eElement
										.getElementsByTagName("DepartmentNameFirstCertificate").item(0)
										.getTextContent();

								approvedByFirstCertificate = eElement.getElementsByTagName("ApprovedByFirstCertificate")
										.item(0).getTextContent();

								certificateDate = eElement.getElementsByTagName("CertificateDate").item(0)
										.getTextContent();

								approvedByFirstCertificateComment = eElement
										.getElementsByTagName("ApprovedByFirstCertificateComment").item(0)
										.getTextContent();

								certificateRecordsCHK = eElement.getElementsByTagName("CertificateRecordsCHK").item(0)
										.getTextContent();

								certificateRecordsSignature = eElement
										.getElementsByTagName("CertificateRecordsSignature").item(0).getTextContent();

								certificateRecordsDate = eElement.getElementsByTagName("CertificateRecordsDate").item(0)
										.getTextContent();

								certificateCode = eElement.getElementsByTagName("CertificateCode").item(0)
										.getTextContent();

								certificateBy = eElement.getElementsByTagName("CertificateBy").item(0).getTextContent();

								certificateRecordsComments = eElement.getElementsByTagName("CertificateRecordsComments")
										.item(0).getTextContent();

								dropCertificateRecordsSignatureCHK = eElement
										.getElementsByTagName("DropCertificateRecordsSignatureCHK").item(0)
										.getTextContent();

								dropCertificateRecordsAction = eElement
										.getElementsByTagName("DropCertificateRecordsAction").item(0).getTextContent();

								dropCertificateRecordsSignature = eElement
										.getElementsByTagName("DropCertificateRecordsSignature").item(0)
										.getTextContent();

								dropCertificateRecordsDate = eElement.getElementsByTagName("DropCertificateRecordsDate")
										.item(0).getTextContent();

								dropCertificateRecordsBy = eElement.getElementsByTagName("DropCertificateRecordsBy")
										.item(0).getTextContent();

								dropCertificateRecordsComment = eElement
										.getElementsByTagName("DropCertificateRecordsComment").item(0).getTextContent();

								dataMapFormInfo = new LinkedHashMap<String, Object>();
								dataMapFormInfo.put("CASE_ID", caseId);
								dataMapFormInfo.put("STUDENT_LASTNAME", studentLastName);
								dataMapFormInfo.put("STUDENT_FIRSTNAME", studentFirstName);
								dataMapFormInfo.put("STUDENT_CWID", studentCWID);
								dataMapFormInfo.put("STUDENT_PHONE", studentPhone);

								Object studentDateObj = null;
								if (studentDate != null && studentDate != "") {
									Date studentDateNew = Date.valueOf(studentDate);
									studentDateObj = studentDateNew;
								}
								dataMapFormInfo.put("STUDENT_DATE", studentDateObj);
								dataMapFormInfo.put("STUDENT_SIGNATURE", studentSignature);
								dataMapFormInfo.put("STUDENT_EMAIL", studentEmail);
								dataMapFormInfo.put("NEW_MAJORCHK", currentMajorToNewMajorCHK);
								dataMapFormInfo.put("CURR_MAJOR", currentMajor);
								dataMapFormInfo.put("CURR_MAJOR_CODE", currentMajorAcadPlanCode);
								dataMapFormInfo.put("NEW_MAJOR", newMajor);
								dataMapFormInfo.put("NEW_MAJOR_CODE", newMajorAcadPlanCode);
								dataMapFormInfo.put("ADD_SEC_MAJORCHK", addSecondMajorCHK);
								dataMapFormInfo.put("ADD_SEC_MAJOR", addSecondMajor);
								dataMapFormInfo.put("ADD_SEC_MAJOR_ACADCODE", addSecondMajorAcadCode);
								dataMapFormInfo.put("CHANGE_ADDI_MAJORCHK", changeAdditionalMajorCHK);
								dataMapFormInfo.put("CHANGE_ADDI_CURR_MAJOR", changeAdditionalCurrentMajor);
								dataMapFormInfo.put("CHANGE_ADDI_CURR_MAJOR_CODE",
										changeAdditionalCurrentMajorAcadCode);
								dataMapFormInfo.put("CHANGE_ADD_NEW_MAJOR", changeAdditionalNewMajor);
								dataMapFormInfo.put("CHANGE_ADDI_NEW_MAJOR_CODE", changeAdditionalNewMajorAcadCode);
								dataMapFormInfo.put("DROP_SECOND_MAJORCHK", dropSecondMajorCHK);
								dataMapFormInfo.put("MAJOR_TO_DROP", majorToDrop);
								dataMapFormInfo.put("MAJOR_TO_DROP_CODE", majorToDropAcadPlanCode);
								dataMapFormInfo.put("DEPT_SIGN_NEW_MAJORCHK", departmentSignatureNewMajorCHK);
								dataMapFormInfo.put("DEPT_SIGN_NEW_MAJOR_ACT", departmentSignatureNewMajorAction);
								dataMapFormInfo.put("DEPT_SIGN_NEW_MAJOR", departmentSignNewMajor);

								Object departmentNewMajorDateObj = null;
								if (departmentNewMajorDate != null && departmentNewMajorDate != "") {
									Date departmentNewMajorDateNew = Date.valueOf(departmentNewMajorDate);
									departmentNewMajorDateObj = departmentNewMajorDateNew;
								}
								dataMapFormInfo.put("DEPT_NEW_MAJOR_DATE", departmentNewMajorDateObj);
								dataMapFormInfo.put("DEPT_NAME_NEW_MAJOR", departmentNameNewMajor);
								dataMapFormInfo.put("DEPT_NEW_MAJOR_COMMENT", departmentNewMajorComment);
								dataMapFormInfo.put("DEPT_SIGN_SECOND_MAJORCHK", departmentSignatureAddSecondMajorCHK);
								dataMapFormInfo.put("DEPT_SIGN_SECOND_MAJOR_ACT",
										departmentSignatureAddSecondMajorAction);
								dataMapFormInfo.put("DEPT_SIGN_SECOND_MAJOR", departmentSignatureAddSecondMajor);

								Object departmentAddSecondMajorDateObj = null;
								if (departmentAddSecondMajorDate != null && departmentAddSecondMajorDate != "") {
									Date departmentAddSecondMajorDateNew = Date.valueOf(departmentAddSecondMajorDate);
									departmentAddSecondMajorDateObj = departmentAddSecondMajorDateNew;
								}
								dataMapFormInfo.put("DEPT_SECOND_MAJOR_DATE", departmentAddSecondMajorDateObj);
								dataMapFormInfo.put("DEPT_NAME_SECOND_MAJOR", departmentNameAddSecondMajor);
								dataMapFormInfo.put("DEPT_SECOND_MAJOR_COMMENT", departmentAddSecondMajorComment);
								dataMapFormInfo.put("DROP_MAJOR_RECORDS_SIGNCHK", dropMajorRecordsSignatureCHK);
								dataMapFormInfo.put("DROP_MAJOR_RECORDS_ACTION", dropMajorRecordsAction);
								dataMapFormInfo.put("DROP_MAJOR_RECORDS_SIGN", dropMajorRecordsSignature);

								Object dropMajorRecordsDateObj = null;
								if (dropMajorRecordsDate != null && dropMajorRecordsDate != "") {
									Date dropMajorRecordsDateNew = Date.valueOf(dropMajorRecordsDate);
									dropMajorRecordsDateObj = dropMajorRecordsDateNew;
								}
								dataMapFormInfo.put("DROP_MAJOR_RECORDS_DATE", dropMajorRecordsDateObj);
								dataMapFormInfo.put("DROP_MAJOR_RECORDS_BY", dropMajorRecordsBy);
								dataMapFormInfo.put("DROP_MAJOR_RECORDS_COMMENT", dropMajorRecordsComment);
								dataMapFormInfo.put("MAJOR_RECORDS_ACTION", majorRecordsAction);
								dataMapFormInfo.put("MAJOR_RECORDS_SIGN", majorRecordsSignature);

								Object majorRecordsDateObj = null;
								if (majorRecordsDate != null && majorRecordsDate != "") {
									Date majorRecordsDateNew = Date.valueOf(majorRecordsDate);
									majorRecordsDateObj = majorRecordsDateNew;
								}
								dataMapFormInfo.put("MAJOR_RECORDS_DATE", majorRecordsDateObj);
								dataMapFormInfo.put("MAJOR_CODE", majorCode);
								dataMapFormInfo.put("SECOND_MAJOR_CODE", secondaMajorCode);
								dataMapFormInfo.put("MAJOR_BY", majorBy);
								dataMapFormInfo.put("MAJOR_RECORD_COMMENT", majorRecordComment);
								dataMapFormInfo.put("ADD_MAJOR_RECORDS_ACTION", addMajorRecordsAction);
								dataMapFormInfo.put("ADD_MAJOR_RECORDS_SIGN", addMajorRecordsSignature);

								Object addMajorRecordsDateObj = null;
								if (addMajorRecordsDate != null && addMajorRecordsDate != "") {
									Date addMajorRecordsDateNew = Date.valueOf(addMajorRecordsDate);
									addMajorRecordsDateObj = addMajorRecordsDateNew;
								}
								dataMapFormInfo.put("ADD_MAJOR_RECORDS_DATE", addMajorRecordsDateObj);
								dataMapFormInfo.put("ADD_MAJOR_BY", addMajorBy);
								dataMapFormInfo.put("ADD_MAJOR_RECORD_COMMENT", addMajorRecordsComment);

								dataMapFormInfo.put("DECLARE_MINORCHK", declareMinorCHK);
								dataMapFormInfo.put("DECLARE_MINOR", declareMinor);
								dataMapFormInfo.put("DECLARE_MINOR_CODE", declareMinorAcadPlan);
								dataMapFormInfo.put("ADD_SECOND_THIRD_MINORCHK", addSecondOrThirdMinorCHK);
								dataMapFormInfo.put("ADD_SECOND_THIRD_MINOR", addSecondOrThirdMinor);
								dataMapFormInfo.put("ADD_SECOND_THIRD_MINOR_CODE", addSecondOrThirdMinorAcadPlan);
								dataMapFormInfo.put("DROP_MINORCHK", dropMinorCHK);
								dataMapFormInfo.put("DROP_MINOR", dropMinor);
								dataMapFormInfo.put("DROP_MINOR_CODE", dropMinorAcadPlan);
								dataMapFormInfo.put("CHANGE_MINORCHK", changeMinorCHK);
								dataMapFormInfo.put("CHANGE_CURR_MINOR", changeCurrentMinor);
								dataMapFormInfo.put("CHANGE_CURR_MINOR_CODE", changeCurrentMinorAcadPlan);
								dataMapFormInfo.put("CHANGE_NEW_MINOR", changeNewMinor);
								dataMapFormInfo.put("CHANGE_NEW_MINOR_CODE", changeNewMinorAcadPlan);
								dataMapFormInfo.put("FIRST_MINOR_SIGNCHK", firstMinorSignatureCHK);
								dataMapFormInfo.put("FIRST_MINOR_ACT", firstMinorAction);
								dataMapFormInfo.put("FIRST_MINOR_SIGN", firstMinorSignature);

								Object firstMinorDateObj = null;
								if (firstMinorDate != null && firstMinorDate != "") {
									Date firstMinorDateNew = Date.valueOf(firstMinorDate);
									firstMinorDateObj = firstMinorDateNew;
								}
								dataMapFormInfo.put("FIRST_MINOR_DATE", firstMinorDateObj);

								dataMapFormInfo.put("APPROVED_BY_FIRST_MINOR", approvedByFirstMinor);
								dataMapFormInfo.put("DEPT_NAME_FIR_MINOR", departmentNameFirstMinor);
								dataMapFormInfo.put("APPR_BY_FIR_MINOR_COMMENT", approvedByFirstMinorComment);
								dataMapFormInfo.put("SECOND_MINOR_SIGNCHK", secondMinorSignatureCHK);
								dataMapFormInfo.put("SECOND_MINOR_ACT", secondMinorAction);
								dataMapFormInfo.put("SECOND_MINOR_SIGN", secondMinorSignature);

								Object secondMinorDateObj = null;
								if (secondMinorDate != null && secondMinorDate != "") {
									Date secondMinorDateNew = Date.valueOf(secondMinorDate);
									secondMinorDateObj = secondMinorDateNew;
								}
								dataMapFormInfo.put("SECOND_MINOR_DATE", secondMinorDateObj);
								dataMapFormInfo.put("APPROVED_BY_SEC_MINOR", approvedBySecondMinor);
								dataMapFormInfo.put("DEPT_NAME_SEC_MINOR", departmentNameSecondtMinor);
								dataMapFormInfo.put("APPR_BY_SEC_MINOR_COMMENT", approvedBySecondMinorComment);
								dataMapFormInfo.put("MINOR_RECORDSCHK", minorRecordsCHK);
								dataMapFormInfo.put("MINOR_RECORDS_SIGN", minorRecordsSignature);

								Object minorRecordsDateObj = null;
								if (minorRecordsDate != null && minorRecordsDate != "") {
									Date minorRecordsDateNew = Date.valueOf(minorRecordsDate);
									minorRecordsDateObj = minorRecordsDateNew;
								}
								dataMapFormInfo.put("MINOR_RECORDS_DATE", minorRecordsDateObj);
								dataMapFormInfo.put("FIRST_CODE", firstCode);
								dataMapFormInfo.put("SECOND_CODE", secondCode);
								dataMapFormInfo.put("MINOR_BY", minorBy);
								dataMapFormInfo.put("MINOR_RECORDS_COMMENTS", minorRecordsComments);
								dataMapFormInfo.put("DROP_MINOR_RECORDS_SIGNCHK", dropMinorRecordsSignatureCHK);
								dataMapFormInfo.put("DROP_MINOR_RECORDS_ACT", dropMinorRecordsAction);
								dataMapFormInfo.put("DROP_MINOR_RECORDS_SIGN", dropMinorRecordsSignature);

								Object dropMinorRecordsDateObj = null;
								if (dropMinorRecordsDate != null && dropMinorRecordsDate != "") {
									Date dropMinorRecordsDateNew = Date.valueOf(dropMinorRecordsDate);
									dropMinorRecordsDateObj = dropMinorRecordsDateNew;
								}
								dataMapFormInfo.put("DROP_MINOR_RECORDS_DATE", dropMinorRecordsDateObj);
								dataMapFormInfo.put("DROP_MINOR_RECORDS_BY", dropMinorRecordsBy);
								dataMapFormInfo.put("DROP_MINOR_RECORDS_COMMENT", dropMinorRecordsComment);
								dataMapFormInfo.put("DECLARE_CERTCHK", declareCertificateCHK);
								dataMapFormInfo.put("DECLARE_CERT", declareCertificate);
								dataMapFormInfo.put("DECLARE_CERT_CODE", declareCertificateAcadPlan);
								dataMapFormInfo.put("DROP_CERTCHK	", dropCertificateCHK);
								dataMapFormInfo.put("DROP_CERT", dropCertificate);
								dataMapFormInfo.put("DROP_CERT_CODE", dropCertificateAcadPlan);
								dataMapFormInfo.put("CERT_SIGNCHK", certificateSignatureCHK);
								dataMapFormInfo.put("CERT_ACTION", certificateAction);
								dataMapFormInfo.put("CERT_SIGN", certificateSignature);
								dataMapFormInfo.put("DEPT_NAME_CERT", departmentNameFirstCertificate);
								dataMapFormInfo.put("APPR_BY_CERT", approvedByFirstCertificate);

								Object certificateDateObj = null;
								if (certificateDate != null && certificateDate != "") {
									Date dropMinorRecordsDateNew = Date.valueOf(certificateDate);
									certificateDateObj = dropMinorRecordsDateNew;
								}
								dataMapFormInfo.put("CERT_DATE", certificateDateObj);
								dataMapFormInfo.put("APPR_BY_CERT_COMMENT", approvedByFirstCertificateComment);
								dataMapFormInfo.put("CERT_RECORDSCHK", certificateRecordsCHK);
								dataMapFormInfo.put("CERT_RECORDS_SIGN", certificateRecordsSignature);
								Object certificateRecordsDateObj = null;
								if (certificateRecordsDate != null && certificateRecordsDate != "") {
									Date certificateRecordsDateNew = Date.valueOf(certificateRecordsDate);
									certificateRecordsDateObj = certificateRecordsDateNew;
								}
								dataMapFormInfo.put("CERT_RECORDS_DATE", certificateRecordsDateObj);
								dataMapFormInfo.put("CERT_CODE", certificateCode);
								dataMapFormInfo.put("CERT_BY", certificateBy);
								dataMapFormInfo.put("CERT_RECORDS_COMMENTS", certificateRecordsComments);
								dataMapFormInfo.put("DROP_CERT_RECORDS_SIGNCHK", dropCertificateRecordsSignatureCHK);
								dataMapFormInfo.put("DROP_CERT_RECORDS_ACTION", dropCertificateRecordsAction);
								dataMapFormInfo.put("DROP_CERT_RECORDS_SIGN", dropCertificateRecordsSignature);

								Object dropCertificateRecordsDateObj = null;
								if (dropCertificateRecordsDate != null && dropCertificateRecordsDate != "") {
									Date dropCertificateRecordsDateNew = Date.valueOf(dropCertificateRecordsDate);
									dropCertificateRecordsDateObj = dropCertificateRecordsDateNew;
								}
								dataMapFormInfo.put("DROP_CERTI_RECORDS_DATE", dropCertificateRecordsDateObj);
								dataMapFormInfo.put("DROP_CERT_RECORDS_BY", dropCertificateRecordsBy);
								dataMapFormInfo.put("DROP_CERT_RECORDS_COMMENT", dropCertificateRecordsComment);

								try {
									CloudDbSaveUtil.saveFormData(tableName, formName, caseId, "CASE_ID",
											workflowInstanceID, dataMapFormInfo,
											"STUDENT_DATE,DEPT_NEW_MAJOR_DATE,DEPT_SECOND_MAJOR_DATE,DROP_MAJOR_RECORDS_DATE,MAJOR_RECORDS_DATE,ADD_MAJOR_RECORDS_DATE,FIRST_MINOR_DATE,SECOND_MINOR_DATE,MINOR_RECORDS_DATE,DROP_MINOR_RECORDS_DATE,CERT_DATE,CERT_RECORDS_DATE,DROP_CERTI_RECORDS_DATE");
								} catch (IOException ioException) {
									ioException.printStackTrace();
								}
							}
						}

					} catch (SAXException e) {
						log.error("SAXException=" + Arrays.toString(e.getStackTrace()));
					} catch (Exception e) {
						log.error("Exception From CSUFMajorMinorChangeDB=" + Arrays.toString(e.getStackTrace()));
					}

					finally {
						if (is != null) {
							try {
								is.close();
							} catch (Exception e) {
								log.error("Exception from Finally Block=" + Arrays.toString(e.getStackTrace()));
							}
						}
						if (conn != null) {
							try {
								conn.close();
							} catch (SQLException e) {
								log.error("SQLException from Finally Block=" + Arrays.toString(e.getStackTrace()));
							}

						}
					}

				}
			}
	}
}
