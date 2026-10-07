package com.csuf.cloud.core.workflow;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
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
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.resource.Resource; // NEW
import org.apache.sling.api.resource.ResourceResolver;
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
import com.csuf.cloud.core.utils.XMLUtils;
import com.day.cq.dam.api.Asset; // NEW
import com.day.cq.search.QueryBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Component(property = { "service.description==Start NACHA Workflow Programatically",
		"process.label" + "=TestNacha" })
public class TestNacha implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(TestNacha.class);

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
		log.error("Flower workflowInstanceId = " + currentworkflowInstanceId);
		try {
			
			 /*dbConn = jdbcConnectionService.getDocDBConnection(); 
			 dbConnFrmmgr = jdbcConnectionService.getFrmDBConnection();*/
			
			resolver = workflowSession.adaptTo(ResourceResolver.class);
			session = globalConfigService.getAdminSession();
			wfSession = resolver.adaptTo(WorkflowSession.class);
			WorkflowModel workModel = workflowSession.getModel(WORKFLOW_MODEL_PATH);
			// CHANGED: read the DAM input asset/folder instead of the on-prem watched folder payload
			// attachmentArray = getTaskAttachmentsFromWorkflowInstanceId(resolver, currentworkflowInstanceId);
			
			log.error("Flower SessionTest Value live={}, user={}", session.isLive(),session.getUserID());

			
			attachmentArray = getAttachmentsFromInputFolder(resolver, currentworkflowInstanceId);
			log.error("Flower attachmentArray = " + attachmentArray);
			String caseId = getCaseId();
			log.error("Flower caseId = " + caseId);
			//String xmlData = getXml(caseId, dbConnFrmmgr);
			String xmlData = getXml(caseId);
			
			if (xmlData != null) {
				log.error("Flower xmlData condition");
				is = IOUtils.toInputStream(xmlData, StandardCharsets.UTF_8);
				if (null != is) {
					log.error("Flower inputstream condition");
					doc = XMLUtils.getDomDocument(is);
					String generatedPayloadPath = CSUFUtils.getRecentlyCreatedPayloadPath(resolver,
							PAYLOAD_SERVER_PATH);
					
					log.error("Flower generatedPayloadPath="+generatedPayloadPath);
					log.error("Flower generatedPayloadPath="+doc.hashCode());
					log.error("Flower session="+session);
					
					String newPayloadPath = createNewPayloadPath(session, generatedPayloadPath, doc);
					log.error("Flower newPayloadPath="+newPayloadPath);
					
					JsonObject newAttachmentJson = addAttachment(session, attachmentArray, newPayloadPath, resolver);
					log.info("Successfully added the file attachments to the newly created payload : {}",
							newAttachmentJson);
					log.error("Flower Successfully added the file attachments to the newly created payload : {}",
							newAttachmentJson);
					
					log.info("newPayloadPath {}", newPayloadPath);
					log.error("Flower newPayloadPath {}", newPayloadPath);
					
					if (StringUtils.isNotBlank(newPayloadPath)) {
						final Map<String, Object> workflowMetadata = new HashMap<>();
						workflowMetadata.put("workflowTitle", WORKFLOW_MODEL_NAME);
						WorkflowData wfData = wfSession.newWorkflowData("JCR_PATH", newPayloadPath);
						workflowMetadata.entrySet().stream().forEach(arg -> {
							workflowMetadata.put(arg.getKey(), arg.getValue());
							log.debug("workflowMetadata key : {}, value : {}", arg.getKey(), arg.getValue());
							log.error("Flower workflowMetadata key : {}, value : {}", arg.getKey(), arg.getValue());
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

	/**
	 * NEW (AEM Cloud): reads the DAM input asset(s) instead of the on-prem watched-folder payload.
	 * - Payload is a DAM asset (Workflow Launcher on /content/dam/input): that one .txt asset is used.
	 * - Payload is a DAM folder (workflow started manually): every .txt asset directly under it is used.
	 * Each entry has the same shape as before ({fileName, path}). The path is the nt:file node of the
	 * asset's original rendition, which has jcr:content/jcr:data, so addAttachment() works unchanged.
	 */
	private JsonArray getAttachmentsFromInputFolder(ResourceResolver resourceResolver, String workflowInstanceId)
			throws Exception {
		log.error("Flower getAttachmentsFromInputFolder");
		JsonArray formsJson = new JsonArray();
		WorkflowSession wfSession = resourceResolver.adaptTo(WorkflowSession.class);
		String payloadPath = wfSession.getWorkflow(workflowInstanceId).getWorkflowData().getPayload().toString();
		log.debug("payloadPath inside getAttachmentsFromInputFolder method : {}", payloadPath);
		log.error("Flower payloadPath inside getAttachmentsFromInputFolder method : {}", payloadPath);
		
		if (StringUtils.isBlank(payloadPath)) {
			throw new Exception("payload path is empty inside getAttachmentsFromInputFolder method");
		}
		Resource payloadResource = resourceResolver.getResource(payloadPath);
		log.error("Flower payloadResource : {}", payloadResource);
		
		if (payloadResource == null) {
			throw new Exception("payload resource not found : " + payloadPath);
		}
		Asset payloadAsset = payloadResource.adaptTo(Asset.class);
		if (payloadAsset != null) {
			// launcher mode: payload is the uploaded asset itself
			addAssetToAttachmentJson(payloadAsset, formsJson);
		} else {
			// folder mode: payload is the DAM input folder
			for (Resource child : payloadResource.getChildren()) {
				Asset childAsset = child.adaptTo(Asset.class);
				if (childAsset != null) {
					addAssetToAttachmentJson(childAsset, formsJson);
				}
			}
		}
		return formsJson;
	}

	/**
	 * NEW: adds a .txt DAM asset to the attachment list in the same {fileName, path} shape used before.
	 */
	private void addAssetToAttachmentJson(Asset asset, JsonArray formsJson) {
		log.error("Flower addAssetToAttachmentJson");
		
		String fileName = asset.getName();
		if (StringUtils.isBlank(fileName) || asset.getOriginal() == null) {
			return;
		}
		String fileExtension = CSUFUtils.getFileExtension(fileName);
		log.error("Flower fileExtension="+fileExtension);
		
		if (StringUtils.isNotBlank(fileExtension) && fileExtension.equalsIgnoreCase("txt")) {
			JsonObject json = new JsonObject();
			nachaFileName = fileName;
			json.addProperty("fileName", fileName);
			json.addProperty("path", asset.getOriginal().getPath());
			formsJson.add(json);
			log.error("Flower json="+json.toString());
			
			log.debug("Added DAM asset as attachment : {}", asset.getPath());
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
		log.debug("Flower createNewPayloadPath");
		ResourceResolver resourceResolver = null;
		String afPath = null;
		existingPayload = existingPayload.concat("/");
		// generate the jcr Node path for the payload for the new Data.xml
		String randomString = CSUFUtils.generateRandomString(26, ALLOWED_CHARS);
		String newJCRPayloadPath = existingPayload.concat(randomString);
		log.debug("The new JCR Payload node path = {}", newJCRPayloadPath);
		log.error("Flower The new JCR Payload node path = {}", newJCRPayloadPath);

		
		try {
			// Element xmlRoot = doc.getDocumentElement();
			Element afParentElement = XMLUtils.getParentNode(doc, "afSubmissionInfo");
			log.debug("afParentElement" + afParentElement);
			if (null != afParentElement && afParentElement.hasChildNodes()) {
				afPath = XMLUtils.getChildNodeContent(afParentElement, "afPath");
				log.debug("afPath = {}", afPath);
				log.error("Flower afPath = {}", afPath);
			}
			InputStream is = XMLUtils.getInputStreamFromXMLDocument(doc);
			log.debug("Session Value = " + session);
			log.error("Flower Session Value = " + session);
			log.error("Flower newJCRPayloadPath = " + newJCRPayloadPath);
			log.error("Flower is = " + is.available());
			
			log.error("Flower California Value live={}, user={}", session.isLive(),session.getUserID());
			
			boolean isNewPayloadJCRPathCreated = assetService.writeNtFileToPayloadPath(session, "Data.xml", afPath,
					newJCRPayloadPath, is);
			
			
			log.debug("new payload node got created with status = {}", isNewPayloadJCRPathCreated);
			log.error("Flower new payload node got created with status = {}", isNewPayloadJCRPathCreated);

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
		log.debug("Flower addAttachment");
		
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

	private String getXml(String caseID) {
		try {
			log.error("Flower getXml method");
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
			
			log.error("Flower getXml method2");
			
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
			JsonArray nachaFilePropertiesArray = getNachaFileProperties(nachaFileTitle);
			log.error("Flower nachaFilePropertiesArray="+nachaFilePropertiesArray);
			
			if (nachaFilePropertiesArray != null && nachaFilePropertiesArray.size() != 0) {
				JsonObject nachaFilePropertiesObject = nachaFilePropertiesArray.get(0).getAsJsonObject();
				Element runIDElement = document.createElement("RunId");
				runIDElement.appendChild(document.createTextNode(getStr(nachaFilePropertiesObject, "PROCESSINSTANCE")));
				parentElements.appendChild(runIDElement);
				Element reportDateElement = document.createElement("ReportDate");
				reportDateElement.appendChild(document.createTextNode(getStr(nachaFilePropertiesObject, "BATCH_RUN_DATE")));
				parentElements.appendChild(reportDateElement);
				Element totalAmountElement = document.createElement("TotalAmount");
				totalAmountElement.appendChild(document.createTextNode(getStr(nachaFilePropertiesObject, "REFUND_AMT")));
				parentElements.appendChild(totalAmountElement);
				Element totalCountElement = document.createElement("TotalCount");
				totalCountElement.appendChild(document.createTextNode(getStr(nachaFilePropertiesObject, "BATCH_SEQ_NBR")));
				parentElements.appendChild(totalCountElement);
				Element reportNameElement = document.createElement("ReportName");
				reportNameElement.appendChild(document.createTextNode(getStr(nachaFilePropertiesObject, "REPORT_ID")));
				parentElements.appendChild(reportNameElement);
				Element estimatedSettlementDateElement = document.createElement("EstimatedSettlementDate");
				estimatedSettlementDateElement.appendChild(document.createTextNode(getStr(nachaFilePropertiesObject, "EFFDT")));
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

	/**
	 * Null-safe string getter for Gson objects (replaces org.json getString).
	 */
	private String getStr(JsonObject obj, String key) {
		return (obj.has(key) && !obj.get(key).isJsonNull()) ? obj.get(key).getAsString() : "";
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

	/*private JsonArray getNachaFileProperties(String fileTitle) throws IOException, URISyntaxException {
		log.error("Flower Inside getNachaFileProperties");
		JsonArray resultArray = new JsonArray();
	    final String dbServiceUrl = "https://myformstst.fullerton.edu/bin/getNachaDetails";

		java.net.URI uri = new URIBuilder(dbServiceUrl)
				.addParameter("nachaTitle", fileTitle)
				.build();
		log.debug("Flower Nacha request url : {}", uri);
		
		try (CloseableHttpClient client = HttpClients.createDefault()) {
			HttpGet get = new HttpGet(uri);
			get.setHeader("Accept", "application/json");
			try (CloseableHttpResponse response = client.execute(get)) {
				log.error("Flower Nacha Response: {}", response.getStatusLine());
				BufferedReader reader = new BufferedReader(
						new InputStreamReader(response.getEntity().getContent(), StandardCharsets.UTF_8));
				StringBuilder sb = new StringBuilder();
				String line;
				while ((line = reader.readLine()) != null) {
					sb.append(line);
				}
				log.error("Flower Nacha Response body : {}", sb);
				resultArray = JsonParser.parseString(sb.toString()).getAsJsonArray();
				return resultArray;
			}
		}
	}*/
	
	
	
	private JsonArray getNachaFileProperties(String fileTitle) throws IOException, URISyntaxException {
		log.error("Flower Inside getNachaFileProperties");
		JsonArray resultArray = new JsonArray();
	    final String dbServiceUrl = "https://myformstst.fullerton.edu/bin/getNachaDetails";

		java.net.URI uri = new URIBuilder(dbServiceUrl)
				.addParameter("nachaTitle", fileTitle)
				.build();
		log.debug("Flower Nacha request url : {}", uri);

		try (CloseableHttpClient client = HttpClients.createDefault()) {
			HttpGet get = new HttpGet(uri);
			get.setHeader("Accept", "application/json");
			try (CloseableHttpResponse response = client.execute(get)) {
				log.error("Flower Nacha Response: {}", response.getStatusLine());
				BufferedReader reader = new BufferedReader(
						new InputStreamReader(response.getEntity().getContent(), StandardCharsets.UTF_8));
				StringBuilder sb = new StringBuilder();
				String line;
				while ((line = reader.readLine()) != null) {
					sb.append(line);
				}
				log.error("Flower Nacha Response body : {}", sb);

				int status = response.getStatusLine().getStatusCode();
				if (status < 200 || status >= 300) {
					log.error("Flower Nacha service returned HTTP {} with body: {}", status, sb);
					return resultArray; // empty array
				}

				JsonElement element = JsonParser.parseString(sb.toString());

				// Case 1: the response is a double-encoded JSON string, e.g. "[{\"REFUND_AMT\":...}]"
				if (element.isJsonPrimitive() && element.getAsJsonPrimitive().isString()) {
					String inner = element.getAsString().trim();
					if (inner.startsWith("[") || inner.startsWith("{")) {
						element = JsonParser.parseString(inner);
					}
				}

				if (element.isJsonArray()) {
					resultArray = element.getAsJsonArray();
				} else if (element.isJsonObject()) {
					JsonObject obj = element.getAsJsonObject();
					// Case 2: the array is wrapped in an object, e.g. {"data":[...]}
					JsonElement wrapped = obj.has("data") ? obj.get("data") : null;
					if (wrapped != null && wrapped.isJsonArray()) {
						resultArray = wrapped.getAsJsonArray();
					} else {
						// Case 3: a single record, or an error object
						log.error("Flower Nacha unexpected JSON object: {}", obj);
						if (!obj.has("error")) {
							resultArray.add(obj);
						}
					}
				} else {
					log.error("Flower Nacha unexpected response (not JSON array/object): {}", sb);
				}
				return resultArray;
			}
		}
	}
}