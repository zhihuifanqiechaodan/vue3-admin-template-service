import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const RoleMenu = sequelize.define(
  'RoleMenu',
  {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '角色id',
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '菜单id',
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '创建者id',
    },
    updateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '创建者id',
    },
  },
  { tableName: 'role_menu' }
);

RoleMenu.sync({ alter: true });

export default RoleMenu;
