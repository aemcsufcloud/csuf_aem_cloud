/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
   
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(myresopnse) {
            gifModal.style.display = "block";
            var userValue = myresopnse.userId;
            var userID = userValue;
            workflow_initiator.value = userValue;
           // userID = 'steve.diaz27';
           // userID = 'catherineelysabeth';
           // userID = '1kjzhen';
            //CWID.value = userValue;
           // alert('userID: ' + userID);
            $.ajax({
                type: 'GET',
                url: "/bin/getAdmissionAppealData",
                data: {
                    student_userid: userID,
                },
                dataType: 'json',

                success: function(myresopnse) {

                    var modal = document.getElementById('myModal');
                    var span = document.getElementsByClassName("close")[0];
                    var gifModal = document.getElementById('gifModal');
                    if (myresopnse.length == 1) {
                        getData(myresopnse);
                    } else if (myresopnse.length > 1) {
                        getMultipleTermData(myresopnse);
                    } else {
                        gifModal.style.display = "none";
                        //showErrorModal("Alert!", "No matcing records found");
                      //  showErrorModal("Alert!", "At this time you are unable to submit an appeal, please wait until you have received your email notification of your withdrawal or denial, and your application status has been updated.");
                    }



                }
            });
        }

    });
}

function getData(resultSet) {
    if (resultSet[0].ACAD_CAREER == "UGRD") {
      //alert('resultSet[0].PROG_ACTION : ' + resultSet[0].PROG_ACTION);
        if (resultSet[0].PROG_ACTION == "DENY" || resultSet[0].PROG_ACTION == "WAPP") {
          var deadlineDate = resultSet[0].APPL_STATUS_DT;
          var applStatusDt = resultSet[0].APPL_STATUS_DT;
         
          if (deadlineDate !== "") {
            if ((resultSet[0].DIFF_DAYS) <= 500) {
             
              //Email.value = resultSet[0].STUDENT_EMAIL.trim();
              Email.value = "yjayaram@fullerton.edu";
              //Email.value = "poornavivekraj.nagarajan@thoughtfocus.com";
              FirstName.value = resultSet[0].STUDENT_FIRSTNAME.trim();
              LastName.value = resultSet[0].STUDENT_LASTNAME.trim();
              CWID.value = resultSet[0].CWID;
              
              if(resultSet[0].STUDENT_STATUS.trim() == "FRESHMEN") {
                Level.value = 0;
              } else if(resultSet[0].STUDENT_STATUS.trim() == "TRANSFER") {
                Level.value = 1;
              }
              
              var parts = (resultSet[0].ADMIT_TERM_DESCR).trim().split(/\s+/);
              
              Term.value = parts[0];
              TermYear.value = parts[1];
              guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanel[0].basicInformation[0].Term[0]");
             } else {
               showErrorModal("Alert!", "Thank for your interest in Cal State Fullerton, however more than 15 business days have lapsed since your email notification, and you are no longer eligible to submit an appeal.");
             }
           }
         } else {
            showErrorModal("Alert!", "Your current admission status at Cal State Fullerton does not allow you to submit an appeal. Appeals are reserved for applicants that have been denied or withdrawn.");
        }
    } else {
        var url = "http://www.fullerton.edu/graduate/";
        showErrorModal("Alert!", "All Graduate applicants who would like to submit an appeal will need to contact the ", ". Credential and 2nd bachelor applicants (nursing only) should consult their advisor for appeal information. ", url);
    }
    gifModal.style.display = "none";
  
} 


