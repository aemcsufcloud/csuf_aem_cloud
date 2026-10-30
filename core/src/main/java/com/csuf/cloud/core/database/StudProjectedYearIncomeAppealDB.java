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

@Component(property = { "service.description=Stud Proj Year Income Appeal DB", "service.vendor=ThoughtFocus",
		"process.label=Stud Proj Year Income Appeal DB" })

public class StudProjectedYearIncomeAppealDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(StudProjectedYearIncomeAppealDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_STU_PROJECT_INCOME_APPEAL";
		String formName = "Student Projected Year Income Appeal";			
		String assignee = "";
		String cwid = "";
		String caseid = "";
		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

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
							log.debug("index="+temp);
							cwid = eElement.getElementsByTagName("cwid").item(0).getTextContent();
							caseid = eElement.getElementsByTagName("caseId").item(0).getTextContent();
							dataMap.put("CASEID", caseid);
							dataMap.put("CWID", eElement.getElementsByTagName("cwid").item(0).getTextContent());
							dataMap.put("FIRST_NAME", eElement.getElementsByTagName("firstName").item(0).getTextContent());
							dataMap.put("LAST_NAME", eElement.getElementsByTagName("lastName").item(0).getTextContent());
							
							dataMap.put("FINANCIAL_AID_YEAR", eElement.getElementsByTagName("financialAidYear").item(0).getTextContent());
							
                        	dataMap.put("REASON1_CB1", eElement.getElementsByTagName("Reason1CB").item(0).getTextContent());
							dataMap.put("REASON1_CB2", eElement.getElementsByTagName("Reason1CB2").item(0).getTextContent());
							dataMap.put("REASON1_CB3", eElement.getElementsByTagName("Reason1CB3").item(0).getTextContent());
							dataMap.put("REASON1_CB4", eElement.getElementsByTagName("Reason1CB4").item(0).getTextContent());
							dataMap.put("REASON1_CB5", eElement.getElementsByTagName("Reason1CB5").item(0).getTextContent());
							dataMap.put("REASON1_CB3", eElement.getElementsByTagName("Reason1CB6").item(0).getTextContent());
							
							
							dataMap.put("DOCUMENT_CB1", eElement.getElementsByTagName("DocumentCB1").item(0).getTextContent());
							dataMap.put("DOCUMENT_TF1", eElement.getElementsByTagName("DocumentsTF1").item(0).getTextContent());
							dataMap.put("DOCUMENT_CB2", eElement.getElementsByTagName("DocumentCB2").item(0).getTextContent());
							dataMap.put("DOCUMENT_TF2", eElement.getElementsByTagName("DocumentsTF2").item(0).getTextContent());
							dataMap.put("DOCUMENT_CB3", eElement.getElementsByTagName("DocumentCB3").item(0).getTextContent());
							dataMap.put("DOCUMENT_CB4", eElement.getElementsByTagName("DocumentCB4").item(0).getTextContent());
							dataMap.put("DOCUMENT_CB5", eElement.getElementsByTagName("DocumentCB5").item(0).getTextContent());
							dataMap.put("DOCUMENT_CB6", eElement.getElementsByTagName("DocumentCB6").item(0).getTextContent());
							dataMap.put("DOCUMENT_CB7", eElement.getElementsByTagName("DocumentCB7").item(0).getTextContent());
							dataMap.put("DOCUMENT_CB8", eElement.getElementsByTagName("DocumentCB8").item(0).getTextContent());
							dataMap.put("DOCUMENT_CB9", eElement.getElementsByTagName("DocumentCB9").item(0).getTextContent());
							dataMap.put("DOCUMENT_CB10", eElement.getElementsByTagName("DocumentCB10").item(0).getTextContent());
							dataMap.put("DOCUMENT_CB11", eElement.getElementsByTagName("DocumentCB11").item(0).getTextContent());
							dataMap.put("OTHER_CB", eElement.getElementsByTagName("OtherrCB1").item(0).getTextContent());
							dataMap.put("OTHER_TF", eElement.getElementsByTagName("OtherTF").item(0).getTextContent());
							dataMap.put("COMMENTS_TF", eElement.getElementsByTagName("CommentsTF").item(0).getTextContent());
							
							dataMap.put("FROM_DATE", eElement.getElementsByTagName("FromDate").item(0).getTextContent());
							dataMap.put("TO_DATE", eElement.getElementsByTagName("ToDate").item(0).getTextContent());
							
							dataMap.put("INCOME1", eElement.getElementsByTagName("incomeStudent1").item(0).getTextContent());
							dataMap.put("INCOME2", eElement.getElementsByTagName("IncomeStudent2").item(0).getTextContent());
							dataMap.put("CASH_ACCOUNTS", eElement.getElementsByTagName("CashAccounts").item(0).getTextContent());
							dataMap.put("STUDENT_ASSET_CB", eElement.getElementsByTagName("StudentAssetsCB").item(0).getTextContent());
							dataMap.put("INCOME_SPOUSE1", eElement.getElementsByTagName("incomeSpouse1").item(0).getTextContent());
							dataMap.put("INCOME_SPOUSE2", eElement.getElementsByTagName("IncomeSpouse2").item(0).getTextContent());
							dataMap.put("PAYMENTS1", eElement.getElementsByTagName("Payments1").item(0).getTextContent());
							dataMap.put("DISABILITY1", eElement.getElementsByTagName("Disability1").item(0).getTextContent());
							dataMap.put("PAYMENTS2", eElement.getElementsByTagName("Payments2").item(0).getTextContent());
                            dataMap.put("DISABILITY2", eElement.getElementsByTagName("Disability2").item(0).getTextContent());
                            
							dataMap.put("VALUE1", eElement.getElementsByTagName("Value1").item(0).getTextContent());
							dataMap.put("VALUE2", eElement.getElementsByTagName("Value2").item(0).getTextContent());
							dataMap.put("VALUE3", eElement.getElementsByTagName("Value3").item(0).getTextContent());

							dataMap.put("DEBT1", eElement.getElementsByTagName("Debt1").item(0).getTextContent());
							dataMap.put("DEBT2", eElement.getElementsByTagName("Debt2").item(0).getTextContent());
							dataMap.put("DEBT3", eElement.getElementsByTagName("Debt3").item(0).getTextContent());

							dataMap.put("STAGE_INDICATOR", eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
							
							String initiatedDate = eElement.getElementsByTagName("Date_1").item(0).getTextContent();
							Object initiatedDateObj = "";
							if (initiatedDate != null && initiatedDate != "") {
								Date initiatedDateNew = Date.valueOf(initiatedDate);
								initiatedDateObj = initiatedDateNew;
							}
							dataMap.put("INITIATED_DATE", initiatedDateObj);
							dataMap.put("AID_YEAR",eElement.getElementsByTagName("aidYear").item(0).getTextContent());
							dataMap.put("IP_ADDRESS", eElement.getElementsByTagName("ipAddress").item(0).getTextContent());
							dataMap.put("FORM_CODE", eElement.getElementsByTagName("formCode").item(0).getTextContent());
							
							String studdate = eElement.getElementsByTagName("SignDate").item(0).getTextContent();
							Object studdateObj = "";
							if (studdate != null && studdate != "") {
								Date studdateNew = Date.valueOf(studdate);
								studdateObj = studdateNew;
							}
							dataMap.put("STUDENT_SIGN_DATE", studdateObj);
							dataMap.put("PRINT_STUDENT_NAME", eElement.getElementsByTagName("PrintStudentName").item(0).getTextContent());
							//dataMap.put("STUDENT_COMMENTS", eElement.getElementsByTagName("StudentComments").item(0).getTextContent());

							dataMap.put("FINANCIAL_AID_SIGNATURE", eElement.getElementsByTagName("FinancialAidSign").item(0).getTextContent());
							String financialaiddate = eElement.getElementsByTagName("FinancialAidSignDate").item(0).getTextContent();
							Object financialaiddateObj = "";
							if (financialaiddate != null && financialaiddate != "") {
								Date financialaiddateNew = Date.valueOf(financialaiddate);
								financialaiddateObj = financialaiddateNew;
							}
							dataMap.put("FINANCIAL_AID_SIGN_DATE", financialaiddateObj);
							
					        dataMap.put("FINANCIAL_AID_COMMENTS", eElement.getElementsByTagName("staffComment").item(0).getTextContent());
					        dataMap.put("FINANCIAL_AID_DECISION", eElement.getElementsByTagName("staffDecision").item(0).getTextContent());
							dataMap.put("STUDENT_EMAILID", eElement.getElementsByTagName("HiddenStudentEmail").item(0).getTextContent());
							dataMap.put("STUDENT_NAME", eElement.getElementsByTagName("StudentName").item(0).getTextContent());
							dataMap.put("STUDENT_USERID", eElement.getElementsByTagName("HiddenStudentUserID").item(0).getTextContent());
							
								
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
								String workItemId = workflowInstanceID.concat(firstStr).concat("_").concat(secString);
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
							
							}  catch (Exception e) {
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
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "CWID", workflowInstanceID, dataMap,
							"INITIATED_DATE,STUDENT_SIGN_DATE,FINANCIAL_AID_SIGN_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}


			}  catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			}finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in StudProjectedYearIncomeAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
/*				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in StudProjectedYearIncomeAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}*/
			}
			

		}

	}

}
