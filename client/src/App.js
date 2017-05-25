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
        <header className="app-header">
          <a href="/">
            <img src="/images/logo.png" className="app-logo"/>
          </a>
        </header>
        <Switch>
          <Route path='/' exact component={ReceiptsList} />
          <Route path='/receipt/:year/:month' component={Receipt} />
        </Switch>
      </div>
    );
  }
}

export default App;
