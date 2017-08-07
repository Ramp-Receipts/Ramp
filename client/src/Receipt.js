import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate, formatMonth } from './formatters';

class Receipt extends Component {

  state = {
    loaded: false,
    receipt: { charges: [] }
  };

  customer = {
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

  company = {
    name: 'Ramp Receipts Sample Company',
    address: {
      line1: 'Oak Street 15',
      line2: 'Apartment 1',
      country: 'USA',
      state: 'CA',
      city: 'San Carlos',
      zip: '24221'
    },
    'email': 'support@rampreceiptssample.com',
    'phone': '555-123-456',
    'vat': '1234567890'
  };

  componentDidMount() {
    let params = this.props.match.params;
    let year = parseInt(params.year, 10);
    let month = parseInt(params.month, 10);

    this.setState({
      year,
      month,
      pdfLink: ''
    });

    fetch(`/receipts/${year}/${month}`)
      .then(res => res.json())
      .then(receipt => this.setState({
        loaded: true,
        receipt,
        pdfLink: receipt.pdfUrl
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

        <div className="row">
          <div className="col-sm-offset-3 col-sm-2">
            <strong>Customer:</strong>
          </div>
          <div className="col-sm-4">
            {this.customer.name}<br/>
            {this.customer.address.line1}, {this.customer.address.line2}<br/>
            {this.customer.address.city} / {this.customer.address.zip}<br/>
            {this.customer.address.country} ({this.customer.address.state})
          </div>
        </div>

        <hr />

        {!this.state.loaded ? loading : receipt}

        <hr />

        <div className="row">
          <div className="col-sm-6">
            <strong>Company:</strong>
          </div>
          <div className="col-sm-6">
            {this.company.name}<br/>
            {this.company.address.line1}<br/>
            {this.company.address.line2}<br/>
            {this.company.address.city} {this.company.address.state}, {this.company.address.zip}<br/>
            VAT: {this.company.vat}<br/>
            Email: {this.company.email}<br/>
            Phone: {this.company.phone}
          </div>
        </div>
      </div>
    );
  }
}

export default Receipt;
