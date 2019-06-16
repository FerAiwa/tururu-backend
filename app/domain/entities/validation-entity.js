import Joi from 'joi';

async function validate(payload, schema) {
  return Joi.validate(payload, schema);
}

export default validate;
