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

@Component(property = { "service.description=CSUF Sample DB", "service.vendor=ThoughtFocus",
		"process.label=CSUFNewPositionManagerAuditCommentHistoryDB" })

public class CSUFNewPositionManagerAuditCommentHistoryDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	private static final Logger log = LoggerFactory.getLogger(CSUFNewPositionManagerAuditCommentHistoryDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_NEW_PD_MANAGER_AUDIT";
		String formName = "New Position Manager";

		String empId = "";
		String firstName = "";
		String lastName = "";
		String empRCD = "";
		String scoPosition = "";
		String cmsPosition = "";
		String classification = "";
		String range = "";
		String department = "";
		String deptID = "";
		String workingTitle = "";
		String appointmentType = "";
		String Fulltime = "";
		String Parttime = "";
		String cbid = "";
		String dateInitiated = "";
		String supervisor = "";
		String appropriateAdmin = "";
		String explanation1 = "";
		String explanation2 = "";
		String explanation3 = "";
		String explanation4 = "";
		String explanation5 = "";
		String explanation6 = "";
		String explanation7 = "";
		String explanation8 = "";
		String explanation9 = "";

		String complianceYes = "";
		String complianceNo = "";
		String decisionYes = "";
		String decisionNo = "";

		String bendingRB = "";
		String bendingVal = "";
		String walkingRB = "";
		String walkingVal = "";
		String squattingRB = "";
		String squattingVal = "";
		String unEvenWalkRB = "";
		String unEvenWalkVal = "";
		String crawlingRB = "";
		String crawlingVal = "";
		String liftingRB = "";
		String liftingVal = "";
		String kneelingRB = "";
		String kneelingVal = "";
		String climbingRB = "";
		String climbingVal = "";
		String graspingRB = "";
		String graspingVal = "";
		String pushingRB = "";
		String pushingVal = "";
		String movementsRB = "";
		String movementsVal = "";
		String reachingOverheadRB = "";
		String reachingOverheadVal = "";
		String discriminateColrsRB = "";
		String discriminateColrsVal = "";
		String auditoryRequirementsRB = "";
		String auditoryRequirementsVal = "";
		String balancingRB = "";
		String balancingVal = "";
		String wearingRespiratorRB = "";
		String wearingRespiratorVal = "";
		String sittingRB = "";
		String sittingVal = "";
		String driverRB = "";
		String driverVal = "";
		String standingRB = "";
		String standingVal = "";
		String chemicalAgentsRB = "";
		String chemicalAgentsVal = "";
		String heightsRB = "";
		String heightsVal = "";
		String tuberculosisRB = "";
		String tuberculosisVal = "";
		String dirtAndDustRB = "";
		String dirtAndDustVal = "";
		String bloddBodyFluidsTissuesRB = "";
		String bloddBodyFluidsTissuesVal = "";
		String odorsRB = "";
		String odorsVal = "";
		String temperatureVariationsRB = "";
		String temperatureVariationsVal = "";
		String noiseRB = "";
		String noiseVal = "";
		String radiologicalMaterialRB = "";
		String radiologicalMaterialVal = "";

		String mppPDComment = "";
		String compServicesComment = "";

		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

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

							empId = eElement.getElementsByTagName("EmplID").item(0).getTextContent();
							firstName = eElement.getElementsByTagName("IncumbentFirstName").item(0).getTextContent();
							lastName = eElement.getElementsByTagName("IncumbentLastName").item(0).getTextContent();
							empRCD = eElement.getElementsByTagName("EmplRCD").item(0).getTextContent();
							scoPosition = eElement.getElementsByTagName("SCOPosition").item(0).getTextContent();
							cmsPosition = eElement.getElementsByTagName("CMSPosition").item(0).getTextContent();
							classification = eElement.getElementsByTagName("Classification").item(0).getTextContent();
							range = eElement.getElementsByTagName("Range").item(0).getTextContent();
							department = eElement.getElementsByTagName("Department").item(0).getTextContent();
							deptID = eElement.getElementsByTagName("DeptID").item(0).getTextContent();
							workingTitle = eElement.getElementsByTagName("WorkingTitle").item(0).getTextContent();
							appointmentType = eElement.getElementsByTagName("AppointmentType").item(0).getTextContent();
							Fulltime = eElement.getElementsByTagName("FullTime").item(0).getTextContent();
							Parttime = eElement.getElementsByTagName("FullTime").item(0).getTextContent();
							cbid = eElement.getElementsByTagName("CBID").item(0).getTextContent();
							dateInitiated = eElement.getElementsByTagName("DateInitiated").item(0).getTextContent();
							supervisor = eElement.getElementsByTagName("ManagementSupervisor").item(0).getTextContent();
							appropriateAdmin = eElement.getElementsByTagName("AppropriateAdministrator").item(0)
									.getTextContent();

							explanation1 = eElement.getElementsByTagName("Explanation1").item(0).getTextContent();
							explanation2 = eElement.getElementsByTagName("Explanation2").item(0).getTextContent();
							explanation3 = eElement.getElementsByTagName("Explanation3").item(0).getTextContent();
							explanation4 = eElement.getElementsByTagName("Explanation4").item(0).getTextContent();
							explanation5 = eElement.getElementsByTagName("Explanation5").item(0).getTextContent();
							explanation6 = eElement.getElementsByTagName("Explanation6").item(0).getTextContent();
							explanation7 = eElement.getElementsByTagName("Explanation7").item(0).getTextContent();
							explanation8 = eElement.getElementsByTagName("Explanation8").item(0).getTextContent();
							explanation9 = eElement.getElementsByTagName("Explanation9").item(0).getTextContent();

							complianceYes = eElement.getElementsByTagName("ComplianceYes").item(0).getTextContent();
							complianceNo = eElement.getElementsByTagName("ComplianceNo").item(0).getTextContent();
							decisionYes = eElement.getElementsByTagName("DecisionYes").item(0).getTextContent();
							decisionNo = eElement.getElementsByTagName("DecisionNo").item(0).getTextContent();

							bendingRB = eElement.getElementsByTagName("BendingBR").item(0).getTextContent();
							if (bendingRB != null && !bendingRB.isEmpty()) {
								int bending = Integer.parseInt(bendingRB);
								if (bending == 0) {
									bendingVal = "N/A";
								} else if (bending == 1) {
									bendingVal = "Continuous";
								} else if (bending == 2) {
									bendingVal = "Intermittent";
								}
							}

							walkingRB = eElement.getElementsByTagName("WalkingRB").item(0).getTextContent();
							if (walkingRB != null && !walkingRB.isEmpty()) {
								int walking = Integer.parseInt(walkingRB);
								if (walking == 0) {
									walkingVal = "N/A";
								} else if (walking == 1) {
									walkingVal = "Continuous";
								} else if (walking == 2) {
									walkingVal = "Intermittent";
								}
							}

							squattingRB = eElement.getElementsByTagName("SquattingRB").item(0).getTextContent();
							if (squattingRB != null && !squattingRB.isEmpty()) {
								int squatting = Integer.parseInt(squattingRB);
								if (squatting == 0) {
									squattingVal = "N/A";
								} else if (squatting == 1) {
									squattingVal = "Continuous";
								} else if (squatting == 2) {
									squattingVal = "Intermittent";
								}
							}

							unEvenWalkRB = eElement.getElementsByTagName("UnevenWalkRB").item(0).getTextContent();
							if (unEvenWalkRB != null && !unEvenWalkRB.isEmpty()) {
								int unEvenWalk = Integer.parseInt(unEvenWalkRB);
								if (unEvenWalk == 0) {
									unEvenWalkVal = "N/A";
								} else if (unEvenWalk == 1) {
									unEvenWalkVal = "Continuous";
								} else if (unEvenWalk == 2) {
									unEvenWalkVal = "Intermittent";
								}
							}

							crawlingRB = eElement.getElementsByTagName("CrawlingRB").item(0).getTextContent();
							if (crawlingRB != null && !crawlingRB.isEmpty()) {
								int crawling = Integer.parseInt(crawlingRB);
								if (crawling == 0) {
									crawlingVal = "N/A";
								} else if (crawling == 1) {
									crawlingVal = "Continuous";
								} else if (crawling == 2) {
									crawlingVal = "Intermittent";
								}
							}

							liftingRB = eElement.getElementsByTagName("LiftingRB").item(0).getTextContent();
							if (liftingRB != null && !liftingRB.isEmpty()) {
								int lifting = Integer.parseInt(liftingRB);
								if (lifting == 0) {
									liftingVal = "N/A";
								} else if (lifting == 1) {
									liftingVal = "Up to 25 lbs";
								} else if (lifting == 2) {
									liftingVal = "Up to 50 lbs";
								} else if (lifting == 3) {
									liftingVal = "Up to 100 lbs";
								} else if (lifting == 4) {
									liftingVal = "Over 100 lbs";
								}
							}

							kneelingRB = eElement.getElementsByTagName("KneelingRB").item(0).getTextContent();
							if (kneelingRB != null && !kneelingRB.isEmpty()) {
								int kneeling = Integer.parseInt(kneelingRB);
								if (kneeling == 0) {
									kneelingVal = "N/A";
								} else if (kneeling == 1) {
									kneelingVal = "Continuous";
								} else if (kneeling == 2) {
									kneelingVal = "Intermittent";
								}
							}

							climbingRB = eElement.getElementsByTagName("ClimbingRB").item(0).getTextContent();
							if (climbingRB != null && !climbingRB.isEmpty()) {
								int climbing = Integer.parseInt(climbingRB);
								if (climbing == 0) {
									climbingVal = "N/A";
								} else if (climbing == 1) {
									climbingVal = "Continuous";
								} else if (climbing == 2) {
									climbingVal = "Intermittent";
								}
							}

							graspingRB = eElement.getElementsByTagName("GraspingRB").item(0).getTextContent();
							if (graspingRB != null && !graspingRB.isEmpty()) {
								int grasping = Integer.parseInt(graspingRB);
								if (grasping == 0) {
									graspingVal = "N/A";
								} else if (grasping == 1) {
									graspingVal = "Continuous";
								} else if (grasping == 2) {
									graspingVal = "Intermittent";
								}
							}

							pushingRB = eElement.getElementsByTagName("PushingRB").item(0).getTextContent();
							if (pushingRB != null && !pushingRB.isEmpty()) {
								int pushing = Integer.parseInt(pushingRB);
								if (pushing == 0) {
									pushingVal = "N/A";
								} else if (pushing == 1) {
									pushingVal = "Up to 25 lbs";
								} else if (pushing == 2) {
									pushingVal = "Up to 50 lbs";
								} else if (pushing == 3) {
									pushingVal = "Up to 100 lbs";
								} else if (pushing == 4) {
									pushingVal = "Over 100 lbs";
								}
							}

							movementsRB = eElement.getElementsByTagName("MovementsRB").item(0).getTextContent();
							if (movementsRB != null && !movementsRB.isEmpty()) {
								int movements = Integer.parseInt(movementsRB);
								if (movements == 0) {
									movementsVal = "N/A";
								} else if (movements == 1) {
									movementsVal = "Continuous";
								} else if (movements == 2) {
									movementsVal = "Intermittent";
								}
							}

							reachingOverheadRB = eElement.getElementsByTagName("ReachingOverheadRB").item(0)
									.getTextContent();
							if (reachingOverheadRB != null && !reachingOverheadRB.isEmpty()) {
								int reachingOverhead = Integer.parseInt(reachingOverheadRB);
								if (reachingOverhead == 0) {
									reachingOverheadVal = "N/A";
								} else if (reachingOverhead == 1) {
									reachingOverheadVal = "Continuous";
								} else if (reachingOverhead == 2) {
									reachingOverheadVal = "Intermittent";
								}
							}

							discriminateColrsRB = eElement.getElementsByTagName("DiscriminateColorsRB").item(0)
									.getTextContent();
							if (discriminateColrsRB != null && !discriminateColrsRB.isEmpty()) {
								int discriminateColrs = Integer.parseInt(discriminateColrsRB);
								if (discriminateColrs == 0) {
									discriminateColrsVal = "N/A";
								} else if (discriminateColrs == 1) {
									discriminateColrsVal = "Continuous";
								} else if (discriminateColrs == 2) {
									discriminateColrsVal = "Intermittent";
								}
							}

							auditoryRequirementsRB = eElement.getElementsByTagName("AuditoryRequirements").item(0)
									.getTextContent();
							if (auditoryRequirementsRB != null && !auditoryRequirementsRB.isEmpty()) {
								int auditoryRequirements = Integer.parseInt(auditoryRequirementsRB);
								if (auditoryRequirements == 0) {
									auditoryRequirementsVal = "N/A";
								} else if (auditoryRequirements == 1) {
									auditoryRequirementsVal = "Continuous";
								} else if (auditoryRequirements == 2) {
									auditoryRequirementsVal = "Intermittent";
								}
							}

							balancingRB = eElement.getElementsByTagName("Balancing").item(0).getTextContent();
							if (balancingRB != null && !balancingRB.isEmpty()) {
								int balancing = Integer.parseInt(balancingRB);
								if (balancing == 0) {
									balancingVal = "N/A";
								} else if (balancing == 1) {
									balancingVal = "Continuous";
								} else if (balancing == 2) {
									balancingVal = "Intermittent";
								}
							}

							wearingRespiratorRB = eElement.getElementsByTagName("WearingRespiratorRB").item(0)
									.getTextContent();
							if (wearingRespiratorRB != null && !wearingRespiratorRB.isEmpty()) {
								int wearingRespirator = Integer.parseInt(wearingRespiratorRB);
								if (wearingRespirator == 0) {
									wearingRespiratorVal = "N/A";
								} else if (wearingRespirator == 1) {
									wearingRespiratorVal = "Continuous";
								} else if (wearingRespirator == 2) {
									wearingRespiratorVal = "Intermittent";
								}
							}

							sittingRB = eElement.getElementsByTagName("SittingRB").item(0).getTextContent();
							if (sittingRB != null && !sittingRB.isEmpty()) {
								int sitting = Integer.parseInt(sittingRB);
								if (sitting == 0) {
									sittingVal = "N/A";
								} else if (sitting == 1) {
									sittingVal = "Continuous";
								} else if (sitting == 2) {
									sittingVal = "Intermittent";
								}
							}

							driverRB = eElement.getElementsByTagName("DriverRB").item(0).getTextContent();
							if (driverRB != null && !driverRB.isEmpty()) {
								int driver = Integer.parseInt(driverRB);
								if (driver == 0) {
									driverVal = "N/A";
								} else if (driver == 1) {
									driverVal = "Continuous";
								} else if (driver == 2) {
									driverVal = "Intermittent";
								}
							}

							standingRB = eElement.getElementsByTagName("StandingRB").item(0).getTextContent();
							if (standingRB != null && !standingRB.isEmpty()) {
								int standing = Integer.parseInt(standingRB);
								if (standing == 0) {
									standingVal = "N/A";
								} else if (standing == 1) {
									standingVal = "Continuous";
								} else if (standing == 2) {
									standingVal = "Intermittent";
								}
							}

							chemicalAgentsRB = eElement.getElementsByTagName("ChemicalAgents").item(0).getTextContent();
							if (chemicalAgentsRB != null && !chemicalAgentsRB.isEmpty()) {
								int chemicalAgents = Integer.parseInt(chemicalAgentsRB);
								if (chemicalAgents == 0) {
									chemicalAgentsVal = "N/A";
								} else if (chemicalAgents == 1) {
									chemicalAgentsVal = "Continuous";
								} else if (chemicalAgents == 2) {
									chemicalAgentsVal = "Intermittent";
								}
							}

							heightsRB = eElement.getElementsByTagName("Heights").item(0).getTextContent();
							if (heightsRB != null && !heightsRB.isEmpty()) {
								int heights = Integer.parseInt(heightsRB);
								if (heights == 0) {
									heightsVal = "N/A";
								} else if (heights == 1) {
									heightsVal = "Continuous";
								} else if (heights == 2) {
									heightsVal = "Intermittent";
								}
							}

							tuberculosisRB = eElement.getElementsByTagName("Tuberculosis").item(0).getTextContent();
							if (tuberculosisRB != null && !tuberculosisRB.isEmpty()) {
								int tuberculosis = Integer.parseInt(tuberculosisRB);
								if (tuberculosis == 0) {
									tuberculosisVal = "N/A";
								} else if (tuberculosis == 1) {
									tuberculosisVal = "Continuous";
								} else if (tuberculosis == 2) {
									tuberculosisVal = "Intermittent";
								}
							}

							dirtAndDustRB = eElement.getElementsByTagName("DirtAndDust").item(0).getTextContent();
							if (dirtAndDustRB != null && !dirtAndDustRB.isEmpty()) {
								int dirtAndDust = Integer.parseInt(dirtAndDustRB);
								if (dirtAndDust == 0) {
									dirtAndDustVal = "N/A";
								} else if (dirtAndDust == 1) {
									dirtAndDustVal = "Continuous";
								} else if (dirtAndDust == 2) {
									dirtAndDustVal = "Intermittent";
								}

							}

							bloddBodyFluidsTissuesRB = eElement.getElementsByTagName("BloodBodyFluidsOrTissue").item(0)
									.getTextContent();
							if (bloddBodyFluidsTissuesRB != null && !bloddBodyFluidsTissuesRB.isEmpty()) {
								int bloddBodyFluidsTissues = Integer.parseInt(bloddBodyFluidsTissuesRB);
								if (bloddBodyFluidsTissues == 0) {
									bloddBodyFluidsTissuesVal = "N/A";
								} else if (bloddBodyFluidsTissues == 1) {
									bloddBodyFluidsTissuesVal = "Continuous";
								} else if (bloddBodyFluidsTissues == 2) {
									bloddBodyFluidsTissuesVal = "Intermittent";
								}
							}

							odorsRB = eElement.getElementsByTagName("Odors").item(0).getTextContent();
							if (odorsRB != null && !odorsRB.isEmpty()) {
								int odors = Integer.parseInt(odorsRB);
								if (odors == 0) {
									odorsVal = "N/A";
								} else if (odors == 1) {
									odorsVal = "Continuous";
								} else if (odors == 2) {
									odorsVal = "Intermittent";
								}
							}

							temperatureVariationsRB = eElement.getElementsByTagName("TemperatureVariations").item(0)
									.getTextContent();
							if (temperatureVariationsRB != null && !temperatureVariationsRB.isEmpty()) {
								int temperatureVariations = Integer.parseInt(temperatureVariationsRB);
								if (temperatureVariations == 0) {
									temperatureVariationsVal = "N/A";
								} else if (temperatureVariations == 1) {
									temperatureVariationsVal = "Continuous";
								} else if (temperatureVariations == 2) {
									temperatureVariationsVal = "Intermittent";
								}
							}

							noiseRB = eElement.getElementsByTagName("Noise").item(0).getTextContent();
							if (noiseRB != null && !noiseRB.isEmpty()) {
								int noise = Integer.parseInt(noiseRB);
								if (noise == 0) {
									noiseVal = "N/A";
								} else if (noise == 1) {
									noiseVal = "Continuous";
								} else if (noise == 2) {
									noiseVal = "Intermittent";
								}
							}

							radiologicalMaterialRB = eElement.getElementsByTagName("RadiologicalMaterials").item(0)
									.getTextContent();
							if (radiologicalMaterialRB != null && !radiologicalMaterialRB.isEmpty()) {
								int radiologicalMaterial = Integer.parseInt(radiologicalMaterialRB);
								if (radiologicalMaterial == 0) {
									radiologicalMaterialVal = "N/A";
								} else if (radiologicalMaterial == 1) {
									radiologicalMaterialVal = "Continuous";
								} else if (radiologicalMaterial == 2) {
									radiologicalMaterialVal = "Intermittent";
								}
							}

							mppPDComment = eElement.getElementsByTagName("mppPDComments").item(0).getTextContent()
									+ "\t";

							compServicesComment = eElement.getElementsByTagName("compServicesComments").item(0)
									.getTextContent() + "\t";

						}
					}
					dataMap = new LinkedHashMap<String, Object>();
					dataMap.put("EMP_ID", empId);
					dataMap.put("INCUMBENT_FIRST_NAME", firstName);
					dataMap.put("INCUMBENT_LAST_NAME", lastName);
					dataMap.put("EMP_RCD", empRCD);
					dataMap.put("SCO_POSITION", scoPosition);
					dataMap.put("CMS_POSITION", cmsPosition);
					dataMap.put("CLASSIFICATION", classification);
					dataMap.put("RANGE", range);
					dataMap.put("DEPARTMENT", department);
					dataMap.put("DEPT_ID", deptID);
					dataMap.put("WORKING_TITLE", workingTitle);
					dataMap.put("APPOINTMENT_TYPE", appointmentType);
					dataMap.put("FULL_TIME", Fulltime);
					dataMap.put("PART_TIME", Parttime);
					dataMap.put("CBID", cbid);

					Object dateInitiatedObj = null;
					if (dateInitiated != null && dateInitiated != "") {
						Date dateInitiatedNew = Date.valueOf(dateInitiated);
						dateInitiatedObj = dateInitiatedNew;
					}
					dataMap.put("DATE_INITIATED", dateInitiatedObj);
					dataMap.put("MANAGEMENT_SUPERVISOR", supervisor);
					dataMap.put("APPROPRIATE_ADMINISTRATOR", appropriateAdmin);

					dataMap.put("EXPLANATION1", explanation1);
					dataMap.put("EXPLANATION2", explanation2);
					dataMap.put("EXPLANATION3", explanation3);
					dataMap.put("EXPLANATION4", explanation4);
					dataMap.put("EXPLANATION5", explanation5);
					dataMap.put("EXPLANATION6", explanation6);
					dataMap.put("EXPLANATION7", explanation7);
					dataMap.put("EXPLANATION8", explanation8);
					dataMap.put("EXPLANATION9", explanation9);

					dataMap.put("COMPLIANCE_YES", complianceYes);
					dataMap.put("COMPLIANCE_NO", complianceNo);
					dataMap.put("DECISION_Yes", decisionYes);
					dataMap.put("DECISION_NO", decisionNo);

					dataMap.put("BENDING", bendingVal);
					dataMap.put("WALKING", walkingVal);
					dataMap.put("SQUATTING", squattingVal);
					dataMap.put("UNEVEN_WALK", unEvenWalkVal);
					dataMap.put("CRAWLING", crawlingVal);
					dataMap.put("LIFITING", liftingVal);
					dataMap.put("KNEELING", kneelingVal);
					dataMap.put("CLIMBING", climbingVal);
					dataMap.put("GRASPING", graspingVal);
					dataMap.put("PUSHING", pushingVal);
					dataMap.put("MOVEMENTS", movementsVal);
					dataMap.put("REACHING_OVERHEAD", reachingOverheadVal);
					dataMap.put("DISCRIMINATE_COLORS", discriminateColrsVal);
					dataMap.put("AUDITORY_REQUIREMENTS", auditoryRequirementsVal);
					dataMap.put("BALANCING", balancingVal);
					dataMap.put("WEARING_RESPIRATOR", wearingRespiratorVal);
					dataMap.put("SITTING", sittingVal);
					dataMap.put("DRIVER", driverVal);
					dataMap.put("STANDING", standingVal);
					dataMap.put("CHEMICAL_AGENTS", chemicalAgentsVal);
					dataMap.put("HEIGHTS", heightsVal);
					dataMap.put("TUBERCULOSIS", tuberculosisVal);
					dataMap.put("DIRT_AND_DUST", dirtAndDustVal);
					dataMap.put("BLOOD_TISSUES", bloddBodyFluidsTissuesVal);
					dataMap.put("ODORS", odorsVal);
					dataMap.put("TEMPERATURE_VARIATIONS", temperatureVariationsVal);
					dataMap.put("NOISE", noiseVal);
					dataMap.put("RADIOLOGICAL_MATERIALS", radiologicalMaterialVal);

					dataMap.put("MPP_PD_COMMENT", "  " + mppPDComment);
					dataMap.put("COMP_SERVICES_COMMENT", "  " + compServicesComment);

					dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
				}

				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					dbUtil.insertFormData(conn, dataMap, tableName, formName);
				}

			} catch (Exception e) {
				log.error("Exception from CSUFNewPositionManagerAuditCommentHistoryDB="
						+ Arrays.toString(e.getStackTrace()));

			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.error(
								"IOException from finally block for inputStream - CSUFNewPositionManagerAuditCommentHistoryDB="
										+ Arrays.toString(e.getStackTrace()));

					}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					log.error(
							"SQLException from finally block for connection - CSUFNewPositionManagerAuditCommentHistoryDB="
									+ Arrays.toString(e.getStackTrace()));

				}
			}

		}

	}

}
