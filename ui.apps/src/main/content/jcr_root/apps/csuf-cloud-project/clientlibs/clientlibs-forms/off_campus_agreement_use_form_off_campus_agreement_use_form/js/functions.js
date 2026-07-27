/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
             if (StageIndicator.value === null) {
     var gifModal = document.getElementById('gifModal');
     gifModal.style.display = "block";

     $.ajax({
         type: 'GET',
         url: "/bin/getLoggedUserId",
         dataType: 'json',
         success: function(myresponse) {

             var userValue = myresponse.userId;
             workflow_initiator.value = userValue;
             getFacultyDetails(userValue);
         },
         error: function(error) {
             alert("error block=" + error);
         }
     });
 }


 function getFacultyDetails(userValue) {
     $.ajax({
         type: 'GET',
         url: "/bin/getVolunteerData",
         data: {
             action: "VOLUNTEER_DETAILS",
             userID: userValue
         },
         dataType: 'json',
         success: function(response) {

             var modal = document.getElementById('myModal');
             var span = document.getElementsByClassName("close")[0];

             if (response.length === 1 && response[0].EMPLID !== undefined) {

                 CWID.value = response[0].EMPLID;
                 hidden_cwid.value = response[0].EMPLID;
                 cwid_initiator.value = response[0].EMPLID;
                 FirstName.value = response[0].FIRST_NAME;
                 LastName.value = response[0].LAST_NAME;
                 InitiatorUserID.value = response[0].EMP_USERID;
                 Address.value = response[0].ADDRESS1;
                 State.value = response[0].STATE;
                 ZipCode.value = response[0].POSTAL;
                 InitiatorEmail.value = "soumya.ravindra@thoughtfocus.com";
                 // InitiatorEmail.value = response[0].EMAILID;
                 DeptID.value = response[0].DEPTID;
                 Division.value = response[0].DIVSION;
                 DepartmentName.value = response[0].DEPTNAME;
                 SchoolDivision.value = response[0].DIVISION_NAME;
                 // BorrowerName.value = FirstName.value + " " + LastName.value;
                 InitiatorName.value = FirstName.value + " " + LastName.value;
                 deptID_initiator.value = response[0].DEPTID;
                 //  InitiatorFlag.value = false;



                 gifModal.style.display = "none";
                 modal.style.display = "none";

             } else if (response.length > 1) {
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
                 for (var k = 0; k < response.length; k++) {
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
                             CWID.value = response[n].EMPLID;
                             hidden_cwid.value = response[n].EMPLID;
                             cwid_initiator.value = response[0].EMPLID;
                             FirstName.value = response[n].FIRST_NAME;
                             LastName.value = response[n].LAST_NAME;
                             InitiatorUserID.value = response[n].EMP_USERID;
                             Address.value = response[n].ADDRESS1;
                             State.value = response[n].STATE;
                             ZipCode.value = response[n].POSTAL;
                             // BorrowerName.value = FirstName.value + " " + LastName.value;
                             InitiatorEmail.value = "soumya.ravindra@thoughtfocus.com";
                             // InitiatorEmail.value = response[n].EMAILID;
                             DeptID.value = response[n].DEPTID;
                             Division.value = response[n].DIVSION;
                             DepartmentName.value = response[n].DEPTNAME;
                             SchoolDivision.value = response[n].DIVISION_NAME;
                             deptID_initiator.value = response[n].DEPTID;
                             // InitiatorFlag.value = false;


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
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            

if (StageIndicator.value === null) {

    EmployeeInformationPanel.visible = true;
    EmployeeInformationPanel.enabled = true;
    InstructionPanel.visible = true;
    InstructionPanel.enabled = true;
    EquipmentInformation.visible = true;
    EquipmentInformation.enabled = true;
  
    InitiatorPanel.visible = true;
    InitiatorPanel.enabled = true;
    
    DeptHeadSignaturePanel.visible = false;    
    AssetPanel.visible = false; 
  
}

if (StageIndicator.value == "ToInitiator") {
    
    EmployeeInformationPanel.visible = true;
    EmployeeInformationPanel.enabled = true;
    InstructionPanel.visible = true;
    InstructionPanel.enabled = true;
    EquipmentInformation.visible = true;
    EquipmentInformation.enabled = true;
if (BorrowReturnRB.value == 1) {
   BorrowedPanel.visible = true;
  ReturnedPanel.visible = false;
}else{
  BorrowedPanel.visible = false;
  ReturnedPanel.visible = true;
}
    InitiatorPanel.visible = true;
    InitiatorPanel.enabled = true; 

  
    if (AdminCB.value == "1") {
     DeptHeadSignaturePanel.visible = true;
     DeptHeadSignaturePanel.enabled = false; 
    } else {
      DeptHeadSignaturePanel.visible = false;
    }
  
    if (AssetCB.value == "1") {
     AssetPanel.visible = true;
     AssetPanel.enabled = false; 
    } else {
      AssetPanel.visible = false;
    }
}



if (StageIndicator.value == "ToDeptHead") {
    
    EmployeeInformationPanel.visible = true;
    EmployeeInformationPanel.enabled = false;
    InstructionPanel.visible = true;
    InstructionPanel.enabled = false;
    EquipmentInformation.visible = true;
    EquipmentInformation.enabled = false;


    if (EmployeeCB.value == "1") {
     InitiatorPanel.visible = true;
     InitiatorPanel.enabled = false; 
    } else {
      InitiatorPanel.visible = false;
    }
 
    DeptHeadSignaturePanel.visible = true;
    DeptHeadSignaturePanel.enabled = true; 
  
    if (AssetCB.value == "1") {
     AssetPanel.visible = true;
     AssetPanel.enabled = false; 
    } else {
      AssetPanel.visible = false;
    }
  if (BorrowReturnRB.value == "1") {
   BorrowedPanel.visible = true;
  ReturnedPanel.visible = false;
}else{
  BorrowedPanel.visible = false;
  ReturnedPanel.visible = true;
}
}
  if (StageIndicator.value == "ToAsset") {

    EmployeeInformationPanel.visible = true;
    EmployeeInformationPanel.enabled = false;
    InstructionPanel.visible = true;
    InstructionPanel.enabled = false;
    EquipmentInformation.visible = true;
    EquipmentInformation.enabled = false;
    
    if (EmployeeCB.value == "1") {
     InitiatorPanel.visible = true;
     InitiatorPanel.enabled = false; 
    } else {
      InitiatorPanel.visible = false;
    }
  
    if (AdminCB.value == "1") {
     DeptHeadSignaturePanel.visible = true;
     DeptHeadSignaturePanel.enabled = false; 
    } else {
      DeptHeadSignaturePanel.visible = false;
    }
    
    AssetPanel.visible = true; 
    AssetPanel.enabled = true;
 if (BorrowReturnRB.value == "1") {
   BorrowedPanel.visible = true;
  ReturnedPanel.visible = false;
}else{
  BorrowedPanel.visible = false;
  ReturnedPanel.visible = true;
}
}

        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            
guideBridge.on("validationComplete", function(event, payload) {
if (StageIndicator.value == "ToInitiator") {
    var rowData = []; 
    if(BorrowReturnRB.value === "1"){
    var rowCount = BorrowedEquip.instanceManager.instanceCount; 
    for (var i = 0; i < rowCount; i++) {        
        var rowObject = {};    
        rowObject.PropertyTagNum = BorrowedEquip.instanceManager.instances[i].PropertyTagNum.value;
        rowObject.ExpectedReturnDate = BorrowedEquip.instanceManager.instances[i].BorrowerDate.value;
        rowObject.Description = BorrowedEquip.instanceManager.instances[i].Description.value;
        
        rowData.push(rowObject);
      } 
    } 
    if(BorrowReturnRB.value === "2"){
      var rowCounttwo = ReturnedEquip.instanceManager.instanceCount; 
   		for (var j = 0; j < rowCounttwo; j++) {
        var rowObject1 = {};
        rowObject1.PropertyTagNum = ReturnedEquip.instanceManager.instances[j].PropertyTagNumRE.value;
        rowObject1.DateReturned = ReturnedEquip.instanceManager.instances[j].DateReturned.value;
        rowObject1.Description = ReturnedEquip.instanceManager.instances[j].DescriptionRE.value;
        rowData.push(rowObject1);
      }
    }      
        
    AssetDetailsJSON.value = JSON.stringify(rowData); 

    console.log(rowData);
}
});


        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_caseId_init0 = function (scope) {
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
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_CWID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_CWID_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToInitiator"){
  RequestorUserID.value = "1";
}else{
  RequestorUserID.value = "";
}
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_CWID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_CWID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if ((StageIndicator.value === null && AssetPanel.visible === false) || (StageIndicator.value == "ToInitiator" && RequestorUserID.value !== null)) {
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";

    var userValue = this.value;
    var userId = hidden_cwid.value;


    if (cwid_initiator.value !== this.value) {

        $.ajax({

            type: 'GET',
            url: '/bin/getOffCampusAgreementUse',
            data: {
                action: "OFF_CAMPUS_AGREEMENT_CWID",
                cwid: userValue
            },
            dataType: 'json',

            success: function(myresponse) {

                var modal = document.getElementById('myModal');
                var span = document.getElementsByClassName("close")[0];
                var gifModal = document.getElementById('gifModal');

                if (myresponse.length === 1) {
                    //  CWID.value = myresponse[0].EMPLID;
                    FirstName.value = myresponse[0].FIRST_NAME;
                    LastName.value = myresponse[0].LAST_NAME;
                   // InitiatorUserID.value = myresponse[0].EMP_USERID;
                    Address.value = myresponse[0].ADDRESS1;
                    State.value = myresponse[0].STATE;
                    ZipCode.value = myresponse[0].POSTAL;
                   
                    Division.value = myresponse[0].DIVSION;
                    DeptID.value = myresponse[0].DEPTID;
                    DepartmentName.value = myresponse[0].DEPTNAME;
                    SchoolDivision.value = myresponse[0].DIVISION_NAME;
                    getAddminData(Division.value);
                     AdminNameDD.value = ""; 
                    
                    
                    deptID_initiator.value = myresponse[0].DEPTID;
                    //  InitiatorFlag.value = false;                   



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
                              
                                // CWID.value = response[n].EMPLID;
                                FirstName.value = myresponse[n].FIRST_NAME;
                                LastName.value = myresponse[n].LAST_NAME;
                            
                                Address.value = myresponse[n].ADDRESS1;
                                State.value = myresponse[n].STATE;
                                ZipCode.value = myresponse[n].POSTAL;
                                
                                Division.value = myresponse[n].DIVSION;
                                DeptID.value = myresponse[n].DEPTID;
                                DepartmentName.value = myresponse[n].DEPTNAME;
                                SchoolDivision.value = myresponse[n].DIVISION_NAME;
                                deptID_initiator.value = myresponse[n].DEPTID;
                                getAddminData(Division.value);
                                AdminNameDD.value = ""; 
                               
                                // InitiatorFlag.value = false;
                                

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
                    FirstName.value = "";
                    LastName.value = "";
                 //   InitiatorUserID.value = "";
                    Address.value = "";
                    State.value = "";
                    ZipCode.value = "";
                    // BorrowerName.value = FirstName.value + " " + LastName.value;
                    InitiatorEmail.value = "";
                    // InitiatorEmail.value = "";
                    DeptID.value = "";
                    DepartmentName.value = "";
                    SchoolDivision.value = "";
                    deptID_initiator.value = "";
                }
                ////////////////////////////////////////////
                span.onclick = function() {

                    modal.style.display = "none";
                };

            }
        });
    }else{
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
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_FirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_FirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_LastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_LastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_DeptID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_DeptID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;

        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_DeptID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_DeptID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
//if ((StageIndicator.value === null && AssetPanel.visible === false) || (StageIndicator.value == "ToInitiator" && RequestorUserID.value !== null)) {
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
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_DepartmentName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_DepartmentName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_SchoolDivision_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_SchoolDivision_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_Address_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_Address_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_Date_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value === null || StageIndicator.value == "ToInitiator"){
	  this.enabled = false;

  Date_1.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_State_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_State_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_ZipCode_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_ZipCode_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AdminNameDD_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AdminNameDD_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
//if ((StageIndicator.value === null && AssetPanel.visible === false) || (StageIndicator.value == "ToInitiator" && RequestorUserID.value !== null)) {

    var ChairNameDropDownVal = AdminNameDD.value;
    ChairNameDropDownVal = ChairNameDropDownVal.substr(0, ChairNameDropDownVal.indexOf(' - '));
    AdminName.value = ChairNameDropDownVal;
  
    var chairInfo = AdminName.value;
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

            AdminName.value = chairDetailsListObj["EMP_NAME"];
            DeptAdminUserID.value = chairDetailsListObj["EMP_USERID"];
            //DeptAdminEmail.value = chairDetailsListObj["EMAILID"];                        
            DeptAdminEmail.value = "soumya.ravindra@thoughtfocus.com";
 
          
        }
    }
//}

            
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_BorrowReturnRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_BorrowReturnRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
   BorrowedPanel.visible = true;
  ReturnedPanel.visible = false;
}else{
  BorrowedPanel.visible = false;
  ReturnedPanel.visible = true;
}

        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_BorrowReturnRB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_BorrowReturnRB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
                 if(this.value == "1"){
        var textVal = "<p><b>Borrower Signature & Acknowledgement</b></p>";
        $("#InitiatorSignatureHeading").html(textVal);
      }else{
        var textVal2 = "<p><b>Returnee Signature & Acknowledgement</b></p>";
        $("#InitiatorSignatureHeading").html(textVal2);
      }
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_BorrowedPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_BorrowedPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_Remove_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_Remove_init0 = function (scope) {
    with(this) {
        with(scope) {
            
var panelCount = BorrowedEquip.instanceManager.instanceCount;
    if (panelCount == "1"){
        BorrowedEquip.instanceManager.instances[0].Remove.visible = false;
    }


        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_Remove_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_Remove_init1 = function (scope) {
    with(this) {
        with(scope) {
            
var panelCount = BorrowedEquip.instanceManager.instanceCount;
var i;
if ((StageIndicator.value !== null) && (StageIndicator.value !== "ToInitiator")) {
  for(i = 0; i<panelCount; i++){
    BorrowedEquip.instanceManager.instances[i].Remove.visible = false;
  }
}
else{
  BorrowedEquip.instanceManager.instances[i].Remove.visible = false;
}
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_Remove_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_Remove_click0 = function (scope) {
    with(this) {
        with(scope) {
            
var panelCount = BorrowedEquip.instanceManager.instanceCount;
BorrowedEquip.instanceManager.removeInstance(BorrowedEquip.instanceIndex);
if (panelCount == "2") {
    BorrowedEquip.instanceManager.instances[0].Remove.visible = false;
}
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_PropertyTagNum_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_PropertyTagNum_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            //if (StageIndicator.value === null) { 
//if ((StageIndicator.value === null && AssetPanel.visible === false) || (StageIndicator.value == "ToInitiator" && loading_flag.value == "true")) {
if ((StageIndicator.value === null && AssetPanel.visible === false) || (StageIndicator.value == "ToInitiator" && RequestorUserID.value === "1")) {
  var tagNo = PropertyTagNum.value;


$.ajax({
    type: 'GET',
    url: "/bin/propertyManagementServlet",
    data: {
        action: "ASSET_DETAILS",
        tagNumber: tagNo
    },
    dataType: 'json',
    success: function(response) {
        
        var desc = "";
       var model = "";
      

        if (response.length === 1) {
            model = response[0].MODEL || ""; 
            desc = response[0].DESCR || ""; 

          if (model !== "" && desc !== "") {
            Description.value = desc + " ," + model;
          }
          
           /* if (model === "" && desc === "") {
                Description.value = "";
            } else {
                Description.value = desc + " ," + model;
            }*/
        } else if (response.length === 0 || (Description.value === "")) {
            
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
       				var modelID = "";
      				var type = "";
                    

                    if (myresponse.length === 1) {
                        
                        for (var i = 0; i < myresponse.length; i++) {
                            var resultArray = myresponse[i].result;
                            for (var j = 0; j < resultArray.length; j++) {
                                var assetsArray = resultArray[j].assets;
                                for (var k = 0; k < assetsArray.length; k++) {
                                    serialNo = assetsArray[k].serial_number;
            						modelID = assetsArray[k].model_id;
                       				type = assetsArray[k].sys_class_name;
                                }
                            }
                        }
						 if ((serialNo !== "") && (modelID !== "") && (type !== "")) {
           					 Description.value = modelID+ "," +serialNo+ "," +type;
          					}
                      else {
                        Description.value = ""; 
                      }
                       
                      /* if((serialNo === "") && (modelID === "") && (type === "")){
           Description.value = " ";
         }else{   
         Description.value = modelID+ "," +serialNo+ "," +type;
        }*/

                        
                        //gifModal.style.display = "none";
                       // modal.style.display = "none";
                    } 
                },

                error: function(error) {
                    alert("Error occurred while fetching asset data: " + error.statusText);
                    //gifModal.style.display = "none"; 
                   // modal.style.display = "none"; 
                }
            });
        }else {
            Description.value = ""; 
        }
    },
    error: function(error) {
        alert("Error occurred while fetching asset details: " + error.statusText);
       //gifModal.style.display = "none";
    }
});
}
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_Add_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_Add_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if ((StageIndicator.value === null) || (StageIndicator.value == "ToInitiator")) {
  this.visible = true;
}
else{
  this.visible = false;
}
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_Add_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_Add_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if (BorrowedEquip.instanceManager.instances[0].Remove.visible === false) {
    BorrowedEquip.instanceManager.instances[0].Remove.visible = true;
}

BorrowedEquip.instanceManager.addInstance();


        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_ReturnedPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_ReturnedPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_ReturnedEquip_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_ReturnedEquip_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_RemoveReturn_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_RemoveReturn_init0 = function (scope) {
    with(this) {
        with(scope) {
            
var panelCount = ReturnedEquip.instanceManager.instanceCount;
    if (panelCount == "1") {
        ReturnedEquip.instanceManager.instances[0].RemoveReturn.visible = false;
    }
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_RemoveReturn_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_RemoveReturn_init1 = function (scope) {
    with(this) {
        with(scope) {
            
var panelCount = ReturnedEquip.instanceManager.instanceCount;
var i;
if ((StageIndicator.value !== null) && (StageIndicator.value !== "ToInitiator")) {
  for(i = 0; i<panelCount; i++){
    ReturnedEquip.instanceManager.instances[i].RemoveReturn.visible = false;
  }
}
/*else{
  ReturnedEquip.instanceManager.instances[i].RemoveReturn.visible = false;
}*/
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_RemoveReturn_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_RemoveReturn_click0 = function (scope) {
    with(this) {
        with(scope) {
            
var panelCount = ReturnedEquip.instanceManager.instanceCount;
ReturnedEquip.instanceManager.removeInstance(ReturnedEquip.instanceIndex);
if (panelCount == "2") {
    ReturnedEquip.instanceManager.instances[0].RemoveReturn.visible = false;
}
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_YesNoRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_YesNoRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if ((StageIndicator.value === null && AssetPanel.visible === false) || (StageIndicator.value == "ToInitiator" && RequestorUserID.value !== null)) {
if(YesNoRB.value === "1"){
  EquipBorrowedDate.visible = true;
  EquipBorrowedDate.mandatory = true;
}else{
  EquipBorrowedDate.value = ""; 
  PropertyTagNumRE.value = ""; 
  DescriptionRE.value = "";
  DateReturned.value = "";
}
}


        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_YesNoRB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_YesNoRB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            
if ((StageIndicator.value === null && AssetPanel.visible === false) || (StageIndicator.value == "ToInitiator" && RequestorUserID.value !== null)) {
if(YesNoRB.value === "2"){
  EquipBorrowedDate.visible = false;
  EquipBorrowedDate.mandatory = false;
}else{
  PropertyTagNumRE.value = ""; 
  DescriptionRE.value = "";
  DateReturned.value = "";
}
}


        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_EquipBorrowedDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_EquipBorrowedDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if(YesNoRB.value === "1"){
  this.visible = true;
}else{
this.visible = false;
}

//this.visible = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_PropertyTagNumRE_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_PropertyTagNumRE_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if ((StageIndicator.value === null && AssetPanel.visible === false) || (StageIndicator.value == "ToInitiator" && RequestorUserID.value === "1")) {
    if (YesNoRB.value == "1") {
        var equipmentBorrowedDate = EquipBorrowedDate.value;
        var propertyTN = PropertyTagNumRE.value;
        var userId = InitiatorUserID.value;
        var actionType = "OFF_CAMPUS_BORROWER_DETAILS";


        var gifModal = document.getElementById('gifModal');
        gifModal.style.display = "block";

        $.ajax({
            type: 'GET',
            url: "/bin/getOffCampusAgreementUse",
            data: {
                equipBorrowedDate: equipmentBorrowedDate,
                userID: userId,
                propertyTagNo: propertyTN,
                action: actionType
            },
            dataType: 'json',
            success: function(myresponse) {

                var modal = document.getElementById('myModal');
                var span = document.getElementsByClassName("close")[0];
                if (myresponse.length === 1) {
                    DescriptionRE.value = myresponse[0].DESCRIPTION;
                } else {
                    DescriptionRE.value = "";
                    showErrorModal("Alert!", "No matching records found!");
                    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].EquipmentInformation[0].ReturnedPanel[0].ReturnedEquip[0]");
                }
                gifModal.style.display = "none";
            }

        });
   // }
   
    } else if (YesNoRB.value == "2") {

        var tagNo = PropertyTagNumRE.value;


        $.ajax({
            type: 'GET',
            url: "/bin/propertyManagementServlet",
            data: {
                action: "ASSET_DETAILS",
                tagNumber: tagNo
            },
            dataType: 'json',
            success: function(response) {

                var desc = "";
                var model = "";


                if (response.length === 1) {
                    model = response[0].MODEL || "";
                    desc = response[0].DESCR || "";

                  if((model !== "") && (desc !== "")){
          				 DescriptionRE.value = desc + " ," + model;
                   }
                 
                } else if (response.length === 0 || (Description.value === "")) {

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
                            var modelID = "";
                            var type = "";


                            if (myresponse.length === 1) {

                                for (var i = 0; i < myresponse.length; i++) {
                                    var resultArray = myresponse[i].result;
                                    for (var j = 0; j < resultArray.length; j++) {
                                        var assetsArray = resultArray[j].assets;
                                        for (var k = 0; k < assetsArray.length; k++) {
                                            serialNo = assetsArray[k].serial_number;
                                            modelID = assetsArray[k].model_id;
                                            type = assetsArray[k].sys_class_name;
                                        }
                                    }
                                }
								if((serialNo !== "") && (modelID !== "") && (type !== "")){
          				 			DescriptionRE.value = modelID + "," + serialNo + "," + type;
                  				 }else {
                                DescriptionRE.value = "";
                            }



                                gifModal.style.display = "none";
                                modal.style.display = "none";
                            } /*else {
                                DescriptionRE.value = "";
                            }*/
                        },

                        error: function(error) {
                            alert("Error occurred while fetching asset data: " + error.statusText);
                            gifModal.style.display = "none";
                            // modal.style.display = "none"; 
                        }
                    });
                } else {
                    DescriptionRE.value = "";
                }
            },
            error: function(error) {
                alert("Error occurred while fetching asset details: " + error.statusText);
                gifModal.style.display = "none";
            }
        });
    }
}
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_DateReturned_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_DateReturned_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AddReturn_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AddReturn_init0 = function (scope) {
    with(this) {
        with(scope) {
            	

if ((StageIndicator.value === null) || (StageIndicator.value == "ToInitiator")) {
  this.visible = true;
}
else{
  this.visible = false;
}
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AddReturn_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AddReturn_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if (ReturnedEquip.instanceManager.instances[0].RemoveReturn.visible === false) {
    ReturnedEquip.instanceManager.instances[0].RemoveReturn.visible = true;
}

ReturnedEquip.instanceManager.addInstance();
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_EmployeeCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_EmployeeCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if ((StageIndicator.value == "ToInitiator") || (StageIndicator.value === null)) {
        if (InitiatorDate.value === null) {           
            InitiatorDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;               
                  InitiatorSign.value = userValue;
                  InitiatorName.value = userValue;
                  InitiatorDate.value = myresopnse[0].SERVER_DATE;

                  if(BorrowReturnRB.value == "1"){
                  BorrowerAckDate.value = InitiatorDate.value;
                  BorrowerAckName.value = userValue;
  				  BorrowerAckSign.value = userValue;
 				  BorrowerSign.value = userValue;
  				  BorrowerName.value = userValue;
 				  ReturnCB.value = "";
                  }else if(BorrowReturnRB.value == "2"){
                    ReturnDate.value = InitiatorDate.value;
                    ReturnedEquipName.value = userValue;
  					returnedEquipSign.value = userValue;
  					ReturnSign.value = userValue;
  					ReturnName.value = userValue;
                  }else{
                     BorrowerAckName.value = "";
  					 BorrowerAckSign.value = "";
  					 BorrowerSign.value = "";
  					 BorrowerName.value = "";
                     ReturnedEquipName.value = "";
   					 returnedEquipSign.value = "";
 					 ReturnSign.value = "";
 					 ReturnName.value = "";
                  }
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    InitiatorSign.value = "";
    InitiatorDate.value = "";
  InitiatorName.value = "";
}
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_InitiatorSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_InitiatorSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_InitiatorDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_InitiatorDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_RequestorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_RequestorCB_valueCommit0 = function (scope) {
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
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_RequestorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_RequestorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_RequestorSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_RequestorSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AdminCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AdminCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if (this.value == 1) {
    if (StageIndicator.value == "ToDeptHead") {
        if (AdminDate.value === null) {           
            AdminDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  AdminSign.value = userValue;
                   AdminName.value = userValue;
                  deptuseridcopy.value = myresopnse[0].EMPUSERID;
                  AdminDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    AdminSign.value = "";
    AdminDate.value = "";
  AdminName.value = "";
}
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AdminSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AdminSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AdminDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AdminDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AssetCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AssetCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (StageIndicator.value == "ToAsset") {
        if (AssetDate.value === null) {           
            AssetDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  AssetName.value = userValue;
                  AssetSign.value = userValue;
                  AssetDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    AssetName.value = "";
    AssetSign.value = "";
    AssetDate.value = "";
}
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AssetSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AssetSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AssetDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_AssetDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_HiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_HiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_ReturnedEquipName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_ReturnedEquipName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if(BorrowReturnRB.value == "2"){
  this.value = FirstName.value + " " + LastName.value;
  returnedEquipSign.value = FirstName.value + " " + LastName.value;
  ReturnSign.value = FirstName.value + " " + LastName.value;
  ReturnName.value = FirstName.value + " " + LastName.value;
}else{
  this.value = "";
  returnedEquipSign.value = "";
  ReturnSign.value = "";
  ReturnName.value = "";
}
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_deptuseridcopy_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_deptuseridcopy_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToDeptHead"){
    if(this.value !== DeptAdminUserID.value){
  AdminCB.value = null;
}
}
        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/off-campus-agreement-use-form/off-campus-agreement-use-form');
            //jsonData.append('fileName', FirstName.value + "_" + LastName.value + "(" + EmplId.value + ")" + "_" + Date.now());
            jsonData.append('fileName', FirstName.value + "_"+LastName.value);
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
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_saveguidedraft1629881233615_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_saveguidedraft1629881233615_click0 = function (scope) {
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
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_submit1600234699256_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_submit1600234699256_click0 = function (scope) {
    with(this) {
        with(scope) {
            

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
if(flag === 0 ){
if(Date_1.value > ReturnDate.value){
  showErrorModal("Alert!", "Please provide a valid return date");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].EmployeeInformationPanel[0].CWID[0]");
}else{
  submitAction();
}
}

function submitAction() {
if(StageIndicator.value === null){
  aftiaDescCWID.value = FirstName.value + " " + LastName.value  + " " + CWID.value;
  EmailSubject.value = "Test - Off Campus Agreement Use Form - (" + CWID.value + ")";

/*  InitiatorEmail.value = "yjayaram@fullerton.edu";
  DeptAdminEmail.value = "yjayaram@fullerton.edu";
  RequestorEmail.value = "yjayaram@fullerton.edu"; */
  
  InitiatorEmail.value = "soumya.ravindra@thoughtfocus.com";
  DeptAdminEmail.value = "soumya.ravindra@thoughtfocus.com";
  RequestorEmail.value = "soumya.ravindra@thoughtfocus.com";

  guideBridge.submit();
}
}



        }
	}
}
/**
 * @function off_campus_agreement_use_form_off_campus_agreement_use_form.generated_submit1600234699256_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
off_campus_agreement_use_form_off_campus_agreement_use_form.generated_submit1600234699256_click1 = function (scope) {
    with(this) {
        with(scope) {
            

if (StageIndicator.value === null || StageIndicator.value == "ToInitiator") {
    var rowData = []; 
    if(BorrowReturnRB.value === "1"){
    var rowCount = BorrowedEquip.instanceManager.instanceCount; 
    for (var i = 0; i < rowCount; i++) {        
        var rowObject = {};    
        rowObject.PropertyTagNum = BorrowedEquip.instanceManager.instances[i].PropertyTagNum.value;
        rowObject.ExpectedReturnDate = BorrowedEquip.instanceManager.instances[i].BorrowerDate.value;
        rowObject.Description = BorrowedEquip.instanceManager.instances[i].Description.value;
        
        rowData.push(rowObject);
      } 
    } 
    if(BorrowReturnRB.value === "2"){
      var rowCounttwo = ReturnedEquip.instanceManager.instanceCount; 
    for (var i = 0; i < rowCounttwo; i++) {
        var rowObject = {};
        rowObject.PropertyTagNum = ReturnedEquip.instanceManager.instances[i].PropertyTagNumRE.value;
        rowObject.DateReturned = ReturnedEquip.instanceManager.instances[i].DateReturned.value;
        rowObject.Description = ReturnedEquip.instanceManager.instances[i].DescriptionRE.value;
        rowData.push(rowObject);
      }
    }      

        
    

    AssetDetailsJSON.value = JSON.stringify(rowData); 

    console.log(rowData);
}


        }
	}
}
