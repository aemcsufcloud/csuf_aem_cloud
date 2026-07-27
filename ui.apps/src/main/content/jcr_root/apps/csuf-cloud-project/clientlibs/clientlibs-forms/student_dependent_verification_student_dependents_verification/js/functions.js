/**
 * @function student_dependent_verification_student_dependents_verification.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    FinancialSignaturePanel.visible = false;
    $.getJSON("https://api.ipify.org?format=json", function(data) {
        ipAddress.value = data.ip;
    });
} else if (StageIndicator.value == "ToFinancialAid") {
    StudentInformation.enabled = false;
    if (formType.value == "CDA") {
        DependentsVerificationTab.visible = true;
        DependentsVerificationTab.enabled = false;
        CDAInstructionsTab.visible = true;
        CDAInstructionsTab.enabled = false;
        FAFSAInstructionsTab.visible = false;
    }
    if (formType.value == "FAFSA") {
        DependentsVerificationTab.visible = true;
        DependentsVerificationTab.enabled = false;
        CDAInstructionsTab.visible = false;
        FAFSAInstructionsTab.visible = true;
        FAFSAInstructionsTab.enabled = false;
    }
    StudentSignaturePanel.enabled = false;
    SupportingDocumentsPanel.visible = false;
    FinancialSignaturePanel.visible = true;
}
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var typeOfForm = getUrlParameters('formType');
    if (typeOfForm == "CDA") {
        formType.value = "CDA";
        DependentsVerificationTab.visible = true;
        CDAInstructionsTab.visible = true;
        FAFSAInstructionsTab.visible = false;
        loggedInDetails();
    } else if (typeOfForm == "FAFSA") {
        formType.value = "FAFSA";
        DependentsVerificationTab.visible = true;
        CDAInstructionsTab.visible = false;
        FAFSAInstructionsTab.visible = true;
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
            DependentsVerificationTab.visible = true;
            CDAInstructionsTab.visible = true;
            FAFSAInstructionsTab.visible = false;
            loggedInDetails();
        };
        document.getElementById("secondButton2").onclick = function() {
            modal.style.display = "none";
            formType.value = "FAFSA";
            DependentsVerificationTab.visible = true;
            CDAInstructionsTab.visible = false;
            FAFSAInstructionsTab.visible = true;
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
           //  var userValue = 'majesticallexi'; // one Aid Year
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
                lastName.value = response[0].LAST_NAME;
                firstName.value = response[0].FIRST_NAME;
                HiddenStudentUserID.value = response[0].USERID;
                cwid.value = response[0].EMPLID;
                studentIDNumber.value = response[0].EMPLID;
                HiddenStudentEmail.value = response[0].PREF_EMAIL;
                //HiddenStudentEmail.value = "yjayaram@fullerton.edu";
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
        aidYear.value = "2021";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;

        if (formType.value == "CDA") {
            formCode.value = "F0CDEP";
            formCodeVal = "F0CDEP";
            getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal);
        } else if (formType.value == "FAFSA") {
            formCode.value = "F0LDEP";
            formCodeVal = "F0LDEP";
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
            formCode.value = "F1CDEP";
            formCodeVal = "F1CDEP";
            getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal);
        } else if (formType.value == "FAFSA") {
            formCode.value = "F1LDEP";
            formCodeVal = "F1LDEP";
            getFAFSAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal);
        }
    };
}
function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";
    var formCodeVal = "";
    if (formType.value == "CDA" && typeOfAidYear == '0') {
        financialAidYearVal = "2021-2022";
        aidYear.value = "2021";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0CDEP";
        formCodeVal = "F0CDEP";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (formType.value == "CDA" && typeOfAidYear == '1') {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1CDEP";
        formCodeVal = "F1CDEP";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (formType.value == "FAFSA" && typeOfAidYear == '0') {
        financialAidYearVal = "2021-2022";
        aidYear.value = "2021";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0LDEP";
        formCodeVal = "F0LDEP";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (formType.value == "FAFSA" && typeOfAidYear == '1') {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1LDEP";
        formCodeVal = "F1LDEP";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else {
        financialAidYearVal = "2021-2022";
        aidYear.value = "2021";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "CDA") {
            formCode.value = "F0CDEP";
            formCodeVal = "F0CDEP";
            getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal);
        } else if (formType.value == "FAFSA") {
            formCode.value = "F0LDEP";
            formCodeVal = "F0LDEP";
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

function getCDAFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    var taxFilingYear = aidYear.value;
    var formCodeTextVal = "";
    if (formType.value == "CDA") {
        if (financialAidYear == "2021-2022") {
            formCodeTextVal = "<p><b>F0CDEP</b></p>";
        }
        if (financialAidYear == "2022-2023") {
            formCodeTextVal = "<p><b>F1CDEP</b></p>";
        }
    }
    if (formType.value == "FAFSA") {
        if (financialAidYear == "2021-2022") {
            formCodeTextVal = "<p><b>F0LDEP</b></p>";
        }
        if (financialAidYear == "2022-2023") {
            formCodeTextVal = "<p><b>F1LDEP</b></p>";
        }
    }
    var HeadingTextVal = "";
    if (financialAidYear == "2021-2022") {
        HeadingTextVal = "<p><b>STUDENT DEPENDENTS VERIFICATION (".concat(financialAidYearVal).concat(")<br>CA Dream Act Application</b></b></p>");
    }
    if (financialAidYear == "2022-2023") {
        HeadingTextVal = "<p><b>STUDENT DEPENDENTS VERIFICATION (".concat(financialAidYearVal).concat(")<br>CA Dream Act Application</b></b></p>");
    }
    var textOneVal = "";
    if (financialAidYear == "2021-2022") {
        textOneVal = "<p><b><u>INSTRUCTONS:</u></b> You listed one or more dependents other than a spouse in your household on your ".concat(financialAidYearVal).concat(" California Dream Act Application(CDA). In order for us to determine whether or not such individuals may be considered your “dependents” for financial aid purposes, you must provide the following information to verify and explain the relationships of each person to you. You must also have adequate income to provide for your own support and more than half of the support of the dependent(s) listed.&nbsp;<i>Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>");
    }
    if (financialAidYear == "2022-2023") {
        textOneVal = "<p><b><u>INSTRUCTONS:</u></b> You listed one or more dependents other than a spouse in your household on your ".concat(financialAidYearVal).concat(" California Dream Act Application(CDA). In order for us to determine whether or not such individuals may be considered your “dependents” for financial aid purposes, you must provide the following information to verify and explain the relationships of each person to you. You must also have adequate income to provide for your own support and more than half of the support of the dependent(s) listed.&nbsp;<i>Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>");
    }
    var textTwoVal = "";
    if (financialAidYear == "2021-2022") {
        /* textTwoVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue toreceive that support through June 26, ".concat(Year_StateRegVal).concat(" .</p>"); */

        textTwoVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue to receive that support through June 26, 2022 ".concat(" .</p>");
    }
    if (financialAidYear == "2022-2023") {
        /*  textTwoVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue toreceive that support through June 23, ".concat(Year_StateRegVal2).concat(" .</p>"); */

        textTwoVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue to receive that support through June 23, 2023 ".concat(" .</p>");
    }
    var textThreeVal = "";
    if (financialAidYear == "2021-2022") {
        /* textTwoVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue toreceive that support through June 26, ".concat(Year_StateRegVal).concat(" .</p>"); */

        textThreeVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue to receive that support through June 30, 2022 ".concat(" .</p>");
    }

    if (financialAidYear == "2022-2023") {
        /*  textTwoVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue toreceive that support through June 23, ".concat(Year_StateRegVal2).concat(" .</p>"); */

        textThreeVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue to receive that support through June 30, 2023 ".concat(" .</p>");
    }
    var textFourVal = "";
    if (financialAidYear == "2021-2022") {
        textFourVal = "<p>For each family member listed, provide the name of the college or university they are attending during Fall 2021 or Spring 2022 if they are enrolled in six (6) or more units per semester and the classes are leading to a degree or certificate.Do not include any person who will <b><i>not</i></b> continue to receive more than half of his or her support from you during the ".concat(financialAidYearVal).concat(" school year.</p>");
    }

    if (financialAidYear == "2022-2023") {
        textFourVal = "<p>For each family member listed, provide the name of the college or university they are attending during Fall 2022 or Spring 2023 if they are enrolled in six (6) or more units per semester and the classes are leading to a degree or certificate.Do not include any person who will <b><i>not</i></b> continue to receive more than half of his or her support from you during the ".concat(financialAidYearVal).concat(" school year.</p>");
    }
    var textFiveVal = "";
    if (financialAidYear == "2021-2022") {
        textFiveVal = "<p><b>Indicate all income from any source this person received in calendar year 2019*</b></p>";
    }

    if (financialAidYear == "2022-2023") {
        textFiveVal = "<p><b>Indicate all income from any source this person received in calendar year 2020*</b></p>";
    }
    var textSixVal = "";
    if (financialAidYear == "2021-2022") {
        textSixVal = "<p><b>Claimed on your 2019 taxes</b></p>";
    }
    if (financialAidYear == "2022-2023") {
        textSixVal = "<p><b>Claimed on your 2020 taxes</b></p>";
    }
    $("#formCodeText").html(formCodeTextVal);

    $("#f0cdepHeadingText").html(HeadingTextVal);

    $("#f0cdepTextOne").html(textOneVal);

    $("#f0cdepTextTwo").html(textTwoVal);

    $("#f0cdepTextThree").html(textThreeVal);

    $("#f0cdepTextFour").html(textFourVal);

    $("#f0cdepTextFive").html(textFiveVal);

    $("#f0cdepTextSix").html(textSixVal);

}
function getFAFSAFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    var taxFilingYear = aidYear.value;
    var formCodeTextVal = "";
    if (formType.value == "CDA") {
        if (financialAidYear == "2021-2022") {
            formCodeTextVal = "<p><b>F0CDEP</b></p>";
        }
        if (financialAidYear == "2022-2023") {
            formCodeTextVal = "<p><b>F1CDEP</b></p>";
        }
    }
    if (formType.value == "FAFSA") {
        if (financialAidYear == "2021-2022") {
            formCodeTextVal = "<p><b>F0LDEP</b></p>";
        }
        if (financialAidYear == "2022-2023") {
            formCodeTextVal = "<p><b>F1LDEP</b></p>";
        }
    }
    var HeadingTextVal = "";
    if (financialAidYear == "2021-2022") {
        HeadingTextVal = "<p><b>STUDENT DEPENDENTS VERIFICATION (".concat(financialAidYearVal).concat(")</p>");
    }
    if (financialAidYear == "2022-2023") {
        HeadingTextVal = "<p><b>STUDENT DEPENDENTS VERIFICATION (".concat(financialAidYearVal).concat(")</b></p>");
    }
    var textOneVal = "";
    if (financialAidYear == "2021-2022") {
        textOneVal = "<p><b><u>INSTRUCTONS:</u></b> You listed one or more dependents other than a spouse in your household on your ".concat(financialAidYearVal).concat(" California Dream Act Application(CDA). In order for us to determine whether or not such individuals may be considered your “dependents” for financial aid purposes, you must provide the following information to verify and explain the relationships of each person to you. You must also have adequate income to provide for your own support and more than half of the support of the dependent(s) listed.&nbsp;<i>Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>");
    }
    if (financialAidYear == "2022-2023") {
        textOneVal = "<p><b><u>INSTRUCTONS:</u></b> You listed one or more dependents other than a spouse in your household on your ".concat(financialAidYearVal).concat(" California Dream Act Application(CDA). In order for us to determine whether or not such individuals may be considered your “dependents” for financial aid purposes, you must provide the following information to verify and explain the relationships of each person to you. You must also have adequate income to provide for your own support and more than half of the support of the dependent(s) listed.&nbsp;<i>Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>");
    }
    var textTwoVal = "";
    if (financialAidYear == "2021-2022") {
        /* textTwoVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue toreceive that support through June 26, ".concat(Year_StateRegVal).concat(" .</p>"); */

        textTwoVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue to receive that support through June 26, 2022 ".concat(" .</p>");
    }
    if (financialAidYear == "2022-2023") {
        /*  textTwoVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue toreceive that support through June 23, ".concat(Year_StateRegVal2).concat(" .</p>"); */

        textTwoVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue to receive that support through June 23, 2023 ".concat(" .</p>");
    }
    var textThreeVal = "";
    if (financialAidYear == "2021-2022") {
        /* textTwoVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue toreceive that support through June 26, ".concat(Year_StateRegVal).concat(" .</p>"); */

        textThreeVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue to receive that support through June 30, 2022 ".concat(" .</p>");
    }
    if (financialAidYear == "2022-2023") {
        /*  textTwoVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue toreceive that support through June 23, ".concat(Year_StateRegVal2).concat(" .</p>"); */

        textThreeVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue to receive that support through June 30, 2023 ".concat(" .</p>");
    }
    var textFourVal = "";
    if (financialAidYear == "2021-2022") {
        textFourVal = "<p>For each family member listed, provide the name of the college or university they are attending during Fall 2021 or Spring 2022 if they are enrolled in six (6) or more units per semester and the classes are leading to a degree or certificate.Do not include any person who will <b><i>not</i></b> continue to receive more than half of his or her support from you during the ".concat(financialAidYearVal).concat(" school year.</p>");
    }
    if (financialAidYear == "2022-2023") {
        textFourVal = "<p>For each family member listed, provide the name of the college or university they are attending during Fall 2022 or Spring 2023 if they are enrolled in six (6) or more units per semester and the classes are leading to a degree or certificate.Do not include any person who will <b><i>not</i></b> continue to receive more than half of his or her support from you during the ".concat(financialAidYearVal).concat(" school year.</p>");
    }
    var textFiveVal = "";
    if (financialAidYear == "2021-2022") {
        textFiveVal = "<p><b>Indicate all income from any source this person received in calendar year 2019*</b></p>";
    }
    if (financialAidYear == "2022-2023") {
        textFiveVal = "<p><b>Indicate all income from any source this person received in calendar year 2020*</b></p>";
    }
    var textSixVal = "";
    if (financialAidYear == "2021-2022") {
        textSixVal = "<p><b>Claimed on your 2019 taxes?</b></p>";
    }
    if (financialAidYear == "2022-2023") {
        textSixVal = "<p><b>Claimed on your 2020 taxes?</b></p>";
    }
    $("#formCodeText").html(formCodeTextVal);

    $("#f0cdepHeadingText").html(HeadingTextVal);

    $("#f0cdepTextOne").html(textOneVal);

    $("#f0cdepTextTwo").html(textTwoVal);

    $("#f0cdepTextThree").html(textThreeVal);

    $("#f0cdepTextFour").html(textFourVal);

    $("#f0cdepTextFive").html(textFiveVal);

    $("#f0cdepTextSix").html(textSixVal);
}
function checkforDuplicateSubmissions(formCodeVal) {
    var tableName = "AEM_STUDENTS_DEPENDENTS";
    var financialAidDecisionColumnName = "FIN_AID_DECISION";
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
 * @function student_dependent_verification_student_dependents_verification.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var typeOfForm = getUrlParameters('formType');
    if (typeOfForm == "CDA") {
        formType.value = "CDA";
        DependentsVerificationTab.visible = true;
        CDAInstructionsTab.visible = true;
        FAFSAInstructionsTab.visible = false;
        loggedInDetails();
    } else if (typeOfForm == "FAFSA") {
        formType.value = "FAFSA";
        DependentsVerificationTab.visible = true;
        CDAInstructionsTab.visible = false;
        FAFSAInstructionsTab.visible = true;
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
            DependentsVerificationTab.visible = true;
            CDAInstructionsTab.visible = true;
            FAFSAInstructionsTab.visible = false;
            loggedInDetails();
        };
        document.getElementById("secondButton2").onclick = function() {
            modal.style.display = "none";
            formType.value = "FAFSA";
            DependentsVerificationTab.visible = true;
            CDAInstructionsTab.visible = false;
            FAFSAInstructionsTab.visible = true;
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
             //var userValue = 'veronica.maciel'; // two Aid Year
           //  var userValue = 'majesticallexi'; // one Aid Year
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
                lastName.value = response[0].LAST_NAME;
                firstName.value = response[0].FIRST_NAME;
                HiddenStudentUserID.value = response[0].USERID;
                cwid.value = response[0].EMPLID;
                studentIDNumber.value = response[0].EMPLID;
               // HiddenStudentEmail.value = response[0].PREF_EMAIL;
               HiddenStudentEmail.value = "shreyas.manjunatha@thoughtfocus.com";
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
        aidYear.value = financialAidvalues.AidYearOne-1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;

        if (formType.value == "CDA") {
            formCode.value = financialAidvalues.FinAidYearFormCodeOne+"CDEP";
            formCodeVal = financialAidvalues.FinAidYearFormCodeOne+"CDEP";
            getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
        } else if (formType.value == "FAFSA") {
            formCode.value = financialAidvalues.FinAidYearFormCodeOne+"LDEP";
            formCodeVal = financialAidvalues.FinAidYearFormCodeOne+"LDEP";
            getFAFSAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
        }

    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = financialAidvalues.FinAidYearTwo;
        aidYear.value = financialAidvalues.AidYearTwo-1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "CDA") {
            formCode.value = financialAidvalues.FinAidYearFormCodeTwo+"CDEP";
            formCodeVal = financialAidvalues.FinAidYearFormCodeTwo+"CDEP";
            getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
        } else if (formType.value == "FAFSA") {
            formCode.value = financialAidvalues.FinAidYearFormCodeTwo+"LDEP";
            formCodeVal = financialAidvalues.FinAidYearFormCodeTwo+"LDEP";
            getFAFSAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
        }
    };
}
function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";
    var formCodeVal = "";
    
    //var financialAidvalues = getAidYearValuesOnSingleAidYear();
    var financialAidvalues = getAidYearValuesOnSingleAidYearUpdated();
     
    if (formType.value == "CDA" && typeOfAidYear == '0') {
        financialAidYearVal = financialAidvalues.FinAidYearZero;
        aidYear.value = financialAidvalues.AidYearZero-1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0CDEP";
        formCodeVal = "F0CDEP";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
    } else if (formType.value == "CDA" && typeOfAidYear == '1') {
        financialAidYearVal = financialAidvalues.FinAidYearOne;
        aidYear.value = financialAidvalues.AidYearOne-1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1CDEP";
        formCodeVal = "F1CDEP";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
    } else if (formType.value == "FAFSA" && typeOfAidYear == '0') {
        financialAidYearVal = financialAidvalues.FinAidYearZero;
        aidYear.value = financialAidvalues.AidYearZero-1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0LDEP";
        formCodeVal = "F0LDEP";
        getFAFSAFinancialAidYear(aidYearValue);
        ccheckforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
    } else if (formType.value == "FAFSA" && typeOfAidYear == '1') {
        financialAidYearVal = financialAidvalues.FinAidYearOne;
        aidYear.value = financialAidvalues.AidYearOne-1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1LDEP";
        formCodeVal = "F1LDEP";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
    } else {
        financialAidYearVal = financialAidvalues.FinAidYearGeneral;
        aidYear.value = financialAidvalues.AidYearGeneral-1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "CDA") {
            formCode.value = financialAidvalues.FormCodeGeneral+"CDEP";
            formCodeVal = financialAidvalues.FormCodeGeneral+"CDEP";
            getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
        } else if (formType.value == "FAFSA") {
            formCode.value = financialAidvalues.FormCodeGeneral+"LDEP";
            formCodeVal = financialAidvalues.FormCodeGeneral+"LDEP";
            getFAFSAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
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

function getCDAFinancialAidYear(financialAidYear) {
  
    var financialAidYearVal = financialAidYear;
    var taxFilingYear = aidYear.value;
    var taxFilingYear2 = taxFilingYear-2;
    var formCodeTextValue = formCode.value;
  
    var textOneVal = "";
    var textFourVal = "";
    
    var aidYearVal = aidYear.value;
    var textChange = getUniqueStatements("STUDENT_DEPENDENTS_VERIFICATION",aidYearVal,""); 
    
    var RegulationDateTextTwoChange = textChange.RegulationDateTextTwo; //CDA Date
    var RegulationDateTextThreeChange = textChange.RegulationDateTextThree; //FAFSA Date
    var AcademicYearTextFourChange = textChange.AcademicYearTextFour; 
  
    Year_Heading.value="STUDENT DEPENDENTS VERIFICATION (" +financialAidYearVal+ ")";
    Year_InstructionsCDA.value=financialAidYearVal;
    Year_Regulations.value=RegulationDateTextTwoChange; //CDA Date
    Year1_Semester.value=AcademicYearTextFourChange;
    Year_AcademicYear.value=financialAidYearVal;
  
    var formCodeTextVal = "<p><b> ".concat(formCodeTextValue).concat(" </b></p>");

    var HeadingTextVal = "<p><b>STUDENT DEPENDENTS VERIFICATION (".concat(financialAidYearVal).concat(")<br>CA Dream Act Application</b></b></p>");
    
    if (aidYear.value=="2024"){
      textOneVal = "<p><b><u>INSTRUCTONS:</u></b> You listed one or more dependents other than a spouse in your household on your ".concat(financialAidYearVal).concat(" California Dream Act Application(CADAA). In order for us to determine whether or not such individuals may be considered your “dependents” for financial aid purposes, you must provide the following information to verify and explain the relationships of each person to you. You must also have adequate income to provide for your own support and more than half of the support of the dependent(s) listed.&nbsp;<i>Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>");
      textFourVal = "<p>For each family member listed, provide the name, date of birth, relationship, and income.<br>Do not include any person who will <b><i>not</i></b> continue to receive more than half of his or her support from you during the ".concat(financialAidYearVal).concat(" school year.</p>");
      DependentsVerificationTab.Table_2.visible=false;
      headerItem16499272624211649927263311.visible=false;
      ListCollege.visible=false;
      tableItem16502684238441650268425726.visible=false;
      tableItem16609026816741660902682589.visible=false;
      CollegeList.visible=false;
      
    } else {
      textOneVal = "<p><b><u>INSTRUCTONS:</u></b> You listed one or more dependents other than a spouse in your household on your ".concat(financialAidYearVal).concat(" California Dream Act Application(CDA). In order for us to determine whether or not such individuals may be considered your “dependents” for financial aid purposes, you must provide the following information to verify and explain the relationships of each person to you. You must also have adequate income to provide for your own support and more than half of the support of the dependent(s) listed.&nbsp;<i>Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>");
      textFourVal = "<p>For each family member listed, provide the name of the college or university they are attending during ".concat(AcademicYearTextFourChange).concat(" if they are enrolled in six (6) or more units per semester and the classes are leading to a degree or certificate.Do not include any person who will <b><i>not</i></b> continue to receive more than half of his or her support from you during the ".concat(financialAidYearVal).concat(" school year.</p>"));
      DependentsVerificationTab.Table_2.visible=true;
    }
    
    
    var textTwoVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue to receive that support through ".concat(RegulationDateTextTwoChange).concat(" .</p>");
    
    var textThreeVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue to receive that support through ".concat(RegulationDateTextThreeChange).concat(" .</p>");
           
    var textFiveVal = "<p><b>Indicate all income from any source this person received in calendar year ".concat(taxFilingYear2).concat("*</b></p>");

    var textSixVal = "<p><b>Claimed on your ".concat(taxFilingYear2).concat(" taxes</b></p>");
 
    $("#formCodeText").html(formCodeTextVal);

    $("#f0cdepHeadingText").html(HeadingTextVal);

    $("#f0cdepTextOne").html(textOneVal);

    $("#f0cdepTextTwo").html(textTwoVal);

    $("#f0cdepTextThree").html(textThreeVal);

    $("#f0cdepTextFour").html(textFourVal);

    $("#f0cdepTextFive").html(textFiveVal);

    $("#f0cdepTextSix").html(textSixVal);

}
function getFAFSAFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    var taxFilingYear = aidYear.value;
    var taxFilingYear2 = taxFilingYear-2;
    var formCodeTextValue = formCode.value;
    var textOneVal = "";
    var textFourVal = "";
    
    var aidYearVal = aidYear.value;
    var textChange = getUniqueStatements("STUDENT_DEPENDENTS_VERIFICATION",aidYearVal,""); 
    
    var RegulationDateTextTwoChange = textChange.RegulationDateTextTwo; //CDA Date
    var RegulationDateTextThreeChange = textChange.RegulationDateTextThree; //FAFSA Date
    var AcademicYearTextFourChange = textChange.AcademicYearTextFour; 
  
    Year_Heading.value="STUDENT DEPENDENTS VERIFICATION (" +financialAidYearVal+ ")";
    Year_InstructionsCDA.value=financialAidYearVal;
    Year_Regulations.value=RegulationDateTextThreeChange; //FAFSA Date
    Year1_Semester.value=AcademicYearTextFourChange;
    Year_AcademicYear.value=financialAidYearVal;
  
    var formCodeTextVal = "<p><b> ".concat(formCodeTextValue).concat(" </b></p>");

    var HeadingTextVal = "<p><b>STUDENT DEPENDENTS VERIFICATION (".concat(financialAidYearVal).concat(")</b></p>");
  
     if (aidYear.value=="2024"){
      textOneVal = textOneVal = "<p><b><u>INSTRUCTIONS:</u></b>&nbsp; You are only dependent because you are indicated that you have dependents other than spouse or children. In order for us to determine your “dependents” for financial aid purposes, you must provide the following information to verify and explain the relationships of each person to you. You must also have adequate income to provide for your own support and more than half of the support of the dependent(s) listed. Please provide complete information.&nbsp;<i>Incomplete documents will not be returned to you.They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>";
      textFourVal = "<p>For each family member listed, provide the name, date of birth, relationship, and income.<br>Do not include any person who will <b><i>not</i></b> continue to receive more than half of his or her support from you during the ".concat(financialAidYearVal).concat(" school year.</p>");
      DependentsVerificationTab.Table_2.visible=false;
      headerItem16499272624211649927263311.visible=false;
      ListCollege.visible=false;
      tableItem16502684238441650268425726.visible=false;
      tableItem16609026816741660902682589.visible=false;
      CollegeList.visible=false;
      
    } else {
      textOneVal = "<p><b><u>INSTRUCTIONS:</u></b>&nbsp; In order for us to determine your “dependents” for financial aid purposes, you must provide the following information to verify and explain the relationships of each person to you. You must also have adequate income to provide for your own support and more than half of the support of the dependent(s) listed. Please provide complete information.&nbsp;<i>Incomplete documents will not be returned to you.They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>";
      textFourVal = "<p>For each family member listed, provide the name of the college or university they are attending during ".concat(AcademicYearTextFourChange).concat(" if they are enrolled in six (6) or more units per semester and the classes are leading to a degree or certificate.Do not include any person who will <b><i>not</i></b> continue to receive more than half of his or her support from you during the ".concat(financialAidYearVal).concat(" school year.</p>"));
      DependentsVerificationTab.Table_2.visible=true;
    }    
    
    var textTwoVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue to receive that support through ".concat(RegulationDateTextTwoChange).concat(" .</p>");
    
    var textThreeVal = " 2. any other person who lives with you, receives more than half of his or her support from you, and will continue to receive that support through ".concat(RegulationDateTextThreeChange).concat(" .</p>");
    
    
    var textFiveVal = "<p><b>Indicate all income from any source this person received in calendar year ".concat(taxFilingYear2).concat("*</b></p>");

    var textSixVal = "<p><b>Claimed on your ".concat(taxFilingYear2).concat(" taxes</b></p>");
 
    $("#formCodeText").html(formCodeTextVal);

    $("#f0cdepHeadingText").html(HeadingTextVal);

    $("#f0ldepTextOne").html(textOneVal);

    $("#f0cdepTextTwo").html(textTwoVal);

    $("#f0cdepTextThree").html(textThreeVal);

    $("#f0cdepTextFour").html(textFourVal);

    $("#f0cdepTextFive").html(textFiveVal);

    $("#f0cdepTextSix").html(textSixVal);

}

