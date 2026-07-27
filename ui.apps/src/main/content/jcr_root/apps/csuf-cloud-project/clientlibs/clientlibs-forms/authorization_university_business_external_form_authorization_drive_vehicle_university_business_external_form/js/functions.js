/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    PersonalInformation.visible = true;
    PersonalInformation.enabled = true;
  
    CampusInformation.visible = true;
    CampusInformation.enabled = true;
  
  	DriverCertificate.visible = true;
  	DriverCertificate.enabled = true;
    
    panel_DriverCertification.visible = true;
    SupervisorPanel.visible = false; 
    AuthorizationPanel.visible = false; 
  
}


if (StageIndicator.value === "ToInitiator"){

      PersonalInformation.visible = true;
    PersonalInformation.enabled = true;
  
    CampusInformation.visible = true;
    CampusInformation.enabled = true;
  
  	DriverCertificate.visible = true;
  	DriverCertificate.enabled = true;
    
    panel_DriverCertification.visible = true;
  
   if (supervisor_signChk.value == "1") {
     SupervisorPanel.visible = true;
     SupervisorPanel.enabled = false; 
    } else {
     SupervisorPanel.visible = false;
    } 
  if (checkbox_authorize.value == "1") {
     AuthorizationPanel.visible = true;
     AuthorizationPanel.enabled = false; 
    } else {
     AuthorizationPanel.visible = false;
    }   
}


if(StageIndicator.value === "ToSupervisor") {

    PersonalInformation.visible = true;
    PersonalInformation.enabled = false;
  
    CampusInformation.visible = true;
    CampusInformation.enabled = false;
  
  	DriverCertificate.visible = true;
  	DriverCertificate.enabled = false;

    SupervisorPanel.visible = true; 

   if (driver_signChk.value == "1") {
     panel_DriverCertification.visible = true;
     panel_DriverCertification.enabled = false; 
    } else {
     panel_DriverCertification.visible = false;
    }   
    if (checkbox_authorize.value == "1") {
     AuthorizationPanel.visible = true;
     AuthorizationPanel.enabled = false; 
    } else {
     AuthorizationPanel.visible = false;
    }   

}


if(StageIndicator.value === "ToRisk") {

  supervisor_signChk.enabled = false;
  SupervisorComment.enabled =false;
    PersonalInformation.visible = true;
    PersonalInformation.enabled = false;
  
    CampusInformation.visible = true;
    CampusInformation.enabled = false;
  
  	DriverCertificate.visible = true;
  	DriverCertificate.enabled = false;
  
  PersonalVehicleCB.enabled = true;
  UniversityVehicleCB.enabled = true;
  CartCB.enabled = true;
  VanCB.enabled = true;
  AerialCB.enabled = true;
  BoomTruckCB.enabled = true;
  ExcavatorsCB.enabled = true;
  SkidCB.enabled = true;
  ForkCB.enabled = true;
  ScissorCB.enabled = true;
  LoadCB.enabled = true;
  TractorCB.enabled = true;
  ElectricCB.enabled = true;
  BackhoesCB.enabled = true;
  
  
    
    panel_DriverCertification.visible = true;
    panel_DriverCertification.enabled = false;
   
    AuthorizationPanel.visible = true; 
  if (driver_signChk.value == "1") {
     panel_DriverCertification.visible = true;
     panel_DriverCertification.enabled = false; 
    } else {
     panel_DriverCertification.visible = false;
    }   
  if (supervisor_signChk.value == "1") {
     SupervisorPanel.visible = true;
    // panel_supervisor.enabled = false; 
    } else {
     SupervisorPanel.visible = false;
    } 
   

}


        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_CaseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_CaseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_CaseId_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_CaseId_init1 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getCaseID",
        dataType: 'json',
        success: function(myresponse) {
            CaseId.value = myresponse.CASEID;
        },
    });
}
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_DriverFirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_DriverFirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_DriverLastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_DriverLastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_DriverMiddleName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_DriverMiddleName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_Radio_CheckOne_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_Radio_CheckOne_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_EmplId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_EmplId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_DeptName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_DeptName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_Email_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_Email_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorsLastName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorsLastName_valueCommit0 = function (scope) {
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
                        SupervisorEmail.value = "csufaemform@gmail.com";
                       	// SupervisorEmail.value = "lpogge@fullerton.edu";
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
                    HiddenPanel.SupervisorName.value = "";
                    HiddenPanel.SupervisorUsedId.value = "";
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
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorsNameDD_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorsNameDD_valueCommit0 = function (scope) {
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
        HiddenPanel.SupervisorName.value = approverUserName;
      SupervisorName.value = approverUserName;
     approverEmailId = approverName.substr(approverName.indexOf(' - ')+2, approverName.length-1);
     approverUserId =  approverEmailId.substr(1, approverEmailId.indexOf('@')-1);
     HiddenPanel.SupervisorUsedId.value = approverUserId;     
   SupervisorEmail.value = "csufaemform@gmail.com";
     //SupervisorSearchEmailId.value = approverEmailId;
  // SupervisorSearchEmailId.value = "lpogge@fullerton.edu";
   SupervisorSearchEmailId.value = "csufaemform@gmail.com";
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
                        DeptId.value = response[i].DEPTTITLE;
                    } 
        }else{
          DeptId.value = "";
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
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_driver_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_driver_signChk_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
	if (this.value == 1) {
				var userValue ;
				DriverName.value = DriverFirstName.value + " " + DriverLastName.value;
				DriverSignature.value =  DriverFirstName.value + " " + DriverLastName.value;
				DriverSignDate.value =  getDateforAdaptiveForm();            
			}
			else{
              this.value = "";
              DriverName.value = "";
		DriverSignature.value = "";
		DriverSignDate.value = "";
}
}
		


        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_DriverName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_DriverName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_DriverSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_DriverSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_DriverSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_DriverSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_supervisor_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_supervisor_signChk_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				SupervisorFullName.value = userValue;
				SupervisorSignature.value = userValue;
				SupervisorSignDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
	} else {
		SupervisorFullName.value = "";
		SupervisorSignature.value = "";
		SupervisorSignDate.value = "";
	}
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_supervisor_signChk_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_supervisor_signChk_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            
 // alert(StageIndicator.value);
