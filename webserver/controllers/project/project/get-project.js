import { projectUC } from '../../../../domain/use-cases/project';

/** Recovers a project from database. */
async function getProject(req, res, next) {
  const { uuid } = req.claims;
  const { projectId } = req.params;
  try {
    const project = await projectUC.getProject(uuid, projectId);
    return res.status(200).json(project);
  } catch (e) {
    return next(e);
  }
}

export default getProject;
