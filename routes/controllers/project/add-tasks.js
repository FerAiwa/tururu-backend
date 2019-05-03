import projectService from '../../../services/project.service';

async function addTasks(req, res, next) {
  console.log('add task controller')
  // Include validation vía JOI!
  const { uuid } = req.claims;
  const { projectId, tasks } = req.body;
  try {
    const updatedProject = await projectService.createTasks(uuid, projectId, tasks);
    return res.status(201).send();
  } catch (e) {
    next(e);
  }
}

export default addTasks;
