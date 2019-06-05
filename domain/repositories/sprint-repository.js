
import { ProjectRepository } from './project-repository';
import { Sprint } from '../../models';

class SprintRepository extends ProjectRepository {
  /**
   * Adds a sprint to the project
   */
  async createSprint(projectId, uuid, sprintData) {
    const newSprint = new Sprint(sprintData);

    const q = this.getAdminsQuery(projectId, uuid);
    const op = {
      activeSprint: newSprint._id,
      $push: { sprints: newSprint },
    };
    // success if nModified >0  return sprint
    const { nModified } = await this.model.updateOne(q, op);

    return nModified && newSprint;
  }

  /**
  * Updates a project sprint data, except for dates which are inmutable.
  */
  async updateSprint(uuid, projectId, sprintData) {
    const q = {
      ...this.getAdminsQuery(projectId, uuid),
      'sprints._id': sprintData._id,
    };
    const op = {
      'sprints.$.reward': sprintData.reward || null,
      'sprints.$.tasks': sprintData.tasks || [],
    };
    const { nModified } = await this.model.updateOne(q, op);

    return nModified;
  }

  /**
   * Finds the active project sprint, if there is any.
   */
  async findActiveSprint(uuid, projectId) {
    const nowDate = new Date(Date.now());
    const q = {
      ...this.getUsersQuery(projectId, uuid),
      sprints: {
        $elemMatch: {
          startsAt: { $lte: nowDate },
          endsAt: { $gte: nowDate }
        },
      },
    };
    const projection = { 'sprints.$': 1 };
    return this.model.findOne(q, projection).lean();
  }
}

export default new SprintRepository();
