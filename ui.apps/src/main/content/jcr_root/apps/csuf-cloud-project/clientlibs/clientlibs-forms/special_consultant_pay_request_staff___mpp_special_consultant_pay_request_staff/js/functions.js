/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
$.ajax({

    type: 'GET',

    url: "/bin/getLoggedUserId",
    dataType: 'json',
    success: function(myresopnse) {
        gifModal.style.display = "block";
        var userValue = myresopnse.userId;


        var userID = userValue;

        //alert("userID="+userID);
        $.ajax({
            type: 'GET',
            url: "/bin/getSplUserLookup",
            data: {
                userID: userID
            },
            dataType: 'json',

            success: function(myresopnse) {
                
                var modal = document.getElementById('myModal');
                var span = document.getElementsByClassName("close")[0];
                var gifModal = document.getElementById('gifModal');
                if (myresopnse.length === 1) {

                    EmpFname.value = myresopnse[0].FIRST_NAME;
                    EmpLname.value = myresopnse[0].LAST_NAME;
                    Unit.value = myresopnse[0].CSU_UNIT;
                    HRDeptID.value = myresopnse[0].DEPTID;
                    EmpMname.value = myresopnse[0].MIDDLE_NAME;                  
                    Dept.value = myresopnse[0].DEPTNAME;
                    College.value = myresopnse[0].FUL_COLLEGE_NAME;
                    OfficeOrRoom.value = myresopnse[0].BUILDING;
					empUserId.value = myresopnse[0].EMP_USERID;
                    employeeEmail.value = myresopnse[0].EMP_EMAIL_ID;
					EmpIDInitiator.value = myresopnse[0].EMPLID;
					EmpID.value = myresopnse[0].EMPLID;
                  	EmpIDInitiator.value = myresopnse[0].EMPLID;
                  	CBID.value = myresopnse[0].UNION_CD;
                   	var cbidVal = CBID.value;
                    var deptIdVal = HRDeptID.value;
                    var empIdVal = EmpID.value;
                  
                    $.ajax({

                        type: 'GET',

                        url: "/bin/getManagerDetails",
                        data: {
                            deptid: deptIdVal,
                            cwid: empIdVal,
                            union_cd: cbidVal

                        },
                        dataType: 'json',
                        success: function(managerDetails) {
                            ManagerUserId.value = managerDetails[0].MANAGER_EMP_USERID;
                            ManagerEmailId.value = managerDetails[0].MANAGER_EMAIL_ID;
                            //ManagerEmailId.value = "swathi.thoughtfocus@gmail.com";
							ManagerName.value = managerDetails[0].MANAGER_NAME;
                        },
                        error: function(error) {
                            alert("error block=" + error);
                        }
                    });
                    gifModal.style.display = "none";

                } else if (myresopnse.length > 1) {

                    gifModal.style.display = "none";
                    modal.style.display = "block";

                    var col = [];

                    col.push("FIRST_NAME");
                    col.push("LAST_NAME");
                    col.push("MIDDLE_NAME");
                    col.push("BUILDING");
                    col.push("CSU_UNIT");

                    var table = document.createElement("table");
                    table.id = "tb";
                    var tr = table.insertRow(-1);
                    var headings = ["", "First_Name", "Last_Name", "Middle_Initial", "Office_Room", "Unit"];
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
                    okButton.value = "Ok";
                    okButton.onclick = function(event) {
                       
                        var n;
                        var rButtonStatus;
                        //var rButtonStatusFalse;
                        var rButtons = document.getElementsByClassName("rb");
                        for (n = 0; n < rButtons.length; n++) {
                            if (rButtons[n].checked === false) {

                                rButtonStatus = false;
                            } else {

                                EmpFname.value = myresopnse[0].FIRST_NAME;
                                EmpLname.value = myresopnse[n].LAST_NAME;
                                Unit.value = myresopnse[n].CSU_UNIT;
                                HRDeptID.value = myresopnse[n].DEPTID;
                                EmpMname.value = myresopnse[n].MIDDLE_NAME;                              
                                Dept.value = myresopnse[n].DEPTNAME;
                                College.value = myresopnse[n].FUL_COLLEGE_NAME;
                                OfficeOrRoom.value = myresopnse[n].BUILDING;
                              	empUserId.value = myresopnse[n].EMP_USERID;
                    			employeeEmail.value = myresopnse[n].EMP_EMAIL_ID;
                                EmpIDInitiator.value = myresopnse[n].EMPLID;
								EmpID.value = myresopnse[n].EMPLID;
                               	EmpIDInitiator.value = myresopnse[n].EMPLID;
                               	CBID.value = myresopnse[n].UNION_CD;
                              
                                var cbidVal = CBID.value;
                                var deptIdVal = HRDeptID.value;
                                var empIdVal = EmpID.value;
                                $.ajax({

                                    type: 'GET',

                                    url: "/bin/getManagerDetails",
                                    data: {
                                        deptid: deptIdVal,
                                        cwid: empIdVal,
                                        union_cd: cbidVal

                                    },
                                    dataType: 'json',
                                    success: function(managerDetails) {
                                        ManagerUserId.value = managerDetails[0].MANAGER_EMP_USERID;
                                        ManagerEmailId.value = managerDetails[0].MANAGER_EMAIL_ID;
                                        //ManagerEmailId.value = "swathi.thoughtfocus@gmail.com";
                                        ManagerName.value = managerDetails[0].MANAGER_NAME;
                                    },
                                    error: function(error) {
                                        alert("error block=" + error);
                                    }
                                });
                              
                                rButtonStatus = true;
                              	modal.style.display = "none";
                                break;
                            }
                        }
                        if (rButtonStatus === false) {
                            showErrorModal("Alert!","Please select the department");
                            modal.style.display = "block";
                        }
                    };
                    var footerModal = document.getElementById("modal_footer");

                    footerModal.appendChild(okButton);

                } else {
                    showErrorModal("Alert!","No matching records found");
  gifModal.style.display = "none";
                }
                ////////////////////////////////////////////
                span.onclick = function() {

                    modal.style.display = "none";
                };

            }
        });
    }

});
}
        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  empPanel.visible = true;
  ManagerPanel.visible = false;
  PayrollPanel.visible = false;
   EmpDate.mandatory = "error";
            EmpSign.mandatory = "error";
  FormPreparedBy.mandatory = "error";
  EmpCB.mandatory = "error";
}
if(StageIndicator.value === "ToSupervisor"){
  empPanel.enabled = false;
  ManagerPanel.visible = true;
  PayrollPanel.visible = false;
  HRServicePanel.enabled = false;
ApprovalsPanel.enabled = false;
employeeDetails.enabled = false;
}
if(StageIndicator.value === "ToPayroll"){
  empPanel.visible = true;
  empPanel.enabled = false;
  ManagerPanel.visible = true;
  ManagerPanel.enabled = false;
  PayrollPanel.visible = true;
   HRServicePanel.enabled = false;
ApprovalsPanel.enabled = false;
employeeDetails.enabled = false;
}
if(StageIndicator.value === "ToEmployee"){
  empPanel.visible = true;
  empPanel.enabled = true;
  ManagerPanel.visible = false;
  PayrollPanel.visible = false;
}
        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_EmpID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_EmpID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if((EmpIDInitiator.value == this.value && StageIndicator.value === null && EmpIdFlag.value != EmpIDInitiator.value) || (EmpIDInitiator.value !== this.value  && StageIndicator.value === null)){
empPanel.enabled = false;
   EmpDate.value = "";
            EmpSign.value = "";
  FormPreparedBy.value = null;
  EmpComments.value = null;
  EmpCB.value = "";
  EmpDate.mandatory = "";
            EmpSign.mandatory = "";
  FormPreparedBy.mandatory = null;
  EmpCB.mandatory = "";
        var cwid = this.value;
EmpIdFlag.value = cwid;
           if(EmpIDInitiator.value !== this.value){
        $.ajax({
            type: 'GET',
            url: "/bin/getSplEmpLookup",
            data: {
                cwid: cwid
            },
            dataType: 'json',

            success: function(myresopnse) {
                //alert("myresopnse.length="+myresopnse);
                // debugger;
                var modal = document.getElementById('myModal');
                var span = document.getElementsByClassName("close")[0];
                var gifModal = document.getElementById('gifModal');
                if (myresopnse.length === 1) {
					generatePDF.visible = true;
                    EmpFname.value = myresopnse[0].FIRST_NAME;

                    EmpLname.value = myresopnse[0].LAST_NAME;

                    //  EmpID.value = myresopnse[0].EMPLID;

                    Unit.value = myresopnse[0].CSU_UNIT;

                    HRDeptID.value = myresopnse[0].DEPTID;

                    EmpMname.value = myresopnse[0].MIDDLE_NAME;
                   
                    Dept.value = myresopnse[0].DEPTNAME;
                    College.value = myresopnse[0].FUL_COLLEGE_NAME;
                    OfficeOrRoom.value = myresopnse[0].BUILDING;
					empUserId.value = myresopnse[0].EMP_USERID;
                    employeeEmail.value = myresopnse[0].EMP_EMAIL_ID;
 					 CBID.value = myresopnse[0].UNION_CD;
                  var cbidVal = CBID.value;
                    var deptIdVal = HRDeptID.value;
                    var empIdVal = EmpID.value;
                    $.ajax({

                        type: 'GET',

                        url: "/bin/getManagerDetails",
                        data: {
                            deptid: deptIdVal,
                            cwid: empIdVal,
                            union_cd: cbidVal

                        },
                        dataType: 'json',
                        success: function(managerDetails) {
                            ManagerUserId.value = managerDetails[0].MANAGER_EMP_USERID;
                            ManagerEmailId.value = managerDetails[0].MANAGER_EMAIL_ID;
                            ManagerEmailId.value = "swathi.thoughtfocus@gmail.com";
							ManagerName.value = managerDetails[0].MANAGER_NAME;
                        },
                        error: function(error) {
                            alert("error block=" + error);
                        }
                    });
                    gifModal.style.display = "none";

                } else if (myresopnse.length > 1) {
					generatePDF.visible = true;
                    gifModal.style.display = "none";
                    modal.style.display = "block";

                    var col = [];

                     col.push("FIRST_NAME");

                    col.push("LAST_NAME");

                    col.push("MIDDLE_NAME");

                    col.push("BUILDING");

                    col.push("CSU_UNIT");

                    var table = document.createElement("table");
                    table.id = "tb";
                    var tr = table.insertRow(-1);
                   var headings = ["", "First_Name", "Last_Name", "Middle_Initial", "Office_Room", "Unit"];
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

                        /* button.onclick = function(event) {
                             //alert("xcvbn");
                             //debugger;
                             deptHidden.value = event.currentTarget.parentNode.parentElement.childNodes[4].innerText;
                             DeptNameHidden.value = event.currentTarget.parentNode.parentElement.childNodes[5].innerText;

                         };*/

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
                    /*var cancelButton = document.createElement("input");
                    cancelButton.type = "button";
                    cancelButton.setAttribute("class", "cancelBtn");
                    cancelButton.id = "cBtn";
                    cancelButton.value = "Cancel";
                    cancelButton.onclick = function(event) {
                        modal.style.display = "none";
                    };
                    

                    footerModal.appendChild(cancelButton);*/
                    //if(table.rows[1].cells[0].childNodes[0].checked){alert("hi");}else{alert("hello");}
                    var footerModal = document.getElementById("modal_footer");
                    var okButton = document.createElement("input");
                    okButton.type = "button";
                    okButton.setAttribute("class", "okBtn");
                    //okButton.id = "okBtn";
                    okButton.value = "Ok";
                    okButton.onclick = function(event) {
                        /*if (cbidHidden.value === null) {
                            alert("Please select any one of the Staff");
                            modal.style.display = "block";
                        }*/
                        var n;
                        var rButtonStatus;
                        //var rButtonStatusFalse;
                        var rButtons = document.getElementsByClassName("rb");
                        for (n = 0; n < rButtons.length; n++) {
                            if (rButtons[n].checked === false) {

                                rButtonStatus = false;
                            } else {

                                EmpFname.value = myresopnse[0].FIRST_NAME;

                                EmpLname.value = myresopnse[n].LAST_NAME;

                                //  EmpID.value = myresopnse[0].EMPLID;

                                Unit.value = myresopnse[n].CSU_UNIT;

                                HRDeptID.value = myresopnse[n].DEPTID;

                                EmpMname.value = myresopnse[n].MIDDLE_NAME;
                                
                                Dept.value = myresopnse[n].DEPTNAME;
                                College.value = myresopnse[n].FUL_COLLEGE_NAME;
                                OfficeOrRoom.value = myresopnse[n].BUILDING;
                              empUserId.value = myresopnse[n].EMP_USERID;
                    			employeeEmail.value = myresopnse[n].EMP_EMAIL_ID;
                              CBID.value = myresopnse[n].UNION_CD;
                               var cbidVal = CBID.value;
                    var deptIdVal = HRDeptID.value;
                    var empIdVal = EmpID.value;
                    $.ajax({

                        type: 'GET',

                        url: "/bin/getManagerDetails",
                        data: {
                            deptid: deptIdVal,
                            cwid: empIdVal,
                            union_cd: cbidVal

                        },
                        dataType: 'json',
                        success: function(managerDetails) {
                            ManagerUserId.value = managerDetails[0].MANAGER_EMP_USERID;
                            ManagerEmailId.value = managerDetails[0].MANAGER_EMAIL_ID;
                            ManagerEmailId.value = "swathi.thoughtfocus@gmail.com";
							ManagerName.value = managerDetails[0].MANAGER_NAME;
                        },
                        error: function(error) {
                            alert("error block=" + error);
                        }
                    });
                                rButtonStatus = true;
                              modal.style.display = "none";
                                break;
                            }
                        }
                        if (rButtonStatus === false) {
                            showErrorModal("Alert!","Please select the department");
                            modal.style.display = "block";
                        }
                    };
                    var footerModal = document.getElementById("modal_footer");

                    footerModal.appendChild(okButton);

                } else {
                   showErrorModal("Alert!","No matching records found");

                }
                ////////////////////////////////////////////
                span.onclick = function() {

                    modal.style.display = "none";
                };

            }
        });
           }
}
if(EmpIDInitiator.value === this.value  && StageIndicator.value === null){
  empPanel.enabled = true;
   EmpDate.mandatory = "error";
   EmpSign.mandatory = "error";
  FormPreparedBy.mandatory = "error";
  EmpCB.mandatory = "error";
}
 
        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_EmpStatusRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_EmpStatusRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "4"){
  StatusTB.visible = true;
  StatusTB.mandatory = "error";
  }else{
    StatusTB.value = "";
    StatusTB.visible = false;
     StatusTB.mandatory = "";
  }
        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_StatusTB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_StatusTB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_FiscalAnotherLocationRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_FiscalAnotherLocationRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "2"){
  FiscalExtendedEducationTB.visible = true;
  FiscalExtendedEducationTB.mandatory = "error";
  
}else{
  FiscalExtendedEducationTB.visible = false;
  FiscalExtendedEducationTB.mandatory = "";
  FiscalExtendedEducationTB.value = "";
}
        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_FiscalExtendedEducationTB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_FiscalExtendedEducationTB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_FiscalExtendedEducationRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_FiscalExtendedEducationRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "2"){
  FiscalAnotherLocationTB.visible = true;
  FiscalAnotherLocationTB.mandatory = "error";
  
}else{
  FiscalAnotherLocationTB.visible = false;
  FiscalAnotherLocationTB.mandatory = "";
  FiscalAnotherLocationTB.value = "";
}
        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_FiscalAnotherLocationTB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_FiscalAnotherLocationTB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_HiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_HiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_FundingCMSPos_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_FundingCMSPos_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
