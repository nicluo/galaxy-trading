import Parser from './parsers';

describe('Parsers', () => {
    test('createParser should initialize and return a new Parser', () => {
        const p = Parser.createParser();
        expect(p.id).toBeTruthy();
    });

    test('getInstance should return null for non-existing parser', () => {
        const p = Parser.getInstance('1');
        expect(p).toBeNull();
    });

    test('getInstance should return a parser instance given the id', () => {
        const p = Parser.createParser();
        const pCompare = Parser.getInstance(p.id);
        expect(p).toEqual(pCompare);
    });

    test('deleteParser should remove parser from the map of valid Parsers', () => {
        const p = Parser.createParser();
        p.deleteParser();
        expect(Parser.getInstance(p.id)).toEqual(null);
    });

    test('deleteStatement should reduce the count of statements', () => {
        const p = Parser.createParser();
        const s = p.query('nonsense');
        expect(p.statements.length).toEqual(1);
        p.deleteStatement(s.id);
        expect(p.statements.length).toEqual(0);
    });

    test('regenerateParser not change statement length', () => {
        const p = Parser.createParser();
        const s = p.query('nonsense');
        p.regeneratePegParser();
        expect(p.statements.length).toEqual(1);
    });
});

describe('Parser Definitions', () => {
    test('addNumberDefinition should add to params', () => {
        const p = Parser.createParser();
        p.addNumberDefinition('m', 'tegj');
        expect(p.params['m']).toEqual('tegj');
    });

    test('addResourceDefinition should add to resources list', () => {
        const p = Parser.createParser();
        p.addResourceDefinition(10, 'Iron', 20, 'Credits');
        expect(p.params['resources']).toEqual(['iron', 'credits']);
    });
});

describe('Parser Queries', () => {
    test('query should return error for nonsense queries', () => {
        const p = Parser.createParser();
        const s = p.query('nonsense');
        expect(s.type == 'error');
    });

    test('query should handle number_definition type of queries', () => {
        const p = Parser.createParser();
        const s = p.query('tegj is L');
        expect(s.type === 'number_definition');
    });

    test('query should handle num_query type of queries', () => {
        const p = Parser.createParser();
        p.query('tegj is L');
        const s = p.query('how much is tegj ?');
        expect(s.type === 'num_query');
        expect(s.message === 'tegj is 50');
    });

    test('query should handle num_query type of queries for 0 values', () => {
        const p = Parser.createParser();
        p.query('tegj is L');
        const s = p.query('how much is ?');
        expect(s.type === 'num_query');
        expect(s.message === 'Nothing is 0');
    });

    test('query should handle resource_definition type of queries for 0 values', () => {
        const p = Parser.createParser();
        const s = p.query('50 Iron is 50 Credits');
        expect(s.type === 'resource_definition');
    });

    test('query should handle resource_query type of queries for 0 values', () => {
        const p = Parser.createParser();
        p.query('50 Iron is 50 Credits');
        const s = p.query('how many Credits is 50 Iron ?')
        expect(s.type === 'resource_definition');
    });

    test('query should fail resource_query type of queries without relations', () => {
        const p = Parser.createParser();
        p.query('50 Iron is 50 Credits');
        p.query('50 Dirt is 50 Silver');
        const s = p.query('how many Dirt is 50 Iron ?')
        expect(s.type === 'error');
    });

    test('calculateResourceQuery should work for identity cases', () => {
        const p = Parser.createParser();
        p.addResourceDefinition(10, 'Iron', 20, 'Credits');
        const s = p.calculateResourceQuery(10, 'Iron', 'Iron');
        expect(s.length).toEqual(2);
        expect(s[0]).toEqual({resource: 'Iron', amount: 10});
        expect(s[1]).toEqual({resource: 'Iron', amount: 10});
    });
});
