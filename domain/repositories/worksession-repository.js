
import { ProjectRepository } from './project-repository';
import { ActiveSession, WorkSession } from '../../models';

class WorkSessionRepository extends ProjectRepository {
  /**
   * Saves the start of a worksession from user.
   * Aditionaly creates a temporal session with extended user info that will remain accesible until session ends.
   * @param {Object} userData  {uuid: string, name: string, avatarUrl: string }
   * @param {string} projectId
   * @param {string} taskId
   */
  async createWorkSession(userData, projectId, taskId) {
    const { uuid } = userData;
    const newSession = new WorkSession({ uuid, taskId });
    const activeSession = new ActiveSession({ ...userData, taskId });

    const q = this.getUsersQuery(projectId, uuid);
    const op = {
      $push: {
        activeSessions: activeSession,
        workSessions: newSession,
      },
    };
    const { nModified } = await this.model.updateOne(q, op);
    return nModified ? newSession : null;
  }

  /** Stops user work session and stores ellapsed time. Deletes the active worksession.
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
      $pull: { activeSessions: { uuid } },
    };
    return this.updateOne(q, op);
  }

  /**
  * Recover all the project active work sessions
  */
  async getActiveSessions(uuid, projectId) {
    const q = {
      ...this.getUsersQuery(projectId, uuid),
    };
    const projection = { activeSessions: 1, _id: 0 };

    return this.model.findOne(q, projection).lean();
  }
}


export default new WorkSessionRepository();
