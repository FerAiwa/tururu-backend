import { sprintUC } from '../../../../../domain/use-cases/project';
/**
* Updates a Sprint
*/
async function updateSprint(req, res, next) {
  console.log('patchin sprint');
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
