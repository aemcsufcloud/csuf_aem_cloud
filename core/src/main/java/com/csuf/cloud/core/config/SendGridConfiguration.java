package com.csuf.cloud.core.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(
        name = "SendGrid Configuration"
)
public @interface SendGridConfiguration {

    @AttributeDefinition(
            name = "SendGrid API Key", type = AttributeType.PASSWORD)
    String api_key();

    @AttributeDefinition(
            name = "From Email")
    String from_email();
}