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

router.post('/queries', ctx => {
  ctx.body = {data: 'Query'};
});

router.del('/queries/:queryId', ctx => {
  ctx.body = {data: 'Query Delete'};
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