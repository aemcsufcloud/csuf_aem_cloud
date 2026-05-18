package com.csuf.cloud.core.services;

public interface SendGridEmailService {

    void sendEmail(
            String to,
            String subject,
            String htmlBody) throws Exception;
}