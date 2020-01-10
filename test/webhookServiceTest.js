const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');
const serviceHelper = require('./serviceHelper');
const createWebhook = serviceHelper.createWebhook;

describe('Webhook service tests', function() {
  let client;
  let webhookId;

  before(async function() {
    client = new APIClient({ secretKey: testHelper.secretKey });
  });

  it('Gets all webhooks', async function() {
    const webhookResponse = await client.webhookService.getWebhooks();

    if(!webhookResponse.data.length) {
      assert.equal(204, webhookResponse.status);
    } else {
      assert.equal(200, webhookResponse.status);
      assert.isNotNull(webhookResponse.data); 
    }
  });

  it('Creates a webhook', async function() {
    const webhookResponse = await createWebhook(client);

    assert.equal(201, webhookResponse.status);
    assert.isNotNull(webhookResponse.data.id);
    webhookId = webhookResponse.data.id;
  });

  it('Gets webhook by id', async function() {
    if(!webhookId) {
      this.skip();
    }
    const webhookResponse = await client.webhookService.getWebhook(webhookId);

    assert.equal(200, webhookResponse.status);
    assert.isNotNull(webhookResponse.data.id);
  });

  it('Updates webhook', async function() {
    if(!webhookId) {
      this.skip();
    }
    const payload = testHelper.getWebhookRandomEventsModel();
    const webhookResponse = await client.webhookService.updateWebhook(webhookId, payload);

    assert.equal(200, webhookResponse.status);
    assert.isNotNull(webhookResponse.data.id);
  });

  it('Remove a webhook', async function() {
    if(!webhookId) {
      this.skip();
    }
    const webhookResponse = await client.webhookService.deleteWebhook(webhookId);

    assert.equal(200, webhookResponse.status);
    assert.isNotNull(webhookResponse.data.id);
  });

});
