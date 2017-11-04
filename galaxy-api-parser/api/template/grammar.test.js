import grammar from './grammar';

describe('Grammar Template', () => {
  test('Should return grammar string', () => {
    const config = { resources: [] };
    const generatedGrammar = grammar(config);
    expect(typeof(generatedGrammar)).toEqual('string');
  });
});