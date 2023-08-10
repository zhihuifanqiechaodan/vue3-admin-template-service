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
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: '用户权限',
      defaultValue: false,
    },
  },
  { tableName: 'user' }
);

User.sync({ alter: true });

export default User;
