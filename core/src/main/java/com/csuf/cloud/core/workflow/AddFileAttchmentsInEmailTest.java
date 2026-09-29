package com.csuf.cloud.core.workflow;

import java.util.Arrays;

import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;

@Component(property = { "service.description=Send Email with Attachments", "service.vendor=ThoughtFocus",
		"process.label=Send File Attachments in Email Test" })
public class AddFileAttchmentsInEmailTest implements WorkflowProcess {

	protected final transient Logger log = LoggerFactory.getLogger(this.getClass());

	// private static final transient String TEMPLATE_PATH =
	// "/etc/notification/email/csuf/test_email_attachment.html";

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		// Session session = null;
		// ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		// Session session = resolver.adaptTo(Session.class);
		try {
			MetaDataMap map = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
			log.debug("map values : {}", map.toString());
			if (map.containsKey("toEmail")) {
				log.debug("To Email = {}", map.get("toEmail").toString());
			}
		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		log.debug("exit AddFileAttchmentsInEmail doGet method");
	}

}
