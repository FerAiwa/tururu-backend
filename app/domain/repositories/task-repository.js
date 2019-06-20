
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

    return this.model.updateOne(q, op);
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
      ...this.getUsersQuery(projectId, uuid),
      'task._id': taskId,
    };
    const op = {
      $unset: {
        'tasks.$.completedAt': '',
      },
    };


    const { nModified } = await this.model.updateOne(q, op);
    console.log('pending', q, nModified);
    return nModified;
  }

  async markTaskAsDone(uuid, projectId, taskId) {
    const q = {
      ...this.getUsersQuery(projectId, uuid),
      'task._id': taskId,
    };
    // 'tasks._id': taskId,
    const op = {
      $set: {
        'tasks.$.completedAt': new Date(Date.now()),
      },
    };

    const { nModified } = await this.model.updateOne(q, op);
    console.log('done', q, nModified);
    return nModified;
  }
}

export default new TaskRepository();
