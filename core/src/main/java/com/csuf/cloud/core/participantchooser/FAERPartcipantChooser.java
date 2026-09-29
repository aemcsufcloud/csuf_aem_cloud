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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=FAER participant chooser" })

public class FAERPartcipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(FAERPartcipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the FAER GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToFaculty")) {
				if (metaDataMap.containsKey("FacultyUserID")) {
					participant = metaDataMap.get("FacultyUserID").toString();
				} else {
					logger.error("FacultyUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			else if (stage.equalsIgnoreCase("ToFundingSource0")) {
				if (metaDataMap.containsKey("ApproverUserID0")) {
					participant = metaDataMap.get("ApproverUserID0").toString();
				} else {
					logger.error("FacultyUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			else if (stage.equalsIgnoreCase("ToFundingSource1")) {
				if (metaDataMap.containsKey("ApproverUserID1")) {
					participant = metaDataMap.get("ApproverUserID1").toString();
				} else {
					logger.error("FacultyUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			else if (stage.equalsIgnoreCase("ToFundingSource2")) {
				if (metaDataMap.containsKey("ApproverUserID2")) {
					participant = metaDataMap.get("ApproverUserID2").toString();
				} else {
					logger.error("FacultyUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			else if (stage.equalsIgnoreCase("ToDean")) {
				if (metaDataMap.containsKey("DeanDesigneeUserID")) {
					participant = metaDataMap.get("DeanDesigneeUserID").toString();
				} else {
					logger.error("FacultyUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			else if (stage.equalsIgnoreCase("ToRequestor")) {
				if (metaDataMap.containsKey("logUser")) {
					participant = metaDataMap.get("logUser").toString();
				} else {
					logger.error("FacultyUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
			else if (stage.equalsIgnoreCase("ToBudgetAnalyst")) {
				if (metaDataMap.containsKey("BudgetAnalystUserId")) {
					participant = metaDataMap.get("BudgetAnalystUserId").toString();
				} else {
					logger.error("BudgetAnalystUserId value is not set in metadataMap");
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