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

@Component(property = { "service.description=Property Survey DB Save", "service.vendor=ThoughtFocus",
		"process.label=PropertySurveyDB" })
public class PropertySurveyDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(PropertySurveyDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_PROPERTY_SURVEY_FORM";
		String childTableName = "AEM_PROPERTY_SURVEY_DETAILS";
		String formName = "Property Management Request For Property Survey";
		String assignee = "";
		String cwid = "";
		String caseId = "";
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

								cwid = eElement.getElementsByTagName("cwid_requestor").item(0).getTextContent();
								caseId = eElement.getElementsByTagName("caseId").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", caseId);

								dataMap.put("FNAME",
										eElement.getElementsByTagName("firstName").item(0).getTextContent());

								dataMap.put("LNAME",
										eElement.getElementsByTagName("lastName").item(0).getTextContent());

								dataMap.put("DISPOSALNO",
										eElement.getElementsByTagName("DisposalNo").item(0).getTextContent());

								dataMap.put("DEPTNAME",
										eElement.getElementsByTagName("DeptName").item(0).getTextContent());

								dataMap.put("DEPTID", eElement.getElementsByTagName("DeptID").item(0).getTextContent());

								dataMap.put("DIVISION",
										eElement.getElementsByTagName("Division").item(0).getTextContent());

								dataMap.put("SCHOOLDECISION",
										eElement.getElementsByTagName("SchoolDivision").item(0).getTextContent());

								dataMap.put("INTIATOR_COMMENTS",
										eElement.getElementsByTagName("InitiatorComments").item(0).getTextContent());

								dataMap.put("INTIATOR_NAME",
										eElement.getElementsByTagName("InitiatorName").item(0).getTextContent());

								dataMap.put("INTIATOR_SIGN",
										eElement.getElementsByTagName("InitiatorSignature").item(0).getTextContent());

								dataMap.put("INTIATOR_USERID",
										eElement.getElementsByTagName("InitiatorUserID").item(0).getTextContent());

								dataMap.put("INTIATOR_EMAIL",
										eElement.getElementsByTagName("InitiatorEmail").item(0).getTextContent());

								dataMap.put("ASSET_COORDINATOR_NAME", eElement
										.getElementsByTagName("DeptAssetRecordKeeperName").item(0).getTextContent());

								dataMap.put("ASSET_COORDINATOR_SIGN",
										eElement.getElementsByTagName("DeptAssetRecordKeeperSignature").item(0)
												.getTextContent());

								dataMap.put("ASSET_COORDINATOR_USERID", eElement
										.getElementsByTagName("DeptAssetRecordKeeperUserID").item(0).getTextContent());

								dataMap.put("ASSET_COORDINATOR_EMAIL", eElement
										.getElementsByTagName("DeptAssetRecordKeeperEmail").item(0).getTextContent());

								dataMap.put("ASSET_COORDINATOR_COMMENTS",
										eElement.getElementsByTagName("DeptAssetRecordKeeperComments").item(0)
												.getTextContent());

								dataMap.put("ADMIN_APPROVER_NAME", eElement
										.getElementsByTagName("DeptAdminApproverName").item(0).getTextContent());

								dataMap.put("ADMIN_APPROVER_SIGN", eElement
										.getElementsByTagName("DeptAdminApproverSignature").item(0).getTextContent());

								dataMap.put("ADMIN_APPROVER_USERID", eElement
										.getElementsByTagName("DeptAdminApproverUserID").item(0).getTextContent());

								dataMap.put("ADMIN_APPROVER_EMAIL", eElement
										.getElementsByTagName("DeptAdminApproverEmail").item(0).getTextContent());

								dataMap.put("ADMIN_APPROVER_COMMENTS", eElement
										.getElementsByTagName("DeptAdminApproverComments").item(0).getTextContent());

								dataMap.put("ASSET_COMMENTS",
										eElement.getElementsByTagName("Recommendation").item(0).getTextContent());

								dataMap.put("ASSET_NAME",
										eElement.getElementsByTagName("AssetName").item(0).getTextContent());

								dataMap.put("ASSET_SIGN",
										eElement.getElementsByTagName("AssetSignature").item(0).getTextContent());

								String deptAssetCoordinatorDecision = eElement
										.getElementsByTagName("AssetRecordDecision").item(0).getTextContent();
								String deptAdminApproverDecision = eElement.getElementsByTagName("DeptHeadDecision")
										.item(0).getTextContent();
								String assetDecision = eElement.getElementsByTagName("AssetDecision").item(0)
										.getTextContent();

								String assetCoordinatorDec = "";
								if (deptAssetCoordinatorDecision.equals("1")) {
									assetCoordinatorDec = "Approved";
								} else if (deptAssetCoordinatorDecision.equals("2")) {
									assetCoordinatorDec = "Denied";
								}
								dataMap.put("ASSET_COORDINATOR_DECISION", assetCoordinatorDec);

								String deptAdminApproverDec = "";
								if (deptAdminApproverDecision.equals("1")) {
									deptAdminApproverDec = "Approved";
								} else if (deptAdminApproverDecision.equals("2")) {
									deptAdminApproverDec = "Denied";
								}
								dataMap.put("ADMIN_APPROVER_DECISION", deptAdminApproverDec);

								String assetDec = "";
								if (assetDecision.equals("1")) {
									assetDec = "Approved";
								} else if (assetDecision.equals("2")) {
									assetDec = "Denied";
								}
								dataMap.put("ASSET_DECISION", assetDec);

								String initiatorDate = eElement.getElementsByTagName("InitiatorSignDate").item(0)
										.getTextContent();
								Object initaitedDateObj = "";
								if (initiatorDate != null && initiatorDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatorDate);
									initaitedDateObj = initiatedDateNew;
								}
								dataMap.put("INTIATOR_SIGN_DATE", initaitedDateObj);

								String deptAssetCoordinatorSignDate = eElement
										.getElementsByTagName("DeptAssetRecordKeeperSignDate").item(0).getTextContent();
								Object deptAssetCoordinatorSignDateObj = "";
								if (deptAssetCoordinatorSignDate != null && deptAssetCoordinatorSignDate != "") {
									Date deptAssetCoordinatorSignDateNew = Date.valueOf(deptAssetCoordinatorSignDate);
									deptAssetCoordinatorSignDateObj = deptAssetCoordinatorSignDateNew;
								}
								dataMap.put("ASSET_COORDINATOR_SIGN_DATE", deptAssetCoordinatorSignDateObj);

								String deptAdminApproverSignDate = eElement
										.getElementsByTagName("DeptAdminApproverSignDate").item(0).getTextContent();
								Object deptAdminApproverSignDateObj = "";
								if (deptAdminApproverSignDate != null && deptAdminApproverSignDate != "") {
									Date deptAdminApproverSignDateNew = Date.valueOf(deptAdminApproverSignDate);
									deptAdminApproverSignDateObj = deptAdminApproverSignDateNew;
								}
								dataMap.put("ADMIN_APPROVER_SIGN_DATE", deptAdminApproverSignDateObj);

								String assetSignDate = eElement.getElementsByTagName("AssetDate").item(0)
										.getTextContent();
								Object assetSignDateObj = "";
								if (assetSignDate != null && assetSignDate != "") {
									Date assetSignDateNew = Date.valueOf(assetSignDate);
									assetSignDateObj = assetSignDateNew;
								}
								dataMap.put("ASSET_SIGN_DATE", assetSignDateObj);

								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								log.debug("DataMap values :{}", dataMap);

								propertySurveyDetails(conn, eElement, formName, childTableName, caseId, cwid,
										workflowInstanceID);
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
								if (dataMap.get("LAST_STEP").equals("Asset Management Review")) {
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
					String resultData = dbUtil.getSPEEvalData(conn, caseId, "CASEID", workflowInstanceID, tableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, caseId, "CASEID", workflowInstanceID, tableName);
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
						log.debug("IOException in PositionActionFormDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in PositionActionFormDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}

	private void propertySurveyDetails(Connection conn, Element eElement, String formName, String tableName,
			String caseId, String cwid, String workflowInstanceID) {
		try {

			LinkedHashMap<String, Object> dataMapInfo = null;
			String tagNo = "";
			String description = "";
			String currentValue = "";
			String location = "";
			String condition = "";
			String sanitizedRB = "";
			String unlockedRB = "";
			String sanitizedRBDec = "";
			String unlockedRBDec = "";
			DatabaseUtils dbUtils = new DatabaseUtils();

			String resultData = dbUtils.getSPEEvalData(conn, caseId, "CASEID", workflowInstanceID, tableName);
			if (resultData != null && !resultData.equals("")) {
				dbUtils.deleteSPEEvalData(conn, caseId, "CASEID", workflowInstanceID, tableName);
			}

			for (int j = 0; j < eElement.getElementsByTagName("Row1").getLength(); j++) {

				for (int k = 0; k < eElement.getElementsByTagName("Row1").item(j).getChildNodes().getLength(); k++) {
					String nodeName = eElement.getElementsByTagName("Row1").item(j).getChildNodes().item(k)
							.getNodeName();

					String nodeValue = eElement.getElementsByTagName("Row1").item(j).getChildNodes().item(k)
							.getTextContent();

					if (nodeName.contains("TagNo")) {
						tagNo = nodeValue;
					}
					if (nodeName.contains("Description")) {
						description = nodeValue;
					}
					if (nodeName.contains("CurrentValue")) {
						currentValue = nodeValue;
					}
					if (nodeName.contains("Condition")) {
						condition = nodeValue;
					}
					if (nodeName.contains("Location")) {
						location = nodeValue;
					}

					if (nodeName.contains("SanitizedRB")) {

						sanitizedRB = nodeValue;

						if (sanitizedRB.contains("1")) {

							sanitizedRBDec = "Yes";

						} else if (sanitizedRB.contains("2")) {

							sanitizedRBDec = "No";

						}

					}

					if (nodeName.contains("UnlockedRB")) {

						unlockedRB = nodeValue;

						if (unlockedRB.contains("1")) {

							unlockedRBDec = "Yes";

						} else if (unlockedRB.contains("2")) {

							unlockedRBDec = "No";

						}

					}
				}
				dataMapInfo = new LinkedHashMap<String, Object>();

				dataMapInfo.put("CASEID", caseId);
				dataMapInfo.put("CWID", cwid);
				dataMapInfo.put("FORM_NAME", formName);
				dataMapInfo.put("TAG_NUMBER", tagNo);
				dataMapInfo.put("DESCRIPTION", description);
				dataMapInfo.put("CURRENT_VALUE", currentValue);
				dataMapInfo.put("CONDITION", condition);
				dataMapInfo.put("LOCATION", location);
				dataMapInfo.put("EQUIPMENT_SANITIZED", sanitizedRBDec);
				dataMapInfo.put("EQUIPMENT_UNLOCKED", unlockedRBDec);
				dataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					dbUtil.insertFormData(conn, dataMapInfo, tableName, formName);
				} else {
					log.error("Connection Unsuccessfull");
				}

			}
		} catch (Exception e) {
			log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			log.error("Failed to insert Table Data");
		}
	}

}
