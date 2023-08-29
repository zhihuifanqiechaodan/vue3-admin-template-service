import { log4jsError } from '../utils/lo4js.js';
import menuServices from '../services/menu.js';

export default {
  /**
   * @method createMenu
   * @param {*} ctx
   * @param {*} next
   */
  createMenu: async (ctx) => {
    try {
      const {
        type,
        layout,
        hidden,
        alwaysShow,
        title,
        icon,
        path,
        noCache,
        affix,
        breadcrumb,
        activeMenu,
        userInfo: { id },
      } = ctx.request.body;

      await menuServices.createMenu({
        type,
        layout,
        hidden,
        alwaysShow,
        title,
        icon,
        path,
        noCache,
        affix,
        breadcrumb,
        activeMenu,
        creatorUserId: id,
        updateUserId: id,
      });

      ctx.body = { code: 20000, data: {}, message: '' };
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
    }
  },

  /**
   * @method getMenuList
   * @param {*} ctx
   * @param {*} next
   */
  getMenuList: async (ctx) => {
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

  /**
   * @method updateMenuSort
   * @param {*} ctx
   * @param {*} next
   */
  updateMenuSort: async (ctx) => {
    try {
      const { menuList } = ctx.request.body;

      await Promise.all(
        menuList.map((item) => {
          return menuServices.updateMenu({
            update: { sortIndex: item.sortIndex, parentId: item.parentId },
            where: { id: item.id },
          });
        })
      );

      ctx.body = { code: 20000, data: {}, message: '' };
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
    }
  },
};
