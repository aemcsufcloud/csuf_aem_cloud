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
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Pilot Work Schedule Request DB Save", "service.vendor=ThoughtFocus",
"process.label=PilotWorkScheduleRequestDB" })
public class PilotWorkScheduleRequestDB implements WorkflowProcess{
	
	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(PilotWorkScheduleRequestDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) 
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_PILOT_SWSR";
		String formName = "Pilot Summer 9/80 Work Schedule Request ";		
		String assignee = "";
		String cwid = "";
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
							cwid = eElement.getElementsByTagName("Cwid").item(0).getTextContent();
							dataMap.put("CWID", cwid);
							dataMap.put("CHRS_ID",eElement.getElementsByTagName("EmplId").item(0).getTextContent());
							dataMap.put("EMPLOYEE_NAME",eElement.getElementsByTagName("Name").item(0).getTextContent());
							dataMap.put("EMPLOYEE_DIVISION",eElement.getElementsByTagName("EmployeeDivision").item(0).getTextContent());
							dataMap.put("DECLARATIONCB",eElement.getElementsByTagName("Declaration").item(0).getTextContent());
							dataMap.put("SHIFT_TIME",eElement.getElementsByTagName("ShiftTime").item(0).getTextContent());
							dataMap.put("EXEMPT_STATUS", eElement.getElementsByTagName("ExemptStatus").item(0).getTextContent());
							dataMap.put("NON_EXEMPT_CHOICE", eElement.getElementsByTagName("NonExemptChoice").item(0).getTextContent());
							dataMap.put("MANAGER_NAME_TITLE", eElement.getElementsByTagName("ManagerName").item(0).getTextContent());
							dataMap.put("MANAGER_SIGNATURE", eElement.getElementsByTagName("ManagerSignature").item(0).getTextContent());
							String managerSignDate = eElement.getElementsByTagName("ManagerSignDate").item(0).getTextContent();
							Object managerSignDateObj = "";
							if (managerSignDate != null && managerSignDate != "") {
								Date managerSignDateNew = Date.valueOf(managerSignDate);
								managerSignDateObj = managerSignDateNew;
							}
							dataMap.put("MANAGER_SIGN_DATE", managerSignDateObj);
							dataMap.put("MANAGER_COMMENTS", eElement.getElementsByTagName("ManagerComment").item(0).getTextContent());
							dataMap.put("EMPLOYEE_NAME_TITLE", eElement.getElementsByTagName("EmployeeName").item(0).getTextContent());
							dataMap.put("EMPLOYEE_SIGNATURE", eElement.getElementsByTagName("EmployeeSignature").item(0).getTextContent());
							String employeeSignDate = eElement.getElementsByTagName("EmployeeSignDate").item(0).getTextContent();
							Object employeeSignDateObj = "";
							if (employeeSignDate != null && employeeSignDate != "") {
								Date employeeSignDateNew = Date.valueOf(employeeSignDate);
								employeeSignDateObj = employeeSignDateNew;
							}
							dataMap.put("EMPLOYEE_SIGN_DATE", employeeSignDateObj );
							dataMap.put("EMPLOYEE_COMMENTS", eElement.getElementsByTagName("EmployeeComment").item(0).getTextContent());
							dataMap.put("MANAGER_NAME", eElement.getElementsByTagName("ManagersName").item(0).getTextContent());
							dataMap.put("MANAGER_USERID", eElement.getElementsByTagName("ManagerUserId").item(0).getTextContent());
							dataMap.put("MANAGER_EMAILID", eElement.getElementsByTagName("ManagerEmailId").item(0).getTextContent());
							dataMap.put("EMPLOYEE_USERID", eElement.getElementsByTagName("EmployeeUserId").item(0).getTextContent());
							dataMap.put("EMPLOYEE_EMAILID", eElement.getElementsByTagName("EmployeeEmailId").item(0).getTextContent());
							String exemptStatus = eElement.getElementsByTagName("ExemptStatus").item(0).getTextContent();
							if(exemptStatus.isBlank() || exemptStatus.isEmpty() || exemptStatus == null) {
							dataMap.put("EMPLOYEE_CLASSIFICATION", eElement.getElementsByTagName("EmployeeClassification").item(0).getTextContent());
							dataMap.put("EMPLOYEE_STAFF_OR_MPP", eElement.getElementsByTagName("StafforMppStatus").item(0).getTextContent());
							dataMap.put("EMPLOYEE_JOB_CODE", eElement.getElementsByTagName("EmployeeJobCode").item(0).getTextContent());
							}
							dataMap.put("EMPLOYEE_FIRST_NAME", eElement.getElementsByTagName("EmployeeFirstName").item(0).getTextContent());
							dataMap.put("EMPLOYEE_LAST_NAME", eElement.getElementsByTagName("EmployeeLastName").item(0).getTextContent());	
							dataMap.put("HR_COORDINATOR_EMAILID", eElement.getElementsByTagName("HRCoordinatorEmailId").item(0).getTextContent());
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
							if (dataMap.get("LAST_STEP").equals("Employee Review")) {
								dataMap.put("WORKFLOW_STATUS", "COMPLETED");
							} else {
								dataMap.put("WORKFLOW_STATUS", "RUNNNING");
							}
							dataMap.put("LAST_STEP_ASSIGNEE", assignee);
							dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
							dataMap.put("EMPL_REC", eElement.getElementsByTagName("EmplRcd").item(0).getTextContent());
							dataMap.put("UNIT", eElement.getElementsByTagName("Unit").item(0).getTextContent());
							
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
						log.debug("IOException in PilotWorkScheduleRequestDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in PilotWorkScheduleRequestDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}
			

		}
		
		
	}

}
