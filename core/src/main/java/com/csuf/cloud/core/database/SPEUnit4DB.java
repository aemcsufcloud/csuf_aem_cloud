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
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;

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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=SPE Save in DB", Constants.SERVICE_VENDOR + "=Adobe Systems",
		"process.label" + "=SPEUnit4Save" })
public class SPEUnit4DB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(SPEUnit4DB.class);

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_STAFF_PERF_EVAL_UNIT4";
		String formName = "Staff Performance Evaluation Unit 4";
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;
		String empId = "";
		String chrsId = "";
		String empRCD = "";
		String cbid = "";
		String draftDate = "";
		String evaluationType = "";
		String firstName = "";
		String lastName = "";
		String classification = "";
		String range = "";
		String departmentName = "";
		String departmentID = "";
		String ratingPeriodFrom = "";
		String ratingPeriodTo = "";
		String jobStrengthComment = "";
		String overallRating = "";
		String evalCB = "";
		String evalSign = "";
		String evalSignDate = "";
		String empCB = "";
		String empSign = "";
		String empComment = "";
		String hrCB = "";
		String hrDate = "";
		String quality = "";
		String quantity = "";
		String professionalJudgement = "";
		String contributionCampus = "";
		String sectionBComment = "";
		String sectionCComment = "";
		String sectionDComment = "";
		String sectionEComment = "";
		String probEmployee = "";
		String empDidNoSignCB = "";
		String evalName = "";
		String evalComment = "";
		String hrCoordCB = "";
		String hrCoordSign = "";
		String hrCoordDate = "";
		String hrCoordComment = "";
		String empDate = "";
		String adminCb = "";
		String adminName = "";
		String adminSign = "";
		String adminDate = "";
		String adminComment = "";
		String hrInitials = "";
		String hrComment = "";
		String division = "";
		String division_name = "";
		String basedOnObs = "";
		String basedOnObs1 = "";
		String hrCooFname = "";
		String hrCooLname = "";
		String hrCoo_name = "";
		LinkedHashMap<String, Object> dataMap = null;
		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);
		String workflowInstanceId = workItem.getWorkflow().getId();
		if (StringUtils.isNotBlank(payloadPath)) {
			try {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");
				if (null != is) {
					doc = XMLUtils.getDomDocument(is);
					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
							ratingPeriodFrom = eElement.getElementsByTagName("RatingPeriodFrom").item(0)
									.getTextContent();
							ratingPeriodTo = eElement.getElementsByTagName("RatingPeriodTo").item(0).getTextContent();
							draftDate = eElement.getElementsByTagName("draftDate").item(0).getTextContent();
							empId = eElement.getElementsByTagName("EmpID").item(0).getTextContent();
							chrsId = eElement.getElementsByTagName("chrsId").item(0).getTextContent();
							empRCD = eElement.getElementsByTagName("EmpRCD").item(0).getTextContent();
							cbid = eElement.getElementsByTagName("CBID").item(0).getTextContent();
							classification = eElement.getElementsByTagName("Classification").item(0).getTextContent();
							range = eElement.getElementsByTagName("Range").item(0).getTextContent();
							evaluationType = eElement.getElementsByTagName("EvaluationType").item(0).getTextContent();
							firstName = eElement.getElementsByTagName("FirstName").item(0).getTextContent();
							lastName = eElement.getElementsByTagName("LastName").item(0).getTextContent();
							departmentID = eElement.getElementsByTagName("DepartmentID").item(0).getTextContent();
							departmentName = eElement.getElementsByTagName("DepartmentName").item(0).getTextContent();
							quality = eElement.getElementsByTagName("Quality").item(0).getTextContent();
							quantity = eElement.getElementsByTagName("Quantity").item(0).getTextContent();
							professionalJudgement = eElement.getElementsByTagName("ProfessionalJudgement").item(0)
									.getTextContent();
							contributionCampus = eElement.getElementsByTagName("ContributionCampus").item(0)
									.getTextContent();
							jobStrengthComment = eElement.getElementsByTagName("JobStrengthComment").item(0)
									.getTextContent();
							sectionBComment = eElement.getElementsByTagName("SectiotnBComment").item(0)
									.getTextContent();
							sectionCComment = eElement.getElementsByTagName("SectionCProgressComment").item(0)
									.getTextContent();
							sectionDComment = eElement.getElementsByTagName("SectionDImprovementComment").item(0)
									.getTextContent();
							sectionEComment = eElement.getElementsByTagName("SectionEImprovementComment").item(0)
									.getTextContent();
							probEmployee = eElement.getElementsByTagName("ProbEmployee").item(0).getTextContent();
							overallRating = eElement.getElementsByTagName("OverallRating").item(0).getTextContent();
							evalCB = eElement.getElementsByTagName("EvalCB").item(0).getTextContent();
							empDidNoSignCB = eElement.getElementsByTagName("EmpDidNotSignCB").item(0).getTextContent();
							evalName = eElement.getElementsByTagName("EvaluatorNameSign").item(0).getTextContent();
							evalSign = eElement.getElementsByTagName("EvaluatorSign").item(0).getTextContent();
							evalSignDate = eElement.getElementsByTagName("EvaluatorDate").item(0).getTextContent();
							evalComment = eElement.getElementsByTagName("EvaluatorComment").item(0).getTextContent();
							hrCoordCB = eElement.getElementsByTagName("HRCooCB").item(0).getTextContent();
							hrCoordSign = eElement.getElementsByTagName("HRCoordinatorSign").item(0).getTextContent();
							hrCoordDate = eElement.getElementsByTagName("HRCoordinatorSignDate").item(0)
									.getTextContent();
							hrCoordComment = eElement.getElementsByTagName("HRCoordinatorSignComment").item(0)
									.getTextContent();
							empCB = eElement.getElementsByTagName("EmpCB").item(0).getTextContent();
							empSign = eElement.getElementsByTagName("EmpSign").item(0).getTextContent();
							empDate = eElement.getElementsByTagName("EmpDate").item(0).getTextContent();
							empComment = eElement.getElementsByTagName("EmpComment").item(0).getTextContent();
							adminCb = eElement.getElementsByTagName("AdminCB").item(0).getTextContent();
							adminName = eElement.getElementsByTagName("AdminName").item(0).getTextContent();
							adminSign = eElement.getElementsByTagName("AdminSign").item(0).getTextContent();
							adminDate = eElement.getElementsByTagName("AdminDate").item(0).getTextContent();
							adminComment = eElement.getElementsByTagName("AdminComment").item(0).getTextContent();
							hrCB = eElement.getElementsByTagName("HRDICB").item(0).getTextContent();
							hrInitials = eElement.getElementsByTagName("HRDIInitials").item(0).getTextContent();
							hrDate = eElement.getElementsByTagName("HRDIDate").item(0).getTextContent();
							hrComment = eElement.getElementsByTagName("HRDIComment").item(0).getTextContent();
							division = eElement.getElementsByTagName("division").item(0).getTextContent();
							division_name = eElement.getElementsByTagName("divisionName").item(0).getTextContent();
							basedOnObs = eElement.getElementsByTagName("BasedOnObservation").item(0).getTextContent();
							basedOnObs1 = eElement.getElementsByTagName("BasedOnObservation1").item(0).getTextContent();
							hrCooFname = eElement.getElementsByTagName("HrCoordFname").item(0).getTextContent();
							hrCooLname = eElement.getElementsByTagName("HrCoordLname").item(0).getTextContent();
							hrCoo_name = hrCooFname.concat(" ".concat(hrCooLname));
						}
					}

					dataMap = new LinkedHashMap<String, Object>();
					Object reviewPeriodFromObj = null;
					if (ratingPeriodFrom != null && ratingPeriodFrom != "") {
						Date reviewPeriodFromNew = Date.valueOf(ratingPeriodFrom);
						reviewPeriodFromObj = reviewPeriodFromNew;
					}
					dataMap.put("RATE_PERIOD_FROM", reviewPeriodFromObj);
					Object reviewPeriodToObj = null;
					if (ratingPeriodTo != null && ratingPeriodTo != "") {
						Date reviewPeriodToNew = Date.valueOf(ratingPeriodTo);
						reviewPeriodToObj = reviewPeriodToNew;
					}
					dataMap.put("RATE_PERIOD_TO", reviewPeriodToObj);

					Object draftDateObj = null;
					if (draftDate != null && draftDate != "") {
						Date draftDateNew = Date.valueOf(draftDate);
						draftDateObj = draftDateNew;
					}
					dataMap.put("DRAFT_DATE", draftDateObj);
					dataMap.put("EMPL_ID", empId);
					dataMap.put("CHRS_ID", chrsId);
					dataMap.put("EMP_RCD", empRCD);
					dataMap.put("CBID", cbid);
					dataMap.put("CLASSIFICATION", classification);
					dataMap.put("EMP_RANGE", range);
					dataMap.put("EVALUATION_TYPE", evaluationType);
					dataMap.put("FIRST_NAME", firstName);
					dataMap.put("LAST_NAME", lastName);
					dataMap.put("DEPARTMENT_ID", departmentID);
					dataMap.put("DEPARTMENT_NAME", departmentName);
					dataMap.put("QUALITY", quality);
					dataMap.put("QUANTITY", quantity);
					dataMap.put("PROFESSIONAL_JUDGEMENT", professionalJudgement);
					dataMap.put("CONTRIBUTION_CAMPUS", contributionCampus);
					dataMap.put("JOB_STRENGTH_COMMENT", jobStrengthComment);
					dataMap.put("COMMENTS", sectionBComment);
					dataMap.put("PROGRESS_COMMENTS", sectionCComment);
					dataMap.put("IMPROVEMENTS_COMMENT", sectionDComment);
					dataMap.put("GOALS_PROGRAMS_COMMENT", sectionEComment);
					dataMap.put("PROB_EMP_RB", probEmployee);
					dataMap.put("OVERALL_RATING", overallRating);
					dataMap.put("EVAL_DECL_CB", evalCB);
					dataMap.put("EMPLOYEE_DIDNOT_SIGN", empDidNoSignCB);
					dataMap.put("EVALUATOR_NAME", evalName);
					dataMap.put("EVALUATORS_SIGNATURE", evalSign);
					Object evalDateObj = null;
					if (evalSignDate != null && evalSignDate != "") {
						Date evalDateNew = Date.valueOf(evalSignDate);
						evalDateObj = evalDateNew;
					}
					dataMap.put("EVAL_SIGN_DATE", evalDateObj);
					dataMap.put("EVAL_COMMENTS", evalComment);
					dataMap.put("HR_COORD_DECL_CB", hrCoordCB);
					dataMap.put("HR_COORD_SIGNATURE", hrCoordSign);

					Object hrCoordSignObj = null;
					if (hrCoordDate != null && hrCoordDate != "") {
						Date hrCoordDateNew = Date.valueOf(hrCoordDate);
						hrCoordSignObj = hrCoordDateNew;
					}
					dataMap.put("HR_COORD_DATE", hrCoordSignObj);
					dataMap.put("HR_COORD_SIGNATURE_COMMENT", hrCoordComment);
					dataMap.put("EMP_DECL_CB", empCB);
					dataMap.put("EMP_SIGN", empSign);
					Object empSignObj = null;
					if (empDate != null && empDate != "") {
						Date empDateNew = Date.valueOf(empDate);
						empSignObj = empDateNew;
					}
					dataMap.put("EMP_SIGN_DATE", empSignObj);
					dataMap.put("EMP_COMMENT", empComment);
					dataMap.put("ADMIN_DECL_CB", adminCb);
					dataMap.put("ADMIN_NAME", adminName);
					dataMap.put("ADMIN_SIGNATURE", adminSign);

					Object adminObj = null;
					if (adminDate != null && adminDate != "") {
						Date adminDateNew = Date.valueOf(adminDate);
						adminObj = adminDateNew;
					}
					dataMap.put("ADMIN_DATE", adminObj);
					dataMap.put("ADMIN_COMMENT", adminComment);
					dataMap.put("HR_DECL_CB", hrCB);
					dataMap.put("HR_INITIALS", hrInitials);

					Object hrDateObj = null;
					if (hrDate != null && hrDate != "") {
						Date hrDateNew = Date.valueOf(hrDate);
						hrDateObj = hrDateNew;
					}
					dataMap.put("HR_DATE", hrDateObj);
					dataMap.put("HR_COMMENT", hrComment);
					dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceId);
					dataMap.put("BASED_ON_OBSERVATION", basedOnObs);
					dataMap.put("BASED_ON_OBSERVATION1", basedOnObs1);
					dataMap.put("DIVISION", division);
					dataMap.put("DIVISION_NAME", division_name);
					dataMap.put("HRCOO_NAME", hrCoo_name);
				}
				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					String resultData = dbUtil.getSPEEvalData(conn, empId,"EMPL_ID", workflowInstanceId, tableName);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, empId,"EMPL_ID", workflowInstanceId, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}

			} catch (Exception e) {
				log.error("Exception in SPEUnit4DB=" + Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.error("IOException in SPEUnit4DB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in SPEUnit4DB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}
			
		}
	}

}
