import projectRepository from '../../../repositories/project-repository';
import { NotFoundErr, PermissionErr } from '../../../errors/customError';

/**
 * Gives a user access to the project. Requires admin role.
 * @param {string} uuid  User uuid
 * @param {string} projectId  Project id
 * @param {string} targetUuid   Target user uuid
 */
async function addUserUC({ uuid, projectId, targetUser }) {
  /* ### Path
    - Verify that the request comes from a project admin.
    - Check if the target user exist. (?)
    - Add the user to project user-list.
  */
  // The repo tries to execute action based on previous conditions as truth
  const updateSuccess = await projectRepository.addUser({ uuid, projectId, targetUser });
  if (!updateSuccess) {
    /*   #### Unhappy Paths
      - 404. Project doesn´t exist.
      - 401. User is not project admin
     */
    const project = await projectRepository.findProjectById(projectId);

    if (!project) throw NotFoundErr();

    if (!project.admins.includes(uuid)) throw PermissionErr('NOTADMIN');

    throw new Error();
  }
  return true;
}

export default addUserUC;
