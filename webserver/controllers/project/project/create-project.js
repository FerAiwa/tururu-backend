import accountService from '../../../../domain/account.service';
import { projectUC } from '../../../../domain/use-cases/project';

/**
 * Creates a new project and adds the new _id to the user projects array.
 *
 * TODO
 * - Validate input with JOI
 */
async function createProject(req, res, next) {
  const formData = req.body;
  const { uuid } = req.claims;
  const projectData = { ...formData, uuid };
  try {
    const newProject = await projectUC.createProject(projectData);
    await accountService.addProjectIdToUser(uuid, newProject._id);
    return res.status(201).json(newProject);
  } catch (e) {
    return next(e);
  }
}

export default createProject;
