import projectRepo from '../../../repositories/project-repository';

/**
 * Creates a new project
 * @param {Project} project Basic project data.
 */
async function createProjectUC({ uuid, name, categories, startAt, deadline }) {
  try {
    const newProject = {
      name,
      categories: categories || [],
      uuid,
      admins: [uuid],
      users: [uuid],
      tasks: [],
      createdAt: Date.now(),
      startAt: startAt || null,
      deadline: deadline || null,
    };
    console.log(newProject);
    return projectRepo.createProject(newProject);
  } catch (e) {
    throw (e);
  }
}

export default createProjectUC;
