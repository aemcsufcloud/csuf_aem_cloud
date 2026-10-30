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

@Component(property = {
		Constants.SERVICE_DESCRIPTION + "= Authorization Vehicle University Business Form External Workflow History",
		Constants.SERVICE_VENDOR + "=Adobe Systems",
		"process.label" + "= Authorization Vehicle University Business External WF History" })
public class AuthorizationUniversityBusinessExternalWFHistoryDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(AuthorizationUniversityBusinessExternalWFHistoryDB.class);

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;
	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();

		String paramsValue = ((String) processArguments.get("PROCESS_ARGS", "string")).toString();
		LinkedHashMap<String, Object> dataMap = null;
		String workflowInstance = "";
		String workflowInitiator = "";
		String workflowModelName = "";
		String workflowName = "Authorization Drive Vehicle University Business External Form";
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
		String workflowID = workItem.getId();
		String tableName = "AEM_WORKFLOW_HISTORY";
		String formName = "Authorization Drive Vehicle University Business External Form";
		String wId = workflowID.replace("VolatileWorkItem_", "/workItems/");
		workflowInstance = workItem.getWorkflow().getId();
		workflowModelName = workItem.getWorkflow().getWorkflowModel().getId();
		payloadPath = workItem.getWorkflowData().getPayload().toString();
		MetaDataMap metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		log.info("MetaDataMap=====" + metaDataMap);

		if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
			stepCompleteTime = null;
			stepType = "STEPSTART";
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
			String firstStr = wId.substring(0, wId.indexOf('_'));
			String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
			String t1 = firstStr.replaceAll("[^0-9]+", "");
			int a1 = Integer.parseInt(t1);
			a1--;
			firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
			workItemId = workflowInstance.concat(firstStr).concat("_").concat(secString);
			stepCompleteTime = new java.sql.Timestamp(System.currentTimeMillis());
		}

		try {
			InputStream inputStream = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");
			if (null != inputStream) {
				Document document = XMLUtils.getDomDocument(inputStream);
				Element afBoundUnBoundDataElement = XMLUtils.getParentNode(document, "afUnboundData");
				if (null != afBoundUnBoundDataElement && afBoundUnBoundDataElement.hasChildNodes()) {
					workflowInitiator = XMLUtils.getChildNodeContent(afBoundUnBoundDataElement, "workflow_initiator");
				}
				Element afBoundDataElement = XMLUtils.getParentNode(document, "afBoundData");
				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "CWID");
					String stage = XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator");
					caseId = XMLUtils.getChildNodeContent(afBoundDataElement, "CaseId");

					if (stage.equals("ToRisk")) {
						assignee = "Risk-Management-Reviewers";
						stepName = "Risk Management Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "Comments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							stepResponse = "Submit";
						} else {
							if (metaDataMap.containsKey("actionTakenByRisk")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "RiskDecision").equals("1")) {
									stepResponse = "Approved";
								}
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "RiskDecision").equals("2")) {
									stepResponse = "Denied";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "riskComment");
								log.debug("Risk Management Comments :{}", comments);

							} else {
								log.error("actionTakenByRisk value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToSupervisor")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "SupervisorUsedId");
						stepName = "Supervisor Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "Comments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							stepResponse = "Submit";
						} else {
							if (metaDataMap.containsKey("actionTakenBySupervisor")) {
								stepResponse = "Submit";
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "SupervisorComment");
								log.debug("Supervisor Comment:{}", comments);

							} else {
								log.error("actionTakenBySupervisor value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToInitiator")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorUserID");
						stepName = "Initiator Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenBySupervisor")) {
								stepResponse = "Submit";
							} else if (metaDataMap.containsKey("actionTakenByRisk")) {
								stepResponse = "Submit";

							} else {
								log.error(
										"actionTakenByRisk & actionTakenBySupervisor value is not set in metadataMap");
							}

						} else {
							if (metaDataMap.containsKey("actionTakenByInitiator")) {
								stepResponse = metaDataMap.get("actionTakenByInitiator").toString();
							} else {
								log.error("actionTakenByInitiator value is not set in metadataMap");
							}
						}
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "DriverComment");
					}

				}
			}
		} catch (SAXException | IOException | ParserConfigurationException |

				RepositoryException e) {
			e.printStackTrace();
		}

		dataMap = new LinkedHashMap<String, Object>();
		dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstance);
		dataMap.put("WORKITEM_ID", workItemId);
		dataMap.put("WORKFLOW_PAYLOAD", payloadPath);
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
		/*String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		try (Connection conn = jdbcConnectionService.getDBConn(dataSourceVal);) {
			if (conn != null) {
				log.info("Connection Successfull");
				DatabaseUtils dbUtil = new DatabaseUtils();
				dbUtil.insertFormData(conn, dataMap, tableName, formName);
			}
		} catch (SQLException e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}*/
		try {
			CloudDbSaveUtil.saveWorkflowHistory(paramsValue, dataMap);
		} catch (IOException ioException) {
			log.error("IOException saving WF history: " + ioException.getMessage());
		}
	}
}
