import { sprintUC } from '../../../../../domain/use-cases/project';
/**
* Updates the active project sprint
*/
async function updateSprint(req, res, next) {
  const { uuid } = req.claims;
  const { projectId } = req.params;
  const sprintData = req.body;
  try {
    await sprintUC.updateSprint(uuid, projectId, sprintData);
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}

export default updateSprint;
