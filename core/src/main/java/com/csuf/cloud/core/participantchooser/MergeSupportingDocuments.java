package com.csuf.cloud.core.participantchooser;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.jcr.Binary;
import javax.jcr.Node;
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
import com.adobe.fd.signatures.client.types.Timestamp;
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
import com.csuf.cloud.core.services.GlobalConfigCSUFService;
import com.csuf.cloud.core.services.JDBCConnectionHelperService;
import com.csuf.cloud.core.utils.DatabaseUtils;

@Component(property = { "service.description=AssembleDocuments", "service.vendor=Adobe Systems",
		"process.label= Merge Supporing Documents" })
public class MergeSupportingDocuments implements WorkflowProcess {
	private static final Logger log;
	@Reference
	QueryBuilder queryBuilder;
	@Reference
	AssemblerService assemblerService;
	@Reference
	private JDBCConnectionHelperService jdbcConnectionService;
	@Reference
	private GlobalConfigCSUFService globalConfigCSUService;

	String finalDORFileName = "";
	String filenetURL = "http://erpicn521prd01.fullerton.edu:9080/CSUFAEMServices/rest/AEMService/addFinancialAidStudentRecords";
	String formName = "";
	String tableName = "AEM_AUDIT_TRACE";
	Connection dbConn = null;

	public Map<String, Object> createMapOfDocuments(final String payloadPath, final WorkflowSession workflowSession) {
		final Map<String, String> queryMap = new HashMap<String, String>();
		final Map<String, Object> mapOfDocuments = new HashMap<String, Object>();
		queryMap.put("type", "nt:file");
		queryMap.put("path", payloadPath);
		queryMap.put("createdby", "fd-service");
		final Query query = this.queryBuilder.createQuery(PredicateGroup.create(queryMap),
				(Session) workflowSession.adaptTo(Session.class));
		query.setStart(0L);
		query.setHitsPerPage(100L);
		final SearchResult result = query.getResult();
		MergeSupportingDocuments.log.info("Get result hits " + result.getHits().size());

		for (final Hit hit : result.getHits()) {
			try {
				final String path = hit.getPath();
				MergeSupportingDocuments.log.info("The title " + hit.getTitle() + " path " + path);
				if (!hit.getTitle().endsWith("pdf")) {
					continue;
				}
				final Node attachmentNode = ((Session) workflowSession.adaptTo(Session.class))
						.getNode(path + "/jcr:content");
				final InputStream pdfDocumentStream = attachmentNode.getProperty("jcr:data").getBinary().getStream();
				final Document attachmentDocument = new Document(pdfDocumentStream);
				mapOfDocuments.put(hit.getTitle(), attachmentDocument);
				MergeSupportingDocuments.log.debug("@@@@Added to map @@@@@ " + hit.getTitle());
			} catch (Exception e) {
				MergeSupportingDocuments.log.error(e.getMessage());
			}
		}
		return mapOfDocuments;
	}

