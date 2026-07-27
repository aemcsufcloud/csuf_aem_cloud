/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            

//loadingText.visible = true;  
//
if(stepRef.value === null){
  withdrawalInstructions.visible = true;
  basicInformation.visible =false;
  NonMedicalWithdrawal.visible = false;
  mainSubmit.visible = false;
}
else{
  withdrawalInstructions.visible=false;
  studentAgreement.visible = false;
  withdrawalInstructionButton.visible=false;
  basicInformation.visible =true;
  NonMedicalWithdrawal.visible = true;
  mainSubmit.visible = true;
}




//nonMedInstructionsPanel.visible = false;
//medInstructionsPanel.visible = false;

/*$.ajax({
type: 'GET',
url:"/bin/getLoggedUserId",
dataType: 'json',
success: function(myresponse){
   
if(myresponse.Status == "Success"){
  
var userValue=myresponse.userId;
//alert("userValue="+userValue);
logUser.value = userValue;
if(stepRef.value === null){
//var cwid = "891673535";
DataUnavailableText.visible = false;
loadingText.visible = true;
  
//debugger;
var userId = "Rao27";
//var userId = userValue;
//set it to loguser
var term = "2201";

$.ajax({

    type: 'GET',

    url: "/bin/getStudentCourseWithdrawalInfoNew",



    data: {
        userId: userId,
        term: term
    },

    dataType: 'json',

    success: function(myresponse) {
    ProgramPlan.value = myresponse.PROGRAM_PLAN;
    LastName.value = myresponse.LNAME;
    FirstName.value = myresponse.FNAME;
    Email.value = myresponse.STUDENT_EMAIL;
      caseId.value = myresponse.CASEID;
      StudentID.value = myresponse.CWID;
      Major.value = myresponse.MAJOR_DESCR;
      DegreeObjective.value = myresponse.DEGREE_TYPE;
      AcademicPlan.value = myresponse.ACADEMIC_PLAN;
      International_Students.value = myresponse.INTERNATIONAL_FLAG;
      Nursing_Flag.value = myresponse.NURSING_FLAG;
      EIP_Flag.value = myresponse.EIP_FLAG;
      TelephoneNo.value = myresponse.STUDENT_PHONE;
      TermDesc.value = myresponse.TERM_DESCR;
      TermCode.value = myresponse.TERM_CODE;
      
var tItems;
   
var responselength =  myresponse.COURSES.length;
//alert(responselength);
if(responselength == 1)
  {
    Row1.visible = true;
    Row2.visible = false;
    Row3.visible = false;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
for(tItems in myresponse.COURSES)
{
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    //var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	//Row1
	    }
      
}
//For length 2
if(responselength == 2)
  {
	  
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = false;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
	
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
     }
//For length 3
if(responselength == 3)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 4
if(responselength == 4)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	//Row2.CourseNo2.value = courseNo;
    //Row2.ScheduleNo2.value = schNo;
    //Row2.UnitNo2.value = noOfUnits;
    //InstructorName2.value = instName;
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	//CourseNo3.value = courseNo;
    //ScheduleNo3.value = schNo;
    //UnitNo3.value = noOfUnits;
    //InstructorName3.value = instName;
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	  }
}
}
//For length 5
if(responselength == 5)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairName1:"+ChairName1.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairName2:"+ChairName2.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairName3:"+ChairName3.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
    ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairNam4:"+ChairName4.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
    //alert("ChairName5:"+ChairName5.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
  //For length 6
if(responselength == 6)
  {
	//alert("Pushpa 6");
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 7
if(responselength == 7)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 8
if(responselength == 8)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 9
if(responselength == 9)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
   if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 10
if(responselength == 10)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 11
if(responselength == 11)
  {
 
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 12
if(responselength == 12)
  {
 
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 13
if(responselength == 13)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber13.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 14
if(responselength == 14)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = true;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber13.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "13"){
    Row14.ScheduleNo14.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row14.CourseNo14.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row14.UnitNo14.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row14.InstructorName14.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID14.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail14.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID14.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID14.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber14.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 15
if(responselength == 15)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = true;
    Row15.visible = true;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber13.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "13"){
    Row14.ScheduleNo14.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row14.CourseNo14.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row14.UnitNo14.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row14.InstructorName14.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID14.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail14.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID14.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID14.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber14.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
   if(tItems == "14"){
    Row15.ScheduleNo15.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row15.CourseNo15.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row15.UnitNo15.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row15.InstructorName15.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID15.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail15.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID15.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID15.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber15.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
loadingText.visible = false;      
},
  error: function(error){
//alert("error block="+error);
// alert("Data is unavailable");
  loadingText.visible = false; 
  DataUnavailableText.visible = true;
}


    });
 //loadingText.visible = false; 

}
  

   
  
}

},
error: function(error){
alert("error block="+error);
  loadingText.visible = false; 
}

});
*/
   



if(stepRef.value == "ToMedical" || stepRef.value === null)
  {
        supportingDocuments.visible = true;
    	//withdrawalInstructions.visible = false;
  }
if(stepRef.value === null)
  {
  StudentSignaturePanel.visible = true;
  StudentSignaturePanel.enabled = true;
  InstructorSignaturePanel.visible = false;
  InstructorSignaturePanel.enabled = false;
  ChairSignaturePanel.visible = false;
  ARSCSignaturePanel.visible = false;
  MedicalReviewSignaturePanel.visible = false;
  //withdrawalInstructions.visible = false;  
  }
if(stepRef.value == "ToInstructor"){
 
  typeOfForm.enabled = false;
    caseId.enabled = false;
  studentPetitionSecMedical.visible = false;
  StudentPetitionSecNonMedical.visible = true;
  supportingDocuments.visible = true;
  StudentSignaturePanel.visible = true;
  StudentSignaturePanel.enabled = false;
  InstructorSignaturePanel.visible = true;
  InstructorSignaturePanel.enabled = true;
  ChairSignaturePanel.visible = false;
  ARSCSignaturePanel.visible = false;
  MedicalReviewSignaturePanel.visible = false;
  studentInformation.enabled = false;
  courseWithdrawalInfo.enabled = false;
  studentPetition.enabled = false;
  HiddenSectionPanel.enabled = true;
  //withdrawalInstructions.visible = false;
  }
if(stepRef.value == "ToChair"){
  typeOfForm.enabled = false;
    caseId.enabled = false;
  studentPetitionSecMedical.visible = false;
  StudentPetitionSecNonMedical.visible = true;
  supportingDocuments.visible = true;
  StudentSignaturePanel.visible = true;
  StudentSignaturePanel.enabled = false;
  InstructorSignaturePanel.visible = true;
  InstructorSignaturePanel.enabled = false;
  ChairSignaturePanel.visible = true;
  ChairSignaturePanel.enabled = true;
  ARSCSignaturePanel.visible = false;
  MedicalReviewSignaturePanel.visible = false;
  studentInformation.enabled = false;
  courseWithdrawalInfo.enabled = false;
  studentPetition.enabled = false;
  HiddenSectionPanel.enabled = true; 
  //withdrawalInstructions.visible = false;
  }
if(stepRef.value == "ToMedical"){
  typeOfForm.enabled = false;
    caseId.enabled = false;
  studentPetitionSecMedical.visible = true;
  StudentPetitionSecNonMedical.visible = false;
  supportingDocuments.visible = true;
  StudentSignaturePanel.visible = true;
  StudentSignaturePanel.enabled = false;
  InstructorSignaturePanel.visible = false;
  ChairSignaturePanel.visible = false;
  ARSCSignaturePanel.visible = false;
  MedicalReviewSignaturePanel.visible = true;
  MedicalReviewSignaturePanel.enabled = true;
    studentInformation.enabled = false;
  courseWithdrawalInfo.enabled = false;
  studentPetition.enabled = false;
  HiddenSectionPanel.enabled = true;
  //withdrawalInstructions.visible = false;
  }
if(stepRef.value == "ToARSC"){
  typeOfForm.enabled = false;
    caseId.enabled = false;
  supportingDocuments.visible = true;
  StudentSignaturePanel.visible = true;
  StudentSignaturePanel.enabled = false;
  InstructorSignaturePanel.visible = true;
  InstructorSignaturePanel.enabled = false;
  ChairSignaturePanel.visible = true;
  ChairSignaturePanel.enabled = false;
  studentPetitionSecMedical.visible = false;
  StudentPetitionSecNonMedical.visible = true;
  ARSCSignaturePanel.visible = true;
  //MedicalReviewerSign.value = "NA";
  MedicalReviewDate.value = "NA";
  MedicalReviewComment.value = "NA";
  RecommendMedical.value = "NA";
  MedicalReviewSignaturePanel.visible = false;
  studentInformation.enabled = false;
  courseWithdrawalInfo.enabled = false;
  studentPetition.enabled = false;
  HiddenSectionPanel.enabled = true;
 //withdrawalInstructions.visible = false;
  
}
if(stepRef.value == "ToMedicalARSC"){
  typeOfForm.enabled = false;
    caseId.enabled = false;
  //studentPetitionSecMedical.visible = true;  
  //StudentPetitionSecNonMedical.visible = false;
  studentPetition.visible=false;
  supportingDocuments.visible = false;
  StudentSignaturePanel.visible = true;
  StudentSignaturePanel.enabled = false;
  
  InstructorSignaturePanel.visible = false;
  ChairSignaturePanel.visible = false;
  ARSCSignaturePanel.visible = true;
    studentInformation.enabled = false;
  courseWithdrawalInfo.enabled = false;
  studentPetition.enabled = false;
  HiddenSectionPanel.enabled = true;
//  InstructorSign.value = "NA";
  InstructorReviewDate.value = "NA";
  InstructorComment.value = "NA";
 LastdateAttended.value = "NA";
  Grade.value = "NA";
//  ChairSign.value = "NA";
  ChairComment.value = "NA";
  ChairReviewDate.value = "NA";
 
  MedicalReviewSignaturePanel.visible = true;
   MedicalReviewSignaturePanel.enabled = false;
  //withdrawalInstructions.visible = false;
  }
if(stepRef.value == "ToARSCReviewed")
  {
    typeOfForm.enabled = false;
    caseId.enabled = false;
    studentInformationCommonPanel.enabled = false;
    courseWithdrawalInfo.enabled = false;
    studentPetition.enabled = false;
    approvaAndSignature.enabled = false;
    supportingDocuments.visible = true;
    MedicalReviewSignaturePanel.visible = false;
   // withdrawalInstructions.visible = false;
     }
if(stepRef.value == "ToMedicalARSCReviewed")
  {
    typeOfForm.enabled = false;
    caseId.enabled = false;
    studentInformationCommonPanel.enabled = false;
    courseWithdrawalInfo.enabled = false;
    studentPetition.enabled = false;
    approvaAndSignature.enabled = false;
    supportingDocuments.visible = false;
    InstructorSignaturePanel.visible = false;
    ChairSignaturePanel.visible = false;
   // withdrawalInstructions.visible = false;
    }
debugger;
if(stepRef.value === null){
  supportingDocuments.visible = true;
}else{
  supportingDocuments.visible = false;
}
if(stepRef.value === "ToMedical" || stepRef.value === "ToMedicalARSC" || stepRef.value == "ToMedicalARSCReviewed"){
   // withdrawalInstructions.visible = false;
  if(CB1.value == 1){
    Row1.visible = true;
    }else{
      Row1.visible = false;
    }
  if(CB2.value == 1){
    Row2.visible = true;
      }
  else{
      Row2.visible = false;
    }
  if(CB3.value == 1){
    Row3.visible = true;
     }
  else{
      Row3.visible = false;
    }
	if(CB4.value == 1){
    Row4.visible = true;
     }
  else{
      Row4.visible = false;
    }
	if(CB5.value == 1){
    Row5.visible = true;
     }
  else{
      Row5.visible = false;
    }
	if(CB6.value == 1){
    Row6.visible = true;
     }
  else{
      Row6.visible = false;
    }
	if(CB7.value == 1){
    Row7.visible = true;
     }
  else{
      Row7.visible = false;
    }
	if(CB8.value == 1){
    Row8.visible = true;
     }
  else{
      Row8.visible = false;
    }
	if(CB9.value == 1){
    Row9.visible = true;
     }
  else{
      Row9.visible = false;
    }
	if(CB10.value == 1){
    Row10.visible = true;
     }
  else{
      Row10.visible = false;
    }
	if(CB11.value == 1){
    Row11.visible = true;
     }
  else{
      Row11.visible = false;
    }
	if(CB12.value == 1){
    Row12.visible = true;
     }
  else{
      Row12.visible = false;
    }
	if(CB13.value == 1){
    Row13.visible = true;
     }
  else{
      Row13.visible = false;
    }
	if(CB14.value == 1){
    Row14.visible = true;
     }
  else{
      Row14.visible = false;
    }
	if(CB15.value == 1){
    Row15.visible = true;
     }
  else{
      Row15.visible = false;
    }
   if(CB1.value != 1){
    //Row2
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	}
    if(CB2.value != 1){
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	}
	if(CB3.value != 1){
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	}
	if(CB4.value != 1){
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	}
	if(CB5.value != 1){
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	}
	if(CB6.value != 1){
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	}
	if(CB7.value != 1){
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	}
	if(CB8.value != 1){
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	}
	if(CB9.value != 1){
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	}
	if(CB10.value != 1){
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	}
	if(CB11.value != 1){
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	}
	if(CB12.value != 1){
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	}
	if(CB13.value != 1){
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;
	}
	if(CB14.value != 1){
    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
	}
	if(CB15.value != 1){
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	}
}
if(stepRef.value === "ToInstructor" || stepRef.value === "ToChair" || stepRef.value === "ToARSC" || stepRef.value === "ToARSCReviewed"){
  if(Instructor1.value == "instructorone"){
   // withdrawalInstructions.visible = false;
   Row1.visible = true;
    Row2.visible = false;
    Row3.visible = false;
    Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  
  if(Instructor2.value == "instructortwo"){
    Row2.visible = true;
    Row1.visible = false;
    Row3.visible = false;
    Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor3.value == "instructorthree"){
    Row3.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor4.value == "instructorfour"){
    Row4.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
   if(Instructor5.value == "instructorfive"){
    Row5.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
     //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor6.value == "instructorsix"){
    Row6.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value =null;
    InstructorName15.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor7.value == "instructorseven"){
    Row7.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor8.value == "instructoreight"){
    Row8.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor9.value == "instructornine"){
    Row9.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor10.value == "instructorten"){
    Row10.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor11.value == "instructoreleven"){
     Row11.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor12.value == "instructortwelve"){
    Row12.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
    Row14.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value =null;
    InstructorName15.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor13.value == "instructorthirteen"){
     Row13.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row12.visible = false;
	Row15.visible = false;
	Row14.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor14.value == "instructorfourteen"){
    Row14.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
  }
   if(Instructor15.value == "instructorfifteen"){
    Row15.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row14.visible = false;
     //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
	
	
  }
  
    
}




        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
 // Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var button = document.getElementsByClassName("rb1");
// When the user clicks the button, open the modal 
  modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};
  document.getElementById("button1").onclick = function(){
    typeOfForm.value = 1;
    modal.style.display = "none";
  };
  document.getElementById("button2").onclick = function(){
    typeOfForm.value = 2;
    headerTextNonMedical.visible = false;
    headerTextMedical.visible = true;
    modal.style.display = "none";
  };
// When the user clicks anywhere outside of the modal, close it
/*window.onclick = function(event) {
  alert("1");
  if (event.target != modal) {
    alert("2");
    if(document.getElementById("button1").checked === true){
      typeOfForm.value = 1;
    modal.style.display = "none";
    }
    else if(document.getElementById("button2").checked === true){
      typeOfForm.value = 2;
    modal.style.display = "none";
    }else{
    modal.style.display = "block";
  }
  }
};*/
}

if(stepRef.value == "ToMedical" || stepRef.value === null)
  {
        supportingDocuments.visible = true;
  }
if(stepRef.value === null)
  {
  StudentSignaturePanel.visible = true;
  StudentSignaturePanel.enabled = true;
  InstructorSignaturePanel.visible = false;
  InstructorSignaturePanel.enabled = false;
  ChairSignaturePanel.visible = false;
  ARSCSignaturePanel.visible = false;
  MedicalReviewSignaturePanel.visible = false;
  }
if(stepRef.value == "ToInstructor"){
 
  typeOfForm.enabled = false;
    caseId.enabled = false;
  studentPetitionSecMedical.visible = false;
  StudentPetitionSecNonMedical.visible = true;
  supportingDocuments.visible = true;
  StudentSignaturePanel.visible = true;
  StudentSignaturePanel.enabled = false;
  InstructorSignaturePanel.visible = true;
  InstructorSignaturePanel.enabled = true;
  ChairSignaturePanel.visible = false;
  ARSCSignaturePanel.visible = false;
  MedicalReviewSignaturePanel.visible = false;
  studentInformation.enabled = false;
  courseWithdrawalInfo.enabled = false;
  studentPetition.enabled = false;
  HiddenSectionPanel.enabled = true;
  }
if(stepRef.value == "ToChair"){
  typeOfForm.enabled = false;
    caseId.enabled = false;
  studentPetitionSecMedical.visible = false;
  StudentPetitionSecNonMedical.visible = true;
  supportingDocuments.visible = true;
  StudentSignaturePanel.visible = true;
  StudentSignaturePanel.enabled = false;
  InstructorSignaturePanel.visible = true;
  InstructorSignaturePanel.enabled = false;
  ChairSignaturePanel.visible = true;
  ChairSignaturePanel.enabled = true;
  ARSCSignaturePanel.visible = false;
  MedicalReviewSignaturePanel.visible = false;
  studentInformation.enabled = false;
  courseWithdrawalInfo.enabled = false;
  studentPetition.enabled = false;
  HiddenSectionPanel.enabled = true;
  }
if(stepRef.value == "ToMedical"){
  typeOfForm.enabled = false;
    caseId.enabled = false;
  studentPetitionSecMedical.visible = true;
  StudentPetitionSecNonMedical.visible = false;
  supportingDocuments.visible = true;
  StudentSignaturePanel.visible = true;
  StudentSignaturePanel.enabled = false;
  InstructorSignaturePanel.visible = false;
  ChairSignaturePanel.visible = false;
  ARSCSignaturePanel.visible = false;
  MedicalReviewSignaturePanel.visible = true;
  MedicalReviewSignaturePanel.enabled = true;
    studentInformation.enabled = false;
  courseWithdrawalInfo.enabled = false;
  studentPetition.enabled = false;
  HiddenSectionPanel.enabled = true;
  }
if(stepRef.value == "ToARSC"){
  typeOfForm.enabled = false;
    caseId.enabled = false;
  supportingDocuments.visible = true;
  StudentSignaturePanel.visible = true;
  StudentSignaturePanel.enabled = false;
  InstructorSignaturePanel.visible = true;
  InstructorSignaturePanel.enabled = false;
  ChairSignaturePanel.visible = true;
  ChairSignaturePanel.enabled = false;
  studentPetitionSecMedical.visible = false;
  StudentPetitionSecNonMedical.visible = true;
  ARSCSignaturePanel.visible = true;
  //MedicalReviewerSign.value = "NA";
  MedicalReviewDate.value = "NA";
  MedicalReviewComment.value = "NA";
  RecommendMedical.value = "NA";
  MedicalReviewSignaturePanel.visible = false;
  studentInformation.enabled = false;
  courseWithdrawalInfo.enabled = false;
  studentPetition.enabled = false;
  HiddenSectionPanel.enabled = true;
  
}
if(stepRef.value == "ToMedicalARSC"){
  typeOfForm.enabled = false;
    caseId.enabled = false;
  studentPetitionSecMedical.visible = true;
  StudentPetitionSecNonMedical.visible = false;
  supportingDocuments.visible = false;
  StudentSignaturePanel.visible = true;
  StudentSignaturePanel.enabled = false;
  
  InstructorSignaturePanel.visible = false;
  ChairSignaturePanel.visible = false;
  ARSCSignaturePanel.visible = true;
    studentInformation.enabled = false;
  courseWithdrawalInfo.enabled = false;
  studentPetition.enabled = false;
  HiddenSectionPanel.enabled = true;
//  InstructorSign.value = "NA";
  InstructorReviewDate.value = "NA";
  InstructorComment.value = "NA";
 LastdateAttended.value = "NA";
  Grade.value = "NA";
//  ChairSign.value = "NA";
  ChairComment.value = "NA";
  ChairReviewDate.value = "NA";
 
  MedicalReviewSignaturePanel.visible = true;
   MedicalReviewSignaturePanel.enabled = false;
  }
