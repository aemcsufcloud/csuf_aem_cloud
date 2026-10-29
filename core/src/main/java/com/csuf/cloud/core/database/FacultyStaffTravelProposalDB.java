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

@Component(property = { "service.description=Faculty/Staff Travel Proposal DB Save", "service.vendor=ThoughtFocus",
		"process.label=FacultyStaffTravelProposalDB" })
public class FacultyStaffTravelProposalDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(FacultyStaffTravelProposalDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_FACULTY_TRAVEL";
		String formName = "Faculty Staff Travel Proposal";
		String assignee = "";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
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
								dataMap.put("CWID", cwid);
								dataMap.put("CASE_ID",
										eElement.getElementsByTagName("CaseId").item(0).getTextContent());
								dataMap.put("FULL_NAME",
										eElement.getElementsByTagName("FullName").item(0).getTextContent());
								dataMap.put("FIRST_NAME",
										eElement.getElementsByTagName("FirstName").item(0).getTextContent());
								dataMap.put("LAST_NAME",
										eElement.getElementsByTagName("LastName").item(0).getTextContent());
								dataMap.put("EMAIL",
										eElement.getElementsByTagName("Email").item(0).getTextContent());
								String initiatedDate = eElement.getElementsByTagName("InitiatedDate").item(0).getTextContent();
								Object initiatedDateObj = "";
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatedDate);
									initiatedDateObj = initiatedDateNew;
								}
								dataMap.put("INITIATED_DATE", initiatedDateObj);
								dataMap.put("PHONE",eElement.getElementsByTagName("Phone").item(0).getTextContent());
								dataMap.put("LOCATION",eElement.getElementsByTagName("Location").item(0).getTextContent());
								dataMap.put("AMOUNT_REQUESTED", eElement.getElementsByTagName("AmountRequested").item(0).getTextContent());
								dataMap.put("PRESENTING_CB",eElement.getElementsByTagName("PresentingCB").item(0).getTextContent());
								dataMap.put("PARTICIPATING_CB", eElement.getElementsByTagName("ParticipatingCB").item(0).getTextContent());
								dataMap.put("ATTENDING_CB", eElement.getElementsByTagName("AttendingCB").item(0).getTextContent());
								dataMap.put("FOREIGN_DD",eElement.getElementsByTagName("ForeignDD").item(0).getTextContent());
								String fromDate = eElement.getElementsByTagName("FromDate").item(0).getTextContent();
								Object fromDateObj = "";
								if (fromDate != null && fromDate != "") {
									Date fromDateNew = Date.valueOf(fromDate);
									fromDateObj = fromDateNew;
								}
								dataMap.put("FROM_DATE", fromDateObj);
								String toDate = eElement.getElementsByTagName("ToDate").item(0).getTextContent();
								Object toDateObj = "";
								if (toDate != null && toDate != "") {
									Date toDateNew = Date.valueOf(toDate);
									toDateObj = toDateNew;
								}
								dataMap.put("TO_DATE", toDateObj);
								dataMap.put("REGISTRATION_CB",eElement.getElementsByTagName("RegistrationCB").item(0).getTextContent());
								dataMap.put("REGISTRATION_TF", eElement.getElementsByTagName("RegistrationTF").item(0).getTextContent());
								dataMap.put("LODGING_CB",eElement.getElementsByTagName("LodgingCB").item(0).getTextContent());
								dataMap.put("LODGING_TF",eElement.getElementsByTagName("LodgingTF").item(0).getTextContent());
								dataMap.put("TRANSPORTATION_CB", eElement.getElementsByTagName("TransportationCB").item(0).getTextContent());
								//dataMap.put("PROJECT_CB",eElement.getElementsByTagName("ProjectCB").item(0).getTextContent());	
								dataMap.put("TRANSPORTATION_TF",eElement.getElementsByTagName("TransportationTF").item(0).getTextContent());
								dataMap.put("MISC_CB", eElement.getElementsByTagName("MiscCB").item(0).getTextContent());
								dataMap.put("MISC_TF",eElement.getElementsByTagName("MiscTF").item(0).getTextContent());	
								dataMap.put("BENEFIT_TO_DEPT",eElement.getElementsByTagName("Benefit").item(0).getTextContent());	
							
								
								dataMap.put("INITIATOR_SIGNATURE", eElement.getElementsByTagName("InitiatorSign").item(0).getTextContent());
								dataMap.put("INITIATOR_COMMENTS", eElement.getElementsByTagName("InitiatorComments").item(0).getTextContent());
					
								String initiatorDate = eElement.getElementsByTagName("InitiatorDate").item(0).getTextContent();
								Object initiatorDateObj = "";
								if (initiatorDate != null && initiatorDate != "") {
									Date initiatorDateNew = Date.valueOf(initiatorDate);
									initiatorDateObj = initiatorDateNew;
								}
								dataMap.put("INITIATOR_SIGN_DATE", initiatorDateObj );
								
								dataMap.put("APPROVED_AMOUNT", eElement.getElementsByTagName("ApprovedAmount").item(0).getTextContent());
								dataMap.put("PRODUCTION_SIGNATURE", eElement.getElementsByTagName("BudgetBy").item(0).getTextContent());
								dataMap.put("PRODUCTION_COMMENTS", eElement.getElementsByTagName("ProductionComments").item(0).getTextContent());
					
								String productionDate = eElement.getElementsByTagName("ProdDate").item(0).getTextContent();
								Object productionDateObj = "";
								if (productionDate != null && productionDate != "") {
									Date productionDateNew = Date.valueOf(productionDate);
									productionDateObj = productionDateNew;
								}
								dataMap.put("PRODUCTION_SIGN_DATE", productionDateObj );
								
								//vffdataMap.put("CHAIRCB", eElement.getElementsByTagName("ChairCB").item(0).getTextContent());
								dataMap.put("CHAIR_SIGNATURE", eElement.getElementsByTagName("ChairSign").item(0).getTextContent());
								dataMap.put("CHAIR_COMMENTS", eElement.getElementsByTagName("ChairComments").item(0).getTextContent());
					
								String chairDate = eElement.getElementsByTagName("ChairDate").item(0).getTextContent();
								Object chairDateObj = "";
								if (chairDate != null && chairDate != "") {
									Date chairDateNew = Date.valueOf(chairDate);
									chairDateObj = chairDateNew;
								}
								dataMap.put("CHAIR_SIGN_DATE", chairDateObj ); 
								dataMap.put("DEAN_SIGN", eElement.getElementsByTagName("DeanSign").item(0).getTextContent());
								dataMap.put("DEAN_COMMENTS", eElement.getElementsByTagName("DeanSignComments").item(0).getTextContent());
					
								String deanDate = eElement.getElementsByTagName("DeanSignDate").item(0).getTextContent();
								Object deanDateObj = "";
								if (deanDate != null && deanDate != "") {
									Date deanDateNew = Date.valueOf(deanDate);
									deanDateObj = deanDateNew;
								}
								dataMap.put("DEAN_SIGN_DATE", deanDateObj );
								dataMap.put("INITIATOR_USERID", eElement.getElementsByTagName("Initiator_UserID").item(0).getTextContent());
								dataMap.put("FUL_COLLEGE", eElement.getElementsByTagName("Ful_College").item(0).getTextContent());
								dataMap.put("DEPTID", eElement.getElementsByTagName("Dept_Id").item(0).getTextContent());
								dataMap.put("CHAIR_USERID", eElement.getElementsByTagName("Chair_UserId").item(0).getTextContent());
								//dataMap.put("CHAIR_EMPLID", eElement.getElementsByTagName("Chair_EmpId").item(0).getTextContent());
								dataMap.put("CHAIR_NAME", eElement.getElementsByTagName("Chair_Name").item(0).getTextContent());
								dataMap.put("CHAIR_EMAIL", eElement.getElementsByTagName("Chair_Email").item(0).getTextContent());
								dataMap.put("DEAN_USERID", eElement.getElementsByTagName("DeanUserID").item(0).getTextContent());
								dataMap.put("DEAN_NAME", eElement.getElementsByTagName("DeanName").item(0).getTextContent());
								dataMap.put("DEAN_EMAIL", eElement.getElementsByTagName("DeanEmail").item(0).getTextContent());

								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
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
								if (dataMap.get("LAST_STEP").equals("Chair Department Review")) {
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
							"INITIATED_DATE,FROM_DATE,TO_DATE,INITIATOR_SIGN_DATE,PRODUCTION_SIGN_DATE,CHAIR_SIGN_DATE,DEAN_SIGN_DATE");
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
						log.debug("IOException in FacultyStaffTravelProposalDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				/*if (conn != null) { try { conn.close(); } catch (SQLException e) { } }*/
			}
		}
	}
}
