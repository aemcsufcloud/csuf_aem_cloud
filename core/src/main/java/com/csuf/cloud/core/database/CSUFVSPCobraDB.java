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
		"process.label=VSPCobraDB" })

public class CSUFVSPCobraDB implements WorkflowProcess {

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	private static final Logger log = LoggerFactory.getLogger(CSUFVSPCobraDB.class);

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;
		String tableName = "AEM_VSP_COBRA";
		String formName = "VSP Cobra";
		String groupName = "";
		String ssn = "";
		String firstName = "";
		String dateQualifingEvent = "";
		String dateCoverageBegins = "";
		String qualifingEvent1 = "";
		String qualifingEvent2 = "";
		String qualifingEvent3 = "";
		String qualifingEvent4 = "";
		String qualifingEvent5 = "";
		String qualifingEvent6 = "";
		String qualifingEvent7 = "";
		String qualifingEvent8 = "";
		String monthcoverage18 = "";
		String monthcoverage29 = "";
		String monthcoverage36 = "";
		String lastName = "";
		String middleInitial = "";
		String birthDate = "";
		String streetAddress = "";
		String city = "";
		String state = "";
		String zipCode = "";
		String currentEmpLastName = "";
		String currentEmpFirstName = "";
		String currentEmpMiddleInitial = "";
		String curEmpSSN = "";
		String relationshiptoApplicant = "";
		String familyMemName1 = "";
		String familyMemberSSN1 = "";
		String familyMemberBirthdate1 = "";
		String familyMembemRel1 = "";
		String familyMemName2 = "";
		String familyMemberSSN2 = "";
		String familyMemberBirthdate2 = "";
		String familyMembemRel2 = "";
		String familyMemName3 = "";
		String familyMemberSSN3 = "";
		String familyMemberBirthdate3 = "";
		String familyMembemRel3 = "";
		String familyMemName4 = "";
		String familyMemberSSN4 = "";
		String familyMemberBirthdate4 = "";
		String familyMembemRel4 = "";
		String familyMemName5 = "";
		String familyMemberSSN5 = "";
		String familyMemberBirthdate5 = "";
		String familyMembemRel5 = "";
		String familyMemName6 = "";
		String familyMemberSSN6 = "";
		String familyMemberBirthdate6 = "";
		String familyMembemRel6 = "";

		String signatureofCOBRAApplicant = "";
		String daytimeTelephoneNumber = "";
		String cobraSignDate = "";
		String signatureofBenefitsRepresentative = "";
		String campus = "";
		String benefitsSignDate = "";
		LinkedHashMap<String, Object> dataMap = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

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
							groupName = eElement.getElementsByTagName("GroupName").item(0).getTextContent();
							ssn = eElement.getElementsByTagName("SSN").item(0).getTextContent();
							firstName = eElement.getElementsByTagName("FirstName").item(0).getTextContent();
							dateQualifingEvent = eElement.getElementsByTagName("DateQualifingEvent").item(0)
									.getTextContent();
							dateCoverageBegins = eElement.getElementsByTagName("DateCoverageBegins").item(0)
									.getTextContent();
							qualifingEvent1 = eElement.getElementsByTagName("Disabledonthedateofqualifyingevent")
									.item(0).getTextContent();
							qualifingEvent2 = eElement.getElementsByTagName("Reductionofhours").item(0)
									.getTextContent();
							qualifingEvent3 = eElement.getElementsByTagName("Legalseparationordivorse").item(0)
									.getTextContent();
							qualifingEvent4 = eElement.getElementsByTagName("Retiree").item(0).getTextContent();
							qualifingEvent5 = eElement
									.getElementsByTagName("DissolutionofRegisteredDomesticPartnership").item(0)
									.getTextContent();
							qualifingEvent6 = eElement.getElementsByTagName("SurvivingDependentsWidow").item(0)
									.getTextContent();
							qualifingEvent7 = eElement.getElementsByTagName("Lossofchildsdependentstatus").item(0)
									.getTextContent();
							qualifingEvent8 = eElement.getElementsByTagName("Terminationofemployment").item(0)
									.getTextContent();
							monthcoverage18 = eElement.getElementsByTagName("monthcoverage18").item(0).getTextContent();
							monthcoverage29 = eElement.getElementsByTagName("monthcoverage29").item(0).getTextContent();
							monthcoverage36 = eElement.getElementsByTagName("monthcoverage36").item(0).getTextContent();
							lastName = eElement.getElementsByTagName("LastName").item(0).getTextContent();
							middleInitial = eElement.getElementsByTagName("MiddleInitial").item(0).getTextContent();

