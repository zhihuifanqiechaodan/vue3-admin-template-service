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
   * @param {string} options.name
   * @param {string} options.type
   * @param {string} options.creatorUserId
   * @param {string} options.updateUserId
   * @returns
   */
  createRole: async ({ name, type, creatorUserId, updateUserId }) => {
    const res = await roleModel.create({ name, type, creatorUserId, updateUserId });

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
};
