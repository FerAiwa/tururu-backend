import { workSessionUC } from '../../../../../domain/use-cases/project';

/**
 * Recovers all sessions that are on-course. Faster access to the team work.
 * - Returns array of active session objects
 */
async function getActiveSessions(req, res, next) {
  const { projectId } = req.params;
  const { uuid } = req.claims;
  try {
    const activeSessions = await workSessionUC.getActiveWorkSessions(uuid, projectId);
    return res.status(200).json(activeSessions);
  } catch (e) {
    return next(e);
  }
}

export default getActiveSessions;
