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
		"chooser.label=TA Substitute Faculty Appointment dynamic participant chooser" })

public class TASubstituteFacultyAppointmentParticipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory
			.getLogger(TASubstituteFacultyAppointmentParticipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug(
				"################ Inside TA Substitute Faculty Appointment for Short Duration ParticipantChooser GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		// logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("stage")) {
			stage = metaDataMap.get("stage").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToRequestor")) {
				if (metaDataMap.containsKey("PreparerUserID")) {
					participant = metaDataMap.get("PreparerUserID").toString();
				} else {
					logger.error("PreparerUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToOptionalReviewer")) {
                if (metaDataMap.containsKey("optionalReviewerUserID")) {
                    if (metaDataMap.containsKey("optionalReviewerUserID")) {
                        participant = metaDataMap.get("optionalReviewerUserID").toString();
                    } else {
                        logger.error("OptionalReviewerUserId value is not set in metadataMap");
                        participant = fallBackUserService.fallbackUserId();
                    }
                } else {
                    logger.error("OptionalReviewerUserId value is not set in metadataMap");
                    participant = fallBackUserService.fallbackUserId();
                }
            } else if (stage.equalsIgnoreCase("ToChair")) {
				if (metaDataMap.containsKey("ChairUserID")) {
					participant = metaDataMap.get("ChairUserID").toString();
				} else {
					logger.error("ChairUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToDean")) {
				if (metaDataMap.containsKey("DeanUserID")) {
					participant = metaDataMap.get("DeanUserID").toString();
				} else {
					logger.error("DeanUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToSubstituteFaculty")) {
				if (metaDataMap.containsKey("SubstituteFacultyUserId")) {
					participant = metaDataMap.get("SubstituteFacultyUserId").toString();
				} else {
					logger.error("SubstituteFacultyUserId value is not set in metadataMap");
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