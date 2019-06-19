import validate from '../../../entities/validation-entity';
import { setTaskStatusRules } from '../../../../models/validators/task-rules';
import taskRepository from '../../../repositories/task-repository';

/**
 * Updates task completedAt property value.
 * @rules
 * - Any user in the project can mark the task as done or undone.
 * - Status string must be valid. Only 'done' or 'undone' values accepted.
 */

async function setTaskStatusUC({ uuid, projectId, taskId, status }) {
  await validate({ _id: taskId, status }, setTaskStatusRules);

  let isTaskUpdated;

  if (status === 'done') {
    isTaskUpdated = await taskRepository.markTaskAsDone(uuid, projectId, taskId);
  }
  if (status === 'undone') {
    isTaskUpdated = await taskRepository.markTaskAsPending(uuid, projectId, taskId);
  }

  if (!isTaskUpdated) {
    throw new Error('unknown error updating task status');
  }

  return true;
}
export default setTaskStatusUC;
