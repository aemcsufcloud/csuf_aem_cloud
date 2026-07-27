/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {

    FinancialSignaturePanel.visible = false;
   
    //To print Ip Address
    $.getJSON("https://api.ipify.org?format=json", function(data) {
        ipAddress.value = data.ip;
    });
}
debugger;
if (StageIndicator.value == "ToFinancialAid") {
   
    StudentBasicInformation.visible= true;
    StudentBasicInformation.enabled =false;
    ReasonforAppeal.visible=true;
    ReasonforAppeal.enabled=false;
    UntaxedIncomeDetails.visible = true;
    UntaxedIncomeDetails.enabled=false;
    DocumentsRequired.visible = true;
    DocumentsRequired.enabled = false;
    StudentAssetInformation.visible=true;
    StudentAssetInformation.enabled=false;
    StudentSignaturePanel.visible=true;
    SupDocPanel.visible=false;
    StudentSignaturePanel.enabled=false;
    FinancialSignaturePanel.visible = true;
    FinancialSignaturePanel.enabled = true;
  
}
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_guideRootPanel_init1 = function (scope) {
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
             //var userValue = 'mariana2'; // two Aid Year
         //var userValue = 'majesticallexi'; // one Aid Year
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
                //StudentCWID.value = response[0].EMPLID;
                //  studentIDNumber.value = response[0].student_ID;
                // HiddenStudentEmail.value = response[0].PREF_EMAIL;
              //  HiddenStudentEmail.value = "anupama.dhar@thoughtfocus.com";
               HiddenStudentEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                //HiddenStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;  
               // PrintStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                SignCWID.value = response[0].EMPLID;
              StudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;

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

function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";
    var formCodeVal = "";
  
   //var financialAidvalues = getAidYearValuesOnSingleAidYear(); 
   var financialAidvalues = getAidYearValuesOnSingleAidYearUpdated();
debugger;
    if (typeOfAidYear == '0') {
        financialAidYearVal = financialAidvalues.FinAidYearZero;
        aidYear.value = financialAidvalues.AidYearZero;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0PRJS";
        formCodeVal = "F0PRJS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = financialAidvalues.FinAidYearOne;
        aidYear.value =  financialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1PRJS";
        formCodeVal = "F1PRJS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else {
        financialAidYearVal = financialAidvalues.FinAidYearGeneral;
        aidYear.value = financialAidvalues.AidYearGeneral;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FormCodeGeneral+"PRJS";
        formCodeVal = financialAidvalues.FormCodeGeneral+"PRJS";
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
        aidYear.value = financialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FinAidYearFormCodeOne+"PRJS";
        formCodeVal = financialAidvalues.FinAidYearFormCodeOne+"PRJS";
        getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);

    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = financialAidvalues.FinAidYearTwo;
        aidYear.value = financialAidvalues.AidYearTwo;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FinAidYearFormCodeTwo+"PRJS";
        formCodeVal = financialAidvalues.FinAidYearFormCodeTwo+"PRJS";
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
  debugger;
  var taxFilingYear = aidYear.value;
    var headingTextVal = "<p><b>STUDENT INCOME APPEAL ".concat(financialAidYear).concat("</p></b>");
    var formTextVal = "<p><b>"+formCode.value+"</b></p>"; 
  
    var aidYearVal = aidYear.value;
    var aidYearVal2 = aidYear.value-3;
    var textChange = getUniqueStatements("STUDENT_INCOME_APPEAL",aidYearVal,""); 
  
    var Deadline1Change = textChange.TextDeadline1;
    var Deadline2Change = textChange.TextDeadline2;
  
    Deadline1.value=Deadline1Change;
    Deadline2.value=Deadline2Change;
  
    var DeadlineTextVal="<p>Appeal Deadlines: <b>".concat(Deadline1Change).concat("</b> if attending Fall only | <b>".concat(Deadline2Change).concat("</b> if attending Academic Year</p>"));
  
    var TextOneVal="<p>Other, including one time income received in ".concat(aidYearVal2).concat(" no longer available</p>");
  
    $("#PRJSFormCode").html(formTextVal);
    $("#PRJSHeadingText").html(headingTextVal);
    $("#PRJSDeadlineText").html(DeadlineTextVal);
    $("#PRJSTextOne").html(TextOneVal);

   

  
}

