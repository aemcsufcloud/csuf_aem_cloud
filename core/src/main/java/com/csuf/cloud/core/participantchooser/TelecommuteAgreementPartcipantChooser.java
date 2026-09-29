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
		"chooser.label=Telecommute Agreement participant chooser" })

public class TelecommuteAgreementPartcipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(TelecommuteAgreementPartcipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the Telecommute Agreement GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToAdmin")) {
				if (metaDataMap.containsKey("AdminUserId")) {
					participant = metaDataMap.get("AdminUserId").toString();
				} else {
					logger.error("AdminUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToRequestor")) {
				if (metaDataMap.containsKey("EmplUserId")) {
					participant = metaDataMap.get("EmplUserId").toString();
				} else {
					logger.error("EmplUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}else if (stage.equalsIgnoreCase("ToDivisionApprover")) {
				if (metaDataMap.containsKey("DivisionAppUserId")) {
					participant = metaDataMap.get("DivisionAppUserId").toString();
				} else {
					logger.error("DivisionAppUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}

		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in FAER GetParticipant Step: {}", participant);
		return participant;
	}
}