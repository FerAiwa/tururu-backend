import Joi from 'joi';
import sprintCreationRules from '../../../../models/validators/sprint-creation-rules';
import sprintRepository from '../../../repositories/sprint-repository';
import permissionsEntity from '../../../entities/permissions-entity';
import { SprintErr } from '../../../errors/customError';

async function validate(payload) {
  return Joi.validate(payload, sprintCreationRules);
}

/**
 * Updates Sprint information
 * @param {string} uuid User uuidd
 * @param {string} projectId Project _id
 * @param {Object} sprint Sprint to update
 * @rules
 * - Requires user to have admin permissions
 */
async function updateSprintUC(uuid, projectId, sprint) {
  await validate(sprint);
  const updateSuccess = await sprintRepository.updateSprint(uuid, projectId, sprint);

  if (!updateSuccess) {
    await permissionsEntity.checkAdminPermissions(uuid, projectId);
    // UC concrete path
    throw SprintErr('UNKNOWN');
  }
}

export default updateSprintUC;
