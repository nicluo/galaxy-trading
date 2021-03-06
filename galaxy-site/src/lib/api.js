import urlJoin from 'url-join';

const API_BASE_URL = 'http://localhost:4000/api';

export const createSession = () => {
  return fetch(urlJoin(API_BASE_URL, 'sessions'), { method: 'POST' })
    .then(response => response.json());
};

export const getSession = (sessionId) => {
  return fetch(urlJoin(API_BASE_URL, 'sessions', sessionId))
    .then(response => response.json());
};

export const deleteSession = (sessionId) => {
  return fetch(urlJoin(API_BASE_URL, 'sessions', sessionId), {
    method: 'DELETE'
  });
};

export const getStatements = (sessionId, parserId) => {
  //TODO: Support authorization using sessionId
  return fetch(urlJoin(API_BASE_URL, 'parsers', parserId))
    .then(response => response.json())
    .then(parser => parser.statements);
};

export const createStatement = (sessionId, parserId, query) => {
  return fetch(urlJoin(API_BASE_URL, 'parsers', parserId, 'statements'), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      sessionId,
      query
    })
  }).then(response => response.json());
};

export const deleteStament = (sessionId, parserId, statementId) => {
  return fetch(urlJoin(API_BASE_URL, 'parsers', parserId, 'statements', statementId), {
    method: 'DELETE',
    body: { //TODO: DELETE request body may be ignored by server
      sessionId
    }
  });
};