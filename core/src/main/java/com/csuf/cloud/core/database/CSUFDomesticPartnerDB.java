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
import org.xml.sax.SAXException;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CloudDbSaveUtil;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Domestic Partner Save in DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=DomesticPartnerSave" })
public class CSUFDomesticPartnerDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFDomesticPartnerDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_DOMESTIC_PARTNER_DPND_CERT";
		String formName = "Domestic Partner Dependent Certification";

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;
		String certifyCB1 = "";
		String tax_year = "";
		String name_of_employee = "";
		String name_of_domestic_partner = "";
		String certifyCB2 = "";
		String tax_year2 = "";
		String name_of_employee1 = "";
		String name_of_domestic_partner1 = "";
		String emp_signature = "";
		String ssn = "";
		String first_Name = "";
		String last_Name = "";
		String campus = "";
		String date_Initiated = "";
		String campus_representative = "";
		String telephone_no = "";
		String date_Approved = "";
		String workflowInstance = "";
		LinkedHashMap<String, Object> dataMap = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();

		/*String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
		while (xmlFiles.hasNext()) {
				Resource attachmentXml = xmlFiles.next();
				workflowInstance = workItem.getWorkflow().getId();
				String filePath = attachmentXml.getPath();

				log.info("filePath= " + filePath);
				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					log.info("xmlFiles=" + filePath);
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
					} catch (ValueFormatException e) {
						log.error("ValueFormatException in finally block CSUFDomesticPartnerDB="
								+ Arrays.toString(e.getStackTrace()));
					} catch (PathNotFoundException e) {
						log.error("PathNotFoundException in finally block CSUFDomesticPartnerDB="
								+ Arrays.toString(e.getStackTrace()));
					} catch (RepositoryException e) {
						log.error("RepositoryException in finally block CSUFDomesticPartnerDB="
								+ Arrays.toString(e.getStackTrace()));
					}

					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e) {
							log.error("ParserConfigurationException in finally block CSUFDomesticPartnerDB="
									+ Arrays.toString(e.getStackTrace()));
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e) {
							log.error("IOException in finally block CSUFDomesticPartnerDB="
									+ Arrays.toString(e.getStackTrace()));
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {

								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								certifyCB1 = eElement.getElementsByTagName("certifyCB1").item(0).getTextContent();
								tax_year = eElement.getElementsByTagName("tax_year").item(0).getTextContent();
								name_of_employee = eElement.getElementsByTagName("name_of_employee").item(0)
										.getTextContent();
								name_of_domestic_partner = eElement.getElementsByTagName("name_of_domestic_partner")
										.item(0).getTextContent();
								certifyCB2 = eElement.getElementsByTagName("certifyCB2").item(0).getTextContent();
								tax_year2 = eElement.getElementsByTagName("tax_year2").item(0).getTextContent();
								name_of_employee1 = eElement.getElementsByTagName("name_of_employee1").item(0)
										.getTextContent();
								name_of_domestic_partner1 = eElement.getElementsByTagName("name_of_domestic_partner1")
										.item(0).getTextContent();
								emp_signature = eElement.getElementsByTagName("emp_signature").item(0).getTextContent();
								ssn = eElement.getElementsByTagName("SSN").item(0).getTextContent();
								first_Name = eElement.getElementsByTagName("First_Name").item(0).getTextContent();
								last_Name = eElement.getElementsByTagName("Last_Name").item(0).getTextContent();
								campus = eElement.getElementsByTagName("campus").item(0).getTextContent();
								date_Initiated = eElement.getElementsByTagName("Date_Initiated").item(0)
										.getTextContent();
								campus_representative = eElement.getElementsByTagName("campus_representative").item(0)
										.getTextContent();
								telephone_no = eElement.getElementsByTagName("Telephone_no").item(0).getTextContent();
								date_Approved = eElement.getElementsByTagName("Date_Approved").item(0).getTextContent();

							}
						}

						dataMap = new LinkedHashMap<String, Object>();

						dataMap.put("CERTIFY_CB1", certifyCB1);
						dataMap.put("TAX_YEAR1", tax_year);
						dataMap.put("EMP_NAME1", name_of_employee);
						dataMap.put("DOMESTIC_PARTNER_NAME1", name_of_domestic_partner);
						dataMap.put("CERTIFY_CB2", certifyCB2);
						dataMap.put("TAX_YEAR2", tax_year2);
						dataMap.put("EMP_NAME2", name_of_employee1);
						dataMap.put("DOMESTIC_PARTNER_NAME2", name_of_domestic_partner1);
						dataMap.put("EMP_SIGN", emp_signature);
						dataMap.put("SSN", ssn);
						dataMap.put("FIRST_NAME", first_Name);
						dataMap.put("LAST_NAME", last_Name);
						dataMap.put("CAMPUS", campus);
						Object date_InitiatedObj = null;
						if (date_Initiated != null && date_Initiated != "") {
							Date date_InitiatedNew = Date.valueOf(date_Initiated);
							date_InitiatedObj = date_InitiatedNew;
						}
						dataMap.put("DATE_INITIATED", date_InitiatedObj);
						dataMap.put("CAMPUS_REPRESENTATIVE", campus_representative);
						dataMap.put("TELE_NO", telephone_no);
						Object date_ApprovedObj = null;
						if (date_Approved != null && date_Approved != "") {
							Date date_ApprovedNew = Date.valueOf(date_Approved);
							date_ApprovedObj = date_ApprovedNew;
						}
						dataMap.put("DATE_APPROVED", date_ApprovedObj);

						dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstance);

						try {
							CloudDbSaveUtil.saveFormData(tableName, formName, workflowInstance, "WORKFLOW_INSTANCE_ID",
									workflowInstance, dataMap, "DATE_INITIATED,DATE_APPROVED");
						} catch (IOException ioException) {
							ioException.printStackTrace();
						}

					} catch (SAXException e) {
						log.error("SAXException in finally block CSUFDomesticPartnerDB="
								+ Arrays.toString(e.getStackTrace()));
					} finally {
						try {
							is.close();
						} catch (IOException e) {
							log.error("IOException in finally block CSUFDomesticPartnerDB="
									+ Arrays.toString(e.getStackTrace()));
						}
						try {
							if (conn != null) {
								conn.close();
							}
						} catch (SQLException e) {
							log.error("SQLException from Finally Block from CSUFDomesticPartnerDB="
									+ Arrays.toString(e.getStackTrace()));
						}

					}

				}
			}
	}

}
