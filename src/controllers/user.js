import { log4jsError } from '../utils/lo4js.js';
import userServices from '../services/user.js';
import jsonwebtoken from 'jsonwebtoken';
import menuServices from '../services/menu.js';

export default {
  /**
   * @method register
   * @param {*} ctx
   * @param {*} next
   */
  register: async (ctx) => {
    try {
      const { username, password } = ctx.request.body;

      const userInfo = await userServices.createUser({ username, password });

      ctx.body = { code: 20000, data: { userInfo } };
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

      const { username } = userInfo;

      await userServices.updateUser({ where: { username }, update: { password } });

      ctx.body = { code: 20000, data: {}, messgae: '' };
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
        menuList = await menuServices.findAllMenu({ where: { hidden: false, deleteStatus: 0 } });
      } else {
      }

      ctx.body = { code: 20000, data: { menuList }, messgae: '' };
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
    }
  },
};
