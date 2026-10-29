package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.util.Arrays;
import java.util.LinkedHashMap;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang3.StringUtils;
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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=10 12 11 12 Pay Plan DB",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=CSUF10_12_11_12_PayPlanDB" })
public class CSUFPayPlan_10_12_11_12_DB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFPayPlan_10_12_11_12_DB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_10_12_11_12_PAY_PLAN";
		String formName = "10_12_11_12_PayPlan";
		String payPlanOption = "";
		String monthOff1Option = "";
		String monthOff2Option = "";

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		try {
			InputStream is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, workItem.getContentPath(), "Data.xml");
			if (null != is) {
				Document doc = XMLUtils.getDomDocument(is);

				LinkedHashMap<String, Object> dataMapEmpInfo = null;

				/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
				conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

				String workflowInstanceID = workItem.getWorkflow().getId();
					Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");

					if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
						String empl_ID = XMLUtils.getChildNodeContent(afBoundDataElement, "empl_ID");
						String chrs_ID = XMLUtils.getChildNodeContent(afBoundDataElement, "CHRSID");
						String first_Name = XMLUtils.getChildNodeContent(afBoundDataElement, "first_Name");
						String last_Name = XMLUtils.getChildNodeContent(afBoundDataElement, "last_Name");
						String empl_RCD = XMLUtils.getChildNodeContent(afBoundDataElement, "empl_RCD");
						String extension = XMLUtils.getChildNodeContent(afBoundDataElement, "extension");
						String scoPositionNumber = XMLUtils.getChildNodeContent(afBoundDataElement,
								"scoPositionNumber");
						String timebase = XMLUtils.getChildNodeContent(afBoundDataElement, "timebase");
						String statusMenu = XMLUtils.getChildNodeContent(afBoundDataElement, "statusMenu");
						int statusMenuItems = Integer.parseInt(statusMenu);
						String statusMenuOption = "";
						if (statusMenuItems == 1) {
							statusMenuOption = "Permanent";
						} else if (statusMenuItems == 2) {
							statusMenuOption = "Probationary";
						} else if (statusMenuItems == 3) {
							statusMenuOption = "MPP";
						} else if (statusMenuItems == 4) {
							statusMenuOption = "Temporary";
						}

						String cbid = XMLUtils.getChildNodeContent(afBoundDataElement, "cbid");
						String classification = XMLUtils.getChildNodeContent(afBoundDataElement, "classification");
						String grade = XMLUtils.getChildNodeContent(afBoundDataElement, "grade");
						String cmsPositionNumber = XMLUtils.getChildNodeContent(afBoundDataElement,
								"cmsPositionNumber");
						String departmentName = XMLUtils.getChildNodeContent(afBoundDataElement, "departmentName");
						String departmentID = XMLUtils.getChildNodeContent(afBoundDataElement, "departmentID");
						String payPlanCHK = XMLUtils.getChildNodeContent(afBoundDataElement, "payPlanCHK");

						if (payPlanCHK != null && !payPlanCHK.isEmpty()) {
							int payPlanItems = Integer.parseInt(payPlanCHK);
							if (payPlanItems == 1) {
								payPlanOption = "New";
							} else if (payPlanItems == 2) {
								payPlanOption = "Cancel";
							}
						}

						String effectiveDate = XMLUtils.getChildNodeContent(afBoundDataElement, "effectiveDate");
						String work11 = XMLUtils.getChildNodeContent(afBoundDataElement, "work11CHK");
						String work10 = XMLUtils.getChildNodeContent(afBoundDataElement, "work10CHK");
						String work5 = XMLUtils.getChildNodeContent(afBoundDataElement, "work5CHK");
						String variation = XMLUtils.getChildNodeContent(afBoundDataElement, "variationCHK");
						String variationField = XMLUtils.getChildNodeContent(afBoundDataElement, "variationField");
						String monthOff1 = XMLUtils.getChildNodeContent(afBoundDataElement, "monthOff1");
						if (monthOff1 != null && !monthOff1.isEmpty()) {

							int monthOff1Items = Integer.parseInt(monthOff1);
							monthOff1Option = CSUFUtils.getMonthOfYear(monthOff1Items);
						}

						String monthOff2 = XMLUtils.getChildNodeContent(afBoundDataElement, "monthOff2");

						if (monthOff2 != null && !monthOff2.isEmpty()) {
							int monthOff2Items = Integer.parseInt(monthOff2);
							monthOff2Option = CSUFUtils.getMonthOfYear(monthOff2Items);
						}

						String onCycle = XMLUtils.getChildNodeContent(afBoundDataElement, "onCycle");
						String offCycle = XMLUtils.getChildNodeContent(afBoundDataElement, "offCycle");
						String currentMonthlySalary = XMLUtils.getChildNodeContent(afBoundDataElement,
								"currentMonthlySalary");
						String adjustedSalary = XMLUtils.getChildNodeContent(afBoundDataElement, "adjustedSalary");
						String dateDiscussed = XMLUtils.getChildNodeContent(afBoundDataElement, "dateDiscussed");
						String payPlan10 = XMLUtils.getChildNodeContent(afBoundDataElement, "payPlan10");
						String payPlan11 = XMLUtils.getChildNodeContent(afBoundDataElement, "payPlan11");
						String startDate = XMLUtils.getChildNodeContent(afBoundDataElement, "startDate");
						String monthSal = XMLUtils.getChildNodeContent(afBoundDataElement, "monthSal");
						String daystowork = XMLUtils.getChildNodeContent(afBoundDataElement, "daystowork");
						String annualSalary = XMLUtils.getChildNodeContent(afBoundDataElement, "annualSalary");
						String possibleworkdays = XMLUtils.getChildNodeContent(afBoundDataElement, "possibleworkdays");
						String monthSal1 = XMLUtils.getChildNodeContent(afBoundDataElement, "monthSal1");
						String monthstowork = XMLUtils.getChildNodeContent(afBoundDataElement, "monthstowork");
						String projectedEarnedSalary = XMLUtils.getChildNodeContent(afBoundDataElement,
								"projectedEarnedSalary");
						String annualSalary1 = XMLUtils.getChildNodeContent(afBoundDataElement, "annualSalary1");
						String projectedEarnedSalary1 = XMLUtils.getChildNodeContent(afBoundDataElement,
								"projectedEarnedSalary1");
						String settlementAmount = XMLUtils.getChildNodeContent(afBoundDataElement, "settlementAmount");
						String firstMonthOff = XMLUtils.getChildNodeContent(afBoundDataElement, "firstMonthOff");
						String secondMonthOff = XMLUtils.getChildNodeContent(afBoundDataElement, "secondMonthOff");

						String employeeSignature = XMLUtils.getChildNodeContent(afBoundDataElement,
								"employeeSignature");
						String empDate = XMLUtils.getChildNodeContent(afBoundDataElement, "empDate");

						String managerApprovalRB = XMLUtils.getChildNodeContent(afBoundDataElement,
								"managerApprovalRB");
						String managerSignature = XMLUtils.getChildNodeContent(afBoundDataElement, "managerSignature");
						String managerSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "managerSignDate");
						String managerComments = XMLUtils.getChildNodeContent(afBoundDataElement, "managerComments");

						String hrSignature = XMLUtils.getChildNodeContent(afBoundDataElement, "hrSignature");
						String hrSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "hrSignDate");
						String hrComments = XMLUtils.getChildNodeContent(afBoundDataElement, "hrComments");

						dataMapEmpInfo = new LinkedHashMap<String, Object>();
						dataMapEmpInfo.put("EMPL_ID", empl_ID);
						dataMapEmpInfo.put("CHRS_ID", chrs_ID);
						dataMapEmpInfo.put("FIRST_NAME", first_Name);
						dataMapEmpInfo.put("LAST_NAME", last_Name);
						dataMapEmpInfo.put("EMPL_RCD", empl_RCD);
						dataMapEmpInfo.put("EXTENSION", extension);
						dataMapEmpInfo.put("SCOPOSITIONNUMBER", scoPositionNumber);
						dataMapEmpInfo.put("TIME_BASE", timebase);
						dataMapEmpInfo.put("STATUS_MENU", statusMenuOption);
						dataMapEmpInfo.put("CBID", cbid);
						dataMapEmpInfo.put("CLASSIFICATION", classification);
						dataMapEmpInfo.put("GRADE", grade);
						dataMapEmpInfo.put("CMS_POSITION_NUMBER", cmsPositionNumber);
						dataMapEmpInfo.put("DEPARTMENT_NAME", departmentName);
						dataMapEmpInfo.put("DEPARTMENT_ID", departmentID);
						dataMapEmpInfo.put("PAY_PLAN_CHK", payPlanOption);

						Object effectiveDateObj = null;
						if (effectiveDate != null && effectiveDate != "") {
							Date effectiveDateNew = Date.valueOf(effectiveDate);
							effectiveDateObj = effectiveDateNew;
						}
						dataMapEmpInfo.put("EFFECTIVE_DATE", effectiveDateObj);

						dataMapEmpInfo.put("WORK11_CHK", work11);
						dataMapEmpInfo.put("WORK10_CHK", work10);
						dataMapEmpInfo.put("WORK5_CHK", work5);
						dataMapEmpInfo.put("VARIATION_CHK", variation);
						dataMapEmpInfo.put("VARIATION", variationField);
						dataMapEmpInfo.put("MONTH_OFF1", monthOff1Option);
						dataMapEmpInfo.put("MONTH_OFF2", monthOff2Option);
						dataMapEmpInfo.put("ON_CYCLE", onCycle);
						dataMapEmpInfo.put("OFF_CYCLE", offCycle);
						dataMapEmpInfo.put("CURRENT_MONTHLY_SALARY", currentMonthlySalary);
						dataMapEmpInfo.put("ADJUSTED_SALARY", adjustedSalary);

						Object dateDiscussedObj = null;
						if (dateDiscussed != null && dateDiscussed != "") {
							Date dateDiscussedNew = Date.valueOf(dateDiscussed);
							dateDiscussedObj = dateDiscussedNew;
						}
						dataMapEmpInfo.put("DATE_DISCUSSED", dateDiscussedObj);

						dataMapEmpInfo.put("PAY_PLAN10", payPlan10);
						dataMapEmpInfo.put("PAY_PLAN11", payPlan11);

						Object startDateObj = null;
						if (startDate != null && startDate != "") {
							Date startDateNew = Date.valueOf(startDate);
							startDateObj = startDateNew;
						}
						dataMapEmpInfo.put("START_DATE", startDateObj);

						dataMapEmpInfo.put("MONTH_SAL", monthSal);
						dataMapEmpInfo.put("DAYS_TO_WORK", daystowork);
						dataMapEmpInfo.put("ANNUAL_SALARY", annualSalary);
						dataMapEmpInfo.put("POSSIBLE_WORK_DAYS", possibleworkdays);
						dataMapEmpInfo.put("MONTH_SAL1", monthSal1);
						dataMapEmpInfo.put("MONTHS_TO_WORK", monthstowork);
						dataMapEmpInfo.put("PROJECTED_EARNED_SALARY", projectedEarnedSalary);
						dataMapEmpInfo.put("ANNUAL_SALARY1", annualSalary1);
						dataMapEmpInfo.put("PROJECTED_EARNED_SALARY1", projectedEarnedSalary1);
						dataMapEmpInfo.put("SETTLEMENT_AMOUNT", settlementAmount);
						dataMapEmpInfo.put("FIRST_MONTH_OFF", firstMonthOff);
						dataMapEmpInfo.put("SECOND_MONTH_OFF", secondMonthOff);

						dataMapEmpInfo.put("EMPLOYEE_SIGNATURE", employeeSignature);

						Object empDateObj = null;
						if (empDate != null && empDate != "") {
							Date empDateNew = Date.valueOf(empDate);
							empDateObj = empDateNew;
						}
						dataMapEmpInfo.put("EMP_DATE", empDateObj);

						dataMapEmpInfo.put("MANAGER_APPROVAL", managerApprovalRB);
						dataMapEmpInfo.put("MANAGER_SIGNATURE", managerSignature);

						Object managerSignDateObj = null;
						if (managerSignDate != null && managerSignDate != "") {
							Date managerSignDateNew = Date.valueOf(managerSignDate);
							managerSignDateObj = managerSignDateNew;
						}
						dataMapEmpInfo.put("MANAGER_DATE", managerSignDateObj);
						dataMapEmpInfo.put("MANAGER_COMMENT", managerComments);

						dataMapEmpInfo.put("HR_SIGNATURE", hrSignature);

						Object hrSignDateObj = null;
						if (hrSignDate != null && hrSignDate != "") {
							Date hrSignDateNew = Date.valueOf(hrSignDate);
							hrSignDateObj = hrSignDateNew;
						}
						dataMapEmpInfo.put("HR_DATE", hrSignDateObj);
						dataMapEmpInfo.put("HR_COMMENT", hrComments);
						dataMapEmpInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

						try {
							CloudDbSaveUtil.saveFormData(tableName, formName, workflowInstanceID,
									"WORKFLOW_INSTANCE_ID", workflowInstanceID, dataMapEmpInfo,
									"EFFECTIVE_DATE,DATE_DISCUSSED,START_DATE,EMP_DATE,MANAGER_DATE,HR_DATE");
						} catch (IOException ioException) {
							ioException.printStackTrace();
						}
					}
			}
		} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			log.error("ParserConfigurationException From CSUFPayPlan_10_12_11_12_DB Class"
					+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
		}
	}
}
