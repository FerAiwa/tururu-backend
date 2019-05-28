import { Schema, model } from 'mongoose';

export const sprintSchema = new Schema({
  // projectId: Schema.ObjectId, // overkill, but if i want to split in a separate collection...
  tasks: [Schema.ObjectId], // tasks can be reasigned, registering here to track change.
  reward: String,
  startsAt: Date,
  endsAt: Date,
  // Podría aquí recoger stats adicionales de % y hacer de agrupador de worksessions
});

const Sprint = model('Sprint', sprintSchema, 'sprints');
export default Sprint;
