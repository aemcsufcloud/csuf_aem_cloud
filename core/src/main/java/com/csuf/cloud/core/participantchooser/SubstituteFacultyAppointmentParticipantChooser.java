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
		"chooser.label=Substitute Faculty Appointment dynamic participant chooser" })

public class SubstituteFacultyAppointmentParticipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(SubstituteFacultyAppointmentParticipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug(
				"################ Inside Substitute Faculty Appointment for Short Duration ParticipantChooser GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		// logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("stage")) {
			stage = metaDataMap.get("stage").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToDeptCoordinator")) {
				if (metaDataMap.containsKey("departmentCoordinatorUserID")) {
					participant = metaDataMap.get("departmentCoordinatorUserID").toString();
				} else {
					logger.error("departmentCoordinatorUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToChair")) {
				if (metaDataMap.containsKey("chairUserID")) {
					participant = metaDataMap.get("chairUserID").toString();
				} else {
					logger.error("chairUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToDean")) {
				if (metaDataMap.containsKey("deanUserID")) {
					participant = metaDataMap.get("deanUserID").toString();
				} else {
					logger.error("deanUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToFaculty")) {
				if (metaDataMap.containsKey("facultyUserID")) {
					participant = metaDataMap.get("facultyUserID").toString();
				} else {
					logger.error("facultyUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToOptionalReviewer")) {
				if (metaDataMap.containsKey("optionalReviewerUserID")) {
					participant = metaDataMap.get("optionalReviewerUserID").toString();
				} else {
					logger.error("optionalReviewerUserID value is not set in metadataMap");
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