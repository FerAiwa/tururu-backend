import { Schema } from 'mongoose';

const projectInvitationSchema = new Schema({
  project: String,
  author: String,
  sendTo: String,
  createdAt: Date,
  confirmedAt: Date,
  rejectedAt: Date,
});

export default projectInvitationSchema;
