package com.csuf.cloud.core.participantchooser;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import javax.jcr.Binary;
import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import com.adobe.aemfd.docmanager.Document;
import com.adobe.fd.assembler.client.AssemblerOptionSpec;
import com.adobe.fd.assembler.client.AssemblerResult;
import com.adobe.fd.assembler.client.OperationException;
import com.adobe.fd.assembler.service.AssemblerService;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;

@Component(property = {"service.description=AssembleDocuments", "service.vendor=Adobe Systems",
		"process.label=Student Tax Filing Merge Docs" })
public class StudentTaxFilingMergeDocuments implements WorkflowProcess {
	private static final Logger log;
	@Reference
	QueryBuilder queryBuilder;
	@Reference
	AssemblerService assemblerService;

	String mergeDORFileName = "Generated_DOR.pdf";
	String finalDORFileName = "Student_Tax_Filing_Statement.pdf";

	public Map<String, Object> createMapOfDocuments(final String payloadPath, final WorkflowSession workflowSession) {
		final Map<String, String> queryMap = new HashMap<String, String>();
		final Map<String, Object> mapOfDocuments = new HashMap<String, Object>();
		queryMap.put("type", "nt:file");
		queryMap.put("path", payloadPath);
		final Query query = this.queryBuilder.createQuery(PredicateGroup.create((Map) queryMap),
				(Session) workflowSession.adaptTo((Class) Session.class));
		query.setStart(0L);
		query.setHitsPerPage(100L);
		final SearchResult result = query.getResult();
		StudentTaxFilingMergeDocuments.log.info("Get result hits " + result.getHits().size());
		String dorPath = payloadPath.concat("/").concat(mergeDORFileName);

		try {
			Node dorNode = ((Session) workflowSession.adaptTo((Class) Session.class)).getNode(dorPath + "/jcr:content");
			Document dorDocument = new Document(dorNode.getProperty("jcr:data").getBinary().getStream());
			mapOfDocuments.put(mergeDORFileName, dorDocument);
		} catch (PathNotFoundException e) {
			log.error("PathNotFoundException From StudentTaxFilingMergeDocuments Class"
					+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
		} catch (RepositoryException e) {
			log.error("RepositoryException From StudentTaxFilingMergeDocuments Class"
					+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
		}
		for (final Hit hit : result.getHits()) {
			try {
				final String path = hit.getPath();
				StudentTaxFilingMergeDocuments.log.info("The title " + hit.getTitle() + " path " + path);
				if (!hit.getTitle().endsWith("pdf")) {
					log.info("inside====" + hit.getTitle().endsWith("pdf"));
					continue;
				}
				final Node attachmentNode = ((Session) workflowSession.adaptTo((Class) Session.class))
						.getNode(path + "/jcr:content");
				final InputStream pdfDocumentStream = attachmentNode.getProperty("jcr:data").getBinary().getStream();
				final Document attachmentDocument = new Document(pdfDocumentStream);
				mapOfDocuments.put(hit.getTitle(), attachmentDocument);
				StudentTaxFilingMergeDocuments.log.debug("@@@@Added to map @@@@@ " + hit.getTitle());
			} catch (Exception e) {
				StudentTaxFilingMergeDocuments.log.error(e.getMessage());
			}
		}
		return mapOfDocuments;
	}

	public Document createDDX(final org.w3c.dom.Document xmlDocument, final String[] tagNames, String dorName) {
		final DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
		org.w3c.dom.Document ddx = null;
		StudentTaxFilingMergeDocuments.log
				.info("In createDDXFromMapOfDocuments The number of tags I got was " + tagNames.length);
		try {
			final DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
			ddx = docBuilder.newDocument();
			final Element rootElement = ddx.createElementNS("http://ns.adobe.com/DDX/1.0/", "DDX");
			ddx.appendChild(rootElement);
			final Element pdfResult = ddx.createElement("PDF");
			pdfResult.setAttribute("result", "GeneratedDocument.pdf");
			rootElement.appendChild(pdfResult);
			// ddx for DOR
			final Element pdfSourceElement = ddx.createElement("PDF");
			final Element noForms = ddx.createElement("NoForms");
			pdfSourceElement.setAttribute("bookmarkTitle", dorName);
			pdfSourceElement.setAttribute("source", dorName);
			pdfSourceElement.appendChild(noForms);
			pdfResult.appendChild(pdfSourceElement);

			for (int j = 0; j < tagNames.length; ++j) {
				final String tagName = tagNames[j];
				StudentTaxFilingMergeDocuments.log.info("The tag name is " + tagName);
				final NodeList tags = xmlDocument.getElementsByTagName(tagName);
				for (int i = 0; i < tags.getLength(); ++i) {
					StudentTaxFilingMergeDocuments.log.info("The tag name is " + tagName);
					final NodeList nl = tags.item(i).getChildNodes();
					for (int k = 0; k < nl.getLength(); ++k) {
						StudentTaxFilingMergeDocuments.log.info("The node type is " + nl.item(k).getNodeType()
								+ nl.item(k).getNodeName() + nl.item(k).getTextContent());
						if (nl.item(k).getNodeType() == 1) {
							StudentTaxFilingMergeDocuments.log.info("Adding pdf source " + nl.item(k).getTextContent());
							final Element pdfSourceElement1 = ddx.createElement("PDF");
							final Element noForms1 = ddx.createElement("NoForms");
							pdfSourceElement1.setAttribute("bookmarkTitle", nl.item(k).getTextContent());
							pdfSourceElement1.setAttribute("source", nl.item(k).getTextContent());
							pdfSourceElement1.appendChild(noForms1);
							pdfResult.appendChild(pdfSourceElement1);
						}
					}
				}
			}
		} catch (Exception e) {
			StudentTaxFilingMergeDocuments.log.info(e.getMessage());
		}
		return this.orgw3cDocumentToAEMFDDocument(ddx);
	}

	public Document orgw3cDocumentToAEMFDDocument(final org.w3c.dom.Document xmlDocument) {
		final ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		final DOMSource source = new DOMSource(xmlDocument);
		StudentTaxFilingMergeDocuments.log.info("$$$$In orgW3CDocumentToAEMFDDocument method");
		final StreamResult outputTarget = new StreamResult(outputStream);
		try {
			TransformerFactory.newInstance().newTransformer().transform(source, outputTarget);
		} catch (TransformerConfigurationException e) {
			log.error("TransformerConfigurationException From StudentTaxFilingMergeDocuments Class"
					+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
		} catch (TransformerException e) {
			log.error("TransformerException From StudentTaxFilingMergeDocuments Class"
					+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
		} catch (TransformerFactoryConfigurationError e) {
			log.error("TransformerFactoryConfigurationError From StudentTaxFilingMergeDocuments Class"
					+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
		}
		final InputStream is1 = new ByteArrayInputStream(outputStream.toByteArray());
		final Document xmlAEMFDDocument = new Document(is1);
		return xmlAEMFDDocument;
	}

	private Document assembleDocuments(final Map<String, Object> mapOfDocuments, final Document ddxDocument) {
		final AssemblerOptionSpec aoSpec = new AssemblerOptionSpec();
		aoSpec.setFailOnError(true);
		AssemblerResult ar = null;
		try {
			ar = this.assemblerService.invoke(ddxDocument, (Map) mapOfDocuments, aoSpec);
			return ar.getDocuments().get("GeneratedDocument.pdf");
		} catch (OperationException e) {
			log.error("OperationException From StudentTaxFilingMergeDocuments Class"
					+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
			return null;
		}
	}

	public void execute(final WorkItem workItem, final WorkflowSession workflowSession, final MetaDataMap arg2)
			throws WorkflowException {
		final String[] attachmentNames = ((String) arg2.get("PROCESS_ARGS", (Object) "string")).toString().split(",");
		final Map<String, String> map = new HashMap<String, String>();
		map.put("path", workItem.getWorkflowData().getPayload().toString());
		final String payloadPath = workItem.getWorkflowData().getPayload().toString();
		final String dataFilePath = payloadPath + "/Data.xml/jcr:content";
		final Session session = (Session) workflowSession.adaptTo((Class) Session.class);
		DocumentBuilderFactory factory = null;
		DocumentBuilder builder = null;
		org.w3c.dom.Document xmlDocument = null;
		Node xmlDataNode = null;
		try {
			xmlDataNode = session.getNode(dataFilePath);
			final InputStream xmlDataStream = xmlDataNode.getProperty("jcr:data").getBinary().getStream();
			StudentTaxFilingMergeDocuments.log
					.debug("Got InputStream.... and the size available is ..." + xmlDataStream.available());
			factory = DocumentBuilderFactory.newInstance();
			builder = factory.newDocumentBuilder();
			xmlDocument = builder.parse(xmlDataStream);
			final Document ddxDocument = this.createDDX(xmlDocument, attachmentNames, mergeDORFileName);
			StudentTaxFilingMergeDocuments.log.info("ddxDocument" + ddxDocument.getContentType());
			final Document assembledDocument = this
					.assembleDocuments(this.createMapOfDocuments(payloadPath, workflowSession), ddxDocument);
			if (StudentTaxFilingMergeDocuments.log.isInfoEnabled()) {
				assembledDocument.copyToFile(new File(finalDORFileName));
			}
			final Node payloadNode = ((Session) workflowSession.adaptTo((Class) Session.class))
					.getNode(workItem.getWorkflowData().getPayload().toString());
			StudentTaxFilingMergeDocuments.log.info("The payload Path is " + payloadNode.getPath());
			final Node assembledPDFNode = payloadNode.addNode(finalDORFileName, "nt:file");
			final Node jcrContentNode = assembledPDFNode.addNode("jcr:content", "nt:resource");
			final Binary binary = session.getValueFactory().createBinary(assembledDocument.getInputStream());
			jcrContentNode.setProperty("jcr:data", binary);
			StudentTaxFilingMergeDocuments.log.info("Saved !!!!!!");
			session.save();
		} catch (Exception e1) {
			StudentTaxFilingMergeDocuments.log.error(e1.getMessage());
		}
	}

	static {
		log = LoggerFactory.getLogger((Class) StudentTaxFilingMergeDocuments.class);
	}
}
