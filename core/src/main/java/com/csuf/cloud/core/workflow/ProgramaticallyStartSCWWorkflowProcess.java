package com.csuf.cloud.core.workflow;

import java.io.InputStream;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
//import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import javax.jcr.Node;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.Workflow;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.adobe.granite.workflow.model.WorkflowModel;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.csuf.cloud.core.services.AssetService;
import com.csuf.cloud.core.services.InboxItemService;
import com.csuf.cloud.core.utils.ArgumentParser;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description==Start Course Withdrawal Workflow Programatically",
		"process.label" + "=ProgramaticallyStartSCWWorkflowProcess" })
public class ProgramaticallyStartSCWWorkflowProcess implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(ProgramaticallyStartSCWWorkflowProcess.class);

	@Reference
	private AssetService assetService;
	@Reference
	private InboxItemService inboxService;

	private static final String ALLOWED_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	private static final String WF_MODEL = "/var/workflow/models/Student-Course-Withdrawal";
	private static final String WF_MODEL_TITLE = "Student Course Withdrawal";
	private static final String ATTACHMENT_FOLDER_NAME = "Attachments";

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Document doc = null;
		InputStream is = null;
		JsonObject json = null;
		JsonArray jsArray = new JsonArray();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payload = workItem.getWorkflowData().getPayload().toString();
		String args = ((String) processArguments.get("PROCESS_ARGS", "string"));
		String[] itemsArray = args.split("=");
		String wf_model = itemsArray[0];
		String wf_title = itemsArray[1];
		try {
			is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payload, "Data.xml");
			if (null != is) {
				doc = XMLUtils.getDomDocument(is);
				String xml = XMLUtils.prettyPrintAsString(doc);
				doc = XMLUtils.parseXmlFile(xml);
				Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");
				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					String tableJsonData = XMLUtils.getChildNodeContent(afBoundDataElement, "LookupResult");
					JsonParser parser = new JsonParser();
					if (StringUtils.isNotBlank(tableJsonData)) {
						json = parser.parse(tableJsonData).getAsJsonObject();
						log.info("json 1 {}", json);
					} else {
						throw new Exception("Error : LookupResult not found!");
					}
					WorkflowModel workModel = workflowSession.getModel(wf_model);
					try {
						String selectCBVal = StringUtils.EMPTY;
						String courseVal = StringUtils.EMPTY;
						String classNum = StringUtils.EMPTY;
						Element rowElement = XMLUtils.getChildNode(afBoundDataElement, "form1");
						for (int i = 0; i < XMLUtils.getElementLength(rowElement, "CourseRow"); i++) {
							selectCBVal = XMLUtils.getChildNodeContentOfElement(rowElement, "SelectCB", i);
							courseVal = XMLUtils.getChildNodeContentOfElement(rowElement, "CourseNo", i);
							classNum = XMLUtils.getChildNodeContentOfElement(rowElement, "ScheduleNo", i);							
							if (!courseVal.isEmpty() && selectCBVal.equals("Yes")) {
								JsonArray params = json.getAsJsonArray("COURSES");
								if (null != params && !params.isJsonNull() && params.isJsonArray()) {
									for (int n = 0; n < params.size(); n++) {
										JsonElement jsonElement = params.get(n);
										JsonObject obj = jsonElement.getAsJsonObject();
										if ((obj.get("CRSE_NAME").getAsString().equals(courseVal))
												&& (obj.get("CLASS_NBR").getAsString().equals(classNum))) {
											jsArray.add(obj);
										}
									}
								}

							}

						}

						Session session = workflowSession.adaptTo(Session.class);
						JsonArray attachmentArray = null;
						String workflowInstanceId = workItem.getWorkflow().getId();
						if (StringUtils.isNotBlank(workflowInstanceId)) {
							try {
								attachmentArray = inboxService.getTaskAttachmentsFromWorkflowInstanceId(resolver,
										workflowInstanceId, ATTACHMENT_FOLDER_NAME);
							} catch (RepositoryException e) {
								log.error(
										"RepositoryException in ProgramaticallyStartSCWWorkflowProcess for RepositoryException="
												+ Arrays.toString(e.getStackTrace()));

							} catch (Exception e) {
								log.error("Exception in ProgramaticallyStartSCWWorkflowProcess for RepositoryException="
										+ Arrays.toString(e.getStackTrace()));
							}
						}
						for (int m = 0; m < jsArray.size(); m++) {
							XMLUtils.removeRecursively(doc, org.w3c.dom.Node.ELEMENT_NODE, "CourseRow");
							XMLUtils.removeRecursively(doc, org.w3c.dom.Node.COMMENT_NODE, null);
							doc.normalize();
							JsonElement jsonElement = jsArray.get(m);
							JsonObject jObj = jsonElement.getAsJsonObject();
							String newPayloadPath = createNewPayloadPath(session, payload, doc, jObj);
							JsonObject newAttachmentJson = addAttachment(session, attachmentArray, newPayloadPath,
									resolver);
							log.info("Successfully added the file attachments to the newly created payload : {}",
									newAttachmentJson);
							log.info("newPayloadPath {}", newPayloadPath);
							if (StringUtils.isNotBlank(newPayloadPath)) {
								final Map<String, Object> workflowMetadata = new HashMap<>();
								workflowMetadata.put("workflowTitle", wf_title);
								WorkflowData wfData = workflowSession.newWorkflowData("JCR_PATH", newPayloadPath);
								Workflow wf = workflowSession.startWorkflow(workModel, wfData, workflowMetadata);
							} else {
								log.error("Error : new workflow could not be started");
							}
						}

					} catch (Exception e) {
						log.error(Arrays.toString(e.getStackTrace()), e);
					}

				}
			}

		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
	}

	private String createNewPayloadPath(Session session, String existingPayload, Document d, JsonObject json)
			throws Exception {
		String afPath = null;
		int lastSlashIndex = existingPayload.lastIndexOf("/");
		String trimmedPath = existingPayload.substring(0, lastSlashIndex + 1);
		String payloadPathString = existingPayload.substring(lastSlashIndex + 1, existingPayload.length());
		int payloadPathStringIndex = payloadPathString.lastIndexOf("_");
		String randomString = CSUFUtils.generateRandomString(payloadPathStringIndex, ALLOWED_CHARS);
		String newJCRPayloadPath = trimmedPath.concat(randomString);
		log.debug("The new JCR Payload node path = {}", newJCRPayloadPath);

		try {
			Element xmlRoot = d.getDocumentElement();
			Element scwElement = XMLUtils.getChildNode(xmlRoot, "form1");
			if (null != json && !json.isJsonNull() && json.isJsonObject()) {
				XMLUtils.createXMLChildElement(d, scwElement, "ReminderInstructorEmail",
						(json.has("INSTR_EMAIL") && null != json.get("INSTR_EMAIL"))
								? json.get("INSTR_EMAIL").getAsString()
								: StringUtils.EMPTY);
				XMLUtils.createXMLChildElement(d, scwElement, "ReminderChairEmail",
						(json.has("CHAIR_EMAIL") && null != json.get("CHAIR_EMAIL"))
								? json.get("CHAIR_EMAIL").getAsString()
								: StringUtils.EMPTY);
				XMLUtils.createXMLChildElement(d, scwElement, "ReminderInstructorName",
						(json.has("INSTR_NAME") && null != json.get("INSTR_NAME"))
								? (json.get("INSTR_NAME").getAsString()).substring(0,
										(json.get("INSTR_NAME").getAsString()).indexOf(","))
								: StringUtils.EMPTY);
				XMLUtils.createXMLChildElement(d, scwElement, "ReminderChairName",
						(json.has("CHAIR_NAME") && null != json.get("CHAIR_NAME"))
								? json.get("CHAIR_NAME").getAsString()
								: StringUtils.EMPTY);
				XMLUtils.createXMLParentElement(d, scwElement, "CourseRow");
				Element rowElement = XMLUtils.getChildNode(xmlRoot, "CourseRow");
				XMLUtils.createXMLChildElement(d, rowElement, "SelectCB", "Yes");
				XMLUtils.createXMLChildElement(d, rowElement, "CourseNo",
						(json.has("CRSE_NAME") && null != json.get("CRSE_NAME")) ? json.get("CRSE_NAME").getAsString()
								: StringUtils.EMPTY);
				XMLUtils.createXMLChildElement(d, rowElement, "ScheduleNo",
						(json.has("CLASS_NBR") && null != json.get("CLASS_NBR")) ? json.get("CLASS_NBR").getAsString()
								: StringUtils.EMPTY);
				XMLUtils.createXMLChildElement(d, rowElement, "NumberOfUnits",
						(json.has("UNT_TAKEN") && null != json.get("UNT_TAKEN")) ? json.get("UNT_TAKEN").getAsString()
								: StringUtils.EMPTY);
				XMLUtils.createXMLChildElement(d, rowElement, "NameOfInstructor",
						(json.has("INSTR_NAME") && null != json.get("INSTR_NAME"))
								? json.get("INSTR_NAME").getAsString()
								: StringUtils.EMPTY);
				XMLUtils.createXMLChildElement(d, rowElement, "InstructorLname",
						(json.has("INSTR_NAME") && null != json.get("INSTR_NAME"))
								? (json.get("INSTR_NAME").getAsString()).substring(0,
										(json.get("INSTR_NAME").getAsString()).indexOf(","))
								: StringUtils.EMPTY);
				XMLUtils.createXMLChildElement(d, rowElement, "SectionNo",
						(json.has("CLASS_SECTION") && null != json.get("CLASS_SECTION"))
								? json.get("CLASS_SECTION").getAsString()
								: StringUtils.EMPTY);
				XMLUtils.createXMLChildElement(d, rowElement, "ChairUserID",
						(json.has("CHAIR_USERID") && null != json.get("CHAIR_USERID"))
								? json.get("CHAIR_USERID").getAsString()
								: StringUtils.EMPTY);
				XMLUtils.createXMLChildElement(d, rowElement, "ChairName",
						(json.has("CHAIR_NAME") && null != json.get("CHAIR_NAME"))
								? json.get("CHAIR_NAME").getAsString()
								: StringUtils.EMPTY);
				XMLUtils.createXMLChildElement(d, rowElement, "ChairEmailID",
						(json.has("CHAIR_EMAIL") && null != json.get("CHAIR_EMAIL"))
								? json.get("CHAIR_EMAIL").getAsString()
								: StringUtils.EMPTY);

				XMLUtils.createXMLChildElement(d, rowElement, "InstructorUserID",
						(json.has("INSTR_USERID") && null != json.get("INSTR_USERID"))
								? json.get("INSTR_USERID").getAsString()
								: StringUtils.EMPTY);
				XMLUtils.createXMLChildElement(d, rowElement, "InstructorEmailID",
						(json.has("INSTR_EMAIL") && null != json.get("INSTR_EMAIL"))
								? json.get("INSTR_EMAIL").getAsString()
								: StringUtils.EMPTY);
				/* Create duplicate xml elements outside course row for reminder variables */
				if (XMLUtils.getChildNode(scwElement, "ReminderInstructorEmail") != null) {
					XMLUtils.removeChildNode(d, scwElement, "ReminderInstructorEmail");
					XMLUtils.createXMLChildElement(d, scwElement, "ReminderInstructorEmail",
							(json.has("INSTR_EMAIL") && null != json.get("INSTR_EMAIL"))
									? json.get("INSTR_EMAIL").getAsString()
									: StringUtils.EMPTY);
				} else {
					XMLUtils.createXMLChildElement(d, scwElement, "ReminderInstructorEmail",
							(json.has("INSTR_EMAIL") && null != json.get("INSTR_EMAIL"))
									? json.get("INSTR_EMAIL").getAsString()
									: StringUtils.EMPTY);
				}
				if (XMLUtils.getChildNode(scwElement, "ReminderChairEmail") != null) {
					XMLUtils.removeChildNode(d, scwElement, "ReminderChairEmail");
					XMLUtils.createXMLChildElement(d, scwElement, "ReminderChairEmail",
							(json.has("CHAIR_EMAIL") && null != json.get("CHAIR_EMAIL"))
									? json.get("CHAIR_EMAIL").getAsString()
									: StringUtils.EMPTY);
				} else {
					XMLUtils.createXMLChildElement(d, scwElement, "ReminderChairEmail",
							(json.has("CHAIR_EMAIL") && null != json.get("CHAIR_EMAIL"))
									? json.get("CHAIR_EMAIL").getAsString()
									: StringUtils.EMPTY);
				}
				if (XMLUtils.getChildNode(scwElement, "ReminderInstructorName") != null) {
					XMLUtils.removeChildNode(d, scwElement, "ReminderInstructorName");
					XMLUtils.createXMLChildElement(d, scwElement, "ReminderInstructorName",
							(json.has("INSTR_NAME") && null != json.get("INSTR_NAME"))
									? (json.get("INSTR_NAME").getAsString()).substring(0,
											(json.get("INSTR_NAME").getAsString()).indexOf(","))
									: StringUtils.EMPTY);
				} else {
					XMLUtils.createXMLChildElement(d, scwElement, "ReminderInstructorName",
							(json.has("INSTR_NAME") && null != json.get("INSTR_NAME"))
									? (json.get("INSTR_NAME").getAsString()).substring(0,
											(json.get("INSTR_NAME").getAsString()).indexOf(","))
									: StringUtils.EMPTY);
				}
				if (XMLUtils.getChildNode(scwElement, "ReminderChairName") != null) {
					XMLUtils.removeChildNode(d, scwElement, "ReminderChairName");
					XMLUtils.createXMLChildElement(d, scwElement, "ReminderChairName",
							(json.has("CHAIR_NAME") && null != json.get("CHAIR_NAME"))
									? json.get("CHAIR_NAME").getAsString()
									: StringUtils.EMPTY);
				} else {
					XMLUtils.createXMLChildElement(d, scwElement, "ReminderChairName",
							(json.has("CHAIR_NAME") && null != json.get("CHAIR_NAME"))
									? json.get("CHAIR_NAME").getAsString()
									: StringUtils.EMPTY);
				}
				String xmlFileAsString = XMLUtils.prettyPrintAsString(d);
				// log.debug("Final manupulated XML inside createNewPayloadPath method = {}",
				// xmlFileAsString);
			}

			Element afParentElement = XMLUtils.getParentNode(d, "afSubmissionInfo");

			if (null != afParentElement && afParentElement.hasChildNodes()) {
				afPath = XMLUtils.getChildNodeContent(afParentElement, "afPath");
				log.debug("afPath = {}", afPath);
			}
			InputStream is = XMLUtils.getInputStreamFromXMLDocument(d);
			boolean isNewPayloadJCRPathCreated = assetService.writeNtFileToPayloadPath(session, "Data.xml", afPath,
					newJCRPayloadPath, is);
			log.debug("new payload node got created with status = {}", isNewPayloadJCRPathCreated);
			if (isNewPayloadJCRPathCreated) {
				return newJCRPayloadPath;
			}

		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()), e);
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
}
