import {getSessionId, setSessionId} from './localstorage';

describe('localstorage', () => {
  test('getSessionId should call localStorage.getItem', () => {
    expect(getSessionId()).toBeNull();
  })

  test('setSessionId should call localStorage.setItem', () => {
    setSessionId('1');
    expect(localStorage.setItem).toHaveBeenLastCalledWith('session', '1');
    expect(localStorage.__STORE__['session']).toEqual('1');
  })
});