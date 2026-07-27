/**
 * @function challenge_by_examination_challenge_by_examination.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            //debugger;
if (StageIndicator.value === null) {
  //debugger;
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            //var userValue = response.userId;
          //var userValue = "leahcourtney";
            var userValue = "lreyes21";
            WorkflowInitiator.value = userValue;
          getStudentDetails(userValue);
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}

//debugger;
function getStudentDetails(userValue) {
    $.ajax({
        type: 'GET',
        url: "/bin/getUniversityWithdrawalData",
        data: {
            action: "UNIVERSITY_WITHDRAWAL_DETAILS",
            userID: userValue
        },
        dataType: 'json',
        success: function(response) {
  //        debugger;
            if (response.length >= 1) {
    //          debugger;
                CWID.value = response[0].STUDENT_ID;
                StudentFirstName.value = response[0].STUDENT_FNAME;
                StudentLastName.value = response[0].STUDENT_LNAME;
                StudentUserId.value = response[0].STUDENT_USERID;
                StudentPhone.value = response[0].STUDENT_PHONE;                
               // StudentEmail.value = "yjayaram@fullerton.edu";    
                StudentEmail.value = "larthur@FULLERTON.EDU";
              	//StudentEmail.value = "poornavivekraj.nagarajan@thoughtfocus.com";
                
                StudentFullName.value = StudentFirstName.value.trim() + " " + StudentLastName.value.trim();
                AdmittedTerm.value = response[0].ADMIT_TERM_DESCR;
                StudentMajor.value = response[0].PROGRAMS;
                TermYear.value = response[0].ACAD_YEAR;
               // Term.value = response[0].ADMIT_TERM;
              // Term.value = AdmittedTerm.value ;
            } else {
                showErrorModal("Alert!", "No matching records found");
            }
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}




        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            //debugger;

    //Rule 1 - initilise
    if (StageIndicator.value === null) {
      
		var gifModal = document.getElementById('gifModal');
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedUserId",
            dataType: 'json',
            success: function(myresponse) {

                if (myresponse.Status == "Success") {

                    var userValue = myresponse.userId;
                   //var userValue = "ediaz12";
                   // logUser.value = userValue;
                    if (StageIndicator.value === null) {
                      //  alert("1");
                      //var  userId = 'Nataliemiramontes';
                       //var userId = userValue; 
                       var userId = 'lreyes21';
                       // var typeOfWithdrawal = typeOfForm.value;
                        var term = "2263";                
						var lastTermChar = term.slice(-1);

                     	 var tblName = "";

                        if (lastTermChar === "1" || lastTermChar === "5") {
                            tblName = "AR_SESSION_COURSE_WITHDRAWAL";
                        } else if (lastTermChar === "3" || lastTermChar === "7") {
                            tblName = "AR_COURSE_WITHDRAWAL";
                        }
                      
                        $.ajax({

                            type: 'GET',
                            url: "/bin/getChallengeByExamination",
                            data: {
                                userId: userId,
                                term: term,
                              	tblName: tblName
                            },

                            dataType: 'json',

                            success: function(myresponse) {
                            //  alert("2");
                              debugger;
                              //  gifModal.style.display = "block";
                             
                                if (myresponse.COURSES.length >= 1) {
                                //  alert("3");
                                 // console.log("myresponse.COURSES.length : " + myresponse.COURSES.length);
                                  	LookupResult.value = JSON.stringify(myresponse);
                                    var k;
                                    var rowcountRemoveAll1 = CourseRow.instanceManager.instanceCount;
                                    for (k = 0; k < rowcountRemoveAll1; k++) {
                                        CourseRow.instanceManager.removeInstance(CourseRow.instanceIndex);
                                    }
                                 // alert("4");
                                    CourseRow.instanceManager.removeInstance((CourseRow.instanceManager.instanceCount) - 1);
                                    var i;
                                    //ProgramPlan.value = myresponse.PROGRAM_PLAN;
                                    //LastName.value = myresponse.LNAME;
                                    //FirstName.value = myresponse.FNAME;
                                //    Email.value = myresponse.STUDENT_EMAIL;
                                  // Email.value = "poornavivekraj.nagarajan@thoughtfocus.com";
                                    //TermCode.value = myresponse.STRM;
                                    //TermDesc.value = myresponse.TERM_DESCR;
                                    TermCode.value = "2263";  
                                    //Term.value = "Fall 2025";
                                    //alert("myresponse.TERM_DESCR : " + myresponse.TERM_DESCR);
                                  //Term.value = myresponse.TERM_DESCR;
                                    
                                  //  noRecordMsgNonMed.visible = false;
                                   // noRecordMsgMed.visible = false;
                                   // debugger;
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
                                   // gifModal.style.display = "none";
                                    
                                } else {
                                  //  alert("5");
                                    var n;                                   
                                    var rowcountRemoveAll2 = CourseRow.instanceManager.instanceCount;
                                    for (n = 0; n < rowcountRemoveAll2; n++) {
                                       // debugger;
                                        CourseRow.instanceManager.removeInstance(CourseRow.instanceIndex);
                                    }
                                    var rowcount1 = CourseRow.instanceManager.instanceCount;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].CourseNo.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].ScheduleNo.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].NumberOfUnits.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].NameOfInstructor.value = null;
                                    CourseRow.instanceManager.instances[rowcount1 - 1].SectionNo.value = null;
                                    CourseRow.instanceManager.removeInstance(rowcount1 - 1);
                                    //LastName.value = "";
                                    //FirstName.value = "";
                                    //Email.value = "";
                                    //caseId.value = "";
                                    //StudentID.value = "";
                                    //Major.value = "";
                                    //DegreeObjective.value = "";
                                    //AcademicPlan.value = "";
                                    //International_Students.value = "";
                                    //Nursing_Flag.value = "";
                                    //EIP_Flag.value = "";
                                    //TelephoneNo.value = "";
                                    //LookupResult.value = "";
                                    //AthleticFlag.value = "";
                                    gifModal.style.display = "none";
                                    showErrorModal("Alert!", "No matching records found");
                                }
                            },
                            error: function(error) {
                                LookupResult.value = "";                            

                            }
                        });
                    }




                }

            },
            error: function(error) {
                alert("error block=" + error);
                LookupResult.value = "";               
            }

        });

    }

        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null) {
  DepartmentChairSignaturePanel.visible = false;
  InstructorSignaturePanel.visible = false;
  RecordSignaturePanel.visible = false;
} 
else if(StageIndicator.value == "ToDeptChair") {
  StudentSignaturePanel.enabled = false;
  DepartmentChairSignaturePanel.visible = true;
  InstructorSignaturePanel.visible = false;
  RecordSignaturePanel.visible = false;
  
  Instructions_CheckBox.enabled = false;
  courseDetailsPanel.enabled = false;
} 
else if(StageIndicator.value == "ToInstructor") {
  StudentSignaturePanel.enabled = false;
  DepartmentChairSignaturePanel.enabled = false;
  InstructorSignaturePanel.visible = true;
  RecordSignaturePanel.visible = false;
  
  Instructions_CheckBox.enabled = false;
  courseDetailsPanel.enabled = false;
}
else if(StageIndicator.value == "ToRecords") {
  StudentSignaturePanel.enabled = false;
  DepartmentChairSignaturePanel.enabled = false;
  InstructorSignaturePanel.enabled = false;
  RecordSignaturePanel.visible = true;
  
  Instructions_CheckBox.enabled = false;
  courseDetailsPanel.enabled = false;
} 
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_guideRootPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_guideRootPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  alert("Alert: The submission deadline has passed!");
  //showErrorModal("Alert!","The submission deadline has passed!");
  debugger;
  submit1607673526985.visible = false;
  var elements = document.getElementsByClassName('guideTopNavIcon');
    for (var i = 0; i < elements.length; i++) {
       elements[i].style.display = "none";
    }
   this.enabled = false;
}
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_CaseID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_CaseID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if(StageIndicator.value === null){
    $.ajax({

      type: 'GET', 
      url:"/bin/getCaseID",
      dataType: 'json',

      success: function(myresponse){            
        CaseID.value = myresponse.CASEID;

      	}
	}); 	
}
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_CWID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_CWID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_StudentFirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_StudentFirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_StudentLastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_StudentLastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_StudentPhone_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_StudentPhone_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_StudentMajor_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_StudentMajor_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_Term_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_Term_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_StudentEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_StudentEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_SelectCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_SelectCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var rowCount3= CourseRow.instanceManager.instanceCount;    
if(stepRef.value  === null){
//  debugger;
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
 * @function challenge_by_examination_challenge_by_examination.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_supportDoc1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
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
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_supportDoc2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
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
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_supportDoc3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
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
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_CheckBox_StuSign_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_CheckBox_StuSign_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
	if (this.value == 1) {
	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
                StudentSignature.value = StudentFullName.value;
				StudentSignDate.value = myresponse.SERVER_DATE;			
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});

            StudentSignature.enabled = false; 
			StudentSignDate.enabled = false; 
				
	} else {
        StudentSignature.enabled = ""; 
		StudentSignDate.value = "";	   
	}
}
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_StudentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_StudentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_StudentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_StudentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_CheckBox_DeptChairSign_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_CheckBox_DeptChairSign_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToDeptChair"){
	if (this.value == 1) {
	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
                //DeptChairSign.value = myresopnse[0].FIRST_NAME + " " + myresopnse[0].LAST_NAME;
                DeptChairSign.value = userValue;
				DeptChairSignDate.value = myresponse.SERVER_DATE;	
                DeptChairUserId.value = myresponse.userId;
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});

         //   StudentSignature.enabled = false; 
		//	StudentSignDate.enabled = false; 
				
	} else {
        StudentSignature.enabled = ""; 
		StudentSignDate.value = "";	   
	}
}

        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_DeptChairSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_DeptChairSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_CheckBox_InstructorSign_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_CheckBox_InstructorSign_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToInstructor"){
	if (this.value == 1) {
	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
                //InstructorSign.value = myresopnse[0].FIRST_NAME + " " + myresopnse[0].LAST_NAME;
                InstructorSign.value = userValue;
				InstructorSignDate.value = myresponse.SERVER_DATE;		
                InstructorUserId.value = myresponse.userId;
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});

           // StudentSignature.enabled = false; 
			//StudentSignDate.enabled = false; 
      		//DeptChairSign.enabled=false;
      //DeptChairSignDate.enabled=false;
      //DeptChairRecommend.enabled=false;
				
	} else {
        StudentSignature.enabled = ""; 
		StudentSignDate.value = "";	   
	}
}
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_InstructorSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_InstructorSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_InstructorSignDate_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_InstructorSignDate_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null && StageIndicator.value == "ToAppeals"){
var d = "";
const dt = new Date("2021-04-16"); 
 
var now = new Date(new Date().toISOString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).slice(0,10));
//test date
//now = new Date("2021-04-17"); 
  
if(now > dt){ 
now.setDate(now.getDate()+14);
now = new Date(now);
var curyear = now.getFullYear();
var curyearMonth = now.getMonth();
var curyearDay = now.getDate();
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
curyearMonth = monthNames[curyearMonth];
d = (curyearMonth + " " + curyearDay + "," + curyear);
}else{
d = "May 1, 2021";
}
DepositByDate.value = d;
 
}
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_CheckBox_RecordsSign_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_CheckBox_RecordsSign_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToRecords"){
	if (this.value == 1) {
	   $.ajax({
			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
                RecordsSign.value = userValue;
				RecordsUserId.value = myresponse.userId;				
                RecordSignDate.value = myresponse.SERVER_DATE;			
                //RecordsUserEmailId.value = myresopnse[0].EMAILID;
                RecordsUserEmailId.value = "poornavivekraj.nagarajan@thoughtfocus.com";
                //RecordsUserEmailId.value = "sharan.deep@thoughtfocus.com";
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});

            //StudentSignature.enabled = false; 
			//StudentSignDate.enabled = false; 
      		//DeptChairSign.enabled=false;
     // DeptChairSignDate.enabled=false;
      //DeptChairRecommend.enabled=false;
				
	} else {
        RecordsSign.enabled = ""; 
		RecordSignDate.value = "";	   
	}
}
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_RecordSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_RecordSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_hiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_hiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_AdmittedTerm_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_AdmittedTerm_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_ClassNumberList_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_ClassNumberList_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_CourseNumberList_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_CourseNumberList_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            
    getPdf();


function getPdf() {
    console.log("in view pdf");
  
    window.guideBridge.getDataXML({
        success: function(result) {
           console.log("in view pdf="+result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/challenge-by-examination/challenge-by-examination');
            jsonData.append('fileName', "Challenge by Examination");          
            console.log("jsonData: " + jsonData);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/bin/getDoR', true);
            xhr.responseType = 'blob';	
            xhr.send(jsonData);	
            xhr.onload  = function () {
                if (this.status === 200) {
                    var filename = "";
                    var disposition = xhr.getResponseHeader('Content-Disposition');
                    if (disposition && disposition.indexOf('attachment') !== -1) {
                        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        var matches = filenameRegex.exec(disposition);
                        if (matches !== null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                    }
                    var type = xhr.getResponseHeader('Content-Type');

                    var blob;
                    if (typeof File === 'function') {
                        try {
                            blob = new File([this.response], filename, { type: type });
                        } catch (e) { /* Edge */ }
                    }
                    if (typeof blob === 'undefined') {
                        blob = new Blob([this.response], { type: type });
                    }

                    if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                        window.navigator.msSaveBlob(blob, filename);
                    } else {
                        var URL = window.URL || window.webkitURL;
                        var downloadUrl = URL.createObjectURL(blob);

                        if (filename) {
                            // use HTML5 a[download] attribute to specify filename
                            var a = document.createElement("a");
                            // safari doesn't support this yet
                            if (typeof a.download === 'undefined') {
                                window.location = downloadUrl;
                            } else {
                                a.href = downloadUrl;
                                a.download = filename;
                                document.body.appendChild(a);								
                                a.click();
                            }
                        } else {
                            window.location = downloadUrl;
                        }
                        setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
                    }
                }
            };	      
        },
        error: function(guideResultObject) {
            console.log("got error");
        },
        guideState: null,
        boundData: true
    });
}
        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_BackButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_BackButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.setFocus(null,'prevItemDeep',true);

        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_NextButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_NextButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            
