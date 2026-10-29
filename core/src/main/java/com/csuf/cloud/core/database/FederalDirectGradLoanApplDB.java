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
import org.xml.sax.SAXException;

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
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=CSUF Federal Direct Grad Loan Appl", "service.vendor=ThoughtFocus",
		"process.label=FederalDirectGradLoanApplDB" })

public class FederalDirectGradLoanApplDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(FederalDirectGradLoanApplDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_FEDERAL_DIRECT_GRAD_LOAN";
		String formName = "Federal Direct Grad Plus Loan";
		String assignee = "";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		if (StringUtils.isNotBlank(payloadPath)) {
			InputStream is = null;
			try {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");
				if (null != is) {
					Document doc = XMLUtils.getDomDocument(is);
					String data = "";
					try {
						data = XMLUtils.prettyPrintAsString(doc);
					} catch (Exception e1) {
						e1.printStackTrace();
					}
					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							try {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								dataMap.put("FIRST_LOAN", eElement.getElementsByTagName("FirstLoan").item(0).getTextContent());
						
								dataMap.put("STUDENT_CWID",
										eElement.getElementsByTagName("cwid").item(0).getTextContent());
                                cwid = eElement.getElementsByTagName("cwid").item(0).getTextContent();
								dataMap.put("CWID", eElement.getElementsByTagName("cwid").item(0).getTextContent());
								dataMap.put("STUDENT_NAME", eElement.getElementsByTagName("StudentName").item(0).getTextContent());
								dataMap.put("FIRST_NAME",
										eElement.getElementsByTagName("firstName").item(0).getTextContent());
								dataMap.put("LAST_NAME",
										eElement.getElementsByTagName("lastName").item(0).getTextContent());
								dataMap.put("MIDDLE_INITIAL",
										eElement.getElementsByTagName("MI").item(0).getTextContent());
								dataMap.put("LOAN_AMOUNT",
										eElement.getElementsByTagName("RequestLoanAmmount").item(0).getTextContent());
								dataMap.put("MAX_AMOUNT",
										eElement.getElementsByTagName("CBMaxAmount").item(0).getTextContent());
								dataMap.put("LOAN_PERIOD",
										eElement.getElementsByTagName("LoanPeriodCB").item(0).getTextContent());

								dataMap.put("CASE_ID",
										eElement.getElementsByTagName("caseId").item(0).getTextContent());

								dataMap.put("AID_YEAR",
										eElement.getElementsByTagName("aidYear").item(0).getTextContent());
								
								String initiatedDate = eElement.getElementsByTagName("Date_1").item(0).getTextContent();
								Object initiatedDateObj = "";
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatedDate);
									initiatedDateObj = initiatedDateNew;
								}
								dataMap.put("INITIATED_DATE", initiatedDateObj);
								
								dataMap.put("IP_ADDRESS", eElement.getElementsByTagName("ipAddress").item(0).getTextContent());
								dataMap.put("FORM_CODE", eElement.getElementsByTagName("formCode").item(0).getTextContent());
								
								dataMap.put("STUDENT_USERID",
										eElement.getElementsByTagName("HiddenStudentUserID").item(0).getTextContent());

								dataMap.put("STUDENT_SIGNATURE",
										eElement.getElementsByTagName("StudentSignature").item(0).getTextContent());
								String stuDate = eElement.getElementsByTagName("StudentSignDate").item(0)
										.getTextContent();
								Object stuDateObj = "";
								if (stuDate != null && stuDate != "") {
									Date stuDateNew = Date.valueOf(stuDate);
									stuDateObj = stuDateNew;
								}
								dataMap.put("STUDENT_SIGN_DATE", stuDateObj);
								dataMap.put("STUDENT_COMMENTS",
										eElement.getElementsByTagName("StudentComments").item(0).getTextContent());
								dataMap.put("PRINT_STUDENT_NAME",
										eElement.getElementsByTagName("PrintStudentName").item(0).getTextContent());
							
								dataMap.put("FINANCIAL_AID_YEAR",
										eElement.getElementsByTagName("financialAidYear").item(0).getTextContent());
								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								dataMap.put("STUDENT_EMAIL",
										eElement.getElementsByTagName("HiddenStudentEmail").item(0).getTextContent());

								dataMap.put("FINANCIAL_AID_SIGN",
										eElement.getElementsByTagName("FinancialAidSign").item(0).getTextContent());
								String fsdate = eElement.getElementsByTagName("FinancialAidSignDate").item(0)
										.getTextContent();
								Object fsdateObj = "";
								if (fsdate != null && fsdate != "") {
									Date fsdateNew = Date.valueOf(fsdate);
									fsdateObj = fsdateNew;
								}
								dataMap.put("FINANCIAL_SIGN_DATE", fsdateObj);
								dataMap.put("FINANCIAL_COMMENTS",
										eElement.getElementsByTagName("staffComment").item(0).getTextContent());
								dataMap.put("FINANCIAL_AID_DECISION", eElement.getElementsByTagName("staffDecision").item(0).getTextContent());

								List<Route> backRoutesList = workflowSession.getBackRoutes(workItem, false);
								JsonArray backRoutesJson = new JsonArray();
								for (Route backRoute : backRoutesList) {
									backRoutesJson.add(backRoute.getName());
								}
								String saveHistoryBackRoute = "";
								if (backRoutesJson.size() == 1) {
									saveHistoryBackRoute = backRoutesList.get(0).getName();
								} else {
									saveHistoryBackRoute = backRoutesList.get(1).getName();
									String wId = workItem.getId().replace("VolatileWorkItem_", "/workItems/");
									String firstStr = wId.substring(0, wId.indexOf('_'));
									String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
									String t1 = firstStr.replaceAll("[^0-9]+", "");
									int a1 = Integer.parseInt(t1);
									a1 = a1 - 2;
									firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
									String workItemId = workflowInstanceID.concat(firstStr).concat("_")
											.concat(secString);
									assignee = taskService.getTaskAssignee(workItemId);
								}
								dataMap.put("LAST_STEP", saveHistoryBackRoute);
								if (dataMap.get("LAST_STEP").equals("Financial Aid Review")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNNING");
								}
								dataMap.put("LAST_STEP_ASSIGNEE", assignee);
								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
				
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
					
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "CWID",
							workflowInstanceID, dataMap,
							"INITIATED_DATE,STUDENT_SIGN_DATE,FINANCIAL_SIGN_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in FederalDirectGradLoanApplDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				/*if (conn != null) { try { conn.close(); } catch (SQLException e) { } }*/
			}
			

		}

	}

}
