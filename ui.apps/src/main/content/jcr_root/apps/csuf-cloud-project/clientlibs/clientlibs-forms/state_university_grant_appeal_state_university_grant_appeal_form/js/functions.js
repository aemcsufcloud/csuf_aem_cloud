/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_guideRootPanel_init0 = function (scope) {
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
            // var userValue = 'majesticallexi'; // one Aid Year
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
               // var studentCWID = "885269399"; //EOP Student
                getStudentAidYearDetails(studentCWID);
                //var aidYearFlag = getStudentAidYearDetails(studentCWID);
                firstName.value = response[0].FIRST_NAME;
                lastName.value = response[0].LAST_NAME;
                StudentUserId.value = response[0].USERID;
                studentIDNumber.value = studentCWID;
                cwid.value = studentCWID;
                SCwid.value = studentCWID;
                //StudentEmail.value = response[0].student_Email;
                StudentEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
                StudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                Name.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                Address.value = response[0].ADDRESS1;
                TelephonNumber.value = response[0].CELL_PHONE;
                City.value = response[0].CITY;
                State.value = response[0].STATE;
                Zip.value = response[0].POSTAL;
                firstName.enabled = false;
                lastName.enabled = false;
                cwid.enabled = false;
                financialAidYear.enabled = false;
                getCurrentMajor(studentCWID);
                //getEOPCounselorData(studentCWID);
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
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0SUGA";
        formCodeVal = "F0SUGA";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = "2022-2023";
        aidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1SUGA";
        formCodeVal = "F1SUGA";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
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
        formCode.value = "F0SUGA";
        formCodeVal = "F0SUGA";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1SUGA";
        formCodeVal = "F1SUGA";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    } else {
        financialAidYearVal = "2022-2023";
        aidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1SUGA";
        formCodeVal = "F1SUGA";
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
    var taxFilingYear = aidYear.value;
    var headingTextVal = "";
    if (financialAidYear == "2021-2022") {
        headingTextVal = "<p><b>2021-2022 STATE UNIVERSITY GRANT APPEAL FORM</b></p>";
    }
    if (financialAidYear == "2022-2023") {
        headingTextVal = "<p><b>2022-2023 STATE UNIVERSITY GRANT APPEAL FORM</b></p>";
    }

    var declarationTextOne = "";
    if (financialAidYear == "2021-2022") {
        declarationTextOne = "<i>(Deadline to appeal for Fall 2021 is 10/28/21; Deadline to appeal for Spring 2022 is 04/7/2022)</i>";
    }
    if (financialAidYear == "2022-2023") {
        declarationTextOne = "<i>(Deadline to appeal for Fall 2022 is 10/48/22; Deadline to appeal for Spring 2023 is 04/6/2023)</i>";
    }

    var formTextVal = "";
    if (financialAidYear == "2021-2022") {
        formTextVal = "<p><b>F0SUGA</b></p>";
    }
    if (financialAidYear == "2022-2023") {
        formTextVal = "<p><b>F1SUGA</b></p>";
    }

    var awardYearTextVal = "";
    if (financialAidYear == "2021-2022") {
        awardYearTextVal = "<p><b>Effective 21/22 award year, undergraduate students may appeal for a one-term (ONLY) extension of State University Grant Eligibility with a documented plan to finish the degree/program within one remaining term.</b></p>";
    }
    if (financialAidYear == "2022-2023") {
        awardYearTextVal = "<p><b>Effective 22/23 award year, undergraduate students may appeal for a one-term (ONLY) extension of State University Grant Eligibility with a documented plan to finish the degree/program within one remaining term.</b></p>";
    }


    var declarationTextTwo = "";
    if (financialAidYear == "2021-2022") {
        declarationTextTwo = "# units Summer 2021:";
    }
    if (financialAidYear == "2022-2023") {
        declarationTextTwo = "# units Summer 2022:";
    }

    var declarationTextThree = "";
    if (financialAidYear == "2021-2022") {
        declarationTextThree = "units/Fall 2021:";
    }
    if (financialAidYear == "2022-2023") {
        declarationTextThree = "units/Fall 2022:";
    }

    var declarationTextFour = "";
    if (financialAidYear == "2021-2022") {
        declarationTextFour = "units/Spring 2022:";
    }
    if (financialAidYear == "2022-2023") {
        declarationTextFour = "units/Spring 2023:";
    }

    $("#FormText").html(formTextVal);
    $("#ASAPHeadingText").html(headingTextVal);
    $("#ASAPSubheading").html(declarationTextOne);
    $("#AwardYearText").html(awardYearTextVal);
    $("#ASAPSummerUnitText").html(declarationTextTwo);
    $("#ASAPFallUnitText").html(declarationTextThree);
    $("#ASAPSpringUnitText").html(declarationTextFour);

}

