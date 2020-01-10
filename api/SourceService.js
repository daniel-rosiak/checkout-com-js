const BaseService = require('./BaseService');
const ApiUrls = require('../helpers/ApiUrls');

class SourceService extends BaseService {
  
  /**
   * Add a reusable payment source that can be used later to make one or more payments. 
   * Payment sources are linked to a specific customer and cannot be shared between customers.
   * 
   * @param {Object} payload
   * @returns {Object}
   */
  createSource(payload) {
    return this.api.post(ApiUrls.sources(), payload);
  }
}

module.exports = SourceService;
