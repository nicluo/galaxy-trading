import React from 'react';
import { render } from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import withSession from "./lib/session";

const AppWithSession = withSession(App);

render(
  <AppWithSession />,
  document.getElementById('root')
);

registerServiceWorker();
