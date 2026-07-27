/**
 * @function appeals_form_appeals.generated_guideRootPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_guideRootPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  AppealsSignaturePanel.visible = false;
  Term.enabled = false;
}
if(StageIndicator.value == "ToAppeals"){
 UnofficialTranscriptDoc.fileAttachment.mandatory= "";
  basicInformation.enabled = true;
  reasonForAppeal.enabled = false;
  PersonalStatement.enabled = false;
  supportingDocs.enabled = false;
  applicantSignaturePanel.enabled = false;
  AppealsSignaturePanel.visible = true; 
  AppealsSignaturePanel.enabled = true;
  
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_guideRootPanel_init1
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_guideRootPanel_init1 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null) {
    $.ajax({
        type: 'GET',
        url: "/bin/getLoggedUserId",
        dataType: 'json',
        success: function(myresopnse) {
            gifModal.style.display = "block";
            var userValue = myresopnse.userId;
            var userID = "angellr2007";
            workflow_initiator.value = userValue;
            StudentUserId.value = userValue;
            $.ajax({
                type: 'GET',
                url: "/bin/getAppealData",
                data: {
                    student_userid: userID,
                },
                dataType: 'json',

                success: function(myresopnse) {

                    var modal = document.getElementById('myModal');
                    var span = document.getElementsByClassName("close")[0];
                    var gifModal = document.getElementById('gifModal');
                    if (myresopnse.length == 1) {
                        getData(myresopnse);
                    } else if (myresopnse.length > 1) {
                        getMultipleTermData(myresopnse);
                    } else {
                        gifModal.style.display = "none";
                        showErrorModal("Alert!", "At this time you are unable to submit an appeal, please wait until you have received your email notification of your withdrawal or denial, and your application status has been updated.");
                    }



                }
            });
        }

    });
}

function getData(resultSet) {
    if (resultSet[0].ACAD_CAREER == "UGRD") {
        if (resultSet[0].PROG_ACTION == "DENY" || resultSet[0].PROG_ACTION == "WAPP" || resultSet[0].PROG_ACTION == "WADM") {
            // /*
            $.ajax({
                type: 'GET',
                url: "/bin/appealsServlet",
                data: {
                    cwid: resultSet[0].CWID,
                    term: (resultSet[0].ADMIT_TERM_DESCR).trim(),
                    action: "APPEALS_SUBMISSION_DATA"
                },
                dataType: 'json',

                success: function(result) {
                  //var duplicateVal = duplicateSubmissionandDeadlineExemption(resultSet[0].CWID);
                  var duplicateVal = "true";
                    if (result.length === 0 || duplicateVal  == "true") {
                        // */
                        var cwid = resultSet[0].CWID;
                        deadlineDate.value = resultSet[0].APPL_STATUS_DT;
                        applStatusDt.value = resultSet[0].APPL_STATUS_DT;
                        /*var now = new Date(new Date().toISOString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).slice(0,10));
                        var deadlineDt= new Date(deadlineDate.value);*/

                        if (deadlineDate !== "") {
                            //var res = checkStudents(cwid);
                            //var resVal = checkExceptionalStudents(cwid);
                            var specResVal = checkStudentsSpecialRequest(cwid);
                            /*var diff = Math.abs(now - deadlineDt);
                            var difference_In_Days = diff / (1000 * 3600 * 24);*/
                            // if ((resultSet[0].DIFF_DAYS) <= 31) {
                      /*      if ((res == "false" && resultSet[0].DIFF_DAYS <= 31) || (res == "true" && new Date(Today_Dt.value) < new Date(deadline_dt_1.value)) || (resVal == "true" && resultSet[0].DIFF_DAYS <= 33) || specResVal == "true") {*/
                            if(resultSet[0].DIFF_DAYS <= 50000 || specResVal == "true" || duplicateVal  == "true"){
                                CSUStudentEmail.value = resultSet[0].STUDENT_EMAIL.trim();
                                ApplicantFirstName.value = resultSet[0].STUDENT_FIRSTNAME.trim();
                                ApplicantLastName.value = resultSet[0].STUDENT_LASTNAME.trim();
                                Term.value = resultSet[0].ADMIT_TERM_DESCR;
                                TermCode.value = resultSet[0].ADMIT_TERM;
                                if (resultSet[0].STUDENT_STATUS == "TRANSFER") {
                                    AppealCB3.value = "1";
                                }
                                if (resultSet[0].STUDENT_STATUS == "FRESHMEN") {
                                    AppealCB1.value = "1";
                                }
                                if (resultSet[0].STUDENT_STATUS == "RETURNING") {
                                    AppealCB2.value = "1";
                                }
                                StudentMajor.value = resultSet[0].MAJOR;
                                /*if(resultSet[0].APPEAL_REASON == "Request for Reevaluation of Denied Admission"){
                                 AppealReason1.value = "1";
                               } if(resultSet[0].APPEAL_REASON == "Request for Reevaluation for Admission Rescind"){
                                 AppealReason2.value = "1";
                               }
                                if(resultSet[0].APPEAL_REASON == "Missed Initial Transcript Deadline"){
                                 AppealReason3.value = "1";
                               }
                                if(resultSet[0].APPEAL_REASON == "Enrollment Deposit Deadline/Accept Offer"){
                                 AppealReason4.value = "1";
                               } if(resultSet[0].APPEAL_REASON == "Final Transcript Deadline"){
                                 AppealReason5.value = "1";
                               }
                                if(resultSet[0].APPEAL_REASON == "Missed Waitlist Offer Deadline"){
                                 AppealReason6.value = "1";
                               }*/
                                TelNumber.value = resultSet[0].STUDENT_CELL_PHONE.trim();
                                ApplicantName.value = resultSet[0].STUDENT_NAME.trim();
                                CWID.value = resultSet[0].CWID;
                                CSUStudentEmail.value = "csufaemform@gmail.com";
                                PersonalStudentEmail.value = "csufaemform@gmail.com";
                            } else {
                                showErrorModal("Alert!", "Thank for your interest in Cal State Fullerton, however more than 20 business days have lapsed since your email notification, and you are no longer eligible to submit an appeal.");
                            }
                        }
                        // /*
                    } else {
                        showErrorModal("Alert!", "Please beware that you are launching another request for the same academic term. Your current status at Cal State Fullerton does not allow you to submit an appeal");
                    }
                }
            });
            //  */

        } else {
            showErrorModal("Alert!", "Your current admission status at Cal State Fullerton does not allow you to submit an appeal. Appeals are reserved for applicants that have been denied or withdrawn.");
        }
    } else {
        var url = "http://www.fullerton.edu/graduate/";
        showTextErrorModal("Alert!", "All Graduate applicants who would like to submit an appeal will need to contact the ", ". Credential and 2nd bachelor applicants (nursing only) should consult their advisor for appeal information. ", url);
    }
    gifModal.style.display = "none";
}

