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

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=Substitute Faculty Timesheet Participant chooser" })

public class SubFacultyTimesheetPartcipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(SubFacultyTimesheetPartcipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the Substitute Faculty Timesheet GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;

		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);

			if (stage.equalsIgnoreCase("ToChair")) {
				if (metaDataMap.containsKey("ChairUserID")) {
					if (StringUtils.isNotBlank(metaDataMap.get("ChairUserID").toString())) {
						participant = metaDataMap.get("ChairUserID").toString();
					} else {
						logger.error("ChairUserID value is not set in metadataMap");
						participant = fallBackUserService.fallbackUserId();
					}
				} else {
					logger.error("ChairUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}

			else if (stage.equalsIgnoreCase("ToRequestor")) {
				if (metaDataMap.containsKey("DeptCooUserId")) {
					if (StringUtils.isNotBlank(metaDataMap.get("DeptCooUserId").toString())) {
						participant = metaDataMap.get("DeptCooUserId").toString();
					} else {
						logger.error("DeptCooUserId value is not set in metadataMap");
						participant = fallBackUserService.fallbackUserId();
					}
				} else {
					logger.error("DeptCooUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} 
			else if (stage.equalsIgnoreCase("ToOptionalReviewer")) {
                if (metaDataMap.containsKey("optionalReviewerUserID")) {
                    if (StringUtils.isNotBlank(metaDataMap.get("optionalReviewerUserID").toString())) {
                        participant = metaDataMap.get("optionalReviewerUserID").toString();
                    } else {
                        logger.error("OptionalReviewerUserId value is not set in metadataMap");
                        participant = fallBackUserService.fallbackUserId();
                    }
                } else if (metaDataMap.containsKey("OptionalReviewerUserID")) {
                	if (StringUtils.isNotBlank(metaDataMap.get("OptionalReviewerUserID").toString())) {
                        participant = metaDataMap.get("OptionalReviewerUserID").toString();
                    } else {
                        logger.error("OptionalReviewerUserID value is not set in metadataMap");
                        participant = fallBackUserService.fallbackUserId();
                    }
                }
                else {
                    logger.error("OptionalReviewerUserId value is not set in metadataMap");
                    participant = fallBackUserService.fallbackUserId();
                }
            }
			
			else if (stage.equalsIgnoreCase("ToFaculty")) {
				if (metaDataMap.containsKey("FacultyUserId")) {
					if (StringUtils.isNotBlank(metaDataMap.get("FacultyUserId").toString())) {
						participant = metaDataMap.get("FacultyUserId").toString();
					} else {
						logger.error("FacultyUserId value is not set in metadataMap");
						participant = fallBackUserService.fallbackUserId();
					}
				} else {
					logger.error("FacultyUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} 

		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in Substitute Faculty Timesheet GetParticipant Step: {}", participant);
		return participant;
	}
}