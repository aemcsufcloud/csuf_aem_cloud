/**
 * @function position_action_form_position_action_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getPositionActionForm",
        data: {
            action: "GET_ALL_FUNDING_DATA",
        },
        dataType: 'json',
        success: function(response) {
            if (response.length >= 1) {
                var deptArray = [];
                var fundArray = [];
                var programCodeArray = [];
                var classCodeArray = [];
                var projectArray = [];
                var accountArray = [];
                for (var a = 0; a < response[0].DEPT.length; a++) {
                    deptArray.push(response[0].DEPT[a].DEPTID);
                }
                for (var b = 0; b < response[0].FUND.length; b++) {
                    fundArray.push(response[0].FUND[b].fund_code);
                }
                for (var c = 0; c < response[0].PROGRAM.length; c++) {
                    programCodeArray.push(response[0].PROGRAM[c].program);
                }
                for (var d = 0; d < response[0].CLASS_CODE.length; d++) {
                    classCodeArray.push(response[0].CLASS_CODE[d].CLASS);
                }
                for (var e = 0; e < response[0].PROJECT.length; e++) {
                    projectArray.push(response[0].PROJECT[e].PROJECT);
                }
                for (var f = 0; f < response[0].ACCOUNT.length; f++) {
                    accountArray.push(response[0].ACCOUNT[f].ACCOUNT);
                }

                FundingDeptIDDataArray.value = JSON.stringify(deptArray);
                FundDataArray.value = JSON.stringify(fundArray);
                ProgramCodeDataArray.value = JSON.stringify(programCodeArray);
                ClassCodeDataArray.value = JSON.stringify(classCodeArray);
                ProjectDataArray.value = JSON.stringify(projectArray);
                AccountDataArray.value = JSON.stringify(accountArray);

                TTwoROne.TTwoROneFundingDeptId.items = deptArray;
                TTwoROne.TTwoROneFund.items = fundArray;
                TTwoROne.TTwoROneProgramCode.items = programCodeArray;
                TTwoROne.TTwoROneClassCode.items = classCodeArray;
                TTwoROne.TTwoROneProject.items = projectArray;
                TTwoROne.TTwoROneAccount.items = accountArray;

            } else {
                showErrorModal("Alert!", "Funding data not available");
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
 * @function position_action_form_position_action_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            var gifModal = document.getElementById('gifModal');


if (StageIndicator.value === null && AppropriateRequestorUserId.value === null) {
  gifModal.style.display = "block";
  PositionNumberValidationCheck.value = "N";
    var userValue;
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedInUserDetails",
        dataType: 'json',
        success: function(myresopnse) {
            var userValue = myresopnse.userId;
            workflow_initiator.value = userValue;
            AppropriateRequestorUserId.value = userValue;
            $.ajax({
                type: 'GET',
                url: "/bin/getPositionActionForm",
                data: {
                    action: "GET_REQUESTOR_DATA",
                    userId: userValue
                },
                dataType: 'json',
                success: function(myresponse) {
                    if (myresponse.length == 1) {
                        
                        var firstName = myresponse[0].FIRST_NAME;
                        var lastName = myresponse[0].LAST_NAME;
                        AppropriateRequestorFirstName.value = firstName;
                        AppropriateRequestorLastName.value = lastName;
                        AppropriateRequestorName.value = firstName + " " + lastName;
                        AppropriateRequestorCWID.value = myresponse[0].EMPLID;
                        //AppropriateRequestorEmailId.value = myresponse[0].EMAILID;
                        AppropriateRequestorEmailId.value = "chaitanya.sai@thoughtfocus.com";
                        Division.value = myresponse[0].DIVISION_NAME;
                        CollegeAndDepartment.value = myresponse[0].FUL_COLLEGE_NAME + "/" + myresponse[0].DEPTNAME;
                        DepartmentName.value = myresponse[0].DEPTNAME;
                        DepartmentId.value = myresponse[0].DEPTID;
                        CollegeName.value = myresponse[0].FUL_COLLEGE_NAME;
                        CollegeId.value = myresponse[0].FUL_COLLEGE;
                        DivisionName.value = myresponse[0].DIVISION_NAME;
                        var divisionId = myresponse[0].DIVSION;
                        DivisionId.value = divisionId;
                        getAppropriateApproverDetails(divisionId);
gifModal.style.display = "none";
                    } else if (myresponse.length > 1) {
                      gifModal.style.display = "none";
                        myModal1.style.display = "block";
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

                        var divContainer = document.getElementById("showData1");
                        divContainer.innerHTML = "";
                        divContainer.appendChild(table);

                        var footerModal = document.getElementById("modal_footer1");
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

                                    var firstName = myresponse[n].FIRST_NAME;
                                    var lastName = myresponse[n].LAST_NAME;
                                    AppropriateRequestorFirstName.value = firstName;
                                    AppropriateRequestorLastName.value = lastName;
                                    AppropriateRequestorName.value = firstName + " " + lastName;
                                    AppropriateRequestorCWID.value = myresponse[0].EMPLID;
                                    //AppropriateRequestorEmailId.value = myresponse[n].EMAILID;
                                    AppropriateRequestorEmailId.value = "chaitanya.sai@thoughtfocus.com";
                                    Division.value = myresponse[n].DIVISION_NAME;
                                    CollegeAndDepartment.value = myresponse[n].FUL_COLLEGE_NAME + "/" + myresponse[n].DEPTNAME;
                                    DepartmentName.value = myresponse[n].DEPTNAME;
                                    DepartmentId.value = myresponse[n].DEPTID;
                                    CollegeName.value = myresponse[n].FUL_COLLEGE_NAME;
                                    CollegeId.value = myresponse[n].FUL_COLLEGE;
                                    DivisionName.value = myresponse[n].DIVISION_NAME;
                                    var divisionId = myresponse[n].DIVSION;
                                    DivisionId.value = divisionId;
                                    getAppropriateApproverDetails(divisionId);
                                    
                                    rButtonStatus = true;
                                    myModal1.style.display = "none";
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
                        generateDOR.visible = false;
                        saveguidedraft1698166452129.visible = false;
                        submit1575264176703.visible = false;
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

function getAppropriateApproverDetails(divisionId) {
    if (divisionId == "10131") {
        AppropriateApproverName.value = "Tara Garcia";
        AppropriateApproverUserId.value = "tgarcia";
        //AppropriateApproverEmailId.value = "tgarcia@fullerton.edu";
        AppropriateApproverEmailId.value = "chaitanya.sai@thoughtfocus.com";
        AppropriateReviewerName.value = "Melissa Pacheco"; 
        AppropriateReviewerUserId.value = "mepacheco"; 
        //AppropriateReviewerEmailId.value = "mepacheco@fullerton.edu";
        AppropriateReviewerEmailId.value = "chaitanya.sai@thoughtfocus.com";
    } else if (divisionId == "10239") {
        AppropriateApproverName.value = "Juanita Arreola";
        AppropriateApproverUserId.value = "jvarreola";
        //AppropriateApproverEmailId.value = "jvarreola@fullerton.edu";
        AppropriateApproverEmailId.value = "chaitanya.sai@thoughtfocus.com";
    } else if (divisionId == "10238") {
        AppropriateApproverName.value = "Rebecca Conran-Dunham";
        AppropriateApproverUserId.value = "rconran-dunham";
        //AppropriateApproverEmailId.value = "rconran-dunham@FULLERTON.EDU";
        AppropriateApproverEmailId.value = "chaitanya.sai@thoughtfocus.com";
    } else if (divisionId == "10236") {
        AppropriateApproverName.value = "Rob Scialdone";
        AppropriateApproverUserId.value = "rscialdone";
        //AppropriateApproverEmailId.value = "rscialdone@fullerton.edu";
        AppropriateApproverEmailId.value = "chaitanya.sai@thoughtfocus.com";
        AppropriateReviewerName.value = "Erika Ochoa"; 
        AppropriateReviewerUserId.value = "erochoa"; 
        //AppropriateReviewerEmailId.value = "erochoa@fullerton.edu";
        AppropriateReviewerEmailId.value = "chaitanya.sai@thoughtfocus.com";
    } else if (divisionId == "10141") {
        AppropriateApproverName.value = "Matthew Badal";
        AppropriateApproverUserId.value = "mabadal";
        //AppropriateApproverEmailId.value = "mabadal@fullerton.edu";
        AppropriateApproverEmailId.value = "chaitanya.sai@thoughtfocus.com";
        AppropriateReviewerName.value = "Denise Chow"; 
        AppropriateReviewerUserId.value = "dchow"; 
        //AppropriateReviewerEmailId.value = "dchow@fullerton.edu";
        AppropriateReviewerEmailId.value = "chaitanya.sai@thoughtfocus.com";
    } else if (divisionId == "10189"){
        AppropriateApproverName.value = "Linh Tran";
        AppropriateApproverUserId.value = "litran";
        //AppropriateApproverEmailId.value = "litran@FULLERTON.EDU";
        AppropriateApproverEmailId.value = "chaitanya.sai@thoughtfocus.com";
    } else if (divisionId == "10480"){
        AppropriateApproverName.value = "Chalea Forgues";
        AppropriateApproverUserId.value = "ceforgues";
        //AppropriateApproverEmailId.value = "ceforgues@fullerton.edu";
        AppropriateApproverEmailId.value = "chaitanya.sai@thoughtfocus.com";
    } else {
        AppropriateApproverName.value = "Admin";
        AppropriateApproverUserId.value = "admin";
        //AppropriateApproverEmailId.value = "csuf@fullerton.edu";
        AppropriateApproverEmailId.value = "chaitanya.sai@thoughtfocus.com";
    }
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    if (FundingUpdateStatus.value == "1") {
        table_4766046821696422254592.enabled = true;
    } else {
        table_4766046821696422254592.enabled = false;
    }

    AppropriateApproverSignaturePanel.visible = false;
    AcademicAffairsSignaturePanel.visible = false;
    PositionManagementSignaturePanel.visible = false;
    AppropriateReviewerSignaturePanel.visible = false;
    CompensationServicesSignaturePanel.visible = false;
    if (RequestType.value !== null) {
        if (RequestType.value == "Create a New Position Number" || RequestType.value == "Create New Temporary Transition MPP Position Number") {
            createPositionNumberCSS();
        } else if (RequestType.value == "Update Supervisor/MPP Supervisor") {
            updateSupervisorCSS();
        } else if (RequestType.value == "Update Position Number") {
            updatePositionNumberCSS();
        } else if (RequestType.value == "Update Funding Only") {
            updateFundingOnlyCSS();
        } else if (RequestType.value == "Inactivate Position") {
            inactivatePositionCSS();
        }

        if (RequestType.value == "Create a New Position Number" || RequestType.value == "Update Supervisor/MPP Supervisor Only" || RequestType.value == "Update Position Number" || RequestType.value == "Create New Temporary Transition MPP Position Number") {
            TableSupervisorSelectionText.visible = true;
            TableSupervisorSelectionName.visible = true;
            TableSupervisorSelectionDropdown.visible = true;
            TableMPPSelectionText.visible = true;
            TableMPPSelectionName.visible = true;
            TableMPPSelectionDropdown.visible = true;
        } else {
            TableSupervisorSelectionText.visible = false;
            TableSupervisorSelectionName.visible = false;
            TableSupervisorSelectionDropdown.visible = false;
            TableMPPSelectionText.visible = false;
            TableMPPSelectionName.visible = false;
            TableMPPSelectionDropdown.visible = false;
        }
    } else {
        TableSupervisorSelectionText.visible = false;
        TableSupervisorSelectionName.visible = false;
        TableSupervisorSelectionDropdown.visible = false;
        TableMPPSelectionText.visible = false;
        TableMPPSelectionName.visible = false;
        TableMPPSelectionDropdown.visible = false;
    }

} else if (StageIndicator.value == "ToAppropriateRequestor") {
    RequestType.enabled = false;
    AppropriateRequestorName.enabled = false;
    AppropriateRequestorEmailId.enabled = false;
    Division.enabled = false;
    CollegeAndDepartment.enabled = false;
    if (AppropriateReviewerCB.value == "1") {
        AppropriateReviewerSignaturePanel.enabled = false;
    } else {
        AppropriateReviewerSignaturePanel.visible = false;
    }
    if (AppropriateApproverCB.value == "1") {
        AppropriateApproverSignaturePanel.enabled = false;
    } else {
        AppropriateApproverSignaturePanel.visible = false;
    }
    if (AcademicAffairsCB.value == "1") {
        AcademicAffairsSignaturePanel.enabled = false;
    } else {
        AcademicAffairsSignaturePanel.visible = false;
    }
    if (CompensationServicesCB.value == "1") {
        CompensationServicesSignaturePanel.enabled = false;
    } else {
        CompensationServicesSignaturePanel.visible = false;
    }
    if (PositionManagementCB.value == "1") {
        PositionManagementSignaturePanel.enabled = false;
    } else {
        PositionManagementSignaturePanel.visible = false;
    }
} else if (StageIndicator.value == "ToAppropriateReviewer") {
    BasicDetails.enabled = false;
    RequestType.enabled = false;
     AppropriateRequestorSignaturePanel.enabled = false;
   // PositionActionInformationPanel.enabled = false;
    AcademicAffairsSignaturePanel.visible = false;
    if (AppropriateApproverCB.value == "1") {
        AppropriateApproverSignaturePanel.enabled = false;
    } else {
        AppropriateApproverSignaturePanel.visible = false;
    }
    if (CompensationServicesCB.value == "1") {
        CompensationServicesSignaturePanel.enabled = false;
    } else {
        CompensationServicesSignaturePanel.visible = false;
    }

    if (PositionManagementCB.value == "1") {
        PositionManagementSignaturePanel.enabled = false;
    } else {
        PositionManagementSignaturePanel.visible = false;
    }
/* var elements = document.getElementsByClassName('guideTableRuntimeControls guideTableRuntimeRightControls');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }*/


} else if (StageIndicator.value == "ToAppropriateApprover") {
    BasicDetails.enabled = false;
    RequestType.enabled = false;
    AppropriateRequestorSignaturePanel.enabled = false;
    AcademicAffairsSignaturePanel.visible = false;
    if (AppropriateReviewerCB.value == "1") {
        AppropriateReviewerSignaturePanel.enabled = false;
    } else {
        AppropriateReviewerSignaturePanel.visible = false;
    }
    if (CompensationServicesCB.value == "1") {
        CompensationServicesSignaturePanel.enabled = false;
    } else {
        CompensationServicesSignaturePanel.visible = false;
    }
    if (PositionManagementCB.value == "1") {
        PositionManagementSignaturePanel.enabled = false;
    } else {
        PositionManagementSignaturePanel.visible = false;
    }
} else if (StageIndicator.value == "ToAcademicAffairs") {
    BasicDetails.enabled = false;
    RequestType.enabled = false;
    AppropriateRequestorSignaturePanel.enabled = false;
    AppropriateReviewerSignaturePanel.visible = false;
    AppropriateApproverSignaturePanel.visible = false;
    if (CompensationServicesCB.value == "1") {
        CompensationServicesSignaturePanel.enabled = false;
    } else {
        CompensationServicesSignaturePanel.visible = false;
    }
    if (PositionManagementCB.value == "1") {
        PositionManagementSignaturePanel.enabled = false;
    } else {
        PositionManagementSignaturePanel.visible = false;
    }

} else if (StageIndicator.value == "ToCompensationServices") {
    BasicDetails.enabled = false;
    RequestType.enabled = false;
    AppropriateRequestorSignaturePanel.enabled = false;
    //PositionActionInformationPanel.enabled = false;
    EffectiveDate.enabled = false;
Justification.enabled = false;
TOnePositionNumberCurrent.enabled = false;
TOnePositionNumberNew.enabled = false;
TOneIncumbentNameCurrent.enabled = false;
TOneIncumbentNameNew.enabled = false;
TOneDeptIdCurrent.enabled = false;
TOneDeptIdNew.enabled = false;
TOneReportingUnitCurrent.enabled = false;
TOneReportingUnitNew.enabled = false;
TOneJobCodeCurrent.enabled = false;
TOneJobCodeNew.enabled = false;
TOnePositionTitleCurrent.enabled = false;
TOnePositionTitleNew.enabled = false;
TOneRegTempCurrent.enabled = false;
TOneRegTempNew.enabled = false;
TOneFullPartTimeCurrent.enabled = false;
TOneFullPartTimeNew.enabled = false;
TOneGradeRangeCurrent.enabled = false;
TOneGradeRangeNew.enabled = false;
TOneFTECurrent.enabled = false;
TOneFTENew.enabled = false;
TOneExemptStatusCurrent.enabled = false;
TOneExemptStatusNew.enabled = false;
TOneSupervisorNameCurrent.enabled = false;
TOneSupervisorNameNew.enabled = false;
TOneSupervisorPositionCurrent.enabled = false;
TOneSupervisorPositionNew.enabled = false;
TOneMPPNameCurrent.enabled = false;
TOneMPPNameNew.enabled = false;
TOneMPPPositionCurrent.enabled = false;
TOneMPPPositionNew.enabled = false;
table1701766979333.enabled = false;
table_4766046821696422254592.enabled = false;
FundingUpdateStatus.enabled = false;
tableItem17314955492911731495550851.visible = true;
TOneMPPCodeCurrent.visible = true;
TOneMPPCodeNew.visible = true;
tableItem17314956341411731495635773.visible = true;
TOneCOICurrent.visible = true;
TOneCOINew.visible = true;

TableSupervisorSelectionText.visible = false;
TableMPPSelectionText.visible = false;
TableSupervisorSelectionName.visible = false;
TableSupervisorSelectionDropdown.visible = false;
TableMPPSelectionName.visible = false;
TableMPPSelectionDropdown.visible = false;
    if (AppropriateReviewerCB.value == "1") {
        AppropriateReviewerSignaturePanel.enabled = false;
    } else {
        AppropriateReviewerSignaturePanel.visible = false;
    }
    if (AppropriateApproverCB.value == "1") {
        AppropriateApproverSignaturePanel.enabled = false;
    } else {
        AppropriateApproverSignaturePanel.visible = false;
    }
   if (PositionManagementCB.value == "1") {
        PositionManagementSignaturePanel.enabled = false;
    } else {
        PositionManagementSignaturePanel.visible = false;
    }
   if (AcademicAffairsCB.value == "1") {
        AcademicAffairsSignaturePanel.enabled = false;
    } else {
        AcademicAffairsSignaturePanel.visible = false;
    }
  
   var elements = document.getElementsByClassName('guideTableRuntimeControls guideTableRuntimeRightControls');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
} else if (StageIndicator.value == "ToPositionManagement") {
    BasicDetails.enabled = false;
    RequestType.enabled = false;
    AppropriateRequestorSignaturePanel.enabled = false;
    if (AppropriateReviewerCB.value == "1") {
        AppropriateReviewerSignaturePanel.enabled = false;
    } else {
        AppropriateReviewerSignaturePanel.visible = false;
    }
    if (AppropriateApproverCB.value == "1") {
        AppropriateApproverSignaturePanel.enabled = false;
    } else {
        AppropriateApproverSignaturePanel.visible = false;
    }
    if (AcademicAffairsCB.value == "1") {
        AcademicAffairsSignaturePanel.enabled = false;
    } else {
        AcademicAffairsSignaturePanel.visible = false;
    }
    if (CompensationServicesCB.value == "1") {
        CompensationServicesSignaturePanel.enabled = false;
    } else {
        CompensationServicesSignaturePanel.visible = false;
    }
   // TableSupervisorSelectionText.visible = false;
   // TableSupervisorSelectionName.visible = false;
   // TableSupervisorSelectionDropdown.visible = false;
   // TableMPPSelectionText.visible = false;
   // TableMPPSelectionName.visible = false;
   // TableMPPSelectionDropdown.visible = false;
}

