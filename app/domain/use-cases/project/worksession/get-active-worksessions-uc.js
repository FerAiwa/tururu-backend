import { projectIdRule } from '../../../../models/validators/project-rules';
import projectRepository from '../../../repositories/project-repository';
import { PermissionErr } from '../../../errors/customError';
import validate from '../../../entities/validation-entity';

/**
 * Combines activeSessions with tasks based on the shared _id
 * @param {Object[]} tasks
 * @param {Object[]} activeSessions
 * @returns {Object} {_id, startedAt, uuid, avatarUrl, user name }
 *
 */
function getActiveSessionsTasks(tasks, activeSessions) {
  const activeSessionsTasks = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const session of activeSessions) {
    const taskDetails = tasks.find(task => task._id.toString() === session.taskId.toString());
    if (taskDetails) {
      const user = { name: session.name, avatarUrl: session.avatarUrl };
      activeSessionsTasks.push({ ...taskDetails, user });
    }
  }
  return activeSessionsTasks;
}

/**
 * Gives all active sessions with user´s view data
 */
async function getActiveWorkSessionsUC(uuid, projectId) {
  await validate({ projectId }, projectIdRule);

  const project = await projectRepository.findProjectById(projectId);

  const { tasks, activeSessions, users } = project;
  if (!users.includes(uuid)) {
    throw PermissionErr('NOTUSER');
  }

  return getActiveSessionsTasks(tasks, activeSessions);
}

export default getActiveWorkSessionsUC;
