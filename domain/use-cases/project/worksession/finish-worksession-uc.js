async function finishWorkSessionUC(uuid, projectId, sessionId) {
  const query = {
    _id: projectId,
    users: uuid,
    'workSessions._id': sessionId,
  };
  const op = {
    $set: {
      'workSessions.$.endedAt': Date.now(),
    },
    // $pull: {
    //   activeTasks: taskId,
    // },
  };
  return Project.findOneAndUpdate(query, op).lean();
}

export default finishWorkSessionUC;
