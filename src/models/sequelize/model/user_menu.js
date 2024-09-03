import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const UserMenu = sequelize.define(
  'UserMenu',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '用户id',
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '菜单id',
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '创建用户id',
    },
    update_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '更新用户id',
    },
  },
  { tableName: 'user_menu' }
);

UserMenu.sync({ alter: true });

export default UserMenu;
