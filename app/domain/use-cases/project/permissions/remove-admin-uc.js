import { promotionRules } from '../../../../models/validators/project-invitation-rules';
import projectRepository from '../../../repositories/project-repository';
import { NotFoundErr, PermissionErr, ActionNotAllowErr } from '../../../errors/customError';
import validate from '../../../entities/validation-entity';

/**
 * Revokes admin privileges from user. Requires owner role.
 * @param {string} uuid  User uuid
 * @param {string} projectId  Project id
 * @param {string} targetUuid   Target user uuid
 * @rules
 * - Request must come from projec towner.
 */
async function removeAdminUC({ uuid, projectId, targetUser }) {
  await validate({ project: projectId, targetUser }, promotionRules);

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
