/**
 * @function summer_loan_request_summer_loan_request.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value===null){
 Instructions.enabled=true;
 BasicInformation.enabled=true;
//SupportingDocumentsPanel.enabled=true;
 FinancialAidPanel.visible=false;
  
 StudentSignaturePanel.enabled=true;
  // IP Address
  $.getJSON("https://api.ipify.org?format=json", function(data) {                
        ipAddress.value = data.ip;            	
    });
 
 }
   if(StageIndicator.value=="ToFinancialAid"){
     InstructionsPanel.visible=true;
     InstructionsPanel.enabled=false;
     
     BasicInformation.visible=true;
     BasicInformation.enabled=false;
    /* SupportingDocumentsPanel.visible=false;
     SupportingDocumentsPanel.enabled=false; */
     
     LoanRequestTab.visible=true;
     LoanRequestTab.enabled=false;
     
     StudentSignaturePanel.visible=true;
     StudentSignaturePanel.enabled=false;
     
 /*  if(StudentSignaturePanel.value==1){
     StudentSignaturePanel.visible =true;
     StudentSignaturePanel.enabled =false;
   }*/
     FinancialAidPanel.enabled=true;
     FinancialAidPanel.visible=true;
     Instructions.enabled = false;
    
   }
 
 
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            var flag;
if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            // gifModal.style.display = "block";

            var userValue = response.userId;
            //var userValue = 'mariana2'; // two Aid Year
            // var userValue = 'majesticallexi'; // one Aid Year
            //var userValue = 'mchoi88';			 	// no Aid Year
            workflow_initiator.value = userValue;

            getStudentDetails(userValue);

            /*var boldTextCHK = document.querySelectorAll(".boldText label"); // To make the checkbox labels bold
		for(var a=0; a<boldTextCHK.length; a++){
			boldTextCHK[a].style.fontWeight = 'bold';
		}*/
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}



function getStudentDetails(userValue) {
    $.ajax({
        type: 'GET',
        // url: "/bin/getStudentPeronalInformationWithUserID",
        url: "/bin/getCitizenShipData",

        data: {
            action: "CV_USER_DETAILS",
            userID: userValue
        },

        dataType: 'json',
        success: function(response) {
            if (response.length >= 1) {

                var CWID = response[0].EMPLID;
                getStudentAidYearDetails(CWID);
                //var aidYearFlag = getStudentAidYearDetails(studentCWID);
                cwid.value = response[0].EMPLID;
                lastName.value = response[0].LAST_NAME;
                firstName.value = response[0].FIRST_NAME;
                HiddenStudentUserID.value = response[0].USERID;
                CWID_Certification.value = response[0].EMPLID;
                State.value = response[0].STATE;
                City.value = response[0].CITY;
                Zip.value = response[0].POSTAL;
                CellPhone.value = response[0].CELL_PHONE;
                HomeTelephoneNumber.value = response[0].WORK_OTR_PHONE;
                StreetName.value = response[0].ADDRESS1;
                // HiddenStudentEmail.value = response[0].PREF_EMAIL;
                HiddenStudentEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                HiddenStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                //StudentName.value = response[0].student_FName + " " + response[0].student_LName;
                CampusWIdeCWID.value = response[0].EMPLID;

            } else {
                showErrorModal("Alert!", "No matching records found");
            }
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}

function getStudentAidYearDetails(CWID) {
    $.ajax({
        type: 'GET',
        url: "/bin/getTaxFilingStatementDetails",
        data: {
            action: 'STUDENT_DETAILS',
            cwid: CWID
        },
        dataType: 'json',
        success: function(response) {
            if (response.length > 0) {
                var aidYears = [];
                var aidYearsObj = {};
                var identifyAidYearFlag;
                for (var a = 0; a < response.length; a++) {
                    aidYears.push(response[a]);
                }

                for (var b = 0; b < aidYears.length; b++) {
                    aidYearsObj = aidYears[b];
                    for (var key in aidYearsObj) {
                        if ("AID_YEAR" == key) {
                            identifyAidYearFlag = "OneAidYear";
                        } else if ("SECOND_AID_YEAR" == key) {
                            identifyAidYearFlag = "TwoAidYear";
                        }
                    }
                }

                var typeOfAidYear = "";
                typeOfAidYear = getUrlParameters('aidYear');

                if (typeOfAidYear == "0") {
                    singleAidYear();
                } else if (typeOfAidYear == "1") {
                    singleAidYear();
                } else if ((identifyAidYearFlag == "OneAidYear") && (typeOfAidYear != "0" && typeOfAidYear != "1")) {
                    singleAidYear();
                } else if ((identifyAidYearFlag == "TwoAidYear") && (typeOfAidYear != "0" && typeOfAidYear != "1")) {
                     singleAidYear();
                 // aidYearPopup();
                } else {
                  //  showErrorModal("Alert !", "No matching records found for the Aid Year");
                     singleAidYear();
                }
            } else {
               // showErrorModal("Alert !", "No matching records found");
                  singleAidYear();
            }
        }
    });
}

function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";
    var formCodeVal = "";

    if (typeOfAidYear == '0') {
        financialAidYearVal = "2021-2022";
        aidYear.value = "2021";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0SLSM";
        formCodeVal = "F0SLSM";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1SLSM";
        formCodeVal = "F1SLSM";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1SLSM";
        formCodeVal = "F1SLSM";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    }

    if (StageIndicator.value !== null) {
        aidYearValue = financialAidYear.value;
        getFAFSAFinancialAidYear(aidYearValue);
    }
}


function aidYearPopup() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var formCodeVal = "";

    modal.style.display = "block";
    span.onclick = function() {

        if ((document.getElementById("button1").checked === false) && (document.getElementById("button2").checked === false)) {
            modal.style.display = "block";
            showErrorModal("Alert!", "Please select the financial aid year");

        } else {
            modal.style.display = "none";
        }
    };

    document.getElementById("button1").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = "2021-2022";
        aidYear.value = "2021";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0SLSM";
        formCodeVal = "F0SLSM";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = "2022-2023";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1SLSM";
        formCodeVal = "F1SLSM";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    };
}


