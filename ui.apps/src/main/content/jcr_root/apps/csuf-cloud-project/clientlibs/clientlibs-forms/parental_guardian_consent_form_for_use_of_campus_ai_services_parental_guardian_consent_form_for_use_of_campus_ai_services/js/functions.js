/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
 
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            var userValue = response.userId;
         // var userValue = "beraniapineda";
         //  var userValue = "gys";
            workflow_initiator.value = userValue;
          getStudentDetails(userValue);
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}


function getStudentDetails(userValue) {
    $.ajax({
        type: 'GET',
        url: "/bin/getUniversityWithdrawalData",
        data: {
            action: "UNIVERSITY_WITHDRAWAL_DETAILS",
            userID: userValue
        },
        dataType: 'json',
        success: function(response) {

            if (response.length >= 1) {
  
                studentCwid.value = response[0].STUDENT_ID;
                studentfirstName.value = response[0].STUDENT_FNAME;
                studentlastName.value = response[0].STUDENT_LNAME;
                HiddenStudentUserID.value = response[0].STUDENT_USERID;
             //   StudentPhone.value = response[0].STUDENT_PHONE;                
                studentEmail.value = "shreyas.manjunatha@thoughtfocus.com";
                HiddenStudentName.value = studentfirstName.value + " " + studentlastName.value;
             //   AdmittedTerm.value = response[0].ADMIT_TERM_DESCR;
              //  StudentMajor.value = response[0].PROGRAMS;

            } else {
                showErrorModal("Alert!", "No matching records found");
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
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value === null){
  StudentInformationPanel.visible=true;
 // StudentInformationPanel.enabled=true;
  InstructionsTab.visible=true;
 // InstructionsTab.enabled=true;
  ParentInformationPanel.visible=true;
//  ParentInformationPanel.enabled=true;
  StudentSignaturePanel.visible=true;
  disabledCutCopyPasteFunctionality(); 
 // StudentSignaturePanel.enabled=false;
}

/*if(StageIndicator.value === "ToParental"){
  StudentInformationPanel.visible=true;
  StudentInformationPanel.enabled=false;
  InstructionsTab.visible=true;
  InstructionsTab.enabled=false;
  ParentInformationPanel.visible=true;
  ParentInformationPanel.enabled=false;
  StudentSignaturePanel.visible=true;
  StudentSignaturePanel.enabled=false;
  ParentalSignaturePanel.visible=true;
  ParentalSignaturePanel.enabled=true;
}*/
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_caseId_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_caseId_init1 = function (scope) {
    with(this) {
        with(scope) {
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
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_studentCwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_studentCwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_studentfirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_studentfirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_studentlastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_studentlastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_studentEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_studentEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_SupportingDocumentsPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    this.visible = true;
} else {
    this.visible = false;
}
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_NonMedicalSupportingDocument1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_NonMedicalSupportingDocument1_valueCommit0 = function (scope) {
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
    if (extension !== "pdf") {

        supportDoc1.fileAttachment.value = null;
        showErrorModal("Alert !", "Please upload a supported file");
    }
    if (this.value !== null) {
        nonMedSupDocMessage.visible = false;
    }
}
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_NonMedicalSupportingDocument2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_NonMedicalSupportingDocument2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc2.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[&{}#!@$%^=;\[\]]/;
    if (format.test(supportDoc2.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        supportDoc2.fileAttachment.value = doc2NewName;
    }
    if (extension !== "pdf") {
        supportDoc2.fileAttachment.value = null;
        showErrorModal("Alert !", "Please upload a supported file");
    }
    if (this.value !== null) {
        nonMedSupDocMessage.visible = false;
    }
}
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_NonMedicalSupportingDocument3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_NonMedicalSupportingDocument3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc3.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[&{}#!@$%^=;\[\]]/;
    if (format.test(supportDoc3.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        supportDoc3.fileAttachment.value = doc2NewName;
    }
    if (extension !== "pdf") {

        supportDoc3.fileAttachment.value = null;
        showErrorModal("Alert !", "Please upload a supported file");
    }
    if (this.value !== null) {
        nonMedSupDocMessage.visible = false;
    }
}
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_StudentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (this.value == 1) {
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresponse) {
                studentSignature.value = studentfirstName.value + " " + studentlastName.value;
                studentSignDate.value = myresponse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        studentSignature.enabled = false;
        studentSignDate.enabled = false;
    } else {
        studentSignature.value = "";
        studentSignDate.value = "";
    }
}
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_ipAddress_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_ipAddress_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {     		
  	$.getJSON("https://api.ipify.org?format=json", function(data) {                
        this.value = data.ip;        
    });
}
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_studentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_studentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_studentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_studentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_evaluator_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_evaluator_signChk_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToParental") {
    if (this.value == "1") {
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresponse) {
                ParentSignature.value = myresponse.userName;
                parentSignDate.value = myresponse.SERVER_DATE;
               // financialAidAssignee.value = myresponse.userId;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        parentSignDate.enabled = false;
        ParentSignature.enabled = false;
    } else {
        ParentSignature.value = "";
        parentSignDate.value = "";
       // financialAidAssignee.value = "";
    }
}
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_parentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_parentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_parentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_parentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_Date_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    this.enabled = false;
    var dateString = new Date().toLocaleString("en-US", {
        timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
    }).replace(/[^ -~]/g, ' ');
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
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_Date_1_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_Date_1_init1 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if(StageIndicator.value === null){
	  this.enabled = false;

  Date_1.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_WorkflowInstanceID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_WorkflowInstanceID_init0 = function (scope) {
    with(this) {
        with(scope) {
            //if(StageIndicator.value !== null){
  	
  	var wId = localStorage.getItem("workItemId");
  	console.log("=workItemID=== " + wId);
	//if(this.value !== null){
		var instance = this.value;
  		var adobeSignDocumentName = 'Parental_Consent_for_AI_Adobe_Sign.pdf';		
		var requestURL = '/bin/getInboxItemDetails?action=ADOBE_SIGN_DOCUMENT_ATTACHMENT&workItemId=' + wId + '&signedDocument=' + adobeSignDocumentName + '&workflowInstanceId=' + encodeURIComponent(instance);  		
		console.log(requestURL);
  
		$.ajax({
			type: "GET",
			contentType: "application/pdf; charset=utf-8",
			url: '/bin/getTaskDetailsFromProcessingInstance?url=' + encodeURIComponent(requestURL),
			async: false,
			cache: false,
			dataType: "json",
			success: function(response) {

				if (response.length > "0") {					
					var mydiv = document.getElementById("gridView");
					mydiv.innerHTML = "";
					for (i = 0; i < response.length; i++) {						
						var jsonData = response[i];                      	
						var linkSource = ((window.location.protocol) + "//" + window.location.hostname + ':' + window.location.port) + "/bin/getTaskAttachmentFromProcessingInstance?assetPath=" + encodeURIComponent(jsonData.path);				  
                      	
						var downloadLink = document.createElement("a");
						downloadLink.id = ("a".concat(i));						
						var fName = jsonData.fileName;                      	

						downloadLink.innerText = fName;
						var para = document.createElement("p");
						para.innerText = "";
						mydiv.appendChild(para);
						mydiv.appendChild(downloadLink);
						downloadLink.href = linkSource;
						downloadLink.download = fName;
						//downloadLink.click();

					}
					var breakLine = document.createElement("p");
					breakLine.innerText = "";
					var docDiv = document.getElementById("gridView");
					docDiv.appendChild(breakLine);
				}
			},
			error: function(error) {
				console.log("error block=" + error);
			}
		});
	//}
//}
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            getPdf();

function getPdf() {
    //console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, ' and'));
            jsonData.append('formPath', '/content/forms/af/parental-guardian-consent-form-for-use-of-campus-ai-services/parental-guardian-consent-form-for-use-of-campus-ai-services');
            jsonData.append('fileName', "(" + HiddenStudentName.value + ")" + "_" + Date.now());    
            //jsonData.append('fileName', "(" + Date.now() + ")");      
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
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_submit1608529416101_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_submit1608529416101_click0 = function (scope) {
    with(this) {
        with(scope) {
            aftiaDescCWID.value = HiddenStudentName.value + " " + studentCwid.value;
EmailSubject.value = "Test - Parental / Guardian Consent Form for Use of Campus AI Services -" + " " + HiddenStudentName.value + " " + studentCwid.value;
documentNameForAdobeSign.value = "Parental / Guardian Consent Form for Use of Campus AI Services";
studentEmail.value = "yjayaram@fullerton.edu";
guideBridge.submit();
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_submit1608529416101_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_submit1608529416101_click1 = function (scope) {
    with(this) {
        with(scope) {
            
if(parentEmail.value === null){
  	showErrorModal("Alert !", "Please enter the parent email");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].ParentInformationPanel[0].parentEmail[0]");
    }else if(parentEmail.value != confirmParentEmail.value){
        showErrorModal("Alert !", "Parent email does not match");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].ParentInformationPanel[0].confirmParentEmail[0]");
    }

else {
		
		submitAction();		
	}

function submitAction(){
aftiaDescCWID.value = HiddenStudentName.value + " " + studentCwid.value;
EmailSubject.value = "Test - Parental / Guardian Consent Form for Use of Campus AI Services -" + " " + HiddenStudentName.value + " " + studentCwid.value;
documentNameForAdobeSign.value = "Parental / Guardian Consent Form for Use of Campus AI Services";
studentEmail.value = "shreyas.manjunatha@thoughtfocus.com";
guideBridge.submit();
}
        }
	}
}
/**
 * @function parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_submit1608529416101_click2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
parental_guardian_consent_form_for_use_of_campus_ai_services_parental_guardian_consent_form_for_use_of_campus_ai_services.generated_submit1608529416101_click2 = function (scope) {
    with(this) {
        with(scope) {
            if(studentEmail.value === parentEmail.value){
        showErrorModal("Alert !", "Student Email and Parent email cannot be the same");
}
        }
	}
}
