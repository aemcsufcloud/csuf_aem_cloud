/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {     		
	FinancialSignaturePanel.visible = false; 
  
  	$.getJSON("https://api.ipify.org?format=json", function(data) {                
        ipAddress.value = data.ip;        
    });
}
else if(StageIndicator.value == "ToFinancialAid"){
	StudentInformation.enabled = false;
	if(formType.value == "CDA"){
		CDAStudentTaxFillingTab.visible = true;
		CDAStudentTaxFillingTab.enabled = false;
		FAFSAStudentTaxFillingTab.visible = false;
		CDAInformationTab.visible = true;
		CDAInformationTab.enabled = false;
		FAFSAInformationTab.visible = false;
	}
	if(formType.value == "FAFSA"){
		CDAStudentTaxFillingTab.visible = false;		
		FAFSAStudentTaxFillingTab.visible = true;
		FAFSAStudentTaxFillingTab.enabled = false;
		CDAInformationTab.visible = false;		
		FAFSAInformationTab.visible = true;
		FAFSAInformationTab.enabled = false;
	}
	//ParentTaxFillingTab.enabled = false;
  	StudentSignaturePanel.enabled = false;
  	SupportingDocumentsPanel.visible = false;
  	FinancialSignaturePanel.visible = true;  	
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            function getUrlParameters(formParam){  	
	var formUrl = window.location.search;
	var urlParams = new URLSearchParams(formUrl);	
	var paramValue;

	if(urlParams.has(formParam)){
		paramValue = urlParams.get(formParam);
	}	
	return paramValue;
}

if (StageIndicator.value === null) {
    //debugger;
    /*var studentFormURL = window.location.search;
    var urlParams = new URLSearchParams(studentFormURL);
    var typeOfForm;
    var formCodeTextVal;
	var aidYearValue; 

    if (urlParams.has('formType')) {
        typeOfForm = urlParams.get('formType');
    }*/ 
  
  	var typeOfForm = getUrlParameters('formType');

    if (typeOfForm == "CDA") {
		formType.value = "CDA";
        CDAStudentTaxFillingTab.visible = true;
        FAFSAStudentTaxFillingTab.visible = false;
        CDAInformationTab.visible = true;
        FAFSAInformationTab.visible = false;		
		loggedInDetails();

    } else if (typeOfForm == "FAFSA") {
		formType.value = "FAFSA";
        CDAStudentTaxFillingTab.visible = false;
        FAFSAStudentTaxFillingTab.visible = true;
        CDAInformationTab.visible = false;
        FAFSAInformationTab.visible = true;		
		loggedInDetails();

    } else{
        /*showErrorModal("Alert !", "No matching records found");
        CDAStudentTaxFillingTab.visible = false;
        FAFSAStudentTaxFillingTab.visible = false;
        CDAInformationTab.visible = false;
        FAFSAInformationTab.visible = false;
      	submitButton.enabled = false;*/
		
		
		
		
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
			CDAStudentTaxFillingTab.visible = true;
			FAFSAStudentTaxFillingTab.visible = false;
			CDAInformationTab.visible = true;
			FAFSAInformationTab.visible = false;		
			loggedInDetails();
		};

		document.getElementById("secondButton2").onclick = function() {
			modal.style.display = "none";
			formType.value = "FAFSA";
			CDAStudentTaxFillingTab.visible = false;
			FAFSAStudentTaxFillingTab.visible = true;
			CDAInformationTab.visible = false;
			FAFSAInformationTab.visible = true;		
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
			//var userValue = 'mariana2';	 	  	// two Aid Year
			//var userValue = 'majesticallexi'; // one Aid Year
			//var userValue = 'mchoi88';			 	// no Aid Year
			workflow_initiator.value = userValue;
			caseID();
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
          action:"CV_USER_DETAILS",
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
			
			if(response.length > 0){

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

				var typeOfAidYear = getUrlParameters('aidYear');
              	console.log("typeOfAidYear= "+ typeOfAidYear);

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
			}
			else{
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
        aidYear.value = "2019";		
        financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;

		if(formType.value == "CDA"){
			formCode.value = "F0CTXS";
            formCodeVal = "F0CTXS";
			getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal);
		}
		else if(formType.value == "FAFSA"){
			formCode.value = "F0TAXS";
            formCodeVal = "F0TAXS";
			getFAFSAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal);
		}
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = "2022-2023";
        aidYear.value = "2020";		
        financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;

        if(formType.value == "CDA"){
			formCode.value = "F1CTXS";
            formCodeVal = "F1CTXS";
			getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal);
		}
		else if(formType.value == "FAFSA"){
			formCode.value = "F1TAXS";
            formCodeVal = "F1TAXS";
			getFAFSAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal);
		}
    };
}


function singleAidYear() {  
  
  	var typeOfAidYear = getUrlParameters('aidYear'); 
  	var financialAidYearVal="";
    var formCodeVal = "";
  
  	if(formType.value == "CDA" && typeOfAidYear == '0'){
      	financialAidYearVal = "2021-2022";
      	aidYear.value = "2019";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F0CTXS";
        formCodeVal = "F0CTXS";
		getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }
  	else if(formType.value == "CDA" && typeOfAidYear == '1'){
      	financialAidYearVal = "2022-2023";
      	aidYear.value = "2020";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F1CTXS";
        formCodeVal = "F1CTXS";
		getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }
    else if(formType.value == "FAFSA" && typeOfAidYear == '0'){
      	financialAidYearVal = "2021-2022";
      	aidYear.value = "2019";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F0TAXS";
        formCodeVal = "F0TAXS";
		getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }
  	else if(formType.value == "FAFSA" && typeOfAidYear == '1'){
      	financialAidYearVal = "2022-2023";
      	aidYear.value = "2020";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F1TAXS";
        formCodeVal = "F1TAXS";
		getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }
  	else if(formType.value == "CDA" && typeOfAidYear != '0'){
      	financialAidYearVal = "2021-2022";
      	aidYear.value = "2019";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F0CTXS";
        formCodeVal = "F0CTXS";
		getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }
  	else if(formType.value == "FAFSA" && typeOfAidYear != '0'){
      	financialAidYearVal = "2021-2022";
      	aidYear.value = "2019";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F0TAXS";
        formCodeVal = "F0TAXS";
		getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }
}




if (StageIndicator.value !== null) {
    aidYearValue =  financialAidYear.value;
 
	if(formType.value == "CDA"){
		getCDAFinancialAidYear(aidYearValue);
	}
	else if(formType.value == "FAFSA"){
		getFAFSAFinancialAidYear(aidYearValue);
	}    
}



