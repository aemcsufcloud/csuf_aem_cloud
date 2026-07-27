/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    FinancialAidSignaturePanel.visible = false;
}
if (StageIndicator.value == "ToFinancialAid") {
    StudentInformation.enabled = false;
    InstructionsCB.enabled = false;
    Declaration.enabled = false;
    StudentSignaturePanel.enabled = false;
    FinancialAidSignaturePanel.visible = true;
}
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            var flag;
if (StageIndicator.value === null) {
    var studentFormURL = window.location.search;
    var urlParams = new URLSearchParams(studentFormURL);
    var typeOfForm;
    var formCodeTextVal;
    var aidYearValue;

    if (urlParams.has('formType')) {
        typeOfForm = urlParams.get('formType');
    }
    if (typeOfForm == "CDA") {
        formType.value = "CDA";
        loggedInDetails();
    } else if (typeOfForm == "FAFSA") {
        formType.value = "FAFSA";
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
            loggedInDetails();
        };
        document.getElementById("secondButton2").onclick = function() {
            modal.style.display = "none";
            formType.value = "FAFSA";
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
            var userValue = response.userId;
            // var userValue = 'mariana2'; // two Aid Year
            // var userValue = 'majesticallexi'; // one Aid Year
            //var userValue = 'mchoi88';			 	// no Aid Year
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
                var firstNameVal = response[0].FIRST_NAME;
                var lastNameVal = response[0].LAST_NAME;
                firstName.value = firstNameVal;
                lastName.value = lastNameVal;
                StudentUserId.value = response[0].USERID;
                SCwid.value = studentCWID;
                cwid.value = studentCWID;
                StudentEmailId.value = response[0].PREF_EMAIL;
                StudentName.value = firstNameVal + " " + lastNameVal;
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
        var formCodeVal = "";
        var financialAidYearVal = "2021-2022";
        AidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "FAFSA") {
            formCode.value = "F0HOME";
            formCodeVal = "F0HOME";
        }
        if (formType.value == "CDA") {
            formCode.value = "F0CHOM";
            formCodeVal = "F0CHOM";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var formCodeVal = "";
        var financialAidYearVal = "2022-2023";
        AidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "FAFSA") {
            formCode.value = "F1HOME";
            formCodeVal = "F1HOME";
        }
        if (formType.value == "CDA") {
            formCode.value = "F1CHOM";
            formCodeVal = "F1CHOM";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };
}

function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var formCodeVal = "";
    var financialAidYearVal = "";
    if (typeOfAidYear == '0') {
        financialAidYearVal = "2021-2022";
        AidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "FAFSA") {
            formCode.value = "F0HOME";
            formCodeVal = "F0HOME";
        }
        if (formType.value == "CDA") {
            formCode.value = "F0CHOM";
            formCodeVal = "F0CHOM";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = "2022-2023";
        AidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "FAFSA") {
            formCode.value = "F1HOME";
            formCodeVal = "F1HOME";
        }
        if (formType.value == "CDA") {
            formCode.value = "F1CHOM";
            formCodeVal = "F1CHOM";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else {
        financialAidYearVal = "2021-2022";
        AidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "FAFSA") {
            formCode.value = "F0HOME";
            formCodeVal = "F0HOME";
        }
        if (formType.value == "CDA") {
            formCode.value = "F0CHOM";
            formCodeVal = "F0CHOM";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }
}

if (StageIndicator.value !== null) {
    aidYearValue = financialAidYear.value;
    textChanger(aidYearValue);
}

