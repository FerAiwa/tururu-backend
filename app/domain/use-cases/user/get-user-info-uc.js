import accountRepository from '../../repositories/account-repository';
import projectRepository from '../../repositories/project-repository';

/**
 * Recovers basic info from the user and projects is member of.
 * @param {string} uuid User uuid
 */
async function getUserInfoUC(uuid) {
  const user = await accountRepository.getUser(uuid);
  const {
    name, email, createdAt, avatarUrl, projects, invitations,
  } = user;

  const userProjects = await projectRepository.getProjectInfo(...projects);

  return {
    name,
    email,
    avatarUrl,
    createdAt,
    projects: userProjects,
    invitations,
  };
}

export default getUserInfoUC;
