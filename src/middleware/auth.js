import jsonwebtoken from 'jsonwebtoken';
import { log4jsError } from '../utils/lo4js.js';
import roleServices from '../services/role.js';

export default {
  /**
   * @method auth
   * @param {*} ctx
   * @param {*} next
   * @returns
   */
  auth: async (ctx, next) => {
    try {
      const { authorization = '' } = ctx.request.header;

      const token = authorization.replace('Bearer ', '');

      try {
        const userInfo = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        ctx.request.body.userInfo = userInfo;
      } catch (error) {
        switch (error.name) {
          case 'TokenExpiredError':
            ctx.body = {
              code: 40101,
              message: 'Token expired',
            };
            break;
          case 'JsonWebTokenError':
            ctx.body = {
              code: 40102,
              message: 'Invalid token',
            };
            break;
          default:
            ctx.app.emit('error', ctx);

            log4jsError(error);

            break;
        }
        return;
      }
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);

      return;
    }

    await next();
  },

  /**
   * @method getUserRole
   * @param {*} ctx
   * @param {*} next
   */
  getUserRole: async (ctx, next) => {
    try {
      const {
        userInfo: { roleId },
      } = ctx.request.body;

      const roleInfo = await roleServices.findOneRole({ where: { id: roleId } });

      ctx.request.body.roleInfo = roleInfo;
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
      return;
    }

    await next();
  },
};
