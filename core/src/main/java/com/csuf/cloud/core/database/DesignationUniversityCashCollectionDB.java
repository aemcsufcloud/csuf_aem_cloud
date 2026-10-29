package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.lang.String;
import org.w3c.dom.Element;
import java.lang.String;
import java.sql.Connection;
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

@Component(property = { "service.description=Designation University Cash Collection DB", "service.vendor=ThoughtFocus",
		"process.label=DesignationUniversityCashCollectionDB" })
public class DesignationUniversityCashCollectionDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(DesignationUniversityCashCollectionDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_DESIGNATION_FORM";
		String formName = "Designation As University Cash Collection Point";
		String assignee = "";
		String cwid = "";
		String caseid = "";
		LinkedHashMap<String, Object> dataMap = null;
		MetaDataMap metaDataMapVal = workItem.getWorkflow().getWorkflowData().getMetaDataMap();

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

								cwid = eElement.getElementsByTagName("Cwid").item(0).getTextContent();
								caseid = eElement.getElementsByTagName("CaseId").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", caseid);
								dataMap.put("FIRST_NAME",
										eElement.getElementsByTagName("InitiatorFirstName").item(0).getTextContent());
								dataMap.put("LAST_NAME",
										eElement.getElementsByTagName("InitiatorLastName").item(0).getTextContent());
								dataMap.put("DEPARTMENT",
										eElement.getElementsByTagName("Department").item(0).getTextContent());
								dataMap.put("DEPT_ID",
										eElement.getElementsByTagName("DeptId").item(0).getTextContent());
								dataMap.put("DIVISION",
										eElement.getElementsByTagName("Division").item(0).getTextContent());
								dataMap.put("PURPOSE",
										eElement.getElementsByTagName("Purpose").item(0).getTextContent());
								dataMap.put("LOCATION",
										eElement.getElementsByTagName("Location").item(0).getTextContent());
								dataMap.put("RESPONSIBLEMANAGER_USERID", eElement
										.getElementsByTagName("ResponsibleManagerUserId").item(0).getTextContent());
								dataMap.put("RESPONSIBLEMANAGER_NAME", eElement
										.getElementsByTagName("ResponsibleManagerName").item(0).getTextContent());
								dataMap.put("RESPONSIBLEMANAGER_EMAIL", eElement
										.getElementsByTagName("ResponsibleManagerEmail").item(0).getTextContent());
								dataMap.put("RESPONSIBLEMANAGER_SIGN", eElement
										.getElementsByTagName("ResponsibleManagerSign").item(0).getTextContent());
								dataMap.put("RESPONSIBLEMANAGER_COMMENTS", eElement
										.getElementsByTagName("ResponsibleManagerComments").item(0).getTextContent());
								dataMap.put("CASHHANDLERONE_USERID",
										eElement.getElementsByTagName("CashHandlingPersonnelOneUserId").item(0)
												.getTextContent());
								dataMap.put("CASHHANDLERONE_NAME", eElement
										.getElementsByTagName("CashHandlingPersonnelOneName").item(0).getTextContent());
								dataMap.put("CASHHANDLERONE_EMAIL",
										eElement.getElementsByTagName("CashHandlingPersonnelOneEmail").item(0)
												.getTextContent());
								dataMap.put("CASHHANDLERONE_SIGN", eElement
										.getElementsByTagName("CashHandlingPersonnelOneSign").item(0).getTextContent());
								dataMap.put("CASHHANDLERONE_COMMENTS",
										eElement.getElementsByTagName("CashHandlingPersonnelOneComments").item(0)
												.getTextContent());
								dataMap.put("CASHHANDLERTWO_USERID",
										eElement.getElementsByTagName("CashHandlingPersonnelTwoUserId").item(0)
												.getTextContent());
								dataMap.put("CASHHANDLERTWO_NAME", eElement
										.getElementsByTagName("CashHandlingPersonnelTwoName").item(0).getTextContent());
								dataMap.put("CASHHANDLERTWO_EMAIL",
										eElement.getElementsByTagName("CashHandlingPersonnelTwoEmail").item(0)
												.getTextContent());
								dataMap.put("CASHHANDLERTWO_SIGN", eElement
										.getElementsByTagName("CashHandlingPersonnelTwoSign").item(0).getTextContent());
								dataMap.put("CASHHANDLERTWO_COMMENTS",
										eElement.getElementsByTagName("CashHandlingPersonnelTwoComments").item(0)
												.getTextContent());

								dataMap.put("DIRECTOR_NAME",
										eElement.getElementsByTagName("DirectorSFSName").item(0).getTextContent());

								dataMap.put("DIRECTOR_SIGN",
										eElement.getElementsByTagName("DirectorSFSSign").item(0).getTextContent());
								dataMap.put("DIRECTOR_COMMENTS",
										eElement.getElementsByTagName("DirectorSFScomments").item(0).getTextContent());

								dataMap.put("CONTROLLER_NAME",
										eElement.getElementsByTagName("ControllerName").item(0).getTextContent());

								dataMap.put("CONTROLLER_SIGN",
										eElement.getElementsByTagName("ControllerSign").item(0).getTextContent());
								dataMap.put("CONTROLLER_COMMENTS",
										eElement.getElementsByTagName("ControllerComments").item(0).getTextContent());
								dataMap.put("CASHNET_NOTES",
										eElement.getElementsByTagName("CashNotes").item(0).getTextContent());
								dataMap.put("BAG_NOTES",
										eElement.getElementsByTagName("BagNotes").item(0).getTextContent());
								dataMap.put("STAMP_NOTES",
										eElement.getElementsByTagName("StampNotes").item(0).getTextContent());
								dataMap.put("FUND_NOTES",
										eElement.getElementsByTagName("FundNotes").item(0).getTextContent());
								dataMap.put("PETTYCASH_NOTES",
										eElement.getElementsByTagName("PettyCashNotes").item(0).getTextContent());

								dataMap.put("DEPOSIT_NOTES",
										eElement.getElementsByTagName("DepositsNotes").item(0).getTextContent());

								String responsibleManagerDecision = eElement
										.getElementsByTagName("ResponsibleManagerDecision").item(0).getTextContent();

								String cashHandlerOneDecision = eElement
										.getElementsByTagName("CashHandlingPersonnelOneDecision").item(0)
										.getTextContent();
								String cashHandlerTwoDecision = eElement
										.getElementsByTagName("CashHandlingPersonnelTwoDecision").item(0)
										.getTextContent();
								String directorDecision = eElement.getElementsByTagName("DirectorSFSDecision").item(0)
										.getTextContent();
								String controllerDecision = eElement.getElementsByTagName("ControllerDecision").item(0)
										.getTextContent();

								String cashnetDecision = eElement.getElementsByTagName("CashNetCB").item(0)
										.getTextContent();
								String bagDecision = eElement.getElementsByTagName("LockingBagCB").item(0)
										.getTextContent();
								String stampDecision = eElement.getElementsByTagName("StampCB").item(0)
										.getTextContent();
								String fundDecision = eElement.getElementsByTagName("FundCB").item(0).getTextContent();
								String pettycashDecision = eElement.getElementsByTagName("PettyCashCB").item(0)
										.getTextContent();
								String depositsDecision = eElement.getElementsByTagName("DepositsCB").item(0)
										.getTextContent();

								String cashnetDec = "";
								if (cashnetDecision.equals("1")) {
									cashnetDec = "Yes";
								} else if (cashnetDecision.equals("2")) {
									cashnetDec = "No";
								}
								dataMap.put("CASHNET_DECISION", cashnetDec);

								String bagDec = "";
								if (bagDecision.equals("1")) {
									bagDec = "Yes";
								} else if (bagDecision.equals("2")) {
									bagDec = "No";
								}
								dataMap.put("BAG_DECISION", bagDec);

								String stampDec = "";
								if (stampDecision.equals("1")) {
									stampDec = "Yes";
								} else if (stampDecision.equals("2")) {
									stampDec = "No";
								}
								dataMap.put("STAMP_DECISION", stampDec);

								String fundDec = "";
								if (fundDecision.equals("1")) {
									fundDec = "Yes";
								} else if (fundDecision.equals("2")) {
									fundDec = "No";
								}
								dataMap.put("FUND_DECISION", fundDec);

								String pettycashDec = "";
								if (pettycashDecision.equals("1")) {
									pettycashDec = "Yes";
								} else if (pettycashDecision.equals("2")) {
									pettycashDec = "No";
								}
								dataMap.put("PETTYCASH_DECISION", pettycashDec);

								String depositsDec = "";
								if (depositsDecision.equals("1")) {
									depositsDec = "Yes";
								} else if (depositsDecision.equals("2")) {
									depositsDec = "No";
								}
								dataMap.put("DEPOSITS_DECISION", depositsDec);

								String responsibleManagerDec = "";
								if (responsibleManagerDecision.equals("1")) {
									responsibleManagerDec = "Approved";
								} else if (responsibleManagerDecision.equals("2")) {
									responsibleManagerDec = "Denied";
								}
								dataMap.put("RESPONSIBLEMANAGER_DECISION", responsibleManagerDec);

								String cashHandlerOneDec = "";
								if (cashHandlerOneDecision.equals("1")) {
									cashHandlerOneDec = "Approved";
								} else if (cashHandlerOneDecision.equals("2")) {
									cashHandlerOneDec = "Denied";
								}
								dataMap.put("CASH_HANDLERONE_DECISION", cashHandlerOneDec);

								String cashHandlerTwoDec = "";
								if (cashHandlerTwoDecision.equals("1")) {
									cashHandlerTwoDec = "Approved";
								} else if (cashHandlerTwoDecision.equals("2")) {
									cashHandlerTwoDec = "Denied";
								}
								dataMap.put("CASH_HANDLERTWO_DECISION", cashHandlerTwoDec);

								String directorDec = "";
								if (directorDecision.equals("1")) {
									directorDec = "Approved";
								} else if (directorDecision.equals("2")) {
									directorDec = "Denied";
								}
								dataMap.put("DIRECTOR_DECISION", directorDec);

								String controllerDec = "";
								if (controllerDecision.equals("1")) {
									controllerDec = "Approved";
								} else if (controllerDecision.equals("2")) {
									controllerDec = "Denied";
								}
								dataMap.put("CONTROLLER_DECISION", controllerDec);

								String initiatedDate = eElement.getElementsByTagName("InitiatedDate").item(0)
										.getTextContent();
								Object initiatedDateObj = "";
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedNew = Date.valueOf(initiatedDate);
									initiatedDateObj = initiatedNew;
								}
								dataMap.put("INITIATED_DATE", initiatedDateObj);

								String responsibleManagerSignDate = eElement
										.getElementsByTagName("ResponsibleManagerSignDate").item(0).getTextContent();
								Object responsibleManagerSignDateObj = "";
								if (responsibleManagerSignDate != null && responsibleManagerSignDate != "") {
									Date responsibleManagerSignDateNew = Date.valueOf(responsibleManagerSignDate);
									responsibleManagerSignDateObj = responsibleManagerSignDateNew;
								}
								dataMap.put("RESPONSIBLEMANAGER_SIGNDATE", responsibleManagerSignDateObj);

								String cashhandlerOneSignDate = eElement
										.getElementsByTagName("CashHandlingPersonnelOneSignDate").item(0)
										.getTextContent();
								Object cashhandlerOneSignDateObj = "";
								if (cashhandlerOneSignDate != null && cashhandlerOneSignDate != "") {
									Date cashhandlerOneSignDateNew = Date.valueOf(cashhandlerOneSignDate);
									cashhandlerOneSignDateObj = cashhandlerOneSignDateNew;
								}
								dataMap.put("CASHHANDLERONE_SIGNDATE", cashhandlerOneSignDateObj);

								String cashhandlerTwoSignDate = eElement
										.getElementsByTagName("CashHandlingPersonnelTwoSignDate").item(0)
										.getTextContent();
								Object cashhandlerTwoSignDateObj = "";
								if (cashhandlerTwoSignDate != null && cashhandlerTwoSignDate != "") {
									Date cashhandlerTwoSignDateNew = Date.valueOf(cashhandlerTwoSignDate);
									cashhandlerTwoSignDateObj = cashhandlerTwoSignDateNew;
								}
								dataMap.put("CASHHANDLERTWO_SIGNDATE", cashhandlerOneSignDateObj);

								String directorSignDate = eElement.getElementsByTagName("DirectorSFSSignDate").item(0)
										.getTextContent();
								Object directorDateDateObj = "";
								if (directorSignDate != null && directorSignDate != "") {
									Date directorSignDateNew = Date.valueOf(directorSignDate);
									directorDateDateObj = directorSignDateNew;
								}
								dataMap.put("DIRECTOR_SIGNDATE", directorDateDateObj);

								String controllerSignDate = eElement.getElementsByTagName("ControllerSignDate").item(0)
										.getTextContent();
								Object controllerDateNewDateObj = "";
								if (controllerSignDate != null && controllerSignDate != "") {
									Date controllerSignDateNew = Date.valueOf(controllerSignDate);
									controllerDateNewDateObj = controllerSignDateNew;
								}
								dataMap.put("CONTROLLER_SIGNDATE", controllerDateNewDateObj);

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
								if (dataMap.get("LAST_STEP").equals("Controller Review")) {
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
				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, caseid, "CASEID", workflowInstanceID, tableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, caseid, "CASEID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} catch (Exception e1) {
				log.debug(Arrays.toString(e1.getStackTrace()) + "Message-----" + e1.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in DesignationUniversityCashCollectionDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in DesignationUniversityCashCollectionDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}

}
