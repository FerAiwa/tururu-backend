import { workSessionUC } from '../../../../../domain/use-cases/project';

/**
 * Ends the user active worksession
 */
async function stopWorkSession(req, res, next) {
  const { projectId } = req.params;
  const { uuid } = req.claims;
  const { workSession } = req.body;
  try {
    await workSessionUC.finishWorkSession(uuid, projectId, workSession);
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}

export default stopWorkSession;
