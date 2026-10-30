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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Save TDA Exception Form UG Workflow Step History",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "= TDA Exception Form UG Workflow Step History" })
public class TDAExceptionFormUGWFHistoryDB implements WorkflowProcess {

	private static final Logger logger = LoggerFactory.getLogger(TDAExceptionFormUGWFHistoryDB.class);

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
		String atceDecisionFlag = "";
		String tdaDecisionFlag = "";
		String workflowStatus = "";

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
				caseID = XMLUtils.getChildNodeContent(afBoundDataElement, "RequestID");

				if (metaDataMap.containsKey("workflowStatus")) {
					workflowStatus = metaDataMap.get("workflowStatus").toString();
				} else {
					logger.error("workflowStatus is not available in metadata map");
				}

				atceDecisionFlag = XMLUtils.getChildNodeContent(afBoundDataElement, "ATCEDecisionFlag");
				tdaDecisionFlag = XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecisionFlag");

				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					String stage = XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator");

					if (stage.equals("ToATCE")) {
						assignee = "ATCE Reviewers";
						stepName = "ATCE Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (workflowStatus.equals("FromTDA")) {
								if (metaDataMap.containsKey("actionTakenByTDA")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecision").equals("3")) {
										stepResponse = "Send to ATCE Reviewers";
									}
								} else {
									logger.error("actionTakenByTDA value is not set in metadataMap");
								}
							} else {
								stepResponse = "Submit";
							}

						} else {
							if (metaDataMap.containsKey("actionTakenByATCE")) {
								stepResponse = metaDataMap.get("actionTakenByATCE").toString();
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "ATCEComment");
							} else {
								logger.error("actionTakenByATCE value is not set in metadataMap");
							}
						}

					}

					if (stage.equals("ToTDA")) {
						assignee = "TDA Reviewers";
						stepName = "TDA Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (workflowStatus.equals("FromATCE")) {
								if (metaDataMap.containsKey("actionTakenByATCE")) {
									stepResponse = "Send to TDA";
								} else {
									logger.error("actionTakenByATCE value is not set in metadataMap");
								}
							} else if (workflowStatus.equals("FromInitiator")) {
								if (metaDataMap.containsKey("actionTakenByInitiator")) {
									stepResponse = "Send to TDA";
								} else {
									logger.error("actionTakenByInitiator value is not set in metadataMap");
								}
							} else if (workflowStatus.equals("FromGrad")) {
								if (metaDataMap.containsKey("actionTakenByOfficeGrad")) {
									stepResponse = "Send to TDA";
								} else {
									logger.error("actionTakenByOfficeGrad value is not set in metadataMap");
								}
							} else if (workflowStatus.equals("FromDean")) {
								if (metaDataMap.containsKey("actionTakenByDean")) {
									stepResponse = "Send to TDA";
								} else {
									logger.error("actionTakenByDean value is not set in metadataMap");
								}
							} else {
								stepResponse = "Submit";
							}

						} else {
							if (metaDataMap.containsKey("actionTakenByTDA")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecision").equals("1")) {
									stepResponse = "Approved";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecision")
										.equals("2")) {
									stepResponse = "Send back to Initiator";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecision")
										.equals("3")) {
									stepResponse = "Send to ATCE Reviewers";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecision")
										.equals("4")) {
									stepResponse = "Send to Office of Graduate Reviewers";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecision")
										.equals("5")) {
									stepResponse = "Send to Associate Dean/Faculty";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "TDAComment");
							} else {
								logger.error("actionTakenByTDA value is not set in metadataMap");
							}
						}

					}

					if (stage.equals("ToOfficeGrad")) {
						assignee = "TDA-Grad Studies Office Reviewers";
						stepName = "Graduate Studies Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (workflowStatus.equals("FromTDA")) {
								if (metaDataMap.containsKey("actionTakenByTDA")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecision").equals("4")) {
										stepResponse = "Send to Office of Graduate Reviewers";
									}
								} else {
									logger.error("actionTakenByTDA value is not set in metadataMap");
								}
							} else {
								stepResponse = "Submit";
							}

						} else {
							if (metaDataMap.containsKey("actionTakenByOfficeGrad")) {
								stepResponse = metaDataMap.get("actionTakenByOfficeGrad").toString();
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "OfficeGradComment");
							} else {
								logger.error("actionTakenByInitiator value is not set in metadataMap");
							}
						}

					}

					if (stage.equals("ToInitiator")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "FacultyUserID");
						stepName = "Initiator Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (workflowStatus.equals("FromTDA")) {
								if (metaDataMap.containsKey("actionTakenByTDA")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecision").equals("2")) {
										stepResponse = "Send back to Initiator";
									}
								} else {
									logger.error("actionTakenByTDA value is not set in metadataMap");
								}
							} else {
								stepResponse = "Submit";
							}

						} else {
							if (metaDataMap.containsKey("actionTakenByInitiator")) {
								stepResponse = metaDataMap.get("actionTakenByInitiator").toString();
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "InitiatorComments");
							} else {
								logger.error("actionTakenByInitiator value is not set in metadataMap");
							}
						}

					}
					
					if (stage.equals("ToDean")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "DeanUserID");
						stepName = "Associate Dean/Faculty Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (workflowStatus.equals("FromTDA")) {
								if (metaDataMap.containsKey("actionTakenByTDA")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecision").equals("5")) {
										stepResponse = "Send to Associate Dean/Faculty";
									}
								} else {
									logger.error("actionTakenByTDA value is not set in metadataMap");
								}
							} else {
								stepResponse = "Submit";
							}

						} else {
							if (metaDataMap.containsKey("actionTakenByDean")) {
								stepResponse = metaDataMap.get("actionTakenByDean").toString();
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "DeanComments");
							} else {
								logger.error("actionTakenByDean value is not set in metadataMap");
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
					dataMap.put("CASE_ID", caseID);
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
