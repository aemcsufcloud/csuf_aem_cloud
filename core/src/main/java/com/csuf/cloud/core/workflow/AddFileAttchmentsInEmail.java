package com.csuf.cloud.core.workflow;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.search.QueryBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.csuf.cloud.core.services.AssetService;
import com.csuf.cloud.core.services.EmailService;
import com.csuf.cloud.core.services.FormService;
import com.csuf.cloud.core.services.InboxItemService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.XMLUtils;
import com.csuf.cloud.core.vo.EmailAttachmentVO;
import com.csuf.cloud.core.vo.EmailServiceVO;

@Component(property = { "service.description=Send Email with Attachments", "service.vendor=ThoughtFocus",
		"process.label=Send File Attachments in Email" })
public class AddFileAttchmentsInEmail implements WorkflowProcess {

	/** Default log. */
	protected final transient Logger log = LoggerFactory.getLogger(this.getClass());

	@Reference
	private transient EmailService emailService;

	@Reference
	private transient AssetService assetService;

	@Reference
	private InboxItemService inboxService;

	@Reference
	private QueryBuilder queryBuilder;

	@Reference
	private FormService formService;

	private static final transient String TEMPLATE_PATH = "/etc/notification/email/csuf/test_email_attachment.html";
	private static final transient String IMAGE_PATH = "/content/dam/CSUF Assets/CSUF_HRIE_Email_Logo.png";
	private static final transient String DOR_NAME = "MPP_Performance_Evaluation.pdf";
	private static final String ATTACHMENT_FOLDER_NAME = "Attachments";

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {

		Session session = null;
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		session = resolver.adaptTo(Session.class);
		String wfInstanceID = workItem.getWorkflow().getId();
		String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\." + "[a-zA-Z0-9_+&*-]+)*@" + "(?:[a-zA-Z0-9-]+\\.)+[a-z"
				+ "A-Z]{2,7}$";
		Pattern pattern = Pattern.compile(emailRegex);
		try {
			String templatePath = null;
			EmailServiceVO emailVO = new EmailServiceVO();
			List<String> bccList = new ArrayList<>();
			List<String> ccList = new ArrayList<>();
			MetaDataMap map = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
			log.debug("map values : {}", map.toString());

			if (map.containsKey("path")) {
				templatePath = map.get("path").toString();
				emailVO.setTemplatePath(
						(StringUtils.isNotBlank(map.get("path").toString()) ? templatePath : TEMPLATE_PATH));

			}
			if (map.containsKey("toEmail")) {
				String toAddress = map.get("toEmail").toString();
				if (StringUtils.isNotBlank(toAddress)) {
					{
						if (pattern.matcher(toAddress).find()) {
							emailVO.addToAddress(toAddress);
						} else {
							if (map.containsKey(toAddress)) {
								toAddress = map.get(toAddress).toString();
								emailVO.addToAddress(toAddress);
							}

						}
					}
					log.debug("To Address== {}", emailVO.getToAddress());
				}
			}
			if (map.containsKey("bccEmail")) {
				String bccAddress = map.get("bccEmail").toString();
				if (StringUtils.isNotBlank(bccAddress)) {
					if (pattern.matcher(bccAddress).find()) {
						bccList.add(bccAddress);
					} else {
						if (map.containsKey(bccAddress)) {
							bccAddress = map.get(bccAddress).toString();
							bccList.add(bccAddress);
						}

					}

					emailVO.setBccAddress(bccList);
				}
			}
			if (map.containsKey("ccEmail")) {
				String ccAddress = null;
				if (StringUtils.isNotBlank((map.get("ccEmail") != null ? map.get("ccEmail").toString() : null))) {
					ccAddress = (map.get("ccEmail").toString());
				}
				if (StringUtils.isNotBlank(ccAddress)) {
					if (pattern.matcher(ccAddress).find()) {
						ccList.add(ccAddress);
					} else {
						if (map.containsKey(ccAddress)) {
							ccAddress = map.get(ccAddress).toString();
							ccList.add(ccAddress);
						}

					}
					emailVO.setCcAddress(ccList);
				}

			}

			if (map.containsKey("tlsRequired")) {
				boolean tlsRequired = Boolean.parseBoolean(map.get("tlsRequired").toString());
				emailVO.setStartTLS(tlsRequired);
			}
			if (map.containsKey("fromEmail")) {
				emailVO.setFromAddress(map.get("fromEmail").toString());
			}
			if (map.containsKey("fromName")) {
				emailVO.setFromName(map.get("fromName").toString());
			}
			if (map.containsKey("subject")) {
				emailVO.setSubject(map.get("subject").toString());
			} else {
				emailVO.setSubject("Performance Evaluation");
			}
			if (map.containsKey("toName")) {
				emailVO.setToName(map.get("toName").toString());
			}

			log.debug("senderEmail== {}", emailVO.getFromAddress());
			log.debug("recipientName== {}", emailVO.getToName());
			log.debug("bcc== {}", emailVO.getBccAddress());
			log.debug("recipientName== {}", emailVO.getCcAddress());
			log.debug("fromName== {}", emailVO.getFromName());
			emailVO.setUseCQGateway(false);
			Map<String, String> templateVaribles = new HashMap<>();
			templateVaribles.put("toName", emailVO.getToName());
			if (map.containsKey("empName")) {
				templateVaribles.put("empName", map.get("empName").toString());
			}
			emailVO.setTemplateVaribles(templateVaribles);

			// If an image needs to be embedded with email body
			emailVO.setEmbeddedImage(true);
			emailVO.setEmbeddedImagePath(IMAGE_PATH);
			emailVO.setEmbeddedImageDescription("CSUF Logo");
			if (map.containsKey("dorRequired")) {
				String dorReq = map.get("dorRequired").toString();
				if (dorReq.equals("true")) {
					String formPath = (map.get("formPath") != null ? map.get("formPath").toString() : null);
					String dorName = (map.get("dorFileName") != null ? map.get("dorFileName").toString() : null);
					String payloadPath = workItem.getWorkflowData().getPayload().toString();
					addDOR(emailVO, session, formPath, dorName, wfInstanceID, payloadPath, resolver);
				}
			}
			JsonArray jsonArray = null;
			try {
				jsonArray = inboxService.getTaskAttachmentsFromWorkflowInstanceId(resolver, wfInstanceID,
						ATTACHMENT_FOLDER_NAME);
				Iterator<JsonElement> iterator = jsonArray.iterator();
				while (iterator.hasNext()) {
					JsonObject json = iterator.next().getAsJsonObject();
					log.debug("json {}=" + json);
					addAttachments(emailVO, session, json);
				}

			} catch (RepositoryException e) {
				log.error("RepositoryException=" + Arrays.toString(e.getStackTrace()));
			} catch (WorkflowException e) {
				log.error("WorkflowException=" + Arrays.toString(e.getStackTrace()));
			} catch (Exception e) {
				log.error("Exception=" + e.getMessage());
			}

			List<String> emailFailureList = emailService.sendEmail(emailVO);

			if (null != emailFailureList && !emailFailureList.isEmpty()) {
				log.debug("Email sending failed to the recipients: ".concat(emailFailureList.toString()));
			} else if (null != emailFailureList && emailFailureList.isEmpty()) {
				log.debug("Email sent successfully");
			} else {
				log.debug("Email sending failed");
			}
		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		log.debug("exit AddFileAttchmentsInEmail doGet method");
	}

	private boolean addAttachments(EmailServiceVO emailVO, Session session, JsonObject json) {
		EmailAttachmentVO attachVO = new EmailAttachmentVO();
		try {
			String path = json.get("path").getAsString();
			String fileName = json.get("fileName").getAsString();
			Path attachmentSource = Paths.get(path);
			String attachmentMimeType = Files.probeContentType(attachmentSource);
			attachVO.setContentType(attachmentMimeType);
			attachVO.setName(fileName);
			attachVO.setPath(path);
			attachVO.setDescription(fileName);
			InputStream is = assetService.getFileStreamFromCRX(session, path);
			byte[] bytes = IOUtils.toByteArray(is);
			attachVO.setBytes(bytes);
			emailVO.addAttachment(attachVO);
			return true;
		} catch (IOException e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		return false;
	}

	private boolean addDOR(EmailServiceVO emailVO, Session session, String path, String fileName, String wfInstanceID,
			String payloadPath, ResourceResolver resolver) throws Exception {
		EmailAttachmentVO attachVO = new EmailAttachmentVO();
		com.adobe.aemfd.docmanager.Document dorDocument = null;
		try {
			if (StringUtils.isNotBlank(payloadPath)) {
				if (StringUtils.isNotBlank(payloadPath)) {
					InputStream is = null;
					is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");
					if (null != is) {
						Document doc = XMLUtils.getDomDocument(is);
						attachVO.setPath(payloadPath.concat("/".concat(fileName)));
						Path attachmentSource = Paths.get(payloadPath.concat("/".concat(fileName)));
						String attachmentMimeType = Files.probeContentType(attachmentSource);
						attachVO.setContentType(attachmentMimeType);
						attachVO.setName(fileName);
						attachVO.setDescription(fileName);
						String xml = XMLUtils.prettyPrintAsString(doc);
						dorDocument = formService.getDoR(xml, path, fileName);
						byte[] bytes = CSUFUtils.toByteArrayFromInputStream(dorDocument.getInputStream());
						attachVO.setBytes(bytes);
						emailVO.addAttachment(attachVO);
						return true;
					}
				}
			}

		} catch (IOException e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		return false;
	}
}
