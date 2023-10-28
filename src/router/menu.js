import koaRouter from 'koa-router';

import menuMiddleware from '../middleware/menu.js';
import authMiddleware from '../middleware/auth.js';
import menuControllers from '../controllers/menu.js';
import commonControllers from '../controllers/common.js';

const router = new koaRouter({ prefix: '/menu' });

router
  .post(
    '/create',
    authMiddleware.auth,
    menuMiddleware['/create'].validateField,
    menuMiddleware['/create'].isMenuExist,
    menuControllers.createMenu
  )
  .get('/list', authMiddleware.auth, authMiddleware.getUserRole, commonControllers.getRoleMenuList)
  .post(
    '/update_sort',
    authMiddleware.auth,
    menuMiddleware['/update_sort'].validateField,
    menuControllers.updateMenuSort
  )
  .post(
    '/update',
    authMiddleware.auth,
    menuMiddleware['/update'].validateField,
    menuMiddleware['/update'].isMenuExist,
    menuControllers.updateMenu
  );

export default router;
