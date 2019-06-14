import { projectUC } from '../../../../../domain/use-cases/project';

/**
 * Creates a project and adds the id to the user project list.
 * @returns projectId
 */
async function createProject(req, res, next) {
  const { uuid } = req.claims;
  const projectData = req.body;
  try {
    const projectId = await projectUC.createProject(uuid, projectData);

    return res.status(201).send(projectId);
  } catch (e) {
    return next(e);
  }
}

export default createProject;
