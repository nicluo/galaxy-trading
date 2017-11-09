import React from 'react';
import {getSessionId, setSessionId} from './localstorage';
import {createSession, getSession} from './api';

/**
 * withSession is a higher order component which validates or creates session ids
 * and passes them down to wrapped components
 * @param WrappedComponent
 * @param sessionId
 * @returns {{new(*=): {}}}
 */
const withSession = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      session: null,
      offline: false,
    };

    initializeSession() {
      if(getSessionId() !== null) {
        getSession(getSessionId())
          .then(session => {
            this.setState({ session });
          })
          .catch(() => this.startNewSession());
      } else {
        this.startNewSession();
      }
    }

    startNewSession() {
      return createSession()
        .then(session => {
          this.setState({ session });
          setSessionId(session.id);
        })
        .catch(() => {
          this.setState({ offline: true });
        });
    }

    componentDidMount() {
      this.initializeSession();
    }

    render() {
      const { session, offline } = this.state;
      const sessionProps = {
        sessionId : session ? session.id : null,
        parserId : session ? session.parserId : null,
      };
      return <WrappedComponent offline={offline} {...sessionProps} {...this.props} />;
    }
  }
};

export default withSession;