import Joi from 'joi';

const id = Joi.string().required();
const startedAt = Joi.date().required();

const createWorkSessionRules = {
  projectId: id,
  taskId: id,
}

const endWorkSessionRules = {
  workSessionId: id,
  projectId: id,
  startedAt,
}

export {
  createWorkSessionRules,
  endWorkSessionRules,
}
