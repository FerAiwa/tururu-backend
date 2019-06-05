import projectRepository from '../../../repositories/project-repository';
import accountRepository from '../../../repositories/account-repository';

/**
 * Recovers team basic information
 * @param {string} uuid
 * @param {string} projectId
 * @returns  {Object} [ {name, avatarUrl, uuid} ]
 * @rules
 * - User must be part of the project.
 */
async function getTeamUC(uuid, projectId) {
  const { users } = await projectRepository.getUsers(projectId);
  const teamInfo = await accountRepository.getUserPublicData(...users);
  return teamInfo;
}

export default getTeamUC;
