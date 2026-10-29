package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
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
		"process.label=CSUFTimebaseDB" })

public class CSUFTimebaseDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	private static final Logger log = LoggerFactory.getLogger(CSUFTimebaseDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_TIMEBASE_CHANGE_REQUEST";
		String formName = "Timebase Change Request Form";

		String emplID = "";
		String chrsId = "";
		String lastName = "";
		String firstName = "";
		String mppVal = "";
		String tempVal = "";
		String probVal = "";
		String permVal = "";
		String emplRcd = "";
		String dateInitiated = "";
		String classification = "";
		String cmsPositionNo = "";
		String dept = "";
		String deptID = "";
		String increase = "";
		String decrease = "";
		String fromHRSPerWK = "";
		String toHrsPerWK = "";
		String durationRB = "";
		String effectiveDate = "";
		String endDate = "";
		String extPrevDuties = "";
		String extendChangeThrough = "";
		String newChangeDuties = "";
		String other = "";
		String otherComments = "";
		String mppSupervisor = "";
		String mppDate = "";
		String mppComments = "";
		String hrDivCooSign = "";
		String hrDivCooDate = "";
		String hrDivCooComments = "";
		String humanResourceServices = "";
		String hrDate = "";
		String hrComments = "";
		String payrollSign = "";
		String payrollDate = "";
		String payrollComments = "";
		String adminSign ="";
		String adminDate ="";
		String adminComments ="";
		String effEmpStatus ="";

		String workflowInstanceID = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		workflowInstanceID = workItem.getWorkflow().getId();
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
							emplID = eElement.getElementsByTagName("EmplID").item(0).getTextContent();
							chrsId = eElement.getElementsByTagName("CHRSID").item(0).getTextContent();
							lastName = eElement.getElementsByTagName("LastName").item(0).getTextContent();
							firstName = eElement.getElementsByTagName("FirstName").item(0).getTextContent();

							mppVal = eElement.getElementsByTagName("MPP").item(0).getTextContent();
							tempVal = eElement.getElementsByTagName("Temp").item(0).getTextContent();
							probVal = eElement.getElementsByTagName("Prob").item(0).getTextContent();
							permVal = eElement.getElementsByTagName("Perm").item(0).getTextContent();

							emplRcd = eElement.getElementsByTagName("EmplRcd").item(0).getTextContent();
							dateInitiated = eElement.getElementsByTagName("DateInitiated").item(0).getTextContent();
							classification = eElement.getElementsByTagName("Classification").item(0).getTextContent();
							cmsPositionNo = eElement.getElementsByTagName("CMSPositionNo").item(0).getTextContent();
							dept = eElement.getElementsByTagName("Dept").item(0).getTextContent();
							deptID = eElement.getElementsByTagName("DeptID").item(0).getTextContent();
							increase = eElement.getElementsByTagName("Increase").item(0).getTextContent();
							decrease = eElement.getElementsByTagName("Decrease").item(0).getTextContent();
							fromHRSPerWK = eElement.getElementsByTagName("FromHRSPerWK").item(0).getTextContent();
							toHrsPerWK = eElement.getElementsByTagName("ToHrsPerWK").item(0).getTextContent();
							durationRB = eElement.getElementsByTagName("DurationRB").item(0).getTextContent();
							effectiveDate = eElement.getElementsByTagName("EffectiveDate").item(0).getTextContent();
							endDate = eElement.getElementsByTagName("EndDate").item(0).getTextContent();

							extPrevDuties = eElement.getElementsByTagName("ExtPrevDuties").item(0).getTextContent();
							extendChangeThrough = eElement.getElementsByTagName("ExtendChangeThrough").item(0)
									.getTextContent();
							newChangeDuties = eElement.getElementsByTagName("NewChangeDuties").item(0).getTextContent();
							other = eElement.getElementsByTagName("Other").item(0).getTextContent();
							otherComments = eElement.getElementsByTagName("OtherComments").item(0).getTextContent();

							mppSupervisor = eElement.getElementsByTagName("MPPSupervisor").item(0).getTextContent();
							mppDate = eElement.getElementsByTagName("MPPDate").item(0).getTextContent();
							mppComments = eElement.getElementsByTagName("MPPComments").item(0).getTextContent();

							hrDivCooSign = eElement.getElementsByTagName("HRDivCooSign").item(0).getTextContent();
							hrDivCooDate = eElement.getElementsByTagName("HRDivCooDate").item(0).getTextContent();
							hrDivCooComments = eElement.getElementsByTagName("HRDivCooComments").item(0)
									.getTextContent();

							humanResourceServices = eElement.getElementsByTagName("HumanResourceServices").item(0)
									.getTextContent();
							hrDate = eElement.getElementsByTagName("HRDate").item(0).getTextContent();
							hrComments = eElement.getElementsByTagName("HRComments").item(0).getTextContent();

							payrollSign = eElement.getElementsByTagName("PayrollSign").item(0).getTextContent();
							payrollDate = eElement.getElementsByTagName("PayrollDate").item(0).getTextContent();
							payrollComments = eElement.getElementsByTagName("PayrollComments").item(0).getTextContent();
							
							adminSign = eElement.getElementsByTagName("AppropriateAdministrator").item(0).getTextContent();
							adminDate = eElement.getElementsByTagName("AdminDate").item(0).getTextContent();
							adminComments = eElement.getElementsByTagName("AdminComments").item(0).getTextContent();
							effEmpStatus = eElement.getElementsByTagName("EffEmpStatus").item(0).getTextContent();

						}
					}

					dataMap = new LinkedHashMap<String, Object>();
					dataMap.put("EMPL_ID", emplID);
					dataMap.put("CHRS_ID", chrsId);
					dataMap.put("LAST_NAME", lastName);
					dataMap.put("FIRST_NAME", firstName);
					dataMap.put("MPP", mppVal);
					dataMap.put("TEMP", tempVal);
					dataMap.put("PROB", probVal);
					dataMap.put("PERM", permVal);
					dataMap.put("EMPL_RCD", emplRcd);
					Object dateInitiatedObj = null;
					if (dateInitiated != null && dateInitiated != "") {
						Date dateNew = Date.valueOf(dateInitiated);
						dateInitiatedObj = dateNew;
					}
					dataMap.put("DATE_INITIATED", dateInitiatedObj);

					dataMap.put("CLASSIFICATION", classification);
					dataMap.put("CMS_POSITION_NO", cmsPositionNo);
					dataMap.put("DEPT", dept);
					dataMap.put("DEPT_ID", deptID);
					dataMap.put("INCREASE", increase);
					dataMap.put("DECREASE", decrease);
					dataMap.put("FROM_HRS_PER_WK", fromHRSPerWK);
					dataMap.put("TO_HRS_PER_WK", toHrsPerWK);
					dataMap.put("DURATION", durationRB);

					Object effectiveDateObj = null;
					if (effectiveDate != null && effectiveDate != "") {
						Date effDateNew = Date.valueOf(effectiveDate);
						effectiveDateObj = effDateNew;
					}
					dataMap.put("EFFECTIVE_DATE", effectiveDateObj);
					Object endDateObj = null;
					if (endDate != null && endDate != "") {
						Date endDateNew = Date.valueOf(endDate);
						endDateObj = endDateNew;
					}
					dataMap.put("END_DATE", endDateObj);
					dataMap.put("EXTEND_PREV_DUTIES", extPrevDuties);
					dataMap.put("EXTEND_CHANGE_THROUGH", extendChangeThrough);
					dataMap.put("NEW_CHANGE_DUTIES", newChangeDuties);
					dataMap.put("OTHER", other);
					dataMap.put("OTHER_COMMENTS", otherComments);
					dataMap.put("SUPERVISOR_SIGN", mppSupervisor);
					Object mppDateObj = null;
					if (mppDate != null && mppDate != "") {
						Date mppDateNew = Date.valueOf(mppDate);
						mppDateObj = mppDateNew;
					}
					dataMap.put("SUPERVISOR_DATE", mppDateObj);
					dataMap.put("SUPERVISOR_COMMENTS", mppComments);

					dataMap.put("HR_DIV_COO_SIGN", hrDivCooSign);
					Object hrDivCooDateObj = null;
					if (hrDivCooDate != null && hrDivCooDate != "") {
						Date hrDivCooDateNew = Date.valueOf(hrDivCooDate);
						hrDivCooDateObj = hrDivCooDateNew;
					}
					dataMap.put("HR_DIV_COO_DATE", hrDivCooDateObj);
					dataMap.put("HR_DIV_COO_COMMENTS", hrDivCooComments);

					dataMap.put("HR_SIGN", humanResourceServices);
					Object hrDateeObj = null;
					if (hrDate != null && hrDate != "") {
						Date hrDateNew = Date.valueOf(hrDate);
						hrDateeObj = hrDateNew;
					}
					dataMap.put("HR_DATE", hrDateeObj);
					dataMap.put("HR_COMMENTS", hrComments);

					dataMap.put("PAYROLL_SIGN", payrollSign);
					Object payrollDateObj = null;
					if (payrollDate != null && payrollDate != "") {
						Date payrollDateNew = Date.valueOf(payrollDate);
						payrollDateObj = payrollDateNew;
					}
					dataMap.put("PAYROLL_DATE", payrollDateObj);
					dataMap.put("PAYROLL_COMMENTS", payrollComments);
					
					dataMap.put("ADMIN_SIGN", adminSign);
					Object adminDateObj = null;
					if (adminDate != null && adminDate != "") {
						Date adminDateNew = Date.valueOf(adminDate);
						adminDateObj = adminDateNew;
					}
					dataMap.put("ADMIN_DATE", adminDateObj);
					dataMap.put("ADMIN_COMMENTS", adminComments);
					dataMap.put("EFFECTIVE_EMP_STATUS", effEmpStatus);
					
					dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

				}

				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					dbUtil.insertFormData(conn, dataMap, tableName, formName);
				}

			} catch (Exception e) {
				log.error("Exception in CSUFTimebaseDB=" + Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.error("IOException in CSUFTimebaseDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error("SQLException in CSUFTimebaseDB Finally Block=" + Arrays.toString(e.getStackTrace()));
				}
			}

		}

	}

}