function getMultipleTermData(resultData) {
    var modal = document.getElementById('myModal');
    gifModal.style.display = "none";
    modal.style.display = "block";

    var col = [];

    col.push("STUDENT_FIRSTNAME");

    col.push("STUDENT_LASTNAME");

    col.push("CWID");

    col.push("ACAD_CAREER");

    col.push("ADMIT_TERM_DESCR");
    var table = document.createElement("table");
    table.id = "tb";
    var tr = table.insertRow(-1);
    var headings = ["", "First Name", "Last Name", "CWID", "ACAD_CAREER", "Term"];
    for (var j = 0; j < headings.length; j++) {
        var th = document.createElement("th");
        th.innerHTML = headings[j];
        tr.appendChild(th);
    }
    for (var k = 0; k < resultData.length; k++) {
        tr = table.insertRow(-1);
        // tr.appendChild('<td><input type = "radio"  class = "rb" name="group" value = ""> </td>');
        var button = document.createElement("input");
        button.type = "radio";
        button.setAttribute("class", "rb");
        button.id = "rbtn";
        button.name = "group";
        button.value = "";

        var tabCell1 = tr.insertCell(-1);
        tabCell1.appendChild(button);
        for (var l = 0; l < col.length; l++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = resultData[k][col[l]];
        }
    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    var footerModal = document.getElementById("modal_footer");
    var okButton = document.createElement("input");
    okButton.type = "button";
    okButton.setAttribute("class", "okBtn");

    okButton.value = "Ok";
    okButton.onclick = function(event) {

        var n;
        var rButtonStatus;
        var rButtons = document.getElementsByClassName("rb");
        for (n = 0; n < rButtons.length; n++) {
            if (rButtons[n].checked === false) {

                rButtonStatus = false;
            } else {

                if (resultData[n].ACAD_CAREER == "UGRD") {
                    if (resultData[n].PROG_ACTION == "DENY" || resultData[n].PROG_ACTION == "WAPP" || resultData[n].PROG_ACTION == "WADM") {
                        $.ajax({
                            type: 'GET',
                            url: "/bin/appealsServlet",
                            data: {
                                cwid: resultData[n].CWID,
                                term: (resultData[n].ADMIT_TERM_DESCR).trim(),
                                action: "APPEALS_SUBMISSION_DATA"
                            },
                            dataType: 'json',

                            success: function(result) {
                            var duplicateVal = duplicateSubmissionandDeadlineExemption(resultData[n].CWID);
                                //if (result.length < 1) {
                                if (result.length === 0 || duplicateVal == "true") {
                                    deadlineDate.value = resultData[n].APPL_STATUS_DT;
                                    applStatusDt.value = resultData[n].APPL_STATUS_DT;
                                    var cwidVal = resultData[n].CWID;
                                    var specResVal = checkStudentsSpecialRequest(cwidVal);

                                    if (deadlineDate !== "") {
                                        if ((resultData[n].DIFF_DAYS) <= 20 || specResVal == "true" || duplicateVal == "true") {
                                            CSUStudentEmail.value = resultData[n].STUDENT_EMAIL.trim();
                                            ApplicantFirstName.value = resultData[n].STUDENT_FIRSTNAME.trim();
                                            ApplicantLastName.value = resultData[n].STUDENT_LASTNAME.trim();
                                            Term.value = resultData[n].ADMIT_TERM_DESCR;
                                            TermCode.value = resultData[n].ADMIT_TERM;
                                            if (resultData[n].STUDENT_STATUS == "TRANSFER") {
                                                AppealCB3.value = "1";
                                            }
                                            if (resultData[n].STUDENT_STATUS == "FRESHMEN") {
                                                AppealCB1.value = "1";
                                            }
                                            if (resultData[n].STUDENT_STATUS == "RETURNING") {
                                                AppealCB2.value = "1";
                                            }
                                            StudentMajor.value = resultData[n].MAJOR;

                                            TelNumber.value = resultData[n].STUDENT_CELL_PHONE.trim();
                                            ApplicantName.value = resultData[n].STUDENT_NAME.trim();
                                            CWID.value = resultData[n].CWID;
                                            CSUStudentEmail.value = "csufaemform@gmail.com";
                                PersonalStudentEmail.value = "csufaemform@gmail.com";
                                        } else {
                                            showErrorModal("Alert!", "Thank for your interest in Cal State Fullerton, however more than 20 business days have lapsed since your email notification, and you are no longer eligible to submit an appeal.");
                                        }
                                    }
                                } else {
                                    showErrorModal("Alert!", "Please beware that you are launching another request for the same academic term. Your current status at Cal State Fullerton does not allow you to submit an appeal");
                                }
                            }
                        });

                    } else {
                        showErrorModal("Alert!", "Your current admission status at Cal State Fullerton does not allow you to submit an appeal. Appeals are reserved for applicants that have been denied or withdrawn.");
                    }
                } else {
                    var url = "http://www.fullerton.edu/graduate/";
                    showTextErrorModal("Alert!", "All Graduate applicants who would like to submit an appeal will need to contact the ", ". Credential and 2nd bachelor applicants (nursing only) should consult their advisor for appeal information. ", url);
                }
                gifModal.style.display = "none";
                rButtonStatus = true;
                break;
            }

        }
        if (rButtonStatus === false) {
            alert("Please select the department");
            modal.style.display = "block";
        } else {
            modal.style.display = "none";
        }
    };
    var footerModal = document.getElementById("modal_footer");

    footerModal.appendChild(okButton);
}

/*function checkStudents(cwid) {
    var studArray = ["887114833", "885093450", "886864768", "886864636", "885902577", "885115733", "888836269", "885092361", "886473008", "885096875", "889038212", "887190940", "885108233", "889325262", "885088013", "885085217", "885108092", "885085142", "885115162", "885891549", "885110494", "889692943", "887300002", "888726155", "885101642", "885108043", "885091546", "885091504", "885084863", "892754235", "886561125", "885091264", "885091256", "885091231", "885122010", "885128694", "885684167", "887589042", "885084632", "887716736", "885096032", "889497939", "885091009", "885084434", "885090951", "891140865", "887203198", "885103606", "885111740", "885095539", "887263291", "885084087", "885084061", "887929099", "885087106", "885995654", "885090423", "885090373", "886762129", "885111617", "885111609", "885121418", "885173062", "885083790", "885101295", "885086959", "885095000", "885083576", "885090035", "888324597", "885089904", "885089888", "885121038", "885083444", "885089797", "885289959", "886750835", "885111468", "885110122", "885114827", "887141513", "885099903", "885103069", "887483824", "890834070", "885844134", "888920287", "890672363", "885303768", "887735967", "885104596", "885431866", "885094276", "885114751", "887657294", "885094110", "885112672", "885088799", "885120329", "888029519", "885098210", "885099663", "886556737", "888517711", "885088559", "885429902", "888072642", "888293206", "885951194", "885088328", "887911600", "885093732", "885451930", "885100800", "885170167", "885372821", '818665697'];
    var result = "";
    if (studArray.includes(cwid)) {
        result = "true";
    } else {
        result = "false";
    }
    return result;
}*/

/*function checkExceptionalStudents(cwid) {
    var studArray = ['814192720', '887625762', '886937408', '871125654', '887114585', '860551456', '864109392', '824569198', '878503028', '843474479', '812115202', '887516433', '867683732', '886147578', '886053776', '865515233', '885914580', '885116269', '885036426', '891592826', '864881875', '884730268', '802629857', '884410440', '820298099', '874468168', '866733009', '867706897', '808879472', '812822781', '873237309', '834673212', '825362734', '889404760', '861850873', '891708752', '884643750', '847933249', '871477626', '884772104', '886090232', '867913519', '872921234', '848427282', '866683733', '893878223', '885093302', '885473827', '884641218', '886446186', '823824040', '832625529', '885621938', '828763631', '884639857', '885100560', '869880435', '847661691', '884639659', '819618869', '890391147', '867841579', '891780553', '892187568', '801858176', '868767732', '884637208', '847635604', '866314396', '860931955', '885092148', '822550554', '885449504', '886868488', '802094219', '874339120', '886867670', '843692435', '884726969', '810923631', '889368965', '840296123', '889342788', '887805778', '811192780', '815622436', '885543132', '870066081', '888374527', '827807678', '867372724', '887018489', '887218360', '860634518', '867530990', '843093568', '813791209', '885881086', '821934197', '872970116', '884628561', '861980829', '889577862', '883245144', '830319398', '840274740', '884627761', '884627746', '819830019', '886887942', '872044672', '888502192', '836318162', '813396678', '884626102', '813829967', '884625906', '837757236', '885886739', '888502051', '884625161', '875520124', '817985815', '872452610', '845062405', '845780915', '890876303', '805792629', '836517045', '885239764', '875652398', '886548189', '874986029', '884621764', '864061858', '886048677', '833873052', '819399312', '827654294', '892210840', '897512588', '870788429', '828963900', '835078197', '889211546', '834353328', '832182323', '834520421', '888126372', '887550572', '824648026', '884618109', '885085118', '838996965', '872691431', '884617747', '828452813', '890473432', '820031326', '841203847', '898106505', '889319836', '886038116', '849308903', '871163341', '833568959', '839657673', '886162106', '847268513', '812652071', '808890495', '886420355', '835008293', '885172080', '886162015', '870520319', '885099044', '881727044', '846849321', '893354407', '885091546', '882706617', '842898124', '884807959', '894985951', '887371185', '885101600', '884661398', '884794777', '886377548', '884661125', '881632285', '884660614', '887535243', '884720525', '890707375', '806832879', '806068292', '892972209', '884957242', '826417495', '886031384', '886503614', '880569082', '847644499', '884911918', '889219184', '866039324', '807740543', '878623255', '875605073', '833300817', '820274983', '843729393', '886322064', '886631290', '824105597', '884794512', '887330413', '820464501', '810456335', '885096149', '845560267', '840109045', '873760250', '884758640', '889030763', '887063816', '818809360', '849062591', '866945801', '878518711', '873255574', '888451366', '806458899', '885331165', '894751080', '830117404', '894175223', '884603234', '884847369', '888772191', '885084590', '884602327', '885440073', '886102029', '888822863', '822877304', '886540202', '832524631', '877436337', '849202502', '830466256', '824823199', '887185270', '828018911', '889708608', '849757224', '864587266', '896376878', '884717323', '884598657', '828535989', '833101843', '817257942', '843547969', '886612985', '870893567', '807773510', '863678330', '868047176', '870375532', '889957668', '885891291', '872323126', '884596826', '811063130', '886481910', '846774867', '885913038', '875293060', '884754607', '888552619', '831433032', '877991547', '822445326', '811732197', '892804535', '845544089', '822198222', '879280436', '887773794', '816291389', '813283520', '838564375', '884592924', '885321091', '887059400', '807391024', '890051790', '883712127', '823802996', '849357215', '837457753', '889554101', '868624172', '885107938', '840663975', '845633148', '862839859', '888845740', '819563073', '868169913', '886074855', '862923760', '885090746', '886502988', '885723544', '886844265', '892042995', '889819074', '884714296', '873826457', '814231601', '888050937', '885115030', '889383337', '878905348', '875326738', '879783553', '887263432', '806247821', '880772850', '887889749', '888706744', '861532612', '861567006', '885894683', '890974850', '834456543', '885003889', '872761457', '845844398', '876308958', '868838822', '838296184', '825164312', '889069399', '826768079', '885393843', '882847494', '822464715', '821328242', '884495300', '891575698', '837693779', '848612685', '898250527', '841320377', '892896143', '884493677', '813693082', '872309638', '885143651', '871319083', '846737807', '875527699', '886835842', '809700727', '887053973', '810153718', '890562978', '832386767', '885282053', '884520982', '824178602', '864506399', '844628743', '885995878', '887032092', '829094366', '889889374', '885995597', '861051506', '849475512', '883598252', '815531694', '802512517', '887172203', '837491547', '890180920', '885065532', '831344759', '884744731', '815540026', '889245668', '881937767', '891497471', '885111609', '822555215', '828786996', '884669599', '817505654', '894510940', '860111855', '820015550', '815359765', '864258314', '873860894', '890482540', '848639605', '884988783', '812588838', '884804329', '846806271', '884479718', '884669169', '874207012', '805586765', '884514829', '888485232', '884817875', '802934364', '809596869', '886766484', '865507677', '819652520', '878030402', '886742576', '888437811', '887742765', '889062584', '888440302', '839928249', '817200009', '825528045', '815642319', '891793804', '808170401', '861109874', '843383837', '894485739', '831809850', '828014969', '810472001', '840027148', '888438702', '831729314', '885808451', '884508144', '844076836', '874899214', '888324761', '867406852', '893436717', '822130969', '885055905', '886626340', '887150282', '807939624', '884505785', '884505272', '807022637', '885884437', '868657883', '890089733', '885100081', '884504259', '887165868', '877059568', '805769882', '806656104', '888327020', '841493950', '830083333', '889136859', '887761872', '889529046', '885026922', '819958455', '885121129', '885089995', '814739637', '890963697', '891431769', '884501800', '872103577', '878736685', '884816521', '827532698', '888335262', '864453386', '814656641', '892539925', '885073056', '849095781', '890695208', '845738467', '887821965', '831311279', '863364972', '887045037', '888328648', '880909478', '885423483', '886736503', '883734683', '885120972', '869096545', '887896710', '877770990', '887043982', '886564285', '885385534', '885094730', '832953863', '889347233', '887809838', '884522913', '887508760', '879253508', '866101967', '864175666', '886748417', '863304689', '884789355', '888324233', '884880667', '885137778', '874591977', '845132935', '841728983', '869957886', '888181609', '885986745', '860457522', '889733234', '883685240', '884918459', '872288857', '802765271', '885086546', '886638170', '885272815', '860455831', '862323300', '879960839', '806640058', '892206459', '886731900', '884666231', '833908395', '884732678', '866606775', '888523792', '886334457', '887942134', '841672611', '829146091', '885098350', '889911376', '880888904', '806110433', '868471319', '828307512', '844112318', '827564915', '888582210', '887886448', '886908011', '865043160', '891424194', '863841417', '840406045', '842844177', '805528791', '891086142', '893963751', '871794822', '824041644', '865331599', '885878033', '884933482', '884828401', '888318839', '884553371', '884879628', '843583204', '827931262', '863092680', '828903500', '837127729', '885873828', '881528210', '864777651', '886633502', '860425677', '888528171', '894096569', '849922620', '866586340', '810033340', '886611227', '884372129', '896450251', '816722169', '887885739', '889476149', '886781632', '884478470', '883626665', '888492964', '802520635', '887544195', '869593467', '885299990', '838259109', '829551720', '886078724', '832256317', '880737424', '886611128', '828290791', '888664331', '879116317', '844694885', '870490083', '884775396', '812478030', '884580614', '889318127', '884813759', '885349258', '831245535', '825687171', '884679903', '886356906', '887094779', '865639678', '838215200', '808535520', '864343330', '887849198', '885082586', '864044235', '825037435', '810338830', '885345744', '862235850', '884463217', '886961507', '871096947', '844225979', '808473318', '888753837', '816247696', '818043622', '884572256', '835403916', '818081143', '816358618', '819119165', '888522638', '848226957', '826900839', '885890517', '834318859', '885229567', '886087147', '835615618', '873742944', '886811009', '877989244', '815745583', '887519874', '809846967', '837589985', '836049866', '882253438', '874724594', '820533545', '867735193', '826227241', '884786484', '832101604', '847041449', '862106572', '836188847', '885086025', '884564998', '884969130', '887505865', '817756604', '885990242', '898124268', '867714206', '833112758', '886827468', '887161800', '884562620', '876935990', '884561937', '828709253', '881236582', '861562510', '816766539', '886714716', '863517348', '825499239', '822632402', '816949408', '886992965', '888294105', '892174186', '884798992', '872099593', '819858341', '888289642', '886807072', '872511944', '839068996', '863594198', '889054243', '885036814', '891742942', '876746652', '813617594', '835309840', '888692092', '835793852', '887301133', '888973112', '833471196', '842706822', '815255187', '887883700', '884538729', '886393370', '809774383', '806841334', '888740131', '882611015', '888407798', '813839073', '843789009', '875600272', '832163620', '806470449', '886835024', '873471932', '886260850', '886709377', '831301908', '889920526', '884469917', '878408830', '820521524', '840274740', '820808533', '868624172', '818099418', '833611221', '818665697'];
    var result = "";
    if (studArray.includes(cwid)) {
        result = "true";
    } else {
        result = "false";
    }
    return result;
}*/

function checkStudentsSpecialRequest(cwid) {
    var studArray = ["863242442", "880364757", "832536742", "871273926", "841081482", "884591629", "846384584", "884876012", "806547535", "829865260", "884876012", "844108555", "875127995", "842152910", "841774862", "819217936", "844117432", "809226954", "844460121", "846482982", "866452006", "871509584", "829879626", "877198374", "820763431", "868809369", "811453133", "873646632", "848491130", "815601224", "821280765", "811400019", "883765091", "827660614", "878457506", "849670823", "865996649", "871417994", "814508990", "890020209", "885059329", "889062428", "814508990", "890020209", "889062428", "871528600", "884760521", "810763813", "865924641", "869477174", "869477174", "871133104", "871323531", "828364430", "864067236", "823723978", "884688987", "811501527", "885057497", "833610595", "884688987", "868962226", "877035501", "806225686", "860113513", "821239860", "830645719", "848174041", "886313907", "814917449", "861952802", "886894682", "842008120", "812590404", "817292527", "842290256", "812396489", "843388125", "884898545", "866269400", "807105010", "884745621", "832588123", "828735464", "821714342", "806987525", "808256028", "845557198", "845039601", "834606188", "842999922", "874279755", "815854468", "846562544", "826268120", "849542980", "809819386", "861793735", "845044866", "884625385", "864501796", "816902100", "827458548", "807254123", "881447213", "880121546", "863784260", "845039601", "862532280", "867348393", "837622844", "893423905", "882071921", "863105888", "863775763", "834459554", "820715027", "821138286", "870531597", "839626215", "823023924", "866629975", "880832191", "823023924", "866629975", "880832191", "816723019", "824184014", "883364421", "830738571", "867646358", "842455487", "884802695", "818203754", "869010611", "884862780", "844667956", "811619725", "848268140", "814476511", "845880996", "875198871", "883643421", "822996948", "817003023", "837429059", "819270091", "835478199", "886759307", "821875184", "813601093", "843696238", "838134468", "836670216", "873260863", "864711056", "880370689"];
    var result = "";
    if (studArray.includes(cwid)) {
        result = "true";
    } else {
        result = "false";
    }
    return result;
}

function duplicateSubmissionandDeadlineExemption(cwid){
  var studArray = ["886313907", "832047054", "811619725"];
  var result = "";
    if (studArray.includes(cwid)) {
        result = "true";
    } else {
        result = "false";
    }
    return result;
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_CaseId_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_CaseId_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
if(StageIndicator.value === null){
    $.ajax({

      type: 'GET', 
      url:"/bin/getCaseID",
      dataType: 'json',

      success: function(myresponse){            
        CaseId.value = myresponse.CASEID;

      	}
	}); 	
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealCB1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealCB1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealCB1.value == "1"){
  AppealCB2.value = "";
  AppealCB3.value = "";
  
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealCB3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealCB3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealCB3.value == "1"){
  AppealCB1.value = "";
  AppealCB2.value = "";
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealCB2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealCB2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
 
if(AppealCB2.value == "1"){
  AppealCB1.value = "";
  AppealCB3.value = "";
  
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_ApplicantName_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_ApplicantName_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_CWID_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_CWID_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_CSUStudentEmail_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_CSUStudentEmail_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_StudentMajor_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_StudentMajor_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AdmissionAppealsPanel1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AdmissionAppealsPanel1_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = false;
}else{
  if((OtherAdmissionReasonCB.value === null && ReconsiderationReqCB.value === null) && (AppealReason5.value === null && AppealReason6.value === null && AppealReason7.value === null)){
    this.visible = true;
    AdmissionAppealsReasonPanel2.visible = false;
  }else{
    this.visible = false;
    AdmissionAppealsReasonPanel2.visible = true;
  }
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealReason1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealReason1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason1.value == "1"){
  AppealReason2.value = "";
  AppealReason3.value = "";
   AppealReason4.value = "";
   AppealReason5.value = "";
   AppealReason6.value = ""; 
   AppealReason7.value = "";
   AppealReason8.value = "";
  OtherReason.value  = "";
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealReason2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealReason2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason2.value == "1"){
  AppealReason1.value = "";
  AppealReason3.value = "";
   AppealReason4.value = "";
   AppealReason5.value = "";
   AppealReason6.value = ""; 
   AppealReason7.value = "";
   AppealReason8.value = "";
  OtherReason.value  = "";
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealReason3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealReason3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason3.value == "1"){
  AppealReason1.value = "";
  AppealReason2.value = "";
   AppealReason4.value = "";
   AppealReason5.value = "";
   AppealReason6.value = ""; 
   AppealReason7.value = "";
   AppealReason8.value = "";
  OtherReason.value  = "";
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealReason4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealReason4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason4.value == "1"){
  AppealReason1.value = "";
  AppealReason2.value = "";
   AppealReason3.value = "";
   AppealReason5.value = "";
   AppealReason6.value = ""; 
   AppealReason7.value = "";
   AppealReason8.value = "";
  OtherReason.value  = "";
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_ReconsiderationReqCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_ReconsiderationReqCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  if(this.value == 1){
    OtherAdmissionReasonCB.value = "";
    OtherAdmissionReason.value = "";
     AppealReason5.value = "";
   AppealReason6.value = ""; 
   AppealReason7.value = "";
   AppealReason8.value = "";
  OtherReason.value  = "";
  }
}


        }
	}
}
/**
 * @function appeals_form_appeals.generated_OtherAdmissionReasonCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_OtherAdmissionReasonCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  if(this.value == 1){
    ReconsiderationReqCB.value = "";
    OtherAdmissionReason.mandatory = true;
    OtherAdmissionReason.visible = true;
     AppealReason5.value = "";
   AppealReason6.value = ""; 
   AppealReason7.value = "";
   AppealReason8.value = "";
  OtherReason.value  = "";
  }else{
    OtherAdmissionReason.mandatory = false;
    OtherAdmissionReason.visible = false;
    OtherAdmissionReason.value = "";
  }
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_OtherAdmissionReason_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_OtherAdmissionReason_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = false;
}else{
  if(this.value !== null){
    this.visible = true;
  }else{
    this.visible = false;
  }
}

        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealReason5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealReason5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason5.value == "1"){
  AppealReason1.value = "";
  AppealReason2.value = "";
   AppealReason3.value = "";
   AppealReason4.value = "";
   AppealReason6.value = ""; 
   AppealReason7.value = "";
   AppealReason8.value = "";
  OtherReason.value  = "";
  OtherAdmissionReason.value = "";
  OtherAdmissionReasonCB.value = "";
  ReconsiderationReqCB.value = "";
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealReason6_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealReason6_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason6.value == "1"){
  AppealReason1.value = "";
  AppealReason2.value = "";
   AppealReason3.value = "";
   AppealReason4.value = "";
   AppealReason5.value = ""; 
   AppealReason7.value = "";
   AppealReason8.value = "";
  OtherReason.value  = "";
  OtherAdmissionReason.value = "";
  OtherAdmissionReasonCB.value = "";
  ReconsiderationReqCB.value = "";
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealReason7_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealReason7_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason7.value == "1"){
  AppealReason1.value = "";
  AppealReason2.value = "";
   AppealReason3.value = "";
   AppealReason4.value = "";
   AppealReason5.value = ""; 
   AppealReason6.value = "";
   AppealReason8.value = "";
  OtherReason.value  = "";
  OtherAdmissionReason.value = "";
  OtherAdmissionReasonCB.value = "";
  ReconsiderationReqCB.value = "";
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealReason8_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealReason8_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = false;
}else{
  if(this.value !== null){
    this.visible = true;
    OtherReason.visible = true;
  }else{
    this.visible = false;
    OtherReason.visible = false;
  }
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealReason8_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealReason8_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
if(AppealReason8.value == "1"){
  AppealReason1.value = "";
  AppealReason2.value = "";
   AppealReason3.value = "";
   AppealReason4.value = "";
   AppealReason5.value = ""; 
   AppealReason6.value = "";
   AppealReason7.value = "";
   OtherReason.mandatory  = true;
   OtherReason.visible  = true;
  OtherAdmissionReason.value = "";
  OtherAdmissionReasonCB.value = "";
  ReconsiderationReqCB.value = "";
}else{
  OtherReason.visible  = false;
  OtherReason.mandatory  = false;
  OtherReason.value  = "";
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_OtherReason_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_OtherReason_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = false;
}else{
  if(this.value !== null){
    this.visible = true;
  }else{
    this.visible = false;
  }
}
//this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_supportingDocs_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_supportingDocs_init0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value === null){
  this.visible = true;
}else{
  this.visible = false;
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_UnofficialTranscriptDoc_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_UnofficialTranscriptDoc_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var filePath = UnofficialTranscriptDoc.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  UnofficialTranscriptDoc.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  UnofficialTranscriptDoc.fileAttachment.value = fname;
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_supportDoc1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_supportDoc1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var filePath = supportDoc1.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc1.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc1.fileAttachment.value = fname;
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_supportDoc2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_supportDoc2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var filePath = supportDoc2.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc2.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc2.fileAttachment.value = fname;
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_supportDoc3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_supportDoc3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var filePath = supportDoc3.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc3.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc3.fileAttachment.value = fname;
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_supportDoc4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_supportDoc4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var filePath = supportDoc4.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc4.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc4.fileAttachment.value = fname;
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_supportDoc5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_supportDoc5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            var filePath = supportDoc5.fileAttachment.value;
//alert("filePath: " + filePath);
var flag = 0;
if(flag === 0){
if(checkSupDocMimeType(filePath) === true){
  showErrorModal("Älert!","Only PDF, JPEG, PNG, JPG, TIF, TIFF files are allowed");
  supportDoc5.fileAttachment.value = null; 
  flag = 1;
}else{
  flag = 0;
}
}
if(flag === 0){
var fname = replaceSplCharInFileName(filePath);
if(fname !== false){
  supportDoc5.fileAttachment.value = fname;
}
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_HousingYesNo_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_HousingYesNo_init0 = function (scope) {
    with(this) {
        with(scope) {
            if (StageIndicator.value === null ) {
  this.mandatory = true;
}else{
  this.mandatory = false;
}

        }
	}
}
/**
 * @function appeals_form_appeals.generated_CertifyCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_CertifyCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value === null){
 
if(this.value == 1){
  var userValue;
 /* if(ApplicantSignDate.value === null){
 var dateString = new Date().toLocaleString("en-US", {
                timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
            }).replace(/[^ -~]/g, '');
            var dateObject = new Date(dateString);
            var curyear = dateObject.getFullYear();
            var curyearMonth = dateObject.getMonth() + 1;
            var curyearDay = dateObject.getDate();
            var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
ApplicantSignDate.value = d;
  
   ApplicantSignDate.enabled = false;
}*/

   $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetails",
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse.userName;
                    ApplicantSignature.value = ApplicantName.value;
                  	ApplicantSignDate.value = myresopnse.SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
  
   ApplicantSignature.enabled = false;
  ApplicantSignDate.enabled = false;

}else{
      ApplicantSignature.value = "";
      //EmpSign.mandatory = "error";
      ApplicantSignDate.value = null;
}

}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_ApplicantSignature_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_ApplicantSignature_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_ApplicantSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_ApplicantSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_ApplicantComments_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_ApplicantComments_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealsCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealsCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            
if(StageIndicator.value === "ToAppeals"){
 
if(this.value == 1){
  var userValue;
  /*if(AppealsSignDate.value === null){
  var dateString = new Date().toLocaleString("en-US", {
                timeZone: (Intl.DateTimeFormat().resolvedOptions().timeZone)
            }).replace(/[^ -~]/g, '');
            var dateObject = new Date(dateString);
            var curyear = dateObject.getFullYear();
            var curyearMonth = dateObject.getMonth() + 1;
            var curyearDay = dateObject.getDate();
            var d = (curyear + "-" + curyearMonth + "-" + curyearDay);
AppealsSignDate.value = d;
  
   AppealsSignDate.enabled = false;
}*/

   $.ajax({

                type: 'GET',

                url: "/bin/getLoggedInUserDetails",
                dataType: 'json',
                success: function(myresopnse) {
                    var userValue = myresopnse.userName;
                    AppealsSign.value = userValue;
                    AppealsSignDate.value = myresopnse.SERVER_DATE;
                },
                error: function(error) {
                    alert("error block=" + error);
                }
            });
  
   AppealsSign.enabled = false;
  AppealsSignDate.enabled = false;

}else{
      AppealsSign.value = "";
      //EmpSign.mandatory = "error";
      AppealsSignDate.value = null;
}

}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealsSignDate_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealsSignDate_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AppealsSignDate_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealsSignDate_valueCommit0 = function (scope) {
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
 * @function appeals_form_appeals.generated_AppealsRecommend_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AppealsRecommend_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  denialPanel.visible = false;
  ApproveAction.visible = true;
  ApproveConditions.visible = true;
  DenyAction.value = "";
  DenyAction.mandatory = "";
  ApproveAction.mandatory = "error";
  DenyAction.visible = false;
  
}
if(this.value == "2"){
  denialPanel.visible = true;
  ApproveAction.visible = false;
  ApproveConditions.visible = false;
    DenyAction.visible = true;
  DenyAction.mandatory = "error";
  ApproveAction.mandatory = "";
  ApproveAction.value = "";
  ApproveConditions.value = "";
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_ExtenuationCircumstanceCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_ExtenuationCircumstanceCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(StageIndicator.value == "ToAppeals"){
  if(this.value == 1){
  ExtenuationCircumstanceTB.value = "Additionally, based upon the supporting documentation provided, it was determined that your 	appeal did not meet the criteria for an extenuating circumstance.";
  }else{
    ExtenuationCircumstanceTB.value = "";
  }
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_ApproveAction_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_ApproveAction_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_ApproveConditions_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_ApproveConditions_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_denialPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_denialPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DenyAction_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DenyAction_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DenyAction_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DenyAction_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if (this.value !== null) {
denialPanel.visible = true;
}
if (this.value == "3") {
    
 AGCoursePanel.visible = true;
  StudentGPA.visible = false;
  StudentGPA.mandatory = "";
  StudentGPA.value = "";
  Units.value = "";
   Units.visible = false;
  Units.mandatory = "";
   PendingUnits.value = "";
  GoldenDeficientIn.visible = false;
  GoldenDeficientIn.value = "";
  GoldenDeficientIn.mandatory = "";
  LowGPAPanel.visible = false;
  StudentGPA_1.mandatory = "";
  TotalGPA.mandatory = "";
  StudentGPA_1.value = "";
  TotalGPA.value = "";
  LowGPAWithADTCB.value = "";
  LocalAdmissionGPA.value = "";
  OutLocaladmissionGPA.value = "";
  IncompleteAppealReasonCB.visible = false;
   IncompleteAppealReasonCB.value = "";
}else if(this.value == "4"){
   AGCoursePanel.visible = false;
  DeficientAGCourseCB1.value = "";
DeficientAGCourseCB2.value = "";
DeficientAGCourseCB3.value = "";
DeficientAGCourseCB4.value = "";
DeficientAGCourseCB5.value = "";
DeficientAGCourseCB6.value = "";
DeficientAGCourseCB7.value = "";
DeficientAGCourseSem1.value = "";
DeficientAGCourseSem2.value = "";
DeficientAGCourseSem3.value = "";
DeficientAGCourseSem4.value = "";
DeficientAGCourseSem5.value = "";
DeficientAGCourseSem6.value = "";
DeficientAGCourseSem7.value = "";
    
  StudentGPA.visible = true;
  StudentGPA.mandatory = "error";
   Units.value = "";
   Units.visible = false;
  Units.mandatory = "";
   PendingUnits.value = "";
  GoldenDeficientIn.visible = false;
  GoldenDeficientIn.value = "";
  GoldenDeficientIn.mandatory = "";
  LowGPAPanel.visible = false;
  StudentGPA_1.mandatory = "";
  TotalGPA.mandatory = "";
  StudentGPA_1.value = "";
  TotalGPA.value = "";
   LowGPAWithADTCB.value = "";
  LocalAdmissionGPA.value = "";
  OutLocaladmissionGPA.value = "";
  IncompleteAppealReasonCB.visible = false;
   IncompleteAppealReasonCB.value = "";
}
else if(this.value == "5"){
   AGCoursePanel.visible = false;
  DeficientAGCourseCB1.value = "";
DeficientAGCourseCB2.value = "";
DeficientAGCourseCB3.value = "";
DeficientAGCourseCB4.value = "";
DeficientAGCourseCB5.value = "";
DeficientAGCourseCB6.value = "";
DeficientAGCourseCB7.value = "";
DeficientAGCourseSem1.value = "";
DeficientAGCourseSem2.value = "";
DeficientAGCourseSem3.value = "";
DeficientAGCourseSem4.value = "";
DeficientAGCourseSem5.value = "";
DeficientAGCourseSem6.value = "";
DeficientAGCourseSem7.value = "";
  StudentGPA.visible = false;
  StudentGPA.mandatory = "";
  StudentGPA.value = "";
   Units.visible = true;
  Units.mandatory = "error";
 GoldenDeficientIn.visible = false;
  GoldenDeficientIn.value = "";
  GoldenDeficientIn.mandatory = "";
  LowGPAPanel.visible = false;
  StudentGPA_1.mandatory = "";
  TotalGPA.mandatory = "";
  StudentGPA_1.value = "";
  TotalGPA.value = "";
   LowGPAWithADTCB.value = "";
  LocalAdmissionGPA.value = "";
  OutLocaladmissionGPA.value = "";
  IncompleteAppealReasonCB.visible = false;
   IncompleteAppealReasonCB.value = "";
}
else if(this.value == "6"){
   AGCoursePanel.visible = false;
 DeficientAGCourseCB1.value = "";
DeficientAGCourseCB2.value = "";
DeficientAGCourseCB3.value = "";
DeficientAGCourseCB4.value = "";
DeficientAGCourseCB5.value = "";
DeficientAGCourseCB6.value = "";
DeficientAGCourseCB7.value = "";
DeficientAGCourseSem1.value = "";
DeficientAGCourseSem2.value = "";
DeficientAGCourseSem3.value = "";
DeficientAGCourseSem4.value = "";
DeficientAGCourseSem5.value = "";
DeficientAGCourseSem6.value = "";
DeficientAGCourseSem7.value = "";
  StudentGPA.visible = false;
  StudentGPA.mandatory = "";
  StudentGPA.value = "";
   Units.value = "";
   Units.visible = false;
  Units.mandatory = "";
  PendingUnits.value = "";
 GoldenDeficientIn.visible = true;
  GoldenDeficientIn.mandatory = "error";
  LowGPAPanel.visible = false;
  StudentGPA_1.mandatory = "";
  TotalGPA.mandatory = "";
  StudentGPA_1.value = "";
  TotalGPA.value = "";
   LowGPAWithADTCB.value = "";
  LocalAdmissionGPA.value = "";
  OutLocaladmissionGPA.value = "";
  IncompleteAppealReasonCB.visible = false;
   IncompleteAppealReasonCB.value = "";
}
else if(this.value == "7"){
  AGCoursePanel.visible = false;
  DeficientAGCourseCB1.value = "";
DeficientAGCourseCB2.value = "";
DeficientAGCourseCB3.value = "";
DeficientAGCourseCB4.value = "";
DeficientAGCourseCB5.value = "";
DeficientAGCourseCB6.value = "";
DeficientAGCourseCB7.value = "";
DeficientAGCourseSem1.value = "";
DeficientAGCourseSem2.value = "";
DeficientAGCourseSem3.value = "";
DeficientAGCourseSem4.value = "";
DeficientAGCourseSem5.value = "";
DeficientAGCourseSem6.value = "";
DeficientAGCourseSem7.value = "";
  StudentGPA.visible = false;
  StudentGPA.mandatory = "";
  StudentGPA.value = "";
   Units.value = "";
   Units.visible = false;
  Units.mandatory = "";
  PendingUnits.value = "";
 GoldenDeficientIn.visible = false;
  GoldenDeficientIn.mandatory = "";
   GoldenDeficientIn.value = "";
  LowGPAPanel.visible = false;
  StudentGPA_1.mandatory = "error";
  TotalGPA.mandatory = "error";
  IncompleteAppealReasonCB.visible = false;
   IncompleteAppealReasonCB.value = "";
}
else if(this.value == "8"){
  debugger;
   AGCoursePanel.visible = false;
 DeficientAGCourseCB1.value = "";
DeficientAGCourseCB2.value = "";
DeficientAGCourseCB3.value = "";
DeficientAGCourseCB4.value = "";
DeficientAGCourseCB5.value = "";
DeficientAGCourseCB6.value = "";
DeficientAGCourseCB7.value = "";
DeficientAGCourseSem1.value = "";
DeficientAGCourseSem2.value = "";
DeficientAGCourseSem3.value = "";
DeficientAGCourseSem4.value = "";
DeficientAGCourseSem5.value = "";
DeficientAGCourseSem6.value = "";
DeficientAGCourseSem7.value = "";
  StudentGPA.visible = false;
  StudentGPA.mandatory = "";
  StudentGPA.value = "";
   Units.value = "";
   Units.visible = false;
  Units.mandatory = "";
  PendingUnits.value = "";
   GoldenDeficientIn.visible = false;
  GoldenDeficientIn.value = "";
  GoldenDeficientIn.mandatory = "";
   LowGPAPanel.visible = false;
  StudentGPA_1.mandatory = "";
  TotalGPA.mandatory = "";
  StudentGPA_1.value = "";
  TotalGPA.value = "";
   LowGPAWithADTCB.value = "";
  LocalAdmissionGPA.value = "";
  OutLocaladmissionGPA.value = "";
  IncompleteAppealReasonCB.visible = true;
}
else{
   AGCoursePanel.visible = false;
 DeficientAGCourseCB1.value = "";
DeficientAGCourseCB2.value = "";
DeficientAGCourseCB3.value = "";
DeficientAGCourseCB4.value = "";
DeficientAGCourseCB5.value = "";
DeficientAGCourseCB6.value = "";
DeficientAGCourseCB7.value = "";
DeficientAGCourseSem1.value = "";
DeficientAGCourseSem2.value = "";
DeficientAGCourseSem3.value = "";
DeficientAGCourseSem4.value = "";
DeficientAGCourseSem5.value = "";
DeficientAGCourseSem6.value = "";
DeficientAGCourseSem7.value = "";
  StudentGPA.visible = false;
  StudentGPA.mandatory = "";
  StudentGPA.value = "";
   Units.value = "";
   Units.visible = false;
  Units.mandatory = "";
  PendingUnits.value = "";
   GoldenDeficientIn.visible = false;
  GoldenDeficientIn.value = "";
  GoldenDeficientIn.mandatory = "";
   LowGPAPanel.visible = false;
  StudentGPA_1.mandatory = "";
  TotalGPA.mandatory = "";
  StudentGPA_1.value = "";
  TotalGPA.value = "";
   LowGPAWithADTCB.value = "";
  LocalAdmissionGPA.value = "";
  OutLocaladmissionGPA.value = "";
  IncompleteAppealReasonCB.visible = false;
   IncompleteAppealReasonCB.value = "";
}

        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourse_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourse_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourse_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourse_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
var res = this.value;
  DeficientAGCourseList.value = "";
  if(res.lastIndexOf("1") != "-1"){
      DeficientAGCourseList.value = "History-2 years";
     }
  if(res.lastIndexOf("2") != "-1"){
     if(DeficientAGCourseList.value === null){
       DeficientAGCourseList.value = "English-4 years";
     }else{
      DeficientAGCourseList.value = DeficientAGCourseList.value + " , " + "English-4 years";
     }
     }
   if(res.lastIndexOf("3") != "-1"){
     if(DeficientAGCourseList.value === null){
       DeficientAGCourseList.value = "Mathematics-3 years";
     }else{
      DeficientAGCourseList.value = DeficientAGCourseList.value + " , " + "Mathematics-3 years";
     }
   }
  if(res.lastIndexOf("4") != "-1"){
    if(DeficientAGCourseList.value === null){
       DeficientAGCourseList.value = "Science-2 years";
     }else{
      DeficientAGCourseList.value = DeficientAGCourseList.value + " , " + "Science-2 years";
     }
  }
  if(res.lastIndexOf("5") != "-1"){
    if(DeficientAGCourseList.value === null){
       DeficientAGCourseList.value = "Foreign Language-2 years";
     }else{
      DeficientAGCourseList.value = DeficientAGCourseList.value + " , " + "Foreign Language-2 years";
     }
  }
  if(res.lastIndexOf("6") != "-1"){
    if(DeficientAGCourseList.value === null){
       DeficientAGCourseList.value = "Visual/Performing Art-1 year";
     }else{
      DeficientAGCourseList.value = DeficientAGCourseList.value + " , " + "Visual/Performing Art-1 year";
     }
  }
  if(res.lastIndexOf("7") != "-1"){
    if(DeficientAGCourseList.value === null){
       DeficientAGCourseList.value = "College Preparatory Elective-1 year";
     }else{
      DeficientAGCourseList.value = DeficientAGCourseList.value + " , " + "College Preparatory Elective-1 year";
     }
  }
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_StudentGPA_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_StudentGPA_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_Units_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_Units_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_Units_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_Units_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
PendingUnits.value = 60-(this.value);
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_GoldenDeficientIn_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_GoldenDeficientIn_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_GoldenDeficientIn_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_GoldenDeficientIn_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
var res = this.value;
  GoldenDeficientInList.value = "";
  if(res.lastIndexOf("1") != "-1"){
      GoldenDeficientInList.value = "A1) Oral Communication";
     }
  if(res.lastIndexOf("2") != "-1"){
     if(GoldenDeficientInList.value === null){
       GoldenDeficientInList.value = "A2) English Composition";
     }else{
      GoldenDeficientInList.value = GoldenDeficientInList.value + " , " + "A2) English Composition";
     }
     }
   if(res.lastIndexOf("3") != "-1"){
     if(GoldenDeficientInList.value === null){
       GoldenDeficientInList.value = "A3) Critical Thinking";
     }else{
      GoldenDeficientInList.value = GoldenDeficientInList.value + " , " + "A3) Critical Thinking";
     }
   }
  if(res.lastIndexOf("4") != "-1"){
    if(GoldenDeficientInList.value === null){
       GoldenDeficientInList.value = "B4) Mathematics/Quantitative Reasoning";
     }else{
      GoldenDeficientInList.value = GoldenDeficientInList.value + " , " + "B4) Mathematics/Quantitative Reasoning";
     }
  }
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_AGCoursePanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_AGCoursePanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourseCB1_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourseCB1_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value != "1"){
  DeficientAGCourseSem1.enabled = false;
  DeficientAGCourseSem1.value = "";
  DeficientAGCourseSem1.mandatory = "";
}else{
  DeficientAGCourseSem1.mandatory = "error";
   DeficientAGCourseSem1.enabled = true;
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourseSem1_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourseSem1_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourseCB2_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourseCB2_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value != "1"){
  DeficientAGCourseSem2.value = "";
  DeficientAGCourseSem2.mandatory = "";
   DeficientAGCourseSem2.enabled = false;
}else{
  DeficientAGCourseSem2.mandatory = "error";
   DeficientAGCourseSem2.enabled = true;
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourseSem2_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourseSem2_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourseCB3_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourseCB3_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value != "1"){
  DeficientAGCourseSem3.value = "";
  DeficientAGCourseSem3.mandatory = "";
   DeficientAGCourseSem3.enabled = false;
}else{
  DeficientAGCourseSem3.mandatory = "error";
  DeficientAGCourseSem3.enabled = true;
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourseSem3_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourseSem3_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourseCB4_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourseCB4_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value != "1"){
  DeficientAGCourseSem4.value = "";
  DeficientAGCourseSem4.mandatory = "";
   DeficientAGCourseSem4.enabled = false;
}else{
  DeficientAGCourseSem4.mandatory = "error";
   DeficientAGCourseSem4.enabled = true;
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourseSem4_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourseSem4_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourseCB5_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourseCB5_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value != "1"){
  DeficientAGCourseSem5.value = "";
  DeficientAGCourseSem5.mandatory = "";
   DeficientAGCourseSem5.enabled = false;
}else{
  DeficientAGCourseSem5.mandatory = "error";
   DeficientAGCourseSem5.enabled = true;
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourseSem5_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourseSem5_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourseCB6_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourseCB6_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value != "1"){
  DeficientAGCourseSem6.value = "";
  DeficientAGCourseSem6.mandatory = "";
   DeficientAGCourseSem6.enabled = false;
}else{
  DeficientAGCourseSem6.mandatory = "error";
   DeficientAGCourseSem6.enabled = true;
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourseSem6_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourseSem6_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourseCB7_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourseCB7_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value != "1"){
  DeficientAGCourseSem7.value = "";
  DeficientAGCourseSem7.mandatory = "";
   DeficientAGCourseSem7.enabled = false;
}else{
  DeficientAGCourseSem7.mandatory = "error";
   DeficientAGCourseSem7.enabled = true;
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_DeficientAGCourseSem7_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_DeficientAGCourseSem7_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.enabled = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_LowGPAPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_LowGPAPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_LowGPAWithADTCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_LowGPAWithADTCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value == "1"){
  LocalAdmissionGPA.visible = true;
  OutLocaladmissionGPA.visible = false;
  LocalAdmissionGPA.mandatory = "error";
  OutLocaladmissionGPA.mandatory = "";
  OutLocaladmissionGPA.value = "";
  
}
if(this.value == "2"){
  OutLocaladmissionGPA.mandatory = "error";
  LocalAdmissionGPA.mandatory = "";
  LocalAdmissionGPA.value = "";
  LocalAdmissionGPA.visible = false;
  OutLocaladmissionGPA.visible = true;
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_LocalAdmissionGPA_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_LocalAdmissionGPA_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_OutLocaladmissionGPA_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_OutLocaladmissionGPA_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_IncompleteAppealReasonCB_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_IncompleteAppealReasonCB_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_IncompleteAppealReasonCB_valueCommit0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_IncompleteAppealReasonCB_valueCommit0 = function (scope) {
    with(this) {
        with(scope) {
            if(this.value !== null){
var res = this.value;
  IncompleteAppealReason.value = "";
  if(res.lastIndexOf("1") != "-1"){
      IncompleteAppealReason.value = "Appeal statement";
     }
  if(res.lastIndexOf("2") != "-1"){
     if(IncompleteAppealReason.value === null){
       IncompleteAppealReason.value = "Transcript(s) from all institutions attended";
     }else{
      IncompleteAppealReason.value = IncompleteAppealReason.value + " , " + "Transcript(s) from all institutions attended";
     }
     }
   if(res.lastIndexOf("3") != "-1"){
     if(IncompleteAppealReason.value === null){
       IncompleteAppealReason.value = "Test scores";
     }else{
      IncompleteAppealReason.value = IncompleteAppealReason.value + " , " + "Test scores";
     }
   } 
}
        }
	}
}
/**
 * @function appeals_form_appeals.generated_hiddenPanel_init0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_hiddenPanel_init0 = function (scope) {
    with(this) {
        with(scope) {
            this.visible = false;
        }
	}
}
/**
 * @function appeals_form_appeals.generated_button_6708717581632745254607_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_button_6708717581632745254607_click0 = function (scope) {
    with(this) {
        with(scope) {
            guideBridge.setFocus(null,'prevItemDeep',true);

        }
	}
}
/**
 * @function appeals_form_appeals.generated_button1632744998705_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_button1632744998705_click0 = function (scope) {
    with(this) {
        with(scope) {
            
guideBridge.setFocus(null,'nextItemDeep',true);

        }
	}
}
/**
 * @function appeals_form_appeals.generated_submit1607673526985_click0
 * @this currentComponent
 * @param {scope} scope in which code inside function will be executed.
 */
appeals_form_appeals.generated_submit1607673526985_click0 = function (scope) {
    with(this) {
        with(scope) {
            var studentType = "";
if(AppealCB1.value == "1"){
  studentType = "First Time Freshmen";
}
if(AppealCB2.value == "1"){
  studentType = "Returning Student";
}
if(AppealCB3.value == "1"){
  studentType = "Transfer Student";
}
if(ApplicantName.value !== null && CWID.value !== null){
 // aftiaDescCWID.value = ApplicantName.value +" " + CWID.value;
  aftiaDescCWID.value = ApplicantName.value +" " + CWID.value+" "+studentType;
  EmailRef.value = ApplicantName.value +" - " + CWID.value;
  EmailSubject.value = "Test - Appeals "+ApplicantName.value +" - " + CWID.value;
}
if(ReconsiderationReqCB.value === null && OtherAdmissionReasonCB.value === null && AppealReason5.value === null && AppealReason6.value === null && AppealReason7.value === null && AppealReason8.value === null){
  showErrorModal("Alert!","Please provide your reason(s) for appeal");
  guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanels[0].reasonForAppeal[0]");
}
else
  {
    if(PersonalStudentEmail.value === null){
   PersonalStudentEmail.value = CSUStudentEmail.value;
 }
    


/*CSUStudentEmail.value = "cageorge@FULLERTON.EDU";
PersonalStudentEmail.value = "cageorge@FULLERTON.EDU";*/

CSUStudentEmail.value = "csufaemform@gmail.com";
PersonalStudentEmail.value = "csufaemform@gmail.com";
  var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+)*$/;
  var input = PersonalStudentEmail.value;  
    
if ( (StageIndicator.value===null) && (input.match(validRegex)) ) {
    guideBridge.submit();    
  } else{
    showErrorModal("Alert!","Please enter a valid email address and ensure that the CSUF Email and Personal Email are different.");
    guideBridge.setFocus("guide[0].guide1[0].guideRootPanel[0].AppealPanels[0].basicInformation[0].PersonalStudentEmail[0]");
  }

}


        }
	}
}
