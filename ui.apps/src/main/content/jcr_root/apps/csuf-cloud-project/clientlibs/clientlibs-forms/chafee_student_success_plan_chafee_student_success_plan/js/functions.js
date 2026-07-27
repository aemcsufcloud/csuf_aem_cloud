/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            var flag;
if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(response) {
            // gifModal.style.display = "block";

          //  var userValue = response.userId;
            //var userValue = 'mariana2'; // two Aid Year
            //var userValue = 'majesticallexi'; // one Aid Year
            // var userValue = 'mchoi88';			 	// no Aid Year
            // var userValue = 'lesliep5372';
            var userValue = 'ashleymscott86';
            // var userValue = 'veronica.maciel';
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
        url: "/bin/getCitizenShipData",

        data: {
            action: "CV_USER_DETAILS",
            userID: userValue
        },

        dataType: 'json',
        success: function(response) {
            if (response.length >= 1) {
                var eopVal = "";
                var studentCWID = response[0].EMPLID;
                // var studentCWID = "885269399"; //EOP Student
                firstName.value = response[0].FIRST_NAME;
                lastName.value = response[0].LAST_NAME;
                StudentUserId.value = response[0].USERID;
                SCwid.value = studentCWID;
                cwid.value = studentCWID;
             //   StudentEmailId.value = response[0].PREF_EMAIL;
                StudentEmailId.value ="shreyas.manjunatha@thoughtfocus.com";
                StudentFullName.value = response[0].FIRST_NAME + " " + response[0].LAST_NAME;
                EOPStatusCheck(studentCWID);
                // getStudentAidYearDetails(studentCWID);
            } else {
                showErrorModal("Alert!", "No matching records found");
            }
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}


function getStudentAidYearDetails(studentCWID) {
    $.ajax({
        type: 'GET',
        url: "/bin/getTaxFilingStatementDetails",
        data: {
            action: 'STUDENT_DETAILS',
            cwid: studentCWID
        },
        dataType: 'json',
        success: function(response) {
            if (response.length > 0) {
                var aidYears = [];
                var aidYearsObj = {};
                var identifyAidYearFlag;
                for (var a = 0; a < response.length; a++) {
                    aidYears.push(response[a]);
                }

                for (var b = 0; b < aidYears.length; b++) {
                    aidYearsObj = aidYears[b];
                    for (var key in aidYearsObj) {
                        if ("AID_YEAR" == key) {
                            identifyAidYearFlag = "OneAidYear";
                            flag = "OneAidYear";
                        } else if ("SECOND_AID_YEAR" == key) {
                            identifyAidYearFlag = "TwoAidYear";
                            flag = "TwoAidYear";
                        }
                    }
                }
                var typeOfAidYear = getUrlParameters('aidYear');
                if (typeOfAidYear == "0") {
                    singleAidYear();
                } else if (typeOfAidYear == "1") {
                    singleAidYear();
                } else if (identifyAidYearFlag == "OneAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
                    singleAidYear();
                } else if (identifyAidYearFlag == "TwoAidYear" && (typeOfAidYear != "0" || typeOfAidYear != "1")) {
                    // aidYearPopup();
                    singleAidYear();
                } else {
                   // showErrorModal("Alert !", "No matching records found for the Aid Year");
                   singleAidYear();
                }
            } else {
                //showErrorModal("Alert !", "No matching records found");
                singleAidYear();
            }
        }
    });
}


function aidYearPopup() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var formCodeVal = "";
    modal.style.display = "block";
    span.onclick = function() {

        if ((document.getElementById("button1").checked === false) && (document.getElementById("button2").checked === false)) {
            modal.style.display = "block";
            showErrorModal("Alert !", "Please select the financial aid year");

        } else {
            modal.style.display = "none";
        }
    };

    document.getElementById("button1").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = "2022-2023";
        AidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1CHAF";
        formCodeVal = "F1CHAF";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = "2023-2024";
        AidYear.value = "2024";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0CHAF";
        formCodeVal = "F0CHAF";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    };
}

