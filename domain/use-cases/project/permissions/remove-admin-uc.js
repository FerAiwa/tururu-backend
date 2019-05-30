import projectRepository from '../../../repositories/project-repository';
import { NotFoundErr, PermissionErr, ActionNotAllowErr } from '../../../errors/customError';

/**
 * Revokes admin privileges from user. Requires owner role.
 * @param {string} uuid  User uuid
 * @param {string} projectId  Project id
 * @param {string} targetUuid   Target user uuid
 */
async function removeAdminUC({ uuid, projectId, targetUser }) {
  /* ### Paths
    - Verify that the request comes from the project owner.
    - Remove admin from the admins list.
    */
  const project = await projectRepository.findProjectById(projectId);
  if (!project) throw NotFoundErr();

  const isOwnerRequest = project.owner === uuid;
  if (!isOwnerRequest) throw PermissionErr('NOTOWNER');

  if (isOwnerRequest && targetUser === uuid) {
    throw ActionNotAllowErr('A owner must keep the admin role in the project.');
  }

  return projectRepository.removeAdmin({ uuid, projectId, targetUser });
}
export default removeAdminUC;
