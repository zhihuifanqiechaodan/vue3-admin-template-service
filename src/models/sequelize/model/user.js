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
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '角色id',
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '用户状态 1：正常 0：禁用',
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
  { tableName: 'user' }
);

User.sync({ alter: true });

export default User;
