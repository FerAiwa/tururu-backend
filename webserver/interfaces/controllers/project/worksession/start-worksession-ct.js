import { workSessionUC } from '../../../../../domain/use-cases/project';

/**
 * Creates a new work session for the user.
 */
async function startWorkSession(req, res, next) {
  const { projectId } = req.params;
  const { uuid } = req.claims;
  const { taskId } = req.body;
  try {
    const workSession = await workSessionUC.createWorkSessionUC(uuid, projectId, taskId);
    return res.status(201).json(workSession);
  } catch (e) {
    return next(e);
  }
}

export default startWorkSession;
