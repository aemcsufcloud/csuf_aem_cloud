package com.csuf.cloud.core.workflow;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.SendGridEmailService;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(
        service = WorkflowProcess.class,
        property = {
                "process.label=SendGrid Email Process"
        }
)
public class SendGridWorkflowProcess implements WorkflowProcess {

    private static final Logger log = 
            LoggerFactory.getLogger(SendGridWorkflowProcess.class);

    @Reference
    private SendGridEmailService emailService;

    @Override
    public void execute(
            WorkItem item,
            WorkflowSession workflowSession,
            MetaDataMap args) throws WorkflowException {

        log.info("=== SendGrid Workflow Process Started ===");
        log.info("Workflow payload: {}", 
                item.getWorkflowData().getPayload());

        try {
            // Can be made dynamic from workflow args or payload
            String recipient = getArgOrDefault(
                    args, "recipient", "ramya05202000@gmail.com");
            String subject = getArgOrDefault(
                    args, "subject", "AEM Cloud SendGrid Test");
            String htmlBody =
                    "<html>"
                            + "<body>"
                            + "<h1>Email Sent Successfully</h1>"
                            + "<p>"
                            + "This email was sent from "
                            + "AEM Cloud using "
                            + "SendGrid REST API."
                            + "</p>"
                            + "<p>Payload: "
                            + item.getWorkflowData().getPayload()
                            + "</p>"
                            + "</body>"
                            + "</html>";

            log.info("Sending email to: {}", recipient);

            emailService.sendEmail(recipient, subject, htmlBody);

            log.info("=== SendGrid Workflow Process Completed ===");

        } catch (Exception e) {
            log.error("SendGrid email failed in workflow: {}", 
                    e.getMessage(), e);
            throw new WorkflowException(
                    "SendGrid email failed: " + e.getMessage(), e);
        }
    }

    // Reads PROCESS_ARGS from workflow step arguments
    private String getArgOrDefault(
            MetaDataMap args,
            String key,
            String defaultValue) {

        String processArgs = args.get(
                "PROCESS_ARGS", String.class);

        if (processArgs != null && !processArgs.isEmpty()) {
            for (String arg : processArgs.split(",")) {
                String[] keyValue = arg.split("=");
                if (keyValue.length == 2 
                        && keyValue[0].trim().equals(key)) {
                    return keyValue[1].trim();
                }
            }
        }
        return defaultValue;
    }
}