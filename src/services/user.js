import userModel from '../models/sequelize/model/user.js';
import { log4jsError } from '../utils/lo4js.js';

export default {
  /**
   * @method findOneUser
   * @param {object} options
   * @param {object} options.where
   * @param {string[]} options.attributes
   * @returns
   */
  findOneUser: async ({ where, attributes } = {}) => {
    try {
      const options = { where };

      if (attributes?.length) options.attributes = attributes;

      const res = await userModel.findOne(options);

      return res?.dataValues || null;
    } catch (error) {
      log4jsError(error);
    }
  },

  /**
   * @method createUser
   * @param {object} options
   * @param {string} options.username
   * @param {string} options.password
   * @returns
   */
  createUser: async ({ username, password }) => {
    try {
      const res = await userModel.create({ username, password });

      return res.dataValues;
    } catch (error) {
      log4jsError(error);
    }
  },

  /**
   * @method updateUser
   * @param {object} options
   * @param {object} options.update
   * @param {object} options.where
   * @returns
   */
  updateUser: async ({ update, where }) => {
    try {
      return userModel.update(update, { where });
    } catch (error) {
      log4jsError(error);
    }
  },
};
