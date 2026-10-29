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
import com.google.gson.JsonArray;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.services.TaskService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=CSUF Volunteer Form Form DB", "service.vendor=ThoughtFocus",
		"process.label=CSUF Volunteer Form DB" })

public class CSUFVolunteerFormDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(CSUFVolunteerFormDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		String workflowTitle = null;
		String formName = null;
		workflowTitle = workItem.getWorkflow().getWorkflowModel().getTitle();
		if (workflowTitle.equals("Volunteer Form")) {
			formName = "CSUF Volunteer Form";
		} else if (workflowTitle.equals("CSUF Volunteer Form External")) {
			formName = "CSUF Volunteer Form - Anonymous";

		}
		Connection conn = null;
		String tableName = "AEM_CSUF_VOLUNTEER_FORM";
		// String formName = "CSUF Volunteer Form";
		String assignee = "";
		String cwid = "";
		String caseid = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		log.error("WF_Instance_Id:", workflowInstanceID);
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
								caseid = eElement.getElementsByTagName("caseId").item(0).getTextContent();
								cwid = eElement.getElementsByTagName("cwid").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", caseid);
								dataMap.put("LAST_NAME",
										eElement.getElementsByTagName("lastName").item(0).getTextContent());
								dataMap.put("FIRST_NAME",
										eElement.getElementsByTagName("firstName").item(0).getTextContent());
								dataMap.put("MIDDLE_NAME",
										eElement.getElementsByTagName("middleName").item(0).getTextContent());
								dataMap.put("FORM_NAME",
										eElement.getElementsByTagName("formTitle").item(0).getTextContent());
								dataMap.put("ADDRESS",
										eElement.getElementsByTagName("Address").item(0).getTextContent());
								dataMap.put("CITY", eElement.getElementsByTagName("City").item(0).getTextContent());
								dataMap.put("STATE", eElement.getElementsByTagName("State").item(0).getTextContent());
								dataMap.put("ZIPCODE",
										eElement.getElementsByTagName("ZipCode").item(0).getTextContent());
								dataMap.put("PHONE_NUMBER",
										eElement.getElementsByTagName("PhoneNumber").item(0).getTextContent());
								dataMap.put("VOLUNTEER_EMAIL",
										eElement.getElementsByTagName("VolunteerEmail").item(0).getTextContent());
								dataMap.put("CONTACT_NAME",
										eElement.getElementsByTagName("ContactName").item(0).getTextContent());
								dataMap.put("CONTACT_NUMBER",
										eElement.getElementsByTagName("ContactNumber").item(0).getTextContent());

								dataMap.put("OTHER_TF",
										eElement.getElementsByTagName("OtherTF").item(0).getTextContent());

								String currentStatus = null;
								String otherCB = eElement.getElementsByTagName("OtherCB").item(0).getTextContent();
								String cSUFStudentCB = eElement.getElementsByTagName("CSUFStudentCB").item(0)
										.getTextContent();
								String cSUFFacultyCB = eElement.getElementsByTagName("CSUFFacultyCB").item(0)
										.getTextContent();
								String cSUFStaffCB = eElement.getElementsByTagName("CSUFStaffCB").item(0)
										.getTextContent();
								if (otherCB.equals("1")) {
									currentStatus = "Other";
								} else if (cSUFStudentCB.equals("1")) {
									currentStatus = "CSUF Student";
								} else if (cSUFFacultyCB.equals("1")) {
									currentStatus = "CSUF Faculty";
								} else if (cSUFStaffCB.equals("1")) {
									currentStatus = "CSUF Staff/Management";
								}
								dataMap.put("CURRENT_STATUS", currentStatus);

								String cwidPresent = null;
								String noCB1 = eElement.getElementsByTagName("NoCB1").item(0).getTextContent();
								String yesCB1 = eElement.getElementsByTagName("YesCB1").item(0).getTextContent();
								if (noCB1.equals("1")) {
									cwidPresent = "No";
								} else if (yesCB1.equals("1")) {
									cwidPresent = "Yes";
								}
								dataMap.put("CWID_PRESENT", cwidPresent);

								String crimeCharge = null;
								String noCB2 = eElement.getElementsByTagName("NoCB2").item(0).getTextContent();
								String yesCB2 = eElement.getElementsByTagName("YesCB2").item(0).getTextContent();
								if (noCB2.equals("1")) {
									crimeCharge = "No";
								} else if (yesCB2.equals("1")) {
									crimeCharge = "Yes";
								}
								dataMap.put("CHARGE_FOR_CRIME", crimeCharge);

								String above18 = null;
								String noCB3 = eElement.getElementsByTagName("NoCB3").item(0).getTextContent();
								String yesCB3 = eElement.getElementsByTagName("YesCB3").item(0).getTextContent();
								if (noCB3.equals("1")) {
									above18 = "No";
								} else if (yesCB3.equals("1")) {
									above18 = "Yes";
								}
								dataMap.put("ABOVE_18", above18);

								String requireddate = eElement.getElementsByTagName("RequiredDate").item(0)
										.getTextContent();
								Object requireddateObj = "";
								if (requireddate != null && requireddate != "") {
									Date requireddateNew = Date.valueOf(requireddate);
									requireddateObj = requireddateNew;
								}
								dataMap.put("REQUIRED_DATE", requireddateObj);

								String DOBdate = eElement.getElementsByTagName("DOB").item(0).getTextContent();
								Object DOBdateObj = "";
								if (DOBdate != null && DOBdate != "") {
									Date DOBdateNew = Date.valueOf(DOBdate);
									DOBdateObj = DOBdateNew;
								}
								dataMap.put("DATE_OF_BIRTH", DOBdateObj);

								String volunteerPast = null;
								String noCB4 = eElement.getElementsByTagName("NoCB4").item(0).getTextContent();
								String yesCB4 = eElement.getElementsByTagName("YesCB4").item(0).getTextContent();
								if (noCB4.equals("1")) {
									volunteerPast = "No";
								} else if (yesCB4.equals("1")) {
									volunteerPast = "Yes";
								}
								dataMap.put("VOLUNTEER_IN_PAST", volunteerPast);

								dataMap.put("REQ_SUPERVISORS_NAME",
										eElement.getElementsByTagName("ReqSupervisorsName").item(0).getTextContent());

								dataMap.put("SUPERVISOR_NAME",
										eElement.getElementsByTagName("SupervisorName").item(0).getTextContent());
								dataMap.put("SUPERVISOR_EMAIL",
										eElement.getElementsByTagName("SupervisorEmail").item(0).getTextContent());
								dataMap.put("DEPT_NAME",
										eElement.getElementsByTagName("DeptName").item(0).getTextContent());
								String startdate = eElement.getElementsByTagName("StartDate").item(0).getTextContent();
								Object startdateObj = "";
								if (startdate != null && startdate != "") {
									Date startdateNew = Date.valueOf(startdate);
									startdateObj = startdateNew;
								}
								dataMap.put("START_DATE", startdateObj);

								String enddate = eElement.getElementsByTagName("EndDate").item(0).getTextContent();
								Object enddateObj = "";
								if (enddate != null && enddate != "") {
									Date enddateNew = Date.valueOf(enddate);
									enddateObj = enddateNew;
								}
								dataMap.put("END_DATE", enddateObj);
								dataMap.put("LAB_ROOM",
										eElement.getElementsByTagName("LabRoom").item(0).getTextContent());
								dataMap.put("LAB_PHONE",
										eElement.getElementsByTagName("LabPhone").item(0).getTextContent());
								dataMap.put("AUTO_CB",
										eElement.getElementsByTagName("AutoCB").item(0).getTextContent());
								dataMap.put("SUV_CB", eElement.getElementsByTagName("SUVCB").item(0).getTextContent());
								dataMap.put("CART_CB",
										eElement.getElementsByTagName("CartCB").item(0).getTextContent());
								dataMap.put("SCISSOR_CB",
										eElement.getElementsByTagName("PersonalCB").item(0).getTextContent());
								dataMap.put("AERIAL_CB",
										eElement.getElementsByTagName("StateCB").item(0).getTextContent());
								dataMap.put("FORKLIFTS_CB",
										eElement.getElementsByTagName("OlliTrolleyCB").item(0).getTextContent());
								dataMap.put("PERSONAL_AUTO_CB",
										eElement.getElementsByTagName("AutoSUVCB").item(0).getTextContent());
								dataMap.put("PERSONAL_VAN_CB",
										eElement.getElementsByTagName("VanPCB").item(0).getTextContent());
								dataMap.put("BUCKET_CB",
										eElement.getElementsByTagName("BucketCB").item(0).getTextContent());
								dataMap.put("NONE_OF_THE_ABOVE_CB",
										eElement.getElementsByTagName("NoneOfTheAbove").item(0).getTextContent());
								dataMap.put("RADIATION_CB",
										eElement.getElementsByTagName("RadiationCB").item(0).getTextContent());
								dataMap.put("LASERS_CB",
										eElement.getElementsByTagName("LasersCB").item(0).getTextContent());
								dataMap.put("CHEMICALS_CB",
										eElement.getElementsByTagName("ChemicalsCB").item(0).getTextContent());
								dataMap.put("BLOOD_CB",
										eElement.getElementsByTagName("BloodCB").item(0).getTextContent());
								dataMap.put("SHARPS_CB",
										eElement.getElementsByTagName("SharpsCB").item(0).getTextContent());
								dataMap.put("AUTOCLAVES_CB",
										eElement.getElementsByTagName("AutoclavesCB").item(0).getTextContent());
								dataMap.put("CENTRIFUGE_CB",
										eElement.getElementsByTagName("CentrifugeCB").item(0).getTextContent());
								dataMap.put("COMPRESSED_CB",
										eElement.getElementsByTagName("CompressedCB").item(0).getTextContent());
								dataMap.put("FORMALDEHYDE_CB",
										eElement.getElementsByTagName("FormalCB").item(0).getTextContent());
								dataMap.put("CRYOGENICS_CB",
										eElement.getElementsByTagName("CryoCB").item(0).getTextContent());
								dataMap.put("DCM_CB", eElement.getElementsByTagName("DCMCB").item(0).getTextContent());
								dataMap.put("PAINTS_CB",
										eElement.getElementsByTagName("PaintsCB").item(0).getTextContent());
								dataMap.put("POWER_CB",
										eElement.getElementsByTagName("PowerCB").item(0).getTextContent());
								dataMap.put("SAWS_CB",
										eElement.getElementsByTagName("SawsCB").item(0).getTextContent());
								dataMap.put("WORK_CB",
										eElement.getElementsByTagName("WorkCB").item(0).getTextContent());
								dataMap.put("NONPAVED_ROADS_CB",
										eElement.getElementsByTagName("RoadNoCB").item(0).getTextContent());

								String volunteerDriving = null;
								String supervisorNOCB = eElement.getElementsByTagName("SupervisorNoCB").item(0)
										.getTextContent();

								if (supervisorNOCB.equals("1")) {
									volunteerDriving = "No";
								} else if (supervisorNOCB.equals("2")) {
									volunteerDriving = "Yes";
								}

								dataMap.put("IS_VOLUNTEER_DRIVING", volunteerDriving);

								dataMap.put("SUPERVISOR_OTHERCB",
										eElement.getElementsByTagName("SupervisorOtherCB").item(0).getTextContent());
								dataMap.put("SUPERVISOR_OTHERTF",
										eElement.getElementsByTagName("SupervisorOtherTF").item(0).getTextContent());

								String contact = null;
								String supervisorNoCB2 = eElement.getElementsByTagName("SupervisorNoCB2").item(0)
										.getTextContent();
								if (supervisorNoCB2.equals("1")) {
									contact = "No";
								} else if (supervisorNoCB2.equals("2")) {
									contact = "Yes";
								}
								dataMap.put("CONTACT_WITH_MINORS", contact);

								String parkingPass = null;
								String supervisorNoCB3 = eElement.getElementsByTagName("SupervisorNoCB3").item(0)
										.getTextContent();
								if (supervisorNoCB3.equals("1")) {
									parkingPass = "No";
								} else if (supervisorNoCB3.equals("2")) {
									parkingPass = "Yes";
								}
								dataMap.put("PARKING_PASS", parkingPass);

								dataMap.put("VOLUNTEER_DUTIES",
										eElement.getElementsByTagName("VolunteerDuties").item(0).getTextContent());

								dataMap.put("VOLUNTEER_SIGNATURE",
										eElement.getElementsByTagName("ApprovalVolunteerSig").item(0).getTextContent());
								dataMap.put("APPROVAL_PRINT_NAME",
										eElement.getElementsByTagName("ApprovalPrintName").item(0).getTextContent());
								String approvaldate = eElement.getElementsByTagName("ApprovalDate1").item(0)
										.getTextContent();
								Object approvaldateObj = "";
								if (approvaldate != null && approvaldate != "") {
									Date approvaldateNew = Date.valueOf(approvaldate);
									approvaldateObj = approvaldateNew;
								}
								dataMap.put("APPROVAL_DATE", approvaldateObj);
								dataMap.put("VOLUNTEER_COMMENTS",
										eElement.getElementsByTagName("volunteerComments").item(0).getTextContent());

								dataMap.put("SUPERVISOR_PRINT_NAME",
										eElement.getElementsByTagName("SupervisorPrintName").item(0).getTextContent());
								dataMap.put("SUPERVISOR_SIGNATURE",
										eElement.getElementsByTagName("SupervisorSignature").item(0).getTextContent());
								String supervisordate = eElement.getElementsByTagName("SupervisorDate").item(0)
										.getTextContent();
								Object supervisordateObj = "";
								if (supervisordate != null && supervisordate != "") {
									Date supervisordateNew = Date.valueOf(supervisordate);
									supervisordateObj = supervisordateNew;
								}
								dataMap.put("SUPERVISOR_DATE", supervisordateObj);

								dataMap.put("SUPERVISOR_COMMENTS",
										eElement.getElementsByTagName("SupervisorComments").item(0).getTextContent());

								dataMap.put("DEPT_CO_NAME",
										eElement.getElementsByTagName("DeptChairName").item(0).getTextContent());
								dataMap.put("DEPT_CO_SIGNATURE",
										eElement.getElementsByTagName("DeptChairSign").item(0).getTextContent());
								String deptcodate = eElement.getElementsByTagName("DeptCoDate3").item(0)
										.getTextContent();
								Object deptcodateObj = "";
								if (deptcodate != null && deptcodate != "") {
									Date deptcodateNew = Date.valueOf(deptcodate);
									deptcodateObj = deptcodateNew;
								}
								dataMap.put("DEPT_CO_DATE", deptcodateObj);
								dataMap.put("CHAIR_YESNO_RB",
										eElement.getElementsByTagName("ChairRbYN").item(0).getTextContent());

								dataMap.put("DEPT_CO_COMMENTS",
										eElement.getElementsByTagName("DeptCoComments").item(0).getTextContent());

								dataMap.put("CHAIR_PRINT_NAME",
										eElement.getElementsByTagName("Chair1PrintName").item(0).getTextContent());
								dataMap.put("CHAIR_SIGNATURE",
										eElement.getElementsByTagName("Chair1Signature").item(0).getTextContent());
								String chairdate = eElement.getElementsByTagName("Chair1Date").item(0).getTextContent();
								Object chairdateObj = "";
								if (chairdate != null && chairdate != "") {
									Date chairdateNew = Date.valueOf(chairdate);
									chairdateObj = chairdateNew;
								}
								dataMap.put("CHAIR_DATE", chairdateObj);
								dataMap.put("CHAIR_COMMENTS",
										eElement.getElementsByTagName("ChairComments").item(0).getTextContent());

								dataMap.put("DEAN_PRINT_NAME",
										eElement.getElementsByTagName("DeanName").item(0).getTextContent());
								dataMap.put("DEAN_SIGNATURE",
										eElement.getElementsByTagName("DeanSign").item(0).getTextContent());
								String deandate = eElement.getElementsByTagName("DeanDate2").item(0).getTextContent();
								Object deandateObj = "";
								if (deandate != null && deandate != "") {
									Date deandateNew = Date.valueOf(deandate);
									deandateObj = deandateNew;
								}
								dataMap.put("DEAN_DATE", deandateObj);
								dataMap.put("DEAN_COMMENTS",
										eElement.getElementsByTagName("DeanComments").item(0).getTextContent());

								dataMap.put("RISK_PRINT_NAME",
										eElement.getElementsByTagName("RiskPrintName").item(0).getTextContent());
								dataMap.put("RISK_SIGNATURE",
										eElement.getElementsByTagName("RiskSignature").item(0).getTextContent());
								String riskdate = eElement.getElementsByTagName("RiskDate").item(0).getTextContent();
								Object riskdateObj = "";
								if (riskdate != null && riskdate != "") {
									Date riskdateNew = Date.valueOf(riskdate);
									riskdateObj = riskdateNew;
								}
								dataMap.put("RISK_DATE", riskdateObj);
								dataMap.put("RISK_COMMENTS",
										eElement.getElementsByTagName("RiskComments").item(0).getTextContent());

								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								dataMap.put("SUPERVISOR_SEARCH_NAME",
										eElement.getElementsByTagName("SupervisorSearchName").item(0).getTextContent());
								dataMap.put("SUPERVISOR_SEARCH_USERID", eElement
										.getElementsByTagName("SupervisorSearchUserId").item(0).getTextContent());
								dataMap.put("SUPERVISOR_SEARCH_EMAILID", eElement
										.getElementsByTagName("SupervisorSearchEmailId").item(0).getTextContent());
								dataMap.put("DEPT_CO_SEARCH_NAME",
										eElement.getElementsByTagName("DeptCoSearchName").item(0).getTextContent());
								dataMap.put("DEPT_SEARCH_USERID",
										eElement.getElementsByTagName("DeptCoSearchUserId").item(0).getTextContent());
								dataMap.put("DEPT_CO_SEARCH_EMAILID",
										eElement.getElementsByTagName("DeptCoSearchEmailId").item(0).getTextContent());
								dataMap.put("CHAIR_SEARCH_NAME",
										eElement.getElementsByTagName("ChairSearchName").item(0).getTextContent());
								dataMap.put("CHAIR_SEARCH_USERID",
										eElement.getElementsByTagName("ChairSearchUserId").item(0).getTextContent());
								dataMap.put("DEAN_SEARCH_NAME",
										eElement.getElementsByTagName("DeanSearchName").item(0).getTextContent());
								dataMap.put("DEAN_SEARCH_USERID",
										eElement.getElementsByTagName("DeanSearchUserId").item(0).getTextContent());
								dataMap.put("DEAN_SEARCH_EMAILID",
										eElement.getElementsByTagName("DeanSearchEmailId").item(0).getTextContent());
								dataMap.put("CHAIR_SEARCH_EMAILID",
										eElement.getElementsByTagName("ChairSearchEmailId").item(0).getTextContent());
								dataMap.put("DIVISION_ID",
										eElement.getElementsByTagName("DivisionId").item(0).getTextContent());
								dataMap.put("VOLUNTEER_FULLNAME",
										eElement.getElementsByTagName("VolunteerFullName").item(0).getTextContent());
								dataMap.put("INITIATOR_USERID",
										eElement.getElementsByTagName("InitiatorUserId").item(0).getTextContent());
								dataMap.put("SCWID", eElement.getElementsByTagName("scwid").item(0).getTextContent());
								dataMap.put("TO_TRAINING",
										eElement.getElementsByTagName("Training").item(0).getTextContent());
								dataMap.put("TO_DRIVING",
										eElement.getElementsByTagName("driving").item(0).getTextContent());
								dataMap.put("TO_MINOR",
										eElement.getElementsByTagName("Minor").item(0).getTextContent());
								dataMap.put("VOLUNTEER_D_CB",
										eElement.getElementsByTagName("VolunteerSdate").item(0).getTextContent());

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
								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
								dataMap.put("LAST_STEP", saveHistoryBackRoute);
								dataMap.put("LAST_STEP_ASSIGNEE", assignee);
								log.error("WF_Instance_Id:", workflowInstanceID);
								// dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, caseid, "CASEID", workflowInstanceID, tableName);

					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, caseid, "CASEID", workflowInstanceID, tableName);
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
						log.debug("IOException in CSUFVolunteerFormDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error(
							"SQLException in CSUFVolunteerFormDB Finally Block=" + Arrays.toString(e.getStackTrace()));
				}
			}

		}

	}

}
