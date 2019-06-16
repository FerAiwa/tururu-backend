import projectRepository from '../../../repositories/project-repository';
import { NotFoundErr, PermissionErr } from '../../../errors/customError';

/**
 * Gives admin privileges to a user. Requires owner role.
 * @param {string} uuid  User uuid
 * @param {string} projectId  Project id
 * @param {string} targetUuid   Target user uuid
 */
async function promoteUserUC({ uuid, projectId, targetUser }) {
  /* ### Path
    - Verify that the request comes from project owner.
    - Check if the target user exist.
    - Add the user to project admins-list.
 */
  // The repo tries to execute action based on previous conditions as truth
  const updateSuccess = await projectRepository.addAdmin({ uuid, projectId, targetUser });
  if (!updateSuccess) {
    /*   #### Unhappy Paths
      - 404. Project doesn´t exist.
      - 401. User is not project owner
     */
    const project = await projectRepository.findProjectById(projectId);

    if (!project) throw NotFoundErr();

    if (project.owner !== uuid) throw PermissionErr('NOTOWNER');

    if (!project.users.includes(targetUser)) throw NotFoundErr('The user is not in the project');

    throw new Error();
  }
  return true;
}

export default promoteUserUC;
