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
		"chooser.label=New Position Description Manager dynamic participant chooser"})

public class NewPositionDescriptionManagerParticipantChooser implements ParticipantStepChooser{
	
	private static final Logger logger = LoggerFactory.getLogger(NewPositionDescriptionManagerParticipantChooser.class);

	@Override
	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap) throws WorkflowException {

		logger.info(
				"################ Inside the New Position Description Manager ParticipantChooser GetParticipant ##########################");
		
		String participant = "";
		Workflow wf = workItem.getWorkflow();
		logger.info("stage value== " + wf.getWorkflowData().getMetaDataMap().get("stage"));
		
		String valStr1;
		String valStr2;
		
		for(Map.Entry<String, Object> entry1 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {
			
			if(entry1.getKey().matches("stage")) {
				valStr1 = entry1.getValue().toString();	
				
				if (valStr1.equals("ToMPPReview")) {
					for (Map.Entry<String, Object> entry2 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {		
						if (entry2.getKey().matches("staffMPPUserId")) {							
							valStr2 = entry2.getValue().toString();
							participant = valStr2;	
						}
					}
				}
				
				if (valStr1.equals("ToIncumbent")) {
					for (Map.Entry<String, Object> entry2 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {		
						if (entry2.getKey().matches("incumbentUserId")) {							
							valStr2 = entry2.getValue().toString();
							participant = valStr2;	
						}
					}
				}
				
				if (valStr1.equals("ToManagementSupervisor")) {					
					for (Map.Entry<String, Object> entry2 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {						
						if (entry2.getKey().matches("managementSupervisorUserId")) {							
							valStr2 = entry2.getValue().toString();
							participant = valStr2;							
						}
					}
				}
				
				if (valStr1.equals("ToDepartmentHead")) {					
					for (Map.Entry<String, Object> entry2 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {						
						if (entry2.getKey().matches("departmentHeadUserId")) {							
							valStr2 = entry2.getValue().toString();
							participant = valStr2;							
						}
					}
				}

				if (valStr1.equals("ToAppropriateAdmin")) {					
					for (Map.Entry<String, Object> entry2 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {						
						if (entry2.getKey().matches("appropriateAdminUserId")) {							
							valStr2 = entry2.getValue().toString();
							participant = valStr2;							
						}
					}
				}
				
				if (valStr1.equals("ToVP")) {					
					for (Map.Entry<String, Object> entry2 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {						
						if (entry2.getKey().matches("vpUserId")) {							
							valStr2 = entry2.getValue().toString();
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
