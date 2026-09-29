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
		"chooser.label=Chair/Director Appointment dynamic participant chooser" })

public class ChairDirectorAppointmentParticipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(ChairDirectorAppointmentParticipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug(
				"################ Inside Chair/Director Appointment ParticipantChooser GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		//logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("stage")) {
			stage = metaDataMap.get("stage").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToElectionAdmin")) {
				if (metaDataMap.containsKey("electionAdminUserID")) {
					participant = metaDataMap.get("electionAdminUserID").toString();
				} else {
					logger.error("electionAdminUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToFormFiller")) {
				if (metaDataMap.containsKey("formFillerUserID")) {
					participant = metaDataMap.get("formFillerUserID").toString();
				} else {
					logger.error("formFillerUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToDean")) {
				if (metaDataMap.containsKey("deanUserID")) {
					participant = metaDataMap.get("deanUserID").toString();
				} else {
					logger.error("deanUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToProvost")) {
				if (metaDataMap.containsKey("provostUserID")) {
					participant = metaDataMap.get("provostUserID").toString();
				} else {
					logger.error("provostUserID value is not set in metadataMap");
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