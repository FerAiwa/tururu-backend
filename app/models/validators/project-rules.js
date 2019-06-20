import Joi from 'joi';

const yesterday = new Date(Date.now() - 86400000);

const name = Joi.string().required();
const startAt = Joi.date().greater(yesterday).required();
const deadline = Joi.date().iso().greater(Joi.ref('startAt')).required();
const reward = Joi.string().allow('');

const projectIdRule = {
  projectId: Joi.string().required(),
};

const projectCreationRules = {
  name,
  startAt,
  deadline,
  reward,
};

export {
  projectCreationRules,
  projectIdRule,
};
