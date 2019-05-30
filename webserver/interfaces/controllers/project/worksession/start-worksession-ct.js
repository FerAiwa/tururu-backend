import projectService from '../../../../../domain/project.service';

/**
 * Creates a new worksession for the project.
 */
async function startWorkSession(req, res, next) {
  console.log('posting worksession');
  const { projectId } = req.params;
  const { uuid } = req.claims;
  const { taskId } = req.body;
  try {
    const newWorksession = await projectService.createWorkSession(uuid, projectId, taskId);
    return res.status(201).json(newWorksession);
  } catch (e) {
    return next(e);
  }
}

export default startWorkSession;
