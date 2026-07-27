/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_guideRootPanel_init0 = function (scope) {
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
                            cwid_initiator.value = myresopnse[0].EMPLID;                            
                            CWID.value = myresopnse[0].EMPLID;    
                            chrsID.value =  myresopnse[0].CSU_CHRS_ID;
                            unionCD.value = myresopnse[0].UNION_CD;
                            SupervisorName.value = myresopnse[0].SUPERVISORNAME;
                            supervisorUserid.value = myresopnse[0].MANAGER_EMP_USERID;
							InitiatorFirstName.value = myresopnse[0].FIRST_NAME;
							InitiatorLastName.value = myresopnse[0].LAST_NAME;                           
                            DeptID.value = myresopnse[0].DEPTID;
                           // Department.value = myresopnse[0].DEPTNAME;
                            Division.value = myresopnse[0].DIVSION;                           
						//	InitiatorEmail.value = myresopnse[0].EMAILID;
                          InitiatorEmail.value = "csufaemform@gmail.com";
							InitiatorUserID.value = myresopnse[0].EMP_USERID;
							InitiatorName.value = myresopnse[0].FIRST_NAME + " " + myresopnse[0].LAST_NAME;
                            SSOlogin.value = myresopnse[0].FIRST_NAME + " " + myresopnse[0].LAST_NAME;

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
                             cwid_initiator.value = myresopnse[n].EMPLID;                            
                            CWID.value = myresopnse[n].EMPLID;    
                            chrsID.value =  myresopnse[n].CSU_CHRS_ID;
                            unionCD.value = myresopnse[n].UNION_CD;
                            SupervisorName.value = myresopnse[n].SUPERVISORNAME;
                            supervisorUserid.value = myresopnse[n].MANAGER_EMP_USERID;
							InitiatorFirstName.value = myresopnse[n].FIRST_NAME;
							InitiatorLastName.value = myresopnse[n].LAST_NAME;                           
                            DeptID.value = myresopnse[n].DEPTID;
                           // Department.value = myresopnse[n].DEPTNAME;
                            Division.value = myresopnse[n].DIVSION;                           
						//	InitiatorEmail.value = myresopnse[n].EMAILID;
                          InitiatorEmail.value = "csufaemform@gmail.com";
							InitiatorUserID.value = myresopnse[n].EMP_USERID;
							InitiatorName.value = myresopnse[n].FIRST_NAME + " " + myresopnse[n].LAST_NAME;
                            SSOlogin.value = myresopnse[n].FIRST_NAME + " " + myresopnse[n].LAST_NAME;

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
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            

if (StageIndicator.value === null) {
    DriverPanel.visible = true;
    DriverPanel.enabled = true; 
	EmployeeSignaturePanel.visible = true;
	EmployeeSignaturePanel.enabled = true;   
    AuthorizedPanel.visible = false;
    UPDSignaturePanelOne.visible = false;
    UPDSignaturePanelTwo.visible = false;
    RiskSignaturePanel.visible = false; 
}


if (StageIndicator.value === "ToInitiator"){
    DriverPanel.visible = true;
    DriverPanel.enabled = true;
    AuthorizedPanel.visible = true;
    AuthorizedPanel.enabled = false;
	EmployeeSignaturePanel.visible = true;
	EmployeeSignaturePanel.enabled = true; 
 if (UPDSignatureCBOne.value == "1") {
     UPDSignaturePanelOne.visible = true;
     UPDSignaturePanelOne.enabled = false; 
    } else {
     UPDSignaturePanelOne.visible = false;
    } 
  if (UPDSignatureCBTwo.value == "1") {
     UPDSignaturePanelTwo.visible = true;
     UPDSignaturePanelTwo.enabled = false; 
    } else {
     UPDSignaturePanelOne.visible = false;
    }    
  if (RiskSignatureCB.value == "1") {
     RiskSignaturePanel.visible = true;
     RiskSignaturePanel.enabled = false; 
    } else {
     RiskSignaturePanel.visible = false;
    } 
}


/*if(StageIndicator.value === "ToUPDOne") {
    DriverPanel.visible = true;
    DriverPanel.enabled = false;
    AuthorizedPanel.visible = true;
    AuthorizedPanel.enabled = true;
    UPDSignaturePanelOne.visible = true;
    UPDSignaturePanelOne.enabled = true;
    UPDSignaturePanelTwo.visible = false; 
  if (EmployeeSignatureCB.value == "1") {
     EmployeeSignaturePanel.visible = true;
     EmployeeSignaturePanel.enabled = false; 
    } else {
     EmployeeSignaturePanel.visible = false;
    } 
  if (UPDSignatureCBTwo.value == "1") {
     UPDSignaturePanelTwo.visible = true;
     UPDSignaturePanelTwo.enabled = false; 
    } else {
     UPDSignaturePanelTwo.visible = false;
    }   
  if (RiskSignatureCB.value == "1") {
     RiskSignaturePanel.visible = true;
     RiskSignaturePanel.enabled = false; 
    } else {
     RiskSignaturePanel.visible = false;
    } 
}*/


/*if(StageIndicator.value === "ToUPDTwo") {

    DriverPanel.visible = true;
    DriverPanel.enabled = false;
    AuthorizedPanel.visible = true;
    AuthorizedPanel.enabled = false;
    UPDSignaturePanelTwo.visible = true;
    UPDSignaturePanelTwo.enabled = true;
  
  if (EmployeeSignatureCB.value == "1") {
     EmployeeSignaturePanel.visible = true;
     EmployeeSignaturePanel.enabled = false; 
    } else {
     EmployeeSignaturePanel.visible = false;
    } 
  if (UPDSignatureCBOne.value == "1") {
     UPDSignaturePanelOne.visible = true;
     UPDSignaturePanelOne.enabled = false; 
    } else {
     UPDSignaturePanelOne.visible = false;
    } 
  if (RiskSignatureCB.value == "1") {
     RiskSignaturePanel.visible = true;
     RiskSignaturePanel.enabled = false; 
    } else {
     RiskSignaturePanel.visible = false;
    } 
}*/

if(StageIndicator.value === "ToRisk") {

    DriverPanel.visible = true;
    DriverPanel.enabled = false;
    AuthorizedPanel.visible = false;
   // AuthorizedPanel.enabled = false;
  
   RiskSignaturePanel.visible = true;
   RiskSignaturePanel.enabled = true;
  
  if (EmployeeSignatureCB.value == "1") {
     EmployeeSignaturePanel.visible = true;
     EmployeeSignaturePanel.enabled = false; 
    } else {
     EmployeeSignaturePanel.visible = false;
    } 
  
   if (UPDSignatureCBOne.value == "1") {
     UPDSignaturePanelOne.visible = true;
     UPDSignaturePanelOne.enabled = false; 
    } else {
     UPDSignaturePanelOne.visible = false;
    } 
 
  
 if (UPDSignatureCBTwo.value == "1") {
     UPDSignaturePanelTwo.visible = true;
     UPDSignaturePanelTwo.enabled = false; 
    } else {
     UPDSignaturePanelTwo.visible = false;
    } 
  
}
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === "ToUPDOne") {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				UPDLogin.value = userValue;
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
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_CaseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_CaseId_init0 = function (scope) {
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
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_SSOlogin_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_SSOlogin_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_DriverNumber_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_DriverNumber_init0 = function (scope) {
    with(this) {
        with(scope) {
            if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  this.enabled=true;
} else {
  this.enabled=false;
}
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_textbox_948901591747053670088_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_textbox_948901591747053670088_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_InitiatorFirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_InitiatorFirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_InitiatorLastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_InitiatorLastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_DriverState_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_DriverState_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_County_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_County_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator"){
County.enabled = true;
  County.visible = true;
}
else{
County.enabled = false;
    County.visible = true;
}
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_County_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_County_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
debugger;
	if(StageIndicator.value === null || StageIndicator.value === "ToInitiator"){
    var appResult = [];
		if((this.value !== "Please select the city") && (this.value !== null)){
           $.ajax({

                type: 'GET', 

                url:"/bin/authorizationServlet",

               data:  {           
                 action: "CITY_DETAILS",
                 county:this.value
                  },

                dataType: 'json',

                success: function(myresponse){

                      //  gifModal.style.display = "none";
debugger;
                  if(myresponse.length >= 1){
                    for (var i = 0; i < myresponse.length; i++) {
                        var item = myresponse[i].CITY;                   
                        appResult.push(item);
                    }
                    City.value = "";
                    City.items = appResult;
				} else {
                    showErrorModal("Alert!", "No cities found");
                    City.items = [];
                    City.value = "";
                }
           }
              });
		}else{
           City.items = [];
           City.value = "";
			//gifModal.style.display = "none";
}
    }
//gifModal.style.display = "none"; 


        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_County_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_County_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            

if (StageIndicator.value === null) {
    if (this.value && this.value !== "Please select the county") {
        $.ajax({
            type: 'GET',
            url: "/bin/authorizationServlet",
            data: {
                action: "CITY_DETAILS",
                county: this.value // county selected
            },
            dataType: 'json',
            success: function (myresponse) {
                
                if (myresponse.length >= 1) {
                    var appResult = [];
                    for (var i = 0; i < myresponse.length; i++) {
                        var item = myresponse[i].CITY;
                        appResult.push(item);
                    }

                    // Update city dropdown with new list
                    City.items = appResult;

                    // Reset selection every time county changes
                    City.value = "";
                } else {
                    showErrorModal("Alert!", "No cities found");
                    City.items = [];
                    City.value = "";
                }
            },
            error: function () {
                showErrorModal("Error", "Failed to fetch city details.");
                City.items = [];
                City.value = "";
            }
        });
    } else {
        // If no county selected, clear city dropdown
        City.items = [];
        City.value = "";
    }
}

        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_City_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_City_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator"){
  City.enabled = true;
  City.visible = true;
}
else{
  City.enabled = false;
  City.visible = true;
}
}
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDLogin_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDLogin_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_textbox_6853701141747054222801_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_textbox_6853701141747054222801_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_ApproverCounty_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_ApproverCounty_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToUPDOne"){
  ApproverCity.enabled = true;
  ApproverCity.visible = true;
  
}
else{
   ApproverCity.enabled = false;
  ApproverCity.visible = true;
}
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_ApproverCounty_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_ApproverCounty_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
debugger;
	if(StageIndicator.value === "ToUPDOne"){
    var appResult = [];
		if((this.value !== "Please select the city") && (this.value !== null)){
           $.ajax({

                type: 'GET', 

                url:"/bin/authorizationServlet",

               data:  {           
                 action: "CITY_DETAILS",
                 county:this.value
                  },

                dataType: 'json',

                success: function(myresponse){

                      //  gifModal.style.display = "none";
debugger;
                  if(myresponse.length >= 1){
                    for (var i = 0; i < myresponse.length; i++) {
                        var item = myresponse[i].CITY;                   
                        appResult.push(item);
                    }
                    ApproverCity.value = "";
                    ApproverCity.items = appResult;
				} else {
                    showErrorModal("Alert!", "No cities found");
                    ApproverCity.items = [];
                    ApproverCity.value = "";
                }
           }
              });
		}else{
           ApproverCity.items = [];
           ApproverCity.value = "";
			//gifModal.style.display = "none";
}
    }
