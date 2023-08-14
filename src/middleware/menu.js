import { log4jsError } from '../utils/lo4js.js';
import joi from 'joi';
import menuServices from '../services/menu.js';
import { Op } from 'sequelize';

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
        const { type, hidden, alwaysShow, title, icon, path, noCache, affix, breadcrumb, activeMenu } =
          ctx.request.body;

        const schema = joi.object({
          type: joi.number().required(),
          hidden: joi.boolean().required(),
          alwaysShow: joi.boolean(),
          title: joi.string().required(),
          path: joi.string(),
          icon: joi.string().required(),
          noCache: joi.boolean(),
          affix: joi.boolean(),
          breadcrumb: joi.boolean(),
          activeMenu: joi.string(),
          parentId: joi.number(),
        });

        const result = schema.validate({
          type,
          hidden,
          alwaysShow,
          title,
          icon,
          path,
          noCache,
          affix,
          breadcrumb,
          activeMenu,
        });

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
    isMenuExist: async (ctx, next) => {
      try {
        const { path, title } = ctx.request.body;

        if (await menuServices.findOneMenu({ where: { [Op.or]: [{ path }, { title }] } })) {
          ctx.body = {
            code: 40900,
            message: `path or title already exists`,
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
