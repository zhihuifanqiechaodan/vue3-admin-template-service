import menuModel from '../models/sequelize/model/menu.js';

export default {
  /**
   * @method createRole
   * @param {object} data
   * @returns
   */
  createMenu: async (data) => {
    const res = await menuModel.create(data);

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

  /**
   * @method bulkCreate
   * @param {object} data
   * @returns
   */
  bulkCreate: async (data) => {
    const res = await menuModel.bulkCreate(data);

    return res.map((item) => item.dataValues);
  },
};
