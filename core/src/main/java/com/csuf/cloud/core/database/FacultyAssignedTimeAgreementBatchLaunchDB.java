package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
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
import com.csuf.cloud.core.services.EmailService;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.services.TaskService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;
import com.csuf.cloud.core.vo.EmailServiceVO;

@Component(property = { "service.description=Faculty Assigned Time Agreement Batch Launch Save",
		"service.vendor=ThoughtFocus", "process.label=FacultyAssignedTimeAgreementBatchLaunchDB" })
public class FacultyAssignedTimeAgreementBatchLaunchDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private TaskService taskService;

	@Reference
	private EmailService emailService;

	private static final Logger log = LoggerFactory.getLogger(FacultyAssignedTimeAgreementBatchLaunchDB.class);

	private static final transient String DEFAULT_IMAGE_PATH = "/content/dam/csu/CSUF_Mailer_logo.gif";
	private static final transient String FROM_EMAIL = "csuf@fullerton.edu";
	private static final transient String TO_EMAIL = "chaitanya.sai@thoughtfocus.com";
	private static final transient String BCC_EMAIL = "chaitanya.sai@thoughtfocus.com";
	private static final transient String EMAIL_SUBJECT = "AEM Faculty Assigned Time Agreement Batch Launch Data Insertion Failure";
	private static final transient String NOTIFICATION_EMAIL_DEFAULT_TEMPLATE_PATH = "/etc/notification/email/csuf/Faculty_Assigned_Time_Agreement_Batch_Templates/Faculty_Assigned_Batch_Launch_Data_Insertion.html";
	String initiatorName = "";

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String params = processArguments.get("PROCESS_ARGS", String.class);
		String tableName = "AEM_AT_GUIDELINES_DATA";
		String detailsTableName = "AEM_AT_BATCH_LAUNCH_DETAILS";
		String formName = "Faculty Assigned Time Agreement [AT Guidelines] Batch Launch";

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
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
								log.debug("index=" + temp);

								if (params.equalsIgnoreCase("BatchLaunchData")) {
									saveBatchLaunchData(formName, conn, tableName, eElement, workflowInstanceID);
								} else if (params.equalsIgnoreCase("BatchLaunchDetails")) {
									saveBatchLaunchDetails(formName, conn, detailsTableName, eElement, dataXML,
											payloadPath, workflowInstanceID);
								}
							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());

							}
						}
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
						log.debug("IOException in FacultyAssignedTimeAgreementDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				/*if (conn != null) { try { conn.close(); } catch (SQLException e) { } }*/
			}

		}
	}

	public void saveBatchLaunchData(String formName, Connection conn, String tableName, Element eElement,
			String workflowInstanceID) {
		try {
			LinkedHashMap<String, Object> dataMapInfo = null;
			String cwid = "";
			String name = "";
			String email = "";
			String deptId = "";
			String department = "";
			String college = "";
			String startTerm = "";
			String endTerm = "";
			String wtu = "";
			String timeReason = "";
			String briefDescription = "";
			String chairName = "";
			String chairEmail = "";
			String alternateApproverName = "";
			String alternateApproverDept = "";
			String alternateApproverEmail = "";
			initiatorName = eElement.getElementsByTagName("InitiatorName").item(0).getTextContent();

			for (int j = 0; j < eElement.getElementsByTagName("Row1").getLength(); j++) {

				for (int k = 0; k < eElement.getElementsByTagName("Row1").item(j).getChildNodes().getLength(); k++) {
					String nodeName = eElement.getElementsByTagName("Row1").item(j).getChildNodes().item(k)
							.getNodeName();

					String nodeValue = eElement.getElementsByTagName("Row1").item(j).getChildNodes().item(k)
							.getTextContent();

					if (nodeName.contains("Cwid")) {
						cwid = nodeValue;
					}
					if (nodeName.contains("FacultyName")) {
						name = nodeValue;
					}
					if (nodeName.contains("FacultyEmail")) {
						email = nodeValue;
					}
					if (nodeName.contains("DeptId")) {
						deptId = nodeValue;
					}
					if (nodeName.contains("Department")) {
						department = nodeValue;
					}
					if (nodeName.contains("College")) {
						college = nodeValue;
					}
					if (nodeName.contains("StartTerm")) {
						startTerm = nodeValue;
					}
					if (nodeName.contains("EndTerm")) {
						endTerm = nodeValue;
					}
					if (nodeName.contains("WTUUnits")) {
						wtu = nodeValue;
					}
					if (nodeName.contains("TimeReasons")) {
						timeReason = nodeValue;
					}
					if (nodeName.contains("BriefDescription")) {
						briefDescription = nodeValue;
					}
					if (nodeName.contains("ChairName")) {
						chairName = nodeValue;
					}
					if (nodeName.contains("ChairEmail")) {
						chairEmail = nodeValue;
					}
					if (nodeName.contains("AlternateApproverName")) {
						alternateApproverName = nodeValue;
					}
					if (nodeName.contains("AlternateApproverDept")) {
						alternateApproverDept = nodeValue;
					}
					if (nodeName.contains("AlternateApproverEmail")) {
						alternateApproverEmail = nodeValue;
					}
				}
				dataMapInfo = new LinkedHashMap<String, Object>();

				dataMapInfo.put("COLLEGE", college);
				dataMapInfo.put("DEPARTMENT", department);
				dataMapInfo.put("DEPT_ID", deptId);
				dataMapInfo.put("FULL_NAME", name);
				dataMapInfo.put("CWID", cwid);
				dataMapInfo.put("EMAIL", email);
				dataMapInfo.put("START_TERM", startTerm);
				dataMapInfo.put("END_TERM", endTerm);
				dataMapInfo.put("WTU", wtu);
				dataMapInfo.put("TIME_REASON", timeReason);
				dataMapInfo.put("BRIEF_ASSIGNMENT", briefDescription);
				dataMapInfo.put("DEPT_CHAIR_NAME", chairName);
				dataMapInfo.put("DEPT_CHAIR_EMAIL", chairEmail);
				dataMapInfo.put("ALTERNATE_APPROVER_NAME", alternateApproverName);
				dataMapInfo.put("ALTERNATE_APPROVER_DEPT", alternateApproverDept);
				dataMapInfo.put("ALTERNATE_APPROVER_EMAIL", alternateApproverEmail);
				dataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					dbUtil.insertFormData(conn, dataMapInfo, tableName, formName);
				} else {
					log.error("Connection Unsuccessfull");
				}*/
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "CWID", workflowInstanceID, dataMapInfo, "");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}

			}
		} catch (Exception e) {
			log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			log.error("Failed to insert Faculty Assigned Time Agreement Batch Launch Data");
			sendEmailtoAdmin();
		}
	}

	public void saveBatchLaunchDetails(String formName, Connection conn, String tableName, Element eElement,
			String data, String payload, String wid) {
		LinkedHashMap<String, Object> dataMapInfo = null;
		dataMapInfo = new LinkedHashMap<String, Object>();
		initiatorName = eElement.getElementsByTagName("InitiatorName").item(0).getTextContent();

		dataMapInfo.put("INITIATOR_NAME", initiatorName);
		dataMapInfo.put("INITIATOR_CWID", eElement.getElementsByTagName("InitiatorCwid").item(0).getTextContent());
		dataMapInfo.put("INITIATOR_USER_ID", eElement.getElementsByTagName("InitiatorUserId").item(0).getTextContent());
		dataMapInfo.put("INITIATOR_EMAIL_ID",
				eElement.getElementsByTagName("InitiatorEmailId").item(0).getTextContent());
		String initiatedDate = eElement.getElementsByTagName("InitiatedDate").item(0).getTextContent();
		Object initiatedDateObj = "";
		if (initiatedDate != null && initiatedDate != "") {
			Date initiatedDateNew = Date.valueOf(initiatedDate);
			initiatedDateObj = initiatedDateNew;
		}
		dataMapInfo.put("INITIATED_DATE", initiatedDateObj);
		dataMapInfo.put("RECORDS_COUNT", eElement.getElementsByTagName("RecordsCount").item(0).getTextContent());
		dataMapInfo.put("DATA_XML", data);
		dataMapInfo.put("PAYLOAD_PATH", payload);
		dataMapInfo.put("WORKFLOW_INSTANCE_ID", wid);

		/*if (conn != null) {
			DatabaseUtils dbUtil = new DatabaseUtils();
			log.error("Connection Successfull");
			dbUtil.insertFormData(conn, dataMapInfo, tableName, formName);
		} else {
			log.error("Connection Unsuccessfull");
		}*/
		String initiatorCwid = dataMapInfo.get("INITIATOR_CWID") != null
				? dataMapInfo.get("INITIATOR_CWID").toString()
				: "";
		try {
			CloudDbSaveUtil.saveFormData(tableName, formName, initiatorCwid, "INITIATOR_CWID", wid, dataMapInfo,
					"INITIATED_DATE");
		} catch (IOException ioException) {
			ioException.printStackTrace();
		}

	}

	public void sendEmailtoAdmin() {
		EmailServiceVO emailVO = new EmailServiceVO();
		emailVO.setUseCQGateway(false);
		List<String> toList = new ArrayList<String>();
		toList.add(TO_EMAIL);
		Map<String, String> templateVaribles = new HashMap<>();
		templateVaribles.put("iName", initiatorName);
		emailVO.setTemplateVaribles(templateVaribles);
		emailVO.setToName("Admin");
		emailVO.setToAddress(toList);
		emailVO.setFromAddress(FROM_EMAIL);
		emailVO.setFromName(FROM_EMAIL);
		List<String> bccList = new ArrayList<String>();
		bccList.add(BCC_EMAIL);
		emailVO.setBccAddress(bccList);
		emailVO.setSubject(EMAIL_SUBJECT);
		emailVO.setTemplatePath(NOTIFICATION_EMAIL_DEFAULT_TEMPLATE_PATH);
		emailVO.setEmbeddedImage(true);
		emailVO.setEmbeddedImagePath(DEFAULT_IMAGE_PATH);
		emailVO.setEmbeddedImageDescription("CSUF Logo");
		emailVO.setStartTLS(false);
		sendEmail(emailVO);
	}

	private void sendEmail(EmailServiceVO emailVO) {
		try {

			List<String> emailFailureList = emailService.sendEmail(emailVO);

			if (null != emailFailureList && !emailFailureList.isEmpty()) {
				log.error("Reminder Email sending failed to these recipients: {}", emailFailureList.toString());
			} else if (null != emailFailureList && emailFailureList.isEmpty()) {
				log.info("Reminder Email sent successfully to these recipients: {}", emailVO.getToAddress());
			} else {
				log.error("FATAL : Reminder Email sending failed");
			}
		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
	}

}
