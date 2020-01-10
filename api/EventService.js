const BaseService = require('./BaseService');
const ApiUrls = require('../helpers/ApiUrls');

class EventService extends BaseService {

  /**
   * Retrieve a list of event types grouped by their respective version 
   * that you can configure on your webhooks
   *
   * @returns {Array}
   */
  getEventTypes() {
    return this.api.get(ApiUrls.eventTypes());
  }

  /**
   * Retrieves events ordered by the event date in descending order (latest first). 
   * Results can be paged by specifying the skip and limit query parameters.
   *
   * @returns {Object}
   */
  getEvents() {
    return this.api.get(ApiUrls.events());
  }

  /**
   * Retrieves the event with the specified identifier string.
   *
   * @param {String} eventId
   * @returns {Object}
   */
  getEvent(eventId) {
    return this.api.get(ApiUrls.event(eventId));
  }

  /**
   * Retrieves the attempts for a specific event notification
   *
   * @param {String} eventId
   * @param {String} norificationId
   * @returns {Array}
   */
  getEventNotifications(eventId, norificationId) {
    return this.api.get(ApiUrls.eventNotification(eventId, norificationId));
  }

  /**
   * Retries a specific webhook notification for the given event
   *
   * @param {String} eventId
   * @param {String} webhookId
   * @returns {Object}
   */
  retryWebhook(eventId, webhookId) {
    return this.api.post(ApiUrls.eventWebhookRetry(eventId, webhookId));
  }

  /**
   * Retries all webhook notifications configured for the specified event
   *
   * @param {String} eventId
   * @returns {Object}
   */
  retryAllWebhooks(eventId) {
    return this.api.post(ApiUrls.eventWebhooksRetry(eventId));
  }
}

module.exports = EventService;
