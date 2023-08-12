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
        title,
        icon,
        hidden,
        alwaysShow,
        noCache,
        breadcrumb,
        path,
        parentId,
        userInfo: { id },
      } = ctx.request.body;

      await menuServices.createMenu({
        type,
        layout,
        title,
        icon,
        hidden,
        alwaysShow,
        noCache,
        breadcrumb,
        path,
        parentId,
        creatorUserId: id,
        updateUserId: id,
      });

      ctx.body = { code: 20000, data: {}, message: '' };
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
    }
  },
};
