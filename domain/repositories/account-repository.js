import User from '../../models/user';

export class UserRepository {
  constructor() {
    this.model = User;
  }

  /** Adds a project id to the user´s account */
  async addProjectId(uuid, projectId) {
    const q = { uuid };
    const op = {
      $push: { projects: projectId }
    };
    return this.model.updateOne(q, op);
  }

  /** Recovers one user from db
   * @param {string} uuid User uuid
   */
  async getUser(uuid) {
    const q = { uuid };
    return this.model.findOne(q).lean();
  }

  /**
   * Recovers uuid, name and avatarUrl from requested users
   * @param  {string} uuid
   * @returns [{ uuid, name, avatarUrl}]
   */
  async getUserPublicData(...uuid) {
    const q = {
      uuid: { $in: [...uuid] },
    };
    const projection = 'uuid name avatarUrl';
    return this.model.find(q, projection).lean();
  }

  /**
  * Stores user avatar url in the db
  * @param {string} uuid user uuid
  * @param {string} avatarUrl Image src
  */
  async setUserAvatar(uuid, avatarUrl) {
    const q = { uuid };
    const op = { avatarUrl };
    return this.model.findOneAndUpdate(q, op);
  }
}

export default new UserRepository();
