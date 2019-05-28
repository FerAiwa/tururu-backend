/**
 * Adds tasks id to a sprint.
 * @description Reassign from the project todo-list to a new sprint is part of the proccess
 * when a task is not finished in the last split time.
 */
async function setSprintTasksUC(uuid, projectId, sprintId, taskIds) {
  const query = { _id: projectId, admins: uuid, 'sprints._id': sprintId };
  const op = {
    $addToSet: { 'sprints.$.tasks': [...taskIds] },
  };
  return Project.findOneAndUpdate(query, op, { new: true }).lean();
}

export default setSprintTasksUC;
