import connectionRepository from '../../repositories/connection-repository';

async function getSocketId(uuid) {
  return connectionRepository.getUserConnection(uuid);
}
export default getSocketId;
