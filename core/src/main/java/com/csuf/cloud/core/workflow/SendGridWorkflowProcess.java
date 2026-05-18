package com.csuf.cloud.core.workflow;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;

import com.adobe.granite.workflow.metadata.MetaDataMap;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.csuf.cloud.core.services.SendGridEmailService;

@Component(
        service = WorkflowProcess.class,
        property = {
                "process.label=SendGrid Email Workflow Process"
        }
)
public class SendGridWorkflowProcess
        implements WorkflowProcess {

    @Reference
    private SendGridEmailService sendGridEmailService;

    @Override
    public void execute(
            WorkItem workItem,
            com.adobe.granite.workflow.WorkflowSession workflowSession,
            MetaDataMap args)
            throws WorkflowException {

        try {

            sendGridEmailService.sendEmail(
                    "ecmconsultant1@sparient.com",
                    "AEM Cloud Test",
                    "<h1>Email from AEM Cloud</h1>");

        } catch (Exception e) {

            throw new WorkflowException(
                    "Failed to send email",
                    e);
        }
    }
}