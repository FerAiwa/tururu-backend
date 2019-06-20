import { endWorkSessionRules } from '../../../../models/validators/worksession-rules';
import validate from '../../../entities/validation-entity';

import workSessionRepository from '../../../repositories/worksession-repository';

/**
 * Stops the user´s active work session.
 * @param {string} uuid User uuidd
 * @param {string} projectId Project _id
 * @param {Object} workSession { _id, startedAt }
 */
async function finishWorkSessionUC(uuid, projectId, workSession) {
  const { _id: workSessionId, startedAt } = workSession;

  await validate({ workSessionId, startedAt, projectId }, endWorkSessionRules);

  await workSessionRepository.finishWorkSession(uuid, projectId, workSession);
}

export default finishWorkSessionUC;
