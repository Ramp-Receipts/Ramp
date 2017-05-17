const express = require('express');
const request = require('request');
const router = express.Router();

const accessKey = process.env.ACCESS_KEY;
const customerId = process.env.CUSTOMER_ID;
const rootUrl = 'https://rampreceipts.com/api/v1/receipt/';

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
      res.status(500).json({error: errorMessage});
    } else {
      res.json(body);
    }
  });
});

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
      res.status(500).json({error: errorMessage});
    } else {
      res.json(body);
    }
  });
});

module.exports = router;
