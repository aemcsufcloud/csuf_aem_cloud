/**
 * @function student_performance_evaluation_student_performance_evaluation_test.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_performance_evaluation_student_performance_evaluation_test.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            var gifModal = document.getElementById('gifModal');
gifModal.style.display = "none";
        }
	}
}
/**
 * @function student_performance_evaluation_student_performance_evaluation_test.generated_EmpId_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_performance_evaluation_student_performance_evaluation_test.generated_EmpId_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var cwid123 = this.value;

if(cwid123 !== null){

var gifModal = document.getElementById('gifModal');
gifModal.style.display = "block";  
  
$.ajax({

    type: 'GET',

    url: "/bin/getStudentPerf",

    //data: {cwid: cwid123,userID:userID},
    data: {
        cwid: cwid123
    },

    dataType: 'json',

    success: function(myresopnse) {
        // debugger;
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];
        if (myresopnse.length === 1) {

            FirstName.value = myresopnse[0].FIRST_NAME;

            Lastname.value = myresopnse[0].LAST_NAME;

            //Department_ID.value=myresopnse[0].DEPTID;

            Department.value = myresopnse[0].DEPTNAME;

            HireDate.value = myresopnse[0].HIRE_DT;

            PositionClassification.value = myresopnse[0].DESCR;

            //Range.value=myresopnse[0].GRADE; 


            Supervisorname.value = myresopnse[0].SUPERVISORNAME;

            MiddleName.value = myresopnse[0].MID;

            Extension.value = myresopnse[0].EXTENSION;

            /*EmpUserID.value=myresopnse[0].EMPUSERID;
            if(EmpUserID !== null){
            var empUserIdVal = EmpUserID.value;
            var empEmail = empUserIdVal.concat('@').concat('fullerton.edu');
            empEmailId.value=empEmail;
            }

            AdminUserId.value= myresopnse[0].ADMINUSERID;
            if(AdminUserId !== null){
            var admUID = AdminUserId.value;
            var admEmail = admUID.concat('@').concat('fullerton.edu');
            AdminEmailID.value=admEmail;
            }*/

            //this.value= myresopnse[0].EMPLID; 


            //ADMINFULLNAME.value=myresopnse.ADMINFULLNAME; 
            //AdministratorsPrintedName.value =  myresopnse.ADMINFULLNAME; 
            gifModal.style.display = "none";
            modal.style.display = "none";
        } else if (myresopnse.length > 1) {
            gifModal.style.display = "none";
            modal.style.display = "block";

            //populate Hidden Fields
            midNameHidden.value = myresopnse[0].MID;

            //evalTitleHidden.value=myresopnse[0].SupervisorTitle;

            classificationHidden.value = myresopnse[0].DESCR;

            supervisorNameHidden.value = myresopnse[0].SUPERVISORNAME;

            hireDatehidden.value = myresopnse[0].HIRE_DT;

            // EmpUserID.value = myresopnse[0].EMPUSERID;
            /*if(EmpUserID !== null){
            var empUserIdVal1 = EmpUserID.value;
            var empEmail1 = empUserIdVal1.concat('@').concat('fullerton.edu');
            empEmailId.value=empEmail1;
            }

            AdminUserId.value= myresopnse[0].ADMINUSERID;
            if(AdminUserId !== null){
            var admUID1 = AdminUserId.value;
            var admEmail1 = admUID1.concat('@').concat('fullerton.edu');
            AdminEmailID.value=admEmail1;
            }*/

            //AdministratorsPrintedName.value =  myresopnse[0].ADMINFULLNAME; 
            var col = [];
            col.push("LAST_NAME");

            col.push("FIRST_NAME");

            col.push("DEPTNAME");

            col.push("EXTENSION");



            var table = document.createElement("table");
            table.id = "tb";
            var tr = table.insertRow(-1);
            var headings = ["", "Last Name", "First Name", "Department", "Extension"];
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
                    //alert("xcvbn");
                    //debugger;
                    lastNameHidden.value = event.currentTarget.parentNode.parentElement.childNodes[1].innerText;
                    firstNameHidden.value = event.currentTarget.parentNode.parentElement.childNodes[2].innerText;
                    deptHidden.value = event.currentTarget.parentNode.parentElement.childNodes[3].innerText;
                    extensionHidden.value = event.currentTarget.parentNode.parentElement.childNodes[4].innerText;

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
            debugger;

            var footerModal = document.getElementById("modal_footer");
            var okButton = document.createElement("input");
            okButton.type = "button";
            okButton.setAttribute("class", "okBtn");
            //okButton.id = "okBtn";
            okButton.value = "OK";
            okButton.onclick = function(event) {
                /*if (cbidHidden.value === null) {
                    alert("Please select any one of the Staff");
                    modal.style.display = "block";
                }*/
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
                    FirstName.value = firstNameHidden.value;
                    Lastname.value = lastNameHidden.value;
                    MiddleName.value = midNameHidden.value;
                    PositionClassification.value = classificationHidden.value;
                    HireDate.value = hireDatehidden.value;
                    Department.value = deptHidden.value;
                    Supervisorname.value = supervisorNameHidden.value;
                    Extension.value = extensionHidden.value;

                    // gifModal.style.display = "none";
                    modal.style.display = "none";
                }
            };
            // footerModal = document.getElementById("modal_footer");
            footerModal.appendChild(okButton);

        } else {
            alert("No matching records found");
            FirstName.value = null;
                    Lastname.value = null;
                    MiddleName.value = null;
                    PositionClassification.value = null;
                    HireDate.value = null;
                    Department.value = null;
                    Supervisorname.value = null;
                    Extension.value = null;
            gifModal.style.display = "none";
        }
        ////////////////////////////////////////////
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
        }
	}
}
/**
 * @function student_performance_evaluation_student_performance_evaluation_test.generated_hiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_performance_evaluation_student_performance_evaluation_test.generated_hiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function student_performance_evaluation_student_performance_evaluation_test.generated_RecomMeritSalaryInc_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_performance_evaluation_student_performance_evaluation_test.generated_RecomMeritSalaryInc_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    DontRecommendSalaryInc.value = null;
    RecomThreeMonthExt.value = null;
  }
        }
	}
}
/**
 * @function student_performance_evaluation_student_performance_evaluation_test.generated_DontRecommendSalaryInc_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_performance_evaluation_student_performance_evaluation_test.generated_DontRecommendSalaryInc_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    RecomMeritSalaryInc.value = null;
    RecomThreeMonthExt.value = null;
  }
        }
	}
}
/**
 * @function student_performance_evaluation_student_performance_evaluation_test.generated_RecomThreeMonthExt_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_performance_evaluation_student_performance_evaluation_test.generated_RecomThreeMonthExt_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value === "1")
  {
    RecomMeritSalaryInc.value = null;
    DontRecommendSalaryInc.value = null;
  }
        }
	}
}
/**
 * @function student_performance_evaluation_student_performance_evaluation_test.generated_signatureCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_performance_evaluation_student_performance_evaluation_test.generated_signatureCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
SupervisorSign.value=Supervisorname.value;
var dateString = new Date().toLocaleString("en-US", {timeZone:(Intl.DateTimeFormat().resolvedOptions().timeZone)}).slice(0,9); 
  var dateObject = new Date(dateString);
  var finalDate = dateObject.toISOString().slice(0,10);
  SupervisorDate.value=finalDate;
    SupervisorDate.enabled = false;
    SupervisorSign.enabled = false;

}
        }
	}
}
/**
 * @function student_performance_evaluation_student_performance_evaluation_test.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_performance_evaluation_student_performance_evaluation_test.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            var submitFlag=0;
/*if (EmpId.value !== null) {
    //generatePDFStep.value = "Draft";
    getPdf();
}*/



