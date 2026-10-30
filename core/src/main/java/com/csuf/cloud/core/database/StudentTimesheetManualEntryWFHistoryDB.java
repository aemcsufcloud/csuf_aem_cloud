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
import com.csuf.cloud.core.utils.DatabaseUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Save Student Timesheet Manual Entry Workflow History",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=Student Timesheet Manual Entry WF History" })
public class StudentTimesheetManualEntryWFHistoryDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(StudentTimesheetManualEntryWFHistoryDB.class);

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
		MetaDataMap metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
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
					log.error("ValueFormatException From StudentTimesheetManualEntryWFHistoryDB Class"
							+ Arrays.toString(e2.getStackTrace()) + "Error Message" + e2.getMessage());

				} catch (PathNotFoundException e2) {
					log.error("PathNotFoundException From StudentTimesheetManualEntryWFHistoryDB Class"
							+ Arrays.toString(e2.getStackTrace()) + "Error Message" + e2.getMessage());

				} catch (RepositoryException e2) {
					log.error("RepositoryException From StudentTimesheetManualEntryWFHistoryDB Class"
							+ Arrays.toString(e2.getStackTrace()) + "Error Message" + e2.getMessage());

				}

				try {
					DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
					DocumentBuilder dBuilder = null;
					try {
						dBuilder = dbFactory.newDocumentBuilder();
					} catch (ParserConfigurationException e1) {
						log.error("ParserConfigurationException From StudentTimesheetManualEntryWFHistoryDB Class"
								+ Arrays.toString(e1.getStackTrace()) + "Error Message" + e1.getMessage());
					}
					try {
						doc = dBuilder.parse(is);
					} catch (IOException e1) {
						log.error("IOException From StudentTimesheetManualEntryWFHistoryDB Class"
								+ Arrays.toString(e1.getStackTrace()) + "Error Message" + e1.getMessage());
					}

					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;

							cwid = eElement.getElementsByTagName("EmployeeId").item(0).getTextContent();

							String stage = eElement.getElementsByTagName("StageIndicator").item(0).getTextContent();

							if (stage.equals("ToTimekeeper")) {
								if (metaDataMap.containsKey("TimekeeperUserId")) {
									assignee = metaDataMap.get("TimekeeperUserId").toString();
								} else {
									log.error("TimekeeperUserId value is not set in metadataMap");
								}
								stepName = "Timekeeper Review";
								if (paramsValue.equalsIgnoreCase("Before Assign Task")) {
									if (metaDataMap.containsKey("actionTakenByManager")) {
										stepResponse = metaDataMap.get("actionTakenByManager").toString();
									}
									else if (metaDataMap.containsKey("actionTakenByPayroll")) {
										stepResponse = metaDataMap.get("actionTakenByPayroll").toString();
									} else {
										stepResponse = "Submit";
									}
								}
								if (paramsValue.equalsIgnoreCase("After Assign Task")) {
									if (metaDataMap.containsKey("actionTakenByTimekeeper")) {
										stepResponse = metaDataMap.get("actionTakenByTimekeeper").toString();
									} else {
										log.error("actionTakenByTimekeeper value is not set in metadataMap");
									}
								}
								comments = eElement.getElementsByTagName("TimekeeperComments").item(0).getTextContent();
							}
							if (stage.equals("ToManager")) {
								if (metaDataMap.containsKey("ManagerUserId")) {
									assignee = metaDataMap.get("ManagerUserId").toString();
								} else {
									log.error("ManagerUserId value is not set in metadataMap");
								}								
								if (paramsValue.equalsIgnoreCase("Before Assign Task")) {
									if (metaDataMap.containsKey("actionTakenByTimekeeper")) {
										stepResponse = metaDataMap.get("actionTakenByTimekeeper").toString();
									} else {
										log.error("actionTakenByTimekeeper value is not set in metadataMap");
									}
								} if (paramsValue.equalsIgnoreCase("After Assign Task")) {
									if (metaDataMap.containsKey("actionTakenByManager")) {
										stepResponse = metaDataMap.get("actionTakenByManager").toString();
									} else {
										log.error("actionTakenByManager value is not set in metadataMap");
									}
								} 
								stepName = "Manager Review";
								comments = eElement.getElementsByTagName("SupervisorComments").item(0).getTextContent();
							}
							
							if (stage.equals("ToPayroll")) {
								
									assignee = "Payroll-Reviewers";
															
								if (paramsValue.equalsIgnoreCase("Before Assign Task")) {
									if (metaDataMap.containsKey("actionTakenByManager")) {
										stepResponse = metaDataMap.get("actionTakenByManager").toString();
									} else {
										log.error("actionTakenByManager value is not set in metadataMap");
									}
								} if (paramsValue.equalsIgnoreCase("After Assign Task")) {
									if (metaDataMap.containsKey("actionTakenByPayroll")) {
										stepResponse = metaDataMap.get("actionTakenByPayroll").toString();
									} else {
										log.error("actionTakenByPayroll value is not set in metadataMap");
									}
								} 
								stepName = "Payroll Review";
								comments = eElement.getElementsByTagName("PayrollComments").item(0).getTextContent();
							}
							if (stage.equals("ToStudent")) {
								if (metaDataMap.containsKey("StudentUserId")) {
									assignee = metaDataMap.get("StudentUserId").toString();
								} else {
									log.error("StudentUserId value is not set in metadataMap");
								}
								stepName = "Student Assistant Review";
								if (paramsValue.equalsIgnoreCase("Before Assign Task")) {
									stepResponse = "Send to Student Assistant";
								}
								if (paramsValue.equalsIgnoreCase("After Assign Task")) {
									stepResponse = "Submit";
								}
								comments = eElement.getElementsByTagName("StudentComments").item(0).getTextContent();
							}
						}
					}

				} catch (SAXException e) {
					log.error("SAXException From StudentTimesheetManualEntryWFHistoryDB Class"
							+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
				} finally {
					try {
						is.close();
					} catch (IOException e) {
						log.error("IOException From StudentTimesheetManualEntryWFHistoryDB Class"
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
					DatabaseUtils.insertWFHistory(conn, dataMap);
				}*/
				try {
					CloudDbSaveUtil.saveWorkflowHistory(paramsValue, dataMap);
				} catch (IOException ioException) {
					log.error("IOException saving WF history: " + ioException.getMessage());
				}
			}

		}

	}

}
