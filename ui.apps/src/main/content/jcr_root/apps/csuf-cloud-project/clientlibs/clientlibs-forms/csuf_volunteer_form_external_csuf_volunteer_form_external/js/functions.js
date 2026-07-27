/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;

if (StageIndicator.value === null) {

    RiskManagementPanel.visible = false;
    DeanSignPanel.visible = false;
    ChairSignPanel.visible = false;
    DeptCoordinatorPanel.visible = false;
    SupervisorSignPanel.visible = false;
    
    supervisorSecondPanel.visible = false; 
  
  SupportingDocuments.visible = true;
  SupportingDocuments.enabled = true;
    
  
    
}
/*if (StageIndicator.value == "ToInitiator") {
    
    VolunteerInformationPanel.visible = true;
    VolunteerInformationPanel.enabled = true;
    RequiredInformation.visible = true;
    RequiredInformation.enabled = true;
    SupervisorsFirstPanel.enabled = true; 
    supervisorSecondPanel.visible = true; 
    supervisorSecondPanel.enabled = true;
    
    VolunteerSignPanel.visible = true;
    VolunteerSignPanel.enabled = true;
    SupervisorSignPanel.visible = false;
  
    RiskManagementPanel.visible = false;
    ChairSignPanel.visible = false;
    DeanSignPanel.visible = false;
    DeptCoordinatorPanel.visible = false;
  
}*/
if (StageIndicator.value == "ToSupervisor") {
    
    VolunteerInformationPanel.visible = true;
    VolunteerInformationPanel.enabled = false;
  //  SupportingDocuments.enabled = false;
    SupportingDocuments.visible = false;
    SupervisorsFirstPanel.enabled = false; 
    supervisorSecondPanel.visible = true; 
    supervisorSecondPanel.enabled = true;
    
    VolunteerSignPanel.visible = true;
    VolunteerSignPanel.enabled = false;
    SupervisorSignPanel.visible = true;
    SupervisorSignPanel.enabled = true;
  
    RiskManagementPanel.visible = false;
    ChairSignPanel.visible = false;
    DeanSignPanel.visible = false;
    DeptCoordinatorPanel.visible = false;
  datepicker.visible =true;
  datepicker.enabled =false;
  
}

if (StageIndicator.value == "ToDepartmentCoordinator") {
    
    VolunteerInformationPanel.visible = true;
    VolunteerInformationPanel.enabled = true;
  // SupportingDocuments.enabled = false;
   SupportingDocuments.visible = false;
    SupervisorsFirstPanel.enabled = false; 
    supervisorSecondPanel.visible = true; 
    supervisorSecondPanel.enabled = true;
   
    VolunteerSignPanel.visible = true;
    VolunteerSignPanel.enabled = false;
    SupervisorSignPanel.visible = true;
    SupervisorSignPanel.enabled = false;
    DeptCoordinatorPanel.visible = true;
    DeptCoordinatorPanel.enabled = true;
  
    RiskManagementPanel.visible = false;
    DeanSignPanel.visible = false;
    ChairSignPanel.visible = false;
    
  
}
  if (StageIndicator.value == "ToChair") {
    VolunteerInformationPanel.visible = true;
    VolunteerInformationPanel.enabled = false;
  //  SupportingDocuments.enabled = false;
    SupportingDocuments.visible = false;

    SupervisorsFirstPanel.enabled = false; 
    supervisorSecondPanel.visible = true; 
    supervisorSecondPanel.enabled = false; 
   
    VolunteerSignPanel.visible = true;
    VolunteerSignPanel.enabled = false;
    SupervisorSignPanel.visible = true;
    SupervisorSignPanel.enabled = false;
    DeptCoordinatorPanel.visible = true;
    DeptCoordinatorPanel.enabled = false;
    ChairSignPanel.visible = true; 
    ChairSignPanel.enabled = true;
  
    RiskManagementPanel.visible = false;
    DeanSignPanel.visible = false;
   
}

