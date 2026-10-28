package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;

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

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.services.TaskService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Appeals External Form DB", "service.vendor=ThoughtFocus",
		"process.label=AppealsExternalFormDB" })
public class AppealsExternalFormDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(AppealsExternalFormDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_APPEALS_EXTERNAL_FORM";
		String formName = "Admissions Appeal External Form";
		String url = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";
		String caseId = "";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;
		MetaDataMap metaDataMapVal = workItem.getWorkflow().getWorkflowData().getMetaDataMap();

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		log.debug("Workflowinstanceid:" + workflowInstanceID);
		if (StringUtils.isNotBlank(payloadPath)) {
			InputStream is = null;
			try {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");

				if (null != is) {
					Document doc = XMLUtils.getDomDocument(is);
					String dataXML = XMLUtils.prettyPrintAsString(doc);

					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							try {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								log.debug("index=" + temp);

								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								caseId = eElement.getElementsByTagName("CaseId").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", caseId);
								dataMap.put("TERM", eElement.getElementsByTagName("Term").item(0).getTextContent());

								dataMap.put("EMAIL", eElement.getElementsByTagName("Email").item(0).getTextContent());

								dataMap.put("TERM_YEAR",
										eElement.getElementsByTagName("TermYear").item(0).getTextContent());
								dataMap.put("TERM_DESCRIPTION",
										eElement.getElementsByTagName("TermDescription").item(0).getTextContent());

								dataMap.put("FIRST_NAME",
										eElement.getElementsByTagName("FirstName").item(0).getTextContent());

								dataMap.put("LAST_NAME",
										eElement.getElementsByTagName("LastName").item(0).getTextContent());

								dataMap.put("APPEAL_STATEMENT",
										eElement.getElementsByTagName("AppealStatement").item(0).getTextContent());

								String appealReason = "";
								String appealReason1 = XMLUtils.getChildNodeContent(eElement, "AppealReason1");
								if (appealReason1.equals("1")) {
									appealReason = "Extenuating Circumstances";
								}
								String appealReason2 = XMLUtils.getChildNodeContent(eElement, "AppealReason2");
								if (appealReason2.equals("1")) {
									appealReason = "Family Circumstances";
								}
								String appealReason3 = XMLUtils.getChildNodeContent(eElement, "AppealReason3");
								if (appealReason3.equals("1")) {
									appealReason = "Personal Illness";
								}
								/*
								 * String appealReason4 = eElement.getElementsByTagName("AppealReason4").item(0)
								 * .getTextContent(); if (appealReason4.equals("1")) { appealReason =
								 * "Misreport"; } String appealReason5 =
								 * eElement.getElementsByTagName("AppealReason5").item(0) .getTextContent(); if
								 * (appealReason5.equals("1")) { appealReason =
								 * "Application Fee Waiver Request"; }
								 */
								String appealReason6 = XMLUtils.getChildNodeContent(eElement, "AppealReason6");
								if (appealReason6.equals("1")) {
									appealReason = "New and/or updated information";
								}
								String appealReason7 = XMLUtils.getChildNodeContent(eElement, "OtherText");
								if (appealReason7.equals("1")) {
									String reason = eElement.getElementsByTagName("AppealReason7").item(0)
											.getTextContent();
									appealReason = reason;
								}

								
								dataMap.put("APPEAL_REASON", appealReason);
								log.debug("appealReason : " + appealReason);
								
								
								String reason = "";
								String reason1 = XMLUtils.getChildNodeContent(eElement, "AdmissionsDecision");
								if (reason1.equals("1")) {
									reason = "Admissions Decision";
								}
								
								String reason2 = XMLUtils.getChildNodeContent(eElement, "MissedInitialDeadline");
								if (reason2.equals("1")) {
									reason = "Missed Initial Document Deadline";
								}
								
								String reason3 = XMLUtils.getChildNodeContent(eElement, "MissedFinalDeadline");
								if (reason3.equals("1")) {
									reason = "Missed Final Document Deadline";
								}
								
								String reason4 = XMLUtils.getChildNodeContent(eElement, "MissedEnrolAdminCharDeadline");
								if (reason4.equals("1")) {
									reason = "Missed Enrollment Administrative Charge Dealine";
								}
								
								dataMap.put("REASON", reason);
								log.debug("reason : " + reason);
								
								String levelSelection = "";
								String level = XMLUtils.getChildNodeContent(eElement,"Level");
								if (level.equals("0")) {
									levelSelection = "Freshmen";
								} else {
									levelSelection = "Transfer";
								}
								dataMap.put("LEVELS", levelSelection);

								dataMap.put("STUDENT_SIGNATURE",
										eElement.getElementsByTagName("StudentSignature").item(0).getTextContent());

								String studentSignDate = eElement.getElementsByTagName("StudentSignDate").item(0)
										.getTextContent();
								Object initaitedDateObj = "";
								if (studentSignDate != null && studentSignDate != "") {
									Date initiatedDateNew = Date.valueOf(studentSignDate);
									initaitedDateObj = initiatedDateNew;
								}
								dataMap.put("STUDENT_SIGNDATE", initaitedDateObj);
								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
								log.debug("DataMap values :{}", dataMap);

							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, caseId, "CASEID", workflowInstanceID, tableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, caseId, "CASEID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				
				JSONObject json = new JSONObject();
				json.put("DB_CONNECTION", "AEMDBDEV");
				json.put("TABLE_NAME", tableName);
				json.put("FORM_NAME", formName);
				json.put("UNIQUE_FIELD", caseId);
				json.put("UNIQUE_FIELD_COLUMN", "CASEID");
				json.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
				json.put("DATA_MAP", dataMap);
				json.put("DATE_FIELDS", "STUDENT_SIGNDATE");

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
			} catch (Exception e1) {
				log.debug(Arrays.toString(e1.getStackTrace()) + "Message-----" + e1.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug(
								"IOException in AppealsExternalDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in AppealsExternalDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}
}