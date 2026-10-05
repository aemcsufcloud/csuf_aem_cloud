package com.csuf.cloud.core.workflow;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;

@Component(
    service = WorkflowProcess.class,
    property = {
        "process.label=Read Input TXT File"
    }
)
public class ReadTxtProcess implements WorkflowProcess {

    private static final Logger LOG = LoggerFactory.getLogger(ReadTxtProcess.class);

    @Override
    public void execute(WorkItem workItem, WorkflowSession wfSession, MetaDataMap args)
            throws WorkflowException {
				
		LOG.error("September ReadTxtProcess");

        WorkflowData data = workItem.getWorkflowData();
        if (!"JCR_PATH".equals(data.getPayloadType())) {
            throw new WorkflowException("Unsupported payload type: " + data.getPayloadType());
        }

        String payloadPath = data.getPayload().toString();
		LOG.error("September Processing payload: {}", payloadPath);

        LOG.info("Processing payload: {}", payloadPath);

        ResourceResolver resolver = wfSession.adaptTo(ResourceResolver.class);
        if (resolver == null) {
            throw new WorkflowException("Could not obtain ResourceResolver from workflow session");
        }

        Resource resource = resolver.getResource(payloadPath);
        Asset asset = (resource != null) ? resource.adaptTo(Asset.class) : null;
        if (asset == null) {
            throw new WorkflowException("Payload is not a DAM asset: " + payloadPath);
        }

        Rendition original = asset.getOriginal();
		LOG.error("September original: {}", original);
        if (original == null) {
            throw new WorkflowException("No original rendition found for: " + payloadPath);
        }

        try (InputStream is = original.getStream();
             BufferedReader reader = new BufferedReader(
                     new InputStreamReader(is, StandardCharsets.UTF_8))) {

            String line;
            int lineNo = 0;
            while ((line = reader.readLine()) != null) {
                lineNo++;
                // ---- your existing business logic goes here ----
                LOG.error("September Line {}: {}", lineNo, line);
				LOG.debug("Line {}: {}", lineNo, line);
            }
			LOG.error("September Finished reading {} lines from {}", lineNo, payloadPath);
            LOG.info("Finished reading {} lines from {}", lineNo, payloadPath);
			

        } catch (IOException e) {
            throw new WorkflowException("Failed to read file: " + payloadPath, e);
        }
    }
}