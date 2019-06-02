import projectRepository from '../repositories/project-repository';
import { PermissionErr, NotFoundErr } from '../errors/customError';

/** Checks if the user has admin role in the project */
function isUserAdmin(uuid, { admins }) {
  return admins.includes(uuid);
}

/**
 * Checks if the project is accesible.
 * Project must be either public or have the user uuid in the users list.
 * */
function canUserRead(uuid, { users, isPrivate }) {
  if (isPrivate) return users.includes(uuid);
  return true;
}

/**
 * Check if the user got access to the project.
 * Throws a Permission err otherwise.
 * @param {string} uuid
 * @param {string} projectId
 */

async function checkReadPermissions(uuid, projectId) {
  const project = await projectRepository.findProjectById(projectId);

  if (!project) throw NotFoundErr();

  if (!canUserRead(uuid, project)) {
    throw PermissionErr('NOTUSER');
  }

  return null;
}

/**
 *  Check project existence and if the user has admin role.
 *  Throws a customErr if any path fails.
 * @param {string} uuid
 * @param {string} projectId
 */
async function checkAdminPermissions(uuid, projectId) {
  const project = await projectRepository.findProjectById(projectId);

  if (!project) throw NotFoundErr();

  if (!isUserAdmin(uuid, project)) {
    throw PermissionErr('NOTADMIN');
  }

  return null;
}


const permissionsEntity = {
  checkReadPermissions,
  checkAdminPermissions,
};

export default permissionsEntity;
