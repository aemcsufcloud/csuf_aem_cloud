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

@Component(property = { "service.description=Drone Flight Request DB Save", "service.vendor=ThoughtFocus",
		"process.label=TDAExceptionFormUGDB" })
public class TDAExceptionFormUGDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(TDAExceptionFormUGDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_TDA_EXCEPTION_UG";
		String formName = "TDA Exception Form (Undergraduate)";
		String cwid = "";
		String requestID = "";
		String assignee = "";
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
								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								requestID = eElement.getElementsByTagName("RequestID").item(0).getTextContent();
								dataMap.put("REQUEST_ID", requestID);
								dataMap.put("STUDENT_NAME",
										eElement.getElementsByTagName("StudentName").item(0).getTextContent());
								dataMap.put("ACADEMIC_PLAN",
										eElement.getElementsByTagName("AcademicPlan").item(0).getTextContent());
								dataMap.put("CATALOG_YEAR",
										eElement.getElementsByTagName("CatalogYear").item(0).getTextContent());
								dataMap.put("EXPECTED_GRADUATION_TERM",
										eElement.getElementsByTagName("Term").item(0).getTextContent());
								dataMap.put("EXCEPTION_TYPE",
										eElement.getElementsByTagName("ExceptionType").item(0).getTextContent());
								dataMap.put("EXCEPTION_PROCESS_TYPE",
										eElement.getElementsByTagName("ExceptionProcessType").item(0).getTextContent());
								
								dataMap.put("DATA", dataXML);

								dataMap.put("INITIATOR_SIGNATURE",
										eElement.getElementsByTagName("InitiatorSignature").item(0).getTextContent());
								String initiatorSignDate = eElement.getElementsByTagName("InitiatorDate").item(0)
										.getTextContent();
								Object initiatorSignDateObj = "";
								if (initiatorSignDate != null && initiatorSignDate != "") {
									Date initiatorSignDateNew = Date.valueOf(initiatorSignDate);
									initiatorSignDateObj = initiatorSignDateNew;
								}
								dataMap.put("INITIATOR_SIGN_DATE", initiatorSignDateObj);
								dataMap.put("INITIATOR_ASSOCIATED_DEPT",
										eElement.getElementsByTagName("InitiatorDept").item(0).getTextContent());
								dataMap.put("INITIATOR_COMMENTS",
										eElement.getElementsByTagName("InitiatorComments").item(0).getTextContent());

								dataMap.put("GRAD_REVIEWER_SIGNATURE",
										eElement.getElementsByTagName("OfficeGradSignature").item(0).getTextContent());
								String gradReviewerSignDate = eElement.getElementsByTagName("OfficeGradSignDate").item(0)
										.getTextContent();
								Object gradReviewerSignDateObj = "";
								if (gradReviewerSignDate != null && gradReviewerSignDate != "") {
									Date gradReviewerSignDateNew = Date.valueOf(gradReviewerSignDate);
									gradReviewerSignDateObj = gradReviewerSignDateNew;
								}
								dataMap.put("GRAD_REVIEWER_SIGN_DATE", gradReviewerSignDateObj);
								dataMap.put("GRAD_REVIEWER_COMMENTS",
										eElement.getElementsByTagName("OfficeGradComment").item(0).getTextContent());

								dataMap.put("ATCE_REVIEWER_SIGNATURE",
										eElement.getElementsByTagName("ATCESignature").item(0).getTextContent());
								String atceSignDate = eElement.getElementsByTagName("ATCESignDate").item(0)
										.getTextContent();
								Object atceSignDateObj = "";
								if (atceSignDate != null && atceSignDate != "") {
									Date atceSignDateNew = Date.valueOf(atceSignDate);
									atceSignDateObj = atceSignDateNew;
								}
								dataMap.put("ATCE_REVIEWER_SIGN_DATE", atceSignDateObj);
								dataMap.put("ATCE_REVIEWER_DECISION",
										eElement.getElementsByTagName("ATCEDecision").item(0).getTextContent());
								dataMap.put("ATCE_REVIEWER_COMMENTS",
										eElement.getElementsByTagName("ATCEComment").item(0).getTextContent());

								dataMap.put("TDA_REVIEWER_SIGNATURE",
										eElement.getElementsByTagName("TDASignature").item(0).getTextContent());
								String cpSignDate = eElement.getElementsByTagName("TDASignDate").item(0)
										.getTextContent();
								Object cpSignDateObj = "";
								if (cpSignDate != null && cpSignDate != "") {
									Date cpSignDateNew = Date.valueOf(cpSignDate);
									cpSignDateObj = cpSignDateNew;
								}
								dataMap.put("TDA_REVIEWER_SIGN_DATE", cpSignDateObj);
								dataMap.put("TDA_REVIEWER_DECISION",
										eElement.getElementsByTagName("TDADecision").item(0).getTextContent());
								dataMap.put("TDA_REVIEWER_COMMENTS",
										eElement.getElementsByTagName("TDAComment").item(0).getTextContent());
								
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
								dataMap.put("DEAN_COMMENTS",
										eElement.getElementsByTagName("DeanComment").item(0).getTextContent());

								dataMap.put("INITIATOR_USERID",
										eElement.getElementsByTagName("FacultyUserID").item(0).getTextContent());
								dataMap.put("INITIATOR_EMPLID",
										eElement.getElementsByTagName("FacultyEmplID").item(0).getTextContent());
								dataMap.put("INITIATOR_NAME",
										eElement.getElementsByTagName("FacultyName").item(0).getTextContent());
								dataMap.put("INITIATOR_EMAIL",
										eElement.getElementsByTagName("FacultyEmail").item(0).getTextContent());
								dataMap.put("INITIATOR_DEPTID",
										eElement.getElementsByTagName("FacultyDeptID").item(0).getTextContent());
								
								dataMap.put("DEAN_USERID",
										eElement.getElementsByTagName("DeanUserID").item(0).getTextContent());
								dataMap.put("DEAN_NAME",
										eElement.getElementsByTagName("DeanName").item(0).getTextContent());
								dataMap.put("DEAN_EMAIL",
										eElement.getElementsByTagName("DeanEmailID").item(0).getTextContent());

								dataMap.put("EXCEPTION_FLAG",
										eElement.getElementsByTagName("ExceptionFlag").item(0).getTextContent());
								dataMap.put("DOR_EXCEPTION_FLAG",
										eElement.getElementsByTagName("DORExceptionFlag").item(0).getTextContent());

								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());

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
						log.debug("IOException in TDAExceptionFormUGDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in TDAExceptionFormUGDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}
		}
	}
}
