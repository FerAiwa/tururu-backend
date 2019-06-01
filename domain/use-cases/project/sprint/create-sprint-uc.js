import Joi from 'joi';
import sprintCreationRules from '../../../../models/validators/sprint-creation-rules';
import permissionsEntity from '../../../entities/permissions-entity';
import { SprintErr, ActionNotAllowErr } from '../../../errors/customError';
import sprintRepository from '../../../repositories/sprint-repository';

async function validate(payload) {
  return Joi.validate(payload, sprintCreationRules);
}

/**
 * Creates a Sprint instance and stores it in the db.
 * @param {string} uuid User uuidd
 * @param {string} projectId Project _id
 * @param {Object} sprintData { startsAt, endsAt, reward? }
 * @rules
 * - Only one sprint per project can be active.
 * - Requires user to have admin permissions.
*/
async function createSprintUC(uuid, projectId, sprintData) {
  await validate(sprintData, sprintCreationRules);

  const activeSprint = await sprintRepository.findActiveSprint(uuid, projectId);
  if (activeSprint) {
    throw ActionNotAllowErr('There is a sprint in course. It must end before creating another.');
  }

  const newSprint = await sprintRepository.createSprint(projectId, uuid, sprintData);
  if (!newSprint) {
    await permissionsEntity.checkAdminPermissions(uuid, projectId);
    throw SprintErr('UNKNOWN');
  }

  return newSprint;
}

export default createSprintUC;
