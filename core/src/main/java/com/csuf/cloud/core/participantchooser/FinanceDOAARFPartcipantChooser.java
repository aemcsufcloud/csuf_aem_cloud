package com.csuf.cloud.core.participantchooser;

import org.apache.commons.lang3.StringUtils;
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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=Finance DOA participant chooser" })

public class FinanceDOAARFPartcipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(FinanceDOAARFPartcipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the Finance DOA GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);
			if (stage.equalsIgnoreCase("ToManager")) {
				if (metaDataMap.containsKey("ManagerUserID")) {
					if (StringUtils.isNotBlank(metaDataMap.get("ManagerUserID").toString())) {
						participant = metaDataMap.get("ManagerUserID").toString();
					} else {
						logger.error("ManagerUserID value is not set in metadataMap");
						participant = fallBackUserService.fallbackUserId();
					}
				} else {
					logger.error("ManagerUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			else if (stage.equalsIgnoreCase("ToEmployee")) {
				if (metaDataMap.containsKey("EmployeeUserID")) {
					if (StringUtils.isNotBlank(metaDataMap.get("EmployeeUserID").toString())) {
						participant = metaDataMap.get("EmployeeUserID").toString();
					} else {
						logger.error("EmployeeUserID value is not set in metadataMap");
						participant = fallBackUserService.fallbackUserId();
					}
				} else {
					logger.error("EmployeeUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			else if (stage.equalsIgnoreCase("ToRequestor")) {
				if (metaDataMap.containsKey("RequestorUserId")) {
					if (StringUtils.isNotBlank(metaDataMap.get("RequestorUserId").toString())) {
						participant = metaDataMap.get("RequestorUserId").toString();
					} else {
						logger.error("RequestorUserId value is not set in metadataMap");
						participant = fallBackUserService.fallbackUserId();
					}
				} else {
					logger.error("RequestorUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} 		
		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in Finance DOA GetParticipant Step: {}", participant);
		return participant;
	}
}