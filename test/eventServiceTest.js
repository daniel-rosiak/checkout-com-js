const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');
const serviceHelper = require('./serviceHelper');
const createPayment = serviceHelper.createPayment;
const createWebhook = serviceHelper.createWebhook;

describe('Event service tests', function() {
  let client;
  let eventId;
  let webhookId;
  let notificationId;

  before(async function() {
    client = new APIClient({ secretKey: testHelper.secretKey, publicKey: testHelper.publicKey });
    await createPayment(client);
    const webhookResponse = await createWebhook(client);
    webhookId = webhookResponse.data.id;
  });

  after(async function() {
    await client.webhookService.deleteWebhook(webhookId);
  })

  it('Gets all event types', async function() {
    const eventTypesResponse = await client.eventService.getEventTypes();

    assert.equal(200, eventTypesResponse.status);
    assert.isNotNull(eventTypesResponse.data);
  });

  it('Gets all events', async function() {
    const eventResponse = await client.eventService.getEvents();

    if(!eventResponse.data.data) {
      assert.equal(204, eventResponse.status);
    } else {
      assert.equal(200, eventResponse.status);
      assert.isNotEmpty(eventResponse.data);
      eventId = eventResponse.data.data[0].id;
    }
  });

  it('Retries a webhook', async function() {
    if(!eventId || !webhookId) {
      this.skip();
    }
    const eventResponse = await client.eventService.retryWebhook(eventId, webhookId);

    assert.equal(202, eventResponse.status);
    assert.isNotNull(eventResponse.data.id);
  });

  it('Retries all webhooks', async function() {
    if(!eventId) {
      this.skip();
    }
    const eventResponse = await client.eventService.retryAllWebhooks(eventId);

    assert.equal(true, eventResponse.status < 300);
    assert.isNotNull(eventResponse.data.id);
  });

  it('Gets event by its id', async function() {
    if(!eventId) {
      this.skip();
    }
    const eventResponse = await client.eventService.getEvent(eventId);

    assert.equal(200, eventResponse.status);
    assert.isNotNull(eventResponse.data.id);
    notificationId = eventResponse.data.notifications.length ? eventResponse.data.notifications[0].id : false;
  });
  
  it('Gets events notifications', async function() {
    if(!eventId || !notificationId) {
      this.skip();
    }
    const eventResponse = await client.eventService.getEventNotifications(eventId, notificationId);

    assert.equal(200, eventResponse.status);
    assert.isNotNull(eventResponse.data.id);
  });
});
