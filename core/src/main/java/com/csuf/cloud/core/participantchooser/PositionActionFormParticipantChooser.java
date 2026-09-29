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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=Position Action Form participant chooser" })
public class PositionActionFormParticipantChooser implements ParticipantStepChooser{
	
private static final Logger logger = LoggerFactory.getLogger(PositionActionFormParticipantChooser.class);
	
	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the PositionActionFormParticipantChooser GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToAppropriateRequestor")) {
				if (metaDataMap.containsKey("AppropriateRequestorUserId")) {
					participant = metaDataMap.get("AppropriateRequestorUserId").toString();
					logger.debug("AppropriateRequestorUserId == {}", participant);
				} else {
					logger.error("AppropriateRequestorUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}	
			
			if (stage.equalsIgnoreCase("ToAppropriateApprover")) {
				if (metaDataMap.containsKey("AppropriateApproverUserId")) {
					participant = metaDataMap.get("AppropriateApproverUserId").toString();
					logger.debug("AppropriateApproverUserId == {}", participant);
				} else {
					logger.error("AppropriateApproverUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			
			if (stage.equalsIgnoreCase("ToAppropriateReviewer")) {
				if (metaDataMap.containsKey("AppropriateReviewerUserId")) {
					participant = metaDataMap.get("AppropriateReviewerUserId").toString();
					logger.debug("AppropriateReviewerUserId == {}", participant);
				} else {
					logger.error("AppropriateReviewerUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}	
					
			
		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in PositionActionFormParticipantChooser GetParticipant Step: {}", participant);
		return participant;
	}

}
