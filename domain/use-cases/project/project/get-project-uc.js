import projectRepo from '../../../repositories/project-repository';
import { NotFoundErr, PermissionErr } from '../../../errors/customError';

/**
 * Checks if the project is accesible.
 * Project must be either public or have the user uuid in the users list.
 * */
function isUserAllowed(uuid, { users, isPrivate }) {
  if (isPrivate) return users.includes(uuid);
  return true;
}

// UTILS
function getRoundPercent(num, total) {
  return Math.round((num * 100) / total);
}
function getRoundAVG(a, b) {
  if (a && b) return Math.round(a / b);
  return 0;
}

/** Returns ceiled day diference between two dates */
function getDayDifference(dateStart, dateEnd) {
  const diffTime = Math.abs(dateEnd.getTime() - dateStart.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Calculates some stadistics for project tasks.
 * @param {Object[]} tasks project tasks array
 */
function getTasksStats({ tasks }) {
  const raw = {
    total: tasks.length,
    completed: tasks.filter(t => t.completedAt).length,
  };

  const computed = {
    pending: raw.total - raw.completed,
    completedPercent: getRoundPercent(raw.completed, raw.total),
  };

  return {
    ...raw,
    ...computed,
  };
}

/**
 * Returns project and sprint total work time.
 * @param {Object} project
 */
function getWorkTimeTotals(project) {
  const { workSessions } = project;
  const summEllapsedTime = (acc, { ellapsedTime }) => acc + (ellapsedTime || 0);

  const activeSprint = project.activeSprint && project.sprints
    .find(x => `${x._id}` === `${project.activeSprint}`);

  const projectTime = workSessions
    .reduce(summEllapsedTime, 0);

  const sprintTime = workSessions
    .filter(ws => ws.startedAt >= activeSprint.startsAt)
    .reduce(summEllapsedTime, 0);

  return {
    project: projectTime,
    sprint: sprintTime,
  };
}

/**
 * Get project and active sprints days stats
 * @param {Object} project Destructured project startAt and deadline dates
 * @param {Object} activeSprint Current sprint data
 */
function getDayStats({ startAt, deadline }, activeSprint) {
  const raw = {
    projectTotal: getDayDifference(startAt, deadline),
    projectEllapsed: getDayDifference(startAt, new Date(Date.now())),
    sprintTotal: getDayDifference(activeSprint.startsAt, activeSprint.endsAt),
    sprintEllapsed: getDayDifference(new Date(Date.now()), activeSprint.endsAt),
  };

  const computed = {
    sprintPercent: getRoundPercent(raw.sprintEllapsed, raw.sprintTotal),
    projectPercent: getRoundPercent(raw.projectEllapsed, raw.projectTotal),
  };

  return {
    ...raw,
    ...computed,
  };
}

/**
 * Get performance stats based on stats from days and tasks
 * @param {Object} days days stats
 * @param {Object} tasks tasks stats
 */
function getPerformanceStats(days, tasks) {
  const raw = {
    taskDayAVG: getRoundAVG(days.projectEllapsed, tasks.completed),
    expectedTaskDayAVG: getRoundAVG(days.projectTotal, tasks.total),
  };

  const computed = {
    balance: getRoundPercent(raw.taskDayAVG, raw.expectedTaskDayAVG) || 0,
  };

  return {
    ...raw,
    ...computed,
  };
}

/**
 * Provides some stadistics based on project data.
 * @param {Object} project The project to analize
 */
function getProjectStats(project) {
  // Using the _id gets the active sprint data from sprints array
  const activeSprint = project.activeSprint && project.sprints
    .find(x => `${x._id}` === `${project.activeSprint}`);

  const raw = {
    tasks: getTasksStats(project),
    days: getDayStats(project, activeSprint),
    workTime: getWorkTimeTotals(project),
  };

  const computed = {
    performance: getPerformanceStats(raw.tasks, raw.days),
  };

  return {
    ...raw,
    ...computed,
  };
}

/**
 * Recovers a existing project and attaches stadistics
 * @param {string} uuid User uuidd
 * @param {string} projectId Project _id
 * @rules
 * - If the project is private, user must be in the access list.
 */

async function getProjectUC(uuid, projectId) {
  const project = await projectRepo.findProjectById(projectId);

  if (!project) throw NotFoundErr();

  project.stats = getProjectStats(project);

  if (!isUserAllowed(uuid, project)) throw PermissionErr('NOTUSER');

  return project;
}

export default getProjectUC;
