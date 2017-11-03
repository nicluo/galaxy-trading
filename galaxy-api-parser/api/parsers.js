import uuid from 'uuid/v4';
import peg from 'pegjs';
import {getDefaultParams, generateParseGrammar, getEmptyParams} from "./template";

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
    this.params = {};
    this.parser = null;
    this.regenerateParser();
  }

  regenerateParser() {
    /**
     * Create empty parser
     */
    let params = getEmptyParams();
    let parser = peg.generate(generateParseGrammar(params));

    /**
     * Map statements
     */
    this.statements = this.statements.map(s => {
      try {
        const result = parser.parse(s.query);
        switch (result.type) {
          case 'resource_definition':
            return s;
          case 'number_definition':
            params[result.from.toLowerCase()] = result.to;
            parser = peg.generate(generateParseGrammar(params));
            return s;
          default:
            return s;
        }
      } catch (e) {
        return s;
      }
    });
    this.params = params;
    this.parser = parser;
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
      switch(result.type) {
        case 'number_definition':
          statement.message = result.from + ' aliased to ' + result.to;
          break;
        case 'num_query':
          if(result.num_count === 0) {
            statement.message = 'Nothing is 0';
          } else {
            statement.message = result.num_word + ' is ' + result.num_count;
          }
          break;
        default:
          statement.message = result.type;
          break;
      }
    } catch (e) {
      statement.type = 'error';
      statement.message = ERROR_MESSAGE;
    }

    this.statements.push(statement);
    this.regenerateParser();

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
