import koaRouter from 'koa-router';
import userMiddleware from '../middleware/user.js';
import authMiddleware from '../middleware/auth.js';
import userControllers from '../controllers/user.js';

const router = new koaRouter({ prefix: '/user' });

router
  /**
   * 用户菜单
   * 认证、用户菜单
   */
  .get('/menus', authMiddleware.auth, userControllers.getMenuList)
  /**
   * 注册用户
   * 验证字段、验证用户是否存在、加密密码、创建用户
   */
  .post(
    '/register',
    authMiddleware.auth,
    userMiddleware['/register'].validateField,
    userMiddleware['/register'].isUserExist,
    userMiddleware.crpytPassword,
    userControllers.register,
    userControllers.createMenuList
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
  .patch(
    '/change-password',
    authMiddleware.auth,
    userMiddleware['change-password'].validateField,
    userMiddleware.crpytPassword,
    userControllers.changePassword
  )
  .patch('/update/menus', authMiddleware.auth, userControllers.removeMenuList);

export default router;
