import { Project } from '../../models';

class ProjectRepository {
  constructor() {
    this.model = Project;
  }

  /**
   * Update a Project and return the number of modifications.
   * @param {*} query The selection query
   * @param {*} op The operation to perform
   */
  async updateOne(query, op) {
    // success if nModified > 0. Return truthy || falsy values
    const res = await this.model.updateOne(query, op);
    console.log(res);
    return res.nModified;
  }

  async addUser({ uuid, projectId, targetUser }) {
    const query = {
      _id: projectId,
      admins: uuid,
    };
    const op = {
      $addToSet: { users: targetUser },
    };
    const { n } = await this.model.updateOne(query, op);
    // If n=1 & nModifed=0; user was already in the set.
    return n;
  }

  /**
 * Remove user from the project user set.
 */
  async removeUser({ uuid, projectId, targetUser }) {
    const query = {
      _id: projectId,
      admins: uuid,
    };
    const op = {
      $pull: {
        users: targetUser,
        admins: targetUser,
      },
    };
    const { n } = await this.model.updateOne(query, op);
    // If n=1 & nModifed=0; user was already in the set.
    return n;
  }

  /**
   * Remove user from the project user set.
   */
  async removeAdmin({ uuid, projectId, targetUser }) {
    const query = {
      _id: projectId,
      admins: uuid,
    };
    const op = {
      $pull: {
        admins: targetUser,
      },
    };
    const { n } = await this.model.updateOne(query, op);
    // If n=1 & nModifed=0; user was already in the set.
    return n;
  }

  async addAdmin({ uuid, projectId, targetUser }) {
    const query = {
      _id: projectId,
      owner: uuid,
      users: targetUser,
    };
    const op = {
      $addToSet: { admins: targetUser },
    };
    const { n } = await this.model.updateOne(query, op);
    // If n=1 & nModifed=0; admin was already in the set.
    return n;
  }

  /** Stores the new project in the db */
  async createProject(project) {
    return this.model.create(project);
  }

  /** Recover a project from the db
   * @return {Project}
   */
  async findProjectById(_id) {
    return this.model.findById(_id).lean();
  }

  /**
   * Adds a sprint to the project if the user uuid is in the admin list.
   */
  async addSprint(_id, uuid, sprint) {
    const query = { _id, admins: uuid };
    const op = {
      activeSprint: sprint._id,
      $push: { sprints: sprint },
    };
    // success if nModified > 0. Return truthy || falsy values
    const { nModified } = await this.model.updateOne(query, op);
    return nModified;
  }

  /** Updates a project sprint. User uuid must be in the admin list. */
  async updateSprint(uuid, projectId, sprintData) {
    const query = {
      _id: projectId,
      admins: uuid,
      'sprints._id': sprintData._id,
    };
    const op = { 'sprints.$': sprintData };
    const { nModified } = await this.model.updateOne(query, op);
    return nModified;
  }
}

export default new ProjectRepository();
