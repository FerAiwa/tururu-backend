import { Project, Sprint, WorkSession } from '../models';

/** @returns Plain JS object with default parameters for the Project fields */
function generateProject(projectData) {
  const { uuid, name, categories } = projectData;
  const newProject = {
    name,
    categories: categories || [],
    author: uuid,
    admins: [uuid],
    users: [uuid],
    tasks: [],
    createdAt: Date.now(),
  };
  return newProject;
}
/** Creates a new Project instance and stores it in the db */
async function createProject(project) {
  return Project.create(project);
}

/** Adds the new sprint to the project document */
async function createSprint(uuid, sprintData) {
  const newSprint = new Sprint(sprintData);
  const { projectId } = sprintData;

  const query = { _id: projectId, admins: uuid };
  const op = { $push: { sprints: newSprint } };

  return Project.findOneAndUpdate(query, op, { new: true });
  // Rules: Just 1 sprint at a time.
  // User must be admin.
  // Can´t create a new one before ending the current.
  // Should be a set of tasks, no repetitions?
}

/**
 * @description When user starts or resumes a task, a new work session will be created
 * and stored, returning the _id for the new instance.
 * The pair of this function is stopWorkSession()
 * @returns {String} Worksession id
 */
async function createWorkSession(uuid, projectId, taskId) {
  const newSession = new WorkSession({ uuid, taskId });
  const query = {
    _id: projectId,
    users: uuid,
  };
  const op = {
    $push: {
      activeTasks: taskId,
      workSessions: newSession,
    },
  };
  await Project.findOneAndUpdate(query, op).lean();
  return newSession;
}
// select
// Al recuperar los worksessions de un sprint:
// Busca las tareas, worksessions filtrando start > Date < end

async function finishWorkSession(uuid, projectId, sessionData) {
  const { _id, taskId } = sessionData;
  const endedAt = Date.now();
  const query = {
    _id: projectId,
    users: uuid,
    'workSessions._id': _id,
  };
  const op = {
    $set: {
      'workSessions.$.endedAt': endedAt,
    },
    $pull: {
      activeTasks: taskId,
    },
  };
  return Project.findOneAndUpdate(query, op).lean();
}

/**
 * Adds n task objects to the project todo-list.
 * This step is previous to sprint assignement.
 */
async function createTasks(uuid, projectId, taskData) {
  // user must be included in admins to procceed.
  const query = { _id: projectId, admins: uuid };
  const op = { $push: { tasks: [...taskData] } };
  return Project.findOneAndUpdate(query, op, { new: true });
}

/**
 * Adds tasks id to a sprint.
 * @description Reassign from the project todo-list to a new sprint is part of the proccess
 * when a task is not finished in the last split time.
 */
async function assignTasks(uuid, projectId, sprintId, taskIds) {
  const query = { _id: projectId, admins: uuid, 'sprints._id': sprintId };
  const op = {
    $addToSet: { 'sprints.$.tasks': [...taskIds] },
  };
  return Project.findOneAndUpdate(query, op, { new: true }).lean();
}

export default {
  assignTasks,
  createProject,
  createTasks,
  createSprint,
  createWorkSession,
  finishWorkSession,
  generateProject,
};
