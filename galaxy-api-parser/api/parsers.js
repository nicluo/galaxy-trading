import uuid from 'uuid/v4';
import peg from 'pegjs';
import {getDefaultParams, generateParseGrammar, getEmptyParams} from "./template";
import Resources from "./resources";

/**
 * parsers contains a map of valid Parser objects
 * @type {{Parser}}
 */
const parsers = {};

const messages = {
  error: () =>'I have no idea what you are talking about',
  numberDefinition: (from, to) => `${from} aliased to ${to}`,
  numberQuery: (query, amount) => `${query} is ${amount}`,
  resourceDefinition: (fromAmount, fromResource, toAmount, toResource) => `${fromAmount} ${fromResource} = ${toAmount} ${toResource}`,
  resourceQuery: (conversionSteps) => `${conversionSteps.map(({resource, amount}) => `${amount} ${resource}`).join(' is ')}`,
  resourceQueryNoClosure: () => 'I haven\'t learned how to convert between them yet'
};

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
    parsers[id] = p;
    return p;
  }

  constructor(id) {
    this.id = id;
    this.statements = [];
    this.initializePegParser();
  }

  /**
   * Create empty PEG parser
   */
  initializePegParser() {
    this.resources = new Resources();
    this.params = getEmptyParams();
    this.generatePegParser();
  }

  /**
   * Reload PEG parser
   */
  generatePegParser() {
    this.parser = peg.generate(generateParseGrammar(this.params));
  }


  /**
   * regeneratePegParser should be used when statements are deleted
   */
  regeneratePegParser() {
    this.initializePegParser();

    // Replay statements
    const statements = this.statements;
    this.statements = [];
    statements.forEach(s => {
      this.query(s.query);
    });
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

    let result;
    try {
      result = this.parser.parse(query);
    } catch (e) {
      statement.type = 'error';
      statement.message = messages.error();

      this.statements.push(statement);
      return statement;
    }

    statement.type = 'success';
    switch(result.type) {
      case 'number_definition':
        this.addNumberDefinition(result.from, result.to);
        statement.message = messages.numberDefinition(result.from, result.to);
        break;
      case 'num_query':
        if(result.num_count === 0) {
          statement.message = messages.numberQuery('Nothing', 0);
        } else {
          statement.message = messages.numberQuery(result.num_word, result.num_count);
        }
        break;
      case 'resource_definition':
        this.addResourceDefinition(result.from_count, result.from, result.to_count, result.to);
        statement.message = messages.resourceDefinition(result.from_count, result.from, result.to_count, result.to);
        break;
      case 'resource_query':
        const results = this.calculateResourceQuery(result.from_count, result.from, result.to);
        if(results === null) {
          statement.type = 'error';
          statement.message = messages.resourceQueryNoClosure();
        } else {
          results[0].amount = result.from_word;
          statement.message = messages.resourceQuery(results);
        }
        break;
    }

    this.statements.push(statement);
    this.generatePegParser();

    return statement;
  }

  /**
   * addNumberDefinition is called when a num_definition statement is parsed
   * @param from
   * @param to
   */
  addNumberDefinition(from, to) {
    this.params[from.toLowerCase()] = to;
  }

  /**
   * addResourceDefinition is called when a resource_definition statement is parsed
   * @param fromAmount
   * @param fromResource
   * @param toAmount
   * @param toResource
   */
  addResourceDefinition(fromAmount, fromResource, toAmount, toResource) {
    this.resources.addResource(fromResource);
    this.resources.addResource(toResource);
    this.resources.addResourceRelation(fromAmount, fromResource, toAmount, toResource);
    this.params.resources = this.resources.getResourcesList();
  }

  /**
   * calculateResourceQuery is called when a resource_query statement is parsed
   * @param fromAmount
   * @param fromResource
   * @param toResource
   * @returns {{label: string, amount: number}[]}
   */
  calculateResourceQuery(fromAmount, fromResource, toResource) {
    return this.resources.queryRelation(fromAmount, fromResource, toResource);
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
