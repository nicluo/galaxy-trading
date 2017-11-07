import {createSession, deleteSession, getSession, getStatements, createStatement, deleteStament} from './api'

describe('api', () => {
  test('createSession should return response body', async () => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify({id: '12345'}));
    const s = await createSession();
    expect(s.id).toEqual('12345');
  });

  test('getSession should return response body', async () => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify({id: '12345'}));
    const s = await getSession('12345');
    expect(s.id).toEqual('12345');
  });

  test('deleteSession should call fetch', async () => {
    fetch.resetMocks();
    const s = await deleteSession('12345');
    expect(fetch.mock.calls.length).toEqual(1);
  });

  test('getStatements should extract statements property', async () => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify({statements: ['statement']}));
    const s = await getStatements('1', '2');
    expect(s).toEqual(['statement']);
  });

  test('createStatement should return response body', async () => {
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify({query: 'test'}));
    const s = await createStatement('1', '2', 'test query');
    expect(s).toEqual({query: 'test'});
  });

  test('deleteStatement should call fetch', async () => {
    fetch.resetMocks();
    const s = await deleteStament('12345');
    expect(fetch.mock.calls.length).toEqual(1);
  });
});