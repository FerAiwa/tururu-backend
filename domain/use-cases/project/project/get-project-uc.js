import projectRepo from '../../../repositories/project-repository';
import CustomErr from '../../../errors/customError';

function isUserAllowed(uuid, { users, isPrivate }) {
  return (isPrivate && users.includes(uuid)) || true;
}

/**
 * Recovers a project from db
 * @param {string} uuid User unique identifier.
 * @param {string} projectId Project _id
 */
async function getProjectUC(uuid, projectId) {
  try {
    const project = await projectRepo.findProjectById(projectId);
    if (!project) {
      throw new CustomErr('NOTFOUND', 'The requested project doesn´t exist');
    }
    if (!isUserAllowed(uuid, project)) {
      throw new CustomErr('NOTALLOW', 'This project is private, contact the project admin to gain access');
    }
    return project;
  } catch (e) {
    e.context = 'getProject';
    throw (e);
  }
}

export default getProjectUC;
