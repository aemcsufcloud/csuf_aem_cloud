/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  SupervisorPanel.visible = false;
  TimekeeperPanel.visible = false;
  PayrollPanel.visible = false;
}

if(StageIndicator.value === "ToTimekeeper"){
  basic_details.enabled = true;
  timesheet.enabled = true;
  StudentPanel.enabled = false;
  TimekeeperPanel.enabled = true;
  if(SupCB.value!==null){
    SupervisorPanel.visible = true;
    SupervisorPanel.enabled = false;
  }else{
    SupervisorPanel.visible = false;
  }
  
  if(PayrollCB.value!==null){
    PayrollPanel.visible = true;
    PayrollPanel.enabled = false;
  }else{
    PayrollPanel.visible = false;
  }
}
if(StageIndicator.value === "ToManager"){
  basic_details.enabled = false;
  timesheet.enabled = false;
  StudentPanel.enabled = false;
  TimekeeperPanel.enabled = false;
  SupervisorPanel.enabled = true;
  PayrollPanel.visible = false;
}
if(StageIndicator.value === "ToPayroll"){
  basic_details.enabled = true;
  timesheet.enabled = true;
  StudentPanel.enabled = false;
  TimekeeperPanel.enabled = false;
  SupervisorPanel.enabled = false;
  PayrollPanel.enabled = true;
}

if(StageIndicator.value === "ToStudent"){
  basic_details.enabled = false;
  timesheet.enabled = true;
  StudentPanel.enabled = true;
  TimekeeperPanel.enabled = false;
  SupervisorPanel.visible = false;
  PayrollPanel.visible = false;
}

        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var gifModal = document.getElementById('gifModal');
gifModal.style.display = "block";


$.ajax({
type: 'GET',
url:"/bin/getLoggedUserId",
dataType: 'json',
success: function(myresponse){
if(myresponse.Status == "Success"){
  var userValue=myresponse.userId;
  LogUser.value = userValue;
  
  workflow_initiator.value = myresponse.userId;
  
                    $.ajax({
                        type: 'GET',
                        url: "/bin/chrsIDUpdateServlet",
                        data: {
                            userId: userValue,
                            action : "CHRS_ST_USER_DATA"
                        },
                        dataType: 'json',
                        success: function(myresponse) {

                            var modal = document.getElementById('myModal');
                            var span = document.getElementsByClassName("close")[0];
	
                            if (myresponse.length === 1) {
                                FirstName.value = myresponse[0].FIRST_NAME;
                                LastName.value = myresponse[0].LAST_NAME;
                               	RateOfPay.value = myresponse[0].HOURLY_RT;
                              	Unit.value = myresponse[0].CSU_UNIT;
                                CmsDept.value = myresponse[0].DEPTID;
                                //Department.value = myresponse[0].DEPTNAME;
                                EmployeeRec.value = myresponse[0].EMPL_RCD;
                                MiddleInitial.value = myresponse[0].MIDDLE_NAME;
                                SSN.value = myresponse[0].LAST4SSN;
                              	ClassTaken.value = myresponse[0].JOBCODE;
                                EmployeeId.value = myresponse[0].EMPLID;
                              	HiddenCwid.value = myresponse[0].EMPLID;
                                CHRSID.value = myresponse[0].CSU_CHRS_ID;
                                CHRSID_Initiator.value = myresponse[0].CSU_CHRS_ID;
                                getStudentData(CHRSID.value);
                              
                              FirstName.enabled = false;
							  LastName.enabled = false;
                              EmployeeId.enabled = false;
                              RateOfPay.enabled = false;
                              Unit.enabled = false;
                              CmsDept.enabled = false;
							  EmployeeRec.enabled = false;
                              MiddleInitial.enabled = false;
                              ClassTaken.enabled = false;
                              
                               	
                                gifModal.style.display = "none";
                                modal.style.display = "none";

                            } else if (myresponse.length > 1) {
                               
                                gifModal.style.display = "none";
                                modal.style.display = "block";

                                var col = [];
                                col.push("EMPLID");
                                col.push("CSU_CHRS_ID");
                                col.push("LAST_NAME");
                                col.push("FIRST_NAME");
                                col.push("DEPTID");
                                col.push("DEPTNAME");
                               col.push("EMPL_RCD");
                                
                                var table = document.createElement("table");
                                table.id = "tb";
                                var tr = table.insertRow(-1);
                                var headings = ["", "CWID", "Empl ID", "Last Name", "First Name", "Department Id", "Department Name","Empl RCD"];
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
                                    button.onclick = function(event) {
                                        
                                      //deptHidden.value = event.currentTarget.parentNode.parentElement.childNodes[4].innerText;
                                      //DeptNameHidden.value = event.currentTarget.parentNode.parentElement.childNodes[5].innerText;
                                      // EmpIdHidden.value = event.currentTarget.parentNode.parentElement.childNodes[1].innerText;

                                    };
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
                                             FirstName.value = myresponse[n].FIRST_NAME;
                                              LastName.value = myresponse[n].LAST_NAME;
                                              RateOfPay.value = myresponse[n].HOURLY_RT;
                                              Unit.value = myresponse[n].CSU_UNIT;
                                              CmsDept.value = myresponse[n].DEPTID;
                                              //Department.value = myresponse[0].DEPTNAME;
                                              EmployeeRec.value = myresponse[n].EMPL_RCD;
                                              MiddleInitial.value = myresponse[n].MIDDLE_NAME;
                                              SSN.value = myresponse[n].LAST4SSN;
                                              ClassTaken.value = myresponse[n].JOBCODE;
                                             EmployeeId.value = myresponse[n].EMPLID;
                                             HiddenCwid.value = myresponse[0].EMPLID;
                                             CHRSID.value = myresponse[0].CSU_CHRS_ID;
                                             CHRSID_Initiator.value = myresponse[0].CSU_CHRS_ID;
                                          
                                          getStudentData(CHRSID.value);
                                          
                                          
                                            FirstName.enabled = false;
                                            LastName.enabled = false;
                                            EmployeeId.enabled = false;
                                            RateOfPay.enabled = false;
                                            Unit.enabled = false;
                                            CmsDept.enabled = false;
                                            EmployeeRec.enabled = false;
                                            MiddleInitial.enabled = false;
                                            ClassTaken.enabled = false;
                              
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
                                // footerModal = document.getElementById("modal_footer");
                                footerModal.appendChild(okButton);
                                // document.getElementById('cBtn').parentNode.removeChild(document.getElementById('cBtn'));
                            } else {
                                gifModal.style.display = "none";
                                showErrorModal("Alert!", "No matching records found");
                              FirstName.value = "";
                              LastName.value = "";
                              EmployeeId.value = "";
                              RateOfPay.value = "";
                              Unit.value = "";
                              CmsDept.value = "";
                              EmployeeRec.value = "";
                              MiddleInitial.value = "";
                              ClassTaken.value = "";
                               
                              FirstName.enabled = true;
							  LastName.enabled = true;
								EmployeeId.enabled = true;
                              RateOfPay.enabled = true;
                              Unit.enabled = true;
                              CmsDept.enabled = true;
                              EmployeeRec.enabled = true;
                              MiddleInitial.enabled = true;
                              ClassTaken.enabled = true;
                              

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
                                    showErrorModal("Alert!", "Please select the department");
                                    // alert("Please select the department");
                                    modal.style.display = "block";
                                } else {
                                    showErrorModal("Alert!", "Please select the department");
                                    // alert("Please select the department");
                                    modal.style.display = "block";
                                }

                            };
                            // When the user clicks anywhere outside of the modal, close it

                        }
                    });
}
},
    error: function(error) {
        alert("error block=" + error);
    }
});
}


