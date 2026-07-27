/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if ((StageIndicator.value === null)){
	//var gifModal = document.getElementById('gifModal');
	//gifModal.style.display = "block";

	$.ajax({
		type: 'GET',
		url: "/bin/getLoggedUserId",
		dataType: 'json',
		success: function(myresponse) {
			if (myresponse.Status == "Success") {
				var userValue = myresponse.userId;
				workflow_initiator.value = userValue;
                  $.ajax({
					type: 'GET',
					url: "/bin/getEvaluationFormDataCHRSID",
					data: {
						action: "EMP_DETAILS"
					},
					dataType: 'json',
					success: function(myresopnse) {

						var modal = document.getElementById('myModal');
						var span = document.getElementsByClassName("close")[0];

						if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined) {                           
                            CWID.value = myresopnse[0].EMPLID;    
                            EmplId.value =  myresopnse[0].CSU_CHRS_ID;
                            unionCD.value = myresopnse[0].UNION_CD;
                            SupervisorName.value = myresopnse[0].SUPERVISORNAME;
                            SupervisorUsedId.value = myresopnse[0].MANAGER_EMP_USERID;
							DriverFirstName.value = myresopnse[0].FIRST_NAME;
							DriverLastName.value = myresopnse[0].LAST_NAME;    
                            InitiatorName.value = myresopnse[0].FIRST_NAME + " " + myresopnse[0].LAST_NAME;  
                            DeptId.value = myresopnse[0].DEPTID;
                            DeptName.value = myresopnse[0].DEPTNAME;
                            Division.value = myresopnse[0].DIVSION;                           
						//	Email.value = myresopnse[0].EMAILID;
                          Email.value = "csufaemform@gmail.com";
							DriverUserId.value = myresopnse[0].EMP_USERID;
                        } 
                      
                      else if (myresopnse.length > 1) {
                           gifModal.style.display = "none";
                            modal.style.display = "block";


                            var col = [];
                            col.push("EMPLID");
                            col.push("LAST_NAME");
                            col.push("FIRST_NAME");
                            col.push("DEPTID");

                            var table = document.createElement("table");
                            table.id = "tb";
                            var tr = table.insertRow(-1);
                            var headings = ["", "Emp ID", "Last Name", "First Name", "Dept ID"];
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
                           CWID.value = myresopnse[n].EMPLID;    
                            EmplId.value =  myresopnse[n].CSU_CHRS_ID;
                            unionCD.value = myresopnse[n].UNION_CD;
                            SupervisorName.value = myresopnse[n].SUPERVISORNAME;
                            SupervisorUsedId.value = myresopnse[n].MANAGER_EMP_USERID;
							DriverFirstName.value = myresopnse[n].FIRST_NAME;
							DriverLastName.value = myresopnse[n].LAST_NAME;    
                            InitiatorName.value = myresopnse[n].FIRST_NAME + " " + myresopnse[n].LAST_NAME;  
                            DeptId.value = myresopnse[n].DEPTID;
                            DeptName.value = myresopnse[n].DEPTNAME;
                            Division.value = myresopnse[n].DIVSION;                           
						//	Email.value = myresopnse[n].EMAILID;
							 Email.value = "csufaemform@gmail.com";
							DriverUserId.value = myresopnse[n].EMP_USERID;
               				gifModal.style.display = "none";
							modal.style.display = "none";
                                       rButtonStatus = true;
                                        break;
                                    }
                                }
                                if (rButtonStatus === false) {
                                    //alert("Please select the department");
                                    showErrorModal("Alert !", "Please select the department");
                                    modal.style.display = "block";
                                } else {

                                    modal.style.display = "none";
                                }
                            };
                            // footerModal = document.getElementById("modal_footer");
                            footerModal.appendChild(okButton);
                            // document.getElementById('cBtn').parentNode.removeChild(document.getElementById('cBtn'));

                        } else {
                            //alert("No matching records found");
                            var modalError = document.getElementById("errorPopup");
                            var para = document.getElementById("para");
                            para.innerHTML = "";
                            para.innerHTML = "No matching records found";
                            var errorBody = document.getElementById('errorData');
                            errorBody.innerHTML = "";
                            errorBody.appendChild(para);
                            var footerModalError = document.getElementById("errorPopup-footer");
                            var okButtonError = document.createElement("input");
                            okButtonError.type = "button";
                            okButtonError.setAttribute("class", "okBtn");
                            //okButtonError.id = "okBtn";
                            okButtonError.value = "Ok";
                            okButtonError.onclick = function(event) {
                                modalError.style.display = "none";
                            };
                            footerModalError.appendChild(okButtonError);
                            modalError.style.display = "block";


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
                                //alert("Please select the department");
                                showErrorModal("Alert !", "Please select the department");
                                modal.style.display = "block";
                            } else {

                                //alert("Please select the department");
                                showErrorModal("Alert !", "Please select the department");
                                modal.style.display = "block";
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
        },
        error: function(error) {
            alert("error block=" + error);
            loadingText.visible = false;
        }
    });
}
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    PersonalInformation.visible = true;
    PersonalInformation.enabled = true;
  
    CampusInformation.visible = true;
    CampusInformation.enabled = true;
  
    DriverCertification.visible = true;
    DriverCertification.enabled = true;
    
    panel_DriverCertification.visible = true;
    panel_supervisor.visible = false; 
    panelAuthorization.visible = false; 
}

