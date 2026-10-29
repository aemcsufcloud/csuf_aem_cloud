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

@Component(property = { "service.description=Golden State Teacher Grant Certification Request Form DB Save", "service.vendor=ThoughtFocus",
"process.label=GoldenStateTeacherGrantCertificationRequestFormDB" })
public class GoldenStateTeacherGrantCertificationRequestFormDB implements WorkflowProcess{
	
	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(GoldenStateTeacherGrantCertificationRequestFormDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) 
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_GOLDEN_STATE_TEACHER_GRANT";
		String formName = "Golden State Teacher Grant Certification Request Form";		
		String assignee = "";
		String cwid = "";
		String caseid = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

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
							dataMap.put("FINANCIAL_AID_YEAR",eElement.getElementsByTagName("financialAidYear").item(0).getTextContent());
							String initiatedDate = eElement.getElementsByTagName("Date_1").item(0).getTextContent();
							Object initiatedDateObj = "";
							if (initiatedDate != null && initiatedDate != "") {
								Date initiatedDateNew = Date.valueOf(initiatedDate);
								initiatedDateObj = initiatedDateNew;
							}
							dataMap.put("INITIATED_DATE", initiatedDateObj);
							
							dataMap.put("NAME_CREDENTIAL",eElement.getElementsByTagName("NameCredential").item(0).getTextContent());
							dataMap.put("EXP_COMPLETION",eElement.getElementsByTagName("ExpectedCompletion").item(0).getTextContent());
							dataMap.put("FALL_PERIOD",eElement.getElementsByTagName("Fall_CB").item(0).getTextContent());
							dataMap.put("SPRING_PERIOD", eElement.getElementsByTagName("Spring_CB").item(0).getTextContent());
							dataMap.put("SUMMER_PERIOD",eElement.getElementsByTagName("Summer_CB").item(0).getTextContent());
							
							dataMap.put("LOAN_STATEMENT_1",eElement.getElementsByTagName("Loan_RB1").item(0).getTextContent());
							dataMap.put("LOAN_STATEMENT_2", eElement.getElementsByTagName("Loan_RB2").item(0).getTextContent());
							dataMap.put("LOAN_STATEMENT_3",eElement.getElementsByTagName("Loan_RB3").item(0).getTextContent());
							dataMap.put("GSTG_AMOUNT",eElement.getElementsByTagName("GSTGAmount").item(0).getTextContent());
							
							dataMap.put("CERTIFICATION_CB1",eElement.getElementsByTagName("Certification_CB1").item(0).getTextContent());
							dataMap.put("CERTIFICATION_CB2",eElement.getElementsByTagName("Certification_CB2").item(0).getTextContent());
							dataMap.put("CERTIFICATION_CB3", eElement.getElementsByTagName("Certification_CB3").item(0).getTextContent());
							dataMap.put("CERTIFICATION_CB4",eElement.getElementsByTagName("Certification_CB4").item(0).getTextContent());
							dataMap.put("CERTIFICATION_CB5",eElement.getElementsByTagName("Certification_CB5").item(0).getTextContent());
							dataMap.put("STUDENT_SIGNATURE", eElement.getElementsByTagName("studentSignature").item(0).getTextContent());
							String studentSignDate = eElement.getElementsByTagName("studentSignDate").item(0).getTextContent();
							Object studentSignDateObj = "";
							if (studentSignDate != null && studentSignDate != "") {
								Date studentSignDateNew = Date.valueOf(studentSignDate);
								studentSignDateObj = studentSignDateNew;
							}
							dataMap.put("STUDENT_SIGN_DATE", studentSignDateObj);
							
							dataMap.put("FINANCIAL_AID_SIGNATURE", eElement.getElementsByTagName("staffSignature").item(0).getTextContent());
							String approverSignDate = eElement.getElementsByTagName("staffSignDate").item(0).getTextContent();
							Object approverSignDateObj = "";
							if (approverSignDate != null && approverSignDate != "") {
								Date approverSignDateNew = Date.valueOf(approverSignDate);
								approverSignDateObj = approverSignDateNew;
							}
							dataMap.put("FINANCIAL_AID_SIGN_DATE", approverSignDateObj );
							dataMap.put("FINANCIAL_AID_COMMENTS", eElement.getElementsByTagName("staffComment").item(0).getTextContent());
							dataMap.put("FINANCIAL_AID_DECISION", eElement.getElementsByTagName("staffDecision").item(0).getTextContent());
							
							dataMap.put("STUDENT_FIRST_NAME", eElement.getElementsByTagName("firstName").item(0).getTextContent());
							dataMap.put("STUDENT_LAST_NAME", eElement.getElementsByTagName("lastName").item(0).getTextContent());	
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

			}  catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			}finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in GoldenStateTeacherGrantCertificationRequestFormDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in GoldenStateTeacherGrantCertificationRequestFormDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}			
		}				
	}
}