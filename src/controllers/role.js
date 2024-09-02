import { log4jsError } from '../utils/lo4js.js';
import roleServices from '../services/role.js';
import roleMenuServices from '../services/role_menu.js';

export default {
  /**
   * @method roleList
   * @param {*} ctx
   * @param {*} next
   */
  roleList: async (ctx) => {
    try {
      const roleList = await roleServices.findAll();

      ctx.body = { code: 20000, data: { roleList } };
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
    }
  },
  /**
   * @method createRole
   * @param {*} ctx
   * @param {*} next
   */
  createRole: async (ctx, next) => {
    try {
      const { userInfo, name } = ctx.request.body;

      const res = await roleServices.createRole({
        name,
        creator_id: userInfo.id,
      });

      ctx.request.body.role_id = res.id;

      await next();
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
    }
  },
  /**
   * @method createRole
   * @param {*} ctx
   */
  createRoleMenus: async (ctx) => {
    try {
      const { userInfo, menuIds, role_id } = ctx.request.body;
      if (menuIds.length) {
        await roleMenuServices.bulkCreate(
          menuIds.map((item) => {
            return {
              role_id,
              menu_id: item,
              creator_id: userInfo.id,
            };
          })
        );
      }

      ctx.body = { code: 20000 };
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
    }
  },
  /**
   * @method getRuleInfo
   * @param {*} ctx
   * @param {*} next
   */
  getRuleInfo: async (ctx) => {
    try {
      const { role_id } = ctx.request.body;
      const ruleInfo = await roleServices.findOne({ where: { id: role_id } });
      const menuList = await roleMenuServices.findAll({ where: { role_id } });
      ruleInfo.menuIds = menuList.map((item) => item.menu_id);
      ctx.body = { code: 20000, data: { ruleInfo } };
    } catch (error) {
      ctx.app.emit('error', ctx);
      log4jsError(error);
    }
  },
};
