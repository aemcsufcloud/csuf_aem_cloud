/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;

if (StageIndicator.value === null) {

    GeneralInformationPanel.visible = true;
    GeneralInformationPanel.enabled = true;
  
	InitiatorPanel.visible = true;
	InitiatorPanel.enabled = true;
    
    ResponsibleManagerPanel.visible = false;
    CashHandlingPersonnelOnePanel.visible=false;
    CashHandlingPersonnelTwoPanel.visible=false;
    DirectorSFSPanel.visible = false; 
    ControllerPanel.visible = false; 
   
}

debugger;
if (StageIndicator.value === "ToInitiator"){

    GeneralInformationPanel.visible = true;
    GeneralInformationPanel.enabled = true;
   // AdditionalInformationPanel.visible = true;
    AdditionalInformationPanel.enabled = false;
     
  InitiatorPanel.visible = true;
  InitiatorPanel.enabled = true;

  
 if (ResponsibleManagerCB.value == "1") {
     ResponsibleManagerPanel.visible = true;
     ResponsibleManagerPanel.enabled = false; 
    } else {
      ResponsibleManagerPanel.visible = false;
    } 
 if (CashHandlingPersonnelOneCB.value == "1") {
     CashHandlingPersonnelOnePanel.visible = true;
     CashHandlingPersonnelOnePanel.enabled = false; 
    } else {
      CashHandlingPersonnelOnePanel.visible = false;
    }  
  if (CashHandlingPersonnelTwoCB.value == "1") {
     CashHandlingPersonnelTwoPanel.visible = true;
     CashHandlingPersonnelTwoPanel.enabled = false; 
    } else {
      CashHandlingPersonnelTwoPanel.visible = false;
    }  
  if (DirectorSFSCB.value == "1") {
     DirectorSFSPanel.visible = true;
     DirectorSFSPanel.enabled = false; 
    } else {
      DirectorSFSPanel.visible = false;
    }  
  if (ControllerCB.value == "1") {
     ControllerPanel.visible = true;
     ControllerPanel.enabled = false; 
    } else {
      ControllerPanel.visible = false;
    }    
}

debugger;
if(StageIndicator.value === "ToResponsibleManager") {

    GeneralInformationPanel.visible = true;
    GeneralInformationPanel.enabled = false;
   // AdditionalInformationPanel.visible = true;
    AdditionalInformationPanel.enabled = false;
  
  ResponsibleManagerPanel.visible = true;
  ResponsibleManagerPanel.enabled = true;
  

    if (InitiatorCB.value == "1") {
     InitiatorPanel.visible = true;
     InitiatorPanel.enabled = false; 
    } else {
       InitiatorPanel.visible = false;
    } 
  if (CashHandlingPersonnelOneCB.value == "1") {            
     CashHandlingPersonnelOnePanel.visible = true;
     CashHandlingPersonnelOnePanel.enabled = false; 
    } else {
      CashHandlingPersonnelOnePanel.visible = false;
    }  
  if (CashHandlingPersonnelTwoCB.value == "1") {
     CashHandlingPersonnelTwoPanel.visible = true;
     CashHandlingPersonnelTwoPanel.enabled = false; 
    } else {
      CashHandlingPersonnelTwoPanel.visible = false;
    }  
  if (DirectorSFSCB.value == "1") {
     DirectorSFSPanel.visible = true;
     DirectorSFSPanel.enabled = false; 
    } else {
      DirectorSFSPanel.visible = false;
    }  
  if (ControllerCB.value == "1") {
     ControllerPanel.visible = true;
     ControllerPanel.enabled = false; 
    } else {
      ControllerPanel.visible = false;
    }  
   
}

debugger;

  if (StageIndicator.value == "ToCashHandlingPersonnelOne") {

    GeneralInformationPanel.visible = true;
    GeneralInformationPanel.enabled = false;
    
    //AdditionalInformationPanel.visible = true;
   AdditionalInformationPanel.enabled = false;
     
    CashHandlingPersonnelOnePanel.visible=true;
    CashHandlingPersonnelOnePanel.enabled=true;
   
    if (InitiatorCB.value == "1") {
     InitiatorPanel.visible = true;
     InitiatorPanel.enabled = false; 
    } else {
      InitiatorPanel.visible = false;
    }  
    if (ResponsibleManagerCB.value == "1") {
     ResponsibleManagerPanel.visible = true;
     ResponsibleManagerPanel.enabled = false; 
    } else {
      ResponsibleManagerPanel.visible = false;
    }  
  if (CashHandlingPersonnelTwoCB.value == "1") {
     CashHandlingPersonnelTwoPanel.visible = true;
     CashHandlingPersonnelTwoPanel.enabled = false; 
    } else {
      CashHandlingPersonnelTwoPanel.visible = false;
    }  
  if (DirectorSFSCB.value == "1") {
     DirectorSFSPanel.visible = true;
     DirectorSFSPanel.enabled = false; 
    } else {
      DirectorSFSPanel.visible = false;
    }  
  if (ControllerCB.value == "1") {
     ControllerPanel.visible = true;
     ControllerPanel.enabled = false; 
    } else {
      ControllerPanel.visible = false;
    }    
}

