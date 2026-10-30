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

@Component(property = { "service.description=Parent Proj Year Income Appeal DB", "service.vendor=ThoughtFocus",
		"process.label=Parent Proj Year Income Appeal DB" })

public class ParProjectedYearIncomeAppealDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(ParProjectedYearIncomeAppealDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_PARENT_INCOME_APPEAL";
		String formName = "Parent Projected Year Income Appeal";
		String assignee = "";
		String cwid = "";
		String caseid = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String wfInstanceID = workItem.getWorkflow().getId();
		log.debug("Workflowinstanceid:" + wfInstanceID);
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
								cwid = eElement.getElementsByTagName("cwid").item(0).getTextContent();
								caseid = eElement.getElementsByTagName("caseId").item(0).getTextContent();

								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", caseid);

								dataMap.put("FIRST_NAME",
										eElement.getElementsByTagName("firstName").item(0).getTextContent());
								dataMap.put("LAST_NAME",
										eElement.getElementsByTagName("lastName").item(0).getTextContent());
								dataMap.put("STUDENT_EMAIL",
										eElement.getElementsByTagName("HiddenStudentEmail").item(0).getTextContent());
								dataMap.put("STUDENT_USERID",
										eElement.getElementsByTagName("HiddenStudentUserID").item(0).getTextContent());
								dataMap.put("STUDENT_NAME",
										eElement.getElementsByTagName("StudentName").item(0).getTextContent());
								dataMap.put("FINANCIAL_AID_YEAR",
										eElement.getElementsByTagName("financialAidYear").item(0).getTextContent());
								dataMap.put("AID_YEAR",
										eElement.getElementsByTagName("aidYear").item(0).getTextContent());
								dataMap.put("PARENT_EMAIL",
										eElement.getElementsByTagName("parentEmail").item(0).getTextContent());
								dataMap.put("IP_ADDRESS",
										eElement.getElementsByTagName("ipAddress").item(0).getTextContent());
								dataMap.put("FORM_CODE",
										eElement.getElementsByTagName("formCode").item(0).getTextContent());
								String initiatedDate = eElement.getElementsByTagName("Date_1").item(0).getTextContent();
								Object initiatedDateObj = "";
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatedDate);
									initiatedDateObj = initiatedDateNew;
								}
								dataMap.put("INITIATED_DATE", initiatedDateObj);

								dataMap.put("DECREASED_INCOME_CB",
										eElement.getElementsByTagName("Reason1CB").item(0).getTextContent());
								dataMap.put("SEPARATION_OF_WORK_CB",
										eElement.getElementsByTagName("Reason2CB").item(0).getTextContent());
								dataMap.put("LEGAL_SEPARATION_CB",
										eElement.getElementsByTagName("Reason3CB").item(0).getTextContent());
								dataMap.put("TERMINATION_UNTAX_CB",
										eElement.getElementsByTagName("Reason4CB").item(0).getTextContent());
								dataMap.put("DEATH_OF_PARENT_CB",
										eElement.getElementsByTagName("Reason5CB").item(0).getTextContent());
								dataMap.put("OTHER_CB",
										eElement.getElementsByTagName("Reason6CB").item(0).getTextContent());

								dataMap.put("TAX_RETURN_DOC_CB",
										eElement.getElementsByTagName("DocumentCheck1CB").item(0).getTextContent());
								dataMap.put("TAX_RETURN_DOC_YEAR",
										eElement.getElementsByTagName("DocumentYear1").item(0).getTextContent());
								dataMap.put("RECENT_PAYSTUBS_DOC_CB",
										eElement.getElementsByTagName("DocumentCheck2CB").item(0).getTextContent());
								dataMap.put("RECENT_PAYSTUBS_DOC_YEAR",
										eElement.getElementsByTagName("DocumentYear2").item(0).getTextContent());
								dataMap.put("SEVERANCE_LETTER_DOC_CB",
										eElement.getElementsByTagName("DocumentCheck3CB").item(0).getTextContent());
								dataMap.put("EDD_NOTICE_DOC_CB",
										eElement.getElementsByTagName("DocumentCheck4CB").item(0).getTextContent());
								dataMap.put("SIGNED_LETTER_DOC_CB",
										eElement.getElementsByTagName("DocumentCheck5CB").item(0).getTextContent());
								dataMap.put("LEGAL_SEPARATION_DOC_CB",
										eElement.getElementsByTagName("DocumentCheck6CB").item(0).getTextContent());
								dataMap.put("DIVORCE_DECREE_DOC_CB",
										eElement.getElementsByTagName("DocumentCheck7CB").item(0).getTextContent());
								dataMap.put("LETTER_FRM_AGENCY_DOC_CB",
										eElement.getElementsByTagName("DocumentCheck8CB").item(0).getTextContent());
								dataMap.put("DOC_FRM_AGENCY_DOC_CB",
										eElement.getElementsByTagName("DocumentCheck9CB").item(0).getTextContent());
								dataMap.put("DEATH_CERTIFICATE_DOC_CB",
										eElement.getElementsByTagName("DocumentCheck10CB").item(0).getTextContent());
								dataMap.put("VALUE_ACC_PAYABLE_DOC_CB",
										eElement.getElementsByTagName("DocumentCheck11CB").item(0).getTextContent());
								dataMap.put("OTHER_DOC_CB",
										eElement.getElementsByTagName("DocumentOtherCB").item(0).getTextContent());
								dataMap.put("OTHER_DOCS",
										eElement.getElementsByTagName("DocumentOther").item(0).getTextContent());
								dataMap.put("COMMENTS_DOCS",
										eElement.getElementsByTagName("DocumentsComments").item(0).getTextContent());

								dataMap.put("INSTRUCTION_FROM",
										eElement.getElementsByTagName("InstructionFrom").item(0).getTextContent());
								dataMap.put("INSTRUCTION_TO",
										eElement.getElementsByTagName("InstructionTo").item(0).getTextContent());
								dataMap.put("WORK_PARENT_INCOME_1",
										eElement.getElementsByTagName("income1").item(0).getTextContent());
								dataMap.put("CHILD_SUPPORT",
										eElement.getElementsByTagName("Income2").item(0).getTextContent());
								dataMap.put("WORK_PARENT_INCOME_2",
										eElement.getElementsByTagName("Income3").item(0).getTextContent());
								dataMap.put("VETERAN_NON_EDU_BENEFIT",
										eElement.getElementsByTagName("Income4").item(0).getTextContent());
								dataMap.put("PAYMENTS_IRA_401K_OTHER",
										eElement.getElementsByTagName("Income5").item(0).getTextContent());
								dataMap.put("WORKERS_COMPENSATION",
										eElement.getElementsByTagName("Income6").item(0).getTextContent());
								dataMap.put("DISABILITY_BENEFITS",
										eElement.getElementsByTagName("Income7").item(0).getTextContent());
								dataMap.put("HOUSE_FOOD_ALLOWANCE",
										eElement.getElementsByTagName("Income8").item(0).getTextContent());

								dataMap.put("CASH_SAVING_CHECKING_ACC",
										eElement.getElementsByTagName("CashAccounts").item(0).getTextContent());
								dataMap.put("OTHER_REAL_ESTATE_VALUE",
										eElement.getElementsByTagName("Value1").item(0).getTextContent());
								dataMap.put("OTHER_REAL_ESTATE_DEBT",
										eElement.getElementsByTagName("Debt1").item(0).getTextContent());
								dataMap.put("BUSINESS_VALUE",
										eElement.getElementsByTagName("Value2").item(0).getTextContent());
								dataMap.put("BUSINESS_DEBT",
										eElement.getElementsByTagName("Debt2").item(0).getTextContent());
								dataMap.put("FARM_VALUE",
										eElement.getElementsByTagName("Value3").item(0).getTextContent());
								dataMap.put("FARM_DEBT",
										eElement.getElementsByTagName("Debt3").item(0).getTextContent());
								dataMap.put("STUDENT_ASSETS_CB",
										eElement.getElementsByTagName("StudentAssetsCB").item(0).getTextContent());

								dataMap.put("STUDENT_SIGNATURE",
										eElement.getElementsByTagName("studentSignature").item(0).getTextContent());
								String studentSignDate = eElement.getElementsByTagName("studentSignDate").item(0)
										.getTextContent();
								Object studentSignDateObj = "";
								if (studentSignDate != null && studentSignDate != "") {
									Date studentSignDateNew = Date.valueOf(studentSignDate);
									studentSignDateObj = studentSignDateNew;
								}
								dataMap.put("STUDENT_SIGN_DATE", studentSignDateObj);

								dataMap.put("FINANCIAL_AID_SIGNATURE",
										eElement.getElementsByTagName("staffSignature").item(0).getTextContent());
								String financialaiddate = eElement.getElementsByTagName("staffSignDate").item(0)
										.getTextContent();
								Object financialaiddateObj = "";
								if (financialaiddate != null && financialaiddate != "") {
									Date financialaiddateNew = Date.valueOf(financialaiddate);
									financialaiddateObj = financialaiddateNew;
								}
								dataMap.put("FINANCIAL_AID_SIGN_DATE", financialaiddateObj);

								dataMap.put("FINANCIAL_AID_COMMENTS",
										eElement.getElementsByTagName("staffComment").item(0).getTextContent());
								dataMap.put("FINANCIAL_AID_DECISION",
										eElement.getElementsByTagName("staffDecision").item(0).getTextContent());

								dataMap.put("WORKFLOW_INSTANCE_ID", wfInstanceID);
								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());

								log.debug("DataMap values :{}", dataMap);
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
									String workItemId = wfInstanceID.concat(firstStr).concat("_").concat(secString);
									assignee = taskService.getTaskAssignee(workItemId);
									log.debug("Executing else block assignee : {}", assignee);
								}
								dataMap.put("LAST_STEP", saveHistoryBackRoute);
								if (dataMap.get("LAST_STEP").equals("Financial Aid Review")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNNING");
								}
								dataMap.put("LAST_STEP_ASSIGNEE", assignee);

							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}

				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", wfInstanceID, tableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSDVData(conn, cwid, "CWID", wfInstanceID, tableName);
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
						log.debug("IOException in ParentProjectedYearIncomeAppealDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in ParentProjectedYearIncomeAppealDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}

}
