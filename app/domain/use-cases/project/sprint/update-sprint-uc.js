import { sprintSchemaRules } from '../../../../models/validators/sprint-creation-rules';
import permissionsEntity from '../../../entities/permissions-entity';
import sprintRepository from '../../../repositories/sprint-repository';
import validate from '../../../entities/validation-entity';
import { SprintErr } from '../../../errors/customError';

/**
 * Updates Sprint information
 * @param {string} uuid User uuidd
 * @param {string} projectId Project _id
 * @param {Object} sprint Sprint to update
 * @rules
 * - Requires user to have admin permissions
 * - Sprint dates can not be edited once created.
 */
async function updateSprintUC(uuid, projectId, sprint) {
  await validate({ ...sprint, projectId }, sprintSchemaRules);
  const updateSuccess = await sprintRepository.updateSprint(uuid, projectId, sprint);

  if (!updateSuccess) {
    await permissionsEntity.checkAdminPermissions(uuid, projectId);
    // UC concrete path
    throw SprintErr('UNKNOWN');
  }
}

export default updateSprintUC;