if (StageIndicator.value === "ToInitiator") {
    PersonalInformation.visible = true;
    PersonalInformation.enabled = true;
  
    CampusInformation.visible = true;
    CampusInformation.enabled = true;
  
    DriverCertification.visible = true;
    DriverCertification.enabled = true;
    
    panel_DriverCertification.visible = true;
  
    if (supervisor_signChk.value == "1") {
        panel_supervisor.visible = true;
        panel_supervisor.enabled = false; 
    } else {
        panel_supervisor.visible = false;
    } 

    if (checkbox_authorize.value == "1") {
        panelAuthorization.visible = true;
        panelAuthorization.enabled = false; 
    } else {
        panelAuthorization.visible = false;
    }   
}

if (StageIndicator.value === "ToSupervisor") {
    PersonalInformation.visible = true;
    PersonalInformation.enabled = false;
  
    CampusInformation.visible = true;
    CampusInformation.enabled = false;
  
    DriverCertification.visible = true;
    DriverCertification.enabled = false;
    
    panel_supervisor.visible = true; 

    if (driver_signChk.value == "1") {
        panel_DriverCertification.visible = true;
        panel_DriverCertification.enabled = false; 
    } else {
        panel_DriverCertification.visible = false;
    }   

    if (checkbox_authorize.value == "1") {
        panelAuthorization.visible = true;
        panelAuthorization.enabled = false; 
    } else {
        panelAuthorization.visible = false;
    }   
}

