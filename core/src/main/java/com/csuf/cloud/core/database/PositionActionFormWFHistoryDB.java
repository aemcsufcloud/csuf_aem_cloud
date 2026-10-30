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
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Save Position Action Form Workflow Step History",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=Position Action Form Workflow Step History" })
public class PositionActionFormWFHistoryDB implements WorkflowProcess {

	private static final Logger logger = LoggerFactory.getLogger(PositionActionFormWFHistoryDB.class);

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);

		/*String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();*/
		/*conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
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
				cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "AppropriateRequestorCWID");
				caseID = XMLUtils.getChildNodeContent(afBoundDataElement, "caseId");

				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					String stage = XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator");

					if (stage.equals("ToAppropriateRequestor")) {
						stepName = "Appropriate Requestor Review";
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "AppropriateRequestorUserId");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							stepResponse = "Send Back to Appropriate Requestor";
						} else {
							if (metaDataMap.containsKey("actionTakenByAppropriateRequestor")) {
								stepResponse = metaDataMap.get("actionTakenByAppropriateRequestor").toString();
								comments = XMLUtils.getChildNodeContent(afBoundDataElement,
										"AppropriateRequestorComments");
							} else {
								logger.error("actionTakenByAppropriateRequestor value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToAppropriateApprover")) {
						stepName = "Appropriate Approver Review";
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "AppropriateApproverUserId");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("AssignTaskActionTaken")) {
								stepResponse = metaDataMap.get("AssignTaskActionTaken").toString();
							} else {
								logger.error("AssignTaskActionTaken value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByAppropriateApprover")) {
								stepResponse = metaDataMap.get("actionTakenByAppropriateApprover").toString();
							} else if (metaDataMap.containsKey("actionTakenByAppropriateReqApprover")) {
								stepResponse = metaDataMap.get("actionTakenByAppropriateReqApprover").toString();
							} else {
								logger.error("AppropriateApproverTaskActionTaken value is not set in metadataMap");
							}
							comments = XMLUtils.getChildNodeContent(afUnBoundDataElement, "AppropriateApproverComment");
						}
					}
					
					if (stage.equals("ToAppropriateReviewer")) {
						stepName = "Appropriate Reviewer Review";
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "AppropriateReviewerUserId");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("AssignTaskActionTaken")) {
								stepResponse = metaDataMap.get("AssignTaskActionTaken").toString();
							} else {
								logger.error("AssignTaskActionTaken value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByAppropriateReviewer")) {
								stepResponse = metaDataMap.get("actionTakenByAppropriateReviewer").toString();
								comments = XMLUtils.getChildNodeContent(afUnBoundDataElement,
										"AppropriateReviewerComment");
							} else {
								logger.error("actionTakenByAppropriateReviewer value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToAcademicAffairs")) {
						stepName = "Academic Affairs Review";
						assignee = "Academic-Affairs-Reviewers";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("AssignTaskActionTaken")) {
								stepResponse = metaDataMap.get("AssignTaskActionTaken").toString();
							} else {
								logger.error("AssignTaskActionTaken value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByAcademicAffairsReviewers")) {
								stepResponse = metaDataMap.get("actionTakenByAcademicAffairsReviewers").toString();
								comments = XMLUtils.getChildNodeContent(afUnBoundDataElement, "AcademicAffairsComment");
							} else {
								logger.error("actionTakenByAcademicAffairsReviewers value is not set in metadataMap");
							}
						}
					}
					
					if (stage.equals("ToCompensationServices")) {
						stepName = "Compensation Services Review";
						assignee = "Compensation-Services-Reviewers";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("AssignTaskActionTaken")) {
								stepResponse = metaDataMap.get("AssignTaskActionTaken").toString();
							} else {
								logger.error("AssignTaskActionTaken value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByCompensationServicesAcademic")) {
								stepResponse = metaDataMap.get("actionTakenByCompensationServicesAcademic").toString();
							} else if (metaDataMap.containsKey("actionTakenByCompensationServicesDirect")) {
								stepResponse = metaDataMap.get("actionTakenByCompensationServicesDirect").toString();
							} else if (metaDataMap.containsKey("actionTakenByAACompensationServicesAA")) {
								stepResponse = metaDataMap.get("actionTakenByAACompensationServicesAA").toString();
							} else {
								logger.error("CompensationTaskActionTaken value is not set in metadataMap");
							}
							comments = XMLUtils.getChildNodeContent(afUnBoundDataElement, "CompensationServicesComment");
						}
					}

					if (stage.equals("ToPositionManagement")) {
						stepName = "Position Management Review";
						assignee = "Position-Management-Reviewers";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("AssignTaskActionTaken")) {
								stepResponse = metaDataMap.get("AssignTaskActionTaken").toString();
							} else {
								logger.error("AssignTaskActionTaken value is not set in metadataMap");
							}
						} else {
							if(metaDataMap.get("PositionManagementTaskActionTaken") != null) {
								stepResponse = metaDataMap.get("PositionManagementTaskActionTaken").toString();
							} else if (metaDataMap.containsKey("actionTakenByPositionManagementReviewersPO")) {
								stepResponse = metaDataMap.get("actionTakenByPositionManagementReviewersPO").toString();
							} else if (metaDataMap.containsKey("actionTakenByPositionManagementReviewersMPPPO")) {
								stepResponse = metaDataMap.get("actionTakenByPositionManagementReviewersMPPPO").toString();
							} else if (metaDataMap.containsKey("actionTakenByPositionManagementDirect")) {
								stepResponse = metaDataMap.get("actionTakenByPositionManagementDirect").toString();
							} else if (metaDataMap.containsKey("actionTakenByPositionManagementMPPDirect")) {
								stepResponse = metaDataMap.get("actionTakenByPositionManagementMPPDirect").toString();
							} else {
								logger.error("PositionManagementTaskActionTaken value is not set in metadataMap");
							}
							comments = XMLUtils.getChildNodeContent(afUnBoundDataElement, "PositionManagementComment");
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
					dataMap.put("CASE_ID", caseID);
					dataMap.put("STEP_START_TIME", stepStartTime);
					dataMap.put("WORKFLOW_INITIATOR", workflowInitiator);
					dataMap.put("ASSIGNEE", assignee);
					dataMap.put("STEP_COMPLETE_TIME", stepCompleteTime);
					dataMap.put("STEP_TYPE", stepType);
					dataMap.put("STEP_RESPONSE", stepResponse);
					dataMap.put("STEP_NAME", stepName);
					dataMap.put("COMMENTS", comments);
					/*if (conn != null) {
						logger.info("Connection Successfull");
						DatabaseUtils.insertWFHistory(conn, dataMap);
					}*/
					try {
						CloudDbSaveUtil.saveWorkflowHistory(paramsValue, dataMap);
					} catch (IOException ioException) {
						logger.error("IOException saving WF history: " + ioException.getMessage());
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
