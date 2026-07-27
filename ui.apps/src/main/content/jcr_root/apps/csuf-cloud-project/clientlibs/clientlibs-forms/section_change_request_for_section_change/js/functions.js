/**
 * @function section_change_request_for_section_change.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
/* showErrorModal("Alert!","The submission deadline has passed!");
   var elements = document.getElementsByClassName('guideTopNavIcon');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
  submit1600234699256.visible = false;
   this.enabled = false; */
  getData();
}
function getData(){
if (StageIndicator.value === null) {
   var tableName = "";
  
  TermName.value = "Spring 2026";
  
  if(TermName.value=="Summer 2022"){
    tableName = "AR_SESSION_COURSE_WITHDRAWAL";
  }else{
    tableName = "AR_COURSE_WITHDRAWAL";
  }
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";

    var userValue;

    $.ajax({

        type: 'GET',

        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(myresponse) {
            var userValue = myresponse.userId;
            //StudentUserId.value=userValue;

            //userValue = "mark.ghoubrial"; 
            //userValue = "chank"; 
            userValue = "alov2468"; 

            if (StageIndicator.value === null) {
                workflow_initiator.value = userValue;

                gifModal.style.display = "none";
            }

            $.ajax({
                type: 'GET',
                url: "/bin/sectionChangeServlet",

                data: {
                    STUDENT_USERID: userValue,
                    tableName:tableName,
                    action: "SECTION_CHANGE_DATA"
                },

                dataType: 'json',
                success: function(response) {
                    if (response.length !== 0) {

                        Cwid.value = response[0].CWID;
                        Cwid.enabled = false;
                        caseId.enabled = false;
                        FirstName.enabled = false;
                        LastName.enabled = false;
                        PhoneNo.enabled = true;
                        Email.enabled = false;

                        Schedule_Drop.enabled = false;
                        Section_Drop.enabled = false;
                        InstructorName_Drop.enabled = false;

                        DeptCourse_Add.enabled = false;
                        Schedule_Add.enabled = false;
                        InstructorName_Add.enabled = false;

                        InstructorSignature_Drop.enabled = false;
                        InstructorSignatureDate_Drop.enabled = false;

                        InstructorSignature_Add.enabled = false;
                        InstructorSignatureDate_Add.enabled = false;

                        ARSCSignature.enabled = false;
                        ARSCSignatureDate.enabled = false;

                        FirstName.value = response[0].FNAME;
                        LastName.value = response[0].LNAME;
                        PhoneNo.value = response[0].STUDENT_PHONE;
                        //Email.value = response[0].STUDENT_EMAIL;                        
                        Email.value = "yjayaram@fullerton.edu";                        
                        StudentName.value = response[0].FNAME + " " + response[0].LNAME;

                        gifModal.style.display = "none";
                        
                        var crsnamearray = [];
                        for (var i = 0; i < response.length; i++) {
                          if(response[i].TERM_DESCR == TermName.value){
                            var item = response[i].CRSE_NAME;
                            crsnamearray.push(item);
                          }
                        }
                        DeptCourse_Drop.items = (crsnamearray);
                        DeptcourseJsonDetails.value = JSON.stringify(response);

                        /*      if (myresponse.length !== 0) {

                  var crsnamearray = [];
                  for (var i = 0; i < myresponse.length; i++) {
                   var crsnamearray = [];
                       for(var i = 0;i< response.length;i++){
                       var item = response[i].CRSE_NAME;
                       crsnamearray.push(item);
                       }
                       DeptCourse_Drop.items = (crsnamearray);
                         DeptcourseJsonDetails.value = JSON.stringify(response);
                      } else {
                       showErrorModal("Alert!", "No matching records found");
                       }
       
                                  
               gifModal.style.display = "none"; */

                    } else {
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
}
        }
	}
}
/**
 * @function section_change_request_for_section_change.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value === null){
  StudentInformationPanel.visible=true;
  StudentInformationPanel.enable=true;
  CourseDropSection.visible=true;
  CourseDropSection.enabled=true;
  CourseAddSection.visible=true;
  CourseAddSection.enabled=true;
  Student_Panel.visible=true;
  Student_Panel.enabled=true;
  DropCourseInstructor_Panel.visible=false;
  AddCourseInstructor_Panel.visible=false;
  ARSC_Panel.visible=false;
}

if(StageIndicator.value == "ToDropCourseInstructor"){
  StudentInformationPanel.visible=true;
  StudentInformationPanel.enabled=false;
  CourseDropSection.visible=true;
  CourseDropSection.enabled=false;
  CourseAddSection.visible=true;
  CourseAddSection.enabled=false;
  Student_Panel.visible=true;
  Student_Panel.enabled=false;
  DropCourseInstructor_Panel.visible=true;
  DropCourseInstructor_Panel.enabled=true;
  AddCourseInstructor_Panel.visible=false;
  ARSC_Panel.visible=false;
}

if(StageIndicator.value == "ToAddCourseInstructor"){
  StudentInformationPanel.visible=true;
  StudentInformationPanel.enabled=false;
  CourseDropSection.visible=true;
  CourseDropSection.enabled=false;
  CourseAddSection.visible=true;
  CourseAddSection.enabled=false;
  Student_Panel.visible=true;
  Student_Panel.enabled=false;
  DropCourseInstructor_Panel.visible=true;
  DropCourseInstructor_Panel.enabled=false;
  AddCourseInstructor_Panel.visible=true;
  AddCourseInstructor_Panel.enabled=true;
  ARSC_Panel.visible=false;
}


if(StageIndicator.value == "ToARSC"){
  StudentInformationPanel.visible=true;
  StudentInformationPanel.enabled=false;
  CourseDropSection.visible=true;
  CourseDropSection.enabled=false;
  CourseAddSection.visible=true;
  CourseAddSection.enabled=false;
  Student_Panel.visible=true;
  Student_Panel.enabled=false;
  DropCourseInstructor_Panel.visible=true;
  DropCourseInstructor_Panel.enabled=false;
  AddCourseInstructor_Panel.visible=true;
  AddCourseInstructor_Panel.enabled=false;
  ARSC_Panel.visible=true;
  ARSC_Panel.enabled=true;
}
        }
	}
}
/**
 * @function section_change_request_for_section_change.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            caseId.enabled = false;

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
 * @function section_change_request_for_section_change.generated_DeptCourse_Drop_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_DeptCourse_Drop_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var approverInfo = this.value;
    var approverInfoArray = [];
    var approverActualInfoArray = [];
    var approverDetailsParsedArray = [];
    var departmentDetailsListObj = {};

    approverDetailsArray = DeptcourseJsonDetails.value;
    console.log("approverDetailsArray= " + approverDetailsArray);
    approverDetailsParsedArray = JSON.parse(approverDetailsArray);

    for (var s = 0; s < approverDetailsParsedArray.length; s++) {
        approverInfoArray.push(approverDetailsParsedArray[s]);
    }

    for (var approverDetails = 0; approverDetails < approverInfoArray.length; approverDetails++) {
        departmentDetailsListObj = approverInfoArray[approverDetails];
        if (approverInfo == departmentDetailsListObj["CRSE_NAME"]) {
            Schedule_Drop.value = departmentDetailsListObj["CLASS_NBR"];
            Section_Drop.value = departmentDetailsListObj["CLASS_SECTION"];
            InstructorName_Drop.value = departmentDetailsListObj["INSTR_NAME"];
            InstructorUserIdDrop.value = departmentDetailsListObj["INSTR_USERID"];
            InstructorEmailDrop.value = departmentDetailsListObj["INSTR_EMAIL"];
            InstructorEmailDrop.value = "yjayaram@fullerton.edu";
            
          

            StudentUserId.value = departmentDetailsListObj["STUDENT_USERID"];

            DeptCourse_Add.value = departmentDetailsListObj["CRSE_NAME"];
            //Schedule_Add.value = departmentDetailsListObj["CLASS_NBR"];

            var text = InstructorName_Drop.value;
            //FNAME_DROPIns.value = text.split(" ", 2);
            //var splitLastName = text.split(" ",2);
            //LNAME_DROPIns.value = splitLastName[0];
            var splitLastName = text.split(",");
            var text2 = splitLastName[1];
            LNAME_DROPIns.value = splitLastName[0];

            var splitFirstName = text2.split(" ");
            FNAME_DROPIns.value = splitFirstName[0];

            Section_Add.value = "";

        }
    }
}
        }
	}
}
/**
 * @function section_change_request_for_section_change.generated_DeptCourse_Add_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_DeptCourse_Add_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var gifModal = document.getElementById('gifModal');
    var courseName = this.value;
    var term = Term.value;
    term = "2263";
    gifModal.style.display = "none";
    $.ajax({
        type: 'GET',
        url: "/bin/sectionChangeServlet",

        data: {
            CRSE_NAME: courseName,
            STRM: term,
            action: "SECTION_CHANGE_ADD_DATA"
        },

        dataType: 'json',
        success: function(response) {
            if (response.length !== 0) {


                gifModal.style.display = "none";
                
                var crssectionarray = [];
                for (var i = 0; i < response.length; i++) {
                    var item = response[i].CLASS_SECTION;
                    crssectionarray.push(item);
                }
                Section_Add.items = (crssectionarray);
                SectionJsonDetails.value = JSON.stringify(response);
                gifModal.style.display = "none";

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
 * @function section_change_request_for_section_change.generated_Section_Add_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_Section_Add_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var approverInfo1 = this.value;
    var approverInfoArray1 = [];
    var approverActualInfoArray1 = [];
    var approverDetailsParsedArray1 = [];
    var departmentDetailsListObj1 = {};

    approverDetailsArray1 = SectionJsonDetails.value;
    console.log("approverDetailsArray1= " + approverDetailsArray1);
    approverDetailsParsedArray1 = JSON.parse(approverDetailsArray1);

    for (var s = 0; s < approverDetailsParsedArray1.length; s++) {
        approverInfoArray1.push(approverDetailsParsedArray1[s]);
    }

    for (var approverDetails1 = 0; approverDetails1 < approverInfoArray1.length; approverDetails1++) {
        departmentDetailsListObj1 = approverInfoArray1[approverDetails1];
        if (approverInfo1 == departmentDetailsListObj1["CLASS_SECTION"]) {

            InstructorName_Add.value = departmentDetailsListObj1["INSTR_NAME"];

            InstructorUserIdAdd.value = departmentDetailsListObj1["INSTR_USERID"];
            InstructorEmailAdd.value = departmentDetailsListObj1["INSTR_EMAIL"];                        
            InstructorEmailAdd.value = "yjayaram@fullerton.edu";
            Schedule_Add.value = departmentDetailsListObj1["CLASS_NBR"];
            FNAME_ADDIns.value = departmentDetailsListObj1["INSTR_F_NAME"];
            LNAME_ADDIns.value = departmentDetailsListObj1["INSTR_L_NAME"];
        }
    }
}
        }
	}
}
/**
 * @function section_change_request_for_section_change.generated_Schedule_Add_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_Schedule_Add_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var gifModal = document.getElementById('gifModal');
    var classNo = this.value;
    var term = Term.value;
    term = "2225";
    gifModal.style.display = "none";
    $.ajax({
        type: 'GET',
        url: "/bin/sectionChangeServlet",

        data: {
            CLASS_NBR: classNo,
            STRM: term,
            action: "SECTION_CHANGE_ADD_DATA"
        },

        dataType: 'json',
        success: function(response) {
            if (response.length !== 0) {


                gifModal.style.display = "none";
               
                var crssectionarray = [];
                for (var i = 0; i < response.length; i++) {
                    var item = response[i].CLASS_SECTION;
                    crssectionarray.push(item);
                }
                Section_Add.items = (crssectionarray);
                SectionJsonDetails.value = JSON.stringify(response);
                gifModal.style.display = "none";

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
 * @function section_change_request_for_section_change.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_StudentCB_valueCommit0 = function (scope) {
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
                StudentSignature.value = StudentName.value;
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
 * @function section_change_request_for_section_change.generated_StudentSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_StudentSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function section_change_request_for_section_change.generated_InstructorDropCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_InstructorDropCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === "ToDropCourseInstructor") {
    if (this.value == 1) {
        var userValue;
        $.ajax({
            type: 'GET',

            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;

                InstructorSignature_Drop.value = userValue;
                InstructorSignatureDate_Drop.value = myresopnse.SERVER_DATE;

            },
            error: function(error) {
                alert("error block=" + error);
            }
        });

        InstructorSignature_Drop.enabled = false;
        InstructorSignatureDate_Drop.enabled = false;

    } else {
        InstructorSignature_Drop.value = "";
        InstructorSignatureDate_Drop.value = null;
    }
}
        }
	}
}
/**
 * @function section_change_request_for_section_change.generated_InstructorSignatureDate_Drop_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_InstructorSignatureDate_Drop_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function section_change_request_for_section_change.generated_InstructorAddCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_InstructorAddCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === "ToAddCourseInstructor") {
    if (this.value == 1) {
        var userValue;
        $.ajax({
            type: 'GET',

            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;

                InstructorSignature_Add.value = userValue;
                InstructorSignatureDate_Add.value = myresopnse.SERVER_DATE;

            },
            error: function(error) {
                alert("error block=" + error);
            }
        });

        InstructorSignature_Add.enabled = false;
        InstructorSignatureDate_Add.enabled = false;

    } else {
        InstructorSignature_Add.value = "";
        InstructorSignatureDate_Add.value = null;
    }
}
        }
	}
}
/**
 * @function section_change_request_for_section_change.generated_InstructorSignatureDate_Add_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_InstructorSignatureDate_Add_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function section_change_request_for_section_change.generated_ARSC_CB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_ARSC_CB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === "ToARSC") {
    if (this.value == 1) {
        var userValue;
        $.ajax({
            type: 'GET',

            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                ARSCSignature.value = userValue;
                ARSCSignatureDate.value = myresopnse.SERVER_DATE;

            },
            error: function(error) {
                alert("error block=" + error);
            }
        });

        ARSCSignature.enabled = false;
        ARSCSignatureDate.enabled = false;

    } else {
        ARSCSignature.value = "";
        ARSCSignatureDate.value = null;
    }
}
        }
	}
}
/**
 * @function section_change_request_for_section_change.generated_ARSCSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_ARSCSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function section_change_request_for_section_change.generated_submit1600234699256_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
section_change_request_for_section_change.generated_submit1600234699256_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    aftiaDescCWID.value = StudentName.value + " " + Cwid.value;
    EmailSubject.value = "Test - Request For Section Change - " + Cwid.value;
}
guideBridge.submit();
if (flag === 0) {
    guideBridge.submit();
}
        }
	}
}
