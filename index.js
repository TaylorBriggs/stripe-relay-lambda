require('dotenv').load();

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var OPTIONS = {
  currency: 'usd',
  type: 'sku'
};

exports.handler = function(event, context) {
  var handleError = context.fail;

  function handleCustomer(err, customer) {
    if (err) {
      handleError(err);
    } else {
      stripe.orders.create({
        currency: OPTIONS.currency,
        customer: customer.id,
        shipping: event.shipping,
        items: [{
          type: OPTIONS.type,
          parent: event.parent
        }]
      }, function(err, order) {
        if (err) {
          handleError(err);
        } else {
          context.succeed({ order: order });
        }
      })
    }
  }

  stripe.customers.create({
    email: event.email,
    source: event.source
  }, handleCustomer);
}
