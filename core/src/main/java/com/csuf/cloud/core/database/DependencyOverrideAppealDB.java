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
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Dependency Override Appeal DB Save", "service.vendor=ThoughtFocus",
"process.label= DependencyOverrideAppealDB" })
public class DependencyOverrideAppealDB implements WorkflowProcess{
	
	
	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(DependencyOverrideAppealDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) 
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_DEP_OVERRIDE_APPEAL";
		String formName = "Dependency Override Appeal";		
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
							dataMap.put("CWID", cwid);
							dataMap.put("CASEID", caseid);
							dataMap.put("AID_YEAR",eElement.getElementsByTagName("aidYear").item(0).getTextContent());
							dataMap.put("FORM_TYPE",eElement.getElementsByTagName("formType").item(0).getTextContent());
							dataMap.put("FIRST_NAME",eElement.getElementsByTagName("firstName").item(0).getTextContent());
							dataMap.put("LAST_NAME",eElement.getElementsByTagName("lastName").item(0).getTextContent());
							dataMap.put("FINANCIAL_AID_YEAR",eElement.getElementsByTagName("financialAidYear").item(0).getTextContent());
							dataMap.put("INSTRUCTION1",eElement.getElementsByTagName("Instruction1").item(0).getTextContent());
							dataMap.put("INSTRUCTION2",eElement.getElementsByTagName("Instruction2").item(0).getTextContent());
							dataMap.put("INSTRUCTION3",eElement.getElementsByTagName("Instruction3").item(0).getTextContent());
							dataMap.put("FAFSA_INSTRUCTION1",eElement.getElementsByTagName("FAFSAInstruction1").item(0).getTextContent());
							dataMap.put("FAFSA_INSTRUCTION2",eElement.getElementsByTagName("FAFSAInstruction2").item(0).getTextContent());
							dataMap.put("FAFSA_INSTRUCTION3",eElement.getElementsByTagName("FAFSAInstruction3").item(0).getTextContent());
							dataMap.put("STEP1CB1",eElement.getElementsByTagName("Step1CB1").item(0).getTextContent());
							dataMap.put("STEP1CB2",eElement.getElementsByTagName("Step1CB2").item(0).getTextContent());
							dataMap.put("STEP1CB3",eElement.getElementsByTagName("Step1CB3").item(0).getTextContent());
							dataMap.put("STEP1CB4",eElement.getElementsByTagName("Step1CB4").item(0).getTextContent());
							dataMap.put("STEP2CB1",eElement.getElementsByTagName("Step2CB1").item(0).getTextContent());
							dataMap.put("STEP2CB2",eElement.getElementsByTagName("Step2CB2").item(0).getTextContent());
							dataMap.put("STEP2CB3",eElement.getElementsByTagName("Step2CB3").item(0).getTextContent());
							
							dataMap.put("PRINT_STUDENTS_NAME",eElement.getElementsByTagName("PrintStudentsName").item(0).getTextContent());
							dataMap.put("PRINT_STUDENT_CWID",eElement.getElementsByTagName("PrintStudentCWID").item(0).getTextContent());
							dataMap.put("PERSONAL_STATEMENT_A",eElement.getElementsByTagName("PersonalStatementA").item(0).getTextContent());
							dataMap.put("PERSONAL_STATEMENT_B",eElement.getElementsByTagName("PersonalStatementB").item(0).getTextContent());
							  String oneDate = eElement.getElementsByTagName("DATE1").item(0).getTextContent();
								Object oneDateObj = "";
								if (oneDate != null && oneDate != "") {
									Date oneDateNew = Date.valueOf(oneDate);
									oneDateObj = oneDateNew;
								}
								dataMap.put("DATE1", oneDateObj);
							dataMap.put("EVENT1",eElement.getElementsByTagName("EVENT1").item(0).getTextContent());
							
							String twoDate = eElement.getElementsByTagName("DATE2").item(0).getTextContent();
							Object twoDateObj = "";
							if (twoDate != null && twoDate != "") {
								Date twoDateNew = Date.valueOf(twoDate);
								twoDateObj = twoDateNew;
							}
							dataMap.put("DATE2", twoDateObj);
							
							dataMap.put("EVENT2",eElement.getElementsByTagName("EVENT2").item(0).getTextContent());
							String threeDate = eElement.getElementsByTagName("DATE3").item(0).getTextContent();
							Object threeDateObj = "";
							if (threeDate != null && threeDate != "") {
								Date threeDateNew = Date.valueOf(threeDate);
								threeDateObj = threeDateNew;
							}
							dataMap.put("DATE3", threeDateObj);
							
							dataMap.put("EVENT3",eElement.getElementsByTagName("EVENT3").item(0).getTextContent());
							