if (StageIndicator.value === "ToRisk") {
    PersonalInformation.visible = true;
    PersonalInformation.enabled = false;
  supervisor_signChk.enabled = false;
  
    CampusInformation.visible = true;
    CampusInformation.enabled = false;
  
    DriverCertification.visible = true;
    DriverCertification.enabled = false;

    PersonalVehicleCB.enabled = true;
    UniversityVehicleCB.enabled = true;
    CartCB.enabled = true;
    VanCB.enabled = true;
    AerialCB.enabled = true;
    BoomTruckCB.enabled = true;
    ExcavatorsCB.enabled = true;
    ForkCB.enabled = true;
    SkidCB.enabled = true;
    ScissorCB.enabled = true;
    LoadCB.enabled = true;
    TractorCB.enabled = true;
    ElectricCB.enabled = true;
    BackhoesCB.enabled = true;

    panelAuthorization.visible = true;

    if (driver_signChk.value == "1") {
        panel_DriverCertification.visible = true;
        panel_DriverCertification.enabled = false; 
    } else {
        panel_DriverCertification.visible = false;
    }   

    if (supervisor_signChk.value == "1") {
        panel_supervisor.visible = true;
        panel_supervisor.enabled = true;  // ✅ Fixed: was false, now true
    } else {
        panel_supervisor.visible = false;
    } 
}
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
  $.ajax({
    type: 'GET',
    url: "/bin/getLoggedUserId",
    dataType: 'json',
    success: function(myresponse) {
      var userValue = myresponse.userId;
      workflow_initiator.value = userValue;

      var cwidValue = CWID.value;
      if (cwidValue !== null) {
        $.ajax({          
          type: 'GET',
          url: "/bin/getFinancialARFData",
          data: {
            cwid: cwidValue,
            action: "FS_EMP_DATA"
          },
          dataType: 'json',
          success: function(myresponse) {
            var empPosition = myresponse[0].POSITION;
            if (empPosition.toLowerCase() === "faculty") {
              Radio_CheckOne.value = "1";
            } else if (empPosition.toLowerCase() === "staff") {
              Radio_CheckOne.value = "2";
            } else if (empPosition.toLowerCase() === "student employee") {
              Radio_CheckOne.value = "3";
            } else if (empPosition.toLowerCase() === "volunteer") {
              Radio_CheckOne.value = "4";
            }
          },
          error: function(err) {
           // console.error("Error fetching financial data", err);
          }
        });
      }
    },
    error: function(error) {
      //console.error("Error fetching logged in user ID", error);
    }
  });
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_CaseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_CaseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_CaseId_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_CaseId_init1 = function (scope) {
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
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_DriverLastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_DriverLastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_DriverFirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_DriverFirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_DriverMiddleName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_DriverMiddleName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_CalLicenseNo_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_CalLicenseNo_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
 
  var cwidValue = CWID.value;

  if (cwidValue !== null) {
  
    $.ajax({
      type: 'GET',
      url: "/bin/getFinancialARFData",
      data: {
        cwid: cwidValue,
        action: "FS_EMP_DATA"
      },
      dataType: 'json',
      success: function(myresponse) {
      
        if (myresponse && myresponse.length > 0 && myresponse[0].POSITION) {
          var empPosition = myresponse[0].POSITION;
          switch (empPosition.toLowerCase()) {
            case "faculty":
              Radio_CheckOne.value = "1";
              break;
            case "staff":
              Radio_CheckOne.value = "2";
              break;
            case "student employee":
              Radio_CheckOne.value = "3";
              break;
            case "volunteer":
              Radio_CheckOne.value = "4";
              break;
          }
        } else {
          //console.warn("No employee position found in response.");
        }
      },
      error: function(err) {
      //  console.error("Error fetching financial data", err);
      }
    });
  }
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_Radio_CheckOne_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_Radio_CheckOne_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_EmplId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_EmplId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_DeptName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_DeptName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_Email_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_Email_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_SupervisorName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_SupervisorName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_SupervisorEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_SupervisorEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_driver_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_driver_signChk_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				DriverName.value = userValue;
				DriverSignature.value = userValue;
				DriverSignDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
	} else {
		DriverName.value = "";
		DriverSignature.value = "";
		DriverSignDate.value = "";
	}
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_DriverName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_DriverName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_DriverSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_DriverSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_DriverSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_DriverSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_supervisor_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_supervisor_signChk_valueCommit0 = function (scope) {
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
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_supervisor_signChk_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_supervisor_signChk_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            /*if (StageIndicator.value === "ToSupervisor") {

  if (PersonalVehicleCB.value === null && UniversityVehicleCB.value === null && CartCB.value === null && ForkCB.value === null && ScissorCB.value === null && VanCB.value === null && AerialCB.value === null && BoomTruckCB.value === null && ExcavatorsCB.value === null && SkidCB.value === null && LoadCB.value === null && TractorCB.value === null && ElectricCB.value === null && BackhoesCB.value === null) {
    showErrorModal("Alert!", "Please select any additional specialized driving training that is required.");
} 
}*/


if (PersonalVehicleCB.value === null && UniversityVehicleCB.value === null && CartCB.value === null && VanCB.value === null && AerialCB.value === null && BoomTruckCB.value === null && ExcavatorsCB.value === null && ForkCB.value === null && SkidCB.value === null && ScissorCB.value === null && LoadCB.value === null && TractorCB.value === null && ElectricCB.value === null && BackhoesCB.value === null) {
   showErrorModal("Alert !", "Please select the vehicle(s) the driver will operate.");
    this.value = null;
   SupervisorFullName.value = "";
    SupervisorSignature.value = "";
    SupervisorSignDate.value = "";
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_SupervisorFullName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_SupervisorFullName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_SupervisorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_SupervisorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_SupervisorSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_SupervisorSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_PersonalVehicleCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_PersonalVehicleCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_UniversityVehicleCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_UniversityVehicleCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_CartCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_CartCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_VanCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_VanCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_AerialCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_AerialCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_BoomTruckCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_BoomTruckCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_ExcavatorsCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_ExcavatorsCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_ForkCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_ForkCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_SkidCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_SkidCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_ScissorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_ScissorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_LoadCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_LoadCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_TractorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_TractorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_ElectricCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_ElectricCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
   NoneCB.value = null;
}

        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_BackhoesCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_BackhoesCB_valueCommit0 = function (scope) {
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
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_checkbox_authorize_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_checkbox_authorize_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				RiskName.value = userValue;
			//	RiskJobTitle.value = userValue;
				RiskSignDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
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
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_checkbox_authorize_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_checkbox_authorize_valueCommit1 = function (scope) {
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
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RiskName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RiskName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RiskJobTitle_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RiskJobTitle_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_AppointingAuthority_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_AppointingAuthority_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RiskSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RiskSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RiskDecision_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RiskDecision_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(RiskDecision.value === "2"){
 riskComment.mandatory = true;
}
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RiskDecision_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_RiskDecision_valueCommit1 = function (scope) {
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
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_Division_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_Division_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
 // if( StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToApproval" || StageIndicator.value === "ToRisk"){

var cwid1 = EmplId.value;
var dept1 = DeptId.value;
var union = unionCD.value;
$.ajax({
    type: 'GET',
    url: "/bin/getEvaluationFormDataCHRSID",
    data: {
        action: "SPE_MANAGER_DETAILS",
        cwid: cwid1,
        deptID: dept1,
        union_cd: union
    },
    dataType: 'json',
    success: function(myresopnse) {
 
         if (myresopnse.length >= 1) {
           	for (var i = 0; i < myresopnse.length; i++) {
		// SupervisorEmail.value = myresopnse[i].MANAGER_EMAIL_ID;
              SupervisorEmail.value = "csufaemform@gmail.com";
         } 
         }

    },
    error: function(error) {
        alert("error block=" + error);
    }
});
//}


        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_Division_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_Division_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            var selected = [];

// List of all checkboxes with their logical names
var checkboxes = [
    {field: AerialCB, name: "Aerial Lifts"},
    {field: BucketCB, name: "Bucket Truck (Utility)"},
    {field: CartCB, name: "Cart Safety"},
    {field: ForkCB, name: "Forklifts"},
    {field: PersonalVehicleCB, name: "Personal Vehicle"},
    {field: ScissorCB, name: "Scissor Lifts"},
    {field: VanCB, name: "Van Safety"},
    {field: NoneCB, name: "None"}
];

// Loop through all
for (var i = 0; i < checkboxes.length; i++) {
    var cb = checkboxes[i];
    if (cb.field.value == "1") {   // checkbox is selected
        selected.push(cb.name);    // push the logical name instead of value
    }
}

var result = selected.join(",");
console.log("Final Result: " + result);

// Store in target field
TrainingDecisionCB.value = result;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_SupervisorPhNo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_SupervisorPhNo_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/authorization-to-drive-a-vehicle-on-university-business/authorization-to-drive-a-vehicle-on-university-business');
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
 * @function authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_submit1608529416101_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_to_drive_a_vehicle_on_university_business_authorization_to_drive_a_vehicle_on_university_business.generated_submit1608529416101_click0 = function (scope) {
    with(this) {
        with(scope) {
            
aftiaDescCWID.value = InitiatorName.value + " " + CWID.value;
EmailSubject.value = "Test - Authorization To Drive a Vehicle on University Business - " +  DriverFirstName.value + " " + DriverLastName.value + " " + CWID.value;

guideBridge.submit();
        }
	}
}
