package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.sql.ResultSet;
import java.sql.Statement;

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

@Component(property = {
  "service.description=CSUF HR Covid Self Certification DB",
  "service.vendor=ThoughtFocus",
  "process.label=HRCovidSelfCertificationDB"
})

public class HRCovidSelfCertificationDB implements WorkflowProcess {

  @Reference
  private GlobalConfigCSUFService globalConfigFilenetService;

  @Reference
  private JDBCConnectionHelperService jdbcConnectionService;
  @Reference
  private TaskService taskService;

  private static final Logger log = LoggerFactory.getLogger(HRCovidSelfCertificationDB.class);

  public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
  throws com.adobe.granite.workflow.WorkflowException {
    Connection conn = null;
    String tableName = "AEM_HR_COVID_SELF_CERTI";
    String formName = "HR Covid 19 Self Certification";
    String assignee = "";
    String cwid = "";
    LinkedHashMap < String, Object > dataMap = null;
    LinkedHashMap < String, Object > dataMapTable = null;

    /*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();    conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
    String payloadPath = workItem.getWorkflowData().getPayload().toString();
    ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
    String workflowInstanceID = workItem.getWorkflow().getId();
    if (StringUtils.isNotBlank(payloadPath)) {
      InputStream is = null;
      try {
        is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");

        if (null != is) {
          Document doc = XMLUtils.getDomDocument(is);
          String data = "";
          try {
            data = XMLUtils.prettyPrintAsString(doc);
          } catch (Exception e1) {
            e1.printStackTrace();
          }
          org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
          for (int temp = 0; temp < nList.getLength(); temp++) {
            org.w3c.dom.Node nNode = nList.item(temp);
            if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
              try {
                org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
                dataMap = new LinkedHashMap < String, Object > ();
                cwid = eElement.getElementsByTagName("CWID").item(0).getTextContent();
                dataMap.put("CWID", cwid);
                dataMap.put("CAMPUS_EMAIL",
                  eElement.getElementsByTagName("CampusEmail").item(0).getTextContent());
                dataMap.put("FIRST_NAME",
                  eElement.getElementsByTagName("FirstName").item(0).getTextContent());
                dataMap.put("LAST_NAME",
                  eElement.getElementsByTagName("LastName").item(0).getTextContent());
                dataMap.put("DEPT_NAME",
                  eElement.getElementsByTagName("DepartmentName").item(0).getTextContent());
                dataMap.put("DEPTID",
                  eElement.getElementsByTagName("DepartmentID").item(0).getTextContent());
                dataMap.put("DIVISION",
                  eElement.getElementsByTagName("Division").item(0).getTextContent());
                dataMap.put("TITLE",
                  eElement.getElementsByTagName("Title").item(0).getTextContent());
                dataMap.put("TYPES_OF_VACCINATION",
                  eElement.getElementsByTagName("TypesOfVaccination").item(0).getTextContent());

                dataMap.put("ADMINISTRATOR", eElement
                  .getElementsByTagName("AppropriateAdministrator").item(0).getTextContent());
                dataMap.put("DATA", data);
                dataMap.put("REQUESTOR_USER_ID", eElement
                  .getElementsByTagName("RequestorUserID").item(0).getTextContent());
                dataMap.put("REQUESTOR_NAME", eElement
                  .getElementsByTagName("RequestorName").item(0).getTextContent());
                dataMap.put("REQUESTOR_EMAIL", eElement
                  .getElementsByTagName("RequestorEmail").item(0).getTextContent());

                dataMap.put("MANAGER_USER_ID", eElement
                  .getElementsByTagName("ManagerUserID").item(0).getTextContent());
                dataMap.put("MANAGER_NAME", eElement
                  .getElementsByTagName("ManagerName").item(0).getTextContent());
                dataMap.put("MANAGER_EMAIL", eElement
                  .getElementsByTagName("ManagerEmail").item(0).getTextContent());

                dataMap.put("INITIATOR_SIGN",
                  eElement.getElementsByTagName("InitiatorSignature").item(0).getTextContent());
                String inidate = eElement.getElementsByTagName("InitiatorSignatureDate").item(0)
                  .getTextContent();
                Object inidateObj = "";
                if (inidate != null && inidate != "") {
                  Date inidateNew = Date.valueOf(inidate);
                  inidateObj = inidateNew;
                }
                dataMap.put("INITIATOR_SIGN_DATE", inidateObj);
                dataMap.put("INITIATOR_COMMENTS",
                  eElement.getElementsByTagName("InitiatorComments").item(0).getTextContent());

                List < Route > backRoutesList = workflowSession.getBackRoutes(workItem, false);
                JsonArray backRoutesJson = new JsonArray();
                for (Route backRoute: backRoutesList) {
                  backRoutesJson.add(backRoute.getName());
                }
                String saveHistoryBackRoute = "";
                if (backRoutesJson.size() == 1) {
                  saveHistoryBackRoute = backRoutesList.get(0).getName();
                } else {
                  saveHistoryBackRoute = backRoutesList.get(1).getName();
                  String wId = workItem.getId().replace("VolatileWorkItem_", "/workItems/");
                  String firstStr = wId.substring(0, wId.indexOf('_'));
                  String secString = wId.substring(wId.indexOf('_') + 1, wId.length());
                  String t1 = firstStr.replaceAll("[^0-9]+", "");
                  int a1 = Integer.parseInt(t1);
                  a1 = a1 - 2;
                  firstStr = firstStr.replaceAll(t1, String.valueOf(a1));
                  String workItemId = workflowInstanceID.concat(firstStr).concat("_")
                    .concat(secString);
                  assignee = taskService.getTaskAssignee(workItemId);
                }
                dataMap.put("LAST_STEP", saveHistoryBackRoute);
                dataMap.put("LAST_STEP_ASSIGNEE", assignee);
                dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

                /*if (conn != null) {
                  DatabaseUtils dbUtil = new DatabaseUtils();
                  log.error("Connection Successfull");
                  String resultData = dbUtil.getSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
                  if (resultData != null && !resultData.equals("")) {
                    dbUtil.deleteSPEEvalData(conn, cwid, "CWID", workflowInstanceID, tableName);
                    dbUtil.insertFormData(conn, dataMap, tableName, formName);
                  } else {
                    dbUtil.insertFormData(conn, dataMap, tableName, formName);
                  }
                }*/
                try {
                  CloudDbSaveUtil.saveFormData(tableName, formName, cwid, "CWID", workflowInstanceID, dataMap,
                      "INITIATOR_SIGN_DATE");
                } catch (IOException ioException) {
                  ioException.printStackTrace();
                }

              } catch (Exception e) {
                log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
              }
            }
          }

        }

      } catch (RepositoryException | SAXException | IOException | ParserConfigurationException e) {
        log.debug(Arrays.toString(e.getStackTrace()) + "Message-----" + e.getMessage());
      } finally {
        if (null != is)
          try {
            is.close();
          } catch (IOException e) {
            log.debug("IOException in HRCovidSelfCertificationDB Finally Block=" +
              Arrays.toString(e.getStackTrace()));
          }
        /*if (conn != null) { try { conn.close(); } catch (SQLException e) { } }*/
      }

    }

  }

}