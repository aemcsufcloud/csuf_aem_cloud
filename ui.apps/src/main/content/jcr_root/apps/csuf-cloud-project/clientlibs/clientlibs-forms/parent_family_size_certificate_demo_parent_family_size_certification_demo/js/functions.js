/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {     		
	FinancialSignaturePanel.visible = false; 
  	
  	$.getJSON("https://api.ipify.org?format=json", function(data) {                
        ipAddress.value = data.ip;            	
    });
  
  	disabledCutCopyPasteFunctionality();   //Function to disable Cut Copy Paste Functionality
}
else if(StageIndicator.value == "ToFinancialAid"){
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
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  showErrorModal("Alert!", "Please make sure to save your work every 20-30 minutes and complete all the required fields.");
}
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if (StageIndicator.value === null) {
    var gifModal = document.getElementById('gifModal');
    var typeOfForm = getUrlParameters('formType');

    if (typeOfForm == "CDA") {
        formType.value = "CDA";
        FAFSAFamilySizeCertificationTab.visible = false;
      //  loggedInDetails(); 
       singleAidYear();
        gifModal.style.display = "none";

    } else if (typeOfForm == "FAFSA") {
        formType.value = "FAFSA";
        CDAFamilySizeCertificationTab.visible = false;
       singleAidYear();
      //  loggedInDetails();
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
           singleAidYear();
          //  loggedInDetails();
            gifModal.style.display = "none";
        };

        document.getElementById("secondButton2").onclick = function() {
            modal.style.display = "none";
            formType.value = "FAFSA";
            CDAFamilySizeCertificationTab.visible = false;
           singleAidYear();
          //  loggedInDetails();
            gifModal.style.display = "none";
        };
    }
}


caseID();
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
if (StageIndicator.value === null) {

                var typeOfAidYear = getUrlParameters('aidYear');

                if (typeOfAidYear == "0") {
                    singleAidYear();
                } else if (typeOfAidYear == "1") {
                    singleAidYear();
                }  else {
                  singleAidYear();
                   // showErrorModal("Alert !", "No matching records found for the Aid Year");
                }
}

function aidYearPopup() {
    var financialAidPopupValues = getAidYearValuesOnPopup(); 
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var formCodeVal = "";
debugger;
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
            formCode.value = formCodePrefix+"CHSP";
            formCodeVal = formCodePrefix+"CHSP";
        } else if (formType.value == "FAFSA") {
            formCode.value = formCodePrefix+"HSZP";
            formCodeVal = formCodePrefix+"HSZP";
        }
      textChanger(aidYearValue);
      //checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = financialAidPopupValues.FinAidYearTwo;
        aidYear.value = financialAidPopupValues.AidYearTwo;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        var formCodePrefix = financialAidPopupValues.FinAidYearFormCodeTwo;

        if (formType.value == "CDA") {
            formCode.value = formCodePrefix+"CHSP";
            formCodeVal = formCodePrefix+"CHSP";
        } else if (formType.value == "FAFSA") {
            formCode.value = formCodePrefix+"HSZP";
            formCodeVal = formCodePrefix+"HSZP";
        }
       textChanger(aidYearValue);
       //checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
    };
}

