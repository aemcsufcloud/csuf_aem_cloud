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

@Component(property = {
		Constants.SERVICE_DESCRIPTION + "=Save Petition For Retroactive Withdrawal Workflow Step History",
		Constants.SERVICE_VENDOR + "=ThoughtFocus",
		"process.label" + "= Petition For Retroactive Withdrawal Workflow Step History" })
public class PetitionForRetroactiveWithdrawalWFHistoryDB implements WorkflowProcess {

	private static final Logger logger = LoggerFactory.getLogger(PetitionForRetroactiveWithdrawalWFHistoryDB.class);

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
		String dqType = "";
		String graduationType = "";
		String withdrawalType = "";
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
				cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "CampusID");
				dqType = XMLUtils.getChildNodeContent(afBoundDataElement, "DQType");
				graduationType = XMLUtils.getChildNodeContent(afBoundDataElement, "GraduationType");
				withdrawalType = XMLUtils.getChildNodeContent(afBoundDataElement, "withdrawalType");

				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					String stage = XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator");

					if (stage.equals("ToPetitionCoordinatorInitial")) {
						assignee = "Petition-Coordinator-Reviewers";
						stepName = "Petition Coordinator Initial Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							stepResponse = "Submit";
						} else {
							if (metaDataMap.containsKey("actionTakenByPetitionCoordinatorInitial")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "PetRecommendationRB")
										.equals("1")) {
									stepResponse = "Recommended for petition review";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "PetRecommendationRB")
										.equals("2")) {
									stepResponse = "Need additional documentation/information";
								}else {
									stepResponse = "No Petition Required";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement,
										"PetitionCoordinatorInComments");
							} else {
								logger.error("actionTakenByPetitionCoordinatorInitial value is not set in metadataMap");
							}
						}

					}
					
					if (stage.equals("ToMedicalCommittee")) {
						assignee = "Medical-Reviewers";
						stepName = "Medical Committee Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByPetitionCoordinatorInitial")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "PetRecommendationRB")
										.equals("1")) {
									stepResponse = "Recommended for petition review";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "PetRecommendationRB")
										.equals("2")) {
									stepResponse = "Need additional documentation/information";
								}else {
									stepResponse = "No Petition Required";
								}
							} else {
								logger.error("actionTakenByPetitionCoordinatorInitial value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByMedicalCommittee")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "MedicalReviewRB")
										.equals("1")) {
									stepResponse = "Sufficient";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "MedicalReviewRB")
										.equals("2")) {
									stepResponse = "Not Sufficient";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "MedicalCommitteeComments");
							} else {
								logger.error("actionTakenByMedicalCommittee value is not set in metadataMap");
							}
						}

					}

					if (stage.equals("ToAssociateDean")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "AssociateDeanUserId");
						stepName = "Associate Dean Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {							
							stepResponse = "Submit";
						} else {
							if (metaDataMap.containsKey("actionTakenByAssociateDean")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "AssociateDeanDecision")
										.equals("1")) {
									stepResponse = "Approve";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "AssociateDeanDecision")
										.equals("2")) {
									stepResponse = "Deny";
								} else {
									stepResponse = "Abstain";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "AssociateDeanComments");
							} else {
								logger.error("actionTakenByAssociateDean value is not set in metadataMap");
							}
						}

					}

					if (stage.equals("ToGraduateStudies")) {
						assignee = "Graduate-Studies-Reviewers";
						stepName = "Graduate Studies Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (((withdrawalType.equalsIgnoreCase("2")) || (withdrawalType.equalsIgnoreCase("1")))
									&& (graduationType.equalsIgnoreCase("G"))) {
								if (metaDataMap.containsKey("actionTakenByAssociateDean")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "AssociateDeanDecision")
											.equals("1")) {
										stepResponse = "Approve";
									} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "AssociateDeanDecision")
											.equals("2")) {
										stepResponse = "Deny";
									}else {
										stepResponse = "Abstain";
									}
								} else {
									logger.error("actionTakenByAssociateDean value is not set in metadataMap");
								}
							} 
						} else {
							if (metaDataMap.containsKey("actionTakenByGraduateStudiesReviewers")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "GraduateStudeisDecision")
										.equals("1")) {
									stepResponse = "Approve";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "GraduateStudeisDecision")
										.equals("2")) {
									stepResponse = "Deny";
								}else {
									stepResponse = "Abstain";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "GraduateStudiesComments");
							} else {
								logger.error("actionTakenByGraduateStudiesReviewers value is not set in metadataMap");
							}
						}

					}

					if (stage.equals("ToAVP")) {
						assignee = "AVP-Reviewers";
						stepName = "AVP Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if ((withdrawalType.equalsIgnoreCase("2")) && (graduationType.equalsIgnoreCase("U"))) {
								if (metaDataMap.containsKey("actionTakenByAssociateDean")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "AssociateDeanDecision")
											.equals("1")) {
										stepResponse = "Approve";
									} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "AssociateDeanDecision")
											.equals("2")) {
										stepResponse = "Deny";
									}else {
										stepResponse = "Abstain";
									}
								} else {
									logger.error("actionTakenByAssociateDean value is not set in metadataMap");
								}
							} else {
								if (metaDataMap.containsKey("actionTakenByMedicalCommittee")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "MedicalReviewRB")
											.equals("1")) {
										stepResponse = "Sufficient";
									} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "MedicalReviewRB")
											.equals("2")) {
										stepResponse = "Not Sufficient";
									}
								} else {
									logger.error("actionTakenByMedicalCommittee value is not set in metadataMap");
								}
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByAVP")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "AVPStudiesDecision")
										.equals("1")) {
									stepResponse = "Approve";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "AVPStudiesDecision")
										.equals("2")) {
									stepResponse = "Deny";
								}else {
									stepResponse = "No Action Taken";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "AVPComments");
							} else {
								logger.error("actionTakenByAVP value is not set in metadataMap");
							}
						}

					}

					if (stage.equals("ToPetitionCoordinator")) {
						assignee = "Petition-Coordinator-Reviewers";
						stepName = "Petition Coordinator Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							boolean handled = false;
							if ((withdrawalType.equalsIgnoreCase("1")) && (graduationType.equalsIgnoreCase("U"))
									&& (dqType.equalsIgnoreCase("N"))) {
								if (metaDataMap.containsKey("actionTakenByMedicalCommittee")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "MedicalReviewRB")
											.equals("1")) {
										stepResponse = "Sufficient";
									} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "MedicalReviewRB")
											.equals("2")) {
										stepResponse = "Not Sufficient";
									}
								} else {
									logger.error("actionTakenByMedicalCommittee value is not set in metadataMap");
								}
							}
							else if ((graduationType.equalsIgnoreCase("G"))
									&& (withdrawalType.equalsIgnoreCase("1") || withdrawalType.equalsIgnoreCase("2"))) {
								if (metaDataMap.containsKey("actionTakenByGraduateStudiesReviewers")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "GraduateStudeisDecision")
											.equals("1")) {
										stepResponse = "Approve";
									} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "GraduateStudeisDecision")
											.equals("2")) {
										stepResponse = "Deny";
									}else {
										stepResponse = "Abstain";
									}
									handled = true;
								} else {
									logger.error(
											"actionTakenByGraduateStudiesReviewers value is not set in metadataMap");
								}
							} else if ((withdrawalType.equalsIgnoreCase("2"))
									&& (graduationType.equalsIgnoreCase("U")) && (dqType.equalsIgnoreCase("N"))) {
								if (metaDataMap.containsKey("actionTakenByAssociateDean")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "AssociateDeanDecision")
											.equals("1")) {
										stepResponse = "Approve";
									} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "AssociateDeanDecision")
											.equals("2")) {
										stepResponse = "Deny";
									}else {
										stepResponse = "Abstain";
									}
									handled = true;
								} else {
									logger.error("actionTakenByAssociateDean value is not set in metadataMap");
								}
							} else if ((withdrawalType.equalsIgnoreCase("2") || withdrawalType.equalsIgnoreCase("1"))
									&& (graduationType.equalsIgnoreCase("U")) && (dqType.equalsIgnoreCase("Y"))) {
								if (metaDataMap.containsKey("actionTakenByAVP")) {
									if (XMLUtils.getChildNodeContent(afBoundDataElement, "AVPStudiesDecision")
											.equals("1")) {
										stepResponse = "Approve";
									} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "AVPStudiesDecision")
											.equals("2")) {
										stepResponse = "Deny";
									}else {
										stepResponse = "No Action Taken";
									}
									handled = true;
								} else {
									logger.error("actionTakenByAVP value is not set in metadataMap");
								}
							}
							if (!handled) {
								stepResponse = "Submit";
							}

						} else {
							if (metaDataMap.containsKey("actionTakenByPetitionCoordinator")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "CommitteeDecision")
										.equals("1")) {
									stepResponse = "petition is Granted";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "CommitteeDecision")
										.equals("2")) {
									stepResponse = "No Action has been taken";
								}else {
									stepResponse = "petition is Denied";
								}
								comments = XMLUtils.getChildNodeContent(afBoundDataElement,
										"PetitionCoordinatorComments");
							} else {
								logger.error("actionTakenByPetitionCoordinator value is not set in metadataMap");
							}
						}

					}

					if (stage.equals("ToRecords")) {
						assignee = "Records-Office-Reviewers";
						stepName = "Records Review";
						if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
							if (metaDataMap.containsKey("actionTakenByPetitionCoordinator")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "CommitteeDecision")
										.equals("1")) {
									stepResponse = "petition is Granted";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "CommitteeDecision")
										.equals("2")) {
									stepResponse = "No Action has been taken";
								}else {
									stepResponse = "petition is Denied";
								}
							} else {
								logger.error("actionTakenByPetitionCoordinator value is not set in metadataMap");
							}
						} else {
							if (metaDataMap.containsKey("actionTakenByRecords")) {
								if (XMLUtils.getChildNodeContent(afBoundDataElement, "RecordsDecision")
										.equals("1")) {
									stepResponse = "Approve";
								} else if (XMLUtils.getChildNodeContent(afBoundDataElement, "RecordsDecision")
										.equals("2")) {
									stepResponse = "Deny";
								}else {
									stepResponse = "No Action Required";
								}
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