/*if (StageIndicator.value == "ToPositionManagement") {
    var elements = document.getElementsByClassName('guideTableRuntimeControls guideTableRuntimeRightControls');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}
*/
if (StageIndicator.value !== null) {
    if (RequestType.value == "Create a New Position Number" || RequestType.value == "Create New Temporary Transition MPP Position Number") {
        createPositionNumberCSS();
        if (StageIndicator.value == "ToPositionManagement") {
            document.getElementsByClassName('TOnePositionNumberNewCSS')[0].style.background = "none";
            PositionActionInformationPanel.enabled = true;
            RequestType.enabled = false;
            EffectiveDate.enabled = false;
            Justification.enabled = false;

            TOnePositionNumberCurrent.enabled = false;
            TOneDeptIdCurrent.enabled = false;
            TOneReportingUnitCurrent.enabled = false;
            TOneJobCodeCurrent.enabled = false;
            TOnePositionTitleCurrent.enabled = false;
            TOneRegTempCurrent.enabled = false;
            TOneFullPartTimeCurrent.enabled = false;
            TOneGradeRangeCurrent.enabled = false;
            TOneFTECurrent.enabled = false;
            TOneExemptStatusCurrent.enabled = false;
            TOneSupervisorNameCurrent.enabled = false;
            TOneSupervisorPositionCurrent.enabled = false;
            TOneMPPNameCurrent.enabled = false;
            TOneMPPPositionCurrent.enabled = false;
            TOneMPPCodeCurrent.enabled = false;
            TOneCOICurrent.enabled = false;

            TOneDeptIdNew.enabled = true;
            TOneReportingUnitNew.enabled = true;
            TOneJobCodeNew.enabled = true;
            TOnePositionTitleNew.enabled = true;
            TOneRegTempNew.enabled = true;
            TOneFullPartTimeNew.enabled = true;
            TOneGradeRangeNew.enabled = true;
            TOneFTENew.enabled = true;
            TOneExemptStatusNew.enabled = true;
            TOneSupervisorNameNew.enabled = true;
            TOneSupervisorPositionNew.enabled = true;
            TOneMPPNameNew.enabled = true;
            TOneMPPPositionNew.enabled = true;

            FundingUpdateStatus.enabled = true;
            table_4766046821696422254592.enabled = true;
            //TOnePositionNumberNew.mandatory = true;
        }
    } else if (RequestType.value == "Update Supervisor/MPP Supervisor Only") {
        updateSupervisorCSS();
    } else if (RequestType.value == "Update Position Number") {
        updatePositionNumberCSS();
    } else if (RequestType.value == "Update Funding Only") {
        updateFundingOnlyCSS();
    } else if (RequestType.value == "Inactivate Position") {
        inactivatePositionCSS();
    }

}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_guideRootPanel_init3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_guideRootPanel_init3 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.on("validationComplete", function(event, payload) {
  if(StageIndicator.value == "ToAppropriateRequestor" || StageIndicator.value == "ToAppropriateApprover" || StageIndicator.value == "ToAcademicAffairs" || StageIndicator.value == "ToPositionManagement"){
   LoadingFlag.value = "false"; 
  }
});
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_guideRootPanel_init4
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_guideRootPanel_init4 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getPositionActionForm",
        data: {
            action: "GET_CONSOLIDATED_SUPERVISOR_DATA",
        },
        dataType: 'json',
        success: function(response) {
            if (response.length >= 1) {
              SupervisorMppConsolidatedArray.value = JSON.stringify(response);
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
 * @function position_action_form_position_action_form.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null && caseId.value === null) {
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
 * @function position_action_form_position_action_form.generated_InitiatedDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_InitiatedDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
  /*  var dateString = new Date().toLocaleString("en-US", {
        timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
    }).replace(/[^ -~]/g, ' ');
    var dateObject = new Date(dateString);
    var curyear = dateObject.getFullYear();
    var curyearMonth = dateObject.getMonth() + 1;
    var curyearDay = dateObject.getDate();
    var d = (curyear + "-" + curyearMonth + "-" + curyearDay);*/
    this.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_RequestType_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_RequestType_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToAppropriateRequestor" || StageIndicator.value == "ToAppropriateApprover" || StageIndicator.value == "ToAcademicAffairs" || StageIndicator.value === null || StageIndicator.value == "ToPositionManagement" || StageIndicator.value == "ToAppropriateReviewer"){
  debugger;
  var requestType = this.value;

  if(requestType == "Create a New Position Number" || requestType == "Create New Temporary Transition MPP Position Number"){
    
    TOnePositionNumberCurrent.enabled = false;
    TOneIncumbentNameCurrent.enabled = false;
    TOneDeptIdCurrent.enabled = false;
    TOneReportingUnitCurrent.enabled = false;
    TOneJobCodeCurrent.enabled = false;
    TOnePositionTitleCurrent.enabled = false;
    TOneRegTempCurrent.enabled = false;
    TOneFullPartTimeCurrent.enabled = false;
    TOneGradeRangeCurrent.enabled = false;
    TOneFTECurrent.enabled = false;
    TOneExemptStatusCurrent.enabled = false;
    TOneSupervisorNameCurrent.enabled = false;
    TOneSupervisorPositionCurrent.enabled = false;
    TOneMPPNameCurrent.enabled = false;
    TOneMPPPositionCurrent.enabled = false;
    TOneMPPCodeCurrent.enabled = false;
    TOneCOICurrent.enabled = false;
    
    TOnePositionNumberNew.enabled = false;
    
    TOneDeptIdNew.mandatory = true;
    TOneReportingUnitNew.mandatory = true;
    TOneJobCodeNew.mandatory = true;
    TOnePositionTitleNew.mandatory = true;
    TOneRegTempNew.mandatory = true;
    TOneFullPartTimeNew.mandatory = true;
    TOneGradeRangeNew.mandatory = true;
    TOneFTENew.mandatory = true;
    TOneExemptStatusNew.mandatory = true;
    TOneSupervisorNameNew.mandatory = true;
    TOneSupervisorPositionNew.mandatory = true;
    TOneMPPNameNew.mandatory = true;
    TOneMPPPositionNew.mandatory = true;
    FundingUpdateStatus.value = "1";
    FundingUpdateStatus.enabled = false;
    
    TableSupervisorSelectionText.visible = true;
  TableSupervisorSelectionName.visible = true;
  TableSupervisorSelectionDropdown.visible = true;
  TableMPPSelectionText.visible = true;
  TableMPPSelectionName.visible = true;
  TableMPPSelectionDropdown.visible = true;
    TOneSupervisorNameNew.enabled = false;
    TOneSupervisorPositionNew.enabled = false;
    TOneMPPNameNew.enabled = false;
    TOneMPPPositionNew.enabled = false;
    
     TOneDeptIdCurrent.enabled = false;
TOneReportingUnitCurrent.enabled = false;
TOneRegTempCurrent.enabled = false;
    if(StageIndicator.value == "ToPositionManagement"){
      TOnePositionNumberNew.enabled = true;
    }
  }else if(requestType == "Update Supervisor/MPP Supervisor Only"){
    
    TOnePositionNumberCurrent.mandatory = true;
    TOneDeptIdCurrent.mandatory = true;
    TOneReportingUnitCurrent.mandatory = true;
    TOneJobCodeCurrent.mandatory = true;
    TOnePositionTitleCurrent.mandatory = true;
    TOneRegTempCurrent.mandatory = true;
    TOneFullPartTimeCurrent.mandatory = true;
    TOneGradeRangeCurrent.mandatory = true;
    TOneFTECurrent.mandatory = true;
    TOneExemptStatusCurrent.mandatory = true;
    //TOneSupervisorNameCurrent.mandatory = true;
    //TOneSupervisorPositionCurrent.mandatory = true;
    //TOneMPPNameCurrent.mandatory = true;
    //TOneMPPPositionCurrent.mandatory = true; 
    
    TOnePositionNumberNew.enabled = false;
    TOneIncumbentNameNew.enabled = false;
	TOneDeptIdNew.enabled = false;
    TOneReportingUnitNew.enabled = false;
    TOneJobCodeNew.enabled = false;
    TOnePositionTitleNew.enabled = false;
    TOneRegTempNew.enabled = false;
    TOneFullPartTimeNew.enabled = false;
    TOneGradeRangeNew.enabled = false;
    TOneFTENew.enabled = false;
    TOneExemptStatusNew.enabled = false;
    TOneMPPCodeNew.enabled = false;
    TOneCOINew.enabled = false;
    
    TOneSupervisorNameNew.mandatory = true;
    TOneSupervisorPositionNew.mandatory = true;
    TOneMPPNameNew.mandatory = true;
    TOneMPPPositionNew.mandatory = true;
    
    FundingUpdateStatus.value = "2";
    FundingUpdateStatus.enabled = false;
    
    TableSupervisorSelectionText.visible = true;
  TableSupervisorSelectionName.visible = true;
  TableSupervisorSelectionDropdown.visible = true;
  TableMPPSelectionText.visible = true;
  TableMPPSelectionName.visible = true;
  TableMPPSelectionDropdown.visible = true;
    TOneSupervisorNameNew.enabled = false;
    TOneSupervisorPositionNew.enabled = false;
    TOneMPPNameNew.enabled = false;
    TOneMPPPositionNew.enabled = false;
    
     TOneDeptIdCurrent.enabled = false;
TOneReportingUnitCurrent.enabled = false;
TOneRegTempCurrent.enabled = false;
    TOneJobCodeCurrent.enabled = false;
TOnePositionTitleCurrent.enabled = false;
TOneFullPartTimeCurrent.enabled = false;
TOneGradeRangeCurrent.enabled = false;
TOneFTECurrent.enabled = false;
TOneExemptStatusCurrent.enabled = false;
TOneSupervisorNameCurrent.enabled = false;
TOneSupervisorPositionCurrent.enabled = false;
TOneMPPNameCurrent.enabled = false;
TOneMPPPositionCurrent.enabled = false;
  }else if(requestType == "Update Position Number"){
    
    TOnePositionNumberCurrent.mandatory = true;
    TOneDeptIdCurrent.mandatory = true;
    TOneReportingUnitCurrent.mandatory = true;
    TOneJobCodeCurrent.mandatory = true;
    TOnePositionTitleCurrent.mandatory = true;
    TOneRegTempCurrent.mandatory = true;
    TOneFullPartTimeCurrent.mandatory = true;
    TOneGradeRangeCurrent.mandatory = true;
    TOneFTECurrent.mandatory = true;
    TOneExemptStatusCurrent.mandatory = true;
    //TOneSupervisorNameCurrent.mandatory = true;
    //TOneSupervisorPositionCurrent.mandatory = true;
    //TOneMPPNameCurrent.mandatory = true;
    //TOneMPPPositionCurrent.mandatory = true;
    TOnePositionNumberNew.mandatory = true;
    TOneDeptIdNew.mandatory = true;
    TOneReportingUnitNew.mandatory = true;
    
    TOnePositionNumberNew.enabled = true;
    TOneDeptIdCurrent.enabled = true;
    TOneDeptIdNew.enabled = true;
    TOneReportingUnitCurrent.enabled = true;
    TOneReportingUnitNew.enabled = true;
    
    TableSupervisorSelectionText.visible = true;
  TableSupervisorSelectionName.visible = true;
  TableSupervisorSelectionDropdown.visible = true;
  TableMPPSelectionText.visible = true;
  TableMPPSelectionName.visible = true;
  TableMPPSelectionDropdown.visible = true;
    TOneSupervisorNameNew.enabled = false;
    TOneSupervisorPositionNew.enabled = false;
    TOneMPPNameNew.enabled = false;
    TOneMPPPositionNew.enabled = false;
    
     TOneDeptIdCurrent.enabled = false;
TOneReportingUnitCurrent.enabled = false;
TOneRegTempCurrent.enabled = false;
    
    TOnePositionNumberNew.enabled = false;
TOneDeptIdNew.enabled = false;
TOneReportingUnitNew.enabled = false;
    TOneRegTempNew.enabled = false;
    TOneJobCodeCurrent.enabled = false;
TOnePositionTitleCurrent.enabled = false;
TOneFullPartTimeCurrent.enabled = false;
TOneGradeRangeCurrent.enabled = false;
TOneFTECurrent.enabled = false;
TOneExemptStatusCurrent.enabled = false;
TOneSupervisorNameCurrent.enabled = false;
TOneSupervisorPositionCurrent.enabled = false;
TOneMPPNameCurrent.enabled = false;
TOneMPPPositionCurrent.enabled = false;
    
    TOneMPPCodeCurrent.enabled = true;
TOneMPPCodeNew.enabled = true;
TOneCOICurrent.enabled = true;
TOneCOINew.enabled = true;
    
  }else if(requestType == "Update Funding Only"){
    
    TOnePositionNumberCurrent.mandatory = true;
    TOneDeptIdCurrent.mandatory = true;
    TOneReportingUnitCurrent.mandatory = true;
    TOneJobCodeCurrent.mandatory = true;
    TOnePositionTitleCurrent.mandatory = true;
    TOneRegTempCurrent.mandatory = true;
    TOneFullPartTimeCurrent.mandatory = true;
    TOneGradeRangeCurrent.mandatory = true;
    TOneFTECurrent.mandatory = true;
    TOneExemptStatusCurrent.mandatory = true;
    //TOneSupervisorNameCurrent.mandatory = true;
    //TOneSupervisorPositionCurrent.mandatory = true;
    //TOneMPPNameCurrent.mandatory = true;
    //TOneMPPPositionCurrent.mandatory = true;
    
    TOnePositionNumberNew.enabled = false;
    TOneIncumbentNameNew.enabled = false;
	TOneDeptIdNew.enabled = false;
    TOneReportingUnitNew.enabled = false;
    TOneJobCodeNew.enabled = false;
    TOnePositionTitleNew.enabled = false;
    TOneRegTempNew.enabled = false;
    TOneFullPartTimeNew.enabled = false;
    TOneGradeRangeNew.enabled = false;
    TOneFTENew.enabled = false;
    TOneExemptStatusNew.enabled = false;
    TOneSupervisorNameNew.enabled = false;
    TOneSupervisorPositionNew.enabled = false;
    TOneMPPNameNew.enabled = false;
    TOneMPPPositionNew.enabled = false;
    FundingUpdateStatus.value = "1";
    FundingUpdateStatus.enabled = false;
    
    TableSupervisorSelectionText.visible = false;
  TableSupervisorSelectionName.visible = false;
  TableSupervisorSelectionDropdown.visible = false;
  TableMPPSelectionText.visible = false;
  TableMPPSelectionName.visible = false;
  TableMPPSelectionDropdown.visible = false;
    
     TOneDeptIdCurrent.enabled = false;
TOneReportingUnitCurrent.enabled = false;
TOneRegTempCurrent.enabled = false;
    TOneJobCodeCurrent.enabled = false;
TOnePositionTitleCurrent.enabled = false;
TOneFullPartTimeCurrent.enabled = false;
TOneGradeRangeCurrent.enabled = false;
TOneFTECurrent.enabled = false;
TOneExemptStatusCurrent.enabled = false;
TOneSupervisorNameCurrent.enabled = false;
TOneSupervisorPositionCurrent.enabled = false;
TOneMPPNameCurrent.enabled = false;
TOneMPPPositionCurrent.enabled = false;
    
    TOneMPPCodeNew.enabled = false;
    TOneCOINew.enabled = false;
  }else if(requestType == "Inactivate Position"){
    
    TOnePositionNumberCurrent.mandatory = true;
    TOneDeptIdCurrent.mandatory = true;
    TOneReportingUnitCurrent.mandatory = true;
    TOneJobCodeCurrent.mandatory = true;
    TOnePositionTitleCurrent.mandatory = true;
    TOneRegTempCurrent.mandatory = true;
    TOneFullPartTimeCurrent.mandatory = true;
    TOneGradeRangeCurrent.mandatory = true;
    TOneFTECurrent.mandatory = true;
    TOneExemptStatusCurrent.mandatory = true;
    //TOneSupervisorNameCurrent.mandatory = true;
    //TOneSupervisorPositionCurrent.mandatory = true;
    //TOneMPPNameCurrent.mandatory = true;
    //TOneMPPPositionCurrent.mandatory = true;
    
    TOnePositionNumberNew.enabled = false;
    TOneIncumbentNameNew.enabled = false;
	TOneDeptIdNew.enabled = false;
    TOneReportingUnitNew.enabled = false;
    TOneJobCodeNew.enabled = false;
    TOnePositionTitleNew.enabled = false;
    TOneRegTempNew.enabled = false;
    TOneFullPartTimeNew.enabled = false;
    TOneGradeRangeNew.enabled = false;
    TOneFTENew.enabled = false;
    TOneExemptStatusNew.enabled = false;
    TOneSupervisorNameNew.enabled = false;
    TOneSupervisorPositionNew.enabled = false;
    TOneMPPNameNew.enabled = false;
    TOneMPPPositionNew.enabled = false;
    
    TableSupervisorSelectionText.visible = false;
  TableSupervisorSelectionName.visible = false;
  TableSupervisorSelectionDropdown.visible = false;
  TableMPPSelectionText.visible = false;
  TableMPPSelectionName.visible = false;
  TableMPPSelectionDropdown.visible = false;
    
     TOneDeptIdCurrent.enabled = false;
TOneReportingUnitCurrent.enabled = false;
TOneRegTempCurrent.enabled = false;
    TOneJobCodeCurrent.enabled = false;
TOnePositionTitleCurrent.enabled = false;
TOneFullPartTimeCurrent.enabled = false;
TOneGradeRangeCurrent.enabled = false;
TOneFTECurrent.enabled = false;
TOneExemptStatusCurrent.enabled = false;
TOneSupervisorNameCurrent.enabled = false;
TOneSupervisorPositionCurrent.enabled = false;
TOneMPPNameCurrent.enabled = false;
TOneMPPPositionCurrent.enabled = false;
    
    TOneMPPCodeNew.enabled = false;
    TOneCOINew.enabled = false;
  }
}

TOneIncumbentNameCurrent.enabled = false;
TOneDeptIdCurrent.enabled = false;
TOneReportingUnitCurrent.enabled = false;
TOneJobCodeCurrent.enabled = false;
TOnePositionTitleCurrent.enabled = false;
TOneRegTempCurrent.enabled = false;
TOneFullPartTimeCurrent.enabled = false;
TOneGradeRangeCurrent.enabled = false;
TOneFTECurrent.enabled = false;
TOneExemptStatusCurrent.enabled = false;
TOneSupervisorNameCurrent.enabled = false;
TOneSupervisorPositionCurrent.enabled = false;
TOneMPPNameCurrent.enabled = false;
TOneMPPPositionCurrent.enabled = false;
TOneMPPCodeCurrent.enabled = false; 
TOneCOICurrent.enabled = false; 
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_RequestType_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_RequestType_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null && SaveFlag.value == "false"){
  var requestType = this.value;
  resetOperation();
  resetCSS();
  if(requestType == "Create a New Position Number" || requestType == "Create New Temporary Transition MPP Position Number"){
    createPositionNumberCSS();
    
    TOnePositionNumberCurrent.enabled = false;
    TOneIncumbentNameCurrent.enabled = false;
    TOneDeptIdCurrent.enabled = false;
    TOneReportingUnitCurrent.enabled = false;
    TOneJobCodeCurrent.enabled = false;
    TOnePositionTitleCurrent.enabled = false;
    TOneRegTempCurrent.enabled = false;
    TOneFullPartTimeCurrent.enabled = false;
    TOneGradeRangeCurrent.enabled = false;
    TOneFTECurrent.enabled = false;
    TOneExemptStatusCurrent.enabled = false;
    TOneSupervisorNameCurrent.enabled = false;
    TOneSupervisorPositionCurrent.enabled = false;
    TOneMPPNameCurrent.enabled = false;
    TOneMPPPositionCurrent.enabled = false;
    TOneMPPCodeCurrent.enabled = false;
    TOneCOICurrent.enabled = false;
    
    TOnePositionNumberNew.enabled = false;
    
    TOneDeptIdNew.mandatory = true;
    TOneReportingUnitNew.mandatory = true;
    TOneJobCodeNew.mandatory = true;
    TOnePositionTitleNew.mandatory = true;
    TOneRegTempNew.mandatory = true;
    TOneFullPartTimeNew.mandatory = true;
    TOneGradeRangeNew.mandatory = true;
    TOneFTENew.mandatory = true;
    TOneExemptStatusNew.mandatory = true;
    TOneSupervisorNameNew.mandatory = true;
    TOneSupervisorPositionNew.mandatory = true;
    TOneMPPNameNew.mandatory = true;
    TOneMPPPositionNew.mandatory = true;
    FundingUpdateStatus.value = "1";
    FundingUpdateStatus.enabled = false;
    
    TableSupervisorSelectionText.visible = true;
  TableSupervisorSelectionName.visible = true;
  TableSupervisorSelectionDropdown.visible = true;
  TableMPPSelectionText.visible = true;
  TableMPPSelectionName.visible = true;
  TableMPPSelectionDropdown.visible = true;
    TOneSupervisorNameNew.enabled = false;
    TOneSupervisorPositionNew.enabled = false;
    TOneMPPNameNew.enabled = false;
    TOneMPPPositionNew.enabled = false;
    
    TOneDeptIdCurrent.enabled = false;
TOneReportingUnitCurrent.enabled = false;
TOneRegTempCurrent.enabled = false;
    
  }else if(requestType == "Update Supervisor/MPP Supervisor Only"){
    updateSupervisorCSS();
    
    TOnePositionNumberCurrent.mandatory = true;
    TOneDeptIdCurrent.mandatory = true;
    TOneReportingUnitCurrent.mandatory = true;
    TOneJobCodeCurrent.mandatory = true;
    TOnePositionTitleCurrent.mandatory = true;
    TOneRegTempCurrent.mandatory = true;
    TOneFullPartTimeCurrent.mandatory = true;
    TOneGradeRangeCurrent.mandatory = true;
    TOneFTECurrent.mandatory = true;
    TOneExemptStatusCurrent.mandatory = true;
   // TOneSupervisorNameCurrent.mandatory = true;
   // TOneSupervisorPositionCurrent.mandatory = true;
   // TOneMPPNameCurrent.mandatory = true;
   // TOneMPPPositionCurrent.mandatory = true; 
    
    TOnePositionNumberNew.enabled = false;
    TOneIncumbentNameNew.enabled = false;
	TOneDeptIdNew.enabled = false;
    TOneReportingUnitNew.enabled = false;
    TOneJobCodeNew.enabled = false;
    TOnePositionTitleNew.enabled = false;
    TOneRegTempNew.enabled = false;
    TOneFullPartTimeNew.enabled = false;
    TOneGradeRangeNew.enabled = false;
    TOneFTENew.enabled = false;
    TOneExemptStatusNew.enabled = false;
    TOneMPPCodeNew.enabled = false;
    TOneCOINew.enabled = false;
    
    TOneSupervisorNameNew.mandatory = true;
    TOneSupervisorPositionNew.mandatory = true;
    TOneMPPNameNew.mandatory = true;
    TOneMPPPositionNew.mandatory = true;
    
    FundingUpdateStatus.value = "2";
    FundingUpdateStatus.enabled = false;
    
    TableSupervisorSelectionText.visible = true;
  TableSupervisorSelectionName.visible = true;
  TableSupervisorSelectionDropdown.visible = true;
  TableMPPSelectionText.visible = true;
  TableMPPSelectionName.visible = true;
  TableMPPSelectionDropdown.visible = true;
    TOneSupervisorNameNew.enabled = false;
    TOneSupervisorPositionNew.enabled = false;
    TOneMPPNameNew.enabled = false;
    TOneMPPPositionNew.enabled = false;
    TOneDeptIdCurrent.enabled = false;
TOneReportingUnitCurrent.enabled = false;
TOneRegTempCurrent.enabled = false;
    TOneJobCodeCurrent.enabled = false;
TOnePositionTitleCurrent.enabled = false;
TOneFullPartTimeCurrent.enabled = false;
TOneGradeRangeCurrent.enabled = false;
TOneFTECurrent.enabled = false;
TOneExemptStatusCurrent.enabled = false;
TOneSupervisorNameCurrent.enabled = false;
TOneSupervisorPositionCurrent.enabled = false;
TOneMPPNameCurrent.enabled = false;
TOneMPPPositionCurrent.enabled = false;
    
  }else if(requestType == "Update Position Number"){
    updatePositionNumberCSS();
    
    TOnePositionNumberCurrent.mandatory = true;
    TOneDeptIdCurrent.mandatory = true;
    TOneReportingUnitCurrent.mandatory = true;
    TOneJobCodeCurrent.mandatory = true;
    TOnePositionTitleCurrent.mandatory = true;
    TOneRegTempCurrent.mandatory = true;
    TOneFullPartTimeCurrent.mandatory = true;
    TOneGradeRangeCurrent.mandatory = true;
    TOneFTECurrent.mandatory = true;
    TOneExemptStatusCurrent.mandatory = true;
   // TOneSupervisorNameCurrent.mandatory = true;
   // TOneSupervisorPositionCurrent.mandatory = true;
   // TOneMPPNameCurrent.mandatory = true;
   // TOneMPPPositionCurrent.mandatory = true;
    TOnePositionNumberNew.mandatory = true;
    TOneDeptIdNew.mandatory = true;
    TOneReportingUnitNew.mandatory = true;
    
    TOnePositionNumberNew.enabled = true;
    TOneDeptIdCurrent.enabled = true;
    TOneDeptIdNew.enabled = true;
    TOneReportingUnitCurrent.enabled = true;
    TOneReportingUnitNew.enabled = true;
    
    TableSupervisorSelectionText.visible = true;
  TableSupervisorSelectionName.visible = true;
  TableSupervisorSelectionDropdown.visible = true;
  TableMPPSelectionText.visible = true;
  TableMPPSelectionName.visible = true;
  TableMPPSelectionDropdown.visible = true;
    TOneSupervisorNameNew.enabled = false;
    TOneSupervisorPositionNew.enabled = false;
    TOneMPPNameNew.enabled = false;
    TOneMPPPositionNew.enabled = false;
    
    TOneDeptIdCurrent.enabled = false;
TOneReportingUnitCurrent.enabled = false;
TOneRegTempCurrent.enabled = false;
    
    TOnePositionNumberNew.enabled = false;
TOneDeptIdNew.enabled = false;
TOneReportingUnitNew.enabled = false;
    TOneRegTempNew.enabled = false;
    TOneJobCodeCurrent.enabled = false;
TOnePositionTitleCurrent.enabled = false;
TOneFullPartTimeCurrent.enabled = false;
TOneGradeRangeCurrent.enabled = false;
TOneFTECurrent.enabled = false;
TOneExemptStatusCurrent.enabled = false;
TOneSupervisorNameCurrent.enabled = false;
TOneSupervisorPositionCurrent.enabled = false;
TOneMPPNameCurrent.enabled = false;
TOneMPPPositionCurrent.enabled = false;
    
    TOneMPPCodeCurrent.enabled = true;
TOneMPPCodeNew.enabled = true;
TOneCOICurrent.enabled = true;
TOneCOINew.enabled = true;
    
  }else if(requestType == "Update Funding Only"){
    updateFundingOnlyCSS();
    
    TOnePositionNumberCurrent.mandatory = true;
    TOneDeptIdCurrent.mandatory = true;
    TOneReportingUnitCurrent.mandatory = true;
    TOneJobCodeCurrent.mandatory = true;
    TOnePositionTitleCurrent.mandatory = true;
    TOneRegTempCurrent.mandatory = true;
    TOneFullPartTimeCurrent.mandatory = true;
    TOneGradeRangeCurrent.mandatory = true;
    TOneFTECurrent.mandatory = true;
    TOneExemptStatusCurrent.mandatory = true;
    //TOneSupervisorNameCurrent.mandatory = true;
    //TOneSupervisorPositionCurrent.mandatory = true;
    //TOneMPPNameCurrent.mandatory = true;
   // TOneMPPPositionCurrent.mandatory = true;
    
    TOnePositionNumberNew.enabled = false;
    TOneIncumbentNameNew.enabled = false;
	TOneDeptIdNew.enabled = false;
    TOneReportingUnitNew.enabled = false;
    TOneJobCodeNew.enabled = false;
    TOnePositionTitleNew.enabled = false;
    TOneRegTempNew.enabled = false;
    TOneFullPartTimeNew.enabled = false;
    TOneGradeRangeNew.enabled = false;
    TOneFTENew.enabled = false;
    TOneExemptStatusNew.enabled = false;
    TOneSupervisorNameNew.enabled = false;
    TOneSupervisorPositionNew.enabled = false;
    TOneMPPNameNew.enabled = false;
    TOneMPPPositionNew.enabled = false;
    FundingUpdateStatus.value = "1";
    FundingUpdateStatus.enabled = false;
    
    TOneDeptIdCurrent.enabled = false;
TOneReportingUnitCurrent.enabled = false;
TOneRegTempCurrent.enabled = false;
    TOneJobCodeCurrent.enabled = false;
TOnePositionTitleCurrent.enabled = false;
TOneFullPartTimeCurrent.enabled = false;
TOneGradeRangeCurrent.enabled = false;
TOneFTECurrent.enabled = false;
TOneExemptStatusCurrent.enabled = false;
TOneSupervisorNameCurrent.enabled = false;
TOneSupervisorPositionCurrent.enabled = false;
TOneMPPNameCurrent.enabled = false;
TOneMPPPositionCurrent.enabled = false;
    
    TOneMPPCodeNew.enabled = false;
    TOneCOINew.enabled = false;
  }else if(requestType == "Inactivate Position"){
    inactivatePositionCSS();
    
    TOnePositionNumberCurrent.mandatory = true;
    TOneDeptIdCurrent.mandatory = true;
    TOneReportingUnitCurrent.mandatory = true;
    TOneJobCodeCurrent.mandatory = true;
    TOnePositionTitleCurrent.mandatory = true;
    TOneRegTempCurrent.mandatory = true;
    TOneFullPartTimeCurrent.mandatory = true;
    TOneGradeRangeCurrent.mandatory = true;
    TOneFTECurrent.mandatory = true;
    TOneExemptStatusCurrent.mandatory = true;
   // TOneSupervisorNameCurrent.mandatory = true;
   // TOneSupervisorPositionCurrent.mandatory = true;
   // TOneMPPNameCurrent.mandatory = true;
   // TOneMPPPositionCurrent.mandatory = true;
    
    TOnePositionNumberNew.enabled = false;
    TOneIncumbentNameNew.enabled = false;
	TOneDeptIdNew.enabled = false;
    TOneReportingUnitNew.enabled = false;
    TOneJobCodeNew.enabled = false;
    TOnePositionTitleNew.enabled = false;
    TOneRegTempNew.enabled = false;
    TOneFullPartTimeNew.enabled = false;
    TOneGradeRangeNew.enabled = false;
    TOneFTENew.enabled = false;
    TOneExemptStatusNew.enabled = false;
    TOneSupervisorNameNew.enabled = false;
    TOneSupervisorPositionNew.enabled = false;
    TOneMPPNameNew.enabled = false;
    TOneMPPPositionNew.enabled = false;
    
    TOneDeptIdCurrent.enabled = false;
TOneReportingUnitCurrent.enabled = false;
TOneRegTempCurrent.enabled = false;
    TOneJobCodeCurrent.enabled = false;
TOnePositionTitleCurrent.enabled = false;
TOneFullPartTimeCurrent.enabled = false;
TOneGradeRangeCurrent.enabled = false;
TOneFTECurrent.enabled = false;
TOneExemptStatusCurrent.enabled = false;
TOneSupervisorNameCurrent.enabled = false;
TOneSupervisorPositionCurrent.enabled = false;
TOneMPPNameCurrent.enabled = false;
TOneMPPPositionCurrent.enabled = false;
    
    TOneMPPCodeNew.enabled = false;
    TOneCOINew.enabled = false;
  }
}