function textChanger(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    //var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);
    var taxFilingYear = AidYear.value;
    var formtypeVal = "";
    var headingTextVal = "";
    var instructionsHeaderTextVal = "";
    var instructionsTextVal = "";
    var checkboxOneTextVal = "";
    var checkboxTwoTextVal = "";
    var checkboxThreeTextVal = "";
    var nexTab = " ".concat("target=").concat("_blank");

    if (formCode.value == "F0HOME") {
        formtypeVal = "<p><b>F0HOME</b></p>";
        headingTextVal = "<p><b>UNACCOMPANIED HOMELESS YOUTH VERIFICATION - HOME (".concat(financialAidYear).concat(")</b></p>");
        instructionsHeaderTextVal = "<p>You indicated on your Free Application for Federal Student Aid (FAFSA) that you are an unaccompanied homeless youth (<b>as defined below</b>) or were self-supporting and at risk of homelessness at any time on or after June 29, 2020.<i> Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>";
        instructionsTextVal = "<li><b>“Youth”</b> - you were 21 years of age or younger as of the date you signed the FAFSA.</li>";
        checkboxOneTextVal = "<p><b>I was 21 years of age or younger as of the date I signed the FAFSA. I meet the definition of “<i>unaccompanied homeless youth</i>”, as defined above, and was homeless or at risk of homelessness on or after June 29, 2020.</b> By checking this box, you certify that you are able to provide verification of this status. You must sign this form and provide a written statement from:</p>";
        checkboxTwoTextVal = "<p><b>I was 22 or 23 at the time my FAFSA was signed but was homeless or at risk of homelessness on or after June 29, 2020.</b> If you are between the ages of 22 to 23 and believe you otherwise meet the criteria of an unaccompanied homeless youth, you may be eligible to have your dependency status updated by the Office of Financial Aid. Please complete and submit this form AND the 2021-2022 Dependency Override Appeal Form, available on the Cal State Fullerton’s financial aid website at ".concat("<a href=".concat("https://www.fullerton.edu/financialaid ").concat("target=".concat("_blank")).concat(">www.fullerton.edu/financialaid</a> under “Forms Bank”, to the Office of Financial Aid.</p>"));
        checkboxThreeTextVal = "<p><b>I was NOT homeless or at risk of homelessness on or after June 29, 2020 and will provide parental information on the FAFSA.</b> You must correct the information on your FAFSA by providing your parental financial information. You and one parent must sign the FAFSA and submit it to the federal processor. You can do so at ".concat("<a href=".concat("https://www.fafsa.ed.gov ").concat("target=".concat("_blank")).concat(">www.fafsa.ed.gov</a>. A new item will be placed on your <i>To Do List</i> requesting parental information.</p>"));
    }
    if (formCode.value == "F1HOME") {
        formtypeVal = "<p><b>F1HOME</b></p>";
        headingTextVal = "<p><b>UNACCOMPANIED HOMELESS YOUTH VERIFICATION - HOME (".concat(financialAidYear).concat(")</b></p>");
        instructionsHeaderTextVal = "<p>You indicated on your Free Application for Federal Student Aid (FAFSA) that you are an unaccompanied homeless youth (<b>as defined below</b>) or were self-supporting and at risk of homelessness at any time on or after June 29, 2021.<i> Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>";
        instructionsTextVal = "<li><b>“Youth”</b> - you were 21 years of age or younger as of the date you signed the FAFSA.</li>";
        checkboxOneTextVal = "<p><b>I was 21 years of age or younger as of the date I signed the FAFSA. I meet the definition of “<i>unaccompanied homeless youth</i>”, as defined above, and was homeless or at risk of homelessness on or after June 29, 2021.</b> By checking this box, you certify that you are able to provide verification of this status. You must sign this form and provide a written statement from:</p>";
        checkboxTwoTextVal = "<p><b>I was 22 or 23 at the time my FAFSA was signed but was homeless or at risk of homelessness on or after June 29, 2021.</b> If you are between the ages of 22 to 23 and believe you otherwise meet the criteria of an unaccompanied homeless youth, you may be eligible to have your dependency status updated by the Office of Financial Aid. Please complete and submit this form AND the 2022-2023 Dependency Override Appeal Form, available on the Cal State Fullerton’s financial aid website at ".concat("<a href=".concat("https://www.fullerton.edu/financialaid ").concat("target=".concat("_blank")).concat(">www.fullerton.edu/financialaid</a> under “Forms Bank”, to the Office of Financial Aid.</p>"));
        checkboxThreeTextVal = "<p><b>I was NOT homeless or at risk of homelessness on or after June 29, 2021 and will provide parental information on the FAFSA.</b> You must correct the information on your FAFSA by providing your parental financial information. You and one parent must sign the FAFSA and submit it to the federal processor. You can do so at ".concat("<a href=".concat("https://www.fafsa.ed.gov ").concat("target=".concat("_blank")).concat(">www.fafsa.ed.gov</a>. A new item will be placed on your <i>To Do List</i> requesting parental information.</p>"));
    }
    if (formCode.value == "F0CHOM") {
        formtypeVal = "<p><b>F0CHOM</b></p>";
        headingTextVal = "<p><b>UNACCOMPANIED HOMELESS YOUTH VERIFICATION - HOME (".concat(financialAidYear).concat(")<br>CA Dream Act Application</b></p>");
        instructionsHeaderTextVal = "<p>You indicated on your California Dream Act Application (CDA) that you are an unaccompanied homeless youth (<b>as defined below</b>) or were self-supporting and at risk of homelessness at any time on or after June 30, 2020.<i> Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>";
        instructionsTextVal = "<li><b>“Youth”</b> - you were 21 years of age or younger as of the date you signed the CDA.</li>";
        checkboxOneTextVal = "<p><b>I was 21 years of age or younger as of the date I signed the CDA. I meet the definition of “<i>unaccompanied homeless youth</i>”, as defined above, and was homeless or at risk of homelessness on or after June 30, 2020.</b> By checking this box, you certify that you are able to provide verification of this status. You must sign this form and provide a written statement from:</p>";
        checkboxTwoTextVal = "<p><b>I was 22 or 23 at the time my CDA was signed but was homeless or at risk of homelessness on or after June 30, 2020.</b> If you are between the ages of 22 to 23 and believe you otherwise meet the criteria of an unaccompanied homeless youth, you may be eligible to have your dependency status updated by the Office of Financial Aid. Please complete and submit this form AND the 2021-2022 Dependency Override Appeal Form, available on the Cal State Fullerton’s financial aid website at ".concat("<a href=".concat("https://www.fullerton.edu/financialaid ").concat("target=".concat("_blank")).concat(">www.fullerton.edu/financialaid</a> under “Forms & Appeals”, to the Office of Financial Aid.</p>"));
        checkboxThreeTextVal = "<p><b>I was NOT homeless or at risk of homelessness on or after June 30, 2020 and will provide parental information on the CDA.</b> You must correct the information on your CDA by providing your parental financial information. You and one parent must sign the CDA and submit it to the State processor. You can do so at ".concat("<a href=".concat("https://dream.csac.ca.gov/ ").concat("target=".concat("_blank")).concat(">https://dream.csac.ca.gov/</a>. A new item will be placed on your <i>To Do List</i> requesting parental information. If applicable, please check this box, sign below & submit to the Office of Financial Aid. </p>"));
    }
    if (formCode.value == "F1CHOM") {
        formtypeVal = "<p><b>F1CHOM</b></p>";
        headingTextVal = "<p><b>UNACCOMPANIED HOMELESS YOUTH VERIFICATION - HOME (".concat(financialAidYear).concat(")<br>CA Dream Act Application</b></p>");
        instructionsHeaderTextVal = "<p>You indicated on your California Dream Act Application (CDA) that you are an unaccompanied homeless youth (<b>as defined below</b>) or were self-supporting and at risk of homelessness at any time on or after June 20, 2021.<i> Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>";
        instructionsTextVal = "<li><b>“Youth”</b> - you were 21 years of age or younger as of the date you signed the CDA.</li>";
        checkboxOneTextVal = "<p><b>I was 21 years of age or younger as of the date I signed the CDA. I meet the definition of “<i>unaccompanied homeless youth</i>”, as defined above, and was homeless or at risk of homelessness on or after June 30, 2021.</b> By checking this box, you certify that you are able to provide verification of this status. You must sign this form and provide a written statement from:</p>";
        checkboxTwoTextVal = "<p><b>I was 22 or 23 at the time my CDA was signed but was homeless or at risk of homelessness on or after June 30, 2021.</b> If you are between the ages of 22 to 23 and believe you otherwise meet the criteria of an unaccompanied homeless youth, you may be eligible to have your dependency status updated by the Office of Financial Aid. Please complete and submit this form AND the 2022-2023 Dependency Override Appeal Form, available on the Cal State Fullerton’s financial aid website at ".concat("<a href=".concat("https://www.fullerton.edu/financialaid ").concat("target=".concat("_blank")).concat(">www.fullerton.edu/financialaid</a> under “Forms & Appeals”, to the Office of Financial Aid.</p>"));
        checkboxThreeTextVal = "<p><b>I was NOT homeless or at risk of homelessness on or after June 30, 2021 and will provide parental information on the CDA.</b> You must correct the information on your CDA by providing your parental financial information. You and one parent must sign the CDA and submit it to the State processor. You can do so at ".concat("<a href=".concat("https://dream.csac.ca.gov/ ").concat("target=".concat("_blank")).concat(">https://dream.csac.ca.gov/</a>. A new item will be placed on your <i>To Do List</i> requesting parental information. If applicable, please check this box, sign below & submit to the Office of Financial Aid. </p>"));
    }

    $("#VOIHHeadingFormType").html(formtypeVal);
    $("#VOIHHeadingText").html(headingTextVal);
    $("#VOIHHeadingInformationText").html(instructionsHeaderTextVal);
    $("#VOIHInformationText").html(instructionsTextVal);
    $("#VOIHCBOneText").html(checkboxOneTextVal);
    $("#VOIHCBTwoText").html(checkboxTwoTextVal);
    $("#VOIHCBThreeText").html(checkboxThreeTextVal);
}

