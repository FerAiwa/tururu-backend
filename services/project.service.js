import Project from '../databases/schemas/project';
import { User } from '../databases/schemas';

async function getUserProjects(uuid) {
  // A. Populate version
  /*   return User.findOne({ uuid }).populate({
      path: 'projects',
      populate: { path: 'projects' },
    }); */
  // B. Find from projects using the user uuid.
  return Project.find({ users: uuid });
}

async function addProjectIdToUser(uuid, projectId) {
  return User.findOneAndUpdate({ uuid }, { $push: { projects: projectId } });
}

async function saveNewProject(projectData) {
  return Project.create(projectData);
}

export default {
  addProjectIdToUser,
  getUserProjects,
  saveNewProject,
};
