import uuid from 'uuid/v4';

/**
 * sessions contains a map of valid Session objects
 * @type {{Session}}
 */
const sessions = {};

class Session {
  /**
   * getInstance gets the Session instance for a valid session ID
   * @param sessionId
   * @returns {Session}
   */
  static getInstance(sessionId) {
    if(Object.keys(sessions).indexOf(sessionId) !== -1) {
      return sessions[sessionId];
    } else {
      return null;
    }
  }

  /**
   * createSession initializes and returns a Session instance
   * @returns {*}
   */
  static createSession() {
    const id = uuid();
    const session = new Session(id);
    sessions[id] = session;
    return session;
  }

  constructor(id) {
    this.id = id;
    this.parserId = null;
  }

  /**
   * setParserId sets the Parser ID for the session
   * @param id
   */
  setParserId(id) {
    this.parserId = id;
  }

  /**
   * deleteSession removes itself from tracked sessions
   */
  deleteSession() {
    delete sessions[this.id];
  }
}

export default Session;