							birthDate = eElement.getElementsByTagName("BirthDate").item(0).getTextContent();

							streetAddress = eElement.getElementsByTagName("StreetAddress").item(0).getTextContent();

							city = eElement.getElementsByTagName("City").item(0).getTextContent();

							state = eElement.getElementsByTagName("State").item(0).getTextContent();

							zipCode = eElement.getElementsByTagName("ZipCode").item(0).getTextContent();

							currentEmpLastName = eElement.getElementsByTagName("CurEmpLastName").item(0)
									.getTextContent();

							currentEmpFirstName = eElement.getElementsByTagName("CurEmpFirstName").item(0)
									.getTextContent();

							currentEmpMiddleInitial = eElement.getElementsByTagName("CurEmpMiddleInitial").item(0)
									.getTextContent();

							curEmpSSN = eElement.getElementsByTagName("SSNEmp").item(0).getTextContent();

							relationshiptoApplicant = eElement.getElementsByTagName("RelationshiptoApplicant").item(0)
									.getTextContent();

							familyMemName1 = eElement.getElementsByTagName("FamilyMemName1").item(0).getTextContent();

							familyMemberSSN1 = eElement.getElementsByTagName("FamilyMemberSSN1").item(0)
									.getTextContent();

							familyMemberBirthdate1 = eElement.getElementsByTagName("FamilyMemberBirthdate1").item(0)
									.getTextContent();

							familyMembemRel1 = eElement.getElementsByTagName("FamilyMembemRel1").item(0)
									.getTextContent();

							familyMemName2 = eElement.getElementsByTagName("FamilyMemName2").item(0).getTextContent();

							familyMemberSSN2 = eElement.getElementsByTagName("FamilyMemberSSN2").item(0)
									.getTextContent();

							familyMemberBirthdate2 = eElement.getElementsByTagName("FamilyMemberBirthdate2").item(0)
									.getTextContent();

							familyMembemRel2 = eElement.getElementsByTagName("FamilyMembemRel2").item(0)
									.getTextContent();

							familyMemName3 = eElement.getElementsByTagName("FamilyMemName3").item(0).getTextContent();

							familyMemberSSN3 = eElement.getElementsByTagName("FamilyMemberSSN3").item(0)
									.getTextContent();

							familyMemberBirthdate3 = eElement.getElementsByTagName("FamilyMemberBirthdate3").item(0)
									.getTextContent();

							familyMembemRel3 = eElement.getElementsByTagName("FamilyMembemRel3").item(0)
									.getTextContent();
							familyMemName4 = eElement.getElementsByTagName("FamilyMemName4").item(0).getTextContent();

							familyMemberSSN4 = eElement.getElementsByTagName("FamilyMemberSSN4").item(0)
									.getTextContent();

							familyMemberBirthdate4 = eElement.getElementsByTagName("FamilyMemberBirthdate4").item(0)
									.getTextContent();

							familyMembemRel4 = eElement.getElementsByTagName("FamilyMembemRel4").item(0)
									.getTextContent();
							familyMemName5 = eElement.getElementsByTagName("FamilyMemName5").item(0).getTextContent();

							familyMemberSSN5 = eElement.getElementsByTagName("FamilyMemberSSN5").item(0)
									.getTextContent();

							familyMemberBirthdate5 = eElement.getElementsByTagName("FamilyMemberBirthdate5").item(0)
									.getTextContent();

							familyMembemRel5 = eElement.getElementsByTagName("FamilyMembemRel5").item(0)
									.getTextContent();

