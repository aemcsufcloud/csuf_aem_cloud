/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            var userValue = response.userId;
           //userValue = "nvadlakunta";
            WorkflowInitiator.value = userValue;
          getStudentDetails(userValue);
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}

debugger;
function getStudentDetails(userValue) {
    $.ajax({
        type: 'GET',
        url: "/bin/getVerificationRequestData",
        data: {
            action: "VERIFICATION_USER_DETAILS",
            userID: userValue
        },
        dataType: 'json',
        success: function(response) {
            if (response.length >= 1) {
                CWID.value = response[0].EMPLID;
                StudentFirstName.value = response[0].FIRST_NAME;
                StudentLastName.value = response[0].LAST_NAME;
                StudentUserId.value = response[0].USERID;
                StudentPhone.value = response[0].HOME_PHONE;                
                StudentEmail.value = "shreyas.manjunatah@thoughtfocus.com";        
                StudentFullName.value = StudentFirstName.value + " " + StudentLastName.value;
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
 * @function university_withdrawal_form_university_withdrawal_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
 
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            //var userValue = response.userId;
          var userValue = "hgueta";
          //  var userValue = "gys";
            workflow_initiator.value = userValue;
          getStudentDetails(userValue);
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}


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

            if (response.length >= 1) {
  
                CWID.value = response[0].STUDENT_ID;
                StudentFirstName.value = response[0].STUDENT_FNAME;
                StudentLastName.value = response[0].STUDENT_LNAME;
                StudentUserId.value = response[0].STUDENT_USERID;
                StudentPhone.value = response[0].STUDENT_PHONE;                
				//StudentEmail.value = response[0].STUDENT_EMAIL;
                StudentEmail.value = "yjayaram@fullerton.edu"; 
                StudentFullName.value = StudentFirstName.value + " " + StudentLastName.value;
                AdmittedTerm.value = response[0].ADMIT_TERM_DESCR;
                StudentMajor.value = response[0].PROGRAMS;
                TermYear.value = response[0].ACAD_YEAR;
                Term.value = response[0].ADMIT_TERM;
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
 * @function university_withdrawal_form_university_withdrawal_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            

if (StageIndicator.value === null) {
 
    basicInformationpanel.visible = true;
    PrerequisitesPanel.visible = true;
    ReasonPanel.visible = true;
    studentSignaturePanel.visible = true;
    UnitSignaturePanel.visible = false;  
   // OtherWithdrawReason.visible = false;
}

if (StageIndicator.value === "ToRegistrationUnit") {
 
    basicInformationpanel.visible = true;
    PrerequisitesPanel.visible = true;
    ReasonPanel.visible = true;
    studentSignaturePanel.visible = true;
    UnitSignaturePanel.visible = true;  
    basicInformationpanel.enabled = false;
    PrerequisitesPanel.enabled = false;
    ReasonPanel.enabled = false;
   // OtherWithdrawReason.visible = true;
   // OtherWithdrawReason.enabled = false;
    studentSignaturePanel.enabled = false;
}

        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_CaseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_CaseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if(StageIndicator.value === null){
    $.ajax({

      type: 'GET', 
      url:"/bin/getCaseID",
      dataType: 'json',

      success: function(myresponse){            
        CaseId.value = myresponse.CASEID;

      	}
	}); 	
}
        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_CWID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_CWID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_StudentFirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_StudentFirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_StudentLastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_StudentLastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_StudentPhone_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_StudentPhone_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_AdmittedTerm_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_AdmittedTerm_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_StudentEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_StudentEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_StudentMajor_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_StudentMajor_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_WithdrawReason_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_WithdrawReason_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            //if(StageIndicator.value === null ){
if(this.value == "1" || this.value == "2" || this.value == "3"){
  OtherWithdrawReason.visible  = false;
  OtherWithdrawReason.value = null;
}
else{
 OtherWithdrawReason.visible  = true;
 OtherWithdrawReason.enabled = true;
 OtherWithdrawReason.mandatory = true;
}
//}

        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_OtherWithdrawReason_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_OtherWithdrawReason_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(WithdrawReason.value == "4"){
  this.visible =true;
}
else{
  this.visible =false;
}
        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_supportDoc1_valueCommit0 = function (scope) {
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
 * @function university_withdrawal_form_university_withdrawal_form.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_supportDoc2_valueCommit0 = function (scope) {
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
 * @function university_withdrawal_form_university_withdrawal_form.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_supportDoc3_valueCommit0 = function (scope) {
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
 * @function university_withdrawal_form_university_withdrawal_form.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_StudentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
	if (this.value == 1) {
if(StageIndicator.value === null){
  if (StudentSignature.value === null) {           
            StudentSignDate.enabled = false;

	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
                StudentSignature.value = StudentFirstName.value+ " " + StudentLastName.value;
				StudentSignDate.value = myresponse.SERVER_DATE;			
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});
  }
}
				
	} else {
        StudentSignature.value = ""; 
		StudentSignDate.value = "";	   
	}









        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_StudentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_StudentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_StudentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_StudentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_UnitCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_UnitCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            	if (this.value == 1) {
if(StageIndicator.value == "ToRegistrationUnit" ){
   if (RegistrationUnitSignature.value === null) {           
            RegistrationUnitSignDate.enabled = false;

	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
				RegistrationUnitSignature.value = userValue;
				RegistrationUnitSignDate.value = myresponse.SERVER_DATE;		
                 //financialAidAssignee.value = myresponse.userId;
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});
   }
}
	} else {
	     RegistrationUnitSignature.value = "";
		RegistrationUnitSignDate.value = "";
      //financialAidAssignee.value = "";
	}











        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_RegistrationUnitSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_RegistrationUnitSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_RegistrationUnitSignDate_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_RegistrationUnitSignDate_valueCommit0 = function (scope) {
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
 * @function university_withdrawal_form_university_withdrawal_form.generated_hiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_hiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_button_6708717581632745254607_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_button_6708717581632745254607_click0 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.setFocus(null,'prevItemDeep',true);

        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_button1632744998705_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_button1632744998705_click0 = function (scope) {
    with(this) {
        with(scope) {
            
guideBridge.setFocus(null,'nextItemDeep',true);

        }
	}
}
/**
 * @function university_withdrawal_form_university_withdrawal_form.generated_submit1607673526985_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
university_withdrawal_form_university_withdrawal_form.generated_submit1607673526985_click0 = function (scope) {
    with(this) {
        with(scope) {
            aftiaDescCWID.value = StudentFullName.value + " " + CWID.value;
EmailSubject.value = "Test - University Withdrawal Form - " + StudentFullName.value + " - " + CWID.value;
guideBridge.submit();
 


        }
	}
}