function getStudentData(chrsId){

		StudentUserID.value = "";
        StudentName.value = "";
        StudentEmailId.value = "";
       
        $.ajax({

          type: 'GET',

          url:"/bin/chrsIDUpdateServlet",
          data: {action: "STUDENT_TIMESHEET_EMP_DETAILS_CHRSID",chrsId:CHRSID.value},
          dataType: 'json',
          success: function(myresopnse) {
            StudentUserID.value = myresopnse[0].EMPUSERID;
            StudentName.value =myresopnse[0].EMP_NAME;
            StudentEmailId.value = myresopnse[0].EMAILID;
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
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
   $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].CSU_CHRS_ID;
                    Initiator_cwid.value = myresopnse[0].EMPLID;
                    CHRSID_Initiator.value = userValue;
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
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_CHRSID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_CHRSID_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null && this.value === null) {
  this.mandatory=true;
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_CHRSID_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_CHRSID_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value !== null){
  this.enabled=false;
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_CHRSID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_CHRSID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var chrsId = CHRSID.value;
var userValue = LogUser.value;

if (StageIndicator.value === null) {
    if (CHRSID_Initiator.value !== chrsId) {

        var gifModal = document.getElementById('gifModal');
        gifModal.style.display = "block";
        $.ajax({

            type: 'GET',

            url: "/bin/chrsIDUpdateServlet",
            data: {
                action: "STUDENT_TIMESHEET_EMP_DETAILS_CHRSID",
                chrsId: chrsId
            },
            dataType: 'json',
            success: function(myresopnse) {

                if (myresopnse.length !== 0) {
                    StudentUserID.value = myresopnse[0].EMPUSERID;
                    StudentName.value = myresopnse[0].EMP_NAME;
                    StudentEmailId.value = myresopnse[0].EMAILID;

                    $.ajax({
                        type: 'GET',
                        url: "/bin/chrsIDUpdateServlet",
                        data: {
                            chrsId: chrsId,
                            userId: userValue,
                            action: "STUDENT_TIMESHEET_ST_EMP_DATA"
                        },
                        dataType: 'json',
                        success: function(myresponse) {

                            var modal = document.getElementById('myModal');
                            var span = document.getElementsByClassName("close")[0];

                            if (myresponse.length === 1) {
                                FirstName.value = myresponse[0].FIRST_NAME;
                                LastName.value = myresponse[0].LAST_NAME;
                                RateOfPay.value = myresponse[0].HOURLY_RT;
                                Unit.value = myresponse[0].CSU_UNIT;
                                CmsDept.value = myresponse[0].DEPTID;
                                //Department.value = myresponse[0].DEPTNAME;
                                EmployeeRec.value = myresponse[0].EMPL_RCD;
                                MiddleInitial.value = myresponse[0].MIDDLE_NAME;
                                SSN.value = myresponse[0].LAST4SSN;
                                ClassTaken.value = myresponse[0].JOBCODE;
                                EmployeeId.value = myresponse[0].EMPLID;
                                FirstName.enabled = false;
                                LastName.enabled = false;
                                RateOfPay.enabled = false;
                                Unit.enabled = false;
                                CmsDept.enabled = false;
                                EmployeeRec.enabled = false;
                                MiddleInitial.enabled = false;
                                ClassTaken.enabled = false;

                                gifModal.style.display = "none";
                                modal.style.display = "none";

                            } else if (myresponse.length > 1) {

                                gifModal.style.display = "none";
                                modal.style.display = "block";

                                var col = [];
                                col.push("EMPLID");
                                col.push("CSU_CHRS_ID");
                                col.push("LAST_NAME");
                                col.push("FIRST_NAME");
                                col.push("DEPTID");
                                col.push("DEPTNAME");
                                col.push("EMPL_RCD");

                                var table = document.createElement("table");
                                table.id = "tb";
                                var tr = table.insertRow(-1);
                                var headings = ["", "CWID", "Empl ID", "Last Name", "First Name", "Department Id", "Department Name", "Empl RCD"];
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
                                    button.onclick = function(event) {

                                        //deptHidden.value = event.currentTarget.parentNode.parentElement.childNodes[4].innerText;
                                        //DeptNameHidden.value = event.currentTarget.parentNode.parentElement.childNodes[5].innerText;
                                        // EmpIdHidden.value = event.currentTarget.parentNode.parentElement.childNodes[1].innerText;

                                    };
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
                                            FirstName.value = myresponse[n].FIRST_NAME;
                                            LastName.value = myresponse[n].LAST_NAME;
                                            RateOfPay.value = myresponse[n].HOURLY_RT;
                                            Unit.value = myresponse[n].CSU_UNIT;
                                            CmsDept.value = myresponse[n].DEPTID;
                                            //Department.value = myresponse[0].DEPTNAME;
                                            EmployeeRec.value = myresponse[n].EMPL_RCD;
                                            MiddleInitial.value = myresponse[n].MIDDLE_NAME;
                                            SSN.value = myresponse[n].LAST4SSN;
                                            ClassTaken.value = myresponse[n].JOBCODE;
                                            EmployeeId.value = myresponse[n].EMPLID;

                                            FirstName.enabled = false;
                                            LastName.enabled = false;
                                            EmployeeId.enabled = false;
                                            RateOfPay.enabled = false;
                                            Unit.enabled = false;
                                            CmsDept.enabled = false;
                                            EmployeeRec.enabled = false;
                                            MiddleInitial.enabled = false;
                                            ClassTaken.enabled = false;
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
                                // footerModal = document.getElementById("modal_footer");
                                footerModal.appendChild(okButton);
                                // document.getElementById('cBtn').parentNode.removeChild(document.getElementById('cBtn'));
                            } else {
                                gifModal.style.display = "none";
                                showErrorModal("Alert!", "No matching records found");

                                FirstName.value = "";
                                LastName.value = "";
                                EmployeeId.value = "";
                                RateOfPay.value = "";
                                Unit.value = "";
                                CmsDept.value = "";
                                EmployeeRec.value = "";
                                MiddleInitial.value = "";
                                ClassTaken.value = "";

                                FirstName.enabled = true;
                                LastName.enabled = true;
                                EmployeeId.enabled = true;
                                RateOfPay.enabled = true;
                                Unit.enabled = true;
                                CmsDept.enabled = true;
                                EmployeeRec.enabled = true;
                                MiddleInitial.enabled = true;
                                ClassTaken.enabled = true;
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
                                    showErrorModal("Alert!", "Please select the department");
                                    // alert("Please select the department");
                                    modal.style.display = "block";
                                } else {
                                    showErrorModal("Alert!", "Please select the department");
                                    // alert("Please select the department");
                                    modal.style.display = "block";
                                }

                            };
                            // When the user clicks anywhere outside of the modal, close it

                        }
                    });
                } else {
                    gifModal.style.display = "none";
                    showErrorModal("Alert!", "No matching records found");

                    FirstName.value = "";
                    LastName.value = "";
                    EmployeeId.value = "";
                    RateOfPay.value = "";
                    Unit.value = "";
                    CmsDept.value = "";
                    EmployeeRec.value = "";
                    MiddleInitial.value = "";
                    ClassTaken.value = "";

                    FirstName.enabled = true;
                    LastName.enabled = true;
                    EmployeeId.enabled = true;
                    RateOfPay.enabled = true;
                    Unit.enabled = true;
                    CmsDept.enabled = true;
                    EmployeeRec.enabled = true;
                    MiddleInitial.enabled = true;
                    ClassTaken.enabled = true;
                }

            },
            error: function(error) {
                alert("error block=" + error);
            }
        });

    }
    if (this.value !== null && CHRSID_Initiator.value !== null && this.value !== CHRSID_Initiator.value) {
        StudentSignature.enabled = true;
        StudentSignature.mandatory = false;
        StudentCB.mandatory = false;
        StudentSignDate.mandatory = false;
    } else {
        StudentSignature.enabled = false;
        StudentSignature.mandatory = true;
        StudentCB.mandatory = true;
        StudentSignDate.mandatory = true;
    }

}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_EmployeeId_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_EmployeeId_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var empId = EmployeeId.value;
if(StageIndicator.value === null){
   $.ajax({

     type: 'GET',

     url:"/bin/getEvaluationFormData",
     data: {action: "EMP_DETAILS_CWID",cwid:empId},
     dataType: 'json',
     success: function(myresopnse) {
       StudentUserID.value = myresopnse[0].EMPUSERID;
        StudentName.value =myresopnse[0].EMP_NAME;
         StudentEmailId.value = myresopnse[0].EMAILID;
     },
     error: function(error) {
       alert("error block=" + error);
     }
    });
  if(this.value !== null && Initiator_cwid.value !== null && this.value !== Initiator_cwid.value){
  StudentSignature.enabled = true;
  StudentSignature.mandatory = false;
  StudentCB.mandatory = false;
    StudentSignDate.mandatory = false;
}else{
  StudentSignature.enabled = false;
  StudentSignature.mandatory = true;
  StudentCB.mandatory = true;
  StudentSignDate.mandatory = true;
}
}


        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_EmployeeId_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_EmployeeId_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            
var empId = EmployeeId.value;
var userValue = LogUser.value;

if(StageIndicator.value === null){
  if(HiddenCwid.value !== empId){
  
    var gifModal = document.getElementById('gifModal');
	gifModal.style.display = "block";
   $.ajax({

     type: 'GET',

     url:"/bin/getEvaluationFormData",
     data: {action: "EMP_DETAILS_CWID",cwid:empId},
     dataType: 'json',
     success: function(myresopnse) {

		 if (myresopnse.length !== 0) {
       StudentUserID.value = myresopnse[0].EMPUSERID;
       StudentName.value =myresopnse[0].EMP_NAME;
       StudentEmailId.value = myresopnse[0].EMAILID;
		 
	   $.ajax({
                        type: 'GET',
                        url: "/bin/getStudentTimesheetData",
                        data: {
							cwid:empId,
                            userID: userValue,
                            action : "ST_EMP_DATA"
                        },
                        dataType: 'json',
                        success: function(myresponse) {

                            var modal = document.getElementById('myModal');
                            var span = document.getElementsByClassName("close")[0];
	
                            if (myresponse.length === 1) {
                                FirstName.value = myresponse[0].FIRST_NAME;
                                LastName.value = myresponse[0].LAST_NAME;
                               	RateOfPay.value = myresponse[0].HOURLY_RT;
                              	Unit.value = myresponse[0].CSU_UNIT;
                                CmsDept.value = myresponse[0].DEPTID;
                                //Department.value = myresponse[0].DEPTNAME;
                                EmployeeRec.value = myresponse[0].EMPL_RCD;
                                MiddleInitial.value = myresponse[0].MIDDLE_NAME;
                                SSN.value = myresponse[0].LAST4SSN;
                              	ClassTaken.value = myresponse[0].JOBCODE;
                               //EmployeeId.value = myresponse[0].EMPLID;
                               //
                               FirstName.enabled = false;
                              LastName.enabled = false;
                              RateOfPay.enabled = false;
                              Unit.enabled = false;
                              CmsDept.enabled = false;
                              EmployeeRec.enabled = false;
                              MiddleInitial.enabled = false;
                              ClassTaken.enabled = false;
                               	
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
                               col.push("EMPL_RCD");
                                
                                var table = document.createElement("table");
                                table.id = "tb";
                                var tr = table.insertRow(-1);
                                var headings = ["", "Emp ID", "Last Name", "First Name", "Department Id", "Department Name","Empl RCD"];
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
                                    button.onclick = function(event) {
                                        
                                      //deptHidden.value = event.currentTarget.parentNode.parentElement.childNodes[4].innerText;
                                      //DeptNameHidden.value = event.currentTarget.parentNode.parentElement.childNodes[5].innerText;
                                      // EmpIdHidden.value = event.currentTarget.parentNode.parentElement.childNodes[1].innerText;

                                    };
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
                                             FirstName.value = myresponse[n].FIRST_NAME;
                                              LastName.value = myresponse[n].LAST_NAME;
                                              RateOfPay.value = myresponse[n].HOURLY_RT;
                                              Unit.value = myresponse[n].CSU_UNIT;
                                              CmsDept.value = myresponse[n].DEPTID;
                                              //Department.value = myresponse[0].DEPTNAME;
                                              EmployeeRec.value = myresponse[n].EMPL_RCD;
                                              MiddleInitial.value = myresponse[n].MIDDLE_NAME;
                                              SSN.value = myresponse[n].LAST4SSN;
                                              ClassTaken.value = myresponse[n].JOBCODE;
                                             EmployeeId.value = empId;
                                          
                                           FirstName.enabled = false;
                                            LastName.enabled = false;
                                            RateOfPay.enabled = false;
                                            Unit.enabled = false;
                                            CmsDept.enabled = false;
                                            EmployeeRec.enabled = false;
                                            MiddleInitial.enabled = false;
                                            ClassTaken.enabled = false;
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
                                // footerModal = document.getElementById("modal_footer");
                                footerModal.appendChild(okButton);
                                // document.getElementById('cBtn').parentNode.removeChild(document.getElementById('cBtn'));
                            } else {
                                gifModal.style.display = "none";
                                showErrorModal("Alert!", "No matching records found");
                               
                               FirstName.value = "";
                              LastName.value = "";
                              RateOfPay.value = "";
                              Unit.value = "";
                              CmsDept.value = "";
                              EmployeeRec.value = "";
                              MiddleInitial.value = "";
                              ClassTaken.value = "";
                               
                              FirstName.enabled = true;
							  LastName.enabled = true;
							  RateOfPay.enabled = true;
                              Unit.enabled = true;
                              CmsDept.enabled = true;
                              EmployeeRec.enabled = true;
                              MiddleInitial.enabled = true;
                              ClassTaken.enabled = true;
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
                                    showErrorModal("Alert!", "Please select the department");
                                    // alert("Please select the department");
                                    modal.style.display = "block";
                                } else {
                                    showErrorModal("Alert!", "Please select the department");
                                    // alert("Please select the department");
                                    modal.style.display = "block";
                                }

                            };
                            // When the user clicks anywhere outside of the modal, close it

                        }
                    });
		 }else{
			   gifModal.style.display = "none";
                                showErrorModal("Alert!", "No matching records found");
                               
                               FirstName.value = "";
                              LastName.value = "";
                              RateOfPay.value = "";
                              Unit.value = "";
                              CmsDept.value = "";
                              EmployeeRec.value = "";
                              MiddleInitial.value = "";
                              ClassTaken.value = "";
                               
                              FirstName.enabled = true;
							  LastName.enabled = true;
							  RateOfPay.enabled = true;
                              Unit.enabled = true;
                              CmsDept.enabled = true;
                              EmployeeRec.enabled = true;
                              MiddleInitial.enabled = true;
                              ClassTaken.enabled = true;
		 }
	   
     },
     error: function(error) {
       alert("error block=" + error);
     }
    });

}
if(this.value !== null && Initiator_cwid.value !== null && this.value !== Initiator_cwid.value){
  StudentSignature.enabled = true;
  StudentSignature.mandatory = false;
  StudentCB.mandatory = false;
    StudentSignDate.mandatory = false;
}else{
  StudentSignature.enabled = false;
  StudentSignature.mandatory = true;
  StudentCB.mandatory = true;
  StudentSignDate.mandatory = true;
}

}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Month_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Month_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
var dateVal123 = "";
var dayVal = "";
var fiscalVal = FiscalYear.value;
var arr = fiscalVal.split("-");
var monthVal = Month.value;
if (monthVal === "1" || monthVal === "2" || monthVal === "3" || monthVal === "4" || monthVal === "5" || monthVal === "6") {
    Year.value = arr[1];
} else if (monthVal === "7" || monthVal === "8" || monthVal === "9" || monthVal === "10" || monthVal === "11" || monthVal === "12") {
    Year.value = arr[0];
}

   // var monthVal = Month.value;
    //var fiscalVal = FiscalYear.value;
    var yearVal = Year.value;
    var fiscalEndMonthVal = fiscalEndMonth.value;
    var fiscalStartMonthVal = fiscalStartMonth.value;

    $.ajax({
        type: 'GET',
        url: "/bin/getPayrollCalendar?action=PAYROLL_CALENDAR",

        data: {
            month: monthVal,
            year: yearVal,
            fiscalYear: fiscalVal,
            fiscalStartMonth: fiscalStartMonthVal,
            fiscalEndMonth: fiscalEndMonthVal

        },
        dataType: 'json',
        success: function(payrollResult) {
            if (payrollResult.length !== 0) {
                clearGridValues();
                
              	//Draft - Clear grid 
              	/*if(formSavedStatus.value !== "1"){
						clearGridValues();
						}else{
						formSavedStatus.value = "";
						}*/
                
              	dateJsonArray.value = "";
                dateJsonArray.value =  JSON.stringify(payrollResult);
                timesheet.visible = true;
                var i;
                for (i = 0; i < payrollResult.length; i++) {
                    var weekVal = payrollResult[i].weekInSession;
                    if (weekVal === 1) {
                      SessionLimitWeek1.value = payrollResult[i].weeklyHoursLimit;
                        //Populate dates for week 1 and validate
                        dayVal = payrollResult[i].dayOfWeek;
                        if (dayVal === "SUNDAY") {
                            SunDate1.value = payrollResult[i].dayOfMonth;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {

                                Table1.Row1.SunHrsMins1.title = SunDate1.value + " H";
                            } else {
                                Table1.Row1.SunHrsMins1.title = SunDate1.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SunHrsMins1.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-tableItem___label').style.color = "black";
                                Table1.Row1.SunHrsMins1.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SunHrsMins1.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SunHrsMins1.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SunHrsMins1.enabled = false;
                            }


                        } else if (dayVal === "MONDAY") {
                            MonDate1.value = payrollResult[i].dayOfMonth;
                            Table1.Row1.MonHrsMins1.title = MonDate1.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row1.MonHrsMins1.title = MonDate1.value + " H";
                            } else {
                                Table1.Row1.MonHrsMins1.title = MonDate1.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263531474___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.MonHrsMins1.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263531474___label').style.color = "black";
                                Table1.Row1.MonHrsMins1.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263531474___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.MonHrsMins1.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263531474___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.MonHrsMins1.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263531474___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.MonHrsMins1.enabled = false;
                            }
                          debugger;
                          //quick fix to handle 2023 May Included day
                              if(Month.value == "5" && Year.value == "2023" && MonDate1.value == "1"){
                                  Table1.Row1.MonHrsMins1.enabled = false;
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263531474___label').style.color = "rgb(118, 118, 118)";
                                }
                        } else if (dayVal === "TUESDAY") {
                            TuesDate1.value = payrollResult[i].dayOfMonth;
                            Table1.Row1.TueHrsMins1.title = TuesDate1.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row1.TueHrsMins1.title = TuesDate1.value + " H";
                            } else {
                                Table1.Row1.TueHrsMins1.title = TuesDate1.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headeritem1621263526___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.TueHrsMins1.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headeritem1621263526___label').style.color = "black";
                                Table1.Row1.TueHrsMins1.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headeritem1621263526___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.TueHrsMins1.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headeritem1621263526___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.TueHrsMins1.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headeritem1621263526___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.TueHrsMins1.enabled = false;
                            }
                        } else if (dayVal === "WEDNESDAY") {
                            WedDate1.value = payrollResult[i].dayOfMonth;
                            Table1.Row1.WedHrsMins1.title = WedDate1.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row1.WedHrsMins1.title = WedDate1.value + " H";
                            } else {
                                Table1.Row1.WedHrsMins1.title = WedDate1.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263518199___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.WedHrsMins1.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263518199___label').style.color = "black";
                                Table1.Row1.WedHrsMins1.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263518199___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.WedHrsMins1.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263518199___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.WedHrsMins1.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263518199___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.WedHrsMins1.enabled = false;
                            }
                          
                        } else if (dayVal === "THURSDAY") {
                            ThurDate1.value = payrollResult[i].dayOfMonth;
                            Table1.Row1.ThuHrsMins1.title = ThurDate1.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row1.ThuHrsMins1.title = ThurDate1.value + " H";
                            } else {
                                Table1.Row1.ThuHrsMins1.title = ThurDate1.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263513660___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.ThuHrsMins1.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263513660___label').style.color = "black";
                                Table1.Row1.ThuHrsMins1.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263513660___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.ThuHrsMins1.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263513660___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.ThuHrsMins1.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263513660___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.ThuHrsMins1.enabled = false;
                            }
                        } else if (dayVal === "FRIDAY") {
                            FridayDate1.value = payrollResult[i].dayOfMonth;
                            Table1.Row1.FriHrsMins1.title = FridayDate1.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row1.FriHrsMins1.title = FridayDate1.value + " H";
                            } else {
                                Table1.Row1.FriHrsMins1.title = FridayDate1.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263509955___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.FriHrsMins1.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263509955___label').style.color = "black";
                                Table1.Row1.FriHrsMins1.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263509955___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.FriHrsMins1.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263509955___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.FriHrsMins1.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263509955___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.FriHrsMins1.enabled = false;
                            }
                            
                            // quick fix for March 01 2024 added on 04022024
                            if(yearVal == "2024" && monthVal == "3" && fiscalVal == "2023-2024"){
                               Table1.Row1.FriHrsMins1.enabled = true;
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263509955___label').style.color = "black";
                            }
                        } else if (dayVal === "SATURDAY") {
                            SatDate1.value = payrollResult[i].dayOfMonth;
                            Table1.Row1.SatHrsMins1.title = SatDate1.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row1.SatHrsMins1.title = SatDate1.value + " H";
                            } else {
                                Table1.Row1.SatHrsMins1.title = SatDate1.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263506306___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SatHrsMins1.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263506306___label').style.color = "black";
                                Table1.Row1.SatHrsMins1.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263506306___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SatHrsMins1.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263506306___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SatHrsMins1.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263506306___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SatHrsMins1.enabled = false;
                            }
                        }
                    }
                    if (weekVal === 2) {
                      SessionLimitWeek2.value = payrollResult[i].weeklyHoursLimit;
                        //Populate dates of week 2 and validate
                        var dayVal2 = payrollResult[i].dayOfWeek;
                        if (dayVal2 === "SUNDAY") {
                            SunDate2.value = payrollResult[i].dayOfMonth;
                            Table1.Row2.SunHrsMins2.title = SunDate2.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row2.SunHrsMins2.title = SunDate2.value + " H";
                            } else {
                                Table1.Row2.SunHrsMins2.title = SunDate2.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SunHrsMins2.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-tableItem___label').style.color = "black";
                                Table1.Row2.SunHrsMins2.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SunHrsMins2.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SunHrsMins2.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SunHrsMins2.enabled = false;
                            }
                        } else if (dayVal2 === "MONDAY") {
                            MonDate2.value = payrollResult[i].dayOfMonth;
                            Table1.Row2.MonHrsMins2.title = MonDate2.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row2.MonHrsMins2.title = MonDate2.value + " H";
                            } else {
                                Table1.Row2.MonHrsMins2.title = MonDate2.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263531617___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.MonHrsMins2.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263531617___label').style.color = "black";
                                Table1.Row2.MonHrsMins2.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263531617___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.MonHrsMins2.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263531617___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.MonHrsMins2.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263531617___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.MonHrsMins2.enabled = false;
                            }
                        } else if (dayVal2 === "TUESDAY") {
                            TuesDate2.value = payrollResult[i].dayOfMonth;
                            Table1.Row2.TueHrsMins2.title = TuesDate2.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row2.TueHrsMins2.title = TuesDate2.value + " H";
                            } else {
                                Table1.Row2.TueHrsMins2.title = TuesDate2.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263526961___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.TueHrsMins2.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263526961___label').style.color = "black";
                                Table1.Row2.TueHrsMins2.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263526961___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.TueHrsMins2.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263526961___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.TueHrsMins2.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263526961___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.TueHrsMins2.enabled = false;
                            }
                        } else if (dayVal2 === "WEDNESDAY") {
                            WedDate2.value = payrollResult[i].dayOfMonth;
                            Table1.Row2.WedHrsMins2.title = WedDate2.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row2.WedHrsMins2.title = WedDate2.value + " H";
                            } else {
                                Table1.Row2.WedHrsMins2.title = WedDate2.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263518450___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.WedHrsMins2.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263518450___label').style.color = "black";
                                Table1.Row2.WedHrsMins2.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263518450___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.WedHrsMins2.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263518450___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.WedHrsMins2.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263518450___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.WedHrsMins2.enabled = false;
                            }
                        } else if (dayVal2 === "THURSDAY") {
                            ThurDate2.value = payrollResult[i].dayOfMonth;
                            Table1.Row2.ThuHrsMins2.title = ThurDate2.value;

                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row2.ThuHrsMins2.title = ThurDate2.value + " H";
                            } else {
                                Table1.Row2.ThuHrsMins2.title = ThurDate2.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263513816___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.ThuHrsMins2.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263513816___label').style.color = "black";
                                Table1.Row2.ThuHrsMins2.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263513816___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.ThuHrsMins2.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263513816___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.ThuHrsMins2.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263513816___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.ThuHrsMins2.enabled = false;
                            }

                        } else if (dayVal2 === "FRIDAY") {
                            FridayDate2.value = payrollResult[i].dayOfMonth;
                            Table1.Row2.FriHrsMins2.title = FridayDate2.value;
                           
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row2.FriHrsMins2.title = FridayDate2.value + " H";
                            } else {
                                Table1.Row2.FriHrsMins2.title = FridayDate2.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263510092___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.FriHrsMins2.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263510092___label').style.color = "black";
                                Table1.Row2.FriHrsMins2.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263510092___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.FriHrsMins2.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263510092___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.FriHrsMins2.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263510092___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.FriHrsMins2.enabled = false;
                            }
                        } else if (dayVal2 === "SATURDAY") {
                            SatDate2.value = payrollResult[i].dayOfMonth;
                            Table1.Row2.SatHrsMins2.title = SatDate2.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row2.SatHrsMins2.title = SatDate2.value + " H";
                            } else {
                                Table1.Row2.SatHrsMins2.title = SatDate2.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263506443___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SatHrsMins2.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263506443___label').style.color = "black";
                                Table1.Row2.SatHrsMins2.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263506443___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SatHrsMins2.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263506443___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SatHrsMins2.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263506443___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SatHrsMins2.enabled = false;
                            }
                        }
                    }

                    if (weekVal === 3) {
                      SessionLimitWeek3.value = payrollResult[i].weeklyHoursLimit;
                        //Populate dates for week 3 and validate
                        var dayVal3 = payrollResult[i].dayOfWeek;
                        if (dayVal3 === "SUNDAY") {
                            SunDate3.value = payrollResult[i].dayOfMonth;
                            Table1.Row3.SunHrsMins3.title = SunDate3.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row3.SunHrsMins3.title = SunDate3.value + " H";
                            } else {
                                Table1.Row3.SunHrsMins3.title = SunDate3.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647250___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SunHrsMins3.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647250___label').style.color = "black";
                                Table1.Row3.SunHrsMins3.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647250___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SunHrsMins3.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647250___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SunHrsMins3.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647250___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SunHrsMins3.enabled = false;
                            }
                        } else if (dayVal3 === "MONDAY") {
                            MonDate3.value = payrollResult[i].dayOfMonth;
                            Table1.Row3.MonHrsMins3.title = MonDate3.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row3.MonHrsMins3.title = MonDate3.value + " H";
                            } else {
                                Table1.Row3.MonHrsMins3.title = MonDate3.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647251___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.MonHrsMins3.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647251___label').style.color = "black";
                                Table1.Row3.MonHrsMins3.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647251___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.MonHrsMins3.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647251___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.MonHrsMins3.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647251___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.MonHrsMins3.enabled = false;
                            }
                        } else if (dayVal3 === "TUESDAY") {
                            TuesDate3.value = payrollResult[i].dayOfMonth;
                            Table1.Row3.TueHrsMins3.title = TuesDate3.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row3.TueHrsMins3.title = TuesDate3.value + " H";
                            } else {
                                Table1.Row3.TueHrsMins3.title = TuesDate3.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647252___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.TueHrsMins3.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647252___label').style.color = "black";
                                Table1.Row3.TueHrsMins3.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647252___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.TueHrsMins3.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647252___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.TueHrsMins3.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647252___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.TueHrsMins3.enabled = false;
                            }
                        } else if (dayVal3 === "WEDNESDAY") {
                            WedDate3.value = payrollResult[i].dayOfMonth;
                            Table1.Row3.WedHrsMins3.title = WedDate3.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row3.WedHrsMins3.title = WedDate3.value + " H";
                            } else {
                                Table1.Row3.WedHrsMins3.title = WedDate3.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647253___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.WedHrsMins3.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647253___label').style.color = "black";
                                Table1.Row3.WedHrsMins3.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647253___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.WedHrsMins3.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647253___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.WedHrsMins3.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647253___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.WedHrsMins3.enabled = false;
                            }
                        } else if (dayVal3 === "THURSDAY") {
                            ThurDate3.value = payrollResult[i].dayOfMonth;
                            Table1.Row3.ThuHrsMins3.title = ThurDate3.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row3.ThuHrsMins3.title = ThurDate3.value + " H";
                            } else {
                                Table1.Row3.ThuHrsMins3.title = ThurDate3.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647254___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.ThuHrsMins3.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647254___label').style.color = "black";
                                Table1.Row3.ThuHrsMins3.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647254___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.ThuHrsMins3.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647254___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.ThuHrsMins3.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647254___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.ThuHrsMins3.enabled = false;
                            }
                        } else if (dayVal3 === "FRIDAY") {
                            FridayDate3.value = payrollResult[i].dayOfMonth;
                            Table1.Row3.FriHrsMins3.title = FridayDate3.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row3.FriHrsMins3.title = FridayDate3.value + " H";
                            } else {
                                Table1.Row3.FriHrsMins3.title = FridayDate3.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647255___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.FriHrsMins3.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647255___label').style.color = "black";
                                Table1.Row3.FriHrsMins3.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647255___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.FriHrsMins3.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647255___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.FriHrsMins3.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647255___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.FriHrsMins3.enabled = false;
                            }
                        } else if (dayVal3 === "SATURDAY") {
                            SatDate3.value = payrollResult[i].dayOfMonth;
                            Table1.Row3.SatHrsMins3.title = SatDate3.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row3.SatHrsMins3.title = SatDate3.value + " H";
                            } else {
                                Table1.Row3.SatHrsMins3.title = SatDate3.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647256___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SatHrsMins3.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647256___label').style.color = "black";
                                Table1.Row3.SatHrsMins3.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647256___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SatHrsMins3.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647256___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SatHrsMins3.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647256___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SatHrsMins3.enabled = false;
                            }
                        }
                    }
                    if (weekVal === 4) {
                      SessionLimitWeek4.value = payrollResult[i].weeklyHoursLimit;
                        var dayVal4 = payrollResult[i].dayOfWeek;
                        if (dayVal4 === "SUNDAY") {
                            SunDate4.value = payrollResult[i].dayOfMonth;
                            Table1.Row4.SunHrsMins4.title = SunDate4.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row4.SunHrsMins4.title = SunDate4.value + " H";
                            } else {
                                Table1.Row4.SunHrsMins4.title = SunDate4.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656718___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SunHrsMins4.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656718___label').style.color = "black";
                                Table1.Row4.SunHrsMins4.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656718___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SunHrsMins4.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656718___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SunHrsMins4.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656718___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SunHrsMins4.enabled = false;
                            }
                        } else if (dayVal4 === "MONDAY") {
                            MonDate4.value = payrollResult[i].dayOfMonth;
                            Table1.Row4.MonHrsMins4.title = MonDate4.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row4.MonHrsMins4.title = MonDate4.value + " H";
                            } else {
                                Table1.Row4.MonHrsMins4.title = MonDate4.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656719___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.MonHrsMins4.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656719___label').style.color = "black";
                                Table1.Row4.MonHrsMins4.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656719___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.MonHrsMins4.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656719___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.MonHrsMins4.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656719___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.MonHrsMins4.enabled = false;
                            }
                        } else if (dayVal4 === "TUESDAY") {
                            TuesDate4.value = payrollResult[i].dayOfMonth;
                            Table1.Row4.TueHrsMins4.title = TuesDate4.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row4.TueHrsMins4.title = TuesDate4.value + " H";
                            } else {
                                Table1.Row4.TueHrsMins4.title = TuesDate4.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656720___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.TueHrsMins4.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656720___label').style.color = "black";
                                Table1.Row4.TueHrsMins4.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656720___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.TueHrsMins4.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656720___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.TueHrsMins4.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656720___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.TueHrsMins4.enabled = false;
                            }
                        } else if (dayVal4 === "WEDNESDAY") {
                            WedDate4.value = payrollResult[i].dayOfMonth;
                            Table1.Row4.WedHrsMins4.title = WedDate4.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row4.WedHrsMins4.title = WedDate4.value + " H";
                            } else {
                                Table1.Row4.WedHrsMins4.title = WedDate4.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656721___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.WedHrsMins4.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656721___label').style.color = "black";
                                Table1.Row4.WedHrsMins4.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656721___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.WedHrsMins4.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656721___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.WedHrsMins4.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656721___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.WedHrsMins4.enabled = false;
                            }
                        } else if (dayVal4 === "THURSDAY") {
                            ThurDate4.value = payrollResult[i].dayOfMonth;
                            Table1.Row4.ThuHrsMins4.title = ThurDate4.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row4.ThuHrsMins4.title = ThurDate4.value + " H";
                            } else {
                                Table1.Row4.ThuHrsMins4.title = ThurDate4.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656722___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.ThuHrsMins4.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656722___label').style.color = "black";
                                Table1.Row4.ThuHrsMins4.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656722___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.ThuHrsMins4.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656722___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.ThuHrsMins4.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656722___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.ThuHrsMins4.enabled = false;
                            }
                        } else if (dayVal4 === "FRIDAY") {
                            FridayDate4.value = payrollResult[i].dayOfMonth;
                            Table1.Row4.FriHrsMins4.title = FridayDate4.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row4.FriHrsMins4.title = FridayDate4.value + " H";
                            } else {
                                Table1.Row4.FriHrsMins4.title = FridayDate4.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656723___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.FriHrsMins4.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656723___label').style.color = "black";
                                Table1.Row4.FriHrsMins4.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656723___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.FriHrsMins4.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656723___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.FriHrsMins4.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656723___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.FriHrsMins4.enabled = false;
                            }
                        } else if (dayVal4 === "SATURDAY") {
                            SatDate4.value = payrollResult[i].dayOfMonth;
                            Table1.Row4.SatHrsMins4.title = SatDate4.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row4.SatHrsMins4.title = SatDate4.value + " H";
                            } else {
                                Table1.Row4.SatHrsMins4.title = SatDate4.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656724___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SatHrsMins4.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656724___label').style.color = "black";
                                Table1.Row4.SatHrsMins4.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656724___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SatHrsMins4.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656724___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SatHrsMins4.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656724___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SatHrsMins4.enabled = false;
                            }
                        }
                    }
                    if (weekVal === 5) {
                      SessionLimitWeek5.value = payrollResult[i].weeklyHoursLimit;
                        var dayVal5 = payrollResult[i].dayOfWeek;
                        if (dayVal5 === "SUNDAY") {
                            SunDate5.value = payrollResult[i].dayOfMonth;
                            Table1.Row5.SunHrsMins5.title = SunDate5.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row5.SunHrsMins5.title = SunDate5.value + " H";
                            } else {
                                Table1.Row5.SunHrsMins5.title = SunDate5.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666031___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SunHrsMins5.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666031___label').style.color = "black";
                                Table1.Row5.SunHrsMins5.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666031___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SunHrsMins5.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666031___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SunHrsMins5.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666031___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SunHrsMins5.enabled = false;
                            }
                        } else if (dayVal5 === "MONDAY") {
                            MonDate5.value = payrollResult[i].dayOfMonth;
                            Table1.Row5.MonHrsMins5.title = MonDate5.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row5.MonHrsMins5.title = MonDate5.value + " H";
                            } else {
                                Table1.Row5.MonHrsMins5.title = MonDate5.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666032___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.MonHrsMins5.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666032___label').style.color = "black";
                                Table1.Row5.MonHrsMins5.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666032___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.MonHrsMins5.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666032___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.MonHrsMins5.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666032___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.MonHrsMins5.enabled = false;
                            }
                        } else if (dayVal5 === "TUESDAY") {
                            TuesDate5.value = payrollResult[i].dayOfMonth;
                            Table1.Row5.TueHrsMins5.title = TuesDate5.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row5.TueHrsMins5.title = TuesDate5.value + " H";
                            } else {
                                Table1.Row5.TueHrsMins5.title = TuesDate5.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666033___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.TueHrsMins5.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666033___label').style.color = "black";
                                Table1.Row5.TueHrsMins5.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666033___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.TueHrsMins5.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666033___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.TueHrsMins5.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666033___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.TueHrsMins5.enabled = false;
                            }
                        } else if (dayVal5 === "WEDNESDAY") {
                            WedDate5.value = payrollResult[i].dayOfMonth;
                            Table1.Row5.WedHrsMins5.title = WedDate5.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row5.WedHrsMins5.title = WedDate5.value + " H";
                            } else {
                                Table1.Row5.WedHrsMins5.title = WedDate5.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666034___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.WedHrsMins5.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666034___label').style.color = "black";
                                Table1.Row5.WedHrsMins5.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666034___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.WedHrsMins5.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666034___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.WedHrsMins5.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666034___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.WedHrsMins5.enabled = false;
                            }
                         
                          if(weekVal == 5 && yearVal == "2023" && monthVal == 2){
                            
                            document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666034___label').style.color = "black";
                            Table1.Row5.WedHrsMins5.enabled = true;
                          }
                        } else if (dayVal5 === "THURSDAY") {
                            ThurDate5.value = payrollResult[i].dayOfMonth;
                            Table1.Row5.ThuHrsMins5.title = ThurDate5.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row5.ThuHrsMins5.title = ThurDate5.value + " H";
                            } else {
                                Table1.Row5.ThuHrsMins5.title = ThurDate5.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666035___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.ThuHrsMins5.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666035___label').style.color = "black";
                                Table1.Row5.ThuHrsMins5.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666035___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.ThuHrsMins5.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666035___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.ThuHrsMins5.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666035___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.ThuHrsMins5.enabled = false;
                            }
                        } else if (dayVal5 === "FRIDAY") {
                            FridayDate5.value = payrollResult[i].dayOfMonth;
                            Table1.Row5.FriHrsMins5.title = FridayDate5.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row5.FriHrsMins5.title = FridayDate5.value + " H";
                            } else {
                                Table1.Row5.FriHrsMins5.title = FridayDate5.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666036___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.FriHrsMins5.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666036___label').style.color = "black";
                                Table1.Row5.FriHrsMins5.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666036___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.FriHrsMins5.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666036___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.FriHrsMins5.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666036___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.FriHrsMins5.enabled = false;
                            }
                        } else if (dayVal5 === "SATURDAY") {
                            SatDate5.value = payrollResult[i].dayOfMonth;
                            Table1.Row5.SatHrsMins5.title = SatDate5.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row5.SatHrsMins5.title = SatDate5.value + " H";
                            } else {
                                Table1.Row5.SatHrsMins5.title = SatDate5.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666037___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SatHrsMins5.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666037___label').style.color = "black";
                                Table1.Row5.SatHrsMins5.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666037___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SatHrsMins5.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666037___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SatHrsMins5.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666037___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SatHrsMins5.enabled = false;
                            }
                        }
                    }
                    if (weekVal === 6) {
                      SessionLimitWeek6.value = payrollResult[i].weeklyHoursLimit;
                        var dayVal6 = payrollResult[i].dayOfWeek;
                        if (dayVal6 === "SUNDAY") {
                            SunDate6.value = payrollResult[i].dayOfMonth;
                            Table1.Row6.SunHrsMins6.title = SunDate6.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row6.SunHrsMins6.title = SunDate6.value + " H";
                            } else {
                                Table1.Row6.SunHrsMins6.title = SunDate6.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641967___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SunHrsMins6.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641967___label').style.color = "black";
                                Table1.Row6.SunHrsMins6.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641967___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SunHrsMins6.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641967___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SunHrsMins6.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641967___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SunHrsMins6.enabled = false;
                            }
                        } else if (dayVal6 === "MONDAY") {
                            MonDate6.value = payrollResult[i].dayOfMonth;
                            Table1.Row6.MonHrsMins6.title = MonDate6.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row6.MonHrsMins6.title = MonDate6.value + " H";
                            } else {
                                Table1.Row6.MonHrsMins6.title = MonDate6.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641968___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.MonHrsMins6.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641968___label').style.color = "black";
                                Table1.Row6.MonHrsMins6.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641968___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.MonHrsMins6.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641968___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.MonHrsMins6.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641968___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.MonHrsMins6.enabled = false;
                              //quick fix to handle 2022 Aug Included day
                              if(Month.value == "7" && Year.value == "2022" && MonDate6.value == "1"){
                                  Table1.Row6.MonHrsMins6.enabled = true;
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641968___label').style.color = "black";
                                }
                            }                           
                          //quick fix to handle 2023 April Included day
                              if(Month.value == "4" && Year.value == "2023" && MonDate6.value == "1"){
                                Table1.Row6.MonHrsMins6.enabled = true;
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641968___label').style.color = "black";
                                }
                        } else if (dayVal6 === "TUESDAY") {
                            TuesDate6.value = payrollResult[i].dayOfMonth;
                            Table1.Row6.TueHrsMins6.title = TuesDate6.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row6.TueHrsMins6.title = TuesDate6.value + " H";
                            } else {
                                Table1.Row6.TueHrsMins6.title = TuesDate6.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641969___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.TueHrsMins6.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641969___label').style.color = "black";
                                Table1.Row6.TueHrsMins6.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641969___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.TueHrsMins6.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641969___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.TueHrsMins6.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641969___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.TueHrsMins6.enabled = false;
                            }debugger;
                          //quick fix to handle july included date 08022023
                          if(Month.value == "7" && Year.value == "2023" && TuesDate6.value == "1"){
                                Table1.Row6.TueHrsMins6.enabled = true;
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641969___label').style.color = "black";
                                }
                        } else if (dayVal6 === "WEDNESDAY") {
                            WedDate6.value = payrollResult[i].dayOfMonth;
                            Table1.Row6.WedHrsMins6.title = WedDate6.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row6.WedHrsMins6.title = WedDate6.value + " H";
                            } else {
                                Table1.Row6.WedHrsMins6.title = WedDate6.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641970___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.WedHrsMins6.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641970___label').style.color = "black";
                                Table1.Row6.WedHrsMins6.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641970___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.WedHrsMins6.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641970___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.WedHrsMins6.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641970___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.WedHrsMins6.enabled = false;
                            }
                        } else if (dayVal6 === "THURSDAY") {
                            ThurDate6.value = payrollResult[i].dayOfMonth;
                            Table1.Row6.ThuHrsMins6.title = ThurDate6.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row6.ThuHrsMins6.title = ThurDate6.value + " H";
                            } else {
                                Table1.Row6.ThuHrsMins6.title = ThurDate6.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641971___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.ThuHrsMins6.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641971___label').style.color = "black";
                                Table1.Row6.ThuHrsMins6.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641971___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.ThuHrsMins6.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641971___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.ThuHrsMins6.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641971___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.ThuHrsMins6.enabled = false;
                            }
                        } else if (dayVal6 === "FRIDAY") {
                            FridayDate6.value = payrollResult[i].dayOfMonth;
                            Table1.Row6.FriHrsMins6.title = FridayDate6.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row6.FriHrsMins6.title = FridayDate6.value + " H";
                            } else {
                                Table1.Row6.FriHrsMins6.title = FridayDate6.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641972___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.FriHrsMins6.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641972___label').style.color = "black";
                                Table1.Row6.FriHrsMins6.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641972___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.FriHrsMins6.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641972___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.FriHrsMins6.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641972___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.FriHrsMins6.enabled = false;
                            }
                        } else if (dayVal6 === "SATURDAY") {
                            SatDate6.value = payrollResult[i].dayOfMonth;
                            Table1.Row6.SatHrsMins6.title = SatDate6.value;
                            //Check is public holiday - Append H if holiday
                            if (payrollResult[i].isPublicHoliday === true) {
                                Table1.Row6.SatHrsMins6.title = SatDate6.value + " H";
                            } else {
                                Table1.Row6.SatHrsMins6.title = SatDate6.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641973___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SatHrsMins6.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641973___label').style.color = "black";
                                Table1.Row6.SatHrsMins6.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641973___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SatHrsMins6.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (payrollResult[i].isPublicHoliday === true && payrollResult[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641973___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SatHrsMins6.enabled = true;
                            }
                            //Check is included - disable if true
                            if (payrollResult[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641973___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SatHrsMins6.enabled = false;
                            }
                        }
                    }

                }
               
            }
        }

    });
}
function clearGridValues(){
SunHrsMins1.value = "";
MonHrsMins1.value = "";
TueHrsMins1.value = "";
WedHrsMins1.value = "";
ThuHrsMins1.value = "";
FriHrsMins1.value = "";
SatHrsMins1.value = "";
SatHrsMins2.value = "";
FriHrsMins2.value = "";
ThuHrsMins2.value = "";
WedHrsMins2.value = "";
TueHrsMins2.value = "";
MonHrsMins2.value = "";
SunHrsMins2.value = "";
SatHrsMins3.value = "";
FriHrsMins3.value = "";
ThuHrsMins3.value = "";
WedHrsMins3.value = "";
TueHrsMins3.value = "";
MonHrsMins3.value = "";
SunHrsMins3.value = "";
SatHrsMins4.value = "";
FriHrsMins4.value = "";
ThuHrsMins4.value = "";
WedHrsMins4.value = "";
TueHrsMins4.value = "";
MonHrsMins4.value = "";
SunHrsMins4.value = "";
SatHrsMins5.value = "";
FriHrsMins5.value = "";
ThuHrsMins5.value = "";
WedHrsMins5.value = "";
TueHrsMins5.value = "";
MonHrsMins5.value = "";
SunHrsMins5.value = "";
SatHrsMins6.value = "";
FriHrsMins6.value = "";
ThuHrsMins6.value = "";
WedHrsMins6.value = "";
TueHrsMins6.value = "";
MonHrsMins6.value = "";
SunHrsMins6.value = "";
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Year_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Year_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
var  monthVal = Month.value;
var fiscalVal = FiscalYear.value;
var yearVal = Year.value;

    $.ajax({
            type: 'GET',
            url: "/bin/getPayrollCalendar?action=PAYROLL_CALENDAR",

            data: {
                month: monthVal,
                year: yearVal,
                fiscalYear: fiscalVal
            },

            dataType: 'json',

            success: function(payrollResult) {
              

                if (payrollResult.length !== 0) {
                   
                    var k;
                    
                   var rowcountRemoveAll1 = Row1.instanceManager.instanceCount;
                    for (k = 0; k < rowcountRemoveAll1; k++) {
                        Row1.instanceManager.removeInstance(Row1.instanceIndex);
                    }
                    Row1.instanceManager.removeInstance((Row1.instanceManager.instanceCount) - 1);
                    var i;
                    
                    for (i = 0; i < payrollResult.length; i++) {
                        Row1.instanceManager.addInstance();
                        Row1.instanceManager.instances[i].Day.value = payrollResult[i].dayOfWeek;
                        Row1.instanceManager.instances[i].WeekDate.value = payrollResult[i].date;
                      
                        if(payrollResult[i].isIncludedDay === true){
						  Row1.instanceManager.instances[i].Hours.enabled = false;
                          Row1.instanceManager.instances[i].Remarks.value = "This row is not part of the pay period";
                          //Row1.instanceManager.instances[i].enabled = false;
                          
                        }
                      	if(payrollResult[i].isPublicHoliday === true){
							Row1.instanceManager.instances[i].WeekDate.value = payrollResult[i].date.concat("H");
                        }
                        /*Row1.instanceManager.instances[i].Hours.value = payrollResult[i].isIncludedDay;
                        Row1.instanceManager.instances[i].Minutes.value = payrollResult[i].isPublicHoliday;*/
                        
                    }
                    var rowcount = Row1.instanceManager.instanceCount;
                    Row1.instanceManager.removeInstance(rowcount - 1);
                 
                }
            }
			});
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_ClassTaken_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_ClassTaken_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  if(ClassTaken.value == "1150"){
    Form_Title.value = "Instructional Student Assistant Timesheet";
  }
  if(ClassTaken.value == "1151"){
    Form_Title.value = "Instructional Workstudy Student Timesheet";
  }
  if(ClassTaken.value == "1868"){
    Form_Title.value = "Student Assistant NRA Timesheet";
  }
  if(ClassTaken.value == "1870"){
    Form_Title.value = "Student Assistant Timesheet";
  }
  if(ClassTaken.value == "1871"){
    Form_Title.value = "Workstudy Timesheet On-Campus";
  }
  if(ClassTaken.value == "1872"){
    Form_Title.value = "Workstudy Timesheet Off-Campus";
  }
  if(ClassTaken.value == "1874"){
    Form_Title.value = "Alternate Student Assistant Timesheet";
  }
  if(ClassTaken.value == "1875"){
    Form_Title.value = "Alternate Workstudy Timesheet On-Campus";
  }
  if(ClassTaken.value == "1876"){
    Form_Title.value = "Alternate Workstudy Timesheet Off-Campus";
  }
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_HiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_HiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible ="false";
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_SSN_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_SSN_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible= false;
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_TimekeeperFieldVal_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_TimekeeperFieldVal_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.value="STU_TK_PRI";
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_fiscalStartMonth_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_fiscalStartMonth_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.value="7";
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_fiscalEndMonth_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_fiscalEndMonth_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.value="6";
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Initiator_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Initiator_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  Initiator.value = "Initiator";
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_workflow_initiator_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_workflow_initiator_init0 = function (scope) {
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
    }
});
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_timesheet_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_timesheet_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value === null){
  this.visible = false;
}else{
  this.visible = true;
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_timesheet_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_timesheet_init1 = function (scope) {
    with(this) {
        with(scope) {
            
debugger;
var resultArray = JSON.parse(dateJsonArray.value);   

if(StageIndicator.value !== null && resultArray.length !== 0){
for (i = 0; i < resultArray.length; i++) {
                    var weekVal = resultArray[i].weekInSession;
                    if (weekVal === 1) {
                        //Populate dates for week 1 and validate
                        dayVal = resultArray[i].dayOfWeek;
                        if (dayVal === "SUNDAY") {
                            SunDate1.value = resultArray[i].dayOfMonth;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {

                                Table1.Row1.SunHrsMins1.title = SunDate1.value + " H";
                            } else {
                                Table1.Row1.SunHrsMins1.title = SunDate1.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SunHrsMins1.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-tableItem___label').style.color = "black";
                                Table1.Row1.SunHrsMins1.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SunHrsMins1.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SunHrsMins1.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SunHrsMins1.enabled = false;
                            }


                        } else if (dayVal === "MONDAY") {
                            MonDate1.value = resultArray[i].dayOfMonth;
                            Table1.Row1.MonHrsMins1.title = MonDate1.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row1.MonHrsMins1.title = MonDate1.value + " H";
                            } else {
                                Table1.Row1.MonHrsMins1.title = MonDate1.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263531474___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.MonHrsMins1.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263531474___label').style.color = "black";
                                Table1.Row1.MonHrsMins1.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263531474___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.MonHrsMins1.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263531474___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.MonHrsMins1.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263531474___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.MonHrsMins1.enabled = false;
                            }
                        } else if (dayVal === "TUESDAY") {
                            TuesDate1.value = resultArray[i].dayOfMonth;
                            Table1.Row1.TueHrsMins1.title = TuesDate1.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row1.TueHrsMins1.title = TuesDate1.value + " H";
                            } else {
                                Table1.Row1.TueHrsMins1.title = TuesDate1.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headeritem1621263526___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.TueHrsMins1.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headeritem1621263526___label').style.color = "black";
                                Table1.Row1.TueHrsMins1.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headeritem1621263526___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.TueHrsMins1.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headeritem1621263526___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.TueHrsMins1.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headeritem1621263526___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.TueHrsMins1.enabled = false;
                            }
                        } else if (dayVal === "WEDNESDAY") {
                            WedDate1.value = resultArray[i].dayOfMonth;
                            Table1.Row1.WedHrsMins1.title = WedDate1.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row1.WedHrsMins1.title = WedDate1.value + " H";
                            } else {
                                Table1.Row1.WedHrsMins1.title = WedDate1.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263518199___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.WedHrsMins1.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263518199___label').style.color = "black";
                                Table1.Row1.WedHrsMins1.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263518199___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.WedHrsMins1.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263518199___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.WedHrsMins1.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263518199___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.WedHrsMins1.enabled = false;
                            }
                        } else if (dayVal === "THURSDAY") {
                            ThurDate1.value = resultArray[i].dayOfMonth;
                            Table1.Row1.ThuHrsMins1.title = ThurDate1.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row1.ThuHrsMins1.title = ThurDate1.value + " H";
                            } else {
                                Table1.Row1.ThuHrsMins1.title = ThurDate1.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263513660___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.ThuHrsMins1.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263513660___label').style.color = "black";
                                Table1.Row1.ThuHrsMins1.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263513660___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.ThuHrsMins1.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263513660___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.ThuHrsMins1.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263513660___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.ThuHrsMins1.enabled = false;
                            }
                        } else if (dayVal === "FRIDAY") {
                            FridayDate1.value = resultArray[i].dayOfMonth;
                            Table1.Row1.FriHrsMins1.title = FridayDate1.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row1.FriHrsMins1.title = FridayDate1.value + " H";
                            } else {
                                Table1.Row1.FriHrsMins1.title = FridayDate1.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263509955___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.FriHrsMins1.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263509955___label').style.color = "black";
                                Table1.Row1.FriHrsMins1.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263509955___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.FriHrsMins1.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263509955___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.FriHrsMins1.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263509955___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.FriHrsMins1.enabled = false;
                            }
                        } else if (dayVal === "SATURDAY") {
                            SatDate1.value = resultArray[i].dayOfMonth;
                            Table1.Row1.SatHrsMins1.title = SatDate1.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row1.SatHrsMins1.title = SatDate1.value + " H";
                            } else {
                                Table1.Row1.SatHrsMins1.title = SatDate1.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263506306___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SatHrsMins1.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263506306___label').style.color = "black";
                                Table1.Row1.SatHrsMins1.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263506306___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SatHrsMins1.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263506306___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SatHrsMins1.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1-headerItem1621263506306___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row1.SatHrsMins1.enabled = false;
                            }
                        }
                    }
                    if (weekVal === 2) {
                        //Populate dates of week 2 and validate
                        var dayVal2 = resultArray[i].dayOfWeek;
                        if (dayVal2 === "SUNDAY") {
                            SunDate2.value = resultArray[i].dayOfMonth;
                            Table1.Row2.SunHrsMins2.title = SunDate2.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row2.SunHrsMins2.title = SunDate2.value + " H";
                            } else {
                                Table1.Row2.SunHrsMins2.title = SunDate2.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SunHrsMins2.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-tableItem___label').style.color = "black";
                                Table1.Row2.SunHrsMins2.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SunHrsMins2.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SunHrsMins2.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-tableItem___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SunHrsMins2.enabled = false;
                            }
                        } else if (dayVal2 === "MONDAY") {
                            MonDate2.value = resultArray[i].dayOfMonth;
                            Table1.Row2.MonHrsMins2.title = MonDate2.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row2.MonHrsMins2.title = MonDate2.value + " H";
                            } else {
                                Table1.Row2.MonHrsMins2.title = MonDate2.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263531617___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.MonHrsMins2.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263531617___label').style.color = "black";
                                Table1.Row2.MonHrsMins2.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263531617___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.MonHrsMins2.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263531617___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.MonHrsMins2.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263531617___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.MonHrsMins2.enabled = false;
                            }
                        } else if (dayVal2 === "TUESDAY") {
                            TuesDate2.value = resultArray[i].dayOfMonth;
                            Table1.Row2.TueHrsMins2.title = TuesDate2.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row2.TueHrsMins2.title = TuesDate2.value + " H";
                            } else {
                                Table1.Row2.TueHrsMins2.title = TuesDate2.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263526961___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.TueHrsMins2.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263526961___label').style.color = "black";
                                Table1.Row2.TueHrsMins2.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263526961___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.TueHrsMins2.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263526961___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.TueHrsMins2.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263526961___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.TueHrsMins2.enabled = false;
                            }
                        } else if (dayVal2 === "WEDNESDAY") {
                            WedDate2.value = resultArray[i].dayOfMonth;
                            Table1.Row2.WedHrsMins2.title = WedDate2.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row2.WedHrsMins2.title = WedDate2.value + " H";
                            } else {
                                Table1.Row2.WedHrsMins2.title = WedDate2.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263518450___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.WedHrsMins2.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263518450___label').style.color = "black";
                                Table1.Row2.WedHrsMins2.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263518450___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.WedHrsMins2.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263518450___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.WedHrsMins2.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263518450___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.WedHrsMins2.enabled = false;
                            }
                        } else if (dayVal2 === "THURSDAY") {
                            ThurDate2.value = resultArray[i].dayOfMonth;
                            Table1.Row2.ThuHrsMins2.title = ThurDate2.value;

                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row2.ThuHrsMins2.title = ThurDate2.value + " H";
                            } else {
                                Table1.Row2.ThuHrsMins2.title = ThurDate2.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263513816___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.ThuHrsMins2.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263513816___label').style.color = "black";
                                Table1.Row2.ThuHrsMins2.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263513816___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.ThuHrsMins2.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263513816___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.ThuHrsMins2.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263513816___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.ThuHrsMins2.enabled = false;
                            }

                        } else if (dayVal2 === "FRIDAY") {
                            FridayDate2.value = resultArray[i].dayOfMonth;
                            Table1.Row2.FriHrsMins2.title = FridayDate2.value;
                            debugger;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row2.FriHrsMins2.title = FridayDate2.value + " H";
                            } else {
                                Table1.Row2.FriHrsMins2.title = FridayDate2.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263510092___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.FriHrsMins2.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263510092___label').style.color = "black";
                                Table1.Row2.FriHrsMins2.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263510092___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.FriHrsMins2.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263510092___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.FriHrsMins2.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263510092___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.FriHrsMins2.enabled = false;
                            }
                        } else if (dayVal2 === "SATURDAY") {
                            SatDate2.value = resultArray[i].dayOfMonth;
                            Table1.Row2.SatHrsMins2.title = SatDate2.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row2.SatHrsMins2.title = SatDate2.value + " H";
                            } else {
                                Table1.Row2.SatHrsMins2.title = SatDate2.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263506443___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SatHrsMins2.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263506443___label').style.color = "black";
                                Table1.Row2.SatHrsMins2.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263506443___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SatHrsMins2.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263506443___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SatHrsMins2.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row2-headerItem1621263506443___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row2.SatHrsMins2.enabled = false;
                            }
                        }
                    }

                    if (weekVal === 3) {
                        //Populate dates for week 3 and validate
                        var dayVal3 = resultArray[i].dayOfWeek;
                        if (dayVal3 === "SUNDAY") {
                            SunDate3.value = resultArray[i].dayOfMonth;
                            Table1.Row3.SunHrsMins3.title = SunDate3.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row3.SunHrsMins3.title = SunDate3.value + " H";
                            } else {
                                Table1.Row3.SunHrsMins3.title = SunDate3.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647250___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SunHrsMins3.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647250___label').style.color = "black";
                                Table1.Row3.SunHrsMins3.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647250___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SunHrsMins3.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647250___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SunHrsMins3.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647250___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SunHrsMins3.enabled = false;
                            }
                        } else if (dayVal3 === "MONDAY") {
                            MonDate3.value = resultArray[i].dayOfMonth;
                            Table1.Row3.MonHrsMins3.title = MonDate3.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row3.MonHrsMins3.title = MonDate3.value + " H";
                            } else {
                                Table1.Row3.MonHrsMins3.title = MonDate3.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647251___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.MonHrsMins3.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647251___label').style.color = "black";
                                Table1.Row3.MonHrsMins3.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647251___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.MonHrsMins3.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647251___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.MonHrsMins3.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647251___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.MonHrsMins3.enabled = false;
                            }
                        } else if (dayVal3 === "TUESDAY") {
                            TuesDate3.value = resultArray[i].dayOfMonth;
                            Table1.Row3.TueHrsMins3.title = TuesDate3.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row3.TueHrsMins3.title = TuesDate3.value + " H";
                            } else {
                                Table1.Row3.TueHrsMins3.title = TuesDate3.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647252___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.TueHrsMins3.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647252___label').style.color = "black";
                                Table1.Row3.TueHrsMins3.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647252___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.TueHrsMins3.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647252___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.TueHrsMins3.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647252___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.TueHrsMins3.enabled = false;
                            }
                        } else if (dayVal3 === "WEDNESDAY") {
                            WedDate3.value = resultArray[i].dayOfMonth;
                            Table1.Row3.WedHrsMins3.title = WedDate3.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row3.WedHrsMins3.title = WedDate3.value + " H";
                            } else {
                                Table1.Row3.WedHrsMins3.title = WedDate3.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647253___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.WedHrsMins3.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647253___label').style.color = "black";
                                Table1.Row3.WedHrsMins3.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647253___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.WedHrsMins3.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647253___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.WedHrsMins3.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647253___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.WedHrsMins3.enabled = false;
                            }
                        } else if (dayVal3 === "THURSDAY") {
                            ThurDate3.value = resultArray[i].dayOfMonth;
                            Table1.Row3.ThuHrsMins3.title = ThurDate3.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row3.ThuHrsMins3.title = ThurDate3.value + " H";
                            } else {
                                Table1.Row3.ThuHrsMins3.title = ThurDate3.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647254___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.ThuHrsMins3.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647254___label').style.color = "black";
                                Table1.Row3.ThuHrsMins3.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647254___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.ThuHrsMins3.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647254___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.ThuHrsMins3.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647254___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.ThuHrsMins3.enabled = false;
                            }
                        } else if (dayVal3 === "FRIDAY") {
                            FridayDate3.value = resultArray[i].dayOfMonth;
                            Table1.Row3.FriHrsMins3.title = FridayDate3.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row3.FriHrsMins3.title = FridayDate3.value + " H";
                            } else {
                                Table1.Row3.FriHrsMins3.title = FridayDate3.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647255___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.FriHrsMins3.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647255___label').style.color = "black";
                                Table1.Row3.FriHrsMins3.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647255___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.FriHrsMins3.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647255___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.FriHrsMins3.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647255___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.FriHrsMins3.enabled = false;
                            }
                        } else if (dayVal3 === "SATURDAY") {
                            SatDate3.value = resultArray[i].dayOfMonth;
                            Table1.Row3.SatHrsMins3.title = SatDate3.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row3.SatHrsMins3.title = SatDate3.value + " H";
                            } else {
                                Table1.Row3.SatHrsMins3.title = SatDate3.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647256___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SatHrsMins3.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647256___label').style.color = "black";
                                Table1.Row3.SatHrsMins3.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647256___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SatHrsMins3.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647256___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SatHrsMins3.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263647249-tableItem1621263647256___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row3.SatHrsMins3.enabled = false;
                            }
                        }
                    }
                    if (weekVal === 4) {
                        var dayVal4 = resultArray[i].dayOfWeek;
                        if (dayVal4 === "SUNDAY") {
                            SunDate4.value = resultArray[i].dayOfMonth;
                            Table1.Row4.SunHrsMins4.title = SunDate4.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row4.SunHrsMins4.title = SunDate4.value + " H";
                            } else {
                                Table1.Row4.SunHrsMins4.title = SunDate4.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656718___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SunHrsMins4.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656718___label').style.color = "black";
                                Table1.Row4.SunHrsMins4.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656718___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SunHrsMins4.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656718___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SunHrsMins4.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656718___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SunHrsMins4.enabled = false;
                            }
                        } else if (dayVal4 === "MONDAY") {
                            MonDate4.value = resultArray[i].dayOfMonth;
                            Table1.Row4.MonHrsMins4.title = MonDate4.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row4.MonHrsMins4.title = MonDate4.value + " H";
                            } else {
                                Table1.Row4.MonHrsMins4.title = MonDate4.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656719___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.MonHrsMins4.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656719___label').style.color = "black";
                                Table1.Row4.MonHrsMins4.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656719___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.MonHrsMins4.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656719___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.MonHrsMins4.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656719___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.MonHrsMins4.enabled = false;
                            }
                        } else if (dayVal4 === "TUESDAY") {
                            TuesDate4.value = resultArray[i].dayOfMonth;
                            Table1.Row4.TueHrsMins4.title = TuesDate4.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row4.TueHrsMins4.title = TuesDate4.value + " H";
                            } else {
                                Table1.Row4.TueHrsMins4.title = TuesDate4.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656720___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.TueHrsMins4.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656720___label').style.color = "black";
                                Table1.Row4.TueHrsMins4.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656720___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.TueHrsMins4.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656720___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.TueHrsMins4.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656720___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.TueHrsMins4.enabled = false;
                            }
                        } else if (dayVal4 === "WEDNESDAY") {
                            WedDate4.value = resultArray[i].dayOfMonth;
                            Table1.Row4.WedHrsMins4.title = WedDate4.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row4.WedHrsMins4.title = WedDate4.value + " H";
                            } else {
                                Table1.Row4.WedHrsMins4.title = WedDate4.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656721___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.WedHrsMins4.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656721___label').style.color = "black";
                                Table1.Row4.WedHrsMins4.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656721___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.WedHrsMins4.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656721___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.WedHrsMins4.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656721___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.WedHrsMins4.enabled = false;
                            }
                        } else if (dayVal4 === "THURSDAY") {
                            ThurDate4.value = resultArray[i].dayOfMonth;
                            Table1.Row4.ThuHrsMins4.title = ThurDate4.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row4.ThuHrsMins4.title = ThurDate4.value + " H";
                            } else {
                                Table1.Row4.ThuHrsMins4.title = ThurDate4.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656722___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.ThuHrsMins4.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656722___label').style.color = "black";
                                Table1.Row4.ThuHrsMins4.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656722___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.ThuHrsMins4.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656722___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.ThuHrsMins4.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656722___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.ThuHrsMins4.enabled = false;
                            }
                        } else if (dayVal4 === "FRIDAY") {
                            FridayDate4.value = resultArray[i].dayOfMonth;
                            Table1.Row4.FriHrsMins4.title = FridayDate4.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row4.FriHrsMins4.title = FridayDate4.value + " H";
                            } else {
                                Table1.Row4.FriHrsMins4.title = FridayDate4.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656723___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.FriHrsMins4.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656723___label').style.color = "black";
                                Table1.Row4.FriHrsMins4.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656723___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.FriHrsMins4.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656723___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.FriHrsMins4.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656723___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.FriHrsMins4.enabled = false;
                            }
                        } else if (dayVal4 === "SATURDAY") {
                            SatDate4.value = resultArray[i].dayOfMonth;
                            Table1.Row4.SatHrsMins4.title = SatDate4.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row4.SatHrsMins4.title = SatDate4.value + " H";
                            } else {
                                Table1.Row4.SatHrsMins4.title = SatDate4.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656724___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SatHrsMins4.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656724___label').style.color = "black";
                                Table1.Row4.SatHrsMins4.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656724___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SatHrsMins4.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656724___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SatHrsMins4.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263656717-tableItem1621263656724___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row4.SatHrsMins4.enabled = false;
                            }
                        }
                    }
                    if (weekVal === 5) {
                        var dayVal5 = resultArray[i].dayOfWeek;
                        if (dayVal5 === "SUNDAY") {
                            SunDate5.value = resultArray[i].dayOfMonth;
                            Table1.Row5.SunHrsMins5.title = SunDate5.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row5.SunHrsMins5.title = SunDate5.value + " H";
                            } else {
                                Table1.Row5.SunHrsMins5.title = SunDate5.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666031___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SunHrsMins5.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666031___label').style.color = "black";
                                Table1.Row5.SunHrsMins5.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666031___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SunHrsMins5.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666031___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SunHrsMins5.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666031___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SunHrsMins5.enabled = false;
                            }
                        } else if (dayVal5 === "MONDAY") {
                            MonDate5.value = resultArray[i].dayOfMonth;
                            Table1.Row5.MonHrsMins5.title = MonDate5.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row5.MonHrsMins5.title = MonDate5.value + " H";
                            } else {
                                Table1.Row5.MonHrsMins5.title = MonDate5.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666032___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.MonHrsMins5.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666032___label').style.color = "black";
                                Table1.Row5.MonHrsMins5.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666032___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.MonHrsMins5.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666032___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.MonHrsMins5.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666032___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.MonHrsMins5.enabled = false;
                            }
                        } else if (dayVal5 === "TUESDAY") {
                            TuesDate5.value = resultArray[i].dayOfMonth;
                            Table1.Row5.TueHrsMins5.title = TuesDate5.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row5.TueHrsMins5.title = TuesDate5.value + " H";
                            } else {
                                Table1.Row5.TueHrsMins5.title = TuesDate5.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666033___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.TueHrsMins5.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666033___label').style.color = "black";
                                Table1.Row5.TueHrsMins5.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666033___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.TueHrsMins5.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666033___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.TueHrsMins5.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666033___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.TueHrsMins5.enabled = false;
                            }
                        } else if (dayVal5 === "WEDNESDAY") {
                            WedDate5.value = resultArray[i].dayOfMonth;
                            Table1.Row5.WedHrsMins5.title = WedDate5.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row5.WedHrsMins5.title = WedDate5.value + " H";
                            } else {
                                Table1.Row5.WedHrsMins5.title = WedDate5.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666034___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.WedHrsMins5.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666034___label').style.color = "black";
                                Table1.Row5.WedHrsMins5.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666034___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.WedHrsMins5.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666034___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.WedHrsMins5.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666034___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.WedHrsMins5.enabled = false;
                            }
                        } else if (dayVal5 === "THURSDAY") {
                            ThurDate5.value = resultArray[i].dayOfMonth;
                            Table1.Row5.ThuHrsMins5.title = ThurDate5.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row5.ThuHrsMins5.title = ThurDate5.value + " H";
                            } else {
                                Table1.Row5.ThuHrsMins5.title = ThurDate5.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666035___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.ThuHrsMins5.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666035___label').style.color = "black";
                                Table1.Row5.ThuHrsMins5.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666035___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.ThuHrsMins5.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666035___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.ThuHrsMins5.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666035___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.ThuHrsMins5.enabled = false;
                            }
                        } else if (dayVal5 === "FRIDAY") {
                            FridayDate5.value = resultArray[i].dayOfMonth;
                            Table1.Row5.FriHrsMins5.title = FridayDate5.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row5.FriHrsMins5.title = FridayDate5.value + " H";
                            } else {
                                Table1.Row5.FriHrsMins5.title = FridayDate5.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666036___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.FriHrsMins5.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666036___label').style.color = "black";
                                Table1.Row5.FriHrsMins5.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666036___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.FriHrsMins5.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666036___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.FriHrsMins5.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666036___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.FriHrsMins5.enabled = false;
                            }
                        } else if (dayVal5 === "SATURDAY") {
                            SatDate5.value = resultArray[i].dayOfMonth;
                            Table1.Row5.SatHrsMins5.title = SatDate5.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row5.SatHrsMins5.title = SatDate5.value + " H";
                            } else {
                                Table1.Row5.SatHrsMins5.title = SatDate5.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666037___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SatHrsMins5.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666037___label').style.color = "black";
                                Table1.Row5.SatHrsMins5.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666037___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SatHrsMins5.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666037___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SatHrsMins5.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263666030-tableItem1621263666037___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row5.SatHrsMins5.enabled = false;
                            }
                        }
                    }
                    if (weekVal === 6) {
                        var dayVal6 = resultArray[i].dayOfWeek;
                        if (dayVal6 === "SUNDAY") {
                            SunDate6.value = resultArray[i].dayOfMonth;
                            Table1.Row6.SunHrsMins6.title = SunDate6.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row6.SunHrsMins6.title = SunDate6.value + " H";
                            } else {
                                Table1.Row6.SunHrsMins6.title = SunDate6.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641967___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SunHrsMins6.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641967___label').style.color = "black";
                                Table1.Row6.SunHrsMins6.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641967___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SunHrsMins6.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641967___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SunHrsMins6.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641967___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SunHrsMins6.enabled = false;
                            }
                        } else if (dayVal6 === "MONDAY") {
                            MonDate6.value = resultArray[i].dayOfMonth;
                            Table1.Row6.MonHrsMins6.title = MonDate6.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row6.MonHrsMins6.title = MonDate6.value + " H";
                            } else {
                                Table1.Row6.MonHrsMins6.title = MonDate6.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641968___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.MonHrsMins6.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641968___label').style.color = "black";
                                Table1.Row6.MonHrsMins6.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641968___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.MonHrsMins6.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641968___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.MonHrsMins6.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641968___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.MonHrsMins6.enabled = false;
                            }
                        } else if (dayVal6 === "TUESDAY") {
                            TuesDate6.value = resultArray[i].dayOfMonth;
                            Table1.Row6.TueHrsMins6.title = TuesDate6.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row6.TueHrsMins6.title = TuesDate6.value + " H";
                            } else {
                                Table1.Row6.TueHrsMins6.title = TuesDate6.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641969___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.TueHrsMins6.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641969___label').style.color = "black";
                                Table1.Row6.TueHrsMins6.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641969___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.TueHrsMins6.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641969___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.TueHrsMins6.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641969___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.TueHrsMins6.enabled = false;
                            }
                        } else if (dayVal6 === "WEDNESDAY") {
                            WedDate6.value = resultArray[i].dayOfMonth;
                            Table1.Row6.WedHrsMins6.title = WedDate6.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row6.WedHrsMins6.title = WedDate6.value + " H";
                            } else {
                                Table1.Row6.WedHrsMins6.title = WedDate6.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641970___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.WedHrsMins6.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641970___label').style.color = "black";
                                Table1.Row6.WedHrsMins6.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641970___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.WedHrsMins6.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641970___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.WedHrsMins6.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641970___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.WedHrsMins6.enabled = false;
                            }
                        } else if (dayVal6 === "THURSDAY") {
                            ThurDate6.value = resultArray[i].dayOfMonth;
                            Table1.Row6.ThuHrsMins6.title = ThurDate6.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row6.ThuHrsMins6.title = ThurDate6.value + " H";
                            } else {
                                Table1.Row6.ThuHrsMins6.title = ThurDate6.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641971___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.ThuHrsMins6.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641971___label').style.color = "black";
                                Table1.Row6.ThuHrsMins6.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641971___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.ThuHrsMins6.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641971___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.ThuHrsMins6.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641971___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.ThuHrsMins6.enabled = false;
                            }
                        } else if (dayVal6 === "FRIDAY") {
                            FridayDate6.value = resultArray[i].dayOfMonth;
                            Table1.Row6.FriHrsMins6.title = FridayDate6.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row6.FriHrsMins6.title = FridayDate6.value + " H";
                            } else {
                                Table1.Row6.FriHrsMins6.title = FridayDate6.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641972___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.FriHrsMins6.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641972___label').style.color = "black";
                                Table1.Row6.FriHrsMins6.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641972___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.FriHrsMins6.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641972___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.FriHrsMins6.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641972___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.FriHrsMins6.enabled = false;
                            }
                        } else if (dayVal6 === "SATURDAY") {
                            SatDate6.value = resultArray[i].dayOfMonth;
                            Table1.Row6.SatHrsMins6.title = SatDate6.value;
                            //Check is public holiday - Append H if holiday
                            if (resultArray[i].isPublicHoliday === true) {
                                Table1.Row6.SatHrsMins6.title = SatDate6.value + " H";
                            } else {
                                Table1.Row6.SatHrsMins6.title = SatDate6.value;
                            }
                            //Check is disabled - Disable the field if true
                            if (resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641973___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SatHrsMins6.enabled = false;
                            } else {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641973___label').style.color = "black";
                                Table1.Row6.SatHrsMins6.enabled = true;
                            }
                            //Check is public holiday and is disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641973___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SatHrsMins6.enabled = false;
                            }
                            //Check is public holiday and is not disabled
                            if (resultArray[i].isPublicHoliday === true && resultArray[i].isDisabled === false) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641973___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SatHrsMins6.enabled = true;
                            }
                            //Check is included - disable if true
                            if (resultArray[i].isIncludedDay === true) {
                                document.getElementById('guideContainer-rootPanel-form_panel-timesheet-table_1548123188-Row1621263641964-tableItem1621263641973___label').style.color = "rgb(118, 118, 118)";
                                Table1.Row6.SatHrsMins6.enabled = false;
                            }
                        }
                    }

                }
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_ExcessHoursErrorMessage_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_ExcessHoursErrorMessage_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value !== "ToManager"){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Total1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Total1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var totValCal = Total1.value;
var totVal = parseFloat(totValCal);

if(totVal > SessionLimitWeek1.value){
  ExcessHoursErrorMessage.value = "Students may work up to, but no more than "+ SessionLimitWeek1.value+" hours per week when school is in session";
} else{
  ExcessHoursErrorMessage.value = "";
}

        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Total2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Total2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var totValCal = Total2.value;
var totVal = parseFloat(totValCal);

if(totVal > SessionLimitWeek2.value){
  ExcessHoursErrorMessage.value = "Students may work up to, but no more than "+ SessionLimitWeek2.value+" hours per week when school is in session";
} else{
  ExcessHoursErrorMessage.value = "";
}

        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Total3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Total3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var totValCal = Total3.value;
var totVal = parseFloat(totValCal);

if(totVal > SessionLimitWeek3.value){
  ExcessHoursErrorMessage.value = "Students may work up to, but no more than "+ SessionLimitWeek3.value+" hours per week when school is in session";
} else{
  ExcessHoursErrorMessage.value = "";
}

        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Total4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Total4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var totValCal = Total4.value;
var totVal = parseFloat(totValCal);

if(totVal > SessionLimitWeek4.value){
  ExcessHoursErrorMessage.value = "Students may work up to, but no more than "+ SessionLimitWeek4.value+" hours per week when school is in session";
} else{
  ExcessHoursErrorMessage.value = "";
}

        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Total5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Total5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var totValCal = Total5.value;
var totVal = parseFloat(totValCal);

if(totVal > SessionLimitWeek5.value){
  ExcessHoursErrorMessage.value = "Students may work up to, but no more than "+ SessionLimitWeek5.value+" hours per week when school is in session";
} else{
  ExcessHoursErrorMessage.value = "";
}

        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Total6_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_Total6_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var totValCal = Total6.value;
var totVal = parseFloat(totValCal);

if(totVal > SessionLimitWeek6.value){
  ExcessHoursErrorMessage.value = "Students may work up to, but no more than "+ SessionLimitWeek6.value+" hours per week when school is in session";
} else{
  ExcessHoursErrorMessage.value = "";
}

        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_GrossPay_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_GrossPay_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value !== null && StageIndicator.value !== "ToManager"){
  if(ClassTaken.value === "1151" || ClassTaken.value === "1871" || ClassTaken.value === "1872" || ClassTaken.value === "1875" || ClassTaken.value === "1876"){
  LessFWSEarned.value = GrossPay.value;
} else{
  LessFWSEarned.value = "";
}
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_TimekeeperHidden_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_TimekeeperHidden_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = "false";
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_StudentPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_StudentPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToTimekeeper" && StageIndicator.value === "ToManager"){
  StudentCB.mandatory = false;
  StudentSignDate.mandatory = false;
  StudentSignature.mandatory = false;
}
if(StageIndicator.value === "ToStudent" ){
  StudentCB.mandatory = true;
  StudentSignDate.mandatory = true;
  StudentSignature.mandatory = true;
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_StudentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == "0") {
    if (StageIndicator.value == "ToStudent" || StageIndicator.value === null) {
        if (StudentSignature.value === null) {
            var dateString = new Date().toLocaleString("en-US", {
                timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
            }).replace(/[^ -~]/g, ' ');
            var dateObject = new Date(dateString);
            var curyear = dateObject.getFullYear();
            var curyearMonth = dateObject.getMonth() + 1;
            var curyearDay = dateObject.getDate();
            var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
            StudentSignDate.value = d;

            StudentSignDate.enabled = false;
            $.ajax({

                type: 'GET',

                //url: "/bin/getLoggedInUserDetailsFromDB",
                url: "/bin/getLoggedUserDetails",
                dataType: 'json',
                success: function(myresopnse) {
                    //var userValue = myresopnse[0].FULL_NAME;
                    var userValue = myresopnse.userName;
                    StudentSignature.value = userValue;
                 
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });

           StudentSignature.enabled = true;
           

        } 
    }
} else {
    StudentSignature.value = "";
    StudentSignDate.value = "";
}

        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_TimekeeperCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_TimekeeperCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == "0") {
 
    if (StageIndicator.value == "ToTimekeeper") {
        if (TimekeeperSignature.value === null) {
          
            var dateString = new Date().toLocaleString("en-US", {
                timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
            }).replace(/[^ -~]/g, ' ');
            var dateObject = new Date(dateString);
          
            var curyear = dateObject.getFullYear();
          
            var curyearMonth = dateObject.getMonth() + 1;
            var curyearDay = dateObject.getDate();
            var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
            TimekeeperDate.value = d;

            TimekeeperDate.enabled = false;
           
            $.ajax({

                type: 'GET',

                //url: "/bin/getLoggedInUserDetailsFromDB",
                url: "/bin/getLoggedUserDetails",
                dataType: 'json',
                success: function(myresopnse) {
                    //var userValue = myresopnse[0].FULL_NAME;
                    var userValue = myresopnse.userName;
                    TimekeeperSignature.value = userValue;
                  
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });

           TimekeeperSignature.enabled = false;
          

        } 
    }
} else {
    TimekeeperSignature.value = "";
   TimekeeperDate.value = "";
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_AuthFWSAmount_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_AuthFWSAmount_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToTimekeeper"){
var lessFwsVal = LessFWSEarned.value;
var authFwsVal = AuthFWSAmount.value;

if(lessFwsVal !== null && authFwsVal !== null){
var cwsVal =parseFloat(lessFwsVal);
var authVal =parseFloat(authFwsVal);


if(cwsVal > authVal){
   showErrorModal("Alert!", "The Authorized CWS Amount has been exceeded. Please reduce the number of hours or correct the authorized amount.");
}else if (ClassTaken.value === "1150" || ClassTaken.value === "1868" || ClassTaken.value === "1874" || ClassTaken.value === "1870"){
  if(AuthFWSAmount.value !== null){
    showErrorModal("Alert!", "These cells are only for Federal Work Study Students. (Class 1151, 1871, 1872, 1875, 1876).");   
    AuthFWSAmount.value  = "";
  } 
}
FWSBalToBeEarned.value = authVal-cwsVal;
}
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_SupCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_SupCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == "0") {
    if (StageIndicator.value == "ToManager") {
        if (SupervisorSignature.value === null) {
                   
            var dateString = new Date().toLocaleString("en-US", {
                timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
            }).replace(/[^ -~]/g, ' ');
            var dateObject = new Date(dateString);
            var curyear = dateObject.getFullYear();
            var curyearMonth = dateObject.getMonth() + 1;
            var curyearDay = dateObject.getDate();
            var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
            SupSignDate.value = d;

            SupSignDate.enabled = false;
            $.ajax({

                type: 'GET',

                //url: "/bin/getLoggedInUserDetailsFromDB",
                url: "/bin/getLoggedUserDetails",
                dataType: 'json',
                success: function(myresopnse) {
                    //var userValue = myresopnse[0].FULL_NAME;
                    var userValue = myresopnse.userName;
                    SupervisorSignature.value = userValue;
                 
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });

           SupervisorSignature.enabled = false;
          

        } 
    }
} else {
    SupervisorSignature.value = "";
   SupSignDate.value ="";
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_PayrollCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_PayrollCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == "0") {
    if (StageIndicator.value == "ToPayroll") {
        if (PayrollSignature.value === null) {
                   
            var dateString = new Date().toLocaleString("en-US", {
                timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
            }).replace(/[^ -~]/g, ' ');
            var dateObject = new Date(dateString);
            var curyear = dateObject.getFullYear();
            var curyearMonth = dateObject.getMonth() + 1;
            var curyearDay = dateObject.getDate();
            var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
            PayrollSignDate.value = d;

            PayrollSignDate.enabled = false;
            $.ajax({

                type: 'GET',

                //url: "/bin/getLoggedInUserDetailsFromDB",
                url: "/bin/getLoggedUserDetails",
                dataType: 'json',
                success: function(myresopnse) {
                    //var userValue = myresopnse[0].FULL_NAME;
                    var userValue = myresopnse.userName;
                    PayrollSignature.value = userValue;
                 
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });

           PayrollSignature.enabled = false;
          

        } 
    }
} else {
    PayrollSignature.value = "";
   PayrollSignDate.value ="";
}
        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_generatePDF_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_generatePDF_click0 = function (scope) {
    with(this) {
        with(scope) {
            var flag = 0;

if(flag === 0){
  //generatePDFStep.value = "Draft";
 getPdf();
}
function getPdf() {
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
          console.log("in view pdf=="+result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/student-timesheet-manual-entry/student-timesheet-manual-entry');
            jsonData.append('fileName', FirstName.value + "_" + LastName.value + "(" + EmployeeId.value + ")");          
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
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_saveguidedraft1620908237387_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_saveguidedraft1620908237387_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(EmployeeId.value !== null && FirstName.value !== null && LastName.value !== null){
    aftiaDescCWID.value = EmployeeId.value +" "+FirstName.value+" " +LastName.value;
  }
formSavedStatus.value = "1";
//Month.enabled = false;
//showErrorModal("Alert!","The Month field is disabled, please continue drafted form");
handleDraftSave(this);


        }
	}
}
/**
 * @function student_timesheet_manual_entry_student_timesheet_manual_entry.generated_submit1613550093745_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_timesheet_manual_entry_student_timesheet_manual_entry.generated_submit1613550093745_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(EmployeeId.value !== null & Month.value !== null){
  EmailSubject.value = "Student Timesheet Manual Entry - ("+CHRSID.value+", Unit: "+Unit.value+")";
}else{
  EmailSubject.value = "Student Timesheet Manual Entry";
}

var classVal = ClassTaken.value;
var rateVal =  RateOfPay.value;
var errorFlag = "0";


if(classVal !== null && rateVal !== null){
  if(classVal === "1150" || classVal === "1151" || classVal === "1152" || classVal === "1153"){
    if(rateVal < 17.01 || rateVal > 22.70){
      errorFlag = "1";
      showErrorModal("Alert!", "Rate must be between $17.01 and $22.70 for the chosen Class.");
    }else{
      errorFlag = "0";
    }

  } 
  if(errorFlag === "0"){
  if(classVal === "1868" || classVal === "1870" || classVal === "1871" || classVal === "1872" || classVal === "1874" || classVal === "1875" || classVal === "1876"){
     if(rateVal < 16 || rateVal > 24){
        errorFlag = "1";
      showErrorModal("Alert!", "Rate must be between $16.00 and $24.00 for the chosen Class.");
    }else{
      errorFlag = "0";
    }


  }
}
}
if(ClassTaken.value === "1151" || ClassTaken.value === "1871" || ClassTaken.value === "1872" || ClassTaken.value === "1875" || ClassTaken.value === "1876"){
  LessFWSEarned.value = GrossPay.value;
} else{
  LessFWSEarned.value = "";
}	


TimeKeeperEmail.value = "poornavivekraj.nagarajan@thoughtfocus.com";
ManagerEmail.value = "poornavivekraj.nagarajan@thoughtfocus.com";
StudentEmailId.value = "poornavivekraj.nagarajan@thoughtfocus.com";



if(errorFlag === "0"){
//if(TimekeeperUserId.value !== null && ManagerUserId.value !== null){
  if(EmployeeId.value !== null && FirstName.value !== null && LastName.value !== null){
    aftiaDescCWID.value = EmployeeId.value +" "+FirstName.value+" " +LastName.value;
  }
  if(ExcessHoursErrorMessage.value !== null){
    showErrorModal("Alert!",ExcessHoursErrorMessage.value);
  }
  else{
  if(EmployeeId.value !== null && Unit.value !== null && CmsDept.value !== null && ManagerUserId.value === null){
  showErrorModal("Alert!", "Failed to submit the form. Please verify that all the information entered is valid.");
}else{
  guideBridge.submit();
}
  }
//} 
}



        }
	}
}
