package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.lang.String;
import org.w3c.dom.Element;
import java.lang.String;
import java.sql.Connection;
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

@Component(property = { "service.description=RFI DB", "service.vendor=ThoughtFocus", "process.label=RFIDB" })
public class RFIDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(RFIDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_RFI_IFT_FORM";
		String childTableName = "AEM_RFI_ACCOUNT_DETAILS";
		String formName = "Request For Invoice And Interagency Financial Transaction Form";
		String assignee = "";
		String cwid = "";
		String caseid = "";
		LinkedHashMap<String, Object> dataMap = null;
		MetaDataMap metaDataMapVal = workItem.getWorkflow().getWorkflowData().getMetaDataMap();

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		log.debug("Workflowinstanceid:" + workflowInstanceID);
		if (StringUtils.isNotBlank(payloadPath)) {
			InputStream is = null;
			try {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");

				if (null != is) {
					Document doc = XMLUtils.getDomDocument(is);
					String dataXML = XMLUtils.prettyPrintAsString(doc);

					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							try {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								log.debug("index=" + temp);

								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								caseid = eElement.getElementsByTagName("caseId").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", caseid);
								dataMap.put("CSU_CAMPUS", eElement.getElementsByTagName("CSUCampusChancellorOffice")
										.item(0).getTextContent());
								dataMap.put("DEPARTMENT",
										eElement.getElementsByTagName("RequestorDepartment").item(0).getTextContent());
								dataMap.put("REQUESTOR_USERID",
										eElement.getElementsByTagName("RequestorUserId").item(0).getTextContent());
								dataMap.put("FIRST_NAME",
										eElement.getElementsByTagName("RequestorFirstName").item(0).getTextContent());
								dataMap.put("LAST_NAME",
										eElement.getElementsByTagName("RequestorLastName").item(0).getTextContent());
								dataMap.put("DEPT_ID", eElement.getElementsByTagName("RequestorDepartmentID").item(0)
										.getTextContent());
								dataMap.put("DIVISION",
										eElement.getElementsByTagName("RequestorDivision").item(0).getTextContent());
								dataMap.put("EMAIL",
										eElement.getElementsByTagName("RequestorEmail").item(0).getTextContent());
								dataMap.put("REASON",
										eElement.getElementsByTagName("ReasonForRequest").item(0).getTextContent());
								dataMap.put("APPROVER_USERID",
										eElement.getElementsByTagName("ApproverUserId").item(0).getTextContent());
								dataMap.put("APPROVER_NAME",
										eElement.getElementsByTagName("ApproverName").item(0).getTextContent());
								dataMap.put("APPROVER_EMAIL",
										eElement.getElementsByTagName("ApproverEmail").item(0).getTextContent());
								dataMap.put("PO_NUMBER",
										eElement.getElementsByTagName("PONumber").item(0).getTextContent());
								dataMap.put("CUSTOMER_ID",
										eElement.getElementsByTagName("CustomerID").item(0).getTextContent());
								dataMap.put("CUSTOMER_LASTNAME",
										eElement.getElementsByTagName("CustomerName").item(0).getTextContent());
								dataMap.put("CUSTOMER_CONTACT",
										eElement.getElementsByTagName("CustomerContact").item(0).getTextContent());
								dataMap.put("CUSTOMER_ADDRESS1",
										eElement.getElementsByTagName("CustomerAddress1").item(0).getTextContent());
								dataMap.put("CUSTOMER_ADDRESS2",
										eElement.getElementsByTagName("CustomerAddress2").item(0).getTextContent());
								dataMap.put("CUSTOMER_CITY",
										eElement.getElementsByTagName("CustomerCity").item(0).getTextContent());
								dataMap.put("CUSTOMER_STATE",
										eElement.getElementsByTagName("CustomerState").item(0).getTextContent());
								dataMap.put("CUSTOMER_ZIPCODE",
										eElement.getElementsByTagName("Zipcode").item(0).getTextContent());
								dataMap.put("CUSTOMER_FAX",
										eElement.getElementsByTagName("Fax").item(0).getTextContent());
								dataMap.put("CUSTOMER_EMAIL",
										eElement.getElementsByTagName("CustomerEmail").item(0).getTextContent());
								dataMap.put("INVOICE_HANDLING",
										eElement.getElementsByTagName("InvoiceHandling").item(0).getTextContent());
								dataMap.put("INVOICE_TYPE",
										eElement.getElementsByTagName("InvoiceType").item(0).getTextContent());
								dataMap.put("TOTAL_BILL_AMOUNT",
										eElement.getElementsByTagName("TotalBillAmount").item(0).getTextContent());
								dataMap.put("EXPENSE_TYPE",
										eElement.getElementsByTagName("ExpenseType").item(0).getTextContent());
								dataMap.put("OTHER_EXPENSE_TYPE",
										eElement.getElementsByTagName("OtherExpenseType").item(0).getTextContent());
								dataMap.put("BILL_DESCRIPTION",
										eElement.getElementsByTagName("BillDescription").item(0).getTextContent());
								dataMap.put("INVOICE_NUMBER",
										eElement.getElementsByTagName("Invoicenumber").item(0).getTextContent());
								dataMap.put("IFT_NUMBER",
										eElement.getElementsByTagName("IFTNumber").item(0).getTextContent());
								dataMap.put("REQUESTOR_SIGN",
										eElement.getElementsByTagName("RequestorSign").item(0).getTextContent());
								dataMap.put("REQUESTOR_COMMENTS",
										eElement.getElementsByTagName("RequestorComments").item(0).getTextContent());
								dataMap.put("APPROVER_SIGN",
										eElement.getElementsByTagName("ApproverSign").item(0).getTextContent());
								dataMap.put("APPROVER_COMMENTS",
										eElement.getElementsByTagName("ApproverComments").item(0).getTextContent());
								dataMap.put("ASFR_SIGN",
										eElement.getElementsByTagName("ASFRSign").item(0).getTextContent());
								dataMap.put("ASFR_COMMENTS",
										eElement.getElementsByTagName("ASFRComments").item(0).getTextContent());
								String approverDecision = eElement.getElementsByTagName("ApproverDecision").item(0)
										.getTextContent();
								String asfrDecision = eElement.getElementsByTagName("ASFRDecision").item(0)
										.getTextContent();
								String customerDecision = eElement.getElementsByTagName("CustomerSelectionRB").item(0)
										.getTextContent();
								String rfiDecision = eElement.getElementsByTagName("RFISelectionRB").item(0)
										.getTextContent();
								String customerDetails = eElement.getElementsByTagName("customerDetails").item(0)
										.getTextContent();

								String detailsDec = "";
								if (customerDetails.equals("0")) {
									detailsDec = "Existing Customer";
								} else {
									detailsDec = "New Customer";
								}
								dataMap.put("CUSTOMER_DETAILS", detailsDec);

								String customerDec = "";
								if (customerDecision.equals("0")) {
									customerDec = "Request for Invoice";
								} else {
									customerDec = "Interagency Financial Transaction";
								}
								dataMap.put("CUSTOMER_SELECTION", customerDec);

								String rfiDec = "";
								if (rfiDecision.equals("0")) {
									rfiDec = "CSUF Auxiliary Organization (ASC, ASI or Philanthropic Foundation)";
								} else if (rfiDecision.equals("1")) {
									rfiDec = "CSU Campus' Auxiliary Organization";
								} else if (rfiDecision.equals("2")) {
									rfiDec = "External Entity";
								}
								dataMap.put("RFI_SELECTION", rfiDec);

								String approverDec = "";
								if (approverDecision.equals("1")) {
									approverDec = "Approved";
								} else if (approverDecision.equals("2")) {
									approverDec = "Denied";
								}
								dataMap.put("APPROVER_DECISION", approverDec);

								String asfrDec = "";
								if (asfrDecision.equals("1")) {
									asfrDec = "Approved";
								} else if (asfrDecision.equals("2")) {
									asfrDec = "Denied";
								} else if (asfrDecision.equals("3")) {
									asfrDec = "Cancel/Terminate";
								}
								dataMap.put("ASFR_DECISION", asfrDec);

								String requestDate = eElement.getElementsByTagName("RequestDate").item(0)
										.getTextContent();
								Object requestDateObj = "";
								if (requestDate != null && requestDate != "") {
									Date requestDateNew = Date.valueOf(requestDate);
									requestDateObj = requestDateNew;
								}
								dataMap.put("REQUEST_DATE", requestDateObj);

								String requestorSignDate = eElement.getElementsByTagName("RequestorSignDate").item(0)
										.getTextContent();
								Object requestorSignDateObj = "";
								if (requestorSignDate != null && requestorSignDate != "") {
									Date requestorSignDateNew = Date.valueOf(requestorSignDate);
									requestorSignDateObj = requestorSignDateNew;
								}
								dataMap.put("REQUESTOR_SIGNDATE", requestorSignDateObj);

								String approverSignDate = eElement.getElementsByTagName("ApproverSignDate").item(0)
										.getTextContent();
								Object approverSignDateObj = "";
								if (approverSignDate != null && approverSignDate != "") {
									Date approverSignDateNew = Date.valueOf(approverSignDate);
									approverSignDateObj = approverSignDateNew;
								}
								dataMap.put("APPROVER_SIGNDATE", approverSignDateObj);

								String asfrSignDate = eElement.getElementsByTagName("ASFRSignDate").item(0)
										.getTextContent();
								Object asfrDateObj = "";
								if (asfrSignDate != null && asfrSignDate != "") {
									Date asfrSignDateNew = Date.valueOf(asfrSignDate);
									asfrDateObj = asfrSignDateNew;
								}
								dataMap.put("ASFR_SIGNDATE", asfrDateObj);

								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								log.debug("DataMap values :{}", dataMap);

								accountTableData(conn, eElement, formName, childTableName, caseid, cwid,
										workflowInstanceID);
								List<Route> backRoutesList = workflowSession.getBackRoutes(workItem, false);
								JsonArray backRoutesJson = new JsonArray();
								for (Route backRoute : backRoutesList) {
									backRoutesJson.add(backRoute.getName());
								}
								String saveHistoryBackRoute = "";
								if (backRoutesJson.size() == 1) {
									saveHistoryBackRoute = backRoutesList.get(0).getName();
									log.debug("Executing if block ");
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
									log.debug("Executing else block assignee : {}", assignee);
								}
								dataMap.put("LAST_STEP", saveHistoryBackRoute);
								if (dataMap.get("LAST_STEP").equals("ASFR Review")) {
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
				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, caseid, "CASEID", workflowInstanceID, tableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, caseid, "CASEID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} catch (Exception e1) {
				log.debug(Arrays.toString(e1.getStackTrace()) + "Message-----" + e1.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in RFIDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in RFIDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}

	private void accountTableData(Connection conn, Element eElement, String formName, String tableName, String caseid,
			String cwid, String workflowInstanceId) {
		try {
			LinkedHashMap<String, Object> dataMapInfo = null;
			String amount = "";
			String fundCode = "";
			String program = "";
			String classCode = "";
			String project = "";
			String account = "";
			String department = "";
			String poNumber = "";
			DatabaseUtils dbUtils = new DatabaseUtils();

			String resultData = dbUtils.getSPEEvalData(conn, caseid, "CASEID", workflowInstanceId, tableName);
			if (resultData != null && !resultData.equals("")) {
				dbUtils.deleteSPEEvalData(conn, caseid, "CASEID", workflowInstanceId, tableName);
			}

			for (int j = 0; j < eElement.getElementsByTagName("Row1").getLength(); j++) {

				for (int k = 0; k < eElement.getElementsByTagName("Row1").item(j).getChildNodes().getLength(); k++) {
					String nodeName = eElement.getElementsByTagName("Row1").item(j).getChildNodes().item(k)
							.getNodeName();

					String nodeValue = eElement.getElementsByTagName("Row1").item(j).getChildNodes().item(k)
							.getTextContent();

					if (nodeName.contains("Account")) {
						account = nodeValue;
					}
					if (nodeName.contains("FundCode")) {
						fundCode = nodeValue;
					}
					if (nodeName.contains("Program")) {
						program = nodeValue;
					}
					if (nodeName.contains("Class")) {
						classCode = nodeValue;
					}
					if (nodeName.contains("Project")) {
						project = nodeValue;
					}
					if (nodeName.contains("CreditAmount")) {

						amount = nodeValue;
					}
					if (nodeName.contains("Dept")) {
						department = nodeValue;
					}
					if (nodeName.contains("gridPONumber")) {
						poNumber = nodeValue;
					}
				}
				dataMapInfo = new LinkedHashMap<String, Object>();

				dataMapInfo.put("CASEID", caseid);
				dataMapInfo.put("CWID", cwid);
				dataMapInfo.put("FORM_NAME", formName);
				dataMapInfo.put("ACCOUNT", account);
				dataMapInfo.put("FUND_CODE", fundCode);
				dataMapInfo.put("DEPARTMENT", department);
				dataMapInfo.put("PROGRAM", program);
				dataMapInfo.put("CLASS_CODE", classCode);
				dataMapInfo.put("PROJECT", project);
				dataMapInfo.put("AMOUNT", amount);
				dataMapInfo.put("PO_NUMBER", poNumber);
				dataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceId);

				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					dbUtil.insertFormData(conn, dataMapInfo, tableName, formName);
				} else {
					log.error("Connection Unsuccessfull");
				}

			}
		} catch (Exception e) {
			log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			log.error("Failed to insert Table Data");
		}
	}
}
