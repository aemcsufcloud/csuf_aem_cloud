/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    CWID.enabled = false;
    FirstName.enabled = false;
    LastName.enabled = false;
    Email.enabled = false;
    Date_1.enabled = false;

    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var button = document.getElementsByClassName("rb1");

    modal.style.display = "block";
    span.onclick = function() {

        if ((document.getElementById("button1").checked === false) && (document.getElementById("button2").checked === false) && (document.getElementById("button3").checked === false)) {
            modal.style.display = "block";
            showErrorModal("Alert!", "Please select the type of variation");

        } else {
            modal.style.display = "none";
        }
    };
  
   document.getElementById("button4").onclick = function() {
        InstructionsPanel.visible = false;
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = true;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=false;      
      
        EIPFlag.value=true;
        DORFlag.value="FallSS";
            
        modal.style.display = "none";

        getUserDetails(); //Function to make to $ajax call to get the information
    };

    document.getElementById("button3").onclick = function() {
      debugger;
        EIPCreditSCFPanel.visible = true;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=true;
        Winter_Heading_Text.visible=false;
      
        InstructionsPanel.visible=true;
        EIP_Instructions_Text.visible=true;
        Winter_Instructions_Text.visible=false;
      
        EIPFlag.value=true;
        DORFlag.value="EIP";
      
        modal.style.display = "none";

        getUserDetails(); //Function to make to $ajax call to get the information
    };

    document.getElementById("button2").onclick = function() {
        InstructionsPanel.visible = true;
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = true;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=true;
      
        EIP_Instructions_Text.visible=false;
        Winter_Instructions_Text.visible=true;
      
        EIPFlag.value=true;
        DORFlag.value="Winter";
        
        modal.style.display = "none";

        getUserDetails(); //Function to make to $ajax call to get the information
    };

    document.getElementById("button1").onclick = function() {
        InstructionsPanel.visible = false;
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = true;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=false;      
      
        EIPFlag.value=false;
        DORFlag.value="Fall";
            
        modal.style.display = "none";

        getUserDetails(); //Function to make to $ajax call to get the information
    };

}


//Function to make to $ajax call to get the information

function getUserDetails() {
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

                        url: "/bin/getEvaluationFormData",
                        data: {
                            action: "EMP_DETAILS"
                        },
                        dataType: 'json',
                        success: function(myresopnse) {

                            var modal = document.getElementById('myModal');
                            var span = document.getElementsByClassName("close")[0];

                            if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined) {

                                FirstName.value = myresopnse[0].FIRST_NAME;
                                LastName.value = myresopnse[0].LAST_NAME;
                                InitiatorName.value = FirstName.value + " " + LastName.value;
                                InitiatorUserID.value = myresopnse[0].EMP_USERID;
                                //Email.value = myresopnse[0].EMAILID;
                                //InitiatorEmail.value = myresopnse[0].EMAILID;
                                Email.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
                                InitiatorEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
                                CWID.value = myresopnse[0].EMPLID;
                              
                                DeptID.value = myresopnse[0].DEPTID;
                                FulCollege.value = myresopnse[0].FUL_COLLEGE;

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
                                          
                                            FirstName.value = myresopnse[n].FIRST_NAME;
                                            LastName.value = myresopnse[n].LAST_NAME;
                                            InitiatorName.value = FirstName.value + " " + LastName.value;
                                            InitiatorUserID.value = myresopnse[n].EMP_USERID;
                                            //Email.value = myresopnse[n].EMAILID;
                                            //InitiatorEmail.value = myresopnse[n].EMAILID;
                                            Email.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
                                            InitiatorEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
                                            CWID.value = myresopnse[n].EMPLID;
                              
                                            DeptID.value = myresopnse[n].DEPTID;
                                            FulCollege.value = myresopnse[n].FUL_COLLEGE;
                                          
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
                                    showErrorModal("Alert !", "please select an entry");
                                    modal.style.display = "block";
                                } else {
                                    showErrorModal("Alert !", "please select an entry");
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
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
   
   ChairPanel.visible=true;
   ChairPanel.enabled=true;
   
   if (DORFlag.value == "EIP") {
        EIPCreditSCFPanel.visible = true;
        EIPCreditSCFPanel.enabled = true;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = false;
    
        EIP_Heading_Text.visible=true;
        Winter_Heading_Text.visible=false;
      
        EIP_Instructions_Text.visible=true;
        Winter_Instructions_Text.visible=false;
        
    } else if (DORFlag.value == "Winter") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = true;
        WinterSummerSCF.enabled = true;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=true;
      
        EIP_Instructions_Text.visible=false;
        Winter_Instructions_Text.visible=true;
        
    } else if (DORFlag.value == "Fall") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = true;
        FallSpringSCF.enabled = true;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=false;
      
        InstructionsPanel.visible = false;
      
    } else if (DORFlag.value == "FallSS") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = true;
        FallSpringSSSCF.enabled = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=false;
      
        InstructionsPanel.visible = false;
    }
   
    InitiatorSignPanel.visible = true;
    InitiatorSignPanel.enabled = true;

    ChairSignPanel.visible = false;
    ChairSignPanel.enabled = false;

    DeanSignPanel.visible = false;
    DeanSignPanel.enabled = false;

    SchedulingSignPanel.visible = false;
    SchedulingSignPanel.enabled = false;

    EIPSignPanel.visible = false;
    EIPSignPanel.enabled = false;
}

if (StageIndicator.value == "ToDeptCoordinator") {
   
   ChairPanel.visible=true;
   ChairPanel.enabled=true;
  
  if (DORFlag.value == "EIP") {
        EIPCreditSCFPanel.visible = true;
        EIPCreditSCFPanel.enabled = true;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = false;
    
        EIP_Heading_Text.visible=true;
        Winter_Heading_Text.visible=false;
      
        EIP_Instructions_Text.visible=true;
        Winter_Instructions_Text.visible=false;
        
    } else if (DORFlag.value == "Winter") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = true;
        WinterSummerSCF.enabled = true;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=true;
      
        EIP_Instructions_Text.visible=false;
        Winter_Instructions_Text.visible=true;
        
    } else if (DORFlag.value == "Fall") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = true;
        FallSpringSCF.enabled = true;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=false;
      
        InstructionsPanel.visible = false;
      
    } else if (DORFlag.value == "FallSS") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = true;
        FallSpringSSSCF.enabled = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=false;
      
        InstructionsPanel.visible = false;
    }
    
    InitiatorSignPanel.visible = true;
    InitiatorSignPanel.enabled = true;

    ChairSignPanel.visible = false;
    ChairSignPanel.enabled = false;

    DeanSignPanel.visible = false;
    DeanSignPanel.enabled = false;

    SchedulingSignPanel.visible = false;
    SchedulingSignPanel.enabled = false;

    EIPSignPanel.visible = false;
    EIPSignPanel.enabled = false;
}

