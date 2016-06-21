require('dotenv').load();

var handler = require('../index').handler;
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var testCard = {
  number: '4242424242424242',
  exp_month: 12,
  exp_year: 2017,
  cvc: '123'
}

var context = {};

function handleResponse(err, data) {
  if (err) {
    console.error('Failed: ', err);
  } else {
    console.log('Succeeded: ', data);
  }
}

stripe.tokens.create({ card: testCard }, function(err, token) {
  var event = {
    source: token.id,
    email: 'test@example.com',
    parent: 'sku_8fUcdgaSoRk5jJ',
    shipping: {
      name: 'John Doe',
      address: {
        line1: '123 Fake St.',
        city: 'New York',
        state: 'NY',
        postal_code: '10001'
      }
    }
  };

  return handler(event, context, handleResponse);
});