//gifModal.style.display = "none"; 


        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_ApproverCounty_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_ApproverCounty_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToUPDOne") {
    if (this.value !=="" && this.value !== "Please select the county") {
        $.ajax({
            type: 'GET',
            url: "/bin/authorizationServlet",
            data: {
                action: "CITY_DETAILS",
                county: this.value // selected county
            },
            dataType: 'json',
            success: function (myresponse) {
                if (myresponse && myresponse.length > 0) {
                    var appResult = [];
                 // ApproverCity.value = ""; // reset selection
                    for (var i = 0; i < myresponse.length; i++) {
                        var item = myresponse[i].CITY;
                        appResult.push(item);
                    }

                    // Always refresh city dropdown when county changes
                    ApproverCity.items = appResult;
                  // ApproverCity.value = ""; // reset selection
                } else {
                    showErrorModal("Alert!", "No cities found");
                    ApproverCity.items = [];
                    ApproverCity.value = "";
                }
            },
            error: function () {
                showErrorModal("Error", "Failed to fetch city details.");
                ApproverCity.items = [];
                ApproverCity.value = "";
            }
        });
    } 
  else {
        // If no county is selected, reset city dropdown
        ApproverCity.items = [];
        ApproverCity.value = "";
    }
}

        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_ApproverCity_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_ApproverCity_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToUPDOne"){
  ApproverCounty.enabled = true;
  ApproverCounty.visible = true;
}
else{
   ApproverCounty.enabled = false;
   ApproverCounty.visible = true;
}
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_ApproverState_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_ApproverState_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_EmployeeSignatureCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_EmployeeSignatureCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				EmployeeName.value = userValue;
				EmployeeSIgnature.value = userValue;
				EmployeeSignDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
	} else {
		EmployeeName.value = "";
		EmployeeSIgnature.value = "";
		EmployeeSignDate.value = "";
	}
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_EmployeeName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_EmployeeName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_EmployeeSIgnature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_EmployeeSIgnature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_EmployeeSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_EmployeeSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDSignatureCBOne_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDSignatureCBOne_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				UPDNameOne.value = userValue;
				UPDSignatureOne.value = userValue;
				UPDSignatureDateOne.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
	} else {
		UPDNameOne.value = "";
		UPDSignatureOne.value = "";
		UPDSignatureDateOne.value = "";
	}
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDNameOne_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDNameOne_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDSignatureOne_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDSignatureOne_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDSignatureDateOne_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDSignatureDateOne_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDSignatureCBTwo_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDSignatureCBTwo_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				UPDNameTwo.value = userValue;
				UPDSignatureTwo.value = userValue;
				UPDSignatureDateTwo.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
	} else {
		UPDNameTwo.value = "";
		UPDSignatureTwo.value = "";
		UPDSignatureDateTwo.value = "";
	}
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDNameTwo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDNameTwo_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDSignatureTwo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDSignatureTwo_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDSignatureDateTwo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_UPDSignatureDateTwo_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_RiskSignatureCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_RiskSignatureCB_valueCommit0 = function (scope) {
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
				RiskSignature.value = userValue;
				RiskDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
	} else {
		RiskName.value = "";
		RiskSignature.value = "";
		RiskDate.value = "";
	}
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_ApprovalDecision_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_ApprovalDecision_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToUPDTwo"){
if(this.value === "2"){
 UPDCommentTwo.mandatory = true;
}
else{
  UPDCommentTwo.mandatory = false;
}
}
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_RiskName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_RiskName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_RiskSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_RiskSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_RiskDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_RiskDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_DeptID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_DeptID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
   // var gifModal = document.getElementById('gifModal');
   // gifModal.style.display = "block";
