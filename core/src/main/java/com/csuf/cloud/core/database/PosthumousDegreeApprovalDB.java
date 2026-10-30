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
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Posthumous Degree Approval DB Save", "service.vendor=ThoughtFocus",
		"process.label=PosthumousDegreeApprovalDB" })
public class PosthumousDegreeApprovalDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(PosthumousDegreeApprovalDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_POSTHUMOUS_DEGREE_APPROVAL";
		String formName = "Posthumous Degree Approval";
		String assignee = "";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		log.debug("Workflowinstanceid:" + workflowInstanceID);
		if (StringUtils.isNotBlank(payloadPath)) {
			InputStream is = null;
			try {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");

				if (null != is) {
					Document doc = XMLUtils.getDomDocument(is);
					String dataXML = XMLUtils.prettyPrintAsString(doc);
					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							try {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								log.debug("index=" + temp);
								dataMap.put("DATA_XML", dataXML);
								cwid = eElement.getElementsByTagName("StudentCWID").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID",
										eElement.getElementsByTagName("caseId").item(0).getTextContent());
								dataMap.put("STUDENT_FIRST_NAME",
										eElement.getElementsByTagName("firstName").item(0).getTextContent());
								dataMap.put("STUDENT_LAST_NAME",
										eElement.getElementsByTagName("lastName").item(0).getTextContent());
								dataMap.put("STUDENT_FULL_NAME",
										eElement.getElementsByTagName("StudentName").item(0).getTextContent());
								dataMap.put("COLLEGE_DEPT_INITIATING",
										eElement.getElementsByTagName("StudentCollegeandDepartmentInitiatingRequest")
												.item(0).getTextContent());
								dataMap.put("CONTACT_NAME",
										eElement.getElementsByTagName("ContactName").item(0).getTextContent());
								dataMap.put("STUDENT_MAJOR",
										eElement.getElementsByTagName("StudentMajor").item(0).getTextContent());
								dataMap.put("STUDENT_DEPT_ID",
										eElement.getElementsByTagName("StudentDeptId").item(0).getTextContent());
								dataMap.put("STUDENT_USER_ID",
										eElement.getElementsByTagName("StudentUserId").item(0).getTextContent());
								dataMap.put("STUDENT_DEPT",
										eElement.getElementsByTagName("StudentDept").item(0).getTextContent());
								dataMap.put("STUDENT_COLLEGE_ID",
										eElement.getElementsByTagName("StudentCollegeId").item(0).getTextContent());
								dataMap.put("STUDENT_COLLEGE",
										eElement.getElementsByTagName("StudentCollege").item(0).getTextContent());
								dataMap.put("CHAIR_FLAG",
										eElement.getElementsByTagName("ChairFlag").item(0).getTextContent());
								dataMap.put("INITIATOR_NAME",
										eElement.getElementsByTagName("InitiatorName").item(0).getTextContent());
								dataMap.put("INITIATOR_USER_ID",
										eElement.getElementsByTagName("InitiatorUserId").item(0).getTextContent());
								dataMap.put("INITIATOR_EMAIL_ID",
										eElement.getElementsByTagName("InitiatorEmailId").item(0).getTextContent());
								dataMap.put("CHAIR_NAME",
										eElement.getElementsByTagName("ChairName").item(0).getTextContent());
								dataMap.put("CHAIR_USER_ID",
										eElement.getElementsByTagName("ChairUserId").item(0).getTextContent());
								dataMap.put("CHAIR_EMAIL_ID",
										eElement.getElementsByTagName("ChairEmailId").item(0).getTextContent());
								dataMap.put("DEAN_NAME",
										eElement.getElementsByTagName("DeanName").item(0).getTextContent());
								dataMap.put("DEAN_USER_ID",
										eElement.getElementsByTagName("DeanUserId").item(0).getTextContent());
								dataMap.put("DEAN_EMAIL_ID",
										eElement.getElementsByTagName("DeanEmailId").item(0).getTextContent());
								dataMap.put("INITIATOR_SIGNATURE",
										eElement.getElementsByTagName("InitiatorSignature").item(0).getTextContent());
								String initiatorSignDate = eElement.getElementsByTagName("InitiatorSignDate").item(0)
										.getTextContent();
								Object initiatorSignDateObj = "";
								if (initiatorSignDate != null && initiatorSignDate != "") {
									Date initiatorSignDateNew = Date.valueOf(initiatorSignDate);
									initiatorSignDateObj = initiatorSignDateNew;
								}
								dataMap.put("INITIATOR_SIGN_DATE", initiatorSignDateObj);
								dataMap.put("INITIATOR_RECOMMEND",
										eElement.getElementsByTagName("InitiatorDecision").item(0).getTextContent());
								dataMap.put("INITIATOR_COMMENTS",
										eElement.getElementsByTagName("InitiatorComments").item(0).getTextContent());
								dataMap.put("CHAIR_SIGNATURE",
										eElement.getElementsByTagName("MajorDepartmentChairSignature").item(0)
												.getTextContent());
								String chairSignDate = eElement.getElementsByTagName("MajorDepartementChairSignDate")
										.item(0).getTextContent();
								Object chairSignDateObj = "";
								if (chairSignDate != null && chairSignDate != "") {
									Date chairSignDateNew = Date.valueOf(chairSignDate);
									chairSignDateObj = chairSignDateNew;
								}
								dataMap.put("CHAIR_SIGN_DATE", chairSignDateObj);
								dataMap.put("CHAIR_RECOMMEND", eElement
										.getElementsByTagName("MajorDepartmentChairDecision").item(0).getTextContent());
								dataMap.put("CHAIR_COMMENTS",
										eElement.getElementsByTagName("MajorDepartementChairComments").item(0)
												.getTextContent());
								dataMap.put("DEAN_SIGNATURE",
										eElement.getElementsByTagName("DeanSignature").item(0).getTextContent());
								String deanSignDate = eElement.getElementsByTagName("DeanSignDate").item(0)
										.getTextContent();
								Object deanSignDateObj = "";
								if (deanSignDate != null && deanSignDate != "") {
									Date deanSignDateNew = Date.valueOf(deanSignDate);
									deanSignDateObj = deanSignDateNew;
								}
								dataMap.put("DEAN_SIGN_DATE", deanSignDateObj);
								dataMap.put("DEAN_RECOMMEND",
										eElement.getElementsByTagName("DeanDecision").item(0).getTextContent());
								dataMap.put("DEAN_COMMENTS",
										eElement.getElementsByTagName("DeanComments").item(0).getTextContent());
								dataMap.put("PROVOST_SIGNATURE",
										eElement.getElementsByTagName("ProvostSignature").item(0).getTextContent());
								String provostSignDate = eElement.getElementsByTagName("ProvostSignDate").item(0)
										.getTextContent();
								Object provostSignDateObj = "";
								if (provostSignDate != null && provostSignDate != "") {
									Date provostSignDateNew = Date.valueOf(provostSignDate);
									provostSignDateObj = provostSignDateNew;
								}
								dataMap.put("PROVOST_SIGN_DATE", provostSignDateObj);
								dataMap.put("PROVOST_RECOMMEND",
										eElement.getElementsByTagName("ProvostDecision").item(0).getTextContent());
								dataMap.put("PROVOST_COMMENTS",
										eElement.getElementsByTagName("ProvostComments").item(0).getTextContent());
								dataMap.put("PRESIDENT_SIGNATURE",
										eElement.getElementsByTagName("PresidentSignature").item(0).getTextContent());
								String presidentSignDate = eElement.getElementsByTagName("PresidentSignDate").item(0)
										.getTextContent();
								Object presidentSignDateObj = "";
								if (presidentSignDate != null && presidentSignDate != "") {
									Date presidentSignDateNew = Date.valueOf(presidentSignDate);
									presidentSignDateObj = presidentSignDateNew;
								}
								dataMap.put("PRESIDENT_SIGN_DATE", presidentSignDateObj);
								dataMap.put("PRESIDENT_RECOMMEND",
										eElement.getElementsByTagName("PresidentDecision").item(0).getTextContent());
								dataMap.put("PRESIDENT_COMMENTS",
										eElement.getElementsByTagName("PresidentComments").item(0).getTextContent());
								dataMap.put("GRAD_UNIT_SIGNATURE",
										eElement.getElementsByTagName("GradUnitSignature").item(0).getTextContent());
								String gradUnitSignDate = eElement.getElementsByTagName("GradUnitSignDate").item(0)
										.getTextContent();
								Object gradUnitSignDateObj = "";
								if (gradUnitSignDate != null && gradUnitSignDate != "") {
									Date gradUnitSignDateNew = Date.valueOf(gradUnitSignDate);
									gradUnitSignDateObj = gradUnitSignDateNew;
								}
								dataMap.put("GRAD_UNIT_SIGN_DATE", gradUnitSignDateObj);
								dataMap.put("GRAD_UNIT_RECOMMEND",
										eElement.getElementsByTagName("GradUnitDecision").item(0).getTextContent());
								dataMap.put("GRAD_UNIT_COMMENTS",
										eElement.getElementsByTagName("GradUnitComments").item(0).getTextContent());
								dataMap.put("RECORDS_SIGNATURE",
										eElement.getElementsByTagName("RecordsSignature").item(0).getTextContent());
								String recordsSignDate = eElement.getElementsByTagName("RecordsSignDate").item(0)
										.getTextContent();
								Object recordsSignDateObj = "";
								if (recordsSignDate != null && recordsSignDate != "") {
									Date recordsSignDateNew = Date.valueOf(recordsSignDate);
									recordsSignDateObj = recordsSignDateNew;
								}
								dataMap.put("RECORDS_SIGN_DATE", recordsSignDateObj);
								dataMap.put("RECORDS_RECOMMEND",
										eElement.getElementsByTagName("RecordsDecision").item(0).getTextContent());
								dataMap.put("RECORDS_COMMENTS",
										eElement.getElementsByTagName("RecordsComments").item(0).getTextContent());
								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
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
								if (dataMap.get("LAST_STEP").equals("Records Review")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNING");
								}
								dataMap.put("LAST_STEP_ASSIGNEE", assignee);
								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}
				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} catch (Exception e1) {
				e1.printStackTrace();
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in PosthumousDegreeApprovalDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in PosthumousDegreeApprovalDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}

}
