
//Do not change this file.
var special_consultant_pay_request_faculty_special_consultant_pay_request_faculty = window.special_consultant_pay_request_faculty_special_consultant_pay_request_faculty = window.special_consultant_pay_request_faculty_special_consultant_pay_request_faculty || {};
/**
 * @function special_consultant_pay_request_faculty_special_consultant_pay_request_faculty.generated_Year1_calc0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 * @returns {string}
 */
special_consultant_pay_request_faculty_special_consultant_pay_request_faculty.generated_Year1_calc0 = function (scope) {
    with(this) {
        with(scope) {
            var code = "if(Month1.value !== \"\" && DateWorked1.value !== null){\n  Year1.mandatory = \"error\";\n}else{\n   Year1.mandatory = \"\";\n}";
            return eval(code);
        }
	}
}
/**
 * @function special_consultant_pay_request_faculty_special_consultant_pay_request_faculty.generated_Month1_calc0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 * @returns {string}
 */
special_consultant_pay_request_faculty_special_consultant_pay_request_faculty.generated_Month1_calc0 = function (scope) {
    with(this) {
        with(scope) {
            var code = "if(Year1.value !== \"\" && DateWorked1.value !== null){\n  this.mandatory = \"error\";\n}else{\n   this.mandatory = \"\";\n}";
            return eval(code);
        }
	}
}
/**
 * @function special_consultant_pay_request_faculty_special_consultant_pay_request_faculty.generated_DateWorked1_calc0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 * @returns {string}
 */
special_consultant_pay_request_faculty_special_consultant_pay_request_faculty.generated_DateWorked1_calc0 = function (scope) {
    with(this) {
        with(scope) {
            var code = "if(Month1.value !== \"\" && Year1.value !== null){\n  this.mandatory = \"error\";\n}else{\n   this.mandatory = \"\";\n}";
            return eval(code);
        }
	}
}
/**
 * @function special_consultant_pay_request_faculty_special_consultant_pay_request_faculty.generated_TotalDue_calc0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 * @returns {string}
 */
special_consultant_pay_request_faculty_special_consultant_pay_request_faculty.generated_TotalDue_calc0 = function (scope) {
    with(this) {
        with(scope) {
            var code = "if(AmtPerDay.value !== \"\" && NoPayDays.value !== \"\"){\nvar amtPerDay = AmtPerDay.value;\nvar noOfDays = NoPayDays.value;\namtPerDay=amtPerDay.replace(',',\"\");\nvar totalVal = parseFloat(amtPerDay)*(noOfDays);\nthis.value=totalVal;\n}\n";
            return eval(code);
        }
	}
}
