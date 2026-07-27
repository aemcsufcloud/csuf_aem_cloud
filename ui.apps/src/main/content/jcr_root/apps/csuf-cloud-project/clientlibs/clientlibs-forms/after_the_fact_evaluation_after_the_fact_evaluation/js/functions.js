/**
 * @function after_the_fact_evaluation_after_the_fact_evaluation.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
after_the_fact_evaluation_after_the_fact_evaluation.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToFaculty") {
     CWID.enabled = false;
    FacultyName.enabled = false;
    College.enabled = false;
    TimeReason.enabled = false;
    Term.enabled = false;
    WTUPerTerm.enabled = false;
    BriefAssignment.enabled = false;
    if (DepartmentChairSignatureCB.value == "1") {
        DepartmentChairSignaturePanel.enabled = false;
    } else {
        DepartmentChairSignaturePanel.visible = false;
    }
} else if (StageIndicator.value == "ToChair") {
   CWID.enabled = false;
    FacultyName.enabled = false;
    College.enabled = false;
    TimeReason.enabled = false;
    Term.enabled = false;
    WTUPerTerm.enabled = false;
    BriefAssignment.enabled = false; 
   AfterTheFactStatus.enabled = false;
  AfterTheFactEvaluation.enabled = false;
    FacultySignaturePanel.enabled = false;
} 
        }
	}
}
/**
 * @function after_the_fact_evaluation_after_the_fact_evaluation.generated_FacultySignatureCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
after_the_fact_evaluation_after_the_fact_evaluation.generated_FacultySignatureCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToFaculty") {
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				FacultySignatureName.value = userValue;
				FacultySignature.value = userValue;
				FacultySignDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
	} else {
		FacultySignatureName.value = "";
		FacultySignature.value = "";
		FacultySignDate.value = "";
	}
}
        }
	}
}
/**
 * @function after_the_fact_evaluation_after_the_fact_evaluation.generated_FacultySignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
after_the_fact_evaluation_after_the_fact_evaluation.generated_FacultySignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function after_the_fact_evaluation_after_the_fact_evaluation.generated_FacultySignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
after_the_fact_evaluation_after_the_fact_evaluation.generated_FacultySignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function after_the_fact_evaluation_after_the_fact_evaluation.generated_DepartmentChairSignatureCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
after_the_fact_evaluation_after_the_fact_evaluation.generated_DepartmentChairSignatureCB_valueCommit0 = function (scope) {
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
				ChairSignatureName.value = userValue;
				ChairSignature.value = userValue;
				ChairSignDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
	} else {
		ChairSignatureName.value = "";
		ChairSignature.value = "";
		ChairSignDate.value = "";
	}
}
        }
	}
}
/**
 * @function after_the_fact_evaluation_after_the_fact_evaluation.generated_ChairSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
after_the_fact_evaluation_after_the_fact_evaluation.generated_ChairSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function after_the_fact_evaluation_after_the_fact_evaluation.generated_ChairSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
after_the_fact_evaluation_after_the_fact_evaluation.generated_ChairSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function after_the_fact_evaluation_after_the_fact_evaluation.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
after_the_fact_evaluation_after_the_fact_evaluation.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            
     getPdf();


function getPdf() {
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            console.log("xml=" + result.data);
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/after-the-fact-evaluation/after-the-fact-evaluation');
            //jsonData.append('fileName', FirstName.value + "_" + LastName.value + "(" + EmplId.value + ")" + "_" + Date.now());
            jsonData.append('fileName', "After the Fact Evaluation");
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
            setFundSourceOptions();
			};
        },
        error: function(guideResultObject) {
            console.log("got error");
        },
        guideState: null,
        boundData: true
    });
}
function setFundSourceOptions(){
  for (k = 0; k < count; k++) {
            var fundPrgResult = JSON.parse(FundSourceData.value);
			if(fundPrgResult[0].CLASS_CODE.length !== 0){
            var classResult = [];
            for (var i = 0; i < fundPrgResult[0].CLASS_CODE.length; i++) {
				classResult.push(fundPrgResult[0].CLASS_CODE[i].CLASS);
            }
			FundDetails.instanceManager.instances[k].Class.items = classResult; 
            }
            if(fundPrgResult[0].FUND.length !== 0){
            var fundResult = [];
            for (var f = 0; f < fundPrgResult[0].FUND.length; f++) {              	
				fundResult.push(fundPrgResult[0].FUND[f].FUND_CODE);                
            }
			FundDetails.instanceManager.instances[k].Fund.items = fundResult; 
            }
            if(fundPrgResult[0].PROGRAM.length !== 0){
            var programResult = [];
            for (var p = 0; p < fundPrgResult[0].PROGRAM.length; p++) {
				programResult.push(fundPrgResult[0].PROGRAM[p].PROGRAM);
            }
			FundDetails.instanceManager.instances[k].Program.items = programResult; 
            }
            if(fundPrgResult[0].DEPT.length !== 0){
            var deptResult = [];
            for (var d = 0; d < fundPrgResult[0].DEPT.length; d++) {              	
				deptResult.push(fundPrgResult[0].DEPT[d].DEPTID);                
            }
			FundDetails.instanceManager.instances[k].FundDeptID.items = deptResult; 
            }	
            }
}
        }
	}
}
