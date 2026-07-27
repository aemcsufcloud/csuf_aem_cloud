/**
 * @function student_w2_statement_student_w2_statement.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    FinancialSignaturePanel.visible = false;
    $.getJSON("https://api.ipify.org?format=json", function(data) {
        ipAddress.value = data.ip;
    });
} else if (StageIndicator.value == "ToFinancialAid") {
    StudentInformation.enabled = false;
    EmploymentStatusDetailsPanel.enabled = false;
    SupportingDocumentsPanel.visible=false;
    StudentSignaturePanel.enabled = false;
    FinancialSignaturePanel.visible = true;
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    /*var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "none";*/
    loggedInDetails();
}
function loggedInDetails() {
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            // gifModal.style.display = "block";
            var userValue = response.userId;
            // var userValue = 'veronica.maciel';	 	  	// two Aid Year
            //var userValue = 'majesticallexi'; // one Aid Year
            //var userValue = 'mchoi88';			 	// no Aid Year
            workflow_initiator.value = userValue;
            caseID();
            getStudentDetails(userValue);
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}
function caseID() {
    $.ajax({
        type: 'GET',
        url: "/bin/getCaseID",
        dataType: 'json',
        success: function(response) {
            caseId.value = response.CASEID;
        },
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
                var studentCWIDVal = response[0].EMPLID;
                getStudentAidYearDetails(studentCWIDVal);
                lastName.value = response[0].LAST_NAME;
                firstName.value = response[0].FIRST_NAME;
                HiddenStudentUserID.value = response[0].USERID;
                cwid.value = response[0].EMPLID;
                //studentIDNumber.value = response[0].student_ID;
                studentCWID.value = response[0].EMPLID;
               // HiddenStudentEmail.value = response[0].PREF_EMAIL;
                HiddenStudentEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
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
                        } else if ("SECOND_AID_YEAR" == key) {
                            identifyAidYearFlag = "TwoAidYear";
                        }
                    }
                }
                var typeOfAidYear = "";
                typeOfAidYear = getUrlParameters('aidYear');
                if (identifyAidYearFlag == "OneAidYear" && typeOfAidYear != "0" && typeOfAidYear != "1") {
                    singleAidYear(typeOfAidYear, identifyAidYearFlag);
                } else if (identifyAidYearFlag == "TwoAidYear" && typeOfAidYear != "0" && typeOfAidYear != "1") {
                    aidYearPopup();
                } else if (typeOfAidYear == "0" || typeOfAidYear == "1") {
                    singleAidYear(typeOfAidYear, identifyAidYearFlag);
                } else if (identifyAidYearFlag == "OneAidYear" && typeOfAidYear === undefined) {
                    singleAidYear(typeOfAidYear, identifyAidYearFlag);
                } else if (identifyAidYearFlag == "TwoAidYear" && typeOfAidYear === undefined) {
                    singleAidYear(typeOfAidYear, identifyAidYearFlag);
                } else {
                    showErrorModal("Alert !", "No matching records found for the Aid Year");
                }
            } else {
                showErrorModal("Alert !", "No matching records found");
            }
        }
    });
}
function singleAidYear(typeOfAidYear, identifyAidYearFlag) {
    var formCodeVal = "";
   // var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";

    if (typeOfAidYear == '0' && identifyAidYearFlag == "OneAidYear") {
        financialAidYearVal = "2021-2022";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0W2SS";
        formCodeVal = "F0W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (typeOfAidYear == '0' && identifyAidYearFlag == "TwoAidYear") {
        financialAidYearVal = "2021-2022";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0W2SS";
        formCodeVal = "F0W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (typeOfAidYear == '1' && identifyAidYearFlag == "OneAidYear") {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1W2SS";
        formCodeVal = "F1W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (typeOfAidYear == '1' && identifyAidYearFlag == "TwoAidYear") {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1W2SS";
        formCodeVal = "F1W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (identifyAidYearFlag == "OneAidYear") {
        financialAidYearVal = "2021-2022";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0W2SS";
        formCodeVal = "F0W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (identifyAidYearFlag == "TwoAidYear") {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1W2SS";
        formCodeVal = "F1W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (typeOfAidYear == '0') {
        financialAidYearVal = "2021-2022";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0W2SS";
        formCodeVal = "F0W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1W2SS";
        formCodeVal = "F1W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else {
        financialAidYearVal = "2021-2022";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0W2SS";
        formCodeVal = "F0W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
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
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0W2SS";
        formCodeVal = "F0W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };
    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = "2022-2023";
        aidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1W2SS";
        formCodeVal = "F1W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };
}
if (StageIndicator.value !== null) {
    aidYearValue = financialAidYear.value;
    getFAFSAFinancialAidYear(aidYearValue);
}
function getFAFSAFinancialAidYear(aidYearValue) {
    var formCodeTextVal;
    var titleTextVal;
    var financialAidYearVal = financialAidYear;
    if (aidYearValue == "2021-2022") {
        formCodeTextVal = "<p><b>F0W2SS</b></p>";
        titleTextVal = "<p><b>STUDENT (AND SPOUSE) 2019 W-2 STATEMENT (2021-2022)</b></p>";
    } else if (aidYearValue == "2022-2023") {
        formCodeTextVal = "<p><b>F1W2SS</b></p>";
        titleTextVal = "<p><b>STUDENT (AND SPOUSE) 2020 W-2 STATEMENT (2022-2023)</b></p>";
    }
    var textOneVal = "";
    if (aidYearValue == "2021-2022") {
        textOneVal = "<p>Additional information is needed before we can continue with the processing of the ".concat(aidYearValue).concat(" Free Application for Federal Student Aid (FAFSA).<i> Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>");
    }
    if (aidYearValue == "2022-2023") {
        textOneVal = "<p>Additional information is needed before we can continue with the processing of the ".concat(aidYearValue).concat(" Free Application for Federal Student Aid (FAFSA).<i> Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>");
    }
    var textTwoVal = "";
    if (aidYearValue == "2021-2022") {
        textTwoVal = "<p>Select the category below which best describes your employment status in 2019 and provide the requested documentation:</p>";
    }
    if (aidYearValue == "2022-2023") {
        textTwoVal = "<p>Select the category below which best describes your employment status in 2020 and provide the requested documentation:</p>";
    }
    var textThreeVal = "";
    if (aidYearValue == "2021-2022") {
        textThreeVal = "<p>Employed in 2019 <b><i>and</i></b> filed a federal tax return:</p>";
    }
    if (aidYearValue == "2022-2023") {
        textThreeVal = "<p>Employed in 2020 <b><i>and</i></b> filed a federal tax return:</p>";
    }
    var textFourVal = "";
    if (aidYearValue == "2021-2022") {
        textFourVal = "<p>Employed in 2019 and <b><i>not required</i></b> to file a federal tax return.</p>";
    }
    if (aidYearValue == "2022-2023") {
        textFourVal = "<p>Employed in 2020 and <b><i>not required</i></b> to file a federal tax return.</p>";
    }
    var textFiveVal = "";
    if (aidYearValue == "2021-2022") {
        textFiveVal = "<p>Employed in 2019, but no W-2 or 1099 form(s) were issued to me/us (explain below).</p>";
    }
    if (aidYearValue == "2022-2023") {
        textFiveVal = "<p>Employed in 2020, but no W-2 or 1099 form(s) were issued to me/us (explain below).</p>";
    }
    var textSixVal = "";
    if (aidYearValue == "2021-2022") {
        textSixVal = "<p>Self-employed in 2019, and I/we have attached all photocopies of W-2 or 1099 form(s).</p>";
    }
    if (aidYearValue == "2022-2023") {
        textSixVal = "<p>Self-employed in 2020, and I/we have attached all photocopies of W-2 or 1099 form(s).</p>";
    }
    var textSevenVal = "";
    if (aidYearValue == "2021-2022") {
        textSevenVal = "<p>Self-employed in 2019, and no W-2 or 1099 form(s) were issued to me/us.</p>";
    }
    if (aidYearValue == "2022-2023") {
        textSevenVal = "<p>Self-employed in 2020, and no W-2 or 1099 form(s) were issued to me/us.</p>";
    }
    var textEightVal = "";
    if (aidYearValue == "2021-2022") {
        textEightVal = "<p>Did not work in 2019, therefore, no W-2 or 1099 forms were issued.</p>";
    }
    if (aidYearValue == "2022-2023") {
        textEightVal = "<p>Did not work in 2020, therefore, no W-2 or 1099 forms were issued.</p>";
    }
    var textNineVal = "";
    if (aidYearValue == "2021-2022") {
        textNineVal = "<p><i><b>Must:</b> Attach all 2019 W2s equaling the value listed.</i></p>";
    }
    if (aidYearValue == "2022-2023") {
        textNineVal = "<p><i><b>Must:</b> Attach all 2020 W2s equaling the value listed.</i></p>";
    }
    var textTenVal = "";
    if (aidYearValue == "2021-2022") {
        textTenVal = "<p><i><b>Must:</b> Attach all 2019 W2s equaling the value listed.</i></p>";
    }
    if (aidYearValue == "2022-2023") {
        textTenVal = "<p><i><b>Must:</b> Attach all 2020 W2s equaling the value listed.</i></p>";
    }
    var textElevenVal = "";
    if (aidYearValue == "2021-2022") {
        textElevenVal = "<p><i><b>Must:</b> Attach all 2019 W2s.</i></p>";
    }
    if (aidYearValue == "2022-2023") {
        textElevenVal = "<p><i><b>Must:</b> Attach all 2020 W2s.</i></p>";
    }
    var cellOneVal = "";
    if (aidYearValue == "2021-2022") {
        cellOneVal = "<p>$12,200 if parents claimed you as dependent</p>";
    }
    if (aidYearValue == "2022-2023") {
        cellOneVal = "<p>$12,400 if parents claimed you as dependent</p>";
    }
    var cellTwoVal = "";
    if (aidYearValue == "2021-2022") {
        cellTwoVal = "<p>$12,200 if single</p>";
    }
    if (aidYearValue == "2022-2023") {
        cellTwoVal = "<p>$12,400 if single</p>";
    }
    var cellThreeVal = "";
    if (aidYearValue == "2021-2022") {
        cellThreeVal = "<p>$18,350 if head of household</p>";
    }
    if (aidYearValue == "2022-2023") {
        cellThreeVal = "<p>$18,650 if head of household</p>";
    }
    var cellFourVal = "";
    if (aidYearValue == "2021-2022") {
        cellFourVal = "<p>$24,400 if married, filing jointly</p>";
    }
    if (aidYearValue == "2022-2023") {
        cellFourVal = "<p>$24,800 if married, filing jointly</p>";
    }
    $("#formCodeText").html(formCodeTextVal);
    $("#HeadingText").html(titleTextVal);
    $("#f0w2ssInstructionsText").html(textOneVal);
    $("#f0w2ssActionText").html(textTwoVal);
    $("#checkBox1").html(textThreeVal);
    $("#checkBox2").html(textFourVal);
    $("#checkBox3").html(textFiveVal);
    $("#checkBox4").html(textSixVal);
    $("#checkBox5").html(textSevenVal);
    $("#checkBox6").html(textEightVal);
    $("#mustText1").html(textNineVal);
    $("#mustText2").html(textTenVal);
    $("#mustText3").html(textElevenVal);
    $("#cell1").html(cellOneVal);
    $("#cell2").html(cellTwoVal);
    $("#cell3").html(cellThreeVal);
    $("#cell4").html(cellFourVal);
}
function checkforDuplicateSubmissions(formCodeVal) {
    var tableName = "AEM_STUDENT_W2_STATEMENT";
    var financialAidDecisionColumnName = "FINANCIAL_AID_DECISION";
    var formCodeColumnName = "FORM_CODE";
    var faDecision = "Approved";
    if (StageIndicator.value === null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getCitizenShipData",
            data: {
                action: 'CV_DUPLICATE_CHECK_DETAILS',
                cwid: cwid.value,
                faDecisionColumnName: financialAidDecisionColumnName,
                tableName: tableName,
                formCodeColumnName: formCodeColumnName,
                formCode: formCodeVal,
                faDecision: faDecision
            },
            dataType: 'json',
            success: function(myresponse) {
                if (myresponse.length >= 1) {
                    showErrorModal("Alert!", "Duplicate submissions are not allowed");
                    submit1608529416101.enabled = false;
                }
            },
        });
    }
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    /*var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "none";*/
    loggedInDetails();
}

