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
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Student Budget Adjustment Appeal DB Save", "service.vendor=ThoughtFocus",
"process.label=StudentBudgetAdjAppealDB" })
public class StudentBudgetAdjAppealDB implements WorkflowProcess{
	
	
	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(StudentBudgetAdjAppealDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) 
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_STU_BUDGET_ADJ_APPEAL";
		String formName = "Student Budget Adjustment Appeal";		
		String assignee = "";
		String cwid = "";
		String caseid = "";
		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		log.debug("Workflowinstanceid:"+workflowInstanceID);
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
							
							log.debug("CWID = " +cwid);
							log.debug("CASEID = " +caseid);
							
				
							dataMap.put("CWID", cwid);
							dataMap.put("CASE_ID", caseid);
							
							dataMap.put("AID_YEAR",eElement.getElementsByTagName("aidYear").item(0).getTextContent()); 
							dataMap.put("FIRST_NAME",eElement.getElementsByTagName("firstName").item(0).getTextContent()); 
							dataMap.put("LAST_NAME",eElement.getElementsByTagName("lastName").item(0).getTextContent());
							
							
							dataMap.put("FINANCIAL_AID_YEAR",eElement.getElementsByTagName("financialAidYear").item(0).getTextContent());
							String initiatedDate = eElement.getElementsByTagName("Date_1").item(0).getTextContent();
							Object initiatedDateObj = "";
							if (initiatedDate != null && initiatedDate != "") {
								Date initiatedDateNew = Date.valueOf(initiatedDate);
								initiatedDateObj = initiatedDateNew;
							}
							dataMap.put("INITIATED_DATE", initiatedDateObj); 
							
							dataMap.put("BUDGET_TYPE1",eElement.getElementsByTagName("BudgetType1").item(0).getTextContent());
							dataMap.put("BUDGET_TYPE2",eElement.getElementsByTagName("BudgetType2").item(0).getTextContent());
							dataMap.put("BUDGET_TYPE3",eElement.getElementsByTagName("BudgetType3").item(0).getTextContent());
							dataMap.put("BUDGET_TYPE4",eElement.getElementsByTagName("BudgetType4").item(0).getTextContent());
							dataMap.put("BUDGET_TYPE5",eElement.getElementsByTagName("BudgetType5").item(0).getTextContent());
							dataMap.put("BUDGET_TYPE6",eElement.getElementsByTagName("BudgetType6").item(0).getTextContent());
							
							dataMap.put("AMOUNT_1",eElement.getElementsByTagName("Amount1").item(0).getTextContent());
							dataMap.put("AMOUNT_2",eElement.getElementsByTagName("Amount2").item(0).getTextContent());
							dataMap.put("AMOUNT_3",eElement.getElementsByTagName("Amount3").item(0).getTextContent());
							dataMap.put("AMOUNT_4",eElement.getElementsByTagName("Amount4").item(0).getTextContent());
							dataMap.put("AMOUNT_5",eElement.getElementsByTagName("Amount5").item(0).getTextContent());
							dataMap.put("AMOUNT_6",eElement.getElementsByTagName("Amount6").item(0).getTextContent());
							dataMap.put("AMOUNT_7",eElement.getElementsByTagName("Amount7").item(0).getTextContent());
							dataMap.put("FIRST_FORM_YES_NO",eElement.getElementsByTagName("FirstFormYesNo").item(0).getTextContent());
							dataMap.put("HOME_PHONE_NUMBER",eElement.getElementsByTagName("HomePhoneNumber").item(0).getTextContent());
							dataMap.put("CELL_MESSGE_NUMBER",eElement.getElementsByTagName("MessgeNumber").item(0).getTextContent());
							
							dataMap.put("STUDENT_SIGNATURE", eElement.getElementsByTagName("StudentName").item(0).getTextContent());
							String studentSignDate = eElement.getElementsByTagName("StudentSignatureDate").item(0).getTextContent();
							Object studentSignDateObj = "";
							if (studentSignDate != null && studentSignDate != "") {
								Date studentSignDateNew = Date.valueOf(studentSignDate);
								studentSignDateObj = studentSignDateNew;
							}
							dataMap.put("STUDENT_SIGN_DATE", studentSignDateObj);
							
							dataMap.put("FINANCIAL_AID_SIGNATURE", eElement.getElementsByTagName("StaffInitials").item(0).getTextContent());
							String approverSignDate = eElement.getElementsByTagName("StaffDate").item(0).getTextContent();
							Object approverSignDateObj = "";
							if (approverSignDate != null && approverSignDate != "") {
								Date approverSignDateNew = Date.valueOf(approverSignDate);
								approverSignDateObj = approverSignDateNew;
							}
							dataMap.put("FINANCIAL_AID_SIGN_DATE", approverSignDateObj );
							dataMap.put("FINANCIAL_AID_DECISION", eElement.getElementsByTagName("staffDecision").item(0).getTextContent());
							dataMap.put("FINANCIAL_AID_COMMENTS", eElement.getElementsByTagName("staffComment").item(0).getTextContent());
						
						  	dataMap.put("STUDENT_USERID", eElement.getElementsByTagName("HiddenStudentUserID").item(0).getTextContent());
							dataMap.put("STUDENT_EMAIL", eElement.getElementsByTagName("HiddenStudentEmail").item(0).getTextContent());
							dataMap.put("STUDENT_NAME",eElement.getElementsByTagName("HiddenStudentName").item(0).getTextContent());
							
							dataMap.put("IP_ADDRESS", eElement.getElementsByTagName("ipAddress").item(0).getTextContent());
							dataMap.put("FORM_CODE", eElement.getElementsByTagName("formCode").item(0).getTextContent());
							
							dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID); 
							
							dataMap.put("STAGE_INDICATOR", eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
							log.debug("DataMap values :{}",dataMap);
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
								String workItemId = workflowInstanceID.concat(firstStr).concat("_").concat(secString);
								assignee = taskService.getTaskAssignee(workItemId);
								log.debug("Executing else block assignee : {}",assignee);
							}
							dataMap.put("LAST_STEP", saveHistoryBackRoute);
							if (dataMap.get("LAST_STEP").equals("Financial Aid Review")) {
								dataMap.put("WORKFLOW_STATUS", "COMPLETED");
							} else {
								dataMap.put("WORKFLOW_STATUS", "RUNNING");
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
					log.debug("ResultData : {}",resultData);
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
						log.debug("IOException in StudentBudgetAdjAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
/*				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in StudentBudgetAdjAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}*/
			}
			

		}
		
		
	}


}
