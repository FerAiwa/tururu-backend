import projectService from '../../../services/project.service';

async function getUserProjects(req, res) {
  try {
    const { uuid } = req.claims;
    const projects = await projectService.getUserProjects(uuid);
    return res.status(200).json(projects);
  } catch (e) {
    console.log(e.message);
    return res.status(500).send();
  }
}

export default getUserProjects;
