/**
 * @function mpp_justification_form_mpp_justification_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null && formSavedStatus.value === null) {
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";

    $.ajax({

        type: 'GET',
        url: "/bin/getAllLoggedInUserDetailsLookup",
        dataType: 'json',
        success: function(myresponse) {
            if (myresponse.length > 0) {
              		if((myresponse[0].USERID !== null) && (myresponse[0].USERID !== undefined)){
                         
                      hidden_initiator_firstName.value = myresponse[0].FIRSTNAME;
                      hidden_initiator_lastName.value = myresponse[0].LASTNAME;
                      hidden_initiator_cwid.value = myresponse[0].EMPLOYEEID;
                      hidden_initiator_name.value = myresponse[0].FIRSTNAME+" "+myresponse[0].LASTNAME;
                      var initiatorUserId = myresponse[0].USERID;
                      hidden_initiator_userID.value = initiatorUserId;
                      workflow_initiator.value = initiatorUserId;
                     // hidden_initiator_email.value = myresponse[0].EMAILID;
                     hidden_initiator_email.value = "chaitanya.sai@thoughtfocus.com";
                    }
                	gifModal.style.display = "none";
              
            } else {
                	showErrorModal("Alert !", "No matching records found");
                	gifModal.style.display = "none";
            }
        }
    });
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            var gifModal = document.getElementById('gifModal');
if(StageIndicator.value === null){
  	ApprovalsPanel.visible = false;
}
else if(StageIndicator.value == "ToMPPSupervisor"){
	gifModal.style.display = "none";  
  	if(work_continuousRB.value != "1"){
        expected_end_date.visible = true;
    }
    else{
        expected_end_date.visible = false;
    }
	ApprovalsPanel.visible = true;
	AppropriateAdminSignaturePanel.visible = false;
	VicePresidentSignaturePanel.visible = false;
	CampusDesigneeSignaturePanel.visible = false;
	MppPositionPanel.enabled = false;
	PositionInformationPanel.enabled = false;
	QuestionnairesPanel.enabled = false;
  	ApprovalPanel.visible = false;
	RecordsSignaturePanel.visible = false;
  
   if(payroll_Signature_CHK.value == "1"){
    AppropriateAdminSignaturePanel.visible = true;
    AppropriateAdminSignaturePanel.enabled = false;
  }else{
     AppropriateAdminSignaturePanel.visible = false;
  }
  if(vp_CHK.value == "1"){
    VicePresidentSignaturePanel.visible = true;
    VicePresidentSignaturePanel.enabled = false;
  }else{
     VicePresidentSignaturePanel.visible = false;
  }
  if(compensation_services_CHK.value == "1"){
    RecordsSignaturePanel.visible = true;
    RecordsSignaturePanel.enabled = false;
  }else{
     RecordsSignaturePanel.visible = false;
  }
  if(campus_designee_CHK.value == "1"){
    CampusDesigneeSignaturePanel.visible = true;
    CampusDesigneeSignaturePanel.enabled = false;
  }else{
     CampusDesigneeSignaturePanel.visible = false;
  }
  
}
else if(StageIndicator.value == "ToAppropriateAdmin"){
	gifModal.style.display = "none";
  	if(work_continuousRB.value != "1"){
        expected_end_date.visible = true;
    }
    else{
        expected_end_date.visible = false;
    }
	ApprovalsPanel.visible = true;
	MPPSupervisorSignaturePanel.visible = true;
	MPPSupervisorSignaturePanel.enabled = false;
	AppropriateAdminSignaturePanel.visible = true;
	VicePresidentSignaturePanel.visible = false;
	CampusDesigneeSignaturePanel.visible = false;
	MppPositionPanel.enabled = false;
	PositionInformationPanel.enabled = false;
	QuestionnairesPanel.enabled = false;
  	ApprovalPanel.visible = false;
	RecordsSignaturePanel.visible = false;
  
   if(vp_CHK.value == "1"){
    VicePresidentSignaturePanel.visible = true;
    VicePresidentSignaturePanel.enabled = false;
  }else{
     VicePresidentSignaturePanel.visible = false;
  }
  if(compensation_services_CHK.value == "1"){
    RecordsSignaturePanel.visible = true;
    RecordsSignaturePanel.enabled = false;
  }else{
     RecordsSignaturePanel.visible = false;
  }
  if(campus_designee_CHK.value == "1"){
    CampusDesigneeSignaturePanel.visible = true;
    CampusDesigneeSignaturePanel.enabled = false;
  }else{
     CampusDesigneeSignaturePanel.visible = false;
  }
  
}
else if(StageIndicator.value == "ToVP"){
	gifModal.style.display = "none";
  	if(work_continuousRB.value != "1"){
        expected_end_date.visible = true;
    }
    else{
        expected_end_date.visible = false;
    }
	ApprovalsPanel.visible = true;
	MPPSupervisorSignaturePanel.visible = true;
	MPPSupervisorSignaturePanel.enabled = false;
	AppropriateAdminSignaturePanel.visible = true;
	AppropriateAdminSignaturePanel.enabled = false;
	VicePresidentSignaturePanel.visible = true;
	CampusDesigneeSignaturePanel.visible = false;
	MppPositionPanel.enabled = false;
	PositionInformationPanel.enabled = false;
	QuestionnairesPanel.enabled = false;
  	ApprovalPanel.visible = false;
	RecordsSignaturePanel.visible = false;
  
   if(compensation_services_CHK.value == "1"){
    RecordsSignaturePanel.visible = true;
    RecordsSignaturePanel.enabled = false;
  }else{
     RecordsSignaturePanel.visible = false;
  }
  if(campus_designee_CHK.value == "1"){
    CampusDesigneeSignaturePanel.visible = true;
    CampusDesigneeSignaturePanel.enabled = false;
  }else{
     CampusDesigneeSignaturePanel.visible = false;
  }
  
}
else if(StageIndicator.value == "ToCompServices"){
	gifModal.style.display = "none";
  	if(work_continuousRB.value != "1"){
        expected_end_date.visible = true;
    }
    else{
        expected_end_date.visible = false;
    }
	ApprovalsPanel.visible = true;
	MPPSupervisorSignaturePanel.visible = true;
	MPPSupervisorSignaturePanel.enabled = false;
	AppropriateAdminSignaturePanel.visible = true;
	AppropriateAdminSignaturePanel.enabled = false;
  	VicePresidentSignaturePanel.visible = true;
  	VicePresidentSignaturePanel.enabled = false;	
	CampusDesigneeSignaturePanel.visible = false;  	
	MppPositionPanel.enabled = true;
	PositionInformationPanel.enabled = true;
	QuestionnairesPanel.enabled = true;
  	ApprovalPanel.visible = false;
  
   if(campus_designee_CHK.value == "1"){
    CampusDesigneeSignaturePanel.visible = true;
    CampusDesigneeSignaturePanel.enabled = false;
  }else{
     CampusDesigneeSignaturePanel.visible = false;
  }
  
}
else if(StageIndicator.value == "ToCampusDesignee"){
	gifModal.style.display = "none";
  	if(work_continuousRB.value != "1"){
        expected_end_date.visible = true;
    }
    else{
        expected_end_date.visible = false;
    }
	ApprovalsPanel.visible = true;
	MPPSupervisorSignaturePanel.visible = true;
	MPPSupervisorSignaturePanel.enabled = false;
	AppropriateAdminSignaturePanel.visible = true;
	AppropriateAdminSignaturePanel.enabled = false;
  	VicePresidentSignaturePanel.visible = true;
	VicePresidentSignaturePanel.enabled = false;
	CampusDesigneeSignaturePanel.visible = true;
  	RecordsSignaturePanel.enabled = false;
	MppPositionPanel.enabled = false;
	PositionInformationPanel.enabled = false;
	QuestionnairesPanel.enabled = false;
  	ApprovalPanel.visible = false;
}

else if(StageIndicator.value == "ToInitiator"){
  gifModal.style.display = "none";
  if(mpp_supervisor_CHK.value == "1"){
    MPPSupervisorSignaturePanel.visible = true;
    MPPSupervisorSignaturePanel.enabled = false;
  }else{
     MPPSupervisorSignaturePanel.visible = false;
  }
  if(payroll_Signature_CHK.value == "1"){
    AppropriateAdminSignaturePanel.visible = true;
    AppropriateAdminSignaturePanel.enabled = false;
  }else{
     AppropriateAdminSignaturePanel.visible = false;
  }
  if(vp_CHK.value == "1"){
    VicePresidentSignaturePanel.visible = true;
    VicePresidentSignaturePanel.enabled = false;
  }else{
     VicePresidentSignaturePanel.visible = false;
  }
  if(compensation_services_CHK.value == "1"){
    RecordsSignaturePanel.visible = true;
    RecordsSignaturePanel.enabled = false;
  }else{
     RecordsSignaturePanel.visible = false;
  }
  if(campus_designee_CHK.value == "1"){
    CampusDesigneeSignaturePanel.visible = true;
    CampusDesigneeSignaturePanel.enabled = false;
  }else{
     CampusDesigneeSignaturePanel.visible = false;
  }
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_new_cms_positionCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_new_cms_positionCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	repurposed_cms_positionCHK.value = null;
	reclassificationCHK.value = null;
	recruitmentCHK.value = null;
	appointmentCHK.value = null;
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_repurposed_cms_positionCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_repurposed_cms_positionCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	new_cms_positionCHK.value = null;
	reclassificationCHK.value = null;
	recruitmentCHK.value = null;
	appointmentCHK.value = null;
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_reclassificationCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_reclassificationCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            	
if(this.value == 1){
  	new_cms_positionCHK.value = null;
	repurposed_cms_positionCHK.value = null;
	recruitmentCHK.value = null;
	appointmentCHK.value = null;
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_recruitmentCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_recruitmentCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	new_cms_positionCHK.value = null;
	repurposed_cms_positionCHK.value = null;
	reclassificationCHK.value = null;
	appointmentCHK.value = null;
  	recruitment_CHRS.enabled = true;
}
else{
  	recruitment_CHRS.enabled = false;
  	recruitment_CHRS.value = null;
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_appointmentCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_appointmentCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  	new_cms_positionCHK.value = null;
	repurposed_cms_positionCHK.value = null;
	reclassificationCHK.value = null;
	recruitmentCHK.value = null;
  	appointment_CCAR.enabled = true;
}
else{
  	appointment_CCAR.enabled = false;
  	appointment_CCAR.value = null;
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_cms_position_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_cms_position_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToCompServices") {
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";

    var cmsPositionNumber = this.value;
  	var jArray = [];
    var divisionName;

    $.ajax({

        type: 'GET',

        url: "/bin/getMPPJustificationData",

        data: {
            cmsPosition: cmsPositionNumber,
            action: 'CMSPOSITIONDETAILS'
        },

        dataType: 'json',

        success: function(response) {

            if (response.length > 0) {   
              debugger;
                department.value = response[0].DEPTNAME;
                mpp_supervisor.value = response[0].MANAGE_EMP_NAME;
                working_title.value = response[0].POS_DESCR;
                proposed_admin.value = response[0].DESCR;
                divisionName = response[0].DIVISION_NAME;
              
              	for(var ab=0;ab<response.length;ab++){ 
                  	if(response[ab].POSITION_NBR !== null && response[ab].POSITION_NBR !== undefined){
                      	jArray.push(response[ab].POSITION_NBR);
                    }                  	
                }              	
              	var allPositionNumbers = jArray;              	              
              	reportee_name.value = allPositionNumbers;

              	// Method to show the correct Division name as per the MPP Justification Original Form. The names in the DB are different
                divisionNames(divisionName);  
                HrCOO_ManagementSupervisor.value = "";
                hidden_divisionCode_divisionName.value = response[0].DIVISON + " - " + response[0].DIVISION_NAME;
                hidden_mppSupervisor_userID.value = response[0].MANAGER_EMP_USERID;
                hidden_mppSupervisor_name.value = response[0].MANAGE_EMP_NAME;
                //hidden_mppSupervisor_email.value = response[0].MANAGER_EMAIL_ID;
                hidden_mppSupervisor_email.value = "chaitanya.sai@thoughtfocus.com";
               

                getHRCooDetailsForManagementSupervisor();

                HrCOO_ApropriateAdmin.value = "";
                hidden_admin_userID.value = response[0].ADMIN_EMP_USERID;
                hidden_admin_name.value = response[0].ADMIN_EMP_NAME;
                AppropriateAdminLookupName.value = response[0].ADMIN_EMP_NAME;
               // hidden_admin_email.value = response[0].ADMIN_EMAIL_ID;
                hidden_admin_email.value = "chaitanya.sai@thoughtfocus.com";

                getHRCooDetailsForAdmin();


                gifModal.style.display = "none";
            } else {
                showErrorModal("Alert !", "No matching records found");
                gifModal.style.display = "none";
            }
        }
    }); // end 1st ajax  
}



function getHRCooDetailsForManagementSupervisor() {
    if (StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToCompServices") {
        var departmentManagerUserId = hidden_mppSupervisor_userID.value;

        $.ajax({
            type: 'GET',
            url: "/bin/getDeptCoordinatorForVP",
            data: {
                userID: departmentManagerUserId
            },
            dataType: 'json',
            success: function(delegateeResponse) {

                if (delegateeResponse.length > 0) {
                    var vpUserId = delegateeResponse[0].VP_USERID;

                    if (departmentManagerUserId == vpUserId) {
                        hidden_mppSupervisor_name.value = delegateeResponse[0].HR_COO_FNAME + " " + delegateeResponse[0].HR_COO_LNAME;
                        hidden_mppSupervisor_userID.value = delegateeResponse[0].HR_COO_USERID;
                       // hidden_mppSupervisor_email.value = delegateeResponse[0].HR_COO_EMAIL;
                        hidden_mppSupervisor_email.value = "chaitanya.sai@thoughtfocus.com";                                            	

                        HrCOO_ManagementSupervisor.value = delegateeResponse[0].VP_FNAME + " " + delegateeResponse[0].VP_LNAME;
                    }
                }
            }
        });
    }
}

function getHRCooDetailsForAdmin() {
    if (StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToCompServices") {

        var adminUserId = hidden_admin_userID.value;

        $.ajax({
            type: 'GET',
            url: "/bin/getDeptCoordinatorForVP",
            data: {
                userID: adminUserId
            },
            dataType: 'json',
            success: function(delegateeResponse) {

                if (delegateeResponse.length > 0) {
                    var vpUserId = delegateeResponse[0].VP_USERID;

                    if (adminUserId == vpUserId) {
                        hidden_admin_name.value = delegateeResponse[0].HR_COO_FNAME + " " + delegateeResponse[0].HR_COO_LNAME;
                        hidden_admin_userID.value = delegateeResponse[0].HR_COO_USERID;
                        //hidden_admin_email.value = delegateeResponse[0].HR_COO_EMAIL;
                        hidden_admin_email.value = "chaitanya.sai@thoughtfocus.com";                                            	

                        HrCOO_ApropriateAdmin.value = delegateeResponse[0].VP_FNAME + " " + delegateeResponse[0].VP_LNAME;
                    }
                }
            }
        });
    }
}



function divisionNames(divisionName) {
    if (divisionName == "VP Academic Affairs -NP") {
        division.value = "Academic Affairs";
    } else if (divisionName == "VP Administration & Finance") {
        division.value = "Admin. & Finance";
    } else if (divisionName == "IT-Information Technology") {
        division.value = "Information Technology";
    } else if (divisionName == "VP of Student Affairs Office") {
        division.value = "Student Affairs";
    } else if (divisionName == "VP University Advancement") {
        division.value = "University Advancement";
    } else if (divisionName == "Vice President of HR") {
        division.value = "HRDI";
    } else if (divisionName == "President's Office") {
        division.value = "President's Office";
    }
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_division_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_division_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_division_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_division_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToCompServices"){   
  
	var divisonNameCode = hidden_divisionCode_divisionName.value;
	//var divisonNameCode = "10141 - IT-Information Technology";
	var deptId = divisonNameCode.split(" - ");
	var deptIdValue = deptId[0]; 
    
  	//var deptIdValue = '10189';

	$.ajax({
		type: 'GET',
		url: "/bin/getDeptCoordinatorForVP",
		data: {
				deptID: deptIdValue               	
		},
		dataType: 'json',
		success: function(delegateeResponse) {	
          	debugger;
			if (delegateeResponse.length > 0) {                				
				if((delegateeResponse[0].VP_DEPTID !== null) && (delegateeResponse[0].VP_DEPTID !== undefined)){                      	
					hidden_vp_name.value = delegateeResponse[0].HR_COO_FNAME + " " + delegateeResponse[0].HR_COO_LNAME;
					hidden_vp_userID.value = delegateeResponse[0].HR_COO_USERID;				 
					//hidden_vp_email.value = delegateeResponse[0].HR_COO_EMAIL;                      	
					hidden_vp_email.value = "chaitanya.sai@thoughtfocus.com";                                            	
				  
					HrCOO_VP.value = delegateeResponse[0].VP_FNAME + " " + delegateeResponse[0].VP_LNAME;
				}
			}
		}
	});
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_department_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_department_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_working_title_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_working_title_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_proposed_admin_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_proposed_admin_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_work_continuousRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_work_continuousRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value != "1"){
  	expected_end_date.visible = true;
}
else{
  	expected_end_date.visible = false;
    expected_end_date.value = "";
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_expected_end_date_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_expected_end_date_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_mpp_supervisor_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_mpp_supervisor_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_AppropriateAdminLookupName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_AppropriateAdminLookupName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_textbox1663323253925_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_textbox1663323253925_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToCompServices") {
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
                    //appResult.push("Select Optional Reviewer");
                    for (var i = 0; i < fundApproverResult.length; i++) {
                        var item = fundApproverResult[i].FIRSTNAME + " " + fundApproverResult[i].LASTNAME;
                        //var uid = fundApproverResult[i].USERID;
                        var uid = fundApproverResult[i].EMAILID;
                        var idItem = i + 1;
                        //var jbcode = item.text;
                        appResult.push(item + " - " + uid);
                    }
                    MPPSupervisorDropDown.value = "";
                    MPPSupervisorDropDown.items = appResult;
                  mpp_supervisor.value = "";
                   hidden_mppSupervisor_userID.value = "";
                   hidden_mppSupervisor_name.value = "";
                    hidden_mppSupervisor_email.value = "";

                } else {
                    showErrorModal("Alert!", "No matching records found");
                    MPPSupervisorDropDown.items = [];
                    MPPSupervisorDropDown.value = "";
                  mpp_supervisor.value = "";
                   hidden_mppSupervisor_userID.value = "";
                   hidden_mppSupervisor_name.value = "";
                    hidden_mppSupervisor_email.value = ""; 
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_MPPSupervisorDropDown_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_MPPSupervisorDropDown_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToCompServices") {
    var approverName = this.value;
    var approverEmplId;
    if (approverName != "Select Optional Reviewer" && approverName !== "") {
        approverName = approverName.substr(0, approverName.indexOf(' - '));
        mpp_supervisor.value = approverName;
      hidden_mppSupervisor_name.value = approverName;
       
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
                    approverEmplId = myresopnse[0].EMPLID;
                    getEmployeeDetails(approverEmplId);
                } else {
                       mpp_supervisor.value = "";
                   hidden_mppSupervisor_userID.value = "";
                   hidden_mppSupervisor_name.value = "";
                    hidden_mppSupervisor_email.value = ""; 
                }
            }
        });
    } else {
                   mpp_supervisor.value = "";
                   hidden_mppSupervisor_userID.value = "";
                   hidden_mppSupervisor_name.value = "";
                    hidden_mppSupervisor_email.value = ""; 
    }
}

function getEmployeeDetails(approverEmplId) {
    if (StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToCompServices") {
        if (approverEmplId !== null) {
            $.ajax({
                type: 'GET',
                url: "/bin/getFAERData",
                data: {
                    action: "FAER_APPROVER_DETAILS",
                    approverEmplID: approverEmplId
                },
                dataType: 'json',
                success: function(myresopnse) {
                    if (myresopnse.length !== 0) {
                        hidden_mppSupervisor_userID.value = myresopnse[0].EMP_USERID;
                       // hidden_mppSupervisor_email.value = myresopnse[0].EMAILID;
                        hidden_mppSupervisor_email.value = "chaitanya.sai@thoughtfocus.com";    
                    } else {
                           mpp_supervisor.value = "";
                   hidden_mppSupervisor_userID.value = "";
                   hidden_mppSupervisor_name.value = "";
                    hidden_mppSupervisor_email.value = ""; 
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
 * @function mpp_justification_form_mpp_justification_form.generated_textbox1663324379749_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_textbox1663324379749_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToCompServices") {
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
                    //appResult.push("Select Optional Reviewer");
                    for (var i = 0; i < fundApproverResult.length; i++) {
                        var item = fundApproverResult[i].FIRSTNAME + " " + fundApproverResult[i].LASTNAME;
                        //var uid = fundApproverResult[i].USERID;
                        var uid = fundApproverResult[i].EMAILID;
                        var idItem = i + 1;
                        //var jbcode = item.text;
                        appResult.push(item + " - " + uid);
                    }
                    AppropriateAdminDropDown.value = "";
                    AppropriateAdminDropDown.items = appResult;
                    hidden_admin_userID.value = "";
                    hidden_admin_name.value = "";
                    AppropriateAdminLookupName.value = ""; 
                  hidden_admin_email.value = ""; 

                } else {
                    showErrorModal("Alert!", "No matching records found");
                    AppropriateAdminDropDown.items = [];
                    AppropriateAdminDropDown.value = "";
                    hidden_admin_userID.value = "";
                    hidden_admin_name.value = "";
                    AppropriateAdminLookupName.value = ""; 
                  hidden_admin_email.value = ""; 
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_AppropriateAdminDropDown_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_AppropriateAdminDropDown_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToCompServices") {
    var approverName = this.value;
    var approverEmplId;
    if (approverName != "Select Optional Reviewer" && approverName !== "") {
        approverName = approverName.substr(0, approverName.indexOf(' - '));
        hidden_admin_name.value = approverName;
      AppropriateAdminLookupName.value = approverName;
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
                    approverEmplId = myresopnse[0].EMPLID;
                    getEmployeeDetails(approverEmplId);
                } else {
                         hidden_admin_userID.value = "";
                    hidden_admin_name.value = "";
                    AppropriateAdminLookupName.value = ""; 
                  hidden_admin_email.value = ""; 
                }
            }
        });
    } else {
           hidden_admin_userID.value = "";
                    hidden_admin_name.value = "";
                    AppropriateAdminLookupName.value = ""; 
                  hidden_admin_email.value = ""; 
    }
}

function getEmployeeDetails(approverEmplId) {
    if (StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToCompServices") {
        if (approverEmplId !== null) {
            $.ajax({
                type: 'GET',
                url: "/bin/getFAERData",
                data: {
                    action: "FAER_APPROVER_DETAILS",
                    approverEmplID: approverEmplId
                },
                dataType: 'json',
                success: function(myresopnse) {
                    if (myresopnse.length !== 0) {
                        hidden_admin_userID.value = myresopnse[0].EMP_USERID;
                       // hidden_admin_email.value = myresopnse[0].EMAILID;
                          hidden_admin_email.value = "chaitanya.sai@thoughtfocus.com";    
                    } else {
                           hidden_admin_userID.value = "";
                    hidden_admin_name.value = "";
                    AppropriateAdminLookupName.value = ""; 
                  hidden_admin_email.value = ""; 
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
 * @function mpp_justification_form_mpp_justification_form.generated_mpp_supervisor_CHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_mpp_supervisor_CHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value == "ToMPPSupervisor") {
    if (this.value == 1) {
        if (mpp_supervisor_date.value === null) {                     
          	getSignerDetails();
        }
    } else {
        mpp_supervisor_signature.value = null;
        mpp_supervisor_date.value = null;
    }
}

function getSignerDetails() {
    $.ajax({

        type: 'GET',
        url: "/bin/getLoggedInUserDetails",
        dataType: 'json',

        success: function(myresponse) {            
            mpp_supervisor_date.value = myresponse.SERVER_DATE; 
          	
          	if(HrCOO_ManagementSupervisor.value !== null){
              	mpp_supervisor_signature.value =  hidden_mppSupervisor_name.value + " on behalf of " + HrCOO_ManagementSupervisor.value;
            }
          	else{
              	mpp_supervisor_signature.value = myresponse.userName;
            }
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
    mpp_supervisor_signature.enabled = false;
  	mpp_supervisor_date.enabled = false;
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_mpp_supervisor_date_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_mpp_supervisor_date_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled =false;
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_payroll_Signature_CHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_payroll_Signature_CHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToAppropriateAdmin") {
    if (this.value == 1) {
        if (appropriate_admin_date.value === null) {                   
          	getSignerDetails();
        }
    } else {
        appropriate_admin_signature.value = null;
        appropriate_admin_date.value = null;
    }
}


function getSignerDetails() {
    $.ajax({

        type: 'GET',
        url: "/bin/getLoggedInUserDetails",
        dataType: 'json',

        success: function(myresponse) {           
            appropriate_admin_date.value = myresponse.SERVER_DATE;
          
          	if(HrCOO_ApropriateAdmin.value !== null){
              	appropriate_admin_signature.value =  hidden_admin_name.value+ " on behalf of " + HrCOO_ApropriateAdmin.value;
            }
          	else{
              	appropriate_admin_signature.value = myresponse.userName;
            }
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
    appropriate_admin_signature.enabled = false;
  	appropriate_admin_date.enabled = false;
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_appropriate_admin_date_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_appropriate_admin_date_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_vp_CHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_vp_CHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value == "ToVP") {
    if (this.value == 1) {
        if (vp_date.value === null) {                     
          	getSignerDetails();
        }
    } else {
        vp_signature.value = null;
        vp_date.value = null;
    }
}

function getSignerDetails() {
    $.ajax({

        type: 'GET',
        url: "/bin/getLoggedInUserDetails",
        dataType: 'json',

        success: function(myresponse) {            
            vp_date.value = myresponse.SERVER_DATE; 
          	
          	if(HrCOO_VP.value !== null){
              	vp_signature.value =  hidden_vp_name.value+ " on behalf of " + HrCOO_VP.value;
            }
          	else{
              	vp_signature.value = myresponse.userName;
            }
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
    vp_signature.enabled = false;
  	vp_date.enabled = false;
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_vp_CHK_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_vp_CHK_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(stage_indicator.value == "ToDivisionHead"){
  if(this.value == "1"){

     $.ajax({

       type: 'GET', 

       url:"/bin/getLoggedUserDetails",

       dataType: 'json',

       success: function(myresponse){

           division_head_signature.value = myresponse.userName;
		   division_head_name.value = myresponse.userName;
       }
    });
  }
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_vp_date_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_vp_date_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_compensation_services_CHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_compensation_services_CHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if ((this.value == 1) && (StageIndicator.value == "ToCompServices")) {
    if (campus_designee_date.value === null) {

        $.ajax({

            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',

            success: function(myresponse) {
                reviewe_by.value = myresponse.userName;                
                reviewe_by_date.value = myresponse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        reviewe_by.enabled = false;

    } else {
        reviewe_by_date.enabled = false;
        reviewe_by.enabled = false;
    }
} else {
    reviewe_by_date.value = null;   
    reviewe_by.value = null;
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_reviewe_by_date_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_reviewe_by_date_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_campus_designee_CHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_campus_designee_CHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if ((this.value == 1) && (StageIndicator.value == "ToCampusDesignee")) {
    if (campus_designee_date.value === null) {

        $.ajax({

            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',

            success: function(myresponse) {
              	campus_designee_date.value = myresponse.SERVER_DATE;
                campus_designee_signature.value = hidden_designee_name.value;                               
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        campus_designee_signature.enabled = false;

    } else {
        campus_designee_date.enabled = false;
        campus_designee_signature.enabled = false;
    }
} else {
    campus_designee_date.value = null;   
    campus_designee_signature.value = null;
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_campus_designee_date_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_campus_designee_date_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_ApprovalPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_ApprovalPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;

        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_vp_name_select_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_vp_name_select_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
      	
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";
  	
    var lastName = this.value;
	var vpNamesArray = [];
  
  	if(this.value !== null){

        $.ajax({
            type: 'GET',
            url: "/bin/getUserDetailsForSearchFunctionality",
            data: {
                lName: lastName				
            },
            dataType: 'json',
            success: function(response) {
               
                if (response.length > 0) {                  	
                      	 
					for(var vpList=0; vpList < response.length; vpList++){
						 vpNamesArray.push(response[vpList].FIRST_NAME + " " + response[vpList].LAST_NAME);
					}
					
					vp_nameList.items = vpNamesArray;
					
					if(this.value !== null){
                        vp_nameList.mandatory = true;
                    }
                  
					gifModal.style.display = "none";
                      
                } else {
                    showErrorModal("Alert !","No matching records found");                    
                    gifModal.style.display = "none";
                }

            }
        });
    }else{
      		vp_nameList.value = null;
      		gifModal.style.display = "none";      	
    }
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_vp_nameList_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_vp_nameList_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {

    if (this.value !== null) {

        var gifModal = document.getElementById('gifModal');
        gifModal.style.display = "block";

        var completeName = this.value;
        var lastName = completeName.split(" ");
        var firstNameValue = lastName[0];
        var lastNameValue = lastName[1];

        $.ajax({
            type: 'GET',
            url: "/bin/getUserDetailsForSearchFunctionality",
            data: {
                fName: firstNameValue,
                lName: lastNameValue
            },
            dataType: 'json',
            success: function(myresponse) {

                if (myresponse.length > 0) {

                    var vpId = myresponse[0].USER_ID;

                    $.ajax({
                        type: 'GET',
                        url: "/bin/getDeptCoordinatorForVP",
                        data: {
                            userID: vpId
                        },
                        dataType: 'json',
                        success: function(delegateeResponse) {
							debugger;
                            if (delegateeResponse.length > 0) {

                                var vpUserId = delegateeResponse[0].VP_USERID;

                                if (vpId == vpUserId) {                                    
                                    hidden_vp_userID.value = delegateeResponse[0].HR_COO_USERID;
                                    hidden_vp_name.value = delegateeResponse[0].HR_COO_FNAME + " " + delegateeResponse[0].HR_COO_LNAME;

                                }
                            } else {
                                hidden_vp_userID.value = myresponse[0].USER_ID;
                                hidden_vp_name.value = myresponse[0].FIRST_NAME + " " + myresponse[0].LAST_NAME;

                            }
                        }
                    });

                     if(hidden_vp_flag.value === null){
                    		hidden_vp_flag.value = "Yes";
                     }

                    gifModal.style.display = "none";
                }

            }
        });
    } else {                  
            hidden_vp_userID.value = null;
            hidden_vp_name.value = null;
            hidden_vp_flag.value = null;

        gifModal.style.display = "none";
    }
}
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_HiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_HiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            getPdf();

function getPdf() {
    //console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, ' and'));
            jsonData.append('formPath', '/content/forms/af/mpp-justification-form/mpp-justification-form');
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
 * @function mpp_justification_form_mpp_justification_form.generated_saveguidedraft1620198028691_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_saveguidedraft1620198028691_click0 = function (scope) {
    with(this) {
        with(scope) {
            
//aftiaDescCWID.value = "deptID(s): "+deptIDs.replace(/,(\s+)?$/, '');


formSavedStatus.value = "1";

handleDraftSave(this);


        }
	}
}
/**
 * @function mpp_justification_form_mpp_justification_form.generated_submit1589890835750_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mpp_justification_form_mpp_justification_form.generated_submit1589890835750_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
function submitMethod(){
  	if(work_continuousRB.value === 0){
		expected_end_date.mandatory = true;
	}
    else{
		expected_end_date.mandatory = false;
	}

  	EmailSubject.value = "Test - Request for MPP Justification " +"(" + hidden_initiator_cwid.value + ")"; 
  	aftiaDescCWID.value = hidden_initiator_firstName.value + ", " + hidden_initiator_lastName.value + " " + hidden_initiator_cwid.value;
  var testEmail = "chaitanya.sai@thoughtfocus.com";
  hidden_mppSupervisor_email.value = testEmail;
  hidden_admin_email.value = testEmail;
  hidden_vp_email.value = testEmail;
  hidden_initiator_email.value = testEmail;
  	guideBridge.submit(); 
}



if(new_cms_positionCHK.value === null && repurposed_cms_positionCHK.value === null && reclassificationCHK.value === null && recruitmentCHK.value === null && appointmentCHK.value === null){
	showErrorModal("Alert !", "Please select at least one option for MPP Justification request");
	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MPPJustificationForm[0].MppPositionPanel[0]");
}
else if(cms_position.value === null){
	showErrorModal("Alert !", "Please enter position number");
	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MPPJustificationForm[0].PositionInformationPanel[0].cms_position[0]");
}
else if(division.value === null){
	showErrorModal("Alert !", "Please select division");
	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MPPJustificationForm[0].PositionInformationPanel[0].division[0]");
}
else if(work_continuousRB.value === null){
	showErrorModal("Alert !", "Please select if the work continuous?");
	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MPPJustificationForm[0].PositionInformationPanel[0].work_continuousRB[0]");
}
else if(responsibilities.value === null){
	showErrorModal("Alert !", "Please mention why Position and/or Action necessary?");
	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MPPJustificationForm[0].QuestionnairesPanel[0].responsibilities[0]");
}
else if(compliance_impact.value === null){
	showErrorModal("Alert !", "Please mention if the responsibilites have a safety or compliance impact?");
	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MPPJustificationForm[0].QuestionariesPanel[0].compliance_impact[0]");
}
else if(campus_system_impact.value === null){
	showErrorModal("Alert !", "Please mention if this position have campus-wide and/or system-wide impact? ");
	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MPPJustificationForm[0].QuestionariesPanel[0].campus_system_impact[0]");
}
else{
	submitMethod();
}
        }
	}
}
