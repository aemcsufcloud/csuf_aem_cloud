package com.csuf.cloud.core.services.impl;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.csuf.cloud.core.config.SendGridConfiguration;
import com.csuf.cloud.core.services.SendGridEmailService;

@Component(
        service = SendGridEmailService.class,
        immediate = true
)
@Designate(
        ocd = SendGridConfiguration.class
)
public class SendGridEmailServiceImpl
        implements SendGridEmailService {

    private static final Logger log =
            LoggerFactory.getLogger(
                    SendGridEmailServiceImpl.class);

    private static final HttpClient HTTP_CLIENT =
            HttpClient.newBuilder()
                    .connectTimeout(Duration.ofSeconds(30))
                    .build();

    private String apiKey;
    private String fromEmail;

    @Activate
    @Modified
    protected void activate(
            SendGridConfiguration config) {

        this.apiKey = config.apicloud();
        this.fromEmail = config.from_email();
        
        
        log.info("========= SENDGRID DEBUG =========");
        log.info("API KEY RAW = {}", apiKey);
        log.info("API KEY NULL = {}", apiKey == null);
        log.info("API KEY EMPTY = {}", apiKey != null && apiKey.isEmpty());
        log.info("FROM EMAIL = {}", fromEmail);
        log.info("=================================");
    }

    @Override
    public void sendEmail(
            String to,
            String subject,
            String htmlBody) throws Exception {

        if (apiKey == null || apiKey.isEmpty()) {
            throw new RuntimeException(
                    "SendGrid API Key is missing");
        }

        if (fromEmail == null || fromEmail.isEmpty()) {
            throw new RuntimeException(
                    "From Email is missing");
        }

        String requestBody =
                "{"
                + "\"personalizations\":[{"
                + "\"to\":[{"
                + "\"email\":\"" + escapeJson(to) + "\""
                + "}]"
                + "}],"
                + "\"from\":{"
                + "\"email\":\"" + escapeJson(fromEmail) + "\""
                + "},"
                + "\"subject\":\"" + escapeJson(subject) + "\","
                + "\"content\":[{"
                + "\"type\":\"text/html\","
                + "\"value\":\"" + escapeJson(htmlBody) + "\""
                + "}]"
                + "}";

        log.info("Sending email to {}", to);

        HttpRequest request =
                HttpRequest.newBuilder()
                        .uri(URI.create(
                                "https://api.sendgrid.com/v3/mail/send"))
                        .timeout(Duration.ofSeconds(60))
                        .header(
                                "Authorization",
                                "Bearer " + apiKey)
                        .header(
                                "Content-Type",
                                "application/json")
                        .POST(HttpRequest.BodyPublishers
                                .ofString(requestBody))
                        .build();

        HttpResponse<String> response;

        try {

            response = HTTP_CLIENT.send(
                    request,
                    HttpResponse.BodyHandlers.ofString());

        } catch (IOException e) {

            throw new RuntimeException(
                    "IOException while calling SendGrid API",
                    e);

        } catch (InterruptedException e) {

            Thread.currentThread().interrupt();

            throw new RuntimeException(
                    "Interrupted while calling SendGrid API",
                    e);
        }

        int statusCode = response.statusCode();

        log.info("SendGrid Status: {}", statusCode);
        log.info("SendGrid Response: {}", response.body());

        if (statusCode >= 400) {

            throw new RuntimeException(
                    "SendGrid API Failed. "
                    + "Status: " + statusCode
                    + ", Response: " + response.body());
        }

        log.info("Email sent successfully.");
    }

    private String escapeJson(String value) {

        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "");
    }
}