debugger;
  if (StageIndicator.value == "ToDean") {
    VolunteerInformationPanel.visible = true;
    VolunteerInformationPanel.enabled = false;
   // SupportingDocuments.enabled = false;
    SupportingDocuments.visible = false;
    SupervisorsFirstPanel.enabled = false; 
    supervisorSecondPanel.visible = true; 
    supervisorSecondPanel.enabled = false; 
   
    VolunteerSignPanel.visible = true;
    VolunteerSignPanel.enabled = false;
    SupervisorSignPanel.visible = true;
    SupervisorSignPanel.enabled = false;
    DeptCoordinatorPanel.visible = true;
    DeptCoordinatorPanel.enabled = false;
    if(ChairRbYN.value == "1"){
    ChairSignPanel.visible = true; 
    ChairSignPanel.enabled = false;
    }else{
       ChairSignPanel.visible = false; 
    }
    DeanSignPanel.visible = true; 
    DeanSignPanel.enabled = true;
  
    RiskManagementPanel.visible = false;
   
   
}
debugger;
 if (StageIndicator.value == "ToRiskManagement") {
    VolunteerInformationPanel.visible = true;
    VolunteerInformationPanel.enabled = true;
  //  SupportingDocuments.enabled = false;
    SupportingDocuments.visible = false;
    SupervisorsFirstPanel.enabled = false; 
    supervisorSecondPanel.visible = true; 
    supervisorSecondPanel.enabled = true; 
   
    VolunteerSignPanel.visible = true;
    VolunteerSignPanel.enabled = false;
    SupervisorSignPanel.visible = true;
    SupervisorSignPanel.enabled = false;
    DeptCoordinatorPanel.visible = true;
    DeptCoordinatorPanel.enabled = false;
    if(ChairRbYN.value == "1"){
    ChairSignPanel.visible = true; 
    ChairSignPanel.enabled = false;
    }else{
       ChairSignPanel.visible = false; 
    }
    DeanSignPanel.visible = true; 
    DeanSignPanel.enabled = false;
  
    RiskManagementPanel.visible = true;
    RiskManagementPanel.enabled = true;
   
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
    if (StageIndicator.value === "ToSupervisor") {
     
            $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                   
                  DivisionId.value = myresopnse[0].DIVSION;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        
    
} else {
    
    DivisionId.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_caseId_init0 = function (scope) {
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
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_caseId_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_caseId_init1 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CSUFstudent_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CSUFstudent_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value == "0"){
  AcademicCredit.enabled = true;
  AcademicCredit.visible = true;
  AcademicCredit.mandatory = true;
  textdraw_18677962761782834496361.enabled = true;
  textdraw_18677962761782834496361.visible = true;

}else{
  AcademicCredit.enabled = false;
  AcademicCredit.visible = false;
    textdraw_18677962761782834496361.enabled = false;
  textdraw_18677962761782834496361.visible = false;

}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_textdraw_18677962761782834496361_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_textdraw_18677962761782834496361_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_AcademicCredit_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_AcademicCredit_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CSUFEmployee_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CSUFEmployee_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value == "0"){
  textdraw_2969402881782836731117.enabled = true;
  textdraw_2969402881782836731117.visible = true;
   WorkSupervisorName.enabled = true;
  WorkSupervisorName.visible = true;
     WorkSupervisorExt.enabled = true;
  WorkSupervisorExt.visible = true;
  WorkSupervisorName.mandatory = true;
  WorkSupervisorExt.mandatory = true;
  textdraw_12553088181782837394455.enbled = true;
  textdraw_12553088181782837394455.visible = true;

}else{
   textdraw_2969402881782836731117.enabled = false;
  textdraw_2969402881782836731117.visible = false;
   WorkSupervisorName.enabled = false;
  WorkSupervisorName.visible = false;
     WorkSupervisorExt.enabled = false;
  WorkSupervisorExt.visible = false;
  WorkSupervisorName.mandatory = false;
  WorkSupervisorExt.mandatory = false;
  textdraw_12553088181782837394455.enbled = false;
  textdraw_12553088181782837394455.visible = false;

}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_textdraw_2969402881782836731117_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_textdraw_2969402881782836731117_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_WorkSupervisorName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_WorkSupervisorName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_WorkSupervisorExt_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_WorkSupervisorExt_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_textdraw_12553088181782837394455_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_textdraw_12553088181782837394455_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CSUFStudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CSUFStudentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  CSUFFacultyCB.value = null;
  CSUFStaffCB.value = null;
  OtherCB.value = null;
  OtherTF.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CSUFFacultyCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CSUFFacultyCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  CSUFStudentCB.value = null;
  CSUFStaffCB.value = null;
  OtherCB.value = null;
  OtherTF.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CSUFStaffCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CSUFStaffCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  CSUFStudentCB.value = null;
  CSUFFacultyCB.value = null;
  OtherCB.value = null;
  OtherTF.enabled = false;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_OtherCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_OtherCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            	
if(this.value == "1"){
  CSUFStudentCB.value = null;
  CSUFStaffCB.value = null;
  CSUFFacultyCB.value = null;
  OtherTF.enabled = true;
  OtherTF.mandatory = true;
}else{
OtherTF.value = null; 
  OtherTF.mandatory = false;
  OtherTF.enabled = false;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_OtherTF_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_OtherTF_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_NoCB1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_NoCB1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  YesCB1.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_YesCB1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_YesCB1_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToRiskManagement") 
{
  this.mandatory = true ;
  showErrorModal("Alert !", "The form cannot be submitted without the CWID question being set to Yes");
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_YesCB1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_YesCB1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoCB1.value = null;
  cwid.enabled = true;
  cwid.mandatory = true;
  newLink.visible = true;
}else{
  cwid.enabled = false;
  cwid.value = null;
  cwid.mandatory = false;
  newLink.visible = false;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_cwid_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_cwid_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
var cwidVal = this.value;
if(cwidVal !== null){
  var cwiddigit = cwidVal.toString().length;
}
if(cwiddigit < 9){
  showErrorModal("Alert!", "Please enter valid CWID");
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_newLink_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_newLink_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_newLink_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_newLink_init1 = function (scope) {
    with(this) {
        with(scope) {
            var changeText = "<p>Can’t remember your CWID? Look it up here: ".concat("<a href=".concat("https://my.fullerton.edu/Accounts/CWID/ ").concat("target=".concat("_blank")).concat(">https://my.fullerton.edu/Accounts/CWID/</a></p>"));

 $("#SText").html(changeText);
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_NoCB2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_NoCB2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  YesCB2.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_YesCB2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_YesCB2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoCB2.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_NoCB3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_NoCB3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  YesCB3.value = null;
  RequiredDate.enabled = true;
  RequiredDate.mandatory = true;
  riskmanagementtext.visible = true;
}else{
  RequiredDate.enabled = false;
  RequiredDate.value = null;
  RequiredDate.mandatory = false;
  riskmanagementtext.visible = false;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_YesCB3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_YesCB3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            	
if(this.value == "1"){
  NoCB3.value = null;
  //RequiredDate.enabled = false;
 // RequiredDate.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RequiredDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RequiredDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RequiredDate_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RequiredDate_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;


var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
      /*  var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
 ApprovalDate1.value = d;*/



var dateOf = new Date(this.value);
var year = dateOf.getFullYear();
//var currentyear = 2024;
var age = curyear - year;
if(age >= 18){
  showErrorModal("Alert !", "Please Select the valid Date");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].RequiredInformation[0].panel1694627557860[0].RequiredDate[0]");
  this.value = null;
}

        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_riskmanage_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_riskmanage_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_riskmanage_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_riskmanage_init1 = function (scope) {
    with(this) {
        with(scope) {
            /*var changeText = "<p><b>Note: The CSUF Volunteer Release Form for Minors must be completed by your parent/guardian and can be found on the ".concat("<a href=".concat("https://hr.fullerton.edu/forms ").concat("target=".concat("_blank")).concat(">Risk Management website</a>.</b></p>")); */
var changeText = "<p><b>Note: The CSUF Volunteer Release Form for Minors must be completed by your parent/guardian and can be found on the ".concat("<a href=".concat("https://hr.fullerton.edu/forms ").concat("target=".concat("_blank")).concat(">Risk Management website</a>.")).
concat(" Once signed, upload the completed form to the Supporting Documents tab.</b></p>");

$("#HyperlinkintegratedText").html(changeText);
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_riskmanagementtext_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_riskmanagementtext_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_NoCB4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_NoCB4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            	
if(this.value == "1"){
  YesCB4.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_YesCB4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_YesCB4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value == "1"){
  NoCB4.value = null;
  ReqSupervisorsName.enabled = true;
  ReqSupervisorsName.visible = true;
  ReqSupervisorsExt.enabled = true;
  ReqSupervisorsExt.visible = true;
  IfYesPleaseText.visible =  true;
  ReqSupervisorsName.mandatory = false;
}else{
  ReqSupervisorsName.enabled = false;
  ReqSupervisorsName.visible = false;
  ReqSupervisorsExt.enabled = false;
  ReqSupervisorsExt.visible = false;
  ReqSupervisorsName.value = null; 
  IfYesPleaseText.visible =  false;
  ReqSupervisorsName.mandatory = false;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_IfYesPleaseText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_IfYesPleaseText_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ReqSupervisorsName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ReqSupervisorsName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ReqSupervisorsExt_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ReqSupervisorsExt_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorsLastName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorsLastName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    var appResult = [];
    if (this.value !== null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getVolunteerData",
            data: {
                action: "VOLUNTEER_SUPERVISOR_SEARCH",
                lastName: this.value
            },
            dataType: 'json',
            success: function(fundApproverResult) {
                if (fundApproverResult.length !== 0) {
                   
                    for (var i = 0; i < fundApproverResult.length; i++) {
                        var item = fundApproverResult[i].FIRSTNAME + " " + fundApproverResult[i].LASTNAME;
                       // DeptName.value = fundApproverResult[i].DEPTTITLE;
                      //SupervisorEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                      //  SupervisorEmail.value = fundApproverResult[i].EMAILID; 
                    //  SupervisorEmail.value = "mepacheco@fullerton.edu";
                        //var uid = fundApproverResult[i].USERID;
                        var uid = fundApproverResult[i].EMAILID;
                        var idItem = i + 1;
                        //var jbcode = item.text;
                        appResult.push(item + " - " + uid);
                    }
                    SupervisorsNameDD.value = "";
                    SupervisorsNameDD.items = appResult;

                } else {
                    showErrorModal("Alert!", "No matching records found");
                    SupervisorsNameDD.items = [];
                    SupervisorsNameDD.value = "";
                    SupervisorSearchName.value = "";
                    SupervisorSearchUserId.value = "";
                    SupervisorSearchEmailId.value = "";
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorsNameDD_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorsNameDD_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null)   {
    var approverName = this.value;
    var approverEmplId;
  var approverEmailId;
  var approverUserId;
   
  if (approverName !== "") {      
 	 approverUserName = approverName.substr(0, approverName.indexOf(' - '));
        SupervisorSearchName.value = approverUserName;
      SupervisorName.value = approverUserName;
     approverEmailId = approverName.substr(approverName.indexOf(' - ')+2, approverName.length-1);
     approverUserId =  approverEmailId.substr(1, approverEmailId.indexOf('@')-1);
     SupervisorSearchUserId.value = approverUserId;
     SupervisorEmail.value = "lpogge@fullerton.edu";
     // SupervisorEmail.value = "soumya.ravindra@thoughtfocus.com";
     // SupervisorSearchEmailId.value = approverEmailId;
   //SupervisorSearchEmailId.value = "soumya.ravindra@thoughtfocus.com";
   SupervisorSearchEmailId.value = "lpogge@fullerton.edu";
  }
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorsNameDD_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorsNameDD_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null)   {
    var approverName = this.value;
    var approverEmplId;
  var approverEmailId;
  var approverUserId;
   
  if (approverName !== "") {      
 	 approverUserName = approverName.substr(0, approverName.indexOf(' - '));
        SupervisorSearchName.value = approverUserName;
      SupervisorName.value = approverUserName;
     approverEmailId = approverName.substr(approverName.indexOf(' - ')+2, approverName.length-1);
     approverUserId =  approverEmailId.substr(1, approverEmailId.indexOf('@')-1);
     SupervisorSearchUserId.value = approverUserId;
   SupervisorEmail.value = "mepacheco@fullerton.edu";
   //  SupervisorEmail.value = "csufaemform@gmail.com";
    //  SupervisorEmail.value =  approverEmailId;
    //  SupervisorSearchEmailId.value = approverEmailId;
    //  SupervisorSearchEmailId.value = "csufaemform@gmail.com";
   SupervisorSearchEmailId.value = "mepacheco@fullerton.edu";
    if(this.value !== null){
      $.ajax({
        	type: 'GET',
       		url: "/bin/getVolunteerData",
        data: { 
        	action: "DEPARTMENT_DETAILS",
        	userID: approverUserId 
        },
        dataType: 'json', 
        success: function(response) { 
          debugger;
        if (response.length !== 0) {
                    for (var i = 0; i < response.length; i++) {
                        DeptName.value = response[i].DEPTTITLE;
                    } 
        }else{
          DeptName.value = "";
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
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptName_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value === null){
    var appResult = [];
        $.ajax({
            type: 'GET',
            url: "/bin/getVolunteerData",
            data: {
                action: "DEPARTMENT_DETAILS",
            },
            dataType: 'json',
            success: function(fundApproverResult) {
                if (fundApproverResult.length !== 0) {
                    for (var i = 0; i < fundApproverResult.length; i++) {
                        var item = fundApproverResult[i].DEPTNAME;                         
                        appResult.push(item);
                    }
                    DeptName.value = "";
                    DeptName.items = appResult;

                } else {
                    showErrorModal("Alert!", "No matching records found");
                    DeptName.items = [];
                    DeptName.value = "";
                }
            }
        });
}

        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_StartDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_StartDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if(StageIndicator.value === "ToSupervisor"){
	  this.enabled = false;

  this.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_StartDate_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_StartDate_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(this.value > EndDate.value){
   showErrorModal("Alert !", "Please Enter the Valid Date");
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_EndDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_EndDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if(StageIndicator.value == "ToSupervisor"){
var dateStr = StartDate.value;
var dateObj = new Date(dateStr);
this.enabled = false;
dateObj.setFullYear(dateObj.getFullYear() + 1);

EndDate.value = dateObj.toISOString().split('T')[0];
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorNoCB2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorNoCB2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "2"){
 // SupervisorNoCB2.value = null;
  textdraw_131515801694686162446.visible = true;
}
else{
  textdraw_131515801694686162446.visible = false;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_textdraw_131515801694686162446_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_textdraw_131515801694686162446_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorNoCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorNoCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;

if (this.value == "2") { 
  if(OlliTrolleyCB.value === null && AutoCB.value === null && SUVCB.value === null && AutoSUVCB.value === null && PersonalCB.value === null && CartCB.value === null && VanPCB.value === null && StateCB.value === null && BucketCB.value === null){
    debugger;
   showErrorModal("Alert !", "Please Select What kind of vehicle you prefer");
   // guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].OlliTrolleyCB[0]]");
}
  OlliTrolleyCB.enabled = true;
  AutoCB.enabled = true;
  SUVCB.enabled = true; 
  PersonalCB.enabled = true;
  CartCB.enabled = true;
  StateCB.enabled = true;
   AutoSUVCB.enabled = true;
   VanPCB.enabled = true;
  BucketCB.enabled = true;
  RoadNoCB.visible = true;
  RoadNoCB.mandatory = true;
  textdraw_15224519331694685.visible = true;
  textdraw_923187999176.visible = true;
}
else{ 
  OlliTrolleyCB.enabled = false;
  OlliTrolleyCB.value = null;
  AutoCB.enabled = false;
  AutoCB.value = null;
  SUVCB.enabled = false;
  SUVCB.value = null;
  PersonalCB.enabled = false;
  PersonalCB.value = null;
  CartCB.enabled = false;
  CartCB.value = null;
  StateCB.enabled = false;
  StateCB.value = null;
     AutoSUVCB.enabled = false;
   VanPCB.enabled = false;
  BucketCB.enabled = false;
     AutoSUVCB.value = null;
   VanPCB.value = null;
  BucketCB.value = null;
      RoadNoCB.visible = false;
  textdraw_15224519331694685.visible = false;
   textdraw_923187999176.visible = false;

}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_AutoSUVCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_AutoSUVCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;

        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_AutoSUVCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_AutoSUVCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if ((SupervisorNoCB.value == "2") && (this.value === null && VanPCB.value === null && AutoCB.value === null && SUVCB.value === null && CartCB.value === null && OlliTrolleyCB.value === null && StateCB.value === null && PersonalCB.value === null && BucketCB.value === null)){
   showErrorModal("Alert !", "Please Select What kind of vehicle you prefer");
 //   guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].OlliTrolleyCB[0]]");
  SupervisorNoCB.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_VanPCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_VanPCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            
this.enabled = false;

        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_VanPCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_VanPCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if ((SupervisorNoCB.value == "2") && (AutoPCB.value === null && VanPCB.value === null && AutoCB.value === null && SUVCB.value === null && CartCB.value === null && OlliTrolleyCB.value === null && StateCB.value === null && PersonalCB.value === null && BucketCB.value === null)){
   showErrorModal("Alert !", "Please Select What kind of vehicle you prefer");
 //   guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].OlliTrolleyCB[0]]");
  SupervisorNoCB.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_VanPCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_VanPCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1" || SUVCB.value == "1"){
  textdraw_1.visible = true;
  OCB.visible = true;
  OCB.mandatory =true;
}
else{
  textdraw_1.visible = false;
  OCB.visible = false;
  OCB.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_AutoCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_AutoCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            
  this.enabled = false;

        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_AutoCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_AutoCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if ((SupervisorNoCB.value == "2") && (AutoPCB.value === null && VanPCB.value === null && AutoCB.value === null && SUVCB.value === null && CartCB.value === null && OlliTrolleyCB.value === null && StateCB.value === null && PersonalCB.value === null && BucketCB.value === null)){
   showErrorModal("Alert !", "Please Select What kind of vehicle you prefer");
 //   guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].OlliTrolleyCB[0]]");
  SupervisorNoCB.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SUVCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SUVCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            
  this.enabled = false;

        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SUVCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SUVCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if ((SupervisorNoCB.value == "2") && (AutoPCB.value === null && VanPCB.value === null && AutoCB.value === null && SUVCB.value === null && CartCB.value === null && OlliTrolleyCB.value === null && StateCB.value === null && PersonalCB.value === null && BucketCB.value === null)){
   showErrorModal("Alert !", "Please Select What kind of vehicle you prefer");
 //   guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].OlliTrolleyCB[0]]");
  SupervisorNoCB.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SUVCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SUVCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1" || VanPCB.value == "1"){
  textdraw_1.visible = true;
  OCB.visible = true;
  OCB.mandatory = true;
}
else{
  textdraw_1.visible = false;
  OCB.visible = false;
  OCB.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CartCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CartCB_init0 = function (scope) {
    with(this) {
        with(scope) {
              this.enabled = false;


        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CartCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CartCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if ((SupervisorNoCB.value == "2") && (AutoPCB.value === null && VanPCB.value === null && AutoCB.value === null && SUVCB.value === null && CartCB.value === null && OlliTrolleyCB.value === null && StateCB.value === null && PersonalCB.value === null && BucketCB.value === null)){
   showErrorModal("Alert !", "Please Select What kind of vehicle you prefer");
 //   guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].OlliTrolleyCB[0]]");
  SupervisorNoCB.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_OlliTrolleyCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_OlliTrolleyCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            
  this.enabled = false;

        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_OlliTrolleyCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_OlliTrolleyCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if ((SupervisorNoCB.value == "2") && (AutoPCB.value === null && VanPCB.value === null && AutoCB.value === null && SUVCB.value === null && CartCB.value === null && OlliTrolleyCB.value === null && StateCB.value === null && PersonalCB.value === null && BucketCB.value === null)){
   showErrorModal("Alert !", "Please Select What kind of vehicle you prefer");
 //   guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].OlliTrolleyCB[0]]");
  SupervisorNoCB.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_StateCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_StateCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            
  this.enabled = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_StateCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_StateCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if ((SupervisorNoCB.value == "2") && (AutoPCB.value === null && VanPCB.value === null && AutoCB.value === null && SUVCB.value === null && CartCB.value === null && OlliTrolleyCB.value === null && StateCB.value === null && PersonalCB.value === null && BucketCB.value === null)){
   showErrorModal("Alert !", "Please Select What kind of vehicle you prefer");
 //   guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].OlliTrolleyCB[0]]");
  SupervisorNoCB.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_PersonalCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_PersonalCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            
  this.enabled = false;


        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_PersonalCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_PersonalCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if ((SupervisorNoCB.value == "2") && (AutoPCB.value === null && VanPCB.value === null && AutoCB.value === null && SUVCB.value === null && CartCB.value === null && OlliTrolleyCB.value === null && StateCB.value === null && PersonalCB.value === null && BucketCB.value === null)){
   showErrorModal("Alert !", "Please Select What kind of vehicle you prefer");
 //   guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].OlliTrolleyCB[0]]");
  SupervisorNoCB.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_BucketCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_BucketCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            
  this.enabled = false;


        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_BucketCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_BucketCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if ((SupervisorNoCB.value == "2") && (AutoPCB.value === null && VanPCB.value === null && AutoCB.value === null && SUVCB.value === null && CartCB.value === null && OlliTrolleyCB.value === null && StateCB.value === null && PersonalCB.value === null && BucketCB.value === null)){
   showErrorModal("Alert !", "Please Select What kind of vehicle you prefer");
 //   guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].OlliTrolleyCB[0]]");
  SupervisorNoCB.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_textdraw_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_textdraw_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_OCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_OCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_OCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_OCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "2"){
  textdraw_123.visible = true;
  Occupants.visible = true;
  Occupants.mandatory =true;
}
else{
  textdraw_123.visible = false;
  Occupants.visible = false;
  Occupants.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_textdraw_123_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_textdraw_123_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_Occupants_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_Occupants_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_AutoclavesCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_AutoclavesCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_AutoclavesCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_AutoclavesCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_BloodCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_BloodCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_BloodCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_BloodCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CentrifugeCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CentrifugeCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CentrifugeCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CentrifugeCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChemicalsCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChemicalsCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChemicalsCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChemicalsCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CompressedCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CompressedCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CompressedCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CompressedCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CryoCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CryoCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CryoCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_CryoCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DCMCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DCMCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DCMCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DCMCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_FormalCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_FormalCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_FormalCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_FormalCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_LasersCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_LasersCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_LasersCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_LasersCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_PaintsCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_PaintsCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_PaintsCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_PaintsCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_PowerCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_PowerCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_PowerCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_PowerCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RadiationCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RadiationCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RadiationCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RadiationCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SawsCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SawsCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SawsCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SawsCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SharpsCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SharpsCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SharpsCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SharpsCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_WorkCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_WorkCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  NoneOfTheAbove.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_WorkCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_WorkCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorOtherCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorOtherCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if(this.value == "1"){
  
  NoneOfTheAbove.value = null;
  SupervisorOtherTF.enabled = true;
  SupervisorOtherTF.mandatory = true;


}else{
  SupervisorOtherTF.enabled = false;
  SupervisorOtherTF.value = null;
  SupervisorOtherTF.mandatory = false;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorOtherCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorOtherCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null && CryoCB.value === null && DCMCB.value === null && PaintsCB.value === null && PowerCB.value === null && SawsCB.value === null && WorkCB.vale === null){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorOtherTF_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorOtherTF_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_NoneOfTheAbove_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_NoneOfTheAbove_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  RadiationCB.value = null;
  LasersCB.value = null; 
  ChemicalsCB.value = null; 
  BloodCB.value = null; 
  SharpsCB.value = null; 
  AutoclavesCB.value = null; 
  CentrifugeCB.value = null; 
  CompressedCB.value = null; 
  FormalCB.value = null; 
  SupervisorOtherCB.value = null; 
  SupervisorOtherTF.value = null;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_NoneOfTheAbove_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_NoneOfTheAbove_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null && CryoCB.value === null && DCMCB.value === null && PaintsCB.value === null && PowerCB.value === null && SawsCB.value === null && WorkCB.vale === null){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    SupervisorCB.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_textdraw1733392156092_copy_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_textdraw1733392156092_copy_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToSupervisor"){
  this.visible = true;
}
else{
  this.visible = false;
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_supportDoc1_valueCommit0 = function (scope) {
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
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_supportDoc2_valueCommit0 = function (scope) {
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
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_supportDoc3_valueCommit0 = function (scope) {
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
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_VolunteerSdate_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_VolunteerSdate_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if (VolunteerSdate.value === null) {
   if(Training.value === null && driving.value === null && Minor.value === null) {

        showErrorModal("Alert !", "Please Select the Criteria Type");


        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SignatureACK[0].RiskManagementPanel[0].Training[0]");


		RiskCB.value = "";
        RiskPrintName.value = "";
        RiskSignature.value = "";
        RiskDate.value = "";
   }
    
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_Training_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_Training_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if (this.value === null) {
   if(VolunteerSdate.value === null && driving.value === null && Minor.value === null) {

        showErrorModal("Alert !", "Please Select the Criteria Type");


        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SignatureACK[0].RiskManagementPanel[0].Training[0]");


		RiskCB.value = "";
        RiskPrintName.value = "";
        RiskSignature.value = "";
        RiskDate.value = "";
   }
    
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_driving_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_driving_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if (this.value === null) {
   if(Training.value === null && VolunteerSdate.value === null && Minor.value === null) {

        showErrorModal("Alert !", "Please Select the Criteria Type");


        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SignatureACK[0].RiskManagementPanel[0].Training[0]");


		RiskCB.value = "";
        RiskPrintName.value = "";
        RiskSignature.value = "";
        RiskDate.value = "";
   }
    
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_Minor_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_Minor_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if (this.value === null) {
   if(Training.value === null && VolunteerSdate.value === null && driving.value === null) {

        showErrorModal("Alert !", "Please Select the Criteria Type");


        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SignatureACK[0].RiskManagementPanel[0].Training[0]");


		RiskCB.value = "";
        RiskPrintName.value = "";
        RiskSignature.value = "";
        RiskDate.value = "";
   }
    
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RiskCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RiskCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (StageIndicator.value == "ToRiskManagement") {
        if (RiskDate.value === null) {
            

            RiskDate.enabled = false;
            $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                    RiskPrintName.value = userValue;
                  RiskSignature.value = userValue;
                  RiskDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    RiskPrintName.value = "";
  RiskSignature.value = "";
    RiskDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RiskCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RiskCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if (VolunteerSdate.value === null && Training.value === null && driving.value === null && Minor.value === null) {
    showErrorModal("Alert !", "Please Select the Criteria Type");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SignatureACK[0].RiskManagementPanel[0].Training[0]");
    this.value = null;
    RiskPrintName.value = "";
    RiskSignature.value = "";
    RiskDate.value = "";
} 
else if (this.value == 1) {
   /* if (StageIndicator.value == "ToRiskManagement") {
        if (RiskDate.value === null) {
            

            RiskDate.enabled = false;
            $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                    RiskPrintName.value = userValue;
                  RiskSignature.value = userValue;
                  RiskDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });         */ 
          
          
          if (StageIndicator.value === "ToRiskManagement") {
        if (RiskDate.value === null) {
            

            RiskDate.enabled = false;
            
          $.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				RiskPrintName.value = userValue;
				RiskSignature.value = userValue;
				RiskDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});

        } 
    }
} else {
    RiskPrintName.value = "";
  RiskSignature.value = "";
    RiskDate.value = "";
}


        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RiskPrintName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RiskPrintName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RiskSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RiskSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RiskDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_RiskDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeanCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeanCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
   /* if (StageIndicator.value == "ToDean") {
        if (DeanDate2.value === null) {
            

            DeanDate2.enabled = false;
            $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                    DeanName.value = userValue;
                  DeanSign.value = userValue;
                  DeanDate2.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });       */
          
          if (StageIndicator.value === "ToDean") {
        if (DeanDate2.value === null) {
            

            DeanDate2.enabled = false;
            
          $.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				DeanName.value = userValue;
				DeanSign.value = userValue;
				DeanDate2.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});

        } 
    }
} else {
    DeanName.value = "";
  DeanSign.value = "";
    DeanDate2.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeanName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeanName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeanSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeanSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeanDate2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeanDate2_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChairSignPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChairSignPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChairCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChairCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
  /*  if (StageIndicator.value == "ToChair") {
        if (Chair1Date.value === null) {
            

            Chair1Date.enabled = false;
            $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  Chair1PrintName.value = userValue;
                    Chair1Signature.value = userValue;
                  Chair1Date.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });      */
          
          if (StageIndicator.value === "ToChair") {
        if (Chair1Date.value === null) {
            

            Chair1Date.enabled = false;
            
          $.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				Chair1PrintName.value = userValue;
				Chair1Signature.value = userValue;
				Chair1Date.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});

        } 
    }
} else {
    Chair1PrintName.value = "";
    Chair1Signature.value = "";
  Chair1Date.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_Chair1PrintName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_Chair1PrintName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_Chair1Signature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_Chair1Signature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_Chair1Date_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_Chair1Date_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptCooCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptCooCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
   /* if (StageIndicator.value == "ToDepartmentCoordinator") {
        if (DeptCoDate3.value === null) {
            

            DeptCoDate3.enabled = false;
            $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  DeptChairName.value = userValue;
                    DeptChairSign.value = userValue;
                  DeptCoDate3.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });   */
          
          if (StageIndicator.value === "ToDepartmentCoordinator") {
        if (DeptCoDate3.value === null) {
            

            DeptCoDate3.enabled = false;
            
          $.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				DeptChairName.value = userValue;
				DeptChairSign.value = userValue;
				DeptCoDate3.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});

        } 
    }
} else {
    DeptChairName.value = "";
    DeptChairSign.value = "";
  DeptCoDate3.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptChairName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptChairName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptChairSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptChairSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptCoDate3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptCoDate3_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChairRbYN_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChairRbYN_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  ChairSearchPanel.visible = true;
  ChairSearchPanel.enabled = true;
  ChairLastName.mandatory = true;
  ChairNameDD.mandatory = true;
  //ChairSignPanel.visible = true;
  //ChairSignPanel.enabled = true;
  //ChairCB.mandatory = true;
  //deanLastName2.mandatory = true;
  
}else{
 // ChairSignPanel.visible = false;
  //ChairSignPanel.enabled = false;
  ChairLastName.value = null;
  ChairNameDD.value = null;
  ChairSearchPanel.visible = false;
  ChairSearchPanel.enabled = false;
 /* ChairCB.value = null;
  deanLastName2.value = null;
  DeanNameDD2.value = null;*/
}

if(this.value == "2"){
   ChairLastName.value = null;
  ChairNameDD.value = null;
  ChairSearchPanel.visible = false;
  ChairSearchPanel.enabled = false; 
}
  /*DeanSearchPanel.visible = true;
  DeanSearchPanel.enabled = true;
  deanLastName.mandatory = true;
  DeanNameDD.mandatory = true;
  
else{
  DeanSearchPanel.visible = false;
  DeanSearchPanel.enabled = false;
  deanLastName.value = null;
  DeanNameDD.value = null;
}*/
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChairSearchPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChairSearchPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChairLastName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChairLastName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === "ToDepartmentCoordinator") {
    var appResult = [];
    if (this.value !== null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getFAERData",
            data: {
                action: "FAER_SEARCH_APPROVER",
                lastName: this.value
            },
            dataType: 'json',
            success: function(fundApproverResult) {
                if (fundApproverResult.length !== 0) {
                   // appResult.push("Select Optional Reviewer");
                    for (var i = 0; i < fundApproverResult.length; i++) {
                        var item = fundApproverResult[i].FIRSTNAME + " " + fundApproverResult[i].LASTNAME;
                        //var uid = fundApproverResult[i].USERID;
                        var uid = fundApproverResult[i].EMAILID;
                        var idItem = i + 1;
                        //var jbcode = item.text;
                        appResult.push(item + " - " + uid);
                    }
                    ChairNameDD.value = "";
                    ChairNameDD.items = appResult;

                } else {
                    showErrorModal("Alert!", "No matching records found");
                    ChairNameDD.items = [];
                    ChairNameDD.value = "";
                    ChairSearchName.value = "";
                    ChairSearchUserId.value = "";
                    ChairSearchEmailId.value = "";
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChairLastName_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChairLastName_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === "ToDepartmentCoordinator") {
    var appResult = [];
    if (this.value !== null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getVolunteerData",
            data: {
                action: "VOLUNTEER_SUPERVISOR_SEARCH",
                lastName: this.value
            },
            dataType: 'json',
            success: function(fundApproverResult) {
                if (fundApproverResult.length !== 0) {
                   // appResult.push("Select Optional Reviewer");
                    for (var i = 0; i < fundApproverResult.length; i++) {
                        var item = fundApproverResult[i].FIRSTNAME + " " + fundApproverResult[i].LASTNAME;
                        //var uid = fundApproverResult[i].USERID;
                        var uid = fundApproverResult[i].EMAILID;
                        var idItem = i + 1;
                        //var jbcode = item.text;
                        appResult.push(item + " - " + uid);
                    }
                    ChairNameDD.value = "";
                    ChairNameDD.items = appResult;

                } else {
                    showErrorModal("Alert!", "No matching records found");
                    ChairNameDD.items = [];
                    ChairNameDD.value = "";
                    ChairSearchName.value = "";
                    ChairSearchUserId.value = "";
                    ChairSearchEmailId.value = "";
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChairNameDD_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ChairNameDD_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value == "ToDepartmentCoordinator")   {
    var approverName = this.value;
    var approverEmplId;
  var approverEmailId;
  var approverUserId;
   
  if (approverName !== "") {      
 	 approverUserName = approverName.substr(0, approverName.indexOf(' - '));
      
      ChairSearchName.value = approverUserName;
     approverEmailId = approverName.substr(approverName.indexOf(' - ')+2, approverName.length-1);
     approverUserId =  approverEmailId.substr(1, approverEmailId.indexOf('@')-1);
     ChairSearchUserId.value = approverUserId;
   //  ChairSearchEmailId.value = approverEmailId;
   ChairSearchEmailId.value = "mepacheco@fullerton.edu";
//  ChairSearchEmailId.value = "csufaemform@gmail.com";
    
  }
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeanSearchPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeanSearchPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_deanLastName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_deanLastName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === "ToDepartmentCoordinator") {
    var appResult = [];
    if (this.value !== null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getFAERData",
            data: {
                action: "FAER_SEARCH_APPROVER",
                lastName: this.value
            },
            dataType: 'json',
            success: function(fundApproverResult) {
                if (fundApproverResult.length !== 0) {
                   // appResult.push("Select Optional Reviewer");
                    for (var i = 0; i < fundApproverResult.length; i++) {
                        var item = fundApproverResult[i].FIRSTNAME + " " + fundApproverResult[i].LASTNAME;
                        //var uid = fundApproverResult[i].USERID;
                        var uid = fundApproverResult[i].EMAILID;
                        var idItem = i + 1;
                        //var jbcode = item.text;
                        appResult.push(item + " - " + uid);
                    }
                    DeanNameDD.value = "";
                    DeanNameDD.items = appResult;

                } else {
                    showErrorModal("Alert!", "No matching records found");
                    DeanNameDD.items = [];
                    DeanNameDD.value = "";
                    DeanSearchName.value = "";
                    DeanSearchUserId.value = "";
                    DeanSearchEmailId.value = "";
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_deanLastName_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_deanLastName_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === "ToDepartmentCoordinator") {
    var appResult = [];
    if (this.value !== null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getVolunteerData",
            data: {
                action: "VOLUNTEER_SUPERVISOR_SEARCH",
                lastName: this.value
            },
            dataType: 'json',
            success: function(fundApproverResult) {
                if (fundApproverResult.length !== 0) {
                   // appResult.push("Select Optional Reviewer");
                    for (var i = 0; i < fundApproverResult.length; i++) {
                        var item = fundApproverResult[i].FIRSTNAME + " " + fundApproverResult[i].LASTNAME;
                        //var uid = fundApproverResult[i].USERID;
                        var uid = fundApproverResult[i].EMAILID;
                        var idItem = i + 1;
                        //var jbcode = item.text;
                        appResult.push(item + " - " + uid);
                    }
                    DeanNameDD.value = "";
                    DeanNameDD.items = appResult;

                } else {
                    showErrorModal("Alert!", "No matching records found");
                    DeanNameDD.items = [];
                    DeanNameDD.value = "";
                    DeanSearchName.value = "";
                    DeanSearchUserId.value = "";
                    DeanSearchEmailId.value = "";
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeanNameDD_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeanNameDD_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value == "ToDepartmentCoordinator")   {
    var approverName = this.value;
    var approverEmplId;
  var approverEmailId;
  var approverUserId;

  if (approverName !== "") {      
 	 approverUserName = approverName.substr(0, approverName.indexOf(' - '));
        DeanSearchName.value = approverUserName;
     
     approverEmailId = approverName.substr(approverName.indexOf(' - ')+2, approverName.length-1);
     approverUserId =  approverEmailId.substr(1, approverEmailId.indexOf('@')-1);
     DeanSearchUserId.value = approverUserId;
   //  DeanSearchEmailId.value = approverEmailId;
     DeanSearchEmailId.value = "mepacheco@fullerton.edu"; 
   //  DeanSearchEmailId.value = "csufaemform@gmail.com";
    
  }
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 


if ((SupervisorNoCB.value == "2") && (AutoSUVCB.value === null && VanPCB.value === null && AutoCB.value === null && SUVCB.value === null && CartCB.value === null && OlliTrolleyCB.value === null && StateCB.value === null && PersonalCB.value === null && BucketCB.value === null)){
    showErrorModal("Alert !", "Please Select What kind of vehicle you prefer");
   // guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].OlliTrolleyCB[0]]");
    this.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}

if(NoneOfTheAbove.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null && CryoCB.value === null && DCMCB.value === null && PaintsCB.value === null && PowerCB.value === null && SawsCB.value === null && WorkCB.vale === null){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
  //  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].textdraw_15859246841694674449660[0]");
    this.value = null;
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}



else if (this.value == 1) {
//if (this.value == 1) {
    if (StageIndicator.value === "ToSupervisor") {
        if (SupervisorDate.value === null) {
            

            SupervisorDate.enabled = false;
            
          $.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				SupervisorPrintName.value = userValue;
				SupervisorSignature.value = userValue;
				SupervisorDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
          
            /*
            $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {
                  action: "EMP_DETAILS"
                  
                },
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME; 
                  SupervisorPrintName.value = userValue;
                  SupervisorSignature.value = userValue;
                  SupervisorDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });  
            */

        } 
    }
} else {
    SupervisorPrintName.value = "";
    SupervisorSignature.value = "";
    SupervisorDate.value = "";
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === "ToSupervisor") {
    showErrorModal("Alert!", "All volunteers must submit the appropriate Executive Order (EO) 1083 acknowledgement. Additionally, minor volunteers must upload the CSUF Volunteer Release Form for Minors."); 
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorPrintName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorPrintName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_SupervisorDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptCoLastName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptCoLastName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === "ToSupervisor") {
    var appResult = [];
    if (this.value !== null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getVolunteerData",
            data: {
                action: "VOLUNTEER_SEARCH_APPROVER",
                lastName: this.value, 
                DivisionId : DivisionId.value
            },
            dataType: 'json',
            success: function(fundApproverResult) {
                if (fundApproverResult.length !== 0) {
                   // appResult.push("Select Optional Reviewer");
                    for (var i = 0; i < fundApproverResult.length; i++) {
                        var item = fundApproverResult[i].FIRSTNAME + " " + fundApproverResult[i].LASTNAME;
                        //var uid = fundApproverResult[i].USERID;
                        var uid = fundApproverResult[i].EMAILID;
                        var idItem = i + 1;
                        //var jbcode = item.text;
                        appResult.push(item + " - " + uid);
                    }
                    DeptCoDD.value = "";
                    DeptCoDD.items = appResult;

                } else {
                    showErrorModal("Alert!", "No matching records found");
                    DeptCoDD.items = [];
                    DeptCoDD.value = "";
                    DeptCoSearchName.value = "";
                    DeptCoSearchUserId.value = "";
                    DeptCoSearchEmailId.value = "";
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptCoLastName_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptCoLastName_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            
debugger;
if (StageIndicator.value === "ToSupervisor") {
    var appResult = [];
    if (this.value !== null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getVolunteerData",
            data: {
                action: "VOLUNTEER_SUPERVISOR_SEARCH",
                lastName: this.value
            },
            dataType: 'json',
            success: function(fundApproverResult) {
                if (fundApproverResult.length !== 0) {
                   // appResult.push("Select Optional Reviewer");
                    for (var i = 0; i < fundApproverResult.length; i++) {
                        var item = fundApproverResult[i].FIRSTNAME + " " + fundApproverResult[i].LASTNAME;
                        //var uid = fundApproverResult[i].USERID;
                        var uid = fundApproverResult[i].EMAILID;
                        var idItem = i + 1;
                        //var jbcode = item.text;
                        appResult.push(item + " - " + uid);
                    }
                    DeptCoDD.value = "";
                    DeptCoDD.items = appResult;

                } else {
                    showErrorModal("Alert!", "No matching records found");
                    DeptCoDD.items = [];
                    DeptCoDD.value = "";
                    DeptCoSearchName.value = "";
                    DeptCoSearchUserId.value = "";
                    DeptCoSearchEmailId.value = "";
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptCoDD_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptCoDD_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value == "ToSupervisor")   {
    var approverName = this.value;
    var approverEmplId;
  var approverEmailId;
  var approverUserId;
   
  if (approverName !== "") {      
 	 approverUserName = approverName.substr(0, approverName.indexOf(' - '));
         DeptCoSearchName.value = approverUserName;
   
     approverEmailId = approverName.substr(approverName.indexOf(' - ')+2, approverName.length-1);
     approverUserId =  approverEmailId.substr(1, approverEmailId.indexOf('@')-1);
     DeptCoSearchUserId.value = approverUserId;
   //  DeptCoSearchEmailId.value = approverEmailId;
    DeptCoSearchEmailId.value = "mepacheco@fullerton.edu"; 
   // DeptCoSearchEmailId.value = "csufaemform@gmail.com";
  }
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_VolunteerCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_VolunteerCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if (this.value === "1") { 
    ApprovalVolunteerSig.value = firstName.value+" "+lastName.value;
       VolunteerFullName.value = firstName.value+" "+lastName.value;
    ApprovalPrintName.value = firstName.value+" "+lastName.value;
}else {
   VolunteerFullName.value = "";
    ApprovalVolunteerSig.value = "";
    ApprovalPrintName.value = "";
}
  /*if (StageIndicator.value === null) {
if (this.value == 1) {

        if (ApprovalDate1.value === null) {
            

            ApprovalDate1.enabled = false;
            $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    //var userValue = myresopnse[0].EMP_NAME;
                  ApprovalVolunteerSig.value = firstName.value+" "+lastName.value;
                  //ApprovalDate1.value = myresopnse[0].SERVER_DATE;
                  ApprovalPrintName.value = firstName.value+" "+lastName.value;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }else {
    ApprovalDate1.value = "";
    ApprovalVolunteerSig.value = "";
    ApprovalPrintName.value = "";
}
} */
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_VolunteerCB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_VolunteerCB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            

/* if(this.value == "1"){
var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
 ApprovalDate1.value = d;
}else{
  ApprovalDate1.value = null;
} */

debugger; 
if(this.value == "1"){ 
  //if(StageIndicator.value === null || StageIndicator.value == "ToInitiator"){
	  ApprovalDate1.enabled = false;

  ApprovalDate1.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ApprovalPrintName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ApprovalPrintName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ApprovalVolunteerSig_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ApprovalVolunteerSig_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ApprovalDate1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ApprovalDate1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ApprovalDate1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_ApprovalDate1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 

/*if(VolunteerCB.value == "1"){
var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
 ApprovalDate1.value = d;
}else{
  ApprovalDate1.value = null;
}

*/

	
debugger; 
if(StageIndicator.value === null || StageIndicator.value == "ToInitiator"){
	  this.enabled = false;

  ApprovalDate1.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_HiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_HiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_DeptId_init0 = function (scope) {
    with(this) {
        with(scope) {
            	this.enabled=false;
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_workflow_initiator_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_workflow_initiator_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
$.ajax({

    type: 'GET',

    url: "/bin/getLoggedUserId",
    dataType: 'json',
    success: function(myresopnse) {
      //  gifModal.style.display = "block";
        
      workflow_initiator.value = myresopnse.userId;
    }
});
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_formTitle_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_formTitle_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.value = "CSUF Volunteer Form - Anonymous";
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            
     getPdf();


function getPdf() {
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            console.log("xml=" + result.data);
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/csuf-volunteer-form-external/csuf-volunteer-form-external');
            //jsonData.append('fileName', FirstName.value + "_" + LastName.value + "(" + EmplId.value + ")" + "_" + Date.now());
            jsonData.append('fileName', firstName.value + "_"+lastName.value+ "_" + Date.now());
            console.log("jsonData: " + jsonData);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/bin/getDoR', true);
            xhr.responseType = 'blob';
            xhr.send(jsonData);
            xhr.onload = function() {
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
                            blob = new File([this.response], filename, {
                                type: type
                            });
                        } catch (e) {
                            /* Edge */ }
                    }
                    if (typeof blob === 'undefined') {
                        blob = new Blob([this.response], {
                            type: type
                        });
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
                        setTimeout(function() {
                            URL.revokeObjectURL(downloadUrl);
                        }, 100); // cleanup
                    }
                }
            setFundSourceOptions();
			};
        },
        error: function(guideResultObject) {
            console.log("got error");
        },
        guideState: null,
        boundData: true
    });
}
function setFundSourceOptions(){
  for (k = 0; k < count; k++) {
            var fundPrgResult = JSON.parse(FundSourceData.value);
			if(fundPrgResult[0].CLASS_CODE.length !== 0){
            var classResult = [];
            for (var i = 0; i < fundPrgResult[0].CLASS_CODE.length; i++) {
				classResult.push(fundPrgResult[0].CLASS_CODE[i].CLASS);
            }
			FundDetails.instanceManager.instances[k].Class.items = classResult; 
            }
            if(fundPrgResult[0].FUND.length !== 0){
            var fundResult = [];
            for (var f = 0; f < fundPrgResult[0].FUND.length; f++) {              	
				fundResult.push(fundPrgResult[0].FUND[f].FUND_CODE);                
            }
			FundDetails.instanceManager.instances[k].Fund.items = fundResult; 
            }
            if(fundPrgResult[0].PROGRAM.length !== 0){
            var programResult = [];
            for (var p = 0; p < fundPrgResult[0].PROGRAM.length; p++) {
				programResult.push(fundPrgResult[0].PROGRAM[p].PROGRAM);
            }
			FundDetails.instanceManager.instances[k].Program.items = programResult; 
            }
            if(fundPrgResult[0].DEPT.length !== 0){
            var deptResult = [];
            for (var d = 0; d < fundPrgResult[0].DEPT.length; d++) {              	
				deptResult.push(fundPrgResult[0].DEPT[d].DEPTID);                
            }
			FundDetails.instanceManager.instances[k].FundDeptID.items = deptResult; 
            }	
            }
}
        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_saveguidedraft1629881233615_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_saveguidedraft1629881233615_click0 = function (scope) {
    with(this) {
        with(scope) {
             aftiaDescCWID.value = firstName.value + " " + lastName.value ;

handleDraftSave(this);


        }
	}
}
/**
 * @function csuf_volunteer_form_external_csuf_volunteer_form_external.generated_submit1600234699256_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
csuf_volunteer_form_external_csuf_volunteer_form_external.generated_submit1600234699256_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;

if(lastName.value === null || firstName.value === null || Address.value === null || City.value === null || State.value === null || ZipCode.value === null || PhoneNumber.value === null || VolunteerEmail.value === null || ContactName.value === null || ContactNumber.value === null){
  var errorList = [];
    guideBridge.validate(errorList);
}

else if(ContactName.value === null && ContactNumber.value === null ){
  showErrorModal("Alert !", "Please Enter all the details");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].VolunteerInformationPanel[0].ContactName[0]");
} 

/*else if(CSUFStudentCB.value === null && CSUFFacultyCB.value === null && CSUFStaffCB.value === null && OtherCB.value === null){
  showErrorModal("Alert !", "Please Select the Current Status");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].RequiredInformation[0].CSUFStudentCB[0]");
}*/
else if((NoCB2.value === null && YesCB2.value === null) || (NoCB1.value === null && YesCB1.value === null) || (NoCB3.value === null && YesCB3.value === null) || (NoCB4.value === null && YesCB4.value === null)) {
  showErrorModal("Alert !", "Please ensure that the following required fields are completed: 1. Do you have a Campus Wide Identification Number (CWID)? || 2. Have you ever been convicted of or charged with a crime? || 3. Are you 18 years of age or older? If no, please provide your date of birth. || 4. Have you volunteered at Cal State Fullerton in the past?");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].RequiredInformation[0].panel1694627557860[0].NoCB1[0]");
}
/*else if(YesCB1.value == "1" && cwid.value !== null){
  var cwidVal = CWID.value;
  if(cwidVal.length < 9 || cwidVal.length > 9){
    showErrorModal("Alert!", "Please ensure the CWID is 9 digit numeric characters.");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].VolunteerInformationPanel[0].RequiredInformation[0].panel1694627557860[0].cwid[0]");   
  }
}*/
else if(StageIndicator.value === "ToSupervisor"){
  if(NoTrainingCB.value === null && RadiationCB.value === null && LasersCB.value === null && ChemicalsCB.value === null && BloodCB.value === null && SharpsCB.value === null && AutoclavesCB.value === null && CentrifugeCB.value === null && CompressedCB.value === null && FormalCB.value === null && SupervisorOtherCB.value === null  ){
  showErrorModal("Alert !", "Please Select one of the Checkbox to indicate whether the volunteer will work with any of the following");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].supervisorPanel[0].supervisorSecondPanel[0].NoTrainingCB[0]");
}}else if(NoCB3.value === "1" && supportDoc1.value === ""){
  supportDoc1.mandatory = true;
  showErrorModal("Alert !", "Please atleast attach one Supporting document");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SupportingDocuments[0]");  
} 
else{
   submitAction();
}

debugger;
function submitAction(){
if(StageIndicator.value === null){
  if(cwid.value === null){
 aftiaDescCWID.value = firstName.value + " " + lastName.value;
  }else{
    aftiaDescCWID.value = firstName.value + " " + lastName.value + " " + cwid.value;
  }
 // EmailSubject.value = "Test - Volunteer Form - "+lastName.value+", "+firstName.value;
  var fname = firstName.value;
  EmailSubject.value = "CSUF Volunteer Form - "+lastName.value+", "+firstName.value;
  EmailSubject_Supervisor.value = "CSUF Volunteer Form - Supervisor Review "+ "(" +fname.substring(0, 1)+ "." +lastName.value+ ")";
  EmailSubject_DeptCo.value = "CSUF Volunteer Form - Dept. Coordinator Review (" +fname.substring(0, 1)+ "." +lastName.value+ ")";
  EmailSubject_Chair.value = "CSUF Volunteer Form - Dept. Chair Review (" +fname.substring(0, 1)+ "." +lastName.value+ ")";
  EmailSubject_Dean.value = "CSUF Volunteer Form - Dean/MPP Designee Review (" +fname.substring(0, 1)+ "." +lastName.value+ ")";
  EmailSubject_RiskManagement.value = "CSUF Volunteer Form - Risk Management Review (" +fname.substring(0, 1)+ "." +lastName.value+ ")";
  EmailSubject_Reject.value = "CSUF Volunteer Form Approval (" +fname.substring(0, 1)+ "." +lastName.value+ ")";
  EmailSubject_SendBack.value = "CSUF Volunteer Form - Review (" +fname.substring(0, 1)+ "." +lastName.value+ ")";
}

/*SupervisorSearchEmailId.value = "lpogge@fullerton.edu";
DeptCoSearchEmailId.value = "lpogge@fullerton.edu";
DeanSearchEmailId.value = "lpogge@fullerton.edu";
ChairSearchEmailId.value = "lpogge@fullerton.edu";*/
 
SupervisorSearchEmailId.value = "mepacheco@fullerton.edu";
DeptCoSearchEmailId.value = "mepacheco@fullerton.edu";
DeanSearchEmailId.value = "mepacheco@fullerton.edu";
ChairSearchEmailId.value = "mepacheco@fullerton.edu";
  
/*SupervisorSearchEmailId.value = "csufaemform@gmail.com";
DeptCoSearchEmailId.value = "csufaemform@gmail.com";
DeanSearchEmailId.value = "csufaemform@gmail.com";
ChairSearchEmailId.value = "csufaemform@gmail.com";*/


 guideBridge.submit();
}



        }
	}
}