function loggedInDetails() {
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            // gifModal.style.display = "block";
            var userValue = response.userId;
            //var userValue = 'veronica.maciel';	 	  	// two Aid Year
            //var userValue = 'majesticallexi'; // one Aid Year
            //var userValue = 'mchoi88';			 	// no Aid Year
            workflow_initiator.value = userValue;
            caseID();
            getStudentDetails(userValue);
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}

function caseID() {
    $.ajax({
        type: 'GET',
        url: "/bin/getCaseID",
        dataType: 'json',
        success: function(response) {
            caseId.value = response.CASEID;
        },
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
                var studentCWIDVal = response[0].EMPLID;
                getStudentAidYearDetails(studentCWIDVal);
                lastName.value = response[0].LAST_NAME;
                firstName.value = response[0].FIRST_NAME;
                HiddenStudentUserID.value = response[0].USERID;
                cwid.value = response[0].EMPLID;
                //studentIDNumber.value = response[0].student_ID;
                studentCWID.value = response[0].EMPLID;
                //HiddenStudentEmail.value = response[0].PREF_EMAIL;
               // HiddenStudentEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.";
                HiddenStudentEmail.value = "shreyas.manjunatha@thoughtfocus.";
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
                } else if (identifyAidYearFlag == "OneAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
                    singleAidYear();
                } else if (identifyAidYearFlag == "TwoAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
                   // aidYearPopup();
                    singleAidYear();
                } else {
                   // showErrorModal("Alert !", "No matching records found for the Aid Year");
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
        aidYear.value = financialAidPopupValues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = prefixVal+"W2SS";
        formCodeVal = prefixVal+"W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
    };
    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var prefixVal = financialAidPopupValues.FinAidYearFormCodeTwo;
        var financialAidYearVal = financialAidPopupValues.FinAidYearTwo;
        aidYear.value = financialAidPopupValues.AidYearTwo;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = prefixVal+"W2SS";
        formCodeVal = prefixVal+"W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
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
        aidYear.value = singleFinancialAidvalues.AidYearZero;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0W2SS";
        formCodeVal = "F0W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = singleFinancialAidvalues.FinAidYearOne;
        aidYear.value = singleFinancialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1W2SS";
        formCodeVal = "F1W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
    } else {
        var prefixVal = singleFinancialAidvalues.FormCodeGeneral;
        financialAidYearVal = singleFinancialAidvalues.FinAidYearGeneral;
        aidYear.value = singleFinancialAidvalues.AidYearGeneral;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = prefixVal+"W2SS";
        formCodeVal = prefixVal+"W2SS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
    }


}

