import projectService from '../../../services/project.service';
import accountService from '../../../services/account.service';

async function createProject(req, res) {
  console.log('create project controller');
  const formData = req.body;
  const { uuid } = req.claims;
  const projectData = { ...formData, uuid };
  try {
    const project = projectService.generateProject(projectData);
    const newProject = await projectService.createProject(project);

    await accountService.addProjectIdToUser(uuid, newProject._id);
    return res.status(201).json(newProject);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export default createProject;
