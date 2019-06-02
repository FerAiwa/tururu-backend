import Joi from 'joi';

const yesterday = new Date(Date.now() - 86400000);

const sprintCreationRules = {
  startsAt: Joi.date().greater(yesterday).required(),
  endsAt: Joi.date().iso().greater(Joi.ref('startsAt')).required(),
  reward: Joi.string().allow('')
};

export default sprintCreationRules;