if (StageIndicator.value !== null) {
    aidYearValue = financialAidYear.value;
    getFAFSAFinancialAidYear(aidYearValue);
}

function getFAFSAFinancialAidYear(aidYearValue) {
   var financialAidYearVal = financialAidYear;
   var taxFilingYear = aidYear.value - 3;
   var taxFilingAidYear = aidYear.value;
  debugger;
  var formCodeTextVal = "<p><b>"+formCode.value+"</b></p>";
  var titleTextVal = "<p><b>STUDENT (AND SPOUSE) "+taxFilingYear+" W-2 STATEMENT ("+financialAidYear.value+")</b></p>";
  var textOneVal = "<p>Additional information is needed before we can continue with the processing of the ".concat(aidYearValue).concat(" Free Application for Federal Student Aid (FAFSA).<i> Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>");
  var textTwoVal = "<p>Select the category below which best describes your employment status in "+taxFilingYear+" and provide the requested documentation:</p>";
  var textThreeVal = "<p>Employed in "+taxFilingYear+" <b><i>and</i></b> filed a federal tax return:</p>";
  var textFourVal = "<p>Employed in "+taxFilingYear+" and <b><i>not required</i></b> to file a federal tax return.</p>";
  var textFiveVal = "<p>Employed in "+taxFilingYear+", but no W-2 or 1099 form(s) were issued to me/us (explain below).</p>";
  var textSixVal = "<p>Self-employed in "+taxFilingYear+", and I/we have attached all photocopies of W-2 or 1099 form(s).</p>";
  var textSevenVal = "<p>Self-employed in "+taxFilingYear+", and no W-2 or 1099 form(s) were issued to me/us.</p>";
  var textEightVal = "<p>Did not work in "+taxFilingYear+", therefore, no W-2 or 1099 forms were issued.</p>";
  var textNineVal = "<p><i><b>Must:</b> <u>Attach all "+taxFilingYear+" W2s equaling the value listed.</u></i></p>";
  var textTenVal = "<p><i><b>Must:</b> <u>Attach all "+taxFilingYear+" W2s equaling the value listed.</u></i></p>";
  var textElevenVal = "<p><i><b>Must:</b> <u>Attach all "+taxFilingYear+" W2s.</u></i></p>";
  var changingTexts = getUniqueStatements("STUDENT_W2_STATEMENT",taxFilingAidYear,"");
  var cellOneVal = "<p>"+changingTexts.CellOneKey+"</p>";
  Year1.value = changingTexts.CellOneKey;
  var cellTwoVal = "<p>"+changingTexts.CellTwoKey+"</p>";
  Year1_1.value = changingTexts.CellTwoKey;
  var cellThreeVal = "<p>"+changingTexts.CellThreeKey+"</p>";
  Year2.value = changingTexts.CellThreeKey;
  var cellFourVal = "<p>"+changingTexts.CellFourKey+"</p>";
  Year2_1.value = changingTexts.CellFourKey;
  var cellFiveVal = "<p>"+changingTexts.CellFiveKey+"</p>";
  Year3.value = changingTexts.CellFiveKey;
  var cellSixVal = "<p>"+changingTexts.CellSixKey+"</p>";
  Year4.value = changingTexts.CellSixKey;
  var headingTextVal = "<p><b>"+changingTexts.TableHeadingKey+"</b></p>";
  Year5.value = changingTexts.TableHeadingKey;
  Heading.value = changingTexts.CheckBoxOneSubCheckBoxOneKey;
  var array = []; 
  var sentence = "1="+changingTexts.CheckBoxOneSubCheckBoxOneKey;
  array.push(sentence);
  CheckLine7.items = array;  
  var CheckBoxOneSubCheckBoxTwoPresence = changingTexts.CheckBoxOneSubCheckBoxTwoPresenceKey;
  if(CheckBoxOneSubCheckBoxTwoPresence == "visible"){
    CheckLine1.visible = true;
    Line1.visible = true;
    textdraw_13077357131659416438152_copy_2_copy_1.visible = true;
  }else{
    CheckLine1.visible = false;
    Line1.visible = false;
    textdraw_13077357131659416438152_copy_2_copy_1.visible = false;
  }
  Year_Instructions.value = CheckBoxOneSubCheckBoxTwoPresence; 
    

  
    $("#formCodeText").html(formCodeTextVal);
    $("#HeadingText").html(titleTextVal);
    $("#f0w2ssInstructionsText").html(textOneVal);
    $("#f0w2ssActionText").html(textTwoVal);
    $("#checkBox1").html(textThreeVal);
    $("#checkBox2").html(textFourVal);
    $("#checkBox3").html(textFiveVal);
    $("#checkBox4").html(textSixVal);
    $("#checkBox5").html(textSevenVal);
    $("#checkBox6").html(textEightVal);
    $("#mustText1").html(textNineVal);
    $("#mustText2").html(textTenVal);
    $("#mustText3").html(textElevenVal);
    $("#tableHeading").html(headingTextVal);
    $("#cell1").html(cellOneVal);
    $("#cell2").html(cellTwoVal);
    $("#cell3").html(cellThreeVal);
    $("#cell4").html(cellFourVal);
    $("#cell5").html(cellFiveVal);
    $("#cell6").html(cellSixVal);
}

