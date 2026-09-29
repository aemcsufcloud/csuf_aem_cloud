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
		"chooser.label=Course Withdrawal dynamic participant chooser" })

public class CourseWithdrawalParticipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(CourseWithdrawalParticipantChooser.class);
	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {
		logger.info(
				"################ Inside the  Course Withdrawal ParticipantChooser GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		// logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;
		if (metaDataMap.containsKey("stepRef")) {
			stage = metaDataMap.get("stepRef").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToInstructor")) {
				if (metaDataMap.containsKey("InstructorUserId")) {
					//participant = metaDataMap.get("InstructorUserId").toString();
					participant = "michellemurillo"; //Commment this and uncomment above line
				} else {
					logger.error("InstructorUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToChair")) {
				if (metaDataMap.containsKey("ChairUserId")) {
					//participant = metaDataMap.get("ChairUserId").toString();
					participant = "nvadlakunta@fullerton.edu";//Commment this and uncomment above line
				} else {
					logger.error("ChairUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else {
				logger.error("stage value is not matching");
			}
		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant : " + participant + " ##############");
		return participant;
	}
}