import connectionRepository from '../../repositories/connection-repository';

async function deleteConnection(uuid) {
  return connectionRepository.deleteUserConnection(uuid);
}
export default deleteConnection;
