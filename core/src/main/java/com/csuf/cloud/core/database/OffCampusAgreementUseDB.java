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

@Component(property = { "service.description=Off Campus Agreement Use Form DB Save", "service.vendor=ThoughtFocus",
		"process.label=OffCampusAgreementUseDB" })
public class OffCampusAgreementUseDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(OffCampusAgreementUseDB.class);

	String propertyTagNum = "";
	String description = "";
	String propertyTagNumRE = "";
	String descriptionRE = "";
	String assignee = "";
	String expectedReturnDate = "";
	String dateReturned = "";
	String copyPreviousValue = "";
	String yesNoRB = "";
	String equipBorrowedDate = "";

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String parentTableName = "AEM_OFF_CAMPUS_AGREE_FORM";
		String childTableNameOne = "AEM_OFF_CAMPUS_AGREE_INFO";
		String childTableNameTwo = "AEM_OFF_CAMPUS_RETURN_INFO";
		String formName = "Off Campus Agreement Use Form";
		String cwid = "";
		String caseId = "";
		String borrowReturnRB = null;

		LinkedHashMap<String, Object> dataMapInfo = null;
		String workflowInstanceID = workItem.getWorkflow().getId();

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		InputStream is = null;
		try {
			is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, workItem.getContentPath(), "Data.xml");
			if (null != is) {
				Document doc = XMLUtils.getDomDocument(is);
				String dataXML = XMLUtils.prettyPrintAsString(doc);
				DatabaseUtils dbUtil = new DatabaseUtils();

				/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
				conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
				/*if (conn != null) {*/

					Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");

					if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
						caseId = XMLUtils.getChildNodeContent(afBoundDataElement, "caseId");
						cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "CWID");
						String fName = XMLUtils.getChildNodeContent(afBoundDataElement, "FirstName");
						String lName = XMLUtils.getChildNodeContent(afBoundDataElement, "LastName");
						String department = XMLUtils.getChildNodeContent(afBoundDataElement, "DepartmentName");
						String schoolDivision = XMLUtils.getChildNodeContent(afBoundDataElement, "SchoolDivision");
						String todaysDate = XMLUtils.getChildNodeContent(afBoundDataElement, "Date_1");
						String address = XMLUtils.getChildNodeContent(afBoundDataElement, "Address");
						String state = XMLUtils.getChildNodeContent(afBoundDataElement, "State");
						String zipCode = XMLUtils.getChildNodeContent(afBoundDataElement, "ZipCode");

						String borRetRB = XMLUtils.getChildNodeContent(afBoundDataElement, "BorrowReturnRB");
						if (borRetRB.equals("1")) {
							borrowReturnRB = "Borrowed";
						} else if (borRetRB.equals("2")) {
							borrowReturnRB = "Returned";
						}

						String borrowerComments = XMLUtils.getChildNodeContent(afBoundDataElement, "BorrowerComments");
						String borrowerReturnDate = XMLUtils.getChildNodeContent(afBoundDataElement, "ReturnDate");
						// String ReturneeReturnDate = XMLUtils.getChildNodeContent(afBoundDataElement,
						// "DateReturned");
						String deptId = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptID");
						String division = XMLUtils.getChildNodeContent(afBoundDataElement, "Division");

						String initiatorComments = XMLUtils.getChildNodeContent(afBoundDataElement,
								"InitiatorComments");
						String initiatorName = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorName");
						String initiatorSign = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorSign");
						String initiatorUserID = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorUserID");
						String initiatorEmail = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorEmail");
						String initiatorDate = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorDate");

						String adminComments = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptAdminComments");
						String adminName = XMLUtils.getChildNodeContent(afBoundDataElement, "AdminName");
						String adminSign = XMLUtils.getChildNodeContent(afBoundDataElement, "AdminSign");
						// String adminExt = XMLUtils.getChildNodeContent(afBoundDataElement,
						// "DeptAdminExt");
						String adminUserID = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptAdminUserID");
						String adminEmail = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptAdminEmail");
						String adminDate = XMLUtils.getChildNodeContent(afBoundDataElement, "AdminDate");
						String adminDecision = XMLUtils.getChildNodeContent(afBoundDataElement, "DeptHeadDecision");
						String adminDec = "";
						if (adminDecision.equals("1")) {
							adminDec = "Approved";
						} else if (adminDecision.equals("2")) {
							adminDec = "Denied";
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
						if (todaysDate != null && todaysDate != "") {
							Date todaysDateNew = Date.valueOf(todaysDate);
							todaysDateObj = todaysDateNew;
						}
						dataMapInfo.put("TODAYS_DATE", todaysDateObj);

						dataMapInfo.put("ADDRESS", address);
						dataMapInfo.put("ZIP_CODE", zipCode);
						dataMapInfo.put("STATE", state);
						dataMapInfo.put("DEPTID", deptId);
						dataMapInfo.put("DIVISION", division);
						dataMapInfo.put("BORROW_RETURN_RB", borrowReturnRB);
						dataMapInfo.put("BORROWER_COMMENTS", borrowerComments);
						Object borrowerReturnDateObj = null;
						if (borrowerReturnDate != null && borrowerReturnDate != "") {
							Date borrowerReturnDateNew = Date.valueOf(borrowerReturnDate);
							borrowerReturnDateObj = borrowerReturnDateNew;
						}
						dataMapInfo.put("B_RETURN_DATE", borrowerReturnDateObj);
						/*
						 * Object ReturneeReturnDateObj = null; if (ReturneeReturnDate != null &&
						 * ReturneeReturnDate != "") { Date ReturneeReturnDateNew =
						 * Date.valueOf(ReturneeReturnDate); ReturneeReturnDateObj =
						 * ReturneeReturnDateNew; } dataMapInfo.put("R_RETURN_DATE",
						 * ReturneeReturnDateObj);
						 */
						// dataMapInfo.put("DATA", dataXML);

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

						dataMapInfo.put("DEPT_HEAD_COMMENTS", adminComments);
						dataMapInfo.put("DEPT_HEAD_NAME", adminName);
						dataMapInfo.put("DEPT_HEAD_SIGN", adminSign);
						// dataMapInfo.put("DEPT_HEAD_EXT", adminExt);
						dataMapInfo.put("DEPT_HEAD_USERID", adminUserID);
						dataMapInfo.put("DEPT_HEAD_EMAIL", adminEmail);
						dataMapInfo.put("DEPT_HEAD_DECISION", adminDec);
						Object adminDateObj = null;
						if (adminDate != null && adminDate != "") {
							Date adminDateNew = Date.valueOf(adminDate);
							adminDateObj = adminDateNew;
						}
						dataMapInfo.put("DEPT_HEAD_SIGN_DATE", adminDateObj);

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
								if (borRetRB != null && borRetRB.equals("1")) {
									dependentDetails(formName, afBoundDataElement, childTableNameOne, caseId,
											workflowInstanceID, cwid, conn, initiatorUserID, todaysDateObj);
								} else {
									dependentDetailsReturn(formName, afBoundDataElement, childTableNameTwo, caseId,
											workflowInstanceID, cwid, conn);
								}
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
						/*dbUtil.insertFormData(conn, dataMapInfo, parentTableName, formName);*/
						try {
							CloudDbSaveUtil.saveFormData(parentTableName, formName, caseId, "CASEID",
									workflowInstanceID, dataMapInfo,
									"TODAYS_DATE,B_RETURN_DATE,INITIATOR_SIGN_DATE,DEPT_HEAD_SIGN_DATE,ASSET_SIGN_DATE");
						} catch (IOException ioException) {
							ioException.printStackTrace();
						}

					}
				}
			/*}*/
			/*if (conn != null) {
				DatabaseUtils dbUtil = new DatabaseUtils();
				log.error("Connection Successfull");
				String resultData = dbUtil.getSPEEvalData(conn, caseId, "CASEID", workflowInstanceID, parentTableName);
				if (resultData != null && !resultData.equals("")) {
					dbUtil.deleteSPEEvalData(conn, caseId, "CASEID", workflowInstanceID, parentTableName);
					dbUtil.insertFormData(conn, dataMapInfo, parentTableName, formName);
				} else {
					dbUtil.insertFormData(conn, dataMapInfo, parentTableName, formName);
					log.info("Successfully deleted SPEEvalData for 2nd caseId: {} and workflowInstanceID: {}", caseId,
							workflowInstanceID);
				}
			}*/
		} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			log.error(Arrays.toString(e.getStackTrace()));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (null != is) {
				try {
					is.close();
				} catch (IOException e) {
					log.error("IO Exception in OffCampusAgreementUseDB " + Arrays.toString(e.getStackTrace()));
				}
			}
			/*if (conn != null) { try { conn.close(); } catch (SQLException e) { } }*/
		}
	}

	public void dependentDetails(String formName, Element afBoundDataElement, String childTableNameOne, String caseId,
			String workflowInstanceID, String cwid, Connection conn, String initiatorUserID, Object todaysDateObj) {
		log.info("Inside child member table");
		DatabaseUtils dbUtil = new DatabaseUtils();
		LinkedHashMap<String, Object> memberDataMapInfo = null;

		for (int j = 0; j < afBoundDataElement.getElementsByTagName("BorrowedEquip").getLength(); j++) {

			for (int k = 0; k < afBoundDataElement.getElementsByTagName("BorrowedEquip").item(j).getChildNodes()
					.getLength(); k++) {
				String nodeName = afBoundDataElement.getElementsByTagName("BorrowedEquip").item(j).getChildNodes()
						.item(k).getNodeName();

				String nodeValue = afBoundDataElement.getElementsByTagName("BorrowedEquip").item(j).getChildNodes()
						.item(k).getTextContent();

				if (nodeName.contains("PropertyTagNum")) {
					propertyTagNum = nodeValue;
				}
				if (nodeName.contains("Description")) {
					description = nodeValue;
				}
				if (nodeName.contains("BorrowerDate")) {
					expectedReturnDate = nodeValue;
				}
			}

			memberDataMapInfo = new LinkedHashMap<String, Object>();

			memberDataMapInfo.put("CASEID", caseId);
			memberDataMapInfo.put("CWID", cwid);
			memberDataMapInfo.put("FORM_NAME", formName);
			memberDataMapInfo.put("PROPERTY_TAGNO", propertyTagNum);
			memberDataMapInfo.put("DESCRIPTION", description);
			memberDataMapInfo.put("INITIATOR_USERID", initiatorUserID);
			memberDataMapInfo.put("TODAYS_DATE", todaysDateObj);
			memberDataMapInfo.put("EXPECTED_RETURN_DATE", expectedReturnDate);

			memberDataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

			/*dbUtil.insertFormData(conn, memberDataMapInfo, childTableNameOne, formName);*/
			try {
				CloudDbSaveUtil.saveFormData(childTableNameOne, formName, "", "", workflowInstanceID,
						memberDataMapInfo, "TODAYS_DATE,EXPECTED_RETURN_DATE");
			} catch (IOException ioException) {
				ioException.printStackTrace();
			}

		}

	}

	public void dependentDetailsReturn(String formName, Element afBoundDataElement, String childTableNameTwo,
			String caseId, String workflowInstanceID, String cwid, Connection conn) {
		log.info("Inside child member table two");
		DatabaseUtils dbUtil = new DatabaseUtils();
		LinkedHashMap<String, Object> memberDataMapInfo = null;

		for (int j = 0; j < afBoundDataElement.getElementsByTagName("ReturnedEquip").getLength(); j++) {

			for (int k = 0; k < afBoundDataElement.getElementsByTagName("ReturnedEquip").item(j).getChildNodes()
					.getLength(); k++) {
				String nodeName = afBoundDataElement.getElementsByTagName("ReturnedEquip").item(j).getChildNodes()
						.item(k).getNodeName();

				String nodeValue = afBoundDataElement.getElementsByTagName("ReturnedEquip").item(j).getChildNodes()
						.item(k).getTextContent();

				if (nodeName.contains("PropertyTagNumRE")) {
					propertyTagNumRE = nodeValue;
				}
				if (nodeName.contains("DescriptionRE")) {
					descriptionRE = nodeValue;
				}
				if (nodeName.contains("DateReturned")) {
					dateReturned = nodeValue;
				}
				if (nodeName.contains("YesNoRB")) {
					yesNoRB = nodeValue;
					if (yesNoRB.contains("1")) {
						copyPreviousValue = "Yes";
					} else if (yesNoRB.contains("2")) {
						copyPreviousValue = "No";
					}
				}
				if (nodeName.contains("EquipBorrowedDate")) {
					equipBorrowedDate = nodeValue;
				}
			}

			memberDataMapInfo = new LinkedHashMap<String, Object>();

			memberDataMapInfo.put("CASEID", caseId);
			memberDataMapInfo.put("CWID", cwid);
			memberDataMapInfo.put("FORM_NAME", formName);
			memberDataMapInfo.put("PROPERTY_TN_RETURN", propertyTagNumRE);
			memberDataMapInfo.put("DESCRIPTION_RETURN", descriptionRE);
			memberDataMapInfo.put("DATE_RETURNED", dateReturned);
			memberDataMapInfo.put("COPY_VALUES", copyPreviousValue);
			memberDataMapInfo.put("EQUIP_BORROWED_DATE", equipBorrowedDate);

			memberDataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

			/*dbUtil.insertFormData(conn, memberDataMapInfo, childTableNameTwo, formName);*/
			try {
				CloudDbSaveUtil.saveFormData(childTableNameTwo, formName, "", "", workflowInstanceID,
						memberDataMapInfo, "DATE_RETURNED,EQUIP_BORROWED_DATE");
			} catch (IOException ioException) {
				ioException.printStackTrace();
			}

		}

	}
}