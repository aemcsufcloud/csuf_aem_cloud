package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.util.Arrays;
import java.util.LinkedHashMap;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;
import org.w3c.dom.Node;

import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFConstantsUtils;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Delegation Of Authority Change Timekeeper Data Save DB",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=DOATimeKeeperDataSaveDB" })
public class CSUFDOATimeKeeperDataSaveDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFDOATimeKeeperDataSaveDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	DatabaseUtils dbUtil = new DatabaseUtils();

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;

		String fieldValue = "";
		String employeeName = "";
		String employeeID = "";
		String userID = "";
		String userEmailAddress = "";
		String effectiveDate = "";
		String collegeID = "";
		String divisionID = "";
		String departmentId = "";
		String agencyUnitVal = "";
		String[] agencyUnit;
		String agencyVal = "";
		String unitVal = "";
		String primaryTimeKeeperAdd = "";
		String primaryTimeKeeperDelete = "";
		String alternateTimeKeeperAdd = "";
		String alternateTimeKeeperDelete = "";
		String approvingOfficialTimeKeeperAdd = "";
		String approvingOfficialTimeKeeperDelete = "";
		String primaryStudentAdd = "";
		String primaryStudentDelete = "";
		String alternateStudentAdd = "";
		String alternateStudentDelete = "";
		String approvingOfficialCDAdd = "";
		String approvingOfficialCDDelete = "";
		String primaryWarrantCoordinatorAdd = "";
		String primaryWarrantCoordinatorDelete = "";
		String alternateWarrantCoordinatorAdd = "";
		String alternateWarrantCoordinatorDelete = "";
		String primaryCMSStudentAdd = "";
		String primaryCMSStudentDelete = "";
		String alternateCMSStudentAdd = "";
		String alternateCMSStudentDelete = "";

		String deleteFlag = "";

		// LinkedHashMap<String, Object> contentForDB = null;

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		try {
			InputStream is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, workItem.getContentPath(), "Data.xml");
			if (null != is) {
				Document doc = XMLUtils.getDomDocument(is);

				// LinkedHashMap<String, Object> timeKeeperDataInfo = null;

				conn = jdbcConnectionService.getDocDBConnection();

				if (conn != null) {

					Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");
					// Element rowElement = XMLUtils.getChildNode(afBoundDataElement, "Row1");
					NodeList nodeList = afBoundDataElement.getElementsByTagName("Row1");
					log.info("Number Of Rows are= " + nodeList.getLength());

					for (int rowCount = 0; rowCount < nodeList.getLength(); rowCount++) {

						if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {

							Node node = nodeList.item(rowCount);

							if (node.getNodeType() == Node.ELEMENT_NODE) {
								Element eElement = (Element) node;
								departmentId = eElement.getElementsByTagName("department_Id").item(0).getTextContent();
								agencyUnitVal = eElement.getElementsByTagName("agency_unit").item(0).getTextContent();
								agencyUnit = agencyUnitVal.split(" - ");
								unitVal = agencyUnit[1];
								agencyVal = agencyUnit[0];
							}

							// employeeID = XMLUtils.getChildNodeContent(afBoundDataElement, "hidden_cwid");
							collegeID = XMLUtils.getChildNodeContent(afBoundDataElement, "hidden_college_code");
							divisionID = XMLUtils.getChildNodeContent(afBoundDataElement, "hidden_division_code");
							effectiveDate = XMLUtils.getChildNodeContent(afBoundDataElement, "effective_date");

							primaryTimeKeeperDelete = XMLUtils.getChildNodeContent(afBoundDataElement,
									"timeKeeper_primary_delete");
							if (primaryTimeKeeperDelete != null && !primaryTimeKeeperDelete.trim().isEmpty()) {
								fieldValue = CSUFConstantsUtils.primaryFacultyStaffAttendanceTimekeeper;
								deleteFlag = "Y";
								dbUtil.updateTimekeeperData(fieldValue, departmentId, collegeID, divisionID, unitVal,
										deleteFlag, conn);
							}

							primaryTimeKeeperAdd = XMLUtils.getChildNodeContent(afBoundDataElement,
									"timeKeeper_primary_add");
							if (primaryTimeKeeperAdd != null && !primaryTimeKeeperAdd.trim().isEmpty()) {

								fieldValue = CSUFConstantsUtils.primaryFacultyStaffAttendanceTimekeeper;
								employeeName = XMLUtils.getChildNodeContent(afBoundDataElement,
										"timeKeeper_primary_add");

								employeeID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_primary_timekeeper_emplID");
								userID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_primary_timekeeper_userID");
								userEmailAddress = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_primary_timekeeper_email");

								insertData(employeeID, fieldValue, departmentId, collegeID, divisionID, employeeName,
										agencyVal, unitVal, userID, userEmailAddress, effectiveDate, conn);
							}

							alternateTimeKeeperDelete = XMLUtils.getChildNodeContent(afBoundDataElement,
									"timeKeeper_alternate_delete");
							if (alternateTimeKeeperDelete != null && !alternateTimeKeeperDelete.trim().isEmpty()) {
								fieldValue = CSUFConstantsUtils.alternateFacultyStaffAttendanceTimekeeper;
								deleteFlag = "Y";

								dbUtil.updateTimekeeperData(fieldValue, departmentId, collegeID, divisionID, unitVal,
										deleteFlag, conn);
							}

							alternateTimeKeeperAdd = XMLUtils.getChildNodeContent(afBoundDataElement,
									"timeKeeper_alternate_add");
							if (alternateTimeKeeperAdd != null && !alternateTimeKeeperAdd.trim().isEmpty()) {

								fieldValue = CSUFConstantsUtils.alternateFacultyStaffAttendanceTimekeeper;
								employeeName = XMLUtils.getChildNodeContent(afBoundDataElement,
										"timeKeeper_alternate_add");
								employeeID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_alternate_timekeeper_emplID");
								userID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_alternate_timekeeper_userID");
								userEmailAddress = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_alternate_timekeeper_email");

								insertData(employeeID, fieldValue, departmentId, collegeID, divisionID, employeeName,
										agencyVal, unitVal, userID, userEmailAddress, effectiveDate, conn);
							}

							approvingOfficialTimeKeeperDelete = XMLUtils.getChildNodeContent(afBoundDataElement,
									"timeKeeper_approving_official_delete");
							if (approvingOfficialTimeKeeperDelete != null
									&& !approvingOfficialTimeKeeperDelete.trim().isEmpty()) {
								fieldValue = CSUFConstantsUtils.approvingOfficialFacultyStaffAttendanceTimekeeper;
								deleteFlag = "Y";
								dbUtil.updateTimekeeperData(fieldValue, departmentId, collegeID, divisionID, unitVal,
										deleteFlag, conn);
							}

							approvingOfficialTimeKeeperAdd = XMLUtils.getChildNodeContent(afBoundDataElement,
									"timeKeeper_approving_official_add");
							if (approvingOfficialTimeKeeperAdd != null
									&& !approvingOfficialTimeKeeperAdd.trim().isEmpty()) {

								fieldValue = CSUFConstantsUtils.approvingOfficialFacultyStaffAttendanceTimekeeper;
								employeeName = XMLUtils.getChildNodeContent(afBoundDataElement,
										"timeKeeper_approving_official_add");
								employeeID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_official_approver_emplID");
								userID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_official_approver_userID");
								userEmailAddress = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_official_approver_email");

								insertData(employeeID, fieldValue, departmentId, collegeID, divisionID, employeeName,
										agencyVal, unitVal, userID, userEmailAddress, effectiveDate, conn);

								/*
								 * contentForDB = insertData(employeeID, fieldValue, departmentId, collegeID,
								 * divisionID, employeeName, agencyVal, unitVal, userID, userEmailAddress,
								 * conn); log.info("from approvingOfficialTimeKeeperAdd= " + contentForDB);
								 */
							}

							primaryStudentDelete = XMLUtils.getChildNodeContent(afBoundDataElement,
									"student_primary_delete");
							if (primaryStudentDelete != null && !primaryStudentDelete.trim().isEmpty()) {
								fieldValue = CSUFConstantsUtils.primaryStudentAttendanceTimekeeper;
								deleteFlag = "Y";

								dbUtil.updateTimekeeperData(fieldValue, departmentId, collegeID, divisionID, unitVal,
										deleteFlag, conn);
							}

							primaryStudentAdd = XMLUtils.getChildNodeContent(afBoundDataElement, "student_primary_add");
							if (primaryStudentAdd != null && !primaryStudentAdd.trim().isEmpty()) {

								fieldValue = CSUFConstantsUtils.primaryStudentAttendanceTimekeeper;
								employeeName = XMLUtils.getChildNodeContent(afBoundDataElement, "student_primary_add");
								employeeID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_primary_student_timekeeper_emplID");
								userID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_primary_student_timekeeper_userID");
								userEmailAddress = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_primary_student_timekeeper_email");

								insertData(employeeID, fieldValue, departmentId, collegeID, divisionID, employeeName,
										agencyVal, unitVal, userID, userEmailAddress, effectiveDate, conn);
							}

							alternateStudentDelete = XMLUtils.getChildNodeContent(afBoundDataElement,
									"student_alternate_delete");
							if (alternateStudentDelete != null && !alternateStudentDelete.trim().isEmpty()) {
								fieldValue = CSUFConstantsUtils.alternateStudentAttendanceTimekeeper;
								deleteFlag = "Y";

								dbUtil.updateTimekeeperData(fieldValue, departmentId, collegeID, divisionID, unitVal,
										deleteFlag, conn);
							}

							alternateStudentAdd = XMLUtils.getChildNodeContent(afBoundDataElement,
									"student_alternate_add");
							if (alternateStudentAdd != null && !alternateStudentAdd.trim().isEmpty()) {

								fieldValue = CSUFConstantsUtils.alternateStudentAttendanceTimekeeper;
								employeeName = XMLUtils.getChildNodeContent(afBoundDataElement,
										"student_alternate_add");
								employeeID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_alternate_student_timekeeper_emplID");
								userID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_alternate_student_timekeeper_userID");
								userEmailAddress = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_alternate_student_timekeeper_email");

								insertData(employeeID, fieldValue, departmentId, collegeID, divisionID, employeeName,
										agencyVal, unitVal, userID, userEmailAddress, effectiveDate, conn);
							}

							approvingOfficialCDDelete = XMLUtils.getChildNodeContent(afBoundDataElement,
									"approving_official_cd_delete");
							if (approvingOfficialCDDelete != null && !approvingOfficialCDDelete.trim().isEmpty()) {
								fieldValue = CSUFConstantsUtils.approvingOfficialStudentAttendanceTimekeeper;
								deleteFlag = "Y";

								dbUtil.updateTimekeeperData(fieldValue, departmentId, collegeID, divisionID, unitVal,
										deleteFlag, conn);
							}

							approvingOfficialCDAdd = XMLUtils.getChildNodeContent(afBoundDataElement,
									"approving_official_cd_add");
							if (approvingOfficialCDAdd != null && !approvingOfficialCDAdd.trim().isEmpty()) {

								fieldValue = CSUFConstantsUtils.approvingOfficialStudentAttendanceTimekeeper;
								employeeName = XMLUtils.getChildNodeContent(afBoundDataElement,
										"approving_official_cd_add");
								employeeID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_official_cd_approver_emplID");
								userID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_official_cd_approver_userID");
								userEmailAddress = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_official_cd_approver_email");

								insertData(employeeID, fieldValue, departmentId, collegeID, divisionID, employeeName,
										agencyVal, unitVal, userID, userEmailAddress, effectiveDate, conn);

								/*
								 * contentForDB = insertData(employeeID, fieldValue, departmentId, collegeID,
								 * divisionID, employeeName, agencyVal, unitVal, userID, userEmailAddress,
								 * conn); log.info("from approvingOfficialCDAdd= " + contentForDB);
								 */
							}

							primaryWarrantCoordinatorDelete = XMLUtils.getChildNodeContent(afBoundDataElement,
									"warrant_primary_delete");
							if (primaryWarrantCoordinatorDelete != null
									&& !primaryWarrantCoordinatorDelete.trim().isEmpty()) {
								fieldValue = CSUFConstantsUtils.primaryWarrantCoordinator;
								deleteFlag = "Y";

								dbUtil.updateTimekeeperData(fieldValue, departmentId, collegeID, divisionID, unitVal,
										deleteFlag, conn);
							}

							primaryWarrantCoordinatorAdd = XMLUtils.getChildNodeContent(afBoundDataElement,
									"warrant_primary_add");
							if (primaryWarrantCoordinatorAdd != null
									&& !primaryWarrantCoordinatorAdd.trim().isEmpty()) {

								fieldValue = CSUFConstantsUtils.primaryWarrantCoordinator;
								employeeName = XMLUtils.getChildNodeContent(afBoundDataElement, "warrant_primary_add");
								employeeID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_primary_warrant_approver_emplID");
								userID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_primary_warrant_approver_userID");
								userEmailAddress = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_primary_warrant_approver_email");

								insertData(employeeID, fieldValue, departmentId, collegeID, divisionID, employeeName,
										agencyVal, unitVal, userID, userEmailAddress, effectiveDate, conn);

								/*
								 * contentForDB = insertData(employeeID, fieldValue, departmentId, collegeID,
								 * divisionID, employeeName, agencyVal, unitVal, userID, userEmailAddress,
								 * conn); log.info("from primaryWarrantCoordinatorAdd= " + contentForDB);
								 */
							}

							alternateWarrantCoordinatorDelete = XMLUtils.getChildNodeContent(afBoundDataElement,
									"warrant_alternate_delete");
							if (alternateWarrantCoordinatorDelete != null
									&& !alternateWarrantCoordinatorDelete.trim().isEmpty()) {
								fieldValue = CSUFConstantsUtils.alternateWarrantCoordinator;
								deleteFlag = "Y";

								dbUtil.updateTimekeeperData(fieldValue, departmentId, collegeID, divisionID, unitVal,
										deleteFlag, conn);
							}

							alternateWarrantCoordinatorAdd = XMLUtils.getChildNodeContent(afBoundDataElement,
									"warrant_alternate_add");
							if (alternateWarrantCoordinatorAdd != null
									&& !alternateWarrantCoordinatorAdd.trim().isEmpty()) {

								fieldValue = CSUFConstantsUtils.alternateWarrantCoordinator;
								employeeName = XMLUtils.getChildNodeContent(afBoundDataElement,
										"warrant_alternate_add");
								employeeID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_alternate_warrant_approver_emplID");
								userID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_alternate_warrant_approver_userID");
								userEmailAddress = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_alternate_warrant_approver_email");

								insertData(employeeID, fieldValue, departmentId, collegeID, divisionID, employeeName,
										agencyVal, unitVal, userID, userEmailAddress, effectiveDate, conn);

								/*
								 * contentForDB = insertData(employeeID, fieldValue, departmentId, collegeID,
								 * divisionID, employeeName, agencyVal, unitVal, userID, userEmailAddress,
								 * conn); log.info("from alternateWarrantCoordinatorAdd= " + contentForDB);
								 */
							}

							primaryCMSStudentDelete = XMLUtils.getChildNodeContent(afBoundDataElement,
									"cms_student_primary_delete");
							if (primaryCMSStudentDelete != null && !primaryCMSStudentDelete.trim().isEmpty()) {
								fieldValue = CSUFConstantsUtils.primaryCMSStudentConfirmationTicketApprover;
								deleteFlag = "Y";

								dbUtil.updateTimekeeperData(fieldValue, departmentId, collegeID, divisionID, unitVal,
										deleteFlag, conn);
							}

							primaryCMSStudentAdd = XMLUtils.getChildNodeContent(afBoundDataElement,
									"cms_student_primary_add");
							if (primaryCMSStudentAdd != null && !primaryCMSStudentAdd.trim().isEmpty()) {

								fieldValue = CSUFConstantsUtils.primaryCMSStudentConfirmationTicketApprover;
								employeeName = XMLUtils.getChildNodeContent(afBoundDataElement,
										"cms_student_primary_add");
								employeeID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_primary_cms_student_approver_emplID");
								userID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_primary_cms_student_approver_userID");
								userEmailAddress = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_primary_cms_student_approver_email");

								insertData(employeeID, fieldValue, departmentId, collegeID, divisionID, employeeName,
										agencyVal, unitVal, userID, userEmailAddress, effectiveDate, conn);

								/*
								 * contentForDB = insertData(employeeID, fieldValue, departmentId, collegeID,
								 * divisionID, employeeName, agencyVal, unitVal, userID, userEmailAddress,
								 * conn); log.info("from primaryCMSStudentAdd= " + contentForDB);
								 */
							}

							alternateCMSStudentDelete = XMLUtils.getChildNodeContent(afBoundDataElement,
									"cms_student_alternate_delete");
							if (alternateCMSStudentDelete != null && !alternateCMSStudentDelete.trim().isEmpty()) {
								fieldValue = CSUFConstantsUtils.alternateCMSStudentConfirmationTicketApprover;
								deleteFlag = "Y";

								dbUtil.updateTimekeeperData(fieldValue, departmentId, collegeID, divisionID, unitVal,
										deleteFlag, conn);
							}

							alternateCMSStudentAdd = XMLUtils.getChildNodeContent(afBoundDataElement,
									"cms_student_alternate_add");
							if (alternateCMSStudentAdd != null && !alternateCMSStudentAdd.trim().isEmpty()) {

								fieldValue = CSUFConstantsUtils.alternateCMSStudentConfirmationTicketApprover;
								employeeName = XMLUtils.getChildNodeContent(afBoundDataElement,
										"cms_student_alternate_add");
								employeeID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_alternate_cms_student_approver_emplID");
								userID = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_alternate_cms_student_approver_userID");
								userEmailAddress = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hidden_alternate_cms_student_approver_email");

								insertData(employeeID, fieldValue, departmentId, collegeID, divisionID, employeeName,
										agencyVal, unitVal, userID, userEmailAddress, effectiveDate, conn);

								/*
								 * contentForDB = insertData(employeeID, fieldValue, departmentId, collegeID,
								 * divisionID, employeeName, agencyVal, unitVal, userID, userEmailAddress,
								 * conn); log.info("from alternateCMSStudentAdd= " + contentForDB);
								 */
							}

						}
					}
				}
			}
		} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {

			log.error("Error in CSUFDelegationOfAuthorityTimeKeeperDataSaveDB= " + Arrays.toString(e.getStackTrace()));
		} finally {

			try {
				if (conn != null) {
					conn.close();
					log.info("Connection Closed successfully for CSUFDelegationOfAuthorityTimeKeeperDataSaveDB");
				}
			} catch (Exception exp) {
				log.error("Error in CSUFDelegationOfAuthorityTimeKeeperDataSaveDB - After Finally Block = "
						+ Arrays.toString(exp.getStackTrace()));
			}
		}
	}

	public LinkedHashMap<String, Object> insertData(String employeeID, String fieldValue, String departmentId,
			String collegeID, String divisionID, String employeeName, String agencyVal, String unitVal, String userID,
			String userEmailAddress, String effectiveDate, Connection conn) {

		String tableName = "DOA_TIMEKEEPER_DATA";
		String formName = "Delegation of Authority Change";

		LinkedHashMap<String, Object> timeKeeperDataInfo = null;

		timeKeeperDataInfo = new LinkedHashMap<String, Object>();
		timeKeeperDataInfo.put("EMPLID", employeeID);
		timeKeeperDataInfo.put("FIELD_VALUE", fieldValue);
		timeKeeperDataInfo.put("DEPTID", departmentId);
		timeKeeperDataInfo.put("COLLEGE", collegeID);
		timeKeeperDataInfo.put("DIVISON", divisionID);
		timeKeeperDataInfo.put("NAME", employeeName);
		timeKeeperDataInfo.put("CSU_SCO_AGENCY", agencyVal);
		timeKeeperDataInfo.put("CSU_UNIT", unitVal);
		timeKeeperDataInfo.put("DELETE_FLG", "N");
		timeKeeperDataInfo.put("USERID", userID);
		timeKeeperDataInfo.put("EMAIL_ADDR", userEmailAddress);

		Object effectiveDateObj = null;
		if (effectiveDate != null && effectiveDate != "") {
			Date effectiveDateNew = Date.valueOf(effectiveDate);
			effectiveDateObj = effectiveDateNew;
		}
		timeKeeperDataInfo.put("EFFECTIVE_DATE", effectiveDateObj);

		dbUtil.insertFormData(conn, timeKeeperDataInfo, tableName, formName);

		return timeKeeperDataInfo;
	}
}
