const assert = require('chai').assert;
const APIClient = require('../ApiClient');
const testHelper = require('./testHelper');

describe('Token service tests', function() {
  let client;

  before(async function() {
    client = new APIClient({ secretKey: testHelper.secretKey, publicKey: testHelper.publicKey });
  });

  it('Creates card token', async function() {
    const payload = testHelper.getCardCreateModel();
    const tokenResponse = await client.tokenService.createToken(payload);

    assert.equal(201, tokenResponse.status);
    assert.equal('card', tokenResponse.data.type);
    assert.isNotNull(tokenResponse.data.id);
  });

  it('Fails in creation of the card token due to wrong data', async function() {
    let payload = testHelper.getCardCreateModel();
    delete payload.number;

    try {
      await client.tokenService.createToken(payload);
    } catch(error) {
      assert.equal(422, error.response.status);
      assert.notEqual(-1, error.response.data.error_codes[0].indexOf('number'));
    }
  });
});
