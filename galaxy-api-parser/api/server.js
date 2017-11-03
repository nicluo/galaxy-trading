import Koa from 'koa';
import Router from 'koa-router';

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
  ctx.body = {data: 'Session'};
});

router.del('/sessions/:sessionId', ctx => {
  ctx.body = {data: 'Session Delete'};
});

/**
 * Create Koa App that serves Api only
 */

const api = new Koa();
api
  .use(router.routes())
  .use(router.allowedMethods());

export default api;