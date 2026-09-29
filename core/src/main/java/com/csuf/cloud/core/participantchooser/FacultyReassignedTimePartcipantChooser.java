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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=Faculty Reassigned Time participant chooser" })
public class FacultyReassignedTimePartcipantChooser implements ParticipantStepChooser{
	
	private static final Logger logger = LoggerFactory.getLogger(FacultyReassignedTimePartcipantChooser.class);
	
	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the Faculty Reassigned Time GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		//logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToFaculty")) {
				if (metaDataMap.containsKey("FacultyUserID")) {
					participant = metaDataMap.get("FacultyUserID").toString();
				} else {
					logger.error("FacultyUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			
			if (stage.equalsIgnoreCase("ToEvalFaculty")) {
				if (metaDataMap.containsKey("FacultyUserID")) {
					participant = metaDataMap.get("FacultyUserID").toString();
				} else {
					logger.error("FacultyUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			
			if (stage.equalsIgnoreCase("ToChair")) {
				if (metaDataMap.containsKey("ChairUserID")) {
					participant = metaDataMap.get("ChairUserID").toString();
				} else {
					logger.error("ChairUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			
			if (stage.equalsIgnoreCase("ToEvalChair")) {
				if (metaDataMap.containsKey("ChairUserID")) {
					participant = metaDataMap.get("ChairUserID").toString();
				} else {
					logger.error("ChairUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			
			if (stage.equalsIgnoreCase("ToDean")) {
				if (metaDataMap.containsKey("DeanUserID")) {
					participant = metaDataMap.get("DeanUserID").toString();
				} else {
					logger.error("DeanUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			
			if (stage.equalsIgnoreCase("ToEvalInitiator")) {
				if (metaDataMap.containsKey("InitiatorUserID")) {
					participant = metaDataMap.get("InitiatorUserID").toString();
				} else {
					logger.error("InitiatorUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			
			if (stage.equalsIgnoreCase("ToAdditionalReviewer") || stage.equalsIgnoreCase("ToEvalAdditionalReviewer")) {
				if (metaDataMap.containsKey("AdditionalReviewerUserId")) {
					participant = metaDataMap.get("AdditionalReviewerUserId").toString();
				} else {
					logger.error("AdditionalReviewerUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			
					
		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in Faculty Reassigned Time GetParticipant Step: {}", participant);
		return participant;
	}
}
