import { Sequelize } from 'sequelize';
import { log4jsError } from '../../utils/lo4js.js';

const sequelize = new Sequelize({
  dialect: 'mysql',
  timezone: '+08:00',
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  logging: false,
});

sequelize.authenticate().catch((error) => {
  log4jsError(error);
});

export default sequelize;
