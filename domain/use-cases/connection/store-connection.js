import connectionRepository from '../../repositories/connection-repository';

async function storeConnection(uuid, socketId) {
  return connectionRepository.storeUserConnection(uuid, socketId);
}
export default storeConnection;
