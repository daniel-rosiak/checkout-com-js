const BaseService = require('./BaseService');
const ApiUrls = require('../helpers/ApiUrls');
const AppSettings = require('../helpers/AppSettings');

class TokenService extends BaseService {

  /**
   * Exchange card details or a digital wallet payment token
   * for a reference token that can be used later to request a card payment.
   *
   * @param {Object} payload
   * @returns {Object}
   */
  createToken(payload) {
    return this.api.post(ApiUrls.tokens(), payload, AppSettings.publicKey);
  }
}

module.exports = TokenService;
