package com.csuf.cloud.core.workflow;

import java.io.InputStream;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.Session;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONArray;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.Workflow;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.adobe.granite.workflow.model.WorkflowModel;
import com.csuf.cloud.core.services.AssetService;
import com.csuf.cloud.core.services.GlobalConfigService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;
import com.day.cq.search.QueryBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

@Component(property = { "service.description==Start NACHA Workflow Programatically",
		"process.label" + "=ProgramaticallyStartNACHAWorkflowProcess" })
public class ProgramaticallyStartNachaWorkflowProcess implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(ProgramaticallyStartNachaWorkflowProcess.class);

	@Reference
	private QueryBuilder queryBuilder;

	@Reference
	private AssetService assetService;

	/*
	 * @Reference private JDBCConnectionHelperService jdbcConnectionService;
	 */

	@Reference
	private GlobalConfigService globalConfigService;

	private static final String ALLOWED_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	private static final String PAYLOAD_SERVER_PATH = "/var/fd/dashboard/payload/server0";
	private static final String WORKFLOW_MODEL_NAME = "NACHA Form";
	private static final String WORKFLOW_MODEL_PATH = "/var/workflow/models/nacha-form";
	private String nachaFileName = "";

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		InputStream is = null;
		Document doc = null;
		Session session = null;
		WorkflowSession wfSession = null;
		ResourceResolver resolver = null;
		/*
		 * Connection dbConn = null; Connection dbConnFrmmgr = null;
		 */
		String currentworkflowInstanceId = workItem.getWorkflow().getId();
		JsonArray attachmentArray = new JsonArray();
		log.debug("workflowInstanceId = " + currentworkflowInstanceId);
		try {
			
			 /*dbConn = jdbcConnectionService.getDocDBConnection(); 
			 dbConnFrmmgr = jdbcConnectionService.getFrmDBConnection();*/
			
			resolver = workflowSession.adaptTo(ResourceResolver.class);
			session = globalConfigService.getAdminSession();
			wfSession = resolver.adaptTo(WorkflowSession.class);
			WorkflowModel workModel = workflowSession.getModel(WORKFLOW_MODEL_PATH);
			attachmentArray = getTaskAttachmentsFromWorkflowInstanceId(resolver, currentworkflowInstanceId);
			log.debug("attachmentArray = " + attachmentArray);
			String caseId = getCaseId();
			//String xmlData = getXml(caseId, dbConnFrmmgr);
			String xmlData = getXml(caseId, null);
			if (xmlData != null) {
				is = IOUtils.toInputStream(xmlData, StandardCharsets.UTF_8);
				if (null != is) {
					doc = XMLUtils.getDomDocument(is);
					String generatedPayloadPath = CSUFUtils.getRecentlyCreatedPayloadPath(resolver,
							PAYLOAD_SERVER_PATH);
					String newPayloadPath = createNewPayloadPath(session, generatedPayloadPath, doc);
					JsonObject newAttachmentJson = addAttachment(session, attachmentArray, newPayloadPath, resolver);
					log.info("Successfully added the file attachments to the newly created payload : {}",
							newAttachmentJson);
					log.info("newPayloadPath {}", newPayloadPath);
					if (StringUtils.isNotBlank(newPayloadPath)) {
						final Map<String, Object> workflowMetadata = new HashMap<>();
						workflowMetadata.put("workflowTitle", WORKFLOW_MODEL_NAME);
						WorkflowData wfData = wfSession.newWorkflowData("JCR_PATH", newPayloadPath);
						workflowMetadata.entrySet().stream().forEach(arg -> {
							workflowMetadata.put(arg.getKey(), arg.getValue());
							log.debug("workflowMetadata key : {}, value : {}", arg.getKey(), arg.getValue());
						});
						Workflow wf = wfSession.startWorkflow(workModel, wfData, workflowMetadata);
						log.info("wf instance id : {}", wf.getId());
					}
				}
			}
		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		} finally {
			if (resolver != null && resolver.isLive()) {
				resolver.close();
			}
			if (session != null && session.isLive()) {
				session.logout();
			}
			/*if (dbConn != null) {
				try {
					dbConn.close();
				} catch (Exception e) {
					log.error(Arrays.toString(e.getStackTrace()));
				}
			}
			if (dbConnFrmmgr != null) {
				try {
					dbConnFrmmgr.close();
				} catch (Exception e) {
					log.error(Arrays.toString(e.getStackTrace()));
				}
			}*/
		}
	}

	private JsonArray getTaskAttachmentsFromWorkflowInstanceId(ResourceResolver resourceResolver,
			String workflowInstanceId) throws Exception {
		Iterator<Node> itr = null;
		JsonArray formsJson = new JsonArray();
		Session session = resourceResolver.adaptTo(Session.class);
		WorkflowSession wfSession = resourceResolver.adaptTo(WorkflowSession.class);
		String payloadPath = wfSession.getWorkflow(workflowInstanceId).getWorkflowData().getPayload().toString();
		log.debug("payloadPath inside getTaskAttachmentsFromWorkflowInstanceId method : {}", payloadPath);
		if (StringUtils.isNotBlank(payloadPath)) {
			// itr = CSUFUtils.searchNodes(queryBuilder, session, "nt:file",
			// payloadPath.concat("/Attachments"));
			itr = CSUFUtils.searchNodes(queryBuilder, session, "nt:file", payloadPath);
			while (itr.hasNext()) {
				Node node = itr.next();
				String path = node.getPath();
				String fileName = node.getName();
				if (StringUtils.isNotBlank(fileName) && StringUtils.isNotBlank(path)) {
					String fileExtension = CSUFUtils.getFileExtension(fileName);
					if (StringUtils.isNotBlank(fileExtension) && !fileExtension.equalsIgnoreCase("xml")) {
						JsonObject json = new JsonObject();
						nachaFileName = fileName;
						json.addProperty("fileName", fileName);
						json.addProperty("path", path);
						formsJson.add(json);
					}
				}
			}
		} else {
			throw new Exception("payload path is empty inside getTaskAttachmentsFromWorkflowInstanceId method");
		}
		return formsJson;
	}

	private String createNewPayloadPath(Session session, String existingPayload, Document doc) throws Exception {
		ResourceResolver resourceResolver = null;
		String afPath = null;
		existingPayload = existingPayload.concat("/");
		// generate the jcr Node path for the payload for the new Data.xml
		String randomString = CSUFUtils.generateRandomString(26, ALLOWED_CHARS);
		String newJCRPayloadPath = existingPayload.concat(randomString);
		log.debug("The new JCR Payload node path = {}", newJCRPayloadPath);
		try {
			// Element xmlRoot = doc.getDocumentElement();
			Element afParentElement = XMLUtils.getParentNode(doc, "afSubmissionInfo");
			log.debug("afParentElement" + afParentElement);
			if (null != afParentElement && afParentElement.hasChildNodes()) {
				afPath = XMLUtils.getChildNodeContent(afParentElement, "afPath");
				log.debug("afPath = {}", afPath);
			}
			InputStream is = XMLUtils.getInputStreamFromXMLDocument(doc);
			log.debug("Session Value = " + session);
			boolean isNewPayloadJCRPathCreated = assetService.writeNtFileToPayloadPath(session, "Data.xml", afPath,
					newJCRPayloadPath, is);
			log.debug("new payload node got created with status = {}", isNewPayloadJCRPathCreated);
			if (isNewPayloadJCRPathCreated) {
				return newJCRPayloadPath;
			}
		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()), e);
		} finally {
			if (resourceResolver != null && resourceResolver.isLive()) {
				resourceResolver.close();
			}
		}
		return null;
	}

	private JsonObject addAttachment(Session session, JsonArray attachments, String newPayload,
			ResourceResolver resolver) throws Exception {
		int count = 0;
		String attachmentFolder = "Attachments";
		JsonObject resultObj = new JsonObject();
		try {
			for (int i = 0; i < attachments.size(); i++) {
				count = count + 1;
				JsonElement elem = attachments.get(i);
				JsonObject elem1 = elem.getAsJsonObject();
				String path = (elem1.get("path").toString()).substring(1, (elem1.get("path").toString()).length() - 1);
				String subNode1 = (path).concat("/jcr:content");
				Node subNode2 = resolver.getResource(subNode1).adaptTo(Node.class);
				InputStream inputStream = subNode2.getProperty("jcr:data").getBinary().getStream();
				boolean isFileUploadSuccess = assetService.uploadFileToWorkflowPayloadPath(session,
						elem1.get("fileName").getAsString(), newPayload.concat("/").concat(attachmentFolder),
						inputStream);
				if (isFileUploadSuccess) {
					resultObj.add("Success", elem1);
					log.debug("Successfully added the file attachment filename = {}",
							elem1.get("fileName").getAsString());
				} else {
					resultObj.add("Failed", elem1);
					log.debug("Failed to add the file attachment filename = {}", elem1.get("fileName").getAsString());
				}
			}
			if (count == attachments.size()) {
				return resultObj;
			}
		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()), e);
		}
		return null;
	}

	private String getXml(String caseID, Connection dbConnFrmmgr) {
		try {
			DocumentBuilderFactory documentFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder documentBuilder = documentFactory.newDocumentBuilder();
			Document document = documentBuilder.newDocument();
			Element root = document.createElement("afData");
			document.appendChild(root);
			Element afUnboundData = document.createElement("afUnboundData");
			root.appendChild(afUnboundData);
			Element workflowInitiator = document.createElement("workflow_initiator");
			workflowInitiator.appendChild(document.createTextNode("admin"));
			afUnboundData.appendChild(workflowInitiator);
			Element afBoundData = document.createElement("afBoundData");
			root.appendChild(afBoundData);
			Element parentElements = document.createElement("NACHA");
			Attr attr = document.createAttribute("xmlns:xfa");
			attr.setValue("http://www.xfa.org/schema/xfa-data/1.0/");
			parentElements.setAttributeNode(attr);
			Attr attr2 = document.createAttribute("xmlns:xsi");
			attr2.setValue("http://www.w3.org/2001/XMLSchema-instance");
			parentElements.setAttributeNode(attr2);
			afBoundData.appendChild(parentElements);
			parentElements.appendChild(document.createElement("ReviewerComments"));
			parentElements.appendChild(document.createElement("ReviewerID"));
			parentElements.appendChild(document.createElement("ReviewedTime"));
			parentElements.appendChild(document.createElement("ApproverComments"));
			parentElements.appendChild(document.createElement("ApproverID"));
			parentElements.appendChild(document.createElement("ApprovedTime"));
			parentElements.appendChild(document.createElement("SFTPActivityLog"));
			parentElements.appendChild(document.createElement("StageIndicator"));
			parentElements.appendChild(document.createElement("ReviewerCB"));
			parentElements.appendChild(document.createElement("ApproverCB"));
			parentElements.appendChild(document.createElement("FaxConfirmationCB"));
			parentElements.appendChild(document.createElement("FaxConfirmationComments"));
			parentElements.appendChild(document.createElement("FaxConfirmationID"));
			parentElements.appendChild(document.createElement("FaxConfirmationTime"));
			Element aftiaElement = document.createElement("aftiaDescCWID");
			aftiaElement.appendChild(document.createTextNode(caseID));
			parentElements.appendChild(aftiaElement);
			Element caseIdElement = document.createElement("caseId");
			caseIdElement.appendChild(document.createTextNode(caseID));
			parentElements.appendChild(caseIdElement);
			Element emailSubjectElement = document.createElement("EmailSubject");
			emailSubjectElement.appendChild(document.createTextNode("NACHA Form - " + caseID));
			parentElements.appendChild(emailSubjectElement);
			Element nachaFileNameElement = document.createElement("NACHAFileName");
			nachaFileNameElement.appendChild(document.createTextNode(nachaFileName));
			parentElements.appendChild(nachaFileNameElement);
			String nachaFileTitle = nachaFileName.substring(0, nachaFileName.length() - 4);
			JSONArray nachaFilePropertiesArray = getNachaFileProperties(nachaFileTitle, dbConnFrmmgr);
			if (nachaFilePropertiesArray.length() != 0) {
				JSONObject nachaFilePropertiesObject = nachaFilePropertiesArray.getJSONObject(0);
				Element runIDElement = document.createElement("RunId");
				runIDElement
						.appendChild(document.createTextNode(nachaFilePropertiesObject.getString("PROCESSINSTANCE")));
				parentElements.appendChild(runIDElement);
				Element reportDateElement = document.createElement("ReportDate");
				reportDateElement
						.appendChild(document.createTextNode(nachaFilePropertiesObject.getString("BATCH_RUN_DATE")));
				parentElements.appendChild(reportDateElement);
				Element totalAmountElement = document.createElement("TotalAmount");
				totalAmountElement
						.appendChild(document.createTextNode(nachaFilePropertiesObject.getString("REFUND_AMT")));
				parentElements.appendChild(totalAmountElement);
				Element totalCountElement = document.createElement("TotalCount");
				totalCountElement
						.appendChild(document.createTextNode(nachaFilePropertiesObject.getString("BATCH_SEQ_NBR")));
				parentElements.appendChild(totalCountElement);
				Element reportNameElement = document.createElement("ReportName");
				reportNameElement
						.appendChild(document.createTextNode(nachaFilePropertiesObject.getString("REPORT_ID")));
				parentElements.appendChild(reportNameElement);
				Element estimatedSettlementDateElement = document.createElement("EstimatedSettlementDate");
				estimatedSettlementDateElement
						.appendChild(document.createTextNode(nachaFilePropertiesObject.getString("EFFDT")));
				parentElements.appendChild(estimatedSettlementDateElement);
			} else {
				parentElements.appendChild(document.createElement("RunId"));
				parentElements.appendChild(document.createElement("ReportDate"));
				parentElements.appendChild(document.createElement("TotalAmount"));
				parentElements.appendChild(document.createElement("TotalCount"));
				parentElements.appendChild(document.createElement("ReportName"));
				parentElements.appendChild(document.createElement("EstimatedSettlementDate"));
			}
			Element nachaFileTitleElement = document.createElement("Title");
			nachaFileTitleElement.appendChild(document.createTextNode(nachaFileTitle));
			parentElements.appendChild(nachaFileTitleElement);
			parentElements.appendChild(document.createElement("InitialFormSubmittedAttachments"));
			parentElements.appendChild(document.createElement("ReviewerFormSubmittedAttachments"));
			parentElements.appendChild(document.createElement("ApproverFormSubmittedAttachments"));
			parentElements.appendChild(document.createElement("FaxErrorFormSubmittedAttachments"));
			parentElements.appendChild(document.createElement("FaxConfirmationFormSubmittedAttachments"));
			parentElements.appendChild(document.createElement("FinalReviewerFormSubmittedAttachments"));
			Element afSubmissionInfo = document.createElement("afSubmissionInfo");
			root.appendChild(afSubmissionInfo);
			afSubmissionInfo.appendChild(document.createElement("computedMetaInfo"));
			Element afPath = document.createElement("afPath");
			afPath.appendChild(document.createTextNode("/content/dam/formsanddocuments/nacha-form/nacha-form"));
			afSubmissionInfo.appendChild(afPath);
			afSubmissionInfo.appendChild(document.createElement("stateOverrides"));
			afSubmissionInfo.appendChild(document.createElement("signers"));

			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			DOMSource domSource = new DOMSource(document);
			StringWriter stringWriter = new StringWriter();
			StreamResult streamResult = new StreamResult(stringWriter);
			transformer.transform(domSource, streamResult);

			String data = stringWriter.toString();
			return data;

		} catch (Exception e) {
			log.error("Error while creating XML", e);
		} finally {

		}
		return null;
	}

	private String getCaseId() throws Exception {
		String caseID = "";
		final String dbServiceUrl = "https://myformstst.fullerton.edu/bin/getCaseID";
		try (CloseableHttpClient client = HttpClients.createDefault()) {
			HttpGet get = new HttpGet(dbServiceUrl);
			CloseableHttpResponse response = client.execute(get);
			String responseStr = EntityUtils.toString(response.getEntity()).trim();
			caseID = responseStr;
			return caseID;
		} catch (Exception e) {
			log.error("Error while calling Case ID service", e);
		}
		return null;
	}

	private JSONArray getNachaFileProperties(String fileTitle, Connection dbConn) {
		JSONArray resultArray = new JSONArray();
		try {
			String sqlQuery = "SELECT * FROM cmsrda.FUL_SF_FN_ACH WHERE LOWER(FILEREFNAME) = LOWER('<<FILE_TITLE>>')";
			sqlQuery = sqlQuery.replaceAll("<<FILE_TITLE>>", fileTitle);
			String lookupFields = "FILEREFNAME,BATCH_RUN_DATE,BATCH_SEQ_NBR,REFUND_AMT,REPORT_ID,REP_TITLE,PROCESSINSTANCE,DOC_TYPE,EFFDT";
			resultArray = DatabaseUtils.getDataFromDB(sqlQuery, lookupFields, dbConn);
			return resultArray;
		} catch (Exception e) {
			log.error("Error Fetching Nacha File Properties", e);
		}
		return null;
	}

}
