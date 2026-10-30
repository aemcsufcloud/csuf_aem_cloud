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
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.services.TaskService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;
import com.google.gson.JsonArray;

@Component(property = { "service.description=Vehicle Release Form DB Save", "service.vendor=ThoughtFocus",
		"process.label=VehicleReleaseFormDB" })
public class VehicleReleaseFormDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(VehicleReleaseFormDB.class);

	String vehicleType = "";
	String year = "";
	String make = "";
	String propertyTN = "";
	String vinNo = "";
	String model = "";
	String comments = "";
	String assignee = "";

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String parentTableName = "AEM_VEHICLE_RELEASE_FORM";
		//String parentTableName = "AEM_VEHICLE_FORM";
		String childTableName = "AEM_VEHICLE_RELEASE_INFO";
		String formName = "Vehicle Release Form";
		String cwid = "";
		String caseId = "";
		MetaDataMap metaDataMapVal = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		LinkedHashMap<String, Object> dataMapInfo = null;
		String workflowInstanceID = workItem.getWorkflow().getId();

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		InputStream is = null;
		try {
			is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, workItem.getContentPath(), "Data.xml");
			if (null != is) {
				Document doc = XMLUtils.getDomDocument(is);

				DatabaseUtils dbUtil = new DatabaseUtils();

				String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
				conn = jdbcConnectionService.getDBConn(dataSourceVal);

				if (conn != null) {

					Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");

					if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
						caseId = XMLUtils.getChildNodeContent(afBoundDataElement, "caseId");
						cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "CWID");
						String fName = XMLUtils.getChildNodeContent(afBoundDataElement, "FirstName");
						String lName = XMLUtils.getChildNodeContent(afBoundDataElement, "LastName");
						String department = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptName");
						String schoolDivision = XMLUtils.getChildNodeContent(afBoundDataElement, "SchoolDivision");
						String deptDate = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptDate");
						String deptId = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptID");
						String division = XMLUtils.getChildNodeContent(afBoundDataElement, "Division");

						String initiatorComments = XMLUtils.getChildNodeContent(afBoundDataElement,
								"InitiatorComments");
						String initiatorName = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorName");
						String initiatorSign = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorSign");
						String initiatorUserID = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorUserID");
						String initiatorEmail = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorEmail");
						String initiatorDate = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorDate");

						String deptAssetComments = XMLUtils.getChildNodeContent(afBoundDataElement,
								"DeptAssetRecComments");
						String deptAssetName = XMLUtils.getChildNodeContent(afBoundDataElement,
								"DeptAssetRecKeeperName");
						String deptAssetSign = XMLUtils.getChildNodeContent(afBoundDataElement,
								"DeptAssetRecKeeperSign");
						String deptAssetUserID = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptAssetRecUserID");
						String deptAssetEmail = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptAssetRecEmail");
						String deptAssetDate = XMLUtils.getChildNodeContent(afBoundDataElement,
								"DeptAssetRecKeeperDate");
						String deptAssetDecision = XMLUtils.getChildNodeContent(afBoundDataElement,
								"DeptAssetRecDecision");
						String deptAssetDec = "";
						if (deptAssetDecision.equals("1")) {
							deptAssetDec = "Approved";
						} else if (deptAssetDecision.equals("2")) {
							deptAssetDec = "Denied";
						}

						String adminComments = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptAdminComments");
						String adminName = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptAdminAppName");
						String adminSign = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptAdminAppSign");
						String adminUserID = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptAdminUserID");
						String adminEmail = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptAdminEmail");
						String adminDate = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptAdminAppDate");
						String adminDecision = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptHeadDecision");
						String adminDec = "";
						if (adminDecision.equals("1")) {
							adminDec = "Approved";
						} else if (adminDecision.equals("2")) {
							adminDec = "Denied";
						}

						String cpfmComments = XMLUtils.getChildNodeContent(afBoundDataElement, "CPFMCommentsNotes");
						String cpfmName = XMLUtils.getChildNodeContent(afBoundDataElement, "FleetCoOrdinatorName");
						String cpfmManagementSign = XMLUtils.getChildNodeContent(afBoundDataElement, "CPFMSign");
						String workOrderNo = XMLUtils.getChildNodeContent(afBoundDataElement, "WorkOrderNo");
						String cpfmEmail = XMLUtils.getChildNodeContent(afBoundDataElement, "Email");
						String ext = XMLUtils.getChildNodeContent(afBoundDataElement, "Ext");
						String cpfmDate = XMLUtils.getChildNodeContent(afBoundDataElement, "CPFMDate");
						String cpfmDecision = XMLUtils.getChildNodeContent(afBoundDataElement, "CPFMDecision");
						String cpfmDec = "";
						if (cpfmDecision.equals("1")) {
							cpfmDec = "Approved";
						} else if (cpfmDecision.equals("2")) {
							cpfmDec = "Denied";
						}

						String assetComments = XMLUtils.getChildNodeContent(afBoundDataElement, "AssetComments");
						String assetStaffName = XMLUtils.getChildNodeContent(afBoundDataElement, "AssetName");
						String assetManagementSign = XMLUtils.getChildNodeContent(afBoundDataElement, "AssetSign");
						String assetDate = XMLUtils.getChildNodeContent(afBoundDataElement, "AssetDate");
						String assetDecision = XMLUtils.getChildNodeContent(afBoundDataElement, "AssetDecision");
						String assetDec = "";
						if (assetDecision.equals("1")) {
							assetDec = "Approved";
						} else if (assetDecision.equals("2")) {
							assetDec = "Denied";
						}

						dataMapInfo = new LinkedHashMap<String, Object>();
						dataMapInfo.put("CASEID", caseId);
						dataMapInfo.put("CWID", cwid);
						dataMapInfo.put("FNAME", fName);
						dataMapInfo.put("LNAME", lName);
						dataMapInfo.put("DEPARTMENT", department);
						dataMapInfo.put("SCHOOL_DIVISION", schoolDivision);
						Object todaysDateObj = null;
						if (deptDate != null && deptDate != "") {
							Date todaysDateNew = Date.valueOf(deptDate);
							todaysDateObj = todaysDateNew;
						}
						dataMapInfo.put("TODAYS_DATE", todaysDateObj);
						dataMapInfo.put("DEPTID", deptId);
						dataMapInfo.put("DIVISION", division);

						dataMapInfo.put("INITIATOR_COMMENTS", initiatorComments);
						dataMapInfo.put("INITIATOR_NAME", initiatorName);
						dataMapInfo.put("INITIATOR_SIGN", initiatorSign);
						dataMapInfo.put("INITIATOR_USERID", initiatorUserID);
						dataMapInfo.put("INITIATOR_EMAIL", initiatorEmail);
						Object initaitedDateObj = null;
						if (initiatorDate != null && initiatorDate != "") {
							Date initiatedDateNew = Date.valueOf(initiatorDate);
							initaitedDateObj = initiatedDateNew;
						}
						dataMapInfo.put("INITIATOR_SIGN_DATE", initaitedDateObj);

						dataMapInfo.put("DEPT_ASSET_COMMENTS", deptAssetComments);
						dataMapInfo.put("DEPT_ASSET_NAME", deptAssetName);
						dataMapInfo.put("DEPT_ASSET_SIGN", deptAssetSign);
						dataMapInfo.put("DEPT_ASSET_USERID", deptAssetUserID);
						dataMapInfo.put("DEPT_ASSET_EMAIL", deptAssetEmail);
						dataMapInfo.put("DEPT_ASSET_DECISION", deptAssetDec);
						Object adminDateObj = null;
						if (adminDate != null && adminDate != "") {
							Date adminDateNew = Date.valueOf(adminDate);
							adminDateObj = adminDateNew;
						}
						dataMapInfo.put("DEPT_ASSET_SIGN_DATE", adminDateObj);

						dataMapInfo.put("DEPT_HEAD_COMMENTS", adminComments);
						dataMapInfo.put("DEPT_HEAD_NAME", adminName);
						dataMapInfo.put("DEPT_HEAD_SIGN", adminSign);
						dataMapInfo.put("DEPT_HEAD_USERID", adminUserID);
						dataMapInfo.put("DEPT_HEAD_EMAIL", adminEmail);
						dataMapInfo.put("DEPT_HEAD_DECISION", adminDec);
						Object deptAssetDateObj = null;
						if (deptAssetDate != null && deptAssetDate != "") {
							Date deptAssetDateNew = Date.valueOf(deptAssetDate);
							deptAssetDateObj = deptAssetDateNew;
						}
						dataMapInfo.put("DEPT_HEAD_SIGN_DATE", deptAssetDateObj);

						dataMapInfo.put("CPFM_COMMENTS", cpfmComments);
						dataMapInfo.put("CPFM_STAFFNAME", cpfmName);
						dataMapInfo.put("CPFM_SIGN", cpfmManagementSign);
						dataMapInfo.put("CPFM_DECISION", cpfmDec);
						dataMapInfo.put("WORK_ORDER_NO", workOrderNo);
						dataMapInfo.put("CPFM_EMAIL", cpfmEmail);
						dataMapInfo.put("EXT", ext);
						Object cpfmDateObj = null;
						if (cpfmDate != null && cpfmDate != "") {
							Date cpfmDateNew = Date.valueOf(cpfmDate);
							cpfmDateObj = cpfmDateNew;
						}
						dataMapInfo.put("CPFM_SIGN_DATE", cpfmDateObj);

						dataMapInfo.put("ASSET_COMMENTS", assetComments);
						dataMapInfo.put("ASSET_STAFFNAME", assetStaffName);
						dataMapInfo.put("ASSET_SIGN", assetManagementSign);
						dataMapInfo.put("ASSET_DECISION", assetDec);
						Object assetDateObj = null;
						if (assetDate != null && assetDate != "") {
							Date assetDateNew = Date.valueOf(assetDate);
							assetDateObj = assetDateNew;
						}
						dataMapInfo.put("ASSET_SIGN_DATE", assetDateObj);
						dataMapInfo.put("STAGE_INDICATOR",
								XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator"));

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
							log.debug("Executing else block assignee : {}", assignee);
						}
						log.debug("assetDecision: {}", assetDecision);
						dataMapInfo.put("LAST_STEP", saveHistoryBackRoute);
						if (dataMapInfo.get("LAST_STEP").equals("Asset Management Review")) {
								if (assetDecision.equalsIgnoreCase("1")) {
									dependentDetails(formName, afBoundDataElement, childTableName, caseId,
											workflowInstanceID, cwid, conn);
									dataMapInfo.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMapInfo.put("WORKFLOW_STATUS", "RUNNING");
								}						
						} else {
							dataMapInfo.put("WORKFLOW_STATUS", "RUNNING");
						}
						dataMapInfo.put("LAST_STEP_ASSIGNEE", assignee);

						dataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
						log.info("dataMapInfo= {}", dataMapInfo);
						dbUtil.insertFormData(conn, dataMapInfo, parentTableName, formName);
					}
				}
			}
			/*if (conn != null) {
				DatabaseUtils dbUtil = new DatabaseUtils();
				log.error("Connection Successfull");
				String resultData = dbUtil.getSPEEvalData(conn, caseId, "CASEID", workflowInstanceID, parentTableName);
				if (resultData != null && !resultData.equals("")) {
					dbUtil.deleteSPEEvalData(conn, caseId, "CASEID", workflowInstanceID, parentTableName);
					dbUtil.insertFormData(conn, dataMapInfo, parentTableName, formName);
				} else {
					dbUtil.insertFormData(conn, dataMapInfo, parentTableName, formName);
				}
			}*/
		} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			log.error(Arrays.toString(e.getStackTrace()));
		} finally {
			if (null != is) {
				try {
					is.close();
				} catch (IOException e) {
					log.error("IO Exception in VehicleReleaseFormDB " + Arrays.toString(e.getStackTrace()));
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error("SQL Exception in VehicleReleaseFormDB " + Arrays.toString(e.getStackTrace()));
				}

			}
		}
	}

	public void dependentDetails(String formName, Element afBoundDataElement, String childTableName, String caseId,
			String workflowInstanceID, String cwid, Connection conn) {
		log.info("Inside child member table");
		DatabaseUtils dbUtil = new DatabaseUtils();
		LinkedHashMap<String, Object> memberDataMapInfo = null;

		for (int j = 0; j < afBoundDataElement.getElementsByTagName("VehicleInfo").getLength(); j++) {

			for (int k = 0; k < afBoundDataElement.getElementsByTagName("VehicleInfo").item(j).getChildNodes()
					.getLength(); k++) {
				String nodeName = afBoundDataElement.getElementsByTagName("VehicleInfo").item(j).getChildNodes().item(k)
						.getNodeName();

				String nodeValue = afBoundDataElement.getElementsByTagName("VehicleInfo").item(j).getChildNodes()
						.item(k).getTextContent();

				if (nodeName.contains("VehicleType")) {
					vehicleType = nodeValue;
				}
				if (nodeName.contains("Year")) {
					year = nodeValue;
				}
				if (nodeName.contains("Make")) {
					make = nodeValue;
				}
				if (nodeName.contains("PropertyTN")) {
					propertyTN = nodeValue;
				}
				if (nodeName.contains("VINNo")) {
					vinNo = nodeValue;
				}
				if (nodeName.contains("Model")) {
					model = nodeValue;
				}
				if (nodeName.contains("CommentsNotes")) {
					comments = nodeValue;
				}
			}

			memberDataMapInfo = new LinkedHashMap<String, Object>();

			memberDataMapInfo.put("CASEID", caseId);
			memberDataMapInfo.put("CWID", cwid);
			memberDataMapInfo.put("FORM_NAME", formName);
			memberDataMapInfo.put("VEHICLE_TYPE", vehicleType);
			memberDataMapInfo.put("YEAR", year);
			memberDataMapInfo.put("MAKE", make);
			memberDataMapInfo.put("PROPERTY_TAG_NO", propertyTN);
			memberDataMapInfo.put("VIN_NO", vinNo);
			memberDataMapInfo.put("MODEL", model);
			memberDataMapInfo.put("COMMENTS", comments);

			memberDataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
			dbUtil.insertFormData(conn, memberDataMapInfo, childTableName, formName);

		}

	}

}