function resetOperation() {
    TOnePositionNumberCurrent.enabled = true;
    TOneIncumbentNameCurrent.enabled = true;
    TOneDeptIdCurrent.enabled = true;
    TOneReportingUnitCurrent.enabled = true;
    TOneJobCodeCurrent.enabled = true;
    TOnePositionTitleCurrent.enabled = true;
    TOneRegTempCurrent.enabled = true;
    TOneFullPartTimeCurrent.enabled = true;
    TOneGradeRangeCurrent.enabled = true;
    TOneFTECurrent.enabled = true;
    TOneExemptStatusCurrent.enabled = true;
    TOneSupervisorNameCurrent.enabled = true;
    TOneSupervisorPositionCurrent.enabled = true;
    TOneMPPNameCurrent.enabled = true;
    TOneMPPPositionCurrent.enabled = true;
    TOneMPPCodeCurrent.enabled = true; 
    TOneCOICurrent.enabled = true; 
  
    TOnePositionNumberNew.enabled = true;
    TOneIncumbentNameNew.enabled = true;
	TOneDeptIdNew.enabled = true;
    TOneReportingUnitNew.enabled = true;
    TOneJobCodeNew.enabled = true;
    TOnePositionTitleNew.enabled = true;
    TOneRegTempNew.enabled = true;
    TOneFullPartTimeNew.enabled = true;
    TOneGradeRangeNew.enabled = true;
    TOneFTENew.enabled = true;
    TOneExemptStatusNew.enabled = true;
    TOneSupervisorNameNew.enabled = true;
    TOneSupervisorPositionNew.enabled = true;
    TOneMPPNameNew.enabled = true;
    TOneMPPPositionNew.enabled = true;
    TOneMPPCodeNew.enabled = true;
    TOneCOINew.enabled = true;
  
    TOnePositionNumberCurrent.mandatory = false;
    TOneIncumbentNameCurrent.mandatory = false;
    TOneDeptIdCurrent.mandatory = false;
    TOneReportingUnitCurrent.mandatory = false;
    TOneJobCodeCurrent.mandatory = false;
    TOnePositionTitleCurrent.mandatory = false;
    TOneRegTempCurrent.mandatory = false;
    TOneFullPartTimeCurrent.mandatory = false;
    TOneGradeRangeCurrent.mandatory = false;
    TOneFTECurrent.mandatory = false;
    TOneExemptStatusCurrent.mandatory = false;
    TOneSupervisorNameCurrent.mandatory = false;
    TOneSupervisorPositionCurrent.mandatory = false;
    TOneMPPNameCurrent.mandatory = false;
    TOneMPPPositionCurrent.mandatory = false;
	
	TOnePositionNumberNew.mandatory = false;
    TOneIncumbentNameNew.mandatory = false;
	TOneDeptIdNew.mandatory = false;
    TOneReportingUnitNew.mandatory = false;
    TOneJobCodeNew.mandatory = false;
    TOnePositionTitleNew.mandatory = false;
    TOneRegTempNew.mandatory = false;
    TOneFullPartTimeNew.mandatory = false;
    TOneGradeRangeNew.mandatory = false;
    TOneFTENew.mandatory = false;
    TOneExemptStatusNew.mandatory = false;
    TOneSupervisorNameNew.mandatory = false;
    TOneSupervisorPositionNew.mandatory = false;
    TOneMPPNameNew.mandatory = false;
    TOneMPPPositionNew.mandatory = false;
  
   EffectiveDate.value = "";
   Justification.value = "";
   TOnePositionNumberCurrent.value = "";
   TOnePositionNumberNew.value = "";
   TOneIncumbentNameCurrent.value = ""; 
   TOneIncumbentNameNew.value = "";
   TOneDeptIdCurrent.value = "";
   TOneDeptIdNew.value = "";
   TOneReportingUnitCurrent.value = "";
   TOneReportingUnitNew.value = "";
   TOneJobCodeCurrent.value = "";
   TOneJobCodeNew.value = "";
   TOnePositionTitleCurrent.value = "";
   TOnePositionTitleNew.value = "";
   TOneRegTempCurrent.value = "";
   TOneRegTempNew.value = "";
   TOneFullPartTimeCurrent.value = "";
   TOneFullPartTimeNew.value = "";
   TOneGradeRangeCurrent.value = "";
   TOneGradeRangeNew.value = "";
   TOneFTECurrent.value = "";
   TOneFTENew.value = "";
   TOneExemptStatusCurrent.value = "";
   TOneExemptStatusNew.value = "";
   TOneSupervisorNameCurrent.value = "";
   TOneSupervisorNameNew.value = "";
   TOneSupervisorPositionCurrent.value = "";
   TOneSupervisorPositionNew.value = "";
   TOneMPPNameCurrent.value = "";
   TOneMPPNameNew.value = "";
   TOneMPPPositionCurrent.value = "";
   TOneMPPPositionNew.value = "";
   TOneMPPCodeCurrent.value = "";
   TOneMPPCodeNew.value = "";
   TOneCOICurrent.value = "";
   TOneCOINew.value = "";
   FundingUpdateStatus.value = "";
   FundingUpdateStatus.enabled = true;
   var rowcount = TTwoROne.instanceManager.instanceCount;
   if (rowcount !== null) {
      for (var k = 0; k < rowcount; k++) {
         TTwoROne.instanceManager.removeInstance(TTwoROne.instanceIndex);
      }
   }
   TTwoROne.TTwoROneFundingDeptId.value = "";
   TTwoROne.TTwoROneFund.value = "";
   TTwoROne.TTwoROneProgramCode.value = "";
   TTwoROne.TTwoROneClassCode.value = "";
   TTwoROne.TTwoROneProject.value = "";
   TTwoROne.TTwoROneAccount.value = "";
   TTwoROne.TTwoROneDist.value = "";
  
   var rowcountOne = TThreeROne.instanceManager.instanceCount;
   if (rowcountOne !== null) {
      for (var m = 0; m < rowcountOne; m++) {
         TThreeROne.instanceManager.removeInstance(TThreeROne.instanceIndex);
      }
   }
   TThreeROne.TThreeROneCurrentFundingDeptId.value = "";
   TThreeROne.TThreeROneCurrentFund.value = "";
   TThreeROne.TThreeROneCurrentProgramCode.value = "";
   TThreeROne.TThreeROneCurrentClassCode.value = "";
   TThreeROne.TThreeROneCurrentProject.value = "";
   TThreeROne.TThreeROneCurrentAccount.value = "";
   TThreeROne.TThreeROneCurrentDist.value = "";
  
  TableSupervisorSelectionText.visible = false;
  TableSupervisorSelectionName.visible = false;
  TableSupervisorSelectionDropdown.visible = false;
  TableMPPSelectionText.visible = false;
  TableMPPSelectionName.visible = false;
  TableMPPSelectionDropdown.visible = false;
  TableSupervisorSelectionName.value = "";
  TableSupervisorSelectionDropdown.value = ""; 
  TableSupervisorSelectionDropdown.items = ""; 
  TableMPPSelectionName.value = "";
  TableMPPSelectionDropdown.value = "";
  TableMPPSelectionDropdown.items = "";
}

