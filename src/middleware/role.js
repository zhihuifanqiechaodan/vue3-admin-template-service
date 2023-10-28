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
        const { name, roles } = ctx.request.body;

        const schema = joi.object({
          name: joi.string().required(),
          roles: joi.array().items(joi.number()).required(),
        });

        const result = schema.validate({ name, roles });

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
  },
};
