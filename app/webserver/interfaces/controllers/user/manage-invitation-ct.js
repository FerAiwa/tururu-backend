import manageInvitationUC from '../../../../domain/use-cases/user/manage-invitation-uc';
import invitationEmitter from '../../../events/invitation-event';


/**
 * Manage user answer to project invitation.
 * @param {Object} req
 */
async function manageProjectInvitation(req, res, next) {
  const { uuid } = req.claims;
  const { projectId, answer } = req.query;
  console.log(projectId, answer);
  try {
    await manageInvitationUC(uuid, projectId, answer);

    if (answer === 'accept') {
      invitationEmitter.emit('invitationAccepted', uuid, projectId);
    }

    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}
export default manageProjectInvitation;
