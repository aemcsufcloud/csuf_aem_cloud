/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            //alert("StageIndicator : " + StageIndicator.value);
if(StageIndicator.value === null){
  InitiatorSignPanel.enabled=true;
  FOSignPanel.visible=false;
}

if(StageIndicator.value == "ToFacilitiesOfficer"){
  FOSignPanel.visible = true;
  InitiatorSignPanel.enabled=false;
  Name.enabled = false;
  Department.enabled = false;
  EmailAddress.enabled = false;
  ContactNumber.enabled = false;
  EventName.enabled = false;
  EventDate.enabled = false;
  //AgreementNumber.enabled = false;
  RequestorDetails.enabled = false;
  //TotalContractValue.enabled = false;
  //AmountWaived.enabled = false;
}

if(StageIndicator.value === "ToInitiator") {
  InitiatorSignPanel.enabled=true;
  FOSignPanel.enabled=false;
  ContactNumber.enabled = true;
  EventName.enabled = true;
  EventDate.enabled = true;
  AgreementNumber.enabled = true;
  RequestorDetails.enabled = true;
  TotalContractValue.enabled = true;
  AmountWaived.enabled = true;
}
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            //var gifModal = document.getElementById('gifModal');
//	gifModal.style.display = "block";

if (StageIndicator.value === null) {
  	//alert("1");
	$.ajax({
		type: 'GET',
		url: "/bin/getLoggedUserId",
		dataType: 'json',
		success: function(myresponse) {
          
			if (myresponse.Status == "Success") {
				var userValue = myresponse.userId;
				workflow_initiator.value = userValue;

             // alert("userValue : " + userValue);
				$.ajax({
					type: 'GET',
					url: "/bin/getEvaluationFormData",
					data: {
						action: "EMP_DETAILS"
					},
					dataType: 'json',
					success: function(myresopnse) {
                       	//					var modal = document.getElementById('myModal');
		//				var span = document.getElementsByClassName("close")[0];

						if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined) {
                           //alert("Department : " + myresopnse[0].DEPTNAME);
							Department.value = myresopnse[0].DEPTNAME;

							//InitiatorEmail.value = myresopnse[0].EMAILID;
                            InitiatorEmail.value = "yjayaram@fullerton.edu";
                            //InitiatorEmail.value = "anupama.dhar@thoughtfocus.com";
                        	//InitiatorEmail.value = "poornavivekraj.nagarajan@thoughtfocus.com";
                          
                          	InitiatorUserId.value = myresopnse[0].EMP_USERID;
                            InitiatorName.value = myresopnse[0].FIRST_NAME + " " +  myresopnse[0].LAST_NAME;
							Name.value = myresopnse[0].FIRST_NAME + " " +  myresopnse[0].LAST_NAME;
                            EmailAddress.value = InitiatorEmail.value;
                          FirstName.value = myresopnse[0].FIRST_NAME;
                          LastName.value = myresopnse[0].LAST_NAME;
                          CWID.value = myresopnse[0].EMPLID;

						
					}
                    }
				});
			}
		}
		
	});
}

        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
	
	$.ajax({
		type: 'GET',
		url: "/bin/getLoggedUserId",
		dataType: 'json',
		success: function(myresponse) {
         
			if (myresponse.Status == "Success") {
				var userValue = myresponse.userId;
				
				$.ajax({
					type: 'GET',
					url: "/bin/getFacultyTravelProposal",
					data: {
						action: "FTP_STAFF_DETAILS",
                      	userID: userValue
					},
					dataType: 'json',
					success: function(myresopnse) {
                      
                     // alert("Ph : " +  myresopnse[0].PHONE)	;
						if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined) {
							ContactNumber.value = myresopnse[0].PHONE;
                        }
                    }
                });
            }
        }
    });
}
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_CaseID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_CaseID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;

