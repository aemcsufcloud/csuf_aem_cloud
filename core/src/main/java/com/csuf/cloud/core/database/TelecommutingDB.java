package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;

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
import com.adobe.granite.workflow.exec.Route;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.google.gson.JsonArray;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.services.TaskService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Telecommuting Forms Save in DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=TelecommutingFormsSave" })
public class TelecommutingDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(TelecommutingDB.class);

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_TELECOMMUTING_AGREEMENT";
		String formName = "Telecommuting Agreement";

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;
		String employeename = "";
		String officialworklocation = "";
		String telecommutinglocation = "";
		String telecommutingdays = "";
		String workhours = "";
		String st_dt = "";
		String end_dt = "";
		String telecommutingfromcity = "";
		String empsignature = "";
		String empsigndate = "";
		String empprintname = "";
		String adminprintname = "";
		String adminsigndate = "";
		String administratorsignature = "";
		String administratorcomments = "";
		String department = "";
		String hrdisigndate = "";
		String hrdisignature = "";
		String hrdiprintname = "";
		String hrdicomments = "";
		String alternativecb1 = "";
		String alternativecb2 = "";
		String alternativecb3 = "";
		String alternativecb4 = "";
		String alternativecb5 = "";
		String alternativecb6 = "";
		String alternativecb7 = "";
		String alternativecb8 = "";
		String alternativecb9 = "";
		String alternativecb10 = "";
		String alternativecb11 = "";
		String emergencycb1 = "";
		String emergencycb2 = "";
		String emergencycb3 = "";
		String emergencycb4 = "";
		String emergencycb5 = "";
		String telecommutersigndate = "";
		String telecommutername = "";
		String telecommutersignature = "";
		String stageindicator = "";
		String emplname = "";
		String emplid = "";
		String emplemail = "";
		String empldept = "";
		String emplunioncode = "";
		String empluserid = "";
		String adminuserid = "";
		String adminname = "";
		String adminemail = "";
		String avpsigndate = "";
		String avpsignature = "";
		String avpprintname = "";
		String avpcomments = "";
		String avpJustification = "";
		String adminJustification = "";
		String avpdecision = "";
		String admindecision = "";
		String assignee = "";
		String divisionName = "";
		String division = "";
		String divisionApproverName = "";
		String divisionApproverId = "";
		String divisionApproverEmail = "";
		String divisionApproverSign = "";
		String divisionApproverSignedDate = "";
		String divisionApproverComments = "";
		String workflowInstance = workItem.getWorkflow().getId();
		LinkedHashMap<String, Object> dataMap = null;
		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
		String workflowInstanceId = workItem.getWorkflow().getId();
		MetaDataMap metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
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
							employeename = eElement.getElementsByTagName("EmployeeName").item(0).getTextContent();
							officialworklocation = eElement.getElementsByTagName("OfficialWorkLocation").item(0)
									.getTextContent();
							telecommutinglocation = eElement.getElementsByTagName("TelecommutingLocation").item(0)
									.getTextContent();
							telecommutingdays = eElement.getElementsByTagName("TelecommutingDays").item(0)
									.getTextContent();
							workhours = eElement.getElementsByTagName("WorkHours").item(0).getTextContent();
							st_dt = eElement.getElementsByTagName("St_Dt").item(0).getTextContent();
							end_dt = eElement.getElementsByTagName("End_Dt").item(0).getTextContent();
							telecommutingfromcity = eElement.getElementsByTagName("TelecommutingFromCity").item(0)
									.getTextContent();
							empsignature = eElement.getElementsByTagName("EmpSignature").item(0).getTextContent();
							empsigndate = eElement.getElementsByTagName("EmpSignDate").item(0).getTextContent();
							empprintname = eElement.getElementsByTagName("EmpPrintName").item(0).getTextContent();
							adminprintname = eElement.getElementsByTagName("AdminPrintName").item(0).getTextContent();
							adminsigndate = eElement.getElementsByTagName("AdminSignDate").item(0).getTextContent();
							administratorsignature = eElement.getElementsByTagName("AdministratorSignature").item(0)
									.getTextContent();
							administratorcomments = eElement.getElementsByTagName("AdministratorComments").item(0)
									.getTextContent();
							department = eElement.getElementsByTagName("Department").item(0).getTextContent();
							hrdisigndate = eElement.getElementsByTagName("HRDISignDate").item(0).getTextContent();
							hrdisignature = eElement.getElementsByTagName("HRDISignature").item(0).getTextContent();
							hrdiprintname = eElement.getElementsByTagName("HRDIPrintName").item(0).getTextContent();
							hrdicomments = eElement.getElementsByTagName("HRDIComments").item(0).getTextContent();
							alternativecb1 = eElement.getElementsByTagName("AlternativeCB1").item(0).getTextContent();
							alternativecb2 = eElement.getElementsByTagName("AlternativeCB2").item(0).getTextContent();
							alternativecb3 = eElement.getElementsByTagName("AlternativeCB3").item(0).getTextContent();
							alternativecb4 = eElement.getElementsByTagName("AlternativeCB4").item(0).getTextContent();
							alternativecb5 = eElement.getElementsByTagName("AlternativeCB5").item(0).getTextContent();
							alternativecb6 = eElement.getElementsByTagName("AlternativeCB6").item(0).getTextContent();
							alternativecb7 = eElement.getElementsByTagName("AlternativeCB7").item(0).getTextContent();
							alternativecb8 = eElement.getElementsByTagName("AlternativeCB8").item(0).getTextContent();
							alternativecb9 = eElement.getElementsByTagName("AlternativeCB9").item(0).getTextContent();
							alternativecb10 = eElement.getElementsByTagName("AlternativeCB10").item(0).getTextContent();
							alternativecb11 = eElement.getElementsByTagName("AlternativeCB11").item(0).getTextContent();
							emergencycb1 = eElement.getElementsByTagName("EmergencyCB1").item(0).getTextContent();
							emergencycb2 = eElement.getElementsByTagName("EmergencyCB2").item(0).getTextContent();
							emergencycb3 = eElement.getElementsByTagName("EmergencyCB3").item(0).getTextContent();
							emergencycb4 = eElement.getElementsByTagName("EmergencyCB4").item(0).getTextContent();
							emergencycb5 = eElement.getElementsByTagName("EmergencyCB5").item(0).getTextContent();
							telecommutersigndate = eElement.getElementsByTagName("TelecommuterSignDate").item(0)
									.getTextContent();
							telecommutername = eElement.getElementsByTagName("TelecommuterName").item(0)
									.getTextContent();
							telecommutersignature = eElement.getElementsByTagName("TelecommuterSignature").item(0)
									.getTextContent();
							stageindicator = eElement.getElementsByTagName("StageIndicator").item(0).getTextContent();
							emplname = eElement.getElementsByTagName("EmplName").item(0).getTextContent();
							emplid = eElement.getElementsByTagName("EmplId").item(0).getTextContent();
							emplemail = eElement.getElementsByTagName("EmplEmail").item(0).getTextContent();
							empldept = eElement.getElementsByTagName("EmplDept").item(0).getTextContent();
							emplunioncode = eElement.getElementsByTagName("EmplUnionCode").item(0).getTextContent();
							empluserid = eElement.getElementsByTagName("EmplUserId").item(0).getTextContent();
							adminuserid = eElement.getElementsByTagName("AdminUserId").item(0).getTextContent();
							adminname = eElement.getElementsByTagName("AdminName").item(0).getTextContent();
							adminemail = eElement.getElementsByTagName("AdminEmail").item(0).getTextContent();
							avpsigndate = eElement.getElementsByTagName("AVPSignDate").item(0).getTextContent();
							avpsignature = eElement.getElementsByTagName("AVPSignature").item(0).getTextContent();
							avpprintname = eElement.getElementsByTagName("AVPPrintName").item(0).getTextContent();
							avpcomments = eElement.getElementsByTagName("AVPComments").item(0).getTextContent();
							avpJustification = eElement.getElementsByTagName("AVPJustification").item(0)
									.getTextContent();
							adminJustification = eElement.getElementsByTagName("AdminJustification").item(0)
									.getTextContent();
							avpdecision = eElement.getElementsByTagName("AVPDecision").item(0).getTextContent();
							admindecision = eElement.getElementsByTagName("AdminDecision").item(0).getTextContent();
							divisionName = eElement.getElementsByTagName("DivisionName").item(0).getTextContent();
							division = eElement.getElementsByTagName("Division").item(0).getTextContent();
							divisionApproverName = eElement.getElementsByTagName("DivisionAppName").item(0)
									.getTextContent();
							divisionApproverId = eElement.getElementsByTagName("DivisionAppUserID").item(0)
									.getTextContent();
							divisionApproverEmail = eElement.getElementsByTagName("DivisionAppEmail").item(0)
									.getTextContent();
							divisionApproverSign = eElement.getElementsByTagName("DivisionApproverSignature").item(0)
									.getTextContent();
							divisionApproverSignedDate = eElement.getElementsByTagName("DivisionApproverSignDate")
									.item(0).getTextContent();
							divisionApproverComments = eElement.getElementsByTagName("DivisionApproverComments").item(0)
									.getTextContent();
						}
					}

					dataMap = new LinkedHashMap<String, Object>();
					dataMap.put("EMPLOYEENAME", employeename);
					dataMap.put("OFFICIALWORKLOCATION", officialworklocation);
					dataMap.put("TELECOMMUTINGLOCATION", telecommutinglocation);
					dataMap.put("TELECOMMUTINGDAYS", telecommutingdays);
					dataMap.put("WORKHOURS", workhours);
					Object st_dtObj = null;
					if (st_dt != null && st_dt != "") {
						Date st_dtFromNew = Date.valueOf(st_dt);
						st_dtObj = st_dtFromNew;
					}
					dataMap.put("ST_DT", st_dtObj);
					Object end_dtObj = null;
					if (end_dt != null && end_dt != "") {
						Date end_dtFromNew = Date.valueOf(end_dt);
						end_dtObj = end_dtFromNew;
					}
					dataMap.put("END_DT", end_dtObj);
					dataMap.put("TELECOMMUTINGFROMCITY", telecommutingfromcity);
					dataMap.put("EMPSIGNATURE", empsignature);
					Object emp_dtObj = null;
					if (empsigndate != null && empsigndate != "") {
						Date emp_dtFromNew = Date.valueOf(empsigndate);
						emp_dtObj = emp_dtFromNew;
					}
					dataMap.put("EMPSIGNDATE", emp_dtObj);
					dataMap.put("EMPPRINTNAME", empprintname);
					dataMap.put("ADMINPRINTNAME", adminprintname);
					Object admin_dtObj = null;
					if (adminsigndate != null && adminsigndate != "") {
						Date admin_dtFromNew = Date.valueOf(adminsigndate);
						admin_dtObj = admin_dtFromNew;
					}
					dataMap.put("ADMINSIGNDATE", admin_dtObj);
					dataMap.put("ADMINISTRATORSIGNATURE", administratorsignature);
					dataMap.put("ADMINISTRATORCOMMENTS", administratorcomments);
					dataMap.put("DEPARTMENT", department);
					Object hr_dtObj = null;
					if (hrdisigndate != null && hrdisigndate != "") {
						Date hr_dtFromNew = Date.valueOf(hrdisigndate);
						hr_dtObj = hr_dtFromNew;
					}
					dataMap.put("HRDISIGNDATE", hr_dtObj);
					dataMap.put("HRDISIGNATURE", hrdisignature);
					dataMap.put("HRDIPRINTNAME", hrdiprintname);
					dataMap.put("HRDICOMMENTS", hrdicomments);
					dataMap.put("ALTERNATIVECB1", alternativecb1);
					dataMap.put("ALTERNATIVECB2", alternativecb2);
					dataMap.put("ALTERNATIVECB3", alternativecb3);
					dataMap.put("ALTERNATIVECB4", alternativecb4);
					dataMap.put("ALTERNATIVECB5", alternativecb5);
					dataMap.put("ALTERNATIVECB6", alternativecb6);
					dataMap.put("ALTERNATIVECB7", alternativecb7);
					dataMap.put("ALTERNATIVECB8", alternativecb8);
					dataMap.put("ALTERNATIVECB9", alternativecb9);
					dataMap.put("ALTERNATIVECB10", alternativecb10);
					dataMap.put("ALTERNATIVECB11", alternativecb11);
					dataMap.put("EMERGENCYCB1", emergencycb1);
					dataMap.put("EMERGENCYCB2", emergencycb2);
					dataMap.put("EMERGENCYCB3", emergencycb3);
					dataMap.put("EMERGENCYCB4", emergencycb4);
					dataMap.put("EMERGENCYCB5", emergencycb5);

					Object tel_dtObj = null;
					if (telecommutersigndate != null && telecommutersigndate != "") {
						Date tel_dtFromNew = Date.valueOf(telecommutersigndate);
						tel_dtObj = tel_dtFromNew;
					}
					dataMap.put("TELECOMMUTERSIGNDATE", tel_dtObj);
					dataMap.put("TELECOMMUTERNAME", telecommutername);
					dataMap.put("TELECOMMUTERSIGNATURE", telecommutersignature);
					dataMap.put("EMPLNAME", emplname);
					dataMap.put("EMPLID", emplid);

					dataMap.put("EMPLEMAIL", emplemail);
					dataMap.put("EMPLDEPT", empldept);
					dataMap.put("EMPLUNIONCODE", emplunioncode);
					dataMap.put("EMPLUSERID", empluserid);
					dataMap.put("ADMINUSERID", adminuserid);
					dataMap.put("ADMINNAME", adminname);

					dataMap.put("ADMINEMAIL", adminemail);
					Object vp_dtObj = null;
					if (avpsigndate != null && avpsigndate != "") {
						Date vp_dtFromNew = Date.valueOf(avpsigndate);
						vp_dtObj = vp_dtFromNew;
					}
					dataMap.put("AVPSIGNDATE", vp_dtObj);
					dataMap.put("AVPSIGNATURE", avpsignature);
					dataMap.put("AVPPRINTNAME", avpprintname);
					dataMap.put("AVPCOMMENTS", avpcomments);
					dataMap.put("STAGEINDICATOR", stageindicator);
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
						String workItemId = workflowInstance.concat(firstStr).concat("_").concat(secString);
						assignee = taskService.getTaskAssignee(workItemId);
					}
					dataMap.put("LAST_STEP", saveHistoryBackRoute);
					dataMap.put("LAST_STEP_ASSIGNEE", assignee);
					dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstance);
					dataMap.put("AVP_DECISION", avpdecision);
					dataMap.put("ADMIN_DECISION", admindecision);
					dataMap.put("AVP_JUSTIFICATION", avpJustification);
					dataMap.put("ADMIN_JUSTIFICATION", adminJustification);

					if (StringUtils.isBlank(avpdecision) && admindecision.equals("2")
							&& (metaDataMap.containsKey("actionTakenByAdmin")
									&& metaDataMap.get("actionTakenByAdmin").toString().equals("Submit"))) {
						dataMap.put("WORKFLOW_STATUS", "COMPLETED");
					} else if (StringUtils.isNotBlank(avpdecision) && (metaDataMap.containsKey("actionTakenByAVP"))) {
						dataMap.put("WORKFLOW_STATUS", "COMPLETED");
					} else {
						dataMap.put("WORKFLOW_STATUS", "RUNNING");
					}
					dataMap.put("DIVISION_NAME", divisionName);
					dataMap.put("DIVISION", division);
					dataMap.put("DIVISION_APP_NAME", divisionApproverName);
					dataMap.put("DIVISION_APP_USERID", divisionApproverId);
					dataMap.put("DIVISION_APP_EMAIL", divisionApproverEmail);
					dataMap.put("DIVISION_APP_SIGN", divisionApproverSign);
					Object app_dtObj = null;
					if (divisionApproverSignedDate != null && divisionApproverSignedDate != "") {
						Date app_dtNew = Date.valueOf(divisionApproverSignedDate);
						app_dtObj = app_dtNew;
					}
					dataMap.put("DIVISION_APP_SIGN_DATE", app_dtObj);
					dataMap.put("DIVISION_APP_COMMENTS", divisionApproverComments);

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, emplid, "EMPLID", workflowInstanceId, tableName);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, emplid, "EMPLID", workflowInstanceId, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, emplid, "EMPLID", workflowInstanceId, dataMap,
							"ST_DT,END_DT,EMPSIGNDATE,ADMINSIGNDATE,HRDISIGNDATE,TELECOMMUTERSIGNDATE,AVPSIGNDATE,DIVISION_APP_SIGN_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}


			} catch (Exception e) {
				log.error("Exception in TelecommutingDB=" + Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.error("IOException in TelecommutingDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
/*				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in TelecommutingDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}*/
			}
			

		}

	}

}
