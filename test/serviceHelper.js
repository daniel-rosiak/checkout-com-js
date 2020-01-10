const testHelper = require('./testHelper');

/**
 * Creates a payment
 * 
 * @param {Object} client 
 * @param {Boolean} capture 
 */
const createPayment = async (client, capture = true) => {
  const tokenData = testHelper.getCardCreateModel();
  const tokenResponse = await client.tokenService.createToken(tokenData);

  const paymentData = testHelper.getPaymentWithTokenCreateModel({ token: tokenResponse.data.token, capture: capture });
  return await client.paymentService.createPayment(paymentData);
}

/**
 * Creates a weebhook
 * @param {Object} client 
 */
const createWebhook = async (client) => {
  const payload = testHelper.getWebhookCreateModel();
  return await client.webhookService.createWebhook(payload);
}

module.exports = {
  createPayment,
  createWebhook
}