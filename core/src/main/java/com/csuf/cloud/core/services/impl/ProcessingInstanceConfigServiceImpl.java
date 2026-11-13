package com.csuf.cloud.core.services.impl;

import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.csuf.cloud.core.config.ProcessingInstanceConfig;
import com.csuf.cloud.core.services.ProcessingInstanceConfigService;

@Component(immediate = true, service = ProcessingInstanceConfigService.class, property = {
		Constants.SERVICE_VENDOR + "=ThoughtFocus",
		Constants.SERVICE_DESCRIPTION + "=Processing Instance Config Service", })
@Designate(ocd = ProcessingInstanceConfig.class)
public class ProcessingInstanceConfigServiceImpl implements ProcessingInstanceConfigService {
	
	
	private final static Logger log = LoggerFactory.getLogger(ProcessingInstanceConfigServiceImpl.class);

	private ProcessingInstanceConfig config;

	@Activate
	protected void activate(ProcessingInstanceConfig config) {
		this.config = config;
	}

	@Override
	public boolean isProcessingInstance() {
		return config.isProcessingInstance();
	}

	@Override
	public String processingUrl() {
		String pURL = config.processingUrl();
		log.error("Skywalk URL: " + pURL);
        System.out.println("Pushpa URL: " + pURL);

        
		return config.processingUrl();
	}

	@Override
	public String userName() {
		return config.userName();
	}

	@Override
	public String userSecurity() {
		return config.userSecurity();
	}

	@Override
	public String dbType() {
		return config.dbType();
	}
}