function singleAidYear() {    	
  	var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";
    var formCodeVal = "";
    var singleFinancialAidvalues = getAidYearValuesOnSingleAidYear();
  debugger;
   if (typeOfAidYear == '0') {
        financialAidYearVal = singleFinancialAidvalues.FinAidYearZero;
        aidYear.value = singleFinancialAidvalues.AidYearZero;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "CDA") {
            formCode.value = "F0CHSP";
            formCodeVal = "F0CHSP";
        } else if (formType.value == "FAFSA") {
            formCode.value = "F0HSZP";
            formCodeVal = "F0HSZP";
        }
        textChanger(aidYearValue);
     //   checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
     
    } else if (typeOfAidYear == '1') {
        financialAidYearVal = singleFinancialAidvalues.FinAidYearOne;
        aidYear.value = singleFinancialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        if (formType.value == "CDA") {
            formCode.value = "F1CHSP";
            formCodeVal = "F1CHSP";
        } else if (formType.value == "FAFSA") {
            formCode.value = "F1HSZP";
            formCodeVal = "F1HSZP";
        }
        textChanger(aidYearValue);
      //  checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
      
    } else {
        financialAidYearVal = singleFinancialAidvalues.FinAidYearGeneral;
        aidYear.value = singleFinancialAidvalues.AidYearGeneral;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        var formCodePrefix = singleFinancialAidvalues.FormCodeGeneral;
        if (formType.value == "CDA") {
            formCode.value = formCodePrefix + "CHSP";
            formCodeVal = formCodePrefix + "CHSP";
        } else if (formType.value == "FAFSA") {
            formCode.value = formCodePrefix + "HSZP";
            formCodeVal = formCodePrefix + "HSZP";
        }
        textChanger(aidYearValue);
    //    checkforDuplicateSubmissions(formCodeVal,financialAidYearVal);
    }
}

if (StageIndicator.value !== null) {
    aidYearValue =  financialAidYear.value;
 
	if(formType.value == "CDA"){
		textChanger(aidYearValue);
	}
	else if(formType.value == "FAFSA"){
		textChanger(aidYearValue);
	}    
} 

