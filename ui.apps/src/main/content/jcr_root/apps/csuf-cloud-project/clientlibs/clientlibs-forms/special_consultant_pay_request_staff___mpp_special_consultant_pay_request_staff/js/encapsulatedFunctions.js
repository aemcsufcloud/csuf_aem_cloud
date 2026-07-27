
//Do not change this file.
var special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff = window.special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff = window.special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff || {};
/**
 * @function special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_TotalDue_calc0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 * @returns {string}
 */
special_consultant_pay_request_staff___mpp_special_consultant_pay_request_staff.generated_TotalDue_calc0 = function (scope) {
    with(this) {
        with(scope) {
            var code = "if(AmtPerDay.value !== \"\" && NoPayDays.value !== \"\"){\nvar amtPerDay = AmtPerDay.value;\nvar noOfDays = NoPayDays.value;\n  debugger;\namtPerDay=(amtPerDay.replace(',',\"\"));\nvar totalVal = parseFloat(amtPerDay)*(noOfDays);\nthis.value=totalVal;\n}\n";
            return eval(code);
        }
	}
}
