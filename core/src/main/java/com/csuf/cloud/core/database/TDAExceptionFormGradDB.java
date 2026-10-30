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
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=TDA Exception Form Grad DB Save", "service.vendor=ThoughtFocus",
		"process.label=TDAExceptionFormGradDB" })
public class TDAExceptionFormGradDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(TDAExceptionFormGradDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_TDA_EXCEPTION_GRAD";
		String formName = "TDA Exception Form (Graduate)";
		String cwid = "";
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
								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("REQUEST_ID",
										eElement.getElementsByTagName("RequestID").item(0).getTextContent());
								dataMap.put("STUDENT_NAME",
										eElement.getElementsByTagName("StudentName").item(0).getTextContent());
								dataMap.put("ACADEMIC_PLAN",
										eElement.getElementsByTagName("AcademicPlan").item(0).getTextContent());
								dataMap.put("CATALOG_YEAR",
										eElement.getElementsByTagName("CatalogYear").item(0).getTextContent());
								dataMap.put("EXPECTED_GRADUATION_TERM",
										eElement.getElementsByTagName("Term").item(0).getTextContent());
								dataMap.put("STATUS", eElement.getElementsByTagName("Status").item(0).getTextContent());
								dataMap.put("NOTES", eElement.getElementsByTagName("Notes").item(0).getTextContent());

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
								dataMap.put("INITIATOR_COMMENTS",
										eElement.getElementsByTagName("InitiatorComments").item(0).getTextContent());

								dataMap.put("AVP_REVIEWER_SIGNATURE",
										eElement.getElementsByTagName("AVPSignature").item(0).getTextContent());
								String avpSignDate = eElement.getElementsByTagName("AVPSignDate").item(0)
										.getTextContent();
								Object avpSignDateObj = "";
								if (avpSignDate != null && avpSignDate != "") {
									Date avpSignDateNew = Date.valueOf(avpSignDate);
									avpSignDateObj = avpSignDateNew;
								}
								dataMap.put("AVP_REVIEWER_SIGN_DATE", avpSignDateObj);
								dataMap.put("AVP_REVIEWER_DECISION",
										eElement.getElementsByTagName("AVPDecision").item(0).getTextContent());
								dataMap.put("AVP_REVIEWER_COMMENTS",
										eElement.getElementsByTagName("AVPComment").item(0).getTextContent());

								dataMap.put("EVAL_REVIEWER_SIGNATURE",
										eElement.getElementsByTagName("EvalSignature").item(0).getTextContent());
								String evalSignDate = eElement.getElementsByTagName("EvalSignDate").item(0)
										.getTextContent();
								Object evalSignDateObj = "";
								if (evalSignDate != null && evalSignDate != "") {
									Date evalSignDateNew = Date.valueOf(evalSignDate);
									evalSignDateObj = evalSignDateNew;
								}
								dataMap.put("EVAL_REVIEWER_SIGN_DATE", evalSignDateObj);
								dataMap.put("EVAL_REVIEWER_DECISION",
										eElement.getElementsByTagName("EvalDecision").item(0).getTextContent());
								dataMap.put("EVAL_REVIEWER_COMMENTS",
										eElement.getElementsByTagName("EvalComment").item(0).getTextContent());
								
								dataMap.put("TDA_ANALYST_SIGNATURE",
										eElement.getElementsByTagName("TDAAnalystSignature").item(0).getTextContent());
								String tdaSignDate = eElement.getElementsByTagName("TDAAnalystSignDate").item(0)
										.getTextContent();
								Object tdaSignDateObj = "";
								if (tdaSignDate != null && tdaSignDate != "") {
									Date tdaSignDateNew = Date.valueOf(tdaSignDate);
									tdaSignDateObj = tdaSignDateNew;
								}
								dataMap.put("TDA_ANALYST_SIGN_DATE", tdaSignDateObj);
								dataMap.put("TDA_ANALYST_COMMENTS",
										eElement.getElementsByTagName("TDAAnalystComment").item(0).getTextContent());

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

								dataMap.put("STAGE_INDICATOR",
										eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());

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
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "CWID", workflowInstanceID, dataMap,
							"INITIATOR_SIGN_DATE,AVP_REVIEWER_SIGN_DATE,EVAL_REVIEWER_SIGN_DATE,TDA_ANALYST_SIGN_DATE");
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
						log.debug("IOException in TDAExceptionFormGradDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
/*				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in TDAExceptionFormGradDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}*/
			}
		}
	}
}
