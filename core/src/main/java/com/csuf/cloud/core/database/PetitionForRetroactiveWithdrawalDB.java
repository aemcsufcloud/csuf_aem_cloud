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

@Component(property = { "service.description=Petition For Retroactive Withdrawal DB Save",
		"service.vendor=ThoughtFocus", "process.label=PetitionForRetroactiveWithdrawalDB" })
public class PetitionForRetroactiveWithdrawalDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(PetitionForRetroactiveWithdrawalDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_RETROACTIVE_WITHDRAWAL";
		String childTableName = "AEM_RAW_INFO";
		String formName = "Petition for Retroactive Withdrawal";
		String assignee = "";
		String cwid = "";
		String caseId = "";
		String splitFlag = "";
		boolean dependentDetailsCalled = false;
		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

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
								cwid = eElement.getElementsByTagName("CampusID").item(0).getTextContent();
								caseId = eElement.getElementsByTagName("caseId").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", caseId);
								dataMap.put("FNAME",
										eElement.getElementsByTagName("StudentFirstName").item(0).getTextContent());
								dataMap.put("LNAME",
										eElement.getElementsByTagName("StudentLastName").item(0).getTextContent());
								String withdrawalType = "";
								String withdrawalTypeMN = XMLUtils.getChildNodeContent(eElement, "withdrawalType");
								if (withdrawalTypeMN.equals("1")) {
									withdrawalType = "Medical";
								} else {
									withdrawalType = "Non-Medical";
								}
								dataMap.put("WITHDRAWAL_TYPE", withdrawalType);
								String dqType = "";
								String dqtypeval = "";
								dqtypeval = XMLUtils.getChildNodeContent(eElement, "DQType");
								if (dqtypeval.equals("N")) {
									dqType = "No";
								} else {
									dqType = "Yes";
								}
								dataMap.put("DQ_TYPE", dqType);
								String gradType = "";
								String graduationType = "";
								gradType = XMLUtils.getChildNodeContent(eElement, "GraduationType");
								if (gradType.equals("U")) {
									graduationType = "Under-Graduate";
								} else {
									graduationType = "Graduate";
								}
								dataMap.put("GRADUATION_TYPE", graduationType);
								String initiatedDate = eElement.getElementsByTagName("B_Date").item(0).getTextContent();
								Object initiatedDateObj = "";
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatedDate);
									initiatedDateObj = initiatedDateNew;
								}
								dataMap.put("INITIATED_DATE", initiatedDateObj);
								dataMap.put("SEMESTER_YEAR",
										eElement.getElementsByTagName("SemYear").item(0).getTextContent());

								String studentSignDate = eElement.getElementsByTagName("StudentSignDate").item(0)
										.getTextContent();
								Object studentSignDateObj = "";
								if (studentSignDate != null && studentSignDate != "") {
									Date studentSignDateNew = Date.valueOf(studentSignDate);
									studentSignDateObj = studentSignDateNew;
								}
								dataMap.put("STUDENT_SIGNATURE_DATE", studentSignDateObj);
								dataMap.put("W_UNITS_USED",
										eElement.getElementsByTagName("WUnitUsed").item(0).getTextContent());
								dataMap.put("W_UNITS_LEFT",
										eElement.getElementsByTagName("WUnitsLeft").item(0).getTextContent());

								dataMap.put("PETITION_INITIAL_SIGNATURE", eElement
										.getElementsByTagName("PetitionCoordinatorInSignature").item(0).getTextContent());
								String petitionInitialSignDate = eElement
										.getElementsByTagName("PetitionCoordinatorInSignDate").item(0)
										.getTextContent();
								Object petitionInitialSignDateObj = "";
								if (petitionInitialSignDate != null && petitionInitialSignDate != "") {
									Date petitionInitialSignDateNew = Date.valueOf(petitionInitialSignDate);
									petitionInitialSignDateObj = petitionInitialSignDateNew;
								}
								dataMap.put("PETITION_INITIAL_SIGN_DATE", petitionInitialSignDateObj);
								dataMap.put("PETITION_INITIAL_COMMENTS", eElement
										.getElementsByTagName("PetitionCoordinatorInComments").item(0).getTextContent());
								
								dataMap.put("MEDICAL_SIGNATURE", eElement
										.getElementsByTagName("MedicalCommitteeSignature").item(0).getTextContent());
								String medicalCommitteeSignDate = eElement
										.getElementsByTagName("MedicalCommitteeSignatureDate").item(0).getTextContent();
								Object medicalCommitteeSignDateObj = "";
								if (medicalCommitteeSignDate != null && medicalCommitteeSignDate != "") {
									Date medicalCommitteeSignDateNew = Date.valueOf(medicalCommitteeSignDate);
									medicalCommitteeSignDateObj = medicalCommitteeSignDateNew;
								}
								dataMap.put("MEDICAL_SIGNATURE_DATE", medicalCommitteeSignDateObj);
								dataMap.put("MEDICAL_COMMENTS", eElement
										.getElementsByTagName("MedicalCommitteeComments").item(0).getTextContent());

								dataMap.put("PETITION_CO_SIGNATURE", eElement
										.getElementsByTagName("PetitionCoordinatorSignature").item(0).getTextContent());
								String petitionCoordinatorSignDate = eElement
										.getElementsByTagName("PetitionCoordinatorSignatureDate").item(0)
										.getTextContent();
								Object petitionCoordinatorSignDateObj = "";
								if (petitionCoordinatorSignDate != null && petitionCoordinatorSignDate != "") {
									Date petitionCoordinatorSignDateNew = Date.valueOf(petitionCoordinatorSignDate);
									petitionCoordinatorSignDateObj = petitionCoordinatorSignDateNew;
								}
								dataMap.put("PETITION_CO_SIGNATURE_DATE", petitionCoordinatorSignDateObj);
								dataMap.put("PETITION_CO_COMMENTS", eElement
										.getElementsByTagName("PetitionCoordinatorComments").item(0).getTextContent());
								dataMap.put("RECORDS_SIGNATURE",
										eElement.getElementsByTagName("RecordsSignature").item(0).getTextContent());
								String recordsSignDate = eElement.getElementsByTagName("RecordsSignatureDate").item(0)
										.getTextContent();
								Object recordsSignDateObj = "";
								if (recordsSignDate != null && recordsSignDate != "") {
									Date recordsSignDateNew = Date.valueOf(recordsSignDate);
									recordsSignDateObj = recordsSignDateNew;
								}
								dataMap.put("RECORDS_SIGNATURE_DATE", recordsSignDateObj);
								dataMap.put("RECORDS_COMMENTS",
										eElement.getElementsByTagName("RecordsComments").item(0).getTextContent());
								dataMap.put("DATA_XML", dataXML);
								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());

								dataMap.put("INITIAL_1",
										eElement.getElementsByTagName("Initial1").item(0).getTextContent());
								dataMap.put("INITIAL_2",
										eElement.getElementsByTagName("Initial2").item(0).getTextContent());
								dataMap.put("INITIAL_3",
										eElement.getElementsByTagName("Initial3").item(0).getTextContent());
								dataMap.put("ADDRESS",
										eElement.getElementsByTagName("Address").item(0).getTextContent());
								dataMap.put("PHONE", eElement.getElementsByTagName("Phone").item(0).getTextContent());
								dataMap.put("CITY", eElement.getElementsByTagName("City").item(0).getTextContent());
								dataMap.put("STATE", eElement.getElementsByTagName("State").item(0).getTextContent());
								dataMap.put("ZIPCODE",
										eElement.getElementsByTagName("ZipCode").item(0).getTextContent());
								dataMap.put("EMAIL", eElement.getElementsByTagName("Email").item(0).getTextContent());
								String comDecision = "";
								String committeeDecision = eElement.getElementsByTagName("CommitteeDecision").item(0)
										.getTextContent();
								if (committeeDecision.equals("1")) {
									comDecision = "Your petition is “Granted”. This granted petition does not release any financial obligations";
								} else if (committeeDecision.equals("2")) {
									comDecision = "No action has been taken on your petition";
								} else if (committeeDecision.equals("3")) {
									comDecision = "Your petition is Denied";
								}
								dataMap.put("COMMITTEE_DECISION", comDecision);
								dataMap.put("STATEMENT_1",
										eElement.getElementsByTagName("Statement_1").item(0).getTextContent());
								dataMap.put("STATEMENT_3",
										eElement.getElementsByTagName("Statement_3").item(0).getTextContent());
								String statYesNo = eElement.getElementsByTagName("Statement_4_Yes_or_No").item(0)
										.getTextContent();
								String statement4YN = "";
								if (statYesNo.equals("1")) {
									statement4YN = "Yes";
								} else if (statYesNo.equals("2")) {
									statement4YN = "No";
								}
								dataMap.put("STATEMENT_YN4", statement4YN);
								dataMap.put("STATEMENT_4",
										eElement.getElementsByTagName("Statement_4").item(0).getTextContent());
								String statYesNo5 = eElement.getElementsByTagName("Statement_5_Yes_or_No").item(0)
										.getTextContent();
								String statement5YN = "";
								if (statYesNo5.equals("1")) {
									statement5YN = "Yes";
								} else if (statYesNo5.equals("2")) {
									statement5YN = "No";
								}
								dataMap.put("STATEMENT_YN5", statement5YN);
								dataMap.put("STATEMENT_5",
										eElement.getElementsByTagName("Statement_5").item(0).getTextContent());

								dataMap.put("STUDENT_SIGN",
										eElement.getElementsByTagName("StudentSignature").item(0).getTextContent());


								String avpDec = eElement.getElementsByTagName("AVPStudiesDecision").item(0)
										.getTextContent();
								String avpDecision = "";
								if (avpDec.equals("1")) {
									avpDecision = "Approve";
								} else if (avpDec.equals("2")) {
									avpDecision = "Deny";
								} else if (avpDec.equals("3")) {
									avpDecision = "No Action Taken";
								}
								dataMap.put("AVP_DECISION", avpDecision);
							
								String recordDec = eElement.getElementsByTagName("RecordsDecision").item(0).getTextContent();
								String recordDecision = "";
								if (recordDec.equals("1")) {
									recordDecision = "Approve";
								} else if (recordDec.equals("2")) {
									recordDecision = "Deny";
								} else if (recordDec.equals("3")) {
									recordDecision = "No Action Required";
								}
								dataMap.put("RECORD_DECISION", recordDecision);
								dataMap.put("TERM_CODE",
										eElement.getElementsByTagName("TermCode").item(0).getTextContent());

								String avpSignatureDate = eElement.getElementsByTagName("AVPSignatureDate").item(0)
										.getTextContent();
								Object avpSignatureDateObj = "";
								if (avpSignatureDate != null && avpSignatureDate != "") {
									Date avpSignatureDateNew = Date.valueOf(avpSignatureDate);
									avpSignatureDateObj = avpSignatureDateNew;
								}
								dataMap.put("AVP_SIGNATURE_DATE", avpSignatureDateObj);
								dataMap.put("AVP_COMMENTS",
										eElement.getElementsByTagName("AVPComments").item(0).getTextContent());
								dataMap.put("AVP_SIGNATURE",
										eElement.getElementsByTagName("AVPSignature").item(0).getTextContent());
								splitFlag = eElement.getElementsByTagName("splitFlag").item(0).getTextContent();
								dataMap.put("SPLIT_FLAG", splitFlag);
								
								String recordStaffRB = "";
								String recordStaff = eElement.getElementsByTagName("RecordsStaffRB").item(0).getTextContent();
								if (recordStaff.equals("1")) {
									recordStaffRB = "$20 petition fee billed";
								} else if (recordStaff.equals("2")) {
									recordStaffRB = "$20 petition fee waived";
								}
								dataMap.put("RECORDS_STAFF_RB", recordStaffRB);
								
								String petRecommend = "";
								String PetRecommendationRB = eElement.getElementsByTagName("PetRecommendationRB").item(0)
										.getTextContent();
								if (PetRecommendationRB.equals("1")) {
									petRecommend = "Recommended for petition review";
								} else if (PetRecommendationRB.equals("2")) {
									petRecommend = "Cancelled Due to Insufficient Documentation";
								} else if (PetRecommendationRB.equals("3")) {
									petRecommend = "No Petition Required";
								}
								dataMap.put("PET_RECOMMEND", petRecommend);
								
								String medicalCon = "";
								String medicalCondition = eElement.getElementsByTagName("MedicalCondition").item(0).getTextContent();
								if (medicalCondition.equals("1")) {
									medicalCon = "Student";
								} else if (medicalCondition.equals("2")) {
									medicalCon = "Other";
								}
								dataMap.put("MEDICAL_CONDITION", medicalCon);
								
								String medicalRecommend = "";
								String medicalReviewRB = eElement.getElementsByTagName("MedicalReviewRB").item(0).getTextContent();
								if (medicalReviewRB.equals("1")) {
									medicalRecommend = "The documentation is sufficient to substantiate the petition.";
								} else if (medicalReviewRB.equals("2")) {
									medicalRecommend = "The documentation is not sufficient to substantiate the petition.";
								}
								dataMap.put("MEDICAL_RECOMMEND", medicalRecommend);
								
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

								try {
									if (dataMap.get("SPLIT_FLAG").equals("Yes")) {
										dependentDetails(formName, nList, childTableName, caseId, workflowInstanceID,
												cwid, conn, eElement, dataXML, saveHistoryBackRoute, assignee);
										dependentDetailsCalled = true;
										log.debug("dependentDetails executed successfully.");
									}
								} catch (Exception e) {
									log.error("Error occurred while executing dependentDetails: {}", e.getMessage(), e);
								}				

								dataMap.put("LAST_STEP", saveHistoryBackRoute);
								if ((dataMap.get("LAST_STEP").equals("Records Review"))
										|| (dataMap.get("LAST_STEP")
												.equals("Send Email to Student as need information"))
										|| (dataMap.get("LAST_STEP")
												.equals("Send Email to Student as No Petition Required"))) {
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
				log.debug("dependentDetailsCalled : {}", dependentDetailsCalled);
				/*if (!dependentDetailsCalled && conn != null) {
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

				if (!dependentDetailsCalled) {
					try {
						CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "CWID", workflowInstanceID, dataMap,
								"INITIATED_DATE,STUDENT_SIGNATURE_DATE,PETITION_INITIAL_SIGN_DATE,MEDICAL_SIGNATURE_DATE,PETITION_CO_SIGNATURE_DATE,RECORDS_SIGNATURE_DATE,AVP_SIGNATURE_DATE");
					} catch (IOException ioException) {
						ioException.printStackTrace();
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
						log.debug("IOException in PetitionForRetroactiveWithdrawalDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				/*if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in PetitionForRetroactiveWithdrawalDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}*/
			}

		}

	}

	public void dependentDetails(String formName, NodeList nList, String childTableName, String caseId,
			String workflowInstanceID, String cwid, Connection conn, Element eElement, String dataXML,
			String saveHistoryBackRoute, String assignee) {
		log.info("Inside child member table");
		DatabaseUtils dbUtil = new DatabaseUtils();
		LinkedHashMap<String, Object> memberDataMapInfo = null;
		memberDataMapInfo = new LinkedHashMap<String, Object>();

		memberDataMapInfo.put("CASEID", caseId);
		memberDataMapInfo.put("CWID", cwid);
		memberDataMapInfo.put("FORM_NAME", formName);
		memberDataMapInfo.put("DEAN_SIGNATURE",
				eElement.getElementsByTagName("AssociateDeanSignature").item(0).getTextContent());
		String deanSignDate = eElement.getElementsByTagName("AssociateDeanSignatureDate").item(0).getTextContent();
		Object deanSignDateObj = "";
		if (deanSignDate != null && deanSignDate != "") {
			Date deanSignDateNew = Date.valueOf(deanSignDate);
			deanSignDateObj = deanSignDateNew;
		}
		memberDataMapInfo.put("DEAN_SIGNATURE_DATE", deanSignDateObj);
		memberDataMapInfo.put("DEAN_COMMENTS",
				eElement.getElementsByTagName("AssociateDeanComments").item(0).getTextContent());

		memberDataMapInfo.put("GRADUATE_STUDIES_SIGNATURE",
				eElement.getElementsByTagName("GraduateStudiesSignature").item(0).getTextContent());
		String graduateStudiesSignDate = eElement.getElementsByTagName("GraduateStudiesSignatureDate").item(0)
				.getTextContent();
		Object graduateStudiesSignDateObj = "";
		if (graduateStudiesSignDate != null && graduateStudiesSignDate != "") {
			Date graduateStudiesSignDateNew = Date.valueOf(graduateStudiesSignDate);
			graduateStudiesSignDateObj = graduateStudiesSignDateNew;
		}
		memberDataMapInfo.put("GRADUATE_STUDIES_SIGN_DATE", graduateStudiesSignDateObj);
		memberDataMapInfo.put("GRADUATE_STUDIES_COMMENTS",
				eElement.getElementsByTagName("GraduateStudiesComments").item(0).getTextContent());
		memberDataMapInfo.put("PETITION_CO_SIGNATURE",
				eElement.getElementsByTagName("PetitionCoordinatorSignature").item(0).getTextContent());
		String petitionCoordinatorSignDate = eElement.getElementsByTagName("PetitionCoordinatorSignatureDate").item(0)
				.getTextContent();
		Object petitionCoordinatorSignDateObj = "";
		if (petitionCoordinatorSignDate != null && petitionCoordinatorSignDate != "") {
			Date petitionCoordinatorSignDateNew = Date.valueOf(petitionCoordinatorSignDate);
			petitionCoordinatorSignDateObj = petitionCoordinatorSignDateNew;
		}
		memberDataMapInfo.put("PETITION_CO_SIGNATURE_DATE", petitionCoordinatorSignDateObj);
		memberDataMapInfo.put("PETITION_CO_COMMENTS",
				eElement.getElementsByTagName("PetitionCoordinatorComments").item(0).getTextContent());
		memberDataMapInfo.put("RECORDS_SIGNATURE",
				eElement.getElementsByTagName("RecordsSignature").item(0).getTextContent());
		String recordsSignDate = eElement.getElementsByTagName("RecordsSignatureDate").item(0).getTextContent();
		Object recordsSignDateObj = "";
		if (recordsSignDate != null && recordsSignDate != "") {
			Date recordsSignDateNew = Date.valueOf(recordsSignDate);
			recordsSignDateObj = recordsSignDateNew;
		}
		memberDataMapInfo.put("RECORDS_SIGNATURE_DATE", recordsSignDateObj);
		memberDataMapInfo.put("RECORDS_COMMENTS",
				eElement.getElementsByTagName("RecordsComments").item(0).getTextContent());
		memberDataMapInfo.put("DATA_XML", dataXML);

		String assocDeanDec = eElement.getElementsByTagName("AssociateDeanDecision").item(0).getTextContent();
		String deanDec = "";
		if (assocDeanDec.equals("1")) {
			deanDec = "Approve";
		} else if (assocDeanDec.equals("2")) {
			deanDec = "Deny";
		} else if (assocDeanDec.equals("3")) {
			deanDec = "Abstain";
		}	
		memberDataMapInfo.put("ASSOCIATE_DEAN_DEC", deanDec);
		String gradDec = eElement.getElementsByTagName("GraduateStudeisDecision").item(0).getTextContent();
		String gradDecision = "";
		if (gradDec.equals("1")) {
			gradDecision = "Approve";
		} else if (gradDec.equals("2")) {
			gradDecision = "Deny";
		} else if (gradDec.equals("3")) {
			gradDecision = "Abstain";
		}
		memberDataMapInfo.put("GRAD_DECISION", gradDecision);
		String avpDec = eElement.getElementsByTagName("AVPStudiesDecision").item(0).getTextContent();
		String avpDecision = "";
		if (avpDec.equals("1")) {
			avpDecision = "Approve";
		} else if (avpDec.equals("2")) {
			avpDecision = "Deny";
		}else if (avpDec.equals("3")) {
			avpDecision = "No Action Taken";
		}
		memberDataMapInfo.put("AVP_DECISION", avpDecision);

		String recordDec = eElement.getElementsByTagName("RecordsDecision").item(0).getTextContent();
		String recordDecision = "";
		if (recordDec.equals("1")) {
			recordDecision = "Approve";
		} else if (recordDec.equals("2")) {
			recordDecision = "Deny";
		} else if (recordDec.equals("3")) {
			recordDecision = "No Action Required";
		}
		memberDataMapInfo.put("RECORD_DECISION", recordDecision);

		memberDataMapInfo.put("AVP_SIGNATURE", eElement.getElementsByTagName("AVPSignature").item(0).getTextContent());
		String avpSignatureDate = eElement.getElementsByTagName("AVPSignatureDate").item(0).getTextContent();
		Object avpSignatureDateObj = "";
		if (avpSignatureDate != null && avpSignatureDate != "") {
			Date avpSignatureDateNew = Date.valueOf(avpSignatureDate);
			avpSignatureDateObj = avpSignatureDateNew;
		}
		memberDataMapInfo.put("AVP_SIGNATURE_DATE", avpSignatureDateObj);
		memberDataMapInfo.put("AVP_COMMENTS", eElement.getElementsByTagName("AVPComments").item(0).getTextContent());
		memberDataMapInfo.put("DEAN_NAME", eElement.getElementsByTagName("AssociateDeanName").item(0).getTextContent());
		memberDataMapInfo.put("DEAN_USERID",
				eElement.getElementsByTagName("AssociateDeanUserId").item(0).getTextContent());
		memberDataMapInfo.put("DEAN_EMAIL",
				eElement.getElementsByTagName("AssociateDeanEmailId").item(0).getTextContent());
		memberDataMapInfo.put("DEPT_COURSE_NUMBER",
				eElement.getElementsByTagName("DeptCourseNo").item(0).getTextContent());
		memberDataMapInfo.put("SCHEDULE_NUMBER", eElement.getElementsByTagName("ScheduleNo").item(0).getTextContent());
		String dateParticipDate = eElement.getElementsByTagName("DateParticipation").item(0).getTextContent();
		Object dateParticipDateDateObj = "";
		if (dateParticipDate != null && dateParticipDate != "") {
			Date dateParticipDateNew = Date.valueOf(dateParticipDate);
			dateParticipDateDateObj = dateParticipDateNew;
		}
		memberDataMapInfo.put("DATE_PARTICIPATION", dateParticipDateDateObj);
		memberDataMapInfo.put("WORKFLOW_ID", eElement.getElementsByTagName("workflow_ID").item(0).getTextContent());
		memberDataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

		memberDataMapInfo.put("STAGE_INDICATOR",
				eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
		memberDataMapInfo.put("LAST_STEP", saveHistoryBackRoute);
		if (memberDataMapInfo.get("LAST_STEP").equals("Records Review")) {
			memberDataMapInfo.put("WORKFLOW_STATUS", "COMPLETED");
		} else {
			memberDataMapInfo.put("WORKFLOW_STATUS", "RUNNING");
		}
		memberDataMapInfo.put("LAST_STEP_ASSIGNEE", assignee);
		String recordStaffRB = "";
		String recordStaff = eElement.getElementsByTagName("RecordsStaffRB").item(0).getTextContent();
		if (recordStaff.equals("1")) {
			recordStaffRB = "$20 petition fee billed";
		} else if (recordStaff.equals("2")) {
			recordStaffRB = "$20 petition fee waived";
		}
		memberDataMapInfo.put("RECORDS_STAFF_RB", recordStaffRB);
		
		String comDecision = "";
		String committeeDecision = eElement.getElementsByTagName("CommitteeDecision").item(0)
				.getTextContent();
		if (committeeDecision.equals("1")) {
			comDecision = "Your petition is “Granted”. This granted petition does not release any financial obligations";
		} else if (committeeDecision.equals("2")) {
			comDecision = "No action has been taken on your petition";
		} else if (committeeDecision.equals("3")) {
			comDecision = "Your petition is Denied";
		}
		memberDataMapInfo.put("COMMITTEE_DECISION", comDecision);
		
		String petRecommend = "";
		String PetRecommendationRB = eElement.getElementsByTagName("PetRecommendationRB").item(0)
				.getTextContent();
		if (PetRecommendationRB.equals("1")) {
			petRecommend = "Recommended for petition review";
		} else if (PetRecommendationRB.equals("2")) {
			petRecommend = "Cancelled Due to Insufficient Documentation";
		} else if (PetRecommendationRB.equals("3")) {
			petRecommend = "No Petition Required";
		}
		memberDataMapInfo.put("PET_RECOMMEND", petRecommend);
		
		/*if (conn != null) {
			log.error("Connection Successfull");
			String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, childTableName);
			log.debug("ResultData : {}", resultData);
			if (resultData != null && !resultData.equals("")) {
				dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, childTableName);
				dbUtil.insertFormData(conn, memberDataMapInfo, childTableName, formName);
			} else {
				dbUtil.insertFormData(conn, memberDataMapInfo, childTableName, formName);
			}
		}*/
		try {
			CloudDbSaveUtil.saveFormData(childTableName, formName, "", "", workflowInstanceID, memberDataMapInfo, "");
		} catch (IOException ioException) {
			ioException.printStackTrace();
		}
	}

}
