import peg from 'pegjs';
import {generateParseGrammar, getDefaultParams, getEmptyParams} from "./index";

describe('Parser Template', () => {
  test('Should generate parser string from empty template', () => {
    const generatedGrammar = generateParseGrammar(getEmptyParams());
    const parser = peg.generate(generatedGrammar);
    expect(typeof(parser)).toEqual('object');
  });

  test('Should generate parser string from default template', () => {
    const generatedGrammar = generateParseGrammar(getDefaultParams());
    const parser = peg.generate(generatedGrammar);
    expect(typeof(parser)).toEqual('object');
  });
});