import { log4jsError } from './utils/lo4js.js';
import userServices from './services/user.js';
import bcrypt from 'bcryptjs';
import roleServices from './services/role.js';

export default {
  /**
   * @method initSuperAdministrator
   */
  initSuperAdministrator: async () => {
    try {
      const username = process.env.DEFAULT_USERNAME;

      const userInfo = await userServices.findOneUser({ where: { username } });

      if (!userInfo) {
        const password = process.env.DEFAULT_PASSWORD;

        const salt = bcrypt.genSaltSync(10);

        const hash = bcrypt.hashSync(password, salt);

        const { id } = await userServices.createUser({ username, password: hash });

        const { id: roleId } = await roleServices.createRole({
          name: '超级管理员',
          type: 1,
          creatorUserId: id,
        });

        await userServices.updateUser({ where: { username }, update: { roleId } });
      }
    } catch (error) {
      log4jsError(error);
    }
  },
};
