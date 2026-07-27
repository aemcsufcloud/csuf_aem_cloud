/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value == "ToMedical" || stepRef.value == "ToMedicalARSC" ) 
{
  var rowCount4 = CourseRow.instanceManager.instanceCount;
    for (n = 0; n < rowCount4; n++) {
   
        if (CourseRow.instanceManager.instances[n].SelectCB.value != "Yes") {
            CourseRow.instanceManager.instances[n].visible = false;
        } else {
            CourseRow.instanceManager.instances[n].visible = true;
        }
    }
}
if (stepRef.value === null) {
    withdrawalInstructions.visible = true;
    basicInformation.visible = false;
    NonMedicalWithdrawal.visible = false;
    mainSubmit.visible = false;
  launchAIAssistantPopup("AI_FORM_URL_HERE");
} else {
    withdrawalInstructions.visible = false;
    studentAgreement.visible = false;
    withdrawalInstructionButton.visible = false;
    basicInformation.visible = true;
    NonMedicalWithdrawal.visible = true;
    mainSubmit.visible = true;
}

/*if (stepRef.value == "ToMedical" || stepRef.value === null) {
    supportingDocuments.visible = true;
    //withdrawalInstructions.visible = false;
}*/
if (stepRef.value === null) {
    StudentSignaturePanel.visible = true;
    StudentSignaturePanel.enabled = true;
    InstructorSignaturePanel.visible = false;
    InstructorSignaturePanel.enabled = false;
    ChairSignaturePanel.visible = false;
    ARSCSignaturePanel.visible = false;
    MedicalReviewSignaturePanel.visible = false;
    AthleticSignaturePanel.visible = false;
    ISSReviewerPanel.visible = false;
    //withdrawalInstructions.visible = false;  
}
if (stepRef.value == "ToInstructor") {

    typeOfForm.enabled = false;
    caseId.enabled = false;
    studentPetitionSecMedical.visible = false;
    StudentPetitionSecNonMedical.visible = true;
    //supportingDocuments.visible = true;
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
    //HiddenSectionPanel.enabled = true;
   AthleticSignaturePanel.visible = false;
    ISSReviewerPanel.visible = false;
    //withdrawalInstructions.visible = false;
}
if (stepRef.value == "ToChair") {
    typeOfForm.enabled = false;
    caseId.enabled = false;
    studentPetitionSecMedical.visible = false;
    StudentPetitionSecNonMedical.visible = true;
    //supportingDocuments.visible = true;
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
   // HiddenSectionPanel.enabled = true;
  AthleticSignaturePanel.visible = false;
    ISSReviewerPanel.visible = false;
    //withdrawalInstructions.visible = false;
}
if (stepRef.value == "ToMedical") {
    typeOfForm.enabled = false;
    caseId.enabled = false;
    studentPetitionSecMedical.visible = true;
    StudentPetitionSecNonMedical.visible = false;
    //supportingDocuments.visible = true;
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
    //HiddenSectionPanel.enabled = true;
  AthleticSignaturePanel.visible = false;
    ISSReviewerPanel.visible = false;
    //withdrawalInstructions.visible = false;
}
if (stepRef.value == "ToARSC") {
    typeOfForm.enabled = false;
    caseId.enabled = false;
    //supportingDocuments.visible = true;
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
    //HiddenSectionPanel.enabled = true;
  if(AthleticReviewerCB.value !== null){
   AthleticSignaturePanel.visible = true;
   AthleticSignaturePanel.enabled = false;
  }else{
     AthleticSignaturePanel.visible = false;
  }
  
  if(ISSReviewerCB.value !== null){
   ISSReviewerPanel.visible = true;
   ISSReviewerPanel.enabled = false;
  }else{
     ISSReviewerPanel.visible = false;
  }
    //withdrawalInstructions.visible = false;

}
if (stepRef.value == "ToMedicalARSC") {
    typeOfForm.enabled = false;
    caseId.enabled = false;
    //studentPetitionSecMedical.visible = true;  
    //StudentPetitionSecNonMedical.visible = false;
    studentPetition.visible = false;
    //supportingDocuments.visible = false;
    StudentSignaturePanel.visible = true;
    StudentSignaturePanel.enabled = false;
	MedicalReviewSignaturePanel.enabled = false;
    InstructorSignaturePanel.visible = false;
    ChairSignaturePanel.visible = false;
    ARSCSignaturePanel.visible = true;
    studentInformation.enabled = false;
    courseWithdrawalInfo.enabled = false;
    studentPetition.enabled = false;
   // HiddenSectionPanel.enabled = true;
    //  InstructorSign.value = "NA";
    InstructorReviewDate.value = "NA";
    InstructorComment.value = "NA";
    //LastdateAttended.value = "NA";
    Grade.value = "NA";
    //  ChairSign.value = "NA";
    ChairComment.value = "NA";
    ChairReviewDate.value = "NA";

    MedicalReviewSignaturePanel.visible = true;
    MedicalReviewSignaturePanel.enabled = false;
  
  if(AthleticReviewerCB.value !== null){
   AthleticSignaturePanel.visible = true;
   AthleticSignaturePanel.enabled = false;
  }else{
     AthleticSignaturePanel.visible = false;
  }
  
  if(ISSReviewerCB.value !== null){
   ISSReviewerPanel.visible = true;
   ISSReviewerPanel.enabled = false;
  }else{
     ISSReviewerPanel.visible = false;
  }
    //withdrawalInstructions.visible = false;
}
if (stepRef.value == "ToARSCReviewed") {
    typeOfForm.enabled = false;
    caseId.enabled = false;
    studentInformationCommonPanel.enabled = false;
    courseWithdrawalInfo.enabled = false;
    studentPetition.enabled = false;
    approvaAndSignature.enabled = false;
    //supportingDocuments.visible = true;
    MedicalReviewSignaturePanel.visible = false;
    // withdrawalInstructions.visible = false;
}
if (stepRef.value == "ToMedicalARSCReviewed") {
    typeOfForm.enabled = false;
    caseId.enabled = false;
    studentInformationCommonPanel.enabled = false;
    courseWithdrawalInfo.enabled = false;
    studentPetition.enabled = false;
    approvaAndSignature.enabled = false;
    //supportingDocuments.visible = false;
    InstructorSignaturePanel.visible = false;
    ChairSignaturePanel.visible = false;
    // withdrawalInstructions.visible = false;
}

