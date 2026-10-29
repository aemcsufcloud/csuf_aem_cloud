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

@Component(property = { "service.description=CSUF Finance DOA ARF DB", "service.vendor=ThoughtFocus",
		"process.label=FinanceDOAARFDB" })

public class FinanceDOAAccessRequestDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(FinanceDOAAccessRequestDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_FINANCE_DOA_ACCESS_REQUEST";
		String formName = "Finance DOA Access Request Form";
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

					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							try {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								dataMap.put("EMPLID", cwid);
								dataMap.put("CAMPUS_EMAIL",
										eElement.getElementsByTagName("CampusEmail").item(0).getTextContent());
								dataMap.put("FIRST_NAME",
										eElement.getElementsByTagName("FirstName").item(0).getTextContent());
								dataMap.put("LAST_NAME",
										eElement.getElementsByTagName("LastName").item(0).getTextContent());
								dataMap.put("DEPT_NAME",
										eElement.getElementsByTagName("DeptName").item(0).getTextContent());
								dataMap.put("DEPTID", eElement.getElementsByTagName("DeptID").item(0).getTextContent());
								dataMap.put("TITLE", eElement.getElementsByTagName("Title").item(0).getTextContent());
								dataMap.put("CAMPUS_EXTENSION",
										eElement.getElementsByTagName("CampusExt").item(0).getTextContent());
								dataMap.put("DIVISION",
										eElement.getElementsByTagName("Divison").item(0).getTextContent());
								dataMap.put("APPROPRIATE_ADMIN",
										eElement.getElementsByTagName("AppropAdmin").item(0).getTextContent());
								dataMap.put("EMPLOYEMENT_TYPE",
										eElement.getElementsByTagName("EmploymentType").item(0).getTextContent());
								String tempenddate = eElement.getElementsByTagName("TempEndDate").item(0)
										.getTextContent();
								Object tempenddateObj = "";
								if (tempenddate != null && tempenddate != "") {
									Date tempenddateNew = Date.valueOf(tempenddate);
									tempenddateObj = tempenddateNew;
								}
								dataMap.put("TEMP_END_DATE", tempenddateObj);
								dataMap.put("ACCOUNT_ACTION_REQ",
										eElement.getElementsByTagName("AccountActionRequest").item(0).getTextContent());
								String doaEffDate = eElement.getElementsByTagName("DOAEffDate").item(0)
										.getTextContent();
								Object doaEffDateObj = "";
								if (doaEffDate != null && doaEffDate != "") {
									Date doaEffDateNew = Date.valueOf(doaEffDate);
									doaEffDateObj = doaEffDateNew;
								}
								dataMap.put("TEMP_END_DATE", doaEffDateObj);
								dataMap.put("DOA_PERMANENT",
										eElement.getElementsByTagName("DOAPermanent").item(0).getTextContent());
								dataMap.put("DOA_TEMPORARY",
										eElement.getElementsByTagName("DOATemporary").item(0).getTextContent());
								String doaTempEffDate = eElement.getElementsByTagName("DOATempEndDate").item(0)
										.getTextContent();
								Object doaTempEffDateObj = "";
								if (doaTempEffDate != null && doaTempEffDate != "") {
									Date doaTempEffDateNew = Date.valueOf(doaTempEffDate);
									doaTempEffDateObj = doaTempEffDateNew;
								}
								dataMap.put("DOA_TEMP_END_DATE", doaTempEffDateObj);

								dataMap.put("BUDGET_TRANSFER_ADD",
										eElement.getElementsByTagName("BudgetTransferAdd").item(0).getTextContent());

								dataMap.put("BUDGET_TRANSFER_REMOVE",
										eElement.getElementsByTagName("BudgetTransferRemove").item(0).getTextContent());
								dataMap.put("BUDGET_TRANSFER_DEPTS",
										eElement.getElementsByTagName("BudgetTransferDepts").item(0).getTextContent());
								dataMap.put("BUDGET_TRANSFER_OTH_DEPTS", eElement
										.getElementsByTagName("BudgetTransferOtherDepts").item(0).getTextContent());
								dataMap.put("AP_ADD", eElement.getElementsByTagName("APAdd").item(0).getTextContent());
								dataMap.put("AP_REMOVE",
										eElement.getElementsByTagName("APRemove").item(0).getTextContent());
								dataMap.put("AP_DEPTS",
										eElement.getElementsByTagName("APDepts").item(0).getTextContent());
								dataMap.put("AP_OTHER_DEPTS",
										eElement.getElementsByTagName("APOtherDepts").item(0).getTextContent());
								dataMap.put("AP_ADD", eElement.getElementsByTagName("APAdd").item(0).getTextContent());
								dataMap.put("AP_REMOVE",
										eElement.getElementsByTagName("APRemove").item(0).getTextContent());
								dataMap.put("AP_DEPTS",
										eElement.getElementsByTagName("APDepts").item(0).getTextContent());
								dataMap.put("AP_OTHER_DEPTS",
										eElement.getElementsByTagName("APOtherDepts").item(0).getTextContent());
								dataMap.put("TRAVEL_EXP_ADD",
										eElement.getElementsByTagName("TravelExpAdd").item(0).getTextContent());
								dataMap.put("TRAVEL_EXP_REMOVE",
										eElement.getElementsByTagName("TravelExpRemove").item(0).getTextContent());
								dataMap.put("TRAVEL_DEPTS",
										eElement.getElementsByTagName("TravelDepts").item(0).getTextContent());
								dataMap.put("TRAVEL_OTHER_DEPTS",
										eElement.getElementsByTagName("TravelOtherDepts").item(0).getTextContent());
								dataMap.put("TRAVEL_REQ_ADD",
										eElement.getElementsByTagName("TravelReqAdd").item(0).getTextContent());
								dataMap.put("TRAVEL_REQ_REMOVE",
										eElement.getElementsByTagName("TravelReqRemove").item(0).getTextContent());
								dataMap.put("MAX_AUTH_AMT",
										eElement.getElementsByTagName("MaxAuthAmt").item(0).getTextContent());
								dataMap.put("TRAVEL_REQ_DEPT",
										eElement.getElementsByTagName("TravelReqDept").item(0).getTextContent());
								dataMap.put("TRAVEL_REQ_OTHER_DEPT",
										eElement.getElementsByTagName("TravelReqOtherDept").item(0).getTextContent());
								dataMap.put("TRAVEL_COMMENTS_ONLY",
										eElement.getElementsByTagName("TravelCommentsOnly").item(0).getTextContent());
								dataMap.put("TRAVEL_DIV",
										eElement.getElementsByTagName("TravelDiv").item(0).getTextContent());
								dataMap.put("TRAVEL_SUB_DIV",
										eElement.getElementsByTagName("TravelSubDiv").item(0).getTextContent());
								dataMap.put("TRAVEL_COMMENTS",
										eElement.getElementsByTagName("Comments").item(0).getTextContent());
								dataMap.put("INITIATOR_NAME",
										eElement.getElementsByTagName("InitiatorName").item(0).getTextContent());
								String initiatordate = eElement.getElementsByTagName("InitiatorDate").item(0)
										.getTextContent();
								Object initiatordateObj = "";
								if (initiatordate != null && initiatordate != "") {
									Date initiatordateNew = Date.valueOf(initiatordate);
									initiatordateObj = initiatordateNew;
								}
								dataMap.put("INITIATOR_DATE", initiatordateObj);
								dataMap.put("INITIATOR_COMMENTS",
										eElement.getElementsByTagName("InitiatorComments").item(0).getTextContent());

								dataMap.put("EMPLOYEE_NAME",
										eElement.getElementsByTagName("EmployeeName").item(0).getTextContent());
								String employeedate = eElement.getElementsByTagName("EmployeeDate").item(0)
										.getTextContent();
								Object employeedateObj = "";
								if (employeedate != null && employeedate != "") {
									Date employeedateNew = Date.valueOf(employeedate);
									employeedateObj = employeedateNew;
								}
								dataMap.put("EMPLOYEE_DATE", employeedateObj);
								dataMap.put("EMPLOYEE_COMMENTS",
										eElement.getElementsByTagName("EmployeeComments").item(0).getTextContent());
								dataMap.put("ADMIN_NAME",
										eElement.getElementsByTagName("AdminName").item(0).getTextContent());
								String admindate = eElement.getElementsByTagName("AdminDate").item(0).getTextContent();
								Object admindateObj = "";
								if (admindate != null && admindate != "") {
									Date admindateNew = Date.valueOf(admindate);
									admindateObj = admindateNew;
								}
								dataMap.put("ADMIN_DATE", admindateObj);
								dataMap.put("ADMIN_COMMENTS",
										eElement.getElementsByTagName("AdminComments").item(0).getTextContent());

								dataMap.put("FISCAL_MANG_NAME",
										eElement.getElementsByTagName("FiscalMangName").item(0).getTextContent());
								String trainerdate = eElement.getElementsByTagName("FiscalMangDate").item(0)
										.getTextContent();
								Object trainerdateObj = "";
								if (trainerdate != null && trainerdate != "") {
									Date trainerdateNew = Date.valueOf(trainerdate);
									trainerdateObj = trainerdateNew;
								}
								dataMap.put("FISCAL_MANG_DATE", trainerdateObj);
								dataMap.put("FISCAL_MANG_COMMENTS", eElement
										.getElementsByTagName("FiscalManagerComments").item(0).getTextContent());
								dataMap.put("FS_NAME", eElement.getElementsByTagName("FinancialServicesName").item(0)
										.getTextContent());
								String isoadminanalystdate = eElement.getElementsByTagName("FinancialServicesDate")
										.item(0).getTextContent();
								Object isoadminanalystdateObj = "";
								if (isoadminanalystdate != null && isoadminanalystdate != "") {
									Date isoadminanalystdateNew = Date.valueOf(isoadminanalystdate);
									isoadminanalystdateObj = isoadminanalystdateNew;
								}
								dataMap.put("FS_DATE", isoadminanalystdateObj);
								dataMap.put("FS_COMMENTS",
										eElement.getElementsByTagName("FSComments").item(0).getTextContent());

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
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "EMPLID", workflowInstanceID, tableName);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "EMPLID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "EMPLID",
							workflowInstanceID, dataMap,
							"TEMP_END_DATE,DOA_TEMP_END_DATE,INITIATOR_DATE,EMPLOYEE_DATE,ADMIN_DATE,FISCAL_MANG_DATE,FS_DATE");
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
						log.debug("IOException in FinanceDOAAccessRequestDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
			}
			/*if (conn != null) { try { conn.close(); } catch (SQLException e) { } }*/

		}

	}

}
