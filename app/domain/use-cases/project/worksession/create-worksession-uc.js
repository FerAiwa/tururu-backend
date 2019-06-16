import Joi from 'joi';
import accountRepository from '../../../repositories/account-repository';
import workSessionRepository from '../../../repositories/worksession-repository';
import permissionsEntity from '../../../entities/permissions-entity';

async function validate(payload) {
  return Joi.validate(payload, { _id: Joi.string().required() });
}

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
  await validate({ _id: taskId });

  const [userData] = await accountRepository.getUserPublicData(uuid);
  console.log(userData);
  const workSession = await workSessionRepository
    .createWorkSession(userData, projectId, taskId);

  if (!workSession) {
    await permissionsEntity.checkReadPermissions(uuid, projectId);
    throw new Error('unknown');
  }

  return workSession;
}

export default createWorkSessionUC;