function checkforDuplicateSubmissions(formCodeVal) {
    var tableName = "AEM_VOI_HOME";
    var financialAidDecisionColumnName = "FINANCIAL_AID_DECISION";
    var formCodeColumnName = "FORM_CODE";
    var faDecision = "1";
    var financialAidYearColumn = "FINANCIAL_AID_YEAR";
    
    if (StageIndicator.value === null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getCitizenShipData",
            data: {
                action: 'CV_DUPLICATE_CHECK_DETAILS',
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
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var studentFormURL = window.location.search;
    var urlParams = new URLSearchParams(studentFormURL);
    var typeOfForm;
    var formCodeTextVal;
    var aidYearValue;

    if (urlParams.has('formType')) {
        typeOfForm = urlParams.get('formType');
    }
    if (typeOfForm == "CDA") {
        formType.value = "CDA";
        loggedInDetails();
    } else if (typeOfForm == "FAFSA") {
        formType.value = "FAFSA";
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
            loggedInDetails();
        };
        document.getElementById("secondButton2").onclick = function() {
            modal.style.display = "none";
            formType.value = "FAFSA";
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
                var firstNameVal = response[0].FIRST_NAME;
                var lastNameVal = response[0].LAST_NAME;
                firstName.value = firstNameVal;
                lastName.value = lastNameVal;
                StudentUserId.value = response[0].USERID;
                SCwid.value = studentCWID;
                cwid.value = studentCWID;
                //StudentEmailId.value = response[0].PREF_EMAIL;
                StudentEmailId.value = "soumya.ravindra@thoughtfocus.com";
                StudentName.value = firstNameVal + " " + lastNameVal;
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
                   // aidYearPopup();
                    singleAidYear();
                } else {
                  //  showErrorModal("Alert !", "No matching records found for the Aid Year");
                    singleAidYear();
                }
            } else {
              //  showErrorModal("Alert !", "No matching records found");
                singleAidYear();
            }
        }
    });
} 

