
//Do not change this file.
var request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form = window.request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form = window.request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form || {};
/**
 * @function request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Total_calc0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 * @returns {string}
 */
request_for_invoice_and_interagency_financial_transaction_request_for_invoice_and_interagency_financial_transaction_form.generated_Total_calc0 = function (scope) {
    with(this) {
        with(scope) {
            var code = "debugger;\n//if(StageIndicator === null || StageIndicator === \"ToInitiator\" || StageIndicator === \"ToASFR\"){\nvar amount1 = 0;\nvar amount2 = 0; // initialize with a number to avoid \"undefined\"\n\nvar rowCount = Row1.instanceManager.instanceCount;\ndebugger;\nfor (var i = 0; i < rowCount; i++) {\n    amount1 = parseFloat(Row1.instanceManager.instances[i].CreditAmount.value);\ndebugger;\n    if (!isNaN(amount1)) {\n        amount2 += amount1;\n    }\n}\n\nthis.value = amount2; \nTotalBillAmount.value = this.value;\nconsole.log(TotalBillAmount);\n//}\n\n";
            return eval(code);
        }
	}
}
