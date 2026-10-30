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

@Component(property = { "service.description=Voice Movement Production Coaching Requests DB Save", "service.vendor=ThoughtFocus",
		"process.label=VoiceMovementProdCoachRequestDB" })
public class VoiceMovementProductionRequestsDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(VoiceMovementProductionRequestsDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_VOICE_PROD_REQUEST";
		String formName = "Voice Movement Production Coaching Request Form";
		String assignee = "";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

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
								dataMap.put("DIRECTOR_FIRST_NAME",
										eElement.getElementsByTagName("FirstName").item(0).getTextContent());
								dataMap.put("DIRECTOR_LAST_NAME",
										eElement.getElementsByTagName("LastName").item(0).getTextContent());
								dataMap.put("DIRECTOR_EMAIL",
										eElement.getElementsByTagName("Email").item(0).getTextContent());
								String initiatedDate = eElement.getElementsByTagName("Date").item(0).getTextContent();
								Object initiatedDateObj = "";
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatedDate);
									initiatedDateObj = initiatedDateNew;
								}
								dataMap.put("INITIATED_DATE", initiatedDateObj);
								dataMap.put("VOICE_CB", eElement.getElementsByTagName("VoiceCB").item(0).getTextContent());
								dataMap.put("TEXT_CB", eElement.getElementsByTagName("TextCB").item(0).getTextContent());

								
								dataMap.put("DIALECTS_TF",
										eElement.getElementsByTagName("DialectsTF").item(0).getTextContent());
								
								dataMap.put("DIALECTS_CB",
										eElement.getElementsByTagName("DialectsCB").item(0).getTextContent());

								dataMap.put("MOVEMENT_CB",
										eElement.getElementsByTagName("MovementCB").item(0).getTextContent());
								
								dataMap.put("MOVEMENT_TF",
										eElement.getElementsByTagName("MovementTF").item(0).getTextContent());
								dataMap.put("DEVISED_CB",
										eElement.getElementsByTagName("DevisedCB").item(0).getTextContent());

								dataMap.put("STAGE_CB",
										eElement.getElementsByTagName("StageCB").item(0).getTextContent());
								
								dataMap.put("PERIOD_CB",
										eElement.getElementsByTagName("PeriodCB").item(0).getTextContent());
								dataMap.put("CHARACTER_CB",
										eElement.getElementsByTagName("CharacterCB").item(0).getTextContent());
								
								dataMap.put("MYSHOW_CB",
										eElement.getElementsByTagName("MyShowCB").item(0).getTextContent());
								
								
								dataMap.put("DIRECTOR_SIGNATURE",
										eElement.getElementsByTagName("DirectorSign").item(0).getTextContent());

								//dataMap.put("DIRECTOR_CB",
										//eElement.getElementsByTagName("DirectorSignCB").item(0).getTextContent());
								dataMap.put("DIRECTOR_COMMENTS", eElement.getElementsByTagName("DirectorComments").item(0).getTextContent());
								
								String directorDate = eElement.getElementsByTagName("DirectorDate").item(0).getTextContent();
								Object directorDateObj = "";
								if (directorDate != null && directorDate != "") {
									Date directorDateNew = Date.valueOf(directorDate);
									directorDateObj = directorDateNew;
								}
								dataMap.put("DIRECTOR_SIGN_DATE", directorDateObj );
								
								dataMap.put("PRODUCTION_SIGNATURE", eElement.getElementsByTagName("ProductionSign").item(0).getTextContent());
								dataMap.put("PRODUCTION_COMMENTS", eElement.getElementsByTagName("ProductionComments").item(0).getTextContent());
					
								String productionDate = eElement.getElementsByTagName("ProductionDate").item(0).getTextContent();
								Object productionDateObj = "";
								if (productionDate != null && productionDate != "") {
									Date productionDateNew = Date.valueOf(productionDate);
									productionDateObj = productionDateNew;
								}
								dataMap.put("PRODUCTION_SIGN_DATE", productionDateObj );
								
								dataMap.put("STAFF_USERID",
										eElement.getElementsByTagName("StaffUserId").item(0).getTextContent());
								
								dataMap.put("DIRECTOR_DEPTID",
										eElement.getElementsByTagName("DeptId").item(0).getTextContent());

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
				if (conn != null) {
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
						log.debug("IOException in VoiceMovementProdCoachRequestDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in VoiceMovementProdCoachRequestDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}
		}
	}
}