if (StageIndicator.value == "ToChair") {
     
   ChairPanel.visible=true;
   ChairPanel.enabled=false;
  
  if (DORFlag.value == "EIP") {
        EIPCreditSCFPanel.visible = true;
        EIPCreditSCFPanel.enabled = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = false;
    
        EIP_Heading_Text.visible=true;
        Winter_Heading_Text.visible=false;
      
        EIP_Instructions_Text.visible=true;
        Winter_Instructions_Text.visible=false;
        
    } else if (DORFlag.value == "Winter") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = true;
        WinterSummerSCF.enabled = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=true;
      
        EIP_Instructions_Text.visible=false;
        Winter_Instructions_Text.visible=true;
        
    } else if (DORFlag.value == "Fall") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = true;
        FallSpringSCF.enabled = false;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=false;
      
        InstructionsPanel.visible = false;
      
    } else if (DORFlag.value == "FallSS") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = true;
        FallSpringSSSCF.enabled = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=false;
      
        InstructionsPanel.visible = false;
    }

    InitiatorSignPanel.visible = true;
    InitiatorSignPanel.enabled = false;

    ChairSignPanel.visible = true;
    ChairSignPanel.enabled = true;

    DeanSignPanel.visible = false;
    DeanSignPanel.enabled = false;

    SchedulingSignPanel.visible = false;
    SchedulingSignPanel.enabled = false;

    EIPSignPanel.visible = false;
    EIPSignPanel.enabled = false;
}

if (StageIndicator.value == "ToDean") {
     
   ChairPanel.visible=true;
   ChairPanel.enabled=false;
  
  if (DORFlag.value == "EIP") {
        EIPCreditSCFPanel.visible = true;
        EIPCreditSCFPanel.enabled = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = false;
    
        EIP_Heading_Text.visible=true;
        Winter_Heading_Text.visible=false;
      
        EIP_Instructions_Text.visible=true;
        Winter_Instructions_Text.visible=false;
        
    } else if (DORFlag.value == "Winter") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = true;
        WinterSummerSCF.enabled = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=true;
      
        EIP_Instructions_Text.visible=false;
        Winter_Instructions_Text.visible=true;
        
    } else if (DORFlag.value == "Fall") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = true;
        FallSpringSCF.enabled = false;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=false;
      
        InstructionsPanel.visible = false;
      
    } else if (DORFlag.value == "FallSS") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = true;
        FallSpringSSSCF.enabled = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=false;
      
        InstructionsPanel.visible = false;
    }

    InitiatorSignPanel.visible = true;
    InitiatorSignPanel.enabled = false;

    ChairSignPanel.visible = true;
    ChairSignPanel.enabled = false;

    DeanSignPanel.visible = true;
    DeanSignPanel.enabled = true;

    SchedulingSignPanel.visible = false;
    SchedulingSignPanel.enabled = false;

    EIPSignPanel.visible = false;
    EIPSignPanel.enabled = false;
}

if (StageIndicator.value == "ToSchedule") {
       
   ChairPanel.visible=true;
   ChairPanel.enabled=false;
  
   if (DORFlag.value == "EIP") {
        EIPCreditSCFPanel.visible = true;
        EIPCreditSCFPanel.enabled = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = false;
    
        EIP_Heading_Text.visible=true;
        Winter_Heading_Text.visible=false;
      
        EIP_Instructions_Text.visible=true;
        Winter_Instructions_Text.visible=false;
        
    } else if (DORFlag.value == "Winter") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = true;
        WinterSummerSCF.enabled = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=true;
      
        EIP_Instructions_Text.visible=false;
        Winter_Instructions_Text.visible=true;
        
    } else if (DORFlag.value == "Fall") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = true;
        FallSpringSCF.enabled = false;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=false;
      
        InstructionsPanel.visible = false;
      
    } else if (DORFlag.value == "FallSS") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = true;
        FallSpringSSSCF.enabled = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=false;
      
        InstructionsPanel.visible = false;
    }
    InitiatorSignPanel.visible = true;
    InitiatorSignPanel.enabled = false;

    ChairSignPanel.visible = true;
    ChairSignPanel.enabled = false;

    DeanSignPanel.visible = true;
    DeanSignPanel.enabled = false;

    SchedulingSignPanel.visible = true;
    SchedulingSignPanel.enabled = true;

    EIPSignPanel.visible = false;
    EIPSignPanel.enabled = false;
}

