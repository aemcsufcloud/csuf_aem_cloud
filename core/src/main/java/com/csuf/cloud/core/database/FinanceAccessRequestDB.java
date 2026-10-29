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
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=CSUF FARF DB", "service.vendor=ThoughtFocus", "process.label=FARFDB" })

public class FinanceAccessRequestDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(FinanceAccessRequestDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_FINANCE_ACCESS_REQUEST";
		String formName = "Finance Access Request Form";
		String assignee = "";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

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
								log.debug("index=" + temp);
								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								dataMap.put("CWID", cwid);
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
								dataMap.put("CAMPUS_LOCATION",
										eElement.getElementsByTagName("CampusLocation").item(0).getTextContent());
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
								dataMap.put("EMP_CATEGORY",
										eElement.getElementsByTagName("EmploymentCatagory").item(0).getTextContent());
								dataMap.put("OTHERS_VALUE",
										eElement.getElementsByTagName("OthersValue").item(0).getTextContent());
								dataMap.put("ACCOUNT_ACTION_REQ",
										eElement.getElementsByTagName("AccountActionRequest").item(0).getTextContent());
								dataMap.put("EMP_CB",
										eElement.getElementsByTagName("EmployeeCB").item(0).getTextContent());
								dataMap.put("EMP_NAME",
										eElement.getElementsByTagName("EmployeeName").item(0).getTextContent());
								String employeedate = eElement.getElementsByTagName("EmployeeDate").item(0)
										.getTextContent();
								Object employeedateObj = "";
								if (employeedate != null && employeedate != "") {
									Date employeedateNew = Date.valueOf(employeedate);
									employeedateObj = employeedateNew;
								}
								dataMap.put("EMP_SIGN_DATE", employeedateObj);
								dataMap.put("ACCESS_CB",
										eElement.getElementsByTagName("AccessCB").item(0).getTextContent());
								dataMap.put("ADMIN_NAME",
										eElement.getElementsByTagName("AdminName").item(0).getTextContent());
								String admindate = eElement.getElementsByTagName("AdminDate").item(0).getTextContent();
								Object admindateObj = "";
								if (admindate != null && admindate != "") {
									Date admindateNew = Date.valueOf(admindate);
									admindateObj = admindateNew;
								}
								dataMap.put("ADMIN_SIGN_DATE", admindateObj);
								dataMap.put("INITIATOR_NAME",
										eElement.getElementsByTagName("InitiatorName").item(0).getTextContent());
								String initiatordate = eElement.getElementsByTagName("InitiatorDate").item(0)
										.getTextContent();
								Object initiatordateObj = "";
								if (initiatordate != null && initiatordate != "") {
									Date initiatordateNew = Date.valueOf(initiatordate);
									initiatordateObj = initiatordateNew;
								}
								dataMap.put("INITIATOR_SIGN_DATE", initiatordateObj);
								dataMap.put("BUSINESS_ANALYST_NAME",
										eElement.getElementsByTagName("BusinessAnalystName").item(0).getTextContent());
								String businessanalystdate = eElement.getElementsByTagName("BusinessAnalystDate")
										.item(0).getTextContent();
								Object businessanalystdateObj = "";
								if (businessanalystdate != null && businessanalystdate != "") {
									Date businessanalystdateNew = Date.valueOf(businessanalystdate);
									businessanalystdateObj = businessanalystdateNew;
								}
								dataMap.put("BUSINESS_ANALYST_SIGN_DATE", businessanalystdateObj);
								dataMap.put("TRAINER_NAME",
										eElement.getElementsByTagName("TrainerName").item(0).getTextContent());
								String trainerdate = eElement.getElementsByTagName("TrainerDate").item(0)
										.getTextContent();
								Object trainerdateObj = "";
								if (trainerdate != null && trainerdate != "") {
									Date trainerdateNew = Date.valueOf(trainerdate);
									trainerdateObj = trainerdateNew;
								}
								dataMap.put("TRAINER_SIGN_DATE", trainerdateObj);
								dataMap.put("ISO_NAME",
										eElement.getElementsByTagName("ISOAdminAnalystName").item(0).getTextContent());
								String isoadminanalystdate = eElement.getElementsByTagName("ISOAdminAnalystDate")
										.item(0).getTextContent();
								Object isoadminanalystdateObj = "";
								if (isoadminanalystdate != null && isoadminanalystdate != "") {
									Date isoadminanalystdateNew = Date.valueOf(isoadminanalystdate);
									isoadminanalystdateObj = isoadminanalystdateNew;
								}
								dataMap.put("ISO_SIGN_DATE", isoadminanalystdateObj);
								dataMap.put("SECURITY_ADMIN_NAME",
										eElement.getElementsByTagName("SecurityName").item(0).getTextContent());
								String securitydate = eElement.getElementsByTagName("SecurityDate").item(0)
										.getTextContent();
								Object securitydateObj = "";
								if (securitydate != null && securitydate != "") {
									Date securitydateNew = Date.valueOf(securitydate);
									securitydateObj = securitydateNew;
								}
								dataMap.put("SECURITY_ADMIN_DATE", securitydateObj);
								dataMap.put("COMMENTS",
										eElement.getElementsByTagName("Comments").item(0).getTextContent());
								dataMap.put("APPROVAL_STATUS",
										eElement.getElementsByTagName("ApprovalStatus").item(0).getTextContent());
								dataMap.put("CISO_SIGN",
										eElement.getElementsByTagName("CISOSignature").item(0).getTextContent());
								dataMap.put("TYPE_OF_ACCESS",
										eElement.getElementsByTagName("TypeOfAccess").item(0).getTextContent());
								dataMap.put("ADD_DIST_ROLE1",
										eElement.getElementsByTagName("PurDataEntryAdd").item(0).getTextContent());
								dataMap.put("REMOVE_DIST_ROLE1",
										eElement.getElementsByTagName("PurDataEntryRemove").item(0).getTextContent());
								dataMap.put("ADD_DIST_ROLE2",
										eElement.getElementsByTagName("PurApprovalAdd").item(0).getTextContent());
								dataMap.put("REMOVE_DIST_ROLE2",
										eElement.getElementsByTagName("PurApprovalRemove").item(0).getTextContent());
								dataMap.put("ADD_DIST_ROLE3",
										eElement.getElementsByTagName("RevenueAdd").item(0).getTextContent());
								dataMap.put("REMOVE_DIST_ROLE3",
										eElement.getElementsByTagName("RevenueRemove").item(0).getTextContent());
								dataMap.put("ADD_DIST_ROLE4",
										eElement.getElementsByTagName("PosBudgetingAdd").item(0).getTextContent());
								dataMap.put("REMOVE_DIST_ROLE4",
										eElement.getElementsByTagName("PosBudgetingRemove").item(0).getTextContent());
								dataMap.put("OTHER_DIST_ROLE",
										eElement.getElementsByTagName("OtherCB").item(0).getTextContent());
								dataMap.put("OTHER_DIST_ROLE_COMMENTS",
										eElement.getElementsByTagName("OtherText").item(0).getTextContent());
								dataMap.put("REPORT_DEPT_ID_LIST",
										eElement.getElementsByTagName("DepReportingAccess").item(0).getTextContent());
								dataMap.put("REPORT_OTHER_DEPT_ID_LIST",
										eElement.getElementsByTagName("OtherDivisonDept").item(0).getTextContent());
								dataMap.put("REQ_ENTRY_APPROVER",
										eElement.getElementsByTagName("AppDivDatEntry").item(0).getTextContent());
								dataMap.put("REQ_ENTRY_APPROVER_OTHERS",
										eElement.getElementsByTagName("AppOtherDivDataEntry").item(0).getTextContent());
								dataMap.put("REQ_APPROVER_LIST",
										eElement.getElementsByTagName("ReqApproverDivision").item(0).getTextContent());
								dataMap.put("REQ_APPROVER_LIST_OTHERS", eElement
										.getElementsByTagName("ReqApproverOtherDivision").item(0).getTextContent());
								String doaeffdate = eElement.getElementsByTagName("DOAEffDate").item(0)
										.getTextContent();
								Object doaeffdateObj = "";
								if (doaeffdate != null && doaeffdate != "") {
									Date doaeffdateNew = Date.valueOf(doaeffdate);
									doaeffdateObj = doaeffdateNew;
								}
								dataMap.put("DOA_EFF_DATE", doaeffdateObj);
								dataMap.put("DOA_PERM_CB",
										eElement.getElementsByTagName("DOAPermanent").item(0).getTextContent());
								dataMap.put("DOA_TEMP",
										eElement.getElementsByTagName("DOATemporary").item(0).getTextContent());
								String doatempenddate = eElement.getElementsByTagName("DOATempEndDate").item(0)
										.getTextContent();
								Object doatempenddateObj = "";
								if (doatempenddate != null && doatempenddate != "") {
									Date doatempdateNew = Date.valueOf(doatempenddate);
									doatempenddateObj = doatempdateNew;
								}
								dataMap.put("DOA_TEMP_DATE", doatempenddateObj);

								dataMap.put("ADD_CENTRAL_ROLE1",
										eElement.getElementsByTagName("AccPayableAdd").item(0).getTextContent());
								dataMap.put("REMOVE_CENTRAL_ROLE1",
										eElement.getElementsByTagName("AccPayableRemove").item(0).getTextContent());
								dataMap.put("ADD_CENTRAL_ROLE2",
										eElement.getElementsByTagName("BudgetAdd").item(0).getTextContent());
								dataMap.put("REMOVE_CENTRAL_ROLE2",
										eElement.getElementsByTagName("BudgetRemove").item(0).getTextContent());
								dataMap.put("ADD_CENTRAL_ROLE3",
										eElement.getElementsByTagName("AssetManagementAdd").item(0).getTextContent());
								dataMap.put("REMOVE_CENTRAL_ROLE3", eElement
										.getElementsByTagName("AssetManagementRemove").item(0).getTextContent());
								dataMap.put("ADD_CENTRAL_ROLE4",
										eElement.getElementsByTagName("GeneralLedgerAdd").item(0).getTextContent());
								dataMap.put("REMOVE_CENTRAL_ROLE4",
										eElement.getElementsByTagName("GeneralLedgerRemove").item(0).getTextContent());
								dataMap.put("ADD_CENTRAL_ROLE5",
										eElement.getElementsByTagName("BillingAdd").item(0).getTextContent());
								dataMap.put("REMOVE_CENTRAL_ROLE5",
										eElement.getElementsByTagName("BillingRemove").item(0).getTextContent());
								dataMap.put("ADD_CENTRAL_ROLE6",
										eElement.getElementsByTagName("PurchasingAdd").item(0).getTextContent());
								dataMap.put("REMOVE_CENTRAL_ROLE6",
										eElement.getElementsByTagName("PurchasingRemove").item(0).getTextContent());
								dataMap.put("OTHER_CENTRAL_ROLE",
										eElement.getElementsByTagName("FinOtherCB").item(0).getTextContent());
								dataMap.put("OTHER_CENTRAL_ROLE_COMMENTS",
										eElement.getElementsByTagName("FinOtherText").item(0).getTextContent());

								dataMap.put("LOG_USER",
										eElement.getElementsByTagName("logUser").item(0).getTextContent());
								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								dataMap.put("DIVISION_ID",
										eElement.getElementsByTagName("DivisionID").item(0).getTextContent());
								dataMap.put("DOA_DEPT_LIST",
										eElement.getElementsByTagName("DOADept").item(0).getTextContent());
								dataMap.put("DOA_OTHER_DEPT_LIST",
										eElement.getElementsByTagName("DOAOtherDivisonDept").item(0).getTextContent());
								dataMap.put("MANAGER_UID",
										eElement.getElementsByTagName("ManagerUserID").item(0).getTextContent());
								dataMap.put("MANAGER_NAME",
										eElement.getElementsByTagName("ManagerName").item(0).getTextContent());
								dataMap.put("MANAGER_EMAIL",
										eElement.getElementsByTagName("ManagerEmail").item(0).getTextContent());
								dataMap.put("EMP_UID",
										eElement.getElementsByTagName("EmployeeUserID").item(0).getTextContent());
								dataMap.put("EMP_COMMENTS",
										eElement.getElementsByTagName("EmployeeComments").item(0).getTextContent());
								dataMap.put("ADMIN_COMMENTS",
										eElement.getElementsByTagName("AdminComments").item(0).getTextContent());
								dataMap.put("INITIATOR_COMMENTS",
										eElement.getElementsByTagName("InitiatorComments").item(0).getTextContent());
								dataMap.put("BUSINESS_ANALYST_COMMENTS", eElement
										.getElementsByTagName("BusinessAnalystComments").item(0).getTextContent());
								dataMap.put("TRAINER_COMMENTS",
										eElement.getElementsByTagName("TrainerComments").item(0).getTextContent());
								dataMap.put("ISO_COMMENTS",
										eElement.getElementsByTagName("ISOAdminComments").item(0).getTextContent());
								dataMap.put("SEC_ADMIN_COMMENTS", eElement.getElementsByTagName("SecurityAdminComments")
										.item(0).getTextContent());
								dataMap.put("CISO_COMMENTS",
										eElement.getElementsByTagName("CISOComments").item(0).getTextContent());
								dataMap.put("BUDGET_ANALYST_COMMENTS", eElement
										.getElementsByTagName("BudgetAnalystComments").item(0).getTextContent());
								dataMap.put("EMP_SIGN",
										eElement.getElementsByTagName("EmployeeSignature").item(0).getTextContent());
								dataMap.put("SEC_ADMIN_CB",
										eElement.getElementsByTagName("SecurityAdminCB").item(0).getTextContent());
								dataMap.put("ISO_ADMIN_CB",
										eElement.getElementsByTagName("ISOAdminCB").item(0).getTextContent());
								dataMap.put("CISO_CB",
										eElement.getElementsByTagName("CISOCB").item(0).getTextContent());
								dataMap.put("BUDGET_OFFICE_FLAG",
										eElement.getElementsByTagName("BudgetOfficeFlag").item(0).getTextContent());
								String bcdate = eElement.getElementsByTagName("BudgetContactSignDate").item(0)
										.getTextContent();
								Object bcdateObj = "";
								if (bcdate != null && bcdate != "") {
									Date bcdateNew = Date.valueOf(bcdate);
									bcdateObj = bcdateNew;
								}
								dataMap.put("BUDGET_CONTACT_DATE", bcdateObj);
								dataMap.put("BUDGET_CONTACT_CB",
										eElement.getElementsByTagName("BudgetContactCB").item(0).getTextContent());
								dataMap.put("BUDGET_CONTACT_SIGN",
										eElement.getElementsByTagName("BudgetContactSign").item(0).getTextContent());
								dataMap.put("BUDGET_CONTACT_COMMENTS", eElement
										.getElementsByTagName("BudgetContactComments").item(0).getTextContent());
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
								dataMap.put("SPECIAL_REVIEW",
										eElement.getElementsByTagName("SpecialReview").item(0).getTextContent());


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
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in CSUFAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error("SQLException in CSUFAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
				}
			}

		}

	}

}
