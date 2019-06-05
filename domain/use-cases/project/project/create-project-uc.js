import projectRepository from '../../../repositories/project-repository';
import accountRepository from '../../../repositories/account-repository';
/** Returns a basic project presset */
function generateStarterProject(uuid, { name, categories, startAt, deadline }) {
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
 * Stores a new project, and adds the generated id to the user´s project list.
 * @param {string} uuid User uuiud
 * @param {Project} project Basic project data.
 */
async function createProjectUC(uuid, projectData) {
  // add joi validation: Rules similar to sprint dates.
  const newProject = generateStarterProject(uuid, projectData);
  if (!newProject) throw new Error('invalid input');

  const { _id } = await projectRepository.createProject(newProject);

  await accountRepository.addProjectId(uuid, _id);

  return _id;
}

export default createProjectUC;