if (StageIndicator.value === "ToSupervisor") {

  if (PersonalVehicleCB.value === null && UniversityVehicleCB.value === null && CartCB.value === null && ForkCB.value === null && ScissorCB.value === null && VanCB.value === null && AerialCB.value === null && BoomTruckCB.value === null && ExcavatorsCB.value === null && SkidCB.value === null && LoadCB.value === null && TractorCB.value === null && ElectricCB.value === null && BackhoesCB.value === null) {
  //  alert('2');
    showErrorModal("Alert!", "Please select any additional specialized driving training that is required.");
    //guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].panel_supervisor[0].AerialCB[0]");
} 
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_supervisor_signChk_valueCommit2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_supervisor_signChk_valueCommit2 = function (scope) {
    with(this) {
        with(scope) {
            var selected = [];

// List of all checkboxes with logical names
var checkboxes = [
    {field: PersonalVehicleCB, name: "Auto / SUV / Truck"},
    {field: UniversityVehicleCB, name: "Auto / SUV / Truck"},
    {field: CartCB, name: "Power Cart"},
    {field: VanCB, name: "12 or 15-Passenger Van"},
    {field: AerialCB, name: "Aerial Lifts"},
    {field: BoomTruckCB, name: "Boom Truck"},
    {field: ExcavatorsCB, name: "Excavators"},
    {field: ForkCB, name: "Forklifts"},
    {field: SkidCB, name: "Skid Steers"},
    {field: ScissorCB, name: "Scissor Lifts"},
    {field: LoadCB, name: "Loaders"},
    {field: TractorCB, name: "Tractors"},
    {field: ElectricCB, name: "Electric Pallet Jack"},
    {field: BackhoesCB, name: "Backhoes"}
];

// Loop through checkboxes
for (var i = 0; i < checkboxes.length; i++) {
    var cb = checkboxes[i];

    if (cb.field.value === "1") {
        selected.push(cb.name);
    }
}

// Convert to comma separated string
var result = selected.join(",");

// Store result
TrainingDecisionCB.value = result;

console.log("Final Result: " + result);
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorFullName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorFullName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_PersonalVehicleCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_PersonalVehicleCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_UniversityVehicleCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_UniversityVehicleCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_CartCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_CartCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_VanCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_VanCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_AerialCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_AerialCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_BoomTruckCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_BoomTruckCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_ExcavatorsCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_ExcavatorsCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_ForkCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_ForkCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SkidCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SkidCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_ScissorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_ScissorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_LoadCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_LoadCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_TractorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_TractorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_ElectricCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_ElectricCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_BackhoesCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_BackhoesCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   AerialCB.value = null;
  BucketCB.value = null;
  VanCB.value = null; 
  PersonalVehicleCB.value = null;
  ScissorCB.value = null; 
  CartCB.value = null; 
  ForkCB.value = null;
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_checkbox_authorize_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_checkbox_authorize_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (this.value == 1) {
 
  $.ajax({
    type: 'GET',
    url: "/bin/getLoggedInUserDetails",
    dataType: 'json',
    success: function(myresponse) {
      if (myresponse.Status === "Success") {
        var userId = myresponse.userId;
        workflow_initiator.value = userId;

        // Second AJAX call to get job title/description
        $.ajax({
          type: 'GET',
          url: "/bin/getEvaluationFormDataCHRSID",
          data: {
            action: "EMP_DETAILS"
          },
          dataType: 'json',
          success: function(myresopnse) {

            // Typo fixed in 'myresopnse' to 'myresponse'
            if (myresopnse && myresopnse.length > 0) {
              RiskJobTitle.value = myresopnse[0].DESCR;
            } else {
             // console.warn("Empty response from EMP_DETAILS call.");
            }
          },
          error: function(err) {
            //console.error("EMP_DETAILS fetch failed", err);
          }
        });

        // Set user name
        var userName = myresponse.userName;
        RiskName.value = userName;
        RiskSignDate.value = myresponse.SERVER_DATE;
      } else {
        //alert("Failed to fetch user details: " + myresponse.Status);
      }
    },
    error: function(error) {
      //alert("Error fetching user details: " + JSON.stringify(error));
    }
  });
} else {
  RiskName.value = "";
  RiskJobTitle.value = "";
  RiskSignDate.value = "";
}

        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_RiskName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_RiskName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_RiskJobTitle_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_RiskJobTitle_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_AppointingAuthority_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_AppointingAuthority_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_RiskSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_RiskSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_RiskDecision_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_RiskDecision_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(RiskDecision.value === "2"){
 riskComment.mandatory = true;
}
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_RiskDecision_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_RiskDecision_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            var selected = [];

// List of all checkboxes with logical names
var checkboxes = [
    {field: PersonalVehicleCB, name: "Auto / SUV / Truck"},
    {field: UniversityVehicleCB, name: "Auto / SUV / Truck"},
    {field: CartCB, name: "Power Cart"},
    {field: VanCB, name: "12 or 15-Passenger Van"},
    {field: AerialCB, name: "Aerial Lifts"},
    {field: BoomTruckCB, name: "Boom Truck"},
    {field: ExcavatorsCB, name: "Excavators"},
    {field: ForkCB, name: "Forklifts"},
    {field: SkidCB, name: "Skid Steers"},
    {field: ScissorCB, name: "Scissor Lifts"},
    {field: LoadCB, name: "Loaders"},
    {field: TractorCB, name: "Tractors"},
    {field: ElectricCB, name: "Electric Pallet Jack"},
    {field: BackhoesCB, name: "Backhoes"}
];

// Loop through checkboxes
for (var i = 0; i < checkboxes.length; i++) {
    var cb = checkboxes[i];

    if (cb.field.value === "1") {
        selected.push(cb.name);
    }
}

// Convert to comma separated string
var result = selected.join(",");

// Store result
TrainingDecisionCB.value = result;

console.log("Final Result: " + result);
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_Division_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_Division_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var selected = [];

// List of all checkboxes with logical names
var checkboxes = [
    {field: PersonalVehicleCB, name: "Auto / SUV / Truck"},
    {field: UniversityVehicleCB, name: "Auto / SUV / Truck"},
    {field: CartCB, name: "Power Cart"},
    {field: VanCB, name: "12 or 15-Passenger Van"},
    {field: AerialCB, name: "Aerial Lifts"},
    {field: BoomTruckCB, name: "Boom Truck"},
    {field: ExcavatorsCB, name: "Excavators"},
    {field: ForkCB, name: "Forklifts"},
    {field: SkidCB, name: "Skid Steers"},
    {field: ScissorCB, name: "Scissor Lifts"},
    {field: LoadCB, name: "Loaders"},
    {field: TractorCB, name: "Tractors"},
    {field: ElectricCB, name: "Electric Pallet Jack"},
    {field: BackhoesCB, name: "Backhoes"}
];

// Loop through checkboxes
for (var i = 0; i < checkboxes.length; i++) {
    var cb = checkboxes[i];

    if (cb.field.value === "1") {
        selected.push(cb.name);
    }
}

// Convert to comma separated string
var result = selected.join(",");

// Store result
TrainingDecisionCB.value = result;

console.log("Final Result: " + result);
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorPhNo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorPhNo_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_SupervisorEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            
    getPdf();
function getPdf() {
    console.log("in view pdf");
   debugger;
    window.guideBridge.getDataXML({
        success: function(result) {
           console.log("in view pdf="+result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/authorization-university-business-external-form/authorization-drive-vehicle-university-business-external-form');
            jsonData.append('fileName', 'Authorization to Drive a Vehicle on University Business');          
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
 * @function authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_submit1608529416101_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_university_business_external_form_authorization_drive_vehicle_university_business_external_form.generated_submit1608529416101_click0 = function (scope) {
    with(this) {
        with(scope) {
            InitiatorName.value = DriverFirstName.value + " " + DriverLastName.value;
aftiaDescCWID.value = InitiatorName.value;
EmailSubject.value = "Test - Authorization To Drive a Vehicle on University Business -" + " " +  DriverFirstName.value + " " + DriverLastName.value;

guideBridge.submit();
        }
	}
}
