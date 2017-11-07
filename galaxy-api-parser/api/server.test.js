import server from './server';
import Session from './sessions';
import request from 'supertest';
import Parser from './parsers';

describe('routes: api', () => {
  test('Should respond with Hello API', async () => {
    const response = await request(server.listen()).get('/');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data).toEqual('Hello API');
  });
});

describe('routes: parsers', () => {
  test('Should be able to fetch parser', async () => {
    const p = Parser.createParser();
    const response = await request(server.listen()).get(`/parsers/${p.id}`);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.id).toEqual(p.id);
    expect(response.body.statements).toEqual([]);
  });
});

describe('routes: parsers', () => {
    test('Should respond 404 to invalid fetch parser', async () => {
        const response = await request(server.listen()).get('/parsers/1');
        expect(response.status).toEqual(404);
    });
});

describe('routes: parsers', () => {
    test('Should be able to create statement', async () => {
        const p = Parser.createParser();
        const response = await request(server.listen()).post(`/parsers/${p.id}/statements`).send({
          query: 'tegj is L',
        });
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.id).toBeTruthy();
        expect(response.body.query).toEqual('tegj is L');
        expect(response.body.type).toEqual('success');
        expect(response.body.message).toBeTruthy();
    });
});

describe('routes: parsers', () => {
    test('Should respond 404 to invalid create statement', async () => {
        const response = await request(server.listen()).post('/parsers/1/statements');
        expect(response.status).toEqual(404);
    });
});

describe('routes: parsers', () => {
  test('Should respond to delete request', async () => {
    const p = Parser.createParser();
    const s = p.query('tegj is L');
    const response = await request(server.listen()).del(`/parsers/${p.id}/statements/${s.id}`);
    expect(response.status).toEqual(202);
    expect(p.statements.length).toEqual(0);
  });
});

describe('routes: parsers', () => {
    test('Should respond 404 to invalid delete request', async () => {
        const response = await request(server.listen()).del('/parsers/1/statements/1');
        expect(response.status).toEqual(404);
    });
});

describe('routes: session', () => {
  test('Should respond to new Session', async () => {
    const response = await request(server.listen()).post('/sessions');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.id).toBeTruthy();
  });
});

describe('routes: session/:sessionId', () => {
  test('Should not be able to fetch arbitrary Session', async () => {
    const response = await request(server.listen()).get('/sessions/1');
    expect(response.status).toEqual(404);
  });
});

describe('routes: session/:sessionId', () => {
  test('Should be able to fetch Session', async () => {
    const s = Session.createSession();
    const response = await request(server.listen()).get('/sessions/' + s.id);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.id).toEqual(s.id);
  });
});

describe('routes: session/:sessionId', () => {
  test('Should respond to delete Session', async () => {
    const s = Session.createSession();
    const response = await request(server.listen()).del('/sessions/' + s.id);
    expect(response.status).toEqual(202);
  });
});

describe('routes: session/:sessionId', () => {
  test('Should not be able to delete arbitrary Session', async () => {
    const response = await request(server.listen()).del('/sessions/1');
    expect(response.status).toEqual(404);
  });
});
