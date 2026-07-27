/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            var userID = "rpurohit";
  
    $.ajax({
        type: 'GET',
        url: "/bin/getCatastrophicLeaveRequest",
        data: {
            //cwid: cwid123,
            //userID: userID
            userID: 'nvadlakunta'
        },
        dataType: 'json',
        success: function(myresopnse) {
          
            if (myresopnse.length === 1) {
                DepartmentName.value = myresopnse[0].DEPTNAME;
                EMPLRCD.value = myresopnse[0].EMPL_RCD;
                BargainingUnit.value = myresopnse[0].UNION_CD;
                DepartmentID.value = myresopnse[0].DEPTID;
                LastName.value = myresopnse[0].LAST_NAME;
                FirstName.value = myresopnse[0].FIRST_NAME;
                EMPLID.value = myresopnse[0].EMPLID;
                
            }
        }
    });
          
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var status;
    /*if(formSavedStatus.value !== null){
      UserLookupFlag.value = FeeWaiverRequestedBy.value;
      
      if(FeeWaiverRequestedBy.value !== EmplID.value){
    	 EmpSignPanel.visible = false;
           EmpComments.value = "";
           Signature.value = "";
           SignedDate.value = "";
      HRPanel.visible  = true;
         }else{
            EmpSignPanel.visible = true;
           hrComments.value = "";
           hrSign.value = "";
           hrSigneddate.value = "";

      HRPanel.visible  = false;
         }
    }*/

    $.ajax({
                type: 'GET',
                url: "/bin/getLoggedUserId",
                dataType: 'json',
                success: function(myresponse) {
                    if (myresponse.Status == "Success") {
                        var userValue = myresponse.userId;
                        logUser.value = userValue;
                        workflow_initiator.value = userValue;
                        EmpUserID.value = userValue;
                        $.ajax({
                                type: 'GET',
                                url: "/bin/checkTheUserIsAnAuthorizableMember",
                                data: {
                                    userId: userValue,
                                    groupId: "Fee-Waiver-Reviewers"
                                },
                                dataType: 'json',
                                success: function(userDetails) {
                                    status = userDetails.Result;
                                  AuthUserStatus.value  = status;
                                    if (status === true) {
                                        EmplID.enabled = true;
                                    } else {
                                        EmplID.enabled = false;
                                    }
                                    if (formSavedStatus.value === null) {
                                        var gifModal = document.getElementById('gifModal');
                                        gifModal.style.display = "block";
                                        $.ajax({
                                            type: 'GET',
                                            url: "/bin/getShortAppEmpFeeWaiver",
                                            data: {
                                                //cwid: cwid123,
                                                userID: userValue
                                                //userID: 'nvadlakunta'
                                            },
                                            dataType: 'json',
                                            success: function(myresopnse) {

                                                var modal = document.getElementById('myModal');
                                                var span = document.getElementsByClassName("close")[0];

                                                if (myresopnse.length === 1) {
                                                    ZipPostalCode.value = myresopnse[0].POSTAL;
                                                    State.value = myresopnse[0].STATE;
                                                    BirthDate.value = myresopnse[0].BIRTHDATE;
                                                    LastName.value = myresopnse[0].LAST_NAME;
                                                    FirstName.value = myresopnse[0].FIRST_NAME;

                                                    EmpRCD.value = myresopnse[0].EMPL_RCD;

                                                    var maleVal = myresopnse[0].MALE;
                                                    var femaleVal = myresopnse[0].FEMALE;


                                                    if (maleVal === "1") {
                                                        Gender.value = "1";
                                                    } else if (femaleVal === "1") {
                                                        Gender.value = "2";
                                                    }
                                                    City.value = myresopnse[0].CITY;
                                                    userID.value = myresopnse[0].USERID;
                                                    var userVal = myresopnse[0].USERID;
                                                    var emailVal = userVal.concat("@fullerton.edu");
                                                    Email.value = emailVal;

                                                    SSN.value = myresopnse[0].NATIONAL_ID;
                                                    var str = myresopnse[0].NATIONAL_ID;
                                                    var substr = str.substring(str.length - 4, str.length);
                                                    var ssn1 = "XXX-XX-";
                                                    var resultVal = ssn1.concat(substr);
                                                    SSN.value = resultVal;

                                                    //var numbers = SSN.value;
                                                    //SSN.value = numbers.substr(0, 3) + '-' + numbers.substr(3, 2) + '-' + numbers.substr(5, 4);

                                                    MiddleName.value = myresopnse[0].MIDDLE_NAME;
                                                    Phone.value = myresopnse[0].HOME_PHONE;
                                                    StreetNumber.value = myresopnse[0].ADDRESS1;
                                                    //EMPLID.value = myresopnse[0].ADDRESS2;
                                                    EmplID.value = myresopnse[0].EMPLID;
                                                    FeeWaiverRequestedBy.value = myresopnse[0].EMPLID;
                                                    UserLookupFlag.value = myresopnse[0].EMPLID;
                                                    CBID.value = myresopnse[0].UNION_CD;
                                                    deptID.value = myresopnse[0].DEPTID;
                                                    deptName.value = myresopnse[0].DEPTNAME;

                                                    var cbidVal = CBID.value;
                                                    var deptIdVal = deptID.value;
                                                    var empIdVal = EmplID.value;

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

                                                            ManagerUserID.value = managerDetails[0].MANAGER_EMP_USERID;
                                                            ManagerEmailID.value = managerDetails[0].MANAGER_EMAIL_ID;
                                                            managerName.value = managerDetails[0].MANAGER_NAME;
                                                            

                                                        },
                                                        error: function(error) {
                                                            alert("error block=" + error);
                                                        }
                                                    });

                                                    gifModal.style.display = "none";
                                                    modal.style.display = "none";

                                                } else if (myresopnse.length > 1) {
                                                    gifModal.style.display = "none";
                                                    modal.style.display = "block";
                                                    fnameHidden.value = myresopnse[0].FIRST_NAME;
                                                    lnameHidden.value = myresopnse[0].LAST_NAME;
                                                    CBID.value = myresopnse[0].UNION_CD;
                                                    EmpRCD.value = myresopnse[0].EMPL_RCD;
                                                    UserLookupFlag.value = myresopnse[0].EMPLID;
                                                    FeeWaiverRequestedBy.value = myresopnse[0].EMPLID;
                                                    var col = [];
                                                    col.push("EMPLID");
                                                    col.push("LAST_NAME");
                                                    col.push("FIRST_NAME");
                                                    col.push("DEPTID");
                                                    col.push("DEPTNAME");
                                                    /*col.push("EMPL_RCD");
                                                    col.push("DESCR");
                                                    col.push("GRADE");
                                                    col.push("UNION_CD");*/

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
                                                            //alert("xcvbn");
                                                            
                                                            deptHidden.value = event.currentTarget.parentNode.parentElement.childNodes[4].innerText;
                                                            DeptNameHidden.value = event.currentTarget.parentNode.parentElement.childNodes[5].innerText;
                                                            //cbidHidden.value = event.currentTarget.parentNode.parentElement.childNodes[6].innerText;
                                                            //classificationHidden.value = event.currentTarget.parentNode.parentElement.childNodes[7].innerText;
                                                            // RangeHidden.value = event.currentTarget.parentNode.parentElement.childNodes[8].innerText;
                                                            EmpIdHidden.value = event.currentTarget.parentNode.parentElement.childNodes[1].innerText;
                                                            // empRCDHidden.value = event.currentTarget.parentNode.parentElement.childNodes[9].innerText;
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


                                                    //if(table.rows[1].cells[0].childNodes[0].checked){alert("hi");}else{alert("hello");}
                                                    var okButton = document.createElement("input");
                                                    okButton.type = "button";
                                                    okButton.setAttribute("class", "okBtn");
                                                    //okButton.id = "okBtn";
                                                    okButton.value = "OK";
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
                                                                ZipPostalCode.value = myresopnse[n].POSTAL;
                                                                State.value = myresopnse[n].STATE;
                                                                BirthDate.value = myresopnse[n].BIRTHDATE;
                                                                LastName.value = myresopnse[n].LAST_NAME;
                                                                FirstName.value = myresopnse[n].FIRST_NAME;

                                                                EmpRCD.value = myresopnse[n].EMPL_RCD;
                                                                var maleVal = myresopnse[n].MALE;
                                                                var femaleVal = myresopnse[n].FEMALE;


                                                                if (maleVal === "1") {
                                                                    Gender.value = "1";
                                                                } else if (femaleVal === "1") {
                                                                    Gender.value = "2";
                                                                }
                                                                City.value = myresopnse[n].CITY;
                                                                userID.value = myresopnse[n].USERID;
                                                                var userVal = myresopnse[n].USERID;
                                                                var emailVal = userVal.concat("@fullerton.edu");
                                                                Email.value = emailVal;

                                                                SSN.value = myresopnse[n].NATIONAL_ID;
                                                                var str = myresopnse[n].NATIONAL_ID;
                                                                var substr = str.substring(str.length - 4, str.length);
                                                                var ssn1 = "XXX-XX-";
                                                                var resultVal = ssn1.concat(substr);
                                                                SSN.value = resultVal;

                                                                //var numbers = SSN.value;
                                                                //SSN.value = numbers.substr(0, 3) + '-' + numbers.substr(3, 2) + '-' + numbers.substr(5, 4);

                                                                MiddleName.value = myresopnse[n].MIDDLE_NAME;
                                                                Phone.value = myresopnse[n].HOME_PHONE;
                                                                StreetNumber.value = myresopnse[n].ADDRESS1;
                                                                //EMPLID.value = myresopnse[0].ADDRESS2;
                                                                EmplID.value = myresopnse[n].EMPLID;
                                                                CBID.value = myresopnse[n].UNION_CD;
                                                                deptID.value = myresopnse[n].DEPTID;
                                                                deptName.value = myresopnse[n].DEPTNAME;
                                                                rButtonStatus = true;
                                                                break;
                                                            }
                                                        }
                                                        if (rButtonStatus === false) {
                                                            alert("Please select the department");
                                                            modal.style.display = "block";
                                                        } else {
                                                            var cbidVal = CBID.value;
                                                            var deptIdVal = deptID.value;
                                                            var empIdVal = EmplID.value;

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
                                                                    ManagerUserID.value = managerDetails[0].MANAGER_EMP_USERID; //MANAGER_EMP_USERID

                                                                    ManagerEmailID.value = managerDetails[0].MANAGER_EMAIL_ID;

                                                                    managerName.value = managerDetails[0].MANAGER_NAME;

                                                                    

                                                                },
                                                                error: function(error) {
                                                                    alert("error block=" + error);
                                                                }
                                                            });
                                                            //FirstName.value = fnameHidden.value;
                                                            // LastName.value = lnameHidden.value;

                                                            //DepartmentName.value = DeptNameHidden.value;
                                                            //CBID.value = cbidHidden.value;
                                                            // Classification.value = classificationHidden.value;
                                                            //Range.value = RangeHidden.value;
                                                            //  EMPLID.value = EmpIdHidden.value;
                                                            //EmpID1.value = EMPLID.value;
                                                            //EmpFN.value = FirstName.value;
                                                            //EmpLN.value = LastName.value;
                                                            //EMPLRCD1.value = EmpRCD.value;
                                                            //Department1.value = DepartmentName.value;

                                                            // gifModal.style.display = "none";
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


                                                    FirstName.value = null;
                                                    LastName.value = null;
                                                    // DepartmentName.value = null;
                                                    // BargainingUnit.value = null;


                                                    //  EMPLRCD.value = null;

                                                    deptHidden.value = null;
                                                    DeptNameHidden.value = null;

                                                    EmpIdHidden.value = null;
                                                    //  empRCDHidden.value = null;
                                                    fnameHidden.value = null;
                                                    lnameHidden.value = null;

                                                    EmpID1.value = null;
                                                    EmpFN.value = null;
                                                    EmpLN.value = null;
                                                    EMPLRCD1.value = null;
                                                    Department1.value = null;

                                                    gifModal.style.display = "none";
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
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  employeeInfo.enabled = true;
  mailingAddress.enabled = true;
  signatureInfo.enabled = true;
  EmpSignPanel.visible = true;
  ChairPanel.visible  = false;
  SupPanel.visible = false;
  HRPanel.visible  = false;
  AdmissionOfficePanel.visible =  false;
}
if(StageIndicator.value === "ToEmployee"){
  employeeInfo.enabled = true;
  mailingAddress.enabled = true;
  signatureInfo.enabled = true;
  EmpSignPanel.visible = true;
  ChairPanel.visible  = false;
  SupPanel.visible = false;
  HRPanel.visible  = false;
   HRPanel.enabled  = false;
  AdmissionOfficePanel.visible = false;
}
if(StageIndicator.value == "ToChair"){
  employeeInfo.enabled = false;
  mailingAddress.enabled = false;
  signatureInfo.enabled = true;
  EmpSignPanel.enabled = false;
  ChairPanel.enabled  = true;
  SupPanel.visible = false;
  if(hrCB.value !== null){
  HRPanel.visible  = false;
    HRPanel.enabled  = false;
  }else{
     HRPanel.visible  = false;
  }
}
if(StageIndicator.value == "ToSupervisor"){
  employeeInfo.enabled = false;
  mailingAddress.enabled = false;
  signatureInfo.enabled = true;
  EmpSignPanel.enabled = false;
  ChairPanel.visible  = false;
  SupPanel.enabled = true;
  if(hrCB.value !== null){
  HRPanel.visible  = false;
    HRPanel.enabled  = false;
  }else{
     HRPanel.visible  = false;
  }
}

if(StageIndicator.value == "ToAdmissionOffice"){
  
  employeeInfo.enabled = false;
  mailingAddress.enabled = false;
  signatureInfo.enabled = true;
  EmpSignPanel.enabled = false;
  ChairPanel.visible  = false;
  SupPanel.visible  = false;
  AdmissionOfficePanel.visible = true;
   AdmissionOfficePanel.enabled = true;
  HRPanel.visible  = true;
  HRPanel.enabled  = false;
  /*if(hrCB.value !== null){
  HRPanel.visible  = false;
    HRPanel.enabled  = false;
  }else{
     HRPanel.visible  = false;
  }*/
  
}
if(StageIndicator.value == "ToHR"){
   employeeInfo.enabled = true;
    mailingAddress.enabled = true;
    signatureInfo.enabled = true;
    EmpSignPanel.enabled = false;
    AdmissionOfficePanel.enabled = false;
  	ChairPanel.visible  = false;
  SupPanel.visible  = false;
    HRPanel.enabled  = true;
  	/*if(chairCB.value == "1"){
    employeeInfo.enabled = false;
    mailingAddress.enabled = false;
    signatureInfo.enabled = true;
    EmpSignPanel.enabled = false;
    ChairPanel.enabled  = false;
    ChairPanel.visible  = true;
    SupPanel.visible = false;
    SupPanel.enabled = false;
    HRPanel.enabled  = true;
  }
  if(supCB.value == "1"){
    employeeInfo.enabled = false;
    mailingAddress.enabled = false;
    signatureInfo.enabled = true;
    EmpSignPanel.enabled = false;
    ChairPanel.enabled  = false;
    ChairPanel.visible  = false;
    SupPanel.visible = true;
    SupPanel.enabled = false;
    HRPanel.enabled  = true;
  }*/
}

if(StageIndicator.value == "ToHRInitial"){
   employeeInfo.enabled = true;
    mailingAddress.enabled = true;
    signatureInfo.enabled = true;
    EmpSignPanel.enabled = false;
    AdmissionOfficePanel.visible = false;
  	ChairPanel.visible  = false;
  	SupPanel.visible  = false;
    HRPanel.enabled  = true;
  
}

        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_guideRootPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_guideRootPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var status;
    /*if(formSavedStatus.value !== null){
      UserLookupFlag.value = FeeWaiverRequestedBy.value;
      
      if(FeeWaiverRequestedBy.value !== EmplID.value){
    	 EmpSignPanel.visible = false;
           EmpComments.value = "";
           Signature.value = "";
           SignedDate.value = "";
      HRPanel.visible  = true;
         }else{
            EmpSignPanel.visible = true;
           hrComments.value = "";
           hrSign.value = "";
           hrSigneddate.value = "";

      HRPanel.visible  = false;
         }
    }*/

    $.ajax({
                type: 'GET',
                url: "/bin/getLoggedUserId",
                dataType: 'json',
                success: function(myresponse) {
                    if (myresponse.Status == "Success") {
                        var userValue = myresponse.userId;
                        logUser.value = userValue;
                        workflow_initiator.value = userValue;
                        EmpUserID.value = userValue;
                        $.ajax({
                                type: 'GET',
                                url: "/bin/checkTheUserIsAnAuthorizableMember",
                                data: {
                                    userId: userValue,
                                    groupId: "Fee-Waiver-Reviewers"
                                },
                                dataType: 'json',
                                success: function(userDetails) {
                                    status = userDetails.Result;
                                  AuthUserStatus.value  = status;
                                    if (status === true) {
                                      //  EmplID.enabled = true;
                                       ChrsID.enabled = true;
                                    } else {
                                        //EmplID.enabled = false;
                                        ChrsID.enabled = false;;
                                    }
                                    if (formSavedStatus.value === null) {
                                        var gifModal = document.getElementById('gifModal');
                                        gifModal.style.display = "block";
                                        $.ajax({
                                            type: 'GET',
                                      
                                            url: "/bin/chrsIDUpdateServlet",
                                            data: {
                                               
                                             
                                                action:"Short_Employee_Fee_Waiver_User_EMP_CHRSID",
                                                userId: userValue
                                             
                                            },
                                            dataType: 'json',
                                            success: function(myresopnse) {

                                                var modal = document.getElementById('myModal');
                                                var span = document.getElementsByClassName("close")[0];

                                                if (myresopnse.length === 1) {
                                                  
                                                  
                                                    ZipPostalCode.value = myresopnse[0].POSTAL;
                                                    State.value = myresopnse[0].STATE;
                                                    BirthDate.value = myresopnse[0].BIRTHDATE;
                                                    LastName.value = myresopnse[0].LAST_NAME;
                                                    FirstName.value = myresopnse[0].FIRST_NAME;

                                                    EmpRCD.value = myresopnse[0].EMPL_RCD;

                                                    var maleVal = myresopnse[0].MALE;
                                                    var femaleVal = myresopnse[0].FEMALE;


                                                    if (maleVal === "1") {
                                                        Gender.value = "1";
                                                    } else if (femaleVal === "1") {
                                                        Gender.value = "2";
                                                    }
                                                    City.value = myresopnse[0].CITY;
                                                    userID.value = myresopnse[0].USERID;
                                                    var userVal = myresopnse[0].USERID;
                                                  //var emailVal = userVal.concat("@fullerton.edu");
                                                    var emailVal = "shreyas.manjunatha@thoughtfocus.com";
                                                   // var emailVal = "yjayaram@fullerton.edu";
                                                    Email.value = emailVal;

                                                    SSN.value = myresopnse[0].NATIONAL_ID;
                                                    var str = myresopnse[0].NATIONAL_ID;
                                                    var substr = str.substring(str.length - 4, str.length);
                                                    var ssn1 = "XXX-XX-";
                                                    var resultVal = ssn1.concat(substr);
                                                    SSN.value = resultVal;

                                                    //var numbers = SSN.value;
                                                    //SSN.value = numbers.substr(0, 3) + '-' + numbers.substr(3, 2) + '-' + numbers.substr(5, 4);

                                                    MiddleName.value = myresopnse[0].MIDDLE_NAME;
                                                    Phone.value = myresopnse[0].HOME_PHONE;
                                                    StreetNumber.value = myresopnse[0].ADDRESS1;
                                                   // //EMPLID.value = myresopnse[0].ADDRESS2;
                                                   EmplID.value = myresopnse[0].EMPLID;
                                                   ChrsID.value = myresopnse[0].CSU_CHRS_ID;
                                                    FeeWaiverRequestedBy.value = myresopnse[0].EMPLID;
                                                  //// FeeWaiverRequestedBy.value = myresopnse[0].CSU_CHRS_ID;
                                                   // UserLookupFlag.value = myresopnse[0].EMPLID;
                                                   UserLookupFlag.value = myresopnse[0].CSU_CHRS_ID;
                                                    CBID.value = myresopnse[0].UNION_CD;
                                                    deptID.value = myresopnse[0].DEPTID;
                                                    deptName.value = myresopnse[0].DEPTNAME;

                                                    var cbidVal = CBID.value;
                                                    var deptIdVal = deptID.value;
                                                    var empIdVal = EmplID.value;

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

                                                            ManagerUserID.value = managerDetails[0].MANAGER_EMP_USERID;
                                                           // ManagerEmailID.value = managerDetails[0].MANAGER_EMAIL_ID;
                                                            ManagerEmailID.value = "shreyas.manjunatha@thoughtfocus.com";
                                                          //  ManagerEmailID.value = "yjayaram@fullerton.edu";
                                                            managerName.value = managerDetails[0].MANAGER_NAME;
                                                            

                                                        },
                                                        error: function(error) {
                                                            alert("error block=" + error);
                                                        }
                                                    });

                                                    gifModal.style.display = "none";
                                                    modal.style.display = "none";

                                                } else if (myresopnse.length > 1) {
                                                    gifModal.style.display = "none";
                                                    modal.style.display = "block";
                                                    fnameHidden.value = myresopnse[0].FIRST_NAME;
                                                    lnameHidden.value = myresopnse[0].LAST_NAME;
                                                    CBID.value = myresopnse[0].UNION_CD;
                                                    EmpRCD.value = myresopnse[0].EMPL_RCD;
                                                   // UserLookupFlag.value = myresopnse[0].EMPLID;
                                                   UserLookupFlag.value = myresopnse[0].CSU_CHRS_ID;
                                                    FeeWaiverRequestedBy.value = myresopnse[0].EMPLID;
                                                 ////  FeeWaiverRequestedBy.value = myresopnse[0].CSU_CHRS_ID;
                                                    var col = [];
                                                    col.push("CSU_CHRS_ID");
                                                    col.push("EMPLID");
                                                   
                                                    col.push("LAST_NAME");
                                                    col.push("FIRST_NAME");
                                                    col.push("DEPTID");
                                                    col.push("DEPTNAME");
                                                    /*col.push("EMPL_RCD");
                                                    col.push("DESCR");
                                                    col.push("GRADE");
                                                    col.push("UNION_CD");*/

                                                    var table = document.createElement("table");
                                                    table.id = "tb";
                                                    var tr = table.insertRow(-1);
                                                    var headings = ["", "Emp ID", "CWID", "Last Name", "First Name", "Department Id", "Department Name"];
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
                                                            //alert("xcvbn");
                                                            
                                                            deptHidden.value = event.currentTarget.parentNode.parentElement.childNodes[5].innerText;
                                                            DeptNameHidden.value = event.currentTarget.parentNode.parentElement.childNodes[6].innerText;
                                                           // //cbidHidden.value = event.currentTarget.parentNode.parentElement.childNodes[6].innerText;
                                                           // //classificationHidden.value = event.currentTarget.parentNode.parentElement.childNodes[7].innerText;
                                                           // // RangeHidden.value = event.currentTarget.parentNode.parentElement.childNodes[8].innerText;
                                                            EmpIdHidden.value = event.currentTarget.parentNode.parentElement.childNodes[2].innerText;
                                                          ChrsIdHidden.value = event.currentTarget.parentNode.parentElement.childNodes[1].innerText;
                                                         
                                                           // // empRCDHidden.value = event.currentTarget.parentNode.parentElement.childNodes[9].innerText;
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


                                                    //if(table.rows[1].cells[0].childNodes[0].checked){alert("hi");}else{alert("hello");}
                                                    var okButton = document.createElement("input");
                                                    okButton.type = "button";
                                                    okButton.setAttribute("class", "okBtn");
                                                    //okButton.id = "okBtn";
                                                    okButton.value = "OK";
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
                                                                ZipPostalCode.value = myresopnse[n].POSTAL;
                                                                State.value = myresopnse[n].STATE;
                                                                BirthDate.value = myresopnse[n].BIRTHDATE;
                                                                LastName.value = myresopnse[n].LAST_NAME;
                                                                FirstName.value = myresopnse[n].FIRST_NAME;

                                                                EmpRCD.value = myresopnse[n].EMPL_RCD;
                                                                var maleVal = myresopnse[n].MALE;
                                                                var femaleVal = myresopnse[n].FEMALE;


                                                                if (maleVal === "1") {
                                                                    Gender.value = "1";
                                                                } else if (femaleVal === "1") {
                                                                    Gender.value = "2";
                                                                }
                                                                City.value = myresopnse[n].CITY;
                                                                userID.value = myresopnse[n].USERID;
                                                                var userVal = myresopnse[n].USERID;
                                                               // var emailVal = userVal.concat("@fullerton.edu");
                                                                var emailVal = "shreyas.manjunatha@thoughtfocus.com";
                                                             //  var emailVal = "yjayaram@fullerton.edu";
                                                                Email.value = emailVal;

                                                                SSN.value = myresopnse[n].NATIONAL_ID;
                                                                var str = myresopnse[n].NATIONAL_ID;
                                                                var substr = str.substring(str.length - 4, str.length);
                                                                var ssn1 = "XXX-XX-";
                                                                var resultVal = ssn1.concat(substr);
                                                                SSN.value = resultVal;

                                                                //var numbers = SSN.value;
                                                                //SSN.value = numbers.substr(0, 3) + '-' + numbers.substr(3, 2) + '-' + numbers.substr(5, 4);

                                                                MiddleName.value = myresopnse[n].MIDDLE_NAME;
                                                                Phone.value = myresopnse[n].HOME_PHONE;
                                                                StreetNumber.value = myresopnse[n].ADDRESS1;
                                                               // //EMPLID.value = myresopnse[0].ADDRESS2;
                                                                EmplID.value = myresopnse[n].EMPLID;
                                                                ChrsID.value = myresopnse[n].CSU_CHRS_ID;
                                                                CBID.value = myresopnse[n].UNION_CD;
                                                                deptID.value = myresopnse[n].DEPTID;
                                                                deptName.value = myresopnse[n].DEPTNAME;
                                                                rButtonStatus = true;
                                                                break;
                                                            }
                                                        }
                                                        if (rButtonStatus === false) {
                                                            alert("Please select the department");
                                                            modal.style.display = "block";
                                                        } else {
                                                            var cbidVal = CBID.value;
                                                            var deptIdVal = deptID.value;
                                                            var empIdVal = EmplID.value;

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
                                                                    ManagerUserID.value = managerDetails[0].MANAGER_EMP_USERID; //MANAGER_EMP_USERID

                                                                    //ManagerEmailID.value = managerDetails[0].MANAGER_EMAIL_ID;
                                                                     ManagerEmailID.value = "shreyas.manjunatha@thoughtfocus.com";
                                                                  //  ManagerEmailID.value = "yjayaram@fullerton.edu";

                                                                    managerName.value = managerDetails[0].MANAGER_NAME;

                                                                    

                                                                },
                                                                error: function(error) {
                                                                    alert("error block=" + error);
                                                                }
                                                            });
                                                            //FirstName.value = fnameHidden.value;
                                                            // LastName.value = lnameHidden.value;

                                                            //DepartmentName.value = DeptNameHidden.value;
                                                            //CBID.value = cbidHidden.value;
                                                            // Classification.value = classificationHidden.value;
                                                            //Range.value = RangeHidden.value;
                                                            //  EMPLID.value = EmpIdHidden.value;
                                                            //EmpID1.value = EMPLID.value;
                                                            //EmpFN.value = FirstName.value;
                                                            //EmpLN.value = LastName.value;
                                                            //EMPLRCD1.value = EmpRCD.value;
                                                            //Department1.value = DepartmentName.value;

                                                            // gifModal.style.display = "none";
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

                                                    EmplID.valuee = null;
                                                  	ChrsID.value = null;
                                                    FirstName.value = null;
                                                    LastName.value = null;
                                                    // DepartmentName.value = null;
                                                    // BargainingUnit.value = null;


                                                    //  EMPLRCD.value = null;

                                                    deptHidden.value = null;
                                                    DeptNameHidden.value = null;
 													ChrsIdHidden.value = null;
                                                    EmpIdHidden.value = null;
                                                    //  empRCDHidden.value = null;
                                                    fnameHidden.value = null;
                                                    lnameHidden.value = null;

                                                    EmpID1.value = null;
                                                    EmpFN.value = null;
                                                    EmpLN.value = null;
                                                    EMPLRCD1.value = null;
                                                    Department1.value = null;

                                                    gifModal.style.display = "none";
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
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_Year_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_Year_init0 = function (scope) {
    with(this) {
        with(scope) {
            //this.enabled = false;
if(StageIndicator.value === null){
var today = new Date();
var curyear = today.getFullYear();
//this.value = curyear+1;
this.value = curyear;
}
//this.value = curyear;
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_AttendedCSUFBefore_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_AttendedCSUFBefore_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var csufVal = this.value;
if(csufVal === "1"){
  CSUFStatus.enabled = true;
}else{
  CSUFStatus.enabled = false;
  CSUFStatus.value = "";
}
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_CSUFStatus_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_CSUFStatus_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_ChrsID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_ChrsID_init0 = function (scope) {
    with(this) {
        with(scope) {
            	

if (StageIndicator.value === null && this.value === null) {
  this.mandatory=true;
}
else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_ChrsID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_ChrsID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    
    var status;
    var userLookup = UserLookupFlag.value;
    if (formSavedStatus.value !== null) {

        UserLookupFlag.value = FeeWaiverRequestedBy.value;


    }
    if (UserLookupFlag.value !== this.value) {
        var cwidVal = this.value;
        $.ajax({
                    type: 'GET',
                    url: "/bin/getLoggedUserId",
                    dataType: 'json',
                    success: function(myresponse) {
                        if (myresponse.Status == "Success") {
                            var userValue = myresponse.userId;
                            logUser.value = userValue;
                            //userValue  = 'nvadlakunta';

                            $.ajax({
                                    type: 'GET',
                                    url: "/bin/checkTheUserIsAnAuthorizableMember",
                                    data: {
                                        userId: logUser.value,
                                        groupId: "Fee-Waiver-Reviewers"
                                    },
                                    dataType: 'json',
                                    success: function(userDetails) {
                                        status = userDetails.Result;
                                        AuthUserStatus.value  = status;
                                        if (status === true) {

                                            if (FeeWaiverRequestedBy.value !== cwidVal) {
                                                EmpSignPanel.visible = false;
                                                EmpComments.value = "";
                                                Signature.value = "";
                                                SignedDate.value = "";
                                                HRPanel.visible = false;
                                            } else {
                                                EmpSignPanel.visible = true;
                                                hrComments.value = "";
                                                hrSign.value = "";
                                                hrSigneddate.value = "";

                                                HRPanel.visible = false;
                                            }
                                            UserLookupFlag.value = userLookup;
                                            if (UserLookupFlag.value !== cwidVal) {
                                                var gifModal = document.getElementById('gifModal');
                                                gifModal.style.display = "block";
                                                $.ajax({
                                                    type: 'GET',
                                                    url: "/bin/getShortAppEmpLook",
                                                    data: {
                                                        cwid: cwidVal,
                                                        //userID: userValue
                                                        //userID: 'nvadlakunta'
                                                    },
                                                    dataType: 'json',
                                                    success: function(myresopnse) {

                                                        var modal = document.getElementById('myModal');
                                                        var span = document.getElementsByClassName("close")[0];

                                                        if (myresopnse.length === 1) {
                                                            ZipPostalCode.value = myresopnse[0].POSTAL;
                                                            State.value = myresopnse[0].STATE;
                                                            BirthDate.value = myresopnse[0].BIRTHDATE;
                                                            LastName.value = myresopnse[0].LAST_NAME;
                                                            FirstName.value = myresopnse[0].FIRST_NAME;

                                                            EmpRCD.value = myresopnse[0].EMPL_RCD;

                                                            var maleVal = myresopnse[0].MALE;
                                                            var femaleVal = myresopnse[0].FEMALE;


                                                            if (maleVal === "1") {
                                                                Gender.value = "1";
                                                            } else if (femaleVal === "1") {
                                                                Gender.value = "2";
                                                            }
                                                            City.value = myresopnse[0].CITY;
                                                            userID.value = myresopnse[0].USERID;
                                                            var userVal = myresopnse[0].USERID;
                                                            var emailVal = userVal.concat("@fullerton.edu");
                                                            Email.value = emailVal;

                                                            SSN.value = myresopnse[0].NATIONAL_ID;
                                                            var str = myresopnse[0].NATIONAL_ID;
                                                            var substr = str.substring(str.length - 4, str.length);
                                                            var ssn1 = "XXX-XX-";
                                                            var resultVal = ssn1.concat(substr);
                                                            SSN.value = resultVal;

                                                            //var numbers = SSN.value;
                                                            //SSN.value = numbers.substr(0, 3) + '-' + numbers.substr(3, 2) + '-' + numbers.substr(5, 4);

                                                            MiddleName.value = myresopnse[0].MIDDLE_NAME;
                                                            Phone.value = myresopnse[0].HOME_PHONE;
                                                            StreetNumber.value = myresopnse[0].ADDRESS1;
                                                            //EMPLID.value = myresopnse[0].ADDRESS2;
                                                            EmplID.value = myresopnse[0].EMPLID;
                                                            UserLookupFlag.value = myresopnse[0].EMPLID;
                                                            CBID.value = myresopnse[0].UNION_CD;
                                                            deptID.value = myresopnse[0].DEPTID;
                                                            deptName.value = myresopnse[0].DEPTNAME;

                                                            var cbidVal = CBID.value;
                                                            var deptIdVal = deptID.value;
                                                            var empIdVal = EmplID.value;

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

                                                                    ManagerUserID.value = managerDetails[0].MANAGER_EMP_USERID;
                                                                    ManagerEmailID.value = managerDetails[0].MANAGER_EMAIL_ID;
                                                                    managerName.value = managerDetails[0].MANAGER_NAME;
                                                                    

                                                                },
                                                                error: function(error) {
                                                                    alert("error block=" + error);
                                                                }
                                                            });

                                                            gifModal.style.display = "none";
                                                            modal.style.display = "none";

                                                        } else if (myresopnse.length > 1) {
                                                            gifModal.style.display = "none";
                                                            modal.style.display = "block";
                                                            fnameHidden.value = myresopnse[0].FIRST_NAME;
                                                            lnameHidden.value = myresopnse[0].LAST_NAME;
                                                            CBID.value = myresopnse[0].UNION_CD;
                                                            EmpRCD.value = myresopnse[0].EMPL_RCD;

                                                            var col = [];
                                                            col.push("EMPLID");
                                                            col.push("LAST_NAME");
                                                            col.push("FIRST_NAME");
                                                            col.push("DEPTID");
                                                            col.push("DEPTNAME");
                                                            /*col.push("EMPL_RCD");
                                                            col.push("DESCR");
                                                            col.push("GRADE");
                                                            col.push("UNION_CD");*/

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
                                                                    //alert("xcvbn");
                                                                    //debugger;
                                                                    deptHidden.value = event.currentTarget.parentNode.parentElement.childNodes[4].innerText;
                                                                    DeptNameHidden.value = event.currentTarget.parentNode.parentElement.childNodes[5].innerText;
                                                                    //cbidHidden.value = event.currentTarget.parentNode.parentElement.childNodes[6].innerText;
                                                                    //classificationHidden.value = event.currentTarget.parentNode.parentElement.childNodes[7].innerText;
                                                                    // RangeHidden.value = event.currentTarget.parentNode.parentElement.childNodes[8].innerText;
                                                                    EmpIdHidden.value = event.currentTarget.parentNode.parentElement.childNodes[1].innerText;
                                                                    // empRCDHidden.value = event.currentTarget.parentNode.parentElement.childNodes[9].innerText;
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


                                                            //if(table.rows[1].cells[0].childNodes[0].checked){alert("hi");}else{alert("hello");}
                                                            var okButton = document.createElement("input");
                                                            okButton.type = "button";
                                                            okButton.setAttribute("class", "okBtn");
                                                            //okButton.id = "okBtn";
                                                            okButton.value = "OK";
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
                                                                        ZipPostalCode.value = myresopnse[n].POSTAL;
                                                                        State.value = myresopnse[n].STATE;
                                                                        BirthDate.value = myresopnse[n].BIRTHDATE;
                                                                        LastName.value = myresopnse[n].LAST_NAME;
                                                                        FirstName.value = myresopnse[n].FIRST_NAME;

                                                                        EmpRCD.value = myresopnse[n].EMPL_RCD;
                                                                        var maleVal = myresopnse[n].MALE;
                                                                        var femaleVal = myresopnse[n].FEMALE;


                                                                        if (maleVal === "1") {
                                                                            Gender.value = "1";
                                                                        } else if (femaleVal === "1") {
                                                                            Gender.value = "2";
                                                                        }
                                                                        City.value = myresopnse[n].CITY;
                                                                        userID.value = myresopnse[n].USERID;
                                                                        var userVal = myresopnse[n].USERID;
                                                                        var emailVal = userVal.concat("@fullerton.edu");
                                                                        Email.value = emailVal;

                                                                        SSN.value = myresopnse[n].NATIONAL_ID;
                                                                        var str = myresopnse[n].NATIONAL_ID;
                                                                        var substr = str.substring(str.length - 4, str.length);
                                                                        var ssn1 = "XXX-XX-";
                                                                        var resultVal = ssn1.concat(substr);
                                                                        SSN.value = resultVal;

                                                                        //var numbers = SSN.value;
                                                                        //SSN.value = numbers.substr(0, 3) + '-' + numbers.substr(3, 2) + '-' + numbers.substr(5, 4);

                                                                        MiddleName.value = myresopnse[n].MIDDLE_NAME;
                                                                        Phone.value = myresopnse[n].HOME_PHONE;
                                                                        StreetNumber.value = myresopnse[n].ADDRESS1;
                                                                        //EMPLID.value = myresopnse[0].ADDRESS2;
                                                                        EmplID.value = myresopnse[n].EMPLID;
                                                                        UserLookupFlag.value = myresopnse[n].EMPLID;
                                                                        CBID.value = myresopnse[n].UNION_CD;
                                                                        deptID.value = myresopnse[n].DEPTID;
                                                                        deptName.value = myresopnse[n].DEPTNAME;
                                                                        rButtonStatus = true;
                                                                        break;
                                                                    }
                                                                }
                                                                if (rButtonStatus === false) {
                                                                    alert("Please select the department");
                                                                    modal.style.display = "block";
                                                                } else {
                                                                    var cbidVal = CBID.value;
                                                                    var deptIdVal = deptID.value;
                                                                    var empIdVal = EmplID.value;

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
                                                                            ManagerUserID.value = managerDetails[0].MANAGER_EMP_USERID; //MANAGER_EMP_USERID

                                                                            ManagerEmailID.value = managerDetails[0].MANAGER_EMAIL_ID;

                                                                            managerName.value = managerDetails[0].MANAGER_NAME;

                                                                           

                                                                        },
                                                                        error: function(error) {
                                                                            alert("error block=" + error);
                                                                        }
                                                                    });
                                                                    //FirstName.value = fnameHidden.value;
                                                                    // LastName.value = lnameHidden.value;

                                                                    //DepartmentName.value = DeptNameHidden.value;
                                                                    //CBID.value = cbidHidden.value;
                                                                    // Classification.value = classificationHidden.value;
                                                                    //Range.value = RangeHidden.value;
                                                                    //  EMPLID.value = EmpIdHidden.value;
                                                                    //EmpID1.value = EMPLID.value;
                                                                    //EmpFN.value = FirstName.value;
                                                                    //EmpLN.value = LastName.value;
                                                                    //EMPLRCD1.value = EmpRCD.value;
                                                                    //Department1.value = DepartmentName.value;

                                                                    // gifModal.style.display = "none";
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


                                                            FirstName.value = null;
                                                            LastName.value = null;
                                                            // DepartmentName.value = null;
                                                            // BargainingUnit.value = null;


                                                            //  EMPLRCD.value = null;

                                                            deptHidden.value = null;
                                                            DeptNameHidden.value = null;

                                                            EmpIdHidden.value = null;
                                                            //  empRCDHidden.value = null;
                                                            fnameHidden.value = null;
                                                            lnameHidden.value = null;

                                                            EmpID1.value = null;
                                                            EmpFN.value = null;
                                                            EmpLN.value = null;
                                                            EMPLRCD1.value = null;
                                                            Department1.value = null;

                                                            gifModal.style.display = "none";
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

                                                }); //here
                                            }
                                        }
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
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_ChrsID_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_ChrsID_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    
    var status;
    var userLookup = UserLookupFlag.value;
    if (formSavedStatus.value !== null) {

        UserLookupFlag.value = FeeWaiverRequestedBy.value;


    }
    if (UserLookupFlag.value !== this.value) {
        var cwidVal = this.value;
        $.ajax({
                    type: 'GET',
                    url: "/bin/getLoggedUserId",
                    dataType: 'json',
                    success: function(myresponse) {
                        if (myresponse.Status == "Success") {
                            var userValue = myresponse.userId;
                            logUser.value = userValue;
                           // //userValue  = 'nvadlakunta';

                            $.ajax({
                                    type: 'GET',
                                    url: "/bin/checkTheUserIsAnAuthorizableMember",
                                    data: {
                                        userId: logUser.value,
                                        groupId: "Fee-Waiver-Reviewers"
                                    },
                                    dataType: 'json',
                                    success: function(userDetails) {
                                        status = userDetails.Result;
                                        AuthUserStatus.value  = status;
                                        if (status === true) {

                                            if (FeeWaiverRequestedBy.value !== cwidVal) {
                                                EmpSignPanel.visible = false;
                                                EmpComments.value = "";
                                                Signature.value = "";
                                                SignedDate.value = "";
                                                HRPanel.visible = false;
                                            } else {
                                                EmpSignPanel.visible = true;
                                                hrComments.value = "";
                                                hrSign.value = "";
                                                hrSigneddate.value = "";

                                                HRPanel.visible = false;
                                            }
                                            UserLookupFlag.value = userLookup;
                                            if (UserLookupFlag.value !== cwidVal) {
                                                var gifModal = document.getElementById('gifModal');
                                                gifModal.style.display = "block";
                                                $.ajax({
                                                    type: 'GET',
                                                
                                                    url: "/bin/chrsIDUpdateServlet",
                                                    data: {
                                                    
                                                        action:"Short_Employee_Fee_Waiver_EMP_CHRSID",
                                                        chrsId: cwidVal,
                                                     
                                                    },
                                                    dataType: 'json',
                                                    success: function(myresopnse) {

                                                        var modal = document.getElementById('myModal');
                                                        var span = document.getElementsByClassName("close")[0];

                                                        if (myresopnse.length === 1) {
                                                            EmplID.value = myresopnse[0].EMPLID;
                                                            ZipPostalCode.value = myresopnse[0].POSTAL;
                                                            State.value = myresopnse[0].STATE;
                                                            BirthDate.value = myresopnse[0].BIRTHDATE;
                                                            LastName.value = myresopnse[0].LAST_NAME;
                                                            FirstName.value = myresopnse[0].FIRST_NAME;

                                                            EmpRCD.value = myresopnse[0].EMPL_RCD;

                                                            var maleVal = myresopnse[0].MALE;
                                                            var femaleVal = myresopnse[0].FEMALE;


                                                            if (maleVal === "1") {
                                                                Gender.value = "1";
                                                            } else if (femaleVal === "1") {
                                                                Gender.value = "2";
                                                            }
                                                            City.value = myresopnse[0].CITY;
                                                            userID.value = myresopnse[0].USERID;
                                                            var userVal = myresopnse[0].USERID;
                                                          //  var emailVal = userVal.concat("@fullerton.edu");
                                                           var emailVal = "shreyas.manjunatha@thoughtfocus.com";
                                                          //   var emailVal = "yjayaram@fullerton.edu";
                                                            Email.value = emailVal;

                                                            SSN.value = myresopnse[0].NATIONAL_ID;
                                                            var str = myresopnse[0].NATIONAL_ID;
                                                            var substr = str.substring(str.length - 4, str.length);
                                                            var ssn1 = "XXX-XX-";
                                                            var resultVal = ssn1.concat(substr);
                                                            SSN.value = resultVal;

                                                            //var numbers = SSN.value;
                                                            //SSN.value = numbers.substr(0, 3) + '-' + numbers.substr(3, 2) + '-' + numbers.substr(5, 4);

                                                            MiddleName.value = myresopnse[0].MIDDLE_NAME;
                                                            Phone.value = myresopnse[0].HOME_PHONE;
                                                            StreetNumber.value = myresopnse[0].ADDRESS1;
                                                           ////EMPLID.value = myresopnse[0].ADDRESS2;
                                                           // EmplID.value = myresopnse[0].EMPLID;
                                                         
                                                            //UserLookupFlag.value = myresopnse[0].EMPLID;
                                                           UserLookupFlag.value = myresopnse[0].CSU_CHRS_ID;
                                                            CBID.value = myresopnse[0].UNION_CD;
                                                            deptID.value = myresopnse[0].DEPTID;
                                                            deptName.value = myresopnse[0].DEPTNAME;

                                                            var cbidVal = CBID.value;
                                                            var deptIdVal = deptID.value;
                                                            var empIdVal = EmplID.value;

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

                                                                    ManagerUserID.value = managerDetails[0].MANAGER_EMP_USERID;
                                                                    //ManagerEmailID.value = managerDetails[0].MANAGER_EMAIL_ID;
                                                                   ManagerEmailID.value = "shreyas.manjunatha@thoughtfocus.com";
                                                                  //  ManagerEmailID.value = "yjayaram@fullerton.edu";
                                                                    managerName.value = managerDetails[0].MANAGER_NAME;
                                                                    

                                                                },
                                                                error: function(error) {
                                                                    alert("error block=" + error);
                                                                }
                                                            });

                                                            gifModal.style.display = "none";
                                                            modal.style.display = "none";

                                                        } else if (myresopnse.length > 1) {
                                                            gifModal.style.display = "none";
                                                            modal.style.display = "block";
                                                            EmpIdHidden.value = myresopnse[0].EMPLID;
                                                            fnameHidden.value = myresopnse[0].FIRST_NAME;
                                                            lnameHidden.value = myresopnse[0].LAST_NAME;
                                                            CBID.value = myresopnse[0].UNION_CD;
                                                            EmpRCD.value = myresopnse[0].EMPL_RCD;

                                                            var col = [];
                                                            col.push("CSU_CHRS_ID");
                                                            col.push("EMPLID");
                                                            col.push("LAST_NAME");
                                                            col.push("FIRST_NAME");
                                                            col.push("DEPTID");
                                                            col.push("DEPTNAME");
                                                            /*col.push("EMPL_RCD");
                                                            col.push("DESCR");
                                                            col.push("GRADE");
                                                            col.push("UNION_CD");*/

                                                            var table = document.createElement("table");
                                                            table.id = "tb";
                                                            var tr = table.insertRow(-1);
                                                            var headings = ["", "Emp ID", "CWID", "Last Name", "First Name", "Department Id", "Department Name"];
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
                                                                    //alert("xcvbn");
                                                                    //debugger;
                                                                    deptHidden.value = event.currentTarget.parentNode.parentElement.childNodes[5].innerText;
                                                                    DeptNameHidden.value = event.currentTarget.parentNode.parentElement.childNodes[6].innerText;
                                                                    //cbidHidden.value = event.currentTarget.parentNode.parentElement.childNodes[6].innerText;
                                                                    //classificationHidden.value = event.currentTarget.parentNode.parentElement.childNodes[7].innerText;
                                                                    // RangeHidden.value = event.currentTarget.parentNode.parentElement.childNodes[8].innerText;
                                                                    EmpIdHidden.value = event.currentTarget.parentNode.parentElement.childNodes[2].innerText;
                                                                   ChrsIdHidden.value = event.currentTarget.parentNode.parentElement.childNodes[1].innerText;
                                                                    // empRCDHidden.value = event.currentTarget.parentNode.parentElement.childNodes[9].innerText;
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


                                                            //if(table.rows[1].cells[0].childNodes[0].checked){alert("hi");}else{alert("hello");}
                                                            var okButton = document.createElement("input");
                                                            okButton.type = "button";
                                                            okButton.setAttribute("class", "okBtn");
                                                            //okButton.id = "okBtn";
                                                            okButton.value = "OK";
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
                                                                    	EmplID.value = myresopnse[n].EMPLID;
                                                                        ZipPostalCode.value = myresopnse[n].POSTAL;
                                                                        State.value = myresopnse[n].STATE;
                                                                        BirthDate.value = myresopnse[n].BIRTHDATE;
                                                                        LastName.value = myresopnse[n].LAST_NAME;
                                                                        FirstName.value = myresopnse[n].FIRST_NAME;

                                                                        EmpRCD.value = myresopnse[n].EMPL_RCD;
                                                                        var maleVal = myresopnse[n].MALE;
                                                                        var femaleVal = myresopnse[n].FEMALE;


                                                                        if (maleVal === "1") {
                                                                            Gender.value = "1";
                                                                        } else if (femaleVal === "1") {
                                                                            Gender.value = "2";
                                                                        }
                                                                        City.value = myresopnse[n].CITY;
                                                                        userID.value = myresopnse[n].USERID;
                                                                        var userVal = myresopnse[n].USERID;
                                                                       // var emailVal = userVal.concat("@fullerton.edu");
                                                                        var emailVal = "shreyas.manjunatha@thoughtfocus.com";
                                                                       // var emailVal = "yjayaram@fullerton.edu";
                                                                        Email.value = emailVal;

                                                                        SSN.value = myresopnse[n].NATIONAL_ID;
                                                                        var str = myresopnse[n].NATIONAL_ID;
                                                                        var substr = str.substring(str.length - 4, str.length);
                                                                        var ssn1 = "XXX-XX-";
                                                                        var resultVal = ssn1.concat(substr);
                                                                        SSN.value = resultVal;

                                                                        //var numbers = SSN.value;
                                                                        //SSN.value = numbers.substr(0, 3) + '-' + numbers.substr(3, 2) + '-' + numbers.substr(5, 4);

                                                                        MiddleName.value = myresopnse[n].MIDDLE_NAME;
                                                                        Phone.value = myresopnse[n].HOME_PHONE;
                                                                        StreetNumber.value = myresopnse[n].ADDRESS1;
                                                                       ////EMPLID.value = myresopnse[0].ADDRESS2;
                                                                       // EmplID.value = myresopnse[n].EMPLID;
                                                                      
                                                                       // UserLookupFlag.value = myresopnse[n].EMPLID;
                                                                        UserLookupFlag.value = myresopnse[n].CSU_CHRS_ID;
                                                                        CBID.value = myresopnse[n].UNION_CD;
                                                                        deptID.value = myresopnse[n].DEPTID;
                                                                        deptName.value = myresopnse[n].DEPTNAME;
                                                                        rButtonStatus = true;
                                                                        break;
                                                                    }
                                                                }
                                                                if (rButtonStatus === false) {
                                                                    alert("Please select the department");
                                                                    modal.style.display = "block";
                                                                } else {
                                                                    var cbidVal = CBID.value;
                                                                    var deptIdVal = deptID.value;
                                                                    var empIdVal = EmplID.value;

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
                                                                            ManagerUserID.value = managerDetails[0].MANAGER_EMP_USERID; //MANAGER_EMP_USERID

                                                                            //ManagerEmailID.value = managerDetails[0].MANAGER_EMAIL_ID;
                                                                          ManagerEmailID.value = "shreyas.manjunatha@thoughtfocus.com";
                                                                         //  ManagerEmailID.value = "yjayaram@fullerton.edu";

                                                                            managerName.value = managerDetails[0].MANAGER_NAME;

                                                                           

                                                                        },
                                                                        error: function(error) {
                                                                            alert("error block=" + error);
                                                                        }
                                                                    });
                                                                    //FirstName.value = fnameHidden.value;
                                                                    // LastName.value = lnameHidden.value;

                                                                    //DepartmentName.value = DeptNameHidden.value;
                                                                    //CBID.value = cbidHidden.value;
                                                                    // Classification.value = classificationHidden.value;
                                                                    //Range.value = RangeHidden.value;
                                                                    //  EMPLID.value = EmpIdHidden.value;
                                                                    //EmpID1.value = EMPLID.value;
                                                                    //EmpFN.value = FirstName.value;
                                                                    //EmpLN.value = LastName.value;
                                                                    //EMPLRCD1.value = EmpRCD.value;
                                                                    //Department1.value = DepartmentName.value;

                                                                    // gifModal.style.display = "none";
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

															EmplID.value = null;
                                                          	ChrsID.value = null;
                                                            FirstName.value = null;
                                                            LastName.value = null;
                                                            // DepartmentName.value = null;
                                                            // BargainingUnit.value = null;


                                                            //  EMPLRCD.value = null;

                                                            deptHidden.value = null;
                                                            DeptNameHidden.value = null;

                                                            EmpIdHidden.value = null;
                                                            ChrsIdHidden.value = null;
                                                            //  empRCDHidden.value = null;
                                                            fnameHidden.value = null;
                                                            lnameHidden.value = null;

                                                            EmpID1.value = null;
                                                            EmpFN.value = null;
                                                            EmpLN.value = null;
                                                            EMPLRCD1.value = null;
                                                            Department1.value = null;

                                                            gifModal.style.display = "none";
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

                                                }); //here
                                            }
                                        }
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
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_EmplID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_EmplID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_EmplID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_EmplID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    
    var status;
    var userLookup = UserLookupFlag.value;
    if (formSavedStatus.value !== null) {

        UserLookupFlag.value = FeeWaiverRequestedBy.value;


    }
    if (UserLookupFlag.value !== this.value) {
        var cwidVal = this.value;
        $.ajax({
                    type: 'GET',
                    url: "/bin/getLoggedUserId",
                    dataType: 'json',
                    success: function(myresponse) {
                        if (myresponse.Status == "Success") {
                            var userValue = myresponse.userId;
                            logUser.value = userValue;
                            //userValue  = 'nvadlakunta';

                            $.ajax({
                                    type: 'GET',
                                    url: "/bin/checkTheUserIsAnAuthorizableMember",
                                    data: {
                                        userId: logUser.value,
                                        groupId: "Fee-Waiver-Reviewers"
                                    },
                                    dataType: 'json',
                                    success: function(userDetails) {
                                        status = userDetails.Result;
                                        AuthUserStatus.value  = status;
                                        if (status === true) {

                                            if (FeeWaiverRequestedBy.value !== cwidVal) {
                                                EmpSignPanel.visible = false;
                                                EmpComments.value = "";
                                                Signature.value = "";
                                                SignedDate.value = "";
                                                HRPanel.visible = false;
                                            } else {
                                                EmpSignPanel.visible = true;
                                                hrComments.value = "";
                                                hrSign.value = "";
                                                hrSigneddate.value = "";

                                                HRPanel.visible = false;
                                            }
                                            UserLookupFlag.value = userLookup;
                                            if (UserLookupFlag.value !== cwidVal) {
                                                var gifModal = document.getElementById('gifModal');
                                                gifModal.style.display = "block";
                                                $.ajax({
                                                    type: 'GET',
                                                    url: "/bin/getShortAppEmpLook",
                                                    data: {
                                                        cwid: cwidVal,
                                                        //userID: userValue
                                                        //userID: 'nvadlakunta'
                                                    },
                                                    dataType: 'json',
                                                    success: function(myresopnse) {

                                                        var modal = document.getElementById('myModal');
                                                        var span = document.getElementsByClassName("close")[0];

                                                        if (myresopnse.length === 1) {
                                                            ZipPostalCode.value = myresopnse[0].POSTAL;
                                                            State.value = myresopnse[0].STATE;
                                                            BirthDate.value = myresopnse[0].BIRTHDATE;
                                                            LastName.value = myresopnse[0].LAST_NAME;
                                                            FirstName.value = myresopnse[0].FIRST_NAME;

                                                            EmpRCD.value = myresopnse[0].EMPL_RCD;

                                                            var maleVal = myresopnse[0].MALE;
                                                            var femaleVal = myresopnse[0].FEMALE;


                                                            if (maleVal === "1") {
                                                                Gender.value = "1";
                                                            } else if (femaleVal === "1") {
                                                                Gender.value = "2";
                                                            }
                                                            City.value = myresopnse[0].CITY;
                                                            userID.value = myresopnse[0].USERID;
                                                            var userVal = myresopnse[0].USERID;
                                                            var emailVal = userVal.concat("@fullerton.edu");
                                                            Email.value = emailVal;

                                                            SSN.value = myresopnse[0].NATIONAL_ID;
                                                            var str = myresopnse[0].NATIONAL_ID;
                                                            var substr = str.substring(str.length - 4, str.length);
                                                            var ssn1 = "XXX-XX-";
                                                            var resultVal = ssn1.concat(substr);
                                                            SSN.value = resultVal;

                                                            //var numbers = SSN.value;
                                                            //SSN.value = numbers.substr(0, 3) + '-' + numbers.substr(3, 2) + '-' + numbers.substr(5, 4);

                                                            MiddleName.value = myresopnse[0].MIDDLE_NAME;
                                                            Phone.value = myresopnse[0].HOME_PHONE;
                                                            StreetNumber.value = myresopnse[0].ADDRESS1;
                                                            //EMPLID.value = myresopnse[0].ADDRESS2;
                                                            EmplID.value = myresopnse[0].EMPLID;
                                                            UserLookupFlag.value = myresopnse[0].EMPLID;
                                                            CBID.value = myresopnse[0].UNION_CD;
                                                            deptID.value = myresopnse[0].DEPTID;
                                                            deptName.value = myresopnse[0].DEPTNAME;

                                                            var cbidVal = CBID.value;
                                                            var deptIdVal = deptID.value;
                                                            var empIdVal = EmplID.value;

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

                                                                    ManagerUserID.value = managerDetails[0].MANAGER_EMP_USERID;
                                                                    ManagerEmailID.value = managerDetails[0].MANAGER_EMAIL_ID;
                                                                    managerName.value = managerDetails[0].MANAGER_NAME;
                                                                    

                                                                },
                                                                error: function(error) {
                                                                    alert("error block=" + error);
                                                                }
                                                            });

                                                            gifModal.style.display = "none";
                                                            modal.style.display = "none";

                                                        } else if (myresopnse.length > 1) {
                                                            gifModal.style.display = "none";
                                                            modal.style.display = "block";
                                                            fnameHidden.value = myresopnse[0].FIRST_NAME;
                                                            lnameHidden.value = myresopnse[0].LAST_NAME;
                                                            CBID.value = myresopnse[0].UNION_CD;
                                                            EmpRCD.value = myresopnse[0].EMPL_RCD;

                                                            var col = [];
                                                            col.push("EMPLID");
                                                            col.push("LAST_NAME");
                                                            col.push("FIRST_NAME");
                                                            col.push("DEPTID");
                                                            col.push("DEPTNAME");
                                                            /*col.push("EMPL_RCD");
                                                            col.push("DESCR");
                                                            col.push("GRADE");
                                                            col.push("UNION_CD");*/

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
                                                                    //alert("xcvbn");
                                                                    //debugger;
                                                                    deptHidden.value = event.currentTarget.parentNode.parentElement.childNodes[4].innerText;
                                                                    DeptNameHidden.value = event.currentTarget.parentNode.parentElement.childNodes[5].innerText;
                                                                    //cbidHidden.value = event.currentTarget.parentNode.parentElement.childNodes[6].innerText;
                                                                    //classificationHidden.value = event.currentTarget.parentNode.parentElement.childNodes[7].innerText;
                                                                    // RangeHidden.value = event.currentTarget.parentNode.parentElement.childNodes[8].innerText;
                                                                    EmpIdHidden.value = event.currentTarget.parentNode.parentElement.childNodes[1].innerText;
                                                                    // empRCDHidden.value = event.currentTarget.parentNode.parentElement.childNodes[9].innerText;
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


                                                            //if(table.rows[1].cells[0].childNodes[0].checked){alert("hi");}else{alert("hello");}
                                                            var okButton = document.createElement("input");
                                                            okButton.type = "button";
                                                            okButton.setAttribute("class", "okBtn");
                                                            //okButton.id = "okBtn";
                                                            okButton.value = "OK";
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
                                                                        ZipPostalCode.value = myresopnse[n].POSTAL;
                                                                        State.value = myresopnse[n].STATE;
                                                                        BirthDate.value = myresopnse[n].BIRTHDATE;
                                                                        LastName.value = myresopnse[n].LAST_NAME;
                                                                        FirstName.value = myresopnse[n].FIRST_NAME;

                                                                        EmpRCD.value = myresopnse[n].EMPL_RCD;
                                                                        var maleVal = myresopnse[n].MALE;
                                                                        var femaleVal = myresopnse[n].FEMALE;


                                                                        if (maleVal === "1") {
                                                                            Gender.value = "1";
                                                                        } else if (femaleVal === "1") {
                                                                            Gender.value = "2";
                                                                        }
                                                                        City.value = myresopnse[n].CITY;
                                                                        userID.value = myresopnse[n].USERID;
                                                                        var userVal = myresopnse[n].USERID;
                                                                        var emailVal = userVal.concat("@fullerton.edu");
                                                                        Email.value = emailVal;

                                                                        SSN.value = myresopnse[n].NATIONAL_ID;
                                                                        var str = myresopnse[n].NATIONAL_ID;
                                                                        var substr = str.substring(str.length - 4, str.length);
                                                                        var ssn1 = "XXX-XX-";
                                                                        var resultVal = ssn1.concat(substr);
                                                                        SSN.value = resultVal;

                                                                        //var numbers = SSN.value;
                                                                        //SSN.value = numbers.substr(0, 3) + '-' + numbers.substr(3, 2) + '-' + numbers.substr(5, 4);

                                                                        MiddleName.value = myresopnse[n].MIDDLE_NAME;
                                                                        Phone.value = myresopnse[n].HOME_PHONE;
                                                                        StreetNumber.value = myresopnse[n].ADDRESS1;
                                                                        //EMPLID.value = myresopnse[0].ADDRESS2;
                                                                        EmplID.value = myresopnse[n].EMPLID;
                                                                        UserLookupFlag.value = myresopnse[n].EMPLID;
                                                                        CBID.value = myresopnse[n].UNION_CD;
                                                                        deptID.value = myresopnse[n].DEPTID;
                                                                        deptName.value = myresopnse[n].DEPTNAME;
                                                                        rButtonStatus = true;
                                                                        break;
                                                                    }
                                                                }
                                                                if (rButtonStatus === false) {
                                                                    alert("Please select the department");
                                                                    modal.style.display = "block";
                                                                } else {
                                                                    var cbidVal = CBID.value;
                                                                    var deptIdVal = deptID.value;
                                                                    var empIdVal = EmplID.value;

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
                                                                            ManagerUserID.value = managerDetails[0].MANAGER_EMP_USERID; //MANAGER_EMP_USERID

                                                                            ManagerEmailID.value = managerDetails[0].MANAGER_EMAIL_ID;

                                                                            managerName.value = managerDetails[0].MANAGER_NAME;

                                                                           

                                                                        },
                                                                        error: function(error) {
                                                                            alert("error block=" + error);
                                                                        }
                                                                    });
                                                                    //FirstName.value = fnameHidden.value;
                                                                    // LastName.value = lnameHidden.value;

                                                                    //DepartmentName.value = DeptNameHidden.value;
                                                                    //CBID.value = cbidHidden.value;
                                                                    // Classification.value = classificationHidden.value;
                                                                    //Range.value = RangeHidden.value;
                                                                    //  EMPLID.value = EmpIdHidden.value;
                                                                    //EmpID1.value = EMPLID.value;
                                                                    //EmpFN.value = FirstName.value;
                                                                    //EmpLN.value = LastName.value;
                                                                    //EMPLRCD1.value = EmpRCD.value;
                                                                    //Department1.value = DepartmentName.value;

                                                                    // gifModal.style.display = "none";
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


                                                            FirstName.value = null;
                                                            LastName.value = null;
                                                            // DepartmentName.value = null;
                                                            // BargainingUnit.value = null;


                                                            //  EMPLRCD.value = null;

                                                            deptHidden.value = null;
                                                            DeptNameHidden.value = null;

                                                            EmpIdHidden.value = null;
                                                            //  empRCDHidden.value = null;
                                                            fnameHidden.value = null;
                                                            lnameHidden.value = null;

                                                            EmpID1.value = null;
                                                            EmpFN.value = null;
                                                            EmpLN.value = null;
                                                            EMPLRCD1.value = null;
                                                            Department1.value = null;

                                                            gifModal.style.display = "none";
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

                                                }); //here
                                            }
                                        }
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
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_AgreementHidden_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_AgreementHidden_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible=false;
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_logUser_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_logUser_init0 = function (scope) {
    with(this) {
        with(scope) {
            
$.ajax({

type: 'GET', 

url:"/bin/getLoggedUserId",
dataType: 'json',
success: function(myresopnse){
  var userValue=myresopnse.userId;
  logUser.value = userValue;
  /*if(StageIndicator.value === null){
   ManagerUserID.value = userValue;
  var mgrId = userValue;
  var mgrEmail = mgrId.concat('@').concat('fullerton.edu');
  ManagerEmailID.value=mgrEmail;
  }*/
},
  error: function(error){
alert("error block="+error);
}
});

        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_deptID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_deptID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){

   var dept_id = this.value;

   $.ajax({

     type: 'GET',

     url: "/bin/getChairDeanInfo",

                data:{
           dept_id:dept_id
                },

                                 dataType: 'json',
 
                                success: function(chairInfoResult) {


                                     if (chairInfoResult.length !== 0) {

                                        


                                         ChairUserId.value  = chairInfoResult[0].CHAIR_USERID;

                                         //ChairEmail.value  = chairInfoResult[0].CHAIR_EMAIL;
                                        ChairEmail.value  ="shreyas.manjunatha@thoughtfocus.com";
                                       //  ChairEmail.value  ="yjayaram@fullerton.edu";
                                       chairName.value = chairInfoResult[0].CHAIR_NAME;

                                        


                                     }
 
                                }

                             });

 }
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_workflow_initiator_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_workflow_initiator_init0 = function (scope) {
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
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_signatureInfo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_signatureInfo_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(formSavedStatus.value !== null && StageIndicator.value === null){
  debugger;
  var userLookup = UserLookupFlag.value;
  UserLookupFlag.value = FeeWaiverRequestedBy.value;
  if(FeeWaiverRequestedBy.value !== EmpID.value){
	 EmpSignPanel.visible = false;       
     HRPanel.visible  = true;     
     }else{
        EmpSignPanel.visible = true;
       
  HRPanel.visible  = false;
     }
  UserLookupFlag.value = userLookup;
}
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_FacultyStaffVerify_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_FacultyStaffVerify_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_checkSign_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_checkSign_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  if(this.value == "1"){
    hrSign.value = "";
    hrSigneddate.value = "";
    hrComments.value = "";
  }
}
if(StageIndicator.value === null || StageIndicator.value == "ToEmployee"){
if(this.value == "1"){
  var fnVal = FirstName.value;
  var lnVal = LastName.value;
  var signEmp = fnVal.concat(" ").concat(lnVal);
  Signature.value = signEmp;
  //EmpSign2.value = signEmp;
  var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, ' ');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
  SignedDate.value=d;
  SignedDate.enabled = false;
  Signature.enabled = false;
}else{
  SignedDate.value = null;
  Signature.value = null;
}
}
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_ChairPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_ChairPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_chairCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_chairCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (StageIndicator.value === "ToChair" ) {
      if (deptchairSignedDate.value === null) {
        var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, ' ');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        deptchairSignedDate.value = d;

        deptchairSignedDate.enabled = false;
         $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetailsFromDB",
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].FULL_NAME;
                    deptChairPrintName.value = userValue;
                  	deptChairSign.value = userValue;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
        deptchairSignedDate.enabled = false;
        deptChairSign.enabled = false;
        //EvaluatorNameSign.value = (EvaluatorsName.value).replace("  "," ");
    }
    }
} else {
    deptChairPrintName.value = "";
    deptChairSign.value = "";
    deptchairSignedDate.value = "";
}
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_SupPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_SupPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_supCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_supCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (StageIndicator.value === "ToSupervisor" ) {
      if (supervisorSignedDate.value === null) {
        var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, ' ');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        supervisorSignedDate.value = d;

        supervisorSignedDate.enabled = false;
         $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetailsFromDB",
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].FULL_NAME;
                    supervisorPrintname.value = userValue;
                  	supervisorSign.value = userValue;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
        supervisorSignedDate.enabled = false;
        supervisorSign.enabled= false;
        //EvaluatorNameSign.value = (EvaluatorsName.value).replace("  "," ");
    }
   }
} else {
    supervisorPrintname.value = "";
    supervisorSign.value = "";
    supervisorSignedDate.value = "";
}
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_AdmissionOfficeCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_AdmissionOfficeCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (StageIndicator.value === "ToAdmissionOffice" ) {
      if (AdmissionOfficeSignedDate.value === null) {
        var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, ' ');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        AdmissionOfficeSignedDate.value = d;

        AdmissionOfficeSignedDate.enabled = false;
         $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetailsFromDB",
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].FULL_NAME;
                    AdmissionOfficePrintName.value = userValue;
                  	AdmissionOfficeSign.value = userValue;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
        AdmissionOfficeSignedDate.enabled = false;
        AdmissionOfficeSign.enabled = false;
        //EvaluatorNameSign.value = (EvaluatorsName.value).replace("  "," ");
    }
    }
} else {
    AdmissionOfficePrintName.value = "";
    AdmissionOfficeSign.value = "";
    AdmissionOfficeSignedDate.value = "";
}
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_hrCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_hrCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  if(this.value == "1"){
    SignedDate.value = null;
  Signature.value = null;
   EmpComments.value = null;
  }
}
if (this.value == 1) {
    if (StageIndicator.value === "ToHR" || StageIndicator.value === null || StageIndicator.value === "ToHRInitial") {
      if (hrSigneddate.value === null) {
        var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, ' ');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        hrSigneddate.value = d;

        hrSigneddate.enabled = false;
         $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetailsFromDB",
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].FULL_NAME;                    
                  	hrSign.value = userValue;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
        hrSigneddate.enabled = false;
        hrSign.enabled = false;
        //EvaluatorNameSign.value = (EvaluatorsName.value).replace("  "," ");
    }
    }
} else {
    
    hrSign.value = "";
    hrSigneddate.value = "";
}
        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            var submitFlag  = 0;

if (EmplID.value !== null && FirstName.value !== null && LastName.value !== null) {
  //alert("here");
  
  submitFlag  = 0;
  
  
  }else{
var modal = document.getElementById("errorPopup");
    var para = document.getElementById("para");
    para.innerHTML = "";
    para.innerHTML = "Please enter Empl ID, First Name, Last Name";
    var errorBody = document.getElementById('errorData');
    errorBody.innerHTML = "";
    errorBody.appendChild(para);
    var footerModal = document.getElementById("errorPopup-footer");
    var okButton = document.createElement("input");
    okButton.type = "button";
    okButton.setAttribute("class", "okBtn");
    //okButton.id = "okBtn";
    okButton.value = "Ok";
    okButton.onclick = function(event) {
        modal.style.display = "none";
    };
   
    footerModal.appendChild(okButton);
    
    modal.style.display = "block";
    //guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].employeeInfo[0].CSUFStatus[0]");
  
    submitFlag  = 1;
  }

if(submitFlag === 0){
if(AttendedCSUFBefore.value === "1" && CSUFStatus.value === null ){
   /*alert("Please indicate whether employee is eligible to participate");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].certificateInfo[0].eligibleCB[0]");*/
  	var modal = document.getElementById("errorPopup");
    var para = document.getElementById("para");
    para.innerHTML = "";
    para.innerHTML = "Make appropriate Status selection";
    var errorBody = document.getElementById('errorData');
    errorBody.innerHTML = "";
    errorBody.appendChild(para);
    var footerModal = document.getElementById("errorPopup-footer");
    var okButton = document.createElement("input");
    okButton.type = "button";
    okButton.setAttribute("class", "okBtn");
    //okButton.id = "okBtn";
    okButton.value = "Ok";
    okButton.onclick = function(event) {
        modal.style.display = "none";
    };
   
    footerModal.appendChild(okButton);
    
    modal.style.display = "block";
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].employeeInfo[0].CSUFStatus[0]");
  
    submitFlag  = 1;
  }
  else{
     submitFlag  = 0;
  }
}
//alert(submitFlag);
if(submitFlag === 0){ 
  //alert("submit===");
  getPdf();

}



function getPdf() {
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/short-app-employee-fee-waiver/short-application-employee-fee-waiver');
            jsonData.append('fileName', FirstName.value + "_" + LastName.value + "(" + EmplID.value + ")" + "_" + Date.now());          
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
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_saveguidedraft1587032893049_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_saveguidedraft1587032893049_click0 = function (scope) {
    with(this) {
        with(scope) {
            formSavedStatus.value = "1";
aftiaDescCWID.value = (FirstName.value + " " + LastName.value + " " + EmplID.value);
handleDraftSave(this);


        }
	}
}
/**
 * @function short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
short_app_employee_fee_waiver_short_application_employee_fee_waiver.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(Semester.value == "1"){
  termValue.value = "Fall";
}else if(Semester.value == "2"){
  termValue.value = "Spring";
}else if(Semester.value == "3"){
  termValue.value = "Summer";
}
/*ManagerEmailID.value = "swathi.kumari@thoughtfocus.com";
ChairEmail.value = "swathi.kumari@thoughtfocus.com";
Email.value = "swathi.kumari@thoughtfocus.com";*/

ManagerEmailID.value = "shreyas.manjunatha@thoughtfocus.com";
ChairEmail.value = "shreyas.manjunatha@thoughtfocus.com";
Email.value = "shreyas.manjunatha@thoughtfocus.com";


/*ManagerEmailID.value = "yjayaram@fullerton.edu";
ChairEmail.value = "yjayaram@fullerton.edu";
Email.value = "yjayaram@fullerton.edu";*/

var submitFlag = 0;
//alert("here"+FirstName.value);
/*EmpID1.value = EMPLID.value;
EmpFN.value = FirstName.value;
EmpLN.value = LastName.value;
EMPLRCD1.value = EMPLRCD.value;
Department1.value = DepartmentName.value;*/


if(AttendedCSUFBefore.value === "1" && CSUFStatus.value === null){
   /*alert("Please indicate whether employee is eligible to participate");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].certificateInfo[0].eligibleCB[0]");*/
  	var modal = document.getElementById("errorPopup");
    var para = document.getElementById("para");
    para.innerHTML = "";
    para.innerHTML = "Make appropriate Status selection";
    var errorBody = document.getElementById('errorData');
    errorBody.innerHTML = "";
    errorBody.appendChild(para);
    var footerModal = document.getElementById("errorPopup-footer");
    var okButton = document.createElement("input");
    okButton.type = "button";
    okButton.setAttribute("class", "okBtn");
    //okButton.id = "okBtn";
    okButton.value = "Ok";
    okButton.onclick = function(event) {
        modal.style.display = "none";
    };
   
    footerModal.appendChild(okButton);
    
    modal.style.display = "block";
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].employeeInfo[0].CSUFStatus[0]");
  
    submitFlag  = 1;
  }else{
     submitFlag  = 0;
  }

aftiaDescCWID.value = (FirstName.value + " " + LastName.value + " " + EmplID.value);
if(submitFlag  === 0){
  /*EmpID1.value = EMPLID.value;
  EmpFN.value = FirstName.value;
  EmpLN.value = LastName.value;
  EMPLRCD1.value = EMPLRCD.value;
  Department1.value = DepartmentName.value;*/
  if(LastName.value !== null){
    EmailSubject.value = "Test - Short Application Employee Fee Waiver - "+LastName.value;
  }else{
    EmailSubject.value = "Test - Short Application Employee Fee Waiver";
  }
  guideBridge.submit();
}

        }
	}
}
