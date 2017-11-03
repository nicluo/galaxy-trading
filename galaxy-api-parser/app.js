import Koa from 'koa';
import logger from 'koa-logger';
import serve from 'koa-static';
import mount from 'koa-mount';
import api from './api/server';


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

/* istanbul ignore next */
if(process.env.NODE_ENV !== 'testing') {
  app.listen(4000);
}

export default app;
