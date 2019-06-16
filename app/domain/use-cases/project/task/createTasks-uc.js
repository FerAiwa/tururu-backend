import { Task } from '../../../../models';
import taskRepository from '../../../repositories/task-repository';
import { PermissionErr } from '../../../errors/customError';

/**
 * Adds tasks to the project list.
 * @param {string} uuid  User uuid
 * @param {string} projectId  Project id
 * @param {Object[]} tasks Array of tasks basic data.
 * @return {Promise<Task[]>} task[]
 * @rules
 * - Requires user to have admin permissions.
 */
async function createTasksUC({ uuid, projectId, tasks }) {
  const newTasks = tasks
    .map(task => new Task(task));

  const updateSuccess = await taskRepository
    .addTasks({ uuid, projectId, newTasks });

  if (!updateSuccess) throw PermissionErr('NOTADMIN');

  return newTasks;
}

export default createTasksUC;
