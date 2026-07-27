/**
 * @function aem_ai_agents_aem_ai_agents.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
aem_ai_agents_aem_ai_agents.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  
//signatureReview.visible =true;
  //HRSection.visible = true;
  SupPanel.visible = false;
  PayrollPanel.visible = false;
}

if(StageIndicator.value === "ToSupervisor"){
  
  basicInformation.enabled = false;
  
  var rowCount = AbsentDetails.instanceManager.instanceCount;
  AbsentDetails.enabled = false;
  for (i = 0; i < rowCount; i++) {
    AbsentDetails.instanceManager.instances[i].DateAbsent.enabled = false;
     AbsentDetails.instanceManager.instances[i].HourAbsent.enabled = false;
  }
  /*AbsentDetails.enabled =false;
  AbsentDetails.DateAbsent.enabled =false;
  AbsentDetails.HourAbsent.enabled =false;*/
  SupPanel.visible = true;
  SupPanel.enabled =  true;
  PayrollPanel.visible = false;
  
}
if(StageIndicator.value === "ToPayroll"){
  basicInformation.enabled = false;
  SSN.value = maskSSN.value;
  DateAbsent.enabled = false;  
  HourAbsent.enabled = false;
  SupPanel.visible = true;
  SupPanel.enabled = false;
  PayrollPanel.visible = true;
  PayrollPanel.enabled = true;
}

        }
	}
}
/**
 * @function aem_ai_agents_aem_ai_agents.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
aem_ai_agents_aem_ai_agents.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;


    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            var userValue = response.userId;
           // userValue = userValue + "@FULLERTON.EDU"; 
          userValue = userValue + "@fullerton.edu"; // This will append the domain to the userId
          //  Email.value = userValue; 
         Email.value =   "soumya.ravindra@thoughtfocus.com";
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });

        }
	}
}
/**
 * @function aem_ai_agents_aem_ai_agents.generated_DepartmentList_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
aem_ai_agents_aem_ai_agents.generated_DepartmentList_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";
debugger;
	var deptname = this.value;
    var appResult = [];
		if((this.value !== "Select Department") && (this.value !== null)){
           $.ajax({

                type: 'GET', 

                url:"/bin/getFormListData",

               data:  {           
                 action: "AI_FORM_LIST",
                deptName: this.value
                  },

                dataType: 'json',

                success: function(myresponse){

                        gifModal.style.display = "none";
debugger;
                  if(myresponse.length >= 1){
                    for (var i = 0; i < myresponse.length; i++) {
                        var item = myresponse[i].FORM_NAME;                   
                        appResult.push(item);
                    }
                    FormsList.value = "";
                    FormsList.items = appResult;
				} else {
                    showErrorModal("Alert!", "No matching records found");
                    FormsList.items = [];
                    FormsList.value = "";
                }
           }
              });
		}else{
            FormsList.value = "";
            FormsList.items = [];
			gifModal.style.display = "none";
}
gifModal.style.display = "none"; 


        }
	}
}
/**
 * @function aem_ai_agents_aem_ai_agents.generated_FormsList_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
aem_ai_agents_aem_ai_agents.generated_FormsList_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";
debugger;
	
    var appResult = [];
		if((this.value !== "Select Form") && (this.value !== null)){
           $.ajax({

                type: 'GET', 

                url:"/bin/getFormListData",

               data:  {           
                 action: "AI_WORKFLOW_LIST",
                formName: this.value
                  },

                dataType: 'json',

                success: function(myresponse){

                        gifModal.style.display = "none";
debugger;
                  if(myresponse.length >= 1){
                    for (var i = 0; i < myresponse.length; i++) {
                        var item = myresponse[i].WORKFLOW_STEP;                   
                        appResult.push(item);
                    }
                    Workflow_Step_List.value = "";
                    Workflow_Step_List.items = appResult;
				} else {
                    showErrorModal("Alert!", "No matching records found");
                    Workflow_Step_List.items = [];
                    Workflow_Step_List.value = "";
                }
           }
              });
		}else{
           Workflow_Step_List.items = [];
           Workflow_Step_List.value = "";
			gifModal.style.display = "none";
}
gifModal.style.display = "none"; 


        }
	}
}
/**
 * @function aem_ai_agents_aem_ai_agents.generated__click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
aem_ai_agents_aem_ai_agents.generated__click0 = function (scope) {
    with(this) {
        with(scope) {
            var submitFlag = 0;
var i=0;
alert(AbsentDetails.instanceIndex);
for (i=0; i<=AbsentDetails.instanceIndex; i++){
  alert("here");
  if(AbsentDetails.instanceManager.instances[i].DateAbsent.value !== null && AbsentDetails.instanceManager.instances[i].DateAbsent.value !== ""){
  if(AbsentDetails.instanceManager.instances[i].HourAbsent.value === null){
    	alert("Please enter hour absent");
       //alert(guide[0].guide1[0].guideRootPanel[0].basicInformation[0].AbsentDetails[i].HourAbsent[0]);
        guideBridge.setFocus(guide[0].guide1[0].guideRootPanel[0].basicInformation[0].AbsentDetails[i].HourAbsent[0]);
        submitFlag=1;
  }else{
     submitFlag=0;
  }
  
}
  
}



/*if(AbsentDetails.instanceManager.instances[1].DateAbsent.value !== null && AbsentDetails.instanceManager.instances[1].DateAbsent.value !== ""){
  if(AbsentDetails.instanceManager.instances[1].HourAbsent.value === null){
    	alert("Please enter hour absent");    
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].basicInformation[0].AbsentDetails[1].HourAbsent[0]");
        submitFlag=1;
  }else{
     submitFlag=0;
  }
  
}*/

if(submitFlag === 0){
  guideBridge.submit();
}


        }
	}
}
/**
 * @function aem_ai_agents_aem_ai_agents.generated_submit_13966870281576568571969_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
aem_ai_agents_aem_ai_agents.generated_submit_13966870281576568571969_click0 = function (scope) {
    with(this) {
        with(scope) {
            //debugger; 
if(DepartmentList.value !== null && FormsList.value !== null && Workflow_Step_List.value !== null){
validateSubmit();
}
else{
  showErrorModal("Alert !","Please enter the required details");
}
function validateSubmit() {
  console.log("Test");
  debugger;
   var deptName = DepartmentList.value;
   var fList = FormsList.value;
   var wfStep = Workflow_Step_List.value;
  $.ajax({
    type: 'POST',
	url: "/bin/getAIAgentSubmit",
    data: {
        action: "AI_AGENT_DATA",
        deptN: deptName,
       wfStepN: wfStep,
        form: fList
        
    },
    dataType: 'json',
    success: function(myresponse) {
      guideBridge.submit();
    }});
}

        }
	}
}
/**
 * @function aem_ai_agents_aem_ai_agents.generated_submit_13966870281576568571969_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
aem_ai_agents_aem_ai_agents.generated_submit_13966870281576568571969_click1 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
validateSubmitclick(); 
function validateSubmitclick() {
   var deptName = DepartmentList.value;
  var fList = FormsList.value;
   var wfStep = Workflow_Step_List.value;
  $.ajax({
    type: 'POST',
    url: "/bin/getAIAgentSubmit",
    data: {
        action: "AI_AGENT_DATA",
        deptN: deptName, 
        formN: fList, 
        wfStepN: wfStep
    },
    dataType: 'json',
    success: function(myresponse) {
      guideBridge.submit();
      
    }});
}
        }
	}
}
