package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.services.TaskService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=Dotted Line DB", "service.vendor=ThoughtFocus",
		"process.label=Vendor Fee Waiver Reduction DB" })

public class VendorFeeWaiverReductionDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private TaskService taskService;

	private static final Logger log = LoggerFactory.getLogger(VendorFeeWaiverReductionDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_VENDOR_FEE_WAIVER";
		String formName = "Vendor Fee Waiver Reduction Form";
		String cwid = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String workflowInstanceID = workItem.getWorkflow().getId();
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
							try {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
								dataMap = new LinkedHashMap<String, Object>();
								log.debug("eElement : " + eElement);
								cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
								dataMap.put("CWID", cwid);
								dataMap.put("CASEID", eElement.getElementsByTagName("CaseID").item(0).getTextContent());
								dataMap.put("EMAIL", eElement.getElementsByTagName("Email").item(0).getTextContent());
								dataMap.put("REQUESTOR_NAME", eElement.getElementsByTagName("Name").item(0).getTextContent());
								dataMap.put("DEPARTMENT", eElement.getElementsByTagName("Department").item(0).getTextContent());
								dataMap.put("EVENT_NAME", eElement.getElementsByTagName("EventName").item(0).getTextContent());
								dataMap.put("AGREEMENT_NO", eElement.getElementsByTagName("AgreementNumber").item(0).getTextContent());
								dataMap.put("TOTAL_CONTRACT_VALUE", eElement.getElementsByTagName("TotalContractValue").item(0).getTextContent());
								dataMap.put("AMOUNT_TO_WAIVE", eElement.getElementsByTagName("AmountToBeWaived").item(0).getTextContent());
								dataMap.put("REQUESTOR_DETAILS", eElement.getElementsByTagName("ReqDetails").item(0).getTextContent());
								
								String reqDate = eElement.getElementsByTagName("EventDate").item(0)
										.getTextContent();
								Object reqDateObj = null;
								if (reqDate != null && reqDate != "") {
									Date reqDateNew = Date.valueOf(reqDate);
									reqDateObj = reqDateNew;
								}
								dataMap.put("EVENT_DATE", reqDateObj);
								
								dataMap.put("INITIATOR_SIGNATURE", eElement.getElementsByTagName("InitiatorSignature").item(0).getTextContent());
								dataMap.put("INITIATOR_COMMENTS", eElement.getElementsByTagName("InitiatorComments").item(0).getTextContent());
								String initiatorDate = eElement.getElementsByTagName("InitiatorSignDate").item(0).getTextContent();
								
								Object initiatorDateObj = null;
								if (initiatorDate != null && initiatorDate != "") {
									Date iniDateNew = Date.valueOf(initiatorDate);
									initiatorDateObj = iniDateNew;
								}
								
								dataMap.put("INITIATOR_DATE", initiatorDateObj);
								
								dataMap.put("FACILITIES_OFFICER_SIGNATURE", eElement.getElementsByTagName("FacilitiesOfficerSignature").item(0).getTextContent());
								dataMap.put("FACILITIES_OFFICER_COMMENTS", eElement.getElementsByTagName("FacilitiesOfficerComments").item(0).getTextContent());
								String managerDate = eElement.getElementsByTagName("FacilitiesOfficerSignDate").item(0)
										.getTextContent();
								Object foSignDateObj = null;
								if (managerDate != null && managerDate != "") {
									Date managerDateNew = Date.valueOf(initiatorDate);
									foSignDateObj = managerDateNew;
								}
								dataMap.put("FACILITIES_OFFICER_SIGN_DATE", foSignDateObj);
								
								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
								
								
							} catch (Exception e) {
								log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
							}
						}
					}

				}
				/*if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					log.debug("Connection Successfull");
					String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
					if (resultData != null && !resultData.equals("")) {
						dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					} else {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}
				}*/

			} catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
				log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.debug("IOException in CSUFEmergencyAssistanceGrantDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						log.error("SQLException in CSUFEmergencyAssistanceGrantDB Finally Block="
								+ Arrays.toString(e.getStackTrace()));
					}
				}
			}

		}

	}

}
