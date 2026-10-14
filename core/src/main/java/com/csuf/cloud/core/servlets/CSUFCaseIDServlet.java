package com.csuf.cloud.core.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Arrays;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.json.JSONArray;
import org.json.JSONObject;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFConstantsUtils;

@Component(service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "=Generic Case ID Servlet",
		"sling.servlet.methods=" + HttpConstants.METHOD_GET, "sling.servlet.paths=" + "/bin/getCaseID" })
public class CSUFCaseIDServlet extends SlingSafeMethodsServlet {
	private final static Logger logger = LoggerFactory.getLogger(CSUFCaseIDServlet.class);
	private static final long serialVersionUID = 1L;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	protected void doGet(SlingHttpServletRequest req, SlingHttpServletResponse response)
			throws ServletException, IOException {
		Connection oConnection = null;
//		String instUserId = "";
//		String termDesc = "";

		JSONObject gradChangeDetails = null;

		oConnection = jdbcConnectionService.getDocDBConnection();
		
		if (oConnection != null) {
			try {
				logger.info("Connection Success=" + oConnection);
				gradChangeDetails = getCaseID(oConnection);
			} catch (Exception e) {
				e.printStackTrace();
			}
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			// Set JSON in String
			if (gradChangeDetails != null && !gradChangeDetails.equals("")) {
				response.getWriter().write(gradChangeDetails.toString());
			} else {
				logger.info("Data not available");
				response.getWriter().write("Requested Data Unavailable");
			}
		} else {
			logger.error("Could Not Connect DB");
		}
	}

	/**
	 * Gets the Unique case ID from Database sequence
	 * 
	 * @param oConnection - Database connection
	 * @return - Case ID as string
	 * @throws Exception
	 */
	public static JSONObject getCaseID(Connection oConnection) throws Exception {

		JSONObject instInfo = new JSONObject();
		JSONArray jArray = new JSONArray();
		ResultSet oRresultSet = null;
		Statement oStatement = null;
		//long caseID = 0;
		try {
			String sql = "Select AR_COURSE_WITHDRAWAL_SEQ.nextval as CASEID from dual";
			oStatement = oConnection.createStatement();
			oRresultSet = oStatement.executeQuery(sql);
			if (oRresultSet.next()) {
				
				instInfo = new JSONObject();
				instInfo.put("CASEID", oRresultSet.getLong("CASEID"));

				//jArray.put(instInfo);
			}
			logger.info("CaseID jArray====" + jArray.put(instInfo));
		} catch (Exception oEx) {
			logger.error(Arrays.toString(oEx.getStackTrace())); 

		}finally {
			try {
				if (oStatement != null) {
					oStatement.close();
				}
					
				//oRresultSet.close();
				if (oConnection != null) {
					oConnection.close();
				}
			} catch (Exception exp) {
				logger.error(Arrays.toString(exp.getStackTrace())); 
			}
		}
		return instInfo;

	}
}
