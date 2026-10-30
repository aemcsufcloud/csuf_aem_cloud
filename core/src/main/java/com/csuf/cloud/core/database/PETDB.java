package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

@Component(property = { "service.description=Payroll Expenditure Transfer DB", "service.vendor=ThoughtFocus",
		"process.label=PETDB" })

public class PETDB implements WorkflowProcess {

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Reference
	private TaskService taskService;

	private static final Logger logger = LoggerFactory.getLogger(PETDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {
		Connection connection = null;
		String tableName = "AEM_PET";
		String childTableName = "AEM_PET_INFO";
		String assignee = "";
		String formName = "Payroll Expenditure Transfer Request";
		MetaDataMap metaDataMapVal = workItem.getWorkflow().getWorkflowData().getMetaDataMap();

		String fiscalYr = "";

		String caseid = "";

		String initiatedDateVal = "";

		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		connection = jdbcConnectionService.getDBConn(dataSourceVal);

		String payLoadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = wfSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		if (StringUtils.isNotBlank(payLoadPath)) {
			InputStream inputstream = null;
			try {
				inputstream = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payLoadPath, "Data.xml");

				if (inputstream != null) {
					Document doc = XMLUtils.getDomDocument(inputstream);
					String dataXML = XMLUtils.prettyPrintAsString(doc);

					Element afUnBoundDataElement = XMLUtils.getParentNode(doc, "afUnboundData");
					if (null != afUnBoundDataElement && afUnBoundDataElement.hasChildNodes()) {
						initiatedDateVal = XMLUtils.getChildNodeContent(afUnBoundDataElement, "InitiatedDateVal");
					}

					NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int i = 0; i < nList.getLength(); i++) {
						Node nNode = nList.item(i);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							try {
								Element element = (Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								logger.debug("index=" + i);
								fiscalYr = element.getElementsByTagName("FISCALYR").item(0).getTextContent();

								logger.debug("Fiscal Yr = " + fiscalYr);

								dataMap.put("FISCAL_YR", fiscalYr);

								caseid = element.getElementsByTagName("Case_ID").item(0).getTextContent();

								logger.debug("Case ID = " + caseid);

								dataMap.put("CASE_ID", caseid);
								dataMap.put("DATA_XML", dataXML);

								dataMap.put("SUBMITTED_BY",
										element.getElementsByTagName("SubmittedBy").item(0).getTextContent());
								String initiatorSignDate = element.getElementsByTagName("InitiatorSubmittedDate")
										.item(0).getTextContent();
								Object initiatorSignDateObj = "";
								if (initiatorSignDate != null && initiatorSignDate != "") {
									Date initiatorSignDateNew = Date.valueOf(initiatorSignDate);
									initiatorSignDateObj = initiatorSignDateNew;
								}
								dataMap.put("INITIATOR_SUBMITTED_DATE", initiatorSignDateObj);

								dataMap.put("INITIATOR_EMAIL",
										element.getElementsByTagName("InitiatorEmail").item(0).getTextContent());
								dataMap.put("INITIATOR_USER_ID",
										element.getElementsByTagName("InitiatorUserID").item(0).getTextContent());
								dataMap.put("TO_DEPT_APPROVER_USER_ID",
										element.getElementsByTagName("ApproverUserID_ToDept").item(0).getTextContent());
								dataMap.put("TO_DEPT_APPROVER_EMAIL",
										element.getElementsByTagName("ApproverEmail_ToDept").item(0).getTextContent());
								dataMap.put("TO_DEPT_APPROVAL",
										element.getElementsByTagName("ToDeptApproval").item(0).getTextContent());

								String toDeptapproverSignDate = element.getElementsByTagName("ToDeptApprovalDate")
										.item(0).getTextContent();
								Object toDeptapproverSignDateObj = "";
								if (toDeptapproverSignDate != null && toDeptapproverSignDate != "") {
									Date toDeptapproverSignDateNew = Date.valueOf(toDeptapproverSignDate);
									toDeptapproverSignDateObj = toDeptapproverSignDateNew;
								}
								dataMap.put("TO_DEPT_APPROVER_SIGN_DATE", toDeptapproverSignDateObj);

								dataMap.put("PROCESSED_BY",
										element.getElementsByTagName("ProcessedBy").item(0).getTextContent());

								String processSignDate = element.getElementsByTagName("ProcessDate").item(0)
										.getTextContent();
								Object processSignDateObj = "";
								if (processSignDate != null && processSignDate != "") {
									Date processSignDateNew = Date.valueOf(processSignDate);
									processSignDateObj = processSignDateNew;
								}
								dataMap.put("PROCESS_DATE", processSignDateObj);

								dataMap.put("JOURNAL_ID",
										element.getElementsByTagName("JournalID").item(0).getTextContent());
								String journalSignDate = element.getElementsByTagName("JournalDate").item(0)
										.getTextContent();
								Object journalSignDateObj = "";
								if (journalSignDate != null && journalSignDate != "") {
									Date journalSignDateNew = Date.valueOf(journalSignDate);
									journalSignDateObj = journalSignDateNew;
								}
								dataMap.put("JOURNAL_DATE", journalSignDateObj);

								String initiatedDate = initiatedDateVal;
								Object initiatedSignDateObj = "";
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatedDate);
									initiatedSignDateObj = initiatedDateNew;
								}
								dataMap.put("INITIATED_DATE", initiatedSignDateObj);

								dataMap.put("STAGE_INDICATOR",
										element.getElementsByTagName("StageIndicator").item(0).getTextContent());

								List<Route> backRoutesList = wfSession.getBackRoutes(workItem, false);
								JsonArray backRoutesJson = new JsonArray();
								for (Route backRoute : backRoutesList) {
									backRoutesJson.add(backRoute.getName());
								}
								String saveHistoryBackRoute = "";
								if (backRoutesJson.size() == 1) {
									saveHistoryBackRoute = backRoutesList.get(0).getName();
									logger.debug("Executing if block ");
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
									logger.debug("Executing else block assignee : {}", assignee);
								}
								dataMap.put("LAST_STEP", saveHistoryBackRoute);

								if (dataMap.get("LAST_STEP").equals("Budget Office Review")) {
									if (metaDataMapVal.containsKey("actionTakenByBudgetOffice")) {
										if (metaDataMapVal.get("actionTakenByBudgetOffice").toString()
												.equalsIgnoreCase("Approve")) {
											dataMap.put("WORKFLOW_STATUS", "COMPLETED");
											savePETData(element, connection, caseid, fiscalYr, workflowInstanceID, childTableName, formName);
										} else {
											dataMap.put("WORKFLOW_STATUS", "RUNNING");
										}
									} else {
										dataMap.put("WORKFLOW_STATUS", "RUNNING");
									}
								} else if(dataMap.get("LAST_STEP").equals("Initiator Review")) {
									if (metaDataMapVal.containsKey("actionTakenByInitiator")) {
										if (metaDataMapVal.get("actionTakenByInitiator").toString()
												.equalsIgnoreCase("Delete")) {
											dataMap.put("WORKFLOW_STATUS", "COMPLETED");
										} else {
											dataMap.put("WORKFLOW_STATUS", "RUNNING");
										}
									} else {
										dataMap.put("WORKFLOW_STATUS", "RUNNING");
									}
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNING");
								}
								dataMap.put("LAST_STEP_ASSIGNEE", assignee);

								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

								DatabaseUtils dbUtil = new DatabaseUtils();

								if (connection != null) {
									String resultData = dbUtil.getSPEEvalData(connection, fiscalYr, "FISCAL_YR",
											workflowInstanceID, tableName);
									if (resultData != null && !resultData.equals("")) {
										dbUtil.deleteSPEEvalData(connection, fiscalYr, "FISCAL_YR", workflowInstanceID,
												tableName);
										dbUtil.insertFormData(connection, dataMap, tableName, formName);
									} else {
										dbUtil.insertFormData(connection, dataMap, tableName, formName);
									}
								}

								logger.debug("Length= " + element.getElementsByTagName("Row1").getLength());

							} catch (Exception e) {
								logger.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				logger.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} catch (Exception e1) {
				e1.printStackTrace();
			} finally {
				if (null != inputstream)
					try {
						inputstream.close();
					} catch (IOException e) {
						logger.debug("IOException in PETDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
			}
			if (connection != null) {
				try {
					connection.close();
				} catch (SQLException e) {
				}
			}
		}
	}

	public void deletePETData(Connection conn, String caseId, String fiscalYr, String workflowInstance,
			String tableName) {
		ResultSet oRresultSet = null;
		String speSqlQuery = "";
		Statement oStatement = null;
		try {
			speSqlQuery = "delete from ".concat(tableName).concat(
					" where CASE_ID = ('<<case_id>>') and FISCAL_YR=('<<fiscal_yr>>') and WORKFLOW_INSTANCE_ID = ('<<cwid>>')");

			speSqlQuery = speSqlQuery.replaceAll("<<case_id>>", caseId);
			speSqlQuery = speSqlQuery.replaceAll("<<fiscal_yr>>", fiscalYr);
			speSqlQuery = speSqlQuery.replaceAll("<<cwid>>", workflowInstance);
			logger.debug("Final SQL1: {}", speSqlQuery);
			oStatement = conn.createStatement();
			oRresultSet = oStatement.executeQuery(speSqlQuery);
		} catch (Exception oEx) {
			logger.error(Arrays.toString(oEx.getStackTrace()));
		}
	}

	public String getPETData(Connection conn, String caseId, String fiscalYr, String workflowInstance,
			String tableName) {
		String resData = "";
		ResultSet oRresultSet = null;
		String speSqlQuery = "";
		Statement oStatement = null;
		try {
			speSqlQuery = "Select * from ".concat(tableName).concat(
					" where CASE_ID = ('<<case_id>>') and FISCAL_YR=('<<fiscal_yr>>') and WORKFLOW_INSTANCE_ID = ('<<cwid>>')");

			speSqlQuery = speSqlQuery.replaceAll("<<case_id>>", caseId);
			speSqlQuery = speSqlQuery.replaceAll("<<fiscal_yr>>", fiscalYr);
			speSqlQuery = speSqlQuery.replaceAll("<<cwid>>", workflowInstance);
			logger.debug("Final SQL2: {}", speSqlQuery);
			oStatement = conn.createStatement();
			oRresultSet = oStatement.executeQuery(speSqlQuery);
			while (oRresultSet.next()) {
				resData = oRresultSet.getString("CASE_ID");
			}
		} catch (Exception oEx) {
			logger.error(Arrays.toString(oEx.getStackTrace()));
		}
		return resData;
	}
	
	private static boolean isContain(String source, String subItem){
        String pattern = "\\b"+subItem+"\\b";
        Pattern p=Pattern.compile(pattern);
        Matcher m=p.matcher(source);
        return m.find();
   }

	public void savePETData(Element element, Connection connection, String caseid, String fiscalYr,
			String workflowInstanceID, String childTableName, String formName) {
		LinkedHashMap<String, Object> dataMapTable = null;
		DatabaseUtils dbUtil = new DatabaseUtils();
		String employeeName = "";
		String employeeID = "";
		String employeeRecord = "";
		String positionNo = "";
		String chargePeriod = "";
		String hrDeptID = "";
		String totalAmtChanged = "";
		String transferPercentage = "";
		String transferAmt = "";
		String credit_dept = "";
		String credit_fund = "";
		String credit_class = "";
		String credit_project = "";
		String credit_program = "";
		String credit_account = "";
		String dedit_dept = "";
		String dedit_fund = "";
		String dedit_class = "";
		String dedit_project = "";
		String dedit_program = "";
		String dedit_account = "";
		String permanentFundingChange = "";
		String transferAmtBenefits = "";
		for (int j = 0; j < element.getElementsByTagName("Row1").getLength(); j++) {
			logger.debug("Child Length= " + element.getElementsByTagName("Row1").item(j).getChildNodes().getLength());
			for (int k = 0; k < element.getElementsByTagName("Row1").item(j).getChildNodes().getLength(); k++) {
				String nodeName = element.getElementsByTagName("Row1").item(j).getChildNodes().item(k).getNodeName();

				String nodeValue = element.getElementsByTagName("Row1").item(j).getChildNodes().item(k)
						.getTextContent();

				if (nodeName.contains("Emp_Name")) {
					employeeName = nodeValue;
				}
				if (nodeName.contains("Emp_ID")) {
					employeeID = nodeValue;
				}
				if (nodeName.contains("Emp_Record")) {
					employeeRecord = nodeValue;
				}
				if (nodeName.contains("PositionNo")) {
					positionNo = nodeValue;
				}
				if (nodeName.contains("ChargePeriod")) {
					chargePeriod = nodeValue;
				}
				if (nodeName.contains("HRDeptID")) {
					hrDeptID = nodeValue;
				}
				if (nodeName.contains("TotalAmtChanged")) {
					totalAmtChanged = nodeValue;
				}
				if (nodeName.contains("TransferPercentage")) {
					transferPercentage = nodeValue;
				}
			/*	if (nodeName.contains("TransferAmt")) {
					transferAmt = nodeValue;
				}*/
				if(isContain(nodeName,"TransferAmt")) {
					transferAmt = nodeValue;
				}
				if (nodeName.contains("Credit_Dept")) {
					credit_dept = nodeValue;
				}
				if (nodeName.contains("Credit_Funds")) {
					credit_fund = nodeValue;
				}
				if (nodeName.contains("Credit_Class")) {
					credit_class = nodeValue;
				}
				/*if (nodeName.contains("Credit_Project")) {
					credit_project = nodeValue;
				}*/
				if (nodeName.contains("Credit_Program")) {
					credit_program = nodeValue;
				}
				if (nodeName.contains("Credit_Account")) {
					credit_account = nodeValue;
				}
				if (nodeName.contains("Debit_Dept")) {
					dedit_dept = nodeValue;
				}
				if (nodeName.contains("Debit_Funds")) {
					dedit_fund = nodeValue;
				}
				if (nodeName.contains("Debit_Class")) {
					dedit_class = nodeValue;
				}
				/*if (nodeName.contains("Debit_Project")) {
					dedit_project = nodeValue;
				}*/
				if (nodeName.contains("Debit_Program")) {
					dedit_program = nodeValue;
				}
				if (nodeName.contains("Debit_Account")) {
					dedit_account = nodeValue;
				}
				if (nodeName.contains("PermanentFundChange")) {
					permanentFundingChange = nodeValue;
				}
				if (nodeName.contains("TransferAmt_Benefits")) {
					transferAmtBenefits = nodeValue;
				}

			}
			dataMapTable = new LinkedHashMap<String, Object>();
			dataMapTable.put("CASE_ID", caseid);
			dataMapTable.put("FISCAL_YR", fiscalYr);

			dataMapTable.put("EMPLOYEE_NAME", employeeName);
			dataMapTable.put("EMPLOYEE_ID", employeeID);
			dataMapTable.put("EMPLOYEE_RECORD", employeeRecord);
			dataMapTable.put("POSITION_NO", positionNo);
			dataMapTable.put("CHARGE_PERIOD", chargePeriod);
			dataMapTable.put("HR_DEPT_ID", hrDeptID);
			dataMapTable.put("TOTAL_AMT_CHANGED", totalAmtChanged);
			dataMapTable.put("PERCENTAGE_TRANSFER", transferPercentage);
			dataMapTable.put("TRANSFER_AMOUNT", transferAmt);
			dataMapTable.put("CREDIT_DEPT", credit_dept);
			dataMapTable.put("CREDIT_FUND", credit_fund);
			dataMapTable.put("CREDIT_CLASS", credit_class);
			//dataMapTable.put("CREDIT_PROJECT", credit_project);
			dataMapTable.put("CREDIT_PROGRAM", credit_program);
			dataMapTable.put("CREDIT_ACCOUNT", credit_account);
			dataMapTable.put("DEBIT_DEPT", dedit_dept);
			dataMapTable.put("DEBIT_FUND", dedit_fund);
			dataMapTable.put("DEBIT_CLASS", dedit_class);
			//dataMapTable.put("DEBIT_PROJECT", dedit_project);
			dataMapTable.put("DEBIT_PROGRAM", dedit_program);
			dataMapTable.put("DEBIT_ACCOUNT", dedit_account);
			dataMapTable.put("PERMANENT_FUNDING_CHANGE", permanentFundingChange);
			dataMapTable.put("TRANSFER_AMOUNT_BENEFITS", transferAmtBenefits);

			dataMapTable.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

			if (!employeeName.isEmpty()) {
				if (connection != null) {
					dbUtil.insertFormData(connection, dataMapTable, childTableName, formName);
				}
			}
		}
	}
}