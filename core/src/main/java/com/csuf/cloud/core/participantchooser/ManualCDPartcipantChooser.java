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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=Manual CD dynamic participant chooser" })

public class ManualCDPartcipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(ManualCDPartcipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the Manual CD GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("stage")) {
			stage = metaDataMap.get("stage").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToApprovingOfficial")) {
				if (metaDataMap.containsKey("AuthApproverUserId")) {
					participant = metaDataMap.get("AuthApproverUserId").toString();
				} else {
					logger.error("AuthApproverUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} /*
				 * else if (stage.equalsIgnoreCase("ToManager")) { if
				 * (metaDataMap.containsKey("ManagerUserId")) { participant =
				 * metaDataMap.get("ManagerUserId").toString(); } else {
				 * logger.error("ManagerUserId value is not set in metadataMap"); participant =
				 * fallBackUserService.fallbackUserId(); } }
				 */
		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in Manual CD GetParticipant Step: {}", participant);
		return participant;
	}
}