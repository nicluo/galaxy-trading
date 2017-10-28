import React, { Component } from 'react';
import ResultList from './ResultList';
import Form from './Form';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Space Math</h1>
        </header>

        <ResultList />
        <Form />
      </div>
    );
  }
}

export default App;
