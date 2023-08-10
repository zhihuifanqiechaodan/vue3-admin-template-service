import './env.js';

import path from 'path';
import Koa from 'koa';
import { koaBody } from 'koa-body';
import koa2Cors from 'koa2-cors';
import koaStatic from 'koa-static';
import koaHelmet from 'koa-helmet';

import errHandler from './middleware/err-handler.js';
import requestLog from './middleware/request-log.js';
import router from './router/index.js';
import { log4jsInfo } from './utils/lo4js.js';

const app = new Koa();

app
  .use(koaHelmet())
  .use(koa2Cors())
  .use(koaBody({ multipart: true }))
  .use(koaStatic(path.resolve(process.cwd(), 'src/assets')))
  .use(requestLog)
  .use(router.routes())
  .use(router.allowedMethods())
  .on('error', errHandler)
  .listen(process.env.APP_PORT, () => log4jsInfo(`server is running on http://localhost:${process.env.APP_PORT}`));