TOneIncumbentNameCurrent.enabled = false;
TOneDeptIdCurrent.enabled = false;
TOneReportingUnitCurrent.enabled = false;
TOneJobCodeCurrent.enabled = false;
TOnePositionTitleCurrent.enabled = false;
TOneRegTempCurrent.enabled = false;
TOneFullPartTimeCurrent.enabled = false;
TOneGradeRangeCurrent.enabled = false;
TOneFTECurrent.enabled = false;
TOneExemptStatusCurrent.enabled = false;
TOneSupervisorNameCurrent.enabled = false;
TOneSupervisorPositionCurrent.enabled = false;
TOneMPPNameCurrent.enabled = false;
TOneMPPPositionCurrent.enabled = false;
TOneMPPCodeCurrent.enabled = false; 
TOneCOICurrent.enabled = false;
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TOnePositionNumberCurrent_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TOnePositionNumberCurrent_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(
  (StageIndicator.value === null && AppropriateApproverSignaturePanel.visible == false && AcademicAffairsSignaturePanel.visible == false && SaveFlag.value == "false")|| 
  (StageIndicator.value == "ToAppropriateRequestor" && LoadingFlag.value == "true") || 
  (StageIndicator.value == "ToAppropriateApprover" && LoadingFlag.value == "true") || 
  (StageIndicator.value == "ToAcademicAffairs" && LoadingFlag.value == "true") || 
  (StageIndicator.value == "ToPositionManagement" && LoadingFlag.value == "true")
  ){
$.ajax({
		type: 'GET',
		url: "/bin/getPositionActionForm",
		data: {
			action: "GET_REQUESTOR_DATA_POSITION_NUMBER_LOOKUP",
            positionNumber: TOnePositionNumberCurrent.value
		},
		dataType: 'json',
		success: function(response) {
          if(response.length >= 1){
       /*     if(RequestType.value == "Update Funding Only"){
            TOneIncumbentNameCurrent.value = response[0].FIRST_NAME+" "+response[0].LAST_NAME;
            TOneDeptIdCurrent.value = response[0].DEPTID;
            TOneReportingUnitCurrent.value = response[0].CSU_UNIT;
            TOneJobCodeCurrent.value = response[0].JOBCODE;
            PositionNumberValidationCheck.value = "Y";
              getCurrentFundingInformation();
            }else{*/
            if(RequestType.value == "Update Position Number"){
              TOneIncumbentNameNew.value = response[0].FIRST_NAME+" "+response[0].LAST_NAME;
              TOnePositionNumberNew.value = TOnePositionNumberCurrent.value;
              TOneDeptIdNew.value = response[0].DEPTID; 
              TOneReportingUnitNew.value = response[0].CSU_UNIT;
              if(response[0].REG_TEMP == "R"){
              TOneRegTempNew.value = "Regular";
            }else{
              TOneRegTempNew.value = "Temporary";
            }
            }
            TOneIncumbentNameCurrent.value = response[0].FIRST_NAME+" "+response[0].LAST_NAME;
            TOneDeptIdCurrent.value = response[0].DEPTID;
            TOneReportingUnitCurrent.value = response[0].CSU_UNIT;
            TOneJobCodeCurrent.value = response[0].JOBCODE;
            TOnePositionTitleCurrent.value = response[0].DESCR;
            if(response[0].REG_TEMP == "R"){
              TOneRegTempCurrent.value = "Regular";
            }else{
              TOneRegTempCurrent.value = "Temporary";
            }
            if(response[0].FULL_PART_TIME == "F"){
              TOneFullPartTimeCurrent.value = "Full-time";
            }else{
              TOneFullPartTimeCurrent.value = "Part-time";
            }
            TOneGradeRangeCurrent.value = response[0].GRADE;
            TOneFTECurrent.value = response[0].FTE;
            if(response[0].FLSA_STATUS == "X"){
              TOneExemptStatusCurrent.value = "Exempt";
            }else{
              TOneExemptStatusCurrent.value = "Non Exempt";
            }
            TOneSupervisorNameCurrent.value = response[0].MANAGE_EMP_NAME;
            TOneSupervisorPositionCurrent.value = response[0].MANAGER_POSITION_NBR;
            TOneMPPNameCurrent.value = response[0].ADMIN_EMP_NAME;
            TOneMPPPositionCurrent.value = response[0].ADMIN_POSITION_NBR;
            PositionNumberValidationCheck.value = "Y";
              getCurrentFundingInformation();
        //    }
          }else if(response.length == "0"){
                  TOneDeptIdCurrent.value = "";
                  TOneIncumbentNameCurrent.value = "";
                  TOneReportingUnitCurrent.value = "";
                  TOneJobCodeCurrent.value = "";
                  TOnePositionTitleCurrent.value = "";
                  TOneRegTempCurrent.value = "";
                  TOneFullPartTimeCurrent.value = "";
                  TOneGradeRangeCurrent.value = "";
                  TOneFTECurrent.value = "";
                  TOneExemptStatusCurrent.value = "";
                  TOneSupervisorNameCurrent.value = "";
                  TOneSupervisorPositionCurrent.value = "";
                  TOneMPPNameCurrent.value = "";
                  TOneMPPPositionCurrent.value = "";
            if(RequestType.value == "Update Supervisor/MPP Supervisor Only"){
              TOneSupervisorNameNew.value = "";
              TOneSupervisorPositionNew.value = "";
              TOneMPPNameNew.value = "";
              TOneMPPPositionNew.value = "";
            }
            if(RequestType.value == "Update Position Number"){
              TOnePositionNumberNew.value = "";
              TOneDeptIdNew.value = ""; 
              TOneReportingUnitNew.value = "";
              TOneIncumbentNameNew.value = "";
              TOneRegTempNew.value = "";
            }
                  PositionNumberValidationCheck.value = "N";
                  getCurrentFundingInformation();
            
            $.ajax({
		type: 'GET',
		url: "/bin/getPositionActionForm",
		data: {
			action: "GET_REQUESTOR_DATA_POSITION_NUMBER_LOOKUP_BACKUP",
            positionNumber: TOnePositionNumberCurrent.value
		},
		dataType: 'json',
		success: function(response) {
          if(response.length >= 1){
        /*    if(RequestType.value == "Update Funding Only"){
            TOneDeptIdCurrent.value = response[0].DEPTID;
            TOneJobCodeCurrent.value = response[0].JOBCODE;
            PositionNumberValidationCheck.value = "Y";
              getCurrentFundingInformation();
            }else{*/
            if(RequestType.value == "Update Position Number"){
              TOnePositionNumberNew.value = TOnePositionNumberCurrent.value;
              TOneDeptIdNew.value = response[0].DEPTID;
              TOneReportingUnitNew.value = response[0].CSU_UNIT;
              if(response[0].REG_TEMP == "R"){
              TOneRegTempNew.value = "Regular";
            }else{
              TOneRegTempNew.value = "Temporary";
            }
            }
            TOneDeptIdCurrent.value = response[0].DEPTID;
            TOneJobCodeCurrent.value = response[0].JOBCODE;
            TOneReportingUnitCurrent.value = response[0].CSU_UNIT;
            TOnePositionTitleCurrent.value = response[0].POS_DESCR;
            if(response[0].REG_TEMP == "R"){
              TOneRegTempCurrent.value = "Regular";
            }else{
              TOneRegTempCurrent.value = "Temporary";
            }
            if(response[0].FULL_PART_TIME == "F"){
              TOneFullPartTimeCurrent.value = "Full-time";
            }else{
              TOneFullPartTimeCurrent.value = "Part-time";
            }
            TOneGradeRangeCurrent.value = response[0].GRADE;
            TOneFTECurrent.value = response[0].FTE;
            if(response[0].FLSA_STATUS == "X"){
              TOneExemptStatusCurrent.value = "Exempt";
            }else{
              TOneExemptStatusCurrent.value = "Non Exempt";
            }
            TOneSupervisorNameCurrent.value = response[0].SUPERVISORNAME;
            TOneSupervisorPositionCurrent.value = response[0].MANAGER_POSITION_NBR;
            TOneMPPNameCurrent.value = response[0].ADMIN_EMP_NAME;
            TOneMPPPositionCurrent.value = response[0].ADMIN_POSITION_NBR;
            PositionNumberValidationCheck.value = "Y";
              getCurrentFundingInformation();
         //   }
          }else if(response.length == "0"){
            showErrorModal("Alert!", "No matching records found");
                  TOneDeptIdCurrent.value = "";
                  TOneIncumbentNameCurrent.value = "";
                  TOneReportingUnitCurrent.value = "";
                  TOneJobCodeCurrent.value = "";
                  TOnePositionTitleCurrent.value = "";
                  TOneRegTempCurrent.value = "";
                  TOneFullPartTimeCurrent.value = "";
                  TOneGradeRangeCurrent.value = "";
                  TOneFTECurrent.value = "";
                  TOneExemptStatusCurrent.value = "";
                  TOneSupervisorNameCurrent.value = "";
                  TOneSupervisorPositionCurrent.value = "";
                  TOneMPPNameCurrent.value = "";
                  TOneMPPPositionCurrent.value = "";
            if(RequestType.value == "Update Supervisor/MPP Supervisor Only"){
              TOneSupervisorNameNew.value = "";
              TOneSupervisorPositionNew.value = "";
              TOneMPPNameNew.value = "";
              TOneMPPPositionNew.value = "";
            }
            if(RequestType.value == "Update Position Number"){
              TOnePositionNumberNew.value = "";
              TOneDeptIdNew.value = ""; 
              TOneReportingUnitNew.value = "";
              TOneIncumbentNameNew.value = "";
              TOneRegTempNew.value = "";
            }
                  PositionNumberValidationCheck.value = "N";
              getCurrentFundingInformation();
            }
        }, 
            });
            }
        }
});
  debugger;
  
  
}

