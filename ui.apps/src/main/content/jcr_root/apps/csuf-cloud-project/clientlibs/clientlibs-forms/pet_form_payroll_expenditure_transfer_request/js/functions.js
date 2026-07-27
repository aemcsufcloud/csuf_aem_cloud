/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  PayrollChargesPanel.visible=true;
  PayrollChargesPanel.enable=true;
  SubmitSectionPanel.visible=true;
  SubmitSectionPanel.enabled=true;
  FromDeptApprovalPanel.visible=false;
  ToDeptApprovalPanel.visible=false;
  ProcessPanel.visible=false;
  FISCALYR.enabled=false;
  table.enabled=false;
  UplaodFile.enabled=false;
  UploadButton.enabled=false;
   if(FISCALYR.value === null){
      FISCALYR.value = "2025";
    }
}
if(StageIndicator.value === "ToInitiator"){
  PayrollChargesPanel.visible=true;
  PayrollChargesPanel.enable=true;
  SubmitSectionPanel.visible=true;
  SubmitSectionPanel.enabled=true;
  FISCALYR.enabled=false;
  FromDeptApprovalPanel.visible=false;
  if(ToDeptDeclaration.value !== null){
     ToDeptApprovalPanel.visible=true;
     ToDeptApprovalPanel.enabled=false;
  }else{  
    ToDeptApprovalPanel.visible=false;
        }
  if(BudgetOperationDeclaration.value !== null){
    ProcessPanel.visible=true;
    ProcessPanel.enabled=false;
  }else{
    ProcessPanel.visible=false;
  }
  
 /* for(var i=0;i<Row1.instanceManager.instanceCount;i++){
  if( Row1.instanceManager.instances[i].Emp_ID.value !== null){
      Row1.instanceManager.instances[i].enabled=false;
  }else{
     Row1.instanceManager.instances[i].enabled=true;
  }
  }*/
  
}
debugger;
if(StageIndicator.value == "FromDepartment"){
  PayrollChargesPanel.visible=true;
  PayrollChargesPanel.enabled=false;
  SubmitSectionPanel.visible=true;
  SubmitSectionPanel.enabled=false;
  FromDeptApprovalPanel.visible=true;
  FromDeptApprovalPanel.enabled=true;
  ToDeptApprovalPanel.visible=false;
  ProcessPanel.visible=false;
}

if(StageIndicator.value == "ToApprover"){
   PayrollChargesPanel.visible=true;
  //PayrollChargesPanel.enabled=false;
  table.enabled = false;
  ToDeptApproval.enabled = false;
  SubmitSectionPanel.visible=true;
  SubmitSectionPanel.enabled=false;
  FromDeptApprovalPanel.visible=false;
  FromDeptApprovalPanel.enabled=false;
   ToDeptApprovalPanel.visible=true;
  ToDeptApprovalPanel.enabled=true;
  //ProcessPanel.visible=false;
  FISCALYR.enabled=false;
   if(BudgetOperationDeclaration.value !== null){
    ProcessPanel.visible=true;
    ProcessPanel.enabled=false;
  }else{
    ProcessPanel.visible=false;
  }
  var count = table.Row1.instanceManager.instanceCount;
  table.Row1.instanceManager.instances[table.Row1.instanceManager.instanceCount - 1].blankbox.visible  = false;
         for (k = 0; k < count-1; k++) {
         table.Row1.instanceManager.instances[k].blankbox.visible  = false;
         }
 
}


