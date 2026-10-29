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
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=University Key Control DB Save", "service.vendor=ThoughtFocus",
		"process.label=UniversityKeyControlDB" })
public class CSUFUniversityKeyControlDB implements WorkflowProcess {

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Reference
	private TaskService taskService;

	private static final Logger logger = LoggerFactory.getLogger(CSUFUniversityKeyControlDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {
		Connection connection = null;
		String tableName = "AEM_UNIVERSITY_KEY_CONTROL";
		String childTableName = "AEM_UKC_INFO";
		String assignee = "";
		String formName = "University Key Control - Building Keys";
		String campusid = "";
		String caseid = "";
		String hook = "";
		String copy = "";
		String building = "";
		String room = "";
		String sign = "";
		String issuedDate = "";
		String returnDate = "";
		String returnStatus = "";

		LinkedHashMap<String, Object> dataMap = null;
		LinkedHashMap<String, Object> dataMapTable = null;
		String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		/*connection = jdbcConnectionService.getDBConn(dataSourceVal);*/

		String payLoadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = wfSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		if (StringUtils.isNotBlank(payLoadPath)) {
			InputStream inputstream = null;
			try {
				inputstream = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payLoadPath, "Data.xml");

				if (inputstream != null) {
					Document doc = XMLUtils.getDomDocument(inputstream);

					NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int i = 0; i < nList.getLength(); i++) {
						Node nNode = nList.item(i);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							try {
								Element element = (Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								logger.debug("index=" + i);
								campusid = element.getElementsByTagName("CampusID").item(0).getTextContent();
								dataMap.put("CAMPUS_ID", campusid);
								dataMap.put("NAME", element.getElementsByTagName("Name").item(0).getTextContent());
								caseid = element.getElementsByTagName("CaseID").item(0).getTextContent();
								dataMap.put("CASE_ID", caseid);
								dataMap.put("CAMPUS_PHONE",
										element.getElementsByTagName("CampusPhone").item(0).getTextContent());
								dataMap.put("DEPARTMENT_Division",
										element.getElementsByTagName("Department").item(0).getTextContent());
								dataMap.put("CONTACT",
										element.getElementsByTagName("Contact").item(0).getTextContent());
								dataMap.put("EXT", element.getElementsByTagName("Ext").item(0).getTextContent());
								dataMap.put("EMPLOYMENT_TYPE",
										element.getElementsByTagName("EmploymentType").item(0).getTextContent());
								dataMap.put("APPLICANT_SIGN",
										element.getElementsByTagName("ApplicantSignature").item(0).getTextContent());
								String applicantSignDate = element.getElementsByTagName("ApplicantSignatureDate")
										.item(0).getTextContent();
								Object applicantSignDateObj = "";
								if (applicantSignDate != null && applicantSignDate != "") {
									Date applicantSignDateNew = Date.valueOf(applicantSignDate);
									applicantSignDateObj = applicantSignDateNew;
								}
								dataMap.put("APPLICANT_SIGN_DATE", applicantSignDateObj);
								dataMap.put("APPLICANT_EMAIL",
										element.getElementsByTagName("EmployeeEmail").item(0).getTextContent());
								dataMap.put("APPROVER_NAME",
										element.getElementsByTagName("ApproverName").item(0).getTextContent());
								dataMap.put("APPROVER_USER_ID",
										element.getElementsByTagName("ApproverUserId").item(0).getTextContent());
								dataMap.put("APPROVER_EMAIL",
										element.getElementsByTagName("ApproverEmail").item(0).getTextContent());
								dataMap.put("APPROVER_SIGN",
										element.getElementsByTagName("Signature").item(0).getTextContent());
								String approverSignDate = element.getElementsByTagName("SignatureDate").item(0)
										.getTextContent();
								Object approverSignDateObj = "";
								if (approverSignDate != null && approverSignDate != "") {
									Date approverSignDateNew = Date.valueOf(approverSignDate);
									approverSignDateObj = approverSignDateNew;
								}
								dataMap.put("APPROVER_SIGN_DATE", approverSignDateObj);
								dataMap.put("KEY_MANAGEMENT_SIGN",
										element.getElementsByTagName("OfficeUse").item(0).getTextContent());
								String keyManagementSignDate = element.getElementsByTagName("PoliceSignatureDate")
										.item(0).getTextContent();
								Object keyManagementSignDateObj = "";
								if (keyManagementSignDate != null && keyManagementSignDate != "") {
									Date KeyManagementSignDateNew = Date.valueOf(keyManagementSignDate);
									keyManagementSignDateObj = KeyManagementSignDateNew;
								}
								dataMap.put("KEY_MANAGEMENT_SIGN_DATE", keyManagementSignDateObj);
								dataMap.put("STAGE_INDICATOR",
										element.getElementsByTagName("StageIndicator").item(0).getTextContent());

								List<Route> backRoutesList = wfSession.getBackRoutes(workItem, false);
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
								if (dataMap.get("LAST_STEP").equals("Police Department Review")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNNING");
								}
								dataMap.put("LAST_STEP_ASSIGNEE", assignee);
								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

								try {
									CloudDbSaveUtil.saveFormData(tableName, formName, campusid, "CAMPUS_ID",
											workflowInstanceID, dataMap,
											"APPLICANT_SIGN_DATE,APPROVER_SIGN_DATE,KEY_MANAGEMENT_SIGN_DATE");
								} catch (IOException ioException) {
									ioException.printStackTrace();
								}

								for (int j = 0; j < element.getElementsByTagName("Row1").getLength(); j++) {

									for (int k = 0; k < element.getElementsByTagName("Row1").item(j).getChildNodes()
											.getLength(); k++) {
										String nodeName = element.getElementsByTagName("Row1").item(j).getChildNodes()
												.item(k).getNodeName();

										String nodeValue = element.getElementsByTagName("Row1").item(j).getChildNodes()
												.item(k).getTextContent();

										if (nodeName.contains("Hook")) {
											hook = nodeValue;
										}
										if (nodeName.contains("Copy")) {
											copy = nodeValue;
										}
										if (nodeName.contains("Building")) {
											building = nodeValue;
										}
										if (nodeName.contains("Room")) {
											room = nodeValue;
										}
										if (nodeName.contains("ResponsibleSignature")) {
											sign = nodeValue;
										}
										if (nodeName.contains("IssuedDate")) {
											issuedDate = nodeValue;
										}
										if (nodeName.contains("ReturnDate")) {
											returnDate = nodeValue;
										}
										if (nodeName.contains("ReturnStatus")) {
											returnStatus = nodeValue;
										}
									}

									Object returnDateObj = null;
									if (returnDate != null && returnDate != "") {
										Date returnDateNew = Date.valueOf(returnDate);
										returnDateObj = returnDateNew;
									}

									Object issuedDateObj = null;
									if (issuedDate != null && issuedDate != "") {
										Date issuedDateNew = Date.valueOf(issuedDate);
										issuedDateObj = issuedDateNew;
									}
									dataMapTable = new LinkedHashMap<String, Object>();

									dataMapTable.put("CASE_ID", caseid);
									dataMapTable.put("CAMPUS_ID", campusid);
									dataMapTable.put("HOOK", hook);
									dataMapTable.put("COPY", copy);
									dataMapTable.put("BUILDING", building);
									dataMapTable.put("ROOM", room);
									dataMapTable.put("SIGNATURE", sign);
									dataMapTable.put("ISSUED_DATE", issuedDateObj);
									dataMapTable.put("RETURN_DATE", returnDateObj);
									dataMapTable.put("RETURN_STATUS", returnStatus);
									dataMapTable.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

									if (!hook.isEmpty()) {
										try {
											CloudDbSaveUtil.saveFormData(childTableName, formName, "", "",
													workflowInstanceID, dataMapTable, "ISSUED_DATE,RETURN_DATE");
										} catch (IOException ioException) {
											ioException.printStackTrace();
										}
									}
								}
							} catch (Exception e) {
								logger.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				logger.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} finally {
				if (null != inputstream)
					try {
						inputstream.close();
					} catch (IOException e) {
						logger.debug("IOException in CSUFUniversityKeyControlDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
			}
			if (connection != null) {
				try {
					connection.close();
				} catch (SQLException e) {
				}
			}
		}
	}

}
