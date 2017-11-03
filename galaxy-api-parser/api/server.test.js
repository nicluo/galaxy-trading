import server from './server';
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
    expect(response.body.data).toEqual('Session');
  });
});

describe('routes: session/:sessionId', () => {
  test('Should respond to delete Session', async () => {
    const response = await request(server.listen()).del('/sessions/1');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data).toEqual('Session Delete');
  });
});