if (stepRef.value == "ToISS") {debugger;
   ISSReviewerPanel.visible = true;
  if(AthleticReviewerCB.value !== null){
   AthleticSignaturePanel.visible = true;
   AthleticSignaturePanel.enabled = false;
  }else{
     AthleticSignaturePanel.visible = false;
  }
   if(typeOfForm.value == "1"){
    typeOfForm.enabled = false;
    caseId.enabled = false;
    //supportingDocuments.visible = true;
    StudentSignaturePanel.visible = true;
    StudentSignaturePanel.enabled = false;
      InstructorSignaturePanel.visible = true;
    InstructorSignaturePanel.enabled = false;
   /* if(AutoAdvanceFlag.value != "true"){
    InstructorSignaturePanel.visible = true;
    InstructorSignaturePanel.enabled = false;
    }else{
      InstructorSignaturePanel.visible = false;
    }*/
    ChairSignaturePanel.visible = true;
    ChairSignaturePanel.enabled = false;
    studentPetitionSecMedical.visible = false;
    StudentPetitionSecNonMedical.visible = true;
    ARSCSignaturePanel.visible = false;
    //MedicalReviewerSign.value = "NA";
    MedicalReviewDate.value = "NA";
    MedicalReviewComment.value = "NA";
    RecommendMedical.value = "NA";
    MedicalReviewSignaturePanel.visible = false;
    studentInformation.enabled = false;
    courseWithdrawalInfo.enabled = false;
    studentPetition.enabled = false;
  }
  if(typeOfForm.value == "2"){
     typeOfForm.enabled = false;
    caseId.enabled = false;
    //studentPetitionSecMedical.visible = true;  
    //StudentPetitionSecNonMedical.visible = false;
    studentPetition.visible = false;
    //supportingDocuments.visible = false;
    StudentSignaturePanel.visible = true;
    StudentSignaturePanel.enabled = false;
	MedicalReviewSignaturePanel.enabled = false;
    InstructorSignaturePanel.visible = false;
    ChairSignaturePanel.visible = false;
    ARSCSignaturePanel.visible = false;
    studentInformation.enabled = false;
    courseWithdrawalInfo.enabled = false;
    studentPetition.enabled = false;
    hiddenFieldsPanel.enabled = true;
    //  InstructorSign.value = "NA";
    InstructorReviewDate.value = "NA";
    InstructorComment.value = "NA";
    //LastdateAttended.value = "NA";
    Grade.value = "NA";
    //  ChairSign.value = "NA";
    ChairComment.value = "NA";
    ChairReviewDate.value = "NA";

    MedicalReviewSignaturePanel.visible = true;
    MedicalReviewSignaturePanel.enabled = false;
  }
}

