import userUC from '../../../../domain/use-cases/user';
/**
 * Recovers account info, with a list of all the projects the user is member of.
 */
async function getUserInfo(req, res, next) {
  const { uuid } = req.claims;

  try {
    const projectsInfo = await userUC.getUserInfoUC(uuid);
    return res.status(200).send(projectsInfo);
  } catch (e) {
    return next(e);
  }
}

export default getUserInfo;
