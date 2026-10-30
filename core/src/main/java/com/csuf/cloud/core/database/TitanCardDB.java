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
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Titan Card DB Save", "service.vendor=ThoughtFocus",
"process.label=TitanCardDB" })
public class TitanCardDB implements WorkflowProcess{
	

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(TitanCardDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_TITAN_CARD";
		String childTableName = "AEM_TITAN_CARD_TABLE_DATA";
		String formName = "TitanCard Closed Account Request Form";
		String assignee = "";
		String cwid = "";
		String caseid = "";
		String titanCardNumber = "";
		String firstName = "";
		String lastName = "";
		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

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
								cwid = eElement.getElementsByTagName("Cwid").item(0).getTextContent();
								caseid = eElement.getElementsByTagName("caseId").item(0).getTextContent();
								titanCardNumber = eElement.getElementsByTagName("TitanCardNumber").item(0).getTextContent();
								firstName = eElement.getElementsByTagName("FirstName").item(0).getTextContent();
							    lastName = eElement.getElementsByTagName("LastName").item(0).getTextContent();
							    dataMap.put("DATA_XML", dataXML);
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", caseid);
								dataMap.put("TITAN_CARD_NO", titanCardNumber);
								String initiatedDate = eElement.getElementsByTagName("InitiatedDate").item(0).getTextContent();
								Object initiatedDateObj = "";
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatedDate);
									initiatedDateObj = initiatedDateNew;
								}
								dataMap.put("INITIATED_DATE", initiatedDateObj);
								dataMap.put("FIRST_NAME", firstName);
								dataMap.put("LAST_NAME", lastName);
								dataMap.put("MIDDLE_NAME", eElement.getElementsByTagName("MiddleName").item(0).getTextContent());
								dataMap.put("ACCOUNT_CURRENT_FUNDS", eElement.getElementsByTagName("CurrentFundsOnAccount").item(0).getTextContent());
								dataMap.put("ADMINISTRATIVE_FEE", eElement.getElementsByTagName("AdministartiveFee").item(0).getTextContent());
								dataMap.put("FINAL_CHECK_TOTAL", eElement.getElementsByTagName("FinalCheckTotal").item(0).getTextContent());
								dataMap.put("CLOSING_REASON_WITHDRAWING", eElement.getElementsByTagName("ReasonWithdrawingCB").item(0).getTextContent());
								dataMap.put("CLOSING_REASON_GRADUATING", eElement.getElementsByTagName("ReasonGraduatingCB").item(0).getTextContent());
								dataMap.put("CLOSING_REASON_LEAVING", eElement.getElementsByTagName("ReasonLeavingEmploymentCB").item(0).getTextContent());
								dataMap.put("CLOSING_REASON_OTHER", eElement.getElementsByTagName("ReasonOtherCB").item(0).getTextContent());
								dataMap.put("CLOSING_REASON_OTHER_VAL", eElement.getElementsByTagName("ReasonOther").item(0).getTextContent());
								dataMap.put("PHONE_NUMBER", eElement.getElementsByTagName("PhoneNumber").item(0).getTextContent());
								dataMap.put("EMAIL", eElement.getElementsByTagName("Email").item(0).getTextContent());
								dataMap.put("VENDOR_FIRST_NAME", eElement.getElementsByTagName("CRVendorPayeeFirstName").item(0).getTextContent());
								dataMap.put("VENDOR_LAST_NAME", eElement.getElementsByTagName("CRVendorPayeeLastName").item(0).getTextContent());
								dataMap.put("VENDOR_FED_TAX_ID", eElement.getElementsByTagName("CRVendorPayeeFedTaxID").item(0).getTextContent());
								dataMap.put("VENDOR_EMAIL", eElement.getElementsByTagName("CRVendorEmailAddress").item(0).getTextContent());
								dataMap.put("PAYEE_CSUF_EMPLOYEE_CB", eElement.getElementsByTagName("CRPayeeCSUFEmployeeRB").item(0).getTextContent());
								dataMap.put("PAYEE_ASC_EMPLOYEE_CB", eElement.getElementsByTagName("CRPayeeASCEmployeeRB").item(0).getTextContent());
								dataMap.put("PAYEE_US_CITIZEN_CB", eElement.getElementsByTagName("CRPayeeUSCitizenRB").item(0).getTextContent());
								dataMap.put("REQUEST_FOR_CB", eElement.getElementsByTagName("CRRequestforServiceRB").item(0).getTextContent());
								dataMap.put("REQUEST_FOR_CB_DATA", eElement.getElementsByTagName("CRRequestForServiceDropdown").item(0).getTextContent());
								dataMap.put("RUSH_CB", eElement.getElementsByTagName("CRRushCB").item(0).getTextContent());
								String rushDate = eElement.getElementsByTagName("CRRushDateNeeded").item(0).getTextContent();
								Object rushDateObj = "";
								if (rushDate != null && rushDate != "") {
									Date rushDateNew = Date.valueOf(rushDate);
									rushDateObj = rushDateNew;
								}
								dataMap.put("RUSH_DATE", rushDateObj);
								dataMap.put("REQUEST_FOR_CB_DATA", eElement.getElementsByTagName("CRRequestForServiceDropdown").item(0).getTextContent());
								dataMap.put("PEID", eElement.getElementsByTagName("CRASCPeid").item(0).getTextContent());
								dataMap.put("INVOICE_NO", eElement.getElementsByTagName("CRASCInvoiceNo").item(0).getTextContent());
								String invoiceDate = eElement.getElementsByTagName("CRASCInvoiceDate").item(0).getTextContent();
								Object invoiceDateObj = "";
								if (invoiceDate != null && invoiceDate != "") {
									Date invoiceDateNew = Date.valueOf(invoiceDate);
									invoiceDateObj = invoiceDateNew;
								}
								dataMap.put("INVOICE_DATE", invoiceDateObj);
								String invoiceDueDate = eElement.getElementsByTagName("CRASCInvoiceDueDate").item(0).getTextContent();
								Object invoiceDueDateObj = "";
								if (invoiceDueDate != null && invoiceDueDate != "") {
									Date invoiceDueDateNew = Date.valueOf(invoiceDueDate);
									invoiceDueDateObj = invoiceDueDateNew;
								}
								dataMap.put("INVOICE_DUE_DATE", invoiceDueDateObj);
								dataMap.put("DESCRIPTION", eElement.getElementsByTagName("CRASCDesc").item(0).getTextContent());
								dataMap.put("AUDITED_BY", eElement.getElementsByTagName("CRASCAuditedBy").item(0).getTextContent());
								dataMap.put("APPROVED_BY", eElement.getElementsByTagName("CRASCApprovedBy").item(0).getTextContent());
								dataMap.put("CHECK_REQUEST_TOTAL_AMOUNT", eElement.getElementsByTagName("CRTableTotalAmount").item(0).getTextContent());
								dataMap.put("STAGE_INDICATOR", eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
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
								if (dataMap.get("LAST_STEP").equals("ASC Staff Review 3")) {
									saveCheckRequestTableData(conn, eElement, formName, childTableName, cwid, caseid, firstName, lastName, titanCardNumber, workflowInstanceID);
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNING");
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
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "CWID", workflowInstanceID, dataMap,
							"INITIATED_DATE,RUSH_DATE,INVOICE_DATE,INVOICE_DUE_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}


			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} catch (Exception e1) {
				e1.printStackTrace();
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in TitanCardDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
/*				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error(
								"SQLException in TitanCardDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}*/
			}

		}

	}
	
	private void saveCheckRequestTableData(Connection conn, Element eElement,String formName, String tableName, String cwid, String caseId, 
			String firstName, String lastName, String titanCardNo, String workflowInstanceId) {
		try {
			LinkedHashMap<String, Object> dataMapInfo = null;
			String description = "";
			String invoiceNumber = "";
			String project = "";
			String objectCode = "";
			String amount = "";
			String number1099 = "";

			for (int j = 0; j < eElement.getElementsByTagName("Row1").getLength(); j++) {

				for (int k = 0; k < eElement.getElementsByTagName("Row1").item(j).getChildNodes().getLength(); k++) {
					String nodeName = eElement.getElementsByTagName("Row1").item(j).getChildNodes().item(k)
							.getNodeName();

					String nodeValue = eElement.getElementsByTagName("Row1").item(j).getChildNodes().item(k)
							.getTextContent();

					if (nodeName.contains("CRTableDescription")) {
						description = nodeValue;
					}
					if (nodeName.contains("CRTableInvoiceNumber")) {
						invoiceNumber = nodeValue;
					}
					if (nodeName.contains("CRTableProject")) {
						project = nodeValue;
					}
					if (nodeName.contains("CRTableObjectCode")) {
						objectCode = nodeValue;
					}
					if (nodeName.contains("CRTableAmount")) {
						amount = nodeValue;
					}
					if (nodeName.contains("CRTable1099")) {
						number1099 = nodeValue;
					}
				}
				dataMapInfo = new LinkedHashMap<String, Object>();

				dataMapInfo.put("CWID", cwid);
				dataMapInfo.put("CASEID", caseId);
				dataMapInfo.put("TITAN_CARD_NO", titanCardNo);
				dataMapInfo.put("FIRST_NAME", firstName);
				dataMapInfo.put("LAST_NAME", lastName);
				dataMapInfo.put("DESCRIPTION", description);
				dataMapInfo.put("INVOICE_NO", invoiceNumber);
				dataMapInfo.put("PROJECT", project);
				dataMapInfo.put("OBJECT_CODE", objectCode);
				dataMapInfo.put("AMOUNT", amount);
				dataMapInfo.put("NUM_DATA", number1099);
				dataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceId);

				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					if(description.isBlank() && invoiceNumber.isBlank() && project.isBlank() && objectCode.isBlank() && amount.isBlank() && number1099.isBlank()) {
						log.info("All table value are empty for row instance "+j);
					}else {
						dbUtil.insertFormData(conn, dataMapInfo, tableName, formName);
					}
				}*/
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, "", "", workflowInstanceId, dataMapInfo,
							"");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}

			}
		} catch (Exception e) {
			log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			log.error("Failed to insert Titan Card Table Data");
		}
		
	}


}