if (StageIndicator.value == "ToEIP") {
      
   ChairPanel.visible=true;
   ChairPanel.enabled=false;
  
   if (DORFlag.value == "EIP") {
        EIPCreditSCFPanel.visible = true;
        EIPCreditSCFPanel.enabled = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = false;
    
        EIP_Heading_Text.visible=true;
        Winter_Heading_Text.visible=false;
      
        EIP_Instructions_Text.visible=true;
        Winter_Instructions_Text.visible=false;
        
    } else if (DORFlag.value == "Winter") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = true;
        WinterSummerSCF.enabled = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=true;
      
        EIP_Instructions_Text.visible=false;
        Winter_Instructions_Text.visible=true;
        
    } else if (DORFlag.value == "Fall") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = true;
        FallSpringSCF.enabled = false;
        FallSpringSSSCF.visible = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=false;
      
        InstructionsPanel.visible = false;
      
    } else if (DORFlag.value == "FallSS") {
        EIPCreditSCFPanel.visible = false;
        WinterSummerSCF.visible = false;
        FallSpringSCF.visible = false;
        FallSpringSSSCF.visible = true;
        FallSpringSSSCF.enabled = false;
      
        EIP_Heading_Text.visible=false;
        Winter_Heading_Text.visible=false;
      
        InstructionsPanel.visible = false;
    }
    
    InitiatorSignPanel.visible = true;
    InitiatorSignPanel.enabled = false;

    ChairSignPanel.visible = true;
    ChairSignPanel.enabled = false;

    DeanSignPanel.visible = true;
    DeanSignPanel.enabled = false;

    SchedulingSignPanel.visible = false;
    SchedulingSignPanel.enabled = false;

    EIPSignPanel.visible = true;
    EIPSignPanel.enabled = true;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_CaseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_CaseId_init0 = function (scope) {
    with(this) {
        with(scope) {
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
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_CWID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_CWID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_LastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_LastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Date_1_init0 = function (scope) {
    with(this) {
        with(scope) {
             this.enabled = false;
if(StageIndicator.value === null){
	 
      var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
 this.value = d;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Term_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Term_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (this.value == "Fall 2022") {
    TermCode = '2227';
} else if (this.value == "Winter 2022") {
    TermCode = '2221';
} else if (this.value == "Spring 2022") {
    TermCode = '2223';
} else if (this.value == "Summer 2022") {
    TermCode = '2225';
} else if (this.value == "Fall 2023") {
    TermCode = '2237';
} else if (this.value == "Winter 2023") {
    TermCode = '2231';
} else if (this.value == "Spring 2023") {
    TermCode = '2233';
} else if (this.value == "Summer 2023") {
    TermCode = '2235';
} else if (this.value == "Fall 2024") {
    TermCode = '2247';
} else if (this.value == "Winter 2024") {
    TermCode = '2241';
} else if (this.value == "Spring 2024") {
    TermCode = '2243';
} else if (this.value == "Summer 2024") {
    TermCode = '2245';
} 

termCode.value = TermCode;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Remove_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Remove_init0 = function (scope) {
    with(this) {
        with(scope) {
             var panelCount = Row3.instanceManager.instanceCount;
    if (panelCount == "1") {
        Row3.instanceManager.instances[0].Remove.visible = false;
    }
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Remove_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Remove_click0 = function (scope) {
    with(this) {
        with(scope) {
            	
debugger;	
/*var panelCount = Row3.instanceManager.instanceCount;
if( panelCount > 1){
  Row3.instanceManager.removeInstance(Row3.instanceManager.instanceCount - 1);
}*/

var panelCount = Row3.instanceManager.instanceCount;
Row3.instanceManager.removeInstance(Row3.instanceIndex);
if (panelCount == "2") {
    Row3.instanceManager.instances[0].Remove.visible = false;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_CLASS_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_CLASS_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    var classNumber = this.value;
    var strm = termCode.value;
    $.ajax({
        type: 'GET',
        url: "/bin/scheduleChangeServlet",
        data: {
            classNumber: classNumber, 
            strm : strm,
            action: "SECTION_LIST"
        },
        dataType: 'json',

        success: function(sectionInfoResult) {

            if (sectionInfoResult.length !== 0) {

                SUBJ.value = sectionInfoResult[0].CRSE_NAME;
                SEC.value = sectionInfoResult[0].CLASS_SECTION;

            }
        }
    });
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_AddDetails_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_AddDetails_click0 = function (scope) {
    with(this) {
        with(scope) {
            /*if((RequestedAct.value !==null)&& (SUBJ.value !==null)&&(CAT.value !==null) &&(SEC.value !==null)&& (CLASS.value !==null)&&(InstrMode.value !==null)&& (Comp.value !==null)&& (Session.value !==null)&&(ClassUnits.value !==null) &&(StartDate.value !==null)&& (EndDate.value !==null)&&(Days.value !==null) && (StartTime.value !==null)&& (EndTime.value !==null)&&(Location.value !==null) && (Enroll.value !==null)&& (PrimarySec.value !==null)&&(PrimaryClass.value !==null) && (FacultyName.value !==null)&& (FacultyCWID.value !==null)&&(Rank.value !==null) && (AYClass.value !==null)&&(WTUs.value !==null)){
  Row3.instanceManager.addInstance();
}else{
  showErrorModal("Alert !", "Enter the record before adding a new row");
}*/

Row3.instanceManager.addInstance();

if (Row3.instanceManager.instances[0].Remove.visible === false) {
    Row3.instanceManager.instances[0].Remove.visible = true;
}

//Row3.instanceManager.addInstance();
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_WS_Year_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_WS_Year_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (this.value == "Fall 2022") {
    TermCode = '2227';
} else if (this.value == "Winter 2022") {
    TermCode = '2221';
} else if (this.value == "Spring 2022") {
    TermCode = '2223';
} else if (this.value == "Summer 2022") {
    TermCode = '2225';
} else if (this.value == "Fall 2023") {
    TermCode = '2237';
} else if (this.value == "Winter 2023") {
    TermCode = '2231';
} else if (this.value == "Spring 2023") {
    TermCode = '2233';
} else if (this.value == "Summer 2023") {
    TermCode = '2235';
} else if (this.value == "Fall 2024") {
    TermCode = '2247';
} else if (this.value == "Winter 2024") {
    TermCode = '2241';
} else if (this.value == "Spring 2024") {
    TermCode = '2243';
} else if (this.value == "Summer 2024") {
    TermCode = '2245';
} 

termCode.value = TermCode;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_WinterSummerPanelCancelButton_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_WinterSummerPanelCancelButton_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    WinterSummerTableRowTwo.instanceManager.instances[0].WinterSummerPanelCancelButton.visible = false;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_WinterSummerPanelCancelButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_WinterSummerPanelCancelButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = WinterSummerTableRowTwo.instanceManager.instanceCount;
WinterSummerTableRowTwo.instanceManager.removeInstance(WinterSummerTableRowTwo.instanceIndex);
if (panelCount == "2") {
    WinterSummerTableRowTwo.instanceManager.instances[0].WinterSummerPanelCancelButton.visible = false;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_WS_Class_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_WS_Class_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    var classNumber = this.value;
    var strm = termCode.value;
    $.ajax({
        type: 'GET',
        url: "/bin/scheduleChangeServlet",
        data: {
            classNumber: classNumber, 
            strm : strm,
            action: "SECTION_LIST"

        },
        dataType: 'json',

        success: function(sectionInfoResult) {
debugger;
            if (sectionInfoResult.length !== 0) {

                WS_Course.value = sectionInfoResult[0].CRSE_NAME;
                WS_Sec.value = sectionInfoResult[0].CLASS_SECTION;
                WS_Dept.value = sectionInfoResult[0].DEPTNAME;
                WS_Days.value = sectionInfoResult[0].COURSE_DAYS;
                WS_Hours_Start.value = sectionInfoResult[0].MEETING_TIME_START;
                WS_Hours_End.value = sectionInfoResult[0].MEETING_TIME_END;

            }
        }
    });
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_button1683875517244_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_button1683875517244_click0 = function (scope) {
    with(this) {
        with(scope) {
            /*if((WS_RequestedAction.value !==null)&& (WS_SCH.value !==null)&&(WS_Dept.value !==null) &&(WS_Course.value !==null)&& (WS_Sect_Dept.value !==null)&&(WS_Sec.value !==null)&& (WS_Class.value !==null)&& (WS_Instr_Mode.value !==null)&&(WS_Comp.value !==null) &&(WS_Session.value !==null)&& (WS_Days.value !==null)&&(WS_Hours_Start.value !==null) && (WS_Hours_End.value !==null)&& (WS_Room.value !==null)&&(WS_Enroll_Cap.value !==null) && (WS_Wait_List_Cap.value !==null)&& (WS_Consent_Required.value !==null)&&(WS_Class_Notes.value !==null) && (WS_Faculty_Full_Name.value !==null)&& (WS_Faculty_CWID.value !==null)&&(WS_Faculty_Rank.value !==null) && (WS_AY_Class_Code.value !==null)&&(WS_WTUS.value !==null)){
  WinterSummerTableRowTwo.instanceManager.addInstance();
}else{
  showErrorModal("Alert !", "Enter the record before adding a new row");
}*/

WinterSummerTableRowTwo.instanceManager.addInstance();

if (WinterSummerTableRowTwo.instanceManager.instances[0].WinterSummerPanelCancelButton.visible === false) {
    WinterSummerTableRowTwo.instanceManager.instances[0].WinterSummerPanelCancelButton.visible = true;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FS_Year_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FS_Year_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (this.value == "Fall 2022") {
    TermCode = '2227';
} else if (this.value == "Winter 2022") {
    TermCode = '2221';
} else if (this.value == "Spring 2022") {
    TermCode = '2223';
} else if (this.value == "Summer 2022") {
    TermCode = '2225';
} else if (this.value == "Fall 2023") {
    TermCode = '2237';
} else if (this.value == "Winter 2023") {
    TermCode = '2231';
} else if (this.value == "Spring 2023") {
    TermCode = '2233';
} else if (this.value == "Summer 2023") {
    TermCode = '2235';
} else if (this.value == "Fall 2024") {
    TermCode = '2247';
} else if (this.value == "Winter 2024") {
    TermCode = '2241';
} else if (this.value == "Spring 2024") {
    TermCode = '2243';
} else if (this.value == "Summer 2024") {
    TermCode = '2245';
} 

termCode.value = TermCode;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Cancel_Fall_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Cancel_Fall_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
  Fall_Cancel_CB_Section.visible=true;
}
else {
  Fall_Cancel_CB_Section.visible=false;
  
  var rowcountRemoveAll = FS_Cancel_Section_Row_Two.instanceManager.instanceCount;
    if (rowcountRemoveAll !== null) {
        for (var k = 0; k < rowcountRemoveAll; k++) {
            FS_Cancel_Section_Row_Two.instanceManager.removeInstance(FS_Cancel_Section_Row_Two.instanceIndex);
        }
    }
    FS_Cancel_Section_Row_Two.instanceManager.instances[0].FS_Cancel_Section_Class_Number.value = "";
    FS_Cancel_Section_Row_Two.instanceManager.instances[0].FS_Cancel_Section_CourseNo.value = "";
    FS_Cancel_Section_Row_Two.instanceManager.instances[0].FS_Cancel_Section_SectionNo.value = "";
    FS_Cancel_Section_Row_Two.instanceManager.instances[0].FS_Cancel_Section_Dept.value = "";
    FS_Cancel_Section_Row_Two.instanceManager.instances[0].FS_Cancel_Section_Days.value = "";
    FS_Cancel_Section_Row_Two.instanceManager.instances[0].FS_Cancel_Section_Hours_Start.value = "";
    FS_Cancel_Section_Row_Two.instanceManager.instances[0].FS_Cancel_Section_Hours_End.value = "";
    FS_Cancel_Section_Row_Two.instanceManager.instances[0].FS_Cancel_Section_Room.value = "";
  
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Add_Fall_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Add_Fall_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
  Fall_Add_CB_Section.visible=true;
}
else {
  Fall_Add_CB_Section.visible=false;
  
  var rowcountRemoveAll = FS_Add_Section_Row_Two.instanceManager.instanceCount;
    if (rowcountRemoveAll !== null) {
        for (var k = 0; k < rowcountRemoveAll; k++) {
            FS_Add_Section_Row_Two.instanceManager.removeInstance(FS_Add_Section_Row_Two.instanceIndex);
        }
    }
    FS_Add_Section_Row_Two.instanceManager.instances[0].FS_Add_Section_CourseNo.value = "";
    FS_Add_Section_Row_Two.instanceManager.instances[0].FS_Add_Section_SectionNo.value = "";
    FS_Add_Section_Row_Two.instanceManager.instances[0].FS_Add_Section_Dept.value = "";
    FS_Add_Section_Row_Two.instanceManager.instances[0].FS_Add_Section_Component.value = "";
    FS_Add_Section_Row_Two.instanceManager.instances[0].FS_Add_Section_Days.value = "";
    FS_Add_Section_Row_Two.instanceManager.instances[0].FS_Add_Section_Hours_Start.value = "";
    FS_Add_Section_Row_Two.instanceManager.instances[0].FS_Add_Section_Hours_End.value = "";
    FS_Add_Section_Row_Two.instanceManager.instances[0].FS_Add_Section_Room.value = "";
    FS_Add_Section_Row_Two.instanceManager.instances[0].FS_Add_Section_Enrl_Cap.value = "";
    FS_Add_Section_Row_Two.instanceManager.instances[0].FS_Add_Section_Class_Note.value = "";
    FS_Add_Section_Row_Two.instanceManager.instances[0].FS_Add_Section_Final_Exam.value = "";
    FS_Add_Section_Row_Two.instanceManager.instances[0].FS_Add_Section_Faculty_CWID_Name.value = "";
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Change_Fall_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Change_Fall_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
  Fall_Change_CB_Section.visible=true;
}
else {
  Fall_Change_CB_Section.visible=false;
  
   var rowcountRemoveAll = FS_Change_Section_Row_Three.instanceManager.instanceCount;
    if (rowcountRemoveAll !== null) {
        for (var k = 0; k < rowcountRemoveAll; k++) {
            FS_Change_Section_Row_Three.instanceManager.removeInstance(FS_Change_Section_Row_Three.instanceIndex);
        }
    }
    FS_Change_Section_Row_Three.instanceManager.instances[0].FS_Change_Section_Class_Number.value = "";
    FS_Change_Section_Row_Three.instanceManager.instances[0].FS_Change_Section_CourseNo.value = "";
    FS_Change_Section_Row_Three.instanceManager.instances[0].FS_Change_Section_SectionNo.value = "";
    FS_Change_Section_Row_Three.instanceManager.instances[0].FS_Change_Section_Dept.value = "";
    FS_Change_Section_Row_Three.instanceManager.instances[0].FS_Change_Section_Current_MP.value = "";
    FS_Change_Section_Row_Three.instanceManager.instances[0].FS_Change_Section_Action.value = "";
    FS_Change_Section_Row_Three.instanceManager.instances[0].FS_Change_Section_Room.value = "";
    FS_Change_Section_Row_Three.instanceManager.instances[0].FS_Change_Section_Days.value = "";
    FS_Change_Section_Row_Three.instanceManager.instances[0].FS_Change_Section_Hours_Start.value = "";
    FS_Change_Section_Row_Three.instanceManager.instances[0].FS_Change_Section_Hours_End.value = "";
    FS_Change_Section_Row_Three.instanceManager.instances[0].FS_Change_Section_Date.value = "";
    FS_Change_Section_Row_Three.instanceManager.instances[0].FS_Change_Section_Instr_Mode.value = "";
    FS_Change_Section_Row_Three.instanceManager.instances[0].FS_Change_Section_APDB_Mode.value = "";
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringCancelSectionCancelButton_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringCancelSectionCancelButton_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    FS_Cancel_Section_Row_Two.instanceManager.instances[0].FallSpringCancelSectionCancelButton.visible = false;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringCancelSectionCancelButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringCancelSectionCancelButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = FS_Cancel_Section_Row_Two.instanceManager.instanceCount;
FS_Cancel_Section_Row_Two.instanceManager.removeInstance(FS_Cancel_Section_Row_Two.instanceIndex);
if (panelCount == "2") {
    FS_Cancel_Section_Row_Two.instanceManager.instances[0].FallSpringCancelSectionCancelButton.visible = false;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FS_Cancel_Section_Class_Number_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FS_Cancel_Section_Class_Number_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    var classNumber = this.value;
    var strm = termCode.value;
    $.ajax({
        type: 'GET',
        url: "/bin/scheduleChangeServlet",
        data: {
            classNumber: classNumber, 
            strm : strm,
            action: "SECTION_LIST"
        },
        dataType: 'json',

        success: function(sectionInfoResult) {

            if (sectionInfoResult.length !== 0) {

                FS_Cancel_Section_CourseNo.value = sectionInfoResult[0].CRSE_NAME;
                FS_Cancel_Section_SectionNo.value = sectionInfoResult[0].CLASS_SECTION;
                FS_Cancel_Section_Dept.value = sectionInfoResult[0].DEPTNAME;
                FS_Cancel_Section_Days.value = sectionInfoResult[0].COURSE_DAYS;
                FS_Cancel_Section_Hours_Start.value = sectionInfoResult[0].MEETING_TIME_START;
                FS_Cancel_Section_Hours_End.value = sectionInfoResult[0].MEETING_TIME_END;

            }
        }
    });
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FSCancelSectionAddButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FSCancelSectionAddButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            /*if((FS_Cancel_Section_Dept.value !==null)&& (FS_Cancel_Section_CourseNo.value !==null)&&(FS_Cancel_Section_SectionNo.value !==null) &&(FS_Cancel_Section_Class_Number.value !==null)&& (FS_Cancel_Section_Days.value !==null)&&(FS_Cancel_Section_Hours_Start.value !==null)&& (FS_Cancel_Section_Hours_End.value !==null)&& (FS_Cancel_Section_Room.value !==null)){
  FS_Cancel_Section_Row_Two.instanceManager.addInstance();
}else{
  showErrorModal("Alert !", "Enter the record before adding a new row");
}*/

FS_Cancel_Section_Row_Two.instanceManager.addInstance();

if (FS_Cancel_Section_Row_Two.instanceManager.instances[0].FallSpringCancelSectionCancelButton.visible === false) {
    FS_Cancel_Section_Row_Two.instanceManager.instances[0].FallSpringCancelSectionCancelButton.visible = true;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringAddSectionCancelButton_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringAddSectionCancelButton_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    FS_Add_Section_Row_Two.instanceManager.instances[0].FallSpringAddSectionCancelButton.visible = false;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringAddSectionCancelButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringAddSectionCancelButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = FS_Add_Section_Row_Two.instanceManager.instanceCount;
FS_Add_Section_Row_Two.instanceManager.removeInstance(FS_Add_Section_Row_Two.instanceIndex);
if (panelCount == "2") {
    FS_Add_Section_Row_Two.instanceManager.instances[0].FallSpringAddSectionCancelButton.visible = false;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FSAddSectionAddButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FSAddSectionAddButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            /*if((FS_Add_Section_Dept.value !==null)&& (FS_Add_Section_CourseNo.value !==null)&&(FS_Add_Section_SectionNo.value !==null) &&(FS_Add_Section_Component.value !==null)&& (FS_Add_Section_Days.value !==null)&&(FS_Add_Section_Hours_Start.value !==null)&& (FS_Add_Section_Hours_End.value !==null)&& (FS_Add_Section_Room.value !==null)&& (FS_Add_Section_Enrl_Cap.value !==null)&&(FS_Add_Section_Class_Note.value !==null) &&(FS_Add_Section_Final_Exam.value !==null)&& (FS_Add_Section_Faculty_CWID_Name.value !==null)){
  FS_Add_Section_Row_Two.instanceManager.addInstance();
}else{
  showErrorModal("Alert !", "Enter the record before adding a new row");
}*/

FS_Add_Section_Row_Two.instanceManager.addInstance();

if (FS_Add_Section_Row_Two.instanceManager.instances[0].FallSpringAddSectionCancelButton.visible === false) {
    FS_Add_Section_Row_Two.instanceManager.instances[0].FallSpringAddSectionCancelButton.visible = true;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringChangeSectionCancelButton_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringChangeSectionCancelButton_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    FS_Change_Section_Row_Three.instanceManager.instances[0].FallSpringChangeSectionCancelButton.visible = false;
}

        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringChangeSectionCancelButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringChangeSectionCancelButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = FS_Change_Section_Row_Three.instanceManager.instanceCount;
FS_Change_Section_Row_Three.instanceManager.removeInstance(FS_Change_Section_Row_Three.instanceIndex);
if (panelCount == "2") {
    FS_Change_Section_Row_Three.instanceManager.instances[0].FallSpringChangeSectionCancelButton.visible = false;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FS_Change_Section_Class_Number_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FS_Change_Section_Class_Number_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    var classNumber = this.value;
    var strm = termCode.value;
    $.ajax({
        type: 'GET',
        url: "/bin/scheduleChangeServlet",
        data: {
            classNumber: classNumber, 
            strm : strm,
            action: SECTION_LIST
        },
        dataType: 'json',

        success: function(sectionInfoResult) {

            if (sectionInfoResult.length !== 0) {

                FS_Change_Section_CourseNo.value = sectionInfoResult[0].CRSE_NAME;
                FS_Change_Section_SectionNo.value = sectionInfoResult[0].CLASS_SECTION;
                FS_Change_Section_Dept.value = sectionInfoResult[0].DEPTNAME;

            }
        }
    });
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FSChangeSectionAddButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FSChangeSectionAddButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            /*if((FS_Change_Section_Dept.value !==null)&& (FS_Change_Section_CourseNo.value !==null)&&(FS_Change_Section_SectionNo.value !==null) &&(FS_Change_Section_Class_Number.value !==null)&& (FS_Change_Section_Current_MP.value !==null)&&(FS_Change_Section_Action.value !==null)&& (FS_Change_Section_Room.value !==null)&& (FS_Change_Section_Days.value !==null)&& (FS_Change_Section_Hours_Start.value !==null)&&(FS_Change_Section_Hours_End.value !==null) &&(FS_Change_Section_Date.value !==null)&& (FS_Change_Section_Instr_Mode.value !==null)&& (FS_Change_Section_APDB_Mode.value !==null)){
  FS_Change_Section_Row_Three.instanceManager.addInstance();
}else{
  showErrorModal("Alert !", "Enter the record before adding a new row");
}*/

FS_Change_Section_Row_Three.instanceManager.addInstance();

if (FS_Change_Section_Row_Three.instanceManager.instances[0].FallSpringChangeSectionCancelButton.visible === false) {
    FS_Change_Section_Row_Three.instanceManager.instances[0].FallSpringChangeSectionCancelButton.visible = true;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FS_SS_Year_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FS_SS_Year_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (this.value == "Fall 2022") {
    TermCode = '2227';
} else if (this.value == "Winter 2022") {
    TermCode = '2221';
} else if (this.value == "Spring 2022") {
    TermCode = '2223';
} else if (this.value == "Summer 2022") {
    TermCode = '2225';
} else if (this.value == "Fall 2023") {
    TermCode = '2237';
} else if (this.value == "Winter 2023") {
    TermCode = '2231';
} else if (this.value == "Spring 2023") {
    TermCode = '2233';
} else if (this.value == "Summer 2023") {
    TermCode = '2235';
} else if (this.value == "Fall 2024") {
    TermCode = '2247';
} else if (this.value == "Winter 2024") {
    TermCode = '2241';
} else if (this.value == "Spring 2024") {
    TermCode = '2243';
} else if (this.value == "Summer 2024") {
    TermCode = '2245';
} 

termCode.value = TermCode;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Cancel_FallSS_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Cancel_FallSS_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
  Fall_Cancel_CB_Section_SS.visible=true;
}
else {
  Fall_Cancel_CB_Section_SS.visible=false;
  
  var rowcountRemoveAll = FS_Cancel_Section_Row_Two_SS.instanceManager.instanceCount;
    if (rowcountRemoveAll !== null) {
        for (var k = 0; k < rowcountRemoveAll; k++) {
            FS_Cancel_Section_Row_Two_SS.instanceManager.removeInstance(FS_Cancel_Section_Row_Two_SS.instanceIndex);
        }
    }
    FS_Cancel_Section_Row_Two_SS.instanceManager.instances[0].FS_Cancel_Section_Class_Number_SS.value = "";
    FS_Cancel_Section_Row_Two_SS.instanceManager.instances[0].FS_Cancel_Section_CourseNo_SS.value = "";
    FS_Cancel_Section_Row_Two_SS.instanceManager.instances[0].FS_Cancel_Section_SectionNo_SS.value = "";
    FS_Cancel_Section_Row_Two_SS.instanceManager.instances[0].FS_Cancel_Section_Dept_SS.value = "";
    FS_Cancel_Section_Row_Two_SS.instanceManager.instances[0].FS_Cancel_Section_Days_SS.value = "";
    FS_Cancel_Section_Row_Two_SS.instanceManager.instances[0].FS_Cancel_Section_Hours_Start_SS.value = "";
    FS_Cancel_Section_Row_Two_SS.instanceManager.instances[0].FS_Cancel_Section_Hours_End_SS.value = "";
    FS_Cancel_Section_Row_Two_SS.instanceManager.instances[0].FS_Cancel_Section_Room_SS.value = "";
  
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Add_FallSS_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Add_FallSS_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value === "1") {
  Fall_Add_CB_Section_SS.visible=true;
}
else {
  Fall_Add_CB_Section_SS.visible=false;
  
  var rowcountRemoveAll = FS_Add_Section_Row_Two_SS.instanceManager.instanceCount;
    if (rowcountRemoveAll !== null) {
        for (var k = 0; k < rowcountRemoveAll; k++) {
            FS_Add_Section_Row_Two_SS.instanceManager.removeInstance(FS_Add_Section_Row_Two_SS.instanceIndex);
        }
    }
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FS_Add_Section_CourseNo_SS.value = "";
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FS_Add_Section_SectionNo_SS.value = "";
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FS_Add_Section_Dept_SS.value = "";
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FS_Add_Section_Component_SS.value = "";
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FS_Add_Section_Days_SS.value = "";
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FS_Add_Section_Hours_Start_SS.value = "";
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FS_Add_Section_Hours_End_SS.value = "";
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FS_Add_Section_Room_SS.value = "";
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FS_Add_Section_Enrl_Cap_SS.value = "";
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FS_Add_Section_Class_Note_SS.value = "";
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FS_Add_Section_Final_Exam_SS.value = "";
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FS_Add_Section_Faculty_CWID_Name_SS.value = "";
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Change_FallSS_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_Change_FallSS_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (this.value === "1") {
  Fall_Change_CB_Section_SS.visible=true;
}
else {
  Fall_Change_CB_Section_SS.visible=false;
  
   var rowcountRemoveAll = FS_Change_Section_Row_Three_SS.instanceManager.instanceCount;
    if (rowcountRemoveAll !== null) {
        for (var k = 0; k < rowcountRemoveAll; k++) {
            FS_Change_Section_Row_Three_SS.instanceManager.removeInstance(FS_Change_Section_Row_Three_SS.instanceIndex);
        }
    }
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FS_Change_Section_Class_Number_SS.value = "";
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FS_Change_Section_CourseNo_SS.value = "";
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FS_Change_Section_SectionNo_SS.value = "";
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FS_Change_Section_Dept_SS.value = "";
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FS_Change_Section_Current_MP_SS.value = "";
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FS_Change_Section_Action_SS.value = "";
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FS_Change_Section_Room_SS.value = "";
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FS_Change_Section_Days_SS.value = "";
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FS_Change_Section_Hours_Start_SS.value = "";
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FS_Change_Section_Hours_End_SS.value = "";
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FS_Change_Section_Date_SS.value = "";
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FS_Change_Section_Instr_Mode_SS.value = "";
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FS_Change_Section_APDB_Mode_SS.value = "";
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringCancelSectionCancelButton_init00
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringCancelSectionCancelButton_init00 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    FS_Cancel_Section_Row_Two_SS.instanceManager.instances[0].FallSpringCancelSectionCancelButton.visible = false;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringCancelSectionCancelButton_click00
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringCancelSectionCancelButton_click00 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = FS_Cancel_Section_Row_Two_SS.instanceManager.instanceCount;
FS_Cancel_Section_Row_Two_SS.instanceManager.removeInstance(FS_Cancel_Section_Row_Two_SS.instanceIndex);
if (panelCount == "2") {
    FS_Cancel_Section_Row_Two_SS.instanceManager.instances[0].FallSpringCancelSectionCancelButton_SS.visible = false;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FS_Cancel_Section_Class_Number_SS_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FS_Cancel_Section_Class_Number_SS_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    var classNumber = this.value;
    var strm = termCode.value;
    $.ajax({
        type: 'GET',
        url: "/bin/scheduleChangeServlet",
        data: {
            classNumber: classNumber, 
            strm : strm,
            action: "SECTION_LIST"
        },
        dataType: 'json',

        success: function(sectionInfoResult) {

            if (sectionInfoResult.length !== 0) {

                FS_Cancel_Section_CourseNo_SS.value = sectionInfoResult[0].CRSE_NAME;
                FS_Cancel_Section_SectionNo_SS.value = sectionInfoResult[0].CLASS_SECTION;
                FS_Cancel_Section_Dept_SS.value = sectionInfoResult[0].DEPTNAME;
                FS_Cancel_Section_Days_SS.value = sectionInfoResult[0].COURSE_DAYS;
                FS_Cancel_Section_Hours_Start_SS.value = sectionInfoResult[0].MEETING_TIME_START;
                FS_Cancel_Section_Hours_End_SS.value = sectionInfoResult[0].MEETING_TIME_END;

            }
        }
    });
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FSCancelSectionAddButton_SS_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FSCancelSectionAddButton_SS_click0 = function (scope) {
    with(this) {
        with(scope) {
            /*if((FS_Cancel_Section_Dept.value !==null)&& (FS_Cancel_Section_CourseNo.value !==null)&&(FS_Cancel_Section_SectionNo.value !==null) &&(FS_Cancel_Section_Class_Number.value !==null)&& (FS_Cancel_Section_Days.value !==null)&&(FS_Cancel_Section_Hours_Start.value !==null)&& (FS_Cancel_Section_Hours_End.value !==null)&& (FS_Cancel_Section_Room.value !==null)){
  FS_Cancel_Section_Row_Two.instanceManager.addInstance();
}else{
  showErrorModal("Alert !", "Enter the record before adding a new row");
}*/

FS_Cancel_Section_Row_Two_SS.instanceManager.addInstance();

if (FS_Cancel_Section_Row_Two_SS.instanceManager.instances[0].FallSpringCancelSectionCancelButton_SS.visible === false) {
    FS_Cancel_Section_Row_Two_SS.instanceManager.instances[0].FallSpringCancelSectionCancelButton_SS.visible = true;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringAddSectionCancelButton_SS_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringAddSectionCancelButton_SS_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FallSpringAddSectionCancelButton_SS.visible = false;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringAddSectionCancelButton_SS_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringAddSectionCancelButton_SS_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = FS_Add_Section_Row_Two_SS.instanceManager.instanceCount;
FS_Add_Section_Row_Two_SS.instanceManager.removeInstance(FS_Add_Section_Row_Two_SS.instanceIndex);
if (panelCount == "2") {
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FallSpringAddSectionCancelButton_SS.visible = false;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FSAddSectionAddButton_SS_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FSAddSectionAddButton_SS_click0 = function (scope) {
    with(this) {
        with(scope) {
            /*if((FS_Add_Section_Dept.value !==null)&& (FS_Add_Section_CourseNo.value !==null)&&(FS_Add_Section_SectionNo.value !==null) &&(FS_Add_Section_Component.value !==null)&& (FS_Add_Section_Days.value !==null)&&(FS_Add_Section_Hours_Start.value !==null)&& (FS_Add_Section_Hours_End.value !==null)&& (FS_Add_Section_Room.value !==null)&& (FS_Add_Section_Enrl_Cap.value !==null)&&(FS_Add_Section_Class_Note.value !==null) &&(FS_Add_Section_Final_Exam.value !==null)&& (FS_Add_Section_Faculty_CWID_Name.value !==null)){
  FS_Add_Section_Row_Two.instanceManager.addInstance();
}else{
  showErrorModal("Alert !", "Enter the record before adding a new row");
}*/

FS_Add_Section_Row_Two_SS.instanceManager.addInstance();

if (FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FallSpringAddSectionCancelButton.visible === false) {
    FS_Add_Section_Row_Two_SS.instanceManager.instances[0].FallSpringAddSectionCancelButton.visible = true;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringChangeSectionCancelButton_SS_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringChangeSectionCancelButton_SS_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FallSpringChangeSectionCancelButton_SS.visible = false;
}

        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringChangeSectionCancelButton_SS_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FallSpringChangeSectionCancelButton_SS_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = FS_Change_Section_Row_Three_SS.instanceManager.instanceCount;
FS_Change_Section_Row_Three_SS.instanceManager.removeInstance(FS_Change_Section_Row_Three_SS.instanceIndex);
if (panelCount == "2") {
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FallSpringChangeSectionCancelButton_SS.visible = false;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FS_Change_Section_Class_Number_SS_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FS_Change_Section_Class_Number_SS_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    var classNumber = this.value;
    var strm = termCode.value;
    $.ajax({
        type: 'GET',
        url: "/bin/scheduleChangeServlet",
        data: {
            classNumber: classNumber, 
            strm : strm,
            action: SECTION_LIST
        },
        dataType: 'json',

        success: function(sectionInfoResult) {

            if (sectionInfoResult.length !== 0) {

                FS_Change_Section_CourseNo_SS.value = sectionInfoResult[0].CRSE_NAME;
                FS_Change_Section_SectionNo_SS.value = sectionInfoResult[0].CLASS_SECTION;
                FS_Change_Section_Dept_SS.value = sectionInfoResult[0].DEPTNAME;

            }
        }
    });
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FSChangeSectionAddButton_SS_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FSChangeSectionAddButton_SS_click0 = function (scope) {
    with(this) {
        with(scope) {
            /*if((FS_Change_Section_Dept.value !==null)&& (FS_Change_Section_CourseNo.value !==null)&&(FS_Change_Section_SectionNo.value !==null) &&(FS_Change_Section_Class_Number.value !==null)&& (FS_Change_Section_Current_MP.value !==null)&&(FS_Change_Section_Action.value !==null)&& (FS_Change_Section_Room.value !==null)&& (FS_Change_Section_Days.value !==null)&& (FS_Change_Section_Hours_Start.value !==null)&&(FS_Change_Section_Hours_End.value !==null) &&(FS_Change_Section_Date.value !==null)&& (FS_Change_Section_Instr_Mode.value !==null)&& (FS_Change_Section_APDB_Mode.value !==null)){
  FS_Change_Section_Row_Three.instanceManager.addInstance();
}else{
  showErrorModal("Alert !", "Enter the record before adding a new row");
}*/

FS_Change_Section_Row_Three_SS.instanceManager.addInstance();

if (FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FallSpringChangeSectionCancelButton_SS.visible === false) {
    FS_Change_Section_Row_Three_SS.instanceManager.instances[0].FallSpringChangeSectionCancelButton_SS.visible = true;
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_ChairNameDropDown_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_ChairNameDropDown_init0 = function (scope) {
    with(this) {
        with(scope) {
            if ((StageIndicator.value === null) || (StageIndicator.value == "ToDeptCoordinator")) {
	var gifModal = document.getElementById('gifModal');
	gifModal.style.display = "block";

	$.ajax({
		type: 'GET',
		url: "/bin/scheduleChangeServlet",

		data: {
			action: 'CHAIR_LIST'
		},

		dataType: 'json',

		success: function(myresponse) {
			if (myresponse.length >= 1) {
				var progarray = [];
				for (var i = 0; i < myresponse.length; i++) {
					var item = myresponse[i].CHAIR_NAME + " - " + myresponse[i].CHAIR_EMAIL;
					progarray.push(item);
				}
			//	progarray.push("42ISMAPMBA - MBA Business Administration, Marketing Analytics concentration");
				ChairNameDropDown.items = progarray.sort();
				ChairJsonDetails.value = JSON.stringify(myresponse);
			}
			gifModal.style.display = "none";
		}
	});
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_ChairNameDropDown_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_ChairNameDropDown_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    var ChairNameDropDownVal = ChairNameDropDown.value;
    ChairNameDropDownVal = ChairNameDropDownVal.substr(0, ChairNameDropDownVal.indexOf(' - '));
    ChairName.value = ChairNameDropDownVal;
  
    var chairInfo = ChairName.value;
    var chairInfoArray = [];
    var chairActualInfoArray = [];
    var chairDetailsParsedArray = [];
    var chairDetailsListObj = {};

    chairDetailsArray = ChairJsonDetails.value;
    console.log("chairDetailsArray= " + chairDetailsArray);
    chairDetailsParsedArray = JSON.parse(chairDetailsArray);

    for (var s = 0; s < chairDetailsParsedArray.length; s++) {
        chairInfoArray.push(chairDetailsParsedArray[s]);
    }

    for (var chairDetails = 0; chairDetails < chairInfoArray.length; chairDetails++) {
        chairDetailsListObj = chairInfoArray[chairDetails];
        if (chairInfo == chairDetailsListObj["CHAIR_NAME"]) {

            ChairName.value = chairDetailsListObj["CHAIR_NAME"];
            ChairUserID.value = chairDetailsListObj["CHAIR_USERID"];
            //ChairEmail.value = chairDetailsListObj["CHAIR_EMAIL"];                        
            ChairEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
        }
    }
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FacultyCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FacultyCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null || StageIndicator.value == "ToInitiator") {
    if (this.value == 1) {
        var dateString = new Date().toLocaleString("en-US", {
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        InitiatorSignDate.value = d;
        InitiatorSignDate.enabled = false;
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                InitiatorSign.value = FirstName.value + " " + LastName.value;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        InitiatorSign.enabled = false;
    } else {
        InitiatorSign.value = "";
        InitiatorSignDate.value = "";
    }
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_InitiatorSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_InitiatorSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_InitiatorSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_InitiatorSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_ChairCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_ChairCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToChair") {
    if (this.value == 1) {
        var dateString = new Date().toLocaleString("en-US", {
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        ChairSignDate.value = d;
        ChairSignDate.enabled = false;
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                ChairSignature.value = userValue;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        ChairSignature.enabled = false;
    } else {
        ChairSignature.value = "";
        ChairSignDate.value = "";
    }
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_ChairSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_ChairSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_ChairSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_ChairSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_DeptCooCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_DeptCooCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToDean") {
    if (this.value == 1) {
        var dateString = new Date().toLocaleString("en-US", {
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        DeanSignDate.value = d;
        DeanSignDate.enabled = false;
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                DeanSignature.value = userValue;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        DeanSignature.enabled = false;
    } else {
        DeanSignature.value = "";
        DeanSignDate.value = "";
    }
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_DeanSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_DeanSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_DeanSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_DeanSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_DeptCooCB_valueCommit00
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_DeptCooCB_valueCommit00 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToSchedule") {
    if (this.value == 1) {
        var dateString = new Date().toLocaleString("en-US", {
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        ScheduleSignDate.value = d;
        ScheduleSignDate.enabled = false;
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                ScheduleSign.value = userValue;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        ScheduleSign.enabled = false;
    } else {
        ScheduleSign.value = "";
        ScheduleSignDate.value = "";
    }
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_ScheduleSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_ScheduleSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_ScheduleSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_ScheduleSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_DeptCooCB_valueCommit01
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_DeptCooCB_valueCommit01 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToEIP") {
    if (this.value == 1) {
        var dateString = new Date().toLocaleString("en-US", {
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        EIPSignDate.value = d;
        EIPSignDate.enabled = false;
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                EIPSign.value = userValue;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        EIPSign.enabled = false;
    } else {
        EIPSign.value = "";
        EIPSignDate.value = "";
    }
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_EIPSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_EIPSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_EIPSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_EIPSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_DeptID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_DeptID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    var dept_id = this.value;
    $.ajax({
        type: 'GET',
        url: "/bin/getChairDeanInfo",
        data: {
            dept_id: dept_id
        },
        dataType: 'json',

        success: function(chairInfoResult) {

            if (chairInfoResult.length !== 0) {

                ChairUserID.value = chairInfoResult[0].CHAIR_USERID;
                ChairName.value = chairInfoResult[0].CHAIR_NAME;
               // ChairEmail.value = chairInfoResult[0].CHAIR_EMAIL;
                ChairEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";


            }

        }
    });
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FulCollege_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_FulCollege_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getPreRetirementData",
        data: {
            fulCollege: this.value,
            action: "PR_DEAN_DATA"
        },
        dataType: 'json',
        success: function(myresponse) {
            DeanUserID.value = myresponse[0].EMP_USERID;
            DeanName.value = myresponse[0].EMPNAME;
           // DeanEmail.value = myresponse[0].EMP_EMAIL;
            DeanEmail.value = "thamizhvanan.sathiyamoorthy@thoughtfocus.com";
        }
    });
}
        }
	}
}
/**
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/eip-self-support-residence-credit-schedule-change-form/eip-self-support-residence-credit-schedule-change-form');
            jsonData.append('fileName', "TEST");          
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
 * @function eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
eip_self_support_residence_credit_schedule_change_form_eip_self_support_residence_credit_schedule_change_form.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value === null){
  aftiaDescCWID.value = InitiatorName.value+" "+CWID.value;
  EmailSubject.value = "Test - EIP Self Support Residence Credit Schedule Change Form - "+ CWID.value;
}
 InitiatorEmail.value = "yjayaram@fullerton.edu";
 ChairEmail.value = "yjayaram@fullerton.edu";
 DeanEmail.value = "yjayaram@fullerton.edu";
 guideBridge.submit();

 



        }
	}
}
