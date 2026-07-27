/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.on("elementFocusChanged" , function(event, payload) {
     var component = payload.target;
   /*  console.log("old elements's SOM Expression: " + payload.oldText);
     console.log("new elements's SOM Expression: " + payload.newText);*/
  var somExpression = payload.newText;
     if(somExpression.toLowerCase().includes("signatureandacknowledgement") || somExpression.toLowerCase().includes("submit1607673526985")){
      // alert('hurray');
       submit1607673526985.visible = true;
     } else{
      // alert('nah');
       submit1607673526985.visible = false;
     }
});
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_CaseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_CaseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if(StageIndicator.value === null){
    $.ajax({

      type: 'GET', 
      url:"/bin/getCaseID",
      dataType: 'json',

      success: function(myresponse){            
        CaseId.value = myresponse.CASEID;

      	}
	}); 	
}
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_NoIDCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_NoIDCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  CWID.value = "";
  CWID.enabled = false;
} else{
  CWID.enabled = true;
}
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason1.value == "1"){
  AppealReason2.value = "";
  AppealReason3.value = "";
   AppealReason4.value = "";
   AppealReason5.value = "";
   AppealReason6.value = ""; 
   OtherText.value = "";
   AppealReason7.enabled = false;
}
}
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason2.value == "1"){
  AppealReason1.value = "";
  AppealReason3.value = "";
   AppealReason4.value = "";
   AppealReason5.value = "";
   AppealReason6.value = ""; 
     OtherText.value = "";
   AppealReason7.enabled = false;
}
}
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason3.value == "1"){
  AppealReason2.value = "";
  AppealReason1.value = "";
   AppealReason4.value = "";
   AppealReason5.value = "";
   AppealReason6.value = ""; 
    OtherText.value = "";
   AppealReason7.enabled = false;
}
}
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason4.value == "1"){
  AppealReason2.value = "";
  AppealReason3.value = "";
   AppealReason1.value = "";
   AppealReason5.value = "";
   AppealReason6.value = ""; 
   OtherText.value = "";
   AppealReason7.enabled = false;
}
}
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason5.value == "1"){
  AppealReason1.value = "";
  AppealReason2.value = "";
   AppealReason3.value = "";
   AppealReason4.value = "";
   AppealReason6.value = ""; 
    OtherText.value = "";
   AppealReason7.enabled = false;
}
}
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason5_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason5_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  FeeText.visible = true;
  FeeText.enabled = true;
} else{
   FeeText.visible = false;
  FeeText.enabled = false;
}
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason6_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason6_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason6.value == "1"){
  AppealReason1.value = "";
  AppealReason2.value = "";
   AppealReason3.value = "";
   AppealReason4.value = "";
   AppealReason5.value = ""; 
     OtherText.value = "";
   AppealReason7.enabled = false;
}
}
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_FeeText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_FeeText_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_OtherText_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_OtherText_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(this.value == "1"){
  AppealReason2.value = "";
  AppealReason3.value = "";
  AppealReason4.value = "";
  AppealReason5.value = "";
  AppealReason6.value = ""; 
  AppealReason1.value = "";
}
}
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_OtherText_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_OtherText_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  AppealReason7.visible = true;
  AppealReason7.enabled = true;
} else{
  AppealReason7.visible = false;
  AppealReason7.enabled = false;
}
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason7_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_AppealReason7_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_supportingDocs_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_supportingDocs_init0 = function (scope) {
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
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_UnofficialTranscriptDoc_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_UnofficialTranscriptDoc_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var filePath = UnofficialTranscriptDoc.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  UnofficialTranscriptDoc.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  UnofficialTranscriptDoc.fileAttachment.value = fname;
}
}
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_supportDoc1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
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
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_supportDoc2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
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
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_supportDoc3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
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
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_supportDoc4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_supportDoc4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
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
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_supportDoc5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_supportDoc5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var filePath = supportDoc5.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc5.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc5.fileAttachment.value = fname;
}
}
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_CertifyCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_CertifyCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (this.value == 1) {
        if (FirstName.value !== null && LastName.value !== null) {
            var userValue;
            StudentSignature.value = FirstName.value + " " + LastName.value;
            StudentSignDate.value = getDateforAdaptiveForm();
            StudentSignDate.enabled = false;
        } else {
            showErrorModal("Alert!", "Please fill First Name, Last Name & all required fields before signing the form");
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
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_StudentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_StudentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_StudentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_StudentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_hiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_hiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_button_6708717581632745254607_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_button_6708717581632745254607_click0 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.setFocus(null,'prevItemDeep',true);

        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_button1632744998705_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_button1632744998705_click0 = function (scope) {
    with(this) {
        with(scope) {
            
guideBridge.setFocus(null,'nextItemDeep',true);

        }
	}
}
/**
 * @function admission_appeals_form_external_admission_appeals_form_external.generated_submit1607673526985_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admission_appeals_form_external_admission_appeals_form_external.generated_submit1607673526985_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(FirstName.value === null || LastName.value === null || Email.value === null || Level.value === null || Term.value === null || TermYear.value === null){
  var errorList = []; 
  guideBridge.validate(errorList);
}else if(CWID.value === null && NoIDCB.value === null){
  showErrorModal("Alert!", "Please fill CWID or check the no ID checkbox");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanels[0].ExternalFormPanel[0].CWID[0]");
}else if(AppealReason1.value === null && AppealReason2.value === null && AppealReason3.value === null && AppealReason4.value === null && AppealReason5.value === null && AppealReason6.value === null && AppealReason7.value === null){
  showErrorModal("Alert!", "Please select atleast one option under Reason For The Appeals");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanels[0].ExternalAppealReason[0].AppealReason1[0]");
} else if((AppealReason1.value == "1" || AppealReason2.value == "1" || AppealReason3.value == "1" || AppealReason4.value == "1" || AppealReason5.value == "1" || AppealReason6.value == "1" || AppealReason7.value == "1") && (supportDoc1.value === "" && supportDoc2.value === "" && supportDoc3.value === "" && supportDoc4.value === "" && supportDoc5.value === "" && UnofficialTranscriptDoc.value === "")){
   showErrorModal("Alert!", "Please attach supporting documents");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanels[0].supportingDocs[0].supportDoc1[0]");
}
else{
guideBridge.submit();
}

TermDescription.value = Term.value  + " " + TermYear.value;
FullName.value = FirstName.value + " " + LastName.value;
        }
	}
}
