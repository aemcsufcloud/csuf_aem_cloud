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
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONObject;
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

@Component(property = { "service.description=Classroom Lab Equipment Proposal DB Save", "service.vendor=ThoughtFocus",
"process.label=ClassroomLabEquipmentProposalDB" })
public class ClassroomLabEquipmentProposalDB implements WorkflowProcess{
	
	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(ClassroomLabEquipmentProposalDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) 
			throws WorkflowException {
		Connection conn = null;
		String url = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";
		String tableName = "AEM_CLASS_LAB_EQUIPMENT";
		String formName = "Classroom Lab Equipment Proposal";		
		String assignee = "";
		String cwid = "";
		String caseid = "";
		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		log.debug("Workflowinstanceid:"+workflowInstanceID);
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
							log.debug("index="+temp);
							cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
							caseid = eElement.getElementsByTagName("caseId").item(0).getTextContent();
							dataMap.put("CWID", cwid);
							dataMap.put("CASEID", caseid);
							dataMap.put("STUDENT_FIRST_NAME",eElement.getElementsByTagName("FirstName").item(0).getTextContent()); 
							dataMap.put("STUDENT_LAST_NAME",eElement.getElementsByTagName("LastName").item(0).getTextContent());
							dataMap.put("STUDENT_FULL_NAME",eElement.getElementsByTagName("FullName").item(0).getTextContent());
							dataMap.put("STUDENT_EMAIL",eElement.getElementsByTagName("Email").item(0).getTextContent());
							String initiatedDate = eElement.getElementsByTagName("Date1").item(0).getTextContent();
							Object initiatedDateObj = "";
							if (initiatedDate != null && initiatedDate != "") {
								Date initiatedDateNew = Date.valueOf(initiatedDate);
								initiatedDateObj = initiatedDateNew;
							}
							dataMap.put("INITIATED_DATE", initiatedDateObj);
							dataMap.put("TYPE_OF_EQUIPMENT",eElement.getElementsByTagName("TypeOfEquip").item(0).getTextContent());
							dataMap.put("COST_OF_EQUIPMENT",eElement.getElementsByTagName("CostOfEquip").item(0).getTextContent());
							dataMap.put("FOR_WHICH_SPACE", eElement.getElementsByTagName("SpaceDD").item(0).getTextContent());
							dataMap.put("FOR_WHICH_CLASS",eElement.getElementsByTagName("ClassDD").item(0).getTextContent());
							dataMap.put("BENEFIT_TO_DEPT", eElement.getElementsByTagName("BenefitToDept").item(0).getTextContent());
							dataMap.put("SPECIAL_REQUIREMENT",eElement.getElementsByTagName("SpecialRequirement").item(0).getTextContent());
							
							String dateNeeded = eElement.getElementsByTagName("Date2").item(0).getTextContent();
							Object dateNeededObj = "";
							if (dateNeeded != null && dateNeeded != "") {
								Date dateNeededNew = Date.valueOf(dateNeeded);
								dateNeededObj = dateNeededNew;
							}
							dataMap.put("DATE_NEEDED", dateNeededObj);
							//dataMap.put("STUDENT_CB", eElement.getElementsByTagName("StudentCB").item(0).getTextContent());
							dataMap.put("STUDENT_SIGNATURE", eElement.getElementsByTagName("StudentSignature").item(0).getTextContent());
							dataMap.put("STUDENT_COMMENTS", eElement.getElementsByTagName("StudentComments").item(0).getTextContent());
				
							
							String studentDate = eElement.getElementsByTagName("StudentSignDate").item(0).getTextContent();
							Object studentDateObj = "";
							if (studentDate != null && studentDate != "") {
								Date studentDateNew = Date.valueOf(studentDate);
								studentDateObj = studentDateNew;
							}
							dataMap.put("STUDENT_SIGN_DATE", studentDateObj );
							//dataMap.put("PRODUCTION_CB", eElement.getElementsByTagName("ProductionCB").item(0).getTextContent());
							dataMap.put("APPROVED_AMOUNT", eElement.getElementsByTagName("ApprovedAmount").item(0).getTextContent());
							dataMap.put("PRODUCTION_SIGNATURE", eElement.getElementsByTagName("Budget").item(0).getTextContent());
							dataMap.put("PRODUCTION_COMMENTS", eElement.getElementsByTagName("ProductionComments").item(0).getTextContent());
				
							String productionDate = eElement.getElementsByTagName("ProductionDate").item(0).getTextContent();
							Object productionDateObj = "";
							if (productionDate != null && productionDate != "") {
								Date productionDateNew = Date.valueOf(productionDate);
								productionDateObj = productionDateNew;
							}
							dataMap.put("PRODUCTION_SIGN_DATE", productionDateObj );
							
							//vffdataMap.put("CHAIRCB", eElement.getElementsByTagName("ChairCB").item(0).getTextContent());
							dataMap.put("CHAIR_SIGNATURE", eElement.getElementsByTagName("ChairSign").item(0).getTextContent());
							dataMap.put("CHAIR_COMMENTS", eElement.getElementsByTagName("ChairComments").item(0).getTextContent());
				
							String chairDate = eElement.getElementsByTagName("ChairSignDate").item(0).getTextContent();
							Object chairDateObj = "";
							if (chairDate != null && chairDate != "") {
								Date chairDateNew = Date.valueOf(chairDate);
								chairDateObj = chairDateNew;
							}
							dataMap.put("CHAIR_SIGN_DATE", chairDateObj );

							dataMap.put("STAGE_INDICATOR", eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
							dataMap.put("STUDENT_USERID", eElement.getElementsByTagName("Student_UserId").item(0).getTextContent());
							dataMap.put("FUL_COLLEGE", eElement.getElementsByTagName("FUL_COLLEGE").item(0).getTextContent());
							dataMap.put("DEPTID", eElement.getElementsByTagName("DEPTID").item(0).getTextContent());
							dataMap.put("CHAIR_USERID", eElement.getElementsByTagName("CHAIR_USERID").item(0).getTextContent());
							dataMap.put("CHAIR_EMPLID", eElement.getElementsByTagName("CHAIR_EMPLID").item(0).getTextContent());
							dataMap.put("CHAIR_NAME", eElement.getElementsByTagName("CHAIR_NAME").item(0).getTextContent());
							dataMap.put("CHAIR_EMAIL", eElement.getElementsByTagName("CHAIR_EMAIL").item(0).getTextContent());
							log.debug("DataMap values :{}",dataMap);
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
								String workItemId = workflowInstanceID.concat(firstStr).concat("_").concat(secString);
								assignee = taskService.getTaskAssignee(workItemId);
								log.debug("Executing else block assignee : {}",assignee);
							}
							dataMap.put("LAST_STEP", saveHistoryBackRoute);
							if (dataMap.get("LAST_STEP").equals("Chair Department Review")) {
								dataMap.put("WORKFLOW_STATUS", "COMPLETED");
							} else {
								dataMap.put("WORKFLOW_STATUS", "RUNNNING");
							}
							dataMap.put("LAST_STEP_ASSIGNEE", assignee);
							dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
							
							}  catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}				

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
					log.debug("ResultData : {}",resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {						
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				
				JSONObject json = new JSONObject();
				json.put("DB_CONNECTION", "AEMDBDEV");
				json.put("TABLE_NAME", tableName);
				json.put("FORM_NAME", formName);
				json.put("UNIQUE_FIELD", cwid);
				json.put("UNIQUE_FIELD_COLUMN", "CWID");
				json.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
				json.put("DATA_MAP", dataMap);
				json.put("DATE_FIELDS", "INITIATED_DATE,DATE_NEEDED,STUDENT_SIGN_DATE,PRODUCTION_SIGN_DATE,CHAIR_SIGN_DATE");

				log.error("Testing: =" + json.toString());

				String dbServiceUrl = url;

				CloseableHttpClient client = HttpClients.createDefault();
				HttpPost post = new HttpPost(dbServiceUrl);
				post.addHeader("Content-Type", "application/json");
				post.setEntity(new StringEntity(json.toString()));

				CloseableHttpResponse response = client.execute(post);
				log.info("DB Service Response: =" + response.getStatusLine());
				client.close();

			}  catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			}finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in ClassroomLabEquipmentProposalDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in ClassroomLabEquipmentProposalDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}
			

		}
		
		
	}

}