if (StageIndicator.value !== null) {

    aidYearValue = financialAidYear.value;
    getFAFSAFinancialAidYear(aidYearValue);
}

function getFAFSAFinancialAidYear(financialAidYear) {
  debugger;
    var financialAidYearVal = financialAidYear;
    //var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);
    var taxFilingYear = aidYear.value;
    //var taxFilingYear1= aidYear.value-1;
    var headingTextVal = "";

    var formCodeTextVal = "<p><b>" + formCode.value + "</b></p>";

    if (financialAidYear == "2021-2022") {
        headingTextVal = "<p><b>2021 SUMMER LOAN REQUEST FOR CONTINUING STUDENTS</b></p>";
    }
    if (financialAidYear == "2022-2023") {
        headingTextVal = "<p><b>2023 SUMMER LOAN REQUEST FOR CONTINUING STUDENTS</b></p>";
    }

    var textOneVal;
    /*  if (financialAidYear == "2021-2022") {
        textOneVal = "Read, complete, sign, and submit this to the Office of Financial Aid by April 26, ".concat(taxFilingYear).concat(" if you would like").concat(" it processed before Summer "+taxFilingYear+" disenrollment begins.");
      }
      if (financialAidYear == "2022-2023") {
        textOneVal = "Read, complete, sign, and submit this to the Office of Financial Aid by April 25, ".concat(taxFilingYear).concat(" if you would like").concat(" it processed before Summer "+taxFilingYear+" disenrollment begins.");
      }*/

    var titleTextVal = "";
    if (financialAidYear == "2021-2022") {
        titleTextVal = "<p><b>2021 SUMMER LOAN REQUEST FOR CONTINUING STUDENTS</b></p>";
    }
    if (financialAidYear == "2022-2023") {
        titleTextVal = "<p><b>2023 SUMMER LOAN REQUEST FOR CONTINUING STUDENTS</b></p>";
    }

    if (financialAidYear == "2021-2022") {
        textOneVal = "<ul><li>Read, complete, sign, and submit this to the Office of Financial Aid by April 26, 2021 if you would like it processed before Summer 2021 disenrollment begins.</li><li>Summer loans cannot be processed after July 16, 2021.</li><li>Enroll in a minimum of 6 units for summer 2021.&nbsp;</li></ul>";
    }
    if (financialAidYear == "2022-2023") {
        textOneVal = "<ul><li>Read, complete, sign, and submit this to the Office of Financial Aid by April 24, 2023 if you would like it processed before Summer 2023 disenrollment begins.</li><li>Summer loans cannot be processed after July 16, 2023 (Session A only); July 14, 2023 (Sessions B through E).</li><li>Enroll in a minimum of 6 units for summer 2023.&nbsp;</li></ul>";
    }

    /* var textTwoVal = "Summer loans cannot be processed after July 16, ".concat(taxFilingYear);
     var textThreeVal = "Enroll in a minimum of 6 units for summer ".concat(taxFilingYear);*/
    var textFourVal = "";
    if (financialAidYear == "2021-2022") {
        textFourVal = "<p><b>SUMMER ".concat(taxFilingYear).concat(" LOAN REQUEST");
    }
    if (financialAidYear == "2022-2023") {
        textFourVal = "<p><b>SUMMER 2023 LOAN REQUEST</b></p>";
    }

    var textFiveVal = "";
    if (financialAidYear == "2021-2022") {
        textFiveVal = "Is this your <i><b><u> first </u></b></i> summer loan request for summer ".concat(taxFilingYear).concat("?");
    }
    if (financialAidYear == "2022-2023") {
        textFiveVal = "Is this your <i><b><u> first </u></b></i> summer loan request for summer 2023?";
    }
  
  
  var textSixVal ="";
  if (financialAidYear == "2021-2022") {
        textSixVal = "<p><b>Policy Three</b> - You must enroll in at least 3 units to be considered for Summer Session Grant (SSG).</p>";
    }
    if (financialAidYear == "2022-2023") {
        textSixVal = "<p><b>Policy Three</b> - You must enroll in at least 6 units to be considered for Summer Session Grant (SSG).</p>";
    }
  
  var textSevenVal = "";
    if (financialAidYear == "2021-2022") {
        textSevenVal = "<p><b>Policy Nine</b> - Your eligibility for financial aid programs is contingent upon your meeting Satisfactory Academic Progress (SAP) policies. Your progress will be monitored at the end of each spring term.</p>";
    }
    if (financialAidYear == "2022-2023") {
        textSevenVal = "<p><b>Policy Nine</b> - Your eligibility for financial aid programs is contingent upon your meeting Satisfactory Academic Progress (SAP) policies. Your progress will be monitored at the end of each spring term.  Summer aid eligibility is contingent upon meeting SAP after the spring term.</p>";
    }
  
  


    $("#F0SLSMFormCode").html(formCodeTextVal);
    $("#F0SLSMTitleText").html(titleTextVal);
    //$("#F0SLSMTitleText").html(headingTextVal);
    $("#InstructionsText").html(textOneVal);
    /*  $("#F0SLSMTextTwo").html(textTwoVal);
      $("#F0SLSMextThree").html(textThreeVal);*/
    $("#F0SLSMTextFour").html(textFourVal);
    $("#F0SLSMTextFive").html(textFiveVal);
    $("#PolicyTextThree").html(textSixVal);
    $("#PolicyTextNine").html(textSevenVal);

}



