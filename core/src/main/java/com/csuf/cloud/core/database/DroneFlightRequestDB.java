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

@Component(property = { "service.description=Drone Flight Request DB Save", "service.vendor=ThoughtFocus",
		"process.label=DroneFlightRequestDB" })
public class DroneFlightRequestDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(DroneFlightRequestDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_DRONE_FLIGHT";
		String formName = "Drone Flight Request";
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
								dataMap.put("NAME", eElement.getElementsByTagName("Name").item(0).getTextContent());
								dataMap.put("EMAIL",
										eElement.getElementsByTagName("PrefferedEmail").item(0).getTextContent());
								String flightDate = eElement.getElementsByTagName("FlightDate").item(0)
										.getTextContent();
								Object flightDateObj = "";
								if (flightDate != null && flightDate != "") {
									Date flightDateNew = Date.valueOf(flightDate);
									flightDateObj = flightDateNew;
								}
								dataMap.put("FLIGHT_DATE", flightDateObj);
								dataMap.put("FLIGHT_LOCATION",
										eElement.getElementsByTagName("FlightLocation").item(0).getTextContent());
								dataMap.put("FLIGHT_START_TIME",
										eElement.getElementsByTagName("DroneFlightStartTime").item(0).getTextContent());
								dataMap.put("FLIGHT_END_TIME",
										eElement.getElementsByTagName("DroneFlightEndTime").item(0).getTextContent());
								dataMap.put("FLIGHT_TIME",
										eElement.getElementsByTagName("FlightTime").item(0).getTextContent());
								dataMap.put("MAKE_OF_DRONE",
										eElement.getElementsByTagName("MakeofDrone").item(0).getTextContent());
								dataMap.put("MODEL_OF_DRONE",
										eElement.getElementsByTagName("ModelofDrone").item(0).getTextContent());
								dataMap.put("PURPOSE_OF_FLIGHT",
										eElement.getElementsByTagName("PurposofFlight").item(0).getTextContent());
								dataMap.put("INITIATOR_COMMENTS",
										eElement.getElementsByTagName("AdditionalComments").item(0).getTextContent());
								dataMap.put("INITIATOR_SIGNATURE",
										eElement.getElementsByTagName("StudentSignature").item(0).getTextContent());
								String initiatorSignDate = eElement.getElementsByTagName("StudentDate").item(0)
										.getTextContent();
								Object initiatorSignDateObj = "";
								if (initiatorSignDate != null && initiatorSignDate != "") {
									Date initiatorSignDateNew = Date.valueOf(initiatorSignDate);
									initiatorSignDateObj = initiatorSignDateNew;
								}
								dataMap.put("INITIATOR_SIGN_DATE", initiatorSignDateObj);
								dataMap.put("VICE_PRESIDENT_NAME",
										eElement.getElementsByTagName("VPName").item(0).getTextContent());
								dataMap.put("VICE_PRESIDENT_SIGNATURE",
										eElement.getElementsByTagName("VPSignature").item(0).getTextContent());
								String vpSignDate = eElement.getElementsByTagName("VPDate").item(0).getTextContent();
								Object vpSignDateObj = "";
								if (vpSignDate != null && vpSignDate != "") {
									Date vpSignDateNew = Date.valueOf(vpSignDate);
									vpSignDateObj = vpSignDateNew;
								}
								dataMap.put("VICE_PRESIDENT_SIGN_DATE", vpSignDateObj);
								dataMap.put("VICE_PRESIDENT_DECISION",
										eElement.getElementsByTagName("VPDecision").item(0).getTextContent());
								dataMap.put("VICE_PRESIDENT_COMMENTS",
										eElement.getElementsByTagName("VPComments").item(0).getTextContent());
								dataMap.put("RISK_MANAGEMENT_NAME",
										eElement.getElementsByTagName("RiskMgmtName").item(0).getTextContent());
								dataMap.put("RISK_MANAGEMENT_SIGNATURE",
										eElement.getElementsByTagName("RiskMgmtSignature").item(0).getTextContent());
								String rmSignDate = eElement.getElementsByTagName("RiskMgmtDate").item(0)
										.getTextContent();
								Object rmSignDateObj = "";
								if (rmSignDate != null && rmSignDate != "") {
									Date rmSignDateNew = Date.valueOf(rmSignDate);
									rmSignDateObj = rmSignDateNew;
								}
								dataMap.put("RISK_MANAGEMENT_SIGN_DATE", rmSignDateObj);
								dataMap.put("RISK_MANAGEMENT_DECISION",
										eElement.getElementsByTagName("RiskMgmtDecision").item(0).getTextContent());
								dataMap.put("RISK_MANAGEMENT_COMMENTS",
										eElement.getElementsByTagName("RiskMgmtComments").item(0).getTextContent());
								dataMap.put("CAMPUS_POLICE_NAME",
										eElement.getElementsByTagName("CampusPoliceName").item(0).getTextContent());
								dataMap.put("CAMPUS_POLICE_SIGNATURE", eElement
										.getElementsByTagName("CampusPoliceSignature").item(0).getTextContent());
								String cpSignDate = eElement.getElementsByTagName("CampusPoliceDate").item(0)
										.getTextContent();
								Object cpSignDateObj = "";
								if (cpSignDate != null && cpSignDate != "") {
									Date cpSignDateNew = Date.valueOf(cpSignDate);
									cpSignDateObj = cpSignDateNew;
								}
								dataMap.put("CAMPUS_POLICE_SIGN_DATE", cpSignDateObj);
								dataMap.put("CAMPUS_POLICE_DECISION",
										eElement.getElementsByTagName("CampusPoliceDecision").item(0).getTextContent());
								dataMap.put("CAMPUS_POLICE_COMMENTS",
										eElement.getElementsByTagName("CampusPoliceComments").item(0).getTextContent());
								dataMap.put("INITIATOR_USERID",
										eElement.getElementsByTagName("InitiatorUserId").item(0).getTextContent());
								dataMap.put("INITIATOR_EMAILID",
										eElement.getElementsByTagName("InitiatorEmailId").item(0).getTextContent());
								dataMap.put("DECISION_FLAG",
										eElement.getElementsByTagName("DecisionFlag").item(0).getTextContent());
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
									String workItemId = workflowInstanceID.concat(firstStr).concat("_")
											.concat(secString);
									assignee = taskService.getTaskAssignee(workItemId);
									log.debug("Executing else block assignee : {}", assignee);
								}
								dataMap.put("LAST_STEP", saveHistoryBackRoute);
								if ((dataMap.get("LAST_STEP").equals("Campus Police Review")) && (dataMap.get("DECISION_FLAG").equals("CPA"))) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNNING");
								}
								dataMap.put("LAST_STEP_ASSIGNEE", assignee);
								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

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
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "CWID",
							workflowInstanceID, dataMap,
							"FLIGHT_DATE,INITIATOR_SIGN_DATE,VICE_PRESIDENT_SIGN_DATE,RISK_MANAGEMENT_SIGN_DATE,CAMPUS_POLICE_SIGN_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in DroneFlightDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				/*if (conn != null) { try { conn.close(); } catch (SQLException e) { } }*/
			}

		}

	}

}
