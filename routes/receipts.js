const express = require('express');
const request = require('request');
const router = express.Router();

const accessKey = process.env.ACCESS_KEY;
const customerId = process.env.CUSTOMER_ID;
const rootUrl = 'https://rampreceipts.com/api/v1/receipt/';

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
        customer: {
          name: "John Doe",
          address: {
            line1: "Elm Street 12",
            line2: "App 13",
            country: "USA",
            state: "New York",
            city: "New Yorkk",
            zip: "11000"
          }
        }
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
        customer: {
          name: "John Doe",
          address: {
            line1: "Elm Street 12",
            line2: "App 13",
            country: "USA",
            state: "New York",
            city: "New Yorkk",
            zip: "11000"
          }
        }
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
