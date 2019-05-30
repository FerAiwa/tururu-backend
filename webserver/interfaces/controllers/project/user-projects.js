import accountService from '../../../../domain/account.service';

async function getUserProjects(req, res, next) {
  try {
    const { uuid } = req.claims;
    const projects = await accountService.getUserProjects(uuid);
    return res.status(200).json(projects);
  } catch (e) {
    return next(e);
  }
}

export default getUserProjects;
