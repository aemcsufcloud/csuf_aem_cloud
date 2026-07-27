/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            document.getElementById('gifModal').style.display = "none";

gifModal.style.display = "none";



if(StageIndicator.value === null  || StageIndicator.value == "ToManager" || StageIndicator.value == "ToManagerAcknowledge" || StageIndicator.value == "ToManagerFinalAcknowledge" || StageIndicator.value == "ToManagerHRDI" || StageIndicator.value == "ToManagerAcknowledgeOnExpire"){

EvaluatorSignaturePanel.visible = true;
if(StageIndicator.value == "ToManagerAcknowledge" || StageIndicator.value == "ToManagerFinalAcknowledge" || StageIndicator.value == "ToManagerHRDI" || StageIndicator.value == "ToManagerAcknowledgeOnExpire"){
   overallRatingPanel.enabled = false;
  basicInformation.enabled = false;
  performanceReport.enabled = false;
  EmpSignaturePanel.visible = true;
}else if(StageIndicator.value === null){
  basicInformation.enabled = true;
  performanceReport.enabled = true;
  signature.visible = false;
}else{  
  basicInformation.enabled = false;
  performanceReport.enabled = true;
 EvaluatorSignaturePanel.visible = false;
    if(sendBackStep.value == "From Employee"){
    signature.visible = true;  
  }else{
 signature.visible = false;
  }
}
  
  if(StageIndicator.value == "ToManager"){
    basicInformation.enabled = true;
    EmpID.enabled = false;
    FirstName.enabled = false;
    LastName.enabled = false;
    EmpRCD.enabled = false;
    CBID.enabled = false;
    Range.enabled = false;
    DepartmentName.enabled = false;
    DepartmentID.enabled = false;
    Classification.enabled = false;
    EvaluationType.enabled = true;
   draftDate.enabled = true;
    RatingPeriodFrom.enabled = true;
    RatingPeriodTo.enabled = true; 
   
}
  if(StageIndicator.value == "ToManagerHRDI"){
     basicInformation.enabled = true;
    EmpID.enabled = false;
    FirstName.enabled = false;
    LastName.enabled = false;
    EmpRCD.enabled = false;
    CBID.enabled = false;
    Range.enabled = false;
    DepartmentName.enabled = false;
    DepartmentID.enabled = false;
    Classification.enabled = false;
    EvaluationType.enabled = true;
    draftDate.enabled = false;
    RatingPeriodFrom.enabled = true;
    RatingPeriodTo.enabled = true;  
    
    EmpDidNotSignCB.enabled = false;
    
    EvaluatorComment.enabled = true;
    EvaluatorSignaturePanel.enabled = true;
    
  }
 if(EmpSign.value !== null){
    
    EmpSignaturePanel.visible = true;
     EmpSignaturePanel.enabled = false;
  }else{
   if(sendBackStep.value == "From Employee"){
      EmpSignaturePanel.visible = true;
        EmpSignaturePanel.enabled = false;
    }else{
    EmpSignaturePanel.visible = false;
  }
  }
   if(HRCoordinatorSign.value !== null){
      signature.visible = true;
     HRCooSection.visible = true;
     HRCooSection.enabled = false;
  }else{
   
    HRCooSection.visible = false;
    
  }
   if(AdminSign.value !== null){
    AdminSignaturePanel.visible = true;
     AdminSignaturePanel.enabled = false;
  }else{
    AdminSignaturePanel.visible = false;
  }
   if(HRDIInitials.value !== null){
    HRSignaturePanel.visible = true;
     
     HRSignaturePanel.enabled = false;
   
  }else{
    HRSignaturePanel.visible = false;
  }
    
  
}
//HR Coordinator

if(StageIndicator.value == "ToHRCoo"){
 // generateDOR.visible = false;
  HRCooSection.visible = true;
  HRCooSection.enabled = true;
   basicInformation.enabled = false;
   overallRatingPanel.enabled = false;
  performanceReport.enabled = false;
   EvaluatorSignaturePanel.visible = false;
  EvaluatorSignaturePanel.enabled = false;
  if(EmpSign.value !== null){
    EmpSignaturePanel.visible = true;
     EmpSignaturePanel.enabled = false;
  }else{
    if(sendBackStep.value == "From Employee"){
      EmpSignaturePanel.visible = false;
        EmpSignaturePanel.enabled = false;
    }else{
    EmpSignaturePanel.visible = false;
    }
    
  }
   if(AdminSign.value !== null){
    AdminSignaturePanel.visible = true;
     AdminSignaturePanel.enabled = false;
  }else{
    AdminSignaturePanel.visible = false;
  }
   if(HRDIInitials.value !== null){
    HRSignaturePanel.visible = true;
     HRSignaturePanel.enabled = false;
  }else{
    HRSignaturePanel.visible = false;
  }
 
}

//Employee review

if(StageIndicator.value == "ToEmployee" || StageIndicator.value == "ToEmployeeAck" || StageIndicator.value == "ToEmployeeAckOnExpire"){
// generateDOR.visible = true;
 overallRatingPanel.enabled = false;
  EmpSignaturePanel.visible = true;
  EmpSignaturePanel.enabled = true;
  basicInformation.enabled = false;
  performanceReport.enabled = false;
  EvaluatorSignaturePanel.visible = true;
  EvaluatorSignaturePanel.enabled = false;
   HRCooSection.visible = false;
  if(StageIndicator.value == "ToEmployeeAck"){
   EmpSignaturePanel.visible = true;  
    EvaluatorSignaturePanel.visible = true;
    EvaluatorSignaturePanel.enabled = false;
  }else{
  EmpSignaturePanel.visible = true;
    EvaluatorSignaturePanel.visible = false;
  }
   if(AdminSign.value !== null){
    AdminSignaturePanel.visible = true;
     AdminSignaturePanel.enabled = false;
  }else{
    AdminSignaturePanel.visible = false;
  }
   if(HRDIInitials.value !== null){
    HRSignaturePanel.visible = true;
     HRSignaturePanel.enabled = false;
  }else{
    HRSignaturePanel.visible = false;
  }
   
}

//To Administrator
if(StageIndicator.value == "ToAdmin"){
//  generateDOR.visible = false;
  AdminSignaturePanel.visible = true;
  AdminSignaturePanel.enabled = true;
   basicInformation.enabled = false;
  performanceReport.enabled = false;
   overallRatingPanel.enabled = false;
    EvaluatorSignaturePanel.visible = true;
  EvaluatorSignaturePanel.enabled = false;
   HRCooSection.visible = false;
  if(EmpSign.value !== null){
    EmpSignaturePanel.visible = true;
     EmpSignaturePanel.enabled = false;
  }else{
    if(sendBackStep.value == "From Employee"){
      EmpSignaturePanel.visible = true;
        EmpSignaturePanel.enabled = false;
    }else{
    EmpSignaturePanel.visible = false;
    }
    
  }
 /* if(EvaluatorSign.value !== null){
    EvaluatorSignaturePanel.visible = true;
     EvaluatorSignaturePanel.enabled = false;
  }else{
    EvaluatorSignaturePanel.visible = false;
  }
   if(HRCoordinatorSign.value !== null){
    HRCooSection.visible = true;
     HRCooSection.enabled = false;
  }else{
    HRCooSection.visible = false;
  }*/
   
   if(HRDIInitials.value !== null){
    HRSignaturePanel.visible = true;
     HRSignaturePanel.enabled = false;
  }else{
    HRSignaturePanel.visible = false;
  }
  
}
// HRDI Review

