import Session from './sessions';

describe('Session', () => {
  test('Should return a new session when createSession id called', () => {
    const s = Session.createSession();
    expect(s.id).toBeTruthy();
  });

  test('Should be able to getInstance for a new session', () => {
    const s = Session.createSession();
    expect(Session.getInstance(s.id)).toBeTruthy();
  });

  test('Should be able to delete a session', () => {
    const s = Session.createSession();
    expect(s.deleteSession());
  });

  test('Should not be able to getInstance for a deleted session', () => {
    const s = Session.createSession();
    s.deleteSession();
    expect(Session.getInstance(s.id)).toBeNull();
  });
});