debugger;

function checkforDuplicateSubmissions(formCodeVal, financialAidYearVal) {
    var tableName = "AEM_STU_PROJECT_INCOME_APPEAL";
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
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_caseId_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_caseId_init1 = function (scope) {
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
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_firstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_firstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_lastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_lastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_Date_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value === null){
	//  this.enabled = false;
  Date_1.enabled = false;
  
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
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_Date_1_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_Date_1_init1 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=true;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_DocumentCB1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_DocumentCB1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  DocumentsTF1.enabled = true;
  DocumentsTF1.mandatory = true;
}else{
  DocumentsTF1.value = null;
  DocumentsTF1.mandatory = false;
  DocumentsTF1.enabled=false;
 
  
}
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_DocumentsTF1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_DocumentsTF1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_DocumentCB2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_DocumentCB2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  DocumentsTF2.enabled = true;
   DocumentsTF2.mandatory = true;
}else{
  DocumentsTF2.value = null;
   DocumentsTF2.mandatory = false;
}
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_DocumentsTF2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_DocumentsTF2_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_OtherrCB1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_OtherrCB1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  OtherTF.enabled = true;
  OtherTF.mandatory = true;
}else{
  OtherTF.value = null;
  OtherTF.mandatory = false;
}
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_OtherTF_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_OtherTF_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_ToDate_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_ToDate_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value < FromDate.value){
  showErrorModal("Alert!", "Please enter valid Date");
}
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_headerItem16521071874781652107188578_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_headerItem16521071874781652107188578_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_1Name_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_1Name_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_headerItem16521071876761652107188646_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_headerItem16521071876761652107188646_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_2Name_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_2Name_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_headerItem16521071878831652107188721_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_headerItem16521071878831652107188721_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_3Name_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_3Name_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_headerItem16521071880851652107188801_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_headerItem16521071880851652107188801_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_tableItem16521079044651652107905088_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_tableItem16521079044651652107905088_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_TextBox_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_TextBox_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_1Name_init00
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_1Name_init00 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_text_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_text_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_2Name_init00
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_2Name_init00 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_3Name_init00
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_3Name_init00 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_tableItem16521074715081652107472490_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_tableItem16521074715081652107472490_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_SupDocPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_SupDocPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_supportDoc1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var filePath = supportDoc1.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc1.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc1.fileAttachment.value = fname;
}
}
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_supportDoc1_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_supportDoc1_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc1.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	  
	
	var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;

	if(format.test(supportDoc1.fileAttachment.value) === true){
		var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
		supportDoc1.fileAttachment.value = doc2NewName;

	}
  if(extension !== "pdf"){
	 
       supportDoc1.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_supportDoc2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var filePath = supportDoc2.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc2.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc2.fileAttachment.value = fname;
}
}
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_supportDoc2_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_supportDoc2_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc2.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	  
	
	var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;

	if(format.test(supportDoc2.fileAttachment.value) === true){
		var doc2NewName = supportDoc2.fileAttachment.value.replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
		supportDoc2.fileAttachment.value = doc2NewName;

	}
  if(extension !== "pdf"){
	 
       supportDoc2.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_supportDoc3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc3.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	
	var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;

	if(format.test(supportDoc3.fileAttachment.value) === true){
		var doc2NewName = supportDoc3.fileAttachment.value.replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
		supportDoc3.fileAttachment.value = doc2NewName;

	}
    
	if(extension !== "pdf"){
	 
       supportDoc3.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_StudentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (this.value == "1") {
   

        $.ajax({

            type: 'GET',

            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
               
                SignDate.value = myresopnse.SERVER_DATE;
                PrintStudentName.value = firstName.value + " " + lastName.value;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
    
} else {
   
    SignDate.value = "";
    PrintStudentName.value = "";
}
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_ipAddress_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_ipAddress_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_PrintStudentName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_PrintStudentName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_SignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_SignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_evaluator_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_evaluator_signChk_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToFinancialAid") {
    if (this.value == "1") {

        $.ajax({

            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',

            success: function(myresponse) {
                FinancialAidSign.value = myresponse.userName;
                FinancialAidSignDate.value = myresponse.SERVER_DATE;
                financialAidAssignee.value = myresponse.userName;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });

        FinancialAidSign.enabled = false;
        FinancialAidSignDate.enabled = false;
        financialAidAssignee.enabled = false;

    } else {
        FinancialAidSign.value = "";
        FinancialAidSignDate.value = "";
        financialAidAssignee.value = "";

    }
}
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_FinancialAidSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_FinancialAidSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_FinancialAidSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_FinancialAidSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_HiddenSection_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_HiddenSection_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible=false;
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated__click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated__click0 = function (scope) {
    with(this) {
        with(scope) {
            if(CWID.value !== null){
  aftiaDescCWID.value = HiddenStudentName.value +" "+CWID.value;
  EmailSubject.value = "Student Projected Year Income Appeal "+CWID.value;
}
HiddenStudentEmail.value= "mamata.hampannavar@thoughtfocus.com";

guideBridge.submit();

        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (aidYear.value !== null) {
    getPdf();
}else{
  alert("Please fill all the required fields");
      showErrorModal("Alert!", "Please Select Aid Year");
   }

function getPdf() {
    console.log("in view pdf");
   debugger;
    window.guideBridge.getDataXML({
        success: function(result) {
           console.log("in view pdf="+result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/student-projected-year-income-appeal/student-projected-year-income-appeal');
            jsonData.append('fileName', firstName.value+"_"+lastName.value + "(" + cwid.value + ")");           
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
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated_Submit_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated_Submit_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (Reason1CB.value === null && Reason1CB2.value === null && Reason1CB3.value === null && Reason1CB4.value === null && Reason1CB5.value === null && Reason1CB6.value === null) {
    showErrorModal("Alert !", "Please select the Reason for Appeal");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].ReasonforAppeal[0]");
} 
else if (DocumentCB1.value === null && DocumentCB3.value === null && DocumentCB2.value === null && DocumentCB4.value === null && DocumentCB5.value === null && DocumentCB6.value === null && DocumentCB7.value === null && DocumentCB8.value === null && DocumentCB9.value === null && DocumentCB10.value === null && DocumentCB11.value === null && OtherrCB1.value === null) {
    showErrorModal("Alert !", "Please select the Required Documents");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].DocumentsRequired[0]");
} else {
    submitAction();
} 


function submitAction(){
aftiaDescCWID.value = firstName.value + " " + lastName.value + " " + cwid.value;
  EmailSubject.value = "Test - Student Projected Year Income Appeal - " + cwid.value;
 // HiddenStudentEmail.value= "anupama.dhar@thoughtfocus.com";
   HiddenStudentEmail.value= "shreyas.manjunatha@thoughtfocus.com";
  guideBridge.submit();
}
        }
	}
}
/**
 * @function student_projected_year_income_appeal_student_projected_year_income_appeal.generated__click00
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_projected_year_income_appeal_student_projected_year_income_appeal.generated__click00 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (aidYear.value !== null) {
    getPdf();
}else{
  alert("Please fill all the required fields");
      showErrorModal("Alert!", "Please Select Aid Year");
   }

function getPdf() {
    console.log("in view pdf");
   debugger;
    window.guideBridge.getDataXML({
        success: function(result) {
           console.log("in view pdf="+result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/student-projected-year-income-appeal/student-projected-year-income-appeal');
            jsonData.append('fileName', FirstName.value+"_"+LastName.value + "(" + StudentCWID.value + ")" + "_" + Date.now());           
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
