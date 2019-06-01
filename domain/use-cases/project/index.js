import addUserUC from './permissions/add-user-uc';
import createProject from './project/create-project-uc';
import createSprint from './sprint/create-sprint-uc';
import createTasks from './task/createTasks-uc';
import createWorkSessionUC from './worksession/create-worksession-uc';
import finishWorkSession from './worksession/finish-worksession-uc';
import getProject from './project/get-project-uc';
import getWorksession from './worksession/get-worksession-uc';
import getTasks from './task/get-tasks-uc';
import promoteUserUC from './permissions/promote-user-uc';
import removeAdminUC from './permissions/remove-admin-uc';
import removeUserUC from './permissions/remove-user-uc';
import setSprintTasks from './sprint/set-sprint-tasks-uc';
import updateSprint from './sprint/update-sprint-uc';

const permissions = {
  addUserUC,
  promoteUserUC,
  removeAdminUC,
  removeUserUC,
};

const projectUC = {
  createProject,
  getProject,
};

const sprintUC = {
  createSprint,
  setSprintTasks,
  updateSprint,
};

const taskUC = {
  createTasks,
  getTasks,
};

const workSessionUC = {
  createWorkSessionUC,
  finishWorkSession,
  getWorksession,
};

export {
  permissions,
  projectUC,
  sprintUC,
  taskUC,
  workSessionUC,
};
