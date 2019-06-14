/* eslint-disable no-console */
import socketIO from 'socket.io';
import socketAuth from '../middlewares/socket-auth';

import invitationEmitter from './invitation-event';
import { storeConnection, deleteConnection } from '../../domain/use-cases/connection';

/**
 * @param {socketIO.Server} io The server instance socketIO is binded to
 */
export default function (io) {
  // My Node events
  invitationEmitter.on('notifyInvitation', (socketId, invitation) => {
    console.log('client-socket', socketId);
    io.to(socketId).emit('notification', invitation);
  });

  io.use(socketAuth);
  io.on('connection', (client) => {
    const { uuid } = client.claims;
    // Store the uuid associated with socketId, to deliver change notifications later.
    storeConnection(uuid, client.id)
      .then(() => console.log('stored'))
      .catch(() => client.disconnect());

    client.on('getUserPublicData', (userUuid) => {
    });

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
