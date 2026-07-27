/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            

if (StageIndicator.value === null) {

    RequestorInformationPanel.visible = true;
    RequestorInformationPanel.enabled = true;
    RequiredInformation.visible = true;
    RequiredInformation.enabled = true;
    InitiatorPanel.visible = true;
    InitiatorPanel.enabled = true;
    ApproverPanel.visible = false;    
    AssetPanel.visible = false; 
}

if (StageIndicator.value == "ToEmployee") {
    
    RequestorInformationPanel.visible = true;
    RequestorInformationPanel.enabled = true;
    panel1712920711761.enabled = true;
    RequiredInformation.visible = true;
    RequiredInformation.enabled = true;
  
    InitiatorPanel.visible = true;
    InitiatorPanel.enabled = true; 
    
    if (AckCB.value == "1") {
     ApproverPanel.visible = true;
     ApproverPanel.enabled = false; 
    } else {
      ApproverPanel.visible = false;
    }
  
    if (AssetCB.value == "1") {
     AssetPanel.visible = true;
     AssetPanel.enabled = false; 
    } else {
      AssetPanel.visible = false;
    }

}

if (StageIndicator.value == "ToDeptHead") {
    
    RequestorInformationPanel.visible = true;
    RequestorInformationPanel.enabled = false;
    RequiredInformation.visible = true;
    RequiredInformation.enabled = false;
  
    if (InitiatorCB.value == "1") {
     InitiatorPanel.visible = true;
     InitiatorPanel.enabled = false; 
    } else {
      InitiatorPanel.visible = false;
    }

    ApproverPanel.visible = true;
    ApproverPanel.enabled = true; 
  
    if (AssetCB.value == "1") {
     AssetPanel.visible = true;
     AssetPanel.enabled = false; 
    } else {
      AssetPanel.visible = false;
    }
    
}

  if (StageIndicator.value == "ToAsset") {

    RequestorInformationPanel.visible = true;
    RequestorInformationPanel.enabled = false;
    RequiredInformation.visible = true;
    RequiredInformation.enabled = false;
    
    if (InitiatorCB.value == "1") {
     InitiatorPanel.visible = true;
     InitiatorPanel.enabled = false; 
    } else {
      InitiatorPanel.visible = false;
    }
    
    if (AckCB.value == "1") {
     ApproverPanel.visible = true;
     ApproverPanel.enabled = false; 
    } else {
      ApproverPanel.visible = false;
    }
    
    AssetPanel.visible = true; 
    AssetPanel.enabled = true;

}

        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null){
	var gifModal = document.getElementById('gifModal');
	gifModal.style.display = "block";

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
					url: "/bin/getEvaluationFormData",
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
                            hidden_cwid.value = myresopnse[0].EMPLID;
							cwid_initiator.value = myresopnse[0].EMPLID;
							FirstName.value = myresopnse[0].FIRST_NAME;
							LastName.value = myresopnse[0].LAST_NAME;
                            DeptID.value = myresopnse[0].DEPTID;
                            Department.value = myresopnse[0].DEPTNAME;
                            Division.value = myresopnse[0].DIVSION;
                            School.value = myresopnse[0].DIVISION_NAME;

							//InitiatorEmail.value = myresopnse[0].EMAILID;
                            InitiatorEmail.value = "soumya.ravindra@thoughtfocus.com";
							InitiatorUserID.value = myresopnse[0].EMP_USERID;
							EmpName.value = FirstName.value + " " + LastName.value;
                            InitiatorName.value = FirstName.value + " " + LastName.value;
						
							deptID_initiator.value = myresopnse[0].DEPTID;

							
                            
							CWID.value = myresopnse[0].EMPLID;
							deptID_requestor.value = myresopnse[0].DEPTID;
							//getAddminData(Division.value);
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
                            col.push("DEPTNAME");

							var table = document.createElement("table");
							table.id = "tb";
							var tr = table.insertRow(-1);
							var headings = ["", "Emp ID", "Last Name", "First Name", "Dept ID", "Dept Name"];
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
										FirstName.value = myresopnse[n].FIRST_NAME;
										LastName.value = myresopnse[n].LAST_NAME;
                                        DeptID.value = myresopnse[n].DEPTID;
                                        Division.value = myresopnse[n].DIVSION;
                                        Department.value = myresopnse[n].DEPTNAME;
                                        hidden_cwid.value = myresopnse[n].EMPLID;
                                        
                                        School.value = myresopnse[n].DIVISION_NAME;

										//InitiatorEmail.value = myresopnse[n].EMAILID;
                                        InitiatorEmail.value = "soumya.ravindra@thoughtfocus.com";
										InitiatorUserID.value = myresopnse[n].EMP_USERID;
										EmpName.value = FirstName.value + " " + LastName.value;
                                        InitiatorName.value = FirstName.value + " " + LastName.value;
									
										deptID_initiator.value = myresopnse[n].DEPTID;

										InitiatorFlag.value = false;
										//getAddminData(Division.value);

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
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
guideBridge.on("validationComplete", function(event, payload) {
  debugger;

if (StageIndicator.value == "ToEmployee") {
    var rowData = []; 
    
    var rowCount = EquipmentPanel.instanceManager.instanceCount; 
    for (var i = 0; i < rowCount; i++) {
        

        var rowObject = {};

        rowObject.PropertyTN = EquipmentPanel.instanceManager.instances[i].PropertyTN.value;
        rowObject.PoliceRN = EquipmentPanel.instanceManager.instances[i].PoliceRN.value;
        rowObject.LostCB = String(EquipmentPanel.instanceManager.instances[i].LostCB.value);
        rowObject.StolenCB = String(EquipmentPanel.instanceManager.instances[i].StolenCB.value);
        rowObject.AssetDescription = EquipmentPanel.instanceManager.instances[i].AssetDescription.value;
        rowObject.DateAsset = EquipmentPanel.instanceManager.instances[i].DateAsset.value;
        

        rowData.push(rowObject);
    }

    AssetDetailsJSON.value = JSON.stringify(rowData); 

    console.log(rowData);
}

});
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_guideRootPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_guideRootPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
//if((StageIndicator.value === null && AssetPanel.visible === false) || (StageIndicator.value == "ToEmployee" )){
  getAddminData(Division.value);

//}

function getAddminData(division){
	var gifModal = document.getElementById('gifModal');
	gifModal.style.display = "block";

	$.ajax({
		type: 'GET',
		url: "/bin/propertyManagementServlet",

		data: {
			action: 'DEPT_ADMIN_DATA', 
          division: division
		},

		dataType: 'json',

		success: function(myresponse) {
			if (myresponse.length >= 1) {
				var progarray = [];
				for (var i = 0; i < myresponse.length; i++) {
					var item = myresponse[i].EMP_NAME + " - " + myresponse[i].EMAILID;
					progarray.push(item);
				}
				AdminNameDD.items = progarray.sort();
				approverJSONDetails.value = JSON.stringify(myresponse);
			}
			gifModal.style.display = "none";
		}
	});
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_caseId_init0 = function (scope) {
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
this.enabled = false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_CWID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_CWID_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToEmployee")
  this.enabled=true;
}else{
  this.enabled=false;
}

        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_CWID_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_CWID_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToEmployee"){
  RequestorUserID.value = "1";
}else{
  RequestorUserID.value = "";
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_CWID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_CWID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
  if((StageIndicator.value === null && AssetPanel.visible === false) || (StageIndicator.value == "ToEmployee"  && RequestorUserID.value !== null)){
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";

    var userValue = this.value;
    var userId = hidden_cwid.value;

    workflow_initiator.value = userId;

    if (cwid_initiator.value !== this.value) {

        $.ajax({

            type: 'GET',
            url: '/bin/getSubstituteFacultyData',
            data: {
                action: "SUB_FACULTY_CWID_LOOKUP",
                cwid: userValue
            },
            dataType: 'json',

            success: function(myresponse) {

                var modal = document.getElementById('myModal');
                var span = document.getElementsByClassName("close")[0];
                var gifModal = document.getElementById('gifModal');

                if (myresponse.length === 1) {

                    FirstName.value = myresponse[0].FIRST_NAME;
                    LastName.value = myresponse[0].LAST_NAME;
                    DeptID.value = myresponse[0].DEPTID;
                    Division.value = myresponse[0].DIVSION;

                    Department.value = myresponse[0].DEPTNAME;
                    School.value = myresponse[0].DIVISION_NAME;
					getAddminData(Division.value);
					AdminNameDD.value = "";
                    InitiatorFlag.value = true;
						
                    InitiatorPanel.visible = true;
                    RequestorPanel.visible = false;



                    gifModal.style.display = "none";

                } else if (myresponse.length > 1) {

                    gifModal.style.display = "none";
                    modal.style.display = "block";

                    var col = [];
                    col.push("EMPLID");
                    col.push("LAST_NAME");
                    col.push("FIRST_NAME");
                    col.push("DEPTID");
                    col.push("DEPTNAME");

                    var table = document.createElement("table");
                    table.id = "tb";
                    var tr = table.insertRow(-1);
                    var headings = ["", "Emp ID", "Last Name", "First Name", "Dept ID", "Dept Name"];

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
                    okButton.value = "Ok";
                    okButton.onclick = function(event) {

                        var n;
                        var rButtonStatus;
                        var rButtons = document.getElementsByClassName("rb");
                        for (n = 0; n < rButtons.length; n++) {
                            if (rButtons[n].checked === false) {
                                rButtonStatus = false;
                            } else {
                               

                                FirstName.value = myresponse[n].FIRST_NAME;
                                LastName.value = myresponse[n].LAST_NAME;
                                DeptID.value = myresponse[n].DEPTID;
                                Division.value = myresponse[n].DIVSION;
                              
                                Department.value = myresponse[n].DEPTNAME;
                                School.value = myresponse[n].DIVISION_NAME;
                               getAddminData(Division.value);
								AdminNameDD.value = "";
                                InitiatorFlag.value = true;

                                InitiatorPanel.visible = true;
                               // RequestorPanel.visible = false;
                              

                                rButtonStatus = true;
                                modal.style.display = "none";

                                break;
                            }
                        }
                        if (rButtonStatus === false) {
                            showErrorModal("Alert!", "Please select the department");
                            modal.style.display = "block";
                        }
                    };
                    footerModal = document.getElementById("modal_footer");

                    footerModal.appendChild(okButton);

                } else {
                    modal.style.display = "none";
                    gifModal.style.display = "none";
                    showErrorModal("Alert!", "No matching records found");
                    //empl_Id.value = "";
                    //hidden_cwid.value =  "";
                    FirstName.value = "";
                    LastName.value = "";
                    TodayDate.value = "";
                    Department.value = "";
                    School.value = "";
                    DeptID.value = "";
                    Division.value = "";
                }
                ////////////////////////////////////////////
                span.onclick = function() {

                    modal.style.display = "none";
                };

            }
        });
    } else {
        gifModal.style.display = "none";
    }

}

function getAddminData(division){
	var gifModal = document.getElementById('gifModal');
	gifModal.style.display = "block";

	$.ajax({
		type: 'GET',
		url: "/bin/propertyManagementServlet",

		data: {
			action: 'DEPT_ADMIN_DATA', 
          division: division
		},

		dataType: 'json',

		success: function(myresponse) {
			if (myresponse.length >= 1) {
				var progarray = [];
				for (var i = 0; i < myresponse.length; i++) {
					var item = myresponse[i].EMP_NAME + " - " + myresponse[i].EMAILID;
					progarray.push(item);
				}
				AdminNameDD.items = progarray.sort();
				approverJSONDetails.value = JSON.stringify(myresponse);
			}
			gifModal.style.display = "none";
		}
	});
}


        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_FirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_FirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_LastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_LastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_DeptID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_DeptID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;

        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_DeptID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_DeptID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
//if((StageIndicator.value === null && AssetPanel.visible === false) || (StageIndicator.value == "ToEmployee" )){
  getAddminData(Division.value);

//}

function getAddminData(division){
	var gifModal = document.getElementById('gifModal');
	gifModal.style.display = "block";

	$.ajax({
		type: 'GET',
		url: "/bin/propertyManagementServlet",

		data: {
			action: 'DEPT_ADMIN_DATA', 
          division: division
		},

		dataType: 'json',

		success: function(myresponse) {
			if (myresponse.length >= 1) {
				var progarray = [];
				for (var i = 0; i < myresponse.length; i++) {
					var item = myresponse[i].EMP_NAME + " - " + myresponse[i].EMAILID;
					progarray.push(item);
				}
				AdminNameDD.items = progarray.sort();
				approverJSONDetails.value = JSON.stringify(myresponse);
			}
			gifModal.style.display = "none";
		}
	});
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_Department_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_Department_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_Department_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_Department_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
//if((StageIndicator.value === null && AssetPanel.visible === false) || (StageIndicator.value == "ToEmployee" )){
  getAddminData(Division.value);

//}

function getAddminData(division){
	var gifModal = document.getElementById('gifModal');
	gifModal.style.display = "block";

	$.ajax({
		type: 'GET',
		url: "/bin/propertyManagementServlet",

		data: {
			action: 'DEPT_ADMIN_DATA', 
          division: division
		},

		dataType: 'json',

		success: function(myresponse) {
			if (myresponse.length >= 1) {
				var progarray = [];
				for (var i = 0; i < myresponse.length; i++) {
					var item = myresponse[i].EMP_NAME + " - " + myresponse[i].EMAILID;
					progarray.push(item);
				}
				AdminNameDD.items = progarray.sort();
				approverJSONDetails.value = JSON.stringify(myresponse);
			}
			gifModal.style.display = "none";
		}
	});
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_Department_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_Department_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToEmployee"){
  RequestorUserID.value = "1";
}else{
  RequestorUserID.value = "";
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_School_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_School_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_TodayDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_TodayDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value === null || StageIndicator.value == "ToInitiator"){
	  this.enabled = false;

  TodayDate.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_AdminNameDD_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_AdminNameDD_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
 //if((StageIndicator.value === null && AssetPanel.visible === false) || (StageIndicator.value == "ToEmployee" )){
    var ChairNameDropDownVal = AdminNameDD.value;
    ChairNameDropDownVal = ChairNameDropDownVal.substr(0, ChairNameDropDownVal.indexOf(' - '));
    DeptAdminName.value = ChairNameDropDownVal;
  
    var chairInfo = DeptAdminName.value;
    var chairInfoArray = [];
    var chairActualInfoArray = [];
    var chairDetailsParsedArray = [];
    var chairDetailsListObj = {};

    chairDetailsArray = approverJSONDetails.value;
    console.log("chairDetailsArray= " + chairDetailsArray);
    chairDetailsParsedArray = JSON.parse(chairDetailsArray);

    for (var s = 0; s < chairDetailsParsedArray.length; s++) {
        chairInfoArray.push(chairDetailsParsedArray[s]);
    }

    for (var chairDetails = 0; chairDetails < chairInfoArray.length; chairDetails++) {
        chairDetailsListObj = chairInfoArray[chairDetails];
        if (chairInfo == chairDetailsListObj["EMP_NAME"]) {

            DeptAdminName.value = chairDetailsListObj["EMP_NAME"];
            DeptHeadUserID.value = chairDetailsListObj["EMP_USERID"];
            //DeptHeadEmail.value = chairDetailsListObj["EMAILID"];                        
            DeptHeadEmail.value = "soumya.ravindra@thoughtfocus.com";
 
        }
    }

 //}
            
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_Remove_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_Remove_init0 = function (scope) {
    with(this) {
        with(scope) {
            
 var panelCount = EquipmentPanel.instanceManager.instanceCount;
    if (panelCount == "1") {
        EquipmentPanel.instanceManager.instances[0].Remove.visible = false;
    }
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_Remove_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_Remove_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = EquipmentPanel.instanceManager.instanceCount;
EquipmentPanel.instanceManager.removeInstance(EquipmentPanel.instanceIndex);
if (panelCount == "2") {
    EquipmentPanel.instanceManager.instances[0].Remove.visible = false;
}


        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_LostCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_LostCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value == "1"){
  StolenCB.value = null; 
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_StolenCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_StolenCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value == "1"){
  LostCB.value = null; 
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_PropertyTN_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_PropertyTN_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if((StageIndicator.value === null && AssetPanel.visible === false) || (StageIndicator.value == "ToEmployee" && RequestorUserID.value === "1")){
//if(RequestorPanel.visible === false){
var tagNo = PropertyTN.value;


$.ajax({
    type: 'GET',
    url: "/bin/propertyManagementServlet",
    data: {
        action: "ASSET_DETAILS",
        tagNumber: tagNo
    },
    dataType: 'json',
    success: function(response) {

        var model = "";
        var desc = "";

        if (response.length === 1) {
            model = response[0].MODEL || "";
            desc = response[0].DESCR || "";


            if (model !== "" && desc !== "") {
                AssetDescription.value = desc + " ," + model;
            }
        } else if (response.length === 0 || (AssetDescription.value === "")) {
debugger;
            $.ajax({
                type: 'GET',
                url: "/bin/getAssetManagementPropertyAssetData",
                data: {
                    action: "ASSET_API_LOOKUP",
                    assetId: tagNo
                },
                dataType: 'json',
                success: function(myresponse) {

                    var serialNo = "";
                    var model = "";


                    if (myresponse.length === 1) {

                        for (var i = 0; i < myresponse.length; i++) {
                            var resultArray = myresponse[i].result;
                            for (var j = 0; j < resultArray.length; j++) {
                                var assetsArray = resultArray[j].assets;
                                for (var k = 0; k < assetsArray.length; k++) {
                                    serialNo = assetsArray[k].serial_number || "";
                                    model = assetsArray[k].model_id || "";
                                }
                            }
                        }
                        if (serialNo !== "" && model !== "") {
                            AssetDescription.value = model + " ," + serialNo;
                        }else {
                        AssetDescription.value = "";
                    }

                    } /*else {
                        AssetDescription.value = "";
                    }*/
                },

                error: function(error) {
                    alert("Error occurred while fetching asset data: " + error.statusText);

                }
            });
        } else {
            AssetDescription.value = "";
        }
    },
    error: function(error) {
        alert("Error occurred while fetching asset details: " + error.statusText);
    }
});
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_AddDetails_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_AddDetails_init0 = function (scope) {
    with(this) {
        with(scope) {
            if((StageIndicator.value === null) || (StageIndicator.value == "ToEmployee" )){ 
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_AddDetails_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_AddDetails_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if((StageIndicator.value === null || StageIndicator.value == "ToEmployee")){
   if (EquipmentPanel.instanceManager.instances[0].Remove.visible === false) {
    EquipmentPanel.instanceManager.instances[0].Remove.visible = true;
}

EquipmentPanel.instanceManager.addInstance();
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_InitiatorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_InitiatorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if ((StageIndicator.value == "ToEmployee") || (StageIndicator.value === null)) {
        if (EmpSign.value === null) {           
            InitiatorDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  EmpSign.value = userValue;
                  InitiatorDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    EmpSign.value = "";
    InitiatorDate.value = "";
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_EmpSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_EmpSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_InitiatorDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_InitiatorDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_RequestorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_RequestorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if ((StageIndicator.value == "ToRequestor") || (StageIndicator.value === null)) {
        if (RequestorSignDate.value === null) {           
            RequestorSignDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  RequestorSignature.value = userValue;
                  RequestorSignDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    RequestorSignature.value = "";
    RequestorSignDate.value = "";
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_RequestorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_RequestorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_RequestorSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_RequestorSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_AckCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_AckCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (StageIndicator.value == "ToDeptHead") {
        if (DeptHeadSignDate.value === null) {           
            DeptHeadSignDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  DeptAdminSign.value = userValue;
                   DeptAdminNameS.value = userValue;
                  deptuseridcopy.value = myresopnse[0].EMPUSERID;
                  DeptHeadSignDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    DeptAdminSign.value = "";
    DeptHeadSignDate.value = "";
  DeptAdminNameS.value = "";
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_DeptAdminNameS_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_DeptAdminNameS_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_DeptAdminSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_DeptAdminSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_DeptHeadSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_DeptHeadSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_AssetCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_AssetCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (StageIndicator.value == "ToAsset") {
        if (OfficeDate.value === null) {           
            OfficeDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  AssetManagementSign.value = userValue;
                  AssetManagementName.value = userValue;
                  OfficeDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    AssetManagementName.value = "";
    AssetManagementSign.value = "";
    OfficeDate.value = "";
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_AssetManagementSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_AssetManagementSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_AssetManagementName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_AssetManagementName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_OfficeDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_OfficeDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_HiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_HiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_deptuseridcopy_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_deptuseridcopy_init0 = function (scope) {
    with(this) {
        with(scope) {
             
if(StageIndicator.value == "ToDeptHead"){
    if(this.value !== DeptHeadUserID.value){
  AckCB.value = null;
}
}
        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/asset-management-lost-or-stolen-property-form/lost-or-stolen-property-form');
            //jsonData.append('fileName', FirstName.value + "_" + LastName.value + "(" + EmplId.value + ")" + "_" + Date.now());
            jsonData.append('fileName', FirstName.value + "_"+RequestorInformationPanel.LastName.value);
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
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_saveguidedraft1629881233615_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_saveguidedraft1629881233615_click0 = function (scope) {
    with(this) {
        with(scope) {
            //if(EmplId.value !== null){
 aftiaDescCWID.value = FirstName.value + " " + LastName.value + " "+EmplId.value ;
//}
handleDraftSave(this);


        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_submit1600234699256_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_submit1600234699256_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
var flag = 0;

var cwidValue = CWID.value;
var pattern = /^8\d{8}$/;
var result = pattern.test(cwidValue);
if(flag === 0 ){
  if(result !== true){
  flag = 1;    
  showErrorModal("Alert!","Please enter a valid CWID");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].RequestorInformationPanel[0].CWID[0]");
    }else{
  flag = 0;
  }
} 
if (flag === 0) {
    var dynamicPanelsCount = EquipmentPanel.instanceManager.instanceCount;
    for (var i = 0; i < dynamicPanelsCount; i++) {
        if ((EquipmentPanel.instanceManager.instances[i].LostCB.value === null) && (EquipmentPanel.instanceManager.instances[i].StolenCB.value === null)) {
            flag = 1;
            showErrorModal("Alert !", "Please select the Asset Lost/Stolen checkbox ");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].RequiredInformation[0].EquipmentPanel[0].LostCB[0]");
        } else {
            flag = 0;
        }
    }
}
/*if(flag === 0){
if((LostCB.value === null) && (StolenCB.value === null)){
  flag = 1;
  showErrorModal("Alert !", "Please select the Asset Lost/Stolen checkbox "); 
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].RequiredInformation[0].EquipmentPanel[0].LostCB[0]");
  }
else{
  flag = 0;
}
}*/
if(flag === 0){
if(StageIndicator.value === null){
 // aftiaDescCWID.value = FirstName.value + " " + LastName.value + " " + CWID.value;
 aftiaDescCWID.value = EmpName.value + " " + CWID.value;
  EmailSubject.value = "Test -  Asset Management Lost or Stolen Property Form - (" + CWID.value + ")";

  InitiatorEmail.value = "soumya.ravindra@thoughtfocus.com";
 // RequestorEmail.value = "soumya.ravindra@thoughtfocus.com";
  DeptHeadEmail.value = "soumya.ravindra@thoughtfocus.com";

  guideBridge.submit();
}
}



        }
	}
}
/**
 * @function asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_submit1600234699256_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
asset_management_lost_or_stolen_property_form_lost_or_stolen_property_form.generated_submit1600234699256_click1 = function (scope) {
    with(this) {
        with(scope) {
            

if (StageIndicator.value === null || StageIndicator.value == "ToEmployee") {
    var rowData = []; 
    
    var rowCount = EquipmentPanel.instanceManager.instanceCount; 
    for (var i = 0; i < rowCount; i++) {
        

        var rowObject = {};

        rowObject.PropertyTN = EquipmentPanel.instanceManager.instances[i].PropertyTN.value;
        rowObject.PoliceRN = EquipmentPanel.instanceManager.instances[i].PoliceRN.value;
        rowObject.LostCB = String(EquipmentPanel.instanceManager.instances[i].LostCB.value);
        rowObject.StolenCB = String(EquipmentPanel.instanceManager.instances[i].StolenCB.value);
        rowObject.AssetDescription = EquipmentPanel.instanceManager.instances[i].AssetDescription.value;
        rowObject.DateAsset = EquipmentPanel.instanceManager.instances[i].DateAsset.value;
        

        rowData.push(rowObject);
    }

    AssetDetailsJSON.value = JSON.stringify(rowData); 

    console.log(rowData);
}

        }
	}
}
