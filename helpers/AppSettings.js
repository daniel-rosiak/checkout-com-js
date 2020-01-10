const Environment = require('./Environment');
const Config = require('../config');

class AppSettings {
  constructor() {
    this.clientVersion = Config.clientVersion;
    this.liveUrl = Config.liveUrl;
    this.sandboxUrl = Config.sandboxUrl;
    this.baseApiUrl = '';
    this.secretKey;
    this.publicKey;
    this.debugMode = false;
    this.connectTimeout = Config.connectTimeout;
    this.readTimeout = Config.readTimeout;
    this.clientUserAgentName = `Checkout-JavaLibraryClient/${this.clientVersion}`;
  }

  setEnvironment(env) {
    switch (env) {
      case Environment.LIVE:
        this.baseApiUrl = this.liveUrl;
        break;
      case Environment.SANDBOX:
        this.baseApiUrl = this.sandboxUrl;
        break;
    }
  }
}

module.exports = new AppSettings();
