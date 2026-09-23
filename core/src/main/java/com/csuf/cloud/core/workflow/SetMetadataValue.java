package com.csuf.cloud.core.workflow;

import org.apache.commons.lang3.StringUtils;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;

@Component(property = { "service.description=Set CSUF Meatadata Value", "service.vendor=ThoughtFocus",
		"process.label=Set CSUF Meatadata Value" })
public class SetMetadataValue implements WorkflowProcess {
	private static final Logger log = LoggerFactory.getLogger(SetMetadataValue.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {

		String params = args.get("PROCESS_ARGS", String.class);
		if (StringUtils.isNotBlank(params)) {
			String[] parameters = params.split(",");
			String[] paramObtained = parameters;
			int paramLength = parameters.length;
			if (paramLength != 0) {
				for (int i = 0; i < paramLength; ++i) {
					String items = paramObtained[i];
					String[] itemsArray = items.split("=");
					String valueObtained = itemsArray[1];
					String keyObtained = itemsArray[0];
					try {
						MetaDataMap wfd = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
						wfd.put(keyObtained, valueObtained);
						log.debug(" Metadata is set.... and  key , value is : " + keyObtained + ":" + valueObtained);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
	}

}
