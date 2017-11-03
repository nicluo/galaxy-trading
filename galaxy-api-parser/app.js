import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import serve from 'koa-static';
import mount from 'koa-mount';

/**
 * Boilerplate Koa Router
 * @type {Router}
 */

const router = new Router();

router.get('/', ctx => {
  ctx.body = {data: 'Hello API'};
});

router.post('/queries', ctx => {
  ctx.body = 'Query';
});

router.del('/queries/:queryId', ctx => {
  ctx.body = 'Query Delete';
});

router.post('/sessions', ctx => {
  ctx.body = 'Session';
});

router.del('/sessions/:sessionId', ctx => {
  ctx.body = 'Session Delete';
});


/**
 * Create Koa App that serves Api only
 */

const api = new Koa();
api
  .use(router.routes())
  .use(router.allowedMethods());

/**
 * Create Koa App that serves HTML on /, and Api on /api
 */

const app = new Koa();
app
  .use(logger())
  .use(serve('../galaxy-site/build'))
  .use(mount('/api', api));

/**
 * Skip listen when running in testing env
 */

if(process.env.NODE_ENV !== 'testing') {
  app.listen(4000);
}

export default app;
