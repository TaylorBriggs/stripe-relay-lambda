require('dotenv').load();

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var OPTIONS = {
  currency: 'usd',
  type: 'sku'
};

exports.handler = function(event, context, callback) {

  function handleCustomer(err, customer) {
    if (err) {
      callback(err);
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
          callback(err);
        } else {
          callback(null, { order: order });
        }
      })
    }
  }

  stripe.customers.create({
    email: event.email,
    source: event.source
  }, handleCustomer);
}