function aidYearPopup() {
    var financialAidPopupValues = getAidYearValuesOnPopup(); 
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
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
        var formCodeVal = "";
        var formCodePrefix = financialAidPopupValues.FinAidYearFormCodeOne;
        var financialAidYearVal = financialAidPopupValues.FinAidYearOne;
        AidYear.value = financialAidPopupValues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "FAFSA") {
            formCode.value = formCodePrefix+"HOME";
            formCodeVal = formCodePrefix+"HOME";
        }
        if (formType.value == "CDA") {
            formCode.value = formCodePrefix+"CHOM";
            formCodeVal = formCodePrefix+"CHOM";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var formCodeVal = "";
        var formCodePrefix = financialAidPopupValues.FinAidYearFormCodeTwo;
        var financialAidYearVal = financialAidPopupValues.FinAidYearTwo;
        AidYear.value = financialAidPopupValues.AidYearTwo;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "FAFSA") {
            formCode.value = formCodePrefix+"HOME";
            formCodeVal = formCodePrefix+"HOME";
        }
        if (formType.value == "CDA") {
            formCode.value = formCodePrefix+"CHOM";
            formCodeVal = formCodePrefix+"CHOM";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
    };
} 

function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var formCodeVal = "";
    var financialAidYearVal = "";
    //var singleFinancialAidvalues = getAidYearValuesOnSingleAidYear();
    var singleFinancialAidvalues = getAidYearValuesOnSingleAidYearUpdated();
    if (typeOfAidYear == '0') {
        financialAidYearVal = singleFinancialAidvalues.FinAidYearZero;
        AidYear.value = singleFinancialAidvalues.AidYearZero;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "FAFSA") {
            formCode.value = "F0HOME";
            formCodeVal = "F0HOME";
        }
        if (formType.value == "CDA") {
            formCode.value = "F0CHOM";
            formCodeVal = "F0CHOM";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = singleFinancialAidvalues.FinAidYearOne;
        AidYear.value = singleFinancialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "FAFSA") {
            formCode.value = "F1HOME";
            formCodeVal = "F1HOME";
        }
        if (formType.value == "CDA") {
            formCode.value = "F1CHOM";
            formCodeVal = "F1CHOM";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
    } else {
        financialAidYearVal = singleFinancialAidvalues.FinAidYearGeneral;
        AidYear.value = singleFinancialAidvalues.AidYearGeneral;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        var formCodePrefix = singleFinancialAidvalues.FormCodeGeneral;
        if (formType.value == "FAFSA") {
            formCode.value = formCodePrefix+"HOME";
            formCodeVal = formCodePrefix+"HOME";
        }
        if (formType.value == "CDA") {
            formCode.value = formCodePrefix+"CHOM";
            formCodeVal = formCodePrefix+"CHOM";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
    }
} 