if(StageIndicator.value == "ToBudgetOffice"){
   PayrollChargesPanel.visible=true;
  PayrollChargesPanel.enabled=true;
  SubmitSectionPanel.visible=true;
  SubmitSectionPanel.enabled=false;
  FromDeptApprovalPanel.visible=false;
  FromDeptApprovalPanel.enabled=false;
   ToDeptApprovalPanel.visible=true;
  ToDeptApprovalPanel.enabled=false;
  ProcessPanel.visible=true;
  ProcessPanel.enabled=true;
  FISCALYR.enabled=false;
}

  

        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_guideRootPanel_init1 = function (scope) {
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
            if (myresponse.Status == "Success") {
                var userValue = myresponse.userId;
                workflow_initiator.value = userValue;


                $.ajax({
                    type: 'GET',
                    url: "/bin/getSubstituteFacultyData",
                    data: {
                        action: "SUB_FACULTY_USER_DATA",
                        userID: userValue
                    },
                    dataType: 'json',
                    success: function(myresopnse) {

                        var modal = document.getElementById('myModal');
                        var span = document.getElementsByClassName("close")[0];

                        if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined) {
                            EmplId.value = myresopnse[0].EMPLID;
                            ReportingUnit.value = myresopnse[0].CSU_UNIT;
                            CMSPosNo.value = myresopnse[0].POSITION_NBR;
                            FirstName.value = myresopnse[0].FIRST_NAME;
                            LastName.value = myresopnse[0].LAST_NAME;
                            DeptId.value = myresopnse[0].DEPTID;
                            FacultyEmail.value = myresopnse[0].EMAILID;
                            FacultyUserId.value = userValue;
                            FacultyName.value = FirstName.value + " " + LastName.value;
                            EmpUnionCD.value = myresopnse[0].UNION_CD;
                            getManager(EmplId.value,DeptId.value,EmpUnionCD.value);
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
                            var headings = ["", "Emp ID", "Last Name", "First Name", "Department Id", "Department Name"];
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
                                        EmplId.value = myresopnse[n].EMPLID;
                                        ReportingUnit.value = myresopnse[n].CSU_UNIT;
                                        CMSPosNo.value = myresopnse[n].POSITION_NBR;
                                        FirstName.value = myresopnse[n].FIRST_NAME;
                                        LastName.value = myresopnse[n].LAST_NAME;
                                        DeptId.value = myresopnse[n].DEPTID;
                                        FacultyEmail.value = myresopnse[n].EMAILID;
                                        FacultyUserId.value = userValue;
                                        FacultyName.value = FirstName.value + " " + LastName.value;
                                        EmpUnionCD.value = myresopnse[n].UNION_CD;
										getManager(EmplId.value,DeptId.value,EmpUnionCD.value);

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
function getManager(empId,deptId,union_cd){
		
        $.ajax({
            type: 'GET',
            url: "/bin/getHourlyINTManager",
            data: {
                empId: empId,
              	union_cd : union_cd,
                deptId: deptId
            },
            dataType: 'json',
            success: function(myresponse) {

                var modal = document.getElementById('myModal');
                var span = document.getElementsByClassName("close")[0];

                if (myresponse.length === 1) {                                   
                   DeptCooUserId.value = myresponse[0].MANAGER_USERID;
        		   DeptCooEmail.value = myresponse[0].MANAGER_EMAIL_ID;
        		   DeptCooName.value = myresponse[0].SupervisorName;
                } 
                
            }
        });
    
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
$.ajax({
type: 'GET',
url:"/bin/getEvaluationFormData",
data: {action: "EMP_DETAILS"},
dataType: 'json',
success: function(myresopnse) {
var userValue = myresopnse[0].EMP_NAME;

InitiatorUserID.value = myresopnse[0].EMPUSERID;
InitiatorEmail.value = myresopnse[0].EMAILID;
  InitiatorEmail.value = "yjayaram@fullerton.edu";
InitiatorName.value = userValue;
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
 * @function pet_form_payroll_expenditure_transfer_request.generated_guideRootPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_guideRootPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            flag.value="True";
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_guideRootPanel_init4
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_guideRootPanel_init4 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.on("validationComplete", function(event, payload) {
  if(StageIndicator.value == "ToBudgetOffice"){
    BudgetInputScreenFlag.value = "TRIGGERSTOP";
  }
  if(StageIndicator.value == "ToInitiator"){
    BudgetInputScreenFlag.value = "";
    FinalRowCount.value = table.Row1.instanceManager.instanceCount;
  }
  
});
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Case_ID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Case_ID_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getCaseID",
        dataType: 'json',
        success: function(myresponse) {
            Case_ID.value = myresponse.CASEID;
        },
    });
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Case_ID_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Case_ID_init1 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_FISCALYR_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_FISCALYR_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_FISCALYR_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_FISCALYR_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator"){
  if(this.value !== null){
    table.enabled = true;
    UplaodFile.enabled = true;
    UploadButton.enabled = true;
  }else{
    table.enabled = false;
    UplaodFile.enabled = false;
    UploadButton.enabled = false;
  }
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Division_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Division_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var divisionResult = [];
    $.ajax({
        type: 'GET',
        url: "/bin/petServlet",
        data: {
            action: "PET_DIVISON_DATA",
        },
        dataType: 'json',
        success: function(myresponse) {
            if (myresponse.length >= 1) {
                DivisionDataArray.value = JSON.stringify(myresponse);
                for (var i = 0; i < myresponse.length; i++) {
                    var divisionName = myresponse[i].DIVISIONNAME;
                    var division = myresponse[i].DIVISION;
                    var combo = division + " - " + divisionName;
                    divisionResult.push(combo);
                }
                Division.items = divisionResult;
            }
        },
    });
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Division_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Division_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null  || StageIndicator.value == "ToInitiator") {
    var divisionResult = [];
    $.ajax({
        type: 'GET',
        url: "/bin/petServlet",
        data: {
            action: "PET_DIVISON_DATA",
        },
        dataType: 'json',
        success: function(myresponse) {
            if (myresponse.length >= 1) {
                for (var i = 0; i < myresponse.length; i++) {
                    var divisionName = myresponse[i].DIVISON_NAME;
                    divisionResult.push(divisionName);
                }
                Division.items = divisionResult;
            }
        },
    });
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Division_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Division_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null || StageIndicator.value == "ToInitiator") {
    if (this.value !== null) {
        var division = this.value;
        division = division.slice(0, 5);
        var divisionDataArray = JSON.parse(DivisionDataArray.value);
        for (var i = 0; i < divisionDataArray.length; i++) {
            if (division == divisionDataArray[i].DIVISION) {
                // ApproverEmail_ToDept.value = divisionDataArray[i].EMAIL;
                ApproverUserID_ToDept.value = divisionDataArray[i].USERID;
                ToDeptApproval.value = divisionDataArray[i].FIRSTNAME + " " + divisionDataArray[i].LASTNAME;
                ApproverEmail_ToDept.value = "swathi.kumari@thoughtfocus.com";
            }
        }
    }
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_UplaodFile_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_UplaodFile_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null || StageIndicator.value == "ToInitiator") {
  this.visible = true;
}else{
    this.visible = false;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_UploadButton_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_UploadButton_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null || StageIndicator.value == "ToInitiator") {
  this.visible = true;
}else{
    this.visible = false;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_UploadButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_UploadButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            UploadFlag.value = "true";
PercentageFlag.value ="false";
var fileUpload = document.getElementById("fileUpload");debugger;
LoadingMessageTextTable.visible = true;
if(fileUpload.files[0] !== undefined){
  var extension = fileUpload.files[0].name.split('.').pop();
if(extension == "xlsx" || extension == "xls"){
debugger;
var reader = new FileReader();
if (typeof(FileReader) != "undefined") {
    var reader = new FileReader();

    //For Browsers other than IE.
    if (reader.readAsBinaryString) {
        reader.onload = function(e) {
            //console.log(e.target.result);
            ProcessExcel(e.target.result);
          UploadFlag.value = "false";
           PercentageFlag.value ="True";
          ValidateFlag.value = false;
        };
        reader.readAsBinaryString(fileUpload.files[0]);
    }
}}else{
  LoadingMessageTextTable.visible = false;
  showErrorModal("Alert!","Please select the valid file");
}}else{
  LoadingMessageTextTable.visible = false;
  showErrorModal("Alert!","Please select the file");
}

function ProcessExcel(data) {
    debugger;
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
   var returnedValue = validateExcelRows(excelRows);
  if(returnedValue === true){
    ParseExcelRows(excelRows);
  }
}

function ParseExcelRows(myresponse) {
    debugger;
    var count = Row1.instanceManager.instanceCount;

    if (flag.value === "True") {
        var gifModal = document.getElementById('gifModal');
        gifModal.style.display = "block";
        debugger;

        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];

        debugger;
        if (myresponse.length > 0) {
          var rowcountRemoveAll1 = Row1.instanceManager.instanceCount;
          for (k = 0; k < rowcountRemoveAll1; k++) {
        Row1.instanceManager.removeInstance(Row1.instanceIndex);
         }
        Row1.instanceManager.removeInstance((Row1.instanceManager.instanceCount) - 1);
            for (var i = 0; i < myresponse.length; i++) {
                     if (table.Row1.instanceManager.instances[table.Row1.instanceManager.instanceCount - 1].Credit_Dept.value !== null) {
                    table.Row1.instanceManager.addInstance(true);
                }
                                
                PercentageFlag.value ="false";
                table.Row1.instanceManager.instances[i].Emp_ID.value = myresponse[i].CHRS_ID;
                table.Row1.instanceManager.instances[i].Credit_Dept.value = myresponse[i].Credit_Dept;
                table.Row1.instanceManager.instances[i].Credit_Funds.value = myresponse[i].Credit_Fund;
                table.Row1.instanceManager.instances[i].Credit_Class.value = myresponse[i].Credit_Class;
                table.Row1.instanceManager.instances[i].Credit_Program.value = myresponse[i].Credit_Program;
                table.Row1.instanceManager.instances[i].Credit_Account.value = myresponse[i].Credit_Account;
                //table.Row1.instanceManager.instances[i].Credit_Project.value = myresponse[i].Credit_Project;
                table.Row1.instanceManager.instances[i].Emp_Name.value = myresponse[i].Employee_Name;
                table.Row1.instanceManager.instances[i].ChargePeriod.value = myresponse[i].Charge_Period;
                table.Row1.instanceManager.instances[i].Emp_Record.value = myresponse[i].Empl_Record;
                table.Row1.instanceManager.instances[i].PaycheckNo.value = myresponse[i].Check;
                table.Row1.instanceManager.instances[i].PositionNo.value = myresponse[i].Position_Number;
                table.Row1.instanceManager.instances[i].HRDeptID.value = myresponse[i].HR_Dept_ID;
              
              DBFlag.value = Row1.instanceManager.instanceCount;
              if(myresponse[i].Change !== null){
                var change = myresponse[i].Change;
                if(change == "Y"){
                table.Row1.instanceManager.instances[i].PermanentFundChange.value = 0;
                }
                 if(change == "N"){
                table.Row1.instanceManager.instances[i].PermanentFundChange.value = 1;
                }
              }
              
               if( myresponse[i].Total_Amount !== null){
                var amt = (myresponse[i].Total_Amount).replaceAll(",","").trim();
                table.Row1.instanceManager.instances[i].TotalAmtChanged.value = amt;
               }
                table.Row1.instanceManager.instances[i].Debit_Dept.value = myresponse[i].Debit_Dept;
                table.Row1.instanceManager.instances[i].Debit_Funds.value = myresponse[i].Debit_Fund;
                table.Row1.instanceManager.instances[i].Debit_Account.value = myresponse[i].Debit_Account;
                table.Row1.instanceManager.instances[i].Debit_Class.value = myresponse[i].Debit_Class;
                //table.Row1.instanceManager.instances[i].Debit_Project.value = myresponse[i].Debit_Project;
                table.Row1.instanceManager.instances[i].Debit_Program.value = myresponse[i].Debit_Program;
                table.Row1.instanceManager.instances[i].TransferAmt_Benefits.value = myresponse[i].Transfer_Amount_Benefits;
              if( myresponse[i].Transfer_Percent !== null){
                var perc = (myresponse[i].Transfer_Percent).replaceAll("%","");
                table.Row1.instanceManager.instances[i].TransferPercentage.value = perc;
              }
               if( myresponse[i].Transfer_Amount !== null){
                 var trans = (myresponse[i].Transfer_Amount).replaceAll(",","").trim();
                table.Row1.instanceManager.instances[i].TransferAmt.value = trans;
               }
              populateChargePeriod(i);

                gifModal.style.display = "none";
                LoadingMessageTextTable.visible = false;
            }

        } else {
            showErrorModal("Alert!", "No matching records found");
          LoadingMessageTextTable.visible = false;
        }
    }

}
function populateChargePeriod(k){
debugger;
 var empid = table.Row1.instanceManager.instances[k].Emp_ID.value;
  if(empid!== null){

 
$.ajax({
type: 'GET',
url: "/bin/petServlet",
data: {
empid: empid,
action:"PET_CHARGE_DATA"
},
dataType: 'json',
success: function(myresponse) {

debugger;

if (myresponse.length !== 0) {
// var jobCodeSelect = document.querySelector(".DeptRoleSelect select");
var empidArray = [];
for (var i = 0; i < myresponse.length; i++) {
var item = myresponse[i].CSU_CHARGE_PD;
empidArray.push(item);
}
table.Row1.instanceManager.instances[k].ChargePeriod.items = (empidArray);
}
}
});
  }
}

function validateExcelRows(response){
  debugger;
  var totalCount = 0; 
    var employeeIds;
  var chargePeriods;
  var checkNumbers;
  var employeeIdsArr = [];
  var chargePeriodsArr = [];
  var checkNumbersArr = [];
 
  var realentries = [];
  var modal = document.getElementById('gridErrorModal');
  if (response.length > 0) {     
    debugger;
            for (var y = 0; y < response.length; y++) {
              var id = response[y].CHRS_ID;
              var chargePeriod = response[y].Charge_Period;
              var checkNumber = response[y].Check;
              var percentage = (response[y].Transfer_Percent).replaceAll("%", "");
 
             
              var percentageCount = 0;
              var entries = [];
              for (var z = 0; z < response.length; z++){
                if(id == response[z].CHRS_ID && chargePeriod == response[z].Charge_Period && checkNumber==response[z].Check){
             percentageCount = percentageCount+parseFloat((response[z].Transfer_Percent).replaceAll("%",""));

                  if(percentageCount == 100.00){
                    totalCount=totalCount+parseInt(1);
                  }else{
                    var entry = {
                      "id":id,
                      "chargePeriod":chargePeriod,
                      "checkNumber":checkNumber,
                      "percentage":percentage
                    };
                    entries.push(entry);
                   
                     
                  }
                }
                if(z == response.length-1 && percentageCount != 100.00){
                        for(var u=0; u<entries.length; u++){
                          realentries.push(entries[u]);
                        }
                        jsonObject = realentries.map(JSON.stringify);
                        uniqueSet = new Set(jsonObject);
                        uniqueArray = Array.from(uniqueSet).map(JSON.parse);
                      }
                }
            }
   }
        if(totalCount == response.length){
                return true;
              }else{
               // employeeIds = removeDuplicates(employeeIdsArr); 
               // chargePeriods = removeDuplicates(chargePeriodsArr); 
               // checkNumbers = removeDuplicates(checkNumbersArr);
                LoadingMessageTextTable.visible = false;
gifModal.style.display = "none";
modal.style.display = "block";
var col = [];
col.push("id");
col.push("chargePeriod");
col.push("checkNumber");
col.push("percentage");



var table = document.createElement("table");
table.id = "tb";
var tr = table.insertRow(-1);
var headings = ["CHRS ID", "Charge Period", "Check Number", "Percentage"];
for (var j = 0; j < headings.length; j++) {
var th = document.createElement("th");
th.innerHTML = headings[j];
tr.appendChild(th);
 th.style.fontSize = "12px";
}
for (var k = 0; k < uniqueArray.length; k++) {
tr = table.insertRow(-1);
// tr.appendChild('<td><input type = "radio" class = "rb" name="group" value = ""> </td>');
/*var button = document.createElement("input");
button.type = "radio";
button.setAttribute("class", "rb");
button.id = "rbtn";
button.name = "group";
button.value = "";
button.onclick = function(event) {



};*/
//var tabCell1 = tr.insertCell(-1);
//tabCell1.appendChild(button);
for (var l = 0; l < col.length; l++) {
var tabCell = tr.insertCell(-1);
  tabCell.style.color = "black";
                 tabCell.style.fontSize = "12px";
tabCell.innerHTML = uniqueArray[k][col[l]];
}
}
var divContainer = document.getElementById("gridShowData");
divContainer.innerHTML = "";
divContainer.appendChild(table);



var footerModal = document.getElementById("gridModal_footer");
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
//
//
//Id.value = myresopnse[n].EMPLID;
  
 /*  var employmenttype = myresopnse[n].FULL_PART_TIME;
        if(employmenttype == "P"){
        EmploymentType.value = 2;
        } else if(employmenttype == "F"){
          EmploymentType.value = 1;
        }
*/

rButtonStatus = true;
break;
}
}
if (rButtonStatus === false) {
//alert("Please select the department");
  showErrorModal("Alert!", "Excel data can't be uploaded as below entries is not balanced. Please balance it and upload");
modal.style.display = "block";
} else {



modal.style.display = "none";
}
};
// footerModal = document.getElementById("modal_footer");
footerModal.appendChild(okButton);
// document.getElementById('cBtn').parentNode.removeChild(document.getElementById('cBtn'));



               //  showErrorModal("Alert!","Excel data cannot be uploaded as employee with Empl ID - "+employeeIds+" with Charge Period - "+chargePeriods+" and Check Number - "+checkNumbers+" is not balanced");
                return false;
              } 
           
}
/*function removeDuplicates(arr) {
        var unique = [];
        var res; 
        for(i=0; i < arr.length; i++){ 
            if(unique.indexOf(arr[i]) === -1) { 
                unique.push(arr[i]); 
            } 
        }
  if(unique.length >= 1){
    if(unique.length == 1){
      res = unique[0];
    }else{
      for(var o=0; o<unique.length; o++){
        if(res === null || res === undefined){
          res = unique[o];
        }else{
          res = res+", "+unique[o];
        }
      }
    }
  }
        return res;
    }*/
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_LoadingMessageTextTable_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_LoadingMessageTextTable_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Emp_ID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Emp_ID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToBudgetOffice") {

 var empid = table.Row1.instanceManager.instances[Row1.instanceIndex].Emp_ID.value;
  if(empid !== null){
debugger;
 var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";
$.ajax({
type: 'GET',
url: "/bin/petServlet",
data: {
empid: empid,
  fiscalYr:FISCALYR.value,
action:"PET_CHARGE_DATA"
},
dataType: 'json',
success: function(myresponse) {

debugger;

if (myresponse.length !== 0) {
// var jobCodeSelect = document.querySelector(".DeptRoleSelect select");
var empidArray = [];
for (var i = 0; i < myresponse.length; i++) {
var item = myresponse[i].CSU_CHARGE_PD;
empidArray.push(item);
}
table.Row1.instanceManager.instances[Row1.instanceIndex].ChargePeriod.items = (empidArray);
  ValidateFlag.value = "false";
  gifModal.style.display = "none";
} else {
showErrorModal("Alert!", "No matching records found");
  gifModal.style.display = "none";
}
}
});
}
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_ChargePeriod_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_ChargePeriod_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
var count = Row1.instanceManager.instanceCount;

if (((StageIndicator.value === null||StageIndicator.value == "ToBudgetOffice") && (FromDeptApprovalPanel.visible == false) || (StageIndicator.value == "ToInitiator") && (FromDeptApprovalPanel.visible == false)) && UploadFlag.value == "false" && DBFlag.value < count) {
    if (flag.value === "True") {
      var empid = Row1.instanceManager.instances[Row1.instanceIndex].Emp_ID.value;
        var charge_id = this.value;
if(empid !== null){
        var gifModal = document.getElementById('gifModal');
        gifModal.style.display = "block";

        
        debugger;

        $.ajax({
            type: 'GET',
            url: "/bin/petServlet",
            data: {
                empid: empid,
                charge_id: charge_id,
                action: "PET_EMP_DATA"
            },
            dataType: 'json',
            success: function(myresponse) {
                var modal = document.getElementById('myModal');
                var span = document.getElementsByClassName("close")[0];

                debugger;
                if (myresponse.length == 1) {

                    Row1.instanceManager.instances[Row1.instanceIndex].Credit_Dept.value = myresponse[0].DEPT;
                    Row1.instanceManager.instances[Row1.instanceIndex].Credit_Funds.value = myresponse[0].FUND;
                     Row1.instanceManager.instances[Row1.instanceIndex].Credit_Class.value = myresponse[0].CLASS;
                      if((myresponse[0].CLASS) == " "){
                        Row1.instanceManager.instances[Row1.instanceIndex].Credit_Class.value = "";
                      }
                       Row1.instanceManager.instances[Row1.instanceIndex].Credit_Program.value = myresponse[0].PROGRAM; 
                  if((myresponse[0].PROGRAM) == " "){
                        Row1.instanceManager.instances[Row1.instanceIndex].Credit_Program.value = "";
                      }
                    Row1.instanceManager.instances[Row1.instanceIndex].Credit_Account.value = myresponse[0].ACCOUNT;
                    Row1.instanceManager.instances[Row1.instanceIndex].Emp_Name.value = myresponse[0].EMPLOYEE_NAME;
                    Row1.instanceManager.instances[Row1.instanceIndex].ChargePeriod.value = myresponse[0].CSU_CHARGE_PD;
                    Row1.instanceManager.instances[Row1.instanceIndex].Emp_Record.value = myresponse[0].EMPL_RCD;
                    Row1.instanceManager.instances[Row1.instanceIndex].PaycheckNo.value = myresponse[0].PAYCHECK_NBR;
                     Row1.instanceManager.instances[Row1.instanceIndex].PositionNo.value = myresponse[0].POSITION_NBR;
                        Row1.instanceManager.instances[Row1.instanceIndex].HRDeptID.value = myresponse[0].HR_DEPT_ID; 
                    Row1.instanceManager.instances[Row1.instanceIndex].TotalAmtChanged.value = myresponse[0].TOTAL_AMOUNT_CHARGE;
                    Row1.instanceManager.instances[Row1.instanceIndex].Debit_Dept.value = myresponse[0].DEPT;
                    Row1.instanceManager.instances[Row1.instanceIndex].Debit_Funds.value = myresponse[0].FUND;
                    Row1.instanceManager.instances[Row1.instanceIndex].Debit_Account.value = myresponse[0].ACCOUNT;
                   Row1.instanceManager.instances[Row1.instanceIndex].TransferAmt_Benefits.value = myresponse[0].BENEFITS; 
                  Row1.instanceManager.instances[Row1.instanceIndex].ComboCode.value = myresponse[0].BENEFITS; 
                  PercentageFlag.value = "True";
                  gifModal.style.display = "none";
                  ValidateFlag.value = "false";



                } else if (myresponse.length > 1) {
                    gifModal.style.display = "none";
                    modal.style.display = "block";


                    var col = [];
                    col.push("EMPLOYEE_NAME");
                    col.push("EMPLID");
                    col.push("EMPL_RCD");
                    /*	col.push("POSITION_NBR"); */
                    col.push("CSU_CHARGE_PD");
                    /* col.push("HR_DEPT_ID");  */
                    col.push("DEPT");
                    col.push("FUND");
                    /*  col.push("CLASS");
                        col.push("PROGRAM");*/
                    col.push("ACCOUNT");
                    col.push("TOTAL_AMOUNT_CHARGE");
                    col.push("PAYCHECK_NBR");



                    var table = document.createElement("table");
                    table.id = "tb";
                    var tr = table.insertRow(-1);

                    var headings = ["", "EMPLOYEE_NAME", "CHRS_ID", "EMPL_RCD", "CSU_CHARGE_PD", "DEPT", "FUND", "ACCOUNT", "TOTAL_AMOUNT_CHARGE","PAYCHECK_NBR"];
                    for (var j = 0; j < headings.length; j++) {
                        var th = document.createElement("th");
                        th.innerHTML = headings[j];
                        tr.appendChild(th);
                        th.style.fontSize = "12px";
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
                        button.onclick = function(event) {

                        };
                        var tabCell1 = tr.insertCell(-1);
                        tabCell1.appendChild(button);

                        for (var l = 0; l < col.length; l++) {
                            var tabCell = tr.insertCell(-1);
                            tabCell.style.color = "black";
                            tabCell.style.fontSize = "10px";
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
                    okButton.value = "OK";
                    okButton.onclick = function(event) {

                        var n;
                        var rButtonStatus;
                        //var rButtonStatusFalse;
                        var rButtons = document.getElementsByClassName("rb");
                        debugger;
                      var count = 0;
                        for (n = 0; n < rButtons.length; n++) {
                            if (rButtons[n].checked === false) {
                                rButtonStatus = false;
                            } else {
                              count = count + 1;
                                debugger;
                                if (Row1.instanceManager.instances[Row1.instanceManager.instanceCount - 1].Credit_Dept.value !== null) {
                                    Row1.instanceManager.addInstance(true);
                                }
                                Row1.instanceManager.instances[Row1.instanceIndex].Credit_Dept.value = myresponse[n].DEPT;
                                Row1.instanceManager.instances[Row1.instanceIndex].Credit_Funds.value = myresponse[n].FUND;
                                Row1.instanceManager.instances[Row1.instanceIndex].Credit_Class.value = myresponse[n].CLASS;
                               if((myresponse[n].CLASS) == " "){
                                Row1.instanceManager.instances[Row1.instanceIndex].Credit_Class.value = "";
                               }
                                Row1.instanceManager.instances[Row1.instanceIndex].Credit_Program.value = myresponse[n].PROGRAM;
                               if((myresponse[n].PROGRAM) == " "){
                               Row1.instanceManager.instances[Row1.instanceIndex].Credit_Program.value = "";
                                }
                                Row1.instanceManager.instances[Row1.instanceIndex].Credit_Account.value = myresponse[n].ACCOUNT;
                                Row1.instanceManager.instances[Row1.instanceIndex].Emp_Name.value = myresponse[n].EMPLOYEE_NAME;
                                Row1.instanceManager.instances[Row1.instanceIndex].Emp_Name.enabled = false;
                                Row1.instanceManager.instances[Row1.instanceIndex].Emp_ID.value = myresponse[n].EMPLID;
                           //     Row1.instanceManager.instances[Row1.instanceIndex].Emp_ID.enabled = false;
                                Row1.instanceManager.instances[Row1.instanceIndex].ChargePeriod.value = myresponse[n].CSU_CHARGE_PD;
                           //     Row1.instanceManager.instances[Row1.instanceIndex].ChargePeriod.enabled = false;
                                Row1.instanceManager.instances[Row1.instanceIndex].PositionNo.value = myresponse[n].POSITION_NBR;
                                Row1.instanceManager.instances[Row1.instanceIndex].PositionNo.enabled = false;
                                Row1.instanceManager.instances[Row1.instanceIndex].HRDeptID.value = myresponse[n].HR_DEPT_ID;
                                Row1.instanceManager.instances[Row1.instanceIndex].HRDeptID.enabled = false;
                                Row1.instanceManager.instances[Row1.instanceIndex].TotalAmtChanged.value = myresponse[n].TOTAL_AMOUNT_CHARGE;
                                Row1.instanceManager.instances[Row1.instanceIndex].Emp_Record.value = myresponse[n].EMPL_RCD;
                                Row1.instanceManager.instances[Row1.instanceIndex].Debit_Dept.value = myresponse[n].DEPT;
                                Row1.instanceManager.instances[Row1.instanceIndex].Debit_Funds.value = myresponse[n].FUND;
                                Row1.instanceManager.instances[Row1.instanceIndex].Debit_Account.value = myresponse[n].ACCOUNT;
                                Row1.instanceManager.instances[Row1.instanceIndex].PaycheckNo.value = myresponse[n].PAYCHECK_NBR;
                               Row1.instanceManager.instances[Row1.instanceIndex].TransferAmt_Benefits.value = myresponse[n].BENEFITS; 
                              Row1.instanceManager.instances[Row1.instanceIndex].ComboCode.value = myresponse[n].BENEFITS; 
                                      PercentageFlag.value = "True";
                                flag.value = "false";
                                
                                rButtonStatus = true;
                              
                               if (rButtonStatus === false) {

                                    modal.style.display = "none";
                                 ValidateFlag.value = "false";
                                     } else {
                                   modal.style.display = "block";
                                     }


                            }
                        }
                        flag.value = "false";
                      if(count == 1){
                        flag.value = "True";
                      }
                        modal.style.display = "none";
                        
                    };
                    footerModal.appendChild(okButton);
                      span.onclick = function() {
                        modal.style.display = "none";
                      };

                    window.onclick = function(event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    };
					
                } else {
                  gifModal.style.display = "none";
                    showErrorModal("Alert!", "No matching records found");
                }

            }
        });        
    }
    }
}
flag.value = "True";


        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_PaycheckNo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_PaycheckNo_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToBudgetOffice"){
  this.enabled = true;
} else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Emp_Record_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Emp_Record_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToBudgetOffice"){
  this.enabled = true;
} else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_PositionNo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_PositionNo_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToBudgetOffice"){
  this.enabled = true;
} else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Emp_Name_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Emp_Name_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToBudgetOffice"){
  this.enabled = true;
} else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_HRDeptID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_HRDeptID_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToBudgetOffice"){
  this.enabled = true;
} else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_TotalAmtChanged_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_TotalAmtChanged_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToBudgetOffice"){
  this.enabled = true;
} else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_TransferPercentage_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_TransferPercentage_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            /*Row1.instanceManager.instances[Row1.instanceIndex].TransferAmt.value = (Row1.instanceManager.instances[Row1.instanceIndex].TotalAmtChanged.value * Row1.instanceManager.instances[Row1.instanceIndex].TransferPercentage.value)/100;*/
debugger;

