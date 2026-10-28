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
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

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
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Dotted Line DB", "service.vendor=ThoughtFocus",
		"process.label=Bio Demographic DB" })

public class BioDemographicDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(BioDemographicDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_BIO_DEMOGRAPHIC_FORM";
		String formName = "Bio Demographic Student Form";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;
		String url = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";

		/*String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
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
							try {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								log.debug("eElement : " + eElement);
								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", eElement.getElementsByTagName("CaseID").item(0).getTextContent());
								dataMap.put("FIRST_NAME", eElement.getElementsByTagName("FirstName").item(0).getTextContent());
								dataMap.put("LAST_NAME", eElement.getElementsByTagName("LastName").item(0).getTextContent());
								dataMap.put("EMAIL", eElement.getElementsByTagName("Email").item(0).getTextContent());
								dataMap.put("CAS_ID", eElement.getElementsByTagName("CASID").item(0).getTextContent());
								
								String dob = eElement.getElementsByTagName("DateofBirth").item(0)
										.getTextContent();
								Object dobObj = null;
								if (dob != null && dob != "") {
									Date reqDateNew = Date.valueOf(dob);
									dobObj = reqDateNew;
								}
								dataMap.put("DATE_OF_BIRTH", dobObj);
								
								dataMap.put("NO_ID", checkCBValue(eElement.getElementsByTagName("NoIDCB").item(0).getTextContent()));
								
								dataMap.put("NAME_CHANGE_CB", checkCBValue(eElement.getElementsByTagName("NameCB").item(0).getTextContent()));
								dataMap.put("EMAIL_CHANGE_CB", checkCBValue(eElement.getElementsByTagName("EmailCB").item(0).getTextContent()));
								dataMap.put("CHANGED_EMAIL", eElement.getElementsByTagName("EmailCBValue").item(0).getTextContent());
								dataMap.put("DATE_OF_BIRTH_CHANGE_CB", checkCBValue(eElement.getElementsByTagName("DOBCB").item(0).getTextContent()));
								dataMap.put("SSN_CHANGE_CB", checkCBValue(eElement.getElementsByTagName("SSNCB").item(0).getTextContent()));
								dataMap.put("CA_SSID_CB", checkCBValue(eElement.getElementsByTagName("CASSIDCB").item(0).getTextContent()));
								dataMap.put("CHANGED_CA_SSID", eElement.getElementsByTagName("CASSIDCBValue").item(0).getTextContent());
								
								dataMap.put("STUDENT_SIGNATURE", eElement.getElementsByTagName("StudentSignature").item(0).getTextContent());
								
								String stuSignDate = eElement.getElementsByTagName("StudentSignDate").item(0)
										.getTextContent();
								Object stuSignDateObj = null;
								if (stuSignDate != null && stuSignDate != "") {
									Date reqDateNew = Date.valueOf(stuSignDate);
									stuSignDateObj = reqDateNew;
								}
								dataMap.put("STUDENT_SIGN_DATE", stuSignDateObj);
								dataMap.put("WORKFLOW_STATUS", "Completed");
								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
								
								
							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.debug("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				
				JSONObject json = new JSONObject();
		        json.put("DB_CONNECTION", "AEMDBDEV");
		        json.put("TABLE_NAME", tableName);
		        json.put("FORM_NAME", formName);
		        json.put("UNIQUE_FIELD", cwid);
		        json.put("UNIQUE_FIELD_COLUMN", "CWID");
		        json.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
		        json.put("DATA_MAP", dataMap);
		        json.put("DATE_FIELDS", "DATE_OF_BIRTH,STUDENT_SIGN_DATE");

		        log.error("Testing: =" + json.toString());

		        String dbServiceUrl = url;

		        CloseableHttpClient client = HttpClients.createDefault();
		        HttpPost post = new HttpPost(dbServiceUrl);
		        post.addHeader("Content-Type", "application/json");
		        post.setEntity(new StringEntity(json.toString()));

		        CloseableHttpResponse response = client.execute(post);
		        log.info("DB Service Response: =" + response.getStatusLine());
		        client.close();

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in Bio Demographic DB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in Bio Demographic DB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}
	}

	
	private String checkCBValue(String value) throws Exception {
		if(null != value && value.equals("1") ) {
			return "Yes";
		}
		return "";
	}
}
