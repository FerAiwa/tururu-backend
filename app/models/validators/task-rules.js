import Joi from 'joi';

const _id = Joi.string().required();
const status = Joi.string().valid('done', 'undone').required();

const setTaskStatusRules = { _id, status };

export {
  setTaskStatusRules,
};
