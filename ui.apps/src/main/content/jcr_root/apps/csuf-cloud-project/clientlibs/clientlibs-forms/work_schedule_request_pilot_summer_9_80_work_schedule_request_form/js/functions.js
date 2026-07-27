/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
  // added below lines on 5/1/2024 to disable form 
   /* showErrorModal("Alert!","The submission deadline has passed!");
    generateDOR.visible = false;
    reset1600234675625.visible = false;
    saveguidedraft1629881233615.visible = false;
    submit1600234699256.visible = false;
    this.enabled = false;*/
    
    AgreementDetails.enabled = true;
    AgreementDetails.visible = true;
    Declaration.visible = true;
    Declaration.enabled = false;
    Name.enabled = false;
    ManagerSignaturePanel.visible = true;
    ManagerSignaturePanel.enabled = true;
    EmployeeSignaturePanel.visible = false;
    PilotSummerWorkDetails.visible = true;
    ExemptStatus.visible = false;
    ShiftTime.visible = false;
    PilotSummerOldWorkScheduleDetails.visible = false;
    EmployeeDetailsCB.visible = false;
}
if (StageIndicator.value === "ToEmployee") {
    Cwid.enabled = false;
    Name.enabled = false;
    EmployeeDivision.enabled = false;
    ShiftTime.enabled = false;
    ExemptStatus.enabled = false;
    NonExemptChoice.enabled = false;
    Declaration.enabled = true;
    Declaration.mandatory = true;
    AgreementDetails.visible = true;
    ManagerSignaturePanel.visible = true;
    ManagerSignaturePanel.enabled = false;
    EmployeeSignaturePanel.visible = true;
    EmployeeSignaturePanel.enabled = true;
    PilotSummerWorkDetails.visible = true;
    PilotSummerWorkDetails.enabled = true;
    DetailsCB.enabled = false;
    ExemptStatus.visible = false;
    ShiftTime.visible = false;
    PilotSummerOldWorkScheduleDetails.visible = false;
    DetailsCB.visible = false;
   
  /*  if (ExemptStatus.value !== null) {
        forOldWorkItems();
    }*/
}

