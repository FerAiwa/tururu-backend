import { permissions } from '../../../../../domain/use-cases/project';

/**
 * Adds a user to the project
 */
async function addUser(req, res, next) {
  const { uuid } = req.claims;
  const { projectId } = req.params;
  const { targetUser } = req.body;
  try {
    await permissions.addUserUC({ uuid, projectId, targetUser });
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}
export default addUser;