function getCurrentFundingInformation(){
  debugger;
  if(RequestType.value === null){
    FundingUpdateStatus.value = "";
  }
  var rowcount = TTwoROne.instanceManager.instanceCount;
    if (rowcount !== null) {
      for (var k = 0; k < rowcount; k++) {
         TTwoROne.instanceManager.removeInstance(TTwoROne.instanceIndex);
      }
   }
   TTwoROne.TTwoROneFundingDeptId.value = "";
   TTwoROne.TTwoROneFund.value = "";
   TTwoROne.TTwoROneProgramCode.value = "";
   TTwoROne.TTwoROneClassCode.value = "";
   TTwoROne.TTwoROneProject.value = "";
   TTwoROne.TTwoROneAccount.value = "";
   TTwoROne.TTwoROneDist.value = "";
  
   var rowcount1 = TThreeROne.instanceManager.instanceCount;
   if (rowcount1 !== null) {
      for (var p = 0; p < rowcount1; p++) {
         TThreeROne.instanceManager.removeInstance(TThreeROne.instanceIndex);
      }
   }
   TThreeROne.TThreeROneCurrentFundingDeptId.value = "";
   TThreeROne.TThreeROneCurrentFund.value = "";
   TThreeROne.TThreeROneCurrentProgramCode.value = "";
   TThreeROne.TThreeROneCurrentClassCode.value = "";
   TThreeROne.TThreeROneCurrentProject.value = "";
   TThreeROne.TThreeROneCurrentAccount.value = "";
   TThreeROne.TThreeROneCurrentDist.value = "";
  
  
  if(PositionNumberValidationCheck.value == "Y"){
      $.ajax({
		type: 'GET',
		url: "/bin/getPositionActionForm",
		data: {
			action: "GET_CURRENT_FUNDING_DATA",
            positionNumber: TOnePositionNumberCurrent.value
		},
		dataType: 'json',
		success: function(response) {
          if(response.length >= 1){
            debugger;
           
            for(var i=0; i<response.length; i++){
               if (i < (response.length - 1)) {
            TThreeROne.instanceManager.addInstance(true);
        }
               TThreeROne.instanceManager.instances[i].TThreeROneCurrentFundingDeptId.value = response[i].DEPTID_CF;
              TThreeROne.instanceManager.instances[i].TThreeROneCurrentFund.value = response[i].FUND_CODE; 
              TThreeROne.instanceManager.instances[i].TThreeROneCurrentProgramCode.value = response[i].PROGRAM_CODE; 
              TThreeROne.instanceManager.instances[i].TThreeROneCurrentClassCode.value = response[i].CLASS_FLD;
           /*   if(/^\s*$/.test(response[i].CURRENT_FUND_CLASS)){
                TThreeROne.instanceManager.instances[i].TThreeROneCurrentClassCode.value = response[i].CURRENT_FUND_CLASS;
              }else{
                TThreeROne.instanceManager.instances[i].TThreeROneCurrentClassCode.value = "2"+response[i].CURRENT_FUND_CLASS;
              }*/
             // TThreeROne.instanceManager.instances[i].TThreeROneCurrentProject.value = response[i].CURRENT_FUND_DEPT_ID; 
              TThreeROne.instanceManager.instances[i].TThreeROneCurrentAccount.value = response[i].ACCOUNT;
              TThreeROne.instanceManager.instances[i].TThreeROneCurrentDist.value = response[i].DIST_PCT;
            }
          }
          
        }, 
      });
    
  }
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TOnePositionNumberCurrent_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TOnePositionNumberCurrent_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (
    (StageIndicator.value === null && AppropriateApproverSignaturePanel.visible == false && AcademicAffairsSignaturePanel.visible == false && SaveFlag.value == "false") ||
    (StageIndicator.value == "ToAppropriateRequestor" && LoadingFlag.value == "true") ||
    (StageIndicator.value == "ToAppropriateApprover" && LoadingFlag.value == "true") ||
    (StageIndicator.value == "ToAcademicAffairs" && LoadingFlag.value == "true") || 
    (StageIndicator.value == "ToPositionManagement" && LoadingFlag.value == "true") || 
    (StageIndicator.value == "ToAppropriateReviewer" && LoadingFlag.value == "true")
) {
    $.ajax({
        type: 'GET',
        url: "/bin/getPositionActionForm",
        data: {
            action: "GET_POSITION_NUMBER_DATA_UPDATED",
            positionNumber: TOnePositionNumberCurrent.value
        },
        dataType: 'json',
        success: function(response) {
            if (response.length === 1) {
                if (RequestType.value == "Update Position Number") {
                    TOneIncumbentNameNew.value = response[0].NAME;
                    TOnePositionNumberNew.value = TOnePositionNumberCurrent.value;
                    TOneDeptIdNew.value = response[0].DEPTID;
                    TOneReportingUnitNew.value = response[0].CSU_UNIT;
                    if (response[0].REG_TEMP == "R") {
                        TOneRegTempNew.value = "Regular";
                    } else {
                        TOneRegTempNew.value = "Temporary";
                    }
                }
                TOneIncumbentNameCurrent.value = response[0].NAME;
                TOneDeptIdCurrent.value = response[0].DEPTID;
                TOneReportingUnitCurrent.value = response[0].CSU_UNIT;
                TOneJobCodeCurrent.value = response[0].JOBCODE;
                TOnePositionTitleCurrent.value = response[0].CSU_WORKING_TITLE;
                if (response[0].REG_TEMP == "R") {
                    TOneRegTempCurrent.value = "Regular";
                } else {
                    TOneRegTempCurrent.value = "Temporary";
                }
                if (response[0].FULL_PART_TIME == "F") {
                    TOneFullPartTimeCurrent.value = "Full-time";
                } else {
                    TOneFullPartTimeCurrent.value = "Part-time";
                }
                TOneGradeRangeCurrent.value = response[0].GRADE;
                TOneFTECurrent.value = response[0].FTE;
                if (response[0].FLSA_STATUS == "X") {
                    TOneExemptStatusCurrent.value = "Exempt";
                } else {
                    TOneExemptStatusCurrent.value = "Non Exempt";
                }
                TOneSupervisorNameCurrent.value = response[0].REPORTS_TO_NAME;
                TOneSupervisorPositionCurrent.value = response[0].REPORTS_TO;
                TOneMPPNameCurrent.value = response[0].REPORT_DOTTED_LINE_NAME;
                TOneMPPPositionCurrent.value = response[0].REPORT_DOTTED_LINE;
                if(response[0].KEY_POSITION == "Y"){
                  TOneCOICurrent.value = "Yes";
                }else{
                  TOneCOICurrent.value = "No";
                }
                
                if(response[0].CSU_MPP_JOB_FAMILY.trim() !== "" &&  response[0].CSU_MPP_JOB_FUNC.trim() !== "" && response[0].CSU_MPP_RPT_CAT.trim() !== ""){
                  TOneMPPCodeCurrent.value = response[0].CSU_MPP_JOB_FAMILY+response[0].CSU_MPP_JOB_FUNC+response[0].CSU_MPP_RPT_CAT;
                }
                if (RequestType.value == "Update Supervisor/MPP Supervisor Only" || "Update Position Number" || "Update Funding Only" || "Inactivate Position") {
                    if (TOneJobCodeCurrent.value !== null) {
                        if (TOneJobCodeCurrent.value == "3318" || TOneJobCodeCurrent.value == "3312" || TOneJobCodeCurrent.value == "3306" || TOneJobCodeCurrent.value == "3300") {
                            MPPSectionDisplay.value = "Yes";
                            tableItem17314955492911731495550851.visible = true;
                            TOneMPPCodeCurrent.visible = true;
                            TOneMPPCodeNew.visible = true;
                            tableItem17314956341411731495635773.visible = true;
                            TOneCOICurrent.visible = true;
                            TOneCOINew.visible = true;
                        } else {
                            MPPSectionDisplay.value = "No";
                            tableItem17314955492911731495550851.visible = false;
                            TOneMPPCodeCurrent.visible = false;
                            TOneMPPCodeNew.visible = false;
                            tableItem17314956341411731495635773.visible = false;
                            TOneCOICurrent.visible = false;
                            TOneCOINew.visible = false;
                        }
                    } else {
                        MPPSectionDisplay.value = "No";
                        tableItem17314955492911731495550851.visible = false;
                        TOneMPPCodeCurrent.visible = false;
                        TOneMPPCodeNew.visible = false;
                        tableItem17314956341411731495635773.visible = false;
                        TOneCOICurrent.visible = false;
                        TOneCOINew.visible = false;
                    }
                }
                PositionNumberValidationCheck.value = "Y";
                getCurrentFundingInformation();
            } else if (response.length > 1) {

                myModal.style.display = "block";
                var col = [];
                col.push("NAME");
                col.push("DEPTID");
                col.push("CSU_UNIT");
                col.push("JOBCODE");
                col.push("CSU_WORKING_TITLE");
                col.push("REPORTS_TO_NAME");
                col.push("REPORTS_TO");
                col.push("REPORT_DOTTED_LINE_NAME");
                col.push("REPORT_DOTTED_LINE");
                var table = document.createElement("table");
                table.id = "tb";
                var tr = table.insertRow(-1);
                var headings = ["", "Name", "Dept Id", "Reporting Unit", "Job Code", "Position Title", "Supervisor Name", "Supervisor Position #", "MPP Name", "MPP Position #"];
                for (var j = 0; j < headings.length; j++) {
                    var th = document.createElement("th");
                    th.innerHTML = headings[j];
                    tr.appendChild(th);
                }
                for (var k = 0; k < response.length; k++) {
                    tr = table.insertRow(-1);
                    var button = document.createElement("input");
                    button.type = "radio";
                    button.setAttribute("class", "rb");
                    button.id = "rbtn";
                    button.name = "group";
                    button.value = "";
                    button.onclick = function(event) {};
                    var tabCell1 = tr.insertCell(-1);
                    tabCell1.appendChild(button);
                    for (var l = 0; l < col.length; l++) {
                        var tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = response[k][col[l]];
                    }
                }
                var divContainer = document.getElementById("showData");
                divContainer.innerHTML = "";
                divContainer.appendChild(table);
                var footerModal = document.getElementById("modal_footer");
                var okButton = document.createElement("input");
                okButton.type = "button";
                okButton.setAttribute("class", "okBtn");
                okButton.value = "OK";
                okButton.onclick = function(event) {
                    var n;
                    var rButtonStatus;
                    var rButtons = document.getElementsByClassName("rb");
                    for (n = 0; n < rButtons.length; n++) {
                        if (rButtons[n].checked === false) {
                            rButtonStatus = false;
                        } else {
                            if (RequestType.value == "Update Position Number") {
                                TOneIncumbentNameNew.value = response[n].NAME;
                                TOnePositionNumberNew.value = TOnePositionNumberCurrent.value;
                                TOneDeptIdNew.value = response[n].DEPTID;
                                TOneReportingUnitNew.value = response[n].CSU_UNIT;
                                if (response[n].REG_TEMP == "R") {
                                    TOneRegTempNew.value = "Regular";
                                } else {
                                    TOneRegTempNew.value = "Temporary";
                                }
                            }
                            TOneIncumbentNameCurrent.value = response[n].NAME;
                            TOneDeptIdCurrent.value = response[n].DEPTID;
                            TOneReportingUnitCurrent.value = response[n].CSU_UNIT;
                            TOneJobCodeCurrent.value = response[n].JOBCODE;
                            TOnePositionTitleCurrent.value = response[n].CSU_WORKING_TITLE;
                            if (response[n].REG_TEMP == "R") {
                                TOneRegTempCurrent.value = "Regular";
                            } else {
                                TOneRegTempCurrent.value = "Temporary";
                            }
                            if (response[n].FULL_PART_TIME == "F") {
                                TOneFullPartTimeCurrent.value = "Full-time";
                            } else {
                                TOneFullPartTimeCurrent.value = "Part-time";
                            }
                            TOneGradeRangeCurrent.value = response[n].GRADE;
                            TOneFTECurrent.value = response[n].FTE;
                            if (response[n].FLSA_STATUS == "X") {
                                TOneExemptStatusCurrent.value = "Exempt";
                            } else {
                                TOneExemptStatusCurrent.value = "Non Exempt";
                            }
                            TOneSupervisorNameCurrent.value = response[n].REPORTS_TO_NAME;
                            TOneSupervisorPositionCurrent.value = response[n].REPORTS_TO;
                            TOneMPPNameCurrent.value = response[n].REPORT_DOTTED_LINE_NAME;
                            TOneMPPPositionCurrent.value = response[n].REPORT_DOTTED_LINE;
                             if(response[n].KEY_POSITION == "Y"){
                  TOneCOICurrent.value = "Yes";
                }else{
                  TOneCOICurrent.value = "No";
                }
                
                            if(response[n].CSU_MPP_JOB_FAMILY.trim() !== "" &&  response[n].CSU_MPP_JOB_FUNC.trim() !== "" && response[n].CSU_MPP_RPT_CAT.trim() !== ""){
                            TOneMPPCodeCurrent.value = response[n].CSU_MPP_JOB_FAMILY+response[n].CSU_MPP_JOB_FUNC+response[n].CSU_MPP_RPT_CAT;
                            }
                            if (RequestType.value == "Update Supervisor/MPP Supervisor Only" || "Update Position Number" || "Update Funding Only" || "Inactivate Position") {
                                if (TOneJobCodeCurrent.value !== null) {
                                    if (TOneJobCodeCurrent.value == "3318" || TOneJobCodeCurrent.value == "3312" || TOneJobCodeCurrent.value == "3306" || TOneJobCodeCurrent.value == "3300") {
                                        MPPSectionDisplay.value = "Yes";
                                        tableItem17314955492911731495550851.visible = true;
                                        TOneMPPCodeCurrent.visible = true;
                                        TOneMPPCodeNew.visible = true;
                                        tableItem17314956341411731495635773.visible = true;
                                        TOneCOICurrent.visible = true;
                                        TOneCOINew.visible = true;
                                    } else {
                                        MPPSectionDisplay.value = "No";
                                        tableItem17314955492911731495550851.visible = false;
                                        TOneMPPCodeCurrent.visible = false;
                                        TOneMPPCodeNew.visible = false;
                                        tableItem17314956341411731495635773.visible = false;
                                        TOneCOICurrent.visible = false;
                                        TOneCOINew.visible = false;
                                    }
                                } else {
                                    MPPSectionDisplay.value = "No";
                                    tableItem17314955492911731495550851.visible = false;
                                    TOneMPPCodeCurrent.visible = false;
                                    TOneMPPCodeNew.visible = false;
                                    tableItem17314956341411731495635773.visible = false;
                                    TOneCOICurrent.visible = false;
                                    TOneCOINew.visible = false;
                                }
                            }                            
                            PositionNumberValidationCheck.value = "Y";
                            getCurrentFundingInformation();
                            rButtonStatus = true;
                            break;
                        }
                    }
                    if (rButtonStatus === false) {
                        showErrorModal("Alert !", "please select an entry");
                        myModal.style.display = "block";
                    } else {
                        myModal.style.display = "none";
                    }
                };
                footerModal.appendChild(okButton);
            } else {
                showErrorModal("Alert!", "No matching records found");
               TOneDeptIdCurrent.value = "";
                  TOneIncumbentNameCurrent.value = "";
                  TOneReportingUnitCurrent.value = "";
                  TOneJobCodeCurrent.value = "";
                  TOnePositionTitleCurrent.value = "";
                  TOneRegTempCurrent.value = "";
                  TOneFullPartTimeCurrent.value = "";
                  TOneGradeRangeCurrent.value = "";
                  TOneFTECurrent.value = "";
                  TOneExemptStatusCurrent.value = "";
                  TOneSupervisorNameCurrent.value = "";
                  TOneSupervisorPositionCurrent.value = "";
                  TOneMPPNameCurrent.value = "";
                  TOneMPPPositionCurrent.value = "";
                  TOneMPPCodeCurrent.value = ""; 
                  TOneCOICurrent.value = "";
                  MPPSectionDisplay.value = "No";
            if(RequestType.value == "Update Supervisor/MPP Supervisor"){
              TOneSupervisorNameNew.value = "";
              TOneSupervisorPositionNew.value = "";
              TOneMPPNameNew.value = "";
              TOneMPPPositionNew.value = "";
            }
            if(RequestType.value == "Update Position Number"){
              TOnePositionNumberNew.value = "";
              TOneDeptIdNew.value = ""; 
              TOneReportingUnitNew.value = "";
              TOneIncumbentNameNew.value = "";
              TOneRegTempNew.value = "";
            }
               PositionNumberValidationCheck.value = "N";
              getCurrentFundingInformation();
            }
        },
        error: function(error) {
            alert("error block=" + error);
        }
    });
}

function getCurrentFundingInformation(){
  if(RequestType.value === null){
    FundingUpdateStatus.value = "";
  }
  var rowcount = TTwoROne.instanceManager.instanceCount;
    if (rowcount !== null) {
      for (var k = 0; k < rowcount; k++) {
         TTwoROne.instanceManager.removeInstance(TTwoROne.instanceIndex);
      }
   }
   TTwoROne.TTwoROneFundingDeptId.value = "";
   TTwoROne.TTwoROneFund.value = "";
   TTwoROne.TTwoROneProgramCode.value = "";
   TTwoROne.TTwoROneClassCode.value = "";
   TTwoROne.TTwoROneProject.value = "";
   TTwoROne.TTwoROneAccount.value = "";
   TTwoROne.TTwoROneDist.value = "";
  
   var rowcount1 = TThreeROne.instanceManager.instanceCount;
   if (rowcount1 !== null) {
      for (var p = 0; p < rowcount1; p++) {
         TThreeROne.instanceManager.removeInstance(TThreeROne.instanceIndex);
      }
   }
   TThreeROne.TThreeROneCurrentPoolID.value = "";
   TThreeROne.TThreeROneCurrentFundingDeptId.value = "";
   TThreeROne.TThreeROneCurrentFund.value = "";
   TThreeROne.TThreeROneCurrentProgramCode.value = "";
   TThreeROne.TThreeROneCurrentClassCode.value = "";
   TThreeROne.TThreeROneCurrentProject.value = "";
   TThreeROne.TThreeROneCurrentAccount.value = "";
   TThreeROne.TThreeROneCurrentDist.value = "";
  
  if(PositionNumberValidationCheck.value == "Y"){
      $.ajax({
		type: 'GET',
		url: "/bin/getPositionActionForm",
		data: {
			action: "GET_CURRENT_FUNDING_DATA",
            positionNumber: TOnePositionNumberCurrent.value,
            name: TOneIncumbentNameCurrent.value
		},
		dataType: 'json',
		success: function(response) {
          if(response.length >= 1){
            for(var i=0; i<response.length; i++){
               if (i < (response.length - 1)) {
            TThreeROne.instanceManager.addInstance(true);
        }
               TThreeROne.instanceManager.instances[i].TThreeROneCurrentFundingDeptId.value = response[i].DEPTID_CF;
              TThreeROne.instanceManager.instances[i].TThreeROneCurrentFund.value = response[i].FUND_CODE; 
              TThreeROne.instanceManager.instances[i].TThreeROneCurrentProgramCode.value = response[i].PROGRAM_CODE; 
              TThreeROne.instanceManager.instances[i].TThreeROneCurrentClassCode.value = response[i].CLASS_FLD;
           /*   if(/^\s*$/.test(response[i].CURRENT_FUND_CLASS)){
                TThreeROne.instanceManager.instances[i].TThreeROneCurrentClassCode.value = response[i].CURRENT_FUND_CLASS;
              }else{
                TThreeROne.instanceManager.instances[i].TThreeROneCurrentClassCode.value = "2"+response[i].CURRENT_FUND_CLASS;
              }*/
             // TThreeROne.instanceManager.instances[i].TThreeROneCurrentProject.value = response[i].CURRENT_FUND_DEPT_ID; 
              TThreeROne.instanceManager.instances[i].TThreeROneCurrentAccount.value = response[i].ACCOUNT;
              TThreeROne.instanceManager.instances[i].TThreeROneCurrentDist.value = response[i].DIST_PCT;
              TThreeROne.instanceManager.instances[i].TThreeROneCurrentPoolID.value = response[i].POSITION_POOL_ID;
            }
          }
          
        }, 
      });
  }
  
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TOneJobCodeNew_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TOneJobCodeNew_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (
    (StageIndicator.value === null && AppropriateApproverSignaturePanel.visible == false && AcademicAffairsSignaturePanel.visible == false && SaveFlag.value == "false") ||
    (StageIndicator.value == "ToAppropriateRequestor" && LoadingFlag.value == "true") ||
    (StageIndicator.value == "ToAppropriateApprover" && LoadingFlag.value == "true") ||
    (StageIndicator.value == "ToAcademicAffairs" && LoadingFlag.value == "true") ||
    (StageIndicator.value == "ToPositionManagement" && LoadingFlag.value == "true") ||
    (StageIndicator.value == "ToAppropriateReviewer" && LoadingFlag.value == "true")
) {
    if (RequestType.value == "Create New Temporary Transition MPP Position Number") {
        MPPSectionDisplay.value = "Yes";
        tableItem17314955492911731495550851.visible = true;
        TOneMPPCodeCurrent.visible = true;
        TOneMPPCodeNew.visible = true;
        tableItem17314956341411731495635773.visible = true;
        TOneCOICurrent.visible = true;
        TOneCOINew.visible = true;
    } else if (RequestType.value == "Create a New Position Number") {
        if (TOneJobCodeNew.value !== null) {
            if (TOneJobCodeNew.value == "3318" || TOneJobCodeNew.value == "3312" || TOneJobCodeNew.value == "3306" || TOneJobCodeNew.value == "3300") {
                MPPSectionDisplay.value = "Yes";
                tableItem17314955492911731495550851.visible = true;
                TOneMPPCodeCurrent.visible = true;
                TOneMPPCodeNew.visible = true;
                tableItem17314956341411731495635773.visible = true;
                TOneCOICurrent.visible = true;
                TOneCOINew.visible = true;
            } else {
                MPPSectionDisplay.value = "No";
                tableItem17314955492911731495550851.visible = false;
                TOneMPPCodeCurrent.visible = false;
                TOneMPPCodeNew.visible = false;
                tableItem17314956341411731495635773.visible = false;
                TOneCOICurrent.visible = false;
                TOneCOINew.visible = false;
            }
        } else {
            MPPSectionDisplay.value = "No";
            tableItem17314955492911731495550851.visible = false;
            TOneMPPCodeCurrent.visible = false;
            TOneMPPCodeNew.visible = false;
            tableItem17314956341411731495635773.visible = false;
            TOneCOICurrent.visible = false;
            TOneCOINew.visible = false;
        }
    }
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TableSupervisorSelectionName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TableSupervisorSelectionName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.value = "";
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TableSupervisorSelectionName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TableSupervisorSelectionName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if((StageIndicator.value === null || 
  (StageIndicator.value == "ToAppropriateRequestor" && LoadingFlag.value == "true") || 
  (StageIndicator.value == "ToAppropriateApprover" && LoadingFlag.value == "true") || 
  (StageIndicator.value == "ToAcademicAffairs" && LoadingFlag.value == "true") || 
  (StageIndicator.value == "ToPositionManagement" && LoadingFlag.value == "true") ||
  (StageIndicator.value == "ToAppropriateReviewer" && LoadingFlag.value == "true")
  )){
  if(this.value !== null){
  TableSupervisorSelectionDropdown.value = ""; 
  TableSupervisorSelectionDropdown.items = "";
  var enteredValue = this.value;
  var arr = JSON.parse(SupervisorMppConsolidatedArray.value); 
  var resArray = [];
for(var k=0; k<arr.length; k++){
    resArray.push(arr[k].NAME+" - "+arr[k].POSITION_NBR);
}
  resArray = resArray.sort();
  var finalArray = [];
  for(var i=0; i<resArray.length; i++){
    if (resArray[i].toUpperCase().includes(enteredValue.toUpperCase())){
      finalArray.push(resArray[i]);
    }
  }
    finalArray.push("Other");
  TableSupervisorSelectionDropdown.items = finalArray;
}else{
  TableSupervisorSelectionDropdown.value = ""; 
  TableSupervisorSelectionDropdown.items = "";
  TableSupervisorSelectionDropdown.items = "Other";
}
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TableSupervisorSelectionDropdown_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TableSupervisorSelectionDropdown_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.value = ""; 
this.items = "";
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TableSupervisorSelectionDropdown_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TableSupervisorSelectionDropdown_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || 
  (StageIndicator.value == "ToAppropriateRequestor" && LoadingFlag.value == "true") || 
  (StageIndicator.value == "ToAppropriateApprover" && LoadingFlag.value == "true") || 
  (StageIndicator.value == "ToAcademicAffairs" && LoadingFlag.value == "true") || 
   (StageIndicator.value == "ToPositionManagement" && LoadingFlag.value == "true") || 
   (StageIndicator.value == "ToAppropriateReviewer" && LoadingFlag.value == "true")
  ){
if(this.value != "Other"){
var selectedVal = this.value;
var nameVal = value.substring(0, value.indexOf(" -"));
var pNoVal = value.substring(value.indexOf("- ")+2, value.length);
TOneSupervisorNameNew.value = nameVal;
TOneSupervisorPositionNew.value = pNoVal;
    TOneSupervisorNameNew.enabled = false;
  TOneSupervisorPositionNew.enabled = false;
}else{
  TOneSupervisorNameNew.value = "";
TOneSupervisorPositionNew.value = "";
  TOneSupervisorNameNew.enabled = true;
  TOneSupervisorPositionNew.enabled = true;
}
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TableMPPSelectionName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TableMPPSelectionName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.value = "";
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TableMPPSelectionName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TableMPPSelectionName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if((StageIndicator.value === null || 
  (StageIndicator.value == "ToAppropriateRequestor" && LoadingFlag.value == "true") || 
  (StageIndicator.value == "ToAppropriateApprover" && LoadingFlag.value == "true") || 
  (StageIndicator.value == "ToAcademicAffairs" && LoadingFlag.value == "true") || 
    (StageIndicator.value == "ToPositionManagement" && LoadingFlag.value == "true") || 
    (StageIndicator.value == "ToAppropriateReviewer" && LoadingFlag.value == "true")
  )){
  if(this.value !== null){
  TableMPPSelectionDropdown.value = ""; 
  TableMPPSelectionDropdown.items = "";
  var enteredValue = this.value;
  var arr = JSON.parse(SupervisorMppConsolidatedArray.value); 
  var resArray = [];
for(var k=0; k<arr.length; k++){
    resArray.push(arr[k].NAME+" - "+arr[k].POSITION_NBR);
}
  resArray = resArray.sort();
  var finalArray = [];
  for(var i=0; i<resArray.length; i++){
    if (resArray[i].toUpperCase().includes(enteredValue.toUpperCase())){
      finalArray.push(resArray[i]);
    }
  }
    finalArray.push("Other");
  TableMPPSelectionDropdown.items = finalArray;
}else{
  TableMPPSelectionDropdown.value = ""; 
  TableMPPSelectionDropdown.items = "";
  TableMPPSelectionDropdown.items = "Other";
}
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TableMPPSelectionDropdown_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TableMPPSelectionDropdown_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.value = ""; 
this.items = "";
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TableMPPSelectionDropdown_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TableMPPSelectionDropdown_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if((StageIndicator.value === null || 
  (StageIndicator.value == "ToAppropriateRequestor" && LoadingFlag.value == "true") || 
  (StageIndicator.value == "ToAppropriateApprover" && LoadingFlag.value == "true") || 
  (StageIndicator.value == "ToAcademicAffairs" && LoadingFlag.value == "true") || 
    (StageIndicator.value == "ToPositionManagement" && LoadingFlag.value == "true") || 
    (StageIndicator.value == "ToAppropriateReviewer" && LoadingFlag.value == "true")
  )){
if(this.value != "Other"){
var selectedVal = this.value;
var nameVal = value.substring(0, value.indexOf(" -"));
var pNoVal = value.substring(value.indexOf("- ")+2, value.length);
TOneMPPNameNew.value = nameVal;
TOneMPPPositionNew.value = pNoVal;
  TOneMPPNameNew.enabled = false;
  TOneMPPPositionNew.enabled = false;
}else{
  TOneMPPNameNew.value = "";
TOneMPPPositionNew.value = "";
  TOneMPPNameNew.enabled = true;
  TOneMPPPositionNew.enabled = true;
}
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_FundingUpdateStatus_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_FundingUpdateStatus_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToAppropriateRequestor" || StageIndicator.value == "ToAppropriateApprover" || StageIndicator.value == "ToAcademicAffairs" || StageIndicator.value == "ToPositionManagement" || StageIndicator.value == "ToAppropriateReviewer"){
  debugger;
  if(this.value == "1"){
     var elements = document.getElementsByClassName('guideTableRuntimeControls guideTableRuntimeRightControls');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "block";
    }
    table_4766046821696422254592.enabled = true;
    TTwoROne.TTwoROneFundingDeptId.mandatory = true;
    TTwoROne.TTwoROneFund.mandatory = true;
    //TTwoROne.TTwoROneProgramCode.mandatory = true;
    //TTwoROne.TTwoROneClassCode.mandatory = true;
    //TTwoROne.TTwoROneProject.mandatory = true;
    TTwoROne.TTwoROneAccount.mandatory = true;
    TTwoROne. TTwoROneDist.mandatory = true;
  }else{
     var rowcount = TThreeROne.instanceManager.instanceCount;
     var elements = document.getElementsByClassName('guideTableRuntimeControls guideTableRuntimeRightControls');
    for (var i = rowcount; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    table_4766046821696422254592.enabled = false;
   
    
    var rowcount = TTwoROne.instanceManager.instanceCount;
    if (rowcount !== null) {
      for (var k = 0; k < rowcount; k++) {
         TTwoROne.instanceManager.removeInstance(k);
      }
   }
   TTwoROne.TTwoROneFundingDeptId.value = "";
   TTwoROne.TTwoROneFund.value = "";
   TTwoROne.TTwoROneProgramCode.value = "";
   TTwoROne.TTwoROneClassCode.value = "";
   TTwoROne.TTwoROneProject.value = "";
   TTwoROne.TTwoROneAccount.value = "";
   TTwoROne.TTwoROneDist.value = "";
    
     TTwoROne.TTwoROneFundingDeptId.mandatory = false;
    TTwoROne.TTwoROneFund.mandatory = false;
    TTwoROne.TTwoROneProgramCode.mandatory = false;
    TTwoROne.TTwoROneClassCode.mandatory = false;
    TTwoROne.TTwoROneProject.mandatory = false;
    TTwoROne.TTwoROneAccount.mandatory = false;
    TTwoROne. TTwoROneDist.mandatory = false;
  }
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TTwoROneFundingDeptId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TTwoROneFundingDeptId_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToAppropriateRequestor" || StageIndicator.value == "ToAppropriateApprover" || StageIndicator.value == "ToAcademicAffairs" || StageIndicator.value == "ToPositionManagement" || StageIndicator.value == "ToAppropriateReviewer"){
  var arr = JSON.parse(FundingDeptIDDataArray.value);
 TTwoROne.TTwoROneFundingDeptId.items = arr;
  if(FundingUpdateStatus.value == "1"){
    this.mandatory = true;
  }
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TTwoROneFund_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TTwoROneFund_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToAppropriateRequestor" || StageIndicator.value == "ToAppropriateApprover" || StageIndicator.value == "ToAcademicAffairs" || StageIndicator.value == "ToPositionManagement" || StageIndicator.value == "ToAppropriateReviewer"){
  var arr = JSON.parse(FundDataArray.value);
 TTwoROne.TTwoROneFund.items = arr;
    if(FundingUpdateStatus.value == "1"){
    this.mandatory = true;
  }
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TTwoROneProgramCode_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TTwoROneProgramCode_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToAppropriateRequestor" || StageIndicator.value == "ToAppropriateApprover" || StageIndicator.value == "ToAcademicAffairs" || StageIndicator.value == "ToPositionManagement" || StageIndicator.value == "ToAppropriateReviewer"){
  var arr = JSON.parse(ProgramCodeDataArray.value);
 TTwoROne.TTwoROneProgramCode.items = arr;
    if(FundingUpdateStatus.value == "1"){
    //this.mandatory = true;
  }
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TTwoROneClassCode_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TTwoROneClassCode_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToAppropriateRequestor" || StageIndicator.value == "ToAppropriateApprover" || StageIndicator.value == "ToAcademicAffairs" || StageIndicator.value == "ToPositionManagement" || StageIndicator.value == "ToAppropriateReviewer"){
  var arr = JSON.parse(ClassCodeDataArray.value);
 TTwoROne.TTwoROneClassCode.items = arr;
    if(FundingUpdateStatus.value == "1"){
    //this.mandatory = true;
  }
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TTwoROneProject_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TTwoROneProject_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToAppropriateRequestor" || StageIndicator.value == "ToAppropriateApprover" || StageIndicator.value == "ToAcademicAffairs" || StageIndicator.value == "ToPositionManagement" || StageIndicator.value == "ToAppropriateReviewer"){
  var arr = JSON.parse(ProjectDataArray.value);
 TTwoROne.TTwoROneProject.items = arr;
    if(FundingUpdateStatus.value == "1"){
    //this.mandatory = true;
  }
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TTwoROneAccount_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TTwoROneAccount_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToAppropriateRequestor" || StageIndicator.value == "ToAppropriateApprover" || StageIndicator.value == "ToAcademicAffairs" || StageIndicator.value == "ToPositionManagement" || StageIndicator.value == "ToAppropriateReviewer"){
  var arr = JSON.parse(AccountDataArray.value);
 TTwoROne.TTwoROneAccount.items = arr;
    if(FundingUpdateStatus.value == "1"){
    this.mandatory = true;
  }
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_TTwoROneDist_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_TTwoROneDist_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null || StageIndicator.value == "ToAppropriateRequestor" || StageIndicator.value == "ToAppropriateApprover" || StageIndicator.value == "ToAcademicAffairs" || StageIndicator.value == "ToAppropriateReviewer" || StageIndicator.value == "ToAppropriateReviewer"){
    if(FundingUpdateStatus.value == "1"){
    this.mandatory = true;
  }
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_SupportingDocumentsPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = true;
} else{
  this.visible = false;
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_supportDoc1_valueCommit0 = function (scope) {
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
 * @function position_action_form_position_action_form.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_supportDoc2_valueCommit0 = function (scope) {
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
 * @function position_action_form_position_action_form.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_supportDoc3_valueCommit0 = function (scope) {
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
 * @function position_action_form_position_action_form.generated_AppropiateRequestorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_AppropiateRequestorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null || StageIndicator.value == "ToAppropriateRequestor") {
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				AppropriateRequestorSignature.value = userValue;
				AppropriateRequestorSignatureName.value = userValue;
				AppropriateRequestorSignatureDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
		AppropriateRequestorSignature.enabled = false;
		AppropriateRequestorSignatureDate.enabled = false;
	} else {
		AppropriateRequestorSignature.value = "";
		AppropriateRequestorSignatureName.value = "";
		AppropriateRequestorSignatureDate.value = "";
	}
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_AppropriateRequestorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_AppropriateRequestorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_AppropriateRequestorSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_AppropriateRequestorSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_AppropriateReviewerCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_AppropriateReviewerCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToAppropriateReviewer") {
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				AppropriateReviewerPrintName.value = userValue;
				AppropriateReviewerSignature.value = userValue;
				AppropriateReviewerSignatureDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
		AppropriateReviewerSignature.enabled = false;
		AppropriateReviewerSignatureDate.enabled = false;
	} else {
		AppropriateReviewerPrintName.value = "";
		AppropriateReviewerSignature.value = "";
		AppropriateReviewerSignatureDate.value = "";
	}
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_AppropriateReviewerSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_AppropriateReviewerSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_AppropriateReviewerSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_AppropriateReviewerSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_AppropriateApproverCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_AppropriateApproverCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToAppropriateApprover") {
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				AppropriateApproverPrintName.value = userValue;
				AppropriateApproverSignature.value = userValue;
				AppropriateApproverSignatureDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
		AppropriateApproverSignature.enabled = false;
		AppropriateApproverSignatureDate.enabled = false;
	} else {
		AppropriateApproverPrintName.value = "";
		AppropriateApproverSignature.value = "";
		AppropriateApproverSignatureDate.value = "";
	}
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_AppropriateApproverSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_AppropriateApproverSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_AppropriateApproverSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_AppropriateApproverSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_AcademicAffairsCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_AcademicAffairsCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToAcademicAffairs") {
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				AcademicAffairsPrintName.value = userValue;
				AcademicAffairsSignature.value = userValue;
				AcademicAffairsSignatureDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
		AcademicAffairsSignature.enabled = false;
		AcademicAffairsSignatureDate.enabled = false;
	} else {
		AcademicAffairsPrintName.value = "";
		AcademicAffairsSignature.value = "";
		AcademicAffairsSignatureDate.value = "";
	}
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_AcademicAffairsSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_AcademicAffairsSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_AcademicAffairsSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_AcademicAffairsSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_CompensationServicesCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_CompensationServicesCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToCompensationServices") {
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				CompensationServicesPrintName.value = userValue;
				CompensationServicesSignature.value = userValue;
				CompensationServicesSignatureDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
		CompensationServicesSignature.enabled = false;
		CompensationServicesSignatureDate.enabled = false;
	} else {
		CompensationServicesPrintName.value = "";
		CompensationServicesSignature.value = "";
		CompensationServicesSignatureDate.value = "";
	}
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_CompensationServicesSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_CompensationServicesSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_CompensationServicesSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_CompensationServicesSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_PositionManagementCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_PositionManagementCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToPositionManagement") {
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				PositionManagementPrintName.value = userValue;
				PositionManagementSignature.value = userValue;
				PositionManagementSignatureDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
		PositionManagementSignature.enabled = false;
		PositionManagementSignatureDate.enabled = false;
	} else {
		PositionManagementPrintName.value = "";
		PositionManagementSignature.value = "";
		PositionManagementSignatureDate.value = "";
	}
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_PositionManagementSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_PositionManagementSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_PositionManagementSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_PositionManagementSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_LoadingFlag_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_LoadingFlag_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToAppropriateRequestor" || StageIndicator.value == "ToAppropriateApprover" || StageIndicator.value == "ToAcademicAffairs" || StageIndicator.value == "ToPositionManagement" || StageIndicator.value == "ToAppropriateReviewer"){
  this.value = "true";
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_SaveFlag_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_SaveFlag_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.value = "false";
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_MPPSectionDisplay_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_MPPSectionDisplay_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value !== null) {
    if (this.value == "Yes") {
        tableItem17314955492911731495550851.visible = true;
        TOneMPPCodeCurrent.visible = true;
        TOneMPPCodeNew.visible = true;
        tableItem17314956341411731495635773.visible = true;
        TOneCOICurrent.visible = true;
        TOneCOINew.visible = true;
    } else {
        tableItem17314955492911731495550851.visible = false;
        TOneMPPCodeCurrent.visible = false;
        TOneMPPCodeNew.visible = false;
        tableItem17314956341411731495635773.visible = false;
        TOneCOICurrent.visible = false;
        TOneCOINew.visible = false;
    }
}

if(this.value !== null && StageIndicator.value === null){
  if (this.value == "Yes") {
        tableItem17314955492911731495550851.visible = true;
        TOneMPPCodeCurrent.visible = true;
        TOneMPPCodeNew.visible = true;
        tableItem17314956341411731495635773.visible = true;
        TOneCOICurrent.visible = true;
        TOneCOINew.visible = true;
    } else {
        tableItem17314955492911731495550851.visible = false;
        TOneMPPCodeCurrent.visible = false;
        TOneMPPCodeNew.visible = false;
        tableItem17314956341411731495635773.visible = false;
        TOneCOICurrent.visible = false;
        TOneCOINew.visible = false;
    }
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            
     getPdf();


function getPdf() {
  debugger;
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            console.log("xml=" + result.data);
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/position-action-form/position-action-form');
            //jsonData.append('fileName', FirstName.value + "_" + LastName.value + "(" + EmplId.value + ")" + "_" + Date.now());
            jsonData.append('fileName', "Position Action Form");
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
 * @function position_action_form_position_action_form.generated_saveguidedraft1698166452129_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_saveguidedraft1698166452129_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  SaveFlag.value = "true";
  handleDraftSave(this);
}
        }
	}
}
/**
 * @function position_action_form_position_action_form.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
position_action_form_position_action_form.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  aftiaDescCWID.value = AppropriateRequestorName.value+" "+AppropriateRequestorCWID.value;
  EmailSubject.value = "Test - Position Action Form - "+caseId.value;
  FinalEmailSubject.value = "Test - Position Action Form - Completed ("+caseId.value+", "+DepartmentId.value+")"; 
  PositionManagementEmailSubject.value = "Test - Position Action Form - Position Management Review ("+caseId.value+")"; 
  AppropriateApproverEmailSubject.value = "Test - Position Action Form - Division MPP Review ("+caseId.value+")";
  AppropriateRequestorEmailSubject.value = "Test - Position Action Form - Requestor Review ("+caseId.value+")";
  AppropriateReviewerEmailSubject.value = "Test - Position Action Form - Division Reviewer Review ("+caseId.value+")";
  CompensationServicesEmailSubject.value = "Test - Position Action Form - Compensation Services Review ("+caseId.value+")";

}

AppropriateRequestorEmailId.value = "chaitanya.sai@thoughtfocus.com";
AppropriateReviewerEmailId.value = "chaitanya.sai@thoughtfocus.com";
AppropriateApproverEmailId.value = "chaitanya.sai@thoughtfocus.com";


var flag = "1";

if(RequestType.value !== null){
   flag = "0";
} else{
  showErrorModal("Alert!", "Please select request type");
  flag = "1";
}

if(RequestType.value !== null && flag == "0"){
  if(PositionNumberValidationCheck.value == "N" && RequestType.value != "Create a New Position Number" && RequestType.value != "Create New Temporary Transition MPP Position Number"){
  showErrorModal("Alert!", "Please enter Valid Position Number in current attributes");
    flag = "1";
} else{
  flag = "0";
}
}

if(RequestType.value !== null && flag == "0" && TOneJobCodeNew.value !== null){
  var jobCodeArray = ['3318', '3312', '3306', '3300'];
  var jobCodeVal = TOneJobCodeNew.value;
  if(RequestType.value == "Create a New Position Number" && jobCodeArray.includes(jobCodeVal) && supportDoc1.value === "" && supportDoc2.value === "" && supportDoc3.value === ""){
  showErrorModal("Alert!", "Please attach Position Description document");
     guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SupportingDocumentsPanel[0].supportDoc1[0]");
    flag = "1";
} else{
  flag = "0";
}
}



var initiator = workflow_initiator.value;
var appropriateApprovers = ["tgarcia","jvarreola","rconran-dunham","rscialdone","mabadal","litran","ceforgues"]; 
var appropriateReviewers = ["mepacheco","erochoa","dchow"];
var academicAffairsReviewers = ["rcrew","aadamson","tzanias","blivictorino"];
var arr = JSON.parse(SupervisorMppConsolidatedArray.value); 
var positionNumber = TOnePositionNumberCurrent.value;
var academicAffairsApproverFlag = "";
var appropriateApproverInitiatorFlag = "";
var appropriateReviewerInitiatorFlag = "";

//if(RequestType.value != "Create a New Position Number" && RequestType.value != "Create New Temporary Transition MPP Position Number"){
if(RequestType.value == "Update Position Number" || RequestType.value == "Inactivate Position"){
  if(TOneJobCodeCurrent.value !== null){
    if(TOneJobCodeCurrent.value == "3318" || TOneJobCodeCurrent.value == "3312" || TOneJobCodeCurrent.value == "3306" || TOneJobCodeCurrent.value == "3300"){
      MPPorStaffFlag.value = "mpp";
    } else{
      MPPorStaffFlag.value = "staff";
    }
  }else{
    MPPorStaffFlag.value = "staff";
  }
/*  MPPorStaffFlag.value = "";
  for(var i=0; i<arr.length; i++){
    if(arr[i].POSITION_NBR == positionNumber){
      MPPorStaffFlag.value = "mpp";
      break;
    }
  }
  if(MPPorStaffFlag.value === null){
     MPPorStaffFlag.value = "staff";
  }
  */
}else if(RequestType.value == "Create a New Position Number") {
	if(TOneJobCodeNew.value !== null){
		if(TOneJobCodeNew.value == "3318" || TOneJobCodeNew.value == "3312" || TOneJobCodeNew.value == "3306" || TOneJobCodeNew.value == "3300"){
			MPPorStaffFlag.value = "mpp";
		} else{
		    MPPorStaffFlag.value = "staff";
		}
	}else{
		 MPPorStaffFlag.value = "staff";
	} 
}else if(RequestType.value == "Create New Temporary Transition MPP Position Number"){
  MPPorStaffFlag.value = "mpp";
}else{
  MPPorStaffFlag.value = "staff";
}

