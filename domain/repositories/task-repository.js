
import { ProjectRepository } from './project-repository';
import { Task } from '../../models';

class TaskRepository extends ProjectRepository {

  /**
   * Adds n tasks to a project
   */
  async addTasks({ uuid, projectId, newTasks }) {
    const q = this.getAdminsQuery(projectId, uuid);
    const op = {
      $push: {
        tasks: [...newTasks],
      },
    };

    return this.updateOne(q, op);
  }

  /**
   * Gets all project tasks
   */
  async getTasks(uuid, projectId) {
    const q = this.getUsersQuery(projectId, uuid);
    const projection = { tasks: 1, _id: 0 };

    return this.model.findOne(q, projection).lean();
  }
}

export default new TaskRepository();
