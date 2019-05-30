import projectRepository from '../../../repositories/project-repository';
import permissionsEntity from '../../../entities/permissions-entity';
import { SprintErr } from '../../../errors/customError';

async function updateSprintUC(uuid, projectId, sprintData) {
  const updateSuccess = await projectRepository
    .updateSprint(uuid, projectId, sprintData);

  if (!updateSuccess) {
    await permissionsEntity.checkAdminUnhappyPaths(uuid, projectId);
    // UC concrete path
  }
}


export default updateSprintUC;
