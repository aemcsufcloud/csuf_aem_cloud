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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=MPP Justification DB Save",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=MPPJustificationDB" })
public class MPPJustificationDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(MPPJustificationDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;
	
	@Reference
	private TaskService taskService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_MPP_JUSTIFICATION";
		String formName = "MPP Justification Form";
		String assignee = "";
		String cwid = "";
		String initiatorCwid = "";
		String positionOption = "";
		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		MetaDataMap metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		log.debug("Workflowinstanceid:" + workflowInstanceID);
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
								String newCMSPosition = eElement.getElementsByTagName("new_cms_positionCHK").item(0).getTextContent();
								String repurposedCMSPosition = eElement.getElementsByTagName("repurposed_cms_positionCHK").item(0).getTextContent();
								String reclassificationCMSPosition = eElement.getElementsByTagName("reclassificationCHK").item(0).getTextContent();
								String recruitmentPosition = eElement.getElementsByTagName("recruitmentCHK").item(0).getTextContent();
								String appointmentPosition = eElement.getElementsByTagName("appointmentCHK").item(0).getTextContent();
								if (newCMSPosition.equals("1")) {
									positionOption = "New CMS Position";
								} else if (repurposedCMSPosition.equals("1")) {
									positionOption = "Repurposed CMS Position # - previously non-MPP position";
								} else if (reclassificationCMSPosition.equals("1")) {
									positionOption = "Reclassification from Staff to MPP";
								} else if (recruitmentPosition.equals("1")) {
									positionOption = "Recruitment (CHRS Recruiting)";
								} else if (appointmentPosition.equals("1")) {
									positionOption = "Appointment (CCAR)";
								}
								dataMap.put("POSITION_OPTION", positionOption);
								dataMap.put("FORMER_INCUMBENT", eElement.getElementsByTagName("former_incumbent_name").item(0).getTextContent());
								dataMap.put("RECRUITMENT_CHRS", eElement.getElementsByTagName("recruitment_CHRS").item(0).getTextContent());
								dataMap.put("APPOINTMENT_CCAR", eElement.getElementsByTagName("appointment_CCAR").item(0).getTextContent());
								dataMap.put("CMS_POSITION_NUM", eElement.getElementsByTagName("cms_position").item(0).getTextContent());
								dataMap.put("DIVISION", eElement.getElementsByTagName("division").item(0).getTextContent());
								dataMap.put("DEPT_CONTACT", eElement.getElementsByTagName("dept_contact_name").item(0).getTextContent());
								dataMap.put("DEPARTMENT", eElement.getElementsByTagName("department").item(0).getTextContent());
								dataMap.put("SUPERVISOR", eElement.getElementsByTagName("mpp_supervisor").item(0).getTextContent());
								dataMap.put("POSITION_WORKING_TITLE", eElement.getElementsByTagName("working_title").item(0).getTextContent());
								dataMap.put("POSITION_REQUESTING", eElement.getElementsByTagName("number_mpp_position").item(0).getTextContent());
								dataMap.put("WORK_CONTINUOUS", eElement.getElementsByTagName("work_continuousRB").item(0).getTextContent());
								String expectedEndDate = eElement.getElementsByTagName("expected_end_date").item(0).getTextContent();
								Object expectedEndDateObj = "";
								if (expectedEndDate != null && expectedEndDate != "") {
									Date expectedEndDateNew = Date.valueOf(expectedEndDate);
									expectedEndDateObj = expectedEndDateNew;
								}
								dataMap.put("EXPECTED_END_DATE", expectedEndDateObj);
								dataMap.put("PROPOSED_ADMIN", eElement.getElementsByTagName("proposed_admin").item(0).getTextContent());
								dataMap.put("POSITION_REPORTING", eElement.getElementsByTagName("reportee_name").item(0).getTextContent());
								dataMap.put("NECESSARY_REASON", eElement.getElementsByTagName("responsibilities").item(0).getTextContent());
								dataMap.put("SAFETY_COMPLIANCE_IMPACT", eElement.getElementsByTagName("compliance_impact").item(0).getTextContent());
								dataMap.put("CAMPUS_WIDE_IMPACT", eElement.getElementsByTagName("campus_system_impact").item(0).getTextContent());
								dataMap.put("MPP_SUP_DECISION", eElement.getElementsByTagName("mpp_supervisor_recommend").item(0).getTextContent());
								dataMap.put("MPP_SIGN", eElement.getElementsByTagName("mpp_supervisor_signature").item(0).getTextContent());
								String mppDate = eElement.getElementsByTagName("mpp_supervisor_date").item(0).getTextContent();
								Object mppDateObj = "";
								if (mppDate != null && mppDate != "") {
									Date mppDateNew = Date.valueOf(mppDate);
									mppDateObj = mppDateNew;
								}
								dataMap.put("MPP_SIGN_DATE", mppDateObj);
								dataMap.put("MPP_COMMENTS", eElement.getElementsByTagName("mpp_supervisor_comment").item(0).getTextContent());
								dataMap.put("ADMIN_DECISION", eElement.getElementsByTagName("admin_recommend").item(0).getTextContent());
								dataMap.put("ADMIN_SIGN", eElement.getElementsByTagName("appropriate_admin_signature").item(0).getTextContent());
								String adminDate = eElement.getElementsByTagName("appropriate_admin_date").item(0).getTextContent();
								Object adminDateObj = "";
								if (adminDate != null && adminDate != "") {
									Date adminDateNew = Date.valueOf(adminDate);
									adminDateObj = adminDateNew;
								}
								dataMap.put("ADMIN_SIGN_DATE", adminDateObj);
								dataMap.put("ADMIN_COMMENTS", eElement.getElementsByTagName("appropriate_admin_comment").item(0).getTextContent());
								dataMap.put("VP_DECISION", eElement.getElementsByTagName("vp_recommend").item(0).getTextContent());
								dataMap.put("VP_SIGN", eElement.getElementsByTagName("vp_signature").item(0).getTextContent());
								String vpDate = eElement.getElementsByTagName("vp_date").item(0).getTextContent();
								Object vpDateObj = "";
								if (vpDate != null && vpDate != "") {
									Date vpDateNew = Date.valueOf(vpDate);
									vpDateObj = vpDateNew;
								}
								dataMap.put("VP_SIGN_DATE", vpDateObj);
								dataMap.put("VP_COMMENTS", eElement.getElementsByTagName("vp_comment").item(0).getTextContent());
								dataMap.put("COMP_REVIEWBY", eElement.getElementsByTagName("reviewe_by").item(0).getTextContent());
								String compDate = eElement.getElementsByTagName("reviewe_by_date").item(0).getTextContent();
								Object compDateObj = "";
								if (compDate != null && compDate != "") {
									Date compDateNew = Date.valueOf(compDate);
									compDateObj = compDateNew;
								}
								dataMap.put("COMP_DATE", compDateObj);
								dataMap.put("COMP_COMMENTS", eElement.getElementsByTagName("reviewe_by_comment").item(0).getTextContent());
								dataMap.put("CAMPUS_DESIGNEE_DECISION", eElement.getElementsByTagName("campus_designee_decision").item(0).getTextContent());
								dataMap.put("CAMPUS_DESIGNEE_SIGN", eElement.getElementsByTagName("campus_designee_signature").item(0).getTextContent());
								String cdDate = eElement.getElementsByTagName("campus_designee_date").item(0).getTextContent();
								Object cdDateObj = "";
								if (cdDate != null && cdDate != "") {
									Date cdDateNew = Date.valueOf(cdDate);
									cdDateObj = cdDateNew;
								}
								dataMap.put("CAMPUS_DESIGNEE_SIGN_DATE", cdDateObj);
								dataMap.put("CAMPUS_DESIGNEE_COMMENTS", eElement.getElementsByTagName("campus_designee_comment").item(0).getTextContent());
								initiatorCwid = eElement.getElementsByTagName("hidden_initiator_cwid").item(0).getTextContent();
								dataMap.put("INITIATOR_CWID", initiatorCwid);
								dataMap.put("INITIATOR_FIRST_NAME", eElement.getElementsByTagName("hidden_initiator_firstName").item(0).getTextContent());
								dataMap.put("INITIATOR_LAST_NAME", eElement.getElementsByTagName("hidden_initiator_lastName").item(0).getTextContent());
								dataMap.put("INITIATOR_USER_ID", eElement.getElementsByTagName("hidden_initiator_userID").item(0).getTextContent());
								dataMap.put("INITIATOR_EMAIL_ID", eElement.getElementsByTagName("hidden_initiator_email").item(0).getTextContent());
								dataMap.put("MPP_SUP_USER_ID", eElement.getElementsByTagName("hidden_mppSupervisor_userID").item(0).getTextContent());
								dataMap.put("MPP_SUP_EMAIL_ID", eElement.getElementsByTagName("hidden_mppSupervisor_email").item(0).getTextContent());
								dataMap.put("MPP_SUP_NAME", eElement.getElementsByTagName("hidden_mppSupervisor_name").item(0).getTextContent());
								dataMap.put("APP_ADMIN_USER_ID", eElement.getElementsByTagName("hidden_admin_userID").item(0).getTextContent());
								dataMap.put("APP_ADMIN_EMAIL_ID", eElement.getElementsByTagName("hidden_admin_email").item(0).getTextContent());
								dataMap.put("APP_ADMIN_NAME", eElement.getElementsByTagName("hidden_admin_name").item(0).getTextContent());
								dataMap.put("VP_USER_ID", eElement.getElementsByTagName("hidden_vp_userID").item(0).getTextContent());
								dataMap.put("VP_EMAIL_ID", eElement.getElementsByTagName("hidden_vp_email").item(0).getTextContent());
								dataMap.put("VP_NAME", eElement.getElementsByTagName("hidden_vp_name").item(0).getTextContent());
								dataMap.put("CAMPUS_DESIGNEE_USER_ID", eElement.getElementsByTagName("hidden_designee_userID").item(0).getTextContent());
							//	dataMap.put("CAMPUS_DESIGNEE_EMAIL_ID", eElement.getElementsByTagName(" ").item(0).getTextContent());
								dataMap.put("CAMPUS_DESIGNEE_NAME", eElement.getElementsByTagName("hidden_designee_name").item(0).getTextContent());
								long id = System.currentTimeMillis();
								dataMap.put("TABLE_DATA_ID", String.valueOf(id));
								dataMap.put("STAGE_INDICATOR", eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								log.debug("DataMap values :{}", dataMap);
								List<Route> backRoutesList = workflowSession.getBackRoutes(workItem, false);
								JsonArray backRoutesJson = new JsonArray();
								for (Route backRoute : backRoutesList) {
									backRoutesJson.add(backRoute.getName());
								}
								String saveHistoryBackRoute = "";
								if (backRoutesJson.size() == 1) {
									saveHistoryBackRoute = backRoutesList.get(0).getName();
									log.debug("Executing if block ");
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
									log.debug("Executing else block assignee : {}", assignee);
								}
								dataMap.put("LAST_STEP", saveHistoryBackRoute);
								if (dataMap.get("LAST_STEP").equals("Campus Designee Review")) {
									if (metaDataMap.containsKey("actionTakenByCampusDesignee")) {
										String stepResponse = metaDataMap.get("actionTakenByCampusDesignee").toString();
										if(stepResponse.equalsIgnoreCase("Complete")) {
											dataMap.put("WORKFLOW_STATUS", "COMPLETED");
										}else {
											dataMap.put("WORKFLOW_STATUS", "RUNNNING");
										}
									}else {
										log.error("Last step is Campus Designee but metaDatamap doesn't contain actionTakenByCampusDesignee");
									}
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNNING");
								} 
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
					String resultData = dbUtil.getSPEEvalData(conn, initiatorCwid, "INITIATOR_CWID", workflowInstanceID, tableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, initiatorCwid, "INITIATOR_CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, initiatorCwid, "INITIATOR_CWID",
							workflowInstanceID, dataMap,
							"EXPECTED_END_DATE,MPP_SIGN_DATE,ADMIN_SIGN_DATE,VP_SIGN_DATE,COMP_DATE,CAMPUS_DESIGNEE_SIGN_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in MPPJustificationDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				/*if (conn != null) { try { conn.close(); } catch (SQLException e) { } }*/
			}

		}

	}
}
