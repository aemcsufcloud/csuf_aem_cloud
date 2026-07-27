/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
    $.ajax({
        type: 'GET',
        url: "/bin/getPositionActionForm",
        data: {
            action: "GET_ALL_FUNDING_DATA",
        },
        dataType: 'json',
        success: function(response) {
            if (response.length >= 1) {
                var deptArray = [];
                var fundCodeArray = [];
                var programArray = [];
                var classArray = [];
                var projectArray = [];
                var accountArray = [];
              debugger;
                for (var a = 0; a < response[0].DEPT.length; a++) {
                    deptArray.push(response[0].DEPT[a].DEPTID);
                }
                for (var b = 0; b < response[0].FUND.length; b++) {
                    fundCodeArray.push(response[0].FUND[b].fund_code);
                }
                for (var c = 0; c < response[0].PROGRAM.length; c++) {
                    programArray.push(response[0].PROGRAM[c].program);
                }
                for (var d = 0; d < response[0].CLASS_CODE.length; d++) {
                    classArray.push(response[0].CLASS_CODE[d].CLASS);
                }
                for (var e = 0; e < response[0].PROJECT.length; e++) {
                    projectArray.push(response[0].PROJECT[e].PROJECT);
                }
                for (var f = 0; f < response[0].ACCOUNT.length; f++) {
                    accountArray.push(response[0].ACCOUNT[f].ACCOUNT);
                }

                DeptDataArray.value = JSON.stringify(deptArray);
                FundCodeDataArray.value = JSON.stringify(fundCodeArray);
                ProgramDataArray.value = JSON.stringify(programArray);
                ClassDataArray.value = JSON.stringify(classArray);
                ProjectDataArray.value = JSON.stringify(projectArray);
                AccountDataArray.value = JSON.stringify(accountArray);

                Row1.Dept.items = deptArray;
                Row1.FundCode.items = fundCodeArray;
                Row1.Program.items = programArray;
                Row1.Class.items= classArray;
                Row1.Project.items = projectArray;
                Row1.Account.items = accountArray;

            } else {
                //showErrorModal("Alert!", "Funding data not available");
            }
        },
        error: function(error) {
           // alert("error block=" + error);
        }
    });
}

        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            //new - enabled
debugger;

if (StageIndicator.value === null){
	generateCSV.visible = false;
  submitButton.visible = true;
    RequestorInformationPanel.visible = true;
    RequestorInformationPanel.enabled = true;
 
    CreditInformationPanel.visible = true;
    CreditInformationPanel.enabled = true;

SupportingDocumentsPanel.visible = true;
  SignatureACK.visible = true;
  
    InitiatorPanel.visible = true;
    InitiatorPanel.enabled = true;
  
    ApproverPanel.visible = false;    
    ASFRPanel.visible = false; 
}


if (StageIndicator.value === "ToInitiator"){
	generateCSV.visible = false;
    RequestorInformationPanel.visible = true;
   // RequestorInformationPanel.enabled = true;
    BillLineInformationPanel.visible = true;
   // BillLineInformationPanel.enabled = true;
    BillToInformationPanel.visible = true;
   // BillToInformationPanel.enabled = true;
  
    CreditInformationPanel.visible = true;
   // CreditInformationPanel.enabled = true;

    SupportingDocumentsPanel.visible = false;
  SignatureACK.visible = true;
  //  SupportingDocumentsPanel.enabled = false;

  
    InitiatorPanel.visible = true;
    InitiatorPanel.enabled = true;
  
    approverDD.visible = true;
    approverDD.enabled = true;
    ApproversDepartment.visible = true;
    ApproversDepartment.enabled = true;
    CustomerID.enabled = true; 
    CustomerName.enabled = true; 
    CustomerContact.enabled = true; 
    CustomerAddress1.enabled = true; 
    CustomerCity.enabled = true; 
    CustomerState.enabled = true; 
    CustomerEmail.enabled = true; 
    CustomerAddress2.enabled = true; 
    Zipcode.enabled = true; 
    Fax.enabled = true;
  

  if (ApproverCB.value == "1") {
     ApproverPanel.visible = true;
     ApproverPanel.enabled = false; 
    
    } else {
     ApproverPanel.visible = false;
    }  
  if (ASFRCB.value == "1") {
     ASFRPanel.visible = true;
     ASFRPanel.enabled = false; 
    } else {
     ASFRPanel.visible = false;
    }  
}



if (StageIndicator.value === "ToApprover") {
  debugger;
	generateCSV.visible = false;
    RequestorInformationPanel.visible = true;
    RequestorInformationPanel.enabled = false;
    BillLineInformationPanel.visible = true;
    BillLineInformationPanel.enabled = false;
    BillToInformationPanel.visible = true;
    BillToInformationPanel.enabled = false;
    Add.visible = false;
    Remove.visible = false;
  
    CreditInformationPanel.visible = true;
    CreditInformationPanel.enabled = false;
   ApproversDepartment.visible = true;
  ApproversDepartment.enabled = false;

  
    SupportingDocumentsPanel.visible = false;
    SupportingDocumentsPanel.enabled = false;
  
    ApproverPanel.visible = true;
    ApproverPanel.enabled = true;

  
  if (InitiatorCB.value == "1") {
     InitiatorPanel.visible = true;
     InitiatorPanel.enabled = false; 
    } else {
     InitiatorPanel.visible = false;
    }  
  if (ASFRCB.value == "1") {
     ASFRPanel.visible = true;
     ASFRPanel.enabled = false; 
    } else {
     ASFRPanel.visible = false;
    }  
}



