package com.csuf.cloud.core.database;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.Route;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.google.gson.JsonArray;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.services.TaskService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.CloudDbSaveUtil;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Position Action Form DB Save", "service.vendor=ThoughtFocus",
"process.label=PositionActionFormDB" })
public class PositionActionFormDB implements WorkflowProcess{
	
	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(PositionActionFormDB.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args) 
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_POSITION_ACTION_FORM";
		String childTableName = "AEM_POSITION_ACTION_FORM_CHILD";
		String formName = "Position Action Form";		
		String assignee = "";
		String caseId = "";
		LinkedHashMap<String, Object> dataMap = null;
		MetaDataMap metaDataMapVal = workItem.getWorkflow().getWorkflowData().getMetaDataMap();

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
		log.debug("Workflowinstanceid:"+workflowInstanceID);
		if (StringUtils.isNotBlank(payloadPath)) {
			InputStream is = null;
			try {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");

				if (null != is) {
					Document doc = XMLUtils.getDomDocument(is);
					String dataXML = XMLUtils.prettyPrintAsString(doc);

					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);
						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							try {
							org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;	
							dataMap = new LinkedHashMap<String, Object>();
							log.debug("index="+temp);
							
							
							caseId = eElement.getElementsByTagName("caseId").item(0).getTextContent();
							dataMap.put("FORM_ID", caseId);
							String initiatedDate = eElement.getElementsByTagName("InitiatedDate").item(0).getTextContent();
							Object initiatedDateObj = "";
							if (initiatedDate != null && initiatedDate != "") {
								Date initiatedDateNew = Date.valueOf(initiatedDate);
								initiatedDateObj = initiatedDateNew;
							}
							dataMap.put("INITIATED_DATE", initiatedDateObj);
							dataMap.put("EXT",eElement.getElementsByTagName("Ext").item(0).getTextContent());
							dataMap.put("DIVISION", eElement.getElementsByTagName("Division").item(0).getTextContent());
							dataMap.put("COLLEGE_DEPARTMENT", eElement.getElementsByTagName("CollegeAndDepartment").item(0).getTextContent());
							dataMap.put("REQUEST_TYPE", eElement.getElementsByTagName("RequestType").item(0).getTextContent());
							String effectiveDate = eElement.getElementsByTagName("EffectiveDate").item(0).getTextContent();
							Object effectiveDateObj = "";
							if (effectiveDate != null && effectiveDate != "") {
								Date effectiveDateNew = Date.valueOf(effectiveDate);
								effectiveDateObj = effectiveDateNew;
							}
							dataMap.put("EFFECTIVE_DATE", effectiveDateObj);
							dataMap.put("JUSTIFICATION", eElement.getElementsByTagName("Justification").item(0).getTextContent());
							dataMap.put("T_POSITION_NUMBER_CURRENT",eElement.getElementsByTagName("TOnePositionNumberCurrent").item(0).getTextContent());
							dataMap.put("T_POSITION_NUMBER_NEW",eElement.getElementsByTagName("TOnePositionNumberNew").item(0).getTextContent());
							dataMap.put("T_DEPT_ID_CURRENT", eElement.getElementsByTagName("TOneDeptIdCurrent").item(0).getTextContent());
							dataMap.put("T_DEPT_ID_NEW", eElement.getElementsByTagName("TOneDeptIdNew").item(0).getTextContent());
							dataMap.put("T_REPORTING_UNIT_CURRENT", eElement.getElementsByTagName("TOneReportingUnitCurrent").item(0).getTextContent());
							dataMap.put("T_REPORTING_UNIT_NEW",eElement.getElementsByTagName("TOneReportingUnitNew").item(0).getTextContent());
							dataMap.put("T_JOB_CODE_CURRENT",eElement.getElementsByTagName("TOneJobCodeCurrent").item(0).getTextContent());
							dataMap.put("T_JOB_CODE_NEW",eElement.getElementsByTagName("TOneJobCodeNew").item(0).getTextContent());
							dataMap.put("T_POSITION_TITLE_CURRENT", eElement.getElementsByTagName("TOnePositionTitleCurrent").item(0).getTextContent());
							dataMap.put("T_POSITION_TITLE_NEW", eElement.getElementsByTagName("TOnePositionTitleNew").item(0).getTextContent());
							dataMap.put("T_REG_TEMP_CURRENT", eElement.getElementsByTagName("TOneRegTempCurrent").item(0).getTextContent());
							dataMap.put("T_REG_TEMP_NEW", eElement.getElementsByTagName("TOneRegTempNew").item(0).getTextContent());
							dataMap.put("T_FULL_PART_TIME_CURRENT", eElement.getElementsByTagName("TOneFullPartTimeCurrent").item(0).getTextContent());
							dataMap.put("T_FULL_PART_TIME_NEW", eElement.getElementsByTagName("TOneFullPartTimeNew").item(0).getTextContent());
							dataMap.put("T_GRADE_RANGE_CURRENT",eElement.getElementsByTagName("TOneGradeRangeCurrent").item(0).getTextContent());
							dataMap.put("T_GRADE_RANGE_NEW",eElement.getElementsByTagName("TOneGradeRangeNew").item(0).getTextContent());
							dataMap.put("T_FTE_CURRENT", eElement.getElementsByTagName("TOneFTECurrent").item(0).getTextContent());
							dataMap.put("T_FTE_NEW", eElement.getElementsByTagName("TOneFTENew").item(0).getTextContent());
							dataMap.put("T_EXEMPT_STATUS_CURRENT", eElement.getElementsByTagName("TOneExemptStatusCurrent").item(0).getTextContent());
							dataMap.put("T_EXEMPT_STATUS_NEW",eElement.getElementsByTagName("TOneExemptStatusNew").item(0).getTextContent());
							dataMap.put("T_SUPERVISOR_NAME_CURRENT",eElement.getElementsByTagName("TOneSupervisorNameCurrent").item(0).getTextContent());
							dataMap.put("T_SUPERVISOR_NAME_NEW",eElement.getElementsByTagName("TOneSupervisorNameNew").item(0).getTextContent());
							dataMap.put("T_SUPERVISOR_POS_NO_CURRENT", eElement.getElementsByTagName("TOneSupervisorPositionCurrent").item(0).getTextContent());
							dataMap.put("T_SUPERVISOR_POS_NO_NEW", eElement.getElementsByTagName("TOneSupervisorPositionNew").item(0).getTextContent());
							dataMap.put("T_MPP_NAME_CURRENT", eElement.getElementsByTagName("TOneMPPNameCurrent").item(0).getTextContent());
							dataMap.put("T_MPP_NAME_NEW", eElement.getElementsByTagName("TOneMPPNameNew").item(0).getTextContent());
							dataMap.put("T_MPP_POSITION_NUMBER_CURRENT", eElement.getElementsByTagName("TOneMPPPositionCurrent").item(0).getTextContent());
							dataMap.put("T_MPP_POSITION_NUMBER_NEW", eElement.getElementsByTagName("TOneMPPPositionNew").item(0).getTextContent());
							dataMap.put("FUNDING_UPDATE_REQUIRED", eElement.getElementsByTagName("FundingUpdateStatus").item(0).getTextContent());
							dataMap.put("APPROP_REQUESTOR_NAME",eElement.getElementsByTagName("AppropriateRequestorName").item(0).getTextContent());
							dataMap.put("APPROP_REQUESTOR_FNAME",eElement.getElementsByTagName("AppropriateRequestorFirstName").item(0).getTextContent());
							dataMap.put("APPROP_REQUESTOR_LNAME",eElement.getElementsByTagName("AppropriateRequestorLastName").item(0).getTextContent());
							dataMap.put("APPROP_REQUESTOR_USER_ID", eElement.getElementsByTagName("AppropriateRequestorUserId").item(0).getTextContent());
							dataMap.put("APPROP_REQUESTOR_EMAIL_ID", eElement.getElementsByTagName("AppropriateRequestorEmailId").item(0).getTextContent());
							dataMap.put("APPROP_REQUESTOR_SIGN", eElement.getElementsByTagName("AppropriateRequestorSignature").item(0).getTextContent());
							String requestorSignDate = eElement.getElementsByTagName("AppropriateRequestorSignatureDate").item(0).getTextContent();
							Object requestorSignDateObj = "";
							if (requestorSignDate != null && requestorSignDate != "") {
								Date requestorSignDateNew = Date.valueOf(requestorSignDate);
								requestorSignDateObj = requestorSignDateNew;
							}
							dataMap.put("APPROP_REQUESTOR_SIGN_DATE", requestorSignDateObj );
							dataMap.put("APPROP_REQUESTOR_COMMENT", eElement.getElementsByTagName("AppropriateRequestorComments").item(0).getTextContent());
							dataMap.put("APPROP_APPROVER_NAME", eElement.getElementsByTagName("AppropriateApproverName").item(0).getTextContent());
							dataMap.put("APPROP_APPROVER_USER_ID",eElement.getElementsByTagName("AppropriateApproverUserId").item(0).getTextContent());
							dataMap.put("APPROP_APPROVER_EMAIL_ID",eElement.getElementsByTagName("AppropriateApproverEmailId").item(0).getTextContent());
							dataMap.put("APPROP_APPROVER_SIGN_NAME", eElement.getElementsByTagName("AppropriateApproverPrintName").item(0).getTextContent());
							dataMap.put("APPROP_APPROVER_SIGN", eElement.getElementsByTagName("AppropriateApproverSignature").item(0).getTextContent());
							String appropriateApproverSignDate = eElement.getElementsByTagName("AppropriateApproverSignatureDate").item(0).getTextContent();
							Object appropriateApproverSignDateObj = "";
							if (appropriateApproverSignDate != null && appropriateApproverSignDate != "") {
								Date appropriateApproverSignDateNew = Date.valueOf(appropriateApproverSignDate);
								appropriateApproverSignDateObj = appropriateApproverSignDateNew;
							}
							dataMap.put("APPROP_APPROVER_SIGN_DATE", appropriateApproverSignDateObj );
							dataMap.put("APPROP_APPROVER_COMMENT", eElement.getElementsByTagName("AppropriateApproverComment").item(0).getTextContent());
							dataMap.put("ACADEMIC_AFFAIRS_SIGN_NAME", eElement.getElementsByTagName("AcademicAffairsPrintName").item(0).getTextContent());
							dataMap.put("ACADEMIC_AFFAIRS_SIGN", eElement.getElementsByTagName("AcademicAffairsSignature").item(0).getTextContent());
							String academicAffairsSignDate = eElement.getElementsByTagName("AcademicAffairsSignatureDate").item(0).getTextContent();
							Object academicAffairsSignDateObj = "";
							if (academicAffairsSignDate != null && academicAffairsSignDate != "") {
								Date academicAffairsSignDateNew = Date.valueOf(academicAffairsSignDate);
								academicAffairsSignDateObj = academicAffairsSignDateNew;
							}
							dataMap.put("ACADEMIC_AFFAIRS_SIGN_DATE", academicAffairsSignDateObj );
							dataMap.put("ACADEMIC_AFFAIRS_COMMENT", eElement.getElementsByTagName("AcademicAffairsComment").item(0).getTextContent());
							dataMap.put("POSITION_MGMT_SIGN_NAME", eElement.getElementsByTagName("PositionManagementPrintName").item(0).getTextContent());
							dataMap.put("POSITION_MGMT_SIGN", eElement.getElementsByTagName("PositionManagementSignature").item(0).getTextContent());
							String positionManagementSignDate = eElement.getElementsByTagName("PositionManagementSignatureDate").item(0).getTextContent();
							Object positionManagementSignDateObj = "";
							if (positionManagementSignDate != null && positionManagementSignDate != "") {
								Date positionManagementSignDateNew = Date.valueOf(positionManagementSignDate);
								positionManagementSignDateObj = positionManagementSignDateNew;
							}
							dataMap.put("POSITION_MGMT_SIGN_DATE", positionManagementSignDateObj );
							dataMap.put("POSITION_MGMT_COMMENT", eElement.getElementsByTagName("PositionManagementComment").item(0).getTextContent());
							dataMap.put("DATA_XML", dataXML);
							dataMap.put("STAGE_INDICATOR", eElement.getElementsByTagName("StageIndicator").item(0).getTextContent());
							saveChildTableData(conn, eElement, formName, childTableName, caseId, workflowInstanceID);
							List<Route> backRoutesList = workflowSession.getBackRoutes(workItem, false);
							JsonArray backRoutesJson = new JsonArray();
							for (Route backRoute : backRoutesList) {
								backRoutesJson.add(backRoute.getName());
							}
							String saveHistoryBackRoute = "";
							if (backRoutesJson.size() == 1) {
								saveHistoryBackRoute = backRoutesList.get(0).getName();
								log.debug("Executing if block ");
							} else {
								saveHistoryBackRoute = backRoutesList.get(1).getName();
								String wId = workItem.getId().replace("VolatileWorkItem_", "/workItems/");
								String firstStr = wId.substring(0, wId.indexOf('_'));
								String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
								String t1 = firstStr.replaceAll("[^0-9]+", "");
								int a1 = Integer.parseInt(t1);
								a1 = a1 - 2;
								firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
								String workItemId = workflowInstanceID.concat(firstStr).concat("_").concat(secString);
								assignee = taskService.getTaskAssignee(workItemId);
								log.debug("Executing else block assignee : {}",assignee);
							}
							dataMap.put("LAST_STEP", saveHistoryBackRoute);
							if(metaDataMapVal.get("PositionManagementTaskActionTaken") != null) {
								if(metaDataMapVal.get("PositionManagementTaskActionTaken").toString().equalsIgnoreCase("Approve")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNING");
								}
							} else if(metaDataMapVal.containsKey("actionTakenByPositionManagementReviewersPO")) {
								if(metaDataMapVal.get("actionTakenByPositionManagementReviewersPO").toString().equalsIgnoreCase("Approve")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNING");
								}
							} else if(metaDataMapVal.containsKey("actionTakenByPositionManagementReviewersMPPPO")) {
								if(metaDataMapVal.get("actionTakenByPositionManagementReviewersMPPPO").toString().equalsIgnoreCase("Approve")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNING");
								}
							} else if(metaDataMapVal.containsKey("actionTakenByPositionManagementDirect")) {
								if(metaDataMapVal.get("actionTakenByPositionManagementDirect").toString().equalsIgnoreCase("Approve")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNING");
								}
							} else if(metaDataMapVal.containsKey("actionTakenByPositionManagementMPPDirect")) {
								if(metaDataMapVal.get("actionTakenByPositionManagementMPPDirect").toString().equalsIgnoreCase("Approve")) {
									dataMap.put("WORKFLOW_STATUS", "COMPLETED");
								} else {
									dataMap.put("WORKFLOW_STATUS", "RUNNING");
								}
							} else {
								dataMap.put("WORKFLOW_STATUS", "RUNNING");
							}
							dataMap.put("LAST_STEP_ASSIGNEE", assignee);
							dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
							
							}  catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}				

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, caseId, "FORM_ID", workflowInstanceID, tableName);
					log.debug("ResultData : {}",resultData);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, caseId, "FORM_ID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {						
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/

				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, caseId, "FORM_ID", workflowInstanceID, dataMap,
							"INITIATED_DATE,EFFECTIVE_DATE,APPROP_REQUESTOR_SIGN_DATE,APPROP_APPROVER_SIGN_DATE,ACADEMIC_AFFAIRS_SIGN_DATE,POSITION_MGMT_SIGN_DATE");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}

			}  catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			}  catch (Exception e1) {
				log.debug(Arrays.toString(e1.getStackTrace()) + "Message-----" + e1.getMessage());
			}  finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in PositionActionFormDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				/*if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in PositionActionFormDB Finally Block=" + Arrays.toString(e.getStackTrace()));
					}
				}*/
			}
			

		}
		
		
	}
	
	private void saveChildTableData(Connection conn, Element eElement, String formName, String tableName, String formId, String workflowInstanceId) {
		try {
			LinkedHashMap<String, Object> dataMapInfo = null;
			String fundingDeptId = "";
			String fund = "";
			String programCode = "";
			String classCode = "";
			String project = "";
			String account = "";
			String percentageDistr = "";
			DatabaseUtils dbUtils = new DatabaseUtils();
			
			/*String resultData = dbUtils.getSPEEvalData(conn, formId, "FORM_ID", workflowInstanceId, tableName);
			if (resultData != null && !resultData.equals("")) {
				dbUtils.deleteSPEEvalData(conn, formId, "FORM_ID", workflowInstanceId, tableName);
			}*/

			for (int j = 0; j < eElement.getElementsByTagName("TTwoROne").getLength(); j++) {

				for (int k = 0; k < eElement.getElementsByTagName("TTwoROne").item(j).getChildNodes().getLength(); k++) {
					String nodeName = eElement.getElementsByTagName("TTwoROne").item(j).getChildNodes().item(k)
							.getNodeName();

					String nodeValue = eElement.getElementsByTagName("TTwoROne").item(j).getChildNodes().item(k)
							.getTextContent();

					if (nodeName.contains("TTwoROneFundingDeptId")) {
						fundingDeptId = nodeValue;
					}
					if (nodeName.contains("TTwoROneFund")) {
						fund = nodeValue;
					}
					if (nodeName.contains("TTwoROneProgramCode")) {
						programCode = nodeValue;
					}
					if (nodeName.contains("TTwoROneClassCode")) {
						classCode = nodeValue;
					}
					if (nodeName.contains("TTwoROneProject")) {
						project = nodeValue;
					}
					if (nodeName.contains("TTwoROneAccount")) {
						account = nodeValue;
					}
					if (nodeName.contains("TTwoROneDist")) {
						percentageDistr = nodeValue;
					}
				}
				dataMapInfo = new LinkedHashMap<String, Object>();

				dataMapInfo.put("FUNDING_DEPT_ID", fundingDeptId);
				dataMapInfo.put("FUND", fund);
				dataMapInfo.put("PROGRAM_CODE", programCode);
				dataMapInfo.put("CLASS_CODE", classCode);
				dataMapInfo.put("PROJECT", project);
				dataMapInfo.put("ACCOUNT", account);
				dataMapInfo.put("PERCENTAGE_DISTR", percentageDistr);
				dataMapInfo.put("FORM_ID", formId);
				dataMapInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceId);

				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.error("Connection Successfull");
					dbUtil.insertFormData(conn, dataMapInfo, tableName, formName);
				} else {
					log.error("Connection Unsuccessfull");
				}*/
				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, "", "", workflowInstanceId, dataMapInfo, "");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}

			}
		} catch (Exception e) {
			log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			log.error("Failed to insert Titan Card Table Data");
		}
	}

}
