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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=Petitions dynamic participant chooser" })

public class PetitionParticipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(PetitionParticipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside Petitions ParticipantChooser GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("stage")) {
			stage = metaDataMap.get("stage").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToInstructor")) {
				if (metaDataMap.containsKey("instructorUserID")) {
					participant = metaDataMap.get("instructorUserID").toString();
				} else {
					logger.error("instructorUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToAssociateDean")) {
				if (metaDataMap.containsKey("DenaUserID")) {
					participant = metaDataMap.get("DenaUserID").toString();
				} else {
					logger.error("DenaUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			else if (stage.equalsIgnoreCase("ToChair")) {
				if (metaDataMap.containsKey("ChairUserID")) {
					participant = metaDataMap.get("ChairUserID").toString();
				} else {
					logger.error("ChairUserID value is not set in metadataMap");
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