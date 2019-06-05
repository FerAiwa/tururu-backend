
import { ProjectRepository } from './project-repository';
import { WorkSession } from '../../models';

class WorkSessionRepository extends ProjectRepository {
  /**
   * Saves the start of a worksession from user.
   * @param {string} uuid
   * @param {string} projectId
   * @param {string} taskId
   */
  async createWorkSession(uuid, projectId, taskId) {
    const newSession = new WorkSession({ uuid, taskId });

    const q = this.getUsersQuery(projectId, uuid);
    const op = {
      $push: { workSessions: newSession },
    };
    const { nModified } = await this.model.updateOne(q, op);
    return nModified ? newSession : null;
  }

  /** Stops user work session and stores ellapsed time.
   * @param {string} uuid
   * @param {string} projectId
   * @param {string} workSessionId
   */
  async finishWorkSession(uuid, projectId, workSession) {
    const ellapsedTime = Math.floor(Date.now() - new Date(workSession.startedAt));

    const q = {
      ...this.getUsersQuery(projectId, uuid),
      'workSessions._id': workSession._id,
    };
    const op = {
      $set: { 'workSessions.$.ellapsedTime': ellapsedTime },
    };
    // $pull: {
    //   activeTasks: taskId,
    // },
    return this.updateOne(q, op);
  }

  /**
  * Recover all the project work sessions
  */
  async getWorkSessions(uuid, projectId) {
    const q = {
      ...this.getUsersQuery(projectId, uuid),
    };
    const projection = 'workSessions';

    return this.model.findOne(q, projection).lean();
  }
}


export default new WorkSessionRepository();