if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getCaseID",
        dataType: 'json',
        success: function(myresponse) {
            CaseID.value = myresponse.CASEID;
        },
    });
}
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_Name_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_Name_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_Department_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_Department_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_EmailAddress_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_EmailAddress_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_ContactNumber_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_ContactNumber_init0 = function (scope) {
    with(this) {
        with(scope) {
            	
if (StageIndicator.value === null) {
	
	$.ajax({
		type: 'GET',
		url: "/bin/getLoggedUserId",
		dataType: 'json',
		success: function(myresponse) {
			if (myresponse.Status == "Success") {
				var userValue = myresponse.userId;
				
				$.ajax({
					type: 'GET',
					url: "/bin/getFacultyTravelProposal",
					data: {
						action: "FTP_STAFF_DETAILS"
					},
					dataType: 'json',
					success: function(myresopnse) {

						var modal = document.getElementById('myModal');
						var span = document.getElementsByClassName("close")[0];

						if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined) {
							this.value = myresopnse[0].PHONE;
                        }
                    }
                });
            }
        }
    });
}
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_InitiatorSignCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_InitiatorSignCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            	
if (StageIndicator.value === null) {
    if (this.value == 1) {
        var userValue;
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                InitiatorSignature.value = userValue;
                InitiatorDate.value = myresopnse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        InitiatorSignature.enabled = false;
        InitiatorDate.enabled = false;
    } else {
        InitiatorSignature.value = "";
        InitiatorDate.value = null;
    }
}
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_InitiatorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_InitiatorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_InitiatorDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_InitiatorDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_FacultyCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_FacultyCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToFacilitiesOfficer") {
    if (this.value == 1) {
        var userValue;
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                FacilitiesOfficerSignature.value = userValue;
                FacilitiesOfficerSignDate.value = myresopnse.SERVER_DATE;
              
               //FacilitiesOfficerName.value = myresopnse[0].FIRST_NAME + " " + myresopnse[0].LAST_NAME;
               FacilitiesOfficerName.value = userValue;
              
               //FacilitiesOfficerEmail.value = myresopnse[0].EMAILID;
               //FacilitiesOfficerEmail.value = "poornavivekraj.nagarajan@thoughtfocus.com";
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        InitiatorSignature.enabled = false;
        InitiatorDate.enabled = false;
    } else {
        FacilitiesOfficerSignature.value = "";
        FacilitiesOfficerSignDate.value = null;
    }
}

        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_FacilitiesOfficerSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_FacilitiesOfficerSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_FacilitiesOfficerSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_FacilitiesOfficerSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_HiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_HiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_workflow_initiator_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_workflow_initiator_init0 = function (scope) {
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
      InitiatorUserId.value=myresopnse.userId;
    }
});
}
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_FirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_FirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_LastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_LastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_CWID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_CWID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null && SecurityAdminSignaturePanel.visible === false){
var cwidVal = this.value;
debugger;
$.ajax({
    type: 'GET',
    url: "/bin/getFinancialARFData",
    data: {
        cwid: cwidVal,
        action: "FS_EMP_DATA"
    },
    dataType: 'json',
    success: function(myresponse) {

        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];

        if (myresponse.length === 1) {
            CWID.value = cwidVal;
            var email = (myresponse[0].EMAIL).toLowerCase();
            if (email.lastIndexOf("exchange.") != -1) {
                email = email.replace("exchange.", "");
            }
            //CampusEmail.value = email;
            CampusEmail.value = "yjayaram@fullerton.edu";
            FirstName.value = myresponse[0].FIRST_NAME;
            LastName.value = myresponse[0].LAST_NAME;
            FullName.value = FirstName.value + " " + LastName.value;
            DeptName.value = myresponse[0].DEPTNAME;
            DeptID.value = myresponse[0].DEPTID;
            Title.value = myresponse[0].DESCR;
            CampusExt.value = myresponse[0].PHONE;
            Divison.value = myresponse[0].FUL_DIVISION_NAME;
            DivisionID.value = myresponse[0].FUL_DIVISION;
            //CampusLocation.value = myresponse[0].;
            EmployeeUserID.value = myresponse[0].USERID;
            //ManagerEmail.value = myresponse[0].MANAGER_EMAIL_ID;
            ManagerEmailId.value = "yjayaram@fullerton.edu";
            if (myresponse[0].MANAGER === undefined) {
                ManagerUserId.value = "admin";
                ManagerName.value = "Admin";
                ApprAdmin.value = "Admin";
            } else {
                var myArr = (myresponse[0].MANAGER).split("|");
                ManagerUserId.value = myArr[1];
                ManagerName.value = myArr[0];
                ApprAdmin.value = myArr[0];
            }
            var empType = myresponse[0].EMP_TYPE;
            if (empType.toLowerCase() == "permanent") {
                EmploymentType.value = "1";
            } else {
                EmploymentType.value = "2";
            }
            if (myresponse[0].EXPECTED_END_DATE.trim() !== "N/A") {
                var dateVal = myresponse[0].EXPECTED_END_DATE;
                var d = (dateVal.substring(6, dateVal.length) + "-" + dateVal.substring(0, 2) + "-" + dateVal.substring(3, 5));
                TempEndDate.value = d;
            }
            var empPosition = myresponse[0].POSITION;
            if (empPosition.toLowerCase() == "faculty") {
                EmploymentCatagory.value = "1";
            } else if (empPosition.toLowerCase() == "staff") {
                EmploymentCatagory.value = "2";
            } else if (empPosition.toLowerCase() == "management") {
                EmploymentCatagory.value = "3";
            } else if (empPosition.toLowerCase() == "student") {
                EmploymentCatagory.value = "4";
            } else if (empPosition.toLowerCase() == "other") {
                EmploymentCatagory.value = "5";
            }
            getCaseId();
            getRolesData(cwidVal);
            gifModal.style.display = "none";
            modal.style.display = "none";

        } else if (myresponse.length > 1) {
            gifModal.style.display = "none";
            modal.style.display = "block";

            var col = [];
            col.push("EMPLID");
            col.push("LAST_NAME");
            col.push("FIRST_NAME");
            col.push("DEPTID");
            col.push("DEPTNAME");
            col.push("DESCR");

            var table = document.createElement("table");
            table.id = "tb";
            var tr = table.insertRow(-1);
            var headings = ["", "Emp ID", "Last Name", "First Name", "Department Id", "Department Name", "Description"];
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

            okButton.value = "OK";
            okButton.onclick = function(event) {

                var n;
                var rButtonStatus;

                var rButtons = document.getElementsByClassName("rb");
                for (n = 0; n < rButtons.length; n++) {
                    if (rButtons[n].checked === false) {
                        rButtonStatus = false;
                    } else {
                        CWID.value = cwidVal;
                        var email = (myresponse[n].EMAIL).toLowerCase();
                        if (email.lastIndexOf("exchange.") != -1) {
                            email = email.replace("exchange.", "");
                        }
                        //CampusEmail.value = email;
                        CampusEmail.value = "yjayaram@fullerton.edu";
                        FirstName.value = myresponse[n].FIRST_NAME;
                        LastName.value = myresponse[n].LAST_NAME;
                        FullName.value = FirstName.value + " " + LastName.value;
                        DeptName.value = myresponse[n].DEPTNAME;
                        DeptID.value = myresponse[n].DEPTID;
                        Title.value = myresponse[n].DESCR;
                        CampusExt.value = myresponse[n].PHONE;
                        Divison.value = myresponse[n].FUL_DIVISION_NAME;
                        DivisionID.value = myresponse[n].FUL_DIVISION;
                        //CampusLocation.value = myresponse[n].;
                        EmployeeUserID.value = myresponse[n].USERID;
                        //ManagerEmail.value = myresponse[n].MANAGER_EMAIL_ID;
                        ManagerEmailId.value = "yjayaram@fullerton.edu";
                        if (myresponse[n].MANAGER === undefined) {
                            ManagerUserId.value = "admin";
                            ManagerName.value = "Admin";
                            ApprAdmin.value = "Admin";
                        } else {
                            var myArr = (myresponse[n].MANAGER).split("|");
                            ManagerUserId.value = myArr[1];
                            ManagerName.value = myArr[0];
                            ApprAdmin.value = myArr[0];
                        }
                        var empType = myresponse[n].EMP_TYPE;
                        if (empType.toLowerCase() == "permanent") {
                            EmploymentType.value = "1";
                        } else {
                            EmploymentType.value = "2";
                        }
                        if (myresponse[0].EXPECTED_END_DATE.trim() !== "N/A") {
                            var dateVal = myresponse[n].EXPECTED_END_DATE;
                            var d = (dateVal.substring(6, dateVal.length) + "-" + dateVal.substring(0, 2) + "-" + dateVal.substring(3, 5));
                            TempEndDate.value = d;
                        }
                        var empPosition = myresponse[n].POSITION;
                        if (empPosition.toLowerCase() == "faculty") {
                            EmploymentCatagory.value = "1";
                        } else if (empPosition.toLowerCase() == "staff") {
                            EmploymentCatagory.value = "2";
                        } else if (empPosition.toLowerCase() == "management") {
                            EmploymentCatagory.value = "3";
                        } else if (empPosition.toLowerCase() == "student") {
                            EmploymentCatagory.value = "4";
                        } else if (empPosition.toLowerCase() == "other") {
                            EmploymentCatagory.value = "5";
                        }
                        getCaseId();
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
        } else {
            gifModal.style.display = "none";
            showErrorModal("Alert!", "No matching records found");
            CampusEmail.value = "";
            FirstName.value = "";
            LastName.value = "";
            DeptID.value = "";
            DeptName.value = "";
            Divison.value = "";
            DivisionID.value = "";
            Title.value = "";
            CampusExt.value = "";
            ApprAdmin.value = "";
            ManagerUserID.value = "";
            ManagerName.value = "";
            ApprAdmin.value = "";
            EmployeeUserID.value = "";
            EmploymentType.value = "";
            TempEndDate.value = "";
            EmploymentCatagory.value = "";
            EmployeeEmail.value = "";
            ManagerEmail.value = "";

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
                showErrorModal("Alert!", "Please select the department");

                modal.style.display = "block";
            } else {
                showErrorModal("Alert!", "Please select the department");

                modal.style.display = "block";
            }

        };

    }
});
}

function getCaseId() {
    this.enabled = false;
    $.ajax({
        type: 'GET',
        url: "/bin/getCaseID",
        dataType: 'json',
        success: function(myresponse) {
            CaseID.value = myresponse.CASEID;
        }
    });
}

function getRolesData(cwidVal) {
    $.ajax({
        type: 'GET',
        url: "/bin/getPeoplesoftARFData",
        data: {
            action: 'ROLE_LOOKUP',
            cwid: cwidVal
        },
        dataType: 'json',
        success: function(response) {
          debugger;
            if (response.length >= 1) {
               RolesCount.value = response.length;
               RolesJson.value = JSON.stringify(response);
              for(var i=0; i<response.length; i++){
                var rowcount = Row2.instanceManager.instanceCount;
                
                Row2.instanceManager.instances[Row2.instanceIndex].Type.value = response[i].TYPE;
                 Row2.instanceManager.instances[Row2.instanceIndex].RoleName.value = response[i].ROLENAME;
                 Row2.instanceManager.instances[Row2.instanceIndex].Description.value = response[i].DESCR;
                Row2.instanceManager.instances[Row2.instanceIndex].Type.enabled = false;
                Row2.instanceManager.instances[Row2.instanceIndex].RoleName.enabled = false;
                Row2.instanceManager.instances[Row2.instanceIndex].Description.enabled = false;
                Row2.instanceManager.instances[Row2.instanceIndex].Remove_Button.visible = false;
                if (i < (response.length - 1)) {
            Row2.instanceManager.addInstance(true);
        }
              }
          
            } else {
                showErrorModal("Alert!", "No matching roles found");
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
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/vendor-fee-waiver-reduction/vendor-fee-waiver-reduction-form');
            jsonData.append('fileName', "Vendor Fee Waiver Reduction");          
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
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_saveguidedraft1629881233615_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_saveguidedraft1629881233615_click0 = function (scope) {
    with(this) {
        with(scope) {
            //if(EmplId.value !== null){
 aftiaDescCWID.value = FirstName.value + " " + LastName.value + " "+ CWID.value ;
//}
handleDraftSave(this);
        }
	}
}
/**
 * @function vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_submit1600234699256_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
vendor_fee_waiver_reduction_vendor_fee_waiver_reduction_form.generated_submit1600234699256_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
 aftiaDescCWID.value = FirstName.value + " " + LastName.value + " "+ CWID.value ;
 EmailSubject.value = "Test - Vendor Fee Waiver / Reduction Form - "+ CWID.value;
}

InitiatorEmail.value = "yjayaram@fullerton.edu";
FacilitiesOfficerEmail.value = "yjayaram@fullerton.edu";

//InitiatorEmail.value = "anupama.dhar@thoughtfocus.com";
//FacilitiesOfficerEmail.value = "anupama.dhar@thoughtfocus.com";

var flag = 0;
//if(flag===0){
//  if(ChangeToParticipationCB.value == ChangeFromParticipationCB.value && ChangeFromParticipationCB.value !== null && ChangeToParticipationCB.value !== null){
//    showErrorModal("Alert!","Please select the valid semester");
//    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].ParticipationDetails[0].panel_17549383281632111477085[0]");
//    flag = 1;
//  }else{
 //   flag = 0;
 // }
//}
//if(flag === 0 ){
guideBridge.submit();
//}

        }
	}
}
