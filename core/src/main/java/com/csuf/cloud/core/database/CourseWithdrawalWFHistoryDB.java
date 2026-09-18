package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Save Course Withdrawal Workflow History",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=Save Course Withdrawal Workflow History" })
public class CourseWithdrawalWFHistoryDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CourseWithdrawalWFHistoryDB.class);

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

		String paramsValue = processArguments.get("PROCESS_ARGS", String.class);
		Map<String, Object> dataMap = null;
		String workflowInstance = "";
		String workflowInitiator = "";
		String firstName = null;
		String lastName = null;
		String major = "";
		String termCode = null;
		String typeOfForm = null;
		String sID = null;
		String termDesc = null;
		String allCourseWithdrawal = null;
		String caseID = null;
		String stepResponse = "";
		String stepType = "";
		String formType = "";
		String courseWithdrawalType = "";
		String approvalStatus = "";
		String stepName = "";
		String arscComments = "";
		String issComments = "";
		String athleticComments = "";
		String medicalApprovalStatus = "";
		String comments = "";
		String medicalComments = "";
		String currentAssignee = "";
		String workItemID = "";
		String course = "";
		String schedule = "";
		String instName = "";
		String instUID = "";
		String chairName = "";
		String chairUID = "";
		String instApprovalStatus = "";
		String chairApprovalStatus = "";
		String arscApprovalStatus = "";
		String issApprovalStatus = "";
		String athleticApprovalStatus = "";
		String instComments = "";
		String chairComments = "";
		Object lastAttendedDate = "";
		String gradegranted = "";
		Timestamp stepCompleteTime = null;
		Timestamp wfCompleteTime = null;
		Timestamp workflowStartTime = new Timestamp(workItem.getTimeStarted().getTime());
		Timestamp stepStartTime = new Timestamp(System.currentTimeMillis());
		Timestamp stepStartDate = new Timestamp(System.currentTimeMillis());
		String tableName = "AEM_SCW_WF_HISTORY";
		String formName = "Srudent Course Withdrawal";
		String workflowID = workItem.getId();
		String wId = workflowID.replace("VolatileWorkItem_", "/workItems/");
		workflowInstance = workItem.getWorkflow().getId();
		payloadPath = workItem.getWorkflowData().getPayload().toString();
		MetaDataMap metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();

		if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("Before")) {
			String firstStr = wId.substring(0, wId.indexOf('_'));
			String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
			String t1 = firstStr.replaceAll("[^0-9]+", "");
			int a1 = Integer.parseInt(t1);
			a1++; // Process step is one step behind the Assign task, so
					// increment it.
			firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
			workItemID = workflowInstance.concat(firstStr).concat("_").concat(secString);
			log.debug("Final workItemID == {}", workItemID);
		}

		if (StringUtils.isNotBlank(paramsValue) && paramsValue.contains("After")) {
			String firstStr = wId.substring(0, wId.indexOf('_'));
			String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
			String t1 = firstStr.replaceAll("[^0-9]+", "");
			int a1 = Integer.parseInt(t1);
			a1--;// Process step is one step ahead the Assign task, so decrement
					// it.
			firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
			workItemID = workflowInstance.concat(firstStr).concat("_").concat(secString);
		}
		if (metaDataMap.containsKey("actionTaken")) {
			stepResponse = metaDataMap.get("actionTaken").toString();
		} else {
			log.error("actionTaken value is not set in metadataMap");
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
					sID = XMLUtils.getChildNodeContent(afBoundDataElement, "StudentID");
					caseID = XMLUtils.getChildNodeContent(afBoundDataElement, "caseId");
					typeOfForm = XMLUtils.getChildNodeContent(afBoundDataElement, "typeOfForm");
					if (typeOfForm.equals("1")) {
						formType = "Non-Medical";
					} else {
						formType = "Medical";
					}
					lastName = XMLUtils.getChildNodeContent(afBoundDataElement, "LastName");
					firstName = XMLUtils.getChildNodeContent(afBoundDataElement, "FirstName");
					major = XMLUtils.getChildNodeContent(afBoundDataElement, "Major");
					termCode = XMLUtils.getChildNodeContent(afBoundDataElement, "TermCode");
					termDesc = XMLUtils.getChildNodeContent(afBoundDataElement, "TermDesc");
					allCourseWithdrawal = XMLUtils.getChildNodeContent(afBoundDataElement, "AllCoursWithdrawRB");
					if (allCourseWithdrawal.equals("1")) {
						courseWithdrawalType = "Yes";
					} else {
						courseWithdrawalType = "No";
					}
					medicalApprovalStatus = XMLUtils.getChildNodeContent(afBoundDataElement, "RecommendMedical");
					medicalComments = XMLUtils.getChildNodeContent(afBoundDataElement, "MedicalReviewComment");
					arscComments = XMLUtils.getChildNodeContent(afBoundDataElement, "ARSCComment");

					chairApprovalStatus = XMLUtils.getChildNodeContent(afBoundDataElement, "RecommendChair");
					chairComments = XMLUtils.getChildNodeContent(afBoundDataElement, "ChairComment");
					instComments = XMLUtils.getChildNodeContent(afBoundDataElement, "InstructorComment");
					instApprovalStatus = XMLUtils.getChildNodeContent(afBoundDataElement, "RecommendInstructor");
					arscApprovalStatus = XMLUtils.getChildNodeContent(afBoundDataElement, "ARSCRecommend");

					issApprovalStatus = XMLUtils.getChildNodeContent(afBoundDataElement, "RecommendISSReviewer");
					issComments = XMLUtils.getChildNodeContent(afBoundDataElement, "ISSReviewerComment");
					
					String lastAttendedDateStr = XMLUtils.getChildNodeContent(afBoundDataElement, "LastdateAttended");
					if (lastAttendedDateStr != null && lastAttendedDateStr != "") {
						Date lastAttendedDateNew = Date.valueOf(lastAttendedDateStr);
						lastAttendedDate = lastAttendedDateNew;
					}
					gradegranted = XMLUtils.getChildNodeContent(afBoundDataElement, "Grade");
					

					athleticApprovalStatus = XMLUtils.getChildNodeContent(afBoundDataElement,
							"RecommendAthleticReviewer");
					athleticComments = XMLUtils.getChildNodeContent(afBoundDataElement, "AthleticReviewerComment");
					if (paramsValue.contains("Instructor") || paramsValue.contains("Chair")
							|| paramsValue.contains("Non Medical")) {

						Element rowElement = XMLUtils.getChildNode(afBoundDataElement, "form1");
						for (int i = 0; i < XMLUtils.getElementLength(rowElement, "CourseRow"); i++) {
							course = XMLUtils.getChildNodeContentOfElement(rowElement, "CourseNo", i);
							schedule = XMLUtils.getChildNodeContentOfElement(rowElement, "ScheduleNo", i);
							instName = XMLUtils.getChildNodeContentOfElement(rowElement, "NameOfInstructor", i);
							instUID = XMLUtils.getChildNodeContentOfElement(rowElement, "InstructorUserID", i);
							chairName = XMLUtils.getChildNodeContentOfElement(rowElement, "ChairName", i);
							chairUID = XMLUtils.getChildNodeContentOfElement(rowElement, "ChairUserID", i);

						}

					}
				}
			}
		} catch (SAXException | IOException | ParserConfigurationException | RepositoryException e) {
			e.printStackTrace();
		}

		if (paramsValue.equalsIgnoreCase("Before Medical Admin Review")) {
			stepType = "STEPSTART";
			stepName = "ARSC Review";
			currentAssignee = "ARSC-Reviewers";
			if (medicalApprovalStatus.equals("1")) {
				approvalStatus = "Approved";
			} else {
				approvalStatus = "Denied";
			}
			stepCompleteTime = null;
			workflowStartTime = null;
			wfCompleteTime = null;
		}
		if (paramsValue.equalsIgnoreCase("After Medical Admin Review")) {
			stepType = "STEPEND";
			currentAssignee = "ARSC-Reviewers";
			stepName = "ARSC Review";
			if (arscApprovalStatus.equals("1")) {
				approvalStatus = "Approved";
			} else {
				approvalStatus = "Denied";
			}
			comments = arscComments;
			stepCompleteTime = new Timestamp(System.currentTimeMillis());
			workflowStartTime = null;
			wfCompleteTime = new Timestamp(System.currentTimeMillis());
			stepStartTime = null;
		}
		if (paramsValue.equalsIgnoreCase("Before Medical Review")) {
			stepType = "STEPSTART";
			stepName = "Medical Review";
			stepResponse = "Send To Medical Reviewers";
			currentAssignee = "Medical-Reviewers";
			stepCompleteTime = null;
			wfCompleteTime = null;
		}
		if (paramsValue.equalsIgnoreCase("After Medical Review")) {
			stepType = "STEPEND";
			currentAssignee = "Medical-Reviewers";
			stepName = "Medical Review";
			if (medicalApprovalStatus.equals("1")) {
				approvalStatus = "Approved";
			} else {
				approvalStatus = "Denied";
			}
			comments = medicalComments;
			workflowStartTime = null;
			stepCompleteTime = new Timestamp(System.currentTimeMillis());
			wfCompleteTime = null;
			stepStartTime = null;
		}
		if (paramsValue.equalsIgnoreCase("Before Instructor Review")) {
			stepType = "STEPSTART";
			stepResponse = "Send To Instructor";
			stepName = "Instructor Review";
			currentAssignee = instUID;
			stepCompleteTime = null;
			wfCompleteTime = null;
		}
		if (paramsValue.equalsIgnoreCase("After Instructor Review")) {
			stepType = "STEPEND";
			currentAssignee = instUID;
			stepName = "Instructor Review";
			if (instApprovalStatus.equals("1")) {
				approvalStatus = "Approved";
			} else {
				approvalStatus = "Denied";
			}
			comments = instComments;
			workflowStartTime = null;
			stepCompleteTime = new Timestamp(System.currentTimeMillis());
			wfCompleteTime = null;
			stepStartDate = null;
		}
		if (paramsValue.equalsIgnoreCase("Before Chair Review")) {
			stepType = "STEPSTART";
			stepName = "Chair Review";
			currentAssignee = chairUID;
			workflowStartTime = null;
			stepCompleteTime = null;
			wfCompleteTime = null;
		}
		if (paramsValue.equalsIgnoreCase("After Chair Review")) {
			stepType = "STEPEND";
			currentAssignee = chairUID;
			stepName = "Chair Review";
			if (chairApprovalStatus.equals("1")) {
				approvalStatus = "Approved";
			} else {
				approvalStatus = "Denied";
			}
			comments = chairComments;
			workflowStartTime = null;
			stepCompleteTime = new Timestamp(System.currentTimeMillis());
			wfCompleteTime = null;
			stepStartDate = null;
		}
		if (paramsValue.equalsIgnoreCase("Before Non Medical Admin Review")) {
			stepType = "STEPSTART";
			stepName = "ARSC Review";
			currentAssignee = "ARSC-Reviewers";
			workflowStartTime = null;
			stepCompleteTime = null;
			wfCompleteTime = null;
		}
		if (paramsValue.equalsIgnoreCase("After Non Medical Admin Review")) {
			stepType = "STEPEND";
			currentAssignee = "ARSC-Reviewers";
			stepName = "ARSC Review";
			if (arscApprovalStatus.equals("1")) {
				approvalStatus = "Approved";
			} else {
				approvalStatus = "Denied";
			}
			comments = arscComments;
			workflowStartTime = null;
			stepStartDate = null;
			stepCompleteTime = new Timestamp(System.currentTimeMillis());
			wfCompleteTime = new Timestamp(System.currentTimeMillis());
			stepStartDate = null;
		}

		if (paramsValue.equalsIgnoreCase("After Non Medical ISS Review")) {
			stepType = "STEPEND";
			currentAssignee = "International-Office-Reviewers";
			stepName = "ISS Review";
			if (issApprovalStatus.equals("1")) {
				approvalStatus = "Approved";
			} else {
				approvalStatus = "Denied";
			}
			comments = issComments;
			workflowStartTime = null;
			stepStartDate = null;
			stepCompleteTime = new Timestamp(System.currentTimeMillis());
			wfCompleteTime = new Timestamp(System.currentTimeMillis());
			stepStartDate = null;
		}

		if (paramsValue.equalsIgnoreCase("After Non Medical Athletic Review")) {
			stepType = "STEPEND";
			currentAssignee = "Athletic-Reviewers";
			stepName = "Athletic Review";
			if (athleticApprovalStatus.equals("1")) {
				approvalStatus = "Approved";
			} else {
				approvalStatus = "Denied";
			}
			comments = athleticComments;
			workflowStartTime = null;
			stepStartDate = null;
			stepCompleteTime = new Timestamp(System.currentTimeMillis());
			wfCompleteTime = new Timestamp(System.currentTimeMillis());
			stepStartDate = null;
		}

		if (paramsValue.equalsIgnoreCase("Before Non Medical ISS Review")) {
			stepType = "STEPSTART";
			currentAssignee = "International-Office-Reviewers";
			stepName = "ISS Review";
			workflowStartTime = null;
			stepStartDate = null;
			stepCompleteTime = new Timestamp(System.currentTimeMillis());
			wfCompleteTime = new Timestamp(System.currentTimeMillis());
			stepStartDate = null;
		}

		if (paramsValue.equalsIgnoreCase("Before Non Medical Athletic Review")) {
			stepType = "STEPSTART";
			currentAssignee = "Athletic-Reviewers";
			stepName = "Athletic Review";
			workflowStartTime = null;
			stepStartDate = null;
			stepCompleteTime = new Timestamp(System.currentTimeMillis());
			wfCompleteTime = new Timestamp(System.currentTimeMillis());
			stepStartDate = null;
		}

		dataMap = new LinkedHashMap<String, Object>();
		dataMap.put("WORKITEM_ID", workItemID);
		dataMap.put("WORKFLOW_PAYLOAD", payloadPath);
		dataMap.put("CASE_ID", caseID);
		dataMap.put("CWID", sID);
		// dataMap.put("WORKFLOW_START_TIME", workflowStartTime);
		dataMap.put("STEP_START_TIME", stepStartTime);
		dataMap.put("WORKFLOW_INITIATOR", workflowInitiator);
		dataMap.put("ASSIGNEE", currentAssignee);
		dataMap.put("STEP_COMPLETE_TIME", stepCompleteTime);
		dataMap.put("STEP_TYPE", stepType);
		dataMap.put("STEP_RESPONSE", stepResponse);
		dataMap.put("STEP_NAME", stepName);
		dataMap.put("COURSE_NUMBER", course);
		dataMap.put("INSTRUCTOR_NAME", instName);
		dataMap.put("STUDENT_FIRST_NAME", firstName);
		dataMap.put("STUDENT_LAST_NAME", lastName);
		dataMap.put("TERM", termCode);
		dataMap.put("MAJOR", major);
		dataMap.put("CLASS_NUMBER", schedule);
		dataMap.put("TERM_DESCRIPTION", termDesc);
		dataMap.put("TERM_WITHDRAWAL", courseWithdrawalType);
		dataMap.put("WITHDRAWAL_TYPE", formType);
		dataMap.put("CHAIR_NAME", chairName);
		dataMap.put("APPROVAL_STATUS", approvalStatus);
		dataMap.put("COMMENTS", comments);
		dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstance);
		dataMap.put("LAST_ATTENDED_DATE", lastAttendedDate);
		dataMap.put("GRADE", gradegranted);
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
