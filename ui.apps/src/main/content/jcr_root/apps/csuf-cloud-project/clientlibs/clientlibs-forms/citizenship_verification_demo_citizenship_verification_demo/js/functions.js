/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {     		
	FinancialSignaturePanel.visible = false; 
  	
  	$.getJSON("https://api.ipify.org?format=json", function(data) {                
        ipAddress.value = data.ip;            	
    });
}
else if(StageIndicator.value == "ToFinancialAid"){
  
	StudentInformation.enabled = false;
	StudentCitizenshipDetailsPanel.enabled = false;  	    	
  	StudentSignaturePanel.enabled = false;
  	SupportingDocumentsPanel.visible = false;
  	FinancialSignaturePanel.visible = true;  	
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
  
caseID();
 var typeOfAidYearVal = getUrlParameters('aidYear');
 var identifyAidYearFlagVal="";
 singleAidYear(typeOfAidYearVal, identifyAidYearFlagVal); 
}

function caseID() {
    $.ajax({

        type: 'GET',
        url: "/bin/getCaseID",
        dataType: 'json',
        success: function(response) {
            caseId.value = response.CASEID;
        },
    });
}



debugger;
     
     /*         var typeOfAidYearVal = getUrlParameters('aidYear');
              var identifyAidYearFlagVal="";
              singleAidYear(typeOfAidYearVal, identifyAidYearFlagVal); */
            

function singleAidYear(typeOfAidYear, identifyAidYearFlag) {   
  
    //var typeOfAidYear = getUrlParameters('aidYear'); 
    var financialAidYearVal = "";
    var formCodeVal = "";
    var financialAidvalues = getAidYearValuesOnSingleAidYear();
    
   if (typeOfAidYear == '0') {
        financialAidYearVal = financialAidvalues.FinAidYearZero;
        aidYear.value = financialAidvalues.AidYearZero;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F0CITZ";
        formCodeVal = "F0CITZ";
        getFAFSAFinancialAidYear(aidYearValue);
   
    } else if(typeOfAidYear == '1') {
        financialAidYearVal = financialAidvalues.FinAidYearOne;
        aidYear.value = financialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = "F1CITZ";
        formCodeVal = "F1CITZ";
        getFAFSAFinancialAidYear(aidYearValue);
      
    } else{
        financialAidYearVal = financialAidvalues.FinAidYearGeneral;
        aidYear.value = financialAidvalues.AidYearGeneral;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FormCodeGeneral+"CITZ";
        formCodeVal = financialAidvalues.FormCodeGeneral+"CITZ";
        getFAFSAFinancialAidYear(aidYearValue);
       
    }
}



function aidYearPopup() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var financialAidYearVal = "";
  
    var financialAidvalues = getAidYearValuesOnPopup(); 

    modal.style.display = "block";
    span.onclick = function() {

        if ((document.getElementById("button1").checked === false) && (document.getElementById("button2").checked === false)) {
            modal.style.display = "block";
            showErrorModal("Alert!", "Please select the financial aid year");

        } else {
            modal.style.display = "none";
        }
    };

    document.getElementById("button1").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = financialAidvalues.FinAidYearOne;
        aidYear.value = financialAidvalues.AidYearOne;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYearVal;
        formCode.value = financialAidvalues.FinAidYearFormCodeOne+"CITZ";
        getFAFSAFinancialAidYear(aidYearValue);
   
    };

    document.getElementById("button2").onclick = function() {
        modal.style.display = "none";
        var financialAidYearVal = financialAidvalues.FinAidYearTwo;
        aidYear.value = financialAidvalues.AidYearTwo;
        financialAidYear.value = financialAidYearVal;
        aidYearValue = financialAidYear.value;
        formCode.value = financialAidvalues.FinAidYearFormCodeTwo+"CITZ";
        getFAFSAFinancialAidYear(aidYearValue);
    
    };
}


if (StageIndicator.value !== null) {
    aidYearValue = financialAidYear.value;
    getFAFSAFinancialAidYear(aidYearValue);
}


