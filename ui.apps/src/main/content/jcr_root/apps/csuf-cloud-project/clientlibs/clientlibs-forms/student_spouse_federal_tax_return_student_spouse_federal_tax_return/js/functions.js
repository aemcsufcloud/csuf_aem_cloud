/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_guideRootPanel_init0 = function (scope) {
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
          //  var userValue = 'mariana2'; // two Aid Year
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
            action:"CV_USER_DETAILS",
            userID: userValue
        },

        dataType: 'json',
        success: function(response) {
            if (response.length >= 1) {
                var studentCWID = response[0].EMPLID;
                getStudentAidYearDetails(studentCWID);
              
                firstName.value = response[0].FIRST_NAME;
                lastName.value = response[0].LAST_NAME;
                HiddenStudentUserID.value = response[0].USERID;
                studentIDNumber.value = studentCWID;
                cwid.value = studentCWID;
                //StudentEmailId.value = response[0].PREF_EMAIL;
                HiddenStudentEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
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
                }else if (identifyAidYearFlag == "OneAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
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
        formCode.value = "F0STXS";
        formCodeVal = "F0STXS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = "2022-2023";
        aidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1STXS";
        formCodeVal = "F1STXS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };
}

function singleAidYear() {
   var typeOfAidYear = getUrlParameters('aidYear'); 
  	var financialAidYearVal="";
   var formCodeVal="";
  	if(typeOfAidYear == '0'&& flag == "TwoAidYear"){
      	financialAidYearVal = "2021-2022";
      	aidYear.value = "2022";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F0STXS";
        formCodeVal = "F0STXS";
		getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }
  	else if(typeOfAidYear == '1' && flag == "TwoAidYear"){
      	financialAidYearVal = "2022-2023";
      	aidYear.value = "2023";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F1STXS";
        formCodeVal = "F1STXS";
		getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }
  else{
    financialAidYearVal = "2021-2022";
    aidYear.value = "2022";
    financialAidYear.value = financialAidYearVal;
    aidYearValue = financialAidYear.value;
    formCode.value = "F0STXS";
    formCodeVal = "F0STXS";
    getCDAFinancialAidYear(aidYearValue);
    checkforDuplicateSubmissions(formCodeVal);
  }

    if (StageIndicator.value !== null) {
        aidYearValue = financialAidYear.value;
        getCDAFinancialAidYear(aidYearValue);
    }

}

if(StageIndicator.value !== null){
    aidYearValue = financialAidYear.value;
    getCDAFinancialAidYear(aidYearValue);
}

function getCDAFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    //var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);
    var taxFilingYear = aidYear.value-1;
    var headingTextVal = "";
    var formTextVal = "";
    var TextOne = "";
    var TextTwo = "";
    var TextThree = "";
    var TextFour = "";
  
    if (financialAidYear == "2021-2022") {
        headingTextVal = "<p><b>STUDENT SPOUSE'S 2019 FEDERAL TAX RETURN - STUDENT (".concat(financialAidYear).concat(")</b></p>");
        formTextVal = "<p><b>F0STXS</b></p>";
        TextOne = "<p><b><u>INSTRUCTIONS:</u></b>&nbsp; Additional information is needed to determine your financial aid eligibility for the 2021-2022 award year. Our records show that you were married on or before the date you filed your Free Application for Federal Student Aid (FAFSA). Federal regulations require that we must include your spouse’s information to determine the amount of financial aid that you are eligible to receive. We must include your spouse’s information even if you did not file taxes jointly. This federal regulation applies even if you were married in the later part of 2019 or during 2020. <i>Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>"; 
        TextTwo="<p>Submit a signed photocopy of your <i>spouse’s 2019 U.S. IRS Tax Transcript.</i></p>";
        TextThree="<p><b>NOTE:</b>&nbsp; If you were married as of December 31, 2019, federal tax regulations prohibit you from filing as head-of-household.  If either of the 1040's submitted to our office show that you or your spouse filed as head-of-household, your financial aid application will be placed on hold until you submit an amended tax return, unless you can demonstrate you met the Internal Revenue Service definition of head-of-household. If spouse is not required to file a 2019 U.S. Federal Tax Return, provide a written explanation of why she/he is not required to file.</p>";
        TextFour = "<p><b>If an individual did not file an IRS income tax return, regardless if he/she earned any income from work, MUST provide confirmation of non-filing from the IRS through form 4506-T (box 7), online through ".concat("<a href=".concat("https://www.IRS.gov ").concat("target=".concat("_blank")).concat(">www.IRS.gov</a> , or other relevant taxing authority dated on or after October 1, 2019.</b></p>"));
    }
  
    if (financialAidYear == "2022-2023") {
        headingTextVal = "<p><b>STUDENT SPOUSE'S 2020 FEDERAL TAX RETURN - STUDENT (".concat(financialAidYear).concat(")</b></p>");
        formTextVal = "<p><b>F1STXS</b></p>";
        TextOne = "<p><b><u>INSTRUCTIONS:</u></b>&nbsp; Additional information is needed to determine your financial aid eligibility for the 2022-2023 award year. Our records show that you were married on or before the date you filed your Free Application for Federal Student Aid (FAFSA). Federal regulations require that we must include your spouse’s information to determine the amount of financial aid that you are eligible to receive. We must include your spouse’s information even if you did not file taxes jointly. This federal regulation applies even if you were married in the later part of 2020 or during 2021. <i>Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>"; 
        TextTwo="<p>Submit a signed photocopy of your <i>spouse’s 2020 U.S. IRS Tax Transcript.</i></p>";
        TextThree="<p><b>NOTE:</b>&nbsp; If you were married as of December 31, 2020, federal tax regulations prohibit you from filing as head-of-household.  If either of the 1040's submitted to our office show that you or your spouse filed as head-of-household, your financial aid application will be placed on hold until you submit an amended tax return, unless you can demonstrate you met the Internal Revenue Service definition of head-of-household. If spouse is not required to file a 2020 U.S. Federal Tax Return, provide a written explanation of why she/he is not required to file.</p>";
        TextFour = "<p><b>If an individual did not file an IRS income tax return, regardless if he/she earned any income from work, MUST provide confirmation of non-filing from the IRS through form 4506-T (box 7), online through ".concat("<a href=".concat("https://www.IRS.gov ").concat("target=".concat("_blank")).concat(">www.IRS.gov</a> , or other relevant taxing authority dated on or after October 1, 2020.</b></p>"));
    }
  
  
 
  $("#STXSFormText").html(formTextVal);
  $("#STXSHeadingText").html(headingTextVal);
  $("#STXSInstructionsText").html(TextOne);
  $("#STXSActionText1").html(TextTwo);
  $("#STXSActionText2").html(TextThree);
  $("#STXSActionTextThree").html(TextFour);
}

