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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Save MPP Justification Workflow Step History",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=MPP Justification WF Step History" })
public class MPPJustificationWFHistoryDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(MPPJustificationWFHistoryDB.class);

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
		log.debug("paramsnew=======" + paramsValue);

		LinkedHashMap<String, Object> dataMap = null;

		Document doc = null;
		InputStream is = null;

		String workflowModelName = "";
		String cwid = StringUtils.EMPTY;
		String stepResponse = "";
		String stepType = "";
		String stepName = "";
		String assignee = "";
		String comments = "";
		String workflowStatus = "";
		Timestamp stepCompleteTime = null;

		String wfInstanceID = workItem.getWorkflow().getId();
		workflowModelName = workItem.getWorkflow().getWorkflowModel().getId();
		String workflowID = workItem.getId();
		MetaDataMap metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();

		String wId = workflowID.replace("VolatileWorkItem_", "/workItems/");
		String workItemID = "";
		log.info("Workflow item Id==" + wId);
		if (paramsValue.equalsIgnoreCase("Before Assign Task")) {
			log.debug("param1 before step=" + paramsValue);
			String firstStr = wId.substring(0, wId.indexOf('_'));
			String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
			String t1 = firstStr.replaceAll("[^0-9]+", "");
			int a1 = Integer.parseInt(t1);
			a1++; // Process step is one step behind the Assign task, so
					// increment it.
			firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
			workItemID = wfInstanceID.concat(firstStr).concat("_").concat(secString);
			log.debug("Final workItemID ==" + workItemID);
		}

		if (paramsValue.equalsIgnoreCase("After Assign Task")) {
			log.debug("param1 after step=" + paramsValue);
			String firstStr = wId.substring(0, wId.indexOf('_'));
			String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
			String t1 = firstStr.replaceAll("[^0-9]+", "");
			int a1 = Integer.parseInt(t1);
			a1--;// Process step is one step ahead the Assign task, so decrement
					// it.
			firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
			workItemID = wfInstanceID.concat(firstStr).concat("_").concat(secString);
			log.debug("Final workItemID==" + workItemID);
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
				cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "hidden_initiator_cwid");
				if (metaDataMap.containsKey("workflowStatus")) {
						workflowStatus = metaDataMap.get("workflowStatus").toString();
				}else {
					log.error("workflowStatus is not available in metadata map");
				}
				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					String stage = XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator");
		
					if (stage.equalsIgnoreCase("ToMPPSupervisor")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "hidden_mppSupervisor_userID");
						stepName = "MPP Supervisor Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							stepResponse = "Submit";
						} else {
							if (metaDataMap.containsKey("actionTakenByMPPSupervisor")) {
								stepResponse = metaDataMap.get("actionTakenByMPPSupervisor").toString();
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "mpp_supervisor_comment");
							} else {
								log.error("actionTakenByMPPSupervisor value is not set in metadataMap");
							}
						}
					}

					if (stage.equalsIgnoreCase("ToAppropriateAdmin")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "hidden_admin_userID");
						stepName = "Appropriate Admin Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByMPPSupervisor")) {
								stepResponse = metaDataMap.get("actionTakenByMPPSupervisor").toString();
							} else {
								log.error("actionTakenByMPPSupervisor value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByAppropriateAdmin")) {
								stepResponse = metaDataMap.get("actionTakenByAppropriateAdmin").toString();
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "appropriate_admin_comment");
							} else {
								log.error("actionTakenByAppropriateAdmin value is not set in metadataMap");
							}
						}
					}

					if (stage.equalsIgnoreCase("ToVP")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "hidden_vp_userID");
						stepName = "VP Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByAppropriateAdmin")) {
								stepResponse = metaDataMap.get("actionTakenByAppropriateAdmin").toString();
							} else {
								log.error("actionTakenByAppropriateAdmin value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByVicePresident")) {
								stepResponse = metaDataMap.get("actionTakenByVicePresident").toString();
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "vp_comment");
							} else {
								log.error("actionTakenByVicePresident value is not set in metadataMap");
							}
						}
					}

					if (stage.equalsIgnoreCase("ToCompServices")) {
						assignee = "HR-Compensation-Reviewer";
						stepName = "Compensation Services Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByVicePresident")) {
								stepResponse = metaDataMap.get("actionTakenByVicePresident").toString();
							} else {
								log.error("actionTakenByVicePresident value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByCompensationServices")) {
								stepResponse = metaDataMap.get("actionTakenByCompensationServices").toString();
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "reviewe_by_comment");
							} else {
								log.error("actionTakenByCompensationServices value is not set in metadataMap");
							}
						}
					}

					if (stage.equalsIgnoreCase("ToCampusDesignee")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "hidden_designee_userID");
						stepName = "Campus Designee Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByCompensationServices")) {
								stepResponse = metaDataMap.get("actionTakenByCompensationServices").toString();
							} else {
								log.error("actionTakenByCompensationServices value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByCampusDesignee")) {
								stepResponse = metaDataMap.get("actionTakenByCampusDesignee").toString();
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "campus_designee_comment");
							} else {
								log.error("actionTakenByCampusDesignee value is not set in metadataMap");
							}
						}
					}

					if (stage.equalsIgnoreCase("ToInitiator")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "hidden_initiator_userID");
						stepName = "Initiator Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (!StringUtils.isBlank(workflowStatus)) {
								log.info("WorkflowStatus Value "+workflowStatus);
								if (workflowStatus.equalsIgnoreCase("MPPRejection")) {
									if(metaDataMap.containsKey("actionTakenByMPPSupervisor")){
								  stepResponse = metaDataMap.get("actionTakenByMPPSupervisor").toString();	
									}else {
										log.error("actionTakenByMPPSupervisor value is not set in metadataMap");
									}
									
								} else if (workflowStatus.equalsIgnoreCase("AppropriateAdminRejection")) {
                                    if(metaDataMap.containsKey("actionTakenByAppropriateAdmin")){
                                    	stepResponse = metaDataMap.get("actionTakenByAppropriateAdmin").toString();
									}else {
										log.error("actionTakenByAppropriateAdmin value is not set in metadataMap");
									}
									
								} else if (workflowStatus.equalsIgnoreCase("VPRejection")) {
                                    if(metaDataMap.containsKey("actionTakenByVicePresident")){
                                    	stepResponse = metaDataMap.get("actionTakenByVicePresident").toString();
									}else {
										log.error("actionTakenByVicePresident value is not set in metadataMap");
									}
									
								} else if (workflowStatus.equalsIgnoreCase("CompensationServicesRejection")) {
                                       if(metaDataMap.containsKey("actionTakenByCompensationServices")){
                                    	   stepResponse = metaDataMap.get("actionTakenByCompensationServices").toString();
									}else {
										log.error("actionTakenByCompensationServices value is not set in metadataMap");
									}
									
								} else if (workflowStatus.equalsIgnoreCase("CampusDesigneeRejection")) {
                                       if(metaDataMap.containsKey("actionTakenByCampusDesignee")){
                                    	   stepResponse = metaDataMap.get("actionTakenByCampusDesignee").toString();
									}else {
										log.error("actionTakenByCampusDesignee value is not set in metadataMap");
									}
									
								}else {
									log.error("WorkflowStatus is not empty and doesn't match with any names");
								}
							}else {
								log.error("Workflow status is blank");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByInitiator")) {
								stepResponse = metaDataMap.get("actionTakenByInitiator").toString();
								//comments = XMLUtils.getChildNodeContent(afBoundDataElement, " ");
							} else {
								log.error("actionTakenByInitiator value is not set in metadataMap");
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
					dataMap.put("CASE_ID", "");
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
						log.info("Connection Successfull");
						DatabaseUtils.insertWFHistory(conn, dataMap);
					}
				}
			}
		} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			log.error(Arrays.toString(e.getStackTrace()));
		} finally {
			doc = null;
			if (null != is) {
				try {
					is.close();
				} catch (IOException e) {
					log.error(Arrays.toString(e.getStackTrace()));
				}
			}
		}
	}
}
