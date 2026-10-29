package com.csuf.cloud.core.database;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedHashMap;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.ValueFormatException;
import javax.sql.DataSource;
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
import com.day.commons.datasource.poolservice.DataSourcePool;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.impl.JDBCConnectionHelperServiceImpl;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=Emp Transfer Data DB",
		Constants.SERVICE_VENDOR + "=Adobe Systems", "process.label" + "=CSUF Employee Transfer Data" })
public class CSUFEmpTransferDataDB implements WorkflowProcess {

	int empTransferParentTable = 0;

	private static final Logger log = LoggerFactory.getLogger(CSUFEmpTransferDataDB.class);

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		Connection conn = null;

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		Document doc = null;
		InputStream is = null;
		String appointingDepartment = "";
		String appointingAddress = "";
		String releasingDepartment = "";
		String releasingAddress = "";
		String publicPhone1 = "";
		String ATSSPhone1 = "";
		String payrollTechnician = "";
		String publicPhone2 = "";
		String ATSSPhone2 = "";
		String attention = "";
		String employeeLastName = "";
		String employeeFirstName = "";
		String ssn = "";
		String cbid = "";
		String birthDate = "";
		String appointementDate = "";
		String timebase1 = "";
		String tenure1 = "";
		String separationDate = "";
		String tenure2 = "";
		String timebase2 = "";
		String jobCode = "";
		String classification = "";
		String classCode = "";
		String classTitle = "";
		String codeNumber1 = "";
		String amount1 = "";
		String cancelledCHK = "";
		String enhancedCHK = "";
		String directDeposit = "";
		String healthPlan = "";
		String dentalPlan = "";
		String visionPlan = "";
		String lifeInsurance = "";
		String disability = "";
		String flexelectProgram = "";
		String deferredCompensationNotEligible = "";
		String depReimbursement = "";
		String medicalReimbursement = "";
		String cash = "";
		String preTax = "";
		String lastPayPeriod = "";
		String basedOnSalaryRate = "";
		String timePaidStandard = "";
		String timePaidDays = "";
		String timePaidHours = "";
		String sickLeave = "";
		String vacAnnual = "";
		String personalHolidayYes = "";
		String personalHolidayHours = "";
		String personalHolidayUsed = "";
		String personalHolidayNo = "";
		String saturdayHolidayUsed = "";
		String saturdayHolidayNo = "";
		String saturdayHolidayHours = "";
		String saturdayHolidayYes = "";
		String grantedByGov = "";
		String includeCredit = "";
		String vacCode = "";
		String vacChangeDate = "";
		String employeeUnderAnnualLeaveCHK = "";
		String annualLeaveEffectiveDate = "";
		String totalStateServYear = "";
		String totalStateServMonth = "";
		String totalStateServHours = "";
		String hoursAccumulatedTowardsPlan1 = "";
		String hoursAccumulatedTowardsPlan2 = "";
		String hoursAccumulatedTowardsPlan3 = "";
		String hoursAccumulatedTowardsPlan4 = "";
		String hoursAccumulatedTowardsPlan5 = "";
		String titleOfClass = "";
		String agency = "";
		String rightOfReturn = "";
		String probPeriodCompletion = "";
		String calDaysOrHours = "";
		String bereavementLVUsed = "";
		String familyCareUsed = "";
		String totalSickUsed = "";
		String date1 = "";
		String date2 = "";
		String date3 = "";
		String date4 = "";
		String date5 = "";
		String date6 = "";
		String date7 = "";
		String date8 = "";
		String date9 = "";
		String date10 = "";
		String date11 = "";
		String date12 = "";
		String date13 = "";
		String date14 = "";
		String date15 = "";
		String date16 = "";
		String date17 = "";
		String date18 = "";
		String date19 = "";
		String date20 = "";
		String date21 = "";
		String date22 = "";
		String date23 = "";
		String date24 = "";
		String date25 = "";
		String date26 = "";
		String date27 = "";
		String date28 = "";
		String date29 = "";
		String date30 = "";
		String date31 = "";
		String selectMinute = "";
		String selectHour = "";
		String workWeekPeriodThru = "";
		String workWeekPeriodBegin = "";
		String selectTime = "";
		String remarks = "";
		String datePLPBegan = "";
		String MOSTowardsPLP = "";
		String releasingDept = "";
		String newAppointmentPower = "";
		String PLPCreditBeingTransferred = "";
		String PLPCreditPaidOff = "";
		String leaveCardAttachment = "";
		String signUnderCAP = "";
		String signature = "";
		String title = "";
		String signedDate = "";
		String signCB = "";
		String workflowInstanceID = "";

