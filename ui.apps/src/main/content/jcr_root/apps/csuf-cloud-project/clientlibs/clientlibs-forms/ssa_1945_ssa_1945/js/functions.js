/**
 * @function ssa_1945_ssa_1945.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
ssa_1945_ssa_1945.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            var userID = "rpurohit";
  
    $.ajax({
        type: 'GET',
        url: "/bin/getCatastrophicLeaveRequest",
        data: {
            //cwid: cwid123,
            userID: userID
        },
        dataType: 'json',
        success: function(myresopnse) {
            // debugger;
           // var modal = document.getElementById('myModal');
            //var span = document.getElementsByClassName("close")[0];
            debugger;
            if (myresopnse.length === 1) {
              
          
                debugger;
                DepartmentName.value = myresopnse[0].DEPTNAME;
                EMPLRCD.value = myresopnse[0].EMPL_RCD;
                BargainingUnit.value = myresopnse[0].UNION_CD;
                DepartmentID.value = myresopnse[0].DEPTID;
                LastName.value = myresopnse[0].LAST_NAME;
                FirstName.value = myresopnse[0].FIRST_NAME;
                EMPLID.value = myresopnse[0].EMPLID;
                
            }
        }
    });
          
        }
	}
}
/**
 * @function ssa_1945_ssa_1945.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
ssa_1945_ssa_1945.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
             var gifModal = document.getElementById('gifModal');
gifModal.sytle.display = "none";
        }
	}
}
/**
 * @function ssa_1945_ssa_1945.generated_textdraw1575095828043_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
ssa_1945_ssa_1945.generated_textdraw1575095828043_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible= false;
        }
	}
}
/**
 * @function ssa_1945_ssa_1945.generated_Campus_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
ssa_1945_ssa_1945.generated_Campus_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function ssa_1945_ssa_1945.generated_panel1587123018548_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
ssa_1945_ssa_1945.generated_panel1587123018548_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function ssa_1945_ssa_1945.generated_logUser_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
ssa_1945_ssa_1945.generated_logUser_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible= false;
        }
	}
}
/**
 * @function ssa_1945_ssa_1945.generated_FTE_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
ssa_1945_ssa_1945.generated_FTE_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var fteValue = this.value;
var curFTSalVal = CurrentFTMonthlySalary.value;
var result = curFTSalVal/fteValue;

CurrentActualSalary.value =result;
        }
	}
}
/**
 * @function ssa_1945_ssa_1945.generated_checkbox1600430640390_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
ssa_1945_ssa_1945.generated_checkbox1600430640390_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value == 1) {
    
        var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        SignDate.value = d;
        SignDate.enabled = false;
         $.ajax({

                type: 'GET',

                url: "/bin/getLoggedUserDetails",
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse.userName;
                    SignOfEmp.value = userValue;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
        SignOfEmp.enabled = false;
        
    
} else {
    SignOfEmp.value = "";
    SignDate.value = "";
   
}
        }
	}
}
/**
 * @function ssa_1945_ssa_1945.generated_SignOfEmp_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
ssa_1945_ssa_1945.generated_SignOfEmp_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function ssa_1945_ssa_1945.generated_SignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
ssa_1945_ssa_1945.generated_SignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function ssa_1945_ssa_1945.generated_CampusName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
ssa_1945_ssa_1945.generated_CampusName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function ssa_1945_ssa_1945.generated_logUser_init00
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
ssa_1945_ssa_1945.generated_logUser_init00 = function (scope) {
    with(this) {
        with(scope) {
            logUser.visible = false;

$.ajax({

type: 'GET', 

url:"/bin/getLoggedUserId",
dataType: 'json',
success: function(myresopnse){
  var userValue=myresopnse.userId;
  logUser.value = userValue;
  
},
  error: function(error){
alert("error block="+error);
}
});

        }
	}
}
/**
 * @function ssa_1945_ssa_1945.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
ssa_1945_ssa_1945.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            var submitFlag = 0;


if (SSN.value !== null && FirstName.value !== null && LastName !== null) {
  submitFlag=0;
      
 } else{
   
   var modal = document.getElementById("errorPopup");
       var para = document.getElementById("para");
    para.innerHTML = "";
    para.innerHTML = "Please Enter Employee ID, First Name, Last Name";
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


if( submitFlag === 0){
  getPdf();
}

  

function getPdf() {
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/ssa-1945/ssa-1945');
            jsonData.append('fileName', FirstName.value + "_" + LastName.value + "(" + SSN.value + ")" + "_" + Date.now());          
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
 * @function ssa_1945_ssa_1945.generated_saveguidedraft1600257145240_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
ssa_1945_ssa_1945.generated_saveguidedraft1600257145240_click0 = function (scope) {
    with(this) {
        with(scope) {
            aftiaDescCWID.value = (FirstName.value + " " + LastName.value + " " + SSN.value);

handleDraftSave(this);


        }
	}
}
