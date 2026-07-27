/**
 * @function verification_request_fees_verification_request_fees.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    VerificationSignaturePanel.visible = false;
  //suppdoc
  SupportingDocuments.visible = true;
}

if (StageIndicator.value == "ToVerificaationReview") {
    StudentInformation.enabled = false;
    InstructionsPanel.enabled = false;
    SupportingDocuments.visible = false;
   if(MailtoRB.value === "1"){
  mailtoSection.visible = true;
}
    StudentSignaturePanel.enabled = false;
    VerificationSignaturePanel.visible = true;
    VerificationSignaturePanel.enabled = true;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            
var typeFlag = "";
if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            var userValue = response.userId;
           userValue = "gys";
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
        url: "/bin/getVerificationRequestData",
        data: {
            action: "VERIFICATION_USER_DETAILS",
            userID: userValue
        },
        dataType: 'json',
        success: function(response) {
            if (response.length >= 1) {
                CWID_SSN.value = response[0].EMPLID;
                FirstName.value = response[0].FIRST_NAME;
                LastName.value = response[0].LAST_NAME;
                MiddleName.value = response[0].MIDDLE_NAME;
                StudentUserId.value = response[0].USERID;
                StreetAddress.value = response[0].ADDRESS1;
                AptUnit.value = response[0].ADDRESS2;
                City.value = response[0].CITY;
                State.value = response[0].STATE;
                ZipCode.value = response[0].POSTAL;
                PhoneNo.value = response[0].HOME_PHONE;
              //  Email.value = response[0].PREF_EMAIL; 
                // Convert DOB to mm/dd/yyyy format
                var dob = new Date(response[0].DOB);

                 var month = (dob.getMonth() + 1 < 10 ? '0' : '') + (dob.getMonth() + 1);
              var day = (dob.getDate() < 10 ? '0' : '') + dob.getDate();
                var year = dob.getFullYear();
               var formattedDOB = (year + "-" + month + "-" + day);
               DOB.value = formattedDOB;
               //Email.value = "smartinez@FULLERTON.EDU";
               Email.value = "shreyas.manjunatha@thoughtfocus.com";
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
 * @function verification_request_fees_verification_request_fees.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    $.ajax({

 

type: 'GET',

 

url:"/bin/getCaseID",

         

dataType: 'json',

         

success: function(myresponse){              

                 

                   caseId.value = myresponse.CASEID;

                                      

},

});
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_CWID_SSN_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_CWID_SSN_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_FirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_FirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_LastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_LastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_Email_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_Email_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_StreetAddress_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_StreetAddress_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_City_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_City_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_State_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_State_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_ZipCode_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_ZipCode_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_PhoneNo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_PhoneNo_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_DOB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_DOB_init0 = function (scope) {
    with(this) {
        with(scope) {
             this.enabled = false;

        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_DOB_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_DOB_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
	  this.enabled = false;

  DOB.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_MailtoRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_MailtoRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            //if(StageIndicator.value === null){
if(this.value === "1"){
  mailtoSection.visible = true;
}else{
  mailtoSection.visible = false; 
  CompanyName.value = ""; 
  StreetAddressT.value = "";  
  Apt.value = ""; 
  CityT.value = "";  
  StateT.value = "";  
  ZipCodeT.value = "";  
}
//}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_MailtoRB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_MailtoRB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "3"){
  EmailTF.enabled = true;
  EmailTF.mandatory = true;
}else{
  EmailTF.enabled = false;
  EmailTF.mandatory = false;
  EmailTF.value = null;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_EmailTF_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_EmailTF_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_mailtoSection_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_mailtoSection_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_S2506CB1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_S2506CB1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_S2506CB1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_S2506CB1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1"){
  PreRegTFO.enabled = true;
  PreRegTFO.mandatory = true;
}else{
  PreRegTFO.value = "";
  PreRegTFO.enabled = false;
  PreRegTFO.mandatory = false;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_PreRegTFO_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_PreRegTFO_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_PreRegTFO_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_PreRegTFO_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
var action = this.value;
var sum;
sum = action * 10;
PreRegTFT.value = sum;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_PreRegTFT_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_PreRegTFT_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_PreRegTFT_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_PreRegTFT_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var vNTTFT = VNTTFT.value;
    if (vNTTFT !== null) {
        finalTotal = finalTotal + parseFloat(vNTTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }
	var earlyDegTFT = EarlyDegTFT.value;
    if (earlyDegTFT !== null) {
        finalTotal = finalTotal + parseFloat(earlyDegTFT);
    }
	var scheduleTFT = ScheduleTFT.value;
    if (scheduleTFT !== null) {
        finalTotal = finalTotal + parseFloat(scheduleTFT);
    }
	/*var loanTFT = LoanTFT.value;
    if (loanTFT !== null) {
        finalTotal = finalTotal + parseFloat(loanTFT);
    }*/


    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_S2506CB2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_S2506CB2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  EnrollmemtTFO.enabled = true;
  EnrollmemtTFO.mandatory = true;
}else{
  EnrollmemtTFO.value = "";
  EnrollmemtTFO.enabled = false;
  EnrollmemtTFO.mandatory = false;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_EnrollmemtTFO_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_EnrollmemtTFO_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_EnrollmemtTFO_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_EnrollmemtTFO_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var action = this.value;
var sum;
sum = action * 10;
EnrollmentTFT.value = sum;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_EnrollmentTFT_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_EnrollmentTFT_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled= false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_EnrollmentTFT_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_EnrollmentTFT_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var vNTTFT = VNTTFT.value;
    if (vNTTFT !== null) {
        finalTotal = finalTotal + parseFloat(vNTTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }
	var earlyDegTFT = EarlyDegTFT.value;
    if (earlyDegTFT !== null) {
        finalTotal = finalTotal + parseFloat(earlyDegTFT);
    }
	var scheduleTFT = ScheduleTFT.value;
    if (scheduleTFT !== null) {
        finalTotal = finalTotal + parseFloat(scheduleTFT);
    }
/*	var loanTFT = LoanTFT.value;
    if (loanTFT !== null) {
        finalTotal = finalTotal + parseFloat(loanTFT);
    }
*/

    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_S2506CB3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_S2506CB3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  GoodStudentTFO.enabled = true;
  GoodStudentTFO.mandatory = true;
}else{
  GoodStudentTFO.value = "";
  GoodStudentTFO.enabled = false;
  GoodStudentTFO.mandatory = false;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_GoodStudentTFO_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_GoodStudentTFO_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_GoodStudentTFO_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_GoodStudentTFO_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            	
var action = this.value;
var sum;
sum = action * 10;
GoodStudentTFT.value = sum;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_GoodStudentTFT_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_GoodStudentTFT_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_GoodStudentTFT_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_GoodStudentTFT_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var historyTFT = HistoryTFT.value;
    if (historyTFT !== null) {
        finalTotal = finalTotal + parseFloat(historyTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }

    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_GoodStudentTFT_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_GoodStudentTFT_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var vNTTFT = VNTTFT.value;
    if (vNTTFT !== null) {
        finalTotal = finalTotal + parseFloat(vNTTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }
	var earlyDegTFT = EarlyDegTFT.value;
    if (earlyDegTFT !== null) {
        finalTotal = finalTotal + parseFloat(earlyDegTFT);
    }
	var scheduleTFT = ScheduleTFT.value;
    if (scheduleTFT !== null) {
        finalTotal = finalTotal + parseFloat(scheduleTFT);
    }
	/*var loanTFT = LoanTFT.value;
    if (loanTFT !== null) {
        finalTotal = finalTotal + parseFloat(loanTFT);
    }*/


    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_MilitoryIDCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_MilitoryIDCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_MilitoryIDCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_MilitoryIDCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  MilitoryIDTFO.enabled = true;
  MilitoryIDTFO.mandatory = true;
  MilitoryID.enabled = true;
  MilitoryID.mandatory = true;
}else{
  MilitoryIDTFO.value = "";
  MilitoryID.value = "";
  MilitoryIDTFO.enabled = false;
  MilitoryID.enabled = false;
  MilitoryIDTFO.mandatory = false; 
  MilitoryID.mandatory = false;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_MilitoryID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_MilitoryID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_MilitoryIDTFO_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_MilitoryIDTFO_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_MilitoryIDTFO_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_MilitoryIDTFO_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var action = this.value;
var sum;
sum = action * 10;
MilitoryIDTFT.value = sum;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_MilitoryIDTFT_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_MilitoryIDTFT_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_MilitoryIDTFT_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_MilitoryIDTFT_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
             
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var vNTTFT = VNTTFT.value;
    if (vNTTFT !== null) {
        finalTotal = finalTotal + parseFloat(vNTTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }
	var earlyDegTFT = EarlyDegTFT.value;
    if (earlyDegTFT !== null) {
        finalTotal = finalTotal + parseFloat(earlyDegTFT);
    }
	var scheduleTFT = ScheduleTFT.value;
    if (scheduleTFT !== null) {
        finalTotal = finalTotal + parseFloat(scheduleTFT);
    }
	/*var loanTFT = LoanTFT.value;
    if (loanTFT !== null) {
        finalTotal = finalTotal + parseFloat(loanTFT);
    }*/


    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_NeverCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_NeverCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_NeverCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_NeverCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NeverTFO.enabled = true;
  NeverTFO.mandatory = true;
}else{
  NeverTFO.mandatory = false;
  NeverTFO.enabled = false;
  NeverTFO.value = "";
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_NeverTFO_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_NeverTFO_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_NeverTFO_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_NeverTFO_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var action = this.value;
var sum;
sum = action * 10;
NeverTFT.value = sum;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_NeverTFT_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_NeverTFT_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_NeverTFT_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_NeverTFT_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var vNTTFT = VNTTFT.value;
    if (vNTTFT !== null) {
        finalTotal = finalTotal + parseFloat(vNTTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }
	var earlyDegTFT = EarlyDegTFT.value;
    if (earlyDegTFT !== null) {
        finalTotal = finalTotal + parseFloat(earlyDegTFT);
    }
	var scheduleTFT = ScheduleTFT.value;
    if (scheduleTFT !== null) {
        finalTotal = finalTotal + parseFloat(scheduleTFT);
    }
	var loanTFT = LoanTFT.value;
    if (loanTFT !== null) {
        finalTotal = finalTotal + parseFloat(loanTFT);
    }


    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_DesignatedCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_DesignatedCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_DesignatedCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_DesignatedCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  DesignatedTFO.enabled = true;
  SpecifyTerm.enabled = true;
  DesignatedTFO.mandatory = true;
  SpecifyTerm.mandatory = true;
}else{
  DesignatedTFO.value = "";
  SpecifyTerm.value = "";
  DesignatedTFO.enabled = false;
  SpecifyTerm.enabled = false;
  DesignatedTFO.mandatory = false;
  SpecifyTerm.mandatory = false;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_SpecifyTerm_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_SpecifyTerm_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_DesignatedTFO_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_DesignatedTFO_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_DesignatedTFO_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_DesignatedTFO_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var action = this.value;
var sum;
sum = action * 10;
DesignatedTFT.value = sum;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_DesignatedTFT_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_DesignatedTFT_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_DesignatedTFT_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_DesignatedTFT_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var vNTTFT = VNTTFT.value;
    if (vNTTFT !== null) {
        finalTotal = finalTotal + parseFloat(vNTTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }
	var earlyDegTFT = EarlyDegTFT.value;
    if (earlyDegTFT !== null) {
        finalTotal = finalTotal + parseFloat(earlyDegTFT);
    }
	var scheduleTFT = ScheduleTFT.value;
    if (scheduleTFT !== null) {
        finalTotal = finalTotal + parseFloat(scheduleTFT);
    }
	/*var loanTFT = LoanTFT.value;
    if (loanTFT !== null) {
        finalTotal = finalTotal + parseFloat(loanTFT);
    }*/


    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_TotalHistoryCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_TotalHistoryCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_TotalHistoryCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_TotalHistoryCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  TotalHisTFO.enabled = true;
  TotalHisTFO.mandatory = true;
}else{
  TotalHisTFO.value = "";
  TotalHisTFO.enabled = false;
  TotalHisTFO.mandatory = false;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_TotalHisTFO_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_TotalHisTFO_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_TotalHisTFO_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_TotalHisTFO_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var action = this.value;
var sum;
sum = action * 10;
TotalHisTFT.value = sum;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_TotalHisTFT_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_TotalHisTFT_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_TotalHisTFT_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_TotalHisTFT_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var vNTTFT = VNTTFT.value;
    if (vNTTFT !== null) {
        finalTotal = finalTotal + parseFloat(vNTTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }
	var earlyDegTFT = EarlyDegTFT.value;
    if (earlyDegTFT !== null) {
        finalTotal = finalTotal + parseFloat(earlyDegTFT);
    }
	var scheduleTFT = ScheduleTFT.value;
    if (scheduleTFT !== null) {
        finalTotal = finalTotal + parseFloat(scheduleTFT);
    }
/*	var loanTFT = LoanTFT.value;
    if (loanTFT !== null) {
        finalTotal = finalTotal + parseFloat(loanTFT);
    }*/


    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VOECB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VOECB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VOECB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VOECB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  VOETFO.enabled = true;
  VOETFO.mandatory = true;
}else{
  VOETFO.value = "";
  VOETFO.enabled = false;
  VOETFO.mandatory = false;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VOETFO_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VOETFO_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VOETFO_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VOETFO_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var action = this.value;
var sum;
sum = action * 10;
VOETFT.value = sum;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VOETFT_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VOETFT_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VOETFT_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VOETFT_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var vNTTFT = VNTTFT.value;
    if (vNTTFT !== null) {
        finalTotal = finalTotal + parseFloat(vNTTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }
	var earlyDegTFT = EarlyDegTFT.value;
    if (earlyDegTFT !== null) {
        finalTotal = finalTotal + parseFloat(earlyDegTFT);
    }
	var scheduleTFT = ScheduleTFT.value;
    if (scheduleTFT !== null) {
        finalTotal = finalTotal + parseFloat(scheduleTFT);
    }
	/*var loanTFT = LoanTFT.value;
    if (loanTFT !== null) {
        finalTotal = finalTotal + parseFloat(loanTFT);
    }*/


    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VNTCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VNTCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VNTCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VNTCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  VNTTFO.enabled = true;
  VNTTFO.mandatory = true;
}else{
  VNTTFO.value = "";
  VNTTFO.enabled = false;
  VNTTFO.mandatory = false;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VNTTFO_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VNTTFO_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VNTTFO_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VNTTFO_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var action = this.value;
var sum;
sum = action * 10;
VNTTFT.value = sum;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VNTTFT_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VNTTFT_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VNTTFT_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VNTTFT_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var vNTTFT = VNTTFT.value;
    if (vNTTFT !== null) {
        finalTotal = finalTotal + parseFloat(vNTTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }
	var earlyDegTFT = EarlyDegTFT.value;
    if (earlyDegTFT !== null) {
        finalTotal = finalTotal + parseFloat(earlyDegTFT);
    }
	var scheduleTFT = ScheduleTFT.value;
    if (scheduleTFT !== null) {
        finalTotal = finalTotal + parseFloat(scheduleTFT);
    }
	/*var loanTFT = LoanTFT.value;
    if (loanTFT !== null) {
        finalTotal = finalTotal + parseFloat(loanTFT);
    }*/


    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_OtherCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_OtherCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_OtherCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_OtherCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  OtherTF.enabled = true;
  OtherTF.mandatory = true;
//  SupportingDocuments.visible = true;
}else{
  OtherTF.value = "";
  OtherTF.enabled = false;
  OtherTF.mandatory = false;
  //SupportingDocuments.visible = false;
 // supportDoc1.fileAttachment.value = null;
  //supportDoc2.fileAttachment.value = null; 
 // supportDoc3.fileAttachment.value = null;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_OtherTF_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_OtherTF_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_OtherTF_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_OtherTF_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var action = this.value;
var sum;
sum = action * 10;
OtherTFT.value = sum;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_OtherTFT_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_OtherTFT_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_OtherTFT_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_OtherTFT_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var vNTTFT = VNTTFT.value;
    if (vNTTFT !== null) {
        finalTotal = finalTotal + parseFloat(vNTTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }
	var earlyDegTFT = EarlyDegTFT.value;
    if (earlyDegTFT !== null) {
        finalTotal = finalTotal + parseFloat(earlyDegTFT);
    }
	var scheduleTFT = ScheduleTFT.value;
    if (scheduleTFT !== null) {
        finalTotal = finalTotal + parseFloat(scheduleTFT);
    }
/*	var loanTFT = LoanTFT.value;
    if (loanTFT !== null) {
        finalTotal = finalTotal + parseFloat(loanTFT);
    }*/


    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_S2504CB1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_S2504CB1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_S2504CB1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_S2504CB1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  DegreeVerTFO.enabled = true;
  DegreeVerTFO.mandatory = true;
}else{
  DegreeVerTFO.value = "";
  DegreeVerTFO.enabled = false;
  DegreeVerTFO.mandatory = false;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_DegreeVerTFO_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_DegreeVerTFO_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_DegreeVerTFO_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_DegreeVerTFO_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var action = this.value;
var sum;
sum = action * 10;
DegreeVerTFT.value = sum;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_DegreeVerTFT_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_DegreeVerTFT_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_DegreeVerTFT_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_DegreeVerTFT_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var vNTTFT = VNTTFT.value;
    if (vNTTFT !== null) {
        finalTotal = finalTotal + parseFloat(vNTTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }
	var earlyDegTFT = EarlyDegTFT.value;
    if (earlyDegTFT !== null) {
        finalTotal = finalTotal + parseFloat(earlyDegTFT);
    }
	var scheduleTFT = ScheduleTFT.value;
    if (scheduleTFT !== null) {
        finalTotal = finalTotal + parseFloat(scheduleTFT);
    }
	/*var loanTFT = LoanTFT.value;
    if (loanTFT !== null) {
        finalTotal = finalTotal + parseFloat(loanTFT);
    }*/


    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_EarlyDegCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_EarlyDegCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_EarlyDegCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_EarlyDegCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  EarlyDegTFO.enabled = true;
  EarlyDegTFO.mandatory = true;
}else{
  EarlyDegTFO.value = "";
  EarlyDegTFO.enabled = false;
  EarlyDegTFO.mandatory = false;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_EarlyDegTFO_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_EarlyDegTFO_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_EarlyDegTFO_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_EarlyDegTFO_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var action = this.value;
var sum;
sum = action * 10;
EarlyDegTFT.value = sum;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_EarlyDegTFT_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_EarlyDegTFT_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_EarlyDegTFT_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_EarlyDegTFT_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var vNTTFT = VNTTFT.value;
    if (vNTTFT !== null) {
        finalTotal = finalTotal + parseFloat(vNTTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }
	var earlyDegTFT = EarlyDegTFT.value;
    if (earlyDegTFT !== null) {
        finalTotal = finalTotal + parseFloat(earlyDegTFT);
    }
	var scheduleTFT = ScheduleTFT.value;
    if (scheduleTFT !== null) {
        finalTotal = finalTotal + parseFloat(scheduleTFT);
    }
	/*var loanTFT = LoanTFT.value;
    if (loanTFT !== null) {
        finalTotal = finalTotal + parseFloat(loanTFT);
    }*/


    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_ScheduleCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_ScheduleCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_ScheduleCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_ScheduleCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  ScheduleTFO.enabled = true;
  ScheduleTFO.mandatory = true;
}else{
  ScheduleTFO.value = "";
  ScheduleTFO.enabled = false;
  ScheduleTFO.mandatory = false;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_ScheduleTFO_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_ScheduleTFO_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_ScheduleTFO_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_ScheduleTFO_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var action = this.value;
var sum;
sum = action * 10;
ScheduleTFT.value = sum;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_ScheduleTFT_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_ScheduleTFT_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_ScheduleTFT_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_ScheduleTFT_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var vNTTFT = VNTTFT.value;
    if (vNTTFT !== null) {
        finalTotal = finalTotal + parseFloat(vNTTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }
	var earlyDegTFT = EarlyDegTFT.value;
    if (earlyDegTFT !== null) {
        finalTotal = finalTotal + parseFloat(earlyDegTFT);
    }
	var scheduleTFT = ScheduleTFT.value;
    if (scheduleTFT !== null) {
        finalTotal = finalTotal + parseFloat(scheduleTFT);
    }
	/*var loanTFT = LoanTFT.value;
    if (loanTFT !== null) {
        finalTotal = finalTotal + parseFloat(loanTFT);
    }*/


    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_LoanCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_LoanCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  LoanTFO.enabled = true;
  LoanTFO.mandatory = true;
}else{
  LoanTFO.value = "";
  LoanTFO.enabled = false;
  LoanTFO.mandatory = false;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_LoanTFO_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_LoanTFO_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_LoanTFO_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_LoanTFO_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var action = this.value;
var sum;
sum = action * 10;
LoanTFT.value = sum;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_LoanTFT_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_LoanTFT_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_LoanTFT_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_LoanTFT_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if (StageIndicator.value === null) {
    var finalTotal = 0;
    var preRegTFT = PreRegTFT.value;
    if (preRegTFT !== null) {
        finalTotal = finalTotal + parseFloat(preRegTFT);
    }
    var enrollmentTFT = EnrollmentTFT.value;
    if (enrollmentTFT !== null) {
        finalTotal = finalTotal + parseFloat(enrollmentTFT);
    }
    var degreeVerTFT = DegreeVerTFT.value;
    if (degreeVerTFT !== null) {
        finalTotal = finalTotal + parseFloat(degreeVerTFT);
    }
    var goodStudentTFT = GoodStudentTFT.value;
    if (goodStudentTFT !== null) {
        finalTotal = finalTotal + parseFloat(goodStudentTFT);
    }
    var designatedTFT = DesignatedTFT.value;
    if (designatedTFT !== null) {
        finalTotal = finalTotal + parseFloat(designatedTFT);
    }
    var totalHisTFT = TotalHisTFT.value;
    if (totalHisTFT !== null) {
        finalTotal = finalTotal + parseFloat(totalHisTFT);
    }
   var vNTTFT = VNTTFT.value;
    if (vNTTFT !== null) {
        finalTotal = finalTotal + parseFloat(vNTTFT);
    }
    var voeTFT = VOETFT.value;
    if (voeTFT !== null) {
        finalTotal = finalTotal + parseFloat(voeTFT);
    }
    var militoryIDTFT = MilitoryIDTFT.value;
    if (militoryIDTFT !== null) {
        finalTotal = finalTotal + parseFloat(militoryIDTFT);
    }
    var neverTFT = NeverTFT.value;
    if (neverTFT !== null) {
        finalTotal = finalTotal + parseFloat(neverTFT);
    }
   var otherTFT = OtherTFT.value;
    if (otherTFT !== null) {
        finalTotal = finalTotal + parseFloat(otherTFT);
    }
	var earlyDegTFT = EarlyDegTFT.value;
    if (earlyDegTFT !== null) {
        finalTotal = finalTotal + parseFloat(earlyDegTFT);
    }
	var scheduleTFT = ScheduleTFT.value;
    if (scheduleTFT !== null) {
        finalTotal = finalTotal + parseFloat(scheduleTFT);
    }
	var loanTFT = LoanTFT.value;
    if (loanTFT !== null) {
        finalTotal = finalTotal + parseFloat(loanTFT);
    }


    TotalAmount.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_TotalAmount_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_TotalAmount_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_SupportingDocuments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_SupportingDocuments_init0 = function (scope) {
    with(this) {
        with(scope) {
            
  this.visible = false;

        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_supportDoc1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc1.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(supportDoc1.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        supportDoc1.fileAttachment.value = doc2NewName;
    }
    if (extension !== "pdf") {
        supportDoc1.fileAttachment.value = null;
        showErrorModal("Alert !", "Please upload a supported file");
    }
    if (this.value !== null) {
        supDocAttachText.visible = false;
    }
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_supportDoc2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc2.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(supportDoc2.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        supportDoc2.fileAttachment.value = doc2NewName;
    }
    if (extension !== "pdf") {
        supportDoc2.fileAttachment.value = null;
        showErrorModal("Alert !", "Please upload a supported file");
    }
    if (this.value !== null) {
        supDocAttachText.visible = false;
    }
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_supportDoc3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc3.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(supportDoc3.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        supportDoc3.fileAttachment.value = doc2NewName;
    }
    if (extension !== "pdf") {
        supportDoc3.fileAttachment.value = null;
        showErrorModal("Alert !", "Please upload a supported file");
    }
    if (this.value !== null) {
        supDocAttachText.visible = false;
    }
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_checkbox1649834861348_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_checkbox1649834861348_valueCommit0 = function (scope) {
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
                StudentFullName.value = FirstName.value+ " " +LastName.value;
                StudentSignX.value = FirstName.value+ " " +LastName.value;
				//StudentName.value = StudentFullName.value;
				StudentSignatureDate.value = myresponse.SERVER_DATE;			
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});
			
			//StudentFullName.enabled = false; 
            StudentSignX.enabled = false; 
			StudentSignatureDate.enabled = false; 
				
	} else {
		StudentFullName.value = "";
        StudentSignX.enabled = ""; 
		StudentSignatureDate.value = "";	   
	}
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_StudentFullName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_StudentFullName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_StudentSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_StudentSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_StudentComments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_StudentComments_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible=false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_checkbox1649838422969_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_checkbox1649838422969_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToVerificaationReview" ){
	if (this.value == 1) {
	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
				VerficationName.value = userValue;
				VerificationSignatureDate.value = myresponse.SERVER_DATE;		
                 //financialAidAssignee.value = myresponse.userId;
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});
			
			VerficationName.enabled = false;       
			VerificationSignatureDate.enabled = false; 
				
	} else {
	     VerficationName.value = "";
		VerificationSignatureDate.value = "";
      //financialAidAssignee.value = "";
	}
}


        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VerficationName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VerficationName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VerificationSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VerificationSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_VerficationDecision_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_VerficationDecision_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   DeliveredRB.mandatory = true;
}else{
  DeliveredRB.mandatory = false;
}
        }
	}
}
/**
 * @function verification_request_fees_verification_request_fees.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
getPdf();
/*if (AidYear.value !== null) {
    getPdf();
}else{
  alert("Please fill all the required fields");
      showErrorModal("Alert!", "Please Select Aid Year");
   }*/

function getPdf() {
    console.log("in view pdf");
   debugger;
    window.guideBridge.getDataXML({
        success: function(result) {
           console.log("in view pdf="+result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/verification-request-fees/verification-request-fees');
            jsonData.append('fileName', FirstName.value + "_"+LastName.value);          
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
 * @function verification_request_fees_verification_request_fees.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_request_fees_verification_request_fees.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            

var validationFlag = 0;
var cwidValue = CWID_SSN.value;
var pattern = /^8\d{8}$/;  // CWID pattern check
var result = pattern.test(cwidValue);

if (validationFlag === 0) {
    if (result !== true) {
        validationFlag = 1;
        showErrorModal("Alert!", "Please enter a valid CWID");
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].RequestorInformationPanel[0].CWID[0]");
    }
}

if (RegRB.value !== null) {
    if (S2506CB1.value === null && S2506CB2.value === null && S2504CB1.value === null && S2506CB3.value === null && DesignatedCB.value === null && TotalHistoryCB.value === null && VOECB.value === null && MilitoryIDCB.value === null && NeverCB.value === null && OtherCB.value === null && VNTCB.value === null && ScheduleCB.value === null && EarlyDegCB.value === null && LoanCB.value === null) {
        validationFlag = 1;
        showErrorModal("Alert !", "Please select at least one of the option");
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].InstructionsPanel[0].S2506CB1[0]");
    }
}



if (validationFlag === 0) {
    if (StageIndicator.value === null) {
        aftiaDescCWID.value = HiddenPanel.StudentFullName.value + " " + CWID_SSN.value;
        EmailSubject.value = "Test - Verification Request Form - " + CWID_SSN.value;
    // Email.value = "smartinez@FULLERTON.EDU";
     Email.value = "yjayaram@fullerton.edu";
     // RequestorEmail.value = "shreyas.manjunatha@thoughtfocus.com"; // Uncomment if needed
        guideBridge.submit();
    }
}

        }
	}
}
