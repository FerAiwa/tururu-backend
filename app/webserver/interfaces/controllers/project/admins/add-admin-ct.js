import { permissions } from '../../../../../domain/use-cases/project';

/**
 * Promotes a user to admin
 */
async function addAdmin(req, res, next) {
  const { uuid } = req.claims;
  const { projectId } = req.params;
  const { targetUser } = req.body;
  try {
    await permissions.promoteUserUC({ uuid, projectId, targetUser });
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}
export default addAdmin;
