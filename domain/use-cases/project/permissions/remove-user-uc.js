import projectRepository from '../../../repositories/project-repository';
import { NotFoundErr, PermissionErr, ActionNotAllowErr } from '../../../errors/customError';

/**
 * Removes user from the project. Requires at least admin role.
 * @param {string} uuid  User uuid
 * @param {string} projectId  Project id
 * @param {string} targetUuid   Target user uuid
 */
async function removeUserUC({ uuid, projectId, targetUser }) {
  /* ### Paths
    - Verify that the request comes from a project admin.
    - Verify that target user has lower rank than the requester. (owner>admin>user)
    - Remove user from the access list.
    */
  const project = await projectRepository.findProjectById(projectId);
  if (!project) throw NotFoundErr();

  const isOwnerRequest = project.owner === uuid;
  const isAdminRequest = project.admins.includes(uuid);
  const isAdminTarget = project.admins.includes(targetUser);

  if (!isAdminRequest) throw PermissionErr('NOTADMIN');

  if (isAdminTarget && !isOwnerRequest) throw PermissionErr('NOTOWNER');

  if (isOwnerRequest && targetUser === uuid) {
    throw ActionNotAllowErr('A owner can´t be removed from the project. Remove the project instead.');
  }

  return projectRepository.removeUser({ uuid, projectId, targetUser });
}

export default removeUserUC;