var percentageRegex = /^(100(\.0{1,2})?|([1-9]?\d)(\.\d{1,2})?)$/;
if (PercentageFlag.value == "True") {
    //if (SubmitSectionPanel.visible === true && ToDeptApprovalPanel.visible===false && ProcessPanel.visible===false){
    if (StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToBudgetOffice") {
        var percentagetoTransfer = table.Row1.instanceManager.instances[Row1.instanceIndex].TransferPercentage.value;

        if (percentagetoTransfer !== "" && percentageRegex.test(percentagetoTransfer.toString())) {
        var totalAmtChanged = table.Row1.instanceManager.instances[Row1.instanceIndex].TotalAmtChanged.value;
         var totalBenChanged = table.Row1.instanceManager.instances[Row1.instanceIndex].ComboCode.value;
        var percentagetoTransfer = table.Row1.instanceManager.instances[Row1.instanceIndex].TransferPercentage.value;
        if (totalAmtChanged !== null && percentagetoTransfer !== null) {
            var res = totalAmtChanged * percentagetoTransfer;
            table.Row1.instanceManager.instances[Row1.instanceIndex].TransferAmt.value = parseFloat(((res) / 100).toFixed(2));
        }
        if (totalBenChanged !== null && percentagetoTransfer !== null) {
            var res = totalBenChanged * percentagetoTransfer;
            table.Row1.instanceManager.instances[Row1.instanceIndex].TransferAmt_Benefits.value = parseFloat(((res) / 100).toFixed(2));
        }

        var rowcount1 = table.Row1.instanceManager.instanceCount;
        var amount = 0;
        var credDep = table.Row1.instanceManager.instances[Row1.instanceIndex].Credit_Dept.value;
        var depDept = table.Row1.instanceManager.instances[Row1.instanceIndex].Debit_Dept.value;
        var empId = table.Row1.instanceManager.instances[Row1.instanceIndex].Emp_ID.value;
        table.Row1.instanceManager.instances[Row1.instanceIndex].TotalAmtChanged.value;
        var credFun = table.Row1.instanceManager.instances[Row1.instanceIndex].Credit_Funds.value;
        var payCheckNumber = table.Row1.instanceManager.instances[Row1.instanceIndex].PaycheckNo.value;
        var DredClass = table.Row1.instanceManager.instances[Row1.instanceIndex].Credit_Class.value;
        var debitClass = table.Row1.instanceManager.instances[Row1.instanceIndex].Debit_Class.value;
        var credPgm = table.Row1.instanceManager.instances[Row1.instanceIndex].Credit_Program.value;
        var debitPgm = table.Row1.instanceManager.instances[Row1.instanceIndex].Debit_Program.value;
        //var creditProj = table.Row1.instanceManager.instances[Row1.instanceIndex].Credit_Project.value;
        //var debitProj = table.Row1.instanceManager.instances[Row1.instanceIndex].Debit_Project.value;
        var CredAccnt = table.Row1.instanceManager.instances[Row1.instanceIndex].Credit_Account.value;
        var empName = table.Row1.instanceManager.instances[Row1.instanceIndex].Emp_Name.value;
        var chargePeriod = table.Row1.instanceManager.instances[Row1.instanceIndex].ChargePeriod.value;
        var posNo = table.Row1.instanceManager.instances[Row1.instanceIndex].PositionNo.value;
        table.Row1.instanceManager.instances[Row1.instanceIndex].PositionNo.enabled = false;
        var hrDept = table.Row1.instanceManager.instances[Row1.instanceIndex].HRDeptID.value;
        table.Row1.instanceManager.instances[Row1.instanceIndex].HRDeptID.enabled = false;
        var empRec = table.Row1.instanceManager.instances[Row1.instanceIndex].Emp_Record.value;
        var DebFund = table.Row1.instanceManager.instances[Row1.instanceIndex].Debit_Funds.value;
        var DebAcc = table.Row1.instanceManager.instances[Row1.instanceIndex].Debit_Account.value;
        var Benefits = table.Row1.instanceManager.instances[Row1.instanceIndex].TransferAmt_Benefits.value; 
        var ComboCd = table.Row1.instanceManager.instances[Row1.instanceIndex].ComboCode.value;
        var perc = 0;
        for (n = 0; n < rowcount1; n++) {
        /*    if (credDep == table.Row1.instanceManager.instances[n].Credit_Dept.value && depDept == table.Row1.instanceManager.instances[n].Debit_Dept.value && empId == table.Row1.instanceManager.instances[n].Emp_ID.value && payCheckNumber == table.Row1.instanceManager.instances[n].PaycheckNo.value && chargePeriod == table.Row1.instanceManager.instances[n].ChargePeriod.value)*/
          if (empId == table.Row1.instanceManager.instances[n].Emp_ID.value && payCheckNumber == table.Row1.instanceManager.instances[n].PaycheckNo.value && chargePeriod == table.Row1.instanceManager.instances[n].ChargePeriod.value && totalAmtChanged == table.Row1.instanceManager.instances[n].TotalAmtChanged.value){
                if (table.Row1.instanceManager.instances[n].TransferPercentage.value !== null) {
                    perc = perc + parseFloat(table.Row1.instanceManager.instances[n].TransferPercentage.value);
                }
                if (table.Row1.instanceManager.instances[n].TransferAmt.value !== null) {
                    amount = amount + parseFloat(table.Row1.instanceManager.instances[n].TransferAmt.value);
                }
            }
        }
        if (perc !== 100) {
            var variablePerc = 100.00 - perc;
            var variableAmt = totalAmtChanged - amount;
            table.Row1.instanceManager.addInstance(true);
            var totalInstances = table.Row1.instanceManager.instanceCount;
            var lastIndex = totalInstances - 1;
            table.Row1.instanceManager.instances[lastIndex].Credit_Dept.value = credDep;
            table.Row1.instanceManager.instances[lastIndex].Debit_Dept.value = depDept;
            table.Row1.instanceManager.instances[lastIndex].Emp_ID.value = empId;
            table.Row1.instanceManager.instances[lastIndex].TotalAmtChanged.value = totalAmtChanged;
            var res = totalAmtChanged * variablePerc;
            table.Row1.instanceManager.instances[lastIndex].TransferAmt.value = parseFloat(((res) / 100).toFixed(2));
            table.Row1.instanceManager.instances[lastIndex].TransferPercentage.value = parseFloat(variablePerc).toFixed(2);
            table.Row1.instanceManager.instances[lastIndex].Credit_Funds.value = credFun;
            table.Row1.instanceManager.instances[lastIndex].PaycheckNo.value = payCheckNumber;
            table.Row1.instanceManager.instances[lastIndex].Credit_Class.value = DredClass;
            table.Row1.instanceManager.instances[lastIndex].Debit_Class.value = debitClass;
            //table.Row1.instanceManager.instances[lastIndex].Credit_Project.value = creditProj;
            //table.Row1.instanceManager.instances[lastIndex].Debit_Project.value = debitProj;
            table.Row1.instanceManager.instances[lastIndex].Credit_Program.value = credPgm;
            table.Row1.instanceManager.instances[lastIndex].Debit_Program.value = debitPgm;
            table.Row1.instanceManager.instances[lastIndex].Credit_Account.value = CredAccnt;
            table.Row1.instanceManager.instances[lastIndex].Emp_Name.value = empName;
            table.Row1.instanceManager.instances[lastIndex].ChargePeriod.value = chargePeriod;
            flag.value = false;
            table.Row1.instanceManager.instances[lastIndex].PositionNo.value = posNo;
            table.Row1.instanceManager.instances[lastIndex].PositionNo.enabled = false;
            table.Row1.instanceManager.instances[lastIndex].HRDeptID.value = hrDept;
            table.Row1.instanceManager.instances[lastIndex].HRDeptID.enabled = false;
            table.Row1.instanceManager.instances[lastIndex].Emp_Record.value = empRec;
            table.Row1.instanceManager.instances[lastIndex].Debit_Funds.value = DebFund;
            table.Row1.instanceManager.instances[lastIndex].Debit_Account.value = DebAcc;
          var benRes = totalBenChanged * variablePerc;
          table.Row1.instanceManager.instances[lastIndex].TransferAmt_Benefits.value = parseFloat((benRes).toFixed(2));
          table.Row1.instanceManager.instances[lastIndex].ComboCode.value = ComboCd;

        }
        } else{
          alert('wrong');
    xfa.host.messageBox(
        "Please enter a valid number with up to 2 decimal places.",
        "Validation Error"
    );
        }
    }
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Credit_Dept_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Credit_Dept_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            this.value==table.Row1.instanceManager.instances[0].Debit_Dept.value;
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Credit_Funds_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Credit_Funds_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            this.value == table.Row1.instanceManager.instances[0].Debit_Funds.value;

var valFlag = false;
if(valFlag === false && (this.value == "SSFGF" && Credit_Program.value !== "8100") && (this.value == "SSFGF" && Credit_Program !== "8101") && (this.value == "SSFGF" && Credit_Program.value !== "8102") && (this.value == "SSFGF" && Credit_Program.value !== "8103") && (this.value == "SSFGF" && Credit_Program.value !== "8104") && (this.value == "SSFGF" && Credit_Program.value !== "8105") && (this.value == "SSFGF" && Credit_Program.value !== "8106") ) {
  valFlag = true;
  showErrorModal("Alert!","Program Code 8100-8106 is required for Fund SSFGF");
}else{
  valFlag = false;
}

if ( valFlag === false && (this.value == "SW005" && Credit_Program.value !== "2060") && (this.value == "SW005" && Credit_Program.value !== "2061") && (this.value == "SW005" && Credit_Program.value !== "2062") && (this.value == "SW005" && Credit_Program.value !== "2063") && (this.value == "SW005" && Credit_Program.value !== "2064") && (this.value == "SW005" && Credit_Program.value !== "2065") && (this.value == "SW005" && Credit_Program.value !== "2066") && (this.value == "SW005" && Credit_Program.value !== "2067") && (this.value == "SW005" && Credit_Program.value !== "2068") && (this.value == "SW005" && Credit_Program.value !== "2069") && (this.value == "SW005" && Credit_Program.value !== "2070") && (this.value == "SW005" && Credit_Program.value !== "2071") && (this.value == "SW005" && Credit_Program.value !== "2072") && (this.value == "SW005" && Credit_Program.value !== "2073") ) {
  valFlag = true;
  showErrorModal("Alert!","Program Code 8100-8106 is required for Fund SSFGF");
}
else{
  valFlag = false;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Credit_Program_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Credit_Program_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var valFlag = false;
if(valFlag === false (Credit_Funds.value == "SSFGF" && this.value !== "8100") && (Credit_Funds.value == "SSFGF" && this.value !== "8101") && (Credit_Funds.value == "SSFGF" && this.value !== "8102") && (Credit_Funds.value == "SSFGF" && this.value !== "8103") && (Credit_Funds.value == "SSFGF" && this.value !== "8104") && (Credit_Funds.value == "SSFGF" && this.value !== "8105") && (Credit_Funds.value == "SSFGF" && this.value !== "8106") ) {
  showErrorModal("Alert!","Program Code 8100-8106 is required for Fund SSFGF");
}else{
  valFlag = false;
}

var valFlag = false;
if(valFlag === false(Credit_Funds.value == "SW005" && this.value !== "2060") && (Credit_Funds.value == "SW005" && this.value !== "2061") && (Credit_Funds.value == "SW005" && this.value !== "2062") && (Credit_Funds.value == "SW005" && this.value !== "2063") && (Credit_Funds.value == "SW005" && this.value !== "2064") && (Credit_Funds.value == "SW005" && this.value !== "2065") && (Credit_Funds.value == "SW005" && this.value !== "2066") && (Credit_Funds.value == "SW005" && this.value !== "2067") && (Credit_Funds.value == "SW005" && this.value !== "2068") && (Credit_Funds.value == "SW005" && this.value !== "2069") && (Credit_Funds.value == "SW005" && this.value !== "2070") && (Credit_Funds.value == "SW005" && this.value !== "2071") && (Credit_Funds.value == "SW005" && this.value !== "2072") && (Credit_Funds.value == "SW005" && this.value !== "2073") ) {
  showErrorModal("Alert!","Program Code 8100-8106 is required for Fund SSFGF");
}else{
  valFlag = false;
}

        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Credit_Account_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Credit_Account_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            //this.value==Row1.instanceManager.instances[0].Debit_Account.value;
if(StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToBudgetOffice"){
showErrorModal("Warning!","The account is only changed in very special cases of a wrong Pay-code used in LCD, and will be processed in the correction by combination PET process");
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Debit_Dept_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Debit_Dept_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if ((StageIndicator.value == "ToInitiator" || StageIndicator.value === null || StageIndicator.value == "ToBudgetOffice") && Row1.instanceIndex === 0) {
    var dept = table.Row1.instanceManager.instances[0].Debit_Dept.value;
    var workflowInitiatorVal = workflow_initiator.value;
    if (dept !== null) {
        $.ajax({
            type: 'GET',
            url: "/bin/petServlet",
            data: {
                deptid: dept,
                action: "PET_APPROVER_DATA"
            },
            dataType: 'json',
            success: function(myresponse) {
                if (myresponse.length !== 0) {
                    var deptArray = [];
                    for (var i = 0; i < myresponse.length; i++) {
                        var item = myresponse[i].APPROVER_NAME;
                        var userID = myresponse[i].APPROVER_USERID;
                        if (workflowInitiatorVal !== null) {
                            if (workflowInitiatorVal.toLowerCase() != userID.toLowerCase()) {
                                deptArray.push(item);
                            }
                        } else {
                            deptArray.push(item);
                        }
                    }
                    ToDeptApproval.items = (deptArray);
                    ApproverJsonDetails.value = JSON.stringify(myresponse);
                } else {
                    showErrorModal("Alert!", "No matching records found");
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Debit_Dept_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Debit_Dept_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToInitiator" || StageIndicator.value === null || StageIndicator.value == "ToBudgetOffice") {
    var rowCount = table.Row1.instanceManager.instanceCount;
    var deptidArray = [];
    for (var a = 0; a < rowCount; a++) {
        deptidArray.push(table.Row1.instanceManager.instances[a].Debit_Dept.value);
    }
    if (deptidArray.length >= 1) {
        var workflowInitiatorVal = workflow_initiator.value;
        var type = '';
        if (hasSameValue(deptidArray)) {
            type = 'dept';
        } else {
            type = 'div';
        }
        $.ajax({
            type: 'GET',
            url: "/bin/petServlet",
            data: {
                deptid: deptidArray[0],
                deptordiv: type,
                action: "PET_APPROVER_DATA"
            },
            dataType: 'json',
            success: function(myresponse) {
                if (myresponse.length !== 0) {
                    // var jobCodeSelect = document.querySelector(".DeptRoleSelect select");
                    var deptArray = [];
                    for (var i = 0; i < myresponse.length; i++) {
                        var item = myresponse[i].APPROVER_NAME;
                        var userID = myresponse[i].APPROVER_USERID;
                        if (workflowInitiatorVal !== null) {
                            if (workflowInitiatorVal.toLowerCase() != userID.toLowerCase()) {
                                deptArray.push(item);
                            }
                        } else {
                            deptArray.push(item);
                        }
                    }
                    ToDeptApproval.items = (deptArray);
                    ApproverJsonDetails.value = JSON.stringify(myresponse);
                } else {
                    showErrorModal("Alert!", "No matching records found");
                }
            }
        });
    }
}
function hasSameValue(arr) {

    // Filter out null values
    var filteredArr = arr.filter(function(value) {
        return value !== null;
    });

    // Create a Set to check for uniqueness
    var uniqueValues = {};
    for (var i = 0; i < filteredArr.length; i++) {
        uniqueValues[filteredArr[i]] = true;
    }

    return Object.keys(uniqueValues).length === 1;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Debit_Dept_valueCommit2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Debit_Dept_valueCommit2 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToInitiator" || StageIndicator.value === null || StageIndicator.value == "ToBudgetOffice") {
    var rowCount = table.Row1.instanceManager.instanceCount;
    var deptidArray = [];
    for (var a = 0; a < rowCount; a++) {
        deptidArray.push(table.Row1.instanceManager.instances[a].Debit_Dept.value);
    }
    if (deptidArray.length >= 1) {
        var workflowInitiatorVal = workflow_initiator.value;
       var uniqueDeptIds = deptidArray.filter(function(item, index) {
        return deptidArray.indexOf(item) === index;
    }).join(',');
        $.ajax({
            type: 'GET',
            url: "/bin/petServlet",
            data: {
                deptid: uniqueDeptIds,
                action: "PET_MULTI_DEPT_APPROVER_DATA"
            },
            dataType: 'json',
            success: function(myresponse) {
                if (myresponse.length !== 0) {
                    // var jobCodeSelect = document.querySelector(".DeptRoleSelect select");
                    var deptArray = [];
                    for (var i = 0; i < myresponse.length; i++) {
                        var item = myresponse[i].APPROVER_NAME;
                        var userID = myresponse[i].APPROVER_USERID;
                        if (workflowInitiatorVal !== null) {
                            if (workflowInitiatorVal.toLowerCase() != userID.toLowerCase()) {
                                deptArray.push(item);
                            }
                        } else {
                            deptArray.push(item);
                        }
                    }
                    ToDeptApproval.items = (deptArray);
                    ApproverJsonDetails.value = JSON.stringify(myresponse);
                } else {
                    showErrorModal("Alert!", "No matching records found");
                }
            }
        });
    }
}

        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Debit_Account_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Debit_Account_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToBudgetOffice"){
showErrorModal("Warning!","The account is only changed in very special cases of a wrong Pay-code used in LCD, and will be processed in the correction by combination PET process");
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_PermanentFundChange_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_PermanentFundChange_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToInitiator"){
  this.mandatory = true;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_MainTableInvalidDataText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_MainTableInvalidDataText_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_FinalTotalAmount_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_FinalTotalAmount_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value !== null && FinalTotalAmount.value === null){
  var rowcount = table.Row1.instanceManager.instanceCount; 
            var totalVal = 0;
            for(k = 0; k < rowcount; k++){
              var val = table.Row1.instanceManager.instances[k].TransferAmt.value;
              totalVal = parseFloat(totalVal)+parseFloat(val);
            }
            FinalTotalAmount.value = totalVal;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_ToDeptApproval_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_ToDeptApproval_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null || StageIndicator.value == "ToInitiator") {
    var approverInfo = this.value;
    var approverInfoArray = [];
    var approverActualInfoArray = [];
    var approverDetailsParsedArray = [];
    var departmentDetailsListObj = {};

    approverDetailsArray = ApproverJsonDetails.value;
    console.log("approverDetailsArray= " + approverDetailsArray);
    approverDetailsParsedArray = JSON.parse(approverDetailsArray);

    for (var s = 0; s < approverDetailsParsedArray.length; s++) {
        approverInfoArray.push(approverDetailsParsedArray[s]);
    }

    for (var approverDetails = 0; approverDetails < approverInfoArray.length; approverDetails++) {
        departmentDetailsListObj = approverInfoArray[approverDetails];
        if (approverInfo == departmentDetailsListObj["APPROVER_NAME"]) {
            //ApproverEmail_ToDept.value = departmentDetailsListObj["APPROVER_EMAILID"];
            ApproverUserID_ToDept.value = departmentDetailsListObj["APPROVER_USERID"];
            var emailVal = departmentDetailsListObj["APPROVER_EMAILID"];
            if (emailVal !== null) {
                var email = emailVal.toLowerCase();
                if (email.lastIndexOf("exchange.") != -1) {
                    email = email.replace("exchange.", "");
                    ApproverEmail_ToDept.value = email;
                   ApproverEmail_ToDept.value = "yjayaram@fullerton.edu";
                } else {
                    ApproverEmail_ToDept.value = emailVal;
                  ApproverEmail_ToDept.value = "yjayaram@fullerton.edu";
                }
            }
        }
    }
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_ValidateButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_ValidateButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            //new
debugger;
 var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";
var rowcount = table.Row1.instanceManager.instanceCount;
var sheet = [];
for (k = 0; k < rowcount; k++) {
	sheet[k] = {};
	sheet[k].Emp_ID = table.Row1.instanceManager.instances[k].Emp_ID.value;
	sheet[k].HR_Dept_ID = table.Row1.instanceManager.instances[k].HRDeptID.value;
	sheet[k].Position_Number = table.Row1.instanceManager.instances[k].PositionNo.value;
	sheet[k].Emp_Name = table.Row1.instanceManager.instances[k].Emp_Name.value;
	sheet[k].Empl_Record = table.Row1.instanceManager.instances[k].Emp_Record.value;
	sheet[k].Charge_Period = table.Row1.instanceManager.instances[k].ChargePeriod.value;
	sheet[k].Check = table.Row1.instanceManager.instances[k].PaycheckNo.value;
	sheet[k].Total_Amount = table.Row1.instanceManager.instances[k].TotalAmtChanged.value;
	sheet[k].Transfer_Percent = table.Row1.instanceManager.instances[k].TransferPercentage.value;
	sheet[k].Transfer_Amount = table.Row1.instanceManager.instances[k].TransferAmt.value;
	sheet[k].Credit_Dept = table.Row1.instanceManager.instances[k].Credit_Dept.value;
	sheet[k].Credit_Fund = table.Row1.instanceManager.instances[k].Credit_Funds.value;
	sheet[k].Credit_Class = table.Row1.instanceManager.instances[k].Credit_Class.value;
	sheet[k].Credit_Project = table.Row1.instanceManager.instances[k].Credit_Project.value;
	sheet[k].Credit_Program = table.Row1.instanceManager.instances[k].Credit_Program.value;
	sheet[k].Credit_Account = table.Row1.instanceManager.instances[k].Credit_Account.value;
	sheet[k].Debit_Dept = table.Row1.instanceManager.instances[k].Debit_Dept.value;
	sheet[k].Debit_Funds = table.Row1.instanceManager.instances[k].Debit_Funds.value;
	sheet[k].Debit_Class = table.Row1.instanceManager.instances[k].Debit_Class.value;
	sheet[k].Debit_Project = table.Row1.instanceManager.instances[k].Debit_Project.value;
	sheet[k].Debit_Account = table.Row1.instanceManager.instances[k].Debit_Account.value;
	sheet[k].Debit_Program = table.Row1.instanceManager.instances[k].Debit_Program.value;
	if (table.Row1.instanceManager.instances[k].PermanentFundChange.value == "0") {
		sheet[k].Change = "Y";
	}
	if (table.Row1.instanceManager.instances[k].PermanentFundChange.value == "1") {
		sheet[k].Change = "N";
	}

	sheet[k].TransferAmt_Benefits = table.Row1.instanceManager.instances[k].TransferAmt_Benefits.value;
}
var data = JSON.stringify(sheet);
validateData(data);
debugger;
 gifModal.style.display = "none";


function validateData(data) {
	$.ajax({
		type: 'GET',
		url: "/bin/petServlet",
		data: {
			jsonArray: data,
			action: "VALIDATE_PET_DATA"
		},
		dataType: 'json',
		success: function(myresponse) {
			debugger;
			if (myresponse.length !== 0) {

				for (var k = 0; k < myresponse.length; k++) {
					var basic = myresponse[k][k].split(',')[0].split(':')[1];
					var combo = myresponse[k][k].split(',')[1].split(':')[1];
					if (basic == "Invalid") {
						showErrorModal("Alert!", "Invalid basic details");
						ValidateFlag.value = false;
						break;
					} else if (combo == "Invalid") {
						showErrorModal("Alert!", "Invalid combo code details");
						ValidateFlag.value = false;
						break;
					} else {
						ValidateFlag.value = true;
					}


				}
				debugger;
				if (ValidateFlag.value === "true") {
					//var returnedValue = validateAmount(data);
                    returnedValue = true;
                    var returnedBaclanceCheckValue = validateBalance(data);
					if (returnedValue === true && returnedBaclanceCheckValue === true) {
						ValidateFlag.value = true;
                      TableArray.value = data;
						showErrorModal("Alert!", "Validated transfer data successfully");
					} else {
						ValidateFlag.value = false;
						showErrorModal("Alert!", "Validation unsuccessful");
					}
				}

			} else {
				showErrorModal("Alert!", "Something went wrong! please try again");
			}
		}
	});
}

function validateAmount(response) {
    var valFlag = true;
	debugger;
	response = JSON.parse(response);
	var totalCount = 0;
	var employeeIds;
	var chargePeriods;
	var checkNumbers;
	var employeeIdsArr = [];
	var chargePeriodsArr = [];
	var checkNumbersArr = [];
	var entries = [];
	var modal = document.getElementById('gridErrorModal');
	if (response.length > 0) {
		debugger;
		for (var y = 0; y < response.length; y++) {
			var id = response[y].Empl_ID;
			var chargePeriod = response[y].Charge_Period;
			var checkNumber = response[y].Check;
          if(response[y].Transfer_Percent !== null){
			var percentage = (response[y].Transfer_Percent).replaceAll("%", "");
			var percentageCount = 0;
			for (var z = 0; z < response.length; z++) {
				if (id == response[z].Empl_ID && chargePeriod == response[z].Charge_Period && checkNumber == response[z].Check) {
                  if(response[z].Transfer_Percent !== ""|| response[z].Transfer_Percent !== null){
					percentageCount = percentageCount + parseFloat((response[z].Transfer_Percent).replaceAll("%", ""));
					if (percentageCount == 100.00) {
						totalCount = totalCount + parseInt(1);
					} else {
						var entry = {
							"id": id,
							"chargePeriod": chargePeriod,
							"checkNumber": checkNumber,
							"percentage": percentage
						};
						entries.push(entry);

						jsonObject = entries.map(JSON.stringify);
						uniqueSet = new Set(jsonObject);
						uniqueArray = Array.from(uniqueSet).map(JSON.parse);
					}
				}
                }else{
            // showErrorModal("Alert!","Please enter the transfer percentage");
              valFlag = false;
              break;
        }
			}
            }else{
             //showErrorModal("Alert!","Please enter the transfer percentage");
              valFlag = false;
              break;
        }
		}
	
  debugger;
	if (totalCount == response.length) {
		return true;
	} else {


		gifModal.style.display = "none";
		//modal.style.display = "block";
		var col = [];
		col.push("id");
		col.push("chargePeriod");
		col.push("checkNumber");
		col.push("percentage");



		var table = document.createElement("table");
		table.id = "tb";
		var tr = table.insertRow(-1);
		var headings = ["Emp ID", "Charge Period", "Check Number", "Percentage"];
		for (var j = 0; j < headings.length; j++) {
			var th = document.createElement("th");
			th.innerHTML = headings[j];
			tr.appendChild(th);
			th.style.fontSize = "12px";
		}
		for (var k = 0; k < uniqueArray.length; k++) {
			tr = table.insertRow(-1);

			for (var l = 0; l < col.length; l++) {
				var tabCell = tr.insertCell(-1);
				tabCell.style.color = "black";
				tabCell.style.fontSize = "12px";
				tabCell.innerHTML = uniqueArray[k][col[l]];
			}
		}
		var divContainer = document.getElementById("gridShowData");
		divContainer.innerHTML = "";
		divContainer.appendChild(table);



		var footerModal = document.getElementById("gridModal_footer");
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


					rButtonStatus = true;
					break;
				}
			}
			if (rButtonStatus === false && valFlag === true) {
				//showErrorModal("Alert!", "Below entries is not balanced. Please balance it and validate");
				modal.style.display = "block";
			} else {



				modal.style.display = "none";
			}
		};
		footerModal.appendChild(okButton);

		return false;
       
	}
}
}

function validateBalance(data) {
  debugger;
  var totalCount = 0;
    data = JSON.parse(data);
    for (var y = 0; y < data.length; y++) {
        var id = data[y].Emp_ID;
        var chargePeriod = data[y].Charge_Period;
        var checkNumber = data[y].Check;
      if(data[y].Transfer_Percent !== null){
         var percentage = (data[y].Transfer_Percent).replaceAll("%", "");
      }else{
        return false;
      }
        var percentageCount = 0;
        for (var z = 0; z < data.length; z++) {
            if (id == data[z].Emp_ID && chargePeriod == data[z].Charge_Period && checkNumber == data[z].Check) {
                percentageCount = percentageCount + parseFloat((data[z].Transfer_Percent).replaceAll("%", ""));
            }
        }
      if(percentageCount == 100){
        totalCount = totalCount+parseInt(1);
      }
    }
  if(totalCount == data.length){
   //showErrorModal("Alert!", "Validated transfer data successfully");
   return true;
  }else{
    //showErrorModal("Alert!", "Validation unsuccessfully");
    return false;
  }
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_ValidateButton_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_ValidateButton_click1 = function (scope) {
    with(this) {
        with(scope) {
            var gifModal = document.getElementById('gifModal');
gifModal.style.display = "block";
$("#InvalidText").empty();
var rowcount = table.Row1.instanceManager.instanceCount;
var sheet = [];
for (k = 0; k < rowcount; k++) {
    sheet[k] = {};
    sheet[k].Emp_ID = table.Row1.instanceManager.instances[k].Emp_ID.value;
    sheet[k].HR_Dept_ID = table.Row1.instanceManager.instances[k].HRDeptID.value;
    sheet[k].Position_Number = table.Row1.instanceManager.instances[k].PositionNo.value;
    sheet[k].Emp_Name = table.Row1.instanceManager.instances[k].Emp_Name.value;
    sheet[k].Empl_Record = table.Row1.instanceManager.instances[k].Emp_Record.value;
    sheet[k].Charge_Period = table.Row1.instanceManager.instances[k].ChargePeriod.value;
    sheet[k].Check = table.Row1.instanceManager.instances[k].PaycheckNo.value;
    sheet[k].Total_Amount = table.Row1.instanceManager.instances[k].TotalAmtChanged.value;
    sheet[k].Transfer_Percent = table.Row1.instanceManager.instances[k].TransferPercentage.value;
    sheet[k].Transfer_Amount = table.Row1.instanceManager.instances[k].TransferAmt.value;
    sheet[k].Credit_Dept = table.Row1.instanceManager.instances[k].Credit_Dept.value;
    sheet[k].Credit_Fund = table.Row1.instanceManager.instances[k].Credit_Funds.value;
    sheet[k].Credit_Class = table.Row1.instanceManager.instances[k].Credit_Class.value;
    sheet[k].Credit_Project = table.Row1.instanceManager.instances[k].Credit_Project.value;
    sheet[k].Credit_Program = table.Row1.instanceManager.instances[k].Credit_Program.value;
    sheet[k].Credit_Account = table.Row1.instanceManager.instances[k].Credit_Account.value;
    sheet[k].Debit_Dept = table.Row1.instanceManager.instances[k].Debit_Dept.value;
    sheet[k].Debit_Funds = table.Row1.instanceManager.instances[k].Debit_Funds.value;
    sheet[k].Debit_Class = table.Row1.instanceManager.instances[k].Debit_Class.value;
    sheet[k].Debit_Project = table.Row1.instanceManager.instances[k].Debit_Project.value;
    sheet[k].Debit_Account = table.Row1.instanceManager.instances[k].Debit_Account.value;
    sheet[k].Debit_Program = table.Row1.instanceManager.instances[k].Debit_Program.value;
    if (table.Row1.instanceManager.instances[k].PermanentFundChange.value == "0") {
        sheet[k].Change = "Y";
    }
    if (table.Row1.instanceManager.instances[k].PermanentFundChange.value == "1") {
        sheet[k].Change = "N";
    }

    sheet[k].TransferAmt_Benefits = table.Row1.instanceManager.instances[k].TransferAmt_Benefits.value;
}
var data = JSON.stringify(sheet);
validateData(data);
gifModal.style.display = "none";
debugger;
function validateData(data) {
    $.ajax({
        type: 'GET',
        url: "/bin/petServlet",
        data: {
            jsonArray: data,
            action: "VALIDATE_PET_DATA"
        },
        dataType: 'json',
        success: function(myresponse) {
          debugger;
            if (myresponse.length !== 0) {
              debugger;
              var dataArray = [];
              var basicInvalidDataIndexesArray = [];
              var comboInvalidDataIndexesArray = [];
                for (var k = 0; k < myresponse.length; k++) {
                    var basic = myresponse[k][k].split(',')[0].split(':')[1];
                    var combo = myresponse[k][k].split(',')[1].split(':')[1];
                    dataArray.push(myresponse[k].Data);
                 
                    if (basic == "Invalid") {
                        //showErrorModal("Alert!", "Invalid basic details");
                        //ValidateFlag.value = false;
                        //break;
                        basicInvalidDataIndexesArray.push(k);
                    } 
                  if (combo == "Invalid") {
                        //showErrorModal("Alert!", "Invalid combo code details");
                        //ValidateFlag.value = false;
                        //break;
                        comboInvalidDataIndexesArray.push(k);
                    } 

                }
               console.log("Data = "+dataArray);
                if(basicInvalidDataIndexesArray.length !== 0 && comboInvalidDataIndexesArray.length !== 0){
                  showErrorModal("Alert!", "Invalid basic & combo code details");
                  ValidateFlag.value = false;
                }else if(basicInvalidDataIndexesArray.length !== 0){
                  showErrorModal("Alert!", "Invalid basic details");
                  ValidateFlag.value = false;
                }else if(comboInvalidDataIndexesArray.length !== 0){
                  showErrorModal("Alert!", "Invalid combo code details");
                  ValidateFlag.value = false;
                }else{
                   ValidateFlag.value = true;
                }
              
                if(ValidateFlag.value === "false"){
                  MainTableInvalidDataText.visible = true;
                  showInvalidData(basicInvalidDataIndexesArray,comboInvalidDataIndexesArray,dataArray,"BasicAndCombo");
                }
              
                if (ValidateFlag.value === "true") {
                    //var returnedValue = validateAmount(data);
                    returnedValue = true;
                    var returnedBaclanceCheckValue = validateBalance(data);
                    if (returnedValue === true && returnedBaclanceCheckValue === true) {
                        ValidateFlag.value = true;
                        TableArray.value = data;
                        showErrorModal("Alert!", "Validated transfer data successfully");
                    } else {
                        ValidateFlag.value = false;
                        showErrorModal("Alert!", "Validation unsuccessful");
                    }
                }

            } else {
                showErrorModal("Alert!", "Something went wrong! please try again");
            }
        }
    });
} 



function validateBalance(response) {
  
    response = JSON.parse(response);
    var totalCount = 0;
    var employeeIds;
    var chargePeriods;
    var checkNumbers;
    var employeeIdsArr = [];
    var chargePeriodsArr = [];
    var checkNumbersArr = [];
    
    var realentries = [];
    if (response.length > 0) {
        for (var y = 0; y < response.length; y++) {
            var id = response[y].Emp_ID;
            var chargePeriod = response[y].Charge_Period;
            var checkNumber = response[y].Check;
            var percentage = "";
            if(response[y].Transfer_Percent !== null){
             percentage = (response[y].Transfer_Percent).replaceAll("%", "");
            }else{
              percentage = "";
            }
            var percentageCount = 0;
            var entries = [];
            for (var z = 0; z < response.length; z++) {
                if (id == response[z].Emp_ID && chargePeriod == response[z].Charge_Period && checkNumber == response[z].Check) {
                  if(response[z].Transfer_Percent !== null){
                    percentageCount = percentageCount + parseFloat((response[z].Transfer_Percent).replaceAll("%", ""));
                  }else{
                    percentageCount = percentageCount;
                  }
                    
                    if (percentageCount == 100.00) {
                        totalCount = totalCount + parseInt(1);
                    } else {
                        var entry = {
                            "Emp_ID": id,
                            "Charge_Period": chargePeriod,
                            "Check": checkNumber,
                            "Empl_Record": response[y].Empl_Record,
                            "Position_Number": response[y].Position_Number,
                            "Emp_Name": response[y].Emp_Name,
                            "HR_Dept_ID": response[y].HR_Dept_ID,
                            "Total_Amount": response[y].Total_Amount,
                            "Transfer_Percent": percentage,
                            "Transfer_Amount": response[y].Transfer_Amount
                        };
                        entries.push(entry);

                      //console.log("Array from Balance Logic"+uniqueArray);
                    }
                }
               if(z == response.length-1 && percentageCount != 100.00){
                        for(var u=0; u<entries.length; u++){
                          realentries.push(entries[u]);
                        }
                        jsonObject = realentries.map(JSON.stringify);
                        uniqueSet = new Set(jsonObject);
                        uniqueArray = Array.from(uniqueSet).map(JSON.parse);
                      }
            }
        }
    }
  if(totalCount == response.length){
    return true;
  }else{
    MainTableInvalidDataText.visible = true;
     showInvalidData("","",uniqueArray,"Balance");
    return false;
  }
 
   
}

function showInvalidData(basicInvalidDataIndexesArray, comboInvalidDataIndexesArray, dataArray, Type) {
    var captionText = "";
    debugger;
    if (Type == "BasicAndCombo") {
        if (basicInvalidDataIndexesArray.length !== 0) {
            var basicInvalidDataArray = [];
            for (var o = 0; o < basicInvalidDataIndexesArray.length; o++) {
                var indexBasiInvalid = basicInvalidDataIndexesArray[o];
                basicInvalidDataArray.push(dataArray[indexBasiInvalid]);
            }
            captionText = "Invalid basic details";
            var tableValBasic = createTable(basicInvalidDataArray, captionText);
            $("#InvalidText").append(tableValBasic);
        }
        if (comboInvalidDataIndexesArray.length !== 0) {
            var comboInvalidDataArray = [];
            for (var p = 0; p < comboInvalidDataIndexesArray.length; p++) {
                var indexComboInvalid = comboInvalidDataIndexesArray[p];
                comboInvalidDataArray.push(dataArray[indexComboInvalid]);
            }
            captionText = "Invalid combo code details";
            var tableValCombo = createTable(comboInvalidDataArray, captionText);
            $("#InvalidText").append(tableValCombo);
        }

    }
    if (Type == "Balance") {
        captionText = "Please balance the below row(s)";
        var tableValBalance = createTable(dataArray, captionText);
        $("#InvalidText").append(tableValBalance);
    }
}

function createTable(Data, CaptionText) {

    var col = [];
    col.push("Emp_ID");
    col.push("Charge_Period");
    col.push("Check");
    col.push("Empl_Record");
    col.push("Position_Number");
    col.push("Emp_Name");
    col.push("HR_Dept_ID");
    col.push("Total_Amount");
    col.push("Transfer_Percent");
    col.push("Transfer_Amount");

    var table = document.createElement("table");
    table.id = "tb";
    var caption = document.createElement("caption");
    caption.innerHTML = CaptionText;
    table.appendChild(caption);
    var tr = table.insertRow(-1);
    var headings = ["Emp ID", "Charge Period", "Check Number", "Empl Record", "Position Number", "Employee Name", "HR Dept ID", "Total Amount Charged", "Percentage", "Transfer Amount"];
    for (var j = 0; j < headings.length; j++) {
        var th = document.createElement("th");
        th.innerHTML = headings[j];
        tr.appendChild(th);
        th.style.fontSize = "12px";
    }
    for (var k = 0; k < Data.length; k++) {
        tr = table.insertRow(-1);
        for (var l = 0; l < col.length; l++) {
            var tabCell = tr.insertCell(-1);
            tabCell.style.color = "black";
            tabCell.style.fontSize = "12px";
            tabCell.innerHTML = Data[k][col[l]];

            console.log("Data from Table = " + Data[k][col[l]]);
        }
    }
  return table;
  
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_button_14034516241681301562522_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_button_14034516241681301562522_click0 = function (scope) {
    with(this) {
        with(scope) {
            //new
debugger;
 var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";
$("#InvalidText").empty();
var rowcount = table.Row1.instanceManager.instanceCount;
var sheet = [];
for (k = 0; k < rowcount; k++) {
    sheet[k] = {};
    sheet[k].Emp_ID = table.Row1.instanceManager.instances[k].Emp_ID.value;
    sheet[k].HRDeptID = table.Row1.instanceManager.instances[k].HRDeptID.value;
    sheet[k].PositionNo = table.Row1.instanceManager.instances[k].PositionNo.value;
    sheet[k].Emp_Name = table.Row1.instanceManager.instances[k].Emp_Name.value;
    sheet[k].Emp_Record = table.Row1.instanceManager.instances[k].Emp_Record.value;
    sheet[k].ChargePeriod = table.Row1.instanceManager.instances[k].ChargePeriod.value;
    sheet[k].PaycheckNo = table.Row1.instanceManager.instances[k].PaycheckNo.value;
    sheet[k].TotalAmtChanged = table.Row1.instanceManager.instances[k].TotalAmtChanged.value;
    sheet[k].TransferPercentage = table.Row1.instanceManager.instances[k].TransferPercentage.value;
    sheet[k].TransferAmt = table.Row1.instanceManager.instances[k].TransferAmt.value;
    sheet[k].Credit_Dept = table.Row1.instanceManager.instances[k].Credit_Dept.value;
    sheet[k].Credit_Funds = table.Row1.instanceManager.instances[k].Credit_Funds.value;
    sheet[k].Credit_Class = table.Row1.instanceManager.instances[k].Credit_Class.value;
    sheet[k].Credit_Project = table.Row1.instanceManager.instances[k].Credit_Project.value;
    sheet[k].Credit_Program = table.Row1.instanceManager.instances[k].Credit_Program.value;
    sheet[k].Credit_Account = table.Row1.instanceManager.instances[k].Credit_Account.value;
    sheet[k].Debit_Dept = table.Row1.instanceManager.instances[k].Debit_Dept.value;
    sheet[k].Debit_Funds = table.Row1.instanceManager.instances[k].Debit_Funds.value;
    sheet[k].Debit_Class = table.Row1.instanceManager.instances[k].Debit_Class.value;
    sheet[k].Debit_Project = table.Row1.instanceManager.instances[k].Debit_Project.value;
    sheet[k].Debit_Account = table.Row1.instanceManager.instances[k].Debit_Account.value;
    sheet[k].Debit_Program = table.Row1.instanceManager.instances[k].Debit_Program.value;
    sheet[k].PermanentFundChange = null;
    if (table.Row1.instanceManager.instances[k].PermanentFundChange.value == "0") {
        sheet[k].PermanentFundChange = "Y";
    }
    if (table.Row1.instanceManager.instances[k].PermanentFundChange.value == "1") {
        sheet[k].PermanentFundChange = "N";
    }

    sheet[k].TransferAmt_Benefits = table.Row1.instanceManager.instances[k].TransferAmt_Benefits.value;
}
var data = JSON.stringify(sheet);
validateData(data);
debugger;
 


function validateData(data) {
  
  $.ajax({
    type: 'POST',
    url: "/bin/getPETValidation",
    data: {
        action: "VALIDATE_BUTTON",
        jsonArray: data
    },
    dataType: 'json',
    success: function(myresponse) {
        debugger;
        if (myresponse.length >= 1) {
          var array = [];
          var validationArray = [];
          var dataArray = [];
          for(var j=0; j<myresponse.length; j++){
            dataArray.push(myresponse[j].data);
            if(myresponse[j].ValidationStatus == "ValidationSuccess"){
             
            }else{
               validationArray.push(j);
            }
          }
          if(validationArray.length>=1){
            for (var o = 0; o < validationArray.length; o++) {
                var indexBasiInvalid = validationArray[o];
                array.push(dataArray[indexBasiInvalid]);
            }
          MainTableInvalidDataText.visible = true;
          var captionText = "Please resolve below errors";
          var tableValBasic = createTable(array,captionText);
            $("#InvalidText").append(tableValBasic);
            ValidateFlag.value = false;
            gifModal.style.display = "none";
            showErrorModal("Alert!", "Validation unsuccessful");
          }else{
            ValidateFlag.value = true;
            TableArray.value = data;
            gifModal.style.display = "none";
            showErrorModal("Alert!", "Validated transfer data successfully");
            var rowcount = table.Row1.instanceManager.instanceCount; 
            var totalVal = 0;
            for(k = 0; k < rowcount; k++){
              var val = table.Row1.instanceManager.instances[k].TransferAmt.value;
              totalVal = parseFloat(totalVal)+parseFloat(val);
            }
            FinalTotalAmount.value = totalVal;
          }
          
          
            var invalidAccountCount = 0;
            for (var i = 0; i < myresponse.length; i++) {
                if (myresponse[i].AccountCheck == "invalid") {
                    invalidAccountCount = invalidAccountCount + parseInt(1);
                }
            }
            
          
            if (invalidAccountCount >= 1) {
                showErrorModal("Warning!", "Debit and Credit Accounts are different");
            }
        }

    }
});
  
  
}

function createTable(Data,CaptionText) {

    var col = [];
    col.push("Emp_ID");
    col.push("ChargePeriod");
    col.push("PaycheckNo");
    col.push("Emp_Record");
    col.push("PositionNo");
    col.push("Emp_Name");
    col.push("HRDeptID");
    col.push("TotalAmtChanged");
    col.push("TransferPercentage");
    col.push("TransferAmt");
    col.push("ValidationStatus");

    var table = document.createElement("table");
    table.id = "tb";
    var caption = document.createElement("caption");
    caption.innerHTML = CaptionText;
    table.appendChild(caption);
    var tr = table.insertRow(-1);
    var headings = ["CHRS ID", "Charge Period", "Check Number", "Empl Record", "Position Number", "Employee Name", "HR Dept ID", "Total Amount Charged", "Percentage", "Transfer Amount", "Error"];
    for (var j = 0; j < headings.length; j++) {
        var th = document.createElement("th");
        th.innerHTML = headings[j];
        tr.appendChild(th);
        th.style.fontSize = "12px";
    }
    for (var k = 0; k < Data.length; k++) {
        tr = table.insertRow(-1);
        for (var l = 0; l < col.length; l++) {
            var tabCell = tr.insertCell(-1);
            tabCell.style.color = "black";
            tabCell.style.fontSize = "12px";
            tabCell.innerHTML = Data[k][col[l]];

            console.log("Data from Table = " + Data[k][col[l]]);
        }
    }
  return table;
  
}

//gifModal.style.display = "none";
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_AddAttachmentButton_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_AddAttachmentButton_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = true;
} else{
  this.visible = false;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_AddAttachmentButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_AddAttachmentButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  AttachmentPanel.visible = true;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_AttachmentPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_AttachmentPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            AttachmentPanel.visible = false;
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_button1732252221241_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_button1732252221241_click0 = function (scope) {
    with(this) {
        with(scope) {
            AttachmentPanel.visible = false;
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_supportDoc1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc1.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(supportDoc1.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        supportDoc1.fileAttachment.value = doc2NewName;
    }
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_supportDoc2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc2.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(supportDoc2.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        supportDoc2.fileAttachment.value = doc2NewName;
    }
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_approval_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_approval_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_InitiatorDeclaration_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_InitiatorDeclaration_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToInitiator"){
if(this.value == 1){
var userValue;
$.ajax({
type: 'GET',

url: "/bin/getLoggedInUserDetails",
dataType: 'json',
success: function(myresopnse) {
var userValue = myresopnse.userName;
SubmittedBy.value = userValue;
InitiatorSubmittedDate.value = myresopnse.SERVER_DATE;

},
error: function(error) {
alert("error block=" + error);
}
});

SubmittedBy.enabled = false;
InitiatorSubmittedDate.enabled = false;

 
}else{
SubmittedBy.value = "";
InitiatorSubmittedDate.value = null;
}
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_InitiatorSubmittedDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_InitiatorSubmittedDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_FromDeptDeclaration_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_FromDeptDeclaration_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "FromDepartment"){
if(this.value == 1){
var userValue;
$.ajax({
type: 'GET',

url: "/bin/getLoggedInUserDetails",
dataType: 'json',
success: function(myresopnse) {
var userValue = myresopnse.userName;
FromDeptApproval.value = userValue;
  FromDeptApproverName.value = userValue;
FromDeptApprovalDate.value = myresopnse.SERVER_DATE;

},
error: function(error) {
alert("error block=" + error);
}
});

FromDeptApproval.enabled = false;
FromDeptApprovalDate.enabled = false;
FromDeptApproverName.enabled=false;
 
}else{
FromDeptApproval.value = "";
FromDeptApprovalDate.value = null;
  FromDeptApproverName.value = "";
}
}

        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_ToDeptDeclaration_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_ToDeptDeclaration_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToApprover"){
if(this.value == 1){
var userValue;
$.ajax({
type: 'GET',

url: "/bin/getLoggedInUserDetails",
dataType: 'json',
success: function(myresopnse) {
var userValue = myresopnse.userName;
ToDeptApproval.value = userValue;
  ToDeptApproverName.value = userValue;
ToDeptApprovalDate.value = myresopnse.SERVER_DATE;

},
error: function(error) {
alert("error block=" + error);
}
});

ToDeptApproval.enabled = false;
ToDeptApprovalDate.enabled = false;
ToDeptApproverName.enabled=false;
 
}else{
ToDeptApproval.value = "";
ToDeptApprovalDate.value = null;
 ToDeptApproverName.value = "";
}
}


        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_ToDeptApprovalDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_ToDeptApprovalDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_BudgetOperationDeclaration_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_BudgetOperationDeclaration_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToBudgetOffice"){
if(this.value == 1){
var userValue;
$.ajax({
type: 'GET',

url: "/bin/getLoggedInUserDetails",
dataType: 'json',
success: function(myresopnse) {
var userValue = myresopnse.userName;
ProcessedBy.value = userValue;
ProcessDate.value = myresopnse.SERVER_DATE;

},
error: function(error) {
alert("error block=" + error);
}
});

ProcessedBy.enabled = false;
ProcessDate.enabled = false;
 
}else{
ProcessedBy.value = "";
ProcessDate.value = null;
}
}

        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_ProcessDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_ProcessDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_BudgetInputPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_BudgetInputPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToBudgetOffice"){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_BudgetInputPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_BudgetInputPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value == "ToBudgetOffice" && BudgetInputScreenFlag.value != "TRIGGERSTOP") {
    var rowcount = Row1.instanceManager.instanceCount;
    var rowcountRemoveAll1 = BudgetInputRow1.instanceManager.instanceCount;
    if (rowcountRemoveAll1 !== null) {
        for (var k = 0; k < rowcountRemoveAll1; k++) {
            BudgetInputRow1.instanceManager.instances[k].Completed_Status.value = "";
            BudgetInputRow1.instanceManager.removeInstance(BudgetInputRow1.instanceIndex);
        }
    }
    for (k = 0; k < rowcount; k++) {
        if (k < (rowcount - 1)) {
            BudgetInputRow1.instanceManager.addInstance(true);
        }
        BudgetInputRow1.instanceManager.instances[k].Set_ID.value = "FLCMP";
        BudgetInputRow1.instanceManager.instances[k].HR_Dept.value = table.Row1.instanceManager.instances[k].HRDeptID.value;
        BudgetInputRow1.instanceManager.instances[k].Empl_ID.value = table.Row1.instanceManager.instances[k].Emp_ID.value;
        BudgetInputRow1.instanceManager.instances[k].Emp_Rcd.value = table.Row1.instanceManager.instances[k].Emp_Record.value;
        BudgetInputRow1.instanceManager.instances[k].Charge_Period.value = table.Row1.instanceManager.instances[k].ChargePeriod.value;
        BudgetInputRow1.instanceManager.instances[k].Pay_Ck_Number.value = table.Row1.instanceManager.instances[k].PaycheckNo.value;
        //BudgetInputRow1.instanceManager.instances[k].Transfer_To_Combo_Code.value = "";
        BudgetInputRow1.instanceManager.instances[k].Transfer_To_Combo_Code_Per.value = table.Row1.instanceManager.instances[k].TransferPercentage.value;
        BudgetInputRow1.instanceManager.instances[k].Position_No.value = table.Row1.instanceManager.instances[k].PositionNo.value;
        BudgetInputRow1.instanceManager.instances[k].Completed_Status.value = null;
    }
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_BudgetInputPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_BudgetInputPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value == "ToBudgetOffice" && BudgetInputScreenFlag.value != "TRIGGERSTOP") {
var rowcount = table.Row1.instanceManager.instanceCount;
var sheet = [];
for (k = 0; k < rowcount; k++) {
    sheet[k] = {};
    sheet[k].HR_Dept_ID = table.Row1.instanceManager.instances[k].HRDeptID.value;
    sheet[k].Emp_ID = table.Row1.instanceManager.instances[k].Emp_ID.value;
    sheet[k].Empl_Record = table.Row1.instanceManager.instances[k].Emp_Record.value;
    sheet[k].Charge_Period = table.Row1.instanceManager.instances[k].ChargePeriod.value;
    sheet[k].Check = table.Row1.instanceManager.instances[k].PaycheckNo.value;
    sheet[k].Transfer_Percent = table.Row1.instanceManager.instances[k].TransferPercentage.value;
    sheet[k].Position_Number = table.Row1.instanceManager.instances[k].PositionNo.value;
    sheet[k].comboCode = table.Row1.instanceManager.instances[k].ComboCode.value;
    sheet[k].account = table.Row1.instanceManager.instances[k].Credit_Account.value;
}
var data = JSON.stringify(sheet);
console.log(data);
dataProcession(data);
}

function dataProcession(data) {
    $.ajax({
        type: 'GET',
        url: "/bin/petServlet",
        data: {
            action: "PET_BUDGET_INPUT_SCREEN_DATA",
            jsonArray: data
        },
        dataType: 'json',
        success: function(resultantData) {
            if (resultantData.length >= 1) {

                var rowcountRemoveAll1 = BudgetInputRow1.instanceManager.instanceCount;
                if (rowcountRemoveAll1 !== null) {
                    for (var k = 0; k < rowcountRemoveAll1; k++) {
                        BudgetInputRow1.instanceManager.removeInstance(BudgetInputRow1.instanceIndex);
                    }
                }
              
                var rowcount = Row1.instanceManager.instanceCount;

                for (var l = 0; l < resultantData.length; l++) {
                    if (l < (resultantData.length-1)) {
                        BudgetInputRow1.instanceManager.addInstance(true);
                    }
                    BudgetInputRow1.instanceManager.instances[l].Set_ID.value = "FLCMP";
                    BudgetInputRow1.instanceManager.instances[l].HR_Dept.value = resultantData[l].HR_Dept_ID;
                    BudgetInputRow1.instanceManager.instances[l].Empl_ID.value = resultantData[l].Emp_ID;
                    BudgetInputRow1.instanceManager.instances[l].Emp_Rcd.value = resultantData[l].Empl_Record;
                    BudgetInputRow1.instanceManager.instances[l].Charge_Period.value = resultantData[l].Charge_Period;
                    BudgetInputRow1.instanceManager.instances[l].Pay_Ck_Number.value = resultantData[l].Check;
                    BudgetInputRow1.instanceManager.instances[l].Transfer_To_Combo_Code.value = resultantData[l].comboCode;
                    BudgetInputRow1.instanceManager.instances[l].Transfer_To_Combo_Code_Per.value = resultantData[l].Transfer_Percent;
                    BudgetInputRow1.instanceManager.instances[l].Position_No.value = resultantData[l].Position_Number;
                    BudgetInputRow1.instanceManager.instances[l].Completed_Status.value = null;
                }

            } else {
                showErrorModal("Alert!", "Error in fetching data to Budget Input Screen");
            }
        }
    });
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_BudgetInputPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_BudgetInputPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToBudgetOffice" && BudgetInputScreenFlag.value != "TRIGGERSTOP") {
  var rowcount = table.Row1.instanceManager.instanceCount; 
    var rowcountRemoveAll1 = BudgetInputRow1.instanceManager.instanceCount;
                if (rowcountRemoveAll1 !== null) {
                    for (var k = 0; k < rowcountRemoveAll1; k++) {
                        BudgetInputRow1.instanceManager.removeInstance(BudgetInputRow1.instanceIndex);
                    }
                }
  for(var l = 0; l < rowcount; l++){
    if (l < (rowcount - 1)) {
            BudgetInputRow1.instanceManager.addInstance(true);
        }
     BudgetInputRow1.instanceManager.instances[l].Set_ID.value = "FLCMP";
    BudgetInputRow1.instanceManager.instances[l].HR_Dept.value = table.Row1.instanceManager.instances[l].HRDeptID.value;
    BudgetInputRow1.instanceManager.instances[l].Empl_ID.value = table.Row1.instanceManager.instances[l].Emp_ID.value;
    BudgetInputRow1.instanceManager.instances[l].Emp_Rcd.value = table.Row1.instanceManager.instances[l].Emp_Record.value;
    BudgetInputRow1.instanceManager.instances[l].Charge_Period.value = table.Row1.instanceManager.instances[l].ChargePeriod.value;
    BudgetInputRow1.instanceManager.instances[l].Pay_Ck_Number.value = table.Row1.instanceManager.instances[l].PaycheckNo.value;
    var debitDept = table.Row1.instanceManager.instances[l].Debit_Dept.value;
    var debitClass = table.Row1.instanceManager.instances[l].Debit_Class.value;
    var debitProgram = table.Row1.instanceManager.instances[l].Debit_Program.value;
    var debitAccount = table.Row1.instanceManager.instances[l].Debit_Account.value;
    BudgetInputRow1.instanceManager.instances[l].Transfer_To_Combo_Code.value = check(debitDept,debitClass,debitProgram,debitAccount);
    BudgetInputRow1.instanceManager.instances[l].Transfer_To_Combo_Code_Per.value = table.Row1.instanceManager.instances[l].TransferPercentage.value;
    BudgetInputRow1.instanceManager.instances[l].Position_No.value = table.Row1.instanceManager.instances[l].PositionNo.value;
    BudgetInputRow1.instanceManager.instances[l].Completed_Status.value = null;
  }
}

function check(deptIdVal, classVal, programVal, accountVal){
  if(classVal === null){
    classVal = " ";
  }else{
    classVal = classVal.substr(-4);
  }
  
  if(programVal === null){
    programVal = " ";
  } 
  
  if(accountVal === null){
    accountVal = " ";
  }
  
  return deptIdVal+"-G-"+classVal+"-"+programVal+"-"+accountVal;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_BudgetInputPanel_init4
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_BudgetInputPanel_init4 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value == "ToBudgetOffice" && BudgetInputScreenFlag.value != "TRIGGERSTOP") {
  $.ajax({
    type: 'GET',
    url: "/bin/petServlet",
    data: {
        action: "PET_MNEMONICS_DATA",
    },
    dataType: 'json',
    success: function(resultantData) {
        if (resultantData.length >= 0) {
            populateData(resultantData);
        } else {

        }
    }
});
}

function populateData(resultantData) {
   checkbox1684732502175.value = "";
   var rowcount = table.Row1.instanceManager.instanceCount;
    var rowcountRemoveAll1 = BudgetInputRow1.instanceManager.instanceCount;
    if (rowcountRemoveAll1 !== null) {
        for (var k = 0; k < rowcountRemoveAll1; k++) {
            BudgetInputRow1.instanceManager.removeInstance(BudgetInputRow1.instanceIndex);
        }
    }

    for (var l = 0; l < rowcount; l++) {
        if (l < (rowcount - 1)) {
            BudgetInputRow1.instanceManager.addInstance(true);
        }
        BudgetInputRow1.instanceManager.instances[l].Set_ID.value = "FLCMP";
        BudgetInputRow1.instanceManager.instances[l].HR_Dept.value = table.Row1.instanceManager.instances[l].HRDeptID.value;
        BudgetInputRow1.instanceManager.instances[l].Empl_ID.value = table.Row1.instanceManager.instances[l].Emp_ID.value;
        BudgetInputRow1.instanceManager.instances[l].Emp_Rcd.value = table.Row1.instanceManager.instances[l].Emp_Record.value;
        BudgetInputRow1.instanceManager.instances[l].BI_Empl_Name.value = table.Row1.instanceManager.instances[l].Emp_Name.value;
        BudgetInputRow1.instanceManager.instances[l].Charge_Period.value = table.Row1.instanceManager.instances[l].ChargePeriod.value;
        BudgetInputRow1.instanceManager.instances[l].Pay_Ck_Number.value = table.Row1.instanceManager.instances[l].PaycheckNo.value;
         BudgetInputRow1.instanceManager.instances[l].BI_Total_Amount.value = table.Row1.instanceManager.instances[l].TotalAmtChanged.value; 
        BudgetInputRow1.instanceManager.instances[l].BI_Transfer_Amount.value = table.Row1.instanceManager.instances[l].TransferAmt.value;
        var debitDept = table.Row1.instanceManager.instances[l].Debit_Dept.value;
        var debitClass = table.Row1.instanceManager.instances[l].Debit_Class.value;
        var debitProgram = table.Row1.instanceManager.instances[l].Debit_Program.value;
        var debitAccount = table.Row1.instanceManager.instances[l].Debit_Account.value;
        var debitFunds = table.Row1.instanceManager.instances[l].Debit_Funds.value;
        console.log(debitDept + debitClass + debitClass + debitAccount + "Val");
if(debitClass === null){
    debitClass = " ";
  }else{
    debitClass = debitClass.substr(-4);
  }
      
       if(debitProgram === null){
    debitProgram = " ";
  } 
       if(debitAccount === null){
    debitAccount = " ";
  }
      
      for(var j=0; j<resultantData.length; j++){
    if(debitFunds == resultantData[j].FUND){
      debitFunds = resultantData[j].MNEMONICS;
    }
  }
      
        BudgetInputRow1.instanceManager.instances[l].Transfer_To_Combo_Code.value = debitDept+"-"+debitFunds+"-"+debitClass+"-"+debitProgram+"-"+debitAccount;
        BudgetInputRow1.instanceManager.instances[l].Transfer_To_Combo_Code_Per.value = table.Row1.instanceManager.instances[l].TransferPercentage.value;
        BudgetInputRow1.instanceManager.instances[l].Position_No.value = table.Row1.instanceManager.instances[l].PositionNo.value;
        BudgetInputRow1.instanceManager.instances[l].Completed_Status.value = null;
    }
  console.log("Data Populated");
}



        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_BudgetInputPanel_init5
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_BudgetInputPanel_init5 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value == "ToBudgetOffice"){

 var elements = document.querySelectorAll('.Transfer_To_Combo_Code');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "transparent";
    }

var rowcount = BudgetInputRow1.instanceManager.instanceCount;
var sheet = [];
for (k = 0; k < rowcount; k++) {
    sheet[k] = {};
    sheet[k].Combo_Code = BudgetInputRow1.instanceManager.instances[k].Transfer_To_Combo_Code.value;
    sheet[k].instance = k;
}
var data = JSON.stringify(sheet);
console.log(data);
var errorArray = [];
 $.ajax({
        type: 'GET',
        url: "/bin/getPETValidation",
        data: {
            action: "BUDGET_INPUT_SCREEN_VALIDATE_BUTTON",
            jsonArray: data
        },
        dataType: 'json',
        success: function(resultantData) {
          if(resultantData.length>=1){
            for(i=0; i<resultantData.length; i++){
              if(resultantData[i].ValidationStatus == "invalid"){
                errorArray.push(resultantData[i].instance);
              }
            }
            if(errorArray.length === 0){
             
              //showErrorModal("Alert!","Combocode validation successful");
            }else{
              
               //showErrorModal("Alert!","Combocode validation unsuccessful. Invalid Combocode(s) are highlighted");
              for(var j=0; j<errorArray.length; j++){
                 var elements = document.querySelectorAll('.Transfer_To_Combo_Code'); 
                var index = errorArray[j];
                elements[index].style.backgroundColor = "#ffc8c9";
              }
            }
          }else{
           
            showErrorModal("Alert!","Something went wrong. Please try after sometime");
             
          }
        }
      });
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_Journal_Date_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_Journal_Date_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToBudgetOffice"){
  JournalDate.value = this.value;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_checkbox1684732502175_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_checkbox1684732502175_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  debugger;
var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";

 var elements = document.getElementsByClassName('ComboCodeValidation');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "transparent";
    }

var rowcount = BudgetInputRow1.instanceManager.instanceCount;
var sheet = [];
for (k = 0; k < rowcount; k++) {
    sheet[k] = {};
    sheet[k].Combo_Code = BudgetInputRow1.instanceManager.instances[k].Transfer_To_Combo_Code.value;
    sheet[k].instance = k;
}
var data = JSON.stringify(sheet);
console.log(data);
var errorArray = [];
 $.ajax({
        type: 'GET',
        url: "/bin/getPETValidation",
        data: {
            action: "BUDGET_INPUT_SCREEN_VALIDATE_BUTTON",
            jsonArray: data
        },
        dataType: 'json',
        success: function(resultantData) {
          if(resultantData.length>=1){
            for(i=0; i<resultantData.length; i++){
              if(resultantData[i].ValidationStatus == "invalid"){
                errorArray.push(resultantData[i].instance);
              }
            }
            if(errorArray.length === 0){
              gifModal.style.display = "none";
              showErrorModal("Alert!","Combocode validation successful");
            }else{
              gifModal.style.display = "none";
               showErrorModal("Alert!","Combocode validation unsuccessful. Invalid Combocode(s) are highlighted");
              for(var j=0; j<errorArray.length; j++){
                 var elements = document.getElementsByClassName('ComboCodeValidation'); 
                var index = errorArray[j];
                elements[index].style.backgroundColor = "#ffc8c9";
              }
            }
          }else{
            gifModal.style.display = "none";
            showErrorModal("Alert!","Something went wrong. Please try after sometime");
             
          }
        }
      });

}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_button1668064148122_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_button1668064148122_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
var rowcount = Row1.instanceManager.instanceCount;
var rowcountBudgetRow = BudgetInputRow1.instanceManager.instanceCount;

var rowcountRemoveAll1 = BudgetInputRow1.instanceManager.instanceCount;
 if (rowcountRemoveAll1 !== null) {
 for (var k = 0; k < rowcountRemoveAll1; k++) {
  BudgetInputRow1.instanceManager.removeInstance(BudgetInputRow1.instanceIndex);
                        }
                    }

for (k = 0; k < rowcount; k++) {
  if(k<(rowcount-1)){
     BudgetInputRow1.instanceManager.addInstance(true);
  }
    BudgetInputRow1.instanceManager.instances[k].Set_ID.value = "FLCMP";
    BudgetInputRow1.instanceManager.instances[k].HR_Dept.value = table.Row1.instanceManager.instances[k].HRDeptID.value;
    BudgetInputRow1.instanceManager.instances[k].Empl_ID.value = table.Row1.instanceManager.instances[k].Emp_ID.value;
    BudgetInputRow1.instanceManager.instances[k].Emp_Rcd.value = table.Row1.instanceManager.instances[k].Emp_Record.value;
    BudgetInputRow1.instanceManager.instances[k].Charge_Period.value = table.Row1.instanceManager.instances[k].ChargePeriod.value;
    BudgetInputRow1.instanceManager.instances[k].Pay_Ck_Number.value = table.Row1.instanceManager.instances[k].PaycheckNo.value;
    //BudgetInputRow1.instanceManager.instances[k].Transfer_To_Combo_Code.value = "";
    BudgetInputRow1.instanceManager.instances[k].Transfer_To_Combo_Code_Per.value = table.Row1.instanceManager.instances[k].TransferPercentage.value;
    BudgetInputRow1.instanceManager.instances[k].Position_No.value = table.Row1.instanceManager.instances[k].PositionNo.value;
}

        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_button_19999701621668598495094_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_button_19999701621668598495094_click0 = function (scope) {
    with(this) {
        with(scope) {
            var variable = "InitiatorName:"+InitiatorName.value+",purpose:"+Comments_Initiator.value+",caseid:"+Case_ID.value;
var templtePath = encodeURIComponent("/etc/notification/email/csuf/Payroll Expenditure Transfer/Payroll_Expenditure_Transfer_Requestor_Notification.html");
var imagePath = encodeURIComponent("/content/dam/csu/CSUF_Mailer_logo.gif");
var fromEmailAddress = encodeURIComponent("csuf@fullerton.edu"); 
var toName = encodeURIComponent(InitiatorEmail.value);
var toEmailAddress = encodeURIComponent(InitiatorEmail.value); 
var bccEmailAddress = encodeURIComponent("csuf@fullerton.edu"); 
var ccEmailAddress = encodeURIComponent(""); 
var emailVariables = encodeURIComponent(variable); 
var emailSubject = encodeURIComponent("Payroll Expenditure Transfer "+FISCALYR.value);

var urlVal = "/bin/sendEmailServlet?action=SEND_EMAIL&fromEmailAddress="+fromEmailAddress+"&toName="+toName+"&toEmailAddress="+toEmailAddress+"&bccEmailAddress="+bccEmailAddress+"&ccEmailAddress="+ccEmailAddress+"&emailVariables="+emailVariables+"&emailSubject="+emailSubject+"&emailTemplatePath="+templtePath+"&emailTemplateImagePath="+imagePath;

var data = {
            "url": (urlVal)
        };

$.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: '/bin/getTaskDetailsFromProcessingInstance',
            data: data,
            success: function(response) {
              if(response[0].Result == "Success"){
            showErrorModal("Alert!","Email sent successfully");
          }
          if(response[0].Result == "Failed"){
            showErrorModal("Alert!","Failed to send Email");
          }
        },
        error: function(error) {
            alert("error block=" + error);
           }
        });
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_button_19999701621668598495094_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_button_19999701621668598495094_click1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
var templtePath = "/etc/notification/email/csuf/Payroll Expenditure Transfer/Payroll_Expenditure_Transfer_Requestor_Notification.html";
var imagePath = "/content/dam/csu/CSUF_Mailer_logo.gif";
var fromEmailAddress = "csuf@fullerton.edu"; 
var toName = "chaitanya";
var toEmailAddress = "swathi.kumari@thoughtfocus.com"; 
var bccEmailAddress = ""; 
var ccEmailAddress = ""; 
var emailVariables = "InitiatorName:Naga vadlakunta"; 
var emailSubject = "Testing";

$.ajax({
        type: 'GET',
        url: "/bin/sendEmailServlet",
        data: {
        action:"SEND_EMAIL", 
          fromEmailAddress:fromEmailAddress,
          toName:toName,
          toEmailAddress:toEmailAddress,
          bccEmailAddress:bccEmailAddress,
          ccEmailAddress:ccEmailAddress,
          emailVariables:emailVariables,
          emailSubject:emailSubject,
          emailTemplatePath:templtePath,
          emailTemplateImagePath:imagePath
         },
        dataType: 'json',
        success: function(response) {
          if(response[0].Result == "Success"){
            showErrorModal("Alert!","Email sent successfully");
          }
          if(response[0].Result == "Failed"){
            showErrorModal("Alert!","Failed to send Email");
          }
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_button_9761881661683189681202_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_button_9761881661683189681202_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";

 var elements = document.getElementsByClassName('ComboCodeValidation');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "transparent";
    }

var rowcount = BudgetInputRow1.instanceManager.instanceCount;
var sheet = [];
for (k = 0; k < rowcount; k++) {
    sheet[k] = {};
    sheet[k].Combo_Code = BudgetInputRow1.instanceManager.instances[k].Transfer_To_Combo_Code.value;
    sheet[k].instance = k;
}
var data = JSON.stringify(sheet);
console.log(data);
var errorArray = [];
 $.ajax({
        type: 'GET',
        url: "/bin/getPETValidation",
        data: {
            action: "BUDGET_INPUT_SCREEN_VALIDATE_BUTTON",
            jsonArray: data
        },
        dataType: 'json',
        success: function(resultantData) {
          if(resultantData.length>=1){
            for(i=0; i<resultantData.length; i++){
              if(resultantData[i].ValidationStatus == "invalid"){
                errorArray.push(resultantData[i].instance);
              }
            }
            if(errorArray.length === 0){
              gifModal.style.display = "none";
              showErrorModal("Alert!","Combocode validation successful");
            }else{
              gifModal.style.display = "none";
               showErrorModal("Alert!","Combocode validation unsuccessful. Invalid Combocode(s) are highlighted");
              for(var j=0; j<errorArray.length; j++){
                 var elements = document.getElementsByClassName('ComboCodeValidation'); 
                var index = errorArray[j];
                elements[index].style.backgroundColor = "#ffc8c9";
              }
            }
          }else{
            gifModal.style.display = "none";
            showErrorModal("Alert!","Something went wrong. Please try after sometime");
             
          }
        }
      });

        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_workflow_initiator_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_workflow_initiator_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
var userValue;
$.ajax({
type: 'GET',
url: "/bin/getLoggedInUserDetails",
dataType: 'json',
success: function(myresopnse) {
var userValue = myresopnse.userId;
workflow_initiator.value = userValue;
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
 * @function pet_form_payroll_expenditure_transfer_request.generated_InitiatedDateVal_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_InitiatedDateVal_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null && this.value === null){
	 
    /*  var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);*/
 this.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if (FISCALYR.value!==null) {
    getPdf();
}else{

      showErrorModal("Alert!", "Please fill all the required fields");
   }

function getPdf() {
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
           console.log("in view pdf="+result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/pet-form/payroll-expenditure-transfer-request');
            jsonData.append('fileName', FISCALYR.value+" - Payroll Expenditure Transfer");          
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
 * @function pet_form_payroll_expenditure_transfer_request.generated_SaveDataInDB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_SaveDataInDB_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToBudgetOffice"){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_SaveDataInDB_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_SaveDataInDB_click0 = function (scope) {
    with(this) {
        with(scope) {
            var rowcount = table.Row1.instanceManager.instanceCount;
var sheet = [];
for (k = 0; k < rowcount; k++) {
    sheet[k] = {};
    sheet[k].Emp_ID = table.Row1.instanceManager.instances[k].Emp_ID.value;
    sheet[k].HR_Dept_ID = table.Row1.instanceManager.instances[k].HRDeptID.value;
    sheet[k].Position_Number = table.Row1.instanceManager.instances[k].PositionNo.value;
    sheet[k].Emp_Name = table.Row1.instanceManager.instances[k].Emp_Name.value;
    sheet[k].Empl_Record = table.Row1.instanceManager.instances[k].Emp_Record.value;
    sheet[k].Charge_Period = table.Row1.instanceManager.instances[k].ChargePeriod.value;
    sheet[k].Check = table.Row1.instanceManager.instances[k].PaycheckNo.value;
    sheet[k].Total_Amount = table.Row1.instanceManager.instances[k].TotalAmtChanged.value;
    sheet[k].Transfer_Percent = table.Row1.instanceManager.instances[k].TransferPercentage.value;
    sheet[k].Transfer_Amount = table.Row1.instanceManager.instances[k].TransferAmt.value;
    sheet[k].Credit_Dept = table.Row1.instanceManager.instances[k].Credit_Dept.value;
    sheet[k].Credit_Fund = table.Row1.instanceManager.instances[k].Credit_Funds.value;
    sheet[k].Credit_Class = table.Row1.instanceManager.instances[k].Credit_Class.value;
    sheet[k].Credit_Project = table.Row1.instanceManager.instances[k].Credit_Project.value;
    sheet[k].Credit_Program = table.Row1.instanceManager.instances[k].Credit_Program.value;
    sheet[k].Credit_Account = table.Row1.instanceManager.instances[k].Credit_Account.value;
    sheet[k].Debit_Dept = table.Row1.instanceManager.instances[k].Debit_Dept.value;
    sheet[k].Debit_Funds = table.Row1.instanceManager.instances[k].Debit_Funds.value;
    sheet[k].Debit_Class = table.Row1.instanceManager.instances[k].Debit_Class.value;
    sheet[k].Debit_Project = table.Row1.instanceManager.instances[k].Debit_Project.value;
    sheet[k].Debit_Account = table.Row1.instanceManager.instances[k].Debit_Account.value;
    sheet[k].Debit_Program = table.Row1.instanceManager.instances[k].Debit_Program.value;
    if (table.Row1.instanceManager.instances[k].PermanentFundChange.value == "0") {
        sheet[k].Change = "Y";
    }
    if (table.Row1.instanceManager.instances[k].PermanentFundChange.value == "1") {
        sheet[k].Change = "N";
    }

    sheet[k].TransferAmt_Benefits = table.Row1.instanceManager.instances[k].TransferAmt_Benefits.value;
}
var data = JSON.stringify(sheet);
var wid = localStorage.getItem('workItemId');
wid = wid.split('/workItems')[0];
saveDataInDB(data,wid);

function saveDataInDB(data,wid){
  $.ajax({
type: 'GET',
url: "/bin/petServlet",
data: {
workItemId: wid,
  //workItemId:"/var/workflow/instances/server0/2022-06-12/payroll-expenditure-transfer_187/workItems/node10_var_workflow_instances_server0_2022-06-12_payroll-expenditure-transfer_187",
  caseId:Case_ID.value,
  fiscalYr:FISCALYR.value,
  jsonArray:data,
action:"PET_SAVE_DATA"
},
dataType: 'json',
success: function(myresponse) {

debugger;

if (myresponse.length !== 0) {
showErrorModal("Alert!", "Successfully saved transfer data");
} else {
showErrorModal("Alert!", "Failed to save transfer data");
}
}
});
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_GenerateCSV_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_GenerateCSV_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToBudgetOffice"){
  this.visble = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_GenerateCSV_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_GenerateCSV_click0 = function (scope) {
    with(this) {
        with(scope) {
            
var rowcount = table.Row1.instanceManager.instanceCount;
var sheet = [];
for (k = 0; k < rowcount; k++) {
    sheet[k] = {};
    sheet[k].CHRS_ID = table.Row1.instanceManager.instances[k].Emp_ID.value;
    sheet[k].HR_Dept_ID = table.Row1.instanceManager.instances[k].HRDeptID.value;
    sheet[k].Position_Number = table.Row1.instanceManager.instances[k].PositionNo.value;
    sheet[k].Emp_Name = table.Row1.instanceManager.instances[k].Emp_Name.value;
    sheet[k].Empl_Record = table.Row1.instanceManager.instances[k].Emp_Record.value;
    sheet[k].Charge_Period = table.Row1.instanceManager.instances[k].ChargePeriod.value;
    sheet[k].Check = table.Row1.instanceManager.instances[k].PaycheckNo.value;
    sheet[k].Total_Amount = table.Row1.instanceManager.instances[k].TotalAmtChanged.value;
    sheet[k].Transfer_Percent = table.Row1.instanceManager.instances[k].TransferPercentage.value;
    sheet[k].Transfer_Amount = table.Row1.instanceManager.instances[k].TransferAmt.value;
    sheet[k].Credit_Dept = table.Row1.instanceManager.instances[k].Credit_Dept.value;
    sheet[k].Credit_Fund = table.Row1.instanceManager.instances[k].Credit_Funds.value;
    sheet[k].Credit_Class = table.Row1.instanceManager.instances[k].Credit_Class.value;
   // sheet[k].Credit_Project = table.Row1.instanceManager.instances[k].Credit_Project.value;
    sheet[k].Credit_Program = table.Row1.instanceManager.instances[k].Credit_Program.value;
    sheet[k].Credit_Account = table.Row1.instanceManager.instances[k].Credit_Account.value;
    sheet[k].Debit_Dept = table.Row1.instanceManager.instances[k].Debit_Dept.value;
    sheet[k].Debit_Funds = table.Row1.instanceManager.instances[k].Debit_Funds.value;
    sheet[k].Debit_Class = table.Row1.instanceManager.instances[k].Debit_Class.value;
   // sheet[k].Debit_Project = table.Row1.instanceManager.instances[k].Debit_Project.value;
    sheet[k].Debit_Account = table.Row1.instanceManager.instances[k].Debit_Account.value;
    sheet[k].Debit_Program = table.Row1.instanceManager.instances[k].Debit_Program.value;
    if (table.Row1.instanceManager.instances[k].PermanentFundChange.value == "0") {
        sheet[k].Change = "Y";
    }
    if (table.Row1.instanceManager.instances[k].PermanentFundChange.value == "1") {
        sheet[k].Change = "N";
    }

    sheet[k].Transfer_Amount_Benefits = table.Row1.instanceManager.instances[k].TransferAmt_Benefits.value;
}
var data = {};
data.sheet = sheet;
generateAsExcel(data);

function generateAsExcel(data) {
    try {
        const workbook = XLSX.utils.book_new();

        for (let key in data) {
            const worksheet = XLSX.utils.json_to_sheet(data[key]);
            XLSX.utils.book_append_sheet(workbook, worksheet, key);
        }

        let res = XLSX.write(workbook, {
            type: "array"
        });
        console.log(res);

        const blob = new Blob([res], {
            type: "application/vnd.ms-excel"
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = FISCALYR.value+" - Payroll Expenditure Transfer.xls";
        link.click();
    } catch (err) {
        console.log("Error:", err);
    }
}
        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_reset1600234675625_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_reset1600234675625_click0 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.reset();
$("#InvalidText").empty();
 var rowcountRemoveAll1 = Row1.instanceManager.instanceCount;
                    if (rowcountRemoveAll1 !== null) {
                        for (var k = 0; k < rowcountRemoveAll1; k++) {
                            debugger;
                           Row1.instanceManager.removeInstance(k);
                        }
                    }


        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_saveguidedraft1629881233615_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_saveguidedraft1629881233615_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(FISCALYR.value !== null){
 aftiaDescCWID.value = FISCALYR.value + " - " + InitiatorName.value;
}
handleDraftSave(this);


        }
	}
}
/**
 * @function pet_form_payroll_expenditure_transfer_request.generated_submit1600234699256_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
pet_form_payroll_expenditure_transfer_request.generated_submit1600234699256_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(FISCALYR.value !== null){

  EmailSubject.value = "Test - Payroll Expenditure Transfer "+FISCALYR.value;
  aftiaDescCWID.value = InitiatorName.value + " - "+FISCALYR.value;
}


var testEmail = "yjayaram@fullerton.edu";
ApproverEmail.value= testEmail;
InitiatorEmail.value= testEmail;
ApproverEmail_ToDept.value= testEmail;

FinalRowCount.value = table.Row1.instanceManager.instanceCount;

RowCount.value=Row1.instanceManager.instanceCount;


var submitFlag = false;
var dept = table.Row1.instanceManager.instances[0].Emp_Name.value; 
if(submitFlag === false){
var rowcount = table.Row1.instanceManager.instanceCount;
for (n = 0; n < rowcount; n++) {

  var dept = table.Row1.instanceManager.instances[n].Credit_Dept.value; 
var fund = table.Row1.instanceManager.instances[n].Credit_Funds.value; 
var account = table.Row1.instanceManager.instances[n].Credit_Account.value; 
  var program = table.Row1.instanceManager.instances[n].Credit_Program.value; 
  
 var dept_debit = table.Row1.instanceManager.instances[n].Debit_Dept.value; 
var fund_debit = table.Row1.instanceManager.instances[n].Debit_Funds.value; 
var account_debit = table.Row1.instanceManager.instances[n].Debit_Account.value; 
  var program_debit = table.Row1.instanceManager.instances[n].Debit_Program.value; 
  
if ((dept === null) || (fund === null) || (account === null)){
showErrorModal ("Alert!", "Transfer From: Account/Fund/Department are required to complete PET in row no "+(n+1));
  submitFlag = true;
break;
}
  
else if ((dept_debit === null) || (fund_debit === null) || (account_debit === null)){
showErrorModal ("Alert!", "Transfer To: Account/Fund/Department are required to complete PET in row no "+(n+1));
  submitFlag = true;
break;
}
  else if(fund !== null && program !== null && fund == "SSFGF" &&  !program.match('^81')){
  showErrorModal("Alert!","Program Code 8100-8106 is required for Fund SSFGF");
  submitFlag = true;
break;
}
  else if(fund_debit !== null && program_debit === null && fund_debit == "SSFGF"){
  showErrorModal("Alert!","Program Code 8100-8106 is required for Fund SSFGF");
  submitFlag = true;
break;
}
   else if(fund_debit !== null && program_debit !== null && fund_debit == "SSFGF" &&  !program_debit.match('^81')){
  showErrorModal("Alert!","Program Code 8100-8106 is required for Fund SSFGF");
  submitFlag = true;
break;
}
  
  else if(fund !== null && program !== null && fund == "SW005" &&  !program.match('^20')){
  showErrorModal("Alert!","Program Code 2060-2073 is required for Fund SW005");
  submitFlag = true;
break;
}
   else if(fund_debit !== null && program_debit !== null && fund_debit == "SW005" &&  !program_debit.match('^20')){
  showErrorModal("Alert!","Program Code 2060-2073 is required for Fund SW005");
  submitFlag = true;
break;
}
 
}
}

if(submitFlag === false ){
  validationCheck();
  if(ValidateFlag.value == "true"){
guideBridge.submit();
  }else{
    showErrorModal("Alert!","Please make sure you validate and correct the transfer data before submitting the request");
  }
}

function validationCheck(){
  var sheet = [];
for (k = 0; k < rowcount; k++) {
	sheet[k] = {};
	sheet[k].Emp_ID = table.Row1.instanceManager.instances[k].Emp_ID.value;
	sheet[k].HRDeptID = table.Row1.instanceManager.instances[k].HRDeptID.value;
	sheet[k].PositionNo = table.Row1.instanceManager.instances[k].PositionNo.value;
	sheet[k].Emp_Name = table.Row1.instanceManager.instances[k].Emp_Name.value;
	sheet[k].Emp_Record = table.Row1.instanceManager.instances[k].Emp_Record.value;
	sheet[k].ChargePeriod = table.Row1.instanceManager.instances[k].ChargePeriod.value;
	sheet[k].PaycheckNo = table.Row1.instanceManager.instances[k].PaycheckNo.value;
	sheet[k].TotalAmtChanged = table.Row1.instanceManager.instances[k].TotalAmtChanged.value;
	sheet[k].TransferPercentage = table.Row1.instanceManager.instances[k].TransferPercentage.value;
	sheet[k].TransferAmt = table.Row1.instanceManager.instances[k].TransferAmt.value;
	sheet[k].Credit_Dept = table.Row1.instanceManager.instances[k].Credit_Dept.value;
	sheet[k].Credit_Funds = table.Row1.instanceManager.instances[k].Credit_Funds.value;
	sheet[k].Credit_Class = table.Row1.instanceManager.instances[k].Credit_Class.value;
	sheet[k].Credit_Project = table.Row1.instanceManager.instances[k].Credit_Project.value;
	sheet[k].Credit_Program = table.Row1.instanceManager.instances[k].Credit_Program.value;
	sheet[k].Credit_Account = table.Row1.instanceManager.instances[k].Credit_Account.value;
	sheet[k].Debit_Dept = table.Row1.instanceManager.instances[k].Debit_Dept.value;
	sheet[k].Debit_Funds = table.Row1.instanceManager.instances[k].Debit_Funds.value;
	sheet[k].Debit_Class = table.Row1.instanceManager.instances[k].Debit_Class.value;
	sheet[k].Debit_Project = table.Row1.instanceManager.instances[k].Debit_Project.value;
	sheet[k].Debit_Account = table.Row1.instanceManager.instances[k].Debit_Account.value;
	sheet[k].Debit_Program = table.Row1.instanceManager.instances[k].Debit_Program.value;
    sheet[k].PermanentFundChange = null;
	if (table.Row1.instanceManager.instances[k].PermanentFundChange.value == "0") {
		sheet[k].PermanentFundChange = "Y";
	}
	if (table.Row1.instanceManager.instances[k].PermanentFundChange.value == "1") {
		sheet[k].PermanentFundChange = "N";
	}

	sheet[k].TransferAmt_Benefits = table.Row1.instanceManager.instances[k].TransferAmt_Benefits.value;
}
var data = JSON.stringify(sheet);
if(TableArray.value == data){
   ValidateFlag.value = true;
}else{
   ValidateFlag.value = false;
}
}
        }
	}
}
