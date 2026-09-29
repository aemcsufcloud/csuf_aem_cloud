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
		"chooser.label=Volunteer Form participant chooser" })

public class VolunteerFormParticipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(VolunteerFormParticipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug(
				"################ Inside Volunteer Form ParticipantChooser GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		// logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToSupervisor")) {
				if (metaDataMap.containsKey("SupervisorSearchUserId")) {
					participant = metaDataMap.get("SupervisorSearchUserId").toString();
				} else {
					logger.error("SupervisorSearchUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToDepartmentCoordinator")) {
				if (metaDataMap.containsKey("DeptCoSearchUserId")) {
					participant = metaDataMap.get("DeptCoSearchUserId").toString();
				} else {
					logger.error("DeptCoSearchUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToChair")) {
				if (metaDataMap.containsKey("ChairSearchUserId")) {
					participant = metaDataMap.get("ChairSearchUserId").toString();
				} else {
					logger.error("ChairSearchUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToDean")) {
				if (metaDataMap.containsKey("DeanSearchUserId")) {
					participant = metaDataMap.get("DeanSearchUserId").toString();
				} else {
					logger.error("DeanSearchUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			else if (stage.equalsIgnoreCase("ToInitiator")) {
				if (metaDataMap.containsKey("InitiatorUserId")) {
					participant = metaDataMap.get("InitiatorUserId").toString();
				} else {
					logger.error("InitiatorUserId value is not set in metadataMap");
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