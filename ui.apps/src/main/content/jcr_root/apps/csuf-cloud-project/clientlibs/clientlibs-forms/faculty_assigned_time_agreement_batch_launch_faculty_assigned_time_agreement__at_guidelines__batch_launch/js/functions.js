/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            $.ajax({
    type: 'GET',
    url: "/bin/getAllLoggedInUserDetailsLookup",
    dataType: 'json',
    success: function(myresponse) {
        if (myresponse.length > 0) {
            if ((myresponse[0].USERID !== null) && (myresponse[0].USERID !== undefined)) {
                var firstName = myresponse[0].FIRSTNAME;
                var lastName = myresponse[0].LASTNAME;
                var userId = myresponse[0].USERID;
                InitiatorFirstName.value = firstName;
                InitiatorLastName.value = lastName;
                InitiatorName.value = firstName + " " + lastName;
                InitiatorCwid.value = myresponse[0].EMPLOYEEID;
                InitiatorUserId.value = userId;
                workflow_initiator.value = userId;
                //InitiatorEmailId.value = myresponse[0].EMAILID;
                InitiatorEmailId.value = "yjayaram@fullerton.edu";
            }
        } else {
            showErrorModal("Alert !", "No matching records found");
        }
    }
});
        }
	}
}
/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_UploadButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_UploadButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            var fileUpload = document.getElementById("fileUpload");debugger;

if(fileUpload.files[0] !== undefined){
  var extension = fileUpload.files[0].name.split('.').pop();
if(extension == "xlsx" || extension == "xls"){
debugger;
var reader = new FileReader();
if (typeof(FileReader) != "undefined") {
    var reader = new FileReader();

    //For Browsers other than IE.
    if (reader.readAsBinaryString) {
        reader.onload = function(e) {
            //console.log(e.target.result);
            ProcessExcel(e.target.result);
        };
        reader.readAsBinaryString(fileUpload.files[0]);
    }
}}else{
  showErrorModal("Alert!","Please select the valid file");
}}else{
  showErrorModal("Alert!","Please select the file");
}

function ProcessExcel(data) {
    debugger;
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    ParseExcelRows(excelRows);

}

