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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=Pre-retirement participant chooser" })

public class PreRetirementTBPartcipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(PreRetirementTBPartcipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the Pre retirement in TB GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToChair")) {
				if (metaDataMap.containsKey("ChairUserID")) {
					participant = metaDataMap.get("ChairUserID").toString();
				} else {
					logger.error("ChairUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}	
			else if (stage.equalsIgnoreCase("ToDean")) {
				if (metaDataMap.containsKey("DeanUserID")) {
					participant = metaDataMap.get("DeanUserID").toString();
				} else {
					logger.error("DeanUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			else if (stage.equalsIgnoreCase("ToRequestor")) {
				if (metaDataMap.containsKey("PreparerUserId")) {
					participant = metaDataMap.get("PreparerUserId").toString();
				} else {
					logger.error("PreparerUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			else if (stage.equalsIgnoreCase("ToFaculty")) {
				if (metaDataMap.containsKey("FacultyUserID")) {
					participant = metaDataMap.get("FacultyUserID").toString();
				} else {
					logger.error("FacultyUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			
		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in Pre retirement in TB  GetParticipant Step: {}", participant);
		return participant;
	}
}