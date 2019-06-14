
import { ProjectRepository } from './project-repository';
import Sprint from '../../models/sprint';

class SprintRepository extends ProjectRepository {

  // eslint-disable-next-line class-methods-use-this
  generateSprintPresset(days) {
    const weekEnd = new Date(Date.now() + 1000 * 60 * 60 * 24 * days);
    return { tasks: [], startAt: Date.now(), endAt: weekEnd };
  }

  /**
   * Adds a sprint to the project
   * - If no sprintData is attached it will generate a default sprint of 7 days.
   */
  async createSprint(uuid, projectId, sprintData = this.generateSprintPresset(7)) {
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
  * Updates a project sprint tasks and reward
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
