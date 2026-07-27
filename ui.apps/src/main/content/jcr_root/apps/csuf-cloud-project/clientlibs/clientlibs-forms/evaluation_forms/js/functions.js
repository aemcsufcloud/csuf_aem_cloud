/**
 * @function evaluation_forms.generated_FormName_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
evaluation_forms.generated_FormName_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var evalTypeArray = [{"unit2579": ["Temporary","Annual","3-Mo. Probationary","6-Mo. Probationary","11-Mo. Probationary"],"unit8": ["Annual","Temporary","6-Month Probationary","9-Month Probationary","12-Month Probationary"],"unit1": ["Probationary","Final Probationary","Temporary","Permanent","Annual"],"unit6": ["Probationary Eval 6 Month","Final Probationary Eval 11 Month","Temporary","Annual"],"unitconf": ["Temporary","Annual","3-Month Prob","6-Month Prob","11-Month Prob","12-Month Prob","18-Month Prob"],"unit4": ["Annual","Temporary","Probationary","Special"]}];
EvaluationType.items = [];
EvaluationType.value = "";
debugger;
if(this.value == "/content/forms/af/staff-performance-evaluation-2-5-7-9/staff_performance_eval_2_5_7_9"){
    EvaluationType.items = evalTypeArray[0].unit2579; 
}else if(this.value == "/content/forms/af/staff-performance-evaluation-unit-8/staff-performance-evaluation-unit-8---public-safety"){
 
    EvaluationType.items = evalTypeArray[0].unit8;
    
}else if(this.value == "/content/forms/af/staff-performance-evaluation-unit-1/staff-performance-evaluation-unit-1---physician"){
  
    EvaluationType.items = evalTypeArray[0].unit1;
    
}else if(this.value == "/content/forms/af/staff-performance-evaluation-unit-6/staff-performance-evaluation-unit-6"){
 
    EvaluationType.items = evalTypeArray[0].unit6;
    
}else if(this.value == "/content/forms/af/staff-performance-evaluation-confidential/staff-performance-evaluation-confidential"){
  
    EvaluationType.items = evalTypeArray[0].unitconf;
 
}else{
  var itemArray = [];
  for(var i=0;i<evalTypeArray[0].unit4.length;i++){
     itemArray = (i+1)+"="+ evalTypeArray[0].unit4; 
  }
   EvaluationType.items = itemArray;
}
        }
	}
}
/**
 * @function evaluation_forms.generated_EvaluationType_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
evaluation_forms.generated_EvaluationType_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var empId = EmpId.value;
var evalType = EvaluationType.value;

$.ajax({
    type: 'GET',
    url: "/bin/getEvaluationFormData?action=GET_EVAL_PRE_SUBMISSION_DATA",
    data: {
        cwid: empId,
        evalType: evalType
    },
    dataType: 'json',

    success: function(myresponse) {
        debugger;
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];
        var gifModal = document.getElementById('gifModal');
        gifModal.style.display = "block";
        if (myresponse.length == 1) {
            DataField.value = myresponse[0].DATA;
           gifModal.style.display = "none";
        } else if (myresponse.length > 1) {
            gifModal.style.display = "none";
            modal.style.display = "block";
            var col = [];
            col.push("CWID");
            col.push("EVAL_TYPE");
            col.push("UPDATED_DT");
            col.push("SUBMISSION_ID");


            var table = document.createElement("table");
            table.id = "tb";
            var tr = table.insertRow(-1);
            var headings = ["", "Emp ID", "Evaluation Type", "Updated Date", "Submission Id"];
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

            var cancelButton = document.createElement("input");
            cancelButton.type = "button";
            cancelButton.setAttribute("class", "cancelBtn");
            cancelButton.id = "cBtn";
            cancelButton.value = "Cancel";
            cancelButton.onclick = function(event) {
                modal.style.display = "none";
            };
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
                        rButtonStatus = true;

                        DataField.value = myresponse[n].DATA;

                        break;
                    }
                }
                if (rButtonStatus === false) {
                    showErrorModal("Alert!", "Please select the correct entry");
                    modal.style.display = "block";
                } else {
                    modal.style.display = "none";
                }
            };
            var footerModal = document.getElementById("modal_footer");
            footerModal.appendChild(cancelButton);
            footerModal.appendChild(okButton);
            document.getElementById('cBtn').parentNode.removeChild(document.getElementById('cBtn'));
        } else {
          	gifModal.style.display = "none";
            showErrorModal("Alert!", "No Matching Records Found");
        }
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
                showErrorModal("Alert!", "Please select the department");
                modal.style.display = "block";
            } else {
                showErrorModal("Alert!", "Please select the department");
                modal.style.display = "block";
            }

        };


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
/**
 * @function evaluation_forms.generated_button_12474343401689577709068_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
evaluation_forms.generated_button_12474343401689577709068_click0 = function (scope) {
    with(this) {
        with(scope) {
            alert(FormName.value);
        }
	}
}
/**
 * @function evaluation_forms.generated_GenerateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
evaluation_forms.generated_GenerateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            if ((FormName.value === null) && (EmpId.value === null) && (EvaluationType.value === null)) {
    showErrorModal("Alert!", "Please fill all required fields");
} else if (DataField.value === null) {
    showErrorModal("Alert!", "Data not found");
} else {
    getPdf();
}

function getPdf() {
    console.log("in view pdf");

    window.guideBridge.getDataXML({
        success: function(result) {
            console.log("in view pdf=" + result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', FormName.value);
            jsonData.append('fileName', "Test");
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
 * @function evaluation_forms.generated_submit1688622919508_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
evaluation_forms.generated_submit1688622919508_click0 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.submit();
/*window.open("http://erpaempr65tst01:4502/content/dam/formsanddocuments/staff-performance-evaluation-2-5-7-9/staff_performance_eval_2_5_7_9/jcr:content?wcmmode=disabled&dataRef=<?xml version=\"1.0\" encoding=\"UTF-8\"?><afData><afUnboundData><data><Copy_ReviewPeriodFrom>2021-07-01</Copy_ReviewPeriodFrom><Copy_ReviewPeriodTo>2022-06-30</Copy_ReviewPeriodTo><checkData>[object Object]</checkData><CheckEvalDataExists>true</CheckEvalDataExists><workflow_initiator>rpurohit</workflow_initiator><CBIDFlag>M80</CBIDFlag><EmpIdFlag>806225686</EmpIdFlag><SubmissionId>YO0AWKP214D9</SubmissionId><evaluation1>Employee self evaluation data is not available for the current review period</evaluation1><evaluation2>Employee self evaluation data is not available for the current review period</evaluation2><evaluation3>Employee self evaluation data is not available for the current review period</evaluation3><evaluation4>Employee self evaluation data is not available for the current review period</evaluation4><evaluation5>Employee self evaluation data is not available for the current review period</evaluation5><evaluation6>Employee self evaluation data is not available for the current review period</evaluation6><evaluation7>Employee self evaluation data is not available for the current review period</evaluation7></data></afUnboundData><afBoundData><form1 xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><EmpID>806225686</EmpID><EmpRCD>1</EmpRCD><CBID>R09</CBID><Range>3</Range><StaffFirstName>Nagaraja</StaffFirstName><StaffLastName>Vadlakunta</StaffLastName><Department>IT-ERP Operating Sys and Datab</Department><Department_ID>10300</Department_ID><Classification>Analyst/Programmer 12 Mo</Classification><EvaluatorName>Ramesh   Purohit</EvaluatorName><EvaluatorsTitle>Director, ERP Tech Services</EvaluatorsTitle><ReviewPeriodFrom>2022-07-01</ReviewPeriodFrom><ReviewPeriodTo>2023-06-30</ReviewPeriodTo><EvaluationType>Temporary</EvaluationType><AthleticsEmp>2</AthleticsEmp><Staffposdesc>2</Staffposdesc><HRDIInitials/><HRDIDate/><HRDIOverallRate/><HRDIComment/><DraftDate>2023-07-06</DraftDate><customTitle/><logUser>rpurohit</logUser><StageIndicator/><termsAndCondition/><ExpiryCheckFlag/><EmpUserID>nvadlakunta</EmpUserID><ManagerUserID>rpurohit</ManagerUserID><ManagerEmailID>swathi.kumari@thoughtfocus.com</ManagerEmailID><AdminEmailID>swathi.kumari@thoughtfocus.com</AdminEmailID><quality2/><quality3/><quality4/><quality5/><Quantity1/><Quantity2/><Quantity3/><Quantity4/><Quantity5/><OC1/><OC2/><OC3/><OC4/><OC5/><ReferenceName1>Nagaraja Vadlakunta</ReferenceName1><InterpersonalSkills/><Initiative/><ServiceOrientation/><IPSkill1/><IPSkill2/><IPSkill3/><IPSkill4/><IPSkill5/><Initiative1/><Initiative2/><Initiative3/><Initiative4/><Initiative5/><SC1/><SC2/><SC3/><SC4/><SC5/><ReferenceName2>Nagaraja Vadlakunta</ReferenceName2><Adaptability/><JobKnowledge/><DependReli/><Adaptability1/><Adaptability2/><Adaptability3/><Adaptability4/><Adaptability5/><JK1/><JK2/><JK3/><JK4/><JK5/><DR1/><DR2/><DR3/><DR4/><DR5/><ReferenceName3>Nagaraja Vadlakunta</ReferenceName3><WrittenComm/><ProbSolving/><WC1/><WC2/><WC3/><WC4/><WC5/><ProbSol1/><ProbSol2/><ProbSol3/><ProbSol4/><ProbSol5/><LeadOthers1/><LeadOthers2/><LeadOthers3/><LeadOthers4/><LeadOthers5/><LeadingOthers/><Accepting/><Accepting1/><Accepting2/><Accepting3/><Accepting4/><Accepting5/><ReferenceName4>Nagaraja Vadlakunta</ReferenceName4><AthleticsImpToPos/><AddCriteriaImpToPos1/><AddCriteriaImpToPos2/><AtMeets/><AtDoesnotMeet/><AddCriteria1/><AddCriteria2/><Additional1/><Additional2/><Additional3/><Additional4/><Additional5/><Additional6/><Additional7/><Additional8/><Additional9/><Additional10/><AdditionalCriteria1/><AdditionalCriteria2/><AdditionalCriteria3/><AdditionalCriteria4/><AdditionalCriteria5/><AdditionalCriteria6/><AdditionalCriteria7/><AdditionalCriteria8/><AdditionalCriteria9/><AdditionalCriteria10/><OverallRating/><ReferenceName5>Nagaraja Vadlakunta</ReferenceName5><supportFactorComments1/><supportFactorComments2/><ReferenceName6>Nagaraja Vadlakunta</ReferenceName6><AdministratorsFullName>Joseph Luzzi</AdministratorsFullName><EvalCB/><HRCooCB/><EmpCB/><AdminCB/><VPCB/><HRDICB/><EmpSign/><EmpDate/><EmpComment/><EvaluatorNameSign/><EvaluatorSign/><EvaluatorDate/><EvaluatorComment/><AdminName/><AdminSign/><AdminDate/><AdminComment/><HRCoordinatorSign/><HRCoordinatorSignDate/><HRCoordinatorSignComment/><HrCoordId>mabadal</HrCoordId><EmpEmailID>swathi.kumari@thoughtfocus.com</EmpEmailID><AdminUserID>jluzzi</AdminUserID><HRCooName/><generatePDFStep/><sendBackStep/><initiator>Manager</initiator><HrCooFullName>Matthew Badal</HrCooFullName><divisionName>IT-Information Technology</divisionName><division>10141</division><HrCoordLname>Badal</HrCoordLname><HrCoordFname>Matthew</HrCoordFname><HrCoordEmailId>swathi.kumari@thoughtfocus.com</HrCoordEmailId><performanceGoalComment1/><performanceGoalComment2/><performanceGoalComment3/><aftiaDescCWID>Nagaraja Vadlakunta 806225686 Temporary</aftiaDescCWID><EmpName>Nagaraja Vadlakunta</EmpName><EmailSubject>Test - Staff Performance Evaluation Unit 2, 5, 7 and 9 - Completed</EmailSubject><Quality>1</Quality><Quantity/><OralComm/><quality1>1</quality1></form1></afBoundData><afSubmissionInfo><lastFocusItem>guide[0].guide1[0].guideRootPanel[0].MainPanel[0].panel_21338069921622204313035[0].employeeInformation[0].qualityQuantityOralCommunication[0].quality[0]</lastFocusItem><computedMetaInfo/><stateOverrides/><signers/></afSubmissionInfo></afData>)");

/*guideBridge.setData({
dataRef : "<?xml version=\"1.0\" encoding=\"UTF-8\"?><afData><afUnboundData><data><Copy_ReviewPeriodFrom>2021-07-01</Copy_ReviewPeriodFrom><Copy_ReviewPeriodTo>2022-06-30</Copy_ReviewPeriodTo><checkData>[object Object]</checkData><CheckEvalDataExists>true</CheckEvalDataExists><workflow_initiator>rpurohit</workflow_initiator><CBIDFlag>M80</CBIDFlag><EmpIdFlag>806225686</EmpIdFlag><SubmissionId>YO0AWKP214D9</SubmissionId><evaluation1>Employee self evaluation data is not available for the current review period</evaluation1><evaluation2>Employee self evaluation data is not available for the current review period</evaluation2><evaluation3>Employee self evaluation data is not available for the current review period</evaluation3><evaluation4>Employee self evaluation data is not available for the current review period</evaluation4><evaluation5>Employee self evaluation data is not available for the current review period</evaluation5><evaluation6>Employee self evaluation data is not available for the current review period</evaluation6><evaluation7>Employee self evaluation data is not available for the current review period</evaluation7></data></afUnboundData><afBoundData><form1 xmlns:xfa=\"http://www.xfa.org/schema/xfa-data/1.0/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><EmpID>806225686</EmpID><EmpRCD>1</EmpRCD><CBID>R09</CBID><Range>3</Range><StaffFirstName>Nagaraja</StaffFirstName><StaffLastName>Vadlakunta</StaffLastName><Department>IT-ERP Operating Sys and Datab</Department><Department_ID>10300</Department_ID><Classification>Analyst/Programmer 12 Mo</Classification><EvaluatorName>Ramesh   Purohit</EvaluatorName><EvaluatorsTitle>Director, ERP Tech Services</EvaluatorsTitle><ReviewPeriodFrom>2022-07-01</ReviewPeriodFrom><ReviewPeriodTo>2023-06-30</ReviewPeriodTo><EvaluationType>Temporary</EvaluationType><AthleticsEmp>2</AthleticsEmp><Staffposdesc>2</Staffposdesc><HRDIInitials/><HRDIDate/><HRDIOverallRate/><HRDIComment/><DraftDate>2023-07-06</DraftDate><customTitle/><logUser>rpurohit</logUser><StageIndicator/><termsAndCondition/><ExpiryCheckFlag/><EmpUserID>nvadlakunta</EmpUserID><ManagerUserID>rpurohit</ManagerUserID><ManagerEmailID>swathi.kumari@thoughtfocus.com</ManagerEmailID><AdminEmailID>swathi.kumari@thoughtfocus.com</AdminEmailID><quality2/><quality3/><quality4/><quality5/><Quantity1/><Quantity2/><Quantity3/><Quantity4/><Quantity5/><OC1/><OC2/><OC3/><OC4/><OC5/><ReferenceName1>Nagaraja Vadlakunta</ReferenceName1><InterpersonalSkills/><Initiative/><ServiceOrientation/><IPSkill1/><IPSkill2/><IPSkill3/><IPSkill4/><IPSkill5/><Initiative1/><Initiative2/><Initiative3/><Initiative4/><Initiative5/><SC1/><SC2/><SC3/><SC4/><SC5/><ReferenceName2>Nagaraja Vadlakunta</ReferenceName2><Adaptability/><JobKnowledge/><DependReli/><Adaptability1/><Adaptability2/><Adaptability3/><Adaptability4/><Adaptability5/><JK1/><JK2/><JK3/><JK4/><JK5/><DR1/><DR2/><DR3/><DR4/><DR5/><ReferenceName3>Nagaraja Vadlakunta</ReferenceName3><WrittenComm/><ProbSolving/><WC1/><WC2/><WC3/><WC4/><WC5/><ProbSol1/><ProbSol2/><ProbSol3/><ProbSol4/><ProbSol5/><LeadOthers1/><LeadOthers2/><LeadOthers3/><LeadOthers4/><LeadOthers5/><LeadingOthers/><Accepting/><Accepting1/><Accepting2/><Accepting3/><Accepting4/><Accepting5/><ReferenceName4>Nagaraja Vadlakunta</ReferenceName4><AthleticsImpToPos/><AddCriteriaImpToPos1/><AddCriteriaImpToPos2/><AtMeets/><AtDoesnotMeet/><AddCriteria1/><AddCriteria2/><Additional1/><Additional2/><Additional3/><Additional4/><Additional5/><Additional6/><Additional7/><Additional8/><Additional9/><Additional10/><AdditionalCriteria1/><AdditionalCriteria2/><AdditionalCriteria3/><AdditionalCriteria4/><AdditionalCriteria5/><AdditionalCriteria6/><AdditionalCriteria7/><AdditionalCriteria8/><AdditionalCriteria9/><AdditionalCriteria10/><OverallRating/><ReferenceName5>Nagaraja Vadlakunta</ReferenceName5><supportFactorComments1/><supportFactorComments2/><ReferenceName6>Nagaraja Vadlakunta</ReferenceName6><AdministratorsFullName>Joseph Luzzi</AdministratorsFullName><EvalCB/><HRCooCB/><EmpCB/><AdminCB/><VPCB/><HRDICB/><EmpSign/><EmpDate/><EmpComment/><EvaluatorNameSign/><EvaluatorSign/><EvaluatorDate/><EvaluatorComment/><AdminName/><AdminSign/><AdminDate/><AdminComment/><HRCoordinatorSign/><HRCoordinatorSignDate/><HRCoordinatorSignComment/><HrCoordId>mabadal</HrCoordId><EmpEmailID>swathi.kumari@thoughtfocus.com</EmpEmailID><AdminUserID>jluzzi</AdminUserID><HRCooName/><generatePDFStep/><sendBackStep/><initiator>Manager</initiator><HrCooFullName>Matthew Badal</HrCooFullName><divisionName>IT-Information Technology</divisionName><division>10141</division><HrCoordLname>Badal</HrCoordLname><HrCoordFname>Matthew</HrCoordFname><HrCoordEmailId>swathi.kumari@thoughtfocus.com</HrCoordEmailId><performanceGoalComment1/><performanceGoalComment2/><performanceGoalComment3/><aftiaDescCWID>Nagaraja Vadlakunta 806225686 Temporary</aftiaDescCWID><EmpName>Nagaraja Vadlakunta</EmpName><EmailSubject>Test - Staff Performance Evaluation Unit 2, 5, 7 and 9 - Completed</EmailSubject><Quality>1</Quality><Quantity/><OralComm/><quality1>1</quality1></form1></afBoundData><afSubmissionInfo><lastFocusItem>guide[0].guide1[0].guideRootPanel[0].MainPanel[0].panel_21338069921622204313035[0].employeeInformation[0].qualityQuantityOralCommunication[0].quality[0]</lastFocusItem><computedMetaInfo/><stateOverrides/><signers/></afSubmissionInfo></afData>",
error:function(guideResultObject){
console.log("error");
}
});*/

        }
	}
}
