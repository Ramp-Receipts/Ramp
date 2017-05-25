import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate, formatMonth } from './formatters';
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
              <th>Date</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.receipt.charges.map((charge, index) =>
            <tr key={index}>
              <td>
                {charge.description || '-'}
              </td>
              <td>
                {formatDate(charge.created)}
              </td>
              <td className="text-right">
                  {formatCurrency(charge.amount)}
              </td>
            </tr>)}
          </tbody>
        </table>

        <hr />

        <div className="row">
          <div className="col-sm-6 col-sm-push-6">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>Subtotal:</th>
                  <th className="text-right">{formatCurrency(this.state.receipt.subTotal)}</th>
                </tr>
                <tr>
                  <th>Discount:</th>
                  <th className="text-right">{formatCurrency(this.state.receipt.discount)}</th>
                </tr>
                <tr>
                  <th>Tax:</th>
                  <th className="text-right">{formatCurrency(this.state.receipt.tax)}</th>
                </tr>
              </tbody>
            </table>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>Total:</th>
                  <th className="text-right">{formatCurrency(this.state.receipt.total)}</th>
                </tr>
                <tr>
                  <th>Applied Balance:</th>
                  <th className="text-right">{formatCurrency(this.state.receipt.balance)}</th>
                </tr>
              </tbody>
            </table>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>Paid:</th>
                  <th className="text-right">{formatCurrency(this.state.receipt.paidTotal)}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <h1>Receipt for {formatMonth(this.state.year, this.state.month)}</h1>
          </div>
          <div className="col-sm-6 app-toolbar">
            <Link to={'/'}>&laquo; back to list</Link>
            <a href={this.state.pdfLink} className="btn btn-primary" target="_blank">Download PDF</a>
          </div>
        </div>

        <hr />

        {!this.state.loaded ? loading : receipt}
      </div>
    );
  }
}

export default Receipt;
