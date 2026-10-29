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

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONObject;
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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Catastrophic Leave Request DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=CSUFCataLeaveRequestDB" })
public class CSUFCLRDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFCLRDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		DatabaseUtils dbUtil = new DatabaseUtils();
		String tableName = "CATASTROPHIC_LEAVE_REQUEST";
		String formName = "Catastrophic Leave Request";
		String url = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";
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
		String bargainingUnit = "";
		String illnessType = "";
		String leaveType = "";
		String lenghtOfIllness = "";
		String estimatedSickLeave = "";
		String empSign = "";
		String reasons = "";
		String staffUnitSign = "";
		String staffUnitDate = "";
		String unit3Sign = "";
		String unit3Date = "";
		String empRepresentative = "";
		String department = "";
		String payroll = "";
		String eligibilityCB = "";
		String creditsCB = "";
		LinkedHashMap<String, Object> dataMap = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		/*String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
		String wfInstanceID = workItem.getWorkflow().getId();
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		//if (conn != null) {
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
						log.error("ValueFormatException from CSUFCLRDB=" + Arrays.toString(e2.getStackTrace()));
					} catch (PathNotFoundException e2) {
						log.error("PathNotFoundException from CSUFCLRDB=" + Arrays.toString(e2.getStackTrace()));
					} catch (RepositoryException e2) {
						log.error("RepositoryException from CSUFCLRDB=" + Arrays.toString(e2.getStackTrace()));
					}

					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.error("ParserConfigurationException from CSUFCLRDB="
									+ Arrays.toString(e1.getStackTrace()));
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.error("IOException from CSUFCLRDB=" + Arrays.toString(e1.getStackTrace()));
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								firstName = eElement.getElementsByTagName("FirstName").item(0).getTextContent();
								lastName = eElement.getElementsByTagName("LastName").item(0).getTextContent();
								emplId = eElement.getElementsByTagName("EMPLID").item(0).getTextContent();
								empRCD = eElement.getElementsByTagName("EMPLRCD").item(0).getTextContent();
								departmentName = eElement.getElementsByTagName("DepartmentName").item(0)
										.getTextContent();
								departmentID = eElement.getElementsByTagName("DepartmentID").item(0).getTextContent();
								bargainingUnit = eElement.getElementsByTagName("BargainingUnit").item(0)
										.getTextContent();
								illnessType = eElement.getElementsByTagName("IllnessType").item(0).getTextContent();
								leaveType = eElement.getElementsByTagName("LeaveType").item(0).getTextContent();
								lenghtOfIllness = eElement.getElementsByTagName("LenghtIllness").item(0)
										.getTextContent();
								estimatedSickLeave = eElement.getElementsByTagName("EstimatedSickLeave").item(0)
										.getTextContent();
								empSign = eElement.getElementsByTagName("EmpSign").item(0).getTextContent();
								reasons = eElement.getElementsByTagName("Reasons").item(0).getTextContent();
								staffUnitSign = eElement.getElementsByTagName("StaffUnitSign").item(0).getTextContent();
								staffUnitDate = eElement.getElementsByTagName("StaffUnitDate").item(0).getTextContent();
								unit3Sign = eElement.getElementsByTagName("Unit3Sign").item(0).getTextContent();
								unit3Date = eElement.getElementsByTagName("Unit3Date").item(0).getTextContent();
								empRepresentative = eElement.getElementsByTagName("EmpRepresentative").item(0)
										.getTextContent();
								department = eElement.getElementsByTagName("Department").item(0).getTextContent();
								payroll = eElement.getElementsByTagName("Payroll").item(0).getTextContent();
								eligibilityCB = eElement.getElementsByTagName("EligibilityCB").item(0).getTextContent();
								creditsCB = eElement.getElementsByTagName("CreditsCB").item(0).getTextContent();
								chrsId = eElement.getElementsByTagName("chrsId").item(0).getTextContent();
							}
						}

						dataMap = new LinkedHashMap<String, Object>();
						dataMap.put("EMPID", emplId);
						dataMap.put("FIRST_NAME", firstName);
						dataMap.put("LAST_NAME", lastName);
						dataMap.put("EMP_RCD", empRCD);
						dataMap.put("DEPT_NAME", departmentName);
						dataMap.put("DEPT_ID", departmentID);
						dataMap.put("BARGAINING_UNIT", bargainingUnit);
						dataMap.put("ILLNESS_TYPE", illnessType);
						dataMap.put("LEAVE_TYPE", leaveType);
						dataMap.put("LENGHT_OF_ILLNESS", lenghtOfIllness);
						dataMap.put("ESTIMATED_SICK_LEAVE", estimatedSickLeave);
						dataMap.put("EMP_SIGN", empSign);
						dataMap.put("REASONS_FOR_NON_ELIGIBLE", reasons);
						dataMap.put("STAFF_SIGN", staffUnitSign);

						Object staffDateObj = null;
						if (staffUnitDate != null && staffUnitDate != "") {
							Date staffDateNew = Date.valueOf(staffUnitDate);
							staffDateObj = staffDateNew;
						}
						dataMap.put("STAFF_DATE", staffDateObj);
						dataMap.put("UNIT3_SIGN", unit3Sign);

						Object unit3DateObj = null;
						if (unit3Date != null && unit3Date != "") {
							Date unitDateNew = Date.valueOf(unit3Date);
							unit3DateObj = unitDateNew;
						}
						dataMap.put("UNIT3_DATE", unit3DateObj);
						dataMap.put("EMP_REPRESENTATIVE", empRepresentative);
						dataMap.put("DEPARTMENT", department);
						dataMap.put("PAYROLL", payroll);
						dataMap.put("ELIGIBILITY_TYPE", eligibilityCB);
						dataMap.put("CREDITS_TYPE", creditsCB);
						dataMap.put("CHRS_ID", chrsId);
						dataMap.put("WORKFLOW_INSTANCE_ID", wfInstanceID);
						//dbUtil.insertFormData(conn, dataMap, tableName, formName);
						
						JSONObject json = new JSONObject();
						json.put("DB_CONNECTION", "AEMDBDEV");
						json.put("TABLE_NAME", tableName);
						json.put("FORM_NAME", formName);
						json.put("UNIQUE_FIELD", emplId);
						json.put("UNIQUE_FIELD_COLUMN", "EMPLID");
						json.put("WORKFLOW_INSTANCE_ID", wfInstanceID);
						json.put("DATA_MAP", dataMap);
						json.put("DATE_FIELDS", "STAFF_DATE,UNIT3_DATE");

						log.error("Testing: =" + json.toString());

						String dbServiceUrl = url;

						CloseableHttpClient client = HttpClients.createDefault();
						HttpPost post = new HttpPost(dbServiceUrl);
						post.addHeader("Content-Type", "application/json");
						post.setEntity(new StringEntity(json.toString()));

						CloseableHttpResponse response = client.execute(post);
						log.info("DB Service Response: =" + response.getStatusLine());
						client.close();
						
					} catch (SAXException e) {
						log.error("SAXException from CSUFCLRDB=" + Arrays.toString(e.getStackTrace()));
					} catch (Exception e) {
						log.error("Exception from CSUFCLRDB=" + Arrays.toString(e.getStackTrace()));
					} finally {
						try {
							is.close();
						} catch (IOException e) {
							log.error("IOException from Finally Block from CSUFCLRDB="
									+ Arrays.toString(e.getStackTrace()));
						}
						try {
							if (conn != null) {
								conn.close();
							}
						} catch (SQLException e) {
							log.error("SQLException from Finally Block from CSUFCLRDB="
									+ Arrays.toString(e.getStackTrace()));
						}
					}
				}
			}
		//}
	}
}
