import { taskUC } from '../../../../../domain/use-cases/project';

/**
 * Updates task status based on query information
 * @query
 * - { status }  Accepted status: 'done', 'undone');
 * - { task } Task _id
 */
async function setTaskStatus(req, res, next) {
  const { uuid } = req.claims;
  try {
    const { projectId } = req.params;
    const { task: taskId, status } = req.query;

    await taskUC.setTaskStatusUC({
      uuid, projectId, taskId, status,
    });
    // Notificate team

    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}

export default setTaskStatus;
