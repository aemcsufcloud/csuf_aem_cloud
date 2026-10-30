package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Timestamp;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.sling.api.resource.Resource;
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
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Save Workflow History",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=Save Workflow History" })
public class SaveWorkflowHistory implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(SaveWorkflowHistory.class);

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;
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

		String paramsValue = ((String) processArguments.get("PROCESS_ARGS", "string")).toString();
		String[] parameters1 = paramsValue.split(",");
		String param1 = parameters1[0];
		String param2 = parameters1[1];
		String actionTaken = "";
		actionTaken = param2;
		LinkedHashMap<String, Object> dataMap = null;
		String workflowInstance = "";
		String workflowInitiator = "";
		String workflowName = "";
		String workItemId = "";
		String caseId = "";
		String cwid = "";
		Timestamp stepCompleteTime = null;
		Timestamp stepStartTime = null;
		String assignee = "";
		String stepType = "";
		String stepResponse = "";
		String stepName = "";
		String comments = "";
		String sendBackResponse = "";
		String expiryKeyVal = "";
		String workflowID = workItem.getId();
		String wId = workflowID.replace("VolatileWorkItem_", "/workItems/");
		workflowInstance = workItem.getWorkflow().getId();
		payloadPath = workItem.getWorkflowData().getPayload().toString();
		MetaDataMap metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();

		if (metaDataMap.containsKey("ExpiryKey")) {
			expiryKeyVal = metaDataMap.get("ExpiryKey").toString();
		} else {
			log.error("ExpiryKey value is not set in metadataMap");
		}
		if (expiryKeyVal.equals("true")) {
			if (metaDataMap.containsKey(actionTaken)) {
				stepResponse = metaDataMap.get(actionTaken).toString();
			} else {
				log.error("actionTaken value is not set in metadataMap");
			}

		} else {
			if (metaDataMap.containsKey(actionTaken)) {
				if (metaDataMap.containsKey("empAction")) {
					if (metaDataMap.get("empAction").toString() == "disagree") {
						sendBackResponse = "Disagree";
						if (param1.equalsIgnoreCase("Start of the Workflow Assign Step")) {
							metaDataMap.put("empAction", "true");
						}
					} else {
						sendBackResponse = "";
					}
				} else {
					log.error("empAction value is not set in metadataMap");
				}
				if (sendBackResponse.equals("Disagree")) {
					stepResponse = sendBackResponse;
				} else {
					stepResponse = metaDataMap.get(actionTaken).toString();
				}
			} else {
				log.error("actionTaken value is not set in metadataMap");
			}
		}
		if (expiryKeyVal.equals("true")) {	
			if (stepResponse.isEmpty()) {
				stepResponse = "Expired";
			}
		}
		workflowName = workItem.getWorkflow().getWorkflowModel().getId();
		stepStartTime = new java.sql.Timestamp(System.currentTimeMillis());	

		try {
			InputStream inputStream = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");
			if (null != inputStream) {
				Document document = XMLUtils.getDomDocument(inputStream);
				Element afBoundUnBoundDataElement = XMLUtils.getParentNode(document, "afUnboundData");
				if (null != afBoundUnBoundDataElement && afBoundUnBoundDataElement.hasChildNodes()) {
					workflowInitiator = XMLUtils.getChildNodeContent(afBoundUnBoundDataElement, "workflow_initiator");
					caseId = XMLUtils.getChildNodeContent(afBoundUnBoundDataElement, "caseId");
				}
				Element afBoundDataElement = XMLUtils.getParentNode(document, "afBoundData");
				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "EmpID");
					String stage = XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator");
					if (stage.equals("ToManager")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "ManagerUserID");
						stepName = "Manager Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "EvaluatorComment");

					}
					if (stage.equals("ToManagerAcknowledge")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "ManagerUserID");
						stepName = "Evaluation Final - Manager";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "EvaluatorComment");

					}
					if (stage.equals("ToManagerFinalAcknowledge")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "ManagerUserID");
						stepName = "Manager Final Evaluation";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "EvaluatorComment");

					}
					if (stage.equals("ToManagerAcknowledgeOnExpire")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "ManagerUserID");
						stepName = "Evaluation Final - Manager";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "EvaluatorComment");

					}
					if (stage.equals("ToManagerHRDI")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "ManagerUserID");
						stepName = "Manager HRIE Changes";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "EvaluatorComment");

					}
					if (stage.equals("ToHRCoo")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "HrCoordId");
						stepName = "HR Coordinator";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "HRCoordinatorSignComment");

					}
					if (stage.equals("ToEmployee")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "EmpUserID");
						stepName = "Employee Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "EmpComment");

					}
					if (stage.equals("ToEmployeeAck")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "EmpUserID");
						stepName = "Employee Acknowledgement";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "EmpComment");

					}
					if (stage.equals("ToAdmin")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "AdminUserID");
						stepName = "Appropriate Administrator Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "AdminComment");

					}
					if (stage.equals("ToHRDI")) {
						assignee = "HR-Reviewers";
						stepName = "HRIE Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "HRDIComment");
					}
				}
			}
		} catch (SAXException | IOException | ParserConfigurationException | RepositoryException e) {
			e.printStackTrace();
		} 

		if (param1.equalsIgnoreCase("Start of the Workflow Assign Step")) {
			stepCompleteTime = null;
			stepType = "STEPSTART";
			String firstStr = wId.substring(0, wId.indexOf('_'));
			String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
			String t1 = firstStr.replaceAll("[^0-9]+", "");
			int a1 = Integer.parseInt(t1);
			a1++;
			firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
			workItemId = workflowInstance.concat(firstStr).concat("_").concat(secString);
		}
		if (param1.equalsIgnoreCase("End of the Workflow Assign Step")) {
			stepCompleteTime = new java.sql.Timestamp(System.currentTimeMillis());
			stepType = "STEPEND";
			String firstStr = wId.substring(0, wId.indexOf('_'));
			String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
			String t1 = firstStr.replaceAll("[^0-9]+", "");
			int a1 = Integer.parseInt(t1);
			a1--;
			firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
			workItemId = workflowInstance.concat(firstStr).concat("_").concat(secString);
		}

		dataMap = new LinkedHashMap<String, Object>();
		dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstance);
		dataMap.put("WORKITEM_ID", workItemId);
		dataMap.put("WORKFLOW_PAYLOAD", payloadPath);
		dataMap.put("WORKFLOW_MODEL_NAME", workflowName);
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
		/*String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);
		if (conn != null) {
			log.info("Connection Successfull");
			DatabaseUtils.insertWFHistory(conn, dataMap);
		}*/
		try {
			CloudDbSaveUtil.saveFormData("AEM_WORKFLOW_HISTORY", "Workflow History", "", "", workflowInstance, dataMap,
					"STEP_START_TIME,STEP_COMPLETE_TIME");
		} catch (IOException ioException) {
			ioException.printStackTrace();
		}
	}

}
