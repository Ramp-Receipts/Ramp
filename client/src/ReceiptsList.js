import React, { Component } from 'react';
import moment from 'moment';
import numeral from 'numeral';

class Receipts extends Component {
  state = {
    loaded: false,
    receipts: [],
    customerEdit: {}
  };

  componentDidMount() {
    this.loadCustomer();
    this.loadReceipts();
  }

  formatCurrency = value => numeral(value).format('$0,0.00');
  formatMonth = (year, month) => moment(new Date(year, month - 1)).format('MMMM YYYY');

  handleCustomerChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const customerEdit = this.state.customerEdit;
    customerEdit[name] = value;

    this.setState({ customerEdit });
  }

  handleSaveChangesClick = event => {
    const customerEdit = this.state.customerEdit;

    const customer = {
      name: customerEdit.name,
      address: {
        line1: customerEdit.addressLine1,
        line2: customerEdit.addressLine2,
        city: customerEdit.addressCity,
        state: customerEdit.addressState,
        zip: customerEdit.addressZip,
        country: customerEdit.addressCountry
      },
      vat: customerEdit.vat,
      extraInfo: customerEdit.extraInfo
    };

    this.saveCustomer(customer)
      .then(() => {
        this.setState({ customer });
        this.loadReceipts();
      });
  }

  loadCustomer() {
    fetch('/receipts/customer')
      .then(res => res.json())
      .then(customer => {
        let customerEdit = {
          name: customer.name,
          addressLine1: customer.address.line1,
          addressLine2: customer.address.line2,
          addressCity: customer.address.city,
          addressState: customer.address.state,
          addressZip: customer.address.zip,
          addressCountry: customer.address.country,
          vat: customer.vat,
          extraInfo: customer.extraInfo
        };

        this.setState({
          customer,
          customerEdit
        });
      });
  }

  loadReceipts() {
    fetch('/receipts')
      .then(res => res.json())
      .then(receipts => this.setState({
        loaded: true,
        receipts
      }));
  }

  saveCustomer(customer) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    let params = {
      method: 'POST',
      headers,
      body: JSON.stringify(customer)
    };

    return fetch('/receipts/customer', params)
      .then(res => res.json());
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
            <th className="text-right">Amount</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {this.state.receipts.map(receipt =>
            <tr key={receipt.year + '/' + receipt.month}>
              <td>
                {this.formatMonth(receipt.year, receipt.month)}
              </td>
              <td className="text-right">
                {this.formatCurrency(receipt.totalAmount)}
              </td>
              <td className="text-right">
                <a title="Download PDF"
                   href={receipt.pdfUrl + '&download=true'} target="_blank">Download</a>
              </td>
            </tr>)}
        </tbody>
      </table>

    let customerEditor =
      <div className="panel panel-default">
        <div className="panel-heading">Company information</div>
        <div className="panel-body">
          <div className="form-group">
            <label className="control-label">Name</label>
            <input className="form-control" value={this.state.customerEdit.name}
                   name="name" onChange={this.handleCustomerChange} />
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">Address line 1</label>
                <input className="form-control" value={this.state.customerEdit.addressLine1}
                      name="addressLine1" onChange={this.handleCustomerChange} />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">Address line 2</label>
                <input className="form-control" value={this.state.customerEdit.addressLine2}
                      name="addressLine2" onChange={this.handleCustomerChange} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">City</label>
                <input className="form-control" value={this.state.customerEdit.addressCity}
                       name="addressCity" onChange={this.handleCustomerChange} />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-group">
                <label className="control-label">State</label>
                <input className="form-control" value={this.state.customerEdit.addressState}
                       name="addressState" onChange={this.handleCustomerChange} />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-group">
                <label className="control-label">Zip</label>
                <input className="form-control" value={this.state.customerEdit.addressZip}
                       name="addressZip" onChange={this.handleCustomerChange} />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label">Country</label>
            <input className="form-control" value={this.state.customerEdit.addressCountry}
                   name="addressCountry" onChange={this.handleCustomerChange} />
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">VAT number</label>
                <input className="form-control" value={this.state.customerEdit.vat}
                      name="vat" onChange={this.handleCustomerChange} />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">Extra info</label>
                <input className="form-control" value={this.state.customerEdit.extraInfo}
                      name="extraInfo" onChange={this.handleCustomerChange} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <button className="btn btn-primary" onClick={this.handleSaveChangesClick}>Save</button>
            </div>
          </div>
        </div>
      </div>

    return (
      <div>
        <h1>Receipts</h1>
        <hr />
        <div className="row">
          <div className="col-sm-6">
            {!this.state.loaded ? loading : receiptsList}
          </div>
          <div className="col-sm-6">
            {!this.state.customer ? loading : customerEditor}
          </div>
        </div>
      </div>
    );
  }
}

export default Receipts;
