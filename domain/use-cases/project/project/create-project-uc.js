import projectRepository from '../../../repositories/project-repository';

/** Returns a basic project presset */
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
 * Creates a new project and sends it to the project repository.
 * @param {Project} project Basic project data.
 */
async function createProjectUC(projectData) {
  const newProject = generateStarterProject(projectData);
  return projectRepository.createProject(newProject);
}

export default createProjectUC;
