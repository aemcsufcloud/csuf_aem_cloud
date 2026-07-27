/**
 * @function sap_apperal_sap_appeal.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_guideRootPanel_init0 = function (scope) {
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
            //var userValue = 'veronica.maciel'; // two Aid Year
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
            //   var studentCWID = "885269399"; //EOP Student
                getStudentAidYearDetails(studentCWID);
                //var aidYearFlag = getStudentAidYearDetails(studentCWID);
                firstName.value = response[0].FIRST_NAME;
                lastName.value = response[0].LAST_NAME;
                StudentUserId.value = response[0].USERID;
                studentIDNumber.value = studentCWID;
                cwid.value = studentCWID;
                SCwid.value = studentCWID;
                //StudentEmail.value = response[0].PREF_EMAIL;
                StudentEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
                StudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                Name.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                Address.value=response[0].ADDRESS1;
                TelephonNumber.value=response[0].CELL_PHONE;
                City.value=response[0].CITY;
                State.value=response[0].STATE;
                Zip.value=response[0].POSTAL;
                EOPStudent.value = "1";
                firstName.enabled = false;
                lastName.enabled = false;
                cwid.enabled = false;
                financialAidYear.enabled = false;
                getCurrentMajor(studentCWID);
                getEOPCounselorData(studentCWID);
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
                  singleAidYear();  
                 // aidYearPopup();
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
        formCode.value = "F0ASAP";
        formCodeVal = "F0ASAP";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = "2022-2023";
        aidYear.value = "2022";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1ASAP";
        formCodeVal = "F1ASAP";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };
}

function singleAidYear() {
   var typeOfAidYear = getUrlParameters('aidYear'); 
  var financialAidYearVal="";
   var formCodeVal="";
  	//if(typeOfAidYear == '0'&& flag == "TwoAidYear"){
  if(typeOfAidYear == '0'){    
  financialAidYearVal = "2021-2022";
      	aidYear.value = "2021";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F0ASAP";
		formCodeVal = "F0ASAP";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }
 //	else if(typeOfAidYear == '1' && flag == "TwoAidYear"){
  	else if(typeOfAidYear == '1' ){    	
  financialAidYearVal = "2022-2023";
      	aidYear.value = "2022";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F1ASAP";
		formCodeVal = "F1ASAP";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }
  else{
    financialAidYearVal = "2021-2022";
    aidYear.value = "2021";
    financialAidYear.value = financialAidYearVal;
    aidYearValue = financialAidYear.value;
    formCode.value = "F0ASAP";
    formCodeVal = "F0ASAP";
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
    var taxFilingYear = aidYear.value;
    var headingTextVal = "";
    if (financialAidYear == "2021-2022") {
        headingTextVal = "<p><b>SATISFACTORY ACADEMIC PROGRESS APPEAL FORM (".concat(financialAidYear).concat(")</b></p>");
    }
    if (financialAidYear == "2022-2023") {
        headingTextVal = "<p><b>SATISFACTORY ACADEMIC PROGRESS APPEAL FORM  (".concat(financialAidYear).concat(")</b></p>");
    }
  
  var declarationTextOne = "";
   if (financialAidYear == "2021-2022") {
    declarationTextOne = "(Deadline to appeal for Fall 2021 is 10/28/21; Deadline to appeal for Spring 2022 is 04/7/2022)"; 
    }
    if (financialAidYear == "2022-2023") {
    declarationTextOne = "(Deadline to appeal for Fall 2022 is 10/27/22; Deadline to appeal for Spring 2023 is 04/6/2023)"; 
    }
  
  var formTextVal = "";
    if (financialAidYear == "2021-2022") {
        formTextVal = "<p><b>F0ASAP</b></p>";
    }
    if (financialAidYear == "2022-2023") {
        formTextVal = "<p><b>F1ASAP</b></p>";
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
  
  $("#VONFLFormText").html(formTextVal);
  $("#ASAPHeadingText").html(headingTextVal);
  $("#ASAPSubheading").html(declarationTextOne);
  $("#ASAPSummerUnitText").html(declarationTextTwo);
  $("#ASAPFallUnitText").html(declarationTextThree);
  $("#ASAPSpringUnitText").html(declarationTextFour);

}

function getCurrentMajor(cwid){
$.ajax({
        type: 'GET',
        url: "/bin/SAPAppealServlet",

        data: {
          cwid: cwid,
          action:"SAP_MAJOR_DATA"
        },

        dataType: 'json',
        success: function(response) {
            if (response.length == 1) {
          CurrentMajor.value=response[0].PROGRAMS;  
          DegreeObjective.value=response[0].DEGREE;
            } 
        },
        error: function(error) {
            alert("error block=" + error);
        }
      
    });
 }

function checkforDuplicateSubmissions(formCodeVal){
var tableName = "AEM_SAP_APPEAL";
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

function getEOPCounselorData(cwid){
$.ajax({
        type: 'GET',
        url: "/bin/SAPAppealServlet",

        data: {
          cwid: cwid,
          action:"SAP_EOP_DATA"
        },

        dataType: 'json',
        success: function(response) {
            if (response.length == 1) {
          EOPManualFlag.value="false";
          EOPStudent.value = "0";
          EOPName.value=response[0].COORDINATOR_FIRSTNAME + " " + response[0].COORDINATOR_LASTNAME + "-" + response[0].COORDINATOR_EMAILID;  
          EOPCounselorName.value=response[0].COORDINATOR_FIRSTNAME+ " " + response[0].COORDINATOR_LASTNAME;  
          EOPUserID.value=response[0].COORDINATOR_USERID;
         // EOPEmail.value=response[0].COORDINATOR_EMAILID;
          EOPEmail.value="thamizhvanan.sathiyamoorthy@thoughtfocus.com";
          EOPEmpID.value=response[0].EMPLID;
          EopPanel.visible=true;
          EopPanel.enabled=false;
          EOPStudent.enabled=false;
            } 
        },
        error: function(error) {
            alert("error block=" + error);
        }
      
    });
 }
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {  
  
  EopPanel.visible=false;
  EOPSignaturePanel.visible=false;
  	
  	$.getJSON("https://api.ipify.org?format=json", function(data) {                
        ipAddress.value = data.ip;            	
    });
  
}
if(StageIndicator.value===null){
  FinancialAidSignaturePanel.visible=false;
}

if(StageIndicator.value=="ToEOP"){
  StudentInformation.visible=true;
  StudentInformation.enabled=false;
  
  Instructions_2021.visible=true;
  Instructions_2021.enabled=false;
  
  SAP.visible=true;
  SAP.enabled=false;
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
  
  SAP.visible=true;
  SAP.enabled=false;
  StudentSignaturePanel.visible=true;
  StudentSignaturePanel.enabled=false;
  FinancialAidSignaturePanel.visible=true;
  FinancialAidSignaturePanel.enabled=true;
  SupportingDocumentsPanel.visible = false;
  
  if (EOPStudent.value == "0"){
  EopPanel.visible=true;
  EopPanel.enabled=false; 
  EOPSignaturePanel.visible=true;
  EOPSignaturePanel.enabled=false;
} else{
   EopPanel.visible=false;
   EOPSignaturePanel.visible=false;
}
}
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_guideRootPanel_init2 = function (scope) {
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
            //var userValue = 'veronica.maciel'; // two Aid Year
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
            //   var studentCWID = "885269399"; //EOP Student
                getStudentAidYearDetails(studentCWID);
                //var aidYearFlag = getStudentAidYearDetails(studentCWID);
                firstName.value = response[0].FIRST_NAME;
                lastName.value = response[0].LAST_NAME;
                StudentUserId.value = response[0].USERID;
                studentIDNumber.value = studentCWID;
                cwid.value = studentCWID;
                SCwid.value = studentCWID;
                //StudentEmail.value = response[0].PREF_EMAIL;
                //StudentEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
                StudentEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                StudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                Name.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                Address.value=response[0].ADDRESS1;
                TelephonNumber.value=response[0].CELL_PHONE;
                City.value=response[0].CITY;
                State.value=response[0].STATE;
                Zip.value=response[0].POSTAL;
                EOPStudent.value = "1";
                firstName.enabled = false;
                lastName.enabled = false;
                cwid.enabled = false;
                financialAidYear.enabled = false;
                getCurrentMajor(studentCWID);
                getEOPCounselorData(studentCWID);
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
                  singleAidYear();  
                 // aidYearPopup();
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
        formCode.value = financialAidvalues.FinAidYearFormCodeOne+"ASAP";
        formCodeVal = financialAidvalues.FinAidYearFormCodeOne+"ASAP";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = financialAidvalues.FinAidYearTwo;
        aidYear.value = financialAidvalues.AidYearTwo-1;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FinAidYearFormCodeTwo+"ASAP";
        formCodeVal = financialAidvalues.FinAidYearFormCodeTwo+"ASAP";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
    };
}

function singleAidYear() {
   var typeOfAidYear = getUrlParameters('aidYear'); 
  var financialAidYearVal="";
   var formCodeVal="";
  
  //var financialAidvalues = getAidYearValuesOnSingleAidYear();
  var financialAidvalues = getAidYearValuesOnSingleAidYearUpdated();
  
  	//if(typeOfAidYear == '0'&& flag == "TwoAidYear"){
  if(typeOfAidYear == '0'){    
        financialAidYearVal = financialAidvalues.FinAidYearZero;
      	aidYear.value = financialAidvalues.AidYearZero-1;
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F0ASAP";
		formCodeVal = "F0ASAP";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
    }
 //	else if(typeOfAidYear == '1' && flag == "TwoAidYear"){
  	else if(typeOfAidYear == '1' ){    	
        financialAidYearVal = financialAidvalues.FinAidYearOne;
      	aidYear.value = financialAidvalues.AidYearOne-1;
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F1ASAP";
		formCodeVal = "F1ASAP";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
    }
  else{
    financialAidYearVal = financialAidvalues.FinAidYearGeneral;
    aidYear.value = financialAidvalues.AidYearGeneral-1;
    financialAidYear.value = financialAidYearVal;
    aidYearValue = financialAidYear.value;
    formCode.value = financialAidvalues.FormCodeGeneral+"ASAP";
    formCodeVal = financialAidvalues.FormCodeGeneral+"ASAP";
    getCDAFinancialAidYear(aidYearValue);
    checkforDuplicateSubmissions(formCodeVal, financialAidYearVal); 
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
    var formCodeTextValue = formCode.value;
    var taxFilingYear = aidYear.value;
    var taxFilingYear2 = parseInt(taxFilingYear)+1;
    
    var aidYearVal = aidYear.value;
    var textChange = getUniqueStatements("SAP_APPEAL",aidYearVal,""); 
  
    var headingTextVal = "<p><b>SATISFACTORY ACADEMIC PROGRESS APPEAL FORM (".concat(financialAidYear).concat(")</b></p>");
  
  var declarationTextOne = textChange.TextOne; 
  
  var formTextVal = "<p><b> ".concat(formCodeTextValue).concat(" </b></p>");
  
  var declarationTextTwo = "# units Summer ".concat(taxFilingYear).concat(":"); 
  
  var declarationTextThree = "units/Fall ".concat(taxFilingYear).concat(":"); 
  
  var declarationTextFour = "units/Spring ".concat(taxFilingYear2).concat(":");   
  
  Heading_Year.value=financialAidYearVal+" SATISFACTORY ACADEMIC PROGRESS APPEAL FORM";
  Deadline.value=declarationTextOne;
  Summer_Year.value=taxFilingYear+":";
  Fall_Year.value=taxFilingYear+":";
  Spring_Year.value=taxFilingYear2+":";
  
  $("#VONFLFormText").html(formTextVal);
  $("#ASAPHeadingText").html(headingTextVal);
  $("#ASAPSubheading").html(declarationTextOne);
  $("#ASAPSummerUnitText").html(declarationTextTwo);
  $("#ASAPFallUnitText").html(declarationTextThree);
  $("#ASAPSpringUnitText").html(declarationTextFour);

}

function getCurrentMajor(cwid){
$.ajax({
        type: 'GET',
        url: "/bin/SAPAppealServlet",

        data: {
          cwid: cwid,
          action:"SAP_MAJOR_DATA"
        },

        dataType: 'json',
        success: function(response) {
            if (response.length == 1) {
          CurrentMajor.value=response[0].PROGRAMS;  
          DegreeObjective.value=response[0].DEGREE;
            } 
        },
        error: function(error) {
            alert("error block=" + error);
        }
      
    });
 }

function checkforDuplicateSubmissions(formCodeVal, financialAidYearVal){
var tableName = "AEM_SAP_APPEAL";
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
          faDecisionColumnName:financialAidDecisionColumnName,
          tableName: tableName,
          formCodeColumnName:formCodeColumnName,
          formCode: formCodeVal,
          faDecision: faDecision,
          financialAidYear: financialAidYearVal,
          financialAidYearColumn: financialAidYearColumnName
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

function getEOPCounselorData(cwid){
$.ajax({
        type: 'GET',
        url: "/bin/SAPAppealServlet",

        data: {
          cwid: cwid,
          action:"SAP_EOP_DATA"
        },

        dataType: 'json',
        success: function(response) {
            if (response.length == 1) {
          EOPManualFlag.value="false";
          EOPStudent.value = "0";
          EOPName.value=response[0].COORDINATOR_FIRSTNAME + " " + response[0].COORDINATOR_LASTNAME + "-" + response[0].COORDINATOR_EMAILID;  
          EOPCounselorName.value=response[0].COORDINATOR_FIRSTNAME+ " " + response[0].COORDINATOR_LASTNAME;  
          EOPUserID.value=response[0].COORDINATOR_USERID;
          //EOPEmail.value=response[0].COORDINATOR_EMAILID;
          //EOPEmail.value="thamizhvanan.sathiyamoorthy@thoughtfocus.com";
            EOPEmail.value="shreyas.manjunatha@thoughtfocus.com";
          EOPEmpID.value=response[0].EMPLID;
          EopPanel.visible=true;
          EopPanel.enabled=false;
          EOPStudent.enabled=false;
            } 
        },
        error: function(error) {
            alert("error block=" + error);
        }
      
    });
 }
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_caseId_init0 = function (scope) {
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
 * @function sap_apperal_sap_appeal.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;

        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_firstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_firstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_lastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_lastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_Date_1_init0 = function (scope) {
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
 this.value = d;
}
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_CurrentMajor_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_CurrentMajor_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_DegreeObjective_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_DegreeObjective_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_EOPStudent_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_EOPStudent_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if ((this.value == "0") && (EOPManualFlag.value!=="false")){
  EopPanel.visible=true;
  EopPanel.enabled=true; 
} else {
  
  if(EOPManualFlag.value==="false"){
    EopPanel.visible=true;
    EopPanel.enabled=false; 
    
  } else{
   EopPanel.visible=false;
   EOPLastName.value="";
   EOPName.value="";
   EOPUserID.value="";
   EOPEmail.value="";
   EOPEmpID.value="";
   EOPCounselorName.value="";
   EOPName.items = [];
  }
   
}

        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_EOPLastName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_EOPLastName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
var appResult = [];
if(EOPLastName.value !== null){
$.ajax({
    type: 'GET',
    url: "/bin/getFAERData",
	 data: {action: "FAER_SEARCH_APPROVER",lastName:EOPLastName.value},
    dataType: 'json',

    success: function(fundApproverResult) {

        if (fundApproverResult.length !== 0) {
         
		
            
			//appResult.push("Select EOP Counselor Name");
            for (var i = 0; i < fundApproverResult.length; i++) {

                var item = fundApproverResult[i].FIRSTNAME + " "+ fundApproverResult[i].LASTNAME;
			//	var uid = fundApproverResult[i].USERID;
               var uid = fundApproverResult[i].EMAILID;
                var idItem = i + 1;
            EOPManualFlag.value="true";
                //var jbcode = item.text;

                appResult.push(item+" - "+uid);

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
  		  appResult.push("Select EOP Counselor");
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
 * @function sap_apperal_sap_appeal.generated_EOPName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_EOPName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if ((StageIndicator.value === null) && (EOPManualFlag.value=="true")) {
    var approverName = EOPName.value;

    if (approverName != "Select EOP Counselor" && approverName !== "") {
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
                        //EOPEmail.value = myresopnse[0].EMAILID;
                       // EOPEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
                       EOPEmail.value = "shreyas.manjunatha@thoughtfocus.com";
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
 * @function sap_apperal_sap_appeal.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_SupportingDocumentsPanel_init0 = function (scope) {
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
 * @function sap_apperal_sap_appeal.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_supportDoc1_valueCommit0 = function (scope) {
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
 * @function sap_apperal_sap_appeal.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_supportDoc2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc2.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	  
	
	var format = /[&{}#!@$%^=;\[\]]/;

	if(format.test(supportDoc2.fileAttachment.value) === true){
		var doc2NewName = supportDoc2.fileAttachment.value.replace(/#|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'-');
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
 * @function sap_apperal_sap_appeal.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_supportDoc3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc3.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	
	var format = /[&{}#!@$%^=;\[\]]/;

	if(format.test(supportDoc3.fileAttachment.value) === true){
		var doc2NewName = supportDoc3.fileAttachment.value.replace(/#|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'-');
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
 * @function sap_apperal_sap_appeal.generated_checkbox1649834861348_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_checkbox1649834861348_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
	if (this.value == 1) {
	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {			  
				studentSignature.value = StudentName.value;
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
 * @function sap_apperal_sap_appeal.generated_ipAddress_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_ipAddress_init0 = function (scope) {
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
 * @function sap_apperal_sap_appeal.generated_studentSignature_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_studentSignature_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_studentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_studentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_checkbox1658837391953_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_checkbox1658837391953_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
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
 * @function sap_apperal_sap_appeal.generated_EOPCounselorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_EOPCounselorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_EOPSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_EOPSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_checkbox1649838422969_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_checkbox1649838422969_valueCommit0 = function (scope) {
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
 * @function sap_apperal_sap_appeal.generated_staffSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_staffSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_staffSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_staffSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_aidYear_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_aidYear_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(this.value == "2021"){
  Instructions_2021.visible=true;
  Instructions_2022.visible=false;
  }
  
  if(this.value == "2022"){
  Instructions_2022.visible=true;
  Instructions_2021.visible=false;
  }
        }
	}
}
/**
 * @function sap_apperal_sap_appeal.generated_EOPEmpID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_EOPEmpID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
   if(EOPEmpID.value !== null){
$.ajax({
    type: 'GET',
    url: "/bin/getFAERData",
	 data: {action: "FAER_APPROVER_DETAILS",approverEmplID:EOPEmpID.value},
    dataType: 'json',
	success: function(myresopnse) {
      if(myresopnse.length !== 0 ){
       EOPUserID.value = myresopnse[0].EMP_USERID;
      // EOPEmail.value = myresopnse[0].EMAILID;
     // EOPEmail.value = "anupama.dhar@thoughtfocus.com";
      // EOPEmail.value = "yjayaram@fullerton.edu ";  
         EOPEmail.value = "shreyas.manjunatha@thoughtfocus.com ";  
      }else{
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
 * @function sap_apperal_sap_appeal.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/sap-apperal/sap-appeal');
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
 * @function sap_apperal_sap_appeal.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sap_apperal_sap_appeal.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  aftiaDescCWID.value = StudentName.value+" "+cwid.value;
  EmailSubject.value = "Satisfactory Academic Progress Appeal - "+cwid.value;
  //StudentEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
  //EOPEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
  StudentEmail.value = "shreyas.manjunatha@thoughtfocus.com";
  EOPEmail.value = "shreyas.manjunatha@thoughtfocus.com";
}
guideBridge.submit();

        }
	}
}