if (StageIndicator.value === "ToASFR") {
 	generateCSV.visible = false;
    RequestorInformationPanel.visible = true;
    RequestorInformationPanel.enabled = true;

    BillLineInformationPanel.visible = true;
    BillLineInformationPanel.enabled = true;
    BillToInformationPanel.visible = true;
    BillToInformationPanel.enabled = true;
  
    Add.visible = true;
    Remove.visible = true;
    approverDD.visible = true;
    approverDD.enabled = true;
   ApproversDepartment.visible = true;
  ApproversDepartment.enabled = true;
    CreditInformationPanel.visible = true;
    CreditInformationPanel.enabled = true;

    CustomerID.enabled = true; 
    CustomerName.enabled = true; 
    CustomerContact.enabled = true; 
    CustomerAddress1.enabled = true; 
    CustomerCity.enabled = true; 
    CustomerState.enabled = true; 
    CustomerEmail.enabled = true; 
    CustomerAddress2.enabled = true; 
    Zipcode.enabled = true; 
    Fax.enabled = true;
  
  
  
    SupportingDocumentsPanel.visible = false;
    SupportingDocumentsPanel.enabled = false;
  
    ASFRPanel.visible = true;
    ASFRPanel.enabled = true;  
  
   if (InitiatorCB.value == "1") {
     InitiatorPanel.visible = true;
     InitiatorPanel.enabled = false; 
    } else {
     InitiatorPanel.visible = false;
    }  
  if (ApproverCB.value == "1") {
     ApproverPanel.visible = true;
     ApproverPanel.enabled = false; 
    } else {
     ApproverPanel.visible = false;
    }   
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
guideBridge.on("validationComplete", function(event, payload) {
debugger; 

if (StageIndicator.value == "ToInitiator") {

var rowCount = Row1.instanceManager.instanceCount;
debugger;
for (var i = 0; i < rowCount; i++) {
    amount1 = parseFloat(Row1.instanceManager.instances[i].CreditAmount.value);
debugger;
    if (!isNaN(amount1)) {
        amount2 += amount1;
    }
}

Total.value = amount2; 
TotalBillAmount.value = Total.value;
console.log(TotalBillAmount);


	}
});
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_guideRootPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_guideRootPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    CWID.enabled = false;
    RequestorDepartment.enabled = false;
    RequestorFirstName.enabled = false;
    RequestorLastName.enabled = false;
    HiddenPanel.RequestorEmail.enabled = false;
    RequestorPhoneExt.enabled = false;
    RequestDate.enabled = false;
    ReasonForRequest.enabled = false;
   OptionalEmailAddress1.enabled = false;
   OptionalEmailAddress2.enabled = false;
   OptionalEmailAddress3.enabled = false;
    ServiceDateFrom.enabled = false;
    ServiceDateTo.enabled = false;

    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var button = document.getElementsByClassName("rb1");

    modal.style.display = "block";
	debugger;
    span.onclick = function() {

        if ((document.getElementById("button1").checked === false) && (document.getElementById("button2").checked === false)) {
           modal.style.display = "block";
            showErrorModal("Alert!", "Answer Before Proceeding to RFI/IFT Form");

        } else {
            modal.style.display = "none";
        }
    };
debugger;
    document.getElementById("button1").onclick = function() {
       RequestorInformationPanel.visible = true;
        BillToInformationPanel.visible = false;
        BillLineInformationPanel.visible = false;
        CreditInformationPanel.visible = false;
        SupportingDocumentsPanel.visible = false;
        Add.visible = false;
        Remove.visible = false;
        generateDOR.visible = false;
        submitButton.visible = false;   
        SectionPanel.visible = true;
        generateCSV.visible = false;     
        RequestorInformationPanel.enabled = false;
        BillLineInformationPanel.enabled = false;
        CreditInformationPanel.enabled = false;
        SupportingDocumentsPanel.enabled = false;
        SignatureACK.visible = false;  
        SignatureACK.enabled = false;
        SectionPanel.enabled = false;
        submitButton.enabled = false;     
        RFIIFTType.value = "1";      
        modal.style.display = "none"; 
    };
debugger;
    document.getElementById("button2").onclick = function() {
        RequestorInformationPanel.enabled = true;
        CreditInformationPanel.enabled = true;
        SupportingDocumentsPanel.enabled = true;
        SignatureACK.enabled = true;
        CWID.enabled = true;
        ReasonForRequest.enabled = true;
         OptionalEmailAddress1.enabled = true;
   OptionalEmailAddress2.enabled = true;
   OptionalEmailAddress3.enabled = true;
        ServiceDateTo.enabled = true;
        ServiceDateFrom.enabled = true;
        RequestorPhoneExt.enabled = true;
        RFIIFTType.value = "2";      
        generateCSV.visible = false;
        Add.visible = true;
        Remove.visible = true;
        modal.style.display = "none";
       
debugger;
        getRFIDetails(); //Function to make to $ajax call to get the information
    };
}
debugger;
function getRFIDetails() {
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

							cwid_initiator.value = myresopnse[0].EMPLID;                            
                            CWID.value = myresopnse[0].EMPLID;                  
							RequestorFirstName.value = myresopnse[0].FIRST_NAME;
							RequestorLastName.value = myresopnse[0].LAST_NAME;
                            RequestorDepartmentID.value = myresopnse[0].DEPTID;
                            RequestorDepartment.value = myresopnse[0].DEPTNAME;
                            RequestorDivision.value = myresopnse[0].DIVSION;                           
						 	//RequestorEmail.value = myresopnse[0].EMAILID;
                          //  RequestorEmail.value = "yjayaram@fullerton.edu";
                            RequestorEmail.value = "asfr@fullerton.edu";
                          //  RequestorEmail.value = "csufaemform@gmail.com";
							//RequestorUserId.value = myresopnse[0].EMPLID;
							RequestorUserId.value = myresopnse[0].EMP_USERID;
							RequestorName.value = RequestorFirstName.value + " " + RequestorLastName.value;	                                                   						
							gifModal.style.display = "none";
							modal.style.display = "none";

						}  else if (myresopnse.length > 1) {
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
                            cwid_initiator.value = myresopnse[n].EMPLID;                            
                            CWID.value = myresopnse[n].EMPLID;                  
							RequestorFirstName.value = myresopnse[n].FIRST_NAME;
							RequestorLastName.value = myresopnse[n].LAST_NAME;
                            RequestorDepartmentID.value = myresopnse[n].DEPTID;
                            RequestorDepartment.value = myresopnse[n].DEPTNAME;
                            RequestorDivision.value = myresopnse[n].DIVSION;                           
						 	//RequestorEmail.value = myresopnse[n].EMAILID;
                            RequestorEmail.value = "yjayaram@fullerton.edu";
                        //    RequestorEmail.value = "asfr@fullerton.edu";
                          // RequestorEmail.value = "csufaemform@gmail.com";
							//RequestorUserId.value = myresopnse[n].EMPLID;
							RequestorUserId.value = myresopnse[n].EMP_USERID;
							RequestorName.value = RequestorFirstName.value + " " + RequestorLastName.value;	                                                   						

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
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_guideRootPanel_init4
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_guideRootPanel_init4 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator"){
CreditInformationPanel.visible = false;
SupportingDocumentsPanel.visible =false;
SignatureACK.visible=false;
  submitButton.visible = false;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_guideRootPanel_init5
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_guideRootPanel_init5 = function (scope) {
    with(this) {
        with(scope) {
            // ---- getRFIDetails function ----
function getRFIDetails() {
    if (StageIndicator.value === null) {
        var gifModal = document.getElementById('gifModal');
        gifModal.style.display = "block";

        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedUserId",
            dataType: 'json',
            success: function(myresponse) {
                if (myresponse.Status == "Success") {
                    workflow_initiator.value = myresponse.userId;

                    $.ajax({
                        type: 'GET',
                        url: "/bin/getEvaluationFormData",
                        data: { action: "EMP_DETAILS" },
                        dataType: 'json',
                        success: function(myresopnse) {
                            gifModal.style.display = "none";

                            if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined) {

                                cwid_initiator.value = myresopnse[0].EMPLID;
                                CWID.value = myresopnse[0].EMPLID;
                                RequestorFirstName.value = myresopnse[0].FIRST_NAME;
                                RequestorLastName.value = myresopnse[0].LAST_NAME;
                                RequestorDepartmentID.value = myresopnse[0].DEPTID;
                                RequestorDepartment.value = myresopnse[0].DEPTNAME;
                                RequestorDivision.value = myresopnse[0].DIVSION;
                              //  RequestorEmail.value = "csufaemform@gmail.com";
                              RequestorEmail.value = "DL-ASFR-ETR@fullerton.edu";
                                RequestorUserId.value = myresopnse[0].EMP_USERID;
                                RequestorName.value = RequestorFirstName.value + " " + RequestorLastName.value;

                                CWID.enabled = true;
                                RequestorDepartment.enabled = true;
                                RequestorFirstName.enabled = true;
                                RequestorLastName.enabled = true;
                                HiddenPanel.RequestorEmail.enabled = true;
                                RequestorPhoneExt.enabled = true;
                                RequestDate.enabled = true;
                                ReasonForRequest.enabled = true;
                                OptionalEmailAddress1.enabled = true;
                                OptionalEmailAddress2.enabled = true;
                                OptionalEmailAddress3.enabled = true;
                                ServiceDateFrom.enabled = true;
                                ServiceDateTo.enabled = true;

                            } else if (myresopnse.length > 1) {
                                // handle multiple records

                            } else {
                                showErrorModal("Alert!", "No matching records found");
                            }
                        },
                        error: function(err) {
                            gifModal.style.display = "none";
                            alert("Error fetching employee details: " + JSON.stringify(err));
                        }
                    }); // end inner $.ajax

                }
            },
            error: function(err) {
                alert("Error fetching user ID: " + JSON.stringify(err));
            }
        }); // end outer $.ajax
    }
} // end getRFIDetails


// ---- Main init block ----
if (StageIndicator.value === null) {
    CWID.enabled = false;
    RequestorDepartment.enabled = false;
    RequestorFirstName.enabled = false;
    RequestorLastName.enabled = false;
    HiddenPanel.RequestorEmail.enabled = false;
    RequestorPhoneExt.enabled = false;
    RequestDate.enabled = false;
    ReasonForRequest.enabled = false;
    OptionalEmailAddress1.enabled = false;
    OptionalEmailAddress2.enabled = false;
    OptionalEmailAddress3.enabled = false;
    ServiceDateFrom.enabled = false;
    ServiceDateTo.enabled = false;
   SupportingDocumentsPanel.visible =true;
  submitButton.visible = true;
  SignatureACK.visible = true;
  CreditInformationPanel.visible = true;

    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    span.onclick = function() {
        if ((document.getElementById("button1").checked === false) &&
            (document.getElementById("button2").checked === false)) {
            modal.style.display = "block";
            showErrorModal("Alert!", "READ BEFORE PROCEEDING to RFI/IFT Form");
        } else {
            modal.style.display = "none";
        }
    };

    // button1 (RFI) - only popup logic
   // button1 (RFI) - only popup logic
document.getElementById("button1").onclick = function() {
    modal.style.display = "none";
    getRFIDetails(); // ← add this
};

    // button2 (IFT) - only popup logic
    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        getRFIDetails();
    };
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getCaseID",
        dataType: 'json',
        success: function(myresponse) {
            caseId.value = myresponse.CASEID;
        },
    });
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerSelectionRB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerSelectionRB_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
  this.visible = true;
  this.enabled = true;
}
else{
  this.visible = true;
  this.enabled = false;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerSelectionRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerSelectionRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToApprover" || StageIndicator.value === "ToASFR"){
debugger;
if(this.value === "0"){
  BillToInformationPanel.visible = true;
  BillLineInformationPanel.visible = true;
  Invoicenumber.visible = true;
  IFTNumber.visible = false;
  InvoiceType.visible = true;
  InvoiceType.mandatory = true;
  ExpenseType.visible = true; 
  OtherExpenseType.visible = true;
  CustomerAddress1.visible = true; 
  CustomerAddress2.visible = true; 
  CustomerCity.visible = true; 
  CustomerState.visible = true; 
  Zipcode.visible = true; 
  Fax.visible = true; 
  InvoiceHandling.visible = true;
  CreditInformationPanel.visible = true;
SupportingDocumentsPanel.visible =true;
SignatureACK.visible=true;
submitButton.visible = true;
}
  
 else{
    BillToInformationPanel.visible = true;
  BillLineInformationPanel.visible = true;
  Invoicenumber.visible = false;
     IFTNumber.visible = true;
 InvoiceType.visible = true;
   InvoiceType.mandatory = false;
  ExpenseType.visible = false; 
  OtherExpenseType.visible = false;
  CustomerAddress1.visible = false; 
  CustomerAddress2.visible = false; 
  CustomerCity.visible = false; 
  CustomerState.visible = false; 
  Zipcode.visible = false; 
  Fax.visible = false; 
  InvoiceHandling.visible = false; 
     CreditInformationPanel.visible = true;
SupportingDocumentsPanel.visible =true;
SignatureACK.visible=true;
   submitButton.visible = true;
}
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerSelectionRB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerSelectionRB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToApprover" || StageIndicator.value === "ToASFR"){
if(this.value === "0"){
  RFISelectionRB.visible = true;
  RFISelectionRB.mandatory = true;
  CSUCampusChancellorOffice.visible = false; 
  PO.visible = false;
  CreditInformationPanel.visible = true;
  CreditInformationPanel.enabled = true;


}else{
  CSUCampusChancellorOffice.visible = true; 
  PO.visible = false; 
  RFISelectionRB.visible = false;
  CSUCampusChancellorOffice.mandatory = true; 
  CreditInformationPanel.visible = true;
  CreditInformationPanel.enabled = true;

}
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RFISelectionRB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RFISelectionRB_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
if(CustomerSelectionRB.value ==="0"){
  this.visible = true;  
}
else 
  {
      this.visible = false;  
  }
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RFISelectionRB_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RFISelectionRB_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
  this.visible = true;
  this.enabled = true;
}
else{
  this.visible = true;
  this.enabled = false;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RFISelectionRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RFISelectionRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
if(this.value === "0"){
  pNote.visible = true;
 PONumber.mandatory = true;
  gridPONumber.mandatory = true;

}else{
 PONumber.mandatory = false;
  gridPONumber.mandatory = false;
    pNote.visible = false;
}
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RFISelectionRB_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RFISelectionRB_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
if(RFISelectionRB.value === "0"){
  pNote.visible = true;  
}
else 
  {
      pNote.visible = false;  
  }
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_PO_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_PO_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
if(RFISelectionRB.value === "0"){
  this.visible = true;  
}
else 
  {
      this.visible = false;  
  }
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_PO_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_PO_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
  debugger;
if(CustomerSelectionRB.value === "0" && RFISelectionRB.value === "0"){
PONumber.value = PO.value;
}
else 
  {
     this.value = " ";
    PONumber.value = PO.value;
    
  }
}







        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CSUCampusChancellorOffice_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CSUCampusChancellorOffice_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToApprover"|| StageIndicator.value === "ToASFR"){
