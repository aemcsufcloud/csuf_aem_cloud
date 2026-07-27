/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {     		
	FinancialSignaturePanel.visible = false;	
}
else if(StageIndicator.value == "ToFinancialAid"){
	StudentInformation.enabled = false;
	ParentTaxFillingTab.enabled = false;
  	StudentSignaturePanel.enabled = false;
  	SupportingDocumentsPanel.visible = false;
  	FinancialSignaturePanel.visible = true;  	
}



        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
  
  	//disabledCutCopyPasteFunctionality(); //Function used to disable the cut copy paste functionality for confirm email field.

	 $.ajax({

        type: 'GET',

        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            // gifModal.style.display = "block";

            var userValue = response.userId;
            //var userValue = 'mariana2';	 	  	// two Aid Year
            //var userValue = 'majesticallexi';    	// one Aid Year
            //var userValue = 'mchoi88';			 	// no Aid Year
            workflow_initiator.value = userValue;
			caseID();
            getStudentDetails(userValue);            
          
          	/*var boldTextCHK = document.querySelectorAll(".boldText label"); // To make the checkbox labels bold
            for(var a=0; a<boldTextCHK.length; a++){
                boldTextCHK[a].style.fontWeight = 'bold';
            }*/
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
        url: "/bin/getStudentPeronalInformationWithUserID",

        data: {
            userID: userValue
        },

        dataType: 'json',
        success: function(response) {

            if (response.length >= 1) {
				
				var studentCWID = response[0].student_ID;
              	getStudentAidYearDetails(studentCWID);
				var aidYearFlag = getStudentAidYearDetails(studentCWID); 
              	
                lastName.value = response[0].student_LName;
                firstName.value = response[0].student_FName;
                HiddenStudentUserID.value = response[0].student_UserID;
                cwid.value = response[0].student_ID;
                studentIDNumber.value = response[0].student_ID;
                //HiddenStudentEmail.value = response[0].student_Email;
                HiddenStudentEmail.value = "yjayaram@fullerton.edu";
                HiddenStudentName.value = response[0].student_FName + " " + response[0].student_LName;              
                
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
			
			var aidYears = [];
			var aidYearsObj = {};	 
          	var identifyAidYearFlag;

            for(var a=0; a<response.length; a++){
				aidYears.push(response[a]);				
			}
			
			for (var b = 0; b < aidYears.length; b++) {
				aidYearsObj = aidYears[b];
				for (var key in aidYearsObj) {
					if ("AID_YEAR" == key) {
                      	identifyAidYearFlag = "OneAidYear";						
					}
					else if("SECOND_AID_YEAR" == key){
                      	identifyAidYearFlag = "TwoAidYear";						
					}                  	
				}
			}          	
          
          	if(identifyAidYearFlag == "OneAidYear"){
              	singleAidYear();
            }
          	else if(identifyAidYearFlag == "TwoAidYear"){
              	aidYearPopup();
            }
          	else {
              	showErrorModal("Alert !", "No matching records found for the Aid Year");						
            }
        }
    });  	
}



function aidYearPopup(){
	var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var button = document.getElementsByClassName("rb1");

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
        //getInitialDetails();
      	formCode.value = "F0CTXS";
        var financialAidYearVal = "2021-2022";
      	aidYear.value = "2019";
        financialAidYear.value = financialAidYearVal;
        getFinancialAidYear(financialAidYearVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        //getInitialDetails();
      	formCode.value = "F1CTXS";
        var financialAidYearVal = "2022-2023";
      	aidYear.value = "2020";
        financialAidYear.value = financialAidYearVal;
        getFinancialAidYear(financialAidYearVal);
    };
}


function singleAidYear(){
  		formCode.value = "F0CTXS";
        var financialAidYearVal = "2021-2022";
      	aidYear.value = "2019";
        financialAidYear.value = financialAidYearVal;
        getFinancialAidYear(financialAidYearVal);
}



if(StageIndicator.value !== null){
  	var aidYearValue = financialAidYear.value; 
  	getFinancialAidYear(aidYearValue);
}



function getFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);

  	var formCodeTextVal = "";
  	if (financialAidYear == "2021-2022") {  
      	formCodeTextVal = "<p><b>CA Dream Act Application - F0CTXS</b></p>";
    }
  	if (financialAidYear == "2022-2023") {  
      	formCodeTextVal = "<p><b>CA Dream Act Application - F1CTXS</b></p>";
    }
  
    var titleTextVal = "<p><b>STUDENT (AND SPOUSE) ".concat(taxFilingYear).concat(" TAX FILING STATEMENT(").concat(financialAidYearVal).concat(")</b></p>");
    var headingTextVal = "<p><b>STUDENT (AND SPOUSE) ".concat(taxFilingYear).concat(" TAX FILING STATEMENT(").concat(financialAidYearVal).concat(")</b></p>");
    var textOneVal = "To verify student (and student's spouse, if married) ".concat(taxFilingYear).concat(" income and wages information, you must provide the information below.");
    var textTwoVal = "<p><b>&nbsp; <u>Instructions for completing this form:</u></b><br><b>&nbsp; Complete Section A</b> whether or not you, the student (and your spouse), have already completed your <b><u>".concat(taxFilingYear).concat("</u></b> U.S. Federal Tax Return</p>");
    var textThreeVal = "Did you, the student, file a ".concat(taxFilingYear).concat(" income tax return with the IRS? (if married, include spouse)");
  	
  	var textFourVal = "";
  	if (financialAidYear == "2021-2022") { 
      	textFourVal = "<p>- Submit your ".concat(taxFilingYear).concat(" Tax Return Transcript or a signed copy of the ").concat(taxFilingYear).concat(" 1040 Tax<br>&nbsp; Returns along with schedules 1,2,3 if applicable<br>- Obtain your transcript from the IRS website http://www.irs.gov and<br>&nbsp; click on &quot;Get Transcript of Your Tax Records&quot; OR by calling (800)<br>&nbsp; 908-9946 to request an IRS Tax Return Transcript for the 2019 year</p>");
    }
    if (financialAidYear == "2022-2023") { 
      	textFourVal = "<p>- Submit your ".concat(taxFilingYear).concat(" IRS Tax Return Transcript or ").concat(taxFilingYear).concat(" 1040 Tax<br>&nbsp; Returns along with all schedules if applicable<br>- Obtain your transcript from the IRS website http://www.irs.gov and<br>&nbsp; click on &quot;Get Transcript of Your Tax Records&quot; OR by calling (800)<br>&nbsp; 908-9946 to request an IRS Tax Return Transcript for the 2017 year</p>");
    }
  
  	var textFiveVal = "";
  	if (financialAidYear == "2021-2022") { 
      	textFiveVal = "<p>- Submit a SIGNED copy of the 2019 Tax Return Transcript or<br> &nbsp;".concat(taxFilingYear).concat(" 1040 Tax Returns along with schedules 1,2,3 if applicable</p>");
    }
  	if (financialAidYear == "2022-2023") {  
      	textFiveVal = "<p>- Submit a SIGNED copy of the 2019 Tax Return Transcript or<br> &nbsp;".concat(taxFilingYear).concat(" 1040 Tax Returns along with all schedules if applicable</p>");
    }
    
   var textSixVal = "<p>- If tax extension is beyond the 6 month October 15, ".concat(taxFilingYear).concat(" deadline:</p>");
	
   var textSevenVal = "";
   if (financialAidYear == "2021-2022") {
     	 textSevenVal = "<p>- Submit form 4868, unexpired IRS approval of extensions<br>&nbsp; &nbsp;beyond the automatic 6-month extension<br>- All W2s, a signed statement with estimated ".concat(taxFilingYear).concat(" income<br>&nbsp; and/or business related income amount(s)(if applicable),<br>&nbsp; a signed&nbsp; copy of 2018 federal tax return form(1040,<br>&nbsp; 1040A, or 1040EZ), and provide confirmation of non-filing<br>&nbsp; from the IRS through from 4506-T (box 7) dated on or<br>&nbsp; after October 1, ").concat(taxFilingYear).concat("</p>");
   }
  
  if (financialAidYear == "2022-2023") {
     	 textSevenVal = "<p>- Submit form 4868, unexpired IRS approval of extensions<br>&nbsp; &nbsp;beyond the automatic 6-month extension<br>- All W2s, a signed statement with estimated ".concat(taxFilingYear).concat(" income<br>&nbsp; and/or business related income amount(s)(if applicable),<br>&nbsp; a signed&nbsp; copy of 2019 federal tax return form(1040,<br>&nbsp; 1040A, or 1040EZ), and provide confirmation of non-filing<br>&nbsp; from the IRS through from 4506-T (box 7) dated on or<br>&nbsp; after October 1, ").concat(taxFilingYear).concat("</p>");
   }
   

    var textEightVal = "<p>- Submit a signed and translated copy of your foreign tax return, which&nbsp;<br>&nbsp; &nbsp;shows the ".concat(taxFilingYear).concat(" Adjusted Gross Income(AGI) and taxes paid.</p>");
    var textNineVal = "<p>- MUST provide confirmation of non-filling from the IRS through<br>&nbsp; form 4506-T (box 7), or online through IRS dated on or after<br>&nbsp; October 1,".concat(taxFilingYear).concat("<br>&nbsp; or provide written statement of non-filing</p>");
    var textElevenVal = "<p style=text-decoration-line: underline;>- MUST provide confirmation of non-filling from the IRS through<br>&nbsp; form 4506-T (box 7), or online through IRS dated on or after<br>&nbsp; October 1, ".concat(taxFilingYear).concat("<br>&nbsp; or provide written statement of non-filing</p>");
    var textTenVal = "<p>- Submit a copy of all your ".concat(taxFilingYear).concat(" Form W-2(s) from your employer<br>&nbsp; or your ").concat(taxFilingYear).concat(" IRS Wage and Income tax Transcript. OR 1099S</p>");
    var textTwelveVal = "<p>- List the names of all your ".concat(taxFilingYear).concat(" employer(s) and the amount<br>&nbsp; earned from each employer in ").concat(taxFilingYear).concat(" in the space provided below</p>");
    //var textThirteenVal = "<p> " .concat (taxFilingYear).concat(" Amount Earned</p>");
    var textFourteenVal = "<p>  If an individual did not file an IRS income tax return, regardless if he/she earned any income from work, MUST provide confirmation of non-filing from the IRS through form 4506-T (box 7) or other relevant taxing authority dated on or after October 1, ".concat(taxFilingYear).concat(":</p>");
    /* var textFifteenVal = "<p>- All W2s, a signed statement with estinated 2020 income and/or business related income amount(s)(if applicable)," .concat
    "a signed  copy of 2018 federal tax return form(1040, 1040A, or 1040EZ), and provide confirmation of non-filing from the IRS through from 4506-T (box 7) dated on or after October 1, " .concat(taxFilingYear) .concat("</p>");*/

    textThirteen.items = " ".concat(taxFilingYear).concat("Amount Earned");
    incomeCHK.items = "I was not employed and had no income earned from work in ".concat(taxFilingYear);
    requireFileCHK.items = "I was employed in ".concat(taxFilingYear).concat(" but not required to file");
    foreignTaxReturnCHK.items = " I/we have filed a ".concat(taxFilingYear).concat(" Foregin Tax Return");

    var textFifteenVal = " ";
    if (financialAidYear == "2021-2022") {
        textFifteenVal = "<li>$12,200 if parents claimed you as a dependent</li> <li>$12,200 if single</li> <li>$18,350 if the head of household</li> <li>$24,400 if married, filing jointly</li> <li>$5 if married, filing separately</li> <li>Or, you had earnings from self-employment of any amount of at least $400.00</li></ul>";
    }
    if (financialAidYear == "2022-2023") {
        textFifteenVal = "<li>$12,400 if parents claimed you as a dependent</li> <li>$12,400 if single</li> <li>$18,650 if the head of household</li> <li>$24,800 if married, filing jointly</li> <li>$5 if married, filing separately</li> <li>Or, you had earnings from self-employment of any amount of at least $400.00</li></ul>";
    }
    var textSixteenVal = "<p> If an individual did not file an IRS income tax return, regardless if he/she earned any income from work, MUST provide confirmation of non-filing from the IRS through form 4506-T (box 7) or other relevant taxing authority dated on or after October 1, ".concat(taxFilingYear).concat(":</p>");

    var tableHeadingVal = "";
    if (financialAidYear == "2021-2022") {
        tableHeadingVal = "2019 Amount Earned";
    }
    if (financialAidYear == "2022-2023") {
        tableHeadingVal = "2020 Amount Earned";
    }

  	$("#formCodeText").html(formCodeTextVal);
    $("#f0ctxpHeadingText").html(titleTextVal);
    $("#f0ctxpTitleText").html(headingTextVal);
    $("#f0ctxpTextOne").html(textOneVal);
    $("#f0ctxpTextTwo").html(textTwoVal);
    $("#f0ctxpTextThree").html(textThreeVal);
    $("#f0ctxpTextFour").html(textFourVal);
    $("#f0ctxpTextFive").html(textFiveVal);
    $("#f0ctxpTextSix").html(textSixVal);
    $("#f0ctxpTextSeven").html(textSevenVal);
    $("#f0ctxpTextEight").html(textEightVal);
    $("#f0ctxpTextNine").html(textNineVal);
    $("#f0ctxpTextTen").html(textTenVal);
    $("#f0ctxpTextEleven").html(textElevenVal);
    $("#f0ctxpTextTwelve").html(textTwelveVal);
    // $("#f0ctxpTextThirteen").html(textThirteenVal);
    $("#f0ctxpTextFourteen").html(textFourteenVal);
    $("#f0ctxpInformationAmountSection1").html(textFifteenVal);
    $("#f0ctxpInformationAmountSection2").html(textSixteenVal);
    $("#tableHeading").html(tableHeadingVal);
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_Date_1_init0 = function (scope) {
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
  Date_1.value = d;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_yesCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_yesCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	noCHK.value = null;
  	noUseIRSCHK.enabled = true;
	separatedCHK.enabled = true;
	taxExtensionCHK.enabled = true;
	foreignTaxReturnCHK.enabled = true;
}
else{
  	noUseIRSCHK.enabled = false;
	separatedCHK.enabled = false;
	taxExtensionCHK.enabled = false;
	foreignTaxReturnCHK.enabled = false;
  	noUseIRSCHK.value = null;
	separatedCHK.value = null;
	taxExtensionCHK.value = null;
	foreignTaxReturnCHK.value = null;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_noCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_noCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	yesCHK.value = null;
  	incomeCHK.enabled = true;
	requireFileCHK.enabled = true;
  	emploeeName1.enabled = true;
    employeeName2.enabled = true;
    employeeName3.enabled = true;
    amount1.enabled = true;
    amount2.enabled = true;
    amount3.enabled = true;
}
else{
  	incomeCHK.enabled = false;
	requireFileCHK.enabled = false;
  	incomeCHK.value = null;
	requireFileCHK.value = null;
  	emploeeName1.value = null;
    employeeName2.value = null;
    employeeName3.value = null;
    amount1.value = null;
    amount2.value = null;
    amount3.value = null;
  	emploeeName1.enabled = false;
    employeeName2.enabled = false;
    employeeName3.enabled = false;
    amount1.enabled = false;
    amount2.enabled = false;
    amount3.enabled = false;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_noUseIRSCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_noUseIRSCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	separatedCHK.value = null;
	taxExtensionCHK.value = null;
	foreignTaxReturnCHK.value = null;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_separatedCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_separatedCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	noUseIRSCHK.value = null;
	taxExtensionCHK.value = null;
	foreignTaxReturnCHK.value = null;
  	separatedDate.enabled = true;  
  	separatedDate.mandatory = true;
}
else{
  	separatedDate.enabled = false;
  	separatedDate.value = null;
  	separatedDate.mandatory = false;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_taxExtensionCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_taxExtensionCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value == 1){
  	noUseIRSCHK.value = null;
	separatedCHK.value = null;
	foreignTaxReturnCHK.value = null;  	
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_foreignTaxCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_foreignTaxCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(this.value == 1){
  	noUseIRSCHK.value = null;
	separatedCHK.value = null;
	taxExtensionCHK.value = null;	 	
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_noIncomeCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_noIncomeCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	requireFileCHK.value = null;
  	yesCHK.value = null;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_notRequireFileCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_notRequireFileCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	incomeCHK.value = null;
  	yesCHK.value = null;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_emploeeName1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_emploeeName1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_amount1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_amount1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_employeeName2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_employeeName2_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_amount2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_amount2_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_employeeName3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_employeeName3_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_amount3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_amount3_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_SupportingDocumentsPanel_init0 = function (scope) {
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
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_NonMedicalSupportingDocument1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_NonMedicalSupportingDocument1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = NonMedicalSupportingDocument1.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	  
	if(extension !== "pdf" && extension !== "jpeg" && extension !== "jpg" && extension !== "png" && extension !== "tif" && extension !== "tiff"){
	 
       NonMedicalSupportingDocument1.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}
	var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;

	if(format.test(NonMedicalSupportingDocument1.fileAttachment.value) === true){
		var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
		NonMedicalSupportingDocument1.fileAttachment.value = doc2NewName;

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_NonMedicalSupportingDocument2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_NonMedicalSupportingDocument2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = NonMedicalSupportingDocument2.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	  
	if(extension !== "pdf" && extension !== "jpeg" && extension !== "jpg" && extension !== "png" && extension !== "tif" && extension !== "tiff"){
	 
       NonMedicalSupportingDocument2.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}
	var format = /[&{}#!@$%^=;\[\]]/;

	if(format.test(NonMedicalSupportingDocument2.fileAttachment.value) === true){
		var doc2NewName = NonMedicalSupportingDocument2.fileAttachment.value.replace(/#|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'-');
		NonMedicalSupportingDocument2.fileAttachment.value = doc2NewName;

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_NonMedicalSupportingDocument3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_NonMedicalSupportingDocument3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = NonMedicalSupportingDocument3.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	  
	if(extension !== "pdf" && extension !== "jpeg" && extension !== "jpg" && extension !== "png" && extension !== "tif" && extension !== "tiff"){
	 
       NonMedicalSupportingDocument3.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}
	var format = /[&{}#!@$%^=;\[\]]/;

	if(format.test(NonMedicalSupportingDocument3.fileAttachment.value) === true){
		var doc2NewName = NonMedicalSupportingDocument3.fileAttachment.value.replace(/#|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'-');
		NonMedicalSupportingDocument3.fileAttachment.value = doc2NewName;

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_StudentCB_valueCommit0 = function (scope) {
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
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_studentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_studentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_studentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_studentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_evaluator_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_evaluator_signChk_valueCommit0 = function (scope) {
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

    }
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_staffSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_staffSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_staffSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_staffSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            getPdf();

function getPdf() {
    //console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, ' and'));
            jsonData.append('formPath', '/content/forms/af/student-tax-filing-statement-f0taxs/student-tax-filing-statement----f0taxs---f1taxs-');
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
 * @function student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_submit1608529416101_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0taxs_student_tax_filing_statement____f0taxs___f1taxs_.generated_submit1608529416101_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(yesCHK.value === null && noCHK.value === null){
  	showErrorModal("Alert !", "Please specify if the student file a 2019/2020 income tax return with the IRS or not?");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].ParentTaxFillingTab[0].yesCHK[0]");
}
else if((yesCHK.value !== null) && (noUseIRSCHK.value === null && separatedCHK.value === null && taxExtensionCHK.value === null && foreignTaxReturnCHK.value === null)){
  	showErrorModal("Alert !", "Please select at least one option for Yes");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].ParentTaxFillingTab[0].ParentTaxFilerCB[0].noUseIRSCHK[0]");
}
else if((noCHK.value !== null) && (incomeCHK.value === null && requireFileCHK.value === null)){
  	showErrorModal("Alert !", "Please select at least one option for No");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].ParentTaxFillingTab[0].ParentNonTaxFilerCB[0].incomeCHK[0]");
}

else{
  	submitAction();
}

function submitAction(){
  aftiaDescCWID.value = firstName.value+ " " + lastName.value + " " + cwid.value;
  EmailSubject.value = "Test - Student Tax Filing Statement Request - (" + cwid.value+")";
  
  if(aidYear.value == "2019"){
    	documentNameForAdobeSign.value = "Student Tax Filing Statement - F0CTXS";
  }
  else if(aidYear.value == "2020"){
    	documentNameForAdobeSign.value = "Student Tax Filing Statement - F1CTXS";
  }

  //var testEmail = "daduong@fullerton.edu";
  //var testEmail = "yjayaram@fullerton.edu";
  var testEmail = "ajeet.chhonkar@thoughtfocus.com";
 // var testEmail = "anupama.dhar@thoughtfocus.com";
  
  HiddenStudentEmail.value = testEmail;
  //parentEmail.value = testEmail;

  guideBridge.submit();
}
        }
	}
}
