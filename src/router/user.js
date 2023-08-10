import koaRouter from 'koa-router';

import userMiddleware from '../middleware/user.js';
import userControllers from '../controllers/user.js';
import authMiddleware from '../middleware/auth.js';

const router = new koaRouter({ prefix: '/user' });

router
  .post(
    '/register',
    userMiddleware['/register'].validateField,
    userMiddleware['/register'].isUserExist,
    userMiddleware.crpytPassword,
    userControllers.register
  )
  .post(
    '/login',
    userMiddleware['/login'].validateField,
    userMiddleware['/login'].isUserExist,
    userMiddleware['/login'].validatePassword,
    userControllers.login
  )
  .patch('/change_password', authMiddleware.auth, userMiddleware.crpytPassword, userControllers.changePassword);

export default router;
