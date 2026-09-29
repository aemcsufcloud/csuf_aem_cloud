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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=Designation participant chooser" })

public class DesignationPartcipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(DesignationPartcipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the Schedule Change GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToInitiator")) {
				if (metaDataMap.containsKey("InitiatorUserId")) {
					participant = metaDataMap.get("InitiatorUserId").toString();
				} else {
					logger.error("InitiatorUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}

			else if (stage.equalsIgnoreCase("ToResponsibleManager")) {
				if (metaDataMap.containsKey("ResponsibleManagerUserId")) {
					participant = metaDataMap.get("ResponsibleManagerUserId").toString();
				} else {
					logger.error("ResponsibleManagerUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToCashHandlingPersonnelOne")) {
				if (metaDataMap.containsKey("CashHandlingPersonnelOneUserId")) {
					participant = metaDataMap.get("CashHandlingPersonnelOneUserId").toString();
				} else {
					logger.error("CashHandlingPersonnelOneUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToCashHandlingPersonnelTwo")) {
				if (metaDataMap.containsKey("CashHandlingPersonnelTwoUserId")) {
					participant = metaDataMap.get("CashHandlingPersonnelTwoUserId").toString();
				} else {
					logger.error("CashHandlingPersonnelTwoUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}

		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in Designation GetParticipant Step: {}", participant);
		return participant;
	}
}