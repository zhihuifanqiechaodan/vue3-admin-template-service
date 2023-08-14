import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const Menu = sequelize.define(
  'Menu',
  {
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '菜单类型 0目录，1菜单',
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '当设置为隐藏时，将不显示当前菜单或目录',
    },
    alwaysShow: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '当设置为显示时，当前目录下只有一个菜单，那么将显示目录',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '目录或菜单名称',
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '菜单路径',
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '目录或菜单图标',
    },
    noCache: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '当设置为缓存时，将缓存当前页面的数据',
    },
    affix: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '如果设置为true，它则会固定在tags-view中(默认 false,只在经典布局中展示)',
    },
    breadcrumb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '当设置为隐藏时，将不会出现在面包屑中【仅在经典布局中】',
    },
    activeMenu: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '如果设置了path，侧边栏会高亮显示你设置的路径',
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '上级菜单或目录id',
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
  { tableName: 'menu' }
);

Menu.sync({ alter: true });

export default Menu;
