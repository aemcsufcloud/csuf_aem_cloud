package com.csuf.cloud.core.servlets;

import java.io.IOException;
import java.time.LocalDate;

import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.json.JSONObject;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/*@Component(service = { Servlet.class }, property = { "sling.servlet.resourceTypes=sling/servlet/default",
        "sling.servlet.methods=GET", "sling.servlet.selectors=/bin/getLoggedUserId", "sling.servlet.extensions=json" })*/

@Component(service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "=Loggedin User Servlet",
        "sling.servlet.methods=" + HttpConstants.METHOD_GET, "sling.servlet.paths=" + "/bin/getLoggedUserId" })
public class UserManager extends SlingSafeMethodsServlet {
    transient private final Logger logger = LoggerFactory.getLogger(getClass());
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(final SlingHttpServletRequest req, final SlingHttpServletResponse response)
            throws ServletException, IOException {
    	JSONObject userValues = null;
        logger.error("Happy entered");
       
        try {
            userValues = getCurrentUserId(req);
            logger.info("Happy entered userValues="+userValues);
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        logger.info("UserID Value=" + userValues.toString());
        response.getWriter().write(userValues.toString());
    }

    public JSONObject getCurrentUserId(SlingHttpServletRequest request) throws Exception {
    	logger.error("Happy entered getCurrentUserId=");
        JSONObject userDetails = new JSONObject();
        ResourceResolver resolver = request.getResourceResolver();
        logger.error("Happy resolver="+resolver);
        
        Session session = resolver.adaptTo(Session.class);
        logger.error("Happy session="+session);
        
        LocalDate serverDate = LocalDate.now();
        logger.error("Happy serverDate="+serverDate);
        
        //Session session = globalService.getAdminSession();
        String userId = session.getUserID();
        logger.error("userDetails=" + userId);
        
        if (userId != null && userId.endsWith("@fullerton.edu")) {
            userId.substring(0, userId.indexOf("@"));
        }
        userDetails.put("userId", userId);
        userDetails.put("Status", "Success");
        userDetails.put("SERVER_DATE", serverDate);
        userDetails.put("email", session.getUserID());
        
        logger.error("userDetails=" + userDetails.length());
        
        if(session != null){
            session.logout();
        }
        return userDetails;

    }

}
