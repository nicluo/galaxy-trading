import server from './server';
import Session from './sessions';
import request from 'supertest';

describe('routes: api', () => {
  test('Should respond with Hello API', async () => {
    const response = await request(server.listen()).get('/');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data).toEqual('Hello API');
  });
});

describe('routes: queries', () => {
  test('Should respond to new Query', async () => {
    const response = await request(server.listen()).post('/queries');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data).toEqual('Query');
  });
});

describe('routes: queries/:queryId', () => {
  test('Should respond to delete Query', async () => {
    const response = await request(server.listen()).del('/queries/1');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data).toEqual('Query Delete');
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
