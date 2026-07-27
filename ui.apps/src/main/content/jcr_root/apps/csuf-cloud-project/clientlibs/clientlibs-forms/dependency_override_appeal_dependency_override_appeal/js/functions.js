/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    StudentSignPanel.enabled = true;
    StudentInformationPanel.enabled = true;
    FinancialAidSignPanel.visible = false;
    // IP Address
    $.getJSON("https://api.ipify.org?format=json", function(data) {
        ipAddress.value = data.ip;
    });
}


else if (StageIndicator.value === "ToFinancialAid") {
    StudentInformationPanel.enabled = false;
   if (formType.value == "CDA") {
    GuidancePanelCDA.visible = true;
    GuidancePanelCDA.enabled = false;
    GuidancePanelFAFSA.visible =false; 
   }
   if (formType.value == "FAFSA") {
    GuidancePanelFAFSA.visible = true;
    GuidancePanelFAFSA.enabled = false;
    GuidancePanelCDA.visible = false;
   }
    InstructionsPanel.visible = true;
    InstructionsPanel.enabled = false;
    StudentInformationPanel.visible = true;
    PersonalStatementPanel.visible = true;
    PersonalStatementPanel.enabled = false;
    StudentSignPanel.visible = true;
    StudentSignPanel.enabled = false;
    SupDocPanel.visible=false;
    SupDocPanel.enabled=false;
    FinancialAidSignPanel.enabled = true;
    FinancialAidSignPanel.visible = true;

}
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            var flag;

if (StageIndicator.value === null) {
    var typeOfForm = getUrlParameters('formType');
    if (typeOfForm == "CDA") {
        formType.value = "CDA";
        GuidancePanelCDA.visible = true;
        GuidancePanelFAFSA.visible = false;
        InstructionsPanel.visible = true;
        loggedInDetails();
    } else if (typeOfForm == "FAFSA") {
        formType.value = "FAFSA";
        GuidancePanelFAFSA.visible =true;
        InstructionsPanel.visible = true;
        GuidancePanelCDA.visible = false;
        loggedInDetails();
    } else {
        var modal = document.getElementById("secondModal");
        var span = document.getElementsByClassName("secondClose")[0];
        modal.style.display = "block";
        span.onclick = function() {
            if ((document.getElementById("secondButton1").checked === false) && (document.getElementById("secondButton2").checked === false)) {
                modal.style.display = "block";
                showErrorModal("Alert!", "Please select the form type");
            } else {
                modal.style.display = "none";
            }
        };
        document.getElementById("secondButton1").onclick = function() {
            modal.style.display = "none";
            formType.value = "CDA";
            GuidancePanelCDA.visible = true;
            InstructionsPanel.visible = true;
           GuidancePanelFAFSA.visible =false;
            loggedInDetails();
        };
        document.getElementById("secondButton2").onclick = function() {
            modal.style.display = "none";
            formType.value = "FAFSA";
            GuidancePanelFAFSA.visible = true;
            InstructionsPanel.visible = true;
           GuidancePanelCDA.visible = false;
            loggedInDetails();
        };
    }
}
   
  function loggedInDetails(){
  $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            // gifModal.style.display = "block";

               var userValue = response.userId;
            // var userValue = 'mariana2'; // two Aid Year
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
            action:"CV_USER_DETAILS",
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
                PrintStudentCWID.value = response[0].EMPLID;
                StudentCWID.value = response[0].EMPLID;
              /*  Street.value = response[0].ADDRESS1;
                State.value = response[0].STATE;
                City.value = response[0].CITY;
                ZipCode.value = response[0].POSTAL;
                TelephoneNumber.value = response[0].CELL_PHONE;*/
                //  studentIDNumber.value = response[0].student_ID;
                // HiddenStudentEmail.value = response[0].student_Email;
                HiddenStudentEmail.value = response[0].PREF_EMAIL;
                HiddenStudentName.value =  response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                //StudentCWID.value = response[0].student_ID;

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
                    aidYearPopup();
                } else {
                    showErrorModal("Alert !", "No matching records found for the Aid Year");
                }
            } else {
                showErrorModal("Alert !", "No matching records found");
            }
        }
    });
}
/* Aid Year Popup */

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

        if (formType.value == "CDA") {
            formCode.value = "F0CDOA";
            formCodeVal = "F0CDOA";
            getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal);
        } else if (formType.value == "FAFSA") {
            formCode.value = "F0DPOR";
            formCodeVal = "F0DPOR";
            getFAFSAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal);
        }

    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = "2022-2023";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "CDA") {
            formCode.value = "F1CDOA";
            formCodeVal = "F1CDOA";
            getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal);
        } else if (formType.value == "FAFSA") {
            formCode.value = "F1DPOR";
            formCodeVal = "F1DPOR";
            getFAFSAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal);
        }
    };
}


