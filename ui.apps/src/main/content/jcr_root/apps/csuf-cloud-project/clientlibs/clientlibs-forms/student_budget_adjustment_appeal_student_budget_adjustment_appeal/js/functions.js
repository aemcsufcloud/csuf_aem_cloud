/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {     		
	FinancialSignaturePanel.visible = false; 
  
  	$.getJSON("https://api.ipify.org?format=json", function(data) {                
        ipAddress.value = data.ip;        
    });
}
else if(StageIndicator.value == "ToFinancialAid"){
		StudentInformation.visible = true;
        StudentInformation.enabled = false;
        SupportingDocumentsPanel.visible=false;
		BudgetAdjustmentTab.enabled = false;
		InstructionsPanel.visible = true;
        InstructionsPanel.enabled = false;
		InformationTab.visible = true;
		InformationTab.enabled = false;
        StudentSignaturePanel.enabled=false;
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
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

                var CWID = response[0].EMPLID;
                getStudentAidYearDetails(CWID);
                //var aidYearFlag = getStudentAidYearDetails(studentCWID);
                cwid.value = response[0].EMPLID;
                lastName.value = response[0].LAST_NAME;
                firstName.value = response[0].FIRST_NAME;
                HiddenStudentUserID.value = response[0].USERID;
            //    PrintStudentCWID.value = response[0].EMPLID;
                StudentCwid.value = response[0].EMPLID;
                //  studentIDNumber.value = response[0].EMPLID;
                // HiddenStudentEmail.value = response[0].PREF_EMAIL;;
                HiddenStudentEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
                HiddenStudentName.value =  response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                HomePhoneNumber.value = response[0].CELL_PHONE;
               MessgeNumber.value = response[0].WORK_OTR_PHONE;
                //StudentCWID.value = response[0].EMPLID;

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
                }else if (typeOfAidYear == "1") {
                    singleAidYear();
                }else if ((identifyAidYearFlag == "OneAidYear") && (typeOfAidYear != "0" && typeOfAidYear != "1")) {
                    singleAidYear();
                }else if ((identifyAidYearFlag == "TwoAidYear") && (typeOfAidYear != "0" && typeOfAidYear != "1")) {
                    aidYearPopup();
                }
               else {
					showErrorModal("Alert !", "No matching records found for the Aid Year");
				}
			}
			else{
				showErrorModal("Alert !", "No matching records found");
			}
        }
    });
}

function singleAidYear() {    	
  	var typeOfAidYear = getUrlParameters('aidYear'); 
  	var financialAidYearVal="";
     var formCodeVal = ""; 
  
  	if(typeOfAidYear == '0'){
      	financialAidYearVal = "2021-2022";
      	aidYear.value = "2021";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F0BGAP";
        formCodeVal = "F0BGAP";
		getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }	
  	else if(typeOfAidYear == '1'){
      	financialAidYearVal = "2022-2023";
      	aidYear.value = "2022";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F1BGAP";
        formCodeVal = "F1BGAP";
		getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }	
   else{
    financialAidYearVal = "2021-2022";
    aidYear.value = "2021";
    financialAidYear.value = financialAidYearVal;
    aidYearValue = financialAidYear.value;
    formCode.value = "F0BGAP";
    formCodeVal = "F0BGAP";
    getFAFSAFinancialAidYear(aidYearValue);
    checkforDuplicateSubmissions(formCodeVal); 
  }
	
	if(StageIndicator.value !== null){
		aidYearValue =  financialAidYear.value;
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
        formCode.value = "F0BGAP";
        formCodeVal = "F0BGAP";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = "2022-2023";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1BGAP";
        formCodeVal = "F1BGAP";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };
}

debugger;
if(StageIndicator.value !== null){

    aidYearValue = financialAidYear.value;
    getFAFSAFinancialAidYear(aidYearValue);
}

function getFAFSAFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
 //   var taxFilingYear = aidYear.value-2;
    var headingTextVal = "";
    var formCodeTextVal = "";
    var textYear = " ";
  debugger;

  if (financialAidYear == "2021-2022") {
        formCodeTextVal = "<p><b>F0BGAP</b></p>";
    }
    if (financialAidYear == "2022-2023") {
        formCodeTextVal ="<p><b>F1BGAP</b></p>";
    }
  
    if (financialAidYear == "2021-2022") {
        headingTextVal = "<p><b>STUDENT BUDGET ADJUSTMENT APPEAL FORM for (".concat(financialAidYear).concat(")</b></p>");
    }
    if (financialAidYear == "2022-2023") {
        headingTextVal = "<p><b>STUDENT BUDGET ADJUSTMENT APPEAL FORM for (".concat(financialAidYear).concat(")</b></p>");
    }
  
    if (financialAidYear == "2021-2022") {
        textYear = " August 21, 2021 and May 6, 2022 ";
    }
    if (financialAidYear == "2022-2023") {
        textYear = " August 19, 2022 and May 5, 2023 ";
    }
 var textThreeVal = "<p><b>Documentation must be dated between ".concat(textYear).concat( "and identify who has incurred the expense. </b> If your financial aid award changes, you will be notified through TITAN-Online.</p>");
  
  var Year="";
  if (financialAidYear == "2021-2022") {
        Year = " Is this your first Student Budget Adjustment Appeal form for 21/22? ";
    }
    if (financialAidYear == "2022-2023") {
        Year = " Is this your first Student Budget Adjustment Appeal form for 22/23? ";
    }
  
  var textInstructions1="";
  if (financialAidYear == "2021-2022") {
        textInstructions1 = "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Eligibility for grants is based on your “expected family contribution” (EFC) which is, in turn, derived from an analysis of your/your family’s 2019 income and assets. Similarly, funding for the three “campus-based programs,” Federal Work Study, Federal Perkins Loan and Federal Supplemental Educational Opportunity Grant, is extremely limited. At CSUF, awards in these three programs are based on your EFC and other program-specific criteria. Therefore, a budget adjustment will not generally qualify for additional grants or any of the campus-based programs. <b><u>The primary purpose of requesting a budget adjustment is to increase your overall budget so that you will qualify for additional subsidized or unsubsidized Direct Loans.</u></b></p>";
    }
    if (financialAidYear == "2022-2023") {
        textInstructions1 = "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Eligibility for grants is based on your “expected family contribution” (EFC) which is, in turn, derived from an analysis of your/your family’s 2020 income and assets. Similarly, funding for the three “campus-based programs,” Federal Work Study, Federal Perkins Loan and Federal Supplemental Educational Opportunity Grant, is extremely limited. At CSUF, awards in these three programs are based on your EFC and other program-specific criteria. Therefore, a budget adjustment will not generally qualify for additional grants or any of the campus-based programs. <b><u>The primary purpose of requesting a budget adjustment is to increase your overall budget so that you will qualify for additional subsidized or unsubsidized Direct Loans.</u></b></p>";
    }
  
    var textInstructions2="";
  if (financialAidYear == "2021-2022") {
        textInstructions2 = "<p>DO NOT COMPLETE THE BUDGET ADJUSTMENT APPEAL FORM TO DOCUMENT <b>PARENTS’ OR SPOUSAL </b>EXPENSES. Instead, ask your parents or spouse to provide a written statement of the specific nature and amount of unusual expenses incurred during 2021-2022 academic year. Documentation such as receipts, doctor and hospital bills, elementary and secondary school tuition charges, etc. must be attached to the itemized statement. Submit the statement and documentation to the Office of Financial Aid, P.O. Box 6804, GH 146, Fullerton, CA 92834-6804.</p>";
    }
    if (financialAidYear == "2022-2023") {
        textInstructions2 = "<p>DO NOT COMPLETE THE BUDGET ADJUSTMENT APPEAL FORM TO DOCUMENT <b>PARENTS’ OR SPOUSAL </b>EXPENSES. Instead, ask your parents or spouse to provide a written statement of the specific nature and amount of unusual expenses incurred during 2022-2023 academic year. Documentation such as receipts, doctor and hospital bills, elementary and secondary school tuition charges, etc. must be attached to the itemized statement. Submit the statement and documentation to the Office of Financial Aid, P.O. Box 6804, GH 146, Fullerton, CA 92834-6804.</p>";
    }
  
  var CB1Text="";
  if (financialAidYear == "2021-2022") {
        CB1Text = "<p>• Medical expenses paid beginning August 21,2021 through May 6,2022 (attach copies of receipts of expenses not covered by insurance or estimates of unreimbursed expenses).</p>";
    }
    if (financialAidYear == "2022-2023") {
         CB1Text = "<p>• Medical expenses paid beginning August 19,2022 through May 5,2023 (attach copies of receipts of expenses not covered by insurance or estimates of unreimbursed expenses).</p>";
    }
  
  var CB2Text="";
  if (financialAidYear == "2021-2022") {
        CB2Text = "<p>• Car repairs or estimate of repairs to be paid between August 21,2021 <br>and May 6,2022 (attach copies of receipts or mechanic’s estimates)</br></p>";
    }
    if (financialAidYear == "2022-2023") {
         CB2Text = "<p>• Car repairs or estimate of repairs to be paid between August 19,2022 <br>and May 5,2023 (attach copies of receipts or mechanic’s estimates)</br></p>";
    }


    $("#F0BGAPTitleText").html(headingTextVal);
    $("#F0BGAPFormCodeText").html(formCodeTextVal);
    $("#F0BGAPTextThree").html(textThreeVal);
    $("#F0BGAPYear").html(Year);
    $("#ReqInstructionsText1").html(textInstructions1);
    $("#ReqInstructionsText2").html(textInstructions2);
    $("#CBText1").html(CB1Text);
    $("#CBText2").html(CB2Text);
}

