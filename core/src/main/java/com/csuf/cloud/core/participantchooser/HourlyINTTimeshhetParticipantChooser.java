package com.csuf.cloud.core.participantchooser;

import java.util.Map;
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
		"chooser.label=Hourly INT Timesheet dynamic participant chooser" })

public class HourlyINTTimeshhetParticipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(HourlyINTTimeshhetParticipantChooser.class);

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {
		logger.info(
				"################ Inside the Hourly INT Timesheet GetParticipant ##########################");
		String participant = "";
		Workflow wf = workItem.getWorkflow();
		logger.info("Stage value==" + wf.getWorkflowData().getMetaDataMap().get("stage"));
		
		String valStr1;
		String valStr2;
		for (Map.Entry<String, Object> entry1 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {
			logger.info("Key = " + entry1.getKey() + ", Value = " + entry1.getValue());
			if (entry1.getKey().matches("stage")) {
				valStr1 = entry1.getValue().toString();
				
				if (valStr1.equals("ToTimekeeper")) {  
					for (Map.Entry<String, Object> entry3 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {
						if (entry3.getKey().matches("TimekeeperUserId")) {
							valStr2 = entry3.getValue().toString();
							participant = valStr2;
						}
					}
				}
				if (valStr1.equals("ToAuthApprover")) {  
					for (Map.Entry<String, Object> entry3 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {
						if (entry3.getKey().matches("AuthApproverUserId")) {
							valStr2 = entry3.getValue().toString();
							participant = valStr2;
						}
					}
				}
				if (valStr1.equals("ToManager")) {
					for (Map.Entry<String, Object> entry4 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {
						if (entry4.getKey().matches("ManagerUserId")) {
							valStr2 = entry4.getValue().toString();
							participant = valStr2;
						}
					}
				}	
				if (valStr1.equals("ToEmployee")) {  
					for (Map.Entry<String, Object> entry3 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {
						if (entry3.getKey().matches("EmpUserId")) {
							valStr2 = entry3.getValue().toString();
							participant = valStr2;
						}
					}
				}
			}
		}

		logger.info("####### Participant : " + participant + " ##############");
		return participant;
	}
}