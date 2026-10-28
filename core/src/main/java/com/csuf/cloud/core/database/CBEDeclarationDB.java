package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONObject;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;

import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=CBE Declaration DB Save",
		Constants.SERVICE_VENDOR + "=ThoughtFocus", "process.label" + "=CBEDeclarationDB" })
public class CBEDeclarationDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CBEDeclarationDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_CBE_DECLARATION";
		String childTableName = "AEM_CBE_DROP_COURSE_LIST";
		String formName = "CBE Declaration Form";
		String url = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		try {
			InputStream is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, workItem.getContentPath(), "Data.xml");
			if (null != is) {
				Document doc = XMLUtils.getDomDocument(is);

				DatabaseUtils dbUtil = new DatabaseUtils();

				LinkedHashMap<String, Object> dataMapInfo = null;

				LinkedHashMap<String, Object> dataMapTable = null;

				/*
				 * String dataSourceVal =
				 * globalConfigFilenetService.getAEMFormsDatabaseSource(); conn =
				 * jdbcConnectionService.getDBConn(dataSourceVal);
				 */

				// if (conn != null) {

				String workflowInstanceID = workItem.getWorkflow().getId();
				Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");

				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					String cwid = XMLUtils.getChildNodeContent(afBoundDataElement, "cwid");
					String fName = XMLUtils.getChildNodeContent(afBoundDataElement, "FName");
					String mName = XMLUtils.getChildNodeContent(afBoundDataElement, "MName");
					String lName = XMLUtils.getChildNodeContent(afBoundDataElement, "LName");
					String adminTerm = XMLUtils.getChildNodeContent(afBoundDataElement, "AdmitTerm");
					String currentMajor = XMLUtils.getChildNodeContent(afBoundDataElement, "CurrentMajor");
					String currentMajorCode = XMLUtils.getChildNodeContent(afBoundDataElement, "CurrentMajorAcadPlan");
					String newMajor = XMLUtils.getChildNodeContent(afBoundDataElement, "NewMajor");
					String newMajorCode = XMLUtils.getChildNodeContent(afBoundDataElement, "NewMajorAcadPlanCode");

					String advisorSign = XMLUtils.getChildNodeContent(afBoundDataElement, "AdvisorSign");
					String advisorSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "AdvisorSignDate");
					String advisorComment = XMLUtils.getChildNodeContent(afBoundDataElement, "AdvisorComment");
					String authorization = XMLUtils.getChildNodeContent(afBoundDataElement, "Authorization");
					String recordsRecommends = XMLUtils.getChildNodeContent(afBoundDataElement, "RecordsRecommends");
					String recordsDecision = "";
					if (recordsRecommends.equals("1")) {
						recordsDecision = "Approval";
					} else if (recordsRecommends.equals("0")) {
						recordsDecision = "Denial";
					}
					String recordsSign = XMLUtils.getChildNodeContent(afBoundDataElement, "RecordsSign");
					String recordsSignDate = XMLUtils.getChildNodeContent(afBoundDataElement, "RecordsSignDate");
					String recordsComment = XMLUtils.getChildNodeContent(afBoundDataElement, "RecordsComment");

					dataMapInfo = new LinkedHashMap<String, Object>();
					dataMapInfo.put("CWID", cwid);
					dataMapInfo.put("FNAME", fName);
					dataMapInfo.put("MNAME", mName);
					dataMapInfo.put("LNAME", lName);
					dataMapInfo.put("ADMIT_TERM", adminTerm);
					dataMapInfo.put("CURRENT_MAJOR", currentMajor);
					dataMapInfo.put("CURRENT_MAJOR_CODE", currentMajorCode);
					dataMapInfo.put("NEW_MAJOR", newMajor);
					dataMapInfo.put("NEW_MAJOR_CODE", newMajorCode);

					dataMapInfo.put("ADVISOR_SIGN", advisorSign);
					Object advisorSignDateObj = null;
					if (advisorSignDate != null && advisorSignDate != "") {
						Date advisorSignDateNew = Date.valueOf(advisorSignDate);
						advisorSignDateObj = advisorSignDateNew;
					}
					dataMapInfo.put("ADVISOR_SIGN_DATE", advisorSignDateObj);
					dataMapInfo.put("AUTHORIZATION", authorization);
					dataMapInfo.put("ADVISOR_COMMENT", advisorComment);

					dataMapInfo.put("RECORDS_RECOMMENDS", recordsDecision);
					dataMapInfo.put("RECORDS_SIGN", recordsSign);
					Object recordsSignDateObj = null;
					if (recordsSignDate != null && recordsSignDate != "") {
						Date recordsSignDateNew = Date.valueOf(recordsSignDate);
						recordsSignDateObj = recordsSignDateNew;
					}
					dataMapInfo.put("RECORDS_SIGN_DATE", recordsSignDateObj);
					dataMapInfo.put("RECORDS_COMMENT", recordsComment);
					dataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
					dbUtil.insertFormData(conn, dataMapInfo, tableName, formName);
					String courseNo = "";
					String scheduleNo = "";
					String units = "";
					String instructor = "";
					String section = "";
					String selectCB = "";
					for (int i = 0; i < afBoundDataElement.getElementsByTagName("CourseRow").getLength(); i++) {
						log.error("i value=" + i);
						for (int j = 0; j < afBoundDataElement.getElementsByTagName("CourseRow").item(i).getChildNodes()
								.getLength(); j++) {

							String nodeName = afBoundDataElement.getElementsByTagName("CourseRow").item(i)
									.getChildNodes().item(j).getNodeName();
							String nodeValue = afBoundDataElement.getElementsByTagName("CourseRow").item(i)
									.getChildNodes().item(j).getTextContent();
							if (nodeName.equals("SelectCB")) {
								selectCB = nodeValue;
							}
							if (nodeName.equals("CourseNo")) {
								courseNo = nodeValue;
							}
							if (nodeName.equals("ScheduleNo")) {
								scheduleNo = nodeValue;
							}
							if (nodeName.equals("NumberOfUnits")) {
								units = nodeValue;
							}
							if (nodeName.equals("NameOfInstructor")) {
								instructor = nodeValue;
							}
							if (nodeName.equals("SectionNo")) {
								section = nodeValue;
							}

						}
						dataMapTable = new LinkedHashMap<String, Object>();
						dataMapTable.put("CWID", cwid);
						dataMapTable.put("COURSE_NO", courseNo);
						dataMapTable.put("SCHEDULE_NO", scheduleNo);
						dataMapTable.put("UNITS", units);
						dataMapTable.put("INSTRUCTOR_NAME", instructor);
						dataMapTable.put("SECTION", section);
						if (selectCB.equals("Yes")) {
							// dbUtil.insertFormData(conn, dataMapTable, childTableName, formName);
							JSONObject json = new JSONObject();
							json.put("DB_CONNECTION", "AEMDBDEV");
							json.put("TABLE_NAME", tableName);
							json.put("FORM_NAME", formName);
							json.put("UNIQUE_FIELD", cwid);
							json.put("UNIQUE_FIELD_COLUMN", "CWID");
							json.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
							json.put("DATA_MAP", dataMapTable);
							json.put("DATE_FIELDS", "ADVISOR_SIGN_DATE,RECORDS_SIGN_DATE");

							log.error("Testing: =" + json.toString());

							String dbServiceUrl = url;

							CloseableHttpClient client = HttpClients.createDefault();
							HttpPost post = new HttpPost(dbServiceUrl);
							post.addHeader("Content-Type", "application/json");
							post.setEntity(new StringEntity(json.toString()));

							CloseableHttpResponse response = client.execute(post);
							log.info("DB Service Response: =" + response.getStatusLine());
							client.close();
						}
					}

				}
				// }
			}
		} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			log.error(Arrays.toString(e.getStackTrace()));
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error("SQLException in CBEDeclarationDB Finally Block=" + Arrays.toString(e.getStackTrace()));
				}
			}
		}
	}
}