if (EmpId.value !== null && FirstName.value !== null && Lastname !== null) {
  
  //alert("1");
  submitFlag=0;
      
 } else{
   //alert("2");
   var modal = document.getElementById("errorPopup");
       var para = document.getElementById("para");
    para.innerHTML = "";
    para.innerHTML = "Please enter Empl ID, First Name, Last Name";
    var errorBody = document.getElementById('errorData');
    errorBody.innerHTML = "";
    errorBody.appendChild(para);
    var footerModal = document.getElementById("errorPopup-footer");
    var okButton = document.createElement("input");
    okButton.type = "button";
    okButton.setAttribute("class", "okBtn");
    //okButton.id = "okBtn";
    okButton.value = "Ok";
    okButton.onclick = function(event) {
        modal.style.display = "none";
    };
    footerModal.appendChild(okButton);
    submitFlag=1;
    modal.style.display = "block";
    
 }



if(ChoiceList.value === null && submitFlag === 0){
  var modal = document.getElementById("errorPopup");
       var para = document.getElementById("para");
    para.innerHTML = "";
    para.innerHTML = "Please indicate Student Type";
    var errorBody = document.getElementById('errorData');
    errorBody.innerHTML = "";
    errorBody.appendChild(para);
    var footerModal = document.getElementById("errorPopup-footer");
    var okButton = document.createElement("input");
    okButton.type = "button";
    okButton.setAttribute("class", "okBtn");
    //okButton.id = "okBtn";
    okButton.value = "Ok";
    okButton.onclick = function(event) {
        modal.style.display = "none";
    };
    footerModal.appendChild(okButton);
    submitFlag=1;
    modal.style.display = "block";
  
  submitFlag === 1;
}else{
   submitFlag === 0;
}

if( submitFlag === 0){
  getPdf();
}


function getPdf() {
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/student-performance-evaluation/student-performance-evaluation-test');
            jsonData.append('fileName', FirstName.value + "_" + Lastname.value + "(" + EmpId.value + ")" + "_" + Date.now());          
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
 * @function student_performance_evaluation_student_performance_evaluation_test.generated_reset1574748438062_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_performance_evaluation_student_performance_evaluation_test.generated_reset1574748438062_click0 = function (scope) {
    with(this) {
        with(scope) {
            resetFlag.value = 1;
guideBridge.reset();


        }
	}
}
/**
 * @function student_performance_evaluation_student_performance_evaluation_test.generated_submit1574748426406_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
student_performance_evaluation_student_performance_evaluation_test.generated_submit1574748426406_click0 = function (scope) {
    with(this) {
        with(scope) {
            var flag = 0;

if(RecomMeritSalaryInc.value === "1" && RecomMeritSalaryInc.value !== null){
  if(EffectiveDate.value === null || EffectiveDate.value === ""){
    alert("Please select effective date");
        guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].ratings[0].EffectiveDate[0]");
        flag=1;
  }else{
    flag=0;
  } 
}

if(flag === 0 && RecomThreeMonthExt.value === "1" && RecomThreeMonthExt.value !== null){
  if(StudEmpReEvalDate.value === null || StudEmpReEvalDate.value === ""){
    alert("Please select re-evaluation date");
         guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].ratings[0].StudEmpReEvalDate[0]");
        flag=1;
  }else{
    flag=0;
  } 
}
if(flag === 0){
guideBridge.submit();
}  





        }
	}
}
