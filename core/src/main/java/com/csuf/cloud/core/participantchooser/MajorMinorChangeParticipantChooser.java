package com.csuf.cloud.core.participantchooser;

import org.apache.commons.lang.StringUtils;
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
		"chooser.label=Major/Minor Change dynamic participant chooser" })

public class MajorMinorChangeParticipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(MajorMinorChangeParticipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug(
				"################ Inside Major/Minor Change ParticipantChooser GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("stage")) {
			stage = metaDataMap.get("stage").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToChairNewMajor")) {
				if (metaDataMap.containsKey("newMajorChairUserId")) {
					participant = metaDataMap.get("newMajorChairUserId").toString();					
				} else {
					participant = fallBackUserService.fallbackUserId();
				}
			}
			if (stage.equalsIgnoreCase("ToChairSecondMajor")) {
				if (metaDataMap.containsKey("secondMajorChairUserId")) {
					participant = metaDataMap.get("secondMajorChairUserId").toString();					
				} else {
					participant = fallBackUserService.fallbackUserId();
				}
			}
			if (stage.equalsIgnoreCase("ToChairMinor")) {
				if (metaDataMap.containsKey("minorChairUserID")) {
					participant = metaDataMap.get("minorChairUserID").toString();					
				} else {
					participant = fallBackUserService.fallbackUserId();
				}
			}
			if (stage.equalsIgnoreCase("ToChairCertificate")) {
				if (metaDataMap.containsKey("certificateChairUserID")) {
					participant = metaDataMap.get("certificateChairUserID").toString();					
				} else {
					participant = fallBackUserService.fallbackUserId();
				}
			}
		} else {
			logger.error("stage value is not set in metadataMap");
		}

		logger.info("####### Participant : " + participant + " ##############");
		return participant;
	}
}