function checkforDuplicateSubmissions(formCodeVal, financialAidYearVal) {
    var tableName = "AEM_SUMMER_LOAN_REQ";
    var financialAidDecisionColumnName = "FINANCIAL_AID_DECISION";
    var formCodeColumnName = "FORM_CODE";
    var faDecision = "1";
    var financialAidYearColumn = "FINANCIAL_AID_YEAR";
    if (StageIndicator.value === null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getCitizenShipData",
            data: {
                action: 'CV_UPDATED_DUPLICATE_CHECK',
                cwid: cwid.value,
                financialAidYear: financialAidYearVal,
                faDecisionColumnName: financialAidDecisionColumnName,
                tableName: tableName,
                formCodeColumnName: formCodeColumnName,
                formCode: formCodeVal,
                faDecision: faDecision,
                financialAidYearColumn: financialAidYearColumn
            },
            dataType: 'json',
            success: function(myresponse) {
                if (myresponse.length >= 1) {
                    showErrorModal("Alert !", "Duplicate submissions are not allowed");
                    submit1574920582933.enabled = false;
                }
            },
        });
    }
}
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
$.ajax({

type: 'GET',
url:"/bin/getCaseID",
dataType: 'json',

success: function(myresponse){
caseId.value = myresponse.CASEID;

}
});
}
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_cwid_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_cwid_init1 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value === null){
$.ajax({
 type: 'GET',
 url: "/bin/getLoggedUserId",
    dataType: 'json',
    success: function(response) {
      //gifModal.style.display = "block";
        var userValue = response.userId;
        userValue = 'mariana2';
     //  logUser.value = userValue;
      
	   $.ajax({
		 type: 'GET',
		 url: "/bin/getCitizenShipData",
			 data: {action: "CV_USER_DETAILS",userID:userValue},
			 dataType: 'json',
			success: function(response){
		  if (response.length >= 1) {
          
            // var state =  response[0].STATE;
			   State.value = response[0].STATE;
               City.value = response[0].CITY;
               Zip.value = response[0].POSTAL;
             CellPhone.value = response[0].CELL_PHONE;
               HomeTelephoneNumber.value = response[0].WORK_OTR_PHONE;
                
            } else {
                showErrorModal("Alert!", "No matching records found");
            }
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
    }
});
}

        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_firstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_firstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_lastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_lastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_StreetName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_StreetName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_HomeTelephoneNumber_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_HomeTelephoneNumber_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_City_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_City_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_State_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_State_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_Zip_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_Zip_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_CellPhone_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_CellPhone_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_Date_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value === null){
	  this.enabled = false;
      var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var date = (curyear + "-" + curyearMonth + "-" + curyearDay);
        this.value = date;
}
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_checkbox1653221038985_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_checkbox1653221038985_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            	
if(StageIndicator.value === null){
if(this.value == 1){
var userValue;
$.ajax({
type: 'GET',

url: "/bin/getLoggedInUserDetails",
dataType: 'json',
success: function(myresopnse) {
var userValue = myresopnse.userName;
Signature.value = firstName.value + " " + lastName.value;
SignDate.value = myresopnse.SERVER_DATE;
PrintStudentName.value = firstName.value + " " + lastName.value;  
//CWID_Certification.value = myresopnse.Student_Id;


},
error: function(error) {
alert("error block=" + error);
}
});

Signature.enabled = false;
SignDate.enabled = false;
PrintStudentName.enabled = false;
//CWID_Certification.enabled = false;

}else{
Signature.value = "";
SignDate.value = null;
PrintStudentName.value = "";
//CWID_Certification.value = "";
 
}
}
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_ipAddress_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_ipAddress_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_Signature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_Signature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = true;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_SignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_SignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_checkbox1641809485669_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_checkbox1641809485669_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            	
if(StageIndicator.value === "ToFinancialAid"){
if(this.value == 1){
var userValue;
$.ajax({
type: 'GET',

url: "/bin/getLoggedInUserDetails",
dataType: 'json',
success: function(myresopnse) {
var userValue = myresopnse.userName;
FinancialAidSign.value = userValue;
FinancialAidSignDate.value = myresopnse.SERVER_DATE;
financialAidAssignee.value = myresopnse.userId;


},
error: function(error) {
alert("error block=" + error);
}
});

FinancialAidSign.enabled = false;
  FinancialAidSignDate.enabled = false;
  financialAidAssignee.enabled = false;


}else{
FinancialAidSign.value = "";
FinancialAidSignDate.value = null;
    financialAidAssignee.value = "";
 
}
}
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_FinancialAidSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_FinancialAidSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_FinancialAidSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_FinancialAidSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_PrintStudentName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_PrintStudentName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_EmailSubject_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_EmailSubject_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_HiddenStudentEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_HiddenStudentEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_aftiaDescCWID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_aftiaDescCWID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_CWID_Certification_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_CWID_Certification_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_generateDOR_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_generateDOR_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible=false;
        }
	}
}
/**
 * @function summer_loan_request_summer_loan_request.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if (aidYear.value !== null) {
    getPdf();
}else{
  alert("Please fill all the required fields");
      showErrorModal("Alert!", "Please Select Aid Year");
   }

function getPdf() {
    console.log("in view pdf");
   
    window.guideBridge.getDataXML({
        success: function(result) {
           console.log("in view pdf="+result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/summer-loan-request/summer-loan-request');
            jsonData.append('fileName', firstName.value+"_"+lastName.value + "(" + cwid.value + ")" + "_" + Date.now());           
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
 * @function summer_loan_request_summer_loan_request.generated_submit1574920582933_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
summer_loan_request_summer_loan_request.generated_submit1574920582933_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(cwid.value !== null){
  aftiaDescCWID.value = firstName.value + lastName.value + " "+cwid.value;
  EmailSubject.value = "Test - Summer Loan Request - "+cwid.value;
}
//HiddenStudentEmail.value= "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
HiddenStudentEmail.value= "shreyas.manjunatha@thoughtfocus.com";

guideBridge.submit();
        }
	}
}
