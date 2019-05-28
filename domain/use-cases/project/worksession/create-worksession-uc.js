/**
 * @description When user starts or resumes a task, a new work session will be created
 * and stored, returning the _id for the new instance.
 * The pair of this function is stopWorkSession()
 * @returns {String} Worksession id
 */
async function createWorkSessionUC(uuid, projectId, taskId) {
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

export default createWorkSessionUC;
