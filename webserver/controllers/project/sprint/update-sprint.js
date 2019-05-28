import projectService from '../../../../domain/project.service';

/**
 * Updates sprint data. Requires user to be admin.
 */
async function updateSprint(req, res, next) {
  console.log('patchin sprint');
  const { uuid } = req.claims;
  const { projectId } = req.params;
  const sprintData = req.body;
  try {
    await projectService.updateSprint(uuid, projectId, sprintData);
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}

export default updateSprint;