function checkforDuplicateSubmissions(formCodeVal, financialAidYearVal) {
    var tableName = "AEM_STUDENTS_DEPENDENTS";
    var financialAidDecisionColumnName = "FIN_AID_DECISION";
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
 * @function student_dependent_verification_student_dependents_verification.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_caseId_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_caseId_init1 = function (scope) {
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
 * @function student_dependent_verification_student_dependents_verification.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_Date_1_init0 = function (scope) {
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
 * @function student_dependent_verification_student_dependents_verification.generated_Date_1_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_Date_1_init1 = function (scope) {
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
 * @function student_dependent_verification_student_dependents_verification.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_CheckBox_Dependent_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_CheckBox_Dependent_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (this.value == 1) {
      
        cdaAddButton.enabled = false;
        cdaRemoveButton.enabled = false;
      
        Row2.instanceManager.instances[0].DependentName.value = "";
        Row2.instanceManager.instances[0].DependentName.enabled = false;
        Row2.instanceManager.instances[0].DOBDependent.value = "";
        Row2.instanceManager.instances[0].DOBDependent.enabled = false;
        Row2.instanceManager.instances[0].Relationship.value = "";
        Row2.instanceManager.instances[0].Relationship.enabled = false;
        Row2.instanceManager.instances[0].TotalIncome.value = "";
        Row2.instanceManager.instances[0].TotalIncome.enabled = false;
        Row2.instanceManager.instances[0].Source.value = "";
        Row2.instanceManager.instances[0].Source.enabled = false;
        Row2.instanceManager.instances[0].TaxRadioButtonList.value = "";
        Row2.instanceManager.instances[0].TaxRadioButtonList.enabled = false;
        Row2.instanceManager.instances[0].CollegeList.value = "";
        Row2.instanceManager.instances[0].CollegeList.enabled = false;
        var rowcountRemoveAll1 = Row2.instanceManager.instanceCount;
        if (rowcountRemoveAll1 !== null) {
            for (var k = 0; k < rowcountRemoveAll1; k++) {
                Row2.instanceManager.removeInstance(Row2.instanceIndex);
            }
        }
    } else {
        DependentName.enabled = true;
        DOBDependent.enabled = true;
        Relationship.enabled = true;
        TotalIncome.enabled = true;
        Source.enabled = true;
        TaxRadioButtonList.enabled = true;
        CollegeList.enabled = true;
      
        cdaAddButton.enabled = true;
        cdaRemoveButton.enabled = true;
    }
}
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_headerItem16499272624211649927263311_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_headerItem16499272624211649927263311_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (aidYear.value == "2024") {
  this.visible = false;
}
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_ListCollege_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_ListCollege_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (aidYear.value == "2024") {
  this.visible = false;
}
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_tableItem16502684238441650268425726_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_tableItem16502684238441650268425726_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (aidYear.value == "2024") {
  this.visible = false;
}
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_tableItem16609026816731660902682566_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_tableItem16609026816731660902682566_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_tableItem16609026816741660902682589_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_tableItem16609026816741660902682589_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (aidYear.value == "2024") {
  this.visible = false;
}
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_CollegeList_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_CollegeList_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (aidYear.value == "2024") {
  this.visible = false;
}
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_cdaAddButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_cdaAddButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var rowcount = Row2.instanceManager.instanceCount;
    var lastRow = rowcount - 1;
    if (RemoveRecordFlag.value == "1") {
        addRowsAfterRemove(lastRow);
    } else {
        addRows();
    }
}
function addRows() {
  debugger;
  if((aidYear.value == "2024") && (DependentName.value !== null)) {
    Row2.instanceManager.addInstance(); 
  } else if ((DependentName.value !== null) && (DOBDependent.value !== null) && (Relationship.value !== null) && (TotalIncome.value !== null) && (Source.value !== null) && (TaxRadioButtonList.value !== null) && (CollegeList.value !== null)) {
        Row2.instanceManager.addInstance();
    } else {
        showErrorModal("Alert !", "Enter the record before adding a new row");
    }
}
function addRowsAfterRemove(lastRow) {
  debugger;
    if((aidYear.value == "2024") && (Row2.instanceManager.instances[lastRow]._children[0].value !== null)) {  
        Row2.instanceManager.addInstance();
    } else if ((Row2.instanceManager.instances[lastRow]._children[0].value !== null) && (Row2.instanceManager.instances[lastRow]._children[1].value !== null) && (Row2.instanceManager.instances[lastRow]._children[2].value !== null) && (Row2.instanceManager.instances[lastRow]._children[3].value !== null) && (Row2.instanceManager.instances[lastRow]._children[4].value !== null) && (Row2.instanceManager.instances[lastRow]._children[5].value !== null) && (Row2.instanceManager.instances[lastRow]._children[6].value !== null)) {
        Row2.instanceManager.addInstance();
    } else {
        showErrorModal("Alert !", "Enter the record before adding a new row");
    }
}


        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_cdaRemoveButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_cdaRemoveButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var rowCount = Row2.instanceManager.instanceCount;
    if (rowCount == 1) {
        showErrorModal("Alert !", "Add a new row to remove");
    } else {
        Row2.instanceManager.removeInstance(Row2.instanceManager.instanceCount - 1);
    }
    RemoveRecordFlag.value = "1";
}
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_SupportingDocumentsPanel_init0 = function (scope) {
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
 * @function student_dependent_verification_student_dependents_verification.generated_NonMedicalSupportingDocument1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_NonMedicalSupportingDocument1_valueCommit0 = function (scope) {
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
 * @function student_dependent_verification_student_dependents_verification.generated_NonMedicalSupportingDocument2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_NonMedicalSupportingDocument2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc2.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[&{}#!@$%^=;\[\]]/;
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
 * @function student_dependent_verification_student_dependents_verification.generated_NonMedicalSupportingDocument3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_NonMedicalSupportingDocument3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc3.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[&{}#!@$%^=;\[\]]/;
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
 * @function student_dependent_verification_student_dependents_verification.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_StudentCB_valueCommit0 = function (scope) {
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
 * @function student_dependent_verification_student_dependents_verification.generated_ipAddress_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_ipAddress_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;

        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_studentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_studentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_studentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_studentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_evaluator_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_evaluator_signChk_valueCommit0 = function (scope) {
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
 * @function student_dependent_verification_student_dependents_verification.generated_staffSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_staffSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_staffSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_staffSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_dependent_verification_student_dependents_verification.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            getPdf();

function getPdf() {
    //console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, ' and'));
            jsonData.append('formPath', '/content/forms/af/student-dependent-verification/student-dependents-verification');
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
 * @function student_dependent_verification_student_dependents_verification.generated_submit1608529416101_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_dependent_verification_student_dependents_verification.generated_submit1608529416101_click0 = function (scope) {
    with(this) {
        with(scope) {
            if ((formType.value === "CDA") && (CDAInstructionsCheck.value === null)) {
        CDAInstructionsCheck.mandatory = true;
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAInstructionsTab[0].CDAInstructionsCheck[0]"); 
        showErrorModal("Alert", "Please read the Instructions carefully & check the Checkbox below");
}else if ((formType.value === "FAFSA") && (FAFSAInstructionsCheck.value === null) )  {
        FAFSAInstructionsCheck.mandatory = true;
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAInstructionsTab[0].FAFSAInstructionsCheck[0]");
        showErrorModal("Alert", "Please read the Instructions carefully & check the Checkbox below");
} else if (CheckBox_Dependent.value === null) {
    if (RemoveRecordFlag.value == "1") {
        withRemoveValidation();
    } else {
        withoutRemoveValidation();
    }
} else {
    submitAction();
}
function withoutRemoveValidation() {
    if (DependentName.value === null) {
        showErrorModal("Alert", "Please enter the record");
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].DependentsVerificationTab[0]");
    } else if ((DependentName.value !== null) && (DOBDependent.value !== null) && (Relationship.value !== null) && (TotalIncome.value !== null) && (Source.value !== null) && (TaxRadioButtonList.value === null && CollegeList.value !== null)) {
        showErrorModal("Alert", "Please select yes/no if you claimed your tax");
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].DependentsVerificationTab[0]");
    } else {
        if (DependentName.value !== null) {
            DOBDependent.mandatory = true;
            Relationship.mandatory = true;
            TotalIncome.mandatory = true;
            Source.mandatory = true;
            CollegeList.mandatory = true;
        }
        submitAction();
    }
}
function withRemoveValidation() {
    var RowCount = Row2.instanceManager.instanceCount;
    var LastRow = RowCount - 1;
    if ((Row2.instanceManager.instances[LastRow]._children[0].value !== null) && (Row2.instanceManager.instances[LastRow]._children[1].value !== null) && (Row2.instanceManager.instances[LastRow]._children[3].value !== null) && (Row2.instanceManager.instances[LastRow]._children[4].value !== null) && (Row2.instanceManager.instances[LastRow]._children[5].value === null) && (Row2.instanceManager.instances[LastRow]._children[6].value !== null)) {
        showErrorModal("Alert", "Please select yes/no if you clamied yor tax");
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].DependentsVerificationTab[0]");
    } else if (Row2.instanceManager.instances[LastRow]._children[0].value === null) {
        showErrorModal("Alert", "Please enter the record");
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].DependentsVerificationTab[0]");
    } else {
        submitAction();
    }
}
function submitAction() {
    aftiaDescCWID.value = HiddenStudentName.value + " " + cwid.value;
    EmailSubject.value = "Test - Student Dependents Verification -" + " " + cwid.value;
    HiddenStudentEmail.value = "shreyas.manjunatha@thoughtfocus.com";

    guideBridge.submit();
}
        }
	}
}
