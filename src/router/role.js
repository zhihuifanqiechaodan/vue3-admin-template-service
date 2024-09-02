import koaRouter from 'koa-router';

import authMiddleware from '../middleware/auth.js';
import roleMiddleware from '../middleware/role.js';
import roleControllers from '../controllers/role.js';

const router = new koaRouter({ prefix: '/role' });

router
  /**
   * 获取角色列表
   * 认证、获取角色列表
   */
  .get('/list', authMiddleware.auth, roleControllers.roleList)
  /**
   * 获取角色详情
   * 认证、获取角色详情
   */
  .post('/info', authMiddleware.auth, roleControllers.getRuleInfo)
  /**
   * 创建角色
   * 验证字段、验证名称是否存在、创建角色、创建角色菜单
   */
  .post(
    '/create',
    authMiddleware.auth,
    roleMiddleware['/create'].validateField,
    roleMiddleware['/create'].isExist,
    roleControllers.createRole,
    roleControllers.createRoleMenus
  );

export default router;
