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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Save Petition Workflow Step History",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=Petition Workflow Step History" })
public class PetitionWFHistoryDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(PetitionWFHistoryDB.class);

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	private static final String STEP_RESPONSE = "Send to Petition Coordinator";

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);

		/*String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();*/
		/*conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
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
		String caseId = "";
		String comments = "";
		Timestamp stepCompleteTime = null;

		String wfInstanceID = workItem.getWorkflow().getId();
		workflowModelName = workItem.getWorkflow().getWorkflowModel().getId();
		log.debug("Workflow InstanceID ==" + wfInstanceID);
		String workflowID = workItem.getId();
		log.debug("WorkflowID==" + workflowID);

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

		String workflowTitle = workItem.getWorkflow().getWorkflowModel().getTitle();

		try {
			is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, workItem.getContentPath(), "Data.xml");
			if (null != is) {
				doc = XMLUtils.getDomDocument(is);

				Element afUnBoundDataElement = XMLUtils.getParentNode(doc, "afUnboundData");
				if (null != afUnBoundDataElement && afUnBoundDataElement.hasChildNodes()) {
					workflowInitiator = XMLUtils.getChildNodeContent(afUnBoundDataElement, "workflow_initiator");
				}

				Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");
				String studentType = XMLUtils.getChildNodeContent(afBoundDataElement, "AcadCareer");
				String eipType = XMLUtils.getChildNodeContent(afBoundDataElement, "EIPFlag");
				cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "CWID");
				caseId = XMLUtils.getChildNodeContent(afBoundDataElement, "CaseId");

				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					String stage = XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator");
					if (stage.equalsIgnoreCase("ToInstructor")) {
						if (workflowTitle.equals("Petition A") && studentType.equals("UGRD")) {
							assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionA_instructorUserID");
							stepResponse = STEP_RESPONSE;
						} else if (workflowTitle.equals("Petition A") && studentType.equals("PBAC")) {
							assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionA_instructorUserID");
							stepResponse = "Send to Graduate Studies";
						} else if (workflowTitle.equals("Petition C") && studentType.equals("UGRD")) {
							assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionC_instructorUserID");
							stepResponse = STEP_RESPONSE;
						} else if (workflowTitle.equals("Petition C") && studentType.equals("PBAC")) {
							assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "petitionC_instructorUserID");
							stepResponse = "Send to Graduate Studies";
						}

						stepName = "Instructor Review";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "instructor_comment");
					}
					if (stage.equalsIgnoreCase("ToAssociateDean")) {
						if (studentType.equals("PBAC")) {
							assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "DeanUserId");
							stepName = "Associate Dean Review";
							stepResponse = "Send to Graduate Studies";
							comments = XMLUtils.getChildNodeContent(afBoundDataElement, "dean_comment");
						}
						if(workflowTitle.equalsIgnoreCase("Petition A")) {
							if((studentType.equalsIgnoreCase("UGRD")) || (eipType.equalsIgnoreCase("Y"))) {
								assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "DeanUserId");
								stepName = "Associate Dean Review";
								stepResponse = "Send to Petition Coordinator";
								comments = XMLUtils.getChildNodeContent(afBoundDataElement, "dean_comment");
							}
						}
					}
					if (stage.equalsIgnoreCase("ToEvaluator")) {
						assignee = "Grad-unit-evaluators";
						stepName = "Grad Unit Evaluators Review";
						stepResponse = STEP_RESPONSE;
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "evaluator_comment");
					}
					if (stage.equalsIgnoreCase("ToGraduateStudies")) {
						assignee = "Graduate-studies-reviewers";
						stepName = "Graduate Studies Review";
						stepResponse = STEP_RESPONSE;
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "grad_office_comment");
					}
					if (stage.equalsIgnoreCase("ToEIP")) {
						assignee = "EIP-Reviewers";
						stepName = "EIP Review";
						stepResponse = "Send to Records";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "eip_comment");
					}
					if (stage.equalsIgnoreCase("ToPetitionCoordinator")) {
						assignee = "Petition-Coordinator-Reviewers";
						stepName = "Petition Coordinator Review";
						stepResponse = "Send to Records";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "petition_coord_comment");
					}
					if (stage.equalsIgnoreCase("ToRecords")) {
						assignee = "Records-Reviewers";
						stepName = "Records Review";
						stepResponse = "Complete";
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "records_comment");
					}
					if (stage.equalsIgnoreCase("ToChair")) {
						assignee = XMLUtils.getChildNodeContent(afBoundDataElement, "ChairUserId");
						stepName = "Chair Review";
						stepResponse = "To Petition Coordinator";
						if(workflowTitle.equalsIgnoreCase("Petition A")) {
							if((studentType.equalsIgnoreCase("UGRD")) || (eipType.equalsIgnoreCase("Y"))) {
								stepResponse = "Send to Associate Dean";
							}
						}
						comments = XMLUtils.getChildNodeContent(afBoundDataElement, "ChairComments");
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
					/*if (conn != null) {
						log.info("Connection Successfull");
						DatabaseUtils.insertWFHistory(conn, dataMap);
					}*/
					try {
						CloudDbSaveUtil.saveWorkflowHistory(paramsValue, dataMap);
					} catch (IOException ioException) {
						log.error("IOException saving WF history: " + ioException.getMessage());
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
