import User from '../../models/user';

export class AccountRepository {
  constructor() {
    this.model = User;
  }

  /** Creates a new user account and saves it in the db
   * @param {Object} user
   */
  async createUser(user) {
    return this.model.create(user);
  }

  async updateLoginAttempts(uuid, loginAttempts) {
    return this.model.updateOne({ uuid }, { loginAttempts });
  }

  /**
   * @param {string} uuid
   * @param {string} unbanDate (ISO format)
   */
  async banUser(uuid, unbanDate) {
    return this.model.updateOne({ uuid }, { unbanDate });
  }

  /**
   * Removes user login attempts counter and the unban date.
   * @param {string} uuid
   */
  async resetUserLoginLimiters(uuid) {
    const op = {
      unbanDate: null,
      loginAttempts: 0,
    };

    return this.model.updateOne({ uuid }, op);
  }

  async resetVerificationCode(uuid, verificationCode) {
    const op = {
      verificationCode,
      verificated_at: null,
      generatedAt: new Date().toISOString(),
    };

    return this.model.updateOne({ uuid }, op);
  }

  async setAcountAsVerificated(uuid) {
    const op = {
      verificatedAt: new Date().toISOString(),
      $unset: {
        verificationCode: '',
        generatedAt: '',
      },
    };

    return this.model.updateOne({ uuid }, op);
  }

  /**
   * Search for users using full-text search
   * @param {String} query
   */
  async searchUsers(query) {
    const q = { $text: { $search: query.toString() } };
    const scoreSearch = { score: { $meta: 'textScore' } };

    return this.model.find(q, scoreSearch).sort(scoreSearch).lean();
  }

  async findUserByEmail(email) {
    return this.model.findOne({ email }).lean();
  }

  async findUserByVerificationCode(verificationCode) {
    return this.model.findOne({ verificationCode }).lean();
  }

  /** Recovers one user from db
   * @param {string} uuid User uuid
   */
  async getUser(uuid) {
    const q = { uuid };
    return this.model.findOne(q).lean();
  }

  async addProjectInvitation(uuid, invitation) {
    const q = { uuid };
    const op = {
      $addToSet: { invitations: invitation },
    };
    const { nModified } = await this.model.updateOne(q, op);
    return nModified;
  }

  async deleteProjectInvitation({ uuid, projectId }) {
    const q = {
      uuid,
      'invitations.project': projectId,
    };

    const op = {
      $addToSet: { projects: projectId },
      $unset: { 'invitations.$': '' },
    };

    const { nModified } = await this.model.updateOne(q, op);
    return nModified;
  }

  /** Adds a project id to the user´s account */
  async addProjectIdToUserAccount(uuid, projectId) {
    const q = { uuid };
    const op = {
      $addToSet: { projects: projectId },
    };
    const { n } = await this.model.updateOne(q, op);
    return n;
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
    const projection = {
      uuid: 1, name: 1, avatarUrl: 1, _id: 0,
    };
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
    const { nModified } = await this.model.updateOne(q, op);
    return nModified;
  }
}

export default new AccountRepository();