function getCurrentMajor(cwid) {
    $.ajax({
        type: 'GET',
        url: "/bin/SAPAppealServlet",

        data: {
            cwid: cwid,
            action: "SAP_MAJOR_DATA"
        },

        dataType: 'json',
        success: function(response) {
            if (response.length == 1) {
                CurrentMajor.value = response[0].PROGRAMS;
                DegreeObjective.value = response[0].DEGREE;
            }
        },
        error: function(error) {
            alert("error block=" + error);
        }

    });
}

function checkforDuplicateSubmissions(formCodeVal) {

    var tableName = "AEM_STATE_UNIV_GRANT_APPEAL";
    var financialAidDecisionColumnName = "FINANCIAL_AID_DECISION";
    var formCodeColumnName = "FORM_CODE";
    var faDecision = "Approved";
    var financialAidYearColumn = "FINANCIAL_AID_YEAR";
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
                financialAidYearColumn: financialAidYearColumn,
                financialAidYear: financialAidYear.value
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

/*function getEOPCounselorData(cwid) {
    $.ajax({
        type: 'GET',
        url: "/bin/SAPAppealServlet",

        data: {
            cwid: cwid,
            action: "SAP_EOP_DATA"
        },

        dataType: 'json',
        success: function(response) {
            if (response.length == 1) {
                EOPManualFlag.value = "false";
                EOPName.value = response[0].COORDINATOR_FIRSTNAME + " " + response[0].COORDINATOR_LASTNAME + "-" + response[0].COORDINATOR_EMAILID;
                EOPCounselorName.value = response[0].COORDINATOR_FIRSTNAME + " " + response[0].COORDINATOR_LASTNAME;
                EOPUserID.value = response[0].COORDINATOR_USERID;
                EOPEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
                EOPEmpID.value = response[0].EMPLID;
                EopPanel.visible = true;
                EopPanel.enabled = false;
                EOPStudent.enabled = false;
            }
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}*/
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {  
  
    EOPSignaturePanel.visible=false;
    FinancialAidSignaturePanel.visible=false;
  	
  	$.getJSON("https://api.ipify.org?format=json", function(data) {                
        ipAddress.value = data.ip;            	
    });
  
}

if(StageIndicator.value=="ToEOP"){
  StudentInformation.visible=true;
  StudentInformation.enabled=false;
  
  Instructions_2021.visible=true;
  Instructions_2021.enabled=false;

  StudentSignaturePanel.visible=true;
  StudentSignaturePanel.enabled=false;
  FinancialAidSignaturePanel.visible=false;
  SupportingDocumentsPanel.visible = false;

  EopPanel.visible=true;
  EopPanel.enabled=false; 
  EOPSignaturePanel.visible=true;
  EOPSignaturePanel.enabled=true;
}


if(StageIndicator.value=="ToFinancialAid"){
  StudentInformation.visible=true;
  StudentInformation.enabled=false;
  
  Instructions_2021.visible=true;
  Instructions_2021.enabled=false;

  StudentSignaturePanel.visible=true;
  StudentSignaturePanel.enabled=false;
  FinancialAidSignaturePanel.visible=true;
  FinancialAidSignaturePanel.enabled=true;
  SupportingDocumentsPanel.visible = false;
  if(YesCB.value == "1"){
  EopPanel.visible=true;
  EopPanel.enabled=false; 
  EOPSignaturePanel.visible=true;
  EOPSignaturePanel.enabled=false;
  }else{
  EOPSignaturePanel.visible=false;
  EOPSignaturePanel.enabled=false;
  }
}
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_guideRootPanel_init2 = function (scope) {
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
               // var studentCWID = "885269399"; //EOP Student
                getStudentAidYearDetails(studentCWID);
                //var aidYearFlag = getStudentAidYearDetails(studentCWID);
                firstName.value = response[0].FIRST_NAME;
                lastName.value = response[0].LAST_NAME;
                StudentUserId.value = response[0].USERID;
                studentIDNumber.value = studentCWID;
                cwid.value = studentCWID;
                SCwid.value = studentCWID;
                //StudentEmail.value = response[0].student_Email;
                StudentEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                StudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                Name.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                Address.value = response[0].ADDRESS1;
                TelephonNumber.value = response[0].CELL_PHONE;
                City.value = response[0].CITY;
                State.value = response[0].STATE;
                Zip.value = response[0].POSTAL;
                firstName.enabled = false;
                lastName.enabled = false;
                cwid.enabled = false;
                financialAidYear.enabled = false;
                getCurrentMajor(studentCWID);
                //getEOPCounselorData(studentCWID);
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
        aidYear.value = financialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FinAidYearFormCodeOne+"SUGA";
        formCodeVal = financialAidvalues.FinAidYearFormCodeOne+"SUGA";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = financialAidvalues.FinAidYearTwo;
        aidYear.value = financialAidvalues.AidYearTwo;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value =  financialAidvalues.FinAidYearFormCodeTwo+"SUGA";
        formCodeVal =  financialAidvalues.FinAidYearFormCodeTwo+"SUGA";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
    };
}

