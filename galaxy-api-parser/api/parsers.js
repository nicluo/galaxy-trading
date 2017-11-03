import uuid from 'uuid/v4';

/**
 * parsers contains a map of valid Parser objects
 * @type {{Parser}}
 */
const parsers = {};

const ERROR_MESSAGE = 'I have no idea what you are talking about';

class Parser {
  /**
   * getInstance gets the Parser instance for a valid parser ID
   * @param parserId
   * @returns {Parser}
   */
  static getInstance(parserId) {
    if(Object.keys(parsers).indexOf(parserId) !== -1) {
      return parsers[parserId];
    } else {
      return null;
    }
  }

  /**
   * createParser initializes and returns a Parser instance
   * @returns {Parser}
   */
  static createParser() {
    const id= uuid();
    const p = new Parser(id);
    return parsers[id] = p;
  }

  constructor(id) {
    this.id = id;
    this.statements = [];
    this.parser = null; // TODO: Create parser based on statements
  }

  /**
   * query returns a statement based on the string query given
   * @param query
   * @returns {{id: *, query: *}}
   */
  query(query) {
    const statement = {
      id: uuid(),
      query: query
    };

    try {
      const result = this.parser.parse(query); // TODO: Elaborate on parser results
      statement.type = 'success';
      statement.message = result;
    } catch (e) {
      statement.type = 'error';
      statement.message = ERROR_MESSAGE;
    }

    this.statements.push(statement);
    return statement;
  }

  /**
   * deleteStatement removes a statement by statementId
   */
  deleteStatement(statementId) {
    this.statements = this.statements.filter((s) => s.id !== statementId);
  }

  /**
   * deleteParser removes itself from tracked parsers
   */
  deleteParser() {
    delete parsers[this.id];
  }
}

export default Parser;
