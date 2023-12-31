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
          isAuth,
          buttonPermissions = [],
        } = ctx.request.body;

        var result;

        if (type === 0) {
          result = joi
            .object({
              type: joi.number().required(),
              layout: joi.string().required(),
              hidden: joi.boolean().required(),
              alwaysShow: joi.boolean().required(),
              title: joi.string().required(),
              icon: joi.string().required(),
              isAuth: joi.boolean().required(),
            })
            .validate({
              type,
              layout,
              hidden,
              alwaysShow,
              title,
              icon,
              isAuth,
            });
        } else if (type === 1) {
          result = joi
            .object({
              type: joi.number().required(),
              hidden: joi.boolean().required(),
              title: joi.string().required(),
              path: joi.string().required(),
              icon: joi.string().required(),
              noCache: joi.boolean().required(),
              affix: joi.boolean().required(),
              breadcrumb: joi.boolean().required(),
              activeMenu: joi.string().allow('').required(),
              isAuth: joi.boolean().required(),
              buttonPermissions: joi
                .array()
                .items(
                  joi.object({
                    label: joi.string().required(),
                    value: joi.number().required(),
                  })
                )
                .empty(),
            })
            .validate({
              type,
              hidden,
              title,
              path,
              icon,
              noCache,
              affix,
              breadcrumb,
              activeMenu,
              isAuth,
              buttonPermissions,
            });
        }

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

        const opOr = [];

        path && opOr.push({ path });

        title && opOr.push({ title });

        if (await menuServices.findOneMenu({ where: { [Op.or]: opOr } })) {
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
  '/update_sort': {
    /**
     * @method validateField
     * @param {*} ctx
     * @param {*} next
     * @returns
     */
    validateField: async (ctx, next) => {
      try {
        const { menuList } = ctx.request.body;

        const { error } = joi
          .array()
          .items(
            joi.object({
              id: joi.number().required(),
              sortIndex: joi.number().required(),
              parentId: joi.number().required(),
            })
          )
          .validate(
            menuList.map((item) => {
              return { id: item.id, sortIndex: item.sortIndex, parentId: item.parentId };
            })
          );

        if (error) {
          ctx.body = {
            code: 40000,
            message: error.message,
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
  '/update': {
    /**
     * @method validateField
     * @param {*} ctx
     * @param {*} next
     * @returns
     */
    validateField: async (ctx, next) => {
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
          buttonPermissions = [],
        } = ctx.request.body;

        let error;

        if (type === 0) {
          error = joi
            .object({
              id: joi.number().required(),
              type: joi.number().required(),
              layout: joi.string().required(),
              hidden: joi.boolean().required(),
              alwaysShow: joi.boolean().required(),
              title: joi.string().required(),
              icon: joi.string().required(),
              isAuth: joi.boolean().required(),
            })
            .validate({
              id,
              type,
              layout,
              hidden,
              alwaysShow,
              title,
              icon,
              isAuth,
            }).error;
        } else if (type === 1) {
          joi
            .object({
              id: joi.number().required(),
              type: joi.number().required(),
              hidden: joi.boolean().required(),
              title: joi.string().required(),
              path: joi.string().required(),
              icon: joi.string().required(),
              noCache: joi.boolean().required(),
              affix: joi.boolean().required(),
              breadcrumb: joi.boolean().required(),
              activeMenu: joi.string().allow('').required(),
              isAuth: joi.boolean().required(),
              buttonPermissions: joi
                .array()
                .items(
                  joi.object({
                    label: joi.string().required(),
                    value: joi.number().required(),
                  })
                )
                .empty(),
            })
            .validate({
              id,
              type,
              hidden,
              title,
              path,
              icon,
              noCache,
              affix,
              breadcrumb,
              activeMenu,
              isAuth,
              buttonPermissions,
            }).error;
        }

        if (error) {
          ctx.body = {
            code: 40000,
            message: error.message,
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
        const { id, path, title } = ctx.request.body;

        const opOr = [];

        path && opOr.push({ path });

        title && opOr.push({ title });

        if (await menuServices.findOneMenu({ where: { [Op.or]: opOr, id: { [Op.ne]: id } } })) {
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
