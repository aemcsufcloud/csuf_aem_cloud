package com.csuf.cloud.core.participantchooser;

import java.util.Map;
import java.util.Map.Entry;

import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.ParticipantStepChooser;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.Workflow;
import com.adobe.granite.workflow.metadata.MetaDataMap;

@Component(service = ParticipantStepChooser.class, property = {
		"chooser.label=STD 682 Overtime Distributed dynamic participant chooser" })

public class STD682OvertimeDistributedarticipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(STD682OvertimeDistributedarticipantChooser.class);

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {
		logger.info(
				"################ Inside the STD 682 Overtime Distributed ParticipantChooser GetParticipant ##########################");
		String participant = "";
		Workflow wf = workItem.getWorkflow();
		logger.info("Stage value==" + wf.getWorkflowData().getMetaDataMap().get("stage"));
		
		String metaDataMapVal1;
		String metaDataMapVal2;
		for (Map.Entry<String, Object> entry1 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {
			logger.info("Key = " + entry1.getKey() + ", Value = " + entry1.getValue());
			if (entry1.getKey().matches("stage")) {
				metaDataMapVal1 = entry1.getValue().toString();
				
				if (metaDataMapVal1.equals("ToTimeKeeper")) {
					Map<String, Object> participantUserIDValues =  workItem.getWorkflowData().getMetaDataMap();
					metaDataMapVal2 = participantUserIDValues.get("timeKeeperUserID").toString();
					participant = metaDataMapVal2;
				}
				
				if (metaDataMapVal1.equals("ToApprovingOfficial")) {
					Map<String, Object> participantUserIDValues =  workItem.getWorkflowData().getMetaDataMap();
					metaDataMapVal2 = participantUserIDValues.get("approvingOfficialUserID").toString();
					participant = metaDataMapVal2;
				}
				
				if (metaDataMapVal1.equals("ToManager")) {
					Map<String, Object> participantUserIDValues =  workItem.getWorkflowData().getMetaDataMap();
					metaDataMapVal2 = participantUserIDValues.get("managerUserID").toString();
					participant = metaDataMapVal2;
				}
				if (metaDataMapVal1.equals("ToRequestor")) {
					Map<String, Object> participantUserIDValues =  workItem.getWorkflowData().getMetaDataMap();
					metaDataMapVal2 = participantUserIDValues.get("RequestorUserId").toString();
					participant = metaDataMapVal2;
				}
			}
		}

		logger.info("####### Participant : " + participant + " ##############");
		return participant;
	}
}