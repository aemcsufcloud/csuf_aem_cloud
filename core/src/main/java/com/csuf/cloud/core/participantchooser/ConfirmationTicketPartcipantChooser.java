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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=Confirmation Ticket participant chooser" })

public class ConfirmationTicketPartcipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(ConfirmationTicketPartcipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the Confirmation Ticket GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("stage")) {
			stage = metaDataMap.get("stage").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToAuthDept")) {
				if (metaDataMap.containsKey("TimekeeperUserId")) {
					participant = metaDataMap.get("TimekeeperUserId").toString();
				} else {
					logger.error("TimekeeperUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} 
			logger.debug("participant value == {}", participant);
			/*else if (stage.equalsIgnoreCase("ToManager")) {
				if (metaDataMap.containsKey("ManagerUserId")) {
					participant = metaDataMap.get("ManagerUserId").toString();
				} else {
					logger.error("ManagerUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}*/
		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in Confirmation Ticket GetParticipant Step: {}", participant);
		return participant;
	}
}