function singleAidYear() {
    var typeOfAidYear = getUrlParameters('aidYear');
    var financialAidYearVal = "";
    var formCodeVal = "";
    if (typeOfAidYear == '0') {
        financialAidYearVal = "2023-2024";
        AidYear.value = "2024";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0CHAF";
        formCodeVal = "F0CHAF";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }/* else if (typeOfAidYear == '1') {
        financialAidYearVal = "2022-2023";
        AidYear.value = "2023";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1CHAF";
        formCodeVal = "F1CHAF";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }*/ else {
        financialAidYearVal = "2023-2024";
        AidYear.value = "2024";
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0CHAF";
        formCodeVal = "F0CHAF";
        getCDAFinancialAidYear(aidYearValue);
        checkforDuplicateSubmissions(formCodeVal);
    }

    if (StageIndicator.value !== null) {
        aidYearValue = financialAidYear.value;
        getCDAFinancialAidYear(aidYearValue);
    }

}


if (StageIndicator.value !== null) {
    aidYearValue = financialAidYear.value;
    getCDAFinancialAidYear(aidYearValue);
}

function getCDAFinancialAidYear(financialAidYear) {
    var financialAidYearVal = financialAidYear;
    //var taxFilingYear = getFinancialAidTaxYear(financialAidYearVal);
    var taxFilingYear = AidYear.value;

    var formTextVal = "";
    if (financialAidYear == "2023-2024") {
        formTextVal = "<p><b>F0CHAF</b></p>";
    }
    if (financialAidYear == "2022-2023") {
        formTextVal = "<p><b>F1CHAF</b></p>";
    }
    var headingTextVal = "<p><b>CHAFEE STUDENT SUCCESS PLAN (".concat(financialAidYear).concat(")</b></p>");


    $("#CHAFFormText").html(formTextVal);
    $("#CHAFTitleText").html(headingTextVal);
}

function checkforDuplicateSubmissions(formCodeVal) {
    var tableName = "AEM_CHAFEE_STUDENT_SUCCESSPLAN";
    var financialAidDecisionColumnName = "FINANCIAL_AID_DECISION";
    var formCodeColumnName = "FORM_CODE";
    var faDecision = "1";
    var financialAidYearColumn = "FINANCIAL_AID_YEAR";
    if (StageIndicator.value === null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getCitizenShipData",
            data: {
                action: 'CV_UPDATED_DUPLICATE_CHECK',
                cwid: cwid.value,
                financialAidYear: financialAidYear.value,
                faDecisionColumnName: financialAidDecisionColumnName,
                tableName: tableName,
                formCodeColumnName: formCodeColumnName,
                formCode: formCodeVal,
                faDecision: faDecision,
                financialAidYearColumn: financialAidYearColumn
            },
            dataType: 'json',
            success: function(myresponse) {
                if (myresponse.length >= 1) {
                    showErrorModal("Alert !", "Duplicate submissions are not allowed");
                    submit1575264176703.enabled = false;
                }
            },
        });
    }
}

function EOPStatusCheck(CWID) {
    $.ajax({
        type: 'GET',
        url: "/bin/SAPAppealServlet",
        data: {
            cwid: CWID,
            action: "SAP_EOP_DATA"
        },
        dataType: 'json',
        success: function(myresponse) {
            if (myresponse.length >= 1) {
                getStudentAidYearDetails(CWID);
            } else {
                submit1575264176703.enabled = false;
                showErrorModal("Alert !", "Non EOP students cannot submit the form");
            }
        },
    });
}
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    AcademicAdvisorSignaturePanel.visible = false;
    FinancialAidSignaturePanel.visible = false;
}

if (StageIndicator.value == "ToAcademicAdvisor") {
    StudentInformation.enabled = false;
    AcademicAdvisorPanel.enabled = false;
    StudentSignaturePanel.enabled = false;
    FinancialAidSignaturePanel.visible = false;
}

