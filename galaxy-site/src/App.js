import React, { Component } from 'react';
import ResultList from './ResultList';
import Form from './Form';
import logo from './logo.svg';
import {createSession, createStatement, getSession, getStatements} from './lib/api';
import {getSessionId, setSessionId} from './lib/localstorage';
import './App.css';

class App extends Component {
  state = {
    session: null,
    statements: []
  };

  initializeSession() {
    if(getSessionId() !== null) {
      getSession(getSessionId())
        .then(session => this.setState({ session }))
        .then(() => this.initializeSatements())
        .catch(() => this.startNewSession());
    } else {
      this.startNewSession();
    }
  }

  startNewSession() {
    createSession()
      .then(session => {
        this.setState({ session });
        setSessionId(session.id);
      });
  }

  initializeSatements() {
    const { session } = this.state;
    getStatements(session.id, session.parserId)
      .then(statements => {
        console.log(statements)
        this.setState({ statements });
      });
  }

  componentDidMount() {
    this.initializeSession();
  }

  render() {
    const {session, statements} = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div className="text-white float-right">{ session ? session.id : '' }</div>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Space Math</h1>
        </header>

        <Form session={session} />
        <ResultList session={session} statements={statements} />
      </div>
    );
  }
}

export default App;