debugger;
function getFAFSAFinancialAidYear(aidYearValue) {
  
   if(financialAidYear.value == "2021-2022"){
     certificationOfCitizenship.visible = false;
   } else {
     certificationOfCitizenship.visible = true;
   }
  
    var financialAidYearVal = financialAidYear.value;
    var formCodeTextValue = formCode.value;
    var titleTextVal = "<p><b>CITIZENSHIP VERIFICATION (".concat(financialAidYearVal).concat(")</b></p>");
    var formCodeTextVal = "<p><b> ".concat(formCodeTextValue).concat(" </b></p>");


    $("#mainHeadingText").html(formCodeTextVal);
    $("#f0citzHeadingText").html(titleTextVal);
}


        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_guideRootPanel_init2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_guideRootPanel_init2 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  showErrorModal("Alert!", "Please make sure to save your work every 20-30 minutes and complete all the required fields.");
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_cwid_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_cwid_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
  this.value="80123456";
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_cwid_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_cwid_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var arr= [{"LAST_NAME":"Smith", "FIRST_NAME":"John", "USERID":"10001", "EMPLID":"80123456", "PREF_EMAIL":"yashovardhan.jayaram@thoughtfocus.com"}];
if(StageIndicator.value === null){
  if(cwid.value == "80123456"){
				lastName.value = arr[0].LAST_NAME;
                firstName.value = arr[0].FIRST_NAME;
                HiddenStudentUserID.value = arr[0].USERID;
                cwid.value = arr[0].EMPLID;
                //studentIDNumber.value = response[0].student_ID;
              	studentCWID.value = arr[0].EMPLID;
                HiddenStudentEmail.value = arr[0].PREF_EMAIL;       
               //HiddenStudentEmail.value = "yjayaram@fullerton.edu";
                HiddenStudentName.value = arr[0].FIRST_NAME + " " + arr[0].LAST_NAME;
  }else{
    showErrorModal("Alert!", "No Matching records found");
  }
  }
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_Date_1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_Date_1_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
	  this.enabled = false;
      var dateString = new Date().toLocaleString("en-US", {
		
            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
  Date_1.value = d;
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_financialAidYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_financialAidYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_BirthCertificate_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_BirthCertificate_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	USPassport.value = null;
	NaturalizationCertification.value = null;
	certificationOfCitizenship.value = null;
  
  	AlienRegistrationCard.value = null;
	Passportstamped.value = null;
	DepartureRecord.value = null;
	OtherUSPerm.value = null;

	Refugee.value = null;
	AsylumGranted.value = null;
	IndefiniteParole.value = null;
	CubanHaitianEntrant.value = null;
	CurrentFormI688.value = null;
	OtherNonCitizen.value = null;

	employmentAuth.value = null;
	ApplSubmitted.value = null;
	F1F2SeriesVisa.value = null;
	OtherNonEligibleNonCitizien.value = null; 
  
  	/*USPermanentResidentPanel.enabled = false;
	OtherEligibleNonCitizenPanel.enabled = false;
	NonEligibleNonCitizenPanel.enabled = false;*/
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_BirthCertificate_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_BirthCertificate_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
alert("here1111");
(function ($, guideBridge) {
    $(document).ready(function () {
		alert("here");
        // Make sure guideBridge is ready
        guideBridge.on("elementValueChanged", function (event, data) {
          debugger;

			alert("data==="+data);
			alert("test===" +guide[0].guide1[0].guideRootPanel[0].formContainer[0].StudentCitizenshipDetailsPanel[0].BirthCertificate[0]);
            // Change this SOM expression to match the field that triggers the reset
            if (data.somExpression.includes("BirthCertificate")) {
				
                if (data.newText && data.newText !== null) {
                    // Reset all dependent fields
                    resetField("USPassport");
                    resetField("NaturalizationCertification");
                    resetField("certificationOfCitizenship");
                }
            }
        });
 
        // Helper: reset value of a field
        function resetField(fieldName) {
            let field = guideBridge.resolveNode(fieldName);
            if (field) {
                field.value = null;
            }
        }
 
        // Helper: disable a panel (optional)
        function disablePanel(panelName) {
            let panel = guideBridge.resolveNode(panelName);
            if (panel) {
                panel.enabled = false;
            }
        }
    });
})(jQuery, window.guideBridge);

        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_BirthCertificate_valueCommit2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_BirthCertificate_valueCommit2 = function (scope) {
    with(this) {
        with(scope) {
            (function ($, guideBridge) {
    $(document).ready(function () {
        // Make sure guideBridge is ready
        guideBridge.on("elementValueChanged", function (event, data) {
          debugger;
            // On-prem: Use field name directly instead of somExpression
            if (data.fieldName === "citizenshipStatus" || 
                data.somExpression === "citizenshipStatus") {
                if (data.newText && data.newText !== null) {
                    // Reset all dependent fields
                    resetField("USPassport");
                    resetField("NaturalizationCertification");
                    resetField("certificationOfCitizenship");
 
                    resetField("AlienRegistrationCard");
                    resetField("Passportstamped");
                    resetField("DepartureRecord");
                    resetField("OtherUSPerm");
 
                    resetField("Refugee");
                    resetField("AsylumGranted");
                    resetField("IndefiniteParole");
                    resetField("CubanHaitianEntrant");
                    resetField("CurrentFormI688");
                    resetField("OtherNonCitizen");
 
                    resetField("employmentAuth");
                    resetField("ApplSubmitted");
                    resetField("F1F2SeriesVisa");
                    resetField("OtherNonEligibleNonCitizien");
                }
            }
        });

        // Function to populate fields from servlet
        function populateFieldsFromServlet() {
            $.ajax({
                url: "/content/your-form-path.dynamicvalues.json", // Update this path
                method: "GET",
                success: function(data) {
                    // Populate fields with servlet response
                    guideBridge.resolveNode("USPassport").value = data.USPassport;
                    guideBridge.resolveNode("NaturalizationCertification").value = data.NaturalizationCertification;
                    guideBridge.resolveNode("certificationOfCitizenship").value = data.certificationOfCitizenship;
                    guideBridge.resolveNode("AlienRegistrationCard").value = data.AlienRegistrationCard;
                    guideBridge.resolveNode("Passportstamped").value = data.Passportstamped;
                    guideBridge.resolveNode("DepartureRecord").value = data.DepartureRecord;
                    guideBridge.resolveNode("OtherUSPerm").value = data.OtherUSPerm;
                    guideBridge.resolveNode("Refugee").value = data.Refugee;
                    guideBridge.resolveNode("AsylumGranted").value = data.AsylumGranted;
                    guideBridge.resolveNode("IndefiniteParole").value = data.IndefiniteParole;
                    guideBridge.resolveNode("CubanHaitianEntrant").value = data.CubanHaitianEntrant;
                    guideBridge.resolveNode("CurrentFormI688").value = data.CurrentFormI688;
                    guideBridge.resolveNode("OtherNonCitizen").value = data.OtherNonCitizen;
                    guideBridge.resolveNode("employmentAuth").value = data.employmentAuth;
                    guideBridge.resolveNode("ApplSubmitted").value = data.ApplSubmitted;
                    guideBridge.resolveNode("F1F2SeriesVisa").value = data.F1F2SeriesVisa;
                    guideBridge.resolveNode("OtherNonEligibleNonCitizien").value = data.OtherNonEligibleNonCitizien;
                },
                error: function(xhr, status, error) {
                    console.error("Error fetching dynamic values:", error);
                }
            });
        }

        // Call populate function on form load
        populateFieldsFromServlet();
 
        // Helper: reset value of a field
        function resetField(fieldName) {
            let field = guideBridge.resolveNode(fieldName);
            if (field) {
                field.value = null;
            }
        }
 
        // Helper: disable a panel (optional)
        function disablePanel(panelName) {
            let panel = guideBridge.resolveNode(panelName);
            if (panel) {
                panel.enabled = false;
            }
        }
    });
})(jQuery, window.guideBridge);
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_BirthCertificate_valueCommit3
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_BirthCertificate_valueCommit3 = function (scope) {
    with(this) {
        with(scope) {
            $(document).ready(function () {
    if (window.guideBridge) {
        guideBridge.on("bridgeInitialize", function () {
            
            // Attach your elementValueChanged listener here
            guideBridge.on("elementValueChanged", function (event, data) {
                
                if (data.target && data.target.somExpression.indexOf("BirthCertificate") !== -1) {
                    var birthCertificateValue = data.newText;

                    if (birthCertificateValue === "1" && birthCertificateValue !== "") {
                        // Reset other fields
                        guideBridge.resolveNode("USPassport").value = "";
                        guideBridge.resolveNode("NaturalizationCertification").value = "";
                        guideBridge.resolveNode("certificationOfCitizenship").value = "";

                        alert("Fields reset!");
                    }
                }
            });
        });
    }
});
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_USPassport_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_USPassport_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	BirthCertificate.value = null;
	NaturalizationCertification.value = null;
	certificationOfCitizenship.value = null;
  
  	AlienRegistrationCard.value = null;
	Passportstamped.value = null;
	DepartureRecord.value = null;
	OtherUSPerm.value = null;

	Refugee.value = null;
	AsylumGranted.value = null;
	IndefiniteParole.value = null;
	CubanHaitianEntrant.value = null;
	CurrentFormI688.value = null;
	OtherNonCitizen.value = null;

	employmentAuth.value = null;
	ApplSubmitted.value = null;
	F1F2SeriesVisa.value = null;
	OtherNonEligibleNonCitizien.value = null; 
  
  	/*USPermanentResidentPanel.enabled = false;
	OtherEligibleNonCitizenPanel.enabled = false;
	NonEligibleNonCitizenPanel.enabled = false;*/
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_USPassport_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_USPassport_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            alert("new1111");
if (guideBridge.resolveNode("USPassport").value !== null) {
  alert("new11111111");

    guideBridge.resolveNode("BirthCertificate").value = null; 
    guideBridge.resolveNode("NaturalizationCertification").value = null;
    guideBridge.resolveNode("certificationOfCitizenship").value = null;

    guideBridge.resolveNode("AlienRegistrationCard").value = null;
    guideBridge.resolveNode("Passportstamped").value = null;
    guideBridge.resolveNode("DepartureRecord").value = null;
    guideBridge.resolveNode("OtherUSPerm").value = null;

    guideBridge.resolveNode("Refugee").value = null;
    guideBridge.resolveNode("AsylumGranted").value = null;
    guideBridge.resolveNode("IndefiniteParole").value = null;
    guideBridge.resolveNode("CubanHaitianEntrant").value = null;
    guideBridge.resolveNode("CurrentFormI688").value = null;
    guideBridge.resolveNode("OtherNonCitizen").value = null;

    guideBridge.resolveNode("employmentAuth").value = null;
    guideBridge.resolveNode("ApplSubmitted").value = null;
    guideBridge.resolveNode("F1F2SeriesVisa").value = null;
    guideBridge.resolveNode("OtherNonEligibleNonCitizien").value = null;
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_USPassport_valueCommit2
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_USPassport_valueCommit2 = function (scope) {
    with(this) {
        with(scope) {
            $(document).ready(function () {
    if (window.guideBridge) {
        guideBridge.on("bridgeInitialize", function () {
            
            // Attach your elementValueChanged listener here
            guideBridge.on("elementValueChanged", function (event, data) {
                
                if (data.target && data.target.somExpression.indexOf("USPassport") !== -1) { 
                    var birthCertificateValue = data.newText;

                    if (birthCertificateValue === "1" && birthCertificateValue !== "") {
                        // Reset other fields
                        guideBridge.resolveNode("BirthCertificate").value = "";
                        guideBridge.resolveNode("NaturalizationCertification").value = "";
                        guideBridge.resolveNode("certificationOfCitizenship").value = "";

                        alert("Fields US!");
                    }
                }
            });
        });
    }
});
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_NaturalizationCertification_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_NaturalizationCertification_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	BirthCertificate.value = null;
	USPassport.value = null;
	certificationOfCitizenship.value = null;
  
  	AlienRegistrationCard.value = null;
	Passportstamped.value = null;
	DepartureRecord.value = null;
	OtherUSPerm.value = null;

	Refugee.value = null;
	AsylumGranted.value = null;
	IndefiniteParole.value = null;
	CubanHaitianEntrant.value = null;
	CurrentFormI688.value = null;
	OtherNonCitizen.value = null;

	employmentAuth.value = null;
	ApplSubmitted.value = null;
	F1F2SeriesVisa.value = null;
	OtherNonEligibleNonCitizien.value = null; 
  
  	/*USPermanentResidentPanel.enabled = false;
	OtherEligibleNonCitizenPanel.enabled = false;
	NonEligibleNonCitizenPanel.enabled = false;*/
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_NaturalizationCertification_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_NaturalizationCertification_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
alert("3");

$(document).ready(function () {
    if (window.guideBridge) {
        guideBridge.on("elementValueChanged", function (event, data) {
            // Check if the changed field is BirthCertificate
            if (data.target && data.target.somExpression.indexOf("NaturalizationCertification") !== -1) {
                
                var birthCertificateValue = data.newText;
                //alert("BirthCertificate value = " + birthCertificateValue);

                if (birthCertificateValue === "1" && birthCertificateValue !== "") {
                    // Reset other fields
                    guideBridge.resolveNode("BirthCertificate").value = ""; 
                    guideBridge.resolveNode("USPassport").value = ""; 
                    guideBridge.resolveNode("certificationOfCitizenship").value = "";

                    alert("Fields reset US Passport");
                }
            }
        });
    }
});
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_certificationOfCitizenship_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_certificationOfCitizenship_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	BirthCertificate.value = null;
	USPassport.value = null;
	NaturalizationCertification.value = null;
  
  	AlienRegistrationCard.value = null;
	Passportstamped.value = null;
	DepartureRecord.value = null;
	OtherUSPerm.value = null;

	Refugee.value = null;
	AsylumGranted.value = null;
	IndefiniteParole.value = null;
	CubanHaitianEntrant.value = null;
	CurrentFormI688.value = null;
	OtherNonCitizen.value = null;

	employmentAuth.value = null;
	ApplSubmitted.value = null;
	F1F2SeriesVisa.value = null;
	OtherNonEligibleNonCitizien.value = null; 
  
  	/*USPermanentResidentPanel.enabled = false;
	OtherEligibleNonCitizenPanel.enabled = false;
	NonEligibleNonCitizenPanel.enabled = false;*/
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_certificationOfCitizenship_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_certificationOfCitizenship_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
alert("4");
$(document).ready(function () {
    if (window.guideBridge) {
        guideBridge.on("elementValueChanged", function (event, data) {
            // Check if the changed field is BirthCertificate
            if (data.target && data.target.somExpression.indexOf("certificationOfCitizenship") !== -1) {
                
                var birthCertificateValue = data.newText;
                //alert("BirthCertificate value = " + birthCertificateValue);

                if (birthCertificateValue === "1" && birthCertificateValue !== "") {
                    // Reset other fields
                    guideBridge.resolveNode("BirthCertificate").value = ""; 
                    guideBridge.resolveNode("USPassport").value = ""; 
                    guideBridge.resolveNode("NaturalizationCertification").value = "";

                    alert("Fields reset");
                }
            }
        });
    }
});
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_AlienRegistrationCard_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_AlienRegistrationCard_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	Passportstamped.value = null;
	DepartureRecord.value = null;
	OtherUSPerm.value = null;
  
  	BirthCertificate.value = null;
  	USPassport.value = null;
	NaturalizationCertification.value = null;
	certificationOfCitizenship.value = null;
  
  	Refugee.value = null;
	AsylumGranted.value = null;
	IndefiniteParole.value = null;
	CubanHaitianEntrant.value = null;
	CurrentFormI688.value = null;
	OtherNonCitizen.value = null;

	employmentAuth.value = null;
	ApplSubmitted.value = null;
    F1F2SeriesVisa.value = null;
    OtherNonEligibleNonCitizien.value = null;

    /*USCitizenPanel.enabled = false;   
    OtherEligibleNonCitizenPanel.enabled = false;
    NonEligibleNonCitizenPanel.enabled = false;*/
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_Passportstamped_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_Passportstamped_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	AlienRegistrationCard.value = null;
	DepartureRecord.value = null;
	OtherUSPerm.value = null;
  
  	BirthCertificate.value = null;
  	USPassport.value = null;
	NaturalizationCertification.value = null;
	certificationOfCitizenship.value = null;
  
  	Refugee.value = null;
	AsylumGranted.value = null;
	IndefiniteParole.value = null;
	CubanHaitianEntrant.value = null;
	CurrentFormI688.value = null;
	OtherNonCitizen.value = null;

	employmentAuth.value = null;
	ApplSubmitted.value = null;
    F1F2SeriesVisa.value = null;
    OtherNonEligibleNonCitizien.value = null;

    /*USCitizenPanel.enabled = false;   
    OtherEligibleNonCitizenPanel.enabled = false;
    NonEligibleNonCitizenPanel.enabled = false;*/
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_DepartureRecord_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_DepartureRecord_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	AlienRegistrationCard.value = null;
	Passportstamped.value = null;
	OtherUSPerm.value = null;
  
  	BirthCertificate.value = null;
  	USPassport.value = null;
	NaturalizationCertification.value = null;
	certificationOfCitizenship.value = null;
  
  	Refugee.value = null;
	AsylumGranted.value = null;
	IndefiniteParole.value = null;
	CubanHaitianEntrant.value = null;
	CurrentFormI688.value = null;
	OtherNonCitizen.value = null;

	employmentAuth.value = null;
	ApplSubmitted.value = null;
    F1F2SeriesVisa.value = null;
    OtherNonEligibleNonCitizien.value = null;

    /*USCitizenPanel.enabled = false;    
    OtherEligibleNonCitizenPanel.enabled = false;
    NonEligibleNonCitizenPanel.enabled = false;*/
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_OtherUSPerm_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_OtherUSPerm_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	AlienRegistrationCard.value = null;
	Passportstamped.value = null;
	DepartureRecord.value = null;
  	USPermTextBox.enabled = true;
  
  	BirthCertificate.value = null;
  	USPassport.value = null;
	NaturalizationCertification.value = null;
	certificationOfCitizenship.value = null;
  
  	Refugee.value = null;
	AsylumGranted.value = null;
	IndefiniteParole.value = null;
	CubanHaitianEntrant.value = null;
	CurrentFormI688.value = null;
	OtherNonCitizen.value = null;

	employmentAuth.value = null;
	ApplSubmitted.value = null;
    F1F2SeriesVisa.value = null;
    OtherNonEligibleNonCitizien.value = null;

    /*USCitizenPanel.enabled = false;    
    OtherEligibleNonCitizenPanel.enabled = false;
    NonEligibleNonCitizenPanel.enabled = false;*/
}
else{
  	USPermTextBox.enabled = false;
  	USPermTextBox.value = null;
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_Refugee_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_Refugee_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	AsylumGranted.value = null;
	IndefiniteParole.value = null;
	CubanHaitianEntrant.value = null;
  	CurrentFormI688.value = null;
	OtherNonCitizen.value = null;
  
  	BirthCertificate.value = null;
    USPassport.value = null;
    NaturalizationCertification.value = null;
    certificationOfCitizenship.value = null;

    AlienRegistrationCard.value = null;
    Passportstamped.value = null;
    DepartureRecord.value = null;
    OtherUSPerm.value = null;
  
  	employmentAuth.value = null;
    ApplSubmitted.value = null;
    F1F2SeriesVisa.value = null;
    OtherNonEligibleNonCitizien.value = null;


    /*USCitizenPanel.enabled = false;
    USPermanentResidentPanel.enabled = false;    
    NonEligibleNonCitizenPanel.enabled = false;*/
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_AsylumGranted_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_AsylumGranted_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	Refugee.value = null;
	IndefiniteParole.value = null;
	CubanHaitianEntrant.value = null;
  	CurrentFormI688.value = null;
	OtherNonCitizen.value = null;
  
  	BirthCertificate.value = null;
    USPassport.value = null;
    NaturalizationCertification.value = null;
    certificationOfCitizenship.value = null;

    AlienRegistrationCard.value = null;
    Passportstamped.value = null;
    DepartureRecord.value = null;
    OtherUSPerm.value = null;
  
  	employmentAuth.value = null;
    ApplSubmitted.value = null;
    F1F2SeriesVisa.value = null;
    OtherNonEligibleNonCitizien.value = null;


    /*USCitizenPanel.enabled = false;
    USPermanentResidentPanel.enabled = false;    
    NonEligibleNonCitizenPanel.enabled = false;*/
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_IndefiniteParole_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_IndefiniteParole_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	Refugee.value = null;
	AsylumGranted.value = null;
	CubanHaitianEntrant.value = null;
  	CurrentFormI688.value = null;
	OtherNonCitizen.value = null;
  
  	BirthCertificate.value = null;
    USPassport.value = null;
    NaturalizationCertification.value = null;
    certificationOfCitizenship.value = null;

    AlienRegistrationCard.value = null;
    Passportstamped.value = null;
    DepartureRecord.value = null;
    OtherUSPerm.value = null;
  
  	employmentAuth.value = null;
    ApplSubmitted.value = null;
    F1F2SeriesVisa.value = null;
    OtherNonEligibleNonCitizien.value = null;


    /*USCitizenPanel.enabled = false;
    USPermanentResidentPanel.enabled = false;    
    NonEligibleNonCitizenPanel.enabled = false;*/
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_CubanHaitianEntrant_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_CubanHaitianEntrant_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	Refugee.value = null;
	AsylumGranted.value = null;
	IndefiniteParole.value = null;
  	CurrentFormI688.value = null;
	OtherNonCitizen.value = null;
  
  	BirthCertificate.value = null;
    USPassport.value = null;
    NaturalizationCertification.value = null;
    certificationOfCitizenship.value = null;

    AlienRegistrationCard.value = null;
    Passportstamped.value = null;
    DepartureRecord.value = null;
    OtherUSPerm.value = null;
  
  	employmentAuth.value = null;
    ApplSubmitted.value = null;
    F1F2SeriesVisa.value = null;
    OtherNonEligibleNonCitizien.value = null;


    /*USCitizenPanel.enabled = false;
    USPermanentResidentPanel.enabled = false;   
    NonEligibleNonCitizenPanel.enabled = false;*/
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_CurrentFormI688_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_CurrentFormI688_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	Refugee.value = null;
	AsylumGranted.value = null;
	IndefiniteParole.value = null;
  	CubanHaitianEntrant.value = null;
	OtherNonCitizen.value = null;
  
  	BirthCertificate.value = null;
    USPassport.value = null;
    NaturalizationCertification.value = null;
    certificationOfCitizenship.value = null;

    AlienRegistrationCard.value = null;
    Passportstamped.value = null;
    DepartureRecord.value = null;
    OtherUSPerm.value = null;
  
  	employmentAuth.value = null;
    ApplSubmitted.value = null;
    F1F2SeriesVisa.value = null;
    OtherNonEligibleNonCitizien.value = null;


    /*USCitizenPanel.enabled = false;
    USPermanentResidentPanel.enabled = false;   
    NonEligibleNonCitizenPanel.enabled = false;*/
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_OtherNonCitizen_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_OtherNonCitizen_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	Refugee.value = null;
	AsylumGranted.value = null;
	IndefiniteParole.value = null;
  	CubanHaitianEntrant.value = null;
	CurrentFormI688.value = null;
  	EligibleNonCitizenTextBox.enabled = true;
  
  	BirthCertificate.value = null;
    USPassport.value = null;
    NaturalizationCertification.value = null;
    certificationOfCitizenship.value = null;

    AlienRegistrationCard.value = null;
    Passportstamped.value = null;
    DepartureRecord.value = null;
    OtherUSPerm.value = null;
  
  	employmentAuth.value = null;
    ApplSubmitted.value = null;
    F1F2SeriesVisa.value = null;
    OtherNonEligibleNonCitizien.value = null;


    /*USCitizenPanel.enabled = false;
    USPermanentResidentPanel.enabled = false;   
    NonEligibleNonCitizenPanel.enabled = false;*/
}
else{
  	EligibleNonCitizenTextBox.enabled = false;
  	EligibleNonCitizenTextBox.value = null;
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_employmentAuth_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_employmentAuth_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	ApplSubmitted.value = null;
	F1F2SeriesVisa.value = null;
	OtherNonEligibleNonCitizien.value = null;  
  
  	BirthCertificate.value = null;
    USPassport.value = null;
    NaturalizationCertification.value = null;
    certificationOfCitizenship.value = null;

    AlienRegistrationCard.value = null;
    Passportstamped.value = null;
    DepartureRecord.value = null;
    OtherUSPerm.value = null;

    Refugee.value = null;
    AsylumGranted.value = null;
    IndefiniteParole.value = null;
    CubanHaitianEntrant.value = null;
    CurrentFormI688.value = null;
    OtherNonCitizen.value = null;

    /*USCitizenPanel.enabled = false;
    USPermanentResidentPanel.enabled = false;
    OtherEligibleNonCitizenPanel.enabled = false;*/
    }
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_ApplSubmitted_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_ApplSubmitted_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	employmentAuth.value = null;
	F1F2SeriesVisa.value = null;
	OtherNonEligibleNonCitizien.value = null;  
  
  	BirthCertificate.value = null;
    USPassport.value = null;
    NaturalizationCertification.value = null;
    certificationOfCitizenship.value = null;

    AlienRegistrationCard.value = null;
    Passportstamped.value = null;
    DepartureRecord.value = null;
    OtherUSPerm.value = null;

    Refugee.value = null;
    AsylumGranted.value = null;
    IndefiniteParole.value = null;
    CubanHaitianEntrant.value = null;
    CurrentFormI688.value = null;
    OtherNonCitizen.value = null;

    /*USCitizenPanel.enabled = false;
    USPermanentResidentPanel.enabled = false;
    OtherEligibleNonCitizenPanel.enabled = false;*/
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_F1F2SeriesVisa_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_F1F2SeriesVisa_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	employmentAuth.value = null;
	ApplSubmitted.value = null;
	OtherNonEligibleNonCitizien.value = null; 
  
  	BirthCertificate.value = null;
    USPassport.value = null;
    NaturalizationCertification.value = null;
    certificationOfCitizenship.value = null;

    AlienRegistrationCard.value = null;
    Passportstamped.value = null;
    DepartureRecord.value = null;
    OtherUSPerm.value = null;

    Refugee.value = null;
    AsylumGranted.value = null;
    IndefiniteParole.value = null;
    CubanHaitianEntrant.value = null;
    CurrentFormI688.value = null;
    OtherNonCitizen.value = null;

    /*USCitizenPanel.enabled = false;
    USPermanentResidentPanel.enabled = false;
    OtherEligibleNonCitizenPanel.enabled = false;*/
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_OtherNonEligibleNonCitizien_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_OtherNonEligibleNonCitizien_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
  	employmentAuth.value = null;
	ApplSubmitted.value = null;
	F1F2SeriesVisa.value = null;  	
  	NonEligibleNonCitizenTextBox.enabled = true;
  
  	BirthCertificate.value = null;
    USPassport.value = null;
    NaturalizationCertification.value = null;
    certificationOfCitizenship.value = null;

    AlienRegistrationCard.value = null;
    Passportstamped.value = null;
    DepartureRecord.value = null;
    OtherUSPerm.value = null;

    Refugee.value = null;
    AsylumGranted.value = null;
    IndefiniteParole.value = null;
    CubanHaitianEntrant.value = null;
    CurrentFormI688.value = null;
    OtherNonCitizen.value = null;

    /*USCitizenPanel.enabled = false;
    USPermanentResidentPanel.enabled = false;
    OtherEligibleNonCitizenPanel.enabled = false;*/
}
else{
  	NonEligibleNonCitizenTextBox.enabled = false;
  	NonEligibleNonCitizenTextBox.value = null;
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_SupportingDocumentsPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    this.visible = true;
}else{
  this.visible = false;
}

        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_supportDoc1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc1.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	  
	
	var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;

	if(format.test(supportDoc1.fileAttachment.value) === true){
		var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
		supportDoc1.fileAttachment.value = doc2NewName;

	}
  if(extension !== "pdf"){
	 
       supportDoc1.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_supportDoc2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc2.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	  
	
	var format = /[&{}#!@$%^=;\[\]]/;

	if(format.test(supportDoc2.fileAttachment.value) === true){
		var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
		supportDoc2.fileAttachment.value = doc2NewName;

	}
  if(extension !== "pdf"){
	 
       supportDoc2.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_supportDoc3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  var filePath = supportDoc3.fileAttachment.value;
	var extension = filePath.substring(filePath.lastIndexOf(".")+1,filePath.length);

	extension = extension.toLowerCase();
	
	var format = /[&{}#!@$%^=;\[\]]/;

	if(format.test(supportDoc3.fileAttachment.value) === true){
		var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g,'_');
		supportDoc3.fileAttachment.value = doc2NewName;

	}
    
	if(extension !== "pdf"){
	 
       supportDoc3.fileAttachment.value = null;
	   showErrorModal("Alert !","Please upload a supported file");

	}

	if(this.value !== null){
	  nonMedSupDocMessage.visible = false;	  
	}
}
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_StudentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_StudentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            debugger;
if (this.value == 1) {
    if (StageIndicator.value === null) {
        studentSignature.value = "";
        studentSignDate.value = "";
        if (studentSignDate.value === null) {
            studentSignDate.enabled = false;

            studentSignature.value = "John Smith";
            var dateString = new Date().toLocaleString("en-US", {

                timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
            }).replace(/[^ -~]/g, '');
            var dateObject = new Date(dateString);
            var curyear = dateObject.getFullYear();
            var curyearMonth = dateObject.getMonth() + 1;
            var curyearDay = dateObject.getDate();
            var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
            studentSignDate.value = d;

            studentSignature.enabled = false;
        }
    }
} else {
    studentSignature.value = "";
    studentSignDate.value = "";
} 






        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_studentSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_studentSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_studentSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_studentSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_evaluator_signChk_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_evaluator_signChk_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToFinancialAid") {
    if (this.value == 1) {

        staffSignature.value = "Mathew Parker";
     // EvaluatorNameSign.value = "Mathew Parker";
       financialAidAssignee.value = "10111";
        var dateString = new Date().toLocaleString("en-US", {

            timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        staffSignDate.value = d;

        staffSignature.enabled = false;
        staffSignDate.enabled = false;
    } else {
        staffSignature.value = "";
         financialAidAssignee.value = "";
        staffSignDate.value = "";
    }
}


        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_staffSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_staffSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_staffSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_staffSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            getPdf();

function getPdf() {
    //console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, ' and'));
            jsonData.append('formPath', '/content/forms/af/citizenship-verification-demo/citizenship-verification-demo');
            //jsonData.append('fileName', "(" + hidden_cwid.value + ")" + "_" + Date.now());    
            jsonData.append('fileName', "(" + Date.now() + ")");      
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
 * @function citizenship_verification_demo_citizenship_verification_demo.generated_submit1608529416101_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
citizenship_verification_demo_citizenship_verification_demo.generated_submit1608529416101_click0 = function (scope) {
    with(this) {
        with(scope) {
            
if(BirthCertificate.value === null && USPassport.value === null && NaturalizationCertification.value === null && certificationOfCitizenship.value === null && AlienRegistrationCard.value === null && Passportstamped.value === null && DepartureRecord.value === null && OtherUSPerm.value === null && Refugee.value === null && AsylumGranted.value === null && IndefiniteParole.value === null && CubanHaitianEntrant.value === null && CurrentFormI688.value === null && OtherNonCitizen.value === null && employmentAuth.value === null && ApplSubmitted.value === null && F1F2SeriesVisa.value === null && OtherNonEligibleNonCitizien.value === null){
  	
  showErrorModal("Alert !", "Please select at least one option from the given categories");
  	guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].StudentCitizenshipDetailsPanel[0]");
}
else if(OtherUSPerm.value !== null && USPermTextBox.value === null){
		showErrorModal("Alert !", "Please enter the list of documents for U.S. PERMANENT RESIDENT");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].StudentCitizenshipDetailsPanel[0].USPermTextBox[0]");
}
else if(OtherNonCitizen.value !== null && EligibleNonCitizenTextBox.value === null){
		showErrorModal("Alert !", "Please enter the list of documents for OTHER ELIGIBLE NON-CITIZEN");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].StudentCitizenshipDetailsPanel[0].EligibleNonCitizenTextBox[0]");
}
else if(OtherNonEligibleNonCitizien.value !== null && NonEligibleNonCitizenTextBox.value === null){
		showErrorModal("Alert !", "Please enter the list of documents for NON-ELIGIBLE NON-CITIZEN");
		guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].formContainer[0].StudentCitizenshipDetailsPanel[0].NonEligibleNonCitizenTextBox[0]");
}
else{
  	submitAction();
}



function submitAction(){
  aftiaDescCWID.value = firstName.value+ " " + lastName.value + " " + cwid.value;
  EmailSubject.value = "Test - Citizenship Verification - (" + cwid.value+")";
  
   var testEmail = "yashovardhan.jayaram@thoughtfocus.com";  
   HiddenStudentEmail.value = testEmail;  
//HiddenStudentEmail.value = "soumya.ravindra@thoughtfocus.com";
  guideBridge.submit();
}
        }
	}
}