function textChanger(aidYearValue) {
  debugger;
  var financialAidYearVal = financialAidYear;
  // var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);
  var aidYearVal = aidYear.value;
    var otherAidYearVal = aidYearVal - 1;
   var secondTextVal = "";
   if(aidYear.value == "2019"){
    aidYearVal = "2022";
    otherAidYearVal = "2021";
  }
  if(aidYear.value == "2020"){
    aidYearVal = "2023";
    otherAidYearVal = "2022";
  }
  
   var formCodeTextVal = "<b>"+formCode.value+"</b>";
   var titleTextVal = "<p><b>PARENT FAMILY SIZE CERTIFICATION (" + aidYearValue + ")</b></p>";
  if (formType.value == "CDA") {
        titleTextVal = "<p><b>PARENT FAMILY SIZE CERTIFICATION (" + aidYearValue + ")<br>CA Dream Act Application</b></p>";
    }
  
  
  var firstTextVal = "<p><b><u>INSTRUCTIONS:</u></b><br>Fill in the information about the people that your parents will support between July 1, "+otherAidYearVal+" and June 30, "+aidYearVal+". See definition of<br> parent below. <i>Incomplete documents will not be returned. They will be disposed of in a secure manner, per university policy. This will<br> delay processing.</i></p>";
  
   $("#mainHeadingText").html(formCodeTextVal);
    $("#f0chssHeadingText").html(titleTextVal);
  
   if (formType.value == "CDA") {
     
     secondTextVal = "<p><b>OTHER PEOPLE MAY BE INCLUDED ONLY IF THEY:</b><br><br>- <u>lived with and received more than half of their support from your parents at the time you completed your (CDA)</u> and<br> - <u>will continue to receive this support between July 1, "+otherAidYearVal+" and June 30, "+aidYearVal+".</u></p>";

        $("#f0chssTextOne").html(firstTextVal);
        $("#f0chssTextTwo").html(secondTextVal);
    }
    if (formType.value == "FAFSA") {
      
      secondTextVal = "<p><b>OTHER PEOPLE MAY BE INCLUDED ONLY IF THEY:</b><br><br>- <u>lived with and received more than half of their support from your parents at the time you completed your (FAFSA)</u> and<br>- <u>will continue to receive this support between July 1, "+otherAidYearVal+" and June 30, "+aidYearVal+".</u></p>";
      
        $("#f1hszsTextOne").html(firstTextVal);
        $("#f1hszsTextTwo").html(secondTextVal);
    }
}


        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
  this.value="80123456";
}
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cwid_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cwid_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
                if (StageIndicator.value === null) {
        if (this.value == "80123456") {

            HiddenStudentUserID.value = "80123456";
            studentIDNumber.value = "80123456";
            firstName.value = "John";
            lastName.value = "Smith";
           HiddenStudentEmail.value = "yashovardhan.jayaram@thoughtfocus.com";
          // HiddenStudentEmail.value = "shreyas.manjunatha@thoughtfocus.com";
            HiddenStudentName.value = firstName.value + " " + lastName.value;

            if (cdaStudentName.value === null || cdaStudentName.value !== undefined) {
                cdaStudentName.value = firstName.value + " " + lastName.value;
            }

            if (fafsaStudentName.value === null || fafsaStudentName.value !== undefined) {
                fafsaStudentName.value = firstName.value + " " + lastName.value;
            }

        } else {
            showErrorModal("Alert!", "No Matching records found");
        }

    }
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_Date_1_init0 = function (scope) {
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
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaEnrolledUnitsYes1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaEnrolledUnitsYes1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	enrolledUnitsNo1.value = null;
}
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaEnrolledUnitsNo1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaEnrolledUnitsNo1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.value = 1;
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaStudentUnitsYes_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaStudentUnitsYes_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value == 1){
  	cdaStudentUnitsNo.value = null;
}
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaStudentUnitsNo_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaStudentUnitsNo_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	cdaStudentUnitsYes.value = null;
}
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaUnitsYes_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaUnitsYes_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	cdaUnitsNo.value = null;
}
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaUnitsNo_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaUnitsNo_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	cdaUnitsYes.value = null;
}
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaAddButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaAddButton_click0 = function (scope) {
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
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaRemoveButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_cdaRemoveButton_click0 = function (scope) {
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
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_fafsaEnrolledUnitsYes1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_fafsaEnrolledUnitsYes1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.value = 1;
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_fafsaStudentUnitsYes_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_fafsaStudentUnitsYes_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	fafsaStudentUnitsNo.value = null;
}
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_fafsaStudentUnitsNo_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_fafsaStudentUnitsNo_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 0){
  	fafsaStudentUnitsYes.value = null;
}
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_fafsaUnitsYes_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_fafsaUnitsYes_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	fafsaUnitsNo.value = null;
}
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_fafsaUnitsNo_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_fafsaUnitsNo_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	fafsaUnitsYes.value = null;
}
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_fafsaAddButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_fafsaAddButton_click0 = function (scope) {
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
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_fafsaRemoveButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_fafsaRemoveButton_click0 = function (scope) {
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
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_SupportingDocumentsPanel_init0 = function (scope) {
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
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_NonMedicalSupportingDocument1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_NonMedicalSupportingDocument1_valueCommit0 = function (scope) {
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
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_NonMedicalSupportingDocument2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_NonMedicalSupportingDocument2_valueCommit0 = function (scope) {
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
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_NonMedicalSupportingDocument3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_NonMedicalSupportingDocument3_valueCommit0 = function (scope) {
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
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_StudentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
debugger;
if (this.value == 1) {
    if (StageIndicator.value === null) {
        studentSignature.value = "";
        studentSignDate.value = "";
        if (studentSignDate.value === null) {
            studentSignDate.enabled = false;

            studentSignature.value = "John Smith";
            var dateString = new Date().toLocaleString("en-US", {

                timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
            }).replace(/[^ -~]/g, '');
            var dateObject = new Date(dateString);
            var curyear = dateObject.getFullYear();
            var curyearMonth = dateObject.getMonth() + 1;
            var curyearDay = dateObject.getDate();
            var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
            studentSignDate.value = d;

            studentSignature.enabled = false;
        }
    }
} else {
    studentSignature.value = "";
    studentSignDate.value = "";
} 






        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_studentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_studentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_studentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_studentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_evaluator_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_evaluator_signChk_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            

if (StageIndicator.value == "ToFinancialAid") {
    if (this.value == 1) {

        staffSignature.value = "Mathew Parker";
     // EvaluatorNameSign.value = "Mathew Parker";
       financialAidAssignee.value = "10111";
        var dateString = new Date().toLocaleString("en-US", {

            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        staffSignDate.value = d;

        staffSignature.enabled = false;
        staffSignDate.enabled = false;
    } else {
        staffSignature.value = "";
         financialAidAssignee.value = "";
        staffSignDate.value = "";
    }
}

        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_staffSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_staffSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_staffSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_staffSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_WorkflowInstanceID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_WorkflowInstanceID_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value !== null){
  	
  	var wId = localStorage.getItem("workItemId");
  	console.log("=workItemID=== " + wId);
	//if(this.value !== null){
		var instance = this.value;
  		var adobeSignDocumentName = 'Parent_Family_Size_Certificate_Adobe_Sign.pdf';		
		var requestURL = '/bin/getInboxItemDetails?action=ADOBE_SIGN_DOCUMENT_ATTACHMENT&workItemId=' + wId + '&signedDocument=' + adobeSignDocumentName + '&workflowInstanceId=' + encodeURIComponent(instance);  		
		console.log(requestURL);
  
		$.ajax({
			type: "GET",
			contentType: "application/pdf; charset=utf-8",
			url: '/bin/getTaskDetailsFromProcessingInstance?url=' + encodeURIComponent(requestURL),
			async: false,
			cache: false,
			dataType: "json",
			success: function(response) {

				if (response.length > "0") {					
					var mydiv = document.getElementById("gridView");
					mydiv.innerHTML = "";
					for (i = 0; i < response.length; i++) {						
						var jsonData = response[i];                      	
						var linkSource = ((window.location.protocol) + "//" + window.location.hostname + ':' + window.location.port) + "/bin/getTaskAttachmentFromProcessingInstance?assetPath=" + encodeURIComponent(jsonData.path);				  
                      	
						var downloadLink = document.createElement("a");
						downloadLink.id = ("a".concat(i));						
						var fName = jsonData.fileName;                      	

						downloadLink.innerText = fName;
						var para = document.createElement("p");
						para.innerText = "";
						mydiv.appendChild(para);
						mydiv.appendChild(downloadLink);
						downloadLink.href = linkSource;
						downloadLink.download = fName;
						//downloadLink.click();

					}
					var breakLine = document.createElement("p");
					breakLine.innerText = "";
					var docDiv = document.getElementById("gridView");
					docDiv.appendChild(breakLine);
				}
			},
			error: function(error) {
				console.log("error block=" + error);
			}
		});
	//}
}
        }
	}
}
/**
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            getPdf();

function getPdf() {
    //console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, ' and'));
            jsonData.append('formPath', '/content/forms/af/parent-family-size-certificate-demo/parent-family-size-certification-demo');
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
 * @function parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_submit1608529416101_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parent_family_size_certificate_demo_parent_family_size_certification_demo.generated_submit1608529416101_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if(RemoveRecordFlag.value == "1"){
	withRemoveValidation();
}
else{
	withoutRemoveValidation();
}


function withoutRemoveValidation(){
  	if(parentEmail.value === null){
  	showErrorModal("Alert !", "Please enter the parent email");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].StudentInformation[0].parentEmail[0]");
    }else if(parentEmail.value != confirmParentEmail.value){
        showErrorModal("Alert !", "Parent email does not match");
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].StudentInformation[0].confirmParentEmail[0]");
    }
	else if((formType.value == "CDA") && (cdaStudentName.value !== null) && (cdaStudentDob.value !== null) && (cdaStudentCollege.value !== null) && (cdaStudentUnitsYes.value === null && cdaStudentUnitsNo.value === null)){
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
  
	if(parentEmail.value === null){
        showErrorModal("Alert !", "Please enter the parent email");
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].StudentInformation[0].parentEmail[0]");
    }else if(parentEmail.value != confirmParentEmail.value){
        showErrorModal("Alert !", "Parent email does not match");
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].StudentInformation[0].confirmParentEmail[0]");
    }
	else if((formType.value == "CDA") && (cdaRow3.instanceManager.instances[cdaLastRow]._children[0].value !== null) && (cdaRow3.instanceManager.instances[cdaLastRow]._children[1].value !== null) && (cdaRow3.instanceManager.instances[cdaLastRow]._children[3].value !== null) && (cdaRow3.instanceManager.instances[cdaLastRow]._children[4].value === null && cdaRow3.instanceManager.instances[cdaLastRow]._children[5].value === null)){
	showErrorModal("Alert", "Please select yes/no if you enrolled 6 or more units");
	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAFamilySizeCertificationTab[0].CDATable[0].Row2[0].cdaStudentUnitsYes[0]");
	}else if(formType.value == "CDA" && cdaRow3.instanceManager.instances[cdaLastRow]._children[0].value === null){
		showErrorModal("Alert", "Please enter the record");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAFamilySizeCertificationTab[0].CDATable[0].cdaRow3[0].cdaFullName[0]");
	}else if((formType.value == "CDA") && (cdaRow3.instanceManager.instances[cdaLastRow]._children[0].value !== null) && (cdaRow3.instanceManager.instances[cdaLastRow]._children[1].value !== null) && (cdaRow3.instanceManager.instances[cdaLastRow]._children[2].value !== null) && (cdaRow3.instanceManager.instances[cdaLastRow]._children[3].value !== null) && (cdaRow3.instanceManager.instances[cdaLastRow]._children[4].value === null && cdaRow3.instanceManager.instances[cdaLastRow]._children[5].value === null)){
		showErrorModal("Alert", "Please select yes/no if you enrolled 6 ore more units");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].CDAFamilySizeCertificationTab[0].CDATable[0].cdaRow3[0].cdaUnitsYes[0]");
	}
	else if(formType.value == "FAFSA" && fafsaRow3.instanceManager.instances[fafsaLastRow]._children[0].value === null){
		showErrorModal("Alert", "Please enter the record");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAFamilySizeCertificationTab[0].FAFSATable[0].fafsaRow3[0].fafsaFullName[0]");
	}else if((formType.value == "FAFSA") && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[0].value !== null) && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[1].value !== null) && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[3].value !== null) && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[4].value === null && fafsaRow3.instanceManager.instances[fafsaLastRow]._children[5].value === null)){
		showErrorModal("Alert", "Please select yes/no if you enrolled 6 ore more units");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAFamilySizeCertificationTab[0].FAFSATable[0].Row16522653938101652265394340[0].fafsaStudentUnitsYes[0]");
	}else if((formType.value == "FAFSA") && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[0].value !== null) && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[1].value !== null) && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[2].value !== null) && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[3].value !== null) && (fafsaRow3.instanceManager.instances[fafsaLastRow]._children[4].value === null && fafsaRow3.instanceManager.instances[fafsaLastRow]._children[5].value === null)){
		showErrorModal("Alert", "Please select yes/no if you enrolled 6 ore more units");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].FAFSAFamilySizeCertificationTab[0].FAFSATable[0].fafsaRow3[0].fafsaFullName[0]");
	}else {
		
		submitAction();		
	}
}


function submitAction(){
  aftiaDescCWID.value = firstName.value+ " " + lastName.value + " " + cwid.value;
  EmailSubject.value = "Test - Parent Family Size Certification - (" + cwid.value+")";
  
    if(aidYear.value == "2019" && formType.value == "CDA"){
    	documentNameForAdobeSign.value = "Parent Family Size Certification - F0CHSP";
  }
  else if(aidYear.value == "2020" && formType.value == "CDA"){
    	documentNameForAdobeSign.value = "Parent Family Size Certification - F1CHSP";
  }
  else if(aidYear.value == "2019" && formType.value == "FAFSA"){
    documentNameForAdobeSign.value = "Parent Family Size Certification - F0HSZP";  
  }
  else if(aidYear.value == "2020" && formType.value == "FAFSA"){
    documentNameForAdobeSign.value = "Parent Family Size Certification - F1HSZP";  
  }
  
  if(aidYear.value != "2019" && aidYear.value != "2020"){
    documentNameForAdobeSign.value = "Parent Family Size Certification - "+formCode.value;
  }
  
   
 var testEmail = "yashovardhan.jayaram@thoughtfocus.com";
 // var testEmail = "shreyas.manjunatha@thoughtfocus.com";

  
  HiddenStudentEmail.value = testEmail;  

  guideBridge.submit();
}
        }
	}
}
