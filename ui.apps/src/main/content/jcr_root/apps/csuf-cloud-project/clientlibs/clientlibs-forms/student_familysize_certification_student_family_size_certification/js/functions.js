/**
 * @function student_familysize_certification_student_family_size_certification.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {     		
	FinancialSignaturePanel.visible = false; 
  	
  	$.getJSON("https://api.ipify.org?format=json", function(data) {                
        ipAddress.value = data.ip;            	
    });
}
else if(StageIndicator.value == "ToFinancialAid"){  	
  	var gifModal = document.getElementById('gifModal');
	gifModal.style.display = "none"; 
  
	StudentInformation.enabled = false;
  	cdaAddButton.visible = false;
	cdaRemoveButton.visible = false;
	fafsaRemoveButton.visible = false;
	fafsaAddButton.visible = false;
  
  	CDATable.enabled = false;
  	FAFSATable.enabled = false;
    
	if(formType.value == "CDA"){
		FAFSAFamilySizeCertificationTab.visible = false;		
	}
	if(formType.value == "FAFSA"){
		CDAFamilySizeCertificationTab.visible = false;	
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
 * @function student_familysize_certification_student_family_size_certification.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            
 
if (StageIndicator.value === null) {
  	var gifModal = document.getElementById('gifModal');
  
    var typeOfForm = getUrlParameters('formType');  
  
    if (typeOfForm == "CDA") {
		formType.value = "CDA";        
        FAFSAFamilySizeCertificationTab.visible = false;       	
		loggedInDetails();
      	gifModal.style.display = "none";

    } else if (typeOfForm == "FAFSA") {
		formType.value = "FAFSA";
        CDAFamilySizeCertificationTab.visible = false;        
		loggedInDetails();
      	gifModal.style.display = "none";

    } else{
        				
		
		gifModal.style.display = "none";
      
		var modal = document.getElementById("secondModal");
		var span = document.getElementsByClassName("secondClose")[0];		

		modal.style.display = "block";
		span.onclick = function() {

			if ((document.getElementById("secondButton1").checked === false) && (document.getElementById("secondButton2").checked === false)) {
				modal.style.display = "block";
				showErrorModal("Alert!", "Please select the form type");
              	gifModal.style.display = "none";

			} else {
				modal.style.display = "none";
			}
		};

		document.getElementById("secondButton1").onclick = function() {
			modal.style.display = "none";
			formType.value = "CDA";
			FAFSAFamilySizeCertificationTab.visible = false;	
			loggedInDetails();
          	gifModal.style.display = "none";
		};

		document.getElementById("secondButton2").onclick = function() {
			modal.style.display = "none";
			formType.value = "FAFSA";
			CDAFamilySizeCertificationTab.visible = false;	
			loggedInDetails();
          	gifModal.style.display = "none";
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
                HiddenStudentEmail.value = response[0].PREF_EMAIL;
                //HiddenStudentEmail.value = "yjayaram@fullerton.edu";
                HiddenStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
              	
              	if(cdaStudentName.value === null || cdaStudentName.value !== undefined){
                  	cdaStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                }
              	
              	if(fafsaStudentName.value === null || fafsaStudentName.value !== undefined){
              		fafsaStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                }

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
				
				var typeOfAidYear = ""; 
              	typeOfAidYear = getUrlParameters('aidYear');
              
              	if (typeOfAidYear == "0") {
                    singleAidYear();
                } else if (typeOfAidYear == "1") {
                    singleAidYear();
                } else if (identifyAidYearFlag == "OneAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
                    singleAidYear();
                } else if ((identifyAidYearFlag == "TwoAidYear") && (formType.value == "FAFSA") && (typeOfAidYear != "0" || typeOfAidYear != "1" || typeOfAidYear=== undefined)) {
                    singleAidYear();
                } else if (identifyAidYearFlag == "TwoAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
                    aidYearPopup();
                }else {
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
  
  	if((formType.value == "FAFSA") && (typeOfAidYear == '0' || typeOfAidYear == '1' || typeOfAidYear === undefined)){
  	//if((formType.value == "FAFSA") && (typeOfAidYear == '0' || typeOfAidYear === undefined)){
      	financialAidYearVal = "2022-2023";
      	aidYear.value = "2020";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F1HSZS";
        formCodeVal = "F1HSZS";
		getFAFSAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }
  	/*else if((formType.value == "FAFSA") && (typeOfAidYear == '1' || typeOfAidYear === undefined)){
      	financialAidYearVal = "2022-2023";
      	aidYear.value = "2020";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F1HSZS";
		getFAFSAFinancialAidYear(aidYearValue);
    }*/
  	else if((formType.value == "CDA") && (typeOfAidYear == '0' || typeOfAidYear === undefined)){
      	financialAidYearVal = "2021-2022";
      	aidYear.value = "2019";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F0CHSS";
        formCodeVal = "F0CHSS";
		getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }
  	else if((formType.value == "CDA") && (typeOfAidYear == '1' || typeOfAidYear === undefined)){
      	financialAidYearVal = "2022-2023";
      	aidYear.value = "2020";
      	financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;
      	formCode.value = "F1CHSS";
        formCodeVal = "F1CHSS";
		getCDAFinancialAidYear(aidYearValue);
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
        aidYear.value = "2019";		
        financialAidYear.value = financialAidYearVal;
		aidYearValue =  financialAidYear.value;

		if(formType.value == "CDA"){
			formCode.value = "F0CHSS";
            formCodeVal = "F0CHSS";
			getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal);
		}
		else if(formType.value == "FAFSA"){
			formCode.value = "F1HSZS";
            formCodeVal = "F1HSZS";
			getFAFSAFinancialAidYear();
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
			formCode.value = "F1CHSS";
            formCodeVal = "F1CHSS";
			getCDAFinancialAidYear(aidYearValue);
            checkforDuplicateSubmissions(formCodeVal);
		}
		else if(formType.value == "FAFSA"){
			formCode.value = "F1HSZS";
            formCodeVal = "F1HSZS";
			getFAFSAFinancialAidYear();
            checkforDuplicateSubmissions(formCodeVal);
		}
    };
}