function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";
    var formCodeVal = "";
  
    //var financialAidvalues = getAidYearValuesOnSingleAidYear();
    var financialAidvalues = getAidYearValuesOnSingleAidYearUpdated(); 
  
    if (typeOfAidYear == '0') {
        financialAidYearVal = financialAidvalues.FinAidYearZero;
        aidYear.value = financialAidvalues.AidYearZero;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0SUGA";
        formCodeVal = "F0SUGA";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = financialAidvalues.FinAidYearOne;
        aidYear.value = financialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1SUGA";
        formCodeVal = "F1SUGA";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
    } else {
        financialAidYearVal = financialAidvalues.FinAidYearGeneral;
        aidYear.value = financialAidvalues.AidYearGeneral;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FormCodeGeneral+"SUGA";
        formCodeVal = financialAidvalues.FormCodeGeneral+"SUGA";
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
    var taxFilingYear = aidYear.value-1;
  
    var aidYearVal = aidYear.value;
    var textChange = getUniqueStatements("STATE_UNIV_GRANT_APPEAL",aidYearVal,""); 
  
    var declarationTextOneChange = textChange.TextOne;
    var AwardYearTextChange = textChange.AwardYearText;
  
    var headingTextVal = "<p><b>".concat(financialAidYear).concat(" STATE UNIVERSITY GRANT APPEAL FORM</b></p>");

    var declarationTextOne = "<i>".concat(declarationTextOneChange).concat("</i>");

    var formTextVal = "<p><b>"+formCode.value+"</b></p>";

    var awardYearTextVal = "<p><b>Effective ".concat(AwardYearTextChange).concat(" award year, undergraduate students may appeal for a one-term (ONLY) extension of State University Grant Eligibility with a documented plan to finish the degree/program within one remaining term.</b></p>");

   // var declarationTextTwo = "# units Summer ".concat(taxFilingYear).concat(":");
    var declarationTextTwo;
    var declarationTextThree;
    if(aidYear.value == "2024"){
    declarationTextTwo = "Summer ".concat(taxFilingYear).concat(":");
    declarationTextThree = "units/Fall ".concat(taxFilingYear).concat(":");
    Summer2022Units.visible = true;
    }else{
     declarationTextTwo = "";
     declarationTextThree = "Fall ".concat(taxFilingYear).concat(":");
     Summer2022Units.visible = false;
    }
 
   // var declarationTextThree = "units/Fall ".concat(taxFilingYear).concat(":");

    var declarationTextFour = "units/Spring ".concat(aidYearVal).concat(":");
  
    Heading_Year.value=financialAidYear+" STATE UNIVERSITY GRANT APPEAL";
    Deadline.value=declarationTextOneChange;
    Award_Year.value=AwardYearTextChange;
    Summer_Year.value=taxFilingYear;
    Fall_Year.value=taxFilingYear;
    Spring_Year.value=aidYearVal;

    $("#FormText").html(formTextVal);
    $("#ASAPHeadingText").html(headingTextVal);
    $("#ASAPSubheading").html(declarationTextOne);
    $("#AwardYearText").html(awardYearTextVal);
    $("#ASAPSummerUnitText").html(declarationTextTwo);
    $("#ASAPFallUnitText").html(declarationTextThree);
    $("#ASAPSpringUnitText").html(declarationTextFour);

}

