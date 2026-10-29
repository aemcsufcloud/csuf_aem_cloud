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
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "= Designation Form Workflow History",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "= Designation WF History" })
public class DesignationWFHistoryDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(DesignationWFHistoryDB.class);

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
		String workflowName = "Designation University Cash Collection Point";
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
		String formName = "Designation As University Cash Collection Point";
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
					cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "Cwid");
					String stage = XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator");
					caseId = XMLUtils.getChildNodeContent(afBoundDataElement, "CaseId");

					if (stage.equals("ToController")) {
						assignee = "Controller-Reviewers";
						stepName = "Controller Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "Comments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByDirector")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "DirectorSFSDecision")
										.equals("1")) {
									stepResponse = "Approved";
								} else {
									stepResponse = "Denied";
								}
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByController")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "ControllerDecision")
										.equals("1")) {
									stepResponse = "Approved";
								} else {
									stepResponse = "Denied";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "ControllerComments");
								log.debug("Contoller Comments :{}", comments);

							} else {
								log.error("actionTakenByController value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToDirectorSFS")) {
						assignee = "Director SFS Reviewers";
						stepName = "Director Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "Comments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByCashHandlerTwo")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "CashHandlingPersonnelTwoDecision")
										.equals("1")) {
									stepResponse = "Approved";
								} else {
									stepResponse = "Denied";
								}
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByDirector")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "DirectorSFSDecision")
										.equals("1")) {
									stepResponse = "Approved";
								} else {
									stepResponse = "Denied";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "DirectorSFScomments");
								log.debug("Director Comments :{}", comments);

							} else {
								log.error("actionTakenByDirector value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToCashHandlingPersonnelTwo")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "CashHandlingPersonnelTwoUserId");
						stepName = "Cash Handling Personnel Two Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "Comments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByCashHandlerOne")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "CashHandlingPersonnelOneDecision")
										.equals("1")) {
									stepResponse = "Approved";
								} else {
									stepResponse = "Denied";
								}
							}

						} else {
							if (metaDataMap.containsKey("actionTakenByCashHandlerTwo")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "CashHandlingPersonnelTwoDecision")
										.equals("1")) {
									stepResponse = "Approved";
								} else {
									stepResponse = "Denied";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement,
										"CashHandlingPersonnelTwoComments");
								log.debug("CashHandlingPersonnelTwo Comments:{}", comments);

							} else {
								log.error("actionTakenByCashHandlerTwo value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToCashHandlingPersonnelOne")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "CashHandlingPersonnelOneUserId");
						stepName = "Cash Handling Personnel One Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "Comments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByResponsibleManager")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "ResponsibleManagerDecision")
										.equals("1")) {
									stepResponse = "Approved";
								} else {
									stepResponse = "Denied";
								}
							}

						} else {
							if (metaDataMap.containsKey("actionTakenByCashHandlerOne")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "CashHandlingPersonnelOneDecision")
										.equals("1")) {
									stepResponse = "Approved";
								} else {
									stepResponse = "Denied";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement,
										"CashHandlingPersonnelOneComments");
								log.debug("CashHandlingPersonnelOne Comments:{}", comments);

							} else {
								log.error("actionTakenByCashHandlerOne value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToResponsibleManager")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "ResponsibleManagerUserId");
						stepName = "Responsible Manager Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "Comments");
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							stepResponse = "Submit";
						} else {
							if (metaDataMap.containsKey("actionTakenByResponsibleManager")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "ResponsibleManagerDecision")
										.equals("1")) {
									stepResponse = "Approved";
								} else {
									stepResponse = "Denied";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement,
										"ResponsibleManagerComments");
								log.debug("ResponsibleManagerComments Comments:{}", comments);

							} else {
								log.error("actionTakenByResponsibleManager value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToInitiator")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorUserId");
						stepName = "Initiator Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByResponsibleManager")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "ResponsibleManagerDecision")
										.equals("1")) {
									stepResponse = "Approved";
								} else {
									stepResponse = "Denied";
								}
							} else if (metaDataMap.containsKey("actionTakenByCashHandlerOne")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "CashHandlingPersonnelOneDecision")
										.equals("1")) {
									stepResponse = "Approved";
								} else {
									stepResponse = "Denied";
								}
							} else if (metaDataMap.containsKey("actionTakenByCashHandlerTwo")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "CashHandlingPersonnelTwoDecision")
										.equals("1")) {
									stepResponse = "Approve";
								} else {
									stepResponse = "Denied";
								}

							} else if (metaDataMap.containsKey("actionTakenByDirector")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "DirectorSFSDecision")
										.equals("1")) {
									stepResponse = "Approved";
								} else {
									stepResponse = "Denied";
								}
							} else if (metaDataMap.containsKey("actionTakenByController")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "ControllerDecision")
										.equals("1")) {
									stepResponse = "Approved";
								} else {
									stepResponse = "Denied";
								}

							} else {
								log.error(
										"actionTakenByResponsibleManager & actionTakenByCashHandlerOne & actionTakenByCashHandlerTwo & actionTakenByDirector & actionTakenByController value is not set in metadataMap");
							}

						} else {
							if (metaDataMap.containsKey("actionTakenByInitiator")) {
								stepResponse = metaDataMap.get("actionTakenByInitiator").toString();
							} else {
								log.error("actionTakenByInitiator value is not set in metadataMap");
							}
						}
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorComments");
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
		String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		try (Connection conn = jdbcConnectionService.getDBConn(dataSourceVal);) {
			if (conn != null) {
				log.info("Connection Successfull");
				DatabaseUtils dbUtil = new DatabaseUtils();
				dbUtil.insertFormData(conn, dataMap, tableName, formName);
			}
		} catch (SQLException e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
	}
}
