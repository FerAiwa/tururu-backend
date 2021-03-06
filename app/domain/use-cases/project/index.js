import createProject from './project/create-project-uc';
import createSprint from './sprint/create-sprint-uc';
import createTasks from './task/createTasks-uc';
import createWorkSessionUC from './worksession/create-worksession-uc';
import finishWorkSession from './worksession/finish-worksession-uc';
import getProject from './project/get-project-uc';
import getActiveWorkSessions from './worksession/get-active-worksessions-uc';
import getTasks from './task/get-tasks-uc';
import getTeamUC from './team/get-team-uc';
import inviteUserUC from './permissions/invite-user-uc';
import promoteUserUC from './permissions/promote-user-uc';
import removeAdminUC from './permissions/remove-admin-uc';
import removeUserUC from './permissions/remove-user-uc';
import setTaskStatusUC from './task/set-task-status-uc';
import updateSprint from './sprint/update-sprint-uc';
import uploadBanner from './project/upload-banner-uc';

const permissions = {
  inviteUserUC,
  promoteUserUC,
  removeAdminUC,
  removeUserUC,
};

const projectUC = {
  createProject,
  getProject,
  uploadBanner,
};

const sprintUC = {
  createSprint,
  updateSprint,
};

const taskUC = {
  createTasks,
  getTasks,
  setTaskStatusUC,
};

const workSessionUC = {
  createWorkSessionUC,
  finishWorkSession,
  getActiveWorkSessions,
};

const teamUC = {
  getTeamUC,
};

export {
  permissions,
  projectUC,
  sprintUC,
  teamUC,
  taskUC,
  workSessionUC,
};
