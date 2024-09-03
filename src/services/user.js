import userModel from '../models/sequelize/model/user.js';

export default {
  /**
   * @method findOneUser
   * @param {object} options
   * @param {object} options.where
   * @param {string[]} options.attributes
   * @returns
   */
  findOneUser: async ({ where, attributes } = {}) => {
    const options = { where };

    if (attributes?.length) options.attributes = attributes;

    const res = await userModel.findOne(options);

    return res?.dataValues || null;
  },

  /**
   * @method create
   * @param {object} options
   * @returns
   */
  create: async (options) => {
    const res = await userModel.create(options);

    return res.dataValues;
  },

  /**
   * @method updateUser
   * @param {object} options
   * @param {object} options.update
   * @param {object} options.where
   * @returns
   */
  updateUser: async ({ update, where }) => {
    return userModel.update(update, { where });
  },
};
