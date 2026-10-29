package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.Route;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.google.gson.JsonArray;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.services.TaskService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Return University Key Control DB Save", "service.vendor=ThoughtFocus",
		"process.label=ReturnUniversityKeyControlDB" })
public class CSUFReturnUniversityKeyControlDB implements WorkflowProcess {

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Reference
	private TaskService taskService;

	

	private static final Logger logger = LoggerFactory.getLogger(CSUFReturnUniversityKeyControlDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {
		Connection connection = null;
		String tableName = "AEM_UNIVERSITY_KEY_CONTROL";
		String childTableName = "AEM_UKC_INFO";
		String formName = "University Key Control - Building Keys - Return";
		String campusid = "";
		String caseid = "";
		String hook = "";
		String copy = "";
		String building = "";
		String room = "";
		String sign = "";
		String returnDate = "";
		String returnStatus = "";
		String issuedDate = "";
		String workflowInstanceIdFromXMl = "";

		LinkedHashMap<String, Object> dataMap = null;
		LinkedHashMap<String, Object> dataMapTable = null;
		String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		/*connection = jdbcConnectionService.getDBConn(dataSourceVal);*/
	    String payLoadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = wfSession.adaptTo(ResourceResolver.class);
		String workFlowInstanceID = workItem.getWorkflow().getId();
		if (StringUtils.isNotBlank(payLoadPath)) {
			InputStream inputstream = null;
			try {
				inputstream = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payLoadPath, "Data.xml");

				if (inputstream != null) {
					Document doc = XMLUtils.getDomDocument(inputstream);

					NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int i = 0; i < nList.getLength(); i++) {
						Node nNode = nList.item(i);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							try {
								Element element = (Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								logger.debug("index=" + i);
								
								campusid = element.getElementsByTagName("CampusID").item(0).getTextContent();						
			
								for (int j = 0; j < element.getElementsByTagName("Row1").getLength(); j++) {
									for (int k = 0; k < element.getElementsByTagName("Row1").item(j)
											.getChildNodes().getLength(); k++) {
										String nodeName = element.getElementsByTagName("Row1").item(j)
												.getChildNodes().item(k).getNodeName();

										String nodeValue = element.getElementsByTagName("Row1").item(j)
												.getChildNodes().item(k).getTextContent();

										if (nodeName.contains("Hook")) {
											hook = nodeValue;
										}
										if (nodeName.contains("Copy")) {
											copy = nodeValue;
										}
										if (nodeName.contains("Building")) {
											building = nodeValue;
										}
										if (nodeName.contains("Room")) {
											room = nodeValue;
										}
										if (nodeName.contains("Signature")) {
											sign = nodeValue;
										}
										if (nodeName.contains("IssuedDate")) {
											issuedDate = nodeValue;
										}
										if (nodeName.contains("ReturnDate")) {
											returnDate = nodeValue;
										}
										if (nodeName.contains("ReturnStatus")) {
											returnStatus = nodeValue;
										}
										if (nodeName.contains("REFWorkflowInstanceID")) {
											workflowInstanceIdFromXMl = nodeValue;
										}
										if (nodeName.contains("REFCaseID")) {
											caseid = nodeValue;
										}
									}

									Object returnDateObj = null;
									if (returnDate != null && returnDate != "") {
										Date returnDateNew = Date.valueOf(returnDate);
										returnDateObj = returnDateNew;
									}
									
									Object issuedDateObj = null;
									if (issuedDate != null && issuedDate != "") {
										Date issuedDateNew = Date.valueOf(issuedDate);
										issuedDateObj= issuedDateNew;
									}
									dataMapTable = new LinkedHashMap<String, Object>();

									dataMapTable.put("CASE_ID", caseid);
									dataMapTable.put("CAMPUS_ID", campusid);
									dataMapTable.put("HOOK", hook);
									dataMapTable.put("COPY", copy);
									dataMapTable.put("BUILDING", building);
									dataMapTable.put("ROOM", room);
									dataMapTable.put("SIGNATURE", sign);
									dataMapTable.put("ISSUED_DATE", issuedDateObj);
									dataMapTable.put("RETURN_DATE", returnDateObj);
									dataMapTable.put("RETURN_STATUS", returnStatus);
									dataMapTable.put("WORKFLOW_INSTANCE_ID", workflowInstanceIdFromXMl);
									dataMapTable.put("RETURN_WF_INSTANCE_ID", workFlowInstanceID);
									if (!hook.isEmpty()) {
										try {
											CloudDbSaveUtil.saveFormData(childTableName, formName, caseid, "CASE_ID",
													workflowInstanceIdFromXMl, dataMapTable,
													"ISSUED_DATE,RETURN_DATE");
										} catch (IOException ioException) {
											ioException.printStackTrace();
										}
									}
								}
							} catch (Exception e) {
								logger.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				logger.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} finally {
				if (null != inputstream)
					try {
						inputstream.close();
					} catch (IOException e) {
						logger.debug("IOException in CSUFUniversityKeyControlDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (connection != null) {
					try {
						connection.close();
					} catch (SQLException e) {
					}
				}
			
			}
			
		}
	}

}
