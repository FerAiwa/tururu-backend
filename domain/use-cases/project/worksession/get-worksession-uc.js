import workSessionRepository from '../../../repositories/worksession-repository';

async function getWorksessionUC(uuid, projectId) {
  return workSessionRepository.getWorkSessions(uuid, projectId);
}

export default getWorksessionUC;
