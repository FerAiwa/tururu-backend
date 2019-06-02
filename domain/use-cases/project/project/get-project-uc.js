import projectRepo from '../../../repositories/project-repository';
import { NotFoundErr, PermissionErr } from '../../../errors/customError';

/**
 * Checks if the project is accesible.
 * Project must be either public or have the user uuid in the users list.
 * */
function isUserAllowed(uuid, { users, isPrivate }) {
  if (isPrivate) return users.includes(uuid);
  return true;
}

/**
 * Recovers a existing project
 * @param {string} uuid User uuidd
 * @param {string} projectId Project _id
 * @rules
 * - If the project is private, user must be in the access list.
 */

async function getProjectUC(uuid, projectId) {
  const project = await projectRepo.findProjectById(projectId);

  if (!project) throw NotFoundErr();

  if (!isUserAllowed(uuid, project)) throw PermissionErr('NOTUSER');

  return project;
}

export default getProjectUC;
