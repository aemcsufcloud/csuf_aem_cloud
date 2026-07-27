/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
  
    driverInformationPanel.visible = true;
    driverInformationPanel.enabled = true;
  
  InitiatorEmail.visible = true;

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
    InitiatorEmail.visible = true;
  
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
    InitiatorEmail.visible = true;
  InitiatorEmail.enabled = false;
 

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
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null){
showErrorModal("Alert!", "You will need your Driver’s license and proof of insurance to complete this form.");
}
        }
	}
}
/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_CaseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_CaseId_init0 = function (scope) {
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
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_InitiatorFirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_InitiatorFirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_InitiatorLastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_InitiatorLastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_InitiatorEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_InitiatorEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_DriverState_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_DriverState_init0 = function (scope) {
    with(this) {
        with(scope) {
            	
this.enabled = false;
        }
	}
}
/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_SupportingDocumentsPanel_init0 = function (scope) {
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
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_SupportingDocument1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_SupportingDocument1_valueCommit0 = function (scope) {
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
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_SupportingDocument2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_SupportingDocument2_valueCommit0 = function (scope) {
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
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_EmployeeSignatureCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_EmployeeSignatureCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
	if (this.value == 1) {
				var userValue ;
				EmployeeName.value = InitiatorFirstName.value + " " + InitiatorLastName.value;
				EmployeeSignature.value =  InitiatorFirstName.value + " " + InitiatorLastName.value;
				EmployeeSignDate.value =  getDateforAdaptiveForm();            
			}
			else{
              this.value = "";
              EmployeeName.value = "";
		EmployeeSignature.value = "";
		EmployeeSignDate.value = "";
}
}
		


        }
	}
}
/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_EmployeeName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_EmployeeName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_EmployeeSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_EmployeeSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_EmployeeSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_EmployeeSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_ApprovalSignatureCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_ApprovalSignatureCB_valueCommit0 = function (scope) {
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
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_ApprovalName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_ApprovalName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_ApprovalSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_ApprovalSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_ApprovalSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_ApprovalSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_DriverRenewalCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_DriverRenewalCB_valueCommit0 = function (scope) {
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
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_ApprovingRenewalCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_ApprovingRenewalCB_valueCommit0 = function (scope) {
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
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_workflow_initiator_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_workflow_initiator_valueCommit0 = function (scope) {
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
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated__init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated__init0 = function (scope) {
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
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_CWID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_CWID_init0 = function (scope) {
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
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_CWID_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_CWID_init1 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_SaveFlag_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_SaveFlag_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.value = "false";
}
        }
	}
}
/**
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/authorization-private-vehicle-external-form/std-261-authorization-privately-owned-vehicles-external-form');
            jsonData.append('fileName', "Authorization Privately Owned Vehicles Form");          
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
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_saveguidedraft1574920589904_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_saveguidedraft1574920589904_click0 = function (scope) {
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
 * @function authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_submit1574920582933_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
authorization_private_vehicle_external_form_std_261_authorization_privately_owned_vehicles_external_form.generated_submit1574920582933_click0 = function (scope) {
    with(this) {
        with(scope) {
            
   aftiaDescCWID.value = InitiatorFirstName.value + " " + InitiatorLastName.value;
   InitiatorName.value = InitiatorFirstName.value + " " + InitiatorLastName.value;
   EmailSubject.value = "Test - Authorization To Use Privately Owned Vehicles -" + " " + InitiatorName.value;

guideBridge.submit();
        }
	}
}
