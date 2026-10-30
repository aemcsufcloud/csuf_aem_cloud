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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Save Petition for GE Variation Workflow Step History",
		Constants.SERVICE_VENDOR + "=ThoughtFocus",
		"process.label" + "= Petition for GE Variation Workflow Step History" })
public class PetitionforGEVarationWFHistoryDB implements WorkflowProcess {

	private static final Logger logger = LoggerFactory.getLogger(PetitionforGEVarationWFHistoryDB.class);

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
		String workflowStatus = "";
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
				caseID = XMLUtils.getChildNodeContent(afBoundDataElement, "caseId");
				cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "cwid");

				if (metaDataMap.containsKey("workflowStatus")) {
					workflowStatus = metaDataMap.get("workflowStatus").toString();
				} else {
					logger.error("workflowStatus is not available in metadata map");
				}

				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					String stage = XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator");

					if (stage.equals("ToGrad")) {
						assignee = "Grad-Unit-Evaluator-Reviewers";
						stepName = "Grad Unit Evaluators Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							stepResponse = "Submit";
						} else {
							if (metaDataMap.containsKey("actionTakenByGradUnitEvaluator")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "GradUnitSupervisorDecision")
										.equals("1")) {
									stepResponse = "Approve";
								} else if (XMLUtils
										.getChildNodeContent(afBoundDataElement, "GradUnitSupervisorDecision")
										.equals("2")) {
									stepResponse = "Need Further Review";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement,
										"GradUnitSupervisorComments");
							} else {
								logger.error("actionTakenByGradUnitEvaluator value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToAdvisor")) {
						assignee = "Academic-Advisor-Reviewers";
						stepName = "Academic Advisor Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByGradUnitEvaluator")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "GradUnitSupervisorDecision")
										.equals("1")) {
									stepResponse = "Approve";
								} else if (XMLUtils
										.getChildNodeContent(afBoundDataElement, "GradUnitSupervisorDecision")
										.equals("2")) {
									stepResponse = "Need Further Review";
								}
							} else {
								logger.error("actionTakenByGradUnitEvaluator value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByAcademicAdvisor")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "AcademicAdvisorDecision")
										.equals("1")) {
									stepResponse = "Approve";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "AcademicAdvisorDecision")
										.equals("2")) {
									stepResponse = "Deny";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "AcademicAdvisorDecision")
										.equals("3")) {
									stepResponse = "Abstain";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "AcademicAdvisorDecision")
										.equals("4")) {
									stepResponse = "No Action Needed";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "AcademicAdvisorComments");
							} else {
								logger.error("actionTakenByAcademicAdvisor value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToDean")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "DeanUserID");
						stepName = "Associate Dean Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByAcademicAdvisor")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "AcademicAdvisorDecision")
										.equals("1")) {
									stepResponse = "Approve";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "AcademicAdvisorDecision")
										.equals("2")) {
									stepResponse = "Deny";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "AcademicAdvisorDecision")
										.equals("3")) {
									stepResponse = "Abstain";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "AcademicAdvisorDecision")
										.equals("4")) {
									stepResponse = "No Action Needed";
								}
							} else {
								logger.error("actionTakenByAcademicAdvisor value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByDean")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "DeanDecision").equals("1")) {
									stepResponse = "Approve";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "DeanDecision")
										.equals("2")) {
									stepResponse = "Deny";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "DeanDecision")
										.equals("3")) {
									stepResponse = "Abstain";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "DeanDecision")
										.equals("4")) {
									stepResponse = "No Action Needed";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "DeanComments");
							} else {
								logger.error("actionTakenByDean value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToPetition")) {
						assignee = "Petition-Coordinator-Reviewers";
						stepName = "Petition Coordinator Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (workflowStatus.equals("FromGrad")) {
								if (metaDataMap.containsKey("actionTakenByGradUnitEvaluator")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "GradUnitSupervisorDecision")
											.equals("1")) {
										stepResponse = "Approve";
									}
								} else {
									logger.error("actionTakenByGradUnitEvaluator value is not set in metadataMap");
								}
							} else if (metaDataMap.containsKey("actionTakenByDean")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "DeanDecision")
										.equals("1")) {
									stepResponse = "Approve";
								} else if (XMLUtils
										.getChildNodeContent(afBoundDataElement, "DeanDecision")
										.equals("2")) {
									stepResponse = "Deny";
								} else if (XMLUtils
										.getChildNodeContent(afBoundDataElement, "DeanDecision")
										.equals("3")) {
									stepResponse = "Abstain";
								} else if (XMLUtils
										.getChildNodeContent(afBoundDataElement, "DeanDecision")
										.equals("4")) {
									stepResponse = "No Action Needed";
								}
							} else {
								logger.error("actionTakenByDean value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByPetitionCoordinator")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "PetitionCoordinatorDecision").equals("1")) {
									stepResponse = "Approve";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "PetitionCoordinatorDecision")
										.equals("2")) {
									stepResponse = "No Action Needed";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "PetitionCoordinatorDecision")
										.equals("3")) {
									stepResponse = "Deny";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement,
										"PetitionCoordinatorComments");
							} else {
								logger.error("actionTakenByPetitionCoordinator value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToTDA")) {
						assignee = "TDA-Reviewers";
						stepName = "TDA-Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (workflowStatus.equals("FromGrad")) {
								if (metaDataMap.containsKey("actionTakenByGradUnitEvaluator")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "GradUnitSupervisorDecision")
											.equals("1")) {
										stepResponse = "Approve";
									}
								} else {
									logger.error("actionTakenByGradUnitEvaluator value is not set in metadataMap");
								}
							} else if (workflowStatus.equals("FromPetition")) {
								if (metaDataMap.containsKey("actionTakenByPetitionCoordinator")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "PetitionCoordinatorDecision")
											.equals("1")) {
										stepResponse = "Approve";
									} else if (XMLUtils
											.getChildNodeContent(afBoundDataElement, "PetitionCoordinatorDecision")
											.equals("2")) {
										stepResponse = "No Action Needed";
									} else if (XMLUtils
											.getChildNodeContent(afBoundDataElement, "PetitionCoordinatorDecision")
											.equals("3")) {
										stepResponse = "Deny";
									}
								} else {
									logger.error("actionTakenByPetitionCoordinator value is not set in metadataMap");
								}
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByTDA")) {
								 if (XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecision")
										.equals("1")) {
									stepResponse = "Update TDA";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecision")
										.equals("2")) {
									stepResponse = "No Action Needed";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "TDAComments");
							} else {
								logger.error("actionTakenByTDA value is not set in metadataMap");
							}
						}
					}

					if (stage.equals("ToRecord")) {
						assignee = "Records-Office-Reviewers";
						stepName = "Records-Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (workflowStatus.equals("FromPetition")) {
								if (metaDataMap.containsKey("actionTakenByPetitionCoordinator")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "PetitionCoordinatorDecision")
											.equals("3")) {
										stepResponse = "Deny";
									} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "PetitionCoordinatorDecision")
											.equals("2")) {
										stepResponse = "No Action Needed";
									}
								} else {
									logger.error("actionTakenByPetitionCoordinator value is not set in metadataMap");
								}
							} else if (workflowStatus.equals("FromTDA")) {
								if (metaDataMap.containsKey("actionTakenByTDA")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecision").equals("1")) {
										stepResponse = "Approve";
									} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecision").equals("2")) {
										stepResponse = "Deny";
									} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "TDADecision").equals("3")) {
										stepResponse = "No Action Needed";
									}
								} else {
									logger.error("actionTakenByTDA value is not set in metadataMap");
								}
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByRecords")) {
								stepResponse = metaDataMap.get("actionTakenByRecords").toString();
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "RecordsComments");
							} else {
								logger.error("actionTakenByRecords value is not set in metadataMap");
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
					dataMap.put("CASE_ID", caseID);
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