debugger;
function checkforDuplicateSubmissions(formCodeVal){
var tableName = "AEM_STU_BUDGET_ADJ_APPEAL";
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
                submit_11405211331663936853663.enabled=false;            
          }

		},
	});
}
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            // gifModal.style.display = "block";

            var userValue = response.userId;
            //var userValue = 'veronica.maciel'; // two Aid Year
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

                var CWID = response[0].EMPLID;
                getStudentAidYearDetails(CWID);
                //var aidYearFlag = getStudentAidYearDetails(studentCWID);
                cwid.value = response[0].EMPLID;
                lastName.value = response[0].LAST_NAME;
                firstName.value = response[0].FIRST_NAME;
                HiddenStudentUserID.value = response[0].USERID;
                //    PrintStudentCWID.value = response[0].EMPLID;
                StudentCwid.value = response[0].EMPLID;
                //  studentIDNumber.value = response[0].EMPLID;
                // HiddenStudentEmail.value = response[0].PREF_EMAIL;;
               // HiddenStudentEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
               HiddenStudentEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                HiddenStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                HomePhoneNumber.value = response[0].CELL_PHONE;
                MessgeNumber.value = response[0].WORK_OTR_PHONE;
                //StudentCWID.value = response[0].EMPLID;

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

function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";
    var formCodeVal = "";
debugger;
    //var financialAidvalues = getAidYearValuesOnSingleAidYear();
    var financialAidvalues = getAidYearValuesOnSingleAidYearUpdated();

    if (typeOfAidYear == '0') {
        financialAidYearVal = financialAidvalues.FinAidYearZero;
        aidYear.value = financialAidvalues.AidYearZero - 1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0BGAP";
        formCodeVal = "F0BGAP";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = financialAidvalues.FinAidYearOne;
        aidYear.value = financialAidvalues.AidYearOne - 1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1BGAP";
        formCodeVal = "F1BGAP";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else {
        financialAidYearVal = financialAidvalues.FinAidYearGeneral;
        aidYear.value = financialAidvalues.AidYearGeneral-1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FormCodeGeneral+"BGAP";
        formCodeVal = financialAidvalues.FormCodeGeneral+"BGAP";
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
        formCode.value = financialAidvalues.FinAidYearFormCodeOne+"BGAP";
        formCodeVal = financialAidvalues.FinAidYearFormCodeOne+"BGAP";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = financialAidvalues.FinAidYearTwo;
        aidYear.value = financialAidvalues.AidYearTwo-1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FinAidYearFormCodeTwo+"BGAP";
        formCodeVal = financialAidvalues.FinAidYearFormCodeTwo+"BGAP";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    };
}

debugger;
if (StageIndicator.value !== null) {

    aidYearValue = financialAidYear.value;
    getFAFSAFinancialAidYear(aidYearValue);
}

function getFAFSAFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    var taxFilingYear = aidYear.value - 2;
    var headingTextVal = "<p><b>STUDENT BUDGET ADJUSTMENT APPEAL FORM for (".concat(financialAidYear).concat(")</b></p>");
    var formCodeTextVal = "<p><b>" + formCode.value + "</b></p>";

    var aidYearVal = aidYear.value;
    var textChange = getUniqueStatements("STUDENT_BUDGET_ADJUSTMENT_APPEAL", aidYearVal, "");

    var ApplicationDateYear1Change = textChange.ApplicationDateYear1;
    var ApplicationDateYear2Change = textChange.ApplicationDateYear2;
    var SummerYearChange = textChange.SummerYear;
  
    ApplicationDateYear1.value=ApplicationDateYear1Change;
    ApplicationDateYear2.value=ApplicationDateYear2Change;
    ApplicationDateYear3.value=ApplicationDateYear1Change;
    ApplicationDateYear4.value=ApplicationDateYear2Change;
    ApplicationDateYear5.value=ApplicationDateYear1Change;
    ApplicationDateYear6.value=ApplicationDateYear2Change;
    SummerYear.value=SummerYearChange;

    var textThreeVal = "<p><b>Documentation must be dated between ".concat(ApplicationDateYear1Change).concat(" and ".concat(ApplicationDateYear2Change).concat(" and identify who has incurred the expense. </b> If your financial aid award changes, you will be notified through TITAN-Online.</p>"));

    var Year = " Is this your first Student Budget Adjustment Appeal form for ".concat(SummerYearChange).concat("?");
    
    var textInstructions1 = "";
    
    if (aidYear.value === "2024"){
      textInstructions1 = "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Eligibility for grants is based on your “Student Aid Index” (SAI) which is, in turn, derived from an analysis of your/your family’s ".concat(taxFilingYear).concat(" income and assets. Similarly, funding for the two “campus-based programs,” Federal Work Study, Federal Perkins Loan and Federal Supplemental Educational Opportunity Grant, is extremely limited. At CSUF, awards in these three programs are based on your SAI and other program-specific criteria. Therefore, a budget adjustment will not generally qualify for additional grants or any of the campus-based programs. <b><u>The primary purpose of requesting a budget adjustment is to increase your overall budget so that you will qualify for additional Direct Loans, scholarships and stipends, or state grant.</u></b></p>");
      InstructionsText2.visible = true;
      textdraw_3990420241660839445853.visible = false;
    } else {
      textInstructions1 = "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Eligibility for grants is based on your “expected family contribution” (EFC) which is, in turn, derived from an analysis of your/your family’s ".concat(taxFilingYear).concat(" income and assets. Similarly, funding for the three “campus-based programs,” Federal Work Study, Federal Perkins Loan and Federal Supplemental Educational Opportunity Grant, is extremely limited. At CSUF, awards in these three programs are based on your EFC and other program-specific criteria. Therefore, a budget adjustment will not generally qualify for additional grants or any of the campus-based programs. <b><u>The primary purpose of requesting a budget adjustment is to increase your overall budget so that you will qualify for additional subsidized or unsubsidized Direct Loans.</u></b></p>");  
      InstructionsText2.visible = false;
    }      

    var textInstructions2 = "<p>DO NOT COMPLETE THE BUDGET ADJUSTMENT APPEAL FORM TO DOCUMENT <b>PARENTS’ OR SPOUSAL </b>EXPENSES. Instead, ask your parents or spouse to provide a written statement of the specific nature and amount of unusual expenses incurred during ".concat(financialAidYear).concat(" academic year. Documentation such as receipts, doctor and hospital bills, elementary and secondary school tuition charges, etc. must be attached to the itemized statement. Submit the statement and documentation to the Office of Financial Aid, P.O. Box 6804, GH 146, Fullerton, CA 92834-6804.</p>");

    var CB1Text = "<p>• Medical expenses paid beginning ".concat(ApplicationDateYear1Change).concat(" through ".concat(ApplicationDateYear2Change).concat(" (attach copies of receipts of expenses not covered by insurance or estimates of unreimbursed expenses).</p>"));

    var CB2Text = "<p>• Car repairs or estimate of repairs to be paid between ".concat(ApplicationDateYear1Change).concat(" <br>and ".concat(ApplicationDateYear2Change).concat(" (attach copies of receipts or mechanic’s estimates)</br></p>"));


    $("#F0BGAPTitleText").html(headingTextVal);
    $("#F0BGAPFormCodeText").html(formCodeTextVal);
    $("#F0BGAPTextThree").html(textThreeVal);
    $("#F0BGAPYear").html(Year);
    $("#ReqInstructionsText1").html(textInstructions1);
    $("#ReqInstructionsText2").html(textInstructions2);
    $("#CBText1").html(CB1Text);
    $("#CBText2").html(CB2Text);
}