guideBridge.setFocus(null,'nextItemDeep',true);

        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_submit1607673526985_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_submit1607673526985_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
aftiaDescCWID.value = StudentFullName.value + " " + CWID.value;
EmailSubject.value = " Test - Challenge by Examination Form - " + StudentFullName.value + " - " + CWID.value;

var validationFlag = true;
//Check atleast one course is selected or not
if (validationFlag === true) {
    var rowsCount = CourseRow.instanceManager.instanceCount;
    var flag;
    for (n = 0; n < rowsCount; n++) {
        if (CourseRow.instanceManager.instances[n].SelectCB.value != "Yes") {
            flag = 0;
        } else {
            flag = 1;
            break;
        }
    }
    if (flag === 0) {
        validationFlag = false;
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].ChallengePanels[0].courseDetailsPanel[0]");
       showErrorModal("Alert!", "Please select the course(s) to challenge.");
     
   // }// else if(Instructions_CheckBox.value !== 1) {
     //   validationFlag = false;
      // guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].ChallengePanels[0].InstructionsPanel[0].Instructions_CheckBox[0]");
		//showErrorModal("Alert!", "Please check and understand policy for the course(s) to challenge.");
    } else {
        validationFlag = true;
    }  
 }

if (validationFlag === true) {
//Set Course list, class number,class section
var rowCount5 = CourseRow.instanceManager.instanceCount;
if(rowCount5 > 0){
  CourseNumberList.value = "";
  ClassSectionList.value = "";
  ClassNumberList.value = "";
    for ( n = 0; n < rowsCount; n++) {
     
        if (CourseRow.instanceManager.instances[n].SelectCB.value == "Yes") {
            if(CourseNumberList.value === null)
             { 
              CourseNumberList.value = CourseRow.instanceManager.instances[n].CourseNo.value;
             }else{
               CourseNumberList.value = (CourseNumberList.value+", ".concat(CourseRow.instanceManager.instances[n].CourseNo.value));
             }
            if(ClassSectionList.value === null)
             { 
              ClassSectionList.value = CourseRow.instanceManager.instances[n].SectionNo.value;
             }else{
               ClassSectionList.value = (ClassSectionList.value+", ".concat(CourseRow.instanceManager.instances[n].SectionNo.value));
            }   
          if(ClassNumberList.value === null)
             { 
              ClassNumberList.value = CourseRow.instanceManager.instances[n].ScheduleNo.value;
             }else{
              ClassNumberList.value = (ClassNumberList.value+", ".concat(CourseRow.instanceManager.instances[n].ScheduleNo.value));
            } 
        } 
    }
}
//Set email address
//StudentEmail.value = "yjayaram@fullerton.edu";
//var testEmail = "yjayaram@fullerton.edu";

StudentEmail.value = "larthur@FULLERTON.EDU";
var testEmail = "larthur@FULLERTON.EDU";


//StudentEmail.value = "poornavivekraj.nagarajan@thoughtfocus.com";
//var testEmail = "poornavivekraj.nagarajan@thoughtfocus.com";
   
  
var resultArray = JSON.parse(LookupResult.value);
for(j=0;j<resultArray.COURSES.length;j++){
  resultArray.COURSES[j].CHAIR_EMAIL = testEmail;
  resultArray.COURSES[j].INSTR_EMAIL = testEmail;
}
LookupResult.value = JSON.stringify(resultArray);
console.log(LookupResult.value);


}
guideBridge.submit();

        }
	}
}
/**
 * @function challenge_by_examination_challenge_by_examination.generated_submit1607673526985_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
challenge_by_examination_challenge_by_examination.generated_submit1607673526985_click1 = function (scope) {
    with(this) {
        with(scope) {
            //debugger;
aftiaDescCWID.value = StudentFullName.value + " " + CWID.value;
EmailSubject.value = " Challenge by Examination Form - " + StudentFullName.value + " - " + CWID.value;

var validationFlag = true;
//Check atleast one course is selected or not
if (validationFlag === true) {
    var rowsCount = CourseRow.instanceManager.instanceCount;
    var flag;
    for (n = 0; n < rowsCount; n++) {
        if (CourseRow.instanceManager.instances[n].SelectCB.value != "Yes") {
            flag = 0;
        } else {
            flag = 1;
            break;
        }
    }
    if (flag === 0) {
        validationFlag = false;
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].ChallengePanels[0].courseDetailsPanel[0]");
       showErrorModal("Alert!", "Please select the course(s) to challenge.");
     
   // }// else if(Instructions_CheckBox.value !== 1) {
     //   validationFlag = false;
      // guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].ChallengePanels[0].InstructionsPanel[0].Instructions_CheckBox[0]");
		//showErrorModal("Alert!", "Please check and understand policy for the course(s) to challenge.");
    } else {
        validationFlag = true;
    }  
 }

if (validationFlag === true) {
//Set Course list, class number,class section
var rowCount5 = CourseRow.instanceManager.instanceCount;
if(rowCount5 > 0){
  CourseNumberList.value = "";
  ClassSectionList.value = "";
  ClassNumberList.value = "";
    for ( n = 0; n < rowsCount; n++) {
     
        if (CourseRow.instanceManager.instances[n].SelectCB.value == "Yes") {
            if(CourseNumberList.value === null)
             { 
              CourseNumberList.value = CourseRow.instanceManager.instances[n].CourseNo.value;
             }else{
               CourseNumberList.value = (CourseNumberList.value+", ".concat(CourseRow.instanceManager.instances[n].CourseNo.value));
             }
            if(ClassSectionList.value === null)
             { 
              ClassSectionList.value = CourseRow.instanceManager.instances[n].SectionNo.value;
             }else{
               ClassSectionList.value = (ClassSectionList.value+", ".concat(CourseRow.instanceManager.instances[n].SectionNo.value));
            }   
          if(ClassNumberList.value === null)
             { 
              ClassNumberList.value = CourseRow.instanceManager.instances[n].ScheduleNo.value;
             }else{
              ClassNumberList.value = (ClassNumberList.value+", ".concat(CourseRow.instanceManager.instances[n].ScheduleNo.value));
            } 
        } 
    }
}
//Set email address
//StudentEmail.value = "yjayaram@fullerton.edu";
//var testEmail = "yjayaram@fullerton.edu";

//StudentEmail.value = "sharan.deep@thoughtfocus.com";
//var testEmail = "sharan.deep@thoughtfocus.com";


//StudentEmail.value = "poornavivekraj.nagarajan@thoughtfocus.com";
//var testEmail = "poornavivekraj.nagarajan@thoughtfocus.com";
   
  
var resultArray = JSON.parse(LookupResult.value);
for(j=0;j<resultArray.COURSES.length;j++){
  resultArray.COURSES[j].CHAIR_EMAIL = testEmail;
  resultArray.COURSES[j].INSTR_EMAIL = testEmail;
}
LookupResult.value = JSON.stringify(resultArray);
console.log(LookupResult.value);


}
guideBridge.submit();

        }
	}
}