// Validation for aidYear=0 - 2021-2022 or aidYear=1 - 2022-2023

function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";
    var formCodeVal = "";

    if (formType.value == "CDA" && typeOfAidYear == '0') {
        financialAidYearVal = "2021-2022";
        aidYear.value = "2021";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0CDOA";
        formCodeVal = "F0CDOA";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (formType.value == "CDA" && typeOfAidYear == '1') {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1CDOA";
        formCodeVal = "F1CDOA";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (formType.value == "FAFSA" && typeOfAidYear == '0') {
        financialAidYearVal = "2021-2022";
        aidYear.value = "2021";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0DPOR";
        formCodeVal = "F0DPOR";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (formType.value == "FAFSA" && typeOfAidYear == '1') {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1DPOR";
        formCodeVal = "F1DPOR";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else {
        financialAidYearVal = "2021-2022";
        aidYear.value = "2021";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
       if (formType.value == "CDA"){
          formCode.value = "F0CDOA";
          formCodeVal = "F0CDOA";
          getCDAFinancialAidYear(aidYearValue);
          checkforDuplicateSubmissions(formCodeVal);
       } else if(formType.value == "FAFSA"){
         formCode.value = "F0DPOR";
         formCodeVal = "F0DPOR";
         getFAFSAFinancialAidYear(aidYearValue);
         checkforDuplicateSubmissions(formCodeVal);
       }
        
    }
}
    if (StageIndicator.value !== null) {
        aidYearValue = financialAidYear.value;
        if (formType.value == "CDA") {
        getCDAFinancialAidYear(aidYearValue);
    } else if (formType.value == "FAFSA") {
        getFAFSAFinancialAidYear(aidYearValue);
    }
}

/*function aidYearPopup() {
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
        formCode.value = "F0CDOA";
        formCodeVal = "F0CDOA";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);

    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = "2022-2023";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1CDOA";
        formCodeVal = "F1CDOA";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);

    };
}

if (StageIndicator.value !== null) {

    aidYearValue = financialAidYear.value;
    getCDAFinancialAidYear(aidYearValue);
}
*/

function getCDAFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    var taxFilingYear = aidYear.value;
   // var headingTextVal = "";
  
    var formCodeTextVal = "";
  if (formType.value == "CDA") {
        if (financialAidYear == "2021-2022") {
            formCodeTextVal = "<p><b>F0CDOA</b></p>";
        }
        if (financialAidYear == "2022-2023") {
            formCodeTextVal = "<p><b>F1CDOA</b></p>";
        }
    }
  
  if (formType.value == "FAFSA") {
        if (financialAidYear == "2021-2022") {
            formCodeTextVal = "<p><b>F0DPOR</b></p>";
        }
        if (financialAidYear == "2022-2023") {
            formCodeTextVal = "<p><b>F1DPOR</b></p>";
        }
    }

    var headingTextVal = "";
    if (financialAidYear == "2021-2022") {
        headingTextVal = "<p><b>DEPENDENCY OVERRIDE APPEAL (".concat(financialAidYearVal).concat(")<br>CA Dream Act Application</b></b></p>");
    }
    if (financialAidYear == "2022-2023") {
        headingTextVal = "<p><b>DEPENDENCY OVERRIDE APPEAL (".concat(financialAidYearVal).concat(")<br>CA Dream Act Application</b></b></p>");
    }
  
    var textOneVal = "<p>Log on to ".concat(" <a href=https://dream.csac.ca.gov/ target=_blank > https://dream.csac.ca.gov/ </a>").concat("  and complete the ").concat(financialAidYearVal).concat(" A Dream Act application by the priority filing deadline of March 2, ").concat(taxFilingYear).concat(" Be sure to answer all questions in the student sections ONLY. Skip Sections D and E, and go to Section F. Once you submit your Dream application without parental data, our office will receive your ").concat(financialAidYearVal).concat(" Dream application information from the California Student Aid Commission (CSAC) beginning April ").concat(taxFilingYear);

    var textTwoVal = " You must complete the ".concat(financialAidYearVal).concat(" CA Dream Act application <i><b>and</b></i> submit your appeal and all supporting documentation to the Office of Financial Aid by the March 2nd deadline. <i>We will accept appeals after March 2, ").concat(taxFilingYear).concat(" <i>however, we cannot guarantee availability of funds for students with a CA Dream Act application filed after the March 2nd priority deadline.</i>");



    $("#F0CDOAheadingText").html(headingTextVal);
    $("#F0CDOAFormCode").html(formCodeTextVal);
    $("#F0CDOATextOne").html(textOneVal);
    $("#F0CDOATextTwo").html(textTwoVal);

}

function getFAFSAFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    var taxFilingYear = aidYear.value;
    var formCodeTextVal = "";
    if (formType.value == "CDA") {
        if (financialAidYear == "2021-2022") {
            formCodeTextVal = "<p><b>F0CDOA</b></p>";
        }
        if (financialAidYear == "2022-2023") {
            formCodeTextVal = "<p><b>F1CDOA</b></p>";
        }
    }
    if (formType.value == "FAFSA") {
        if (financialAidYear == "2021-2022") {
            formCodeTextVal = "<p><b>F0DPOR</b></p>";
        }
        if (financialAidYear == "2022-2023") {
            formCodeTextVal = "<p><b>F1DPOR</b></p>";
        }
    }
    var headingTextVal = "";
    if (financialAidYear == "2021-2022") {
        headingTextVal = "<p><b>DEPENDENCY OVERRIDE APPEAL (".concat(financialAidYearVal).concat(")</p>");
    }
    if (financialAidYear == "2022-2023") {
        headingTextVal = "<p><b>DEPENDENCY OVERRIDE APPEAL (".concat(financialAidYearVal).concat(")</b></p>");
    }
  
  var textOneVal = "<p>Log on to ".concat(" <a href=http://www.fafsa.ed.gov/ target=_blank > www.fafsa.ed.gov </a>").concat(" and complete the ").concat(financialAidYearVal).concat(" FAFSA application by the priority filing deadline of March 2, ").concat(taxFilingYear).concat(" Be sure to answer all questions in the student sections ONLY. Be sure to answer all questions in the student sections ONLY and select the option, <i>“I have a special circumstance and I am unable to provide parental information.</i>” Our office will receive your ").concat(financialAidYearVal).concat(" FAFSA information from the Central Processing System (CPS) beginning April ").concat(taxFilingYear);

    var textTwoVal = " You must complete the ".concat(financialAidYearVal).concat(" FAFSA <i><b>and</b></i> submit your appeal and all supporting documentation to the Office of Financial Aid by the March 2nd deadline. <i>We will accept appeals after March 2, ").concat(taxFilingYear).concat(" <i>however, we cannot guarantee availability of funds for students with a CA Dream Act application filed after the March 2nd priority deadline.</i>");



    $("#F0CDOAheadingText").html(headingTextVal);
    $("#F0CDOAFormCode").html(formCodeTextVal);
    $("#F0CDOAOne").html(textOneVal);
    $("#F0CDOATwo").html(textTwoVal);
  
}


function checkforDuplicateSubmissions(formCodeVal){
var tableName = "AEM_DEP_OVERRIDE_APPEAL";
var financialAidDecisionColumnName = "FINANCIAL_AID_DECISION";
var formCodeColumnName = "FORM_CODE";
var faDecision = "1";
if (StageIndicator.value === null) {
	$.ajax({
		type: 'GET',
		url: "/bin/getCitizenShipData",
		data: {
			action: 'CV_DUPLICATE_CHECK_DETAILS',
			cwid: cwid.value,
          faDecisionColumnName:financialAidDecisionColumnName,
          tableName: tableName,
          formCodeColumnName:formCodeColumnName,
          formCode: formCodeVal,
          faDecision: faDecision
        },
		dataType: 'json',
		success: function(myresponse) {
          if(myresponse.length >=1){
                showErrorModal("Alert!", "Duplicate submissions are not allowed");
                submit1654576637940.enabled=false;            
          }

		},
	});
}
}
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var typeOfForm = getUrlParameters('formType');
    if (typeOfForm == "CDA") {
        formType.value = "CDA";
        GuidancePanelCDA.visible = true;
        GuidancePanelFAFSA.visible = false;
        InstructionsPanel.visible = true;
        loggedInDetails();
    } else if (typeOfForm == "FAFSA") {
        formType.value = "FAFSA";
        GuidancePanelFAFSA.visible = true;
        InstructionsPanel.visible = true;
        GuidancePanelCDA.visible = false;
        loggedInDetails();
    } else {
        var modal = document.getElementById("secondModal");
        var span = document.getElementsByClassName("secondClose")[0];
        modal.style.display = "block";
        span.onclick = function() {
            if ((document.getElementById("secondButton1").checked === false) && (document.getElementById("secondButton2").checked === false)) {
                modal.style.display = "block";
                showErrorModal("Alert!", "Please select the form type");
            } else {
                modal.style.display = "none";
            }
        };
        document.getElementById("secondButton1").onclick = function() {
            modal.style.display = "none";
            formType.value = "CDA";
            GuidancePanelCDA.visible = true;
            InstructionsPanel.visible = true;
            GuidancePanelFAFSA.visible = false;
            loggedInDetails();
        };
        document.getElementById("secondButton2").onclick = function() {
            modal.style.display = "none";
            formType.value = "FAFSA";
            GuidancePanelFAFSA.visible = true;
            InstructionsPanel.visible = true;
            GuidancePanelCDA.visible = false;
            loggedInDetails();
        };
    }
}