function checkforDuplicateSubmissions(formCodeVal, financialAidYearVal) {
    var tableName = "AEM_STU_BUDGET_ADJ_APPEAL";
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
                    submit_11405211331663936853663.enabled = false;
                }

            },
        });
    }
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_caseId_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_caseId_init1 = function (scope) {
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
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Date_1_init0 = function (scope) {
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
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
  Date_1.value = d;
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_HomePhoneNumber_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_HomePhoneNumber_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_MessgeNumber_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_MessgeNumber_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_BudgetType1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_BudgetType1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    Amount1.enabled = true;
} else {
    Amount1.enabled = false;
    Amount1.value = null;
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_BudgetType2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_BudgetType2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    Amount2.enabled = true;
    Amount3.enabled = true;
} else {
    Amount2.enabled = false;
    Amount3.enabled = false;
    Amount2.value = null;
    Amount3.value = null;
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_BudgetType3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_BudgetType3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    Amount4.enabled = true;
} else {
    Amount4.enabled = false;
    Amount4.value = null;
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_BudgetType4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_BudgetType4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    Amount5.enabled = true;
} else {
    Amount5.enabled = false;
    Amount5.value = null;
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_BudgetType5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_BudgetType5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    Amount6.enabled = true;
} else {
    Amount6.enabled = false;
    Amount6.value = null;
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_BudgetType6_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_BudgetType6_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
    Amount7.enabled = true;
} else {
    Amount7.enabled = false;
    Amount7.value = null;
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Amount1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Amount1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;

        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Amount2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Amount2_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Amount3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Amount3_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Amount4_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Amount4_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Amount5_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Amount5_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Amount6_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Amount6_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Amount7_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_Amount7_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_SupportingDocumentsPanel_init0 = function (scope) {
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
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_supportDoc1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc1.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	  
	if(extension !== "pdf"){
	 
       supportDoc1.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}
	var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;

	if(format.test(supportDoc1.fileAttachment.value) === true){
		var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
		supportDoc1.fileAttachment.value = doc2NewName;

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_supportDoc2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc2.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	  
	if(extension !== "pdf"){
	 
       supportDoc2.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}
	var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;

	if(format.test(supportDoc2.fileAttachment.value) === true){
		var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
		supportDoc2.fileAttachment.value = doc2NewName;

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_supportDoc3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc3.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	  
	if(extension !== "pdf"){
	 
       supportDoc3.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}
	var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;

	if(format.test(supportDoc3.fileAttachment.value) === true){
		var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
		supportDoc3.fileAttachment.value = doc2NewName;

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_StudentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
	if (this.value == 1) {
	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {			  
				StudentName.value = firstName.value + " " + lastName.value;
				StudentSignatureDate.value = myresponse.SERVER_DATE;			
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});
			
			StudentName.enabled = false;       
			StudentSignatureDate.enabled = false; 
				
	} else {
		StudentName.value = "";
		StudentSignatureDate.value = "";	   
	}
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_StudentName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_StudentName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_StudentSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_StudentSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_evaluator_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_evaluator_signChk_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToFinancialAid") {
    if (this.value == "1") {

        $.ajax({

            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',

            success: function(myresponse) {
                StaffInitials.value = myresponse.userName;
                StaffDate.value = myresponse.SERVER_DATE;
              	financialAidAssignee.value = myresponse.userId;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });

        StaffInitials.enabled = false;
        StaffDate.enabled = false;

    } else {
        StaffInitials.value = "";
        StaffDate.value = "";

    }
}
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_StaffInitials_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_StaffInitials_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_StaffDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_StaffDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_HiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_HiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible=false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_generateDOR_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_generateDOR_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible=false;
        }
	}
}
/**
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            getPdf();

function getPdf() {
    //console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, ' and'));
            jsonData.append('formPath', '/content/forms/af/student-budget-adjustment-appeal/student-budget-adjustment-appeal');
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
 * @function student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_submit_11405211331663936853663_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_budget_adjustment_appeal_student_budget_adjustment_appeal.generated_submit_11405211331663936853663_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if((InstructionCB).value === null){
        InstructionCB.mandatory=true; 
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].InstructionsPanel[0]"); 
        showErrorModal("Alert !", "Please read the Instructions carefully & check the Checkbox below");
} else if(BudgetType1.value===null && BudgetType2.value===null && BudgetType3.value===null && BudgetType4.value===null && BudgetType5.value===null && BudgetType6.value===null){
        
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].BudgetAdjustmentTab[0].BudgetAdjustmentCB[0].BudgetType1[0]"); 
  showErrorModal("Alert !", "Please select the Budget Adjustment Type");
}
else{
  if(cwid.value !== null){
  aftiaDescCWID.value = HiddenStudentName.value +" "+cwid.value;
  EmailSubject.value = "Student Budget Adjustment Appeal - "+cwid.value;
 // HiddenStudentEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
    HiddenStudentEmail.value = "shreyas.manjunatha@thoughtfocus.com";
}


guideBridge.submit();
}


        }
	}
}