							familyMemName6 = eElement.getElementsByTagName("FamilyMemName6").item(0).getTextContent();

							familyMemberSSN6 = eElement.getElementsByTagName("FamilyMemberSSN6").item(0)
									.getTextContent();

							familyMemberBirthdate6 = eElement.getElementsByTagName("FamilyMemberBirthdate6").item(0)
									.getTextContent();

							familyMembemRel6 = eElement.getElementsByTagName("FamilyMembemRel6").item(0)
									.getTextContent();

							signatureofCOBRAApplicant = eElement.getElementsByTagName("SignatureofCOBRAApplicant")
									.item(0).getTextContent();

							daytimeTelephoneNumber = eElement.getElementsByTagName("DaytimeTelephoneNumber").item(0)
									.getTextContent();

							cobraSignDate = eElement.getElementsByTagName("CobraSignDate").item(0).getTextContent();

							signatureofBenefitsRepresentative = eElement
									.getElementsByTagName("SignatureofBenefitsRepresentative").item(0).getTextContent();
							campus = eElement.getElementsByTagName("Campus").item(0).getTextContent();

							benefitsSignDate = eElement.getElementsByTagName("BenefitsSignDate").item(0)
									.getTextContent();

						}
					}

					dataMap = new LinkedHashMap<String, Object>();
					dataMap.put("SSN", ssn);
					dataMap.put("GROUP_NAME", groupName);
					dataMap.put("FIRST_NAME", firstName);
					dataMap.put("LAST_NAME", lastName);

					dataMap.put("MIDDLE_INITIAL", middleInitial);

					Object dateQualifyEvtObj = null;
					if (dateQualifingEvent != null && dateQualifingEvent != "") {
						Date dateQualifingEventNew = Date.valueOf(dateQualifingEvent);
						dateQualifyEvtObj = dateQualifingEventNew;
					}
					dataMap.put("DATE_QUALIFING_EVENT", dateQualifyEvtObj);

					Object dateCoverageObj = null;
					if (dateCoverageBegins != null && dateCoverageBegins != "") {
						Date dateCoverageBeginsNew = Date.valueOf(dateCoverageBegins);
						dateCoverageObj = dateCoverageBeginsNew;
					}
					dataMap.put("DATE_COVERAGE_BEGINS", dateCoverageObj);

					dataMap.put("DISABLED_DAY_QUALIFYING", qualifingEvent1);
					dataMap.put("REDUCTION_OF_HOURS", qualifingEvent2);
					dataMap.put("LEGAL_SEPARATION", qualifingEvent3);
					dataMap.put("RETIREE", qualifingEvent4);
					dataMap.put("DISSOLUTION_PARTNERSHIP", qualifingEvent5);
					dataMap.put("SURVIVING_DEP_WIDOW", qualifingEvent6);
					dataMap.put("LOSS_OF_CHILDS_STATUS", qualifingEvent7);
					dataMap.put("TERMINATION_EMPLOYMENT", qualifingEvent8);

					dataMap.put("MONTH_COVERAGE_18", monthcoverage18);
					dataMap.put("MONTH_COVERAGE_29", monthcoverage29);
					dataMap.put("MONTH_COVERAGE_36", monthcoverage36);

					Object birthDateObj = null;
					if (birthDate != null && birthDate != "") {
						Date birtDateNew = Date.valueOf(birthDate);
						birthDateObj = birtDateNew;
					}

					dataMap.put("BIRTH_DATE", birthDateObj);
					dataMap.put("STREET_ADDRESS", streetAddress);
					dataMap.put("CITY", city);
					dataMap.put("STATE", state);
					dataMap.put("ZIP_CODE", zipCode);

					dataMap.put("CURRENT_EMP_LAST_NAME", currentEmpLastName);
					dataMap.put("CURRENT_EMP_FIRST_NAME", currentEmpFirstName);
					dataMap.put("CURRENT_EMP_MIDDLE_INITIAL", currentEmpMiddleInitial);
					dataMap.put("CURRENT_EMP_SSN", curEmpSSN);
					dataMap.put("RELATIONSHIP_APPLICANT", relationshiptoApplicant);
					
					Object familybirthDateObj1 = null;
					if (familyMemberBirthdate1 != null && familyMemberBirthdate1 != "") {
						Date familyMemberBirthdateNew1 = Date.valueOf(familyMemberBirthdate1);
						familybirthDateObj1 = familyMemberBirthdateNew1;
					}

					dataMap.put("DEP_FAMILY_MEMBER_NAME1", familyMemName1);
					dataMap.put("DEP_FAMILY_MEMBER_SSN1", familyMemberSSN1);
					dataMap.put("DEP_FAMILY_BIRTHDATE1", familybirthDateObj1);
					dataMap.put("DEP_FAMILY_RELATION1", familyMembemRel1);

					dataMap.put("DEP_FAMILY_MEMBER_NAME2", familyMemName2);
					dataMap.put("DEP_FAMILY_MEMBER_SSN2", familyMemberSSN2);
					dataMap.put("DEP_FAMILY_BIRTHDATE2", familyMemberBirthdate2);
					dataMap.put("DEP_FAMILY_RELATION2", familyMembemRel2);

					dataMap.put("DEP_FAMILY_MEMBER_NAME3", familyMemName3);
					dataMap.put("DEP_FAMILY_MEMBER_SSN3", familyMemberSSN3);
					dataMap.put("DEP_FAMILY_BIRTHDATE3", familyMemberBirthdate3);
					dataMap.put("DEP_FAMILY_RELATION3", familyMembemRel3);

					dataMap.put("DEP_FAMILY_MEMBER_NAME4", familyMemName4);
					dataMap.put("DEP_FAMILY_MEMBER_SSN4", familyMemberSSN4);
					dataMap.put("DEP_FAMILY_BIRTHDATE4", familyMemberBirthdate4);
					dataMap.put("DEP_FAMILY_RELATION4", familyMembemRel4);

					dataMap.put("DEP_FAMILY_MEMBER_NAME5", familyMemName5);
					dataMap.put("DEP_FAMILY_MEMBER_SSN5", familyMemberSSN5);
					dataMap.put("DEP_FAMILY_BIRTHDATE5", familyMemberBirthdate5);
					dataMap.put("DEP_FAMILY_RELATION5", familyMembemRel5);

					dataMap.put("DEP_FAMILY_MEMBER_NAME6", familyMemName6);
					dataMap.put("DEP_FAMILY_MEMBER_SSN6", familyMemberSSN6);
					dataMap.put("DEP_FAMILY_BIRTHDATE6", familyMemberBirthdate6);
					dataMap.put("DEP_FAMILY_RELATION6", familyMembemRel6);

					dataMap.put("SIGN_OF_COBRA_APPLICANT", signatureofCOBRAApplicant);
					dataMap.put("DAYTIME_TELEPHONE_NUMBER", daytimeTelephoneNumber);

					Object cobraSignDateObj = null;
					if (cobraSignDate != null && cobraSignDate != "") {
						Date cobraSignDateNew = Date.valueOf(cobraSignDate);
						cobraSignDateObj = cobraSignDateNew;
					}

					dataMap.put("COBRA_SIGN_DATE", cobraSignDateObj);
					dataMap.put("SIGN_OF_BENEFITS_REP", signatureofBenefitsRepresentative);
					dataMap.put("CAMPUS", campus);

					Object benefitsSignDateObj = null;
					if (benefitsSignDate != null && benefitsSignDate != "") {
						Date benefitsSignDateNew = Date.valueOf(benefitsSignDate);
						benefitsSignDateObj = benefitsSignDateNew;
					}
					dataMap.put("BENEFITS_REP_SIGN_DATE", benefitsSignDateObj);

				}

				if (conn != null) {
					DatabaseUtils dbUtil = new DatabaseUtils();
					dbUtil.insertFormData(conn, dataMap, tableName, formName);
				}

			} catch (Exception e) {
				log.error(Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						// TODO Auto-generated catch block
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
