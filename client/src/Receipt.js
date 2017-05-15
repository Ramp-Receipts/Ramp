import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

class Receipt extends Component {

  // state = {
  //   loaded: false,
  //   receipts: []
  // };

  componentDidMount() {
    console.log('Did mount');
    // fetch('/receipts')
    //   .then(res => res.json())
    //   .then(receipts => this.setState({
    //     loaded: true,
    //     receipts
    //   }));
  }

  componentWillReceiveProps(properties) {
    console.log(properties);
    // this.setState({
    //   stripeAccounts: properties.stripeAccounts,
    //   user: properties.user,
    //   stripeConfig: properties.stripeConfig
    // });
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

    return (
      <div>
        <h1>Receipt for </h1>
        { loading }
      </div>
    );
  }
}

export default Receipt;
