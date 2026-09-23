package com.csuf.cloud.core.workflow;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.csuf.cloud.core.services.FormService;
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.services.WorkflowService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.FilenetUtil;
import com.csuf.cloud.core.utils.XMLUtils;
import com.csuf.cloud.core.vo.EmailServiceVO;
import com.csuf.cloud.core.vo.WorkflowVO;

@Component(property = { "service.description=Generate DOR From XML", "service.vendor=ThoughtFocus",
		"process.label=Generate DOR From XML" })
public class GenerateDORFromXML implements WorkflowProcess {
	@Reference
	private FormService formService;

	@Reference
	private GlobalConfigCSUFService globalConfigFilenetService;

	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;

	@Reference
	private WorkflowService workflowService;

	private static final Logger log = LoggerFactory.getLogger(GenerateDORFromXML.class);

	private static final String DEFAULT_PAYLOAD_PATH = "/var/fd/dashboard/payload/server0/2020-01-20/5RX6FNFQ5EUJDFIEUWXEW777J4_3";
	private static final String GRADE_CHANGE_FORM_PATH = "/content/forms/af/grade-change-form/grade-change1";
	private static final String GRADE_CHANGE_DOR_FILE_NAME = "Grade_Change";
	private static final String FORM_NAME = "GradeChange";

