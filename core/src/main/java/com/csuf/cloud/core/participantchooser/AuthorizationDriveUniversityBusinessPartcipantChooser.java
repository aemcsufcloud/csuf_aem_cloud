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
		"chooser.label= Authorization Drive University Business participant chooser" })

public class AuthorizationDriveUniversityBusinessPartcipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory
			.getLogger(AuthorizationDriveUniversityBusinessPartcipantChooser.class);

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
				if (metaDataMap.containsKey("DriverUserId")) {
					participant = metaDataMap.get("DriverUserId").toString();
				} else {
					logger.error("DriverUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			if (stage.equalsIgnoreCase("ToSupervisor")) {
				if (metaDataMap.containsKey("SupervisorUsedId")) {
					participant = metaDataMap.get("SupervisorUsedId").toString();
				} else {
					logger.error("SupervisorUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in AuthorizationDriveUniversityBusiness GetParticipant Step: {}", participant);
		return participant;
	}
}