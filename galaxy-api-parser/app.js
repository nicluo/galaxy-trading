import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import serve from 'koa-static';
import mount from 'koa-mount';

const router = new Router();

router.get('/', ctx => {
  ctx.body = 'Hello API';
});

router.post('/queries', ctx => {
  ctx.body = 'Query';
});

router.del('/queries/:queryId', ctx => {

});

router.post('/sessions', ctx => {
  ctx.body = 'Session';
});

router.del('/sessions/:sessionId', ctx => {

});


const api = new Koa();
api
  .use(router.routes())
  .use(router.allowedMethods());

const app = new Koa();
app
  .use(logger())
  .use(serve('../galaxy-site/build'))
  .use(mount('/api', api))
  .listen(4000);