debugger;
	//var deptname = this.value;
		if(StageIndicator.value === null || StageIndicator.value === "ToInitiator"){
    var appResult = [];
		if((this.value !== "Please select the county") && (this.value !== null)){
           $.ajax({

                type: 'GET', 

                url:"/bin/authorizationServlet",

               data:  {           
                 action: "COUNTY_DETAILS"
                //deptName: this.value
                  },

                dataType: 'json',

                success: function(myresponse){

                   //     gifModal.style.display = "none";
debugger;
                  if(myresponse.length >= 1){
                    for (var i = 0; i < myresponse.length; i++) {
                        var item = myresponse[i].COUNTY;                   
                        appResult.push(item);
                    }
                    County.value = "";
                    County.items = appResult;
				} else {
                    showErrorModal("Alert!", "No counties found");
                    County.items = [];
                    County.value = "";
                }
           }
              });
		}else{
            County.value = "";
            County.items = [];
			///gifModal.style.display = "none";
}
        }
//gifModal.style.display = "none"; 


        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_DeptID_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_DeptID_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            
   // var gifModal = document.getElementById('gifModal');
   // gifModal.style.display = "block";
debugger;
	//var deptname = this.value;
          if(StageIndicator.value === "ToUPDOne"){
    var appResult = [];
		if((this.value !== "Please select the county") && (this.value !== null)){
           $.ajax({

                type: 'GET', 

                url:"/bin/authorizationServlet",

               data:  {           
                 action: "COUNTY_DETAILS"
                //deptName: this.value
                  },

                dataType: 'json',

                success: function(myresponse){

                   //     gifModal.style.display = "none";
debugger;
                  if(myresponse.length >= 1){
                    for (var i = 0; i < myresponse.length; i++) {
                        var item = myresponse[i].COUNTY;                   
                        appResult.push(item);
                    }
                    ApproverCounty.value = "";
                    ApproverCounty.items = appResult;
				} else {
                    showErrorModal("Alert!", "No counties found");
                    ApproverCounty.items = [];
                    ApproverCounty.value = "";
                }
           }
              });
		}else{
            ApproverCounty.value = "";
            ApproverCounty.items = [];
			///gifModal.style.display = "none";
}
        }
