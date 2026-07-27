/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_guideRootPanel_init0 = function (scope) {
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
          // var userValue = 'mariana2'; // two Aid Year
            //var userValue = 'majesticallexi'; // one Aid Year
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
        url: "/bin/getCitizenShipData",
        data: {
            action: "CV_USER_DETAILS",
            userID: userValue
        },
        dataType: 'json',
        success: function(response) {
            if (response.length >= 1) {
                var studentCWID = response[0].EMPLID;
                getStudentAidYearDetails(studentCWID);
                //var aidYearFlag = getStudentAidYearDetails(studentCWID);
                firstName.value = response[0].FIRST_NAME;
                lastName.value = response[0].LAST_NAME;
                PhoneNo.value = response[0].CELL_PHONE;
                HiddenStudentUserID.value = response[0].USERID;
                studentIDNumber.value = studentCWID;
                cwid.value = studentCWID;
                //HiddenStudentEmail.value = response[0].PREF_EMAIL;
                HiddenStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
            } else {
                showErrorModal("Alert!", "No matching records found");
            }
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}

function getStudentAidYearDetails(studentCWID) {
    $.ajax({
        type: 'GET',
        url: "/bin/getTaxFilingStatementDetails",
        data: {
            action: 'STUDENT_DETAILS',
            cwid: studentCWID
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
                            flag = "OneAidYear";
                        } else if ("SECOND_AID_YEAR" == key) {
                            identifyAidYearFlag = "TwoAidYear";
                            flag = "TwoAidYear";
                        }
                    }
                }
                var typeOfAidYear = getUrlParameters('aidYear');
                if (typeOfAidYear == "0") {
                    singleAidYear();
                } else if (typeOfAidYear == "1") {
                    singleAidYear();
                } else if (identifyAidYearFlag == "OneAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
                    singleAidYear();
                } else if (identifyAidYearFlag == "TwoAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
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
        AidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0BUSS";
        formCodeVal = "F0BUSS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = "2022-2023";
        AidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1BUSS";
        formCodeVal = "F1BUSS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    };
}

function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";
    var formCodeVal = "";
    if (typeOfAidYear == '0') {
        financialAidYearVal = "2021-2022";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0BUSS";
        formCodeVal = "F0BUSS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1BUSS";
        formCodeVal = "F1BUSS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else {
        financialAidYearVal = "2021-2022";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0BUSS";
        formCodeVal = "F0BUSS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    }

}

if (StageIndicator.value !== null) {
    aidYearValue = financialAidYear.value;
    getCDAFinancialAidYear(aidYearValue);
}

function getCDAFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    //var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);
    var taxFilingYear = aidYear.value;
    var headingTextVal = "<p><b>STUDENT BUSINESS SUPPLEMENT (".concat(financialAidYearVal).concat(")</b></p>");

    var formTextVal = "";
    var TextOne = "";
    
    if (financialAidYear == "2021-2022") {
        formTextVal = "<p><b>F0BUSS</b></p>";
        TextOne="<p><u><b>INSTRUCTIONS:</b></u>&nbsp;This form is required to provide additional business or farm information not shown on your 2019 IRSTaxTranscript.&nbsp;<i>Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>";
    }
    if (financialAidYear == "2022-2023") {
        formTextVal = "<p><b>F1BUSS</b></p>";
        TextOne="<p><u><b>INSTRUCTIONS:</b></u>&nbsp;This form is required to provide additional business or farm information not shown on your 2020 IRSTaxTranscript.&nbsp;<i>Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>";
    }

    $("#BUSSFormText").html(formTextVal);
    $("#BUSSHeadingText").html(headingTextVal);
    $("#BUSSInstructionsText").html(TextOne);
}

function checkforDuplicateSubmissions(formCodeVal, financialAidYearVal) {
    var tableName = "AEM_STUDENT_BUSS_SUPPLEMENT";
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
                    submit1575264176703.enabled = false;
                }

            },
        });
    }
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    FinancialAidSignaturePanel.visible = false;
}

