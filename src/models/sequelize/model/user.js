import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户名称',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户密码',
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '角色id, 0表示系统创建',
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
      comment: '创建用户id, 0表示系统创建',
    },
    updateUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '更新用户id',
    },
  },
  { tableName: 'user' }
);

User.sync({ alter: true });

export default User;
