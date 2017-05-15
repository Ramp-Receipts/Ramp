import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

class ReceiptsList extends Component {
  state = {
    loaded: false,
    receipts: []
  };

  componentDidMount() {
    console.log('Receipts list mount');
    fetch('/receipts')
      .then(res => res.json())
      .then(receipts => this.setState({
        loaded: true,
        receipts
      }));
  }

  formatCurrency(value) {
    return numeral(value).format('$0,0.00');
  }

  formatMonth(year, month) {
    return moment(new Date(year, month - 1)).format('MMMM YYYY');
  }

  render() {
    let loading =
      <div className="loader">
        Loading data...
      </div>

    let receiptsList =
      <table className="table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Charges</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {this.state.receipts.map(receipt =>
          <tr key={receipt.year + '/' + receipt.month}>
            <td>
              <Link to={`/receipt/${receipt.year}/${receipt.month}`}>
                {this.formatMonth(receipt.year, receipt.month)}
              </Link>
            </td>
            <td>
                {receipt.totalCount}
            </td>
            <td>
                {this.formatCurrency(receipt.totalAmount)}
            </td>
          </tr>)}
        </tbody>
      </table>

    return (
      <div>
        <h1>Receipts</h1>
        {!this.state.loaded ? loading : receiptsList}
      </div>
    );
  }
}

export default ReceiptsList;
