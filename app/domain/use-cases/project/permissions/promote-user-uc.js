import { promotionRules } from '../../../../models/validators/project-invitation-rules';
import projectRepository from '../../../repositories/project-repository';
import { NotFoundErr, PermissionErr } from '../../../errors/customError';
import validate from '../../../entities/validation-entity';

/**
 * Gives admin privileges to a user. Requires owner role.
 * @param {string} uuid  User uuid
 * @param {string} projectId  Project id
 * @param {string} targetUuid   Target user uuid
 * @rules
 * - Request must come from owner.
 */
async function promoteUserUC({ uuid, projectId, targetUser }) {
  await validate({ project: projectId, targetUser }, promotionRules);


  const updateSuccess = await projectRepository.addAdmin({ uuid, projectId, targetUser });
  if (!updateSuccess) {
    const project = await projectRepository.findProjectById(projectId);

    if (!project) throw NotFoundErr();

    if (project.owner !== uuid) throw PermissionErr('NOTOWNER');

    if (!project.users.includes(targetUser)) throw NotFoundErr('The user is not in the project');

    throw new Error();
  }
  return true;
}

export default promoteUserUC;
