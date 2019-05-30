import { sprintUC } from '../../../../../domain/use-cases/project';

/**
 * Creates a new sprint in the project.
 */
async function createSprint(req, res, next) {
  const { uuid } = req.claims;
  const { projectId } = req.params;
  const sprintData = req.body;

  try {
    const sprint = await sprintUC.createSprint(uuid, projectId, sprintData);
    return res.status(201).json(sprint); // should return the location or the sprint id
  } catch (e) {
    return next(e);
  }
}

export default createSprint;
