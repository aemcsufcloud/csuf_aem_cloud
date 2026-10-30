package com.csuf.cloud.core.utils;

import java.io.IOException;
import java.util.LinkedHashMap;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class CloudDbSaveUtil {

	private static final Logger log = LoggerFactory.getLogger(CloudDbSaveUtil.class);

	public static final String DB_SERVICE_URL = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";
	public static final String WF_HISTORY_SERVICE_URL = "https://myformstst.fullerton.edu/bin/WFHistorySave";
	public static final String DB_CONNECTION = "AEMDBDEV";
	public static final String WF_HISTORY_TABLE = "AEM_WORKFLOW_HISTORY";

	private CloudDbSaveUtil() {
	}

	public static void saveFormData(String tableName, String formName, String uniqueField, String uniqueFieldColumn,
			String workflowInstanceId, LinkedHashMap<String, Object> dataMap, String dateFields) throws IOException {
		JSONObject json = new JSONObject();
		json.put("DB_CONNECTION", DB_CONNECTION);
		json.put("TABLE_NAME", tableName);
		json.put("FORM_NAME", formName);
		json.put("UNIQUE_FIELD", uniqueField != null ? uniqueField : "");
		json.put("UNIQUE_FIELD_COLUMN", uniqueFieldColumn != null ? uniqueFieldColumn : "");
		json.put("WORKFLOW_INSTANCE_ID", workflowInstanceId != null ? workflowInstanceId : "");
		json.put("DATA_MAP", dataMap);
		json.put("DATE_FIELDS", dateFields != null ? dateFields : "");

		log.error("Testing: =" + json.toString());

		try (CloseableHttpClient client = HttpClients.createDefault()) {
			HttpPost post = new HttpPost(DB_SERVICE_URL);
			post.addHeader("Content-Type", "application/json");
			post.setEntity(new StringEntity(json.toString()));

			try (CloseableHttpResponse response = client.execute(post)) {
				log.info("DB Service Response: =" + response.getStatusLine());
			}
		}
	}

	/**
	 * Persists workflow step history via cloud servlet (same contract as
	 * CSUFSTD682OvertimeDistributedWFHistoryDB). {@code processStepVal} is typically
	 * {@code Before Assign Task} or {@code After Assign Task} from PROCESS_ARGS.
	 */
	public static void saveWorkflowHistory(String processStepVal, LinkedHashMap<String, Object> dataMap)
			throws IOException {
		JSONObject json = new JSONObject();
		json.put("DB_CONNECTION", DB_CONNECTION);
		json.put("TABLE_NAME", WF_HISTORY_TABLE);
		json.put("PROCESS_STEP_VAL", processStepVal != null ? processStepVal : "");
		json.put("DATA_MAP", dataMap);

		log.info("WF History payload size=" + (dataMap != null ? dataMap.size() : 0));

		try (CloseableHttpClient client = HttpClients.createDefault()) {
			HttpPost post = new HttpPost(WF_HISTORY_SERVICE_URL);
			post.addHeader("Content-Type", "application/json");
			post.setEntity(new StringEntity(json.toString()));

			try (CloseableHttpResponse response = client.execute(post)) {
				log.info("WF History Service Response: =" + response.getStatusLine());
			}
		}
	}
}
