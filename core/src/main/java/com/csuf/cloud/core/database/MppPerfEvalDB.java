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
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=MPP Eval Save in DB", "service.vendor=ThoughtFocus",
		"process.label=MppPerfEvalDB" })

public class MppPerfEvalDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	private static final Logger log = LoggerFactory.getLogger(MppPerfEvalDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_MPP_PERFORMANCE_EVAL";
		String formName = "MPP Performance Evaluation";
		String ratingPeriodFrom = "";
		String ratingPeriodTo = "";
		String empId = "";
		String chrsId = "";
		String empRCD = "";
		String cbid = "";
		String classification = "";
		String range = "";
		String evaluationType = "";
		String firstName = "";
		String lastName = "";
		String departmentID = "";
		String departmentName = "";
		String draftDate = "";
		String athleticsEmp = "";
		String evaluatorsName = "";
		String evalCB = "";
		String evalSign = "";
		String evalComments = "";
		String empCB = "";
		String empSign = "";
		String adminCB = "";
		String adminSign = "";
		String hrComments = "";
		String hrCB = "";
		String initials = "";
		String hrDate = "";
		String commentsOthers = "";
		String conceptualSkills = "";
		String interPersonalSkills = "";
		String technicalSkills = "";
		String others = "";
		String overallPerformance = "";
		String overallRating = "";
		String sectionBComments = "";
		String evalName = "";
		String evalDate = "";
		String adminName = "";
		String adminDate = "";
		String adminComment = "";
		String empDate = "";
		String empComments = "";
		String atCritical = "";
		String atOptions = "";
		String supportStmt1 = "";
		String supportStmt2 = "";
		String supportStmt3 = "";
		String supportStmt4 = "";
		String hrCoordinatorSign = "";
		String hrCoordinatorSignDate = "";
		String hrCoordinatorSignComment = "";
		String workflowInstanceId = "";
		String hrCooCB = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		workflowInstanceId = workItem.getWorkflow().getId();
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
							initials = eElement.getElementsByTagName("HRDIInitials").item(0).getTextContent();
							hrDate = eElement.getElementsByTagName("HRDIDate").item(0).getTextContent();
							hrComments = eElement.getElementsByTagName("HRDIComment").item(0).getTextContent();
							empId = eElement.getElementsByTagName("EmpID").item(0).getTextContent();
							chrsId = eElement.getElementsByTagName("chrsId").item(0).getTextContent();
							lastName = eElement.getElementsByTagName("EmpLastName").item(0).getTextContent();
							firstName = eElement.getElementsByTagName("EmpFirstName").item(0).getTextContent();
							empRCD = eElement.getElementsByTagName("EmpRCD").item(0).getTextContent();
							cbid = eElement.getElementsByTagName("CBID").item(0).getTextContent();
							classification = eElement.getElementsByTagName("Classification").item(0).getTextContent();
							departmentID = eElement.getElementsByTagName("DeptID").item(0).getTextContent();
							departmentName = eElement.getElementsByTagName("DeptName").item(0).getTextContent();
							range = eElement.getElementsByTagName("Range").item(0).getTextContent();
							evaluatorsName = eElement.getElementsByTagName("EvaluatorName").item(0).getTextContent();
							evaluationType = eElement.getElementsByTagName("EvaluationType").item(0).getTextContent();
							ratingPeriodFrom = eElement.getElementsByTagName("ReviewPeriodFrom").item(0)
									.getTextContent();
							ratingPeriodTo = eElement.getElementsByTagName("ReviewPeriodTo").item(0).getTextContent();
							athleticsEmp = eElement.getElementsByTagName("AthleticEmp").item(0).getTextContent();
							commentsOthers = eElement.getElementsByTagName("OtherRating").item(0).getTextContent();
							conceptualSkills = eElement.getElementsByTagName("ConceptualSkill").item(0)
									.getTextContent();
							interPersonalSkills = eElement.getElementsByTagName("InterpersonalSkills").item(0)
									.getTextContent();
							technicalSkills = eElement.getElementsByTagName("TechnicalSkills").item(0).getTextContent();
							others = eElement.getElementsByTagName("OtherSkills").item(0).getTextContent();
							overallRating = eElement.getElementsByTagName("OverallRating").item(0).getTextContent();
							sectionBComments = eElement.getElementsByTagName("SectionB").item(0).getTextContent();
							evalName = eElement.getElementsByTagName("EvaluatorNameSign").item(0).getTextContent();
							evalSign = eElement.getElementsByTagName("EvaluatorSign").item(0).getTextContent();
							evalDate = eElement.getElementsByTagName("EvaluatorDate").item(0).getTextContent();
							evalComments = eElement.getElementsByTagName("EvaluatorComment").item(0).getTextContent();
							evalCB = eElement.getElementsByTagName("EvalCB").item(0).getTextContent();
							adminName = eElement.getElementsByTagName("AdminName").item(0).getTextContent();
							adminSign = eElement.getElementsByTagName("AdminSign").item(0).getTextContent();
							adminDate = eElement.getElementsByTagName("AdminDate").item(0).getTextContent();
							adminComment = eElement.getElementsByTagName("AdminComment").item(0).getTextContent();
							adminCB = eElement.getElementsByTagName("AdminCB").item(0).getTextContent();
							empSign = eElement.getElementsByTagName("EmpSign").item(0).getTextContent();
							empDate = eElement.getElementsByTagName("EmpDate").item(0).getTextContent();
							empComments = eElement.getElementsByTagName("EmpComment").item(0).getTextContent();
							empCB = eElement.getElementsByTagName("EmpCB").item(0).getTextContent();
							atCritical = eElement.getElementsByTagName("AthleticEmpImpToPos").item(0).getTextContent();
							atOptions = eElement.getElementsByTagName("AthleticsEmpRating").item(0).getTextContent();
							supportStmt1 = eElement.getElementsByTagName("SupportStatement1").item(0).getTextContent();
							supportStmt2 = eElement.getElementsByTagName("SupportStatement2").item(0).getTextContent();
							supportStmt3 = eElement.getElementsByTagName("SupportStatement3").item(0).getTextContent();
							supportStmt4 = eElement.getElementsByTagName("SupportStatement4").item(0).getTextContent();
							hrCoordinatorSign = eElement.getElementsByTagName("HRCoordinatorSign").item(0)
									.getTextContent();
							hrCoordinatorSignDate = eElement.getElementsByTagName("HRCoordinatorSignDate").item(0)
									.getTextContent();
							hrCoordinatorSignComment = eElement.getElementsByTagName("HRCoordinatorSignComment").item(0)
									.getTextContent();
							hrCB = eElement.getElementsByTagName("HRDICB").item(0).getTextContent();
							hrCooCB = eElement.getElementsByTagName("HRCooCB").item(0).getTextContent();
						}
					}

					dataMap = new LinkedHashMap<String, Object>();
					dataMap.put("EMPID", empId);
					
					dataMap.put("CHRS_ID", chrsId);

					dataMap.put("LASTNAME", lastName);

					dataMap.put("FIRSTNAME", firstName);

					dataMap.put("CLASSIFICATION", classification);

					dataMap.put("EMPRCD", empRCD);

					dataMap.put("CBID", cbid);

					dataMap.put("DEPTNAME", departmentName);

					dataMap.put("RANGE", range);

					dataMap.put("DEPTID", departmentID);

					Object ratingPeriodFromObj = null;
					if (ratingPeriodFrom != null && ratingPeriodFrom != "") {
						Date ratingPeriodFromNew = Date.valueOf(ratingPeriodFrom);
						ratingPeriodFromObj = ratingPeriodFromNew;
					}
					dataMap.put("REVIEWPERIODFROM", ratingPeriodFromObj);
					Object ratingPeriodToObj = null;
					if (ratingPeriodTo != null && ratingPeriodTo != "") {
						Date ratingPeriodToNew = Date.valueOf(ratingPeriodTo);
						ratingPeriodToObj = ratingPeriodToNew;
					}
					dataMap.put("REVIEWPERIODTO", ratingPeriodToObj);
					dataMap.put("EVALUATORNAME", evaluatorsName);
					dataMap.put("EVALUATIONTYPE", evaluationType);
					dataMap.put("ATHLETICEMP", athleticsEmp);
					dataMap.put("OTHER_RATING", commentsOthers);
					dataMap.put("CONCEPTUALSKILLS", conceptualSkills);
					dataMap.put("INTERPERSONALSKILLS", interPersonalSkills);
					dataMap.put("TECHNICALSKILLS", technicalSkills);
					dataMap.put("OTHERS", others);
					dataMap.put("OVERALLRATING", overallRating);
					dataMap.put("SECTIONBCOMMENTS", sectionBComments);
					dataMap.put("ATHLETICEMP_IMP_TO_POS", atCritical);
					dataMap.put("ATHLETICEMPRATING", atOptions);
					dataMap.put("SUPPORTSTMT1", supportStmt1);
					dataMap.put("SUPPORTSTMT2", supportStmt2);
					dataMap.put("SUPPORTSTMT3", supportStmt3);
					dataMap.put("SUPPORTSTMT4", supportStmt4);
					dataMap.put("EVALUATORNAMESIGN", evalName);
					dataMap.put("EVALUATORSIGN", evalSign);
					log.info("Till Eval Sign");
					Object evalDateObj = null;
					if (evalDate != null && evalDate != "") {
						Date evalDateNew = Date.valueOf(evalDate);
						evalDateObj = evalDateNew;
					}
					dataMap.put("EVALUATORDATE", evalDateObj);
					dataMap.put("EVALUATORCOMMENT", evalComments);
					log.info("Till eval comment" + evalComments);
					dataMap.put("EVALCB", evalCB);
					dataMap.put("ADMINNAME", adminName);
					dataMap.put("ADMINSIGN", adminSign);
					Object adminDateObj = null;
					if (adminDate != null && adminDate != "") {
						Date adminDateNew = Date.valueOf(adminDate);
						adminDateObj = adminDateNew;
					}
					dataMap.put("ADMINDATE", adminDateObj);
					// dataMap.put("ADMINDATE", null);
					dataMap.put("ADMINCOMMENT", adminComment);
					dataMap.put("ADMINCB", adminCB);
					dataMap.put("HRCOOCB", hrCooCB);
					dataMap.put("HRCOOSIGN", hrCoordinatorSign);
					Object hrCooDateObj = null;
					if (hrCoordinatorSignDate != null && hrCoordinatorSignDate != "") {
						Date hrCooDateNew = Date.valueOf(hrCoordinatorSignDate);
						hrCooDateObj = hrCooDateNew;
					}
					dataMap.put("HRCOODATE", hrCooDateObj);
					dataMap.put("HRCOOCOMMENT", hrCoordinatorSignComment);
					dataMap.put("EMPSIGN", empSign);
					Object empDateObj = null;
					if (empDate != null && empDate != "") {
						Date empDateNew = Date.valueOf(empDate);
						empDateObj = empDateNew;
					}
					dataMap.put("EMPDATE", empDateObj);
					dataMap.put("EMPCOMMENT", empComments);
					dataMap.put("EMPCB", empCB);
					Object hrDateObj = null;
					if (hrDate != null && hrDate != "") {
						Date hrDateNew = Date.valueOf(hrDate);
						hrDateObj = hrDateNew;
					}
					dataMap.put("HRDATE", hrDateObj);
					dataMap.put("INITIALS", initials);
					dataMap.put("HRCOMMENT", hrComments);
					dataMap.put("HRCB", hrCB);
					dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceId);

				}
				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getEvalData(conn, empId, workflowInstanceId, tableName);
					log.error("Result == " + resultData);
					if (resultData != null && !resultData.equals("")) {
						log.error("Delete ++");
						dbUtil.deleteEvalData(conn, empId, workflowInstanceId, tableName);
						log.error("Re-insert");
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						log.error("Insert Data");
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}

			} catch (Exception e) {
				log.error("Exception in MPPPerfEvalDB=" + Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.error("IOException in MPPPerfEvalDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in MPPPerfEvalDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}

}
