/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_caseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_caseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null && caseId.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getCaseID",
        dataType: 'json',
        success: function(myresponse) {
            caseId.value = myresponse.CASEID;
        },
    });
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_InitiatedDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_InitiatedDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if (StageIndicator.value === null) {
  /*  var dateString = new Date().toLocaleString("en-US", {
        timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
    }).replace(/[^ -~]/g, ' ');
    var dateObject = new Date(dateString);
    var curyear = dateObject.getFullYear();
    var curyearMonth = dateObject.getMonth() + 1;
    var curyearDay = dateObject.getDate();
    var d = (curyear + "-" + curyearMonth + "-" + curyearDay);*/
    this.value = getDateforAdaptiveForm();
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_headerItem17707102977111770710298925_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_headerItem17707102977111770710298925_init0 = function (scope) {
    with(this) {
        with(scope) {
            var time = [
  "12:00 AM","12:05 AM","12:10 AM","12:15 AM","12:20 AM","12:25 AM","12:30 AM","12:35 AM","12:40 AM","12:45 AM","12:50 AM","12:55 AM",
  "01:00 AM","01:05 AM","01:10 AM","01:15 AM","01:20 AM","01:25 AM","01:30 AM","01:35 AM","01:40 AM","01:45 AM","01:50 AM","01:55 AM",
  "02:00 AM","02:05 AM","02:10 AM","02:15 AM","02:20 AM","02:25 AM","02:30 AM","02:35 AM","02:40 AM","02:45 AM","02:50 AM","02:55 AM",
  "03:00 AM","03:05 AM","03:10 AM","03:15 AM","03:20 AM","03:25 AM","03:30 AM","03:35 AM","03:40 AM","03:45 AM","03:50 AM","03:55 AM",
  "04:00 AM","04:05 AM","04:10 AM","04:15 AM","04:20 AM","04:25 AM","04:30 AM","04:35 AM","04:40 AM","04:45 AM","04:50 AM","04:55 AM",
  "05:00 AM","05:05 AM","05:10 AM","05:15 AM","05:20 AM","05:25 AM","05:30 AM","05:35 AM","05:40 AM","05:45 AM","05:50 AM","05:55 AM",
  "06:00 AM","06:05 AM","06:10 AM","06:15 AM","06:20 AM","06:25 AM","06:30 AM","06:35 AM","06:40 AM","06:45 AM","06:50 AM","06:55 AM",
  "07:00 AM","07:05 AM","07:10 AM","07:15 AM","07:20 AM","07:25 AM","07:30 AM","07:35 AM","07:40 AM","07:45 AM","07:50 AM","07:55 AM",
  "08:00 AM","08:05 AM","08:10 AM","08:15 AM","08:20 AM","08:25 AM","08:30 AM","08:35 AM","08:40 AM","08:45 AM","08:50 AM","08:55 AM",
  "09:00 AM","09:05 AM","09:10 AM","09:15 AM","09:20 AM","09:25 AM","09:30 AM","09:35 AM","09:40 AM","09:45 AM","09:50 AM","09:55 AM",
  "10:00 AM","10:05 AM","10:10 AM","10:15 AM","10:20 AM","10:25 AM","10:30 AM","10:35 AM","10:40 AM","10:45 AM","10:50 AM","10:55 AM",
  "11:00 AM","11:05 AM","11:10 AM","11:15 AM","11:20 AM","11:25 AM","11:30 AM","11:35 AM","11:40 AM","11:45 AM","11:50 AM","11:55 AM",
  "12:00 PM","12:05 PM","12:10 PM","12:15 PM","12:20 PM","12:25 PM","12:30 PM","12:35 PM","12:40 PM","12:45 PM","12:50 PM","12:55 PM",
  "01:00 PM","01:05 PM","01:10 PM","01:15 PM","01:20 PM","01:25 PM","01:30 PM","01:35 PM","01:40 PM","01:45 PM","01:50 PM","01:55 PM",
  "02:00 PM","02:05 PM","02:10 PM","02:15 PM","02:20 PM","02:25 PM","02:30 PM","02:35 PM","02:40 PM","02:45 PM","02:50 PM","02:55 PM",
  "03:00 PM","03:05 PM","03:10 PM","03:15 PM","03:20 PM","03:25 PM","03:30 PM","03:35 PM","03:40 PM","03:45 PM","03:50 PM","03:55 PM",
  "04:00 PM","04:05 PM","04:10 PM","04:15 PM","04:20 PM","04:25 PM","04:30 PM","04:35 PM","04:40 PM","04:45 PM","04:50 PM","04:55 PM",
  "05:00 PM","05:05 PM","05:10 PM","05:15 PM","05:20 PM","05:25 PM","05:30 PM","05:35 PM","05:40 PM","05:45 PM","05:50 PM","05:55 PM",
  "06:00 PM","06:05 PM","06:10 PM","06:15 PM","06:20 PM","06:25 PM","06:30 PM","06:35 PM","06:40 PM","06:45 PM","06:50 PM","06:55 PM",
  "07:00 PM","07:05 PM","07:10 PM","07:15 PM","07:20 PM","07:25 PM","07:30 PM","07:35 PM","07:40 PM","07:45 PM","07:50 PM","07:55 PM",
  "08:00 PM","08:05 PM","08:10 PM","08:15 PM","08:20 PM","08:25 PM","08:30 PM","08:35 PM","08:40 PM","08:45 PM","08:50 PM","08:55 PM",
  "09:00 PM","09:05 PM","09:10 PM","09:15 PM","09:20 PM","09:25 PM","09:30 PM","09:35 PM","09:40 PM","09:45 PM","09:50 PM","09:55 PM",
  "10:00 PM","10:05 PM","10:10 PM","10:15 PM","10:20 PM","10:25 PM","10:30 PM","10:35 PM","10:40 PM","10:45 PM","10:50 PM","10:55 PM",
  "11:00 PM","11:05 PM","11:10 PM","11:15 PM","11:20 PM","11:25 PM","11:30 PM","11:35 PM","11:40 PM","11:45 PM","11:50 PM","11:55 PM"
]; 

this.items = time;

        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_headerItem17707108617751770710875284_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_headerItem17707108617751770710875284_init0 = function (scope) {
    with(this) {
        with(scope) {
            var time = [
  "12:00 AM","12:05 AM","12:10 AM","12:15 AM","12:20 AM","12:25 AM","12:30 AM","12:35 AM","12:40 AM","12:45 AM","12:50 AM","12:55 AM",
  "01:00 AM","01:05 AM","01:10 AM","01:15 AM","01:20 AM","01:25 AM","01:30 AM","01:35 AM","01:40 AM","01:45 AM","01:50 AM","01:55 AM",
  "02:00 AM","02:05 AM","02:10 AM","02:15 AM","02:20 AM","02:25 AM","02:30 AM","02:35 AM","02:40 AM","02:45 AM","02:50 AM","02:55 AM",
  "03:00 AM","03:05 AM","03:10 AM","03:15 AM","03:20 AM","03:25 AM","03:30 AM","03:35 AM","03:40 AM","03:45 AM","03:50 AM","03:55 AM",
  "04:00 AM","04:05 AM","04:10 AM","04:15 AM","04:20 AM","04:25 AM","04:30 AM","04:35 AM","04:40 AM","04:45 AM","04:50 AM","04:55 AM",
  "05:00 AM","05:05 AM","05:10 AM","05:15 AM","05:20 AM","05:25 AM","05:30 AM","05:35 AM","05:40 AM","05:45 AM","05:50 AM","05:55 AM",
  "06:00 AM","06:05 AM","06:10 AM","06:15 AM","06:20 AM","06:25 AM","06:30 AM","06:35 AM","06:40 AM","06:45 AM","06:50 AM","06:55 AM",
  "07:00 AM","07:05 AM","07:10 AM","07:15 AM","07:20 AM","07:25 AM","07:30 AM","07:35 AM","07:40 AM","07:45 AM","07:50 AM","07:55 AM",
  "08:00 AM","08:05 AM","08:10 AM","08:15 AM","08:20 AM","08:25 AM","08:30 AM","08:35 AM","08:40 AM","08:45 AM","08:50 AM","08:55 AM",
  "09:00 AM","09:05 AM","09:10 AM","09:15 AM","09:20 AM","09:25 AM","09:30 AM","09:35 AM","09:40 AM","09:45 AM","09:50 AM","09:55 AM",
  "10:00 AM","10:05 AM","10:10 AM","10:15 AM","10:20 AM","10:25 AM","10:30 AM","10:35 AM","10:40 AM","10:45 AM","10:50 AM","10:55 AM",
  "11:00 AM","11:05 AM","11:10 AM","11:15 AM","11:20 AM","11:25 AM","11:30 AM","11:35 AM","11:40 AM","11:45 AM","11:50 AM","11:55 AM",
  "12:00 PM","12:05 PM","12:10 PM","12:15 PM","12:20 PM","12:25 PM","12:30 PM","12:35 PM","12:40 PM","12:45 PM","12:50 PM","12:55 PM",
  "01:00 PM","01:05 PM","01:10 PM","01:15 PM","01:20 PM","01:25 PM","01:30 PM","01:35 PM","01:40 PM","01:45 PM","01:50 PM","01:55 PM",
  "02:00 PM","02:05 PM","02:10 PM","02:15 PM","02:20 PM","02:25 PM","02:30 PM","02:35 PM","02:40 PM","02:45 PM","02:50 PM","02:55 PM",
  "03:00 PM","03:05 PM","03:10 PM","03:15 PM","03:20 PM","03:25 PM","03:30 PM","03:35 PM","03:40 PM","03:45 PM","03:50 PM","03:55 PM",
  "04:00 PM","04:05 PM","04:10 PM","04:15 PM","04:20 PM","04:25 PM","04:30 PM","04:35 PM","04:40 PM","04:45 PM","04:50 PM","04:55 PM",
  "05:00 PM","05:05 PM","05:10 PM","05:15 PM","05:20 PM","05:25 PM","05:30 PM","05:35 PM","05:40 PM","05:45 PM","05:50 PM","05:55 PM",
  "06:00 PM","06:05 PM","06:10 PM","06:15 PM","06:20 PM","06:25 PM","06:30 PM","06:35 PM","06:40 PM","06:45 PM","06:50 PM","06:55 PM",
  "07:00 PM","07:05 PM","07:10 PM","07:15 PM","07:20 PM","07:25 PM","07:30 PM","07:35 PM","07:40 PM","07:45 PM","07:50 PM","07:55 PM",
  "08:00 PM","08:05 PM","08:10 PM","08:15 PM","08:20 PM","08:25 PM","08:30 PM","08:35 PM","08:40 PM","08:45 PM","08:50 PM","08:55 PM",
  "09:00 PM","09:05 PM","09:10 PM","09:15 PM","09:20 PM","09:25 PM","09:30 PM","09:35 PM","09:40 PM","09:45 PM","09:50 PM","09:55 PM",
  "10:00 PM","10:05 PM","10:10 PM","10:15 PM","10:20 PM","10:25 PM","10:30 PM","10:35 PM","10:40 PM","10:45 PM","10:50 PM","10:55 PM",
  "11:00 PM","11:05 PM","11:10 PM","11:15 PM","11:20 PM","11:25 PM","11:30 PM","11:35 PM","11:40 PM","11:45 PM","11:50 PM","11:55 PM"
]; 

this.items = time;

        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_headerItem17707113093511770711310548_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_headerItem17707113093511770711310548_init0 = function (scope) {
    with(this) {
        with(scope) {
            var time = [
  "12:00 AM","12:05 AM","12:10 AM","12:15 AM","12:20 AM","12:25 AM","12:30 AM","12:35 AM","12:40 AM","12:45 AM","12:50 AM","12:55 AM",
  "01:00 AM","01:05 AM","01:10 AM","01:15 AM","01:20 AM","01:25 AM","01:30 AM","01:35 AM","01:40 AM","01:45 AM","01:50 AM","01:55 AM",
  "02:00 AM","02:05 AM","02:10 AM","02:15 AM","02:20 AM","02:25 AM","02:30 AM","02:35 AM","02:40 AM","02:45 AM","02:50 AM","02:55 AM",
  "03:00 AM","03:05 AM","03:10 AM","03:15 AM","03:20 AM","03:25 AM","03:30 AM","03:35 AM","03:40 AM","03:45 AM","03:50 AM","03:55 AM",
  "04:00 AM","04:05 AM","04:10 AM","04:15 AM","04:20 AM","04:25 AM","04:30 AM","04:35 AM","04:40 AM","04:45 AM","04:50 AM","04:55 AM",
  "05:00 AM","05:05 AM","05:10 AM","05:15 AM","05:20 AM","05:25 AM","05:30 AM","05:35 AM","05:40 AM","05:45 AM","05:50 AM","05:55 AM",
  "06:00 AM","06:05 AM","06:10 AM","06:15 AM","06:20 AM","06:25 AM","06:30 AM","06:35 AM","06:40 AM","06:45 AM","06:50 AM","06:55 AM",
  "07:00 AM","07:05 AM","07:10 AM","07:15 AM","07:20 AM","07:25 AM","07:30 AM","07:35 AM","07:40 AM","07:45 AM","07:50 AM","07:55 AM",
  "08:00 AM","08:05 AM","08:10 AM","08:15 AM","08:20 AM","08:25 AM","08:30 AM","08:35 AM","08:40 AM","08:45 AM","08:50 AM","08:55 AM",
  "09:00 AM","09:05 AM","09:10 AM","09:15 AM","09:20 AM","09:25 AM","09:30 AM","09:35 AM","09:40 AM","09:45 AM","09:50 AM","09:55 AM",
  "10:00 AM","10:05 AM","10:10 AM","10:15 AM","10:20 AM","10:25 AM","10:30 AM","10:35 AM","10:40 AM","10:45 AM","10:50 AM","10:55 AM",
  "11:00 AM","11:05 AM","11:10 AM","11:15 AM","11:20 AM","11:25 AM","11:30 AM","11:35 AM","11:40 AM","11:45 AM","11:50 AM","11:55 AM",
  "12:00 PM","12:05 PM","12:10 PM","12:15 PM","12:20 PM","12:25 PM","12:30 PM","12:35 PM","12:40 PM","12:45 PM","12:50 PM","12:55 PM",
  "01:00 PM","01:05 PM","01:10 PM","01:15 PM","01:20 PM","01:25 PM","01:30 PM","01:35 PM","01:40 PM","01:45 PM","01:50 PM","01:55 PM",
  "02:00 PM","02:05 PM","02:10 PM","02:15 PM","02:20 PM","02:25 PM","02:30 PM","02:35 PM","02:40 PM","02:45 PM","02:50 PM","02:55 PM",
  "03:00 PM","03:05 PM","03:10 PM","03:15 PM","03:20 PM","03:25 PM","03:30 PM","03:35 PM","03:40 PM","03:45 PM","03:50 PM","03:55 PM",
  "04:00 PM","04:05 PM","04:10 PM","04:15 PM","04:20 PM","04:25 PM","04:30 PM","04:35 PM","04:40 PM","04:45 PM","04:50 PM","04:55 PM",
  "05:00 PM","05:05 PM","05:10 PM","05:15 PM","05:20 PM","05:25 PM","05:30 PM","05:35 PM","05:40 PM","05:45 PM","05:50 PM","05:55 PM",
  "06:00 PM","06:05 PM","06:10 PM","06:15 PM","06:20 PM","06:25 PM","06:30 PM","06:35 PM","06:40 PM","06:45 PM","06:50 PM","06:55 PM",
  "07:00 PM","07:05 PM","07:10 PM","07:15 PM","07:20 PM","07:25 PM","07:30 PM","07:35 PM","07:40 PM","07:45 PM","07:50 PM","07:55 PM",
  "08:00 PM","08:05 PM","08:10 PM","08:15 PM","08:20 PM","08:25 PM","08:30 PM","08:35 PM","08:40 PM","08:45 PM","08:50 PM","08:55 PM",
  "09:00 PM","09:05 PM","09:10 PM","09:15 PM","09:20 PM","09:25 PM","09:30 PM","09:35 PM","09:40 PM","09:45 PM","09:50 PM","09:55 PM",
  "10:00 PM","10:05 PM","10:10 PM","10:15 PM","10:20 PM","10:25 PM","10:30 PM","10:35 PM","10:40 PM","10:45 PM","10:50 PM","10:55 PM",
  "11:00 PM","11:05 PM","11:10 PM","11:15 PM","11:20 PM","11:25 PM","11:30 PM","11:35 PM","11:40 PM","11:45 PM","11:50 PM","11:55 PM"
]; 

this.items = time;

        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_button1770712666084_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_button1770712666084_click0 = function (scope) {
    with(this) {
        with(scope) {
            table1770710103374.Row1.instanceManager.addInstance(true);
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_button_4450687861770712768526_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_button_4450687861770712768526_click0 = function (scope) {
    with(this) {
        with(scope) {
            var rowcountRemoveAll1 = table1770710103374.Row1.instanceManager.instanceCount;

table1770710103374.Row1.instanceManager.removeInstance(rowcountRemoveAll1-1);
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_button_16436560871770821523852_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_button_16436560871770821523852_click0 = function (scope) {
    with(this) {
        with(scope) {
            AttendeePanel.instanceManager.addInstance(true);
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_button_15590356401770821558230_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_button_15590356401770821558230_click0 = function (scope) {
    with(this) {
        with(scope) {
            var rowcountRemoveAll1 = AttendeePanel.instanceManager.instanceCount;

AttendeePanel.instanceManager.removeInstance(rowcountRemoveAll1-1);
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_button1770808134244_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_button1770808134244_click0 = function (scope) {
    with(this) {
        with(scope) {
            table1770807691634.Row1.instanceManager.addInstance(true);
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_button_10473921801770808164970_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_button_10473921801770808164970_click0 = function (scope) {
    with(this) {
        with(scope) {
            var rowcountRemoveAll1 = table1770807691634.Row1.instanceManager.instanceCount;

table1770807691634.Row1.instanceManager.removeInstance(rowcountRemoveAll1-1);
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_SupportingDocumentsPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_SupportingDocumentsPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = true;
} else{
  this.visible = false;
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_supportDoc1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc1.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(supportDoc1.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        supportDoc1.fileAttachment.value = doc2NewName;
    }
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_supportDoc2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc2.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(supportDoc2.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        supportDoc2.fileAttachment.value = doc2NewName;
    }
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_supportDoc3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    var filePath = supportDoc3.fileAttachment.value;
    var extension = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
    extension = extension.toLowerCase();
    var format = /[`~*+:’'?<>-|.,&{}#!@$%^=;\[\]\s()]/;
    if (format.test(supportDoc3.fileAttachment.value) === true) {
        var doc2NewName = ((filePath.replace(/[.](?=.*[.])/g, "_")).replace(/\s+/g, '_')).replace(/`|’|~|\*|\+|\:|'|\?|<|>|\,|#|\(|\)|-|&|!|@|{|}|\$|%|\^|\;|\[|\]|=/g, '_');
        supportDoc3.fileAttachment.value = doc2NewName;
    }
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropiateRequestorCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropiateRequestorCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null || StageIndicator.value == "ToAppropriateRequestor") {
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				AppropriateRequestorSignature.value = userValue;
				AppropriateRequestorSignatureName.value = userValue;
				AppropriateRequestorSignatureDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
		AppropriateRequestorSignature.enabled = false;
		AppropriateRequestorSignatureDate.enabled = false;
	} else {
		AppropriateRequestorSignature.value = "";
		AppropriateRequestorSignatureName.value = "";
		AppropriateRequestorSignatureDate.value = "";
	}
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateRequestorSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateRequestorSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateRequestorSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateRequestorSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateReviewerCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateReviewerCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToAppropriateReviewer") {
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				AppropriateReviewerPrintName.value = userValue;
				AppropriateReviewerSignature.value = userValue;
				AppropriateReviewerSignatureDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
		AppropriateReviewerSignature.enabled = false;
		AppropriateReviewerSignatureDate.enabled = false;
	} else {
		AppropriateReviewerPrintName.value = "";
		AppropriateReviewerSignature.value = "";
		AppropriateReviewerSignatureDate.value = "";
	}
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateReviewerSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateReviewerSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateReviewerSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateReviewerSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateApproverCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateApproverCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToAppropriateApprover") {
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				AppropriateApproverPrintName.value = userValue;
				AppropriateApproverSignature.value = userValue;
				AppropriateApproverSignatureDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
		AppropriateApproverSignature.enabled = false;
		AppropriateApproverSignatureDate.enabled = false;
	} else {
		AppropriateApproverPrintName.value = "";
		AppropriateApproverSignature.value = "";
		AppropriateApproverSignatureDate.value = "";
	}
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateApproverSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateApproverSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateApproverSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AppropriateApproverSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AcademicAffairsCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AcademicAffairsCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToAcademicAffairs") {
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				AcademicAffairsPrintName.value = userValue;
				AcademicAffairsSignature.value = userValue;
				AcademicAffairsSignatureDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
		AcademicAffairsSignature.enabled = false;
		AcademicAffairsSignatureDate.enabled = false;
	} else {
		AcademicAffairsPrintName.value = "";
		AcademicAffairsSignature.value = "";
		AcademicAffairsSignatureDate.value = "";
	}
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AcademicAffairsSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AcademicAffairsSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AcademicAffairsSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_AcademicAffairsSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_CompensationServicesCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_CompensationServicesCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToCompensationServices") {
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				CompensationServicesPrintName.value = userValue;
				CompensationServicesSignature.value = userValue;
				CompensationServicesSignatureDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
		CompensationServicesSignature.enabled = false;
		CompensationServicesSignatureDate.enabled = false;
	} else {
		CompensationServicesPrintName.value = "";
		CompensationServicesSignature.value = "";
		CompensationServicesSignatureDate.value = "";
	}
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_CompensationServicesSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_CompensationServicesSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_CompensationServicesSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_CompensationServicesSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_PositionManagementCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_PositionManagementCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value == "ToPositionManagement") {
	if (this.value == 1) {
		$.ajax({
			type: 'GET',
			url: "/bin/getLoggedInUserDetails",
			dataType: 'json',
			success: function(myresponse) {
				var userValue = myresponse.userName;
				PositionManagementPrintName.value = userValue;
				PositionManagementSignature.value = userValue;
				PositionManagementSignatureDate.value = myresponse.SERVER_DATE;
			},
			error: function(error) {
				alert("error block=" + error);
			}
		});
		PositionManagementSignature.enabled = false;
		PositionManagementSignatureDate.enabled = false;
	} else {
		PositionManagementPrintName.value = "";
		PositionManagementSignature.value = "";
		PositionManagementSignatureDate.value = "";
	}
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_PositionManagementSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_PositionManagementSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_PositionManagementSignatureDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_PositionManagementSignatureDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_LoadingFlag_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_LoadingFlag_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToAppropriateRequestor" || StageIndicator.value == "ToAppropriateApprover" || StageIndicator.value == "ToAcademicAffairs" || StageIndicator.value == "ToPositionManagement" || StageIndicator.value == "ToAppropriateReviewer"){
  this.value = "true";
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_SaveFlag_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_SaveFlag_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.value = "false";
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_MPPSectionDisplay_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_MPPSectionDisplay_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value !== null) {
    if (this.value == "Yes") {
        tableItem17314955492911731495550851.visible = true;
        TOneMPPCodeCurrent.visible = true;
        TOneMPPCodeNew.visible = true;
        tableItem17314956341411731495635773.visible = true;
        TOneCOICurrent.visible = true;
        TOneCOINew.visible = true;
    } else {
        tableItem17314955492911731495550851.visible = false;
        TOneMPPCodeCurrent.visible = false;
        TOneMPPCodeNew.visible = false;
        tableItem17314956341411731495635773.visible = false;
        TOneCOICurrent.visible = false;
        TOneCOINew.visible = false;
    }
}

if(this.value !== null && StageIndicator.value === null){
  if (this.value == "Yes") {
        tableItem17314955492911731495550851.visible = true;
        TOneMPPCodeCurrent.visible = true;
        TOneMPPCodeNew.visible = true;
        tableItem17314956341411731495635773.visible = true;
        TOneCOICurrent.visible = true;
        TOneCOINew.visible = true;
    } else {
        tableItem17314955492911731495550851.visible = false;
        TOneMPPCodeCurrent.visible = false;
        TOneMPPCodeNew.visible = false;
        tableItem17314956341411731495635773.visible = false;
        TOneCOICurrent.visible = false;
        TOneCOINew.visible = false;
    }
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_generateDOR_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_generateDOR_click0 = function (scope) {
    with(this) {
        with(scope) {
            
     getPdf();


function getPdf() {
  debugger;
    console.log("in view pdf");
    window.guideBridge.getDataXML({
        success: function(result) {
            var jsonData = new FormData();
            console.log("xml=" + result.data);
            jsonData.append('data', result.data.replace(/&amp;/g, 'and'));
            jsonData.append('formPath', '/content/forms/af/president-event-attendance-request-form/president-event-attendance-request-form---copy');
            //jsonData.append('fileName', FirstName.value + "_" + LastName.value + "(" + EmplId.value + ")" + "_" + Date.now());
            jsonData.append('fileName', "Position Action Form");
            console.log("jsonData: " + jsonData);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/bin/getDoR', true);
            xhr.responseType = 'blob';
            xhr.send(jsonData);
            xhr.onload = function() {
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
                            blob = new File([this.response], filename, {
                                type: type
                            });
                        } catch (e) {
                            /* Edge */ }
                    }
                    if (typeof blob === 'undefined') {
                        blob = new Blob([this.response], {
                            type: type
                        });
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
                        setTimeout(function() {
                            URL.revokeObjectURL(downloadUrl);
                        }, 100); // cleanup
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
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_saveguidedraft1698166452129_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_saveguidedraft1698166452129_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  SaveFlag.value = "true";
  handleDraftSave(this);
}
        }
	}
}
/**
 * @function president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_submit1575264176703_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
president_event_attendance_request_form_president_event_attendance_request_form___copy.generated_submit1575264176703_click0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  aftiaDescCWID.value = AppropriateRequestorName.value+" "+AppropriateRequestorCWID.value;
  EmailSubject.value = "Test - Position Action Form - "+caseId.value;
  FinalEmailSubject.value = "Test - Position Action Form - Completed ("+caseId.value+", "+DepartmentId.value+")"; 
  PositionManagementEmailSubject.value = "Test - Position Action Form - Position Management Review ("+caseId.value+")"; 
  AppropriateApproverEmailSubject.value = "Test - Position Action Form - Division MPP Review ("+caseId.value+")";
  AppropriateRequestorEmailSubject.value = "Test - Position Action Form - Requestor Review ("+caseId.value+")";
  AppropriateReviewerEmailSubject.value = "Test - Position Action Form - Division Reviewer Review ("+caseId.value+")";
  CompensationServicesEmailSubject.value = "Test - Position Action Form - Compensation Services Review ("+caseId.value+")";

}

AppropriateRequestorEmailId.value = "krcook@fullerton.edu";
AppropriateReviewerEmailId.value = "krcook@fullerton.edu";
AppropriateApproverEmailId.value = "krcook@fullerton.edu";


var flag = "1";

if(RequestType.value !== null){
   flag = "0";
} else{
  showErrorModal("Alert!", "Please select request type");
  flag = "1";
}

if(RequestType.value !== null && flag == "0"){
  if(PositionNumberValidationCheck.value == "N" && RequestType.value != "Create a New Position Number" && RequestType.value != "Create New Temporary Transition MPP Position Number"){
  showErrorModal("Alert!", "Please enter Valid Position Number in current attributes");
    flag = "1";
} else{
  flag = "0";
}
}

if(RequestType.value !== null && flag == "0" && TOneJobCodeNew.value !== null){
  var jobCodeArray = ['3318', '3312', '3306', '3300'];
  var jobCodeVal = TOneJobCodeNew.value;
  if(RequestType.value == "Create a New Position Number" && jobCodeArray.includes(jobCodeVal) && supportDoc1.value === "" && supportDoc2.value === "" && supportDoc3.value === ""){
  showErrorModal("Alert!", "Please attach Position Description document");
     guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].MainPanel[0].SupportingDocumentsPanel[0].supportDoc1[0]");
    flag = "1";
} else{
  flag = "0";
}
}



var initiator = workflow_initiator.value;
var appropriateApprovers = ["tgarcia","jvarreola","rconran-dunham","rscialdone","mabadal","litran","ceforgues"]; 
var appropriateReviewers = ["mepacheco","erochoa","dchow"];
var academicAffairsReviewers = ["rcrew","aadamson","tzanias","blivictorino"];
var arr = JSON.parse(SupervisorMppConsolidatedArray.value); 
var positionNumber = TOnePositionNumberCurrent.value;
var academicAffairsApproverFlag = "";
var appropriateApproverInitiatorFlag = "";
var appropriateReviewerInitiatorFlag = "";

//if(RequestType.value != "Create a New Position Number" && RequestType.value != "Create New Temporary Transition MPP Position Number"){
if(RequestType.value == "Update Position Number" || RequestType.value == "Inactivate Position"){
  if(TOneJobCodeCurrent.value !== null){
    if(TOneJobCodeCurrent.value == "3318" || TOneJobCodeCurrent.value == "3312" || TOneJobCodeCurrent.value == "3306" || TOneJobCodeCurrent.value == "3300"){
      MPPorStaffFlag.value = "mpp";
    } else{
      MPPorStaffFlag.value = "staff";
    }
  }else{
    MPPorStaffFlag.value = "staff";
  }
/*  MPPorStaffFlag.value = "";
  for(var i=0; i<arr.length; i++){
    if(arr[i].POSITION_NBR == positionNumber){
      MPPorStaffFlag.value = "mpp";
      break;
    }
  }
  if(MPPorStaffFlag.value === null){
     MPPorStaffFlag.value = "staff";
  }
  */
}else if(RequestType.value == "Create a New Position Number") {
	if(TOneJobCodeNew.value !== null){
		if(TOneJobCodeNew.value == "3318" || TOneJobCodeNew.value == "3312" || TOneJobCodeNew.value == "3306" || TOneJobCodeNew.value == "3300"){
			MPPorStaffFlag.value = "mpp";
		} else{
		    MPPorStaffFlag.value = "staff";
		}
	}else{
		 MPPorStaffFlag.value = "staff";
	} 
}else if(RequestType.value == "Create New Temporary Transition MPP Position Number"){
  MPPorStaffFlag.value = "mpp";
}else{
  MPPorStaffFlag.value = "staff";
}

if(appropriateApprovers.includes(initiator.toLowerCase())){
  appropriateApproverInitiatorFlag = "true";
} else{
  appropriateApproverInitiatorFlag = "false";
}

if(appropriateReviewers.includes(initiator.toLowerCase())){
  appropriateReviewerInitiatorFlag = "true";
} else{
  appropriateReviewerInitiatorFlag = "false";
}

if(academicAffairsReviewers.includes(initiator.toLowerCase())){
  academicAffairsApproverFlag = "true";
} else{
  academicAffairsApproverFlag = "false";
}

if((DivisionId.value == "10131" || DivisionId.value == "10236" || DivisionId.value == "10141") && appropriateReviewerInitiatorFlag == "false"){
  AppropriateReviewerFlag.value = "true";
} else{
   AppropriateReviewerFlag.value = "false";
}
if(DivisionId.value != "10237" && appropriateApproverInitiatorFlag == "false"){
  AppropriateApproverFlag.value = "true";
} else{
   AppropriateApproverFlag.value = "false";
}


if(DivisionId.value == "10237" && academicAffairsApproverFlag == "true"){
  RoutingFlag.value = "3"; 
} else if(DivisionId.value == "10237" && academicAffairsApproverFlag == "false"){
  RoutingFlag.value = "2"; 
} else if(DivisionId.value != "10131" && DivisionId.value != "10236" && DivisionId.value != "10141" && DivisionId.value != "10237" && AppropriateApproverFlag.value == "false"){
  RoutingFlag.value = "3"; 
} else if (DivisionId.value == "10131" && DivisionId.value == "10236" && DivisionId.value == "10141"){
  RoutingFlag.value = "1"; 
} else if(DivisionId.value != "10237"){
  RoutingFlag.value = "1"; 
} 

if(AppropriateReviewerFlag.value == "true" && AppropriateApproverFlag.value == "false" && MPPorStaffFlag.value == "staff"){
  PositionManagementReviewStepFlag.value = "1";
} else if (AppropriateReviewerFlag.value == "true" && AppropriateApproverFlag.value == "false" && MPPorStaffFlag.value == "mpp"){
  PositionManagementReviewStepFlag.value = "2";
} else if (AppropriateReviewerFlag.value == "false" && AppropriateApproverFlag.value == "true" && MPPorStaffFlag.value == "staff"){
  PositionManagementReviewStepFlag.value = "3";
} else if (AppropriateReviewerFlag.value == "false" && AppropriateApproverFlag.value == "true" && MPPorStaffFlag.value == "mpp"){
  PositionManagementReviewStepFlag.value = "4";
} else if (AppropriateReviewerFlag.value == "true" && AppropriateApproverFlag.value == "true" && MPPorStaffFlag.value == "staff"){
  PositionManagementReviewStepFlag.value = "5";
} else if (AppropriateReviewerFlag.value == "true" && AppropriateApproverFlag.value == "true" && MPPorStaffFlag.value == "mpp"){
  PositionManagementReviewStepFlag.value = "6";
}


if(flag == "0"){
   guideBridge.submit();
}

  


  



        }
	}
}
