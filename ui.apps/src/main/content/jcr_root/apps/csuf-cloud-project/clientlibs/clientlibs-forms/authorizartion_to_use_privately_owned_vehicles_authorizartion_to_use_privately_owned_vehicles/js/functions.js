/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            
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

				/*$.ajax({
					type: 'GET',
					url: "/bin/getEvaluationFormData",
					data: {
						action: "EMP_DETAILS"
					},*/
               $.ajax({
					type: 'GET',
					url: "/bin/getEvaluationFormDataCHRSID",
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
                            unionCD.value = myresopnse[0].UNION_CD;
                            chrsID.value =  myresopnse[0].CSU_CHRS_ID;
                            SupervisorName.value = myresopnse[0].SUPERVISORNAME;
                            supervisorUserid.value = myresopnse[0].MANAGER_EMP_USERID;
							InitiatorFirstName.value = myresopnse[0].FIRST_NAME;
							InitiatorLastName.value = myresopnse[0].LAST_NAME;                           
                            DeptID.value = myresopnse[0].DEPTID;
                           // Department.value = myresopnse[0].DEPTNAME;
                            Division.value = myresopnse[0].DIVSION;                           
						//	InitiatorEmail.value = myresopnse[0].EMAILID;
                          InitiatorEmail.value = "csufaemform@gmail.com";
							InitiatorUserID.value = myresopnse[0].EMP_USERID;
							InitiatorName.value = myresopnse[0].FIRST_NAME + " " + myresopnse[0].LAST_NAME;
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
                            cwid_initiator.value = myresopnse[n].EMPLID;                            
                            CWID.value = myresopnse[n].EMPLID;      
                            unionCD.value = myresopnse[n].UNION_CD;
                            chrsID.value =  myresopnse[n].CSU_CHRS_ID;
                            SupervisorName.value = myresopnse[n].SUPERVISORNAME;
                            supervisorUserid.value = myresopnse[n].MANAGER_EMP_USERID;
							InitiatorFirstName.value = myresopnse[n].FIRST_NAME;
							InitiatorLastName.value = myresopnse[n].LAST_NAME;                          
                            DeptID.value = myresopnse[n].DEPTID;
                           // Department.value = myresopnse[n].DEPTNAME;
                            Division.value = myresopnse[n].DIVSION;                           
						//	InitiatorEmail.value = myresopnse[n].EMAILID;
                                        InitiatorEmail.value = "csufaemform@gmail.com";
							InitiatorUserID.value = myresopnse[n].EMP_USERID;
							InitiatorName.value = myresopnse[n].FIRST_NAME + " " + myresopnse[n].LAST_NAME;

               				gifModal.style.display = "none";
							modal.style.display = "none";

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
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    driverInformationPanel.visible = true;
    driverInformationPanel.enabled = true;
  
    certificatePanel.visible = true;
    certificatePanel.enabled = true;
  
  	SupportingDocumentsPanel.visible = true;
  	SupportingDocumentsPanel.enabled = true;
    
    EmployeeSignaturePanel.visible = true;
    ApprovalSignaturePanel.visible = false; 
  
    RenewalPanelParent.visible = false;
  
}

if (StageIndicator.value === "ToInitiator"){

    driverInformationPanel.visible = true;
    driverInformationPanel.enabled = true;
  
    certificatePanel.visible = true;
    certificatePanel.enabled = true;
  
  	SupportingDocumentsPanel.visible = true;
  	SupportingDocumentsPanel.enabled = true;
    
    EmployeeSignaturePanel.visible = true;
    ApprovalSignaturePanel.visible = false; 
  
   RenewalPanelParent.visible = false;
}

if(StageIndicator.value === "ToApproval") {

    driverInformationPanel.visible = true;
    driverInformationPanel.enabled = false;
  
    certificatePanel.visible = true;
    certificatePanel.enabled = false;

    EmployeeSignaturePanel.visible = true;
	EmployeeSignaturePanel.enabled = false;
  
 	SupportingDocumentsPanel.visible = false;   
  
    ApprovalSignaturePanel.visible = true;
    ApprovalSignaturePanel.enabled = true;
  
   RenewalPanelParent.visible = false;

}


if(StageIndicator.value === "ToInitiatorRenewal ") {

  ApprovingRenewalCB.visible = false;
  ApprovingRenewalSignature.visible = false; 
  ApprovingRenewalSignDate.visible = false;

    driverInformationPanel.visible = true;
   // driverInformationPanel.enabled = false;
  
   ExpiredDate.enabled = true;
   DriverNumber.enabled = false;
  
    certificatePanel.visible = true;
    certificatePanel.enabled = false;

    EmployeeSignaturePanel.visible = true;
	EmployeeSignaturePanel.enabled = false;
  
 	SupportingDocumentsPanel.visible = false;   
  
    ApprovalSignaturePanel.visible = true;
    ApprovalSignaturePanel.enabled = false;
   
  DriverRenewalCB.visible = true;
  DriverRenewalSignature.visible = true;
  DriverRenewalSignDate.visible = true;
  
   RenewalPanelParent.visible = true;
   RenewalPanelParent.enabled = true;

}



if(StageIndicator.value === "ToApprovalRenewal") {
    DriverRenewalCB.visible = true;
  DriverRenewalSignature.visible = true;
  DriverRenewalSignDate.visible = true;
  
  DriverRenewalCB.enabled = false;
  DriverRenewalSignature.enabled = false;
  DriverRenewalSignDate.enabled = false;
  
  ApprovingRenewalCB.visible = true;
  ApprovingRenewalSignature.visible = true;
  ApprovingRenewalSignDate.visible = true;

    driverInformationPanel.visible = true;
    driverInformationPanel.enabled = false;
  
    certificatePanel.visible = true;
    certificatePanel.enabled = false;

    EmployeeSignaturePanel.visible = true;
	EmployeeSignaturePanel.enabled = false;
  
 	SupportingDocumentsPanel.visible = false;   
  
    ApprovalSignaturePanel.visible = true;
    ApprovalSignaturePanel.enabled = false;
  
   RenewalPanelParent.visible = true;
  RenewalPanelParent.enabled = true;

}


        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            /*if (StageIndicator.value == "ToInitiatorRenewal ") {
 var instancecount = RenewalPanel.instanceManager.instanceCount; 
  if(instancecount >=1 ){
    if(RenewalPanel.instanceManager.instances[instancecount-1].DriverRenewalSignature.value === null && RenewalPanel.instanceManager.instances[instancecount-1].ApprovingRenewalSignature.value === null){
      
    }else{
      RenewalPanel.instanceManager.addInstance(true);
    }
  }
}*/
debugger;
RenewalPanel.instanceManager.addInstance();
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_guideRootPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_guideRootPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null){
showErrorModal("Alert!", "You will need your Driver’s license and proof of insurance to complete this form.");
}
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_CaseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_CaseId_init0 = function (scope) {
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
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_InitiatorFirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_InitiatorFirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_InitiatorLastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_InitiatorLastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_DriverState_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_DriverState_init0 = function (scope) {
    with(this) {
        with(scope) {
            	
this.enabled = false;
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_chrsID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_chrsID_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === "ToApproval") {
    this.visible = true;
    this.enabled = false;
}
else{
   this.visible = false;
}

        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_SupportingDocumentsPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value === "ToInitiator"){
  this.visible = true;
  this.enabled = true;
}
else{
  this.visible = false;
  //this.enabled = false;
}
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_SupportingDocument1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_SupportingDocument1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            /*f (StageIndicator.value === null) {
    var filePath = SupportingDocument1.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(SupportingDocument1.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        SupportingDocument1.fileAttachment.value = doc2NewName;
    }
    if (extension !== "pdf") {

        SupportingDocument1.fileAttachment.value = null;
        showErrorModal("Alert !", "Please upload a supported file");
    }
    if (this.value !== null) {
        SupDocMessage.visible = false;
    }
}*/

if (StageIndicator.value === null) {
    var filePath = SupportingDocument1.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(SupportingDocument1.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        SupportingDocument1.fileAttachment.value = doc2NewName;
    }
}


        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_SupportingDocument1_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_SupportingDocument1_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
var filePath = SupportingDocument1.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  SupportingDocument1.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  SupportingDocument1.fileAttachment.value = fname;
}
}
if(SupportingDocument1.fileAttachment.value !== null){
	doc1.value = SupportingDocument1.fileAttachment.value;
}
else{
    doc1.value = "";
}
}
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_SupportingDocument2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_SupportingDocument2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            /*if (StageIndicator.value === null) {
    var filePath = SupportingDocument2.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[&{}#!@$%^=;\[\]]/;
    if (format.test(SupportingDocument2.fileAttachment.value) === true) {
        var doc2NewName = SupportingDocument2.fileAttachment.value.replace(/#|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '-');
        SupportingDocument2.fileAttachment.value = doc2NewName;
    }
    if (extension !== "pdf") {
        SupportingDocument2.fileAttachment.value = null;
        showErrorModal("Alert !", "Please upload a supported file");
    }
    if (this.value !== null) {
        SupDocMessage.visible = false;
    }
}*/


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
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_SupportingDocument2_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_SupportingDocument2_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
var filePath = SupportingDocument2.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  SupportingDocument2.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  SupportingDocument2.fileAttachment.value = fname;
}
}
if(SupportingDocument2.fileAttachment.value !== null){
	doc2.value = SupportingDocument2.fileAttachment.value;
}
else{
    doc2.value = "";
}
}
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_EmployeeSignatureCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_EmployeeSignatureCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				EmployeeName.value = userValue;
				EmployeeSignature.value = userValue;
				EmployeeSignDate.value = myresponse.SERVER_DATE;
                REmployeeSignature.value = userValue;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
	} else {
		EmployeeName.value = "";
		EmployeeSignature.value = "";
		EmployeeSignDate.value = "";
        REmployeeSignature.value = "";
	}

        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_EmployeeName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_EmployeeName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_EmployeeSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_EmployeeSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_EmployeeSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_EmployeeSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_ApprovalSignatureCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_ApprovalSignatureCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				ApprovalName.value = userValue;
				ApprovalSignature.value = userValue;
				ApprovalSignatureDate.value = myresponse.SERVER_DATE;
                RRiskSignature.value = userValue;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
	} else {
		ApprovalName.value = "";
		ApprovalSignature.value = "";
		ApprovalSignatureDate.value = "";
        RRiskSignature.value = "";
	}

        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_ApprovalName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_ApprovalName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_ApprovalSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_ApprovalSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_ApprovalSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_ApprovalSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_DriverRenewalCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_DriverRenewalCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToInitiatorRenewal ") {
