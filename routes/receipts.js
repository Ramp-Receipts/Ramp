const express = require('express');
const request = require('request');
const router = express.Router();

const rootUrl = 'https://rampreceipts.com/api/v1/receipt/';
const accessKey = process.env.ACCESS_KEY;

// Customer ID would be loaded from the database (current logged in customer/user)
const customerId = process.env.CUSTOMER_ID;

// Customer data would be loaded from the database
const customerData = {
  name: 'John Doe',
  address: {
    line1: 'Elm Street 12',
    line2: 'App 13',
    country: 'USA',
    state: 'New York',
    city: 'New York',
    zip: '11000'
  }
};

// Company data would be hardcoded or loaded from database
const companyData = {
  name: 'Ramp Receipts Sample Company',
  address: {
    line1: 'Oak Street 15',
    line2: 'Apartment 1',
    country: 'USA',
    state: 'CA',
    city: 'San Carlos',
    zip: '24221'
  },
  'email': 'override_support@email.com',
  'phone': '555-123-456',
  'vat': '1234567890'
};

const overrideOptions = {
  logoUrl: 'https://rampreceipts.com/images/rr-logo.png'
};

// Gets the list of monthly receipts
router.get('/', (req, res, next) => {
  request.get({
    url: `${rootUrl}${customerId}`,
    headers: {
      'Authorization': `Token ${accessKey}`
    },
    json: true
  }, (error, response, body) => {
    if (error) {
      let errorMessage = `Error calling Ramp Receipts API: ${error}`;
      console.log(errorMessage);
      res.status(500).json({ error: errorMessage });
    } else {
      res.json(body);
    }
  });
});

// Get the receipt for the given month
router.get('/:year/:month', (req, res, next) => {
  let year = req.params.year;
  let month = req.params.month;

  request.get({
    url: `${rootUrl}${customerId}/${year}/${month}`,
    headers: {
      'Authorization': `Token ${accessKey}`
    },
    json: true
  }, (error, response, body) => {
    if (error) {
      let errorMessage = `Error calling Ramp Receipts API: ${error}`;
      console.log(errorMessage);
      res.status(500).json({ error: errorMessage });
    } else {
      res.json(body);
    }
  });
});

// Download PDF
router.post('/:year/:month', (req, res, next) => {
  let year = req.params.year;
  let month = req.params.month;

  request
    .post({
      url: `${rootUrl}${customerId}/${year}/${month}`,
      headers: {
        'Authorization': `Token ${accessKey}`,
        'Content-Type': 'application/json'
      },
      json: {
        customer: customerData,
        company: companyData,
        options: overrideOptions
      }
    })
    .on('error', error => {
      console.log('Error downloading PDF: ', error);
    })
    .on('response', response => {
      if (response.statusCode !== 200) {
        console.log('Error downloading PDF: ', response.statusCode, response.statusMessage);
      }
    })
    .pipe(res);;
});

// External shareable link for PDF
router.get('/pdf/:customer/:year/:month', (req, res, next) => {
  let customer = req.params.customer;
  let year = req.params.year;
  let month = req.params.month;

  // TODO: Here we would use the customer hash / UUID from the URL
  // to load the actual Stripe customer ID from the database

  request
    .post({
      url: `${rootUrl}${customerId}/${year}/${month}`,
      headers: {
        'Authorization': `Token ${accessKey}`,
        'Content-Type': 'application/json'
      },
      json: {
        customer: customerData,
        company: companyData,
        options: overrideOptions
      }
    })
    .on('error', error => {
      console.log('Error downloading PDF: ', error);
    })
    .on('response', response => {
      if (response.statusCode !== 200) {
        console.log('Error downloading PDF: ', response.statusCode, response.statusMessage);
      }
    })
    .pipe(res);
  // The API response will just be piped into this router response
  // All headers will also be piped, including Content-Disposition
});

module.exports = router;
