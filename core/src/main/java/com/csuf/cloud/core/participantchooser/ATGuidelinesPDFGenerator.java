package com.csuf.cloud.core.participantchooser;

import java.io.InputStream;
import java.io.StringWriter;

import javax.jcr.Binary;
import javax.jcr.Node;
import javax.jcr.Session;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.json.JSONArray;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.FormService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = { "service.description=GenerateATGuidelinesPDF", "service.vendor=Adobe Systems",
		"process.label= AT Guidelines Generate PDF" })
public class ATGuidelinesPDFGenerator implements WorkflowProcess {

	@Reference
	private FormService formService;

	protected static Logger log = LoggerFactory.getLogger(ATGuidelinesPDFGenerator.class);

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {
		com.adobe.aemfd.docmanager.Document dorDocument = null;
		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String params = processArguments.get("PROCESS_ARGS", String.class);
		InputStream is = null;
		Document doc = null;
		Element afBoundDataElement = null;
		String collegeVal = null;
		String termVal = null;
		String chairCB = null;
		String chairSignature = null;
		String chairSignatureDate = null;
		String chairComment = null;
		String deanCB = null;
		String deanSignature = null;
		String deanSignatureDate = null;
		// String deanDecision = null;
		String deanComment = null;
		String department = null;
		JSONArray jsonArray = null;
		String fileName = null;
		if (params.equals("INITIAL")) {
			fileName = "AT_Guidelines.pdf";
		} else if (params.equals("FINAL")) {
			fileName = "AT_Guidelines_Final.pdf";
		}

		final Session session = workflowSession.adaptTo(Session.class);
		String payloadPath = workItem.getWorkflowData().getPayload().toString();
		try {
			if (StringUtils.isNotBlank(payloadPath)) {
				is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payloadPath, "Data.xml");
				if (null != is) {
					doc = XMLUtils.getDomDocument(is);
					if (null != doc) {
						afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");
						if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
							Element element = XMLUtils.getChildNode(afBoundDataElement, "ATGuidelines");
							String atData = XMLUtils.getChildNodeContent(element, "ATData");
							collegeVal = XMLUtils.getChildNodeContent(element, "College");
							termVal = XMLUtils.getChildNodeContent(element, "Term");
							chairCB = XMLUtils.getChildNodeContent(element, "ChairCB");
							chairSignature = XMLUtils.getChildNodeContent(element, "ChairSignature");
							chairSignatureDate = XMLUtils.getChildNodeContent(element, "ChairSignDate");
							chairComment = XMLUtils.getChildNodeContent(element, "ChairComments");
							deanCB = XMLUtils.getChildNodeContent(element, "DeanCB");
							deanSignature = XMLUtils.getChildNodeContent(element, "DeanSignature");
							deanSignatureDate = XMLUtils.getChildNodeContent(element, "DeanSignDate");
							// deanDecision = XMLUtils.getChildNodeContent(element, "DeanDecision");
							deanComment = XMLUtils.getChildNodeContent(element, "DeanComments");
							department = XMLUtils.getChildNodeContent(element, "DepartmentDisplayName");
							jsonArray = new JSONArray(atData);
							log.info("Json Array " + jsonArray);
						}
					}
				}
			}
			DocumentBuilderFactory documentFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder documentBuilder = documentFactory.newDocumentBuilder();
			Document document = documentBuilder.newDocument();
			Element factElements = document.createElement("ATGuidelines");
			Attr attr = document.createAttribute("xmlns:xfa");
			attr.setValue("http://www.xfa.org/schema/xfa-data/1.0/");
			factElements.setAttributeNode(attr);
			Attr attr2 = document.createAttribute("xmlns:xsi");
			attr2.setValue("http://www.w3.org/2001/XMLSchema-instance");
			factElements.setAttributeNode(attr2);
			document.appendChild(factElements);
			Element collegeValElement = document.createElement("College");
			collegeValElement.appendChild(document.createTextNode(collegeVal));
			factElements.appendChild(collegeValElement);
			Element departmentValElement = document.createElement("DepartmentDisplayName");
			departmentValElement.appendChild(document.createTextNode(department));
			factElements.appendChild(departmentValElement);
			Element termValElement = document.createElement("Term");
			termValElement.appendChild(document.createTextNode(termVal));
			factElements.appendChild(termValElement);
			Element chairCBElement = document.createElement("ChairCB");
			chairCBElement.appendChild(document.createTextNode(chairCB));
			factElements.appendChild(chairCBElement);
			Element chairSignatureElement = document.createElement("ChairSignature");
			chairSignatureElement.appendChild(document.createTextNode(chairSignature));
			factElements.appendChild(chairSignatureElement);
			Element chairSignDateElement = document.createElement("ChairSignDate");
			chairSignDateElement.appendChild(document.createTextNode(chairSignatureDate));
			factElements.appendChild(chairSignDateElement);
			Element chairCommentElement = document.createElement("ChairComments");
			chairCommentElement.appendChild(document.createTextNode(chairComment));
			factElements.appendChild(chairCommentElement);
			Element deanCBElement = document.createElement("DeanCB");
			deanCBElement.appendChild(document.createTextNode(deanCB));
			factElements.appendChild(deanCBElement);
			Element deanSignatureElement = document.createElement("DeanSignature");
			deanSignatureElement.appendChild(document.createTextNode(deanSignature));
			factElements.appendChild(deanSignatureElement);
			Element deanSignDateElement = document.createElement("DeanSignDate");
			deanSignDateElement.appendChild(document.createTextNode(deanSignatureDate));
			factElements.appendChild(deanSignDateElement);
			/*
			 * Element deanDecisionElement = document.createElement("DeanDecision");
			 * deanDecisionElement.appendChild(document.createTextNode(deanDecision));
			 * factElements.appendChild(deanDecisionElement);
			 */
			Element deanCommentElement = document.createElement("DeanComments");
			deanCommentElement.appendChild(document.createTextNode(deanComment));
			factElements.appendChild(deanCommentElement);
			Element tableElement = document.createElement("Table1");
			factElements.appendChild(tableElement);
			for (int i = 0; i < jsonArray.length(); i++) {
				Element rowElement = document.createElement("Row1");
				tableElement.appendChild(rowElement);
				JSONObject obj = jsonArray.getJSONObject(i);
				if (obj.has("COLLEGE")) {
					Element collegeElement = document.createElement("CollegeName");
					collegeElement.appendChild(document.createTextNode(obj.getString("COLLEGE")));
					rowElement.appendChild(collegeElement);
				}
				if (obj.has("DEPT_ID")) {
					Element deptElement = document.createElement("Dept");
					deptElement.appendChild(document.createTextNode(obj.getString("DEPT_ID")));
					rowElement.appendChild(deptElement);
				}
				if (obj.has("FULL_NAME")) {
					Element fullNameElement = document.createElement("FacultyName");
					fullNameElement.appendChild(document.createTextNode(obj.getString("FULL_NAME")));
					rowElement.appendChild(fullNameElement);
				}
				if (obj.has("CWID")) {
					Element cwidElement = document.createElement("FacultyCWID");
					cwidElement.appendChild(document.createTextNode(obj.getString("CWID")));
					rowElement.appendChild(cwidElement);
				}
				if (obj.has("EMAIL")) {
					Element emailElement = document.createElement("FacultyEmail");
					emailElement.appendChild(document.createTextNode(obj.getString("EMAIL")));
					rowElement.appendChild(emailElement);
				}
				if (obj.has("START_TERM")) {
					Element termElement = document.createElement("TermSelection");
					termElement.appendChild(document.createTextNode(obj.getString("START_TERM")));
					rowElement.appendChild(termElement);
				}
				if (obj.has("WTU")) {
					Element wtuElement = document.createElement("WTU");
					wtuElement.appendChild(document.createTextNode(obj.getString("WTU")));
					rowElement.appendChild(wtuElement);
				}
				if (obj.has("TIME_REASON")) {
					Element timeReasonElement = document.createElement("AssignedTimeCode");
					timeReasonElement.appendChild(document.createTextNode(obj.getString("TIME_REASON")));
					rowElement.appendChild(timeReasonElement);
				}
				if (obj.has("BRIEF_ASSIGNMENT")) {
					Element briefAssignmentElement = document.createElement("BriefDescription");
					briefAssignmentElement.appendChild(document.createTextNode(obj.getString("BRIEF_ASSIGNMENT")));
					rowElement.appendChild(briefAssignmentElement);
				}
				if (obj.has("DEPT_CHAIR_NAME")) {
					Element chairNameElement = document.createElement("DeptChair");
					chairNameElement.appendChild(document.createTextNode(obj.getString("DEPT_CHAIR_NAME")));
					rowElement.appendChild(chairNameElement);
				}
				if (obj.has("DEPT_CHAIR_EMAIL")) {
					Element chairEmailElement = document.createElement("DeptChairEmail");
					chairEmailElement.appendChild(document.createTextNode(obj.getString("DEPT_CHAIR_EMAIL")));
					rowElement.appendChild(chairEmailElement);
				}
			}

			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			DOMSource domSource = new DOMSource(document);
			StringWriter stringWriter = new StringWriter();
			StreamResult streamResult = new StreamResult(stringWriter);
			transformer.transform(domSource, streamResult);

			String data = stringWriter.toString();
			dorDocument = formService.getDoR(data,
					"/content/forms/af/faculty-assigned-time-agreement--at-guidelines-/faculty-assigned-time-agreement--at-guidelines-",
					fileName);
			log.debug("XML = " + data);
			final Node payloadNode = workflowSession.adaptTo(Session.class)
					.getNode(workItem.getWorkflowData().getPayload().toString());
			final Node assembledPDFNode = payloadNode.addNode(fileName, "nt:file");
			final Node jcrContentNode = assembledPDFNode.addNode("jcr:content", "nt:resource");
			final Binary binary = session.getValueFactory().createBinary(dorDocument.getInputStream());
			jcrContentNode.setProperty("jcr:data", binary);
			log.info("Saved !!!!!!");
			session.save();
		} catch (Exception e) {
			log.error("Error while creating XML", e);
			// sendEmailtoAdmin();
		}

	}
}
