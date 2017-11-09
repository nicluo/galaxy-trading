import React, { Component } from 'react';
import ResultList from './ResultList';
import Form from './Form';
import logo from './logo.svg';
import {createStatement, getStatements} from './lib/api';
import './App.css';

class App extends Component {
  state = {
    statements: [],
  };

  initializeStatements(props) {
    const { sessionId, parserId } = props;
    getStatements(sessionId, parserId)
      .then(statements => {
        this.setState({ statements });
      });
  }

  componentWillReceiveProps(nextProps) {
    if(typeof(nextProps.sessionId) !== 'undefined' && typeof(nextProps.parserId) !== 'undefined') {
      this.initializeStatements(nextProps);
    }
  }

  handleQuery = (query) => {
    const { sessionId, parserId } = this.props;
    const { statements} = this.state;
    createStatement(sessionId, parserId, query)
      .then(s => {
        const newStatements = statements.slice();
        newStatements.push(s);
        this.setState({ statements: newStatements });
      });
  };

  render() {
    const { sessionId, offline } = this.props;
    const { statements } = this.state;

    let body;
    if(offline === true) {
      body = (
        <div className="alert alert-danger" role="alert">
          Unable to connect to API server.
        </div>
      );
    } else if(sessionId === null) {
      body = (
        <div className="alert alert-info" role="alert">
          Connecting to API server...
        </div>
      );
    } else {
      body = (
        <div>
          <ResultList statements={statements} />
          <Form onSubmit={this.handleQuery} />
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="text-white float-right">{sessionId}</div>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Space Math</h1>
        </header>
        {body}
      </div>
    );
  }
}

export default App;
