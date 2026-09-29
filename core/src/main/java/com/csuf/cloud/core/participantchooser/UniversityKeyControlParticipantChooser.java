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
		"chooser.label=University Key Control Participant Chooser" })
public class UniversityKeyControlParticipantChooser implements ParticipantStepChooser {
	
	private static final Logger logger = LoggerFactory.getLogger(UniversityKeyControlParticipantChooser.class);

	@Reference
	private FallbackUserConfigService fallbackUserConfigService;

	@Override
	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the University Key Control GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("MetaDataMap Values == {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToApprover")) {
				if (metaDataMap.containsKey("ApproverUserId")) {
					participant = metaDataMap.get("ApproverUserId").toString();
				} else {
					logger.error("ApproverUserId is not set in MetaDataMap");
					participant = fallbackUserConfigService.fallbackUserId();
				}
			}

		} else {
			logger.error("Stage value is not set in MetaDataMap");
		}
		logger.info("####### Participant in University Key Control GetParticipant Step: {}", participant);
		return participant;
	}

}
