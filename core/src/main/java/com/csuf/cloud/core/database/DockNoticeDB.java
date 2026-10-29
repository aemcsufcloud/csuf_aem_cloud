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
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;
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

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Dock Notice DB", Constants.SERVICE_VENDOR + "=Adobe Systems",
		"process.label" + "=CSUFDockNoticeDB" })
public class DockNoticeDB implements WorkflowProcess {

	int parentTable = 0;

	private static final Logger log = LoggerFactory.getLogger(DockNoticeDB.class);

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;
		String timeKeeper = "";
		String middleName = "";
		String dockDate = "";
		String ssn = "";
		String positionNumber = "";
		String firstName = "";
		String lastName = "";
		String emplId = "";
		String chrsId = "";
		String empRCD = "";
		String departmentID = "";
		String departmentName = "";
		String payPeriodYear = "";
		String payPeriodMonth = "";
		String dateAbsent = "";
		String hoursAbsent = "";
		String supervisorSignature = "";
		String supervisorDate = "";
		String workflowInstanceID = "";
		String supervisorComments = "";
		String payrollSignature = "";
		String payrollDate = "";
		String payrollDecision = "";
		String payrollComments = "";
		String section = "";
		String batchNumber = "";

		LinkedHashMap<String, Object> dataMapFormInfo = null;
		LinkedHashMap<String, Object> dataMapAbsentInfo = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
		/*if (conn != null) {*/
			while (xmlFiles.hasNext()) {
				workflowInstanceID = workItem.getWorkflow().getId();
				Resource attachmentXml = xmlFiles.next();
				String filePath = attachmentXml.getPath();
				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
					} catch (ValueFormatException e) {
						log.error("ValueFormatException From DockNoticeDB Class" + Arrays.toString(e.getStackTrace()));
					} catch (PathNotFoundException e) {
						log.error("PathNotFoundException From DockNoticeDB Class" + Arrays.toString(e.getStackTrace()));
					} catch (RepositoryException e) {
						log.error("RepositoryException From DockNoticeDB Class" + Arrays.toString(e.getStackTrace()));
					}
					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.error("ParserConfigurationException From DockNoticeDB Class"
									+ Arrays.toString(e1.getStackTrace()));
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.error("IOException From DockNoticeDB Class" + Arrays.toString(e1.getStackTrace()));
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {

								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;

								departmentID = eElement.getElementsByTagName("DeptID").item(0).getTextContent();
								departmentName = eElement.getElementsByTagName("DeptName").item(0).getTextContent();
								timeKeeper = eElement.getElementsByTagName("TimeKeeper").item(0).getTextContent();
								dockDate = eElement.getElementsByTagName("DockDate").item(0).getTextContent();

								lastName = eElement.getElementsByTagName("LastName").item(0).getTextContent();
								firstName = eElement.getElementsByTagName("FirstName").item(0).getTextContent();
								middleName = eElement.getElementsByTagName("MiddleName").item(0).getTextContent();

								ssn = eElement.getElementsByTagName("maskSSN").item(0).getTextContent();
								positionNumber = eElement.getElementsByTagName("PositionNumber").item(0)
										.getTextContent();
								payPeriodMonth = eElement.getElementsByTagName("PayPeriodMonth").item(0)
										.getTextContent();
								payPeriodYear = eElement.getElementsByTagName("PayPeriodYear").item(0).getTextContent();
								emplId = eElement.getElementsByTagName("EmplID").item(0).getTextContent();
								chrsId = eElement.getElementsByTagName("CHRSID").item(0).getTextContent();
								empRCD = eElement.getElementsByTagName("EmplRCD").item(0).getTextContent();

								supervisorSignature = eElement.getElementsByTagName("SupervisorSignature").item(0)
										.getTextContent();
								supervisorDate = eElement.getElementsByTagName("SupervisorDate").item(0)
										.getTextContent();
								supervisorComments = eElement.getElementsByTagName("SupervisorComments").item(0)
										.getTextContent();
								payrollSignature = eElement.getElementsByTagName("PayrollSignature").item(0)
										.getTextContent();
								payrollDate = eElement.getElementsByTagName("PayrollDate").item(0).getTextContent();
								payrollDecision = eElement.getElementsByTagName("Decision").item(0).getTextContent();
								payrollComments = eElement.getElementsByTagName("PayrollComments").item(0)
										.getTextContent();
								section = eElement.getElementsByTagName("Section").item(0).getTextContent();
								batchNumber = eElement.getElementsByTagName("BatchNumber").item(0).getTextContent();

								dataMapFormInfo = new LinkedHashMap<String, Object>();
								dataMapFormInfo.put("EMPL_ID", emplId);
								dataMapFormInfo.put("CHRSID", chrsId);
								dataMapFormInfo.put("FIRST_NAME", firstName);
								dataMapFormInfo.put("LAST_NAME", lastName);
								dataMapFormInfo.put("MIDDLE_NAME", middleName);
								dataMapFormInfo.put("DEPT_ID", departmentID);
								dataMapFormInfo.put("DEPT_NAME", departmentName);
								dataMapFormInfo.put("TIME_KEEPER", timeKeeper);

								Object dockDateObj = null;
								if (dockDate != null && dockDate != "") {
									Date dockDateNew = Date.valueOf(dockDate);
									dockDateObj = dockDateNew;
								}
								dataMapFormInfo.put("DOCK_DATE", dockDateObj);

								dataMapFormInfo.put("SSN", ssn);
								dataMapFormInfo.put("POSITION_NUMBER", positionNumber);
								dataMapFormInfo.put("EMPL_RCD", empRCD);
								dataMapFormInfo.put("PAY_PERIOD_MONTH", payPeriodMonth);
								dataMapFormInfo.put("PAY_PERIOD_YEAR", payPeriodYear);
								dataMapFormInfo.put("SUPERVISOR_SIGNATURE", supervisorSignature);
								Object supDateObj = null;
								if (supervisorDate != null && supervisorDate != "") {
									Date supDateNew = Date.valueOf(supervisorDate);
									supDateObj = supDateNew;
								}
								dataMapFormInfo.put("SUPERVISOR_DATE", supDateObj);
								dataMapFormInfo.put("SUPERVISOR_COMMENTS", supervisorComments);
								dataMapFormInfo.put("PAYROLL_SIGNATURE", payrollSignature);
								Object payrollDateObj = null;
								if (payrollDate != null && payrollDate != "") {
									Date payrollDateNew = Date.valueOf(payrollDate);
									payrollDateObj = payrollDateNew;
								}
								dataMapFormInfo.put("PAYROLL_DATE", payrollDateObj);
								dataMapFormInfo.put("PAYROLL_DECISION", payrollDecision);
								dataMapFormInfo.put("PAYROLL_COMMENTS", payrollComments);
								dataMapFormInfo.put("SECTION", section);
								dataMapFormInfo.put("BATCH_NUMBER", batchNumber);
								dataMapFormInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

								for (int i = 0; i < eElement.getElementsByTagName("AbsentDetails").getLength(); i++) {
									for (int j = 0; j < eElement.getElementsByTagName("AbsentDetails").item(i)
											.getChildNodes().getLength(); j++) {
										String nodeName = eElement.getElementsByTagName("AbsentDetails").item(i)
												.getChildNodes().item(j).getNodeName();
										String nodeValue = eElement.getElementsByTagName("AbsentDetails").item(i)
												.getChildNodes().item(j).getTextContent();

										if (nodeName.equals("DateAbsent")) {
											dateAbsent = nodeValue;
										}
										if (nodeName.equals("HourAbsent")) {
											hoursAbsent = nodeValue;
										}

									}
									Object dateAbsentObj = null;
									if (dateAbsent != null && dateAbsent != "") {
										Date dateAbsentNew = Date.valueOf(dateAbsent);
										dateAbsentObj = dateAbsentNew;
									}

									dataMapAbsentInfo = new LinkedHashMap<String, Object>();
									dataMapAbsentInfo.put("EMPL_ID", emplId);
									dataMapAbsentInfo.put("ABSENT_DATE", dateAbsentObj);
									dataMapAbsentInfo.put("ABSENT_HOURS", hoursAbsent);
									dataMapAbsentInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

									if (parentTable == 0) {
										insertDockForm(conn, dataMapFormInfo);
									}
									if (parentTable == 1) {
										insertDockAbsentForm(conn, dataMapAbsentInfo);
									}
								}
							}
						}

					} catch (SAXException e) {
						log.error("SAXException From DockNoticeDB Class" + Arrays.toString(e.getStackTrace()));
					} catch (Exception e) {
						log.error("Exception From DockNoticeDB Class" + Arrays.toString(e.getStackTrace()));
					} finally {
						try {
							parentTable = 0;
							log.info("Resetting parentTable in finally block==" + parentTable);
							is.close();
							/*conn.close();*/
						} catch (IOException e) {
							log.error("IOException From DockNoticeDB Class" + Arrays.toString(e.getStackTrace()));
						}

					}

				}
			}
		/*}*/
	}

	public void insertDockForm(Connection conn, LinkedHashMap<String, Object> dataMap) {
		String formName = "Dock Notice";
		String emplId = dataMap.get("EMPL_ID") != null ? dataMap.get("EMPL_ID").toString() : "";
		String workflowInstanceID = dataMap.get("WORKFLOW_INSTANCE_ID") != null
				? dataMap.get("WORKFLOW_INSTANCE_ID").toString()
				: "";
		try {
			CloudDbSaveUtil.saveFormData("AEM_DOCK_NOTICE_FORM", formName, emplId, "EMPL_ID", workflowInstanceID,
					dataMap, "DOCK_DATE,SUPERVISOR_DATE,PAYROLL_DATE");
		} catch (IOException ioException) {
			ioException.printStackTrace();
		}
		parentTable = 1;
		PreparedStatement preparedStmt = null;
		/*if (conn != null) {
			try {
				conn.setAutoCommit(false);
			} catch (SQLException e1) {
				log.error("SQLException From DockNoticeDB Class" + Arrays.toString(e1.getStackTrace()));

			}
			String tableName = "AEM_DOCK_NOTICE_FORM";
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
			try {
				preparedStmt = conn.prepareStatement(sql.toString());
			} catch (SQLException e1) {
				log.error("SQLException From DockNoticeDB Class" + Arrays.toString(e1.getStackTrace()));
			}
			int i = 0;
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
					log.error("SQLException From DockNoticeDB Class" + Arrays.toString(e.getStackTrace()));
				}
			}
			try {
				log.debug("Before Dock Notice");
				preparedStmt.execute();
				conn.commit();
				parentTable = 1;
				log.debug("parentTable=" + parentTable);
				log.debug("After Dock Notice");
			} catch (SQLException e1) {
				log.error("SQLException From DockNoticeDB Class" + Arrays.toString(e1.getStackTrace()));
			} finally {
				if (preparedStmt != null) {
					try {
						preparedStmt.close();
						// conn.close();
					} catch (SQLException e) {
						log.error("SQLException From DockNoticeDB Class" + Arrays.toString(e.getStackTrace()));
					}
				}
			}
		}*/
	}

	public void insertDockAbsentForm(Connection conn, LinkedHashMap<String, Object> dataMap) {
		String formName = "Dock Notice";
		String workflowInstanceID = dataMap.get("WORKFLOW_INSTANCE_ID") != null
				? dataMap.get("WORKFLOW_INSTANCE_ID").toString()
				: "";
		try {
			CloudDbSaveUtil.saveFormData("AEM_DOCK_NOTICE_ABSENT_INFO", formName, "", "", workflowInstanceID, dataMap,
					"ABSENT_DATE");
		} catch (IOException ioException) {
			ioException.printStackTrace();
		}
		PreparedStatement preparedStmt = null;
		/*if (conn != null) {
			try {
				conn.setAutoCommit(false);
			} catch (SQLException e1) {
				log.error("SQLException From DockNoticeDB Class" + Arrays.toString(e1.getStackTrace()));
			} catch (Exception e) {
				log.error("Exception From DockNoticeDB Class" + Arrays.toString(e.getStackTrace()));
			}
			String tableName = "AEM_DOCK_NOTICE_ABSENT_INFO";
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

			try {
				preparedStmt = conn.prepareStatement(sql.toString());
			} catch (SQLException e) {
				log.error("SQLException From DockNoticeDB Class" + Arrays.toString(e.getStackTrace()));
			} catch (Exception e) {
				log.error("Exception From DockNoticeDB Class" + Arrays.toString(e.getStackTrace()));
			}
			int i = 0;
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
				log.error("SQLException From DockNoticeDB Class" + Arrays.toString(e.getStackTrace()) + "Error Message"
						+ e.getMessage());
			} catch (Exception e) {
				log.error("Exception From DockNoticeDB Class" + Arrays.toString(e.getStackTrace()) + "Error Message"
						+ e.getMessage());
			}
			try {
				log.debug("Before Dock Notice Absent Info");
				preparedStmt.execute();
				conn.commit();
				log.debug("After Dock Notice Absent Info");
			} catch (SQLException e1) {
				log.error("SQLException From DockNoticeDB Class" + Arrays.toString(e1.getStackTrace()) + "Error Message"
						+ e1.getMessage());
			} catch (Exception e) {
				log.error("Exception From DockNoticeDB Class" + Arrays.toString(e.getStackTrace()) + "Error Message"
						+ e.getMessage());
				e.printStackTrace();
			} finally {
				if (preparedStmt != null) {
					try {
						preparedStmt.close();
						// conn.close();
					} catch (SQLException e) {
						log.error("SQLException From DockNoticeDB Class" + Arrays.toString(e.getStackTrace())
								+ "Error Message" + e.getMessage());
					} catch (Exception e) {
						log.error("Exception From DockNoticeDB Class" + Arrays.toString(e.getStackTrace())
								+ "Error Message" + e.getMessage());
					}
				}
			}
		}*/
	}

}
