import { projectCreationRules } from '../../../../models/validators/project-rules';
import validate from '../../../entities/validation-entity';
import projectRepository from '../../../repositories/project-repository';
import sprintRepository from '../../../repositories/sprint-repository';
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
 * Creates a new project, and adds the generated id to the user´s project list.
 * @param {string} uuid User uuiud
 * @param {Object} projectData Basic project data. { name, startAt, deadline }
 * @rules
 * - Projects must have at least 1 day duration.
 * - Default project sprint duration is 1 week.
 */
async function createProjectUC(uuid, projectConfig) {
  await validate(projectConfig, projectCreationRules);

  const projectPresset = generateStarterProject(uuid, projectConfig);

  const { _id } = await projectRepository.createProject(projectPresset);

  await sprintRepository.createSprint(uuid, _id);

  await accountRepository.addProjectIdToUserAccount(uuid, _id);

  return _id; // location
}

export default createProjectUC;
