/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    AppealsCommitteeSignaturePanel.visible = false;
} else if (StageIndicator.value == "ToAppealsCommittee") {
    BasicDetailsPanel.enabled = false;
    SupportingDocumentsPanel.visible = false;
    FeeWaiverHolderSignaturePanel.enabled = false;
    if (FeeWaiverRequestRB.value == "2") {
        FeeWaiverRequestRBExplanation.visible = true;
    } else {
        FeeWaiverRequestRBExplanation.visible = false;
    }
}
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            var userValue = response.userId;
            workflow_initiator.value = userValue;
            getFeeWaiverHolderDetails(userValue);
        },
        error: function(error) {
            alert("error block=" + error);
            gifModal.style.display = "none";
        }
    });
}

function getFeeWaiverHolderDetails(userValue) {
    $.ajax({
        type: 'GET',
        url: "/bin/getAppealofaDeclinedFeeWaiverRequestData",
        data: {
            action: "FEE_WAIVER_HOLDER_USER_ID_LOOKUP",
            userid: userValue
        },
        dataType: 'json',
        success: function(response) {
            if (response.length >= 1) {
                var firstName = response[0].FIRST_NAME;
                var lastName = response[0].LAST_NAME;
                FeeWaiverHolderLastName.value = lastName;
                FeeWaiverHolderFirstName.value = firstName;
                FeeWaiverHolderFullName.value = firstName + " " + lastName;
                FeeWaiverHolderUserId.value = userValue;
                FeeWaiverHolderCWID.value = response[0].EMPLID;
                FeeWaiverHolderContactTelephone.value = response[0].WORK_PHONE;
                //FeeWaiverHolderEmailAddress.value = response[0].EMAILID; 
                FeeWaiverHolderEmailAddress.value = "anupama.dhar@thoughtfocus.com";
                //FeeWaiverHolderEmailAddress.value = "shreyas.manjunatha@thoughtfocus.com";
                getFacultyOrStaffStatus(response[0].EMPLID);
                gifModal.style.display = "none";
            } else {
                showErrorModal("Alert!", "No matching records found");
                gifModal.style.display = "none";
            }
        },
        error: function(error) {
            alert("error block=" + error);
            gifModal.style.display = "none";
        }
    });
}

