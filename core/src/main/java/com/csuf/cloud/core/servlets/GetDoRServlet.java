package com.csuf.cloud.core.servlets;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.aemfd.docmanager.Document;
import com.csuf.cloud.core.services.FormService;
import com.csuf.cloud.core.utils.CSUFUtils;

/**
 * Servlet that generated DoR on the fly.
 */
/**
 * @author 105876
 *
 */
@Component(service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "=Generate DoR on the fly",
		"sling.servlet.methods=" + HttpConstants.METHOD_GET, "sling.servlet.paths=" + "/bin/getDoR" })
public class GetDoRServlet extends SlingAllMethodsServlet {
	private final static Logger log = LoggerFactory.getLogger(GetDoRServlet.class);
	private static final long serialVersionUID = 1L;

	@Reference
	private FormService formService;

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	@Override
	protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		Document dorDocument = null;
		String dataXml = StringUtils.EMPTY;
		String formPath = StringUtils.EMPTY;
		String fileName = StringUtils.EMPTY;
		try (ServletOutputStream out = response.getOutputStream()) {
			final Map<String, RequestParameter[]> params = request.getRequestParameterMap();
			if (params.containsKey("data"))
				dataXml = params.get("data")[0].toString();

			if (params.containsKey("formPath"))
				formPath = params.get("formPath")[0].toString();

			if (params.containsKey("fileName"))
				fileName = params.get("fileName")[0].toString();

			log.debug("Got dataXml as ::::: " + dataXml);
			/*
			 * Random r = new Random(); String fileName =
			 * Long.toString(Math.abs(r.nextLong()), 36);
			 */
			dorDocument = formService.getDoR(dataXml, formPath, fileName);
			response.setContentType("application/pdf");
			response.setHeader("Content-Type", "application/pdf");
			response.setHeader("Content-Disposition", "attachment; filename=".concat(fileName.concat(".pdf")));
			byte[] bytes = CSUFUtils.toByteArrayFromInputStream(dorDocument.getInputStream());
			// Base64.Encoder enc = Base64.getEncoder();
			// byte[] encbytes = enc.encode(bytes);

			// send Base64 encoded bytes to render at client
			out.write(bytes);
			out.flush();
		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		} finally {
			if (dorDocument != null) {
				dorDocument.close();
			}
		}
	}
}