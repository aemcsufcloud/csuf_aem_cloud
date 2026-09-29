package com.csuf.cloud.core.workflow;

import java.io.InputStream;
import java.util.Arrays;

import javax.jcr.Session;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.AssetService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.XMLUtils;

@Component(property = {
		"service.description==User Record for Audit Comment History for Position Description - Manager/Staff",
		"process.label" + "=TimeStampforNewPDAuditHistory" })
public class NewPDUserRecordForAuditHistory implements WorkflowProcess {

	@Reference
	private AssetService assetService;

	private static final Logger log = LoggerFactory.getLogger(NewPDUserRecordForAuditHistory.class);

	private static final String DATE_FORMAT_US = "M/d/yyyy h:m:s a";

	@Override
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap processArguments)
			throws WorkflowException {

		Session session = workflowSession.adaptTo(Session.class);

		Document doc = null;
		InputStream is = null;

		String mppPDComment = "";
		String compServicesComment = "";
		String loggedInUserID = "";
		String stageIndicator = "";

		Element afBoundDataElement = null;
		Element parentNode = null;

		String dateValue = CSUFUtils.convertDateToString(new java.util.Date(), DATE_FORMAT_US);

		String workflowModelName = workItem.getWorkflow().getWorkflowModel().getTitle();
		log.info("workflowModelName= " + workflowModelName);

		ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class);
		String payload = workItem.getWorkflowData().getPayload().toString();
		try {

			is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payload, "Data.xml");
			if (null != is) {
				doc = XMLUtils.getDomDocument(is);

				Element afUnBoundDataElement = XMLUtils.getParentNode(doc, "afUnboundData");
				afBoundDataElement = XMLUtils.getParentNode(doc, "afBoundData");

				if (null != afUnBoundDataElement && afUnBoundDataElement.hasChildNodes()) {
					loggedInUserID = XMLUtils.getChildNodeContent(afUnBoundDataElement, "logUser");
				}

				if (workflowModelName.equals("New Position Description - Manager")) {
					parentNode = XMLUtils.getChildNode(afBoundDataElement, "NewPosition");
				} else if (workflowModelName.equals("New Position Description - Staff")) {
					parentNode = XMLUtils.getChildNode(afBoundDataElement, "NewPositionStaff");
				}

				if (null != afBoundDataElement && afBoundDataElement.hasChildNodes()) {
					stageIndicator = XMLUtils.getChildNodeContent(afBoundDataElement, "StageIndicator");
					mppPDComment = XMLUtils.getChildNodeContent(afBoundDataElement, "mppPDComments");
					compServicesComment = XMLUtils.getChildNodeContent(afBoundDataElement, "compServicesComments");
				}

				if (StringUtils.isNotBlank(stageIndicator) && stageIndicator.equals("ToMPPReview")) {
					String mppPDCommentUpdatedValue = mppPDComment.trim()
							.concat("\t(Comments By: " + loggedInUserID + " at " + dateValue + ")");

					if (StringUtils.isNotBlank(mppPDComment) && !mppPDComment.trim().endsWith("PM)")
							&& !mppPDComment.trim().endsWith("AM)")) {
						Node mppCommentsNode = doc.getElementsByTagName("mppPDComments").item(0);
						mppCommentsNode.getParentNode().removeChild(mppCommentsNode);
						XMLUtils.createXMLChildElement(doc, parentNode, "mppPDComments", mppPDCommentUpdatedValue);
					}
				} else if (StringUtils.isNotBlank(stageIndicator) && stageIndicator.equals("ToCompService")) {
					String compServicesCommentUpdatedValue = compServicesComment.trim()
							.concat("\t(Comments By: " + loggedInUserID + " at " + dateValue + ")");

					if (StringUtils.isNotBlank(compServicesComment) && !compServicesComment.trim().endsWith("PM)")
							&& !compServicesComment.trim().endsWith("AM)")) {
						Node compServicesCommentNode = afBoundDataElement.getElementsByTagName("compServicesComments")
								.item(0);
						compServicesCommentNode.getParentNode().removeChild(compServicesCommentNode);
						XMLUtils.createXMLChildElement(doc, parentNode, "compServicesComments",
								compServicesCommentUpdatedValue);
					}
				}

				is = XMLUtils.getInputStreamFromXMLDocument(doc);
				boolean isOverwriteNtFileToNodePath = assetService.overwriteNtFileToNodePath(session, "Data.xml",
						payload, "sling:Folder", is);
				log.info("isOverwriteNtFileToNodePath status-- " + isOverwriteNtFileToNodePath);
			}

		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
	}
}
