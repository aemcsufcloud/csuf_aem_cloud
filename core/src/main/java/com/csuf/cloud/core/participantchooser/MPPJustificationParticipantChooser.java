package com.csuf.cloud.core.participantchooser;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.ParticipantStepChooser;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.FallbackUserConfigService;

@Component(service = ParticipantStepChooser.class, property = {
		"chooser.label=MPP Justification dynamic participant chooser" })

public class MPPJustificationParticipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(MPPJustificationParticipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug(
				"################ Inside MPP Justification ParticipantChooser GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("stage")) {
			stage = metaDataMap.get("stage").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToMPPSupervisor")) {
				if (metaDataMap.containsKey("mppSupervisorUserID")) {
					participant = metaDataMap.get("mppSupervisorUserID").toString();
				} else {
					participant = fallBackUserService.fallbackUserId();
				}
			}
			if (stage.equalsIgnoreCase("ToAppropriateAdmin")) {
				if (metaDataMap.containsKey("adminUserID")) {
					participant = metaDataMap.get("adminUserID").toString();
				} else {
					participant = fallBackUserService.fallbackUserId();
				}
			}
			if (stage.equalsIgnoreCase("ToVP")) {
				if (metaDataMap.containsKey("vpUserID")) {
					participant = metaDataMap.get("vpUserID").toString();
				} else {
					participant = fallBackUserService.fallbackUserId();
				}
			}
			if (stage.equalsIgnoreCase("ToCampusDesignee")) {
				if (metaDataMap.containsKey("campusDesigneeUserID")) {
					participant = metaDataMap.get("campusDesigneeUserID").toString();
				} else {
					participant = fallBackUserService.fallbackUserId();
				}
			}
			if (stage.equalsIgnoreCase("ToInitiator")) {
				if (metaDataMap.containsKey("initiatorUserID")) {
					participant = metaDataMap.get("initiatorUserID").toString();
				} else {
					participant = fallBackUserService.fallbackUserId();
				}
			}
		} else {
			logger.error("stage value is not set in metadataMap");
		}

		logger.info("####### Participant : " + participant + " ##############");
		return participant;
	}
}