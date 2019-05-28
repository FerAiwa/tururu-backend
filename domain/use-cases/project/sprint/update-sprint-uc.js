async function updateSprintUC(uuid, projectId, sprintData) {
  const query = {
    _id: projectId,
    admins: uuid,
    'sprints._id': sprintData._id,
  };
  const op = { 'sprints.$': sprintData };
  return Project.updateOne(query, op);
}


export default updateSprintUC;
