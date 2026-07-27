/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            //alert('StageIndicator : ' + StageIndicator.value);
if(StageIndicator.value === null){
//  if(StageIndicator.value === null || StageIndicator.value === "ToInitiator"){
  ManagerSignaturePanel.visible = false;
  ASCASISignaturePanel.visible = false;
  CWID.enabled = false;
} else if(StageIndicator.value == "ToManager"){
  //alert('ASCASISignature : ' + ASCASISignature.value);
  EmployeeInformationPanel.enabled = false;
  InitiatorSignaturePanel.enabled = false;
    if(ASCASISignature.value === null){
      ASCASISignaturePanel.visible = false;
      ASCASISignaturePanel.enabled = false;
    }else{
      ASCASISignaturePanel.visible = true;
      ASCASISignaturePanel.enabled = false;
    }
} else if(StageIndicator.value == "ToASCASI"){
  EmployeeInformationPanel.enabled = false;
  InitiatorSignaturePanel.enabled = false;
  ManagerSignaturePanel.visible = false;
  ASCASISignaturePanel.visible = true;
}

        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_guideRootPanel_init1 = function (scope) {
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
                
				 			workflow_initiator.value = userId;
                            InitiatorName.value = myresponse[0].EMP_NAME;
                            InitiatorFirstName.value = myresponse[0].FIRST_NAME;
                            InitiatorLastName.value = myresponse[0].LAST_NAME;
                            InitiatorUserId.value = userId;
                            //InitiatorEmailId.value = myresponse[0].EMAILID;
                           // InitiatorEmailId.value = "anupama.dhar@thoughtfocus.com";
                            //InitiatorEmailId.value = "poornavivekraj.nagarajan@thoughtfocus.com";
             				 InitiatorEmailId.value = "yjayaram@fullerton.edu";
             
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
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_guideRootPanel_init2 = function (scope) {
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
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_ApprovalStatus_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_ApprovalStatus_init0 = function (scope) {
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
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_CaseID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_CaseID_init0 = function (scope) {
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
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_PersonLastName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_PersonLastName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var lastNameResult = [];
if ((StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
    if (this.value !== null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getEmpManagerDetails",
            data: {
                
                lName: this.value
            },
            dataType: 'json',
            success: function(managerResult) {
                debugger;
                if (managerResult.length !== 0) {
                   
                    for (var i = 0; i < managerResult.length; i++) {
                        var item = managerResult[i].FIRST_NAME + " " + managerResult[i].LAST_NAME;
                        PersonName.value = managerResult[i].FIRST_NAME + " " + managerResult[i].LAST_NAME;
                       //CWID.value = managerResult[i].CWID;
                        //FirstName.value = managerResult[i].FIRST_NAME;
                        //LastName.value = managerResult[i].LAST_NAME;
                       // CampusEmail.value = managerResult[i].EMAIL_ID;
                        // CampusEmail.value = "pushpa.kawadi@thoughtfocus.com";
                      
                      	
                        //ResponsibleManagerEmail.value = managerResult[i].EMAILID; 
                        //ResponsibleManagerEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                        // ResponsibleManagerEmail.value = "yjayaram@fullerton.edu";
                        //var uid = managerResult[i].USERID;
                        var uid = managerResult[i].EMAIL_ID;
                        var idItem = i + 1;
                       
                       lastNameResult.push(item + " - " + uid);
                    }
                    PersonName.value = "";
                    PersonName.items = lastNameResult;
                    
                } else {
                    showErrorModal("Alert!", "No matching names found");
                    //RMNameDD.items = [];
                    // RMNameDD.value = "";
                    //RMNameDD.value = null;
                    //ResponsibleManagerEmail.value = null;
                    PersonNamee.value = "";
                   // ResponsibleManagerUserId.value = "";
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_PersonName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_PersonName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var empEmailId = "";
var empUserId = "";

if (StageIndicator.value === null || StageIndicator.value === "ToInitiator") {
    var empFullName = this.value;
    const values = empFullName.split("-");
    CampusEmail.value = values[1];
   // CampusEmail.value = "anupama.dhar@thoughtfocus.com";
    //CampusEmail.value = "poornavivekraj.nagarajan@thoughtfocus.com";
    CampusEmail.value = "yjayaram@fullerton.edu";
    empEmailId = values[1];
    empUserId = empEmailId.substr(1, empEmailId.indexOf('@') - 1);
    //alert("empUserId=" + empUserId);
    empFullName = empFullName.substr(0, empFullName.indexOf(' - '));
    const fn = empFullName.split(" ");
    FirstName.value = fn[0];
    LastName.value = fn[1];

    $.ajax({
        type: 'GET',
        url: "/bin/getEmpManagerDetails",
        data: {
            fName: FirstName.value,
            lName: LastName.value
        },
        dataType: 'json',
        success: function(result) {
            if (result.length !== 0) {
                for (var i = 0; i < result.length; i++) {
                    CWID.value = result[i].CWID;
                }
            }
        }
    });
}
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_CWID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_CWID_valueCommit0 = function (scope) {
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
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_FirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_FirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_LastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_LastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_CampusEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_CampusEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_SearchMangerLN_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_SearchMangerLN_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;

var lastNameResult = [];
if ((StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
    if (this.value !== null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getEmpManagerDetails",
            data: {
               
                lName: this.value
            },
            dataType: 'json',
            success: function(managerResult) {
                debugger;
                if (managerResult.length !== 0) {
                   
                    for (var i = 0; i < managerResult.length; i++) {
                        var item = managerResult[i].FIRST_NAME + " " + managerResult[i].LAST_NAME;
                       // ManagerName.value = managerResult[i].FIRST_NAME + " " + managerResult[i].LAST_NAME;
                        SearchManagerName.value = managerResult[i].FIRST_NAME + " " + managerResult[i].LAST_NAME;
                        //ManagerFirstName.value = managerResult[i].FIRST_NAME;
                       // ManagerLastName.value = managerResult[i].LAST_NAME;
                      
                       // ManagerEmail.value = managerResult[i].EMAIL_ID;
                         //ManagerEmailId.value = "pushpa.kawadi@thoughtfocus.com";
                      	//ManagerUserId.value=managerResult[i].USER_ID;
                        //var uid = managerResult[i].USERID;
                        var uid = managerResult[i].EMAIL_ID;
                        var idItem = i + 1;
                       
                       lastNameResult.push(item + " - " + uid);
                    }
                    SearchManagerName.value = "";
                    SearchManagerName.items = lastNameResult;
                    
                } else {
                    showErrorModal("Alert!", "No matching names found");
                    //RMNameDD.items = [];
                    // RMNameDD.value = "";
                    //RMNameDD.value = null;
                    //ResponsibleManagerEmail.value = null;
                    SearchManagerName.value = "";
                   // ResponsibleManagerUserId.value = "";
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_SearchManagerName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_SearchManagerName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var mEmailId = "";
var managerUserId = "";

if (StageIndicator.value === null || StageIndicator.value === "ToInitiator") {
    var managerFullName = this.value;
    const values = managerFullName.split("-");
    ManagerEmailId.value = values[1];
    //ManagerEmailId.value = "anupama.dhar@thoughtfocus.com";
 	//ManagerEmailId.value = "poornavivekraj.nagarajan@thoughtfocus.com";
    ManagerEmailId.value = "yjayaram@fullerton.edu";
    mEmailId = values[1];
    var managerUserId = mEmailId.substr(1, mEmailId.indexOf('@') - 1);
  	ManagerUserId.value = managerUserId;
    managerFullName = managerFullName.substr(0, managerFullName.indexOf(' - '));
    ManagerName.value = managerFullName;
    const fn = managerFullName.split(" ");
    ManagerFirstName.value = fn[0];
    ManagerLastName.value = fn[1];
}
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_ManagerFirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_ManagerFirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_ManagerLastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_ManagerLastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_InitiatorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_InitiatorCB_valueCommit0 = function (scope) {
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
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_InitiatorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_InitiatorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_InitiatorDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_InitiatorDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_ASCASICB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_ASCASICB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToASCASI") {
    if (this.value == 1) {
        var userValue;
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                ASCASISignature.value = userValue;
                ASCASIDate.value = myresopnse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        ASCASISignature.enabled = false;
        ASCASIDate.enabled = false;
    } else {
        ASCASISignature.value = "";
        ASCASIDate.value = null;
    }
}
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_ASCASISignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_ASCASISignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_ASCASIDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_ASCASIDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_ManagerCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_ManagerCB_valueCommit0 = function (scope) {
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
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_ManagerSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_ManagerSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_ManagerDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_ManagerDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
    getPdf();
function getPdf() {
    console.log("in view pdf");
   debugger;
    window.guideBridge.getDataXML({
        success: function(result) {
           console.log("in view pdf="+result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/dotted-line-non-chrs/DottedLineNonCHRS');
            jsonData.append('fileName', 'Dotted Line Form');          
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
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_saveguidedraft1629881233615_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_saveguidedraft1629881233615_click0 = function (scope) {
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
 * @function dotted_line_non_chrs_DottedLineNonCHRS.generated_submit1600234699256_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
dotted_line_non_chrs_DottedLineNonCHRS.generated_submit1600234699256_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  aftiaDescCWID.value = FirstName.value + " " + LastName.value +" "+CWID.value;
  EmailSubject.value = "Test - Dotted Line Non-CHRS Form - "+CWID.value; 
}

 InitiatorEmailId.value = "yjayaram@fullerton.edu";
 ManagerEmailId.value = "yjayaram@fullerton.edu";
 
 //InitiatorEmailId.value = "anupama.dhar@thoughtfocus.com";
 //ManagerEmailId.value = "anupama.dhar@thoughtfocus.com";

 //InitiatorEmailId.value = "poornavivekraj.nagarajan@thoughtfocus.com";
 //ManagerEmailId.value = "poornavivekraj.nagarajan@thoughtfocus.com";
//ManagerUserId.value = "admin";

/*if(InitiatorComments.value !== null){
Comments.value = "Initiator Comments : "+ InitiatorComments.value;
}else{
  Comments.value = "Initiator Comments : ";
}*/

guideBridge.submit();
        }
	}
}
