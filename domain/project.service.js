import { Project, Sprint, WorkSession, Task } from '../models';
import { projectUC, sprintUC, taskUC, worksessionUC } from './use-cases/project';


/** @returns Plain JS object with default parameters for the Project fields */
function generateProject(projectData) {
  const {
    uuid, name, categories, startAt, deadline,
  } = projectData;
  const newProject = {
    name,
    categories: categories || [],
    uuid,
    admins: [uuid],
    users: [uuid],
    tasks: [],
    createdAt: Date.now(),
    startAt,
    deadline,
  };
  return newProject;
}
/** Creates a new Project instance and stores it in the db */
async function createProject(project) {
  return Project.create(project);
}

/** Adds the new sprint to the project document */
async function createSprint(uuid, projectId, sprintData) {
  const newSprint = new Sprint(sprintData);
  const query = { _id: projectId, admins: uuid };
  const op = {
    activeSprint: newSprint._id,
    $push: { sprints: newSprint },
  };

  await Project.findOneAndUpdate(query, op);
  return newSprint;
  // Rules: Just 1 sprint at a time.
  // User must be admin.
  // Can´t create a new one before ending the current.
  // Should be a set of tasks, no repetitions?
}

async function updateSprint(uuid, projectId, sprintData) {
  const query = {
    _id: projectId,
    admins: uuid,
    'sprints._id': sprintData._id,
  };
  const op = { 'sprints.$': sprintData };
  return Project.updateOne(query, op);
}

async function getWorksession(uuid, projectId) {
  const query = {
    _id: projectId,
    users: uuid,
    // 'workSessions.endedAt': null,
  };
  const projection = 'workSessions';

  return Project.findOne(query, projection).lean();
}

/**
 * @description When user starts or resumes a task, a new work session will be created
 * and stored, returning the _id for the new instance.
 * The pair of this function is stopWorkSession()
 * @returns {String} Worksession id
 */
async function createWorkSession(uuid, projectId, taskId) {
  // SHOULD NOT let createWorksession if task is busy or user has a session open.
  const newSession = new WorkSession({ uuid, taskId });
  const query = { _id: projectId, users: uuid };
  const op = {
    $push: {
      // activeTasks: taskId,
      workSessions: newSession,
    },
  };
  await Project.updateOne(query, op).lean();
  return newSession;
}

/** Closes a work session and stores ellapsed time. */
async function finishWorkSession(uuid, projectId, workSession) {
  const ellapsedTime = Math.floor(Date.now() - new Date(workSession.startedAt));
  const query = {
    _id: projectId,
    users: uuid,
    'workSessions._id': workSession._id,
  };
  const op = {
    $set: {
      'workSessions.$.ellapsedTime': ellapsedTime,
    },
  };
  // $pull: {
  //   activeTasks: taskId,
  // },
  return Project.findOneAndUpdate(query, op).lean();
}

/**
 * Adds n task objects to the project todo-list.
 * This step is previous to sprint assignement.
 */
async function createTasks(uuid, projectId, tasks) {
  const newTasks = tasks.map(task => new Task(task));
  console.log({ uuid, projectId, tasks });
  // user must be included in admins to procceed.
  const query = { _id: projectId, admins: uuid };
  const op = { $push: { tasks: [...newTasks] } };
  // const projection = 'tasks -_id';
  const result = await Project.updateOne(query, op).lean();
  console.log(result);
  return newTasks;
}

async function getTasks(uuid, projectId) {
  console.log(uuid, projectId)
  const query = { _id: projectId, users: uuid };
  const projection = 'tasks';
  // const proj = { '_id' 'tasks'}
  return Project.findOne(query, projection).lean();
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

async function getProject(uuid, projectId) {
  console.log('retrieving project', uuid, projectId)
  const query = { _id: projectId, users: uuid };
  return Project.findOne(query).lean();
}

export default {
  assignTasks,
  createProject,
  createTasks,
  createSprint,
  createWorkSession,
  getWorksession,
  getProject,
  getTasks,
  finishWorkSession,
  generateProject,
  updateSprint,
};
