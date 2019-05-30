import addAdmin from './admins/add-admin-ct';
import addTasks from './tasks/add-tasks-ct';
import addUser from './users/add-user-ct';
import createProject from './project/create-project-ct';
import createSprint from './sprint/create-sprint-ct';
import getProject from './project/get-projec-ct';
import getAdmins from './admins/get-admins-ct';
import getTasks from './tasks/get-tasks-ct';
import getUsers from './users/get-users-ct';
import removeAdmin from './admins/remove-admin-ct';
import removeUser from './users/remove-user-ct';
import startWorkSession from './worksession/start-worksession-ct';
import stopWorkSession from './worksession/end-worksession-ct';
import updateSprint from './sprint/update-sprin-ct';


/** Barrel that contains all the controllers for Project route
* Make sure I return the @return param to provide clear info about the API res
*/
export {
  addAdmin,
  addTasks,
  addUser,
  createProject,
  createSprint,
  getAdmins,
  getProject,
  getTasks,
  getUsers,
  startWorkSession,
  stopWorkSession,
  removeAdmin,
  removeUser,
  updateSprint,
};