function getCDAFinancialAidYear(financialAidYear) {
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
    var textOneVal = "To verify students'(and spouse's if married) ".concat(taxFilingYear).concat(" income and wages information, you must provide the information below.");
    var textTwoVal = "<p><b>&nbsp; <u>Instructions for completing this form:</u></b><br><b>&nbsp; Complete Section A</b> whether or not you, the student (and your spouse), have already completed your <b><u>".concat(taxFilingYear).concat("</u></b> U.S. Federal Tax Return</p>");
    var textThreeVal = "Did you, the student file a ".concat(taxFilingYear).concat(" income tax return with the IRS? <b>(if married include spouse)</b>");

    var textFourVal = "";
    if (financialAidYear == "2021-2022") {
        textFourVal = "<p>- Submit your ".concat(taxFilingYear).concat(" IRS Tax Return Transcript or ").concat(taxFilingYear).concat(" 1040 Tax<br>&nbsp; Returns along with <b>schedules 1,2,3 if applicable</b><br>- IRS website http://www.irs.gov and clicking on &quot;Get Transcript of<br>&nbsp; Your Tax Records&quot;, OR Calling 1-800-908-9946 to request an<br>&nbsp; IRS Tax Return Transcript for the ").concat(taxFilingYear).concat(" year");
    }
    if (financialAidYear == "2022-2023") {
        textFourVal = "<p>- Submit your ".concat(taxFilingYear).concat(" IRS Tax Return Transcript or ").concat(taxFilingYear).concat(" 1040 Tax<br>&nbsp; Returns along with <b>all schedules if applicable</b><br>- IRS website http://www.irs.gov and clicking on &quot;Get Transcript of<br>&nbsp; Your Tax Records&quot;, OR Calling 1-800-908-9946 to request an<br>&nbsp; IRS Tax Return Transcript for the ").concat(taxFilingYear).concat(" year");
    }

    var textFiveVal = "";
    if (financialAidYear == "2021-2022") {
        textFiveVal = "<p>- Submit a SIGNED copy of the 2019 IRS Tax Return Transcript<br> &nbsp;or ".concat(taxFilingYear).concat(" 1040 Tax Returns along with <b>schedules 1,2,3 if applicable</b><br>- AND copied of all W2s, as they are required to determine your<br>&nbsp; portion of earned income</p>");
    }
    if (financialAidYear == "2022-2023") {
        textFiveVal = "<p>- Submit a SIGNED copy of the 2020 IRS Tax Return Transcript<br> &nbsp;or ".concat(taxFilingYear).concat(" 1040 Tax Returns along with <b>all schedules if applicable</b><br>- AND copied of all W2s, as they are required to determine your<br>&nbsp; portion of earned income</p>");
    }

    var textSixVal = "<p>- If tax extension is beyond the 6 month <b>October 15, ".concat(taxFilingYear).concat(" deadline:</b></p>");

    var textSevenVal = "";
    if (financialAidYear == "2021-2022") {
        textSevenVal = "<p>- Submit form 4868, unexpired IRS approval of extensions beyond the<br>&nbsp; &nbsp;automatic 6-month extension<br>- All 2018 W2s, a signed statement with estimated ".concat(taxFilingYear).concat(" income and/<br>&nbsp; or business income amount(s) (if applicable), a signed copy of 2018<br>&nbsp; federal tax return form (1040, 1040A, or 1040EZ), and provide<br>&nbsp; confirmation of non-filing from the IRS through form 4506-T (box 7),<br>&nbsp; or other relevant taxing authority dated on or after October 1,  ").concat(taxFilingYear).concat(" .</p>");
    }

    if (financialAidYear == "2022-2023") {
        textSevenVal = "<p>- Submit form 4868, unexpired IRS approval of extensions beyond the<br>&nbsp; &nbsp;automatic 6-month extension<br>- All  ".concat(taxFilingYear).concat("  W2s, a signed statement with estimated ").concat(taxFilingYear).concat(" income and/<br>&nbsp; or business income amount(s) (if applicable), a signed copy of 2019<br>&nbsp; federal tax return form (1040, 1040A, or 1040EZ), and provide<br>&nbsp; confirmation of non-filing from the IRS through form 4506-T (box 7),<br>&nbsp; or other relevant taxing authority dated on or after October 1,  ").concat(taxFilingYear).concat(" .</p>");
    }

    var textEightVal = "<p>- Submit a signed and translated copy of your foreign tax return, which&nbsp;<br>&nbsp; &nbsp;shows the ".concat(taxFilingYear).concat(" Adjusted Gross Income(AGI) and taxes paid.</p>");

    var textNineVal = "<p>- Independent students as defined on the FAFSA <b><u>MUST</u></b> provide<br>&nbsp; confirmation of non-filing from the IRS through form 4506-T (box 7),<br>&nbsp; or online through IRS, or other relevant taxing authority dated on or<br> after October 1, ".concat(taxFilingYear).concat(", or provide a written statement of non-filing.<br>- Dependent students as defined on the FAFSA are <b><u>NOT</u></b> required to<br>&nbsp; provide confirmation of non-filing.</p>");

    var textElevenVal = "<p>- Independent students as defined on the FAFSA <b><u>MUST</u></b> provide<br>&nbsp; confirmation of non-filing from the IRS through form 4506-T (box 7),<br>&nbsp; or online through IRS, or other relevant taxing authority dated on or<br> after October 1, ".concat(taxFilingYear).concat(", or provide a written statement of non-filing.</p>");


    var textTenVal = "<p>- Submit a copy of all your ".concat(taxFilingYear).concat(" Form W-2(s) from your employer<br>&nbsp; or your ").concat(taxFilingYear).concat(" IRS Wage and Income tax Transcript. OR 1099s</p>");
    var textTwelveVal = "<p>- List the names of all your employer(s) and the amount<br>&nbsp; earned from each employer in ".concat(taxFilingYear).concat("</p>");
    //var textThirteenVal = "<p> " .concat (taxFilingYear).concat(" Amount Earned</p>");
    var textFourteenVal = "<p>  If an individual did not file an IRS income tax return, regardless if he/she earned any income from work, MUST provide confirmation of non-filing from the IRS through form 4506-T (box 7) or other relevant taxing authority dated on or after October 1, ".concat(taxFilingYear).concat(":</p>");
    /* var textFifteenVal = "<p>- All W2s, a signed statement with estinated 2020 income and/or business related income amount(s)(if applicable)," .concat
    "a signed  copy of 2018 federal tax return form(1040, 1040A, or 1040EZ), and provide confirmation of non-filing from the IRS through from 4506-T (box 7) dated on or after October 1, " .concat(taxFilingYear) .concat("</p>");*/

    //textThirteen.items = " ".concat(taxFilingYear).concat("Amount Earned");
    var studentTaxVal = "<b>I have filed a ".concat(taxFilingYear).concat(" Tax Return</b>");
    var incomeCHKVal = "<b>I was not employed and had no income earned from work in ".concat(taxFilingYear).concat("</b>");
    var requiredCHKVal = "<b>I was employed in ".concat(taxFilingYear).concat(" but not required to file</b>");
    var foreignTaxCHKVal = "<b>I/we have filed a ".concat(taxFilingYear).concat(" Foreign Tax Return</b>");

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
    $("#f0taxsHeadingText").html(titleTextVal);
    $("#f0ctxsTitleText").html(headingTextVal);
    $("#f0ctxsTextOne").html(textOneVal);
    $("#f0ctxsTextTwo").html(textTwoVal);
    $("#f0ctxsTextThree").html(textThreeVal);
    $("#f0ctxsTextFour").html(textFourVal);
    $("#f0ctxsTextFive").html(textFiveVal);
    $("#f0ctxsTextSix").html(textSixVal);
    $("#f0ctxsTextSeven").html(textSevenVal);
    $("#f0ctxsTextEight").html(textEightVal);
    $("#f0ctxsTextNine").html(textNineVal);
    $("#f0ctxsTextTen").html(textTenVal);
    $("#f0ctxsTextEleven").html(textElevenVal);
    $("#f0ctxsTextTwelve").html(textTwelveVal);
    // $("#f0ctxpTextThirteen").html(textThirteenVal);
    $("#f0ctxpTextFourteen").html(textFourteenVal);
    $("#f0ctxpInformationAmountSection1").html(textFifteenVal);
    $("#f0ctxpInformationAmountSection2").html(textSixteenVal);
    $("#tableHeading").html(tableHeadingVal);
    $("#studentTaxText").html(studentTaxVal);
    $("#incomeCHKText").html(incomeCHKVal);
    $("#requiredCHKText").html(requiredCHKVal);
    $("#foreignTaxCHKText").html(foreignTaxCHKVal);
}




function getFAFSAFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);

    var formCodeTextVal = "";
    if (financialAidYear == "2021-2022") {
        formCodeTextVal = "<p><b>F0TAXS</b></p>";
    }
    if (financialAidYear == "2022-2023") {
        formCodeTextVal = "<p><b>F1TAXS</b></p>";
    }

    var titleTextVal = "<p><b>STUDENT (AND SPOUSE) ".concat(taxFilingYear).concat(" TAX FILING STATEMENT(").concat(financialAidYearVal).concat(")</b></p>");
    var headingTextVal = "<p><b>STUDENT (AND SPOUSE) ".concat(taxFilingYear).concat(" TAX FILING STATEMENT(").concat(financialAidYearVal).concat(")</b></p>");
    var textOneVal = "To verify student (and student's spouse, if married) ".concat(taxFilingYear).concat(" income and wages information, you must provide the information below.");
    var textTwoVal = "<p><b>&nbsp; <u>Instructions for completing this form:</u></b><br><b>&nbsp; Complete Section A</b> whether or not you, the student (and your spouse), have already completed your <b><u>".concat(taxFilingYear).concat("</u></b> U.S. Federal Tax Return</p>");
    var textThreeVal = "Did you, the student, file a ".concat(taxFilingYear).concat(" income tax return with the IRS? <b>(if married, include spouse)</b>");

    var textFourVal = "";
    if (financialAidYear == "2021-2022") {
        textFourVal = "<p>- Submit your ".concat(taxFilingYear).concat(" Tax Return Transcript or a signed copy of the <br>&nbsp; ").concat(taxFilingYear).concat(" 1040 Tax Returns along with <b> schedules 1,2,3 if applicable</b><br>- Obtain your transcript from the IRS website http://www.irs.gov and <br>&nbsp; click on 'Get Transcript of Your Tax Records' OR by calling <br>&nbsp; (800)908-9946 to request an IRS Tax Return Transcript for the 2019<br>&nbsp;  year</p>");
    }
    if (financialAidYear == "2022-2023") {
        textFourVal = "<p>- Submit your ".concat(taxFilingYear).concat(" Tax Return Transcript or a signed copy of the <br>&nbsp; ").concat(taxFilingYear).concat(" 1040 Tax Returns along with <b>all schedules if applicable</b><br>- Obtain your transcript from the IRS website http://www.irs.gov and <br>&nbsp; click on 'Get Transcript of Your Tax Records' OR by calling <br>&nbsp; (800)908-9946 to request an IRS Tax Return Transcript for the 2020<br>&nbsp;  year</p>");
    }

    var textFiveVal = "";
    if (financialAidYear == "2021-2022") {
        textFiveVal = "<p>- Submit a SIGNED copy of the 2019 IRS Tax Return Transcript or ".concat(taxFilingYear).concat("<br>&nbsp; 1040 Tax Returns along with <b>schedules 1,2,3 if applicable</b><br>- AND copied of all W2s, as they are required to determine your<br>&nbsp; portion of earned income</p>");
    }
    if (financialAidYear == "2022-2023") {
        textFiveVal = "<p>- Submit a SIGNED copy of the 2020 IRS Tax Return Transcript or ".concat(taxFilingYear).concat("<br>&nbsp; 1040 Tax Returns along with <b>all schedules if applicable</b><br>- AND copied of all W2s, as they are required to determine your<br>&nbsp; portion of earned income</p>");
    }

    var textSixVal = "<p>- If tax extension is beyond the 6 month <b>October 15, ".concat(taxFilingYear).concat(" deadline:</b></p>");

    var textSevenVal = "";
    if (financialAidYear == "2021-2022") {
        textSevenVal = "<p>- Submit form 4868, unexpired IRS approval of extensions beyond the<br>&nbsp; &nbsp;automatic 6-month extension<br>- All W2s, a signed statement with estimated ".concat(taxFilingYear).concat(" income and/<br>&nbsp; or business income amount(s) (if applicable), a signed<br>&nbsp;  copy of your 2018 federal tax return form (1040, 1040A, or<br>&nbsp; 1040EZ), and provide confirmation of non-filing from the IRS<br>&nbsp; through form 4506-T (box 7), dated on or after October 1,  ").concat(taxFilingYear).concat(" .</p>");
    }

    if (financialAidYear == "2022-2023") {
        textSevenVal = "<p>- Submit form 4868, unexpired IRS approval of extensions beyond the<br>&nbsp; &nbsp;automatic 6-month extension<br>- All W2s, a signed statement with estimated ".concat(taxFilingYear).concat(" income and/<br>&nbsp; or business income amount(s) (if applicable), a signed <br>&nbsp; copy of your 2019federal tax return form (1040, 1040A, or<br>&nbsp; 1040EZ), and provide confirmation of non-filing from the IRS<br>&nbsp; through form 4506-T (box 7),<br>&nbsp; dated on or after October 1,  ").concat(taxFilingYear).concat(" .</p>");
    }

    var textEightVal = "<p>- Submit a signed and translated copy of your foreign tax return, which&nbsp;<br>&nbsp; &nbsp;shows the ".concat(taxFilingYear).concat(" Adjusted Gross Income(AGI) and taxes paid.</p>");

    var textNineVal = "<p>- Independent students as defined on the FAFSA <b><u>MUST</u></b> provide<br>&nbsp; confirmation of non-filing from the IRS through form 4506-T (box 7),<br>&nbsp; or online through IRS dated on or after October 1, ".concat(taxFilingYear).concat(", or written<br>&nbsp; statement of non-filing<br>- Dependent students as defined on the FAFSA are <b><u>NOT</u></b> required to<br>&nbsp; provide confirmation of non-filing.</p>");

    var textElevenVal = "<p>- Independent students as defined on the FAFSA&nbsp;<b><u>MUST</u></b> provide<br>&nbsp; confirmation of non-filing from the IRS through&nbsp;form 4506-T<br>&nbsp; (box 7), or online through IRS dated on or after&nbsp;October 1, ".concat(taxFilingYear).concat(",<br>&nbsp; or provide written statement of non-filing</p>");


    var textTenVal = "<p>- Submit a copy of all your ".concat(taxFilingYear).concat(" Form W-2(s) from your employer<br>&nbsp; or your ").concat(taxFilingYear).concat(" IRS Wage and Income tax Transcript. OR 1099s</p>");
    var textTwelveVal = "<p>- List the names of all your ".concat(taxFilingYear).concat(" employer(s) and the amount<br>&nbsp; earned from each employer in ").concat(taxFilingYear).concat("</p>");
    //var textThirteenVal = "<p> " .concat (taxFilingYear).concat(" Amount Earned</p>");
    var textFourteenVal = "<p>  If an individual did not file an IRS income tax return, regardless if he/she earned any income from work, MUST provide confirmation of non-filing from the IRS through form 4506-T (box 7) or other relevant taxing authority dated on or after October 1, ".concat(taxFilingYear).concat(":</p>");
    /* var textFifteenVal = "<p>- All W2s, a signed statement with estinated 2020 income and/or business related income amount(s)(if applicable)," .concat
    "a signed  copy of 2018 federal tax return form(1040, 1040A, or 1040EZ), and provide confirmation of non-filing from the IRS through from 4506-T (box 7) dated on or after October 1, " .concat(taxFilingYear) .concat("</p>");*/

    //textThirteen.items = " ".concat(taxFilingYear).concat("Amount Earned");
    var studentTaxVal = "<b>I have filed a ".concat(taxFilingYear).concat(" Tax Return</b>");
    var incomeCHKVal = "<b>I was not employed and had no income earned from work in ".concat(taxFilingYear).concat("</b>");
    var requiredCHKVal = "<b>I was employed in ".concat(taxFilingYear).concat(" but not required to file</b>");
    var foreignTaxCHKVal = "<b>I/we have filed a ".concat(taxFilingYear).concat(" Foreign Tax Return</b>");

    var textFifteenVal = " ";
    if (financialAidYear == "2021-2022") {
        textFifteenVal = "<li>$12,200 if parents claimed you as a dependent</li> <li>$12,200 if single</li> <li>$18,350 if the head of household</li> <li>$24,400 if married, filing jointly</li> <li>$5 if married, filing separately</li> <li>Or, you had earnings from self-employment of any amount of at least $400.00</li></ul>";
    }
    if (financialAidYear == "2022-2023") {
        textFifteenVal = "<li>$12,400 if parents claimed you as a dependent</li> <li>$12,400 if single</li> <li>$18,650 if the head of household</li> <li>$24,800 if married, filing jointly</li> <li>$5 if married, filing separately</li> <li>Or, you had earnings from self-employment of any amount of at least $400.00</li></ul>";
    }
   /* var textSixteenVal = "<p> If an individual did not file an IRS income tax return, regardless if he/she earned any income from work, MUST provide confirmation of non-filing from the IRS through form 4506-T (box 7) or other relevant taxing authority dated on or after October 1, ".concat(taxFilingYear).concat(":</p>");*/
  
  	var textSixteenVal = "<p> If an individual did not file an IRS income tax return, regardless if he/she earned any income from work, MUST provide confirmation of on-filing dated on or<br>&nbsp; after October 1, ".concat(taxFilingYear).concat(" from the IRS or other relevant taxing authority and submit it with this form to the Office of Financial Aid. Ways to request letter from<br>&nbsp; the IRS include").concat(":</p>");

    var tableHeadingVal = "";
    if (financialAidYear == "2021-2022") {
        tableHeadingVal = "2019 Amount Earned";
    }
    if (financialAidYear == "2022-2023") {
        tableHeadingVal = "2020 Amount Earned";
    }

    $("#formCodeText").html(formCodeTextVal);
    $("#f0taxsHeadingText").html(titleTextVal);
    $("#f0taxsTitleText").html(headingTextVal);
    $("#f0taxsTextOne").html(textOneVal);
    $("#f0taxsTextTwo").html(textTwoVal);
    $("#f0taxsTextThree").html(textThreeVal);
    $("#f0taxsTextFour").html(textFourVal);
    $("#f0taxsTextFive").html(textFiveVal);
    $("#f0taxsTextSix").html(textSixVal);
    $("#f0taxsTextSeven").html(textSevenVal);
    $("#f0taxsTextEight").html(textEightVal);
    $("#f0taxsTextNine").html(textNineVal);
    $("#f0taxsTextTen").html(textTenVal);
    $("#f0taxsTextEleven").html(textElevenVal);
    $("#f0taxsTextTwelve").html(textTwelveVal);
    // $("#f0taxpTextThirteen").html(textThirteenVal);
    $("#f0taxpTextFourteen").html(textFourteenVal);
    $("#f0taxpInformationAmountSection1").html(textFifteenVal);
    $("#f0taxpInformationAmountSection2").html(textSixteenVal);    
    $("#fotaxstableHeading").html(tableHeadingVal);
    $("#studentTaxText").html(studentTaxVal);
    $("#f0taxsIncomeCHKText").html(incomeCHKVal);
    $("#f0taxsRequiredCHKText").html(requiredCHKVal);
    $("#f0taxsForeignTaxCHKText").html(foreignTaxCHKVal);
}

