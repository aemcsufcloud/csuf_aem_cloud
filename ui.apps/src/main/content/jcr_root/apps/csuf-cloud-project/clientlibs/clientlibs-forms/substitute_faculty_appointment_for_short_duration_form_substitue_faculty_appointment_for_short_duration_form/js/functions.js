/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            var gifModal = document.getElementById('gifModal');
if (StageIndicator.value === null) {

    $.ajax({

        type: 'GET',

        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(myresponse) {

            var userValue = myresponse.userId;
           //	var userValue = "sarahbauer";
            workflow_initiator.value = userValue;

            $.ajax({

                type: 'GET',
                url: "/bin/getChairDirectorApplicationData",
                data: {
                    userId: userValue,
                    action: 'USERIDDETAILS'
                },
                dataType: 'json',
                success: function(userDetailsResponse) {
                    if (userDetailsResponse.length == 1) {                       
                        hidden_initiator_firstName.value = userDetailsResponse[0].FIRST_NAME;
                        hidden_initiator_lastName.value = userDetailsResponse[0].LAST_NAME;   
                      	hidden_cwid.value = userDetailsResponse[0].EMPLID;
                      	hidden_deptID.value = userDetailsResponse[0].DEPTID;
                      	hidden_initiator_userID.value = userDetailsResponse[0].EMPUSERID; 
                      	//hidden_initiator_email.value = userDetailsResponse[0].EMAILID;
                       	hidden_initiator_email.value = "shreyas.manjunatha@thoughtfocus.com";
                        
                        gifModal.style.display = "none";

                    } else {
                        showErrorModal("Alert !", "No matching records found");
                        gifModal.style.display = "none";
                    }
                }
            });
        }
    });
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value === null){
	ChairSignaturePanel.visible = false;
	DeanSignaturePanel.visible = false;
	HRReviewPanel.visible = false;
	SubstituteFacultySignaturePanel.visible = false;
	DeptCoordinatorSignaturePanel.visible = false;
}
else if(StageIndicator.value == "ToAcademicHR"){

	employeeInformation.enabled = false;
	AdditionalEmploymentRequest.enabled = false;
	EstimatedHoursWSPanel.enabled = false;
	FormInitiatorPanel.enabled = false;
	if(dept_coordinator_signature.value !== null){
		DeptCoordinatorSignaturePanel.visible = true;
		DeptCoordinatorSignaturePanel.enabled = false;
	}
	else{
		DeptCoordinatorSignaturePanel.visible = false;
	}
	ChairSignaturePanel.visible = false;
	DeanSignaturePanel.visible = false;
	HRReviewPanel.visible = true;
	SubstituteFacultySignaturePanel.visible = false;	
}
else if(StageIndicator.value == "ToDeptCoordinator"){
	employeeInformation.enabled = true;
	CWID.enabled = false;
	AdditionalEmploymentRequest.enabled = true;
	EstimatedHoursWSPanel.enabled = true;
	FormInitiatorPanel.enabled = false;
	DeptCoordinatorSignaturePanel.visible = true;
	ChairSignaturePanel.visible = false;	
	DeanSignaturePanel.visible = false;	
	HRReviewPanel.visible = true;
	HRReviewPanel.enabled = false;
	SubstituteFacultySignaturePanel.visible = false;	
}
else if(StageIndicator.value == "ToChair"){
	employeeInformation.enabled = false;
	AdditionalEmploymentRequest.enabled = false;
	EstimatedHoursWSPanel.enabled = false;
	FormInitiatorPanel.enabled = false;
	if(dept_coordinator_signature.value !== null){
		DeptCoordinatorSignaturePanel.visible = true;
		DeptCoordinatorSignaturePanel.enabled = false;
	}
	else{
		DeptCoordinatorSignaturePanel.visible = false;
	}
	ChairSignaturePanel.visible = true;
	DeanSignaturePanel.visible = false;
	HRReviewPanel.visible = true;
	HRReviewPanel.enabled = false;
	SubstituteFacultySignaturePanel.visible = false;	
}
else if(StageIndicator.value == "ToDean"){
	employeeInformation.enabled = false;
	AdditionalEmploymentRequest.enabled = false;
	EstimatedHoursWSPanel.enabled = false;
	FormInitiatorPanel.enabled = false;
	ChairSignaturePanel.visible = true;
	ChairSignaturePanel.enabled = false;
	DeanSignaturePanel.visible = true;
	HRReviewPanel.visible = true;
	HRReviewPanel.enabled = false;
	SubstituteFacultySignaturePanel.visible = false;
	DeptCoordinatorSignaturePanel.visible = false;
}else if(StageIndicator.value == "ToFaculty"){
	employeeInformation.enabled = false;
	AdditionalEmploymentRequest.enabled = false;
	EstimatedHoursWSPanel.enabled = false;
	FormInitiatorPanel.enabled = false;
	ChairSignaturePanel.visible = true;
	ChairSignaturePanel.enabled = false;
	DeanSignaturePanel.visible = true;
	DeanSignaturePanel.enabled = false;
	HRReviewPanel.visible = true;
	HRReviewPanel.enabled = false;
	SubstituteFacultySignaturePanel.visible = true;
	DeptCoordinatorSignaturePanel.visible = false;
}

        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    ChairSignaturePanel.visible = false;
    DeanSignaturePanel.visible = false;
    HRReviewPanel.visible = false;
    SubstituteFacultySignaturePanel.visible = false;
    DeptCoordinatorSignaturePanel.visible = false;
    OptionalReviewSignaturePanel.visible = false;
    PayrollSignaturePanel.visible = false;
}else if(StageIndicator.value == "ToOptionalReviewer"){
    employeeInformation.enabled = false;
    AdditionalEmploymentRequest.enabled = false;
    EstimatedHoursWSPanel.enabled = false;
    FormInitiatorPanel.enabled = false;

if(PayrollSignCB.value == "1"){
PayrollSignaturePanel.enabled = false;
}else{
PayrollSignaturePanel.visible = false;
}

if(PayrollCB.value == "1"){
SubstituteFacultySignaturePanel.enabled = false;
}else{
SubstituteFacultySignaturePanel.visible = false;
}

if(DeptChairCB.value == "1"){
ChairSignaturePanel.enabled = false;
}else{
ChairSignaturePanel.visible = false;
}

if(DeptCoordinatorCB.value == "1"){
DeptCoordinatorSignaturePanel.enabled = false;
}else{
DeptCoordinatorSignaturePanel.visible = false;
}

if(HRCB.value == "1"){
HRReviewPanel.enabled = false;
}else{
HRReviewPanel.visible = false;
}


if(DeanCB.value == "1"){
DeanSignaturePanel.enabled = false;
}else{
DeanSignaturePanel.visible = false;
}
} else if (StageIndicator.value == "ToAcademicHR") {
    employeeInformation.enabled = false;
    AdditionalEmploymentRequest.enabled = false;
    EstimatedHoursWSPanel.enabled = false;
    FormInitiatorPanel.enabled = false;
    if (optionalReviewerCB.value == "1") {
        OptionalReviewSignaturePanel.enabled = false;
    } else {
        OptionalReviewSignaturePanel.visible = false;
    }

    if (PayrollSignCB.value == "1") {
        PayrollSignaturePanel.enabled = false;
    } else {
        PayrollSignaturePanel.visible = false;
    }

    if (PayrollCB.value == "1") {
        SubstituteFacultySignaturePanel.enabled = false;
    } else {
        SubstituteFacultySignaturePanel.visible = false;
    }

    if (DeptChairCB.value == "1") {
        ChairSignaturePanel.enabled = false;
    } else {
        ChairSignaturePanel.visible = false;
    }

    if (DeptCoordinatorCB.value == "1") {
        DeptCoordinatorSignaturePanel.enabled = false;
    } else {
        DeptCoordinatorSignaturePanel.visible = false;
    }
    if (DeanCB.value == "1") {
        DeanSignaturePanel.enabled = false;
    } else {
        DeanSignaturePanel.visible = false;
    }
} else if (StageIndicator.value == "ToDeptCoordinator") {
    employeeInformation.enabled = true;
    CWID.enabled = false;
    AdditionalEmploymentRequest.enabled = true;
    EstimatedHoursWSPanel.enabled = true;
    FormInitiatorPanel.enabled = false;
    if (optionalReviewerCB.value == "1") {
        OptionalReviewSignaturePanel.enabled = false;
    } else {
        OptionalReviewSignaturePanel.visible = false;
    }

    if (PayrollSignCB.value == "1") {
        PayrollSignaturePanel.enabled = false;
    } else {
        PayrollSignaturePanel.visible = false;
    }

    if (PayrollCB.value == "1") {
        SubstituteFacultySignaturePanel.enabled = false;
    } else {
        SubstituteFacultySignaturePanel.visible = false;
    }

    if (DeptChairCB.value == "1") {
        ChairSignaturePanel.enabled = false;
    } else {
        ChairSignaturePanel.visible = false;
    }

    if (HRCB.value == "1") {
        HRReviewPanel.enabled = false;
    } else {
        HRReviewPanel.visible = false;
    }

    if (DeanCB.value == "1") {
        DeanSignaturePanel.enabled = false;
    } else {
        DeanSignaturePanel.visible = false;
    }
} else if (StageIndicator.value == "ToChair") {
    employeeInformation.enabled = false;
    AdditionalEmploymentRequest.enabled = false;
    EstimatedHoursWSPanel.enabled = false;
    FormInitiatorPanel.enabled = false;
    if (optionalReviewerCB.value == "1") {
        OptionalReviewSignaturePanel.enabled = false;
    } else {
        OptionalReviewSignaturePanel.visible = false;
    }

    if (PayrollSignCB.value == "1") {
        PayrollSignaturePanel.enabled = false;
    } else {
        PayrollSignaturePanel.visible = false;
    }

    if (PayrollCB.value == "1") {
        SubstituteFacultySignaturePanel.enabled = false;
    } else {
        SubstituteFacultySignaturePanel.visible = false;
    }

    if (DeptCoordinatorCB.value == "1") {
        DeptCoordinatorSignaturePanel.enabled = false;
    } else {
        DeptCoordinatorSignaturePanel.visible = false;
    }

    if (HRCB.value == "1") {
        HRReviewPanel.enabled = false;
    } else {
        HRReviewPanel.visible = false;
    }

    if (DeanCB.value == "1") {
        DeanSignaturePanel.enabled = false;
    } else {
        DeanSignaturePanel.visible = false;
    }
} else if (StageIndicator.value == "ToDean") {
    employeeInformation.enabled = false;
    AdditionalEmploymentRequest.enabled = false;
    EstimatedHoursWSPanel.enabled = false;
    FormInitiatorPanel.enabled = false;
    if (optionalReviewerCB.value == "1") {
        OptionalReviewSignaturePanel.enabled = false;
    } else {
        OptionalReviewSignaturePanel.visible = false;
    }

    if (PayrollSignCB.value == "1") {
        PayrollSignaturePanel.enabled = false;
    } else {
        PayrollSignaturePanel.visible = false;
    }

    if (PayrollCB.value == "1") {
        SubstituteFacultySignaturePanel.enabled = false;
    } else {
        SubstituteFacultySignaturePanel.visible = false;
    }

    if (DeptChairCB.value == "1") {
        ChairSignaturePanel.enabled = false;
    } else {
        ChairSignaturePanel.visible = false;
    }

    if (DeptCoordinatorCB.value == "1") {
        DeptCoordinatorSignaturePanel.enabled = false;
    } else {
        DeptCoordinatorSignaturePanel.visible = false;
    }

    if (HRCB.value == "1") {
        HRReviewPanel.enabled = false;
    } else {
        HRReviewPanel.visible = false;
    }


} else if (StageIndicator.value == "ToFaculty") {
    employeeInformation.enabled = false;
    AdditionalEmploymentRequest.enabled = false;
    EstimatedHoursWSPanel.enabled = false;
    FormInitiatorPanel.enabled = false;
    if (optionalReviewerCB.value == "1") {
        OptionalReviewSignaturePanel.enabled = false;
    } else {
        OptionalReviewSignaturePanel.visible = false;
    }

    if (PayrollSignCB.value == "1") {
        PayrollSignaturePanel.enabled = false;
    } else {
        PayrollSignaturePanel.visible = false;
    }

    if (DeptChairCB.value == "1") {
        ChairSignaturePanel.enabled = false;
    } else {
        ChairSignaturePanel.visible = false;
    }

    if (DeptCoordinatorCB.value == "1") {
        DeptCoordinatorSignaturePanel.enabled = false;
    } else {
        DeptCoordinatorSignaturePanel.visible = false;
    }

    if (HRCB.value == "1") {
        HRReviewPanel.enabled = false;
    } else {
        HRReviewPanel.visible = false;
    }


    if (DeanCB.value == "1") {
        DeanSignaturePanel.enabled = false;
    } else {
        DeanSignaturePanel.visible = false;
    }
} else if(StageIndicator.value == "ToPayroll"){
    employeeInformation.enabled = false;
    AdditionalEmploymentRequest.enabled = false;
    EstimatedHoursWSPanel.enabled = false;
    FormInitiatorPanel.enabled = false;
  if(optionalReviewerCB.value == "1"){
OptionalReviewSignaturePanel.enabled = false;
}else{
OptionalReviewSignaturePanel.visible = false;
}


if(PayrollCB.value == "1"){
SubstituteFacultySignaturePanel.enabled = false;
}else{
SubstituteFacultySignaturePanel.visible = false;
}

if(DeptChairCB.value == "1"){
ChairSignaturePanel.enabled = false;
}else{
ChairSignaturePanel.visible = false;
}

if(DeptCoordinatorCB.value == "1"){
DeptCoordinatorSignaturePanel.enabled = false;
}else{
DeptCoordinatorSignaturePanel.visible = false;
}

if(HRCB.value == "1"){
HRReviewPanel.enabled = false;
}else{
HRReviewPanel.visible = false;
}


if(DeanCB.value == "1"){
DeanSignaturePanel.enabled = false;
}else{
DeanSignaturePanel.visible = false;
}
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_textdraw1575095828043_copy_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_textdraw1575095828043_copy_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CWID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CWID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
	
    var userValue = this.value;

    $.ajax({

        type: 'GET',
        url: "/bin/getSubstitudeFacultyAppointmentData",
        data: {
            cwid: userValue,
            action: 'USERIDDETAILS'
        },
        dataType: 'json',
        success: function(userDetailsResponse) {
            if (userDetailsResponse.length > 0) {
              	
                EmpName.value = userDetailsResponse[0].EMP_NAME;
                //CMSPosNo.value = userDetailsResponse[0].POSITION_NBR;
              	hidden_faculty_userID.value = userDetailsResponse[0].EMPUSERID;
              	hidden_faculty_email.value = userDetailsResponse[0].EMAILID;
                FirstName.value=userDetailsResponse[0].FIRST_NAME;
              LastName.value=userDetailsResponse[0].LAST_NAME;
              DeptId.value=userDetailsResponse[0].DEPTID;
              deptName.value=userDetailsResponse[0].DEPTNAME;
              	var deptId = userDetailsResponse[0].DEPTID;              	
              	getChairDeanDetails(deptId);

                gifModal.style.display = "none";

            } 
          /* else if (userDetailsResponse.length > 1) {
                var modal = document.getElementById('myModal');
                var myHeader = document.getElementById('pheader');
                myHeader.innerHTML = "Please select the program";
                var span = document.getElementsByClassName("close")[0];
                gifModal.style.display = "none";
                modal.style.display = "block";

                var col = [];

                col.push("DEPTID");
                col.push("DEPTNAME");

                var table = document.createElement("table");
                table.id = "tb";
                var tr = table.insertRow(-1);
                var headings = ["", "Department ID", "Department Name"];
                for (var j = 0; j < headings.length; j++) {
                    var th = document.createElement("th");
                    th.innerHTML = headings[j];
                    tr.appendChild(th);
                }
                for (var k = 0; k < userDetailsResponse.length; k++) {
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
                        tabCell.innerHTML = userDetailsResponse[k][col[l]];
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

                            EmpName.value = userDetailsResponse[n].EMP_NAME;
							CMSPosNo.value = userDetailsResponse[n].POSITION_NBR;
                             DeptId.value()=myresponse[n].DEPT;
                             Department.value()=myresponse[n].DEPTNAME;
                          	hidden_faculty_userID.value = userDetailsResponse[0].EMPUSERID;
              				hidden_faculty_email.value = userDetailsResponse[0].EMAILID; 
                             FirstName.value()=myresponse[n].First_Name;
                             LastName.value()=myresponse[n].Last_Name;
                          	var deptId = userDetailsResponse[n].DEPTID;                          
                          	getChairDeanDetails(deptId);

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
                footerModal.appendChild(okButton);
            } */
            else {
                showErrorModal("Alert !", "No matching records found");
                gifModal.style.display = "none";
            }
        }
    });
}


