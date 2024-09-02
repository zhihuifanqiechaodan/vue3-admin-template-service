import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const RoleMenu = sequelize.define(
  'RoleMenu',
  {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '角色id',
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
  { tableName: 'role_menu' }
);

RoleMenu.sync({ alter: true });

export default RoleMenu;
