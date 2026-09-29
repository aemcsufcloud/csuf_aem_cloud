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
		"chooser.label=MPP Performance Evaluation dynamic participant chooser" })

public class MPPPerfEvalParticipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(MPPPerfEvalParticipantChooser.class);
	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {
		logger.info(
				"################ Inside the MPPPerfEvalParticipantChooser GetParticipant ##########################");

		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;
		if (metaDataMap.containsKey("stage")) {
			stage = metaDataMap.get("stage").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToApprovingOfficial") || stage.equalsIgnoreCase("ToManager")
					|| stage.equalsIgnoreCase("ToManagerAcknowledge") || stage.equalsIgnoreCase("ToManagerAcknowledge")
					|| stage.equalsIgnoreCase("ToManagerAcknowledge") || stage.equalsIgnoreCase("ToManagerAcknowledge")
					|| stage.equalsIgnoreCase("ToManagerFinalAcknowledge") || stage.equalsIgnoreCase("ToManagerHRDI")
					|| stage.equalsIgnoreCase("ToManagerFinalAcknowledge")
					|| stage.equalsIgnoreCase("ToManagerAcknowledgeOnExpire")) {
				if (metaDataMap.containsKey("managerUserId")) {
					participant = metaDataMap.get("managerUserId").toString();
				} else {
					logger.error("managerUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToEmployee") || stage.equalsIgnoreCase("ToEmployeeAck")
					|| stage.equalsIgnoreCase("ToEmployeeAckOnExpire")) {
				if (metaDataMap.containsKey("empUserId")) {
					participant = metaDataMap.get("empUserId").toString();
				} else {
					logger.error("empUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToHRCoo")) {
				if (metaDataMap.containsKey("reviewerUserId")) {
					participant = metaDataMap.get("reviewerUserId").toString();
				} else {
					logger.error("reviewerUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToAdmin")) {
				if (metaDataMap.containsKey("adminUID")) {
					participant = metaDataMap.get("adminUID").toString();
				} else {
					logger.error("adminUID value is not set in metadataMap");
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