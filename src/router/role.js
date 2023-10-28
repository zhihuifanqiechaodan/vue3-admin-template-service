import koaRouter from 'koa-router';

import authMiddleware from '../middleware/auth.js';
import roleMiddleware from '../middleware/role.js';
import roleControllers from '../controllers/role.js';

const router = new koaRouter({ prefix: '/role' });

router
  .get('/list', authMiddleware.auth, roleControllers.getRoleList)
  .post('/create', authMiddleware.auth, roleMiddleware['/create'].validateField, roleControllers.createRole)
  .get('/info', roleControllers.getRuleInfo);

export default router;
