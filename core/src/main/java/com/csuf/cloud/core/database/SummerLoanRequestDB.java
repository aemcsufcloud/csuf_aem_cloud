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

@Component(property = { "service.description=Summer Loan Request DB", "service.vendor=ThoughtFocus",
		"process.label=Summer Loan Request DB" })

public class SummerLoanRequestDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(SummerLoanRequestDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_SUMMER_LOAN_REQ";
		String formName = "Summer Loan Request";			
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
							dataMap.put("CWID", cwid);
							dataMap.put("CASEID", caseid);
							dataMap.put("AID_YEAR",eElement.getElementsByTagName("aidYear").item(0).getTextContent());
							dataMap.put("FIRST_NAME", eElement.getElementsByTagName("firstName").item(0).getTextContent());
							dataMap.put("LAST_NAME", eElement.getElementsByTagName("lastName").item(0).getTextContent());
							dataMap.put("MI", eElement.getElementsByTagName("MI").item(0).getTextContent());
							dataMap.put("FINANCIAL_AID_YEAR",eElement.getElementsByTagName("financialAidYear").item(0).getTextContent());
							dataMap.put("STREET_NAME", eElement.getElementsByTagName("StreetName").item(0).getTextContent());
                        	dataMap.put("HOME_TELEPHONE_NUMBER", eElement.getElementsByTagName("HomeTelephoneNumber").item(0).getTextContent());
							dataMap.put("CITY", eElement.getElementsByTagName("City").item(0).getTextContent());
							dataMap.put("STATE", eElement.getElementsByTagName("State").item(0).getTextContent());
							dataMap.put("ZIP", eElement.getElementsByTagName("Zip").item(0).getTextContent());
							dataMap.put("CELLPHONE", eElement.getElementsByTagName("CellPhone").item(0).getTextContent());
							dataMap.put("CAMPUSWIDECWID", eElement.getElementsByTagName("CampusWIdeCWID").item(0).getTextContent());
							dataMap.put("CB1", eElement.getElementsByTagName("CB1").item(0).getTextContent());
							dataMap.put("LOAN_REQUEST_YES_NO", eElement.getElementsByTagName("LoanRequestYesNo").item(0).getTextContent());
						    dataMap.put("SUMMER_LOAN_YES_NO", eElement.getElementsByTagName("SummerLoanYesNo").item(0).getTextContent());
						    dataMap.put("LOAN_AMOUNT_FIELD", eElement.getElementsByTagName("LoanamountField").item(0).getTextContent());
							dataMap.put("ELIGIBILITY_YES_NO", eElement.getElementsByTagName("EligibilityYesNo").item(0).getTextContent());
						
							String initiatedDate = eElement.getElementsByTagName("Date_1").item(0).getTextContent();
							Object initiatedDateObj = "";
							if (initiatedDate != null && initiatedDate != "") {
								Date initiatedDateNew = Date.valueOf(initiatedDate);
								initiatedDateObj = initiatedDateNew;
							}
							dataMap.put("INITIATED_DATE", initiatedDateObj);
								
							dataMap.put("SIGNATURE", eElement.getElementsByTagName("Signature").item(0).getTextContent());
							String signdate = eElement.getElementsByTagName("SignDate").item(0).getTextContent();
							Object signdateObj = "";
							if (signdate != null && signdate != "") {
								Date signdateNew = Date.valueOf(signdate);
								signdateObj = signdateNew;
							}
							dataMap.put("SIGN_DATE", signdateObj);
							
							dataMap.put("FINANCIAL_AID_SIGN", eElement.getElementsByTagName("FinancialAidSign").item(0).getTextContent());
							String financialaiddate = eElement.getElementsByTagName("FinancialAidSignDate").item(0).getTextContent();
							Object financialaiddateObj = "";
							if (financialaiddate != null && financialaiddate != "") {
								Date financialaiddateNew = Date.valueOf(financialaiddate);
								financialaiddateObj = financialaiddateNew;
							}
							dataMap.put("FINANCIAL_AID_SIGN_DATE", financialaiddateObj);
							dataMap.put("PRINT_STUDENT_NAME", eElement.getElementsByTagName("PrintStudentName").item(0).getTextContent());
					        dataMap.put("FINANCIAL_AID_DECISION", eElement.getElementsByTagName("staffDecision").item(0).getTextContent());
							dataMap.put("STAGE_INDICATOR", eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
							dataMap.put("CWID_CERTIFICATION", eElement.getElementsByTagName("CWID_Certification").item(0).getTextContent());
					        dataMap.put("FINANCIAL_AID_COMMENTS", eElement.getElementsByTagName("staffComment").item(0).getTextContent());
							dataMap.put("HIDDEN_STUDENT_EMAILID", eElement.getElementsByTagName("HiddenStudentEmail").item(0).getTextContent());
							dataMap.put("HIDDEN_STUDENT_NAME", eElement.getElementsByTagName("HiddenStudentName").item(0).getTextContent());
							dataMap.put("HIDDEN_STUDENT_USERID", eElement.getElementsByTagName("HiddenStudentUserID").item(0).getTextContent());
							dataMap.put("IP_ADDRESS", eElement.getElementsByTagName("ipAddress").item(0).getTextContent());
							dataMap.put("FORM_CODE", eElement.getElementsByTagName("formCode").item(0).getTextContent());
							dataMap.put("STUDENT_COMMENTS", eElement.getElementsByTagName("StudentComments").item(0).getTextContent());

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
								log.debug("Last Step assignee : {}",assignee);
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
							"INITIATED_DATE,SIGN_DATE,FINANCIAL_AID_SIGN_DATE");
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
						log.debug("IOException in SummerLoanRequestDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
/*				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in SummerLoanRequestDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}*/
			}
			

		}

	}

}
