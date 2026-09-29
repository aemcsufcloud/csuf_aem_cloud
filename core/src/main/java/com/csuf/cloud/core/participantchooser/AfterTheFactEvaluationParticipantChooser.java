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
		"chooser.label=After The Fact Evaluation participant chooser" })
public class AfterTheFactEvaluationParticipantChooser implements ParticipantStepChooser {

	private static final Logger logger = LoggerFactory.getLogger(AfterTheFactEvaluationParticipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the AfterTheFactEvaluation GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToFaculty")) {
				if (metaDataMap.containsKey("FacultyUserId")) {
					participant = metaDataMap.get("FacultyUserId").toString();
					logger.debug("FacultyUserId == {}", participant);
				} else {
					logger.error("FacultyUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToChair")) {
				if (metaDataMap.containsKey("ChairUserId")) {
					participant = metaDataMap.get("ChairUserId").toString();
					logger.debug("ChairUserId == {}", participant);
				} else {
					logger.error("ChairUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}

		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in AfterTheFactEvaluation GetParticipant Step: {}", participant);
		return participant;
	}

}
