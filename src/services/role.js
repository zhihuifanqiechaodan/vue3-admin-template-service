import roleModel from '../models/sequelize/model/role.js';

export default {
  /**
   * @method findOneRole
   * @param {object} options
   * @param {object} options.where
   * @param {string[]} options.attributes
   * @returns
   */
  findOneRole: async ({ where, attributes } = {}) => {
    const options = { where };

    if (attributes?.length) options.attributes = attributes;

    const res = await roleModel.findOne(options);

    return res?.dataValues || null;
  },

  /**
   * @method createRole
   * @param {object} options
   * @returns
   */
  createRole: async (options) => {
    const res = await roleModel.create(options);

    return res.dataValues;
  },

  /**
   * @method updateRole
   * @param {object} options
   * @param {object} options.update
   * @param {object} options.where
   * @returns
   */
  updateRole: async ({ update, where }) => {
    return roleModel.update(update, { where });
  },

  /**
   * @method findAll
   * @param {object} options
   * @returns
   */
  findAll: async (options) => {
    const res = await roleModel.findAll(options);

    return res.map((item) => item.dataValues);
  },
};
