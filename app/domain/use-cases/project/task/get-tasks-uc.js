import { projectIdRule } from '../../../../models/validators/project-rules';
import taskRepository from '../../../repositories/task-repository';
import { PermissionErr } from '../../../errors/customError';
import validate from '../../../entities/validation-entity';
/**
 * Recover all the tasks from a project.
 * @param {string} uuid User uuidd
 * @param {string} projectId Project _id
 * @rules
 * - User must have access to the project.
 */
async function getTasksUC(uuid, projectId) {
  await validate({ projectId }, projectIdRule);

  const tasks = await taskRepository.getTasks(uuid, projectId);
  if (!tasks) throw PermissionErr('NOTUSER');

  return tasks;
}

export default getTasksUC;