function checkforDuplicateSubmissions(formCodeVal) {
    var tableName = "AEM_TAX_FILING_STATEMENT";
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            
function getUrlParameters(formParam){  	
	var formUrl = window.location.search;
	var urlParams = new URLSearchParams(formUrl);	
	var paramValue;

	if(urlParams.has(formParam)){
		paramValue = urlParams.get(formParam);
	}	
	return paramValue;
}

if (StageIndicator.value === null) {
    //debugger;
    /*var studentFormURL = window.location.search;
    var urlParams = new URLSearchParams(studentFormURL);
    var typeOfForm;
    var formCodeTextVal;
	var aidYearValue; 

    if (urlParams.has('formType')) {
        typeOfForm = urlParams.get('formType');
    }*/ 
  
  	var typeOfForm = getUrlParameters('formType');

    if (typeOfForm == "CDA") {
		formType.value = "CDA";
        CDAStudentTaxFillingTab.visible = true;
        FAFSAStudentTaxFillingTab.visible = false;
        CDAInformationTab.visible = true;
        FAFSAInformationTab.visible = false;		
		loggedInDetails();

    } else if (typeOfForm == "FAFSA") {
		formType.value = "FAFSA";
        CDAStudentTaxFillingTab.visible = false;
        FAFSAStudentTaxFillingTab.visible = true;
        CDAInformationTab.visible = false;
        FAFSAInformationTab.visible = true;		
		loggedInDetails();

    } else{
        /*showErrorModal("Alert !", "No matching records found");
        CDAStudentTaxFillingTab.visible = false;
        FAFSAStudentTaxFillingTab.visible = false;
        CDAInformationTab.visible = false;
        FAFSAInformationTab.visible = false;
      	submitButton.enabled = false;*/
		
		
		
		
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
			CDAStudentTaxFillingTab.visible = true;
			FAFSAStudentTaxFillingTab.visible = false;
			CDAInformationTab.visible = true;
			FAFSAInformationTab.visible = false;		
			loggedInDetails();
		};

		document.getElementById("secondButton2").onclick = function() {
			modal.style.display = "none";
			formType.value = "FAFSA";
			CDAStudentTaxFillingTab.visible = false;
			FAFSAStudentTaxFillingTab.visible = true;
			CDAInformationTab.visible = false;
			FAFSAInformationTab.visible = true;		
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
			//var userValue = 'veronica.maciel';	 	  	// two Aid Year
			//var userValue = 'majesticallexi'; // one Aid Year
			//var userValue = 'mchoi88';			 	// no Aid Year
			workflow_initiator.value = userValue;
			caseID();
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
          action:"CV_USER_DETAILS",
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
              //  HiddenStudentEmail.value = response[0].PREF_EMAIL;
                //HiddenStudentEmail.value = "yjayaram@fullerton.edu";
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
			
			if(response.length > 0){

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

				var typeOfAidYear = getUrlParameters('aidYear');
              	console.log("typeOfAidYear= "+ typeOfAidYear);

				if (typeOfAidYear == "0") {
                    singleAidYear();
                } else if (typeOfAidYear == "1") {
                    singleAidYear();
                }else if (identifyAidYearFlag == "OneAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
                    singleAidYear();
                } else if (identifyAidYearFlag == "TwoAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
                    //aidYearPopup();
                    singleAidYear();
                } else {
					//showErrorModal("Alert !", "No matching records found for the Aid Year");
					singleAidYear();
				}
			}
			else{
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
        aidYear.value = financialAidvalues.AidYearOne-3;	
        financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;

		if(formType.value == "CDA"){
			formCode.value = financialAidvalues.FinAidYearFormCodeOne+"CTXS";
            formCodeVal = financialAidvalues.FinAidYearFormCodeOne+"CTXS";
			getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
		}
		else if(formType.value == "FAFSA"){
			formCode.value = financialAidvalues.FinAidYearFormCodeOne+"TAXS";
            formCodeVal = financialAidvalues.FinAidYearFormCodeOne+"TAXS";
			getFAFSAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
		}
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = financialAidvalues.FinAidYearTwo;
        aidYear.value = financialAidvalues.AidYearTwo-3;	
        financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;

        if(formType.value == "CDA"){
			formCode.value = financialAidvalues.FinAidYearFormCodeTwo+"CTXS";
            formCodeVal = financialAidvalues.FinAidYearFormCodeTwo+"CTXS";
			getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
		}
		else if(formType.value == "FAFSA"){
			formCode.value = financialAidvalues.FinAidYearFormCodeTwo+"TAXS";
            formCodeVal = financialAidvalues.FinAidYearFormCodeTwo+"TAXS";
			getFAFSAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
		}
    };
}


function singleAidYear() {  
  
  	var typeOfAidYear = getUrlParameters('aidYear'); 
  	var financialAidYearVal="";
    var formCodeVal = "";
  
    //var financialAidvalues = getAidYearValuesOnSingleAidYear();
    var financialAidvalues = getAidYearValuesOnSingleAidYearUpdated();
  
  	if(formType.value == "CDA" && typeOfAidYear == '0'){
      	financialAidYearVal = financialAidvalues.FinAidYearZero;
      	aidYear.value = financialAidvalues.AidYearZero-3;
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F0CTXS";
        formCodeVal = "F0CTXS";
		getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    }
  	else if(formType.value == "CDA" && typeOfAidYear == '1'){
      	financialAidYearVal = financialAidvalues.FinAidYearOne;
      	aidYear.value = financialAidvalues.AidYearOne-3;
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F1CTXS";
        formCodeVal = "F1CTXS";
		getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    }
    else if(formType.value == "FAFSA" && typeOfAidYear == '0'){
      	financialAidYearVal = financialAidvalues.FinAidYearZero;
      	aidYear.value = financialAidvalues.AidYearZero-3;
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F0TAXS";
        formCodeVal = "F0TAXS";
		getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    }
  	else if(formType.value == "FAFSA" && typeOfAidYear == '1'){
      	financialAidYearVal = financialAidvalues.FinAidYearOne;
      	aidYear.value = financialAidvalues.AidYearOne-3;
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F1TAXS";
        formCodeVal = "F1TAXS";
		getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    }
  	else {
        financialAidYearVal = financialAidvalues.FinAidYearGeneral;
        aidYear.value = financialAidvalues.AidYearGeneral-3;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "CDA") {
            formCode.value = financialAidvalues.FormCodeGeneral+"CTXS";
            formCodeVal = financialAidvalues.FormCodeGeneral+"CTXS";
            getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
        } else if (formType.value == "FAFSA") {
            formCode.value = financialAidvalues.FormCodeGeneral+"TAXS";
            formCodeVal = financialAidvalues.FormCodeGeneral+"TAXS";
            getFAFSAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
        }
    }
}




if (StageIndicator.value !== null) {
    aidYearValue =  financialAidYear.value;
 
	if(formType.value == "CDA"){
		getCDAFinancialAidYear(aidYearValue);
	}
	else if(formType.value == "FAFSA"){
		getFAFSAFinancialAidYear(aidYearValue);
	}    
}



function getCDAFinancialAidYear(financialAidYear) {
  
    var financialAidYearVal = financialAidYear;
    var formCodeTextValue = formCode.value;
    var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);
    var taxFilingYear2 = aidYear.value-1;
    var aidYearVal = aidYear.value;

    var formCodeTextVal = "<p><b> ".concat(formCodeTextValue).concat(" </b></p>");
  
    var textChange = getUniqueStatements("STUDENT_TAX_FILING_STATEMENT",aidYearVal,"CDA"); 
    
    var TextOneChange = textChange.TextOne;
    var TextFourOneChange = textChange.TextFourOne;
    var TextFourTwoChange = textChange.TextFourTwo;
    var TextSevenChange = textChange.TextSeven;
    var TextFifteenOneChange = textChange.TextFifteenOne;
    var TextFifteenTwoChange = textChange.TextFifteenTwo; 
    var TextFifteenThreeChange = textChange.TextFifteenThree;
    var TextFifteenFourChange = textChange.TextFifteenFour; 
    var TextAllW2Change = textChange.TextAllW2;
    var TextNineChange = textChange.TextNine;
    
    AmtText1.value= TextFifteenOneChange;
    AmtText2.value= TextFifteenTwoChange;
    AmtText3.value= TextFifteenThreeChange;
    AmtText4.value= TextFifteenFourChange;
  
    CDAScheduleText1.value= TextFourTwoChange;
    CDAScheduleText2.value= TextFourTwoChange;
  
    TextOneYrChange.value=TextOneChange;
  
    CB1TextOneYrChange.value=TextFourTwoChange;
  
    AllW2Year.value=TextAllW2Change;
  
    if (aidYear.value === "2022") {
    CDAStudentTaxFillingTab.visible = false;
    FAFSAStudentTaxFillingTab.visible = false;
    CDATAxFiling2025.visible = true;

    CDAInformationTab.visible = false;
    FAFSAInformationTab.visible = false;
    InformationTab2025.visible = true;
    } else {
    CDATAxFiling2025.visible = false;
    InformationTab2025.visible = false;
    }
    
    var titleTextVal = "<p><b>STUDENT (AND SPOUSE) ".concat(taxFilingYear).concat(" TAX FILING STATEMENT(").concat(financialAidYearVal).concat(")<br>CA Dream Act Application</b></p>");
    var headingTextVal = "<p><b>STUDENT (AND SPOUSE) ".concat(taxFilingYear).concat(" TAX FILING STATEMENT(").concat(financialAidYearVal).concat(")<br>CA Dream Act Application</b></p>");
    var textOneVal = "To verify students'(and spouse's if married) ".concat(TextOneChange).concat(" income and wages information, you must provide the information below.");
    var textTwoVal = "<p><b>&nbsp; <u>Instructions for completing this form:</u></b><br><b>&nbsp; Complete Section A</b> whether or not you, the student (and your spouse), have already completed your <b><u>".concat(taxFilingYear).concat("</u></b> U.S. Federal Tax Return</p>");
    var textThreeVal = "Did you, the student file a ".concat(taxFilingYear).concat(" income tax return with the IRS? <b>(if married include spouse)</b>");

    var textFourVal = "<p>- Submit your ".concat(TextFourOneChange).concat(" IRS Tax Return Transcript</b> ").concat(taxFilingYear).concat(" 1040 Tax<br>&nbsp; Returns along with <b>".concat(TextFourTwoChange).concat( "</b><br>- IRS website http://www.irs.gov and clicking on &quot;Get Transcript of<br>&nbsp; Your Tax Records&quot;, OR Calling 1-800-908-9946 to request an<br>&nbsp; IRS Tax Return Transcript for the ").concat(taxFilingYear).concat(" year"));
    
  var textFiveVal = "<p>- Submit a SIGNED copy of the ".concat(taxFilingYear).concat(" IRS Tax Return Transcript<br> &nbsp;or ").concat(taxFilingYear).concat(" 1040 Tax Returns along with <b>".concat(TextFourTwoChange).concat( "</b><br>- AND copied of all W2s, as they are required to determine your<br>&nbsp; portion of earned income</p>"));
   
    var textSixVal = "<p>- If tax extension is beyond the 6 month <b>October 15, ".concat(taxFilingYear).concat(" deadline:</b></p>");

    var textSevenVal = "<p> ".concat(TextSevenChange).concat(" .</p>");
    
    var textEightVal = "<p>- Submit a signed and translated copy of your foreign tax return, which&nbsp;<br>&nbsp; &nbsp;shows the ".concat(taxFilingYear).concat(" Adjusted Gross Income(AGI) and taxes paid.</p>");

    var textNineVal = "<p>- Independent students as defined on the FAFSA <b><u>MUST</u></b> provide<br>&nbsp; confirmation of non-filing from the IRS through form 4506-T (box 7),<br>&nbsp; or online through IRS, or other relevant taxing authority dated on or<br> after October 1, ".concat(taxFilingYear).concat(", or provide a written statement of non-filing.<br>- Dependent students as defined on the FAFSA are <b><u>NOT</u></b> required to<br>&nbsp; provide confirmation of non-filing.".concat(TextNineChange).concat("</p>"));

    var textElevenVal = "<p>- Independent students as defined on the FAFSA <b><u>MUST</u></b> provide<br>&nbsp; confirmation of non-filing from the IRS through form 4506-T (box 7),<br>&nbsp; or online through IRS, or other relevant taxing authority dated on or<br> after October 1, ".concat(taxFilingYear).concat(", or provide a written statement of non-filing.</p>");


    var textTenVal = "<p>- Submit a copy of all your ".concat(taxFilingYear).concat(" Form W-2(s) from your employer<br>&nbsp; or your ").concat(taxFilingYear).concat(" IRS Wage and Income tax Transcript. OR 1099s</p>");
    var textTwelveVal = "<p>- List the names of all your employer(s) and the amount<br>&nbsp; earned from each employer in ".concat(taxFilingYear).concat("</p>");
    //var textThirteenVal = "<p> " .concat (taxFilingYear).concat(" Amount Earned</p>");
    var textFourteenVal = "<p>  If an individual did not file an IRS income tax return, regardless if he/she earned any income from work, MUST provide confirmation of non-filing from the IRS through form 4506-T (box 7) or other relevant taxing authority dated on or after October 1, ".concat(taxFilingYear).concat(":</p>");
    /* var textFifteenVal = "<p>- All W2s, a signed statement with estinated 2020 income and/or business related income amount(s)(if applicable)," .concat
    "a signed  copy of 2018 federal tax return form(1040, 1040A, or 1040EZ), and provide confirmation of non-filing from the IRS through from 4506-T (box 7) dated on or after October 1, " .concat(taxFilingYear) .concat("</p>");*/

    //textThirteen.items = " ".concat(taxFilingYear).concat("Amount Earned");
    var studentTaxVal = "<b>I have filed a ".concat(taxFilingYear).concat(" Tax Return</b>");
    var incomeCHKVal = "<b>I was not employed and had no income earned from work in ".concat(taxFilingYear).concat("</b>");
    var requiredCHKVal = "<b>I was employed in ".concat(taxFilingYear).concat(" but not required to file</b>");
    var foreignTaxCHKVal = "<b>I/we have filed a ".concat(taxFilingYear).concat(" Foreign Tax Return</b>");

    var textFifteenVal = "<li>".concat(TextFifteenOneChange).concat(" if parents claimed you as a dependent</li> <li>".concat(TextFifteenTwoChange).concat(" if single</li> <li>".concat(TextFifteenThreeChange).concat(" if the head of household</li> <li>".concat(TextFifteenFourChange).concat(" if married, filing jointly</li> <li>$5.00 if married, filing separately</li> <li>Or, you had earnings from self-employment of any amount of at least $400.00</li></ul>")))); 
    
    var textSixteenVal = "<p> If an individual did not file an IRS income tax return, regardless if he/she earned any income from work, MUST provide confirmation of non-filing from the IRS through form 4506-T (box 7) or other relevant taxing authority dated on or after October 1, ".concat(taxFilingYear).concat(":</p>");

    var tableHeadingVal = "<p> ".concat(taxFilingYear).concat(" Amount Earned</p>");
      

    $("#formCodeText").html(formCodeTextVal);
    $("#f0taxsHeadingText").html(titleTextVal);
    $("#f0ctxsTitleText").html(headingTextVal);
    $("#f0ctxsTextOne").html(textOneVal);
    $("#f0ctxsTextTwo").html(textTwoVal);
    $("#f0ctxsTextThree").html(textThreeVal);
    $("#f0ctxsTextFour").html(textFourVal);
    $("#f0ctxsTextFive").html(textFiveVal);
    $("#f0ctxsTextSix").html(textSixVal);
    $("#f0ctxsTextSeven").html(textSevenVal);
    $("#f0ctxsTextEight").html(textEightVal);
    $("#f0ctxsTextNine").html(textNineVal);
    $("#f0ctxsTextTen").html(textTenVal);
    $("#f0ctxsTextEleven").html(textElevenVal);
    $("#f0ctxsTextTwelve").html(textTwelveVal);
    // $("#f0ctxpTextThirteen").html(textThirteenVal);
    $("#f0ctxpTextFourteen").html(textFourteenVal);
    $("#f0ctxpInformationAmountSection1").html(textFifteenVal);
    $("#f0ctxpInformationAmountSection2").html(textSixteenVal);
    $("#tableHeading").html(tableHeadingVal);
    $("#studentTaxText").html(studentTaxVal);
    $("#incomeCHKText").html(incomeCHKVal);
    $("#requiredCHKText").html(requiredCHKVal);
    $("#foreignTaxCHKText").html(foreignTaxCHKVal);
}




