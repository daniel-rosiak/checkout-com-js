/**
 * Checkout.com API urls
 * 
 * API Documentation: https://api-reference.checkout.com
 */
const ApiUrls = {
  /**
   * Creates a payment request.
   * method: POST
   */
  payments: () => `payments`,

  /**
   * Returns the details of the payment with the specified identifier string.
   * method: GET
   * 
   * @param {String} id
   * @returns {String}
   */
  payment: (id) => `payments/${id}`,

  /**
   * Returns all the actions associated with a payment ordered 
   * by processing date in descending order (latest first).
   * method: GET
   * 
   * @param {String} id
   * @returns {String}
   */
  paymentActions: (id) => `payments/${id}/actions`,

  /**
   * Captures a payment if supported by the payment method.
   * For card payments, capture requests are processed asynchronously.
   * You can use webhooks to be notified if the capture is successful.
   * method: POST
   * 
   * @param {String} id
   * @returns {String}
   */
  paymentCapture: (id) => `payments/${id}/captures`,

  /**
   * Refunds a payment if supported by the payment method.
   * For card payments, refund requests are processed asynchronously. 
   * You can use webhooks to be notified if the refund is successful.
   * method: POST
   * 
   * @param {String} id
   * @returns {String}
   */
  paymentRefund: (id) => `payments/${id}/refunds`,

  /**
   * Voids a payment if supported by the payment method.
   * For card payments, void requests are processed asynchronously. 
   * You can use webhooks to be notified if the void is successful.
   * method: POST
   * 
   * @param {String} id
   * @returns {String}
   */
  paymentVoid: (id) => `payments/${id}/voids`,

  /**
   * Add a reusable payment source that can be used later to make one or more payments. 
   * Payment sources are linked to a specific customer and cannot be shared between customers.
   * method: POST
   * 
   * @returns {String}
   */
  sources: () => `sources`,

  /**
   * Exchange card details or a digital wallet payment token
   * for a reference token that can be used later to request a card payment.
   * method: POST
   * 
   * @returns {String}
   */
  tokens: () => `tokens`,

  /**
   * Retrieves the webhooks configured for the channel identified by your API key
   * method: GET
   * 
   * Register a new webhook endpoint that Checkout.com will POST all or selected events to
   * method: POST
   * 
   * @returns {String}
   */
  webhooks: () => `webhooks`,

  /**
   * Retrieves the webhook with the specified identifier string.
   * method: GET
   * 
   * Updates an existing webhook
   * method: PUT
   * 
   * Updates all or some of the registered webhook details
   * method: PATCH
   * 
   * Removes an existing webhook
   * method: DELETE
   * 
   * @param {String} id
   * @returns {String}
   */
  webhook: (id) => `webhooks/${id}`,

  /**
   * Retrieve a list of event types grouped by their respective version 
   * that you can configure on your webhooks
   * method: GET
   * 
   * @returns {String}
   */
  eventTypes: () => `event-types`,

  /**
   * Retrieves events ordered by the event date in descending order (latest first). 
   * Results can be paged by specifying the skip and limit query parameters.
   * method: GET
   * 
   * @returns {String}
   */
  events: () => `events`,

  /**
   * Retrieves the event with the specified identifier string.
   * method: GET
   * 
   * @param {String} eventId
   * @returns {String}
   */
  event: (eventId) => `events/${eventId}`,

  /**
   * Retrieves the attempts for a specific event notification
   * method: GET
   * 
   * @param {String} eventId
   * @param {String} notificationId
   * @returns {String}
   */
  eventNotification: (eventId, notificationId) => `events/${eventId}/notifications/${notificationId}`,

  /**
   * Retries a specific webhook notification for the given event
   * method: POST
   * 
   * @param {String} eventId
   * @param {String} webhookId
   * @returns {String}
   */
  eventWebhookRetry: (eventId, webhookId) => `events/${eventId}/webhooks/${webhookId}/retry`,

  /**
   * Retries all webhook notifications configured for the specified event
   * method: POST
   * 
   * @param {String} eventId
   * @returns {String}
   */
  eventWebhooksRetry: (eventId) => `events/${eventId}/webhooks/retry`

}

module.exports = ApiUrls;