//gifModal.style.display = "none"; 


        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_DeptID_valueCommit2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_DeptID_valueCommit2 = function (scope) {
    with(this) {
        with(scope) {
            

if (StageIndicator.value === null || StageIndicator.value === "ToInitiator") {
    // Only fetch counties if County is currently empty or uninitialized
    if (!County.value || County.value === "") {

        if (this.value !== "Please select the county" && this.value !== null) {
            $.ajax({
                type: 'GET',
                url: "/bin/authorizationServlet",
                data: {
                    action: "COUNTY_DETAILS"
                },
                dataType: 'json',
                success: function (myresponse) {
                  
                    if (myresponse.length >= 1) {
                        var appResult = [];
                        for (var i = 0; i < myresponse.length; i++) {
                            var item = myresponse[i].COUNTY;
                            appResult.push(item);
                        }
                        County.items = appResult;

                        // Only reset value if not already set
                        if (!County.value) {
                            County.value = "";
                        }
                    } else {
                        showErrorModal("Alert!", "No counties found");
                        County.items = [];
                    }
                },
                error: function () {
                    showErrorModal("Error", "Failed to fetch county details.");
                }
            });
        }
    } // End of county not yet set
}

        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_DeptID_valueCommit3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_DeptID_valueCommit3 = function (scope) {
    with(this) {
        with(scope) {
            

if(StageIndicator.value === "ToUPDOne") {
    // Only fetch if value is empty or undefined
    if (!ApproverCounty.value || ApproverCounty.value === "") {

        if (this.value !== "Please select the county" && this.value !== null) {
            $.ajax({
                type: 'GET',
                url: "/bin/authorizationServlet",
                data: {
                    action: "COUNTY_DETAILS"
                    // deptName: this.value (commented out)
                },
                dataType: 'json',
                success: function (myresponse) {
                   
                    if (myresponse.length >= 1) {
                        var appResult = [];
                        for (var i = 0; i < myresponse.length; i++) {
                            var item = myresponse[i].COUNTY;
                            appResult.push(item);
                        }
                        ApproverCounty.items = appResult;

                        // Only reset if value not already set
                        if (!ApproverCounty.value) {
                            ApproverCounty.value = "";
                        }
                    } else {
                        showErrorModal("Alert!", "No counties found");
                        ApproverCounty.items = [];
                        // Preserve previous selection if needed
                        // ApproverCounty.value = "";
                    }
                },
                error: function () {
                    showErrorModal("Error", "Failed to fetch county details.");
                }
            });
        }
    }
}

        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_Division_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_Division_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
  if( StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToApproval" || StageIndicator.value === "ToRisk"){
debugger;

var cwid1 = chrsID.value;
var dept1 = DeptID.value;
var union = unionCD.value;
debugger;
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

debugger;   
         if (myresopnse.length >= 1) {
           	for (var i = 0; i < myresopnse.length; i++) {
		// SupervisorEmail.value = myresopnse[i].MANAGER_EMAIL_ID;
             SupervisorEmail.value = "shreyas.manjunatha@thoughtfocus.com";
            // SupervisorEmail.value = "lpogge@fullerton.edu";
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
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_Division_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_Division_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            
 // if( StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToApproval" || StageIndicator.value === "ToRisk"){
var cwid1 = chrsID.value;
var dept1 = DeptID.value;
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
		//SupervisorEmail.value = myresopnse[i].MANAGER_EMAIL_ID;
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
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated__init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated__init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToDepartmentAdministrator"){
    if(this.value !== DepartmentAdministratorUserId.value){
  AckCB.value = null;
}
}
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_textbox_13150158961752830052977_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_textbox_13150158961752830052977_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToInitiator"){
this.value = "true";
}
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_CWID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_CWID_init0 = function (scope) {
    with(this) {
        with(scope) {
            if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  this.enabled=true;
} else {
  this.enabled=false;
}
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_CWID_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_CWID_init1 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_CWID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_CWID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
    if (this.value !== null && cwid_initiator.value !== this.value) {
      debugger;
        var gifModal = document.getElementById('gifModal');
        gifModal.style.display = "block";

        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedUserId",
            dataType: 'json',
            success: function(myresponse) {
                if (myresponse.Status == "Success") {
                  debugger;
                    var userValue = myresponse.userId;

                    var cwid = CWID.value;

                    $.ajax({
                        type: 'GET',

                        url: "/bin/getSubstituteFacultyData",
                        data: {
                            action: "SUB_FACULTY_CWID_LOOKUP",
                            cwid: cwid
                        },

                        dataType: 'json',
                        success: function(myresopnse) {

                            var modal = document.getElementById('myModal');
                            var span = document.getElementsByClassName("close")[0];
                            debugger;
                            if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined) {

                                InitiatorFirstName.value = myresopnse[0].FIRST_NAME;
                                InitiatorLastName.value = myresopnse[0].LAST_NAME;                             
                                DeptID.value = myresopnse[0].DEPTID;
                               // Department.value = myresopnse[0].DEPTNAME;                              
                                Division.value = myresopnse[0].DIVSION;
                              //  InitiatorEmail.value = "yjayaram@fullerton.edu";
                                InitiatorEmail.value = "shreyas.manjunatha@thoughtfocus.com";

                              //  InitiatorPanel.visible = true;

                                gifModal.style.display = "none";
                                modal.style.display = "none";


                            } else if (myresopnse.length > 1) {
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
                                var headings = ["", "Emp ID", "Last Name", "First Name", "Dept Id"];
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
                                InitiatorFirstName.value = myresopnse[n].FIRST_NAME;
                                InitiatorLastName.value = myresopnse[n].LAST_NAME;                             
                                DeptID.value = myresopnse[n].DEPTID;
                              //  Department.value = myresopnse[n].DEPTNAME;                              
                                Division.value = myresopnse[n].DIVSION;
                               // InitiatorEmail.value = "yjayaram@fullerton.edu";
                                InitiatorEmail.value = "shreyas.manjunatha@thoughtfocus.com";

                               // InitiatorPanel.visible = true;

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
                                // footerModal = document.getElementById("modal_footer");
                                footerModal.appendChild(okButton);
                                // document.getElementById('cBtn').parentNode.removeChild(document.getElementById('cBtn'));

                            } else {
                                //alert("No matching records found");
                                var modalError = document.getElementById("errorPopup");
                                var para = document.getElementById("para");
                                para.innerHTML = "";
                                para.innerHTML = "No matching records found";
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
                                    alert("Please select the department");
                                    modal.style.display = "block";
                                } else {

                                    alert("Please select the department");
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
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
              getPdf();


function getPdf() {
    console.log("in view pdf");
  
    window.guideBridge.getDataXML({
        success: function(result) {
           console.log("in view pdf="+result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/authorization-for-release-of-driver-record-information/authorizartion-for-release-of--driver-record-information');
            jsonData.append('fileName', "Authorization For Release of Driver Record Information");          
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
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_saveguidedraft1574920589904_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_saveguidedraft1574920589904_click0 = function (scope) {
    with(this) {
        with(scope) {
            handleDraftSave(this);





        }
	}
}
/**
 * @function authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_submit1574920582933_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_for_release_of_driver_record_information_authorizartion_for_release_of__driver_record_information.generated_submit1574920582933_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    aftiaDescCWID.value = InitiatorName.value + " " + cwid_initiator.value;
    EmailSubject.value = "Test - Authorization For Release of Driver Record Information - " +  InitiatorName.value + " " + cwid_initiator.value;
}


guideBridge.submit();
        }
	}
}
