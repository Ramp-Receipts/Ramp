import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatMonth } from './formatters';

class ReceiptsList extends Component {

  state = {
    loaded: false,
    receipts: []
  };

  componentDidMount() {
    fetch('/receipts')
      .then(res => res.json())
      .then(receipts => this.setState({
        loaded: true,
        receipts
      }));
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
                {formatMonth(receipt.year, receipt.month)}
              </Link>
            </td>
            <td>
                {receipt.totalCount}
            </td>
            <td>
                {formatCurrency(receipt.totalAmount)}
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
