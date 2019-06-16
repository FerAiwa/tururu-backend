import Joi from 'joi';

const yesterday = new Date(Date.now() - 86400000);

const sprintCreationRules = {
  startAt: Joi.date().greater(yesterday).required(),
  endAt: Joi.date().iso().greater(Joi.ref('startAt')).required(),
  reward: Joi.string().allow(null),
};

const sprintSchemaRules = {
  startAt: Joi.date().required(),
  endAt: Joi.date().required(),
  reward: Joi.string().allow(null),
  tasks: Joi.array().items(Joi.string()),
  _id: Joi.string().required(),
};

export {
  sprintCreationRules,
  sprintSchemaRules,
};
