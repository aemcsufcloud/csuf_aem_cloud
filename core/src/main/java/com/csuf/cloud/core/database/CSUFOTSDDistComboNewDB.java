package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=CSUF OTSD Request DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=OTSDDistComboNewDB" })
public class CSUFOTSDDistComboNewDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFOTSDDistComboNewDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_OT_SD_DIST_COMBO_NEW_FORM";
		String formName = "OT SD Distributed Combo New Form";
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		DatabaseUtils dbUtil = new DatabaseUtils();
		Document doc = null;
		InputStream is = null;
		String departmentId = "";
		String agencyVal = "";
		String unitVal = "";
		String monthVal = "";
		String batchSession = "";
		String yearVal = "";
		String empId = "";
		String empRec = "";
		String SSNVal = "";
		String initials = "";
		String lastName = "";
		String classNo = "";
		String serial = "";
		String TRC = "";
		String hours = "";
		String HDTHS = "";
		String payrollOfRate = "";
		String commentVal = "";
		String totalAmt = "";
		String totalHDTHS = "";
		String totalOfRate = "";
		String authCB = "";
		String authSign = "";
		String authExt = "";
		String authDate = "";
		String payRollCB = "";
		String payRollSign = "";
		String payRollExt = "";
		String payRollDate = "";
		String payRollComment = "";
		String managerCB = "";
		String managerSign = "";
		String managerDate = "";
		String managerComment = "";
		String workflowInstanceID = "";
		String deptVal ="";
		String fundCode = "";
		String classComboVal = "";
		String programVal = "";
		String accountVal = "";
		String comboCodeVal = "";
		String timeBase = "";
		
		LinkedHashMap<String, Object> dataMapEmpInfo = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

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

								departmentId = eElement.getElementsByTagName("DeptID").item(0).getTextContent();
								agencyVal = eElement.getElementsByTagName("Agency").item(0).getTextContent();
								unitVal = eElement.getElementsByTagName("Unit").item(0).getTextContent();
								monthVal = eElement.getElementsByTagName("MonthPeriod").item(0).getTextContent();
								batchSession = eElement.getElementsByTagName("Batch").item(0).getTextContent();
								yearVal = eElement.getElementsByTagName("YearPeriod").item(0).getTextContent();
								totalAmt = eElement.getElementsByTagName("TotalAmount").item(0).getTextContent();
								totalHDTHS = eElement.getElementsByTagName("TotalHDTHS").item(0).getTextContent();
								totalOfRate = eElement.getElementsByTagName("TotalHours").item(0).getTextContent();
								
								authCB = eElement.getElementsByTagName("AuthCB").item(0).getTextContent();
								authSign = eElement.getElementsByTagName("AuthSign").item(0).getTextContent();
								authExt = eElement.getElementsByTagName("AuthExt").item(0).getTextContent();
								authDate = eElement.getElementsByTagName("AuthDate").item(0).getTextContent();
								payRollCB = eElement.getElementsByTagName("PayRollCB").item(0).getTextContent();
								payRollSign = eElement.getElementsByTagName("PayRollSign").item(0).getTextContent();
								payRollExt = eElement.getElementsByTagName("PayRollExt").item(0).getTextContent();
								payRollDate = eElement.getElementsByTagName("PayRollDate").item(0).getTextContent();
								payRollComment = eElement.getElementsByTagName("PayrollComments").item(0).getTextContent();
								managerCB = eElement.getElementsByTagName("ManagerCB").item(0).getTextContent();
								managerSign = eElement.getElementsByTagName("ManagerSign").item(0).getTextContent();
								managerDate = eElement.getElementsByTagName("ManagerDate").item(0).getTextContent();
								managerComment = eElement.getElementsByTagName("SupervisorComments").item(0).getTextContent();
								empId = eElement.getElementsByTagName("EmpID").item(0).getTextContent();
								empRec = eElement.getElementsByTagName("EmpREC").item(0).getTextContent();
								SSNVal = eElement.getElementsByTagName("SSN").item(0).getTextContent();
								initials = eElement.getElementsByTagName("Initials").item(0).getTextContent();
								lastName = eElement.getElementsByTagName("Lname").item(0).getTextContent();
								classNo = eElement.getElementsByTagName("Class").item(0).getTextContent();
								serial = eElement.getElementsByTagName("Serial").item(0).getTextContent();
								timeBase = eElement.getElementsByTagName("Timebase").item(0).getTextContent();
								dataMapEmpInfo = new LinkedHashMap<String, Object>();
								dataMapEmpInfo.put("DEPT_ID", departmentId);
								dataMapEmpInfo.put("AGENCY", agencyVal);
								dataMapEmpInfo.put("UNIT", unitVal);
								dataMapEmpInfo.put("MONTH", monthVal);
								dataMapEmpInfo.put("BATCH_SESSION", batchSession);
								dataMapEmpInfo.put("YEAR", yearVal);
								for (int k = 1; k <= 7; k++) {
									String indexVal = String.valueOf(k);
									String trcObt = eElement.getElementsByTagName("TRC".concat(indexVal)).item(0)
											.getTextContent();

									if ((trcObt != null && trcObt != "")) {
										/*empId = eElement.getElementsByTagName("EmpID".concat(indexVal)).item(0)
												.getTextContent();
										empRec = eElement.getElementsByTagName("EmpREC".concat(indexVal)).item(0)
												.getTextContent();
										SSNVal = eElement.getElementsByTagName("SSN".concat(indexVal)).item(0)
												.getTextContent();
										initials = eElement.getElementsByTagName("Initials".concat(indexVal)).item(0)
												.getTextContent();
										lastName = eElement.getElementsByTagName("Lname".concat(indexVal)).item(0)
												.getTextContent();
										classNo = eElement.getElementsByTagName("Class".concat(indexVal)).item(0)
												.getTextContent();
										serial = eElement.getElementsByTagName("Serial".concat(indexVal)).item(0)
												.getTextContent();*/
										TRC = eElement.getElementsByTagName("TRC".concat(indexVal)).item(0)
												.getTextContent();
										hours = eElement.getElementsByTagName("Hours".concat(indexVal)).item(0)
												.getTextContent();
										HDTHS = eElement.getElementsByTagName("HDTHS".concat(indexVal)).item(0)
												.getTextContent();
										payrollOfRate = eElement.getElementsByTagName("Payroll".concat(indexVal))
												.item(0).getTextContent();
										
										
										deptVal = eElement.getElementsByTagName("Dept".concat(indexVal)).item(0)
												.getTextContent();
										fundCode = eElement.getElementsByTagName("Fund".concat(indexVal)).item(0)
												.getTextContent();
										classComboVal = eElement.getElementsByTagName("Class".concat(indexVal)).item(0)
												.getTextContent();
									
										programVal = eElement.getElementsByTagName("Program".concat(indexVal)).item(0)
												.getTextContent();
										accountVal = eElement.getElementsByTagName("Account".concat(indexVal)).item(0)
												.getTextContent();
										
										comboCodeVal = eElement.getElementsByTagName("Comment".concat(indexVal)).item(0)
												.getTextContent();
										

										dataMapEmpInfo.put("EMPID", empId);
										dataMapEmpInfo.put("EMPREC", empRec);
										dataMapEmpInfo.put("SSN", SSNVal);
										dataMapEmpInfo.put("INITIALS", initials);
										dataMapEmpInfo.put("LASTNAME", lastName);
										dataMapEmpInfo.put("CLASS", classNo);
										dataMapEmpInfo.put("SERIAL", serial);
										dataMapEmpInfo.put("TRC", TRC);
										dataMapEmpInfo.put("HOURS", hours);
										dataMapEmpInfo.put("HDTHS", HDTHS);
										dataMapEmpInfo.put("PAYROLL_OF_RATE", payrollOfRate);
										dataMapEmpInfo.put("EMP_DEPT", deptVal);
										dataMapEmpInfo.put("FUND", fundCode);
										dataMapEmpInfo.put("CLASS_COMBO", classComboVal);
										dataMapEmpInfo.put("PROGRAM", programVal);
										dataMapEmpInfo.put("ACCOUNT", accountVal);
										dataMapEmpInfo.put("CODE_COMBO", comboCodeVal);
										dataMapEmpInfo.put("TIME_BASE", timeBase);
										
										dataMapEmpInfo.put("TOTAL_AMOUNT", totalAmt);
										dataMapEmpInfo.put("TOTAL_HDTHS", totalHDTHS);
										dataMapEmpInfo.put("TOTAL_AMT_PAY", totalOfRate);
										dataMapEmpInfo.put("AUTH_CB", authCB);
										dataMapEmpInfo.put("AUTH_SIGN", authSign);
										dataMapEmpInfo.put("AUTH_EXT", authExt);
										Object authDateObj = null;
										if (authDate != null && authDate != "") {
											Date authDateNew = Date.valueOf(authDate);
											authDateObj = authDateNew;
										}
										dataMapEmpInfo.put("AUTH_DATE", authDateObj);
										dataMapEmpInfo.put("PAYROLL_CB", payRollCB);
										dataMapEmpInfo.put("PAYROLL_SIGN", payRollSign);
										dataMapEmpInfo.put("PAYROLL_EXT", payRollExt);
										Object payRollDateObj = null;
										if (payRollDate != null && payRollDate != "") {
											Date payRollDateNew = Date.valueOf(payRollDate);
											payRollDateObj = payRollDateNew;
										}
										dataMapEmpInfo.put("PAYROLL_DATE", payRollDateObj);
										dataMapEmpInfo.put("PAYROLL_COMMENTS", payRollComment);
										dataMapEmpInfo.put("MANAGER_CB", managerCB);
										dataMapEmpInfo.put("MANAGER_SIGN", managerSign);
										Object managerDateObj = null;
										if (managerDate != null && managerDate != "") {
											Date managerDateNew = Date.valueOf(managerDate);
											managerDateObj = managerDateNew;
										}
										dataMapEmpInfo.put("MANAGER_DATE", managerDateObj);
										dataMapEmpInfo.put("MANAGER_COMMENTS", managerComment);
										dataMapEmpInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
										dbUtil.insertFormData(conn, dataMapEmpInfo, tableName, formName);

									}
								}
							}
						}

					} catch (SAXException e) {
						log.error("SAXException=" + e.getMessage());
						e.printStackTrace();
					} catch (Exception e) {
						log.error("Exception=" + e.getMessage());
						e.printStackTrace();
					}

					finally {
						try {
							is.close();
							conn.close();
						} catch (IOException e) {
							log.error("IOException=" + e.getMessage());
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
