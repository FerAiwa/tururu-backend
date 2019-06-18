import { Types } from 'mongoose';
import MongoRepository from './mongo-repo';
import { Project, ProjectInvitation } from '../../models';

export class ProjectRepository extends MongoRepository {
  constructor() {
    super();
    this.model = Project;
  }

  /**
   * Sets project banner
   * @param {string} uuid
   * @param {string} projectId
   * @param {string} bannerUrl
   */
  async setProjectBanner(uuid, projectId, bannerUrl) {
    const q = this.getOwnerQuery(projectId, uuid);
    const op = { bannerUrl };

    return this.model.updateOne(q, op);
  }

  async getProjectInfo(...ids) {
    // Mongo needs converted string to ObjectId to search multiple projects.
    const objectedIds = ids.map(id => Types.ObjectId(id));
    const $match = {
      _id: {
        $in: [...objectedIds],
      },
    };
    const $project = {
      name: '$name',
      bannerUrl: '$bannerUrl',
      _id: '$_id',
      users: '$users',
    };

    return this.model.aggregate([{ $match }, { $project }]);
  }

  /**
   * Get users from project
   * @param {string} projectId
   * @returns {Promise<string[]>} uuid[]
   */
  async getUsers(projectId) {
    const projection = 'users';
    return this.model.findById(projectId, projection);
  }

  /**
   * Update a Project and return the number of modifications.
   */
  async updateOne(query, op) {
    // success if nModified > 0. Return truthy || falsy values
    const res = await this.model.updateOne(query, op);
    console.log(res);

    return res.nModified;
  }

  /**
   *  Stores the new project in the db
   */
  async createProject(project) {
    return this.model.create(project);
  }

  /**
   * Recover a project from the db
   * @return {Project}
   */
  async findProjectById(_id) {
    const projection = { invitations: 0 };
    return this.model.findById(_id, projection).lean();
  }


  // PERMISSIONS ------------------------------------------
  async generateInvitation({ uuid, projectId, targetUser }) {
    const invitation = new ProjectInvitation({
      author: uuid,
      project: projectId,
      sendTo: targetUser,
      createdAt: Date.now(),
      confirmedAt: null,
      rejectedAt: null,
    });

    const q = {
      ...this.getAdminsQuery(projectId, uuid),
      users: { $nin: [targetUser] }, // avoid sending to a user that is already in the project
    };

    const op = {
      $addToSet: { invitations: invitation },
    };

    const { nModified } = await this.model.updateOne(q, op);
    return nModified ? invitation : null;
  }

  /** 
   * Adds a invited user to the project.
   */
  async confirmInvitation({ uuid, projectId }) {
    const q = {
      _id: projectId,
      'invitations.sendTo': uuid,
    };
    const op = {
      'invitations.$.confirmedAt': Date.now(),
      $addToSet: { users: uuid },
    };

    const { nModified } = await this.model.updateOne(q, op);
    return nModified;
  }

  async rejectInvitation({ uuid, projectId }) {
    const q = {
      _id: projectId,
      'invitations.sendTo': uuid,
    };
    const op = {
      'invitations.$.rejectedAt': Date.now(),
    };
    const { nModified } = await this.model.updateOne(q, op);
    return nModified;
  }

  /**
  * Remove user from a project users set.
  */
  async removeUser({ targetUser, projectId }) {
    // const q = this.getAdminsQuery(projectId, uuid);
    const op = {
      $pull: {
        users: targetUser,
        admins: targetUser,
      },
    };
    // If n=1 & nModifed=0; user was already in the set.
    const { n } = await this.model.updateOne({ targetUser }, op);

    return n;
  }

  /**
   * Adds a existing project user to the admins set.
   */
  async addAdmin({ uuid, projectId, targetUser }) {
    const q = {
      ...this.getOwnerQuery(projectId, uuid),
      users: targetUser,
    };
    const op = {
      $addToSet: { admins: targetUser },
    };
    const { n } = await this.model.updateOne(q, op);

    return n;
  }

  /**
   * Remove a user from the admins set.
   */
  async removeAdmin({ uuid, projectId, targetUser }) {
    const q = this.getOwnerQuery(projectId, uuid);
    const op = {
      $pull: {
        admins: targetUser,
      },
    };
    const { n } = await this.model.updateOne(q, op);

    return n;
  }
}

export default new ProjectRepository();
