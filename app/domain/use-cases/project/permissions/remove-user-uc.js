import projectRepository from '../../../repositories/project-repository';
import { NotFoundErr, PermissionErr, ActionNotAllowErr } from '../../../errors/customError';

function getUserGreatestRole(uuid, project) {
  if (project.owner === uuid) return 'owner';
  if (project.admins.includes(uuid)) return 'admin';
  if (project.users.includes(uuid)) return 'user';
  return null;
}

/**
 * Removes user from the project.
 * @param {string} uuid  User uuid
 * @param {string} projectId  Project id
 * @param {string} targetUuid   Target user uuid
 * @rules
 * - Request must come from a user with greater role than the target.
 * - owner > admin > user
 * @exceptions
  * - User can remove itself
  * - Project owner can´t leave the project.
 */
async function removeUserUC({ uuid, projectId, targetUser }) {
  const project = await projectRepository.findProjectById(projectId);
  if (!project) throw NotFoundErr();

  const commander = getUserGreatestRole(uuid, project);
  const target = getUserGreatestRole(targetUser, project);

  const isSelfTarget = uuid === targetUser;
  const isOwnerRequest = commander === 'owner';
  const isAdminRequest = commander === 'admin';

  // Resolve remove self first to avoid extra nesting with self-cases
  if (isSelfTarget && !isOwnerRequest) {
    return projectRepository.removeUser({ uuid, projectId });
  }
  if (!isAdminRequest || !isOwnerRequest) {
    throw PermissionErr('NOTADMIN');
  }
  if (target === 'owner') {
    throw ActionNotAllowErr('A owner can´t be removed from the project. Remove the project instead.');
  }
  if (commander === 'admin' && target === 'admin') {
    throw PermissionErr('NOTOWNER'); // only owner can add/remove admins
  }

  return projectRepository.removeUser({ targetUser, projectId });
}

export default removeUserUC;
