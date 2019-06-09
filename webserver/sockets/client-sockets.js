/* eslint-disable no-console */
import socketIO from 'socket.io';

/** Event flow.
 * Front:
 * - User GET /project/:id
 * - event 'joinProjectRoom'
 * Back :
 * - listener: 'joinProjectRoom
 * - validation: isProjectUser && projectId exists
 * - .join(projectId)
 * - client.broadcast.to(projectId)
 */
/**
 * @param {socketIO.Server} io The server instance socketIO is binded to
 */
export default function (io) {
  io.on('connection', (client) => {
    // Client event listeners
    client.on('joinProjectRoom', (userData) => {
      const { uuid, projectId } = userData;
      // is user allowed?
      if (true) {
        console.log('user joined room', userData);
        client.join(projectId);
        client.broadcast.to(projectId).emit('connectionNotification', { uuid, message: `${uuid} connected!` });
        // console.log(client.rooms);
      }
    });

    client.on('connectProject', (user) => {
      client.broadcast.emit('connectionNotification', { id: client.id, user, message: 'I am groot' });
    });

    client.on('workSessionStarted', (workSession) => {
      console.log('user started worksession');
      client.broadcast.emit('workSessionStartTeamNotify', workSession);
    });

    client.on('workSessionEnded', (workSession) => {
      client.broadcast.to('12345').emit('notifyWorkSessionEnd', workSession);
    });

    client.on('disconnect', (user) => {
      // notify userleft.
      // user was working?
      // system close worksession
    });

    client.on('sendMessage', (data) => {
      const { message } = data;
      client.broadcast.emit('teamMemberMessage', message);
    });
  });
}