function getFAFSAFinancialAidYear(financialAidYear) {

    var financialAidYearVal = financialAidYear;
    var formCodeTextValue = formCode.value;
    var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);
    var aidYearVal = aidYear.value;
  
    var textChange = getUniqueStatements("STUDENT_TAX_FILING_STATEMENT",aidYearVal,"FAFSA"); 
  
    var TextFifteenOneChange = textChange.TextFifteenOne;
    var TextFifteenTwoChange = textChange.TextFifteenTwo; 
    var TextFifteenThreeChange = textChange.TextFifteenThree;
    var TextFifteenFourChange = textChange.TextFifteenFour;
    var TextFourChangeFAFSA = textChange.TextFour;
    var TextSevenChangeFAFSA = textChange.TextSeven;
    var Text3rdCBCopyofYourYearChangeFAFSA= textChange.Text3rdCBCopyofYourYearChange;
    var TextNineChange = textChange.TextNine;
  
    AmtText1.value= TextFifteenOneChange;
    AmtText2.value= TextFifteenTwoChange;
    AmtText3.value= TextFifteenThreeChange;
    AmtText4.value= TextFifteenFourChange;  

    FAFSAScheduleText1.value= TextFourChangeFAFSA;
    FAFSAScheduleText2.value= TextFourChangeFAFSA;
    
    TextOneYrChange.value=taxFilingYear;
  
    CB3CopyofyourYear.value=Text3rdCBCopyofYourYearChangeFAFSA;
  
    if (aidYear.value === "2022") {
    CDAStudentTaxFillingTab.visible = false;
    FAFSAStudentTaxFillingTab.visible = false;
    CDATAxFiling2025.visible = true;

    CDAInformationTab.visible = false;
    FAFSAInformationTab.visible = false;
    InformationTab2025.visible = true;
    } else {
    CDATAxFiling2025.visible = false;
    InformationTab2025.visible = false;
    }
    
    var formCodeTextVal = "<p><b> ".concat(formCodeTextValue).concat(" </b></p>");

    var titleTextVal = "<p><b>STUDENT (AND SPOUSE) ".concat(taxFilingYear).concat(" TAX FILING STATEMENT(").concat(financialAidYearVal).concat(")</b></p>");
    var headingTextVal = "<p><b>STUDENT (AND SPOUSE) ".concat(taxFilingYear).concat(" TAX FILING STATEMENT(").concat(financialAidYearVal).concat(")</b></p>");
    var textOneVal = "To verify student (and student's spouse, if married) ".concat(taxFilingYear).concat(" income and wages information, you must provide the information below.");
    var textTwoVal = "<p><b>&nbsp; <u>Instructions for completing this form:</u></b><br><b>&nbsp; Complete Section A</b> whether or not you, the student (and your spouse), have already completed your <b><u>".concat(taxFilingYear).concat("</u></b> U.S. Federal Tax Return</p>");
    var textThreeVal = "Did you, the student, file a ".concat(taxFilingYear).concat(" income tax return with the IRS? <b>(if married, include spouse)</b>");

    var textFourVal = "<p>- Submit your ".concat(taxFilingYear).concat(" IRS Tax Return Transcript or a signed copy of the <br>&nbsp; ").concat(taxFilingYear).concat(" 1040 Tax<br>&nbsp; Returns along with <b>".concat(TextFourChangeFAFSA).concat( "</b><br>-Obtain your transcript from the IRS website http://www.irs.gov<br> and clicking on &quot;Get Transcript of<br>&nbsp; Your Tax Records&quot;, OR Calling 1-800-908-9946 to request an<br>&nbsp; IRS Tax Return Transcript for the ").concat(taxFilingYear).concat(" year"));
    
  var textFiveVal = "<p>- Submit a SIGNED copy of the ".concat(taxFilingYear).concat(" IRS Tax Return Transcript<br> &nbsp;or ").concat(taxFilingYear).concat(" 1040 Tax Returns along with <b>".concat(TextFourChangeFAFSA).concat( "</b><br>- AND copied of all W2s, as they are required to determine your<br>&nbsp; portion of earned income</p>"));

    var textSixVal = "<p>- If tax extension is beyond the 6 month <b>October 15, ".concat(taxFilingYear).concat(" deadline:</b></p>");

    var textSevenVal = "<p> ".concat(TextSevenChangeFAFSA).concat(" .</p>");

    var textEightVal = "<p>- Submit a signed and translated copy of your foreign tax return, which&nbsp;<br>&nbsp; &nbsp;shows the ".concat(taxFilingYear).concat(" Adjusted Gross Income(AGI) and taxes paid.</p>");

    var textNineVal = "<p>- Independent students as defined on the FAFSA <b><u>MUST</u></b> provide<br>&nbsp; confirmation of non-filing from the IRS through form 4506-T (box 7),<br>&nbsp; or online through IRS dated on or after October 1, ".concat(taxFilingYear).concat(", or written<br>&nbsp; statement of non-filing<br>- Dependent students as defined on the FAFSA are <b><u>NOT</u></b> required to<br>&nbsp; provide confirmation of non-filing.".concat(TextNineChange).concat("</p>"));

    var textElevenVal = "<p>- Independent students as defined on the FAFSA&nbsp;<b><u>MUST</u></b> provide<br>&nbsp; confirmation of non-filing from the IRS through&nbsp;form 4506-T<br>&nbsp; (box 7), or online through IRS dated on or after&nbsp;October 1, ".concat(taxFilingYear).concat(",<br>&nbsp; or provide written statement of non-filing</p>");


    var textTenVal = "<p>- Submit a copy of all your ".concat(taxFilingYear).concat(" Form W-2(s) from your employer<br>&nbsp; or your ").concat(taxFilingYear).concat(" IRS Wage and Income tax Transcript. OR 1099s</p>");
    var textTwelveVal = "<p>- List the names of all your ".concat(taxFilingYear).concat(" employer(s) and the amount<br>&nbsp; earned from each employer in ").concat(taxFilingYear).concat("</p>");
    //var textThirteenVal = "<p> " .concat (taxFilingYear).concat(" Amount Earned</p>");
    var textFourteenVal = "<p>  If an individual did not file an IRS income tax return, regardless if he/she earned any income from work, MUST provide confirmation of non-filing from the IRS through form 4506-T (box 7) or other relevant taxing authority dated on or after October 1, ".concat(taxFilingYear).concat(":</p>");
    /* var textFifteenVal = "<p>- All W2s, a signed statement with estinated 2020 income and/or business related income amount(s)(if applicable)," .concat
    "a signed  copy of 2018 federal tax return form(1040, 1040A, or 1040EZ), and provide confirmation of non-filing from the IRS through from 4506-T (box 7) dated on or after October 1, " .concat(taxFilingYear) .concat("</p>");*/

    //textThirteen.items = " ".concat(taxFilingYear).concat("Amount Earned");
    var studentTaxVal = "<b>I have filed a ".concat(taxFilingYear).concat(" Tax Return</b>");
    var incomeCHKVal = "<b>I was not employed and had no income earned from work in ".concat(taxFilingYear).concat("</b>");
    var requiredCHKVal = "<b>I was employed in ".concat(taxFilingYear).concat(" but not required to file</b>");
    var foreignTaxCHKVal = "<b>I/we have filed a ".concat(taxFilingYear).concat(" Foreign Tax Return</b>");

    var textFifteenVal = "<li>".concat(TextFifteenOneChange).concat(" if parents claimed you as a dependent</li> <li>".concat(TextFifteenTwoChange).concat(" if single</li> <li>".concat(TextFifteenThreeChange).concat(" if the head of household</li> <li>".concat(TextFifteenFourChange).concat(" if married, filing jointly</li> <li>$5.00 if married, filing separately</li> <li>Or, you had earnings from self-employment of at least $400.00</li></ul>"))));   
   
   /* var textSixteenVal = "<p> If an individual did not file an IRS income tax return, regardless if he/she earned any income from work, MUST provide confirmation of non-filing from the IRS through form 4506-T (box 7) or other relevant taxing authority dated on or after October 1, ".concat(taxFilingYear).concat(":</p>");*/
  
  	var textSixteenVal = "<p> If an individual did not file an IRS income tax return, regardless if he/she earned any income from work, MUST provide confirmation of on-filing dated on or<br>&nbsp; after October 1, ".concat(taxFilingYear).concat(" from the IRS or other relevant taxing authority and submit it with this form to the Office of Financial Aid. Ways to request letter from<br>&nbsp; the IRS include").concat(":</p>");

    var tableHeadingVal = "<p> ".concat(taxFilingYear).concat(" Amount Earned</p>");

    $("#formCodeText").html(formCodeTextVal);
    $("#f0taxsHeadingText").html(titleTextVal);
    $("#f0taxsTitleText").html(headingTextVal);
    $("#f0taxsTextOne").html(textOneVal);
    $("#f0taxsTextTwo").html(textTwoVal);
    $("#f0taxsTextThree").html(textThreeVal);
    $("#f0taxsTextFour").html(textFourVal);
    $("#f0taxsTextFive").html(textFiveVal);
    $("#f0taxsTextSix").html(textSixVal);
    $("#f0taxsTextSeven").html(textSevenVal);
    $("#f0taxsTextEight").html(textEightVal);
    $("#f0taxsTextNine").html(textNineVal);
    $("#f0taxsTextTen").html(textTenVal);
    $("#f0taxsTextEleven").html(textElevenVal);
    $("#f0taxsTextTwelve").html(textTwelveVal);
    // $("#f0taxpTextThirteen").html(textThirteenVal);
    $("#f0taxpTextFourteen").html(textFourteenVal);
    $("#f0taxpInformationAmountSection1").html(textFifteenVal);
    $("#f0taxpInformationAmountSection2").html(textSixteenVal);    
    $("#fotaxstableHeading").html(tableHeadingVal);
    $("#studentTaxText").html(studentTaxVal);
    $("#f0taxsIncomeCHKText").html(incomeCHKVal);
    $("#f0taxsRequiredCHKText").html(requiredCHKVal);
    $("#f0taxsForeignTaxCHKText").html(foreignTaxCHKVal);
}

