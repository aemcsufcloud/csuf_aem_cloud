/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  showErrorModal("Alert!", "Please make sure to save your work every 20-30 minutes and complete all the required fields.");
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  employeeInformation.enabled = true;
  additionalCriteria.enabled = true;
  comments.enabled = true;
  performanceGoalSetting.enabled = true;
  prePerflfEvalPanel.enabled = false;
  
  EmpSignaturePanel.visible = true;
  EmpSignaturePanel.enabled = true;
  EvaluatorSignaturePanel.visible = false;
  HRSignaturePanel.visible = false;
}

if(StageIndicator.value === "ToManager"){
  employeeInformation.enabled = false;
  additionalCriteria.enabled = false;
  comments.enabled = false;
  performanceGoalSetting.enabled = false;
  prePerflfEvalPanel.enabled = false;
  
  EmpSignaturePanel.visible = true;
  EmpSignaturePanel.enabled = false;
  EvaluatorSignaturePanel.visible = true;
  EvaluatorSignaturePanel.enabled = true;
  HRSignaturePanel.visible = false;
  if(AdminSign.value !== null){
    HRSignaturePanel.visible = true;
    HRSignaturePanel.enabled = false;
  }
}

if(StageIndicator.value === "ToHR"){
  employeeInformation.enabled = false;
  additionalCriteria.enabled = false;
  comments.enabled = false;
  performanceGoalSetting.enabled = false;
  prePerflfEvalPanel.enabled = false;
  
  EmpSignaturePanel.visible = true;
  EmpSignaturePanel.enabled = false;
  EvaluatorSignaturePanel.visible = true;
  EvaluatorSignaturePanel.enabled = false;
  HRSignaturePanel.visible = true;
  HRSignaturePanel.enabled = true;
}

        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_CopyRB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_CopyRB_init0 = function (scope) {
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
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_CopyRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_CopyRB_valueCommit0 = function (scope) {
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
      Staffposdesc.value = null;
       AthleticsEmp.value = null;
                        AthleticsImpToPos.value = null;
                        AtMeets.value = null;
                        AtDoesnotMeet.value = null;
EmpRCD.value = null;
CBID.value = null;
EvaluationType.value = null;
StaffFirstName.value = null;
StaffLastName.value = null;
Classification.value = null;
Range.value = null;
Department.value = null;
Department_ID.value = null;
EvaluatorsName.value = null;
EvaluatorsTitle.value = null;
Quality.value = null;
quality1.value = null;
quality2.value = null;
quality3.value = null;
quality4.value = null;
quality5.value = null;

Quantity.value = null;
Quantity1.value = null;
Quantity2.value = null;
Quantity3.value = null;
Quantity4.value = null;
Quantity5.value = null;

OralComm.value = null;
OC1.value = null;
OC2.value = null;
OC3.value = null;
OC4.value = null;
OC5.value = null;

InterpersonalSkills.value = null;
IPSkill1.value = null;
IPSkill2.value = null;
IPSkill3.value = null;
IPSkill4.value = null;
IPSkill5.value = null;

Initiative.value = null;
Initiative1.value = null;
Initiative2.value = null;
Initiative3.value = null;
Initiative4.value = null;
Initiative5.value = null;

ServiceOrientation.value = null;
SC1.value = null;
SC2.value = null;
SC3.value = null;
SC4.value = null;
SC5.value = null;

Adaptability.value = null;
Adaptability1.value = null;
Adaptability2.value = null;
Adaptability3.value = null;
Adaptability4.value = null;
Adaptability5.value = null;

JobKnowledge.value = null;
JK1.value = null;
JK2.value = null;
JK3.value = null;
JK4.value = null;
JK5.value = null;

DependReli.value = null;
DR1.value = null;
DR2.value = null;
DR3.value = null;
DR4.value = null;
DR5.value = null;

WrittenComm.value = null;
WC1.value = null;
WC2.value = null;
WC3.value = null;
WC4.value = null;
WC5.value = null;
ProbSolving.value = null;
ProbSol1.value = null;
ProbSol2.value = null;
ProbSol3.value = null;
ProbSol4.value = null;
ProbSol5.value = null;
LeadingOthers.value = null;
LeadOthers1.value = null;
LeadOthers2.value = null;
LeadOthers3.value = null;
LeadOthers4.value = null;
LeadOthers5.value = null;
Accepting.value = null;
Accepting1.value = null;
Accepting2.value = null;
Accepting3.value = null;
Accepting4.value = null;
Accepting5.value = null;
AddCriteria1.value = null;
AddCriteriaImpToPos1.value = null;
Additional1.value = null;
Additional2.value = null;
Additional3.value = null;
Additional4.value = null;
Additional5.value = null;
AdditionalCriteria1.value = null;
AdditionalCriteria2.value = null;
AdditionalCriteria3.value = null;
AdditionalCriteria4.value = null;

AdditionalCriteria5.value = null;
AddCriteria2.value = null;
AddCriteriaImpToPos2.value = null;
Additional6.value = null;
Additional7.value = null;
Additional8.value = null;

Additional9.value = null;
Additional10.value = null;
AdditionalCriteria6.value = null;
AdditionalCriteria7.value = null;
AdditionalCriteria8.value = null;
AdditionalCriteria9.value = null;

AdditionalCriteria10.value = null;
OverallRating.value = null;
supportFactorComments1.value = null;
supportFactorComments2.value = null;
performanceGoalComment1.value = null;
performanceGoalComment2.value = null;
performanceGoalComment3.value = null;
     
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
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_copyDataPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_copyDataPanel_init0 = function (scope) {
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
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Copy_EvalType_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Copy_EvalType_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Copy_ReviewPeriodFrom_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Copy_ReviewPeriodFrom_init0 = function (scope) {
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
var d = (lastYear+"-"+"7"+"-"+"1");
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
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Copy_ReviewPeriodTo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Copy_ReviewPeriodTo_init0 = function (scope) {
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
var d = (lastYear+"-"+"6"+"-"+"30");
this.value = d;
}else{
this.value = dateValue;
}
//this.visible = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Copy_button_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Copy_button_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
  if(Copy_EmpId.value == "80123456"){
 
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
            var actionType = "SPE_2579_COPY_DATA";
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
                        //var fromDt = (myresponse[0].REVIEWPERIODFROM).replace(" 00:00:00.0", "");
                        //ReviewPeriodFrom.value = fromDt;
                        //Row1.instanceManager.instances[i].EndDt.value = end_dt.substring(5, 7)+"-"+end_dt.substring(8, 10)+"-"+end_dt.substring(0, 4);
                        Staffposdesc.value = myresponse[0].STAFFPOSDESC;
                        EmpID.value = myresponse[0].EMPLID;
                        AthleticsEmp.value = myresponse[0].ATHLETICS_EMP;
                        AthleticsImpToPos.value = myresponse[0].ATHETICSEMP_RATING;
                        AtMeets.value = myresponse[0].ATHETICSEMP_RATING_1;
                        AtDoesnotMeet.value = myresponse[0].ATHETICSEMP_RATING_2;
                       
                        Quality.value = myresponse[0].QUALITY;
                        quality1.value = myresponse[0].QUALITY_RATING_1;
                      	quality2.value = myresponse[0].QUALITY_RATING_2;
                      	quality3.value = myresponse[0].QUALITY_RATING_3;
                      	quality4.value = myresponse[0].QUALITY_RATING_4;
                      	quality5.value = myresponse[0].QUALITY_RATING_5;
                        
                        Quantity.value = myresponse[0].QUANTITY;
                        Quantity1.value = myresponse[0].QUANTITY_RATING_1;
                      	Quantity2.value = myresponse[0].QUANTITY_RATING_2;
                      	Quantity3.value = myresponse[0].QUANTITY_RATING_3;
                      	Quantity4.value = myresponse[0].QUANTITY_RATING_4;
                      	Quantity5.value = myresponse[0].QUANTITY_RATING_5;
                      
                        OralComm.value = myresponse[0].ORALCOMM;
                        OC1.value = myresponse[0].OC_RATING_1;
                      	OC2.value = myresponse[0].OC_RATING_2;
                      	OC3.value = myresponse[0].OC_RATING_3;
                      	OC4.value = myresponse[0].OC_RATING_4;
                      	OC5.value = myresponse[0].OC_RATING_5;
                      
                        InterpersonalSkills.value = myresponse[0].INTERPERSONALSKILLS;
                        IPSkill1.value = myresponse[0].IPSKILL_RATING_1;
                      	IPSkill2.value = myresponse[0].IPSKILL_RATING_2;
                      	IPSkill3.value = myresponse[0].IPSKILL_RATING_3;
                      	IPSkill4.value = myresponse[0].IPSKILL_RATING_4;
                      	IPSkill5.value = myresponse[0].IPSKILL_RATING_5;
                      
                        Initiative.value = myresponse[0].INITIATIVE;
                        Initiative1.value = myresponse[0].INITIATIVE_RATING_1;
                      	Initiative2.value = myresponse[0].INITIATIVE_RATING_2;
                      	Initiative3.value = myresponse[0].INITIATIVE_RATING_3;
                      	Initiative4.value = myresponse[0].INITIATIVE_RATING_4;
                      	Initiative5.value = myresponse[0].INITIATIVE_RATING_5;                      
                       
                        ServiceOrientation.value = myresponse[0].SERVICEORIENTATION;
                        SC1.value = myresponse[0].SO1_RATING_1;
                      	SC2.value = myresponse[0].SO2_RATING_2;
                      	SC3.value = myresponse[0].SO3_RATING_3;
                      	SC4.value = myresponse[0].SO4_RATING_4;
                      	SC5.value = myresponse[0].SO5_RATING_5; 
                      
                        Adaptability.value = myresponse[0].ADAPTABILITY;
                        Adaptability1.value = myresponse[0].ADAPTABILITY_RATING_1;
                      	Adaptability2.value = myresponse[0].ADAPTABILITY_RATING_2;
                      	Adaptability3.value = myresponse[0].ADAPTABILITY_RATING_3;
                      	Adaptability4.value = myresponse[0].ADAPTABILITY_RATING_4;
                      	Adaptability5.value = myresponse[0].ADAPTABILITY_RATING_5; 
                      
                         JobKnowledge.value = myresponse[0].JOBKNOWLEDGE;
                        JK1.value = myresponse[0].JK1_RATING_1;
                      	JK2.value = myresponse[0].JK2_RATING_2;
                      	JK3.value = myresponse[0].JK3_RATING_3;
                      	JK4.value = myresponse[0].JK4_RATING_4;
                      	JK5.value = myresponse[0].JK5_RATING_5; 
                      
                        DependReli.value = myresponse[0].DEPENDRELI;
                        DR1.value = myresponse[0].DR1_RATING_1;
                      	DR2.value = myresponse[0].DR2_RATING_2;
                      	DR3.value = myresponse[0].DR3_RATING_3;
                      	DR4.value = myresponse[0].DR4_RATING_4;
                      	DR5.value = myresponse[0].DR5_RATING_5; 
                      
                        WrittenComm.value = myresponse[0].WRITTENCOMM;
                        WC1.value = myresponse[0].WC1_RATING_1;
                      	WC2.value = myresponse[0].WC2_RATING_2;
                      	WC3.value = myresponse[0].WC3_RATING_3;
                      	WC4.value = myresponse[0].WC4_RATING_4;
                      	WC5.value = myresponse[0].WC5_RATING_5; 
                        ProbSolving.value = myresponse[0].PROBSOLVING;
                        ProbSol1.value = myresponse[0].PROBSOL_RATING_1;
                      	ProbSol2.value = myresponse[0].PROBSOL_RATING_2;
                      	ProbSol3.value = myresponse[0].PROBSOL_RATING_3;
                      	ProbSol4.value = myresponse[0].PROBSOL_RATING_4;
                      	ProbSol5.value = myresponse[0].PROBSOL_RATING_5;
                        LeadingOthers.value = myresponse[0].LEADINGOTHERS;
                        LeadOthers1.value = myresponse[0].LEADOTHERS_RATING_1;
                      	LeadOthers2.value = myresponse[0].LEADOTHERS_RATING_2;
                      	LeadOthers3.value = myresponse[0].LEADOTHERS_RATING_3;
                      	LeadOthers4.value = myresponse[0].LEADOTHERS_RATING_4;
                      	LeadOthers5.value = myresponse[0].LEADOTHERS_RATING_5;
                        Accepting.value = myresponse[0].ACCEPTING;
                        Accepting1.value = myresponse[0].ACCEPTING_RATING_1;
                      	Accepting2.value = myresponse[0].ACCEPTING_RATING_2;
                      	Accepting3.value = myresponse[0].ACCEPTING_RATING_3;
                      	Accepting4.value = myresponse[0].ACCEPTING_RATING_4;
                      	Accepting5.value = myresponse[0].ACCEPTING_RATING_5;
                        AddCriteria1.value = myresponse[0].ADDCRITERIA_1;
                        AddCriteriaImpToPos1.value = myresponse[0].ADDITIONALCRITERIA1;
                      	Additional1.value = myresponse[0].ADDCRITERIA_RATING1;
                      	Additional2.value = myresponse[0].ADDCRITERIA_RATING2;
                      	Additional3.value = myresponse[0].ADDCRITERIA_RATING3;
                      	Additional4.value = myresponse[0].ADDCRITERIA_RATING4;
                         Additional5.value = myresponse[0].ADDCRITERIA_RATING5;
                      	AdditionalCriteria1.value = myresponse[0].ADDCRITERIA_COMMENT_1;
                      	AdditionalCriteria2.value = myresponse[0].ADDCRITERIA_COMMENT_2;
                      	AdditionalCriteria3.value = myresponse[0].ADDCRITERIA_COMMENT_3;
                      	AdditionalCriteria4.value = myresponse[0].ADDCRITERIA_COMMENT_4;
                      
                      AdditionalCriteria5.value = myresponse[0].ADDCRITERIA_COMMENT_5;
                         AddCriteria2.value = myresponse[0].ADDCRITERIA_2;
                      	AddCriteriaImpToPos2.value = myresponse[0].ADDITIONALCRITERIA2;
                      	Additional6.value = myresponse[0].ADDCRITERIA_RATING6;
                      	Additional7.value = myresponse[0].ADDCRITERIA_RATING7;
                      	Additional8.value = myresponse[0].ADDCRITERIA_RATING8;
                      
                      Additional9.value = myresponse[0].ADDCRITERIA_RATING9;
                         Additional10.value = myresponse[0].ADDCRITERIA_RATING10;
                      	AdditionalCriteria6.value = myresponse[0].ADDCRITERIA_COMMENT_6;
                      	AdditionalCriteria7.value = myresponse[0].ADDCRITERIA_COMMENT_7;
                      	AdditionalCriteria8.value = myresponse[0].ADDCRITERIA_COMMENT_8;
                      	AdditionalCriteria9.value = myresponse[0].ADDCRITERIA_COMMENT_9;
                      
                      AdditionalCriteria10.value = myresponse[0].ADDCRITERIA_COMMENT_10;
                         OverallRating.value = myresponse[0].OVERALLRATING;
                      	supportFactorComments1.value = myresponse[0].SUPPORTFACTOR_COMMENTS1;
                      	supportFactorComments2.value = myresponse[0].SUPPORTFACTOR_COMMENTS2;
                        performanceGoalComment1.value = myresponse[0].PERFORMANCE_GOAL_COMMENT1;
                      	performanceGoalComment2.value = myresponse[0].PERFORMANCE_GOAL_COMMENT2;
                      	performanceGoalComment3.value = myresponse[0].PERFORMANCE_GOAL_COMMENT3;
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
                        col.push("EMPLID");
                        //col.push("LASTNAME");
                        //col.push("FIRSTNAME");
                        col.push("DEPARTMENT_ID");
                        col.push("DEPARTMENT");
                        col.push("REVIEWPERIOD_FROM");
                        col.push("REVIEWPERIOD_TO");
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
                                   Staffposdesc.value = myresponse[n].STAFFPOSDESC;
                        EmpID.value = myresponse[n].EMPLID;
                        //EmpRCD.value = myresponse[n].EMPRCD;
                        //CBID.value = myresponse[n].CBID;
                        EvaluationType.value = myresponse[n].EVALUATION_TYPE;
                        AthleticsEmp.value = myresponse[n].ATHLETICS_EMP;
                        AthleticsImpToPos.value = myresponse[n].ATHETICSEMP_RATING;
                        AtMeets.value = myresponse[n].ATHETICSEMP_RATING_1;
                        AtDoesnotMeet.value = myresponse[n].ATHETICSEMP_RATING_2;
                        Quality.value = myresponse[n].QUALITY;
                        quality1.value = myresponse[n].QUALITY_RATING_1;
                      	quality2.value = myresponse[n].QUALITY_RATING_2;
                      	quality3.value = myresponse[n].QUALITY_RATING_3;
                      	quality4.value = myresponse[n].QUALITY_RATING_4;
                      	quality5.value = myresponse[n].QUALITY_RATING_5;
                        
                        Quantity.value = myresponse[n].QUANTITY;
                        Quantity1.value = myresponse[n].QUANTITY_RATING_1;
                      	Quantity2.value = myresponse[n].QUANTITY_RATING_2;
                      	Quantity3.value = myresponse[n].QUANTITY_RATING_3;
                      	Quantity4.value = myresponse[n].QUANTITY_RATING_4;
                      	Quantity5.value = myresponse[n].QUANTITY_RATING_5;
                      
                        OralComm.value = myresponse[n].ORALCOMM;
                        OC1.value = myresponse[n].OC_RATING_1;
                      	OC2.value = myresponse[n].OC_RATING_2;
                      	OC3.value = myresponse[n].OC_RATING_3;
                      	OC4.value = myresponse[n].OC_RATING_4;
                      	OC5.value = myresponse[n].OC_RATING_5;
                      
                        InterpersonalSkills.value = myresponse[n].INTERPERSONALSKILLS;
                        IPSkill1.value = myresponse[n].IPSKILL_RATING_1;
                      	IPSkill2.value = myresponse[n].IPSKILL_RATING_2;
                      	IPSkill3.value = myresponse[n].IPSKILL_RATING_3;
                      	IPSkill4.value = myresponse[n].IPSKILL_RATING_4;
                      	IPSkill5.value = myresponse[n].IPSKILL_RATING_5;
                      
                        Initiative.value = myresponse[n].INITIATIVE;
                        Initiative1.value = myresponse[n].INITIATIVE_RATING_1;
                      	Initiative2.value = myresponse[n].INITIATIVE_RATING_2;
                      	Initiative3.value = myresponse[n].INITIATIVE_RATING_3;
                      	Initiative4.value = myresponse[n].INITIATIVE_RATING_4;
                      	Initiative5.value = myresponse[n].INITIATIVE_RATING_5;                      
                       
                        ServiceOrientation.value = myresponse[n].SERVICEORIENTATION;
                        SC1.value = myresponse[n].SO1_RATING_1;
                      	SC2.value = myresponse[n].SO2_RATING_2;
                      	SC3.value = myresponse[n].SO3_RATING_3;
                      	SC4.value = myresponse[n].SO4_RATING_4;
                      	SC5.value = myresponse[n].SO5_RATING_5; 
                      
                        Adaptability.value = myresponse[n].ADAPTABILITY;
                        Adaptability1.value = myresponse[n].ADAPTABILITY_RATING_1;
                      	Adaptability2.value = myresponse[n].ADAPTABILITY_RATING_2;
                      	Adaptability3.value = myresponse[n].ADAPTABILITY_RATING_3;
                      	Adaptability4.value = myresponse[n].ADAPTABILITY_RATING_4;
                      	Adaptability5.value = myresponse[n].ADAPTABILITY_RATING_5; 
                      
                         JobKnowledge.value = myresponse[n].JOBKNOWLEDGE;
                        JK1.value = myresponse[n].JK1_RATING_1;
                      	JK2.value = myresponse[n].JK2_RATING_2;
                      	JK3.value = myresponse[n].JK3_RATING_3;
                      	JK4.value = myresponse[n].JK4_RATING_4;
                      	JK5.value = myresponse[n].JK5_RATING_5; 
                      
                        DependReli.value = myresponse[n].DEPENDRELI;
                        DR1.value = myresponse[n].DR1_RATING_1;
                      	DR2.value = myresponse[n].DR2_RATING_2;
                      	DR3.value = myresponse[n].DR3_RATING_3;
                      	DR4.value = myresponse[n].DR4_RATING_4;
                      	DR5.value = myresponse[n].DR5_RATING_5; 
                      
                        WrittenComm.value = myresponse[n].WRITTENCOMM;
                        WC1.value = myresponse[n].WC1_RATING_1;
                      	WC2.value = myresponse[n].WC2_RATING_2;
                      	WC3.value = myresponse[n].WC3_RATING_3;
                      	WC4.value = myresponse[n].WC4_RATING_4;
                      	WC5.value = myresponse[n].WC5_RATING_5; 
                        ProbSolving.value = myresponse[n].PROBSOLVING;
                        ProbSol1.value = myresponse[n].PROBSOL_RATING_1;
                      	ProbSol2.value = myresponse[n].PROBSOL_RATING_2;
                      	ProbSol3.value = myresponse[n].PROBSOL_RATING_3;
                      	ProbSol4.value = myresponse[n].PROBSOL_RATING_4;
                      	ProbSol5.value = myresponse[n].PROBSOL_RATING_5;
                        LeadingOthers.value = myresponse[n].LEADINGOTHERS;
                        LeadOthers1.value = myresponse[n].LEADOTHERS_RATING_1;
                      	LeadOthers2.value = myresponse[n].LEADOTHERS_RATING_2;
                      	LeadOthers3.value = myresponse[n].LEADOTHERS_RATING_3;
                      	LeadOthers4.value = myresponse[n].LEADOTHERS_RATING_4;
                      	LeadOthers5.value = myresponse[n].LEADOTHERS_RATING_5;
                        Accepting.value = myresponse[n].ACCEPTING;
                        Accepting1.value = myresponse[n].ACCEPTING_RATING_1;
                      	Accepting2.value = myresponse[n].ACCEPTING_RATING_2;
                      	Accepting3.value = myresponse[n].ACCEPTING_RATING_3;
                      	Accepting4.value = myresponse[n].ACCEPTING_RATING_4;
                      	Accepting5.value = myresponse[n].ACCEPTING_RATING_5;
                        AddCriteria1.value = myresponse[n].ADDCRITERIA_1;
                        AddCriteriaImpToPos1.value = myresponse[n].ADDITIONALCRITERIA1;
                      	Additional1.value = myresponse[n].ADDCRITERIA_RATING1;
                      	Additional2.value = myresponse[n].ADDCRITERIA_RATING2;
                      	Additional3.value = myresponse[n].ADDCRITERIA_RATING3;
                      	Additional4.value = myresponse[n].ADDCRITERIA_RATING4;
                         Additional5.value = myresponse[n].ADDCRITERIA_RATING5;
                      	AdditionalCriteria1.value = myresponse[n].ADDCRITERIA_COMMENT_1;
                      	AdditionalCriteria2.value = myresponse[n].ADDCRITERIA_COMMENT_2;
                      	AdditionalCriteria3.value = myresponse[n].ADDCRITERIA_COMMENT_3;
                      	AdditionalCriteria4.value = myresponse[n].ADDCRITERIA_COMMENT_4;
                      
                      AdditionalCriteria5.value = myresponse[n].ADDCRITERIA_COMMENT_5;
                         AddCriteria2.value = myresponse[n].ADDCRITERIA_2;
                      	AddCriteriaImpToPos2.value = myresponse[n].ADDITIONALCRITERIA2;
                      	Additional6.value = myresponse[n].ADDCRITERIA_RATING6;
                      	Additional7.value = myresponse[n].ADDCRITERIA_RATING7;
                      	Additional8.value = myresponse[n].ADDCRITERIA_RATING8;
                      
                      Additional9.value = myresponse[n].ADDCRITERIA_RATING9;
                         Additional10.value = myresponse[n].ADDCRITERIA_RATING10;
                      	AdditionalCriteria6.value = myresponse[n].ADDCRITERIA_COMMENT_6;
                      	AdditionalCriteria7.value = myresponse[n].ADDCRITERIA_COMMENT_7;
                      	AdditionalCriteria8.value = myresponse[n].ADDCRITERIA_COMMENT_8;
                      	AdditionalCriteria9.value = myresponse[n].ADDCRITERIA_COMMENT_9;
                      
                      AdditionalCriteria10.value = myresponse[n].ADDCRITERIA_COMMENT_10;
                         OverallRating.value = myresponse[n].OVERALLRATING;
                      	supportFactorComments1.value = myresponse[n].SUPPORTFACTOR_COMMENTS1;
                      	supportFactorComments2.value = myresponse[n].SUPPORTFACTOR_COMMENTS2;
                        performanceGoalComment1.value = myresponse[n].PERFORMANCE_GOAL_COMMENT1;
                      	performanceGoalComment2.value = myresponse[n].PERFORMANCE_GOAL_COMMENT2;
                      	performanceGoalComment3.value = myresponse[n].PERFORMANCE_GOAL_COMMENT3;
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
                       AthleticsEmp.value = null;
                        AthleticsImpToPos.value = null;
                        AtMeets.value = null;
                        AtDoesnotMeet.value = null;
                      Staffposdesc.value = null;
EmpRCD.value = null;
CBID.value = null;
EvaluationType.value = null;
StaffFirstName.value = null;
StaffLastName.value = null;
Classification.value = null;
Range.value = null;
Department.value = null;
Department_ID.value = null;
EvaluatorsName.value = null;
EvaluatorsTitle.value = null;
Quality.value = null;
quality1.value = null;
quality2.value = null;
quality3.value = null;
quality4.value = null;
quality5.value = null;

Quantity.value = null;
Quantity1.value = null;
Quantity2.value = null;
Quantity3.value = null;
Quantity4.value = null;
Quantity5.value = null;

OralComm.value = null;
OC1.value = null;
OC2.value = null;
OC3.value = null;
OC4.value = null;
OC5.value = null;

InterpersonalSkills.value = null;
IPSkill1.value = null;
IPSkill2.value = null;
IPSkill3.value = null;
IPSkill4.value = null;
IPSkill5.value = null;

Initiative.value = null;
Initiative1.value = null;
Initiative2.value = null;
Initiative3.value = null;
Initiative4.value = null;
Initiative5.value = null;

ServiceOrientation.value = null;
SC1.value = null;
SC2.value = null;
SC3.value = null;
SC4.value = null;
SC5.value = null;

Adaptability.value = null;
Adaptability1.value = null;
Adaptability2.value = null;
Adaptability3.value = null;
Adaptability4.value = null;
Adaptability5.value = null;

JobKnowledge.value = null;
JK1.value = null;
JK2.value = null;
JK3.value = null;
JK4.value = null;
JK5.value = null;

DependReli.value = null;
DR1.value = null;
DR2.value = null;
DR3.value = null;
DR4.value = null;
DR5.value = null;

WrittenComm.value = null;
WC1.value = null;
WC2.value = null;
WC3.value = null;
WC4.value = null;
WC5.value = null;
ProbSolving.value = null;
ProbSol1.value = null;
ProbSol2.value = null;
ProbSol3.value = null;
ProbSol4.value = null;
ProbSol5.value = null;
LeadingOthers.value = null;
LeadOthers1.value = null;
LeadOthers2.value = null;
LeadOthers3.value = null;
LeadOthers4.value = null;
LeadOthers5.value = null;
Accepting.value = null;
Accepting1.value = null;
Accepting2.value = null;
Accepting3.value = null;
Accepting4.value = null;
Accepting5.value = null;
AddCriteria1.value = null;
AddCriteriaImpToPos1.value = null;
Additional1.value = null;
Additional2.value = null;
Additional3.value = null;
Additional4.value = null;
Additional5.value = null;
AdditionalCriteria1.value = null;
AdditionalCriteria2.value = null;
AdditionalCriteria3.value = null;
AdditionalCriteria4.value = null;

AdditionalCriteria5.value = null;
AddCriteria2.value = null;
AddCriteriaImpToPos2.value = null;
Additional6.value = null;
Additional7.value = null;
Additional8.value = null;

Additional9.value = null;
Additional10.value = null;
AdditionalCriteria6.value = null;
AdditionalCriteria7.value = null;
AdditionalCriteria8.value = null;
AdditionalCriteria9.value = null;

AdditionalCriteria10.value = null;
OverallRating.value = null;
supportFactorComments1.value = null;
supportFactorComments2.value = null;
performanceGoalComment1.value = null;
performanceGoalComment2.value = null;
performanceGoalComment3.value = null;
                      EmpIdFlag.value = null;
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
                action:"SPE_2579_EMP_DETAILS"
            },
                        dataType: 'json',
                        success: function(response) { 
                          
                            if (response.length != "0") {
                              StaffFirstName.value = response[0].FIRST_NAME;
                                StaffLastName.value = response[0].LAST_NAME;
                                EmpName.value = response[0].FIRST_NAME+" "+response[0].LAST_NAME;
                              	CBID.value = response[0].UNION_CD;
                                Department_ID.value = response[0].DEPTID;
                                Department.value = response[0].DEPTNAME;
                                EmpRCD.value = response[0].EMPL_RCD;
                                Classification.value = response[0].DESCR;
                                Range.value = response[0].GRADE;
                                EvaluatorsName.value = response[0].SupervisorName;
                                EvaluatorsTitle.value = response[0].SupervisorTitle;
                                division.value = response[0].DIVSION;
                                divisionName.value = response[0].DIVISION_NAME;
                                EmpUserID.value = response[0].EMPUSERID;
                                EmpEmailID.value = "anupama.dhar@thoughtfocus.com";
								//EmpEmailID.value = response[0].EMAILID; ==
                                var firstName = StaffFirstName.value;
                                var lastName = StaffLastName.value;
                                var resultName = firstName.concat(" ");
                                resultName = resultName.concat(lastName);
                                ReferenceName1.value = resultName;
                                ReferenceName2.value = resultName;
                                ReferenceName3.value = resultName;
                                ReferenceName4.value = resultName;
                                ReferenceName5.value = resultName;
                                ReferenceName6.value = resultName;
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
                                            StaffFirstName.value = response[n].FIRST_NAME;
                                StaffLastName.value = response[n].LAST_NAME;
                                EmpName.value = response[n].FIRST_NAME+" "+response[n].LAST_NAME;
                              	CBID.value = response[n].UNION_CD;
                                Department_ID.value = response[n].DEPTID;
                                Department.value = response[n].DEPTNAME;
                                EmpRCD.value = response[n].EMPL_RCD;
                                Classification.value = response[n].DESCR;
                                Range.value = response[n].GRADE;
                                EvaluatorsName.value = response[n].SupervisorName;
                                EvaluatorsTitle.value = response[n].SupervisorTitle;
                                division.value = response[n].DIVSION;
                                divisionName.value = response[n].DIVISION_NAME;
                                EmpUserID.value = response[n].EMPUSERID; 
                                EmpEmailID.value ="anupama.dhar@thoughtfocus.com";
								//EmpEmailID.value = response[n].EMAILID; ==
                                var firstName = StaffFirstName.value;
                                var lastName = StaffLastName.value;
                                var resultName = firstName.concat(" ");
                                resultName = resultName.concat(lastName);
                                ReferenceName1.value = resultName;
                                ReferenceName2.value = resultName;
                                ReferenceName3.value = resultName;
                                ReferenceName4.value = resultName;
                                ReferenceName5.value = resultName;
                                ReferenceName6.value = resultName;
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
}else{
  showErrorModal("Alert!", "Please enter valid Employee ID");
}
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Copy_button_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Copy_button_click1 = function (scope) {
    with(this) {
        with(scope) {
                                    AthleticsEmp.value = "1";
                        AthleticsImpToPos.value = "1";
                        AtMeets.value = "1";
                        AtDoesnotMeet.value = "";
                       
                        Quality.value = "1";
                        quality1.value = "";
                      	quality2.value = "";
                      	quality3.value = "";
                      	quality4.value = "1";
                      	quality5.value = "";
                        
                        Quantity.value = "3";
                        Quantity1.value = "";
                      	Quantity2.value = "";
                      	Quantity3.value = "1";
                      	Quantity4.value = "";
                      	Quantity5.value = "";
                      
                        OralComm.value = "4";
                        OC1.value = "";
                      	OC2.value = "";
                      	OC3.value = "";
                      	OC4.value = "";
                      	OC5.value = "";
                      
                        InterpersonalSkills.value = "2";
                        IPSkill1.value = "";
                      	IPSkill2.value = "1";
                      	IPSkill3.value = "";
                      	IPSkill4.value = "";
                      	IPSkill5.value = "";
                      
                        Initiative.value = "3";
                        Initiative1.value = "1";
                      	Initiative2.value = "";
                      	Initiative3.value = "";
                      	Initiative4.value = "";
                      	Initiative5.value = "";                      
                       
                        ServiceOrientation.value = "1";
                        SC1.value = "";
                      	SC2.value = "";
                      	SC3.value = "";
                      	SC4.value = "";
                      	SC5.value = "1"; 
                      
                        Adaptability.value = "1";
                        Adaptability1.value = "1";
                      	Adaptability2.value = "";
                      	Adaptability3.value = "";
                      	Adaptability4.value = "";
                      	Adaptability5.value = "";
                      
                         JobKnowledge.value = "2";
                        JK1.value = "";
                      	JK2.value = "";
                      	JK3.value = "1";
                      	JK4.value = "";
                      	JK5.value = "";
                      
                        DependReli.value = "3";
                        DR1.value = "";
                      	DR2.value = "";
                      	DR3.value = "";
                      	DR4.value = "1";
                      	DR5.value = "";
                      
                        WrittenComm.value = "4";
                        WC1.value = "";
                      	WC2.value = "";
                      	WC3.value = "";
                      	WC4.value = "";
                      	WC5.value = "";
                        ProbSolving.value = "4";
                        ProbSol1.value = "";
                      	ProbSol2.value = "";
                      	ProbSol3.value = "";
                      	ProbSol4.value = "";
                      	ProbSol5.value = "";
                        LeadingOthers.value = "4";
                        LeadOthers1.value = "";
                      	LeadOthers2.value = "";
                      	LeadOthers3.value = "";
                      	LeadOthers4.value = "";
                      	LeadOthers5.value = "";
                        Accepting.value = "4";
                        Accepting1.value = "";
                      	Accepting2.value = "";
                      	Accepting3.value = "";
                      	Accepting4.value = "";
                      	Accepting5.value = "";
                     /*   AddCriteria1.value = myresponse[0].ADDCRITERIA_1;
                        AddCriteriaImpToPos1.value = myresponse[0].ADDITIONALCRITERIA1;
                      	Additional1.value = myresponse[0].ADDCRITERIA_RATING1;
                      	Additional2.value = myresponse[0].ADDCRITERIA_RATING2;
                      	Additional3.value = myresponse[0].ADDCRITERIA_RATING3;
                      	Additional4.value = myresponse[0].ADDCRITERIA_RATING4;
                         Additional5.value = myresponse[0].ADDCRITERIA_RATING5;
                      	AdditionalCriteria1.value = myresponse[0].ADDCRITERIA_COMMENT_1;
                      	AdditionalCriteria2.value = myresponse[0].ADDCRITERIA_COMMENT_2;
                      	AdditionalCriteria3.value = myresponse[0].ADDCRITERIA_COMMENT_3;
                      	AdditionalCriteria4.value = myresponse[0].ADDCRITERIA_COMMENT_4;
                      
                      AdditionalCriteria5.value = myresponse[0].ADDCRITERIA_COMMENT_5;
                         AddCriteria2.value = myresponse[0].ADDCRITERIA_2;
                      	AddCriteriaImpToPos2.value = myresponse[0].ADDITIONALCRITERIA2;
                      	Additional6.value = myresponse[0].ADDCRITERIA_RATING6;
                      	Additional7.value = myresponse[0].ADDCRITERIA_RATING7;
                      	Additional8.value = myresponse[0].ADDCRITERIA_RATING8;
                      
                      Additional9.value = myresponse[0].ADDCRITERIA_RATING9;
                         Additional10.value = myresponse[0].ADDCRITERIA_RATING10;
                      	AdditionalCriteria6.value = myresponse[0].ADDCRITERIA_COMMENT_6;
                      	AdditionalCriteria7.value = myresponse[0].ADDCRITERIA_COMMENT_7;
                      	AdditionalCriteria8.value = myresponse[0].ADDCRITERIA_COMMENT_8;
                      	AdditionalCriteria9.value = myresponse[0].ADDCRITERIA_COMMENT_9;
                      AdditionalCriteria10.value = myresponse[0].ADDCRITERIA_COMMENT_10;*/
                         OverallRating.value = "Meets and Frequently Exceeds Expectations";
                      	supportFactorComments1.value = "The quality of work that John Smith provides meets and frequently exceeds expectations";
                      	supportFactorComments2.value = "NA";
                        performanceGoalComment1.value = "NA";
                      	performanceGoalComment2.value = "NA";
                      	performanceGoalComment3.value = "NA";
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Copy_button_click2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Copy_button_click2 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value === null){
  if(Copy_EmpId.value == "80123456"){
  var modal = document.getElementById('myModal');
    modal.style.display = "block";
    var myresponse = [{"EMPLID": "80123456","EMPL_NAME": "John Smith","DEPARTMENT": "Financial Service","REVIEWPERIOD_FROM": "07/01/2022","REVIEWPERIOD_TO": "06/30/2023","EVALUATION_TYPE": "Annual"},{"EMPLID": "80123456","EMPL_NAME": "John Smith","DEPARTMENT": "Financial Service","REVIEWPERIOD_FROM": "07/01/2022","REVIEWPERIOD_TO": "06/30/2023","EVALUATION_TYPE": "Temporary"}];
    var col = [];
    col.push("EMPLID");
    //col.push("LASTNAME");
    //col.push("FIRSTNAME");
    col.push("EMPL_NAME");
    col.push("DEPARTMENT");
    col.push("REVIEWPERIOD_FROM");
    col.push("REVIEWPERIOD_TO");
    col.push("EVALUATION_TYPE");
    var table = document.createElement("table");
    table.id = "tb";
    var tr = table.insertRow(-1);
    var headings = ["", "Emp ID", "Employee Name", "Dept Name", "Review Period From", "Review Period To", "Evaluation Type"];
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
            tabCell.innerHTML = myresponse[k][col[l]];
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
                AthleticsEmp.value = "1";
                AthleticsImpToPos.value = "1";
                AtMeets.value = "1";
                AtDoesnotMeet.value = "";

                Quality.value = "1";
                quality1.value = "";
                quality2.value = "";
                quality3.value = "";
                quality4.value = "1";
                quality5.value = "";

                Quantity.value = "3";
                Quantity1.value = "";
                Quantity2.value = "";
                Quantity3.value = "1";
                Quantity4.value = "";
                Quantity5.value = "";

                OralComm.value = "4";
                OC1.value = "";
                OC2.value = "";
                OC3.value = "";
                OC4.value = "";
                OC5.value = "";

                InterpersonalSkills.value = "2";
                IPSkill1.value = "";
                IPSkill2.value = "1";
                IPSkill3.value = "";
                IPSkill4.value = "";
                IPSkill5.value = "";

                Initiative.value = "3";
                Initiative1.value = "1";
                Initiative2.value = "";
                Initiative3.value = "";
                Initiative4.value = "";
                Initiative5.value = "";

                ServiceOrientation.value = "1";
                SC1.value = "";
                SC2.value = "";
                SC3.value = "";
                SC4.value = "";
                SC5.value = "1";

                Adaptability.value = "1";
                Adaptability1.value = "1";
                Adaptability2.value = "";
                Adaptability3.value = "";
                Adaptability4.value = "";
                Adaptability5.value = "";

                JobKnowledge.value = "2";
                JK1.value = "";
                JK2.value = "";
                JK3.value = "1";
                JK4.value = "";
                JK5.value = "";

                DependReli.value = "3";
                DR1.value = "";
                DR2.value = "";
                DR3.value = "";
                DR4.value = "1";
                DR5.value = "";

                WrittenComm.value = "4";
                WC1.value = "";
                WC2.value = "";
                WC3.value = "";
                WC4.value = "";
                WC5.value = "";
                ProbSolving.value = "4";
                ProbSol1.value = "";
                ProbSol2.value = "";
                ProbSol3.value = "";
                ProbSol4.value = "";
                ProbSol5.value = "";
                LeadingOthers.value = "4";
                LeadOthers1.value = "";
                LeadOthers2.value = "";
                LeadOthers3.value = "";
                LeadOthers4.value = "";
                LeadOthers5.value = "";
                Accepting.value = "4";
                Accepting1.value = "";
                Accepting2.value = "";
                Accepting3.value = "";
                Accepting4.value = "";
                Accepting5.value = "";
                /*   AddCriteria1.value = myresponse[0].ADDCRITERIA_1;
                   AddCriteriaImpToPos1.value = myresponse[0].ADDITIONALCRITERIA1;
                 	Additional1.value = myresponse[0].ADDCRITERIA_RATING1;
                 	Additional2.value = myresponse[0].ADDCRITERIA_RATING2;
                 	Additional3.value = myresponse[0].ADDCRITERIA_RATING3;
                 	Additional4.value = myresponse[0].ADDCRITERIA_RATING4;
                    Additional5.value = myresponse[0].ADDCRITERIA_RATING5;
                 	AdditionalCriteria1.value = myresponse[0].ADDCRITERIA_COMMENT_1;
                 	AdditionalCriteria2.value = myresponse[0].ADDCRITERIA_COMMENT_2;
                 	AdditionalCriteria3.value = myresponse[0].ADDCRITERIA_COMMENT_3;
                 	AdditionalCriteria4.value = myresponse[0].ADDCRITERIA_COMMENT_4;
                 
                 AdditionalCriteria5.value = myresponse[0].ADDCRITERIA_COMMENT_5;
                    AddCriteria2.value = myresponse[0].ADDCRITERIA_2;
                 	AddCriteriaImpToPos2.value = myresponse[0].ADDITIONALCRITERIA2;
                 	Additional6.value = myresponse[0].ADDCRITERIA_RATING6;
                 	Additional7.value = myresponse[0].ADDCRITERIA_RATING7;
                 	Additional8.value = myresponse[0].ADDCRITERIA_RATING8;
                 
                 Additional9.value = myresponse[0].ADDCRITERIA_RATING9;
                    Additional10.value = myresponse[0].ADDCRITERIA_RATING10;
                 	AdditionalCriteria6.value = myresponse[0].ADDCRITERIA_COMMENT_6;
                 	AdditionalCriteria7.value = myresponse[0].ADDCRITERIA_COMMENT_7;
                 	AdditionalCriteria8.value = myresponse[0].ADDCRITERIA_COMMENT_8;
                 	AdditionalCriteria9.value = myresponse[0].ADDCRITERIA_COMMENT_9;
                 AdditionalCriteria10.value = myresponse[0].ADDCRITERIA_COMMENT_10;*/
                OverallRating.value = "Meets and Frequently Exceeds Expectations";
                supportFactorComments1.value = "The quality of work that John Smith provides meets and frequently exceeds expectations";
                supportFactorComments2.value = "NA";
                performanceGoalComment1.value = "NA";
                performanceGoalComment2.value = "NA";
                performanceGoalComment3.value = "NA";
                rButtonStatus = true;
                break;
            }
        }
        if (rButtonStatus === false) {
            //alert("Please select the department");
            showErrorModal("Alert!", "Please select the correct entry");
            //getPopup(text4);
            modal.style.display = "block";
        } else {
            modal.style.display = "none";

        }
    };
    footerModal.appendChild(okButton);
  }else{
  showErrorModal("Alert!", "Please enter valid Employee ID");

  }
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_EmpID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_EmpID_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
  this.value="80123456";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_EmpID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_EmpID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  if(this.value == "80123456" && EmpRCD.value === null){
    EmpRCD.value = "1";
    CBID.value = "C1";
    Range.value = "3";
    StaffFirstName.value = "John";
    StaffLastName.value = "Smith";
    Department.value = "Financial Service";
    Department_ID.value = "10201";
    Classification.value = "Finance Information Tech";
    EvaluatorsName.value = "Mathew Parker";
    EvaluatorsTitle.value = "Director, XYZ Tech Services";
    AthleticsEmp.value = "1";
  }else{
    showErrorModal("Alert!", "No Matching records found");
  }
  
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_EmpRCD_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_EmpRCD_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
  this.value="1";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_CBID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_CBID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
  this.value="C1";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Range_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Range_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
  this.value="3";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_StaffFirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_StaffFirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
  this.value="John";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_StaffLastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_StaffLastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
  this.value="Smith";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Department_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Department_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
  this.value="Financial Service";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Department_ID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Department_ID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
  this.value="10201";
}

        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Classification_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Classification_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
  this.value="Finance Information Tech";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_EvaluatorsName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_EvaluatorsName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
  this.value="Mathew Parker";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_EvaluatorsTitle_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_EvaluatorsTitle_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
  this.value="Director, XYZ Tech Services";
}

        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_ReviewPeriodFrom_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_ReviewPeriodFrom_init0 = function (scope) {
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
var lastYear = curyear - 1;
//var d = new Date(lastYear, 3, 16);
var d = (lastYear+"-"+"7"+"-"+"1");
  //alert(d);
this.value = d;
}else{
this.value = dateValue;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_ReviewPeriodTo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_ReviewPeriodTo_init0 = function (scope) {
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
var d = (curyear+"-"+"6"+"-"+"30");
this.value = d;
}else{
this.value = dateValue;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AthleticsEmp_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AthleticsEmp_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            //alert("atletic "+this.value);
if (this.value == "1") {
    athleticsGroup.visible = true;
  athleticEmpInnerGroup.visible = false;
   AthleticsImpToPos.mandatory = true;
}
else{
  athleticsGroup.visible = false;
  AthleticsImpToPos.value = null;
  AtMeets.value = null;
  AtDoesnotMeet.value = null;  
   AthleticsImpToPos.mandatory = false;
}

        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_DraftDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_DraftDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_HiddenTextFields_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_HiddenTextFields_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_StageIndicator_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_StageIndicator_valueCommit0 = function (scope) {
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
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_prePerflfEvalPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_prePerflfEvalPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_qualityQuantityOralCommunication_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_qualityQuantityOralCommunication_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(Quality.value === "4" || Quality.value === null)

{
  qualityGroup.visible = false;
}
if(Quantity.value === "4" || Quantity.value === null)
{
quantityGroup.visible = false;
}

if(OralComm.value === "4" || OralComm.value === null)
{
oralCommunicationGroup.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Quality_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Quality_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (this.value == "4" || this.value === null) {
    qualityGroup.visible = false;
   //qualityGroup.enabled = false;
  quality1.value = null;
  quality2.value = null;
  quality3.value = null;
  quality4.value = null;
  quality5.value = null;
}
else{
  qualityGroup.visible = true;
// qualityGroup.enabled = true;
 //alert("hi");
  /*quality1.value = null;
  quality2.value = null;
  quality3.value = null;
  quality4.value = null;
  quality5.value = null;*/
}
  
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated__valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated__valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == "1") {
    quality1.value = null;
    quality2.value = null;
    quality4.value = null;
    quality5.value = null;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_quality1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_quality1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    quality2.value = null;
    quality3.value = null;
    quality4.value = null;
    quality5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_quality2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_quality2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    quality1.value = null;
    quality3.value = null;
    quality4.value = null;
    quality5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_quality3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_quality3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    quality2.value = null;
    quality1.value = null;
    quality4.value = null;
    quality5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_quality4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_quality4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    quality2.value = null;
    quality1.value = null;
    quality3.value = null;
    quality5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_quality5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_quality5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    quality2.value = null;
    quality3.value = null;
    quality4.value = null;
    quality1.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Quantity_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Quantity_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            //alert("hidden "+this.value);
if (this.value == "4" || this.value === null) {
  Quantity1.value = null;
  Quantity2.value = null;
  Quantity3.value = null;
  Quantity4.value = null;
  Quantity5.value = null;
 quantityGroup.visible = false;
 //quantityGroup.enabled = false;
  
}
else
  {
  quantityGroup.visible = true;
   // quantityGroup.enabled = true;
  /*Quantity1.value = null;
  Quantity2.value = null;
  Quantity3.value = null;
  Quantity4.value = null;
  Quantity5.value = null;*/
  }

        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Quantity1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Quantity1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
{

  Quantity2.value = null;
  Quantity3.value = null;
  Quantity4.value = null;
  Quantity5.value = null;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Quantity2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Quantity2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
{

  Quantity1.value = null;
  Quantity3.value = null;
  Quantity4.value = null;
  Quantity5.value = null;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Quantity3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Quantity3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
{

  Quantity1.value = null;
  Quantity2.value = null;
  Quantity4.value = null;
  Quantity5.value = null;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated__valueCommit00
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated__valueCommit00 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
{

  quantity1.value = null;
  quantity3.value = null;
 quantity4.value = null;
  quantity2.value = null;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Quantity4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Quantity4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
{

  Quantity1.value = null;
  Quantity2.value = null;
  Quantity3.value = null;
  Quantity5.value = null;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Quantity5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Quantity5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
{

  Quantity1.value = null;
  Quantity2.value = null;
  Quantity3.value = null;
  Quantity4.value = null;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_OralComm_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_OralComm_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == "4" || this.value === null) {
   oralCommunicationGroup.visible = false;
    OC1.value = null;
    OC2.value = null;
    OC3.value = null;
    OC4.value = null;
    OC5.value = null;
  //oralCommunicationGroup.enabled = false;
}
else
{
   oralCommunicationGroup.visible = true; 
 // oralCommunicationGroup.enabled = true; 
    /*OC1.value = null;
    OC2.value = null;
    OC3.value = null;
    OC4.value = null;
    OC5.value = null;*/
}

        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_OC1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_OC1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    
    OC2.value = null;
    OC3.value = null;
    OC4.value = null;
    OC5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_OC2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_OC2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    OC1.value = null;
    OC3.value = null;
    OC4.value = null;
    OC5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_OC3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_OC3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    OC1.value = null;
    OC2.value = null;
    OC4.value = null;
    OC5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_OC4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_OC4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    OC1.value = null;
    OC2.value = null;
    OC3.value = null;
    OC5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_OC5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_OC5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    OC1.value = null;
    OC2.value = null;
    OC3.value = null;
    OC4.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_interpersonalSkillsInitiativeServiceOrientation_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_interpersonalSkillsInitiativeServiceOrientation_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(InterpersonalSkills.value === "4" || InterpersonalSkills.value === null){
interpersonalSkillGroup.visible = false;
  }
if(Initiative.value === "4" || Initiative.value === null){
initiativeGroup.visible = false;
}
if(ServiceOrientation.value === "4" || ServiceOrientation.value === null){
serviceOrientationGroup.visible = false;
}


        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_InterpersonalSkills_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_InterpersonalSkills_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "4" || this.value === null)
{
  interpersonalSkillGroup.visible = false;
   IPSkill1.value = null;
   IPSkill2.value = null;
   IPSkill3.value = null;
   IPSkill4.value = null;
   IPSkill5.value = null;
  // interpersonalSkillGroup.enabled = false;
}
else{
  interpersonalSkillGroup.visible = true;
 /* IPSkill1.value = null;
   IPSkill2.value = null;
   IPSkill3.value = null;
   IPSkill4.value = null;
   IPSkill5.value = null;*/
  // interpersonalSkillGroup.enabled = true;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_IPSkill1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_IPSkill1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1")
  {
  
   IPSkill2.value = null;
   IPSkill3.value = null;
   IPSkill4.value = null;
   IPSkill5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_IPSkill2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_IPSkill2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1")
  {
  
   IPSkill1.value = null;
   IPSkill3.value = null;
   IPSkill4.value = null;
   IPSkill5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_IPSkill3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_IPSkill3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1")
  {
  
   IPSkill1.value = null;
   IPSkill2.value = null;
   IPSkill4.value = null;
   IPSkill5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_IPSkill4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_IPSkill4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1")
  {
  
   IPSkill1.value = null;
   IPSkill2.value = null;
   IPSkill3.value = null;
   IPSkill5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_IPSkill5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_IPSkill5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1")
  {
  
   IPSkill1.value = null;
   IPSkill2.value = null;
   IPSkill3.value = null;
   IPSkill4.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Initiative_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Initiative_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "4" || this.value === null)
  {
    initiativeGroup.visible = false;
    Initiative1.value = null;
    Initiative2.value = null;
    Initiative3.value = null;
    Initiative4.value = null;
    Initiative5.value = null;
    //initiativeGroup.enabled = false;
  }
else
  {
   initiativeGroup.visible = true;
   // initiativeGroup.enabled = true;
  /*  Initiative1.value = null;
    Initiative2.value = null;
    Initiative3.value = null;
    Initiative4.value = null;
    Initiative5.value = null; */
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Initiative1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Initiative1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    Initiative2.value = null;
    Initiative3.value = null;
    Initiative4.value = null;
    Initiative5.value = null; 
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Initiative2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Initiative2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    Initiative1.value = null;
    Initiative3.value = null;
    Initiative4.value = null;
    Initiative5.value = null; 
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Initiative3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Initiative3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    Initiative1.value = null;
    Initiative2.value = null;
    Initiative4.value = null;
    Initiative5.value = null; 
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Initiative4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Initiative4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    Initiative1.value = null;
    Initiative2.value = null;
    Initiative3.value = null;
    Initiative5.value = null; 
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Initiative5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Initiative5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    Initiative1.value = null;
    Initiative2.value = null;
    Initiative3.value = null;
    Initiative4.value = null; 
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_ServiceOrientation_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_ServiceOrientation_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "4" || this.value === null)
  {
    serviceOrientationGroup.visible = false;
   // serviceOrientationGroup.enabled = false;
    SC1.value = null;
    SC2.value = null;
    SC3.value = null;
    SC4.value = null;
    SC5.value = null;
  }
else{
  serviceOrientationGroup.visible = true;
  /*SC1.value = null;
    SC2.value = null;
    SC3.value = null;
    SC4.value = null;
    SC5.value = null;*/
  //serviceOrientationGroup.enabled = true;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_SC1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_SC1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value ==="1")
  {
    SC2.value = null;
    SC3.value = null;
    SC4.value = null;
    SC5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_SC2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_SC2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value ==="1")
  {
    SC1.value = null;
    SC3.value = null;
    SC4.value = null;
    SC5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_SC3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_SC3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value ==="1")
  {
    SC1.value = null;
    SC2.value = null;
    SC4.value = null;
    SC5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_SC4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_SC4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value ==="1")
  {
    SC1.value = null;
    SC2.value = null;
    SC3.value = null;
    SC5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_SC5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_SC5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value ==="1")
  {
    SC1.value = null;
    SC2.value = null;
    SC3.value = null;
    SC4.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_adaptabilityJobKnowledgeDependabilityReliability_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_adaptabilityJobKnowledgeDependabilityReliability_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(Adaptability.value === "4" || Adaptability.value === null){
adaptabilityGroup.visible = false;
}
if(JobKnowledge.value === "4" || JobKnowledge.value === null){
jobKnowledgeGroup.visible = false;
}
if(DependReli.value === "4" || DependReli.value === null){
depandabilityGroup.visible = false;
}


        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Adaptability_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Adaptability_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "4" || this.value === null)
  {
   adaptabilityGroup.visible = false;
    Adaptability1.value = null;
    Adaptability2.value = null;
    Adaptability3.value = null;
    Adaptability4.value = null;
    Adaptability5.value = null;
     //adaptabilityGroup.enabled = false;
  }
else{
  adaptabilityGroup.visible = true;
  /*Adaptability1.value = null;
    Adaptability2.value = null;
    Adaptability3.value = null;
    Adaptability4.value = null;
    Adaptability5.value = null;*/
  // adaptabilityGroup.enabled = true;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Adaptability1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Adaptability1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {

    Adaptability2.value = null;
    Adaptability3.value = null;
    Adaptability4.value = null;
    Adaptability5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Adaptability2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Adaptability2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {

    Adaptability1.value = null;
    Adaptability3.value = null;
    Adaptability4.value = null;
    Adaptability5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Adaptability3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Adaptability3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {

    Adaptability1.value = null;
    Adaptability2.value = null;
    Adaptability4.value = null;
    Adaptability5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Adaptability4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Adaptability4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {

    Adaptability1.value = null;
    Adaptability2.value = null;
    Adaptability3.value = null;
    Adaptability5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Adaptability5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Adaptability5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {

    Adaptability1.value = null;
    Adaptability2.value = null;
    Adaptability3.value = null;
    Adaptability4.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_JobKnowledge_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_JobKnowledge_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "4" || this.value === null)
  {
    jobKnowledgeGroup.visible = false;
     JK1.value = null;
     JK2.value = null;
     JK3.value = null;
     JK4.value = null;
     JK5.value = null;
    //jobKnowledgeGroup.enabled = false;
  }
else{
   jobKnowledgeGroup.visible = true;
 // jobKnowledgeGroup.enabled = true;   
  /*JK1.value = null;
     JK2.value = null;
     JK3.value = null;
     JK4.value = null;
     JK5.value = null;*/
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_JK1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_JK1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
         
     JK2.value = null;
     JK3.value = null;
     JK4.value = null;
     JK5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_JK2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_JK2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
         
     JK1.value = null;
     JK3.value = null;
     JK4.value = null;
     JK5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_JK3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_JK3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
         
     JK1.value = null;
     JK2.value = null;
     JK4.value = null;
     JK5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_JK4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_JK4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
         
     JK1.value = null;
     JK2.value = null;
     JK3.value = null;
     JK5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_JK5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_JK5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
         
     JK1.value = null;
     JK2.value = null;
     JK3.value = null;
     JK4.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_DependReli_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_DependReli_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "4" || this.value === null)
  {
    depandabilityGroup.visible = false;
    // depandabilityGroup.enabled = false;
    DR1.value = null;
     DR2.value = null;
     DR3.value = null;
     DR4.value = null;
     DR5.value = null;
  }
else{
  depandabilityGroup.visible = true;
 /* DR1.value = null;
     DR2.value = null;
     DR3.value = null;
     DR4.value = null;
     DR5.value = null;*/
   //depandabilityGroup.enabled = true;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_DR1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_DR1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
              if(this.value == "1")
  {
    
     DR2.value = null;
     DR3.value = null;
     DR4.value = null;
     DR5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_DR2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_DR2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
              if(this.value == "1")
  {
    
     DR1.value = null;
     DR3.value = null;
     DR4.value = null;
     DR5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_DR3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_DR3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
              if(this.value == "1")
  {
    
     DR1.value = null;
     DR2.value = null;
     DR4.value = null;
     DR5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_DR4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_DR4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
              if(this.value == "1")
  {
    
     DR1.value = null;
     DR2.value = null;
     DR3.value = null;
     DR5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_DR5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_DR5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
              if(this.value == "1")
  {
    
     DR1.value = null;
     DR2.value = null;
     DR3.value = null;
     DR4.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_writtenCommunicationProblemSolvingetc_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_writtenCommunicationProblemSolvingetc_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(WrittenComm.value === "4" || WrittenComm.value === null){
writtenComGroup.visible = false;
}
if(ProbSolving.value === "4" || ProbSolving.value === null){
problemSolvingGroup.visible = false;
}
if(LeadingOthers.value === "4" || LeadingOthers.value === null){
leadOthersGroup.visible = false;
}
if(Accepting.value === "4" || Accepting.value === null){
acceptingGroup.visible = false;
}


        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_WrittenComm_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_WrittenComm_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "4" || this.value === null) {
   writtenComGroup.visible = false;
   WC1.value = null;
   WC2.value = null;
   WC3.value = null;
   WC4.value = null;
   WC5.value = null;
   //writtenComGroup.enabled = false;
}
else{
writtenComGroup.visible = true;
   /*  WC1.value = null;
   WC2.value = null;
   WC3.value = null;
   WC4.value = null;
   WC5.value = null;*/
  // writtenComGroup.enabled = true;
}

        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_WC1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_WC1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
             if(this.value === "1")
   {
   
   WC2.value = null;
   WC3.value = null;
   WC4.value = null;
   WC5.value = null;
   }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_WC2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_WC2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
             if(this.value === "1")
   {
   
   WC1.value = null;
   WC3.value = null;
   WC4.value = null;
   WC5.value = null;
   }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_WC3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_WC3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
             if(this.value === "1")
   {
   
   WC2.value = null;
   WC1.value = null;
   WC4.value = null;
   WC5.value = null;
   }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_WC4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_WC4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
             if(this.value === "1")
   {
   
   WC2.value = null;
   WC1.value = null;
   WC3.value = null;
   WC5.value = null;
   }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_WC5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_WC5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
             if(this.value === "1")
   {
   
   WC2.value = null;
   WC1.value = null;
   WC4.value = null;
   WC3.value = null;
   }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_ProbSolving_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_ProbSolving_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "4" || this.value === null)
  {
    problemSolvingGroup.visible = false;
    ProbSol1.value = null;
    ProbSol2.value = null;
    ProbSol3.value = null;
    ProbSol4.value = null;
    ProbSol5.value = null;
   // problemSolvingGroup.enabled = false;
  }
else{
  problemSolvingGroup.visible = true;
   /* ProbSol1.value = null;
    ProbSol2.value = null;
    ProbSol3.value = null;
    ProbSol4.value = null;
    ProbSol5.value = null;*/
 // problemSolvingGroup.enabled = true;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_ProbSol1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_ProbSol1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    
    ProbSol2.value = null;
    ProbSol3.value = null;
    ProbSol4.value = null;
    ProbSol5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_ProbSol2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_ProbSol2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    
    ProbSol1.value = null;
    ProbSol3.value = null;
    ProbSol4.value = null;
    ProbSol5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_ProbSol3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_ProbSol3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    
    ProbSol1.value = null;
    ProbSol2.value = null;
    ProbSol4.value = null;
    ProbSol5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_ProbSol4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_ProbSol4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    
    ProbSol1.value = null;
    ProbSol2.value = null;
    ProbSol3.value = null;
    ProbSol5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_ProbSol5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_ProbSol5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    
    ProbSol1.value = null;
    ProbSol2.value = null;
    ProbSol3.value = null;
    ProbSol4.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_LeadingOthers_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_LeadingOthers_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "4" || this.value === null)
  {
    leadOthersGroup.visible = false;
    LeadOthers1.value = null;
    LeadOthers2.value = null;
    LeadOthers3.value = null;
    LeadOthers4.value = null;
    LeadOthers5.value = null;
   // leadOthersGroup.enabled = false;
  }
else{
leadOthersGroup.visible = true;
    /*  LeadOthers1.value = null;
    LeadOthers2.value = null;
    LeadOthers3.value = null;
    LeadOthers4.value = null;
    LeadOthers5.value = null;*/
 // leadOthersGroup.enabled = true;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_LeadOthers1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_LeadOthers1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    LeadOthers2.value = null;
    LeadOthers3.value = null;
    LeadOthers4.value = null;
    LeadOthers5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_LeadOthers2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_LeadOthers2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    LeadOthers1.value = null;
    LeadOthers3.value = null;
    LeadOthers4.value = null;
    LeadOthers5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_LeadOthers3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_LeadOthers3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    LeadOthers1.value = null;
    LeadOthers2.value = null;
    LeadOthers4.value = null;
    LeadOthers5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_LeadOthers4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_LeadOthers4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    LeadOthers1.value = null;
    LeadOthers2.value = null;
    LeadOthers3.value = null;
    LeadOthers5.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_LeadOthers5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_LeadOthers5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    LeadOthers1.value = null;
    LeadOthers2.value = null;
    LeadOthers3.value = null;
    LeadOthers4.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Accepting_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Accepting_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "4" || this.value === null)
  {
    acceptingGroup.visible = false;
    Accepting1.value = null;
    Accepting2.value = null;
    Accepting3.value = null;
    Accepting4.value = null;
    Accepting5.value = null;
   // acceptingGroup.enabled = false;
  }
else{
   acceptingGroup.visible = true;
   /* Accepting1.value = null;
    Accepting2.value = null;
    Accepting3.value = null;
    Accepting4.value = null;
    Accepting5.value = null;*/
  //acceptingGroup.enabled = true;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Accepting1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Accepting1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
             if(this.value === "1")
 {
  
    Accepting2.value = null;
    Accepting3.value = null;
    Accepting4.value = null;
    Accepting5.value = null;
 }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Accepting2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Accepting2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
             if(this.value === "1")
 {
  
    Accepting1.value = null;
    Accepting3.value = null;
    Accepting4.value = null;
    Accepting5.value = null;
 }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Accepting3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Accepting3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
             if(this.value === "1")
 {
  
    Accepting1.value = null;
    Accepting2.value = null;
    Accepting4.value = null;
    Accepting5.value = null;
 }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Accepting4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Accepting4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
             if(this.value === "1")
 {
  
    Accepting1.value = null;
    Accepting2.value = null;
    Accepting3.value = null;
    Accepting5.value = null;
 }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Accepting5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Accepting5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
             if(this.value === "1")
 {
  
    Accepting1.value = null;
    Accepting2.value = null;
    Accepting3.value = null;
    Accepting4.value = null;
 }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_additionalCriteria_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_additionalCriteria_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(AdditionalCriteriaV2.value === "4" || AdditionalCriteriaV2.value === null){
additionalCriteria1Group.visible = false;
/*AdditionalCriteria1.enabled = false;
AdditionalCriteria2.enabled = false;
AdditionalCriteria3.enabled = false;
AdditionalCriteria4.enabled = false;
AdditionalCriteria5.enabled = false;*/
}
if(AdditionalCriteriaV2.value === "4" || AdditionalCriteriaV2.value === null){
additionalCriteria2Group.visible = false;
/*AdditionalCriteria6.enabled = false;
AdditionalCriteria7.enabled = false;
AdditionalCriteria8.enabled = false;
AdditionalCriteria9.enabled = false;
AdditionalCriteria10.enabled = false;*/
}

        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AthleticsImpToPos_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AthleticsImpToPos_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "2")
  {
    athleticEmpInnerGroup.visible = false;
    AtMeets.value = null;
    AtDoesnotMeet.value = null;
  }
else{
   athleticEmpInnerGroup.visible = true;
   /*AtMeets.value = null;
   AtDoesnotMeet.value = null;*/
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_athleticEmpInnerGroup_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_athleticEmpInnerGroup_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AtMeets_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AtMeets_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    AtDoesnotMeet.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AtDoesnotMeet_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AtDoesnotMeet_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    AtMeets.value = null;
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AddCriteriaImpToPos1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AddCriteriaImpToPos1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == "4" || this.value === null) {
    AddCriteria1.value = "";
  AddCriteria1.enabled = false;
   AddCriteria1.mandatory = "";
    additionalCriteria1Group.visible = false;
  Additional1.value = null;
  AdditionalCriteria1.value = null;
  AdditionalCriteria1.enabled = false;
  Additional2.value = null;
  AdditionalCriteria2.value = null;
   AdditionalCriteria2.enabled = false;
  Additional3.value = null;
  AdditionalCriteria3.value = null;
   AdditionalCriteria3.enabled = false;
  Additional4.value = null;
  AdditionalCriteria4.value = null;
   AdditionalCriteria4.enabled = false;
  Additional5.value = null;
  AdditionalCriteria5.value = null;
   AdditionalCriteria4.enabled = false;
}
else{
 
  AddCriteria1.enabled = true;
    AddCriteria1.mandatory = "error";
  additionalCriteria1Group.visible = true;
  /* Additional1.value = null;
  AdditionalCriteria1.value = null;
  AdditionalCriteria1.enabled = false;
  Additional2.value = null;
  AdditionalCriteria2.value = null;
   AdditionalCriteria2.enabled = false;
  Additional3.value = null;
  AdditionalCriteria3.value = null;
   AdditionalCriteria3.enabled = false;
  Additional4.value = null;
  AdditionalCriteria4.value = null;
   AdditionalCriteria4.enabled = false;
  Additional5.value = null;
  AdditionalCriteria5.value = null;
   AdditionalCriteria4.enabled = false;*/
}

        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_additionalCriteria1Group_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_additionalCriteria1Group_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if(AddCriteriaImpToPos1.value == "4" || AddCriteriaImpToPos1.value === null){
  this.visible = false;
}else{
  this.visible = true;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Additional1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Additional1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
     AdditionalCriteria1.enabled = true;
     AdditionalCriteria2.enabled = false;
     AdditionalCriteria3.enabled = false;
     AdditionalCriteria4.enabled = false;
     AdditionalCriteria5.enabled = false;
     
     AdditionalCriteria2.value = null;
     AdditionalCriteria3.value = null;
     AdditionalCriteria4.value = null;
     AdditionalCriteria5.value = null;
    
    Additional2.value = null;
    Additional3.value = null;
    Additional4.value = null;
    Additional5.value = null;
    
    AdditionalCriteria1.visible = true;    
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria1_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(Additional1.value == "1"){
  this.enabled = true;
}else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Additional2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Additional2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
     AdditionalCriteria1.enabled = false;
     AdditionalCriteria2.enabled = true;
     AdditionalCriteria3.enabled = false;
     AdditionalCriteria4.enabled = false;
     AdditionalCriteria5.enabled = false;
     
     AdditionalCriteria1.value = null;
     AdditionalCriteria3.value = null;
     AdditionalCriteria4.value = null;
     AdditionalCriteria5.value = null;
    
    Additional1.value = null;
    Additional3.value = null;
    Additional4.value = null;
    Additional5.value = null;
    
    AdditionalCriteria2.visible = true;    
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria2_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(Additional2.value == "1"){
  this.enabled = true;
}else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Additional3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Additional3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
     AdditionalCriteria1.enabled = false;
     AdditionalCriteria2.enabled = false;
     AdditionalCriteria3.enabled = true;
     AdditionalCriteria4.enabled = false;
     AdditionalCriteria5.enabled = false;
     
     AdditionalCriteria1.value = null;
     AdditionalCriteria2.value = null;
     AdditionalCriteria4.value = null;
     AdditionalCriteria5.value = null;
    
    Additional1.value = null;
    Additional2.value = null;
    Additional4.value = null;
    Additional5.value = null;
 
        AdditionalCriteria3.visible = true;    
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria3_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(Additional3.value == "1"){
  this.enabled = true;
}else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Additional4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Additional4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
     AdditionalCriteria1.enabled = false;
     AdditionalCriteria2.enabled = false;
     AdditionalCriteria3.enabled = false;
     AdditionalCriteria4.enabled = true;
     AdditionalCriteria5.enabled = false;
     
     AdditionalCriteria1.value = null;
     AdditionalCriteria2.value = null;
     AdditionalCriteria3.value = null;
     AdditionalCriteria5.value = null;
    
    Additional1.value = null;
    Additional2.value = null;
    Additional3.value = null;
    Additional5.value = null;
    
      AdditionalCriteria4.visible = true;    
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria4_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria4_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(Additional4.value == "1"){
  this.enabled = true;
}else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Additional5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Additional5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
     AdditionalCriteria1.enabled = false;
     AdditionalCriteria2.enabled = false;
     AdditionalCriteria3.enabled = false;
     AdditionalCriteria4.enabled = false;
     AdditionalCriteria5.enabled = true;
     
     AdditionalCriteria1.value = null;
     AdditionalCriteria2.value = null;
     AdditionalCriteria3.value = null;
     AdditionalCriteria4.value = null;
    
    Additional1.value = null;
    Additional2.value = null;
    Additional3.value = null;
    Additional4.value = null;
    
      AdditionalCriteria5.visible = true;    
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria5_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria5_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(Additional5.value == "1"){
  this.enabled = true;
}else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AddCriteriaImpToPos2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AddCriteriaImpToPos2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == "4" || this.value === null) {
    AddCriteria2.value = "";
  AddCriteria2.enabled = false;
  AddCriteria2.mandatory = "";
    additionalCriteria2Group.visible = false;
  Additional6.value = null;
  AdditionalCriteria6.value = null;
  AdditionalCriteria6.enabled = false;
  Additional7.value = null;
  AdditionalCriteria7.value = null;
   AdditionalCriteria7.enabled = false;
  Additional8.value = null;
  AdditionalCriteria8.value = null;
   AdditionalCriteria8.enabled = false;
  Additional9.value = null;
  AdditionalCriteria9.value = null;
   AdditionalCriteria9.enabled = false;
  Additional10.value = null;
  AdditionalCriteria10.value = null;
   AdditionalCriteria10.enabled = false;
}
else{
  AddCriteria2.enabled = true;
  AddCriteria2.mandatory = "error";
  additionalCriteria2Group.visible = true;
 /* Additional6.value = null;
  AdditionalCriteria6.value = null;
  AdditionalCriteria6.enabled = false;
  Additional7.value = null;
  AdditionalCriteria7.value = null;
   AdditionalCriteria7.enabled = false;
  Additional8.value = null;
  AdditionalCriteria8.value = null;
   AdditionalCriteria8.enabled = false;
  Additional9.value = null;
  AdditionalCriteria9.value = null;
   AdditionalCriteria9.enabled = false;
  Additional10.value = null;
  AdditionalCriteria10.value = null;
   AdditionalCriteria10.enabled = false;*/
}

        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_additionalCriteria2Group_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_additionalCriteria2Group_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if(AddCriteriaImpToPos2.value == "4" || AddCriteriaImpToPos2.value === null){
  this.visible = false;
}else{
  this.visible = true;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Additional6_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Additional6_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
     AdditionalCriteria6.enabled = true;
     AdditionalCriteria7.enabled = false;
     AdditionalCriteria8.enabled = false;
     AdditionalCriteria9.enabled = false;
     AdditionalCriteria10.enabled = false;
     
     AdditionalCriteria7.value = null;
     AdditionalCriteria8.value = null;
     AdditionalCriteria9.value = null;
     AdditionalCriteria10.value = null;
    
    Additional7.value = null;
    Additional8.value = null;
    Additional9.value = null;
    Additional10.value = null;
    
      AdditionalCriteria6.visible = true;    
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria6_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria6_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(Additional6.value == "1"){
  this.enabled = true;
}else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Additional7_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Additional7_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
     AdditionalCriteria6.enabled = false;
     AdditionalCriteria7.enabled = true;
     AdditionalCriteria8.enabled = false;
     AdditionalCriteria9.enabled = false;
     AdditionalCriteria10.enabled = false;
     
     AdditionalCriteria6.value = null;
     AdditionalCriteria8.value = null;
     AdditionalCriteria9.value = null;
     AdditionalCriteria10.value = null;
    
    Additional6.value = null;
    Additional8.value = null;
    Additional9.value = null;
    Additional10.value = null;
    
      AdditionalCriteria7.visible = true;    
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria7_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria7_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(Additional7.value == "1"){
  this.enabled = true;
}else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Additional8_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Additional8_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
     AdditionalCriteria6.enabled = false;
     AdditionalCriteria7.enabled = false;
     AdditionalCriteria8.enabled = true;
     AdditionalCriteria9.enabled = false;
     AdditionalCriteria10.enabled = false;
     
     AdditionalCriteria6.value = null;
     AdditionalCriteria7.value = null;
     AdditionalCriteria9.value = null;
     AdditionalCriteria10.value = null;
    
    Additional6.value = null;
    Additional7.value = null;
    Additional9.value = null;
    Additional10.value = null;
    
      AdditionalCriteria8.visible = true;    
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria8_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria8_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(Additional8.value == "1"){
  this.enabled = true;
}else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Additional9_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Additional9_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
     AdditionalCriteria6.enabled = false;
     AdditionalCriteria7.enabled = false;
     AdditionalCriteria8.enabled = false;
     AdditionalCriteria9.enabled = true;
     AdditionalCriteria10.enabled = false;
     
     AdditionalCriteria6.value = null;
     AdditionalCriteria7.value = null;
     AdditionalCriteria8.value = null;
     AdditionalCriteria10.value = null;
    
    Additional6.value = null;
    Additional7.value = null;
    Additional8.value = null;
    Additional10.value = null;
    
      AdditionalCriteria9.visible = true;    
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria9_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria9_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(Additional9.value == "1"){
  this.enabled = true;
}else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_Additional10_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_Additional10_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
     AdditionalCriteria6.enabled = false;
     AdditionalCriteria7.enabled = false;
     AdditionalCriteria8.enabled = false;
     AdditionalCriteria9.enabled = false;
     AdditionalCriteria10.enabled = true;
     
     AdditionalCriteria6.value = null;
     AdditionalCriteria7.value = null;
     AdditionalCriteria8.value = null;
     AdditionalCriteria9.value = null;
    
    Additional6.value = null;
    Additional7.value = null;
    Additional8.value = null;
    Additional9.value = null;
    
      AdditionalCriteria10.visible = true;    
  }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria10_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AdditionalCriteria10_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(Additional10.value == "1"){
  this.enabled = true;
}else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated__click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated__click0 = function (scope) {
    with(this) {
        with(scope) {
            var value;
var rating;
var qualityResult;
if(quality.value == "1"){
 value = "3"; 
}else if(quality.value == "2"){
  value = "2"; 
}else if(quality.value == "3"){
  value = "1"; 
}else{
   value = "0"; 
}

if(quality1.value == "1"){
 rating = "5"; 
}else if(quality2.value == "2"){
  rating = "4"; 
}else if(quality3.value == "3"){
  rating = "3"; 
}else if(quality4.value == "4"){
  rating = "2"; 
}else{
   rating = "1"; 
}
alert(value+"|"+rating);
alert(value * rating);
alert(parseInt(value) * parseInt(rating));
qualityResult = parseInt(value) * parseInt(rating);
average.value = qualityResult;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_OverallRating_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_OverallRating_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value == "Consistently Exceeds Expectations"){
HRDIOverallRate.value = "CEE";
}else if(this.value == "Meets and Frequently Exceeds Expectations"){
HRDIOverallRate.value = "MFEE";
}else if(this.value == "Satisfactory"){
HRDIOverallRate.value = "S";
}else if(this.value == "Needs Improvement"){
HRDIOverallRate.value = "NI";
}else if(this.value == "Does Not Meet Expectations"){
HRDIOverallRate.value = "DNME";
}else{
  HRDIOverallRate.value = "NA";
}

if(this.value == "Needs Improvement" || this.value == "Does Not Meet Expectations"){
  supportFactorComments2.mandatory = true;
}else{
  supportFactorComments2.mandatory = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_averageRating_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_averageRating_init0 = function (scope) {
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
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_supDocuments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_supDocuments_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.enabled = true;
}else{
  this.enabled = false;
  supDocsGuideText.visible = false;
  supportDoc1.visible = false;
   supportDoc2.visible = false;
   supportDoc3.visible = false;
   supportDoc4.visible = false;
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_selfEvalSupDocsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_selfEvalSupDocsPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible =false;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_instanceId_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_instanceId_valueCommit0 = function (scope) {
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
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_workflowinstanceId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_workflowinstanceId_init0 = function (scope) {
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
       supDocuments.visible = false;
     }
    },
    error: function(error) {
      selfEvalSupDocsPanel.visible = false;
       supDocuments.visible = false;
        console.log("error block=" + error);
    }
});
 }else{
   //selfEvalSupDocsPanel.visible = false;
   supDocuments.visible = false;
 }
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_supDocsGuideText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_supDocsGuideText_init0 = function (scope) {
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
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_supportDoc1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
   /*var filePath = supportDoc1.fileAttachment.value;
var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);
//alert(extension);
extension = extension.toLowerCase();
if(extension !== "pdf"){
 
  supportDoc1.fileAttachment.value = null;
  
 showErrorModal("Alert!","Only PDF files are allowed");
}
    var format = /[&{}#!@$%^=;\[\]]/;
    if (format.test(supportDoc1.fileAttachment.value) === true) {
        var doc1NewName = supportDoc1.fileAttachment.value.replace(/#|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '-');
        supportDoc1.fileAttachment.value = doc1NewName;
    }*/
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
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_supportDoc2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
  /* var filePath = supportDoc2.fileAttachment.value;
var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);
//alert(extension);
extension = extension.toLowerCase();
if(extension !== "pdf"){
 
  supportDoc2.fileAttachment.value = null;
  
  showErrorModal("Alert!","Only PDF files are allowed");
}
    var format = /[&{}#!@$%^=;\[\]]/;
    if (format.test(supportDoc2.fileAttachment.value) === true) {
        var doc2NewName = supportDoc2.fileAttachment.value.replace(/#|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '-');
        supportDoc2.fileAttachment.value = doc2NewName;
    }*/
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
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_supportDoc3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
   var filePath = supportDoc3.fileAttachment.value;
var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);
//alert(extension);
extension = extension.toLowerCase();
if(extension !== "pdf"){
 
  supportDoc3.fileAttachment.value = null;
   showErrorModal("Alert!","Only PDF files are allowed");
}
  
    var format = /[&{}#!@$%^=;\[\]]/;
    if (format.test(supportDoc3.fileAttachment.value) === true) {
        var doc3NewName = supportDoc3.fileAttachment.value.replace(/#|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '-');
        supportDoc3.fileAttachment.value = doc3NewName;
    }
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_supportDoc4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_supportDoc4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
   var filePath = supportDoc4.fileAttachment.value;
var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);
//alert(extension);
extension = extension.toLowerCase();
if(extension !== "pdf"){
 
  supportDoc4.fileAttachment.value = null;
  
  showErrorModal("Alert!","Only PDF files are allowed");
}
    var format = /[&{}#!@$%^=;\[\]]/;
    if (format.test(supportDoc4.fileAttachment.value) === true) {
        var doc4NewName = supportDoc4.fileAttachment.value.replace(/#|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '-');
        supportDoc4.fileAttachment.value = doc4NewName;
    }
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_HRCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_HRCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToHR") {
    if (this.value == 1) {

        AdminSign.value =  "Antony Stark";
        AdminName.value =  "Antony Stark";
        var dateString = new Date().toLocaleString("en-US", {

            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        AdminDate.value = d;

        AdminSign.enabled = false;
        AdminDate.enabled = false;
    } else {
        AdminName.value = "";
        AdminSign.value = "";
        AdminDate.value = "";
    }
}

        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AdminSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AdminSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AdminDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AdminDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_AdminComment_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_AdminComment_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_EvalCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_EvalCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToManager") {
    if (this.value == 1) {

        EvaluatorSign.value = "Mathew Parker";
      EvaluatorNameSign.value = "Mathew Parker";
        var dateString = new Date().toLocaleString("en-US", {

            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        EvaluatorDate.value = d;

        EvaluatorSign.enabled = false;
        EvaluatorDate.enabled = false;
    } else {
        EvaluatorSign.value = "";
        EvaluatorNameSign.value = "";
        EvaluatorDate.value = "";
    }
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_EvaluatorSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_EvaluatorSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_EvaluatorDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_EvaluatorDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_EvaluatorComment_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_EvaluatorComment_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_EmpCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_EmpCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (this.value == 1) {
    if (StageIndicator.value === null) {
        EmpSign.value = "";
        EmpDate.value = "";
        if (EmpDate.value === null) {
            EmpDate.enabled = false;

            EmpSign.value = "John Smith";
            var dateString = new Date().toLocaleString("en-US", {

                timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
            }).replace(/[^ -~]/g, '');
            var dateObject = new Date(dateString);
            var curyear = dateObject.getFullYear();
            var curyearMonth = dateObject.getMonth() + 1;
            var curyearDay = dateObject.getDate();
            var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
            EmpDate.value = d;

            EmpSign.enabled = false;
        }
    }
} else {
    EmpSign.value = "";
    EmpDate.value = "";
}
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_EmpSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_EmpSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_EmpDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_EmpDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_EmpComment_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_EmpComment_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToAdmin" || StageIndicator.value == "ToHRDI" | StageIndicator.value == "ToEmployeeAckOnExpire" || StageIndicator.value == "ToEmployeeAck"){
  this.visible = false;
 }
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_textdraw1679378753041_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_textdraw1679378753041_init0 = function (scope) {
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
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            getPdf();

function getPdf() {
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/staff-performance-evaluation/staff-performance-evaluation');
            jsonData.append('fileName', StaffFirstName.value + "_" + StaffLastName.value + "(" + EmpID.value + ")" + "_" + Date.now());          
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
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_reset1561458303307_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_reset1561458303307_click0 = function (scope) {
    with(this) {
        with(scope) {
            EmpID.value = "";
EmpRCD.value = "";
CBID.value = "";
Range.value = "";
StaffFirstName.value = "";
StaffLastName.value = "";
Department.value = "";
Department_ID.value = "";
Classification.value = "";
EvaluationType.value = "";
EvaluatorsName.value = "";
EvaluatorsTitle.value = "";
Staffposdesc.value = "";
DraftDate.value = "";
Quality.value = "";
quality1.value = "";
quality2.value = "";
quality3.value = "";
quality4.value = "";
quality5.value = "";
Quantity.value = "";
Quantity1.value = "";
Quantity2.value = "";
Quantity3.value = "";
Quantity4.value = "";
Quantity5.value = "";
OralComm.value = "";
OC1.value = "";
OC2.value = "";
OC3.value = "";
OC4.value = "";
OC5.value = "";
InterpersonalSkills.value = "";
IPSkill1.value = "";
IPSkill2.value = "";
IPSkill3.value = "";
IPSkill4.value = "";
IPSkill5.value = "";
Initiative.value = "";
Initiative1.value = "";
Initiative2.value = "";
Initiative3.value = "";
Initiative4.value = "";
Initiative5.value = "";
ServiceOrientation.value = "";
SC1.value = "";
SC2.value = "";
SC3.value = "";
SC4.value = "";
SC5.value = "";
Adaptability.value = "";
Adaptability1.value = "";
Adaptability2.value = "";
Adaptability3.value = "";
Adaptability4.value = "";
Adaptability5.value = "";
JobKnowledge.value = "";
JK1.value = "";
JK2.value = "";
JK3.value = "";
JK4.value = "";
JK5.value = "";
DependReli.value = "";
DR1.value = "";
DR2.value = "";
DR3.value = "";
DR4.value = "";
DR5.value = "";
WrittenComm.value = "";
WC1.value = "";
WC2.value = "";
WC3.value = "";
WC4.value = "";
WC5.value = "";
ProbSolving.value = "";
ProbSol1.value = "";
ProbSol2.value = "";
ProbSol3.value = "";
ProbSol4.value = "";
ProbSol5.value = "";
LeadingOthers.value = "";
LeadOthers1.value = "";
LeadOthers2.value = "";
LeadOthers3.value = "";
LeadOthers4.value = "";
LeadOthers5.value = "";
Accepting.value = "";
Accepting1.value = "";
Accepting2.value = "";
Accepting3.value = "";
Accepting4.value = "";
Accepting5.value = "";
supportDoc1.fileAttachment.value = null;
supportDoc2.fileAttachment.value = null;
supportDoc3.fileAttachment.value = null;
supportDoc4.fileAttachment.value = null;
AddCriteriaImpToPos1.value = "";
AddCriteriaImpToPos2.value = "";
AddCriteria1.value = "";
AddCriteria2.value = "";
Additional1.value = "";
AdditionalCriteria1.value = "";
Additional2.value = "";
AdditionalCriteria2.value = "";
Additional3.value = "";
AdditionalCriteria3.value = "";
Additional4.value = "";
AdditionalCriteria4.value = "";
Additional5.value = "";
AdditionalCriteria5.value = "";
Additional6.value = "";
AdditionalCriteria6.value = "";
Additional7.value = "";
AdditionalCriteria7.value = "";
Additional8.value = "";
AdditionalCriteria8.value = "";
Additional9.value = "";
AdditionalCriteria9.value = "";
Additional10.value = "";
AdditionalCriteria10.value = "";
averageRating.value = "";
OverallRating.value = "";
AthleticsImpToPos.value = "";
AthleticsEmp.value = "";
AtDoesnotMeet.value = "";
AtMeets.value = "";
supportFactorComments1.value = "";
supportFactorComments2.value = "";
performanceGoalComment1.value = "";
performanceGoalComment2.value = "";
performanceGoalComment3.value = "";
EvaluatorComment.value = "";
formSavedStatus.value = "";
EmpIdFlag.value = "";
Copy_ReviewPeriodFrom.value = "";
Copy_ReviewPeriodTo.value = "";
CopyRB.value = "";
ReviewPeriodFrom.value = "";
ReviewPeriodTo.value = "";
        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_saveguidedraft1561458314740_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_saveguidedraft1561458314740_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(EmpID.value !== null){
  aftiaDescCWID.value = (StaffFirstName.value + " " + StaffLastName.value + " " + EmpID.value+ " "+EvaluationType.value);
  //formSavedStatus.value = "Yes";
 // EmplID.enabled = false;
  handleDraftSave(this);
  
}else{
  showErrorModal("Alert!","Please enter the employee id");
}

// handleDraftSave(this);



        }
	}
}
/**
 * @function staff_performance_evaluation_staff_performance_evaluation.generated_submit1561458295099_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
staff_performance_evaluation_staff_performance_evaluation.generated_submit1561458295099_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (EmpID.value !== null) {
    aftiaDescCWID.value = (StaffFirstName.value + " " + StaffLastName.value + " " + EmpID.value + " " + EvaluationType.value);
}
EmailSubject.value = "Staff Performance Evaluation - "+EmpID.value; 
ManagerEmailSubject.value = "Staff Performance Evaluation - "+EmpID.value+" - Manager Review"; 
HREmailSubject.value = "Staff Performance Evaluation - "+EmpID.value+" - HR Review"; 
HRRejectionEmailSubject.value = "Staff Performance Evaluation - "+EmpID.value+" - HR Rejection - Manager Review"; 
ApprovedEmailSubject.value = "Staff Performance Evaluation - "+EmpID.value+" - Completed"; 


guideBridge.submit();
        }
	}
}