if(appropriateApprovers.includes(initiator.toLowerCase())){
  appropriateApproverInitiatorFlag = "true";
} else{
  appropriateApproverInitiatorFlag = "false";
}

if(appropriateReviewers.includes(initiator.toLowerCase())){
  appropriateReviewerInitiatorFlag = "true";
} else{
  appropriateReviewerInitiatorFlag = "false";
}

if(academicAffairsReviewers.includes(initiator.toLowerCase())){
  academicAffairsApproverFlag = "true";
} else{
  academicAffairsApproverFlag = "false";
}

if((DivisionId.value == "10131" || DivisionId.value == "10236" || DivisionId.value == "10141") && appropriateReviewerInitiatorFlag == "false"){
  AppropriateReviewerFlag.value = "true";
} else{
   AppropriateReviewerFlag.value = "false";
}
if(DivisionId.value != "10237" && appropriateApproverInitiatorFlag == "false"){
  AppropriateApproverFlag.value = "true";
} else{
   AppropriateApproverFlag.value = "false";
}


if(DivisionId.value == "10237" && academicAffairsApproverFlag == "true"){
  RoutingFlag.value = "3"; 
} else if(DivisionId.value == "10237" && academicAffairsApproverFlag == "false"){
  RoutingFlag.value = "2"; 
} else if(DivisionId.value != "10131" && DivisionId.value != "10236" && DivisionId.value != "10141" && DivisionId.value != "10237" && AppropriateApproverFlag.value == "false"){
  RoutingFlag.value = "3"; 
} else if (DivisionId.value == "10131" && DivisionId.value == "10236" && DivisionId.value == "10141"){
  RoutingFlag.value = "1"; 
} else if(DivisionId.value != "10237"){
  RoutingFlag.value = "1"; 
} 

