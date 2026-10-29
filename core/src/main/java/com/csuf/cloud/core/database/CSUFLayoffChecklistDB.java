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
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=CSUF Sample DB", "service.vendor=ThoughtFocus",
		"process.label=LayoffChecklistDB" })

public class CSUFLayoffChecklistDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	private static final Logger log = LoggerFactory.getLogger(CSUFLayoffChecklistDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_LAYOFF_CHECKLIST";
		String formName = "Layoff Checklist";
		String perm = "";
		String prob = "";
		String temporary = "";
		String leaveofAbsence = "";
		String emplID = "";
		String type = "";
		String firstName = "";
		String lastName = "";
		String dateInitiated = "";
		String classification = "";
		String range = "";
		String cbid = "";
		String SCOPositionNo = "";
		String department = "";
		String deptId = "";
		String timebase = "";
		String adminExt = "";
		String appropriateAdmin = "";
		String mppExt = "";
		String mppSup = "";
		String effDate = "";
		String dateOfLetter = "";
		String reEmpYes = "";
		String reEmpNo = "";
		String occupiedBy = "";
		String vacantPosition = "";
		String occupiedByValue = "";
		String reasignSCOPos = "";
		String reasignDepartment = "";
		String newMPPSupervisor = "";
		String reassignAppropriateAdmin = "";
		String reassignDeptID = "";
		String retreatYes = "";
		String retreatNo = "";
		String toClassificationCode = "";
		String exerciseNo = "";
		String exerciseYes = "";
		String retreatClassification = "";
		String retreatRange = "";
		String retreatCBID = "";
		String requestDate = "";
		String reassignmentdateofLetter = "";
		String retreatEffDate = "";
		String retreatSCOPos = "";
		String retreatCMSNo = "";
		String retreatDept = "";
		String retreatDeptID = "";
		String vacantYes = "";
		String vacantNo = "";
		String ifNoOccupiedBy = "";
		String retreatAppropriateAdmin = "";
		String retreatImpMPPSup = "";
		String retreatComments = "";
		String statusEffDate1 = "";
		String statusEffDate2 = "";
		String statusEffDate3 = "";
		String rescissiondateoflayoffletter = "";
		String extensionDateofAssignment1 = "";
		String extensionDateofAssignment2 = "";
		String statusComments = "";
		String reEmpCBID1 = "";
		String reEmpDept1 = "";
		String reEmpCMSNo1 = "";
		String reEmpSCOPos1 = "";
		String reEmpAppropriateAdmin1 = "";
		String reEmpImpMPPSup1 = "";
		String reEmpAccepted1 = "";
		String reEmpDeclined1 = "";
		String reEmpEffDate1 = "";
		String reEmpHRRep1 = "";
		String reEmpHRRep2 = "";
		String reEmpEffDate2 = "";
		String reEmpDeclined2 = "";
		String reEmpAccepted2 = "";
		String reEmpAppropriateAdmin2 = "";
		String reEmpImpMPPSup2 = "";
		String reEmpCBID2 = "";
		String reEmpDept2 = "";
		String reEmpSCOPos2 = "";
		String reEmpCMSNo2 = "";

		LinkedHashMap<String, Object> dataMap = null;

		/*String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
		String workflowInstanceID = workItem.getWorkflow().getId();

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
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
							perm = eElement.getElementsByTagName("Perm").item(0).getTextContent();
							prob = eElement.getElementsByTagName("Prob").item(0).getTextContent();
							temporary = eElement.getElementsByTagName("Temp").item(0).getTextContent();
							leaveofAbsence = eElement.getElementsByTagName("LeaveofAbsence").item(0).getTextContent();
							emplID = eElement.getElementsByTagName("EmplId").item(0).getTextContent();
							type = eElement.getElementsByTagName("Type").item(0).getTextContent();
							firstName = eElement.getElementsByTagName("FirstName").item(0).getTextContent();
							lastName = eElement.getElementsByTagName("LastName").item(0).getTextContent();
							dateInitiated = eElement.getElementsByTagName("DateInitiated").item(0).getTextContent();
							classification = eElement.getElementsByTagName("Classification").item(0).getTextContent();
							range = eElement.getElementsByTagName("Range").item(0).getTextContent();
							cbid = eElement.getElementsByTagName("CBID").item(0).getTextContent();
							SCOPositionNo = eElement.getElementsByTagName("SCOPositionNo").item(0).getTextContent();
							department = eElement.getElementsByTagName("Department").item(0).getTextContent();
							deptId = eElement.getElementsByTagName("DeptId").item(0).getTextContent();
							timebase = eElement.getElementsByTagName("Timebase").item(0).getTextContent();
							adminExt = eElement.getElementsByTagName("AdminExt").item(0).getTextContent();
							appropriateAdmin = eElement.getElementsByTagName("AppropriateAdmin").item(0)
									.getTextContent();
							mppExt = eElement.getElementsByTagName("MPPExt").item(0).getTextContent();
							mppSup = eElement.getElementsByTagName("MPPSup").item(0).getTextContent();
							effDate = eElement.getElementsByTagName("EffectiveDate").item(0).getTextContent();
							dateOfLetter = eElement.getElementsByTagName("DateOfLetter").item(0).getTextContent();
							reEmpYes = eElement.getElementsByTagName("ReEmpYes").item(0).getTextContent();
							reEmpNo = eElement.getElementsByTagName("ReEmpNo").item(0).getTextContent();

							// Tab -2

							occupiedBy = eElement.getElementsByTagName("OccupiedBy").item(0).getTextContent();
							vacantPosition = eElement.getElementsByTagName("VacantPosition").item(0).getTextContent();
							occupiedByValue = eElement.getElementsByTagName("OccupiedByValue").item(0).getTextContent();

							reasignSCOPos = eElement.getElementsByTagName("ReasignSCOPos").item(0).getTextContent();

							reasignDepartment = eElement.getElementsByTagName("ReasignDepartment").item(0)
									.getTextContent();

							newMPPSupervisor = eElement.getElementsByTagName("NewMPPSupervisor").item(0)
									.getTextContent();

							reassignAppropriateAdmin = eElement.getElementsByTagName("ReassignAppropriateAdmin").item(0)
									.getTextContent();
							reassignDeptID = eElement.getElementsByTagName("ReassignDeptID").item(0).getTextContent();

							// Tab -3

							retreatYes = eElement.getElementsByTagName("RetreatYes").item(0).getTextContent();
							retreatNo = eElement.getElementsByTagName("RetreatNo").item(0).getTextContent();
							toClassificationCode = eElement.getElementsByTagName("ToClassificationCode").item(0)
									.getTextContent();
							exerciseNo = eElement.getElementsByTagName("ExerciseNo").item(0).getTextContent();
							exerciseYes = eElement.getElementsByTagName("ExerciseYes").item(0).getTextContent();
							retreatClassification = eElement.getElementsByTagName("RetreatClassification").item(0)
									.getTextContent();
							retreatRange = eElement.getElementsByTagName("RetreatRange").item(0).getTextContent();
							retreatCBID = eElement.getElementsByTagName("RetreatCBID").item(0).getTextContent();
							requestDate = eElement.getElementsByTagName("RequestDate").item(0).getTextContent();
							reassignmentdateofLetter = eElement.getElementsByTagName("ReassignmentdateofLetter").item(0)
									.getTextContent();
							retreatEffDate = eElement.getElementsByTagName("RetreatEffDate").item(0).getTextContent();
							retreatSCOPos = eElement.getElementsByTagName("RetreatSCOPos").item(0).getTextContent();
							retreatCMSNo = eElement.getElementsByTagName("RetreatCMSNo").item(0).getTextContent();
							retreatDept = eElement.getElementsByTagName("RetreatDept").item(0).getTextContent();
							retreatDeptID = eElement.getElementsByTagName("RetreatDeptID").item(0).getTextContent();
							vacantYes = eElement.getElementsByTagName("VacantYes").item(0).getTextContent();
							vacantNo = eElement.getElementsByTagName("VacantNo").item(0).getTextContent();

							ifNoOccupiedBy = eElement.getElementsByTagName("IfNoOccupiedBy").item(0).getTextContent();
							retreatAppropriateAdmin = eElement.getElementsByTagName("RetreatAppropriateAdmin").item(0)
									.getTextContent();
							retreatImpMPPSup = eElement.getElementsByTagName("RetreatImpMPPSup").item(0)
									.getTextContent();
							retreatComments = eElement.getElementsByTagName("RetreatComments").item(0).getTextContent();

							// Tab -4

							statusEffDate1 = eElement.getElementsByTagName("StatusEffDate1").item(0).getTextContent();
							statusEffDate2 = eElement.getElementsByTagName("StatusEffDate2").item(0).getTextContent();
							statusEffDate3 = eElement.getElementsByTagName("StatusEffDate3").item(0).getTextContent();
							rescissiondateoflayoffletter = eElement.getElementsByTagName("Rescissiondateoflayoffletter")
									.item(0).getTextContent();
							extensionDateofAssignment1 = eElement.getElementsByTagName("ExtensionDateofAssignment1")
									.item(0).getTextContent();
							extensionDateofAssignment2 = eElement.getElementsByTagName("ExtensionDateofAssignment2")
									.item(0).getTextContent();
							statusComments = eElement.getElementsByTagName("StatusComments").item(0).getTextContent();

							// Tab -5
							reEmpCBID1 = eElement.getElementsByTagName("ReEmpCBID1").item(0).getTextContent();
							reEmpDept1 = eElement.getElementsByTagName("ReEmpDept1").item(0).getTextContent();
							reEmpCMSNo1 = eElement.getElementsByTagName("ReEmpCMSNo1").item(0).getTextContent();
							reEmpSCOPos1 = eElement.getElementsByTagName("ReEmpSCOPos1").item(0).getTextContent();
							reEmpAppropriateAdmin1 = eElement.getElementsByTagName("ReEmpAppropriateAdmin1").item(0)
									.getTextContent();
							reEmpImpMPPSup1 = eElement.getElementsByTagName("ReEmpImpMPPSup1").item(0).getTextContent();
							reEmpAccepted1 = eElement.getElementsByTagName("ReEmpAccepted1").item(0).getTextContent();
							reEmpDeclined1 = eElement.getElementsByTagName("ReEmpDeclined1").item(0).getTextContent();
							reEmpEffDate1 = eElement.getElementsByTagName("ReEmpEffDate1").item(0).getTextContent();
							reEmpHRRep1 = eElement.getElementsByTagName("ReEmpHRRep1").item(0).getTextContent();

							reEmpHRRep2 = eElement.getElementsByTagName("ReEmpHRRep2").item(0).getTextContent();
							reEmpEffDate2 = eElement.getElementsByTagName("ReEmpEffDate2").item(0).getTextContent();
							reEmpDeclined2 = eElement.getElementsByTagName("ReEmpDeclined2").item(0).getTextContent();
							reEmpAccepted2 = eElement.getElementsByTagName("ReEmpAccepted2").item(0).getTextContent();
							reEmpAppropriateAdmin2 = eElement.getElementsByTagName("ReEmpAppropriateAdmin2").item(0)
									.getTextContent();
							reEmpImpMPPSup2 = eElement.getElementsByTagName("ReEmpImpMPPSup2").item(0).getTextContent();
							reEmpCBID2 = eElement.getElementsByTagName("ReEmpCBID2").item(0).getTextContent();
							reEmpDept2 = eElement.getElementsByTagName("ReEmpDept2").item(0).getTextContent();
							reEmpCMSNo2 = eElement.getElementsByTagName("ReEmpCMSNo2").item(0).getTextContent();
							reEmpSCOPos2 = eElement.getElementsByTagName("ReEmpSCOPos2").item(0).getTextContent();

						}
					}

					dataMap = new LinkedHashMap<String, Object>();
					dataMap.put("EMPID", emplID);
					dataMap.put("PERM", perm);
					dataMap.put("PROB", prob);
					dataMap.put("TEMP", temporary);
					dataMap.put("LEAVE_OF_ABSENCE", leaveofAbsence);
					dataMap.put("TYPE", type);
					dataMap.put("FIRST_NAME", firstName);
					dataMap.put("LAST_NAME", lastName);
					Object dateQualifyEvtObj = null;
					if (dateInitiated != null && dateInitiated != "") {
						Date dateQualifingEventNew = Date.valueOf(dateInitiated);
						dateQualifyEvtObj = dateQualifingEventNew;
					}
					dataMap.put("DATE_INITIATED", dateQualifyEvtObj);
					dataMap.put("CLASSIFICATION", classification);
					dataMap.put("EMP_RANGE", range);
					dataMap.put("CBID", cbid);
					dataMap.put("SCO_POSITION_NO", SCOPositionNo);
					dataMap.put("DEPARTMENT", department);
					dataMap.put("DEPT_ID", deptId);
					dataMap.put("TIMEBASE", timebase);
					dataMap.put("ADMIN_EXT", adminExt);
					dataMap.put("APPROPRIATE_ADMIN", appropriateAdmin);
					dataMap.put("IMMEDIATE_MPP_EXT", mppExt);
					dataMap.put("IMMEDIATE_MPP_SUP", mppSup);
					Object effDateObj = null;
					if (effDate != null && effDate != "") {
						Date effDateNew = Date.valueOf(effDate);
						effDateObj = effDateNew;
					}
					dataMap.put("EFFECTIVE_DATE", effDateObj);

					Object dolObj = null;
					if (dateOfLetter != null && dateOfLetter != "") {
						Date dolNew = Date.valueOf(dateOfLetter);
						dolObj = dolNew;
					}
					dataMap.put("DATE_OF_LETTER", dolObj);
					dataMap.put("RE_EMP_YES", reEmpYes);
					dataMap.put("RE_EMP_NO", reEmpNo);

					// Tab -2
					dataMap.put("OCCUPIED_BY", occupiedBy);
					dataMap.put("VACANT_POSITION", vacantPosition);
					dataMap.put("OCCUPIED_BY_VALUE", occupiedByValue);
					dataMap.put("REASIGN_SCO_POS", reasignSCOPos);
					dataMap.put("REASIGN_DEPARTMENT", reasignDepartment);
					dataMap.put("REASSIGN_DEPTID", reassignDeptID);
					dataMap.put("NEW_MPP_SUPERVISOR", newMPPSupervisor);
					dataMap.put("REASSIGN_APPROPRIATE_ADMIN", reassignAppropriateAdmin);

					dataMap.put("RETREAT_YES", retreatYes);
					dataMap.put("RETREAT_NO", retreatNo);
					dataMap.put("TO_CLASSIFICATION_CODE", toClassificationCode);
					dataMap.put("EXERCISE_NO", exerciseNo);
					dataMap.put("EXERCISE_YES", exerciseYes);
					dataMap.put("RETREAT_CLASSIFICATION", retreatClassification);
					dataMap.put("RETREAT_RANGE", retreatRange);
					dataMap.put("RETREAT_CBID", retreatCBID);
					Object requestDateObj = null;
					if (requestDate != null && requestDate != "") {
						Date requestDateNew = Date.valueOf(requestDate);
						requestDateObj = requestDateNew;
					}
					dataMap.put("REQUEST_DATE", requestDateObj);

					Object reassignmentdateofLetterObj = null;
					if (reassignmentdateofLetter != null && reassignmentdateofLetter != "") {
						Date reassignDOLNew = Date.valueOf(reassignmentdateofLetter);
						reassignmentdateofLetterObj = reassignDOLNew;
					}
					dataMap.put("REASSIGNMENT_D0L", reassignmentdateofLetterObj);

					Object retreatEffDateObj = null;
					if (retreatEffDate != null && retreatEffDate != "") {
						Date reEffDateNew = Date.valueOf(retreatEffDate);
						retreatEffDateObj = reEffDateNew;
					}
					dataMap.put("RETREAT_EFF_DATE", retreatEffDateObj);
					dataMap.put("RETREAT_SCO_POS", retreatSCOPos);
					dataMap.put("RETREAT_CMS_NO", retreatCMSNo);
					dataMap.put("RETREAT_DEPT", retreatDept);
					dataMap.put("RETREAT_DEPTID", retreatDeptID);
					dataMap.put("VACANT_YES", vacantYes);
					dataMap.put("VACANT_NO", vacantNo);
					dataMap.put("IF_NO_OCCUPIED_BY", ifNoOccupiedBy);
					dataMap.put("RETREAT_IMP_MPP_SUP", retreatImpMPPSup);
					dataMap.put("RETREAT_COMMENTS", retreatComments);
					dataMap.put("RETREAT_APPROPRIATE_ADMIN", retreatAppropriateAdmin);

					Object statusEffDate1Obj = null;
					if (statusEffDate1 != null && statusEffDate1 != "") {
						Date statuDateNew1 = Date.valueOf(statusEffDate1);
						statusEffDate1Obj = statuDateNew1;
					}
					dataMap.put("STATUS_EFF_DATE1", statusEffDate1Obj);

					Object statusEffDate2Obj = null;
					if (statusEffDate2 != null && statusEffDate2 != "") {
						Date statuDateNew1 = Date.valueOf(statusEffDate2);
						statusEffDate2Obj = statuDateNew1;
					}
					dataMap.put("STATUS_EFF_DATE2", statusEffDate2Obj);

					Object statusEffDate3Obj = null;
					if (statusEffDate3 != null && statusEffDate3 != "") {
						Date statuDateNew3 = Date.valueOf(statusEffDate3);
						statusEffDate3Obj = statuDateNew3;
					}
					dataMap.put("STATUS_EFF_DATE3", statusEffDate3Obj);

					Object rescissionDOLObj = null;
					if (rescissiondateoflayoffletter != null && rescissiondateoflayoffletter != "") {
						Date recessionDateLetter = Date.valueOf(rescissiondateoflayoffletter);
						rescissionDOLObj = recessionDateLetter;
					}
					dataMap.put("RESCISSION_DATE_LAYOFF_LETTER", rescissionDOLObj);
					Object extObj1 = null;
					if (extensionDateofAssignment1 != null && extensionDateofAssignment1 != "") {
						Date extendionDOA1 = Date.valueOf(extensionDateofAssignment1);
						extObj1 = extendionDOA1;
					}
					dataMap.put("EXTENSION_DATE_ASSIGNMENT1", extObj1);
					Object extObj2 = null;
					if (extensionDateofAssignment2 != null && extensionDateofAssignment2 != "") {
						Date extendionDOA2 = Date.valueOf(extensionDateofAssignment2);
						extObj2 = extendionDOA2;
					}
					dataMap.put("EXTENSION_DATE_ASSIGNMENT2", extObj2);
					dataMap.put("STATUS_COMMENTS", statusComments);

					dataMap.put("RE_EMP_CBID1", reEmpCBID1);
					dataMap.put("RE_EMP_DEPT1", reEmpDept1);
					dataMap.put("RE_EMP_CMS_NO1", reEmpCMSNo1);
					dataMap.put("RE_EMP_SCO_POS1", reEmpSCOPos1);
					dataMap.put("RE_EMP_APPROPRIATE_ADMIN1", reEmpAppropriateAdmin1);
					dataMap.put("RE_EMP_IMP_MPP_SUP1", reEmpImpMPPSup1);
					dataMap.put("RE_EMP_ACCEPTED1", reEmpAccepted1);
					dataMap.put("RE_EMP_DECLINED1", reEmpDeclined1);
					Object reEmpEffDateObj1 = null;
					if (reEmpEffDate1 != null && reEmpEffDate1 != "") {
						Date reEmpEff1 = Date.valueOf(reEmpEffDate1);
						reEmpEffDateObj1 = reEmpEff1;
					}
					dataMap.put("RE_EMP_EFF_DATE1", reEmpEffDateObj1);
					dataMap.put("RE_EMP_HR_REP1", reEmpHRRep1);

					dataMap.put("RE_EMP_HR_REP2", reEmpHRRep2);
					dataMap.put("RE_EMP_DECLINED2", reEmpDeclined2);
					dataMap.put("RE_EMP_ACCEPTED2", reEmpAccepted2);
					dataMap.put("RE_EMP_APPROPRIATE_ADMIN2", reEmpAppropriateAdmin2);
					dataMap.put("RE_EMP_IMP_MPP_SUP2", reEmpImpMPPSup2);
					dataMap.put("RE_EMP_CBID2", reEmpCBID2);
					dataMap.put("RE_EMP_DEPT2", reEmpDept2);
					dataMap.put("RE_EMP_CMS_NO2", reEmpCMSNo2);
					Object reEmpEffDateObj2 = null;
					if (reEmpEffDate2 != null && reEmpEffDate2 != "") {
						Date reEmpEff2 = Date.valueOf(reEmpEffDate2);
						reEmpEffDateObj2 = reEmpEff2;
					}
					dataMap.put("RE_EMP_EFF_DATE2", reEmpEffDateObj2);
					dataMap.put("RE_EMP_SCO_POS2", reEmpSCOPos2);

				}

				try {
					CloudDbSaveUtil.saveFormData(tableName, formName, emplID, "EMPID", workflowInstanceID, dataMap,
							"DATE_INITIATED,EFFECTIVE_DATE,DATE_OF_LETTER,REQUEST_DATE,RETREAT_EFF_DATE,STATUS_EFF_DATE1,STATUS_EFF_DATE2,STATUS_EFF_DATE3,RESCISSION_DATE_LAYOFF_LETTER,EXTENSION_DATE_ASSIGNMENT1,EXTENSION_DATE_ASSIGNMENT2,RE_EMP_EFF_DATE1,RE_EMP_EFF_DATE2");
				} catch (IOException ioException) {
					ioException.printStackTrace();
				}

			} catch (Exception e) {
				log.error(Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}

			}

		}

	}

}