/*function forOldWorkItems() {
    ExemptStatus.visible = true;
    ShiftTime.visible = true;
    PilotSummerOldWorkScheduleDetails.visible = true;
    PilotSummerWorkScheduleDetails.visible = false;
    PilotSummerWorkDetails.enabled = false;
    TitanFlexWebsiteText.visible = false;
    DetailsCB.visible = true;
    EmployeeDetailsCB.visible = false;
    var fridayOffArray = [];
    var choice1 = "1=First Friday off starts June 3";
    var choice2 = "2=First Friday off starts June 10";
    fridayOffArray.push(choice1);
    fridayOffArray.push(choice2);
    NonExemptChoice.items = fridayOffArray;
    var agreementText = "<p>will be on the voluntary pilot summer 9/80 work schedule from May 30, 2022, through August 5, 2022 - (alternate Fridays off).</p>";
    $("#AgreementTextVal").html(agreementText);
}*/
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
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
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_guideRootPanel_init2 = function (scope) {
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
        success: function(myresopnse) {
            if (myresopnse.length == 1) {
                var unioncd = myresopnse[0].UNION_CD;
                var positionnumber = myresopnse[0].POSITION_NBR;
                PositionNumber.value = positionnumber;
                if (unioncd == "M80" || unioncd == "M98") {
                    submit1600234699256.enabled = true;
                    Cwid.enabled = true;
                } else {
                    showErrorModal("Alert!", "You are unable to complete this form at this time, please contact your manager/supervisor");
                    submit1600234699256.enabled = false;
                    Cwid.enabled = false;
                }
            }
            if (myresopnse.length > 1) {
                var isMPP = false;
                for (var i = 0; i < myresopnse.length; i++) {
                    if (myresopnse[i].UNION_CD == "M80" || myresopnse[i].UNION_CD == "M98") {
                        isMPP = true;
                        if (PositionNumber.value === null) {
                            PositionNumber.value = myresopnse[i].POSITION_NBR;
                        } else {
                            PositionNumber.value = (PositionNumber.value).concat(", ") + myresopnse[i].POSITION_NBR;
                        }
                    }
                }
                if (isMPP === false) {
                    showErrorModal("Alert!", "You are unable to complete this form at this time, please contact your manager/supervisor");
                    submit1600234699256.enabled = false;
                    Cwid.enabled = false;
                } else{
                  submit1600234699256.enabled = true;
                    Cwid.enabled = true;
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
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmplId_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmplId_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";
    var cwid = "";
  var chrsID = this.value;
      $.ajax({
        type: 'GET',
        url: "/bin/chrsIDUpdateServlet",
        data: {
            action: "STUDENT_TIMESHEET_EMP_DETAILS_CHRSID",
            chrsId: chrsID
        },
        dataType: 'json',
        success: function(myresopnse) {
          if(myresopnse.length >= 1){
            cwid = myresopnse[0].EMPLID;
            Cwid.value = cwid;
            getData(cwid);
          }else{
            submit1600234699256.enabled = false;
            showErrorModal("Alert!", "No matching records found");
             gifModal.style.display = "none";
          }
          
        }
      });
  

  

   
}

function getData(cwid){
   $.ajax({
        type: 'GET',
        url: "/bin/getPilotSummerWorkSchedule",
        data: {
            action: "EMPLOYEE_CWID_LOOKUP",
            cwid: cwid
        },
        dataType: 'json',
        success: function(myresopnse) {
            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];

            if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined && (PositionNumber.value).lastIndexOf(myresopnse[0].REPORTS_TO) != -1) {

                var fname = myresopnse[0].FIRST_NAME;
                var lname = myresopnse[0].LAST_NAME;
                var deptname = myresopnse[0].DEPTNAME;
                var deptid = myresopnse[0].DEPTID;
                var divname = myresopnse[0].DIVISION_NAME;
                var divid = myresopnse[0].DIVSION;
                var collegename = myresopnse[0].FUL_COLLEGE_NAME;
                var college = myresopnse[0].FUL_COLLEGE;
                var unionCd = myresopnse[0].UNION_CD;
                var classification = myresopnse[0].DESCR;

                Name.value = fname + " " + lname;
                EmployeeDivision.value = divname + "(" + divid + ")";
                EmployeeUserId.value = myresopnse[0].EMP_USERID;
                EmployeeEmailId.value = myresopnse[0].EMAILID;
                //EmplId.value = myresopnse[0].CSU_CHRS_ID;
                EmployeeFirstName.value = fname;
                EmployeeLastName.value = lname;
                EmployeeDivisionName.value = divname;
                EmployeeDivisionId.value = divid;
                EmployeeTitle.value = classification;
                EmployeeClassification.value = classification;
                EmployeeDepartment.value = deptname + "(" + deptid + ")";
                EmployeeCollege.value = collegename + "(" + college + ")";
                EmployeeCbid.value = unionCd;
                EmployeeJobCode.value = myresopnse[0].JOBCODE;
                if (unionCd == "M80" || unionCd == "M98") {
                    StafforMppStatus.value = "MPP";
                } else {
                    StafforMppStatus.value = "Staff";
                }
                classification = classification.toLowerCase();
                if (classification.includes("chair")) {
                    StafforMppStatus.value = "Department Chair";
                }
                if (unionCd == "R02" || unionCd == "R04" || unionCd == "R05" || unionCd == "R07" || unionCd == "R09") {
                    Declaration.visible = true;
                } else {
                    Declaration.visible = false;
                }
submit1600234699256.enabled = true;
                /*    if(myresopnse[0].FLSA_STATUS !== null){
                      if(myresopnse[0].FLSA_STATUS == "X"){
                       ExemptStatus.value = 1;
                      }
                      if(myresopnse[0].FLSA_STATUS == "N"){
                       ExemptStatus.value = 2;
                      }
                    }*/
                gifModal.style.display = "none";
                modal.style.display = "none";

            } else if (myresopnse.length > 1) {
                gifModal.style.display = "none";
                modal.style.display = "block";
                var col = [];
                col.push("CSU_CHRS_ID");
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
                    // tr.appendChild('<td><input type = "radio" class = "rb" name="group" value = ""> </td>');
                    var button = document.createElement("input");
                    button.type = "radio";
                    button.setAttribute("class", "rb");
                    button.id = "rbtn";
                    button.name = "group";
                    button.value = "";
                    button.onclick = function(event) {};
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
                            if ((PositionNumber.value).lastIndexOf(myresopnse[n].REPORTS_TO) != -1) {
                                //Id.value = myresopnse[n].EMPLID;
                                var fname = myresopnse[n].FIRST_NAME;
                                var lname = myresopnse[n].LAST_NAME;
                                var deptname = myresopnse[n].DEPTNAME;
                                var deptid = myresopnse[n].DEPTID;
                                var divname = myresopnse[n].DIVISION_NAME;
                                var divid = myresopnse[n].DIVSION;
                                var collegename = myresopnse[n].FUL_COLLEGE_NAME;
                                var college = myresopnse[n].FUL_COLLEGE;
                                var unionCd = myresopnse[n].UNION_CD;
                                var classification = myresopnse[n].DESCR;

                                Name.value = fname + " " + lname;
                                EmployeeDivision.value = divname + "(" + divid + ")";
                                EmployeeUserId.value = myresopnse[n].EMP_USERID;
                                EmployeeEmailId.value = myresopnse[n].EMAILID;
                                //EmplId.value = myresopnse[n].CSU_CHRS_ID;
                                EmployeeFirstName.value = fname;
                                EmployeeLastName.value = lname;
                                EmployeeDivisionName.value = divname;
                                EmployeeDivisionId.value = divid;
                                EmployeeTitle.value = classification;
                                EmployeeClassification.value = classification;
                                EmployeeDepartment.value = deptname + "(" + deptid + ")";
                                EmployeeCollege.value = collegename + "(" + college + ")";
                                EmployeeCbid.value = unionCd;
                                EmployeeJobCode.value = myresopnse[n].JOBCODE;
                                if (unionCd == "M80" || unionCd == "M98") {
                                    StafforMppStatus.value = "MPP";
                                } else {
                                    StafforMppStatus.value = "Staff";
                                }
                                if (unionCd == "R02" || unionCd == "R04" || unionCd == "R05" || unionCd == "R07" || unionCd == "R09") {
                                    Declaration.visible = true;
                                } else {
                                    Declaration.visible = false;
                                }
                                classification = classification.toLowerCase();
                                if (classification.includes("chair")) {
                                    StafforMppStatus.value = "Department Chair";
                                }
                              submit1600234699256.enabled = true;
                                /*   if (myresopnse[n].FLSA_STATUS !== null) {
                                       if (myresopnse[n].FLSA_STATUS == "X") {
                                           ExemptStatus.value = 1;
                                       }
                                       if (myresopnse[n].FLSA_STATUS == "N") {
                                           ExemptStatus.value = 2;
                                       }
                                   }*/

                            } else {
                                submit1600234699256.enabled = false;
                                showErrorModal("Alert!", "No matching records found");
                            }
                            rButtonStatus = true;
                            break;
                        }
                    }
                    if (rButtonStatus === false) {
                        //alert("Please select the department");
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
                    Name.value = null;
                    EmployeeDivision.value = "";
                    EmployeeUserId.value = "";
                    EmployeeEmailId.value = "";
                    EmployeeFirstName.value = "";
                    EmployeeLastName.value = "";
                    EmployeeDivisionName.value = "";
                    EmployeeDivisionId.value = "";
                    submit1600234699256.enabled = false;
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
                    modal.style.display = "none";
                } else {
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
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmplId_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmplId_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
  debugger;
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";
    var cwid = this.value;

    $.ajax({
        type: 'GET',
        url: "/bin/getPilotSummerWorkSchedule",
        data: {
            action: "EMPLOYEE_CWID_LOOKUP_CHRSID_UPDATED",
            cwid: cwid
        },
        dataType: 'json',
        success: function(myresopnseData) {
            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];
          
          var myresopnse = Array.isArray(myresopnseData) ? myresopnseData.filter(function(item) {
    return item.JOBCODE !== "2354" && item.JOBCODE !== "2360" && item.JOBCODE !== "2358" && item.JOBCODE !== "3073" && item.JOBCODE !== "3075" && item.JOBCODE !== "2482";
}) : [];

            if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined && (PositionNumber.value).lastIndexOf(myresopnse[0].REPORTS_TO) != -1) {

                var fname = myresopnse[0].FIRST_NAME;
                var lname = myresopnse[0].LAST_NAME;
                var deptname = myresopnse[0].DEPTNAME;
                var deptid = myresopnse[0].DEPTID;
                var divname = myresopnse[0].DIVISION_NAME;
                var divid = myresopnse[0].DIVSION;
                var collegename = myresopnse[0].FUL_COLLEGE_NAME;
                var college = myresopnse[0].FUL_COLLEGE;
                var unionCd = myresopnse[0].UNION_CD;
                var classification = myresopnse[0].DESCR;

                Name.value = fname + " " + lname;
                Cwid.value = myresopnse[0].EMPLID;
                EmployeeDivision.value = divname + "(" + divid + ")";
                EmployeeUserId.value = myresopnse[0].EMP_USERID;
               // EmployeeEmailId.value = myresopnse[0].EMAILID;
                EmployeeEmailId.value = "mepacheco@FULLERTON.EDU";
                EmplId.value = myresopnse[0].CSU_CHRS_ID;
                EmployeeFirstName.value = fname;
                EmployeeLastName.value = lname;
                EmployeeDivisionName.value = divname;
                EmployeeDivisionId.value = divid;
                EmployeeTitle.value = classification;
                EmployeeClassification.value = classification;
                EmployeeDepartment.value = deptname + "(" + deptid + ")";
                EmployeeCollege.value = collegename + "(" + college + ")";
                EmployeeCbid.value = unionCd;
                EmployeeJobCode.value = myresopnse[0].JOBCODE;
                EmplRcd.value = myresopnse[0].EMPL_RCD;
                Unit.value = myresopnse[0].CSU_UNIT;
                if (unionCd == "M80" || unionCd == "M98") {
                    StafforMppStatus.value = "MPP";
                } else {
                    StafforMppStatus.value = "Staff";
                }
                classification = classification.toLowerCase();
                if (classification.includes("chair")) {
                    StafforMppStatus.value = "Department Chair";
                }
                if (unionCd == "R02" || unionCd == "R04" || unionCd == "R05" || unionCd == "R07" || unionCd == "R09") {
                    Declaration.visible = true;
                } else {
                    Declaration.visible = false;
                }

                /*    if(myresopnse[0].FLSA_STATUS !== null){
                      if(myresopnse[0].FLSA_STATUS == "X"){
                       ExemptStatus.value = 1;
                      }
                      if(myresopnse[0].FLSA_STATUS == "N"){
                       ExemptStatus.value = 2;
                      }
                    }*/
               submit1600234699256.enabled = true;
                gifModal.style.display = "none";
                modal.style.display = "none";

            } else if (myresopnse.length > 1) {
                gifModal.style.display = "none";
                modal.style.display = "block";
                var col = [];
                col.push("CSU_CHRS_ID");
                col.push("LAST_NAME");
                col.push("FIRST_NAME");
                col.push("DEPTID");
                col.push("DEPTNAME");
                col.push("EMPL_RCD");
                col.push("JOBCODE");

                var table = document.createElement("table");
                table.id = "tb";
                var tr = table.insertRow(-1);
                var headings = ["", "Emp ID", "Last Name", "First Name", "Department Id", "Department Name", "Emp Rc#", "Job Code"];
                for (var j = 0; j < headings.length; j++) {
                    var th = document.createElement("th");
                    th.innerHTML = headings[j];
                    tr.appendChild(th);
                }
                for (var k = 0; k < myresopnse.length; k++) {
                    tr = table.insertRow(-1);
                    // tr.appendChild('<td><input type = "radio" class = "rb" name="group" value = ""> </td>');
                    var button = document.createElement("input");
                    button.type = "radio";
                    button.setAttribute("class", "rb");
                    button.id = "rbtn";
                    button.name = "group";
                    button.value = "";
                    button.onclick = function(event) {};
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
                            if ((PositionNumber.value).lastIndexOf(myresopnse[n].REPORTS_TO) != -1) {
                                //Id.value = myresopnse[n].EMPLID;
                                var fname = myresopnse[n].FIRST_NAME;
                                var lname = myresopnse[n].LAST_NAME;
                                var deptname = myresopnse[n].DEPTNAME;
                                var deptid = myresopnse[n].DEPTID;
                                var divname = myresopnse[n].DIVISION_NAME;
                                var divid = myresopnse[n].DIVSION;
                                var collegename = myresopnse[n].FUL_COLLEGE_NAME;
                                var college = myresopnse[n].FUL_COLLEGE;
                                var unionCd = myresopnse[n].UNION_CD;
                                var classification = myresopnse[n].DESCR;

                                Name.value = fname + " " + lname;
                                Cwid.value = myresopnse[n].EMPLID;
                                EmployeeDivision.value = divname + "(" + divid + ")";
                                EmployeeUserId.value = myresopnse[n].EMP_USERID;
                             //   EmployeeEmailId.value = myresopnse[n].EMAILID;
                                 EmployeeEmailId.value = "mepacheco@FULLERTON.EDU";
                                EmplId.value = myresopnse[n].CSU_CHRS_ID;
                                EmployeeFirstName.value = fname;
                                EmployeeLastName.value = lname;
                                EmployeeDivisionName.value = divname;
                                EmployeeDivisionId.value = divid;
                                EmployeeTitle.value = classification;
                                EmployeeClassification.value = classification;
                                EmployeeDepartment.value = deptname + "(" + deptid + ")";
                                EmployeeCollege.value = collegename + "(" + college + ")";
                                EmployeeCbid.value = unionCd;
                                EmployeeJobCode.value = myresopnse[n].JOBCODE;
                                EmplRcd.value = myresopnse[n].EMPL_RCD;
                                Unit.value = myresopnse[n].CSU_UNIT;
                                if (unionCd == "M80" || unionCd == "M98") {
                                    StafforMppStatus.value = "MPP";
                                } else {
                                    StafforMppStatus.value = "Staff";
                                }
                                if (unionCd == "R02" || unionCd == "R04" || unionCd == "R05" || unionCd == "R07" || unionCd == "R09") {
                                    Declaration.visible = true;
                                } else {
                                    Declaration.visible = false;
                                }
                                classification = classification.toLowerCase();
                                if (classification.includes("chair")) {
                                    StafforMppStatus.value = "Department Chair";
                                }
                                submit1600234699256.enabled = true;
                                /*   if (myresopnse[n].FLSA_STATUS !== null) {
                                       if (myresopnse[n].FLSA_STATUS == "X") {
                                           ExemptStatus.value = 1;
                                       }
                                       if (myresopnse[n].FLSA_STATUS == "N") {
                                           ExemptStatus.value = 2;
                                       }
                                   }*/

                            } else {
                                submit1600234699256.enabled = false;
                                showErrorModal("Alert!", "No matching records found");
                            }
                            rButtonStatus = true;
                            break;
                        }
                    }
                    if (rButtonStatus === false) {
                        //alert("Please select the department");
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
                    Name.value = null;
                    EmployeeDivision.value = "";
                    EmployeeUserId.value = "";
                    EmployeeEmailId.value = "";
                    EmployeeFirstName.value = "";
                    EmployeeLastName.value = "";
                    EmployeeDivisionName.value = "";
                    EmployeeDivisionId.value = "";
                    submit1600234699256.enabled = false;
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
                    modal.style.display = "none";
                } else {
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
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmplRcd_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmplRcd_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_Cwid_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_Cwid_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";
    var cwid = this.value;

    $.ajax({
        type: 'GET',
        url: "/bin/getPilotSummerWorkSchedule",
        data: {
            action: "EMPLOYEE_CWID_LOOKUP",
            cwid: cwid
        },
        dataType: 'json',
        success: function(myresopnse) {
            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];

            if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined && (PositionNumber.value).lastIndexOf(myresopnse[0].REPORTS_TO) != -1) {

                var fname = myresopnse[0].FIRST_NAME;
                var lname = myresopnse[0].LAST_NAME;
                var deptname = myresopnse[0].DEPTNAME;
                var deptid = myresopnse[0].DEPTID;
                var divname = myresopnse[0].DIVISION_NAME;
                var divid = myresopnse[0].DIVSION;
                var collegename = myresopnse[0].FUL_COLLEGE_NAME;
                var college = myresopnse[0].FUL_COLLEGE;
                var unionCd = myresopnse[0].UNION_CD;
                var classification = myresopnse[0].DESCR;

                Name.value = fname + " " + lname;
                EmployeeDivision.value = divname + "(" + divid + ")";
                EmployeeUserId.value = myresopnse[0].EMP_USERID;
                EmployeeEmailId.value = myresopnse[0].EMAILID;
                EmplId.value = myresopnse[0].CSU_CHRS_ID;
                EmployeeFirstName.value = fname;
                EmployeeLastName.value = lname;
                EmployeeDivisionName.value = divname;
                EmployeeDivisionId.value = divid;
                EmployeeTitle.value = classification;
                EmployeeClassification.value = classification;
                EmployeeDepartment.value = deptname + "(" + deptid + ")";
                EmployeeCollege.value = collegename + "(" + college + ")";
                EmployeeCbid.value = unionCd;
                EmployeeJobCode.value = myresopnse[0].JOBCODE;
                if (unionCd == "M80" || unionCd == "M98") {
                    StafforMppStatus.value = "MPP";
                } else {
                    StafforMppStatus.value = "Staff";
                }
                classification = classification.toLowerCase();
                if (classification.includes("chair")) {
                    StafforMppStatus.value = "Department Chair";
                }
                if (unionCd == "R02" || unionCd == "R04" || unionCd == "R05" || unionCd == "R07" || unionCd == "R09") {
                    Declaration.visible = true;
                } else {
                    Declaration.visible = false;
                }

                /*    if(myresopnse[0].FLSA_STATUS !== null){
                      if(myresopnse[0].FLSA_STATUS == "X"){
                       ExemptStatus.value = 1;
                      }
                      if(myresopnse[0].FLSA_STATUS == "N"){
                       ExemptStatus.value = 2;
                      }
                    }*/
                gifModal.style.display = "none";
                modal.style.display = "none";

            } else if (myresopnse.length > 1) {debugger;
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
                    // tr.appendChild('<td><input type = "radio" class = "rb" name="group" value = ""> </td>');
                    var button = document.createElement("input");
                    button.type = "radio";
                    button.setAttribute("class", "rb");
                    button.id = "rbtn";
                    button.name = "group";
                    button.value = "";
                    button.onclick = function(event) {};
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
                            if ((PositionNumber.value).lastIndexOf(myresopnse[n].REPORTS_TO) != -1) {
                                //Id.value = myresopnse[n].EMPLID;
                                var fname = myresopnse[n].FIRST_NAME;
                                var lname = myresopnse[n].LAST_NAME;
                                var deptname = myresopnse[n].DEPTNAME;
                                var deptid = myresopnse[n].DEPTID;
                                var divname = myresopnse[n].DIVISION_NAME;
                                var divid = myresopnse[n].DIVSION;
                                var collegename = myresopnse[n].FUL_COLLEGE_NAME;
                                var college = myresopnse[n].FUL_COLLEGE;
                                var unionCd = myresopnse[n].UNION_CD;
                                var classification = myresopnse[n].DESCR;

                                Name.value = fname + " " + lname;
                                EmployeeDivision.value = divname + "(" + divid + ")";
                                EmployeeUserId.value = myresopnse[n].EMP_USERID;
                                EmployeeEmailId.value = myresopnse[n].EMAILID;
                                EmplId.value = myresopnse[n].CSU_CHRS_ID;
                                EmployeeFirstName.value = fname;
                                EmployeeLastName.value = lname;
                                EmployeeDivisionName.value = divname;
                                EmployeeDivisionId.value = divid;
                                EmployeeTitle.value = classification;
                                EmployeeClassification.value = classification;
                                EmployeeDepartment.value = deptname + "(" + deptid + ")";
                                EmployeeCollege.value = collegename + "(" + college + ")";
                                EmployeeCbid.value = unionCd;
                                EmployeeJobCode.value = myresopnse[n].JOBCODE;
                                if (unionCd == "M80" || unionCd == "M98") {
                                    StafforMppStatus.value = "MPP";
                                } else {
                                    StafforMppStatus.value = "Staff";
                                }
                                if (unionCd == "R02" || unionCd == "R04" || unionCd == "R05" || unionCd == "R07" || unionCd == "R09") {
                                    Declaration.visible = true;
                                } else {
                                    Declaration.visible = false;
                                }
                                classification = classification.toLowerCase();
                                if (classification.includes("chair")) {
                                    StafforMppStatus.value = "Department Chair";
                                }
                                /*   if (myresopnse[n].FLSA_STATUS !== null) {
                                       if (myresopnse[n].FLSA_STATUS == "X") {
                                           ExemptStatus.value = 1;
                                       }
                                       if (myresopnse[n].FLSA_STATUS == "N") {
                                           ExemptStatus.value = 2;
                                       }
                                   }*/

                            } else {
                                submit1600234699256.enabled = false;
                                showErrorModal("Alert!", "No matching records found");
                            }
                            rButtonStatus = true;
                            break;
                        }
                    }
                    if (rButtonStatus === false) {
                        //alert("Please select the department");
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
                    Name.value = null;
                    EmployeeDivision.value = "";
                    EmployeeUserId.value = "";
                    EmployeeEmailId.value = "";
                    EmployeeFirstName.value = "";
                    EmployeeLastName.value = "";
                    EmployeeDivisionName.value = "";
                    EmployeeDivisionId.value = "";
                    submit1600234699256.enabled = false;
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
                    modal.style.display = "none";
                } else {
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
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_Cwid_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_Cwid_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";

    var cwid = this.value;

    $.ajax({
        type: 'GET',
        url: "/bin/getEvaluationFormData",
        data: {
            action: "EMP_DETAILS_CWID",
            cwid: cwid
        },
        dataType: 'json',
        success: function(myresopnse) {

            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];
          
            if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined && (PositionNumber.value).lastIndexOf(myresopnse[0].REPORTS_TO) != -1) {

                var fname = myresopnse[0].FIRST_NAME;
                var lname = myresopnse[0].LAST_NAME;
                var deptname = myresopnse[0].DEPTNAME;
                var deptid = myresopnse[0].DEPTID;
                var divname = myresopnse[0].DIVISION_NAME;
                var divid = myresopnse[0].DIVSION;

                Name.value = fname + " " + lname;
                EmployeeDivision.value = divname + "(" + divid + ")";
                EmployeeUserId.value = myresopnse[0].EMP_USERID;
                // EmployeeEmailId.value = myresopnse[0].EMAILID;
                EmployeeFirstName.value = fname;
                EmployeeLastName.value = lname;
                EmployeeDivisionName.value = divname;
                EmployeeDivisionId.value = divid;
              EmployeeTitle.value = myresopnse[0].DESCR;
             if(myresopnse[0].FLSA_STATUS !== null){
               if(myresopnse[0].FLSA_STATUS == "X"){
                ExemptStatus.value = 1;
               }
               if(myresopnse[0].FLSA_STATUS == "N"){
                ExemptStatus.value = 2;
               }
             }

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
                    // tr.appendChild('<td><input type = "radio" class = "rb" name="group" value = ""> </td>');
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
                            if ((PositionNumber.value).lastIndexOf(myresopnse[n].REPORTS_TO != -1)) {
                                //
                                //Id.value = myresopnse[n].EMPLID;
                                var fname = myresopnse[n].FIRST_NAME;
                                var lname = myresopnse[n].LAST_NAME;
                                var deptname = myresopnse[n].DEPTNAME;
                                var deptid = myresopnse[n].DEPTID;
                                var divname = myresopnse[n].DIVISION_NAME;
                                var divid = myresopnse[n].DIVSION;

                                Name.value = fname + " " + lname;
                                EmployeeDivision.value = divname + "(" + divid + ")";
                                EmployeeUserId.value = myresopnse[n].EMP_USERID;
                                //EmployeeEmailId.value = myresopnse[n].EMAILID;
                                EmployeeFirstName.value = fname;
                                EmployeeLastName.value = lname;
                                EmployeeDivisionName.value = divname;
                                EmployeeDivisionId.value = divid;
								EmployeeTitle.value = myresopnse[n].DESCR;
                          if(myresopnse[n].FLSA_STATUS !== null){
                                         if(myresopnse[n].FLSA_STATUS == "X"){
                                          ExemptStatus.value = 1;
                                         }
                                         if(myresopnse[n].FLSA_STATUS == "N"){
                                          ExemptStatus.value = 2;
                                         }
                                       }

                            } else {
                              submit1600234699256.enabled=false;
                                showErrorModal("Alert!", "No matching records found");
                            }
                            rButtonStatus = true;
                            break;
                        }
                    }
                    if (rButtonStatus === false) {
                        //alert("Please select the department");
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
                    Name.value = null;
                    EmployeeDivision.value = "";
                    EmployeeUserId.value = "";
                    EmployeeEmailId.value = "";
                    EmployeeFirstName.value = "";
                    EmployeeLastName.value = "";
                    EmployeeDivisionName.value = "";
                    EmployeeDivisionId.value = "";
                    submit1600234699256.enabled=false;

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

                    modal.style.display = "none";
                } else {
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
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_Name_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_Name_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var array = []; 
var sentence = "1=Please check the box to indicate that you have completed the review of this summer schedule with "+this.value;
array.push(sentence);
ManagerCB.items = array;  
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmployeeCbid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmployeeCbid_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToEmployee") {
    if (ExemptStatus.value === null) {
        var val = this.value;
        if (val == "R02" || val == "R04" || val == "R05" || val == "R07" || val == "R09") {
            Declaration.visible = true;
        } else {
            Declaration.visible = false;
        }
    }
}
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_TitanFlexWebsiteText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_TitanFlexWebsiteText_init0 = function (scope) {
    with(this) {
        with(scope) {
            var changeText = "<p>Please refer to the ".concat("<a href=".concat("https://hr.fullerton.edu/worklife/titan-flex/default.php ").concat("target=".concat("_blank")).concat(">Titan Flex website</a> for additional details on the 9/80 Summer Work Schedule Program. </p>"));

 $("#SummerText").html(changeText);
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_TitanFlexWebsiteText_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_TitanFlexWebsiteText_init1 = function (scope) {
    with(this) {
        with(scope) {
            var changeText = "<p>Please refer to the "
  .concat('<a href="https://hr.fullerton.edu/worklife/titan-flex.html" target="_blank" rel="noopener noreferrer">')
  .concat("Titan Flex website</a> for additional details on the 9/80 Summer Work Schedule Program.</p>");

$("#SummerText").html(changeText);
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_NonExemptChoice_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_NonExemptChoice_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToEmployee"){
this.mandatory=false;
}
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_ExemptStatus_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_ExemptStatus_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 2){
  NonExemptChoice.enabled=true;
}
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_ExemptStatus_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_ExemptStatus_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value==1){
  NonExemptChoice.enabled=false;
  NonExemptChoice.value=null;
}
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_ManagerCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_ManagerCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (this.value == 1) {
        var uservalue;
        $.ajax({
            type: 'GET',
            url: "/bin/getEvaluationFormData",
            data: {
                action: "EMP_DETAILS"
            },
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse[0].EMP_NAME;
                var title = myresopnse[0].DESCR;
                var index;
                if (myresopnse.length >= 1) {
                    for (var i = 0; i < myresopnse.length; i++) {
                        if (myresopnse[i].UNION_CD == "M80" || myresopnse[i].UNION_CD == "M98") {
                            index = i;
                        }
                    }
                }
                if (index !== null) {
                    title = myresopnse[index].DESCR;
                }
                ManagerName.value = userValue + " - " + title;
                ManagerSignature.value = userValue;
                ManagerSignDate.value = myresopnse[0].SERVER_DATE;
                ManagerUserId.value = myresopnse[0].EMPUSERID;
               // ManagerEmailId.value = myresopnse[0].EMAILID;
                ManagerEmailId.value = "mepacheco@FULLERTON.EDU";
                ManagersName.value = userValue;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
    } else {
        ManagerName.value = "";
        ManagerSignature.value = "";
        ManagerSignDate.value = null;
        ManagerUserId.value = "";
        ManagerEmailId.value = "";
        ManagersName.value = "";
    }
}
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_ManagerSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_ManagerSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_ManagerSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_ManagerSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmployeeCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmployeeCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === "ToEmployee") {
    if (this.value == 1) {
        var uservalue;
        $.ajax({
            type: 'GET',
            url: "/bin/getEvaluationFormData",
            data: {
                action: "EMP_DETAILS"
            },
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse[0].EMP_NAME;
                var title = "";
                if (EmployeeTitle.value !== null) {
                    title = EmployeeTitle.value;
                }
                //var title = myresopnse[0].DESCR;
                EmployeeName.value = userValue + " - " + title;
                EmployeeSignature.value = userValue;
                EmployeeSignDate.value = myresopnse[0].SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
    } else {
        EmployeeName.value = "";
        EmployeeSignature.value = "";
        EmployeeSignDate.value = null;
    }
}
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmployeeSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmployeeSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmployeeSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmployeeSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmployeeDivisionId_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmployeeDivisionId_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (this.value !== null) {
        var divisionVal = this.value;
        $.ajax({
            type: 'GET',
            url: "/bin/getEvaluationFormData",
            data: {
                division: divisionVal,
                action: "HR_COO_DATA"
            },
            dataType: 'json',
            success: function(myresopnse) {
                HRCoordinatorUserId.value = myresopnse[0].USERID;
                HRCoordinatorFirstName.value = myresopnse[0].FIRSTNAME;
                HRCoordinatorLastName.value = myresopnse[0].LASTNAME;
                HRCoordinatorEmailId.value =myresopnse[0].EMAIL;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
    } else {
        HRCoordinatorUserId.value = "";
        HRCoordinatorFirstName.value = "";
        HRCoordinatorLastName.value = "";
        HRCoordinatorEmailId.value = "";
    }
}
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmployeeDivisionId_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_EmployeeDivisionId_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (this.value !== null) {
        var divisionVal = this.value;
       // var email = "yjayaram@fullerton.edu";
       /* if(divisionVal == "10131"){
           HRCoordinatorUserId.value = "tgarcia";
           HRCoordinatorFirstName.value = "Tara";
           HRCoordinatorLastName.value = "Garcia";
          // HRCoordinatorEmailId.value = "tgarcia@FULLERTON.EDU";
        }else if(divisionVal == "10189"){
           HRCoordinatorUserId.value = "erubalcava";
           HRCoordinatorFirstName.value = "Elva";
           HRCoordinatorLastName.value = "Rubalcava";
           HRCoordinatorEmailId.value = "erubalcava@FULLERTON.EDU";
        }else if(divisionVal == "10236"){
           HRCoordinatorUserId.value = "ceforgues";
           HRCoordinatorFirstName.value = "Chalea";
           HRCoordinatorLastName.value = "Forgues";
           HRCoordinatorEmailId.value = "ceforgues@FULLERTON.EDU";
        }else if(divisionVal == "10238"){
           HRCoordinatorUserId.value = "cmuriel";
           HRCoordinatorFirstName.value = "Christine";
           HRCoordinatorLastName.value = "Muriel";
           HRCoordinatorEmailId.value = "cmuriel@FULLERTON.EDU";
        }else*/ if(divisionVal == "10141"){
           HRCoordinatorUserId.value = "mabadal";
           HRCoordinatorFirstName.value = "Matthew";
           HRCoordinatorLastName.value = "Badal";
        //   HRCoordinatorEmailId.value = "mabadal@FULLERTON.EDU";
           HRCoordinatorEmailId.value = "mepacheco@FULLERTON.EDU";
        }else if(divisionVal == "10239"){
           HRCoordinatorUserId.value = "jvarreola";
           HRCoordinatorFirstName.value = "Juanita";
           HRCoordinatorLastName.value = "Arreola";
          // HRCoordinatorEmailId.value = "jvarreola@FULLERTON.EDU";
           HRCoordinatorEmailId.value = "mepacheco@FULLERTON.EDU";
        }
               
    } else {
        HRCoordinatorUserId.value = "";
        HRCoordinatorFirstName.value = "";
        HRCoordinatorLastName.value = "";
        HRCoordinatorEmailId.value = "";
    }
}
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if (Name.value !== null) {
    getPdf();
}else{
  //alert("Please fill all the required fields");
      showErrorModal("Alert!", "Please fill all the required fields");
   }

function getPdf() {
    console.log("in view pdf");
  
    window.guideBridge.getDataXML({
        success: function(result) {
           console.log("in view pdf="+result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/work-schedule-request/pilot-summer-9-80-work-schedule-request-form');
            jsonData.append('fileName', Name.value);          
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
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_saveguidedraft1629881233615_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_saveguidedraft1629881233615_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_saveguidedraft1629881233615_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_saveguidedraft1629881233615_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(Cwid.value !== null){
   aftiaDescCWID.value = Name.value+" "+Cwid.value;
}
handleDraftSave(this);


        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_submit1600234699256_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_submit1600234699256_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_submit1600234699256_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
work_schedule_request_pilot_summer_9_80_work_schedule_request_form.generated_submit1600234699256_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (Cwid.value !== null) {
    aftiaDescCWID.value = Name.value + " " + Cwid.value;
    EmailSubject.value = "Test - Summer 9/80 Work Schedule Request - " + Name.value + ", " + EmplId.value + ", " + EmplRcd.value + ", "+ Unit.value;
}
var email = "mepacheco@FULLERTON.EDU";
EmployeeEmailId.value = email;
ManagerEmailId.value = email;
HRCoordinatorEmailId.value = email;

guideBridge.submit();


/*if(ExemptStatus.value == 2 && NonExemptChoice.value === null){
   showErrorModal("Alert!", "Please check one of the Friday off start option as Employee is non Exempt");
}else{
 EmployeeEmailId.value = "mepacheco@FULLERTON.EDU";
  ManagerEmailId.value = "mepacheco@FULLERTON.EDU";
 HRCoordinatorEmailId.value = "mepacheco@FULLERTON.EDU";
guideBridge.submit();
}*/
        }
	}
}