if (stepRef.value == "ToAthletic") {
   AthleticSignaturePanel.visible = true;
  if(ISSReviewerCB.value !== null){
   ISSReviewerPanel.visible = true;
   ISSReviewerPanel.enabled = false;
  }else{
     ISSReviewerPanel.visible = false;
  }
  if(typeOfForm.value == "1"){
    typeOfForm.enabled = false;
    caseId.enabled = false;
    //supportingDocuments.visible = true;
    StudentSignaturePanel.visible = true;
    StudentSignaturePanel.enabled = false;
     InstructorSignaturePanel.visible = true;
    InstructorSignaturePanel.enabled = false;
   /* if(AutoAdvanceFlag.value != "true"){
    InstructorSignaturePanel.visible = true;
    InstructorSignaturePanel.enabled = false;
    }else{
      InstructorSignaturePanel.visible = false;
    }*/
    ChairSignaturePanel.visible = true;
    ChairSignaturePanel.enabled = false;
    studentPetitionSecMedical.visible = false;
    StudentPetitionSecNonMedical.visible = true;
    ARSCSignaturePanel.visible = false;
    //MedicalReviewerSign.value = "NA";
    MedicalReviewDate.value = "NA";
    MedicalReviewComment.value = "NA";
    RecommendMedical.value = "NA";
    MedicalReviewSignaturePanel.visible = false;
    studentInformation.enabled = false;
    courseWithdrawalInfo.enabled = false;
    studentPetition.enabled = false;
  }
  if(typeOfForm.value == "2"){
     typeOfForm.enabled = false;
    caseId.enabled = false;
    //studentPetitionSecMedical.visible = true;  
    //StudentPetitionSecNonMedical.visible = false;
    studentPetition.visible = false;
    //supportingDocuments.visible = false;
    StudentSignaturePanel.visible = true;
    StudentSignaturePanel.enabled = false;
	MedicalReviewSignaturePanel.enabled = false;
    InstructorSignaturePanel.visible = false;
    ChairSignaturePanel.visible = false;
    ARSCSignaturePanel.visible = false;
    studentInformation.enabled = false;
    courseWithdrawalInfo.enabled = false;
    studentPetition.enabled = false;
    hiddenFieldsPanel.enabled = true;
    //  InstructorSign.value = "NA";
    InstructorReviewDate.value = "NA";
    InstructorComment.value = "NA";
    //LastdateAttended.value = "NA";
    Grade.value = "NA";
    //  ChairSign.value = "NA";
    ChairComment.value = "NA";
    ChairReviewDate.value = "NA";

    MedicalReviewSignaturePanel.visible = true;
    MedicalReviewSignaturePanel.enabled = false;
  }
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef!== null){
  document.getElementById('').style.display = "none";
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_guideRootPanel_init2 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_guideRootPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_guideRootPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value == "ToInstructor" || stepRef.value == "ToChair" || stepRef.value == "ToARSC" || stepRef.value == "ToMedicalARSC") {
    if (LookupResult.value !== null) {
        var resultVal = JSON.parse(LookupResult.value);
        var captionText = "Enrolled Courses";
        var tableValBasic = createTable(resultVal.COURSES, captionText);
        $("#courseDisplayTable").append(tableValBasic);


        function createTable(Data, CaptionText) {

            var col = [];
            col.push("CRSE_NAME");
            col.push("CLASS_NBR");
            col.push("UNT_TAKEN");
            col.push("INSTR_NAME");

            var table = document.createElement("table");
            table.id = "tb";
            table.style.width = "100%";
            var caption = document.createElement("caption");
            caption.innerHTML = CaptionText;
            caption.style.fontWeight = "bold";
            caption.style.fontSize = "20px";

            table.appendChild(caption);
            var tr = table.insertRow(-1);
            var headings = ["Course Name", "Class Number", "Number of Units", "Name of Instructor"];
            for (var j = 0; j < headings.length; j++) {
                var th = document.createElement("th");
                th.innerHTML = headings[j];
                tr.appendChild(th);
                th.style.fontSize = "17px";
                th.style.color = "white";
                th.style.background = "#00274c";

            }
            for (var k = 0; k < Data.length; k++) {
                tr = table.insertRow(-1);
                for (var l = 0; l < col.length; l++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.style.color = "black";
                    tabCell.style.fontSize = "15px";
                    tabCell.style.textAlign = "center";
                    tabCell.style.border = "solid 0.25px black";
                    tabCell.innerHTML = Data[k][col[l]];

                    console.log("Data from Table = " + Data[k][col[l]]);
                }
            }
            return table;

        }
    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_studentUserid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_studentUserid_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
  this.visible = true;
} else{
  this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_withdrawalInstructionButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_withdrawalInstructionButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (studentAgreement.value === '' || studentAgreement.value === null) {
    showErrorModal("Alert!","Please accept that you have read and understood the process of medical and non-medical withdrawal");
    this.visible = true;
    medInstructionsPanel.visible = true;

} else {

    basicInformation.visible = true;
    NonMedicalWithdrawal.visible = true;
    mainSubmit.visible = true;
    if (stepRef.value === null) {
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        var button = document.getElementsByClassName("rb1");
        modal.style.display = "block";
        span.onclick = function() {
            if ((document.getElementById("button1").checked === false) && (document.getElementById("button2").checked === false)) {
                modal.style.display = "block";
                document.getElementById("mandatorySelectionAlert").style.display = "block";
                document.getElementById("okBtnId4").onclick = function() {
                    document.getElementById("mandatorySelectionAlert").style.display = "none";
                };

            } else {
                modal.style.display = "none";
            }

        };

        document.getElementById("button1").onclick = function() {
            typeOfForm.value = 1;
            supportDoc1.fileAttachment.mandatory = "";
            headerTextNonMedical.visible = true;
            headerTextMedical.visible = false;
            studentHeaderTextMed.visible = false;
            studentHeaderTextNonMed.visible = true;
            getStudentData();
            modal.style.display = "none";
        };
        document.getElementById("button2").onclick = function() {
            typeOfForm.value = 2;
            supportDoc1.fileAttachment.mandatory = "error";
            headerTextNonMedical.visible = false;
            headerTextMedical.visible = true;
            studentHeaderTextMed.visible = true;
            studentHeaderTextNonMed.visible = false;
            getStudentData();
            modal.style.display = "none";
        };
    }
    this.visible = false;
    withdrawalInstructions.visible = false;
    studentAgreement.visible = false;
}

function getStudentData() {
    //Rule 1 - initilise
    if (stepRef.value === null) {
      
		var gifModal = document.getElementById('gifModal');
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedUserId",
            dataType: 'json',
            success: function(myresponse) {

                if (myresponse.Status == "Success") {

                    var userValue = studentUserid.value;
                    logUser.value = userValue;
                    if (stepRef.value === null) {
                        
                        
                        var userId = userValue; 
                        var typeOfWithdrawal = typeOfForm.value;
                        var term = "2263"; // changed from 2237 to 2243 on 01112024                  
						//userId = 'juwairiahansari';
                        $.ajax({

                            type: 'GET',

                            url: "/bin/getCourseInfoSpringFallSessionForTST",



                            data: {
                                userId: userId,
                                term: term,
                                typeOfWithdrawal: typeOfWithdrawal,
                                typeOfForm:"regular"
                            },

                            dataType: 'json',

                            success: function(myresponse) {
                                gifModal.style.display = "block";
                                if (myresponse.COURSES.length >= 1) {
                                  	LookupResult.value = JSON.stringify(myresponse);
                                    var k;
                                    var rowcountRemoveAll1 = CourseRow.instanceManager.instanceCount;
                                    for (k = 0; k < rowcountRemoveAll1; k++) {
                                        CourseRow.instanceManager.removeInstance(CourseRow.instanceIndex);
                                    }
                                    CourseRow.instanceManager.removeInstance((CourseRow.instanceManager.instanceCount) - 1);
                                    var i;
                                    ProgramPlan.value = myresponse.PROGRAM_PLAN;
                                    LastName.value = myresponse.LNAME;
                                    FirstName.value = myresponse.FNAME;
                                    //Email.value = myresponse.STUDENT_EMAIL;
                                   Email.value = "yjayaram@fullerton.edu";
                                    caseId.value = myresponse.CASEID;
                                    StudentID.value = myresponse.CWID;
                                    Major.value = myresponse.MAJOR_DESCR;
                                    DegreeObjective.value = myresponse.DEGREE_TYPE;
                                    AcademicPlan.value = myresponse.ACADEMIC_PLAN;
                                    International_Students.value = myresponse.INTERNATIONAL_FLAG;
                                    Nursing_Flag.value = myresponse.NURSING_FLAG;
                                    EIP_Flag.value = myresponse.EIP_FLAG;
                                    AthleticFlag.value = myresponse.ATHLETIC_FLAG;
                                    TelephoneNo.value = myresponse.STUDENT_PHONE;
                                    //TermCode.value = myresponse.STRM;
                                    //TermDesc.value = myresponse.TERM_DESCR;
                                    TermCode.value = "2263"; // changed from 2237 to 2243 on 01112024    
                                    TermDesc.value = "Spring 2026"; // changed from Fall 2023 to Spring 2024 on 01112024    
                                    
                                    noRecordMsgNonMed.visible = false;
                                    noRecordMsgMed.visible = false;
                                    for (i = 0; i <myresponse.COURSES.length; i++) {
                                        CourseRow.instanceManager.addInstance();
                                        CourseRow.instanceManager.instances[i].CourseNo.value = myresponse.COURSES[i].CRSE_NAME;
                                        CourseRow.instanceManager.instances[i].ScheduleNo.value = myresponse.COURSES[i].CLASS_NBR;
                                        CourseRow.instanceManager.instances[i].NumberOfUnits.value = myresponse.COURSES[i].UNT_TAKEN;
                                        CourseRow.instanceManager.instances[i].NameOfInstructor.value = myresponse.COURSES[i].INSTR_NAME;
                                        CourseRow.instanceManager.instances[i].SectionNo.value = myresponse.COURSES[i].CLASS_SECTION;
                                    }
                                    var rowcount = CourseRow.instanceManager.instanceCount;
                                    CourseRow.instanceManager.removeInstance(rowcount - 1);
                                    gifModal.style.display = "none";
                                    
                                } else {
                                    
                                    var n;                                   
                                    var rowcountRemoveAll2 = CourseRow.instanceManager.instanceCount;
                                    for (n = 0; n < rowcountRemoveAll2; n++) {
                                        debugger;
                                        CourseRow.instanceManager.removeInstance(CourseRow.instanceIndex);
                                    }
                                    var rowcount1 = CourseRow.instanceManager.instanceCount;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].CourseNo.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].ScheduleNo.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].NumberOfUnits.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].NameOfInstructor.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].SectionNo.value = null;
                                    CourseRow.instanceManager.removeInstance(rowcount1 - 1);
                                    LastName.value = "";
                                    FirstName.value = "";
                                    Email.value = "";
                                    caseId.value = "";
                                    StudentID.value = "";
                                    Major.value = "";
                                    DegreeObjective.value = "";
                                    AcademicPlan.value = "";
                                    International_Students.value = "";
                                    Nursing_Flag.value = "";
                                    EIP_Flag.value = "";
                                    TelephoneNo.value = "";
                                  	LookupResult.value = "";
                                  AthleticFlag.value = "";
                                    gifModal.style.display = "none";
                                    showErrorModal("Alert!", "No matching records found");
                                }
                            },
                            error: function(error) {
                                LookupResult.value = "";
                                if (typeOfForm.value == "1") {
                                    noRecordMsgMed.visible = false;
                                    noRecordMsgNonMed.visible = true;

                                } else {
                                    noRecordMsgNonMed.visible = false;
                                    noRecordMsgMed.visible = true;
                                }
                                // table1.visible = false;

                            }
                        });
                    }




                }

            },
            error: function(error) {
                alert("error block=" + error);
                LookupResult.value = "";
                if (typeOfForm.value == "1") {
                    noRecordMsgMed.visible = false;
                    noRecordMsgNonMed.visible = true;

                } else {
                    noRecordMsgNonMed.visible = false;
                    noRecordMsgMed.visible = true;
                }
                //table1.visible = false;
            }

        });

    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_typeOfForm_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_typeOfForm_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_typeOfForm_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_typeOfForm_valueCommit0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_typeOfForm_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_typeOfForm_valueCommit1 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_typeOfForm_valueCommit2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_typeOfForm_valueCommit2 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
