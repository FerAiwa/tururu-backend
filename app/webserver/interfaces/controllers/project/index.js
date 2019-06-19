/** Barrel that contains all the controllers for Project route */
import addAdmin from './admins/add-admin-ct';
import createProject from './project/create-project-ct';
import createSprint from './sprint/create-sprint-ct';
import createTasks from './tasks/create-tasks-ct';
import getProject from './project/get-projec-ct';
import getActiveSessions from './worksession/get-active-sessions-ct';
import getAdmins from './admins/get-admins-ct';
import getTasks from './tasks/get-tasks-ct';
import getUsers from './users/get-users-ct';
import inviteUser from './users/invite-user-ct';
import removeAdmin from './admins/remove-admin-ct';
import removeUser from './users/remove-user-ct';
import setTaskStatus from './tasks/set-task-status-ct';
import startWorkSession from './worksession/start-worksession-ct';
import stopWorkSession from './worksession/end-worksession-ct';
import updateSprint from './sprint/update-sprint-ct';
import uploadBanner from './project/upload-banner-ct';


export {
  addAdmin,
  createProject,
  createSprint,
  createTasks,
  getActiveSessions,
  getAdmins,
  getProject,
  getTasks,
  getUsers,
  inviteUser,
  setTaskStatus,
  startWorkSession,
  stopWorkSession,
  removeAdmin,
  removeUser,
  updateSprint,
  uploadBanner,
};