		LinkedHashMap<String, Object> dataMapFormInfo = null;
		LinkedHashMap<String, Object> dataMapPayrollDeductionInfo = null;
		Resource xmlNode = resolver.getResource(payloadPath);
		Iterator<Resource> xmlFiles = xmlNode.listChildren();
		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);
		log.info("conn= " + conn);
		if (conn != null) {
			while (xmlFiles.hasNext()) {
				workflowInstanceID = workItem.getWorkflow().getId();
				Resource attachmentXml = xmlFiles.next();
				// log.info("xmlFiles inside ");
				String filePath = attachmentXml.getPath();

				log.info("filePath= " + filePath);
				if (filePath.contains("Data.xml")) {
					filePath = attachmentXml.getPath().concat("/jcr:content");
					
					Node subNode = resolver.getResource(filePath).adaptTo(Node.class);
					try {
						is = subNode.getProperty("jcr:data").getBinary().getStream();
						log.info("start of first level input stream" + is);
					} catch (ValueFormatException e2) {
						log.error("Exception1111=" +  Arrays.toString(e2.getStackTrace()));
						e2.printStackTrace();
					} catch (PathNotFoundException e2) {
						log.error("Exception2=" +  Arrays.toString(e2.getStackTrace()));
						e2.printStackTrace();
					} catch (RepositoryException e2) {
						log.error("Exception3=" +  Arrays.toString(e2.getStackTrace()));
						e2.printStackTrace();
					}
					try {
						DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder dBuilder = null;
						try {
							dBuilder = dbFactory.newDocumentBuilder();
						} catch (ParserConfigurationException e1) {
							log.info("ParserConfigurationException=" +  Arrays.toString(e1.getStackTrace()));
							e1.printStackTrace();
						}
						try {
							doc = dBuilder.parse(is);
						} catch (IOException e1) {
							log.info("IOException=" +  Arrays.toString(e1.getStackTrace()));
							e1.printStackTrace();
						}
						org.w3c.dom.NodeList nList = doc.getElementsByTagName("afBoundData");
						for (int temp = 0; temp < nList.getLength(); temp++) {
							org.w3c.dom.Node nNode = nList.item(temp);

							if (nNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {

								org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;

								appointingDepartment = eElement.getElementsByTagName("AppointingDepartment").item(0)
										.getTextContent();

								appointingAddress = eElement.getElementsByTagName("AppointingAddress").item(0)
										.getTextContent();
								releasingDepartment = eElement.getElementsByTagName("ReleasingDepartment").item(0)
										.getTextContent();
								releasingAddress = eElement.getElementsByTagName("ReleasingAddress").item(0)
										.getTextContent();

								publicPhone1 = eElement.getElementsByTagName("PublicPhone1").item(0).getTextContent();
								ATSSPhone1 = eElement.getElementsByTagName("ATSSPhone1").item(0).getTextContent();
								payrollTechnician = eElement.getElementsByTagName("PayrollTechnician").item(0)
										.getTextContent();

								publicPhone2 = eElement.getElementsByTagName("PublicPhone2").item(0).getTextContent();
								ATSSPhone2 = eElement.getElementsByTagName("ATSSPhone2").item(0).getTextContent();
								attention = eElement.getElementsByTagName("Attention").item(0).getTextContent();
								employeeLastName = eElement.getElementsByTagName("EmployeeLastName").item(0)
										.getTextContent();

								employeeFirstName = eElement.getElementsByTagName("EmployeeFirstName").item(0)
										.getTextContent();

								ssn = eElement.getElementsByTagName("SSN").item(0).getTextContent();
								cbid = eElement.getElementsByTagName("CBID").item(0).getTextContent();
								birthDate = eElement.getElementsByTagName("BirthDate").item(0).getTextContent();
								appointementDate = eElement.getElementsByTagName("AppointementDate").item(0)
										.getTextContent();
								timebase1 = eElement.getElementsByTagName("Timebase1").item(0).getTextContent();

								tenure1 = eElement.getElementsByTagName("Tenure1").item(0).getTextContent();
								separationDate = eElement.getElementsByTagName("SeparationDate").item(0)
										.getTextContent();
								tenure2 = eElement.getElementsByTagName("Tenure2").item(0).getTextContent();

								timebase2 = eElement.getElementsByTagName("Timebase2").item(0).getTextContent();
								jobCode = eElement.getElementsByTagName("JobCode").item(0).getTextContent();
								classification = eElement.getElementsByTagName("Classification").item(0)
										.getTextContent();
								classCode = eElement.getElementsByTagName("ClassCode").item(0).getTextContent();

								classTitle = eElement.getElementsByTagName("ClassTitle").item(0).getTextContent();

								cancelledCHK = eElement.getElementsByTagName("CancelledCHK").item(0).getTextContent();
								enhancedCHK = eElement.getElementsByTagName("EnhancedCHK").item(0).getTextContent();
								directDeposit = eElement.getElementsByTagName("DirectDeposit").item(0).getTextContent();
								healthPlan = eElement.getElementsByTagName("HealthPlan").item(0).getTextContent();
								dentalPlan = eElement.getElementsByTagName("DentalPlan").item(0).getTextContent();

								visionPlan = eElement.getElementsByTagName("VisionPlan").item(0).getTextContent();
								lifeInsurance = eElement.getElementsByTagName("LifeInsurance").item(0).getTextContent();
								disability = eElement.getElementsByTagName("Disability").item(0).getTextContent();

								flexelectProgram = eElement.getElementsByTagName("FlexelectProgram").item(0)
										.getTextContent();
								deferredCompensationNotEligible = eElement
										.getElementsByTagName("DeferredCompensationNotEligible").item(0)
										.getTextContent();
								depReimbursement = eElement.getElementsByTagName("DepReimbursement").item(0)
										.getTextContent();
								medicalReimbursement = eElement.getElementsByTagName("MedicalReimbursement").item(0)
										.getTextContent();

								cash = eElement.getElementsByTagName("Cash").item(0).getTextContent();

								preTax = eElement.getElementsByTagName("PreTax").item(0).getTextContent();
								lastPayPeriod = eElement.getElementsByTagName("LastPayPeriod").item(0).getTextContent();
								basedOnSalaryRate = eElement.getElementsByTagName("BasedOnSalaryRate").item(0)
										.getTextContent();
								timePaidStandard = eElement.getElementsByTagName("TimePaidStandard").item(0)
										.getTextContent();

								timePaidDays = eElement.getElementsByTagName("TimePaidDays").item(0).getTextContent();
								timePaidHours = eElement.getElementsByTagName("TimePaidHours").item(0).getTextContent();
								sickLeave = eElement.getElementsByTagName("SickLeave").item(0).getTextContent();
								vacAnnual = eElement.getElementsByTagName("VacAnnual").item(0).getTextContent();

								personalHolidayYes = eElement.getElementsByTagName("PersonalHolidayYes").item(0)
										.getTextContent();

								personalHolidayHours = eElement.getElementsByTagName("PersonalHolidayHours").item(0)
										.getTextContent();
								personalHolidayUsed = eElement.getElementsByTagName("PersonalHolidayUsed").item(0)
										.getTextContent();
								personalHolidayNo = eElement.getElementsByTagName("PersonalHolidayNo").item(0)
										.getTextContent();
								saturdayHolidayUsed = eElement.getElementsByTagName("SaturdayHolidayUsed").item(0)
										.getTextContent();
								saturdayHolidayNo = eElement.getElementsByTagName("SaturdayHolidayNo").item(0)
										.getTextContent();

								saturdayHolidayHours = eElement.getElementsByTagName("SaturdayHolidayHours").item(0)
										.getTextContent();
								saturdayHolidayYes = eElement.getElementsByTagName("SaturdayHolidayYes").item(0)
										.getTextContent();
								grantedByGov = eElement.getElementsByTagName("GrantedByGov").item(0).getTextContent();

								includeCredit = eElement.getElementsByTagName("IncludeCredit").item(0).getTextContent();
								vacCode = eElement.getElementsByTagName("VacCode").item(0).getTextContent();
								vacChangeDate = eElement.getElementsByTagName("VacChangeDate").item(0).getTextContent();
								employeeUnderAnnualLeaveCHK = eElement
										.getElementsByTagName("EmployeeUnderAnnualLeaveCHK").item(0).getTextContent();

								annualLeaveEffectiveDate = eElement.getElementsByTagName("AnnualLeaveEffectiveDate")
										.item(0).getTextContent();

								totalStateServYear = eElement.getElementsByTagName("TotalStateServYear").item(0)
										.getTextContent();

								totalStateServMonth = eElement.getElementsByTagName("TotalStateServMonth").item(0)
										.getTextContent();
								totalStateServHours = eElement.getElementsByTagName("TotalStateServHours").item(0)
										.getTextContent();

								hoursAccumulatedTowardsPlan1 = eElement
										.getElementsByTagName("HoursAccumulatedTowardsPlan1").item(0).getTextContent();

								hoursAccumulatedTowardsPlan2 = eElement
										.getElementsByTagName("HoursAccumulatedTowardsPlan2").item(0).getTextContent();
								hoursAccumulatedTowardsPlan3 = eElement
										.getElementsByTagName("HoursAccumulatedTowardsPlan3").item(0).getTextContent();
								hoursAccumulatedTowardsPlan4 = eElement
										.getElementsByTagName("HoursAccumulatedTowardsPlan4").item(0).getTextContent();
								hoursAccumulatedTowardsPlan5 = eElement
										.getElementsByTagName("HoursAccumulatedTowardsPlan5").item(0).getTextContent();
								titleOfClass = eElement.getElementsByTagName("TitleOfClass").item(0).getTextContent();

								agency = eElement.getElementsByTagName("Agency").item(0).getTextContent();
								rightOfReturn = eElement.getElementsByTagName("RightOfReturn").item(0).getTextContent();
								probPeriodCompletion = eElement.getElementsByTagName("ProbPeriodCompletion").item(0)
										.getTextContent();

								calDaysOrHours = eElement.getElementsByTagName("CalDaysOrHours").item(0)
										.getTextContent();
								bereavementLVUsed = eElement.getElementsByTagName("BereavementLVUsed").item(0)
										.getTextContent();
								familyCareUsed = eElement.getElementsByTagName("FamilyCareUsed").item(0)
										.getTextContent();
								totalSickUsed = eElement.getElementsByTagName("TotalSickUsed").item(0).getTextContent();
								selectMinute = eElement.getElementsByTagName("SelectMinute").item(0).getTextContent();

								selectHour = eElement.getElementsByTagName("SelectHour").item(0).getTextContent();
								workWeekPeriodThru = eElement.getElementsByTagName("WorkWeekPeriodThru").item(0)
										.getTextContent();
								workWeekPeriodBegin = eElement.getElementsByTagName("WorkWeekPeriodBegin").item(0)
										.getTextContent();
								selectTime = eElement.getElementsByTagName("SelectTime").item(0).getTextContent();

								date1 = eElement.getElementsByTagName("Date1").item(0).getTextContent();
								date2 = eElement.getElementsByTagName("Date2").item(0).getTextContent();
								date3 = eElement.getElementsByTagName("Date3").item(0).getTextContent();
								date4 = eElement.getElementsByTagName("Date4").item(0).getTextContent();

								date5 = eElement.getElementsByTagName("Date5").item(0).getTextContent();

								date6 = eElement.getElementsByTagName("Date6").item(0).getTextContent();
								date7 = eElement.getElementsByTagName("Date7").item(0).getTextContent();
								date8 = eElement.getElementsByTagName("Date8").item(0).getTextContent();
								date9 = eElement.getElementsByTagName("Date9").item(0).getTextContent();
								date10 = eElement.getElementsByTagName("Date10").item(0).getTextContent();

								date11 = eElement.getElementsByTagName("Date11").item(0).getTextContent();
								date12 = eElement.getElementsByTagName("Date12").item(0).getTextContent();
								date13 = eElement.getElementsByTagName("Date13").item(0).getTextContent();

								date14 = eElement.getElementsByTagName("Date14").item(0).getTextContent();
								date15 = eElement.getElementsByTagName("Date15").item(0).getTextContent();
								date16 = eElement.getElementsByTagName("Date16").item(0).getTextContent();
								date17 = eElement.getElementsByTagName("Date17").item(0).getTextContent();

								date18 = eElement.getElementsByTagName("Date18").item(0).getTextContent();

								date19 = eElement.getElementsByTagName("Date19").item(0).getTextContent();
								date20 = eElement.getElementsByTagName("Date20").item(0).getTextContent();
								date21 = eElement.getElementsByTagName("Date21").item(0).getTextContent();

								date22 = eElement.getElementsByTagName("Date22").item(0).getTextContent();
								date23 = eElement.getElementsByTagName("Date23").item(0).getTextContent();
								date24 = eElement.getElementsByTagName("Date24").item(0).getTextContent();

								date25 = eElement.getElementsByTagName("Date25").item(0).getTextContent();
								date26 = eElement.getElementsByTagName("Date26").item(0).getTextContent();
								date27 = eElement.getElementsByTagName("Date27").item(0).getTextContent();
								date28 = eElement.getElementsByTagName("Date28").item(0).getTextContent();

								date29 = eElement.getElementsByTagName("Date29").item(0).getTextContent();

								date30 = eElement.getElementsByTagName("Date30").item(0).getTextContent();
								date31 = eElement.getElementsByTagName("Date31").item(0).getTextContent();

								remarks = eElement.getElementsByTagName("Remarks").item(0).getTextContent();

								datePLPBegan = eElement.getElementsByTagName("DatePLPBegan").item(0).getTextContent();

								MOSTowardsPLP = eElement.getElementsByTagName("MOSTowardsPLP").item(0).getTextContent();
								releasingDept = eElement.getElementsByTagName("ReleasingDept").item(0).getTextContent();
								newAppointmentPower = eElement.getElementsByTagName("NewAppointmentPower").item(0)
										.getTextContent();

								PLPCreditBeingTransferred = eElement.getElementsByTagName("PLPCreditBeingTransferred")
										.item(0).getTextContent();
								PLPCreditPaidOff = eElement.getElementsByTagName("PLPCreditPaidOff").item(0)
										.getTextContent();
								leaveCardAttachment = eElement.getElementsByTagName("LeaveCardAttachment").item(0)
										.getTextContent();

								signUnderCAP = eElement.getElementsByTagName("signUnderCAP").item(0).getTextContent();

								signature = eElement.getElementsByTagName("Signature").item(0).getTextContent();

								signedDate = eElement.getElementsByTagName("SignedDate").item(0).getTextContent();
								title = eElement.getElementsByTagName("Title").item(0).getTextContent();

								dataMapFormInfo = new LinkedHashMap<String, Object>();
								dataMapFormInfo.put("APPOINTING_DEPT", appointingDepartment);
								dataMapFormInfo.put("APPOINTING_ADDRESS", appointingAddress);
								dataMapFormInfo.put("RELEASING_DEPT", releasingDepartment);
								dataMapFormInfo.put("RELEASING_ADDRESS", releasingAddress);
								dataMapFormInfo.put("ATTENTION", attention);
								dataMapFormInfo.put("PUBLIC_PHONE1", publicPhone1);
								dataMapFormInfo.put("PUBLIC_PHONE2", publicPhone2);
								dataMapFormInfo.put("ATSS1", ATSSPhone1);
								dataMapFormInfo.put("ATSS2", ATSSPhone2);
								dataMapFormInfo.put("EMP_FIRST_NAME", employeeFirstName);
								dataMapFormInfo.put("EMP_LAST_NAME", employeeLastName);
								dataMapFormInfo.put("EMP_SSN", ssn);
								Object birthDateObj = null;
								if (birthDate != null && birthDate != "") {
									Date birthDateNew = Date.valueOf(birthDate);
									birthDateObj = birthDateNew;
								}
								dataMapFormInfo.put("EMP_BIRTH_DATE", birthDateObj);
								dataMapFormInfo.put("EMP_CBID", cbid);

								Object appointementDateObj = null;
								if (appointementDate != null && appointementDate != "") {
									Date appointementDateNew = Date.valueOf(appointementDate);
									appointementDateObj = appointementDateNew;
								}
								dataMapFormInfo.put("APPOINTMENT_DATE", appointementDateObj);
								dataMapFormInfo.put("TO_TENURE", tenure1);
								dataMapFormInfo.put("TO_TIMEBASE", timebase2);
								dataMapFormInfo.put("JOB_CODE", jobCode);
								dataMapFormInfo.put("CLASSIFICATION", classification);
								Object separationDateObj = null;
								if (separationDate != null && separationDate != "") {
									Date separationDateNew = Date.valueOf(appointementDate);
									separationDateObj = separationDateNew;
								}
								dataMapFormInfo.put("SEPERATION_DATE", separationDateObj);
								dataMapFormInfo.put("FROM_TENURE", tenure2);
								dataMapFormInfo.put("FROM_TIMEBASE", timebase1);
								dataMapFormInfo.put("CLASS_TITLE", classTitle);
								dataMapFormInfo.put("CLASS_CODE", classCode);

								dataMapFormInfo.put("LAST_PAY_PERIOD", lastPayPeriod);
								dataMapFormInfo.put("BASED_ON_SALARY_RATE", basedOnSalaryRate);
								dataMapFormInfo.put("STANDARD_CB", timePaidStandard);
								dataMapFormInfo.put("DAYS", timePaidDays);
								dataMapFormInfo.put("HOURS", timePaidHours);
								dataMapFormInfo.put("DIRECT_DEPOSIT", directDeposit);
								dataMapFormInfo.put("SPL_COMM1", cancelledCHK);
								dataMapFormInfo.put("HEALTH_BENEFIT", healthPlan);
								dataMapFormInfo.put("SPL_COMM2", enhancedCHK);
								dataMapFormInfo.put("DENTAL_PLAN", dentalPlan);
								dataMapFormInfo.put("VISION_PLAN", visionPlan);
								dataMapFormInfo.put("ST_SPONSER_LIFE_INS", lifeInsurance);
								dataMapFormInfo.put("LONG_TERM_DISABILITY", disability);
								dataMapFormInfo.put("FLEXELECT_PGM", flexelectProgram);
								dataMapFormInfo.put("PRE_TAX", preTax);
								dataMapFormInfo.put("CASH_OPT", cash);
								dataMapFormInfo.put("DATE1", date1);
								dataMapFormInfo.put("DATE2", date2);
								dataMapFormInfo.put("DATE3", date3);
								dataMapFormInfo.put("DATE4", date4);
								dataMapFormInfo.put("DATE5", date5);
								dataMapFormInfo.put("DATE6", date6);
								dataMapFormInfo.put("DATE7", date7);
								dataMapFormInfo.put("DATE8", date8);
								dataMapFormInfo.put("DATE9", date9);
								dataMapFormInfo.put("DATE10", date10);
								dataMapFormInfo.put("DATE11", date11);
								dataMapFormInfo.put("DATE12", date12);
								dataMapFormInfo.put("DATE13", date13);
								dataMapFormInfo.put("DATE14", date14);
								dataMapFormInfo.put("DATE15", date15);
								dataMapFormInfo.put("DATE16", date16);
								dataMapFormInfo.put("DATE17", date17);
								dataMapFormInfo.put("DATE18", date18);
								dataMapFormInfo.put("DATE19", date19);
								dataMapFormInfo.put("DATE20", date20);
								dataMapFormInfo.put("DATE21", date21);
								dataMapFormInfo.put("DATE22", date22);
								dataMapFormInfo.put("DATE23", date23);
								dataMapFormInfo.put("DATE24", date24);
								dataMapFormInfo.put("DATE25", date25);
								dataMapFormInfo.put("DATE26", date26);
								dataMapFormInfo.put("DATE27", date27);
								dataMapFormInfo.put("DATE28", date28);
								dataMapFormInfo.put("DATE29", date29);
								dataMapFormInfo.put("DATE30", date30);
								dataMapFormInfo.put("DATE31", date31);
								dataMapFormInfo.put("MED_REIMB", medicalReimbursement);
								dataMapFormInfo.put("DEF_COMPN", deferredCompensationNotEligible);
								dataMapFormInfo.put("SICK_LEAVE", sickLeave);
								dataMapFormInfo.put("VAC_OR_ANNUAL_LV", vacAnnual);
								dataMapFormInfo.put("PERS_HOL_YES", personalHolidayYes);
								dataMapFormInfo.put("PERS_USED_NO", personalHolidayNo);
								dataMapFormInfo.put("PERS_HOURS", personalHolidayHours);
								dataMapFormInfo.put("PERS_USED", personalHolidayUsed);

								dataMapFormInfo.put("SAT_HOL_YES", saturdayHolidayYes);
								dataMapFormInfo.put("SAT_USED_NO", saturdayHolidayNo);
								dataMapFormInfo.put("SAT_HOURS", saturdayHolidayHours);
								dataMapFormInfo.put("SAT_USED", saturdayHolidayUsed);
								dataMapFormInfo.put("ATO_GRANTED", grantedByGov);
								dataMapFormInfo.put("INCLUDE_CREDIT", includeCredit);
								dataMapFormInfo.put("VAC_OR_LV_CODE", vacCode);

								Object vacChangeDateObj = null;
								if (vacChangeDate != null && vacChangeDate != "") {
									Date vacChangeDateNew = Date.valueOf(vacChangeDate);
									vacChangeDateObj = vacChangeDateNew;
								}
								dataMapFormInfo.put("VAC_OR_LV_CHANGE_DT", vacChangeDateObj);

								dataMapFormInfo.put("ANN_LEAVE_PGM", employeeUnderAnnualLeaveCHK);
								Object annualLeaveEffectiveDateObj = null;
								if (annualLeaveEffectiveDate != null && annualLeaveEffectiveDate != "") {
									Date annualLeaveEffectiveDateNew = Date.valueOf(annualLeaveEffectiveDate);
									annualLeaveEffectiveDateObj = annualLeaveEffectiveDateNew;
								}
								dataMapFormInfo.put("ANN_LEAVE_PGM_DT", annualLeaveEffectiveDateObj);
								dataMapFormInfo.put("TOTAL_STATE_YEAR", totalStateServYear);
								dataMapFormInfo.put("TOTAL_STATE_MONTH", totalStateServMonth);
								dataMapFormInfo.put("TOTAL_STATE_HOURS", totalStateServHours);
								dataMapFormInfo.put("MSA_SISA", hoursAccumulatedTowardsPlan1);
								dataMapFormInfo.put("VAC_ANN_LV", hoursAccumulatedTowardsPlan2);
								dataMapFormInfo.put("FY_RET_HOURS", hoursAccumulatedTowardsPlan3);

								dataMapFormInfo.put("INS_PLANS", hoursAccumulatedTowardsPlan4);

								dataMapFormInfo.put("CAR_OVER_HRS", hoursAccumulatedTowardsPlan5);
								dataMapFormInfo.put("TOTAL_SICK", totalSickUsed);
								dataMapFormInfo.put("BEREAVEMENT_LV_USED", bereavementLVUsed);
								dataMapFormInfo.put("CAL_DAY_HRS", calDaysOrHours);
								dataMapFormInfo.put("PROB_PERIOD", probPeriodCompletion);
								dataMapFormInfo.put("RIGHT_TO_RETURN", rightOfReturn);
								dataMapFormInfo.put("AGENCY_IF_YES", agency);
								dataMapFormInfo.put("CLS_TITLE_IF_YES", titleOfClass);

								dataMapFormInfo.put("WORK_WK_PERIOD_BEGIN", workWeekPeriodBegin);
								dataMapFormInfo.put("WORK_WK_PERIOD_THRU", workWeekPeriodThru);
								dataMapFormInfo.put("SELECT_HOURS", selectHour);
								dataMapFormInfo.put("SELECT_TIME", selectTime);
								dataMapFormInfo.put("REMARKS", remarks);

								Object datePLPBeganObj = null;
								if (datePLPBegan != null && datePLPBegan != "") {
									Date datePLPBeganNew = Date.valueOf(datePLPBegan);
									datePLPBeganObj = datePLPBeganNew;
								}
								dataMapFormInfo.put("DT_PLP_BEGAN", datePLPBeganObj);
								dataMapFormInfo.put("MOS_PLP", MOSTowardsPLP);
								dataMapFormInfo.put("HRS_PLP_CREDIT", PLPCreditBeingTransferred);
								dataMapFormInfo.put("HRS_PLP_CREDIT_PAID_OFF", PLPCreditPaidOff);
								dataMapFormInfo.put("RELEASING_DEPT_IS", releasingDept);
								dataMapFormInfo.put("NEW_APPOINTING_PWR_IS", newAppointmentPower);
								dataMapFormInfo.put("PAR_892_COMPLETED", signUnderCAP);
								dataMapFormInfo.put("LEAVE_CARD_ATTACHED", leaveCardAttachment);
								dataMapFormInfo.put("SIGNATURE", signature);
								Object signedDateObj = null;
								if (signedDate != null && signedDate != "") {
									Date signedDateNew = Date.valueOf(signedDate);
									signedDateObj = signedDateNew;
								}
								dataMapFormInfo.put("SIGN_DATE", signedDateObj);
								dataMapFormInfo.put("TITLE", title);
								dataMapFormInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);

								for (int i = 0; i < eElement.getElementsByTagName("payrolDeductionRepeatablePanel")
										.getLength(); i++) {
									for (int j = 0; j < eElement.getElementsByTagName("payrolDeductionRepeatablePanel")
											.item(i).getChildNodes().getLength() - 1; j++) {

										codeNumber1 = eElement.getElementsByTagName("payrolDeductionRepeatablePanel")
												.item(i).getChildNodes().item(0).getTextContent();

										amount1 = eElement.getElementsByTagName("payrolDeductionRepeatablePanel")
												.item(i).getChildNodes().item(1).getTextContent();

										dataMapPayrollDeductionInfo = new LinkedHashMap<String, Object>();

										dataMapPayrollDeductionInfo.put("EMP_SSN", ssn);
										dataMapPayrollDeductionInfo.put("CODE_NO", codeNumber1);
										dataMapPayrollDeductionInfo.put("AMOUNT", amount1);
										dataMapPayrollDeductionInfo.put("WORKFLOW_INSTANCE_ID", workflowInstanceID);
										
										if (empTransferParentTable == 0) {
											insertTransferDataForm(conn, dataMapFormInfo);

										}

										if (empTransferParentTable == 1) {
											insertEmpTransferPayrollDeduction(conn, dataMapPayrollDeductionInfo);

										}
										break;

									}

								}

							}
						}

					} catch (SAXException e) {
						log.error("SAXException=" +  Arrays.toString(e.getStackTrace()));
						e.printStackTrace();
					} catch (Exception e) {
						log.error("Exception1");
						log.error("Exception=" +  Arrays.toString(e.getStackTrace()));
						e.printStackTrace();
					} finally {
						try {
							empTransferParentTable = 0;
							is.close();
							conn.close();
						} catch (IOException e) {
							log.error("IOException=" +  Arrays.toString(e.getStackTrace()));
							e.printStackTrace();
						} catch (SQLException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}

					}

				}
			}

		}
	}

	public void insertTransferDataForm(Connection conn, LinkedHashMap<String, Object> dataMap) {
		PreparedStatement preparedStmt = null;
		log.error("Data map=" + dataMap);
		if (conn != null) {
			try {
				conn.setAutoCommit(false);
			} catch (SQLException e1) {
				log.error("SQLException=" +  Arrays.toString(e1.getStackTrace()));
				e1.printStackTrace();
			}
			String tableName = "AEM_EMP_TRANSFER_DATA";
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
			log.error("SQL=" + sql.toString());
			try {
				preparedStmt = conn.prepareStatement(sql.toString());
			} catch (SQLException e1) {
				log.error("SQLException=" +  Arrays.toString(e1.getStackTrace()));
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
					log.error("SQLException=" +  Arrays.toString(e.getStackTrace()));
					e.printStackTrace();
				}
			}
			try {
				log.error("Before Emp Transfer Data");
				preparedStmt.execute();
				conn.commit();
				empTransferParentTable = 1;
				log.error("empTransferParentTable=" + empTransferParentTable);
				log.error("After Emp transfer data");
			} catch (SQLException e1) {
				log.error("SQLException=" +  Arrays.toString(e1.getStackTrace()));
				e1.printStackTrace();
			} finally {
				if (preparedStmt != null) {
					try {
						preparedStmt.close();
						log.info("preparedstmt closed");
						// conn.close();
					} catch (SQLException e) {
						log.error("SQLException=" +  Arrays.toString(e.getStackTrace()));
						e.printStackTrace();
					}
				}
			}
		}
	}

	public void insertEmpTransferPayrollDeduction(Connection conn, LinkedHashMap<String, Object> dataMap) {
		PreparedStatement preparedStmt = null;
		log.error("Data map=" + dataMap);
		if (conn != null) {
			try {
				conn.setAutoCommit(false);
			} catch (SQLException e1) {
				log.error("SQLException=" +  Arrays.toString(e1.getStackTrace()));
				e1.printStackTrace();
			} catch (Exception e) {
				log.error("Exception=" +  Arrays.toString(e.getStackTrace()));
				e.printStackTrace();
			}
			String tableName = "AEM_EMP_TRAN_PAYROLL_DEDUCTION";
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
			log.error("SQL=" + sql.toString());
			try {
				preparedStmt = conn.prepareStatement(sql.toString());
			} catch (SQLException e1) {
				log.error("SQLException=" +  Arrays.toString(e1.getStackTrace()));
				e1.printStackTrace();
			} catch (Exception e) {
				log.error("Exception=" +  Arrays.toString(e.getStackTrace()));
				e.printStackTrace();
			}
			int i = 0;
			log.info("Datamap values=" + dataMap.values());
			try {
				for (Object value : dataMap.values()) {
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
				}
			} catch (SQLException e) {
				log.error("SQLException=" +  Arrays.toString(e.getStackTrace()));
				e.printStackTrace();
			} catch (Exception e) {
				log.error("Exception4");
				log.error("Exception=" +  Arrays.toString(e.getStackTrace()));
				e.printStackTrace();
			}
			try {
				log.error("Before Prepared stmt emp transfer payroll deduction");
				preparedStmt.execute();
				conn.commit();
				log.error("After Prepared stmt emp transfer payroll deduction");
			} catch (SQLException e1) {
				log.error("SQLException=" +  Arrays.toString(e1.getStackTrace()));
				e1.printStackTrace();
			} catch (Exception e) {
				log.error("Exception5");
				log.error("Exception=" +  Arrays.toString(e.getStackTrace()));
				e.printStackTrace();
			} finally {
				if (preparedStmt != null) {
					try {
						preparedStmt.close();
						// conn.close();
					} catch (SQLException e) {
						log.error("SQLException=" +  Arrays.toString(e.getStackTrace()));
						e.printStackTrace();
					} catch (Exception e) {
						log.error("Exception7");
						log.error("Exception=" +  Arrays.toString(e.getStackTrace()));
						e.printStackTrace();
					}
				}
			}
		}
	}

}