debugger;

  if (StageIndicator.value == "ToCashHandlingPersonnelTwo") {


   GeneralInformationPanel.visible = true;
    GeneralInformationPanel.enabled = false;
   // AdditionalInformationPanel.visible = true;
    AdditionalInformationPanel.enabled = false;
       
    CashHandlingPersonnelTwoPanel.visible=true;
    CashHandlingPersonnelTwoPanel.enabled=true;

     if (InitiatorCB.value == "1") {
     InitiatorPanel.visible = true;
     InitiatorPanel.enabled = false; 
    } else {
      InitiatorPanel.visible = false;
    }  
    
    if (ResponsibleManagerCB.value == "1") {
     ResponsibleManagerPanel.visible = true;
     ResponsibleManagerPanel.enabled = false; 
    } else {
      ResponsibleManagerPanel.visible = false;
    }  
  if (CashHandlingPersonnelOneCB.value == "1") {
     CashHandlingPersonnelOnePanel.visible = true;
     CashHandlingPersonnelOnePanel.enabled = false; 
    } else {
      CashHandlingPersonnelOnePanel.visible = false;
    }  
  if (DirectorSFSCB.value == "1") {
     DirectorSFSPanel.visible = true;
     DirectorSFSPanel.enabled = false; 
    } else {
      DirectorSFSPanel.visible = false;
    }  
  if (ControllerCB.value == "1") {
     ControllerPanel.visible = true;
     ControllerPanel.enabled = false; 
    } else {
      ControllerPanel.visible = false;
    }    
}
debugger;

  if (StageIndicator.value == "ToDirectorSFS") {

    
    GeneralInformationPanel.visible = true;
    GeneralInformationPanel.enabled = false;

    
     DirectorSFSPanel.visible = true; 
     DirectorSFSPanel.enabled = true; 


     if (InitiatorCB.value == "1") {
     InitiatorPanel.visible = true;
     InitiatorPanel.enabled = false; 
    } else {
      InitiatorPanel.visible = false;
    }  
    
     if (ResponsibleManagerCB.value == "1") {
     ResponsibleManagerPanel.visible = true;
     ResponsibleManagerPanel.enabled = false; 
    } else {
      ResponsibleManagerPanel.visible = false;
    }  
  if (CashHandlingPersonnelOneCB.value == "1") {
     CashHandlingPersonnelOnePanel.visible = true;
     CashHandlingPersonnelOnePanel.enabled = false; 
    } else {
      CashHandlingPersonnelOnePanel.visible = false;
    }  
  if (CashHandlingPersonnelTwoCB.value == "1") {
     CashHandlingPersonnelTwoPanel.visible = true;
     CashHandlingPersonnelTwoPanel.enabled = false; 
    } else {
      CashHandlingPersonnelTwoPanel.visible = false;
    }  
  if (ControllerCB.value == "1") {
     ControllerPanel.visible = true;
     ControllerPanel.enabled = false; 
    } else {
      ControllerPanel.visible = false;
    }  
 
}

