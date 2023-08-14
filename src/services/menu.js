import menuModel from '../models/sequelize/model/menu.js';

export default {
  /**
   * @method createRole
   * @param {object} options
   * @param {number} options.type
   * @param {number} options.layout
   * @param {string} options.title
   * @param {string} options.icon
   * @param {boolean} options.hidden
   * @param {boolean} options.alwaysShow
   * @param {boolean} options.noCache
   * @param {boolean} options.breadcrumb
   * @param {string} options.path
   * @param {string} options.parentId
   * @param {string} options.creatorId
   * @param {string} options.updateId
   * @returns
   */
  createMenu: async ({
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
    creatorUserId,
    updateUserId,
  }) => {
    const res = await menuModel.create({
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
      creatorUserId,
      updateUserId,
    });

    return res.dataValues;
  },

  /**
   * @method updateMenu
   * @param {object} options
   * @param {object} options.update
   * @param {object} options.where
   * @returns
   */
  updateMenu: async ({ update, where }) => {
    return menuModel.update(update, { where });
  },

  /**
   * @method findOneMenu
   * @param {object} options
   * @param {object} options.where
   * @param {string[]} options.attributes
   * @returns
   */
  findOneMenu: async ({ where, attributes } = {}) => {
    const options = { where };

    if (attributes?.length) options.attributes = attributes;

    const res = await menuModel.findOne(options);

    return res?.dataValues || null;
  },

  /**
   * @method findAllMenu
   * @param {object} options
   * @param {object} options.where
   * @param {string[]} options.attributes
   * @returns
   */
  findAllMenu: async ({ where, attributes } = {}) => {
    const options = { where };

    if (attributes?.length) options.attributes = attributes;

    const res = await menuModel.findAll(options);

    return res.map((item) => item.dataValues);
  },
};
