import UserConnection from '../../models/user-connection';

class ConnectionRepository {
  constructor() {
    this.model = UserConnection;
  }

  async storeUserConnection(uuid, socketId) {
    const q = { uuid };
    const op = {
      uuid,
      socketId,
    };
    // create one doc if query doesn´t match
    const options = { upsert: true, new: true };

    return this.model.findOneAndUpdate(q, op, options).lean();
  }

  async getUserConnection(uuid) {
    const q = { uuid };
    return this.model.findOne(q).lean();
  }

  async deleteUserConnection(uuid) {
    return this.model.findOneAndDelete({ uuid });
  }
}

export default new ConnectionRepository();
