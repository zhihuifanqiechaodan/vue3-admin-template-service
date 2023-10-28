import { log4jsError } from '../utils/lo4js.js';
import roleServices from '../services/role.js';
import roleMenuServices from '../services/role_menu.js';

export default {
  /**
   * @method getRoleList
   * @param {*} ctx
   * @param {*} next
   */
  getRoleList: async (ctx) => {
    try {
      const roleList = await roleServices.findAll({
        where: {
          deleteStatus: 0,
        },
      });

      ctx.body = { code: 20000, data: { roleList }, message: '' };
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
  createRole: async (ctx) => {
    try {
      const { userInfo, name, roles } = ctx.request.body;

      const res = await roleServices.createRole({
        name,
        creatorUserId: userInfo.id,
      });

      await roleMenuServices.bulkCreate(
        roles.map((item) => {
          return {
            roleId: res.id,
            menuId: item,
            creatorUserId: userInfo.id,
          };
        })
      );

      ctx.body = { code: 20000, data: {}, message: '' };
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
      const { id } = ctx.request.query;

      const res = await roleServices.findOneRole({
        where: {
          id,
        },
      });

      const roles = await roleMenuServices.findAll({ where: { roleId: id } });

      res.roles = roles.map((item) => item.id);

      ctx.body = { code: 20000, data: { ruleInfo: res }, message: '' };
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
    }
  },
};