if (StageIndicator.value !== null) {
    aidYearValue = financialAidYear.value;
    textChanger(aidYearValue);
} 

function textChanger(financialAidYear) {
  
    var financialAidYearVal = financialAidYear;
    //var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);
    var taxFilingYear = AidYear.value; 
    var instructionsTextVal = "";
    var headingTextVal = "";
    var instructionsHeaderTextVal = "";
    var checkboxOneTextVal = "";
    var checkboxTwoTextVal = "";
    var checkboxThreeTextVal = "";
    var getUniqueStatementsVal = getUniqueStatements("VERIFICATION_OF_INDEPENDENT_HOME",taxFilingYear,formType.value);
  
    var formtypeVal = "<p><b>"+formCode.value+"</b></p>";
    if(formType.value == "CDA"){
      headingTextVal = "<p><b>UNACCOMPANIED HOMELESS YOUTH VERIFICATION - HOME (".concat(financialAidYear).concat(")<br>CA Dream Act Application</b></p>");
      
      if(taxFilingYear == "2024"){
        instructionsHeaderTextVal = "<p>You indicated on your California Dream Act Application (CDA) that you are an unaccompanied homeless youth (<b>as defined below</b>) or were self-supporting and at risk of homelessness at any time on or after "+getUniqueStatementsVal.HeadingInstructionKey+".<i> Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>";
        instructionsTextVal = "<li><b>“Youth”</b> - you were 21 years of age or younger as of the date you signed the CDA.</li>";
         checkboxOneTextVal = "<p><b>I was 21 years of age or younger as of the date I signed the CDA. I meet the definition of “<i>unaccompanied homeless youth</i>”, as defined above, and was homeless or at risk of homelessness on or after "+getUniqueStatementsVal.CheckBoxOneKey+".</b> By checking this box, you certify that you are able to provide verification of this status. You must sign this form and provide a written statement from:</p>";
        checkboxTwoTextVal = "<p><b>I was 22 or 23 at the time my CDA was signed but was homeless or at risk of homelessness on or after "+getUniqueStatementsVal.CheckBoxTwoKey+".</b> If you are between the ages of 22 to 23 and believe you otherwise meet the criteria of an unaccompanied homeless youth, you may be eligible to have your dependency status updated by the Office of Financial Aid. Please complete and submit this form AND the "+financialAidYearVal+" Dependency Override Appeal Form, available on the Cal State Fullerton’s financial aid website at ".concat("<a href=".concat("https://www.fullerton.edu/financialaid ").concat("target=".concat("_blank")).concat(">www.fullerton.edu/financialaid</a> under “Forms & Appeals”, to the Office of Financial Aid.</p>"));
         checkboxThreeTextVal = "<p><b>I was NOT homeless or at risk of homelessness on or after "+getUniqueStatementsVal.CheckBoxThreeKey+" and will provide parental information on the CDA.</b> You must correct the information on your CDA by providing your parental financial information. You and one parent must sign the CDA and submit it to the State processor. You can do so at ".concat("<a href=".concat("https://dream.csac.ca.gov/ ").concat("target=".concat("_blank")).concat(">https://dream.csac.ca.gov/</a>. A new item will be placed on your <i>To Do List</i> requesting parental information. If applicable, please check this box, sign below & submit to the Office of Financial Aid. </p>"));
        DeclrationInformationTwo.visible = false;
        DeclarationNoteText.visible = false;
      } else{
        instructionsHeaderTextVal = "<p>You indicated on your California Dream Act Application (CADAA) that you are an unaccompanied homeless youth (<b>as defined below</b>) or were self-supporting and at risk of homelessness.</p>";
        instructionsTextVal = "<li><b>“Youth”</b> - you were 23 years of age or younger as of the date you signed the CADAA.</li>";
         checkboxOneTextVal = "<p><b>I was under the age of 24. I meet the definition of “homeless”, as defined above, and was homeless or at risk of homelessness on or after June 28, 2023.</b> By checking this box, you certify that you are able to provide verification of this status. You must sign this form and provide a written statement from:</p>";
        checkboxTwoTextVal = "<p><b>I was under the age of 24 at the time my CADAA was signed and was homeless or at risk of homelessness but cannot provide documentation as listed above.</b> Please complete and submit this form and a personal statement of your situation and circumstances</p>";
         checkboxThreeTextVal = "<p><b>I am unable to provide documentation as listed above. </b> I feel my situation is too personal to provide a statement and I would like to schedule a meeting with a counselor to discuss my circumstances <li><i>We will reach out to you when we receive this form. It may be quicker to call us at 657-278-3125 and request an appointment with a counselor.</i></li></p>";
        var noteTextVal = "<p><b>NOTE: If you inadvertently answered “Yes” to being homeless or at risk of homelessness on your CADAA, but do not meet the definitions above, you must correct the information on your CADAA by providing your parental financial information. You and one parent must sign the CADAA and submit it to the State processor. You can do so at ".concat("<a href=".concat("https://dream.csac.ca.gov/").concat("target=".concat("_blank")).concat(">https://dream.csac.ca.gov/</a>. A new item will be placed on your To Do List requesting parental information.</b></p>"));
        DeclrationInformationOne.visible = false;
         $("#VOIHDeclarationNote").html(noteTextVal);
      }
       
      CDAInstructionTextChanger.value = getUniqueStatementsVal.HeadingInstructionKey;
      CDACheckBoxOne.value = getUniqueStatementsVal.CheckBoxOneKey; 
      CDACheckBoxTwo.value = getUniqueStatementsVal.CheckBoxTwoKey; 
      CDACheckBoxThree.value = getUniqueStatementsVal.CheckBoxThreeKey;
      
    }else{
       headingTextVal = "<p><b>UNACCOMPANIED HOMELESS YOUTH VERIFICATION - HOME (".concat(financialAidYear).concat(")</b></p>");
      if(taxFilingYear == "2024"){
       instructionsTextVal = "<li><b>“Youth”</b> - you were 21 years of age or younger as of the date you signed the FAFSA.</li>";
       instructionsHeaderTextVal = "<p>You indicated on your Free Application for Federal Student Aid (FAFSA) that you are an unaccompanied homeless youth (<b>as defined below</b>) or were self-supporting and at risk of homelessness at any time on or after "+getUniqueStatementsVal.HeadingInstructionKey+".<i> Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>";
      checkboxOneTextVal = "<p><b>I was 21 years of age or younger as of the date I signed the FAFSA. I meet the definition of “<i>unaccompanied homeless youth</i>”, as defined above, and was homeless or at risk of homelessness on or after "+getUniqueStatementsVal.CheckBoxOneKey+".</b> By checking this box, you certify that you are able to provide verification of this status. You must sign this form and provide a written statement from:</p>";
       checkboxTwoTextVal = "<p><b>I was 22 or 23 at the time my FAFSA was signed but was homeless or at risk of homelessness on or after "+getUniqueStatementsVal.CheckBoxTwoKey+".</b> If you are between the ages of 22 to 23 and believe you otherwise meet the criteria of an unaccompanied homeless youth, you may be eligible to have your dependency status updated by the Office of Financial Aid. Please complete and submit this form AND the "+financialAidYearVal+" Dependency Override Appeal Form, available on the Cal State Fullerton’s financial aid website at ".concat("<a href=".concat("https://www.fullerton.edu/financialaid ").concat("target=".concat("_blank")).concat(">www.fullerton.edu/financialaid</a> under “Forms Bank”, to the Office of Financial Aid.</p>"));
        checkboxThreeTextVal = "<p><b>I was NOT homeless or at risk of homelessness on or after "+getUniqueStatementsVal.CheckBoxThreeKey+" and will provide parental information on the FAFSA.</b> You must correct the information on your FAFSA by providing your parental financial information. You and one parent must sign the FAFSA and submit it to the federal processor. You can do so at ".concat("<a href=".concat("https://www.fafsa.ed.gov ").concat("target=".concat("_blank")).concat(">www.fafsa.ed.gov</a>. A new item will be placed on your <i>To Do List</i> requesting parental information.</p>"));
         DeclrationInformationTwo.visible = false;
        DeclarationNoteText.visible = false;
        } else{
          instructionsHeaderTextVal = "<p>You indicated on your Free Application for Federal Student Aid (FAFSA) that you are an unaccompanied homeless youth (<b>as defined below</b>) or were self-supporting and at risk of homelessness.</p>";
        instructionsTextVal = "<li><b>“Youth”</b> - you were 23 years of age or younger as of the date you signed the FAFSA.</li>";
         checkboxOneTextVal = "<p><b>I was under the age of 24. I meet the definition of “homeless”, as defined above, and was homeless or at risk of homelessness on or after June 28, 2023.</b> By checking this box, you certify that you are able to provide verification of this status. You must sign this form and provide a written statement from:</p>";
        checkboxTwoTextVal = "<p><b>I was under the age of 24 at the time my FAFSA was signed and was homeless or at risk of homelessness but cannot provide documentation as listed above.</b> Please complete and submit this form and a personal statement of your situation and circumstances</p>";
         checkboxThreeTextVal = "<p><b>I am unable to provide documentation as listed above. </b> I feel my situation is too personal to provide a statement and I would like to schedule a meeting with a counselor to discuss my circumstances <li><i>We will reach out to you when we receive this form. It may be quicker to call us at 657-278-3125 and request an appointment with a counselor.</i></li></p>";
        var noteTextVal2 = "<p><b>NOTE: If you inadvertently answered “Yes” to being homeless or at risk of homelessness on your FAFSA, but do not meet the definitions above, please correct your FAFSA by changing the answer to this question and providing parental information. You must submit a FAFSA correction before we can continue processing your application.</b></p>";
        DeclrationInformationOne.visible = false;
         $("#VOIHDeclarationNote").html(noteTextVal2);
          
        }
      
      FAFSAInstructionTextChanger.value = getUniqueStatementsVal.HeadingInstructionKey; 
      FAFSACheckBoxOne.value = getUniqueStatementsVal.CheckBoxOneKey; 
      FAFSACheckBoxTwo.value = getUniqueStatementsVal.CheckBoxTwoKey; 
      FAFSACheckBoxThree.value = getUniqueStatementsVal.CheckBoxThreeKey; 
    }
  
  
    $("#VOIHHeadingFormType").html(formtypeVal);
    $("#VOIHHeadingText").html(headingTextVal);
    $("#VOIHHeadingInformationText").html(instructionsHeaderTextVal);
    $("#VOIHInformationText").html(instructionsTextVal);
    $("#VOIHCBOneText").html(checkboxOneTextVal);
    $("#VOIHCBTwoText").html(checkboxTwoTextVal);
    $("#VOIHCBThreeText").html(checkboxThreeTextVal);
}

