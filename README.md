# stripe-relay-lambda

A Lambda function for creating customers and orders to complete a [Stripe Relay](relay) flow.

## Authentication

Set your Stripe secret key in the `.env` file. Copy the sample to get started:

```
$ cp .env.sample .env
$ sed -i '' "s/<YOUR_SECRET_KEY>/$SECRET_KEY/g" .env
```

## Usage and Deployment

Use the script to create your zip archive:

```
$ npm run zip
```

Integrate with the [AWS API Gateway](gateway) to access the function via HTTP POST:

```
$ curl -X POST -H "Content-Type: application/json" \
-d '{ \
  "source": $SOURCE, \
  "email": "test@example.com", \
  "parent": $SKU_ID, \
  "shipping": { \
    "name": "John Doe", \
    "address": { \
      "line1": "123 Fake St.", \
      "city": "New York", \
      "state": "NY", \
      "postal_code": "10001" \
    } \
  } \
}' \
$API_GATEWAY_URL
```

Obtain the `source` using [Checkout](checkout) and the `parent` from the Stripe API, or [stripe-products-lambda](products-lambda).

It returns an error, if one is present, or the [order object](order) under the root key of `order`:

```
{
  "order": {
    ...order details
  }
}
```

[checkout]: https://stripe.com/docs/checkout
[gateway]: http://docs.aws.amazon.com/lambda/latest/dg/gs-amazon-gateway-integration.html
[order]: https://stripe.com/docs/api/node#order_object
[products-lambda]: https://github.com/TaylorBriggs/stripe-products-lambda
[relay]: https://stripe.com/docs/relay
