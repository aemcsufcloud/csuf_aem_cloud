/**
 * @function name_change_form_name_change_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    CWID.enabled = false;
    InitiatedDate.enabled = false;
    DateofBirth.enabled = false;
    StudentLastName.enabled = false;
    StudentFirstName.enabled = false;
    generateDOR.visible = false;
    RecordSignaturePanel.visible = false;
} else if (StageIndicator.value == "ToRecords") {
    StudentInformation.enabled = false;
    StudentSignaturePanel.enabled = false;
}
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(myresponse) {
            var userId = myresponse.userId;
            userId = 'ariadnanunez';
            workflow_initiator.value = userId;
            $.ajax({
                type: 'GET',
                url: "/bin/getNameChangeFormStudentData",
                data: {
                    action: "STUDENT_USER_ID_LOOKUP",
                    userid: userId
                },
                dataType: 'json',
                success: function(result) {
                    if (result.length >= 1) {
                      CWID.value = result[0].EMPLID;
                      StudentFirstName.value = result[0].FIRST_NAME;
                      StudentLastName.value = result[0].LAST_NAME;
                      Telephone.value = result[0].CELL_PHONE; 
                      StudentOldFullName.value = result[0].NAME;
                      if(result[0].DOB !== ""){
                        DateofBirth.value = convertDOB(result[0].DOB,"dd-MMM-yyyy", "MM/dd/yyyy");
                      }else{
                        DateofBirth.enabled = true;
                      }
                       gifModal.style.display = "none";
                    } else {
                        gifModal.style.display = "none";
                        showErrorModal("Alert!", "No matching records found");
                    }
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
        }
    });
}

function convertDOB(inputDate) {
    try {
        var monthMap = {
            'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04', 
            'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08', 
            'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
        };
        
        var parts = inputDate.split('-');
        var day = parts[0];
        var month = parts[1].toUpperCase();
        var year = parts[2];
        
        var monthNumber = monthMap[month];
        
        return year + '-' + monthNumber + '-' + day.padStart(2, '0');
        
    } catch (err) {
        console.error("DOB conversion error:", err);
        return inputDate;
    }
}
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    debugger;
    var students = [{
            cwid: "AA0014",
            firstName: "William",
            lastName: "Martin",
            middleName: "",
            dob: "2000-05-24",
            phoneNo: "626/232-2453"
        },
        {
            cwid: "AA0016",
            firstName: "Christina",
            lastName: "Neal",
            middleName: "",
            dob: "2006-01-17",
            phoneNo: "626/232-2223"
        },
        {
            cwid: "AD1084",
            firstName: "Andrew",
            lastName: "Conyer",
            middleName: "",
            dob: "2002-02-17",
            phoneNo: "626/234-7865"
        },
        {
            cwid: "AD1085",
            firstName: "Jane",
            lastName: "Parker",
            middleName: "",
            dob: "2000-12-25",
            phoneNo: "627/235-2358"
        },
        {
            cwid: "AD2000",
            firstName: "Paul",
            lastName: "Reynolds",
            middleName: "L",
            dob: "2001-11-01",
            phoneNo: "622/235-2565"
        },
        {
            cwid: "AD2001",
            firstName: "Carol",
            lastName: "Reynolds",
            middleName: "Jane",
            dob: "2002-01-02",
            phoneNo: "622/235-1234"
        },
        {
            cwid: "AD2002",
            firstName: "Patricia",
            lastName: "Cassidy",
            middleName: "Anne",
            dob: "2003-10-15",
            phoneNo: "622/444-1587"
        },
        {
            cwid: "AD5002",
            firstName: "Shari",
            lastName: "Kirkland",
            middleName: "",
            dob: "2006-10-06",
            phoneNo: "622/158-1599"
        },
        {
            cwid: "AD5003",
            firstName: "Molly",
            lastName: "Smith",
            middleName: "",
            dob: "2004-03-18",
            phoneNo: "415-728-3649"
        },
        {
            cwid: "AD5009",
            firstName: "Alexander",
            lastName: "Harris",
            middleName: "",
            dob: "2001-11-27",
            phoneNo: "312-684-9571"
        },
        {
            cwid: "AD5022",
            firstName: "Doug",
            lastName: "Smith",
            middleName: "",
            dob: "1998-07-09",
            phoneNo: "646-531-8427"
        },
        {
            cwid: "AD5023",
            firstName: "Jane",
            lastName: "Smith",
            middleName: "",
            dob: "2005-01-14",
            phoneNo: "713-427-6853"
        },
        {
            cwid: "AD5024",
            firstName: "John",
            lastName: "Smith",
            middleName: "",
            dob: "2003-09-22",
            phoneNo: "202-596-7318"
        }
    ];

    if (students.length > 0) {

        var randomIndex = Math.floor(Math.random() * students.length);
        var selectedStudent = students[randomIndex];

        CWID.value = selectedStudent.cwid;
        StudentFirstName.value = selectedStudent.firstName;
        StudentLastName.value = selectedStudent.lastName;
        StudentMiddleName.value = selectedStudent.middleName;
        Telephone.value = selectedStudent.phoneNo;
        StudentOldFullName.value = selectedStudent.firstName + " " + selectedStudent.lastName;
        DateofBirth.value = selectedStudent.dob;
    }
}
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_guideRootPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_guideRootPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    debugger;
     var students = [{
            cwid: "889211111",
            firstName: "Shari",
            lastName: "Cassidy",
            middleName: "Anne",
            dob: "2000-05-24",
            phoneNo: "626/232-2453"
        },
        {
            cwid: "889211112",
            firstName: "Doug",
            lastName: "Harris",
            middleName: "R",
            dob: "2006-01-17",
            phoneNo: "626/232-2223"
        },
        {
            cwid: "889211113",
            firstName: "Alexander",
            lastName: "Reynolds",
            middleName: "",
            dob: "2002-02-17",
            phoneNo: "626/234-7865"
        },
        {
            cwid: "889211114",
            firstName: "Patricia",
            lastName: "Smith",
            middleName: "A",
            dob: "2000-12-25",
            phoneNo: "627/235-2358"
        },
        {
            cwid: "889211115",
            firstName: "Andrew",
            lastName: "Alexander",
            middleName: "John",
            dob: "2001-11-01",
            phoneNo: "622/235-2565"
        },
        {
            cwid: "889211116",
            firstName: "Bismah",
            lastName: "Recchi",
            middleName: "",
            dob: "2002-01-02",
            phoneNo: "622/235-1234"
        },
        {
            cwid: "889211117",
            firstName: "Isaac",
            lastName: "San Sulpacio",
            middleName: "",
            dob: "2003-10-15",
            phoneNo: "622/444-1587"
        },
        {
            cwid: "889211118",
            firstName: "Mariah",
            lastName: "Nevers",
            middleName: "",
            dob: "2006-10-06",
            phoneNo: "622/158-1599"
        },
        {
            cwid: "889211119",
            firstName: "Ashna",
            lastName: "Kim",
            middleName: "Ava",
            dob: "2004-03-18",
            phoneNo: "415-728-3649"
        },
        {
            cwid: "889211120",
            firstName: "Amy",
            lastName: "Hoffman",
            middleName: "Paul",
            dob: "2001-11-27",
            phoneNo: "312-684-9571"
        }
    ];

    if (students.length > 0) {

        var randomIndex = Math.floor(Math.random() * students.length);
        var selectedStudent = students[randomIndex];

        CWID.value = selectedStudent.cwid;
        StudentFirstName.value = selectedStudent.firstName;
        StudentLastName.value = selectedStudent.lastName;
        StudentMiddleName.value = selectedStudent.middleName;
        Telephone.value = selectedStudent.phoneNo;
        StudentOldFullName.value = selectedStudent.firstName + " " + selectedStudent.lastName;
        DateofBirth.value = selectedStudent.dob;
    }
}
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_caseId_init0 = function (scope) {
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
this.enabled = false;
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_InitiatedDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_InitiatedDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
        InitiatedDate.value = getDateforAdaptiveForm();
}

	  this.enabled = false;
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_SupportingDocuments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_SupportingDocuments_init0 = function (scope) {
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
 * @function name_change_form_name_change_form.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_supportDoc1_valueCommit0 = function (scope) {
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
    if (extension !== "pdf" && extension !== "jpeg" && extension !== "jpg" && extension !== "png" && extension !== "tiff" ) {
        supportDoc1.fileAttachment.value = null;
        showErrorModal("Alert !", "Please upload a supported file");
    }
    if (this.value !== null) {
        supDocAttachText.visible = false;
    }
}
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_supportDoc2_valueCommit0 = function (scope) {
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
    if (extension !== "pdf" && extension !== "jpeg" && extension !== "jpg" && extension !== "png" && extension !== "tiff" ) {
        supportDoc2.fileAttachment.value = null;
        showErrorModal("Alert !", "Please upload a supported file");
    }
    if (this.value !== null) {
        supDocAttachText.visible = false;
    }
}
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_supportDoc3_valueCommit0 = function (scope) {
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
    if (extension !== "pdf" && extension !== "jpeg" && extension !== "jpg" && extension !== "png" && extension !== "tiff" ) {
        supportDoc3.fileAttachment.value = null;
        showErrorModal("Alert !", "Please upload a supported file");
    }
    if (this.value !== null) {
        supDocAttachText.visible = false;
    }
}
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_StudentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (this.value == 1) {
        var userValue;
        $.ajax({
            type: 'GET',

            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                StudentSignature.value = StudentOldFullName.value;
                StudentSignatureDate.value = myresopnse.SERVER_DATE;

            },
            error: function(error) {
                alert("error block=" + error);
            }
        });

        StudentSignature.enabled = false;
        StudentSignatureDate.enabled = false;


    } else {
        StudentSignature.value = "";
        StudentSignatureDate.value = null;
    }
}
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_StudentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_StudentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_StudentSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_StudentSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_RecordsCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_RecordsCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToRecords" ){
	if (this.value == 1) {
	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
				RecordsSignature.value = userValue;
				RecordsSignatureDate.value = myresponse.SERVER_DATE;
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});
			
			RecordsSignature.enabled = false;       
			RecordsSignatureDate.enabled = false; 
				
	} else {
	     RecordsSignature.value = "";
		 RecordsSignatureDate.value = "";
	}
}


        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_RecordsSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_RecordsSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_RecordsSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_RecordsSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_PSAPIStatus_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_PSAPIStatus_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value !== null){
  var URL = "http://cs92demo.sparient.com:8000/PSIGW/RESTListeningConnector/PSFT_CS/SP_LEGAL_NAME_CHANGE_STS.v1/caseId="+caseId.value+"/cwid="+CWID.value;
  var requestUrl = "/bin/nameChangePSStatus?caseId="+caseId.value+"&cwid="+CWID.value;

 $.ajax({
                        type: "GET",
                        url: '/bin/getTaskDetailsFromProcessingInstance?url=' + encodeURIComponent(requestUrl),
                        async: true,
                        cache: false,
                        dataType: "text",
                        success: function(resp) {
                          
                            debugger;
                          var obj = JSON.parse(resp);
                          console.log(obj);
                          PSAPIStatus.value = obj.Status+" - "+obj.Description;
                        },
                        error: function(resp, xhr, error, errorThrown) {
                            console.log("Error while retrieving the data");
                        }
                    });
}
        }
	}
}
/**
 * @function name_change_form_name_change_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_generateDOR_click0 = function (scope) {
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
            jsonData.append('formPath', '/content/forms/af/name-change-form/name-change-form');
            jsonData.append('fileName', 'Name Change Form');          
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
 * @function name_change_form_name_change_form.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
name_change_form_name_change_form.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    aftiaDescCWID.value = StudentOldFullName.value + " " + CWID.value;
    EmailSubject.value = "Test - Name Change Form - " + CWID.value;
}

StudentEmail.value = "c-jbhat@Fullerton.edu";
guideBridge.submit();
        }
	}
}
