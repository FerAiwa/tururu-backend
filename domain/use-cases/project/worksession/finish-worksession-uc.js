import Joi from 'joi';
import workSessionRepository from '../../../repositories/worksession-repository';

async function validate(payload) {
  return Joi.validate(payload, { _id: Joi.string().required(), startedAt: Joi.date().required() });
}

/**
 * Stops the user´s active work session.
 * @param {string} uuid User uuidd
 * @param {string} projectId Project _id
 * @param {Object} sprintData { startsAt, endsAt, reward? }
 */
async function finishWorkSessionUC(uuid, projectId, workSession) {
  await validate({ _id: workSession._id, startedAt: workSession.startedAt });
  await workSessionRepository.finishWorkSession(uuid, projectId, workSession);
}

export default finishWorkSessionUC;
