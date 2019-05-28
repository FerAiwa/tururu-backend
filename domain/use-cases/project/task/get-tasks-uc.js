async function getTasksUC(uuid, projectId) {
  console.log(uuid, projectId)
  const query = { _id: projectId, users: uuid };
  const projection = 'tasks';
  // const proj = { '_id' 'tasks'}
  return Project.findOne(query, projection).lean();
}

export default getTasksUC;
