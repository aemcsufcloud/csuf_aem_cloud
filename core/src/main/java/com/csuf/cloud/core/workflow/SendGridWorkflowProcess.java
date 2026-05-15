package com.csuf.cloud.core.workflow;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.SendGridEmailService;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

@Component(
        service = WorkflowProcess.class,
        property = {
                "process.label=SendGrid Email Process"
        }
)
public class SendGridWorkflowProcess
        implements WorkflowProcess {

    @Reference
    private SendGridEmailService emailService;

    @Override
    public void execute(
            WorkItem item,
            WorkflowSession workflowSession,
            MetaDataMap args)
            throws WorkflowException {

        try {

            String recipient =
                    "ramya05202000@gmail.com";

            String subject =
                    "AEM Cloud SendGrid Test";

            String htmlBody =
                    "<html>"
                            + "<body>"
                            + "<h1>Email Sent Successfully</h1>"
                            + "<p>"
                            + "This email was sent from "
                            + "AEM Cloud using "
                            + "SendGrid REST API."
                            + "</p>"
                            + "</body>"
                            + "</html>";

            emailService.sendEmail(
                    recipient,
                    subject,
                    htmlBody);

        } catch (Exception e) {

            throw new WorkflowException(
                    "SendGrid email failed",
                    e);
        }
    }
}