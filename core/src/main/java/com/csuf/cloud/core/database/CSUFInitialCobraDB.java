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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Initial Cobra Save in DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=InitialCobraDB" })
public class CSUFInitialCobraDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFInitialCobraDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_INITIAL_COBRA";
		String formName = "Initial Cobra";
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;

		String emplID = null;
		String empRCD = null;
		String dateInitiated = null;
		String firstName = null;
		String lastName = null;
		String partnerName = null;
		LinkedHashMap<String, Object> dataMap = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		String wfInstanceID = workItem.getWorkflow().getId();
		/*String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
		while (xmlFiles.hasNext()) {
				Resource attachmentXml = xmlFiles.next();
				String filePath = attachmentXml.getPath();

				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
					} catch (ValueFormatException e2) {
						log.error("ValueFormatException in CSUFInitialCobraDB=" + Arrays.toString(e2.getStackTrace()));
					} catch (PathNotFoundException e2) {
						log.error("PathNotFoundException in CSUFInitialCobraDB=" + Arrays.toString(e2.getStackTrace()));
					} catch (RepositoryException e2) {
						log.error("RepositoryException in CSUFInitialCobraDB=" + Arrays.toString(e2.getStackTrace()));
					}

					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.error("ParserConfigurationException in CSUFInitialCobraDB="
									+ Arrays.toString(e1.getStackTrace()));
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.error("IOException in CSUFInitialCobraDB=" + Arrays.toString(e1.getStackTrace()));
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);
							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								emplID = eElement.getElementsByTagName("Empl_ID").item(0).getTextContent();
								empRCD = eElement.getElementsByTagName("Empl_RCD").item(0).getTextContent();
								dateInitiated = eElement.getElementsByTagName("DateInitiated").item(0).getTextContent();
								firstName = eElement.getElementsByTagName("First_Name").item(0).getTextContent();
								lastName = eElement.getElementsByTagName("Last_Name").item(0).getTextContent();
								partnerName = eElement.getElementsByTagName("Partner_Name").item(0).getTextContent();
							}
						}
						dataMap = new LinkedHashMap<String, Object>();
						dataMap.put("EMPL_ID", emplID);
						dataMap.put("EMP_RCD", empRCD);
						Object dateInitiatedObj = null;
						if (dateInitiated != null && dateInitiated != "") {
							Date dateInitiatedNew = Date.valueOf(dateInitiated);
							dateInitiatedObj = dateInitiatedNew;
						}
						dataMap.put("DATE_INITIATED", dateInitiatedObj);
						dataMap.put("FIRST_NAME", firstName);
						dataMap.put("LAST_NAME", lastName);
						dataMap.put("PARTNER_NAME", partnerName);
						try {
							CloudDbSaveUtil.saveFormData(tableName, formName, emplID, "EMPL_ID", wfInstanceID, dataMap,
									"DATE_INITIATED");
						} catch (IOException ioException) {
							ioException.printStackTrace();
						}
					} catch (SAXException e) {
						log.error("SAXException in CSUFInitialCobraDB=" + Arrays.toString(e.getStackTrace()));
					} catch (Exception e) {
						log.error("Exception in CSUFInitialCobraDB=" + Arrays.toString(e.getStackTrace()));
					} finally {
						try {
							is.close();
						} catch (IOException e) {
							log.error("IOException in finally block CSUFInitialCobraDB="
									+ Arrays.toString(e.getStackTrace()));
						}
						try {
							if (conn != null) {
								conn.close();
							}
						} catch (SQLException e) {
							log.error("SQLException from Finally Block from CSUFDependentFeeWaiverDB="
									+ Arrays.toString(e.getStackTrace()));
						}
					}
				}
			}
	}

}
