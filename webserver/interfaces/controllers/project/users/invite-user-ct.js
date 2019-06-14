import { permissions } from '../../../../../domain/use-cases/project';
import invitationEmitter from '../../../../events/invitation-event';

/**
 * Sends a invitation to the project to a user.
 */
async function inviteUser(req, res, next) {
  const { uuid } = req.claims;
  const { projectId } = req.params;
  const { targetUser } = req.body;
  try {
    const invitation = await permissions.inviteUserUC({ uuid, projectId, targetUser });

    invitationEmitter.emit('invitationSent', targetUser, invitation);
    console.log('invitation sent fired');

    return res.status(201).send();
  } catch (e) {
    return next(e);
  }
}
export default inviteUser;
