import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatMonth } from './formatters';
import { getPdfLink } from './customerMapper';

class Receipt extends Component {

  state = {
    loaded: false,
    receipt: { charges: [] }
  };

  componentDidMount() {
    let params = this.props.match.params;
    let year = parseInt(params.year, 10);
    let month = parseInt(params.month, 10);

    let shareablePdfLink = getPdfLink(null, year, month);

    this.setState({
      year,
      month,
      pdfLink: shareablePdfLink
    });

    fetch(`/receipts/${year}/${month}`)
      .then(res => res.json())
      .then(receipt => this.setState({
        loaded: true,
        receipt
      }));
  }

  render() {
    let loading =
      <div className="loader">
        Loading data...
      </div>

    let receipt =
      <div>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Description</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.receipt.charges.map((charge, index) =>
            <tr key={index}>
              <td>
                {charge.description || '-'}
              </td>
              <td className="text-right">
                  {formatCurrency(charge.totalAmount)}
              </td>
            </tr>)}
          </tbody>
        </table>

        <hr />

        <div className="text-right">
          <strong>
            Total: {formatCurrency(this.state.receipt.totalAmount)}
          </strong>
        </div>
      </div>

    return (
      <div>
        <h1>Receipt for {formatMonth(this.state.year, this.state.month)}</h1>

        <div className="btn-toolbar">
          <Link to={'/'} className="btn btn-default">Home</Link>
          <a href={this.state.pdfLink} className="btn btn-primary" target="_blank">Download PDF</a>
        </div>

        <hr />

        {!this.state.loaded ? loading : receipt}
      </div>
    );
  }
}

export default Receipt;
