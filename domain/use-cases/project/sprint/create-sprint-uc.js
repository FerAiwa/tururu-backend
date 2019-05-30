import projectRepository from '../../../repositories/project-repository';
import permissionsEntity from '../../../entities/permissions-entity';
import { Sprint } from '../../../../models';
import { SprintErr } from '../../../errors/customError';

/**
 * Creates a Sprint instance and stores it in the db.
 * - Requires user to have admin permissions.
*/
async function createSprintUC(uuid, projectId, sprintData) {
  const newSprint = new Sprint(sprintData);
  if (!newSprint) throw SprintErr('UPS');

  const updateSuccess = await projectRepository
    .addSprint(projectId, uuid, newSprint);

  if (!updateSuccess) {
    await permissionsEntity.checkAdminUnhappyPaths(uuid, projectId);
    // UC concrete path
    throw SprintErr('UNKNOWN');
  }

  return newSprint;
}

export default createSprintUC;