if (StageIndicator.value !== null) {
    aidYearValue =  financialAidYear.value;
 
	if(formType.value == "CDA"){
		getCDAFinancialAidYear(aidYearValue);
	}
	else if(formType.value == "FAFSA"){
		getFAFSAFinancialAidYear();
	}    
}



function getCDAFinancialAidYear(financialAidYear) {
	
    var financialAidYearVal = financialAidYear;
    var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);

    var formCodeTextVal = "";
	var titleTextVal = "";
	var firstTextVal = "";
	var secondTextVal = "";		
	
    if (financialAidYear == "2021-2022") {
        formCodeTextVal = "<p><b>CA Dream Act Application - F0CHSS</b></p>";
		
		titleTextVal = "<p><b>STUDENT FAMILY SIZE CERTIFICATION(2021-22)</b></p>";
		
		firstTextVal = "<p><b><u>INSTRUCTIONS:</u></b><br>Fill in the information about the people that you (and your spouse) will support between July 1, 2021 and June 30, 2022.<i> Incomplete documents <br> will not be returned. They will be disposed of in a secure manner, per university policy.<br> This will delay processing.</i></p>";
		
		secondTextVal = "<p><b>OTHER PEOPLE MAY BE INCLUDED ONLY IF THEY:</b><br>-&nbsp; &nbsp;<u>lived with and received more than half of their support from you or your spouse at the time you completed your</u><br>&nbsp;&nbsp;&nbsp; <u>California Dream Act Application</u><br>&nbsp;&nbsp;&nbsp; AND<br>-&nbsp; &nbsp;<u>will continue to receive this support between July 1, 2021 and June 30, 2022.</u></p>";
    }
  
    if (financialAidYear == "2022-2023") {
        formCodeTextVal = "<p><b>CA Dream Act Application - F1CHSS</b></p>";
		
		titleTextVal = "<p><b>STUDENT FAMILY SIZE CERTIFICATION(2022-23)</b></p>";
		
		firstTextVal = "<p><b><u>INSTRUCTIONS:</u></b><br>Fill in the information about the people that you (and your spouse) will support between July 1, 2022 and June 30, 2023.<i> Incomplete documents <br> will not be returned. They will be disposed of in a secure manner, per university policy.<br> This will delay processing.</i></p>";
		
		secondTextVal = "<p><b>OTHER PEOPLE MAY BE INCLUDED ONLY IF THEY:</b><br>-&nbsp; &nbsp;<u>lived with and received more than half of their support from you or your spouse at the time you completed your</u><br>&nbsp;&nbsp;&nbsp; <u>California Dream Act Application</u><br>&nbsp;&nbsp;&nbsp; AND<br>-&nbsp; &nbsp;<u>will continue to receive this support between July 1, 2022 and June 30, 2023.</u></p>";
		
		
    }


    $("#mainHeadingText").html(formCodeTextVal);
    $("#f0chssHeadingText").html(titleTextVal);
    $("#f0chssTextOne").html(firstTextVal);	
    $("#f0chssTextTwo").html(secondTextVal);
}




function getFAFSAFinancialAidYear() {
    /*var financialAidYearVal = financialAidYear;
    var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);*/

    var formCodeTextVal = "<p><b>F1HSZS</b></p>";
	var titleTextVal = "<p><b>STUDENT FAMILY SIZE CERTIFICATION(2022-23)</b></p>";
	var firstTextVal = "<p><b><u>INSTRUCTIONS:</u></b><br>Fill in the information about the people that you (and your spouse) will support between July 1, 2022 and June 30, 2023.<i> Incomplete documents <br> will not be returned. They will be disposed of in a secure manner, per university policy.<br> This will delay processing.</i></p>";
	var secondTextVal = "<p><b>OTHER PEOPLE MAY BE INCLUDED ONLY IF THEY:</b><br>-&nbsp; &nbsp;<u>lived with and received more than half of their support from you or your spouse at the time you completed your</u><br>&nbsp;&nbsp;&nbsp; <u>Free Application for Federal Student Aid</u><br>&nbsp;&nbsp;&nbsp; AND<br>-&nbsp; &nbsp;<u>will continue to receive this support between July 1, 2022 and June 30, 2023.</u></p>";
	
	
	
	$("#mainHeadingText").html(formCodeTextVal);
    $("#f0chssHeadingText").html(titleTextVal);
    $("#f1hszsTextOne").html(firstTextVal);	
    $("#f1hszsTextTwo").html(secondTextVal);
}

