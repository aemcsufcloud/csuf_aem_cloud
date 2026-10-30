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

@Component(property = { "service.description=Property Transfer Request DB", "service.vendor=ThoughtFocus",
		"process.label=PropertyTransferRequestDB" })
public class PropertyTransferRequestDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(PropertyTransferRequestDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_PROPERTY_TRANSFER_FORM";
		String childTableName = "AEM_PROPERTY_TRANSFER_DETAILS";
		String formName = "Property Transfer Request Form";
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

								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								caseid = eElement.getElementsByTagName("caseId").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", caseid);
								dataMap.put("TF_DEPARTMENT",
										eElement.getElementsByTagName("TFDepartment").item(0).getTextContent());
								dataMap.put("DEPT_ID",
										eElement.getElementsByTagName("DeptID").item(0).getTextContent());
								dataMap.put("DIVISION",
										eElement.getElementsByTagName("Division").item(0).getTextContent());
								dataMap.put("TF_DIVISION",
										eElement.getElementsByTagName("TFDivision").item(0).getTextContent());
								dataMap.put("CURRENT_CUSTODIAN",
										eElement.getElementsByTagName("TFCurrentCustodian").item(0).getTextContent());
								dataMap.put("CURRENT_COORDINATOR_NAME",
										eElement.getElementsByTagName("CurrentAssetCoordinatorFullName").item(0)
												.getTextContent());
								dataMap.put("TF_COMMENTS",
										eElement.getElementsByTagName("TFComments").item(0).getTextContent());
								dataMap.put("TT_DEPARTMENT",
										eElement.getElementsByTagName("TTDepartment").item(0).getTextContent());
								dataMap.put("NEW_DIVISION",
										eElement.getElementsByTagName("TTNewDivision").item(0).getTextContent());
								dataMap.put("NEW_CUSTODIAN",
										eElement.getElementsByTagName("TTNewCustodian").item(0).getTextContent());
								dataMap.put("CUSTODIAN_NAME",
										eElement.getElementsByTagName("TFDepartmentAssetRecordKeeperName").item(0)
												.getTextContent());
								dataMap.put("CUSTODIAN_SIGN",
										eElement.getElementsByTagName("TFDepartmentAssetRecordKeeperSIgnature").item(0)
												.getTextContent());
								dataMap.put("CUSTODIAN_COMMENT", eElement
										.getElementsByTagName("CurrentCustodianComment").item(0).getTextContent());

								dataMap.put("COORDINATOR_NAME",
										eElement.getElementsByTagName("DepartmentAssetCoordinatorSignerName").item(0)
												.getTextContent());
								dataMap.put("COORDINATOR_SIGN",
										eElement.getElementsByTagName("DepartmentAssetCoordinatorSignature").item(0)
												.getTextContent());
								dataMap.put("COORDINATOR_COMMENT",
										eElement.getElementsByTagName("DepartmentAssetCoordinatorComment").item(0)
												.getTextContent());

								String coordinatorDecision = eElement.getElementsByTagName("AssetCoordinatorDecision")
										.item(0).getTextContent();
								String administratorDecision = eElement.getElementsByTagName("DeptAdminDecision")
										.item(0).getTextContent();
								String peoplesoftDecision = eElement
										.getElementsByTagName("AssetManagementPeopleSoftChangesRB").item(0)
										.getTextContent();
								String assetDecision = eElement.getElementsByTagName("AssetDecision").item(0)
										.getTextContent();

								String coordinatorDec = "";
								if (coordinatorDecision.equals("1")) {
									coordinatorDec = "Approved";
								} else if (coordinatorDecision.equals("2")) {
									coordinatorDec = "Denied";
								}
								dataMap.put("COORDINATOR_DECISION", coordinatorDec);

								String administratorDec = "";
								if (administratorDecision.equals("1")) {
									administratorDec = "Approved";
								} else if (administratorDecision.equals("2")) {
									administratorDec = "Denied";
								}
								dataMap.put("ADMINISTRATOR_DECISION", administratorDec);

								String peoplesoftDec = "";
								if (peoplesoftDecision.equals("1")) {
									peoplesoftDec = "Yes";
								} else if (peoplesoftDecision.equals("2")) {
									peoplesoftDec = "No";
								}
								dataMap.put("PEOPLESOFT_DECISION", peoplesoftDec);

								String assetDec = "";
								if (assetDecision.equals("1")) {
									assetDec = "Approved";
								} else if (assetDecision.equals("2")) {
									assetDec = "Denied";
								}
								dataMap.put("ASSET_DECISION", assetDec);

								dataMap.put("ADMINISTRATOR_NAME",
										eElement.getElementsByTagName("DepartmentAdministratorSignerName").item(0)
												.getTextContent());
								dataMap.put("ADMINISTRATOR_SIGN",
										eElement.getElementsByTagName("DepartmentAdministratorSignature").item(0)
												.getTextContent());
								dataMap.put("ADMINISTRATOR_COMMENT",
										eElement.getElementsByTagName("DepartmentAdministratorComment").item(0)
												.getTextContent());

								dataMap.put("ASSET_REVIEWER_NAME", eElement
										.getElementsByTagName("AssetManagementSignerName").item(0).getTextContent());
								dataMap.put("ASSET_REVIEWER_SIGN", eElement
										.getElementsByTagName("AssetManagementSignature").item(0).getTextContent());
								dataMap.put("ASSET_COMMENTS", eElement.getElementsByTagName("AssetManagementComments")
										.item(0).getTextContent());

								dataMap.put("NEW_CUSTODIAN_NAME",
										eElement.getElementsByTagName("TTNewDepartmentAssetRecordKeeperName").item(0)
												.getTextContent());
								dataMap.put("NEW_CUSTODIAN_SIGN",
										eElement.getElementsByTagName("TTNewDepartmentAssetRecordKeeperSIgnature")
												.item(0).getTextContent());
								dataMap.put("NEW_CUSTODIAN_COMMENT",
										eElement.getElementsByTagName("NewCustodianComment").item(0).getTextContent());

								String custodianSignDate = eElement
										.getElementsByTagName("TFDepartmentAssetRecordKeeperSignDate").item(0)
										.getTextContent();
								Object custodianSignDateObj = "";
								if (custodianSignDate != null && custodianSignDate != "") {
									Date custodianSignDateNew = Date.valueOf(custodianSignDate);
									custodianSignDateObj = custodianSignDateNew;
								}
								dataMap.put("CUSTODIAN_SIGN_DATE", custodianSignDateObj);

								String coordinatorSignDate = eElement
										.getElementsByTagName("DepartmentAssetCoordinatorSignatureDate").item(0)
										.getTextContent();
								Object coordinatorSignDateObj = "";
								if (coordinatorSignDate != null && coordinatorSignDate != "") {
									Date coordinatorSignDateNew = Date.valueOf(coordinatorSignDate);
									coordinatorSignDateObj = coordinatorSignDateNew;
								}
								dataMap.put("COORDINATOR_SIGN_DATE", coordinatorSignDateObj);

								String administratorSignDate = eElement
										.getElementsByTagName("DepartmentAdministratorSignatureDate").item(0)
										.getTextContent();
								Object administratorSignDateObj = "";
								if (administratorSignDate != null && administratorSignDate != "") {
									Date administratorSignDateNew = Date.valueOf(administratorSignDate);
									administratorSignDateObj = administratorSignDateNew;
								}
								dataMap.put("ADMINISTRATOR_SIGN_DATE", administratorSignDateObj);

								String newCustodianSignDate = eElement
										.getElementsByTagName("TTNewDepartmentAssetRecordKeeperSignDate").item(0)
										.getTextContent();
								Object newCustodianDateNewDateObj = "";
								if (newCustodianSignDate != null && newCustodianSignDate != "") {
									Date newCustodianSignDateNew = Date.valueOf(newCustodianSignDate);
									newCustodianDateNewDateObj = newCustodianSignDateNew;
								}
								dataMap.put("NEW_CUSTODIAN_SIGN_DATE", newCustodianDateNewDateObj);

								String assetReviewerSignDate = eElement
										.getElementsByTagName("TTNewDepartmentAssetRecordKeeperSignDate").item(0)
										.getTextContent();
								Object assetReviewerSignDateNewDateObj = "";
								if (assetReviewerSignDate != null && assetReviewerSignDate != "") {
									Date assetReviewerSignDateNew = Date.valueOf(assetReviewerSignDate);
									assetReviewerSignDateNewDateObj = assetReviewerSignDateNew;
								}
								dataMap.put("ASSET_REVIEWER_SIGN_DATE", assetReviewerSignDateNewDateObj);

								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								log.debug("DataMap values :{}", dataMap);

								propertyTransferDetails(conn, eElement, formName, childTableName, caseid, cwid,
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

	private void propertyTransferDetails(Connection conn, Element eElement, String formName, String tableName,
			String caseid, String cwid, String workflowInstanceID) {
		try {
			/*
			 * String equipmentSanitizedDecision =
			 * eElement.getElementsByTagName("EquipmentSanitized").item(0)
			 * .getTextContent(); String equipmentUnlockedDecision =
			 * eElement.getElementsByTagName("EquipementUnlocked").item(0)
			 * .getTextContent();
			 */

			/*
			 * String sanitizedDec = ""; if (equipmentSanitizedDecision.equals("1")) {
			 * sanitizedDec = "YES"; } else if (equipmentSanitizedDecision.equals("2")) {
			 * sanitizedDec = "NO"; }
			 * 
			 * String unlockedDec = ""; if (equipmentUnlockedDecision.equals("1")) {
			 * unlockedDec = "YES"; } else if (equipmentUnlockedDecision.equals("2")) {
			 * unlockedDec = "NO"; }
			 */

			LinkedHashMap<String, Object> dataMapInfo = null;
			String propertyTagAndSerialNumber = "";
			String description = "";
			String currentLocation = "";
			String newLocation = "";
			String equipmentSanitized = "";
			String equipementUnlocked = "";
			String equipmentSanitizedDec = "";
			String equipementUnlockedDec = "";
			DatabaseUtils dbUtils = new DatabaseUtils();

			String resultData = dbUtils.getSPEEvalData(conn, caseid, "CASEID", workflowInstanceID, tableName);
			if (resultData != null && !resultData.equals("")) {
				dbUtils.deleteSPEEvalData(conn, caseid, "CASEID", workflowInstanceID, tableName);
			}

			for (int j = 0; j < eElement.getElementsByTagName("Row1").getLength(); j++) {

				for (int k = 0; k < eElement.getElementsByTagName("Row1").item(j).getChildNodes().getLength(); k++) {
					String nodeName = eElement.getElementsByTagName("Row1").item(j).getChildNodes().item(k)
							.getNodeName();

					String nodeValue = eElement.getElementsByTagName("Row1").item(j).getChildNodes().item(k)
							.getTextContent();

					if (nodeName.contains("PropertyTagandSerialNumber")) {
						propertyTagAndSerialNumber = nodeValue;
					}
					if (nodeName.contains("Description")) {
						description = nodeValue;
					}
					if (nodeName.contains("CurrentLocation")) {
						currentLocation = nodeValue;
					}
					if (nodeName.contains("NewLocation")) {
						newLocation = nodeValue;
					}
					if (nodeName.contains("EquipmentSanitized")) {

						equipmentSanitized = nodeValue;

						if (equipmentSanitized.contains("1")) {

							equipmentSanitizedDec = "Yes";

						} else if (equipmentSanitized.contains("2")) {

							equipmentSanitizedDec = "No";

						}

					}

					if (nodeName.contains("EquipementUnlocked")) {

						equipementUnlocked = nodeValue;

						if (equipementUnlocked.contains("1")) {

							equipementUnlockedDec = "Yes";

						} else if (equipementUnlocked.contains("2")) {

							equipementUnlockedDec = "No";

						}

					}
				}

				if (propertyTagAndSerialNumber != "") {
					dataMapInfo = new LinkedHashMap<String, Object>();
					dataMapInfo.put("CASEID", caseid);
					dataMapInfo.put("CWID", cwid);
					dataMapInfo.put("FORM_NAME", formName);
					dataMapInfo.put("PROPERTY_TAG", propertyTagAndSerialNumber);
					dataMapInfo.put("DESCRIPTION", description);
					dataMapInfo.put("CURRENT_LOCATION", currentLocation);
					dataMapInfo.put("NEW_LOCATION", newLocation);
					dataMapInfo.put("EQUIPMENT_SANITIZED", equipmentSanitizedDec);
					dataMapInfo.put("EQUIPMENT_UNLOCKED", equipementUnlockedDec);
					dataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

					if (conn != null) {
						DatabaseUtils dbUtil = new DatabaseUtils();
						log.error("Connection Successfull");
						dbUtil.insertFormData(conn, dataMapInfo, tableName, formName);

					} else {
						log.error("Connection Unsuccessfull");
					}
				} else {
					log.error(" Unsuccessfull");
				}

			}
		} catch (Exception e) {
			log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			log.error("Failed to insert Titan Card Table Data");
		}
	}

}
