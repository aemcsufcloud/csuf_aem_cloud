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
import com.csuf.cloud.core.utils.DatabaseUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=SSA 1945 Save in DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=SSA1945Save" })
public class CSUFSSA1945DB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFSSA1945DB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		DatabaseUtils dbUtil = new DatabaseUtils();
		String tableName = "AEM_SSA_1945";
		String formName = "SSA 1945";
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;
		String ssn = "";
		String fname = "";
		String lname = "";
		String midName = "";
		String campus = "";
		String dept = "";
		String emp_sign = "";
		String empId = "";
		String campusName = "";
		String sign_Initiate = "";
		String workflowInstance = "";
		LinkedHashMap<String, Object> dataMap = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);
		if (conn != null) {
			while (xmlFiles.hasNext()) {
				Resource attachmentXml = xmlFiles.next();
				workflowInstance = workItem.getWorkflow().getId();
				String filePath = attachmentXml.getPath();

				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
					} catch (ValueFormatException e) {
						log.error("ValueFormatException from CSUFSSA1945DB=" + Arrays.toString(e.getStackTrace()));
					} catch (PathNotFoundException e) {
						log.error("PathNotFoundException from CSUFSSA1945DB=" + Arrays.toString(e.getStackTrace()));
					} catch (RepositoryException e) {
						log.error("RepositoryException from CSUFSSA1945DB=" + Arrays.toString(e.getStackTrace()));
					}

					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.error("ParserConfigurationException from CSUFSSA1945DB="
									+ Arrays.toString(e1.getStackTrace()));
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.error("IOException from CSUFSSA1945DB=" + Arrays.toString(e1.getStackTrace()));
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {

								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								ssn = eElement.getElementsByTagName("SSN").item(0).getTextContent();
								fname = eElement.getElementsByTagName("FirstName").item(0).getTextContent();
								lname = eElement.getElementsByTagName("LastName").item(0).getTextContent();
								midName = eElement.getElementsByTagName("MiddleInitial").item(0).getTextContent();
								campus = eElement.getElementsByTagName("Campus").item(0).getTextContent();
								dept = eElement.getElementsByTagName("Department").item(0).getTextContent();
								emp_sign = eElement.getElementsByTagName("SignOfEmp").item(0).getTextContent();
								empId = eElement.getElementsByTagName("EmployerIDNo").item(0).getTextContent();
								campusName = eElement.getElementsByTagName("CampusName").item(0).getTextContent();
								sign_Initiate = eElement.getElementsByTagName("SignDate").item(0).getTextContent();
							}
						}
						dataMap = new LinkedHashMap<String, Object>();
						dataMap.put("SSN", ssn);
						dataMap.put("FIRST_NAME", fname);
						dataMap.put("LAST_NAME", lname);
						dataMap.put("MIDDLE_INITIAL", midName);
						dataMap.put("CAMPUS", campus);
						dataMap.put("DEPARTMENT", dept);
						dataMap.put("EMP_SIGN", emp_sign);
						Object sign_InitiatedObj = null;
						if (sign_Initiate != null && sign_Initiate != "") {
							Date sign_InitiateNew = Date.valueOf(sign_Initiate);
							sign_InitiatedObj = sign_InitiateNew;
						}
						dataMap.put("EMP_SIGN_DATE", sign_InitiatedObj);
						dataMap.put("EMP_ID_NO", empId);
						dataMap.put("CAMPUS_NAME", campusName);
						dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstance);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} catch (SAXException e) {
						log.error("SAXException from CSUFSSA1945DB=" + Arrays.toString(e.getStackTrace()));
					} finally {
						try {
							is.close();
						} catch (IOException e) {
							log.error("IOException from Finally Block from CSUFSSA1945DB="
									+ Arrays.toString(e.getStackTrace()));
						}

						try {
							if (conn != null) {
								conn.close();
							}
						} catch (SQLException e) {
							log.error("SQLException from Finally Block from CSUFSSA1945DB="
									+ Arrays.toString(e.getStackTrace()));
						}

					}

				}
			}
		}
	}
}
