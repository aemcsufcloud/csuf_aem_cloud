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

@Component(property = { "service.description=CSUF Pre Retirement Reduction In Time Base DB",
		"service.vendor=ThoughtFocus", "process.label=PreRetirementDB" })

public class PreRetirementRequestDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(PreRetirementRequestDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_PRE_RETIREMENT_REQUEST";
		String formName = "Pre Retirement Reduction In Time Base Form";
		String assignee = "";
		String cwid = "";
		String chrsId = "";
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
								chrsId = eElement.getElementsByTagName("CHRSID").item(0).getTextContent();
								dataMap.put("CHRSID", chrsId);
								dataMap.put("PRINT_NAME",
										eElement.getElementsByTagName("PrintName").item(0).getTextContent());
								dataMap.put("DEPT_NAME",
										eElement.getElementsByTagName("Department").item(0).getTextContent());
								dataMap.put("BEGIN_EFF_YEAR",
										eElement.getElementsByTagName("BeginEffAcadYear").item(0).getTextContent());
								dataMap.put("BEGIN_PARTICIPATION",
										eElement.getElementsByTagName("BeginParticipation").item(0).getTextContent());
								dataMap.put("FROM_CHANGE_PARTICIPATION", eElement
										.getElementsByTagName("FromChangeParticipation").item(0).getTextContent());
								dataMap.put("TO_CHANGE_PARTICIPATION", eElement
										.getElementsByTagName("ToChangeParticipation").item(0).getTextContent());
								dataMap.put("CHANGE_EFF_YEAR",
										eElement.getElementsByTagName("ChangeEffAcadYear").item(0).getTextContent());
								dataMap.put("END_CB", eElement.getElementsByTagName("EndCB").item(0).getTextContent());
								String retiredate = eElement.getElementsByTagName("ExpectedRetirementDate").item(0)
										.getTextContent();
								Object retiredateObj = "";
								if (retiredate != null && retiredate != "") {
									Date retiredateNew = Date.valueOf(retiredate);
									retiredateObj = retiredateNew;
								}
								dataMap.put("EXP_RETIREMENT_DT", retiredateObj);
								
							    dataMap.put("DEPTID", eElement.getElementsByTagName("DeptID").item(0).getTextContent());
								dataMap.put("DEAN_NAME",
										eElement.getElementsByTagName("DeanName").item(0).getTextContent());
								dataMap.put("DEAN_UID",
										eElement.getElementsByTagName("DeanUserID").item(0).getTextContent());
								dataMap.put("DEAN_EMAIL",
										eElement.getElementsByTagName("DeanEmail").item(0).getTextContent());
								dataMap.put("CHAIR_EMAIL",
										eElement.getElementsByTagName("ChairEmail").item(0).getTextContent());
								dataMap.put("CHAIR_NAME",
										eElement.getElementsByTagName("ChairName").item(0).getTextContent());
								dataMap.put("CHAIR_UID",
										eElement.getElementsByTagName("ChairUserID").item(0).getTextContent());
								dataMap.put("FACULTY_UID",
										eElement.getElementsByTagName("FacultyUserID").item(0).getTextContent());
								dataMap.put("FACULTY_EMAIL",
										eElement.getElementsByTagName("FacultyEmailID").item(0).getTextContent());
								dataMap.put("FULL_COLLEGE_NAME",
										eElement.getElementsByTagName("FulCollegeName").item(0).getTextContent());
								dataMap.put("FULL_COLLEGE",
										eElement.getElementsByTagName("FulCollege").item(0).getTextContent());
								dataMap.put("VPA_SIGN",
										eElement.getElementsByTagName("VPAASign").item(0).getTextContent());
								String vpadate = eElement.getElementsByTagName("VPAADate").item(0).getTextContent();
								Object vpadateObj = "";
								if (vpadate != null && vpadate != "") {
									Date vpadateNew = Date.valueOf(vpadate);
									vpadateObj = vpadateNew;
								}
								dataMap.put("VPA_DATE", vpadateObj);
								dataMap.put("VPA_APPROVAL",
										eElement.getElementsByTagName("VPAApproval").item(0).getTextContent());
								dataMap.put("VPA_COMMENTS",
										eElement.getElementsByTagName("VPAAComments").item(0).getTextContent());
								dataMap.put("HRDI_SIGN",
										eElement.getElementsByTagName("HRDISignature").item(0).getTextContent());
								String hrdate = eElement.getElementsByTagName("HRDIDate").item(0).getTextContent();
								Object hrdateObj = "";
								if (hrdate != null && hrdate != "") {
									Date hrdateNew = Date.valueOf(hrdate);
									hrdateObj = hrdateNew;
								}
								dataMap.put("HRDI_DATE", hrdateObj);
								dataMap.put("HRDI_COMMENTS",
										eElement.getElementsByTagName("HRDIComments").item(0).getTextContent());
								dataMap.put("DEAN_SIGN",
										eElement.getElementsByTagName("DeanSign").item(0).getTextContent());
								String deandate = eElement.getElementsByTagName("DeanDate").item(0).getTextContent();
								Object deandateObj = "";
								if (deandate != null && deandate != "") {
									Date deandateNew = Date.valueOf(deandate);
									deandateObj = deandateNew;
								}
								dataMap.put("DEAN_DATE", deandateObj);
								dataMap.put("DEAN_APPROVAL",
										eElement.getElementsByTagName("DeanApproval").item(0).getTextContent());
								dataMap.put("DEAN_COMMENTS",
										eElement.getElementsByTagName("DeanComments").item(0).getTextContent());
								dataMap.put("CHAIR_SIGN",
										eElement.getElementsByTagName("ChairSign").item(0).getTextContent());
								String chairDate = eElement.getElementsByTagName("ChairDate").item(0).getTextContent();
								Object chairDateObj = "";
								if (chairDate != null && chairDate != "") {
									Date chairDateNew = Date.valueOf(chairDate);
									chairDateObj = chairDateNew;
								}
								dataMap.put("CHAIR_DATE", chairDateObj);
								dataMap.put("CHAIR_APPROVAL",
										eElement.getElementsByTagName("ChairApproval").item(0).getTextContent());
								dataMap.put("CHAIR_COMMENTS",
										eElement.getElementsByTagName("ChairComments").item(0).getTextContent());
								dataMap.put("FACULTY_MEMBER_SIGN",
										eElement.getElementsByTagName("FacultyMemSign").item(0).getTextContent());
								String facultyDate = eElement.getElementsByTagName("FacultyMemDate").item(0)
										.getTextContent();
								Object facultyDateObj = "";
								if (facultyDate != null && facultyDate != "") {
									Date facultyDateNew = Date.valueOf(facultyDate);
									facultyDateObj = facultyDateNew;
								}
								dataMap.put("FACULTY_MEMBER_DATE", facultyDateObj);
								
								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
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
								dataMap.put("INITIATOR_COMMENTS",
										eElement.getElementsByTagName("DeptCooComments").item(0).getTextContent());
								dataMap.put("INITIATOR_MEMBER_SIGN",
										eElement.getElementsByTagName("DeptCooSign").item(0).getTextContent());
								String iniDate = eElement.getElementsByTagName("DeptCooDate").item(0)
										.getTextContent();
								Object iniDateObj = "";
								if (iniDate != null && iniDate != "") {
									Date iniDateNew = Date.valueOf(iniDate);
									iniDateObj = iniDateNew;
								}
								dataMap.put("INITIATOR_DATE",iniDateObj);
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
						log.debug("IOException in CSUFAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in CSUFAppealDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}
			

		}

	}

}