if(AppropriateReviewerFlag.value == "true" && AppropriateApproverFlag.value == "false" && MPPorStaffFlag.value == "staff"){
  PositionManagementReviewStepFlag.value = "1";
} else if (AppropriateReviewerFlag.value == "true" && AppropriateApproverFlag.value == "false" && MPPorStaffFlag.value == "mpp"){
  PositionManagementReviewStepFlag.value = "2";
} else if (AppropriateReviewerFlag.value == "false" && AppropriateApproverFlag.value == "true" && MPPorStaffFlag.value == "staff"){
  PositionManagementReviewStepFlag.value = "3";
} else if (AppropriateReviewerFlag.value == "false" && AppropriateApproverFlag.value == "true" && MPPorStaffFlag.value == "mpp"){
  PositionManagementReviewStepFlag.value = "4";
} else if (AppropriateReviewerFlag.value == "true" && AppropriateApproverFlag.value == "true" && MPPorStaffFlag.value == "staff"){
  PositionManagementReviewStepFlag.value = "5";
} else if (AppropriateReviewerFlag.value == "true" && AppropriateApproverFlag.value == "true" && MPPorStaffFlag.value == "mpp"){
  PositionManagementReviewStepFlag.value = "6";
}


if(flag == "0"){
   guideBridge.submit();
}

  


  



        }
	}
}
