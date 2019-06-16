import { permissions } from '../../../../../domain/use-cases/project';

/**
 * Removes a user from the project user list.
 */
async function removeUser(req, res, next) {
  const { uuid } = req.claims;
  const { projectId } = req.params;
  const { uuid: targetUser } = req.query;
  console.log(targetUser);
  try {
    await permissions.removeUserUC({ uuid, projectId, targetUser });
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}

export default removeUser;
