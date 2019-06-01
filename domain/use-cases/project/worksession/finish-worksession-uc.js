import Joi from 'joi';
import workSessionRepository from '../../../repositories/worksession-repository';

async function validate(payload) {
  return Joi.validate(payload, { _id: Joi.string().required });
}
/**
 * Stops the user´s active work session.
 * @param {string} uuid User uuidd
 * @param {string} projectId Project _id
 * @param {Object} sprintData { startsAt, endsAt, reward? }
 */
async function finishWorkSessionUC(uuid, projectId, workSessionId) {
  await validate({ workSessionId });
  await workSessionRepository.finishWorkSession(uuid, projectId, workSessionId);
}

export default finishWorkSessionUC;
