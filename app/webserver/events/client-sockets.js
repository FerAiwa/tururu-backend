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
  invitationEmitter.on('sendInviteNotification', (clientSocketId, invitation) => {
    io.to(clientSocketId).emit('notification', invitation);
  });

  // type: 'member state',
  // user: authorData,
  // message: 'joined the team',
  invitationEmitter.on('notifyNewTeamMember', (projectId, teamNotification) => {
    io.to(projectId).emit('notifyNewTeamMember', teamNotification);
  });


  io.use(socketAuth);
  io.on('connection', (client) => {
    console.log('client connected');
    const { uuid } = client.claims;
    // Store the uuid associated with socketId, to deliver change notifications later.
    storeConnection(uuid, client.id)
      .then(() => console.log('stored'))
      .catch(() => client.disconnect());

    client.on('joinProjectRoom', (projectId) => {
      if (true) {
        console.log(`user ${uuid} socket ${client.id} joined room ${projectId}`);
        client.leaveAll();
        client.join([client.id, projectId]);
        // client.broadcast.to(projectId)
        // .emit('connectionNotification', { uuid, message: `${uuid} connected!` });
      }
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

    // ERROR MANAGER
    io.on('error', (err) => {
      console.log('error manager', err);
    });
  });
}