							 String fourDate = eElement.getElementsByTagName("DATE4").item(0).getTextContent();
								Object fourDateObj = "";
								if (fourDate != null && fourDate != "") {
									Date fourDateNew = Date.valueOf(fourDate);
									fourDateObj = fourDateNew;
								}
								dataMap.put("DATE4", fourDateObj);
							
							dataMap.put("EVENT4",eElement.getElementsByTagName("EVENT4").item(0).getTextContent());
							
							  String fiveDate = eElement.getElementsByTagName("DATE5").item(0).getTextContent();
								Object fiveDateObj = "";
								if (fiveDate != null && fiveDate != "") {
									Date fiveDateNew = Date.valueOf(fiveDate);
									fiveDateObj = fiveDateNew;
								}
								dataMap.put("DATE5", fiveDateObj);
							
							dataMap.put("EVENT5",eElement.getElementsByTagName("EVENT5").item(0).getTextContent());
							dataMap.put("STATEMENT_D_MONTH",eElement.getElementsByTagName("StatementDMonth").item(0).getTextContent());
							dataMap.put("STATEMENT_D_YEAR",eElement.getElementsByTagName("StatementDYear").item(0).getTextContent());
							dataMap.put("PARENT_NAME",eElement.getElementsByTagName("ParentName").item(0).getTextContent());
							dataMap.put("STREET",eElement.getElementsByTagName("Street").item(0).getTextContent());
							dataMap.put("CITY",eElement.getElementsByTagName("City").item(0).getTextContent());
							
							dataMap.put("STATE",eElement.getElementsByTagName("State").item(0).getTextContent());
							dataMap.put("ZIP_CODE",eElement.getElementsByTagName("ZipCode").item(0).getTextContent());
							dataMap.put("TELEPHONE_NUMBER",eElement.getElementsByTagName("TelephoneNumber").item(0).getTextContent());
							dataMap.put("CIRCUMSTANCE_OF_PARENT",eElement.getElementsByTagName("CircumstanceOfParent").item(0).getTextContent());
							
						    String initiatedDate = eElement.getElementsByTagName("Date_1").item(0).getTextContent();
							Object initiatedDateObj = "";
							if (initiatedDate != null && initiatedDate != "") {
								Date initiatedDateNew = Date.valueOf(initiatedDate);
								initiatedDateObj = initiatedDateNew;
							}
							dataMap.put("INITIATED_DATE", initiatedDateObj);
							dataMap.put("STUDENT_SIGNATURE", eElement.getElementsByTagName("StudentSignature").item(0).getTextContent());
							String studentSignDate = eElement.getElementsByTagName("DATE").item(0).getTextContent();
							Object studentSignDateObj = "";
							if (studentSignDate != null && studentSignDate != "") {
								Date studentSignDateNew = Date.valueOf(studentSignDate);
								studentSignDateObj = studentSignDateNew;
							}
							dataMap.put("STUDENT_SIGN_DATE", studentSignDateObj);
							dataMap.put("STUDENT_COMMENTS", eElement.getElementsByTagName("StudentComments").item(0).getTextContent());
							dataMap.put("FINANCIAL_AID_SIGNATURE", eElement.getElementsByTagName("FinancialAidSign").item(0).getTextContent());
							String finAidSignDate = eElement.getElementsByTagName("FinancialAidSignDate").item(0).getTextContent();
							Object finAidSignDateObj = "";
							if (finAidSignDate != null && finAidSignDate != "") {
								Date finAidSignDateNew = Date.valueOf(finAidSignDate);
								finAidSignDateObj = finAidSignDateNew;
							}
							dataMap.put("FINANCIAL_AID_SIGN_DATE", finAidSignDateObj );
							dataMap.put("FINANCIAL_AID_COMMENTS", eElement.getElementsByTagName("staffComment").item(0).getTextContent());
							dataMap.put("FINANCIAL_AID_DECISION", eElement.getElementsByTagName("staffDecision").item(0).getTextContent());
							dataMap.put("STUDENT_USERID", eElement.getElementsByTagName("HiddenStudentUserID").item(0).getTextContent());
							dataMap.put("STUDENT_EMAILID", eElement.getElementsByTagName("HiddenStudentEmail").item(0).getTextContent());	
							dataMap.put("IP_ADDRESS", eElement.getElementsByTagName("ipAddress").item(0).getTextContent());
							dataMap.put("FORM_CODE", eElement.getElementsByTagName("formCode").item(0).getTextContent());
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
							"DATE1,DATE2,DATE3,DATE4,DATE5,INITIATED_DATE,STUDENT_SIGN_DATE,FINANCIAL_AID_SIGN_DATE");
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
						log.debug("IOException in DependencyOverrideAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				/*if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in DependencyOverrideAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}*/
			}
			

		}
		
		
	}


}
