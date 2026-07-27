/**
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_guideRootPanel_init0 = function (scope) {
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
                HiddenStudentUserID.value = response[0].USERID;
                cwid.value = studentCWID;
                cwid_2.value = studentCWID;
                studentIDNumber.value = studentCWID;
                HiddenStudentEmail.value = response[0].PREF_EMAIL;
                HiddenStudentName.value=response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                firstName.enabled = false;
                lastName.enabled = false;
                cwid.enabled = false;
                financialAidYear.enabled = false;
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
                    //aidYearPopup();
                    singleAidYear();
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
        var financialAidYearVal = "2022-2023";
        aidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1GSTG";
        formCodeVal = "F1GSTG";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };
  
    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = "2023-2024";
        aidYear.value = "2024";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0GSTG";
        formCodeVal = "F0GSTG";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };

}

function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";
    var formCodeVal = "";
   /*if (typeOfAidYear == '0') {
        financialAidYearVal = "2023-2024";
        aidYear.value = "2024";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0GSTG";
        formCodeVal = "F0GSTG";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else*/ if (typeOfAidYear == '1') {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1GSTG";
        formCodeVal = "F1GSTG";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1GSTG";
        formCodeVal = "F1GSTG";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }

    if (StageIndicator.value !== null) {
        aidYearValue = financialAidYear.value;
        getCDAFinancialAidYear(aidYearValue);
    }

}


if (StageIndicator.value !== null) {
    aidYearValue = financialAidYear.value;
    getCDAFinancialAidYear(aidYearValue);
}

function getCDAFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    //var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);
    var headingTextVal = "";
    var formTextVal = "";
    var section1Text = "";
    var fallText = "";
    var springText = "";
    var summerText = "";
    var certificationCB1Text = "";
  
    if (financialAidYear == "2023-2024") {
        headingTextVal = "<p><b>GOLDEN STATE TEACHER GRANT CERTIFICATION REQUEST FORM (".concat(financialAidYear).concat(")</b></p>");
        formTextVal = "<p><b>F0GSTG</b></p>";
        section1Text = "The Golden State Teacher Grant (GSTG) is state funding offered by the California Student Aid Commission (CSAC) for students enrolled in a credential program. The online GSTG CSAC application deadline is <b>March 31, 2024 and</b> must be submitted if you’re a new applicant for this program. Submit this form annually to have your GSTG eligibility reviewed by our campus.&nbsp;</p>";
        fallText = "Fall 2023";
        springText = "Spring 2024";
        summerText = "Summer 2024";
        certificationCB1Text = "I have filed a FAFSA or CA Dream Act application for the 2023-2024 award year at CSU, Fullerton.</p>";
    }
    if (financialAidYear == "2022-2023") {
        headingTextVal = "<p><b>GOLDEN STATE TEACHER GRANT CERTIFICATION REQUEST FORM (".concat(financialAidYear).concat(")</b></p>");
        formTextVal = "<p><b>F1GSTG</b></p>";
        section1Text = "The Golden State Teacher Grant (GSTG) is state funding offered by the California Student Aid Commission (CSAC) for students enrolled in a credential program. The online GSTG CSAC application deadline is <b>March 31, 2023 and</b> must be submitted if you’re a new applicant for this program. Submit this form annually to have your GSTG eligibility reviewed by our campus.&nbsp;</p>";
        fallText = "Fall 2022";
        springText = "Spring 2023";
        summerText = "Summer 2023";
        certificationCB1Text = "I have filed a FAFSA or CA Dream Act application for the 2022-2023 award year at CSU, Fullerton.</p>";
    }
  
    $("#GSTGFormCodeText").html(formTextVal);
    $("#GSTGHeadingText").html(headingTextVal);
    $("#GSTGSection1Text").html(section1Text);
    $("#GSTGFall").html(fallText);
    $("#GSTGSpring").html(springText);
    $("#GSTGSummer").html(summerText);
    $("#GSTGCertificationCB1").html(certificationCB1Text);
}

function checkforDuplicateSubmissions(formCodeVal) {
    var tableName = "AEM_GOLDEN_STATE_TEACHER_GRANT";
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
                financialAidYear: financialAidYear.value,
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
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    FinancialAidSignaturePanel.visible = false;
    FinancialAidSignaturePanel.enabled = false;
}