if (typeOfForm.value == "2") {
    supDocGuide2.visible = false;
    supDocGuide1.visible = true;
    supportDoc3.visible = false;
    supportDoc4.visible = false;
    supportDoc3.fileAttachment.value = null;
    supportDoc4.fileAttachment.value = null;
    if (supportDoc1.fileAttachment.value === null && supportDoc2.fileAttachment.value === null && supportDoc3.fileAttachment.value === null && supportDoc4.fileAttachment.value === null) {
        supportDoc1.fileAttachment.mandatory = "error";

    }
} else {
    supDocGuide2.visible = true;
    supDocGuide1.visible = false;
  	supportDoc3.visible = true;
    supportDoc4.visible = true;
   if (supportDoc1.fileAttachment.value === null && supportDoc2.fileAttachment.value === null && supportDoc3.fileAttachment.value === null && supportDoc4.fileAttachment.value === null) {
    //supportDoc1.fileAttachment.mandatory = "error";
   }
   // supDocErrorMessage.visible = false;
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_typeOfForm_valueCommit3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_typeOfForm_valueCommit3 = function (scope) {
    with(this) {
        with(scope) {
             if (stepRef.value === null) {
        debugger;
		var gifModal = document.getElementById('gifModal');
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedUserId",
            dataType: 'json',
            success: function(myresponse) {

                if (myresponse.Status == "Success") {

                    var userValue = studentUserid.value;
                    logUser.value = userValue;
                    if (stepRef.value === null) {
                                          
                        var userId = userValue;
                      	//userId = "juwairiahansari";
                        var typeOfWithdrawal = typeOfForm.value;
                        var term = "2263"; // changed from 2237 to 2243 on 01112024    
                
                        $.ajax({

                            type: 'GET',

                            url: "/bin/getCourseInfoSpringFallSessionForTST",



                            data: {
                                userId: userId,
                                term: term,
                                typeOfWithdrawal: typeOfWithdrawal,
                                typeOfForm:"regular"
                            },

                            dataType: 'json',

                            success: function(myresponse) {
                             
                                if (myresponse.COURSES.length >= 1) {
                                  	LookupResult.value = JSON.stringify(myresponse);
                                    gifModal.style.display = "block";
                                    var k;
                                    var rowcountRemoveAll1 = CourseRow.instanceManager.instanceCount;
                                    for (k = 0; k < rowcountRemoveAll1; k++) {
                                        CourseRow.instanceManager.removeInstance(CourseRow.instanceIndex);
                                    }
                                    CourseRow.instanceManager.removeInstance((CourseRow.instanceManager.instanceCount) - 1);
                                    var i;
                                    ProgramPlan.value = myresponse.PROGRAM_PLAN;
                                    LastName.value = myresponse.LNAME;
                                    FirstName.value = myresponse.FNAME;
                                    //Email.value = myresponse.STUDENT_EMAIL;
                                    Email.value = "yjayaram@fullerton.edu";
                                    caseId.value = myresponse.CASEID;
                                    StudentID.value = myresponse.CWID;
                                    Major.value = myresponse.MAJOR_DESCR;
                                    DegreeObjective.value = myresponse.DEGREE_TYPE;
                                    AcademicPlan.value = myresponse.ACADEMIC_PLAN;
                                    International_Students.value = myresponse.INTERNATIONAL_FLAG;
                                    Nursing_Flag.value = myresponse.NURSING_FLAG;
                                    EIP_Flag.value = myresponse.EIP_FLAG;
                                    AthleticFlag.value = myresponse.ATHLETIC_FLAG;
                                    TelephoneNo.value = myresponse.STUDENT_PHONE;
                                    //TermCode.value = myresponse.STRM;
                                    //TermDesc.value = myresponse.TERM_DESCR;
                                    
                                    TermCode.value = "2263"; // changed from 2237 to 2243 on 01112024    
                                    TermDesc.value = "Spring 2026";    // changed from Fall 2023 to Spring 2024 on 01112024                                  
                                    noRecordMsgNonMed.visible = false;
                                    noRecordMsgMed.visible = false;
                                    for (i = 0; i <myresponse.COURSES.length; i++) {
                                        CourseRow.instanceManager.addInstance();
                                        CourseRow.instanceManager.instances[i].CourseNo.value = myresponse.COURSES[i].CRSE_NAME;
                                        CourseRow.instanceManager.instances[i].ScheduleNo.value = myresponse.COURSES[i].CLASS_NBR;
                                        CourseRow.instanceManager.instances[i].NumberOfUnits.value = myresponse.COURSES[i].UNT_TAKEN;
                                        CourseRow.instanceManager.instances[i].NameOfInstructor.value = myresponse.COURSES[i].INSTR_NAME;
                                        CourseRow.instanceManager.instances[i].SectionNo.value = myresponse.COURSES[i].CLASS_SECTION;
                                    }
                                    var rowcount = CourseRow.instanceManager.instanceCount;
                                    CourseRow.instanceManager.removeInstance(rowcount - 1);
                                    gifModal.style.display = "none";
                                    
                                } else {
                                    
                                    var n;                                   
                                    var rowcountRemoveAll2 = CourseRow.instanceManager.instanceCount;
                                    for (n = 0; n < rowcountRemoveAll2; n++) {
                                        debugger;
                                        CourseRow.instanceManager.removeInstance(CourseRow.instanceIndex);
                                    }
                                    var rowcount1 = CourseRow.instanceManager.instanceCount;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].CourseNo.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].ScheduleNo.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].NumberOfUnits.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].NameOfInstructor.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].SectionNo.value = null;
                                    CourseRow.instanceManager.removeInstance(rowcount1 - 1);
                                    LastName.value = "";
                                    FirstName.value = "";
                                    Email.value = "";
                                    caseId.value = "";
                                    StudentID.value = "";
                                    Major.value = "";
                                    DegreeObjective.value = "";
                                    AcademicPlan.value = "";
                                    International_Students.value = "";
                                    Nursing_Flag.value = "";
                                    AthleticFlag.value = "";
                                    EIP_Flag.value = "";
                                    TelephoneNo.value = "";
                                  	LookupResult.value = "";
                                    gifModal.style.display = "none";
                                    showErrorModal("Alert!", "No matching records found");
                                }
                            },
                            error: function(error) {
                                loadingText.visible = false;
                              	LookupResult.value = "";
                                if (typeOfForm.value == "1") {
                                    noRecordMsgMed.visible = false;
                                    noRecordMsgNonMed.visible = true;

                                } else {
                                    noRecordMsgNonMed.visible = false;
                                    noRecordMsgMed.visible = true;
                                }
                                // table1.visible = false;
 var n;                                   
                                    var rowcountRemoveAll2 = CourseRow.instanceManager.instanceCount;
                                    for (n = 0; n < rowcountRemoveAll2; n++) {
                                        debugger;
                                        CourseRow.instanceManager.removeInstance(CourseRow.instanceIndex);
                                    }
                                    var rowcount1 = CourseRow.instanceManager.instanceCount;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].CourseNo.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].ScheduleNo.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].NumberOfUnits.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].NameOfInstructor.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].SectionNo.value = null;
                                    CourseRow.instanceManager.removeInstance(rowcount1 - 1);
                                    LastName.value = "";
                                    FirstName.value = "";
                                    Email.value = "";
                                    caseId.value = "";
                                    StudentID.value = "";
                                    Major.value = "";
                                    DegreeObjective.value = "";
                                    AcademicPlan.value = "";
                                    International_Students.value = "";
                                    Nursing_Flag.value = "";
                                    EIP_Flag.value = "";
                                    TelephoneNo.value = "";
                                    AthleticFlag.value = "";
                                  	LookupResult.value = "";
                              		ProgramPlan.value = "";
                                    gifModal.style.display = "none";
                            }
                        });
                    }




                }

            },
            error: function(error) {
                alert("error block=" + error);

                if (typeOfForm.value == "1") {
                    noRecordMsgMed.visible = false;
                    noRecordMsgNonMed.visible = true;

                } else {
                    noRecordMsgNonMed.visible = false;
                    noRecordMsgMed.visible = true;
                }
              	LookupResult.value = "";
                //table1.visible = false;
            }

        });

    }

        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_textdraw_15784959911579170730266_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_textdraw_15784959911579170730266_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value !== null){
this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_textdraw_13322827001573858742686_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_textdraw_13322827001573858742686_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
this.visible = false;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_headerTextNonMedical_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_headerTextNonMedical_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_headerTextMedical_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_headerTextMedical_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_studentHeaderTextMed_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_studentHeaderTextMed_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_studentHeaderTextNonMed_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_studentHeaderTextNonMed_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_instructorHeaderText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_instructorHeaderText_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_chairHeaderText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_chairHeaderText_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_textdraw_3521054171565338240535_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_textdraw_3521054171565338240535_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_helpLinkFaculty_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_helpLinkFaculty_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_helpLinkChair_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_helpLinkChair_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_NonMedicalWithdrawal_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_NonMedicalWithdrawal_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_loadingText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_loadingText_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_loadingText_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_loadingText_init1 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_DataUnavailableText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_DataUnavailableText_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value !== null){
this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_noRecordMsgMed_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_noRecordMsgMed_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_noRecordMsgNonMed_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_noRecordMsgNonMed_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_LastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_LastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_FirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_FirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_MiddleName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_MiddleName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_StudentID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_StudentID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_StudentID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_StudentID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            

if(stepRef.value === null){
//var cwid = "891673535";
//clear instructor UID

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
var term = "2197";
//alert("before ajax");
  //alert(cwidVal);

  $.ajax({

    type: 'GET',

    url: "/bin/getStudentCourseWithdrawalInfo",



    data: {
        cwid: cwidVal,
        term: term
    },

    dataType: 'json',

    success: function(myresopnse) {
     
    ProgramPlan.value = myresopnse.PROGRAM_PLAN;
    LastName.value = myresopnse.LNAME;
    FirstName.value = myresopnse.FNAME;
    Email.value = myresopnse.STUDENT_EMAIL;
    //Email.value = "";
      caseId.value = myresopnse.CASEID;
      StudentID.value = myresopnse.CWID;
      Major.value = myresopnse.MAJOR_DESCR;
      DegreeObjective.value = myresopnse.DEGREE_TYPE;
      AcademicPlan.value = myresopnse.ACADEMIC_PLAN;
      International_Students.value = myresopnse.INTERNATIONAL_FLAG;
      Nursing_Flag.value = myresopnse.NURSING_FLAG;
      EIP_Flag.value = myresopnse.EIP_FLAG;
      TelephoneNo.value = myresopnse.STUDENT_PHONE;
     TermDesc.value = myresopnse.TERM_DESCR;
      TermCode.value = myresopnse.TERM_CODE;
      
var tItems;
        loadingText.visible =true;
var responselength =  myresopnse.COURSES.length;
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
for(tItems in myresopnse.COURSES)
{
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    //var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
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
  
  for(tItems in myresopnse.COURSES)
{
  if(tItems == "0"){
	
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
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
  
  for(tItems in myresopnse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
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
  
  for(tItems in myresopnse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
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
  
  for(tItems in myresopnse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
   // alert("ChairName1:"+ChairName1.value);
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresopnse.COURSES[tItems].CHAIR_NAME;
   // alert("ChairName2:"+ChairName2.value);
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresopnse.COURSES[tItems].CHAIR_NAME;
   // alert("ChairName3:"+ChairName3.value);
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
    ChairName4.value = myresopnse.COURSES[tItems].CHAIR_NAME;
   // alert("ChairNam4:"+ChairName4.value);
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID5.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    //alert("ChairName5:"+ChairName5.value);
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
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
  
  for(tItems in myresopnse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID2.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID3.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID4.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID5.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresopnse.COURSES[tItems].INSTR_NAME;
	
	InstructorUserID6.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresopnse.COURSES[tItems].CHAIR_NAME;
    // var instCwId = myresopnse.COURSES[tItems].INSTR_CWID;
	//var instUserId = myresopnse.COURSES[tItems].INSTR_USERID;
	//var instEmail = myresopnse.COURSES[tItems].INSTR_EMAIL;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
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
  
  for(tItems in myresopnse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresopnse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
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
  
  for(tItems in myresopnse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresopnse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresopnse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
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
  
  for(tItems in myresopnse.COURSES)
{
   if(tItems == "0"){
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresopnse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresopnse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName9.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
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
  
  for(tItems in myresopnse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresopnse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresopnse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName9.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName10.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
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
  
  for(tItems in myresopnse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresopnse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresopnse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName9.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName10.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresopnse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName11.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
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
  
  for(tItems in myresopnse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresopnse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresopnse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName9.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName10.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresopnse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName11.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName12.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
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
  
  for(tItems in myresopnse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresopnse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresopnse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresopnse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
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
  
  for(tItems in myresopnse.COURSES)
{
 if(tItems == "0"){
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresopnse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresopnse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresopnse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "13"){
    Row14.ScheduleNo14.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row14.CourseNo14.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row14.UnitNo14.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row14.InstructorName14.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID14.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail14.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID14.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID14.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
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
  
  for(tItems in myresopnse.COURSES)
{
  if(tItems == "0"){
    Row1.ScheduleNo1.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row1.CourseNo1.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row1.UnitNo1.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row1.InstructorName1.value = myresopnse.COURSES[tItems].INSTR_NAME;
   InstructorUserID1.value= myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value =  myresopnse.COURSES[tItems].INSTR_EMAIL;
    
    InstructorUserID1.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail1.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID1.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID1.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName1.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairName = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
    }
  if(tItems == "1"){
    Row2.ScheduleNo2.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row2.CourseNo2.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row2.UnitNo2.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row2.InstructorName2.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID2.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail2.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID2.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID2.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName2.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;

  }
  if(tItems == "2"){
    Row3.ScheduleNo3.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row3.CourseNo3.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row3.UnitNo3.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row3.InstructorName3.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID3.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail3.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID3.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID3.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName3.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "3"){
    Row4.ScheduleNo4.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row4.CourseNo4.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row4.UnitNo4.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row4.InstructorName4.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID4.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail4.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID4.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID4.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName4.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "4"){
    Row5.ScheduleNo5.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row5.CourseNo5.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row5.UnitNo5.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row5.InstructorName5.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID5.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail5.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID5.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID5.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName5.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairCwId = myresopnse.COURSES[tItems].CHAIR_CWID;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "5"){
    Row6.ScheduleNo6.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row6.CourseNo6.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row6.UnitNo6.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row6.InstructorName6.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID6.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail6.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID6.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID6.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName6.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "6"){
    Row7.ScheduleNo7.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row7.CourseNo7.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row7.UnitNo7.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row7.InstructorName7.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID7.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail7.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID7.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID7.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName7.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "7"){
    Row8.ScheduleNo8.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row8.CourseNo8.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row8.UnitNo8.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row8.InstructorName8.value = myresopnse.COURSES[tItems].INSTR_NAME;
     InstructorUserID8.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail8.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID8.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID8.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	ChairName8.value = myresopnse.COURSES[tItems].CHAIR_NAME;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "8"){
    Row9.ScheduleNo9.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row9.CourseNo9.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row9.UnitNo9.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row9.InstructorName9.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID9.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail9.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID9.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID9.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "9"){
    Row10.ScheduleNo10.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row10.CourseNo10.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row10.UnitNo10.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row10.InstructorName10.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID10.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail10.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID10.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID10.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "10"){
    Row11.ScheduleNo11.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row11.CourseNo11.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row11.UnitNo11.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row11.InstructorName11.value = myresopnse.COURSES[tItems].INSTR_NAME;
     InstructorUserID11.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail11.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID11.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID11.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "11"){
    Row12.ScheduleNo12.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row12.CourseNo12.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row12.UnitNo12.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row12.InstructorName12.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID12.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail12.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID12.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID12.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "12"){
    Row13.ScheduleNo13.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row13.CourseNo13.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row13.UnitNo13.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row13.InstructorName13.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID13.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail13.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID13.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID13.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
  if(tItems == "13"){
    Row14.ScheduleNo14.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row14.CourseNo14.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row14.UnitNo14.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row14.InstructorName14.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID14.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail14.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID14.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID14.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
   if(tItems == "14"){
    Row15.ScheduleNo15.value = myresopnse.COURSES[tItems].CLASS_NBR;
	Row15.CourseNo15.value = myresopnse.COURSES[tItems].CRSE_NAME;
	Row15.UnitNo15.value = myresopnse.COURSES[tItems].UNT_TAKEN;
	Row15.InstructorName15.value = myresopnse.COURSES[tItems].INSTR_NAME;
    InstructorUserID15.value=myresopnse.COURSES[tItems].INSTR_USERID;
    InstructorEmail15.value=myresopnse.COURSES[tItems].INSTR_EMAIL;
    ChairUserID15.value=myresopnse.COURSES[tItems].CHAIR_USERID;
    ChairEmailID15.value=myresopnse.COURSES[tItems].CHAIR_EMAIL;
	//var chairUserId = myresopnse.COURSES[tItems].CHAIR_USERID;
	//var chairEmail = myresopnse.COURSES[tItems].CHAIR_EMAIL;
	
  }
}
   
} 
  loadingText.visible = false;
},
  
error: function(error){
 loadingText.visible =false;
//alert("error block="+myresopnse);
//alert("Requested Data Unavailable");
}

    });
  
}

  

        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_Major_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_Major_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_DegreeObjective_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_DegreeObjective_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_ProgramPlan_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_ProgramPlan_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_AcademicPlan_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_AcademicPlan_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_hiddenFieldsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_hiddenFieldsPanel_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_EIP_Flag_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_EIP_Flag_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_International_Students_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_International_Students_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_SubjectLineARSC_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_SubjectLineARSC_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_classNumberList_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_classNumberList_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_CourseNumberList_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_CourseNumberList_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_stepRef_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_stepRef_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_SubjectLine_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_SubjectLine_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_SubjectLineMedical_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_SubjectLineMedical_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_logUser_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_logUser_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_logUser_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_logUser_init1 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_AllCourseWithdrawStatus_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_AllCourseWithdrawStatus_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_TermCode_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_TermCode_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_TermDesc_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_TermDesc_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_textdraw1557993532501_copy_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_textdraw1557993532501_copy_1_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_AllCoursWithdrawRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_AllCoursWithdrawRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            /*if(stepRef.value === null){
  var rowCount1 = CourseRow.instanceManager.instanceCount;
if(this.value == "1")
  {
    AllCourseWithdrawStatus.value = "Yes";  
    SelectAll.value = 1;
   for (n = 0; n < rowCount1; n++) {
     CourseRow.instanceManager.instances[n].SelectCB.value = "Yes";
   }
      }
  else{
    AllCourseWithdrawStatus.value = "No";  
    if(SelectAll.value == 1){
    SelectAll.value = null;
     for (n = 0; n < rowCount1; n++) {
     CourseRow.instanceManager.instances[n].SelectCB.value = null;
   }
  }
  }
}*/
//Updated on 01232023 to include confirm popup
if (stepRef.value === null) {
    debugger;
    if (AllCoursWithdrawRB.value == "1") {
      
        showConfirmModal("Confirm", "Are you sure you want to withdraw from all the courses?");
       
    } else {
        var rowCount1 = CourseRow.instanceManager.instanceCount;
        AllCourseWithdrawStatus.value = "No";
		
        for (n = 0; n < rowCount1; n++) {
            CourseRow.instanceManager.instances[n].SelectCB.value = null;
       
        }
    }
}
  function showConfirmModal(errorHeading, errorMsg) {

    

    var modal = document.getElementById("confirmPopup");

    var modalHeaderMsg = document.getElementById("confirmModalText");
    modalHeaderMsg.innerHTML = "";
    modalHeaderMsg.innerHTML = errorHeading;


    //Body
    var para = document.getElementById("confirmpara");
    para.innerHTML = "";
    para.innerHTML = errorMsg;


    var footerModal = document.getElementById("confirmPopup-footer");
    footerModal.style.display = 'flex';
    footerModal.style.justifyContent = 'flex-end';
    footerModal.style.padding = '10px';
    footerModal.style.boxSizing = 'border-box';
    var okButton = document.getElementById("okBtn");
    okButton.style.cssFloat = "right";
    okButton.style.marginRight = "4px";
    okButton.style.width = "70px";
    okButton.style.right = "82px";
    okButton.onclick = function(event) {
        var rowCount1 = CourseRow.instanceManager.instanceCount;
        AllCourseWithdrawStatus.value = "Yes";

        for (n = 0; n < rowCount1; n++) {
            CourseRow.instanceManager.instances[n].SelectCB.value = "Yes";
        }
        modal.style.display = "none";

    };
    var cancelButton = document.getElementById("cancelBtn");
    cancelButton.style.cssFloat = "right";
    cancelButton.style.marginRight = "10px";
    cancelButton.style.width = "70px";
    cancelButton.onclick = function(event) {
        var rowCount1 = CourseRow.instanceManager.instanceCount;
        AllCourseWithdrawStatus.value = "No";
        AllCoursWithdrawRB.value = 2;
        for (n = 0; n < rowCount1; n++) {
            CourseRow.instanceManager.instances[n].SelectCB.value = null;
        }
        modal.style.display = "none";
    };
    footerModal.appendChild(okButton);
    footerModal.appendChild(cancelButton);
    modal.style.display = "block";
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_SelectCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_SelectCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var rowCount3= CourseRow.instanceManager.instanceCount;    
if(stepRef.value  === null){
  debugger;
  var flag1 = false;

   for (n = 0; n < rowCount3; n++) {
     if(CourseRow.instanceManager.instances[n].SelectCB.value != "Yes"){
       flag = false;
       break;
     }else{
       flag = true;
     }
   } 
 
    if(flag === true){     
      SelectAllCB.value = "1";
      //AllCoursWithdrawRB.value = "1";
    }else{
      SelectAllCB.value = "";
     // AllCoursWithdrawRB.value = "2";
    }
}

/*
  var rowCount3= CourseRow.instanceManager.instanceCount;    
if(stepRef.value  === null){
  var flag1 = false;
if(this.value == "1")
  { 
   for (n = 0; n < rowCount3; n++) {
     if(CourseRow.instanceManager.instances[n].SelectCB.value != "Yes"){
       flag = false;
       break;
     }else{
       flag = true;
     }
   }
    if(flag === true){
      SelectAll.value = "1";
    }
   }
}*/
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_textdraw_2109305421738315895800_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_textdraw_2109305421738315895800_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value == "ToInstructor" || stepRef.value == "ToChair" || stepRef.value == "ToARSC" || stepRef.value == "ToMedicalARSC") {
    this.visible = true;
} else {
    this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_textdraw1580452769677_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_textdraw1580452769677_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_Covid19CB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_Covid19CB_valueCommit0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_Circumstances_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_Circumstances_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionSecNonMedical_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionSecNonMedical_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionComment_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionComment_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionComment1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionComment1_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionComment2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionComment2_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_studentPetitionSecMedical_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_studentPetitionSecMedical_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionMedicalComment_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionMedicalComment_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionMedicalComment1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionMedicalComment1_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionMedicalComment2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionMedicalComment2_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionMedicalComment3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionMedicalComment3_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionMedicalComment4_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionMedicalComment4_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionMedicalComment5_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_StudentPetitionMedicalComment5_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_supportingDocuments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_supportingDocuments_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value !== null){
  this.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_supportDocPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_supportDocPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null)
  {
    supportDocPanel.enabled = true;
  }else{
    supportDocPanel.enabled = false;
    supportDoc1.fileAttachment.mandatory = "";
  }

if(typeOfForm.value == "1"){
  supDocGuide2.visible = true;
  supDocGuide1.visible = false;
  supportDoc3.visible = true;
  supportDoc4.visible = true;
}else{
  supDocGuide2.visible = false;
    supDocGuide1.visible = true;
	supportDoc3.visible = false;
    supportDoc4.visible = false;
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_supDocErrorMessage_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_supDocErrorMessage_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_supportDoc1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
var filePath = supportDoc1.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc1.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc1.fileAttachment.value = fname;
}
}
if(supportDoc1.fileAttachment.value !== null){
	doc1.value = supportDoc1.fileAttachment.value;
}
else{
    doc1.value = "";
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_supportDoc2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
var filePath = supportDoc2.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc2.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc2.fileAttachment.value = fname;
}
}
if(supportDoc2.fileAttachment.value !== null){
	doc2.value = supportDoc2.fileAttachment.value;
}
else{
    doc2.value = "";
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_supportDoc3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
var filePath = supportDoc3.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc3.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc3.fileAttachment.value = fname;
}
}
if(supportDoc3.fileAttachment.value !== null){
	doc3.value = supportDoc3.fileAttachment.value;
}
else{
    doc3.value = "";
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_supportDoc4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_supportDoc4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value === null){
var filePath = supportDoc4.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc4.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc4.fileAttachment.value = fname;
}
}
if(supportDoc4.fileAttachment.value !== null){
	doc4.value = supportDoc4.fileAttachment.value;
}
else{
    doc4.value = "";
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_mandatedReport_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_mandatedReport_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_studentCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_studentCB_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_studentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_studentCB_valueCommit0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_studentMedCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_studentMedCB_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_studentMedCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_studentMedCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (stepRef.value === null) {
    //var TzoneDate = new Date().toISOString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).slice(0,10);
    if(this.value == "1"){
     // alert("insd");
    if (FirstName.value !== null) {
      StudentSignDate.enabled = false;
        var first = FirstName.value;
        var last = LastName.value;
        var res = first.concat(" ");
        res = res.concat(last);
        StudentSign.value = res;
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_StudentSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_StudentSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_StudentSign_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_StudentSign_valueCommit0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_sentToChairInstruction_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_sentToChairInstruction_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_instructorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_instructorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === "ToInstructor") {
  if(this.value == 1){
    $.ajax({

          type: 'GET',
          url: "/bin/getLoggedInUserDetails",
          dataType: 'json',

          success: function(myresponse) {			  
			InstructorSign.value = myresponse.userName;
            InstructorReviewDate.value = myresponse.SERVER_DATE;			
          },
          error: function(error) {
            alert("error block=" + error);
          }  
		});
   
    InstructorReviewDate.enabled = false;
    InstructorSign.enabled = false;
  }
  else{
    InstructorSign.value = "";
    InstructorReviewDate.value ="";
  }
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_InstructorRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_InstructorRB_valueCommit0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_RecommendInstructor_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_RecommendInstructor_valueCommit0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_RecommendInstructor_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_RecommendInstructor_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value == "ToInstructor") {
    if (this.value == "2") {
        InstructorComment.mandatory = true;
    } else {
        InstructorComment.mandatory = false;
    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_InstructorDenialReasons_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_InstructorDenialReasons_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_InstructorDenialReasons_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_InstructorDenialReasons_valueCommit0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_InstructorOtherReason_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_InstructorOtherReason_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_InstructorSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_InstructorSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_InstructorSign_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_InstructorSign_valueCommit0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_sentToChairInstruction_init00
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_sentToChairInstruction_init00 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_chairCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_chairCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === "ToChair") {
  if(this.value == 1){
     $.ajax({

          type: 'GET',
          url: "/bin/getLoggedInUserDetails",
          dataType: 'json',

          success: function(myresponse) {			  
			ChairSign.value = myresponse.userName;
            ChairReviewDate.value = myresponse.SERVER_DATE;			
          },
          error: function(error) {
            alert("error block=" + error);
          }  
		});
    ChairReviewDate.enabled = false;

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
 * @function student_course_withdrawal_student_course_withdrawal.generated_RecommendChair_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_RecommendChair_valueCommit0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_RecommendChair_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_RecommendChair_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(stepRef.value == "ToChair"){
if(this.value == "2"){
 // ChairDenialReasons.mandatory = "error";
  ChairDenialReasons.enabled = true;
//  ARSCRecommend.value = "2";
}else{
  ChairDenialReasons.value = null;
  ChairDenialReasons.enabled = false;
 // ARSCRecommend.value = "1";
}
}


        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_RecommendChair_valueCommit2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_RecommendChair_valueCommit2 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value == "ToChair") {
    if (this.value == "2") {
        ChairComment.mandatory = true;
    } else {
        ChairComment.mandatory = false;
    }
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_ChairDenialReasons_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_ChairDenialReasons_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_ChairDenialReasons_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_ChairDenialReasons_valueCommit0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_ChairSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_ChairSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_ChairSign_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_ChairSign_valueCommit0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_ChairOtherReason_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_ChairOtherReason_init0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_medicalCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_medicalCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === "ToMedical") {
  if(this.value == 1){
     $.ajax({

          type: 'GET',
          url: "/bin/getLoggedInUserDetails",
          dataType: 'json',

          success: function(myresponse) {			  
			MedicalReviewerSign.value = myresponse.userName;
            MedicalReviewDate.value = myresponse.SERVER_DATE;			
          },
          error: function(error) {
            alert("error block=" + error);
          }  
		});
    MedicalReviewDate.enabled = false;
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_RecommendMedical_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_RecommendMedical_valueCommit0 = function (scope) {
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
 /* if(this.value == "1"){
     ARSCRecommend.value = "1";
  }else{
     ARSCRecommend.value = "2";
  }*/
}
 
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_MedicalReviewerSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_MedicalReviewerSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_MedicalReviewerSign_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_MedicalReviewerSign_valueCommit0 = function (scope) {
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
 * @function student_course_withdrawal_student_course_withdrawal.generated_AthleticReviewerCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_AthleticReviewerCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === "ToAthletic") {
  if(this.value == 1)
{    $.ajax({

          type: 'GET',
          url: "/bin/getLoggedInUserDetails",
          dataType: 'json',

          success: function(myresponse) {			  
			AthleticReviewerSign.value = myresponse.userName;
            AthleticReviewerDate.value = myresponse.SERVER_DATE;			
          },
          error: function(error) {
            alert("error block=" + error);
          }  
		});
    AthleticReviewerDate.enabled = false;
    AthleticReviewerSign.enabled = false;
}else{
  AthleticReviewerSign.value = "";
  AthleticReviewerDate.value = "";
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_AthleticReviewerSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_AthleticReviewerSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_AthleticReviewerDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_AthleticReviewerDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_ISSReviewerCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_ISSReviewerCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === "ToISS") {
  if(this.value == 1)
{    $.ajax({

          type: 'GET',
          url: "/bin/getLoggedInUserDetails",
          dataType: 'json',

          success: function(myresponse) {			  
			ISSReviewerSign.value = myresponse.userName;
            ISSReviewerDate.value = myresponse.SERVER_DATE;			
          },
          error: function(error) {
            alert("error block=" + error);
          }  
		});
    ISSReviewerDate.enabled = false;
    ISSReviewerSign.enabled = false;
}else{
  ISSReviewerSign.value = "";
  ISSReviewerDate.value = "";
}
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_ISSReviewerSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_ISSReviewerSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_ISSReviewerDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_ISSReviewerDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_adminCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_adminCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (stepRef.value === "ToARSC" || stepRef.value === "ToMedicalARSC") {
  if(this.value == 1)
{    $.ajax({

          type: 'GET',
          url: "/bin/getLoggedInUserDetails",
          dataType: 'json',

          success: function(myresponse) {			  
			ARSCSign.value = myresponse.userName;
            AdminDate.value = myresponse.SERVER_DATE;			
          },
          error: function(error) {
            alert("error block=" + error);
          }  
		});
    AdminDate.enabled = false;
    ARSCSign.enabled = false;
}else{
  ARSCSign.value = "";
  AdminDate.value = "";
}
 /* if(typeOfForm.value == "1"){    
     ARSCRecommend.value = RecommendChair.value;
  }if(typeOfForm.value == "2"){
     ARSCRecommend.value = RecommendMedical.value;
  }*/
}
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_ARSCSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_ARSCSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_course_withdrawal_student_course_withdrawal.generated_mainSubmit_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_course_withdrawal_student_course_withdrawal.generated_mainSubmit_click0 = function (scope) {
    with(this) {
        with(scope) {
            withdrawalInstructions.visible = false;

var validationFlag = true;
//Check atleast one course is selected or not
if (validationFlag === true) {
    var rowCount4 = CourseRow.instanceManager.instanceCount;
    var flag;
    for (n = 0; n < rowCount4; n++) {
        if (CourseRow.instanceManager.instances[n].SelectCB.value != "Yes") {
            flag = 0;
        } else {
            flag = 1;
            break;
        }
    }
    if (flag === 0) {
        validationFlag = false;
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].NonMedicalWithdrawal[0].courseWithdrawalInfo[0]");
        showErrorModal("Alert!", "Please select the courses");
     
    } else {
        validationFlag = true;
    }   
  }

if(validationFlag === true){
   
    var count = 0;
    for (n = 0; n < rowCount4; n++) {
        if (CourseRow.instanceManager.instances[n].SelectCB.value == "Yes") {
            count = count + 1;
        } 
    }
    if(AllCoursWithdrawRB.value === "2" && count == rowCount4){
     guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].NonMedicalWithdrawal[0].courseWithdrawalInfo[0]");
     showErrorModal("Alert!", "Please make the valid selection");
    validationFlag = false;
    }else if(AllCoursWithdrawRB.value === "1" && count != rowCount4){
     guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].NonMedicalWithdrawal[0].courseWithdrawalInfo[0]");
     showErrorModal("Alert!", "Please make the valid selection");
      validationFlag = false;
    }else{
      validationFlag = true;
    }
    
  }


if(validationFlag === true){
//Set description field
var termType = null;
if (typeOfForm.value == 1) {
    if (AllCoursWithdrawRB.value == 1) {
        termType = "Non-Medical Term";
    } else {
        termType = "Non-Medical Non-Term";
    }
} else {
    termType = "Medical";
}
if (aftiaTextBox.value === null) {
    aftiaTextBox.value = FirstName.value + " " + LastName.value + " " + StudentID.value + " Type: " + termType;
  	aftiaDescCWID.value = FirstName.value + " " + LastName.value + " " + StudentID.value + " Type: " + termType;
}
//Set Course list, class number,class section
var rowCount5 = CourseRow.instanceManager.instanceCount;
if(rowCount5 > 0){
  CourseNumberList.value = "";
  classSectionList.value = "";
  classNumberList.value = "";
    for ( n = 0; n < rowCount4; n++) {
     
        if (CourseRow.instanceManager.instances[n].SelectCB.value == "Yes") {
            if(CourseNumberList.value === null)
             { 
              CourseNumberList.value = CourseRow.instanceManager.instances[n].CourseNo.value;
             }else{
               CourseNumberList.value = (CourseNumberList.value+", ".concat(CourseRow.instanceManager.instances[n].CourseNo.value));
             }
            if(classSectionList.value === null)
             { 
              classSectionList.value = CourseRow.instanceManager.instances[n].SectionNo.value;
             }else{
               classSectionList.value = (classSectionList.value+", ".concat(CourseRow.instanceManager.instances[n].SectionNo.value));
            }   
          if(classNumberList.value === null)
             { 
              classNumberList.value = CourseRow.instanceManager.instances[n].ScheduleNo.value;
             }else{
               classNumberList.value = (classNumberList.value+", ".concat(CourseRow.instanceManager.instances[n].ScheduleNo.value));
            } 
        } 
    }
}
//Set email address
Email.value = "yjayaram@fullerton.edu";
var testEmail = "yjayaram@fullerton.edu";
var resultArray = JSON.parse(LookupResult.value);
for(j=0;j<resultArray.COURSES.length;j++){
 resultArray.COURSES[j].CHAIR_EMAIL = testEmail;
  resultArray.COURSES[j].INSTR_EMAIL = testEmail;
}
LookupResult.value = JSON.stringify(resultArray);
console.log(LookupResult.value);

//Set Email Subject
SubjectLine.value = "";
SubjectLine.value = ("Test - Student Course Withdrawal Request - " + StudentID.value);
SubjectLineARSC.value = "";
SubjectLineARSC.value = ("Test - Student Course Withdrawal - ARSC Review " + StudentID.value);
SubjectLineMedical.value = "";
SubjectLineMedical.value = ("Test - Student Course Withdrawal - Medical Review " + StudentID.value);
//Supporting doc validation
if (supportDoc1.fileAttachment.value === null && supportDoc2.fileAttachment.value === null && supportDoc3.fileAttachment.value === null && supportDoc4.fileAttachment.value === null  && typeOfForm.value == "2") {
supDocErrorMessage.visible = true;  
guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].NonMedicalWithdrawal[0].supportingDocuments[0]");
supportDoc1.fileAttachment.mandatory = "error";      
} else{
supportDoc1.fileAttachment.mandatory = ""; 
supDocErrorMessage.visible = false; 
}

guideBridge.submit();
}
        }
	}
}