	private static final transient String DEFAULT_IMAGE_PATH = "/content/dam/csu/CSUF_Mailer_logo.gif";
	private static final transient String DEFAULT_TEMPLATE_PATH = "/etc/notification/email/csuf/sample-email-template.html";

	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap args)
			throws com.adobe.granite.workflow.WorkflowException {
		Connection conn = null;

		String dataSourceVal = globalConfigFilenetService.getAEMFormsDatabaseSource();
		conn = jdbcConnectionService.getDBConn(dataSourceVal);

		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		if (StringUtils.isNotBlank(payloadPath)) {
			InputStream is = null;
			String recordAction = "";
			String workCompDate = "";
			String params = args.get("PROCESS_ARGS", String.class);
			String filenet_onbase = globalConfigFilenetService.getfilenet_or_onbase_selection();
			String url = "";
			String workflowInstanceId = workItem.getWorkflow().getId();
			Document doc = null;
			if (filenet_onbase.equalsIgnoreCase("filenet")) {
				url = globalConfigFilenetService.getGradeChangeFilenetURL();
			} else if (filenet_onbase.equalsIgnoreCase("onbase")) {
				url = globalConfigFilenetService.getOnbaseURL();
			}

			com.adobe.aemfd.docmanager.Document dorDocument = null;
			// PrintWriter out = response.getWriter();
			try {

				int count = 0;
				List<Document> selectedDocumentList = new ArrayList<>();
				List<Node> toBeDeleted = new ArrayList<>();
				JsonArray finalResponseJson = new JsonArray();
				JsonObject json = null;

				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");
				if (null != is) {
					doc = XMLUtils.getDomDocument(is);
					// TODO find the exact issue, why unformatted xml not working correctly,
					// temporary fix
					String xml = XMLUtils.prettyPrintAsString(doc);
					doc = XMLUtils.parseXmlFile(xml);
					XMLUtils.removeRecursively(doc, Node.ELEMENT_NODE, "Row1");
					XMLUtils.removeRecursively(doc, Node.COMMENT_NODE, null);
					doc.normalize();
					count = doc.getElementsByTagName("Row1").getLength();
					log.debug("count : {}", count);
					// out.println("count: " + count);
					// XMLUtils.prettyPrint(doc, out);

					for (int i = 0; i < count; i++) {
						Document doc1 = (Document) doc.cloneNode(true);
						selectedDocumentList.add(doc1);
					}

					for (int listIndex = 0; listIndex < selectedDocumentList.size(); listIndex++) {
						Document doc1 = selectedDocumentList.get(listIndex);
						NodeList rowNodeList = doc1.getElementsByTagName("Row1");
						for (int i = 0; i < rowNodeList.getLength(); i++) {
							Node rowNode = rowNodeList.item(i);
							if (listIndex != i) {
								toBeDeleted.add(rowNode);
							}
						}
					}

					for (Node node : toBeDeleted) {
						node.getParentNode().removeChild(node);
					}

					for (Document doc1 : selectedDocumentList) {
						log.info("selectedDocumentList====================" + selectedDocumentList.size());

						// NodeList unboundElements = doc1.getElementsByTagName("afUnboundData");
//						String massGradeChange = XMLUtils.getChildNodeContent((Element) unboundElements.item(0),
//								"massGradeChange");
						NodeList parentNodeElements = doc1.getElementsByTagName("afBoundData");

						String massGradeChange = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"massGradeChange");

						String termDesc = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0), "Term");
						String caseId = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0), "caseID");
						String termCode = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"HiddentTermID");

						String classNumber = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"ClassNumber");
						classNumber = classNumber.trim();
						String sectionNumber = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"SectionNumber");
						sectionNumber = sectionNumber.trim();
						String unitTaken = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"UnitTaken");
						String courseLevel = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"CourseLevel");
						String initiatedDate = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"TodayDate");

						SimpleDateFormat fromDate = new SimpleDateFormat("yyyy-MM-dd");
						SimpleDateFormat toDate = new SimpleDateFormat("MM/dd/yyyy");

						String initDate = toDate.format(fromDate.parse(initiatedDate));

						String courseName = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"CourseName");

						String instName = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"InstructorName");

						String instCwid = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"InstructorCWID");
						String instUserID = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"HiddenInstructorUserID");
						String chairUserID = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"HiddenChairUserID");
						String deanUserID = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"HiddenAssociateDeanUserID");

						String deptID = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"HiddenDepartmentCode");

						String enrollmentReqID = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"EnrollmentReqID");

						String requestStatus = XMLUtils.getChildNodeContent((Element) parentNodeElements.item(0),
								"RecordsAction");
						int requestStatus1 = Integer.parseInt(requestStatus);
						log.info("Request Status value from Form ======" + requestStatus);

						if (requestStatus1 == 1) {
							recordAction = "Approved";
						} else if (requestStatus1 == 0) {
							recordAction = "Denied";
						}

						// XMLUtils.prettyPrint(doc1, out);
						// out.println();
						// String xml = XMLUtils.prettyPrintAsString(selectedDocumentList.get(1));
						NodeList rowNodeList = doc1.getElementsByTagName("Row1");
						String studentLastName = XMLUtils.getChildNodeContent((Element) rowNodeList.item(0),
								"StudentLastName"); // 64 Length

						String studentFirstName = XMLUtils.getChildNodeContent((Element) rowNodeList.item(0),
								"StudentFirstName"); // 64 Length
						String sid = XMLUtils.getChildNodeContent((Element) rowNodeList.item(0), "SID");
						String gradeChangeFrom = XMLUtils.getChildNodeContent((Element) rowNodeList.item(0),
								"GradeChangeFrom");
						String gradeChangeTo = XMLUtils.getChildNodeContent((Element) rowNodeList.item(0),
								"GradeChangeTo");

						String reasonForChange = XMLUtils.getChildNodeContent((Element) rowNodeList.item(0), "Reason");

						String workCompletedDate = XMLUtils.getChildNodeContent((Element) rowNodeList.item(0),
								"RPFieldDate");

						if (workCompletedDate != null && !workCompletedDate.equals("")) {
							workCompDate = toDate.format(fromDate.parse(workCompletedDate));
						}

						xml = XMLUtils.prettyPrintAsString(doc1);
						// log.error("xml : {}", xml);
						dorDocument = formService.getDoR(xml, GRADE_CHANGE_FORM_PATH, GRADE_CHANGE_DOR_FILE_NAME);
						/*
						 * response.setContentType("application/pdf");
						 * response.setHeader("Content-Type", "application/pdf");
						 * response.setHeader("Content-Disposition",
						 * "attachment; filename=".concat(GRADE_CHANGE_DOR_FILE_NAME.concat(".pdf")));
						 */
						byte[] bytes = CSUFUtils.toByteArrayFromInputStream(dorDocument.getInputStream());
						// ServletOutputStream out1 = response.getOutputStream();
						// out1.write(bytes);
						// log.debug("bytes : {}", bytes);
						// out1.flush();
						json = new JsonObject();
						Base64.Encoder encoder = Base64.getEncoder();
						String encodedDoc = encoder.encodeToString(bytes);

						json.addProperty("CWID", sid);
						json.addProperty("FirstName", studentFirstName);
						json.addProperty("LastName", studentLastName);
						json.addProperty("ClassNBR", classNumber);
						json.addProperty("SectionNBR", sectionNumber);
						json.addProperty("UnitTaken", unitTaken);
						json.addProperty("CourseLevel", courseLevel);
						json.addProperty("TermCode", termCode);
						json.addProperty("TermDescription", termDesc);
						json.addProperty("InitiatedDate", initDate);
						json.addProperty("CaseID", caseId);
						json.addProperty("CourseName", courseName);
						json.addProperty("InstructorName", instName);
						json.addProperty("CurrentGrade", gradeChangeFrom);
						json.addProperty("NewGrade", gradeChangeTo);
						json.addProperty("Reason", reasonForChange);
						json.addProperty("WorkCompletedDate", workCompDate);
						json.addProperty("InstructorCWID", instCwid);
						json.addProperty("InstructorUserID", instUserID);
						json.addProperty("ChairUserID", chairUserID);
						json.addProperty("DeanUserID", deanUserID);
						json.addProperty("MassGradeChange", massGradeChange);
						json.addProperty("DeptID", deptID);
						json.addProperty("Attachment", encodedDoc);
						json.addProperty("AttachmentMimeType", "application/pdf");
						json.addProperty("EnrollmentReqID", enrollmentReqID);
						json.addProperty("RequestStatus", recordAction);

						FilenetUtil fUtil = new FilenetUtil();

						String resultVal = "";
						// onbase
						if (filenet_onbase.equalsIgnoreCase("filenet")) {
							resultVal = fUtil.sendToFilenet(json.toString(), url, conn, FORM_NAME);
							log.debug("Result Value returned from filenet in PrePerfEvalFilenet : {}", resultVal);
						} else if (filenet_onbase.equalsIgnoreCase("onbase")) {
							if (null != dorDocument) {
								Element afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");
								if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
									Element element = XMLUtils.getChildNode(afBoundDataElement, "GradeChange");
									json = prepareOnbaseJson(element, params, dorDocument, fUtil);

									resultVal = fUtil.sendToOnbase(json.toString(), url, conn, FORM_NAME,
											workflowInstanceId, "", "Final_DOR",
											XMLUtils.getChildNodeContent(element, "SID"),
											XMLUtils.getChildNodeContent(element, "caseID"),
											XMLUtils.getChildNodeContent(element, "StudentFirstName"),
											XMLUtils.getChildNodeContent(element, "StudentLastName"));
									log.debug("Result Value returned from onbase in GradeChangeFinalDOR : {}",
											resultVal);
								} else {
									log.error("afbound elements not found in GradeChangeFinalDOR");
								}
							}
						}

						log.debug("Response Value from Filenet===" + resultVal);
						if (resultVal != null && !resultVal.equals("")) {
							if (resultVal.contains("Failed")) {
								boolean isGCEmailEnabled = globalConfigFilenetService.isGCEmailAfterFailure();
								log.debug("Email Notifivation for Grade Change=" + isGCEmailEnabled);
								if (isGCEmailEnabled) {
									WorkflowVO workflowVO = new WorkflowVO();
									workflowVO = setGradeChangeEmailAttributes(workflowVO);
									workflowService.sendReminder(workflowVO);
								}
							}
						}
					}
				}
			} catch (Exception e) {
				log.error(Arrays.toString(e.getStackTrace()));
			} finally {
				if (null != dorDocument) {
					try {
						dorDocument.close();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}

				if (null != is)
					try {
						is.close();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}

	}

	private JsonObject prepareOnbaseJson(Element eElement, String params,
			com.adobe.aemfd.docmanager.Document dorDocument, FilenetUtil oUtil) throws IOException {
		String[] keyArray = { "CWID-8", "First_Name-8", "Last_Name-8", "Class_Number-8", "Term_Description-8", "Term-8",
				"Course_Name-8", "Course_Level-8", "Section_Number-8", "Unit_Taken-1", "Date_Initiated-3",
				"Instructor_CWID-8", "Instructor_Name-8", "New_Grade-8", "Current_Grade-8", "Mass_Grade_Change-8",
				"Department_ID-8", "Case_ID-8", "Enrollment_Req_ID-8", "Work_Completed_Date-3",
				"Grade_Change_Reason-8" };
		String[] KeyValueArray = { XMLUtils.getChildNodeContent(eElement, "SID"),
				XMLUtils.getChildNodeContent(eElement, "StudentFirstName"),
				XMLUtils.getChildNodeContent(eElement, "StudentLastName"),
				XMLUtils.getChildNodeContent(eElement, "ClassNumber"), XMLUtils.getChildNodeContent(eElement, "Term"),
				XMLUtils.getChildNodeContent(eElement, "HiddentTermID"),
				XMLUtils.getChildNodeContent(eElement, "CourseName"),
				XMLUtils.getChildNodeContent(eElement, "CourseLevel"),
				XMLUtils.getChildNodeContent(eElement, "SectionNumber"),
				XMLUtils.getChildNodeContent(eElement, "UnitTaken"),
				StringUtils.isNotBlank(XMLUtils.getChildNodeContent(eElement, "TodayDate"))
						? CSUFUtils.getSimpleDateFromatForOnbase(XMLUtils.getChildNodeContent(eElement, "TodayDate"))
						: StringUtils.EMPTY,
				XMLUtils.getChildNodeContent(eElement, "InstructorCWID"),
				XMLUtils.getChildNodeContent(eElement, "InstructorName"),
				XMLUtils.getChildNodeContent(eElement, "GradeChangeTo"),
				XMLUtils.getChildNodeContent(eElement, "GradeChangeFrom"),
				XMLUtils.getChildNodeContent(eElement, "massGradeChange"),
				XMLUtils.getChildNodeContent(eElement, "HiddenDepartmentCode"),
				XMLUtils.getChildNodeContent(eElement, "caseID"),
				XMLUtils.getChildNodeContent(eElement, "EnrollmentReqID"),
				StringUtils.isNotBlank(XMLUtils.getChildNodeContent(eElement, "RPFieldDate"))
						? CSUFUtils.getSimpleDateFromatForOnbase(XMLUtils.getChildNodeContent(eElement, "RPFieldDate"))
						: "01/01/1900",
				XMLUtils.getChildNodeContent(eElement, "Reason") };
		JsonObject json = new JsonObject();
		json.add("keywordTypes", oUtil.getKeywords(keyArray, KeyValueArray));
		byte[] bytes = CSUFUtils.toByteArrayFromInputStream(dorDocument.getInputStream());
		json.addProperty("attachment", Base64.getEncoder().encodeToString(bytes));
		json.addProperty("attachmentMimeType", "application/pdf");
		json.addProperty("attachmentType", "FinalDOR");
		json.addProperty("Document_Type", "RR Grade Change");
		return json;
	}

	private WorkflowVO setGradeChangeEmailAttributes(WorkflowVO workflowVO) {
		// Session session = globalConfigService.getAdminSession();
		try {
			EmailServiceVO emailVO = new EmailServiceVO();
			emailVO.setAttachments(null);
			emailVO.setBccAddress(globalConfigFilenetService.gcEmailBccAddresses());
			emailVO.setCcAddress(globalConfigFilenetService.gcEmailCcAddresses());
			emailVO.setToAddress(globalConfigFilenetService.gcEmailToAddresses());

			emailVO.setFromAddress(globalConfigFilenetService.gcEmailFromAddress());
			emailVO.setSubject(StringUtils.isNotBlank(globalConfigFilenetService.gcEmailSubject())
					? globalConfigFilenetService.gcEmailSubject()
					: "Test Subject");
			emailVO.setTemplatePath((StringUtils.isNotBlank(globalConfigFilenetService.gcEmailTemplatePath())
					? globalConfigFilenetService.gcEmailTemplatePath()
					: DEFAULT_TEMPLATE_PATH));
			// emailVO.setStartTLS(workflowConfig.isStartTLS());
			emailVO.setUseCQGateway(false);
			Map<String, String> templateVaribles = new HashMap<>();
			templateVaribles.put("senderEmail", emailVO.getFromAddress());
			templateVaribles.put("recipientEmail", emailVO.getToAddress().get(0));
			emailVO.setTemplateVaribles(templateVaribles);

			// If an image needs to be embedded with email body
			emailVO.setEmbeddedImage(true);
			emailVO.setEmbeddedImagePath((StringUtils.isNotBlank(globalConfigFilenetService.gcEmailEmbeddedImagePath())
					? globalConfigFilenetService.gcEmailEmbeddedImagePath()
					: DEFAULT_IMAGE_PATH));
			emailVO.setEmbeddedImageDescription("CSUF Logo");

			workflowVO.setEmailVO(emailVO);

		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		return workflowVO;
	}

}
