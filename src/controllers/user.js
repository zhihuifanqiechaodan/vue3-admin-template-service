import { log4jsError } from '../utils/lo4js.js';
import userServices from '../services/user.js';
import userMenuServices from '../services/user_menu.js';
import jsonwebtoken from 'jsonwebtoken';
import roleMenuServices from '../services/role_menu.js';

export default {
  /**
   * @method register
   * @param {*} ctx
   * @param {*} next
   */
  register: async (ctx, next) => {
    try {
      const { userInfo, username, password, role_id } = ctx.request.body;
      const registerInfo = await userServices.create({ username, password, role_id, creator_id: userInfo.id });
      ctx.request.body.registerInfo = registerInfo;
      await next();
    } catch (error) {
      ctx.app.emit('error', ctx);
      log4jsError(error);
    }
  },

  /**
   * @method login
   * @param {*} ctx
   * @param {*} next
   */
  login: async (ctx) => {
    try {
      const { userInfo } = ctx.request.body;

      ctx.body = {
        code: 20000,
        data: {
          token: jsonwebtoken.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '1d' }),
          userInfo,
        },
      };
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
    }
  },

  /**
   * @method changePassword
   * @param {*} ctx
   * @param {*} next
   */
  changePassword: async (ctx) => {
    try {
      const { userInfo, password } = ctx.request.body;
      await userServices.updateUser({ where: { id: userInfo.id }, update: { password } });
      ctx.body = { code: 20000, data: {}, messgae: '' };
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
    }
  },
  /**
   * @method createMenuList
   * @param {*} ctx
   * @param {*} next
   */
  createMenuList: async (ctx) => {
    try {
      const { registerInfo, userInfo } = ctx.request.body;
      const roleMenus = await roleMenuServices.findAll({ where: { role_id: registerInfo.role_id } });
      await userMenuServices.bulkCreate(
        roleMenus.map((item) => {
          return {
            user_id: registerInfo.id,
            menu_id: item.menu_id,
            creator_id: userInfo.id,
          };
        })
      );
      registerInfo.menus = roleMenus.map((item) => item.menu_id);
      ctx.body = { code: 20000, data: { userInfo: registerInfo }, messgae: '' };
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
      const { userInfo } = ctx.request.body;
      const menuList = await userMenuServices.findAll({ where: { id: userInfo.id } });
      ctx.body = { code: 20000, data: { menuList }, messgae: '' };
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
    }
  },
  /**
   * @method removeMenuList
   * @param {*} ctx
   * @param {*} next
   */
  removeMenuList: async (ctx) => {
    try {
      const { userInfo } = ctx.request.body;
      const menuList = await userMenuServices.destroy({ where: { id: userInfo.id } });
      ctx.body = { code: 20000, data: { menuList }, messgae: '' };
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
    }
  },
};
