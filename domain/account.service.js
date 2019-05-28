// import accountCases from './use-cases/account';
import accountCases from './use-cases/account';
import { User } from '../models/user';
import { Project } from '../models';

function customizeError(e) {
  e.domain = 'Account';
  e.date = new Date(Date.now());
  return e;
}

async function create(userData) {
  try {
    return accountCases.createAccountUC(userData)
  } catch (e) {
    e.context = 'creation';
    throw (e);
  }
}

async function activate(verificationCode) {
  try {
    await accountCases.activateAccountUC(verificationCode);
  } catch (e) {
    e.context = 'activation';
    customizeError(e);
    throw e;
  }
}

async function login(email, password) {
  try {
    const token = await accountCases.loginUC(email, password);
    return token;
  } catch (e) {
    e.context = 'login';
    throw e;
  }
}

// USER PROJECTS ___________________________________________________________________________
async function getUserProjects(uuid) {
  return Project.find({ users: uuid }); // hmm.. dominion de project aqui?
}

async function addProjectIdToUser(uuid, projectId) {

  return User.findOneAndUpdate({ uuid }, { $push: { projects: projectId } });
}

export default {
  create,
  activate,
  login,
  addProjectIdToUser,
  getUserProjects,
};
