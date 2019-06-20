import Joi from 'joi';

const action = Joi.string().allow('accept', 'decline');
const project = Joi.string().required();
const sendTo = Joi.string().guid({ version: ['uuidv4'] }).required();
const targetUser = Joi.string().guid({ version: ['uuidv4'] }).required();

const promotionRules = {
  project,
  targetUser,
};

const projectInvitationRules = {
  project,
  sendTo,
};

const projectInvitationAnswerRules = {
  project,
  action,
};

export {
  projectInvitationRules,
  projectInvitationAnswerRules,
  promotionRules

};
