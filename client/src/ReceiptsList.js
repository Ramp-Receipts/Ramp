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
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Month</th>
            <th className="text-right">Total Charges</th>
            <th className="text-right">Total Amount</th>
            <th>&nbsp;</th>
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
              <td className="text-right">
                {receipt.totalCount}
              </td>
              <td className="text-right">
                {formatCurrency(receipt.totalAmount)}
              </td>
              <td className="text-right">
                <a className="btn btn-default" title="Open PDF in browser" target="_blank"
                  href={receipt.pdfUrl}>PDF</a>
              </td>
            </tr>)}
        </tbody>
      </table>

    return (
      <div>
        <h1>Receipts</h1>
        <hr />
        {!this.state.loaded ? loading : receiptsList}
      </div>
    );
  }
}

export default ReceiptsList;
