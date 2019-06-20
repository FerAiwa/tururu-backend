import { createWorkSessionRules } from '../../../../models/validators/worksession-rules';
import accountRepository from '../../../repositories/account-repository';
import workSessionRepository from '../../../repositories/worksession-repository';
import permissionsEntity from '../../../entities/permissions-entity';
import validate from '../../../entities/validation-entity';

/**
 * @description When user starts or resumes a task, a new work session will be created
 * and stored, returning the _id for the new instance.
 * The pair of this function is stopWorkSession()
 * @returns {String} Worksession id
 * @rules
 * - User can just have one worksession active.
 * - A task can´t be used by two users at the same time.
 */
async function createWorkSessionUC(uuid, projectId, taskId) {
  await validate({ taskId, projectId }, createWorkSessionRules);

  const [userData] = await accountRepository.getUserPublicData(uuid);

  const workSession = await workSessionRepository
    .createWorkSession(userData, projectId, taskId);

  if (!workSession) {
    await permissionsEntity.checkReadPermissions(uuid, projectId);
    throw new Error('unknown');
  }

  return workSession;
}

export default createWorkSessionUC;
