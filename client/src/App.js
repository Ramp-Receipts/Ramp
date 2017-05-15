import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReceiptsList } from './ReceiptsList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {
    return (
      <div className="app container">
        <Switch>
          <Route path="/" component={ReceiptsList}/>
        </Switch>
      </div>
    );
  }
}

export default App;
