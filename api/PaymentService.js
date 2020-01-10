const BaseService = require('./BaseService');
const ApiUrls = require('../helpers/ApiUrls');

class PaymentService extends BaseService {

  /**
   * Creates a payment request.
   *
   * @param {Object} payload 
   * @returns {Object}
   */
  createPayment(payload) {
    return this.api.post(ApiUrls.payments(), payload);
  }

  /**
   * Return the details of the payment with the specified identifier string.
   *
   * @param {String} paymentId
   * @returns {Object}
   */
  getPayment(paymentId) {
    return this.api.get(ApiUrls.payment(paymentId));
  }

  /**
   * Return all the actions associated with a payment ordered 
   * by processing date in descending order (latest first).
   *
   * @param {String} paymentId
   * @returns {Object}
   */
  getPaymentActions(paymentId) {
    return this.api.get(ApiUrls.paymentActions(paymentId));
  }

  /**
   * Captures a payment if supported by the payment method.
   * For card payments, capture requests are processed asynchronously.
   * You can use webhooks to be notified if the capture is successful.
   *
   * @param {String} paymentId
   * @param {Object} payload
   * @returns {Object}
   */
  capturePayment(paymentId, payload = {}) {
    return this.api.post(ApiUrls.paymentCapture(paymentId), payload);
  }

  /**
   * Refunds a payment if supported by the payment method.
   * For card payments, refund requests are processed asynchronously. 
   * You can use webhooks to be notified if the refund is successful.
   *
   * @param {String} paymentId
   * @param {Object} payload
   * @returns {Object}
   */
  refundPayment(paymentId, payload = {}) {
    return this.api.post(ApiUrls.paymentRefund(paymentId), payload);
  }

  /**
   * Voids a payment if supported by the payment method.
   * For card payments, void requests are processed asynchronously. 
   * You can use webhooks to be notified if the void is successful.
   *
   * @param {String} paymentId
   * @param {Object} payload
   * @returns {Object}
   */
  voidPayment(paymentId, payload = {}) {
    return this.api.post(ApiUrls.paymentVoid(paymentId), payload);
  }

}

module.exports = PaymentService;
