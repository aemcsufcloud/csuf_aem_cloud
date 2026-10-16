package com.csuf.cloud.core.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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
import com.csuf.cloud.core.services.TaskService;

@Component(service = Servlet.class, property = {
		Constants.SERVICE_DESCRIPTION + "=Get AIAgentAttachmentsServlet Servlet",
		"sling.servlet.methods=" + HttpConstants.METHOD_GET,
		"sling.servlet.paths=" + "/bin/getAttachmentsDataforAIAgent" })
public class AIAgentAttachmentsServlet extends SlingSafeMethodsServlet {

	private static final long serialVersionUID = 1L;

	protected final Logger log = LoggerFactory.getLogger(this.getClass());

	@Reference
	private JDBCConnectionHelperService jdbcService;

	@Reference
	private TaskService taskService;

	@Override
	protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
			throws ServletException, IOException {
		String userId = request.getParameter("userId");
		JSONArray resultArray = new JSONArray();
		try {
			resultArray = getAllTasks(userId);
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(resultArray.toString());
		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
	}

	private JSONArray getAllTasks(String userId) {
		String getTasksStmt = "SELECT TASK_TITLE, TASK_DESCRIPTION, ASSIGNEE, WORKFLOW_MODEL, START_DATE, WORKFLOW_INSTANCE_ID, WORKITEM_ID, STATUS, WORKFLOW_STATUS "
				+ "FROM TASK_DETAILS " + "WHERE WORKFLOW_MODEL = 'Student Course Withdrawal' "
				+ "  AND LOWER(TASK_DESCRIPTION) LIKE '%non-medical%' " + "  AND STATUS = 'ACTIVE' "
				+ "  AND WORKFLOW_STATUS = 'RUNNING' " + "  AND ASSIGNEE = '<<assignee>>' "
				+ "  AND TASK_TITLE IN ('Assign Task - Instructor Review', 'Assign Task - Chair Review') "
				+ "ORDER BY START_DATE DESC";
		getTasksStmt = getTasksStmt.replaceAll("<<assignee>>", userId);

		try (Connection connection = jdbcService.getInboxDBConnection();
				PreparedStatement prStmt = connection.prepareStatement(getTasksStmt);
				ResultSet resultSet = prStmt.executeQuery();) {
			JSONArray jsonArray = new JSONArray();
			JSONObject detailsObj;
			String lookupFields = "TASK_TITLE,TASK_DESCRIPTION,ASSIGNEE,WORKFLOW_MODEL,START_DATE,WORKFLOW_INSTANCE_ID,WORKITEM_ID,STATUS,WORKFLOW_STATUS";
			String[] fields = lookupFields.split(",");
			while (resultSet.next()) {
				detailsObj = new JSONObject();
				for (int i = 0; i < fields.length; i++) {
					detailsObj.put(fields[i], resultSet.getString(fields[i]));
				}
				String workItemId = resultSet.getString("WORKITEM_ID");
				if (workItemId != null) {
					String targetUrl = "/bin/getInboxItemDetails?action=TASK_ATTACHMENTS&workItemId=" + workItemId;
					String attachmentData = taskService.getTaskDetailsFromProcessingInstance(targetUrl);
					try {
						JSONArray attachmentJson = new JSONArray(attachmentData);
						detailsObj.put("attachment", attachmentJson);
					} catch (Exception e) {
						detailsObj.put("attachment", attachmentData);
					}
				}
				jsonArray.put(detailsObj);
			}
			return jsonArray;
		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		return null;
	}
}