if (StageIndicator.value == "ToFinancialAid") {
    StudentInformation.enabled = false;
    InstructionsPanel.enabled = false;
    SectionA_Panel.enabled = false;
    SectionB_Panel.enabled = false;
    StudentSignaturePanel.enabled = false;
    FinancialAidSignaturePanel.visible = true;
    FinancialAidSignaturePanel.enabled = true;
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_guideRootPanel_init2 = function (scope) {
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
            //var userValue = 'majesticallexi'; // one Aid Year
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
        url: "/bin/getCitizenShipData",
        data: {
            action: "CV_USER_DETAILS",
            userID: userValue
        },
        dataType: 'json',
        success: function(response) {
            if (response.length >= 1) {
                var studentCWID = response[0].EMPLID;
                getStudentAidYearDetails(studentCWID);
                //var aidYearFlag = getStudentAidYearDetails(studentCWID);
                firstName.value = response[0].FIRST_NAME;
                lastName.value = response[0].LAST_NAME;
                PhoneNo.value = response[0].CELL_PHONE;
                HiddenStudentUserID.value = response[0].USERID;
                studentIDNumber.value = studentCWID;
                cwid.value = studentCWID; 
              HiddenStudentEmail.value = "soumya.ravindra@thoughtfocus.com"; 
              //HiddenStudentEmail.value = "yjayaram@fullerton.edu";
                //HiddenStudentEmail.value = "anupama.dhar@thoughtfocus.com";
                //HiddenStudentEmail.value = response[0].PREF_EMAIL;
                HiddenStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
            } else {
                showErrorModal("Alert!", "No matching records found");
            }
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}

function getStudentAidYearDetails(studentCWID) {
    $.ajax({
        type: 'GET',
        url: "/bin/getTaxFilingStatementDetails",
        data: {
            action: 'STUDENT_DETAILS',
            cwid: studentCWID
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
                            flag = "OneAidYear";
                        } else if ("SECOND_AID_YEAR" == key) {
                            identifyAidYearFlag = "TwoAidYear";
                            flag = "TwoAidYear";
                        }
                    }
                }
                var typeOfAidYear = getUrlParameters('aidYear');
                if (typeOfAidYear == "0") {
                    singleAidYear();
                } else if (typeOfAidYear == "1") {
                    singleAidYear();
                } else if (identifyAidYearFlag == "OneAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
                    singleAidYear();
                } else if (identifyAidYearFlag == "TwoAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
                    singleAidYear(); 
                  //aidYearPopup();
                } else {
                    singleAidYear(); 
                  //showErrorModal("Alert !", "No matching records found for the Aid Year");
                }
            } else {
                singleAidYear(); 
                //showErrorModal("Alert !", "No matching records found");
            }
        }
    });
}


function aidYearPopup() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var formCodeVal = "";
  
   var financialAidvalues = getAidYearValuesOnPopup(); 
  
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
        var financialAidYearVal = financialAidvalues.FinAidYearOne;
        AidYear.value = financialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FinAidYearFormCodeOne+"BUSS";
        formCodeVal = financialAidvalues.FinAidYearFormCodeOne+"BUSS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = financialAidvalues.FinAidYearTwo;
        AidYear.value = financialAidvalues.AidYearTwo;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FinAidYearFormCodeTwo+"BUSS";
        formCodeVal = financialAidvalues.FinAidYearFormCodeTwo+"BUSS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    };
}

function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";
    var formCodeVal = "";
  
   var financialAidvalues = getAidYearValuesOnSingleAidYear();  
  
    if (typeOfAidYear == '0') {
        financialAidYearVal = financialAidvalues.FinAidYearZero;
        aidYear.value = financialAidvalues.AidYearZero;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0BUSS";
        formCodeVal = "F0BUSS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = financialAidvalues.FinAidYearOne;
        aidYear.value = financialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1BUSS";
        formCodeVal = "F1BUSS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else {
        financialAidYearVal = financialAidvalues.FinAidYearGeneral;
        aidYear.value = financialAidvalues.AidYearGeneral;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FormCodeGeneral+"BUSS";
        formCodeVal = financialAidvalues.FormCodeGeneral+"BUSS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    }

}

if (StageIndicator.value !== null) {
    aidYearValue = financialAidYear.value;
    getCDAFinancialAidYear(aidYearValue);
}

function getCDAFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    //var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);
    var taxFilingYear = aidYear.value;
    var headingTextVal = "<p><b>STUDENT BUSINESS SUPPLEMENT (".concat(financialAidYearVal).concat(")</b></p>");

    var formTextVal = "<p><b>"+formCode.value+"</b></p>";
   
     var TextOne="<p><u><b>INSTRUCTIONS:</b></u>&nbsp;This form is required to provide additional business or farm information not shown on your ".concat(taxFilingYear-3).concat("  IRS Tax Transcript.&nbsp;<i>Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>");
    
   

    $("#BUSSFormText").html(formTextVal);
    $("#BUSSHeadingText").html(headingTextVal);
    $("#BUSSInstructionsText").html(TextOne);
}

function checkforDuplicateSubmissions(formCodeVal, financialAidYearVal) {
    var tableName = "AEM_STUDENT_BUSS_SUPPLEMENT";
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
                    submit1575264176703.enabled = false;
                }

            },
        });
    }
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    $.ajax({

        type: 'GET',

        url: "/bin/getCaseID",

        dataType: 'json',

        success: function(myresponse) {

            caseId.value = myresponse.CASEID;

        },

    });
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_firstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_firstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_lastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_lastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Date_1_init0 = function (scope) {
    with(this) {
        with(scope) {
             this.enabled = false;
if(StageIndicator.value === null){
	 
      var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
 this.value = d;
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Date_1_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Date_1_init1 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if(StageIndicator.value === null){
	  this.enabled = false;

  Date_1.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_BusinessType_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_BusinessType_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value== 3) {
    Corporation_Type.enabled=true;
} else {
    Corporation_Type.enabled=false;
    Corporation_Type.value="";
}

        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Corporation_Type_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Corporation_Type_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_OwnershipPercentage_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_OwnershipPercentage_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value===null) {
  var val = this.value;
  if (val!==null){
    if(val.includes("%") === false){
      this.value = val+"%";
    }
  }
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_FamilyMembersPercentage_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_FamilyMembersPercentage_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value=="1") {
    FamilyMembersOwnershipPercentage.enabled=true;
    FamilyMembersOwnershipPercentage.mandatory=true;
} else {
    FamilyMembersOwnershipPercentage.enabled=false;
    FamilyMembersOwnershipPercentage.value="";
    FamilyMembersOwnershipPercentage.mandatory=false;
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_FamilyMembersOwnershipPercentage_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_FamilyMembersOwnershipPercentage_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_FamilyMembersOwnershipPercentage_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_FamilyMembersOwnershipPercentage_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value===null) {
  var val = this.value;
  if (val!==null){
    if(val.includes("%") === false){
      this.value = val+"%";
    }
  }
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Land_MarketValue_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Land_MarketValue_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var finalTotal = 0;
    var landMarketValue = Land_MarketValue.value;
    if (landMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(landMarketValue);
    }
    var buildingMarketValue = Building_MarketValue.value;
    if (buildingMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(buildingMarketValue);
    }
    var machineryMarketValue = Machinery_MarketValue.value;
    if (machineryMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(machineryMarketValue);
    }
    var equipmentMarketValue = Equipment_MarketValue.value;
    if (equipmentMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(equipmentMarketValue);
    }
    var inventoryMarketValue = Inventory_MarketValue.value;
    if (inventoryMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(inventoryMarketValue);
    }
    var liveStockMarketValue = Livestock_MarketValue.value;
    if (liveStockMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(liveStockMarketValue);
    }

    Total_MarketValue.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Land_Debt_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Land_Debt_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var finalTotal = 0;
    var landDebt = Land_Debt.value;
    if (landDebt !== null) {
        finalTotal = finalTotal + parseFloat(landDebt);
    }
    var buildingDebt = Building_Debt.value;
    if (buildingDebt !== null) {
        finalTotal = finalTotal + parseFloat(buildingDebt);
    }
    var machineryDebt = Machinery_Debt.value;
    if (machineryDebt !== null) {
        finalTotal = finalTotal + parseFloat(machineryDebt);
    }
    var equipmentDebt = Equipment_Debt.value;
    if (equipmentDebt !== null) {
        finalTotal = finalTotal + parseFloat(equipmentDebt);
    }
    var inventoryDebt = Inventory_Debt.value;
    if (inventoryDebt !== null) {
        finalTotal = finalTotal + parseFloat(inventoryDebt);
    }
    var liveStockDebt = Livestock_Debt.value;
    if (liveStockDebt !== null) {
        finalTotal = finalTotal + parseFloat(liveStockDebt);
    }

    Total_Debt.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Building_MarketValue_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Building_MarketValue_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var finalTotal = 0;
    var landMarketValue = Land_MarketValue.value;
    if (landMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(landMarketValue);
    }
    var buildingMarketValue = Building_MarketValue.value;
    if (buildingMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(buildingMarketValue);
    }
    var machineryMarketValue = Machinery_MarketValue.value;
    if (machineryMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(machineryMarketValue);
    }
    var equipmentMarketValue = Equipment_MarketValue.value;
    if (equipmentMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(equipmentMarketValue);
    }
    var inventoryMarketValue = Inventory_MarketValue.value;
    if (inventoryMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(inventoryMarketValue);
    }
    var liveStockMarketValue = Livestock_MarketValue.value;
    if (liveStockMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(liveStockMarketValue);
    }

    Total_MarketValue.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Building_Debt_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Building_Debt_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var finalTotal = 0;
    var landDebt = Land_Debt.value;
    if (landDebt !== null) {
        finalTotal = finalTotal + parseFloat(landDebt);
    }
    var buildingDebt = Building_Debt.value;
    if (buildingDebt !== null) {
        finalTotal = finalTotal + parseFloat(buildingDebt);
    }
    var machineryDebt = Machinery_Debt.value;
    if (machineryDebt !== null) {
        finalTotal = finalTotal + parseFloat(machineryDebt);
    }
    var equipmentDebt = Equipment_Debt.value;
    if (equipmentDebt !== null) {
        finalTotal = finalTotal + parseFloat(equipmentDebt);
    }
    var inventoryDebt = Inventory_Debt.value;
    if (inventoryDebt !== null) {
        finalTotal = finalTotal + parseFloat(inventoryDebt);
    }
    var liveStockDebt = Livestock_Debt.value;
    if (liveStockDebt !== null) {
        finalTotal = finalTotal + parseFloat(liveStockDebt);
    }

    Total_Debt.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Machinery_MarketValue_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Machinery_MarketValue_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var finalTotal = 0;
    var landMarketValue = Land_MarketValue.value;
    if (landMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(landMarketValue);
    }
    var buildingMarketValue = Building_MarketValue.value;
    if (buildingMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(buildingMarketValue);
    }
    var machineryMarketValue = Machinery_MarketValue.value;
    if (machineryMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(machineryMarketValue);
    }
    var equipmentMarketValue = Equipment_MarketValue.value;
    if (equipmentMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(equipmentMarketValue);
    }
    var inventoryMarketValue = Inventory_MarketValue.value;
    if (inventoryMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(inventoryMarketValue);
    }
    var liveStockMarketValue = Livestock_MarketValue.value;
    if (liveStockMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(liveStockMarketValue);
    }

    Total_MarketValue.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Machinery_Debt_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Machinery_Debt_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var finalTotal = 0;
    var landDebt = Land_Debt.value;
    if (landDebt !== null) {
        finalTotal = finalTotal + parseFloat(landDebt);
    }
    var buildingDebt = Building_Debt.value;
    if (buildingDebt !== null) {
        finalTotal = finalTotal + parseFloat(buildingDebt);
    }
    var machineryDebt = Machinery_Debt.value;
    if (machineryDebt !== null) {
        finalTotal = finalTotal + parseFloat(machineryDebt);
    }
    var equipmentDebt = Equipment_Debt.value;
    if (equipmentDebt !== null) {
        finalTotal = finalTotal + parseFloat(equipmentDebt);
    }
    var inventoryDebt = Inventory_Debt.value;
    if (inventoryDebt !== null) {
        finalTotal = finalTotal + parseFloat(inventoryDebt);
    }
    var liveStockDebt = Livestock_Debt.value;
    if (liveStockDebt !== null) {
        finalTotal = finalTotal + parseFloat(liveStockDebt);
    }

    Total_Debt.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Equipment_MarketValue_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Equipment_MarketValue_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var finalTotal = 0;
    var landMarketValue = Land_MarketValue.value;
    if (landMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(landMarketValue);
    }
    var buildingMarketValue = Building_MarketValue.value;
    if (buildingMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(buildingMarketValue);
    }
    var machineryMarketValue = Machinery_MarketValue.value;
    if (machineryMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(machineryMarketValue);
    }
    var equipmentMarketValue = Equipment_MarketValue.value;
    if (equipmentMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(equipmentMarketValue);
    }
    var inventoryMarketValue = Inventory_MarketValue.value;
    if (inventoryMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(inventoryMarketValue);
    }
    var liveStockMarketValue = Livestock_MarketValue.value;
    if (liveStockMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(liveStockMarketValue);
    }

    Total_MarketValue.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Equipment_Debt_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Equipment_Debt_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var finalTotal = 0;
    var landDebt = Land_Debt.value;
    if (landDebt !== null) {
        finalTotal = finalTotal + parseFloat(landDebt);
    }
    var buildingDebt = Building_Debt.value;
    if (buildingDebt !== null) {
        finalTotal = finalTotal + parseFloat(buildingDebt);
    }
    var machineryDebt = Machinery_Debt.value;
    if (machineryDebt !== null) {
        finalTotal = finalTotal + parseFloat(machineryDebt);
    }
    var equipmentDebt = Equipment_Debt.value;
    if (equipmentDebt !== null) {
        finalTotal = finalTotal + parseFloat(equipmentDebt);
    }
    var inventoryDebt = Inventory_Debt.value;
    if (inventoryDebt !== null) {
        finalTotal = finalTotal + parseFloat(inventoryDebt);
    }
    var liveStockDebt = Livestock_Debt.value;
    if (liveStockDebt !== null) {
        finalTotal = finalTotal + parseFloat(liveStockDebt);
    }

    Total_Debt.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Inventory_MarketValue_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Inventory_MarketValue_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var finalTotal = 0;
    var landMarketValue = Land_MarketValue.value;
    if (landMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(landMarketValue);
    }
    var buildingMarketValue = Building_MarketValue.value;
    if (buildingMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(buildingMarketValue);
    }
    var machineryMarketValue = Machinery_MarketValue.value;
    if (machineryMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(machineryMarketValue);
    }
    var equipmentMarketValue = Equipment_MarketValue.value;
    if (equipmentMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(equipmentMarketValue);
    }
    var inventoryMarketValue = Inventory_MarketValue.value;
    if (inventoryMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(inventoryMarketValue);
    }
    var liveStockMarketValue = Livestock_MarketValue.value;
    if (liveStockMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(liveStockMarketValue);
    }

    Total_MarketValue.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Inventory_Debt_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Inventory_Debt_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var finalTotal = 0;
    var landDebt = Land_Debt.value;
    if (landDebt !== null) {
        finalTotal = finalTotal + parseFloat(landDebt);
    }
    var buildingDebt = Building_Debt.value;
    if (buildingDebt !== null) {
        finalTotal = finalTotal + parseFloat(buildingDebt);
    }
    var machineryDebt = Machinery_Debt.value;
    if (machineryDebt !== null) {
        finalTotal = finalTotal + parseFloat(machineryDebt);
    }
    var equipmentDebt = Equipment_Debt.value;
    if (equipmentDebt !== null) {
        finalTotal = finalTotal + parseFloat(equipmentDebt);
    }
    var inventoryDebt = Inventory_Debt.value;
    if (inventoryDebt !== null) {
        finalTotal = finalTotal + parseFloat(inventoryDebt);
    }
    var liveStockDebt = Livestock_Debt.value;
    if (liveStockDebt !== null) {
        finalTotal = finalTotal + parseFloat(liveStockDebt);
    }

    Total_Debt.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Livestock_MarketValue_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Livestock_MarketValue_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var finalTotal = 0;
    var landMarketValue = Land_MarketValue.value;
    if (landMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(landMarketValue);
    }
    var buildingMarketValue = Building_MarketValue.value;
    if (buildingMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(buildingMarketValue);
    }
    var machineryMarketValue = Machinery_MarketValue.value;
    if (machineryMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(machineryMarketValue);
    }
    var equipmentMarketValue = Equipment_MarketValue.value;
    if (equipmentMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(equipmentMarketValue);
    }
    var inventoryMarketValue = Inventory_MarketValue.value;
    if (inventoryMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(inventoryMarketValue);
    }
    var liveStockMarketValue = Livestock_MarketValue.value;
    if (liveStockMarketValue !== null) {
        finalTotal = finalTotal + parseFloat(liveStockMarketValue);
    }

    Total_MarketValue.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Livestock_Debt_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Livestock_Debt_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var finalTotal = 0;
    var landDebt = Land_Debt.value;
    if (landDebt !== null) {
        finalTotal = finalTotal + parseFloat(landDebt);
    }
    var buildingDebt = Building_Debt.value;
    if (buildingDebt !== null) {
        finalTotal = finalTotal + parseFloat(buildingDebt);
    }
    var machineryDebt = Machinery_Debt.value;
    if (machineryDebt !== null) {
        finalTotal = finalTotal + parseFloat(machineryDebt);
    }
    var equipmentDebt = Equipment_Debt.value;
    if (equipmentDebt !== null) {
        finalTotal = finalTotal + parseFloat(equipmentDebt);
    }
    var inventoryDebt = Inventory_Debt.value;
    if (inventoryDebt !== null) {
        finalTotal = finalTotal + parseFloat(inventoryDebt);
    }
    var liveStockDebt = Livestock_Debt.value;
    if (liveStockDebt !== null) {
        finalTotal = finalTotal + parseFloat(liveStockDebt);
    }

    Total_Debt.value = finalTotal.toFixed(2);
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Total_MarketValue_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Total_MarketValue_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_Total_Debt_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_Total_Debt_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_checkbox1649834861348_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_checkbox1649834861348_valueCommit0 = function (scope) {
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
				studentSignature.value = HiddenStudentName.value;
				studentSignDate.value = myresponse.SERVER_DATE;			
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});
			
			studentSignature.enabled = false;       
			studentSignDate.enabled = false; 
				
	} else {
		studentSignature.value = "";
		studentSignDate.value = "";	   
	}
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_ipAddress_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_ipAddress_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {     		
  	$.getJSON("https://api.ipify.org?format=json", function(data) {                
        ipAddress.value = data.ip;        
    });
}
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_studentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_studentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_studentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_studentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_checkbox1649838422969_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_checkbox1649838422969_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToFinancialAid" ){
	if (this.value == 1) {
	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
				staffSignature.value = userValue;
				staffSignDate.value = myresponse.SERVER_DATE;		
                 financialAidAssignee.value = myresponse.userId;
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});
			
			staffSignature.enabled = false;       
			staffSignDate.enabled = false; 
				
	} else {
	     staffSignature.value = "";
		staffSignDate.value = "";
      financialAidAssignee.value = "";
	}
}


        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_staffSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_staffSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_staffSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_staffSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_business_supplement_form_student_business_supplement_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/student-business-supplement-form/student-business-supplement-form');
            jsonData.append('fileName', HiddenStudentName.value);          
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
 * @function student_business_supplement_form_student_business_supplement_form.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_business_supplement_form_student_business_supplement_form.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (checkbox1671624995983.value === null){
        checkbox1671624995983.mandatory = true;
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].InstructionsPanel[0].checkbox1671624995983[0]");
        showErrorModal("Alert!", "Please read the Instructions carefully & check the Checkbox below");
} else if (BusinessType.value === "3" && Corporation_Type.value === null) {
    showErrorModal("Alert!", "Please enter the Corporation Type");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SectionA_Panel[0].Corporation_Type[0]");
} else if (FamilyMembersPercentage.value === "1" && OwnershipPercentage.value === null) {
    showErrorModal("Alert!", "Please enter the Ownership percentage");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SectionA_Panel[0].FamilyMembersOwnershipPercentage[0]");
} else {
    submitAction();
}

function submitAction() {
if(StageIndicator.value === null){
  aftiaDescCWID.value = HiddenStudentName.value+" "+cwid.value;
  EmailSubject.value = "Test - Student Business Supplement Form - "+cwid.value;

}

 HiddenStudentEmail.value = "soumya.ravindra@thoughtfocus.com";
 guideBridge.submit();
}


        }
	}
}
