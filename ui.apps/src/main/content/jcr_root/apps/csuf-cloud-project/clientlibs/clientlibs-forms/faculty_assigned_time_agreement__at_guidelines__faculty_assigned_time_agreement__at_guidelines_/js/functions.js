/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  SignatureandAcknowledgementPanel.visible = false;
  DepartmentDisplayName.visible = false;
  GeneratePDF.visible = false;
   var elements = document.getElementsByClassName('guideTopNavIcon');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
  
}else if(StageIndicator.value == "ToChair"){
  BasicDetails.enabled = false;
  DeanSignaturePanel.visible = false;
  Department.visible = false;
 // InitiatorSignaturePanel.enabled = false;
  button1689674192133.visible = false;
}else if(StageIndicator.value == "ToDean"){
  BasicDetails.enabled = false;
  Department.visible = false;
 // InitiatorSignaturePanel.enabled = false;
  ChairSignaturePanel.enabled = false;
  button1689674192133.visible = false;
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var userValue;
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedInUserDetails",
        dataType: 'json',
        success: function(myresopnse) {
            var userValue = myresopnse.userId;
            workflow_initiator.value = userValue;
            InitiatorUserId.value = userValue;
          $.ajax({
                    type: 'GET',
                    url: "/bin/getEvaluationFormData",
                    data: {
                        action: "EMP_DETAILS"
                    },
                    dataType: 'json',
                    success: function(myresopnse) {
                      if(myresopnse.length >= 1){
                        var firstName = myresopnse[0].FIRST_NAME;
                        var lastName = myresopnse[0].LAST_NAME;
                      InitiatorFirstName.value = firstName; 
                      InitiatorLastName.value = lastName;
                      InitiatorName.value = firstName+" "+lastName; 
                      //InitiatorEmailId.value = myresopnse[0].EMAILID;
                      }
                    }
          });
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
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToDean" || StageIndicator.value == "ToChair"){
  debugger;
  var Data = ATData.value;
  Data = JSON.parse(Data);
  $("#TableViewer").empty();
  TableText.visible = true; 
  

    var col = [];
    col.push("COLLEGE");
    col.push("DEPT_ID");
    col.push("FULL_NAME");
    col.push("CWID");
    col.push("EMAIL");
    col.push("START_TERM");
    col.push("WTU");
    col.push("TIME_REASON");
    col.push("BRIEF_ASSIGNMENT");
    col.push("DEPT_CHAIR_NAME");
    col.push("DEPT_CHAIR_EMAIL");

    var table = document.createElement("table");
    table.id = "tb";
    //var caption = document.createElement("caption");
    //caption.innerHTML = CaptionText;
    //table.appendChild(caption);
    var tr = table.insertRow(-1);
    var headings = ["College", "Dept Id", "Name", "CWID", "Email", "Term", "WTU", "Assigned Time Code", "Description", "Dept Chair Name", "Dept Chair Email"];
    for (var j = 0; j < headings.length; j++) {
        var th = document.createElement("th");
        th.innerHTML = headings[j];
        tr.appendChild(th);
        th.style.fontSize = "12px";
    }
    for (var k = 0; k < Data.length; k++) {
        tr = table.insertRow(-1);
        for (var l = 0; l < col.length; l++) {
            var tabCell = tr.insertCell(-1);
            tabCell.style.color = "black";
            tabCell.style.fontSize = "12px";
            tabCell.innerHTML = Data[k][col[l]];

            console.log("Data from Table = " + Data[k][col[l]]);
        }
    }
  
  $("#TableViewer").append(table);
  
  
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_guideRootPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_guideRootPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var userValue;
    $.ajax({
        type: 'GET',
        url: "/bin/getFacultyAssignedTimeAgreement",
        data: {
            action: "COLLEGE_DEPARTMENT_LOOKUP"
        },
        dataType: 'json',
        success: function(myresponse) {
          debugger;
            if (myresponse.length !== 0) {
              CollegeDeanJson.value = JSON.stringify(myresponse);
              var colArr = [];
              for(var i=0; i<myresponse.length; i++){
                colArr.push(myresponse[i].FUL_COLLEGE+" - "+myresponse[i].FUL_COLLEGE_NAME);
              }
              var colArrSet = new Set(colArr);
              colArr = Array.from(colArrSet);
              College.items = (colArr);
              console.log(colArr);
            }else{
              showErrorModal("Alert!", "Something went wrong try after sometime");
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
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_College_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_College_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
   $("#TableViewer").empty();
   ATData.value = "";
    if (this.value !== null) {
        var val = this.value;
        val = val.slice(0, 5);
        var array = JSON.parse(CollegeDeanJson.value);
        var resArray = [];
        for (var i = 0; i < array.length; i++) {
            if (val == array[i].FUL_COLLEGE) {
                resArray.push(array[i].DEPTID + " - " + array[i].DEPTNAME);
            }
        }
        var colArrSet = new Set(resArray);
        resArray = Array.from(colArrSet);
        Department.value = "";
        Department.items = (resArray);
    }
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_College_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_College_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var val = this.value;
  val = val.slice(0, 5);
  FullCollege.value = val;
   $.ajax({
                    type: 'GET',
                    url: "/bin/getFacultyAssignedTimeAgreement",
                    data: {
                        action: "DEAN_DATA_LOOKUP",
                        collegeCode:val
                    },
                    dataType: 'json',
                    success: function(myresopnse) {
                      if(myresopnse.length >= 1){
                      DeanName.value = myresopnse[0].EMPNAME;
                      DeanUserId.value = myresopnse[0].EMP_USERID;
                      //DeanEmailId.value = myresopnse[0].EMP_EMAIL;
                      }
                    }
          });
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_Department_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_Department_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
   $("#TableViewer").empty();
   ATData.value = "";
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_Term_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_Term_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
   $("#TableViewer").empty();
   ATData.value = "";
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_TableText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_TableText_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_button1689674192133_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_button1689674192133_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if((College.value !== null) && (Term.value !== null) && (Department.value !== null)){
  var deptval = Department.value;
  var arr = deptval.split(/\r?\n/);
var resArr = [];
for(var i=0; i<arr.length; i++){
var val = arr[i];
val = val.slice(0, 5);
resArr.push(val);
  DeptIdArray.value = JSON.stringify(resArr);
}
  $.ajax({
        type: 'GET',
        url: "/bin/getFacultyAssignedTimeAgreement",
        data: {
            action: "COLLEGE_WISE_DATA_LOOKUP",
            deptId: resArr.toString(),
            term: Term.value
        },
        dataType: 'json',
        success: function(myresponse) {
          if(myresponse.length >= 1){
          console.log(myresponse);
            ATData.value = JSON.stringify(myresponse);
            createTable(myresponse);
          }else{
            $("#TableViewer").empty();
            ATData.value = "";
            showErrorModal("Alert !", "No matching records found");
          }
         
        }
 });
}else{
  showErrorModal("Alert !", "Please fill college, department and term fields");
}



function createTable(Data) {
  $("#TableViewer").empty();
  TableText.visible = true; 
  

    var col = [];
    col.push("COLLEGE");
    col.push("DEPT_ID");
    col.push("FULL_NAME");
    col.push("CWID");
    col.push("EMAIL");
    col.push("START_TERM");
    col.push("WTU");
    col.push("TIME_REASON");
    col.push("BRIEF_ASSIGNMENT");
    col.push("DEPT_CHAIR_NAME");
    col.push("DEPT_CHAIR_EMAIL");

    var table = document.createElement("table");
    table.id = "tb";
    //var caption = document.createElement("caption");
    //caption.innerHTML = CaptionText;
    //table.appendChild(caption);
    var tr = table.insertRow(-1);
    var headings = ["College", "Dept Id", "Name", "CWID", "Email", "Term", "WTU", "Assigned Time Code", "Description", "Dept Chair Name", "Dept Chair Email"];
    for (var j = 0; j < headings.length; j++) {
        var th = document.createElement("th");
        th.innerHTML = headings[j];
        tr.appendChild(th);
        th.style.fontSize = "12px";
    }
    for (var k = 0; k < Data.length; k++) {
        tr = table.insertRow(-1);
        for (var l = 0; l < col.length; l++) {
            var tabCell = tr.insertCell(-1);
            tabCell.style.color = "black";
            tabCell.style.fontSize = "12px";
            tabCell.innerHTML = Data[k][col[l]];

            console.log("Data from Table = " + Data[k][col[l]]);
        }
    }
  
  $("#TableViewer").append(table);
  
  
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_InitiatorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_InitiatorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (this.value == 1) {
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresponse) {
                var userValue = myresponse.userName;
                InitiatorSignature.value = userValue;
                InitiatorSignDate.value = myresponse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        InitiatorSignature.enabled = false;
        InitiatorSignDate.enabled = false;
    } else {
        InitiatorSignature.value = "";
        InitiatorSignDate.value = "";
    }
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_InitiatorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_InitiatorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_InitiatorSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_InitiatorSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_ChairCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_ChairCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToChair") {
    if (this.value == 1) {
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresponse) {
                var userValue = myresponse.userName;
                ChairSignature.value = userValue;
                ChairSignDate.value = myresponse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        ChairSignature.enabled = false;
        ChairSignDate.enabled = false;
    } else {
        ChairSignature.value = "";
        ChairSignDate.value = "";
    }
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_ChairSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_ChairSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_ChairSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_ChairSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_DeanCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_DeanCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToDean") {
    if (this.value == 1) {
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresponse) {
                var userValue = myresponse.userName;
                DeanSignature.value = userValue;
                DeanSignDate.value = myresponse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        DeanSignature.enabled = false;
        DeanSignDate.enabled = false;
    } else {
        DeanSignature.value = "";
        DeanSignDate.value = "";
    }
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_DeanSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_DeanSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_DeanSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_DeanSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_UniqueId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_UniqueId_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var ID = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for ( var i = 0; i < 12; i++ ) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
this.value = ID;
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_DeptId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_DeptId_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value == "ToChair"){
  var val = this.value;
  var array = JSON.parse(CollegeDeanJson.value); 
  var resArray = [];
  for(var i=0; i<array.length; i++){
    if(val == array[i].DEPTID){
    Department.items = (val+" - "+array[i].DEPTNAME).replace(/&/g, 'and');
    Department.value = (val+" - "+array[i].DEPTNAME).replace(/&/g, 'and');
    break;
    }
  }
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_GeneratePDF_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_GeneratePDF_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(College.value === null || Term.value === null){
   showErrorModal("Alert !", "Please fill college and term dropdowns and click fetch data");
}else if(ATData.value === null && College.value !== null && Term.value !== null){
  showErrorModal("Alert !", "Please click fetch data button");
}else{
var arr = ATData.value;
arr = JSON.parse(arr);
var test = "<ATGuidelines><College>"+College.value+"</College><Term>"+Term.value+"</Term><DepartmentDisplayName>"+DepartmentDisplayName.value+"</DepartmentDisplayName><Table1>";
for(var i=0; i<arr.length; i++){
  var val = "<Row1>";
  if(arr[i].COLLEGE){
    val = val+"<CollegeName>"+arr[i].COLLEGE+"</CollegeName>";
  }
  if(arr[i].DEPT_ID){
    val = val+"<Dept>"+arr[i].DEPT_ID+"</Dept>";
  }
  if(arr[i].FULL_NAME){
    val = val+"<FacultyName>"+arr[i].FULL_NAME+"</FacultyName>";
  }
  if(arr[i].CWID){
    val = val+"<FacultyCWID>"+arr[i].CWID+"</FacultyCWID>";
  }
  if(arr[i].EMAIL){
    val = val+"<FacultyEmail>"+arr[i].EMAIL+"</FacultyEmail>";
  }
  if(arr[i].START_TERM){
    val = val+"<TermSelection>"+arr[i].START_TERM+"</TermSelection>";
  } 
  if(arr[i].WTU){
    val = val+"<WTU>"+arr[i].WTU+"</WTU>";
  } 
  if(arr[i].TIME_REASON){
    val = val+"<AssignedTimeCode>"+arr[i].TIME_REASON+"</AssignedTimeCode>";
  } 
  if(arr[i].BRIEF_ASSIGNMENT){
    val = val+"<BriefDescription>"+arr[i].BRIEF_ASSIGNMENT+"</BriefDescription>";
  } 
  if(arr[i].DEPT_CHAIR_NAME){
    val = val+"<DeptChair>"+arr[i].DEPT_CHAIR_NAME+"</DeptChair>";
  } 
  if(arr[i].DEPT_CHAIR_EMAIL){
    val = val+"<DeptChairEmail>"+arr[i].DEPT_CHAIR_EMAIL+"</DeptChairEmail>";
  }
  val = val+"</Row1>";
  test = test+val;
}
test = test+"</Table1></ATGuidelines>";
getPdf();
}
function getPdf() {
    console.log("in view pdf");
   debugger;
    window.guideBridge.getDataXML({
        success: function(result) {
          // console.log("in view pdf="+test);
            var jsonData = new FormData();
           // jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            test = test.replace(/&/g, 'and');
            jsonData.append('data', test);
           // console.log("in view pdf json data="+test.replace('&', 'and'));
            console.log("Final PDF JSON"+test);
            jsonData.append('formPath', '/content/forms/af/faculty-assigned-time-agreement--at-guidelines-/faculty-assigned-time-agreement--at-guidelines-');
            jsonData.append('fileName', College.value+" - "+Term.value);          
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
 * @function faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_submit1600234699256_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement__at_guidelines__faculty_assigned_time_agreement__at_guidelines_.generated_submit1600234699256_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null) {
  aftiaDescCWID.value = College.value+" - "+Term.value;
   EmailSubject.value = "Test - Faculty Assigned Time Agreement - "+College.value+" - "+Term.value;
  PdfName.value = "AT_"+Term.value+".pdf";
}

var email = "shreyas.manjunatha@thoughtfocus.com";
//var email = "chaitanya.sai@thoughtfocus.com";
InitiatorEmailId.value = email;
DeanEmailId.value = email;
ChairEmailId.value = email;
if(ATData.value === null && College.value !== null && Term.value !== null && Department.value !== null){
  showErrorModal("Alert !", "Please click fetch data button");
}else{
  guideBridge.submit();
}

        }
	}
}
