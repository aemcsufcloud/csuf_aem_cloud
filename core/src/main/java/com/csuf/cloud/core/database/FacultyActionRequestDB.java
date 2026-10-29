package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Faculty Action Request DB",
		Constants.SERVICE_VENDOR + "=Thoughtfocus", "process.label" + "=Faculty Action Request DB" })
public class FacultyActionRequestDB implements WorkflowProcess {
	private static final Logger log = LoggerFactory.getLogger(FacultyActionRequestDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		String tableName = "AEM_FAR_FORM";
		String formName = "Faculty Action Request";
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Map<String, Object> dataMap = null;
		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		String workflowInstanceID = workItem.getWorkflow().getId();
		try (Connection conn = jdbcConnectionService.getDBConn(dataSourceVal);) {
			payloadPath = workItem.getWorkflowData().getPayload().toString();
			if (conn != null) {
				dataMap = new LinkedHashMap<>();
				InputStream is = null;
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");
				if (null != is) {
					Document doc = XMLUtils.getDomDocument(is);
					Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");
					Element element = XMLUtils.getChildNode(afBoundDataElement, "FARF");
					if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
						dataMap = addXMLParentNodesToMap(element, workflowInstanceID);
						String emplid = XMLUtils.getChildNodeContent(element, "CWID");
						DatabaseUtils dbUtil = new DatabaseUtils();
						String resultData = dbUtil.getFormData(conn, emplid, "EMPLID", workflowInstanceID, tableName);
						if (resultData != null && !resultData.equals("")) {
							dbUtil.deleteSPEEvalData(conn, emplid, "EMPLID", workflowInstanceID, tableName);
							dbUtil.insertFormData(conn, dataMap, tableName, formName);
						} else {
							dbUtil.insertFormData(conn, dataMap, tableName, formName);
						}

					}
				}
			}
		} catch (SQLException | RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			log.error("Exception = {}", Arrays.toString(e.getStackTrace()));
		} 
	}

	public void insertFAERForm(Connection conn, Map<String, Object> faerDataMap) throws SQLException {
		if (conn != null) {
			conn.setAutoCommit(false);
			String tableName = "AEM_FAR_FORM";
			StringBuilder sql = new StringBuilder("INSERT INTO  ").append(tableName).append(" (");
			StringBuilder placeholders = new StringBuilder();
			for (Iterator<String> iter = faerDataMap.keySet().iterator(); iter.hasNext();) {
				sql.append(iter.next());
				placeholders.append("?");
				if (iter.hasNext()) {
					sql.append(",");
					placeholders.append(",");
				}
			}
			sql.append(") VALUES (").append(placeholders).append(")");
			log.debug("SQL2 = {}", sql);
			try (PreparedStatement preparedStmt = conn.prepareStatement(sql.toString());) {
				int i = 0;
				for (Object value : faerDataMap.values()) {
					if (value instanceof Date) {
						preparedStmt.setDate(++i, (Date) value);
					} else if (value instanceof Integer) {
						preparedStmt.setInt(++i, (Integer) value);
					} else {
						if (value != "" && value != null) {
							preparedStmt.setString(++i, value.toString());
						} else {
							preparedStmt.setString(++i, null);
						}
					}
				}
				preparedStmt.executeUpdate();
				conn.commit();
			} catch (SQLException e) {
				log.error("SQLException From FAERDB Class : {}", Arrays.toString(e.getStackTrace()));
			}
		}
	}

	private Map<String, Object> addXMLParentNodesToMap(Element eElement, String workflowInstanceID) {
		Map<String, Object> parentNodesMap = new LinkedHashMap<>();
		try {
			parentNodesMap.put("EMPLID", XMLUtils.getChildNodeContent(eElement, "CWID"));
			parentNodesMap.put("CHRS_ID", XMLUtils.getChildNodeContent(eElement, "CHRSID"));
			parentNodesMap.put("FIRST_NAME", XMLUtils.getChildNodeContent(eElement, "FirstName"));
			parentNodesMap.put("MIDDLE_NAME", XMLUtils.getChildNodeContent(eElement, "MiddleName"));
			parentNodesMap.put("LAST_NAME", XMLUtils.getChildNodeContent(eElement, "LastName"));
			parentNodesMap.put("DEPT_NAME", XMLUtils.getChildNodeContent(eElement, "DeptName"));
			parentNodesMap.put("CMS_POSITION_NO", XMLUtils.getChildNodeContent(eElement, "CMSPositionNo"));
			parentNodesMap.put("COLLEGE_DIVISION", XMLUtils.getChildNodeContent(eElement, "CollegeDivision"));
			Object stDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "TodayDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "TodayDate") != "") {
				Date stDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "TodayDate"));
				stDateObj = stDate;
			}
			parentNodesMap.put("TODAY_DT", stDateObj);
			parentNodesMap.put("AGENCY", XMLUtils.getChildNodeContent(eElement, "Agency"));
			parentNodesMap.put("REPORTING_UNIT", XMLUtils.getChildNodeContent(eElement, "ReportingUnit"));
			parentNodesMap.put("CLASS_CODE", XMLUtils.getChildNodeContent(eElement, "ClassCode"));
			parentNodesMap.put("COLLEGE", XMLUtils.getChildNodeContent(eElement, "College"));
			parentNodesMap.put("DEGREE_TYPE", XMLUtils.getChildNodeContent(eElement, "DegreeType"));
			Object degDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "DegreeDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "DegreeDate") != "") {
				Date degDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "DegreeDate"));
				degDateObj = degDate;
			}
			parentNodesMap.put("DEGREE_DATE", degDateObj);
			parentNodesMap.put("ACTION_REQUESTED", XMLUtils.getChildNodeContent(eElement, "ActionRequested"));
			parentNodesMap.put("TEMP_FACULTY", XMLUtils.getChildNodeContent(eElement, "TempFaculty"));
			parentNodesMap.put("GA", XMLUtils.getChildNodeContent(eElement, "GA"));
			parentNodesMap.put("TA", XMLUtils.getChildNodeContent(eElement, "TA"));
			parentNodesMap.put("ISA", XMLUtils.getChildNodeContent(eElement, "ISA"));
			parentNodesMap.put("CURR_CLASSIFICATION_JOBTITLE",
					XMLUtils.getChildNodeContent(eElement, "CurrentClassificationJobTitle"));
			parentNodesMap.put("CURR_DEPT_UNIT", XMLUtils.getChildNodeContent(eElement, "CurrentDeptUnit"));
			parentNodesMap.put("CURR_TERM", XMLUtils.getChildNodeContent(eElement, "CurrentTerm"));
			parentNodesMap.put("NEW_CLASSIFICATION_JOBTITLE",
					XMLUtils.getChildNodeContent(eElement, "NewClassificationJobTitle"));
			parentNodesMap.put("NEW_DEPT_UNIT", XMLUtils.getChildNodeContent(eElement, "NewDeptUnit"));

			parentNodesMap.put("CURR_DEPTID", XMLUtils.getChildNodeContent(eElement, "CurrDeptID"));
			parentNodesMap.put("CURR_JOB_CODE", XMLUtils.getChildNodeContent(eElement, "CurrJobCode"));
			Object curTranDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "CurrTranDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "CurrTranDate") != "") {
				Date curTanDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "CurrTranDate"));
				curTranDateObj = curTanDate;
			}
			parentNodesMap.put("CURR_TRAN_DATE", curTranDateObj);

			Object curAppEndDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "CurrApptEndDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "CurrApptEndDate") != "") {
				Date currAppEndDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "CurrApptEndDate"));
				curAppEndDateObj = currAppEndDate;
			}
			parentNodesMap.put("CURR_APPT_END_DATE", curAppEndDateObj);
			parentNodesMap.put("CURR_RANGE", XMLUtils.getChildNodeContent(eElement, "CurrRange"));
			parentNodesMap.put("CURR_PAID_UNITS", XMLUtils.getChildNodeContent(eElement, "CurrPaidUnits"));
			parentNodesMap.put("CURR_PIMS_FRACTION", XMLUtils.getChildNodeContent(eElement, "CurrPIMSFraction"));
			parentNodesMap.put("CURR_BASE_PAY", XMLUtils.getChildNodeContent(eElement, "CurrBasePay"));
			parentNodesMap.put("CURR_RANGE_HR_FROM", XMLUtils.getChildNodeContent(eElement, "CurrRangeHrFrom"));
			parentNodesMap.put("CURR_RANGE_HOURS_TO", XMLUtils.getChildNodeContent(eElement, "CurrRangeHoursTo"));

			parentNodesMap.put("NEW_DEPTID", XMLUtils.getChildNodeContent(eElement, "NewDeptID"));
			parentNodesMap.put("NEW_JOB_CODE", XMLUtils.getChildNodeContent(eElement, "NewJobCode"));
			Object newTranDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "NewTranDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "NewTranDate") != "") {
				Date newTanDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "NewTranDate"));
				newTranDateObj = newTanDate;
			}
			parentNodesMap.put("NEW_TRAN_DATE", newTranDateObj);
			Object newAppEndDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "NewApptEndDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "NewApptEndDate") != "") {
				Date newAppEndDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "NewApptEndDate"));
				newAppEndDateObj = newAppEndDate;
			}
			parentNodesMap.put("NEW_APPT_END_DATE", newAppEndDateObj);
			parentNodesMap.put("NEW_RANGE", XMLUtils.getChildNodeContent(eElement, "NewRange"));
			parentNodesMap.put("NEW_PAID_UNITS", XMLUtils.getChildNodeContent(eElement, "NewPaidUnits"));
			parentNodesMap.put("NEW_PIMS_FRACTION", XMLUtils.getChildNodeContent(eElement, "NewPIMSFraction"));

			parentNodesMap.put("NEW_BASE_PAY", XMLUtils.getChildNodeContent(eElement, "NewBasePay"));
			parentNodesMap.put("NEW_RANGE_HR_FROM", XMLUtils.getChildNodeContent(eElement, "NewRangeHrFrom"));
			parentNodesMap.put("NEW_RANGE_HOURS_TO", XMLUtils.getChildNodeContent(eElement, "NewRangeHoursTo"));
			parentNodesMap.put("REMARKS", XMLUtils.getChildNodeContent(eElement, "Remarks"));

			parentNodesMap.put("PREPARED_PRINT_NAME", XMLUtils.getChildNodeContent(eElement, "PreparedPrintName"));
			parentNodesMap.put("PREPARED_SIGNATURE", XMLUtils.getChildNodeContent(eElement, "PreparedSignature"));
			Object prepDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "PreparedDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "PreparedDate") != "") {
				Date preEndDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "PreparedDate"));
				prepDateObj = preEndDate;
			}
			parentNodesMap.put("PREPARED_DATE", prepDateObj);
			parentNodesMap.put("PREPARER_EXT", XMLUtils.getChildNodeContent(eElement, "PreparedExt"));
			parentNodesMap.put("PREPARED_EMAIL", XMLUtils.getChildNodeContent(eElement, "PreparerSignEmailID"));
			parentNodesMap.put("PREPARER_COMMENTS", XMLUtils.getChildNodeContent(eElement, "PreparedComments"));
			
			parentNodesMap.put("CHAIR_PRINTED_NAME", XMLUtils.getChildNodeContent(eElement, "DeptChairPrintedName"));
			parentNodesMap.put("CHAIR_SIGNATURE", XMLUtils.getChildNodeContent(eElement, "DeptChairSignature"));
			Object chairDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "DeptChairDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "DeptChairDate") != "") {
				Date chairEndDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "DeptChairDate"));
				chairDateObj = chairEndDate;
			}
			parentNodesMap.put("CHAIR_DATE", chairDateObj);
			parentNodesMap.put("CHAIR_EXT", XMLUtils.getChildNodeContent(eElement, "DeptChairExt"));
			parentNodesMap.put("CHAIR_EMAIL", XMLUtils.getChildNodeContent(eElement, "ChairSignEmailID"));
			parentNodesMap.put("CHAIR_COMMENTS", XMLUtils.getChildNodeContent(eElement, "DeptChairComments"));

			parentNodesMap.put("DEAN_PRINTED_NAME", XMLUtils.getChildNodeContent(eElement, "DeanPrintedName"));
			parentNodesMap.put("DEAN_SIGNATURE", XMLUtils.getChildNodeContent(eElement, "DeanSignature"));
			Object deanDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "DeanDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "DeanDate") != "") {
				Date deanDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "DeanDate"));
				deanDateObj = deanDate;
			}
			parentNodesMap.put("DEAN_DATE", deanDateObj);
			parentNodesMap.put("DEAN_EMAIL", XMLUtils.getChildNodeContent(eElement, "DeanSignEmailID"));
			parentNodesMap.put("DEAN_EXT", XMLUtils.getChildNodeContent(eElement, "DeanExt"));
			parentNodesMap.put("DEAN_COMMENTS", XMLUtils.getChildNodeContent(eElement, "DeanComments"));
			
			parentNodesMap.put("HRDI_PRINTED_NAME", XMLUtils.getChildNodeContent(eElement, "HRDIPrintedName"));
			parentNodesMap.put("HRDI_SIGNATURE", XMLUtils.getChildNodeContent(eElement, "HRDISignature"));
			Object hrDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "HRDIDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "HRDIDate") != "") {
				Date hrDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "HRDIDate"));
				hrDateObj = hrDate;
			}
			parentNodesMap.put("HRDI_DATE", hrDateObj);
			parentNodesMap.put("HR_EXT", XMLUtils.getChildNodeContent(eElement, "HRDIExt"));
			parentNodesMap.put("HRDI_EMAIL", XMLUtils.getChildNodeContent(eElement, "HRSignEmailID"));
			parentNodesMap.put("HRDI_COMMENTS", XMLUtils.getChildNodeContent(eElement, "HRDIComments"));
			
			parentNodesMap.put("PAYROLL_NAME", XMLUtils.getChildNodeContent(eElement, "PayrollName"));
			parentNodesMap.put("PAYROLL_SIGNATURE", XMLUtils.getChildNodeContent(eElement, "PayrollSignature"));
			Object payRollDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "PayrollDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "PayrollDate") != "") {
				Date payRollDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "PayrollDate"));
				payRollDateObj = payRollDate;
			}
			parentNodesMap.put("PAYROLL_DATE", payRollDateObj);
			parentNodesMap.put("PAYROLL_EXT", XMLUtils.getChildNodeContent(eElement, "PayrollExt"));
			parentNodesMap.put("PAYROLL_EMAIL", XMLUtils.getChildNodeContent(eElement, "PayrollSignEmailID"));
			parentNodesMap.put("PAYROLL_COMMENTS", XMLUtils.getChildNodeContent(eElement, "PayrollComments"));
			
			parentNodesMap.put("OPTIONAL_REVIEWER_NAME", XMLUtils.getChildNodeContent(eElement, "OptionalReviewerName"));
			parentNodesMap.put("OPTIONAL_REVIEWER_USERID", XMLUtils.getChildNodeContent(eElement, "OptionalReviewerUserId"));
			parentNodesMap.put("OPTIONAL_REVIEWER_EMAIL", XMLUtils.getChildNodeContent(eElement, "OptionalReviewerEmailId"));
			parentNodesMap.put("OPTIONAL_REVIEWER_FLAG", XMLUtils.getChildNodeContent(eElement, "OptionalReviewerFlag"));
						
			parentNodesMap.put("OPTIONAL_REVIEWER_SIGN", XMLUtils.getChildNodeContent(eElement, "OptionalReviewerSignature"));
			Object optionalDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "OptionalReviewerSignatureDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "OptionalReviewerSignatureDate") != "") {
				Date optionalDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "OptionalReviewerSignatureDate"));
				optionalDateObj = optionalDate;
			}
			parentNodesMap.put("OPTIONAL_REVIEWER_DATE", optionalDateObj);
			parentNodesMap.put("OPTIONAL_REVIEWER_COMMENT", XMLUtils.getChildNodeContent(eElement, "OptionalReviewerComments"));
			
			parentNodesMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
			parentNodesMap.put("STAGE_INDICATOR", XMLUtils.getChildNodeContent(eElement, "StageIndicator"));

			return parentNodesMap;

		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		return null;
	}

}
