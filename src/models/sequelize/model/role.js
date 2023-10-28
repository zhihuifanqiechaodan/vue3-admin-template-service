import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const Role = sequelize.define(
  'Role',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '角色名称',
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '角色类型 0普通角色，1超级管理员',
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '状态',
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
      comment: '更新用户id',
      defaultValue: 0,
    },
  },
  { tableName: 'role' }
);

Role.sync({ alter: true });

export default Role;
