import app from './app';
import request from 'supertest';

describe('routes: index', () => {
  test('Should respond with Homepage', async () => {
    const response = await request(app.listen()).get('/');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('text/html');
  });
});

describe('routes: api', () => {
  test('Should respond with Hello API', async () => {
    const response = await request(app.listen()).get('/api');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data).toEqual('Hello API');
  });
});