import accountRepository from '../../repositories/account-repository';
import projectRepository from '../../repositories/project-repository';

/**
 * Recovers basic info from the projects the user is member of.
 * @param {string} uuid User uuid
 */
async function getProjectsUC(uuid) {
  // 1. Recover user info from accountRepo and get projects ids
  const user = await accountRepository.getUser(uuid);
  // 2. Recover projectInfo from projectRepo
  const { projects } = user;
  return projectRepository.getProjectInfo(...projects);
}

export default getProjectsUC;
