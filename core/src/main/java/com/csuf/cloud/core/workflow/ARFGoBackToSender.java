package com.csuf.cloud.core.workflow;

import java.util.Arrays;
import java.util.List;

import javax.jcr.Session;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.Route;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.vo.WorkflowVO;

@Component(property = { "service.description=ARF Go Back To the Sender", "service.vendor=ThoughtFocus",
		"process.label=ARF Go Back To the Sender" })
public class ARFGoBackToSender implements WorkflowProcess {
	private static final Logger log = LoggerFactory.getLogger(ARFGoBackToSender.class);

	@SuppressWarnings("null")
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap)
			throws com.adobe.granite.workflow.WorkflowException {
		MetaDataMap map = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		Session session = resolver.adaptTo(Session.class);
		WorkflowSession wfSession = resolver.adaptTo(WorkflowSession.class);
		WorkflowVO workflowVO = new WorkflowVO();
		workflowVO.setGraniteWorkflowSession(wfSession);
		workflowVO.setAdminSession(session);
		String previousStep = StringUtils.EMPTY;
		try {
			if (map.containsKey("PreviousStage") && null != map.get("PreviousStage")) {
				previousStep = map.get("PreviousStage").toString();
				if (map.containsKey("SendExpiredItemData") && null != map.get("SendExpiredItemData")) {
					String[] itemData = map.get("SendExpiredItemData").toString().split(",");
					Boolean status = false;
					for (int i = 0; i < itemData.length; i++) {
						String stage = itemData[i].split("-")[0];
						String routeVal = itemData[i].split("-")[1];
						if (previousStep.equals(stage)) {
							workflowVO.setWorkItem(workItem);
							workflowVO.setRoutes(routeVal);
							status = GoBackToTheSender(workflowVO);
							log.debug("status :::: {}", status);
							break;
						}
					}
					log.debug("Staus of go back to the sender for {}", workItem.getId(), " is = {}", status);
				} else {
					log.debug("Metadata Map does not contain SendExpiredItemData");
				}
			} else {
				log.debug("Metadata Map does not contain previousStage");
			}
		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
	}

	public boolean GoBackToTheSender(WorkflowVO workflowVO) {
		try {
			WorkflowSession graniteWorkflowSession = workflowVO.getGraniteWorkflowSession();
			WorkItem item = workflowVO.getWorkItem();
			if (log.isDebugEnabled())
				log.debug("Workitem begin time inside completeDeadlinedTask method : {}", item.getProgressBeginTime());
			// List<Route> routes = graniteWorkflowSession.getRoutes(item, false);
			List<Route> backRoutesList = graniteWorkflowSession.getBackRoutes(item, false);
			String configuredRoute = workflowVO.getWFRoute();
			if (null != backRoutesList && !backRoutesList.isEmpty()) {
				for (Route route : backRoutesList) {
					log.debug("Configured route for the workitem :::: {}", route.getName());
					if (log.isDebugEnabled())
						log.debug("Available route for the workitem :::: {}", route.getName());

					if (log.isDebugEnabled())
						log.debug("Configured route for the workitem :::: {}", configuredRoute);

					if (route.getName().contains(configuredRoute)) {
						graniteWorkflowSession.complete(item, route);
						log.info("workitem :::::: ".concat(item.getId())
								.concat(" ::::: successfully auto advanced to next step in the workflow"));
						return true;

					}
				}
			}
		} catch (WorkflowException e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		return false;
	}

}
