package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
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
import com.csuf.cloud.core.utils.DatabaseUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Peronnel File Access Request Save in DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=PersonalFileAccessRequestDB" })
public class PersonnelFileAccessRequestDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(PersonnelFileAccessRequestDB.class);

	
	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;


	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {

		Connection conn = null;

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;
		
		String workflowInstanceID = "";
		
		String tableName = "AEM_PERSONNEL_FILE_ACCESS_REQ";
		String formName = "Personnel File Access Request";
		DatabaseUtils dbUtil = new DatabaseUtils();
		String chrsId = "";
		String first_Name = "";
		String last_Name = "";
		String middle_Initials = "";
		String date_Initiated = "";
		String empl_ID = "";
		String campus_Phone = "";
		String cell_Phone = "";
		String dept_ID = "";
		String department = "";
		String email = "";
		String viewPersonnelFile = "";
		String obtainCopies = "";
		String copy1 = "";
		String copy2 = "";
		String copy3 = "";
		String copy4 = "";
		String copy5 = "";
		String copy6 = "";
		String authorizeUnionRep = "";
		String nameOfUnionRep = "";
		String other = "";
		String other1 = "";
		String other2 = "";
		String other3 = "";
		String other4 = "";
		String employeeSignature = "";
		String employeeDate = "";
		String employeeComments = "";
		String hrdiSignature = "";
		String hrdiSignatureDate = "";
		String hrdiSignatureComments = "";
		String scheduledReviewDate = "";
		String scheduledReviewTime = "";
		String copiesProvidedDate = "";
		String copieProvidedTime = "";

		LinkedHashMap<String, Object> dataMap = null;

		Resource xmlNode = resolver.getResource(payloadPath);
		
		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		
		workflowInstanceID = workItem.getWorkflow().getId();
		log.info("workflowInstanceID= " + workflowInstanceID);
		while (xmlFiles.hasNext()) {
			Resource attachmentXml = xmlFiles.next();
			String filePath = attachmentXml.getPath();

			if (filePath.contains("Data.xml")) {
				filePath = attachmentXml.getPath().concat("/jcr:content");
				Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
				try {
					is = subNode.getProperty("jcr:data").getBinary().getStream();
				} catch (ValueFormatException e) {
					log.error("ValueFormatException from PersonnelFileAccessRequestDB="
							+ Arrays.toString(e.getStackTrace()));
				} catch (PathNotFoundException e) {
					log.error("PathNotFoundException from PersonnelFileAccessRequestDB="
							+ Arrays.toString(e.getStackTrace()));
				} catch (RepositoryException e) {
					log.error("RepositoryException from PersonnelFileAccessRequestDB="
							+ Arrays.toString(e.getStackTrace()));
				}

				try {
					DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
					DocumentBuilder dBuilder = null;
					try {
						dBuilder = dbFactory.newDocumentBuilder();
					} catch (ParserConfigurationException e) {
						log.error("ParserConfigurationException from PersonnelFileAccessRequestDB="
								+ Arrays.toString(e.getStackTrace()));
					}
					try {
						doc = dBuilder.parse(is);
					} catch (IOException e) {
						log.error(
								"IOException from PersonnelFileAccessRequestDB=" + Arrays.toString(e.getStackTrace()));
					}
					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);

						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
							chrsId = eElement.getElementsByTagName("chrsId").item(0).getTextContent();
							first_Name = eElement.getElementsByTagName("First_Name").item(0).getTextContent();
							last_Name = eElement.getElementsByTagName("Last_Name").item(0).getTextContent();
							middle_Initials = eElement.getElementsByTagName("Middle_Initials").item(0).getTextContent();
							date_Initiated = eElement.getElementsByTagName("Date_Initiated").item(0).getTextContent();
							empl_ID = eElement.getElementsByTagName("Empl_ID").item(0).getTextContent();
							campus_Phone = eElement.getElementsByTagName("Campus_Phone").item(0).getTextContent();
							cell_Phone = eElement.getElementsByTagName("Cell_Phone").item(0).getTextContent();
							dept_ID = eElement.getElementsByTagName("Dept_ID").item(0).getTextContent();
							department = eElement.getElementsByTagName("Department").item(0).getTextContent();
							email = eElement.getElementsByTagName("Email").item(0).getTextContent();
							viewPersonnelFile = eElement.getElementsByTagName("ViewPersonnelFile").item(0)
									.getTextContent();
							obtainCopies = eElement.getElementsByTagName("ObtainCopies").item(0).getTextContent();
							copy1 = eElement.getElementsByTagName("Copy1").item(0).getTextContent();
							copy2 = eElement.getElementsByTagName("Copy2").item(0).getTextContent();
							copy3 = eElement.getElementsByTagName("Copy3").item(0).getTextContent();
							copy4 = eElement.getElementsByTagName("Copy4").item(0).getTextContent();
							copy5 = eElement.getElementsByTagName("Copy5").item(0).getTextContent();
							copy6 = eElement.getElementsByTagName("Copy6").item(0).getTextContent();
							authorizeUnionRep = eElement.getElementsByTagName("AuthorizeUnionRep").item(0)
									.getTextContent();
							nameOfUnionRep = eElement.getElementsByTagName("NameOfUnionRep").item(0).getTextContent();
							other = eElement.getElementsByTagName("Other").item(0).getTextContent();
							other1 = eElement.getElementsByTagName("Other1").item(0).getTextContent();
							other2 = eElement.getElementsByTagName("Other2").item(0).getTextContent();
							other3 = eElement.getElementsByTagName("Other3").item(0).getTextContent();
							other4 = eElement.getElementsByTagName("Other4").item(0).getTextContent();
							employeeSignature = eElement.getElementsByTagName("EmployeeSignature").item(0)
									.getTextContent();
							employeeDate = eElement.getElementsByTagName("EmployeeDate").item(0).getTextContent();
							employeeComments = eElement.getElementsByTagName("EmployeeComments").item(0).getTextContent();

							/*
							 * hrdiCompletingRequest =
							 * eElement.getElementsByTagName("HRDICompletingRequest")
							 * .item(0).getTextContent();
							 */
							hrdiSignature = eElement.getElementsByTagName("HRSignature").item(0)
									.getTextContent();
							hrdiSignatureDate = eElement.getElementsByTagName("HRDate").item(0).getTextContent();
							hrdiSignatureComments = eElement.getElementsByTagName("HRComments").item(0).getTextContent();
							
							scheduledReviewDate = eElement.getElementsByTagName("ScheduledReviewDate").item(0)
									.getTextContent();
							scheduledReviewTime = eElement.getElementsByTagName("ScheduledReviewTime").item(0)
									.getTextContent();
							copiesProvidedDate = eElement.getElementsByTagName("CopiesProvidedDate").item(0)
									.getTextContent();
							copieProvidedTime = eElement.getElementsByTagName("CopiesProvidedTime").item(0)
									.getTextContent();
						}
					}

					dataMap = new LinkedHashMap<String, Object>();

					dataMap.put("CHRS_ID", chrsId);
					dataMap.put("FIRST_NAME", first_Name);
					dataMap.put("LAST_NAME", last_Name);
					dataMap.put("MIDDLE_INITIALS", middle_Initials);

					Object date_InitiatedObj = null;
					if (date_Initiated != null && date_Initiated != "") {
						Date date_InitiatedNew = Date.valueOf(date_Initiated);
						date_InitiatedObj = date_InitiatedNew;
					}
					dataMap.put("DATE_INITIATED", date_InitiatedObj);
					dataMap.put("EMPL_ID", empl_ID);
					dataMap.put("CAMPUS_PHONE", campus_Phone);
					dataMap.put("CELL_PHONE", cell_Phone);
					dataMap.put("DEPT_ID", dept_ID);
					dataMap.put("DEPARTMENT", department);
					dataMap.put("EMAIL", email);
					dataMap.put("VIEW_PERSONNEL_FILE", viewPersonnelFile);
					dataMap.put("OBTAIN_COPIES", obtainCopies);
					dataMap.put("COPY1", copy1);
					dataMap.put("COPY2", copy2);
					dataMap.put("COPY3", copy3);
					dataMap.put("COPY4", copy4);
					dataMap.put("COPY5", copy5);
					dataMap.put("COPY6", copy6);
					dataMap.put("AUTHORIZE_UNION_REP", authorizeUnionRep);
					dataMap.put("NAME_OF_UNION_REP", nameOfUnionRep);
					dataMap.put("OTHER", other);
					dataMap.put("OTHER1", other1);
					dataMap.put("OTHER2", other2);
					dataMap.put("OTHER3", other3);
					dataMap.put("OTHER4", other4);
					dataMap.put("EMPLOYEE_SIGNATURE", employeeSignature);

					Object employeeDateObj = null;
					if (employeeDate != null && employeeDate != "") {
						Date employeeDateNew = Date.valueOf(employeeDate);
						employeeDateObj = employeeDateNew;
					}
					dataMap.put("EMPLOYEE_DATE", employeeDateObj);
					dataMap.put("EMP_SIGN_COMMENTS", employeeComments);
					dataMap.put("HR_SIGN", hrdiSignature);
					
					Object hrdiSignatureDateObj = null;
					if (hrdiSignatureDate != null && hrdiSignatureDate != "") {
						Date hrdiSignatureDateNew = Date.valueOf(hrdiSignatureDate);
						hrdiSignatureDateObj = hrdiSignatureDateNew;
					}
					dataMap.put("HR_SIGN_DATE", hrdiSignatureDateObj);
					dataMap.put("HR_SIGN_COMMENTS", hrdiSignatureComments);

					Object scheduledReviewDateObj = null;
					if (scheduledReviewDate != null && scheduledReviewDate != "") {
						Date scheduledReviewDateNew = Date.valueOf(scheduledReviewDate);
						scheduledReviewDateObj = scheduledReviewDateNew;
					}
					dataMap.put("SCHEDULED_REVIEW_DATE", scheduledReviewDateObj);
					dataMap.put("SCHEDULED_REVIEW_TIME", scheduledReviewTime);

					Object copiesProvidedDateObj = null;
					if (copiesProvidedDate != null && copiesProvidedDate != "") {
						Date copiesProvidedDateNew = Date.valueOf(copiesProvidedDate);
						copiesProvidedDateObj = copiesProvidedDateNew;
					}
					dataMap.put("COPIES_PROVIDED_DATE", copiesProvidedDateObj);
					dataMap.put("COPIES_PROVIDED_TIME", copieProvidedTime);
					
					dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

					if (conn != null) {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}

				} catch (SAXException e) {
					log.error("SAXException from PersonnelFileAccessRequestDB=" + Arrays.toString(e.getStackTrace()));
				} catch (Exception e) {
					log.error("Exception from PersonnelFileAccessRequestDB=" + Arrays.toString(e.getStackTrace()));
				} finally {
					if (null != is)
						try {
							is.close();
						} catch (IOException e) {
							log.error("IOException from Finally Block from PersonnelFileAccessRequestDB="
									+ Arrays.toString(e.getStackTrace()));
						}
					if (conn != null) {
						try {
							conn.close();
						} catch (SQLException e) {
							log.error("SQLException from Finally Block from PersonnelFileAccessRequestDB="
									+ Arrays.toString(e.getStackTrace()));
						}
					}
				}
			}
		}
	}
}