	public Document createDDX(final org.w3c.dom.Document xmlDocument, final String[] tagNames) {
		final DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
		org.w3c.dom.Document ddx = null;
		MergeSupportingDocuments.log
				.info("In createDDXFromMapOfDocuments The number of tags I got was " + tagNames.length);
		try {
			final DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
			ddx = docBuilder.newDocument();
			final Element rootElement = ddx.createElementNS("http://ns.adobe.com/DDX/1.0/", "DDX");
			ddx.appendChild(rootElement);
			final Element pdfResult = ddx.createElement("PDF");
			pdfResult.setAttribute("result", "GeneratedDocument.pdf");
			rootElement.appendChild(pdfResult);

			for (int j = 0; j < tagNames.length; ++j) {
				final String tagName = tagNames[j];
				MergeSupportingDocuments.log.info("The tag name is " + tagName);
				final NodeList tags = xmlDocument.getElementsByTagName(tagName);
				for (int i = 0; i < tags.getLength(); ++i) {
					MergeSupportingDocuments.log.info("The tag name is " + tagName);
					final NodeList nl = tags.item(i).getChildNodes();
					for (int k = 0; k < nl.getLength(); ++k) {
						MergeSupportingDocuments.log.info("The node type is " + nl.item(k).getNodeType()
								+ nl.item(k).getNodeName() + nl.item(k).getTextContent());
						if (nl.item(k).getNodeType() == 1) {
							MergeSupportingDocuments.log.info("Adding pdf source " + nl.item(k).getTextContent());
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
			MergeSupportingDocuments.log.info(e.getMessage());
		}
		return this.orgw3cDocumentToAEMFDDocument(ddx);
	}

	public Document orgw3cDocumentToAEMFDDocument(final org.w3c.dom.Document xmlDocument) {
		final ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		final DOMSource source = new DOMSource(xmlDocument);
		MergeSupportingDocuments.log.info("$$$$In orgW3CDocumentToAEMFDDocument method");
		final StreamResult outputTarget = new StreamResult(outputStream);
		try {
			TransformerFactory.newInstance().newTransformer().transform(source, outputTarget);
		} catch (TransformerConfigurationException e) {
			log.error("TransformerConfigurationException From MergeDORAndDocuments Class"
					+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
		} catch (TransformerException e) {
			log.error("TransformerException From MergeDORAndDocuments Class" + Arrays.toString(e.getStackTrace())
					+ "Error Message" + e.getMessage());
		} catch (TransformerFactoryConfigurationError e) {
			log.error("TransformerFactoryConfigurationError From MergeDORAndDocuments Class"
					+ Arrays.toString(e.getStackTrace()) + "Error Message" + e.getMessage());
		}
		final InputStream is1 = new ByteArrayInputStream(outputStream.toByteArray());
		final Document xmlAEMFDDocument = new Document(is1);
		return xmlAEMFDDocument;
	}

	private Document assembleDocuments(final Map<String, Object> mapOfDocuments, final Document ddxDocument, String payloadPath) {
		LinkedHashMap<String, Object> dataMap = null;
		final AssemblerOptionSpec aoSpec = new AssemblerOptionSpec();
		aoSpec.setFailOnError(true);
		AssemblerResult ar = null;
		try {
			ar = this.assemblerService.invoke(ddxDocument, mapOfDocuments, aoSpec);
			return ar.getDocuments().get("GeneratedDocument.pdf");
		} catch (OperationException e) {
			log.error("OperationException From MergeDORAndDocuments Class" + Arrays.toString(e.getStackTrace())
					+ "Error Message" + e.getMessage());
			
			dataMap = new LinkedHashMap<String, Object>();
			DatabaseUtils dbUtil = new DatabaseUtils();
			String dataSourceVal = globalConfigCSUService.getAEMFormsDatabaseSource();
			dbConn = getConnection(dataSourceVal);
			if(dbConn != null) {
				log.info("Connection Successfull");
				java.sql.Timestamp auditStTime = new java.sql.Timestamp(System.currentTimeMillis());
				dataMap.put("EVENT_TYPE", "Filenet");
				dataMap.put("AUDIT_TIME", auditStTime);
				dataMap.put("FILENET_URL", filenetURL);
				dataMap.put("DATA_PROCESSED", "0");
				dataMap.put("FILENET_JSON", payloadPath);
				dataMap.put("FORM_NAME", formName);
				dataMap.put("ERROR_DESC", e.getMessage());
				
				log.info("dataMap Values:{}"+dataMap);
				
				dbUtil.insertAutitTrace(dbConn, dataMap, tableName);
			}else {
				log.info("Connection Failed");
			}
			
			return null;
		}finally {
			if (dbConn != null) {
				try {
					dbConn.close();
				} catch (SQLException e) {
					log.error(Arrays.toString(e.getStackTrace()));
				}
			}
		}
	}

	public void execute(final WorkItem workItem, final WorkflowSession workflowSession, final MetaDataMap arg2)
			throws WorkflowException {
		final String[] attachmentNames = ((String) arg2.get("PROCESS_ARGS", (Object) "string")).toString().split(",");
		int len = attachmentNames.length;
		finalDORFileName = attachmentNames[len - 1];
		len = len - 1;
		String[] newAttachmentNamesArray = Arrays.copyOf(attachmentNames, len);

		final Map<String, String> map = new HashMap<String, String>();
		map.put("path", workItem.getWorkflowData().getPayload().toString());
		final String payloadPath = workItem.getWorkflowData().getPayload().toString();
		formName = workItem.getWorkflow().getWorkflowModel().getTitle();
		log.info("Form Name = "+formName);
		final String dataFilePath = payloadPath + "/Data.xml/jcr:content";
		final Session session = workflowSession.adaptTo(Session.class);
		DocumentBuilderFactory factory = null;
		DocumentBuilder builder = null;
		org.w3c.dom.Document xmlDocument = null;
		Node xmlDataNode = null;
		try {
			xmlDataNode = session.getNode(dataFilePath);
			final InputStream xmlDataStream = xmlDataNode.getProperty("jcr:data").getBinary().getStream();
			MergeSupportingDocuments.log
					.debug("Got InputStream.... and the size available is ..." + xmlDataStream.available());
			factory = DocumentBuilderFactory.newInstance();
			builder = factory.newDocumentBuilder();
			xmlDocument = builder.parse(xmlDataStream);
			final Document ddxDocument = this.createDDX(xmlDocument, newAttachmentNamesArray);

			MergeSupportingDocuments.log.info("ddxDocument" + ddxDocument.getContentType());
			final Document assembledDocument = this
					.assembleDocuments(this.createMapOfDocuments(payloadPath, workflowSession), ddxDocument, payloadPath);
			if (MergeSupportingDocuments.log.isInfoEnabled()) {
				assembledDocument.copyToFile(new File(finalDORFileName));
			}
			final Node payloadNode = workflowSession.adaptTo(Session.class)
					.getNode(workItem.getWorkflowData().getPayload().toString());
			MergeSupportingDocuments.log.info("The payload Path is " + payloadNode.getPath());
			final Node assembledPDFNode = payloadNode.addNode(finalDORFileName, "nt:file");
			final Node jcrContentNode = assembledPDFNode.addNode("jcr:content", "nt:resource");
			final Binary binary = session.getValueFactory().createBinary(assembledDocument.getInputStream());
			jcrContentNode.setProperty("jcr:data", binary);
			MergeSupportingDocuments.log.info("Saved !!!!!!");
			session.save();
		} catch (Exception e1) {
			MergeSupportingDocuments.log.error(e1.getMessage());
		}
	}

	static {
		log = LoggerFactory.getLogger(MergeSupportingDocuments.class);
	}
	
	private Connection getConnection(String dataSource) {
		try {
			Connection dbConn = jdbcConnectionService.getDBConn(dataSource);
			log.info("Connection = {}", dbConn);
			return dbConn;

		} catch (Exception e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		return null;
	}
}
