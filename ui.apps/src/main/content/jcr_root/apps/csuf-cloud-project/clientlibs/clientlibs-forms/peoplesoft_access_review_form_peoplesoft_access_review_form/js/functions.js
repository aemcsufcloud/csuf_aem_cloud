/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  ManagerSignaturePanel.visible = false;
  SecurityAdminSignaturePanel.visible = false;
} else if(StageIndicator.value == "ToManager"){
  EmployeeInformationPanel.enabled = false;
  InitiatorSignaturePanel.enabled = false;
  SecurityAdminSignaturePanel.visible = false;
  
  
} else if(StageIndicator.value == "ToSecurityAdmin"){
  EmployeeInformationPanel.enabled = false;
  ListofRoles.enabled = false;
  InitiatorSignaturePanel.enabled = false;
  ManagerSignaturePanel.enabled = false;
}

if(StageIndicator.value !== null){
  var rowcountCS = CSRolesRow.instanceManager.instanceCount;
   for(var i=0; i<rowcountCS; i++){
     CSRolesRow.instanceManager.instances[i].Remove_Button.visible = false;
     CSRolesRow.instanceManager.instances[i].Type.enabled = false;
     CSRolesRow.instanceManager.instances[i].RoleName.enabled = false;
     CSRolesRow.instanceManager.instances[i].Description.enabled = false;
   }
    var rowcountCFS = CFSRolesRow.instanceManager.instanceCount;
   for(var j=0; j<rowcountCFS; j++){
     CFSRolesRow.instanceManager.instances[j].CFS_Remove_Button.visible = false;
     CFSRolesRow.instanceManager.instances[j].Type.enabled = false;
     CFSRolesRow.instanceManager.instances[j].RoleName.enabled = false;
     CFSRolesRow.instanceManager.instances[j].Description.enabled = false;
   } 
    var rowcountCHRS = CHRSRolesRow.instanceManager.instanceCount;
   for(var k=0; k<rowcountCHRS; k++){
     CHRSRolesRow.instanceManager.instances[k].CHRS_Remove_Button.visible = false;
     CHRSRolesRow.instanceManager.instances[k].Type.enabled = false;
     CHRSRolesRow.instanceManager.instances[k].RoleName.enabled = false;
     CHRSRolesRow.instanceManager.instances[k].Description.enabled = false;
   }
}
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getEvaluationFormData",
        data: {
            action: "EMP_DETAILS"
        },
        dataType: 'json',
        success: function(myresponse) {
            if (myresponse.length >= 1) {
                var userId = myresponse[0].EMP_USERID;
                $.ajax({
                    type: 'GET',
                    url: "/bin/checkTheUserIsAnAuthorizableMember",
                    data: {
                        userId: userId,
                        groupId: "Security-Admin-Reviewers"
                    },
                    dataType: 'json',
                    success: function(response) {
                        if (response && response.Result === true) {
                            workflow_initiator.value = userId;
                            InitiatorName.value = myresponse[0].EMP_NAME;
                            InitiatorFirstName.value = myresponse[0].FIRST_NAME;
                            InitiatorLastName.value = myresponse[0].LAST_NAME;
                            InitiatorUserId.value = userId;
                            //InitiatorEmailId.value = myresponse[0].EMAILID;
                            InitiatorEmailId.value = "yjayaram@fullerton.edu";
                        } else {
                          this.enabled = false;
                          submit1600234699256.visible = false;
                          generateDOR.visible = false;
                            showErrorModal("Alert!", "You are not authorized to submit this form.");
                        }
                    },
                    error: function(error) {
                        alert("error block=" + error);
                    }
                });
            } else {
                showErrorModal("Alert!", "No matching records found");
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
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.on("validationComplete", function(event, payload) {
    if (StageIndicator.value == "ToManager" && ManagerCB.value == 1) {
        if (MangerComments.value !== null && (Comments.value).lastIndexOf(MangerComments.value) == -1) {
            Comments.value = Comments.value + "\n\n" + "Manager's Comments :" + MangerComments.value;
        }
        if (MangerComments.value === null && (Comments.value).lastIndexOf("Manager's Comments :") == -1) {
            Comments.value = Comments.value + "\n\n" + "Manager's Comments :";
        }
    }
  
    if (StageIndicator.value == "ToSecurityAdmin" && SecurityAdminCB.value == 1) {
        if (SecurityAdminComments.value !== null && (Comments.value).lastIndexOf(SecurityAdminComments.value) == -1) {
            Comments.value = Comments.value + "\n\n" + "Security Admin's Comments :" + MangerComments.value;
        }
        if (SecurityAdminComments.value === null && (Comments.value).lastIndexOf("Security Admin's Comments :") == -1) {
            Comments.value = Comments.value + "\n\n" + "Security Admin's Comments :";
        }
    }
});
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_ApprovalStatus_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_ApprovalStatus_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.value = "In Progress";
}

this.enabled = false;
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_CaseID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_CaseID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_CWID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_CWID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null && SecurityAdminSignaturePanel.visible === false) {
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
                for (var i = 0; i < response.length; i++) {
                    if (response[i].TYPE == "CS") {
                        if(CSRolesRow.instanceManager.instances[CSRolesRow.instanceIndex].Type.value !== null && CSRolesRow.instanceManager.instances[CSRolesRow.instanceIndex].RoleName.value !== null && CSRolesRow.instanceManager.instances[CSRolesRow.instanceIndex].Description.value !== null){
                    CSRolesRow.instanceManager.addInstance(true);      
                        }
                        CSRolesRow.instanceManager.instances[CSRolesRow.instanceIndex].Type.value = response[i].TYPE;
                        CSRolesRow.instanceManager.instances[CSRolesRow.instanceIndex].RoleName.value = response[i].ROLENAME;
                        CSRolesRow.instanceManager.instances[CSRolesRow.instanceIndex].Description.value = response[i].DESCR;
                        CSRolesRow.instanceManager.instances[CSRolesRow.instanceIndex].Type.enabled = false;
                        CSRolesRow.instanceManager.instances[CSRolesRow.instanceIndex].RoleName.enabled = false;
                        CSRolesRow.instanceManager.instances[CSRolesRow.instanceIndex].Description.enabled = false;
                        CSRolesRow.instanceManager.instances[CSRolesRow.instanceIndex].Remove_Button.visible = false;
                      /*  if (i < (response.length - 1)) {
                            CSRolesRow.instanceManager.addInstance(true);
                        }*/
                    } else if (response[i].TYPE == "CFS") {
                      if(CFSRolesRow.instanceManager.instances[CFSRolesRow.instanceIndex].Type.value !== null && CFSRolesRow.instanceManager.instances[CFSRolesRow.instanceIndex].RoleName.value !== null && CFSRolesRow.instanceManager.instances[CFSRolesRow.instanceIndex].Description.value !== null){
                    CFSRolesRow.instanceManager.addInstance(true);      
                        }
                        CFSRolesRow.instanceManager.instances[CFSRolesRow.instanceIndex].Type.value = response[i].TYPE;
                        CFSRolesRow.instanceManager.instances[CFSRolesRow.instanceIndex].RoleName.value = response[i].ROLENAME;
                        CFSRolesRow.instanceManager.instances[CFSRolesRow.instanceIndex].Description.value = response[i].DESCR;
                        CFSRolesRow.instanceManager.instances[CFSRolesRow.instanceIndex].Type.enabled = false;
                        CFSRolesRow.instanceManager.instances[CFSRolesRow.instanceIndex].RoleName.enabled = false;
                        CFSRolesRow.instanceManager.instances[CFSRolesRow.instanceIndex].Description.enabled = false;
                        CFSRolesRow.instanceManager.instances[CFSRolesRow.instanceIndex].CFS_Remove_Button.visible = false;
                     /*   if (i < (response.length - 1)) {
                            CFSRolesRow.instanceManager.addInstance(true);
                        }*/
                    } else if (response[i].TYPE == "CHRS") {
                       if(CHRSRolesRow.instanceManager.instances[CHRSRolesRow.instanceIndex].Type.value !== null && CHRSRolesRow.instanceManager.instances[CHRSRolesRow.instanceIndex].RoleName.value !== null && CHRSRolesRow.instanceManager.instances[CHRSRolesRow.instanceIndex].Description.value !== null){
                    CHRSRolesRow.instanceManager.addInstance(true);      
                        }
                        CHRSRolesRow.instanceManager.instances[CHRSRolesRow.instanceIndex].Type.value = response[i].TYPE;
                        CHRSRolesRow.instanceManager.instances[CHRSRolesRow.instanceIndex].RoleName.value = response[i].ROLENAME;
                        CHRSRolesRow.instanceManager.instances[CHRSRolesRow.instanceIndex].Description.value = response[i].DESCR;
                        CHRSRolesRow.instanceManager.instances[CHRSRolesRow.instanceIndex].Type.enabled = false;
                        CHRSRolesRow.instanceManager.instances[CHRSRolesRow.instanceIndex].RoleName.enabled = false;
                        CHRSRolesRow.instanceManager.instances[CHRSRolesRow.instanceIndex].Description.enabled = false;
                        CHRSRolesRow.instanceManager.instances[CHRSRolesRow.instanceIndex].CHRS_Remove_Button.visible = false;
                    /*    if (i < (response.length - 1)) {
                            CHRSRolesRow.instanceManager.addInstance(true);
                        }*/
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
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_CampusEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_CampusEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_FirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_FirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_LastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_LastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_EmploymentType_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_EmploymentType_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var rbVal = this.value;
  if(rbVal == "1"){
    TempEndDate.value = ""; 
    TempEndDate.enabled = false; 
    TempEndDate.mandatory = false;
  }else{
    TempEndDate.enabled = true; 
    TempEndDate.mandatory = true;
  }
}

        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_TempEndDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_TempEndDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_EmploymentCatagory_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_EmploymentCatagory_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(this.value == 5){
  OthersValue.enabled = true;
}else{
  OthersValue.enabled = false;
  OthersValue.value = "";
}
}
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Remove_Button_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Remove_Button_click0 = function (scope) {
    with(this) {
        with(scope) {
            CSRolesRow.instanceManager.removeInstance(CSRolesRow.instanceIndex);
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Add_Button_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Add_Button_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value !== null){
  this.visible = false;
}
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Add_Button_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Add_Button_click0 = function (scope) {
    with(this) {
        with(scope) {
            CSRolesRow.instanceManager.addInstance();
scrollToBottom();
function scrollToBottom() {
        var scrollableDiv = document.getElementById('guideContainer-rootPanel-qualityquantityoralc-quality-table__');
        scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_CFS_Remove_Button_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_CFS_Remove_Button_click0 = function (scope) {
    with(this) {
        with(scope) {
            CFSRolesRow.instanceManager.removeInstance(CFSRolesRow.instanceIndex);
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Add_Button_init00
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Add_Button_init00 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value !== null){
  this.visible = false;
}
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Add_Button_click00
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Add_Button_click00 = function (scope) {
    with(this) {
        with(scope) {
            CFSRolesRow.instanceManager.addInstance();
scrollToBottom();
function scrollToBottom() {
        var scrollableDiv = document.getElementById('guideContainer-rootPanel-qualityquantityoralc-quality-table__');
        scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_CHRS_Remove_Button_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_CHRS_Remove_Button_click0 = function (scope) {
    with(this) {
        with(scope) {
            CHRSRolesRow.instanceManager.removeInstance(CHRSRolesRow.instanceIndex);
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Add_Button_init01
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Add_Button_init01 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value !== null){
  this.visible = false;
}
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Add_Button_click01
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Add_Button_click01 = function (scope) {
    with(this) {
        with(scope) {
            CHRSRolesRow.instanceManager.addInstance();
scrollToBottom();
function scrollToBottom() {
        var scrollableDiv = document.getElementById('guideContainer-rootPanel-qualityquantityoralc-quality-table__');
        scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Comments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_Comments_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = false;
}else{
  this.visible = true;
}
this.enabled = false;
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_InitiatorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_InitiatorCB_valueCommit0 = function (scope) {
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
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_InitiatorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_InitiatorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_InitiatorDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_InitiatorDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_ManagerCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_ManagerCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToManager") {
    if (this.value == 1) {
        var userValue;
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                ManagerSignature.value = userValue;
                ManagerDate.value = myresopnse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        ManagerSignature.enabled = false;
        ManagerDate.enabled = false;
    } else {
        ManagerSignature.value = "";
        ManagerDate.value = null;
    }
}
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_ManagerSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_ManagerSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_ManagerDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_ManagerDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_SecurityAdminCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_SecurityAdminCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToSecurityAdmin") {
    if (this.value == 1) {
        var userValue;
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                SecurityAdminSignature.value = userValue;
                SecurityAdminDate.value = myresopnse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        SecurityAdminSignature.enabled = false;
        SecurityAdminDate.enabled = false;
    } else {
        SecurityAdminSignature.value = "";
        SecurityAdminDate.value = null;
    }
}
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_SecurityAdminSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_SecurityAdminSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_SecurityAdminDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_SecurityAdminDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/peoplesoft-access-review-form/peoplesoft-access-review-form');
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
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_saveguidedraft1629881233615_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_saveguidedraft1629881233615_click0 = function (scope) {
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
 * @function peoplesoft_access_review_form_peoplesoft_access_review_form.generated_submit1600234699256_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
peoplesoft_access_review_form_peoplesoft_access_review_form.generated_submit1600234699256_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  aftiaDescCWID.value = FullName.value+" "+CWID.value;
  EmailSubject.value = "Test - PeopleSoft Access Review Form - "+CWID.value; 
}

InitiatorEmailId.value = "yjayaram@fullerton.edu";
ManagerEmailId.value = "yjayaram@fullerton.edu";

if(InitiatorComments.value !== null){
Comments.value = "Initiator Comments : "+ InitiatorComments.value;
}else{
  Comments.value = "Initiator Comments : ";
}

guideBridge.submit();
        }
	}
}
