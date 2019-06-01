import { taskUC } from '../../../../../domain/use-cases/project';

/**
 * Adds new tasks to a project
 */
async function createTasks(req, res, next) {
  const { uuid } = req.claims;
  const { projectId } = req.params;
  const { tasks } = req.body;

  try {
    const newTasks = await taskUC.createTasks({ uuid, projectId, tasks });
    return res.status(201).send(newTasks);
  } catch (e) {
    return next(e);
  }
}

export default createTasks;
