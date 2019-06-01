import taskRepository from '../../../repositories/task-repository';
import { PermissionErr } from '../../../errors/customError';

/**
 * Recover all the tasks from a project.
 * @param {string} uuid User uuidd
 * @param {string} projectId Project _id
 * @rules
 * - User must have access to the project.
 */
async function getTasksUC(uuid, projectId) {
  const tasks = await taskRepository.getTasks(uuid, projectId);
  if (!tasks) throw PermissionErr('PRIVATE');

  return tasks;
}

export default getTasksUC;
