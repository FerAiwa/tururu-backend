import { permissions } from '../../../../../domain/use-cases/project';

/**
 * Removes admin privileges from a user.
 */
async function removeAdmin(req, res, next) {
  const { uuid } = req.claims;
  const { projectId } = req.params;
  const { uuid: targetUser } = req.query;
  try {
    await permissions.removeAdminUC({ uuid, projectId, targetUser });
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}

export default removeAdmin;