function ParseExcelRows(myresponse) {
    debugger;
    var count = Row1.instanceManager.instanceCount;

        var gifModal = document.getElementById('gifModal');
        gifModal.style.display = "block";
        debugger;

        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];

        debugger;
        if (myresponse.length > 0) {
          var rowcountRemoveAll1 = Row1.instanceManager.instanceCount;
          for (k = 0; k < rowcountRemoveAll1; k++) {
        Row1.instanceManager.removeInstance(Row1.instanceIndex);
         }
        Row1.instanceManager.removeInstance((Row1.instanceManager.instanceCount) - 1);
            for (var i = 0; i < myresponse.length; i++) {
                     if (Row1.instanceManager.instances[Row1.instanceManager.instanceCount - 1].Cwid.value !== null) {
                    Row1.instanceManager.addInstance(true);
                }
                                

                Row1.instanceManager.instances[i].Cwid.value = myresponse[i].CWID;
                Row1.instanceManager.instances[i].FacultyName.value = myresponse[i].FULL_NAME;
                Row1.instanceManager.instances[i].FacultyEmail.value = myresponse[i].EMAIL;
                Row1.instanceManager.instances[i].DeptId.value = myresponse[i].DEPT_ID;
                Row1.instanceManager.instances[i].Department.value = myresponse[i].DEPARTMENT;
                Row1.instanceManager.instances[i].College.value = myresponse[i].COLLEGE;
                Row1.instanceManager.instances[i].StartTerm.value = myresponse[i].START_TERM;
                Row1.instanceManager.instances[i].EndTerm.value = myresponse[i].END_TERM;
                Row1.instanceManager.instances[i].WTUUnits.value = myresponse[i].WTU;
                Row1.instanceManager.instances[i].TimeReasons.value = myresponse[i].TIME_REASON;
                Row1.instanceManager.instances[i].BriefDescription.value = myresponse[i].BRIEF_ASSIGNMENT;
                Row1.instanceManager.instances[i].ChairName.value = myresponse[i].DEPT_CHAIR_NAME;
                Row1.instanceManager.instances[i].ChairEmail.value = myresponse[i].DEPT_CHAIR_EMAIL;
                Row1.instanceManager.instances[i].AlternateApproverName.value = myresponse[i].ALTERNATE_APPROVER_NAME;
                Row1.instanceManager.instances[i].AlternateApproverDept.value = myresponse[i].ALTERNATE_APPROVER_DEPT;
                Row1.instanceManager.instances[i].AlternateApproverEmail.value = myresponse[i].ALTERNATE_APPROVER_EMAIL;

                gifModal.style.display = "none";
              ValidatedRowCount.value = ""; 
              SubmitRowCount.value = "";
              ValidationStatus.value = "";
                
            }

        } else {
            showErrorModal("Alert!", "No matching records found");
        }
    

}

        }
	}
}
/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_Cwid_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_Cwid_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(ValidationStatus.value == "SUCCESS"){
  ValidationStatus.value = "";
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_DeptId_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_DeptId_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(ValidationStatus.value == "SUCCESS"){
  ValidationStatus.value = "";
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_StartTerm_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_StartTerm_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(ValidationStatus.value == "SUCCESS"){
  ValidationStatus.value = "";
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_EndTerm_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_EndTerm_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(ValidationStatus.value == "SUCCESS"){
  ValidationStatus.value = "";
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_TimeReasons_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_TimeReasons_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(ValidationStatus.value == "SUCCESS"){
  ValidationStatus.value = "";
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_ChairEmail_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_ChairEmail_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(ValidationStatus.value == "SUCCESS"){
  ValidationStatus.value = "";
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_AlternateApproverEmail_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_AlternateApproverEmail_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(ValidationStatus.value == "SUCCESS"){
  ValidationStatus.value = "";
}
        }
	}
}
/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_Add_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_Add_click0 = function (scope) {
    with(this) {
        with(scope) {
            Row1.instanceManager.addInstance();
        }
	}
}
/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_Remove_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_Remove_click0 = function (scope) {
    with(this) {
        with(scope) {
             var rowCount = Row1.instanceManager.instanceCount;
Row1.instanceManager.removeInstance(rowCount - 1);
        }
	}
}
/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_InitiatedDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_InitiatedDate_init0 = function (scope) {
    with(this) {
        with(scope) {
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
/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_Validate_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_Validate_click0 = function (scope) {
    with(this) {
        with(scope) {
            //new
debugger;
var rowcount = Row1.instanceManager.instanceCount;
var arr = [];
 if(Row1.instanceManager.instances[0].Cwid.value !== null){
   ValidatedRowCount.value = rowcount;
for (var i = 0; i < rowcount; i++) {
	arr[i] = {};
    arr[i].Cwid = Row1.instanceManager.instances[i].Cwid.value;
	//arr[i].Name = Row1.instanceManager.instances[i].FacultyName.value;
	//arr[i].Email = Row1.instanceManager.instances[i].FacultyEmail.value;
	arr[i].DeptId = Row1.instanceManager.instances[i].DeptId.value;
	//arr[i].Department = Row1.instanceManager.instances[i].Department.value;
	//arr[i].College = Row1.instanceManager.instances[i].College.value;
	arr[i].StartTerm = Row1.instanceManager.instances[i].StartTerm.value;
	arr[i].EndTerm = Row1.instanceManager.instances[i].EndTerm.value;
	//arr[i].WTUUnits = Row1.instanceManager.instances[i].WTUUnits.value;
	arr[i].TimeReasons = Row1.instanceManager.instances[i].TimeReasons.value;
	arr[i].BriefDescription = Row1.instanceManager.instances[i].BriefDescription.value;
	//arr[i].ChairName = Row1.instanceManager.instances[i].ChairName.value;
	arr[i].ChairEmail = Row1.instanceManager.instances[i].ChairEmail.value;
	//arr[i].AlternateApproverName = Row1.instanceManager.instances[i].AlternateApproverName.value;
	//arr[i].AlternateApproverDept = Row1.instanceManager.instances[i].AlternateApproverDept.value;
	if(Row1.instanceManager.instances[i].AlternateApproverEmail.value !== null){
	arr[i].AlternateApproverEmail = Row1.instanceManager.instances[i].AlternateApproverEmail.value;
      }
}
var data = JSON.stringify(arr);
validateData(data);
 }else{
   showErrorModal("Alert!", "Please enter data before clicking validate"); 
 }

debugger;

function validateData(data){
  var arrayofInvalidItems = [];
 
  $.ajax({
   type: 'GET',
		url: "/bin/facultyAssignedBatchLaunchServlet",
		data: {
			jsonArrayData: data,
			action: "VALIDATE_BATCH_LAUNCH_FACULTY_AGREEMENT_DATA"
		},
		dataType: 'json',
    success: function(myresponse) {
      debugger;
      if(myresponse.length>=1){
        for(var j=0; j<myresponse.length; j++){
          if(myresponse[j].Status == "Failed"){
        arrayofInvalidItems.push(myresponse[j]);
    }
        }
        if(arrayofInvalidItems.length>=1){
           ValidationStatus.value = "FAILED";
          invokeInvalidDetailsPopup(arrayofInvalidItems);
        }else{
          showErrorModal("Message", "Validation Successful");
          ValidationStatus.value = "SUCCESS";
        }
      }
    }
  });

}

function invokeInvalidDetailsPopup(arrayData){
  
  var modal = document.getElementById('gridErrorModal');
  var span = document.getElementsByClassName("close")[0];
   gifModal.style.display = "none";
        modal.style.display = "block";
        var col = [];
        col.push("Cwid");
        col.push("DeptId");
        col.push("BriefDesc");
        col.push("fields");
        var table = document.createElement("table");
        table.id = "tb";
        var tr = table.insertRow(-1);
        var headings = ["Cwid", "Dept Id", "Brief Description", "Fields"];
        for (var j = 0; j < headings.length; j++) {
            var th = document.createElement("th");
            th.innerHTML = headings[j];
            tr.appendChild(th);
            th.style.fontSize = "16px";
        }
        for (var k = 0; k < arrayData.length; k++) {
            tr = table.insertRow(-1);
            for (var l = 0; l < col.length; l++) {
                var tabCell = tr.insertCell(-1);
                tabCell.style.color = "black";
                tabCell.style.fontSize = "14px";
                tabCell.innerHTML = arrayData[k][col[l]];
            }
        }
        var divContainer = document.getElementById("gridShowData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        var footerModal = document.getElementById("gridModal_footer");
        var okButton = document.createElement("input");
        okButton.type = "button";
        okButton.setAttribute("class", "okBtn");
        okButton.value = "OK";
        span.onclick = function() {
            modal.style.display = "none";
    };
       okButton.onclick = function(event) {
            var n;
            var rButtonStatus;
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
                showErrorModal("Alert!", " ");
                modal.style.display = "block";
            } else {
                modal.style.display = "none";
            }
        };
        footerModal.appendChild(okButton);
        return false;
  
}


        }
	}
}
/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
  aftiaDescCWID.value = InitiatorName.value+" "+InitiatorCwid.value;
var rowCount = Row1.instanceManager.instanceCount;
RecordsCount.value = rowCount;
SubmitRowCount.value = rowCount;
InitiatorEmailId.value = "yjayaram@fullerton.edu";




if(ValidationStatus.value != "SUCCESS"){
   showErrorModal("Alert!", "Please Validate data by clicking Validate button then submit"); 
}else if((SubmitRowCount.value == ValidatedRowCount.value) && (ValidationStatus.value == "SUCCESS")){
   guideBridge.submit(); 
}


        }
	}
}
/**
 * @function faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated__click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
faculty_assigned_time_agreement_batch_launch_faculty_assigned_time_agreement__at_guidelines__batch_launch.generated__click0 = function (scope) {
    with(this) {
        with(scope) {
            //new
debugger;
var rowcount = Row1.instanceManager.instanceCount;
var arr = [];
for (var i = 0; i < rowcount; i++) {
	arr[i] = {};
    arr[i].Cwid = Row1.instanceManager.instances[i].Cwid.value;
	//arr[i].Name = Row1.instanceManager.instances[i].Name.value;
	//arr[i].Email = Row1.instanceManager.instances[i].Email.value;
	arr[i].DeptId = Row1.instanceManager.instances[i].DeptId.value;
	//arr[i].Department = Row1.instanceManager.instances[i].Department.value;
	//arr[i].College = Row1.instanceManager.instances[i].College.value;
	arr[i].StartTerm = Row1.instanceManager.instances[i].StartTerm.value;
	arr[i].EndTerm = Row1.instanceManager.instances[i].EndTerm.value;
	//arr[i].WTUUnits = Row1.instanceManager.instances[i].WTUUnits.value;
	arr[i].TimeReasons = Row1.instanceManager.instances[i].TimeReasons.value;
	arr[i].BriefDescription = Row1.instanceManager.instances[i].BriefDescription.value;
	//arr[i].ChairName = Row1.instanceManager.instances[i].ChairName.value;
	//arr[i].ChairEmail = Row1.instanceManager.instances[i].ChairEmail.value;
	//arr[i].AlternateApproverName = Row1.instanceManager.instances[i].AlternateApproverName.value;
	//arr[i].AlternateApproverDept = Row1.instanceManager.instances[i].AlternateApproverDept.value;
	//arr[i].AlternateApproverEmail = Row1.instanceManager.instances[i].AlternateApproverEmail.value;
}
console.log(arr);
var data = JSON.stringify(arr);
validateData(data);
debugger;

function validateData(data){
  $.ajax({
   type: 'GET',
		url: "/bin/facultyAssignedBatchLaunchServlet",
		data: {
			jsonArrayData: data,
			action: "VALIDATE_BATCH_LAUNCH_FACULTY_AGREEMENT_DATA"
		},
		dataType: 'json',
    success: function(myresponse) {
      if(myresponse.length>=1){
        console.log(myresponse);
      }
    }
  });
}


/*function validateData(data) {
	$.ajax({
		type: 'GET',
		url: "/bin/petServlet",
		data: {
			jsonArray: data,
			action: "VALIDATE_PET_DATA"
		},
		dataType: 'json',
		success: function(myresponse) {
			debugger;
			if (myresponse.length !== 0) {

				for (var k = 0; k < myresponse.length; k++) {
					var basic = myresponse[k][k].split(',')[0].split(':')[1];
					var combo = myresponse[k][k].split(',')[1].split(':')[1];
					if (basic == "Invalid") {
						showErrorModal("Alert!", "Invalid basic details");
						ValidateFlag.value = false;
						break;
					} else if (combo == "Invalid") {
						showErrorModal("Alert!", "Invalid combo code details");
						ValidateFlag.value = false;
						break;
					} else {
						ValidateFlag.value = true;
					}


				}
				debugger;
				if (ValidateFlag.value === "true") {
					var returnedValue = validateAmount(data);
					if (returnedValue === true) {
						ValidateFlag.value = true;
						showErrorModal("Alert!", "Validated transfer data successfully");
					} else {
						ValidateFlag.value = false;
						showErrorModal("Alert!", "Validation unsuccessfull");
					}
				}

			} else {
				showErrorModal("Alert!", "Something went wrong! please try again");
			}
		}
	});
} */

/*function validateAmount(response) {
    var valFlag = true;
	debugger;
	response = JSON.parse(response);
	var totalCount = 0;
	var employeeIds;
	var chargePeriods;
	var checkNumbers;
	var employeeIdsArr = [];
	var chargePeriodsArr = [];
	var checkNumbersArr = [];
	var entries = [];
	var modal = document.getElementById('gridErrorModal');
	if (response.length > 0) {
		debugger;
		for (var y = 0; y < response.length; y++) {
			var id = response[y].Empl_ID;
			var chargePeriod = response[y].Charge_Period;
			var checkNumber = response[y].Check;
          if(response[y].Transfer_Percent !== null){
			var percentage = (response[y].Transfer_Percent).replaceAll("%", "");
			var percentageCount = 0;
			for (var z = 0; z < response.length; z++) {
				if (id == response[z].Empl_ID && chargePeriod == response[z].Charge_Period && checkNumber == response[z].Check) {
					percentageCount = percentageCount + parseFloat((response[z].Transfer_Percent).replaceAll("%", ""));
					if (percentageCount == 100.00) {
						totalCount = totalCount + parseInt(1);
					} else {
						var entry = {
							"id": id,
							"chargePeriod": chargePeriod,
							"checkNumber": checkNumber,
							"percentage": percentage
						};
						entries.push(entry);

						jsonObject = entries.map(JSON.stringify);
						uniqueSet = new Set(jsonObject);
						uniqueArray = Array.from(uniqueSet).map(JSON.parse);
					}
				}
			}
            }else{
             showErrorModal("Alert!","Please enter the transfer percentage");
              valFlag = false;
              break;
        }
		}
	
  debugger;
	if (totalCount == response.length) {
		return true;
	} else {


		gifModal.style.display = "none";
		//modal.style.display = "block";
		var col = [];
		col.push("id");
		col.push("chargePeriod");
		col.push("checkNumber");
		col.push("percentage");



		var table = document.createElement("table");
		table.id = "tb";
		var tr = table.insertRow(-1);
		var headings = ["Emp ID", "Charge Period", "Check Number", "Percentage"];
		for (var j = 0; j < headings.length; j++) {
			var th = document.createElement("th");
			th.innerHTML = headings[j];
			tr.appendChild(th);
			th.style.fontSize = "12px";
		}
		for (var k = 0; k < uniqueArray.length; k++) {
			tr = table.insertRow(-1);

			for (var l = 0; l < col.length; l++) {
				var tabCell = tr.insertCell(-1);
				tabCell.style.color = "black";
				tabCell.style.fontSize = "12px";
				tabCell.innerHTML = uniqueArray[k][col[l]];
			}
		}
		var divContainer = document.getElementById("gridShowData");
		divContainer.innerHTML = "";
		divContainer.appendChild(table);



		var footerModal = document.getElementById("gridModal_footer");
		var okButton = document.createElement("input");
		okButton.type = "button";
		okButton.setAttribute("class", "okBtn");
		//okButton.id = "okBtn";
		okButton.value = "OK";
		okButton.onclick = function(event) {



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
			if (rButtonStatus === false && valFlag === true) {
				showErrorModal("Alert!", "Below entries is not balanced. Please balance it and validate");
				modal.style.display = "block";
			} else {



				modal.style.display = "none";
			}
		};
		footerModal.appendChild(okButton);

		return false;
       
	}
}
} */
        }
	}
}
