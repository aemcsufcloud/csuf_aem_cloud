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
		"chooser.label=Property Management participant chooser" })

public class PropertyManagementPartcipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(PropertyManagementPartcipantChooser.class);

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
				if (metaDataMap.containsKey("InitiatorUserID")) {
					participant = metaDataMap.get("InitiatorUserID").toString();
				} else {
					logger.error("InitiatorUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			/*
			 * else if (stage.equalsIgnoreCase("ToApprover")) { if
			 * (metaDataMap.containsKey("DeptHeadUserID")) { participant =
			 * metaDataMap.get("DeptHeadUserID").toString(); } else {
			 * logger.error("DeptHeadUserID value is not set in metadataMap"); participant =
			 * fallBackUserService.fallbackUserId(); } } else if
			 * (stage.equalsIgnoreCase("ToRequestor")) { if
			 * (metaDataMap.containsKey("RequestorUserID")) { participant =
			 * metaDataMap.get("RequestorUserID").toString(); } else {
			 * logger.error("RequestorUserID value is not set in metadataMap"); participant
			 * = fallBackUserService.fallbackUserId(); } }
			 */
			else if (stage.equalsIgnoreCase("ToDepartmentAdministratorApprover")) {
				if (metaDataMap.containsKey("DeptAdminApproverUserID")) {
					participant = metaDataMap.get("DeptAdminApproverUserID").toString();
				} else {
					logger.error("DeptAdminApproverUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToAssetCoordinator")) {
				if (metaDataMap.containsKey("DeptAssetRecordKeeperUserID")) {
					participant = metaDataMap.get("DeptAssetRecordKeeperUserID").toString();
				} else {
					logger.error("DeptAssetRecordKeeperUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}

		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in Property Management GetParticipant Step: {}", participant);
		return participant;
	}
}