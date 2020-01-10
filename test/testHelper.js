module.exports = {
  secretKey: 'sk_test_80afbf1a-7369-42be-99d6-4c2e3f936ca1',
  publicKey: 'pk_test_53057200-b5c6-44e9-bc5c-494494f37ef3',

  getRandomNumber(max, min = 1) {
    return Math.floor(Math.random() * max + min);
  },

  getRandomString({ possible = 'abcdefghijklmnopqrstuvwxyz', length = 26 } = {}) {
    let text = '';

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },

  getRandomEmail() {
    return this.getRandomString({ length: 10 }) + '@test.com';
  },

  getRandomMetadata() {
    return {
      key1: this.getRandomString({ length: 20 }),
      key2: this.getRandomString({ length: 20 }),
    };
  },

  getRandomReference() {
    return 'X-' + this.getRandomNumber(100000) + '-' + this.getRandomNumber(1000);
  },

  getRandomAddress() {
    const address = {};
    address.address_line1 = this.getRandomString();
    address.address_line2 = this.getRandomString();
    address.postcode = this.getRandomString({ length: 20 });
    address.country = 'US';
    address.city = this.getRandomString({ length: 15 });
    address.state = this.getRandomString();
    address.zip = this.getRandomNumber(1000);
    
    return address;
  },

  getRandomProducts() {
    const product1 = {};
    product1.description = this.getRandomString({ length: 20 });
    product1.name = this.getRandomString({ length: 20 });
    product1.quantity = 1;
    product1.shipping_cost = 10.5;
    product1.price = 10;
    product1.sku = this.getRandomString({ length: 25 });
    product1.tracking_url = 'http://www.tracker.com';

    const product2 = {};
    product2.description = this.getRandomString({ length: 20 });
    product2.name = this.getRandomString({ length: 20 });
    product1.price = 10;
    product2.quantity = 1;
    product2.shipping_cost = 20.2;
    product2.sku = this.getRandomString({ length: 25 });
    product2.tracking_url = 'http://www.tracker.com';

    return [product1, product2];
  },

  getRandomPhone() {
    return {
      countryCode: '44',
      number: this.getRandomString({ possible: '1234567890', length: 10 }),
    };
  },

  getPaymentWithCardCreateModel({capture = true} = {}) {
    const cardPayment = {};
    cardPayment.source = this.getCardCreateModel();
    cardPayment.amount = this.getRandomNumber(1000, 100);
    cardPayment.currency = 'USD';
    cardPayment.payment_type = 'Regular';
    cardPayment.reference = this.getRandomReference();
    cardPayment.capture = capture;

    return cardPayment;
  },

  getPaymentWithTokenCreateModel({token, capture = true} = {}) {
    const cardPayment = {};
    cardPayment.source = this.getTokenSourceModel(token);
    cardPayment.amount = this.getRandomNumber(1000, 100);
    cardPayment.currency = 'USD';
    cardPayment.payment_type = 'Regular';
    cardPayment.reference = this.getRandomReference();
    cardPayment.capture = capture;

    return cardPayment;
  },

  getTokenSourceModel(token) {
    if(!token) {
      token = 'tok_' + this.getRandomString();
    }

    const tokenSource = {};
    tokenSource.type = 'token';
    tokenSource.token = token;

    return tokenSource;
  },

  getTokenCreateModel() {
    const tokenCreate = {};
    tokenCreate.value = this.getRandomNumber(1000);
    tokenCreate.currency = 'USD';
    tokenCreate.auto_capture = 'N';
    tokenCreate.customer_ip = '88.216.3.135';
    tokenCreate.description = 'test';
    tokenCreate.metadata = this.getRandomMetadata();
    tokenCreate.products = this.getRandomProducts();
    tokenCreate.shipping_details = this.getRandomAddress();

    return tokenCreate;
  },

  getCardCreateModel() {
    const cardCreate = {};
    cardCreate.type = 'card'; 
    cardCreate.name = this.getRandomString();
    cardCreate.number = '4242424242424242';
    cardCreate.expiry_month = '06';
    cardCreate.expiry_year = '2024';
    cardCreate.cvv = '100';
    cardCreate.billing_address = this.getRandomAddress();

    return cardCreate;
  },

  getSourceCreateModel() {
    const sourceCreate = {};
    sourceCreate.type = 'sepa';
    sourceCreate.reference = this.getRandomReference();
    sourceCreate.billing_address = this.getRandomAddress();
    sourceCreate.phone = this.getRandomPhone();
    sourceCreate.customer = this.getBaseCustomerModel();
    sourceCreate.source_data = this.getBaseSourceModel();

    return sourceCreate;
  },

  getBaseSourceModel() {
    const source = {};
    source.first_name = this.getRandomString();
    source.last_name = this.getRandomString();
    source.account_iban = 'DE25100100101234567893';
    source.bic = "PBNKDEFFXXX";
    source.billing_descriptor = "ExampleCompany.com";
    source.mandate_type = "recurring";

    return source;
  },
  getCustomerCreateModel() {
    const customerCreate = this.getBaseCustomerModel();
    customerCreate.card = this.getCardCreateModel();

    return customerCreate;
  },
  getCustomerUpdateModel() {
    this.getBaseCustomerModel();
  },

  getBaseCustomerModel() {
    const customerPayload = {};
    customerPayload.name = this.getRandomString();
    customerPayload.description = this.getRandomString();
    customerPayload.email = this.getRandomEmail();
    customerPayload.phone = this.getRandomPhone();
    customerPayload.metadata = this.getRandomMetadata();

    return customerPayload;
  },

  getWebhookCreateModel() {
    const webhookCreate = {};
    webhookCreate.url = 'https://test.com/' + this.getRandomString(); 
    webhookCreate.event_types = this.getEventTypes();

    return webhookCreate;
  },

  getWebhookRandomEventsModel() {
    const webhookCreate = {};
    const events = this.getEventTypes();
    webhookCreate.url = 'https://test.com/' + this.getRandomString(); 
    webhookCreate.event_types = [events[Math.floor(Math.random()*events.length)]];

    return webhookCreate;
  },

  getEventTypes() {
    return [
      "payment_approved",
      "payment_declined",
    ];
  }
};
