import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

class Receipt extends Component {

  state = {
    loaded: false,
    receipt: {charges:[]}
  };

  componentDidMount() {
    let params = this.props.match.params;
    let year = parseInt(params.year);
    let month = parseInt(params.month);

    this.setState({ year, month });

    fetch(`/receipts/${year}/${month}`)
      .then(res => res.json())
      .then(receipt => this.setState({
        loaded: true,
        receipt
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
                  {this.formatCurrency(charge.totalAmount)}
              </td>
            </tr>)}
          </tbody>
        </table>

        <hr />

        <div className="text-right">
          <strong>
            Total: {this.formatCurrency(this.state.receipt.totalAmount)}
          </strong>
        </div>
      </div>

    return (
      <div>
        <h1>Receipt for {this.formatMonth(this.state.year, this.state.month)}</h1>
        {!this.state.loaded ? loading : receipt}
      </div>
    );
  }
}

export default Receipt;