function checkforDuplicateSubmissions(formCodeVal, financialAidYearVal) {
    var tableName = "AEM_TAX_FILING_STATEMENT";
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_Date_1_init0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_yesCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_yesCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value !== null){
  	noCHK.value = null;
  	noUseIRSCHK.enabled = true;
	separatedCHK.enabled = true;
	taxExtensionCHK.enabled = true;
	//foreignTaxCHK.enabled = true;
  	foreignTaxCHK1.enabled = true;
}
else{
  	noUseIRSCHK.enabled = false;
	separatedCHK.enabled = false;
	taxExtensionCHK.enabled = false;
	//foreignTaxCHK.enabled = false;
  	foreignTaxCHK1.enabled = false;
  	noUseIRSCHK.value = null;
	separatedCHK.value = null;
	taxExtensionCHK.value = null;
	foreignTaxCHK1.value = null;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_noCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_noCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	yesCHK.value = null;
  	noIncomeCHK.enabled = true;
	notRequireFileCHK.enabled = true;
  	emploeeName1.enabled = true;
    employeeName2.enabled = true;
    employeeName3.enabled = true;
    amount1.enabled = true;
    amount2.enabled = true;
    amount3.enabled = true;
}
else{
  	noIncomeCHK.enabled = false;
	notRequireFileCHK.enabled = false;
  	noIncomeCHK.value = null;
	notRequireFileCHK.value = null;
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_noUseIRSCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_noUseIRSCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	separatedCHK.value = null;
	taxExtensionCHK.value = null;
	foreignTaxCHK1.value = null;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_separatedCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_separatedCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	noUseIRSCHK.value = null;
	taxExtensionCHK.value = null;
	foreignTaxCHK1.value = null;
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_taxExtensionCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_taxExtensionCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value == 1){
  	noUseIRSCHK.value = null;
	separatedCHK.value = null;
	foreignTaxCHK1.value = null;  	
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_foreignTaxCHK1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_foreignTaxCHK1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value == 1){
  	noUseIRSCHK.value = null;
	separatedCHK.value = null;
	taxExtensionCHK.value = null;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_noIncomeCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_noIncomeCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	notRequireFileCHK.value = null;
  	yesCHK.value = null;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_notRequireFileCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_notRequireFileCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	noIncomeCHK.value = null;
  	yesCHK.value = null;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_emploeeName1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_emploeeName1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_amount1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_amount1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_employeeName2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_employeeName2_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_amount2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_amount2_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_employeeName3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_employeeName3_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_amount3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_amount3_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_yesCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_yesCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	fafsa_noCHK.value = null;
  	fafsa_noUseIRSCHK.enabled = true;
	fafsa_separatedCHK.enabled = true;
	fafsa_taxExtensionCHK.enabled = true;
	fafsa_foreignTaxCHK.enabled = true;
}
else{
  	fafsa_noUseIRSCHK.enabled = false;
	fafsa_separatedCHK.enabled = false;
	fafsa_taxExtensionCHK.enabled = false;
	fafsa_foreignTaxCHK.enabled = false;
  	fafsa_noUseIRSCHK.value = null;
	fafsa_separatedCHK.value = null;
	fafsa_taxExtensionCHK.value = null;
	fafsa_foreignTaxCHK.value = null;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_noCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_noCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	fafsa_yesCHK.value = null;
  	fafsa_noIncomeCHK.enabled = true;
	fafsa_notRequireFileCHK.enabled = true;
  	fafsa_emploeeName1.enabled = true;
    fafsa_employeeName2.enabled = true;
    fafsa_employeeName3.enabled = true;
    fafsa_amount1.enabled = true;
    fafsa_amount2.enabled = true;
    fafsa_amount3.enabled = true;
}
else{
  	fafsa_noIncomeCHK.enabled = false;
	fafsa_notRequireFileCHK.enabled = false;
  	fafsa_noIncomeCHK.value = null;
	fafsa_notRequireFileCHK.value = null;
  	fafsa_emploeeName1.value = null;
    fafsa_employeeName2.value = null;
    fafsa_employeeName3.value = null;
    fafsa_amount1.value = null;
    fafsa_amount2.value = null;
    fafsa_amount3.value = null;
  	fafsa_emploeeName1.enabled = false;
    fafsa_employeeName2.enabled = false;
    fafsa_employeeName3.enabled = false;
    fafsa_amount1.enabled = false;
    fafsa_amount2.enabled = false;
    fafsa_amount3.enabled = false;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_noUseIRSCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_noUseIRSCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	fafsa_separatedCHK.value = null;
	fafsa_taxExtensionCHK.value = null;
	fafsa_foreignTaxCHK.value = null;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_separatedCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_separatedCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	fafsa_noUseIRSCHK.value = null;
	fafsa_taxExtensionCHK.value = null;
	fafsa_foreignTaxCHK.value = null;
  	fafsaSeparatedDate.enabled = true;  
  	fafsaSeparatedDate.mandatory = true;
}
else{
  	fafsaSeparatedDate.enabled = false;
  	fafsaSeparatedDate.value = null;
  	fafsaSeparatedDate.mandatory = false;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_taxExtensionCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_taxExtensionCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value == 1){
  	fafsa_noUseIRSCHK.value = null;
	fafsa_separatedCHK.value = null;
	fafsa_foreignTaxCHK.value = null;  	
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_foreignTaxCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_foreignTaxCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value == 1){
  	fafsa_noUseIRSCHK.value = null;
	fafsa_separatedCHK.value = null;
	fafsa_taxExtensionCHK.value = null;	 	
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_noIncomeCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_noIncomeCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	fafsa_notRequireFileCHK.value = null;
  	fafsa_yesCHK.value = null;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_notRequireFileCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_notRequireFileCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	fafsa_noIncomeCHK.value = null;
  	fafsa_yesCHK.value = null;
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_emploeeName1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_emploeeName1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_amount1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_amount1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_employeeName2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_employeeName2_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_amount2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_amount2_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_employeeName3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_employeeName3_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_amount3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_fafsa_amount3_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_yesCFCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_yesCFCHK_valueCommit0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_noCFCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_noCFCHK_valueCommit0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_noUseIRSCHK2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_noUseIRSCHK2025_valueCommit0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_separatedCHK2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_separatedCHK2025_valueCommit0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_ForeignTRCHK2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_ForeignTRCHK2025_valueCommit0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_taxExtensionCHK2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_taxExtensionCHK2025_valueCommit0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_foreignTaxCHK12025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_foreignTaxCHK12025_valueCommit0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_noIncomeCHK2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_noIncomeCHK2025_valueCommit0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_notRequireFileCHK2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_notRequireFileCHK2025_valueCommit0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_SSNchk2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_SSNchk2025_valueCommit0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_InterOrgCHK2025_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_InterOrgCHK2025_valueCommit0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_empName1a_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_empName1a_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_amount1a_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_amount1a_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_empName1b_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_empName1b_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_amount1b_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_amount1b_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_empName1c_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_empName1c_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_amount1c_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_amount1c_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_SupportingDocumentsPanel_init0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_supportDoc1_valueCommit0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_supportDoc2_valueCommit0 = function (scope) {
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
	var format = /[&{}#!@$%^=;\[\]]/;

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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_supportDoc3_valueCommit0 = function (scope) {
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
	var format = /[&{}#!@$%^=;\[\]]/;

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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_StudentCB_valueCommit0 = function (scope) {
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_studentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_studentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_studentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_studentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_evaluator_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_evaluator_signChk_valueCommit0 = function (scope) {
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

    }
}
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_staffSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_staffSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_staffSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_staffSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            getPdf();

function getPdf() {
    //console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, ' and'));
            jsonData.append('formPath', '/content/forms/af/student-tax-filing-statement-f0ctxs/student-tax-filing-statement----f0ctxs---f1ctxs-');
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
 * @function student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_submit1608529416101_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_tax_filing_statement_f0ctxs_student_tax_filing_statement____f0ctxs___f1ctxs_.generated_submit1608529416101_click0 = function (scope) {
    with(this) {
        with(scope) {
            /*if(formType.value == "CDA" && aidYear.value == "2019" && yesCHK.value === null && noCHK.value === null){
  	showErrorModal("Alert !", "Please specify if the student file a 2021/2022 income tax return with the IRS or not?");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAStudentTaxFillingTab[0].yesCHK[0]");
}
else if(formType.value == "CDA" && aidYear.value == "2020" && yesCHK.value === null && noCHK.value === null){
  	showErrorModal("Alert !", "Please specify if the student file a 2022/2023 income tax return with the IRS or not?");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAStudentTaxFillingTab[0].yesCHK[0]");
}*/
if(formType.value == "CDA" && yesCHK.value === null && noCHK.value === null && aidYear.value != "2022"){
  	showErrorModal("Alert !", "Please specify if the student file a 2022/2023 income tax return with the IRS or not?");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAStudentTaxFillingTab[0].yesCHK[0]");
}
else if((yesCHK.value !== null) && (noUseIRSCHK.value === null && separatedCHK.value === null && taxExtensionCHK.value === null && foreignTaxCHK1.value != 1) && aidYear.value != "2022"){
  	showErrorModal("Alert !", "Please select at least one option for Yes");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAStudentTaxFillingTab[0].ParentTaxFilerCB[0].noUseIRSCHK[0]");
}
else if((noCHK.value !== null) && (noIncomeCHK.value === null && notRequireFileCHK.value === null) && aidYear.value != "2022"){
  	showErrorModal("Alert !", "Please select at least one option for No");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAStudentTaxFillingTab[0].ParentNonTaxFilerCB[0].noIncomeCHK[0]");
}
/*else if(formType.value == "FAFSA" && aidYear.value == "2019" && fafsa_yesCHK.value === null && fafsa_noCHK.value === null){
  	showErrorModal("Alert !", "Please specify if the student file a 2021/2022 income tax return with the IRS or not?");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAStudentTaxFillingTab[0].fafsa_yesCHK[0]");
}
else if(formType.value == "FAFSA" && aidYear.value == "2020" && fafsa_yesCHK.value === null && fafsa_noCHK.value === null){
  	showErrorModal("Alert !", "Please specify if the student file a 2022/2023 income tax return with the IRS or not?");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAStudentTaxFillingTab[0].fafsa_yesCHK[0]");
}*/
else if(formType.value == "FAFSA" && fafsa_yesCHK.value === null && fafsa_noCHK.value === null && aidYear.value != "2022"){
  	showErrorModal("Alert !", "Please specify if the student file a 2022/2023 income tax return with the IRS or not?");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAStudentTaxFillingTab[0].fafsa_yesCHK[0]");
}
else if((fafsa_yesCHK.value !== null) && (fafsa_noUseIRSCHK.value === null && fafsa_separatedCHK.value === null && fafsa_taxExtensionCHK.value === null && fafsa_foreignTaxCHK.value === null) && aidYear.value != "2022"){
  	showErrorModal("Alert !", "Please select at least one option for Yes");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAStudentTaxFillingTab[0].ParentTaxFilerCB[0].fafsa_noUseIRSCHK[0]");
}
else if((fafsa_noCHK.value !== null) && (fafsa_noIncomeCHK.value === null && fafsa_notRequireFileCHK.value === null) && aidYear.value != "2022"){
  	showErrorModal("Alert !", "Please select at least one option for No");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAStudentTaxFillingTab[0].ParentNonTaxFilerCB[0].fafsa_noIncomeCHK[0]");
}
else if(noIncomeCHK2025.value !== "1" && supportDoc1.value === "" && supportDoc2.value === "" && supportDoc3.value === ""){
  showErrorModal("Alert!", "Please attach supporting documents");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].SupportingDocumentsPanel[0].supportDoc1[0]");
} else {
    guideBridge.submit();
}

function submitAction(){
  aftiaDescCWID.value = firstName.value+ " " + lastName.value + " " + cwid.value;
  EmailSubject.value = "Test - Student Tax Filing Statement Request - (" + cwid.value+")";
  
   //var testEmail = "daduong@fullerton.edu";
//var testEmail = "yjayaram@fullerton.edu";
  var testEmail = "shreyas.manjunatha@thoughtfocus.com";
  
  HiddenStudentEmail.value = testEmail;
  //parentEmail.value = testEmail;

  guideBridge.submit();
}
        }
	}
}