function loggedInDetails() {
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            // gifModal.style.display = "block";
            var userValue = response.userId;
            // var userValue = 'mariana2'; // two Aid Year
            // var userValue = 'majesticallexi'; // one Aid Year
            // var userValue = 'mchoi88';			 	// no Aid Year
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
                PrintStudentCWID.value = response[0].EMPLID;
                StudentCWID.value = response[0].EMPLID;
                /*Street.value = response[0].ADDRESS1;
                  State.value = response[0].STATE;
                  City.value = response[0].CITY;
                  ZipCode.value = response[0].POSTAL;
                  TelephoneNumber.value = response[0].CELL_PHONE;
                  studentIDNumber.value = response[0].student_ID;
                  HiddenStudentEmail.value = response[0].student_Email;*/
                //HiddenStudentEmail.value = response[0].PREF_EMAIL;
               HiddenStudentEmail.value = "soumya.ravindra@thoughtfocus.com";
                HiddenStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                //StudentCWID.value = response[0].student_ID;
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
                    //aidYearPopup();
                    singleAidYear();
                } else {
                    //showErrorModal("Alert !", "No matching records found for the Aid Year");
                    singleAidYear();
                }
            } else {
                //showErrorModal("Alert !", "No matching records found");
                singleAidYear();
            }
        }
    });
}

