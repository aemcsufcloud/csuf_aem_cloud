/**
 * @function blended_program_blended_program.generated_CaseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_CaseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getCaseID",
        dataType: 'json',
        success: function(myresponse) {
            CaseId.value = myresponse.CASEID;
        },
    });
}
        }
	}
}
/**
 * @function blended_program_blended_program.generated_StudentInformationPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_StudentInformationPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false
        }
	}
}
/**
 * @function blended_program_blended_program.generated_StudentFirstName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_StudentFirstName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_StudentLastName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_StudentLastName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_StudentMiddleName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_StudentMiddleName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_StudentPhone_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_StudentPhone_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_StudentEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_StudentEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_StudentInformationTabCurrentMajor_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_StudentInformationTabCurrentMajor_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_CatalogYear_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_CatalogYear_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_CurrentMajorToNewMajorCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_CurrentMajorToNewMajorCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){ 
  //CurrentMajor.enabled = true;
  NewMajor.enabled = true; 
  
}else{

  CurrentMajor.value = null;
  CurrentMajorAcadPlanCode.value = null;
  CurrentMajor.enabled = false;
  NewMajor.value = "Select Major/Concentration";
  NewMajor.enabled = false;
  NewMajorAcadPlanCode.value = null;
  CurrentMajorAcadPlanCode.value = null;
  
}
        }
	}
}
/**
 * @function blended_program_blended_program.generated_CurrentMajorToNewMajorCHK_valueCommit1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_CurrentMajorToNewMajorCHK_valueCommit1 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value === null){
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";
  
	if(ChangeCurrentMajorToNewMajorSignaturePanel.visible === false){
   
		var userId = HiddenUserID.value;
        if(this.value !== null){
            
				CurrentMajor.value = HiddenCurrentMajor.value;
          		CurrentMajorAcadPlanCode.value = HiddenCurrentMajorAcadCode.value;				
          
				$.ajax({

					type: 'GET', 

					url:"/bin/getAllMajors",

				   data:  {
							 //AcadProg: 'UGD'         		 
					  },

					dataType: 'json',

					success: function(myresponse){
							if(myresponse.length >= 1){
                              	  
									var newMajorList = document.querySelector(".newMajor-list select");

									var length = newMajorList.options.length;					// Code For Clearing Primary Degree Objectives
									for (i = length; i > 0; i--) {
									  newMajorList.options[i] = null;
									} 
									for(var i=0; i < myresponse.length; i++){
									  var opt = document.createElement("option");
									  opt.value = myresponse[i].ALL_MAJORS;
									 // console.log("values are="+opt.value);
									  opt.innerHTML = myresponse[i].ALL_MAJORS; 
									  newMajorList.appendChild(opt);
									}
							}
                      gifModal.style.display = "none";
					}
				}); // end ajax								
        }else{
              gifModal.style.display = "none";
        }
    }
    
}
        }
	}
}
/**
 * @function blended_program_blended_program.generated_CurrentMajor_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_CurrentMajor_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_NewMajor_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_NewMajor_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_NewMajor_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_NewMajor_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";	
	var program = this.value;    
  
  	var that = this;
  	var hiddenNewMajorCodeForValidation;
  	var currentAdditionalMajorToNewMajorValidationFlag = false;
	var dropMinorAcadPlanSlicedValue;
	var changedToNewAcadPlanSlicedValue;
	var hiddenNewMajorCodeForValidationSlicedValue;
	
	if(CurrentMajorToNewMajorCHK.value == "1" && DropMinorCHK.value == "1"){
			var dropMinorAcadPlanValue = DropMinorAcadPlan.value;
			dropMinorAcadPlanSlicedValue = dropMinorAcadPlanValue.slice(0, 6);
	}
	if(CurrentMajorToNewMajorCHK.value == "1" && ChangeMinorCHK.value == "1"){
			var changedToNewAcadPlanValue = ChangeCurrentMinorAcadPlan.value;
			changedToNewAcadPlanSlicedValue = changedToNewAcadPlanValue.slice(0, 6);
	}
  
  	if(ChangeCurrentMajorToNewMajorSignaturePanel.visible === false){
      
      if(this.value !== "Select Major/Concentration"){      
      
            $.ajax({

                  type: 'GET', 

                  url:"/bin/getAllMajorsCode",

                 data:  {					 
                           TrnscrDescr: program
                    },

                  dataType: 'json',

                  success: function(myresponse){
                          if(myresponse.length >= 1){
                                HiddenMinorToMajorCheckAcadPlan.value =  myresponse[0].ACAD_PLAN; 
                            	hiddenNewMajorCodeForValidation = HiddenMinorToMajorCheckAcadPlan.value; 
                            	hiddenNewMajorCodeForValidationSlicedValue = hiddenNewMajorCodeForValidation.slice(0,6);
                            	HiddenNewMajorAcadPlanForValidation.value = hiddenNewMajorCodeForValidationSlicedValue;
                          }
                    
						  var isPromptNeededMaj = false;
						  var isPromptNeededAdd = false;
						  var isPromptNeededMin = false;
						  var artBFAFlag = false;
						  var currentMinorToNewMajorValidationFlag = false;
                    	  var currentAdditionalMajorSlicedValue;
						  var currentCourseTypeAcadPlanList = document.querySelector(".checkMinorToMajor select");						
						  var newMajorCode = HiddenMinorToMajorCheckAcadPlan.value; 						
						  var newMajorCodeAfterSlice = newMajorCode.slice(0, 6);
						
						  for(var i=1;i<currentCourseTypeAcadPlanList.length; i++){							 
							  var allCourseTypes = currentCourseTypeAcadPlanList.options[i].value; 
							  
							  if(allCourseTypes.includes("maj")){									
									var allCourseTypesAfterSliceMaj = allCourseTypes.slice(0, 6);									
									if(allCourseTypesAfterSliceMaj == newMajorCodeAfterSlice){
										isPromptNeededMaj = true;											
										
									}
							  }
							  else if(allCourseTypes.includes("add")){									
									var allCourseTypesAfterSliceAdd = allCourseTypes.slice(0, 6);									
									if(allCourseTypesAfterSliceAdd == newMajorCodeAfterSlice){
										isPromptNeededAdd = true;											
										
									}
							  }
							  else if(allCourseTypes.includes("min")){									
									var allCourseTypesAfterSliceMin = allCourseTypes.slice(0, 6);									
									if(allCourseTypesAfterSliceMin == newMajorCodeAfterSlice){
										isPromptNeededMin = true;											
										
									}
							  }
						  }
                    	  
                    	  if(ChangeAdditionalMajorCHK.value == "1"){
                            	var currentAdditionalMajor = ChangeAdditionalCurrentMajorAcadCode.value;
                            	currentAdditionalMajorSlicedValue = currentAdditionalMajor.slice(0, 9);
                            	
                          }
						  if(CurrentMajorAcadPlanCode.value === "26ARTSUBA" && HiddenMinorToMajorCheckAcadPlan.value === "26ARTSUBFA"){
									artBFAFlag = true;											
										
						  }
                    	  if(currentAdditionalMajorSlicedValue == hiddenNewMajorCodeForValidation){
                            	currentAdditionalMajorToNewMajorValidationFlag = true;
                          }
						  
						  if((dropMinorAcadPlanSlicedValue || changedToNewAcadPlanSlicedValue) == hiddenNewMajorCodeForValidationSlicedValue){
								currentMinorToNewMajorValidationFlag = true;
						  }	
                    
                    	  //********************Validation for Chemistry BA & BS********************
                    	  var chemistryFlag = false;
                    	  if((CurrentMajorAcadPlanCode.value == "66CHEMUBS") && (HiddenMinorToMajorCheckAcadPlan.value == "66CHEMUBA")){ 
                              chemistryFlag = true; 
                          } 

                          else if((CurrentMajorAcadPlanCode.value == "66CHEMUBA") && (HiddenMinorToMajorCheckAcadPlan.value == "66CHEMUBS")){
                              chemistryFlag = true; 
                          }
						  //********************Validation for Chemistry BA & BS********************
                    	 
                    	  if(isPromptNeededMaj === true && that.value !== "Select Major/Concentration" && artBFAFlag === false && chemistryFlag === false){
							  that.value = "Select Major/Concentration"; 
                              showErrorModal("Alert!","Your current major/concentration is same as the new major/concentration");                              
                              NewMajorAcadPlanCode.value = null;
                              //alert("value matched");
                          }
                    	  else if((isPromptNeededAdd === true && that.value !== "Select Major/Concentration") && (that.value != ChangeAdditionalCurrentMajor.value) && DropSecondMajorCHK.value === null && currentAdditionalMajorToNewMajorValidationFlag === false){
							  that.value = "Select Major/Concentration"; 
                              showErrorModal("Alert!","Your current additional major/concentration(s) is same as the new major/concentration");
                              NewMajorAcadPlanCode.value = null;
                              //alert("value matched");
                          }
						  else if(that.value === AddSecondMajor.value && AddSecondMajor.value !== "Select Major/Concentration"){
								showErrorModal("Alert!","Your current major/concentration is same as the new additional major/concentration");
								that.value = "Select Major/Concentration"; 
								AddSecondMajorAcadCode.value = null;
						  }
						  else if(that.value === ChangeAdditionalNewMajor.value && ChangeAdditionalNewMajor.value !== "Select Major/Concentration"){
								showErrorModal("Alert!","Your current major/concentration is same as the new changed additional major/concentration");
								that.value = "Select Major/Concentration"; 
								AddSecondMajorAcadCode.value = null;
						  }
						  else if(isPromptNeededMin === true && that.value !== "Select Major/Concentration" && currentMinorToNewMajorValidationFlag === false){
							showErrorModal("Alert!","Please drop the minor before making this selection");
							that.value = "Select Major/Concentration"; 
							NewMajorAcadPlanCode.value = null;
							//alert("value matched");
						 }
						  else{
                              if(myresponse.length >= 1){
                                NewMajorAcadPlanCode.value = myresponse[0].ACAD_PLAN;
                              } 

                          $.ajax({

                                  type: 'GET', 

                                  url:"/bin/getChairDetails",

                                 data:  {					 
                                           Program: program
                                    },

                                  dataType: 'json',

                                  success: function(myresponse){
                                          if(myresponse.length >= 1){
                                                  HiddenChairEmailNewMajor.value = myresponse[0].CHAIR_EMAIL;
                                                  HiddenChairUserIDNewMajor.value = myresponse[0].CHAIR_USERID;
                                                  HiddenChairNameNewMajor.value = myresponse[0].CHAIR_EMPNAME;
                                                  HiddenDepartmentNameNewMajor.value = myresponse[0].DEPTNAME;
                                                  HiddenDpartmentIDNewMajor.value = myresponse[0].DEPTID;
                                            	  HiddenCollegeCodeNewMajor.value = myresponse[0].FUL_COLLEGE;
                                            if(program == "Urban Learning, BA."){
                                              HiddenChairEmailNewMajor.value = "clewischiu@FULLERTON.EDU";
                                              HiddenChairUserIDNewMajor.value = "clewischiu";
                                              HiddenChairNameNewMajor.value = "Calli Lewis Chiu";
                                            }
                                          }
                                          gifModal.style.display = "none";
                                  }
                          }); // end 1st ajax	
						}
                          gifModal.style.display = "none";
                  }
              }); // end 2nd ajax	
		}else{
          	gifModal.style.display = "none";
        }
      gifModal.style.display = "none";
    }
}



        }
	}
}
/**
 * @function blended_program_blended_program.generated_CurrentMajorAcadPlanCode_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_CurrentMajorAcadPlanCode_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_NewMajorAcadPlanCode_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_NewMajorAcadPlanCode_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_CurrentMajorConcentrationColumn_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_CurrentMajorConcentrationColumn_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_AddSecondMajorCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_AddSecondMajorCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){

	var gifModal = document.getElementById('gifModal');
	gifModal.style.display = "block";


  var acadProg = HiddenAcadProg.value;
  var acadPlanType = HiddenAcadPlanType.value;

  if(this.value !== null){
    ChangeAdditionalMajorCHK.value = null;
    AddSecondMajor.enabled = true;       

    $.ajax({

      type: 'GET', 

      url:"/bin/getAllAdditionalMajors",

      data:  {
        AcadProg: 'UGD' 
        
      },

      dataType: 'json',

      success: function(myresponse){

        gifModal.style.display = "none";

        if(myresponse.length >= 1){

          var additionalMajorList = document.querySelector(".newAdditionalMajor-list select");

          var length = additionalMajorList.options.length;					// Code For Clearing Primary Degree Objectives
          for (i = length; i > 0; i--) {
            additionalMajorList.options[i] = null;
          } 
          for(var i=0; i < myresponse.length; i++){
            var opt3 = document.createElement("option");
            opt3.value = myresponse[i].ALL_MAJORS;
            //alert("values are="+opt3.value);
            opt3.innerHTML = myresponse[i].ALL_MAJORS; 
            additionalMajorList.appendChild(opt3);
          }        

        }
      }
    });

  }else{
    gifModal.style.display = "none";
    AddSecondMajorAcadCode.value = null;
    AddSecondMajor.value = "Select Major/Concentration";
    AddSecondMajor.enabled = false;
  }
}

        }
	}
}
/**
 * @function blended_program_blended_program.generated_AddSecondMajor_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_AddSecondMajor_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_AddSecondMajor_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_AddSecondMajor_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
    var gifModal = document.getElementById('gifModal');
    gifModal.style.display = "block";
	var that = this;
	var program = this.value;
	var hiddenNewAdditionalMajorForValidationSlicedValue;
	var dropMinorAcadPlanSlicedValue;
	var changedToNewAcadPlanSlicedValue;
	
	if(AddSecondMajorCHK.value == "1" && DropMinorCHK.value == "1"){
			var dropMinorAcadPlanValue = DropMinorAcadPlan.value;
			dropMinorAcadPlanSlicedValue = dropMinorAcadPlanValue.slice(0, 6);
	}
	if(AddSecondMajorCHK.value == "1" && ChangeMinorCHK.value == "1"){
			var changedToNewAcadPlanValue = ChangeCurrentMinorAcadPlan.value;
			changedToNewAcadPlanSlicedValue = changedToNewAcadPlanValue.slice(0, 6);
	}
	
	if(ChangeCurrentMajorToNewMajorSignaturePanel.visible === false){
		
      if(this.value !== "Select Major/Concentration"){

				$.ajax({

					type: 'GET', 

					url:"/bin/getAllAdditionalMajorsCode",

				    data:  {					
							 TrnscrDescr: program
					  },

					dataType: 'json',

					success: function(myresponse){
						 if(myresponse.length >= 1){
                           HiddenNewAdditionalMajorConcentrationAcadPlanForMinor.value =  myresponse[0].ACAD_PLAN;						   
                           var hiddenNewAdditionalMajorForValidation = HiddenNewAdditionalMajorConcentrationAcadPlanForMinor.value; 
                           hiddenNewAdditionalMajorForValidationSlicedValue = hiddenNewAdditionalMajorForValidation.slice(0,6);
                           HiddenNewAdditionalMajorAcadPlanForValidation.value = hiddenNewAdditionalMajorForValidationSlicedValue;
                         }
						
						var isPromptNeededMaj = false;
						var isPromptNeededAdd = false;
						var isPromptNeededMin = false;
						var currentMinorToNewAdditionalMajorValidationFlag = false;
						var currentMinorAcadPlanList = document.querySelector(".checkMinorToMajor select");						
						var additionalNewMajorCode = HiddenNewAdditionalMajorConcentrationAcadPlanForMinor.value; 						
						var additionalNewMajorCodeAfterSlice = additionalNewMajorCode.slice(0, 6);
						
                        for(var i=1;i<currentMinorAcadPlanList.length; i++){							 
							  var allCourseTypes = currentMinorAcadPlanList.options[i].value; 
							  
							  if(allCourseTypes.includes("maj") && CurrentMajorToNewMajorCHK.value === null){									
									var allCourseTypesAfterSliceMaj = allCourseTypes.slice(0, 6);									
									if(allCourseTypesAfterSliceMaj == additionalNewMajorCodeAfterSlice){
										isPromptNeededMaj = true;											
										
									}
							  } 
							  if(allCourseTypes.includes("add")){									
									var allCourseTypesAfterSliceAdd = allCourseTypes.slice(0, 6);									
									if(allCourseTypesAfterSliceAdd == additionalNewMajorCodeAfterSlice){
										isPromptNeededAdd = true;											
										
									}
							  }
							  else if(allCourseTypes.includes("min")){									
									var allCourseTypesAfterSliceMin = allCourseTypes.slice(0, 6);									
									if(allCourseTypesAfterSliceMin == additionalNewMajorCodeAfterSlice){
										isPromptNeededMin = true;											
										
									}
							  }
						}
						
					if((dropMinorAcadPlanSlicedValue || changedToNewAcadPlanSlicedValue) == hiddenNewAdditionalMajorForValidationSlicedValue){
							currentMinorToNewAdditionalMajorValidationFlag = true;
					  }
						
						
					  
                     if(isPromptNeededMaj === true && that.value !== "Select Major/Concentration"){
							showErrorModal("Alert!","Your current major/concentration is same as the new additional major/concentration");
							that.value = "Select Major/Concentration"; 
							AddSecondMajorAcadCode.value = null;
                        //alert("value matched");
                      }
                      
                      if(that.value === NewMajor.value){
                        	showErrorModal("Alert!","Your current major/concentration is same as the new additional major/concentration");
							that.value = "Select Major/Concentration"; 
							AddSecondMajorAcadCode.value = null;
                      }
					  else if(isPromptNeededAdd === true && that.value !== "Select Major/Concentration"){
							showErrorModal("Alert!","Your current additional major/concentrations is same as the new additional major/concentration");
							that.value = "Select Major/Concentration"; 
							AddSecondMajorAcadCode.value = null;
                        //alert("value matched");
                      }
					 else if(isPromptNeededMin === true && that.value !== "Select Major/Concentration" && currentMinorToNewAdditionalMajorValidationFlag === false){
							showErrorModal("Alert!","Please drop the minor before making this selection");
							that.value = "Select Major/Concentration"; 
							AddSecondMajorAcadCode.value = null;
                        //alert("value matched");
                      }	  
					  else{
                        if(myresponse.length >= 1){
                          AddSecondMajorAcadCode.value = myresponse[0].ACAD_PLAN;
                        }	
							

						$.ajax({

							type: 'GET', 

							url:"/bin/getChairDetails",

						   data:  {                      
									 Program: program
							  },

							dataType: 'json',

							success: function(myresponse){
									if(myresponse.length >= 0){
										gifModal.style.display = "none";              	

										HiddenChairEmailSecondMajor.value = myresponse[0].CHAIR_EMAIL;
										HiddenChairUserIDSecondMajor.value = myresponse[0].CHAIR_USERID;
										HiddenChairNameSecondMajor.value = myresponse[0].CHAIR_EMPNAME;
										HiddenDepartmentNameSecondMajor.value = myresponse[0].DEPTNAME;
										HiddenDepartmentIDSecondMajor.value = myresponse[0].DEPTID; 
                                        HiddenCollegeCodeSecondMajor.value = myresponse[0].FUL_COLLEGE;
                                      if(program == "Urban Learning, BA."){
                                        HiddenChairEmailSecondMajor.value = "clewischiu@FULLERTON.EDU";
										HiddenChairUserIDSecondMajor.value = "clewischiu";
										HiddenChairNameSecondMajor.value = "Calli Lewis Chiu";
                                      }
									}
							}
						}); // end 1st ajax	
					  }
					}
				});
		  }
      }
        	gifModal.style.display = "none"; 
      
	}

			
	

        }
	}
}
/**
 * @function blended_program_blended_program.generated_AddSecondMajorAcadCode_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_AddSecondMajorAcadCode_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_studentCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_studentCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(typeOfForm.value == 1){
  this.visible = true;
  
}else{
  this.visible = false;
  
}
        }
	}
}
/**
 * @function blended_program_blended_program.generated_studentCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_studentCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == 1){
  StudentSignature.value = StudentFirstName.value + " " + StudentLastName.value;
  StudentSignature.enabled = false;
  
  if (StudentDate.value === null) {
        /*var dateString = new Date().toLocaleString("en-US", {
          timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).replace(/[^ -~]/g, '');
        var dateObject = new Date(dateString);
        var curyear = dateObject.getFullYear();
        var curyearMonth = dateObject.getMonth() + 1;
        var curyearDay = dateObject.getDate();
        var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
        StudentDate.value = d;*/
    	$.ajax({

            type: 'GET',
            url: "/bin/getLoggedInUserDetails",
            dataType: 'json',

            success: function(myresponse) {				
                //StudentSignature.value = myresponse.userName;
                StudentDate.value = myresponse.SERVER_DATE;
            },
            error: function(error) {
                alert("error block=" + error);
            }
      });
      StudentSignature.enabled = false;
    
  } else {
      StudentDate.enabled = false;
      StudentSignature.enabled = false;
  }
}else{
    StudentDate.value = null;
    StudentSignature.value = null;
}
        }
	}
}
/**
 * @function blended_program_blended_program.generated_StudentDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_StudentDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_DeptAdvisorSignature_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_DeptAdvisorSignature_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				UPDNameOne.value = userValue;
				UPDSignatureOne.value = userValue;
				UPDSignatureDateOne.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
	} else {
		UPDNameOne.value = "";
		UPDSignatureOne.value = "";
		UPDSignatureDateOne.value = "";
	}
        }
	}
}
/**
 * @function blended_program_blended_program.generated_AdvisorName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_AdvisorName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled=false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_AdvisorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_AdvisorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_AdvisorSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_AdvisorSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_DepartmentSignatureNewMajorConcentrationCHK_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_DepartmentSignatureNewMajorConcentrationCHK_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
             if(this.value == 1){
    
   DepartmentSignNewMajor.enabled = false;    
   DepartmentNameNewMajor.value = HiddenDepartmentNameNewMajor.value;
   
   if (DepartmentNewMajorDate.value === null) {
     /*var dateString = new Date().toLocaleString("en-US", {
                      timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
                  }).replace(/[^ -~]/g, '');
                  var dateObject = new Date(dateString);
                  var curyear = dateObject.getFullYear();
                  var curyearMonth = dateObject.getMonth() + 1;
                  var curyearDay = dateObject.getDate();
                  var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
                  DepartmentNewMajorDate.value = d;*/

       $.ajax({

         type: 'GET',
         url: "/bin/getLoggedInUserDetails",
         dataType: 'json',

         success: function(myresponse) {				
             DepartmentSignNewMajor.value = myresponse.userName;
           	 NewMajorSignatureApprovedBy.value = myresponse.userName;
             DepartmentNewMajorDate.value = myresponse.SERVER_DATE;
         },
         error: function(error) {
           alert("error block=" + error);
         }
       });
       DepartmentSignNewMajor.enabled = false;
     
   } else {
       DepartmentNewMajorDate.enabled = false;
       DepartmentSignNewMajor.enabled = false;
   }
 }else{
     DepartmentNewMajorDate.value = null;
     NewMajorSignatureApprovedBy.value = null;
     DepartmentSignNewMajor.value = null;
 }

        }
	}
}
/**
 * @function blended_program_blended_program.generated_DepartmentNewMajorDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_DepartmentNewMajorDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_UnitCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_UnitCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            	if (this.value == 1) {
if(StageIndicator.value == "ToRegistrationUnit" ){
   if (RegistrationUnitSignature.value === null) {           
            RegistrationUnitSignDate.enabled = false;

	   $.ajax({

			  type: 'GET',
			  url: "/bin/getLoggedInUserDetails",
			  dataType: 'json',

			  success: function(myresponse) {	
                var userValue = myresponse.userName;
				RegistrationUnitSignature.value = userValue;
				RegistrationUnitSignDate.value = myresponse.SERVER_DATE;		
                 //financialAidAssignee.value = myresponse.userId;
			  },
			  error: function(error) {
				alert("error block=" + error);
			  }  
			});
   }
}
	} else {
	     RegistrationUnitSignature.value = "";
		RegistrationUnitSignDate.value = "";
      //financialAidAssignee.value = "";
	}











        }
	}
}
/**
 * @function blended_program_blended_program.generated_RegistrationUnitSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_RegistrationUnitSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_RegistrationUnitSignDate_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_RegistrationUnitSignDate_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null && StageIndicator.value == "ToAppeals"){
var d = "";
const dt = new Date("2021-04-16"); 
 
var now = new Date(new Date().toISOString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).slice(0,10));
//test date
//now = new Date("2021-04-17"); 
  
if(now > dt){ 
now.setDate(now.getDate()+14);
now = new Date(now);
var curyear = now.getFullYear();
var curyearMonth = now.getMonth();
var curyearDay = now.getDate();
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
curyearMonth = monthNames[curyearMonth];
d = (curyearMonth + " " + curyearDay + "," + curyear);
}else{
d = "May 1, 2021";
}
DepositByDate.value = d;
 
}
        }
	}
}
/**
 * @function blended_program_blended_program.generated_HiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_HiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_LogUser_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_LogUser_init0 = function (scope) {
    with(this) {
        with(scope) {
            $.ajax({

    type: 'GET', 

    url:"/bin/getLoggedUserId",
    dataType: 'json',
    success: function(myresopnse){
        var userValue = myresopnse.userId;
        LogUser.value = userValue;

    },
    error: function(error){
    	alert("error block="+error);
    }
});
        }
	}
}
/**
 * @function blended_program_blended_program.generated_HiddenCurrentAdditionalMajorListwith9Chars_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_HiddenCurrentAdditionalMajorListwith9Chars_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_HiddenMinorToMajorCheck_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_HiddenMinorToMajorCheck_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_HiddenCurrentAdditionalMajor_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_HiddenCurrentAdditionalMajor_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function blended_program_blended_program.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
              getPdf();


function getPdf() {
    console.log("in view pdf");
  
    window.guideBridge.getDataXML({
        success: function(result) {
           console.log("in view pdf="+result.data);
            var jsonData = new FormData();
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/blended-program/blended-program');
            jsonData.append('fileName', "Blended Program");          
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
 * @function blended_program_blended_program.generated_saveguidedraft1574920589904_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_saveguidedraft1574920589904_click0 = function (scope) {
    with(this) {
        with(scope) {
            handleDraftSave(this);





        }
	}
}
/**
 * @function blended_program_blended_program.generated_submit1574920582933_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
blended_program_blended_program.generated_submit1574920582933_click0 = function (scope) {
    with(this) {
        with(scope) {
            
//EmailSubject.value = "Test - Blended Program";
guideBridge.submit();

        }
	}
}
