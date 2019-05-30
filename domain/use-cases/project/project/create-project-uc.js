import projectRepository from '../../../repositories/project-repository';

/** Returns a basic project setup */
function generateStarterProject({ uuid, name, categories, startAt, deadline }) {
  return {
    name,
    categories: categories || [],
    owner: uuid,
    admins: [uuid],
    users: [uuid],
    tasks: [],
    createdAt: Date.now(),
    startAt: startAt || null,
    deadline: deadline || null,
  };
}

/**
 * Creates a new project
 * @param {Project} project Basic project data.
 */
async function createProjectUC(projectData) {
  try {
    const newProject = generateStarterProject(projectData);
    return projectRepository.createProject(newProject);
  } catch (e) {
    throw (e);
  }
}

export default createProjectUC;
