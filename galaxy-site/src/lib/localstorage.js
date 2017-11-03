export const setSessionId = (sessionId) => {
  localStorage.setItem('session', sessionId);
};

export const getSessionId = (sessiodId) => {
  return localStorage.getItem('session');
};