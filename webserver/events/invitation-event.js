import events from 'events';
import { getSocketId } from '../../domain/use-cases/connection';
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
      const { socketId } = userConnection;
      invitationEmitter.emit('notifyInvitation', socketId, invitation);
      console.log('notifyInvitation fired');
    } else {
      console.log('user wasnt connected, no need to notificate');
    }
  } catch (e) {
    console.log('findusersocket err', e);
  }
}


invitationEmitter.on('invitationSent', notifyUserInvitation);

export default invitationEmitter;
