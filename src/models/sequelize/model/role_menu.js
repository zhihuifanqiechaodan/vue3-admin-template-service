import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const RoleMenu = sequelize.define(
  'RoleMenu',
  {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '角色id',
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '菜单id',
    },
    deleteStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '删除状态',
    },
    creatorUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '创建用户id',
    },
    updateUserId: {
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
