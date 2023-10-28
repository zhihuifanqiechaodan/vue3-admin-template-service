import menuServices from '../services/menu.js';
import { log4jsError } from '../utils/lo4js.js';

export default {
  /**
   * @method getRoleMenuList
   * @param {*} ctx
   * @param {*} next
   */
  getRoleMenuList: async (ctx) => {
    try {
      const { roleInfo } = ctx.request.body;

      const { type } = roleInfo;

      let menuList = [];

      if (type === 1) {
        menuList = await menuServices.findAllMenu({ where: { deleteStatus: 0 } });
      } else {
      }

      ctx.body = { code: 20000, data: { menuList }, messgae: '' };
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
    }
  },
};
