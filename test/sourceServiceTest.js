const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');

describe('Source service tests', function() {
  let client;

  before(async function() {
    client = new APIClient({ secretKey: testHelper.secretKey });
  });

  it('Fails in creation of source due to business_not_onboarded', async function() {
    const payload = testHelper.getSourceCreateModel();

    try {
      await client.sourceService.createSource(payload);
    } catch (error) {
      assert.equal(422, error.response.status);
      assert.notEqual(-1, error.response.data.error_codes[0].indexOf('business_not_onboarded'));
    }
  });

});
