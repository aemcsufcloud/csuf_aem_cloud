/**
 * @function sftp_credentials_update_nacha_sftp_credentials_update_form.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sftp_credentials_update_nacha_sftp_credentials_update_form.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            $.ajax({
        type: 'GET',
        url: "/bin/getLoggedInUserDetails",
        dataType: 'json',
        success: function(myresopnse) {
            var userValue = myresopnse.userId;
          if(userValue == 'nvadlakunta'){
            getKey();
          } else{
            showErrorModal("Alert!", "This form is for authorized personnel only");
            setTimeout(function() {
   window.close();
}, 5000);
          }
        },
  error: function(error){
    showErrorModal("Alert!", "Something went wrong");
  }
});
function getKey(){
$.ajax({
    type: 'POST',
    url: '/bin/getNACHACredentialsData',
    data: {
        action: "SFTP_KEY"
    },
    dataType: 'json',
    success: function(myresponse) {
      if(myresponse.length !== 0){
        getCredentials(myresponse[0].KEY);
      }
    },
    error: function(error) {
        alert("error block=" + error);
    }
});
}

function getCredentials(key){
  $.ajax({
    type: 'POST',
    url: '/bin/getNACHACredentialsData',
    data: {
        action: "SFTP_CREDENTIALS_LOOKUP"
    },
    dataType: 'json',
    success: function(myresponse) {
      if(myresponse.length !== 0){
        Port.value = myresponse[0].PORT;
        UserName.value = myresponse[0].USER_NAME;
          Host.value = myresponse[0].HOST;
          Path.value = myresponse[0].PATH;
      /*  var decryptedBase64 = base64Decode(myresponse[0].PASSWORD);
        var decrypted = xorEncryptDecrypt(decryptedBase64, key);
        Password.value = decrypted;*/
      }
    },
    error: function(error) {
        alert("error block=" + error);
    }
});
}

function xorEncryptDecrypt(input, key) {
            var output = '';
            for (var i = 0; i < input.length; i++) {
                output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            }
            return output;
        } 

function base64Decode(str) {
            return window.atob(str);
        }



        }
	}
}
/**
 * @function sftp_credentials_update_nacha_sftp_credentials_update_form.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sftp_credentials_update_nacha_sftp_credentials_update_form.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            disabledCutCopyPasteFunctionality();
        }
	}
}
/**
 * @function sftp_credentials_update_nacha_sftp_credentials_update_form.generated_button1724327552246_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sftp_credentials_update_nacha_sftp_credentials_update_form.generated_button1724327552246_click0 = function (scope) {
    with(this) {
        with(scope) {
             window.close();
        }
	}
}
/**
 * @function sftp_credentials_update_nacha_sftp_credentials_update_form.generated_statustext_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sftp_credentials_update_nacha_sftp_credentials_update_form.generated_statustext_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function sftp_credentials_update_nacha_sftp_credentials_update_form.generated_closeButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sftp_credentials_update_nacha_sftp_credentials_update_form.generated_closeButton_click0 = function (scope) {
    with(this) {
        with(scope) {
             window.close();
        }
	}
}
/**
 * @function sftp_credentials_update_nacha_sftp_credentials_update_form.generated_UpdateCredentialsButton_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
sftp_credentials_update_nacha_sftp_credentials_update_form.generated_UpdateCredentialsButton_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(Port.value === null || UserName.value === null || Password.value === null || ConfirmPassword.value === null || Path.value === null || Host.value === null){
  //showErrorModal("Alert!", "Please update all the fields");
  var errorList = []; // Array to collect validation errors

    // Call the GuideBridge API to validate fields
    var isValid = guideBridge.validate(errorList);
  console.log(isValid);
} else if(Password.value != ConfirmPassword.value){
  showErrorModal("Alert!", "Password and Confirm Password fields are not matching");
} else{
  usercheck();
}
function usercheck(){
$.ajax({
        type: 'GET',
        url: "/bin/getLoggedInUserDetails",
        dataType: 'json',
        success: function(myresopnse) {
            var userValue = myresopnse.userId;
          if(userValue == 'nvadlakunta'){
            getKey();
          } else{
            showErrorModal("Alert!", "This form is for authorized personnel only");
            setTimeout(function() {
   window.close();
}, 5000);
          }
        },
  error: function(error){
    showErrorModal("Alert!", "Something went wrong");
  }
});
}
function getKey(){
$.ajax({
    type: 'POST',
    url: '/bin/getNACHACredentialsData',
    data: {
        action: "SFTP_KEY"
    },
    dataType: 'json',
    success: function(myresponse) {
      if(myresponse.length !== 0){
        savedata(myresponse[0].KEY);
      }
    },
    error: function(error) {
        alert("error block=" + error);
    }
});
}
function savedata(key){
var sheet = [];
sheet[0] = {};
sheet[0].Port = Port.value;
sheet[0].UserName = UserName.value;
  var encrypted = xorEncryptDecrypt(Password.value, key);
sheet[0].Password = base64Encode(encrypted);
sheet[0].Path = Path.value;
sheet[0].Host = Host.value;
var data = JSON.stringify(sheet);
  $.ajax({
    type: 'POST',
    url: '/bin/getNACHACredentialsData',
    data: {
        action: "SFTP_CREDENTIALS_UPDATE",
      jsonArray:data
    },
    dataType: 'json',
    success: function(myresponse) {
      if(myresponse.length !== 0){
       if(myresponse[0].Status == "success"){
         $("#updateStatus").html('<p style="color: green; font-size: 16px; font-weight: bold; margin: 10px 0;">Updated credentials successfully!</p>');
         statustext.visible = true;
       } else{
          $("#updateStatus").html('<p style="color: red; font-size: 16px; font-weight: bold; margin: 10px 0;">Credentials update failed.</p>');
         statustext.visible = true;
       }
      } else{
         $("#updateStatus").html('<p style="color: red; font-size: 16px; font-weight: bold; margin: 10px 0;">Credentials update failed.</p>');
        statustext.visible = true;
      }
    },
    error: function(error) {
        alert("error block=" + error);
    }
});
  }

function xorEncryptDecrypt(input, key) {
            var output = '';
            for (var i = 0; i < input.length; i++) {
                output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            }
            return output;
        }

        // Base64 encode
        function base64Encode(str) {
            return window.btoa(str);
        }


        }
	}
}
