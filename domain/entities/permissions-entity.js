import projectRepository from '../repositories/project-repository';
import { PermissionErr, NotFoundErr } from '../errors/customError';

const genericUnhappyPaths = {
  notAllow: ['NOTALLOW', 'This project is private, contact the project admin to gain access.'],
  notAdmin: ['NOTADMIN', 'Only project admins can edit project resources.'],
};

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

async function checkReadUnhappyPaths(uuid, projectId) {
  const project = await projectRepository
    .findProjectById(projectId);
  if (!project) {
    throw NotFoundErr('project');
  }
  if (!canUserRead(uuid, project)) {
    throw PermissionErr('NOTADMIN');
  }
}

/**
 *  Check project existence and if the user has admin role.
 *  Throws a customErr if any path fails.
 * @param {string} uuid
 * @param {string} projectId
 */
async function checkAdminUnhappyPaths(uuid, projectId) {
  const project = await projectRepository
    .findProjectById(projectId);

  if (!project) {
    throw NotFoundErr('project');
  }
  if (!isUserAdmin(uuid, project)) {
    throw PermissionErr('NOTADMIN');
  }

  return null;
}


const permissionsEntity = {
  checkReadUnhappyPaths,
  checkAdminUnhappyPaths,
};

export default permissionsEntity;
