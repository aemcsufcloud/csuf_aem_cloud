package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=CSUF LOR DB", "service.vendor=ThoughtFocus", "process.label=CSUFLORDB" })

public class CSUFLORDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	private static final Logger log = LoggerFactory.getLogger(CSUFLORDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_LOR_FORM";
		String formName = "Request for a Letter of Recommendation";
		String cwid = "";
		String firstName = "";
		String lastName = "";
		String phoneNumber = "";
		String emailAddress = "";
		String major = "";
		String gradYear = "";
		String dueDate = "";
		String reason = "";
		String contactInfo = "";
		String shortBio = "";
		String workflowInstanceID = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		workflowInstanceID = workItem.getWorkflow().getId();
		if (StringUtils.isNotBlank(payloadPath)) {
			InputStream is = null;
			try {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");

				if (null != is) {
					Document doc = XMLUtils.getDomDocument(is);

					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
							cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
							firstName = eElement.getElementsByTagName("FName").item(0).getTextContent();
							lastName = eElement.getElementsByTagName("LastName").item(0).getTextContent();
							phoneNumber = eElement.getElementsByTagName("PhoneNumber").item(0).getTextContent();
							emailAddress = eElement.getElementsByTagName("EmailAddress").item(0).getTextContent();
							major = eElement.getElementsByTagName("Major").item(0).getTextContent();
							dueDate = eElement.getElementsByTagName("LORDueDate").item(0).getTextContent();
							gradYear = eElement.getElementsByTagName("GraduationYear").item(0).getTextContent();
							reason = eElement.getElementsByTagName("ReasonForLOR").item(0).getTextContent();
							contactInfo = eElement.getElementsByTagName("ContactInfo").item(0).getTextContent();
							shortBio = eElement.getElementsByTagName("ShortBio").item(0).getTextContent();

						}
					}

					dataMap = new LinkedHashMap<String, Object>();
					dataMap.put("CWID", cwid);
					dataMap.put("STUDENT_FIRST_NAME", firstName);
					dataMap.put("STUDENT_LAST_NAME", lastName);
					dataMap.put("PHONE_NUMBER", phoneNumber);
					dataMap.put("EMAIL_ADDRESS", emailAddress);
					dataMap.put("MAJOR", major);
					dataMap.put("GRAD_YEAR", gradYear);
					Object dueDateObj = null;
					if (dueDate != null && dueDate != "") {
						Date dueDateNew = Date.valueOf(dueDate);
						dueDateObj = dueDateNew;
					}
					dataMap.put("DUE_DATE", dueDateObj);
					dataMap.put("REASON", reason);
					dataMap.put("CONTACT_INFO", contactInfo);
					dataMap.put("SHORT_BIO", shortBio);
					dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

				}

				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					dbUtil.insertFormData(conn, dataMap, tableName, formName);
				}

			} catch (Exception e) {
				log.error("Exception in CSUFLORDB=" + Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.error("IOException in CSUFLORDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in CSUFLORDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}
			

		}

	}

}
