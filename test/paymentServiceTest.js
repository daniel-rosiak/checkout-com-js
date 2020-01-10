const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');
const serviceHelper = require('./serviceHelper');
const createPayment = serviceHelper.createPayment;

describe('Payment service tests', function() {
  let client;
  let paymentId;
  
  before(async function() {
    client = new APIClient({ secretKey: testHelper.secretKey, publicKey: testHelper.publicKey });
  });

  it('Creates payment with token source', async function() {
    const paymentResponse = await createPayment(client);

    assert.equal(201, paymentResponse.status);
    assert.isNotNull(paymentResponse.data.id);
    paymentId = paymentResponse.data.id;
  });

  
  it('Gets payment details', async function() {
    if(!paymentId) {
      this.skip();
    }
    const paymentResponse = await client.paymentService.getPayment(paymentId);

    assert.equal(200, paymentResponse.status);
    assert.isNotNull(paymentResponse.data.id);
  });

  it('Gets payment actions', async function() {
    if(!paymentId) {
      this.skip();
    }
    const paymentResponse = await client.paymentService.getPaymentActions(paymentId);

    assert.equal(200, paymentResponse.status);
    assert.isNotNull(paymentResponse.data.data);
  });

  it('Capture a payment', async function() {
    const paymentResponse = await createPayment(client, false);
    setTimeout(() => {}, 4000);

    try {
      const paymentCaptureResponse = await client.paymentService.capturePayment(paymentResponse.data.id);

      assert.equal(202, paymentCaptureResponse.status);
      assert.isNotNull(paymentCaptureResponse.data.id);
    } catch (error) {
      assert.equal(403, error.response.status);
    }
  });

  it('Refund a payment', async function() {
    const paymentResponse = await createPayment(client);
    setTimeout(() => {}, 4000);

    try {
      const paymentRefundResponse = await client.paymentService.refundPayment(paymentResponse.data.id);

      assert.equal(202, paymentRefundResponse.status);
      assert.isNotNull(paymentRefundResponse.data.action_id);
    } catch (error) {
      assert.equal(403, error.response.status);
    }
  });

  it('Refund a partial payment', async function() {
    const paymentResponse = await createPayment(client);
    setTimeout(() => {}, 4000);

    try {
      const paymentRefundResponse = await client.paymentService.refundPayment(paymentResponse.data.id, {amount: 1});

      assert.equal(202, paymentRefundResponse.status);
      assert.isNotNull(paymentRefundResponse.data.action_id);
    } catch (error) {
      assert.equal(403, error.response.status);
    }
  });

  it('Void a payment', async function() {
    const paymentResponse = await createPayment(client, false);
    setTimeout(() => {}, 4000);

    try {
      const paymentVoidResponse = await client.paymentService.voidPayment(paymentResponse.data.id);

      assert.equal(202, paymentVoidResponse.status);
      assert.isNotNull(paymentVoidResponse.data.action_id);
    } catch (error) {
      assert.equal(403, error.response.status);
    }
    
  });
});
