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
import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.DatabaseUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=CSUF Hourly INT Timesheet DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=CSUFSpecialConsultantTimesheetDB" })
public class CSUFSpecialConsultantTimesheetDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFSpecialConsultantTimesheetDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		DatabaseUtils dbUtil = new DatabaseUtils();
		Document doc = null;
		InputStream is = null;
		String workflowInstanceID = "";
		String empId = "";
		String chrsId = "";
		String yearSelected = "";
		String monthSelected = "";
		String empRCD = "";
		String empFname = "";
		String empLname = "";
		String midInitial = "";
		String ssn = "";
		String unit = "";
		String empClass = "";
		String deptId = "";
		String deptName = "";
		String empEmail = "";
		String dayOfWk = "";
		String dateOfMonth = "";
		String wrkHrs = "";
		String totalWrkHrs = "";
		String empCB = "";
		String empSign = "";
		String empSignDate = "";
		String empComment = "";
		String authApproverCB = "";
		String authApproverSign = "";
		String authApproverDate = "";
		String authApproverComment = "";
		String supCB = "";
		String supSign = "";
		String supSignDate = "";
		String supComment = "";
		String supEmail = "";
		String payRollCB = "";
		String payrollComment = "";
		String payrollSign = "";
		String datePayrollSign = "";
		LinkedHashMap<String, Object> dataMapEmpInfo = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		// conn = jdbcConnectionService.getAemDEVDBConnection();

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		log.info("DataSourceVal==========" + dataSourceVal);
		conn = jdbcConnectionService.getDBConn(dataSourceVal);
		log.info("Connection==========" + conn);

		if (conn != null) {
			while (xmlFiles.hasNext()) {
				workflowInstanceID = workItem.getWorkflow().getId();
				Resource attachmentXml = xmlFiles.next();
				String filePath = attachmentXml.getPath();

				log.info("filePath= " + filePath);
				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					log.info("xmlFiles=" + filePath);
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
					} catch (ValueFormatException e2) {
						log.error("Exception1=" + e2.getMessage());
						e2.printStackTrace();
					} catch (PathNotFoundException e2) {
						log.error("Exception2=" + e2.getMessage());
						e2.printStackTrace();
					} catch (RepositoryException e2) {
						log.error("Exception3=" + e2.getMessage());
						e2.printStackTrace();
					}
					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.info("ParserConfigurationException=" + e1);
							e1.printStackTrace();
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.info("IOException=" + e1);
							e1.printStackTrace();
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;

								empId = eElement.getElementsByTagName("Empl_ID").item(0).getTextContent();
								log.info("Empl ID=" + empId);
								
								chrsId = eElement.getElementsByTagName("CHRSID").item(0).getTextContent();
								log.info("CHRSID=" + chrsId);

								yearSelected = eElement.getElementsByTagName("YearSelected").item(0).getTextContent();

								empRCD = eElement.getElementsByTagName("Empl_RCD").item(0).getTextContent();

								empFname = eElement.getElementsByTagName("First_Name").item(0).getTextContent();

								empLname = eElement.getElementsByTagName("Last_Name").item(0).getTextContent();
								midInitial = eElement.getElementsByTagName("Middle_Initial").item(0).getTextContent();

								ssn = eElement.getElementsByTagName("SSN1").item(0).getTextContent();

								unit = eElement.getElementsByTagName("Unit").item(0).getTextContent();

								empClass = eElement.getElementsByTagName("Class").item(0).getTextContent();
								deptId = eElement.getElementsByTagName("Dept_ID").item(0).getTextContent();
								deptName = eElement.getElementsByTagName("Department_Name").item(0).getTextContent();

								empEmail = eElement.getElementsByTagName("EmpEmail").item(0).getTextContent();
								totalWrkHrs = eElement.getElementsByTagName("TotalWorkHours").item(0).getTextContent();
								empCB = eElement.getElementsByTagName("EmpCB").item(0).getTextContent();
								empSign = eElement.getElementsByTagName("EmpSign").item(0).getTextContent();

								empSignDate = eElement.getElementsByTagName("DateEmpSign").item(0).getTextContent();
								empComment = eElement.getElementsByTagName("EmpComments").item(0).getTextContent();
								authApproverCB = eElement.getElementsByTagName("TimekeeperCB").item(0).getTextContent();
								authApproverSign = eElement.getElementsByTagName("TimekeeperSign").item(0)
										.getTextContent();
								authApproverDate = eElement.getElementsByTagName("DateTimekeeperSign").item(0)
										.getTextContent();
								authApproverComment = eElement.getElementsByTagName("TimekeeperComments").item(0)
										.getTextContent();
								supCB = eElement.getElementsByTagName("SupervisorCB").item(0).getTextContent();
								supSign = eElement.getElementsByTagName("SupSign").item(0).getTextContent();

								supSignDate = eElement.getElementsByTagName("DateSupSign").item(0).getTextContent();
								supComment = eElement.getElementsByTagName("SupervisorComments").item(0)
										.getTextContent();
								supEmail = eElement.getElementsByTagName("SupEmail").item(0).getTextContent();
								payRollCB = eElement.getElementsByTagName("PayrollCB").item(0).getTextContent();
								payrollSign = eElement.getElementsByTagName("PayrollSign").item(0).getTextContent();
								datePayrollSign = eElement.getElementsByTagName("DatePayrollSign").item(0)
										.getTextContent();
								payrollComment = eElement.getElementsByTagName("PayrollComments").item(0)
										.getTextContent();
								String monthVal = eElement.getElementsByTagName("MonthSelected").item(0)
										.getTextContent();
								String[] monthList = { "January", "February", "March", "April", "May", "June", "July",
										"August", "September", "October", "November", "December" };
								monthSelected = monthList[(Integer.parseInt(monthVal) - 1)];
								dataMapEmpInfo = new LinkedHashMap<String, Object>();
								dataMapEmpInfo.put("EMPID", empId);
								dataMapEmpInfo.put("CHRSID", chrsId);
								dataMapEmpInfo.put("YEAR", yearSelected);
								dataMapEmpInfo.put("MONTH", monthSelected);
								dataMapEmpInfo.put("EMPRCD", empRCD);
								dataMapEmpInfo.put("FIRST_NAME", empFname);
								dataMapEmpInfo.put("LAST_NAME", empLname);
								dataMapEmpInfo.put("MID_INITIAL", midInitial);
								dataMapEmpInfo.put("SSN", ssn);
								dataMapEmpInfo.put("UNIT", unit);
								dataMapEmpInfo.put("CLASS", empClass);
								dataMapEmpInfo.put("DEPTID", deptId);
								dataMapEmpInfo.put("DEPT_NAME", deptName);
								dataMapEmpInfo.put("EMP_EMAIL", empEmail);
								dataMapEmpInfo.put("EMP_CB", empCB);
								dataMapEmpInfo.put("EMP_SIGN", empSign);
								Object empDateObj = null;
								if (empSignDate != null && empSignDate != "") {
									Date empSignNew = Date.valueOf(empSignDate);
									empDateObj = empSignNew;
								}
								dataMapEmpInfo.put("EMP_SIGN_DATE", empDateObj);
								dataMapEmpInfo.put("EMP_COMMENT", empComment);
								dataMapEmpInfo.put("TIMEKEEPER_CB", authApproverCB);
								dataMapEmpInfo.put("TIMEKEEPER_SIGN", authApproverSign);
								Object timekeeperDateObj = null;
								if (authApproverDate != null && authApproverDate != "") {
									Date authApproverNew = Date.valueOf(authApproverDate);
									timekeeperDateObj = authApproverNew;
								}
								dataMapEmpInfo.put("TIMEKEEPER_SIGN_DATE", timekeeperDateObj);
								dataMapEmpInfo.put("TIMEKEEPER_COMMENT", authApproverComment);
								dataMapEmpInfo.put("SUP_CB", supCB);
								dataMapEmpInfo.put("SUP_SIGN", supSign);
								Object supDateObj = null;
								if (supSignDate != null && supSignDate != "") {
									Date supSignNew = Date.valueOf(supSignDate);
									supDateObj = supSignNew;
								}
								dataMapEmpInfo.put("SUP_SIGN_DATE", supDateObj);
								dataMapEmpInfo.put("SUP_COMMENT", supComment);
								dataMapEmpInfo.put("SUP_EMAIL", supEmail);
								dataMapEmpInfo.put("PAYROLL_CB", payRollCB);
								dataMapEmpInfo.put("PAYROLL_SIGN", payrollSign);
								Object payrollDateObj = null;
								if (datePayrollSign != null && datePayrollSign != "") {
									Date payrollSignNew = Date.valueOf(datePayrollSign);
									payrollDateObj = payrollSignNew;
								}
								dataMapEmpInfo.put("PAYROLL_SIGN_DATE", payrollDateObj);
								dataMapEmpInfo.put("PAYROLL_COMMENT", payrollComment);

								for (int k = 1; k <= 33; k++) {
									String indexVal = String.valueOf(k);
									String dayVal = eElement.getElementsByTagName("Day".concat(indexVal)).item(0)
											.getTextContent();
									String workVal = eElement.getElementsByTagName("WorkHours".concat(indexVal)).item(0)
											.getTextContent();

									if ((dayVal != null) && ((workVal != null && workVal != ""))) {
										dayOfWk = eElement.getElementsByTagName("Day".concat(indexVal)).item(0)
												.getTextContent();
										dateOfMonth = eElement.getElementsByTagName("Date".concat(indexVal)).item(0)
												.getTextContent();
										wrkHrs = eElement.getElementsByTagName("WorkHours".concat(indexVal)).item(0)
												.getTextContent();

										dataMapEmpInfo.put("DAY_VALUE", dayOfWk);
										dataMapEmpInfo.put("DATE_VALUE", dateOfMonth);
										dataMapEmpInfo.put("WORK_HRS", wrkHrs);
										dataMapEmpInfo.put("TOTAL_WORK_HRS", totalWrkHrs);
										dataMapEmpInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

										dbUtil.insertFormData(conn, dataMapEmpInfo, "AEM_SPECIAL_CONSULTANT_TS",
												"Special Consulant Timesheet");
										
										log.info("dataMapEmpInfo=" + dataMapEmpInfo);

									}
								}
							}
						}

					} catch (SAXException e) {
						log.error("SAXException=" + Arrays.toString(e.getStackTrace()));
						e.printStackTrace();
					} catch (Exception e) {
						log.error("Exception=" + Arrays.toString(e.getStackTrace()));
						e.printStackTrace();
					}

					finally {
						try {
							is.close();
							conn.close();
						} catch (IOException e) {
							log.error("IOException=" + Arrays.toString(e.getStackTrace()));
							e.printStackTrace();
						} catch (SQLException e) {
							e.printStackTrace();
						}

					}

				}
			}
		}
	}

}
