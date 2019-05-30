import projectService from '../../../../../domain/project.service';

async function stopWorkSession(req, res, next) {
  console.log('patching worksession');
  const { projectId } = req.params;
  const { uuid } = req.claims;
  const { workSession } = req.body;
  try {
    const session = await projectService.finishWorkSession(uuid, projectId, workSession);
    if (!session) return res.status(500).send();
    return res.status(204).send();
  } catch (e) {
    return next(e);
  }
}

export default stopWorkSession;
