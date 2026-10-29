package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONObject;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Career Development Plan Save in DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=CareerDevelopmentPlanDB" })
public class CSUFCareerDevelopmentPlanDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFCareerDevelopmentPlanDB.class);

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {

		String dbServiceUrl = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";
		Connection conn = null;
		String tableName = "AEM_CAREER_DEVELOPMENT_PLAN";
		String formName = "Career Development Plan";
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;

		String empID = "";
		String chrsID = "";
		String firstName = "";
		String lastName = "";
		String dateInitiated = "";
		String departmentName = "";
		String departmentID = "";
		String emplRCD = "";
		String classification = "";
		String cbid = "";
		String shortTermsGoal = "";
		String longTermGoals = "";
		String education = "";
		String training = "";
		String workExperience = "";
		String education1 = "";
		String training1 = "";
		String workExperience1 = "";
		String comment = "";
		String employeeSignature = "";
		String employeeDate = "";
		String discussionCHK = "";
		String discussedDate = "";
		String supervisorSignature = "";
		String supervisorDate = "";
		String careerAdvise = "";
		String analystSignature = "";
		String analystDate = "";
		String workflowInstance = "";
		LinkedHashMap<String, Object> dataMap = null;
		workflowInstance = workItem.getWorkflow().getId();
		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

		if (StringUtils.isNotBlank(payloadPath)) {
			try {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");
				if (null != is) {
					doc = XMLUtils.getDomDocument(is);
					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
							firstName = eElement.getElementsByTagName("firstName").item(0).getTextContent();
							lastName = eElement.getElementsByTagName("lastName").item(0).getTextContent();
							empID = eElement.getElementsByTagName("emplID").item(0).getTextContent();
							chrsID = eElement.getElementsByTagName("chrsID").item(0).getTextContent();
							departmentName = eElement.getElementsByTagName("departmentName").item(0).getTextContent();
							departmentID = eElement.getElementsByTagName("departmentID").item(0).getTextContent();
							emplRCD = eElement.getElementsByTagName("emplRCD").item(0).getTextContent();
							classification = eElement.getElementsByTagName("classification").item(0).getTextContent();
							cbid = eElement.getElementsByTagName("cbid").item(0).getTextContent();
							dateInitiated = eElement.getElementsByTagName("dateInitiated").item(0).getTextContent();
							shortTermsGoal = eElement.getElementsByTagName("shortTermsGoal").item(0).getTextContent();
							longTermGoals = eElement.getElementsByTagName("longTermGoals").item(0).getTextContent();
							education = eElement.getElementsByTagName("education").item(0).getTextContent();
							training = eElement.getElementsByTagName("training").item(0).getTextContent();
							workExperience = eElement.getElementsByTagName("workExperience").item(0).getTextContent();
							education1 = eElement.getElementsByTagName("education1").item(0).getTextContent();
							training1 = eElement.getElementsByTagName("training1").item(0).getTextContent();
							workExperience1 = eElement.getElementsByTagName("workExperience1").item(0).getTextContent();
							comment = eElement.getElementsByTagName("comment").item(0).getTextContent();
							employeeSignature = eElement.getElementsByTagName("employeeSignature").item(0)
									.getTextContent();
							employeeDate = eElement.getElementsByTagName("employeeDate").item(0).getTextContent();
							discussionCHK = eElement.getElementsByTagName("discussionCHK").item(0).getTextContent();
							discussedDate = eElement.getElementsByTagName("discussedDate").item(0).getTextContent();
							supervisorSignature = eElement.getElementsByTagName("supervisorSignature").item(0)
									.getTextContent();
							supervisorDate = eElement.getElementsByTagName("supervisorDate").item(0).getTextContent();
							careerAdvise = eElement.getElementsByTagName("careerAdviseYes").item(0).getTextContent();
							analystSignature = eElement.getElementsByTagName("analystSignature").item(0)
									.getTextContent();
							analystDate = eElement.getElementsByTagName("analystDate").item(0).getTextContent();

						}
					}

					dataMap = new LinkedHashMap<String, Object>();

					dataMap.put("FIRST_NAME", firstName);
					dataMap.put("LAST_NAME", lastName);
					dataMap.put("EMP_ID", empID);
					dataMap.put("CHRS_ID", chrsID);
					dataMap.put("DEPARTMENT_NAME", departmentName);
					dataMap.put("DEPARTMENT_ID", departmentID);
					dataMap.put("EMPL_RCD", emplRCD);
					dataMap.put("CLASSIFICATION1", classification);
					dataMap.put("CBID", cbid);

					Object dateInitiatedObj = null;
					if (dateInitiated != null && dateInitiated != "") {
						Date dateInitiatedNew = Date.valueOf(dateInitiated);
						dateInitiatedObj = dateInitiatedNew;
					}
					dataMap.put("DATE_INITIATED", dateInitiatedObj);

					dataMap.put("SHORT_TERM_GOAL", shortTermsGoal);
					dataMap.put("LONG_TERM_GOAL", longTermGoals);
					dataMap.put("EDUCATION", education);
					dataMap.put("TRAINING", training);
					dataMap.put("WORK_EXPERIENCE", workExperience);
					dataMap.put("EDUCATION1", education1);
					dataMap.put("TRAINING1", training1);
					dataMap.put("WORK_EXPERIENCE1", workExperience1);
					dataMap.put("COMMENTS", comment);
					dataMap.put("EMPLOYEE_SIGNATURE", employeeSignature);

					Object employeeDateObj = null;
					if (employeeDate != null && employeeDate != "") {
						Date employeeDateNew = Date.valueOf(employeeDate);
						employeeDateObj = employeeDateNew;
					}
					dataMap.put("EMPLOYEE_DATE", employeeDateObj);

					dataMap.put("DISCUSSION_CHK", discussionCHK);

					Object discussedDateObj = null;
					if (discussedDate != null && discussedDate != "") {
						Date discussedDateNew = Date.valueOf(discussedDate);
						discussedDateObj = discussedDateNew;
					}
					dataMap.put("DISCUSSED_DATE", discussedDateObj);

					dataMap.put("SUPERVISOR_SIGNATURE", supervisorSignature);

					Object supervisorDateObj = null;
					if (supervisorDate != null && supervisorDate != "") {
						Date asupervisorDateNew = Date.valueOf(supervisorDate);
						supervisorDateObj = asupervisorDateNew;
					}
					dataMap.put("SUPERVISOR_DATE", supervisorDateObj);

					dataMap.put("CAREER_ADVISE", careerAdvise);
					dataMap.put("ANALYST_SIGNATURE", analystSignature);

					Object analystDateObj = null;
					if (analystDate != null && analystDate != "") {
						Date aanalystDateNew = Date.valueOf(analystDate);
						analystDateObj = aanalystDateNew;
					}
					dataMap.put("ANALYST_DATE", analystDateObj);
					dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstance);
				}
				

				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					dbUtil.insertFormData(conn, dataMap, tableName, formName);
				}*/
				
				JSONObject json = new JSONObject();
				json.put("DB_CONNECTION", "AEMDBDEV");
				json.put("TABLE_NAME", tableName);
				json.put("FORM_NAME", formName);
				json.put("UNIQUE_FIELD", empID);
				json.put("UNIQUE_FIELD_COLUMN", "EMP_ID");
				json.put("WORKFLOW_INSTANCE_ID", workflowInstance);
				json.put("DATA_MAP", dataMap);
				json.put("DATE_FIELDS", "EMPLOYEE_DATE,ANALYST_DATE,SUPERVISOR_DATE,DISCUSSED_DATE,DATE_INITIATED");

				log.error("Testing: =" + json.toString());

				//String dbServiceUrl = url;

				CloseableHttpClient client = HttpClients.createDefault();
				HttpPost post = new HttpPost(dbServiceUrl);
				post.addHeader("Content-Type", "application/json");
				post.setEntity(new StringEntity(json.toString()));

				CloseableHttpResponse response = client.execute(post);
				log.info("DB Service Response: =" + response.getStatusLine());
				client.close();

			} catch (Exception e) {
				log.error(Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.error("IOException from Finally Block from CSUFCareerDevelopmentPlanDB="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException from Finally Block from CSUFCareerDevelopmentPlanDB="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}
			

		}
	}

}
