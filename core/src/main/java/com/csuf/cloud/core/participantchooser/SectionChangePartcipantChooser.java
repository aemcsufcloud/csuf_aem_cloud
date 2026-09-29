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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=Section Change participant chooser" })
public class SectionChangePartcipantChooser implements ParticipantStepChooser{
	
	private static final Logger logger = LoggerFactory.getLogger(SectionChangePartcipantChooser.class);
	
	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the Section Change GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToDropCourseInstructor")) {
				if (metaDataMap.containsKey("InstructorUserIdDrop")) {
					participant = metaDataMap.get("InstructorUserIdDrop").toString();
				} else {
					logger.error("InstructorUserIdDrop value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}	
			
			if (stage.equalsIgnoreCase("ToDropCourseInstructor")) {
				if (metaDataMap.containsKey("InstructorUserIdDrop")) {
					participant = metaDataMap.get("InstructorUserIdDrop").toString();
				} else {
					logger.error("InstructorUserIdDrop value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			
			if (stage.equalsIgnoreCase("ToAddCourseInstructor")) {
				if (metaDataMap.containsKey("InstructorUserIdAdd")) {
					participant = metaDataMap.get("InstructorUserIdAdd").toString();
				} else {
					logger.error("InstructorUserIdAdd value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
					
		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in PET GetParticipant Step: {}", participant);
		return participant;
	}
}
