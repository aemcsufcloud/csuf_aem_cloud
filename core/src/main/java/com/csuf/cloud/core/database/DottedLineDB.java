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

@Component(property = { "service.description=Dotted Line DB", "service.vendor=ThoughtFocus",
		"process.label=Dotted Line DB" })

public class DottedLineDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(DottedLineDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_DOTTED_LINE_NON_CHRS";
		String formName = "Dotted Line Non CHRS";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
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
								log.debug("eElement : " + eElement);
								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", eElement.getElementsByTagName("CaseID").item(0).getTextContent());
								dataMap.put("EMAIL",
										eElement.getElementsByTagName("CampusEmail").item(0).getTextContent());
								dataMap.put("FIRST_NAME",
										eElement.getElementsByTagName("FirstName").item(0).getTextContent());
								dataMap.put("LAST_NAME",
										eElement.getElementsByTagName("LastName").item(0).getTextContent());
								dataMap.put("HR_DEPARTMENT",
										eElement.getElementsByTagName("HRDepartment").item(0).getTextContent());
								dataMap.put("JOB_DESCRIPTION",
										eElement.getElementsByTagName("OpenJobDesc").item(0).getTextContent());
								
								dataMap.put("MANAGER_EMAIL",
										eElement.getElementsByTagName("ManagerEmailId").item(0).getTextContent());
								dataMap.put("MANAGER_FIRSTNAME",
										eElement.getElementsByTagName("ManagerFirstName").item(0).getTextContent());
								dataMap.put("MANAGER_LASTNAME",
										eElement.getElementsByTagName("ManagerLastName").item(0).getTextContent());
								
								String reqDate = eElement.getElementsByTagName("RequestDate").item(0)
										.getTextContent();
								Object reqDateObj = null;
								if (reqDate != null && reqDate != "") {
									Date reqDateNew = Date.valueOf(reqDate);
									reqDateObj = reqDateNew;
								}
								dataMap.put("REQUEST_DATE", reqDateObj);
								
								String stDate = eElement.getElementsByTagName("StartDate").item(0)
										.getTextContent();
								Object stDateObj = null;
								if (stDate != null && stDate != "") {
									Date stDateNew = Date.valueOf(stDate);
									stDateObj = stDateNew;
								}
								dataMap.put("START_DATE", stDateObj);
								
								String endDate = eElement.getElementsByTagName("EndDate").item(0)
										.getTextContent();
								Object endDateObj = null;
								if (endDate != null && endDate != "") {
									Date endDateNew = Date.valueOf(endDate);
									endDateObj = endDateNew;
								}
								dataMap.put("END_DATE", endDateObj);
								
								
								dataMap.put("INITIATOR_SIGNATURE",
										eElement.getElementsByTagName("InitiatorSignature").item(0).getTextContent());
								dataMap.put("INITIATOR_COMMENTS",
										eElement.getElementsByTagName("InitiatorComments").item(0).getTextContent());
								String initiatorDate = eElement.getElementsByTagName("InitiatorDate").item(0)
										.getTextContent();
								Object initiatorDateObj = null;
								if (initiatorDate != null && initiatorDate != "") {
									Date iniDateNew = Date.valueOf(initiatorDate);
									initiatorDateObj = iniDateNew;
								}
								dataMap.put("INITIATOR_DATE", initiatorDateObj);
								
								dataMap.put("MANAGER_SIGNATURE",
										eElement.getElementsByTagName("ManagerSignature").item(0).getTextContent());
								dataMap.put("MANAGER_COMMENTS",
										eElement.getElementsByTagName("MangerComments").item(0).getTextContent());
								String managerDate = eElement.getElementsByTagName("ManagerDate").item(0)
										.getTextContent();
								Object managerDateObj = null;
								if (managerDate != null && managerDate != "") {
									Date managerDateNew = Date.valueOf(initiatorDate);
									managerDateObj = managerDateNew;
								}
								dataMap.put("MANAGER_DATE", managerDateObj);
								
								
								dataMap.put("ASCASI_SIGNATURE",
										eElement.getElementsByTagName("ASCASISignature").item(0).getTextContent());
								dataMap.put("ASCASI_COMMENTS",
										eElement.getElementsByTagName("ASCASIComments").item(0).getTextContent());
								String ASCASIDate = eElement.getElementsByTagName("ASCASIDate").item(0)
										.getTextContent();
								Object ascasiDateObj = null;
								if (ASCASIDate != null && ASCASIDate != "") {
									Date ascasciDateNew = Date.valueOf(ASCASIDate);
									ascasiDateObj = ascasciDateNew;
								}
								dataMap.put("ASC_ASI_DATE", ascasiDateObj);
								
								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
								
								
							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.debug("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/

				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "CWID", workflowInstanceID, dataMap,
							"REQUEST_DATE,START_DATE,END_DATE,INITIATOR_DATE,MANAGER_DATE,ASC_ASI_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in CSUFEmergencyAssistanceGrantDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				/*if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in CSUFEmergencyAssistanceGrantDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}*/
			}

		}

	}

}
