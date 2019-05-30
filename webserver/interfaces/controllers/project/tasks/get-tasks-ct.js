import projectService from '../../../../../domain/project.service';

/**
 * Retrieves project tasks
 */
async function getTasks(req, res, next) {
  console.log('get tasks!')
  const { uuid } = req.claims;
  const { projectId } = req.params;
  try {
    console.log(uuid, projectId)
    const { tasks } = await projectService.getTasks(uuid, projectId);
    console.log(tasks)
    return res.status(200).json(tasks);
  } catch (e) {
    return next(e);
  }
}

export default getTasks;
