/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {

    AfterTheFactEvaluationPanel.visible = false;
    InitiatorPanel.visible = false;
    // InitiatorPanel.visible = true;
    FacultySignPanel.visible = true;
    ChairSignPanel.visible = false;
    DeanSignPanel.visible = false;
    ChairSignPanel_2.visible = false;
    InitiatorPanel_2.visible = false;
    FacultySignPanel_2.visible = false;

}

if (StageIndicator.value == "ToFaculty") {
    BasicDetails.enabled = true;
    TermsOfAgreementPanel.enabled = true;
    AfterTheFactEvaluationPanel.visible = false;
    if (InitiatorCB1.value == "1") {
        InitiatorPanel.visible = true;
      InitiatorPanel.enabled = false;

    } else {
        InitiatorPanel.visible = false;
    }

    FacultySignPanel.visible = true;
    FacultySignPanel.enabled = true;
    ChairSignPanel.visible = false;
    ChairSignPanel.enabled = false;
    DeanSignPanel.visible = false;
    DeanSignPanel.visible = false;
    FacultySignPanel_2.visible = false;
    ChairSignPanel_2.visible = false;
    InitiatorPanel_2.visible = false;
}

if (StageIndicator.value == "ToEvalFaculty") {
    BasicDetails.visible = true;  
    BasicDetails.enabled = false;
    TermsOfAgreementPanel.visible = true;
    TermsOfAgreementPanel.enabled = false;
    AfterTheFactEvaluationPanel.visible = true;
    AfterTheFactEvaluationPanel.enabled = true;
    if (InitiatorCB1.value == "1") {
        InitiatorPanel.visible = true;
      InitiatorPanel.enabled = false;

    } else {
        InitiatorPanel.visible = false;
    }

    InitiatorPanel.visible = false;
    InitiatorPanel.enabled = false;
    FacultySignPanel.visible = false;
    FacultySignPanel.enabled = false;
    ChairSignPanel.visible = false;
    ChairSignPanel.enabled = false;
    DeanSignPanel.visible = false;
    DeanSignPanel.visible = false;
    FacultySignPanel_2.visible = true;
    FacultySignPanel_2.enabled = true;
    ChairSignPanel_2.visible = false;
    InitiatorPanel_2.visible = false;
}


if (StageIndicator.value == "ToChair") {
    BasicDetails.enabled = false;
    AfterTheFactEvaluationPanel.visible = false;
    TermsOfAgreementPanel.visible = true;
    TermsOfAgreementPanel.enabled = false;
    if (InitiatorCB1.value == "1") {
        InitiatorPanel.visible = true;
      InitiatorPanel.enabled = false;

    } else {
        InitiatorPanel.visible = false;
    }

    if (FacultyCB.value == "1") {
        FacultySignPanel.visible = true;
    } else {
        FacultySignPanel.visible = false;
    }
    FacultySignPanel.enabled = false;

    ChairSignPanel.visible = true;
    ChairSignPanel.enabled = true;
    DeanSignPanel.visible = false;
    FacultySignPanel_2.visible = false;
    ChairSignPanel_2.visible = false;
    InitiatorPanel_2.visible = false;
}

if (StageIndicator.value == "ToEvalChair") {
    BasicDetails.visible = true; 
    BasicDetails.enabled = false;
    AfterTheFactEvaluationPanel.visible = true;
    AfterTheFactEvaluationPanel.enabled = false;
    TermsOfAgreementPanel.visible = true;
    TermsOfAgreementPanel.enabled = false;
    if (InitiatorCB1.value == "1") {
        InitiatorPanel.visible = true;
      InitiatorPanel.enabled = false;

    } else {
        InitiatorPanel.visible = false;
    }

    if (Faculty2CB.value == "1") {
        FacultySignPanel_2.visible = true;
    } else {
        FacultySignPanel_2.visible = false;
    }
    FacultySignPanel_2.enabled = false;

    ChairSignPanel.visible = false;
    ChairSignPanel.enabled = false;
    DeanSignPanel.visible = false;
    FacultySignPanel.visible = false;
    ChairSignPanel_2.visible = true;
    ChairSignPanel_2.enabled = true;
    InitiatorPanel_2.visible = false;
    InitiatorPanel.visible = true;
}

