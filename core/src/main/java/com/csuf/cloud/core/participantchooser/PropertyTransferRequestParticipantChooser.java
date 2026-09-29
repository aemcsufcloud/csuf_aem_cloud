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
		"chooser.label=Property Transfer Request participant chooser" })
public class PropertyTransferRequestParticipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(PropertyTransferRequestParticipantChooser.class);
	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {
		logger.debug("################ Inside the Property Transfer Request GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;
		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);
			if (stage.equalsIgnoreCase("ToInitiator")) {
				if (metaDataMap.containsKey("InitiatorUserID")) {
					participant = metaDataMap.get("InitiatorUserID").toString();
					logger.debug("InitiatorUserID == {}", participant);
				} else {
					logger.error("InitiatorUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToDepartmentAssetCoordinator")) {
				if (metaDataMap.containsKey("DepartmentAssetCoordinatorUserID")) {
					participant = metaDataMap.get("DepartmentAssetCoordinatorUserID").toString();
					logger.debug("DepartmentAssetCoordinatorUserId == {}", participant);
				} else {
					logger.error("DepartmentAssetCoordinatorUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToDepartmentAdministrator")) {
				if (metaDataMap.containsKey("DepartmentAdministratorUserID")) {
					participant = metaDataMap.get("DepartmentAdministratorUserID").toString();
					logger.debug("DepartmentAdministratorUserId == {}", participant);
				} else {
					logger.error("DepartmentAdministratorUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			if (stage.equalsIgnoreCase("ToNewCustodian")) {
				if (metaDataMap.containsKey("NewCustodianUserID")) {
					participant = metaDataMap.get("NewCustodianUserID").toString();
					logger.debug("NewCustodianUserID == {}", participant);
				} else {
					logger.error("NewCustodianUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in Property Transfer Request GetParticipant Step: {}", participant);
		return participant;
	}
}