if(stepRef.value == "ToARSCReviewed")
  {
    typeOfForm.enabled = false;
    caseId.enabled = false;
    studentInformationCommonPanel.enabled = false;
    courseWithdrawalInfo.enabled = false;
    studentPetition.enabled = false;
    approvaAndSignature.enabled = false;
    supportingDocuments.visible = true;
    MedicalReviewSignaturePanel.visible = false;
     }
if(stepRef.value == "ToMedicalARSCReviewed")
  {
    typeOfForm.enabled = false;
    caseId.enabled = false;
    studentInformationCommonPanel.enabled = false;
    courseWithdrawalInfo.enabled = false;
    studentPetition.enabled = false;
    approvaAndSignature.enabled = false;
    supportingDocuments.visible = false;
    InstructorSignaturePanel.visible = false;
    ChairSignaturePanel.visible = false;
    }
if(stepRef.value === "ToMedical" || stepRef.value === "ToMedicalARSC" || stepRef.value == "ToMedicalARSCReviewed"){
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  if(CB1.value == 1){
    Row1.visible = true;
    }else{
      Row1.visible = false;
    }
  if(CB2.value == 1){
    Row2.visible = true;
      }
  else{
      Row2.visible = false;
    }
  if(CB3.value == 1){
    Row3.visible = true;
     }
  else{
      Row3.visible = false;
    }
	if(CB4.value == 1){
    Row4.visible = true;
     }
  else{
      Row4.visible = false;
    }
	if(CB5.value == 1){
    Row5.visible = true;
     }
  else{
      Row5.visible = false;
    }
	if(CB6.value == 1){
    Row6.visible = true;
     }
  else{
      Row6.visible = false;
    }
	if(CB7.value == 1){
    Row7.visible = true;
     }
  else{
      Row7.visible = false;
    }
	if(CB8.value == 1){
    Row8.visible = true;
     }
  else{
      Row8.visible = false;
    }
	if(CB9.value == 1){
    Row9.visible = true;
     }
  else{
      Row9.visible = false;
    }
	if(CB10.value == 1){
    Row10.visible = true;
     }
  else{
      Row10.visible = false;
    }
	if(CB11.value == 1){
    Row11.visible = true;
     }
  else{
      Row11.visible = false;
    }
	if(CB12.value == 1){
    Row12.visible = true;
     }
  else{
      Row12.visible = false;
    }
	if(CB13.value == 1){
    Row13.visible = true;
     }
  else{
      Row13.visible = false;
    }
	if(CB14.value == 1){
    Row14.visible = true;
     }
  else{
      Row14.visible = false;
    }
	if(CB15.value == 1){
    Row15.visible = true;
     }
  else{
      Row15.visible = false;
    }
   if(CB1.value != 1){
    //Row2
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	}
    if(CB2.value != 1){
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	}
	if(CB3.value != 1){
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	}
	if(CB4.value != 1){
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	}
	if(CB5.value != 1){
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	}
	if(CB6.value != 1){
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	}
	if(CB7.value != 1){
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	}
	if(CB8.value != 1){
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	}
	if(CB9.value != 1){
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	}
	if(CB10.value != 1){
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	}
	if(CB11.value != 1){
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	}
	if(CB12.value != 1){
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	}
	if(CB13.value != 1){
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;
	}
	if(CB14.value != 1){
    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
	}
	if(CB15.value != 1){
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	}
}
if(stepRef.value === "ToInstructor" || stepRef.value === "ToChair" || stepRef.value === "ToARSC" || stepRef.value === "ToARSCReviewed"){
  if(Instructor1.value == "instructorone"){
   Row1.visible = true;
    Row2.visible = false;
    Row3.visible = false;
    Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  
  if(Instructor2.value == "instructortwo"){
    Row2.visible = true;
    Row1.visible = false;
    Row3.visible = false;
    Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor3.value == "instructorthree"){
    Row3.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor4.value == "instructorfour"){
    Row4.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
   if(Instructor5.value == "instructorfive"){
    Row5.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
     //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor6.value == "instructorsix"){
    Row6.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value =null;
    InstructorName15.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor7.value == "instructorseven"){
    Row7.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor8.value == "instructoreight"){
    Row8.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor9.value == "instructornine"){
    Row9.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor10.value == "instructorten"){
    Row10.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row11.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor11.value == "instructoreleven"){
     Row11.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row14.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor12.value == "instructortwelve"){
    Row12.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
    Row14.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value =null;
    InstructorName15.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor13.value == "instructorthirteen"){
     Row13.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row12.visible = false;
	Row15.visible = false;
	Row14.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
  }
  if(Instructor14.value == "instructorfourteen"){
    Row14.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row15.visible = false;
    //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row15
    CourseNo15.value = null;
    ScheduleNo15.value = null;
    UnitNo15.value = null;
    InstructorName15.value =null;
  }
   if(Instructor15.value == "instructorfifteen"){
    Row15.visible = true;
    Row1.visible = false;
    Row2.visible = false;
    Row3.visible = false;
	Row4.visible = false;
	Row5.visible = false;
	Row6.visible = false;
	Row7.visible = false;
	Row8.visible = false;
	Row9.visible = false;
	Row10.visible = false;
	Row11.visible = false;
	Row12.visible = false;
	Row13.visible = false;
	Row14.visible = false;
     //Row1
    CourseNo1.value = null;
    ScheduleNo1.value = null;
    UnitNo1.value = null;
    InstructorName1.value = null;
	
    //Row2
    CourseNo2.value = null;
    ScheduleNo2.value = null;
    UnitNo2.value = null;
    InstructorName2.value = null;
	
    //Row3
    CourseNo3.value = null;
    ScheduleNo3.value = null;
    UnitNo3.value = null;
    InstructorName3.value =null;
	
    //Row4
    CourseNo4.value = null;
    ScheduleNo4.value = null;
    UnitNo4.value = null;
    InstructorName4.value =null;
	
    //Row5
    CourseNo5.value = null;
    ScheduleNo5.value = null;
    UnitNo5.value = null;
    InstructorName5.value =null;
	
    //Row6
    CourseNo6.value = null;
    ScheduleNo6.value = null;
    UnitNo6.value =null;
    InstructorName6.value =null;
	
    //Row7
    CourseNo7.value = null;
    ScheduleNo7.value = null;
    UnitNo7.value = null;
    InstructorName7.value =null;
	
    //Row8
    CourseNo8.value = null;
    ScheduleNo8.value = null;
    UnitNo8.value = null;
    InstructorName8.value =null;
	
    //Row9
    CourseNo9.value = null;
    ScheduleNo9.value = null;
    UnitNo9.value = null;
    InstructorName9.value =null;
	
    //Row10
    CourseNo10.value = null;
    ScheduleNo10.value = null;
    UnitNo10.value = null;
    InstructorName10.value =null;
	
    //Row11
    CourseNo11.value = null;
    ScheduleNo11.value = null;
    UnitNo11.value = null;
    InstructorName11.value =null;
	
    //Row12
    CourseNo12.value = null;
    ScheduleNo12.value = null;
    UnitNo12.value =null;
    InstructorName12.value =null;
	
    //Row13
    CourseNo13.value = null;
    ScheduleNo13.value = null;
    UnitNo13.value = null;
    InstructorName13.value =null;

    //Row14
    CourseNo14.value = null;
    ScheduleNo14.value = null;
    UnitNo14.value = null;
    InstructorName14.value =null;
	
	
  }
  
    
}
if(stepRef.value === null){
var resData = {"CWID":"802886937","FNAME":"Natalie","LNAME":"Anderson","MAJOR_DESCR":"Business Administration (Accounting)","DEGREE_TYPE":"BA","STUDENT_EMAIL":"mshaner@fullerton.edu","STUDENT_PHONE":"7457891080","EXPECTED_GRD_DATE":"4\/16\/2022","CASEID":"1000997","TERM_CODE":"2193","TERM_DESCR":"Spring 2019","MCBE":"No","COURSES":[{"CLASS_NBR":"10436","CRSE_NAME":"ACCT 402","UNT_TAKEN":"1","INSTR_NAME":"Lynch,Edward J","INSTR_CWID":"888943925","INSTR_USERID":"nvadlakunta","INSTR_EMAIL":"nvadlakunta@fullerton.edu","CHAIR_NAME":"Yash Jayaram","CHAIR_CWID":"806225686","CHAIR_USERID":"inat","CHAIR_EMAIL":"inat@fullerton.edu"},{"CLASS_NBR":"10801","CRSE_NAME":"ECON 315","UNT_TAKEN":"2","INSTR_NAME":"Fleissig,Adrian R","INSTR_CWID":"899771000","INSTR_USERID":"nvadlakunta","INSTR_EMAIL":"nvadlakunta@fullerton.edu","CHAIR_NAME":"Yash Jayaram","CHAIR_CWID":"806225686","CHAIR_USERID":"inat","CHAIR_EMAIL":"inat@fullerton.edu"},{"CLASS_NBR":"10437","CRSE_NAME":"ACCT 402","UNT_TAKEN":"3","INSTR_NAME":"Lynch,Edward J","INSTR_CWID":"888943925","INSTR_USERID":"nvadlakunta","INSTR_EMAIL":"nvadlakunta@fullerton.edu","CHAIR_NAME":"Yash Jayaram","CHAIR_CWID":"806225686","CHAIR_USERID":"inat","CHAIR_EMAIL":"inat@fullerton.edu"},{"CLASS_NBR":"10437","CRSE_NAME":"ACCT 402","UNT_TAKEN":"4","INSTR_NAME":"Lynch,Edward J","INSTR_CWID":"888943925","INSTR_USERID":"nvadlakunta","INSTR_EMAIL":"nvadlakunta@fullerton.edu","CHAIR_NAME":"Yash Jayaram","CHAIR_CWID":"806225686","CHAIR_USERID":"inat","CHAIR_EMAIL":"inat@fullerton.edu"}]};
var tItems;
var responselength =  resData.COURSES.length;
//alert(Row1.value);
if(responselength == 1)
  {
    Row1.visible = true;
    Row2.visible = false;
    Row3.visible = false;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
for(tItems in resData.COURSES)
{
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    //var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	//Row1
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
      
}
//For length 2
if(responselength == 2)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = false;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in resData.COURSES)
{
  if(tItems == "0"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
  if(tItems == "1"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row2.CourseNo2.value = courseNo;
    Row2.ScheduleNo2.value = schNo;
    Row2.UnitNo2.value = noOfUnits;
    InstructorName2.value = instName;
  }
}
     }
//For length 3
if(responselength == 3)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in resData.COURSES)
{
  if(tItems == "0"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	ChairName1.value = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
  if(tItems == "1"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	ChairName2.value = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row2.CourseNo2.value = courseNo;
    Row2.ScheduleNo2.value = schNo;
    Row2.UnitNo2.value = noOfUnits;
    InstructorName2.value = instName;
  }
  if(tItems == "2"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	ChairName3.value = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo3.value = courseNo;
    ScheduleNo3.value = schNo;
    UnitNo3.value = noOfUnits;
    InstructorName3.value = instName;
  }
}
}
//For length 4
if(responselength == 4)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in resData.COURSES)
{
  if(tItems == "0"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
  if(tItems == "1"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row2.CourseNo2.value = courseNo;
    Row2.ScheduleNo2.value = schNo;
    Row2.UnitNo2.value = noOfUnits;
    InstructorName2.value = instName;
  }
  if(tItems == "2"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo3.value = courseNo;
    ScheduleNo3.value = schNo;
    UnitNo3.value = noOfUnits;
    InstructorName3.value = instName;
  }
  if(tItems == "3"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo4.value = courseNo;
    ScheduleNo4.value = schNo;
    UnitNo4.value = noOfUnits;
    InstructorName4.value = instName;
  }
}
}
//For length 5
if(responselength == 5)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in resData.COURSES)
{
  if(tItems == "0"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
  if(tItems == "1"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row2.CourseNo2.value = courseNo;
    Row2.ScheduleNo2.value = schNo;
    Row2.UnitNo2.value = noOfUnits;
    InstructorName2.value = instName;
  }
  if(tItems == "2"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo3.value = courseNo;
    ScheduleNo3.value = schNo;
    UnitNo3.value = noOfUnits;
    InstructorName3.value = instName;
  }
  if(tItems == "3"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo4.value = courseNo;
    ScheduleNo4.value = schNo;
    UnitNo4.value = noOfUnits;
    InstructorName4.value = instName;
  }
  if(tItems == "4"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo5.value = courseNo;
    ScheduleNo5.value = schNo;
    UnitNo5.value = noOfUnits;
    InstructorName5.value = instName;
  }
}
}
  //For length 6
