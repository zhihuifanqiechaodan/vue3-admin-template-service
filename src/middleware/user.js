import { log4jsError } from '../utils/lo4js.js';
import joi from 'joi';
import userServices from '../services/user.js';
import bcrypt from 'bcryptjs';

export default {
  /**
   * @method crpytPassword
   * @param {*} ctx
   * @param {*} next
   */
  crpytPassword: async (ctx, next) => {
    try {
      const { password } = ctx.request.body;

      const salt = bcrypt.genSaltSync(10);

      const hash = bcrypt.hashSync(password, salt);

      ctx.request.body.password = hash;
    } catch (error) {
      ctx.app.emit('error', ctx);

      log4jsError(error);
      return;
    }

    await next();
  },

  '/register': {
    /**
     * @method validateField
     * @param {*} ctx
     * @param {*} next
     * @returns
     */
    validateField: async (ctx, next) => {
      try {
        const { username, password } = ctx.request.body;

        const schema = joi.object({
          username: joi.string().alphanum().min(3).max(30).required(),
          password: joi
            .string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$'))
            .required()
            .messages({
              'string.pattern.base':
                'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
            }),
        });

        const result = schema.validate({ username, password });

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
     * @method isUserExist
     * @param {*} ctx
     * @param {*} next
     */
    isUserExist: async (ctx, next) => {
      try {
        const { username } = ctx.request.body;

        const res = await userServices.findOneUser({ where: { username } });

        if (res) {
          ctx.body = {
            code: 50101,
            message: 'username already exists',
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

  '/login': {
    /**
     * @method validateField
     * @param {*} ctx
     * @param {*} next
     * @returns
     */
    validateField: async (ctx, next) => {
      try {
        const { username, password } = ctx.request.body;

        const schema = joi.object({
          username: joi.string().required(),
          password: joi.string().required(),
        });

        const result = schema.validate({ username, password });

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
     * @method isUserExist
     * @param {*} ctx
     * @param {*} next
     */
    isUserExist: async (ctx, next) => {
      try {
        const { username } = ctx.request.body;

        const userInfo = await userServices.findOneUser({ where: { username } });

        ctx.request.body.userInfo = userInfo;

        if (!userInfo) {
          ctx.body = {
            code: 40400,
            message: `User not found`,
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
     * @method validatePassword
     * @param {*} ctx
     * @param {*} next
     */
    validatePassword: async (ctx, next) => {
      try {
        const { password, userInfo } = ctx.request.body;

        if (!bcrypt.compareSync(password, userInfo.password)) {
          ctx.body = {
            code: 40301,
            msg: 'Incorrect password',
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
