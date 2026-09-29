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
		"chooser.label=Temp Faculty Report dynamic participant chooser" })

public class TempFacultyReportParticipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(TempFacultyReportParticipantChooser.class);

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {
		logger.info(
				"################ Inside the Temp Faculty Report GetParticipant ##########################");
		String participant = "";
		Workflow wf = workItem.getWorkflow();
		logger.info("Stage value==" + wf.getWorkflowData().getMetaDataMap().get("stage"));
		
		String valStr1;
		String valStr2;
		for (Map.Entry<String, Object> entry1 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {
			logger.info("Key = " + entry1.getKey() + ", Value = " + entry1.getValue());
			if (entry1.getKey().matches("stage")) {
				valStr1 = entry1.getValue().toString();
				
				if (valStr1.equals("ToChair")) {  
					for (Map.Entry<String, Object> entry3 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {
						if (entry3.getKey().matches("ChairUserId")) {
							valStr2 = entry3.getValue().toString();
							participant = valStr2;
						}
					}
				}
				if (valStr1.equals("ToDean")) {
					for (Map.Entry<String, Object> entry4 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {
						if (entry4.getKey().matches("DeanUserId")) {
							valStr2 = entry4.getValue().toString();
							participant = valStr2;
						}
					}
				}	
				if (valStr1.equals("ToDeptCoo")) {
					for (Map.Entry<String, Object> entry4 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {
						if (entry4.getKey().matches("DeptCooUserId")) {
							valStr2 = entry4.getValue().toString();
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