if(responselength == 6)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in resData.COURSES)
{
  if(tItems == "0"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
  if(tItems == "1"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row2.CourseNo2.value = courseNo;
    Row2.ScheduleNo2.value = schNo;
    Row2.UnitNo2.value = noOfUnits;
    InstructorName2.value = instName;
  }
  if(tItems == "2"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo3.value = courseNo;
    ScheduleNo3.value = schNo;
    UnitNo3.value = noOfUnits;
    InstructorName3.value = instName;
  }
  if(tItems == "3"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo4.value = courseNo;
    ScheduleNo4.value = schNo;
    UnitNo4.value = noOfUnits;
    InstructorName4.value = instName;
  }
  if(tItems == "4"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo5.value = courseNo;
    ScheduleNo5.value = schNo;
    UnitNo5.value = noOfUnits;
    InstructorName5.value = instName;
  }
  if(tItems == "5"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo6.value = courseNo;
    ScheduleNo6.value = schNo;
    UnitNo6.value = noOfUnits;
    InstructorName6.value = instName;
  }
}
}
//For length 7
if(responselength == 7)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in resData.COURSES)
{
  if(tItems == "0"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
  if(tItems == "1"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row2.CourseNo2.value = courseNo;
    Row2.ScheduleNo2.value = schNo;
    Row2.UnitNo2.value = noOfUnits;
    InstructorName2.value = instName;
  }
  if(tItems == "2"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo3.value = courseNo;
    ScheduleNo3.value = schNo;
    UnitNo3.value = noOfUnits;
    InstructorName3.value = instName;
  }
  if(tItems == "3"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo4.value = courseNo;
    ScheduleNo4.value = schNo;
    UnitNo4.value = noOfUnits;
    InstructorName4.value = instName;
  }
  if(tItems == "4"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo5.value = courseNo;
    ScheduleNo5.value = schNo;
    UnitNo5.value = noOfUnits;
    InstructorName5.value = instName;
  }
  if(tItems == "5"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo6.value = courseNo;
    ScheduleNo6.value = schNo;
    UnitNo6.value = noOfUnits;
    InstructorName6.value = instName;
  }
  if(tItems == "6"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo7.value = courseNo;
    ScheduleNo7.value = schNo;
    UnitNo7.value = noOfUnits;
    InstructorName7.value = instName;
  }
}
}
//For length 8
if(responselength == 8)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in resData.COURSES)
{
  if(tItems == "0"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
  if(tItems == "1"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row2.CourseNo2.value = courseNo;
    Row2.ScheduleNo2.value = schNo;
    Row2.UnitNo2.value = noOfUnits;
    InstructorName2.value = instName;
  }
  if(tItems == "2"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo3.value = courseNo;
    ScheduleNo3.value = schNo;
    UnitNo3.value = noOfUnits;
    InstructorName3.value = instName;
  }
  if(tItems == "3"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo4.value = courseNo;
    ScheduleNo4.value = schNo;
    UnitNo4.value = noOfUnits;
    InstructorName4.value = instName;
  }
  if(tItems == "4"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo5.value = courseNo;
    ScheduleNo5.value = schNo;
    UnitNo5.value = noOfUnits;
    InstructorName5.value = instName;
  }
  if(tItems == "5"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo6.value = courseNo;
    ScheduleNo6.value = schNo;
    UnitNo6.value = noOfUnits;
    InstructorName6.value = instName;
  }
  if(tItems == "6"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo7.value = courseNo;
    ScheduleNo7.value = schNo;
    UnitNo7.value = noOfUnits;
    InstructorName7.value = instName;
  }
  if(tItems == "7"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo8.value = courseNo;
    ScheduleNo8.value = schNo;
    UnitNo8.value = noOfUnits;
    InstructorName8.value = instName;
  }
}
}
//For length 9
if(responselength == 9)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in resData.COURSES)
{
  if(tItems == "0"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
  if(tItems == "1"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row2.CourseNo2.value = courseNo;
    Row2.ScheduleNo2.value = schNo;
    Row2.UnitNo2.value = noOfUnits;
    InstructorName2.value = instName;
  }
  if(tItems == "2"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo3.value = courseNo;
    ScheduleNo3.value = schNo;
    UnitNo3.value = noOfUnits;
    InstructorName3.value = instName;
  }
  if(tItems == "3"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo4.value = courseNo;
    ScheduleNo4.value = schNo;
    UnitNo4.value = noOfUnits;
    InstructorName4.value = instName;
  }
  if(tItems == "4"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo5.value = courseNo;
    ScheduleNo5.value = schNo;
    UnitNo5.value = noOfUnits;
    InstructorName5.value = instName;
  }
  if(tItems == "5"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo6.value = courseNo;
    ScheduleNo6.value = schNo;
    UnitNo6.value = noOfUnits;
    InstructorName6.value = instName;
  }
  if(tItems == "6"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo7.value = courseNo;
    ScheduleNo7.value = schNo;
    UnitNo7.value = noOfUnits;
    InstructorName7.value = instName;
  }
  if(tItems == "7"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo8.value = courseNo;
    ScheduleNo8.value = schNo;
    UnitNo8.value = noOfUnits;
    InstructorName8.value = instName;
  }
  if(tItems == "8"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo9.value = courseNo;
    ScheduleNo9.value = schNo;
    UnitNo9.value = noOfUnits;
    InstructorName9.value = instName;
  }
}
}
//For length 10
if(responselength == 10)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in resData.COURSES)
{
  if(tItems == "0"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
  if(tItems == "1"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row2.CourseNo2.value = courseNo;
    Row2.ScheduleNo2.value = schNo;
    Row2.UnitNo2.value = noOfUnits;
    InstructorName2.value = instName;
  }
  if(tItems == "2"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo3.value = courseNo;
    ScheduleNo3.value = schNo;
    UnitNo3.value = noOfUnits;
    InstructorName3.value = instName;
  }
  if(tItems == "3"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo4.value = courseNo;
    ScheduleNo4.value = schNo;
    UnitNo4.value = noOfUnits;
    InstructorName4.value = instName;
  }
  if(tItems == "4"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo5.value = courseNo;
    ScheduleNo5.value = schNo;
    UnitNo5.value = noOfUnits;
    InstructorName5.value = instName;
  }
  if(tItems == "5"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo6.value = courseNo;
    ScheduleNo6.value = schNo;
    UnitNo6.value = noOfUnits;
    InstructorName6.value = instName;
  }
  if(tItems == "6"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo7.value = courseNo;
    ScheduleNo7.value = schNo;
    UnitNo7.value = noOfUnits;
    InstructorName7.value = instName;
  }
  if(tItems == "7"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo8.value = courseNo;
    ScheduleNo8.value = schNo;
    UnitNo8.value = noOfUnits;
    InstructorName8.value = instName;
  }
  if(tItems == "8"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo9.value = courseNo;
    ScheduleNo9.value = schNo;
    UnitNo9.value = noOfUnits;
    InstructorName9.value = instName;
  }
  if(tItems == "9"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo10.value = courseNo;
    ScheduleNo10.value = schNo;
    UnitNo10.value = noOfUnits;
    InstructorName10.value = instName;
  }
}
}
//For length 11
if(responselength == 11)
  {
  alert("11");
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in resData.COURSES)
{
  if(tItems == "0"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
  if(tItems == "1"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row2.CourseNo2.value = courseNo;
    Row2.ScheduleNo2.value = schNo;
    Row2.UnitNo2.value = noOfUnits;
    InstructorName2.value = instName;
  }
  if(tItems == "2"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo3.value = courseNo;
    ScheduleNo3.value = schNo;
    UnitNo3.value = noOfUnits;
    InstructorName3.value = instName;
  }
  if(tItems == "3"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo4.value = courseNo;
    ScheduleNo4.value = schNo;
    UnitNo4.value = noOfUnits;
    InstructorName4.value = instName;
  }
  if(tItems == "4"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo5.value = courseNo;
    ScheduleNo5.value = schNo;
    UnitNo5.value = noOfUnits;
    InstructorName5.value = instName;
  }
  if(tItems == "5"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo6.value = courseNo;
    ScheduleNo6.value = schNo;
    UnitNo6.value = noOfUnits;
    InstructorName6.value = instName;
  }
  if(tItems == "6"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo7.value = courseNo;
    ScheduleNo7.value = schNo;
    UnitNo7.value = noOfUnits;
    InstructorName7.value = instName;
  }
  if(tItems == "7"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo8.value = courseNo;
    ScheduleNo8.value = schNo;
    UnitNo8.value = noOfUnits;
    InstructorName8.value = instName;
  }
  if(tItems == "8"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo9.value = courseNo;
    ScheduleNo9.value = schNo;
    UnitNo9.value = noOfUnits;
    InstructorName9.value = instName;
  }
  if(tItems == "9"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo10.value = courseNo;
    ScheduleNo10.value = schNo;
    UnitNo10.value = noOfUnits;
    InstructorName10.value = instName;
  }
  if(tItems == "10"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo11.value = courseNo;
    ScheduleNo11.value = schNo;
    UnitNo11.value = noOfUnits;
    InstructorName11.value = instName;
  }
}
}
//For length 12
if(responselength == 12)
  {
  alert("12");
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in resData.COURSES)
{
  if(tItems == "0"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
  if(tItems == "1"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row2.CourseNo2.value = courseNo;
    Row2.ScheduleNo2.value = schNo;
    Row2.UnitNo2.value = noOfUnits;
    InstructorName2.value = instName;
  }
  if(tItems == "2"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo3.value = courseNo;
    ScheduleNo3.value = schNo;
    UnitNo3.value = noOfUnits;
    InstructorName3.value = instName;
  }
  if(tItems == "3"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo4.value = courseNo;
    ScheduleNo4.value = schNo;
    UnitNo4.value = noOfUnits;
    InstructorName4.value = instName;
  }
  if(tItems == "4"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo5.value = courseNo;
    ScheduleNo5.value = schNo;
    UnitNo5.value = noOfUnits;
    InstructorName5.value = instName;
  }
  if(tItems == "5"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo6.value = courseNo;
    ScheduleNo6.value = schNo;
    UnitNo6.value = noOfUnits;
    InstructorName6.value = instName;
  }
  if(tItems == "6"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo7.value = courseNo;
    ScheduleNo7.value = schNo;
    UnitNo7.value = noOfUnits;
    InstructorName7.value = instName;
  }
  if(tItems == "7"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo8.value = courseNo;
    ScheduleNo8.value = schNo;
    UnitNo8.value = noOfUnits;
    InstructorName8.value = instName;
  }
  if(tItems == "8"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo9.value = courseNo;
    ScheduleNo9.value = schNo;
    UnitNo9.value = noOfUnits;
    InstructorName9.value = instName;
  }
  if(tItems == "9"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo10.value = courseNo;
    ScheduleNo10.value = schNo;
    UnitNo10.value = noOfUnits;
    InstructorName10.value = instName;
  }
  if(tItems == "10"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo11.value = courseNo;
    ScheduleNo11.value = schNo;
    UnitNo11.value = noOfUnits;
    InstructorName11.value = instName;
  }
  if(tItems == "11"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo12.value = courseNo;
    ScheduleNo12.value = schNo;
    UnitNo12.value = noOfUnits;
    InstructorName12.value = instName;
  }
}
}
//For length 13
if(responselength == 13)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in resData.COURSES)
{
  if(tItems == "0"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
  if(tItems == "1"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row2.CourseNo2.value = courseNo;
    Row2.ScheduleNo2.value = schNo;
    Row2.UnitNo2.value = noOfUnits;
    InstructorName2.value = instName;
  }
  if(tItems == "2"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo3.value = courseNo;
    ScheduleNo3.value = schNo;
    UnitNo3.value = noOfUnits;
    InstructorName3.value = instName;
  }
  if(tItems == "3"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo4.value = courseNo;
    ScheduleNo4.value = schNo;
    UnitNo4.value = noOfUnits;
    InstructorName4.value = instName;
  }
  if(tItems == "4"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo5.value = courseNo;
    ScheduleNo5.value = schNo;
    UnitNo5.value = noOfUnits;
    InstructorName5.value = instName;
  }
  if(tItems == "5"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo6.value = courseNo;
    ScheduleNo6.value = schNo;
    UnitNo6.value = noOfUnits;
    InstructorName6.value = instName;
  }
  if(tItems == "6"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo7.value = courseNo;
    ScheduleNo7.value = schNo;
    UnitNo7.value = noOfUnits;
    InstructorName7.value = instName;
  }
  if(tItems == "7"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo8.value = courseNo;
    ScheduleNo8.value = schNo;
    UnitNo8.value = noOfUnits;
    InstructorName8.value = instName;
  }
  if(tItems == "8"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo9.value = courseNo;
    ScheduleNo9.value = schNo;
    UnitNo9.value = noOfUnits;
    InstructorName9.value = instName;
  }
  if(tItems == "9"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo10.value = courseNo;
    ScheduleNo10.value = schNo;
    UnitNo10.value = noOfUnits;
    InstructorName10.value = instName;
  }
  if(tItems == "10"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo11.value = courseNo;
    ScheduleNo11.value = schNo;
    UnitNo11.value = noOfUnits;
    InstructorName11.value = instName;
  }
  if(tItems == "11"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo12.value = courseNo;
    ScheduleNo12.value = schNo;
    UnitNo12.value = noOfUnits;
    InstructorName12.value = instName;
  }
  if(tItems == "12"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo13.value = courseNo;
    ScheduleNo13.value = schNo;
    UnitNo13.value = noOfUnits;
    InstructorName13.value = instName;
  }
}
}
//For length 14
if(responselength == 14)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = true;
    Row15.visible = false;
  
  for(tItems in resData.COURSES)
{
  if(tItems == "0"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
  if(tItems == "1"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row2.CourseNo2.value = courseNo;
    Row2.ScheduleNo2.value = schNo;
    Row2.UnitNo2.value = noOfUnits;
    InstructorName2.value = instName;
  }
  if(tItems == "2"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo3.value = courseNo;
    ScheduleNo3.value = schNo;
    UnitNo3.value = noOfUnits;
    InstructorName3.value = instName;
  }
  if(tItems == "3"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo4.value = courseNo;
    ScheduleNo4.value = schNo;
    UnitNo4.value = noOfUnits;
    InstructorName4.value = instName;
  }
  if(tItems == "4"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo5.value = courseNo;
    ScheduleNo5.value = schNo;
    UnitNo5.value = noOfUnits;
    InstructorName5.value = instName;
  }
  if(tItems == "5"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo6.value = courseNo;
    ScheduleNo6.value = schNo;
    UnitNo6.value = noOfUnits;
    InstructorName6.value = instName;
  }
  if(tItems == "6"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo7.value = courseNo;
    ScheduleNo7.value = schNo;
    UnitNo7.value = noOfUnits;
    InstructorName7.value = instName;
  }
  if(tItems == "7"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo8.value = courseNo;
    ScheduleNo8.value = schNo;
    UnitNo8.value = noOfUnits;
    InstructorName8.value = instName;
  }
  if(tItems == "8"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo9.value = courseNo;
    ScheduleNo9.value = schNo;
    UnitNo9.value = noOfUnits;
    InstructorName9.value = instName;
  }
  if(tItems == "9"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo10.value = courseNo;
    ScheduleNo10.value = schNo;
    UnitNo10.value = noOfUnits;
    InstructorName10.value = instName;
  }
  if(tItems == "10"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo11.value = courseNo;
    ScheduleNo11.value = schNo;
    UnitNo11.value = noOfUnits;
    InstructorName11.value = instName;
  }
  if(tItems == "11"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo12.value = courseNo;
    ScheduleNo12.value = schNo;
    UnitNo12.value = noOfUnits;
    InstructorName12.value = instName;
  }
  if(tItems == "12"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo13.value = courseNo;
    ScheduleNo13.value = schNo;
    UnitNo13.value = noOfUnits;
    InstructorName13.value = instName;
  }
  if(tItems == "13"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo14.value = courseNo;
    ScheduleNo14.value = schNo;
    UnitNo14.value = noOfUnits;
    InstructorName14.value = instName;
  }
}
}
//For length 15
if(responselength == 15)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = true;
    Row15.visible = true;
  
  for(tItems in resData.COURSES)
{
  if(tItems == "0"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row1.CourseNo1.value = courseNo;
    Row1.ScheduleNo1.value = schNo;
    Row1.UnitNo1.value = noOfUnits;
    Row1.InstructorName1.value = instName;
    }
  if(tItems == "1"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	Row2.CourseNo2.value = courseNo;
    Row2.ScheduleNo2.value = schNo;
    Row2.UnitNo2.value = noOfUnits;
    InstructorName2.value = instName;
  }
  if(tItems == "2"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo3.value = courseNo;
    ScheduleNo3.value = schNo;
    UnitNo3.value = noOfUnits;
    InstructorName3.value = instName;
  }
  if(tItems == "3"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo4.value = courseNo;
    ScheduleNo4.value = schNo;
    UnitNo4.value = noOfUnits;
    InstructorName4.value = instName;
  }
  if(tItems == "4"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo5.value = courseNo;
    ScheduleNo5.value = schNo;
    UnitNo5.value = noOfUnits;
    InstructorName5.value = instName;
  }
  if(tItems == "5"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo6.value = courseNo;
    ScheduleNo6.value = schNo;
    UnitNo6.value = noOfUnits;
    InstructorName6.value = instName;
  }
  if(tItems == "6"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo7.value = courseNo;
    ScheduleNo7.value = schNo;
    UnitNo7.value = noOfUnits;
    InstructorName7.value = instName;
  }
  if(tItems == "7"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo8.value = courseNo;
    ScheduleNo8.value = schNo;
    UnitNo8.value = noOfUnits;
    InstructorName8.value = instName;
  }
  if(tItems == "8"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo9.value = courseNo;
    ScheduleNo9.value = schNo;
    UnitNo9.value = noOfUnits;
    InstructorName9.value = instName;
  }
  if(tItems == "9"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo10.value = courseNo;
    ScheduleNo10.value = schNo;
    UnitNo10.value = noOfUnits;
    InstructorName10.value = instName;
  }
  if(tItems == "10"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo11.value = courseNo;
    ScheduleNo11.value = schNo;
    UnitNo11.value = noOfUnits;
    InstructorName11.value = instName;
  }
  if(tItems == "11"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo12.value = courseNo;
    ScheduleNo12.value = schNo;
    UnitNo12.value = noOfUnits;
    InstructorName12.value = instName;
  }
  if(tItems == "12"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo13.value = courseNo;
    ScheduleNo13.value = schNo;
    UnitNo13.value = noOfUnits;
    InstructorName13.value = instName;
  }
  if(tItems == "13"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo14.value = courseNo;
    ScheduleNo14.value = schNo;
    UnitNo14.value = noOfUnits;
    InstructorName14.value = instName;
  }
   if(tItems == "14"){
    var schNo = resData.COURSES[tItems].CLASS_NBR;
	var courseNo = resData.COURSES[tItems].CRSE_NAME;
	var noOfUnits = resData.COURSES[tItems].UNT_TAKEN;
	var instName = resData.COURSES[tItems].INSTR_NAME;
    // var instCwId = resData.COURSES[tItems].INSTR_CWID;
	//var instUserId = resData.COURSES[tItems].INSTR_USERID;
	//var instEmail = resData.COURSES[tItems].INSTR_EMAIL;
	//var chairName = resData.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = resData.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = resData.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = resData.COURSES[tItems].CHAIR_EMAIL;
	CourseNo15.value = courseNo;
    ScheduleNo15.value = schNo;
    UnitNo15.value = noOfUnits;
    InstructorName15.value = instName;
  }
}
}
}
debugger;
if(stepRef.value === null){
  supportingDocuments.visible = true;
}else{
  supportingDocuments.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef!== null){
  document.getElementById('').style.display = "none";
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_guideRootPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_guideRootPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value !== null){
  document.getElementById("splCharAlert").style.display = "none"; 
  document.getElementById("extAlert").style.display = "none";
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_guideRootPanel_init4
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_guideRootPanel_init4 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.enabled = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_withdrawalInstructionButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_withdrawalInstructionButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            	

//nonMedInstructionsPanel.visible = false;
//NonMedicalWithdrawal.visible = true; 
//basicInformation.visible = true;
//mainSubmit.visible = true;

if (studentAgreement.value === '' || studentAgreement.value === null){
 alert ("Please accept that you have read and understood the process of medical and non-medical withdrawal");
  this.visible = true;
  //nonMedInstructionsPanel.visible = true;
//NonMedicalWithdrawal.visible = false; 
//basicInformation.visible = false;
//mainSubmit.visible = false;
medInstructionsPanel.visible = true;

}
else{

basicInformation.visible =true;
NonMedicalWithdrawal.visible = true;
mainSubmit.visible = true;
//Modal popup
if(stepRef.value === null){
 // Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var button = document.getElementsByClassName("rb1");
// When the user clicks the button, open the modal 
 modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
/*span.onclick = function() {
  modal.style.display = "none";
};*/
  span.onclick = function() {
  if((document.getElementById("button1").checked === false) && (document.getElementById("button2").checked === false)){
    modal.style.display = "block";
    //alert("Please select the withdrawal type");
    document.getElementById("mandatorySelectionAlert").style.display = "block"; 
   /* document.getElementById("mandatorySelectionAlertCloseBtn").onclick = function() {
    document.getElementById("mandatorySelectionAlert").style.display = "none";
    };*/
   document.getElementById("okBtnId4").onclick = function() {
   document.getElementById("mandatorySelectionAlert").style.display = "none";
   };

  }else{
     modal.style.display = "none";
  }
 
};
   
  document.getElementById("button1").onclick = function(){
    typeOfForm.value = 1;
    supportDoc1.fileAttachment.mandatory = "";
   // noRecordMsgMed.visible = false;
   // noRecordMsgNonMed.visible = true;
    headerTextNonMedical.visible = true;
    headerTextMedical.visible = false;
    studentHeaderTextMed.visible = false;
    studentHeaderTextNonMed.visible = true;
    modal.style.display = "none";
  };
  document.getElementById("button2").onclick = function(){
    typeOfForm.value = 2;
   // noRecordMsgMed.visible = true;
   // noRecordMsgNonMed.visible = false;
    supportDoc1.fileAttachment.mandatory = "error";
    headerTextNonMedical.visible = false;
    headerTextMedical.visible = true;
    studentHeaderTextMed.visible = true;
  studentHeaderTextNonMed.visible = false;
    modal.style.display = "none";
  };
// When the user clicks anywhere outside of the modal, close it
/*window.onclick = function(event) {
  alert("1");
  if (event.target != modal) {
    alert("2");
    if(document.getElementById("button1").checked === true){
      typeOfForm.value = 1;
    modal.style.display = "none";
    }
    else if(document.getElementById("button2").checked === true){
      typeOfForm.value = 2;
    modal.style.display = "none";
    }else{
    modal.style.display = "block";
  }
  }
};*/
}
    this.visible = false;
 	withdrawalInstructions.visible = false;
  	studentAgreement.visible = false;
}

        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_typeOfForm_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_typeOfForm_init0 = function (scope) {
    with(this) {
        with(scope) {
             Email.value = "chaitanya.sai@thoughtfocus.com";

if(stepRef.value === null){
 
  


$.ajax({
type: 'GET',
url:"/bin/getLoggedUserId",
dataType: 'json',
success: function(myresponse){
   
if(myresponse.Status == "Success"){
  
var userValue=myresponse.userId;
//alert("userValue="+userValue);
logUser.value = userValue;
if(stepRef.value === null){
//var cwid = "891673535";
DataUnavailableText.visible = false;
loadingText.visible = true;
  
var userId = userValue;
//var userId = userValue;
var typeOfWithdrawal = typeOfForm.value;
//var term = "2245";
  var term = "2255";
  userId= "siddman2002";
//userId = "steven.gellman"; 
//userId = "nkaroglu";
workflow_initiator.value = userId;
$.ajax({

    type: 'GET',

    //url: "/bin/getCourseInfoSummerWinterSession",
   //url: "/bin/getCourseInfoSpringFallSession",
   //
   url: "/bin/getCourseInfoSummerWinterSessionUpdatedTest",



    data: {
        userId: userId,
        term: term,
        typeOfWithdrawal : typeOfWithdrawal
    },

    dataType: 'json',

    success: function(myresponse) {
    
    ProgramPlan.value = myresponse.PROGRAM_PLAN;
    LastName.value = myresponse.LNAME;
    FirstName.value = myresponse.FNAME;
  //  Email.value = myresponse.STUDENT_EMAIL;
       Email.value = "chaitanya.sai@thoughtfocus.com";
      caseId.value = myresponse.CASEID;
      StudentID.value = myresponse.CWID;
      Major.value = myresponse.MAJOR_DESCR;
      DegreeObjective.value = myresponse.DEGREE_TYPE;
      AcademicPlan.value = myresponse.ACADEMIC_PLAN;
      International_Students.value = myresponse.INTERNATIONAL_FLAG;
      Nursing_Flag.value = myresponse.NURSING_FLAG;
     EIP_Flag.value = myresponse.EIP_FLAG;
      TelephoneNo.value = myresponse.STUDENT_PHONE;
      TermDesc.value = myresponse.TERM_DESCR;
      //TermCode.value = myresponse.TERM_CODE;
        DataUnavailableText.visible = false; 
       noRecordMsgNonMed.visible = false;
   noRecordMsgMed.visible = false;
      table1.visible = true;
     // mainSubmit.visible = true;
var tItems;
var responselength =  myresponse.COURSES.length;
if(responselength >= 1){
if(responselength == 1)
  {
    Row1.visible = true;
    Row2.visible = false;
    Row3.visible = false;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
for(tItems in myresponse.COURSES)
{
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
   InstructorEmail1.value=Email.value;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
   ChairEmailID1.value=Email.value;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    //var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	//Row1
	    }
      
}
//For length 2
if(responselength == 2)
  {
	  
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = false;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
	
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail1.value= Email.value;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID1.value= Email.value;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail2.value=Email.value;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
      ChairEmailID2.value=Email.value;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
     }
//For length 3
if(responselength == 3)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    InstructorEmail1.value=Email.valueL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
       ChairEmailID1.value=Email.value;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail2.value=Email.value;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID2.value=Email.value;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail3.value=Email.value;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
  //  ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
       ChairEmailID3.value=Email.value;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 4
if(responselength == 4)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail1.value=Email.value;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID1.value=Email.value;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail2.value=Email.value;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
  //  ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID2.value=Email.value;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	//Row2.CourseNo2.value = courseNo;
    //Row2.ScheduleNo2.value = schNo;
    //Row2.UnitNo2.value = noOfUnits;
    //InstructorName2.value = instName;
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail3.value=Email.value;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
      ChairEmailID3.value=Email.value;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	//CourseNo3.value = courseNo;
    //ScheduleNo3.value = schNo;
    //UnitNo3.value = noOfUnits;
    //InstructorName3.value = instName;
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail4.value=Email.value;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID4.value=Email.value;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	  }
}
}
//For length 5
if(responselength == 5)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail1.value=Email.value;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID1.value=Email.value;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairName1:"+ChairName1.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail2.value=Email.value;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID2.value=Email.value;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairName2:"+ChairName2.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
      InstructorEmail3.value=Email.value;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID3.value=Email.value;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairName3:"+ChairName3.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail4.value=Email.value;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID4.value=Email.value;
    ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairNam4:"+ChairName4.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail5.value=Email.value;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID5.value=Email.value;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
    //alert("ChairName5:"+ChairName5.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
  //For length 6
if(responselength == 6)
  {
	//alert("Pushpa 6");
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail1.value=Email.value;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
    ChairEmailID1.value=Email.value;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    //InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail2.value=Email.value;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID2.value=Email.value;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail3.value=Email.value;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
  //  ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID3.value=Email.value;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
  //  InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail4.value=Email.value;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
  //  ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
      ChairEmailID4.value=Email.value;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    InstructorEmail5.value=Email.value;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
  //  ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID5.value=Email.value;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail6.value=Email.value;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID6.value=Email.value;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 7
if(responselength == 7)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    //  InstructorEmail1.value = Email.value;
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail1.value=Email.value;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
  //  ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID1.value=Email.value;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
      InstructorEmail2.value=Email.value;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID2.value=Email.value;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail3.value=Email.value;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
  //  ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID3.value=Email.value;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail4.value=Email.value;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
  //  ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID4.value=Email.value;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail5.value=Email.value;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID5.value=Email.value;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail6.value=Email.value;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    //ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
      ChairEmailID6.value=Email.value;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail7.value=Email.value;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
      ChairEmailID7.value=Email.value;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 8
if(responselength == 8)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    InstructorEmail1.value=Email.value;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
  //  ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
    ChairEmailID1.value=Email.value;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    //InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail2.value=Email.value;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID2.value=Email.value;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    //InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail3.value=Email.value;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    //ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID3.value=Email.value;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail4.value=Email.value;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID4.value=Email.value;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    //InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail6.value=Email.value;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
    ChairEmailID6.value=Email.value;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail7.value=Email.value;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
      ChairEmailID7.value=Email.value;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail8.value=Email.value;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
    ChairEmailID8.value=Email.value;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 9
if(responselength == 9)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
   if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
  //  InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    //InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
      InstructorEmail1.value=Email.value;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
      ChairEmailID1.value=Email.value;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail2.value=Email.value;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID2.value=Email.value;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    InstructorEmail3.value=Email.value;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
      ChairEmailID3.value=Email.value;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail4.value=Email.value;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    //ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
      ChairEmailID4.value=Email.value;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail5.value=Email.value;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
  //  ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
      ChairEmailID5.value=Email.value;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail6.value=Email.value;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
  //  ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID6.value=Email.value;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
   // InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    InstructorEmail7.value=Email.valueL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
  //  ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID7.value=Email.value;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail8.value=Email.value;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID8.value=Email.value;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail9.value=Email.value;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
  //  ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID9.value=Email.value;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 10
if(responselength == 10)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    InstructorEmail1.value=Email.value;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID1.value=Email.value;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    InstructorEmail2.value=Email.value;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID2.value=Email.value;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail3.value=Email.value;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID3.value=Email.value;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail4.value=Email.value;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID4.value=Email.value;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    //InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail5.value=Email.value;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    //ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID5.value=Email.value;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    InstructorEmail6.value=Email.value;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
    ChairEmailID6.value=Email.value;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail7.value=Email.value;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID7.value=Email.value;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail8.value=Email.value;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID8.value=Email.value;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    InstructorEmail9.value=Email.value;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID9.value=Email.value;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    //InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    InstructorEmail10.value=Email.value;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    //ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID10.value=Email.value;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 11
if(responselength == 11)
  {
 
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    //InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    InstructorEmail1.value=Email.value;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
    ChairEmailID1.value=Email.value;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    InstructorEmail2.value=myresponse.COURSES[tItems].Email.value;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID2.value=myresponse.COURSES[tItems].Email.value;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail3.value=Email.value;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID3.value=Email.value;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 12
if(responselength == 12)
  {
 
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 13
if(responselength == 13)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber13.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 14
if(responselength == 14)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = true;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber13.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "13"){
    Row14.ScheduleNo14.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row14.CourseNo14.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row14.UnitNo14.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row14.InstructorName14.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID14.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail14.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID14.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID14.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber14.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 15
if(responselength == 15)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = true;
    Row15.visible = true;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber13.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "13"){
    Row14.ScheduleNo14.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row14.CourseNo14.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row14.UnitNo14.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row14.InstructorName14.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID14.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail14.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID14.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID14.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber14.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
   if(tItems == "14"){
    Row15.ScheduleNo15.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row15.CourseNo15.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row15.UnitNo15.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row15.InstructorName15.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID15.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail15.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID15.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID15.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber15.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
loadingText.visible = false;  
}else{
loadingText.visible = true;  
}    
},
  error: function(error){
//alert("error block="+error);
// alert("Data is unavailable");
  loadingText.visible = false; 
    if(typeOfForm.value == "1"){
      noRecordMsgMed.visible = false;
       noRecordMsgNonMed.visible = true;
   
    }else{
      noRecordMsgNonMed.visible = false;
      noRecordMsgMed.visible = true;
    }
 // DataUnavailableText.visible = true;
    table1.visible = false;
  //  mainSubmit.visible = false;
}


    });
 //loadingText.visible = false; 

}
  

   
  
}

},
error: function(error){
alert("error block="+error);
  loadingText.visible = false; 
 // alert(typeOfForm.value);
  if(typeOfForm.value == "1"){
      noRecordMsgMed.visible = false;
       noRecordMsgNonMed.visible = true;
   
    }else{
      noRecordMsgNonMed.visible = false;
      noRecordMsgMed.visible = true;
    }
 //   DataUnavailableText.visible = true; 
  table1.visible = false;
 // mainSubmit.visible = false;
}

});
   
}



        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_typeOfForm_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_typeOfForm_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
CB1.value = null;
  CB2.value = null;
  CB3.value = null;
  CB4.value = null;
  CB5.value = null;
  CB6.value = null;
  CB7.value = null;
  CB8.value = null;
  CB9.value = null;
  CB10.value = null;
  CB11.value = null;
  CB12.value = null;
  CB13.value = null;
  CB14.value = null;
  CB15.value = null;
  //clear all values in table
  CourseNo1.value = null;
  CourseNo2.value = null;
  CourseNo3.value = null;
  CourseNo4.value = null;
  CourseNo5.value = null;
  CourseNo6.value = null;
  CourseNo7.value = null;
  CourseNo8.value = null;
  CourseNo9.value = null;
  CourseNo10.value = null;
  CourseNo11.value = null;
  CourseNo12.value = null;
  CourseNo13.value = null;
  CourseNo14.value = null;
  CourseNo15.value = null;
  
  ScheduleNo1.value = null;
  ScheduleNo2.value = null;
  ScheduleNo3.value = null;
  ScheduleNo4.value = null;
  ScheduleNo5.value = null;
  ScheduleNo6.value = null;
  ScheduleNo7.value = null;
  ScheduleNo8.value = null;
  ScheduleNo9.value = null;
  ScheduleNo10.value = null;
  ScheduleNo11.value = null;
  ScheduleNo12.value = null;
  ScheduleNo13.value = null;
  ScheduleNo14.value = null;
  ScheduleNo15.value = null;
  
  UnitNo1.value = null;
  UnitNo2.value = null;
  UnitNo3.value = null;
  UnitNo4.value = null;
  UnitNo5.value = null;
  UnitNo6.value = null;
  UnitNo7.value = null;
  UnitNo8.value = null;
  UnitNo9.value = null;
  UnitNo10.value = null;
  UnitNo11.value = null;
  UnitNo12.value = null;
  UnitNo13.value = null;
  UnitNo14.value = null;
  UnitNo15.value = null;
  
  InstructorName1.value = null;
  InstructorName2.value = null;
  InstructorName3.value = null;
  InstructorName4.value = null;
  InstructorName5.value = null;
  InstructorName6.value = null;
  InstructorName7.value = null;
  InstructorName8.value = null;
  InstructorName9.value = null;
  InstructorName10.value = null;
  InstructorName11.value = null;
  InstructorName12.value = null;
  InstructorName13.value = null;
  InstructorName14.value = null;
  InstructorName15.value = null;
  
InstructorUserID1.value = null;
 InstructorUserID2.value = null;
InstructorUserID3.value = null;
InstructorUserID4.value = null;
InstructorUserID5.value = null;
InstructorUserID6.value = null;
InstructorUserID7.value = null;
InstructorUserID8.value = null;
InstructorUserID9.value = null;
InstructorUserID10.value = null;
InstructorUserID11.value = null;
InstructorUserID12.value = null;
InstructorUserID13.value = null;
InstructorUserID14.value = null;
InstructorUserID15.value = null;
//clear instructor emailID
InstructorEmail1.value = null;
InstructorEmail2.value = null;
InstructorEmail3.value = null;
InstructorEmail4.value = null;
InstructorEmail5.value = null;
InstructorEmail6.value = null;
InstructorEmail7.value = null;
InstructorEmail8.value = null;
InstructorEmail9.value = null;
InstructorEmail10.value = null;
InstructorEmail11.value = null;
InstructorEmail12.value = null;
InstructorEmail13.value = null;
InstructorEmail14.value = null;
InstructorEmail15.value = null;
  //clear instructor Chair UID
ChairUserID1.value = null;
ChairUserID2.value = null;
ChairUserID3.value = null;
ChairUserID4.value = null;
ChairUserID5.value = null;
ChairUserID6.value = null;
ChairUserID7.value = null;
ChairUserID8.value = null;
ChairUserID9.value = null;
ChairUserID10.value = null;
ChairUserID11.value = null;
ChairUserID12.value = null;
ChairUserID13.value = null;
ChairUserID14.value = null;
ChairUserID15.value = null;
 //clear instructor Chair Name
ChairName1.value = null;
ChairName2.value = null;
ChairName3.value = null;
ChairName4.value = null;
ChairName5.value = null;
ChairName6.value = null;
ChairName7.value = null;
ChairName8.value = null;
ChairName9.value = null;
ChairName10.value = null;
ChairName11.value = null;
ChairName12.value = null;
ChairName13.value = null;
ChairName14.value = null;
ChairName15.value = null;
   //clear instructor Chair Email
ChairEmailID1.value = null;
ChairEmailID2.value = null;
ChairEmailID3.value = null;
ChairEmailID4.value = null;
ChairEmailID5.value = null;
ChairEmailID6.value = null;
ChairEmailID7.value = null;
ChairEmailID8.value = null;
ChairEmailID9.value = null;
ChairEmailID10.value = null;
ChairEmailID11.value = null;
ChairEmailID12.value = null;
ChairEmailID13.value = null;
ChairEmailID14.value = null;
ChairEmailID15.value = null; 



$.ajax({
type: 'GET',
url:"/bin/getLoggedUserId",
dataType: 'json',
success: function(myresponse){
   
if(myresponse.Status == "Success"){
  
var userValue=myresponse.userId;
//alert("userValue="+userValue);
logUser.value = userValue;
if(stepRef.value === null){
//var cwid = "891673535";
DataUnavailableText.visible = false;
loadingText.visible = true;
workflow_initiator.value = userValue;
  userId= "siddman2002";
//var userId = userValue;
//var userId = "steven.gellman";
var typeOfWithdrawal = typeOfForm.value;
var term = "2255";
//userId = "josephfarnam";
//userId = "nkaroglu";
$.ajax({

    type: 'GET',
    
   // url: "/bin/getCourseInfoSummerWinterSession",
    url: "/bin/getCourseInfoSummerWinterSessionUpdatedTest",


    data: {
        userId: userId,
        term: term,
        typeOfWithdrawal : typeOfWithdrawal
    },

    dataType: 'json',

    success: function(myresponse) {
      
    ProgramPlan.value = myresponse.PROGRAM_PLAN;
    LastName.value = myresponse.LNAME;
    FirstName.value = myresponse.FNAME;
   // Email.value = myresponse.STUDENT_EMAIL;
       Email.value = "chaitanya.sai@thoughtfocus.com";
      caseId.value = myresponse.CASEID;
      StudentID.value = myresponse.CWID;
      Major.value = myresponse.MAJOR_DESCR;
      DegreeObjective.value = myresponse.DEGREE_TYPE;
      AcademicPlan.value = myresponse.ACADEMIC_PLAN;
      International_Students.value = myresponse.INTERNATIONAL_FLAG;
      Nursing_Flag.value = myresponse.NURSING_FLAG;
      EIP_Flag.value = myresponse.EIP_FLAG;
      TelephoneNo.value = myresponse.STUDENT_PHONE;
      TermDesc.value = myresponse.TERM_DESCR;
      noRecordMsgNonMed.visible = false;
      noRecordMsgMed.visible = false;
      table1.visible = true;
     // mainSubmit.visible = true;
var tItems;
   
var responselength =  myresponse.COURSES.length;
if(responselength >= 1){
if(responselength == 1)
  {
    Row1.visible = true;
    Row2.visible = false;
    Row3.visible = false;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
for(tItems in myresponse.COURSES)
{
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
   InstructorEmail1.value="chaitanya.sai@thoughtfocus.com";
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
   ChairEmailID1.value="chaitanya.sai@thoughtfocus.com";
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    //var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	//Row1
	    }
      
}
//For length 2
if(responselength == 2)
  {
	  
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = false;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
	
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail1.value="shreyas.manjunatha@thoughtfocus.com";
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
      ChairEmailID1.value="shreyas.manjunatha@thoughtfocus.com";
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail2.value="shreyas.manjunatha@thoughtfocus.com";
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
      ChairEmailID2.value="shreyas.manjunatha@thoughtfocus.com";
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
     }
//For length 3
if(responselength == 3)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
   // InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
     InstructorEmail1.value="shreyas.manjunatha@thoughtfocus.com";
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
   // ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
     ChairEmailID1.value="shreyas.manjunatha@thoughtfocus.com";
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 4
if(responselength == 4)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	//Row2.CourseNo2.value = courseNo;
    //Row2.ScheduleNo2.value = schNo;
    //Row2.UnitNo2.value = noOfUnits;
    //InstructorName2.value = instName;
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	//CourseNo3.value = courseNo;
    //ScheduleNo3.value = schNo;
    //UnitNo3.value = noOfUnits;
    //InstructorName3.value = instName;
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	  }
}
}
//For length 5
if(responselength == 5)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairName1:"+ChairName1.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairName2:"+ChairName2.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairName3:"+ChairName3.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
    ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairNam4:"+ChairName4.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
    //alert("ChairName5:"+ChairName5.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
  //For length 6
if(responselength == 6)
  {
	//alert("Pushpa 6");
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 7
if(responselength == 7)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 8
if(responselength == 8)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 9
if(responselength == 9)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
   if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 10
if(responselength == 10)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 11
if(responselength == 11)
  {
 
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 12
if(responselength == 12)
  {
 
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 13
if(responselength == 13)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber13.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 14
if(responselength == 14)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = true;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber13.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "13"){
    Row14.ScheduleNo14.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row14.CourseNo14.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row14.UnitNo14.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row14.InstructorName14.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID14.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail14.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID14.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID14.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber14.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 15
if(responselength == 15)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = true;
    Row15.visible = true;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber13.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "13"){
    Row14.ScheduleNo14.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row14.CourseNo14.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row14.UnitNo14.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row14.InstructorName14.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID14.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail14.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID14.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID14.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber14.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
   if(tItems == "14"){
    Row15.ScheduleNo15.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row15.CourseNo15.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row15.UnitNo15.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row15.InstructorName15.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID15.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail15.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID15.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID15.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber15.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
loadingText.visible = false; 
  }else{
loadingText.visible = true;  
} 
},
  error: function(error){
//alert("error block="+error);
// alert("Data is unavailable");
  loadingText.visible = false; 
     if(typeOfForm.value == "1"){
      noRecordMsgMed.visible = false;
       noRecordMsgNonMed.visible = true;
   
    }else{
      noRecordMsgNonMed.visible = false;
      noRecordMsgMed.visible = true;
    }
 // DataUnavailableText.visible = true;
    table1.visible = false;
   // mainSubmit.visible = false;
}


    });
 //loadingText.visible = false; 

}
  

   
  
}

},
error: function(error){
alert("error block="+error);
  loadingText.visible = false;
   if(typeOfForm.value == "1"){
      noRecordMsgMed.visible = false;
       noRecordMsgNonMed.visible = true;
   
    }else{
      noRecordMsgNonMed.visible = false;
      noRecordMsgMed.visible = true;
    }
  //  DataUnavailableText.visible = true; 
  table1.visible = false;
 // mainSubmit.visible = false;
 
}

});
   
}



        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_typeOfForm_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_typeOfForm_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            
if(stepRef.value === null){
 
if(this.value == "1"){
 
   DisabilitySupServiceCB.mandatory = false;
  headerTextNonMedical.visible = true;
  studentHeaderTextMed.visible = false;
  studentHeaderTextNonMed.visible = true;
  headerTextMedical.visible = false;
  studentCB.visible = true;
  studentMedCB.visible  = false;
  studentMedCB.value = null;
   /* StudentPetitionMedicalComment.value = "NA";
    StudentPetitionMedicalComment1.value = "NA";
    StudentPetitionMedicalComment2.value = "NA";
    StudentPetitionMedicalComment3.value = "NA";
    StudentPetitionMedicalComment4.value = "NA";
    StudentPetitionMedicalComment5.value = "NA";*/
  studentPetitionSecMedical.visible = false;
  StudentPetitionSecNonMedical.visible = true;
     // alert("Clear Student Petition non med comments");
   //Clear Student Petition comments
  StudentPetitionComment.value = null;
  StudentPetitionComment1.value = null;
  StudentPetitionComment2.value = null;
 // StudentPetitionComment3.value = null;
 // StudentPetitionComment4.value = null;
 // StudentPetitionComment5.value = null;

}
else{
     DisabilitySupServiceCB.mandatory = true;
 // mandatedReport.visible = true;
  headerTextNonMedical.visible = false;
  headerTextMedical.visible = true;
  studentHeaderTextMed.visible = true;
  studentHeaderTextNonMed.visible = false;
  
  studentCB.visible = false;
  studentMedCB.visible  = true;
  studentCB.value = null;
  studentPetitionSecMedical.visible = true;
 /* StudentPetitionComment.value = "NA";
  StudentPetitionComment1.value = "NA";
  StudentPetitionComment2.value = "NA";
  StudentPetitionComment3.value = "NA";
  StudentPetitionComment4.value = "NA";
  StudentPetitionComment5.value = "NA";*/
  StudentPetitionSecNonMedical.visible = false;
 
  //alert("Clear Student Petition med comments");
  //Clear Student Petition comments
  StudentPetitionMedicalComment.value = null;
  StudentPetitionMedicalComment1.value = null;
  StudentPetitionMedicalComment2.value = null;
  StudentPetitionMedicalComment3.value = null;
  StudentPetitionMedicalComment4.value = null;
  StudentPetitionMedicalComment5.value = null;
 // StudentPetitionMedicalComment6.value = null;
  }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_typeOfForm_valueCommit2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_typeOfForm_valueCommit2 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 2){
  mandatedReport.visible = true;
}
else{
  mandatedReport.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_typeOfForm_valueCommit3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_typeOfForm_valueCommit3 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){

if(typeOfForm.value == "2"){     	
    supDocGuide2.visible = false;
    supDocGuide1.visible = true;
      supportDoc3.visible = false;
    supportDoc4.visible = false;
    supportDoc3.fileAttachment.value = null;
    supportDoc4.fileAttachment.value = null;

  if (supportDoc1.fileAttachment.value === null && supportDoc2.fileAttachment.value === null && supportDoc3.fileAttachment.value === null && supportDoc4.fileAttachment.value === null) {
    supportDoc1.fileAttachment.mandatory = "error";
   
  }
   }
   else {
     supDocGuide2.visible = true;
    supDocGuide1.visible = false; 
      supportDoc3.visible = true;
    supportDoc4.visible = true;
     supportDoc1.fileAttachment.mandatory = "error";
    // supDocErrorMessage.visible = true;
    }
}



        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_textdraw_15784959911579170730266_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_textdraw_15784959911579170730266_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value !== null){
this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_textdraw_13322827001573858742686_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_textdraw_13322827001573858742686_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_headerTextNonMedical_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_headerTextNonMedical_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(typeOfForm.value == "1")
  {
    this.visible = true;
  }
else
{
  this.visible = false;
}


        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_headerTextMedical_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_headerTextMedical_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(typeOfForm.value == "2")
  {
    this.visible = true;
  }
else
{
  this.visible = false;
}


        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_studentHeaderTextMed_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_studentHeaderTextMed_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
 if(typeOfForm.value == "2")
  {
    this.visible = true;
  }
else
{
  this.visible = false;
}


}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_studentHeaderTextNonMed_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_studentHeaderTextNonMed_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
 if(typeOfForm.value == "1")
  {
    this.visible = true;
  }
else
{
  this.visible = false;
}


}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_instructorHeaderText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_instructorHeaderText_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value == "ToInstructor"){
  this.visible = true;
  }else{
    this.visible = false;
  }
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_chairHeaderText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_chairHeaderText_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value == "ToChair"){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_textdraw_3521054171565338240535_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_textdraw_3521054171565338240535_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    this.visible = true;
}else{
  this.visible = false;
}

        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_helpLinkFaculty_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_helpLinkFaculty_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === "ToInstructor"){
  this.visible = true;
}
else{
  this.visible = false;
}

        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_helpLinkChair_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_helpLinkChair_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === "ToChair"){
  this.visible = true;
}
else{
  this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_NonMedicalWithdrawal_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_NonMedicalWithdrawal_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (typeOfForm.value == "1") {
    this.visible = true;
}
else
{
  this.visible = false;
}

        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_loadingText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_loadingText_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.visible = true;
}else{
  this.visible = false;
}

        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_loadingText_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_loadingText_init1 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_DataUnavailableText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_DataUnavailableText_init0 = function (scope) {
    with(this) {
        with(scope) {
            //if(stepRef.value !== null){
this.visible = false;
//}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_noRecordMsgMed_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_noRecordMsgMed_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_noRecordMsgNonMed_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_noRecordMsgNonMed_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_LastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_LastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_FirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_FirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_MiddleName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_MiddleName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            

if(stepRef.value === null){
//if(logUser.value === "admin"){

loadingText.visible = true;

  CB1.value = null;
  CB2.value = null;
  CB3.value = null;
  CB4.value = null;
  CB5.value = null;
  CB6.value = null;
  CB7.value = null;
  CB8.value = null;
  CB9.value = null;
  CB10.value = null;
  CB11.value = null;
  CB12.value = null;
  CB13.value = null;
  CB14.value = null;
  CB15.value = null;
  //clear all values in table
  CourseNo1.value = null;
  CourseNo2.value = null;
  CourseNo3.value = null;
  CourseNo4.value = null;
  CourseNo5.value = null;
  CourseNo6.value = null;
  CourseNo7.value = null;
  CourseNo8.value = null;
  CourseNo9.value = null;
  CourseNo10.value = null;
  CourseNo11.value = null;
  CourseNo12.value = null;
  CourseNo13.value = null;
  CourseNo14.value = null;
  CourseNo15.value = null;
  
  ScheduleNo1.value = null;
  ScheduleNo2.value = null;
  ScheduleNo3.value = null;
  ScheduleNo4.value = null;
  ScheduleNo5.value = null;
  ScheduleNo6.value = null;
  ScheduleNo7.value = null;
  ScheduleNo8.value = null;
  ScheduleNo9.value = null;
  ScheduleNo10.value = null;
  ScheduleNo11.value = null;
  ScheduleNo12.value = null;
  ScheduleNo13.value = null;
  ScheduleNo14.value = null;
  ScheduleNo15.value = null;
  
  UnitNo1.value = null;
  UnitNo2.value = null;
  UnitNo3.value = null;
  UnitNo4.value = null;
  UnitNo5.value = null;
  UnitNo6.value = null;
  UnitNo7.value = null;
  UnitNo8.value = null;
  UnitNo9.value = null;
  UnitNo10.value = null;
  UnitNo11.value = null;
  UnitNo12.value = null;
  UnitNo13.value = null;
  UnitNo14.value = null;
  UnitNo15.value = null;
  
  InstructorName1.value = null;
  InstructorName2.value = null;
  InstructorName3.value = null;
  InstructorName4.value = null;
  InstructorName5.value = null;
  InstructorName6.value = null;
  InstructorName7.value = null;
  InstructorName8.value = null;
  InstructorName9.value = null;
  InstructorName10.value = null;
  InstructorName11.value = null;
  InstructorName12.value = null;
  InstructorName13.value = null;
  InstructorName14.value = null;
  InstructorName15.value = null;
  
InstructorUserID1.value = null;
 InstructorUserID2.value = null;
InstructorUserID3.value = null;
InstructorUserID4.value = null;
InstructorUserID5.value = null;
InstructorUserID6.value = null;
InstructorUserID7.value = null;
InstructorUserID8.value = null;
InstructorUserID9.value = null;
InstructorUserID10.value = null;
InstructorUserID11.value = null;
InstructorUserID12.value = null;
InstructorUserID13.value = null;
InstructorUserID14.value = null;
InstructorUserID15.value = null;
//clear instructor emailID
InstructorEmail1.value = null;
InstructorEmail2.value = null;
InstructorEmail3.value = null;
InstructorEmail4.value = null;
InstructorEmail5.value = null;
InstructorEmail6.value = null;
InstructorEmail7.value = null;
InstructorEmail8.value = null;
InstructorEmail9.value = null;
InstructorEmail10.value = null;
InstructorEmail11.value = null;
InstructorEmail12.value = null;
InstructorEmail13.value = null;
InstructorEmail14.value = null;
InstructorEmail15.value = null;
  //clear instructor Chair UID
ChairUserID1.value = null;
ChairUserID2.value = null;
ChairUserID3.value = null;
ChairUserID4.value = null;
ChairUserID5.value = null;
ChairUserID6.value = null;
ChairUserID7.value = null;
ChairUserID8.value = null;
ChairUserID9.value = null;
ChairUserID10.value = null;
ChairUserID11.value = null;
ChairUserID12.value = null;
ChairUserID13.value = null;
ChairUserID14.value = null;
ChairUserID15.value = null;
 //clear instructor Chair Name
ChairName1.value = null;
ChairName2.value = null;
ChairName3.value = null;
ChairName4.value = null;
ChairName5.value = null;
ChairName6.value = null;
ChairName7.value = null;
ChairName8.value = null;
ChairName9.value = null;
ChairName10.value = null;
ChairName11.value = null;
ChairName12.value = null;
ChairName13.value = null;
ChairName14.value = null;
ChairName15.value = null;
   //clear instructor Chair Email
ChairEmailID1.value = null;
ChairEmailID2.value = null;
ChairEmailID3.value = null;
ChairEmailID4.value = null;
ChairEmailID5.value = null;
ChairEmailID6.value = null;
ChairEmailID7.value = null;
ChairEmailID8.value = null;
ChairEmailID9.value = null;
ChairEmailID10.value = null;
ChairEmailID11.value = null;
ChairEmailID12.value = null;
ChairEmailID13.value = null;
ChairEmailID14.value = null;
ChairEmailID15.value = null;
  
var cwidVal = this.value;
//set it to loguser
var term = "2205";
  var typeOfWithdrawal = typeOfForm.value;
var sysDate = sysDateTest.value;

  $.ajax({

    type: 'GET',

    url: "/bin/getCourseInfoSummerWinterCwidChange",



    data: {
        cwid: cwidVal,
        term: term,
        typeOfWithdrawal:typeOfWithdrawal,
      sysDate : sysDate
    },

    dataType: 'json',

    success: function(myresponse) {
     
    ProgramPlan.value = myresponse.PROGRAM_PLAN;
    LastName.value = myresponse.LNAME;
    FirstName.value = myresponse.FNAME;
    Email.value = myresponse.STUDENT_EMAIL;
    //Email.value = "";
      caseId.value = myresponse.CASEID;
      StudentID.value = myresponse.CWID;
      Major.value = myresponse.MAJOR_DESCR;
      DegreeObjective.value = myresponse.DEGREE_TYPE;
      AcademicPlan.value = myresponse.ACADEMIC_PLAN;
      International_Students.value = myresponse.INTERNATIONAL_FLAG;
      Nursing_Flag.value = myresponse.NURSING_FLAG;
      EIP_Flag.value = myresponse.EIP_FLAG;
      TelephoneNo.value = myresponse.STUDENT_PHONE;
      TermDesc.value = myresponse.TERM_DESCR;
      //TermCode.value = myresponse.TERM_CODE;
        DataUnavailableText.visible = false; 
        noRecordMsgNonMed.visible = false;
  		 noRecordMsgMed.visible = false;
      
      table1.visible = true;
     // mainSubmit.visible = true;
var tItems;
        loadingText.visible =true;
var responselength =  myresponse.COURSES.length;
     
if(responselength >= 1){
if(responselength == 1)
  {
    Row1.visible = true;
    Row2.visible = false;
    Row3.visible = false;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
for(tItems in myresponse.COURSES)
{
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    //var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	//Row1
	    }
      
}
//For length 2
if(responselength == 2)
  {
	  
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = false;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
	
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
     }
//For length 3
if(responselength == 3)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = false;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 4
if(responselength == 4)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = false;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
	  }
}
}
//For length 5
if(responselength == 5)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = false;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairName1:"+ChairName1.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairName2:"+ChairName2.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairName3:"+ChairName3.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
    ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
   // alert("ChairNam4:"+ChairName4.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
    //alert("ChairName5:"+ChairName5.value);
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
  //For length 6
if(responselength == 6)
  {
	//alert("Pushpa 6");
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = false;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
    // var instCwId = myresponse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresponse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresponse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 7
if(responselength == 7)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = false;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 8
if(responselength == 8)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = false;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 9
if(responselength == 9)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = false;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
   if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName9.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 10
if(responselength == 10)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = false;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName9.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName10.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 11
if(responselength == 11)
  {
 
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = false;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName9.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName10.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName11.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 12
if(responselength == 12)
  {
 
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = false;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName9.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName10.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName11.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName12.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 13
if(responselength == 13)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = false;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber13.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 14
if(responselength == 14)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = true;
    Row15.visible = false;
  
  for(tItems in myresponse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber13.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "13"){
    Row14.ScheduleNo14.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row14.CourseNo14.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row14.UnitNo14.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row14.InstructorName14.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID14.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail14.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID14.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID14.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber14.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
}
//For length 15
if(responselength == 15)
  {
    Row1.visible = true;
    Row2.visible = true;
    Row3.visible = true;
    Row4.visible = true;
    Row5.visible = true;
    Row6.visible = true;
    Row7.visible = true;
    Row8.visible = true;
    Row9.visible = true;
    Row10.visible = true;
    Row11.visible = true;
    Row12.visible = true;
    Row13.visible = true;
    Row14.visible = true;
    Row15.visible = true;
  
  for(tItems in myresponse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresponse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresponse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber1.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairName = myresponse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber2.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber3.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber4.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber5.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairCwId = myresponse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber6.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber7.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresponse.COURSES[tItems].CHAIR_NAME;
	sectionNumber8.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber9.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber10.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresponse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber11.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber12.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber13.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "13"){
    Row14.ScheduleNo14.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row14.CourseNo14.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row14.UnitNo14.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row14.InstructorName14.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID14.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail14.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID14.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID14.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber14.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
   if(tItems == "14"){
    Row15.ScheduleNo15.value = myresponse.COURSES[tItems].CLASS_NBR;
	Row15.CourseNo15.value = myresponse.COURSES[tItems].CRSE_NAME;
	Row15.UnitNo15.value = myresponse.COURSES[tItems].UNT_TAKEN;
	Row15.InstructorName15.value = myresponse.COURSES[tItems].INSTR_NAME;
    InstructorUserID15.value=myresponse.COURSES[tItems].INSTR_USERID;
    InstructorEmail15.value=myresponse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID15.value=myresponse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID15.value=myresponse.COURSES[tItems].CHAIR_EMAIL;
	sectionNumber15.value = myresponse.COURSES[tItems].CLASS_SECTION;
	//var chairUserId = myresponse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresponse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
   
} 
  loadingText.visible = false;
  }else{
    if(typeOfForm.value == "1"){
      noRecordMsgMed.visible = false;
       noRecordMsgNonMed.visible = true;
   
    }else{
      noRecordMsgNonMed.visible = false;
      noRecordMsgMed.visible = true;
    }
//DataUnavailableText.visible = true; 
   // mainSubmit.visible = false;
    table1.visible = false;
} 
},
  
error: function(error){
 loadingText.visible =false;
   if(typeOfForm.value == "1"){
      noRecordMsgMed.visible = false;
       noRecordMsgNonMed.visible = true;
   
    }else{
      noRecordMsgNonMed.visible = false;
      noRecordMsgMed.visible = true;
    }
  table1.visible = false;
  //mainSubmit.visible = false;
//alert("error block="+myresponse);
//alert("Requested Data Unavailable");
}

    });
  
//}

}

        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_Major_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_Major_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_DegreeObjective_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_DegreeObjective_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ProgramPlan_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ProgramPlan_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_AcademicPlan_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_AcademicPlan_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ContactFinalThreeWk_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ContactFinalThreeWk_init0 = function (scope) {
    with(this) {
        with(scope) {
            /*if(typeOfForm.value == "3")
  {
    this.visible = true;
  }
else{
  this.visible = false;
}*/
this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_EIP_Flag_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_EIP_Flag_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_International_Students_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_International_Students_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_SubjectLineARSC_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_SubjectLineARSC_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_classNumberList_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_classNumberList_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CourseNumberList_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CourseNumberList_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_stepRef_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_stepRef_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_SubjectLine_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_SubjectLine_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_SubjectLineMedical_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_SubjectLineMedical_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_logUser_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_logUser_init0 = function (scope) {
    with(this) {
        with(scope) {
            
$.ajax({

type: 'GET', 

url:"/bin/getLoggedUserId",
dataType: 'json',
success: function(myresopnse){
  var userValue=myresopnse.userId;
  if(stepRef.value === null){
    workflow_initiator.value = userValue;
  }
  logUser.value = userValue;
  //this.value = userValue;;
},
  error: function(error){
alert("error block="+error);
}
});

        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_logUser_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_logUser_init1 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_AllCourseWithdrawStatus_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_AllCourseWithdrawStatus_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_TermCode_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_TermCode_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_TermDesc_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_TermDesc_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_textdraw1557993532501_copy_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_textdraw1557993532501_copy_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_AllCoursWithdrawRB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_AllCoursWithdrawRB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_AllCoursWithdrawRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_AllCoursWithdrawRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
if(this.value == "1")
  {
    AllCourseWithdrawStatus.value = "Yes";  
    selectAll.value = 1;
    if(CourseNo1.value !== null){CB1.value = 1;}
    if(CourseNo2.value !== null){CB2.value = 1;}
    if(CourseNo3.value !== null){CB3.value = 1;}
    if(CourseNo4.value !== null){CB4.value = 1;}
    if(CourseNo5.value !== null){CB5.value = 1;}
    if(CourseNo6.value !== null){CB6.value = 1;}
    if(CourseNo7.value !== null){CB7.value = 1;}
    if(CourseNo8.value !== null){CB8.value = 1;}
    if(CourseNo9.value !== null){CB9.value = 1;}
    if(CourseNo10.value !== null){CB10.value = 1;}
    if(CourseNo11.value !== null){CB11.value = 1;}
    if(CourseNo12.value !== null){CB12.value = 1;}
    if(CourseNo13.value !== null){CB13.value = 1;}
    if(CourseNo14.value !== null){CB14.value = 1;}
    if(CourseNo15.value !== null){CB15.value = 1;}
      }
  else{
    AllCourseWithdrawStatus.value = "No";  
    if(selectAll.value == 1){
    selectAll.value = null;
    CB1.value = null;
    CB2.value = null;
    CB3.value = null;
    CB4.value = null;
    CB5.value = null;
    CB5.value = null;
    CB6.value = null;
    CB7.value = null;
    CB8.value = null;
    CB9.value = null;
    CB10.value = null;
    CB11.value = null;
    CB12.value = null;
    CB13.value = null;
    CB14.value = null;
    CB15.value = null;
  }
  }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CourseInfoTablePanle_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CourseInfoTablePanle_init0 = function (scope) {
    with(this) {
        with(scope) {
            //if(stepRef.value === null){
    //Row1
    CourseNo1.enabled = false;
    ScheduleNo1.enabled = false;
    UnitNo1.enabled = false;
    InstructorName1.enabled = false;
	
    //Row2
    CourseNo2.enabled = false;
    ScheduleNo2.enabled = false;
    UnitNo2.enabled = false;
    InstructorName2.enabled = false;
	
    //Row3
    CourseNo3.enabled = false;
    ScheduleNo3.enabled = false;
    UnitNo3.enabled = false;
    InstructorName3.enabled = false;
	
    //Row4
    CourseNo4.enabled = false;
    ScheduleNo4.enabled = false;
    UnitNo4.enabled = false;
    InstructorName4.enabled = false;
	
    //Row5
    CourseNo5.enabled = false;
    ScheduleNo5.enabled = false;
    UnitNo5.enabled = false;
    InstructorName5.enabled = false;
	
    //Row6
    CourseNo6.enabled = false;
    ScheduleNo6.enabled = false;
    UnitNo6.enabled = false;
    InstructorName6.enabled = false;
	
    //Row7
    CourseNo7.enabled = false;
    ScheduleNo7.enabled = false;
    UnitNo7.enabled = false;
    InstructorName7.enabled = false;
	
    //Row8
    CourseNo8.enabled = false;
    ScheduleNo8.enabled = false;
    UnitNo8.enabled = false;
    InstructorName8.enabled = false;
	
    //Row9
    CourseNo9.enabled = false;
    ScheduleNo9.enabled = false;
    UnitNo9.enabled = false;
    InstructorName9.enabled = false;
	
    //Row10
    CourseNo10.enabled = false;
    ScheduleNo10.enabled = false;
    UnitNo10.enabled = false;
    InstructorName10.enabled = false;
	
    //Row11
    CourseNo11.enabled = false;
    ScheduleNo11.enabled = false;
    UnitNo11.enabled = false;
    InstructorName11.enabled = false;
	
    //Row12
    CourseNo12.enabled = false;
    ScheduleNo12.enabled = false;
    UnitNo12.enabled = false;
    InstructorName12.enabled = false;
	
    //Row13
    CourseNo13.enabled = false;
    ScheduleNo13.enabled = false;
    UnitNo13.enabled = false;
    InstructorName13.enabled = false;

    //Row14
    CourseNo14.enabled = false;
    ScheduleNo14.enabled = false;
    UnitNo14.enabled = false;
    InstructorName14.enabled = false;
   
    //Row15
    CourseNo15.enabled = false;
    ScheduleNo15.enabled = false;
    UnitNo15.enabled = false;
    InstructorName15.enabled = false;
 //  }
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_selectAll_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_selectAll_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value  === null){
if(this.value == "1")
  {
     
   // AllCoursWithdrawRB.value = 1;
    if(CourseNo1.value !== null){CB1.value = 1;}
    if(CourseNo2.value !== null){CB2.value = 1;}
    if(CourseNo3.value !== null){CB3.value = 1;}
    if(CourseNo4.value !== null){CB4.value = 1;}
    if(CourseNo5.value !== null){CB5.value = 1;}
    if(CourseNo6.value !== null){CB6.value = 1;}
    if(CourseNo7.value !== null){ CB7.value = 1;}
    if(CourseNo8.value !== null){CB8.value = 1;}
    if(CourseNo9.value !== null){ CB9.value = 1;}
    if(CourseNo10.value !== null){CB10.value = 1;}
    if(CourseNo11.value !== null){CB11.value = 1;}
    if(CourseNo12.value !== null){CB12.value = 1;}
    if(CourseNo13.value !== null){CB13.value = 1;}
    if(CourseNo14.value !== null){CB14.value = 1;}
    if(CourseNo15.value !== null){CB15.value = 1;}
  
    CB1.enabled = false;
    CB2.enabled = false;
    CB3.enabled = false;
    CB4.enabled = false;
    CB5.enabled = false;
    CB6.enabled = false;
    CB7.enabled = false;
    CB8.enabled = false;
    CB9.enabled = false;
    CB10.enabled = false;
    CB11.enabled = false;
    CB12.enabled = false;
    CB13.enabled = false;
    CB14.enabled = false;
    CB15.enabled = false;
  }
else
  {
    CB1.enabled = true;
    CB2.enabled = true;
    CB3.enabled = true;
    CB4.enabled = true;
    CB5.enabled = true;
    CB6.enabled = true;
    CB7.enabled = true;
    CB8.enabled = true;
    CB9.enabled = true;
    CB10.enabled = true;
    CB11.enabled = true;
    CB12.enabled = true;
    CB13.enabled = true;
    CB14.enabled = true;
    CB15.enabled = true;
    CB1.value = null;
    CB2.value = null;
    CB3.value = null;
    CB4.value = null;
    CB5.value = null;
    CB6.value = null;
    CB7.value = null;
    CB8.value = null;
    CB9.value = null;
    CB10.value = null;
    CB11.value =null;
    CB12.value = null;
    CB13.value = null;
    CB14.value = null;
    CB15.value = null;
  }

}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB6_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB6_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB7_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB7_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB8_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB8_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB9_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB9_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB10_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB10_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB11_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB11_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB12_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB12_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB13_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB13_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB14_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB14_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB15_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_CB15_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    if (this.value == "1") {
        if (Row2.visible === false) {
            if (CB1.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row3.visible === false) {
            if (CB1.value == "1" && CB2.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row4.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row5.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row6.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row7.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row8.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row9.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row10.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row11.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row12.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row13.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1") {
                selectAll.value = 1;
            }
        } else if (Row14.visible === false) {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1") {
                selectAll.value = 1;
            }
        } else {
            if (CB1.value == "1" && CB2.value == "1" && CB3.value == "1" && CB4.value == "1" && CB5.value == "1" && CB6.value == "1" && CB7.value == "1" && CB8.value == "1" && CB9.value == "1" && CB10.value == "1" && CB11.value == "1" && CB12.value == "1" && CB13.value == "1" && CB14.value == "1") {
                selectAll.value = 1;
            }
        }


    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_HiddenSectionPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_HiddenSectionPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            HiddenSectionPanel.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_Covid19CB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_Covid19CB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  if(Covid19CB.value == "1"){
    Circumstances.visible = true;
    Circumstance_text.visible = true;
  }
  if(Covid19CB.value == "2"){
    Circumstances.value = "";
    Circumstances.visible = false;
    Circumstance_text.visible = false;
  }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_Circumstances_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_Circumstances_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === null) {
    this.visible =  false;
  Circumstance_text.visible = false;
}else{
  if(this.value !== null){
    this.visible = true;
    Circumstance_text.visible = true;
  }else{
    this.visible = false;
    Circumstance_text.visible = false;
  }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionSecNonMedical_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionSecNonMedical_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if(stepRef.value === null || stepRef.value === "ToInstructor" || stepRef.value=== "ToMedical" || stepRef.value=== "ToChair" || stepRef.value=== "ToARSC" || stepRef.value=== "ToMedicalARSC" || stepRef.value=== "ToARSCReviewed" || stepRef.value=== "ToMedicalARSCReviewed"){
if(typeOfForm.value == "1")
  {
    this.visible = true;
   /* StudentPetitionComment.value = "NA";
  StudentPetitionComment1.value == "NA";
  StudentPetitionComment3.value = "NA";
  StudentPetitionComment2.value = "NA";
  StudentPetitionComment4.value = "NA";
  StudentPetitionComment5.value = "NA";*/
  }else{
    //StudentPetitionMedicalComment.value = "NA";
   /* StudentPetitionMedicalComment1.value = "NA";
    StudentPetitionMedicalComment2.value = "NA";
    StudentPetitionMedicalComment3.value = "NA";
    StudentPetitionMedicalComment4.value = "NA";
    StudentPetitionMedicalComment5.value = "NA";*/
    this.visible = false;
  
  }
}

   
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_textdraw1580452769677_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_textdraw1580452769677_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionComment_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionComment_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.mandatory = "error";
}else{
  this.mandatory = "";
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionComment1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionComment1_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.mandatory = "error";
}else{
  this.mandatory = "";
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionComment2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionComment2_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.mandatory = "error";
}else{
  this.mandatory = "";
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_studentPetitionSecMedical_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_studentPetitionSecMedical_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if(stepRef.value === null || stepRef.value === "ToInstructor" || stepRef.value=== "ToMedical" || stepRef.value=== "ToChair" || stepRef.value=== "ToARSC" || stepRef.value=== "ToMedicalARSC" || stepRef.value=== "ToARSCReviewed" || stepRef.value=== "ToMedicalARSCReviewed"){
if(typeOfForm.value == "1")
  {
    this.visible = false;
  /* StudentPetitionMedicalComment.value = "NA";
    StudentPetitionMedicalComment1.value = "NA";
    StudentPetitionMedicalComment2.value = "NA";
    StudentPetitionMedicalComment3.value = "NA";
    StudentPetitionMedicalComment4.value = "NA";
    StudentPetitionMedicalComment5.value = "NA";*/
  }else{
    // StudentPetitionComment.value = "NA";
  StudentPetitionComment1.value == "NA";
 // StudentPetitionComment3.value = "NA";
  StudentPetitionComment2.value = "NA";
 // StudentPetitionComment4.value = "NA";
  //StudentPetitionComment5.value = "NA";
  this.visible = true;
}
}

        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_textdraw1580452769677_init00
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_textdraw1580452769677_init00 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionMedicalComment_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionMedicalComment_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.mandatory = "error";
}else{
  this.mandatory = "";
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionMedicalComment1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionMedicalComment1_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.mandatory = "error";
}else{
  this.mandatory = "";
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionMedicalComment2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionMedicalComment2_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.mandatory = "error";
}else{
  this.mandatory = "";
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionMedicalComment3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionMedicalComment3_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.mandatory = "error";
}else{
  this.mandatory = "";
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionMedicalComment4_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionMedicalComment4_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.mandatory = "error";
}else{
  this.mandatory = "";
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionMedicalComment5_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentPetitionMedicalComment5_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.mandatory = "error";
}else{
  this.mandatory = "";
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_supportingDocuments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_supportingDocuments_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  supportingDocuments.visible = true;
}else{
  supportingDocuments.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_supportDocPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_supportDocPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null)
  {
    supportDocPanel.enabled = true;
  }else{
    supportDocPanel.enabled = false;
  }

if(typeOfForm.value == "1"){
  supDocGuide2.visible = true;
  supDocGuide1.visible = false;
  supportDoc3.visible = true;
    supportDoc4.visible = true;

}else{
  supDocGuide2.visible = false;
    supDocGuide1.visible = true;
  supportDoc3.visible = true;
    supportDoc4.visible = true;
supportDoc3.visible = false;
    supportDoc4.visible = false;

}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_supDocErrorMessage_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_supDocErrorMessage_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_supportDoc1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(stepRef.value === null){
  var filePath = supportDoc1.fileAttachment.value;
var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);
//alert(extension);
extension = extension.toLowerCase();
//var isImageOrPdf = (/\.(gif|jpe?g|tiff|tif|png|pdf)$/i).test(filePath);
  
if(extension !== "pdf" && extension !== "jpeg" && extension !== "jpg" && extension !== "png" && extension !== "tif" && extension !== "tiff"){
 
  supportDoc1.fileAttachment.value = null;
  
 document.getElementById("extAlert").style.display = "block";
    document.getElementById("okBtnId1").onclick = function() {
   document.getElementById("extAlert").style.display = "none";
   };

}
var format = /[`~*+:'’?<>-|.,&{}#!@$%^=;\[\]\s()]/; 
if(format.test(supportDoc1.fileAttachment.value) === true){
  var doc1NewName = ((supportDoc1.fileAttachment.value.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
 
  supportDoc1.fileAttachment.value = doc1NewName;
 /* document.getElementById("splCharAlert").style.display = "block"; 
  document.getElementById("okBtnId2").onclick = function() {
   document.getElementById("splCharAlert").style.display = "none";
   };*/
 
}
if(this.value !== null){
  supDocErrorMessage.visible = false;
  
}
}


        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_supportDoc2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            

if(stepRef.value === null){
  var filePath = supportDoc2.fileAttachment.value;
var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);
//alert(extension);
extension = extension.toLowerCase();
  
if(extension !== "pdf" && extension !== "jpeg" && extension !== "jpg" && extension !== "png" && extension !== "tif" && extension !== "tiff"){
 
 supportDoc2.fileAttachment.value = null;
 document.getElementById("extAlert").style.display = "block";
 /*document.getElementById("extCloseBtn").onclick = function() {
 document.getElementById("extAlert").style.display = "none";
};*/
  document.getElementById("okBtnId1").onclick = function() {
   document.getElementById("extAlert").style.display = "none";
   };

}
var format = /[`’~*+:'?<>-|.,&{}#!@$%^=;\[\]\s()]/;

if(format.test(supportDoc2.fileAttachment.value) === true){
 var doc2NewName = ((supportDoc2.fileAttachment.value.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');

  supportDoc2.fileAttachment.value = doc2NewName;
 /* document.getElementById("splCharAlert").style.display = "block";
   document.getElementById("okBtnId2").onclick = function() {
   document.getElementById("splCharAlert").style.display = "none";
   };*/
// alert("Attachment does not support / : ? & < >  ' | , / characters"); 
}
if(this.value !== null){
  supDocErrorMessage.visible = false;
 
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_supportDoc3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(stepRef.value === null){
  var filePath = supportDoc3.fileAttachment.value;
var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);
//alert(extension);
extension = extension.toLowerCase();
  
if(extension !== "pdf" && extension !== "jpeg" && extension !== "jpg" && extension !== "png" && extension !== "tif" && extension !== "tiff"){
 supportDoc3.fileAttachment.value = null;
 document.getElementById("extAlert").style.display = "block";
/* document.getElementById("extCloseBtn").onclick = function() {
 document.getElementById("extAlert").style.display = "none";
};*/
   document.getElementById("okBtnId1").onclick = function() {
   document.getElementById("extAlert").style.display = "none";
   };

}
var format = /[`’~*+:'?<>-|.,&{}#!@$%^=;\[\]\s()]/;

if(format.test(supportDoc3.fileAttachment.value) === true){
  var doc3NewName = ((supportDoc3.fileAttachment.value.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
 
  supportDoc3.fileAttachment.value = doc3NewName;
  /*document.getElementById("splCharAlert").style.display = "block";
   document.getElementById("okBtnId2").onclick = function() {
   document.getElementById("splCharAlert").style.display = "none";
   };*/
// alert("Attachment does not support / : ? & < >  ' | , / characters"); 
}
if(this.value !== null){
  supDocErrorMessage.visible = false;
  
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_supportDoc4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_supportDoc4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(stepRef.value === null){
var filePath = supportDoc4.fileAttachment.value;
var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);
extension = extension.toLowerCase();
  
if(extension !== "pdf" && extension !== "jpeg" && extension !== "jpg" && extension !== "png" && extension !== "tif" && extension !== "tiff"){
 
 supportDoc4.fileAttachment.value = null;
 document.getElementById("extAlert").style.display = "block";
 /*document.getElementById("extCloseBtn").onclick = function() {
 document.getElementById("extAlert").style.display = "none";
};*/
  document.getElementById("okBtnId1").onclick = function() {
   document.getElementById("extAlert").style.display = "none";
   };

}
var format = /[`’~*+:'?<>-|.,&{}#!@$%^=;\[\]\s()]/; 

if(format.test(supportDoc4.fileAttachment.value) === true){
  var doc4NewName = ((supportDoc4.fileAttachment.value.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');

  supportDoc4.fileAttachment.value = doc4NewName;
 /* document.getElementById("splCharAlert").style.display = "block";
   document.getElementById("okBtnId2").onclick = function() {
   document.getElementById("splCharAlert").style.display = "none";
   };*/
// alert("Attachment does not support / : ? & < >  ' | , / characters"); 
}
if(this.value !== null){
  supDocErrorMessage.visible = false;

}
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_instructorSupDoc_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_instructorSupDoc_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.visible = false;
}
else if(stepRef.value == "ToInstructor"){
  this.visible = true;
}else{
  this.visible = true;
  this.enabled = false;
}

        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_instructorSupDoc_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_instructorSupDoc_init1 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_mandatedReport_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_mandatedReport_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_studentCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_studentCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(typeOfForm.value == 1){
  this.visible = true;
  
}else{
  this.visible = false;
  
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_studentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_studentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (stepRef.value === null) {
    //var TzoneDate = new Date().toISOString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).slice(0,10);
    if(this.value == "1"){
     // alert("insd");
    if (FirstName.value !== null) {
       $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetails",
                dataType: 'json',
                success: function(myresopnse) {
                       StudentSignDate.value = myresopnse.SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
        
        StudentSignDate.enabled = false;
        var first = FirstName.value;
        var last = LastName.value;
        var res = first.concat(" ");
        res = res.concat(last);
        StudentSign.value = res;
        
    
    }
    }
  else{
    
    this.value = null;
    StudentSign.value = "";
      StudentSignDate.value = "";
  
    }
                            }
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_studentMedCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_studentMedCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(typeOfForm.value == 2){
  this.visible = true;
  //studentCB.visible = false;
}else{
  this.visible = false;
  //studentCB.visible = true;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_studentMedCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_studentMedCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (stepRef.value === null) {
    //var TzoneDate = new Date().toISOString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).slice(0,10);
    if(this.value == "1"){
     // alert("insd");
    if (FirstName.value !== null) {
        /*var dateString = new Date().toLocaleString("en-US", {
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        StudentSignDate.value = d;*/
       $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetails",
                dataType: 'json',
                success: function(myresopnse) {
                       StudentSignDate.value = myresopnse.SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
        StudentSignDate.enabled = false;
        var first = FirstName.value;
        var last = LastName.value;
        var res = first.concat(" ");
        res = res.concat(last);
        StudentSign.value = res;
        
    
    }
    }
  else{
    
    this.value = null;
    StudentSign.value = "";
      StudentSignDate.value = "";
  
    }
                            }
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentSign_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_StudentSign_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
      //var TzoneDate = new Date().toISOString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).slice(0,10);
  var dateString = new Date().toLocaleString("en-US", {timeZone:(Intl.DateTimeFormat().resolvedOptions().timeZone)}).slice(0,9); 
  var dateObject = new Date(dateString);
  var finalDate = dateObject.toISOString().slice(0,10);
  StudentSignDate.value=finalDate;
  StudentSignDate.enabled = false;
}
 
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_sentToChairInstruction_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_sentToChairInstruction_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value == "ToInstructor"){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_instructorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_instructorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === "ToInstructor") {
  if(this.value == 1){
    /*var dateString = new Date().toLocaleString("en-US", {
        timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
    }).replace(/[^ -~]/g, '');
    var dateObject = new Date(dateString);
    var curyear = dateObject.getFullYear();
    var curyearMonth = dateObject.getMonth() + 1;
    var curyearDay = dateObject.getDate();
    var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
     InstructorReviewDate.value = d;*/
 $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetails",
                dataType: 'json',
                success: function(myresopnse) {
                       InstructorReviewDate.value = myresopnse.SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
   
    InstructorReviewDate.enabled = false;

    InstructorSign.value = logUser.value;
    InstructorSign.enabled = false;
  }
  else{
    InstructorSign.value = "";
    InstructorReviewDate.value = "";
  }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_InstructorRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_InstructorRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === "ToInstructor"){
  if(this.value == 2){
    Grade.value = "Not Applicable";
    Grade.enabled = false;
  }else{
    Grade.value = null;
     Grade.enabled = true;
  }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_RecommendInstructor_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_RecommendInstructor_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value == "ToInstructor"){
if(this.value == "2"){
  InstructorComment.mandatory = true;
}else{
 InstructorComment.mandatory = false;
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_RecommendInstructor_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_RecommendInstructor_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value == "ToInstructor"){
if(this.value == "2"){
  //InstructorDenialReasons.mandatory = "error";
   
  InstructorDenialReasons.enabled = true;
}else{
 // InstructorDenialReasons.mandatory = null;
  InstructorDenialReasons.value = null;
  InstructorDenialReasons.enabled = false;
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_InstructorDenialReasons_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_InstructorDenialReasons_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_InstructorDenialReasons_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_InstructorDenialReasons_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value == "ToInstructor"){
if(this.value == "4"){
  InstructorOtherReason.mandatory = "error";
  InstructorOtherReason.visible = true;
}else{
   InstructorOtherReason.mandatory = null;
  InstructorOtherReason.value = null;
  InstructorOtherReason.visible = false;
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_InstructorOtherReason_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_InstructorOtherReason_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(RecommendInstructor.value === null || RecommendInstructor.value == "1"){
    this.visible = false;
}
if(RecommendInstructor.value === "2"){
  if(InstructorDenialReasons.value == "4"){
  this.visible = true;
}else{
  this.visible = false;
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_InstructorSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_InstructorSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_InstructorSign_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_InstructorSign_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === "ToInstructor"){
      //var TzoneDate = new Date().toISOString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).slice(0,10);
  var dateString = new Date().toLocaleString("en-US", {timeZone:(Intl.DateTimeFormat().resolvedOptions().timeZone)}).slice(0,9); 
  var dateObject = new Date(dateString);
  var finalDate = dateObject.toISOString().slice(0,10);
  InstructorReviewDate.value=finalDate;
  InstructorReviewDate.enabled = false;
}
 
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_sentToChairInstruction_init00
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_sentToChairInstruction_init00 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value == "ToChair"){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_chairCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_chairCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === "ToChair") {
  if(this.value == 1){
    /*var dateString = new Date().toLocaleString("en-US", {
        timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
    }).replace(/[^ -~]/g, '');
    var dateObject = new Date(dateString);
    var curyear = dateObject.getFullYear();
    var curyearMonth = dateObject.getMonth() + 1;
    var curyearDay = dateObject.getDate();
    var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
    ChairReviewDate.value = d;*/
    $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetails",
                dataType: 'json',
                success: function(myresopnse) {
                       ChairReviewDate.value = myresopnse.SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
    ChairReviewDate.enabled = false;

    ChairSign.value = logUser.value;
    ChairSign.enabled = false;
  }else{
    ChairSign.value = "";
    ChairReviewDate.value = "";
  }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_RecommendChair_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_RecommendChair_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === "ToChair"){
      //var TzoneDate = new Date().toISOString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).slice(0,10);
  var dateString = new Date().toLocaleString("en-US", {timeZone:(Intl.DateTimeFormat().resolvedOptions().timeZone)}).slice(0,9); 
  var dateObject = new Date(dateString);
  var finalDate = dateObject.toISOString().slice(0,10);
  ChairReviewDate.value=finalDate;
  ChairReviewDate.enabled = false;
  
  ChairSign.value = logUser.value;
}
 
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_RecommendChair_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_RecommendChair_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value == "ToChair"){
if(this.value == "2"){
 // ChairDenialReasons.mandatory = "error";
  ChairDenialReasons.enabled = true;
}else{
  ChairDenialReasons.value = null;
  ChairDenialReasons.enabled = false;
}
}


        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_RecommendChair_valueCommit2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_RecommendChair_valueCommit2 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value == "ToInstructor"){
if(this.value == "2"){
  RecommendChair.mandatory = true;
}else{
 RecommendChair.mandatory = false;
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ChairDenialReasons_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ChairDenialReasons_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ChairDenialReasons_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ChairDenialReasons_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value == "ToChair"){
if(this.value == "4"){
  ChairOtherReason.mandatory = "error";
  ChairOtherReason.visible = true;
}else{
   ChairOtherReason.mandatory = null;
  ChairOtherReason.value = null;
  ChairOtherReason.visible = false;
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ChairSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ChairSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ChairSign_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ChairSign_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === "ToChair"){
      //var TzoneDate = new Date().toISOString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).slice(0,10);
  var dateString = new Date().toLocaleString("en-US", {timeZone:(Intl.DateTimeFormat().resolvedOptions().timeZone)}).slice(0,9); 
  var dateObject = new Date(dateString);
  var finalDate = dateObject.toISOString().slice(0,10);
  ChairReviewDate.value=finalDate;
  ChairReviewDate.enabled = false;
}
 
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ChairOtherReason_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ChairOtherReason_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(RecommendChair.value === null || RecommendChair.value == "1"){
  this.visible = false;
}if(RecommendChair.value === "2"){
  if(ChairDenialReasons.value == "4"){
  this.visible = true;
}else{
  this.visible = false;
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_medicalCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_medicalCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === "ToMedical") {
  if(this.value == 1){
    /*var dateString = new Date().toLocaleString("en-US", {
        timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
    }).replace(/[^ -~]/g, '');
    var dateObject = new Date(dateString);
    var curyear = dateObject.getFullYear();
    var curyearMonth = dateObject.getMonth() + 1;
    var curyearDay = dateObject.getDate();
    var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
    MedicalReviewDate.value = d;*/
     $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetails",
                dataType: 'json',
                success: function(myresopnse) {
                       MedicalReviewDate.value = myresopnse.SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
    MedicalReviewDate.enabled = false;

    MedicalReviewerSign.value = logUser.value;
    MedicalReviewerSign.enabled = false;
  }else{
    MedicalReviewerSign.value = "";
    MedicalReviewDate.value = "";
  }
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_RecommendMedical_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_RecommendMedical_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === "ToMedical"){
      //var TzoneDate = new Date().toISOString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).slice(0,10);
  var dateString = new Date().toLocaleString("en-US", {timeZone:(Intl.DateTimeFormat().resolvedOptions().timeZone)}).slice(0,9); 
  var dateObject = new Date(dateString);
  var finalDate = dateObject.toISOString().slice(0,10);
  MedicalReviewDate.value=finalDate;
  MedicalReviewDate.enabled = false;
  
  MedicalReviewerSign.value = logUser.value;
}
 
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_MedicalReviewerSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_MedicalReviewerSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_MedicalReviewerSign_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_MedicalReviewerSign_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === "ToMedical"){
      //var TzoneDate = new Date().toISOString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).slice(0,10);
  var dateString = new Date().toLocaleString("en-US", {timeZone:(Intl.DateTimeFormat().resolvedOptions().timeZone)}).slice(0,9); 
  var dateObject = new Date(dateString);
  var finalDate = dateObject.toISOString().slice(0,10);
  MedicalReviewDate.value=finalDate;
  MedicalReviewDate.enabled = false;
}
 
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_adminCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_adminCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === "ToARSC" || stepRef.value === "ToMedicalARSC") {
  if(this.value == 1)
{    
  /*var dateString = new Date().toLocaleString("en-US", {
        timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
    }).replace(/[^ -~]/g, '');
    var dateObject = new Date(dateString);
    var curyear = dateObject.getFullYear();
    var curyearMonth = dateObject.getMonth() + 1;
    var curyearDay = dateObject.getDate();
    var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
    AdminDate.value = d;*/
   $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetails",
                dataType: 'json',
                success: function(myresopnse) {
                       AdminDate.value = myresopnse.SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
    AdminDate.enabled = false;

    ARSCSign.value = logUser.value;
    ARSCSign.enabled = false;
}else{
  ARSCSign.value = "";
  AdminDate.value = "";
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ARSCSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_ARSCSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_mainSubmit_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_summer_winter_session_student_course_withdrawal_summer_winter_session.generated_mainSubmit_click0 = function (scope) {
    with(this) {
        with(scope) {
            withdrawalInstructions.visible=false;

//alert("submit");
/*alert("val"+LastName.value+"|"+FirstName.value+"|"+StudentID.value+"|"+Major.value+"|"+DegreeObjective.value+"|"+TelephoneNo.value+"|"+Email.value+"|"+TermCode.value+"|"+ TermDesc.value+"|"+studentCB.value+"|"+StudentSign.value+"|"+StudentSignDate.value+"|"+AllCoursWithdrawRB.value+"|"+AcademicPlan.value+"|"+ProgramPlan.value);*/
if (CB1.value === null && CB2.value === null && CB3.value === null && CB4.value === null && CB5.value === null && CB6.value === null && CB7.value === null && CB8.value === null && CB9.value === null && CB10.value === null && CB11.value === null && CB12.value === null && CB13.value === null && CB14.value === null && CB15.value === null) {
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].NonMedicalWithdrawal[0].courseWithdrawalInfo[0].CourseInfoTablePanle[0].table1[0]");
   // alert("Please select the courses");
   document.getElementById("selectCourseAlert").style.display = "block"; 
   document.getElementById("okBtnId5").onclick = function() {
   document.getElementById("selectCourseAlert").style.display = "none";
   };
} else if (LastName.value !== null && FirstName.value !== null && StudentID.value !== null && Major.value !== null && DegreeObjective.value !== null && TelephoneNo.value !== null && Email.value !== null && TermCode.value !== null && TermDesc.value !== null && (studentCB.value !== null || studentMedCB.value !== null) && StudentSign.value !== null && StudentSignDate.value !== null && AcademicPlan.value !== null && ProgramPlan.value !== null) {
    //alert("1");
    //alert("inside");
    if (CB1.value != 1) {
        //Row2

        CourseNo1.value = null;
        ScheduleNo1.value = null;
        UnitNo1.value = null;
        InstructorName1.value = null;
    } else {
        InstructorLname1.value = (InstructorName1.value).substring(0, (InstructorName1.value).indexOf(","));
    }
    if (CB2.value != 1) {
        //Row2
        CourseNo2.value = null;
        ScheduleNo2.value = null;
        UnitNo2.value = null;
        InstructorName2.value = null;
    } else {
        InstructorLname2.value = (InstructorName2.value).substring(0, (InstructorName2.value).indexOf(","));
    }
    if (CB3.value != 1) {
        //Row3
        CourseNo3.value = null;
        ScheduleNo3.value = null;
        UnitNo3.value = null;
        InstructorName3.value = null;
    } else {
        InstructorLname3.value = (InstructorName3.value).substring(0, (InstructorName3.value).indexOf(","));
    }
    if (CB4.value != 1) {
        //Row4
        CourseNo4.value = null;
        ScheduleNo4.value = null;
        UnitNo4.value = null;
        InstructorName4.value = null;
    } else {
        InstructorLname4.value = (InstructorName4.value).substring(0, (InstructorName4.value).indexOf(","));
    }
    if (CB5.value != 1) {
        //Row5
        CourseNo5.value = null;
        ScheduleNo5.value = null;
        UnitNo5.value = null;
        InstructorName5.value = null;
    } else {
        InstructorLname5.value = (InstructorName5.value).substring(0, (InstructorName5.value).indexOf(","));
    }
    if (CB6.value != 1) {
        //Row6
        CourseNo6.value = null;
        ScheduleNo6.value = null;
        UnitNo6.value = null;
        InstructorName6.value = null;
    } else {
        InstructorLname6.value = (InstructorName6.value).substring(0, (InstructorName6.value).indexOf(","));
    }
    if (CB7.value != 1) {
        //Row7
        CourseNo7.value = null;
        ScheduleNo7.value = null;
        UnitNo7.value = null;
        InstructorName7.value = null;
    } else {
        InstructorLname7.value = (InstructorName7.value).substring(0, (InstructorName7.value).indexOf(","));
    }
    if (CB8.value != 1) {
        //Row8
        CourseNo8.value = null;
        ScheduleNo8.value = null;
        UnitNo8.value = null;
        InstructorName8.value = null;
    } else {
        InstructorLname8.value = (InstructorName8.value).substring(0, (InstructorName8.value).indexOf(","));
    }
    if (CB9.value != 1) {
        //Row9
        CourseNo9.value = null;
        ScheduleNo9.value = null;
        UnitNo9.value = null;
        InstructorName9.value = null;
    } else {
        InstructorLname9.value = (InstructorName9.value).substring(0, (InstructorName9.value).indexOf(","));
    }
    if (CB10.value != 1) {
        //Row10
        CourseNo10.value = null;
        ScheduleNo10.value = null;
        UnitNo10.value = null;
        InstructorName10.value = null;
    } else {
        InstructorLname10.value = (InstructorName10.value).substring(0, (InstructorName10.value).indexOf(","));
    }
    if (CB11.value != 1) {
        //Row11
        CourseNo11.value = null;
        ScheduleNo11.value = null;
        UnitNo11.value = null;
        InstructorName11.value = null;
    } else {
        InstructorLname11.value = (InstructorName11.value).substring(0, (InstructorName11.value).indexOf(","));
    }
    if (CB12.value != 1) {
        //Row12
        //alert("12");
        CourseNo12.value = null;
        ScheduleNo12.value = null;
        UnitNo12.value = null;
        InstructorName12.value = null;
    } else {
        InstructorLname12.value = (InstructorName12.value).substring(0, (InstructorName12.value).indexOf(","));
    }
    if (CB13.value != 1) {
        //Row13
        CourseNo13.value = null;
        ScheduleNo13.value = null;
        UnitNo13.value = null;
        InstructorName13.value = null;
    } else {
        InstructorLname13.value = (InstructorName13.value).substring(0, (InstructorName13.value).indexOf(","));
    }
    if (CB14.value != 1) {
        //Row14
        CourseNo14.value = null;
        ScheduleNo14.value = null;
        UnitNo14.value = null;
        InstructorName14.value = null;
    } else {
        InstructorLname14.value = (InstructorName14.value).substring(0, (InstructorName14.value).indexOf(","));
    }
    if (CB15.value != 1) {
        //Row15
        CourseNo15.value = null;
        ScheduleNo15.value = null;
        UnitNo15.value = null;
        InstructorName15.value = null;
    } else {
        InstructorLname15.value = (InstructorName15.value).substring(0, (InstructorName15.value).indexOf(","));
    }
    CourseNumberList.value = "";    
    classSectionList.value = "";
  aftiaTextBox.value = ""; 
  var termType = null;
  if(typeOfForm.value == 1){
    termType = "Non-Medical";
         
  }else{
    termType = "Medical";
  }     
      if(aftiaTextBox.value === null){
       aftiaDescCWID.value = FirstName.value + " " + LastName.value + " " + StudentID.value + " Type: " + termType;
        aftiaTextBox.value = FirstName.value + " " + LastName.value + " " + StudentID.value + " Type: " + termType;
      }
  
    if (CB1.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo1.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo1.value;
			}       

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber1.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber1.value;
        }
		
		hiddenCourse1.value = CourseNo1.value;
   
    }
    if (CB2.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo2.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo2.value;
        }

        

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber2.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber2.value;
        }
		
		hiddenCourse2.value = CourseNo2.value;
    }
    if (CB3.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo3.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo3.value;
        }

       

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber3.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber3.value;
        }
		
		hiddenCourse3.value = CourseNo3.value;
    }
    if (CB4.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo4.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo4.value;
        }        

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber4.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber4.value;
        }
		
		hiddenCourse4.value = CourseNo4.value;
    }
    if (CB5.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo5.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo5.value;
        }        

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber5.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber5.value;
        }
		
		hiddenCourse5.value = CourseNo5.value;
    }
    if (CB6.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo6.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo6.value;
        }        

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber6.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber6.value;
        }
		
		hiddenCourse6.value = CourseNo6.value;
    }
    if (CB7.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo7.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo7.value;
        }       

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber7.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber7.value;
        }
		
		hiddenCourse7.value = CourseNo7.value;
    }
    if (CB8.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo8.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo8.value;
        }    

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber8.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber8.value;
        }
		
		hiddenCourse8.value = CourseNo8.value;
    }
    if (CB9.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo9.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo9.value;
        }   

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber9.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber9.value;
        }
		
		hiddenCourse9.value = CourseNo9.value;
    }
    if (CB10.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo10.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo10.value;
        }       

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber10.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber10.value;
        }
		
		hiddenCourse10.value = CourseNo10.value;
    }
    if (CB11.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo11.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo11.value;
        }       

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber11.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber11.value;
        }
		
		hiddenCourse11.value = CourseNo11.value;
    }
    if (CB12.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo12.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo12.value;
        }        

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber12.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber12.value;
        }
		
		hiddenCourse12.value = CourseNo12.value;
    }
    if (CB13.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo13.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo13.value;
        }       

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber13.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber13.value;
        }
		
		hiddenCourse13.value = CourseNo13.value;
    }
    if (CB14.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo14.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo14.value;
        }       

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber14.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber14.value;
        }
		
		hiddenCourse14.value = CourseNo14.value;
    }
    if (CB15.value !== null) {
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo15.value;
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo15.value;
        }      

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber15.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber15.value;
        }
		
		hiddenCourse15.value = CourseNo15.value;
    }


    SubjectLine.value = "";
    SubjectLine.value = ("Test - Student Course Withdrawal Request - " + StudentID.value);
    SubjectLineARSC.value = "";
    SubjectLineARSC.value = ("Test - Student Course Withdrawal - ARSC Review " + StudentID.value);
    SubjectLineMedical.value = "";
    SubjectLineMedical.value = ("Test - Student Course Withdrawal - Medical Review " + StudentID.value);
    if (typeOfForm.value == "2") {
        /*    
        ChairEmailID1.value = "csuf@fullerton.edu";
        ChairEmailID2.value = "csuf@fullerton.edu";
        ChairEmailID3.value = "csuf@fullerton.edu";
        ChairEmailID4.value = "csuf@fullerton.edu";
        ChairEmailID5.value = "csuf@fullerton.edu";
        ChairEmailID6.value = "csuf@fullerton.edu";
        ChairEmailID7.value = "csuf@fullerton.edu";
        ChairEmailID8.value = "csuf@fullerton.edu";
        ChairEmailID9.value = "csuf@fullerton.edu";
        ChairEmailID10.value = "csuf@fullerton.edu";
        ChairEmailID11.value = "csuf@fullerton.edu";
        ChairEmailID12.value = "csuf@fullerton.edu";
        ChairEmailID13.value = "csuf@fullerton.edu";
        ChairEmailID14.value = "csuf@fullerton.edu";
        ChairEmailID15.value = "csuf@fullerton.edu";

          	 
        InstructorEmail1.value = "csuf@fullerton.edu";
        InstructorEmail2.value = "csuf@fullerton.edu";
        InstructorEmail3.value = "csuf@fullerton.edu";
        InstructorEmail4.value = "csuf@fullerton.edu";
        InstructorEmail5.value = "csuf@fullerton.edu";
        InstructorEmail6.value = "csuf@fullerton.edu";
        InstructorEmail7.value = "csuf@fullerton.edu";
        InstructorEmail8.value = "csuf@fullerton.edu";
        InstructorEmail9.value = "csuf@fullerton.edu";
        InstructorEmail10.value = "csuf@fullerton.edu";
        InstructorEmail11.value = "csuf@fullerton.edu";
        InstructorEmail12.value = "csuf@fullerton.edu";
        InstructorEmail13.value = "csuf@fullerton.edu";
        InstructorEmail14.value = "csuf@fullerton.edu";
        InstructorEmail15.value = "csuf@fullerton.edu";
        */
       ChairEmailID1.value = "shreyas.manjunatha@thoughtfocus.com";
        ChairEmailID2.value ="shreyas.manjunatha@thoughtfocus.com";
        ChairEmailID3.value = "shreyas.manjunatha@thoughtfocus.com";
        ChairEmailID4.value = "shreyas.manjunatha@thoughtfocus.com";
        ChairEmailID5.value = "shreyas.manjunatha@thoughtfocus.com";
        ChairEmailID6.value = "shreyas.manjunatha@thoughtfocus.com";
        ChairEmailID7.value = "shreyas.manjunatha@thoughtfocus.com";
        ChairEmailID8.value = "shreyas.manjunatha@thoughtfocus.com";
        ChairEmailID9.value = "shreyas.manjunatha@thoughtfocus.com";
        ChairEmailID10.value = "shreyas.manjunatha@thoughtfocus.com";
        ChairEmailID11.value = "shreyas.manjunatha@thoughtfocus.com";
        ChairEmailID12.value = "shreyas.manjunatha@thoughtfocus.com";
        ChairEmailID13.value ="shreyas.manjunatha@thoughtfocus.com";
        ChairEmailID14.value = "shreyas.manjunatha@thoughtfocus.com";
        ChairEmailID15.value = "shreyas.manjunatha@thoughtfocus.com";

          	 
        InstructorEmail1.value = "shreyas.manjunatha@thoughtfocus.com";
        InstructorEmail2.value ="shreyas.manjunatha@thoughtfocus.com";
        InstructorEmail3.value = "shreyas.manjunatha@thoughtfocus.com";
        InstructorEmail4.value = "shreyas.manjunatha@thoughtfocus.com";
        InstructorEmail5.value ="shreyas.manjunatha@thoughtfocus.com";
        InstructorEmail6.value ="shreyas.manjunatha@thoughtfocus.com";
        InstructorEmail7.value = "shreyas.manjunatha@thoughtfocus.com";
        InstructorEmail8.value = "shreyas.manjunatha@thoughtfocus.com";
        InstructorEmail9.value = "shreyas.manjunatha@thoughtfocus.com";
        InstructorEmail10.value = "shreyas.manjunatha@thoughtfocus.com";
        InstructorEmail11.value = "shreyas.manjunatha@thoughtfocus.com";
        InstructorEmail12.value = "shreyas.manjunatha@thoughtfocus.com";
        InstructorEmail13.value = "shreyas.manjunatha@thoughtfocus.com";
        InstructorEmail14.value = "shreyas.manjunatha@thoughtfocus.com";
        InstructorEmail15.value = "shreyas.manjunatha@thoughtfocus.com";
        
      
      
    }


    //Uncomment 255-269 and remove 270-316
    AdminEmailID1.value = "soumya.ravindra@thoughtfocus.com";
    AdminEmailID2.value = "soumya.ravindra@thoughtfocus.com";
    AdminEmailID3.value = "soumya.ravindra@thoughtfocus.com";
    AdminEmailID4.value = "soumya.ravindra@thoughtfocus.com";
    AdminEmailID5.value = "soumya.ravindra@thoughtfocus.com";
    AdminEmailID6.value = "soumya.ravindra@thoughtfocus.com";
    AdminEmailID7.value = "soumya.ravindra@thoughtfocus.com";
    AdminEmailID8.value = "soumya.ravindra@thoughtfocus.com";
    AdminEmailID9.value = "soumya.ravindra@thoughtfocus.com";
    AdminEmailID10.value = "soumya.ravindra@thoughtfocus.com";
    AdminEmailID11.value = "soumya.ravindra@thoughtfocus.com";
    AdminEmailID12.value = "soumya.ravindra@thoughtfocus.com";
    AdminEmailID13.value = "soumya.ravindra@thoughtfocus.com";
    AdminEmailID14.value = "soumya.ravindra@thoughtfocus.com";
    AdminEmailID15.value = "soumya.ravindra@thoughtfocus.com";  
    /*AdminEmailID1.value = "yjayaram@fullerton.edu";
    AdminEmailID2.value = "yjayaram@fullerton.edu";
    AdminEmailID3.value = "yjayaram@fullerton.edu";
    AdminEmailID4.value = "yjayaram@fullerton.edu";
    AdminEmailID5.value = "yjayaram@fullerton.edu";
    AdminEmailID6.value = "yjayaram@fullerton.edu";
    AdminEmailID7.value = "yjayaram@fullerton.edu";
    AdminEmailID8.value = "yjayaram@fullerton.edu";
    AdminEmailID9.value = "yjayaram@fullerton.edu";
    AdminEmailID10.value = "yjayaram@fullerton.edu";
    AdminEmailID11.value = "yjayaram@fullerton.edu";
    AdminEmailID12.value = "yjayaram@fullerton.edu";
    AdminEmailID13.value = "yjayaram@fullerton.edu";
    AdminEmailID14.value = "yjayaram@fullerton.edu";
    AdminEmailID15.value = "yjayaram@fullerton.edu";

    ChairEmailID1.value = "yjayaram@fullerton.edu";
    ChairEmailID2.value = "yjayaram@fullerton.edu";
    ChairEmailID3.value = "yjayaram@fullerton.edu";
    ChairEmailID4.value = "yjayaram@fullerton.edu";
    ChairEmailID5.value = "yjayaram@fullerton.edu";
    ChairEmailID6.value = "yjayaram@fullerton.edu";
    ChairEmailID7.value = "yjayaram@fullerton.edu";
    ChairEmailID8.value = "yjayaram@fullerton.edu";
    ChairEmailID9.value = "yjayaram@fullerton.edu";
    ChairEmailID10.value = "yjayaram@fullerton.edu";
    ChairEmailID11.value = "yjayaram@fullerton.edu";
    ChairEmailID12.value = "yjayaram@fullerton.edu";
    ChairEmailID13.value = "yjayaram@fullerton.edu";
    ChairEmailID14.value = "yjayaram@fullerton.edu";
    ChairEmailID15.value = "yjayaram@fullerton.edu";

	InstructorEmail1.value = "yjayaram@fullerton.edu";
    InstructorEmail2.value = "yjayaram@fullerton.edu";
    InstructorEmail3.value = "yjayaram@fullerton.edu";
    InstructorEmail4.value = "yjayaram@fullerton.edu";
    InstructorEmail5.value = "yjayaram@fullerton.edu";
    InstructorEmail6.value = "yjayaram@fullerton.edu";
    InstructorEmail7.value = "yjayaram@fullerton.edu";
    InstructorEmail8.value = "yjayaram@fullerton.edu";
    InstructorEmail9.value = "yjayaram@fullerton.edu";
    InstructorEmail10.value = "yjayaram@fullerton.edu";
    InstructorEmail11.value = "yjayaram@fullerton.edu";
    InstructorEmail12.value = "yjayaram@fullerton.edu";
    InstructorEmail13.value = "yjayaram@fullerton.edu";
    InstructorEmail14.value = "yjayaram@fullerton.edu";
    InstructorEmail15.value = "yjayaram@fullerton.edu";

    Email.value = "yjayaram@fullerton.edu";*/
   ChairEmailID1.value = "shreyas.manjunatha@thoughtfocus.com";
    ChairEmailID2.value = "shreyas.manjunatha@thoughtfocus.com";
    ChairEmailID3.value = "shreyas.manjunatha@thoughtfocus.com";
    ChairEmailID4.value = "shreyas.manjunatha@thoughtfocus.com";
    ChairEmailID5.value = "shreyas.manjunatha@thoughtfocus.com";
    ChairEmailID6.value = "shreyas.manjunatha@thoughtfocus.com";
    ChairEmailID7.value = "shreyas.manjunatha@thoughtfocus.com";
    ChairEmailID8.value = "shreyas.manjunatha@thoughtfocus.com";
    ChairEmailID9.value = "shreyas.manjunatha@thoughtfocus.com";
    ChairEmailID10.value = "shreyas.manjunatha@thoughtfocus.com";
    ChairEmailID11.value = "shreyas.manjunatha@thoughtfocus.com";
    ChairEmailID12.value = "shreyas.manjunatha@thoughtfocus.com";
    ChairEmailID13.value = "shreyas.manjunatha@thoughtfocus.com";
    ChairEmailID14.value = "shreyas.manjunatha@thoughtfocus.com";
    ChairEmailID15.value = "shreyas.manjunatha@thoughtfocus.com";
  
  InstructorEmail1.value = "shreyas.manjunatha@thoughtfocus.com";
    InstructorEmail2.value = "shreyas.manjunatha@thoughtfocus.com";
    InstructorEmail3.value = "shreyas.manjunatha@thoughtfocus.com";
    InstructorEmail4.value = "shreyas.manjunatha@thoughtfocus.com";
    InstructorEmail5.value = "shreyas.manjunatha@thoughtfocus.com";
    InstructorEmail6.value = "shreyas.manjunatha@thoughtfocus.com";
    InstructorEmail7.value ="shreyas.manjunatha@thoughtfocus.com";
    InstructorEmail8.value = "shreyas.manjunatha@thoughtfocus.com";
    InstructorEmail9.value = "shreyas.manjunatha@thoughtfocus.com";
    InstructorEmail10.value = "shreyas.manjunatha@thoughtfocus.com";
    InstructorEmail11.value = "shreyas.manjunatha@thoughtfocus.com";
    InstructorEmail12.value = "shreyas.manjunatha@thoughtfocus.com";
    InstructorEmail13.value = "shreyas.manjunatha@thoughtfocus.com";
    InstructorEmail14.value = "shreyas.manjunatha@thoughtfocus.com";
    InstructorEmail15.value = "shreyas.manjunatha@thoughtfocus.com";
  
  Email.value = "shreyas.manjunatha@thoughtfocus.com";
  
    //if (typeOfForm.value == "2") {
    if (supportDoc1.fileAttachment.value === null && supportDoc2.fileAttachment.value === null && supportDoc3.fileAttachment.value === null && supportDoc4.fileAttachment.value === null) {
        supDocErrorMessage.visible = true;  
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].NonMedicalWithdrawal[0].supportingDocuments[0]");
        supportDoc1.fileAttachment.mandatory = "error";      
    } else{
      supportDoc1.fileAttachment.mandatory = ""; 
      supDocErrorMessage.visible = false; 
    }

/*} else {
    supportDoc1.fileAttachment.mandatory = "";  
   supDocErrorMessage.visible = false; 
}*/
        guideBridge.submit();
    //}
} else {
    // alert("2");
    CourseNumberList.value = "";    
    classSectionList.value = "";
  aftiaTextBox.value = ""; 
  var termType = null;
  if(typeOfForm.value == 1){
    termType = "Non-Medical";
         
  }else{
    termType = "Medical";
  } 
  if(aftiaTextBox.value === null){
        aftiaDescCWID.value = FirstName.value + " " + LastName.value + " " + StudentID.value + " Type: " + termType;
        aftiaTextBox.value = FirstName.value + " " + LastName.value + " " + StudentID.value + " Type: " + termType;
      }
    if (CB1.value !== null) {
      InstructorLname1.value = (InstructorName1.value).substring(0, (InstructorName1.value).indexOf(","));
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo1.value;

            
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo1.value;
        }       

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber1.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber1.value;
        }

		hiddenCourse1.value = CourseNo1.value;	

    }
    if (CB2.value !== null) {
        InstructorLname2.value = (InstructorName2.value).substring(0, (InstructorName2.value).indexOf(","));
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo2.value;
          
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo2.value;
        }

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber2.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber2.value;
        }
		
		hiddenCourse2.value = CourseNo2.value;
    }
    if (CB3.value !== null) {
         InstructorLname3.value = (InstructorName3.value).substring(0, (InstructorName3.value).indexOf(","));
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo3.value;
         
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo3.value;
        }        

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber3.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber3.value;
        }
		
		hiddenCourse3.value = CourseNo3.value;
    }
    if (CB4.value !== null) {
       InstructorLname4.value = (InstructorName4.value).substring(0, (InstructorName4.value).indexOf(","));
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo4.value;
           
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo4.value;
        }        

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber4.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber4.value;
        }
		
		hiddenCourse4.value = CourseNo4.value;
    }
    if (CB5.value !== null) {
        InstructorLname5.value = (InstructorName5.value).substring(0, (InstructorName5.value).indexOf(","));
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo5.value;
          
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo5.value;
        }        

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber5.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber5.value;
        }
		
		hiddenCourse5.value = CourseNo5.value;
    }
    if (CB6.value !== null) {
        InstructorLname6.value = (InstructorName6.value).substring(0, (InstructorName6.value).indexOf(","));
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo6.value;
          
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo6.value;
        }        

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber6.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber6.value;
        }
		
		hiddenCourse6.value = CourseNo6.value;
    }
    if (CB7.value !== null) {
      InstructorLname7.value = (InstructorName7.value).substring(0, (InstructorName7.value).indexOf(","));
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo7.value;
            
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo7.value;
        }       

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber7.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber7.value;
        }
		
		hiddenCourse7.value = CourseNo7.value;
    }
    if (CB8.value !== null) {
       InstructorLname8.value = (InstructorName8.value).substring(0, (InstructorName8.value).indexOf(","));
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo8.value;
           
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo8.value;
        }        

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber8.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber8.value;
        }
		
		hiddenCourse8.value = CourseNo8.value;
    }
    if (CB9.value !== null) {
        InstructorLname9.value = (InstructorName9.value).substring(0, (InstructorName9.value).indexOf(","));
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo9.value;
          
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo9.value;
        }        

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber9.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber9.value;
        }
		
		hiddenCourse9.value = CourseNo9.value;
    }
    if (CB10.value !== null) {
       InstructorLname10.value = (InstructorName10.value).substring(0, (InstructorName10.value).indexOf(","));
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo10.value;
           
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo10.value;
        }        

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber10.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber10.value;
        }
		
		hiddenCourse10.value = CourseNo10.value;
    }
    if (CB11.value !== null) {
      InstructorLname11.value = (InstructorName11.value).substring(0, (InstructorName11.value).indexOf(","));
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo11.value;
            
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo11.value;
        }       

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber11.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber11.value;
        }
		
		hiddenCourse11.value = CourseNo11.value;
    }
    if (CB12.value !== null) {
InstructorLname12.value = (InstructorName12.value).substring(0, (InstructorName12.value).indexOf(","));
        if (CourseNumberList.value === null) {

            CourseNumberList.value = CourseNo12.value;
            
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo12.value;
        }        

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber12.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber12.value;
        }
		
		hiddenCourse12.value = CourseNo12.value;
    }
    if (CB13.value !== null) {
       InstructorLname13.value = (InstructorName13.value).substring(0, (InstructorName13.value).indexOf(","));
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo13.value;
           
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo13.value;
        }     

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber13.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber13.value;
        }
		
		hiddenCourse13.value = CourseNo13.value;
    }
    if (CB14.value !== null) {
        InstructorLname14.value = (InstructorName14.value).substring(0, (InstructorName14.value).indexOf(","));
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo14.value;
          
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo14.value;
        }       

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber14.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber14.value;
        }
		
		hiddenCourse14.value = CourseNo14.value;
    }
    if (CB15.value !== null) {
       InstructorLname15.value = (InstructorName15.value).substring(0, (InstructorName15.value).indexOf(","));
        if (CourseNumberList.value === null) {
            CourseNumberList.value = CourseNo15.value;
           
        } else {
            CourseNumberList.value = CourseNumberList.value + "," + CourseNo15.value;
        }      

        if (classSectionList.value === null) {
            classSectionList.value = sectionNumber15.value;
        } else {
            classSectionList.value = classSectionList.value + "," + sectionNumber15.value;
        }
		
		hiddenCourse15.value = CourseNo15.value;
    }
    SubjectLine.value = "";
    SubjectLine.value = ("Test - Student Course Withdrawal Request - " + StudentID.value);
    SubjectLineARSC.value = "";
    SubjectLineARSC.value = ("Test- Student Course Withdrawal - ARSC Review " + StudentID.value);
    SubjectLineMedical.value = "";
    SubjectLineMedical.value = ("Test - Student Course Withdrawal - Medical Review " + StudentID.value);
    if (typeOfForm.value == "2") {
        /* 
        ChairEmailID1.value = "csuf@fullerton.edu";
        ChairEmailID2.value = "csuf@fullerton.edu";
        ChairEmailID3.value = "csuf@fullerton.edu";
        ChairEmailID4.value = "csuf@fullerton.edu";
        ChairEmailID5.value = "csuf@fullerton.edu";
        ChairEmailID6.value = "csuf@fullerton.edu";
        ChairEmailID7.value = "csuf@fullerton.edu";
        ChairEmailID8.value = "csuf@fullerton.edu";
        ChairEmailID9.value = "csuf@fullerton.edu";
        ChairEmailID10.value = "csuf@fullerton.edu";
        ChairEmailID11.value = "csuf@fullerton.edu";
        ChairEmailID12.value = "csuf@fullerton.edu";
        ChairEmailID13.value = "csuf@fullerton.edu";
        ChairEmailID14.value = "csuf@fullerton.edu";
        ChairEmailID15.value = "csuf@fullerton.edu";

          	 
        InstructorEmail1.value = "csuf@fullerton.edu";
        InstructorEmail2.value = "csuf@fullerton.edu";
        InstructorEmail3.value = "csuf@fullerton.edu";
        InstructorEmail4.value = "csuf@fullerton.edu";
        InstructorEmail5.value = "csuf@fullerton.edu";
        InstructorEmail6.value = "csuf@fullerton.edu";
        InstructorEmail7.value = "csuf@fullerton.edu";
        InstructorEmail8.value = "csuf@fullerton.edu";
        InstructorEmail9.value = "csuf@fullerton.edu";
        InstructorEmail10.value = "csuf@fullerton.edu";
        InstructorEmail11.value = "csuf@fullerton.edu";
        InstructorEmail12.value = "csuf@fullerton.edu";
        InstructorEmail13.value = "csuf@fullerton.edu";
        InstructorEmail14.value = "csuf@fullerton.edu";
        InstructorEmail15.value = "csuf@fullerton.edu";
        */
    }


    //Uncomment 477-491 and remove 492-539
    AdminEmailID1.value = "chaitanya.sai@thoughtfocus.com";
    AdminEmailID2.value = "chaitanya.sai@thoughtfocus.com";
    AdminEmailID3.value = "chaitanya.sai@thoughtfocus.com";
    AdminEmailID4.value = "chaitanya.sai@thoughtfocus.com";
    AdminEmailID5.value = "chaitanya.sai@thoughtfocus.com";
    AdminEmailID6.value = "chaitanya.sai@thoughtfocus.com";
    AdminEmailID7.value = "chaitanya.sai@thoughtfocus.com";
    AdminEmailID8.value = "chaitanya.sai@thoughtfocus.com";
    AdminEmailID9.value = "chaitanya.sai@thoughtfocus.com";
    AdminEmailID10.value = "chaitanya.sai@thoughtfocus.com";
    AdminEmailID11.value = "chaitanya.sai@thoughtfocus.com";
    AdminEmailID12.value = "chaitanya.sai@thoughtfocus.com";
    AdminEmailID13.value ="chaitanya.sai@thoughtfocus.com";
    AdminEmailID14.value = "chaitanya.sai@thoughtfocus.com";
    AdminEmailID15.value = "chaitanya.sai@thoughtfocus.com";
    ChairEmailID1.value = "chaitanya.sai@thoughtfocus.com";
    ChairEmailID2.value = "chaitanya.sai@thoughtfocus.com";
    ChairEmailID3.value = "chaitanya.sai@thoughtfocus.com";
    ChairEmailID4.value = "chaitanya.sai@thoughtfocus.com";
    ChairEmailID5.value = "chaitanya.sai@thoughtfocus.com";
    ChairEmailID6.value = "chaitanya.sai@thoughtfocus.com";
    ChairEmailID7.value = "chaitanya.sai@thoughtfocus.com";
    ChairEmailID8.value ="chaitanya.sai@thoughtfocus.com";
    ChairEmailID9.value = "chaitanya.sai@thoughtfocus.com";
    ChairEmailID10.value = "chaitanya.sai@thoughtfocus.com";
    ChairEmailID11.value = "chaitanya.sai@thoughtfocus.com";
    ChairEmailID12.value = "chaitanya.sai@thoughtfocus.com";
    ChairEmailID13.value = "chaitanya.sai@thoughtfocus.com";
    ChairEmailID14.value = "chaitanya.sai@thoughtfocus.com";
    ChairEmailID15.value = "chaitanya.sai@thoughtfocus.com";
  
  InstructorEmail1.value = "chaitanya.sai@thoughtfocus.com";
    InstructorEmail2.value = "chaitanya.sai@thoughtfocus.com";
    InstructorEmail3.value = "chaitanya.sai@thoughtfocus.com";
    InstructorEmail4.value = "chaitanya.sai@thoughtfocus.com";
    InstructorEmail5.value = "chaitanya.sai@thoughtfocus.com";
    InstructorEmail6.value = "chaitanya.sai@thoughtfocus.com";
    InstructorEmail7.value ="chaitanya.sai@thoughtfocus.com";
    InstructorEmail8.value = "chaitanya.sai@thoughtfocus.com";
    InstructorEmail9.value = "chaitanya.sai@thoughtfocus.com";
    InstructorEmail10.value = "chaitanya.sai@thoughtfocus.com";
    InstructorEmail11.value = "chaitanya.sai@thoughtfocus.com";
    InstructorEmail12.value = "chaitanya.sai@thoughtfocus.com";
    InstructorEmail13.value ="chaitanya.sai@thoughtfocus.com";
    InstructorEmail14.value = "chaitanya.sai@thoughtfocus.com";
    InstructorEmail15.value = "chaitanya.sai@thoughtfocus.com";
  /*AdminEmailID1.value = "yjayaram@fullerton.edu";
    AdminEmailID2.value = "yjayaram@fullerton.edu";
    AdminEmailID3.value = "yjayaram@fullerton.edu";
    AdminEmailID4.value = "yjayaram@fullerton.edu";
    AdminEmailID5.value = "yjayaram@fullerton.edu";
    AdminEmailID6.value = "yjayaram@fullerton.edu";
    AdminEmailID7.value = "yjayaram@fullerton.edu";
    AdminEmailID8.value = "yjayaram@fullerton.edu";
    AdminEmailID9.value = "yjayaram@fullerton.edu";
    AdminEmailID10.value = "yjayaram@fullerton.edu";
    AdminEmailID11.value = "yjayaram@fullerton.edu";
    AdminEmailID12.value = "yjayaram@fullerton.edu";
    AdminEmailID13.value = "yjayaram@fullerton.edu";
    AdminEmailID14.value = "yjayaram@fullerton.edu";
    AdminEmailID15.value = "yjayaram@fullerton.edu";

    ChairEmailID1.value = "yjayaram@fullerton.edu";
    ChairEmailID2.value = "yjayaram@fullerton.edu";
    ChairEmailID3.value = "yjayaram@fullerton.edu";
    ChairEmailID4.value = "yjayaram@fullerton.edu";
    ChairEmailID5.value = "yjayaram@fullerton.edu";
    ChairEmailID6.value = "yjayaram@fullerton.edu";
    ChairEmailID7.value = "yjayaram@fullerton.edu";
    ChairEmailID8.value = "yjayaram@fullerton.edu";
    ChairEmailID9.value = "yjayaram@fullerton.edu";
    ChairEmailID10.value = "yjayaram@fullerton.edu";
    ChairEmailID11.value = "yjayaram@fullerton.edu";
    ChairEmailID12.value = "yjayaram@fullerton.edu";
    ChairEmailID13.value = "yjayaram@fullerton.edu";
    ChairEmailID14.value = "yjayaram@fullerton.edu";
    ChairEmailID15.value = "yjayaram@fullerton.edu";

	InstructorEmail1.value = "yjayaram@fullerton.edu";
    InstructorEmail2.value = "yjayaram@fullerton.edu";
    InstructorEmail3.value = "yjayaram@fullerton.edu";
    InstructorEmail4.value = "yjayaram@fullerton.edu";
    InstructorEmail5.value = "yjayaram@fullerton.edu";
    InstructorEmail6.value = "yjayaram@fullerton.edu";
    InstructorEmail7.value = "yjayaram@fullerton.edu";
    InstructorEmail8.value = "yjayaram@fullerton.edu";
    InstructorEmail9.value = "yjayaram@fullerton.edu";
    InstructorEmail10.value = "yjayaram@fullerton.edu";
    InstructorEmail11.value = "yjayaram@fullerton.edu";
    InstructorEmail12.value = "yjayaram@fullerton.edu";
    InstructorEmail13.value = "yjayaram@fullerton.edu";
    InstructorEmail14.value = "yjayaram@fullerton.edu";
    InstructorEmail15.value = "yjayaram@fullerton.edu";

    Email.value = "yjayaram@fullerton.edu";*/
   Email.value = "chaitanya.sai@thoughtfocus.com";
  
    // if (typeOfForm.value == "2") {
    if (supportDoc1.fileAttachment.value === null && supportDoc2.fileAttachment.value === null && supportDoc3.fileAttachment.value === null && supportDoc4.fileAttachment.value === null) {
        supDocErrorMessage.visible = true;  
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].NonMedicalWithdrawal[0].supportingDocuments[0]");
        supportDoc1.fileAttachment.mandatory = "error";      
    } else{
      supportDoc1.fileAttachment.mandatory = ""; 
      supDocErrorMessage.visible = false; 
    }

/*} else {
    supportDoc1.fileAttachment.mandatory = "";  
   supDocErrorMessage.visible = false; 
}*/
        guideBridge.submit();
    //}
}
        }
	}
}
