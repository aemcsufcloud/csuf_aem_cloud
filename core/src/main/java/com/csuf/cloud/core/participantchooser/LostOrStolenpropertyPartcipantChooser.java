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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=Lost or Stolen Property Form" })

public class LostOrStolenpropertyPartcipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(LostOrStolenpropertyPartcipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the Lost or Stolen Property GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToEmployee")) {
				if (metaDataMap.containsKey("InitiatorUserID")) {
					participant = metaDataMap.get("InitiatorUserID").toString();
				} else {
					logger.error("InitiatorUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}

			else if (stage.equalsIgnoreCase("ToDeptHead")) {

				if (metaDataMap.containsKey("DeptHeadUserID")) {
					participant = metaDataMap.get("DeptHeadUserID").toString();
				} else {
					logger.error("DeptHeadUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}

			else if (stage.equalsIgnoreCase("ToRequestor")) {
				if (metaDataMap.containsKey("RequestorUserID")) {
					participant = metaDataMap.get("RequestorUserID").toString();
				} else {
					logger.error("RequestorUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}

		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in Lost or Stolen Property Form GetParticipant Step: {}", participant);
		return participant;
	}
}