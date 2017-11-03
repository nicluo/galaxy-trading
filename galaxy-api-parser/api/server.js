import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import Session from './sessions';
import Parser from './parsers';

/**
 * Boilerplate Koa Router
 * @type {Router}
 */

const router = new Router();

router.get('/', ctx => {
  ctx.body = {data: 'Hello API'};
});

router.get('/parsers/:parserId', ctx => {
  // TODO: check sessionId
  const p = Parser.getInstance(ctx.params.parserId);
  if(p) {
    ctx.body = p;
  } else {
    ctx.response.status = 404;
  }
});

router.post('/parsers/:parserId/statements', ctx => {
  // TODO: check sessionId
  const p = Parser.getInstance(ctx.params.parserId);
  if(p) {
    ctx.body = p.query(ctx.request.body.query);
  } else {
    ctx.response.status = 404;
  }
});

router.del('/parsers/:parserId/statements/:statementId', ctx => {
  // TODO: check sessionId
  const p = Parser.getInstance(ctx.params.parserId);
  if(p) {
    p.deleteStatement(ctx.params.statementId);
    ctx.response.status = 202;
  } else {
    ctx.response.status = 404;
  }
});

router.post('/sessions', ctx => {
  const s = Session.createSession();
  const p = Parser.createParser();
  s.setParserId(p.id);
  ctx.body = s;
});

router.get('/sessions/:sessionId', ctx => {
  const s = Session.getInstance(ctx.params.sessionId);
  if(s) {
    ctx.body = s;
  } else {
    ctx.response.status = 404;
  }
});

router.del('/sessions/:sessionId', ctx => {
  const s = Session.getInstance(ctx.params.sessionId);
  if(s) {
    s.deleteSession(); // TODO: Should also deleteParser
    ctx.response.status = 202;
  } else {
    ctx.response.status = 404;
  }
});

/**
 * Create Koa App that serves Api only
 */

const api = new Koa();
api
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

export default api;