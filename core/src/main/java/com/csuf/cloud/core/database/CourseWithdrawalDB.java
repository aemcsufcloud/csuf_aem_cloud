package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
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
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Student Course Withdrawal DB",
		Constants.SERVICE_VENDOR + "=Thoughtfocus", "process.label" + "=Course Withdrawal DB" })
public class CourseWithdrawalDB implements WorkflowProcess {
	int parentTable = 0;
	private static final Logger log = LoggerFactory.getLogger(CourseWithdrawalDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		JsonObject json = null;
		Map<String, Object> dataMap = null;
		Map<String, Object> dataMapCourseInfo = null;
		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		try (Connection conn = jdbcConnectionService.getDBConn(dataSourceVal);) {
			payloadPath = workItem.getWorkflowData().getPayload().toString();
			if (conn != null) {
				dataMap = new LinkedHashMap<>();
				dataMapCourseInfo = new LinkedHashMap<>();
				InputStream is = null;
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");
				if (null != is) {
					Document doc = XMLUtils.getDomDocument(is);
					Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");
					Element element = XMLUtils.getChildNode(afBoundDataElement, "form1");
					if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
						String tableJsonData = XMLUtils.getChildNodeContent(element, "LookupResult");
						JsonParser parser = new JsonParser();
						if (StringUtils.isNotBlank(tableJsonData)) {
							json = parser.parse(tableJsonData).getAsJsonObject();
						} else {
							log.error("Error : tableJsonData not found!");
						}
						dataMap = addXMLParentNodesToMap(element, workItem);
						for (int i = 0; i < XMLUtils.getElementLength(element, "CourseRow"); i++) {
							if (XMLUtils.getChildNodeContentOfElement(element, "SelectCB", i).equalsIgnoreCase("Yes")) {
								dataMapCourseInfo = addXMLChildNodesToMap(element, json, i);
								if (parentTable == 0) {
									insertSCWForm(conn, dataMap);
								}
								if (parentTable == 1) {
									insertSCWCourseInfo(conn, dataMapCourseInfo);
								}
							}
						}
					}
				}
			}
		} catch (SQLException | RepositoryException | SAXException | IOException | ParserConfigurationException e) {
			log.error("Exception = {}", Arrays.toString(e.getStackTrace()));
		} finally {
			parentTable = 0;
		}
	}

	public void insertSCWForm(Connection conn, Map<String, Object> dataMap) throws SQLException {
		if (conn != null) {
			conn.setAutoCommit(false);
			String tableName = "AEM_COURSE_WITHDRAWAL";
			StringBuilder sql = new StringBuilder("INSERT INTO  ").append(tableName).append(" (");
			StringBuilder placeholders = new StringBuilder();
			for (Iterator<String> iter = dataMap.keySet().iterator(); iter.hasNext();) {
				sql.append(iter.next());
				placeholders.append("?");
				if (iter.hasNext()) {
					sql.append(",");
					placeholders.append(",");
				}
			}
			sql.append(") VALUES (").append(placeholders).append(")");
			try (PreparedStatement preparedStmt = conn.prepareStatement(sql.toString());) {
				int i = 0;
				for (Object value : dataMap.values()) {
					if (value instanceof Date) {
						preparedStmt.setDate(++i, (Date) value);
					} else if (value instanceof Integer) {
						preparedStmt.setInt(++i, (Integer) value);
					} else {
						if (value != "" && value != null) {
							preparedStmt.setString(++i, value.toString());
						} else {
							preparedStmt.setString(++i, null);
						}
					}
				}
				int rowsAffected = preparedStmt.executeUpdate();
				log.debug("insertSCWForm - Rows Affected : {}", rowsAffected);
				conn.commit();
				parentTable = 1;
			} catch (SQLException e) {
				log.error("SQLException From CourseWithdrawalDB Class : {}", Arrays.toString(e.getStackTrace()));
			}
		}
	}

	private void insertSCWCourseInfo(Connection conn, Map<String, Object> dataMap) throws SQLException {
		if (conn != null) {
			conn.setAutoCommit(false);

			String tableName = "AEM_SCW_COURSE_INFO";
			StringBuilder sql = new StringBuilder("INSERT INTO  ").append(tableName).append(" (");
			StringBuilder placeholders = new StringBuilder();
			for (Iterator<String> iter = dataMap.keySet().iterator(); iter.hasNext();) {
				sql.append(iter.next());
				placeholders.append("?");
				if (iter.hasNext()) {
					sql.append(",");
					placeholders.append(",");
				}
			}
			sql.append(") VALUES (").append(placeholders).append(")");

			try (PreparedStatement preparedStmt = conn.prepareStatement(sql.toString());) {
				int i = 0;

				for (Object value : dataMap.values()) {
					if (value instanceof Date) {
						preparedStmt.setDate(++i, (Date) value);
					} else if (value instanceof Integer) {
						preparedStmt.setInt(++i, (Integer) value);
					} else {
						if (value != "" && value != null) {
							preparedStmt.setString(++i, value.toString());
						} else {
							preparedStmt.setString(++i, null);
						}
					}
				}
				int rowsAffected = preparedStmt.executeUpdate();
				log.debug("insertSCWCourseInfo - Rows Affected : {}", rowsAffected);
				conn.commit();
			} catch (SQLException e) {
				log.error("Error Message : {}, SQLException: {}", e.getMessage(), Arrays.toString(e.getStackTrace()));
			}
		}
	}

	private Map<String, Object> addXMLParentNodesToMap(Element eElement, WorkItem workItem) {
		Map<String, Object> parentNodesMap = new LinkedHashMap<>();
		try {
			String workflowInstanceID = workItem.getWorkflow().getId();
			parentNodesMap.put("TYPE_OF_FORM", XMLUtils.getChildNodeContent(eElement, "typeOfForm"));
			parentNodesMap.put("LAST_NAME", XMLUtils.getChildNodeContent(eElement, "LastName"));
			parentNodesMap.put("FIRST_NAME", XMLUtils.getChildNodeContent(eElement, "FirstName"));
			parentNodesMap.put("MIDDLE_NAME", XMLUtils.getChildNodeContent(eElement, "MiddleName"));
			parentNodesMap.put("STUDENT_ID", XMLUtils.getChildNodeContent(eElement, "StudentID"));
			parentNodesMap.put("CASE_ID", XMLUtils.getChildNodeContent(eElement, "caseId"));
			parentNodesMap.put("MAJOR", XMLUtils.getChildNodeContent(eElement, "Major"));
			parentNodesMap.put("DEGREE_OBJECTIVE", XMLUtils.getChildNodeContent(eElement, "DegreeObjective"));
			parentNodesMap.put("PROGRAM_PLAN", XMLUtils.getChildNodeContent(eElement, "ProgramPlan"));
			parentNodesMap.put("ACADEMIC_PLAN", XMLUtils.getChildNodeContent(eElement, "AcademicPlan"));
			parentNodesMap.put("PHONE_NO", XMLUtils.getChildNodeContent(eElement, "TelephoneNo"));
			parentNodesMap.put("EMAIL_ADDRESS", XMLUtils.getChildNodeContent(eElement, "Email"));
			parentNodesMap.put("INTERNATIONAL_STUDENT",
					XMLUtils.getChildNodeContent(eElement, "International_Students"));
			parentNodesMap.put("EIP_FLAG", XMLUtils.getChildNodeContent(eElement, "EIP_Flag"));
			parentNodesMap.put("TERM_CODE", XMLUtils.getChildNodeContent(eElement, "TermCode"));
			parentNodesMap.put("TERM_DESC", XMLUtils.getChildNodeContent(eElement, "TermDesc"));
			parentNodesMap.put("ALL_COURSE_WITHDRAWAL", XMLUtils.getChildNodeContent(eElement, "AllCoursWithdrawRB"));
			parentNodesMap.put("NON_MEDICAL_PETITION1",
					XMLUtils.getChildNodeContent(eElement, "StudentPetitionComment"));
			parentNodesMap.put("NON_MEDICAL_PETITION2",
					XMLUtils.getChildNodeContent(eElement, "StudentPetitionComment1"));
			parentNodesMap.put("NON_MEDICAL_PETITION3",
					XMLUtils.getChildNodeContent(eElement, "StudentPetitionComment2"));
			parentNodesMap.put("MEDICAL_PETITION1",
					XMLUtils.getChildNodeContent(eElement, "StudentPetitionMedicalComment"));
			parentNodesMap.put("MEDICAL_PETITION2",
					XMLUtils.getChildNodeContent(eElement, "StudentPetitionMedicalComment1"));
			parentNodesMap.put("MEDICAL_PETITION3",
					XMLUtils.getChildNodeContent(eElement, "StudentPetitionMedicalComment2"));
			parentNodesMap.put("MEDICAL_PETITION4",
					XMLUtils.getChildNodeContent(eElement, "StudentPetitionMedicalComment3"));
			parentNodesMap.put("MEDICAL_PETITION5",
					XMLUtils.getChildNodeContent(eElement, "StudentPetitionMedicalComment4"));
			parentNodesMap.put("MEDICAL_PETITION6",
					XMLUtils.getChildNodeContent(eElement, "StudentPetitionMedicalComment5"));
			parentNodesMap.put("NON_MEDICAL_STUDENT", XMLUtils.getChildNodeContent(eElement, "studentCB"));
			parentNodesMap.put("MEDICAL_STUDENT", XMLUtils.getChildNodeContent(eElement, "studentMedCB"));
			parentNodesMap.put("STUDENT_SIGN", XMLUtils.getChildNodeContent(eElement, "StudentSign"));
			Object studDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "StudentSignDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "StudentSignDate") != "") {
				Date stuDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "StudentSignDate"));
				studDateObj = stuDate;
			}
			parentNodesMap.put("STUDENT_SIGN_DATE", studDateObj);
			parentNodesMap.put("WITHDRAWAL_DUE_TO_COVID19", XMLUtils.getChildNodeContent(eElement, "Covid19CB"));
			parentNodesMap.put("CIRCUMSTANCE", XMLUtils.getChildNodeContent(eElement, "Circumstances"));
			parentNodesMap.put("DISABILITY_SUPPORT_SERVICE_CB",
					XMLUtils.getChildNodeContent(eElement, "DisabilitySupServiceCB"));
			parentNodesMap.put("NURSING_FLAG", XMLUtils.getChildNodeContent(eElement, "Nursing_Flag"));
			parentNodesMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
			parentNodesMap.put("ARSC_DECISION", XMLUtils.getChildNodeContent(eElement, "ARSCRecommend"));

			parentNodesMap.put("ISS_DECISION", XMLUtils.getChildNodeContent(eElement, "RecommendISSReviewer"));
			parentNodesMap.put("ISS_COMMENT", XMLUtils.getChildNodeContent(eElement, "ISSReviewerComment"));
			parentNodesMap.put("ISS_SIGN", XMLUtils.getChildNodeContent(eElement, "ISSReviewerSign"));
			Object issDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "ISSReviewerDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "ISSReviewerDate") != "") {
				Date issDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "ISSReviewerDate"));
				issDateObj = issDate;
			}
			parentNodesMap.put("ISS_SIGN_DATE", issDateObj);

			parentNodesMap.put("ATHLETIC_DECISION",
					XMLUtils.getChildNodeContent(eElement, "RecommendAthleticReviewer"));
			parentNodesMap.put("ATHLETIC_COMMENT", XMLUtils.getChildNodeContent(eElement, "AthleticReviewerComment"));
			parentNodesMap.put("ATHLETIC_SIGN", XMLUtils.getChildNodeContent(eElement, "AthleticReviewerSign"));
			Object athleticDateObj = null;
			if (XMLUtils.getChildNodeContent(eElement, "AthleticReviewerDate") != null
					&& XMLUtils.getChildNodeContent(eElement, "AthleticReviewerDate") != "") {
				Date athleticDate = Date.valueOf(XMLUtils.getChildNodeContent(eElement, "AthleticReviewerDate"));
				athleticDateObj = athleticDate;
			}
			parentNodesMap.put("ATHLETIC_SIGN_DATE", athleticDateObj);

			return parentNodesMap;

		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		return null;
	}

	private Map<String, Object> addXMLChildNodesToMap(Element eElement, JsonObject json, Integer index) {
		Map<String, Object> childNodesMap = new LinkedHashMap<>();
		try {
			String instUID = null;
			String instEmail = null;
			String chairName = null;
			String chairEmail = null;
			String chairUID = null;
			String sectionNumber = null;

			String course = XMLUtils.getChildNodeContentOfElement(eElement, "CourseNo", index);
			String schedule = XMLUtils.getChildNodeContentOfElement(eElement, "ScheduleNo", index);
			String unit = XMLUtils.getChildNodeContentOfElement(eElement, "NumberOfUnits", index);
			String instName = XMLUtils.getChildNodeContentOfElement(eElement, "NameOfInstructor", index);

			JsonArray params = json.getAsJsonArray("COURSES");
			if (null != params && !params.isJsonNull() && params.isJsonArray()) {
				for (int n = 0; n < params.size(); n++) {
					JsonElement jsonElement = params.get(n);
					JsonObject obj = jsonElement.getAsJsonObject();
					if (obj.get("CRSE_NAME").getAsString().equals(course)) {
						sectionNumber = obj.get("CLASS_SECTION").getAsString();
						instUID = obj.get("INSTR_USERID").getAsString();
						instEmail = obj.get("INSTR_EMAIL").getAsString();
						chairName = obj.get("CHAIR_NAME").getAsString();
						chairEmail = obj.get("CHAIR_EMAIL").getAsString();
						chairUID = obj.get("CHAIR_USERID").getAsString();
					}
				}
			}
			childNodesMap.put("STUDENT_ID", XMLUtils.getChildNodeContent(eElement, "StudentID"));
			childNodesMap.put("CASE_ID", XMLUtils.getChildNodeContent(eElement, "caseId"));
			childNodesMap.put("COURSE_NO", course);
			childNodesMap.put("SCHEDULE_NO", schedule);
			childNodesMap.put("UNIT_NO", unit);
			childNodesMap.put("SECTION_NO", sectionNumber);
			childNodesMap.put("INST_NAME", instName);
			childNodesMap.put("INST_UID", instUID);
			childNodesMap.put("INST_EMAIL", instEmail);
			childNodesMap.put("CHAIR_NAME", chairName);
			childNodesMap.put("CHAIR_EMAIL", chairEmail);
			childNodesMap.put("CHAIR_UID", chairUID);
			return childNodesMap;
		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		return null;
	}
}
