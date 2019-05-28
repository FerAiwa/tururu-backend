import { Sprint } from '../../models';

/**
 * Perform CRUD operations on Sprint model
 */
class SprintRepository {
  constructor(projectModel) {
    this.model = projectModel;
  }

  /** Stores the new project in the db */
  async createSprint(project) {
    return this.model.create(project);
  }

};

export default new SprintRepository(Sprint);
