import { projectInvitationRules } from '../../../../models/validators/project-invitation-rules';
import accountRepository from '../../../repositories/account-repository';
import projectRepository from '../../../repositories/project-repository';
import permissionsEntity from '../../../entities/permissions-entity';
import validate from '../../../entities/validation-entity';
import { NotFoundErr, ActionNotAllowErr } from '../../../errors/customError';

/**
 * Gives a user access to the project.
 * @param {string} uuid  User uuid
 * @param {string} projectId  Project id
 * @param {string} targetUuid   Target user uuid
 * @rules
 * - The request must come from project admin.
 * - User must exist.
 */
async function addUserUC({ uuid, projectId, targetUser }) {
  await validate({ project: projectId, sendTo: targetUser }, projectInvitationRules);

  if (uuid === targetUser) {
    throw ActionNotAllowErr('Self half five? You can´t invite youself to a project!'); // 403
  }

  const invitation = await projectRepository
    .generateInvitation({ uuid, projectId, targetUser });
  if (!invitation) {
    // user was already in the project
    // the request comes from someone with no admin role.
    await permissionsEntity.checkAdminPermissions(uuid, projectId);
  }

  const isUserUpdated = await accountRepository
    .addProjectInvitation(targetUser, invitation);

  if (!isUserUpdated) {
    throw ActionNotAllowErr('The user is already in the project...');
  }

  return invitation;
}

export default addUserUC;
