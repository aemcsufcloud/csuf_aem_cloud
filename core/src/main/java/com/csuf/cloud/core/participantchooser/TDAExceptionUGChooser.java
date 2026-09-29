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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=TDA Exception Undergraduate participant chooser" })
public class TDAExceptionUGChooser implements ParticipantStepChooser{
	
	private static final Logger logger = LoggerFactory.getLogger(TDAExceptionUGChooser.class);
	
	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the TDA Exception Undergraduate GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToInitiator")) {
				if (metaDataMap.containsKey("FacultyUserID")) {
					participant = metaDataMap.get("FacultyUserID").toString();
				} else {
					logger.error("FacultyUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToDean")) {
				if (metaDataMap.containsKey("DeanUserID")) {
					participant = metaDataMap.get("DeanUserID").toString();
				} else {
					logger.error("DeanUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}		
					
		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in TDA Exception Undergraduate GetParticipant Step: {}", participant);
		return participant;
	}
}
