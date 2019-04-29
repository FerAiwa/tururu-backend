import projectService from '../../../services/project.service';

function generateProject(projectData, uuid) {
  const { name, categories } = projectData;
  const project = {
    name,
    categories: categories || [],
    author: uuid,
    admins: [uuid],
    users: [uuid],
    tasks: [],
    reports: [],
    createdAt: Date.now(),
  };
  return project;
}

async function createProject(req, res) {
  const formData = req.body;
  const { claims: { uuid } } = req;
  try {
    const project = generateProject(formData, uuid);
    const newProject = await projectService.saveNewProject(project);

    await projectService.addProjectIdToUser(uuid, newProject._id);
    return res.status(201).json(newProject);
  } catch (e) {
    return res.status(500).send();
  }
}

export default createProject;