if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				DriverRenewalSignature.value = userValue;
				DriverRenewalSignDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
	} else {
		DriverRenewalSignature.value = "";
		DriverRenewalSignDate.value = "";
	}
}
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_ApprovingRenewalCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_ApprovingRenewalCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === "ToApprovalRenewal") {
if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				ApprovingRenewalSignature.value = userValue;
				ApprovingRenewalSignDate.value =myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
	} else {
		ApprovingRenewalSignature.value = "";
		ApprovingRenewalSignDate.value = "";
	}
}
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_Division_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_Division_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
  if( StageIndicator.value === null || StageIndicator.value === "ToInitiator" || StageIndicator.value === "ToApproval"){
    FormType.value = "Initial";

var cwid1 = chrsID.value;
var dept1 = DeptID.value;
var union = unionCD.value;

$.ajax({
    type: 'GET',
    url: "/bin/getEvaluationFormDataCHRSID",
    data: {
        action: "SPE_MANAGER_DETAILS",
        cwid: cwid1,
        deptID: dept1,
        union_cd: union
    },
    dataType: 'json',
    success: function(myresopnse) {
  
         if (myresopnse.length >= 1) {
           	for (var i = 0; i < myresopnse.length; i++) {
		// SupervisorEmail.value = myresopnse[i].MANAGER_EMAIL_ID;
              SupervisorEmail.value = "csufaemform@gmail.com";
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
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated__init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated__init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToDepartmentAdministrator"){
    if(this.value !== DepartmentAdministratorUserId.value){
  AckCB.value = null;
}
}
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_CWID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_CWID_init0 = function (scope) {
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
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_CWID_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_CWID_init1 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_CWID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_CWID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if( (StageIndicator.value === null) || (StageIndicator.value === "ToInitiator")) {
    if (this.value !== null && cwid_initiator.value !== this.value) {
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
                            debugger;
                            if (myresopnse.length === 1 && myresopnse[0].EMPLID !== undefined) {

                                InitiatorFirstName.value = myresopnse[0].FIRST_NAME;
                                InitiatorLastName.value = myresopnse[0].LAST_NAME;                             
                                DeptID.value = myresopnse[0].DEPTID;
                               // Department.value = myresopnse[0].DEPTNAME;                              
                                Division.value = myresopnse[0].DIVSION;
                               // InitiatorEmail.value = "yjayaram@fullerton.edu";
                                InitiatorEmail.value = "shreyas.manjunatha@thoughtfocus.com";

                              //  InitiatorPanel.visible = true;

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
                                DeptID.value = myresopnse[n].DEPTID;
                              //  Department.value = myresopnse[n].DEPTNAME;                              
                                Division.value = myresopnse[n].DIVSION;
                              //  InitiatorEmail.value = "yjayaram@fullerton.edu";
                                InitiatorEmail.value = "shreyas.manjunatha@thoughtfocus.com";

                               // InitiatorPanel.visible = true;

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
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_SaveFlag_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_SaveFlag_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.value = "false";
}
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
              getPdf();


function getPdf() {
    console.log("in view pdf");
  
    window.guideBridge.getDataXML({
        success: function(result) {
           console.log("in view pdf="+result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/authorizartion-to-use-privately-owned-vehicles/authorizartion-to-use-privately-owned-vehicles');
            jsonData.append('fileName', "Authorization To Use Privately Owned Vehicles");          
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
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_saveguidedraft1574920589904_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_saveguidedraft1574920589904_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(chrsID.value !== null){
 // aftiaDescCWID.value = ("TestFN" + " " + "TestLN" + " " + "806225686"+ " ");
   aftiaDescCWID.value = InitiatorName.value + " " + cwid_initiator.value;
  handleDraftSave(this);
  
}else{
  showErrorModal("Alert!","Please enter the employee id");
}
        }
	}
}
/**
 * @function authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_submit1574920582933_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorizartion_to_use_privately_owned_vehicles_authorizartion_to_use_privately_owned_vehicles.generated_submit1574920582933_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    aftiaDescCWID.value = InitiatorName.value + " " + cwid_initiator.value;
    EmailSubject.value = "Test - Authorization To Use Privately Owned Vehicles - " + InitiatorName.value + " " + cwid_initiator.value;
}


guideBridge.submit();
        }
	}
}