function checkforDuplicateSubmissions(formCodeVal){

var tableName = "AEM_STUDENT_FED_TAX_RETURN";
var financialAidDecisionColumnName = "FINANCIAL_AID_DECISION";
var formCodeColumnName = "FORM_CODE";
var faDecision = "Approved";
if (StageIndicator.value === null) {
	$.ajax({
		type: 'GET',
		url: "/bin/getCitizenShipData",
		data: {
			action: 'CV_UPDATED_DUPLICATE_CHECK',
			cwid: cwid.value,
          financialAidYear: financialAidYear.value,
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
                submit1575264176703.enabled=false;            
          }

		},
	});
}
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value===null){
  FinancialAidSignaturePanel.visible=false;
  FinancialAidSignaturePanel.enabled =false;
  disabledCutCopyPasteFunctionality();   //Function to disable Cut Copy Paste Functionality
}

if(StageIndicator.value=="ToFinancialAid"){
  StudentInformation.visible=true;
  StudentInformation.enabled=false;
  Instructions.visible=true;
  Instructions.enabled=false;
  ActionTab.visible=true;
  ActionTab.enabled=false;
  StudentSignaturePanel.visible=true;
  StudentSignaturePanel.enabled=false;
  FinancialAidSignaturePanel.visible=true;
  FinancialAidSignaturePanel.enabled=true;
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_guideRootPanel_init2 = function (scope) {
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
            //  var userValue = 'mariana2'; // two Aid Year
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
                getStudentAidYearDetails(studentCWID);

                firstName.value = response[0].FIRST_NAME;
                lastName.value = response[0].LAST_NAME;
                HiddenStudentUserID.value = response[0].USERID;
                studentIDNumber.value = studentCWID;
                cwid.value = studentCWID;
              //  HiddenStudentEmail.value = response[0].PREF_EMAIL;
               HiddenStudentEmail.value ="shreyas.manjunatha@thoughtfocus.com";
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
        formCode.value = financialAidvalues.FinAidYearFormCodeOne + "STXS";
        formCodeVal = financialAidvalues.FinAidYearFormCodeOne + "STXS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = financialAidvalues.FinAidYearTwo;
        aidYear.value = financialAidvalues.AidYearTwo;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FinAidYearFormCodeTwo + "STXS";
        formCodeVal = financialAidvalues.FinAidYearFormCodeTwo + "STXS";
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
        formCode.value = "F0STXS";
        formCodeVal = "F0STXS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = financialAidvalues.FinAidYearOne;
        aidYear.value = financialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1STXS";
        formCodeVal = "F1STXS";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else {
        financialAidYearVal = financialAidvalues.FinAidYearGeneral;
        aidYear.value = financialAidvalues.AidYearGeneral;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FormCodeGeneral + "STXS";
        formCodeVal = financialAidvalues.FormCodeGeneral + "STXS";
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
    var textChange = getUniqueStatements("STUDENT_FEDERAL_TAX_RETURN", aidYearVal, "");

    var taxFillingYear = aidYear.value - 3;

    var TextOneChange = textChange.TextOne;
    var TextThreeChange = textChange.TextThree;

    HeadingYear.value = "STUDENT SPOUSE'S ".concat(taxFillingYear).concat(" FEDERAL TAX RETURN - STUDENT (".concat(financialAidYear).concat(")"));
    Year1.value = financialAidYear;
    Year2.value = TextOneChange;
    Year3.value = taxFillingYear;
    Year4.value = taxFillingYear;
    Year5.value = taxFillingYear;
    Year6.value = taxFillingYear;
    ConfirmationText.value = TextThreeChange;
  
    if(aidYear.value == "2025"){
      Instructions.visible=false;
      ActionTab.visible=false;
      CDATAxFiling2025.visible=true;
      InformationTab2025.visible=true;
    } else {
      CDATAxFiling2025.visible=false;
      InformationTab2025.visible=false;
    }

    var headingTextVal = "<p><b>STUDENT SPOUSE'S ".concat(taxFillingYear).concat(" FEDERAL TAX RETURN - STUDENT (".concat(financialAidYear).concat(")</b></p>"));
    var formTextVal = "<p><b>" + formCode.value + "</b></p>";
    var TextOne = "<p><b><u>INSTRUCTIONS:</u></b>&nbsp; Additional information is needed to determine your financial aid eligibility for the ".concat(financialAidYear).concat(" award year. Our records show that you were married on or before the date you filed your Free Application for Federal Student Aid (FAFSA). Federal regulations require that we must include your spouse’s information to determine the amount of financial aid that you are eligible to receive. We must include your spouse’s information even if you did not file taxes jointly. This federal regulation applies even if you were married in the later part of ".concat(TextOneChange).concat(" <i>Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will delay processing.</i></p>"));
    var TextTwo = "<p>Submit a signed photocopy of your <i>spouse’s ".concat(taxFillingYear).concat(" U.S. IRS Tax Transcript.</i></p>");
    var TextThree = "<p><b>NOTE:</b>&nbsp; If you were married as of December 31, ".concat(taxFillingYear).concat(", federal tax regulations prohibit you from filing as head-of-household.  If either of the 1040's submitted to our office show that you or your spouse filed as head-of-household, your financial aid application will be placed on hold until you submit an amended tax return, unless you can demonstrate you met the Internal Revenue Service definition of head-of-household. If spouse is not required to file a ".concat(taxFillingYear).concat(" U.S. Federal Tax Return, provide a written explanation of why she/he is not required to file.</p>"));
    var TextFour = "<p><b>If an individual did not file an IRS income tax return, regardless if he/she earned any income from work, MUST provide ".concat(TextThreeChange).concat(" of non-filing from the IRS through form 4506-T (box 7), online through ".concat("<a href=".concat("https://www.IRS.gov ").concat("target=".concat("_blank")).concat(">www.IRS.gov</a> , or other relevant taxing authority dated on or after October 1, ".concat(taxFillingYear).concat(".</b></p>"))));

    $("#STXSFormText").html(formTextVal);
    $("#STXSHeadingText").html(headingTextVal);
    $("#STXSInstructionsText").html(TextOne);
    $("#STXSActionText1").html(TextTwo);
    $("#STXSActionText2").html(TextThree);
    $("#STXSActionTextThree").html(TextFour);
}

function checkforDuplicateSubmissions(formCodeVal, financialAidYearVal) {

    var tableName = "AEM_STUDENT_FED_TAX_RETURN";
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
                financialAidYear: financialAidYear.value,
                faDecisionColumnName: financialAidDecisionColumnName,
                tableName: tableName,
                formCodeColumnName: formCodeColumnName,
                formCode: formCodeVal,
                faDecision: faDecision,
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
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_caseId_init0 = function (scope) {
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
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_firstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_firstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_lastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_lastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_Date_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
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
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_yesCFCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_yesCFCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  
  	noCFCHK.value = null;
  	noUseIRSCHK2025.enabled = true;
	separatedCHK2025.enabled = true;
	ForeignTRCHK2025.enabled = true;
	taxExtensionCHK2025.enabled = true;
    foreignTaxCHK12025.enabled = true;
  
}
else{
  
  	noUseIRSCHK2025.enabled = false;
	separatedCHK2025.enabled = false;
	ForeignTRCHK2025.enabled = false;
	taxExtensionCHK2025.enabled = false;
    foreignTaxCHK12025.enabled = false;
  
  	noUseIRSCHK2025.value = null;
	separatedCHK2025.value = null;
	ForeignTRCHK2025.value = null;
	taxExtensionCHK2025.value = null;
    foreignTaxCHK12025.value = null;
  
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_noCFCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_noCFCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  
  	yesCFCHK.value = null;
  
  	noIncomeCHK2025.enabled = true;
	notRequireFileCHK2025.enabled = true;
    SSNchk2025.enabled = true;
	InterOrgCHK2025.enabled = true;
  
  	empName1a.enabled = true;
    empName1b.enabled = true;
    empName1c.enabled = true;
    empName1d.enabled = true;
  
    EmpCB1.enabled = true;
    EmpCB2.enabled = true;
    EmpCB3.enabled = true;
    EmpCB4.enabled = true;
  
    amount1a.enabled = true;  
    amount1b.enabled = true;
    amount1c.enabled = true;  
    amount1d.enabled = true;
  
}
else{
  
  	noIncomeCHK2025.enabled = false;
	notRequireFileCHK2025.enabled = false;
    SSNchk2025.enabled = false;
	InterOrgCHK2025.enabled = false;
  
  	noIncomeCHK2025.value = null;
	notRequireFileCHK2025.value = null;
    SSNchk2025.value = null;
	InterOrgCHK2025.value = null;
  
  	empName1a.value = null;
    empName1b.value = null;
    empName1c.value = null;
    empName1d.value = null;
  
    amount1a.value = null; 
    amount1b.value = null;
    amount1c.value = null;
    amount1d.value = null;
  
    EmpCB1.value = null; 
    EmpCB2.value = null; 
    EmpCB3.value = null; 
    EmpCB4.value = null; 
  
  	empName1a.enabled = false;
    empName1b.enabled = false;
    empName1c.enabled = false;
    empName1d.enabled = false;
  
    amount1a.enabled = false;
    amount1b.enabled = false;
    amount1c.enabled = false;
    amount1d.enabled = false;
  
    EmpCB1.enabled = false;
    EmpCB2.enabled = false;
    EmpCB3.enabled = false;
    EmpCB4.enabled = false;
  
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_noUseIRSCHK2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_noUseIRSCHK2025_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	separatedCHK2025.value = null;
	ForeignTRCHK2025.value = null;
	taxExtensionCHK2025.value = null;
    foreignTaxCHK12025.value = null;
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_separatedCHK2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_separatedCHK2025_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	noUseIRSCHK2025.value = null;
	ForeignTRCHK2025.value = null;
	taxExtensionCHK2025.value = null;
    foreignTaxCHK12025.value = null;
  	separatedDate2025.enabled = true;  
  	separatedDate2025.mandatory = true;
}
else{
  	separatedDate2025.enabled = false;
  	separatedDate2025.value = null;
  	separatedDate2025.mandatory = false;
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_ForeignTRCHK2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_ForeignTRCHK2025_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	noUseIRSCHK2025.value = null;
	separatedCHK2025.value = null;
	taxExtensionCHK2025.value = null;
    foreignTaxCHK12025.value = null;  	
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_taxExtensionCHK2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_taxExtensionCHK2025_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	noUseIRSCHK2025.value = null;
	separatedCHK2025.value = null;
	ForeignTRCHK2025.value = null;
    foreignTaxCHK12025.value = null;  	
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_foreignTaxCHK12025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_foreignTaxCHK12025_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	noUseIRSCHK2025.value = null;
	separatedCHK2025.value = null;
	ForeignTRCHK2025.value = null;
    taxExtensionCHK2025.value = null;  	
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_noIncomeCHK2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_noIncomeCHK2025_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	notRequireFileCHK2025.value = null;
  	SSNchk2025.value = null;
    InterOrgCHK2025.value = null;
  	yesCFCHK.value = null;
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_notRequireFileCHK2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_notRequireFileCHK2025_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	noIncomeCHK2025.value = null;
  	SSNchk2025.value = null;
    InterOrgCHK2025.value = null;
  	yesCFCHK.value = null;
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_SSNchk2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_SSNchk2025_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	noIncomeCHK2025.value = null;
  	notRequireFileCHK2025.value = null;
    InterOrgCHK2025.value = null;
  	yesCFCHK.value = null;
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_InterOrgCHK2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_InterOrgCHK2025_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	noIncomeCHK2025.value = null;
  	notRequireFileCHK2025.value = null;
    SSNchk2025.value = null;
  	yesCFCHK.value = null;
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_empName1a_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_empName1a_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_amount1a_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_amount1a_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_empName1b_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_empName1b_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_amount1b_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_amount1b_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_empName1c_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_empName1c_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_amount1c_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_amount1c_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_SupportingDocuments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_SupportingDocuments_init0 = function (scope) {
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
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_supportDoc1_valueCommit0 = function (scope) {
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
  if(this.value !== null){
    supDocAttachText.visible = false;
  } 
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_supportDoc2_valueCommit0 = function (scope) {
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
  if(this.value !== null){
    supDocAttachText.visible = false;
  } 
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_supportDoc3_valueCommit0 = function (scope) {
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
  if(this.value !== null){
    supDocAttachText.visible = false;
  } 
}
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_StudentCB_valueCommit0 = function (scope) {
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
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_ipAddress_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_ipAddress_init0 = function (scope) {
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
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_studentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_studentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_studentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_studentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_evaluator_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_evaluator_signChk_valueCommit0 = function (scope) {
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
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_staffSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_staffSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_staffSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_staffSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/student-spouse-federal-tax-return/student-spouse-federal-tax-return');
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
 * @function student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_spouse_federal_tax_return_student_spouse_federal_tax_return.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            submitAction();

function submitAction() {
  debugger;
    if (StageIndicator.value === null) {
        aftiaDescCWID.value = HiddenStudentName.value + " " + cwid.value;
        EmailSubject.value = "Test - Student Spouse's Federal Tax Return Form - (" + cwid.value + ")";
        HiddenStudentEmail.value = "shreyas.manjunatha@thoughtfocus.com";
    }
    if (noIncomeCHK2025.value !== "1" && supportDoc1.value === "" && supportDoc2.value === "" && supportDoc3.value === "") {
        showErrorModal("Alert!", "Please attach supporting documents");
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SupportingDocuments[0]");
    } else {
        guideBridge.submit();
    }
}
        }
	}
}
