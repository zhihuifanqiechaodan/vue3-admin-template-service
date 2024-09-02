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
import startupScript from './startupScript.js';

const app = new Koa();

app
  .use(koaHelmet())
  .use(
    koa2Cors({
      origin: (ctx) => {
        const requestOrigin = ctx.request.origin;
        const localhost = 'http://10.1.4.16';
        const allowedOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
        const whiteList = ['https://example1.com', 'https://example2.com'];
        if (allowedOriginPattern.test(requestOrigin) || whiteList.includes(requestOrigin)) {
          return requestOrigin;
        }

        return localhost;
      },
      credentials: true,
    })
  )
  .use(koaBody({ multipart: true }))
  .use(koaStatic(path.resolve(process.cwd(), 'src/assets')))
  .use(requestLog)
  .use(router.routes())
  .use(router.allowedMethods())
  .on('error', errHandler)
  .listen(process.env.APP_PORT, () => {
    log4jsInfo(`server is running on http://localhost:${process.env.APP_PORT}`);

    startupScript.initSuperAdministrator();
  });
