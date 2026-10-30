package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Save 10 12 11 12 PayPlan Workflow History",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=10 12 11 12 PayPlan WF History" })
public class CSUF10_12_11_12_PayPlanWFHistoryDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUF10_12_11_12_PayPlanWFHistoryDB.class);

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();

		/*String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();*/
		/*conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
		String paramsValue = ((String) processArguments.get("PROCESS_ARGS", "string")).toString();
		log.error("paramsnew=======" + paramsValue); // After Instructor Review
		LinkedHashMap<String, Object> dataMap = null;

		Document doc = null;
		InputStream is = null;

		String workflowModelName = "";
		String cwid = null;
		String stepResponse = "";
		String stepType = "";
		String stepName = "";
		String assignee = "";
		String caseId = "";
		String comments = "";
		Timestamp stepCompleteTime = null;
		Timestamp wfCompleteTime = null;

		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();

		String wfInstanceID = workItem.getWorkflow().getId();
		workflowModelName = workItem.getWorkflow().getWorkflowModel().getId();
		log.info("Workflow InstanceID ==" + wfInstanceID);
		String workflowID = workItem.getId();
		log.info("WorkflowID==" + workflowID);

		String wId = workflowID.replace("VolatileWorkItem_", "/workItems/");
		String workItemID = "";
		log.info("Workflow item Id==" + wId);
		if (paramsValue.equalsIgnoreCase("Before Assign Task")) {
			log.info("param1 before step=" + paramsValue);
			String firstStr = wId.substring(0, wId.indexOf('_'));
			String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
			String t1 = firstStr.replaceAll("[^0-9]+", "");
			int a1 = Integer.parseInt(t1);
			a1++; // Process step is one step behind the Assign task, so
					// increment it.
			firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
			workItemID = wfInstanceID.concat(firstStr).concat("_").concat(secString);
			log.info("Final workItemID ==" + workItemID);
		}

		if (paramsValue.equalsIgnoreCase("After Assign Task")) {
			log.info("param1 after step=" + paramsValue);
			String firstStr = wId.substring(0, wId.indexOf('_'));
			String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
			String t1 = firstStr.replaceAll("[^0-9]+", "");
			int a1 = Integer.parseInt(t1);
			a1--;// Process step is one step ahead the Assign task, so decrement
					// it.
			firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
			workItemID = wfInstanceID.concat(firstStr).concat("_").concat(secString);
			log.info("Final workItemID==" + workItemID);
		}

		while (xmlFiles.hasNext()) {

			String contentPath = workItem.getContentPath();

			Timestamp workflowStartTime = new java.sql.Timestamp(workItem.getTimeStarted().getTime());
			Timestamp stepStartTime = new java.sql.Timestamp(System.currentTimeMillis());

			String workflowInitiator = workItem.getWorkflow().getInitiator();

			Resource attachmentXml = xmlFiles.next();
			// log.info("xmlFiles inside ");
			String filePath = attachmentXml.getPath();

			log.info("filePath= " + filePath);
			if (filePath.contains("Data.xml")) {
				filePath = attachmentXml.getPath().concat("/jcr:content");
				log.info("xmlFiles=" + filePath);
				Node subNode = resolver.getResource(filePath).adaptTo(Node.class);

				try {
					is = subNode.getProperty("jcr:data").getBinary().getStream();
				} catch (ValueFormatException e2) {
					log.error("ValueFormatException From CSUF10_12_11_12_PayPlanWFHistoryDB Class"
							+ Arrays.toString(e2.getStackTrace()) + "Error Message" + e2.getMessage());

				} catch (PathNotFoundException e2) {
					log.error("PathNotFoundException From CSUF10_12_11_12_PayPlanWFHistoryDB Class"
							+ Arrays.toString(e2.getStackTrace()) + "Error Message" + e2.getMessage());

				} catch (RepositoryException e2) {
					log.error("RepositoryException From CSUF10_12_11_12_PayPlanWFHistoryDB Class"
							+ Arrays.toString(e2.getStackTrace()) + "Error Message" + e2.getMessage());

				}

				try {
					DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
					DocumentBuilder dBuilder = null;
					try {
						dBuilder = dbFactory.newDocumentBuilder();
					} catch (ParserConfigurationException e1) {
						log.error("ParserConfigurationException From CSUF10_12_11_12_PayPlanWFHistoryDB Class"
								+ Arrays.toString(e1.getStackTrace()) + "Error Message" + e1.getMessage());
					}
					try {
						doc = dBuilder.parse(is);
					} catch (IOException e1) {
						log.error("IOException From CSUF10_12_11_12_PayPlanWFHistoryDB Class"
								+ Arrays.toString(e1.getStackTrace()) + "Error Message" + e1.getMessage());
					}

					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;

							cwid = eElement.getElementsByTagName("empl_ID").item(0).getTextContent();

							String stage = eElement.getElementsByTagName("StageIndicator").item(0).getTextContent();

							if (stage.equals("ToManager")) {
								for (Map.Entry<String, Object> entry : workItem.getWorkflowData().getMetaDataMap()
										.entrySet()) {
									if (entry.getKey().matches("managerUserId")) {
										assignee = entry.getValue().toString();
									}
								}
								stepName = "Manager Review";
								stepResponse = "Submit";
								comments = eElement.getElementsByTagName("managerComments").item(0).getTextContent();
							}

							if (stage.equals("ToHR")) {
								assignee = "HR-Compensation-Review";
								stepName = "HR Compensation Review";
								stepResponse = "Submit";
								comments = eElement.getElementsByTagName("hrComments").item(0).getTextContent();
							}
						}
					}

				} catch (SAXException e) {
					log.error("SAXException From CSUF10_12_11_12_PayPlanWFHistoryDB Class"
							+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
				} finally {
					try {
						is.close();
					} catch (IOException e) {
						log.error("IOException From CSUF10_12_11_12_PayPlanWFHistoryDB Class"
								+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
					}

				}

				if (paramsValue.equalsIgnoreCase("Before Assign Task")) {
					stepType = "STEPSTART";
					stepCompleteTime = null;
					workflowStartTime = null;
					wfCompleteTime = null;
				}

				if (paramsValue.equalsIgnoreCase("After Assign Task")) {
					stepType = "STEPEND";
					stepCompleteTime = new java.sql.Timestamp(System.currentTimeMillis());
					workflowStartTime = null;
					wfCompleteTime = new java.sql.Timestamp(System.currentTimeMillis());
					stepStartTime = null;
				}

				dataMap = new LinkedHashMap<String, Object>();
				dataMap.put("WORKFLOW_INSTANCE_ID", wfInstanceID);
				dataMap.put("WORKITEM_ID", workItemID);
				dataMap.put("WORKFLOW_PAYLOAD", contentPath);
				dataMap.put("WORKFLOW_MODEL_NAME", workflowModelName);
				dataMap.put("CASE_ID", caseId);
				dataMap.put("CWID", cwid);
				dataMap.put("STEP_START_TIME", stepStartTime);
				dataMap.put("WORKFLOW_INITIATOR", workflowInitiator);
				dataMap.put("ASSIGNEE", assignee);
				dataMap.put("STEP_COMPLETE_TIME", stepCompleteTime);
				dataMap.put("STEP_TYPE", stepType);
				dataMap.put("STEP_RESPONSE", stepResponse);
				dataMap.put("STEP_NAME", stepName);
				dataMap.put("COMMENTS", comments);
				/*if (conn != null) {
					log.info("Connection Successfull");
					insertWFHistory(conn, dataMap);
				}*/
				try {
					CloudDbSaveUtil.saveWorkflowHistory(paramsValue, dataMap);
				} catch (IOException ioException) {
					log.error("IOException saving WF history: " + ioException.getMessage());
				}
			}

		}

	}

	public void insertWFHistory(Connection conn, LinkedHashMap<String, Object> dataMap) {
		PreparedStatement preparedStmt = null;
		if (conn != null) {
			try {
				conn.setAutoCommit(false);
			} catch (SQLException e1) {
				log.error("SQLException From CSUF10_12_11_12_PayPlanWFHistoryDB Class"
						+ Arrays.toString(e1.getStackTrace()) + "Error Message" + e1.getMessage());
			}
			String tableName = "AEM_WORKFLOW_HISTORY";
			StringBuilder sql = new StringBuilder("INSERT INTO  ").append(tableName).append(" (");
			StringBuilder placeholders = new StringBuilder();
			for (Iterator<String> iter = dataMap.keySet().iterator(); iter.hasNext();) {
				sql.append(iter.next());
				placeholders.append("?");
				if (iter.hasNext()) {
					sql.append(",");
					placeholders.append(",");
				}
			}
			sql.append(") VALUES (").append(placeholders).append(")");
			log.error("SQL=" + sql.toString());
			try {
				preparedStmt = conn.prepareStatement(sql.toString());
			} catch (SQLException e1) {
				log.error("SQLException From CSUF10_12_11_12_PayPlanWFHistoryDB Class"
						+ Arrays.toString(e1.getStackTrace()) + "Error Message" + e1.getMessage());
			}
			int i = 0;
			log.info("Datamap values=" + dataMap.values());
			for (Object value : dataMap.values()) {
				try {
					if (value instanceof Date) {
						preparedStmt.setDate(++i, (Date) value);
					} else if (value instanceof Timestamp) {
						preparedStmt.setTimestamp(++i, (Timestamp) value);
					} else if (value instanceof Integer) {
						preparedStmt.setInt(++i, (Integer) value);
					} else {
						if (value != "" && value != null) {
							preparedStmt.setString(++i, value.toString());
						} else {
							preparedStmt.setString(++i, null);
						}
					}
				} catch (SQLException e) {
					log.error("SQLException From CSUF10_12_11_12_PayPlanWFHistoryDB Class"
							+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
				}
			}
			try {
				log.info("SQL statement=" + preparedStmt);
				log.info("Before insert workflow history");
				preparedStmt.execute();
				conn.commit();
				log.info("End insert workflow history");
			} catch (SQLException e1) {
				log.error("SQLException From CSUF10_12_11_12_PayPlanWFHistoryDB Class"
						+ Arrays.toString(e1.getStackTrace()) + "Error Message" + e1.getMessage());

			} finally {
				if (preparedStmt != null) {
					try {
						preparedStmt.close();

					} catch (SQLException e) {
						log.error("SQLException From CSUF10_12_11_12_PayPlanWFHistoryDB Class"
								+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
					}
				}

				if (conn != null) {
					try {
						conn.close();
					} catch (Exception e) {
						log.error("SQLException From CSUF10_12_11_12_PayPlanWFHistoryDB Class"
								+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
					}
				}
			}
		}
	}

}
