/**
 * @function schedule_change_form_schedule_change_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var userValue;
  gifModal.style.display = "block";
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedInUserDetails",
        dataType: 'json',
        success: function(myresopnse) {
            var userValue = myresopnse.userId;
            workflow_initiator.value = userValue;
            InitiatorUserID.value = userValue;

            $.ajax({
                type: 'GET',
                url: "/bin/getSCFRequestData",
                data: {
                    action: "SCHEDULE_CHANGE_FORM_USER_ID_LOOKUP",
                    userid: userValue
                },
                dataType: 'json',
                success: function(myresponse) {
                    if (myresponse.length == 1) {

                        ChrsID.value = myresponse[0].CSU_CHRS_ID;
                        CWID.value = myresponse[0].EMPLID;
                        FirstName.value = myresponse[0].FIRST_NAME;
                        LastName.value = myresponse[0].LAST_NAME;
                        Title.value = myresponse[0].DESCR;
                        DeptID.value = myresponse[0].DEPTID;
                        DeptName.value = myresponse[0].DEPTNAME;
                        College.value = myresponse[0].FUL_COLLEGE;
                        CollegeName.value = myresponse[0].FUL_COLLEGE_NAME;
                        DivisionID.value = myresponse[0].DIVSION;
                        DivisionName.value = myresponse[0].DIVISION_NAME;
                        InitiatorFullName.value = myresponse[0].EMP_NAME;
                        //InitiatorEmail.value = myresponse[0].EMAILID; 
                        InitiatorEmail.value = "yjayaram@fullerton.edu";


                        gifModal.style.display = "none";
                    } else if (myresponse.length > 1) {
                        gifModal.style.display = "none";
                        myModal.style.display = "block";
                        var col = [];
                        col.push("EMPLID");
                        col.push("FIRST_NAME");
                        col.push("LAST_NAME");
                        col.push("DESCR");
                        col.push("DEPTNAME");
                        col.push("FUL_COLLEGE_NAME");
                        var table = document.createElement("table");
                        table.id = "tb";
                        var tr = table.insertRow(-1);
                        var headings = ["", "Empl_Id", "First_Name", "Last_Name", "Descr", "Department", "College"];
                        for (var j = 0; j < headings.length; j++) {
                            var th = document.createElement("th");
                            th.innerHTML = headings[j];
                            tr.appendChild(th);
                        }

                        for (var k = 0; k < myresponse.length; k++) {
                            tr = table.insertRow(-1);
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
                                tabCell.innerHTML = myresponse[k][col[l]];
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

                                    ChrsID.value = myresponse[n].CSU_CHRS_ID;
                                    CWID.value = myresponse[n].EMPLID;
                                    FirstName.value = myresponse[n].FIRST_NAME;
                                    LastName.value = myresponse[n].LAST_NAME;
                                    Title.value = myresponse[n].DESCR;
                                    DeptID.value = myresponse[n].DEPTID;
                                    DeptName.value = myresponse[n].DEPTNAME;
                                    College.value = myresponse[n].FUL_COLLEGE;
                                    CollegeName.value = myresponse[n].FUL_COLLEGE_NAME;
                                    DivisionID.value = myresponse[n].DIVSION;
                                    DivisionName.value = myresponse[n].DIVISION_NAME;
                                    InitiatorFullName.value = myresponse[n].EMP_NAME;
                                    //InitiatorEmail.value = myresponse[n].EMAILID; 
                                    InitiatorEmail.value = "yjayaram@fullerton.edu";

                                    rButtonStatus = true;
                                    myModal.style.display = "none";
                                    break;

                                }
                            }
                            if (rButtonStatus === false) {
                                showErrorModal("Alert!", "Please select appropriate entry");
                            }
                        };
                        footerModal.appendChild(okButton);
                    } else {
                        gifModal.style.display = "none";
                        showErrorModal("Alert!", "No matching records found");
                    }
                }
            });
        },
        error: function(error) {
          gifModal.style.display = "none";
            alert("error block=" + error);
        }
    });
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            ChrsID.enabled = false;
CWID.enabled = false;
InitiatedDate.enabled = false;
FirstName.enabled = false;
LastName.enabled = false;
Title.enabled = false;
DeptID.enabled = false;
DeptName.enabled = false;
College.enabled = false;
CollegeName.enabled = false;
DivisionID.enabled = false;
DivisionName.enabled = false;

if(StageIndicator.value === null){
  ChairSignaturePanel.visible = false;
  DeanSignaturePanel.visible = false; 
  ExtensionOfficeSignaturePanel.visible = false; 
  SchedulingOfficeSignaturePanel.visible = false; 
} else if(StageIndicator.value == "ToChair"){
  CancelPanel.enabled = false;
  AddNewSection.enabled = false;
  EditSection.enabled = false;
  AdditionalCommentsPanel.enabled = false;
  InitiatorSignaturePanel.enabled = false;
  DeanSignaturePanel.visible = false; 
  ExtensionOfficeSignaturePanel.visible = false; 
  SchedulingOfficeSignaturePanel.visible = false; 
} else if(StageIndicator.value == "ToDean"){
  CancelPanel.enabled = false;
  AddNewSection.enabled = false;
  EditSection.enabled = false;
  AdditionalCommentsPanel.enabled = false;
  InitiatorSignaturePanel.enabled = false;
  ChairSignaturePanel.enabled = false;
  ExtensionOfficeSignaturePanel.visible = false; 
  SchedulingOfficeSignaturePanel.visible = false;
} else if(StageIndicator.value == "ToSchedulingOffice"){
  CancelPanel.enabled = false;
  AddNewSection.enabled = false;
  EditSection.enabled = false;
  AdditionalCommentsPanel.enabled = false;
  InitiatorSignaturePanel.enabled = false;
  ChairSignaturePanel.enabled = false;
  DeanSignaturePanel.enabled = false;
  ExtensionOfficeSignaturePanel.visible = false; 
} else if(StageIndicator.value == "ToExtensionOffice"){
  CancelPanel.enabled = false;
  AddNewSection.enabled = false;
  EditSection.enabled = false;
  AdditionalCommentsPanel.enabled = false;
  InitiatorSignaturePanel.enabled = false;
  ChairSignaturePanel.enabled = false;
  DeanSignaturePanel.enabled = false;
  SchedulingOfficeSignaturePanel.visible = false; 
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_HelpButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_HelpButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            (function () {

    if (document.getElementById("simpleHelpPopup")) {
        return;
    }

    var popup = document.createElement("div");
    popup.id = "simpleHelpPopup";

    popup.innerHTML =
        '<div class="help-overlay">' +
            '<div class="help-popup">' +

                '<div class="help-header">' +
                    '<div class="help-title-area">' +
                        '<h2>Scheduling Assistance</h2>' +
                        '<span>Need help? We are here to assist.</span>' +
                    '</div>' +
                '</div>' +

                '<span class="help-close">&times;</span>' +

                '<div class="help-content">' +

                    '<div class="help-card">' +
                        '<h3>For Fall/Spring state-support related inquiries, please contact:</h3>' +
                        '<a href="mailto:scheduling@fullerton.edu" class="help-link">scheduling@fullerton.edu</a>' +
                    '</div>' +

                    '<div class="help-card">' +
                        '<h3>For Winter/Summer self-support related inquiries, please contact:</h3>' +
                        '<a href="mailto:extensionscheduling@fullerton.edu" class="help-link">extensionscheduling@fullerton.edu</a>' +
                    '</div>' +

                '</div>' +

            '</div>' +
        '</div>';

    document.body.appendChild(popup);

    var style = document.createElement("style");

    style.type = "text/css";

    style.innerHTML =
        '.help-overlay{' +
            'position:fixed;' +
            'top:0;' +
            'left:0;' +
            'width:100%;' +
            'height:100%;' +
            'background:rgba(0,39,76,0.45);' +
            'display:flex;' +
            'align-items:center;' +
            'justify-content:center;' +
            'z-index:999999;' +
        '}' +

        '.help-popup{' +
            'position:relative;' +
            'width:650px;' +
            'max-width:90%;' +
            'background:rgba(255,255,255,0.92);' +
            'border-radius:20px;' +
            'overflow:hidden;' +
            'font-family:Arial,sans-serif;' +
            'box-shadow:0 15px 40px rgba(0,0,0,0.30);' +
        '}' +

        '.help-header{' +
            'background:#00274c;' +
            'padding:22px 25px;' +
            'color:#fff;' +
        '}' +

        '.help-icon{' +
            'float:left;' +
            'width:50px;' +
            'height:50px;' +
            'line-height:50px;' +
            'text-align:center;' +
            'background:#ff6800;' +
            'border-radius:50%;' +
            'font-size:28px;' +
            'font-weight:bold;' +
            'margin-right:15px;' +
        '}' +

        '.help-title-area h2{' +
            'margin:0;' +
            'font-size:26px;' +
            'color:#fff;' +
        '}' +

        '.help-title-area span{' +
            'font-size:13px;' +
            'color:#d8e4f0;' +
        '}' +

        '.help-content{' +
            'padding:25px;' +
        '}' +

        '.help-card{' +
            'background:#fff;' +
            'border-left:5px solid #ff6800;' +
            'border-radius:10px;' +
            'padding:18px;' +
            'margin-bottom:18px;' +
            'box-shadow:0 4px 12px rgba(0,0,0,0.08);' +
        '}' +

        '.help-card h3{' +
            'margin:0 0 10px 0;' +
            'color:#00274c;' +
            'font-size:18px;' +
        '}' +

        '.help-card p{' +
            'margin:0 0 10px 0;' +
            'color:#555;' +
            'line-height:1.5;' +
        '}' +

        '.help-link{' +
            'color:#ff6800;' +
            'font-weight:bold;' +
            'text-decoration:none;' +
        '}' +

        '.help-link:hover{' +
            'text-decoration:underline;' +
        '}' +

        '.help-close{' +
            'position:absolute;' +
            'top:15px;' +
            'right:18px;' +
            'font-size:28px;' +
            'color:#fff;' +
            'cursor:pointer;' +
            'font-weight:bold;' +
        '}';

    document.getElementsByTagName("head")[0].appendChild(style);

    var closeBtn = document.getElementsByClassName("help-close")[0];

    closeBtn.onclick = function () {
        var el = document.getElementById("simpleHelpPopup");
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    };

})();
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_CaseID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_CaseID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_CaseID_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_CaseID_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null && this.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getCaseID",
        dataType: 'json',
        success: function(myresponse) {
            CaseID.value = myresponse.CASEID;
        },
    });
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_InitiatedDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_InitiatedDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_CancelSectionRemoveButton_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_CancelSectionRemoveButton_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    CancelSectionMainContentPanel.instanceManager.instances[0].CancelSectionRemoveButton.visible = false;
}

if (StageIndicator.value !== null) {
    this.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_CancelSectionRemoveButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_CancelSectionRemoveButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = CancelSectionMainContentPanel.instanceManager.instanceCount;
CancelSectionMainContentPanel.instanceManager.removeInstance(CancelSectionMainContentPanel.instanceIndex);
if (panelCount == "2") {
    CancelSectionMainContentPanel.instanceManager.instances[0].CancelSectionTitlePanel.CancelSectionRemoveButton.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button1777467458025_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button1777467458025_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (StageIndicator.value === null) {
    CancelSectionMainContentPanel.instanceManager.instances[0].CancelSectionTitlePanel.CancelSectionRemoveButton.visible = false;
}

if (StageIndicator.value !== null) {
    this.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button1777467458025_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button1777467458025_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = CancelSectionMainContentPanel.instanceManager.instanceCount;
CancelSectionMainContentPanel.instanceManager.removeInstance(CancelSectionMainContentPanel.instanceIndex);
if (panelCount == "2") {
     CancelSectionMainContentPanel.instanceManager.instances[0].CancelSectionTitlePanel.CancelSectionRemoveButton.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_CS_CombinedRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_CS_CombinedRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
    CancelSectionCombinedWithPanel.visible = true;
CancelSectionCombinedDeletionPanel.visible = true;
  } else{
    CancelSectionCombinedWithPanel.visible = false;
CancelSectionCombinedDeletionPanel.visible = false;
  }

        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_CancelSectionCombinedWithPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_CancelSectionCombinedWithPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_CancelSectionCombinedDeletionPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_CancelSectionCombinedDeletionPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_CancelSectionAddButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_CancelSectionAddButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            CancelSectionMainContentPanel.instanceManager.addInstance();

if (CancelSectionMainContentPanel.instanceManager.instances[0].CancelSectionTitlePanel.CancelSectionRemoveButton.visible === false) {
    CancelSectionMainContentPanel.instanceManager.instances[0].CancelSectionTitlePanel.CancelSectionRemoveButton.visible = true;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AddNewSectionCancelButton_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AddNewSectionCancelButton_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    AddNewSectionMainContentPanel.instanceManager.instances[0].AddNewSectionTitlePanel.AddNewSectionCancelButton.visible = false;
}

if (StageIndicator.value !== null) {
    this.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AddNewSectionCancelButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AddNewSectionCancelButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = AddNewSectionMainContentPanel.instanceManager.instanceCount;
AddNewSectionMainContentPanel.instanceManager.removeInstance(AddNewSectionMainContentPanel.instanceIndex);

if (panelCount == "2") {
    AddNewSectionMainContentPanel.instanceManager.instances[0].AddNewSectionTitlePanel.AddNewSectionCancelButton.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_NewCourseSearchbox_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_NewCourseSearchbox_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {

        var courseID = this.value;

        if (courseID) {
            if (Semester.value && Year.value && Career.value) {
                var careerVal = Career.value;
                var acadplan = careerVal.slice(-4);
                $.ajax({
                    type: 'GET',
                    url: "/bin/getSCFRequestData",
                    data: {
                        action: "SCHEDULE_CHANGE_FORM_ADD_NEW_SECTION_SEARCH_LOOKUP",
                        strm: STRM.value,
                        searchValue: courseID, 
                        acadPlan: acadplan
                    },
                    dataType: 'json',
                    success: function(response) {
                        try {
                           if(response.length >= 1){
                             var crsnamearray = [];
                           for (var i = 0; i < response.length; i++) {
                            var item = response[i].COMPLETE_DISPLAY_COURSE_NAME;
                            crsnamearray.push(item);
                        }
                             AN_CourseID.items = "";
                        AN_CourseID.items = (crsnamearray);
                           }

                        } catch (innerError) {
                            console.error("Processing error:", innerError);
                            showErrorModal("Error", "Something went wrong while processing data");
                        }
                    },

                    error: function(error) {
                        console.error("API error:", error);
                        showErrorModal("Error", "Failed to fetch data from server");
                    }
                });

            } else {
                showErrorModal("Alert!", "Please fill Semester, Year & Career fields before clicking lookup");
            }

        } else {
            showErrorModal("Alert!", "Please enter a valid Course ID or Course Name");
        }
    }

        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AN_CourseID_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AN_CourseID_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null && this.value !== null) {
  gifModal.style.display = "block";
    var val = this.value;
    var parts = val.split(" - ");
    var leftPart = parts[0];
    var rightPart = parts[1];
    var leftSplit = leftPart.split(" ");
    AN_Subject.value = leftSplit[0] || "";
    AN_CatalogNumber.value = leftSplit[1] || "";
    var crseID = rightPart || "";
    var careerVal = Career.value;
    var acadplan = careerVal.slice(-4);
  
  AN_Session.items = ""; 
  AN_ComponentType.items = ""; 
  AN_Topic.items = ""; 
  AN_Cwid.items = ""; 
  AN_ClassNote.items = ""; 
    $.ajax({
        type: 'GET',
        url: "/bin/getSCFRequestData",
        data: {
            action: "SCHEDULE_CHANGE_FORM_ADD_NEW_SECTION_CRSE_ID_LOOKUP",
            /*&strm=2267&acadPlan=UGRD&crseid=004910&subject=ENGL*/
            strm: STRM.value,
            acadPlan: acadplan,
            crseid: crseID,
            subject: AN_Subject.value
        },
        dataType: 'json',
        success: function(response) {
            try {
                if (!response || !Array.isArray(response) || response.length === 0) {
                  gifModal.style.display = "none";
                    showErrorModal("Alert!", "Data not available");
                    return;
                }
                var data = response[0] || {};
                var schedulearray = [];
                var scheduleFinalArray = [];

                schedulearray = data.schedule || [];

                for (var i = 0; i < schedulearray.length; i++) {
                    var item = schedulearray[i].XLATLONGNAME;
                    scheduleFinalArray.push(item);
                }

                AN_Session.items = scheduleFinalArray;
              
              var componentArray = [];
                var componentFinalArray = [];

                componentArray = data.components || [];

                for (var j = 0; j < componentArray.length; j++) {
                    var componentItem = componentArray[j].XLATLONGNAME;
                    componentFinalArray.push(componentItem);
                }

                AN_ComponentType.items = componentFinalArray;
              
              
              var instructorArray = [];
                var instructorArrayFinal = [];

                instructorArray = data.instructors || [];

                for (var k = 0; k < instructorArray.length; k++) {
                    var instructorItem = instructorArray[k].NAME_EMPLID;
                    instructorArrayFinal.push(instructorItem);
                }

                AN_Cwid.items = instructorArrayFinal;
              
              var topicArray = [];
                var topicArrayFinal = [];

                topicArray = data.topics || [];

                for (var l = 0; l < topicArray.length; l++) {
                    var topicItem = topicArray[l].DESCR;
                    topicArrayFinal.push(topicItem);
                }

                AN_Topic.items = topicArrayFinal;
              
               var noteArray = [];
                var noteArrayFinal = [];

                noteArray = data.notes || [];

                for (var m = 0; m < noteArray.length; m++) {
                    var noteItem = noteArray[m].DESCR;
                    noteArrayFinal.push(noteItem);
                }

                AN_ClassNote.items = noteArrayFinal;
              
              if (!ChairName.value && !ChairEmailId.value && !ChairUserId.value &&
                                !DeanName.value && !DeanEmailId.value && !DeanUserId.value) {

                                ChairName.value = data.CHAIR_NAME || "";
                               // ChairEmailId.value = data.CHAIR_EMAIL || "";
                                ChairEmailId.value = "yjayaram@fullerton.edu";
                                ChairUserId.value = data.CHAIR_USERID || "";

                                DeanName.value = data.DEAN_NAME || "";
                              //  DeanEmailId.value = data.DEAN_EMAIL || "";
                                DeanEmailId.value = "yjayaram@fullerton.edu";
                                DeanUserId.value = data.DEAN_USERID || "";
                            }
              HiddenResultsetFiled.value = JSON.stringify(response);
              
              
            } catch (innerError) {
                console.error("Processing error:", innerError);
              gifModal.style.display = "none";
                showErrorModal("Error", "Something went wrong while processing data");
            }
          gifModal.style.display = "none";
        },
        error: function(error) {
            console.error("API error:", error);
          gifModal.style.display = "none";
            showErrorModal("Error", "Failed to fetch data from server");
        }
    });
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AN_Session_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AN_Session_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(StageIndicator.value === null && this.value !== null){
  AN_SessionStartDate.value =  "";
    AN_SessionEndDate.value = "";
  var val  = HiddenResultsetFiled.value;
    val = JSON.parse(val);
  var data = val[0];
  var sessionArray = [];

                sessionArray = data.schedule || [];
   for (var k = 0; k < sessionArray.length; k++) {
     if(sessionArray[k].XLATLONGNAME == this.value && this.value != "Special Session"){
       AN_SessionStartDate.value = getDateforAdaptiveForm(sessionArray[k].SESS_BEGIN_DT);
       AN_SessionEndDate.value = getDateforAdaptiveForm(sessionArray[k].SESS_END_DT);
     }
                }
}