if (StageIndicator.value == "ToFinancialAid") {
    StudentInformation.enabled = false;
    ChafeeSuccessPlanPanel.enabled = false;
    AcademicPlanPanel.enabled = false;
    StudentSignaturePanel.enabled = false;
    AcademicAdvisorSignaturePanel.enabled = false;
    AdditionalPanelButton.visible = false;
    var elements = document.getElementsByClassName('guideTableRuntimeControls guideTableRuntimeRightControls');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_caseId_init0 = function (scope) {
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
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_firstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_firstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_lastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_lastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_Date_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
    var dateString = new Date().toLocaleString("en-US", {
        timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
    }).replace(/[^ -~]/g, '');
    var dateObject = new Date(dateString);
    var curyear = dateObject.getFullYear();
    var curyearMonth = dateObject.getMonth() + 1;
    var curyearDay = dateObject.getDate();
    var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
    this.value = d;
}
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_Date_1_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_Date_1_init1 = function (scope) {
    with(this) {
        with(scope) {
            debugger; 
if(StageIndicator.value === null){
	  this.enabled = false;

  Date_1.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_AcademicAdvisorName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_AcademicAdvisorName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_textbox1667452154106_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_textbox1667452154106_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var appResult = [];
    if (this.value !== null) {
        $.ajax({
            type: 'GET',
            url: "/bin/getFAERData",
            data: {
                action: "FAER_SEARCH_APPROVER",
                lastName: this.value
            },
            dataType: 'json',
            success: function(fundApproverResult) {
                if (fundApproverResult.length !== 0) {
                    //appResult.push("Select Optional Reviewer");
                    for (var i = 0; i < fundApproverResult.length; i++) {
                        var item = fundApproverResult[i].FIRSTNAME + " " + fundApproverResult[i].LASTNAME;
                     //   var uid = fundApproverResult[i].EMAILID;
                       var uid = "shreyas.manjunatha@thoughtfocus.com";
                        var idItem = i + 1;
                        appResult.push(item + " - " + uid);
                    }
                    AcademicAdvisorDropDown.value = "";
                    AcademicAdvisorDropDown.items = appResult;
                    AcademicAdvisorName.value = "";
                    AcademicAdvisorUserId.value = "";
                    AcademicAdvisorEmailId.value = "";
                } else {
                    showErrorModal("Alert!", "No matching records found");
                    AcademicAdvisorDropDown.items = [];
                    AcademicAdvisorDropDown.value = "";
                    AcademicAdvisorName.value = "";
                    AcademicAdvisorUserId.value = "";
                    AcademicAdvisorEmailId.value = "";
                }
            }
        });
    }
}
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_AcademicAdvisorDropDown_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_AcademicAdvisorDropDown_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var approverName = this.value;
    var approverEmplId;
    if (approverName != "Select Optional Reviewer" && approverName !== "") {
        approverName = approverName.substr(0, approverName.indexOf(' - '));
        AcademicAdvisorName.value = approverName;
        $.ajax({
            type: 'GET',
            url: "/bin/getFAERData",
            data: {
                action: "FAER_APPROVER_EMPID",
                approverName: approverName
            },
            dataType: 'json',
            success: function(myresopnse) {
                if (myresopnse[0].EMPLID !== null) {
                    approverEmplId = myresopnse[0].EMPLID;
                    getEmployeeDetails(approverEmplId);
                } else {
                    AcademicAdvisorName.value = "";
                    AcademicAdvisorUserId.value = "";
                    AcademicAdvisorEmailId.value = "";
                }
            }
        });
    } else {
        AcademicAdvisorName.value = "";
        AcademicAdvisorUserId.value = "";
        AcademicAdvisorEmailId.value = "";
    }
}

function getEmployeeDetails(approverEmplId) {
    if (StageIndicator.value === null) {
        if (approverEmplId !== null) {
            $.ajax({
                type: 'GET',
                url: "/bin/getFAERData",
                data: {
                    action: "FAER_APPROVER_DETAILS",
                    approverEmplID: approverEmplId
                },
                dataType: 'json',
                success: function(myresopnse) {
                    if (myresopnse.length !== 0) {
                        AcademicAdvisorUserId.value = myresopnse[0].EMP_USERID;
                       // AcademicAdvisorEmailId.value = myresopnse[0].EMAILID;
                        AcademicAdvisorEmailId.value = "shreyas.manjunatha@thoughtfocus.com";    
                    } else {
                        AcademicAdvisorName.value = "";
                        AcademicAdvisorUserId.value = "";
                        AcademicAdvisorEmailId.value = "";
                    }
                }
            });
        }
    }
}
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_RemoveButton_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_RemoveButton_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    AcademicPanel.instanceManager.instances[0].RemoveButton.visible = false;
}
if (StageIndicator.value == "ToAcademicAdvisor") {
    var panelCount = AcademicPanel.instanceManager.instanceCount;
    if (panelCount == "1") {
        AcademicPanel.instanceManager.instances[0].RemoveButton.visible = false;
    }
}
if (StageIndicator.value == "ToFinancialAid") {
    this.visible = false;
}
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_RemoveButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_RemoveButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            var panelCount = AcademicPanel.instanceManager.instanceCount;
AcademicPanel.instanceManager.removeInstance(AcademicPanel.instanceIndex);
if (panelCount == "2") {
    AcademicPanel.instanceManager.instances[0].RemoveButton.visible = false;
}
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_AdditionalPanelButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_AdditionalPanelButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            AcademicPanel.instanceManager.addInstance();

if (AcademicPanel.instanceManager.instances[0].RemoveButton.visible === false) {
    AcademicPanel.instanceManager.instances[0].RemoveButton.visible = true;
}
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_SupportingDocuments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_SupportingDocuments_init0 = function (scope) {
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
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_checkbox1649834861348_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_checkbox1649834861348_valueCommit0 = function (scope) {
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
                StudentName.value = StudentFullName.value;
                StudentSignatureDate.value = myresponse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        StudentName.enabled = false;
        StudentSignatureDate.enabled = false;
    } else {
        StudentName.value = "";
        StudentSignatureDate.value = "";
    }
}
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_IPAddress_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_IPAddress_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {     		
  	$.getJSON("https://api.ipify.org?format=json", function(data) {                
        IPAddress.value = data.ip;        
    });
}
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_StudentName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_StudentName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_StudentSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_StudentSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_StudentComments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_StudentComments_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible=false;
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_checkbox1667398814350_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_checkbox1667398814350_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToAcademicAdvisor") {
    if (this.value == 1) {
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresponse) {
                var userValue = myresponse.userName;
                AcademicAdvisorSignature.value = userValue;
                AcademicAdvisorSignatureDate.value = myresponse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        AcademicAdvisorSignature.enabled = false;
        AcademicAdvisorSignatureDate.enabled = false;
    } else {
        AcademicAdvisorSignature.value = "";
        AcademicAdvisorSignatureDate.value = "";
    }
}
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_AcademicAdvisorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_AcademicAdvisorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_AcademicAdvisorSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_AcademicAdvisorSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_checkbox1649838422969_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_checkbox1649838422969_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToFinancialAid") {
    if (this.value == 1) {
        $.ajax({
            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',
            success: function(myresponse) {
                var userValue = myresponse.userName;
                FinancialAidSignature.value = userValue;
                FinancialAidSignatureDate.value = myresponse.SERVER_DATE;
                financialAidAssignee.value = myresponse.userId;
            },
            error: function(error) {
                alert("error block=" + error);
            }
        });
        FinancialAidSignature.enabled = false;
        FinancialAidSignatureDate.enabled = false;
    } else {
        FinancialAidSignature.value = "";
        FinancialAidSignatureDate.value = "";
        financialAidAssignee.value = "";
    }
}
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_FinancialAidSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_FinancialAidSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_FinancialAidSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_FinancialAidSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (AidYear.value !== null) {
    getPdf();
} else {
    alert("Please fill all the required fields");
    showErrorModal("Alert!", "Please Select Aid Year");
}

function getPdf() {
    window.guideBridge.getDataXML({
        success: function(result) {
            console.log("in view pdf=" + result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/chafee-student-success-plan/chafee-student-success-plan');
            jsonData.append('fileName', StudentFullName.value);
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
 * @function chafee_student_success_plan_chafee_student_success_plan.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
chafee_student_success_plan_chafee_student_success_plan.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    aftiaDescCWID.value = StudentFullName.value + " " + cwid.value;
    EmailSubject.value = "Test - Chafee Student Success Plan - " + cwid.value;
}

StudentEmailId.value = "shreyas.manjunatha@thoughtfocus.com";
AcademicAdvisorEmailId.value = "shreyas.manjunatha@thoughtfocus.com";
guideBridge.submit();
        }
	}
}
