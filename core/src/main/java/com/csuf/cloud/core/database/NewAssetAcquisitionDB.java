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

@Component(property = { "service.description=New Asset Acquisition DB Save", "service.vendor=ThoughtFocus",
		"process.label=NewAssetAcquisitionDB" })
public class NewAssetAcquisitionDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(NewAssetAcquisitionDB.class);

	String purchaseDate = "";
	String pCardInfo = "";
	String account = "";
	String serialNo = "";
	String model = "";
	String tagNumber = "";
	String assetIDNo = "";
	String custodian = "";
	String department = "";
	String location = "";
	String assignee = "";
	String pCardInfoRB = "";

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String parentTableName = "AEM_NEW_ASSET_ACQ_FORM";
		String childTableName = "AEM_NEW_ASSET_ACQ_INFO";
		String formName = "New Asset Acquisition Form";
		String cwid = "";
		String caseId = "";

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
						String deptId = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptID");
						String deptName = XMLUtils.getChildNodeContent(afBoundDataElement, "DepartmentName");
						String division = XMLUtils.getChildNodeContent(afBoundDataElement, "Division");
						String divisionName = XMLUtils.getChildNodeContent(afBoundDataElement, "SchoolDivision");

						String yesNoCB = XMLUtils.getChildNodeContent(afBoundDataElement, "YesNoCB");
						String yesNo = "";
						if (yesNoCB.equals("1")) {
							yesNo = "Yes";
						} else {
							yesNo = "No";
						}
						String initiatorComments = XMLUtils.getChildNodeContent(afBoundDataElement,
								"InitiatorComments");
						String initiatorName = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorName");
						String initiatorSign = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorSign");
						String initiatorUserID = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorUserID");
						String initiatorEmail = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorEmail");
						String initiatorDate = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorDate");

						String assetComments = XMLUtils.getChildNodeContent(afBoundDataElement, "Comments");
						String assetStaffName = XMLUtils.getChildNodeContent(afBoundDataElement, "AssetStaffName");
						String assetManagementSign = XMLUtils.getChildNodeContent(afBoundDataElement,
								"AssetManagementSign");
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
						dataMapInfo.put("DEPTID", deptId);
						dataMapInfo.put("DEPTNAME", deptName);
						dataMapInfo.put("DIVISION", division);
						dataMapInfo.put("DIVISION_NAME", divisionName);
						dataMapInfo.put("CFS_PEOPLESOFT", yesNo);
						dataMapInfo.put("INTIATOR_COMMENTS", initiatorComments);
						dataMapInfo.put("INTIATOR_NAME", initiatorName);
						dataMapInfo.put("INTIATOR_SIGN", initiatorSign);
						dataMapInfo.put("INTIATOR_USERID", initiatorUserID);

						dataMapInfo.put("INTIATOR_EMAIL", initiatorEmail);
						dataMapInfo.put("ASSET_COMMENTS", assetComments);
						dataMapInfo.put("ASSET_STAFFNAME", assetStaffName);
						dataMapInfo.put("ASSET_SIGN", assetManagementSign);
						dataMapInfo.put("ASSET_DECISION", assetDec);
						Object initaitedDateObj = null;
						if (initiatorDate != null && initiatorDate != "") {
							Date initiatedDateNew = Date.valueOf(initiatorDate);
							initaitedDateObj = initiatedDateNew;
						}
						dataMapInfo.put("INTIATOR_SIGN_DATE", initaitedDateObj);
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
					log.error("IO Exception in NewAssetAcquisitionDB " + Arrays.toString(e.getStackTrace()));
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error("SQL Exception in NewAssetAcquisitionDB " + Arrays.toString(e.getStackTrace()));
				}

			}
		}
	}

	public void dependentDetails(String formName, Element afBoundDataElement, String childTableName, String caseId,
			String workflowInstanceID, String cwid, Connection conn) {
		log.info("Inside child member table");
		DatabaseUtils dbUtil = new DatabaseUtils();
		LinkedHashMap<String, Object> memberDataMapInfo = null;

		for (int j = 0; j < afBoundDataElement.getElementsByTagName("EquipmentPanel").getLength(); j++) {

			for (int k = 0; k < afBoundDataElement.getElementsByTagName("EquipmentPanel").item(j).getChildNodes()
					.getLength(); k++) {
				String nodeName = afBoundDataElement.getElementsByTagName("EquipmentPanel").item(j).getChildNodes()
						.item(k).getNodeName();

				String nodeValue = afBoundDataElement.getElementsByTagName("EquipmentPanel").item(j).getChildNodes()
						.item(k).getTextContent();

				if (nodeName.contains("PurchaseDate")) {
					purchaseDate = nodeValue;
				}
				if (nodeName.contains("PCardInfo")) {
					pCardInfo = nodeValue;
				}
				if (nodeName.contains("Account")) {
					account = nodeValue;
				}
				if (nodeName.contains("SerialNo")) {
					serialNo = nodeValue;
				}
				if (nodeName.contains("Model")) {
					model = nodeValue;
				}
				if (nodeName.contains("TagNumber")) {
					tagNumber = nodeValue;
				}
				if (nodeName.contains("AssetIDNo")) {
					assetIDNo = nodeValue;
				}
				if (nodeName.contains("Custodian")) {
					custodian = nodeValue;
				}
				if (nodeName.contains("Department")) {
					department = nodeValue;
				}
				if (nodeName.contains("Location")) {
					location = nodeValue;
				}
				if (nodeName.contains("PcardInfoRB")) {
					pCardInfoRB = nodeValue;
				}

			}

			memberDataMapInfo = new LinkedHashMap<String, Object>();

			memberDataMapInfo.put("CASEID", caseId);
			memberDataMapInfo.put("CWID", cwid);
			memberDataMapInfo.put("FORM_NAME", formName);
			memberDataMapInfo.put("PURCHASE_DATE", purchaseDate);
			memberDataMapInfo.put("PCARDINFO_PTAGTNO", pCardInfo);
			memberDataMapInfo.put("ACCOUNT", account);
			memberDataMapInfo.put("SERIAL_NO", serialNo);
			memberDataMapInfo.put("MODEL", model);
			memberDataMapInfo.put("P_TAG_NO", tagNumber);
			memberDataMapInfo.put("ASSETID_NO", assetIDNo);
			memberDataMapInfo.put("CUSTODIAN", custodian);
			memberDataMapInfo.put("DEPARTMENT", department);
			memberDataMapInfo.put("LOCATION", location);
			memberDataMapInfo.put("PCARD_RB", pCardInfoRB);

			memberDataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

			dbUtil.insertFormData(conn, memberDataMapInfo, childTableName, formName);

		}

	}
}