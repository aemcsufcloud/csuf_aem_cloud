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
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Pre Perf Eval Save in DB", "service.vendor=ThoughtFocus",
		"process.label=PrePerfEvalSave" })

public class PrePerfEvalDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	private static final Logger log = LoggerFactory.getLogger(PrePerfEvalDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_PRE_PERF_EVAL";
		String formName = "Pre Performance Evaluation";
		String empId = "";
		String chrsId = "";
		String empRCD = "";
		String reviewPeriodFrom = "";
		String reviewPeriodTo = "";
		String todayDate = "";
		String supervisor = "";
		String firstName = "";
		String lastName = "";
		String deptName = "";
		String deptId = "";
		String evaluationCom1 = "";
		String evaluationCom2 = "";
		String evaluationCom3 = "";
		String evaluationCom4 = "";
		String evaluationCom5 = "";
		String evaluationCom6 = "";
		String evaluationCom7 = "";
		String empCB = "";
		String empSign = "";
		String empDate = "";
		String workflowInstanceID = "";
		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		workflowInstanceID = workItem.getWorkflow().getId();
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
							empRCD = eElement.getElementsByTagName("EmpRCD").item(0).getTextContent();
							reviewPeriodFrom = eElement.getElementsByTagName("ReviewPeriodFrom").item(0)
									.getTextContent();
							reviewPeriodTo = eElement.getElementsByTagName("ReviewPeriodTo").item(0).getTextContent();
							todayDate = eElement.getElementsByTagName("TodayDate").item(0).getTextContent();
							supervisor = eElement.getElementsByTagName("Supervisor").item(0).getTextContent();
							firstName = eElement.getElementsByTagName("FirstName").item(0).getTextContent();

							lastName = eElement.getElementsByTagName("LastName").item(0).getTextContent();

							deptName = eElement.getElementsByTagName("DeptName").item(0).getTextContent();
							deptId = eElement.getElementsByTagName("DeptID").item(0).getTextContent();
							evaluationCom1 = eElement.getElementsByTagName("Evaluation1").item(0).getTextContent();
							evaluationCom2 = eElement.getElementsByTagName("Evaluation2").item(0).getTextContent();
							evaluationCom3 = eElement.getElementsByTagName("Evaluation3").item(0).getTextContent();
							evaluationCom4 = eElement.getElementsByTagName("Evaluation4").item(0).getTextContent();
							evaluationCom5 = eElement.getElementsByTagName("Evaluation5").item(0).getTextContent();
							evaluationCom6 = eElement.getElementsByTagName("Evaluation6").item(0).getTextContent();
							evaluationCom7 = eElement.getElementsByTagName("Evaluation7").item(0).getTextContent();
							empCB = eElement.getElementsByTagName("EmpCB").item(0).getTextContent();
							empSign = eElement.getElementsByTagName("EmpSign").item(0).getTextContent();
							empDate = eElement.getElementsByTagName("EmpDate").item(0).getTextContent();
							
}
					}

					dataMap = new LinkedHashMap<String, Object>();
					dataMap.put("EMPLID", empId);
					dataMap.put("CHRS_ID", chrsId);
					Object todayDtObj = null;
					if (todayDate != null && todayDate != "") {
						Date todayDateNew = Date.valueOf(todayDate);
						todayDtObj = todayDateNew;
					}
					dataMap.put("TODAY_DT", todayDtObj);

					dataMap.put("FIRSTNAME", firstName);
					dataMap.put("LASTNAME", lastName);
					dataMap.put("EMPRCD", empRCD);
					Object reviewPeriodFromObj = null;
					if (reviewPeriodFrom != null && reviewPeriodFrom != "") {
						Date reviewPeriodFromNew = Date.valueOf(reviewPeriodFrom);
						reviewPeriodFromObj = reviewPeriodFromNew;
					}

					dataMap.put("REVIEW_FROM_DT", reviewPeriodFromObj);
					Object reviewPeriodToObj = null;
					if (reviewPeriodTo != null && reviewPeriodTo != "") {
						Date reviewPeriodToNew = Date.valueOf(reviewPeriodTo);
						reviewPeriodToObj = reviewPeriodToNew;
					}
					dataMap.put("REVIEW_TO_DT", reviewPeriodToObj);

					dataMap.put("SUPERVISORNAME", supervisor);
					dataMap.put("DEPARTMENT", deptName);

					dataMap.put("DEPTID", Integer.parseInt(deptId));

					dataMap.put("EVAL_COMMENT1", evaluationCom1);
					dataMap.put("EVAL_COMMENT2", evaluationCom2);
					dataMap.put("EVAL_COMMENT3", evaluationCom3);
					dataMap.put("EVAL_COMMENT4", evaluationCom4);
					dataMap.put("EVAL_COMMENT5", evaluationCom5);
					dataMap.put("EVAL_COMMENT6", evaluationCom6);
					dataMap.put("EVAL_COMMENT7", evaluationCom7);
					dataMap.put("EMPCB", empCB);
					Object empSignDateObj = null;
					if (empDate != null && empDate != "") {
						Date empDateNew = Date.valueOf(empDate);
						empSignDateObj = empDateNew;
					}

					dataMap.put("EMP_SIGN_DATE", empSignDateObj);
					dataMap.put("EMP_SIGN", empSign);
					dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

				}

				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					dbUtil.insertFormData(conn, dataMap, tableName, formName);
				}*/

				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, empId, "EMPLID", workflowInstanceID, dataMap,
							"TODAY_DT,REVIEW_FROM_DT,REVIEW_TO_DT,EMP_SIGN_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}

			} catch (Exception e) {
				log.error("Exception in PrePerfEvalDB=" + Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.error("IOException in PrePerfEvalDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				/*if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in PrePerfEvalDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}*/
			}
			

		}
	}	
}
