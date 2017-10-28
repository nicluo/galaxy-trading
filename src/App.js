import React, { Component } from 'react';
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

        {/* ResultList Component */}
        <div className="container my-4">
          <div className="card my-2">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong className="h4">
                  how much wood could a woodchuck chuck if a woodchuck could chuck wood ?
                </strong>
              </li>
              <li className="list-group-item list-group-item-danger">
                I have no idea what you are talking about
              </li>
            </ul>
          </div>
          <div className="card my-2">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong className="h4">
                  how much is pish tegj glob glob ?
                </strong>
              </li>
              <li className="list-group-item list-group-item-success">
                pish tegj glob glob is 42
              </li>
            </ul>
          </div>
        </div>

        {/* Form Component */}
        <div className="container my-4">
          <div className="form-group">
            <input type="text" className="form-control form-control-lg" id="query" aria-describedby="query" placeholder="how much is pish pish Iron ?" autoFocus="" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
