import Joi from 'joi';

const name = Joi.string().required();
const email = Joi.string().email({ minDomainAtoms: 2 }).required();
const password = Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required();
const q = Joi.string().min(3).max(128).required();


const loginRules = {
  email, password,
};
const registerRules = {
  name, email, password,
};
const searchUserQueryRules = {
  q,
};

export {
  loginRules,
  registerRules,
  searchUserQueryRules,
};