if(CustomerSelectionRB.value === "1"){
  this.visible = true;  
}
else 
  {
      this.visible = false;  
  }
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CWID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CWID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if ((StageIndicator.value === null || StageIndicator.value == "ToInitiator" || StageIndicator.value == "ToASFR")) {
	if (this.value !== null && cwid_initiator.value !== this.value) {
		//var gifModal = document.getElementById('gifModal');
		//gifModal.style.display = "block";

		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedUserId",
			dataType: 'json',
			success: function(myresponse) {
				if (myresponse.Status == "Success") {
					var userValue = myresponse.userId;
					//workflow_initiator.value = userValue;
					var cwid = CWID.value;

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

							if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined) {

								RequestorFirstName.value = myresopnse[0].FIRST_NAME;
                                RequestorLastName.value = myresopnse[0].LAST_NAME;
                                RequestorName.value = RequestorFirstName.value + " " + RequestorLastName.value ;
                                RequestorUserId.value = myresopnse[0].EMP_USERID;
                               // RequestorEmail.value = myresopnse[0].EMAILID;	
                               //RequestorEmail.value = "yjayaram@fullerton.edu";
                                RequestorEmail.value = "DL-ASFR-ETR@fullerton.edu";
								RequestorDepartmentID.value = myresopnse[0].DEPTID;
                                RequestorDivision.value = myresopnse[0].DIVSION;						
								RequestorDepartment.value = myresopnse[0].DEPTNAME;								
								InitiatorFlag.value = true;
                                InitiatorPanel.visible = true;

							} else if (myresopnse.length > 1) {
								gifModal.style.display = "none";
								modal.style.display = "block";
								
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
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorDepartment_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorDepartment_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorDepartment_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorDepartment_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
  getApproverData(RequestorDepartmentID.value);


debugger; 
function getApproverData(deptId){
	//var gifModal = document.getElementById('gifModal');
	//gifModal.style.display = "block";
debugger; 
	$.ajax({
		type: 'GET',
		url: "/bin/RFIServlet",

		data: {
			action: 'APPROVER_DETAILS',
            deptId: deptId
		},

		dataType: 'json',

		success: function(myresponse) {
          debugger; 
			if (myresponse.length >= 1) {
				var progarray = [];
              debugger; 
				for (var i = 0; i < myresponse.length; i++) {
					//var item1 = myresponse[i].FIRST_NAME  + " " + myresponse[i].LAST_NAME + " - " + myresponse[i].EMAIL_ADDR;
					var item1 = myresponse[i].NAME + " - " + myresponse[i].EMAIL_ADDR;
					progarray.push(item1);
				}
              approverDD.items = progarray.sort();
              ApproverJSONDetails.value =  JSON.stringify(myresponse);
			}
		//	gifModal.style.display = "none";
		}
	});
}
}
            
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorDepartment_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorDepartment_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
    
    getApproverDeptData();
 debugger;   
    function getApproverDeptData() {
        $.ajax({
            type: 'GET',
            url: "/bin/RFIServlet",
            data: {
                action: 'APPROVER_DEPT_DETAILS'
            },
            dataType: 'json',
            success: function(myresponse) {
                if (myresponse.length >= 1) {
                    var progarray1 = [];
                    for (var i = 0; i < myresponse.length; i++) {
                        var item2 = myresponse[i].DEPTID + " - " + myresponse[i].DEPT_DESC;
                        progarray1.push(item2);
                    }
                  debugger;
                    ApproversDepartment.items = progarray1.sort();
                    ApproverDeptJSONDetails.value = JSON.stringify(myresponse);
                }
            },
            error: function(err) {
                console.log("Error fetching approver dept data: " + err);
            }
        });
    }
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorFirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorFirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorLastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorLastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null || StageIndicator.value == "ToInitiator") {
    this.enabled = false;
    var dateString = new Date().toLocaleString("en-US", {

        timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
    }).replace(/[^ -~]/g, '');
    var dateObject = new Date(dateString);
    var curyear = dateObject.getFullYear();
    var curyearMonth = dateObject.getMonth() + 1;
    var curyearDay = dateObject.getDate();
    var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
    Date_1.value = d;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestDate_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestDate_init1 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToApprover" || StageIndicator.value === "ToASFR"){
	  this.enabled = false;

  this.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Address_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Address_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var input = this.rawValue;

var emails = input.split(/[,;\s]+/)
  .map(function(email) { return email.trim(); })
  .filter(function(email) { return email !== ''; });

this.rawValue = emails.join(';');
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ApproversDepartment_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ApproversDepartment_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null) {
  this.visible = true;
  this.enabled = true;
}


        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ApproversDepartment_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ApproversDepartment_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
    var DeptNameDropDownVal = this.value;
    DeptNameDropDownVal = DeptNameDropDownVal.substr(0, DeptNameDropDownVal.indexOf(' - '));
    AppDept.value = DeptNameDropDownVal;
  
    var DepartmentInfo = AppDept.value;
    var DepartmentArray = [];
    var DepartmentActualInfoArray = [];
    var DepartmentDetailsParsedArray = [];
    var DepartmentDetailsListObj = {};
    var deptDetailsArray = ApproverDeptJSONDetails.value;
    console.log("deptDetailsArray= " + deptDetailsArray);
    DepartmentDetailsParsedArray = JSON.parse(deptDetailsArray);
    
    for (var d = 0; d < DepartmentDetailsParsedArray.length; d++) {
        DepartmentArray.push(DepartmentDetailsParsedArray[d]);
    }

    for (var deptDetails = 0; deptDetails < DepartmentArray.length; deptDetails++) {
        DepartmentDetailsListObj = DepartmentArray[deptDetails];
        if (DepartmentInfo == DepartmentDetailsListObj["DEPTID"]) {
          debugger;
            AppDept.value = DepartmentDetailsListObj["DEPTID"] + " " + DepartmentDetailsListObj["DEPT_DESC"];
        }
    }
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ApproversDepartment_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ApproversDepartment_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR") {
    var selectedDept = this.value;
    var deptId = selectedDept.substr(0, selectedDept.indexOf(' - '));

    // fetch if dept changed OR if ApproverJSONDetails is empty
    if (deptId !== PreviousDeptId.value || ApproverJSONDetails.value === "" || ApproverJSONDetails.value === null) {
        PreviousDeptId.value = deptId;

        approverDD.items = [];
        approverDD.value = null;
        ApproverJSONDetails.value = "";

        getApproverData(deptId);
    }

    function getApproverData(deptId) {
        $.ajax({
            type: 'GET',
            url: "/bin/RFIServlet",
            data: {
                action: 'APPROVER_DETAILS',
                deptId: deptId
            },
            dataType: 'json',
            success: function(myresponse) {
                if (myresponse.length >= 1) {
                    var progarray = [];
                    for (var i = 0; i < myresponse.length; i++) {
                        var item1 = myresponse[i].NAME + " - " + myresponse[i].EMAIL_ADDR;
                        progarray.push(item1);
                    }
                    approverDD.items = progarray.sort();
                    ApproverJSONDetails.value = JSON.stringify(myresponse);
                }
            },
            error: function(err) {
                console.log("Error fetching approver data: " + err);
            }
        });
    }
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_approverDD_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_approverDD_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR") {
  this.visible = true;
  this.enabled = true;
}

else{
    this.enabled = false;

}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_approverDD_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_approverDD_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
    var ChairNameDropDownVal = this.value;
    ChairNameDropDownVal = ChairNameDropDownVal.substr(0, ChairNameDropDownVal.indexOf(' - '));
    ApproverName.value = ChairNameDropDownVal;
  
    var chairInfo = ApproverName.value;
    var chairInfoArray = [];
    var chairActualInfoArray = [];
    var chairDetailsParsedArray = [];
    var chairDetailsListObj = {};

    chairDetailsArray = ApproverJSONDetails.value;
    console.log("chairDetailsArray= " + chairDetailsArray);
    chairDetailsParsedArray = JSON.parse(chairDetailsArray);

    for (var s = 0; s < chairDetailsParsedArray.length; s++) {
        chairInfoArray.push(chairDetailsParsedArray[s]);
    }
debugger;
    for (var chairDetails = 0; chairDetails < chairInfoArray.length; chairDetails++) {

        chairDetailsListObj = chairInfoArray[chairDetails];
        if (chairInfo == chairDetailsListObj["NAME"]) {
debugger;
            ApproverName.value = chairDetailsListObj["FIRST_NAME"] + " " + chairDetailsListObj["LAST_NAME"];          
			//ApproverFirstName.value = chairDetailsListObj["FIRST_NAME"];
           // ApproverLastName.value = chairDetailsListObj["LAST_NAME"];
           ApproverUserId.value = chairDetailsListObj["USERID"];                   
       //  ApproverEmail.value = "csufaemform@gmail.com";
          // ApproverEmail.value = "asfr@fullerton.edu";
          ApproverEmail.value = "yjayaram@fullerton.edu";
 
        }
    }
}

            
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_approverDD_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_approverDD_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR") {

    var selectedApprover = this.value;
    var approverName = selectedApprover.substr(0, selectedApprover.indexOf(' - '));

    // ← ADDED: clear previous approver details first
    ApproverName.value = "";
    ApproverUserId.value = "";
    ApproverEmail.value = "";

    var approverDetailsParsedArray = JSON.parse(ApproverJSONDetails.value);

    for (var i = 0; i < approverDetailsParsedArray.length; i++) {
        var obj = approverDetailsParsedArray[i];
        if (approverName == obj["NAME"]) {
            ApproverName.value = obj["FIRST_NAME"] + " " + obj["LAST_NAME"];
            ApproverUserId.value = obj["USERID"];
           // ApproverEmail.value = "csufaemform@gmail.com";
          ApproverEmail.value = "DL-ASFR-ETR@fullerton.edu";
        }
    }
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ServiceDateFrom_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ServiceDateFrom_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR")){
  this.enabled = true;

}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ServiceDateTo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ServiceDateTo_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR")){
  this.enabled = true;

}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_FiscalYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_FiscalYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR")){
  this.enabled = true;

}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_BillToInformationPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_BillToInformationPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_customerDetails_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_customerDetails_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"  ){
  this.enabled = true;
}
else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_customerDetails_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_customerDetails_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
if(customerDetails.value == "0"){
                        CustomerID.enabled = true;
  						  CustomerID.mandatory = true;
                         CustomerName.enabled = false;
						 CustomerAddress1.enabled =true;
						 CustomerAddress2.enabled = true;		
						 CustomerCity.enabled = true;			
						 CustomerState.enabled = true;
						 Zipcode.enabled = true;		
					     CustomerContact.enabled = true;
						 Fax.enabled = true;
                         CustomerEmail.enabled = true;
}
  /*else if(customerDetails.value == "1"){
     CustomerID.enabled = false;
  						  CustomerID.value = null;
                         CustomerName.value = null;
						 CustomerAddress1.value = null;
						 CustomerAddress2.value = null;	
						 CustomerCity.value = null;			
						 CustomerState.value = null;
						 Zipcode.value = null;		
					     CustomerContact.value = null;
						 Fax.value = null;
                         CustomerEmail.value = null;
  }*/
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_customerDetails_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_customerDetails_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
if(customerDetails.value == "1"){
                         CustomerID.enabled = true;
                         CustomerID.mandatory = false;
                         CustomerName.enabled = true;
						 CustomerAddress1.enabled =true;
						 CustomerAddress2.enabled = true;		
						 CustomerCity.enabled = true;			
						 CustomerState.enabled = true;
						 Zipcode.enabled = true;		
					     CustomerContact.enabled = true;
						 Fax.enabled = true;
                         CustomerEmail.enabled = true;
}
  /*else if(customerDetails.value == "0"){
     CustomerID.enabled = true;
  						  CustomerID.value = null;
                         CustomerName.value = null;
						 CustomerAddress1.value = null;
						 CustomerAddress2.value = null;	
						 CustomerCity.value = null;			
						 CustomerState.value = null;
						 Zipcode.value = null;		
					     CustomerContact.value = null;
						 Fax.value = null;
                         CustomerEmail.value = null;
  }*/
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;

        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            //existing new
