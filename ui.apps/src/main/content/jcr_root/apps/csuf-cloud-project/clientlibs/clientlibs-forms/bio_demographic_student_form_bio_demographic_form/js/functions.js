/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.on("elementFocusChanged" , function(event, payload) {
     var component = payload.target;
    console.log("old elements's SOM Expression: " + payload.oldText);
     console.log("new elements's SOM Expression: " + payload.newText);
  var somExpression = payload.newText;
     if(somExpression.toLowerCase().includes("signatureandacknowledgement") || somExpression.toLowerCase().includes("submit1575264176703")){
       submit1575264176703.visible = true;
     } else{
       submit1575264176703.visible = false;
     }
     if(somExpression.toLowerCase().includes("signatureandacknowledgement") || somExpression.toLowerCase().includes("submit1575264176703")){
       button_7070418581735799992432.visible = false;
     } else{
       button_7070418581735799992432.visible = true;
     }
});
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            

guideBridge.on("elementFocusChanged", function(event, payload) {
  var casIDVal = CASID.value;
if (casIDVal !== null) {
    casIDVal = casIDVal.toString();
}

var cwidVal = CWID.value;
if (cwidVal !== null) {
    cwidVal = cwidVal.toString();
}
  
    var component = payload.target;
    var somExpression = payload.newText;
    if (somExpression.toLowerCase().includes("certificationofcorrectnesspanel")) {
        //debugger;
        if (FirstName.value === null || LastName.value === null || Email.value === null || DateofBirth.value === null) {
            var errorList = [];
            guideBridge.validate(errorList);
        } else if (CWID.value === null && CASID.value === null && NoIDCB.value === null) {
            showErrorModal("Alert!", "Enter CWID or CAS ID. If none, check the “No ID” checkbox.");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].StudentInformation[0].CASID[0]");
        } else if (casIDVal !== null && (casIDVal.length < 10 || casIDVal.length > 10)) {
            showErrorModal("Alert!", "Please ensure the CAS ID is 10 digit numeric characters.");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].StudentInformation[0].CASID[0]");
        }   else if (CWID.value === null && NoIDCB.value === null) {
            showErrorModal("Alert!", "Enter CWID or check the “No ID” checkbox.");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].StudentInformation[0].CWID[0]");
        } else if (cwidVal !== null && (cwidVal.length < 9 || cwidVal.length > 9)) {
            showErrorModal("Alert!", "Please ensure the CWID is 9 digit numeric characters.");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].StudentInformation[0].CWID[0]");
        }
    }

    if (somExpression.toLowerCase().includes("supportingdocuments")) {
        if (FirstName.value === null || LastName.value === null || Email.value === null || DateofBirth.value === null) {
            var errorList2 = [];
            guideBridge.validate(errorList2);
        } else if (CWID.value === null && CASID.value === null && NoIDCB.value === null) {
            showErrorModal("Alert!", "Enter CWID or CAS ID. If none, check the “No ID” checkbox.");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].StudentInformation[0].CASID[0]");
        } else if (casIDVal !== null && (casIDVal.length < 10 || casIDVal.length > 10)) {
            showErrorModal("Alert!", "Please ensure the CAS ID is 10 digit numeric characters.");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].StudentInformation[0].CASID[0]");
        } else if (cwidVal !== null && (cwidVal.length < 9 || cwidVal.length > 9)) {
            showErrorModal("Alert!", "Please ensure the CWID is 9 digit numeric characters.");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].StudentInformation[0].CWID[0]");
        } else if (NameCB.value === null && EmailCB.value === null && DOBCB.value === null && SSNCB.value === null && CASSIDCB.value === null) {
            showErrorModal("Alert!", "Please select at least one option under Change being requested");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].CertificationofCorrectnessPanel[0].NameCB[0]");
        } else if(EmailCB.value == "1" && EmailCBValue.value === null){
           var errorList21 = [];
            guideBridge.validate(errorList21);
        } else if(CASSIDCB.value == "1" && CASSIDCBValue.value === null){
          var errorList22 = [];
            guideBridge.validate(errorList22);
        }
    }
    if (somExpression.toLowerCase().includes("signatureandacknowledgement")) {
        if (FirstName.value === null || LastName.value === null || Email.value === null || DateofBirth.value === null) {
            var errorList3 = [];
            guideBridge.validate(errorList3);
        } else if (CWID.value === null && CASID.value === null && NoIDCB.value === null) {
            showErrorModal("Alert!", "Enter CWID or CAS ID. If none, check the “No ID” checkbox.");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].StudentInformation[0].CASID[0]");
        } else if (casIDVal !== null && (casIDVal.length < 10 || casIDVal.length > 10)) {
            showErrorModal("Alert!", "Please ensure the CAS ID is 10 digit numeric characters.");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].StudentInformation[0].CASID[0]");
        } else if (cwidVal !== null && (cwidVal.length < 9 || cwidVal.length > 9)) {
            showErrorModal("Alert!", "Please ensure the CWID is 9 digit numeric characters.");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].StudentInformation[0].CWID[0]");
        } else if (NameCB.value === null && EmailCB.value === null && DOBCB.value === null && SSNCB.value === null && CASSIDCB.value === null) {
            showErrorModal("Alert!", "Please select at least one option under Change being requested");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].CertificationofCorrectnessPanel[0].NameCB[0]");
        } else if ((NameCB.value == "1" || SSNCB.value == "1" || DOBCB.value == "1" || EmailCB.value == "1" || CASSIDCB.value == "1") && (supportDoc1.value === "" && supportDoc2.value === "" && supportDoc3.value === "" && supportDoc4.value === "")) {
            showErrorModal("Alert!", "Please attach supporting documents");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SupportingDocuments[0].supportDoc1[0]");
        }
    }
});
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_CaseID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_CaseID_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    $.ajax({

 

type: 'GET',

 

url:"/bin/getCaseID",

         

dataType: 'json',

         

success: function(myresponse){              

                 

                   CaseID.value = myresponse.CASEID;

                                      

},

});
}
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_NoIDCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_NoIDCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  CWID.value = "";
  CASID.value = "";
  CWID.enabled = false;
  CASID.enabled = false;
} else{
  CWID.enabled = true;
  CASID.enabled = true;
}
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_EmailCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_EmailCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  EmailCBValue.visible = true;
  EmailCBValue.mandatory = true;
} else{
  EmailCBValue.value = "";
  EmailCBValue.visible = false;
  EmailCBValue.mandatory = false;
}
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_EmailCBValue_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_EmailCBValue_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_SSNCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_SSNCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(SSNCB.value == "1"){
debugger;
  $("#signaturText").html('<p>I certify that the information provided on this form is true, complete, and accurate.  I also understand that I may have to update this information with other offices (financial aid, student business services, etc.) as this request will only update my admissions application.</p><p>USE OF SOCIAL SECURITY NUMBER<br>Applicants are required to include their correct Social Security Numbers (taxpayer identification numbers) in designated places on applications for admission pursuant to the authority contained in Section 41201, Title 5. California Code of Regulations, and Section 6109 of the Internal Revenue Code. The university uses the Social Security Number to identify records pertaining to the student, as well as to identify the student for purposes of financial aid eligibility and disbursement and repayment of financial aid and other debts payable to the institution. The Internal Revenue Service requires the university to file information returns that include the student’s Social Security Number and other information such as the amount paid for qualified tuition, related expenses, and interest on educational loans. The information is used by the IRS to help determine whether a student, or a person claiming a student as a dependent, may take a credit or deduction to reduce federal income taxes.<br>Disclosure of a student’s account number is required as a condition for payment of any university debt. The Social Security Number may be used as an account number (identifier) throughout the life of the student’s enrollment.</p>');
}else{
  $("#signaturText").html('<p>I certify that the information provided on this form is true, complete, and accurate.  I also understand that I may have to update this information with other offices (financial aid, student business services, etc.) as this request will only update my admissions application.</p>');
}
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_CASSIDCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_CASSIDCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(CASSIDCB.value == "1"){
  CASSIDCBValue.visible = true;
  CASSIDCBValue.mandatory = true;
} else{
  CASSIDCBValue.value = "";
  CASSIDCBValue.visible = false;
  CASSIDCBValue.mandatory = false;
}
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_CASSIDCBValue_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_CASSIDCBValue_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_SupportingDocuments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_SupportingDocuments_init0 = function (scope) {
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
 * @function bio_demographic_student_form_bio_demographic_form.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_supportDoc1_valueCommit0 = function (scope) {
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
 * @function bio_demographic_student_form_bio_demographic_form.generated_supportDoc1_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_supportDoc1_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
var filePath = supportDoc1.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc1.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc1.fileAttachment.value = fname;
}
}
if(supportDoc1.fileAttachment.value !== null){
	doc1.value = supportDoc1.fileAttachment.value;
}
else{
    doc1.value = "";
}
}
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_supportDoc2_valueCommit0 = function (scope) {
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
 * @function bio_demographic_student_form_bio_demographic_form.generated_supportDoc2_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_supportDoc2_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
var filePath = supportDoc2.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc2.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc2.fileAttachment.value = fname;
}
}
if(supportDoc2.fileAttachment.value !== null){
	doc2.value = supportDoc2.fileAttachment.value;
}
else{
    doc2.value = "";
}
}
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_supportDoc3_valueCommit0 = function (scope) {
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
 * @function bio_demographic_student_form_bio_demographic_form.generated_supportDoc3_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_supportDoc3_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
var filePath = supportDoc3.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc3.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc3.fileAttachment.value = fname;
}
}
if(supportDoc3.fileAttachment.value !== null){
	doc3.value = supportDoc3.fileAttachment.value;
}
else{
    doc3.value = "";
}
}
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_supportDoc4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_supportDoc4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc4.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(supportDoc4.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        supportDoc4.fileAttachment.value = doc2NewName;
    }
}
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_supportDoc4_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_supportDoc4_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
var filePath = supportDoc4.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc4.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc4.fileAttachment.value = fname;
}
}
if(supportDoc4.fileAttachment.value !== null){
	doc4.value = supportDoc4.fileAttachment.value;
}
else{
    doc4.value = "";
}
}
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_StudentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (this.value == 1) {
        if (FirstName.value !== null && LastName.value !== null) {
            var userValue;
            StudentSignature.value = FirstName.value + " " + LastName.value;
            StudentSignDate.value = getDateforAdaptiveForm();
            //StudentSignature.enabled = false;
            StudentSignDate.enabled = false;
        } else {
            showErrorModal("Alert!", "Please fill First Name, Last Name & all required fields before signing the form");
          this.value = "";
            StudentSignature.value = "";
            StudentSignDate.value = null;
        }
    } else {
        StudentSignature.value = "";
        StudentSignDate.value = null;
    }
}
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_StudentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_StudentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_StudentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_StudentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_button1735799979173_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_button1735799979173_click0 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.setFocus(null,'prevItemDeep',true);
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_button_7070418581735799992432_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_button_7070418581735799992432_click0 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.setFocus(null,'nextItemDeep',true);
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_button_7070418581735799992432_click1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_button_7070418581735799992432_click1 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.on("elementFocusChanged" , function(event, payload) {
     var component = payload.target;
    console.log("old elements's SOM Expression From Button Click: " + payload.oldText);
     console.log("new elements's SOM Expression From Button Click: " + payload.newText);
});
        }
	}
}
/**
 * @function bio_demographic_student_form_bio_demographic_form.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
bio_demographic_student_form_bio_demographic_form.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
var casIDVal = CASID.value;
if (casIDVal !== null) {
    casIDVal = casIDVal.toString();
}

var cwidVal = CWID.value;
if (cwidVal !== null) {
    cwidVal = cwidVal.toString();
}

if (FirstName.value === null || LastName.value === null || Email.value === null || DateofBirth.value === null) {
    var errorList = [];
    guideBridge.validate(errorList);
} else if (CWID.value === null && CASID.value === null && NoIDCB.value === null) {
    showErrorModal("Alert!", "Enter CWID or CAS ID. If none, check the “No ID” checkbox.");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].StudentInformation[0].CASID[0]");
} else if (casIDVal !== null && (casIDVal.length < 10 || casIDVal.length > 10)) {
    showErrorModal("Alert!", "Please ensure the CAS ID is 10 digit numeric characters.");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].StudentInformation[0].CASID[0]");
} else if (cwidVal !== null && (cwidVal.length < 9 || cwidVal.length > 9)) {
    showErrorModal("Alert!", "Please ensure the CWID is 9 digit numeric characters.");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].StudentInformation[0].CWID[0]");
} else if (NameCB.value === null && EmailCB.value === null && DOBCB.value === null && SSNCB.value === null && CASSIDCB.value === null) {
    showErrorModal("Alert!", "Please select at least one option under Change being requested");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].CertificationofCorrectnessPanel[0].NameCB[0]");
} else if ((NameCB.value == "1" || SSNCB.value == "1" || DOBCB.value == "1" || EmailCB.value == "1" || CASSIDCB.value == "1") && (supportDoc1.value === "" && supportDoc2.value === "" && supportDoc3.value === "" && supportDoc4.value === "")) {
    showErrorModal("Alert!", "Please attach supporting documents");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SupportingDocuments[0].supportDoc1[0]");
} else {
    guideBridge.submit();
}
        }
	}
}
