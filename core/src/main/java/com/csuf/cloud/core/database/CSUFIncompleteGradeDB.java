package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=CSUF Sample DB", "service.vendor=ThoughtFocus",
		"process.label=CSUFIncompleteGradeDB" })

public class CSUFIncompleteGradeDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	private static final Logger log = LoggerFactory.getLogger(CSUFIncompleteGradeDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_INCOMPLETE_GRADE";
		String formName = "Incomplete Grade Change";
		String studentName = "";
		String cwid = "";
		String address1 = "";
		String address2 = "";
		String deptCourseno = "";
		String scheduleNo = "";
		String termYear = "";
		String units = "";
		String quality = "";
		String missingExam = "";
		String missingPaper = "";
		String missingLab = "";
		String reasonforIncompletion = "";
		String WorkCompletionDate = "";
		String instructorCB = "";
		String instructorSignature = "";
		String instructorSignDate = "";
		String instructorComments = "";
		String caseID = "";
		String studentEmail = "";
		String studentUserId = "";
		String instEmail = "";
		String instUserId = "";
		String workflowInstanceID = "";
		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		workflowInstanceID = workItem.getWorkflow().getId();
		if (StringUtils.isNotBlank(payloadPath)) {
			InputStream is = null;
			try {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");

				if (null != is) {
					Document doc = XMLUtils.getDomDocument(is);

					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
							studentName = eElement.getElementsByTagName("StudentName").item(0).getTextContent();
							cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
							address1 = eElement.getElementsByTagName("Address1").item(0).getTextContent();
							address2 = eElement.getElementsByTagName("Address2").item(0).getTextContent();
							deptCourseno = eElement.getElementsByTagName("DeptOrCourseNo").item(0).getTextContent();
							scheduleNo = eElement.getElementsByTagName("ScheduleNo").item(0).getTextContent();
							termYear = eElement.getElementsByTagName("TermAndYear").item(0).getTextContent();
							units = eElement.getElementsByTagName("Units").item(0).getTextContent();
							quality = eElement.getElementsByTagName("Quality").item(0).getTextContent();
							missingExam = eElement.getElementsByTagName("MissingExamCB").item(0).getTextContent();
							missingPaper = eElement.getElementsByTagName("MissingPaperCB").item(0).getTextContent();
							missingLab = eElement.getElementsByTagName("MissingLabCB").item(0).getTextContent();
							reasonforIncompletion = eElement.getElementsByTagName("OtherReasonForIncompletion").item(0)
									.getTextContent();
							WorkCompletionDate = eElement.getElementsByTagName("WorkCompletionDate").item(0)
									.getTextContent();
							instructorCB = eElement.getElementsByTagName("InstructorCB").item(0).getTextContent();
							instructorSignature = eElement.getElementsByTagName("InstructorSignature").item(0)
									.getTextContent();
							instructorSignDate = eElement.getElementsByTagName("InstructorSignDate").item(0)
									.getTextContent();
							instructorComments = eElement.getElementsByTagName("InstructorComments").item(0)
									.getTextContent();
							caseID = eElement.getElementsByTagName("CaseID").item(0).getTextContent();
							instEmail = eElement.getElementsByTagName("InstructorEmail").item(0).getTextContent();
							instUserId = eElement.getElementsByTagName("InstructorUserId").item(0).getTextContent();
							studentUserId = eElement.getElementsByTagName("StudentUserId").item(0).getTextContent();
							studentEmail = eElement.getElementsByTagName("StudentEmail").item(0).getTextContent();

						}
					}

					dataMap = new LinkedHashMap<String, Object>();
					dataMap.put("CWID", cwid);
					dataMap.put("STUDENT_NAME", studentName);
					dataMap.put("ADDRESS1", address1);
					dataMap.put("ADDRESS2", address2);
					dataMap.put("DEPT_OR_COURSENO", deptCourseno);
					dataMap.put("SCHEDULE_NO", scheduleNo);
					dataMap.put("TERM_AND_YEAR", termYear);
					dataMap.put("UNITS", units);
					dataMap.put("QUALITY", quality);
					dataMap.put("MISSING_EXAM", missingExam);
					dataMap.put("MISSING_PAPER", missingPaper);
					dataMap.put("MISSING_LAB", missingLab);
					dataMap.put("REASONS", reasonforIncompletion);
					Object workCompletionObj = null;
					if (WorkCompletionDate != null && WorkCompletionDate != "") {
						Date dateQualifingEventNew = Date.valueOf(WorkCompletionDate);
						workCompletionObj = dateQualifingEventNew;
					}
					dataMap.put("WORK_COMPLETION_DATE", workCompletionObj);
					dataMap.put("INSTRUCTOR_SIGNATURE", instructorSignature);

					Object instSignObj = null;
					if (instructorSignDate != null && instructorSignDate != "") {
						Date instSignNew = Date.valueOf(instructorSignDate);
						instSignObj = instSignNew;
					}
					dataMap.put("INSTRUCTOR_SIGN_DATE", instSignObj);
					dataMap.put("INSTRUCTOR_COMMENTS", instructorComments);
					dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
					
					dataMap.put("CASE_ID", caseID);
					dataMap.put("INSTRUCTOR_USERID", instUserId);
					dataMap.put("INSTRUCTOR_EMAIL", instEmail);
					dataMap.put("STUDENT_EMAIL", studentEmail);
					dataMap.put("STUDENT_USERID", studentUserId);

				}

				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, caseID, "CASE_ID", workflowInstanceID, dataMap,
							"WORK_COMPLETION_DATE,INSTRUCTOR_SIGN_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}

			} catch (Exception e) {
				log.error("Exception in CSUFIncompleteGradeDB=" + Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.error("IOException in CSUFIncompleteGradeDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in CSUFIncompleteGradeDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}
			

		}

	}

}
