package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.Route;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
//import com.adobe.icc.dbforms.util.DBUtils;
import com.google.gson.JsonArray;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.services.TaskService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Faculty Early Retirement Program Request Form DB",
		"service.vendor=ThoughtFocus", "process.label=Faculty Early Retirement Program Request Form DB" })

public class FacultyEarlyRetirementProgramRequestFormDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(FacultyEarlyRetirementProgramRequestFormDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_FERP_REQUEST_FORM";
		String formName = "Faculty Early Retirement Program Request Form";
		String assignee = "";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
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
							try {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								log.debug("index=" + temp);
								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("PRINT_NAME",
										eElement.getElementsByTagName("PrintName").item(0).getTextContent());
								dataMap.put("DEPARTMENT",
										eElement.getElementsByTagName("Department").item(0).getTextContent());
								dataMap.put("CHANGE_TO_PARTICIPATION_CB", eElement
										.getElementsByTagName("ChangeToParticipationCB").item(0).getTextContent());
								dataMap.put("CHANGE_FROM_PARTICIPATION_CB", eElement
										.getElementsByTagName("ChangeFromParticipationCB").item(0).getTextContent());
								dataMap.put("BEGIN_PARTICIPATION_CB",
										eElement.getElementsByTagName("BeginParticipationCB").item(0).getTextContent());
								dataMap.put("BEGIN_EFF_ACAD_YEAR",
										eElement.getElementsByTagName("BeginEffAcadYear").item(0).getTextContent());
								dataMap.put("BEGIN_RETIREMENT_DATE",
										eElement.getElementsByTagName("BeginRetirementDate").item(0).getTextContent());
								dataMap.put("SICK_LEAVE_RB",
										eElement.getElementsByTagName("SickLeaveRB").item(0).getTextContent());
								dataMap.put("CHANGE_EFF_ACAD_YEAR",
										eElement.getElementsByTagName("ChangeEffAcadYear").item(0).getTextContent());
								dataMap.put("FROM_FTERB",
										eElement.getElementsByTagName("FromFTERB").item(0).getTextContent());
								dataMap.put("TO_CB", eElement.getElementsByTagName("TOCB").item(0).getTextContent());
								dataMap.put("TO_FTE_VALUE",
										eElement.getElementsByTagName("ToFTEValue").item(0).getTextContent());
								dataMap.put("REDUCE_CB",
										eElement.getElementsByTagName("ReduceCB").item(0).getTextContent());
								dataMap.put("END_PARTICIPATION_EFFECTIVE_DT", eElement
										.getElementsByTagName("EndParticipationEffectiveDt").item(0).getTextContent());

								dataMap.put("FACULTY_MEM_SIGN",
										eElement.getElementsByTagName("FacultyMemSign").item(0).getTextContent());
								String facultymemdate = eElement.getElementsByTagName("FacultyMemDate").item(0)
										.getTextContent();
								Object facultymemdateObj = "";
								if (facultymemdate != null && facultymemdate != "") {
									Date facultymemdateNew = Date.valueOf(facultymemdate);
									facultymemdateObj = facultymemdateNew;
								}
								dataMap.put("FACULTY_MEM_DATE", facultymemdateObj);

								dataMap.put("CHAIR_SIGN",
										eElement.getElementsByTagName("ChairSign").item(0).getTextContent());
								String chairdate = eElement.getElementsByTagName("ChairDate").item(0).getTextContent();
								Object chairdateObj = "";
								if (chairdate != null && chairdate != "") {
									Date chairdateNew = Date.valueOf(chairdate);
									chairdateObj = chairdateNew;
								}
								dataMap.put("CHAIR_DATE", chairdateObj);

								dataMap.put("DEAN_SIGN",
										eElement.getElementsByTagName("DeanSign").item(0).getTextContent());
								String deandate = eElement.getElementsByTagName("DeanDate").item(0).getTextContent();
								Object deandateObj = "";
								if (deandate != null && deandate != "") {
									Date deandateNew = Date.valueOf(deandate);
									deandateObj = deandateNew;
								}
								dataMap.put("DEAN_DATE", deandateObj);

								dataMap.put("VPAA_SIGN",
										eElement.getElementsByTagName("VPAASign").item(0).getTextContent());
								String VPAAdate = eElement.getElementsByTagName("VPAADate").item(0).getTextContent();
								Object VPAAdateObj = "";
								if (VPAAdate != null && VPAAdate != "") {
									Date VPAAdateNew = Date.valueOf(VPAAdate);
									VPAAdateObj = VPAAdateNew;
								}
								dataMap.put("VPAA_DATE", VPAAdateObj);

								dataMap.put("DEPT_COO_SIGN",
										eElement.getElementsByTagName("DeptCooSign").item(0).getTextContent());
								String deptcoodate = eElement.getElementsByTagName("DeptCooDate").item(0)
										.getTextContent();
								Object deptcoodateObj = "";
								if (deptcoodate != null && deptcoodate != "") {
									Date deptcoodateNew = Date.valueOf(deptcoodate);
									deptcoodateObj = deptcoodateNew;
								}
								dataMap.put("DEPT_COO_DATE", deptcoodateObj);

								dataMap.put("AHR_SIGN",
										eElement.getElementsByTagName("AHRSign").item(0).getTextContent());
								String AHRdate = eElement.getElementsByTagName("AHRDate").item(0).getTextContent();
								Object AHRdateObj = "";
								if (AHRdate != null && AHRdate != "") {
									Date AHRdateNew = Date.valueOf(AHRdate);
									AHRdateObj = AHRdateNew;
								}
								dataMap.put("AHR_DATE", AHRdateObj);

								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								dataMap.put("FACULTY_USER_ID",
										eElement.getElementsByTagName("FacultyUserId").item(0).getTextContent());
								dataMap.put("FACULTY_FIRST_NAME",
										eElement.getElementsByTagName("FacultyFirstName").item(0).getTextContent());
								dataMap.put("FACULTY_LAST_NAME",
										eElement.getElementsByTagName("FacultyLastName").item(0).getTextContent());
								dataMap.put("FACULTY_EMAIL",
										eElement.getElementsByTagName("FacultyEmail").item(0).getTextContent());
								dataMap.put("INITIATOR_USER_ID",
										eElement.getElementsByTagName("InitiatorUserId").item(0).getTextContent());
								dataMap.put("DEPT_ID",
										eElement.getElementsByTagName("DeptId").item(0).getTextContent());
								dataMap.put("CHAIR_USER_ID",
										eElement.getElementsByTagName("ChairUserId").item(0).getTextContent());
								dataMap.put("CHAIR_EMAIL",
										eElement.getElementsByTagName("ChairEmail").item(0).getTextContent());
								dataMap.put("CHAIR_NAME",
										eElement.getElementsByTagName("ChairName").item(0).getTextContent());
								dataMap.put("CHAIR_APPROVAL",
										eElement.getElementsByTagName("ChairApproval").item(0).getTextContent());
								dataMap.put("DEAN_USER_ID",
										eElement.getElementsByTagName("DeanUserId").item(0).getTextContent());
								dataMap.put("DEAN_EMAIL",
										eElement.getElementsByTagName("DeanEmail").item(0).getTextContent());
								dataMap.put("DEAN_NAME",
										eElement.getElementsByTagName("DeanName").item(0).getTextContent());
								dataMap.put("DEAN_APPROVAL",
										eElement.getElementsByTagName("DeanApproval").item(0).getTextContent());
								dataMap.put("VPAA_APPROVAL",
										eElement.getElementsByTagName("VPAApproval").item(0).getTextContent());
								dataMap.put("DEPT_COO_CB",
										eElement.getElementsByTagName("DeptCooCB").item(0).getTextContent());
								dataMap.put("FACULTY_MEM_COMMENTS",
										eElement.getElementsByTagName("FacultyMemComments").item(0).getTextContent());
								dataMap.put("CHAIR_COMMENTS",
										eElement.getElementsByTagName("ChairComments").item(0).getTextContent());
								dataMap.put("DEAN_COMMENTS",
										eElement.getElementsByTagName("DeanComments").item(0).getTextContent());
								dataMap.put("VPAA_COMMENTS",
										eElement.getElementsByTagName("VPAAComments").item(0).getTextContent());
								dataMap.put("DEPT_COO_COMMENTS",
										eElement.getElementsByTagName("DeptCooComments").item(0).getTextContent());
								dataMap.put("AHR_COMMENTS",
										eElement.getElementsByTagName("AHRComments").item(0).getTextContent());
								dataMap.put("INITIATOR_EMAIL",
										eElement.getElementsByTagName("InitiatorEmail").item(0).getTextContent());
								dataMap.put("PREPARE_NAME",
										eElement.getElementsByTagName("PreparerName").item(0).getTextContent());
								dataMap.put("END_PARTICIPATION_YEAR",
										eElement.getElementsByTagName("EndPArticipationYear").item(0).getTextContent());
								dataMap.put("END_PARTICIPATION_RB",
										eElement.getElementsByTagName("EndParticipationRB").item(0).getTextContent());
								dataMap.put("PAYROLL_SIGN",
										eElement.getElementsByTagName("PayRollSign").item(0).getTextContent());
								dataMap.put("PAYROLL_COMMENTS",
										eElement.getElementsByTagName("PayrollComments").item(0).getTextContent());
								String payrollDate = eElement.getElementsByTagName("PayRollDate").item(0)
										.getTextContent();
								dataMap.put("PAYROLL_DATE", DatabaseUtils.convertToDate(payrollDate));

								List<Route> backRoutesList = workflowSession.getBackRoutes(workItem, false);
								JsonArray backRoutesJson = new JsonArray();
								for (Route backRoute : backRoutesList) {
									backRoutesJson.add(backRoute.getName());
								}
								String saveHistoryBackRoute = "";
								if (backRoutesJson.size() == 1) {
									saveHistoryBackRoute = backRoutesList.get(0).getName();
								} else {
									saveHistoryBackRoute = backRoutesList.get(1).getName();
									String wId = workItem.getId().replace("VolatileWorkItem_", "/workItems/");
									String firstStr = wId.substring(0, wId.indexOf('_'));
									String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
									String t1 = firstStr.replaceAll("[^0-9]+", "");
									int a1 = Integer.parseInt(t1);
									a1 = a1 - 2;
									firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
									String workItemId = workflowInstanceID.concat(firstStr).concat("_")
											.concat(secString);
									assignee = taskService.getTaskAssignee(workItemId);
								}
								dataMap.put("LAST_STEP", saveHistoryBackRoute);
								dataMap.put("LAST_STEP_ASSIGNEE", assignee);
								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in FacultyEarlyRetirementProgramRequestFormDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error("SQLException in FacultyEarlyRetirementProgramRequestFormDB Finally Block="
							+ Arrays.toString(e.getStackTrace()));
				}
			}

		}

	}

}