function checkforDuplicateSubmissions(formCodeVal,financialAidYearVal) {
    var tableName = "AEM_VOI_HOME";
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
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_caseId_init0 = function (scope) {
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
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_firstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_firstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_lastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_lastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_Date_1_init0 = function (scope) {
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
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_CheckBox1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_CheckBox1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null && this.value == "1"){
  CheckBox2.value = "";
  CheckBox3.value = "";
}
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_CheckBox2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_CheckBox2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null && this.value == "1"){
  CheckBox1.value = "";
  CheckBox3.value = "";
}
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_CheckBox3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_CheckBox3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null && this.value == "1"){
  CheckBox2.value = "";
  CheckBox1.value = "";
}
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_SupportingDocuments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_SupportingDocuments_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_supportDoc1_valueCommit0 = function (scope) {
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
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_supportDoc2_valueCommit0 = function (scope) {
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
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_supportDoc3_valueCommit0 = function (scope) {
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
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_checkbox1649834861348_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_checkbox1649834861348_valueCommit0 = function (scope) {
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
                StudentSignature.value = StudentName.value;
                StudentSignatureDate.value = myresponse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        StudentSignature.enabled = false;
        StudentSignatureDate.enabled = false;
    } else {
        StudentSignatureDate.value = "";
        StudentSignature.value = "";
    }
}
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_IPAddress_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_IPAddress_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
if (StageIndicator.value === null) {     		
  	$.getJSON("https://api.ipify.org?format=json", function(data) {                
        IPAddress.value = data.ip;        
    });
}
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_StudentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_StudentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_StudentSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_StudentSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_checkbox1649838422969_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_checkbox1649838422969_valueCommit0 = function (scope) {
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
                FinancialAidSignature.value = userValue;
                FinancialAidSignatureDate.value = myresponse.SERVER_DATE;
                financialAidAssignee.value = myresponse.userId;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        FinancialAidSignature.enabled = false;
        FinancialAidSignatureDate.enabled = false;
    } else {
        FinancialAidSignature.value = "";
        FinancialAidSignatureDate.value = "";
        financialAidAssignee.value = "";
    }
}
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_FinancialAidSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_FinancialAidSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_FinancialAidSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_FinancialAidSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if (AidYear.value !== null) {
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
            jsonData.append('formPath', '/content/forms/af/verification-of-independent---home/unaccompanied-homeless-youth-verification---home');
            jsonData.append('fileName', StudentName.value);          
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
 * @function verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
verification_of_independent___home_unaccompanied_homeless_youth_verification___home.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    aftiaDescCWID.value = StudentName.value + " " + cwid.value;
    EmailSubject.value = "Test - Unaccompanied Homeless Youth Verification - Home - " + cwid.value;
}
StudentEmailId.value = "soumya.ravindra@thoughtfocus.com";
if (InstructionsCB.value != "1") {
    showErrorModal("Alert!", "Please read the instructions carefully and check the checkbox below");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].Instructions[0].InstructionsCB[0]");
} else if ((CheckBox1.value != "1") && (CheckBox2.value != "1") && (CheckBox3.value != "1")) {
    showErrorModal("Alert!", "Please check one of the boxes below");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].Declaration[0].CheckBox1[0]");
} else if(formCode.value == "F0CHOM" && supportDoc1.value === "" && supportDoc2.value === "" && supportDoc3.value === ""){
  showErrorModal("Alert!", "Please attach supporting documents");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SupportingDocuments[0].supportDoc1[0]");
} else if(formCode.value == "F0HOME" && supportDoc1.value === "" && supportDoc2.value === "" && supportDoc3.value === ""){
  showErrorModal("Alert!", "Please attach supporting documents");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SupportingDocuments[0].supportDoc1[0]");
} else if(formCode.value == "F1CHOM" && CheckBox3.value != "1" && supportDoc1.value === "" && supportDoc2.value === "" && supportDoc3.value === ""){
  showErrorModal("Alert!", "Please attach supporting documents");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SupportingDocuments[0].supportDoc1[0]");
} else if(formCode.value == "F1HOME" && CheckBox3.value != "1" && supportDoc1.value === "" && supportDoc2.value === "" && supportDoc3.value === ""){
  showErrorModal("Alert!", "Please attach supporting documents");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SupportingDocuments[0].supportDoc1[0]");
} else {
    guideBridge.submit();
}
        }
	}
}
