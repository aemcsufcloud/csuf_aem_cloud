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

@Component(property = { "service.description=Parent Dependents Verification DB Save", "service.vendor=ThoughtFocus",
		"process.label=ParentDependentsVerificationDB" })
public class ParentDependentsVerificationDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(ParentDependentsVerificationDB.class);

	String name = "";
	String dob = "";
	String currentrb = "";
	String income = "";
	String source = "";
	String relationship = "";
	String claimTaxCheck = "";
	
	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String parentTableName = "AEM_PARENT_DEPENDENTS";
		String childTableName = "AEM_PARENT_DEP_INFO";
		String formName = "Parent Dependents Verification";
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
						String aidYear = XMLUtils.getChildNodeContent(afBoundDataElement, "aidYear");
						String fName = XMLUtils.getChildNodeContent(afBoundDataElement, "firstName");
						String lName = XMLUtils.getChildNodeContent(afBoundDataElement, "lastName");
						String financialAidYear = XMLUtils.getChildNodeContent(afBoundDataElement, "financialAidYear");
						
						String formCode = XMLUtils.getChildNodeContent(afBoundDataElement, "formCode");
						String dependentCheck = XMLUtils.getChildNodeContent(afBoundDataElement, "CheckBox1");
						String dependent = "";
						if (dependentCheck.equals("1")) {
							dependent = "Yes";
						} else {
							dependent = "No";
						}
						
					
						String parentEmail = XMLUtils.getChildNodeContent(afBoundDataElement, "ParentEmail");
						String studentSign = XMLUtils.getChildNodeContent(afBoundDataElement, "studentSignature");
						String studentSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "studentSignDate");
						String ipAddress = XMLUtils.getChildNodeContent(afBoundDataElement, "ipAddress");
						String studentEmail = XMLUtils.getChildNodeContent(afBoundDataElement, "HiddenStudentEmail");
						String studentUserID = XMLUtils.getChildNodeContent(afBoundDataElement, "HiddenStudentUserID");
						String studentFullName = XMLUtils.getChildNodeContent(afBoundDataElement, "HiddenStudentName");

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
						dataMapInfo.put("AID_YEAR", aidYear);
						dataMapInfo.put("FINANCIAL_AID_YEAR", financialAidYear);
						
						dataMapInfo.put("FORM_NAME", formName);
						dataMapInfo.put("FORM_CODE", formCode);
						dataMapInfo.put("DEPENDENT_CHECK", dependent);
						dataMapInfo.put("PARENT_EMAIL", parentEmail);

						dataMapInfo.put("STUDENT_SIGN", studentSign);
						Object studentSignDateObj = null;
						if (studentSignDate != null && studentSignDate != "") {
							Date studentSignDateNew = Date.valueOf(studentSignDate);
							studentSignDateObj = studentSignDateNew;
						}
						dataMapInfo.put("STUDENT_SIGN_DATE", studentSignDateObj);
						dataMapInfo.put("IP_ADDRESS", ipAddress);
						dataMapInfo.put("STUDENT_EMAIL", studentEmail);
						dataMapInfo.put("STUDENT_USERID", studentUserID);
						dataMapInfo.put("FIN_AID_SIGN", finanicialAidSign);
						dataMapInfo.put("STUDENT_FULLNAME", studentFullName);

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

						dependentDetails(formName, finanicialAidSign, afBoundDataElement, childTableName,
								caseId, workflowInstanceID, cwid, conn); // Method to insert the data from the Grid

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
		} finally {
			if (null != is) {
				try {
					is.close();
				} catch (IOException e) {
					log.error("IO Exception in ParentDependentsVerificationDB " + Arrays.toString(e.getStackTrace()));
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error("SQL Exception in ParentDependentsVerificationDB " + Arrays.toString(e.getStackTrace()));
				}

			}
		}
	}

	public void dependentDetails(String formName, String financialAidSign,
			Element afBoundDataElement, String childTableName, String caseId, String workflowInstanceID, String cwid,
			Connection conn) {
		log.info("Inside child member table");
		DatabaseUtils dbUtil = new DatabaseUtils();
		LinkedHashMap<String, Object> memberDataMapInfo = null;
		// LinkedHashMap<String, Object> studentDataMapInfo = null;

		if (financialAidSign.isEmpty()) {

			for (int j = 0; j < afBoundDataElement.getElementsByTagName("Row2").getLength(); j++) {

				for (int k = 0; k < afBoundDataElement.getElementsByTagName("Row2").item(j).getChildNodes()
						.getLength(); k++) {
					String nodeName = afBoundDataElement.getElementsByTagName("Row2").item(j).getChildNodes().item(k)
							.getNodeName();

					String nodeValue = afBoundDataElement.getElementsByTagName("Row2").item(j).getChildNodes()
							.item(k).getTextContent();

					if (nodeName.contains("DependentName")) {
						name = nodeValue;
					}
					if (nodeName.contains("DOBDependent")) {
						dob = nodeValue;
					}
					if (nodeName.contains("CurrentRBYN")) {
						currentrb = nodeValue;
					}
					if (nodeName.contains("TotalIncome")) {
						income = nodeValue;
					}
					if (nodeName.contains("Source")) {
						source = nodeValue;
					}
					if (nodeName.contains("Relationship")) {
						relationship = nodeValue;
					}
					if (nodeName.contains("TaxRadioButtonList")) {
						claimTaxCheck = nodeValue;
					}
				}
				
				memberDataMapInfo = new LinkedHashMap<String, Object>();

				memberDataMapInfo.put("CASEID", caseId);
				memberDataMapInfo.put("CWID", cwid);
				memberDataMapInfo.put("FORM_NAME", formName);
				memberDataMapInfo.put("FULL_NAME", name);
				memberDataMapInfo.put("DOB", dob);
				
				String currentPerson = "";
				if (currentrb.equals("1")) {
					currentPerson = "Yes";
				} else if (currentrb.equals("2")) {
					currentPerson = "No";
				}
				memberDataMapInfo.put("CURRENT_PERSON", currentPerson);
				memberDataMapInfo.put("TOTAL_INCOME", income);
				memberDataMapInfo.put("SOURCE", source);
				memberDataMapInfo.put("RELATIONSHIP", relationship);
				String claimTax = "";
				if (claimTaxCheck.equals("1")) {
					claimTax = "Yes";
				} else if (claimTaxCheck.equals("2")) {
					claimTax = "No";
				}
				memberDataMapInfo.put("CLAIM_TAX", claimTax);
				
				memberDataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

				dbUtil.insertFormData(conn, memberDataMapInfo, childTableName, formName);

			}
		}
	}
}