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
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Faculty Additional Employment DB",
		Constants.SERVICE_VENDOR + "=Thoughtfocus", "process.label" + "=Faculty Additional Employment DB" })
public class FacultyAdditionalEmploymentDB implements WorkflowProcess {
	int parentTable = 0;
	private static final Logger log = LoggerFactory.getLogger(FacultyAdditionalEmploymentDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Map<String, Object> dataMap = null;
		Map<String, Object> dataMapFundInfo = null;
		String formName = "Faculty Additional Employment";
		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		Connection conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
		String workflowInstanceID = workItem.getWorkflow().getId();
		try {
			payloadPath = workItem.getWorkflowData().getPayload().toString();
			/*if (conn != null) {*/
			dataMap = new LinkedHashMap<>();
			dataMapFundInfo = new LinkedHashMap<>();
			InputStream is = null;
			is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");
			if (null != is) {
				Document doc = XMLUtils.getDomDocument(is);
				Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");
				Element element = XMLUtils.getChildNode(afBoundDataElement, "FAER");
				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					dataMap = addXMLParentNodesToMap(element, workflowInstanceID);
					for (int i = 0; i < XMLUtils.getElementLength(element, "FundDetails"); i++) {
						dataMapFundInfo = addXMLChildNodesToMap(element, i, workflowInstanceID);
						if (parentTable == 0) {
							insertFAERForm(null, dataMap, formName, workflowInstanceID);
						}
						if (parentTable == 1) {
							insertFAERFundDetails(null, dataMapFundInfo, formName, workflowInstanceID);
						}
					}
				}
			}
			/*}*/
		} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			log.error("Exception = {}", Arrays.toString(e.getStackTrace()));
		} finally {
			parentTable = 0;
		}
	}

	public void insertFAERForm(Connection conn, Map<String, Object> faerDataMap, String formName,
			String workflowInstanceID) {
		String tableName = "AEM_FAER_FORM";
		String cwid = faerDataMap.get("CWID") != null ? faerDataMap.get("CWID").toString() : "";
		try {
			CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "CWID", workflowInstanceID,
					(LinkedHashMap<String, Object>) faerDataMap,
					"START_DT,END_DT,FACULTY_SIGNED_DT,DEAN_SIGNED_DT,FUND_SIGNED_DT1,FUND_SIGNED_DT2,FUND_SIGNED_DT3,HR_SIGNED_DT,BUDGET_ANALYST_SIGNED_DATE");
		} catch (IOException ioException) {
			ioException.printStackTrace();
		}
		parentTable = 1;
		/*if (conn != null) {
			conn.setAutoCommit(false);
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
				parentTable = 1;
			} catch (SQLException e) {
				log.error("SQLException From FAERDB Class : {}", Arrays.toString(e.getStackTrace()));
			}
		}*/
	}

	private void insertFAERFundDetails(Connection conn, Map<String, Object> faerFundDataMap, String formName,
			String workflowInstanceID) {
		String tableName = "AEM_FAER_FUND_SOURCE_DETAILS";
		try {
			CloudDbSaveUtil.saveFormData(tableName, formName, "", "", workflowInstanceID,
					(LinkedHashMap<String, Object>) faerFundDataMap, "");
		} catch (IOException ioException) {
			ioException.printStackTrace();
		}
		/*if (conn != null) {
			conn.setAutoCommit(false);

			String tableName = "AEM_FAER_FUND_SOURCE_DETAILS";
			StringBuilder sql = new StringBuilder("INSERT INTO  ").append(tableName).append(" (");
			StringBuilder placeholders = new StringBuilder();
			for (Iterator<String> iter = faerFundDataMap.keySet().iterator(); iter.hasNext();) {
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

				for (Object value : faerFundDataMap.values()) {
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
				log.error("Error Message : {}, SQLException: {}", e.getMessage(), Arrays.toString(e.getStackTrace()));
			}
		}*/
	}

	private Map<String, Object> addXMLParentNodesToMap(Element eElement, String workflowInstanceID) {
		Map<String, Object> parentNodesMap = new LinkedHashMap<>();
		try {
			parentNodesMap.put("EMPLOYMENT_TYPE", XMLUtils.getChildNodeContent(eElement, "EmployementType"));
			parentNodesMap.put("CWID", XMLUtils.getChildNodeContent(eElement, "CWID"));
			parentNodesMap.put("CHRS_ID", XMLUtils.getChildNodeContent(eElement, "chrsID"));
			parentNodesMap.put("NAME", XMLUtils.getChildNodeContent(eElement, "Name"));
			parentNodesMap.put("POSITION_NO", XMLUtils.getChildNodeContent(eElement, "PositionNo"));
			parentNodesMap.put("DEPTID", XMLUtils.getChildNodeContent(eElement, "DeptID"));
			parentNodesMap.put("DEPT_NAME", XMLUtils.getChildNodeContent(eElement, "DeptName"));
			parentNodesMap.put("REPORTS_TO", XMLUtils.getChildNodeContent(eElement, "ReportsTo"));
			parentNodesMap.put("POOL_ID", XMLUtils.getChildNodeContent(eElement, "PoolID"));
			parentNodesMap.put("CONTRACT_TYPE", XMLUtils.getChildNodeContent(eElement, "ContractType"));
			parentNodesMap.put("ASSIGNMENT_COMP", XMLUtils.getChildNodeContent(eElement, "AssignmentComp"));
			parentNodesMap.put("CATEGORY", XMLUtils.getChildNodeContent(eElement, "Category"));
			Object stDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "StartDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "StartDate") != "") {
				Date stDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "StartDate"));
				stDateObj = stDate;
			}
			parentNodesMap.put("START_DT", stDateObj);
			Object endDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "EndDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "EndDate") != "") {
				Date endDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "EndDate"));
				endDateObj = endDate;
			}
			parentNodesMap.put("END_DT", endDateObj);
			parentNodesMap.put("DESCR_WORK", XMLUtils.getChildNodeContent(eElement, "DescWork"));
			parentNodesMap.put("FACULTY_NAME", XMLUtils.getChildNodeContent(eElement, "FacultyName"));
			Object facultyDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "FacultyDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "FacultyDate") != "") {
				Date facultyDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "FacultyDate"));
				facultyDateObj = facultyDate;
			}
			parentNodesMap.put("FACULTY_SIGNED_DT", facultyDateObj);
			parentNodesMap.put("PREPARER_EMAIL", XMLUtils.getChildNodeContent(eElement, "PreparerEmailID"));
			parentNodesMap.put("DEAN_NAME", XMLUtils.getChildNodeContent(eElement, "DeanName"));
			Object deanDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "DeanDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "DeanDate") != "") {
				Date deanDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "DeanDate"));
				deanDateObj = deanDate;
			}
			parentNodesMap.put("DEAN_SIGNED_DT", deanDateObj);
			parentNodesMap.put("DIVISION", XMLUtils.getChildNodeContent(eElement, "Division"));
			parentNodesMap.put("DIVISION_NAME", XMLUtils.getChildNodeContent(eElement, "DivisionName"));
			parentNodesMap.put("DEAN_DESIGNEE_NAME", XMLUtils.getChildNodeContent(eElement, "DeanDesigneeName"));
			parentNodesMap.put("DEAN_EMAIL", XMLUtils.getChildNodeContent(eElement, "DeanDesigneeEmail"));
			parentNodesMap.put("DEAN_USERID", XMLUtils.getChildNodeContent(eElement, "DeanDesigneeUserID"));
			parentNodesMap.put("FACULTY_USERID", XMLUtils.getChildNodeContent(eElement, "FacultyUserID"));
			parentNodesMap.put("FACULTY_EMAIL", XMLUtils.getChildNodeContent(eElement, "FacultyEmailID"));
			parentNodesMap.put("PREPARED_BY", XMLUtils.getChildNodeContent(eElement, "PreparedBy"));
			parentNodesMap.put("APPROVER_USERID1", XMLUtils.getChildNodeContent(eElement, "ApproverUserID0"));
			parentNodesMap.put("APPROVER_EMAIL1", XMLUtils.getChildNodeContent(eElement, "ApproverEmail0"));
			parentNodesMap.put("APPROVER_NAME1", XMLUtils.getChildNodeContent(eElement, "ApproverName0"));
			parentNodesMap.put("APPROVER_USERID2", XMLUtils.getChildNodeContent(eElement, "ApproverUserID1"));
			parentNodesMap.put("APPROVER_EMAIL2", XMLUtils.getChildNodeContent(eElement, "ApproverEmail1"));
			parentNodesMap.put("APPROVER_NAME2", XMLUtils.getChildNodeContent(eElement, "ApproverName1"));
			parentNodesMap.put("APPROVER_USERID3", XMLUtils.getChildNodeContent(eElement, "ApproverUserID2"));
			parentNodesMap.put("APPROVER_EMAIL3", XMLUtils.getChildNodeContent(eElement, "ApproverEmail2"));
			parentNodesMap.put("APPROVER_NAME3", XMLUtils.getChildNodeContent(eElement, "ApproverName2"));
			parentNodesMap.put("FUND_NAME1", XMLUtils.getChildNodeContent(eElement, "FundingName0"));
			Object funDateObj1 = null;
			if (XMLUtils.getChildNodeContent(eElement, "FundingDate0") != null
					&& XMLUtils.getChildNodeContent(eElement, "FundingDate0") != "") {
				Date funDate1 = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "FundingDate0"));
				funDateObj1 = funDate1;
			}
			parentNodesMap.put("FUND_SIGNED_DT1", funDateObj1);
			parentNodesMap.put("FUND_NAME2", XMLUtils.getChildNodeContent(eElement, "FundingName1"));
			Object funDateObj2 = null;
			if (XMLUtils.getChildNodeContent(eElement, "FundingDate1") != null
					&& XMLUtils.getChildNodeContent(eElement, "FundingDate1") != "") {
				Date funDate2 = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "FundingDate1"));
				funDateObj2 = funDate2;
			}
			parentNodesMap.put("FUND_SIGNED_DT2", funDateObj2);
			parentNodesMap.put("FUND_NAME2", XMLUtils.getChildNodeContent(eElement, "FundingName2"));
			Object funDateObj3 = null;
			if (XMLUtils.getChildNodeContent(eElement, "FundingDate2") != null
					&& XMLUtils.getChildNodeContent(eElement, "FundingDate2") != "") {
				Date funDate3 = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "FundingDate2"));
				funDateObj3 = funDate3;
			}
			parentNodesMap.put("FUND_SIGNED_DT3", funDateObj3);
			parentNodesMap.put("FUNDING_COMMENT1", XMLUtils.getChildNodeContent(eElement, "FundingComments0"));
			parentNodesMap.put("FUNDING_COMMENT2", XMLUtils.getChildNodeContent(eElement, "FundingComments1"));
			parentNodesMap.put("FUNDING_COMMENT3", XMLUtils.getChildNodeContent(eElement, "FundingComments2"));
			parentNodesMap.put("HR_COMMENTS", XMLUtils.getChildNodeContent(eElement, "HRComments"));
			parentNodesMap.put("HR_SIGNATURE", XMLUtils.getChildNodeContent(eElement, "HRSignature"));
			Object hrSignedDtObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "HRDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "HRDate") != "") {
				Date hrSignedDt = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "HRDate"));
				hrSignedDtObj = hrSignedDt;
			}
			parentNodesMap.put("HR_SIGNED_DT", hrSignedDtObj);
			parentNodesMap.put("BUDGET_ANALYST_NAME", XMLUtils.getChildNodeContent(eElement, "BudgetAnalystName_1"));
			parentNodesMap.put("BUDGET_ANALYST_USERID", XMLUtils.getChildNodeContent(eElement, "BudgetAnalystUserID"));
			parentNodesMap.put("BUDGET_ANALYST_EMAIL", XMLUtils.getChildNodeContent(eElement, "BudgetAnalystEmail"));
			parentNodesMap.put("BUDGET_ANALYST_SIGNATURE", XMLUtils.getChildNodeContent(eElement, "BudgetAnalystSign"));
			Object baDtObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "BudgetAnalystSignDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "BudgetAnalystSignDate") != "") {
				Date baSignedDt = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "BudgetAnalystSignDate"));
				baDtObj = baSignedDt;
			}
			parentNodesMap.put("BUDGET_ANALYST_SIGNED_DATE", baDtObj);
			parentNodesMap.put("BUDGET_ANALYST_COMMENTS",
					XMLUtils.getChildNodeContent(eElement, "BudgetAnalystComments"));

			parentNodesMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

			return parentNodesMap;

		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		return null;
	}

	private Map<String, Object> addXMLChildNodesToMap(Element eElement, Integer index, String workflowInstanceID) {
		Map<String, Object> childNodesMap = new LinkedHashMap<>();
		try {
			String fundDeptId = XMLUtils.getChildNodeContentOfElement(eElement, "FundDeptID", index);
			String fund = XMLUtils.getChildNodeContentOfElement(eElement, "Fund", index);
			String program = XMLUtils.getChildNodeContentOfElement(eElement, "Program", index);
			String classNo = XMLUtils.getChildNodeContentOfElement(eElement, "Class", index);
			String accountNo = XMLUtils.getChildNodeContentOfElement(eElement, "Account", index);
			String amount = XMLUtils.getChildNodeContentOfElement(eElement, "Amount", index);
			String approverName = XMLUtils.getChildNodeContentOfElement(eElement, "FundApproverName", index);

			childNodesMap.put("CWID", XMLUtils.getChildNodeContent(eElement, "CWID"));
			childNodesMap.put("FUND_DEPT_ID", fundDeptId);
			childNodesMap.put("FUND", fund);
			childNodesMap.put("PROGRAM", program);
			childNodesMap.put("CLASS_NO", classNo);
			childNodesMap.put("ACCOUNT_NO", accountNo);
			childNodesMap.put("AMOUNT", amount);
			childNodesMap.put("APPROVER_NAME", approverName);
			childNodesMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
			return childNodesMap;
		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		return null;
	}
}
