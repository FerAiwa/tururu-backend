import Project from '../databases/schemas/project';
import { User } from '../databases/schemas';

async function getUserProjects(uuid) {
  return Project.find({ users: uuid });
}

async function addProjectIdToUser(uuid, projectId) {
  return User.findOneAndUpdate({ uuid }, { $push: { projects: projectId } });
}

async function saveNewProject(projectData) {
  return Project.create(projectData);
}

async function addTasksToProject(uuid, projectId, taskData) {
  // user must be included in admins to procceed.
  const query = { _id: projectId, admins: uuid };
  const op = { $push: { tasks: [...taskData] } };
  return Project.findOneAndUpdate(query, op, { new: true });
}

export default {
  addProjectIdToUser,
  addTasksToProject,
  getUserProjects,
  saveNewProject,
};
