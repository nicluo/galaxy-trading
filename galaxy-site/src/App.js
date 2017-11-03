import React, { Component } from 'react';
import ResultList from './ResultList';
import Form from './Form';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {createSession, getSession} from './lib/api';
import './lib/localstorage';
import {getSessionId, setSessionId} from "./lib/localstorage";

class App extends Component {
  state = {
    session: null
  };

  initializeSession() {
    if(getSessionId() !== null) {
      getSession(getSessionId())
        .then(session => this.setState({ session }))
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

  componentDidMount() {
    this.initializeSession();
  }

  render() {
    const {session} = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div className="text-white float-right">{ session ? session.id : '' }</div>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Space Math</h1>
        </header>

        <ResultList session={session} />
        <Form session={session} />
      </div>
    );
  }
}

export default App;
