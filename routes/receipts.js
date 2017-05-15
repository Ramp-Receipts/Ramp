const express = require('express');
const request = require('request');
const router = express.Router();

const accessKey = '91c7eac3-75e3-47df-88eb-1f5fcb52259e';
const customerId = 'cus_AcpWc6Z8rPJl8O';
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

module.exports = router;
