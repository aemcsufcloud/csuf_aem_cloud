package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
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
import com.csuf.cloud.core.utils.DatabaseUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=CSUF Faculty Spl Consultant DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=FacultySplConsultantDB" })
public class FacultySplConsultantStipendDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(FacultySplConsultantStipendDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_FACULTY_SPL_STIPEND";
		String formName = "Faculty Special Consultant Stipend";
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		DatabaseUtils dbUtil = new DatabaseUtils();
		Document doc = null;
		InputStream is = null;
		String departmentId = "";
		String agencyVal = "";
		String unitVal = "";
		String monthVal = "";
		String batchSession = "";
		String yearVal = "";
		String empId = "";
		String initials = "";
		String lastName = "";
		String classNo = "";
		String serial = "";
		String grossAmount = "";
		String days = "";
		String dailyRate = "";
		String cmsPositionNumber = "";
		String commentVal = "";
		String totalGrossAmount = "";
		String totalDays = "";
		String totalDailyRate = "";
		String optionalReviewerName = "";
		String optionalReviewerUserId = "";
		String optionalReviewerEmail = "";
		String optionalReviewerFlag = "";		
		String authCB = "";
		String authSign = "";
		String authExt = "";
		String authDate = "";
		String optionalCB = "";
		String optionalSign = "";
		String optionalDate = "";
		String optionalComment = "";
		String payRollCB = "";
		String payRollSign = "";
		String payRollDate = "";
		String payRollComment = "";
		String managerCB = "";
		String managerSign = "";
		String managerDate = "";
		String managerComment = "";
		String workflowInstanceID = "";
		LinkedHashMap<String, Object> dataMapEmpInfo = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		log.info("DataSourceVal==========" + dataSourceVal);
		conn = jdbcConnectionService.getDBConn(dataSourceVal);
		log.info("Connection==========" + conn);

		if (conn != null) {
			while (xmlFiles.hasNext()) {
				workflowInstanceID = workItem.getWorkflow().getId();
				Resource attachmentXml = xmlFiles.next();
				String filePath = attachmentXml.getPath();

				log.info("filePath= " + filePath);
				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					log.info("xmlFiles=" + filePath);
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
					} catch (ValueFormatException e2) {
						log.error("Exception1=" + e2.getMessage());
						e2.printStackTrace();
					} catch (PathNotFoundException e2) {
						log.error("Exception2=" + e2.getMessage());
						e2.printStackTrace();
					} catch (RepositoryException e2) {
						log.error("Exception3=" + e2.getMessage());
						e2.printStackTrace();
					}
					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.info("ParserConfigurationException=" + e1);
							e1.printStackTrace();
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.info("IOException=" + e1);
							e1.printStackTrace();
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;

								departmentId = eElement.getElementsByTagName("DepartmentId").item(0).getTextContent();
								agencyVal = eElement.getElementsByTagName("Agency").item(0).getTextContent();
								unitVal = eElement.getElementsByTagName("Unit").item(0).getTextContent();
								monthVal = eElement.getElementsByTagName("Month").item(0).getTextContent();
								batchSession = eElement.getElementsByTagName("BatchSession").item(0).getTextContent();
								yearVal = eElement.getElementsByTagName("Year").item(0).getTextContent();
							
							    totalGrossAmount = eElement.getElementsByTagName("TotalGrossAmount").item(0).getTextContent();
								totalDays = eElement.getElementsByTagName("TotalDays").item(0).getTextContent();
								totalDailyRate = eElement.getElementsByTagName("TotalDailyRates").item(0).getTextContent();
								
								optionalReviewerName = eElement.getElementsByTagName("OptionalReviewerName").item(0).getTextContent();
								optionalReviewerUserId = eElement.getElementsByTagName("OptionalReviewerUserId").item(0).getTextContent();
								optionalReviewerEmail = eElement.getElementsByTagName("OptionalReviewerEmailId").item(0).getTextContent();
								optionalReviewerFlag = eElement.getElementsByTagName("OptionalReviewerFlag").item(0).getTextContent();
								
								authCB = eElement.getElementsByTagName("AuthCB").item(0).getTextContent();
								authSign = eElement.getElementsByTagName("AuthSign").item(0).getTextContent();
								authExt = eElement.getElementsByTagName("AuthEmail").item(0).getTextContent();
								authDate = eElement.getElementsByTagName("AuthDate").item(0).getTextContent(); 
								
								optionalCB = eElement.getElementsByTagName("OptionalReviewerCB").item(0).getTextContent();
								optionalSign = eElement.getElementsByTagName("OptionalReviewerSignature").item(0).getTextContent();
								optionalDate = eElement.getElementsByTagName("OptionalReviewerSignatureDate").item(0).getTextContent();
								optionalComment = eElement.getElementsByTagName("OptionalReviewerComments").item(0).getTextContent();
								
								payRollCB = eElement.getElementsByTagName("PayRollCB").item(0).getTextContent();
								payRollSign = eElement.getElementsByTagName("PayRollSign").item(0).getTextContent();
								payRollDate = eElement.getElementsByTagName("PayRollDate").item(0).getTextContent();
								payRollComment = eElement.getElementsByTagName("PayrollComments").item(0).getTextContent(); 
								
								managerCB = eElement.getElementsByTagName("ManagerCB").item(0).getTextContent();
								managerSign = eElement.getElementsByTagName("ManagerSign").item(0).getTextContent();
								managerDate = eElement.getElementsByTagName("ManagerDate").item(0).getTextContent();
								managerComment = eElement.getElementsByTagName("SupervisorComments").item(0).getTextContent();
								
								dataMapEmpInfo = new LinkedHashMap<String, Object>();
								dataMapEmpInfo.put("DEPT_ID", departmentId);
								dataMapEmpInfo.put("AGENCY", agencyVal);
								dataMapEmpInfo.put("UNIT", unitVal);
								dataMapEmpInfo.put("MONTH", monthVal);
								dataMapEmpInfo.put("BATCH_SESSION", batchSession);
								dataMapEmpInfo.put("YEAR", yearVal);
								for (int k = 1; k <= 16; k++) {
									String indexVal = String.valueOf(k);
									String empIdObt = eElement.getElementsByTagName("EmpId".concat(indexVal)).item(0)
											.getTextContent();

									if ((empIdObt != null && empIdObt != "")) {
										empId = eElement.getElementsByTagName("EmpId".concat(indexVal)).item(0)
												.getTextContent();
										
										days = eElement.getElementsByTagName("Day".concat(indexVal)).item(0)
												.getTextContent();
										initials = eElement.getElementsByTagName("Initials".concat(indexVal)).item(0)
												.getTextContent();
										lastName = eElement.getElementsByTagName("LastName".concat(indexVal)).item(0)
												.getTextContent();
										classNo = eElement.getElementsByTagName("Class".concat(indexVal)).item(0)
												.getTextContent();
										serial = eElement.getElementsByTagName("Serial".concat(indexVal)).item(0)
												.getTextContent();
										dailyRate = eElement.getElementsByTagName("DailyRate".concat(indexVal)).item(0)
												.getTextContent();
										cmsPositionNumber = eElement.getElementsByTagName("CMSPosNum".concat(indexVal)).item(0)
												.getTextContent();
										grossAmount = eElement.getElementsByTagName("GrossAmount".concat(indexVal)).item(0)
												.getTextContent();
										
										commentVal = eElement.getElementsByTagName("Comments".concat(indexVal)).item(0)
												.getTextContent();

										dataMapEmpInfo.put("EMPID", empId);
										dataMapEmpInfo.put("INITIALS", initials);
										dataMapEmpInfo.put("LASTNAME", lastName);
										dataMapEmpInfo.put("CLASS", classNo);
										dataMapEmpInfo.put("SERIAL", serial);
										dataMapEmpInfo.put("DAYS", days);
										dataMapEmpInfo.put("DAILYRATE", dailyRate);
										dataMapEmpInfo.put("CMS_POS_NUM", cmsPositionNumber);
										dataMapEmpInfo.put("GROSS_AMOUNT", grossAmount);
										dataMapEmpInfo.put("COMMENTS", commentVal);
										dataMapEmpInfo.put("TOTAL_GROSS_AMOUNT", totalGrossAmount);
										dataMapEmpInfo.put("TOTAL_DAYS", totalDays);
										dataMapEmpInfo.put("TOTAL_DAILYTRATE", totalDailyRate);
										
										dataMapEmpInfo.put("OPTIONAL_REVIEWER_NAME", optionalReviewerName);
										dataMapEmpInfo.put("OPTIONAL_REVIEWER_USERID", optionalReviewerUserId);
										dataMapEmpInfo.put("OPTIONAL_REVIEWER_EMAIL", optionalReviewerEmail);
										dataMapEmpInfo.put("OPTIONAL_REVIEWER_FLAG", optionalReviewerFlag);
										
										dataMapEmpInfo.put("AUTH_CB", authCB);
										dataMapEmpInfo.put("AUTH_SIGN", authSign);
										dataMapEmpInfo.put("AUTH_EXT", authExt);
										Object authDateObj = null;
										if (authDate != null && authDate != "") {
											Date authDateNew = Date.valueOf(authDate);
											authDateObj = authDateNew;
										}
										dataMapEmpInfo.put("AUTH_DATE", authDateObj);
										dataMapEmpInfo.put("OPTIONAL_REVIEWER_CB", optionalCB);
										dataMapEmpInfo.put("OPTIONAL_REVIEWER_SIGN", optionalSign);
										Object optionalDateObj = null;
										if (optionalDate != null && optionalDate != "") {
											Date optionalDateNew = Date.valueOf(optionalDate);
											optionalDateObj = optionalDateNew;
										}
										dataMapEmpInfo.put("OPTIONAL_REVIEWER_DATE", optionalDateObj);
										dataMapEmpInfo.put("OPTIONAL_REVIEWER_COMMENT", optionalComment);
										dataMapEmpInfo.put("PAYROLL_CB", payRollCB);
										dataMapEmpInfo.put("PAYROLL_SIGN", payRollSign);
										Object payRollDateObj = null;
										if (payRollDate != null && payRollDate != "") {
											Date payRollDateNew = Date.valueOf(payRollDate);
											payRollDateObj = payRollDateNew;
										}
										dataMapEmpInfo.put("PAYROLL_DATE", payRollDateObj);
										dataMapEmpInfo.put("PAYROLL_COMMENTS", payRollComment);
										dataMapEmpInfo.put("MANAGER_CB", managerCB);
										dataMapEmpInfo.put("MANAGER_SIGN", managerSign);
										Object managerDateObj = null;
										if (managerDate != null && managerDate != "") {
											Date managerDateNew = Date.valueOf(managerDate);
											managerDateObj = managerDateNew;
										}
										dataMapEmpInfo.put("MANAGER_DATE", managerDateObj);
										dataMapEmpInfo.put("MANAGER_COMMENTS", managerComment);
										dataMapEmpInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
										dbUtil.insertFormData(conn, dataMapEmpInfo, tableName, formName);
									
									}
								}
							}
						}
						if (conn != null) {
							DatabaseUtils dbUtil1 = new DatabaseUtils();
							log.error("Connection Successfull");
							String resultData = dbUtil1.getSPEEvalData(conn, empId, "EmpId", workflowInstanceID, tableName);
							if (resultData != null && !resultData.equals("")) {
								dbUtil1.deleteSPEEvalData(conn, empId, "EmpId", workflowInstanceID, tableName);
								dbUtil1.insertFormData(conn, dataMapEmpInfo, tableName, formName);
							} else {						
								dbUtil1.insertFormData(conn, dataMapEmpInfo, tableName, formName);
							}
						}


						
					} catch (SAXException e) {
						log.error("SAXException=" + e.getMessage());
						e.printStackTrace();
					} catch (Exception e) {
						log.error("Exception=" + e.getMessage());
						e.printStackTrace();
					}

					finally {
						try {
							is.close();
							conn.close();
						} catch (IOException e) {
							log.error("IOException=" + e.getMessage());
							e.printStackTrace();
						} catch (SQLException e) {
							e.printStackTrace();
						}

					}

				}
			}
		}
	}

}
