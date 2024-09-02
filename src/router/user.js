import koaRouter from 'koa-router';

import userMiddleware from '../middleware/user.js';
import authMiddleware from '../middleware/auth.js';
import userControllers from '../controllers/user.js';
import commonControllers from '../controllers/common.js';

const router = new koaRouter({ prefix: '/user' });

router
  /**
   * 注册用户
   * 验证字段、验证用户是否存在、加密密码、创建用户
   */
  .post(
    '/register',
    userMiddleware['/register'].validateField,
    userMiddleware['/register'].isUserExist,
    userMiddleware.crpytPassword,
    userControllers.register
  )
  /**
   * 登录
   * 验证字段、验证用户是否存在、验证密码、验证用户状态、登录
   */
  .post(
    '/login',
    userMiddleware['/login'].validateField,
    userMiddleware['/login'].isUserExist,
    userMiddleware['/login'].validatePassword,
    userMiddleware['/login'].validateUserStatus,
    userControllers.login
  )
  /**
   * 变更密码
   * 认证、加密密码、变更密码
   */
  .patch('/change_password', authMiddleware.auth, userMiddleware.crpytPassword, userControllers.changePassword)
  .get('/menu_list', authMiddleware.auth, authMiddleware.getUserRole, commonControllers.getRoleMenuList);

export default router;
