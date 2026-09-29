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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=FAR participant chooser" })

public class FARPartcipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(FARPartcipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the FAER GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);
			
			if (stage.equalsIgnoreCase("ToOptional")) {
				if (metaDataMap.containsKey("OptionalReviewerUserId")) {
					participant = metaDataMap.get("OptionalReviewerUserId").toString();
				} else {
					logger.error("OptionalReviewerUserId value is not set in metadataMap");
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
			else if (stage.equalsIgnoreCase("ToDean")) {
				if (metaDataMap.containsKey("DeanDesigneeUserID")) {
					participant = metaDataMap.get("DeanDesigneeUserID").toString();
				} else {
					logger.error("DeanDesigneeUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			else if (stage.equalsIgnoreCase("ToRequestor")) {
				if (metaDataMap.containsKey("logUser")) {
					participant = metaDataMap.get("logUser").toString();
				} else {
					logger.error("logUser value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}		
			
		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in FAR GetParticipant Step: {}", participant);
		return participant;
	}
}