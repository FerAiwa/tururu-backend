import accountRepository from '../../repositories/account-repository';
import projectRepository from '../../repositories/project-repository';
import { NotFoundErr } from '../../errors/customError';

/**
 * Recovers basic info from the user and projects is member of.
 * @param {string} uuid User uuid
 */
async function getUserInfoUC(uuid) {
  const user = await accountRepository.getUser(uuid);
  if (!user) throw NotFoundErr('', 'user');

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
