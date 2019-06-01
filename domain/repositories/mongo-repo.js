/* eslint-disable class-methods-use-this */
/* eslint-disable semi */

// that class only can be extended
export default class MongoRepository {
  getAdminsQuery(projectId, uuid) {
    return { _id: projectId, admins: uuid }
  }

  getUsersQuery(projectId, uuid) {
    return { _id: projectId, users: uuid }
  }

  getOwnerQuery(projectId, uuid) {
    return { _id: projectId, owner: uuid }
  }
}