function getDateforAdaptiveForm(dateTimeValue) {
    if (!dateTimeValue) {
        return "";
    }

    return String(dateTimeValue).split(" ")[0];
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AddNewSectionMeetingPatterCancelButton_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AddNewSectionMeetingPatterCancelButton_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    AddNewRepetitiveSectionMeetingPatternPanel.instanceManager.instances[0].AddNewSectionMeetingPatterCancelButton.visible = false;
}

if (StageIndicator.value !== null) {
    this.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AddNewSectionMeetingPatterCancelButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AddNewSectionMeetingPatterCancelButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = AddNewRepetitiveSectionMeetingPatternPanel.instanceManager.instanceCount;
AddNewRepetitiveSectionMeetingPatternPanel.instanceManager.removeInstance(AddNewRepetitiveSectionMeetingPatternPanel.instanceIndex);
if (panelCount == "2") {
    AddNewRepetitiveSectionMeetingPatternPanel.instanceManager.instances[0].AddNewSectionMeetingPatterCancelButton.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AddNewSectionAddMeetingPatternButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AddNewSectionAddMeetingPatternButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            AddNewRepetitiveSectionMeetingPatternPanel.instanceManager.addInstance();

if (AddNewRepetitiveSectionMeetingPatternPanel.instanceManager.instances[0].AddNewSectionMeetingPatterCancelButton.visible === false) {
    AddNewRepetitiveSectionMeetingPatternPanel.instanceManager.instances[0].AddNewSectionMeetingPatterCancelButton.visible = true;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button_4022241301779125007056_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button_4022241301779125007056_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    AddNewRepetitiveSectionClassNotePanel.instanceManager.instances[0].button_4022241301779125007056.visible = false;
}

if (StageIndicator.value !== null) {
    this.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button_4022241301779125007056_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button_4022241301779125007056_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = AddNewRepetitiveSectionClassNotePanel.instanceManager.instanceCount;
AddNewRepetitiveSectionClassNotePanel.instanceManager.removeInstance(AddNewRepetitiveSectionClassNotePanel.instanceIndex);
if (panelCount == "2") {
    AddNewRepetitiveSectionClassNotePanel.instanceManager.instances[0].button_4022241301779125007056.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button1779123953271_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button1779123953271_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {

        var classNoteNbr = AN_ClassNoteNbr.value;

        if (classNoteNbr) {
            if (Semester.value && Year.value && Career.value) {
                $.ajax({
                    type: 'GET',
                    url: "/bin/getSCFRequestData",
                    data: {
                        action: "SCHEDULE_CHANGE_FORM_CLASS_NOTE_LOOKUP",
                        strm: STRM.value,
                        classnotenbr: classNoteNbr
                    },
                    dataType: 'json',
                    success: function(response) {
                        try {
                           if(response.length >= 1){
                             AN_ClassNoteDescription.value = response[0].DESCR;
                           }

                        } catch (innerError) {
                            console.error("Processing error:", innerError);
                            showErrorModal("Error", "Something went wrong while processing data");
                        }
                    },

                    error: function(error) {
                        console.error("API error:", error);
                        showErrorModal("Error", "Failed to fetch data from server");
                    }
                });

            } else {
                showErrorModal("Alert!", "Please fill Semester, Year & Career fields before clicking lookup");
            }

        } else {
            showErrorModal("Alert!", "Please enter a valid class note number");
        }
    }

        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button1779125164244_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button1779125164244_click0 = function (scope) {
    with(this) {
        with(scope) {
            AddNewRepetitiveSectionClassNotePanel.instanceManager.addInstance();

if (AddNewRepetitiveSectionClassNotePanel.instanceManager.instances[0].button_4022241301779125007056.visible === false) {
    AddNewRepetitiveSectionClassNotePanel.instanceManager.instances[0].button_4022241301779125007056.visible = true;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AN_CombinedSectionCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AN_CombinedSectionCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if(AN_CombinedSectionCB.value == "1"){
  AddNewSectionBottomCombinedSectionPanel.visible = true;
} else{
  AddNewSectionBottomCombinedSectionPanel.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AN_CombinedSectionCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AN_CombinedSectionCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(AN_CombinedSectionCB.value == "1"){
  AddNewSectionBottomCombinedSectionPanel.visible = true;
} else{
  AddNewSectionBottomCombinedSectionPanel.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AN_MultipleComponentClassCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AN_MultipleComponentClassCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(AN_MultipleComponentClassCB.value == "1"){
  AddNewSectionBottomMulticomponentClassPanel.visible = true;
} else{
  AddNewSectionBottomMulticomponentClassPanel.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AN_UpdateInstructorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AN_UpdateInstructorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(AN_UpdateInstructorCB.value == "1"){
  AddNewSectionBottomUpdateInstructorPanel.visible = true;
} else{
  AddNewSectionBottomUpdateInstructorPanel.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AddNewSectionBottomCombinedSectionPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AddNewSectionBottomCombinedSectionPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;

if(AN_CombinedSectionCB.value == "1"){
  AddNewSectionBottomCombinedSectionPanel.visible = true;
} else{
  AddNewSectionBottomCombinedSectionPanel.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AddNewSectionBottomMulticomponentClassPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AddNewSectionBottomMulticomponentClassPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;

if(AN_MultipleComponentClassCB.value == "1"){
  AddNewSectionBottomMulticomponentClassPanel.visible = true;
} else{
  AddNewSectionBottomMulticomponentClassPanel.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AddNewSectionBottomUpdateInstructorPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AddNewSectionBottomUpdateInstructorPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;

if(AN_UpdateInstructorCB.value == "1"){
  AddNewSectionBottomUpdateInstructorPanel.visible = true;
} else{
  AddNewSectionBottomUpdateInstructorPanel.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AddCourseRemoveInstructorButton_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AddCourseRemoveInstructorButton_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    AddNewRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.instances[0].AddCourseRemoveInstructorButton.visible = false;
}

if (StageIndicator.value !== null) {
    this.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AddCourseRemoveInstructorButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AddCourseRemoveInstructorButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = AddNewRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.instanceCount;
AddNewRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.removeInstance(AddNewRepetitiveSectionBottomUpdateInstructorPanel.instanceIndex);

if (panelCount == "2") {
    AddNewRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.instances[0].AddCourseRemoveInstructorButton.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AN_Cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AN_Cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null && HiddenResultsetFiled.value !== null){
   var val  = HiddenResultsetFiled.value;
    val = JSON.parse(val);
  var data = val[0];
  var instructorArray = [];
                var instructorArrayFinal = [];

                instructorArray = data.instructors || [];

                for (var k = 0; k < instructorArray.length; k++) {
                    var instructorItem = instructorArray[k].NAME_EMPLID;
                    instructorArrayFinal.push(instructorItem);
                }

                AN_Cwid.items = instructorArrayFinal;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AN_Cwid_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AN_Cwid_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null && this.value !== null){
  $.ajax({
        type: 'GET',
        url: "/bin/getSCFRequestData",
        dataType: 'json',
        data: {
                    action: "SCHEDULE_CHANGE_FORM_ADD_NEW_SECTION_CWID_LOOKUP",
                    cwid: this.value
                },
        success: function(myresponse) {
          if(myresponse.length !== 0){
             AN_InstructorName.value = "";
            AN_InstructorName.value = myresponse[0].EMP_NAME;
          }
            
        },
    });
  
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_AddCourseAddInstructorButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_AddCourseAddInstructorButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            AddNewRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.addInstance();

if (AddNewRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.instances[0].AddCourseRemoveInstructorButton.visible === false) {
    AddNewRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.instances[0].AddCourseRemoveInstructorButton.visible = true;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_NewSectionAddButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_NewSectionAddButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            AddNewSectionMainContentPanel.instanceManager.addInstance();

if (AddNewSectionMainContentPanel.instanceManager.instances[0].AddNewSectionTitlePanel.AddNewSectionCancelButton.visible === false) {
    AddNewSectionMainContentPanel.instanceManager.instances[0].AddNewSectionTitlePanel.AddNewSectionCancelButton.visible = true;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_EditSectionRemoveButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_EditSectionRemoveButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = EditSectionMainContentPanel.instanceManager.instanceCount;
EditSectionMainContentPanel.instanceManager.removeInstance(EditSectionMainContentPanel.instanceIndex);
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button1777919713053_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button1777919713053_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
gifModal.style.display = "block";
        var classNumber = ES_ClassNumber.value;
        if (classNumber && String(classNumber).length === 5) {
            if (Semester.value && Year.value && Career.value) {
              var careerVal = Career.value;
               var acadplan = careerVal.slice(-4);
                $.ajax({
                    type: 'GET',
                    url: "/bin/getSCFRequestData",
                    data: {
                        action: "SCHEDULE_CHANGE_FORM_EDIT_SECTION_LOOKUP",
                        strm: STRM.value,
                        classNumber: classNumber, 
                        acadPlan: acadplan
                    },
                    dataType: 'json',
                    success: function(response) {
                        try {
                          debugger;
                            if (!response || !Array.isArray(response) || response.length === 0) {
                                gifModal.style.display = "none";
                                showErrorModal("Alert!", "Data not available");
                                return;
                            }
                            var data = response[0] || {};
                            ES_DATA_HOLD.value = JSON.stringify(response);
                            ES_INSTRUCTOR_DATA_HOLD.value = JSON.stringify(response);
                            ES_TableClassNumber.value = data.CLASS_NBR || "";
                            ES_Subject.value = data.SUBJECT || "";
                            ES_CatalogNumber.value = data.CATALOG_NBR || "";
                            ES_SectionNumber.value = data.CLASS_SECTION || "";
                            ES_CombinedRB.value = data.COMBINATION_RB || "";

                            if (data.COMBINATION_RB == "1") {
                              
                              var combo = data.COMBINATION;
                              for (var h = 0; h < combo.length; h++) {
                                if (h < (combo.length - 1)) {
                                    EditSectionCombinedRow.instanceManager.addInstance(true);
                                }
                                EditSectionCombinedRow.instanceManager.instances[h].ES_TClassNumber.value = combo[h].CLASS_NBR;
                                EditSectionCombinedRow.instanceManager.instances[h].ES_TClass.value = combo[h].COURSE_NAME + " - "+ combo[h].CLASS_SECTION;
                                EditSectionCombinedRow.instanceManager.instances[h].ES_TEnrollmentCap.value = combo[h].ENRL_CAP;
                                EditSectionCombinedRow.instanceManager.instances[h].ES_TWaitlistCap.value = combo[h].WAIT_CAP;
                            }
                            }

                            var meetingPattern = data.MEETING_PATTERN;
                          if(meetingPattern){
                          for (var i = 0; i < meetingPattern.length; i++) {
                                if (i < (meetingPattern.length - 1)) {
                                    EditMeetingPatternRow.instanceManager.addInstance(true);
                                }
                                EditMeetingPatternRow.instanceManager.instances[i].ES_Room.value = meetingPattern[i].FACILITY_ID;
                                EditMeetingPatternRow.instanceManager.instances[i].ES_MeetingDays.value = meetingPattern[i].DAYS;
                                EditMeetingPatternRow.instanceManager.instances[i].ES_MeetingStartTime.value = meetingPattern[i].MEETING_TIME_START;
                                EditMeetingPatternRow.instanceManager.instances[i].ES_MeetingEndTime.value = meetingPattern[i].MEETING_TIME_END;
                               EditMeetingPatternRow.instanceManager.instances[i].ES_Pat.value = meetingPattern[i].STND_MTG_PAT;
                            }
                          }
                          var classNote = data.CLASS_NOTE;
                          if(classNote){
                          for (var j = 0; j < classNote.length; j++) {
                                if (j < (classNote.length - 1)) {
                                    EditRepetitiveSectionClassNotePanel.instanceManager.addInstance(true);
                                }
                                EditRepetitiveSectionClassNotePanel.instanceManager.instances[j].ES_ClassNoteNbr.value = classNote[j].CLASS_NOTE_NBR;
                                EditRepetitiveSectionClassNotePanel.instanceManager.instances[j].ES_ClassNoteDescription.value = classNote[j].DESCR;
                            }
                          }
                          var instructorVal = data.INSTRUCTORS;
                          if(instructorVal){
                          for (var k = 0; k < instructorVal.length; k++) {
                                if (k < (instructorVal.length - 1)) {
                                    EditRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.addInstance(true);
                                }
                                EditRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.instances[k].ES_Cwid.value = instructorVal[k].NAME_EMPLID;
                                //EditRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.instances[k].ES_InstructorName.value = instructorVal[k].NAME;
                                EditRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.instances[k].ES_InstructorRole.value = instructorVal[k].INSTR_ROLE;
                                if(instructorVal[k].SCHED_PRINT_INSTR == "Y"){
                                  EditRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.instances[k].ES_PrintInstructorRB.value = "1";
                                } else {
                                  EditRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.instances[k].ES_PrintInstructorRB.value = "2";
                                }
                                
                            }
                          }
                          
                          var unitVal = data.UNITS;
                          if(unitVal){
                            ES_MinimumUnits.value = unitVal[0].UNITS_MINIMUM;
                            ES_MaximumUnits.value = unitVal[0].UNITS_MAXIMUM;
                          }
                          
                          var classRequisiteVal = data.CLASS_REQUISITE;
                          if(classRequisiteVal){
                          for (var l = 0; l < classRequisiteVal.length; l++) {
                                if (l < (classRequisiteVal.length - 1)) {
                                    EditSectionClassRequisiteRow.instanceManager.addInstance(true);
                                }
                                EditSectionClassRequisiteRow.instanceManager.instances[l].ES_ClassRequisite.value = classRequisiteVal[l].DESCR;         
                            }
                          }
                        
                          
                            if (!ChairName.value && !ChairEmailId.value && !ChairUserId.value &&
                                !DeanName.value && !DeanEmailId.value && !DeanUserId.value) {

                                ChairName.value = data.CHAIR_NAME || "";
                               // ChairEmailId.value = data.CHAIR_EMAIL || "";
                                ChairEmailId.value = "yjayaram@fullerton.edu";
                                ChairUserId.value = data.CHAIR_USERID || "";

                                DeanName.value = data.DEAN_NAME || "";
                              //  DeanEmailId.value = data.DEAN_EMAIL || "";
                                DeanEmailId.value = "yjayaram@fullerton.edu";
                                DeanUserId.value = data.DEAN_USERID || "";
                            }
                          
                          var tableValBasic = createEditSectionSummaryTable(data); 
                          $("#ExistingDataTable").empty();
                          $("#ExistingDataTable").append(tableValBasic);
                          tableText.visible = true;
                          displaytext.value = createEditSectionSummaryRichText(data);
                          gifModal.style.display = "none";
                        } catch (innerError) {
                            console.error("Processing error:", innerError);
                             gifModal.style.display = "none";
                            showErrorModal("Error", "Something went wrong while processing data");
                        }
                    },

                    error: function(error) {
                        console.error("API error:", error);
                        gifModal.style.display = "none";
                        showErrorModal("Error", "Failed to fetch data from server");
                    }
                });

            } else {
                gifModal.style.display = "none";
                showErrorModal("Alert!", "Please fill Semester, Year & Career fields before clicking lookup");
            }

        } else {
            gifModal.style.display = "none";
            showErrorModal("Alert!", "Please enter a valid 5-digit Class Number before lookup");
        }
    }

function createEditSectionSummaryTable(data) {

    var table = document.createElement("table");
    table.style.width = "100%";
    table.border = "1";
    table.style.borderCollapse = "collapse";

    var tr = table.insertRow(-1);

    var th1 = document.createElement("th");
    th1.innerHTML = "Section";
    tr.appendChild(th1);

    var th2 = document.createElement("th");
    th2.innerHTML = "Value";
    tr.appendChild(th2);

    function addRow(label, value) {

        var row = table.insertRow(-1);

        var cell1 = row.insertCell(-1);
        cell1.innerHTML = "<b>" + label + "</b>";

        var cell2 = row.insertCell(-1);
        cell2.innerHTML = value;
    }
  
  // Create wrapper container
var container = document.createElement("div");

// Class Information Table (Top)
var classInfoTable = document.createElement("table");
classInfoTable.style.width = "100%";
classInfoTable.style.borderCollapse = "collapse";
classInfoTable.style.marginBottom = "15px";
classInfoTable.border = "1";

classInfoTable.innerHTML =
     "<tr style='background:#002b5c;color:white;'>" +
        "<th colspan='4' style='font-size:20px !important;padding:10px;'>Current Class Information</th>" +
    "</tr>" +
    "<tr>" +
        "<th style='font-size:18px !important;'>Class Number</th>" +
        "<th style='font-size:18px !important;'>Subject</th>" +
        "<th style='font-size:18px !important;'>Catalog Number</th>" +
        "<th style='font-size:18px !important;'>Section Number</th>" +
    "</tr>" +
    "<tr>" +
        "<td style='font-size:18px !important;'>"+(data.CLASS_NBR||"")+"</td>" +
        "<td style='font-size:18px !important;'>"+(data.SUBJECT||"")+"</td>" +
        "<td style='font-size:18px !important;'>"+(data.CATALOG_NBR||"")+"</td>" +
        "<td style='font-size:18px !important;'>"+(data.CLASS_SECTION||"")+"</td>" +
    "</tr>";

container.appendChild(classInfoTable);


/*    addRow(
        "Class Information",
        "Class Number: " + (data.CLASS_NBR || "") +
        "<br>Subject: " + (data.SUBJECT || "") +
        "<br>Catalog Number: " + (data.CATALOG_NBR || "") +
        "<br>Section Number: " + (data.CLASS_SECTION || "")
    );*/

    if (data.MEETING_PATTERN && data.MEETING_PATTERN.length) {

        var meetingHtml =
            "<table border='1' width='100%'>" +
            "<tr>" +
            "<th>Room</th>" +
            "<th>Days</th>" +
            "<th>Pattern</th>" +
            "<th>Start</th>" +
            "<th>End</th>" +
            "</tr>";

        for (var i = 0; i < data.MEETING_PATTERN.length; i++) {

            meetingHtml +=
                "<tr>" +
                "<td>" + (data.MEETING_PATTERN[i].FACILITY_ID || "") + "</td>" +
                "<td>" + (data.MEETING_PATTERN[i].DAYS || "") + "</td>" +
                "<td>" + (data.MEETING_PATTERN[i].STND_MTG_PAT || "") + "</td>" +
                "<td>" + (data.MEETING_PATTERN[i].MEETING_TIME_START || "") + "</td>" +
                "<td>" + (data.MEETING_PATTERN[i].MEETING_TIME_END || "") + "</td>" +
                "</tr>";
        }

        meetingHtml += "</table>";

        addRow("Meeting Pattern", meetingHtml);
    }
  
  if (data.COMBINATION && data.COMBINATION.length) {

        var comboHtml =
            "<table border='1' width='100%'>" +
            "<tr>" +
            "<th>Class Number</th>" +
            "<th>Class</th>" +
            "<th>Enrollment Cap</th>" +
            "<th>Waitlist Cap</th>" +
            "</tr>";

        for (var z = 0; z < data.COMBINATION.length; z++) {

            comboHtml +=
                "<tr>" +
                "<td>" + (data.COMBINATION[z].CLASS_NBR || "") + "</td>" +
                "<td>" + (data.COMBINATION[z].COURSE_NAME+" - "+data.COMBINATION[z].CLASS_SECTION || "") + "</td>" +
                "<td>" + (data.COMBINATION[z].ENRL_CAP || "") + "</td>" +
                "<td>" + (data.COMBINATION[z].WAIT_CAP || "") + "</td>" +
                "</tr>";
        }

        comboHtml += "</table>";

        addRow("Combination Info", comboHtml);
    }
  
  if (data.CLASS_NOTE && data.CLASS_NOTE.length) {

        var classNoteHtml =
            "<table border='1' width='100%'>" +
            "<tr>" +
            "<th>Note Nbr</th>" +
            "<th>Class Note</th>" +
            "</tr>";

        for (var y = 0; y < data.CLASS_NOTE.length; y++) {

            classNoteHtml +=
                "<tr>" +
                "<td>" + (data.CLASS_NOTE[y].CLASS_NOTE_NBR || "") + "</td>" +
                "<td>" + (data.CLASS_NOTE[y].DESCR || "") + "</td>" +
                "</tr>";
        }

        classNoteHtml += "</table>";

        addRow("Class Note Info", classNoteHtml);
    }

    if (data.INSTRUCTORS && data.INSTRUCTORS.length) {

        var instructorHtml =
            "<table border='1' width='100%'>" +
            "<tr>" +
            "<th>CWID</th>" +
            "<th>Name</th>" +
            "<th>Role</th>" +
            "<th>Print</th>" +
            "</tr>";

        for (var j = 0; j < data.INSTRUCTORS.length; j++) {

            instructorHtml +=
                "<tr>" +
                "<td>" + (data.INSTRUCTORS[j].EMPLID || "") + "</td>" +
                "<td>" + (data.INSTRUCTORS[j].NAME || "") + "</td>" +
                "<td>" + (data.INSTRUCTORS[j].INSTR_ROLE || "") + "</td>" +
                "<td>" + (data.INSTRUCTORS[j].SCHED_PRINT_INSTR || "") + "</td>" +
                "</tr>";
        }

        instructorHtml += "</table>";

        addRow("Instructors", instructorHtml);
    }

    if (data.UNITS && data.UNITS.length) {
      
      var unitsHtml = 
       "<table border='1' width='100%'>" +
            "<tr>" +
            "<th>Minimum Units</th>" +
            "<th>Maximum Units</th>" +
            "</tr>";
  
  unitsHtml +=
                "<tr>" +
                "<td>" + (data.UNITS[0].UNITS_MINIMUM || "") + "</td>" +
                "<td>" + (data.UNITS[0].UNITS_MAXIMUM || "") + "</td>" +
                "</tr>";
  
  unitsHtml += "</table>";

        addRow("Unit Value Info", unitsHtml);

   /*     addRow(
            "Unit Value Info",
            "Minimum Units: " + data.UNITS[0].UNITS_MINIMUM +
            "<br>Maximum Units: " + data.UNITS[0].UNITS_MAXIMUM
        );*/
    }

    if (data.CLASS_REQUISITE && data.CLASS_REQUISITE.length) {

        var reqHtml = "<ul>";

        for (var k = 0; k < data.CLASS_REQUISITE.length; k++) {
            reqHtml += "<li>" + data.CLASS_REQUISITE[k].DESCR + "</li>";
        }

        reqHtml += "</ul>";

        addRow("Class Requisites", reqHtml);
    }

    container.appendChild(table);
return container;
}

function createEditSectionSummaryRichText(data) {

    var html = '<body xmlns="http://www.w3.org/1999/xhtml">';

    function divider() {
        html += '<p>════════════════════════════════════════════════════════</p>';
    }

    function heading(title) {
        divider();
        html += '<p><b>' + title.toUpperCase() + '</b></p>';
        divider();
        html += '<p></p>';
    }

    function p(text) {
        html += '<p>' + text + '</p>';
    }

    //=========================================================
    // CLASS INFORMATION
    //=========================================================

    heading("Current Class Information");

    p("<b>Class Number:</b> " + (data.CLASS_NBR || ""));
    p("<b>Subject:</b> " + (data.SUBJECT || ""));
    p("<b>Catalog Number:</b> " + (data.CATALOG_NBR || ""));
    p("<b>Section Number:</b> " + (data.CLASS_SECTION || ""));
    p("");

    //=========================================================
    // MEETING PATTERN
    //=========================================================

    if (data.MEETING_PATTERN && data.MEETING_PATTERN.length) {

        heading("Meeting Pattern");

        for (var i = 0; i < data.MEETING_PATTERN.length; i++) {

            var m = data.MEETING_PATTERN[i];

            p("<b>Meeting " + (i + 1) + "</b>");

            p(
                (m.FACILITY_ID || "") +
                " | " +
                (m.STND_MTG_PAT || "") +
                " | " +
                (m.DAYS || "") +
                " | " +
                (m.MEETING_TIME_START || "") +
                " - " +
                (m.MEETING_TIME_END || "")
            );

            p("");
        }
    }

    //=========================================================
    // COMBINATION INFORMATION
    //=========================================================

    if (data.COMBINATION && data.COMBINATION.length) {

        heading("Combination Information");

        for (var j = 0; j < data.COMBINATION.length; j++) {

            var c = data.COMBINATION[j];

            p("<b>Combination " + (j + 1) + "</b>");

            p(
                (c.CLASS_NBR || "") +
                " | " +
                (c.COURSE_NAME || "") +
                " " +
                (c.CATALOG_NBR || "") +
                "-" +
                (c.CLASS_SECTION || "") +
                " | Cap " +
                (c.ENRL_CAP || "") +
                " | Wait " +
                (c.WAIT_CAP || "")
            );

            p("");
        }
    }

    //=========================================================
    // CLASS NOTES
    //=========================================================

    if (data.CLASS_NOTE && data.CLASS_NOTE.length) {

        heading("Class Notes");

        for (var k = 0; k < data.CLASS_NOTE.length; k++) {

            var note = data.CLASS_NOTE[k];

            p(
                "<b>Note " + (k + 1) + "</b>"
            );

            p(
                (note.CLASS_NOTE_NBR || "") +
                " | " +
                (note.DESCR || "")
            );

            p("");
        }
    }

    //=========================================================
    // INSTRUCTORS
    //=========================================================

    if (data.INSTRUCTORS && data.INSTRUCTORS.length) {

        heading("Instructors");

        for (var l = 0; l < data.INSTRUCTORS.length; l++) {

            var ins = data.INSTRUCTORS[l];

            p("<b>" + (ins.NAME || "") + "</b>");

            p(
                (ins.EMPLID || "") +
                " | " +
                (ins.INSTR_ROLE || "") +
                " | Print: " +
                (ins.SCHED_PRINT_INSTR || "")
            );

            p("");
        }
    }

    //=========================================================
    // UNIT VALUES
    //=========================================================

    if (data.UNITS && data.UNITS.length) {

        heading("Unit Values");

        p(
            "Minimum: " +
            (data.UNITS[0].UNITS_MINIMUM || "") +
            " | Maximum: " +
            (data.UNITS[0].UNITS_MAXIMUM || "")
        );

        p("");
    }

    //=========================================================
    // CLASS REQUISITES
    //=========================================================

    if (data.CLASS_REQUISITE && data.CLASS_REQUISITE.length) {

        heading("Class Requisites");

        for (var r = 0; r < data.CLASS_REQUISITE.length; r++) {

            p("• " + (data.CLASS_REQUISITE[r].DESCR || ""));
        }

        p("");
    }

    divider();

    html += '</body>';

    return html;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_tableText_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_tableText_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_tableText_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_tableText_init1 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value !== null && ES_DATA_HOLD.value !== null){
  var val  = ES_DATA_HOLD.value;
    val = JSON.parse(val);
  var data = val[0];
  var tableValBasic = createEditSectionSummaryTable(data); 
                          $("#ExistingDataTable").empty();
                          $("#ExistingDataTable").append(tableValBasic);
                          tableText.visible = true;
}

function createEditSectionSummaryTable(data) {

    var table = document.createElement("table");
    table.style.width = "100%";
    table.border = "1";
    table.style.borderCollapse = "collapse";

    var tr = table.insertRow(-1);

    var th1 = document.createElement("th");
    th1.innerHTML = "Section";
    tr.appendChild(th1);

    var th2 = document.createElement("th");
    th2.innerHTML = "Value";
    tr.appendChild(th2);

    function addRow(label, value) {

        var row = table.insertRow(-1);

        var cell1 = row.insertCell(-1);
        cell1.innerHTML = "<b>" + label + "</b>";

        var cell2 = row.insertCell(-1);
        cell2.innerHTML = value;
    }
  
  // Create wrapper container
var container = document.createElement("div");

// Class Information Table (Top)
var classInfoTable = document.createElement("table");
classInfoTable.style.width = "100%";
classInfoTable.style.borderCollapse = "collapse";
classInfoTable.style.marginBottom = "15px";
classInfoTable.border = "1";

classInfoTable.innerHTML =
     "<tr style='background:#002b5c;color:white;'>" +
        "<th colspan='4' style='font-size:20px !important;padding:10px;'>Class Information</th>" +
    "</tr>" +
    "<tr>" +
        "<th style='font-size:18px !important;'>Class Number</th>" +
        "<th style='font-size:18px !important;'>Subject</th>" +
        "<th style='font-size:18px !important;'>Catalog Number</th>" +
        "<th style='font-size:18px !important;'>Section Number</th>" +
    "</tr>" +
    "<tr>" +
        "<td style='font-size:18px !important;'>"+(data.CLASS_NBR||"")+"</td>" +
        "<td style='font-size:18px !important;'>"+(data.SUBJECT||"")+"</td>" +
        "<td style='font-size:18px !important;'>"+(data.CATALOG_NBR||"")+"</td>" +
        "<td style='font-size:18px !important;'>"+(data.CLASS_SECTION||"")+"</td>" +
    "</tr>";

container.appendChild(classInfoTable);


/*    addRow(
        "Class Information",
        "Class Number: " + (data.CLASS_NBR || "") +
        "<br>Subject: " + (data.SUBJECT || "") +
        "<br>Catalog Number: " + (data.CATALOG_NBR || "") +
        "<br>Section Number: " + (data.CLASS_SECTION || "")
    );*/

    if (data.MEETING_PATTERN && data.MEETING_PATTERN.length) {

        var meetingHtml =
            "<table border='1' width='100%'>" +
            "<tr>" +
            "<th>Room</th>" +
            "<th>Days</th>" +
            "<th>Pattern</th>" +
            "<th>Start</th>" +
            "<th>End</th>" +
            "</tr>";

        for (var i = 0; i < data.MEETING_PATTERN.length; i++) {

            meetingHtml +=
                "<tr>" +
                "<td>" + (data.MEETING_PATTERN[i].FACILITY_ID || "") + "</td>" +
                "<td>" + (data.MEETING_PATTERN[i].DAYS || "") + "</td>" +
                "<td>" + (data.MEETING_PATTERN[i].STND_MTG_PAT || "") + "</td>" +
                "<td>" + (data.MEETING_PATTERN[i].MEETING_TIME_START || "") + "</td>" +
                "<td>" + (data.MEETING_PATTERN[i].MEETING_TIME_END || "") + "</td>" +
                "</tr>";
        }

        meetingHtml += "</table>";

        addRow("Meeting Pattern", meetingHtml);
    }
  
  if (data.COMBINATION && data.COMBINATION.length) {

        var comboHtml =
            "<table border='1' width='100%'>" +
            "<tr>" +
            "<th>Class Number</th>" +
            "<th>Class</th>" +
            "<th>Enrollment Cap</th>" +
            "<th>Waitlist Cap</th>" +
            "</tr>";

        for (var z = 0; z < data.COMBINATION.length; z++) {

            comboHtml +=
                "<tr>" +
                "<td>" + (data.COMBINATION[z].CLASS_NBR || "") + "</td>" +
                "<td>" + (data.COMBINATION[z].COURSE_NAME+" - "+data.COMBINATION[z].CLASS_SECTION || "") + "</td>" +
                "<td>" + (data.COMBINATION[z].ENRL_CAP || "") + "</td>" +
                "<td>" + (data.COMBINATION[z].WAIT_CAP || "") + "</td>" +
                "</tr>";
        }

        comboHtml += "</table>";

        addRow("Combination Info", comboHtml);
    }
  
  if (data.CLASS_NOTE && data.CLASS_NOTE.length) {

        var classNoteHtml =
            "<table border='1' width='100%'>" +
            "<tr>" +
            "<th>Note Nbr</th>" +
            "<th>Class Note</th>" +
            "</tr>";

        for (var y = 0; y < data.CLASS_NOTE.length; y++) {

            classNoteHtml +=
                "<tr>" +
                "<td>" + (data.CLASS_NOTE[y].CLASS_NOTE_NBR || "") + "</td>" +
                "<td>" + (data.CLASS_NOTE[y].DESCR || "") + "</td>" +
                "</tr>";
        }

        classNoteHtml += "</table>";

        addRow("Class Note Info", classNoteHtml);
    }

    if (data.INSTRUCTORS && data.INSTRUCTORS.length) {

        var instructorHtml =
            "<table border='1' width='100%'>" +
            "<tr>" +
            "<th>CWID</th>" +
            "<th>Name</th>" +
            "<th>Role</th>" +
            "<th>Print</th>" +
            "</tr>";

        for (var j = 0; j < data.INSTRUCTORS.length; j++) {

            instructorHtml +=
                "<tr>" +
                "<td>" + (data.INSTRUCTORS[j].EMPLID || "") + "</td>" +
                "<td>" + (data.INSTRUCTORS[j].NAME || "") + "</td>" +
                "<td>" + (data.INSTRUCTORS[j].INSTR_ROLE || "") + "</td>" +
                "<td>" + (data.INSTRUCTORS[j].SCHED_PRINT_INSTR || "") + "</td>" +
                "</tr>";
        }

        instructorHtml += "</table>";

        addRow("Instructors", instructorHtml);
    }

    if (data.UNITS && data.UNITS.length) {
      
      var unitsHtml = 
       "<table border='1' width='100%'>" +
            "<tr>" +
            "<th>Minimum Units</th>" +
            "<th>Maximum Units</th>" +
            "</tr>";
  
  unitsHtml +=
                "<tr>" +
                "<td>" + (data.UNITS[0].UNITS_MINIMUM || "") + "</td>" +
                "<td>" + (data.UNITS[0].UNITS_MAXIMUM || "") + "</td>" +
                "</tr>";
  
  unitsHtml += "</table>";

        addRow("Unit Value Info", unitsHtml);

   /*     addRow(
            "Unit Value Info",
            "Minimum Units: " + data.UNITS[0].UNITS_MINIMUM +
            "<br>Maximum Units: " + data.UNITS[0].UNITS_MAXIMUM
        );*/
    }

    if (data.CLASS_REQUISITE && data.CLASS_REQUISITE.length) {

        var reqHtml = "<ul>";

        for (var k = 0; k < data.CLASS_REQUISITE.length; k++) {
            reqHtml += "<li>" + data.CLASS_REQUISITE[k].DESCR + "</li>";
        }

        reqHtml += "</ul>";

        addRow("Class Requisites", reqHtml);
    }

    container.appendChild(table);
return container;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_headerItem17793741763961779374177776_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_headerItem17793741763961779374177776_click0 = function (scope) {
    with(this) {
        with(scope) {
            

var panelCount = EditMeetingPatternRow.instanceManager.instanceCount;
EditMeetingPatternRow.instanceManager.removeInstance(EditMeetingPatternRow.instanceIndex);
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button_7008236671779373946963_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button_7008236671779373946963_click0 = function (scope) {
    with(this) {
        with(scope) {
            EditMeetingPatternRow.instanceManager.addInstance();
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_ES_CombinedRB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_ES_CombinedRB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
  if(this.value == "1"){
    EditSectionCombinedWithPanel.visible = true;
EditSectionCombinedDeletionPanel.visible = true;
  } else{
    EditSectionCombinedWithPanel.visible = false;
EditSectionCombinedDeletionPanel.visible = false;
  }

        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_headerItem17793809031601779380904405_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_headerItem17793809031601779380904405_click0 = function (scope) {
    with(this) {
        with(scope) {
            EditSectionCombinedRow.instanceManager.removeInstance(EditSectionCombinedRow.instanceIndex);
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button_12138898691779369350942_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button_12138898691779369350942_click0 = function (scope) {
    with(this) {
        with(scope) {
            EditSectionCombinedRow.instanceManager.addInstance();
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button1779372980630_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button1779372980630_click0 = function (scope) {
    with(this) {
        with(scope) {
            EditRepetitiveSectionClassNotePanel.instanceManager.removeInstance(EditRepetitiveSectionClassNotePanel.instanceIndex);
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button_16642898411779373337219_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button_16642898411779373337219_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {

        var classNoteNbr = ES_ClassNoteNbr.value;

        if (classNoteNbr) {
            if (Semester.value && Year.value && Career.value) {
                $.ajax({
                    type: 'GET',
                    url: "/bin/getSCFRequestData",
                    data: {
                        action: "SCHEDULE_CHANGE_FORM_CLASS_NOTE_LOOKUP",
                        strm: STRM.value,
                        classnotenbr: classNoteNbr
                    },
                    dataType: 'json',
                    success: function(response) {
                        try {
                           if(response.length >= 1){
                             ES_ClassNoteDescription.value = response[0].DESCR;
                           }

                        } catch (innerError) {
                            console.error("Processing error:", innerError);
                            showErrorModal("Error", "Something went wrong while processing data");
                        }
                    },

                    error: function(error) {
                        console.error("API error:", error);
                        showErrorModal("Error", "Failed to fetch data from server");
                    }
                });

            } else {
                showErrorModal("Alert!", "Please fill Semester, Year & Career fields before clicking lookup");
            }

        } else {
            showErrorModal("Alert!", "Please enter a valid class note number");
        }
    }

        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button1779373772293_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button1779373772293_click0 = function (scope) {
    with(this) {
        with(scope) {
            EditRepetitiveSectionClassNotePanel.instanceManager.addInstance();
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button1780460525638_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button1780460525638_click0 = function (scope) {
    with(this) {
        with(scope) {
            EditRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.removeInstance(EditRepetitiveSectionBottomUpdateInstructorPanel.instanceIndex);
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_ES_Cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_ES_Cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null && ES_INSTRUCTOR_DATA_HOLD.value !== null){
   var val  = ES_INSTRUCTOR_DATA_HOLD.value;
    val = JSON.parse(val);
  var data = val[0];
  var instructorArray = [];
                var instructorArrayFinal = [];

                instructorArray = data.INSTRUCTOR_CWID || [];

                for (var k = 0; k < instructorArray.length; k++) {
                    var instructorItem = instructorArray[k].NAME_EMPLID;
                    instructorArrayFinal.push(instructorItem);
                }

                ES_Cwid.items = instructorArrayFinal;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_ES_Cwid_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_ES_Cwid_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null && this.value !== null){
  $.ajax({
        type: 'GET',
        url: "/bin/getSCFRequestData",
        dataType: 'json',
        data: {
                    action: "SCHEDULE_CHANGE_FORM_ADD_NEW_SECTION_CWID_LOOKUP",
                    cwid: this.value
                },
        success: function(myresponse) {
          if(myresponse.length !== 0){
             ES_InstructorName.value = "";
            ES_InstructorName.value = myresponse[0].EMP_NAME;
          }
            
        },
    });
  
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button_7079430081780461297297_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button_7079430081780461297297_click0 = function (scope) {
    with(this) {
        with(scope) {
            EditRepetitiveSectionBottomUpdateInstructorPanel.instanceManager.addInstance();
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_tableItem12_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_tableItem12_click0 = function (scope) {
    with(this) {
        with(scope) {
            EditSectionClassRequisiteRow.instanceManager.removeInstance(EditSectionClassRequisiteRow.instanceIndex);
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_button1780557481277_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_button1780557481277_click0 = function (scope) {
    with(this) {
        with(scope) {
            EditSectionClassRequisiteRow.instanceManager.addInstance();
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_EditSectionAddButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_EditSectionAddButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            EditSectionMainContentPanel.instanceManager.addInstance();
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_SupportingDocuments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_SupportingDocuments_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = true;
} else {
  this.visible = false;
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_supportDoc1_valueCommit0 = function (scope) {
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
 * @function schedule_change_form_schedule_change_form.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_supportDoc2_valueCommit0 = function (scope) {
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
 * @function schedule_change_form_schedule_change_form.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_supportDoc3_valueCommit0 = function (scope) {
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
 * @function schedule_change_form_schedule_change_form.generated_InitiatorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_InitiatorCB_valueCommit0 = function (scope) {
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
                InitiatorSignature.value = userValue;
                InitiatorSignatureDate.value = myresopnse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        InitiatorSignature.enabled = false;
        InitiatorSignatureDate.enabled = false;
    } else {
        InitiatorSignature.value = "";
        InitiatorSignatureDate.value = null;
    }
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_InitiatorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_InitiatorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_InitiatorSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_InitiatorSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_ChairCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_ChairCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToChair") {
    if (this.value == 1) {
        var userValue;
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                ChairSignature.value = userValue;
                ChairSignatureDate.value = myresopnse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        ChairSignature.enabled = false;
        ChairSignatureDate.enabled = false;
    } else {
        ChairSignature.value = "";
        ChairSignatureDate.value = null;
    }
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_ChairSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_ChairSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_ChairSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_ChairSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_DeanCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_DeanCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToDean") {
    if (this.value == 1) {
        var userValue;
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                DeanSignature.value = userValue;
                DeanSignatureDate.value = myresopnse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        DeanSignature.enabled = false;
        DeanSignatureDate.enabled = false;
    } else {
        DeanSignature.value = "";
        DeanSignatureDate.value = null;
    }
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_DeanSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_DeanSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_DeanSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_DeanSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_ExtensionOfficeCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_ExtensionOfficeCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToExtensionOffice") {
    if (this.value == 1) {
        var userValue;
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                ExtensionOfficeSignature.value = userValue;
                ExtensionOfficeSignatureDate.value = myresopnse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        ExtensionOfficeSignature.enabled = false;
        ExtensionOfficeSignatureDate.enabled = false;
    } else {
        ExtensionOfficeSignature.value = "";
        ExtensionOfficeSignatureDate.value = null;
    }
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_ExtensionOfficeSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_ExtensionOfficeSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_ExtensionOfficeSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_ExtensionOfficeSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_SchedulingOfficeCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_SchedulingOfficeCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToSchedulingOffice") {
    if (this.value == 1) {
        var userValue;
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresopnse) {
                var userValue = myresopnse.userName;
                SchedulingOfficeSignature.value = userValue;
                SchedulingOfficeSignatureDate.value = myresopnse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        SchedulingOfficeSignature.enabled = false;
        SchedulingOfficeSignatureDate.enabled = false;
    } else {
        SchedulingOfficeSignature.value = "";
        SchedulingOfficeSignatureDate.value = null;
    }
}
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_SchedulingOfficeSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_SchedulingOfficeSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_SchedulingOfficeSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_SchedulingOfficeSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function schedule_change_form_schedule_change_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(FirstName.value !== null && LastName.value !== null){
   getPdf();
} else{
   showErrorModal("Alert!", "Please fill all details");
}
    


function getPdf() {
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            console.log("xml=" + result.data);
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/schedule-change-form/schedule-change-form');
            jsonData.append('fileName', "Schedule Change Form - "+FirstName.value + " "+LastName.value);
            console.log("jsonData: " + jsonData);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/bin/getDoR', true);
            xhr.responseType = 'blob';
            xhr.send(jsonData);
            xhr.onload = function() {
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
                            blob = new File([this.response], filename, {
                                type: type
                            });
                        } catch (e) {
                            /* Edge */ }
                    }
                    if (typeof blob === 'undefined') {
                        blob = new Blob([this.response], {
                            type: type
                        });
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
                        setTimeout(function() {
                            URL.revokeObjectURL(downloadUrl);
                        }, 100); // cleanup
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
 * @function schedule_change_form_schedule_change_form.generated_submit1600234699256_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
schedule_change_form_schedule_change_form.generated_submit1600234699256_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  aftiaDescCWID.value = InitiatorFullName.value+" "+CWID.value;
  EmailSubject.value = "Test - Schedule Change Form - "+InitiatorFullName.value+"(SCF "+CaseID.value+")";
}

InitiatorEmail.value = "dmalinao@FULLERTON.EDU"; 
ChairEmailId.value = "dmalinao@FULLERTON.EDU"; 
DeanEmailId.value = "dmalinao@FULLERTON.EDU"; 

guideBridge.submit();
        }
	}
}