this.value = ("8").concat(this.value).concat("4660");
}
if(StageIndicator.value === "ToEmployee"){
  var pos = this.value;
  if(pos.substring(pos.length - 4, pos.length) == "4660"){
    pos = pos.substring(1, str.length - 4);
    this.value = ("8").concat(pos).concat("4660");
  }else{
    this.value = ("8").concat(this.value).concat("4660");
  }
}
        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_FundingDept_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_FundingDept_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
document.getElementById("guideContainer-rootPanel-employeeinformation-qualityQuantityOralCommunication-supportingDocuments-FundingDept1574069110130___guide-item").maxLength = 5;
        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_AuxCMSPos_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_AuxCMSPos_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
this.value = ("A").concat(this.value).concat("4660");
}
if(StageIndicator.value === "ToEmployee"){
  var pos = this.value;
  if(pos.substring(pos.length - 4, pos.length) == "4660"){
    pos = pos.substring(1, str.length - 4);
    this.value = ("A").concat(pos).concat("4660");
  }else{
    this.value = ("A").concat(this.value).concat("4660");
  }
}
        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_EmpCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_EmpCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            

  
  if(StageIndicator.value === "ToEmployee" || (StageIndicator.value === null && EmpIDInitiator.value == EmpID.value)){
if(this.value == 1){

        if (EmpDate.value === null) {
            var dateString = new Date().toLocaleString("en-US", {
                timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
            }).replace(/[^ -~]/g, '');
            var dateObject = new Date(dateString);
            var curyear = dateObject.getFullYear();
            var curyearMonth = dateObject.getMonth() + 1;
            var curyearDay = dateObject.getDate();
            var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
            EmpDate.value = d;
            EmpDate.enabled = false;
           $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetailsFromDB",
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].FULL_NAME;
                    EmpSign.value = userValue;
                 
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
        } else {
            EmpDate.value = "";
            EmpSign.value = "";
        }
}
    else {
            EmpDate.value = "";
            EmpSign.value = "";
        }
}


        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_ManagerCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_ManagerCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            

  
  if(StageIndicator.value === "ToSupervisor" ){
if(this.value == 1){

        if (ManagerSignDate.value === null) {
            var dateString = new Date().toLocaleString("en-US", {
                timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
            }).replace(/[^ -~]/g, '');
            var dateObject = new Date(dateString);
            var curyear = dateObject.getFullYear();
            var curyearMonth = dateObject.getMonth() + 1;
            var curyearDay = dateObject.getDate();
            var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
            ManagerSignDate.value = d;
            ManagerSignDate.enabled = false;
           $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetailsFromDB",
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].FULL_NAME;
                    ManagerSign.value = userValue;
                 
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
        } else {
            ManagerSignDate.value = "";
            ManagerSign.value = "";
        }
}
    else {
            ManagerSign.value = "";
            ManagerSignDate.value = "";
        }
}


        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_PayRollCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_PayRollCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            

  
  if(StageIndicator.value === "ToPayroll" ){
if(this.value == 1){

        if (PayRollSignDate.value === null) {
            var dateString = new Date().toLocaleString("en-US", {
                timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
            }).replace(/[^ -~]/g, '');
            var dateObject = new Date(dateString);
            var curyear = dateObject.getFullYear();
            var curyearMonth = dateObject.getMonth() + 1;
            var curyearDay = dateObject.getDate();
            var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
            PayRollSignDate.value = d;
            PayRollSignDate.enabled = false;
           $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetailsFromDB",
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].FULL_NAME;
                    PayRollSign.value = userValue;
                 
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
        } else {
            PayRollSignDate.value = "";
            PayRollSign.value = "";
        }
}
    else {
            PayRollSign.value = "";
            PayRollSignDate.value = "";
        }
}


        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_generatePDF_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_generatePDF_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_generatePDF_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_generatePDF_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (EmpID.value !== null) {
    draftButton.value = "Draft";
    getPdf();
}

