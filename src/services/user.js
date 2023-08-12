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
   * @method createUser
   * @param {object} options
   * @param {string} options.username
   * @param {string} options.password
   * @param {string} options.roleId
   * @param {string} options.creatorUserId
   * @param {string} options.updateUserId
   * @returns
   */
  createUser: async ({ username, password, roleId, creatorUserId, updateUserId }) => {
    const res = await userModel.create({ username, password, roleId, creatorUserId, updateUserId });

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
