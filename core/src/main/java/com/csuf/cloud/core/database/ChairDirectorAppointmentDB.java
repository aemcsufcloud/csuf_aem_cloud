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

@Component(property = { "service.description=Chair Director Form DB", "service.vendor=ThoughtFocus", "process.label=Chair Director Form DB" })
public class ChairDirectorAppointmentDB implements WorkflowProcess {
	private static final Logger log = LoggerFactory.getLogger(ChairDirectorAppointmentDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;
	@Reference
	private TaskService taskService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_CHAIR_DORECTOR_FORM";
		String formName = "Chair Director Appointment";
		String assignee = "";
		String college = "";
		LinkedHashMap<String, Object> dataMap = null;
		String url = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";


		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

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
								college = eElement.getElementsByTagName("college").item(0).getTextContent();
								dataMap.put("COLLEGE", college);
								dataMap.put("DEPARTMENT",
										eElement.getElementsByTagName("department").item(0).getTextContent());
								dataMap.put("NAME1", eElement.getElementsByTagName("names1").item(0).getTextContent());
								dataMap.put("NUMBER_OF_VOTES1",
										eElement.getElementsByTagName("number_votes1").item(0).getTextContent());
								dataMap.put("TOTAL_BALLOTS1",
										eElement.getElementsByTagName("total_ballots1").item(0).getTextContent());
								dataMap.put("NAMES2", eElement.getElementsByTagName("names2").item(0).getTextContent());
								dataMap.put("NUMBER_OF_VOTES2",
										eElement.getElementsByTagName("number_votes2").item(0).getTextContent());
								dataMap.put("TOTAL_BALLOTS2",
										eElement.getElementsByTagName("total_ballots2").item(0).getTextContent());
								dataMap.put("NAMES3", eElement.getElementsByTagName("names3").item(0).getTextContent());
								dataMap.put("NUMBER_OF_VOTES3",
										eElement.getElementsByTagName("number_votes3").item(0).getTextContent());
								dataMap.put("TOTAL_BALLOTS3",
										eElement.getElementsByTagName("total_ballots3").item(0).getTextContent());
								dataMap.put("NAMES4", eElement.getElementsByTagName("names4").item(0).getTextContent());
								dataMap.put("NUMBER_OF_VOTES4",
										eElement.getElementsByTagName("number_votes4").item(0).getTextContent());
								dataMap.put("TOTAL_BALLOTS4",
										eElement.getElementsByTagName("total_ballots4").item(0).getTextContent());
								dataMap.put("NAMES5", eElement.getElementsByTagName("names5").item(0).getTextContent());
								dataMap.put("NUMBER_OF_VOTES5",
										eElement.getElementsByTagName("number_votes5").item(0).getTextContent());
								dataMap.put("TOTAL_BALLOTS5",
										eElement.getElementsByTagName("total_ballots5").item(0).getTextContent());
								dataMap.put("TOTAL_BALLOTS_CAST",
										eElement.getElementsByTagName("total_ballots_cast").item(0).getTextContent());
								dataMap.put("BALLOT_COMMENT",
										eElement.getElementsByTagName("ballot_comment").item(0).getTextContent());
								dataMap.put("RECOMMEND_CANDIDATE", eElement
										.getElementsByTagName("recommended_candidate").item(0).getTextContent());
								dataMap.put("ELEC_NOT_APPLICABLE", eElement
										.getElementsByTagName("election_not_applicableCHK").item(0).getTextContent());
								dataMap.put("COMMENTS",
										eElement.getElementsByTagName("comments").item(0).getTextContent());
								dataMap.put("DEPT_CHAIR_CHK",
										eElement.getElementsByTagName("department_chairChk").item(0).getTextContent());
								dataMap.put("SCHOOL_DIRECTOR_CHECK",
										eElement.getElementsByTagName("school_directorChk").item(0).getTextContent());
								dataMap.put("DIV_CHAIR_CHECK",
										eElement.getElementsByTagName("division_chairChk").item(0).getTextContent());
								dataMap.put("CURRENT_DEPT",
										eElement.getElementsByTagName("current_dept").item(0).getTextContent());
								dataMap.put("ONE_SEM_CHK",
										eElement.getElementsByTagName("one_semChk").item(0).getTextContent());
								dataMap.put("ONE_SEM_YEAR",
										eElement.getElementsByTagName("one_sem_year").item(0).getTextContent());
								dataMap.put("ONE_YEAR_CHK",
										eElement.getElementsByTagName("one_yearChk").item(0).getTextContent());
								dataMap.put("ONE_YEAR_FROM",
										eElement.getElementsByTagName("one_year_from").item(0).getTextContent());
								dataMap.put("ONE_YEAR_TO",
										eElement.getElementsByTagName("one_year_to").item(0).getTextContent());
								dataMap.put("ONE_YEAR_CHAIR",
										eElement.getElementsByTagName("one_year_chair").item(0).getTextContent());
								dataMap.put("TWO_YEAR_CHK",
										eElement.getElementsByTagName("two_yearChk").item(0).getTextContent());
								dataMap.put("TWO_YEAR_FROM",
										eElement.getElementsByTagName("two_year_from").item(0).getTextContent());
								dataMap.put("TWO_YEAR_TO",
										eElement.getElementsByTagName("two_year_to").item(0).getTextContent());
								dataMap.put("TWO_YEAR_CHAIR",
										eElement.getElementsByTagName("two_year_chair").item(0).getTextContent());
								dataMap.put("THREE_YEAR_CHK",
										eElement.getElementsByTagName("three_yearChk").item(0).getTextContent());
								dataMap.put("THREE_YEAR_FROM",
										eElement.getElementsByTagName("three_year_from").item(0).getTextContent());
								dataMap.put("THREE_YEAR_TO",
										eElement.getElementsByTagName("three_year_to").item(0).getTextContent());
								dataMap.put("THREE_YEAR_CHAIR",
										eElement.getElementsByTagName("three_year_chair").item(0).getTextContent());								
								dataMap.put("OTHERS_CHK",
										eElement.getElementsByTagName("othersChk").item(0).getTextContent());
								dataMap.put("OTHERS_FROM",
										eElement.getElementsByTagName("others_from").item(0).getTextContent());
								dataMap.put("OTHERS_TO",
										eElement.getElementsByTagName("others_to").item(0).getTextContent());
								dataMap.put("OTHERS_CHAIR",
										eElement.getElementsByTagName("others_chair").item(0).getTextContent());
								dataMap.put("FIRST_PERC_CHK",
										eElement.getElementsByTagName("first_percentageChk").item(0).getTextContent());
								dataMap.put("SECOND_PERC_CHK",
										eElement.getElementsByTagName("second_percentageChk").item(0).getTextContent());
								dataMap.put("THIRD_PERC_CHK",
										eElement.getElementsByTagName("third_percentageChk").item(0).getTextContent());
								dataMap.put("FORTH_PERC_CHK",
										eElement.getElementsByTagName("forth_percentageChk").item(0).getTextContent());
								dataMap.put("OTHERS_PERC_CHK",
										eElement.getElementsByTagName("others_percentageChk").item(0).getTextContent());
								dataMap.put("OTHERS_PERC",
										eElement.getElementsByTagName("others_percentage").item(0).getTextContent());
								dataMap.put("ADDITIONAL_DUTIES",
										eElement.getElementsByTagName("additional_duties").item(0).getTextContent());
								dataMap.put("APPROVED",
										eElement.getElementsByTagName("approved").item(0).getTextContent());
								dataMap.put("NON_APPROVED",
										eElement.getElementsByTagName("non_approved").item(0).getTextContent());
								dataMap.put("HR_COO_DICISION", eElement.getElementsByTagName("hr_coordinator_decision")
										.item(0).getTextContent());
								dataMap.put("HR_COO_SIGN", eElement.getElementsByTagName("hr_coordinator_signature")
										.item(0).getTextContent());
								String hrdate = eElement.getElementsByTagName("hr_coordinator_date").item(0)
										.getTextContent();
								Object thrdateObj = "";
								if (hrdate != null && hrdate != "") {
									Date hrdateNew = Date.valueOf(hrdate);
									thrdateObj = hrdateNew;
								}
								dataMap.put("HR_COO_DATE", thrdateObj);
								dataMap.put("HR_COO_COMMENT", eElement.getElementsByTagName("hr_coordinator_comment")
										.item(0).getTextContent());
								dataMap.put("ELEC_ADMIN_DECISION", eElement
										.getElementsByTagName("election_admin_decision").item(0).getTextContent());
								dataMap.put("ELEC_ADMIN_SIGN", eElement.getElementsByTagName("election_admin_siganture")
										.item(0).getTextContent());
								String admindate = eElement.getElementsByTagName("election_admin_date").item(0)
										.getTextContent();
								Object admindateObj = "";
								if (admindate != null && admindate != "") {
									Date admindateNew = Date.valueOf(admindate);
									admindateObj = admindateNew;
								}
								
								dataMap.put("ELEC_ADMIN_DATE", admindateObj);
								dataMap.put("ELEC_ADMIN_COMMENT", eElement
										.getElementsByTagName("election_admin_comment").item(0).getTextContent());
								dataMap.put("FORM_FILLER_DECISION",
										eElement.getElementsByTagName("form_filler_decision").item(0).getTextContent());
								dataMap.put("FORM_FILLER_SIGN", eElement.getElementsByTagName("form_filler_siganture")
										.item(0).getTextContent());
								String initiatordate = eElement.getElementsByTagName("form_filler_date").item(0)
										.getTextContent();
								Object initiatordateObj = "";
								if (initiatordate != null && initiatordate != "") {
									Date initiatordateNew = Date.valueOf(initiatordate);
									initiatordateObj = initiatordateNew;
								}
								dataMap.put("FORM_FILLER_DATE", initiatordateObj);
								dataMap.put("FORM_FILLER_COMMENT",
										eElement.getElementsByTagName("form_filler_comment").item(0).getTextContent());
								dataMap.put("DEAN_DECISION",
										eElement.getElementsByTagName("dean_decision").item(0).getTextContent());
								dataMap.put("DEAN_SIGNATURE",
										eElement.getElementsByTagName("dean_siganture").item(0).getTextContent());
								String deandate = eElement.getElementsByTagName("dean_date").item(0).getTextContent();
								Object deandateObj = "";
								if (deandate != null && deandate != "") {
									Date deandateNew = Date.valueOf(deandate);
									deandateObj = deandateNew;
								}
								dataMap.put("DEAN_DATE", deandateObj);
								dataMap.put("DEAN_COMMENT",
										eElement.getElementsByTagName("dean_comment").item(0).getTextContent());
								dataMap.put("HR_ACADEMIC_DECISION",
										eElement.getElementsByTagName("hr_academic_decision").item(0).getTextContent());
								dataMap.put("HR_ACADEMIC_SIGN", eElement.getElementsByTagName("hr_academic_siganture")
										.item(0).getTextContent());
								String hracadate = eElement.getElementsByTagName("hr_academic_date").item(0)
										.getTextContent();
								Object hracadateObj = "";
								if (hracadate != null && hracadate != "") {
									Date hracadateNew = Date.valueOf(hracadate);
									hracadateObj = hracadateNew;
								}
								dataMap.put("HR_ACADEMIC_DATE", hracadateObj);
								dataMap.put("HR_ACADEMIC_COMMENT",
										eElement.getElementsByTagName("hr_academic_comment").item(0).getTextContent());
								dataMap.put("PROVOST_DECISION",
										eElement.getElementsByTagName("provost_decision").item(0).getTextContent());
								dataMap.put("PROVOST_SIGN",
										eElement.getElementsByTagName("provost_siganture").item(0).getTextContent());
								String provostdate = eElement.getElementsByTagName("provost_date").item(0)
										.getTextContent();
								Object provostdateObj = "";
								if (provostdate != null && provostdate != "") {
									Date provostdateNew = Date.valueOf(provostdate);
									provostdateObj = provostdateNew;
								}
								dataMap.put("PROVOST_DATE", provostdateObj);
								dataMap.put("PROVOST_COMMENT",
										eElement.getElementsByTagName("provost_comment").item(0).getTextContent());
								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
								dataMap.put("INITIATOR_FNAME", eElement
										.getElementsByTagName("hidden_initiator_firstName").item(0).getTextContent());
								dataMap.put("INITIATOR_LNAME", eElement
										.getElementsByTagName("hidden_initiator_lastName").item(0).getTextContent());

								dataMap.put("INITIATOR_CWID", eElement.getElementsByTagName("hidden_initiator_cwid")
										.item(0).getTextContent());
								dataMap.put("ELEC_ADMIN_NAME", eElement
										.getElementsByTagName("hidden_electionAdmin_name").item(0).getTextContent());
								dataMap.put("ELEC_ADMIN_UID", eElement
										.getElementsByTagName("hidden_electionAdmin_userId").item(0).getTextContent());
								dataMap.put("ELEC_ADMIN_EMAIL", eElement
										.getElementsByTagName("hidden_electionAdmin_email").item(0).getTextContent());
								dataMap.put("FORM_FILLER_NAME", eElement.getElementsByTagName("hidden_formFiller_name")
										.item(0).getTextContent());
								dataMap.put("FORM_FILLER_UID", eElement.getElementsByTagName("hidden_formFiller_userId")
										.item(0).getTextContent());
								dataMap.put("FORM_FILLER_EMAIL", eElement
										.getElementsByTagName("hidden_formFiller_email").item(0).getTextContent());
								dataMap.put("DEAN_NAME",
										eElement.getElementsByTagName("hidden_dean_name").item(0).getTextContent());
								dataMap.put("DEAN_UID",
										eElement.getElementsByTagName("hidden_dean_userId").item(0).getTextContent());
								dataMap.put("DEAN_EMAIL",
										eElement.getElementsByTagName("hidden_dean_email").item(0).getTextContent());
								dataMap.put("PROVOST_NAME",
										eElement.getElementsByTagName("hidden_provost_name").item(0).getTextContent());
								dataMap.put("PROVOST_UID", eElement.getElementsByTagName("hidden_provost_userId")
										.item(0).getTextContent());
								dataMap.put("PROVOST_EMAIL",
										eElement.getElementsByTagName("hidden_provost_email").item(0).getTextContent());

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

							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, college, "COLLEGE", workflowInstanceID, tableName);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, college, "COLLEGE", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/
				
				JSONObject json = new JSONObject();
				json.put("DB_CONNECTION", "AEMDBDEV");
				json.put("TABLE_NAME", tableName);
				json.put("FORM_NAME", formName);
				json.put("UNIQUE_FIELD", college);
				json.put("UNIQUE_FIELD_COLUMN", "COLLEGE");
				json.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
				json.put("DATA_MAP", dataMap);
				json.put("DATE_FIELDS", "HR_COO_DATE,ELEC_ADMIN_DATE,FORM_FILLER_DATE,DEAN_DATE,HR_ACADEMIC_DATE,PROVOST_DATE");

				log.error("Testing: =" + json.toString());

				String dbServiceUrl = url;

				CloseableHttpClient client = HttpClients.createDefault();
				HttpPost post = new HttpPost(dbServiceUrl);
				post.addHeader("Content-Type", "application/json");
				post.setEntity(new StringEntity(json.toString()));

				CloseableHttpResponse response = client.execute(post);
				log.info("DB Service Response: =" + response.getStatusLine());
				client.close();

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in ChairDirectorAppointmentDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error("SQLException in ChairDirectorAppointmentDB Finally Block="
							+ Arrays.toString(e.getStackTrace()));
				}
			}

		}

	}

}
