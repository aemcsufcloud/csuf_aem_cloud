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
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Petition for PG Credit DB Save", "service.vendor=ThoughtFocus",
		"process.label=PetitionforPGCreditDB" })
public class PetitionforPGCreditDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(PetitionforPGCreditDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_PETITION_PG_CREDIT";
		String childTableName = "AEM_PETITION_PG_CRED_INFO";
		String formName = "Petition for Postgraduate Credit";
		String assignee = "";
		String cwid = "";
		String caseid = "";
		String fname = "";
		String lname = "";

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
								cwid = eElement.getElementsByTagName("cwid").item(0).getTextContent();
								caseid = eElement.getElementsByTagName("caseId").item(0).getTextContent();
								fname = eElement.getElementsByTagName("firstName").item(0).getTextContent();
								lname = eElement.getElementsByTagName("lastName").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", caseid);
								dataMap.put("FIRST_NAME", fname);
								dataMap.put("LAST_NAME", lname);
								String initiatedDate = eElement.getElementsByTagName("Date_1").item(0).getTextContent();
								Object initiatedDateObj = "";
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatedDate);
									initiatedDateObj = initiatedDateNew;
								}
								dataMap.put("INITIATED_DATE", initiatedDateObj);

								dataMap.put("NAME", eElement.getElementsByTagName("Name").item(0).getTextContent());
								dataMap.put("ADDRESS",
										eElement.getElementsByTagName("Address").item(0).getTextContent());
								dataMap.put("TELEPHONE",
										eElement.getElementsByTagName("Telephone").item(0).getTextContent());
								dataMap.put("CITY", eElement.getElementsByTagName("City").item(0).getTextContent());
								dataMap.put("STATE", eElement.getElementsByTagName("State").item(0).getTextContent());
								dataMap.put("ZIP_CODE",
										eElement.getElementsByTagName("ZipCode").item(0).getTextContent());
								dataMap.put("UNDERGRAD_DEGREE",
										eElement.getElementsByTagName("UGDegree").item(0).getTextContent());
								dataMap.put("UNDERGRAD_MAJOR",
										eElement.getElementsByTagName("UGMajor").item(0).getTextContent());

								String graduationDate = eElement.getElementsByTagName("GraduationDate").item(0)
										.getTextContent();
								/*
								 * Object graduationDateObj = ""; if (graduationDate != null && graduationDate
								 * != "") { Date graduationDateNew = Date.valueOf(graduationDate);
								 * graduationDateObj = graduationDateNew; }
								 */
								dataMap.put("GRADUATION_DATE", graduationDate);
								dataMap.put("STUDENT_ID_NUMBER",
										eElement.getElementsByTagName("StudentID").item(0).getTextContent());

								dataMap.put("STUDENT_SIGN",
										eElement.getElementsByTagName("StudentSign").item(0).getTextContent());
								String studentSignDate = eElement.getElementsByTagName("StudentSignDate").item(0)
										.getTextContent();
								Object studentSignDateObj = "";
								if (studentSignDate != null && studentSignDate != "") {
									Date studentSignDateNew = Date.valueOf(studentSignDate);
									studentSignDateObj = studentSignDateNew;
								}
								dataMap.put("STUDENT_SIGN_DATE", studentSignDateObj);

								dataMap.put("GRAD_UNIT_EVALUATOR_SIGN",
										eElement.getElementsByTagName("GradUnitSupervisor").item(0).getTextContent());
								String gradSignDate = eElement.getElementsByTagName("GradUnitSupervisorSignDate")
										.item(0).getTextContent();
								Object gradSignDateObj = "";
								if (gradSignDate != null && gradSignDate != "") {
									Date gradSignDateNew = Date.valueOf(gradSignDate);
									gradSignDateObj = gradSignDateNew;
								}
								dataMap.put("GRAD_UNIT_EVALUATOR_SIGN_DATE", gradSignDateObj);
								dataMap.put("GRAD_UNIT_EVALUATOR_COMMENTS", eElement
										.getElementsByTagName("GradUnitSupervisorComments").item(0).getTextContent());

								dataMap.put("PETITION_COORDINATOR_SIGN", eElement
										.getElementsByTagName("PetitionCoordinatorSign").item(0).getTextContent());
								String petitionSignDate = eElement.getElementsByTagName("PetitionCoordinatorDate")
										.item(0).getTextContent();
								Object petitionSignDateObj = "";
								if (petitionSignDate != null && petitionSignDate != "") {
									Date petitionSignDateNew = Date.valueOf(petitionSignDate);
									petitionSignDateObj = petitionSignDateNew;
								}
								dataMap.put("PETITION_COORDINATOR_SIGN_DATE", petitionSignDateObj);
								dataMap.put("PETITION_COORDINATOR_COMMENTS", eElement
										.getElementsByTagName("PetitionCoordinatorComments").item(0).getTextContent());

								dataMap.put("RECORDS_SIGN",
										eElement.getElementsByTagName("RecordsSign").item(0).getTextContent());
								String recordSignDate = eElement.getElementsByTagName("RecordsSignDate").item(0)
										.getTextContent();
								Object recordSignDateObj = "";
								if (recordSignDate != null && recordSignDate != "") {
									Date recordSignDateNew = Date.valueOf(recordSignDate);
									recordSignDateObj = recordSignDateNew;
								}
								dataMap.put("RECORDS_SIGN_DATE", recordSignDateObj);
								dataMap.put("RECORDS_DECISION",
										eElement.getElementsByTagName("RecordsDecision").item(0).getTextContent());
								dataMap.put("RECORDS_COMMENTS",
										eElement.getElementsByTagName("RecordsSignComments").item(0).getTextContent());

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
								if (dataMap.get("LAST_STEP").equals("Records-Review")) {
									savePetitionInfoTableData(conn, eElement, formName, childTableName, cwid, caseid,
											fname, lname, workflowInstanceID);
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
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
						log.debug("IOException in PetitionforPGCreditDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in PetitionforPGCreditDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}
		}
	}

	private void savePetitionInfoTableData(Connection conn, Element eElement, String formName, String tableName,
			String cwid, String caseId, String fname, String lname, String workflowInstanceId) {
		try {
			LinkedHashMap<String, Object> dataMapInfo = null;
			String deptCourseNo = "";
			String Semester = "";
			String courseUnitValue = "";
			String verification = "";

			for (int j = 0; j < eElement.getElementsByTagName("Row1").getLength(); j++) {

				for (int k = 0; k < eElement.getElementsByTagName("Row1").item(j).getChildNodes().getLength(); k++) {
					String nodeName = eElement.getElementsByTagName("Row1").item(j).getChildNodes().item(k)
							.getNodeName();

					String nodeValue = eElement.getElementsByTagName("Row1").item(j).getChildNodes().item(k)
							.getTextContent();

					if (nodeName.contains("DeptCourseNo")) {
						deptCourseNo = nodeValue;
					}
					if (nodeName.contains("Semester")) {
						Semester = nodeValue;
					}
					if (nodeName.contains("CourseUnitValue")) {
						courseUnitValue = nodeValue;
					}
					if (nodeName.contains("Verification")) {
						verification = nodeValue;
					}
				}
				dataMapInfo = new LinkedHashMap<String, Object>();

				dataMapInfo.put("CWID", cwid);
				dataMapInfo.put("CASEID", caseId);
				dataMapInfo.put("FIRST_NAME", fname);
				dataMapInfo.put("LAST_NAME", lname);
				dataMapInfo.put("DEPT_COURSE_NO", deptCourseNo);
				dataMapInfo.put("SEMESTER", Semester);
				dataMapInfo.put("COURSE_UNIT_VALUE", courseUnitValue);
				dataMapInfo.put("VERIFICATION", verification);
				dataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceId);

				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					dbUtil.insertFormData(conn, dataMapInfo, tableName, formName);
				} else {
					log.error("Connection Unsuccessfull");
				}
			}

		} catch (Exception e) {
			log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			log.error("Failed to insert Petition for PG Credit DB Table Data");
		}
	}
}
