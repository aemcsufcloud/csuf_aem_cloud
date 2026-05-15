package com.csuf.cloud.core.services.impl;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

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

    private String apiKey;
    private String fromEmail;

    @Activate
    @Modified
    protected void activate(
            SendGridConfiguration config) {

        this.apiKey = config.api_key();
        this.fromEmail = config.from_email();
    }

    @Override
    public void sendEmail(
            String to,
            String subject,
            String htmlBody)
            throws Exception {

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

        HttpClient client =
                HttpClient.newHttpClient();

        HttpRequest request =
                HttpRequest.newBuilder()
                        .uri(URI.create(
                                "https://api.sendgrid.com/v3/mail/send"))
                        .header(
                                "Authorization",
                                "Bearer " + apiKey)
                        .header(
                                "Content-Type",
                                "application/json")
                        .POST(
                                HttpRequest.BodyPublishers
                                        .ofString(requestBody))
                        .build();

        HttpResponse<String> response =
                client.send(
                        request,
                        HttpResponse.BodyHandlers.ofString());

        int statusCode = response.statusCode();

        if (statusCode >= 400) {

            throw new RuntimeException(
                    "SendGrid API failed: "
                            + statusCode
                            + " "
                            + response.body());
        }
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