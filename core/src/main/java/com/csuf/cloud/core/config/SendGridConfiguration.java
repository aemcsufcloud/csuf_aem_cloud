package com.csuf.cloud.core.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(
        name = "CSUF SendGrid Configuration"
)
public @interface SendGridConfiguration {

    @AttributeDefinition(
            name = "SendGrid API Key"
    )
    String api_key();

    @AttributeDefinition(
            name = "From Email Address"
    )
    String from_email();
}