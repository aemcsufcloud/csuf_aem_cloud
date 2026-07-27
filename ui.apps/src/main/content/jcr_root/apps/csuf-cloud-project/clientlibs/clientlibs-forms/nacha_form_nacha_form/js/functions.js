/**
 * @function nacha_form_nacha_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
             if (StageIndicator.value == "ToReviewer") {
     ApproverCB.visible = false;
     ApproverID.visible = false;
    ApprovedTime.visible = false;
   ApproverComments.visible = false;
    ApproverAcknowledgementText.visible = false;
   SFTPActivityLog.visible = false;
   if(ApproverCB.value !== null){
     ApproverCB.visible = true;
     ApproverID.visible = true;
    ApprovedTime.visible = true;
   ApproverComments.visible = true;
    ApproverAcknowledgementText.visible = true;
     ApproverCB.enabled = false;
     ApproverID.enabled = false;
    ApprovedTime.enabled = false;
   ApproverComments.enabled = false;
   }
} else if (StageIndicator.value == "ToApprover") {
   ReviewerCB.enabled = false;
  ReviewerID.enabled = false;
  ReviewedTime.enabled = false;
  ReviewerComments.enabled = false;
  SFTPActivityLog.visible = false;
} else if(StageIndicator.value == "ToFaxError" || StageIndicator.value == "ToFax" || StageIndicator.value == "ToFinalReviewer"){
  MainPanel.enabled = false;
}
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToFaxError" || StageIndicator.value == "ToFax"){
   $.ajax({
        type: 'GET',
        url: "/bin/getNACHAData",
        data: {
            action: "SFTP_LOG_LOOKUP",
            caseId: caseId.value
        },
        dataType: 'json',
        success: function(response) {
          SFTPActivityLog.value = response[0].LOG;
        }
   });
}
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
             if (StageIndicator.value == "ToReviewer") {
     ApproverCB.visible = false;
     ApproverID.visible = false;
     ApprovedTime.visible = false;
     ApproverComments.visible = false;
     ApproverAcknowledgementText.visible = false;
     FaxConfirmationCB.visible = false;
     FaxConfirmationID.visible = false;
     FaxConfirmationTime.visible = false;
     FaxConfirmationComments.visible = false;
     FaxconfirmationAcknowledgementText.visible = false;
     SFTPActivityLog.visible = false;
   
   if(ApproverCB.value !== null){
     ApproverCB.visible = true;
     ApproverID.visible = true;
     ApprovedTime.visible = true;
     ApproverComments.visible = true;
     ApproverAcknowledgementText.visible = true;
     ApproverCB.enabled = false;
     ApproverID.enabled = false;
    ApprovedTime.enabled = false;
   ApproverComments.enabled = false;
   }
   
   if(FaxConfirmationCB.value !== null){
     FaxConfirmationCB.visible = true;
     FaxConfirmationID.visible = true;
     FaxConfirmationTime.visible = true;
     FaxConfirmationComments.visible = true;
     FaxconfirmationAcknowledgementText.visible = true;
     FaxConfirmationCB.enabled = false;
     FaxConfirmationID.enabled = false;
     FaxConfirmationTime.enabled = false;
     FaxConfirmationComments.enabled = false;
   }
     
} else if (StageIndicator.value == "ToApprover") {

     ReviewerCB.visible = false;
     ReviewerID.visible = false;
     ReviewedTime.visible = false;
     ReviewerComments.visible = false;
     ReviewerAcknowledgementText.visible = false;
     FaxConfirmationCB.visible = false;
     FaxConfirmationID.visible = false;
     FaxConfirmationTime.visible = false;
     FaxConfirmationComments.visible = false;
     FaxconfirmationAcknowledgementText.visible = false;
     SFTPActivityLog.visible = false;
   
   if(ReviewerCB.value !== null){
     ReviewerCB.visible = true;
     ReviewerID.visible = true;
     ReviewedTime.visible = true;
     ReviewerComments.visible = true;
     ReviewerAcknowledgementText.visible = true;
     ReviewerCB.enabled = false;
     ReviewerID.enabled = false;
     ReviewedTime.enabled = false;
     ReviewerComments.enabled = false;
   }


} else if (StageIndicator.value == "ToFax") {
  ApproverCB.enabled = false;
  ApproverID.enabled = false;
  ApprovedTime.enabled = false;
  ApproverComments.enabled = false;
  ReviewerCB.enabled = false;
  ReviewerID.enabled = false;
  ReviewedTime.enabled = false;
  ReviewerComments.enabled = false;
} else if(StageIndicator.value == "ToFaxError"){
   FaxConfirmationCB.visible = false;
     FaxConfirmationID.visible = false;
     FaxConfirmationTime.visible = false;
     FaxConfirmationComments.visible = false;
     FaxconfirmationAcknowledgementText.visible = false;
   MainPanel.enabled = false;
}
else if(StageIndicator.value == "ToFinalReviewer"){
  MainPanel.enabled = false;
}
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_TotalAmount_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_TotalAmount_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_ReviewerCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_ReviewerCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToReviewer" ){
	if (this.value == 1) {
	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
				ReviewerID.value = userValue;
                
                ReviewedTime.value = new Date().toLocaleString();
				//myresponse.SERVER_DATE;		
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});
			
				
	} else {
	     ReviewerID.value = "";
		ReviewedTime.value = "";
	}
}


        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_ReviewerID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_ReviewerID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_ReviewedTime_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_ReviewedTime_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_ApproverCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_ApproverCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToApprover"){
  this.mandatory = true;
}
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_ApproverCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_ApproverCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToApprover" ){
	if (this.value == 1) {
	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
				ApproverID.value = userValue;
                
                ApprovedTime.value = new Date().toLocaleString();
				//myresponse.SERVER_DATE;		
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});
			
				
	} else {
	     ApproverID.value = "";
		ApprovedTime.value = "";
	}
}


        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_ApproverID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_ApproverID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if(StageIndicator.value == "ToApprover"){
  this.mandatory = true;
}
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_ApprovedTime_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_ApprovedTime_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if(StageIndicator.value == "ToApprover"){
  this.mandatory = true;
}
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_FaxConfirmationCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_FaxConfirmationCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToFax" ){
	if (this.value == 1) {
	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
				FaxConfirmationID.value = userValue;              
                FaxConfirmationTime.value = new Date().toLocaleString();
				//myresponse.SERVER_DATE;		
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});
			
				
	} else {
	     FaxConfirmationID.value = "";
		 FaxConfirmationTime.value = "";
	}
}


        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_FaxConfirmationID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_FaxConfirmationID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_FaxConfirmationTime_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_FaxConfirmationTime_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_InitialFormSubmittedAttachments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_InitialFormSubmittedAttachments_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToReviewer" && this.value === null){
  workItemId = localStorage.getItem('workItemId');
        var requestURL = '/bin/getInboxItemDetails?action=TASK_ATTACHMENTS&workItemId=' + encodeURIComponent(workItemId);
        $.ajax({
            type: "GET",
            contentType: "application/text; charset=utf-8",
            url: '/bin/getTaskDetailsFromProcessingInstance?url=' + encodeURIComponent(requestURL),
            async: false,
            cache: false,
            dataType: "json",
            success: function(attachmentsArray) {
                files = (attachmentsArray);
              console.log(files);
InitialFormSubmittedAttachments.value = JSON.stringify(files);
            }
        });
}
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_ReviewerFormSubmittedAttachments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_ReviewerFormSubmittedAttachments_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToReviewer") {
    guideBridge.on("validationComplete", function(event, payload) {
        workItemId = localStorage.getItem('workItemId');
        var requestURL = '/bin/getInboxItemDetails?action=TASK_ATTACHMENTS&workItemId=' + encodeURIComponent(workItemId);
        $.ajax({
            type: "GET",
            contentType: "application/text; charset=utf-8",
            url: '/bin/getTaskDetailsFromProcessingInstance?url=' + encodeURIComponent(requestURL),
            async: false,
            cache: false,
            dataType: "json",
            success: function(attachmentsArray) {
                files = (attachmentsArray);
                var fileName = NACHAFileName.value;
                if (ApproverFormSubmittedAttachments.value === null) {
                    for (var i = 0; i < files.length; i++) {
                        var newFileName = files[i].fileName;
                        if (newFileName.toLowerCase() != fileName.toLowerCase()) {
                            if (ReviewerFormSubmittedAttachments.value === null) {
                                ReviewerFormSubmittedAttachments.value = newFileName;
                            } else if (ReviewerFormSubmittedAttachments.value === null) {
                                var reviewerInitialSubmitted = ReviewerFormSubmittedAttachments.value;
                                ReviewerFormSubmittedAttachments.value = reviewerInitialSubmitted + "~" + newFileName;
                            }
                        }
                    }
                } else if (ApproverFormSubmittedAttachments.value !== null) {
                    var approverSubmittedAttachments = ApproverFormSubmittedAttachments.value;
                    if (approverSubmittedAttachments.includes("~")) {
                        var arr = approverSubmittedAttachments.split("~");
                      for (var k = 0; k < files.length; k++) {
                            var newFileName3 = files[k].fileName;
                            if (newFileName3.toLowerCase() != fileName.toLowerCase() && newFileName3.toLowerCase() != approverSubmittedAttachments.toLowerCase()) {
                                if (ReviewerFormSubmittedAttachments.value === null) {
                                    ReviewerFormSubmittedAttachments.value = newFileName3;
                                } else if (ReviewerFormSubmittedAttachments.value === null) {
                                    var reviewerInitialSubmitted3 = ReviewerFormSubmittedAttachments.value;
                                    if (!reviewerInitialSubmitted3.toLowerCase().includes(fileName.toLowerCase())) {
                                        ReviewerFormSubmittedAttachments.value = reviewerInitialSubmitted3 + "~" + newFileName3;
                                    }
                                }
                            }
                        }
                    } else {
                        for (var j = 0; j < files.length; j++) {
                            var newFileName2 = files[j].fileName;
                            if (newFileName2.toLowerCase() != fileName.toLowerCase() && newFileName2.toLowerCase() != approverSubmittedAttachments.toLowerCase()) {
                                if (ReviewerFormSubmittedAttachments.value === null) {
                                    ReviewerFormSubmittedAttachments.value = newFileName2;
                                } else if (ReviewerFormSubmittedAttachments.value === null) {
                                    var reviewerInitialSubmitted2 = ReviewerFormSubmittedAttachments.value;
                                    if (!reviewerInitialSubmitted2.toLowerCase().includes(fileName.toLowerCase())) {
                                        ReviewerFormSubmittedAttachments.value = reviewerInitialSubmitted2 + "~" + newFileName2;
                                    }
                                }
                            }
                        }
                    }
                }
                ReviewerFormSubmittedAttachments.value = JSON.stringify(files);
            }
        });

    });
}
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_ReviewerFormSubmittedAttachments_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_ReviewerFormSubmittedAttachments_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToReviewer") {
  debugger;
    guideBridge.on("validationComplete", function(event, payload) {
        workItemId = localStorage.getItem('workItemId');
        var requestURL = '/bin/getInboxItemDetails?action=TASK_ATTACHMENTS&workItemId=' + encodeURIComponent(workItemId);
        $.ajax({
            type: "GET",
            contentType: "application/text; charset=utf-8",
            url: '/bin/getTaskDetailsFromProcessingInstance?url=' + encodeURIComponent(requestURL),
            async: false,
            cache: false,
            dataType: "json",
            success: function(attachmentsArray) {
              debugger;
                filesArray = (attachmentsArray);
                var nachaFileName = NACHAFileName.value;
                var approverFileName = ApproverFormSubmittedAttachments.value;

                var excludedFiles = [];
                if (nachaFileName) {
                    excludedFiles.push(nachaFileName);
                }
                if (approverFileName !== null) {
                    if (approverFileName.includes('~')) {
                        excludedFiles = excludedFiles.concat(approverFileName.split("~"));
                    } else {
                        excludedFiles.push(approverFileName);
                    }
                }

                var excludedFilesLower = excludedFiles.map(function(file) {
                    return file.toLowerCase();
                });
                var result = [];
                for (var i = 0; i < filesArray.length; i++) {
                    var file = filesArray[i];
                    if (excludedFilesLower.indexOf(file.fileName.toLowerCase()) === -1) {
                        result.push(file.fileName);
                    }
                }

                var finalResult = result.join('~');
               ReviewerFormSubmittedAttachments.value = finalResult;
                console.log(finalResult);
            }
        });

    });
}
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_ApproverFormSubmittedAttachments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_ApproverFormSubmittedAttachments_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToApprover") {
  debugger;
    guideBridge.on("validationComplete", function(event, payload) {
        workItemId = localStorage.getItem('workItemId');
        var requestURL = '/bin/getInboxItemDetails?action=TASK_ATTACHMENTS&workItemId=' + encodeURIComponent(workItemId);
        $.ajax({
            type: "GET",
            contentType: "application/text; charset=utf-8",
            url: '/bin/getTaskDetailsFromProcessingInstance?url=' + encodeURIComponent(requestURL),
            async: false,
            cache: false,
            dataType: "json",
            success: function(attachmentsArray) {
              debugger;
                filesArray = (attachmentsArray);
                var nachaFileName = NACHAFileName.value;
                var reviewerFileName = ReviewerFormSubmittedAttachments.value;


                var excludedFiles = [];
                if (nachaFileName) {
                    excludedFiles.push(nachaFileName);
                }
                if (reviewerFileName !== null) {
                    if (reviewerFileName.includes('~')) {
                        excludedFiles = excludedFiles.concat(reviewerFileName.split("~"));
                    } else {
                        excludedFiles.push(reviewerFileName);
                    }
                }

                var excludedFilesLower = excludedFiles.map(function(file) {
                    return file.toLowerCase();
                });
                var result = [];
                for (var i = 0; i < filesArray.length; i++) {
                    var file = filesArray[i];
                    if (excludedFilesLower.indexOf(file.fileName.toLowerCase()) === -1) {
                        result.push(file.fileName);
                    }
                }

                var finalResult = result.join('~');
                ApproverFormSubmittedAttachments.value = finalResult;
                console.log(finalResult);
            }
        });

    });
}
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_FaxErrorFormSubmittedAttachments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_FaxErrorFormSubmittedAttachments_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToFaxError") {
  debugger;
    guideBridge.on("validationComplete", function(event, payload) {
        workItemId = localStorage.getItem('workItemId');
        var requestURL = '/bin/getInboxItemDetails?action=TASK_ATTACHMENTS&workItemId=' + encodeURIComponent(workItemId);
        $.ajax({
            type: "GET",
            contentType: "application/text; charset=utf-8",
            url: '/bin/getTaskDetailsFromProcessingInstance?url=' + encodeURIComponent(requestURL),
            async: false,
            cache: false,
            dataType: "json",
            success: function(attachmentsArray) {
              debugger;
                filesArray = (attachmentsArray);
                var nachaFileName = NACHAFileName.value;
                var reviewerFileName = ReviewerFormSubmittedAttachments.value;
                var approverFileName = ApproverFormSubmittedAttachments.value;

                var excludedFiles = [];
                if (nachaFileName) {
                    excludedFiles.push(nachaFileName);
                }
                if (reviewerFileName !== null) {
                    if (reviewerFileName.includes('~')) {
                        excludedFiles = excludedFiles.concat(reviewerFileName.split("~"));
                    } else {
                        excludedFiles.push(reviewerFileName);
                    }
                }
                if (approverFileName !== null) {
                    if (approverFileName.includes('~')) {
                        excludedFiles = excludedFiles.concat(approverFileName.split("~"));
                    } else {
                        excludedFiles.push(approverFileName);
                    }
                }

                var excludedFilesLower = excludedFiles.map(function(file) {
                    return file.toLowerCase();
                });
                var result = [];
                for (var i = 0; i < filesArray.length; i++) {
                    var file = filesArray[i];
                    if (excludedFilesLower.indexOf(file.fileName.toLowerCase()) === -1) {
                        result.push(file.fileName);
                    }
                }

                var finalResult = result.join('~');
                FaxErrorFormSubmittedAttachments.value = finalResult;
                console.log(finalResult);
            }
        });

    });
}
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_FaxConfirmationFormSubmittedAttachments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_FaxConfirmationFormSubmittedAttachments_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToFax") {
  debugger;
    guideBridge.on("validationComplete", function(event, payload) {
        workItemId = localStorage.getItem('workItemId');
        var requestURL = '/bin/getInboxItemDetails?action=TASK_ATTACHMENTS&workItemId=' + encodeURIComponent(workItemId);
        $.ajax({
            type: "GET",
            contentType: "application/text; charset=utf-8",
            url: '/bin/getTaskDetailsFromProcessingInstance?url=' + encodeURIComponent(requestURL),
            async: false,
            cache: false,
            dataType: "json",
            success: function(attachmentsArray) {
              debugger;
                filesArray = (attachmentsArray);
                var nachaFileName = NACHAFileName.value;
                var reviewerFileName = ReviewerFormSubmittedAttachments.value;
                var approverFileName = ApproverFormSubmittedAttachments.value;
                var faxErrorFileName = FaxErrorFormSubmittedAttachments.value;
                var finalReviewerFileName = FinalReviewerFormSubmittedAttachments.value;

                var excludedFiles = [];
                if (nachaFileName) {
                    excludedFiles.push(nachaFileName);
                }
                if (reviewerFileName !== null) {
                    if (reviewerFileName.includes('~')) {
                        excludedFiles = excludedFiles.concat(reviewerFileName.split("~"));
                    } else {
                        excludedFiles.push(reviewerFileName);
                    }
                }
                if (approverFileName !== null) {
                    if (approverFileName.includes('~')) {
                        excludedFiles = excludedFiles.concat(approverFileName.split("~"));
                    } else {
                        excludedFiles.push(approverFileName);
                    }
                }
               if (faxErrorFileName !== null) {
                    if (faxErrorFileName.includes('~')) {
                        excludedFiles = excludedFiles.concat(faxErrorFileName.split("~"));
                    } else {
                        excludedFiles.push(faxErrorFileName);
                    }
                }
              if (finalReviewerFileName !== null) {
                    if (finalReviewerFileName.includes('~')) {
                        excludedFiles = excludedFiles.concat(finalReviewerFileName.split("~"));
                    } else {
                        excludedFiles.push(finalReviewerFileName);
                    }
                }

                var excludedFilesLower = excludedFiles.map(function(file) {
                    return file.toLowerCase();
                });
                var result = [];
                for (var i = 0; i < filesArray.length; i++) {
                    var file = filesArray[i];
                    if (excludedFilesLower.indexOf(file.fileName.toLowerCase()) === -1) {
                        result.push(file.fileName);
                    }
                }

                var finalResult = result.join('~');
                FaxConfirmationFormSubmittedAttachments.value = finalResult;
                console.log(finalResult);
            }
        });

    });
}
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_FinalReviewerFormSubmittedAttachments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_FinalReviewerFormSubmittedAttachments_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToFinalReviewer") {
  debugger;
    guideBridge.on("validationComplete", function(event, payload) {
        workItemId = localStorage.getItem('workItemId');
        var requestURL = '/bin/getInboxItemDetails?action=TASK_ATTACHMENTS&workItemId=' + encodeURIComponent(workItemId);
        $.ajax({
            type: "GET",
            contentType: "application/text; charset=utf-8",
            url: '/bin/getTaskDetailsFromProcessingInstance?url=' + encodeURIComponent(requestURL),
            async: false,
            cache: false,
            dataType: "json",
            success: function(attachmentsArray) {
              debugger;
                filesArray = (attachmentsArray);
                var nachaFileName = NACHAFileName.value;
                var reviewerFileName = ReviewerFormSubmittedAttachments.value;
                var approverFileName = ApproverFormSubmittedAttachments.value;
                var faxErrorFileName = FaxErrorFormSubmittedAttachments.value;
                var faxConfirmationFileName = FaxConfirmationFormSubmittedAttachments.value;

                var excludedFiles = [];
                if (nachaFileName) {
                    excludedFiles.push(nachaFileName);
                }
                if (reviewerFileName !== null) {
                    if (reviewerFileName.includes('~')) {
                        excludedFiles = excludedFiles.concat(reviewerFileName.split("~"));
                    } else {
                        excludedFiles.push(reviewerFileName);
                    }
                }
                if (approverFileName !== null) {
                    if (approverFileName.includes('~')) {
                        excludedFiles = excludedFiles.concat(approverFileName.split("~"));
                    } else {
                        excludedFiles.push(approverFileName);
                    }
                }
               if (faxErrorFileName !== null) {
                    if (faxErrorFileName.includes('~')) {
                        excludedFiles = excludedFiles.concat(faxErrorFileName.split("~"));
                    } else {
                        excludedFiles.push(faxErrorFileName);
                    }
                }
              if (faxConfirmationFileName !== null) {
                    if (faxConfirmationFileName.includes('~')) {
                        excludedFiles = excludedFiles.concat(faxConfirmationFileName.split("~"));
                    } else {
                        excludedFiles.push(faxConfirmationFileName);
                    }
                }

                var excludedFilesLower = excludedFiles.map(function(file) {
                    return file.toLowerCase();
                });
                var result = [];
                for (var i = 0; i < filesArray.length; i++) {
                    var file = filesArray[i];
                    if (excludedFilesLower.indexOf(file.fileName.toLowerCase()) === -1) {
                        result.push(file.fileName);
                    }
                }

                var finalResult = result.join('~');
                FinalReviewerFormSubmittedAttachments.value = finalResult;
                console.log(finalResult);
            }
        });

    });
}
        }
	}
}
/**
 * @function nacha_form_nacha_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
nacha_form_nacha_form.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/nacha-form/nacha-form');
            jsonData.append('fileName', 'Nacha - '+caseId.value);          
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
