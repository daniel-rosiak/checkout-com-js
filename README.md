# Checkout.com API JavaScript Library

Simple library with low level of abstraction

### https://api-reference.checkout.com
### https://docs.checkout.com/docs


## Tests
```
npm install
npm run test
```

## Usage
[...]
```javascript
import ApiClient from "checkout-com-js";

const api = new ApiClient({
  secretKey: 'sk_',
  publicKey: 'pk_',
  env: 'LIVE', // 'SANDBOX'  // optional
  debugMode: true, // optional
})

```

### Methods

Token
```
api.tokenService.createToken(payload);
```

Payment
```
api.paymentService.createPayment(payload);
api.paymentService.getPayment(paymentId);
api.paymentService.getPaymentActions(paymentId);
api.paymentService.capturePayment(paymentId, payload = {});
api.paymentService.refundPayment(paymentId, payload = {});
api.paymentService.voidPayment(paymentId, payload = {});

```

Webhook
```
api.webhookService.getWebhooks();
api.webhookService.createWebhook(payload);
api.webhookService.getWebhook(webhookId);
api.webhookService.updateWebhook(webhookId, payload);
api.webhookService.deleteWebhook(webhookId);
```

Event
```
api.eventService.getEventTypes();
api.eventService.getEvents();
api.eventService.getEvent(id);
api.eventService.getEvent(eventId);
api.eventService.getEventNotifications(eventId, norificationId);
api.eventService.retryWebhook(eventId, webhookId);
api.eventService.retryAllWebhooks(eventId);
```

Event
```
api.eventService.createSource(payload);
```
