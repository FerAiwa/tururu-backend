import accountService from '../../../../../domain/account.service';
import { projectUC } from '../../../../../domain/use-cases/project';

/**
 * Creates a project and adds the new doc id to the user project list.
 */
async function createProject(req, res, next) {
  const { uuid } = req.claims;
  const formData = req.body;
  const projectData = { ...formData, uuid };
  try {
    const newProject = await projectUC.createProject(projectData);
    await accountService.addProjectIdToUser(uuid, newProject._id);

    return res.status(201).send(newProject);
  } catch (e) {
    return next(e);
  }
}

export default createProject;
