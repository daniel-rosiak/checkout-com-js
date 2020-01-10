const BaseService = require('./BaseService');
const ApiUrls = require('../helpers/ApiUrls');

class WebhookService extends BaseService {

  /**
   * Retrieves the webhooks configured for the channel identified by your API key
   *
   * @returns {Array}
   */
  getWebhooks() {
    return this.api.get(ApiUrls.webhooks());
  }

  /**
   * Register a new webhook endpoint that Checkout.com will POST all or selected events to
   *
   * @param {Object} payload 
   * @returns {Object}
   */
  createWebhook(payload) {
    return this.api.post(ApiUrls.webhooks(), payload);
  }

  /**
   * Retrieves the webhook with the specified identifier string.
   *
   * @param {String} webhookId
   * @returns {Object}
   */
  getWebhook(webhookId) {
    return this.api.get(ApiUrls.webhook(webhookId));
  }

  /**
   * Updates all or some of the registered webhook details
   *
   * @param {String} webhookId
   * @param {Object} payload
   * @returns {Object}
   */
  updateWebhook(webhookId, payload) {
    return this.api.patch(ApiUrls.webhook(webhookId), payload);
  }

  /**
   * Removes an existing webhook
   *
   * @param {String} webhookId
   * @returns {Object}
   */
  deleteWebhook(webhookId) {
    return this.api.delete(ApiUrls.webhook(webhookId));
  }
}

module.exports = WebhookService;
