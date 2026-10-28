package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
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
import org.w3c.dom.Element;
import org.xml.sax.SAXException;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Catastrophic Leave Donation DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=CSUFCataLeaveDonationDB" })
public class CSUFCataLeaveDonationDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFCataLeaveDonationDB.class);
	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		DatabaseUtils dbUtil = new DatabaseUtils();
		String tableName = "catastrophic_leave_donation";
		String formName = "Catastrophic Leave Donation";

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;

		String firstName = "";
		String lastName = "";
		String emplId = "";
		String chrsId = "";
		String empRCD = "";
		String departmentID = "";
		String departmentName = "";
		String donationDate = "";
		String timeOfDay = "";
		String campusExt = "";
		String sickLeaveHours = "";
		String vacationHours = "";
		String donarCatagory = "";
		String signature = "";
		String empDate = "";
		String empComments = "";
		String payrollSignature = "";
		String payrollDate = "";
		String payrollComments = "";
		String cbid = "";

		LinkedHashMap<String, Object> dataMap = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);
		String wfInstanceID = workItem.getWorkflow().getId();
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		if (conn != null) {
			while (xmlFiles.hasNext()) {
				Resource attachmentXml = xmlFiles.next();
				String filePath = attachmentXml.getPath();

				log.info("filePath= " + filePath);
				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
					} catch (ValueFormatException e2) {
						log.error("ValueFormatException from CSUFCataLeaveDonationDB="
								+ Arrays.toString(e2.getStackTrace()));
					} catch (PathNotFoundException e2) {
						log.error("PathNotFoundException from CSUFCataLeaveDonationDB="
								+ Arrays.toString(e2.getStackTrace()));
					} catch (RepositoryException e2) {
						log.error("RepositoryException from CSUFCataLeaveDonationDB="
								+ Arrays.toString(e2.getStackTrace()));
					}
					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.error("ParserConfigurationException from CSUFCataLeaveDonationDB="
									+ Arrays.toString(e1.getStackTrace()));
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.error(
									"IOException from CSUFCataLeaveDonationDB=" + Arrays.toString(e1.getStackTrace()));
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								firstName = eElement.getElementsByTagName("FirstName").item(0).getTextContent();
								lastName = eElement.getElementsByTagName("LastName").item(0).getTextContent();
								emplId = eElement.getElementsByTagName("EmplID").item(0).getTextContent();
								chrsId = eElement.getElementsByTagName("CHRS_ID").item(0).getTextContent();
								empRCD = eElement.getElementsByTagName("EmplRCD").item(0).getTextContent();
								departmentName = eElement.getElementsByTagName("Department").item(0).getTextContent();
								departmentID = eElement.getElementsByTagName("DeptID").item(0).getTextContent();
								donationDate = eElement.getElementsByTagName("DonationDate").item(0).getTextContent();
								timeOfDay = eElement.getElementsByTagName("TimeOfDay").item(0).getTextContent();
								campusExt = eElement.getElementsByTagName("CampExt").item(0).getTextContent();
								sickLeaveHours = eElement.getElementsByTagName("sl_hours").item(0).getTextContent();
								vacationHours = eElement.getElementsByTagName("vac_hrs").item(0).getTextContent();
								donarCatagory = eElement.getElementsByTagName("DonarCatagory").item(0).getTextContent();
								signature = eElement.getElementsByTagName("Signature").item(0).getTextContent();
								empDate = eElement.getElementsByTagName("EmpDate").item(0).getTextContent();
								empComments = eElement.getElementsByTagName("EmpComments").item(0).getTextContent();
								payrollSignature = eElement.getElementsByTagName("PayrollSignature").item(0)
										.getTextContent();
								payrollDate = eElement.getElementsByTagName("PayrollDate").item(0).getTextContent();
								payrollComments = eElement.getElementsByTagName("PayrollComments").item(0)
										.getTextContent();
							}
						}
						Element afBoundUnBoundDataElement = XMLUtils.getParentNode(doc, "afUnboundData");
						if (null != afBoundUnBoundDataElement && afBoundUnBoundDataElement.hasChildNodes()) {
							cbid = XMLUtils.getChildNodeContent(afBoundUnBoundDataElement, "cbid");
						}
						dataMap = new LinkedHashMap<String, Object>();
						dataMap.put("EMPID", emplId);
						dataMap.put("CHRS_ID", chrsId); 
						dataMap.put("FIRST_NAME", firstName);
						dataMap.put("LAST_NAME", lastName);
						dataMap.put("EMP_RCD", empRCD);
						dataMap.put("DEPT_NAME", departmentName);
						dataMap.put("DEPT_ID", departmentID);
						Object donationDateObj = null;
						if (donationDate != null && donationDate != "") {
							Date donDateNew = Date.valueOf(donationDate);
							donationDateObj = donDateNew;
						}
						dataMap.put("DONATION_DATE", donationDateObj);
						dataMap.put("TIME_OF_DAY", timeOfDay);
						dataMap.put("CAMPUS_EXTENTION", campusExt);
						dataMap.put("SICK_LEAVE_CREDITS", sickLeaveHours);
						dataMap.put("VACATION_CREDITS", vacationHours);
						dataMap.put("DONAR_CATAGORY", donarCatagory);
						dataMap.put("SIGNATURE", signature);
						Object empDateObj = null;
						if (empDate != null && empDate != "") {
							Date empDateNew = Date.valueOf(empDate);
							empDateObj = empDateNew;
						}

						Object payrollDateObj = null;
						if (payrollDate != null && payrollDate != "") {
							Date payrollDateNew = Date.valueOf(payrollDate);
							payrollDateObj = payrollDateNew;
						}
						dataMap.put("EMPLOYEE_DATE", empDateObj);
						dataMap.put("EMPLOYEE_COMMENTS", empComments);
						dataMap.put("PAYROLL_SIGNATURE", payrollSignature);
						dataMap.put("PAYROLL_COMMENTS", payrollComments);
						dataMap.put("PAYROLL_DATE", payrollDateObj);
						dataMap.put("CBID", cbid);
						dataMap.put("WORKFLOW_INSTANCE_ID", wfInstanceID);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} catch (SAXException e) {
						log.error("SAXException from CSUFCataLeaveDonationDB=" + Arrays.toString(e.getStackTrace()));
					} catch (Exception e) {
						log.error("Exception from CSUFCataLeaveDonationDB=" + Arrays.toString(e.getStackTrace()));
					} finally {
						try {
							is.close();
						} catch (IOException e) {
							log.error("IOException from Finally Block from CSUFCataLeaveDonationDB="
									+ Arrays.toString(e.getStackTrace()));
						}
						try {
							if (conn != null) {
								conn.close();
							}
						} catch (SQLException e) {
							log.error("SQLException from Finally Block from CSUFCataLeaveDonationDB="
									+ Arrays.toString(e.getStackTrace()));
						}

					}

				}
			}
		}
	}
}