function checkforDuplicateSubmissions(formCodeVal,financialAidYearVal) {
    var tableName = "AEM_STUDENT_W2_STATEMENT";
    var financialAidDecisionColumnName = "FINANCIAL_AID_DECISION";
    var financialAidYearColumnName = "FINANCIAL_AID_YEAR";
    var formCodeColumnName = "FORM_CODE";
    var faDecision = "Approved";
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
                    submit1608529416101.enabled = false;
                }
            },
        });
    }
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_Date_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    this.enabled = false;
    var dateString = new Date().toLocaleString("en-US", {

        timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
    }).replace(/[^ -~]/g, ' ');
    var dateObject = new Date(dateString);
    var curyear = dateObject.getFullYear();
    var curyearMonth = dateObject.getMonth() + 1;
    var curyearDay = dateObject.getDate();
    var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
    Date_1.value = d;
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_FederalTaxReturnFiled_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_FederalTaxReturnFiled_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    NotReqFederalTaxReturn.value = null;
    W2FormNoIssue.value = null;
    SelfAttachW2Forms.value = null;
    SelfNoW2FormIssued.value = null;
    DidNotWork.value = null;
    Other.value = null;
    OtherExplain.value = null;
    CBExplanation.value = null;
    CheckLine7.enabled = true;
    CheckLine1.enabled = true;
} else {
    CheckLine7.enabled = false;
    CheckLine7.value = null;
    CheckLine1.enabled = false;
    CheckLine1.value = null;
    Line7.value = null;
    Line1.value = null;
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_CheckLine7_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_CheckLine7_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_CheckLine7_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_CheckLine7_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    Line7.enabled = true;
} else {
    Line7.enabled = false;
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_Line7_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_Line7_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_CheckLine1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_CheckLine1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_CheckLine1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_CheckLine1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    Line1.enabled = true;
} else {
    Line1.enabled = false;
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_Line1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_Line1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_NotReqFederalTaxReturn_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_NotReqFederalTaxReturn_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    FederalTaxReturnFiled.value = null;
    Line7.value = null;
    Line1.value = null;
    CheckLine7.value = null;
    CheckLine1.value = null;
    W2FormNoIssue.value = null;
    SelfAttachW2Forms.value = null;
    SelfNoW2FormIssued.value = null;
    DidNotWork.value = null;
    Other.value = null;
    OtherExplain.value = null;
    CBExplanation.value = null;
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_W2FormNoIssue_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_W2FormNoIssue_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    FederalTaxReturnFiled.value = null;
    Line7.value = null;
    Line1.value = null;
    CheckLine7.value = null;
    CheckLine1.value = null;
    NotReqFederalTaxReturn.value = null;
    SelfAttachW2Forms.value = null;
    SelfNoW2FormIssued.value = null;
    DidNotWork.value = null;
    Other.value = null;
    OtherExplain.value = null;
    CBExplanation.enabled=true;
} else{
  CBExplanation.value = null;
  CBExplanation.enabled=false;
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_CBExplanation_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_CBExplanation_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_SelfAttachW2Forms_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_SelfAttachW2Forms_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    FederalTaxReturnFiled.value = null;
    Line7.value = null;
    Line1.value = null;
    NotReqFederalTaxReturn.value = null;
    W2FormNoIssue.value = null;
    SelfNoW2FormIssued.value = null;
    DidNotWork.value = null;
    Other.value = null;
    OtherExplain.value = null;
    CBExplanation.value = null;
    CheckLine7.value = null;
    CheckLine1.value = null;
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_SelfNoW2FormIssued_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_SelfNoW2FormIssued_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    FederalTaxReturnFiled.value = null;
    Line7.value = null;
    Line1.value = null;
    CheckLine7.value = null;
    CheckLine1.value = null;
    NotReqFederalTaxReturn.value = null;
    W2FormNoIssue.value = null;
    SelfAttachW2Forms.value = null;
    DidNotWork.value = null;
    Other.value = null;
    OtherExplain.value = null;
    CBExplanation.value = null;
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_DidNotWork_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_DidNotWork_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    FederalTaxReturnFiled.value = null;
    Line7.value = null;
    Line1.value = null;
    CheckLine7.value = null;
    CheckLine1.value = null;
    NotReqFederalTaxReturn.value = null;
    W2FormNoIssue.value = null;
    SelfAttachW2Forms.value = null;
    SelfNoW2FormIssued.value = null;
    Other.value = null;
    OtherExplain.value = null;
    CBExplanation.value = null;
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_Other_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_Other_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    FederalTaxReturnFiled.value = null;
    Line7.value = null;
    Line1.value = null;
    CheckLine7.value = null;
    CheckLine1.value = null;
    NotReqFederalTaxReturn.value = null;
    W2FormNoIssue.value = null;
    SelfAttachW2Forms.value = null;
    SelfNoW2FormIssued.value = null;
    DidNotWork.value = null;
    OtherExplain.enabled = true;
    CBExplanation.value = null;
} else {
    OtherExplain.enabled = false;
    OtherExplain.value = null;
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_OtherExplain_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_OtherExplain_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_SupportingDocumentsPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    this.visible = true;
} else {
    this.visible = false;
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_supportDoc1_valueCommit0 = function (scope) {
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
        nonMedSupDocMessage.visible = false;
    }
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_supportDoc2_valueCommit0 = function (scope) {
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
        nonMedSupDocMessage.visible = false;
    }
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_supportDoc3_valueCommit0 = function (scope) {
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
        nonMedSupDocMessage.visible = false;
    }
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_StudentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (this.value == 1) {
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresponse) {
                studentSignature.value = firstName.value + " " + lastName.value;
                studentSignDate.value = myresponse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        studentSignDate.enabled = false;
        studentSignature.enabled = false;
    } else {
        studentSignDate.value = "";
        studentSignature.value = "";
    }
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_studentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_studentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_studentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_studentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_evaluator_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_evaluator_signChk_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToFinancialAid") {
    if (this.value == "1") {
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresponse) {
                staffSignature.value = myresponse.userName;
                staffSignDate.value = myresponse.SERVER_DATE;
                financialAidAssignee.value = myresponse.userId;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        staffSignDate.enabled = false;
        staffSignature.enabled = false;
    } else {
        staffSignDate.value = "";
        staffSignature.value = "";
        financialAidAssignee.value = "";
    }
}
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_staffSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_staffSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_staffSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_staffSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_w2_statement_student_w2_statement.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            getPdf();

