package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.LinkedHashMap;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=CSUF New Position Staff DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=CSUFNewPositionStaffDB" })
public class CSUFNewPositionStaffDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CSUFNewPositionStaffDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		// DatabaseUtils dbUtil = new DatabaseUtils();
		Document doc = null;
		InputStream is = null;
		String workflowInstanceID = "";
		String reqNo = "";
		String initials = "";
		String hRDate = "";
		String approvedClassification = "";
		String empId = "";
		String chrsId = "";
		String firstName = "";
		String lastName = "";
		String empRCD = "";
		String scoPosition = "";
		String cmsPosition = "";
		String classification = "";
		String range = "";
		String department = "";
		String deptID = "";
		String appointmentType = "";
		String timeBase = "";
		String cbid = "";
		String dateInitiated = "";
		String supervisor = "";
		String appropriateAdmin = "";
		String explanation1 = "";
		String explanation2 = "";
		String explanation3 = "";
		String incumbentOverseeWorkOthers = "";
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
		String responsibilityYes = "";
		String responsibilityNo = "";

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
		String incumbentSignature = "";
		String incumbentDate = "";
		String incumbmentComment = "";
		String deptHeadSignature = "";
		String deptHeadDate = "";
		String deptHeadComment = "";
		String appropriateAdministratorSignature = "";
		String appropriateAdministratorDate = "";
		String appropriateAdministratorComment = "";
		String managerSupervisorSignature = "";
		String managerSupervisorDate = "";
		String managerSupervisorComment = "";

		LinkedHashMap<String, Object> dataMap = null;
		// LinkedHashMap<String, Object> dataMapStudentInfo = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		// conn = jdbcConnectionService.getAemDEVDBConnection();

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		log.info("DataSourceVal==========" + dataSourceVal);
		conn = jdbcConnectionService.getDBConn(dataSourceVal);
		log.info("Connection==========" + conn);

		if (conn != null) {
			while (xmlFiles.hasNext()) {
				workflowInstanceID = workItem.getWorkflow().getId();
				Resource attachmentXml = xmlFiles.next();
				// log.info("xmlFiles inside ");
				String filePath = attachmentXml.getPath();

				log.info("filePath= " + filePath);
				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					log.info("xmlFiles=" + filePath);
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
					} catch (ValueFormatException e2) {
						log.error("Exception1=" + e2.getMessage());
						e2.printStackTrace();
					} catch (PathNotFoundException e2) {
						log.error("Exception2=" + e2.getMessage());
						e2.printStackTrace();
					} catch (RepositoryException e2) {
						log.error("Exception3=" + e2.getMessage());
						e2.printStackTrace();
					}
					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.info("ParserConfigurationException=" + e1);
							e1.printStackTrace();
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.info("IOException=" + e1);
							e1.printStackTrace();
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;

								empId = eElement.getElementsByTagName("EmplID").item(0).getTextContent();
								chrsId = eElement.getElementsByTagName("CHRSID").item(0).getTextContent();
								firstName = eElement.getElementsByTagName("IncumbentFirstName").item(0)
										.getTextContent();
								lastName = eElement.getElementsByTagName("IncumbentLastName").item(0).getTextContent();
								empRCD = eElement.getElementsByTagName("EmplRCD").item(0).getTextContent();
								scoPosition = eElement.getElementsByTagName("SCOPosition").item(0).getTextContent();
								cmsPosition = eElement.getElementsByTagName("CMSPosition").item(0).getTextContent();
								classification = eElement.getElementsByTagName("Classification").item(0)
										.getTextContent();
								range = eElement.getElementsByTagName("Range").item(0).getTextContent();
								department = eElement.getElementsByTagName("Department").item(0).getTextContent();
								deptID = eElement.getElementsByTagName("DeptID").item(0).getTextContent();
								appointmentType = eElement.getElementsByTagName("AppointmentType").item(0)
										.getTextContent();
								timeBase = eElement.getElementsByTagName("TimebaseRB").item(0).getTextContent();
								cbid = eElement.getElementsByTagName("CBID").item(0).getTextContent();
								dateInitiated = eElement.getElementsByTagName("DateInitiated").item(0).getTextContent();
								supervisor = eElement.getElementsByTagName("ManagementSupervisor").item(0)
										.getTextContent();
								appropriateAdmin = eElement.getElementsByTagName("AppropriateAdministrator").item(0)
										.getTextContent();

								explanation1 = eElement.getElementsByTagName("Explanation1").item(0).getTextContent();
								explanation2 = eElement.getElementsByTagName("Explanation2").item(0).getTextContent();
								explanation3 = eElement.getElementsByTagName("Explanation3").item(0).getTextContent();
								incumbentOverseeWorkOthers = eElement
										.getElementsByTagName("IncumbentOverseeWorkForOthers").item(0).getTextContent();
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
								responsibilityYes = eElement.getElementsByTagName("ResponsibilityYes").item(0)
										.getTextContent();
								responsibilityNo = eElement.getElementsByTagName("ResponsibilityNo").item(0)
										.getTextContent();

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

								chemicalAgentsRB = eElement.getElementsByTagName("ChemicalAgents").item(0)
										.getTextContent();
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

								bloddBodyFluidsTissuesRB = eElement.getElementsByTagName("BloodBodyFluidsOrTissue")
										.item(0).getTextContent();
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

								incumbentSignature = eElement.getElementsByTagName("IncumbentSignature").item(0)
										.getTextContent();

								incumbentDate = eElement.getElementsByTagName("IncumbentDate").item(0).getTextContent();

								incumbmentComment = eElement.getElementsByTagName("IncumbentComments").item(0)
										.getTextContent();

								managerSupervisorSignature = eElement.getElementsByTagName("DeptHiringManagerSignature")
										.item(0).getTextContent();

								managerSupervisorDate = eElement.getElementsByTagName("DeptHiringManagerDate").item(0)
										.getTextContent();

								managerSupervisorComment = eElement.getElementsByTagName("DeptHiringManagerComments")
										.item(0).getTextContent();

								deptHeadSignature = eElement.getElementsByTagName("DeptHeadSignature").item(0)
										.getTextContent();

								deptHeadDate = eElement.getElementsByTagName("DeptHeadDate").item(0).getTextContent();

								deptHeadComment = eElement.getElementsByTagName("DeptHeadComments").item(0)
										.getTextContent();

								appropriateAdministratorSignature = eElement
										.getElementsByTagName("AppropriateAdministratorSignature").item(0)
										.getTextContent();

								appropriateAdministratorDate = eElement
										.getElementsByTagName("AppropriateAdministratorDate").item(0).getTextContent();

								appropriateAdministratorComment = eElement
										.getElementsByTagName("AppropriateAdministratorComments").item(0)
										.getTextContent();

								reqNo = eElement.getElementsByTagName("ReqNo").item(0).getTextContent();

								initials = eElement.getElementsByTagName("Initials").item(0).getTextContent();

								hRDate = eElement.getElementsByTagName("HRDate").item(0).getTextContent();

								approvedClassification = eElement.getElementsByTagName("ApprovedClassification").item(0)
										.getTextContent();

								dataMap = new LinkedHashMap<String, Object>();

								dataMap.put("EMP_ID", empId);
								dataMap.put("CHRSID", chrsId);
								dataMap.put("INCUMBENT_FIRST_NAME", firstName);
								dataMap.put("INCUMBENT_LAST_NAME", lastName);
								dataMap.put("EMP_RCD", empRCD);
								dataMap.put("SCO_POSITION", scoPosition);
								dataMap.put("CMS_POSITION", cmsPosition);
								dataMap.put("CLASSIFICATION", classification);
								dataMap.put("RANGE", range);
								dataMap.put("DEPARTMENT", department);
								dataMap.put("DEPT_ID", deptID);
								dataMap.put("APPOINTMENT_TYPE", appointmentType);
								dataMap.put("TIME_BASE", timeBase);
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
								dataMap.put("INCUMBENT_WORK", incumbentOverseeWorkOthers);
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
								dataMap.put("DECISION_Yes", responsibilityYes);
								dataMap.put("DECISION_NO", responsibilityNo);

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
								log.info("DB Details are=", dataMap);
								dataMap.put("INCUMBENT_SIGNATURE", incumbentSignature);

								Object incumbentDateObj = null;
								if (incumbentDate != null && incumbentDate != "") {
									Date incumbentDateNew = Date.valueOf(incumbentDate);
									incumbentDateObj = incumbentDateNew;
								}
								dataMap.put("INCUMBENT_DATE", incumbentDateObj);
								dataMap.put("INCUMBENT_COMMENT", incumbmentComment);
								dataMap.put("MANAGER_SUPERVISOR_SIGN", managerSupervisorSignature);

								Object managerSupervisorDateObj = null;
								if (managerSupervisorDate != null && managerSupervisorDate != "") {
									Date adminDateNew = Date.valueOf(managerSupervisorDate);
									managerSupervisorDateObj = adminDateNew;
								}
								dataMap.put("MANAGER_SUPERVISOR_DATE", managerSupervisorDateObj);
								dataMap.put("MANAGER_SUPERVISOR_COMMENT", managerSupervisorComment);

								dataMap.put("DEPT_HEAD_SIGN", deptHeadSignature);

								Object deptHeadDateDateObj = null;
								if (deptHeadDate != null && deptHeadDate != "") {
									Date deptHeadDateNew = Date.valueOf(deptHeadDate);
									deptHeadDateDateObj = deptHeadDateNew;
								}
								dataMap.put("DEPT_HEAD_DATE", deptHeadDateDateObj);
								dataMap.put("DEPT_HEAD_COMMENT", deptHeadComment);

								dataMap.put("APPR_ADMIN_SIGNATURE", appropriateAdministratorSignature);

								Object appropriateAdministratorDateObj = null;
								if (appropriateAdministratorDate != null && appropriateAdministratorDate != "") {
									Date appropriateAdministratorDateNew = Date.valueOf(appropriateAdministratorDate);
									appropriateAdministratorDateObj = appropriateAdministratorDateNew;
								}
								dataMap.put("ADMIN_DATE", appropriateAdministratorDateObj);
								dataMap.put("ADMIN_COMMENT", appropriateAdministratorComment);
								dataMap.put("REQ_NO", reqNo);
								dataMap.put("INITIALS", initials);
								log.info("ALL DB Details are=", dataMap);

								Object hRDateObj = null;
								if (hRDate != null && hRDate != "") {
									Date hRDateNew = Date.valueOf(hRDate);
									hRDateObj = hRDateNew;
								}
								dataMap.put("HR_DATE", hRDateObj);
								dataMap.put("APPROVED_CLASSIFICATION", approvedClassification);

								dataMap.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

								insertNewPositionStaffFormData(conn, dataMap);
							}
						}

					} catch (SAXException e) {
						log.error("SAXException=" + e.getMessage());
						e.printStackTrace();
					} catch (Exception e) {
						log.error("Exception=" + e.getMessage());
						e.printStackTrace();
					}
				}
			}
		}
	}

	/**
	 * 
	 * @param conn
	 * @param dataMap
	 */

	public void insertNewPositionStaffFormData(Connection conn, LinkedHashMap<String, Object> dataMap) {
		PreparedStatement preparedStmt = null;
		log.error("Inside INSERT FORM DATA Method");
		if (conn != null) {
			try {
				conn.setAutoCommit(false);
			} catch (SQLException e1) {
				log.error("SQLException=" + e1.getMessage());
				e1.printStackTrace();
			}
			String tableName = "AEM_NEW_POSITION_STAFF";
			StringBuilder sql = new StringBuilder("INSERT INTO  ").append(tableName).append(" (");
			StringBuilder placeholders = new StringBuilder();
			for (Iterator<String> iter = dataMap.keySet().iterator(); iter.hasNext();) {
				sql.append(iter.next());
				placeholders.append("?");
				if (iter.hasNext()) {
					sql.append(",");
					placeholders.append(",");
				}
			}
			sql.append(") VALUES (").append(placeholders).append(")");
			log.error("SQL===============" + sql.toString());
			try {
				preparedStmt = conn.prepareStatement(sql.toString());
			} catch (SQLException e1) {
				log.error("SQLException=" + e1.getMessage());
				e1.printStackTrace();
			}
			int i = 0;
			log.info("Datamap values=" + dataMap.values());
			for (Object value : dataMap.values()) {
				try {
					if (value instanceof Date) {
						preparedStmt.setDate(++i, (Date) value);
					} else if (value instanceof Integer) {
						preparedStmt.setInt(++i, (Integer) value);
					} else {
						if (value != "" && value != null) {
							preparedStmt.setString(++i, value.toString());
						} else {
							preparedStmt.setString(++i, null);
						}
					}
				} catch (SQLException e) {
					log.error("SQLException=" + e.getMessage());
					e.printStackTrace();
				}
			}
			try {
				log.info("Before AEM_NEW_POSITION_STAFF");
				preparedStmt.execute();
				conn.commit();
				log.info("After AEM_NEW_POSITION_STAFF");
			} catch (SQLException e1) {
				log.error("SQLException=" + e1.getMessage());
				e1.printStackTrace();
			} finally {
				if (preparedStmt != null) {
					try {
						preparedStmt.close();
						log.info("preparedstmt closed");
						// conn.close();
					} catch (SQLException e) {
						log.error("SQLException=" + e.getMessage());
						e.printStackTrace();
					}
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
