package com.csuf.cloud.core.participantchooser;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Arrays;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.ParticipantStepChooser;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.FallbackUserConfigService;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFConstantsUtils;
import com.csuf.cloud.core.utils.DatabaseUtils;

@Component(service = ParticipantStepChooser.class, property = { "chooser.label=FARF participant chooser" })

public class FARFPartcipantChooser implements ParticipantStepChooser {
	private static final Logger logger = LoggerFactory.getLogger(FARFPartcipantChooser.class);

	@Reference
	private FallbackUserConfigService fallBackUserService;
	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private GlobalConfigCSUFService globalConfigCSUFService;

	public String getParticipant(WorkItem workItem, WorkflowSession wfSession, MetaDataMap metaDataMap)
			throws WorkflowException {

		logger.debug("################ Inside the FARF GetParticipant ##########################");
		metaDataMap = workItem.getWorkflow().getWorkflowData().getMetaDataMap();
		logger.debug("metaDataMap values : {}", metaDataMap.toString());
		String participant = null;
		String stage = null;
		Connection dbConn = null;
		JSONArray resultArray = new JSONArray();
		if (metaDataMap.containsKey("StageIndicator")) {
			stage = metaDataMap.get("StageIndicator").toString();
			logger.debug("Stage value == {}", stage);
			if (stage.equalsIgnoreCase("ToManager")) {
				if (metaDataMap.containsKey("ManagerUserID")) {
					if (StringUtils.isNotBlank(metaDataMap.get("ManagerUserID").toString())) {
						participant = metaDataMap.get("ManagerUserID").toString();
					} else {
						logger.error("ManagerUserID value is not set in metadataMap");
						participant = fallBackUserService.fallbackUserId();
					}
				} else {
					logger.error("ManagerUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToEmployee")) {
				if (metaDataMap.containsKey("EmployeeUserID")) {
					if (StringUtils.isNotBlank(metaDataMap.get("EmployeeUserID").toString())) {
						participant = metaDataMap.get("EmployeeUserID").toString();
					} else {
						logger.error("EmployeeUserID value is not set in metadataMap");
						participant = fallBackUserService.fallbackUserId();
					}
				} else {
					logger.error("EmployeeUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToDynamicRole")) {
				if (metaDataMap.containsKey("FormName")) {
					if (StringUtils.isNotBlank(metaDataMap.get("FormName").toString())) {
						String form = metaDataMap.get("FormName").toString();
						try {
							String dataSourceVal = globalConfigCSUFService.getAEMFormsDatabaseSource();
							dbConn = getConnection(dataSourceVal);
							try {
								String sqlQuery = CSUFConstantsUtils.ARFRoleAssignment;
								sqlQuery = sqlQuery.replaceAll("<<form_name>>", form);
								resultArray = DatabaseUtils.getPositionNumberReportsTo(sqlQuery, dbConn);
								JSONObject objects = null;
								for (int i = 0; i < resultArray.length(); i++) {
									objects = resultArray.getJSONObject(i);
									if (objects.has("ASSIGNEE")) {
										participant = objects.getString("ASSIGNEE");
										objects.put("ASSIGNEE", (StringUtils.isNotBlank(participant) ? participant
												: fallBackUserService.fallbackUserId()));
									} else {
										objects.put("ASSIGNEE", fallBackUserService.fallbackUserId());
									}
								}
							} catch (Exception e) {
								logger.error("data could not be retrieved for {}", form);
							}
						} catch (Exception e) {
							logger.error(Arrays.toString(e.getStackTrace()));
						} finally {
							if (dbConn != null) {
								try {
									dbConn.close();
								} catch (SQLException e) {
									logger.error(Arrays.toString(e.getStackTrace()));
								}
							}
						}
					} else {
						logger.error("FormName value is not set in metadataMap");
					}
				} else {
					logger.error("ToDynamicRole value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToRequestor")) {
				if (metaDataMap.containsKey("RequestorUserId")) {
					if (StringUtils.isNotBlank(metaDataMap.get("RequestorUserId").toString())) {
						participant = metaDataMap.get("RequestorUserId").toString();
					} else {
						logger.error("RequestorUserId value is not set in metadataMap");
						participant = fallBackUserService.fallbackUserId();
					}
				} else {
					logger.error("RequestorUserId value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToBudgetContact")) {
				if (metaDataMap.containsKey("BudgetContactUserID")) {
					if (StringUtils.isNotBlank(metaDataMap.get("BudgetContactUserID").toString())) {
						participant = metaDataMap.get("BudgetContactUserID").toString();
					} else {
						logger.error("BudgetContactUserID value is not set in metadataMap");
						participant = fallBackUserService.fallbackUserId();
					}
				} else {
					logger.error("BudgetContactUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			} else if (stage.equalsIgnoreCase("ToFiscalManager")) {
				if (metaDataMap.containsKey("FiscalManagerUserID")) {
					if (StringUtils.isNotBlank(metaDataMap.get("FiscalManagerUserID").toString())) {
						participant = metaDataMap.get("FiscalManagerUserID").toString();
					} else {
						logger.error("FiscalManagerUserID value is not set in metadataMap");
						participant = fallBackUserService.fallbackUserId();
					}
				} else {
					logger.error("FiscalManagerUserID value is not set in metadataMap");
					participant = fallBackUserService.fallbackUserId();
				}
			}
		} else {
			logger.error("stage value is not set in metadataMap");
		}
		logger.info("####### Participant in FARF GetParticipant Step: {}", participant);
		return participant;
	}

	private Connection getConnection(String dataSource) {
		try {
			Connection dbConn = jdbcConnectionService.getDBConn(dataSource);
			logger.debug("Connection = {}", dbConn);
			return dbConn;

		} catch (Exception e) {
			logger.error(Arrays.toString(e.getStackTrace()));
		}
		return null;
	}
}