function getPdf() {
    //console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, ' and'));
            jsonData.append('formPath', '/content/forms/af/student-w2-statement/student-w2-statement');
            //jsonData.append('fileName', "(" + hidden_cwid.value + ")" + "_" + Date.now());    
            jsonData.append('fileName', "(" + Date.now() + ")");      
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
 * @function student_w2_statement_student_w2_statement.generated_submit1608529416101_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_w2_statement_student_w2_statement.generated_submit1608529416101_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (FederalTaxReturnFiled.value === null && NotReqFederalTaxReturn.value === null && W2FormNoIssue.value === null && SelfAttachW2Forms.value === null && SelfNoW2FormIssued.value === null && DidNotWork.value === null && Other.value === null) {
    showErrorModal("Alert !", "Please select at least one option from the given categories");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].EmploymentStatusDetailsPanel[0]");
} else if (Other.value !== null && OtherExplain.value === null) {
    showErrorModal("Alert !", "Please enter the other document list");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].EmploymentStatusDetailsPanel[0].OtherExplain[0]");
} else if (FederalTaxReturnFiled.value !== null && CheckLine7.value === null && CheckLine1.value === null) {
  if(Year_Instructions.value == "visible"){
    showErrorModal("Alert !", "Please select at least one option from Filed Federal Tax Return");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].EmploymentStatusDetailsPanel[0].CheckLine7[0]");
  }else{
    showErrorModal("Alert !", "Please select the option from Filed Federal Tax Return");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].EmploymentStatusDetailsPanel[0].CheckLine7[0]");
  } 
} else if (CheckLine7.value !== null && Line7.value === null) {
    showErrorModal("Alert !", "Please enter the value");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].EmploymentStatusDetailsPanel[0].Line7[0]");
} else if (CheckLine1.value !== null && Line1.value === null) {
    showErrorModal("Alert !", "Please enter the value listed on line 1");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].EmploymentStatusDetailsPanel[0].Line1[0]");
} else {
    submitAction();
}
function submitAction() {
    aftiaDescCWID.value = firstName.value + " " + lastName.value + " " + cwid.value;
    EmailSubject.value = "Student W-2 Statement - (" + cwid.value + ")";
   // var testEmail = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
    var testEmail = "shreyas.manjunatha@thoughtfocus.com";
    HiddenStudentEmail.value = testEmail;
    guideBridge.submit();
}
        }
	}
}
