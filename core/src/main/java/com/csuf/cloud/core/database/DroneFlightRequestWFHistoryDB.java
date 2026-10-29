package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.LinkedHashMap;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Save Drone Flight Request Workflow Step History",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "= Drone Flight Request Workflow Step History" })
public class DroneFlightRequestWFHistoryDB implements WorkflowProcess {

	private static final Logger logger = LoggerFactory.getLogger(DroneFlightRequestWFHistoryDB.class);

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);

		String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String paramsValue = processArguments.get("PROCESS_ARGS", "string").toString();
		logger.debug("paramsnew=======" + paramsValue);

		LinkedHashMap<String, Object> dataMap = null;

		Document doc = null;
		InputStream is = null;

		String workflowModelName = "";
		String cwid = "";
		String caseID = "";
		String stepResponse = "";
		String stepType = "";
		String stepName = "";
		String assignee = "";
		String comments = "";
		Timestamp stepCompleteTime = null;
		String decisionFlag = "";

		String wfInstanceID = workItem.getWorkflow().getId();
		workflowModelName = workItem.getWorkflow().getWorkflowModel().getId();
		String workflowID = workItem.getId();
		MetaDataMap metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();

		String wId = workflowID.replace("VolatileWorkItem_", "/workItems/");
		String workItemID = "";
		if (paramsValue.equalsIgnoreCase("Before Assign Task")) {
			logger.debug("param1 before step=" + paramsValue);
			String firstStr = wId.substring(0, wId.indexOf('_'));
			String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
			String t1 = firstStr.replaceAll("[^0-9]+", "");
			int a1 = Integer.parseInt(t1);
			a1++; // Process step is one step behind the Assign task, so
					// increment it.
			firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
			workItemID = wfInstanceID.concat(firstStr).concat("_").concat(secString);
			logger.debug("Final workItemID ==" + workItemID);
		}

		if (paramsValue.equalsIgnoreCase("After Assign Task")) {
			logger.debug("param1 after step=" + paramsValue);
			String firstStr = wId.substring(0, wId.indexOf('_'));
			String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
			String t1 = firstStr.replaceAll("[^0-9]+", "");
			int a1 = Integer.parseInt(t1);
			a1--;// Process step is one step ahead the Assign task, so decrement
					// it.
			firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
			workItemID = wfInstanceID.concat(firstStr).concat("_").concat(secString);
			logger.debug("Final workItemID==" + workItemID);
		}

		String contentPath = workItem.getContentPath();
		Timestamp stepStartTime = new java.sql.Timestamp(System.currentTimeMillis());
		String workflowInitiator = null;

		try {
			is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, workItem.getContentPath(), "Data.xml");
			if (null != is) {
				doc = XMLUtils.getDomDocument(is);

				Element afUnBoundDataElement = XMLUtils.getParentNode(doc, "afUnboundData");
				if (null != afUnBoundDataElement && afUnBoundDataElement.hasChildNodes()) {
					workflowInitiator = XMLUtils.getChildNodeContent(afUnBoundDataElement, "workflow_initiator");
				}

				Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");
				cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "CWID");
				decisionFlag = XMLUtils.getChildNodeContent(afBoundDataElement, "DecisionFlag");

				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					String stage = XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator");

					if (stage.equals("ToVP")) {
						assignee = "VP Office - Reviewers";
						stepName = "Vice President Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							stepResponse = "Submit";
						} else {
							if (metaDataMap.containsKey("actionTakenByVP")) {
								//stepResponse = metaDataMap.get("actionTakenByVP").toString();
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "VPDecision").equals("1")) {
									stepResponse = "Approved";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "VPDecision").equals("2")){
									stepResponse = "Rejected";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "VPComments");
							} else {
								logger.error("actionTakenByEmployee value is not set in metadataMap");
							}
						}

					}

					if (stage.equals("ToRM")) {
						assignee = "Risk Management - Reviewers";
						stepName = "Risk Management Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByVP")) {
								//stepResponse = metaDataMap.get("actionTakenByVP").toString();
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "VPDecision").equals("1")) {
									stepResponse = "Approved";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "VPDecision").equals("2")){
									stepResponse = "Rejected";
								}
							} else {
								logger.error("actionTakenByVP value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByRM")) {
								//stepResponse = metaDataMap.get("actionTakenByRM").toString();
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "RiskMgmtDecision").equals("1")) {
									stepResponse = "Approved";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "RiskMgmtDecision").equals("2")){
									stepResponse = "Rejected";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "RiskMgmtComments");
							} else {
								logger.error("actionTakenByRM value is not set in metadataMap");
							}
						}

					}
					
					if (stage.equals("ToPD")) {
						assignee = "Campus Police Department - Reviewers";
						stepName = "Campus Police Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByRM")) {
								//stepResponse = metaDataMap.get("actionTakenByRM").toString();
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "RiskMgmtDecision").equals("1")) {
									stepResponse = "Approved";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "RiskMgmtDecision").equals("2")){
									stepResponse = "Rejected";
								}
							} else {
								logger.error("actionTakenByRM value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByPD")) {
								//stepResponse = metaDataMap.get("actionTakenByPD").toString();
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "CampusPoliceDecision").equals("1")) {
									stepResponse = "Approved";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "CampusPoliceDecision").equals("2")){
									stepResponse = "Rejected";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "CampusPoliceComments");
							} else {
								logger.error("actionTakenByPD value is not set in metadataMap");
							}
						}

					}
					
					if (stage.equals("ToInitiator")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorUserId");;
						stepName = "Initiator Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if(decisionFlag.equals("VPR")) {
								if (metaDataMap.containsKey("actionTakenByVP")) {
									//stepResponse = metaDataMap.get("actionTakenByVP").toString();
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "VPDecision").equals("1")) {
										stepResponse = "Approved";
									} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "VPDecision").equals("2")){
										stepResponse = "Rejected";
									}
								} else {
									logger.error("actionTakenByVP value is not set in metadataMap");
								}
							}
							if(decisionFlag.equals("RMR")) {
								if (metaDataMap.containsKey("actionTakenByRM")) {
									//stepResponse = metaDataMap.get("actionTakenByRM").toString();
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "RiskMgmtDecision").equals("1")) {
										stepResponse = "Approved";
									} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "RiskMgmtDecision").equals("2")){
										stepResponse = "Rejected";
									}
								} else {
									logger.error("actionTakenByRM value is not set in metadataMap");
								}
							}
							if(decisionFlag.equals("CPR")) {
								if (metaDataMap.containsKey("actionTakenByPD")) {
									//stepResponse = metaDataMap.get("actionTakenByPD").toString();
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "CampusPoliceDecision").equals("1")) {
										stepResponse = "Approved";
									} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "CampusPoliceDecision").equals("2")){
										stepResponse = "Rejected";
									}
								} else {
									logger.error("actionTakenByPD value is not set in metadataMap");
								}
							}
							
						} else {
							if (metaDataMap.containsKey("actionTakenByInitiator")) {
								stepResponse = metaDataMap.get("actionTakenByInitiator").toString();
								//comments = XMLUtils.getChildNodeContent(afBoundDataElement, "CampusPoliceComments");
							} else {
								logger.error("actionTakenByInitiator value is not set in metadataMap");
							}
						}

					}

					if (paramsValue.equalsIgnoreCase("Before Assign Task")) {
						stepType = "STEPSTART";
						stepCompleteTime = null;

					}
					if (paramsValue.equalsIgnoreCase("After Assign Task")) {
						stepType = "STEPEND";
						stepCompleteTime = new java.sql.Timestamp(System.currentTimeMillis());
						stepStartTime = null;
					}

					dataMap = new LinkedHashMap<String, Object>();
					dataMap.put("WORKFLOW_INSTANCE_ID", wfInstanceID);
					dataMap.put("WORKITEM_ID", workItemID);
					dataMap.put("WORKFLOW_PAYLOAD", contentPath);
					dataMap.put("WORKFLOW_MODEL_NAME", workflowModelName);
					dataMap.put("CWID", cwid);
					dataMap.put("STEP_START_TIME", stepStartTime);
					dataMap.put("WORKFLOW_INITIATOR", workflowInitiator);
					dataMap.put("ASSIGNEE", assignee);
					dataMap.put("STEP_COMPLETE_TIME", stepCompleteTime);
					dataMap.put("STEP_TYPE", stepType);
					dataMap.put("STEP_RESPONSE", stepResponse);
					dataMap.put("STEP_NAME", stepName);
					dataMap.put("COMMENTS", comments);
					if (conn != null) {
						logger.info("Connection Successfull");
						DatabaseUtils.insertWFHistory(conn, dataMap);
					}
				}
			}
		} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			logger.error(Arrays.toString(e.getStackTrace()));
		} finally {
			doc = null;
			if (null != is) {
				try {
					is.close();
				} catch (IOException e) {
					logger.error(Arrays.toString(e.getStackTrace()));
				}
			}
		}

	}

}
