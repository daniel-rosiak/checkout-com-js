const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');

describe('Authorization test', function() {
  let client;

  before(async function() {
    client = new APIClient({ secretKey: 'asdasda', publicKey: 'weqweqwe' });
  });
  
  it('Fails in authorization', async function() {
    let payload = testHelper.getCardCreateModel();
    delete payload.number;

    try {
      await client.tokenService.createToken(payload);
    } catch(error) {
      assert.equal(401, error.response.status);
    }
  });
});
