import projectRepository from '../../../repositories/project-repository';
import accountRepository from '../../../repositories/account-repository';

function getUserRole(uuid, project) {
  if (project.admins.includes(uuid)) return 'admin';
  if (project.owner === uuid) return 'owner';
  if (project.users.includes(uuid)) return 'user';
  return null;
}

/**
 * Recovers team users basic info
 * @param {string} uuid
 * @param {string} projectId
 * @returns  {Object} [ {name, avatarUrl, uuid, role} ]
 */
async function getTeamUC(uuid, projectId) {
  const project = await projectRepository.findProjectById(projectId);
  const { users } = project;

  const team = await accountRepository.getUserPublicData(...users);

  const teamWithRoles = team.map(member => (
    {
      ...member,
      role: getUserRole(member.uuid, project),
    }));

  return teamWithRoles;
}

export default getTeamUC;
