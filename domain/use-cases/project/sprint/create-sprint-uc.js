import { Sprint } from '../../../../models';
import projectRepository from '../../../repositories/project-repository';
import CustomErr from '../../../errors/customError';

/** Adds a new sprint to a project
* - Requires user to have admin permissions
*/
async function createSprintUC(uuid, projectId, sprintData) {
  try {
    const newSprint = new Sprint(sprintData);
    const updatedSprint = projectRepository.addSprint(projectId, uuid, newSprint);
    if (!updatedSprint) {
      throw new CustomErr('NOTADMIN', 'Only project admins can makes changes on project sprints', 'createSprint');
    }
    return updatedSprint;
  } catch (e) {
    throw (e);
  }
}

export default createSprintUC;
