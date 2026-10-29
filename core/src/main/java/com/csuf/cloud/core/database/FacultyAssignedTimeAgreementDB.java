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
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Faculty Assigned Time Agreement Save", "service.vendor=ThoughtFocus",
		"process.label=FacultyAssignedTimeAgreementDB" })
public class FacultyAssignedTimeAgreementDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(FacultyAssignedTimeAgreementDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_AT_GUIDELINES";
		String formName = "Faculty Assigned Time Agreement";
		String assignee = "";
		String cwid = "";
		String evalflag = "";
		String facultyAgreementWorkflowInstanceID = "";
		String afterFactWorkflowInstanceID = "";
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
					String dataXML = XMLUtils.prettyPrintAsString(doc);

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

								dataMap.put("COLLEGE",
										eElement.getElementsByTagName("College").item(0).getTextContent());
								dataMap.put("REASSIGNED_TIME_REASON",
										eElement.getElementsByTagName("ReassignedTimeReason").item(0).getTextContent());
								dataMap.put("START_TERM",
										eElement.getElementsByTagName("StartTerm").item(0).getTextContent());
								dataMap.put("END_TERM",
										eElement.getElementsByTagName("EndTerm").item(0).getTextContent());
								dataMap.put("WTU_PER_TERM",
										eElement.getElementsByTagName("WTUPerTerm").item(0).getTextContent());
								dataMap.put("BRIEF_DESCRIPTION",
										eElement.getElementsByTagName("BriefDescription").item(0).getTextContent());
								dataMap.put("PROJECT_DESCRIPTION",
										eElement.getElementsByTagName("ProjectDescription").item(0).getTextContent());

								dataMap.put("FIRST_NAME",
										eElement.getElementsByTagName("FirstName").item(0).getTextContent());
								dataMap.put("LAST_NAME",
										eElement.getElementsByTagName("LastName").item(0).getTextContent());
								dataMap.put("INITIATOR_FLAG",
										eElement.getElementsByTagName("InitiatorFlag").item(0).getTextContent());
								dataMap.put("DEPARMENT_ID",
										eElement.getElementsByTagName("DeptId").item(0).getTextContent());

								dataMap.put("INITIATOR_NAME",
										eElement.getElementsByTagName("InitiatorName").item(0).getTextContent());
								dataMap.put("INITIATOR_EMAIL",
										eElement.getElementsByTagName("InitiatorEmail").item(0).getTextContent());
								dataMap.put("INITIATOR_USERID",
										eElement.getElementsByTagName("InitiatorUserId").item(0).getTextContent());

								dataMap.put("FACULTY_NAME",
										eElement.getElementsByTagName("FacultyName").item(0).getTextContent());
								dataMap.put("FACULTY_EMAIL",
										eElement.getElementsByTagName("FacultyEmail").item(0).getTextContent());
								dataMap.put("FACULTY_USERID",
										eElement.getElementsByTagName("FacultyUserID").item(0).getTextContent());

								dataMap.put("CHAIR_NAME",
										eElement.getElementsByTagName("HiddenChairName").item(0).getTextContent());
								dataMap.put("CHAIR_EMAIL",
										eElement.getElementsByTagName("ChairEmail").item(0).getTextContent());
								dataMap.put("CHAIR_USERID",
										eElement.getElementsByTagName("ChairUserID").item(0).getTextContent());

								dataMap.put("DEAN_NAME",
										eElement.getElementsByTagName("HiddenDeanName").item(0).getTextContent());
								dataMap.put("DEAN_EMAIL",
										eElement.getElementsByTagName("DeanEmail").item(0).getTextContent());
								dataMap.put("DEAN_USERID",
										eElement.getElementsByTagName("DeanUserID").item(0).getTextContent());

							//	String startTermDate = eElement.getElementsByTagName("StartTermDate").item(0).getTextContent();
							//	dataMap.put("START_TERM_DATE", DatabaseUtils.convertToDate(startTermDate));
							//	String endTermDate = eElement.getElementsByTagName("EndTermDate").item(0).getTextContent();
							//	dataMap.put("END_TERM_DATE", DatabaseUtils.convertToDate(endTermDate));
								
								String launchDate = eElement.getElementsByTagName("AfterTheFactLaunchDate").item(0).getTextContent();
								Object launchDateObj = "";
								if (launchDate != null && launchDate != "") {
									Date launchDateNew = Date.valueOf(launchDate);
									launchDateObj = launchDateNew;
								}
								dataMap.put("LAUNCH_DATE", launchDateObj);

								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								dataMap.put("AFTIA_DESC_CWID",
										eElement.getElementsByTagName("aftiaDescCWID").item(0).getTextContent());

								dataMap.put("INITIATOR_SIGNATURE",
										eElement.getElementsByTagName("Initiator1Signature").item(0).getTextContent());
								
							//	String initiatorSignDate = eElement.getElementsByTagName("Initiator1Date").item(0).getTextContent();
							//	dataMap.put("INITIATOR_SIGN_DATE", DatabaseUtils.convertToDate(initiatorSignDate));
							//	dataMap.put("INITIATOR_COMMENTS",eElement.getElementsByTagName("InitiatorComments").item(0).getTextContent());

								dataMap.put("FACULTY_SIGNATURE",
										eElement.getElementsByTagName("Faculty1Signature").item(0).getTextContent());
								
							//	String facultySignDate = eElement.getElementsByTagName("Faculty1Date").item(0).getTextContent();
							//	dataMap.put("FACULTY_SIGN_DATE", DatabaseUtils.convertToDate(facultySignDate));
							//	dataMap.put("FACULTY_COMMENTS",eElement.getElementsByTagName("FacultyComments").item(0).getTextContent());

								dataMap.put("CHAIR_SIGNATURE",
										eElement.getElementsByTagName("Chair1Signature").item(0).getTextContent());
								
							//	String chairSignDate = eElement.getElementsByTagName("Chair1Date").item(0).getTextContent();
							//	dataMap.put("CHAIR_SIGN_DATE", DatabaseUtils.convertToDate(chairSignDate));
							//	dataMap.put("CHAIR_COMMENTS",eElement.getElementsByTagName("ChairComments").item(0).getTextContent());

								dataMap.put("DEAN_SIGNATURE",
										eElement.getElementsByTagName("DeanSignature").item(0).getTextContent());
								
							//	String deanSignDate = eElement.getElementsByTagName("DeanDate").item(0).getTextContent();
							//	dataMap.put("DEAN_SIGN_DATE", DatabaseUtils.convertToDate(deanSignDate));
							//	dataMap.put("DEAN_COMMENTS",eElement.getElementsByTagName("DeanComments").item(0).getTextContent());

								dataMap.put("DATA", dataXML);

								dataMap.put("FACT_EVALUATION_SUMMARY", eElement
										.getElementsByTagName("FactEvaluationSummary").item(0).getTextContent());

								evalflag = eElement.getElementsByTagName("EvalFlag").item(0).getTextContent();
								dataMap.put("FACT_EVALUATION_FLAG", evalflag);

								dataMap.put("AFTER_INITIATOR_SIGNATURE",
										eElement.getElementsByTagName("Initiator2Signature").item(0).getTextContent());
								
							//	String factevaluationinitiatorSignDate = eElement.getElementsByTagName("Initiator2Date").item(0).getTextContent();
							//	dataMap.put("AFTER_INITIATOR_SIGN_DATE", DatabaseUtils.convertToDate(factevaluationinitiatorSignDate));
							//	dataMap.put("AFTER_INITIATOR_COMMENTS",eElement.getElementsByTagName("Initiator2Comments").item(0).getTextContent());

								dataMap.put("AFTER_FACULTY_SIGNATURE",
										eElement.getElementsByTagName("Faculty2Signature").item(0).getTextContent());

							//	String factevaluationfacultySignDate = eElement.getElementsByTagName("Faculty2Date").item(0).getTextContent();
							//	dataMap.put("AFTER_FACULTY_SIGN_DATE", DatabaseUtils.convertToDate(factevaluationfacultySignDate));
							//	dataMap.put("AFTER_FACULTY_COMMENTS",eElement.getElementsByTagName("Faculty2Comments").item(0).getTextContent());

								dataMap.put("AFTER_CHAIR_SIGNATURE",
										eElement.getElementsByTagName("Chair2Signature").item(0).getTextContent());

							//	String chairEvalSignDate = eElement.getElementsByTagName("Chair2Date").item(0).getTextContent();
							//	dataMap.put("AFTER_CHAIR_SIGN_DATE", DatabaseUtils.convertToDate(chairEvalSignDate));
							//	dataMap.put("AFTER_CHAIR_COMMENTS",eElement.getElementsByTagName("Chair2Comments").item(0).getTextContent());
								
								dataMap.put("ADDTIONAL_REVIEWER_NAME", eElement
										.getElementsByTagName("AdditionalReviewerName").item(0).getTextContent());
								dataMap.put("ADDTIONAL_REVIEWER_USERID", eElement
										.getElementsByTagName("AdditionalReviewerUserId").item(0).getTextContent());
								dataMap.put("ADDTIONAL_REVIEWER_EMAIL", eElement
										.getElementsByTagName("AdditionalReviewerEmailId").item(0).getTextContent());

								dataMap.put("ADDTIONAL_REVIEWER_SIGN_NAME",
										eElement.getElementsByTagName("AdditionalReviewerSignatureName").item(0)
												.getTextContent());
								dataMap.put("ADDTIONAL_REVIEWER_SIGNATURE", eElement
										.getElementsByTagName("AdditionalReviewerSignature").item(0).getTextContent());

							//	String signDate = eElement.getElementsByTagName("AdditionalReviewerSignatureDate").item(0).getTextContent();
							//	dataMap.put("ADDTIONAL_REVIEWER_SIGN_DATE", DatabaseUtils.convertToDate(signDate));
							//	dataMap.put("ADDTIONAL_REVIEWER_COMMENTS", eElement.getElementsByTagName("AdditionalReviewerComments").item(0).getTextContent());

								dataMap.put("EVAL_ADDTIONAL_REVIEWER_NAME",
										eElement.getElementsByTagName("AdditionalReviewer2SignatureName").item(0)
												.getTextContent());
								dataMap.put("EVAL_REVIEWER_SIGNATURE", eElement
										.getElementsByTagName("AdditionalReviewer2Signature").item(0).getTextContent());

							//	String evalSignDate = eElement.getElementsByTagName("AdditionalReviewer2SignatureDate").item(0).getTextContent();
							//	dataMap.put("EVAL_REVIEWER_SIGN_DATE", DatabaseUtils.convertToDate(evalSignDate));
							//	dataMap.put("EVAL_REVIEWER_COMMENTS", eElement.getElementsByTagName("AdditionalReviewer2Comments").item(0).getTextContent());
								
								dataMap.put("BATCH_LAUNCH_FLAG", eElement
										.getElementsByTagName("BatchLaunchFlag").item(0).getTextContent());


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

								if (dataMap.get("FACT_EVALUATION_FLAG").equals("False")) {
									facultyAgreementWorkflowInstanceID = workflowInstanceID;
									if (dataMap.get("LAST_STEP").equals("Dean Review")) {
										   if (metaDataMap.containsKey("actionTakenByDean")) {
										        String stepResponse = metaDataMap.get("actionTakenByDean").toString();
										        if (stepResponse.equalsIgnoreCase("Submit")) {
										            dataMap.put("WORKFLOW_STATUS", "COMPLETED");
										        } else {
										            dataMap.put("WORKFLOW_STATUS", "RUNNNING");
										        }
										    } else {
										        log.error("Last step is Dean Review but metaDatamap doesn't have actionTakenByDean");
										    }
										} else {
										    dataMap.put("WORKFLOW_STATUS", "RUNNNING");
										}
								} else {
									facultyAgreementWorkflowInstanceID = eElement
											.getElementsByTagName("FactAgreementWorkflowInstanceID").item(0)
											.getTextContent();
								}

								if (dataMap.get("FACT_EVALUATION_FLAG").equals("True")) {
									afterFactWorkflowInstanceID = workflowInstanceID;
									dataMap.put("AFTER_FACT_WF_INSTANCE_ID", afterFactWorkflowInstanceID);									
									if (!StringUtils.isEmpty(dataMap.get("ADDTIONAL_REVIEWER_SIGNATURE").toString())) {
										if (dataMap.get("LAST_STEP").equals("Alternate Approver Review")) {
											if(metaDataMap.containsKey("actionTakenByAdditionalReviewer")) {
												 String stepResponse = metaDataMap.get("actionTakenByAdditionalReviewer").toString();
												 if (stepResponse.equalsIgnoreCase("Submit")) {
											            dataMap.put("FACT_EVAL_WORKFLOW_STATUS", "COMPLETED");
											        } else {
											            dataMap.put("FACT_EVAL_WORKFLOW_STATUS", "RUNNNING");
											        }
											} else {
												log.error("Last step is Alternate Approver Review but metaDatamap doesn't have actionTakenByAdditionalReviewer");
											}
										} else {
											dataMap.put("FACT_EVAL_WORKFLOW_STATUS", "RUNNNING");
										}
									} else{										
										if (dataMap.get("LAST_STEP").toString().equals("Chair Review")) {
											if(metaDataMap.containsKey("actionTakenByChair")) {
												String stepResponse = metaDataMap.get("actionTakenByChair").toString();
												if (stepResponse.equalsIgnoreCase("Submit")) {
										            dataMap.put("FACT_EVAL_WORKFLOW_STATUS", "COMPLETED");
										        } else {
										            dataMap.put("FACT_EVAL_WORKFLOW_STATUS", "RUNNNING");
										        }
											}else {
												log.error("Last step is Chair Review but metaDatamap doesn't have actionTakenByChair");
											}
										} else {
											dataMap.put("FACT_EVAL_WORKFLOW_STATUS", "RUNNNING");
										}
									}
								}

								dataMap.put("LAST_STEP_ASSIGNEE", assignee);
								log.debug("Executing else block Last step assignee : {}", assignee);
								dataMap.put("WORKFLOW_INSTANCE_ID", facultyAgreementWorkflowInstanceID);
								dataMap.put("PAYLOAD_PATH", payloadPath);

							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}
				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", facultyAgreementWorkflowInstanceID,
							tableName);
					log.debug("ResultData : {}", resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", facultyAgreementWorkflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "CWID", facultyAgreementWorkflowInstanceID,
							dataMap, "LAUNCH_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
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
						log.debug("IOException in FacultyAssignedTimeAgreementDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				/*if (conn != null) { try { conn.close(); } catch (SQLException e) { } }*/
			}

		}
	}
}
