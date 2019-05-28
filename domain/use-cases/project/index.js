import createProject from './project/create-project-uc';
import getProject from './project/get-project-uc';

import createSprint from './sprint/create-sprint-uc';
import updateSprint from './sprint/update-sprint-uc';
import setSprintTasks from './sprint/set-sprint-tasks-uc';

import createTasks from './task/createTasks-uc';
import getTasks from './task/get-tasks-uc';

import createWorkSession from './worksession/create-worksession-uc';
import finishWorkSession from './worksession/finish-worksession-uc';
import getWorksession from './worksession/get-worksession-uc';


const projectUC = {
  createProject,
  getProject,
};

const sprintUC = {
  createSprint,
  updateSprint,
  setSprintTasks,
};

const taskUC = {
  createTasks,
  getTasks,
};

const workSessionUC = {
  createWorkSession,
  finishWorkSession,
  getWorksession,
};

export {
  projectUC,
  sprintUC,
  taskUC,
  workSessionUC,
};