function getMultipleTermData(resultData) {
  var modal = document.getElementById('myModal');
    gifModal.style.display = "none";
    modal.style.display = "block";

    var col = [];

    col.push("STUDENT_FIRSTNAME");

    col.push("STUDENT_LASTNAME");

    col.push("CWID");

    col.push("ACAD_CAREER");

    col.push("ADMIT_TERM_DESCR");
    var table = document.createElement("table");
    table.id = "tb";
    var tr = table.insertRow(-1);
    var headings = ["", "First Name", "Last Name", "CWID", "ACAD_CAREER", "Term"];
    for (var j = 0; j < headings.length; j++) {
        var th = document.createElement("th");
        th.innerHTML = headings[j];
        tr.appendChild(th);
    }
    for (var k = 0; k < resultData.length; k++) {
        tr = table.insertRow(-1);
        // tr.appendChild('<td><input type = "radio"  class = "rb" name="group" value = ""> </td>');
        var button = document.createElement("input");
        button.type = "radio";
        button.setAttribute("class", "rb");
        button.id = "rbtn";
        button.name = "group";
        button.value = "";

        var tabCell1 = tr.insertCell(-1);
        tabCell1.appendChild(button);
        for (var l = 0; l < col.length; l++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = resultData[k][col[l]];
        }
    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    var footerModal = document.getElementById("modal_footer");
    var okButton = document.createElement("input");
    okButton.type = "button";
    okButton.setAttribute("class", "okBtn");

    okButton.value = "Ok";
    okButton.onclick = function(event) {

        var n;
        var rButtonStatus;
        var rButtons = document.getElementsByClassName("rb");
        for (n = 0; n < rButtons.length; n++) {
            if (rButtons[n].checked === false) {

                rButtonStatus = false;
            } else {

                if (resultData[n].ACAD_CAREER == "UGRD") {
                    if (resultData[n].PROG_ACTION == "DENY" || resultData[n].PROG_ACTION == "WAPP") {
                        $.ajax({
                            type: 'GET',
                            url: "/bin/admissionAppealsExtServlet",
                            data: {
                                cwid: resultData[n].CWID,
                                term: (resultData[n].ADMIT_TERM_DESCR).trim(),
                                action: "APPEALS_SUBMISSION_DATA"
                            },
                            dataType: 'json',

                            success: function(result) {
                              
                                  //if (result.length < 1) {
                                if (result.length === 0 ) {
                                   // deadlineDate.value = resultData[n].APPL_STATUS_DT;
                                    //applStatusDt.value = resultData[n].APPL_STATUS_DT;

                                   if (resultData[n].APPL_STATUS_DT !== "") {
                                        if ((resultData[n].DIFF_DAYS) <= 30) {
                                            //Email.value = resultData[n].STUDENT_EMAIL.trim();
                                            Email.value = "yjayaram@fullerton.edu";
                                          	//Email.value = "poornavivekraj.nagarajan@thoughtfocus.com";
                                            FirstName.value = resultData[n].STUDENT_FIRSTNAME.trim();
                                            LastName.value = resultData[n].STUDENT_LASTNAME.trim();
                                           // Term.value = resultData[n].ADMIT_TERM_DESCR;
                                            CWID.value = resultData[n].CWID;
                                          
                                          if(resultData[n].STUDENT_STATUS.trim() == "FRESHMEN") {
               								 Level.value = 0;
              							  } else if(resultData[n].STUDENT_STATUS.trim() == "TRANSFER") {
                							Level.value = 1;
              							  }
              
                                          var parts = (resultData[n].ADMIT_TERM_DESCR).trim().split(/\s+/);

                                          Term.value = parts[0];
                                          TermYear.value = parts[1];
                                        } else {
                                            showErrorModal("Alert!", "Thank for your interest in Cal State Fullerton, however more than 15 business days have lapsed since your email notification, and you are no longer eligible to submit an appeal.");
                                        }
                                    }
                                } else {
                                    showErrorModal("Alert!", "Please beware that you are launching another request for the same term. Your current status at Cal State Fullerton does not allow you to submit an appeal");
                                }
                            }
                        });

                    } else {
                        showErrorModal("Alert!", "Your current admission status at Cal State Fullerton does not allow you to submit an appeal. Appeals are reserved for applicants that have been denied or withdrawn.");
                    }
                } else {
                    var url = "http://www.fullerton.edu/graduate/";
                    showTextErrorModal("Alert!", "All Graduate applicants who would like to submit an appeal will need to contact the ", ". Credential and 2nd bachelor applicants (nursing only) should consult their advisor for appeal information. ", url);
                }
                gifModal.style.display = "none";
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
    var footerModal = document.getElementById("modal_footer");

    footerModal.appendChild(okButton);
}
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            ExternalAppealReason.visible=false;
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            
debugger;
guideBridge.on("elementFocusChanged" , function(event, payload) {
     var component = payload.target;
    console.log("old elements's SOM Expression: " + payload.oldText);
     console.log("new elements's SOM Expression: " + payload.newText);
  var somExpression = payload.newText;
     if(somExpression.toLowerCase().includes("signatureandacknowledgement") || somExpression.toLowerCase().includes("submit1607673526985")){
       NextPanleButton.visible = false;
     } else{
       NextPanleButton.visible = true;
     }  
   if(somExpression.toLowerCase().includes("signatureandacknowledgement") || somExpression.toLowerCase().includes("submit1607673526985")){
       submit1607673526985.visible = true;
     } else{
       submit1607673526985.visible = false;
     }  
});
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_guideRootPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_guideRootPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.on("elementFocusChanged", function(event, payload) {
    debugger;
    var component = payload.target;
    console.log("old elements's SOM Expression: " + payload.oldText);
    console.log("new elements's SOM Expression: " + payload.newText);
    var somExpression = payload.newText;
    if (somExpression.toLowerCase().includes("reasonforappeal")) {
        if (FirstName.value === null || LastName.value === null || Email.value === null || Level.value === null || Term.value === null || TermYear.value === null) {
            var errorList = [];
            guideBridge.validate(errorList);
        } else if (CWID.value === null) {
            showErrorModal("Alert!", "Please fill CWID");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanel[0].ExternalFormPanel[0].CWID[0]");
        }
    }
    if (somExpression.toLowerCase().includes("appealstatement")) {
        if (FirstName.value === null || LastName.value === null || Email.value === null || Level.value === null || Term.value === null || TermYear.value === null) {
            var errorList1 = [];
            guideBridge.validate(errorList1);
        } else if (CWID.value === null) {
            showErrorModal("Alert!", "Please fill CWID");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanel[0].ExternalFormPanel[0].CWID[0]");
        } else if (reason_checkbox_1.value === null && reason_checkbox_2.value === null && reason_checkbox_3.value === null && reason_checkbox_4.value === null) {
            showErrorModal("Alert!", "Please select atleast one option under Reason.");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanel[0].reasonForAppeal[0].Reason[0].reason_checkbox_1[0]");
        } else if (AppealReason1.value === null && AppealReason2.value === null && AppealReason3.value === null && AppealReason6.value === null && AppealReason7.value === null) {
            showErrorModal("Alert!", "Please select atleast one option under Reason For The Appeals");
            guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanel[0].ExternalAppealReason[0].AppealReason1[0]");
        }
    }
});
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_guideRootPanel_init4
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_guideRootPanel_init4 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
var available = [];
if (typeof request !== 'undefined') available.push('request');
if (typeof slingRequest !== 'undefined') available.push('slingRequest');
if (typeof sling !== 'undefined') available.push('sling');
if (typeof granite !== 'undefined') available.push('granite');
if (typeof guideBridge !== 'undefined') available.push('guideBridge');

alert('Available objects: ' + available.join(', '));
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_CaseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_CaseId_init0 = function (scope) {
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
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_CWID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_CWID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if (StageIndicator.value === null) {
   //	alert('cwid : ' + this.value);
        $.ajax({
                type: 'GET',
                url: "/bin/getAdmissionAppealCWIDData",
                data: {
                    student_userid: this.value,
                },
                dataType: 'json',

                success: function(myresopnse) {

                    var modal = document.getElementById('myModal');
                    var span = document.getElementsByClassName("close")[0];
                    var gifModal = document.getElementById('gifModal');
                    if (myresopnse.length == 1) {
                        getData(myresopnse);
                    } else if (myresopnse.length > 1) {
                        getMultipleTermData(myresopnse);
                    } else {
                        gifModal.style.display = "none";
                        //showErrorModal("Alert!", "No matcing records found");
                        showErrorModal("Alert!", "At this time you are unable to submit an appeal, please wait until you have received your email notification of your withdrawal or denial, and your application status has been updated.");
                    }



                }
            });
       

}

function getData(resultSet) {
    if (resultSet[0].ACAD_CAREER == "UGRD") {
      //alert('resultSet[0].PROG_ACTION : ' + resultSet[0].PROG_ACTION);
        if (resultSet[0].PROG_ACTION == "DENY" || resultSet[0].PROG_ACTION == "WAPP") {
          var deadlineDate = resultSet[0].APPL_STATUS_DT;
          var applStatusDt = resultSet[0].APPL_STATUS_DT;
         
          if (deadlineDate !== "") {
            if ((resultSet[0].DIFF_DAYS) <= 500) {
             
              //Email.value = resultSet[0].STUDENT_EMAIL.trim();
              Email.value = "yjayaram@fullerton.edu";
              //Email.value = "poornavivekraj.nagarajan@thoughtfocus.com";
              FirstName.value = resultSet[0].STUDENT_FIRSTNAME.trim();
              LastName.value = resultSet[0].STUDENT_LASTNAME.trim();
              CWID.value = resultSet[0].CWID;
              
              if(resultSet[0].STUDENT_STATUS.trim() == "FRESHMEN") {
                Level.value = 0;
              } else if(resultSet[0].STUDENT_STATUS.trim() == "TRANSFER") {
                Level.value = 1;
              }
              
              var parts = (resultSet[0].ADMIT_TERM_DESCR).trim().split(/\s+/);
              
              Term.value = parts[0];
              TermYear.value = parts[1];
              guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanel[0].basicInformation[0].Term[0]");
             } else {
               showErrorModal("Alert!", "Thank for your interest in Cal State Fullerton, however more than 15 business days have lapsed since your email notification, and you are no longer eligible to submit an appeal.");
             }
           }
         } else {
            showErrorModal("Alert!", "Your current admission status at Cal State Fullerton does not allow you to submit an appeal. Appeals are reserved for applicants that have been denied or withdrawn.");
        }
    } else {
        var url = "http://www.fullerton.edu/graduate/";
        showErrorModal("Alert!", "All Graduate applicants who would like to submit an appeal will need to contact the ", ". Credential and 2nd bachelor applicants (nursing only) should consult their advisor for appeal information. ", url);
    }
    gifModal.style.display = "none";
  
} 


function getMultipleTermData(resultData) {
  var modal = document.getElementById('myModal');
    gifModal.style.display = "none";
    modal.style.display = "block";

    var col = [];

    col.push("STUDENT_FIRSTNAME");

    col.push("STUDENT_LASTNAME");

    col.push("CWID");

    col.push("ACAD_CAREER");

    col.push("ADMIT_TERM_DESCR");
    var table = document.createElement("table");
    table.id = "tb";
    var tr = table.insertRow(-1);
    var headings = ["", "First Name", "Last Name", "CWID", "ACAD_CAREER", "Term"];
    for (var j = 0; j < headings.length; j++) {
        var th = document.createElement("th");
        th.innerHTML = headings[j];
        tr.appendChild(th);
    }
    for (var k = 0; k < resultData.length; k++) {
        tr = table.insertRow(-1);
        // tr.appendChild('<td><input type = "radio"  class = "rb" name="group" value = ""> </td>');
        var button = document.createElement("input");
        button.type = "radio";
        button.setAttribute("class", "rb");
        button.id = "rbtn";
        button.name = "group";
        button.value = "";

        var tabCell1 = tr.insertCell(-1);
        tabCell1.appendChild(button);
        for (var l = 0; l < col.length; l++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = resultData[k][col[l]];
        }
    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    var footerModal = document.getElementById("modal_footer");
    var okButton = document.createElement("input");
    okButton.type = "button";
    okButton.setAttribute("class", "okBtn");

    okButton.value = "Ok";
    okButton.onclick = function(event) {

        var n;
        var rButtonStatus;
        var rButtons = document.getElementsByClassName("rb");
        for (n = 0; n < rButtons.length; n++) {
            if (rButtons[n].checked === false) {

                rButtonStatus = false;
            } else {

                if (resultData[n].ACAD_CAREER == "UGRD") {
                    if (resultData[n].PROG_ACTION == "DENY" || resultData[n].PROG_ACTION == "WAPP") {
                        $.ajax({
                            type: 'GET',
                            url: "/bin/admissionAppealsExtServlet",
                            data: {
                                cwid: resultData[n].CWID,
                                term: (resultData[n].ADMIT_TERM_DESCR).trim(),
                                action: "APPEALS_SUBMISSION_DATA"
                            },
                            dataType: 'json',

                            success: function(result) {
                              
                                  //if (result.length < 1) {
                                if (result.length === 0 ) {
                                   // deadlineDate.value = resultData[n].APPL_STATUS_DT;
                                    //applStatusDt.value = resultData[n].APPL_STATUS_DT;

                                   if (resultData[n].APPL_STATUS_DT !== "") {
                                        if ((resultData[n].DIFF_DAYS) <= 30) {
                                            //Email.value = resultData[n].STUDENT_EMAIL.trim();
                                            Email.value = "yjayaram@fullerton.edu";
                                          	//Email.value = "poornavivekraj.nagarajan@thoughtfocus.com";
                                            FirstName.value = resultData[n].STUDENT_FIRSTNAME.trim();
                                            LastName.value = resultData[n].STUDENT_LASTNAME.trim();
                                           // Term.value = resultData[n].ADMIT_TERM_DESCR;
                                            CWID.value = resultData[n].CWID;
                                          
                                          if(resultData[n].STUDENT_STATUS.trim() == "FRESHMEN") {
               								 Level.value = 0;
              							  } else if(resultData[n].STUDENT_STATUS.trim() == "TRANSFER") {
                							Level.value = 1;
              							  }
              
                                          var parts = (resultData[n].ADMIT_TERM_DESCR).trim().split(/\s+/);

                                          Term.value = parts[0];
                                          TermYear.value = parts[1];
                                        } else {
                                            showErrorModal("Alert!", "Thank for your interest in Cal State Fullerton, however more than 15 business days have lapsed since your email notification, and you are no longer eligible to submit an appeal.");
                                        }
                                    }
                                } else {
                                    showErrorModal("Alert!", "Please beware that you are launching another request for the same term. Your current status at Cal State Fullerton does not allow you to submit an appeal");
                                }
                            }
                        });

                    } else {
                        showErrorModal("Alert!", "Your current admission status at Cal State Fullerton does not allow you to submit an appeal. Appeals are reserved for applicants that have been denied or withdrawn.");
                    }
                } else {
                    var url = "http://www.fullerton.edu/graduate/";
                    showTextErrorModal("Alert!", "All Graduate applicants who would like to submit an appeal will need to contact the ", ". Credential and 2nd bachelor applicants (nursing only) should consult their advisor for appeal information. ", url);
                }
                gifModal.style.display = "none";
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
    var footerModal = document.getElementById("modal_footer");

    footerModal.appendChild(okButton);
}
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_reason_checkbox_1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_reason_checkbox_1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  //ExternalAppealReason.visible=false;
if(this.value == "1"){
  ExternalAppealReason.visible=true;
  reason_checkbox_2.value = "";
  reason_checkbox_3.value = "";
   reason_checkbox_4.value = "";
  AppealReason1.value = "";
  AppealReason2.value = "";
  AppealReason3.value = "";
  AppealReason6.value = "";
  AppealReason7.value = "";
  OtherText.value = "";
  }
  else {
   // ExternalAppealReason.visible=false;
  }
}
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_reason_checkbox_4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_reason_checkbox_4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
//  ExternalAppealReason.visible=false;
if(this.value == "1"){
  ExternalAppealReason.visible=true;
  reason_checkbox_2.value = "";
  reason_checkbox_3.value = "";
   reason_checkbox_1.value = "";
  AppealReason1.value = "";
  AppealReason2.value = "";
  AppealReason3.value = "";
  AppealReason6.value = "";
  AppealReason7.value = "";
  OtherText.value = "";
}
  else {
   // ExternalAppealReason.visible=false;
  }
}
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_reason_checkbox_2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_reason_checkbox_2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(this.value == "1"){
  reason_checkbox_1.value = "";
  reason_checkbox_3.value = "";
   reason_checkbox_4.value = "";
  
  AppealReason1.value = "";
  AppealReason2.value = "";
  AppealReason3.value = "";
  AppealReason6.value = "";
  AppealReason7.value = "";
  OtherText.value = "";
  ExternalAppealReason.visible=true;
}
  else {
   // ExternalAppealReason.visible=false;
  }
}
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_reason_checkbox_3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_reason_checkbox_3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(this.value == "1"){
  reason_checkbox_1.value = "";
  reason_checkbox_2.value = "";
   reason_checkbox_4.value = "";
  
  AppealReason1.value = "";
  AppealReason2.value = "";
  AppealReason3.value = "";
  AppealReason6.value = "";
  AppealReason7.value = "";
  OtherText.value = "";
  ExternalAppealReason.visible=true;
}
  else {
   // ExternalAppealReason.visible=false;
  }
}
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_AppealReason1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_AppealReason1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason1.value == "1"){
  AppealReason2.value = "";
  AppealReason3.value = "";
   //AppealReason4.value = "";
   //AppealReason5.value = "";
   AppealReason6.value = ""; 
   AppealReason7.value = "";
 OtherText.value = "";
}
}
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_AppealReason2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_AppealReason2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason2.value == "1"){
  AppealReason1.value = "";
  AppealReason3.value = "";
   //AppealReason4.value = "";
   //AppealReason5.value = "";
   AppealReason6.value = ""; 
   AppealReason7.value = "";
  OtherText.value = "";
}
}
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_AppealReason3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_AppealReason3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason3.value == "1"){
  AppealReason2.value = "";
  AppealReason1.value = "";
  // AppealReason4.value = "";
   //AppealReason5.value = "";
   AppealReason6.value = ""; 
   AppealReason7.value = "";
  OtherText.value = "";
}
}
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_AppealReason6_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_AppealReason6_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason6.value == "1"){
  AppealReason1.value = "";
  AppealReason2.value = "";
   AppealReason3.value = "";
   //AppealReason4.value = "";
   //AppealReason5.value = ""; 
   AppealReason7.value = "";
  OtherText.value = "";
}
}
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_OtherText_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_OtherText_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(this.value == "1"){
  AppealReason2.value = "";
  AppealReason3.value = "";
  // AppealReason4.value = "";
  // AppealReason5.value = "";
   AppealReason6.value = ""; 
   AppealReason1.value = "";
}
}
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_OtherText_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_OtherText_valueCommit1 = function (scope) {
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
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_AppealReason7_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_AppealReason7_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_supportingDocs_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_supportingDocs_init0 = function (scope) {
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
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_UnofficialTranscriptDoc_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_UnofficialTranscriptDoc_valueCommit0 = function (scope) {
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
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_supportDoc1_valueCommit0 = function (scope) {
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
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_supportDoc2_valueCommit0 = function (scope) {
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
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_supportDoc3_valueCommit0 = function (scope) {
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
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_supportDoc4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_supportDoc4_valueCommit0 = function (scope) {
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
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_supportDoc5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_supportDoc5_valueCommit0 = function (scope) {
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
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_CertifyCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_CertifyCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
  //alert(getDateforAdaptiveForm());
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
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_StudentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_StudentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_StudentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_StudentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_hiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_hiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_PreviousPanleButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_PreviousPanleButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.setFocus(null,'prevItemDeep',true);
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_NextPanleButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_NextPanleButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.setFocus(null,'nextItemDeep',true);
        }
	}
}
/**
 * @function admissions_appeal_external_form_admissions_appeal_external_form.generated_submit1607673526985_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
admissions_appeal_external_form_admissions_appeal_external_form.generated_submit1607673526985_click0 = function (scope) {
    with(this) {
        with(scope) {
            //debugger;

TermDescription.value = Term.value + " " + TermYear.value;
FullName.value = FirstName.value + " " + LastName.value;


if (FirstName.value === null || LastName.value === null || Email.value === null || Level.value === null || Term.value === null || TermYear.value === null) {
    var errorList = [];
    guideBridge.validate(errorList);
} else if (CWID.value === null) {
    //alert('1');
    showErrorModal("Alert!", "Please fill CWID");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanel[0].ExternalFormPanel[0].CWID[0]");
} else if (reason_checkbox_1.value === null && reason_checkbox_2.value === null && reason_checkbox_3.value === null && reason_checkbox_4.value === null) {
   // alert('2');
    showErrorModal("Alert!", "Please select atleast one option under Reason.");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanel[0].ExternalAppealReason[0].AppealReason1[0]");
} else if (AppealReason1.value === null && AppealReason2.value === null && AppealReason3.value === null && AppealReason6.value === null && AppealReason7.value === null) {
     //   alert('3');
        showErrorModal("Alert!", "Please select atleast one option under Reason For The Appeals");
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanel[0].ExternalAppealReason[0].AppealReason1[0]");
}  else if (supportDoc1.value === "" && supportDoc2.value === "" && supportDoc3.value === "" && supportDoc4.value === "" && supportDoc5.value === "" && UnofficialTranscriptDoc.value === "") {
   // alert('5');
    showErrorModal("Alert!", "Please attach supporting documents");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanel[0].supportingDocs[0].supportDoc1[0]");
} else {
  //  alert('Before submission.');
    guideBridge.submit();
}


        }
	}
}
