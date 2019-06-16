import { teamUC } from '../../../../../domain/use-cases/project';

/**
 * Gets info of the project users, including admins and owner.
 * @returns [{ name, avatarUrl, uuid }]
 */
async function getUsers(req, res, next) {
  const { uuid } = req.claims;
  const { projectId } = req.params;
  try {
    const team = await teamUC.getTeamUC(uuid, projectId);
    return res.status(200).send(team);
  } catch (e) {
    return next(e);
  }
}

export default getUsers;
