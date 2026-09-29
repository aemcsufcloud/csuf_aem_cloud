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
		"chooser.label=Delegation Of Authority Change dynamic participant chooser"})

public class DelegationOfAuthorityChangeParticipantChooser implements ParticipantStepChooser{
	
	private static final Logger logger = LoggerFactory.getLogger(DelegationOfAuthorityChangeParticipantChooser.class);

	@Override
	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap) throws WorkflowException {

		logger.info(
				"################ Inside the Delegation Of Authority Change ParticipantChooser GetParticipant ##########################");
		
		String participant = "";
		Workflow wf = workItem.getWorkflow();
		logger.info("stage value== " + wf.getWorkflowData().getMetaDataMap().get("stage"));
		
		String valStr1;
		
		for(Map.Entry<String, Object> entry1 : workItem.getWorkflowData().getMetaDataMap().entrySet()) {
			
			if(entry1.getKey().matches("stage")) {
				valStr1 = entry1.getValue().toString();	
				
				if (valStr1.equals("ToFaculty")) {
					Map<String, Object> participantUserIDValues =  workItem.getWorkflowData().getMetaDataMap();
					valStr1 = participantUserIDValues.get("facultyUserID").toString();
					participant = valStr1;
				}
				
				if (valStr1.equals("ToStudent")) {
					Map<String, Object> participantUserIDValues =  workItem.getWorkflowData().getMetaDataMap();
					valStr1 = participantUserIDValues.get("studentUserID").toString();
					participant = valStr1;
				}
				
				if (valStr1.equals("ToPrimaryWarrant")) {
					Map<String, Object> participantUserIDValues =  workItem.getWorkflowData().getMetaDataMap();
					valStr1 = participantUserIDValues.get("primaryWarrantUserID").toString();
					participant = valStr1;
				}
				
				if (valStr1.equals("ToAlternateWarrant")) {
					Map<String, Object> participantUserIDValues =  workItem.getWorkflowData().getMetaDataMap();
					valStr1 = participantUserIDValues.get("alternateWarrantUserID").toString();
					participant = valStr1;
				}

				if (valStr1.equals("ToPrimaryCMSStudent")) {
					Map<String, Object> participantUserIDValues =  workItem.getWorkflowData().getMetaDataMap();
					valStr1 = participantUserIDValues.get("primaryCMSStudentUserID").toString();
					participant = valStr1;
				}
				
				if (valStr1.equals("ToAlternateCMSStudent")) {
					Map<String, Object> participantUserIDValues =  workItem.getWorkflowData().getMetaDataMap();
					valStr1 = participantUserIDValues.get("alternateCMSStudentUserID").toString();
					participant = valStr1;
				}
				
				if (valStr1.equals("ToDivisionHead")) {
					Map<String, Object> participantUserIDValues =  workItem.getWorkflowData().getMetaDataMap();
					valStr1 = participantUserIDValues.get("divisionHeadUserID").toString();
					participant = valStr1;
				}

				if (valStr1.equals("ToCollegeDean")) {
					Map<String, Object> participantUserIDValues =  workItem.getWorkflowData().getMetaDataMap();
					valStr1 = participantUserIDValues.get("collegeDeanUserID").toString();
					participant = valStr1;
				}
				
				if (valStr1.equals("ToDepartmentHead")) {
					Map<String, Object> participantUserIDValues =  workItem.getWorkflowData().getMetaDataMap();
					valStr1 = participantUserIDValues.get("departmentHeadUserID").toString();
					participant = valStr1;
				}				
			}
		}
		logger.info("####### Participant : " + participant + " ##############");
		return participant;
	}
}
