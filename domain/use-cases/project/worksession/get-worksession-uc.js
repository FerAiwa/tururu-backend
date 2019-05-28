async function getWorksessionUC(uuid, projectId) {
  const query = {
    _id: projectId,
    users: uuid,
    // 'workSessions.endedAt': null,
  };
  const projection = 'workSessions';

  return Project.findOne(query, projection).lean();
}

export default getWorksessionUC;
