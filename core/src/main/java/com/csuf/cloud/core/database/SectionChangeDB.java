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
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
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

@Component(property = { "service.description=Section Change DB Save", "service.vendor=ThoughtFocus",
		"process.label=SectionChangeDB" })
public class SectionChangeDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(SectionChangeDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_SECTION_CHANGE";
		String formName = "Request for Section Change";
		//String assignee = "";
		String cwid = "";
		String caseid = "";
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

					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							try {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								log.debug("index=" + temp);
								cwid = eElement.getElementsByTagName("Cwid").item(0).getTextContent();
								caseid = eElement.getElementsByTagName("caseId").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", caseid);

								dataMap.put("STUDENT_FIRST_NAME",
										eElement.getElementsByTagName("FirstName").item(0).getTextContent());
								dataMap.put("STUDENT_LAST_NAME",
										eElement.getElementsByTagName("LastName").item(0).getTextContent());
								dataMap.put("STUDENT_EMAIL",
										eElement.getElementsByTagName("Email").item(0).getTextContent());
								dataMap.put("STUDENT_PHONE_NUMBER",
										eElement.getElementsByTagName("PhoneNo").item(0).getTextContent());

								dataMap.put("DEPT_AND_COURSE",
										eElement.getElementsByTagName("DeptCourse_Drop").item(0).getTextContent());

								dataMap.put("DROP_SECTION",
										eElement.getElementsByTagName("Section_Drop").item(0).getTextContent());
								dataMap.put("DROP_SCHEDULE",
										eElement.getElementsByTagName("Schedule_Drop").item(0).getTextContent());
								dataMap.put("DROP_CLASS_INSTRUCTOR",
										eElement.getElementsByTagName("InstructorName_Drop").item(0).getTextContent());

								dataMap.put("ADD_SECTION",
										eElement.getElementsByTagName("Section_Add").item(0).getTextContent());
								dataMap.put("ADD_SCHEDULE",
										eElement.getElementsByTagName("Schedule_Add").item(0).getTextContent());
								dataMap.put("ADD_CLASS_INSTRUCTOR",
										eElement.getElementsByTagName("InstructorName_Add").item(0).getTextContent());

								dataMap.put("STUDENT_SIGNATURE",
										eElement.getElementsByTagName("StudentSignature").item(0).getTextContent());
								String studentSignDate = eElement.getElementsByTagName("StudentSignatureDate").item(0)
										.getTextContent();
								Object studentSignDateObj = "";
								if (studentSignDate != null && studentSignDate != "") {
									Date studentSignDateNew = Date.valueOf(studentSignDate);
									studentSignDateObj = studentSignDateNew;
								}
								dataMap.put("STUDENT_SIGN_DATE", studentSignDateObj);
								dataMap.put("STUDENT_COMMENTS",
										eElement.getElementsByTagName("StudentComments").item(0).getTextContent());

								dataMap.put("DROP_INSTR_SIGNATURE", eElement
										.getElementsByTagName("InstructorSignature_Drop").item(0).getTextContent());
								String instructor1SignDate = eElement
										.getElementsByTagName("InstructorSignatureDate_Drop").item(0).getTextContent();
								Object instructor1SignDateObj = "";
								if (instructor1SignDate != null && instructor1SignDate != "") {
									Date instructor1SignDateNew = Date.valueOf(instructor1SignDate);
									instructor1SignDateObj = instructor1SignDateNew;
								}
								dataMap.put("DROP_INSTR_SIGNATURE_DATE", instructor1SignDateObj);
								dataMap.put("DROP_INSTR_SIGNATURE_COMMENTS", eElement
										.getElementsByTagName("InstructorComments_Drop").item(0).getTextContent());

								dataMap.put("ADD_INSTR_SIGNATURE", eElement
										.getElementsByTagName("InstructorSignature_Add").item(0).getTextContent());
								String instructor2SignDate = eElement
										.getElementsByTagName("InstructorSignatureDate_Add").item(0).getTextContent();
								Object instructor2SignDateObj = "";
								if (instructor2SignDate != null && instructor2SignDate != "") {
									Date instructor2SignDateNew = Date.valueOf(instructor2SignDate);
									instructor2SignDateObj = instructor2SignDateNew;
								}
								dataMap.put("ADD_INSTR_SIGNATURE_DATE", instructor2SignDateObj);
								dataMap.put("ADD_INSTR_SIGNATURE_COMMENTS", eElement
										.getElementsByTagName("InstructorComments_Add").item(0).getTextContent());

								dataMap.put("ARSC_SIGNATURE",
										eElement.getElementsByTagName("ARSCSignature").item(0).getTextContent());
								String arscSignDate = eElement.getElementsByTagName("ARSCSignatureDate").item(0)
										.getTextContent();
								Object arscSignDateObj = "";
								if (arscSignDate != null && arscSignDate != "") {
									Date arscSignDateNew = Date.valueOf(arscSignDate);
									arscSignDateObj = arscSignDateNew;
								}
								dataMap.put("ARSC_SIGNATURE_DATE", arscSignDateObj);
								dataMap.put("ARSC_COMMENTS",
										eElement.getElementsByTagName("ARSCComments").item(0).getTextContent());

								log.debug("DataMap values :{}", dataMap);
								/*
								 * List<Route> backRoutesList = workflowSession.getBackRoutes(workItem, false);
								 * JsonArray backRoutesJson = new JsonArray(); for (Route backRoute :
								 * backRoutesList) { backRoutesJson.add(backRoute.getName()); } String
								 * saveHistoryBackRoute = ""; if (backRoutesJson.size() == 1) {
								 * saveHistoryBackRoute = backRoutesList.get(0).getName();
								 * log.debug("Executing if block "); } else { saveHistoryBackRoute =
								 * backRoutesList.get(1).getName(); String wId =
								 * workItem.getId().replace("VolatileWorkItem_", "/workItems/"); String firstStr
								 * = wId.substring(0, wId.indexOf('_')); String secString =
								 * wId.substring(wId.indexOf('_') + 1, wId.length()); String t1 =
								 * firstStr.replaceAll("[^0-9]+", ""); int a1 = Integer.parseInt(t1); a1 = a1 -
								 * 2; firstStr = firstStr.replaceAll(t1, String.valueOf(a1)); String workItemId
								 * = workflowInstanceID.concat(firstStr).concat("_").concat(secString); assignee
								 * = taskService.getTaskAssignee(workItemId);
								 * log.debug("Executing else block assignee : {}",assignee); }
								 * dataMap.put("LAST_STEP", saveHistoryBackRoute); if
								 * (dataMap.get("LAST_STEP").equals("Financial Aid Review")) {
								 * dataMap.put("WORKFLOW_STATUS", "COMPLETED"); } else {
								 * dataMap.put("WORKFLOW_STATUS", "RUNNNING"); }
								 * dataMap.put("LAST_STEP_ASSIGNEE", assignee);
								 */
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
					log.debug("ResultData : {}", resultData);
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
						log.debug("IOException in SectionChangeDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in SectionChangeDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}
			

		}
	}
}
