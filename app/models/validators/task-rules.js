import Joi from 'joi';

const _id = Joi.string().required();
const status = Joi.string().valid('done', 'undone').required();
const name = Joi.string().required();


const createTaskskRules = {
  projectId: Joi.string().required(),
  tasks: Joi.array().items({ name }),
};

const setTaskStatusRules = {
  projectId: Joi.string().required(),
  _id,
  status,
};

export {
  createTaskskRules,
  setTaskStatusRules,
};
