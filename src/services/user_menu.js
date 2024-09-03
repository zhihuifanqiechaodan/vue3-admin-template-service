import userMenuModel from '../models/sequelize/model/user_menu.js';

export default {
  /**
   * @method create
   * @param {object} data
   * @returns
   */
  create: async (data) => {
    const res = await userMenuModel.create(data);

    return res.dataValues;
  },
  /**
   * @method findAll
   * @param {object} data
   * @returns
   */
  findAll: async ({ where } = {}) => {
    const options = { where };
    const res = await userMenuModel.findAll(options);
    return res.map((item) => item.dataValues);
  },

  /**
   * @method destroy
   * @param {object} data
   * @returns
   */
  destroy: async ({ where } = {}) => {
    const options = { where };
    const deletedCount = await userMenuModel.destroy(options);
    return deletedCount;
  },
  /**
   * @method bulkCreate
   * @param {object} data
   * @returns
   */
  bulkCreate: async (data) => {
    const res = await userMenuModel.bulkCreate(data);
    return res.map((item) => item.dataValues);
  },
};
