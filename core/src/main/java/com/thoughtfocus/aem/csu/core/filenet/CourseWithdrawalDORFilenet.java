package com.thoughtfocus.aem.csu.core.filenet;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.util.Arrays;
import java.util.Base64;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.google.gson.JsonObject;
import com.csuf.cloud.core.services.FormService;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.FilenetUtil;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { Constants.SERVICE_DESCRIPTION + "=SCWDORFilenet", Constants.SERVICE_VENDOR + "=Thoughtfocus",
		"process.label" + "=SCWDORFilenet" })
public class CourseWithdrawalDORFilenet implements WorkflowProcess {

	private static final Logger log = LoggerFactory.getLogger(CourseWithdrawalDORFilenet.class);

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private FormService formService;

	private static final String FORM_PATH = "/content/forms/af/student-course-withdrawal/student_course_withdrawal";
	private static final String DOR_FILE_NAME = "Student_Course_Withdrawal.pdf";
	private static final String FORM_NAME = "Student Course Withdrawal";

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {

		JsonObject json = null;
		com.adobe.aemfd.docmanager.Document dorDocument = null;
		Document doc = null;
		InputStream is = null;

		String params = processArguments.get("PROCESS_ARGS", String.class);
		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		String workflowInstanceId = workItem.getWorkflow().getId();
		String filenet_onbase = globalConfigFilenetService.getfilenet_or_onbase_selection();
		String url = "";
		String doctype = "";
		if (filenet_onbase.equalsIgnoreCase("filenet")) {
			url = globalConfigFilenetService.getFilenetURL();
		} else if (filenet_onbase.equalsIgnoreCase("onbase")) {
			url = globalConfigFilenetService.getOnbaseURL();
		}
		if (params.equals("StudentDOR")) {
			doctype = "Initial_DOR";
		} else if (params.equals("MedicalFinalDOR") || params.equals("NonMedicalFinalDOR")) {
			doctype = "Final_DOR";
		}
		if (StringUtils.isNotBlank(payloadPath)) {
			try (Connection conn = jdbcConnectionService.getDBConn(dataSourceVal);) {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");
				if (null != is) {
					doc = XMLUtils.getDomDocument(is);
					String xml = XMLUtils.prettyPrintAsString(doc);
					dorDocument = formService.getDoR(xml, FORM_PATH, DOR_FILE_NAME);
					if (null != dorDocument) {
						Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");
						if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
							Element element = XMLUtils.getChildNode(afBoundDataElement, "form1");
							json = prepareFilenetJson(element, params, dorDocument);
							FilenetUtil fUtil = new FilenetUtil();

							// onbase
							if (filenet_onbase.equalsIgnoreCase("filenet")) {
								String resultVal = fUtil.sendToFilenet(json.toString(), url, conn, FORM_NAME);
								log.debug("Result Value returned from filenet in CourseWithdrawalDORFilenet : {}",
										resultVal);
							} else if (filenet_onbase.equalsIgnoreCase("onbase")) {
								json = prepareOnbaseJson(element, params, dorDocument, fUtil);
								String resultVal = fUtil.sendToOnbase(json.toString(), url, conn, FORM_NAME,
										workflowInstanceId, "", doctype,
										XMLUtils.getChildNodeContent(element, "StudentID"),
										XMLUtils.getChildNodeContent(element, "caseId"),
										XMLUtils.getChildNodeContent(element, "FirstName"),
										XMLUtils.getChildNodeContent(element, "LastName"));
								log.debug("Result Value returned from onbase in CourseWithdrawalDOROnbase : {}",
										resultVal);
							} else {
								log.error("afbound elements not found in CourseWithdrawalDOROnbase");
							}
						} else {
							log.error("dorDocument is null in CourseWithdrawalDOROnbase");
						}
					}
				}
			} catch (Exception e) {
				log.error(Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						log.error("IOException in CourseWithdrawalDORFilenet {}", Arrays.toString(e.getStackTrace()));
					}
			}
		}
	}

	private JsonObject prepareFilenetJson(Element eElement, String params,
			com.adobe.aemfd.docmanager.Document dorDocument) throws IOException {
		JsonObject json = new JsonObject();
		String decision = null;
		String withdrawalDecision = "";

		json.addProperty("FirstName", XMLUtils.getChildNodeContent(eElement, "FirstName"));
		json.addProperty("LastName", XMLUtils.getChildNodeContent(eElement, "LastName"));
		json.addProperty("CWID", XMLUtils.getChildNodeContent(eElement, "StudentID"));
		json.addProperty("CaseID", XMLUtils.getChildNodeContent(eElement, "caseId"));
		json.addProperty("Major", XMLUtils.getChildNodeContent(eElement, "Major"));
		json.addProperty("TermCode", XMLUtils.getChildNodeContent(eElement, "TermCode"));
		json.addProperty("TermDescription", XMLUtils.getChildNodeContent(eElement, "TermDesc"));

		String typeOfForm = XMLUtils.getChildNodeContent(eElement, "typeOfForm");
		if (typeOfForm.equals("1")) {
			json.addProperty("WithdrawalType", "Non-Medical");
		} else {
			json.addProperty("WithdrawalType", "Medical");
		}

		if (params.equals("MedicalFinalDOR")) {
			decision = eElement.getElementsByTagName("ARSCRecommend").item(0).getTextContent();
			if (decision.equals("1")) {
				withdrawalDecision = "Approval";
			} else {
				withdrawalDecision = "Denial";
			}
		}

		if (params.equals("NonMedicalFinalDOR")) {
			decision = eElement.getElementsByTagName("ARSCRecommend").item(0).getTextContent();
			if (decision.equals("1")) {
				withdrawalDecision = "Approval";
			} else {
				withdrawalDecision = "Denial";
			}
			for (int i = 0; i < eElement.getElementsByTagName("CourseRow").getLength(); i++) {
				for (int j = 0; j < eElement.getElementsByTagName("CourseRow").item(i).getChildNodes()
						.getLength(); j++) {
					String nodeName = eElement.getElementsByTagName("CourseRow").item(i).getChildNodes().item(j)
							.getNodeName();
					String nodeValue = eElement.getElementsByTagName("CourseRow").item(i).getChildNodes().item(j)
							.getTextContent();
					if (nodeName.equals("ChairUserID")) {
						json.addProperty("chairUID", nodeValue);
					}
					if (nodeName.equals("InstructorUserID")) {
						json.addProperty("instUID", nodeValue);
					}
				}
			}
		}

		json.addProperty("withdrawalDecision", withdrawalDecision);
		byte[] bytes = CSUFUtils.toByteArrayFromInputStream(dorDocument.getInputStream());
		json.addProperty("Attachment", Base64.getEncoder().encodeToString(bytes));

		json.addProperty("AttachmentMimeType", "application/pdf");
		if (params.equals("StudentDOR")) {
			json.addProperty("AttachmentType", "StudentDOR");
		} else {
			json.addProperty("AttachmentType", "FinalDOR");
		}
		return json;
	}

	private JsonObject prepareOnbaseJson(Element eElement, String params,
			com.adobe.aemfd.docmanager.Document dorDocument, FilenetUtil oUtil) throws IOException, JSONException {
		String[] keyArray = { "CWID-8", "First_Name-8", "Last_Name-8", "Term-8", "Doc_Type-8", "Term_Description-8",
				"Major-8", "Course_Withdrawal_Type-8", "Case_ID-8", "Course_Withdrawal_Decision-8" };
		JsonObject json = new JsonObject();
		String decision = null;
		String WithdrawalType = null;
		String withdrawalDecision = "";
		String typeOfForm = XMLUtils.getChildNodeContent(eElement, "typeOfForm");
		String docType = "";

		if (params.equals("StudentDOR")) {
			docType = "StudentDOR";
			json.addProperty("AttachmentType", "StudentDOR");
		} else if (params.equals("MedicalFinalDOR") || params.equals("NonMedicalFinalDOR")) {
			docType = "FinalDOR";
			json.addProperty("AttachmentType", "FinalDOR");
		}
		if (typeOfForm.equals("1")) {
			WithdrawalType = "Non-Medical";
			json.addProperty("Document_Type", "RR Course Withdrawal");
		} else {
			WithdrawalType = "Medical";
			json.addProperty("Document_Type", "RR Course Withdrawal Medical");
		}

		if (params.equals("MedicalFinalDOR") || params.equals("NonMedicalFinalDOR")) {
			decision = XMLUtils.getChildNodeContent(eElement, "ARSCRecommend");
			if (decision.equals("1")) {
				withdrawalDecision = "Approval";
			} else {
				withdrawalDecision = "Denial";
			}
		} else {
			withdrawalDecision = "NA";
		}

		String[] KeyValueArray = { XMLUtils.getChildNodeContent(eElement, "StudentID"),
				XMLUtils.getChildNodeContent(eElement, "FirstName"), XMLUtils.getChildNodeContent(eElement, "LastName"),
				XMLUtils.getChildNodeContent(eElement, "TermCode"), docType,
				XMLUtils.getChildNodeContent(eElement, "TermDesc"), XMLUtils.getChildNodeContent(eElement, "Major"),
				WithdrawalType, XMLUtils.getChildNodeContent(eElement, "caseId"), withdrawalDecision };

		json.add("keywordTypes", oUtil.getKeywords(keyArray, KeyValueArray));
		if(params.equals("NonMedicalFinalDOR")) {
			json.remove("keywordTypes");
			String coursNameVal = "";
			String scheduleNumberVal = "";
			String courseIdVal = "";
			for (int i = 0; i < eElement.getElementsByTagName("CourseRow").getLength(); i++) {
				for (int j = 0; j < eElement.getElementsByTagName("CourseRow").item(i).getChildNodes().getLength(); j++) {
					NodeList childNodes = eElement.getElementsByTagName("CourseRow").item(i).getChildNodes();
					for (int k = 0; k < childNodes.getLength(); k++) {
		                Node node = childNodes.item(k);
		                if (node.getNodeName().equals("CourseNo")) {
		                	coursNameVal = node.getTextContent();
		                }
		                if (node.getNodeName().equals("ScheduleNo")) {
		                	scheduleNumberVal = node.getTextContent();
		                }
		            }
				}
			}
			
			Element lookupResultElement = XMLUtils.getChildNode(eElement, "LookupResult");
			String lookupResultJson = lookupResultElement.getTextContent();
			if(lookupResultJson != null) {
			JSONObject jsonObject = new JSONObject(lookupResultJson);
			JSONArray courses = jsonObject.getJSONArray("COURSES");
			for (int i = 0; i < courses.length(); i++) {
	            JSONObject course = courses.getJSONObject(i);
	            if (scheduleNumberVal.equals(course.optString("CLASS_NBR"))) {
	                if (coursNameVal != null && !coursNameVal.trim().isEmpty() && 
	                    !coursNameVal.equals(course.optString("CRSE_NAME"))) {
	                }
	                courseIdVal = course.optString("CRSE_ID");
	            }
	        }
			}
			String[] keyArrayNM = { "CWID-8", "First_Name-8", "Last_Name-8", "Term-8", "Doc_Type-8", "Term_Description-8",
					"Major-8", "Course_Withdrawal_Type-8", "Case_ID-8", "Course_Withdrawal_Decision-8", "Course_Id-8", "Course_Name-8" };
			String[] KeyValueArrayNM = { XMLUtils.getChildNodeContent(eElement, "StudentID"),
					XMLUtils.getChildNodeContent(eElement, "FirstName"), XMLUtils.getChildNodeContent(eElement, "LastName"),
					XMLUtils.getChildNodeContent(eElement, "TermCode"), docType,
					XMLUtils.getChildNodeContent(eElement, "TermDesc"), XMLUtils.getChildNodeContent(eElement, "Major"),
					WithdrawalType, XMLUtils.getChildNodeContent(eElement, "caseId"), withdrawalDecision, courseIdVal, coursNameVal };
			json.add("keywordTypes", oUtil.getKeywords(keyArrayNM, KeyValueArrayNM));
		}
		byte[] bytes = CSUFUtils.toByteArrayFromInputStream(dorDocument.getInputStream());
		json.addProperty("attachment", Base64.getEncoder().encodeToString(bytes));
		json.addProperty("attachmentMimeType", "application/pdf");
		// json.addProperty("Document_Type", "RR Course Withdrawal");
		return json;
	}

}
