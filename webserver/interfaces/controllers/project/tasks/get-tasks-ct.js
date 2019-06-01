import { taskUC } from '../../../../../domain/use-cases/project';

/**
 * Retrieves project tasks
 */
async function getTasks(req, res, next) {
  const { uuid } = req.claims;
  const { projectId } = req.params;
  try {
    const tasks = await taskUC.getTasks(uuid, projectId);
    return res.status(200).json(tasks);
  } catch (e) {
    return next(e);
  }
}

export default getTasks;