function aidYearPopup() {
    var financialAidPopupValues = getAidYearValuesOnPopup();
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
        var prefixVal = financialAidPopupValues.FinAidYearFormCodeOne;
        var financialAidYearVal = financialAidPopupValues.FinAidYearOne;
        aidYear.value = financialAidPopupValues.AidYearOne - 1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "CDA") {
            formCode.value = prefixVal + "CDOA";
            formCodeVal = prefixVal + "CDOA";
        } else if (formType.value == "FAFSA") {
            formCode.value = prefixVal + "DPOR";
            formCodeVal = prefixVal + "DPOR";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);

    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var prefixVal = financialAidPopupValues.FinAidYearFormCodeTwo;
        var financialAidYearVal = financialAidPopupValues.FinAidYearTwo;
        aidYear.value = financialAidPopupValues.AidYearTwo - 1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "CDA") {
            formCode.value = prefixVal + "CDOA";
            formCodeVal = prefixVal + "CDOA";
        } else if (formType.value == "FAFSA") {
            formCode.value = prefixVal + "DPOR";
            formCodeVal = prefixVal + "DPOR";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    };
}

function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";
    var formCodeVal = "";
    //var singleFinancialAidvalues = getAidYearValuesOnSingleAidYear();
    var singleFinancialAidvalues = getAidYearValuesOnSingleAidYearUpdated();
    if (typeOfAidYear == '0') {
        financialAidYearVal = singleFinancialAidvalues.FinAidYearZero;
        aidYear.value = singleFinancialAidvalues.AidYearZero - 1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "CDA") {
            formCode.value = "F0CDOA";
            formCodeVal = "F0CDOA";
        }
        if (formType.value == "FAFSA") {
            formCode.value = "F0DPOR";
            formCodeVal = "F0DPOR";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = singleFinancialAidvalues.FinAidYearOne;
        aidYear.value = singleFinancialAidvalues.AidYearOne - 1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "CDA") {
            formCode.value = "F1CDOA";
            formCodeVal = "F1CDOA";
        }
        if (formType.value == "FAFSA") {
            formCode.value = "F1DPOR";
            formCodeVal = "F1DPOR";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else {
        financialAidYearVal = singleFinancialAidvalues.FinAidYearGeneral;
        aidYear.value = singleFinancialAidvalues.AidYearGeneral - 1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        var formCodePrefix = singleFinancialAidvalues.FormCodeGeneral;
        if (formType.value == "CDA") {
            formCode.value = formCodePrefix + "CDOA";
            formCodeVal = formCodePrefix + "CDOA";
        }
        if (formType.value == "FAFSA") {
            formCode.value = formCodePrefix + "DPOR";
            formCodeVal = formCodePrefix + "DPOR";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    }
}

if (StageIndicator.value !== null) {
    aidYearValue = financialAidYear.value;
    textChanger(aidYearValue);
}

function textChanger(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    var taxFilingYear = aidYear.value;
    var headingTextVal = "";
    var textOneVal = "";
    var textTwoVal = "";
    var textAppealVal = "";
    var textAppealTextFourVal = "";

    var formCodeTextVal = "<p><b>" + formCode.value + "</b></p>";
  
    if (formType.value == "CDA") {
      
        headingTextVal = "<p><b>DEPENDENCY OVERRIDE APPEAL (".concat(financialAidYearVal).concat(")<br>CA Dream Act Application</b></p>");
      
        if (aidYear.value == '2024') {
          
            textOneVal = "<p>Log on to ".concat(" <a href=https://dream.csac.ca.gov/ target=_blank > https://dream.csac.ca.gov/ </a>").concat("  and complete the ").concat(financialAidYearVal).concat(" CA Dream Act application by the priority filing deadline of May 2, ").concat(taxFilingYear).concat(" Be sure to answer all questions in the student sections ONLY. Skip Sections D and E, and go to Section F. Once you submit your Dream application without parental data, our office will receive your ").concat(financialAidYearVal).concat(" Dream application information from the California Student Aid Commission (CSAC).");

            textTwoVal = " You must complete the ".concat(financialAidYearVal).concat(" CADAA and submit your appeal and all supporting documentation to the Office of Financial Aid by the May 2nd deadline. <i>We will accept appeals after May 2, ").concat(taxFilingYear).concat(" <i>however, we cannot guarantee availability of funds for students with a CADAA filed after the May 2nd priority deadline.</i>");

            textAppealVal = "<p><b>APPEAL PROCESSING</b><br>The Office of Financial Aid Appeals Committee will review your appeal and documentation. We will notify&nbsp;you of our decision within 4 to 6 weeks of the date you submit your appeal. All decisions on dependency overrides are made based on professional judgment by the Office of Financial Aid at CSU Fullerton.</p>";
          
            textAppealTextFourVal = "<ul><li>Parents refuse to provide information on the Dream application or for verification</li><li>Parents do not claim student as a dependent for income tax purposes</li><li>Parents unwilling or unable to contribute to student’s education</li><li>Student reluctant to request the income information from parents</li><li>Student does not wish to communicate with parents</li><li>Student is self-supporting</li></ul>";

        } else {
          
            textOneVal = "<p>Log on to ".concat(" <a href=https://dream.csac.ca.gov/ target=_blank > https://dream.csac.ca.gov/ </a>").concat("  and complete the ").concat(financialAidYearVal).concat(" CA Dream Act application by the priority filing deadline of March 2, ").concat(taxFilingYear).concat(" Be sure to answer all questions in the student sections ONLY. Skip Sections D and E, and go to Section F. Once you submit your Dream application without parental data, our office will receive your ").concat(financialAidYearVal).concat(" Dream application information from the California Student Aid Commission (CSAC) beginning April ").concat(taxFilingYear);

            textTwoVal = " You must complete the ".concat(financialAidYearVal).concat(" CA Dream Act application <i><b>and</b></i> submit your appeal and all supporting documentation to the Office of Financial Aid by the March 2nd deadline. <i>We will accept appeals after March 2, ").concat(taxFilingYear).concat(" <i>however, we cannot guarantee availability of funds for students with a CA Dream Act application filed after the March 2nd priority deadline.</i>");

            textAppealVal = "<p><b>APPEAL PROCESSING</b><br>The Office of Financial Aid Appeals Committee will review your appeal and documentation. We will notify&nbsp;you of our decision within 4 to 6 weeks of the date you submit your appeal. All decisions on dependency overrides are made based on professional judgment by the Office of Financial Aid at CSU Fullerton.&nbsp;Decisions made at other institutions are not accepted.</p>";
          
            textAppealTextFourVal = "<ul><li>Parents refuse to provide information on the Dream application or for verification</li><li>Parents do not claim student as a dependent for income tax purposes</li><li>Parents unwilling or unable to contribute to student’s education</li><li>Student reluctant to request the income information from parents</li><li>Student does not wish to communicate with parents</li></ul>";
          
        }

        $("#F0CDOATextOne").html(textOneVal);
        $("#F0CDOATextTwo").html(textTwoVal);
        $("#F0CDOAThree").html(textAppealVal);
        $("#F0CDOAFour").html(textAppealTextFourVal);
    } 
  else {
    
        headingTextVal = "<p><b>DEPENDENCY OVERRIDE APPEAL (".concat(financialAidYearVal).concat(")</b></p>");

        if (aidYear.value == '2024') {
          
            textOneVal = "<p>Log on to ".concat(" <a href=http://www.studentaid.gov/ target=_blank > www.studentaid.gov </a>").concat(" and complete the ").concat(financialAidYearVal).concat(" FAFSA application by the priority filing deadline of May 2, ").concat(taxFilingYear).concat(" Be sure to answer all questions in the student sections ONLY. Be sure to answer all questions in the student sections ONLY and select the option, <i>“I have a special circumstance and I am unable to provide parental information.</i>” If appeal was approved at another school in year prior, you can attach the same documentation reviewed at that prior school.");
          
            textTwoVal = " You must complete the ".concat(financialAidYearVal).concat(" FAFSA <i><b>and</b></i> submit your appeal and all supporting documentation to the Office of Financial Aid by the May 2nd deadline. <i>We will accept appeals after May 2, ").concat(taxFilingYear).concat(" <i>however, we cannot guarantee availability of funds for students with a FAFSA filed after the March 2nd priority deadline.</i>");
          
            textAppealVal = "<p><b>APPEAL PROCESSING</b><br>The Office of Financial Aid Appeals Committee will review your appeal and documentation. We will notify you of our decision within 4 weeks of the date you submit your appeal. All decisions on dependency overrides are made based on professional judgment by the Office of Financial Aid at CSU Fullerton.</p>";
          
            textAppealTextFourVal = "<ul><li>Parents refuse to provide information on the FAFSA application or for verification</li><li>Parents do not claim student as a dependent for income tax purposes</li><li>Parents unwilling or unable to contribute to student’s education</li><li>Student reluctant to request the income information from parents</li><li>Student does not wish to communicate with parents</li><li>Student is self-supporting</li></ul>";
          
        } 
    else {
            textOneVal = "<p>Log on to ".concat(" <a href=http://www.fafsa.ed.gov/ target=_blank > www.fafsa.ed.gov </a>").concat(" and complete the ").concat(financialAidYearVal).concat(" FAFSA application by the priority filing deadline of March 2, ").concat(taxFilingYear).concat(" Be sure to answer all questions in the student sections ONLY. Be sure to answer all questions in the student sections ONLY and select the option, <i>“I have a special circumstance and I am unable to provide parental information.</i>” Our office will receive your ").concat(financialAidYearVal).concat(" FAFSA information from the Central Processing System (CPS) beginning April ").concat(taxFilingYear);
      
            textTwoVal = " You must complete the ".concat(financialAidYearVal).concat(" FAFSA <i><b>and</b></i> submit your appeal and all supporting documentation to the Office of Financial Aid by the March 2nd deadline. <i>We will accept appeals after March 2, ").concat(taxFilingYear).concat(" <i>however, we cannot guarantee availability of funds for students with a FAFSA filed after the March 2nd priority deadline.</i>");
      
            textAppealVal = "<p><b>APPEAL PROCESSING</b><br>The Office of Financial Aid Appeals Committee will review your appeal and documentation. We will notify you of our decision within 4 weeks of the date you submit your appeal. All decisions on dependency overrides are made based on professional judgment by the Office of Financial Aid at CSU Fullerton.&nbsp;Decisions made at other institutions are not accepted.</p>";
      
            textAppealTextFourVal = "<ul><li>Parents refuse to provide information on the FAFSA application or for verification</li><li>Parents do not claim student as a dependent for income tax purposes</li><li>Parents unwilling or unable to contribute to student’s education</li><li>Student reluctant to request the income information from parents</li><li>Student does not wish to communicate with parents</li></ul>";
      
        }

        $("#F0CDOAOne").html(textOneVal);
        $("#F0CDOATwo").html(textTwoVal);
        $("#F0CDOAThree").html(textAppealVal);
        $("#F0CDOAFour").html(textAppealTextFourVal);
    }


    $("#F0CDOAheadingText").html(headingTextVal);
    $("#F0CDOAFormCode").html(formCodeTextVal);

}

function checkforDuplicateSubmissions(formCodeVal, financialAidYearVal) {
    var tableName = "AEM_DEP_OVERRIDE_APPEAL";
    var financialAidDecisionColumnName = "FINANCIAL_AID_DECISION";
    var financialAidYearColumnName = "FINANCIAL_AID_YEAR";
    var formCodeColumnName = "FORM_CODE";
    var faDecision = "1";
    if (StageIndicator.value === null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getCitizenShipData",
            data: {
                action: 'CV_UPDATED_DUPLICATE_CHECK',
                cwid: cwid.value,
                faDecisionColumnName: financialAidDecisionColumnName,
                tableName: tableName,
                formCodeColumnName: formCodeColumnName,
                formCode: formCodeVal,
                faDecision: faDecision,
                financialAidYear: financialAidYearVal,
                financialAidYearColumn: financialAidYearColumnName
            },
            dataType: 'json',
            success: function(myresponse) {
                if (myresponse.length >= 1) {
                    showErrorModal("Alert!", "Duplicate submissions are not allowed");
                    submit1654576637940.enabled = false;
                }

            },
        });
    }
}
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_caseId_init0 = function (scope) {
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
 * @function dependency_override_appeal_dependency_override_appeal.generated_caseId_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_caseId_init1 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_cwid_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_cwid_valueCommit0 = function (scope) {
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
               ZipCode.value = response[0].POSTAL;
               TelephoneNumber.value = response[0].WORK_OTR_PHONE;
                
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
 * @function dependency_override_appeal_dependency_override_appeal.generated_firstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_firstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_lastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_lastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_Date_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value === null){
	  this.enabled = false;
      var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, ' ');
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
 * @function dependency_override_appeal_dependency_override_appeal.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_Step1CB1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_Step1CB1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value!==null){
PersonalStatementA.mandatory=true;
PersonalStatementA.enabled=true;
} else{
  PersonalStatementA.mandatory=false;
  PersonalStatementA.value=null;
  PersonalStatementA.enabled=false;
}
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_Step1CB2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_Step1CB2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value!==null){
PersonalStatementB.mandatory=true;
PersonalStatementB.enabled=true;
} else{
  PersonalStatementB.mandatory=false;
  PersonalStatementB.value=null;
  PersonalStatementB.enabled=false;
}
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_Step1CB3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_Step1CB3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value!==null){
DATE1.mandatory=true;
EVENT1.mandatory=true;
  
DATE1.enabled=true;
EVENT1.enabled=true;
DATE2.enabled=true;
EVENT2.enabled=true;
DATE3.enabled=true;
EVENT3.enabled=true;
DATE4.enabled=true;
EVENT4.enabled=true;
DATE5.enabled=true;
EVENT5.enabled=true;
} else {
  DATE1.mandatory=false;
  EVENT1.mandatory=false;  
  DATE1.value=null;
  EVENT1.value=null;
  
DATE1.enabled=false;
EVENT1.enabled=false;
DATE2.enabled=false;
EVENT2.enabled=false;
DATE3.enabled=false;
EVENT3.enabled=false;
DATE4.enabled=false;
EVENT4.enabled=false;
DATE5.enabled=false;
EVENT5.enabled=false;
}
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_Step1CB4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_Step1CB4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value!==null){
  StatementDMonth.mandatory=true;
  StatementDYear.mandatory=true;
  ParentName.mandatory=true;
  Street.mandatory=true;
  City.mandatory=true;
  State.mandatory=true;
  ZipCode.mandatory=true;
  TelephoneNumber.mandatory=true;
  CircumstanceOfParent.mandatory=true;
  
  StatementDMonth.enabled=true;
  StatementDYear.enabled=true;
  ParentName.enabled=true;
  Street.enabled=true;
  City.enabled=true;
  State.enabled=true;
  ZipCode.enabled=true;
  TelephoneNumber.enabled=true;
  CircumstanceOfParent.enabled=true;
} else{
  StatementDMonth.mandatory=false;
  StatementDMonth.value=null;
  StatementDYear.mandatory=false;
  StatementDYear.value=null;
  ParentName.mandatory=false;
  ParentName.value=null;
  Street.mandatory=false;
  Street.value=null;
  City.mandatory=false;
  City.value=null;
  State.mandatory=false;
  State.value=null;
  ZipCode.mandatory=false;
  ZipCode.value=null;
  TelephoneNumber.mandatory=false;
  TelephoneNumber.value=null;
  CircumstanceOfParent.mandatory=false;
  CircumstanceOfParent.value=null;
  
  StatementDMonth.enabled=false;
  StatementDYear.enabled=false;
  ParentName.enabled=false;
  Street.enabled=false;
  City.enabled=false;
  State.enabled=false;
  ZipCode.enabled=false;
  TelephoneNumber.enabled=false;
  CircumstanceOfParent.enabled=false;
}
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_PersonalStatementA_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_PersonalStatementA_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_PersonalStatementB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_PersonalStatementB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_DATE1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_DATE1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_EVENT1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_EVENT1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_DATE2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_DATE2_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_EVENT2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_EVENT2_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_DATE3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_DATE3_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_EVENT3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_EVENT3_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_DATE4_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_DATE4_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_EVENT4_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_EVENT4_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_DATE5_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_DATE5_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_EVENT5_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_EVENT5_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_StatementDMonth_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_StatementDMonth_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_StatementDYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_StatementDYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_ParentName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_ParentName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_Street_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_Street_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_City_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_City_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_State_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_State_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_ZipCode_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_ZipCode_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_TelephoneNumber_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_TelephoneNumber_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_CircumstanceOfParent_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_CircumstanceOfParent_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_SupDocPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_SupDocPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_supportDoc1_valueCommit0 = function (scope) {
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
 * @function dependency_override_appeal_dependency_override_appeal.generated_supportDoc1_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_supportDoc1_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc1.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	  
	
	var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;

	if(format.test(supportDoc1.fileAttachment.value) === true){
		var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
		supportDoc1.fileAttachment.value = doc2NewName;

	}
  if(extension !== "pdf"){
	 
       supportDoc1.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_supportDoc2_valueCommit0 = function (scope) {
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
 * @function dependency_override_appeal_dependency_override_appeal.generated_supportDoc2_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_supportDoc2_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc2.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	  
	
	var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;

	if(format.test(supportDoc2.fileAttachment.value) === true){
		var doc2NewName = supportDoc2.fileAttachment.value.replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
		supportDoc2.fileAttachment.value = doc2NewName;

	}
  if(extension !== "pdf"){
	 
       supportDoc2.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_supportDoc3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc3.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	
	var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;

	if(format.test(supportDoc3.fileAttachment.value) === true){
		var doc2NewName = supportDoc3.fileAttachment.value.replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
		supportDoc3.fileAttachment.value = doc2NewName;

	}
    
	if(extension !== "pdf"){
	 
       supportDoc3.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_ApplicantComments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_ApplicantComments_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_StudentCB_valueCommit0 = function (scope) {
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
StudentSignature.value = firstName.value + " " + lastName.value;
DATE.value = myresopnse.SERVER_DATE;
PrintStudentsName.value = firstName.value + " " + lastName.value;  
//CWID_Certification.value = myresopnse.Student_Id;


},
error: function(error) {
alert("error block=" + error);
}
});

StudentSignature.enabled = false;
DATE.enabled = false;
PrintStudentsName.enabled = false;
//CWID_Certification.enabled = false;

}else{
StudentSignature.value = "";
DATE.value = null;
PrintStudentsName.value = "";
//CWID_Certification.value = "";
 
}
}




        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_ipAddress_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_ipAddress_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_DATE_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_DATE_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_checkbox1641809485669_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_checkbox1641809485669_valueCommit0 = function (scope) {
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
 * @function dependency_override_appeal_dependency_override_appeal.generated_FinancialAidSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_FinancialAidSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_HiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_HiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_generateDOR_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_generateDOR_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible=false;
        }
	}
}
/**
 * @function dependency_override_appeal_dependency_override_appeal.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/dependency-override-appeal/dependency-override-appeal');
            jsonData.append('fileName', firstName.value+"_"+lastName.value + "(" + cwid.value + ")");           
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
 * @function dependency_override_appeal_dependency_override_appeal.generated_submit1654576637940_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dependency_override_appeal_dependency_override_appeal.generated_submit1654576637940_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if (formType.value=="CDA" && (Instruction1.value === null || Instruction2.value === null || Instruction3.value === null)){
  	showErrorModal("Alert !", "Please check all the instructions");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanels[0].GuidancePanelCDA[0]");
 } else if (formType.value=="FAFSA" && (FAFSAInstruction1.value === null || FAFSAInstruction2.value === null || FAFSAInstruction3.value === null)){
  	showErrorModal("Alert !", "Please check all the instructions");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanels[0].GuidancePanelFAFSA[0]");
 } else if(Step1CB1.value === null && Step1CB2.value === null && Step1CB3.value === null && Step1CB4.value === null){
		showErrorModal("Alert !", "Please enter the Step 1");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanels[0].InstructionsPanel[0]");
} else if(Step2CB1.value === null && Step2CB2.value === null && Step2CB3.value === null){
		showErrorModal("Alert !", "Please enter the Step 2");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanels[0].InstructionsPanel[0]");
}
else{
  	submitAction();
}


function submitAction(){
  aftiaDescCWID.value = HiddenStudentName.value + " " + cwid.value;
  EmailSubject.value = "Dependency Override Appeal Form - " + cwid.value;
  HiddenStudentEmail.value = "soumya.ravindra@thoughtfocus.com";

guideBridge.submit();
}
        }
	}
}
