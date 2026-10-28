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
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Appeal of a Declined Fee Waiver Request DB Save",
		"service.vendor=ThoughtFocus", "process.label=AppealofaDeclinedFeeWaiverRequestDB" })
public class AppealofaDeclinedFeeWaiverRequestDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(AppealofaDeclinedFeeWaiverRequestDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_APPEAL_DECLINED_FEE_WAIVER";
		String formName = "Appeal of a Declined Fee Waiver Request";
		String url = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";
		String assignee = "";
		String caseId = "";
		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

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
								caseId = eElement.getElementsByTagName("caseId").item(0).getTextContent();
								dataMap.put("CASE_ID", caseId);
								dataMap.put("FEE_WAIVER_HOLDER_CWID",
										eElement.getElementsByTagName("FeeWaiverHolderCWID").item(0).getTextContent());
								dataMap.put("FEE_WAIVER_HOLDER_FIRST_NAME", eElement
										.getElementsByTagName("FeeWaiverHolderFirstName").item(0).getTextContent());
								dataMap.put("FEE_WAIVER_HOLDER_LAST_NAME", eElement
										.getElementsByTagName("FeeWaiverHolderLastName").item(0).getTextContent());
								dataMap.put("FEE_WAIVER_HOLDER_MIDDLE_NAME", eElement
										.getElementsByTagName("FeeWaiverHolderMiddleName").item(0).getTextContent());
								dataMap.put("FEE_WAIVER_HOLDER_TELEPHONE",
										eElement.getElementsByTagName("FeeWaiverHolderContactTelephone").item(0)
												.getTextContent());
								dataMap.put("FEE_WAIVER_HOLDER_EMAIL", eElement
										.getElementsByTagName("FeeWaiverHolderEmailAddress").item(0).getTextContent());
								dataMap.put("FEE_WAIVER_HOLDER_USER_ID", eElement
										.getElementsByTagName("FeeWaiverHolderUserId").item(0).getTextContent());
								dataMap.put("FEE_WAIVER_HOLDER_POSITION",
										eElement.getElementsByTagName("FeeWaiverHoldeQualifyingPositionRB").item(0)
												.getTextContent());
								dataMap.put("APPEAL_REQUESTED_TERM_RB", eElement
										.getElementsByTagName("AppealRequestedForTermRB").item(0).getTextContent());
								dataMap.put("APPEAL_REQUESTED_YEAR", eElement
										.getElementsByTagName("AppealRequesterForTermYear").item(0).getTextContent());
								dataMap.put("INVDI_FEE_WAIVER_LAST_NAME",
										eElement.getElementsByTagName("IndividualUsingFeeWaiverLastName").item(0)
												.getTextContent());
								dataMap.put("INVDI_FEE_WAIVER_FIRST_NAME",
										eElement.getElementsByTagName("IndividualUsingFeeWaiverFirstName").item(0)
												.getTextContent());
								dataMap.put("INVDI_FEE_WAIVER_MIDDLE_NAME",
										eElement.getElementsByTagName("IndividualUsingFeeWaiverMiddleName").item(0)
												.getTextContent());
								dataMap.put("INVDI_FEE_WAIVER_RELATIONSHIP", eElement
										.getElementsByTagName("RelationshipToFeeWaiverRB").item(0).getTextContent());
								dataMap.put("REQUEST_TYPE",
										eElement.getElementsByTagName("FeeWaiverRequestRB").item(0).getTextContent());
								dataMap.put("REQUEST_TYPE_EXPLANATION",
										eElement.getElementsByTagName("FeeWaiverRequestRBExplanation").item(0)
												.getTextContent());
								dataMap.put("FEE_WAIVER_HOLDER_SIGNATURE", eElement
										.getElementsByTagName("FeeWaiverHolderSignature").item(0).getTextContent());
								String feeWaiverHolderSignDate = eElement.getElementsByTagName("FeeWaiverHolderSignatureDate")
										.item(0).getTextContent();
								Object feeWaiverHolderSignDateObj = "";
								if (feeWaiverHolderSignDate != null && feeWaiverHolderSignDate != "") {
									Date feeWaiverHolderSignDateNew = Date.valueOf(feeWaiverHolderSignDate);
									feeWaiverHolderSignDateObj = feeWaiverHolderSignDateNew;
								}
								dataMap.put("FEE_WAIVER_HOLDER_SIGN_DATE", feeWaiverHolderSignDateObj);
								dataMap.put("FEE_WAIVER_HOLDER_COMMENT", eElement
										.getElementsByTagName("FeeWaiverHolderComments").item(0).getTextContent());
								dataMap.put("APPEALS_COMMITTEE_SIGNATURE", eElement
										.getElementsByTagName("AppealsCommitteeSignature").item(0).getTextContent());
								String appealsCommitteeSignDate = eElement.getElementsByTagName("AppealsCommitteeSignDate")
										.item(0).getTextContent();
								Object appealsCommitteeSignDateObj = "";
								if (appealsCommitteeSignDate != null && appealsCommitteeSignDate != "") {
									Date appealsCommitteeSignDateNew = Date.valueOf(appealsCommitteeSignDate);
									appealsCommitteeSignDateObj = appealsCommitteeSignDateNew;
								}
								dataMap.put("APPEALS_COMMITTEE_SIGN_DATE", appealsCommitteeSignDateObj);
								dataMap.put("APPEALS_COMMITTEE_COMMENT", eElement
										.getElementsByTagName("AppealsCommitteeComment").item(0).getTextContent());
								dataMap.put("APPEALS_COMMITTEE_DECISION", eElement
										.getElementsByTagName("AppealsCommitteeDecision").item(0).getTextContent());
								dataMap.put("APPEALS_COMMITTEE_APPROVE_ONE", eElement
										.getElementsByTagName("AppealsCommitteCurrentTerm").item(0).getTextContent());
								dataMap.put("APPEALS_COMMITTEE_APPROVE_TWO", eElement
										.getElementsByTagName("AppealsCommittePriorTerm").item(0).getTextContent());
								dataMap.put("DATA_XML", dataXML);
								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								List<Route> backRoutesList = workflowSession.getBackRoutes(workItem, false);
								JsonArray backRoutesJson = new JsonArray();
								for (Route backRoute : backRoutesList) {
									backRoutesJson.add(backRoute.getName());
								}
								String saveHistoryBackRoute = "";
								if (backRoutesJson.size() == 1) {
									saveHistoryBackRoute = backRoutesList.get(0).getName();
									log.debug("Executing if block ");
								} else {
									saveHistoryBackRoute = backRoutesList.get(1).getName();
									String wId = workItem.getId().replace("VolatileWorkItem_", "/workItems/");
									String firstStr = wId.substring(0, wId.indexOf('_'));
									String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
									String t1 = firstStr.replaceAll("[^0-9]+", "");
									int a1 = Integer.parseInt(t1);
									a1 = a1 - 2;
									firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
									String workItemId = workflowInstanceID.concat(firstStr).concat("_")
											.concat(secString);
									assignee = taskService.getTaskAssignee(workItemId);
									log.debug("Executing else block assignee : {}", assignee);
								}
								dataMap.put("LAST_STEP", saveHistoryBackRoute);
								if (dataMap.get("LAST_STEP").equals("Appeals Committee Review")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNING");
								}
								dataMap.put("LAST_STEP_ASSIGNEE", assignee);
								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, caseId, "CASE_ID", workflowInstanceID, tableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, caseId, "CASE_ID", workflowInstanceID, tableName);
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
				json.put("UNIQUE_FIELD_COLUMN", "CASE_ID");
				json.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
				json.put("DATA_MAP", dataMap);
				json.put("DATE_FIELDS", "FEE_WAIVER_HOLDER_SIGN_DATE,APPEALS_COMMITTEE_SIGN_DATE");

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
				e1.printStackTrace();
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in AppealofaDeclinedFeeWaiverRequestDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in AppealofaDeclinedFeeWaiverRequestDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}
		}
	}
}