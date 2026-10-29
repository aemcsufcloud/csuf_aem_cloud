package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=CSUF Sample DB", "service.vendor=ThoughtFocus",
		"process.label=CSUFConfirmationTicketDB" })

public class CSUFConfirmationTicketDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	private static final Logger log = LoggerFactory.getLogger(CSUFConfirmationTicketDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_CONFIRMATION_TICKET";
		String formName = "Confirmation Ticket";
		String url = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";
		LinkedHashMap<String, Object> dataMap = null;
		String fwsAllocation = "";
		String awardYear = "";
		String posNo = "";
		String officeCont = "";
		String supName = "";
		String cwid = "";
		String emplRcd = "";
		String effectiveDate = "";
		String currentDate = "";
		String appointmentEndDate = "";
		String lastName = "";
		String middleName = "";
		String firstName = "";
		String action = "";
		String actionReason = "";
		String departmentCode = "";
		String department = "";
		String cmsPositionNumber = "";
		String agency = "";
		String reportingUnit = "";
		String classCode = "";
		String serialNumber = "";
		String jobTitle = "";
		String compensationRate = "";
		String authDeptSign = "";
		String authDeptName = "";
		String authDeptDate = "";
		String authDeptComments = "";
		String authDeptCB = "";
		String financialDeptCB = "";
		String financeDeptSign = "";
		String financeDeptName = "";
		String financialDate = "";
		String financialComments = "";
		String payrollDeptCB = "";
		String payrollDeptSign = "";
		String payrollDeptName = "";
		String payrollDate = "";
		String payrollComments = "";
		String wfInstanceID = workItem.getWorkflow().getId();
		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
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
							org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;

							fwsAllocation = eElement.getElementsByTagName("FWSAllocation").item(0).getTextContent();

							awardYear = eElement.getElementsByTagName("AwardYear").item(0).getTextContent();
							posNo = eElement.getElementsByTagName("PositionNo").item(0).getTextContent();
							officeCont = eElement.getElementsByTagName("OfficeContact").item(0).getTextContent();
							supName = eElement.getElementsByTagName("SupervisorName").item(0).getTextContent();
							cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
							emplRcd = eElement.getElementsByTagName("EmplRcd").item(0).getTextContent();
							effectiveDate = eElement.getElementsByTagName("EffectiveDate").item(0).getTextContent();
							currentDate = eElement.getElementsByTagName("CurrentDate").item(0).getTextContent();
							appointmentEndDate = eElement.getElementsByTagName("AppointmentEndDate").item(0)
									.getTextContent();
							lastName = eElement.getElementsByTagName("LastName").item(0).getTextContent();
							middleName = eElement.getElementsByTagName("MiddleName").item(0).getTextContent();
							firstName = eElement.getElementsByTagName("FirstName").item(0).getTextContent();
							action = eElement.getElementsByTagName("Action").item(0).getTextContent();
							actionReason = eElement.getElementsByTagName("ActionReason").item(0).getTextContent();
							departmentCode = eElement.getElementsByTagName("DepartmentCode").item(0).getTextContent();
							department = eElement.getElementsByTagName("Department").item(0).getTextContent();
							cmsPositionNumber = eElement.getElementsByTagName("CMSPositionNumber").item(0)
									.getTextContent();
							agency = eElement.getElementsByTagName("Agency").item(0).getTextContent();
							reportingUnit = eElement.getElementsByTagName("ReportingUnit").item(0).getTextContent();
							classCode = eElement.getElementsByTagName("ClassCode").item(0).getTextContent();
							serialNumber = eElement.getElementsByTagName("SerialNumber").item(0).getTextContent();
							jobTitle = eElement.getElementsByTagName("JobTitle").item(0).getTextContent();
							compensationRate = eElement.getElementsByTagName("CompensationRate").item(0)
									.getTextContent();
							authDeptSign = eElement.getElementsByTagName("AuthDeptSign").item(0).getTextContent();
							authDeptName = eElement.getElementsByTagName("AuthDeptName").item(0).getTextContent();
							authDeptDate = eElement.getElementsByTagName("AuthDeptDate").item(0).getTextContent();
							authDeptComments = eElement.getElementsByTagName("AuthDeptComments").item(0)
									.getTextContent();
							authDeptCB = eElement.getElementsByTagName("AuthDeptCB").item(0).getTextContent();
							financialDeptCB = eElement.getElementsByTagName("FinancialDeptCB").item(0).getTextContent();
							financeDeptSign = eElement.getElementsByTagName("FinanceDeptSign").item(0).getTextContent();
							financeDeptName = eElement.getElementsByTagName("FinanceDeptName").item(0).getTextContent();
							financialDate = eElement.getElementsByTagName("FinancialDate").item(0).getTextContent();
							financialComments = eElement.getElementsByTagName("FinancialComments").item(0)
									.getTextContent();
							payrollDeptCB = eElement.getElementsByTagName("PayrollDeptCB").item(0).getTextContent();
							payrollDeptSign = eElement.getElementsByTagName("PayrollDeptSign").item(0).getTextContent();

							payrollDeptName = eElement.getElementsByTagName("PayrollDeptName").item(0).getTextContent();

							payrollDate = eElement.getElementsByTagName("PayrollDate").item(0).getTextContent();

							payrollComments = eElement.getElementsByTagName("PayrollComments").item(0).getTextContent();

						}
					}

					dataMap = new LinkedHashMap<String, Object>();
					dataMap.put("CWID", cwid);
					dataMap.put("FWS_ALLOCATION", fwsAllocation);
					dataMap.put("AWARD_YEAR", awardYear);
					dataMap.put("POSITION_NUMBER", posNo);
					dataMap.put("OFFICE_CONTACT", officeCont);
					dataMap.put("SUPERVISOR_NAME", supName);
					dataMap.put("EMPL_RCD", emplRcd);
					Object effectiveDateObj = null;
					if (effectiveDate != null && effectiveDate != "") {
						Date effectiveDateNew = Date.valueOf(effectiveDate);
						effectiveDateObj = effectiveDateNew;
					}
					dataMap.put("EFFECTIVE_DATE", effectiveDateObj);
					Object currentDateObj = null;
					if (currentDate != null && currentDate != "") {
						Date currentDateNew = Date.valueOf(currentDate);
						currentDateObj = currentDateNew;
					}
					dataMap.put("CURRENT_DATE", currentDateObj);

					Object appointmentEndDateObj = null;
					if (appointmentEndDate != null && appointmentEndDate != "") {
						Date appointmentEndDateNew = Date
								.valueOf(appointmentEndDate);
						appointmentEndDateObj = appointmentEndDateNew;
					}
					
					dataMap.put("APPOINTMENT_END_DATE", appointmentEndDateObj);
					dataMap.put("LAST_NAME", lastName);
					dataMap.put("MIDDLE_NAME", middleName);
					dataMap.put("FIRST_NAME", firstName);
					dataMap.put("ACTION", action);
					dataMap.put("ACTION_REASON", actionReason);
					dataMap.put("DEPARTMENT_CODE", departmentCode);
					dataMap.put("DEPARTMENT", department);
					dataMap.put("CMSPOSITION_NUMBER", cmsPositionNumber);
					dataMap.put("AGENCY", agency);
					dataMap.put("REPORTING_UNIT", reportingUnit);
					dataMap.put("CLASS_CODE", classCode);
					dataMap.put("SERIAL_NUMBER", serialNumber);
					dataMap.put("JOB_TITLE", jobTitle);
					dataMap.put("COMPENSATION_RATE", compensationRate);
					dataMap.put("AUTH_DEPT_SIGN", authDeptSign);
					dataMap.put("AUTH_DEPT_NAME", authDeptName);
					dataMap.put("AUTH_DEPT_COMMENTS", authDeptComments);
					dataMap.put("AUTH_DEPT_CB", authDeptCB);
					Object authDeptDateObj = null;
					if (authDeptDate != null && authDeptDate != "") {
						Date authDeptDateNew = Date.valueOf(authDeptDate);
						authDeptDateObj = authDeptDateNew;
					}
					dataMap.put("AUTH_DEPT_DATE", authDeptDateObj);

					dataMap.put("FINANCE_DEPT_SIGN", financeDeptSign);
					dataMap.put("FINANCE_DEPT_NAME", financeDeptName);
					dataMap.put("FINANCIAL_COMMENTS", financialComments);
					dataMap.put("FINANCIAL_DEPT_CB", financialDeptCB);
					Object financialDateObj = null;
					if (financialDate != null && financialDate != "") {
						Date financialDateNew = Date.valueOf(financialDate);
						financialDateObj = financialDateNew;
					}
					dataMap.put("FINANCIAL_DATE", financialDateObj);

					dataMap.put("PAYROLL_DEPT_SIGN", payrollDeptSign);
					dataMap.put("PAYROLL_DEPT_NAME", payrollDeptName);
					dataMap.put("PAYROLL_COMMENTS", payrollComments);
					dataMap.put("PAYROLL_DEPT_CB", payrollDeptCB);
					Object payrollDateObj = null;
					if (payrollDate != null && payrollDate != "") {
						Date payrollDateNew = Date.valueOf(payrollDate);
						payrollDateObj = payrollDateNew;
					}
					dataMap.put("PAYROLL_DATE", payrollDateObj);
					dataMap.put("WORKFLOW_INSTANCE_ID", wfInstanceID);
				}

				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					dbUtil.insertFormData(conn, dataMap, tableName, formName);
				}*/
				
				JSONObject json = new JSONObject();
				json.put("DB_CONNECTION", "AEMDBDEV");
				json.put("TABLE_NAME", tableName);
				json.put("FORM_NAME", formName);
				json.put("UNIQUE_FIELD", cwid);
				json.put("UNIQUE_FIELD_COLUMN", "CWID");
				json.put("WORKFLOW_INSTANCE_ID", wfInstanceID);
				json.put("DATA_MAP", dataMap);
				json.put("DATE_FIELDS", "EFFECTIVE_DATE,CURRENT_DATE,AUTH_DEPT_DATE,FINANCIAL_DATE,PAYROLL_DATE");

				log.error("Testing: =" + json.toString());

				String dbServiceUrl = url;

				CloseableHttpClient client = HttpClients.createDefault();
				HttpPost post = new HttpPost(dbServiceUrl);
				post.addHeader("Content-Type", "application/json");
				post.setEntity(new StringEntity(json.toString()));

				CloseableHttpResponse response = client.execute(post);
				log.info("DB Service Response: =" + response.getStatusLine());
				client.close();

			} catch (Exception e) {
				log.error(Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}

		}

	}

}
