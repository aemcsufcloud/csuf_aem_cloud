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
import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CloudDbSaveUtil;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=CSUF Grade Change DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=CSUFGradeChangeDBNew" })
public class CSUFGradeChangeDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFGradeChangeDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	int parentTable = 0;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;
		String workflowInstanceID = "";
		String term = "";
		String instCwid = "";
		String instName = "";
		String courseName = "";
		String classNumber = "";
		String sectionNumber = "";
		String unitValue = "";
		String courseLevel = "";
		String todayDate = "";
		String massGradeChange = "";
		String instSign = "";
		String instSignDate = "";
		String instComments = "";
		String chairSign = "";
		String chairSignDate = "";
		String chairComments = "";
		String deanSign = "";
		String deanSignDate = "";
		String deanComments = "";
		String recordsSign = "";
		String recordsSignDate = "";
		String recordsComments = "";
		String enrollmentRequestID = "";
		String recordersName = "";
		String cmsUpdateCompleted = "";
		String studentLastName = "";
		String studentFirstName = "";
		String studentID = "";
		String studentMiddleName = "";
		String gradeChangeFrom = "";
		String gradeChangeTo = "";
		String gradeChangeReasons = "";
		String comments = "";
		String rpWorkCompleted = "";
		String gradeCheck = "";
		String deptID = "";
		String caseID = "";

		LinkedHashMap<String, Object> dataMapFormInfo = null;
		LinkedHashMap<String, Object> dataMapStudentInfo = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		// conn = jdbcConnectionService.getAemDEVDBConnection();

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

		while (xmlFiles.hasNext()) {
				workflowInstanceID = workItem.getWorkflow().getId();
				Resource attachmentXml = xmlFiles.next();
				// log.info("xmlFiles inside ");
				String filePath = attachmentXml.getPath();

				log.info("filePath= " + filePath);
				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					log.info("xmlFiles=" + filePath);
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
					} catch (RepositoryException e) {
						log.error("RepositoryException from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
					}
					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e) {
							log.error("ParserConfigurationException from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e) {
							log.error("IOException from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;

								caseID = eElement.getElementsByTagName("caseID").item(0).getTextContent();

								term = eElement.getElementsByTagName("Term").item(0).getTextContent();

								instCwid = eElement.getElementsByTagName("InstructorCWID").item(0).getTextContent();

								instName = eElement.getElementsByTagName("InstructorName").item(0).getTextContent();

								courseName = eElement.getElementsByTagName("CourseName").item(0).getTextContent();

								classNumber = eElement.getElementsByTagName("ClassNumber").item(0).getTextContent();
								courseLevel = eElement.getElementsByTagName("CourseLevel").item(0).getTextContent();

								sectionNumber = eElement.getElementsByTagName("SectionNumber").item(0).getTextContent();

								todayDate = eElement.getElementsByTagName("TodayDate").item(0).getTextContent();

								instSign = eElement.getElementsByTagName("InstructorSign").item(0).getTextContent();
								instSignDate = eElement.getElementsByTagName("InstructorDate").item(0).getTextContent();
								instComments = eElement.getElementsByTagName("InstructorComment").item(0)
										.getTextContent();

								chairSign = eElement.getElementsByTagName("ChairSign").item(0).getTextContent();
								chairSignDate = eElement.getElementsByTagName("ChairDate").item(0).getTextContent();
								chairComments = eElement.getElementsByTagName("ChairComment").item(0).getTextContent();

								deanSign = eElement.getElementsByTagName("DeanSign").item(0).getTextContent();
								deanSignDate = eElement.getElementsByTagName("DeanDate").item(0).getTextContent();
								deanComments = eElement.getElementsByTagName("DeanComment").item(0).getTextContent();

								enrollmentRequestID = eElement.getElementsByTagName("EnrollmentReqID").item(0)
										.getTextContent();
								cmsUpdateCompleted = eElement.getElementsByTagName("CMSUpdateDate").item(0)
										.getTextContent();
								recordersName = eElement.getElementsByTagName("RecordersName").item(0).getTextContent();
								recordsSign = eElement.getElementsByTagName("RecordersSignature").item(0)
										.getTextContent();
								recordsComments = eElement.getElementsByTagName("RecordersComments").item(0)
										.getTextContent();
								deptID = eElement.getElementsByTagName("HiddenDepartmentCode").item(0).getTextContent();
								massGradeChange = eElement.getElementsByTagName("massGradeChange").item(0)
										.getTextContent();

								dataMapFormInfo = new LinkedHashMap<String, Object>();
								dataMapFormInfo.put("CASE_ID", caseID);
								dataMapFormInfo.put("TERM", term);
								dataMapFormInfo.put("INSTRUCTOR_CWID", instCwid);
								dataMapFormInfo.put("INSTRUCTOR_NAME", instName);
								dataMapFormInfo.put("COURSE_NAME", courseName);
								dataMapFormInfo.put("CLASS_NUMBER", classNumber);
								dataMapFormInfo.put("SECTION_NUMBER", sectionNumber);
								dataMapFormInfo.put("COURSE_LEVEL", courseLevel);

								Object todayDtObj = null;
								if (todayDate != null && todayDate != "") {
									Date todayDateNew = Date.valueOf(todayDate);
									todayDtObj = todayDateNew;
								}

								dataMapFormInfo.put("TODAYS_DATE", todayDtObj);
								dataMapFormInfo.put("MASS_GRADE_CHANGE", massGradeChange);
								dataMapFormInfo.put("INSTRUCTOR_SIGNATURE", instSign);

								Object instDateObj = null;
								if (instSignDate != null && instSignDate != "") {
									Date instSignNew = Date.valueOf(instSignDate);
									instDateObj = instSignNew;
								}

								dataMapFormInfo.put("INSTRUCTOR_SIGN_DATE", instDateObj);
								dataMapFormInfo.put("INSTRUCTOR_COMMENT", instComments);

								Object chairDateObj = null;
								if (chairSignDate != null && chairSignDate != "") {
									Date chairSignNew = Date.valueOf(chairSignDate);
									chairDateObj = chairSignNew;
								}

								dataMapFormInfo.put("CHAIR_SIGNATURE", chairSign);
								dataMapFormInfo.put("CHAIR_SIGN_DATE", chairDateObj);
								dataMapFormInfo.put("CHAIR_COMMENT", chairComments);
								dataMapFormInfo.put("DEAN_SIGNATURE", deanSign);

								Object deanDateObj = null;
								if (deanSignDate != null && deanSignDate != "") {
									Date deanSignNew = Date.valueOf(deanSignDate);
									deanDateObj = deanSignNew;
								}

								dataMapFormInfo.put("DEAN_SIGN_DATE", deanDateObj);
								dataMapFormInfo.put("DEAN_COMMENT", deanComments);
								dataMapFormInfo.put("RECORDS_SIGNATURE", recordsSign);

								Object recordDateObj = null;
								if (recordsSignDate != null && recordsSignDate != "") {
									Date recordSignNew = Date.valueOf(recordsSignDate);
									recordDateObj = recordSignNew;
								}

								dataMapFormInfo.put("DEPT_CODE", deptID);
								/*
								 * dataMapFormInfo.put("RECORDS_SIGN_DATE", recordDateObj);
								 */
								dataMapFormInfo.put("RECORDS_COMMENT", recordsComments);

								dataMapFormInfo.put("ENROLLMENT_REQUEST_ID", enrollmentRequestID);
								dataMapFormInfo.put("RECORDERS_NAME", recordersName);
								dataMapFormInfo.put("CMS_UPDATE_COMPLETED", cmsUpdateCompleted);
								dataMapFormInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

								for (int i = 0; i < eElement.getElementsByTagName("Row1").getLength(); i++) {
									for (int j = 0; j < eElement.getElementsByTagName("Row1").item(i).getChildNodes()
											.getLength(); j++) {

										String nodeName = eElement.getElementsByTagName("Row1").item(i).getChildNodes()
												.item(j).getNodeName();
										String nodeValue = eElement.getElementsByTagName("Row1").item(i).getChildNodes()
												.item(j).getTextContent();
										if (nodeName.equals("GradeCHK")) {
											gradeCheck = nodeValue;
										}
										if (nodeName.equals("StudentLastName")) {
											studentLastName = nodeValue;

										}
										if (nodeName.equals("StudentFirstName")) {
											studentFirstName = nodeValue;
										}
										if (nodeName.equals("SID")) {
											studentID = nodeValue;
										}
										if (nodeName.equals("UnitTaken")) {
											unitValue = nodeValue;
										}
										if (nodeName.equals("GradeChangeFrom")) {
											gradeChangeFrom = nodeValue;
										}
										if (nodeName.equals("GradeChangeTo")) {
											gradeChangeTo = nodeValue;
										}
										if (nodeName.equals("Reason")) {
											gradeChangeReasons = nodeValue;
										}
										if (nodeName.equals("Description")) {
											comments = nodeValue;
										}
										if (nodeName.equals("RPFieldDate")) {
											rpWorkCompleted = nodeValue;
										}
									}

									if (gradeCheck.equals("1")) {
										dataMapStudentInfo = new LinkedHashMap<String, Object>();
										dataMapStudentInfo.put("CASE_ID", caseID);
										dataMapStudentInfo.put("TERM", term);
										dataMapStudentInfo.put("INSTRUCTOR_CWID", instCwid);
										dataMapStudentInfo.put("COURSE_NAME", courseName);
										dataMapStudentInfo.put("CLASS_NUMBER", classNumber);
										dataMapStudentInfo.put("SECTION_NUMBER", sectionNumber);

										Object todayDtObjStu = null;
										if (todayDate != null && todayDate != "") {
											Date todayDateNew = Date.valueOf(todayDate);
											todayDtObjStu = todayDateNew;
										}
										dataMapStudentInfo.put("TODAYS_DATE", todayDtObjStu);
										dataMapStudentInfo.put("STUDENT_CWID", studentID);
										dataMapStudentInfo.put("MIDDLE_NAME", studentMiddleName);
										dataMapStudentInfo.put("FIRST_NAME", studentFirstName);
										dataMapStudentInfo.put("LAST_NAME", studentLastName);
										dataMapStudentInfo.put("UNIT_VALUE", unitValue);
										dataMapStudentInfo.put("GRADE_CHANGE_FROM", gradeChangeFrom);
										dataMapStudentInfo.put("GRADE_CHANGE_TO", gradeChangeTo);
										dataMapStudentInfo.put("GRADE_CHANGE_REASON", gradeChangeReasons);
										dataMapStudentInfo.put("COMMENTS", comments);

										Object rpWorkObj = null;
										if (rpWorkCompleted != null && rpWorkCompleted != "") {
											Date rpNew = Date.valueOf(rpWorkCompleted);
											rpWorkObj = rpNew;
										}

										dataMapStudentInfo.put("RP_WORK_COMPLETED", rpWorkObj);
										dataMapStudentInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

										if (parentTable == 0) {
											try {
												CloudDbSaveUtil.saveFormData("AEM_AR_GRADE_CHANGE_FORM", "Grade Change",
														caseID, "CASE_ID", workflowInstanceID, dataMapFormInfo,
														"TODAYS_DATE,INST_SIGN_DATE,CHAIR_SIGN_DATE,DEAN_SIGN_DATE");
												parentTable = 1;
											} catch (IOException ioException) {
												ioException.printStackTrace();
											}
										}

										if (parentTable == 1) {
											log.info("ParentTable========" + parentTable);
											try {
												CloudDbSaveUtil.saveFormData("AEM_AR_GC_STUDENT_INFO", "Grade Change",
														"", "", workflowInstanceID, dataMapStudentInfo,
														"TODAYS_DATE,RP_WORK_COMPLETED");
											} catch (IOException ioException) {
												ioException.printStackTrace();
											}
										}
										// break;
									}
									// }
								}
							}
						}

					} catch (SAXException e) {
						log.error("SAXException from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
					} catch (Exception e) {
						log.error("Exception from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
					}

					finally {
						try {
							parentTable = 0;
							log.info("Resetting parentTable in finally block==" + parentTable);
							is.close();
							conn.close();
						} catch (IOException | SQLException e) {
							log.error("Exception from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
						}

					}

				}
			}
	}

	/**
	 * @deprecated unused; cloud save is used from execute()
	 */
	public void insertGCStudentData(Connection conn, LinkedHashMap<String, Object> dataMap) {
		PreparedStatement preparedStmt = null;
		log.info("insertGCStudentData=" + dataMap);
		if (conn != null) {
			try {
				conn.setAutoCommit(false);
			} catch (SQLException e) {
				log.error("SQLException from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
			} catch (Exception e) {
				log.error("Exception from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
			}
			String tableName = "AEM_AR_GC_STUDENT_INFO";
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
			log.info("SQL=" + sql.toString());
			try {
				preparedStmt = conn.prepareStatement(sql.toString());
			} catch (Exception e) {
				log.error("Exception from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
			}
			int i = 0;
			log.info("Datamap values=" + dataMap.values());
			try {
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
			} catch (SQLException e) {
				log.error("SQLException from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
			} catch (Exception e) {
				log.error("Exception from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
			}
			try {
				log.info("Before Prepared stmt GC Student Info");
				preparedStmt.execute();
				conn.commit();
				log.info("After Prepared stmt GC Student Info");
			} catch (SQLException e) {
				log.error("SQLException from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
			} catch (Exception e) {
				log.error("Exception from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));

			} finally {
				if (preparedStmt != null) {
					try {
						preparedStmt.close();
					} catch (SQLException e) {
						log.error("SQLException from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
					} catch (Exception e) {
						log.error("Exception from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}
		}
	}

	public void insertGCFormData(Connection conn, LinkedHashMap<String, Object> dataMap) {
		PreparedStatement preparedStmt = null;
		if (conn != null) {
			try {
				conn.setAutoCommit(false);
			} catch (SQLException e1) {
				log.error("SQLException=" + e1.getMessage());
				e1.printStackTrace();
			}
			String tableName = "AEM_AR_GRADE_CHANGE_FORM";
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
			log.info("SQL=" + sql.toString());
			try {
				preparedStmt = conn.prepareStatement(sql.toString());
			} catch (SQLException e) {
				log.error("SQLException from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));

			}
			int i = 0;
			log.info("Datamap values=" + dataMap.values());
			for (Object value : dataMap.values()) {
				try {
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
				} catch (SQLException e) {
					log.error("SQLException from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));

				}
			}
			try {
				log.info("Before GC AEM_AR_GRADE_CHANGE_FORM");
				preparedStmt.execute();
				conn.commit();
				parentTable = 1;
				log.info("parentTable=" + parentTable);
				log.info("After GC AEM_AR_GRADE_CHANGE_FORM");
			} catch (SQLException e) {
				log.error("SQLException from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
			} finally {
				if (preparedStmt != null) {
					try {
						preparedStmt.close();
						log.info("preparedstmt closed");
						// conn.close();
					} catch (SQLException e) {
						log.error("SQLException from CSUFGradeChangeDB=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}
		}
	}
}