function getFacultyOrStaffStatus(cwid) {
    $.ajax({
        type: 'GET',
        url: "/bin/getFinancialARFData",
        data: {
            cwid: cwid,
            action: "FS_EMP_DATA"
        },
        dataType: 'json',
        success: function(response) {
            if (response.length >= 1) {
                var empPosition = response[0].POSITION;
                if (empPosition.toLowerCase() == "faculty") {
                    FeeWaiverHoldeQualifyingPositionRB.value = "2";
                } else if (empPosition.toLowerCase() == "staff") {
                    FeeWaiverHoldeQualifyingPositionRB.value = "1";
                }
            }
        },
        error: function(error) {
            alert("error block=" + error);
            gifModal.style.display = "none";
        }
    });
}
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_caseId_init0 = function (scope) {
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
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_RelationshipToFeeWaiverRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_RelationshipToFeeWaiverRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  if(this.value !== null){
    var val = this.value;
    if(val == "1"){
      IndividualUsingFeeWaiverLastName.value = FeeWaiverHolderLastName.value;
      IndividualUsingFeeWaiverFirstName.value = FeeWaiverHolderFirstName.value; 
      IndividualUsingFeeWaiverMiddleName.value = FeeWaiverHolderMiddleName.value;
    } else{
       IndividualUsingFeeWaiverLastName.value = "";
      IndividualUsingFeeWaiverFirstName.value = ""; 
      IndividualUsingFeeWaiverMiddleName.value = "";
    }
  }
}
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_supportDoc1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc1.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(supportDoc1.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        supportDoc1.fileAttachment.value = doc2NewName;
    }
}
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_supportDoc2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc2.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(supportDoc2.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        supportDoc2.fileAttachment.value = doc2NewName;
    }
}
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_supportDoc3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc3.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(supportDoc3.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        supportDoc3.fileAttachment.value = doc2NewName;
    }
}
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_FeeWaiverHolderSignatureCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_FeeWaiverHolderSignatureCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (this.value == "1") {
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresponse) {
                var userValue = myresponse.userName;
                FeeWaiverHolderSignature.value = userValue;
                FeeWaiverHolderSignatureDate.value = myresponse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
    } else {
        FeeWaiverHolderSignature.value = "";
        FeeWaiverHolderSignatureDate.value = "";
    }

}
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_FeeWaiverRequestRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_FeeWaiverRequestRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (this.value !== null) {
        if (this.value == "2") {
            FeeWaiverRequestRBExplanation.visible = true;
            FeeWaiverRequestRBExplanation.value = "";
            FeeWaiverRequestRBExplanation.mandatory = true;
        } else {
            FeeWaiverRequestRBExplanation.visible = false;
            FeeWaiverRequestRBExplanation.value = "";
            FeeWaiverRequestRBExplanation.mandatory = false;
        }
    }
}
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_FeeWaiverRequestRBExplanation_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_FeeWaiverRequestRBExplanation_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = false;
}
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_FeeWaiverHolderSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_FeeWaiverHolderSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_FeeWaiverHolderSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_FeeWaiverHolderSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_AppealsCommitteeSignatureCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_AppealsCommitteeSignatureCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToAppealsCommittee") {
    if (this.value == "1") {
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresponse) {
                var userValue = myresponse.userName;
                AppealsCommitteeSignature.value = userValue;
                AppealsCommitteeSignDate.value = myresponse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
    } else {
        AppealsCommitteeSignature.value = "";
        AppealsCommitteeSignDate.value = "";
    }

}
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_AppealsCommitteeDecision_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_AppealsCommitteeDecision_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToAppealsCommittee") {
  var term = AppealRequestedForTermRB.value;
  var termName = "";
  if(term == "1"){
    termName = "Summer";
  }else if(term == "2"){
     termName = "Spring";
  }else{
     termName = "Fall";
  }
  if(this.value == "1"){
    AppealsCommitteCurrentTerm.value = termName+" "+AppealRequesterForTermYear.value;
    AppealsCommitteCurrentTerm.enabled = true;
    AppealsCommitteCurrentTerm.mandatory = true;
    AppealsCommittePriorTerm.enabled = false;
    AppealsCommittePriorTerm.mandatory = false;
    AppealsCommittePriorTerm.value = "";
    AppealsCommitteeFinalDecision.value = "Approved";
  } else if(this.value == "2"){
    AppealsCommittePriorTerm.value = termName+" "+AppealRequesterForTermYear.value;
    AppealsCommittePriorTerm.enabled = true;
    AppealsCommittePriorTerm.mandatory = true;
    AppealsCommitteCurrentTerm.enabled = false;
    AppealsCommitteCurrentTerm.mandatory = false;
    AppealsCommitteCurrentTerm.value = "";
     AppealsCommitteeFinalDecision.value = "Approved";
  } else{
    AppealsCommittePriorTerm.value = "";
    AppealsCommittePriorTerm.enabled = false;
    AppealsCommittePriorTerm.mandatory = false;
    AppealsCommitteCurrentTerm.enabled = false;
    AppealsCommitteCurrentTerm.mandatory = false;
    AppealsCommitteCurrentTerm.value = "";
     AppealsCommitteeFinalDecision.value = "Denied";
  }
}
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_AppealsCommitteCurrentTerm_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_AppealsCommitteCurrentTerm_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_AppealsCommittePriorTerm_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_AppealsCommittePriorTerm_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_AppealsCommitteeSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_AppealsCommitteeSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_AppealsCommitteeSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_AppealsCommitteeSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/appeal-of-a-declined-fee-waiver-request/appeal-of-a-declined-fee-waiver-request');
            jsonData.append('fileName', "Appeal of a Declined Fee Waiver Form");          
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
 * @function appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_submit1574920582933_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeal_of_a_declined_fee_waiver_request_appeal_of_a_declined_fee_waiver_request.generated_submit1574920582933_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  aftiaDescCWID.value = FeeWaiverHolderFullName.value+" "+FeeWaiverHolderCWID.value;
  EmailSubject.value = "Test - Appeal of a Declined Fee Waiver Request - "+FeeWaiverHolderFullName.value+" "+FeeWaiverHolderCWID.value;
  if(AppealRequestedForTermRB.value !== null){
    var termVal = "";
    if(AppealRequestedForTermRB.value == "1"){
      termVal = "Summer";
    } else if(AppealRequestedForTermRB.value == "2"){
      termVal = "Spring";
    } else{
      termVal = "Fall";
    }
    termValue.value = termVal+" "+AppealRequesterForTermYear.value;
  }
}

FeeWaiverHolderEmailAddress.value="anupama.dhar@thoughtfocus.com";
//FeeWaiverHolderEmailAddress.value="shreyas.manjunatha@thoughtfocus.com";
if(FeeWaiverRequestRB.value == "1" && supportDoc1.value === "" && supportDoc2.value === "" && supportDoc3.value === ""){
  showErrorModal("Alert!", "Please attach a copy of U.S. military compulsory orders");
}else{
  guideBridge.submit();
}
     


        }
	}
}
