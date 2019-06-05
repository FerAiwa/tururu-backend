import userUC from '../../../../domain/use-cases/user';
/**
 * Recovers a brieffing from all the projects the user is member of.
 */
async function getProjects(req, res, next) {
  const { uuid } = req.claims;

  try {
    const projectsInfo = await userUC.getProjects(uuid);
    return res.status(200).send(projectsInfo);
  } catch (e) {
    return next(e);
  }
}

export default getProjects;
