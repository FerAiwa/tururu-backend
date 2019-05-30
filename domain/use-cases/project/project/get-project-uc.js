import projectRepo from '../../../repositories/project-repository';
import { ProjectErr } from '../../../errors/customError';

const genericUnhappyPaths = {
  notFound: ['NOTFOUND', 'The requested project doesn´t exist.'],
  notAllow: ['NOTALLOW', 'This project is private, contact the project admin to gain access.'],
};

/**
 * Checks if the project is accesible.
 * Project must be either public or have the user uuid in the users list.
 * */
function isUserAllowed(uuid, { users, isPrivate }) {
  if (isPrivate) return users.includes(uuid);
  return true;
}

async function getProjectUC(uuid, projectId) {
  const { notFound, notAllow } = genericUnhappyPaths;
  const project = await projectRepo.findProjectById(projectId);

  if (!project) {
    throw ProjectErr(...notFound);
  }

  if (!isUserAllowed(uuid, project)) {
    throw ProjectErr(...notAllow);
  }

  return project;
}

export default getProjectUC;