if (StageIndicator.value == "ToDean") {
    BasicDetails.enabled = false;
    AfterTheFactEvaluationPanel.visible = false;
    TermsOfAgreementPanel.visible = true;
    TermsOfAgreementPanel.enabled = false;

    if (InitiatorCB1.value == "1") {
        InitiatorPanel.visible = true;
      InitiatorPanel.enabled = false;

    } else {
        InitiatorPanel.visible = false;
    }

    if (FacultyCB.value == "1") {
        FacultySignPanel.visible = true;
    } else {
        FacultySignPanel.visible = false;
    }
    // FacultySignPanel.visible = true;
    FacultySignPanel.enabled = false;
    ChairSignPanel.visible = true;
    ChairSignPanel.enabled = false;
    DeanSignPanel.visible = true;
    DeanSignPanel.enabled = true;
    FacultySignPanel_2.visible = false;
    ChairSignPanel_2.visible = false;
    InitiatorPanel_2.visible = false;
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_guideRootPanel_init1 = function (scope) {
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
            RequestorName.value = userValue;
            
            RequestorUserID.value = myresopnse[0].EMPUSERID;
            RequestorEmail.value = myresopnse[0].EMAILID;
            //InitiatorUserName.value = userValue;
            
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
 * @function mamata_hr_covid_19_self_certification_copy.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            //New code
debugger;
if (StageIndicator.value === null) {
    $.ajax({

        type: 'GET',

        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(myresponse) {
            var userValue = myresponse.userId;
            logUser.value = userValue;
            workflow_initiator.value = userValue;

            //if (CWID.value !== null) {

            var gifModal = document.getElementById('gifModal');
            gifModal.style.display = "block";

            $.ajax({
                type: 'GET',
                url: "/bin/getHRCovidVaccinationFormData",
                data: {
                    userId: userValue,
                    action: "HR_EMP_DATA"
                },
                dataType: 'json',
                success: function(myresponse) {

                    var modal = document.getElementById('myModal');
                    var span = document.getElementsByClassName("close")[0];

                    if (myresponse.length !== 0) {
                       var name = (myresponse[0].EMAIL).toLowerCase();
                              if(name.lastIndexOf("exchange.")!= -1){
                              name = name.replace("exchange.","");
                              }
                        CWID.value = myresponse[0].EMPLID;
                        CampusEmail.value = name;
                        FirstName.value = myresponse[0].FIRST_NAME;
                        LastName.value = myresponse[0].LAST_NAME;
                        DepartmentID.value = myresponse[0].DEPTID;
                        DepartmentName.value = myresponse[0].DEPTNAME;
                        Division.value = myresponse[0].FUL_DIVISION_NAME;
                        // DivisionID.value = myresponse[0].FUL_DIVISION;
                        Title.value = myresponse[0].DESCR;
                        //   CampusExtension.value = myresponse[0].PHONE;
                        //   CampusLocation.value = myresponse[0].BUILDING;
                        //AppropriateAdministrator.value = myresponse[0].MANAGER;

                        var myArr = (myresponse[0].MANAGER).split("|");
                        ManagerUserID.value = myArr[1];
                        ManagerName.value = myArr[0];
                        AppropriateAdministrator.value = myArr[0];
                        EmployeeUserID.value = myresponse[0].USERID;
                        EmployeeName.value = FirstName.value + " " + LastName.value;
                        var empType = myresponse[0].EMP_TYPE;
                        if (empType == "Permanent") {
                            EmploymentType.value = "1";
                        } else {
                            EmploymentType.value = "2";
                        }


                        /*if (myresponse[0].EXPECTED_END_DATE.trim() !== "N/A") {
                        	var dateVal = myresponse[0].EXPECTED_END_DATE;
                        	var d = (dateVal.substring(6, dateVal.length) + "-" + dateVal.substring(0, 2) + "-" + dateVal.substring(3, 5));
                        	AppointmentEndDate.value = d;
                        }*/
                        var empPosition = myresponse[0].POSITION;
                        if (empPosition == "Faculty") {
                            EmploymentCatagory.value = "1";
                        } else if (empPosition == "Staff") {
                            EmploymentCatagory.value = "2";
                        } else if (empPosition == "Management") {
                            EmploymentCatagory.value = "3";
                        } 
                        /*else if (empPosition == "Student") {
                            EmploymentCatagory.value = "4";
                        } else if (empPosition == "Other") {
                            EmploymentCatagory.value = "5";
                        }*/
                        EmployeeEmail.value = myresponse[0].EMAIL;
                        ManagerEmail.value = myresponse[0].MANAGER_EMAIL_ID;
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

                        var table = document.createElement("table");
                        table.id = "tb";
                        var tr = table.insertRow(-1);
                        var headings = ["", "Emp ID", "Last Name", "First Name", "Department Id", "Department Name"];
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
                                  var name = (myresponse[n].EMAIL).toLowerCase();
                              if(name.lastIndexOf("exchange.")!= -1){
                              name = name.replace("exchange.","");
                              }
                                    CWID.value = myresponse[n].EMPLID;
                                    CampusEmail.value = name;
                                    FirstName.value = myresponse[n].FIRST_NAME;
                                    LastName.value = myresponse[n].LAST_NAME;
                                    DepartmentID.value = myresponse[n].DEPTID;
                                    DepartmentName.value = myresponse[n].DEPTNAME;
                                    Division.value = myresponse[n].FUL_DIVISION_NAME;
                                    //  DivisionID.value = myresponse[n].FUL_DIVISION;
                                    Title.value = myresponse[n].DESCR;
                                    //     CampusExtension.value = myresponse[n].PHONE;
                                    //AppropriateAdministrator.value = myresponse[n].MANAGER;
                                    var myArr = (myresponse[n].MANAGER).split("|");
                                    ManagerUserID.value = myArr[1];
                                    ManagerName.value = myArr[0];
                                    AppropriateAdministrator.value = myArr[0];
                                    var empType = myresponse[n].EMP_TYPE;
                                    EmployeeUserID.value = myresponse[n].USERID;
                                    if (empType == "Permanent") {
                                        EmploymentType.value = "1";
                                    } else {
                                        EmploymentType.value = "2";
                                    }
                                    /*if (myresponse[n].EXPECTED_END_DATE.trim() !== "N/A") {
                                        var dateVal = myresponse[n].EXPECTED_END_DATE;
                                        var d = (dateVal.substring(6, dateVal.length) + "-" + dateVal.substring(0, 2) + "-" + dateVal.substring(3, 5));
                                        AppointmentEndDate.value = d;
                                    }*/
                                    var empPosition = myresponse[n].POSITION;
                                    if (empPosition == "Faculty") {
                                        EmploymentCatagory.value = "1";
                                    } else if (empPosition == "Staff") {
                                        EmploymentCatagory.value = "2";
                                    } else if (empPosition == "Management") {
                                        EmploymentCatagory.value = "3";
                                    } 
                                   /*else if (empPosition == "Student") {
                                        EmploymentCatagory.value = "4";
                                    } else if (empPosition == "Other") {
                                        EmploymentCatagory.value = "5";
                                    }*/
                                    EmployeeEmail.value = myresponse[n].EMAIL;
                                    ManagerEmail.value = myresponse[n].MANAGER_EMAIL_ID;
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
                        DepartmentID.value = "";
                        DepartmentName.value = "";
                        Division.value = "";
                        // DivisionID.value = "";
                        Title.value = "";
                        CampusExtension.value = "";
                        AppropriateAdministrator.value = "";
                        ManagerUserID.value = "";
                        ManagerName.value = "";
                        EmployeeUserID.value = "";
                        AppointmentEndDate.value = "";
                        EmploymentCatagory.value = "";
                        EmployeeEmail.value = "";
                        ManagerEmail.value = "";

                    }

                /*   span.onclick = function() {

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

                    };*/

                }
            });



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
 * @function mamata_hr_covid_19_self_certification_copy.generated_CWID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_CWID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_CWID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_CWID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    $.ajax({

        type: 'GET',

        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(myresponse) {
            var userValue = myresponse.userId;
            logUser.value = userValue;
            workflow_initiator.value = userValue;
            var cwidValue = CWID.value;
            var pattern = /^8\d{8}$/;
            var result = pattern.test(cwidValue);
            if (result !== true) {
                CampusEmail.value = "";
                FirstName.value = "";
                LastName.value = "";
                DepartmentID.value = "";
                DepartmentName.value = "";
                Division.value = "";
                //  DivisionID.value = "";
                Title.value = "";
                CampusExtension.value = "";
                AppropriateAdministrator.value = "";
                ManagerUserID.value = "";
                ManagerName.value = "";
                EmployeeUserID.value = "";
                AppointmentEndDate.value = "";
                EmploymentCatagory.value = "";
                EmployeeName.value = "";
                ManagerEmail.value = "";

                showErrorModal("Alert!", "Please enter a valid Employee ID");

            } else {
                //if (CWID.value !== null) {

                var gifModal = document.getElementById('gifModal');
                gifModal.style.display = "block";
                var cwidVal = CWID.value;

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
                        var name = (myresponse[n].EMAIL).toLowerCase();
                                          if(name.lastIndexOf("exchange.")!= -1){
                                          name = name.replace("exchange.","");
                                          }
                      
                        if (myresponse.length === 1) {
                          
                            CampusEmail.value = name;
                            FirstName.value = myresponse[0].FIRST_NAME;
                            LastName.value = myresponse[0].LAST_NAME;
                            DepartmentID.value = myresponse[0].DEPTID;
                            DepartmentName.value = myresponse[0].DEPTNAME;
                            Division.value = myresponse[0].FUL_DIVISION_NAME;
                            // DivisionID.value = myresponse[0].FUL_DIVISION;
                            Title.value = myresponse[0].DESCR;
                            //   CampusExtension.value = myresponse[0].PHONE;
                            //   CampusLocation.value = myresponse[0].BUILDING;
                            //AppropriateAdministrator.value = myresponse[0].MANAGER;

                            var myArr = (myresponse[0].MANAGER).split("|");
                            ManagerUserID.value = myArr[1];
                            ManagerName.value = myArr[0];
                            AppropriateAdministrator.value = myArr[0];
                            EmployeeUserID.value = myresponse[0].USERID;
                            EmployeeName.value = FirstName.value + " " + LastName.value;
                            var empType = myresponse[0].EMP_TYPE;
                            if (empType == "Permanent") {
                                EmploymentType.value = "1";
                            } else {
                                EmploymentType.value = "2";
                            }


                            if (myresponse[0].EXPECTED_END_DATE.trim() !== "N/A") {
                                var dateVal = myresponse[0].EXPECTED_END_DATE;
                                var d = (dateVal.substring(6, dateVal.length) + "-" + dateVal.substring(0, 2) + "-" + dateVal.substring(3, 5));
                                AppointmentEndDate.value = d;
                            }
                            var empPosition = myresponse[0].POSITION;
                            if (empPosition == "Faculty") {
                                EmploymentCatagory.value = "1";
                            } else if (empPosition == "Staff") {
                                EmploymentCatagory.value = "2";
                            } else if (empPosition == "Management") {
                                EmploymentCatagory.value = "3";
                            } else if (empPosition == "Student") {
                                EmploymentCatagory.value = "4";
                            } else if (empPosition == "Other") {
                                EmploymentCatagory.value = "5";
                            }
                            EmployeeEmail.value = myresponse[0].EMAIL;
                            ManagerEmail.value = myresponse[0].MANAGER_EMAIL_ID;
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

                            var table = document.createElement("table");
                            table.id = "tb";
                            var tr = table.insertRow(-1);
                            var headings = ["", "Emp ID", "Last Name", "First Name", "Department Id", "Department Name"];
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
                                        CampusEmail.value = myresponse[n].EMAIL;
                                        FirstName.value = myresponse[n].FIRST_NAME;
                                        LastName.value = myresponse[n].LAST_NAME;
                                        DepartmentID.value = myresponse[n].DEPTID;
                                        DepartmentName.value = myresponse[n].DEPTNAME;
                                        Division.value = myresponse[n].FUL_DIVISION_NAME;
                                        //  DivisionID.value = myresponse[n].FUL_DIVISION;
                                        Title.value = myresponse[n].DESCR;
                                        //     CampusExtension.value = myresponse[n].PHONE;
                                        //AppropriateAdministrator.value = myresponse[n].MANAGER;
                                        var myArr = (myresponse[n].MANAGER).split("|");
                                        ManagerUserID.value = myArr[1];
                                        ManagerName.value = myArr[0];
                                        AppropriateAdministrator.value = myArr[0];
                                        var empType = myresponse[n].EMP_TYPE;
                                        EmployeeUserID.value = myresponse[n].USERID;
                                        if (empType == "Permanent") {
                                            EmploymentType.value = "1";
                                        } else {
                                            EmploymentType.value = "2";
                                        }
                                        if (myresponse[n].EXPECTED_END_DATE.trim() !== "N/A") {
                                            var dateVal = myresponse[n].EXPECTED_END_DATE;
                                            var d = (dateVal.substring(6, dateVal.length) + "-" + dateVal.substring(0, 2) + "-" + dateVal.substring(3, 5));
                                            AppointmentEndDate.value = d;
                                        }
                                        var empPosition = myresponse[n].POSITION;
                                        if (empPosition == "Faculty") {
                                            EmploymentCatagory.value = "1";
                                        } else if (empPosition == "Staff") {
                                            EmploymentCatagory.value = "2";
                                        } else if (empPosition == "Management") {
                                            EmploymentCatagory.value = "3";
                                        } else if (empPosition == "Student") {
                                            EmploymentCatagory.value = "4";
                                        } else if (empPosition == "Other") {
                                            EmploymentCatagory.value = "5";
                                        }
                                        EmployeeEmail.value = myresponse[n].EMAIL;
                                        ManagerEmail.value = myresponse[n].MANAGER_EMAIL_ID;
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
                            DepartmentID.value = "";
                            DepartmentName.value = "";
                            Division.value = "";
                            // DivisionID.value = "";
                            Title.value = "";
                            CampusExtension.value = "";
                            AppropriateAdministrator.value = "";
                            ManagerUserID.value = "";
                            ManagerName.value = "";
                            EmployeeUserID.value = "";
                            AppointmentEndDate.value = "";
                            EmploymentCatagory.value = "";
                            EmployeeEmail.value = "";
                            ManagerEmail.value = "";

                        }

                        /*span.onclick = function() {

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

                        };*/

                    }
                });
            }
            // }


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
 * @function mamata_hr_covid_19_self_certification_copy.generated_CWID_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_CWID_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
function ChairDeanInfo(deptId){
		
       var dept_id = this.value;
  $.ajax({
                                type: 'GET',
                                url: "/bin/getChairDeanInfo",
								data:{dept_id:dept_id},
                                dataType: 'json',

                                success: function(myresponse) {
                                    
                                    if (myresponse.length !== 0) {                                       
                                        
                                        DeanUserID.value  = myresponse[0].DEAN_USERID;
										DeanEmail.value  = myresponse[0].DEAN_EMAIL;
                                        DeanName.value =  myresponse[0].DEAN_NAME;
                                      	DeanEmail.value = "mamata.hampannavar@thoughtfocus.com";
                                       
                                        
                                    }

                                }
                            });
    
}
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_CWID_valueCommit2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_CWID_valueCommit2 = function (scope) {
    with(this) {
        with(scope) {
            function ChairDeanInfo(deptId){
		
       var dept_id = this.value;
  $.ajax({
                                type: 'GET',
                                url: "/bin/getChairDeanInfo",
								data:{dept_id:dept_id},
                                dataType: 'json',

                                success: function(chairInfoResult) {
                                    
                                    if (chairInfoResult.length !== 0) {                                       
                                        
                                        ChairUserId.value  = chairInfoResult[0].CHAIR_USERID;
										ChairEmail.value  = chairInfoResult[0].CHAIR_EMAIL;
                                        ChairName.value =  chairInfoResult[0].CHAIR_NAME;
                                      	ChairEmail.value = "mamata.hampannavar@thoughtfocus.com";
                                        DeanUserID.value  = chairInfoResult[0].DEAN_USERID;
										DeanEmail.value  = chairInfoResult[0].DEAN_EMAIL;
                                        DeanName.value =  chairInfoResult[0].DEAN_NAME;
                                      	DeanEmail.value = "mamata.hampannavar@thoughtfocus.com";
                                        
                                    }

                                }
                            });
    
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_CampusEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_CampusEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_FirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_FirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_LastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_LastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_DepartmentName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_DepartmentName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_DepartmentID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_DepartmentID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_Title_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_Title_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_Division_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_Division_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_AppropriateAdministrator_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_AppropriateAdministrator_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_EmploymentType_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_EmploymentType_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  if(this.value == 2){
   // TempEndDate.enabled = true;
    TempEndDate.mandatory = true;
  }else{
    // TempEndDate.enabled = false;
     TempEndDate.value = "";
     TempEndDate.mandatory = false;
  }
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_EmploymentCatagory_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_EmploymentCatagory_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  if(this.value == 5){
    OthersValue.enabled = true;
  }else{
    OthersValue.value = "";
    OthersValue.enabled = false;
  }
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_EmploymentCatagory_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_EmploymentCatagory_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=true;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_Section1CB1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_Section1CB1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value=="1"){
  Section1CB2.value="";
  Section1CB3.value="";
  TestStatusCB1.value=""; 
  TestStatusCB2.value="";
  supportDoc1.fileAttachment.mandatory=true;
}else{
   var rowcount1 = BoosterSection.instanceManager.instanceCount;
            for (n = 0; n < rowcount1; n++) {
                BoosterSection.instanceManager.removeInstance(BoosterSection.instanceIndex);
            }
            var rowcount2 = BoosterSection.instanceManager.instanceCount;
            BoosterSection.instanceManager.instances[rowcount2 - 1].BoosterDate.value = null;
            BoosterSection.instanceManager.instances[rowcount2 - 1].BoosterManufacturer.value = null;
            BoosterSection.instanceManager.removeInstance(rowcount2 - 1);

}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_Section1CB1_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_Section1CB1_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value==="1"){  
InsideVaccinePanel.enabled=true;
  InsideVaccinePanel.mandatory=true;
  InsideVaccinePanel.visible =true;
}else{
  InsideVaccinePanel.enabled=false;
  City.value="";
  ManufacturerVaccine.value="";
  FirstDoseDate.value="";
  SecondDoseDate.value="";
  Facility.value=""; 
  State.value=""; 
  Country.value="";
  BoosterDate.value=""; 
  BoosterManufacturer.value="";
  BoosterSection.value = "";
  InsideVaccinePanel.visible = false;
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_InsideVaccinePanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_InsideVaccinePanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible=false;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_Country_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_Country_init0 = function (scope) {
    with(this) {
        with(scope) {
            $.ajax({
            type: 'GET',
            url: "/bin/getHRCovidVaccinationFormData",
            data: {                
              action:"HR_COUNTRY_DATA"
            },
            dataType: 'json',
            success: function(myresponse) {
 			var result = [];
                if (myresponse.length !== 0) {
                for (var i = 0; i < myresponse.length; i++) {
                var item = myresponse[i].COUNTRY;
                result.push(item);
            }

            Country.items = result;               
                }                 
            }
        });
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_AddButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_AddButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            BoosterSection.instanceManager.addInstance();
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_RemoveButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_RemoveButton_click0 = function (scope) {
    with(this) {
        with(scope) {
             var rowCountToRemove = BoosterSection.instanceManager.instanceCount;
    var indexValue = rowCountToRemove-1;  
    BoosterSection.instanceManager.removeInstance(indexValue);
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_Section1CB2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_Section1CB2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value=="1"){
  Section1CB1.value="";
  Section1CB3.value="";
  TestStatusCB1.value=""; 
  TestStatusCB2.value="";
  supportDoc1.fileAttachment.mandatory=true;
  InsideVaccinePanel.enabled=false;
  City.value="";
  ManufacturerVaccine.value="";
  FirstDoseDate.value="";
  SecondDoseDate.value="";
  Facility.value=""; 
  State.value=""; 
  Country.value="";
  BoosterDate.value=""; 
  BoosterManufacturer.value="";
  BoosterSection.value = "";
  InsideVaccinePanel.visible = false;
}
else{
  supportDoc1.fileAttachment.mandatory=false;
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_Section1CB3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_Section1CB3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value=="1"){
  Section1CB1.value="";
  Section1CB2.value="";
  TestStatusCB1.value=""; 
  TestStatusCB2.value="";
  InsideVaccinePanel.enabled=false;
  City.value="";
  ManufacturerVaccine.value="";
  FirstDoseDate.value="";
  SecondDoseDate.value="";
  Facility.value=""; 
  State.value=""; 
  Country.value="";
  BoosterDate.value=""; 
  BoosterManufacturer.value="";
  BoosterSection.value = "";
  InsideVaccinePanel.visible = false;
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_TestStatusCB1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_TestStatusCB1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value=="1"){
  Section1CB1.value="";
  Section1CB2.value="";
  Section1CB3.value="";
  TestStatusCB2.value = "";
  supportDoc1.fileAttachment.mandatory=true;
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_TestStatusCB1_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_TestStatusCB1_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value==="1"){  
InsideVaccinePanel.enabled=true;
  InsideVaccinePanel.mandatory=true;
  InsideVaccinePanel.visible =true;
}else{
  InsideVaccinePanel.enabled=false;
  City.value="";
  ManufacturerVaccine.value="";
  FirstDoseDate.value="";
  SecondDoseDate.value="";
  Facility.value=""; 
  State.value=""; 
  Country.value="";
  BoosterDate.value=""; 
  BoosterManufacturer.value="";
  BoosterSection.value = "";
  InsideVaccinePanel.visible = false;
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_TestStatusCB1_valueCommit2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_TestStatusCB1_valueCommit2 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value=="1"){
  TestStatusCB2.value="";
  supportDoc1.fileAttachment.mandatory=true;
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_TestStatusCB2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_TestStatusCB2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value=="1"){
  Section1CB1.value="";
  Section1CB2.value="";
  Section1CB3.value="";
  TestStatusCB1.value="";
  supportDoc1.fileAttachment.mandatory=true;
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_TestStatusCB2_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_TestStatusCB2_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            
if(this.value==="1"){  
InsideVaccinePanel.enabled=true;
  InsideVaccinePanel.mandatory=true;
  InsideVaccinePanel.visible =true;
}else{
  InsideVaccinePanel.enabled=false;
  City.value="";
  ManufacturerVaccine.value="";
  FirstDoseDate.value="";
  SecondDoseDate.value="";
  Facility.value=""; 
  State.value=""; 
  Country.value="";
  BoosterDate.value=""; 
  BoosterManufacturer.value="";
  BoosterSection.value = "";
  InsideVaccinePanel.visible = false;
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_TestStatusCB2_valueCommit2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_TestStatusCB2_valueCommit2 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value=="1"){
  TestStatusCB1.value="";
  supportDoc1.fileAttachment.mandatory=true;
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_SupDocPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_SupDocPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_supportDoc1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var filePath = supportDoc1.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc1.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc1.fileAttachment.value = fname;
}
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_supportDoc1_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_supportDoc1_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc1.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	  
	
	var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;

	if(format.test(supportDoc1.fileAttachment.value) === true){
		var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
		supportDoc1.fileAttachment.value = doc2NewName;

	}
  if(extension !== "pdf"){
	 
       supportDoc1.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_InitiatorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_InitiatorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
if (this.value == 1) {

        if (InitiatorSignatureDate.value === null) {
            

            InitiatorSignatureDate.enabled = false;
            $.ajax({

                type: 'GET',

                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  InitiatorSignature.value = userValue;
                  InitiatorSignatureDate.value = myresopnse[0].SERVER_DATE;
                  //Initiator1PrintName.value = userValue;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }else {
    InitiatorSignature.value = "";
    InitiatorSignatureDate.value = "";
   // Initiator1PrintName.value = "";
}
} 
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_InitiatorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_InitiatorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_InitiatorSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_InitiatorSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_HiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_HiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_workflow_initiator_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_workflow_initiator_init0 = function (scope) {
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
 * @function mamata_hr_covid_19_self_certification_copy.generated_ExpiryFlag_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_ExpiryFlag_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToSecurityAdminFromTimer"){
 ExpiryMessage.visible = true;
}else{
   ExpiryMessage.visible = false;
}
        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/mamata/hr-covid-19-self-certification-copy');
            //jsonData.append('fileName', FirstName.value + "_" + LastName.value + "(" + EmplId.value + ")" + "_" + Date.now());
            jsonData.append('fileName', FirstName.value + "_"+LastName.value+ "_" + Date.now());
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
 * @function mamata_hr_covid_19_self_certification_copy.generated_saveguidedraft1629881233615_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_saveguidedraft1629881233615_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(CWID.value !== null){
 aftiaDescCWID.value = FirstName.value + " " + LastName.value + " "+CWID.value ;
}
handleDraftSave(this);


        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_submit1600234699256_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_submit1600234699256_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if (Section1CB1.value === null && Section1CB2.value === null && Section1CB3.value === null && TestStatusCB1.value===null && TestStatusCB2.value===null){
    showErrorModal("Alert !", "Please select the appropriate section");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].VaccineORExemptionDetailsPanel[0]");
}

/*else if(Section2CB1.value===null  && (Section1CB1.value=="1" || Section1CB2.value=="1" || Section1CB3.value=="1" || Section1CB4.value=="1")){
   showErrorModal("Alert !", "Please confirm that the information you have provided is accurate and truthful");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].VaccineORExemptionDetailsPanel[0]");
}*/

/*else if(Section1CB1.value !== null && ManufacturerVaccine.value === null && FirstDoseDate.value === null && SecondDoseDate.value === null && BoosterDate.value === null && BoosterManufacturer.value === null && Facility.value === null && City.value === null && State.value === null && Country.value === null){
		showErrorModal("Alert !", "Please enter the details");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].VaccineORExemptionDetailsPanel[0]");
}*/

else if((Section1CB2.value !== null && supportDoc1.value === "")||(Section1CB1.value !== null && supportDoc1.value === "")||(Section1CB3.value !== null && supportDoc1.value === "") || (TestStatusCB1.value && supportDoc1.value === "") || TestStatusCB2.value !== null && supportDoc1.value === ""){
     supportDoc1.fileAttachment.mandatory=true;
     showErrorModal("Alert !", "Please attach the documents");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SupDocPanel[0]");
  
}

else{
  	submitAction();
}

function submitAction(){
 aftiaDescCWID.value = FirstName.value + " " + LastName.value + " " + CWID.value ;
 EmailSubject.value = "Test - HR COVID-19 Vaccination/Testing Self-Certification "+FirstName.value+", "+LastName.value;

EmployeeEmail.value = "yjayaram@fullerton.edu";
ManagerEmail.value = "yjayaram@fullerton.edu";
RequestorEmail.value = "yjayaram@fullerton.edu";
  
/*EmployeeEmail.value = "mamata.hampannavar@thoughtfocus.com";
ManagerEmail.value = "mamata.hampannavar@thoughtfocus.com";
RequestorEmail.value = "mamata.hampannavar@thoughtfocus.com";*/

guideBridge.submit();

} 

        }
	}
}
/**
 * @function mamata_hr_covid_19_self_certification_copy.generated_submit1600234699256_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
mamata_hr_covid_19_self_certification_copy.generated_submit1600234699256_click1 = function (scope) {
    with(this) {
        with(scope) {
            if(CWID.value !== null){
 aftiaDescCWID.value = FirstName.value + " " + LastName.value + " "+CWID.value ;
}
EmailSubject.value = "Test - Covid-19 Vaccination Self Certification "+FirstName.value+", "+LastName.value;

EmployeeEmail.value = "mamata.hampannavar@thoughtfocus.com";
ManagerEmail.value = "mamata.hampannavar@thoughtfocus.com";
RequestorEmail.value = "mamata.hampannavar@thoughtfocus.com";
/*DeanEmail.value = "mamata.hampannavar@thoughtfocus.com";
InitiatorEmail.value = "mamata.hampannavar@thoughtfocus.com";*/

var flag = 0;
if(flag === 0 ){
guideBridge.submit();
}

        }
	}
}
