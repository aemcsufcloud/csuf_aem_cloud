/**
 * @function student_bio_information_student_bio_information.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            
var typeFlag = "";
if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            var userValue = response.userId;
           userValue = "gys";
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
        url: "/bin/getVerificationRequestData",
        data: {
            action: "VERIFICATION_USER_DETAILS",
            userID: userValue
        },
        dataType: 'json',
        success: function(response) {
            if (response.length >= 1) {
                CWID_SSN.value = response[0].EMPLID;
                FirstName.value = response[0].FIRST_NAME;
                LastName.value = response[0].LAST_NAME;
                MiddleName.value = response[0].MIDDLE_NAME;
                StudentUserId.value = response[0].USERID;
                //PhoneNo.value = response[0].HOME_PHONE;
              //  Email.value = response[0].PREF_EMAIL; 
                // Convert DOB to mm/dd/yyyy format
                var dob = new Date(response[0].DOB);

                 var month = (dob.getMonth() + 1 < 10 ? '0' : '') + (dob.getMonth() + 1);
              var day = (dob.getDate() < 10 ? '0' : '') + dob.getDate();
                var year = dob.getFullYear();
               var formattedDOB = (year + "-" + month + "-" + day);
               DOB.value = formattedDOB;
               //Email.value = "smartinez@FULLERTON.EDU";
               Email.value = "yjayaram@fullerton.edu";
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
 * @function student_bio_information_student_bio_information.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value == null){
  debugger;
    $.ajax({
        type: 'GET',
        url: "/bin/getStudentBioInfoData",
        data: {
            action: "STUDENT_BIO_INFO_DETAILS",
            formID: caseId
        },
        dataType: 'json',
        success: function(response) {
 debugger;
            if (response.length >= 1) {  
              
              showErrorModal("Alert!", "Success");
            } else {
               // showErrorModal("Alert!", "No records found");
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
 * @function student_bio_information_student_bio_information.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  RecordsSignaturePanel.visible = false;
} else{
  StudentInformation.enabled = false;
  StudentSignaturePanel.enabled = false;
}
        }
	}
}
/**
 * @function student_bio_information_student_bio_information.generated_CaseID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_CaseID_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    $.ajax({

 

type: 'GET',

 

url:"/bin/getCaseID",

         

dataType: 'json',

         

success: function(myresponse){              

                 

                   caseId.value = myresponse.CASEID;

                                      

},

});
}
        }
	}
}
/**
 * @function student_bio_information_student_bio_information.generated_CWID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_CWID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_bio_information_student_bio_information.generated_FirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_FirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_bio_information_student_bio_information.generated_LastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_LastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_bio_information_student_bio_information.generated_Email_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_Email_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_bio_information_student_bio_information.generated_PhoneNumber_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_PhoneNumber_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function student_bio_information_student_bio_information.generated_DateofBirth_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_DateofBirth_init0 = function (scope) {
    with(this) {
        with(scope) {
             this.enabled = false;

        }
	}
}
/**
 * @function student_bio_information_student_bio_information.generated_DateofBirth_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_DateofBirth_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
	  this.enabled = false;

  DOB.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function student_bio_information_student_bio_information.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_StudentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value === null){
	if (this.value == 1) {
	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
                StudentFullName.value = FirstName.value+ " " +LastName.value;
                StudentSignX.value = FirstName.value+ " " +LastName.value;
				//StudentName.value = StudentFullName.value;
				StudentSignatureDate.value = myresponse.SERVER_DATE;			
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});
			
			//StudentFullName.enabled = false; 
            StudentSignX.enabled = false; 
			StudentSignatureDate.enabled = false; 
				
	} else {
		StudentFullName.value = "";
        StudentSignX.enabled = ""; 
		StudentSignatureDate.value = "";	   
	}
}
        }
	}
}
/**
 * @function student_bio_information_student_bio_information.generated_StudentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_StudentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function student_bio_information_student_bio_information.generated_StudentComment_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_StudentComment_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible=false;
        }
	}
}
/**
 * @function student_bio_information_student_bio_information.generated_RecordsCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_RecordsCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToRecords"){
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				RecordsSignature.value = userValue;
				RecordsSignDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
	} else {
		RecordsSignature.value = "";
		RecordsSignDate.value = "";
	}
}
        }
	}
}
/**
 * @function student_bio_information_student_bio_information.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
getPdf();
/*if (AidYear.value !== null) {
    getPdf();
}else{
  alert("Please fill all the required fields");
      showErrorModal("Alert!", "Please Select Aid Year");
   }*/

function getPdf() {
    console.log("in view pdf");
   debugger;
    window.guideBridge.getDataXML({
        success: function(result) {
           console.log("in view pdf="+result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/student-bio-information/student-bio-information');
            jsonData.append('fileName', FirstName.value + "_"+LastName.value);          
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
 * @function student_bio_information_student_bio_information.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_bio_information_student_bio_information.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.submit();
    

        }
	}
}