function getCurrentMajor(cwid) {
    $.ajax({
        type: 'GET',
        url: "/bin/SAPAppealServlet",

        data: {
            cwid: cwid,
            action: "SAP_MAJOR_DATA"
        },

        dataType: 'json',
        success: function(response) {
            if (response.length == 1) {
                CurrentMajor.value = response[0].PROGRAMS;
                DegreeObjective.value = response[0].DEGREE;
            }
        },
        error: function(error) {
            alert("error block=" + error);
        }

    });
}

function checkforDuplicateSubmissions(formCodeVal, financialAidYearVal) {

    var tableName = "AEM_STATE_UNIV_GRANT_APPEAL";
    var financialAidDecisionColumnName = "FINANCIAL_AID_DECISION";
    var formCodeColumnName = "FORM_CODE";
    var faDecision = "Approved";
    var financialAidYearColumn = "FINANCIAL_AID_YEAR";
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
                financialAidYearColumn: financialAidYearColumn,
                financialAidYear: financialAidYear.value
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

/*function getEOPCounselorData(cwid) {
    $.ajax({
        type: 'GET',
        url: "/bin/SAPAppealServlet",

        data: {
            cwid: cwid,
            action: "SAP_EOP_DATA"
        },

        dataType: 'json',
        success: function(response) {
            if (response.length == 1) {
                EOPManualFlag.value = "false";
                EOPName.value = response[0].COORDINATOR_FIRSTNAME + " " + response[0].COORDINATOR_LASTNAME + "-" + response[0].COORDINATOR_EMAILID;
                EOPCounselorName.value = response[0].COORDINATOR_FIRSTNAME + " " + response[0].COORDINATOR_LASTNAME;
                EOPUserID.value = response[0].COORDINATOR_USERID;
                EOPEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
                EOPEmpID.value = response[0].EMPLID;
                EopPanel.visible = true;
                EopPanel.enabled = false;
                EOPStudent.enabled = false;
            }
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}*/

        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_caseId_init0 = function (scope) {
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
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;

        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_firstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_firstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_lastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_lastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_Date_1_init0 = function (scope) {
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
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
 this.value = d;
}
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_CurrentMajor_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_CurrentMajor_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_DegreeObjective_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_DegreeObjective_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_textdraw1658831982025_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_textdraw1658831982025_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (aidYear.value == "2025") {
    this.visible = false;
}

        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_Summer2022Units_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_Summer2022Units_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (aidYear.value == "2025") {
    Summer2022Units.visible = false;
}else{
  Summer2022Units.visible = true;
}
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_YesCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_YesCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    NoCB.value = null;
}else{
  this.value = null;
}

        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_YesCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_YesCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  EopPanel.visible = true;
  EOPName.mandatory = true;
}else{
  EopPanel.visible = false;
  EOPName.value = "";
}
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_NoCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_NoCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    YesCB.value = null;
}else{
  this.value = null;
}
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_NoCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_NoCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "2"){
  EopPanel.visible = false;
}
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_EopPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_EopPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_EOPLastName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_EOPLastName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var appResult = [];
    if (EOPLastName.value !== null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getFAERData",
            data: {
                action: "FAER_SEARCH_APPROVER",
                lastName: EOPLastName.value
            },
            dataType: 'json',

            success: function(fundApproverResult) {

                if (fundApproverResult.length !== 0) {

                    //appResult.push("Select EOP Counselor Name");
                    for (var i = 0; i < fundApproverResult.length; i++) {

                        var item = fundApproverResult[i].FIRSTNAME + " " + fundApproverResult[i].LASTNAME;
                        //	var uid = fundApproverResult[i].USERID;
                        var uid = fundApproverResult[i].EMAILID;
                        var idItem = i + 1;
                        // EOPManualFlag.value="true";
                        //var jbcode = item.text;

                        appResult.push(item + " - " + uid);

                    }
                    EOPName.value = "";
                    EOPEmpID.value = "";
                    EOPEmail.value = "";
                    EOPUserID.value = "";
                    EOPName.items = appResult;
                    EOPLastName.value = "";
                } else {
                    showErrorModal("Alert!", "No matching records found");
                    EOPName.items = [];
                    appResult.push("Select Counselor");
                    EOPName.items = appResult;
                    EOPName.value = "";
                    EOPLastName.value = "";
                    EOPEmpID.value = "";
                    EOPEmail.value = "";
                    EOPUserID.value = "";
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_EOPName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_EOPName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var approverName = EOPName.value;

    if (approverName != "Select Counselor" && approverName !== "") {
        approverName = approverName.substr(0, approverName.indexOf(' - '));
        EOPCounselorName.value = approverName;
        $.ajax({
            type: 'GET',
            url: "/bin/getFAERData",
            data: {
                action: "FAER_APPROVER_EMPID",
                approverName: approverName
            },
            dataType: 'json',
            success: function(myresopnse) {
                if (myresopnse[0].EMPLID !== null) {
                    EOPEmpID.value = myresopnse[0].EMPLID;
                    var EMPLID = myresopnse[0].EMPLID;
                    getEmployeeDetails(EMPLID);
                } else {
                    EOPEmpID.value = "";
                }
            }
        });
    } else {
        EOPEmpID.value = "";
        EOPEmail.value = "";
        EOPUserID.value = "";
    }
}

function getEmployeeDetails(EMPLID) {
    if (StageIndicator.value === null) {
        if (EOPEmpID.value !== null) {
            $.ajax({
                type: 'GET',
                url: "/bin/getFAERData",
                data: {
                    action: "FAER_APPROVER_DETAILS",
                    approverEmplID: EOPEmpID.value
                },
                dataType: 'json',
                success: function(myresopnse) {
                    if (myresopnse.length !== 0) {
                        EOPUserID.value = myresopnse[0].EMP_USERID;
                        // EOPEmail.value = myresopnse[0].EMAILID;
                        EOPEmail.value = "soumya.ravindra@thoughtfocus.com";
                    } else {
                        EOPEmail.value = "";
                        EOPUserID.value = "";
                    }
                }


            });
        }
    }
}
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_SupportingDocumentsPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    this.visible = true;
}else{
  this.visible = false;
}

        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_supportDoc1_valueCommit0 = function (scope) {
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
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_supportDoc2_valueCommit0 = function (scope) {
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
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_supportDoc3_valueCommit0 = function (scope) {
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
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_StudentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
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
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_ipAddress_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_ipAddress_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
if (StageIndicator.value === null) {     		
  	$.getJSON("https://api.ipify.org?format=json", function(data) {                
        ipAddress.value = data.ip;        
    });
}
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_studentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_studentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_studentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_studentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_checkbox1658837391953_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_checkbox1658837391953_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToEOP" ){
	if (this.value == 1) {
	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
				EOPCounselorSignature.value = userValue;
				EOPSignDate.value = myresponse.SERVER_DATE;			
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});
			
			EOPCounselorSignature.enabled = false;       
			EOPSignDate.enabled = false; 
				
	} else {
	     EOPCounselorSignature.value = "";
		 EOPSignDate.value = "";	   
	}
}
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_EOPCounselorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_EOPCounselorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_EOPSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_EOPSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_checkbox1649838422969_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_checkbox1649838422969_valueCommit0 = function (scope) {
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
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_staffSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_staffSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_staffSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_staffSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/state-university-grant-appeal/state-university-grant-appeal-form');
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
 * @function state_university_grant_appeal_state_university_grant_appeal_form.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
state_university_grant_appeal_state_university_grant_appeal_form.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
var flag = 0;
if(StageIndicator.value === null){
  if (YesCB.value === null && NoCB.value === null) {
    showErrorModal("Alert !", "Please select Yes/No for Are you an EOP Student?");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].StudentInformation[0].unitspanel[0].textdraw_19082961801728552000081[0]");
    flag = 1;
}
  if(flag === 0){
  aftiaDescCWID.value = StudentName.value+" "+cwid.value;
  EmailSubject.value = "Test - State University Grant Appeal Form - "+cwid.value;
 // StudentEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
  //EOPEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
  StudentEmail.value = "soumya.ravindra@thoughtfocus.com";
  EOPEmail.value = "soumya.ravindra@thoughtfocus.com";
guideBridge.submit();
}
}
        }
	}
}
