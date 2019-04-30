import { Schema, model } from 'mongoose';

const workSessionSchema = new Schema({
  uuid: { type: String, unique: true }, // user = worker
  task: [Schema.ObjectId],
  startedAt: { type: Date, default: Date.now },
  endedAt: Date,
});
// Es grupal
export const sprintSchema = new Schema({
  project: [Schema.ObjectId],
  tasks: [Schema.ObjectId],
  startedAt: Date,
  endedAt: Date,
  workSessions: [workSessionSchema],
  // Podría aquí recoger stats adicionales de % y hacer de agrupador de worksessions
});

export const SprintLog = model('Sprint', sprintSchema, 'sprints');
