/**
 * @function json_to_csv_converter_json_to_csv_converter_form.generated_button1688125094091_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
json_to_csv_converter_json_to_csv_converter_form.generated_button1688125094091_click0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;

 $.ajax({
        type: 'GET',
        url: "/bin/getTestAllWorkitems",
        data: {
            TYPE: type.value,
        },
        dataType: 'json',
        success: function(response) {
          var data = {};
          data.sheet = response;
          generateAsExcel(data);
        }
 });




/*



var rowcount = table.Row1.instanceManager.instanceCount;
var sheet = [];
for (k = 0; k < rowcount; k++) {
    sheet[k] = {};
    sheet[k].Emp_ID = table.Row1.instanceManager.instances[k].Emp_ID.value;
    sheet[k].HR_Dept_ID = table.Row1.instanceManager.instances[k].HRDeptID.value;
    sheet[k].Position_Number = table.Row1.instanceManager.instances[k].PositionNo.value;
    sheet[k].Emp_Name = table.Row1.instanceManager.instances[k].Emp_Name.value;
    sheet[k].Empl_Record = table.Row1.instanceManager.instances[k].Emp_Record.value;
    sheet[k].Charge_Period = table.Row1.instanceManager.instances[k].ChargePeriod.value;
    sheet[k].Check = table.Row1.instanceManager.instances[k].PaycheckNo.value;
    sheet[k].Total_Amount = table.Row1.instanceManager.instances[k].TotalAmtChanged.value;
    sheet[k].Transfer_Percent = table.Row1.instanceManager.instances[k].TransferPercentage.value;
    sheet[k].Transfer_Amount = table.Row1.instanceManager.instances[k].TransferAmt.value;
    sheet[k].Credit_Dept = table.Row1.instanceManager.instances[k].Credit_Dept.value;
    sheet[k].Credit_Fund = table.Row1.instanceManager.instances[k].Credit_Funds.value;
    sheet[k].Credit_Class = table.Row1.instanceManager.instances[k].Credit_Class.value;
    sheet[k].Credit_Project = table.Row1.instanceManager.instances[k].Credit_Project.value;
    sheet[k].Credit_Program = table.Row1.instanceManager.instances[k].Credit_Program.value;
    sheet[k].Credit_Account = table.Row1.instanceManager.instances[k].Credit_Account.value;
    sheet[k].Debit_Dept = table.Row1.instanceManager.instances[k].Debit_Dept.value;
    sheet[k].Debit_Funds = table.Row1.instanceManager.instances[k].Debit_Funds.value;
    sheet[k].Debit_Class = table.Row1.instanceManager.instances[k].Debit_Class.value;
    sheet[k].Debit_Project = table.Row1.instanceManager.instances[k].Debit_Project.value;
    sheet[k].Debit_Account = table.Row1.instanceManager.instances[k].Debit_Account.value;
    sheet[k].Debit_Program = table.Row1.instanceManager.instances[k].Debit_Program.value;
    if (table.Row1.instanceManager.instances[k].PermanentFundChange.value == "0") {
        sheet[k].Change = "Y";
    }
    if (table.Row1.instanceManager.instances[k].PermanentFundChange.value == "1") {
        sheet[k].Change = "N";
    }

    sheet[k].Transfer_Amount_Benefits = table.Row1.instanceManager.instances[k].TransferAmt_Benefits.value;
}
var data = {};
data.sheet = sheet;
generateAsExcel(data);*/




function generateAsExcel(data) {
    try {
        const workbook = XLSX.utils.book_new();

        for (let key in data) {
            const worksheet = XLSX.utils.json_to_sheet(data[key]);
            XLSX.utils.book_append_sheet(workbook, worksheet, key);
        }

        let res = XLSX.write(workbook, {
            type: "array"
        });
        console.log(res);

        const blob = new Blob([res], {
            type: "application/vnd.ms-excel"
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "test.xls";
        link.click();
    } catch (err) {
        console.log("Error:", err);
    }
}
        }
	}
}
