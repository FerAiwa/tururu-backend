
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
    const { nModified } = await this.model.updateOne(q, op);
    return nModified;
  }

  /**
   * Gets all project tasks
   */
  async getTasks(uuid, projectId) {
    const q = this.getUsersQuery(projectId, uuid);
    const projection = { tasks: 1, _id: 0 };

    return this.model.findOne(q, projection).lean();
  }

  async markTaskAsPending(uuid, projectId, taskId) {
    const q = {
      _id: projectId,
      'tasks._id': taskId,
    };
    const op = {
      $unset: {
        'tasks.$.completedAt': '',
      },
    };

    const { nModified } = await this.model.updateOne(q, op);
    return nModified;
  }

  async markTaskAsDone(uuid, projectId, taskId) {
    const q = {
      _id: projectId,
      'tasks._id': taskId,
    };
    const op = {
      $set: {
        'tasks.$.completedAt': new Date(Date.now()),
      },
    };

    const { nModified } = await this.model.updateOne(q, op);
    return nModified;
  }
}

export default new TaskRepository();
