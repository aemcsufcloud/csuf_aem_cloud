package com.csuf.cloud.core.workflow;

import javax.jcr.Session;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;


@Component(
	    service = WorkflowProcess.class,
	    property = {
	        "process.label=Move Processed TXT File"
	    }
	)
	public class MoveProcessedFileProcess implements WorkflowProcess {

	    private static final Logger LOG = LoggerFactory.getLogger(MoveProcessedFileProcess.class);
	    private static final String DEFAULT_TARGET = "/content/dam/processed";

	    @Override
	    public void execute(WorkItem workItem, WorkflowSession wfSession, MetaDataMap args)
	            throws WorkflowException {
	    	LOG.error("October here");

	        String payloadPath = workItem.getWorkflowData().getPayload().toString();
	        
	        LOG.error("October here payloadPath="+payloadPath);

	        // Optional: set "PROCESS_ARGS" in the step dialog to override the target folder
	        String targetFolder = args.get("PROCESS_ARGS", DEFAULT_TARGET);
	        LOG.error("October targetFolder="+targetFolder);

	        ResourceResolver resolver = wfSession.adaptTo(ResourceResolver.class);
	        Session session = wfSession.adaptTo(Session.class);
	        if (resolver == null || session == null) {
	            throw new WorkflowException("Could not obtain resolver/session");
	        }

	        try {
	            Resource source = resolver.getResource(payloadPath);
	            if (source == null) {
	                throw new WorkflowException("Source not found: " + payloadPath);
	            }

	            String destPath = targetFolder + "/" + source.getName();
	            LOG.error("October destPath="+destPath);
	            
	            if (session.nodeExists(destPath)) {
	                // avoid name clash: append timestamp
	                destPath = targetFolder + "/" + System.currentTimeMillis() + "_" + source.getName();
	            }

	            session.move(payloadPath, destPath);
	            session.save();
	            LOG.error("October Moved="+payloadPath);
	            LOG.info("Moved {} to {}", payloadPath, destPath);

	        } catch (Exception e) {
	            throw new WorkflowException("Failed to move file " + payloadPath, e);
	        }
	    }
	}