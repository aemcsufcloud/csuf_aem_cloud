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

@Component(property = { "service.description=State University Grant Appeal DB Save", "service.vendor=ThoughtFocus",
		"process.label=StateUniversityGrantAppealDB" })
public class StateUniversityGrantAppealDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(StateUniversityGrantAppealDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_STATE_UNIV_GRANT_APPEAL";
		String formName = "State University Grant Appeal Form";
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
								cwid = eElement.getElementsByTagName("cwid").item(0).getTextContent();
								caseid = eElement.getElementsByTagName("caseId").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", caseid);

								dataMap.put("STUDENT_NAME",
										eElement.getElementsByTagName("StudentName").item(0).getTextContent());
								dataMap.put("FINANCIAL_AID_YEAR",
										eElement.getElementsByTagName("financialAidYear").item(0).getTextContent());
								String initiatedDate = eElement.getElementsByTagName("Date_1").item(0).getTextContent();
								Object initiatedDateObj = "";
								if (initiatedDate != null && initiatedDate != "") {
									Date initiatedDateNew = Date.valueOf(initiatedDate);
									initiatedDateObj = initiatedDateNew;
								}
								dataMap.put("INITIATED_DATE", initiatedDateObj);

								dataMap.put("ADDRESS",
										eElement.getElementsByTagName("Address").item(0).getTextContent());
								dataMap.put("TELEPHONE_NUMBER",
										eElement.getElementsByTagName("TelephonNumber").item(0).getTextContent());
								dataMap.put("CITY", eElement.getElementsByTagName("City").item(0).getTextContent());
								dataMap.put("STATE", eElement.getElementsByTagName("State").item(0).getTextContent());
								dataMap.put("ZIP", eElement.getElementsByTagName("Zip").item(0).getTextContent());
								dataMap.put("CURRENT_MAJOR",
										eElement.getElementsByTagName("CurrentMajor").item(0).getTextContent());
								dataMap.put("SEMESTER_ENTERED_CSUF",
										eElement.getElementsByTagName("EnteredSemester").item(0).getTextContent());
								dataMap.put("DEGREE_OBJECTIVE",
										eElement.getElementsByTagName("DegreeObjective").item(0).getTextContent());

								String graduationDate = eElement.getElementsByTagName("AnticipatedGraduationDate")
										.item(0).getTextContent();
								Object graduationDateObj = "";
								if (graduationDate != null && graduationDate != "") {
									Date graduationDateNew = Date.valueOf(graduationDate);
									graduationDateObj = graduationDateNew;
								}
								dataMap.put("ANTICIPATED_GRADUATION_DATE", graduationDateObj);

							/*	String eopStudentCheck = eElement.getElementsByTagName("EOPStudent").item(0)
										.getTextContent();
								String eopStudent = "";
								if (eopStudentCheck.equals("0")) {
									eopStudent = "Yes";
								} else if (eopStudentCheck.equals("1")) {
									eopStudent = "No";
								}
								dataMap.put("EOP_STUDENT", eopStudent);*/
								dataMap.put("EOP_COUNSELOR_NAME",
										eElement.getElementsByTagName("EOPCounselorName").item(0).getTextContent());
								dataMap.put("EOP_USERID",
										eElement.getElementsByTagName("EOPUserID").item(0).getTextContent());
								dataMap.put("EOP_EMAIL",
										eElement.getElementsByTagName("EOPEmail").item(0).getTextContent());
								dataMap.put("EOP_EMPLID",
										eElement.getElementsByTagName("EOPEmpID").item(0).getTextContent());
								
								dataMap.put("SUMMER_UNITS",
										eElement.getElementsByTagName("Summer2022Units").item(0).getTextContent());
								dataMap.put("FALL_UNITS",
										eElement.getElementsByTagName("Fall2022Units").item(0).getTextContent());
								dataMap.put("SPRING_UNITS",
										eElement.getElementsByTagName("Spring2023Units").item(0).getTextContent());

								dataMap.put("STUDENT_SIGNATURE",
										eElement.getElementsByTagName("studentSignature").item(0).getTextContent());
								String studentSignDate = eElement.getElementsByTagName("studentSignDate").item(0)
										.getTextContent();
								Object studentSignDateObj = "";
								if (studentSignDate != null && studentSignDate != "") {
									Date studentSignDateNew = Date.valueOf(studentSignDate);
									studentSignDateObj = studentSignDateNew;
								}
								dataMap.put("STUDENT_SIGN_DATE", studentSignDateObj);

								dataMap.put("EOP_COUNSELOR_SIGNATURE", eElement
										.getElementsByTagName("EOPCounselorSignature").item(0).getTextContent());
								String eopSignDate = eElement.getElementsByTagName("EOPSignDate").item(0)
										.getTextContent();
								Object eopSignDateObj = "";
								if (eopSignDate != null && eopSignDate != "") {
									Date eopSignDateNew = Date.valueOf(eopSignDate);
									eopSignDateObj = eopSignDateNew;
								}
								dataMap.put("EOP_COUNSELOR_SIGN_DATE", eopSignDateObj);
								dataMap.put("EOP_COUNSELOR_COMMENTS",
										eElement.getElementsByTagName("EOPCounselorComments").item(0).getTextContent());

								dataMap.put("FINANCIAL_AID_SIGNATURE",
										eElement.getElementsByTagName("staffSignature").item(0).getTextContent());
								String approverSignDate = eElement.getElementsByTagName("staffSignDate").item(0)
										.getTextContent();
								Object approverSignDateObj = "";
								if (approverSignDate != null && approverSignDate != "") {
									Date approverSignDateNew = Date.valueOf(approverSignDate);
									approverSignDateObj = approverSignDateNew;
								}
								dataMap.put("FINANCIAL_AID_SIGN_DATE", approverSignDateObj);
								dataMap.put("FINANCIAL_AID_COMMENTS",
										eElement.getElementsByTagName("staffComment").item(0).getTextContent());

								String finanicialAidChoice = eElement.getElementsByTagName("staffDecision").item(0)
										.getTextContent();
								String finanicialAidDecision = "";
								if (finanicialAidChoice.equals("1")) {
									finanicialAidDecision = "Approved";
								} else if (finanicialAidChoice.equals("2")) {
									finanicialAidDecision = "Denied";
								}

								dataMap.put("FINANCIAL_AID_DECISION", finanicialAidDecision);

								dataMap.put("STUDENT_FIRST_NAME",
										eElement.getElementsByTagName("firstName").item(0).getTextContent());
								dataMap.put("STUDENT_LAST_NAME",
										eElement.getElementsByTagName("lastName").item(0).getTextContent());
								dataMap.put("STUDENT_EMAIL",
										eElement.getElementsByTagName("StudentEmail").item(0).getTextContent());

								dataMap.put("IP_ADDRESS",
										eElement.getElementsByTagName("ipAddress").item(0).getTextContent());
								dataMap.put("FORM_CODE",
										eElement.getElementsByTagName("formCode").item(0).getTextContent());
								
								dataMap.put("YES_CB",
										eElement.getElementsByTagName("YesCB").item(0).getTextContent());
								dataMap.put("NO_CB",
										eElement.getElementsByTagName("NoCB").item(0).getTextContent());
								
								log.debug("DataMap values :{}", dataMap);

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
						log.debug("IOException in State University Grant Appeal Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in State University Grant Appeal Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}

}
