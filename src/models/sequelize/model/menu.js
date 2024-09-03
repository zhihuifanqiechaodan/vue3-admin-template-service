import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const Menu = sequelize.define(
  'Menu',
  {
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '菜单类型 0目录，1菜单，2按钮',
    },
    layout: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '布局路由名称',
    },
    auth: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '0：false 1：true（当设置为false时，将不认证权限直接返回当前菜单或目录)',
    },
    catalogue_path: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '目录路径',
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '0：显示 1：隐藏 （当设置为隐藏时，将不显示当前菜单或目录)',
    },
    show: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '0：隐藏 1：显示 （当设置为显示时，当前目录下只有一个菜单，那么将显示目录',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '目录 ｜ 菜单 | 按钮名称',
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
    cache: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '0：不缓存  1：缓存 （当设置为缓存时，将缓存当前页面)',
    },
    affix: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '0：false 1：true （如果设置为true，它则会固定在tags-view中(默认 false,只在经典布局中展示)',
    },
    breadcrumb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: '0：隐藏 1：显示 （当设置为隐藏时，将不会出现在面包屑中【仅在经典布局中】',
    },
    active_menu: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '如果设置了path，侧边栏会高亮显示你设置的路径',
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '排序',
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '目录id',
    },
    button_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '按钮id',
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
  { tableName: 'menu' }
);

Menu.sync({ alter: true });

export default Menu;
