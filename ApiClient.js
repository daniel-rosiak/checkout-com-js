const AppSettings = require('./helpers/AppSettings');

const EventService = require('./api/EventService');
const PaymentService = require('./api/PaymentService');
const SourceService = require('./api/SourceService');
const TokenService = require('./api/TokenService');
const WebhookService = require('./api/WebhookService');

const Environment = require('./helpers/Environment');


class ApiClient {
  constructor({ secretKey, env, debugMode, publicKey } = {}) {
    AppSettings.secretKey = secretKey;
    AppSettings.setEnvironment(env || Environment.SANDBOX);
    AppSettings.debugMode = debugMode;
    AppSettings.publicKey = publicKey;

    this.setupServices();
  }

  setupServices() {
    this.eventService = new EventService();
    this.paymentService = new PaymentService();
    this.sourceService = new SourceService();
    this.tokenService = new TokenService();
    this.webhookService = new WebhookService();
  }
}

module.exports = ApiClient;
