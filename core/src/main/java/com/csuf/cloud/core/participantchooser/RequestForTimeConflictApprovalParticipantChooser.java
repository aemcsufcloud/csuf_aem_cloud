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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=Request For Time Conflict Approval participant chooser" })
public class RequestForTimeConflictApprovalParticipantChooser  implements ParticipantStepChooser{

	
private static final Logger logger = LoggerFactory.getLogger(RequestForTimeConflictApprovalParticipantChooser.class);
	
	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the RequestForTimeConflictApproval GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToTimeConflictCourseInstructor")) {
				if (metaDataMap.containsKey("TimeConflictCourseInstructorUserId")) {
					participant = metaDataMap.get("TimeConflictCourseInstructorUserId").toString();
					logger.debug("TimeConflictCourseInstructorUserId == {}", participant);
				} else {
					logger.error("TimeConflictCourseInstructorUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}	
			
			if (stage.equalsIgnoreCase("ToRequestedCourseInstructor")) {
				if (metaDataMap.containsKey("RequestedCourseInstructorUserId")) {
					participant = metaDataMap.get("RequestedCourseInstructorUserId").toString();
					logger.debug("RequestedCourseInstructorUserId == {}", participant);
				} else {
					logger.error("RequestedCourseInstructorUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}	
					
			
		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in RequestForTimeConflictApproval GetParticipant Step: {}", participant);
		return participant;
	}

}
