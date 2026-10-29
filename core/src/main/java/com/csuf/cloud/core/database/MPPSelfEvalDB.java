package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=MPP Self Eval Save in DB", "service.vendor=ThoughtFocus",
		"process.label=MppSelfEvalDB" })

public class MPPSelfEvalDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	private static final Logger log = LoggerFactory.getLogger(MPPSelfEvalDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_MPP_SELF_EVAL";
		String formName = "MPP Self Evaluation";
		String empId = "";
		String chrsId = "";
		String empRCD = "";
		String cbid = "";
		String firstName = "";
		String lastName = "";
		String classification = "";
		String empRange = "";
		String departmentID = "";
		String departmentName = "";
		String empSupervisor = "";
		String ratingPeriodFrom = "";
		String ratingPeriodTo = "";
		String evaluation1 = "";
		String evaluation2 = "";
		String evaluation3 = "";
		String evaluation4 = "";
		String evalSign = "";
		String evalDate = "";
		String workflowInstanceId = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		workflowInstanceId = workItem.getWorkflow().getId();
		if (StringUtils.isNotBlank(payloadPath)) {
			InputStream is = null;
			try {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");

				if (null != is) {
					Document doc = XMLUtils.getDomDocument(is);

					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
							empId = eElement.getElementsByTagName("EmpID").item(0).getTextContent();
							chrsId = eElement.getElementsByTagName("chrsId").item(0).getTextContent();
							lastName = eElement.getElementsByTagName("EmpLastName").item(0).getTextContent();
							firstName = eElement.getElementsByTagName("EmpFirstNAme").item(0).getTextContent();
							empRCD = eElement.getElementsByTagName("EmpRCD").item(0).getTextContent();
							cbid = eElement.getElementsByTagName("CBID").item(0).getTextContent();
							classification = eElement.getElementsByTagName("Classification").item(0).getTextContent();
							empRange = eElement.getElementsByTagName("Range").item(0).getTextContent();
							departmentID = eElement.getElementsByTagName("DeptID").item(0).getTextContent();
							departmentName = eElement.getElementsByTagName("DeptName").item(0).getTextContent();

							empSupervisor = eElement.getElementsByTagName("EmployeeSupervisor").item(0)
									.getTextContent();

							ratingPeriodFrom = eElement.getElementsByTagName("ReviewPeriodFrom").item(0)
									.getTextContent();
							ratingPeriodTo = eElement.getElementsByTagName("ReviewPeriodTo").item(0).getTextContent();

							evaluation1 = eElement.getElementsByTagName("Evaluation1").item(0).getTextContent();

							evaluation2 = eElement.getElementsByTagName("Evaluation2").item(0).getTextContent();
							evaluation3 = eElement.getElementsByTagName("Evaluation3").item(0).getTextContent();
							evaluation4 = eElement.getElementsByTagName("Evalaution4").item(0).getTextContent();
							evalSign = eElement.getElementsByTagName("EvaluatorSign").item(0).getTextContent();
							evalDate = eElement.getElementsByTagName("EvaluatorDate").item(0).getTextContent();
						}
					}

					dataMap = new LinkedHashMap<String, Object>();
					dataMap.put("EMPID", empId);
					dataMap.put("CHRS_ID", chrsId);
					dataMap.put("LASTNAME", lastName);
					dataMap.put("FIRSTNAME", firstName);
					dataMap.put("EMPRCD", empRCD);
					dataMap.put("CBID", cbid);
					dataMap.put("CLASSIFICATION", classification);
					dataMap.put("EMPRANGE", empRange);
					dataMap.put("DEPTID", departmentID);
					dataMap.put("DEPTNAME", departmentName);
					dataMap.put("EMPLOYEE_SUPERVISOR", empSupervisor);
					dataMap.put("REVIEW_PERIOD_FROM", Date.valueOf(ratingPeriodFrom));
					dataMap.put("REVIEW_PERIOD_TO", Date.valueOf(ratingPeriodTo));

					dataMap.put("EVALUATION1", evaluation1);
					dataMap.put("EVALUATION2", evaluation2);
					dataMap.put("EVALUATION3", evaluation3);
					dataMap.put("EVALUATION4", evaluation4);

					dataMap.put("EVALUATOR_SIGN", evalSign);
					dataMap.put("EVALUATOR_DATE", Date.valueOf(evalDate));
					dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceId);

				}

				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					dbUtil.insertFormData(conn, dataMap, tableName, formName);
				}

			} catch (Exception e) {
				log.error("Exception in MPPSelfEvalDB=" + Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.error("IOException in MPPSelfEvalDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}

				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in MPPSelfEvalDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}
	}
}
