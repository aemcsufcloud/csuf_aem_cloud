package com.csuf.cloud.core.servlets;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactoryConfigurationError;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.Route;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.csuf.cloud.core.services.AssetService;
import com.csuf.cloud.core.services.BulkApprovalFactoryConfigService;
import com.csuf.cloud.core.services.EmailService;
import com.csuf.cloud.core.services.TaskService;
import com.csuf.cloud.core.services.WorkflowConfigService;
import com.csuf.cloud.core.services.WorkflowService;
import com.csuf.cloud.core.utils.CSUFUtils;
import com.csuf.cloud.core.utils.XMLUtils;
import com.csuf.cloud.core.vo.WorkflowVO;

@Component(service = Servlet.class, property = { "sling.servlet.methods=" + HttpConstants.METHOD_GET,
		"sling.servlet.paths=" + "/bin/bulkApproval" })
public class BulkApprovalServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = 1L;

	@Reference
	private WorkflowConfigService workflowConfig;

	@Reference
	private WorkflowService workflowService;
	@Reference
	private AssetService assetService;
	@Reference
	private EmailService emailService;
	@Reference
	private TaskService taskService;
	private Map<String, BulkApprovalFactoryConfigService> configMap;

	@Reference(name = "OSGIFactoryConfig", cardinality = ReferenceCardinality.MULTIPLE, policy = ReferencePolicy.DYNAMIC)
	protected synchronized void bindOSGIFactoryConfig(final BulkApprovalFactoryConfigService config) {
		if (configMap == null) {
			configMap = new HashMap<String, BulkApprovalFactoryConfigService>();
		}
		configMap.put(config.uniqueIdentifier(), config);
	}

	protected synchronized void unbindOSGIFactoryConfig(final BulkApprovalFactoryConfigService config) {
		configMap.remove(config.uniqueIdentifier());
	}

	public enum ActionType {
		GET_DATA, COMPLETE_TASK;

		private ActionType() {
		}
	}

	/** Default log. */
	protected final Logger log = LoggerFactory.getLogger(this.getClass());
	private static final String ASSIGN_TASK_STEP = "forms:assigntask";

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	@Override
	protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		String actionType = request.getParameter("action");
		String[] witemArray = request.getParameter("wItemArray").split(",");
		String[] fieldArray = request.getParameter("fields").split(",");
		JSONArray resultArray = new JSONArray();
		log.debug("witemArray = " + witemArray.toString());
		log.debug("fieldArray = " + fieldArray.toString());
		ResourceResolver resolver = request.getResourceResolver();
		Session session = resolver.adaptTo(Session.class);
		WorkflowSession wfSession = resolver.adaptTo(WorkflowSession.class);
		if (StringUtils.isNotBlank(actionType) && actionType.equalsIgnoreCase(ActionType.COMPLETE_TASK.name())) {

			try {
				WorkflowVO workflowVO = new WorkflowVO();
				workflowVO.setGraniteWorkflowSession(wfSession);
				workflowVO.setAdminSession(session);
				for (int i = 0; i < witemArray.length; i++) {
					log.debug("witemArray[i] = " + witemArray[i]);
					WorkItem currentWorkItem = wfSession.getWorkItem(witemArray[i]);
					configMap.forEach((bulkApprovalConfigIdentifier, bulkApprovalConfig) -> {
						if (StringUtils.isNotBlank(bulkApprovalConfigIdentifier)) {
							String titleFromConfig = bulkApprovalConfig.workflowModel();
							String titleFromMetadata = currentWorkItem.getWorkflow().getWorkflowModel().getTitle();
							String wItemTitleFromConfig = bulkApprovalConfig.taskTitle();
							String actionMetadataField = bulkApprovalConfig.actionMetadataField();
							String wItemTitleFromMetadata = currentWorkItem.getNode().getTitle();
							String xmlElement = bulkApprovalConfig.xmlElement();
							String actionToBeTaken = bulkApprovalConfig.actionToBeTaken();
							JSONArray dataFields = new JSONArray();
							List<String> xmlList = bulkApprovalConfig.xmlFieldsToUpdate();
							for (int n = 0; n < xmlList.size(); n++) {
								JSONObject obj = new JSONObject();
								try {
									String value = xmlList.get(n).toString();
									obj.put(value.substring(0, xmlList.get(n).indexOf("~")), fieldArray[n]
											.substring(fieldArray[n].indexOf("~") + 1, fieldArray[n].length()));
									dataFields.put(obj);
								} catch (JSONException e) {
									log.error(Arrays.toString(e.getStackTrace()));
								}
							}
							log.debug("titleFromConfig.equals(titleFromMetadata) = "
									+ titleFromConfig.equals(titleFromMetadata));
							log.debug("wItemTitleFromConfig.equals(wItemTitleFromMetadata) = "
									+ wItemTitleFromConfig.equals(wItemTitleFromMetadata));

							if (titleFromConfig.equals(titleFromMetadata)
									&& wItemTitleFromConfig.equals(wItemTitleFromMetadata)) {
								workflowVO.setWorkItem(currentWorkItem);
								workflowVO.setRoutes(bulkApprovalConfig.getRoutes());
								workflowVO.setXmlFields(dataFields);
								workflowVO.setXmlElement(xmlElement);
								workflowVO.setMetadataField(actionMetadataField);
								workflowVO.setActionToBeTaken(actionToBeTaken);
								try {
									log.debug("workflowVO = " + workflowVO.getWorkItem());
									Boolean status = completeTheTask(workflowVO);
									JSONObject statusObj = new JSONObject();
									statusObj.put(currentWorkItem.getId(), status);
									resultArray.put(statusObj);
									log.debug("status = " + status);
								} catch (RepositoryException e) {
									// TODO Auto-generated catch block
									log.error(Arrays.toString(e.getStackTrace()));
								} catch (TransformerException e) {
									// TODO Auto-generated catch block
									log.error(Arrays.toString(e.getStackTrace()));
								} catch (JSONException e) {
									// TODO Auto-generated catch block
									log.error(Arrays.toString(e.getStackTrace()));
								}
							}
						}
					});
				}

				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(resultArray.toString());
				log.debug("exit with resultArray size : {}", resultArray.length());

			} catch (WorkflowException e) {
				e.printStackTrace();
			} finally {
				if (null != resolver && resolver.isLive()) {
					resolver.close();
				}
				if (wfSession != null) {
					wfSession.logout();
				}
				if (session != null) {
					session.logout();
				}
			}

		}
	}

	public boolean completeTheTask(WorkflowVO workflowVO)
			throws RepositoryException, TransformerException, JSONException {
		try {
			WorkflowSession graniteWorkflowSession = workflowVO.getGraniteWorkflowSession();
			WorkItem item = workflowVO.getWorkItem();

			if (log.isDebugEnabled())
				log.debug("Workitem begin time inside completeDeadlinedTask method : {}", item.getProgressBeginTime());
			List<Route> routes = graniteWorkflowSession.getRoutes(item, false);
			List<String> configuredRoutes = workflowVO.getRoutes();
			if (null != routes && !routes.isEmpty()) {
				for (Route route : routes) {
					if (log.isDebugEnabled())
						log.debug("Available route for the workitem :::: {}", route.getName());
					for (String configuredRoute : configuredRoutes) {
						if (log.isDebugEnabled())
							log.debug("Configured route for the workitem :::: {}", configuredRoute);
						if (route.getName().contains(configuredRoute)
								&& item.getItemSubType().equalsIgnoreCase(ASSIGN_TASK_STEP)) {
							JSONArray dataFieldsArray = workflowVO.getXmlFields();

							Document doc = null;
							InputStream is = null;
							ResourceResolver resolver = workflowVO.getGraniteWorkflowSession()
									.adaptTo(ResourceResolver.class);
							String payload = workflowVO.getWorkItem().getWorkflowData().getPayload().toString();

							is = CSUFUtils.getDataXMLStreamFromPayloadPath(resolver, payload, "Data.xml");
							if (null != is) {
								doc = XMLUtils.getDomDocument(is);
								String xml = XMLUtils.prettyPrintAsString(doc);
								doc = XMLUtils.parseXmlFile(xml);
								Element xmlRoot = doc.getDocumentElement();
								Element xmlElement = XMLUtils.getChildNode(xmlRoot, workflowVO.getXmlElement());
								for (int j = 0; j < dataFieldsArray.length(); j++) {
									Iterator<?> keys = dataFieldsArray.getJSONObject(j).keys();
									String key = (String) keys.next();
									if (null != dataFieldsArray.getJSONObject(j).get(key) && null != key) {
										log.debug("payload node length = {}",
												XMLUtils.getElementLength(xmlElement, key));
										if (XMLUtils.getElementLength(xmlElement, key) > 0) {
											XMLUtils.removeChildNode(doc, xmlElement, key);
										}
										log.debug("value after removal= {}",
												dataFieldsArray.getJSONObject(j).get(key).toString());
										log.debug("child node length after removal = {}",
												XMLUtils.getElementLength(xmlElement, key));
										XMLUtils.createXMLChildElement(doc, xmlElement, key,
												dataFieldsArray.getJSONObject(j).get(key).toString());

									}
								}
							}

							InputStream inputStrems = XMLUtils.getInputStreamFromXMLDocument(doc);
							boolean isOverwriteNtFileToNodePath = assetService.overwriteNtFileToNodePath(
									null != workflowVO.getAdminSession() ? workflowVO.getAdminSession()
											: resolver.adaptTo(Session.class),
									"Data.xml", payload, "sling:Folder", inputStrems);
							log.debug("payload node got overwritten with status = {}", isOverwriteNtFileToNodePath);
							if (isOverwriteNtFileToNodePath) {
								MetaDataMap map = item.getWorkflow().getWorkflowData().getMetaDataMap();
								map.put(workflowVO.getMetadataField(), workflowVO.getActionToBeTaken());
								graniteWorkflowSession.complete(item, route);
								log.info("workitem :::::: ".concat(item.getId())
										.concat(" ::::: successfully advanced to next step in the workflow"));

								return true;
							}
						}
					}
				}
			}
		} catch (Exception | TransformerFactoryConfigurationError e) {
			log.error(Arrays.toString(e.getStackTrace()));
		}
		return false;
	}
}