function getPdf() {
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/special-consultant-pay-request-staff---mpp/special-consultant-pay-request-staff');
            jsonData.append('fileName', EmpFname.value + "_" + EmpLname.value + "(" + EmpID.value + ")" + "_" + Date.now());
          debugger;
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
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_saveguidedraft1565475056503_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_saveguidedraft1565475056503_click0 = function (scope) {
    with(this) {
        with(scope) {
              aftiaDescCWID.value = (EmpFname.value + " " + EmpLname.value + " " + EmpID.value);
handleDraftSave(this);


        }
	}
}
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_submit1565475065055_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_submit1565475065055_click0 = function (scope) {
    with(this) {
        with(scope) {
            EmailSubject.value = "Test - Special Consultant Timesheet (2021) - " + EmpID.value;

var submitFlag = 1;
if(EmpStatusRB.value === "Other(e.g split Appointment)"){
  if(StatusTB.value === null){
    alert("Please enter a status");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].OuterPanel[0].InformationTab[0].EmployeeInfoPanel[0].StatusTB[0]");
    submitFlag = 1;
  } else{
    submitFlag = 0;
  }
}else{
  submitFlag = 0;
}

if(submitFlag === 0){
   aftiaDescCWID.value = (EmpFname.value + " " + EmpLname.value + " " + EmpID.value);
  
   /* employeeEmail.value = "yjayaram@fullerton.edu";
   ManagerEmailId.value = "yjayaram@fullerton.edu"; */
  
   employeeEmail.value = "ajeet.chhonkar@thoughtfocus.com";
   ManagerEmailId.value = "ajeet.chhonkar@thoughtfocus.com";
  
  guideBridge.submit();
}



        }
	}
}
