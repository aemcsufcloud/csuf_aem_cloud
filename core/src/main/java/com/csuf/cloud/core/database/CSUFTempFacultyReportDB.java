package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=CSUF Temp Faculty Report DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=CSUFTempFacultyReportDB" })
public class CSUFTempFacultyReportDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFTempFacultyReportDB.class);

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
		Document doc = null;
		InputStream is = null;
		String workflowInstanceID = "";
		String dept = "";
		String agency = "";
		String reportingUnit = "";
		String jobCode = "";
		String fromDate = "";
		String throughDate = "";
		String empName = "";
		String empId = "";
		String rcd = "";
		String ssn = "";
		String action = "";
		String cmsPos = "";
		String scoPos = "";
		String st_dt = "";
		String end_dt = "";
		String apptDur = "";
		String timebase = "";
		String range = "";
		String salary = "";
		String deptCode = "";
		String schoolCode = "";
		String deptCooCB = "";
		String deptCooSign = "";
		String deptCooSignDate = "";
		String deptCooComments = "";
		String deanCB = "";
		String deanSign = "";
		String deanSignDate = "";
		String deanComments = "";
		String payrollCB = "";
		String payrollSign = "";
		String payrollSignDate = "";
		String payrollComments = "";
		String comments = "";

		LinkedHashMap<String, Object> dataMapEmpInfo = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		log.info("DataSourceVal==========" + dataSourceVal);
		/*conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

		while (xmlFiles.hasNext()) {
				workflowInstanceID = workItem.getWorkflow().getId();
				Resource attachmentXml = xmlFiles.next();
				String filePath = attachmentXml.getPath();

				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
					} catch (ValueFormatException e2) {
						log.error("Exception1=" + Arrays.toString(e2.getStackTrace()));
						e2.printStackTrace();
					} catch (PathNotFoundException e2) {
						log.error("Exception2=" + Arrays.toString(e2.getStackTrace()));
						e2.printStackTrace();
					} catch (RepositoryException e2) {
						log.error("Exception3=" + Arrays.toString(e2.getStackTrace()));
						e2.printStackTrace();
					}
					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.info("ParserConfigurationException=" + Arrays.toString(e1.getStackTrace()));
							e1.printStackTrace();
						}
						try {
							doc = dBuilder.parse(is);
							// String xml = XMLUtils.prettyPrintAsString(doc);
							// doc = XMLUtils.parseXmlFile(xml);
						} catch (IOException e1) {
							log.info("IOException=" + Arrays.toString(e1.getStackTrace()));
							e1.printStackTrace();
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;

								dept = eElement.getElementsByTagName("Department").item(0).getTextContent();

								agency = eElement.getElementsByTagName("Agency").item(0).getTextContent();

								jobCode = eElement.getElementsByTagName("JobCode_1").item(0).getTextContent();

								reportingUnit = eElement.getElementsByTagName("ReportingUnit").item(0).getTextContent();
								fromDate = eElement.getElementsByTagName("FromDate").item(0).getTextContent();

								throughDate = eElement.getElementsByTagName("ThroughDate").item(0).getTextContent();

								deptCooCB = eElement.getElementsByTagName("DeptCooCB").item(0).getTextContent();
								deptCooSignDate = eElement.getElementsByTagName("DeptCooSignedDate").item(0)
										.getTextContent();

								deptCooSign = eElement.getElementsByTagName("DeptCooSignature").item(0)
										.getTextContent();
								deptCooComments = eElement.getElementsByTagName("DeptCooComments").item(0)
										.getTextContent();
								deanCB = eElement.getElementsByTagName("DeanCB").item(0).getTextContent();
								deanSignDate = eElement.getElementsByTagName("DeanSignedDate").item(0).getTextContent();

								deanSign = eElement.getElementsByTagName("DeanSignature").item(0).getTextContent();
								deanComments = eElement.getElementsByTagName("DeanComments").item(0).getTextContent();

								payrollCB = eElement.getElementsByTagName("PayrollCB").item(0).getTextContent();

								payrollSignDate = eElement.getElementsByTagName("PayrollSignedDate").item(0)
										.getTextContent();
								payrollSign = eElement.getElementsByTagName("PayrollSignature").item(0)
										.getTextContent();
								payrollComments = eElement.getElementsByTagName("PayrollComments").item(0)
										.getTextContent();
								dataMapEmpInfo = new LinkedHashMap<String, Object>();
								dataMapEmpInfo.put("DEPTID", dept);
								dataMapEmpInfo.put("AGENCY", agency);
								dataMapEmpInfo.put("JOBCODE", jobCode);
								dataMapEmpInfo.put("REPORTING_UNIT", reportingUnit);
								Object fromDateObj = null;
								if (fromDate != null && fromDate != "") {
									Date fromDateNew = Date.valueOf(fromDate);
									fromDateObj = fromDateNew;
								}
								dataMapEmpInfo.put("FROM_DT", fromDateObj);
								Object throughDateObj = null;
								if (throughDate != null && throughDate != "") {
									Date throughDateNew = Date.valueOf(throughDate);
									throughDateObj = throughDateNew;
								}
								dataMapEmpInfo.put("THROUGH_DT", throughDateObj);

								for (int i = 0; i < eElement.getElementsByTagName("Row1").getLength(); i++) {
									log.error("i value=" + i);
									for (int j = 0; j < eElement.getElementsByTagName("Row1").item(i).getChildNodes()
											.getLength(); j++) {

										String nodeName = eElement.getElementsByTagName("Row1").item(i).getChildNodes()
												.item(j).getNodeName();
										String nodeValue = eElement.getElementsByTagName("Row1").item(i).getChildNodes()
												.item(j).getTextContent();
										if (nodeName.equals("EmpName")) {
											empName = nodeValue;
										}
										if (nodeName.equals("EmpId")) {
											empId = nodeValue;
										}
										if (nodeName.equals("Red")) {
											rcd = nodeValue;
										}
										if (nodeName.equals("SSN")) {
											ssn = nodeValue;
										}
										if (nodeName.equals("ActionOrReason")) {
											action = nodeValue;
										}
										if (nodeName.equals("CMSPosition")) {
											cmsPos = nodeValue;
										}
										if (nodeName.equals("SCOPosition")) {
											scoPos = nodeValue;
										}
										if (nodeName.equals("StartDt")) {
											st_dt = nodeValue;
										}
										if (nodeName.equals("EndDt")) {
											end_dt = nodeValue;
										}
										if (nodeName.equals("ApptDur")) {
											apptDur = nodeValue;
										}
										if (nodeName.equals("Timebase")) {
											timebase = nodeValue;
										}
										if (nodeName.equals("Range")) {
											range = nodeValue;
										}
										if (nodeName.equals("Salary")) {
											salary = nodeValue;
										}
										if (nodeName.equals("DeptCode")) {
											deptCode = nodeValue;
										}
										if (nodeName.equals("SchoolCode")) {
											schoolCode = nodeValue;
										}
										if (nodeName.equals("Comments")) {
											comments = nodeValue;
										}

									}
									dataMapEmpInfo.put("EMP_NAME", empName);
									dataMapEmpInfo.put("EMP_ID", empId);
									dataMapEmpInfo.put("RCD", rcd);
									dataMapEmpInfo.put("SSN", ssn);
									dataMapEmpInfo.put("ACTION_OR_REASON", action);
									dataMapEmpInfo.put("CMS_POS", cmsPos);
									dataMapEmpInfo.put("SCO_POS", scoPos);

									dataMapEmpInfo.put("START_DATE", st_dt);
									dataMapEmpInfo.put("END_DT", end_dt);
									dataMapEmpInfo.put("APPT_DURATION", apptDur);
									dataMapEmpInfo.put("TIMEBASE", timebase);

									dataMapEmpInfo.put("RANGE", range);
									dataMapEmpInfo.put("SALARY", salary);
									dataMapEmpInfo.put("DEPT_CODE", deptCode);
									dataMapEmpInfo.put("SCHOOL_CODE", schoolCode);
									dataMapEmpInfo.put("COMMENTS", comments);

									dataMapEmpInfo.put("DEPT_COO_CB", deptCooCB);
									dataMapEmpInfo.put("DEPT_COO_SIGNATURE", deptCooSign);
									Object deptCooSignDateObj = null;
									if (deptCooSignDate != null && deptCooSignDate != "") {
										Date deptCooSignDateNew = Date.valueOf(deptCooSignDate);
										deptCooSignDateObj = deptCooSignDateNew;
									}
									dataMapEmpInfo.put("DEPT_COO_SIGN_DATE", deptCooSignDateObj);
									dataMapEmpInfo.put("DEPT_COO_COMMENTS", deptCooComments);
									dataMapEmpInfo.put("DEAN_CB", deanCB);
									dataMapEmpInfo.put("DEAN_SIGN", deanSign);
									Object deanSignDateObj = null;
									if (deanSignDate != null && deanSignDate != "") {
										Date deanSignDateNew = Date.valueOf(deanSignDate);
										deanSignDateObj = deanSignDateNew;
									}
									dataMapEmpInfo.put("DEAN_SIGN_DATE", deanSignDateObj);
									dataMapEmpInfo.put("DEAN_COMMENTS", deanComments);
									dataMapEmpInfo.put("PAYROLL_CB", payrollCB);
									dataMapEmpInfo.put("PAYROLL_SIGN", payrollSign);
									Object payrollSignDateObj = null;
									if (payrollSignDate != null && payrollSignDate != "") {
										Date payrollSignDateNew = Date.valueOf(payrollSignDate);
										payrollSignDateObj = payrollSignDateNew;
									}
									dataMapEmpInfo.put("PAYROLL_SIGN_DATE", payrollSignDateObj);
									dataMapEmpInfo.put("PAYROLL_COMMENTS", payrollComments);
									dataMapEmpInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

									try {
										CloudDbSaveUtil.saveFormData("AEM_TEMP_FACULTY_REPORT", "Temp Faculty Report",
												"", "", workflowInstanceID, dataMapEmpInfo,
												"FROM_DT,THROUGH_DT,START_DATE,DEPT_COO_SIGN_DATE,DEAN_SIGN_DATE,PAYROLL_SIGN_DATE");
									} catch (IOException ioException) {
										ioException.printStackTrace();
									}
								}
							}
						}

					} catch (SAXException e) {
						log.error("SAXException=" + Arrays.toString(e.getStackTrace()));
						e.printStackTrace();
					} catch (Exception e) {
						log.error("SAXException=" + Arrays.toString(e.getStackTrace()));
					}

					finally {
						try {
							is.close();
							conn.close();
						} catch (IOException e) {
							log.error("IOException=" + Arrays.toString(e.getStackTrace()));
							log.error("SAXException=" + Arrays.toString(e.getStackTrace()));
						} catch (SQLException e) {
							log.error("SAXException=" + Arrays.toString(e.getStackTrace()));
						}

					}

				}
			}
	}

}
