import { log4jsError } from '../utils/lo4js.js';
import menuServices from '../services/menu.js';
import { v4 as uuidv4 } from 'uuid';

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
        buttonPermissions = [],
        userInfo: { id },
      } = ctx.request.body;

      const res = await menuServices.createMenu({
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
        cataloguePath: uuidv4(),
      });

      if (buttonPermissions.length) {
        await menuServices.bulkCreate(
          buttonPermissions.map((item) => {
            return {
              type: 2,
              title: item.label,
              buttonId: item.value,
              parentId: res.id,
              creatorUserId: id,
            };
          })
        );
      }

      ctx.body = { code: 20000, data: {}, message: '' };
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

  /**
   * @method updateMenu
   * @param {*} ctx
   * @param {*} next
   */
  updateMenu: async (ctx) => {
    try {
      const {
        id,
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
        isAuth,
        buttonIds,
      } = ctx.request.body;

      let update;

      let buttonIdsToString = buttonIds.join(',');

      if (type === 0) {
        update = {
          layout,
          hidden,
          alwaysShow,
          title,
          icon,
          isAuth,
        };
      } else if (type === 1) {
        update = {
          hidden,
          title,
          path,
          icon,
          noCache,
          affix,
          breadcrumb,
          activeMenu,
          isAuth,
          buttonIds: buttonIdsToString,
        };
      }

      await menuServices.updateMenu({
        update,
        where: { id },
      });

      ctx.body = { code: 20000, data: {}, message: '' };
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
    }
  },
};
