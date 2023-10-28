import roleMenuModel from '../models/sequelize/model/role_menu.js';

export default {
  /**
   * @method create
   * @param {object} data
   * @returns
   */
  create: async (data) => {
    const res = await roleMenuModel.create(data);

    return res.dataValues;
  },

  /**
   * @method bulkCreate
   * @param {object} data
   * @returns
   */
  bulkCreate: async (data) => {
    const res = await roleMenuModel.bulkCreate(data);

    return res.map((item) => item.dataValues);
  },

  /**
   * @method findAll
   * @param {object} data
   * @returns
   */
  findAll: async (data) => {
    const res = await roleMenuModel.findAll(data);

    return res.map((item) => item.dataValues);
  },
};