if (StageIndicator.value == "ToFinancialAid") {
    StudentInformation.visible = true;
    StudentInformation.enabled = false;
    Section1.visible = true;
    Section1.enabled = false;
    Section2.visible = true;
    Section2.enabled = false;
    Section3.visible = true;
    Section3.enabled = false;
    Section4.visible = true;
    Section4.enabled = false;
    StudentSignaturePanel.visible = true;
    StudentSignaturePanel.enabled = false;
    FinancialAidSignaturePanel.visible = true;
    FinancialAidSignaturePanel.enabled = true;
}
        }
	}
}
/**
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_guideRootPanel_init2 = function (scope) {
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
                HiddenStudentUserID.value = response[0].USERID;
                cwid.value = studentCWID;
                cwid_2.value = studentCWID;
                studentIDNumber.value = studentCWID;
                HiddenStudentEmail.value = response[0].PREF_EMAIL;
                HiddenStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                firstName.enabled = false;
                lastName.enabled = false;
                cwid.enabled = false;
                financialAidYear.enabled = false;
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
                    //aidYearPopup();
                    singleAidYear();
                } else {
                    //showErrorModal("Alert !", "No matching records found for the Aid Year");
                    singleAidYear();
                }
            } else {
                // showErrorModal("Alert !", "No matching records found");
                singleAidYear();
            }
        }
    });
}


function aidYearPopup() {

    var financialAidvalues = getAidYearValuesOnPopup();

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
        var financialAidYearVal = financialAidvalues.FinAidYearOne;
        aidYear.value = financialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FinAidYearFormCodeOne + "GSTG";
        formCodeVal = financialAidvalues.FinAidYearFormCodeOne + "GSTG";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = financialAidvalues.FinAidYearTwo;
        aidYear.value = financialAidvalues.AidYearTwo;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FinAidYearFormCodeTwo + "GSTG";
        formCodeVal = financialAidvalues.FinAidYearFormCodeTwo + "GSTG";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    };

}

function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";
    var formCodeVal = "";

    var financialAidvalues = getAidYearValuesOnSingleAidYearUpdated();
    if (typeOfAidYear == '0') {
        financialAidYearVal = financialAidvalues.FinAidYearZero;
        aidYear.value = financialAidvalues.AidYearZero;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0GSTG";
        formCodeVal = "F0GSTG";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = financialAidvalues.FinAidYearOne;
        aidYear.value = financialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1GSTG";
        formCodeVal = "F1GSTG";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else {
        financialAidYearVal = financialAidvalues.FinAidYearGeneral;
        aidYear.value = financialAidvalues.AidYearGeneral;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FormCodeGeneral + "GSTG";
        formCodeVal = financialAidvalues.FormCodeGeneral + "GSTG";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    }

    if (StageIndicator.value !== null) {
        aidYearValue = financialAidYear.value;
        getCDAFinancialAidYear(aidYearValue);
    }

}


if (StageIndicator.value !== null) {
    aidYearValue = financialAidYear.value;
    getCDAFinancialAidYear(aidYearValue);
}

function getCDAFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    var aidYearVal = aidYear.value;
    var aidYearVal2 = aidYear.value - 1;

    var headingTextVal = "<p><b>GOLDEN STATE TEACHER GRANT CERTIFICATION REQUEST FORM (".concat(financialAidYear).concat(")</b></p>");
    var formTextVal = "<p><b>" + formCode.value + "</b></p>";
    var section1Text = "";
    var fallText = "Fall ".concat(aidYearVal2).concat("");
    var springText = "Spring ".concat(aidYearVal).concat("");
    var summerText = "Summer ".concat(aidYearVal).concat("");
    var certificationCB1Text = "I have filed a FAFSA or CA Dream Act application for the ".concat(financialAidYear).concat(" award year at CSU, Fullerton.</p>");

    if (financialAidYear == "2024-2025") {
        section1Text = "The Golden State Teacher Grant (GSTG) is state funding offered by the California Student Aid Commission (CSAC) for students enrolled in a teaching credential program. The online GSTG CSAC application deadline is April 1, 2025, and must be submitted if you’re a new applicant for this program. Submit this form every new academic year to have your GSTG eligibility reviewed by our office, deadline <b>May 16, 2025</b>. Applications are processed after Census date (typically the fifth week of the semester); submissions after Census will be processed in 2-3 weeks. &nbsp;</p>";
      GSTG_2024.visible = false;
      GSTG_2025.visible = true;
    }
    if (financialAidYear == "2023-2024") {
        section1Text = "The Golden State Teacher Grant (GSTG) is state funding offered by the California Student Aid Commission (CSAC) for students enrolled in a credential program. The online GSTG CSAC application deadline is April 1, 2024, and must be submitted if you’re a new applicant for this program. Submit this form annually to have your GSTG eligibility reviewed by our office, deadline <b>May 17, 2024</b>. Applications are processed after Census date (typically the fifth week of the semester); submissions after Census will be processed in 2-3 weeks. &nbsp;</p>";
      GSTG_2024.visible = true;
      GSTG_2025.visible = false;
    }
    if (financialAidYear == "2022-2023") {
        section1Text = "The Golden State Teacher Grant (GSTG) is state funding offered by the California Student Aid Commission (CSAC) for students enrolled in a credential program. The online GSTG CSAC application deadline is <b>March 31, 2023 and</b> must be submitted if you’re a new applicant for this program. Submit this form annually to have your GSTG eligibility reviewed by our campus.&nbsp;</p>";
      GSTG_2024.visible = true;
      GSTG_2025.visible = false;
    }

    $("#GSTGFormCodeText").html(formTextVal);
    $("#GSTGHeadingText").html(headingTextVal);
    $("#GSTGSection1Text").html(section1Text);
    $("#GSTGFall").html(fallText);
    $("#GSTGSpring").html(springText);
    $("#GSTGSummer").html(summerText);
    $("#GSTGCertificationCB1").html(certificationCB1Text);
}

function checkforDuplicateSubmissions(formCodeVal, financialAidYearVal) {
    var tableName = "AEM_GOLDEN_STATE_TEACHER_GRANT";
    var financialAidDecisionColumnName = "FINANCIAL_AID_DECISION";
    var financialAidYearColumnName = "FINANCIAL_AID_YEAR";
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
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_caseId_init0 = function (scope) {
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
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_firstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_firstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_lastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_lastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_Date_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
    var dateString = new Date().toLocaleString("en-US", {
        timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
    }).replace(/[^ -~]/g, ' ');
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
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_Loan_RB1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_Loan_RB1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    Loan_RB2.value = null;
    Loan_RB3.value = null;
}
        }
	}
}
/**
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_Loan_RB2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_Loan_RB2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    Loan_RB1.value = null;
    Loan_RB3.value = null;
}
        }
	}
}
/**
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_Loan_RB3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_Loan_RB3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    Loan_RB1.value = null;
    Loan_RB2.value = null;
}
        }
	}
}
/**
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_checkbox1649834861348_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_checkbox1649834861348_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
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
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_ipAddress_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_ipAddress_init0 = function (scope) {
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
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_studentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_studentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_studentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_studentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_checkbox1649838422969_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_checkbox1649838422969_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToFinancialAid") {
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
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_staffSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_staffSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_staffSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_staffSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_formCode_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_formCode_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            formCode_2.value=this.value;
        }
	}
}
/**
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            getPdf();

function getPdf() {
    //console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, ' and'));
            jsonData.append('formPath', '/content/forms/af/golden-state-teacher-grant-certification-request-form/golden-state-teacher-grant-certification-request-form');
            jsonData.append('fileName', "(" + HiddenStudentName.value + ")" + "_" + Date.now());    
            //jsonData.append('fileName', "(" + Date.now() + ")");      
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
 * @function golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
golden_state_teacher_grant_certification_request_form_golden_state_teacher_grant_certification_request_form.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            var amount = 20000;
if (Section1CB.value === null) {
    showErrorModal("Alert !", "Please select the checkbox");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].Section1[0]");
} else if (NameCredential.value === null) {
    showErrorModal("Alert !", "Please enter the Name of Credential");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].Section2[0].NameCredential[0]");
} else if (ExpectedCompletion.value === null) {
    showErrorModal("Alert !", "Please enter the Expected Completion");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].Section2[0].ExpectedCompletion[0]");
} else if (Fall_CB.value === null && Spring_CB.value === null && Summer_CB.value === null) {
    showErrorModal("Alert !", "Please select your period of enrollment");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].Section2[0].Fall_CB[0]");
} else if (Loan_RB1.value === null && Loan_RB2.value === null && Loan_RB3.value === null) {
    showErrorModal("Alert !", "Please select ONE of the statements to indicate what action you would like to be taken with your loan(s)");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].Section3[0].LoanStatementSection[0]");
} /*else if (GSTGAmount.value > amount){
  showErrorModal("Alert !", "Please enter less than $20,000");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].Section3[0].GSTGAmount[0]");
}*/ else if (Certification_CB1.value === null || Certification_CB2.value === null || Certification_CB3.value === null || Certification_CB4.value === null) {
    showErrorModal("Alert !", "Please check all Instructions");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].Section4[0]");
} else {
    submitAction();
}

function submitAction() {
    aftiaDescCWID.value = firstName.value + " " + lastName.value + " " + cwid.value;
    EmailSubject.value = "Golden State Teacher Grant Certification Request Form - (" + cwid.value + ")";
    var testEmail = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
    HiddenStudentEmail.value = testEmail; 
    guideBridge.submit();
}
        }
	}
}
