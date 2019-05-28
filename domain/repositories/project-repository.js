import { Project } from '../../models';

/**
 * Perform CRUD operations on Project model
 */
class ProjectRepository {
  constructor() {
    this.model = Project;
  }

  /** Stores the new project in the db */
  async createProject(project) {
    return this.model.create(project);
  }

  /** Recover a project from the db */
  async findProjectById(_id) {
    return this.model.findById(_id).lean();
  }

  async addSprint(_id, uuid, sprint) {
    const query = { _id, admins: uuid };
    const op = {
      activeSprint: sprint._id,
      $push: { sprints: sprint },
    };
    return this.model.findOneAndUpdate(query, op).lean();
  }
}

export default new ProjectRepository();