function checkforDuplicateSubmissions(formCodeVal){
var tableName = "AEM_FAMILY_SIZE_STUDENT";
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
                submit1608529416101.enabled=false;            
          }

		},
	});
}
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var gifModal = document.getElementById('gifModal');
    var typeOfForm = getUrlParameters('formType');

    if (typeOfForm == "CDA") {
        formType.value = "CDA";
        FAFSAFamilySizeCertificationTab.visible = false;
        loggedInDetails();
        gifModal.style.display = "none";
    } else if (typeOfForm == "FAFSA") {
        formType.value = "FAFSA";
        CDAFamilySizeCertificationTab.visible = false;
        loggedInDetails();
        gifModal.style.display = "none";
    } else {
        gifModal.style.display = "none";

        var modal = document.getElementById("secondModal");
        var span = document.getElementsByClassName("secondClose")[0];

        modal.style.display = "block";
        span.onclick = function() {
            if ((document.getElementById("secondButton1").checked === false) && (document.getElementById("secondButton2").checked === false)) {
                modal.style.display = "block";
                showErrorModal("Alert!", "Please select the form type");
                gifModal.style.display = "none";
            } else {
                modal.style.display = "none";
            }
        };

        document.getElementById("secondButton1").onclick = function() {
            modal.style.display = "none";
            formType.value = "CDA";
            FAFSAFamilySizeCertificationTab.visible = false;
            loggedInDetails();
            gifModal.style.display = "none";
        };

        document.getElementById("secondButton2").onclick = function() {
            modal.style.display = "none";
            formType.value = "FAFSA";
            CDAFamilySizeCertificationTab.visible = false;
            loggedInDetails();
            gifModal.style.display = "none";
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

                if (cdaStudentName.value === null || cdaStudentName.value !== undefined) {
                    cdaStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                }

                if (fafsaStudentName.value === null || fafsaStudentName.value !== undefined) {
                    fafsaStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                }

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
                } else if ((identifyAidYearFlag == "TwoAidYear") && (formType.value == "FAFSA") && (typeOfAidYear != "0" || typeOfAidYear != "1" || typeOfAidYear === undefined)) {
                    singleAidYear();
                } else if (identifyAidYearFlag == "TwoAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
                    //aidYearPopup();
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
        var financialAidYearVal = financialAidPopupValues.FinAidYearOne;
        aidYear.value = financialAidPopupValues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        var formCodePrefix = financialAidPopupValues.FinAidYearFormCodeOne;
        if (formType.value == "CDA") {
            formCode.value = formCodePrefix + "CHSS";
            formCodeVal = formCodePrefix + "CHSS";
        } else if (formType.value == "FAFSA") {
            formCode.value = formCodePrefix + "HSZS";
            formCodeVal = formCodePrefix + "HSZS";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = financialAidPopupValues.FinAidYearTwo;
        aidYear.value = financialAidPopupValues.AidYearTwo;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        var formCodePrefix = financialAidPopupValues.FinAidYearFormCodeTwo;

        if (formType.value == "CDA") {
            formCode.value = formCodePrefix + "CHSS";
            formCodeVal = formCodePrefix + "CHSS";
        } else if (formType.value == "FAFSA") {
            formCode.value = formCodePrefix + "HSZS";
            formCodeVal = formCodePrefix + "HSZS";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
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
        if (formType.value == "CDA") {
            formCode.value = "F0CHSS";
            formCodeVal = "F0CHSS";
        } else if (formType.value == "FAFSA") {
            formCode.value = "F0HSZS";
            formCodeVal = "F0HSZS";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = singleFinancialAidvalues.FinAidYearOne;
        aidYear.value = singleFinancialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "CDA") {
            formCode.value = "F1CHSS";
            formCodeVal = "F1CHSS";
        } else if (formType.value == "FAFSA") {
            formCode.value = "F1HSZS";
            formCodeVal = "F1HSZS";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else {
        financialAidYearVal = singleFinancialAidvalues.FinAidYearGeneral;
        aidYear.value = singleFinancialAidvalues.AidYearGeneral;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        var formCodePrefix = singleFinancialAidvalues.FormCodeGeneral;
        if (formType.value == "CDA") {
            formCode.value = formCodePrefix + "CHSS";
            formCodeVal = formCodePrefix + "CHSS";
        } else if (formType.value == "FAFSA") {
            formCode.value = formCodePrefix + "HSZS";
            formCodeVal = formCodePrefix + "HSZS";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    }
}

if (StageIndicator.value !== null) {
    aidYearValue = financialAidYear.value;

    if (formType.value == "CDA") {
        textChanger(aidYearValue);
    } else if (formType.value == "FAFSA") {
        textChanger(aidYearValue);
    }
}

function textChanger(aidYearValue) {

    var financialAidYearVal = financialAidYear;
    // var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);
    var aidYearVal = aidYear.value;
    var otherAidYearVal = aidYearVal - 1;
    var secondTextVal = "";
    var tableInstructionsTextVal = "";
    if (aidYear.value == "2019") {
        aidYearVal = "2022";
        otherAidYearVal = "2021";
        if (formType.value == "FAFSA") {
            aidYearVal = "2023";
            otherAidYearVal = "2022";
        }
    }
    if (aidYear.value == "2020") {
        aidYearVal = "2023";
        otherAidYearVal = "2022";
    }
    var formCodeTextVal = "<b>" + formCode.value + "</b>";
    /*  if(aidYear.value == "2019" && formType.value == "FAFSA"){
        formCodeTextVal = "F1HSZS";
      }*/
    var titleTextVal = "<p><b>STUDENT FAMILY SIZE CERTIFICATION (" + aidYearValue + ")</b></p>";
    if (formType.value == "CDA") {
        titleTextVal = "<p><b>STUDENT FAMILY SIZE CERTIFICATION (" + aidYearValue + ")<br>CA Dream Act Application</b></p>";
    }

    var firstTextVal = "<p><b><u>INSTRUCTIONS:</u></b><br>Fill in the information about the people that you (and your spouse) will support between July 1, " + otherAidYearVal + " and June 30, " + aidYearVal + ".<i> Incomplete documents <br> will not be returned. They will be disposed of in a secure manner, per university policy.<br> This will delay processing.</i></p>";




    $("#mainHeadingText").html(formCodeTextVal);
    $("#f0chssHeadingText").html(titleTextVal);
    if (formType.value == "CDA") {
        secondTextVal = "<p><b>OTHER PEOPLE MAY BE INCLUDED ONLY IF THEY:</b><br>-&nbsp; &nbsp;<u>lived with and received more than half of their support from you or your spouse at the time you completed your</u><br>&nbsp;&nbsp;&nbsp; <u>California Dream Act Application</u><br>&nbsp;&nbsp;&nbsp; AND<br>-&nbsp; &nbsp;<u>will continue to receive this support between July 1, " + otherAidYearVal + " and June 30, " + aidYearVal + ".</u></p>";
        
        if (aidYear.value == "2025") {
            tableInstructionsTextVal = "<p><b><u>TELL US ABOUT YOUR FAMILY SIZE</u></b><br>List all family members that meet the definition listed above.</p>";

            headerItem16502732711671650273272878.visible = false;
            headerItem16502732803311650273281226.visible = false;

            $("#f0chssTableInstructions").html(tableInstructionsTextVal);
        }

        $("#f0chssTextOne").html(firstTextVal);
        $("#f0chssTextTwo").html(secondTextVal);

    }
    if (formType.value == "FAFSA") {
        secondTextVal = "<p><b>OTHER PEOPLE MAY BE INCLUDED ONLY IF THEY:</b><br>-&nbsp; &nbsp;<u>lived with and received more than half of their support from you or your spouse at the time you completed your</u><br>&nbsp;&nbsp;&nbsp; <u>Free Application for Federal Student Aid</u><br>&nbsp;&nbsp;&nbsp; AND<br>-&nbsp; &nbsp;<u>will continue to receive this support between July 1, " + otherAidYearVal + " and June 30, " + aidYearVal + ".</u></p>";
      
        if (aidYear.value == "2025") {
            tableInstructionsTextVal = "<p><b><u>TELL US ABOUT YOUR FAMILY SIZE</u></b><br>List all family members that meet the definition listed above.</p>";

            headerItem16502732711671650273272878.visible = false;
            headerItem16502732803311650273281226.visible = false;

            $("#f1hszsTableInstructions").html(tableInstructionsTextVal);
        }

        $("#f1hszsTextOne").html(firstTextVal);
        $("#f1hszsTextTwo").html(secondTextVal);
    }

}

function checkforDuplicateSubmissions(formCodeVal, financialAidYearVal) {
    var tableName = "AEM_FAMILY_SIZE_STUDENT";
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
 * @function student_familysize_certification_student_family_size_certification.generated_guideRootPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_guideRootPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 

if (StageIndicator.value === null) {
    var gifModal = document.getElementById('gifModal');
    var typeOfForm = getUrlParameters('formType');

    if (typeOfForm == "CDA") {
        formType.value = "CDA";
        FAFSAFamilySizeCertificationTab.visible = false;
        loggedInDetails();
        gifModal.style.display = "none";
    } else if (typeOfForm == "FAFSA") {
        formType.value = "FAFSA";
        CDAFamilySizeCertificationTab.visible = false;
        loggedInDetails();
        gifModal.style.display = "none";
    } else {
        gifModal.style.display = "none";

        var modal = document.getElementById("secondModal");
        var span = document.getElementsByClassName("secondClose")[0];

        modal.style.display = "block";
        span.onclick = function() {
            if ((document.getElementById("secondButton1").checked === false) && (document.getElementById("secondButton2").checked === false)) {
                modal.style.display = "block";
                showErrorModal("Alert!", "Please select the form type");
                gifModal.style.display = "none";
            } else {
                modal.style.display = "none";
            }
        };

        document.getElementById("secondButton1").onclick = function() {
            modal.style.display = "none";
            formType.value = "CDA";
            FAFSAFamilySizeCertificationTab.visible = false;
            loggedInDetails();
            gifModal.style.display = "none";
        };

        document.getElementById("secondButton2").onclick = function() {
            modal.style.display = "none";
            formType.value = "FAFSA";
            CDAFamilySizeCertificationTab.visible = false;
            loggedInDetails();
            gifModal.style.display = "none";
        };
    }
}
debugger;
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
debugger;
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
              //  HiddenStudentEmail.value = response[0].PREF_EMAIL;
                HiddenStudentEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                HiddenStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;

                if (cdaStudentName.value === null || cdaStudentName.value !== undefined) {
                    cdaStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                }
              
         

                if (fafsaStudentName.value === null || fafsaStudentName.value !== undefined) {
                    fafsaStudentName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                }

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
                } else if ((identifyAidYearFlag == "TwoAidYear") && (formType.value == "FAFSA") && (typeOfAidYear != "0" || typeOfAidYear != "1" || typeOfAidYear === undefined)) {
                    singleAidYear();
                } else if (identifyAidYearFlag == "TwoAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
                    //aidYearPopup();
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
        var financialAidYearVal = financialAidPopupValues.FinAidYearOne;
        aidYear.value = financialAidPopupValues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        var formCodePrefix = financialAidPopupValues.FinAidYearFormCodeOne;
        if (formType.value == "CDA") {
            formCode.value = formCodePrefix + "CHSS";
            formCodeVal = formCodePrefix + "CHSS";
        } else if (formType.value == "FAFSA") {
            formCode.value = formCodePrefix + "HSZS";
            formCodeVal = formCodePrefix + "HSZS";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = financialAidPopupValues.FinAidYearTwo;
        aidYear.value = financialAidPopupValues.AidYearTwo;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        var formCodePrefix = financialAidPopupValues.FinAidYearFormCodeTwo;

        if (formType.value == "CDA") {
            formCode.value = formCodePrefix + "CHSS";
            formCodeVal = formCodePrefix + "CHSS";
        } else if (formType.value == "FAFSA") {
            formCode.value = formCodePrefix + "HSZS";
            formCodeVal = formCodePrefix + "HSZS";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
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
        if (formType.value == "CDA") {
            formCode.value = "F0CHSS";
            formCodeVal = "F0CHSS";
        } else if (formType.value == "FAFSA") {
            formCode.value = "F0HSZS";
            formCodeVal = "F0HSZS";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = singleFinancialAidvalues.FinAidYearOne;
        aidYear.value = singleFinancialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "CDA") {
            formCode.value = "F1CHSS";
            formCodeVal = "F1CHSS";
        } else if (formType.value == "FAFSA") {
            formCode.value = "F1HSZS";
            formCodeVal = "F1HSZS";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    } else {
        financialAidYearVal = singleFinancialAidvalues.FinAidYearGeneral;
        aidYear.value = singleFinancialAidvalues.AidYearGeneral;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        var formCodePrefix = singleFinancialAidvalues.FormCodeGeneral;
        if (formType.value == "CDA") {
            formCode.value = formCodePrefix + "CHSS";
            formCodeVal = formCodePrefix + "CHSS";
        } else if (formType.value == "FAFSA") {
            formCode.value = formCodePrefix + "HSZS";
            formCodeVal = formCodePrefix + "HSZS";
        }
        textChanger(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal, financialAidYearVal);
    }
}

if (StageIndicator.value !== null) {
    aidYearValue = financialAidYear.value;

    if (formType.value == "CDA") {
        textChanger(aidYearValue);
    } else if (formType.value == "FAFSA") {
        textChanger(aidYearValue);
    }
}

debugger;
function textChanger(aidYearValue) {

    var financialAidYearVal = financialAidYear;
    // var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);
    var aidYearVal = aidYear.value;
    var otherAidYearVal = aidYearVal - 1;
    var secondTextVal = "";
    var tableInstructionsTextVal = "";
    if (aidYear.value == "2019") {
        aidYearVal = "2022";
        otherAidYearVal = "2021";
        if (formType.value == "FAFSA") {
            aidYearVal = "2023";
            otherAidYearVal = "2022";
        }
    }
    if (aidYear.value == "2020") {
        aidYearVal = "2023";
        otherAidYearVal = "2022";
    }
    var formCodeTextVal = "<b>" + formCode.value + "</b>";
    /*  if(aidYear.value == "2019" && formType.value == "FAFSA"){
        formCodeTextVal = "F1HSZS";
      }*/
    var titleTextVal = "<p><b>STUDENT FAMILY SIZE CERTIFICATION (" + aidYearValue + ")</b></p>";
    if (formType.value == "CDA") {
        titleTextVal = "<p><b>STUDENT FAMILY SIZE CERTIFICATION (" + aidYearValue + ")<br>CA Dream Act Application</b></p>";
    }

    var firstTextVal = "<p><b><u>INSTRUCTIONS:</u></b><br>Fill in the information about the people that you (and your spouse) will support between July 1, " + otherAidYearVal + " and June 30, " + aidYearVal + ".<i> Incomplete documents <br> will not be returned. They will be disposed of in a secure manner, per university policy.<br> This will delay processing.</i></p>";




    $("#mainHeadingText").html(formCodeTextVal);
    $("#f0chssHeadingText").html(titleTextVal);
    if (formType.value == "CDA") {
        secondTextVal = "<p><b>OTHER PEOPLE MAY BE INCLUDED ONLY IF THEY:</b><br>-&nbsp; &nbsp;<u>lived with and received more than half of their support from you or your spouse at the time you completed your</u><br>&nbsp;&nbsp;&nbsp; <u>California Dream Act Application</u><br>&nbsp;&nbsp;&nbsp; AND<br>-&nbsp; &nbsp;<u>will continue to receive this support between July 1, " + otherAidYearVal + " and June 30, " + aidYearVal + ".</u></p>";
      
      debugger;
        if (aidYear.value == "2025") {
            tableInstructionsTextVal = "<p><b><u>TELL US ABOUT YOUR FAMILY SIZE</u></b><br>List all family members that meet the definition listed above.</p>";

         

            CDATable.headerRow.headerItem16502731919571650273193455.visible = false;
            CDATable.Row1.listCollege1.visible = false;
            cdaStudentCollege.visible = false;
            cdaCollege.visible = false;
            CDATable.headerRow.headerItem16502732711671650273272878.visible = false;
            cdaEnrolledUnitsYes1.visible = false;
            cdaStudentUnitsYes.visible = false;
            cdaUnitsYes.visible = false; 
            CDATable.headerRow.headerItem16502732803311650273281226.visible = false;
            cdaEnrolledUnitsNo1.visible = false;
            cdaUnitsNo.visible = false;
            cdaStudentUnitsNo.visible = false;
            $("#f0chssTableInstructions").html(tableInstructionsTextVal);
        }
      
     /*  if ((aidYear.value == "2024") ||(aidYear.value == "2023")){
         headerItemTwo.visible = false;
         cdaAddButton_two.visible = false;
         cdaRemoveButtonTwo.visible = false;
       }*/

        $("#f0chssTextOne").html(firstTextVal);
        $("#f0chssTextTwo").html(secondTextVal);

    }
    if (formType.value == "FAFSA") {
        secondTextVal = "<p><b>OTHER PEOPLE MAY BE INCLUDED ONLY IF THEY:</b><br>-&nbsp; &nbsp;<u>lived with and received more than half of their support from you or your spouse at the time you completed your</u><br>&nbsp;&nbsp;&nbsp; <u>Free Application for Federal Student Aid</u><br>&nbsp;&nbsp;&nbsp; AND<br>-&nbsp; &nbsp;<u>will continue to receive this support between July 1, " + otherAidYearVal + " and June 30, " + aidYearVal + ".</u></p>";
      
        if (aidYear.value == "2025") {
            tableInstructionsTextVal = "<p><b><u>TELL US ABOUT YOUR FAMILY SIZE</u></b><br>List all family members that meet the definition listed above.</p>";

           // headerItem16502732711671650273272878.visible = false;
          //  headerItem16502732803311650273281226.visible = false;

          FAFSATable.headerRow.headerItem16502731919571650273193455.visible = false;
            FAFSATable.Row1.listCollege1.visible = false;
            fafsaStudentCollege.visible = false; 
          fafsaCollege.visible = false;
            FAFSATable.headerRow.headerItem16502732711671650273272878.visible = false;
            fafsaEnrolledUnitsYes1.visible = false; 
          fafsaStudentUnitsYes.visible = false;
            fafsaUnitsYes.visible = false;
            FAFSATable.headerRow.headerItem16502732803311650273281226.visible = false; 
           fafsaEnrolledUnitsNo1.visible = false;
            fafsaStudentUnitsNo.visible = false;
            fafsaUnitsNo.visible = false;
            $("#f1hszsTableInstructions").html(tableInstructionsTextVal);
        }

        $("#f1hszsTextOne").html(firstTextVal);
        $("#f1hszsTextTwo").html(secondTextVal);
    }

}

function checkforDuplicateSubmissions(formCodeVal, financialAidYearVal) {
    var tableName = "AEM_FAMILY_SIZE_STUDENT";
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
 * @function student_familysize_certification_student_family_size_certification.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_Date_1_init0 = function (scope) {
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
 * @function student_familysize_certification_student_family_size_certification.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_cdaEnrolledUnitsYes1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_cdaEnrolledUnitsYes1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	enrolledUnitsNo1.value = null;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_cdaEnrolledUnitsNo1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_cdaEnrolledUnitsNo1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.value = 1;
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_cdaStudentUnitsYes_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_cdaStudentUnitsYes_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value == 1){
  	cdaStudentUnitsNo.value = null;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_cdaStudentUnitsNo_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_cdaStudentUnitsNo_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 0){
  	cdaStudentUnitsYes.value = null;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_cdaCollege_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_cdaCollege_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(aidYear.value == "2025"){
  this.visible = false;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_cdaUnitsYes_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_cdaUnitsYes_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(aidYear.value == "2025"){
  this.visible = false;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_cdaUnitsYes_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_cdaUnitsYes_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	cdaUnitsNo.value = null;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_cdaUnitsNo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_cdaUnitsNo_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(aidYear.value == "2025"){
  this.visible = false;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_cdaUnitsNo_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_cdaUnitsNo_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	cdaUnitsYes.value = null;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_cdaAddButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_cdaAddButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  
  	var rowcount = cdaRow3.instanceManager.instanceCount;
	var lastRow = rowcount - 1; 
  
   if (RemoveRecordFlag.value == "1"){
      	addRowsAfterRemove(lastRow);      	
    }else{
      	addRows();
    }
}

function addRows(){  	
  	if((cdaFullName.value !== null) && (cdaUnitsYes.value !== null || cdaUnitsNo.value !== null)){
        cdaRow3.instanceManager.addInstance();
    }
    else{
        showErrorModal("Alert !", "Enter the record before adding a new");
    }
}

function addRowsAfterRemove(lastRow){   	
  	if((cdaRow3.instanceManager.instances[lastRow]._children[0].value !== null) && (cdaRow3.instanceManager.instances[lastRow]._children[4].value !== null || cdaRow3.instanceManager.instances[lastRow]._children[5].value !== null)){
        cdaRow3.instanceManager.addInstance();
    }
    else{
        showErrorModal("Alert !", "Enter the record before adding a new");
    }
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_cdaAddButton_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_cdaAddButton_click1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  
  	var rowcount = cdaRow3.instanceManager.instanceCount;
	var lastRow = rowcount - 1; 
  
   if (RemoveRecordFlag.value == "1"){
      	addRowsAfterRemove(lastRow);      	
    }else{
      	addRows();
    }
}

debugger;
function addRows(){
  if((aidYear.value == "2025") && (cdaFullName.value !== null)) {
    
  /*  cdaCollege.visible = false;
         cdaUnitsYes.visible = false;
        cdaUnitsNo.visible = false;
    var rowcount = cdaRow3.instanceManager.instanceCount;
    for(var i=0; i<rowcount; i++ ){
      cdaRow3.instanceManager.instances[i].cdaCollege.visible = false;
      cdaRow3.instanceManager.instances[i].cdaUnitsYes.visible = false;
      cdaRow3.instanceManager.instances[i].cdaUnitsNo.visible = false;
    }*/
    cdaRow3.instanceManager.addInstance();
    
  }
  else if((cdaFullName.value !== null) && (cdaUnitsYes.value !== null || cdaUnitsNo.value !== null)){
        cdaRow3.instanceManager.addInstance();
    }
  else{
        showErrorModal("Alert !", "Enter the record before adding a new");
    }
}

function addRowsAfterRemove(lastRow){
   if((aidYear.value == "2025") && (cdaRow3.instanceManager.instances[lastRow]._children[0].value !== null)) {  
     cdaRow3.instanceManager.addInstance();
   }
   else if((cdaRow3.instanceManager.instances[lastRow]._children[0].value !== null) && (cdaRow3.instanceManager.instances[lastRow]._children[4].value !== null || cdaRow3.instanceManager.instances[lastRow]._children[5].value !== null)){
        cdaRow3.instanceManager.addInstance();
    }
    else{
        showErrorModal("Alert !", "Enter the record before adding a new");
    }
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_cdaRemoveButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_cdaRemoveButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){  	
  	var rowCount = cdaRow3.instanceManager.instanceCount;
  	if(rowCount == 1){
      	showErrorModal("Alert !", "Add a new row to remove");      	
    }else{
      	cdaRow3.instanceManager.removeInstance(cdaRow3.instanceManager.instanceCount-1);
    }  	

	RemoveRecordFlag.value = "1";
}

        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_fafsaEnrolledUnitsYes1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_fafsaEnrolledUnitsYes1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.value = 1;
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_fafsaStudentUnitsYes_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_fafsaStudentUnitsYes_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	fafsaStudentUnitsNo.value = null;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_fafsaStudentUnitsNo_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_fafsaStudentUnitsNo_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 0){
  	fafsaStudentUnitsYes.value = null;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_fafsaCollege_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_fafsaCollege_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(aidYear.value == "2025"){
  this.visible = false;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_fafsaUnitsYes_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_fafsaUnitsYes_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(aidYear.value == "2025"){
  this.visible = false;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_fafsaUnitsYes_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_fafsaUnitsYes_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	fafsaUnitsNo.value = null;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_fafsaUnitsNo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_fafsaUnitsNo_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(aidYear.value == "2025"){
  this.visible = false;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_fafsaUnitsNo_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_fafsaUnitsNo_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	fafsaUnitsYes.value = null;
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_fafsaAddButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_fafsaAddButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  
  	var rowcount = fafsaRow3.instanceManager.instanceCount;
	var lastRow = rowcount - 1; 
  
   if (RemoveRecordFlag.value == "1"){
      	addRowsAfterRemove(lastRow);      	
    }else{
      	addRows();
    }
}

function addRows(){  	
  	if((fafsaFullName.value !== null) && (fafsaUnitsYes.value !== null || fafsaUnitsNo.value !== null)){
        fafsaRow3.instanceManager.addInstance();
    }
    else{
        showErrorModal("Alert !", "Enter the record before adding a new");
    }
}

function addRowsAfterRemove(lastRow){   	
  	if((fafsaRow3.instanceManager.instances[lastRow]._children[0].value !== null) && (fafsaRow3.instanceManager.instances[lastRow]._children[4].value !== null || fafsaRow3.instanceManager.instances[lastRow]._children[5].value !== null)){
        fafsaRow3.instanceManager.addInstance();
    }
    else{
        showErrorModal("Alert !", "Enter the record before adding a new");
    }
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_fafsaAddButton_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_fafsaAddButton_click1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  
  	var rowcount = fafsaRow3.instanceManager.instanceCount;
	var lastRow = rowcount - 1; 
  
   if (RemoveRecordFlag.value == "1"){
      	addRowsAfterRemove(lastRow);      	
    }else{
      	addRows();
    }
}

function addRows(){ 
   if((aidYear.value == "2025") && (fafsaFullName.value !== null)) { 
     fafsaRow3.instanceManager.addInstance();
   }
  	if((fafsaFullName.value !== null) && (fafsaUnitsYes.value !== null || fafsaUnitsNo.value !== null)){
        fafsaRow3.instanceManager.addInstance();
    }
    else{
        showErrorModal("Alert !", "Enter the record before adding a new");
    }
}

function addRowsAfterRemove(lastRow){   	
    if((aidYear.value == "2025") && (fafsaRow3.instanceManager.instances[lastRow]._children[0].value !== null)) {  
     fafsaRow3.instanceManager.addInstance();
   }
   else if((fafsaRow3.instanceManager.instances[lastRow]._children[0].value !== null) && (fafsaRow3.instanceManager.instances[lastRow]._children[4].value !== null || fafsaRow3.instanceManager.instances[lastRow]._children[5].value !== null)){
        fafsaRow3.instanceManager.addInstance();
    }
    else{
        showErrorModal("Alert !", "Enter the record before adding a new");
    }
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_fafsaRemoveButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_fafsaRemoveButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){  	
  	var rowCount = fafsaRow3.instanceManager.instanceCount;
  	if(rowCount == 1){
      	showErrorModal("Alert !", "Add a new row to remove");      	
    }else{
      	fafsaRow3.instanceManager.removeInstance(fafsaRow3.instanceManager.instanceCount-1);
    }  	

	RemoveRecordFlag.value = "1";
}

        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_SupportingDocumentsPanel_init0 = function (scope) {
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
 * @function student_familysize_certification_student_family_size_certification.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_supportDoc1_valueCommit0 = function (scope) {
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
 * @function student_familysize_certification_student_family_size_certification.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_supportDoc2_valueCommit0 = function (scope) {
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
 * @function student_familysize_certification_student_family_size_certification.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_supportDoc3_valueCommit0 = function (scope) {
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
 * @function student_familysize_certification_student_family_size_certification.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_StudentCB_valueCommit0 = function (scope) {
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
 * @function student_familysize_certification_student_family_size_certification.generated_studentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_studentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_studentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_studentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_evaluator_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_evaluator_signChk_valueCommit0 = function (scope) {
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
      	financialAidAssignee.value = null;

    }
}
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_staffSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_staffSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_staffSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_staffSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_familysize_certification_student_family_size_certification.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            getPdf();

function getPdf() {
    //console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, ' and'));
            jsonData.append('formPath', '/content/forms/af/student-familysize-certification/student-family-size-certification');
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
 * @function student_familysize_certification_student_family_size_certification.generated_submit1608529416101_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_familysize_certification_student_family_size_certification.generated_submit1608529416101_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if(RemoveRecordFlag.value == "1"){
	withRemoveValidation();
}
else{
	withoutRemoveValidation();
}


function withoutRemoveValidation(){
	if((formType.value == "CDA") && (cdaStudentName.value !== null) && (cdaStudentDob.value !== null) && (cdaStudentCollege.value !== null) && (cdaStudentUnitsYes.value === null && cdaStudentUnitsNo.value === null)){
	showErrorModal("Alert", "Please select yes/no if you enrolled 6 or more units");
	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAFamilySizeCertificationTab[0].CDATable[0].Row2[0].cdaStudentUnitsYes[0]");
	}else if(formType.value == "CDA" && cdaFullName.value === null){
		showErrorModal("Alert", "Please enter the record");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAFamilySizeCertificationTab[0].CDATable[0].cdaRow3[0].cdaFullName[0]");
	}else if((formType.value == "CDA") && (cdaFullName.value !== null) && (cdaDob.value !== null) && (cdaRelationship.value !== null) && (cdaCollege.value !== null) && (cdaUnitsYes.value === null && cdaUnitsNo.value === null)){
		showErrorModal("Alert", "Please select yes/no if you enrolled 6 or more units");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAFamilySizeCertificationTab[0].CDATable[0].cdaRow3[0].cdaUnitsYes[0]");
	}
	else if(formType.value == "FAFSA" && fafsaFullName.value === null){
		showErrorModal("Alert", "Please enter the record");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAFamilySizeCertificationTab[0].FAFSATable[0].fafsaRow3[0].fafsaFullName[0]");
	}else if((formType.value == "FAFSA") && (fafsaStudentName.value !== null) && (fafsaStudentDob.value !== null) && (fafsaStudentCollege.value !== null) && (fafsaStudentUnitsYes.value === null && fafsaStudentUnitsNo.value === null)){
		showErrorModal("Alert", "Please select yes/no if you enrolled 6 or more units");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAFamilySizeCertificationTab[0].FAFSATable[0].Row16522653938101652265394340[0].fafsaStudentUnitsYes[0]");
	}else if((formType.value == "FAFSA") && (fafsaFullName.value !== null) && (fafsaDob.value !== null) && (fafsaRelationship.value !== null) && (fafsaCollege.value !== null) && (fafsaUnitsYes.value === null && fafsaUnitsNo.value === null)){
		showErrorModal("Alert", "Please select yes/no if you enrolled 6 or more units");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAFamilySizeCertificationTab[0].FAFSATable[0].fafsaRow3[0].fafsaFullName[0]");
	}else {
		if(fafsaFullName.value !== null){
		  fafsaDob.mandatory = true;
		  fafsaRelationship.mandatory = true;
		  fafsaCollege.mandatory = true;
		}
		else if(cdaFullName.value !== null){
		  cdaDob.mandatory = true;
		  cdaRelationship.mandatory = true;
		  cdaCollege.mandatory = true;
		}
		submitAction();
	}
}

//Row1.instanceManager.instances[0]._children[0].value

function withRemoveValidation(){
  	
  	var cdaRowCount = cdaRow3.instanceManager.instanceCount; 
  	var cdaLastRow = cdaRowCount-1;
  
	var fafsaRowCount = fafsaRow3.instanceManager.instanceCount;
  	var fafsaLastRow = fafsaRowCount-1;
  
	if((formType.value == "CDA") && (cdaRow3.instanceManager.instances[cdaLastRow]._children[0].value !== null) && (cdaRow3.instanceManager.instances[cdaLastRow]._children[1].value !== null) && (cdaRow3.instanceManager.instances[cdaLastRow]._children[3].value !== null) && (cdaRow3.instanceManager.instances[cdaLastRow]._children[4].value === null && cdaRow3.instanceManager.instances[cdaLastRow]._children[5].value === null)){
	showErrorModal("Alert", "Please select yes/no if you enrolled 6 or more units");
	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAFamilySizeCertificationTab[0].CDATable[0].Row2[0].cdaStudentUnitsYes[0]");
	}else if(formType.value == "CDA" && cdaRow3.instanceManager.instances[cdaLastRow]._children[0].value === null){
		showErrorModal("Alert", "Please enter the record");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAFamilySizeCertificationTab[0].CDATable[0].cdaRow3[0].cdaFullName[0]");
	}else if((formType.value == "CDA") && (cdaRow3.instanceManager.instances[cdaLastRow]._children[0].value !== null) && (cdaRow3.instanceManager.instances[cdaLastRow]._children[1].value !== null) && (cdaRow3.instanceManager.instances[cdaLastRow]._children[2].value !== null) && (cdaRow3.instanceManager.instances[cdaLastRow]._children[3].value !== null) && (cdaRow3.instanceManager.instances[cdaLastRow]._children[4].value === null && cdaRow3.instanceManager.instances[cdaLastRow]._children[5].value === null)){
		showErrorModal("Alert", "Please select yes/no if you enrolled 6 or more units");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAFamilySizeCertificationTab[0].CDATable[0].cdaRow3[0].cdaUnitsYes[0]");
	}
	else if(formType.value == "FAFSA" && fafsaRow3.instanceManager.instances[fafsaLastRow]._children[0].value === null){
		showErrorModal("Alert", "Please enter the record");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAFamilySizeCertificationTab[0].FAFSATable[0].fafsaRow3[0].fafsaFullName[0]");
	}else if((formType.value == "FAFSA") && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[0].value !== null) && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[1].value !== null) && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[3].value !== null) && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[4].value === null && fafsaRow3.instanceManager.instances[fafsaLastRow]._children[5].value === null)){
		showErrorModal("Alert", "Please select yes/no if you enrolled 6 ore more units");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAFamilySizeCertificationTab[0].FAFSATable[0].Row16522653938101652265394340[0].fafsaStudentUnitsYes[0]");
	}else if((formType.value == "FAFSA") && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[0].value !== null) && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[1].value !== null) && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[2].value !== null) && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[3].value !== null) && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[4].value === null && fafsaRow3.instanceManager.instances[fafsaLastRow]._children[5].value === null)){
		showErrorModal("Alert", "Please select yes/no if you enrolled 6 or more units");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAFamilySizeCertificationTab[0].FAFSATable[0].fafsaRow3[0].fafsaFullName[0]");
	}else {
		
		submitAction();		
	}
}


function submitAction(){
  aftiaDescCWID.value = firstName.value+ " " + lastName.value + " " + cwid.value;
  EmailSubject.value = "Test - Student Family Size Certification - (" + cwid.value+")";
  
   //var testEmail = "daduong@fullerton.edu";
  var testEmail = "shreyas.manjunatha@thoughtfocus.com";
  HiddenStudentEmail.value = testEmail;  

  guideBridge.submit();
}
        }
	}
}
