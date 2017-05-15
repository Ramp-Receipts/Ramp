import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Receipt from './Receipt';
import ReceiptsList from './ReceiptsList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {
    return (
      <div className="app container">
        <Switch>
          <Route path='/' component={ReceiptsList} />
          <Route path='/receipt/:year/:month' component={Receipt} />
        </Switch>
      </div>
    );
  }
}

export default App;
