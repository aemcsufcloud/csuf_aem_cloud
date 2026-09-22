package com.thoughtfocus.aem.csu.core.filenet;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Base64;

import javax.jcr.Node;
import javax.jcr.RepositoryException;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.csuf.cloud.core.services.FormService;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.InboxItemService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.FilenetUtil;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Read SCW Support Doc",
		Constants.SERVICE_VENDOR + "=Thoughtfocus-CSUF", "process.label" + "=SCWSupportingDoc" })
public class CourseWithdrawalSupDocFilenet implements WorkflowProcess {

	@Reference
	private InboxItemService inboxService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private FormService formService;

	protected final Logger logger = LoggerFactory.getLogger(getClass());

	private static final String FORM_NAME = "Student Course Withdrawal";
	private static final String ATTACHMENT_FOLDER_NAME = "Attachments";
	String typeOfForm = "";

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		String args = processArguments.get("PROCESS_ARGS", String.class);
		Connection conn = null;
		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);
		String encodedFile = StringUtils.EMPTY;
		String payloadPath = StringUtils.EMPTY;
		JsonObject json = new JsonObject();
		String firstName = null;
		String lastName = null;
		InputStream sd1 = null;
		String docEncoded1 = null;
		String studentID = null;
		String caseID = null;
		String major = null;
		String termCode = null;
		String termDescription = null;
		String typeOfForm = null;
		String WithdrawalType = null;
		String mimeType = null;
		String withdrawalDecision = null;
		String instUID = null;
		String chairUID = null;
		String attachmentMimeType = null;
		Document doc = null;
		String filenet_onbase = globalConfigFilenetService.getfilenet_or_onbase_selection();
		String url = "";
		if (filenet_onbase.equalsIgnoreCase("filenet")) {
			url = globalConfigFilenetService.getFilenetURL();
		} else if (filenet_onbase.equalsIgnoreCase("onbase")) {
			url = globalConfigFilenetService.getOnbaseURL();
		}

		InputStream inputStream = null;
		payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		if (StringUtils.isNotBlank(payloadPath)) {
			InputStream is = null;
			try {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");
				if (null != is) {
					doc = XMLUtils.getDomDocument(is);
					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
							firstName = (eElement.getElementsByTagName("FirstName").item(0).getTextContent());
							lastName = (eElement.getElementsByTagName("LastName").item(0).getTextContent());
							studentID = eElement.getElementsByTagName("StudentID").item(0).getTextContent();
							caseID = eElement.getElementsByTagName("caseId").item(0).getTextContent();
							major = eElement.getElementsByTagName("Major").item(0).getTextContent();
							termCode = eElement.getElementsByTagName("TermCode").item(0).getTextContent();
							termDescription = eElement.getElementsByTagName("TermDesc").item(0).getTextContent();
							typeOfForm = eElement.getElementsByTagName("typeOfForm").item(0).getTextContent();
							if (typeOfForm.equals("1")) {
								WithdrawalType = "Non-Medical";
							} else {
								WithdrawalType = "Medical";
							}
						}
					}
					JsonArray jsonArray = null;
					String workflowInstanceId = workItem.getWorkflow().getId();
					if (StringUtils.isNotBlank(workflowInstanceId)) {
						try {
							if (StringUtils.isBlank(args)) {
								jsonArray = inboxService.getTaskAttachmentsFromWorkflowInstanceId(resolver,
										workflowInstanceId, ATTACHMENT_FOLDER_NAME);
							} else {
								jsonArray = inboxService.getTaskAttachmentsFromWorkflowInstanceId(resolver,
										workflowInstanceId, args);
							}
						} catch (Exception e) {
							logger.error("Exception in SCWSupDocFilenet for RepositoryException="
									+ Arrays.toString(e.getStackTrace()));
						}
					}
					if (jsonArray.size() != 0) {
						for (int i = 0; i < jsonArray.size(); i++) {
							JsonElement elem = jsonArray.get(i);
							JsonObject elem1 = elem.getAsJsonObject();
							String path = (elem1.get("path").toString()).substring(1,
									(elem1.get("path").toString()).length() - 1);
							String subNode1 = (path).concat("/jcr:content");
							Path attachmentSource = Paths.get(path);
							logger.debug("before attachmentMimeType in CourseWithdrawalSupDocFilenet : {}");
							try {
								attachmentMimeType = Files.probeContentType(attachmentSource);
							} catch (IOException e1) {
								logger.error("Mime Type IOException in SCWSupDocFilenet="
										+ Arrays.toString(e1.getStackTrace()));
							}
							logger.debug("after attachmentMimeType in CourseWithdrawalSupDocFilenet : {}");
							Node subNode2 = resolver.getResource(subNode1).adaptTo(Node.class);
							try {
								inputStream = subNode2.getProperty("jcr:data").getBinary().getStream();
								byte[] bytes = IOUtils.toByteArray(inputStream);
								encodedFile = Base64.getEncoder().encodeToString(bytes);
								logger.debug("before adding json in CourseWithdrawalSupDocFilenet : {}");
								json.addProperty("FirstName", firstName);
								json.addProperty("LastName", lastName);
								json.addProperty("withdrawalDecision", withdrawalDecision);
								json.addProperty("chairUID", chairUID);
								json.addProperty("instUID", instUID);
								json.addProperty("CWID", studentID);
								json.addProperty("CaseID", caseID);
								json.addProperty("Major", major);
								json.addProperty("TermCode", termCode);
								json.addProperty("TermDescription", termDescription);
								json.addProperty("Attachment", encodedFile);
								json.addProperty("AttachmentType", "SupportingDocument");
								json.addProperty("AttachmentMimeType", attachmentMimeType);
								json.addProperty("WithdrawalType", WithdrawalType);
								FilenetUtil fUtil = new FilenetUtil();
								// onbase
								if (filenet_onbase.equalsIgnoreCase("filenet")) {
									String resultVal = fUtil.sendToFilenet(json.toString(), url, conn, FORM_NAME);
									logger.debug("Result Value returned from Filenet in SCWSupDocFilenet : {}",
											resultVal);
								} else if (filenet_onbase.equalsIgnoreCase("onbase")) {
									Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");
									if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
										Element element = XMLUtils.getChildNode(afBoundDataElement, "form1");
										FilenetUtil oUtil = new FilenetUtil();
										JsonObject finalJson = prepareOnbaseSupDocKeyWordJson(workflowSession, elem,
												element, oUtil, encodedFile, attachmentMimeType);
										String resultVal = oUtil.sendToOnbase(finalJson.toString(), url, conn,
												FORM_NAME, workflowInstanceId, "", "Attachments",
												XMLUtils.getChildNodeContent(element, "StudentID"),
												XMLUtils.getChildNodeContent(element, "caseId"),
												XMLUtils.getChildNodeContent(element, "FirstName"),
												XMLUtils.getChildNodeContent(element, "LastName"));
										logger.debug("Result Value returned from onbase in SCWSupDocOnbase : {}",
												resultVal);

									}
								}
							} catch (RepositoryException | IOException e) {
								logger.error("ValueFormatException in SCWSupDocFilenet="
										+ Arrays.toString(e.getStackTrace()));
							}
						}

					}
				}
			} catch (Exception e) {
				logger.error("Exception in SCWSupDocFilenet=" + Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						logger.error("IOException in SCWSupDocFilenet for input stream(is)="
								+ Arrays.toString(e.getStackTrace()));
					}
				try {
					if (inputStream != null) {
						inputStream.close();
					}
				} catch (IOException e) {
					logger.error(
							"IOException in SCWSupDocFilenet for input stream=" + Arrays.toString(e.getStackTrace()));
				}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						logger.error("SQLException in SCWSupDocFilenet=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}
	}

	private JsonObject prepareOnbaseSupDocKeyWordJson(WorkflowSession workflowSession, JsonElement elem,
			Element eElement, FilenetUtil oUtil, String encodedFile, String attachmentMimeType) throws IOException {
		JsonObject onbaseJson = new JsonObject();
		String[] keyArray = { "CWID-8", "First_Name-8", "Last_Name-8", "Term-8", "Doc_Type-8", "Term_Description-8",
				"Major-8", "Course_Withdrawal_Type-8", "Case_ID-8" };
		String decision = null;
		String WithdrawalType = null;
		typeOfForm = XMLUtils.getChildNodeContent(eElement, "typeOfForm");
		if (typeOfForm.equals("1")) {
			WithdrawalType = "Non-Medical";
			onbaseJson.addProperty("Document_Type", "RR Course Withdrawal");
		} else {
			WithdrawalType = "Medical";
			onbaseJson.addProperty("Document_Type", "RR Course Withdrawal Medical");
		}
		try {
			String[] KeyValueArray = { XMLUtils.getChildNodeContent(eElement, "StudentID"),
					XMLUtils.getChildNodeContent(eElement, "FirstName"),
					XMLUtils.getChildNodeContent(eElement, "LastName"),
					XMLUtils.getChildNodeContent(eElement, "TermCode"), "SupportingDocument",
					XMLUtils.getChildNodeContent(eElement, "TermDesc"), XMLUtils.getChildNodeContent(eElement, "Major"),
					WithdrawalType, XMLUtils.getChildNodeContent(eElement, "caseId") };
			onbaseJson.add("keywordTypes", oUtil.getKeywords(keyArray, KeyValueArray));
			onbaseJson.addProperty("attachment", encodedFile);
			onbaseJson.addProperty("attachmentMimeType", attachmentMimeType);
			onbaseJson.addProperty("attachmentType", "SupportingDocument");
			if (typeOfForm.equals("1")) {
				onbaseJson.addProperty("Document_Type", "RR Course Withdrawal");
			} else {
				onbaseJson.addProperty("Document_Type", "RR Course Withdrawal Medical");
			}
		} catch (Exception e) {
			logger.error("ValueFormatException in CourseWithdrawalSupDocOnbase=" + Arrays.toString(e.getStackTrace()));
		}
		return onbaseJson;
	}
}
