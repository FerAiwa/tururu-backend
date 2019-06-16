import events from 'events';
import { getSocketId } from '../../domain/use-cases/connection';
import accountRepository from '../../domain/repositories/account-repository';
/**
 * Invitation is created. Controller fires event with user uuid.
 * Event: invitationSent,
 * Event: findUserSocket,
 *  - Connect?  emit: notifyUser(socketId)
 */
const invitationEmitter = new events.EventEmitter();

async function notifyUserInvitation(uuid, invitation) {
  try {
    const userConnection = await getSocketId(uuid);

    if (userConnection && userConnection.socketId) {
      // Destinatary socket
      const { socketId } = userConnection;

      // Sender
      const [authorData] = await accountRepository.getUserPublicData(invitation.author);

      const projectInvitationNotification = {
        ...invitation,
        type: 'invitation',
        author: authorData,
      };

      invitationEmitter.emit('sendInviteNotification', socketId, projectInvitationNotification);
    }
  } catch (e) {
    console.log('findusersocket err', e);
  }
}

invitationEmitter.on('invitationSent', notifyUserInvitation);

export default invitationEmitter;
