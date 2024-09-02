import roleServices from '../services/role.js';
import { log4jsError } from '../utils/lo4js.js';
import joi from 'joi';

export default {
  '/create': {
    /**
     * @method validateField
     * @param {*} ctx
     * @param {*} next
     * @returns
     */
    validateField: async (ctx, next) => {
      try {
        const { name, menuIds } = ctx.request.body;

        const schema = joi.object({
          name: joi.string().required(),
          menuIds: joi.array().items(joi.number().strict()).required(),
        });

        const result = schema.validate({ name, menuIds });

        if (result.error) {
          ctx.body = {
            code: 40000,
            message: result.error.message,
          };
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
     * @method isExist
     * @param {*} ctx
     * @param {*} next
     * @returns
     */
    isExist: async (ctx, next) => {
      try {
        const { name } = ctx.request.body;

        const res = await roleServices.findOne({ where: { name } });

        if (res) {
          ctx.body = {
            code: 50101,
            message: 'name already exists',
          };

          return;
        }
      } catch (error) {
        ctx.app.emit('error', ctx);

        log4jsError(error);

        return;
      }

      await next();
    },
  },
};