if( (StageIndicator.value === null && ApproverPanel.visible === false) || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR" ){
debugger;
var custID = this.value; 
debugger;
$.ajax({
    type: 'GET',
    url: "/bin/RFIServlet",
    data: {
        action: "EXISTING_CUSTOMER_DETAILS",
        custId: custID
    },
    dataType: 'json',
    success: function(response) {
       var name1 = "";
       var name2 = "";
       var nameShort = "";
       var setID = "";
       var sinceDt = "";
       var address1 = "";
	   var address2 = "";
       //var address3 = "";
       var city = "";
	   var state = "";
       var postal = "";
	   var phone = "";
	   var fax = "";
       var email = "";
       var country = "";
       //var webUrl = "";
       // var modal = document.getElementById('myModal');
       // var span = document.getElementsByClassName("close")[0];
debugger;   
         if (response.length === 1) {
    setID = (response[0].SETID || "").trim();
    name1 = (response[0].NAME1 || "").trim();
    name2 = (response[0].NAME2 || "").trim();
    nameShort = (response[0].NAMESHORT || "").trim();
    address1 = (response[0].ADDRESS1 || "").trim(); 
    address2 = (response[0].ADDRESS2 || "").trim();
    city = (response[0].CITY || "").trim();
    country = (response[0].COUNTRY || "").trim();
    state = (response[0].STATE || "").trim();
    postal = (response[0].POSTAL || "").trim();
    phone = (response[0].PHONE || "").trim();
    email = (response[0].WEB_URL || "").trim(); 
    fax = (response[0].FAX || "").trim(); 
    sinceDt = (response[0].SINCE_DT || "").trim();
                         CustomerName.value = name1;
           				 Name2.value = name2;
           				 NameShort.value = nameShort;
           				 SetID.value = setID;
						 CustomerAddress1.value = address1;
						 CustomerAddress2.value = address2;						
						 CustomerCity.value = city;						
						 CustomerState.value = state;
						 Zipcode.value = postal;						
					    // CustomerContact.value = phone;
           				 CustomerEmail.value = email;
						 Fax.value = phone;
           				 Country.value = country;
                         since.value = sinceDt;
     
           function formatToUSDate(timestamp) {
    // Ensure it's a string
    timestamp = String(timestamp);

    // Extract date part only
    var datePart = timestamp.split(" ")[0]; // "0015-07-01"
    var parts = datePart.split("-");        // ["0015", "07", "01"]

    // Fix the year if it starts with 00 (e.g., "0015" → "2015")
    var year = parts[0];
    if (year.startsWith("00")) {
        year = "20" + year.slice(2);
    }

    var month = parts[1];
    var day = parts[2];

    return `${month}/${day}/${year}`; // MM/DD/YYYY
}

// Example
var timestamp = "0015-07-01 00:00:00.0";
var formattedDate = formatToUSDate(timestamp);
console.log(formattedDate); // Output: 07/01/2015




          ConvertDate.value = formattedDate;
         } 

           // gifModal.style.display = "none";
           // modal.style.display = "none";
        
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
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerContact_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerContact_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerAddress1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerAddress1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerAddress2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerAddress2_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerAddress3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerAddress3_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerCity_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerCity_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerState_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CustomerState_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Zipcode_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Zipcode_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Fax_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Fax_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_InvoiceHandling_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_InvoiceHandling_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
  this.enabled = true;
}
else{
   this.enabled = false;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_InvoiceHandling_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_InvoiceHandling_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(CustomerSelectionRB.value === "0"){
  this.visible = true;  
}
else 
  {
      this.visible = false;  
  }
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_BillLineInformationPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_BillLineInformationPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_TotalBillAmount_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_TotalBillAmount_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_InvoiceType_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_InvoiceType_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
this.enabled = true;
}
else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CreditAmount_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_CreditAmount_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
this.enabled = true;
}
else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Account_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Account_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
  var arr = JSON.parse(AccountDataArray.value);
 Row1.Account.items = arr;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_FundCode_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_FundCode_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
  var arr = JSON.parse(FundCodeDataArray.value);
 Row1.FundCode.items = arr;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Dept_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Dept_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
  var arr = JSON.parse(DeptDataArray.value);
 Row1.Dept.items = arr;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Program_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Program_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
  var arr = JSON.parse(ProgramDataArray.value);
 Row1.Program.items = arr;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Class_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Class_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
  var arr = JSON.parse(ClassDataArray.value);
 Row1.Class.items = arr;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Project_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Project_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
  var arr = JSON.parse(ProjectDataArray.value);
 Row1.Project.items = arr;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_gridPONumber_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_gridPONumber_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
this.enabled = true;
}
else{
  this.enabled = false;
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Add_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Add_click0 = function (scope) {
    with(this) {
        with(scope) {
            var isAddRowAllowed = false;
if(Row1.instanceManager.instanceCount >= 1 && Row1.instanceManager.instanceCount <= 100){
   for(var count = 0; count < Row1.instanceManager.instanceCount; count++){
      isAddRowAllowed = true;
   }
  	if(isAddRowAllowed === true){
      	if(Row1.instanceManager.instanceCount < 100){
          	Row1.instanceManager.addInstance();
        }
      	else{
          //	showErrorModal("Alert !", "More than 25 rows cannot be added");
        }
    }   	
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Add_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Add_click1 = function (scope) {
    with(this) {
        with(scope) {
            if(Row1.instanceManager.instanceCount >= 1 && Row1.instanceManager.instanceCount < 100){
    Row1.instanceManager.addInstance();
} else {
    // showErrorModal("Alert !", "More than 100 rows cannot be added");
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Remove_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Remove_click0 = function (scope) {
    with(this) {
        with(scope) {
            	var rowCount = Row1.instanceManager.instanceCount;

	if(rowCount == 1){		
		Row1.instanceManager.instances[0]._children[0].value = null;
        Row1.instanceManager.instances[0]._children[1].value = null;
		Row1.instanceManager.instances[0]._children[2].value = null;
        Row1.instanceManager.instances[0]._children[3].value = null;
        Row1.instanceManager.instances[0]._children[4].value = null;
		Row1.instanceManager.instances[0]._children[5].value = null;
        Row1.instanceManager.instances[0]._children[6].value = null;
        Row1.instanceManager.instances[0]._children[7].value = null;
	}

Row1.instanceManager.removeInstance(Row1.instanceIndex);
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Remove_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Remove_click1 = function (scope) {
    with(this) {
        with(scope) {
            var rowCount = Row1.instanceManager.instanceCount;

if(rowCount == 1){
    // Clear all 10 columns of the last row instead of removing
    Row1.instanceManager.instances[0]._children[0].value = null;
    Row1.instanceManager.instances[0]._children[1].value = null;
    Row1.instanceManager.instances[0]._children[2].value = null;
    Row1.instanceManager.instances[0]._children[3].value = null;
    Row1.instanceManager.instances[0]._children[4].value = null;
    Row1.instanceManager.instances[0]._children[5].value = null;
    Row1.instanceManager.instances[0]._children[6].value = null;
    Row1.instanceManager.instances[0]._children[7].value = null;
    Row1.instanceManager.instances[0]._children[8].value = null;
    Row1.instanceManager.instances[0]._children[9].value = null;
} else {
    // Remove the row only if more than 1 row exists
    Row1.instanceManager.removeInstance(Row1.instanceIndex);
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_SupportingDocument1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_SupportingDocument1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = SupportingDocument1.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(SupportingDocument1.fileAttachment.value) === true) {
        var doc1NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        SupportingDocument1.fileAttachment.value = doc1NewName;
    }
}


        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_SupportingDocument2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_SupportingDocument2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = SupportingDocument2.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(SupportingDocument2.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        SupportingDocument2.fileAttachment.value = doc2NewName;
    }
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_SupportingDocument3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_SupportingDocument3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = SupportingDocument3.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(SupportingDocument3.fileAttachment.value) === true) {
        var doc3NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        SupportingDocument3.fileAttachment.value = doc3NewName;
    }
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_SupportingDocument4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_SupportingDocument4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = SupportingDocument4.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(SupportingDocument4.fileAttachment.value) === true) {
        var doc4NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        SupportingDocument4.fileAttachment.value = doc4NewName;
    }
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_InitiatorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_InitiatorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if ((StageIndicator.value == "ToInitiator") || (StageIndicator.value === null)) {
        if (RequestorSign.value === null) {           
            RequestorSignDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  RequestorSign.value = userValue;
                  RequestorSignDate.value = myresopnse[0].SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    RequestorSign.value = "";
    RequestorSignDate.value = "";
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_RequestorSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ApproverCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ApproverCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if ((StageIndicator.value == "ToApprover")) {
        if (ApproverSign.value === null) {           
            ApproverSignDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                  ApproverSign.value = userValue;
                  ApproverSignDate.value = myresopnse[0].SERVER_DATE;
               //   ApproverName.value = ApproverSign.value;
                  UpdateApprover.value = myresopnse[0].EMP_USERID;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    ApproverSign.value = "";
    ApproverSignDate.value = "";
   // ApproverName.value = "";
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ApproverSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ApproverSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ApproverSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ApproverSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ASFRCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ASFRCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    if ((StageIndicator.value == "ToASFR")) {
        if (ASFRSign.value === null) {           
            ASFRSignDate.enabled = false;
            $.ajax({
                type: 'GET',
                url:"/bin/getEvaluationFormData",
				data: {action: "EMP_DETAILS"},
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse[0].EMP_NAME;
                 // ASFRUserId.value =  myresopnse[0].EMP_USERID;
                  ASFRName.value = userValue;
                  ASFRSign.value = userValue;
                  ASFRSignDate.value = myresopnse[0].SERVER_DATE;
                 // UpdateASFR.value = myresopnse[0].EMP_USERID;
                  
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });          

        } 
    }
} else {
    ASFRSign.value = "";
    ASFRSignDate.value = "";
  //  ASFRName.value = "";
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ASFRSign_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ASFRSign_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ASFRSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ASFRSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Invoicenumber_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Invoicenumber_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(CustomerSelectionRB.value === "0"){
  this.visible = true;  
}
else 
  {
      this.visible = false;  
  }
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_IFTNumber_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_IFTNumber_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(CustomerSelectionRB.value === "1"){
  this.visible = true;  
}
else 
  {
      this.visible = false;  
  }
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_UpdateApprover_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_UpdateApprover_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToApprover"){
    if(this.value !== ApproverUserId.value){
  ApproverCB.value = null;
}
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_UpdateASFR_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_UpdateASFR_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value === "ToASFR"){
    if(this.value !== ASFRUserId.value){
  ASFRCB.value = null;
}
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ExpenseType_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_ExpenseType_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToASFR"){
if(this.value === "OTHER"){
  OtherExpenseType.enabled = true;
  OtherExpenseType.mandatory = true;
}else{
  OtherExpenseType.enabled = false;
  OtherExpenseType.mandatory = false;
  OtherExpenseType.value = null;
}
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_OtherExpenseType_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_OtherExpenseType_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled =  false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            getPdf();

function getPdf() {
    //console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, ' and'));
            jsonData.append('formPath', '/content/forms/af/request-for-invoice-and-interagency-financial-transaction/request-for-invoice-and-interagency-financial-transaction-form');   
            jsonData.append('fileName', "RFI/IFT Form" + "-" + CWID.value + "-" + RequestorName.value );
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
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCSV_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCSV_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToASFR" && CustomerSelectionRB.value === "0"){
  this.visible = true;
    this.enabled = true;
}else{
  this.visible = false;
   this.enabled = false;
}
//this.visible = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCSV_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCSV_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (CustomerSelectionRB == "1") {
    this.visible = false;
    this.enabled = false;
}

        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCSV_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCSV_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
var rowcount = Row1.instanceManager.instanceCount;
var sheet = [];
for (k = 0; k < rowcount; k++) {
    sheet[k] = {};
    
    
	sheet[k].Account = Row1.instanceManager.instances[k].Account.value;
    sheet[k].FundCode = Row1.instanceManager.instances[k].FundCode.value;
    sheet[k].Department = Row1.instanceManager.instances[k].Dept.value;
    sheet[k].Program = Row1.instanceManager.instances[k].Program.value;
    sheet[k].Class = Row1.instanceManager.instances[k].Class.value;
    sheet[k].Project = Row1.instanceManager.instances[k].Project.value;   
    sheet[k].Amount = Row1.instanceManager.instances[k].CreditAmount.value;
    sheet[k].PONumber = Row1.instanceManager.instances[k].gridPONumber.value;
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
        link.download ="Request For Invoice.xls";
        link.click();
    } catch (err) {
        console.log("Error:", err);
    }
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCFSCustomerUploadCSV_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCFSCustomerUploadCSV_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToASFR"){
  this.visible = true;
    this.enabled = true;
}else{
  this.visible = false;
   this.enabled = false;
}
//this.visible = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCFSCustomerUploadCSV_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCFSCustomerUploadCSV_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (CustomerSelectionRB == "1") {
    this.visible = false;
}

        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCFSCustomerUploadCSV_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCFSCustomerUploadCSV_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
var rowcount = 1;
var sheet = [];
for (k = 0; k < rowcount; k++) {
    sheet[k] = {};
    
    sheet[k].SetID = "FLCMP";
	sheet[k].Customer_ID= CustomerID.value;
    sheet[k].Since = ConvertDate.value;
    sheet[k].Name1 =  CustomerName.value;
    sheet[k].Short_Name = NameShort.value;
  	sheet[k].Name2 = Name2.value;
    sheet[k].Tax = "";
    sheet[k].Customer_Web_Site = CustomerEmail.value;
    sheet[k].Description = "";
    sheet[k].Address_1 = CustomerAddress1.value;
    sheet[k].Address_2 = CustomerAddress2.value;
    sheet[k].Address_3 = "";
    sheet[k].City = CustomerCity.value;
    sheet[k].State = CustomerState.value;
    sheet[k].Postal_ZipCode = Zipcode.value; 
    sheet[k].Country = Country.value;
    sheet[k].Customer_Contact_Name = CustomerContact.value;
    sheet[k].Phone = Fax.value;
   // sheet[k].Fax = Fax.value;
    sheet[k].Team_Code = "FUL";
    sheet[k].Collector = "CC";
    sheet[k].Credit_Analyst = "CA";
    sheet[k].AR_Specialist = "";
    sheet[k].Payment_Terms_ID = "";
    sheet[k].Billing_Specialist = "";
  
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
       // link.download ="Request For Invoice - Customer Upload.xls";
        link.download ="Request For Invoice - Customer Upload.xlsx";
        link.click();
    } catch (err) {
        console.log("Error:", err);
    }
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCFSBillingUploadCSV_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCFSBillingUploadCSV_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToASFR"){
  this.visible = true;
    this.enabled = true;
}else{
  this.visible = false;
   this.enabled = false;
}
//this.visible = false;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCFSBillingUploadCSV_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCFSBillingUploadCSV_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (CustomerSelectionRB == "1") {
    this.visible = false;
    this.enabled = false;
}

        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCFSBillingUploadCSV_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_generateCFSBillingUploadCSV_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
var rowcount = Row1.instanceManager.instanceCount;
var sheet = [];
for (k = 0; k < rowcount; k++) {
    sheet[k] = {};
    
    sheet[k].BILL_TO_CUST_ID =  CustomerID.value;
	sheet[k].ADD_SEQ_NUM = "";
    sheet[k].DESCR = BillDescription.value;
    sheet[k].IDENTIFIER = "";
    sheet[k].Invoice_Type = Row1.instanceManager.instances[k].InvoiceType.value;
    sheet[k].Amount = Row1.instanceManager.instances[k].CreditAmount.value;
	sheet[k].Account = Row1.instanceManager.instances[k].Account.value;
    sheet[k].FundCode = Row1.instanceManager.instances[k].FundCode.value;
    sheet[k].Department = Row1.instanceManager.instances[k].Dept.value;
    sheet[k].Program = Row1.instanceManager.instances[k].Program.value;
    sheet[k].Class = Row1.instanceManager.instances[k].Class.value;
    sheet[k].Project = Row1.instanceManager.instances[k].Project.value; 
    sheet[k].DST_ID = "";
  	sheet[k].FROM_DT = "";
    sheet[k].TO_DT = "";
    sheet[k].BillLine_Notes = Row1.instanceManager.instances[k].BillLine.value;
    sheet[k].CampusDefined = Row1.instanceManager.instances[k].gridPONumber.value;
    sheet[k].TEXT = "";
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
        link.download ="Request For Invoice - CFS Billing Template.xlsx";
        link.click();
    } catch (err) {
        console.log("Error:", err);
    }
}
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_saveguidedraft1629881233615_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_saveguidedraft1629881233615_click0 = function (scope) {
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
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_submitButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_submitButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
aftiaDescCWID.value = RequestorName.value + " " + cwid_initiator.value;
EmailSubject.value = "Test - Request For Invoice / Interagency Financial Transactions Form - CaseID - " + caseId.value;

guideBridge.submit();




        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_submitButton_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_submitButton_click1 = function (scope) {
    with(this) {
        with(scope) {
            var rowData = []; 
    
    var rowCount = Row1.instanceManager.instanceCount; 
    for (var i = 0; i < rowCount; i++) {
        
        var rowObject = {};
        
        rowObject.CreditAmount = Row1.instanceManager.instances[i].CreditAmount.value;
        
        rowData.push(rowObject);
    }

    creditAmountJSON.value = JSON.stringify(rowData); 

    console.log(rowData);
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_submitButton_click2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_submitButton_click2 = function (scope) {
    with(this) {
        with(scope) {
            OptionalCCOne.value = OptionalEmailAddress1.value;
OptionalCCTwo.value = OptionalEmailAddress2.value;
OptionalCCThree.value = OptionalEmailAddress3.value;
        }
	}
}
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_submitButton_click3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_submitButton_click3 = function (scope) {
    with(this) {
        with(scope) {
            var emails = "";
if (OptionalCCOne.value !== null && OptionalCCOne.value !== "") {
    emails += OptionalCCOne.value;
}
if (OptionalCCTwo.value !== null && OptionalCCTwo.value !== "") {
    if (emails !== "") emails += ";";
    emails += OptionalCCTwo.value;
}
if (OptionalCCThree.value !== null && OptionalCCThree.value !== "") {
    if (emails !== "") emails += ";";
    emails += OptionalCCThree.value;
}
OptionalFinal.value = emails;
        }
	}
}
