package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedHashMap;
import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONObject;
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
import com.csuf.cloud.core.utils.DatabaseUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Cobra Final Notice Save in DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=CobraFinalNoticeDB" })
public class CobraFinalNoticeDB implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CobraFinalNoticeDB.class);

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;
		String tableName = "AEM_COBRA_FINAL_NOTICE";
		String formName = "COBRA Final Notice";
		DatabaseUtils dbUtil = new DatabaseUtils();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;
		String url = "https://myformstst.fullerton.edu/bin/dbSaveforCloud";
		String firstName = "";
		String lastName = "";
		String empId = "";
		String empRCD = "";
		String date = "";
		String Address = "";
		String city = "";
		String state = "";
		String zip = "";
		String Plan = "";
		String CobraCoverageDate = "";
		String endOfEmploymentChk = "";
		String endOfEmploymentdate = "";
		String reductionHourschk = "";
		String reductionHourdate = "";
		String DeathOfEmployee = "";
		String EmployeeDeath = "";
		String Divorse = "";
		String dateOfDivorse = "";
		String lossOfDepChild = "";
		String DepChildStatus = "";
		String dissolutionChk = "";
		String dissolutionDate = "";
		String Months = "";
		String EmployeeName1Chk = "";
		String EmployeeName1 = "";
		String spouseNameChk = "";
		String spouseName = "";
		String domesticPartnerNameChk = "";
		String domesticPartnerName = "";
		String dependentChildNameChk = "";
		String dependentChildName = "";
		String childNameChk = "";
		String childName = "";
		String cobraBegin = "";
		String cobraEnd = "";
		String Year = "";
		String healthPlan2 = "";
		String healthPlanPrice = "";
		String dentalPlan2 = "";
		String dentalPlanPrice = "";
		String vision2 = "";
		String visionPrice = "";
		String hcra2 = "";
		String hcraPrice = "";
		String coment1 = "";
		String coment2 = "";
		String comment = "";
		String contact = "";
		String replyBy = "";
		String plan1 = "";
		String dependentName1 = "";
		String dob1 = "";
		String relationshipToEmp1 = "";
		String ssn1 = "";
		String dependentName2 = "";
		String dob2 = "";
		String relationshipToEmp2 = "";
		String ssn2 = "";
		String dependentName3 = "";
		String dob3 = "";
		String relationshipToEmp3 = "";
		String ssn3 = "";
		String dependentName4 = "";
		String dob4 = "";
		String relationshipToEmp4 = "";
		String ssn4 = "";
		String dependentName5 = "";
		String dob5 = "";
		String relationshipToEmp5 = "";
		String ssn5 = "";
		String healthChk = "";
		String healthPlan4 = "";
		String VisionChk = "";
		String vision4 = "";
		String declineChk = "";
		String decline = "";
		String Dentalchk = "";
		String dentalPlan4 = "";
		String health1chk = "";
		String hcra4 = "";
		String medicarePartAYes = "";
		String medicarePartANo = "";
		String medicareentitlement = "";
		String signature = "";
		String electionDate = "";
		String printName = "";
		String relationToIndividual = "";
		String printAdd = "";
		String telNumber = "";
		String meidcalContact = "";
		String emailAddress = "";
		LinkedHashMap<String, Object> dataMap = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		/*String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);*/
		String wfInstanceID = workItem.getWorkflow().getId();

		while (xmlFiles.hasNext()) {
			Resource attachmentXml = xmlFiles.next();
			// log.info("xmlFiles inside ");
			String filePath = attachmentXml.getPath();

			if (filePath.contains("Data.xml")) {
				filePath = attachmentXml.getPath().concat("/jcr:content");
				Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
				try {
					is = subNode.getProperty("jcr:data").getBinary().getStream();
				} catch (ValueFormatException e) {
					log.error("ValueFormatException from COBRAFinalNoticeDB=" + Arrays.toString(e.getStackTrace()));
				} catch (PathNotFoundException e) {
					log.error("PathNotFoundException from COBRAFinalNoticeDB=" + Arrays.toString(e.getStackTrace()));
				} catch (RepositoryException e) {
					log.error("RepositoryException from COBRAFinalNoticeDB=" + Arrays.toString(e.getStackTrace()));
				}

				try {
					DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
					DocumentBuilder dBuilder = null;
					try {
						dBuilder = dbFactory.newDocumentBuilder();
					} catch (ParserConfigurationException e) {
						log.error("ParserConfigurationException from COBRAFinalNoticeDB="
								+ Arrays.toString(e.getStackTrace()));
					}
					try {
						doc = dBuilder.parse(is);
					} catch (IOException e) {
						log.error("IOException from COBRAFinalNoticeDB=" + Arrays.toString(e.getStackTrace()));
					}
					org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
					for (int temp = 0; temp < nList.getLength(); temp++) {
						org.w3c.dom.Node nNode = nList.item(temp);

						if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
							org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;
							empId = eElement.getElementsByTagName("Empl_ID").item(0).getTextContent();
							lastName = eElement.getElementsByTagName("Last_Name").item(0).getTextContent();
							firstName = eElement.getElementsByTagName("First_Name").item(0).getTextContent();
							empRCD = eElement.getElementsByTagName("EMPL_RCD").item(0).getTextContent();
							date = eElement.getElementsByTagName("Date_Initiated").item(0).getTextContent();
							Address = eElement.getElementsByTagName("Street_Address").item(0).getTextContent();
							city = eElement.getElementsByTagName("City").item(0).getTextContent();
							state = eElement.getElementsByTagName("State").item(0).getTextContent();
							zip = eElement.getElementsByTagName("Zip").item(0).getTextContent();
							Plan = eElement.getElementsByTagName("ThePlan").item(0).getTextContent();
							CobraCoverageDate = eElement.getElementsByTagName("EndOfCobraCoverageDate").item(0)
									.getTextContent();
							endOfEmploymentChk = eElement.getElementsByTagName("EndOfEmploymentChk").item(0)
									.getTextContent();

							endOfEmploymentdate = eElement.getElementsByTagName("EndOfEmploymentDate").item(0)
									.getTextContent();

							reductionHourschk = eElement.getElementsByTagName("ReductionHoursChk").item(0)
									.getTextContent();
							reductionHourdate = eElement.getElementsByTagName("ReductionHoursDate").item(0)
									.getTextContent();
							DeathOfEmployee = eElement.getElementsByTagName("DeathOfEmployeeChk").item(0)
									.getTextContent();
							EmployeeDeath = eElement.getElementsByTagName("DeathOfEmployeeDate").item(0)
									.getTextContent();
							Divorse = eElement.getElementsByTagName("DivorseChk").item(0).getTextContent();
							dateOfDivorse = eElement.getElementsByTagName("DivorceDate").item(0).getTextContent();
							lossOfDepChild = eElement.getElementsByTagName("LossOfDepChildStatusChk").item(0)
									.getTextContent();
							DepChildStatus = eElement.getElementsByTagName("LossOfDeptChildStatusDate").item(0)
									.getTextContent();
							dissolutionChk = eElement.getElementsByTagName("DissolutionChk").item(0).getTextContent();
							dissolutionDate = eElement.getElementsByTagName("DissolutionDate").item(0).getTextContent();
							Months = eElement.getElementsByTagName("months").item(0).getTextContent();
							EmployeeName1Chk = eElement.getElementsByTagName("EmployeeNameChk").item(0)
									.getTextContent();
							EmployeeName1 = eElement.getElementsByTagName("EmployeeName").item(0).getTextContent();
							spouseNameChk = eElement.getElementsByTagName("SpouseNameChk").item(0).getTextContent();
							spouseName = eElement.getElementsByTagName("SpouseName").item(0).getTextContent();
							domesticPartnerNameChk = eElement.getElementsByTagName("RegisteredDomesticPartnerNameChk")
									.item(0).getTextContent();
							domesticPartnerName = eElement.getElementsByTagName("RegisteredDomesticPartnerName").item(0)
									.getTextContent();
							dependentChildNameChk = eElement.getElementsByTagName("DependentChildNameChk").item(0)
									.getTextContent();
							dependentChildName = eElement.getElementsByTagName("DependentChildName").item(0)
									.getTextContent();
							childNameChk = eElement.getElementsByTagName("ChildNameChk").item(0).getTextContent();
							childName = eElement.getElementsByTagName("ChildName").item(0).getTextContent();
							cobraBegin = eElement.getElementsByTagName("CobraBegin").item(0).getTextContent();
							cobraEnd = eElement.getElementsByTagName("CobraEnds").item(0).getTextContent();
							Year = eElement.getElementsByTagName("HCRAYear").item(0).getTextContent();
							healthPlan2 = eElement.getElementsByTagName("HealthPlan2").item(0).getTextContent();
							healthPlanPrice = eElement.getElementsByTagName("HealthPlanPrice").item(0).getTextContent();
							dentalPlan2 = eElement.getElementsByTagName("DentalPlan2").item(0).getTextContent();
							dentalPlanPrice = eElement.getElementsByTagName("DentalPlanPrice").item(0).getTextContent();
							vision2 = eElement.getElementsByTagName("Vision2").item(0).getTextContent();
							visionPrice = eElement.getElementsByTagName("VisionPrice").item(0).getTextContent();
							hcra2 = eElement.getElementsByTagName("HCRA2").item(0).getTextContent();
							hcraPrice = eElement.getElementsByTagName("HCRAPrice").item(0).getTextContent();
							coment1 = eElement.getElementsByTagName("comment1").item(0).getTextContent();
							coment2 = eElement.getElementsByTagName("comment2").item(0).getTextContent();
							comment = eElement.getElementsByTagName("Comments").item(0).getTextContent();
							contact = eElement.getElementsByTagName("Contacts").item(0).getTextContent();
							replyBy = eElement.getElementsByTagName("ReplyBy").item(0).getTextContent();
							plan1 = eElement.getElementsByTagName("ThePlan1").item(0).getTextContent();
							dependentName1 = eElement.getElementsByTagName("DependentName1").item(0).getTextContent();
							dob1 = eElement.getElementsByTagName("DOB1").item(0).getTextContent();
							relationshipToEmp1 = eElement.getElementsByTagName("RelationshipToEmp1").item(0)
									.getTextContent();
							ssn1 = eElement.getElementsByTagName("SSN1").item(0).getTextContent();
							dependentName2 = eElement.getElementsByTagName("DependentName2").item(0).getTextContent();
							dob2 = eElement.getElementsByTagName("DOB2").item(0).getTextContent();
							relationshipToEmp2 = eElement.getElementsByTagName("RelationshipToEmp2").item(0)
									.getTextContent();
							ssn2 = eElement.getElementsByTagName("SSN2").item(0).getTextContent();
							dependentName3 = eElement.getElementsByTagName("DependentName3").item(0).getTextContent();
							dob3 = eElement.getElementsByTagName("DOB3").item(0).getTextContent();
							relationshipToEmp3 = eElement.getElementsByTagName("RelationshipToEmp3").item(0)
									.getTextContent();
							ssn3 = eElement.getElementsByTagName("SSN3").item(0).getTextContent();
							dependentName4 = eElement.getElementsByTagName("DependentName4").item(0).getTextContent();
							dob4 = eElement.getElementsByTagName("DOB4").item(0).getTextContent();
							relationshipToEmp4 = eElement.getElementsByTagName("RelationshipToEmp4").item(0)
									.getTextContent();
							ssn4 = eElement.getElementsByTagName("SSN4").item(0).getTextContent();
							dependentName5 = eElement.getElementsByTagName("DependentName5").item(0).getTextContent();
							dob5 = eElement.getElementsByTagName("DOB5").item(0).getTextContent();
							relationshipToEmp5 = eElement.getElementsByTagName("RelationshipToEmp5").item(0)
									.getTextContent();
							ssn5 = eElement.getElementsByTagName("SSN5").item(0).getTextContent();
							healthChk = eElement.getElementsByTagName("chkHealth").item(0).getTextContent();

							healthPlan4 = eElement.getElementsByTagName("HealthPlan4").item(0).getTextContent();

							VisionChk = eElement.getElementsByTagName("chkVision").item(0).getTextContent();

							vision4 = eElement.getElementsByTagName("Vision4").item(0).getTextContent();

							Dentalchk = eElement.getElementsByTagName("chkDental").item(0).getTextContent();

							dentalPlan4 = eElement.getElementsByTagName("DentalPlan4").item(0).getTextContent();

							health1chk = eElement.getElementsByTagName("chkHealth1").item(0).getTextContent();

							hcra4 = eElement.getElementsByTagName("HCRA4").item(0).getTextContent();

							declineChk = eElement.getElementsByTagName("chkDecline").item(0).getTextContent();

//							decline = eElement.getElementsByTagName("Decline")
//									.item(0).getTextContent();

							medicarePartAYes = eElement.getElementsByTagName("MedicarePartAEntitledYes").item(0)
									.getTextContent();
							medicarePartANo = eElement.getElementsByTagName("MedicarePartAEntitledNo").item(0)
									.getTextContent();
							medicareentitlement = eElement.getElementsByTagName("MedicareEntitlement").item(0)
									.getTextContent();
							signature = eElement.getElementsByTagName("Signature").item(0).getTextContent();
							electionDate = eElement.getElementsByTagName("ElectionDate").item(0).getTextContent();
							printName = eElement.getElementsByTagName("PrintName").item(0).getTextContent();
							relationToIndividual = eElement.getElementsByTagName("RelationshipToIndividual").item(0)
									.getTextContent();
							printAdd = eElement.getElementsByTagName("PrintAddress").item(0).getTextContent();
							telNumber = eElement.getElementsByTagName("TelephoneNumber").item(0).getTextContent();
							meidcalContact = eElement.getElementsByTagName("MedicalContactInfo").item(0)
									.getTextContent();
							emailAddress = eElement.getElementsByTagName("EmailAddress").item(0)
									.getTextContent();
						}
					}

					dataMap = new LinkedHashMap<String, Object>();

					dataMap.put("EMPL_ID", empId);
					dataMap.put("LAST_NAME", lastName);
					dataMap.put("FIRST_NAME", firstName);
					dataMap.put("EMPL_RCD", empRCD);
					Object dateObj = null;
					if (date != null && date != "") {
						Date dateNew = Date.valueOf(date);
						dateObj = dateNew;
					}
					dataMap.put("DATE_INITIATED", dateObj);

					dataMap.put("STREET_ADDRESS", Address);
					dataMap.put("CITY", city);
					dataMap.put("STATE", state);
					dataMap.put("ZIP", zip);
					dataMap.put("THE_PLAN", Plan);

					Object cobraCoverageDateObj = null;
					if (CobraCoverageDate != null && CobraCoverageDate != "") {
						Date cobraCoverageDateNew = Date.valueOf(CobraCoverageDate);
						cobraCoverageDateObj = cobraCoverageDateNew;
					}
					dataMap.put("END_OF_COBRA_COVERAGE_DATE", cobraCoverageDateObj);
					dataMap.put("END_OF_EMPLOYMENT_CHK", endOfEmploymentChk);

					Object employmentDateObj = null;
					if (endOfEmploymentdate != null && endOfEmploymentdate != "") {
						Date employmentDateNew = Date.valueOf(endOfEmploymentdate);
						employmentDateObj = employmentDateNew;
					}
					dataMap.put("END_OF_EMPLOYMENT_DATE", employmentDateObj);
					dataMap.put("REDUCTION_HOURS_CHK", reductionHourschk);
					

					Object reductionHourdateObj = null;
					if (reductionHourdate != null && reductionHourdate != "") {
						Date reductionHourdateNew = Date.valueOf(reductionHourdate);
						reductionHourdateObj = reductionHourdateNew;
					}
					dataMap.put("REDUCTION_HOURS_DATE", reductionHourdateObj);
					dataMap.put("DEATH_OF_EMPLOYEE_CHK", DeathOfEmployee);

					Object EmployeeDeathObj = null;
					if (EmployeeDeath != null && EmployeeDeath != "") {
						Date EmployeeDeathNew = Date.valueOf(EmployeeDeath);
						EmployeeDeathObj = EmployeeDeathNew;
					}
					dataMap.put("DEATH_OF_EMPLOYEE_DATE", EmployeeDeathObj);
					dataMap.put("DIVORSE_CHK", Divorse);

					Object dateOfDivorseObj = null;
					if (dateOfDivorse != null && dateOfDivorse != "") {
						Date dateOfDivorseNew = Date.valueOf(dateOfDivorse);
						dateOfDivorseObj = dateOfDivorseNew;
					}
					dataMap.put("DIVORSE_DATE", dateOfDivorseObj);
					dataMap.put("LOSS_OF_DEPCHILD_STATUS_CHK", lossOfDepChild);

					Object DepChildStatusObj = null;
					if (DepChildStatus != null && DepChildStatus != "") {
						Date DepChildStatusNew = Date.valueOf(DepChildStatus);
						DepChildStatusObj = DepChildStatusNew;
					}
					dataMap.put("LOSS_OF_DEPCHILD_STATUS_DATE", DepChildStatusObj);
					dataMap.put("DISSOLUTION_CHK", dissolutionChk);

					Object dissolutionDateObj = null;
					if (dissolutionDate != null && dissolutionDate != "") {
						Date dissolutionDateNew = Date.valueOf(dissolutionDate);
						dissolutionDateObj = dissolutionDateNew;
					}
					dataMap.put("DISSOLUTION_DATE", dissolutionDateObj);
					dataMap.put("MONTHS", Months);
					dataMap.put("EMPLOYEE_NAME_CHK", EmployeeName1Chk);
					dataMap.put("EMPLOYEE_NAME_NAME", EmployeeName1);
					dataMap.put("SPOUSE_NAME_CHK", spouseNameChk);
					dataMap.put("SPOUSE_NAME", spouseName);
					dataMap.put("PARTNER_NAME_CHK", domesticPartnerNameChk);
					dataMap.put("REDUCTION_HOURS_NAME", domesticPartnerName);
					dataMap.put("DEPENDENT_CHILD_NAME_CHK", dependentChildNameChk);
					dataMap.put("DEPENDENT_CHILD_NAME", dependentChildName);
					dataMap.put("CHILD_NAME_CHK", childNameChk);
					dataMap.put("CHILD_NAME", childName);

					Object cobraBeginObj = null;
					if (cobraBegin != null && cobraBegin != "") {
						Date cobraBeginNew = Date.valueOf(cobraBegin);
						cobraBeginObj = cobraBeginNew;
					}
					dataMap.put("COBRA_BEGIN", cobraBeginObj);

					Object cobraEndObj = null;
					if (cobraEnd != null && cobraEnd != "") {
						Date cobraEndNew = Date.valueOf(cobraEnd);
						cobraEndObj = cobraEndNew;
					}
					dataMap.put("COBRA_ENDS", cobraEndObj);
					dataMap.put("HCRA_YEAR", Year);
					dataMap.put("HEALTH_PLAN2", healthPlan2);
					dataMap.put("HEALTH_PLAN_PRICE", healthPlanPrice);
					dataMap.put("DENTAL_PLAN2", dentalPlan2);
					dataMap.put("DENTAL_PLAN_PRICE", dentalPlanPrice);
					dataMap.put("VISION2", vision2);
					dataMap.put("VISION_PRICE", visionPrice);
					dataMap.put("HCRA2", hcra2);
					dataMap.put("HCRA_PRICE", hcraPrice);
					dataMap.put("COMMENT1", coment1);
					dataMap.put("COMMENT2", coment2);
					dataMap.put("COMMENTS", comment);
					dataMap.put("CONTACTS", contact);

					Object replyByObj = null;
					if (replyBy != null && replyBy != "") {
						Date replyByNew = Date.valueOf(replyBy);
						replyByObj = replyByNew;
					}
					dataMap.put("REPLY_BY", replyByObj);
					dataMap.put("THE_PLAN1", plan1);
					dataMap.put("DEPENDENT_NAME1", dependentName1);

					Object dob1Obj = null;
					if (dob1 != null && dob1 != "") {
						Date dob1New = Date.valueOf(dob1);
						dob1Obj = dob1New;
					}
					dataMap.put("DOB1", dob1Obj);
					dataMap.put("RELATIONSHIP_TO_EMP1", relationshipToEmp1);
					dataMap.put("SSN1", ssn1);
					dataMap.put("DEPENDENT_NAME2", dependentName2);

					Object dob2Obj = null;
					if (dob2 != null && dob2 != "") {
						Date dob2New = Date.valueOf(dob2);
						dob2Obj = dob2New;
					}
					dataMap.put("DOB2", dob2Obj);
					dataMap.put("RELATIONSHIP_TO_EMP2", relationshipToEmp2);
					dataMap.put("SSN2", ssn2);
					dataMap.put("DEPENDENT_NAME3", dependentName3);

					Object dob3Obj = null;
					if (dob3 != null && dob3 != "") {
						Date dob3New = Date.valueOf(dob3);
						dob3Obj = dob3New;
					}
					dataMap.put("DOB3", dob3Obj);
					dataMap.put("RELATIONSHIP_TO_EMP3", relationshipToEmp3);
					dataMap.put("SSN3", ssn3);
					dataMap.put("DEPENDENT_NAME4", dependentName4);

					Object dob4Obj = null;
					if (dob4 != null && dob4 != "") {
						Date dob4New = Date.valueOf(dob4);
						dob4Obj = dob4New;
					}
					dataMap.put("DOB4", dob4Obj);
					dataMap.put("RELATIONSHIP_TO_EMP4", relationshipToEmp4);
					dataMap.put("SSN4", ssn4);
					dataMap.put("DEPENDENT_NAME5", dependentName5);

					Object dob5Obj = null;
					if (dob5 != null && dob5 != "") {
						Date dob5New = Date.valueOf(dob5);
						dob5Obj = dob5New;
					}
					dataMap.put("DOB5", dob5Obj);
					dataMap.put("RELATIONSHIP_TO_EMP5", relationshipToEmp5);
					dataMap.put("SSN5", ssn5);
					dataMap.put("CHK_HEALTH", healthChk);
					dataMap.put("HEALTH_PLAN4", healthPlan4);
					dataMap.put("CHK_VISION", VisionChk);
					dataMap.put("VISION4", vision4);
					dataMap.put("CHK_DECLINE", declineChk);
					// dataMap.put("DECLINE", decline);
					dataMap.put("CHK_DENTAL", Dentalchk);
					dataMap.put("DETANL_PLAN4", dentalPlan4);
					dataMap.put("CHK_HEALTH1", health1chk);
					dataMap.put("HCRA4", hcra4);
					dataMap.put("MEDICARE_PART_ENTITLED_YES_CHK", medicarePartAYes);
					dataMap.put("MEDICARE_PART_ENTITLED_NO_CHK", medicarePartANo);
					dataMap.put("MEDICARE_ENTITLEMENT", medicareentitlement);
					dataMap.put("SIGNATURE", signature);

					Object electionDateObj = null;
					if (electionDate != null && electionDate != "") {
						Date electionDateNew = Date.valueOf(electionDate);
						electionDateObj = electionDateNew;
					}
					dataMap.put("ELECTION_DATE", electionDateObj);
					dataMap.put("PRINT_NAME", printName);
					dataMap.put("RELATIONSHIP_TO_INDIVIDUAL", relationToIndividual);
					dataMap.put("PRINT_ADDRESS", printAdd);
					dataMap.put("TELEPHONE_NUMBER", telNumber);
					dataMap.put("MEDICAL_CONTACT_INFO", meidcalContact);
					dataMap.put("EMAIL_ADDRESS", emailAddress);
					dataMap.put("WORKFLOW_INSTANCE_ID", wfInstanceID);

					/*if (conn != null) {
						dbUtil.insertFormData(conn, dataMap, tableName, formName);
					}*/
					
					JSONObject json = new JSONObject();
					json.put("DB_CONNECTION", "AEMDBDEV");
					json.put("TABLE_NAME", tableName);
					json.put("FORM_NAME", formName);
					json.put("UNIQUE_FIELD", empId);
					json.put("UNIQUE_FIELD_COLUMN", "EMPL_ID");
					json.put("WORKFLOW_INSTANCE_ID", wfInstanceID);
					json.put("DATA_MAP", dataMap);
					json.put("DATE_FIELDS", "DATE_INITIATED,END_OF_COBRA_COVERAGE_DATE,END_OF_EMPLOYMENT_DATE,REDUCTION_HOURS_DATE,DEATH_OF_EMPLOYEE_DATE,DIVORSE_DATE,LOSS_OF_DEPCHILD_STATUS_DATE");

					log.error("Testing: =" + json.toString());

					String dbServiceUrl = url;

					CloseableHttpClient client = HttpClients.createDefault();
					HttpPost post = new HttpPost(dbServiceUrl);
					post.addHeader("Content-Type", "application/json");
					post.setEntity(new StringEntity(json.toString()));

					CloseableHttpResponse response = client.execute(post);
					log.info("DB Service Response: =" + response.getStatusLine());
					client.close();
					

				} catch (SAXException e) {
					log.error("SAXException from COBRAFinalNoticeDB=" + Arrays.toString(e.getStackTrace()));
				} catch (Exception e) {
					log.error("Exception from COBRAFinalNoticeDB=" + Arrays.toString(e.getStackTrace()));
				} finally {
					try {
						is.close();
					} catch (IOException e) {
						log.error("IOException from COBRAFinalNoticeDB=" + Arrays.toString(e.getStackTrace()));
					}
					if (conn != null) {
						try {
							conn.close();
						} catch (SQLException e) {
							log.error("SQLException from Finally Block from COBRAFinalNoticeDB="
									+ Arrays.toString(e.getStackTrace()));
						}
					}
				}

			}
		}

	}

}