function getChairDeanDetails(deptId){	
  	
	var deptIdValue = deptId;
  	console.log("deptIdValue =" + deptIdValue);
	
	$.ajax({

		type: 'GET',
		url: "/bin/getSubstitudeFacultyAppointmentData",
		data: {
			deptID: deptIdValue,
			action: 'CHAIRDEANDETAILS'
		},
		dataType: 'json',
		success: function(chairDeanDetails) {          	
			if (chairDeanDetails.length > 0) {
				hidden_chair_userID.value = chairDeanDetails[0].CHAIR_USERID;
				hidden_chair_name.value = chairDeanDetails[0].CHAIR_NAME;
                if(chairDeanDetails[0].CHAIR_NAME === ""){
                  hidden_chair_name.value = "Administrator";
                }
				hidden_chair_email.value = chairDeanDetails[0].CHAIR_EMAIL;
				hidden_dean_userID.value = chairDeanDetails[0].DEAN_USERID;
				hidden_dean_name.value = chairDeanDetails[0].DEAN_NAME;
				hidden_dean_email.value = chairDeanDetails[0].DEAN_EMAIL;

				gifModal.style.display = "none";

			}
		}
	});	
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CWID_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CWID_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
	debugger;
    var userValue = this.value;
var gifModal = document.getElementById('gifModal');
        gifModal.style.display = "block";
    $.ajax({

        type: 'GET',
        url: "/bin/getPreRetirementData",
        data: {
            cwid: userValue,
            action: 'PR_USER_DATA'
        },
        dataType: 'json',
        success: function(userDetailsResponse) {
          
           var modal = document.getElementById('myModal');
                var span = document.getElementsByClassName("close")[0];
            if (userDetailsResponse.length > 0) {
              	EmployeeEmailBackup.visible = false;
                
                //CMSPosNo.value = userDetailsResponse[0].POSITION_NBR;
              	hidden_faculty_userID.value = userDetailsResponse[0].EMP_USERID;
             // 	hidden_faculty_email.value = userDetailsResponse[0].EMAILID;
              hidden_faculty_email.value = "shreyas.manjunatha@thoughtfocus.com";
                FirstName.value=userDetailsResponse[0].FIRST_NAME;
              LastName.value=userDetailsResponse[0].LAST_NAME;
              EmpName.value = FirstName.value +" "+LastName.value;
              DeptId.value=userDetailsResponse[0].DEPTID;
              deptName.value=userDetailsResponse[0].DEPTNAME;
              	var full_college = userDetailsResponse[0].FUL_COLLEGE;              	
              	getDean(full_college);
				getChairDeanDetails(DeptId.value);
               gifModal.style.display = "none";
                    modal.style.display = "none";

            } 
         else if (userDetailsResponse.length > 1) {
           EmployeeEmailBackup.visible = false;
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
                    for (var k = 0; k < userDetailsResponse.length; k++) {
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
                            tabCell.innerHTML = userDetailsResponse[k][col[l]];
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

                        var n;
                        var rButtonStatus;
                        //var rButtonStatusFalse;
                        var rButtons = document.getElementsByClassName("rb");
                        for (n = 0; n < rButtons.length; n++) {
                            if (rButtons[n].checked === false) {
                                rButtonStatus = false;
                            } else {
                                hidden_faculty_userID.value = userDetailsResponse[n].EMP_USERID;
              //	hidden_faculty_email.value = userDetailsResponse[n].EMAILID;
                              	hidden_faculty_email.value ="shreyas.manjunatha@thoughtfocus.com";
                FirstName.value=userDetailsResponse[n].FIRST_NAME;
              LastName.value=userDetailsResponse[n].LAST_NAME;
              EmpName.value = FirstName.value +" "+LastName.value;
              DeptId.value=userDetailsResponse[n].DEPTID;
              deptName.value=userDetailsResponse[n].DEPTNAME;
              	var full_college = userDetailsResponse[n].FUL_COLLEGE;              	
              	getDean(full_college);
				getChairDeanDetails(DeptId.value);
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

                }
            else {
                EmpName.enabled = true;
                 EmployeeEmailBackup.value = "";
                EmployeeEmailBackup.visible = true;
                EmployeeEmailBackup.mandatory = true;
                showErrorModal("Alert !", "No matching records found");
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


function getChairDeanDetails(deptId){	
  	
	var deptIdValue = deptId;
  	console.log("deptIdValue =" + deptIdValue);
	
	$.ajax({

		type: 'GET',
		url: "/bin/getSubstitudeFacultyAppointmentData",
		data: {
			deptID: deptIdValue,
			action: 'CHAIRDEANDETAILS'
		},
		dataType: 'json',
		success: function(chairDeanDetails) {          	
			if (chairDeanDetails.length > 0) {
				hidden_chair_userID.value = chairDeanDetails[0].CHAIR_USERID;
				hidden_chair_name.value = chairDeanDetails[0].CHAIR_NAME;
                if(chairDeanDetails[0].CHAIR_NAME === ""){
                  hidden_chair_name.value = "Administrator";
                }
				//hidden_chair_email.value = chairDeanDetails[0].CHAIR_EMAIL;
				hidden_chair_email.value = "shreyas.manjunatha@thoughtfocus.com";
				////hidden_dean_userID.value = chairDeanDetails[0].DEAN_USERID;
				////hidden_dean_name.value = chairDeanDetails[0].DEAN_NAME;
				////hidden_dean_email.value = chairDeanDetails[0].DEAN_EMAIL;

				gifModal.style.display = "none";

			}
		}
	});	
}
function getDean(college){
if (StageIndicator.value === null || StageIndicator.value == "ToRequestor") {
  
  
  
    $.ajax({
        type: 'GET',
        url: "/bin/getTASubstituteFacultyData",
        data: {
            action: "TASUBSTITUTE_DEAN_DATA",
            college: college
        },
        dataType: 'json',
        success: function(myresopnse) {
            if (myresopnse.length !== 0) {
                //hidden_dean_email.value = myresopnse[0].EMP_EMAIL;
              	//hidden_dean_email.value = "yjayaram@fulleron.edu";
              hidden_dean_email.value = "shreyas.manjunatha@thoughtfocus.com";
                hidden_dean_name.value = myresopnse[0].EMPNAME;
                hidden_dean_userID.value = myresopnse[0].EMP_USERID;
              
            } else {
                hidden_dean_email.value = "";
                hidden_dean_name.value = "";
                hidden_dean_userID.value = "";
                
            }
        }
    });
}
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_EmpName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_EmpName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CMSPosNo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CMSPosNo_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CMSPosNo_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CMSPosNo_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
	var posNo = this.value;
	


    if (posNo !== null) {
        
        $.ajax({
            type: 'GET',
            url: "/bin/getSubstituteFacultyData",
            data: {
                action: "SUB_FACULTY_POSITION_LOOKUP",
                position_nbr: posNo
            },
            dataType: 'json',
            success: function(response) {

               

                if (response.length === 1) {                    
                    
                                       
                    DeptUnitNum.value = response[0].CSU_UNIT;
					
                    
                   // modal.style.display = "none";

                }  else {

                   // showErrorModal("Alert !", "No matching records found");

                    
                    DeptUnitNum.value = "";


                   
                }               
                
            }

        });
    }
}

        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CMSPosNo_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CMSPosNo_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToDeptCoordinator"){
  if(hidden_chair_userID.value === null && hidden_dean_userID.value === null){
    var posNo = this.value;
	


    if (posNo !== null) {
        
        $.ajax({
            type: 'GET',
            url: "/bin/getSubstituteFacultyData",
            data: {
                action: "SUB_FACULTY_POSITION_LOOKUP",
                position_nbr: posNo
            },
            dataType: 'json',
            success: function(response) {

               

                if (response.length === 1) {                    
                    debugger;
                                       
                DeptUnitNum.value = response[0].CSU_UNIT;
                DeptId.value=response[0].DEPTID;
                deptName.value=response[0].DEPTNAME;
              	var full_college = response[0].COLLEGE;              	
              	getDean(full_college);
				getChairDeanDetails(DeptId.value);
					
                    
                   // modal.style.display = "none";

                }  else {

                   // showErrorModal("Alert !", "No matching records found");

                    
                    DeptUnitNum.value = "";


                   
                }               
                
            }

        });
    }
    
  }
}

function getChairDeanDetails(deptId){	
  	
	var deptIdValue = deptId;
  	console.log("deptIdValue =" + deptIdValue);
	
	$.ajax({

		type: 'GET',
		url: "/bin/getSubstitudeFacultyAppointmentData",
		data: {
			deptID: deptIdValue,
			action: 'CHAIRDEANDETAILS'
		},
		dataType: 'json',
		success: function(chairDeanDetails) {          	
			if (chairDeanDetails.length > 0) {
				hidden_chair_userID.value = chairDeanDetails[0].CHAIR_USERID;
				hidden_chair_name.value = chairDeanDetails[0].CHAIR_NAME;
                if(chairDeanDetails[0].CHAIR_NAME === ""){
                  hidden_chair_name.value = "Administrator";
                }
				//hidden_chair_email.value = chairDeanDetails[0].CHAIR_EMAIL;
                hidden_chair_email.value = "shreyas.manjunatha@thoughtfocus.com";
			

				gifModal.style.display = "none";

			}
		}
	});	
}
function getDean(college){
  
  
  
    $.ajax({
        type: 'GET',
        url: "/bin/getTASubstituteFacultyData",
        data: {
            action: "TASUBSTITUTE_DEAN_DATA",
            college: college
        },
        dataType: 'json',
        success: function(myresopnse) {
            if (myresopnse.length !== 0) {
               // hidden_dean_email.value = myresopnse[0].EMP_EMAIL;
              	//hidden_dean_email.value = "yjayaram@fulleron.edu";
              	hidden_dean_email.value = "shreyas.manjunatha@thoughtfocus.com";
                hidden_dean_name.value = myresopnse[0].EMPNAME;
                hidden_dean_userID.value = myresopnse[0].EMP_USERID;
              
            } else {
                hidden_dean_email.value = "";
                hidden_dean_name.value = "";
                hidden_dean_userID.value = "";
                
            }
        }
    });
}

        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_ssn_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_ssn_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_EmployeeEmailBackup_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_EmployeeEmailBackup_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_EmployeeEmailBackup_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_EmployeeEmailBackup_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value === null){
  if(this.value !== null){
   // hidden_faculty_email.value = this.value;
       hidden_faculty_email.value = "shreyas.manjunatha@thoughtfocus.com";
   // var email = this.value;
     var email =  "shreyas.manjunatha@thoughtfocus.com";
    if(email.includes("@")){
      hidden_faculty_userID.value = email.substring(0, email.indexOf("@"));
    }else{
      hidden_faculty_userID.value = "admin";
    }
  }
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_Range1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_Range1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToDeptCoordinator"){
  if(this.value !== null){
      Range2.value = null;
      Range3.value = null;

      HourlyRateLab.value = "53"; 
      HourlyRateLecture.value = "77";
  }
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_Range2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_Range2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToDeptCoordinator"){
  if(this.value !== null){
      Range1.value = null;
      Range3.value = null;

      HourlyRateLab.value = "55"; 
      HourlyRateLecture.value = "79";
  }
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_Range3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_Range3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToDeptCoordinator"){
  if(this.value !== null){
      Range1.value = null;
      Range2.value = null;

      HourlyRateLab.value = "57"; 
      HourlyRateLecture.value = "83";
  }
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CSUFEmpYes_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CSUFEmpYes_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	CSUFEmpNo.value = null;
}
if(StageIndicator.value === null || StageIndicator.value == "ToDeptCoordinator"){ 
  if(this.value !== null){ 
   CurrCSUFEmp.mandatory = true;  
  }else{ 
    CurrCSUFEmp.mandatory = false; 
  } 
} 
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CSUFEmpNo_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CSUFEmpNo_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	CSUFEmpYes.value = null;
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_TotNoHrLecture_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_TotNoHrLecture_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToDeptCoordinator"){
  	if(HourlyRateLecture.value !== null){
        var totalNoHrLecture = HourlyRateLecture.value;
        var resultVal = this.value * totalNoHrLecture;
        CompHRLecture.value = resultVal.toFixed(1);
    }
    else{
        CompHRLecture.value = this.value;
    }
}

        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_HourlyRateLecture_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_HourlyRateLecture_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value === null || StageIndicator.value == "ToDeptCoordinator"){
    if(TotNoHrLecture.value !== null){
        var totalNoHrLecture = TotNoHrLecture.value;
        var resultVal = this.value * totalNoHrLecture;
        CompHRLecture.value = resultVal.toFixed(1);
    }
    else{
        CompHRLecture.value = this.value;
    }
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CompHRLecture_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CompHRLecture_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_TotNoHrLab_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_TotNoHrLab_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToDeptCoordinator"){
  	if(HourlyRateLab.value !== null){
        var totalNoHrLab = HourlyRateLab.value;
        var resultVal = this.value * totalNoHrLab;
        CompHRLab.value = resultVal.toFixed(1);
    }
    else{
        CompHRLab.value = this.value;
    }
}

        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_HourlyRateLab_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_HourlyRateLab_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToDeptCoordinator"){
  if(TotNoHrLab.value !== null){
      var totalNoHrLab = TotNoHrLab.value;
      var resultVal = this.value * totalNoHrLab;
      CompHRLab.value = resultVal.toFixed(1);
  }
  else{
      CompHRLab.value = this.value;
  }
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CompHRLab_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_CompHRLab_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_TotEstComp_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_TotEstComp_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_OptionalReviewerSelectionPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_OptionalReviewerSelectionPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value == "ToDeptCoordinator" || StageIndicator.value === null){
   this.visible = true;
}else{
  if(OptionalReviewerDropDown.value === null){
    this.visible = false;
  }else{
    this.visible = true;
  }
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_textbox1690786435633_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_textbox1690786435633_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null  || StageIndicator.value == "ToDeptCoordinator") {
    var appResult = [];
    if (this.value !== null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getFAERData",
            data: {
                action: "FAER_SEARCH_APPROVER",
                lastName: this.value
            },
            dataType: 'json',
            success: function(fundApproverResult) {
                if (fundApproverResult.length !== 0) {
                    //appResult.push("Select Optional Reviewer");
                    for (var i = 0; i < fundApproverResult.length; i++) {
                        var item = fundApproverResult[i].FIRSTNAME + " " + fundApproverResult[i].LASTNAME;
                       // //var uid = fundApproverResult[i].USERID;
                       // var uid = fundApproverResult[i].EMAILID;
                        var uid = "shreyas.manjunatha@thoughtfocus.com";
                        var idItem = i + 1;
                        //var jbcode = item.text;
                        appResult.push(item + " - " + uid);
                    }
                    OptionalReviewerDropDown.value = "";
                    OptionalReviewerDropDown.items = appResult;

                } else {
                    showErrorModal("Alert!", "No matching records found");
                    OptionalReviewerDropDown.items = [];
                    OptionalReviewerDropDown.value = "";
                    OptionalReviewerName.value = "";
                    OptionalReviewerUserId.value = "";
                    OptionalReviewerEmailId.value = "";
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_OptionalReviewerDropDown_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_OptionalReviewerDropDown_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null || StageIndicator.value == "ToDeptCoordinator") {
    var approverName = this.value;
    var approverEmplId;
    if (approverName != "Select Optional Reviewer" && approverName !== "") {
        approverName = approverName.substr(0, approverName.indexOf(' - '));
        OptionalReviewerName.value = approverName;
        //BudgetAnalystName_1.value = approverName;
        $.ajax({
            type: 'GET',
            url: "/bin/getFAERData",
            data: {
                action: "FAER_APPROVER_EMPID",
                approverName: approverName
            },
            dataType: 'json',
            success: function(myresopnse) {
                if (myresopnse[0].EMPLID !== null) {
                    approverEmplId = myresopnse[0].EMPLID;
                    getEmployeeDetails(approverEmplId);
                } else {
                     OptionalReviewerName.value = "";
                     OptionalReviewerUserId.value = "";
                     OptionalReviewerEmailId.value = "";
                }
            }
        });
    } else {
        OptionalReviewerName.value = "";
        OptionalReviewerUserId.value = "";
        OptionalReviewerEmailId.value = "";
    }
}

function getEmployeeDetails(approverEmplId) {
    if (StageIndicator.value === null || StageIndicator.value == "ToDeptCoordinator") {
        if (approverEmplId !== null) {
            $.ajax({
                type: 'GET',
                url: "/bin/getFAERData",
                data: {
                    action: "FAER_APPROVER_DETAILS",
                    approverEmplID: approverEmplId
                },
                dataType: 'json',
                success: function(myresopnse) {
                    if (myresopnse.length !== 0) {
                        OptionalReviewerUserId.value = myresopnse[0].EMP_USERID;
                       // OptionalReviewerEmailId.value = myresopnse[0].EMAILID;
                     // OptionalReviewerEmailId.value = "julnunez@FULLERTON.EDU";
                       OptionalReviewerEmailId.value = "shreyas.manjunatha@thoughtfocus.com";
                        //// AcademicDepartmentReviewerEmailId.value = "yjayaram@fullerton.edu";    
                    } else {
                        OptionalReviewerName.value = "";
                        OptionalReviewerUserId.value = "";
                        OptionalReviewerEmailId.value = "";
                    }
                }
            });
        }
    }
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_EstimatedHoursWSPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_EstimatedHoursWSPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_PayrollSignCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_PayrollSignCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (StageIndicator.value == "ToPayroll") {
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                PayrollSignature.value = myresopnse.userName;
                PayrollDate.value = myresopnse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
    }
} else {
    PayrollSignature.value = "";
    PayrollDate.value = "";
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_PayrollSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_PayrollSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_PayrollDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_PayrollDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_PayrollCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_PayrollCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (substitude_faculty_signature.value === null) {

        substitude_faculty_date.enabled = false;
        $.ajax({

            type: 'GET',

            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                substitude_faculty_signature.value = myresopnse.userName;
                substitude_faculty_date.value = myresopnse.SERVER_DATE;

            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        substitude_faculty_signature.enabled = false;
    }
} else {
    substitude_faculty_signature.value = "";
    substitude_faculty_date.value = "";
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_substitude_faculty_signature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_substitude_faculty_signature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_substitude_faculty_date_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_substitude_faculty_date_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_DeanCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_DeanCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToDean"){
    if (this.value == 1) {
        if (dean_signature.value === null) {

            dean_date.enabled = false;
            $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetails",
                dataType: 'json',
                success: function(response) {
                    dean_signature.value = response.userName;
                    dean_date.value = response.SERVER_DATE;

                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
            dean_signature.enabled = false;
        }
    } else {
        dean_signature.value = "";
        dean_date.value = "";
    }
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_dean_signature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_dean_signature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_dean_date_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_dean_date_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_DeptChairCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_DeptChairCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToChair"){
    if (this.value == 1) {
        if (dept_chair_signature.value === null) {

            dept_chair_date.enabled = false;
            $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetails",
                dataType: 'json',
                success: function(response) {
                    dept_chair_signature.value = response.userName;
                    dept_chair_date.value = response.SERVER_DATE;

                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
            dept_chair_signature.enabled = false;
        }
    } else {
        dept_chair_signature.value = "";
        dept_chair_date.value = "";
    }
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_dept_chair_signature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_dept_chair_signature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_dept_chair_date_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_dept_chair_date_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_DeptCoordinatorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_DeptCoordinatorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToDeptCoordinator"){
    if (this.value == 1) {
        if (dept_coordinator_signature.value === null) {

            dept_coordinator_signature.enabled = false;
            $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetails",
                dataType: 'json',
                success: function(response) {
                    dept_coordinator_signature.value = response.userName;
                    dept_coordinator_date.value = response.SERVER_DATE;

                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
            dept_coordinator_signature.enabled = false;
        }
    } else {
        dept_coordinator_signature.value = "";
       dept_coordinator_date.value ="";
    }
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_dept_coordinator_date_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_dept_coordinator_date_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_HRCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_HRCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToAcademicHR"){
    if (this.value == 1) {
        if (hr_signature.value === null) {

            hr_date.enabled = false;
            $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetails",
                dataType: 'json',
                success: function(myresponse) {
                    hr_signature.value = myresponse.userName;
                    hr_date.value = myresponse.SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
            hr_signature.enabled = false;
        }
    } else {
        hr_signature.value = "";
        hr_date.value = "";
    }
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_hr_signature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_hr_signature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_hr_date_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_hr_date_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled =false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_optionalReviewerCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_optionalReviewerCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (StageIndicator.value == "ToOptionalReviewer") {
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                OptionalReviewerSignature.value = myresopnse.userName;
                OptionalReviewerSignatureDate.value = myresopnse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
    }
} else {
    OptionalReviewerSignature.value = "";
    OptionalReviewerSignatureDate.value = "";
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_OptionalReviewerSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_OptionalReviewerSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_OptionalReviewerSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_OptionalReviewerSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_form_initiatorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_form_initiatorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if (form_initiator_name.value === null) {

        form_initiator_date.enabled = false;
        $.ajax({

            type: 'GET',

            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(response) {
                form_initiator_name.value = response.userName;
                form_initiator_date.value = response.SERVER_DATE;

            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        form_initiator_name.enabled = false;
    }
} else {
    form_initiator_name.value = "";
    form_initiator_date.value = "";
}
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_form_initiator_name_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_form_initiator_name_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_form_initiator_date_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_form_initiator_date_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_HiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_HiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if (CWID.value === null ) {
    showErrorModal("Alert!","Please enter CWID");
      
} else{   
    getPdf();      
}


  

function getPdf() {
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/substitute-faculty-appointment-for-short-duration-form/substitue-faculty-appointment-for-short-duration-form');
            //jsonData.append('fileName', FirstName.value + "_" + LastName.value + "(" + EmplId.value + ")" + "_" + Date.now());
            jsonData.append('fileName', EmpName.value + "(" + CWID.value + ")" + "_" + Date.now());                    
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
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_saveguidedraft1600234692666_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_saveguidedraft1600234692666_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(CWID.value !== null){
 aftiaDescCWID.value = EmpName.value + " "+ CWID.value ; 
  formSavedStatus.value = "1";
}
handleDraftSave(this);


/*if(EmplId.value !== null){
  formSavedStatus.value = "1";
  if(EmplId.value !== null){
  aftiaDescCWID.value = FirstName.value +" "+ LastName.value + " "+ EmplId.value ;
}
  handleDraftSave(this);
}else{
  if(EmplId.value !== null){
  aftiaDescCWID.value = FirstName.value +" "+ LastName.value + " "+ EmplId.value ;
}
    handleDraftSave(this);
}*/
        }
	}
}
/**
 * @function substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_submit1600234699256_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
substitute_faculty_appointment_for_short_duration_form_substitue_faculty_appointment_for_short_duration_form.generated_submit1600234699256_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if(CWID.value === null){
	showErrorModal("Alert !", "Please enter a cwid");
	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].employeeInformation[0].CWID[0]");
}
else if(Range1.value === null && Range2.value === null && Range3.value === null){
	showErrorModal("Alert ", "Please select at least one range");
	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].AdditionalEmploymentRequest[0].RangePanel[0].Range1[0]");
}
else if(CSUFEmpYes.value === null && CSUFEmpNo.value === null){
	showErrorModal("Alert !", "Please mention if currently employed at CSUF?");
	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].AdditionalEmploymentRequest[0].CSUFEmpYes[0]");
}
else{
	aftiaDescCWID.value = EmpName.value + " "+ CWID.value;
	if(DeptUnitNum.value !== null){
	EmailSubject.value = "Test Substitute Faculty Appointment for Short Duration - " + EmpName.value+", "+DeptUnitNum.value;
  }else{
    EmailSubject.value = "Test Substitute Faculty Appointment for Short Duration - " + EmpName.value;
  }
  
	//var testEmail = "julnunez@FULLERTON.EDU";
  var testEmail = "shreyas.manjunatha@thoughtfocus.com";
 
   
  
  	hidden_initiator_email.value = testEmail;
	hidden_chair_email.value = testEmail;
	hidden_dean_email.value = testEmail;
	hidden_faculty_email.value = testEmail;
    OptionalReviewerEmailId.value = testEmail;
	
	guideBridge.submit();
}


        }
	}
}
