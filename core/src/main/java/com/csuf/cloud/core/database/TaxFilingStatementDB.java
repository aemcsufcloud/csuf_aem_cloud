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

@Component(property = { "service.description==Tax Filing Statement DB Save",
		"process.label" + "=ParentAndStudentTaxFilingStatementDB" })
public class TaxFilingStatementDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(TaxFilingStatementDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_TAX_FILING_STATEMENT";
		String formName = "";
		String filedITReturn = "";
		String reason = "";
		String dateOfSeparation = "";
		String employeeName1 = "";
		String employeeName2 = "";
		String employeeName3 = "";
		String amountEarned1 = "";
		String amountEarned2 = "";
		String amountEarned3 = "";
		String assignee = "";
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
						String aidYear = XMLUtils.getChildNodeContent(afBoundDataElement, "aidYear");
						String emailSubject = XMLUtils.getChildNodeContent(afBoundDataElement, "EmailSubject");

						if (requestType.equals("CDA") && emailSubject.contains("Parent Tax Filing Statement Request")) {
							formName = "Parent Tax Filing Statement Request";
							String filedITReturnCDAYes = XMLUtils.getChildNodeContent(afBoundDataElement, "yesCHK");
							String filedITReturnCDANo = XMLUtils.getChildNodeContent(afBoundDataElement, "noCHK");
							if (filedITReturnCDAYes.equals("1")) {
								filedITReturn = "Yes";
							} else if (filedITReturnCDANo.equals("1")) {
								filedITReturn = "No";
							}

							String noUseIRSCDA = XMLUtils.getChildNodeContent(afBoundDataElement, "noUseIRSCHK");
							String separatedCDA = XMLUtils.getChildNodeContent(afBoundDataElement, "separatedCHK");
							String separatedDateCDA = XMLUtils.getChildNodeContent(afBoundDataElement, "separatedDate");
							String taxExtensionCDA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"taxExtensionCHK");
							String foreignTaxCDA = XMLUtils.getChildNodeContent(afBoundDataElement, "foreignTaxCHK");
							if (filedITReturnCDAYes.equals("1") && noUseIRSCDA.equals("1")) {
								reason = "I am unable to OR choose not to use the IRS DRT";
								dateOfSeparation = "N/A";
							} else if (filedITReturnCDAYes.equals("1") && separatedCDA.equals("1")) {
								reason = "My filing status was Married Filing Jointly; however I have since separated";
								dateOfSeparation = separatedDateCDA;
							} else if (filedITReturnCDAYes.equals("1") && taxExtensionCDA.equals("1")) {
								reason = "I/we have filed a Tax Extension";
								dateOfSeparation = "N/A";
							} else if (filedITReturnCDAYes.equals("1") && foreignTaxCDA.equals("1")) {
								reason = "I/we have filed a ".concat(aidYear).concat(" Foreign Tax Return");
								dateOfSeparation = "N/A";
							}

							String noIncomeCDA = XMLUtils.getChildNodeContent(afBoundDataElement, "noIncomeCHK");
							String notRequireFileCDA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"notRequireFileCHK");
							String employeeName1CDA = XMLUtils.getChildNodeContent(afBoundDataElement, "employeeName1");
							String employeeName2CDA = XMLUtils.getChildNodeContent(afBoundDataElement, "employeeName2");
							String employeeName3CDA = XMLUtils.getChildNodeContent(afBoundDataElement, "employeeName3");
							String amountEarned1CDA = XMLUtils.getChildNodeContent(afBoundDataElement, "amount1");
							String amountEarned2CDA = XMLUtils.getChildNodeContent(afBoundDataElement, "amount2");
							String amountEarned3CDA = XMLUtils.getChildNodeContent(afBoundDataElement, "amount3");
							if (filedITReturnCDANo.equals("1") && noIncomeCDA.equals("1")) {
								reason = "I was not employed and had no income earned from work in ".concat(aidYear);
								dateOfSeparation = "N/A";
								employeeName1 = employeeName1CDA;
								employeeName2 = employeeName2CDA;
								employeeName3 = employeeName3CDA;
								amountEarned1 = amountEarned1CDA;
								amountEarned2 = amountEarned2CDA;
								amountEarned3 = amountEarned3CDA;

							} else if (filedITReturnCDANo.equals("1") && notRequireFileCDA.equals("1")) {
								reason = "I was employed in ".concat(aidYear).concat(" but not required to file");
								dateOfSeparation = "N/A";
								employeeName1 = employeeName1CDA;
								employeeName2 = employeeName2CDA;
								employeeName3 = employeeName3CDA;
								amountEarned1 = amountEarned1CDA;
								amountEarned2 = amountEarned2CDA;
								amountEarned3 = amountEarned3CDA;
							}
						} else if (requestType.equals("FAFSA")
								&& emailSubject.contains("Parent Tax Filing Statement Request")) {
							formName = "Parent Tax Filing Statement Request";
							String filedITReturnFAFSAYes = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_yesCHK");
							String filedITReturnFAFSNo = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_noCHK");
							if (filedITReturnFAFSAYes.equals("1")) {
								filedITReturn = "Yes";
							} else if (filedITReturnFAFSNo.equals("1")) {
								filedITReturn = "No";
							}

							String noUseIRSFAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_noUseIRSCHK");
							String separatedFAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_separatedCHK");
							String separatedDateFAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_separatedDate");
							String taxExtensionFAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_taxExtensionCHK");
							String foreignTaxFAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_foreignTaxCHK");
							if (filedITReturnFAFSAYes.equals("1") && noUseIRSFAFSA.equals("1")) {
								reason = "I am unable or choose not to use the IRS DRT";
								dateOfSeparation = "N/A";
							} else if (filedITReturnFAFSAYes.equals("1") && separatedFAFSA.equals("1")) {
								reason = "My filing status was Married Filing Jointly; however I have since separated";
								dateOfSeparation = separatedDateFAFSA;
							} else if (filedITReturnFAFSAYes.equals("1") && taxExtensionFAFSA.equals("1")) {
								reason = "I/we have filed a Tax Extension";
								dateOfSeparation = "N/A";
							} else if (filedITReturnFAFSAYes.equals("1") && foreignTaxFAFSA.equals("1")) {
								reason = "I/we have filed a ".concat(aidYear).concat(" Foreign Tax Return");
								dateOfSeparation = "N/A";
							}

							String noIncomeFAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_noIncomeCHK");
							String notRequireFileFAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_notRequireFileCHK");
							String employeeName1FAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_employeeName1");
							String employeeName2FAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_employeeName2");
							String employeeName3FAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_employeeName3");
							String amountEarned1FAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_amount1");
							String amountEarned2FAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_amount2");
							String amountEarned3FAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_amount3");
							if (filedITReturnFAFSNo.equals("1") && noIncomeFAFSA.equals("1")) {
								reason = "I was not employed and had no income earned from work in ".concat(aidYear);
								dateOfSeparation = "N/A";
								employeeName1 = employeeName1FAFSA;
								employeeName2 = employeeName2FAFSA;
								employeeName3 = employeeName3FAFSA;
								amountEarned1 = amountEarned1FAFSA;
								amountEarned2 = amountEarned2FAFSA;
								amountEarned3 = amountEarned3FAFSA;

							} else if (filedITReturnFAFSNo.equals("1") && notRequireFileFAFSA.equals("1")) {
								reason = "I was employed in ".concat(aidYear).concat(" but not required to file");
								dateOfSeparation = "N/A";
								employeeName1 = employeeName1FAFSA;
								employeeName2 = employeeName2FAFSA;
								employeeName3 = employeeName3FAFSA;
								amountEarned1 = amountEarned1FAFSA;
								amountEarned2 = amountEarned2FAFSA;
								amountEarned3 = amountEarned3FAFSA;
							}
						} else if (requestType.equals("CDA")
								&& emailSubject.contains("Student Tax Filing Statement Request")) {
							formName = "Student Tax Filing Statement Request";
							String filedITReturnCDAYes = XMLUtils.getChildNodeContent(afBoundDataElement, "yesCHK");
							String filedITReturnCDANo = XMLUtils.getChildNodeContent(afBoundDataElement, "noCHK");
							if (filedITReturnCDAYes.equals("1")) {
								filedITReturn = "Yes";
							} else if (filedITReturnCDANo.equals("1")) {
								filedITReturn = "No";
							}

							String noUseIRSCDA = XMLUtils.getChildNodeContent(afBoundDataElement, "noUseIRSCHK");
							String separatedCDA = XMLUtils.getChildNodeContent(afBoundDataElement, "separatedCHK");
							String separatedDateCDA = XMLUtils.getChildNodeContent(afBoundDataElement, "separatedDate");
							String taxExtensionCDA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"taxExtensionCHK");
							String foreignTaxCDA = XMLUtils.getChildNodeContent(afBoundDataElement, "foreignTaxCHK");
							if (filedITReturnCDAYes.equals("1") && noUseIRSCDA.equals("1")) {
								reason = "I have filed a ".concat(aidYear).concat(" Tax Return");
								dateOfSeparation = "N/A";
							} else if (filedITReturnCDAYes.equals("1") && separatedCDA.equals("1")) {
								reason = "My filing status was Married Filing Jointly; however I have since separated";
								dateOfSeparation = separatedDateCDA;
							} else if (filedITReturnCDAYes.equals("1") && taxExtensionCDA.equals("1")) {
								reason = "I/we have filed a Tax Extension";
								dateOfSeparation = "N/A";
							} else if (filedITReturnCDAYes.equals("1") && foreignTaxCDA.equals("1")) {
								reason = "I/we have filed a ".concat(aidYear).concat(" Foreign Tax Return");
								dateOfSeparation = "N/A";
							}

							String noIncomeCDA = XMLUtils.getChildNodeContent(afBoundDataElement, "noIncomeCHK");
							String notRequireFileCDA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"notRequireFileCHK");
							String employeeName1CDA = XMLUtils.getChildNodeContent(afBoundDataElement, "emploeeName1");
							String employeeName2CDA = XMLUtils.getChildNodeContent(afBoundDataElement, "employeeName2");
							String employeeName3CDA = XMLUtils.getChildNodeContent(afBoundDataElement, "employeeName3");
							String amountEarned1CDA = XMLUtils.getChildNodeContent(afBoundDataElement, "amount1");
							String amountEarned2CDA = XMLUtils.getChildNodeContent(afBoundDataElement, "amount2");
							String amountEarned3CDA = XMLUtils.getChildNodeContent(afBoundDataElement, "amount3");
							if (filedITReturnCDANo.equals("1") && noIncomeCDA.equals("1")) {
								reason = "I was not employed and had no income earned from work in ".concat(aidYear);
								dateOfSeparation = "N/A";
								employeeName1 = employeeName1CDA;
								employeeName2 = employeeName2CDA;
								employeeName3 = employeeName3CDA;
								amountEarned1 = amountEarned1CDA;
								amountEarned2 = amountEarned2CDA;
								amountEarned3 = amountEarned3CDA;

							} else if (filedITReturnCDANo.equals("1") && notRequireFileCDA.equals("1")) {
								reason = "I was employed in ".concat(aidYear).concat(" but not required to file");
								dateOfSeparation = "N/A";
								employeeName1 = employeeName1CDA;
								employeeName2 = employeeName2CDA;
								employeeName3 = employeeName3CDA;
								amountEarned1 = amountEarned1CDA;
								amountEarned2 = amountEarned2CDA;
								amountEarned3 = amountEarned3CDA;
							}
						} else if (requestType.equals("FAFSA")
								&& emailSubject.contains("Student Tax Filing Statement Request")) {
							formName = "Student Tax Filing Statement Request";
							String filedITReturnFAFSAYes = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_yesCHK");
							String filedITReturnFAFSNo = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_noCHK");
							if (filedITReturnFAFSAYes.equals("1")) {
								filedITReturn = "Yes";
							} else if (filedITReturnFAFSNo.equals("1")) {
								filedITReturn = "No";
							}

							String noUseIRSFAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_noUseIRSCHK");
							String separatedFAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_separatedCHK");
							String separatedDateFAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_separatedDate");
							String taxExtensionFAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_taxExtensionCHK");
							String foreignTaxFAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_foreignTaxCHK");
							if (filedITReturnFAFSAYes.equals("1") && noUseIRSFAFSA.equals("1")) {
								reason = "I am unable or choose not to use the IRS DRT";
								dateOfSeparation = "N/A";
							} else if (filedITReturnFAFSAYes.equals("1") && separatedFAFSA.equals("1")) {
								reason = "My filing status was Married Filing Jointly; however I have since separated";
								dateOfSeparation = separatedDateFAFSA;
							} else if (filedITReturnFAFSAYes.equals("1") && taxExtensionFAFSA.equals("1")) {
								reason = "I/we have filed a Tax Extension";
								dateOfSeparation = "N/A";
							} else if (filedITReturnFAFSAYes.equals("1") && foreignTaxFAFSA.equals("1")) {
								reason = "I/we have filed a ".concat(aidYear).concat(" Foreign Tax Return");
								dateOfSeparation = "N/A";
							}

							String noIncomeFAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_noIncomeCHK");
							String notRequireFileFAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_notRequireFileCHK");
							String employeeName1FAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_emploeeName1");
							String employeeName2FAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_employeeName2");
							String employeeName3FAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_employeeName3");
							String amountEarned1FAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_amount1");
							String amountEarned2FAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_amount2");
							String amountEarned3FAFSA = XMLUtils.getChildNodeContent(afBoundDataElement,
									"fafsa_amount3");
							if (filedITReturnFAFSNo.equals("1") && noIncomeFAFSA.equals("1")) {
								reason = "I was not employed and had no income earned from work in ".concat(aidYear);
								dateOfSeparation = "N/A";
								employeeName1 = employeeName1FAFSA;
								employeeName2 = employeeName2FAFSA;
								employeeName3 = employeeName3FAFSA;
								amountEarned1 = amountEarned1FAFSA;
								amountEarned2 = amountEarned2FAFSA;
								amountEarned3 = amountEarned3FAFSA;

							} else if (filedITReturnFAFSNo.equals("1") && notRequireFileFAFSA.equals("1")) {
								reason = "I was employed in ".concat(aidYear).concat(" but not required to file");
								dateOfSeparation = "N/A";
								employeeName1 = employeeName1FAFSA;
								employeeName2 = employeeName2FAFSA;
								employeeName3 = employeeName3FAFSA;
								amountEarned1 = amountEarned1FAFSA;
								amountEarned2 = amountEarned2FAFSA;
								amountEarned3 = amountEarned3FAFSA;
							}
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
						dataMapInfo.put("FORM_NAME", formName);
						dataMapInfo.put("REQUEST_TYPE", requestType);
						dataMapInfo.put("FORM_CODE", formCode);

						dataMapInfo.put("FILED_IT_RETURN", filedITReturn);
						dataMapInfo.put("REASON", reason);
						dataMapInfo.put("DATE_OF_SEPARATION", dateOfSeparation);
						dataMapInfo.put("EMPLOYRS_NAME1", employeeName1);
						dataMapInfo.put("AMOUNT_EARNED1", amountEarned1);
						dataMapInfo.put("EMPLOYRS_NAME2", employeeName2);
						dataMapInfo.put("AMOUNT_EARNED2", amountEarned2);
						dataMapInfo.put("EMPLOYRS_NAME3", employeeName3);
						dataMapInfo.put("AMOUNT_EARNED3", amountEarned3);

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

						log.debug("dataMapInfo of TaxFilingStatementDB= {}", dataMapInfo);

						dbUtil.insertFormData(conn, dataMapInfo, tableName, formName);
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
		}
		finally {
			if (null != is) {
				try {
					is.close();
				} catch (IOException e) {
					log.error(
							"IO Exception in TaxFilingStatementDB " + Arrays.toString(e.getStackTrace()));
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error(
							"SQL Exception in TaxFilingStatementDB " + Arrays.toString(e.getStackTrace()));
				}

			}
		}
	}
}
