package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Save Parental Consent AI Workflow Step History",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=Parental Consent AI Workflow Step History" })
public class ParentalConsentAIWFHistoryDB implements WorkflowProcess {

	private static final Logger logger = LoggerFactory.getLogger(ParentalConsentAIWFHistoryDB.class);

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
		String workflowInstance = "";
		String workItemId = "";
		String cwid = "";
		String caseID = "";
		String stepResponse = "";
		String stepType = "";
		String stepName = "";
		String assignee = "";
		String workflowID = workItem.getId();
		String comments = "";
		Timestamp stepCompleteTime = null;
		Timestamp stepStartTime = null;

		String wfInstanceID = workItem.getWorkflow().getId();
		workflowModelName = workItem.getWorkflow().getWorkflowModel().getId();
		MetaDataMap metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();

		String wId = workflowID.replace("VolatileWorkItem_", "/workItems/");
		String workItemID = "";
		// workItemId = workflowInstance.concat(firstStr).concat("_").concat(secString);

		if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
			stepCompleteTime = null;
			stepType = "STEPSTART";
			stepName = "Send Email to Student";
			String firstStr = wId.substring(0, wId.indexOf('_'));
			String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
			String t1 = firstStr.replaceAll("[^0-9]+", "");
			int a1 = Integer.parseInt(t1);
			a1++;
			firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
			workItemId = workflowInstance.concat(firstStr).concat("_").concat(secString);
			stepStartTime = new java.sql.Timestamp(System.currentTimeMillis());
		}

		if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("After")) {
			stepStartTime = null;
			stepType = "STEPEND";
			stepName = "Send Final Approve Email";
			String firstStr = wId.substring(0, wId.indexOf('_'));
			String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
			String t1 = firstStr.replaceAll("[^0-9]+", "");
			int a1 = Integer.parseInt(t1);
			a1--;
			firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
			workItemId = workflowInstance.concat(firstStr).concat("_").concat(secString);
			stepCompleteTime = new java.sql.Timestamp(System.currentTimeMillis());
		}

		String contentPath = workItem.getContentPath();
		// Timestamp stepStartTime = new java.sql.Timestamp(System.currentTimeMillis());
		// stepCompleteTime = new java.sql.Timestamp(System.currentTimeMillis());
		String workflowInitiator = null;
		stepResponse = "Submit";
		/*
		 * stepType = "STEPEND"; String firstStr = wId.substring(0, wId.indexOf('_'));
		 * String secString = wId.substring(wId.indexOf('_') + 1, wId.length()); String
		 * t1 = firstStr.replaceAll("[^0-9]+", ""); int a1 = Integer.parseInt(t1); a1++;
		 * firstStr = firstStr.replaceAll(t1, String.valueOf(a1)); workItemId =
		 * workflowInstance.concat(firstStr).concat("_").concat(secString);
		 * stepStartTime = new java.sql.Timestamp(System.currentTimeMillis());
		 */
		try {
			is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, workItem.getContentPath(), "Data.xml");
			if (null != is) {
				doc = XMLUtils.getDomDocument(is);

				Element afUnBoundDataElement = XMLUtils.getParentNode(doc, "afUnboundData");
				if (null != afUnBoundDataElement && afUnBoundDataElement.hasChildNodes()) {
					workflowInitiator = XMLUtils.getChildNodeContent(afUnBoundDataElement, "workflow_initiator");
				}

				Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");
				cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "studentCwid");
				assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "parentName");

				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					caseID = XMLUtils.getChildNodeContent(afBoundDataElement, "caseId");

					dataMap = new LinkedHashMap<String, Object>();
					dataMap.put("WORKFLOW_INSTANCE_ID", wfInstanceID);
					dataMap.put("WORKITEM_ID", workItemId);
					dataMap.put("WORKFLOW_PAYLOAD", contentPath);
					dataMap.put("WORKFLOW_MODEL_NAME", workflowModelName);
					dataMap.put("CASE_ID", caseID);
					dataMap.put("CWID", cwid);
					dataMap.put("STEP_START_TIME", stepStartTime);
					dataMap.put("WORKFLOW_INITIATOR", workflowInitiator);
					dataMap.put("ASSIGNEE", assignee);
					dataMap.put("STEP_START_TIME", stepStartTime);
					dataMap.put("STEP_COMPLETE_TIME", stepCompleteTime);
					dataMap.put("STEP_TYPE", stepType);
					dataMap.put("STEP_NAME", stepName);
					dataMap.put("STEP_RESPONSE", stepResponse);
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
					logger.error("IO Exception in ParentalConsentAIWFHistoryDB " + Arrays.toString(e.getStackTrace()));
				}
			}

		}

	}

}
