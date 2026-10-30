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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Save HR ARF Workflow History",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=Save HR ARF Workflow History" })
public class HRARFWFHistoryDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(HRARFWFHistoryDB.class);

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;
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
		String workflowName = "HR Access Request Form";
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
		String formName = "HR Access Request Form";
		String wId = workflowID.replace("VolatileWorkItem_", "/workItems/");
		workflowInstance = workItem.getWorkflow().getId();
		payloadPath = workItem.getWorkflowData().getPayload().toString();
		MetaDataMap metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();

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
					cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "EmployeeID");
					caseId = XMLUtils.getChildNodeContent(afBoundDataElement, "CaseID");
					String stage = XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator");
					if (stage.equals("ToManager")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "ManagerUserID");
						stepName = "Manager Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "AdministratorComments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							stepResponse = "Submit";
						} else {
							if (metaDataMap.containsKey("actionTakenByManager")) {
								stepResponse = metaDataMap.get("actionTakenByManager").toString();
							} else {
								log.error("actionTakenByManager value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToEmployee")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "EmployeeUserID");
						stepName = "Employee Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "EmployeeComments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByManager")) {
								stepResponse = metaDataMap.get("actionTakenByManager").toString();
							} else {
								log.error("actionTakenByManager value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByEmployee")) {
								stepResponse = metaDataMap.get("actionTakenByEmployee").toString();
							} else {
								log.error("actionTakenByEmployee value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToRequestor")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorUseId");
						stepName = "Requestor Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorComments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							stepResponse = "Send Back to Requestor";
						} else {
							if (metaDataMap.containsKey("actionTakenByRequestor")) {
								stepResponse = metaDataMap.get("actionTakenByRequestor").toString();
							} else {
								log.error("actionTakenByRequestor value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToBusinessAnalyst")) {
						assignee = "Business-Analyst-Reviewers";
						stepName = "Business Analyst Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "BusinessAnalystComments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByEmployee")) {
								stepResponse = metaDataMap.get("actionTakenByEmployee").toString();
							} else {
								log.error("actionTakenByEmployee value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByBusinessAnalyst")) {
								stepResponse = metaDataMap.get("actionTakenByBusinessAnalyst").toString();
							} else {
								log.error("actionTakenByBusinessAnalyst value is not set in metadataMap");
							}
						}
					}
					if (stage.equals("ToTrainer")) {
						assignee = "Trainer-Reviewers";
						stepName = "Trainer Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "TrainerComments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							stepResponse = "Submit";
						} else {
							if (metaDataMap.containsKey("actionTakenByTrainer")) {
								stepResponse = metaDataMap.get("actionTakenByTrainer").toString();
							} else {
								log.error("actionTakenByTrainer value is not set in metadataMap");
							}
						}
					}
					if (stage.equals("ToFAR")) {
						assignee = "FAR-Reviewers";
						stepName = "HRDI Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "FARComments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							stepResponse = "Submit";
						} else {
							if (metaDataMap.containsKey("actionTakenByFAR")) {
								stepResponse = metaDataMap.get("actionTakenByFAR").toString();
							} else {
								log.error("actionTakenByFAR value is not set in metadataMap");
							}
						}
					}
					if (stage.equals("ToFilenet")) {
						assignee = "Filenet-Reviewers";
						stepName = "Filenet Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "FilenetComments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							stepResponse = "Submit";
						} else {
							if (metaDataMap.containsKey("actionTakenByFilenet")) {
								stepResponse = metaDataMap.get("actionTakenByFilenet").toString();
							} else {
								log.error("actionTakenByFilenet value is not set in metadataMap");
							}
						}
					}
					if (stage.equals("ToSecurityAdminFromTrainer") || stage.equals("ToSecurityAdminFromISO")
							|| stage.equals("ToSecurityAdminFromCISO") || stage.equals("ToSecurityAdminFromTimer")) {
						assignee = "Security Admin Review";
						stepName = "Security-Admin-Reviewers";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "SecurityAdminComments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenISOAdmin")) {
								stepResponse = metaDataMap.get("actionTakenISOAdmin").toString();
							} else if (metaDataMap.containsKey("actionTakenByCISO")) {
								stepResponse = metaDataMap.get("actionTakenByCISO").toString();
							} else {
								stepResponse = "Submit";
							}
						} else {
							stepResponse = "Submit";
						}
					}
					if (stage.equals("ToISO")) {
						assignee = "ISO-Admin-Reviewers";
						stepName = "ISO Admin Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "ISOAdminAnalystComments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							stepResponse = "Submit";
						} else {
							if (metaDataMap.containsKey("actionTakenISOAdmin")) {
								stepResponse = metaDataMap.get("actionTakenISOAdmin").toString();
							} else {
								log.error("actionTakenISOAdmin value is not set in metadataMap");
							}
						}
					}
					if (stage.equals("ToCISO")) {
						assignee = "CISO-Admin-Reviewers";
						stepName = "CISO Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "CISOAdminComments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenISOAdmin")) {
								stepResponse = metaDataMap.get("actionTakenISOAdmin").toString();
							} else {
								log.error("actionTakenISOAdmin value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByCISO")) {
								stepResponse = metaDataMap.get("actionTakenByCISO").toString();
							} else {
								log.error("actionTakenByCISO value is not set in metadataMap");
							}
						}
					}
					if (stage.equals("ToCompleteQueue")) {
						assignee = "Administrator";
						stepName = "Complete Step";
						stepResponse = "Submit";
					}
				}
			}
		} catch (SAXException | IOException | ParserConfigurationException | RepositoryException e) {
			e.printStackTrace();
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
