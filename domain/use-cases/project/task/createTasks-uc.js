/**
 * Adds n task objects to the project todo-list.
 * This step is previous to sprint assignement.
 */
async function createTasksUC(uuid, projectId, tasks) {
  const newTasks = tasks.map(task => new Task(task));
  console.log({ uuid, projectId, tasks });
  // user must be included in admins to procceed.
  const query = { _id: projectId, admins: uuid };
  const op = { $push: { tasks: [...newTasks] } };
  // const projection = 'tasks -_id';
  await Project.updateOne(query, op).lean();
  return newTasks;
}

export default createTasksUC;
