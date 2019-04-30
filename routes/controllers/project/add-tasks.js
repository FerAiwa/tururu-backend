import projectService from '../../../services/project.service';

/** Make sure task author and jwt uuid matches
 * to prevent logged users to fake other user uuid and post for them */
const areDiferentUuids = (uuid, tasks) => tasks.find(x => x.uuid !== uuid);

async function addTasks(req, res) {
  // Include validation vía JOI!
  const { uuid } = req.claims;
  const { projectId, tasks } = req.body;


  try {
    if (!areDiferentUuids(uuid, tasks)) return res.status(401);
    const updatedProject = await projectService.addTasksToProject(uuid, projectId, tasks);
    return res.status(201).send();
  } catch (e) {
    console.log(e.message);
    return res.status(500).send();
  }
}

export default addTasks;
