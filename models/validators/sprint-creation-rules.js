import Joi from 'joi';

const yesterday = new Date(Date.now() - 86400000);

const sprintCreationRules = {
  startsAt: Joi.date().greater(yesterday).required(),
  endsAt: Joi.date().iso().greater(Joi.ref('startsAt')).required(),
  reward: Joi.string().allow('')
};

export const sprintSchemaRules = {
  startsAt: Joi.date().required(),
  endsAt: Joi.date().required(),
  reward: Joi.string().allow(''),
  tasks: Joi.array().items(Joi.string()),
  _id: Joi.string().required(),
};

export default sprintCreationRules;
