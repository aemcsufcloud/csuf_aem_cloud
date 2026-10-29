package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
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
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Manual CD DB", Constants.SERVICE_VENDOR + "=ThoughtFocus",
		"process.label" + "=ManualCDDB" })
public class ManualCDDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(ManualCDDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName1 = "AEM_MANUAL_CD048_FORM_DATA";
		String tableName2 = "AEM_MANUAL_CD048_TABLE_DATA";
		String formName = "Manual CD048 Form";

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		// String payloadPath = workItem.getWorkflowData().getPayload().toString();
		try {
			InputStream is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, workItem.getContentPath(), "Data.xml");
			if (null != is) {
				Document doc = XMLUtils.getDomDocument(is);

				DatabaseUtils dbUtil = new DatabaseUtils();

				LinkedHashMap<String, Object> dataMapEmpInfo1 = null;
				LinkedHashMap<String, Object> dataMapEmpInfo2 = null;

				/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
				conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
				/*if (conn != null) {*/

					String workflowInstanceID = workItem.getWorkflow().getId();
					Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");

					if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
						String departmentId = XMLUtils.getChildNodeContent(afBoundDataElement, "DepartmentID");
						String agencyVal = XMLUtils.getChildNodeContent(afBoundDataElement, "Agency");
						String unitVal = XMLUtils.getChildNodeContent(afBoundDataElement, "Unit");
						String monthVal = XMLUtils.getChildNodeContent(afBoundDataElement, "Month");
						String yearVal = XMLUtils.getChildNodeContent(afBoundDataElement, "Year");
						String batchSession = XMLUtils.getChildNodeContent(afBoundDataElement, "Cell25");
						String totalHours = XMLUtils.getChildNodeContent(afBoundDataElement, "TotalHours");
						String totalGross = XMLUtils.getChildNodeContent(afBoundDataElement, "TotalGross");

						String authCB = XMLUtils.getChildNodeContent(afBoundDataElement, "ApprovingOfficialCB");
						String authSign = XMLUtils.getChildNodeContent(afBoundDataElement,
								"AuthorizedSignatureOfCertificate");
						String authExt = XMLUtils.getChildNodeContent(afBoundDataElement, "CertificateSignaturePhone");
						String authDate = XMLUtils.getChildNodeContent(afBoundDataElement, "CertificateSignatureDate");

						String managerCB = XMLUtils.getChildNodeContent(afBoundDataElement, "PayRollCB");
						String managerSign = XMLUtils.getChildNodeContent(afBoundDataElement,
								"OtherSignatureForCampus");
						String managerDate = XMLUtils.getChildNodeContent(afBoundDataElement, "OtherSignatureDate");
						String managerExt = XMLUtils.getChildNodeContent(afBoundDataElement, "OtherSignaturePhone");
						String managerComment = XMLUtils.getChildNodeContent(afBoundDataElement, "OtherComments");

						dataMapEmpInfo1 = new LinkedHashMap<String, Object>();
						dataMapEmpInfo1.put("DEPT_ID", departmentId);
						dataMapEmpInfo1.put("AGENCY", agencyVal);
						dataMapEmpInfo1.put("UNIT", unitVal);
						dataMapEmpInfo1.put("MONTH", monthVal);
						dataMapEmpInfo1.put("BATCH_SESSION", batchSession);
						dataMapEmpInfo1.put("YEAR", yearVal);
						dataMapEmpInfo1.put("TOTAL_GROSS", totalGross);
						dataMapEmpInfo1.put("TOTAL_HOURS", totalHours);

						dataMapEmpInfo1.put("AUTH_CB", authCB);
						dataMapEmpInfo1.put("AUTH_SIGN", authSign);
						dataMapEmpInfo1.put("AUTH_EXT", authExt);
						Object authDateObj = null;
						if (authDate != null && authDate != "") {
							Date authDateNew = Date.valueOf(authDate);
							authDateObj = authDateNew;
						}
						dataMapEmpInfo1.put("AUTH_DATE", authDateObj);

						dataMapEmpInfo1.put("PAYROLL_CB", managerCB);
						dataMapEmpInfo1.put("PAYROLL_SIGN", managerSign);
						dataMapEmpInfo1.put("PAYROLL_EXT", managerExt);
						Object managerDateObj = null;
						if (managerDate != null && managerDate != "") {
							Date managerDateNew = Date.valueOf(managerDate);
							managerDateObj = managerDateNew;
						}
						dataMapEmpInfo1.put("PAYROLL_DATE", managerDateObj);
						dataMapEmpInfo1.put("PAYROLL_COMMENTS", managerComment);

						dataMapEmpInfo1.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

						long id = System.currentTimeMillis();
						dataMapEmpInfo1.put("TABLE_DATA_ID", String.valueOf(id));

						for (int k = 1; k <= 18; k++) {
							String indexVal = String.valueOf(k);

							String empId = XMLUtils.getChildNodeContent(afBoundDataElement, "emplId".concat(indexVal));
							if (StringUtils.isNotBlank(empId)) {
								String empRec = XMLUtils.getChildNodeContent(afBoundDataElement,
										"emplRcd".concat(indexVal));
								String SSNVal = XMLUtils.getChildNodeContent(afBoundDataElement,
										"ssn".concat(indexVal));
								String initials = XMLUtils.getChildNodeContent(afBoundDataElement,
										"initials".concat(indexVal));
								String lastName = XMLUtils.getChildNodeContent(afBoundDataElement,
										"lastName".concat(indexVal));
								String classNo = XMLUtils.getChildNodeContent(afBoundDataElement,
										"jobCode".concat(indexVal));
								String serial = XMLUtils.getChildNodeContent(afBoundDataElement,
										"serials".concat(indexVal));
								String hours = XMLUtils.getChildNodeContent(afBoundDataElement,
										"hours".concat(indexVal));
								String decimalHours = XMLUtils.getChildNodeContent(afBoundDataElement,
										"minutes".concat(indexVal));
								String payrollOfRate = XMLUtils.getChildNodeContent(afBoundDataElement,
										"salary".concat(indexVal));
								String payrollGross = XMLUtils.getChildNodeContent(afBoundDataElement,
										"grossAmount".concat(indexVal));

								dataMapEmpInfo2 = new LinkedHashMap<String, Object>();
								dataMapEmpInfo2.put("ID", String.valueOf(id));
								dataMapEmpInfo2.put("ROW_ID", "Row".concat(indexVal));
								dataMapEmpInfo2.put("EMPID", empId);
								dataMapEmpInfo2.put("EMPREC", empRec);
								dataMapEmpInfo2.put("SSN", SSNVal);
								dataMapEmpInfo2.put("INITIALS", initials);
								dataMapEmpInfo2.put("LASTNAME", lastName);
								dataMapEmpInfo2.put("CLASS", classNo);
								dataMapEmpInfo2.put("SERIAL", serial);
								dataMapEmpInfo2.put("HOURS", hours);
								dataMapEmpInfo2.put("FRACTION_HOURS", decimalHours);
								dataMapEmpInfo2.put("SALARY_RATE", payrollOfRate);
								dataMapEmpInfo2.put("SALARY_GROSS", payrollGross);

								/*dbUtil.insertFormData(conn, dataMapEmpInfo2, tableName2, formName);*/
								try {
									CloudDbSaveUtil.saveFormData(tableName2, formName, "", "", workflowInstanceID,
											dataMapEmpInfo2, "");
								} catch (IOException ioException) {
									ioException.printStackTrace();
								}
							}
						}
						/*dbUtil.insertFormData(conn, dataMapEmpInfo1, tableName1, formName);*/
						try {
							CloudDbSaveUtil.saveFormData(tableName1, formName, workflowInstanceID,
									"WORKFLOW_INSTANCE_ID", workflowInstanceID, dataMapEmpInfo1,
									"AUTH_DATE,PAYROLL_DATE");
						} catch (IOException ioException) {
							ioException.printStackTrace();
						}
					}
				/*}*/
			}
		} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			log.error(Arrays.toString(e.getStackTrace()));
		} finally {
			/*if (conn != null) { try { conn.close(); } catch (SQLException e) { } }*/
		}
	}
}