debugger;

  if (StageIndicator.value == "ToController") {

    
    GeneralInformationPanel.visible = true;
    GeneralInformationPanel.enabled = false;

    
      ControllerPanel.visible = true;
      ControllerPanel.enabled = true;

  debugger;
     if (InitiatorCB.value == "1") {
     InitiatorPanel.visible = true;
     InitiatorPanel.enabled = false; 
    } else {
      InitiatorPanel.visible = false;
    }  
    
      if (ResponsibleManagerCB.value == "1") {
     ResponsibleManagerPanel.visible = true;
     ResponsibleManagerPanel.enabled = false; 
    } else {
      ResponsibleManagerPanel.visible = false;
    }  
  if (CashHandlingPersonnelOneCB.value == "1") {
     CashHandlingPersonnelOnePanel.visible = true;
     CashHandlingPersonnelOnePanel.enabled = false; 
    } else {
      CashHandlingPersonnelOnePanel.visible = false;
    }  
  if (CashHandlingPersonnelTwoCB.value == "1") {
     CashHandlingPersonnelTwoPanel.visible = true;
     CashHandlingPersonnelTwoPanel.enabled = false; 
    } else {
      CashHandlingPersonnelTwoPanel.visible = false;
    }  
 if (DirectorSFSCB.value == "1") {
     DirectorSFSPanel.visible = true;
     DirectorSFSPanel.enabled = false; 
    } else {
      DirectorSFSPanel.visible = false;
    }  
  
}




        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if ((StageIndicator.value === null)){
	//var gifModal = document.getElementById('gifModal');
	//gifModal.style.display = "block";

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
					url: "/bin/getEvaluationFormData",
					data: {
						action: "EMP_DETAILS"
					},
					dataType: 'json',
					success: function(myresopnse) {

						var modal = document.getElementById('myModal');
						var span = document.getElementsByClassName("close")[0];

						if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined) {

							CwidInitiator.value = myresopnse[0].EMPLID;                            
                            Cwid.value = myresopnse[0].EMPLID;                  
							InitiatorFirstName.value = myresopnse[0].FIRST_NAME;
							InitiatorLastName.value = myresopnse[0].LAST_NAME;
                            DeptId.value = myresopnse[0].DEPTID;
                            Department.value = myresopnse[0].DEPTNAME;
                            Division.value = myresopnse[0].DIVSION;                           
							//RequestorEmail.value = myresopnse[0].EMAILID;
                            InitiatorEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                          //  InitiatorEmail.value = "yjayaram@fullerton.edu";
							InitiatorUserId.value = myresopnse[0].EMP_USERID;
							InitiatorName.value = myresopnse[0].FIRST_NAME + " " + myresopnse[0].LAST_NAME;
               				//gifModal.style.display = "none";
							//modal.style.display = "none";
														

						} else if (myresopnse.length > 1) {
							//gifModal.style.display = "none";
							//modal.style.display = "block";
                        }
                    }
                });
            }
        },
    });
}					
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if ((StageIndicator.value === null)){
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
					url: "/bin/getEvaluationFormData",
					data: {
						action: "EMP_DETAILS"
					},
					dataType: 'json',
					success: function(myresopnse) {

						var modal = document.getElementById('myModal');
						var span = document.getElementsByClassName("close")[0];

						if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined) {
                            CwidInitiator.value = myresopnse[0].EMPLID;                            
                            Cwid.value = myresopnse[0].EMPLID;                  
							InitiatorFirstName.value = myresopnse[0].FIRST_NAME;
							InitiatorLastName.value = myresopnse[0].LAST_NAME;
                            DeptId.value = myresopnse[0].DEPTID;
                            Department.value = myresopnse[0].DEPTNAME;
                            Division.value = myresopnse[0].DIVSION;                           
							//RequestorEmail.value = myresopnse[0].EMAILID;
                        //    InitiatorEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                            InitiatorEmail.value = "yjayaram@fullerton.edu";
							InitiatorUserId.value = myresopnse[0].EMP_USERID;
							InitiatorName.value = myresopnse[0].FIRST_NAME + " " + myresopnse[0].LAST_NAME;

                            gifModal.style.display = "none";
                            modal.style.display = "none";

                        } 
                      
                      else if (myresopnse.length > 1) {
                           gifModal.style.display = "none";
                            modal.style.display = "block";


                            var col = [];
                            col.push("EMPLID");
                            col.push("LAST_NAME");
                            col.push("FIRST_NAME");
                            col.push("DEPTID");

                            var table = document.createElement("table");
                            table.id = "tb";
                            var tr = table.insertRow(-1);
                            var headings = ["", "Emp ID", "Last Name", "First Name", "Dept ID"];
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
                            CwidInitiator.value = myresopnse[n].EMPLID;                            
                            Cwid.value = myresopnse[n].EMPLID;                  
							InitiatorFirstName.value = myresopnse[n].FIRST_NAME;
							InitiatorLastName.value = myresopnse[n].LAST_NAME;
                            DeptId.value = myresopnse[n].DEPTID;
                            Department.value = myresopnse[n].DEPTNAME;
                            Division.value = myresopnse[n].DIVSION;                           
							//RequestorEmail.value = myresopnse[n].EMAILID;
                           // InitiatorEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                            InitiatorEmail.value = "yjayaram@fullerton.edu";
							InitiatorUserId.value = myresopnse[n].EMP_USERID;
							InitiatorName.value = myresopnse[n].FIRST_NAME + " " + myresopnse[n].LAST_NAME;
               				//gifModal.style.display = "none";
							//modal.style.display = "none";

                                        rButtonStatus = true;
                                        break;
                                    }
                                }
                                if (rButtonStatus === false) {
                                    //alert("Please select the department");
                                    showErrorModal("Alert !", "Please select the department");
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
                                //alert("Please select the department");
                                showErrorModal("Alert !", "Please select the department");
                                modal.style.display = "block";
                            } else {

                                //alert("Please select the department");
                                showErrorModal("Alert !", "Please select the department");
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
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CaseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CaseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getCaseID",
        dataType: 'json',
        success: function(myresponse) {
            CaseId.value = myresponse.CASEID;
        },
    });
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  this.enabled=true;
} else {
  this.enabled=false;
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Cwid_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Cwid_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;

    if (this.value !== null && CwidInitiator.value !== this.value) {
      debugger;
       // var gifModal = document.getElementById('gifModal');
       // gifModal.style.display = "block";

        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedUserId",
            dataType: 'json',
            success: function(myresponse) {
                if (myresponse.Status == "Success") {
                  debugger;
                    var userValue = myresponse.userId;

                    var cwid = Cwid.value;

                    $.ajax({
                        type: 'GET',

                        url: "/bin/getSubstituteFacultyData",
                        data: {
                            action: "SUB_FACULTY_CWID_LOOKUP",
                            cwid: cwid
                        },

                        dataType: 'json',
                        success: function(myresopnse) {

                            var modal = document.getElementById('myModal');
                            var span = document.getElementsByClassName("close")[0];
                            debugger;
                            if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined) {
 debugger;
                                InitiatorFirstName.value = myresopnse[0].FIRST_NAME;
                                InitiatorLastName.value = myresopnse[0].LAST_NAME;                             
                                DeptId.value = myresopnse[0].DEPTID;
                                Department.value = myresopnse[0].DEPTNAME;                              
                                Division.value = myresopnse[0].DIVSION;
                              //  InitiatorEmail.value = "yjayaram@fullerton.edu";
                                InitiatorEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                              
                               /* getCashHandingData(Division.value);
                                CashHandlingOne.value = "";
                                getCashHandingTwoData(Division.value);
                                CashHandlingTwo.value = "";
								RMNameDD.value = "";
								RMLastName.value = "";*/

                              //  InitiatorFlag.value = true;

                                InitiatorPanel.visible = true;

                                gifModal.style.display = "none";
                                modal.style.display = "none";

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
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Cwid_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Cwid_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
    if (this.value !== null && CwidInitiator.value !== this.value) {
      debugger;
        var gifModal = document.getElementById('gifModal');
        gifModal.style.display = "block";

        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedUserId",
            dataType: 'json',
            success: function(myresponse) {
                if (myresponse.Status == "Success") {
                  debugger;
                    var userValue = myresponse.userId;

                    var cwid = Cwid.value;

                    $.ajax({
                        type: 'GET',

                        url: "/bin/getSubstituteFacultyData",
                        data: {
                            action: "SUB_FACULTY_CWID_LOOKUP",
                            cwid: cwid
                        },

                        dataType: 'json',
                        success: function(myresopnse) {

                            var modal = document.getElementById('myModal');
                            var span = document.getElementsByClassName("close")[0];
                            debugger;
                            if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined) {

                                InitiatorFirstName.value = myresopnse[0].FIRST_NAME;
                                InitiatorLastName.value = myresopnse[0].LAST_NAME;                             
                                DeptId.value = myresopnse[0].DEPTID;
                                Department.value = myresopnse[0].DEPTNAME;                              
                                Division.value = myresopnse[0].DIVSION;
                                InitiatorEmail.value = "yjayaram@fullerton.edu";
                               // InitiatorEmail.value = "shreyas.manjunatha@thoughtfocus.com";

                                InitiatorPanel.visible = true;

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

                                var table = document.createElement("table");
                                table.id = "tb";
                                var tr = table.insertRow(-1);
                                var headings = ["", "Emp ID", "Last Name", "First Name", "Dept Id"];
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
                                            InitiatorFirstName.value = myresopnse[n].FIRST_NAME;
                                InitiatorLastName.value = myresopnse[n].LAST_NAME;                             
                                DeptId.value = myresopnse[n].DEPTID;
                                Department.value = myresopnse[n].DEPTNAME;                              
                                Division.value = myresopnse[n].DIVSION;
                               InitiatorEmail.value = "yjayaram@fullerton.edu";
                              //  InitiatorEmail.value = "shreyas.manjunatha@thoughtfocus.com";

                                InitiatorPanel.visible = true;

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
                                para.innerHTML = "No matching records found";
                                firstName.value = "";
                                lastName.value = "";
                                DisposalNo.value = "";
                                DeptID.value = "";
                                DeptName.value = "";
                                SchoolDivision.value = "";
                                RecordKeeperName.value = "";
                                ApproverName.value = "";
                                
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
}


        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_InitiatorFirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_InitiatorFirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_InitiatorLastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_InitiatorLastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Department_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Department_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Department_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Department_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            //based on division:

debugger; 

  getCashHandingData(Division.value);


debugger; 
function getCashHandingData(division){
	//var gifModal = document.getElementById('gifModal');
	//gifModal.style.display = "block";
debugger; 
	$.ajax({
		type: 'GET',
		url: "/bin/DesignationServlet",

		data: {
			action: 'CASH_HANDLER_DETAILS', 
            division: division
		},

		dataType: 'json',

		success: function(myresponse) {
          debugger; 
			if (myresponse.length >= 1) {
				var progarray = [];
              debugger; 
				for (var i = 0; i < myresponse.length; i++) {
					var item = myresponse[i].EMP_NAME + " - " + myresponse[i].EMAILID;
					progarray.push(item);
				}
              CashHandlingOne.items = progarray.sort();
              CashOneJSONDetails.value =  JSON.stringify(myresponse);
			}
		//	gifModal.style.display = "none";
		}
	});
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Department_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Department_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            //based on division:

debugger; 

  
  getCashHandingTwoData(Division.value);

debugger; 
function getCashHandingTwoData(division){
//	var gifModal = document.getElementById('gifModal');
//	gifModal.style.display = "block";
debugger; 
	$.ajax({
		type: 'GET',
		url: "/bin/DesignationServlet",

		data: {
			action: 'CASH_HANDLER_DETAILS', 
            division: division
		},

		dataType: 'json',

		success: function(myresponse) {
          debugger; 
			if (myresponse.length >= 1) {
				var progarray = [];
              debugger; 
				for (var i = 0; i < myresponse.length; i++) {
					var item = myresponse[i].EMP_NAME + " - " + myresponse[i].EMAILID;
					progarray.push(item);
				}
				CashHandlingTwo.items = progarray.sort();
				CashTwoJSONDetails.value = JSON.stringify(myresponse);
			}
			gifModal.style.display = "none";
		}
	});
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Location_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Location_init0 = function (scope) {
    with(this) {
        with(scope) {
            if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  this.enabled=true;
} else {
  this.enabled=false;
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_InitiatedDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_InitiatedDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            if((StageIndicator.value === null) || (StageIndicator.value === "ToResponsibleManager")){
 this.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Purpose_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_Purpose_init0 = function (scope) {
    with(this) {
        with(scope) {
            if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  this.enabled=true;
} else {
  this.enabled=false;
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_RMLastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_RMLastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  this.enabled=true;
} else {
  this.enabled=false;
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_RMLastName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_RMLastName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
debugger;

    var lastNameResult = [];
if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
   if (this.value !== null) {
      debugger;
        $.ajax({
            type: 'GET',
            url: "/bin/DesignationServlet",
            data: {
                action: "RESPONSIBLE_MANAGER_DETAILS",
                division: Division.value,
                lastName: this.value
            },
            dataType: 'json',
            success: function(managerResult) {
              debugger;
                if (managerResult.length !== 0) {
  debugger;
                    for (var i = 0; i < managerResult.length; i++) {
                        var item = managerResult[i].FIRST_NAME + " " + managerResult[i].LAST_NAME;  
                        ResponsibleManagerName.value = managerResult[i].FIRST_NAME + " " + managerResult[i].LAST_NAME;
                        ResponsibleManagerFirstName = managerResult[i].FIRST_NAME;
                        ResponsibleManagerLastName = managerResult[i].LAST_NAME;
                        //ResponsibleManagerEmail.value = managerResult[i].EMAILID; 
                      //  ResponsibleManagerEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                      // ResponsibleManagerEmail.value = "yjayaram@fullerton.edu";
                       // var uid = managerResult[i].USERID;
                        var uid = managerResult[i].EMAILID;
                        var idItem = i + 1;
                        //var jbcode = item.text;
                        lastNameResult.push(item + " - " + uid);
                    }
                    RMNameDD.value = "";
                    RMNameDD.items = lastNameResult;
  debugger;
                } else {
                    showErrorModal("Alert!", "No matching names found");
                    RMNameDD.items = [];
                   // RMNameDD.value = "";
                    RMNameDD.value = null;
                  ResponsibleManagerEmail.value = null;
                    ResponsibleManagerName.value = "";
                    ResponsibleManagerUserId.value = "";                 
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_RMNameDD_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_RMNameDD_init0 = function (scope) {
    with(this) {
        with(scope) {
            if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  this.enabled=true;
} else {
  this.enabled=false;
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_RMNameDD_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_RMNameDD_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            ////part2


debugger;

    var managerName = this.value;
    var managerEmplId;
  var managerEmailId;
  var managerUserId;
  
debugger;
if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  if (managerName !== "") {  
    debugger;
 	 managerUserName = managerName.substr(0, managerName.indexOf(' - '));
        ResponsibleManagerName.value = managerUserName;
        ManagerName.value = managerUserName;
     managerEmailId = managerName.substr(managerName.indexOf(' - ')+2, managerName.length-1);
     managerUserId =  managerEmailId.substr(1, managerEmailId.indexOf('@')-1);
     ResponsibleManagerUserId.value = managerUserId;
   RMEmail.value = "yjayaram@fullerton.edu";
   // RMEmail.value = "yjayaram@fullerton.edu";
    ResponsibleManagerEmail.value = "yjayaram@fullerton.edu";
  }

}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ResponsibleManagerEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ResponsibleManagerEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashOneLN_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashOneLN_init0 = function (scope) {
    with(this) {
        with(scope) {
            if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  this.enabled=true;
} else {
  this.enabled=false;
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashOneLN_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashOneLN_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
debugger;

    var lastNameResultOne = [];
if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
   if (this.value !== null) {
      debugger;
        $.ajax({
            type: 'GET',
            url: "/bin/DesignationServlet",
            data: {
                action: "CASH_HANDLER_DETAILS",
                division: Division.value ,
                lastName: this.value
            },
            dataType: 'json',
            success: function(managerResultOne) {
              debugger;
                if (managerResultOne.length !== 0) {
  debugger;
                    for (var i = 0; i < managerResultOne.length; i++) {
                        var item1 = managerResultOne[i].FIRST_NAME + " " + managerResultOne[i].LAST_NAME;  
                        CashHandlingPersonnelOneName.value = managerResultOne[i].FIRST_NAME + " " + managerResultOne[i].LAST_NAME;
                       CashHandlingPersonnelOneFirstName = managerResultOne[i].FIRST_NAME;
                       CashHandlingPersonnelOneLastName = managerResultOne[i].LAST_NAME;
                        //CashHandlingPersonnelOneEmail.value = managerResultOne[i].EMAILID; 
                      //  CashHandlingPersonnelOneEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                      //CashHandlingPersonnelOneEmail.value = "yjayaram@fullerton.edu";
                       // var uid = managerResultOne[i].USERID;
                        var uid1 = managerResultOne[i].EMAILID;
                        var idItem1 = i + 1;
                        //var jbcode = item.text;
                        lastNameResultOne.push(item1 + " - " + uid1);
                    }
                    CashOneDD.value = "";
                    CashOneDD.items = lastNameResultOne;
  debugger;
                } else {
                    showErrorModal("Alert!", "No matching names found");
                    CashOneDD.items = [];
                    //CashOneDD.value = "";
                   CashOneDD.value = null;
                  CashHandlingPersonnelOneEmail.value = null;
                    CashHandlingPersonnelOneName.value = "";
                    CashHandlingPersonnelOneUserId.value = "";
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashOneDD_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashOneDD_init0 = function (scope) {
    with(this) {
        with(scope) {
            /*if(RMLastName.value !== null){
  this.enabled = true;
}
else{
    this.enabled = false;
}*/
if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  this.enabled=true;
} else {
  this.enabled=false;
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashOneDD_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashOneDD_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            ////part2


debugger;

    var managerNameOne = this.value;
    var managerEmplIdOne;
  var managerEmailIdOne;
  var managerUserIdOne;
  debugger;
if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  if (managerNameOne !== "") {    
    debugger;
 	 managerUserNameOne = managerNameOne.substr(0, managerNameOne.indexOf(' - '));
        CashHandlingPersonnelOneName.value = managerUserNameOne;
     managerEmailIdOne = managerNameOne.substr(managerNameOne.indexOf(' - ')+2, managerNameOne.length-1);
     managerUserIdOne =  managerEmailIdOne.substr(1, managerEmailIdOne.indexOf('@')-1);
     CashHandlingPersonnelOneUserId.value = managerUserIdOne;
    CashOneEmail.value = "yjayaram@fullerton.edu";
   // CashOneEmail.value = "yjayaram@fullerton.edu";
     CashHandlingPersonnelOneEmail.value = "yjayaram@fullerton.edu";
  }
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelOneEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelOneEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashTwoLN_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashTwoLN_init0 = function (scope) {
    with(this) {
        with(scope) {
            if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  this.enabled=true;
} else {
  this.enabled=false;
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashTwoLN_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashTwoLN_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
debugger;

    var lastNameResultTwo = [];
if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
   if (this.value !== null) {
      debugger;
        $.ajax({
            type: 'GET',
            url: "/bin/DesignationServlet",
            data: {
                action: "CASH_HANDLER_DETAILS",
                division: Division.value,
                lastName: this.value
            },
            dataType: 'json',
            success: function(managerResultTwo) {
              debugger;
                if (managerResultTwo.length !== 0) {
  debugger;
                    for (var i = 0; i < managerResultTwo.length; i++) {
                        var item2 = managerResultTwo[i].FIRST_NAME + " " + managerResultTwo[i].LAST_NAME;  
                        CashHandlingPersonnelTwoName.value = managerResultTwo[i].FIRST_NAME + " " + managerResultTwo[i].LAST_NAME;
                        CashHandlingPersonnelTwoFirstName = managerResultTwo[i].FIRST_NAME;
                        CashHandlingPersonnelTwoLastName =  managerResultTwo[i].LAST_NAME;
                        //CashHandlingPersonnelTwoEmail.value = managerResultTwo[i].EMAILID; 
                   //    CashHandlingPersonnelTwoEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                     // CashHandlingPersonnelTwoEmail.value = "yjayaram@fullerton.edu";
                        //var uid = managerResultTwo[i].USERID;
                        var uid2 = managerResultTwo[i].EMAILID;
                        var idItem2 = i + 1;
                        //var jbcode = item.text;
                        lastNameResultTwo.push(item2 + " - " + uid2);
                    }
                    CashTwoDD.value = "";
                    CashTwoDD.items = lastNameResultTwo;
  debugger;
                } else {
                    showErrorModal("Alert!", "No matching names found");
                    CashTwoDD.items = [];
                   // CashTwoDD.value = "";
                   CashTwoDD.value = null;
                   CashHandlingPersonnelTwoEmail.value = null;
                    CashHandlingPersonnelTwoName.value = "";
                    CashHandlingPersonnelTwoUserId.value = "";
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashTwoDD_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashTwoDD_init0 = function (scope) {
    with(this) {
        with(scope) {
            if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  this.enabled=true;
} else {
  this.enabled=false;
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashTwoDD_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashTwoDD_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            ////part2


debugger;

    var managerNameTwo = this.value;
    var managerEmplIdTwo;
  var managerEmailIdTwo;
  var managerUserIdTwo;
  debugger;
if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  if (managerNameTwo !== "") {    
    debugger;
 	 managerUserNameTwo = managerNameTwo.substr(0, managerNameTwo.indexOf(' - '));
        CashHandlingPersonnelTwoName.value = managerUserNameTwo;
     managerEmailIdTwo = managerNameTwo.substr(managerNameTwo.indexOf(' - ')+2, managerNameTwo.length-1);
     managerUserIdTwo =  managerEmailIdTwo.substr(1, managerEmailIdTwo.indexOf('@')-1);
     CashHandlingPersonnelTwoUserId.value = managerUserIdTwo;
    CashTwoEmail.value = "yjayaram@fullerton.edum";
    // CashTwoEmail.value = "yjayaram@fullerton.edu";
      CashHandlingPersonnelTwoEmail.value = "yjayaram@fullerton.edu";
  }
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelTwoEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelTwoEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_AdditionalInformationPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_AdditionalInformationPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToDirectorSFS" || StageIndicator.value == "ToController") {
  this.visible = true;
  this.enabled = true;
}
else{
     this.visible = false;
     this.enabled = false;
  
  }
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_InitiatorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_InitiatorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if ((StageIndicator.value == "ToInitiator") || (StageIndicator.value === null)) {
        if (InitiatorSign.value === null) {           
            InitiatorSignDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  InitiatorSign.value = userValue;
                  InitiatorSignDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    InitiatorSign.value = "";
    InitiatorSignDate.value = "";
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_InitiatorSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_InitiatorSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_InitiatorSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_InitiatorSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ResponsibleManagerCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ResponsibleManagerCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if ((StageIndicator.value == "ToResponsibleManager") || (StageIndicator.value === null)) {
        if (ResponsibleManagerSign.value === null) {           
            ResponsibleManagerSignDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  ResponsibleManagerSign.value = userValue;
                  ResponsibleManagerSignDate.value = myresopnse[0].SERVER_DATE;
                  RUpdate.value = myresopnse[0].EMP_USERID;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    ResponsibleManagerSign.value = "";
    ResponsibleManagerSignDate.value = "";
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ResponsibleManagerSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ResponsibleManagerSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ResponsibleManagerSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ResponsibleManagerSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelOneCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelOneCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if ((StageIndicator.value == "ToCashHandlingPersonnelOne") || (StageIndicator.value === null)) {
        if (CashHandlingPersonnelOneSign.value === null) {           
            CashHandlingPersonnelOneSignDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  CashHandlingPersonnelOneSign.value = userValue;
                  CashHandlingPersonnelOneSignDate.value = myresopnse[0].SERVER_DATE;
                  ConeUpdate.value = myresopnse[0].EMP_USERID;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    CashHandlingPersonnelOneSign.value = "";
    CashHandlingPersonnelOneSignDate.value = "";
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelOneSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelOneSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelOneSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelOneSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelTwoCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelTwoCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if ((StageIndicator.value == "ToCashHandlingPersonnelTwo") || (StageIndicator.value === null)) {
        if (CashHandlingPersonnelTwoSign.value === null) {           
            CashHandlingPersonnelTwoSignDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  CashHandlingPersonnelTwoSign.value = userValue;
                  CashHandlingPersonnelTwoSignDate.value = myresopnse[0].SERVER_DATE;
                  CtwoUpdate.value = myresopnse[0].EMP_USERID;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    CashHandlingPersonnelTwoSign.value = "";
    CashHandlingPersonnelTwoSignDate.value = "";
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelTwoSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelTwoSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelTwoSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingPersonnelTwoSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_DirectorSFSCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_DirectorSFSCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if ((StageIndicator.value == "ToDirectorSFS") || (StageIndicator.value === null)) {
        if (DirectorSFSSign.value === null) {           
            DirectorSFSSignDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  DirectorSFSName.value = userValue;
                  DirectorSFSSign.value = userValue;
                  DirectorSFSSignDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    DirectorSFSName.value = "";
    DirectorSFSSign.value = "";
    DirectorSFSSignDate.value = "";
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_DirectorSFSSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_DirectorSFSSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_DirectorSFSSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_DirectorSFSSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ControllerCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ControllerCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if ((StageIndicator.value == "ToController") || (StageIndicator.value === null)) {
        if (ControllerSign.value === null) {           
            ControllerSignDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  ControllerName.value = userValue;
                  ControllerSign.value = userValue;
                  ControllerSignDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    ControllerName.value = "";
    ControllerSign.value = "";
    ControllerSignDate.value = "";
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ControllerSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ControllerSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ControllerSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ControllerSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_HiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_HiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingOne_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingOne_init0 = function (scope) {
    with(this) {
        with(scope) {
            if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  this.enabled=true;
} else {
  this.enabled=false;
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingOne_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingOne_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;

    var CashOneNameDropDownVal = this.value;
    CashOneNameDropDownVal = CashOneNameDropDownVal.substr(0, CashOneNameDropDownVal.indexOf(' - '));

   CashHandlingPersonnelOneName.value = CashOneNameDropDownVal;
  

   var chairInfo = CashHandlingPersonnelOneName.value;
    var chairInfoArray = [];
    var chairActualInfoArray = [];
    var chairDetailsParsedArray = [];
    var chairDetailsListObj = {};

    chairDetailsArray = CashOneJSONDetails.value;
    console.log("chairDetailsArray= " + chairDetailsArray);
    chairDetailsParsedArray = JSON.parse(chairDetailsArray);
debugger;
    for (var s = 0; s < chairDetailsParsedArray.length; s++) {
        chairInfoArray.push(chairDetailsParsedArray[s]);
    }
debugger;
    for (var chairDetails = 0; chairDetails < chairInfoArray.length; chairDetails++) {
        chairDetailsListObj = chairInfoArray[chairDetails];
      debugger;
        if (chairInfo == chairDetailsListObj["EMP_NAME"]) {
            CashHandlingPersonnelOneName.value = chairDetailsListObj["EMP_NAME"];
            CashHandlingPersonnelOneUserId.value = chairDetailsListObj["EMP_USERID"];
            CashHandlingPersonnelOneEmail.value = "shreyas.manjunatha@thoughtfocus.com";
 
        }
    }

            
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingTwo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingTwo_init0 = function (scope) {
    with(this) {
        with(scope) {
            if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
  this.enabled=true;
} else {
  this.enabled=false;
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingTwo_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CashHandlingTwo_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;

    var ChairNameDropDownVal = this.value;
    ChairNameDropDownVal = ChairNameDropDownVal.substr(0, ChairNameDropDownVal.indexOf(' - '));

   CashHandlingPersonnelTwoName.value = ChairNameDropDownVal;
  

   var chairInfo = CashHandlingPersonnelTwoName.value;
    var chairInfoArray = [];
    var chairActualInfoArray = [];
    var chairDetailsParsedArray = [];
    var chairDetailsListObj = {};

    chairDetailsArray = CashTwoJSONDetails.value;
    console.log("chairDetailsArray= " + chairDetailsArray);
    chairDetailsParsedArray = JSON.parse(chairDetailsArray);

    for (var s = 0; s < chairDetailsParsedArray.length; s++) {
        chairInfoArray.push(chairDetailsParsedArray[s]);
    }

    for (var chairDetails = 0; chairDetails < chairInfoArray.length; chairDetails++) {
        chairDetailsListObj = chairInfoArray[chairDetails];
        if (chairInfo == chairDetailsListObj["EMP_NAME"]) {
       
            CashHandlingPersonnelTwoName.value = chairDetailsListObj["EMP_NAME"];
            CashHandlingPersonnelTwoUserId.value = chairDetailsListObj["EMP_USERID"];
            CashHandlingPersonnelTwoEmail.value = "shreyas.manjunatha@thoughtfocus.com";
 
        }
    }

            
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_RUpdate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_RUpdate_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToResponsibleManager"){
    if(this.value !== ResponsibleManagerUserId.value){
  ResponsibleManagerCB.value = null;
}
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ConeUpdate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_ConeUpdate_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToCashHandlingPersonnelOne"){
    if(this.value !== CashHandlingPersonnelOneUserId.value){
  CashHandlingPersonnelOneCB.value = null;
}
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CtwoUpdate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_CtwoUpdate_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToCashHandlingPersonnelTwo"){
    if(this.value !== CashHandlingPersonnelTwoUserId.value){
  CashHandlingPersonnelTwoCB.value = null;
}
}
        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            getPdf();

function getPdf() {
    //console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, ' and'));
            jsonData.append('formPath', '/content/forms/af/designation-as-university-cash-collection-point/designation-as-university-cash-collection-point');   
            jsonData.append('fileName', "Designation As University Cash Collection Point" + "-" + CwidInitiator.value + "-" + InitiatorName.value );
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
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_saveguidedraft1629881233615_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_saveguidedraft1629881233615_click0 = function (scope) {
    with(this) {
        with(scope) {
            
aftiaDescCWID.value = FirstName.value + " " + LastName.value + " "+EmplId.value ;
handleDraftSave(this);


        }
	}
}
/**
 * @function designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_submit1600234699256_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
designation_as_university_cash_collection_point_designation_as_university_cash_collection_point.generated_submit1600234699256_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
aftiaDescCWID.value = InitiatorName.value + " " + CwidInitiator.value;
  EmailSubject.value = "Test - Designation As University Cash Collection Point - " + InitiatorName.value +  "-" + CwidInitiator.value;
  guideBridge.submit();




        }
	}
}
