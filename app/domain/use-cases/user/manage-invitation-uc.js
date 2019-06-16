import { projectInvitationAnswerRules } from '../../../models/validators/project-invitation-rules';
import projectRepository from '../../repositories/project-repository';
import accountRepository from '../../repositories/account-repository';
import validate from '../../entities/validation-entity';
/**
 * Consumes invitation from user´s account, and updates invitation state on the project.
 * If the user accepts, gains access to the project. Otherwise the invitation state is
 * set to rejected and the date is stored.
 * @param {string} uuid
 * @param {string} projectId
 * @param {string} action accept | reject
 * @rules
 * - User must be in the project invitation list.
 */
async function manageInvitationUC(uuid, projectId, action) {
  await validate({ project: projectId, action }, projectInvitationAnswerRules);
  let isProjectUpdate;

  if (action === 'accept') {
    isProjectUpdate = await projectRepository
      .confirmInvitation({ uuid, projectId });
  }

  if (action === 'decline') {
    isProjectUpdate = await projectRepository
      .rejectInvitation({ uuid, projectId });
  }

  if (!isProjectUpdate) {
    throw new Error('didnt update project'); // there was no invitation!
  }

  return accountRepository.deleteProjectInvitation({ uuid, projectId });
}

export default manageInvitationUC;
