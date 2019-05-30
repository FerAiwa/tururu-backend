import projectService from '../../../../../domain/project.service';

/**
 * Adds new tasks to a project
 */
async function addTasks(req, res, next) {
  console.log('add task controller')
  // Include validation vía JOI!
  const { uuid } = req.claims;
  const { projectId } = req.params;
  const { tasks } = req.body;
  try {
    const newTasks = await projectService.createTasks(uuid, projectId, tasks);
    console.log(newTasks);
    return res.status(201).send(newTasks);
  } catch (e) {
    return next(e);
  }
}

export default addTasks;