if(StageIndicator.value == "ToHRDI"){
//  generateDOR.visible = false;
  //basicInformation.enabled = false;
  basicInformation.enabled = true;
    EmpID.enabled = false;
    FirstName.enabled = true;
    LastName.enabled = true;
    EmpRCD.enabled = true;
    CBID.enabled = true;
    Range.enabled = true;
    Classification.enabled = true;
    DepartmentName.enabled = true;//08042021
    DepartmentID.enabled = true;   //08042021 
  	EvalTitle.enabled = true;//08042021
  
    EvaluationType.enabled = true;
    draftDate.enabled = false;
    RatingPeriodFrom.enabled = true;
    RatingPeriodTo.enabled = true; 
  performanceReport.enabled = false;
  HRSignaturePanel.visible = true;
  HRSignaturePanel.enabled = true;
   EvaluatorSignaturePanel.visible = true;
  EvaluatorSignaturePanel.enabled = true;
  EmpSignaturePanel.visible = true;
  EmpSignaturePanel.enabled = true;
   overallRatingPanel.enabled = false;
   HRCooSection.visible = false;
 EvalCB.enabled = false;
EvaluatorNameSign.enabled = true;
EvaluatorSign.enabled = true;
EvaluatorDate.enabled = false;
  EmpSignaturePanel.visible = true;
  EmpSignaturePanel.enabled = true;
  EmpCB.enabled = false;
  EmpCB_1.enabled = false;
EmpSign.enabled = true;
EmpDate.enabled = false;
   EmpDidNotSignCB.enabled = false;
SendForEmpAckCB.enabled = false;
   if(AdminSign.value !== null){
    AdminSignaturePanel.visible = true;
     AdminSignaturePanel.enabled = true;
     AdminCB.enabled = false;
     AdminName.enabled = true;
     AdminSign.enabled = true;
     AdminDate.enabled = false;
     adminTitle.enabled = true;//08042021
  }else{
    AdminSignaturePanel.visible = false;
  }
   if(AdminSign.value !== null){
   AdminSignaturePanel.visible = true;
     AdminSignaturePanel.enabled = true;
     AdminCB.enabled = false;
     AdminName.enabled = true;
     AdminSign.enabled = true;
     AdminDate.enabled = false;
     adminTitle.enabled = true;//08042021
  }else{
    AdminSignaturePanel.visible = false;
  }
  
}
if(StageIndicator.value == "ToHRDI"){
  EmpRCD.mandatory = "error";
  CBID.mandatory = "error";
  Range.mandatory = "error";
  Classification.mandatory = "error";
}else{
  EmpRCD.mandatory = "";
  CBID.mandatory = "";
  Range.mandatory = "";
  Classification.mandatory = "";
}
//Expiry of emp work item
ExpireText.visible = false;
if(StageIndicator.value == "ToManagerAcknowledge"){

if(ExpiryCheckFlag.value == "false"){
  StageIndicator.value = "ToManagerAcknowledge";
}else{
  StageIndicator.value = "ToManagerAcknowledgeOnExpire";
  
  ExpireText.visible = true;
}
}

        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    document.getElementById('gifModal').style.display = "block";
} else {
    document.getElementById('gifModal').style.display = "none";
}
if(FormSubmittedStatus.value !== null){
  document.getElementById('gifModal').style.display = "none";
}
if (FormSubmittedStatus.value === null && StageIndicator.value === null) {
    //var userID = 'kcase';
    var userID = 'rpurohit';
    //var userID = 'anelson';
    //alert("userID="+userID);
    $.ajax({
        type: 'GET',
        url: "/bin/getUserDetails",
        data: {
            userID: userID
        },
        dataType: 'json',

        success: function(myresopnse) {
            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];
            var gifModal = document.getElementById('gifModal');
            if (myresopnse.length === 1) {

                FirstName.value = myresopnse[0].FIRST_NAME;
                LastName.value = myresopnse[0].LAST_NAME;
                DepartmentID.value = myresopnse[0].DEPTID;
                DepartmentName.value = myresopnse[0].DEPTNAME;
                EmpRCD.value = myresopnse[0].EMPL_RCD;
                Classification.value = myresopnse[0].DESCR;
                Range.value = myresopnse[0].GRADE;
                //EvalName.value=myresopnse[0].SupervisorName;
                //EvalTitle.value=myresopnse[0].SupervisorTitle;
                CBID.value = myresopnse[0].UNION_CD;
                EmpUserID.value = myresopnse[0].EMPUSERID;
                AdminUserId.value = myresopnse[0].ADMINUSERID;
                EmpId.value = myresopnse[0].EMPLID;
                //ADMINFULLNAME.value=myresopnse.ADMINFULLNAME; 
                //AdministratorsPrintedName.value =  myresopnse.ADMINFULLNAME; 
                modal.style.display = "none";
                gifModal.style.display = "none";
            } else if (myresopnse.length > 1) {
                gifModal.style.display = "none";
                modal.style.display = "block";
                //populate Hidden Fields
                evalNameHidden.value = myresopnse[0].SupervisorName;
                evalTitleHidden.value = myresopnse[0].SupervisorTitle;
                fnameHidden.value = myresopnse[0].FIRST_NAME;
                lnameHidden.value = myresopnse[0].LAST_NAME;
                EmpUserID.value = myresopnse[0].EMPUSERID;
                AdminUserId.value = myresopnse[0].ADMINUSERID;

                //AdministratorsPrintedName.value =  myresopnse[0].ADMINFULLNAME; 
                var col = [];
                col.push("EMPLID");
                col.push("LAST_NAME");
                col.push("FIRST_NAME");

                col.push("DEPTID");
                col.push("DEPTNAME");
                col.push("EMPL_RCD");
                col.push("DESCR");
                col.push("GRADE");
                col.push("UNION_CD");

                var table = document.createElement("table");
                table.id = "tb";
                var tr = table.insertRow(-1);
                var headings = ["", "Emp ID", "Last Name", "First Name", "Department Id", "Department Name", "Union CD", "Description", "Grade", "Emp RCD"];
                for (var j = 0; j < headings.length; j++) {
                    var th = document.createElement("th");
                    th.innerHTML = headings[j];
                    tr.appendChild(th);
                }
                for (var k = 0; k < myresopnse.length; k++) {
                    tr = table.insertRow(-1);
                    // tr.appendChild('<td><input type = "radio"  class = "rb" name="group" value = ""> </td>');
                    var button = document.createElement("input");
                    button.type = "radio";
                    button.setAttribute("class", "rb");
                    button.id = "rbtn";
                    button.name = "group";
                    button.value = "";

                    button.onclick = function(event) {
                        //alert("xcvbn");
                        //debugger;
                        deptHidden.value = event.currentTarget.parentNode.parentElement.childNodes[4].innerText;
                        DeptNameHidden.value = event.currentTarget.parentNode.parentElement.childNodes[5].innerText;
                        cbidHidden.value = event.currentTarget.parentNode.parentElement.childNodes[6].innerText;
                        classificationHidden.value = event.currentTarget.parentNode.parentElement.childNodes[7].innerText;
                        RangeHidden.value = event.currentTarget.parentNode.parentElement.childNodes[8].innerText;
                        EmpIdHidden.value = event.currentTarget.parentNode.parentElement.childNodes[1].innerText;
                        empRCDHidden.value = event.currentTarget.parentNode.parentElement.childNodes[9].innerText;

                    };

                    var tabCell1 = tr.insertCell(-1);
                    tabCell1.appendChild(button);
                    for (var l = 0; l < col.length; l++) {
                        var tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = myresopnse[k][col[l]];
                    }
                }
                var divContainer = document.getElementById("showData");
                divContainer.innerHTML = "";
                divContainer.appendChild(table);
                var cancelButton = document.createElement("input");
                cancelButton.type = "button";
                cancelButton.setAttribute("class", "cancelBtn");
                cancelButton.id = "cBtn";
                cancelButton.value = "Cancel";
                cancelButton.onclick = function(event) {
                    modal.style.display = "none";
                };
                var footerModal = document.getElementById("modal_footer");
                footerModal.appendChild(cancelButton);
                //if(table.rows[1].cells[0].childNodes[0].checked){alert("hi");}else{alert("hello");}
                var okButton = document.createElement("input");
                okButton.type = "button";
                okButton.setAttribute("class", "okBtn");
                //okButton.id = "okBtn";
                okButton.value = "OK";
                okButton.onclick = function(event) {
                    /*if (cbidHidden.value === null) {
                        alert("Please select any one of the Staff");
                        modal.style.display = "block";
                    }*/
                    var n;
                    var rButtonStatus;
                    //var rButtonStatusFalse;
                    var rButtons = document.getElementsByClassName("rb");
                    for (n = 0; n < rButtons.length; n++) {
                        if (rButtons[n].checked === false) {
                            rButtonStatus = false;
                        } else {
                            rButtonStatus = true;
                            break;
                        }
                    }
                    if (rButtonStatus === false) {
                        alert("Please select the department");
                        modal.style.display = "block";
                    } else {
                        //EvaluatorsName.value=evalNameHidden.value;
                        //EvaluatorsTitle.value=evalTitleHidden.value;
                        FirstName.value = fnameHidden.value;
                        LastName.value = lnameHidden.value;
                        DepartmentID.value = deptHidden.value;
                        DepartmentName.value = DeptNameHidden.value;
                        CBID.value = cbidHidden.value;
                        Classification.value = classificationHidden.value;
                        Range.value = RangeHidden.value;
                        EmpId.value = EmpIdHidden.value;
                        EmpRCD.value = empRCDHidden.value;
                        modal.style.display = "none";
                    }
                };
                var footerModal = document.getElementById("modal_footer");

                footerModal.appendChild(okButton);
            } else {
                alert("invalid");
            }
            ////////////////////////////////////////////
            span.onclick = function() {

                var n;
                var rButtonStatus;
                //var rButtonStatusFalse;
                var rButtons = document.getElementsByClassName("rb");
                for (n = 0; n < rButtons.length; n++) {
                    if (rButtons[n].checked === false) {
                        rButtonStatus = false;
                    } else {
                        rButtonStatus = true;
                        break;
                    }
                }
                if (rButtonStatus === false) {
                    alert("Please select the department");
                    modal.style.display = "block";
                } else {
                    modal.style.display = "none";
                }

            };
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        }
    });
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null && formSavedStatus.value === null){
 
  $.ajax({
type: 'GET', 
url:"/bin/getEvaluationFormData",
data: {action: "EMP_DETAILS"},
dataType: 'json',
 
success: function(myresopnse){

  
  if(myresopnse.length !== 0){
    for(i=0;i<myresopnse.length;i++){
      if(myresopnse[i].UNION_CD == ("M80" || "M98")){
        CBIDFlag.value = myresopnse[i].UNION_CD;
        break;
    }
    
  }
}
}
    });
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_guideRootPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_guideRootPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  showErrorModal("Alert!", "Please make sure to save your work every 20-30 minutes and complete all the required fields.");
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_guideRootPanel_init4
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_guideRootPanel_init4 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToEmployeeAck"){
   showTextErrorModal(); 
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_generateDOR1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_generateDOR1_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToManager" || StageIndicator.value == "ToManagerAcknowledge" || StageIndicator.value == "ToManagerFinalAcknowledge" || StageIndicator.value == "ToManagerHRDI" || StageIndicator.value == "ToManagerAcknowledgeOnExpire" || StageIndicator.value == "ToEmployee" || StageIndicator.value == "ToEmployeeAck" || StageIndicator.value == "ToEmployeeAckOnExpire" || StageIndicator.value == "ToHRDI" || StageIndicator.value == "ToHRCoo" || StageIndicator.value == "ToAdmin"){
  this.visible = true;

}
else{  
  this.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_generateDOR1_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_generateDOR1_click0 = function (scope) {
    with(this) {
        with(scope) {
            /*if(EmpID.value !== null && EvaluationType.value !== null && Quality.value !== null && Quantity.value !== null && ProfessionalJudgement.value !== null && ContributionCampus.value !== null && OverallRating.value !== null && RatingPeriodFrom.value !== null && RatingPeriodTo.value !== null){*/
 
    generatePDFStep.value = "Draft";
    getPdf();

    
/*}else{
  
  showErrorModal("Alert!","Please fill all the required fields");
   
  
}*/
function getPdf() {
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/staff-performance-evaluation-unit-4/staff-performance-evaluation-unit-4');
            jsonData.append('fileName', FirstName.value + "_" + LastName.value + "(" + EmpID.value + ")" + "_" + Date.now());          
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
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_CopyRB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_CopyRB_init0 = function (scope) {
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
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_CopyRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_CopyRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
 
   if(CopyRB.value == "1"){
     copyDataPanel.visible = true;
   }else{
     copyDataPanel.visible = false;
      if(EmpID.value !== null){
    showConfirmPopup("Alert!","Please beware that selecting No will clear all the data entered in the form. If this is not an error, please proceed.");       
  } 
   }
   }

function showConfirmPopup(errorHeading, errorMsg) {   
    var modal = document.getElementById("confirmPopup");

    var modalHeaderMsg = document.getElementById("confirmText");
    modalHeaderMsg.innerHTML = "";
    modalHeaderMsg.innerHTML = errorHeading;
    //Body
    var para = document.getElementById("confirmPara");
    para.innerHTML = "";
    para.innerHTML = errorMsg;
    var footerModal = document.getElementById("submitErrorPopup-footer");
    footerModal.innerHTML = "";
    var yesButton = document.createElement("input");
    yesButton.type = "button";
    yesButton.id = "yesBtn";
    yesButton.style.cssFloat = "right";
    yesButton.style.marginRight = "4px";
    yesButton.style.width = "70px";
    yesButton.value = "Confirm";
    yesButton.onclick = function(event) {
        modal.style.display = "none";
      copyDataPanel.visible = false;
     EmpID.value = null;
      EmpIdFlag.value = null;
      FirstName.value = null;
                LastName.value = null;
              
                DepartmentID.value = null;
                DepartmentName.value = null;
                CBID.value = null;
                Classification.value = null;
                Range.value = null;
                EmpRCD.value = null;
				EmpUserID.value = null;
                AdminUserID.value = null;
                empEmailId.value = null;
                AdminEmailID.value = null;
                        Quality.value = null;
                        Quantity.value = null;
                        ProfessionalJudgement.value = null;
                        ContributionCampus.value = null;
                       
                        JobStrengthComment.value = null;
                        SectiotnBComment.value = null;
                      	SectionCProgressComment.value = null;
                      	SectionDImprovementComment.value = null;
                      	SectionEImprovementComment.value = null;
                      	ProbEmployee.value = null;
                        
                        OverallRating.value = null;
                        BasedOnObservation.value = null;
                      	BasedOnObservation1.value = null;
     
    };
    footerModal.appendChild(yesButton);
    var noButton = document.createElement("input");
    noButton.type = "button";
    noButton.id = "noBtn";
    noButton.style.cssFloat = "right";
    noButton.style.marginRight = "10px";
    noButton.style.width = "70px";
    noButton.value = "No";
    noButton.onclick = function(event) {
        modal.style.display = "none";
      CopyRB.value  = "1";
    };
    footerModal.appendChild(noButton);
    modal.style.display = "block";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_copyDataPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_copyDataPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  if(CopyRB.value == "2" || CopyRB.value  === null){
this.visible = false;
  }else{
    this.visible = true;
  }
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Copy_EvalType_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Copy_EvalType_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Copy_ReviewPeriodFrom_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Copy_ReviewPeriodFrom_init0 = function (scope) {
    with(this) {
        with(scope) {
            /* Add your own JavaScript here. */
var dateValue = this.value;
//alert(dateValue);
if(dateValue === null){
var today = new Date();
//alert(today);
var curyear = today.getFullYear();
var curyearMonth = today.getMonth() + 1;
var curyearDay = today.getDate();
var lastYear = curyear - 2;
//var d = new Date(lastYear, 3, 16);
var d = (lastYear+"-"+"07"+"-"+"01");
  //alert(d);
this.value = d;
}else{
this.value = dateValue;
}
//this.visible = false;

        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Copy_ReviewPeriodTo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Copy_ReviewPeriodTo_init0 = function (scope) {
    with(this) {
        with(scope) {
            
var dateValue = this.value;
if(dateValue === null){
var today = new Date();
var curyear = today.getFullYear();
var curyearMonth = today.getMonth() + 1;
var curyearDay = today.getDate();
var lastYear = curyear - 1;
//var d = new Date(curyear, 3, 15);
var d = (lastYear+"-"+"06"+"-"+"30");
this.value = d;
}else{
this.value = dateValue;
}
//this.visible = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Copy_button_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Copy_button_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null && CopyRB.value == "1"){
  Copy_EmpId.mandatory = "error";
  Copy_EvalType.mandatory = "error";

Copy_ReviewPeriodFrom.mandatory = "error";
Copy_ReviewPeriodTo.mandatory = "error";
}else{
   Copy_EmpId.mandatory = "";
  Copy_EvalType.mandatory = "";

Copy_ReviewPeriodFrom.mandatory = "";
Copy_ReviewPeriodTo.mandatory = "";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Copy_button_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Copy_button_click1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
 
   var userID = logUser.value;
		workflow_initiator.value = userID;
   // if (Copy_EmpId.value !== null && Copy_EvalType.value !== null && Copy_ReviewPeriodFrom.value !== null && Copy_ReviewPeriodTo.value !== null) {
       if (Copy_EmpId.value !== null) {
        if ((CBIDFlag.value !== null) && (CBIDFlag.value == ("M80" || "M98"))) {
            var gifModal = document.getElementById('gifModal');
            gifModal.style.display = "block";
          
            var cwid = Copy_EmpId.value;
            var evalType = Copy_EvalType.value;
            var reviewPeriodFrom = Copy_ReviewPeriodFrom.value;
            var reviewPeriodTo = Copy_ReviewPeriodTo.value;
            var actionType = "SPE_UNIT4_COPY_DATA";
            $.ajax({
                type: 'GET',
                url: "/bin/getEvaluationFormData",
                data: {
                    cwid: cwid,
                    reviewPeriodFrom: reviewPeriodFrom,
                    reviewPeriodTo: reviewPeriodTo,
                    /*evalType: evalType,*/
                    action: actionType
                },
                dataType: 'json',
                success: function(myresponse) {

                    var modal = document.getElementById('myModal');
                    var span = document.getElementsByClassName("close")[0];

                    if (myresponse.length === 1) {
                        EmpIdFlag.value = Copy_EmpId.value;
                        EvaluationType.value = myresponse[0].EVALUATION_TYPE;
                        EmpID.value = myresponse[0].EMPL_ID;
                        Quality.value = myresponse[0].QUALITY;
                        Quantity.value = myresponse[0].QUANTITY;
                        ProfessionalJudgement.value = myresponse[0].PROFESSIONAL_JUDGEMENT;
                        ContributionCampus.value = myresponse[0].CONTRIBUTION_CAMPUS;
                       
                        JobStrengthComment.value = myresponse[0].JOB_STRENGTH_COMMENT;
                        SectiotnBComment.value = myresponse[0].COMMENTS;
                      	SectionCProgressComment.value = myresponse[0].PROGRESS_COMMENTS;
                      	SectionDImprovementComment.value = myresponse[0].IMPROVEMENTS_COMMENT;
                      	SectionEImprovementComment.value = myresponse[0].GOALS_PROGRAMS_COMMENT;
                      	ProbEmployee.value = myresponse[0].PROB_EMP_RB;
                        
                        OverallRating.value = myresponse[0].OVERALL_RATING;
                        BasedOnObservation.value = myresponse[0].BASED_ON_OBSERVATION;
                      	BasedOnObservation1.value = myresponse[0].BASED_ON_OBSERVATION1;
						getEmpEmail(EmpID.value,logUser.value);
                        modal.style.display = "none";
                        gifModal.style.display = "none";
                        modal.style.display = "none";

                    } else if (myresponse.length > 1) {
                        generateDOR.visible = true;
                        gifModal.style.display = "none";
                        modal.style.display = "block";
                        //populate Hidden Fields

                        var col = [];
                        col.push("EMPL_ID");
                        //col.push("LASTNAME");
                        //col.push("FIRSTNAME");
                        col.push("DEPARTMENT_ID");
                        col.push("DEPARTMENT_NAME");
                        col.push("RATE_PERIOD_FROM");
                        col.push("RATE_PERIOD_TO");
                        col.push("EVALUATION_TYPE");

                        var table = document.createElement("table");
                        table.id = "tb";
                        var tr = table.insertRow(-1);
                        // var headings = ["", "Emp ID", "Last Name", "First Name", "Department Id", "Department Name"];
                        var headings = ["", "Emp ID", "Dept Id", "Dept Name", "Review Period From", "Review Period To", "Evaluation Type"];
                        for (var j = 0; j < headings.length; j++) {
                            var th = document.createElement("th");
                            th.innerHTML = headings[j];
                            tr.appendChild(th);
                        }
                        for (var k = 0; k < myresponse.length; k++) {
                            tr = table.insertRow(-1);
                            // tr.appendChild('<td><input type = "radio"  class = "rb" name="group" value = ""> </td>');
                            var button = document.createElement("input");
                            button.type = "radio";
                            button.setAttribute("class", "rb");
                            button.id = "rbtn";
                            button.name = "group";
                            button.value = "";

                            var tabCell1 = tr.insertCell(-1);
                            tabCell1.appendChild(button);
                            for (var l = 0; l < col.length; l++) {
                                var tabCell = tr.insertCell(-1);                                
                              if((myresponse[k][col[l]]).match(/ 00:00:00.0/g)){
                                var dt = myresponse[k][col[l]].replace(" 00:00:00.0", "");
                                tabCell.innerHTML = dt.substring(5, 7)+"-"+dt.substring(8, 10)+"-"+dt.substring(0, 4);                                
                              }else{
                                tabCell.innerHTML = myresponse[k][col[l]];
                              }
                            }
                        }
                        var divContainer = document.getElementById("showData");
                        divContainer.innerHTML = "";
                        divContainer.appendChild(table);

                        var footerModal = document.getElementById("modal_footer");

                        var okButton = document.createElement("input");
                        okButton.type = "button";
                        okButton.setAttribute("class", "okBtn");
                        //okButton.id = "okBtn";
                        okButton.value = "OK";
                        okButton.onclick = function(event) {

                            var n;
                            var rButtonStatus;
                            //var rButtonStatusFalse;
                            var rButtons = document.getElementsByClassName("rb");
                            for (n = 0; n < rButtons.length; n++) {
                                if (rButtons[n].checked === false) {
                                    rButtonStatus = false;
                                } else {
                                   EmpIdFlag.value = Copy_EmpId.value;
                                   EmpID.value = myresponse[n].EMPL_ID;
                                  EvaluationType.value = myresponse[n].EVALUATION_TYPE;
                        Quality.value = myresponse[n].QUALITY;
                        Quantity.value = myresponse[n].QUANTITY;
                        ProfessionalJudgement.value = myresponse[n].PROFESSIONAL_JUDGEMENT;
                        ContributionCampus.value = myresponse[n].CONTRIBUTION_CAMPUS;
                       
                        JobStrengthComment.value = myresponse[n].JOB_STRENGTH_COMMENT;
                        SectiotnBComment.value = myresponse[n].COMMENTS;
                      	SectionCProgressComment.value = myresponse[n].PROGRESS_COMMENTS;
                      	SectionDImprovementComment.value = myresponse[n].IMPROVEMENTS_COMMENT;
                      	SectionEImprovementComment.value = myresponse[n].GOALS_PROGRAMS_COMMENT;
                      	ProbEmployee.value = myresponse[n].PROB_EMP_RB;
                        
                        OverallRating.value = myresponse[n].OVERALL_RATING;
                        BasedOnObservation.value = myresponse[n].BASED_ON_OBSERVATION;
                      	BasedOnObservation1.value = myresponse[n].BASED_ON_OBSERVATION1;
                                    getEmpEmail(EmpID.value,logUser.value);
                                    rButtonStatus = true;
                                    break;
                                }
                            }
                            if (rButtonStatus === false) {
                                //alert("Please select the department");
                                showErrorModal("Alert!", "Please select the department");
                                //getPopup(text4);
                                modal.style.display = "block";
                            } else {
                                modal.style.display = "none";

                            }
                        };
                        // footerModal = document.getElementById("modal_footer");
                        footerModal.appendChild(okButton);
                        // document.getElementById('cBtn').parentNode.removeChild(document.getElementById('cBtn'));
                    } else {
                        showErrorModal("Alert!", "No matching records found");
                        EmpID.value = null;
                      FirstName.value = null;
                LastName.value = null;
              EmpIdFlag.value = null;
                DepartmentID.value = null;
                DepartmentName.value = null;
                CBID.value = null;
                Classification.value = null;
                Range.value = null;
                EmpRCD.value = null;
				EmpUserID.value = null;
                AdminUserID.value = null;
                empEmailId.value = null;
                AdminEmailID.value = null;
                        EmpIdFlag.value = null;
                        Quality.value = null;
                        Quantity.value = null;
                        ProfessionalJudgement.value = null;
                        ContributionCampus.value = null;
                       
                        JobStrengthComment.value = null;
                        SectiotnBComment.value = null;
                      	SectionCProgressComment.value = null;
                      	SectionDImprovementComment.value = null;
                      	SectionEImprovementComment.value = null;
                      	ProbEmployee.value = null;
                        
                        OverallRating.value = null;
                        BasedOnObservation.value = null;
                      	BasedOnObservation1.value = null;
                        gifModal.style.display = "none";
                    }
                    ////////////////////////////////////////////
                    
                }

            });
        }
        else {
        showErrorModal("Alert!", "No matching records found");
    }
    } else {
        showErrorModal("Alert!", "Please enter Employee ID to copy values");
    }
}

function getEmpEmail(cwid,userId){
  $.ajax({
                        type: 'GET',
                        url: "/bin/getEvaluationFormData",
            data: {
                cwid: cwid,
                userID: userId,
                action:"SPE_UNIT4_EMP_DETAILS"
            },
                        dataType: 'json',
                        success: function(response) { 
                          
                            if (response.length != "0") {
                                FirstName.value = response[0].FIRST_NAME;
                              StaffFirstName.value = response[0].FIRST_NAME;
                              StaffLastName.value = response[0].LAST_NAME;
                              Department.value = response[0].DEPTNAME;
                            LastName.value = response[0].LAST_NAME;
                            CBID.value = response[0].UNION_CD;
                            DepartmentID.value = response[0].DEPTID;
                            DepartmentName.value = response[0].DEPTNAME;
                            EmpRCD.value = response[0].EMPL_RCD;
                            Classification.value = response[0].DESCR;
                            Range.value = response[0].GRADE;
                            EvaluatorName.value = response[0].SupervisorName;
                            evalTitleHidden.value = response[0].SupervisorTitle;
                            
                            EmpUserID.value = response[0].EMPUSERID;
                            empEmailId.value = response[0].EMAILID;
                            division.value = response[0].DIVSION;
                            divisionName.value = response[0].DIVISION_NAME;
							empName.value = (FirstName.value)+" "+LastName.value;
                          EmpName.value = response[0].FIRST_NAME+" "+response[0].LAST_NAME;
                        }else if(response.length > 1){
                           col.push("EMPLID");
                                col.push("LAST_NAME");
                                col.push("FIRST_NAME");
                                col.push("DEPTID");
                                col.push("DEPTNAME");
                              col.push("UNION_CD");
                                col.push("EMPL_RCD");
                                col.push("SupervisorName");


                                var table = document.createElement("table");
                                table.id = "tb";
                                var tr = table.insertRow(-1);
                                var headings = ["", "Emp ID", "Last Name", "First Name", "Department Id", "Department Name","CBID","Empl RCD","Supervisor Name"];
                                for (var j = 0; j < headings.length; j++) {
                                    var th = document.createElement("th");
                                    th.innerHTML = headings[j];
                                    tr.appendChild(th);
                                }
                                for (var k = 0; k < response.length; k++) {
                                    tr = table.insertRow(-1);
                                    // tr.appendChild('<td><input type = "radio"  class = "rb" name="group" value = ""> </td>');
                                    var button = document.createElement("input");
                                    button.type = "radio";
                                    button.setAttribute("class", "rb");
                                    button.id = "rbtn";
                                    button.name = "group";
                                    button.value = "";                                  
                                    var tabCell1 = tr.insertCell(-1);
                                    tabCell1.appendChild(button);
                                    for (var l = 0; l < col.length; l++) {
                                        var tabCell = tr.insertCell(-1);
                                        tabCell.innerHTML = response[k][col[l]];
                                    }
                                }
                                var divContainer = document.getElementById("showData");
                                divContainer.innerHTML = "";
                                divContainer.appendChild(table);

                                var footerModal = document.getElementById("modal_footer");

                                var okButton = document.createElement("input");
                                okButton.type = "button";
                                okButton.setAttribute("class", "okBtn");

                                okButton.value = "OK";
                                okButton.onclick = function(event) {

                                    var n;
                                    var rButtonStatus;

                                    var rButtons = document.getElementsByClassName("rb");
                                    for (n = 0; n < rButtons.length; n++) {
                                        if (rButtons[n].checked === false) {
                                            rButtonStatus = false;
                                        } else {
                                           FirstName.value = response[n].FIRST_NAME;
                            LastName.value = response[n].LAST_NAME;
                            CBID.value = response[n].UNION_CD;
                            DepartmentID.value = response[n].DEPTID;
                                          StaffFirstName.value = response[n].FIRST_NAME;
                              StaffLastName.value = response[n].LAST_NAME;
                              Department.value = response[n].DEPTNAME;
                            DepartmentName.value = response[n].DEPTNAME;
                            EmpRCD.value = response[n].EMPL_RCD;
                            Classification.value = response[n].DESCR;
                            Range.value = response[n].GRADE;
                            EvaluatorName.value = response[n].SupervisorName;
                            evalTitleHidden.value = response[n].SupervisorTitle;
                            
                            EmpUserID.value = response[n].EMPUSERID;
                            empEmailId.value = response[n].EMAILID;
                            division.value = response[n].DIVSION;
                            divisionName.value = response[n].DIVISION_NAME;
							empName.value = (FirstName.value)+" "+LastName.value;
                          EmpName.value = response[n].FIRST_NAME+" "+response[n].LAST_NAME;
                                            rButtonStatus = true;
                                            break;
                                        }
                                    }
                                    if (rButtonStatus === false) {
                                        showErrorModal("Alert!", "Please select the department");
                                        modal.style.display = "block";
                                    } else { 
                                        modal.style.display = "none";

                                    }
                                };
                                footerModal.appendChild(okButton);
                        }
                        }
                    });
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Copy_button_click2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Copy_button_click2 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
 
   var userID = logUser.value;
		workflow_initiator.value = userID;
   // if (Copy_EmpId.value !== null && Copy_EvalType.value !== null && Copy_ReviewPeriodFrom.value !== null && Copy_ReviewPeriodTo.value !== null) {
       if (Copy_EmpId.value !== null) {
        if ((CBIDFlag.value !== null) && (CBIDFlag.value == ("M80" || "M98"))) {
            var gifModal = document.getElementById('gifModal');
            gifModal.style.display = "block";
          
            var CHRSID = Copy_EmpId.value;
           // var CHRSID = chrsId.value;
            var evalType = Copy_EvalType.value;
            var reviewPeriodFrom = Copy_ReviewPeriodFrom.value;
            var reviewPeriodTo = Copy_ReviewPeriodTo.value;
            var actionType = "SPE_UNIT4_COPY_DATA";
            $.ajax({
                type: 'GET',
                url: "/bin/getEvaluationFormDataCHRSID",
                data: {
                    chrsId: CHRSID,
                    reviewPeriodFrom: reviewPeriodFrom,
                    reviewPeriodTo: reviewPeriodTo,
                    /*evalType: evalType,*/
                    action: actionType
                },
                dataType: 'json',
                success: function(myresponse) {

                    var modal = document.getElementById('myModal');
                    var span = document.getElementsByClassName("close")[0];

                    if (myresponse.length === 1) {
                        EmpIdFlag.value = Copy_EmpId.value;
                        EvaluationType.value = myresponse[0].EVALUATION_TYPE;
                        EmpID.value = myresponse[0].EMPL_ID;
                       chrsId.value = Copy_EmpId.value;
                        Quality.value = myresponse[0].QUALITY;
                        Quantity.value = myresponse[0].QUANTITY;
                        ProfessionalJudgement.value = myresponse[0].PROFESSIONAL_JUDGEMENT;
                        ContributionCampus.value = myresponse[0].CONTRIBUTION_CAMPUS;
                       
                        JobStrengthComment.value = myresponse[0].JOB_STRENGTH_COMMENT;
                        SectiotnBComment.value = myresponse[0].COMMENTS;
                      	SectionCProgressComment.value = myresponse[0].PROGRESS_COMMENTS;
                      	SectionDImprovementComment.value = myresponse[0].IMPROVEMENTS_COMMENT;
                      	SectionEImprovementComment.value = myresponse[0].GOALS_PROGRAMS_COMMENT;
                      	ProbEmployee.value = myresponse[0].PROB_EMP_RB;
                        
                        OverallRating.value = myresponse[0].OVERALL_RATING;
                        BasedOnObservation.value = myresponse[0].BASED_ON_OBSERVATION;
                      	BasedOnObservation1.value = myresponse[0].BASED_ON_OBSERVATION1;
						getEmpEmail(EmpID.value,logUser.value);
                        modal.style.display = "none";
                        gifModal.style.display = "none";
                        modal.style.display = "none";

                    } else if (myresponse.length > 1) {
                        generateDOR.visible = true;
                        gifModal.style.display = "none";
                        modal.style.display = "block";
                        //populate Hidden Fields

                        var col = [];
                       // col.push("EMPL_ID");
                        //col.push("LASTNAME");
                        //col.push("FIRSTNAME");
                        col.push("DEPARTMENT_ID");
                        col.push("DEPARTMENT_NAME");
                        col.push("RATE_PERIOD_FROM");
                        col.push("RATE_PERIOD_TO");
                        col.push("EVALUATION_TYPE");

                        var table = document.createElement("table");
                        table.id = "tb";
                        var tr = table.insertRow(-1);
                        // var headings = ["", "Emp ID", "Last Name", "First Name", "Department Id", "Department Name"];
                        var headings = ["", "Emp ID", "Dept Id", "Dept Name", "Review Period From", "Review Period To", "Evaluation Type"];
                        for (var j = 0; j < headings.length; j++) {
                            var th = document.createElement("th");
                            th.innerHTML = headings[j];
                            tr.appendChild(th);
                        }
                        for (var k = 0; k < myresponse.length; k++) {
                            tr = table.insertRow(-1);
                            // tr.appendChild('<td><input type = "radio"  class = "rb" name="group" value = ""> </td>');
                            var button = document.createElement("input");
                            button.type = "radio";
                            button.setAttribute("class", "rb");
                            button.id = "rbtn";
                            button.name = "group";
                            button.value = "";

                            var tabCell1 = tr.insertCell(-1);
                            tabCell1.appendChild(button);
                          var tabCell2 = tr.insertCell(-1);
                         
                           tabCell2.innerHTML = Copy_EmpId.value;
                            for (var l = 0; l < col.length; l++) {
                                var tabCell = tr.insertCell(-1);                                
                              if((myresponse[k][col[l]]).match(/ 00:00:00.0/g)){
                                var dt = myresponse[k][col[l]].replace(" 00:00:00.0", "");
                                tabCell.innerHTML = dt.substring(5, 7)+"-"+dt.substring(8, 10)+"-"+dt.substring(0, 4);                                
                              }else{
                                tabCell.innerHTML = myresponse[k][col[l]];
                              }
                            }
                        }
                        var divContainer = document.getElementById("showData");
                        divContainer.innerHTML = "";
                        divContainer.appendChild(table);

                        var footerModal = document.getElementById("modal_footer");

                        var okButton = document.createElement("input");
                        okButton.type = "button";
                        okButton.setAttribute("class", "okBtn");
                        //okButton.id = "okBtn";
                        okButton.value = "OK";
                        okButton.onclick = function(event) {

                            var n;
                            var rButtonStatus;
                            //var rButtonStatusFalse;
                            var rButtons = document.getElementsByClassName("rb");
                            for (n = 0; n < rButtons.length; n++) {
                                if (rButtons[n].checked === false) {
                                    rButtonStatus = false;
                                } else {
                                   EmpIdFlag.value = Copy_EmpId.value;
                                   EmpID.value = myresponse[n].EMPL_ID;
                                  chrsId.value = Copy_EmpId.value;
                                  EvaluationType.value = myresponse[n].EVALUATION_TYPE;
                        Quality.value = myresponse[n].QUALITY;
                        Quantity.value = myresponse[n].QUANTITY;
                        ProfessionalJudgement.value = myresponse[n].PROFESSIONAL_JUDGEMENT;
                        ContributionCampus.value = myresponse[n].CONTRIBUTION_CAMPUS;
                       
                        JobStrengthComment.value = myresponse[n].JOB_STRENGTH_COMMENT;
                        SectiotnBComment.value = myresponse[n].COMMENTS;
                      	SectionCProgressComment.value = myresponse[n].PROGRESS_COMMENTS;
                      	SectionDImprovementComment.value = myresponse[n].IMPROVEMENTS_COMMENT;
                      	SectionEImprovementComment.value = myresponse[n].GOALS_PROGRAMS_COMMENT;
                      	ProbEmployee.value = myresponse[n].PROB_EMP_RB;
                        
                        OverallRating.value = myresponse[n].OVERALL_RATING;
                        BasedOnObservation.value = myresponse[n].BASED_ON_OBSERVATION;
                      	BasedOnObservation1.value = myresponse[n].BASED_ON_OBSERVATION1;
                                    getEmpEmail(EmpID.value,logUser.value);
                                    rButtonStatus = true;
                                    break;
                                }
                            }
                            if (rButtonStatus === false) {
                                //alert("Please select the department");
                                showErrorModal("Alert!", "Please select the department");
                                //getPopup(text4);
                                modal.style.display = "block";
                            } else {
                                modal.style.display = "none";

                            }
                        };
                        // footerModal = document.getElementById("modal_footer");
                        footerModal.appendChild(okButton);
                        // document.getElementById('cBtn').parentNode.removeChild(document.getElementById('cBtn'));
                    } else {
                        showErrorModal("Alert!", "No matching records found");
                        EmpID.value = null;
                     
                      FirstName.value = null;
                LastName.value = null;
              EmpIdFlag.value = null;
                DepartmentID.value = null;
                DepartmentName.value = null;
                CBID.value = null;
                Classification.value = null;
                Range.value = null;
                EmpRCD.value = null;
				EmpUserID.value = null;
                AdminUserID.value = null;
                empEmailId.value = null;
                AdminEmailID.value = null;
                        EmpIdFlag.value = null;
                        Quality.value = null;
                        Quantity.value = null;
                        ProfessionalJudgement.value = null;
                        ContributionCampus.value = null;
                       
                        JobStrengthComment.value = null;
                        SectiotnBComment.value = null;
                      	SectionCProgressComment.value = null;
                      	SectionDImprovementComment.value = null;
                      	SectionEImprovementComment.value = null;
                      	ProbEmployee.value = null;
                        
                        OverallRating.value = null;
                        BasedOnObservation.value = null;
                      	BasedOnObservation1.value = null;
                        gifModal.style.display = "none";
                    }
                    ////////////////////////////////////////////
                    
                }

            });
        }
        else {
        showErrorModal("Alert!", "No matching records found");
    }
    } else {
        showErrorModal("Alert!", "Please enter Employee ID to copy values");
    }
}

function getEmpEmail(cwid,userId){
  $.ajax({
                        type: 'GET',
                        url: "/bin/getEvaluationFormData",
            data: {
                cwid: cwid,
                userID: userId,
                action:"SPE_UNIT4_EMP_DETAILS"
            },
                        dataType: 'json',
                        success: function(response) { 
                          
                            if (response.length != "0") {
                                FirstName.value = response[0].FIRST_NAME;
                              StaffFirstName.value = response[0].FIRST_NAME;
                              StaffLastName.value = response[0].LAST_NAME;
                              Department.value = response[0].DEPTNAME;
                            LastName.value = response[0].LAST_NAME;
                            CBID.value = response[0].UNION_CD;
                            DepartmentID.value = response[0].DEPTID;
                            DepartmentName.value = response[0].DEPTNAME;
                            EmpRCD.value = response[0].EMPL_RCD;
                            Classification.value = response[0].DESCR;
                            Range.value = response[0].GRADE;
                            EvaluatorName.value = response[0].SupervisorName;
                            evalTitleHidden.value = response[0].SupervisorTitle;
                            
                            EmpUserID.value = response[0].EMPUSERID;
                            empEmailId.value = response[0].EMAILID;  
                           //empEmailId.value = "soumya.ravindra@thoughtfocus.com";
                            //empEmailId.value = "jaharmon@fullerton.edu";
                            division.value = response[0].DIVSION;
                            divisionName.value = response[0].DIVISION_NAME;
							empName.value = (FirstName.value)+" "+LastName.value;
                          EmpName.value = response[0].FIRST_NAME+" "+response[0].LAST_NAME;
                        }else if(response.length > 1){
                           col.push("EMPLID");
                                col.push("LAST_NAME");
                                col.push("FIRST_NAME");
                                col.push("DEPTID");
                                col.push("DEPTNAME");
                              col.push("UNION_CD");
                                col.push("EMPL_RCD");
                                col.push("SupervisorName");


                                var table = document.createElement("table");
                                table.id = "tb";
                                var tr = table.insertRow(-1);
                                var headings = ["", "Emp ID", "Last Name", "First Name", "Department Id", "Department Name","CBID","Empl RCD","Supervisor Name"];
                                for (var j = 0; j < headings.length; j++) {
                                    var th = document.createElement("th");
                                    th.innerHTML = headings[j];
                                    tr.appendChild(th);
                                }
                                for (var k = 0; k < response.length; k++) {
                                    tr = table.insertRow(-1);
                                    // tr.appendChild('<td><input type = "radio"  class = "rb" name="group" value = ""> </td>');
                                    var button = document.createElement("input");
                                    button.type = "radio";
                                    button.setAttribute("class", "rb");
                                    button.id = "rbtn";
                                    button.name = "group";
                                    button.value = "";                                  
                                    var tabCell1 = tr.insertCell(-1);
                                    tabCell1.appendChild(button);
                                    for (var l = 0; l < col.length; l++) {
                                        var tabCell = tr.insertCell(-1);
                                        tabCell.innerHTML = response[k][col[l]];
                                    }
                                }
                                var divContainer = document.getElementById("showData");
                                divContainer.innerHTML = "";
                                divContainer.appendChild(table);

                                var footerModal = document.getElementById("modal_footer");

                                var okButton = document.createElement("input");
                                okButton.type = "button";
                                okButton.setAttribute("class", "okBtn");

                                okButton.value = "OK";
                                okButton.onclick = function(event) {

                                    var n;
                                    var rButtonStatus;

                                    var rButtons = document.getElementsByClassName("rb");
                                    for (n = 0; n < rButtons.length; n++) {
                                        if (rButtons[n].checked === false) {
                                            rButtonStatus = false;
                                        } else {
                                           FirstName.value = response[n].FIRST_NAME;
                            LastName.value = response[n].LAST_NAME;
                            CBID.value = response[n].UNION_CD;
                            DepartmentID.value = response[n].DEPTID;
                                          StaffFirstName.value = response[n].FIRST_NAME;
                              StaffLastName.value = response[n].LAST_NAME;
                              Department.value = response[n].DEPTNAME;
                            DepartmentName.value = response[n].DEPTNAME;
                            EmpRCD.value = response[n].EMPL_RCD;
                            Classification.value = response[n].DESCR;
                            Range.value = response[n].GRADE;
                            EvaluatorName.value = response[n].SupervisorName;
                            evalTitleHidden.value = response[n].SupervisorTitle;
                            
                            EmpUserID.value = response[n].EMPUSERID;
                            empEmailId.value = response[n].EMAILID;
                            //empEmailId.value = "soumya.ravindra@thoughtfocus.com";
                                    //      empEmailId.value = "jaharmon@fullerton.edu";
                            division.value = response[n].DIVSION;
                            divisionName.value = response[n].DIVISION_NAME;
							empName.value = (FirstName.value)+" "+LastName.value;
                          EmpName.value = response[n].FIRST_NAME+" "+response[n].LAST_NAME;
                                            rButtonStatus = true;
                                            break;
                                        }
                                    }
                                    if (rButtonStatus === false) {
                                        showErrorModal("Alert!", "Please select the department");
                                        modal.style.display = "block";
                                    } else { 
                                        modal.style.display = "none";

                                    }
                                };
                                footerModal.appendChild(okButton);
                        }
                        }
                    });
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_chrsId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_chrsId_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null && this.value === null) {

  this.mandatory=true;

}
if (StageIndicator.value !== null) {
  this.enabled = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_chrsId_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_chrsId_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
Copy_EmpId.value = null;
Copy_EvalType.value = null;

$.ajax({

    type: 'GET',

    url: "/bin/getLoggedUserId",
    dataType: 'json',
    success: function(res) {

        var userValue = res.userId;
      logUser.value  =userValue;		
        if (FormSubmittedStatus.value === null && StageIndicator.value === null &&  EmpIdFlag.value != chrsId.value && (chrsId.value != Copy_EmpId.value)) {
          workflow_initiator.value = userValue;
            var cwidValue = chrsId.value;
            var pattern = /^1\d{8}$/;
            var result = pattern.test(cwidValue);
            if (result !== true) {
                evalNameHidden.value = null;
				
                EmpID.value = null;
                FirstName.value = null;
                LastName.value = null;
              
                DepartmentID.value = null;
                DepartmentName.value = null;
                CBID.value = null;
                Classification.value = null;
                Range.value = null;

                EmpRCD.value = null;

                deptHidden.value = null;
                DeptNameHidden.value = null;
                cbidHidden.value = null;
                classificationHidden.value = null;
                RangeHidden.value = null;
                EmpIdHidden.value = null;
               
                empRCDHidden.value = null;
                fnameHidden.value = null;
                lnameHidden.value = null;
                evalTitleHidden.value = null;
                EmpUserID.value = null;
                AdminUserID.value = null;
                empEmailId.value = null;
                AdminEmailID.value = null;
              EmpIdFlag.value = null;
                showErrorModal("Alert!", "Please enter a valid Employee ID");

            } else {
                var gifModal = document.getElementById('gifModal');
                gifModal.style.display = "block";

                var cwid123 = chrsId.value;

                //var userID = "kcase";

                $.ajax({
                    type: 'GET',
                    url: "/bin/getEvaluationFormDataCHRSID",
                    data: {
                        cwid: cwid123,
                            userID: userValue,
                            action : "SPE_UNIT4_EMP_DETAILS"
                    },
                    dataType: 'json',
                    success: function(myresponse) {

                        var modal = document.getElementById('myModal');
                        var span = document.getElementsByClassName("close")[0];
                        if (myresponse.length === 1) {
                            EmpID.value = myresponse[0].EMPLID;
                            EmpIdFlag.value = EmpID.value;
                            generateDOR.visible = true;
                            StaffFirstName.value = myresponse[0].FIRST_NAME;
                            StaffLastName.value = myresponse[0].LAST_NAME;
                            Department.value = myresponse[0].DEPTNAME;
                            FirstName.value = myresponse[0].FIRST_NAME;
                            LastName.value = myresponse[0].LAST_NAME;
                            CBID.value = myresponse[0].UNION_CD;
                            DepartmentID.value = myresponse[0].DEPTID;
                            DepartmentName.value = myresponse[0].DEPTNAME;
                            EmpRCD.value = myresponse[0].EMPL_RCD;
                            Classification.value = myresponse[0].DESCR;
                            Range.value = myresponse[0].GRADE;
                            EvaluatorName.value = myresponse[0].SupervisorName;
                            evalTitleHidden.value = myresponse[0].SupervisorTitle;
                            
                            EmpUserID.value = myresponse[0].EMPUSERID;
                            empEmailId.value = myresponse[0].EMAILID;
                            //empEmailId.value = "soumya.ravindra@thoughtfocus.com";
                           //empEmailId.value = "jaharmon@fullerton.edu";
                            division.value = myresponse[0].DIVSION;
                            divisionName.value = myresponse[0].DIVISION_NAME;
							empName.value = (FirstName.value)+" "+LastName.value;
                          EmpName.value = myresponse[0].FIRST_NAME+" "+myresponse[0].LAST_NAME;
                            gifModal.style.display = "none";
                            modal.style.display = "none";
                        } else if (myresponse.length > 1) {
                            gifModal.style.display = "none";
                            modal.style.display = "block";
                            generateDOR.visible = true;
                            EvaluatorName.value = myresponse[0].SupervisorName;

                            fnameHidden.value = myresponse[0].FIRST_NAME;
                            lnameHidden.value = myresponse[0].LAST_NAME;
                            EmpUserID.value = myresponse[0].EMPUSERID;
                            if (EmpUserID.value !== null) {
                                empEmailId.value = (EmpUserID.value).concat('@').concat('exchange.fullerton.edu');

                            }


                            classificationHidden.value = myresponse[0].DESCR;
                            RangeHidden.value = myresponse[0].GRADE;
                            empRCDHidden.value = myresponse[0].EMPL_RCD;
                            cbidHidden.value = myresponse[0].UNION_CD;
                            evalTitleHidden.value = myresponse[0].SupervisorTitle;
                            var col = [];
                            col.push("CSU_CHRS_ID");
                            col.push("EMPLID");
                            col.push("LAST_NAME");
                            col.push("FIRST_NAME");
                            col.push("DEPTID");
                            col.push("DEPTNAME");
                          col.push("UNION_CD");
                                col.push("EMPL_RCD");
                                col.push("SupervisorName");

                            var table = document.createElement("table");
                            table.id = "tb";
                            var tr = table.insertRow(-1);
                            var headings = ["", "Emp ID" , "CWID", "Last Name", "First Name", "Department Id", "Department Name","CBID","Empl RCD","Supervisor Name"];
                            for (var j = 0; j < headings.length; j++) {
                                var th = document.createElement("th");
                                th.innerHTML = headings[j];
                                tr.appendChild(th);
                            }
                            for (var k = 0; k < myresponse.length; k++) {
                                tr = table.insertRow(-1);

                                var button = document.createElement("input");
                                button.type = "radio";
                                button.setAttribute("class", "rb");
                                button.id = "rbtn";
                                button.name = "group";
                                button.value = "";
                              debugger;
                                button.onclick = function(event) {

                                    deptHidden.value = event.currentTarget.parentNode.parentElement.childNodes[5].innerText;
                                    DeptNameHidden.value = event.currentTarget.parentNode.parentElement.childNodes[6].innerText;
                                    //cbidHidden.value = event.currentTarget.parentNode.parentElement.childNodes[6].innerText;
                                    //classificationHidden.value = event.currentTarget.parentNode.parentElement.childNodes[7].innerText;
                                    //RangeHidden.value = event.currentTarget.parentNode.parentElement.childNodes[8].innerText;
                                    EmpIdHidden.value = event.currentTarget.parentNode.parentElement.childNodes[2].innerText;
                                    ChrsIdHidden.value = event.currentTarget.parentNode.parentElement.childNodes[1].innerText;
                                    //empRCDHidden.value = event.currentTarget.parentNode.parentElement.childNodes[9].innerText;
                                };
                                var tabCell1 = tr.insertCell(-1);
                                tabCell1.appendChild(button);
                                for (var l = 0; l < col.length; l++) {
                                    var tabCell = tr.insertCell(-1);
                                    tabCell.innerHTML = myresponse[k][col[l]];
                                }
                            }
                            var divContainer = document.getElementById("showData");
                            divContainer.innerHTML = "";
                            divContainer.appendChild(table);

                            var cancelButton = document.createElement("input");
                            cancelButton.type = "button";
                            cancelButton.setAttribute("class", "cancelBtn");
                            cancelButton.id = "cBtn";
                            cancelButton.value = "Cancel";
                            cancelButton.onclick = function(event) {
                                modal.style.display = "none";
                            };
                            var footerModal = document.getElementById("modal_footer");
                            var okButton = document.createElement("input");
                            okButton.type = "button";
                            okButton.setAttribute("class", "okBtn");

                            okButton.value = "OK";
                            okButton.onclick = function(event) {

                                var n;
                                var rButtonStatus;

                                var rButtons = document.getElementsByClassName("rb");
                                for (n = 0; n < rButtons.length; n++) {
                                    if (rButtons[n].checked === false) {
                                        rButtonStatus = false;
                                    } else {
                                        rButtonStatus = true;
                                      EmpID.value = myresponse[n].EMPLID;
                                      EmpIdFlag.value = EmpID.value;
                                        cbidHidden.value = myresponse[n].UNION_CD;
                                        classificationHidden.value = myresponse[n].DESCR;
                                        RangeHidden.value = myresponse[n].GRADE;
                                        empRCDHidden.value = myresponse[n].EMPL_RCD;
                                      StaffFirstName.value = myresponse[n].FIRST_NAME;
                              StaffLastName.value = myresponse[n].LAST_NAME;
                              Department.value = myresponse[n].DEPTNAME;
                                        FirstName.value = fnameHidden.value;
                                        LastName.value = lnameHidden.value;
                                        CBID.value = cbidHidden.value;
                                        DepartmentID.value = deptHidden.value;
                                        DepartmentName.value = DeptNameHidden.value;
                                        Classification.value = classificationHidden.value;
                                        Range.value = RangeHidden.value;
                                        EmpRCD.value = empRCDHidden.value;
                                        division.value = myresponse[0].DIVSION;
                                        divisionName.value = myresponse[0].DIVISION_NAME;
										empEmailId.value = myresponse[0].EMAILID;
										// empEmailId.value = "soumya.ravindra@thoughtfocus.com";
                                       //empEmailId.value = "jaharmon@fullerton.edu";
										empName.value = (FirstName.value)+" "+LastName.value;
                                      EmpName.value = myresponse[n].FIRST_NAME+" "+myresponse[n].LAST_NAME;
                                        break;
                                    }
                                }
                                if (rButtonStatus === false) {
                                    showErrorModal("Alert!", "Please select the department");
                                    modal.style.display = "block";
                                } else {

                                    modal.style.display = "none";
                                }
                            };
                            var footerModal = document.getElementById("modal_footer");
                            footerModal.appendChild(cancelButton);
                            footerModal.appendChild(okButton);
                            document.getElementById('cBtn').parentNode.removeChild(document.getElementById('cBtn'));
                        } else {
                            showErrorModal("Alert!", "No matching records found");
                            evalNameHidden.value = null;
							EmpIdFlag.value = null;
                            EMPLID.value = null;
                            FirstName.value = null;
                            LastName.value = null;
                            DepartmentID.value = null;
                            DepartmentName.value = null;
                            CBID.value = null;
                            Classification.value = null;
                            Range.value = null;

                            EmpRCD.value = null;

                            deptHidden.value = null;
                            DeptNameHidden.value = null;
                            cbidHidden.value = null;
                            classificationHidden.value = null;
                            RangeHidden.value = null;
                            EmpIdHidden.value = null;
                            ChrsIdHidden.value = null;
                            empRCDHidden.value = null;
                            fnameHidden.value = null;
                            lnameHidden.value = null;
                            evalTitleHidden.value = null;
                            EmpUserID.value = null;
                            AdminUserID.value = null;
                            empEmailId.value = null;
                            AdminEmailID.value = null;
                            gifModal.style.display = "none";
                        }

                        span.onclick = function() {
                            var n;
                            var rButtonStatus;
                            //var rButtonStatusFalse;
                            var rButtons = document.getElementsByClassName("rb");
                            for (n = 0; n < rButtons.length; n++) {
                                if (rButtons[n].checked === false) {
                                    rButtonStatus = false;
                                } else {
                                    rButtonStatus = true;
                                    break;
                                }
                            }
                            if (rButtonStatus === false) {
                                showErrorModal("Alert!", "Please select the department");
                                modal.style.display = "block";
                            } else {

                                showErrorModal("Alert!", "Please select the department");
                                modal.style.display = "block";
                            }

                        };


                        window.onclick = function(event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        };
                    }
                });
            }
        }

    },
    error: function(error) {
        alert("error block=" + error);
    }
});
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_chrsId_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_chrsId_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === null){
  this.value = Copy_EmpId.value;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            Copy_EmpId.value = null;
Copy_EvalType.value = null;

$.ajax({

    type: 'GET',

    url: "/bin/getLoggedUserId",
    dataType: 'json',
    success: function(res) {

        var userValue = res.userId;
      logUser.value  =userValue;		
        if (FormSubmittedStatus.value === null && StageIndicator.value === null &&  EmpIdFlag.value != EmpID.value && (EmpID.value != Copy_EmpId.value)) {
          workflow_initiator.value = userValue;
            var cwidValue = EmpID.value;
            var pattern = /^8\d{8}$/;
            var result = pattern.test(cwidValue);
            if (result !== true) {
                evalNameHidden.value = null;

                FirstName.value = null;
                LastName.value = null;
              
                DepartmentID.value = null;
                DepartmentName.value = null;
                CBID.value = null;
                Classification.value = null;
                Range.value = null;

                EmpRCD.value = null;

                deptHidden.value = null;
                DeptNameHidden.value = null;
                cbidHidden.value = null;
                classificationHidden.value = null;
                RangeHidden.value = null;
                EmpIdHidden.value = null;
                empRCDHidden.value = null;
                fnameHidden.value = null;
                lnameHidden.value = null;
                evalTitleHidden.value = null;
                EmpUserID.value = null;
                AdminUserID.value = null;
                empEmailId.value = null;
                AdminEmailID.value = null;
              EmpIdFlag.value = null;
                showErrorModal("Alert!", "Please enter a valid Employee ID");

            } else {
                var gifModal = document.getElementById('gifModal');
                gifModal.style.display = "block";

                var cwid123 = EmpID.value;

                //var userID = "kcase";

                $.ajax({
                    type: 'GET',
                    url: "/bin/getEvaluationFormData",
                    data: {
                        cwid: cwid123,
                            userID: userValue,
                            action : "SPE_UNIT4_EMP_DETAILS"
                    },
                    dataType: 'json',
                    success: function(myresponse) {

                        var modal = document.getElementById('myModal');
                        var span = document.getElementsByClassName("close")[0];
                        if (myresponse.length === 1) {
                          EmpIdFlag.value = EmpID.value;
                            generateDOR.visible = true;
                          StaffFirstName.value = myresponse[0].FIRST_NAME;
                              StaffLastName.value = myresponse[0].LAST_NAME;
                              Department.value = myresponse[0].DEPTNAME;
                            FirstName.value = myresponse[0].FIRST_NAME;
                            LastName.value = myresponse[0].LAST_NAME;
                            CBID.value = myresponse[0].UNION_CD;
                            DepartmentID.value = myresponse[0].DEPTID;
                            DepartmentName.value = myresponse[0].DEPTNAME;
                            EmpRCD.value = myresponse[0].EMPL_RCD;
                            Classification.value = myresponse[0].DESCR;
                            Range.value = myresponse[0].GRADE;
                            EvaluatorName.value = myresponse[0].SupervisorName;
                            evalTitleHidden.value = myresponse[0].SupervisorTitle;
                            
                            EmpUserID.value = myresponse[0].EMPUSERID;
                            empEmailId.value = myresponse[0].EMAILID;
                            division.value = myresponse[0].DIVSION;
                            divisionName.value = myresponse[0].DIVISION_NAME;
							empName.value = (FirstName.value)+" "+LastName.value;
                          EmpName.value = myresponse[0].FIRST_NAME+" "+myresponse[0].LAST_NAME;
                            gifModal.style.display = "none";
                            modal.style.display = "none";
                        } else if (myresponse.length > 1) {
                            gifModal.style.display = "none";
                            modal.style.display = "block";
                            generateDOR.visible = true;
                            EvaluatorName.value = myresponse[0].SupervisorName;

                            fnameHidden.value = myresponse[0].FIRST_NAME;
                            lnameHidden.value = myresponse[0].LAST_NAME;
                            EmpUserID.value = myresponse[0].EMPUSERID;
                            if (EmpUserID.value !== null) {
                                empEmailId.value = (EmpUserID.value).concat('@').concat('exchange.fullerton.edu');

                            }


                            classificationHidden.value = myresponse[0].DESCR;
                            RangeHidden.value = myresponse[0].GRADE;
                            empRCDHidden.value = myresponse[0].EMPL_RCD;
                            cbidHidden.value = myresponse[0].UNION_CD;
                            evalTitleHidden.value = myresponse[0].SupervisorTitle;
                            var col = [];
                            col.push("EMPLID");
                            col.push("LAST_NAME");
                            col.push("FIRST_NAME");
                            col.push("DEPTID");
                            col.push("DEPTNAME");
                          col.push("UNION_CD");
                                col.push("EMPL_RCD");
                                col.push("SupervisorName");

                            var table = document.createElement("table");
                            table.id = "tb";
                            var tr = table.insertRow(-1);
                            var headings = ["", "Emp ID", "Last Name", "First Name", "Department Id", "Department Name","CBID","Empl RCD","Supervisor Name"];
                            for (var j = 0; j < headings.length; j++) {
                                var th = document.createElement("th");
                                th.innerHTML = headings[j];
                                tr.appendChild(th);
                            }
                            for (var k = 0; k < myresponse.length; k++) {
                                tr = table.insertRow(-1);

                                var button = document.createElement("input");
                                button.type = "radio";
                                button.setAttribute("class", "rb");
                                button.id = "rbtn";
                                button.name = "group";
                                button.value = "";
                                button.onclick = function(event) {

                                    deptHidden.value = event.currentTarget.parentNode.parentElement.childNodes[4].innerText;
                                    DeptNameHidden.value = event.currentTarget.parentNode.parentElement.childNodes[5].innerText;
                                    //cbidHidden.value = event.currentTarget.parentNode.parentElement.childNodes[6].innerText;
                                    //classificationHidden.value = event.currentTarget.parentNode.parentElement.childNodes[7].innerText;
                                    //RangeHidden.value = event.currentTarget.parentNode.parentElement.childNodes[8].innerText;
                                    EmpIdHidden.value = event.currentTarget.parentNode.parentElement.childNodes[1].innerText;
                                    //empRCDHidden.value = event.currentTarget.parentNode.parentElement.childNodes[9].innerText;
                                };
                                var tabCell1 = tr.insertCell(-1);
                                tabCell1.appendChild(button);
                                for (var l = 0; l < col.length; l++) {
                                    var tabCell = tr.insertCell(-1);
                                    tabCell.innerHTML = myresponse[k][col[l]];
                                }
                            }
                            var divContainer = document.getElementById("showData");
                            divContainer.innerHTML = "";
                            divContainer.appendChild(table);

                            var cancelButton = document.createElement("input");
                            cancelButton.type = "button";
                            cancelButton.setAttribute("class", "cancelBtn");
                            cancelButton.id = "cBtn";
                            cancelButton.value = "Cancel";
                            cancelButton.onclick = function(event) {
                                modal.style.display = "none";
                            };
                            var footerModal = document.getElementById("modal_footer");
                            var okButton = document.createElement("input");
                            okButton.type = "button";
                            okButton.setAttribute("class", "okBtn");

                            okButton.value = "OK";
                            okButton.onclick = function(event) {

                                var n;
                                var rButtonStatus;

                                var rButtons = document.getElementsByClassName("rb");
                                for (n = 0; n < rButtons.length; n++) {
                                    if (rButtons[n].checked === false) {
                                        rButtonStatus = false;
                                    } else {
                                        rButtonStatus = true;
                                      EmpIdFlag.value = EmpID.value;
                                        cbidHidden.value = myresponse[n].UNION_CD;
                                        classificationHidden.value = myresponse[n].DESCR;
                                        RangeHidden.value = myresponse[n].GRADE;
                                        empRCDHidden.value = myresponse[n].EMPL_RCD;
                                      StaffFirstName.value = myresponse[n].FIRST_NAME;
                              StaffLastName.value = myresponse[n].LAST_NAME;
                              Department.value = myresponse[n].DEPTNAME;
                                        FirstName.value = fnameHidden.value;
                                        LastName.value = lnameHidden.value;
                                        CBID.value = cbidHidden.value;
                                        DepartmentID.value = deptHidden.value;
                                        DepartmentName.value = DeptNameHidden.value;
                                        Classification.value = classificationHidden.value;
                                        Range.value = RangeHidden.value;
                                        EmpRCD.value = empRCDHidden.value;
                                        division.value = myresponse[0].DIVSION;
                                        divisionName.value = myresponse[0].DIVISION_NAME;
										 empEmailId.value = myresponse[0].EMAILID;
										empName.value = (FirstName.value)+" "+LastName.value;
                                      EmpName.value = myresponse[n].FIRST_NAME+" "+myresponse[n].LAST_NAME;
                                        break;
                                    }
                                }
                                if (rButtonStatus === false) {
                                    showErrorModal("Alert!", "Please select the department");
                                    modal.style.display = "block";
                                } else {

                                    modal.style.display = "none";
                                }
                            };
                            var footerModal = document.getElementById("modal_footer");
                            footerModal.appendChild(cancelButton);
                            footerModal.appendChild(okButton);
                            document.getElementById('cBtn').parentNode.removeChild(document.getElementById('cBtn'));
                        } else {
                            showErrorModal("Alert!", "No matching records found");
                            evalNameHidden.value = null;
							EmpIdFlag.value = null;
                            FirstName.value = null;
                            LastName.value = null;
                            DepartmentID.value = null;
                            DepartmentName.value = null;
                            CBID.value = null;
                            Classification.value = null;
                            Range.value = null;

                            EmpRCD.value = null;

                            deptHidden.value = null;
                            DeptNameHidden.value = null;
                            cbidHidden.value = null;
                            classificationHidden.value = null;
                            RangeHidden.value = null;
                            EmpIdHidden.value = null;
                            empRCDHidden.value = null;
                            fnameHidden.value = null;
                            lnameHidden.value = null;
                            evalTitleHidden.value = null;
                            EmpUserID.value = null;
                            AdminUserID.value = null;
                            empEmailId.value = null;
                            AdminEmailID.value = null;
                            gifModal.style.display = "none";
                        }

                        span.onclick = function() {
                            var n;
                            var rButtonStatus;
                            //var rButtonStatusFalse;
                            var rButtons = document.getElementsByClassName("rb");
                            for (n = 0; n < rButtons.length; n++) {
                                if (rButtons[n].checked === false) {
                                    rButtonStatus = false;
                                } else {
                                    rButtonStatus = true;
                                    break;
                                }
                            }
                            if (rButtonStatus === false) {
                                showErrorModal("Alert!", "Please select the department");
                                modal.style.display = "block";
                            } else {

                                showErrorModal("Alert!", "Please select the department");
                                modal.style.display = "block";
                            }

                        };


                        window.onclick = function(event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        };
                    }
                });
            }
        }

    },
    error: function(error) {
        alert("error block=" + error);
    }
});
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpRCD_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpRCD_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_CBID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_CBID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Range_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Range_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_FirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_FirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_LastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_LastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_DepartmentName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_DepartmentName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_DepartmentID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_DepartmentID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_DepartmentID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_DepartmentID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (this.value !== null) {

        var empId = EmpID.value;
        var deptid = this.value;
		var union_cd = CBID.value;
        $.ajax({
            type: 'GET',
            url: "/bin/getEvaluationFormData",
            data: {
                deptID: deptid,
                cwid: empId,
              	union_cd:union_cd,
              action:"SPE_MANAGER_DETAILS"
            },
            dataType: 'json',
            success: function(myresponse) {

                var modal = document.getElementById('myModal');
                var span = document.getElementsByClassName("close")[0];

                if (myresponse.length === 1) {
                    ManagerUserID.value = myresponse[0].MANAGER_EMP_USERID;
                    ManagerEmailID.value = myresponse[0].MANAGER_EMAIL_ID;
                    AdminEmailID.value = myresponse[0].ADMIN_EMAIL_ID;
                    AdminUserID.value = myresponse[0].ADMIN_EMP_USERID;
                    adminFullName.value = myresponse[0].ADMIN_EMP_NAME;
                    AdministratorsFullName.value = myresponse[0].ADMIN_EMP_NAME;

                } 
                
            }
        });
    }
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_DepartmentID_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_DepartmentID_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (this.value !== null) {

        var empId = chrsId.value;
        var deptid = this.value;
		var union_cd = CBID.value;
        $.ajax({
            type: 'GET',
            url: "/bin/getEvaluationFormDataCHRSID",
            data: {
                deptID: deptid,
                cwid: empId,
              	union_cd:union_cd,
              action:"SPE_MANAGER_DETAILS"
            },
            dataType: 'json',
            success: function(myresponse) {

                var modal = document.getElementById('myModal');
                var span = document.getElementsByClassName("close")[0];

                if (myresponse.length === 1) {
                    ManagerUserID.value = myresponse[0].MANAGER_EMP_USERID;
                    ManagerEmailID.value = myresponse[0].MANAGER_EMAIL_ID;
                    AdminEmailID.value = myresponse[0].ADMIN_EMAIL_ID; 
                  /* ManagerEmailID.value ="jaharmon@fullerton.edu";
                    AdminEmailID.value = "jaharmon@fullerton.edu"; 
                ManagerEmailID.value = "soumya.ravindra@thoughtfocus.com";
                    AdminEmailID.value = "soumya.ravindra@thoughtfocus.com";  */
                    AdminUserID.value = myresponse[0].ADMIN_EMP_USERID;
                    adminFullName.value = myresponse[0].ADMIN_EMP_NAME;
                    AdministratorsFullName.value = myresponse[0].ADMIN_EMP_NAME;

                } 
                
            }
        });
    }
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Classification_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_Classification_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_RatingPeriodFrom_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_RatingPeriodFrom_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = true;
if(StageIndicator.value === null){
var dateValue = this.value;
if(dateValue === null){
var today = new Date();
  //alert(today);
var curyear = today.getFullYear();
var curyearMonth = today.getMonth() + 1;
var curyearDay = today.getDate();
var lastYear = curyear - 1;
var d = (lastYear+"-"+ "07"+"-"+"01");
  //alert(d);
this.value = d;
//BO.F_RatingPeriodFrom1.setValue(d);
}else{
this.value = dateValue;
//BO.F_RatingPeriodFrom1.setValue(dateValue);
}
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_RatingPeriodTo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_RatingPeriodTo_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = true;
if(StageIndicator.value === null){
var dateValue = this.value;
if(dateValue === null){
var today = new Date();
var curyear = today.getFullYear();
var curyearMonth = today.getMonth() + 1;
var curyearDay = today.getDate();
var lastYear = curyear - 1;
var d = (curyear+"-"+ "06"+"-"+"30");
this.value = d;
//BO.F_RatingPeriodTo2.setValue(d);
}else{
this.value = dateValue;
//BO.F_RatingPeriodTo2.setValue(dateValue);
}
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EvaluationType_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EvaluationType_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "3"){
  ProbEmployee.enabled = true;
  ProbEmployee.mandatory = "error";
  if(StageIndicator.value == "ToManagerHRDI"){
    performanceReport.enabled = true;
    sectionA.enabled = false;
    recordPerformance.enabled = false;
  sectionF.enabled = true;
  }
}else{
  ProbEmployee.mandatory = "";
  ProbEmployee.enabled = false;
  ProbEmployee.value = "";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_draftDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_draftDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_hiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_hiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_division_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_division_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enable = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_division_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_division_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var divisionVal = this.value;
  
$.ajax({

type: 'GET', 


url:"/bin/getEvaluationFormData",
  data: {
                division: divisionVal,
    			action:"HR_COO_DATA"
                
            },
dataType: 'json',
success: function(myresopnse){
  
   HrCoordId.value =myresopnse[0].USERID;
   HrCoordFname.value =myresopnse[0].FIRSTNAME;
   HrCoordLname.value =myresopnse[0].LASTNAME;
   HrCoordEmailId.value =myresopnse[0].EMAIL;
  
  hrCoordFullName.value = (HrCoordFname.value).concat(" "+HrCoordLname.value);
  
},
  error: function(error){
alert("error block="+error);
}
});
}


        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_divisionName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_divisionName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_StageIndicator_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_StageIndicator_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value == "ToManagerAcknowledgeOnExpire"){
  EmpDidNotSignCB.visible = false;
  SendForEmpAckCB.visible = false;
  actionTakenAfterExpiry.visible = true;
  empActionRB.visible = false;
  empHelpText.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_logUser_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_logUser_init0 = function (scope) {
    with(this) {
        with(scope) {
            $.ajax({
type: 'GET', 
url:"/bin/getLoggedUserId",
dataType: 'json',
success: function(myresponse){
  var userValue=myresponse.userId;
  logUser.value = userValue; 
},
error: function(error){
alert("error block="+error);
}
});

        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EvalTitle_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EvalTitle_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            /* if(StageIndicator.value === null){
var evaluatorTitle = this.value;
regex = /President/;
VPCheckFlat.value = (regex.test(evaluatorTitle));
  
if(VPCheckFlag.value == "true"){

  EvaluatorSignaturePanel.visible = false;
  VPsignaturePanel.visible = true;
}else{
  EvaluatorSignaturePanel.visible = true;
  VPsignaturePanel.visible = false;
}
}    */
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpUserID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpUserID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
var empUserId = this.value;
var empEmail = empUserId.concat('@').concat('fullerton.edu');
empEmailId.value=empEmail;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_ManagerUserID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_ManagerUserID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  if(this.value == logUser.value){
    initiator.value = "Manager";
  }else{
    initiator.value = "Initiator";
  }
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_AdminUserID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_AdminUserID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null ){
var admUID = this.value;
var admEmail = admUID.concat('@').concat('fullerton.edu');
AdminEmailID.value=admEmail;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_SubmissionId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_SubmissionId_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var ID = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for ( var i = 0; i < 12; i++ ) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
this.value = ID;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_prePerflfEvalPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_prePerflfEvalPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_SectionDImprovementComment_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_SectionDImprovementComment_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null  || StageIndicator.value == "ToManager"){
  SectionDImprovementComment.mandatory = true;
}else{
  SectionDImprovementComment.mandatory = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_OverallRating_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_OverallRating_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
HRDIOverallRate.value = "Unacceptable";
}else if(this.value == "2"){
HRDIOverallRate.value = "Below Expectations";
}else if(this.value == "3"){
HRDIOverallRate.value = "Meets Expectations";
}else if(this.value == "4"){
HRDIOverallRate.value = "Exceeds Expectations";
}else if(this.value == "5"){
HRDIOverallRate.value = "Outstanding";
}else{
  HRDIOverallRate.value = "NA";
}

/*
if(this.value == "1" || this.value == "2"){
  SectionDImprovementComment.mandatory = true;
}else{
  SectionDImprovementComment.mandatory = false;
}*/

        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_ratingSuggestion_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_ratingSuggestion_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToEmployee" || StageIndicator.value == "ToEmployeeAck" || StageIndicator.value == "ToEmployeeAckOnExpire"){
  this.visible = false;
}else{
  this.visible = true;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_supportingDocuments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_supportingDocuments_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.enabled = true;
}else{
  this.enabled = false;
  attachmentText.visible = false;
  attachment1.visible = false;
   attachment2.visible = false;
   attachment3.visible = false;
   attachment4.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_selfEvalSupDocsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_selfEvalSupDocsPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible =false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_instanceId_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_instanceId_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
 if(this.value !== null){
  prePerfSupDocs.visible = true;
var instance = instanceId.value;
$.ajax({

    type: 'GET',

    url: "/bin/getSelfEvalSupDoc",
    data: {
        instanceId: instance
    },
    success: function(myresopnse) {
      debugger;
        for(i=0;i<myresopnse.length;i++){
         
    var linkSource = 'data:application/pdf;base64,'+myresopnse[i].Content;
    var downloadLink = document.createElement("a");
    downloadLink.id = ("a".concat(i));
    var fName = myresopnse[i].fileName;
    var mydiv = document.getElementById("gridView");
    downloadLink.innerText = fName;
    var para = document.createElement("p");
   // para.innerText = "";
          debugger;
     //  mydiv.appendChild(para);
    mydiv.appendChild(downloadLink);
    downloadLink.href = linkSource;
    downloadLink.download = fName;
    //downloadLink.click();
  
        }

    },
    error: function(error) {
        alert("error block=" + error);
    }
});
 }else{
   prePerfSupDocs.visible = false;
 }
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_workflowinstanceId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_workflowinstanceId_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value !== null){
 if(this.value !== null){
selfEvalSupDocsPanel.visible = true;
var instance = this.value;
 var requestURL = '/bin/getInboxItemDetails?action=TASK_ATTACHMENTS_FROM_WORKFLOW_INSTANCE_ID&workflowInstanceId=' + encodeURIComponent(instance);   
                     debugger; 
    $.ajax({
      type : "GET",
            contentType : "application/text; charset=utf-8",               
            url : '/bin/getTaskDetailsFromProcessingInstance?url=' + encodeURIComponent(requestURL),
            async : false,
            cache : false,
            dataType : "json",
                            success: function(myresopnse) {

                                if (myresopnse.length > "0") {
                                    selfEvalSupDocsPanel.visible = true;
                                    var mydiv = document.getElementById("gridView");
                                    mydiv.innerHTML = "";
                                    for (i = 0; i < myresopnse.length; i++) {

                        var jsonData = myresopnse[i];       
                       					var linkSource = ((window.location.protocol)+"//"+ window.location.hostname + ':' + window.location.port)+ "/bin/getTaskAttachmentFromProcessingInstance?assetPath=" + encodeURIComponent(jsonData.path);
                                        //var linkSource = 'data:application/pdf;base64,' + myresopnse[i].Content;
                                        var downloadLink = document.createElement("a");
                                        downloadLink.id = ("a".concat(i));
                              			//downloadLink.href = '/bin/getTaskAttachmentFromProcessingInstance?assetPath=" + encodeURIComponent(jsonData.path) + "';
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
     }else{
        selfEvalSupDocsPanel.visible = false;
       supportingDocuments.visible = false;
     }
    },
    error: function(error) {
      selfEvalSupDocsPanel.visible = false;
       supportingDocuments.visible = false;
        console.log("error block=" + error);
    }
});
 }else{
   //selfEvalSupDocsPanel.visible = false;
   supportingDocuments.visible = false;
 }
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_attachmentText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_attachmentText_init0 = function (scope) {
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
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_attachment1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_attachment1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
  
 /* var filePath = attachment1.fileAttachment.value;
var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);
//alert(extension);
extension = extension.toLowerCase();
if(extension !== "pdf"){
 
  attachment1.fileAttachment.value = null;
  
  showErrorModal("Alert!","Only PDF files are allowed");
}

    var format = /[&{}#!@$%^=;\[\]]/;
    if (format.test(attachment1.fileAttachment.value) === true) {
        var doc1NewName = attachment1.fileAttachment.value.replace(/#|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '-');
        attachment1.fileAttachment.value = doc1NewName;
    }*/
  var filePath = attachment1.fileAttachment.value;
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  attachment1.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  attachment1.fileAttachment.value = fname;
}
}
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_attachment2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_attachment2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
   /* var filePath = attachment2.fileAttachment.value;
var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);
//alert(extension);
extension = extension.toLowerCase();
if(extension !== "pdf"){
 
  attachment2.fileAttachment.value = null;
  
  showErrorModal("Alert!","Only PDF files are allowed");
}
    var format = /[&{}#!@$%^=;\[\]]/;
    if (format.test(attachment2.fileAttachment.value) === true) {
        var doc2NewName = attachment2.fileAttachment.value.replace(/#|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '-');
        attachment2.fileAttachment.value = doc2NewName;
    }*/
  var filePath = attachment2.fileAttachment.value;
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  attachment2.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  attachment2.fileAttachment.value = fname;
}
}
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_attachment3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_attachment3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    /*var filePath = attachment3.fileAttachment.value;
var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);
//alert(extension);
extension = extension.toLowerCase();
if(extension !== "pdf"){
 
  attachment3.fileAttachment.value = null;
 showErrorModal("Alert!","Only PDF files are allowed");
}
    var format = /[&{}#!@$%^=;\[\]]/;
    if (format.test(attachment3.fileAttachment.value) === true) {
        var doc3NewName = attachment3.fileAttachment.value.replace(/#|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '-');
        attachment3.fileAttachment.value = doc3NewName;
    }*/
  var filePath = attachment3.fileAttachment.value;
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  attachment3.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  attachment3.fileAttachment.value = fname;
}
}
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_attachment4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_attachment4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    /*var filePath = attachment4.fileAttachment.value;
var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);
//alert(extension);
extension = extension.toLowerCase();
if(extension !== "pdf"){
 
  attachment4.fileAttachment.value = null;
  
  showErrorModal("Alert!","Only PDF files are allowed");
}
    var format = /[&{}#!@$%^=;\[\]]/;
    if (format.test(attachment4.fileAttachment.value) === true) {
        var doc4NewName = attachment4.fileAttachment.value.replace(/#|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '-');
        attachment4.fileAttachment.value = doc4NewName;
    }*/
  var filePath = attachment4.fileAttachment.value;
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  attachment4.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  attachment4.fileAttachment.value = fname;
}
}
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_ExpireText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_ExpireText_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_SignedText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_SignedText_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToManagerFinalAcknowledge"){
  if(EmpCB.value == "1"){
    this.visible = true;
  }else{
    this.visible = false;
  }
}
else if(StageIndicator.value == "ToAdmin"){
  if(EmpCB.value == "1"){
    this.visible = true;
  }else{
    this.visible = false;
  }
}
else if(StageIndicator.value == "ToHRDI"){
  if(EmpCB.value == "1"){
    this.visible = true;
  }else{
    this.visible = false;
  }
}
else if(StageIndicator.value == "ToManagerHRDI"){
  if(EmpCB.value == "1"){
    this.visible = true;
  }else{
    this.visible = false;
  }
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_DidNotSignText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_DidNotSignText_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToManagerFinalAcknowledge"){
  if(EmpCB.value == "1"){
    this.visible = false;
  }else{
    this.visible = true;
  }
}
else if(StageIndicator.value == "ToAdmin"){
  if(EmpCB.value == "1"){
    this.visible = false;
  }else{
    this.visible = true;
  }
}
else if(StageIndicator.value == "ToHRDI"){
  if(EmpCB.value == "1"){
    this.visible = false;
  }else{
    this.visible = true;
  }
}
else if(StageIndicator.value == "ToManagerHRDI"){
  if(EmpCB.value == "1"){
    this.visible = false;
  }else{
    this.visible = true;
  }
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpDidNotSignCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpDidNotSignCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value ==  "ToManagerFinalAcknowledge"){
  this.visible = true;
  this.mandatory = "error";
}else if(StageIndicator.value == "ToManagerAcknowledgeOnExpire"){
 // this.visible = true;
   this.visible = false;
}
else if(StageIndicator.value == "ToAdmin" || StageIndicator.value == "ToHRDI" || StageIndicator.value == "ToManagerHRDI"){
 if(this.value == "1"){
   this.visible= true;
 } else{
   this.visible = false;
 }
}
else{
  
  this.visible = false;
 
  
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpDidNotSignCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpDidNotSignCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToManagerAcknowledgeOnExpire"){
  if(this.value == "1"){
    SendForEmpAckCB.value = "";
  }
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_SendForEmpAckCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_SendForEmpAckCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
/*if(StageIndicator.value == "ToManagerAcknowledgeOnExpire"){
  this.visible = true;
}else{
  this.visible = false;
}*/
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_SendForEmpAckCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_SendForEmpAckCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToManagerAcknowledgeOnExpire"){
  if(this.value == "1"){
    EmpDidNotSignCB.value = "";
  }
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_actionTakenAfterExpiry_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_actionTakenAfterExpiry_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value == "ToManagerAcknowledgeOnExpire"){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_actionTakenAfterExpiry_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_actionTakenAfterExpiry_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToManagerAcknowledgeOnExpire"){
  if(this.value == "1"){
    EmpDidNotSignCB.value = "1";
    SendForEmpAckCB.value = "";
  }
  if(this.value == "2"){
    EmpDidNotSignCB.value = "";
    SendForEmpAckCB.value = "1";
  }
  
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EvalCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EvalCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToManagerAcknowledge" || StageIndicator.value == "ToManagerFinalAcknowledge" || StageIndicator.value == "ToManagerAcknowledgeOnExpire"){
 // this.value = null;
  this.visible = true;
  EvaluatorNameSign.visible = true;
  EvaluatorSign.visible = true;
  EvaluatorDate.visible = true;
}else if(StageIndicator.value ==  "ToEmployeeAck" || StageIndicator.value == "ToAdmin" || StageIndicator.value == "ToHRDI" || StageIndicator.value == "ToManagerHRDI" || StageIndicator.value == "ToEmployeeAckOnExpire"){
  if(this.value == "1"){
  this.visible = true;
  EvaluatorNameSign.visible = true;
  EvaluatorSign.visible = true;
  EvaluatorDate.visible = true;
  }
}
/*else if(StageIndicator.value === null || StageIndicator.value === "ToManager"){
  EvaluatorNameSign.visible = true;
  EvaluatorNameSign.enabled = false;
  EvaluatorNameSign.mandatory = null;
  this.visible = true;
  this.mandatory = null;
  this.enabled = false;
  EvaluatorSign.visible = true;
  EvaluatorSign.mandatory = null;
  EvaluatorSign.enabled = false;
  EvaluatorDate.visible = true;
  EvaluatorDate.enabled = false;
  EvaluatorDate.mandatory = null;
}*/
else{
  EvaluatorNameSign.visible = false;
  this.visible = false;
  EvaluatorSign.visible = false;
  EvaluatorDate.visible = false;
  
}
if(EvalCB.value !== null){  
            var d = EvaluatorDate.value;  
 
  if(d !== ""){
            var curyear = d.substring(0,4);
            var curyearMonth = d.substring(5,7);
            var curyearDay = d.substring(8,10);
  			var item = "I affirm that this performance evaluation was reviewed with the employee on "+(curyearMonth+"/"+curyearDay + "/" + curyear);           
  document.getElementById("guideContainer-rootPanel-informationPage-signature-panel_2048390334_cop-EvalCB1563954062264___guide-item").childNodes[0].nextSibling.childNodes[1].childNodes[1].childNodes[1].childNodes[2].nextSibling.childNodes[1].innerHTML = item;
  }
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EvalCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EvalCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (StageIndicator.value === null || StageIndicator.value == "ToManager" || StageIndicator.value == "ToManagerAcknowledge" || StageIndicator.value == "ToManagerFinalAcknowledge" || StageIndicator.value == "ToManagerHRDI" || StageIndicator.value == "ToManagerAcknowledgeOnExpire") {
      if (EvaluatorDate.value === null) {
        

        EvaluatorDate.enabled = false;
        
         $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                    EvaluatorSign.value = userValue;
                  	EvaluatorNameSign.value = userValue;
                  EvaluatorDate.value = myresopnse[0].SERVER_DATE;
                   var d = EvaluatorDate.value;  
  if(d !== ""){
            var curyear = d.substring(0,4);
            var curyearMonth = d.substring(5,7);
            var curyearDay = d.substring(8,10);
    var evalCBChecked = document.querySelector(".EvaluatorCheckbox check");
            var result = [];
            var item = "1=I affirm that this performance evaluation was reviewed with the employee on "+(curyearMonth+"/"+curyearDay + "/" + curyear);
          //var item = "I affirm that this performance evaluation was reviewed with the employee "+(EvaluatorDate.value);  
          result.push(item);
            EvalCB.items = item;
  }
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
       
        
        EvaluatorSign.enabled = false;
        //EvaluatorNameSign.value = (EvaluatorsName.value).replace("  "," ");
    }
	}
} else {
    EvaluatorSign.value = "";
    EvaluatorDate.value = "";
    EvaluatorNameSign.value = "";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EvaluatorDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EvaluatorDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EvaluatorComment_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EvaluatorComment_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_HRCooCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_HRCooCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (StageIndicator.value == "ToHRCoo") {
        if (HRCoordinatorSignDate.value === null) {
            

            HRCoordinatorSignDate.enabled = false;
            $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                    HRCoordinatorSign.value = userValue;
                  HRCooName.value = userValue;
                  HRCoordinatorSignDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
            HRCoordinatorSign.enabled = false;
            //HRCooName.value = (HrCoordFname.value).concat(' ').concat(HrCoordLname.value);

        } 
    }
} else {
    HRCoordinatorSign.value = "";
    HRCoordinatorSignDate.value = "";
    HRCooName.value = "";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_HRCoordinatorSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_HRCoordinatorSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_HRCoordinatorSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_HRCoordinatorSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToEmployeeAckOnExpire" || StageIndicator.value == "ToEmployeeAck"){
  /* this.mandatory = "";
  EmpSign.mandatory = "";
  EmpDate.mandatory = "";
}else{*/
  //this.mandatory = "error";
  EmpSign.mandatory = "error";
  EmpDate.mandatory = "error";
 
}

if(StageIndicator.value == "ToEmployeeAck" || StageIndicator.value == "ToEmployeeAckOnExpire"){
  this.visible = true;
  EmpSign.visible = true;
  EmpDate.visible = true;
  EmpSign.enabled = false;
 }else if(StageIndicator.value == "ToAdmin"|| StageIndicator.value == "ToHRDI" || StageIndicator.value == "ToManagerHRDI" || StageIndicator.value == "ToManagerFinalAcknowledge"){
  if(this.value == "1"){
  this.visible = true;
  EmpSign.visible = true;
  EmpDate.visible = true;
    EmpSign.enabled = false;
  }else{
   if(EmpCB.value === null && EmpCB_1.value === null){
    this.visible = false;
     EmpCB_1.visible = false;
  EmpSign.visible = false;
  EmpDate.visible = false; 
     textdraw1563953665282.visible = false;
  }
  }
}/*else if(StageIndicator.value === "ToEmployee"){
  EmpSign.visible = true;
  EmpSign.enabled = false;
  EmpSign.mandatory = null;
  this.visible = true;
  this.mandatory = null;
  this.enabled = false;
  EmpDate.visible = true;
  EmpDate.mandatory = null;
  EmpDate.enabled = false;
  
}*/else{
  EmpSign.visible = false;
  this.visible = false;
  EmpDate.visible = false;
  
  
}

        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
             if (StageIndicator.value == "ToEmployee" || StageIndicator.value == "ToEmployeeAck" || StageIndicator.value == "ToEmployeeAckOnExpire") {
if (this.value == 1) {
  
   	
      EmpCB_1.value = "";
       EmpSign.value = "";
     EmpDate.value = "";
        if (EmpDate.value === null) {
            EmpDate.enabled = false;
           $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                    EmpSign.value = userValue;
                  EmpDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });

            EmpSign.enabled = false;

        
    }
} else {

   if(EmpCB_1.value != "1"){
    EmpSign.value = "";
    EmpDate.value = "";
   }
  
}
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpCB_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpCB_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value == "ToEmployeeAckOnExpire" || StageIndicator.value == "ToEmployeeAck"){
  /*this.mandatory = "";
  EmpSign.mandatory = "";
  EmpDate.mandatory = "";
}else{*/
  //this.mandatory = "error";
  EmpSign.mandatory = "error";
  EmpDate.mandatory = "error";
 
}

if(StageIndicator.value == "ToEmployeeAck" || StageIndicator.value == "ToEmployeeAckOnExpire"){
  this.visible = true;
  EmpSign.visible = true;
  EmpDate.visible = true;
 }else if(StageIndicator.value == "ToAdmin"|| StageIndicator.value == "ToHRDI" || StageIndicator.value == "ToManagerHRDI" || StageIndicator.value == "ToManagerFinalAcknowledge"){
  if(this.value == "1"){
  this.visible = true;
  EmpSign.visible = true;
  EmpDate.visible = true;
  }/*else{
   this.visible = false;
  EmpSign.visible = false;
  EmpDate.visible = false; 
  }*/
}/*else if(StageIndicator.value === "ToEmployee"){
  EmpSign.visible = true;
  EmpSign.enabled = false;
  EmpSign.mandatory = null;
  this.visible = true;
  this.mandatory = null;
  this.enabled = false;
  EmpDate.visible = true;
  EmpDate.mandatory = null;
  EmpDate.enabled = false;
  
}*/else{
  EmpSign.visible = false;
  this.visible = false;
  EmpDate.visible = false;
  
  
}

        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpCB_1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpCB_1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
             if (StageIndicator.value == "ToEmployee" || StageIndicator.value == "ToEmployeeAck" || StageIndicator.value == "ToEmployeeAckOnExpire") {	
if (this.value == "1") {

   
       EmpCB.value = "";
       EmpSign.value = "";
    EmpDate.value = "";
        if (EmpDate.value === null) {
            EmpDate.enabled = false;
           $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    //var userValue = myresopnse[0].EMP_NAME;
                    EmpSign.value = "Employee Declined to Sign";
                  EmpDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });

            EmpSign.enabled = false;

        } 
    
} else {
    if(EmpCB.value != "1"){
    EmpSign.value = "";
    EmpDate.value = "";
    }
}
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpCB_1_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpCB_1_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToEmployeeAckOnExpire" || StageIndicator.value == "ToEmployeeAck"){
  if(this.value == "1"){
    EmpCB.value = "";
  }
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_empActionRB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_empActionRB_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToEmployee"){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_textdraw_3060099691686820545187_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_textdraw_3060099691686820545187_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToEmployee"){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_empHelpText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_empHelpText_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToEmployee"){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_rebuttalMessage_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_rebuttalMessage_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToEmployeeAck" || StageIndicator.value == "ToEmployeeAckOnExpire"){
  this.visible = true;  
 }else{
   this.visible = false;
 }
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpComment_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_EmpComment_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToAdmin" || StageIndicator.value == "ToHRDI" || StageIndicator.value == "ToEmployeeAckOnExpire" || StageIndicator.value == "ToEmployeeAck"){
  this.visible = false;
 }
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_AdminCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_AdminCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (StageIndicator.value == "ToAdmin") {
        if (AdminDate.value === null) {

            //AdminName.value = AdministratorsFullName.value;
            // AdminName.value = "Michelle Tapper";
            AdminDate.enabled = false;

            $.ajax({

                type: 'GET',

                url: "/bin/getEvaluationFormData",
                data: {
                    action: "EMP_DETAILS"
                },
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                    AdminSign.value = userValue;
                    AdminName.value = userValue;
                    AdminDate.value = myresopnse[0].SERVER_DATE;
                    if (myresopnse[0].EMPUSERID !== "") {
                        $.ajax({

                            type: 'GET',

                            url: "/bin/getEvaluationFormData",
                            data: {
                                action: "SPE_UNIT4_ADMIN_DATA"
                            },
                            dataType: 'json',
                            success: function(result) {
                                adminTitle.value = result[0].ADMIN_TITLE;
                            },
                            error: function(error) {
                                console.log("error block=" + error);
                            }
                        });
                    }
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });

            AdminSign.enabled = false;

        }
    }
} else {
    AdminSign.value = "";
    AdminDate.value = "";
    AdminName.value = "";
  	adminTitle.value = "";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_AdminSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_AdminSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_AdminDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_AdminDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_AdminComment_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_AdminComment_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_HRDICB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_HRDICB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (StageIndicator.value == "ToHRDI") {
        if (HRDIDate.value === null) {
            

            HRDIDate.enabled = false;
             $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                    HRDIInitials.value = userValue;
                  HRDIDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
				
            HRDIInitials.enabled = false;

        }
    }
} else {
    HRDIInitials.value = "";
    HRDIDate.value = "";

}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_HRDIInitials_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_HRDIInitials_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_HRDIDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_HRDIDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_HRDIOverallRate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_HRDIOverallRate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_textdraw1686820336850_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_textdraw1686820336850_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToManager"){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_generateDOR_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_generateDOR_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToManager" || StageIndicator.value == "ToManagerAcknowledge" || StageIndicator.value == "ToManagerFinalAcknowledge" || StageIndicator.value == "ToManagerHRDI" || StageIndicator.value == "ToManagerAcknowledgeOnExpire" || StageIndicator.value == "ToEmployee" || StageIndicator.value == "ToEmployeeAck" || StageIndicator.value == "ToEmployeeAckOnExpire" || StageIndicator.value == "ToHRDI"){
  this.visible = false;
}else if(StageIndicator.value === null){
  if(formSavedStatus.value !== null && EmpID.value !== null){
   generateDOR.visible = true;
  }else{
    generateDOR.visible = false;
  }
}
else{
  //alert("sdsddsf");
  this.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            /*if(EmpID.value !== null && EvaluationType.value !== null && Quality.value !== null && Quantity.value !== null && ProfessionalJudgement.value !== null && ContributionCampus.value !== null && OverallRating.value !== null && RatingPeriodFrom.value !== null && RatingPeriodTo.value !== null){*/
 
    generatePDFStep.value = "Draft";
    getPdf();

    
/*}else{
  
  showErrorModal("Alert!","Please fill all the required fields");
   
  
}*/
function getPdf() {
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/staff-performance-evaluation-unit-4/staff-performance-evaluation-unit-4');
            jsonData.append('fileName', FirstName.value + "_" + LastName.value + "(" + EmpID.value + ")" + "_" + Date.now());          
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
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_reset1572156389610_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_reset1572156389610_click0 = function (scope) {
    with(this) {
        with(scope) {
            formSavedStatus.value = "";
EmpID.value = "";
EmpRCD.value = "";
CBID.value = "";
Classification.value = "";
Range.value = "";
EvaluationType.value = "";
FirstName.value = "";
LastName.value = "";
DepartmentID.value = "";
DepartmentName.value = "";              
Quality.value = "";
Quantity.value = "";
ProfessionalJudgement.value = "";	
ContributionCampus.value = "";
JobStrengthComment.value = "";
SectiotnBComment.value = "";
SectionCProgressComment.value = "";
SectionDImprovementComment.value = "";
SectionEImprovementComment.value = "";
extendedTaskDescription.value = "";
ProbEmployee.value = "";
OverallRating.value = "";
draftDate.value = "";
BasedOnObservation.value = "";
BasedOnObservation1.value = "";
ratingSuggestion.value = "";
attachment1.fileAttachment.value = "";
attachment2.fileAttachment.value = "";
attachment3.fileAttachment.value = "";
attachment4.fileAttachment.value = "";
EmpIdFlag.value = "";
        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_saveguidedraft1572156382727_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_saveguidedraft1572156382727_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(EmpID.value !== null){
  formSavedStatus.value = "Yes";
  var evalType = "";
  if(EvaluationType.value == "1"){
    evalType = "Annual";
  }
  if(EvaluationType.value == "2"){
    evalType = "Temporary";
  }
  if(EvaluationType.value == "3"){
    evalType = "Probationary";
  }
  if(EvaluationType.value == "4"){
    evalType = "Special";
  }
 if(EmpID.value !== null){
  aftiaDescCWID.value = FirstName.value + " " + LastName.value + " " + EmpID.value+" "+evalType;
}
  handleDraftSave(this);
}else{
  showErrorModal("Alert!","Please enter the employee id");
}

// handleDraftSave(this);



        }
	}
}
/**
 * @function staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_submit1572156375044_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_unit_4_staff_performance_evaluation_unit_4.generated_submit1572156375044_click0 = function (scope) {
    with(this) {
        with(scope) {
            //Comment below 4 lines for UAT and prod

/*empEmailId.value = "hrdievaluations@fullerton.edu";
ManagerEmailID.value = "hrdievaluations@fullerton.edu";
AdminEmailID.value = "hrdievaluations@fullerton.edu";
HrCoordEmailId.value = "hrdievaluations@fullerton.edu"; */
extendedTaskDescription.value = EmpID.value;

var evalType = "";
  if(EvaluationType.value == "1"){
    evalType = "Annual";
  }
  if(EvaluationType.value == "2"){
    evalType = "Temporary";
  }
  if(EvaluationType.value == "3"){
    evalType = "Probationary";
  }
  if(EvaluationType.value == "4"){
    evalType = "Special";
  }
 if(EmpID.value !== null){
  aftiaDescCWID.value = FirstName.value + " " + LastName.value + " " + EmpID.value+" "+evalType;
}

hrCoordFullName.value = HrCoordFname.value+" "+HrCoordLname.value;
empFullName.value = FirstName.value+" "+LastName.value;

FormSubmittedStatus.value = "Yes";
/*var dateObject = new Date();
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay); */
  draftDate.value = getDateforAdaptiveForm();
var flag = 0;

if(flag === 0 && draftDate.value !== null && RatingPeriodTo.value !== null && Submit_Flag1.value === null){
    Submit_Flag1.value = "1";
    var draftDt = new Date(draftDate.value);
    var toDate = new Date(RatingPeriodTo.value);
    if(toDate > draftDt){
    showErrorModal("Alert!","The draft performance evaluation cannot be submitted to the employee until after the review period has ended.");   
      flag = 1;
    }else{
      flag = 0;
    }
  }
/*if(flag === 0 &&(JobStrengthComment.value === null || SectiotnBComment.value === null || SectionCProgressComment.value === null || SectionDImprovementComment.value === null || SectionEImprovementComment.value === null )){
  showErrorModal("Alert!","Please check to make sure all required fields have been completed. ie: goals/ratings/and comments supporting each rating area.");
  flag=1;
  //SubmitFlag.value = "1";
}*/

if(flag === 0 && RatingPeriodFrom.value !== null && RatingPeriodTo.value !== null){
  var dateString = new Date().toLocaleString("en-US", {
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, ' ');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        var frmDate = new Date(RatingPeriodFrom.value);
        var toDate = new Date(RatingPeriodTo.value);
    if(frmDate > toDate){
      guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].informationPage[0].basicInformation[0].additionalDetails[0].RatingPeriodFrom[0]");
    showErrorModal("Alert!","Invalid Rating Period Range");
      flag = 1;
    }else if(Date.parse(RatingPeriodFrom.value)>Date.parse(d) || Date.parse(RatingPeriodTo.value)>Date.parse(d)){
      showErrorModal("Alert!","A Performance Evaluation can't be initiated for a future date."); 
       flag = 1;
    }
     else{
      flag=0;
    }
}

if((flag === 0) && (SectionDImprovementComment.value !== null)){
  var val = SectionDImprovementComment.value;
  if(/^(?!\s*$)[\s\S]*$/.test(val)){
    flag = 0;
  }else{
    flag = 1;
    showErrorModal("Alert!","No white spaces are allowed");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].informationPage[0].performanceReport[0].recordPerformance[0].SectionDImprovementComment[0]");
    
  }
}

if(flag === 0){ 
  
  window.guideBridge.getDataXML({
    success: function(result) {
        //console.log("in view pdf=" + result.data);
        var sheet = [];
        sheet[0] = {};
        sheet[0].data = result.data.replace(/&amp;/g, 'and');
        sheet[0].formPath = "/content/forms/af/staff-performance-evaluation-unit-4/staff-performance-evaluation-unit-4";
        sheet[0].submissionId = SubmissionId.value;
        sheet[0].evalName = "Staff Performance Evaluation - Unit 4";
        if(EvaluationType.value !== null){
          if(EvaluationType.value == "1"){
            sheet[0].evalType = "Annual";
          }else if(EvaluationType.value == "2"){
            sheet[0].evalType = "Temporary";
          }else if(EvaluationType.value == "3"){
            sheet[0].evalType = "Probationary";
          }else if(EvaluationType.value == "4"){
            sheet[0].evalType = "Special";
          }
        }
        

        var data = JSON.stringify(sheet);
        $.ajax({
            type: 'GET',
            url: "/bin/getEvaluationFormData",
            data: {
                action: "SAVE_EVAL_DATA",
                jsonData: data,
                cwid: EmpID.value
            },
            dataType: 'json',
            success: function(response) {
			console.log("Completed");
            }
        });
    }
});

  guideBridge.submit();
}

//alert(ManagerEmailID.value);


        }
	}
}
