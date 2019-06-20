import Joi from 'joi';

const _id = Joi.string().required();
const status = Joi.string().valid('done', 'undone').required();
const name = Joi.string().required();


const createTaskskRules = {
  tasks: Joi.array().items({ name }),
};

const setTaskStatusRules = { _id, status };

export {
  createTaskskRules,
  setTaskStatusRules,
};
