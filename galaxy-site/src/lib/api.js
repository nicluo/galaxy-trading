import urlJoin from 'url-join';

const API_BASE_URL = 'http://localhost:4000/api';

export const createSession = () => {
  return fetch(urlJoin(API_BASE_URL, '/sessions'), { method: 'POST' })
    .then(response => response.json())
    .then(s => { console.log('create', s); return s; });
};

export const getSession = (sessionId) => {
  return fetch(urlJoin(API_BASE_URL, '/sessions', sessionId))
    .then(response => response.json())
    .then(s => { console.log('get', s); return s; });
};

export const deleteSession = (sessionId) => {
  return fetch(urlJoin(API_BASE_URL, 'sessions', sessionId), {
    method: 'DELETE'
  }).then(response => response.json());
};

export const getQueries = (sessionId) => {
  return fetch(urlJoin(API_BASE_URL, '/queries', sessionId))
    .then(response => response.json());
};

export const createQuery = (sessionId, query) => {
  return fetch(urlJoin(API_BASE_URL, '/queries'), {
    method: 'POST',
    body: {
      sessionId,
      query
    }
  }).then(response => response.json());
};

export const deleteQuery = (sessionId, query) => {
  return fetch(urlJoin(API_BASE_URL, '/queries'), {
    method: 'POST',
    body: {
      sessionId,
      query
    }
  }).then(response => response.json());
};