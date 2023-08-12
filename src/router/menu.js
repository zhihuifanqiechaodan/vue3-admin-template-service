import koaRouter from 'koa-router';

import menuMiddleware from '../middleware/menu.js';
import menuControllers from '../controllers/menu.js';
import authMiddleware from '../middleware/auth.js';

const router = new koaRouter({ prefix: '/menu' });

router.post(
  '/create',
  authMiddleware.auth,
  menuMiddleware['/create'].validateField,
  menuMiddleware['/create'].isMenuExist,
  menuControllers.createMenu
);

export default router;
