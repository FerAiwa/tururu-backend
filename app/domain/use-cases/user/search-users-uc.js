import { searchUserQueryRules } from '../../../models/validators/account-rules';
import validate from '../../entities/validation-entity';
import accountRepository from '../../repositories/account-repository';

/** Contains different mapping methods for user objects */
const userMappers = {
  minInfo: (user) => {
    const {
      uuid, name, avatarUrl, score,
    } = user;
    return {
      uuid, name, avatarUrl, score,
    };
  },
};

/**
 * Performs a full-text search to recover users by name;
 * @param {string} q
 */
async function searchUsersUC(q) {
  await validate({ q }, searchUserQueryRules);
  const users = await accountRepository.searchUsers(q);

  return users.map(userMappers.minInfo);
}

export default searchUsersUC;
