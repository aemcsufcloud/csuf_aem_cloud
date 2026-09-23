package com.csuf.cloud.core.workflow;

import java.util.Arrays;
import java.util.List;

import javax.jcr.Session;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.Route;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.WorkflowAdministrationConfigService;
import com.csuf.cloud.core.vo.WorkflowVO;

@Component(property = { "service.description=Is Assignee a Group", "service.vendor=ThoughtFocus",
		"process.label=Is Assignee a Group" })
public class CheckIsUserAGroup implements WorkflowProcess {
	private static final Logger log = LoggerFactory.getLogger(CheckIsUserAGroup.class);
	@Reference
	private WorkflowAdministrationConfigService wfConfig;

	@SuppressWarnings("null")
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap)
			throws com.adobe.granite.workflow.WorkflowException {
		MetaDataMap map = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		Session session = resolver.adaptTo(Session.class);
		String assigneeArg = ((String) metaDataMap.get("PROCESS_ARGS", "string"));
		String assignee = StringUtils.EMPTY;
		try {
			if (map.containsKey(assigneeArg) && null != map.get(assigneeArg)) {
				assignee = map.get(assigneeArg).toString();
				if (wfConfig.isAssigneeAGroup(assignee, session)) {
					map.put("isGroup", "Y");
				}
				log.debug("Is Assignee a Group is = {}", wfConfig.isAssigneeAGroup(assignee, session));
			} else {
				log.debug("Metadata Map does not contain assigneeArg");
			}
		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
	}

}
