
//Do not change this file.
var request_for_excess_units_undergraduate_undergraduate_request_for_excess_units = window.request_for_excess_units_undergraduate_undergraduate_request_for_excess_units = window.request_for_excess_units_undergraduate_undergraduate_request_for_excess_units || {};
/**
 * @function request_for_excess_units_undergraduate_undergraduate_request_for_excess_units.generated_units_validate0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 * @returns {boolean}
 */
request_for_excess_units_undergraduate_undergraduate_request_for_excess_units.generated_units_validate0 = function (scope) {
    with(this) {
        with(scope) {
            var code = "if (this.value > 36 && StageIndicator.value === null) {\n    false;\n} else if (!/^\\d+$/.test(String(this.value)) && StageIndicator.value === null) {\n    false;\n}  else {\n    true;\n}";
            return eval(code);
        }
	}
}
