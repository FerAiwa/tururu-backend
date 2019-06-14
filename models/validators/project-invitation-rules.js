import Joi from 'joi';

// project: String,
// author: String,
// sendTo: String,
// createdAt: Date,
// confirmedAt: Date,
// rejectedAt: Date,
const action = Joi.string().allow('accept', 'decline');
const project = Joi.string().required();
const sendTo = Joi.string().required();

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
};
